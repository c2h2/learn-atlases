下面是 $p$ 个进程把各自持有的 $2^{20}$ 个数（$8$ MiB）的向量逐元素求和、并把结果副本留在每个进程上的两种做法——这就是 **allreduce** 操作，分布式机器学习训练的每一步和许多科学计算程序都要做它。第一种：每个进程把自己的向量发给进程 $0$，由它累加再把结果发回所有人。第二种：进程排成环，用 $2(p - 1)$ 步把向量碎片传给各自的邻居。两者都用 Python 的 `multiprocessing` 写成，进程之间只通过管道通信：

```console
$ python3 naive_allreduce.py
p=2: sum 3, uniform True, slowest 0.172 s
p=4: sum 10, uniform True, slowest 0.530 s
p=8: sum 36, uniform True, slowest 1.111 s
$ python3 allreduce.py
p=2: sum 3 (expected 3), uniform True, slowest 0.095 s
p=4: sum 10 (expected 10), uniform True, slowest 0.144 s
p=8: sum 36 (expected 36), uniform True, slowest 0.192 s
```

（在本课程那台 $36$ 核机器上的观测，2026 年。）集中式版本随 $p$ 成比例变慢：进程 $0$ 要收发各 $p - 1$ 个完整向量，并做 $p - 1$ 次向量加法。环形版本增长慢得多，向量很大时几乎不再增长：我们将证明，无论 $p$ 是多少，它的每个进程发送与接收的量都不到单个向量大小的*两*倍。

本章讲**分布式内存**机器的编程：进程不共享任何东西，只靠发送消息通信。标准接口是 **MPI**（Message Passing Interface，消息传递接口）。我们介绍它的编程模型与点对点通信，包括缓冲所掩盖的死锁；在本机上实测的消息的 **α–β 代价模型**；**集合操作**——广播、归约、allreduce、收集、分发、全交换——及其算法与代价证明；还有**区域分解**，多数科学计算程序切分数据的方式。本机没有安装 MPI，所以本章的 MPI 清单只是示意（它们只使用标准的 MPI-3 调用、按正确写法给出，但没有在本机编译过）；凡给出输出的程序，都是本机运行过的 C 或 Python 程序，用进程间的管道与套接字扮演网络。

## 消息传递模型

消息传递让通信显式化。每个进程有私有地址空间；要把数据从进程 $A$ 搬到进程 $B$，$A$ 执行一次**发送**，$B$ 执行一次配对的**接收**。什么都不共享，因而没有数据竞争、没有缓存一致性流量、也没有内存模型要推理——只有慢吞吞的消息，以及它们到达的先后次序。这一模型契合集群——进程真的在不同机器上——也能用在共享内存机器上，此时 MPI 实现借共享内存传消息。

