1986 年 10 月，劳伦斯伯克利实验室与加州大学伯克利分校之间的链路——两个相距 400 码、隔着三个网络跳点互连的地点——突然只能以每秒 40 比特而不是惯常的每秒 32 千比特传数据：相差近千倍。没有任何东西坏掉。每台主机都遵守当时的 TCP 规范：定时器到期就重传报文段，接收方允许多少就发多少。随着网络被填满，队列变长，报文段被拖过定时器，主机重传它们，重传又进一步填满队列，很快链路就忙着运送早已到达或将被丢弃的报文段的拷贝。这就是**拥塞崩溃**，那一年互联网接二连三地陷入其中。

范·雅各布森（Van Jacobson）的应对发表于 1988 年，把 TCP 从一个只避免让*接收方*过载的协议，改变为一个也避免让*网络*过载的协议，依据的仅仅是自己报文段的到达与丢失。他引入的这些算法经过近四十年的打磨，如今仍然支配着互联网上的大部分流量。它们还顺带解决了第二个问题，而且没有任何人出面协调：竞争的信道在各条流之间大致公平地分享瓶颈链路。

本章研究 RFC 9293（2022）定义的 TCP：它的报文段、连接的建立与释放以及支配它们的状态机、往返时间估计和**流量控制**。然后转向**拥塞控制**：TCP Reno（RFC 5681）的慢启动、拥塞避免与快速恢复，为什么加法增大乘性减小能收敛到公平的份额，由此得到的吞吐量，以及现代算法 CUBIC 与 BBR。本章以 [[networks/reliable-transport]] 的滑动窗口协议为基础。

## TCP 连接

TCP 在两个套接字之间提供可靠的、按序的、全双工的字节流，带流量控制和拥塞控制。它是**面向连接的**：两端先交换报文段建立状态——序号、缓冲区大小、选项——数据才流动，而连接只存在于两端主机之中。路由器对它一无所知。