::: definition MPI 的编程模型 {#def-mpi}
MPI 程序以同一可执行文件的 $p$ 份副本启动（SPMD），例如 `mpirun -n 64 ./prog`。每个进程先调 `MPI_Init`、最后调 `MPI_Finalize`。进程同属一个**通信器**（communicator）——`MPI_COMM_WORLD` 包含全部进程——每个进程在其中有一个**秩**（rank）$0, \dots, p - 1$。发送消息用

`MPI_Send(buf, count, datatype, dest, tag, comm)`

接收用

`MPI_Recv(buf, count, datatype, source, tag, comm, &status)`，

其中 `datatype` 描述元素类型（`MPI_DOUBLE` 等），一次接收匹配这样一条消息：同一通信器、来自指定源（或 `MPI_ANY_SOURCE`）、带指定标签（或 `MPI_ANY_TAG`）。同一对进程之间、同一通信器同一标签的消息按发送的先后到达。`MPI_Bcast`、`MPI_Allreduce` 这类**集合**操作由通信器的每个进程共同调用。
:::

```c
/* 示意的 MPI 程序（本机未编译）：让一个令牌沿环传递。 */
#include <mpi.h>
#include <stdio.h>

int main(int argc, char **argv) {
    MPI_Init(&argc, &argv);
    int rank, p, token;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &p);
    if (rank == 0) {
        token = 42;
        MPI_Send(&token, 1, MPI_INT, 1 % p, 0, MPI_COMM_WORLD);
        MPI_Recv(&token, 1, MPI_INT, p - 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("token back at rank 0 after visiting %d processes: %d\n", p, token);
    } else {
        MPI_Recv(&token, 1, MPI_INT, rank - 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        token += 1;                                  /* 每个进程加一 */
        MPI_Send(&token, 1, MPI_INT, (rank + 1) % p, 0, MPI_COMM_WORLD);
    }
    MPI_Finalize();
    return 0;
}
```

（至少要两个进程运行；秩 $0$ 会打印 $42 + p - 1$。）

### 阻塞、缓冲与死锁

`MPI_Send` 是**阻塞**的：发送缓冲区可以被重新利用时它才返回。这可能发生在消息刚复制进系统缓冲区之后，也可能要等到配对的接收开始——标准把选择留给实现，通常小消息缓冲、大消息等接收方。只有在"发送被缓冲"时才正确的程序称为**不安全的**。

::: example 依赖于消息长度的死锁 {#ex-deadlock}
两个进程交换 $n$ 字节的消息，各自先发送再接收。在 $n = 1000$ 与 $n = 10^7$ 下各运行一次。

```python
import sys
from multiprocessing import Pipe, Process

def swap(conn, nbytes):
    conn.send_bytes(bytes(nbytes))        # 两个进程都先发……
    conn.recv_bytes()                     # ……再接收
    print(f"{nbytes} bytes: exchanged", flush=True)

if __name__ == "__main__":
    nbytes = int(sys.argv[1])
    a, b = Pipe()                          # 一条双向连接
    other = Process(target=swap, args=(b, nbytes))
    other.start()
    swap(a, nbytes)
    other.join()
```
::: solution
```console
$ timeout 10 python3 deadlock.py 1000; echo "status $?"
1000 bytes: exchanged
1000 bytes: exchanged
status 0
$ timeout 10 python3 deadlock.py 10000000; echo "status $?"
status 124
```

$1000$ 字节时，消息装得进内核的套接字缓冲区，每次 `send_bytes` 立即完成，两个进程随后各自进入接收。$10^7$ 字节时缓冲区被填满；每个发送方都阻塞到对方读取为止，而对方也正阻塞在发送上：死锁——一组进程首尾相衔各等下一个（[[operating-systems/synchronisation]]）——$10$ 秒后被 `timeout` 结束（状态 $124$）。把代码换成 `MPI_Send` 与 `MPI_Recv` 行为相同，阈值由 MPI 实现的"立即发送"（eager）限额决定。解法有三：把操作排好序让一方先收（偶秩先发、奇秩先收）；用 `MPI_Sendrecv`，它把一次发送与一次接收合在一起做、不会死锁；或用**非阻塞**操作 `MPI_Isend` 与 `MPI_Irecv`，它们立即返回一个请求句柄，最后对两个请求调 `MPI_Waitall`。
:::
:::

非阻塞操作还能让程序把通信与计算**重叠**：先把边界数据的收发都挂上，计算内部数据，到需要边界数据时才等待。重叠是否真的发生，取决于网络硬件，以及 MPI 库是否在后台推进请求。

## 消息的代价

::: definition α–β 模型 {#def-alpha-beta}
在 **α–β 模型**（霍克尼（Hockney）模型）中，两个进程之间发送一条 $m$ 字节的消息耗时

$$
T(m) = \alpha + \beta m,
$$ {#eq-alpha-beta}

其中**时延** $\alpha$ 是每条消息的固定代价（软件开销、穿越网络），$\beta$ 是每字节的传输时间，即带宽的倒数。每个进程可以同时发送一条消息并接收一条消息，不相交的进程对之间的消息互不干扰。
:::

典型值（2026 年）：节点内部走共享内存，$\alpha$ 是零点几到几微秒、$1/\beta$ 为几十 GB/s；走高性能网络，$\alpha$ 是一到几微秒、$1/\beta$ 每链路 $25$–$50$ GB/s；走以太网上的 TCP，$\alpha$ 达几十微秒。**半带宽消息长度** $\alpha/\beta$——时延与传输代价相等之处——是几十 KB。远小于它的消息受时延限制，应当合并；远大于它的受带宽限制。更精细的模型如 **LogP**（卡勒（Culler）等，1993）把网络时延、收发的处理器开销、消息间的最小间隔分开，但 α–β 已足够用来设计算法。

::: example 测量 α 与 β {#ex-alpha-beta}
在本机上用 Unix 域套接字连接的两个进程之间，度量 $1$ 字节到 $16$ MiB 消息的单程时间：每种长度计时 $100$ 次往返，拟合 [[#eq-alpha-beta]]。
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <time.h>
#include <unistd.h>

static void xfer(int fd, char *buf, size_t n, int sending) {   /* 发/收满 n 字节 */
    for (size_t done = 0; done < n; ) {
        ssize_t r = sending ? write(fd, buf + done, n - done) : read(fd, buf + done, n - done);
        if (r <= 0) { perror("xfer"); exit(1); }
        done += r;
    }
}

int main(void) {
    int sv[2];
    socketpair(AF_UNIX, SOCK_STREAM, 0, sv);          /* 一条双向通道 */
    size_t max = 1 << 24;
    char *buf = calloc(max, 1);
    if (fork() == 0) {                                 /* 进程 1：原样回送一切 */
        for (size_t m = 1; m <= max; m *= 16)
            for (int r = 0; r < 100; r++) { xfer(sv[1], buf, m, 0); xfer(sv[1], buf, m, 1); }
        return 0;
    }
    for (size_t m = 1; m <= max; m *= 16) {            /* 进程 0：发送，等回送 */
        struct timespec t0, t1;
        clock_gettime(CLOCK_MONOTONIC, &t0);
        for (int r = 0; r < 100; r++) { xfer(sv[0], buf, m, 1); xfer(sv[0], buf, m, 0); }
        clock_gettime(CLOCK_MONOTONIC, &t1);
        double us = ((t1.tv_sec - t0.tv_sec) * 1e6 + (t1.tv_nsec - t0.tv_nsec) / 1e3) / 200;
        printf("%9zu bytes: %9.2f us one way  %6.2f GB/s\n", m, us, m / (us * 1e3));
    }
    wait(NULL);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o pingpong_proc pingpong_proc.c && ./pingpong_proc
        1 bytes:      4.51 us one way    0.00 GB/s
       16 bytes:      4.35 us one way    0.00 GB/s
      256 bytes:      3.95 us one way    0.06 GB/s
     4096 bytes:      6.97 us one way    0.59 GB/s
    65536 bytes:     22.60 us one way    2.90 GB/s
  1048576 bytes:    234.97 us one way    4.46 GB/s
 16777216 bytes:   4167.39 us one way    4.03 GB/s
```

小消息要 $\alpha \approx 4.4$ µs——两次系统调用加一次接收进程的唤醒。最大的那个给出 $1/\beta \approx 16.8 \text{ MB} / 4.17 \text{ ms} \approx 4.0$ GB/s，故 $\beta \approx 0.25$ ns/字节；模型 $4.4 \ \mu\text{s} + m/(4.0 \text{ GB/s})$ 预测 $64$ KiB 处为 $20.8$ µs，与实测的 $22.6$ µs 相差无几。$1$ MiB 这一点比模型略快（它装得进高速缓存）。半带宽长度 $\alpha/\beta \approx 18$ KB。同一台机器上真正的 MPI 库会更快——它经共享内存复制、不走系统调用——集群网络的 $\alpha$ 则更大；但曲线的形状到哪里都一样。
:::
:::

## 集合操作

许多通信模式一次涉及全部进程。MPI 把它们提供为**集合操作**（collective），实现会针对各台机器优化；了解其代价，是预测程序扩展性的关键。

::: definition 集合操作 {#def-collectives}
设 $p$ 个进程，进程 $r$ 持有数据 $x_r$：

- **广播**（broadcast）：把根进程的 $m$ 字节消息复制给每个进程；
- **归约**（reduce）：根进程得到 $x_0 \oplus x_1 \oplus \dots \oplus x_{p-1}$（逐元素，$\oplus$ 为结合算子），每个 $x_r$ 占 $m$ 字节；
- **allreduce**：每个进程都得到这一组合；
- **分发**（scatter）：根进程持有 $p$ 个 $m/p$ 字节的块，把第 $r$ 块发给进程 $r$；**收集**（gather）是其逆操作；
- **全收集**（allgather）：每个进程贡献一个 $m/p$ 字节的块，每个进程得到全部 $p$ 块；
- **归约-分发**（reduce-scatter）：进程 $r$ 得到组合结果的第 $r$ 块；
- **全交换**（all-to-all）：每个进程给其他每个进程各发一个不同的块（一次分布式转置）；
- **屏障**（barrier）：所有进程都进入之前，任何进程不得越过。
:::

最朴素的算法是顺序的：广播时根进程逐个发出 $p - 1$ 条消息，耗时 $(p - 1)(\alpha + \beta m)$。树要好得多。

::: theorem 二项树广播 {#thm-bcast}
$p$ 个进程广播 $m$ 字节可在 $\lceil \log p \rceil$ 轮内完成，耗时 $\lceil \log p \rceil(\alpha + \beta m)$；而在 α–β 模型中，任何整条转发消息的算法都轮数不可能更少。
:::

::: proof
**算法。** 相对根进程给进程编号。第 $k = 0, 1, \dots$ 轮，每个已有消息且 $r < 2^k$ 的进程把消息发给进程 $r + 2^k$（若其存在）。归纳可知第 $k$ 轮之后进程 $0, \dots, 2^{k+1} - 1$（存在的那些）都有了消息，故 $\lceil \log p \rceil$ 轮之后全部 $p$ 个都有。每轮每个进程至多发或收一条消息，所以每轮耗时 $\alpha + \beta m$。

**下界。** 一轮之内，已有消息的进程至多把它发给一个别人，持有者数目至多翻倍。从 $1$ 出发，$k$ 轮后至多 $2^k$ 个持有，所以 $p$ 个进程至少要 $\lceil \log p \rceil$ 轮。
:::

这一通信模式是一棵**二项树**：在超立方体上（[[parallel-computing/parallel-architectures#thm-hypercube]]），第 $k$ 轮用第 $k$ 维的链路。归约就是沿同一个树自下而上、边走边合并，耗时 $\lceil \log p \rceil(\alpha + \beta m + \gamma m)$，$\gamma$ 为每字节的计算时间；allreduce 可以先归约再广播，或用**递归倍增**——第 $k$ 轮每个进程与"秩恰在第 $k$ 位不同"的伙伴交换当前的部分结果再合并——耗时 $\log p\,(\alpha + \beta m)$（[[#ex-recursive-doubling]]）。

长消息下树算法浪费带宽：整条消息要依次穿过 $\log p$ 条链路，而且每轮有一半进程闲着。把消息切块、让碎片流水起来要好得多。

::: algorithm 环形 allreduce（先归约-分发，再全收集） {#alg-ring-allreduce}
把进程排成环，进程 $r$ 发给 $r + 1$、从 $r - 1$ 接收（模 $p$），并把每个向量切成 $p$ 个编号 $0, \dots, p - 1$ 的块。

1. **归约-分发**：对步 $s = 0, \dots, p - 2$，每个进程 $r$ 把自己的块 $(r - s) \bmod p$ 发往右邻，并把从左邻收到的块加到自己的块 $(r - s - 1) \bmod p$ 上。
2. **全收集**：对步 $s = 0, \dots, p - 2$，每个进程 $r$ 把自己的块 $(r + 1 - s) \bmod p$ 发往右邻，并用收到的块覆盖自己的块 $(r - s) \bmod p$。
:::

::: theorem 环形 allreduce 的代价 {#thm-ring}
[[#alg-ring-allreduce]] 计算 $m$ 字节向量的 allreduce，耗时

$$
T_{\text{ring}} = 2(p - 1)\alpha + 2\,\frac{p - 1}{p}\,m\beta
$$ {#eq-ring}

（加法另需 $\frac{p-1}{p}m\gamma$）。每个进程发送与接收各 $2\frac{p-1}{p}m < 2m$ 字节。
:::

::: proof
**归约-分发。** 用 $x_q[c]$ 记进程 $q$ 输入的第 $c$ 块。断言：步 $s$ 之后，进程 $r$ 的块 $(r - s - 1) \bmod p$ 装着 $c = (r - s - 1) \bmod p$ 处的 $x_{r-s-1}[c] \oplus \dots \oplus x_r[c]$，即 $s + 2$ 个进程 $r - s - 1, \dots, r$ 上的组合（下标模 $p$）。步 $0$：进程 $r$ 从 $r - 1$ 收到对方的块 $(r - 1) \bmod p$，即输入 $x_{r-1}[r-1]$，加上自己的 $x_r[r-1]$：即 $s = 0$ 时的断言。步 $s \ge 1$：进程 $r$ 从 $r - 1$ 收到块 $((r - 1) - s) \bmod p$——那是进程 $r - 1$ 在步 $s - 1$ 完成的块，由断言装着进程 $r - s - 1, \dots, r - 1$ 的组合——再加上自己的输入块，把组合扩展到进程 $r$。（进程 $r$ 自己那份该块此前没有被改过：它在步 $s'$ 改的是块 $(r - s' - 1) \bmod p$，每步改的块都不同。）步 $p - 2$ 之后，进程 $r$ 的块 $(r + 1) \bmod p$ 装着全部 $p$ 个进程的组合。

**全收集。** 步 $0$，每个进程 $r$ 发出自己完成的块 $(r + 1) \bmod p$，收到由进程 $r - 1$ 完成的块 $r \bmod p$；其后每一步都转发它上一步收到的块。$p - 1$ 步后，每个进程拿到了每一个完成的块。

**代价。** $2(p - 1)$ 步中的每一步，所有进程并行地各发、收一个 $m/p$ 字节的块，所以每步耗时 $\alpha + \beta m/p$；求和即得 [[#eq-ring]]。
:::

::: example 追踪环形 allreduce {#ex-ring-trace}
三个进程分别持有 $(1, 2, 3)$、$(10, 20, 30)$、$(100, 200, 300)$，每块一个元素。写出四步之后各自的向量。
::: solution
| 之后 | P0 | P1 | P2 |
|---|---|---|---|
| 归约-分发 步 $0$ | $(1, 2, \mathbf{303})$ | $(\mathbf{11}, 20, 30)$ | $(100, \mathbf{220}, 300)$ |
| 归约-分发 步 $1$ | $(1, \mathbf{222}, 303)$ | $(11, 20, \mathbf{333})$ | $(\mathbf{111}, 220, 300)$ |
| 全收集 步 $0$ | $(\mathbf{111}, 222, 303)$ | $(11, \mathbf{222}, 333)$ | $(111, 220, \mathbf{333})$ |
| 全收集 步 $1$ | $(111, 222, \mathbf{333})$ | $(\mathbf{111}, 222, 333)$ | $(111, 222, \mathbf{333})$ |

（加粗条目为该步改动的。）归约-分发步 $0$：P0 收到 P2 的块 $2$（$300$）加上自己的 $3$；P1 收到 P0 的块 $0$；P2 收到 P1 的块 $1$。归约-分发之后，P0 持有完整的块 $1$（$222$）、P1 块 $2$（$333$）、P2 块 $0$（$111$），与证明的断言完全一致（进程 $r$ 持有块 $r + 1$）。两步全收集把它们转上一圈。每个进程发了四条单元素消息；若先归约到 P0 再广播，发的就是整个向量了。
:::
:::

开头实验的 Python 实现逐行照着算法写。它的 `exchange` 函数向右发送、从左接收，并让偶秩先发，以避免 [[#ex-deadlock]] 的死锁：

```python
from array import array

def exchange(rank, send_conn, recv_conn, data):
    """Send data right and receive from the left without deadlock (cf. MPI_Sendrecv)."""
    if rank % 2 == 0:
        send_conn.send_bytes(data); return recv_conn.recv_bytes()
    got = recv_conn.recv_bytes(); send_conn.send_bytes(data); return got

def ring_allreduce(rank, p, right, left, x):
    """Sum the vectors x of all p processes; afterwards every process has the sum."""
    n = len(x)
    bounds = [n * k // p for k in range(p + 1)]            # 块 k 是 x[bounds[k]:bounds[k+1]]
    chunk = lambda k: slice(bounds[k % p], bounds[k % p + 1])
    for step in range(p - 1):                              # 归约-分发
        out, inc = (rank - step) % p, (rank - step - 1) % p
        got = array("d", exchange(rank, right, left, x[chunk(out)].tobytes()))
        s = chunk(inc)
        x[s] = array("d", map(float.__add__, x[s], got))   # 加上收到的部分和
    for step in range(p - 1):                              # 全收集已求和的块
        out, inc = (rank + 1 - step) % p, (rank - step) % p
        x[chunk(inc)] = array("d", exchange(rank, right, left, x[chunk(out)].tobytes()))
    return x
```

驱动程序启动 $p$ 个进程，用 `Pipe` 把进程 $r$ 的 `right` 端接到进程 $r + 1$ 的 `left` 端，给进程 $r$ 一个 $2^{20}$ 个 $r + 1$ 的向量，并报告最慢进程的时间、以及每个结果的每个元素是否都等于 $p(p + 1)/2$。（奇偶规则要求 $p$ 为偶数或 $p = 1$；$p$ 为奇数时，环绕链路的两个邻居都会想先发送。）朴素版本的耗时随 $p$ 增长，因为进程 $0$ 要经手 $2(p - 1)$ 个完整向量；环形版本增长很慢，主要来自 $2(p - 1)$ 次时延与 Python 的逐元素加法。

::: widget plot
f: log2(p)*(a + x*b); 2*(p - 1)*a + 2*(p - 1)/p*x*b
x: 0, 10
y: 0, 5000
sliders: p=64:2:1024:2; a=2:0.5:20:0.5; b=40:10:400:5
labels: \text{递归倍增 } \log p\,(\alpha + m\beta); \text{环形 } 2(p-1)\alpha + 2\frac{p-1}{p}m\beta
caption: $p$ 个进程对 $m$ 兆字节（$x$ 轴）做 allreduce 的时间（微秒），时延 $\alpha$ µs、每兆字节 $\beta$ µs（$40$ µs/MB 即 $25$ GB/s）。小消息递归倍增占优：它只付 $\log p$ 次时延而不是 $2(p - 1)$ 次。大消息环形占优：无论 $p$ 多大，其带宽项都以 $2m\beta$ 为界。把 $p$ 拖到 $1024$，看两线交点右移——进程很多时环形的时延项变得很大，这正是库按消息大小切换算法、在大型机器上改用分层或树形流水方案的原因。
:::

环形有多好？其带宽项是最优的：对每个进程一次只发一条、收一条的算法，allreduce 都有 $2\frac{p-1}{p}m\beta$ 的下界（Patarasuk 与 Yuan，2009）。我们证明较简单的一半，它正说明因子 $\frac{p-1}{p}$ 从何而来。

::: proposition allgather 的一个下界 {#prop-allgather-bound}
在 α–β 模型中，任何每进程贡献 $m/p$ 字节的 allgather 至少耗时 $\max\bigl(\lceil \log p \rceil\alpha,\ \frac{p - 1}{p}m\beta\bigr)$。
:::

::: proof
**带宽。** 每个进程最后必须拿到它起初没有的 $p - 1$ 个块，共 $\frac{p-1}{p}m$ 字节，而它一次至多收一条消息、每字节 $\beta$；所以它至少花 $\frac{p-1}{p}m\beta$ 接收。**时延。** 看进程 $0$ 的块：（持有关于它的任何信息的）进程数每轮至多翻倍，如 [[#thm-bcast]]，所以至少要 $\lceil \log p \rceil$ 轮、每轮至少 $\alpha$。两者都是总时间的下界，所以时间至少是二者中较大者。
:::

环形 allgather 耗时 $(p - 1)\alpha + \frac{p-1}{p}m\beta$：带宽最优，时延很差。当 $p$ 是 $2$ 的幂时，Bruck 算法与递归倍增能在同样的带宽代价下达到时延项 $\lceil \log p \rceil \alpha$。真正的 MPI 库会为每种集合操作按 $m$ 与 $p$ 在若干算法中选择；对大型集群用分层算法：节点内经共享内存归约、节点间 allreduce、节点内广播。

::: example 广播大消息的两种办法 {#ex-bcast}
在 $\alpha = 2$ µs、$1/\beta = 25$ GB/s 的网络上向 $p = 64$ 个进程广播 $m = 64$ MB。比较二项树与**分发–全收集**：根进程分发 $64$ 个 $1$ MB 的块（用二项树，耗时 $\log p\,\alpha + \frac{p-1}{p}m\beta$），再用环形 allgather 把它们收齐到每个进程。
::: solution
$m\beta = 64 \times 10^6 / (25 \times 10^9)$ s $= 2.56$ ms。二项树：$\log 64 = 6$ 轮，每轮 $\alpha + m\beta \approx 2.562$ ms，共 $15.4$ ms。分发–全收集：分发 $6\alpha + \frac{63}{64} \times 2.56$ ms $\approx 2.53$ ms，全收集 $63\alpha + \frac{63}{64} \times 2.56$ ms $\approx 2.65$ ms；共约 $5.2$ ms，快三倍。$1$ KB 的消息则反过来：树要 $6(\alpha + 0.04 \ \mu\text{s}) \approx 12.2$ µs，分发–全收集至少 $69\alpha \approx 138$ µs。这就是范德海金（van de Geijn）的长消息广播（巴尼特（Barnett）、佩恩（Payne）、范德海金（van de Geijn）与沃茨（Watts），1994），MPI 库对大广播正用它。
:::
:::

::: quiz
在 α–β 模型下，对 $p = 2^k$ 个进程与 $m$ 字节的向量，哪些说法正确？
- [x] 二项树广播要 $k$ 轮，任何整条转发消息的算法都不可能轮数更少。
- [x] 环形 allreduce 中，每个进程发送不到 $2m$ 字节，与 $p$ 无关。
- [ ] 递归倍增 allreduce 总是比环形 allreduce 快，因为 $\log p < 2(p - 1)$。
- [ ] α–β 模型中屏障没有代价，因为它不传输数据。
::: solution
广播的说法就是 [[#thm-bcast]]。环形每进程发送 $2\frac{p-1}{p}m$ 字节（[[#thm-ring]]）。递归倍增的时延项更好，但每进程要发 $m\log p$ 字节，$m$ 大时就输了。屏障至少要 $\lceil \log p \rceil$ 轮消息（"每个进程都已到达"这一信息必须传到每个进程），代价约 $\log p\,\alpha$。
:::
:::

## 区域分解

多数大型模拟在网格上演化某个量——温度、压强、速度——反复地用每个网格点的邻居更新它。$n \times n$ 网格上热方程的**雅可比**（Jacobi）迭代，把每个内部值换成其四个邻居的平均：

$$
u^{(t+1)}_{ij} = \tfrac{1}{4}\left(u^{(t)}_{i-1,j} + u^{(t)}_{i+1,j} + u^{(t)}_{i,j-1} + u^{(t)}_{i,j+1}\right).
$$

要在分布式内存上并行化它，就要**区域分解**：给每个进程网格的一块连续区域，外加一层**幽灵单元**（**晕层**，halo），存放其邻居边界值的副本。每次迭代，每个进程与邻居交换边界值（一次**晕层交换**），然后只用本地数据更新自己的点。

```c
/* 示意的 MPI（本机未编译）：一次雅可比迭代，按一维分解成若干条带、
   每条带 'rows' 行、每行 n 个 double，u 中含幽灵行 0 与 rows+1（行优先）。 */
int up = rank > 0 ? rank - 1 : MPI_PROC_NULL;         /* 没有邻居：空进程 */
int down = rank < p - 1 ? rank + 1 : MPI_PROC_NULL;
MPI_Sendrecv(&u[1 * n], n, MPI_DOUBLE, up, 0,          /* 我的第一行向上送，        */
             &u[(rows + 1) * n], n, MPI_DOUBLE, down, 0,   /* 下面的幽灵行送上来    */
             MPI_COMM_WORLD, MPI_STATUS_IGNORE);
MPI_Sendrecv(&u[rows * n], n, MPI_DOUBLE, down, 1,     /* 我的最后一行向下送，      */
             &u[0 * n], n, MPI_DOUBLE, up, 1,          /* 上面的幽灵行送下来        */
             MPI_COMM_WORLD, MPI_STATUS_IGNORE);
double local = 0, global;
for (int i = 1; i <= rows; i++)
    for (int j = 1; j < n - 1; j++) {
        v[i * n + j] = 0.25 * (u[(i - 1) * n + j] + u[(i + 1) * n + j]
                               + u[i * n + j - 1] + u[i * n + j + 1]);
        local = fmax(local, fabs(v[i * n + j] - u[i * n + j]));
    }
MPI_Allreduce(&local, &global, 1, MPI_DOUBLE, MPI_MAX, MPI_COMM_WORLD);  /* 收敛了吗？ */
```

（全局边界行由首尾两个进程持有，不能更新；那部分登记工作在这里略去。）发给 `MPI_PROC_NULL` 的消息立即完成，所以两端的进程无需特判。每次迭代的代价是晕层交换加一次收敛检验——对一个数的 allreduce，代价约 $\log p\,\alpha$，在极大的机器上它会成为瓶颈，所以程序每隔几次迭代才检验一次收敛。

::: proposition 条带对块 {#prop-decomposition}
$n \times n$ 网格分给 $p$ 个进程、每个值 $w$ 字节，α–β 模型下每次雅可比迭代中每个内部进程的代价为：

- **一维（条带）分解**，分成 $p$ 条、每条 $n/p$ 行：通信 $2(\alpha + nw\beta)$；
- **二维（块）分解**，分成 $\sqrt{p} \times \sqrt{p}$ 个、每个 $(n/\sqrt{p})^2$ 个点的块：通信 $4(\alpha + \frac{n}{\sqrt{p}}w\beta)$；

两种情形计算量都是 $n^2/p$ 次更新。只要 $p > 4$，二维分解通信的字节数就更少。
:::

::: proof
条带有上、下两个邻居，与每个交换一行 $n$ 个值；块有四个邻居，与每个交换一条边 $n/\sqrt{p}$ 个值。每个邻居每个方向算一条消息、按模型允许并发发送，即得上面给出的代价。字节数之比是 $2n$ 对 $4n/\sqrt{p}$，而 $4n/\sqrt{p} < 2n$ 当且仅当 $\sqrt{p} > 2$。
:::

通信与计算之比就是进程那块区域的**面体比**：条带为 $2p/n$（$2n / (n^2/p)$），块为 $4\sqrt{p}/n$（$4(n/\sqrt{p})/(n^2/p)$）。块的扩展性更好，三维情形优势更大。代价是消息更多（四条而不是两条，每条都有时延 $\alpha$）与数据不连续（行优先数组的一列，MPI 用 `MPI_Type_vector` 这类**派生数据类型**来描述）。

::: example 选择分解方式 {#ex-decomposition}
$16{,}384 \times 16{,}384$ 的 `double` 网格分给 $p = 256$ 个进程，网络 $\alpha = 2$ µs、$1/\beta = 10$ GB/s；每次网格更新耗时 $1$ ns。分别估算条带与块的每次迭代时间和效率。
::: solution
计算：$n^2/p = 2^{28}/2^8 = 2^{20} \approx 1.05 \times 10^6$ 次更新，$1.05$ ms。条带：$2(\alpha + 16{,}384 \times 8 \times 0.1 \text{ ns}) = 2(2 + 13.1)$ µs $= 30.2$ µs。$1024 \times 1024$ 的块：$4(\alpha + 1024 \times 8 \times 0.1 \text{ ns}) = 4(2 + 0.82)$ µs $= 11.3$ µs。效率（计算除以计算加通信，不计重叠）：条带 $1.049/(1.049 + 0.030) = 97.2\%$，块 $1.049/(1.049 + 0.011) = 98.9\%$。这个规模下两者都不错。现在同一网格扩到 $p = 16{,}384$ 个进程（强扩展）：每次迭代计算 $16$ µs；条带 $2(2 + 13.1) = 30.2$ µs——效率 $35\%$；$128 \times 128$ 的块：$4(2 + 0.1) = 8.4$ µs——效率 $66\%$。到了这种规模，分解方式决定机器是充分利用还是白白浪费，而且小块之下成为限制的是时延、不是带宽。
:::
:::

::: widget plot
f: 2*(a + n*8*b/1000); 4*(a + n/sqrt(x)*8*b/1000); n*n/x/1000
x: 4, 4096
y: 0, 100
sliders: n=16384:1024:65536:1024; a=2:0.5:20:0.5; b=0.1:0.02:1:0.02
labels: \text{条带： } 2(\alpha + nw\beta); \text{块： } 4(\alpha + \tfrac{n}{\sqrt p}w\beta); \text{计算 } n^2/p \text{（每次 1 ns）}
caption: 每次雅可比迭代的通信与计算时间（微秒），随进程数 $p$ 变化；$n \times n$ 的 `double` 网格（$w = 8$），时延 $\alpha$ µs、每字节 $\beta$ ns。条带的代价不随 $p$ 下降；块的代价按 $1/\sqrt{p}$ 向 $4\alpha$ 逼近；计算按 $1/p$ 下降。计算曲线落到某条通信曲线之下处，效率便跌破 $50\%$。注意块能走远得多——也注意较大的 $\alpha$ 如何把 $p$ 大时的块曲线上抬。
:::

::: warning 消息传递不会让程序变成确定性的
没有共享内存就没有数据竞争，但还有**消息竞争**：从 `MPI_ANY_SOURCE` 的接收匹配最先到达的那条消息，而这可能每次运行都不同；`MPI_Allreduce` 内部浮点归约的顺序也可能不同（标准没有为给定的 $p$ 固定它，尽管同一实现通常在同样进程数、同一台机器上给出同样结果）。死锁也可能发生，有的只在大消息（[[#ex-deadlock]]）或换一种 MPI 实现时才出现。宁可用显式的源和标签、用 `MPI_Sendrecv` 与非阻塞配对，也不要先发后收；并把 eager 限额调小来测试（多数实现都有该设置），以暴露不安全的程序。
:::

::: history
消息传递伴随着 20 世纪 80 年代的超立方体多计算机成长起来——加州理工的 Cosmic Cube（1983）以及 Intel iPSC 与 nCUBE 机器——各自带着自己的库。罗杰·霍克尼（Hockney）的时延–带宽模型出现于 20 世纪 90 年代初（标准形式在 1994 年），戴维·卡勒（Culler）等人于 1993 年提出 LogP。PVM（Parallel Virtual Machine，并行虚拟机，1989 年起由埃默里大学与橡树岭的瓦伊迪·孙德拉姆（Sunderam）、阿尔·盖斯特（Geist）等人开发）让工作站集群变得可编程。1992 年的一次研讨会上，杰克·唐加拉（Dongarra）、罗尔夫·亨佩尔（Hempel）、托尼·黑（Hey）与戴维·沃克（Walker）草拟了第一份提案；此后由厂商、实验室与大学组成的 MPI 论坛于 1994 年发布 MPI-1；MPI-2（1997）加入单边通信与并行 I/O，MPI-3（2012）加入非阻塞集合操作，MPI-4（2021）加入持久化集合操作与大计数。MPICH（阿贡实验室，1993 年起）与 Open MPI（2005 年首发）是主要的开放实现。拉吉夫·塔库尔（Thakur）、罗尔夫·拉本塞夫纳（Rabenseifner）与威廉·格罗普（Gropp）的《Optimization of collective communication operations in MPICH》（2005）描述了实践中使用的算法选择。环形 allreduce 早在 20 世纪 90 年代就已知晓，百度在 2017 年把它用于深度学习训练后声名大噪；帕塔拉萨克（Patarasuk）与 Xin Yuan 在 2009 年证明了它的带宽最优性。
:::

## 后续内容

[[parallel-computing/performance-engineering]] 度量真实程序如何强扩展与弱扩展，以及怎样分辨计算受限还是通信受限的运行。GPU 集群上的程序要把本章与 [[parallel-computing/gpu-programming]] 结合：NVIDIA 的 NCCL 库实现了 GPU 之间的环形与树形 allreduce。在会失效的机器之间、会丢失和重排消息的网络之上、且时延无上界的消息传递，是 [[distributed-systems]] 的主题，那里"达成一致"本身成了核心问题；MPI 之下的套接字见 [[networks]]。

::: summary
- **消息传递**模型中，进程不共享任何东西、靠发送与接收通信；MPI 程序是 SPMD 的，进程在通信器中各有秩（[[#def-mpi]]）。
- 阻塞发送可能缓冲也可能不缓冲，所以先发后收的交换在大消息下会**死锁**（[[#ex-deadlock]]）；改用排序、`MPI_Sendrecv` 或非阻塞操作。
- **α–β 模型** $T(m) = \alpha + \beta m$（[[#def-alpha-beta]]）；本机两进程之间 $\alpha \approx 4.4$ µs、$1/\beta \approx 4$ GB/s（[[#ex-alpha-beta]]）。
- **二项树广播**耗时 $\lceil\log p\rceil(\alpha + \beta m)$，轮数最优（[[#thm-bcast]]）。**环形 allreduce** 耗时 $2(p-1)\alpha + 2\frac{p-1}{p}m\beta$（[[#thm-ring]]，[[#ex-ring-trace]])——带宽最优——递归倍增则耗时 $\log p\,(\alpha + m\beta)$；库按消息大小切换算法（[[#ex-bcast]]）。
- 我们的 Python allreduce 在 $8$ 个进程上，集中式要 $1.11$ s，环形只要 $0.19$ s。
- 带晕层交换的**区域分解**：二维块每次迭代通信 $4n/\sqrt{p}$ 个值，条带为 $2n$（[[#prop-decomposition]]），这在大规模下决定效率（[[#ex-decomposition]]）。
:::

## 习题

::: exercise 一条消息 {level=1 check="102"}
在 $\alpha = 2$ µs、带宽 $10$ GB/s 下，一条 $1$ MB（$10^6$ 字节）的消息要花多少微秒？（填入微秒数。）
::: solution
$\beta m = 10^6 / 10^{10}$ s $= 100$ µs，加上 $\alpha = 2$ µs：$102$ µs。消息受带宽限制；半带宽长度为 $\alpha/\beta = 20$ KB。
:::
:::

::: exercise 广播的轮数 {level=1 check="7"}
$100$ 个进程的二项树广播需要多少轮？（填入数目。）
::: solution
$\lceil \log_2 100 \rceil = 7$，因为 $2^6 = 64 < 100 \le 128 = 2^7$。$6$ 轮后只有 $64$ 个进程可能持有消息。
:::
:::

::: exercise 环形的带宽因子 {level=1 check="1.75"}
$8$ 个进程的环形 allreduce 中，每个进程发送向量大小 $m$ 的多少倍？（填入倍数。）
::: solution
$2(p - 1)/p = 2 \times 7/8 = 1.75$。$p$ 增大时因子趋于 $2$；$p = 2$ 时为 $1$，已经最优：每个进程总得把整个向量以某种方式发给对方。
:::
:::

::: exercise 一次不安全的交换 {level=2}
某 MPI 程序的每个进程先向 $(r + 1) \bmod p$ 做 $n$ 个 `double` 的 `MPI_Send`，再从 $(r - 1) \bmod p$ 做 `MPI_Recv`。多大的消息可能死锁，为什么？给出两种正确改写。
::: solution
若实现缓冲消息（$n$ 小、在其 eager 限额以下），每个发送都返回、接收随后都被匹配：不死锁。若不缓冲（$n$ 大），每个进程都在 `MPI_Send` 里等右邻挂出接收，而每个右邻也正等在 `MPI_Send` 里：等待成环，即死锁。标准两种行为都允许，所以程序对任何 $n$ 都不安全。改写：(1) `MPI_Sendrecv(sendbuf, n, MPI_DOUBLE, (r+1)%p, 0, recvbuf, n, MPI_DOUBLE, (r-1+p)%p, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE)`；(2) 先对左邻 `MPI_Irecv`、对右邻 `MPI_Isend`，再对两个请求 `MPI_Waitall`。（按奇偶排序——如我们的 Python 环——在 $p$ 为偶数时也行；$p$ 为奇数时有两个邻居同奇偶。）
:::
:::

::: exercise 环形何时占优 {level=2 check="176000"}
设 $p = 8$、$\alpha = 2$ µs、$\beta = 0.1$ ns/字节，消息多大（字节）时，递归倍增 $\log p\,(\alpha + m\beta)$ 与环形 allreduce（[[#eq-ring]]）耗时相同？（填入 $m$。）
::: solution
$3(\alpha + m\beta) = 14\alpha + 1.75m\beta$ 给出 $1.25\,m\beta = 11\alpha$，所以 $m = 8.8\,\alpha/\beta = 8.8 \times 2 \times 10^{-6} / 10^{-10} = 176{,}000$ 字节。约 $176$ KB 以下递归倍增更快，以上则是环形。
:::
:::

::: exercise 晕层字节数 {level=2 check="32768"}
$4096 \times 4096$ 的 `double` 网格按 $4 \times 4$ 的块分给 $16$ 个进程。每次雅可比迭代，一个内部进程发多少字节？（填入数目。）若按 $16$ 条带呢？
::: solution
块为 $1024 \times 1024$；内部块向 $4$ 个邻居各发一条 $1024$ 个值的边：$4 \times 1024 \times 8 = 32{,}768$ 字节。条带向 $2$ 个邻居各发一整行 $4096$ 个值：$2 \times 4096 \times 8 = 65{,}536$ 字节——两倍，且比值随 $\sqrt{p}/2$ 增长。
:::
:::

::: exercise 递归倍增 {#ex-recursive-doubling level=3}
用 Python `multiprocessing` 为 $p = 2^k$ 个进程实现递归倍增 allreduce：第 $j$ 轮，进程 $r$ 与进程 $r \oplus 2^j$ 交换各自当前的整个向量并相加。证明 $k$ 轮后每个进程都持有总和，并在 $p = 8$ 下运行。
::: solution
**正确性。** 断言：第 $j$ 轮之后，进程 $r$ 持有所有"秩在高于第 $j$ 位的各位上与 $r$ 相同"的 $2^{j+1}$ 个进程的输入之和。第 $0$ 轮之前它持有自己的输入（在全部位上与 $r$ 相同的 $2^0 = 1$ 个进程）。第 $j$ 轮，$r$ 与伙伴 $r \oplus 2^j$ 在高于 $j$ 的各位相同、恰在第 $j$ 位不同，所以两者的两个组（分别在高于第 $j - 1$ 位与 $r$、与伙伴相同）不相交，合起来正是"在高于第 $j$ 位与 $r$ 相同"的秩的组；两个和相加即该组之和，且两个伙伴算出同样的值。第 $k - 1$ 轮之后，该组就是全部 $2^k$ 个进程。

```python
from array import array

def rd_allreduce(rank, p, conns, x):
    """Recursive doubling: in round k, swap the whole vector with partner rank ^ 2^k and add."""
    k = 1
    while k < p:
        partner = rank ^ k
        c = conns[partner]
        if rank < partner:                       # 低秩先发送：不死锁
            c.send_bytes(x.tobytes()); got = c.recv_bytes()
        else:
            got = c.recv_bytes(); c.send_bytes(x.tobytes())
        x = array("d", map(float.__add__, x, array("d", got)))
        k *= 2
    return x
```

驱动程序为每对 $(r, r \oplus 2^j)$ 建一条 `Pipe`，给进程 $r$ 向量 $(r + 1, 10r)$，然后收集结果：

```console
$ python3 recdouble.py
[(0, [36.0, 280.0]), (1, [36.0, 280.0]), (2, [36.0, 280.0]), (3, [36.0, 280.0]), (4, [36.0, 280.0]), (5, [36.0, 280.0]), (6, [36.0, 280.0]), (7, [36.0, 280.0])]
```

$\sum_{r=0}^{7}(r + 1) = 36$，$\sum_r 10r = 280$。代价是 $\log p$ 轮、每轮 $\alpha + m\beta$：短向量的正确选择。每个进程与伙伴加两个操作数的顺序不同，但加法可交换，所以伙伴之间即使在浮点下也完全一致；只是 $p$ 项的加括号方式与环形不同。
:::
:::

::: exercise 雅可比迭代的等效率 {level=3}
用 [[#prop-decomposition]]，设每次更新耗时 $c$、忽略时延，分别求条带与块下问题规模 $n^2$ 随 $p$ 增长多快才能保持效率恒定（[[parallel-computing/performance-laws#def-isoefficiency]]）。固定 $n$ 的强扩展会怎样？
::: solution
每次迭代 $T_1 = cn^2$，总开销 $T_o = p \times$（每进程通信量）。条带：$T_o = p \cdot 2nw\beta$，效率恒定要求 $cn^2 \propto p\,n$，即 $n \propto p$、$n^2 \propto p^2$：问题规模必须随 $p$ 二次增长。块：$T_o = p \cdot 4\frac{n}{\sqrt{p}}w\beta = 4\sqrt{p}\,nw\beta$，于是 $cn^2 \propto \sqrt{p}\,n$，$n \propto \sqrt{p}$、$n^2 \propto p$：问题只需随 $p$ 线性增长——每进程工作量恒定，弱扩展近乎完美。计入时延后，块的开销多出 $4p\alpha$ 一项，$n^2 \propto p$ 仍然够用。固定 $n$（强扩展）时两者效率都下降：条带按 $1/(1 + 2pw\beta/(cn))$，块按 $1/(1 + 4\sqrt{p}w\beta/(cn))$。所以对给定效率，若条带能用 $p_s$ 个进程，块大约能用 $p_s^2/4$ 个——正是 [[#ex-decomposition]] 中见到的现象。
:::
:::