::: definition TCP 报文段 {#def-segment}
TCP 报文段有一个 20 到 60 字节的首部，后接数据。各字段按顺序为：

| 字段 | 比特数 | 含义 |
|---|---|---|
| 源端口、目的端口 | 16 + 16 | 分用，同 UDP |
| 序号 | 32 | 本报文段第一个数据字节的编号（按字节编号） |
| 确认号 | 32 | 若置了 `ACK`：本报文段发送方下一个期待接收的字节 |
| 数据偏移 | 4 | 以 32 位字计的首部长度（5 到 15） |
| 保留 | 4 | 必须为零 |
| 标志 | 8 | `CWR`、`ECE`（拥塞通知）、`URG`、`ACK`、`PSH`、`RST`（复位）、`SYN`（同步序号）、`FIN`（发送方不再发送数据） |
| 窗口 | 16 | 本报文段发送方在已确认字节之外还愿意接收的字节数（按窗口缩放选项缩放） |
| 校验和 | 16 | 对伪首部、首部和数据计算的互联网校验和 |
| 紧急指针 | 16 | 极少使用 |
| 选项 | 0–320 | 最大报文段长度（MSS）、窗口缩放、选择性确认（SACK）、时间戳 |

一个 `SYN` 和一个 `FIN` 各占一个序号，就好像它们是一个数据字节，这样它们也能被可靠地确认。
:::

**最大报文段长度**（MSS）是一台主机愿意放进一个报文段的最大数据量；它在 `SYN` 中通告，通常等于链路 MTU 减去 IP 和 TCP 首部——以太网上为 $1500 - 20 - 20 = 1460$ 字节。确认是**累计式的**：确认号 $a$ 表示“$a$ 之前的每个字节我都收到了”。收到越过一处空缺的报文段的接收方把它保留下来（不同于回退 N 帧），但只能重复它的累计确认——一个**重复 ACK**——除非启用了 SACK。

### 连接的建立与释放

::: algorithm 三次握手 {#alg-handshake}
1. 客户端选择一个**初始序号**（ISN）$x$，发送一个置 `SYN`、序号为 $x$ 的报文段，带上它的选项（MSS、窗口缩放、允许 SACK、时间戳）。
2. 服务器若在该端口上有套接字在监听，就选择自己的 ISN $y$，回以一个同时置 `SYN` 和 `ACK`、序号为 $y$、确认号为 $x + 1$ 的报文段，带上它的选项。
3. 客户端回以一个置 `ACK`、序号为 $x + 1$、确认号为 $y + 1$ 的报文段；这个报文段已经可以携带数据。双方现在都处于 `ESTABLISHED`。
:::

为什么要三条报文，为什么初始序号要随机？每一方都必须知道对方的起始序号，并知道对方已经知道了自己的：两个 `SYN` 加两个 `ACK`，其中服务器的 `SYN` 和 `ACK` 合并进一个报文段。序号从一个不可预测的值开始（RFC 6528 由连接各地址和端口加上一个时钟经秘密散列导出），原因有二：来自相同端口的旧连接的报文段不大可能落入新连接的窗口；看不见流量的路径外攻击者猜不到注入数据或向别人的连接伪造复位所需的序号。早期的 TCP 实现使用可预测的 ISN，恰恰使这类盲目欺骗攻击成为可能。

由于一条 TCP 连接是两个字节流，关闭在两个方向上分别进行。发送完毕的一方发出 `FIN`，由对方确认；另一方向保持打开，直到那一侧也发出自己的 `FIN`——即 `shutdown(SHUT_WR)` 所作的半关闭（[[networks/sockets]]）。`RST` 报文段立即中止一条连接，也是对发到无监听端口地址的报文段的答复（[[networks/sockets#ex-refused]]）。

::: definition TCP 连接状态 {#def-states}
一个 TCP 端点处于十一个状态之一（RFC 9293，§3.3.2）：`CLOSED`；`LISTEN`（等待 `SYN` 的服务器）；`SYN-SENT` 与 `SYN-RECEIVED`（握手中）；`ESTABLISHED`；`FIN-WAIT-1`、`FIN-WAIT-2`、`CLOSING` 与 `TIME-WAIT`（先关闭的一方，即**主动关闭**）；`CLOSE-WAIT` 与 `LAST-ACK`（后关闭的一方，即**被动关闭**）。
:::

::: widget graph
nodes: CLOSED@3,8; LISTEN@1,6.5; SYN_SENT@5,6.5; SYN_RCVD@1,5; ESTABLISHED@3,4; FIN_WAIT_1@1,2.5; CLOSE_WAIT@5,2.5; FIN_WAIT_2@0,1; CLOSING@2,1; LAST_ACK@5,1; TIME_WAIT@1,-0.5
edges: CLOSED>LISTEN; CLOSED>SYN_SENT; LISTEN>SYN_RCVD; SYN_SENT>SYN_RCVD; SYN_SENT>ESTABLISHED; SYN_RCVD>ESTABLISHED; ESTABLISHED>FIN_WAIT_1; ESTABLISHED>CLOSE_WAIT; FIN_WAIT_1>FIN_WAIT_2; FIN_WAIT_1>CLOSING; FIN_WAIT_1>TIME_WAIT; FIN_WAIT_2>TIME_WAIT; CLOSING>TIME_WAIT; CLOSE_WAIT>LAST_ACK; LAST_ACK>CLOSED; TIME_WAIT>CLOSED
algorithm: bfs
start: CLOSED
caption: TCP 状态机的主要转移（[[#def-states]]）。服务器经过 CLOSED → LISTEN（`listen`）→ SYN_RCVD（收到 `SYN`，发送 `SYN`+`ACK`）→ ESTABLISHED（收到 `ACK`）；客户端经过 CLOSED → SYN_SENT（`connect`，发送 `SYN`）→ ESTABLISHED（收到 `SYN`+`ACK`，发送 `ACK`）。先关闭的一方走左边那条路：FIN_WAIT_1（发出 `FIN`）、FIN_WAIT_2（它的 `FIN` 被确认）、TIME_WAIT（收到对端的 `FIN`，发送 `ACK`），并在 $2\cdot\text{MSL}$ 之后进入 CLOSED；CLOSING 处理同时关闭。后关闭的一方经过 ESTABLISHED → CLOSE_WAIT（收到 `FIN`）→ LAST_ACK（`close`，发出 `FIN`）→ CLOSED。逐步走完广度优先搜索，看看从 CLOSED 出发经过多少次转移能到达哪些状态。复位和超时——它们几乎能从任何状态回到 CLOSED——略去不画。
:::

先关闭的一方在 `TIME-WAIT` 中等待两倍的**最长报文段寿命**（MSL；RFC 9293 建议两分钟，Linux 实际一共只等 60 秒）才忘记这条连接。理由有二：它最后的 `ACK` 可能丢失，这时对端会重传它的 `FIN`，并且必须再次收到 `ACK` 而不是一个复位；这条连接的旧重复报文段必须彻底消失，使用同样四个地址和端口的新连接才能开始。这就是我们在 [[networks/sockets]] 中用 `ss` 看到的那个状态。

::: example 内核对一条连接的看法 {#ex-ss}
在 Linux 上，`ss -ti` 显示 TCP 为每条连接保存的状态。在环回接口上打开一条连接，通过它发送 10 MB，然后读出拥塞控制算法、窗口缩放、MSS、RTT 估计和重传超时。
::: solution
```python
# ssdemo.py：在环回上打开一条 TCP 连接，发送数据，并显示内核对它的看法
import socket, subprocess, threading

lsock = socket.create_server(("127.0.0.1", 0))
port = lsock.getsockname()[1]

def receiver():
    conn, _ = lsock.accept()
    while conn.recv(65536):
        pass

threading.Thread(target=receiver, daemon=True).start()
s = socket.create_connection(("127.0.0.1", port))
for _ in range(100):
    s.sendall(b"x" * 100000)                   # 共 10 MB
print(subprocess.run(["ss", "-tin", "dst", f"127.0.0.1:{port}"],
                     capture_output=True, text=True).stdout)
s.close()
```

```console
$ python3 ssdemo.py
State Recv-Q Send-Q Local Address:Port  Peer Address:Port
ESTAB 0      0          127.0.0.1:47866    127.0.0.1:33849
	 cubic wscale:10,10 rto:201 rtt:0.023/0.008 mss:65483 pmtu:65535 rcvmss:536 advmss:65483 cwnd:10 bytes_sent:10000000 bytes_acked:10000001 segs_out:203 ...
```

这条连接使用 **CUBIC** 拥塞控制（Linux 的默认算法；见下文）。两端通告的窗口缩放都是 $10$，所以 16 位窗口字段以 $2^{10} = 1024$ 字节为单位计数。MSS 为 $65483$ 字节，因为环回接口的 MTU 是 $65536$（减去 IP 和 TCP 首部以及 12 字节的时间戳选项）；在以太网上会是 $1448$。平滑 RTT 为 $0.023$ ms，平均偏差 $0.008$ ms，重传超时却是 $201$ ms，因为 Linux 从不把它设到 $200$ ms 以下（见 [[#alg-rto]]）。`bytes_acked` 比 `bytes_sent` 多一，因为 `SYN` 消耗了一个序号。10 MB 大约以 200 个报文段发出，因为 100 次各 100,000 字节的 `sendall` 调用，每一次都恰好装进至多 $65483$ 字节的两个报文段。
:::
:::

### 往返时间的估计

TCP 在**重传定时器**到期时重传报文段。超时必须比随排队波动的往返时间长，但又不能长太多，否则恢复就慢。TCP 持续测量 RTT，保存一个平滑平均值和它波动幅度的度量。

::: algorithm 重传超时（RFC 6298） {#alg-rto}
常数 $\alpha = 1/8$，$\beta = 1/4$，$K = 4$；时钟粒度 $G$。

1. 任何测量之前，$\text{RTO} \gets 1$ s。
2. 第一次 RTT 测量 $R$：$\text{SRTT} \gets R$，$\text{RTTVAR} \gets R/2$。
3. 其后每次测量 $R'$：
   $\text{RTTVAR} \gets (1 - \beta)\,\text{RTTVAR} + \beta\,\lvert \text{SRTT} - R' \rvert$，然后 $\text{SRTT} \gets (1 - \alpha)\,\text{SRTT} + \alpha R'$。
4. 置 $\text{RTO} \gets \text{SRTT} + \max(G, K \cdot \text{RTTVAR})$；RFC 6298 规定此时若小于 1 s 应向上取整到至少 1 s（Linux 用 200 ms），并且可以把上限设为 60 s 或更大。
5. 定时器到期时，重传最早的未确认报文段，并把 RTO 加倍（**指数退避**）。
6. **Karn 法则**：不要从重传过的报文段取 RTT 测量值，因为一条 ACK 说不清它确认的是哪一份拷贝（除非使用时间戳）。
:::

$\text{SRTT}$ 是一个**指数加权滑动平均**：每个样本的权重随每个新样本以 $7/8$ 的因子衰减，所以它能在几十个样本之内跟上变化，同时无视噪声。加上四倍平均偏差，即使在 RTT 剧烈波动时虚警超时也很罕见。第 5 步的退避与估计本身同样重要：网络拥塞时，超时彼此指数地拉开距离，而不是雪上加霜——这正是 1986 年那些主机没有做到的。

::: example 更新超时值 {#ex-rto}
第一个 RTT 样本是 $100$ ms；随后三个是 $120$、$80$ 和 $200$ ms。计算每个样本之后的 SRTT、RTTVAR 和 RTO（忽略最小值和 $G$）。
::: solution
| 样本 $R$ | RTTVAR | SRTT | RTO $= \text{SRTT} + 4\,\text{RTTVAR}$ |
|---|---|---|---|
| $100$（首次） | $50$ | $100$ | $300$ |
| $120$ | $\tfrac34 \cdot 50 + \tfrac14 \cdot 20 = 42.5$ | $\tfrac78 \cdot 100 + \tfrac18 \cdot 120 = 102.5$ | $272.5$ |
| $80$ | $\tfrac34 \cdot 42.5 + \tfrac14 \cdot 22.5 = 37.5$ | $\tfrac78 \cdot 102.5 + \tfrac18 \cdot 80 = 99.6875$ | $249.6875$ |
| $200$ | $\tfrac34 \cdot 37.5 + \tfrac14 \cdot 100.3125 \approx 53.20$ | $\tfrac78 \cdot 99.6875 + \tfrac18 \cdot 200 \approx 112.23$ | $\approx 325.04$ |

每次 RTTVAR 更新都使用*先前*的 SRTT，正如算法所规定。突然出现的 $200$ ms 样本只让 SRTT 移动 $12.5$ ms，却让 RTTVAR 上升一半，于是 RTO 比平均值上升得快——一次时延尖峰使 TCP 更加小心。若按 RFC 6298 的最小值，四个 RTO 都会取整到 $1$ s。
:::
:::

### 流量控制

接收端 TCP 把到达的字节存入**接收缓冲区**，直到应用把它们读走。应用读得慢时，快的发送方可能把它撑爆。**流量控制**防止这一点。

::: proposition 流量控制 {#prop-flow}
设接收方有 $B$ 字节的缓冲区，并让它在每个报文段中通告**接收窗口** $\text{rwnd} = B - (\text{LastByteRcvd} - \text{LastByteRead})$，即缓冲区中的空闲空间。若发送方使用最近收到的那个窗口，保持 $\text{LastByteSent} - \text{LastByteAcked} \le \text{rwnd}$，接收缓冲区就永不溢满。
:::

::: proof
考察接收方收到直至字节 $r_0$、应用读到直至 $\ell_0$ 时作出的那次通告；它承诺了 $r_0$ 之外 $\text{rwnd} = B - (r_0 - \ell_0)$ 字节的空间，并确认了直到 $r_0$ 的一切。发送方收到它时有 $\text{LastByteAcked} = r_0$，于是可以发送直到 $r_0 + \text{rwnd} = B + \ell_0$ 的字节。此后应用只会读得更多，$\ell \ge \ell_0$，所以缓冲区至多持有 $(B + \ell_0) - \ell \le B$ 字节。通告可能被重排或丢失，但只使用确认最新的那个报文段里的窗口的发送方，用的一定仍然是有效的承诺——前提是接收方从不**缩小**窗口，即从不收回它已经提供的空间，RFC 9293 正因这一点而强烈反对这样做。
:::

窗口降为零时发送方停下来，并周期性地发送一个只有一字节的**窗口探测**，以便知道何时腾出了空间（否则重新开窗的通告可能丢失，双方将永远互等）。注意窗口字段只有 16 位；在带宽时延乘积大的路径上，**窗口缩放**选项（RFC 7323）把它乘以 $2^s$，$0 \le s \le 14$，于是可以达到约 1 GiB 的窗口（[[networks/network-principles#ex-lfn]]）。

::: quiz
客户端已发送到序号 9000，收到确认号 6001、窗口 4000。它现在可以发送的字节的最高序号是多少？
- [ ] 9000：它已经到达了极限。
- [x] 10000
- [ ] 13000
- [ ] 10001
::: solution
确认号表示接收方拥有直到 6000 的每个字节，所以 $\text{LastByteAcked} = 6000$，它在那之后还能容纳 $4000$ 字节：字节 $6001$ 到 $10000$。客户端已发到 $9000$，所以还能再发 $1000$ 字节，直到字节 $10000$——前提是它的拥塞窗口（下文）也允许。
:::
:::

## 拥塞控制

流量控制保护的是接收方。其中没有任何东西保护中间的路由器。**拥塞控制**算法决定以多快的速度发送，以便既用好瓶颈链路又不把它压垮，并与其它流共享它。

拥塞的代价容易列出。路由器处的到达速率逼近链路容量时，排队时延无界增长（[[networks/network-principles#thm-mm1]]）。缓冲填满时分组被丢弃，发送方又重传它们——于是链路同时运送原始数据和重传，**有效吞吐量**（goodput，交付的有用数据）跌到吞吐量之下。一个在最后一台路由器被丢弃的分组，浪费了它此前穿过的每条链路的容量。若发送方还重发仅仅是被延迟的分组，有效吞吐量几乎可以归零：拥塞崩溃。

有两条大的路线。在**网络辅助**的拥塞控制中，路由器显式地告诉发送方发生了拥塞：用**显式拥塞通知**（ECN，RFC 3168），队列正在堆积的路由器给报文段做标记（IP 首部的两个比特）而不是丢弃它们，接收方在 TCP 的 `ECE` 标志中回显这个标记，发送方就按丢了一个分组那样作出反应。在**端到端**的拥塞控制中，网络什么都不说，发送方从自己观察到的东西推断拥塞：丢失（超时和重复 ACK）或增长的时延。TCP 就是按端到端方式设计的，它至今仍是默认。

::: definition 拥塞窗口 {#def-cwnd}
TCP 发送方保存一个以字节计的**拥塞窗口** $\text{cwnd}$ 和一个**慢启动阈值** $\text{ssthresh}$。它可以保持在外的未确认数据量为

$$
\text{LastByteSent} - \text{LastByteAcked} \le \min(\text{cwnd}, \text{rwnd}).
$$

由于每个往返大约发送一个窗口，发送速率约为每秒 $\text{cwnd}/\text{RTT}$ 字节。TCP 的确认按瓶颈交付数据的速率到达，所以每收到一个确认就发送一个新报文段的发送方是**自时钟**的：不用测量就以瓶颈的速率发送。
:::

### TCP Reno

::: algorithm TCP Reno 拥塞控制（RFC 5681） {#alg-reno}
记 SMSS 为发送方的最大报文段长度。

1. **初始**：$\text{cwnd} \gets$ 一个小的初始窗口（RFC 5681 允许至多约 4 个报文段；RFC 6928 试验性的 10 个报文段在实践中很常见），$\text{ssthresh} \gets$ 一个很大的值。
2. **慢启动**（当 $\text{cwnd} < \text{ssthresh}$）：每收到一个新的确认，$\text{cwnd} \gets \text{cwnd} + \text{SMSS}$。窗口每个往返翻倍。
3. **拥塞避免**（当 $\text{cwnd} \ge \text{ssthresh}$）：每收到一个新的确认，$\text{cwnd} \gets \text{cwnd} + \text{SMSS}^2/\text{cwnd}$。每个往返大约增加一个 SMSS。
4. **快速重传与快速恢复**：收到第三个重复确认时，置 $\text{ssthresh} \gets \max(\text{FlightSize}/2, 2\,\text{SMSS})$，其中 FlightSize 是未决数据量；重传丢失的报文段，并置 $\text{cwnd} \gets \text{ssthresh} + 3\,\text{SMSS}$（三个报文段已经离开网络）。此后每收到一个重复确认，把 SMSS 加到 cwnd 上，并在窗口允许时发送一个新报文段。当新的确认到达时，置 $\text{cwnd} \gets \text{ssthresh}$，在拥塞避免中继续。（NewReno，RFC 6582，改进了一个窗口内丢失多个分组时的情形。）
5. **超时**：置 $\text{ssthresh} \gets \max(\text{FlightSize}/2, 2\,\text{SMSS})$，$\text{cwnd} \gets 1\,\text{SMSS}$，重传，并进入慢启动。
:::

其中的逻辑是：两种丢失信号含义不同。三个重复确认说明后面的报文段还在通过——网络拥塞但仍然在工作——于是 TCP 把窗口减半继续前进。超时说明什么都过不去，于是 TCP 从一个报文段重新开始。“慢启动”是历史造成的误称：与 1988 年以前 TCP 一次性发送整个接收窗口相比，它慢；与拥塞避免相比，它却是快速的指数式增长，用 $O(\log W)$ 个往返就能找到可用容量。

```python
# reno.py：TCP Reno 的拥塞窗口，每个往返一个值（以报文段计）
def reno(rounds, capacity, ssthresh=16, timeout_at=()):
    cwnd, trace = 1, []
    for t in range(rounds):
        trace.append((t, cwnd))
        if t in timeout_at:                  # 重传超时：回到 1
            ssthresh, cwnd = max(cwnd // 2, 2), 1
        elif cwnd > capacity:                # 一次丢失，由 3 个重复 ACK 察觉
            ssthresh = max(cwnd // 2, 2)
            cwnd = ssthresh                  # 快速恢复：减半，跳过慢启动
        elif cwnd < ssthresh:
            cwnd = min(2 * cwnd, ssthresh)   # 慢启动：每个 RTT 翻倍……
        else:                                # ……但不超过 ssthresh
            cwnd += 1                        # 拥塞避免：每个 RTT 加 1 个 MSS
    return trace

trace = reno(40, capacity=24, timeout_at={30})
print("; ".join(f"{t},{w}" for t, w in trace))
```

```console
$ python3 reno.py
0,1; 1,2; 2,4; 3,8; 4,16; 5,17; 6,18; 7,19; 8,20; 9,21; 10,22; 11,23; 12,24; 13,25; 14,12; 15,13; 16,14; 17,15; 18,16; 19,17; 20,18; 21,19; 22,20; 23,21; 24,22; 25,23; 26,24; 27,25; 28,12; 29,13; 30,14; 31,1; 32,2; 33,4; 34,7; 35,8; 36,9; 37,10; 38,11; 39,12
```

::: widget plot
f: 24
x: 0, 40
y: 0, 30
labels: \text{容量（24 个报文段）}
points: 0,1; 1,2; 2,4; 3,8; 4,16; 5,17; 6,18; 7,19; 8,20; 9,21; 10,22; 11,23; 12,24; 13,25; 14,12; 15,13; 16,14; 17,15; 18,16; 19,17; 20,18; 21,19; 22,20; 23,21; 24,22; 25,23; 26,24; 27,25; 28,12; 29,13; 30,14; 31,1; 32,2; 33,4; 34,7; 35,8; 36,9; 37,10; 38,11; 39,12
caption: `reno.py` 计算出的 TCP Reno 拥塞窗口（以报文段计），取值在每个往返开始时：从 1 到 ssthresh = 16 的慢启动；拥塞避免直到窗口超过路径（管道加路由器缓冲）能容纳的 24 个报文段；一次由三个重复 ACK 察觉的丢失把窗口减半到 12，形成著名的**锯齿波**；第 30 个往返的一次超时把窗口打回 1，随后慢启动爬向新的 ssthresh 7。注意快速重传之后窗口从一半重新起步，不再慢启动；锯齿的平均值约为峰值的四分之三，[[#prop-mathis]] 正是把它变成吞吐量。
:::

::: example 一段 Reno 轨迹 {#ex-reno}
一个 SMSS $= 1$ 报文段的 Reno 连接以 $\text{cwnd} = 1$、$\text{ssthresh} = 16$ 开始。用 `reno.py` 的逐往返模型，求路径容纳 24 个报文段时前 16 个往返各自的窗口，并解释每次变化。
::: solution
由上面的输出：往返 $0$–$4$，慢启动：$1, 2, 4, 8, 16$，每个 RTT 翻倍。到达 $16 = \text{ssthresh}$，拥塞避免开始：往返 $5$–$13$ 为 $17, 18, \dots, 25$，每个 RTT 一个报文段。往返 $13$ 时窗口 $25$ 超过路径能容纳的 $24$ 个报文段；一个报文段被丢弃，三个重复 ACK 到达，Reno 置 $\text{ssthresh} = \lfloor 25/2 \rfloor = 12$、$\text{cwnd} = 12$（快速恢复之后）。往返 $14$、$15$：$12$、$13$——恢复线性增长。（模型把减半向下取整，并忽略快速恢复期间 cwnd 的短暂膨胀。）窗口大部分时间在 $12$ 到 $25$ 之间度过；在 $24$ 个 $1460$ 字节的报文段、RTT 为 $50$ ms 下，其平均值约 $18.5$ 个报文段大致相当于 $4.3$ Mb/s。
:::
:::

### AIMD 为什么公平

拥塞避免中的 Reno 使用**加法增大、乘性减小**（AIMD）：每个往返加上一个常数，发生拥塞时乘以一个小于 1 的常数。为什么偏偏是这个组合？Dah-Ming Chiu 与 Raj Jain 在 1989 年用一个简单模型作出了回答。

::: theorem AIMD 收敛于公平 {#thm-aimd}
两条速率为 $x_1, x_2 \ge 0$ 的流共享一条容量为 $C$ 的链路。时间按轮推进。每轮中，若 $x_1 + x_2 \le C$，两流都把速率加上 $a > 0$；若 $x_1 + x_2 > C$，两流都观察到拥塞，都把速率乘以 $b$，其中 $0 < b < 1$。于是差 $x_1 - x_2$ 在每次增大下保持不变、在每次减小下乘以 $b$；减小发生无穷多次；因此 $x_1 - x_2 \to 0$：速率收敛于均等的份额，各自在 $C/2$ 附近振荡。
:::

::: proof
一次增大把 $(x_1, x_2)$ 变为 $(x_1 + a, x_2 + a)$，$x_1 - x_2$ 不变；一次减小把它变为 $(b x_1, b x_2)$，把 $x_1 - x_2$ 乘以 $b$。减小会无穷多次发生：只要 $x_1 + x_2 \le C$，和每轮就增长 $2a$，所以至多 $\lfloor C/(2a) \rfloor + 1$ 轮之后必超过 $C$，随后就是一次减小。$k$ 次减小之后，$\lvert x_1 - x_2 \rvert = b^k \lvert x_1^{(0)} - x_2^{(0)} \rvert \to 0$。与此同时，和 $x_1 + x_2$ 每个周期升到略高于 $C$ 又落回约 $bC$，于是每个速率在约 $bC/2$ 与 $C/2$ 之间振荡。
:::

看起来同样合理的另外两种策略却行不通。加法增大配*加法*减小时，两个速率改变同样的量，$x_1 - x_2$ 永不改变：不公平的起点永远不公平。乘性增大配乘性减小时，两者乘以同样的因子，*比值* $x_1/x_2$ 永不改变。只有 AIMD 把速率推向均等——每次减小时，较大的流让出更多。在 $(x_1, x_2)$ 平面上，增大使点沿 45° 方向移动，平行于公平线 $x_1 = x_2$；减小使点径直朝原点移动，从而靠近那条线。

```python
# aimd.py：两条 AIMD 流共享容量为 C 的链路（同步丢失）
def aimd(x1, x2, C, rounds, a=1.0, b=0.5):
    points = [(x1, x2)]
    for _ in range(rounds):
        if x1 + x2 > C:                      # 链路超载：两者都察觉一次丢失
            x1, x2 = b * x1, b * x2          # 乘性减小
        else:
            x1, x2 = x1 + a, x2 + a          # 加法增大
        points.append((x1, x2))
    return points

pts = aimd(70, 10, C=100, rounds=200)
losses = [i for i in range(1, len(pts)) if pts[i][0] < pts[i - 1][0]]
print("losses at rounds", losses[:6])
for i in losses[:6]:
    print(f"after round {i}: x1={pts[i][0]:.2f} x2={pts[i][1]:.2f} gap={pts[i][0] - pts[i][1]:.2f}")
print("final", tuple(round(v, 2) for v in pts[-1]))
print("; ".join(f"{x:.1f},{y:.1f}" for x, y in pts[:120:3]))
```

```console
$ python3 aimd.py
losses at rounds [12, 38, 64, 90, 116, 142]
after round 12: x1=40.50 x2=10.50 gap=30.00
after round 38: x1=32.75 x2=17.75 gap=15.00
after round 64: x1=28.88 x2=21.38 gap=7.50
after round 90: x1=26.94 x2=23.19 gap=3.75
after round 116: x1=25.97 x2=24.09 gap=1.88
after round 142: x1=25.48 x2=24.55 gap=0.94
...
```

（最后两行输出略去。）每次丢失都使差距减半，正与 [[#thm-aimd]] 的预测一致。

::: widget plot
f: x; 100 - x
x: 0, 100
y: 0, 100
equal: true
labels: \text{公平线：} x_2 = x_1; \text{满载线：} x_1 + x_2 = 100
points: 70.00,10.00; 81.00,21.00; 40.50,10.50; 65.50,35.50; 32.75,17.75; 57.75,42.75; 28.88,21.38; 53.88,46.38; 26.94,23.19; 51.94,48.19; 25.97,24.09; 50.97,49.09; 25.48,24.55
caption: $(x_1, x_2)$ 平面上的两条 AIMD 流，由 `aimd.py` 计算：从 $(70, 10)$ 出发，每轮给两个速率各加 $1$（45° 一步），总数超过容量 $C = 100$ 时两者同时减半（朝原点一跳）。标出的点是起点以及每次丢失前夕和刚丢失后的速率。注意每一次朝原点的跳跃都落得更靠近公平线，于是这条折线收敛到两线交点——链路被充分利用、均等分享。
:::

真实的流不会同步察觉丢失，往返时间各不相同，也不会同时开始，所以真实的 TCP 公平只是近似的。有一个系统性影响值得知道：一条 Reno 流每个*往返*加一个报文段，所以 RTT 两倍的流窗口增速慢一半，把窗口变成速率也慢一半。在下一个命题的假设下，它的吞吐量与 RTT 成反比——距离远的流得到的少。

::: definition Jain 公平指数 {#def-jain}
对 $n$ 条吞吐量为 $x_1, \dots, x_n$ 的流，**Jain 公平指数**为 $J = \left(\sum_i x_i\right)^2 / \left(n \sum_i x_i^2\right)$。它的范围从 $1/n$（一条流独占）到 $1$（完全均等）；当 $k$ 条流均分、其余一无所获时 $J = k/n$。
:::

### Reno 流的吞吐量

::: proposition 平方根公式 {#prop-mathis}
设一条处于拥塞避免的 TCP 流每次窗口达到 $W$ 个报文段时恰好看到一次丢失，往返时间 $\text{RTT}$ 恒定，且这样周期性发生，于是它的报文段有比例 $p$ 丢失。则它的平均吞吐量为

$$
\text{throughput} = \frac{\text{MSS}}{\text{RTT}} \sqrt{\frac{3}{2p}} \approx \frac{1.22 \cdot \text{MSS}}{\text{RTT}\sqrt{p}}.
$$ {#eq-mathis}
:::

::: proof
每次丢失之后窗口减半到 $W/2$，随后每个 RTT 增长一个报文段，$W/2$ 个往返之后达到 $W$，下一次丢失随之发生。这个周期内窗口取值 $W/2, W/2 + 1, \dots, W$，于是该流在 $W/2$ 个往返内发送约 $\tfrac{W}{2} \cdot \tfrac{3W}{4} = \tfrac{3W^2}{8}$ 个报文段（把窗口看作连续增长）。其中丢失一个，所以 $p = 8/(3W^2)$，即 $W = \sqrt{8/(3p)}$。平均窗口为 $3W/4$，平均吞吐量为 $\tfrac{3W}{4} \cdot \tfrac{\text{MSS}}{\text{RTT}} = \tfrac{3}{4}\sqrt{\tfrac{8}{3p}}\,\tfrac{\text{MSS}}{\text{RTT}} = \sqrt{\tfrac{3}{2p}}\,\tfrac{\text{MSS}}{\text{RTT}}$。
:::

模型很粗糙——它忽略超时、慢启动和接收窗口——但 Mathis、Semke、Mahdavi 与 Ott 的测量（1997）表明，对长流它是一个很好的近似，而且它解释了三个事实。吞吐量随 RTT 下降，如上所述。它只随丢失率的平方根下降。而在长路径上获得高吞吐量需要低得离谱的丢失率。

::: example 跨洋十个千兆比特 {#ex-mathis}
一条 Reno 流的 $\text{MSS} = 1460$ 字节，$\text{RTT} = 100$ ms。(a) 丢失率 $p = 10^{-4}$ 时它的吞吐量是多少？(b) 要多低的丢失率才能让它达到 10 Gb/s？
::: solution
(a) $\text{MSS}/\text{RTT} = 11680\ \text{bits}/0.1\ \text{s} = 116.8$ kb/s，而 $\sqrt{3/(2 \times 10^{-4})} = \sqrt{15000} \approx 122.5$，得到约 $14.3$ Mb/s。

(b) 由 [[#eq-mathis]] 解出 $p$：$p = \tfrac32 \left(\tfrac{\text{MSS}}{\text{RTT} \cdot \text{throughput}}\right)^2 = 1.5 \times \left(\tfrac{11680}{0.1 \times 10^{10}}\right)^2 \approx 2 \times 10^{-10}$：至多五十亿个报文段丢一个，低于许多链路的误码率。平均窗口将达约 $85{,}600$ 个报文段——即带宽时延乘积——峰值 $W = \sqrt{8/(3p)} \approx 114{,}000$；丢失一次之后，Reno 需要 $W/2 \approx 57{,}000$ 个往返、一个半小时以上，才能把窗口长回去。Reno 用不了这样的路径，这正是 CUBIC 之类高速算法被设计出来的原因。
:::
:::

## 现代拥塞控制

### CUBIC

CUBIC（Ha、Rhee 与 Xu，2008；RFC 9438，2023，取代 RFC 8312）保留乘性减小，但把 Reno 的线性增长替换成关于*距上次丢失的时间*的三次函数，与 RTT 无关。设 $W_\text{max}$ 为最近一次缩减前的窗口。丢失之后 CUBIC 把窗口乘以 $\beta = 0.7$，然后在丢失后 $t$ 时刻把它设为

$$
W(t) = C\,(t - K)^3 + W_\text{max}, \qquad K = \sqrt[3]{\frac{W_\text{max}(1 - \beta)}{C}},
$$ {#eq-cubic}

其中 $C = 0.4$，窗口以报文段计，$t$ 以秒计。$K$ 是窗口回到 $W_\text{max}$ 的时刻：$W(0) = \beta W_\text{max}$ 且 $W(K) = W_\text{max}$。曲线在 $K$ 之前是**凹**的——起初增长很快，接近上次发生丢失的水平时放慢——$K$ 之后是**凸**的，一旦确认旧的限度已经过去，就越来越快地试探新的容量。因为增长取决于时间而不是往返数，RTT 不同的流增长一样快，这减轻了 RTT 不公平。CUBIC 还会算出 Reno 本会采用的窗口，且从不取比它更小的值（它的“Reno 友好区”），所以在短 RTT 路径上它不比 Reno 温和。截至 2026 年，CUBIC 是 Linux（自 2006 年）、Windows 与 macOS 的默认拥塞控制算法——[[#ex-ss]] 中的 `ss` 输出正是它在工作。

::: widget plot
f: 0.4*(x - cbrt(W*(1 - 0.7)/0.4))^3 + W; W; 0.7*W
x: 0, 12
y: 0, 200
sliders: W=100:10:150:5
labels: W(t); W_{\max}; \beta W_{\max}
caption: CUBIC 窗口（[[#eq-cubic]]）以报文段计随丢失后时间 $t = x$（秒）的变化，其中 $W_\text{max} = W$。窗口从 $0.7\,W_\text{max}$ 重新起步，快速上升，在 $t = K$（$W_\text{max} = 100$ 时约 $4.2$ s）附近于 $W_\text{max}$ 处放平，然后加速。增大 $W$：$K$ 只按 $W_\text{max}$ 的立方根增长，所以大窗口恢复旧水平比需要 $0.3\,W_\text{max}$ 个往返的 Reno 早得多。
:::

### BBR 与基于时延的控制

基于丢失的算法把瓶颈的缓冲填满直到溢出，所以一个大缓冲的路由器会让经过它的每条流都背上一个很大的常设排队时延——这就是所谓的**缓冲膨胀**（bufferbloat）。而在有随机、非拥塞性丢失的路径上（无线链路常见，[[networks/wireless-mobile]]），它们又无谓地退让。**基于时延**的算法转而响应上升的 RTT；TCP Vegas（Brakmo 与 Peterson，1994）是第一个，但它竞争不过与它共享瓶颈的基于丢失的流，因为后者不停地填满 Vegas 想要保持清空的队列。

**BBR**（Cardwell、Cheng、Gunn、Hassas Yeganeh 与 Jacobson，2016）采取基于模型的方法。一条路径在任一时刻有一个**瓶颈带宽** $\text{BtlBw}$ 和一个**往返传播时间** $\text{RTprop}$，理想的运行点是按 $\text{BtlBw}$ 的速率发送、并恰有 $\text{BtlBw} \times \text{RTprop}$——一个带宽时延乘积——在途：管道装满，队列清空。BBR 把 $\text{BtlBw}$ 估计为最近几个往返内测得的最大交付速率，把 $\text{RTprop}$ 估计为最近十秒内的最小 RTT；它按自己的带宽估计**定速**（pace）发包而不是成阵地发送，把在途数据限制在估计的带宽时延乘积的一个小倍数内，并且周期性探测——以一个往返发送估计值的 1.25 倍，再用 0.75 倍排空自己造成的队列——来发现更多带宽，还偶尔在不到一秒的时间里大幅削减窗口以重新测量 $\text{RTprop}$。它不把丢失当作主要的拥塞信号。BBR 的原始版本可能对基于丢失的流不公平，并在浅缓冲中造成大量丢失；后续版本增加了对丢失和 ECN 的响应，截至 2026 年 BBR 仍在 IETF 标准化之中。大型内容提供商广泛使用它。

两项网络辅助的进展与这些算法互补。路由器中的**主动队列管理**——如 CoDel（RFC 8289）——在队列持续过长一段时间之后就提前丢弃或 ECN 标记报文段，而不是等缓冲装满。而 **L4S**（RFC 9330–9332，2023）定义了一个独立的低时延服务，其中的发送方对频繁的 ECN 标记以小而成比例的退让作出响应，把队列保持在一毫秒以内。

::: warning 分组丢失并不总意味着拥塞
基于丢失的拥塞控制假定丢失的分组意味着某处的队列满了。在有线路径上这几乎总是成立。在无线链路上，分组可能因干扰或衰落而丢失，毫无拥塞可言，而 Reno 或 CUBIC 发送方照样把窗口减半；由 [[#prop-mathis]]，1% 的丢失率把一条流限制在约 $12\,\text{MSS}/\text{RTT}$，无论链路多快。相反的错误也会发生：一个大缓冲的路由器可能一个分组都不丢，却添上一秒的时延。链路层重传（[[networks/wireless-mobile]]）、ECN 以及 BBR 这样感知时延的算法，都在弥合“分组丢了”与“网络拥塞”之间的缝隙。
:::

### 对 TCP 的攻击及其防御

TCP 保存的状态以及它对收到的报文段的信任，使它暴露于一些经典攻击，每种如今都有标准防御。**SYN 洪泛**发送大量源地址伪造的 `SYN`；每一个都迫使服务器为一个永远不会完成的半开连接分配状态，直到等待队列装满、真实客户端被拒之门外。防御办法是 **SYN 门铃**（SYN cookies，D. J. Bernstein，1996；RFC 4987 有述）：不为半开连接保存状态——服务器把所需信息编码进自己的初始序号，它是连接的各地址和端口加上一个时钟的带密钥散列——当最后的 `ACK` 带着该数加一返回时再把它重构出来。向既有连接**盲目注入**数据或复位需要猜出接收窗口内的序号；随机的初始序号使这件事变得困难，RFC 5961 则收紧了端点核查一个 `RST` 或 `SYN` 是否真的属于当前窗口的标准。这些都认证不了数据：防御*在*路径上的攻击者需要 TLS 或 QUIC 加密，这同时也防止中间盒篡改传输层首部。

::: history
TCP 由 Jon Postel 在 RFC 793（1981 年 9 月）中规定，源自 Cerf 与 Kahn 的设计；2022 年连同四十年的修正与扩展整合为 RFC 9293。1986 年的拥塞崩溃之后，范·雅各布森（Van Jacobson）与 Michael Karels 在伯克利共事，把慢启动、拥塞避免、快速重传和改进的 RTT 估计（连同指数退避以及 Karn 与 Partridge 1987 年的法则）加入了 4.3BSD；他的论文“Congestion avoidance and control”（SIGCOMM 1988）是 networking 领域最有影响的论文之一。K. K. Ramakrishnan 与 Raj Jain 的 DECbit 方案（1988）开创了路由器辅助的拥塞信号，是 ECN 的祖先；Dah-Ming Chiu 与 Raj Jain 1989 年的分析解释了为什么 AIMD 收敛于公平。快速恢复出现在 1990 年的 4.3BSD “Reno” 发行版中，该算法由此得名。Sally Floyd 与雅各布森的随机早期检测（Random Early Detection，1993）开启了主动队列管理；Matthew Mathis 等人于 1997 年发表了平方根公式；Sangtae Ha、Injong Rhee 与 Lisong Xu 的 CUBIC 出现于 2008 年，Neal Cardwell 等人的 BBR 出现于 2016 年。
:::

## 后续内容

TCP 的拥塞控制在 [[networks/wireless-mobile]] 与无线链路相遇，那里的丢失并不总是拥塞。TCP 的报文段穿行其中的网络层——IP、它的地址和 ECN 比特——是下一章 [[networks/network-layer]] 的内容。用 UDP 在用户空间重新实现 TCP 的可靠性与拥塞控制（通常是 CUBIC 或 BBR）的 QUIC，已在 [[networks/application-layer]] 出现。把拥塞控制看作网络效用分布式优化之控制论观点属于进阶课程；[[#thm-aimd]] 的公平性与收敛论证在 [[distributed-systems]] 的分布式资源分配中重现。

::: summary
- TCP 是面向连接的可靠字节流；其首部携带 32 位的字节**序号**和累计**确认号**、各标志位和接收**窗口**（[[#def-segment]]）。
- 连接用带随机初始序号的**三次握手**打开（[[#alg-handshake]]），并在两个方向上分别关闭；主动关闭的一方在 **TIME-WAIT** 中等 $2 \cdot \text{MSL}$（[[#def-states]]）。
- **重传超时**为 $\text{SRTT} + 4\,\text{RTTVAR}$，由指数加权平均得出，配指数退避和 Karn 法则（[[#alg-rto]]）。**流量控制**把未确认数据限制在接收窗口之内（[[#prop-flow]]）。
- **拥塞控制**把发送方限制在 $\min(\text{cwnd}, \text{rwnd})$；Reno 使用**慢启动**、**拥塞避免**（AIMD）、三个重复 ACK 时的**快速重传/恢复**，超时时重置为一个报文段（[[#alg-reno]]）。
- **AIMD** 收敛于公平份额，因为增大使各流之差保持不变、减小使它缩小（[[#thm-aimd]]）；AIAD 和 MIMD 则不然。
- Reno 的吞吐量约为 $1.22\,\text{MSS}/(\text{RTT}\sqrt{p})$（[[#prop-mathis]]），对长 RTT 不公平，也填不满快而长的路径。**CUBIC** 按距上次丢失时间的三次函数增长；**BBR** 按实测的瓶颈带宽定速发送，在途约一个带宽时延乘积。
:::

## 习题

::: exercise 序号与确认号 {level=1 check="1501"}
一个客户端的初始序号是 $1000$。握手之后它发送一个带 $500$ 字节数据的报文段。那个报文段携带什么序号？服务器回应的确认号是多少？（输入确认号。）
::: solution
`SYN` 使用序号 $1000$，所以第一个数据字节是 $1001$：该报文段携带字节 $1001$–$1500$，序号为 $1001$。服务器用它期待的下一个字节 $1501$ 作出确认。
:::
:::

::: exercise 一次 RTO 更新 {level=1 check="165"}
TCP 在收到一个 $60$ ms 的新样本时有 $\text{SRTT} = 100$ ms、$\text{RTTVAR} = 10$ ms。按 [[#alg-rto]] 计算新的 RTO，忽略最小值和时钟粒度。（以毫秒输入 RTO。）
::: solution
$\text{RTTVAR} \gets \tfrac34 \cdot 10 + \tfrac14 \cdot \lvert 100 - 60 \rvert = 7.5 + 10 = 17.5$ ms；$\text{SRTT} \gets \tfrac78 \cdot 100 + \tfrac18 \cdot 60 = 87.5 + 7.5 = 95$ ms；$\text{RTO} = 95 + 4 \times 17.5 = 165$ ms。次序要紧处在于：若先算 SRTT、再在 RTTVAR 的更新中使用新值，会得到 $\lvert 95 - 60 \rvert = 35$、$\text{RTTVAR} = 16.25$、RTO 为 $160$ ms，这不是 RFC 6298 的规定。一个远低于平均值的样本在这里仍然*抬高*了 RTO，因为它抬高了估计的波动幅度。
:::
:::

::: exercise 慢启动 {level=1 check="6"}
一条 TCP 连接以 $\text{cwnd} = 1$ 报文段、极大的 ssthresh 开始，且从不发生丢失。经过多少个往返它的窗口第一次达到 $64$ 个报文段？（输入往返数。）
::: solution
窗口每个往返翻倍：$1, 2, 4, 8, 16, 32, 64$。经过 $6$ 个往返达到 $64 = 2^6$。一般地，达到 $W$ 需要 $\lceil \log_2 W \rceil$ 个往返——慢启动是指数式的。
:::
:::

::: exercise 平方根公式 {level=2 check="14.3"}
用 [[#eq-mathis]]，MSS 1460 字节、RTT 100 ms、丢失率 $10^{-4}$ 的 Reno 流吞吐量是多少？RTT 减半、丢失率降为四分之一时，它各变为几倍？（以 Mb/s 输入吞吐量，保留一位小数。）
::: solution
与 [[#ex-mathis]] 相同：$116.8\ \text{kb/s} \times \sqrt{15000} \approx 116.8 \times 122.47\ \text{kb/s} \approx 14.3$ Mb/s。RTT 减半使它翻倍（到 $28.6$ Mb/s）；丢失率降为四分之一也使它翻倍，因为吞吐量正比于 $1/\sqrt{p}$。
:::
:::

::: exercise 一个公平指数 {level=2 check="0.75"}
四条流共享一个瓶颈，分别得到 $10$、$10$、$10$ 和 $30$ Mb/s。计算 Jain 公平指数（[[#def-jain]]）。同样的 $60$ Mb/s 怎样分配才能使指数为 $1$？（输入指数。）
::: solution
$\sum x_i = 60$，$\sum x_i^2 = 100 + 100 + 100 + 900 = 1200$，所以 $J = 60^2/(4 \times 1200) = 3600/4800 = 0.75$。指数恰为 $1$ 当且仅当各流相等：每条 $15$ Mb/s。
:::
:::

::: exercise 手算 Reno {level=2 check="7"}
使用 `reno.py` 的逐往返模型：一轮的窗口在轮初记录，对丢失的反应在下一轮生效。第 $0$ 轮开始时一条 Reno 连接处于拥塞避免，$\text{cwnd} = 20$ 个报文段；第 $0$ 轮中一次丢失被三个重复 ACK 察觉。第 $5$ 轮发生一次重传超时。第 $9$ 轮开始时的窗口是多少？（以报文段数输入窗口。）
::: solution
第 $0$ 轮：$20$；丢失置 $\text{ssthresh} = 10$、$\text{cwnd} = 10$。第 $1$–$5$ 轮（拥塞避免）：$10, 11, 12, 13, 14$。第 $5$ 轮的超时置 $\text{ssthresh} = \lfloor 14/2 \rfloor = 7$、$\text{cwnd} = 1$。第 $6$–$9$ 轮（慢启动，以 ssthresh 为顶）：$1, 2, 4$，然后 $\min(8, 7) = 7$。所以第 $9$ 轮开始时的窗口是 $7$，此后拥塞避免重新开始：第 $10$ 轮为 $8$。一次超时的代价远大于三个重复 ACK 的那次丢失：爬回先前窗口的一半要花四个往返。
:::
:::

::: exercise 为什么不是 AIAD 或 MIMD？{level=3}
在 [[#thm-aimd]] 的模型中，改设两条流使用 (a) 加法增大 $a$、加法减小 $d$（永不低于零），或 (b) 以因子 $c > 1$ 乘性增大、以 $b < 1$ 乘性减小。证明在 (a) 中只要两个速率都不撞零，差 $x_1 - x_2$ 就是常数；在 (b) 中比值 $x_1/x_2$ 是常数。对两条从速率 $(70, 10)$ 开始的流，二者各意味着什么？最后，证明 AIMD 也收敛于*效率*：两速率之和在约 $bC$ 与 $C + 2a$ 之间振荡。
::: solution
(a) 每轮两个速率改变同样的量，$+a$ 或 $-d$，所以 $x_1 - x_2$ 不变（直到某个速率将跌到零以下而被钳住，那只会在极端处帮助较小的流）。从 $(70, 10)$ 出发的两条流永远保持 $60$ 的差距：第一条永远比第二条多得 $60$。(b) 每轮两个速率乘以同样的因子，所以 $x_1/x_2$ 不变：第一条流永远拿七倍。（AIMD 恰是减小依赖当前速率、增大不依赖的那种组合，所以让出更多的是较大的流。）效率：AIMD 中，和不超过 $C$ 时每轮增长 $2a$，所以首次超过 $C$ 的那一轮的和落在 $(C, C + 2a]$；减小把它带到 $(bC, b(C + 2a)]$。于是长期来看和在约 $bC$ 与 $C + 2a$ 之间振荡，链路平均被使用了容量的 $b$ 到 $1$ 之间——在这个模型里 $b = 1/2$ 约为 $75\%$——这正是长期以来对单条 Reno 流推荐约一个带宽时延乘积的路由器缓冲的原因：窗口低于峰值期间它让链路保持忙碌。
:::
:::

::: exercise CUBIC 的恢复时间 {level=3 check="cbrt(75)"}
对 $C = 0.4$、$\beta = 0.7$ 的 CUBIC，计算 $W_\text{max} = 100$ 个报文段时回到 $W_\text{max}$ 所需的时间 $K$；然后与 Reno 比较：Reno 的窗口从 $100$ 减半后每个 RTT 增长一个报文段，取 RTT 为 $10$ ms 和 $200$ ms 两种情形。证明 $W(0) = \beta W_\text{max}$，且 $W$ 单调增加，在 $[0, K]$ 上凹、在 $[K, \infty)$ 上凸。（以秒输入 $K$。）
::: solution
$K = \sqrt[3]{100 \times 0.3/0.4} = \sqrt[3]{75} \approx 4.22$ s，与 RTT 无关。Reno 从 $50$ 长回 $100$ 需要 $50$ 个往返：RTT $10$ ms 时 $0.5$ s，RTT $200$ ms 时 $10$ s。所以 CUBIC 在短路径上比 Reno 慢（这就是它在 Reno 的窗口更大时改用 Reno 窗口的原因），在长路径上则快得多。

由 [[#eq-cubic]]，$W(0) = C(-K)^3 + W_\text{max} = -CK^3 + W_\text{max} = -W_\text{max}(1 - \beta) + W_\text{max} = \beta W_\text{max}$。求导得 $W'(t) = 3C(t - K)^2 \ge 0$，所以 $W$ 单调不减（除孤立一点 $t = K$ 外严格增加），而 $W''(t) = 6C(t - K)$，在 $t < K$ 时为负（凹），在 $t > K$ 时为正（凸）。
:::
:::

::: exercise 带宽时延乘积与缓冲 {level=3}
一条长命的 Reno 流使用速率 $R$、传播往返时间 $\tau$ 的瓶颈；瓶颈路由器有 $B$ 字节的缓冲。设发生丢失时的窗口为 $W_\text{max} = R\tau + B$（管道加缓冲），且丢失后窗口减半。(a) 证明若 $B \ge R\tau$，瓶颈链路永不空闲。(b) $R = 1$ Gb/s、$\tau = 50$ ms、$B = R\tau$ 时，窗口在峰值处的排队时延是多少？(c) 解释这如何启发了 BBR 选择在途保持约一个带宽时延乘积。
::: solution
(a) 只要在途数据量不小于管道的容量 $R\tau$，链路就忙碌：那时总有分组在等待或正在发送。丢失之后窗口落到 $W_\text{max}/2 = (R\tau + B)/2 \ge R\tau$（当 $B \ge R\tau$），且此后只增长，直到下一次丢失；所以窗口从不跌破 $R\tau$，链路从不空闲。缓冲更小时，窗口每个周期有一部分时间低于 $R\tau$，链路有一部分时间空闲。

(b) 峰值时队列持有 $B = R\tau$ 字节，排空它需要 $B/R = \tau = 50$ ms：队列使 RTT 翻倍，达到 $100$ ms。按 $B = R\tau = 10^9 \times 0.05 = 5 \times 10^7$ 比特 $= 6.25$ MB 算，这是个很大的缓冲——而且经过这台路由器的每条流，包括交互式流，都看到多达 $50$ ms 的额外时延。

(c) 基于丢失的算法必须填满缓冲才能找到限度，所以它拿时延换吞吐量；一个带宽时延乘积的缓冲给出满吞吐量，却在峰值处使时延翻倍。恰好在途保持 $R\tau$ 能给出满吞吐量而队列为空——最优运行点。BBR 估计 $R$（作为 BtlBw）和 $\tau$（作为 RTprop）并瞄准那个点，无需让缓冲溢出；它的周期性探测暂时多放一点数据到在途，以观察 $R$ 是否增长了。
:::
:::
