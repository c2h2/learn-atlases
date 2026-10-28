这里有一个用十五行 Python 写成的完整网络服务器。它在你自己机器的 50 端口（5000）上等待客户端，读取每个客户端发来的任何内容，把它变成大写字母再发回去：

```python
# echo_server.py：一个在 127.0.0.1:5000 上的迭代式 TCP 回显服务器
import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as lsock:
    lsock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    lsock.bind(("127.0.0.1", 5000))         # 仅环回：外部无法访问
    lsock.listen()
    print("listening on", lsock.getsockname())
    while True:
        conn, addr = lsock.accept()         # 阻塞，直到有客户端连接
        with conn:
            print("connection from", addr)
            while True:
                data = conn.recv(4096)      # 最多 4096 字节；b"" 表示文件结束
                if not data:
                    break
                conn.sendall(data.upper())  # sendall 反复调用直到所有字节发出
            print("closed", addr)
```

与之配套的客户端：

```python
# echo_client.py：向回显服务器发送一行并打印响应
import socket, sys

msg = " ".join(sys.argv[1:]).encode("utf-8")
with socket.create_connection(("127.0.0.1", 5000)) as sock:
    print("local", sock.getsockname(), "-> remote", sock.getpeername())
    sock.sendall(msg)
    sock.shutdown(socket.SHUT_WR)           # 我方不再发数据：服务器看到文件结束
    reply = b""
    while chunk := sock.recv(4096):         # 一直读到服务器关闭
        reply += chunk
print(reply.decode("utf-8"))
```

```console
$ python3 echo_server.py &
listening on ('127.0.0.1', 5000)
$ python3 echo_client.py hello, network
local ('127.0.0.1', 37408) -> remote ('127.0.0.1', 5000)
connection from ('127.0.0.1', 37408)
closed ('127.0.0.1', 37408)
HELLO, NETWORK
```

每一个联网程序——浏览器、数据库驱动、你操作系统里的 DNS 解析器——都建立在同样几个调用之上：用 `socket`、`bind`、`listen`、`accept` 和 `connect` 建立通信，用 `send` 和 `recv`（或者干脆就是 `write` 和 `read`）实施通信。这个接口——**Berkeley 套接字 API**——自 1983 年的 4.2BSD Unix 以来一直是程序使用 TCP/IP 的标准方式，每种主流语言都只在表面修饰上包装了它。

本章就来教它。我们先看套接字是什么、地址怎么写；用 Python 和 C 各写出 TCP 的客户端和服务器；认识 TCP 那个几乎让每个初学者都栽跟头的性质——它运载的是字节流，不是消息——并用消息分帧来修复；然后对照 UDP 的数据报；最后构造能同时服务许多客户端的服务器，分别用线程和事件循环实现。所有例子都运行在**环回**接口上（IPv4 是 `127.0.0.1`，IPv6 是 `::1`），流量从不出你的机器；没有网络访问也能运行，也不会打扰任何人。本章假定你熟悉 [[computer-systems/system-io]] 的 Unix I/O——那里讲的短读短写问题在这里会变本加厉地重新出现。

## 套接字与地址

::: definition 套接字 {#def-socket}
**套接字**是由 `socket` 系统调用创建的通信端点，在 Unix 中用一个文件描述符表示（[[computer-systems/system-io#def-fd]]）。它有一个**地址族**（IPv4 用 `AF_INET`，IPv6 用 `AF_INET6`，一台主机上进程之间的本地通信用 `AF_UNIX`）和一个**类型**：`SOCK_STREAM` 表示可靠、有序、面向连接的字节流（在因特网地址族上即 TCP），或 `SOCK_DGRAM` 表示不可靠、无连接的数据报（UDP）。

一条 TCP 连接由四个值（本地 IP 地址、本地端口、远端 IP 地址、远端端口）唯一标识；套接字的**本地地址**由 `bind` 设定或由内核自动选择，**远端地址**由 `connect` 或 `accept` 设定。
:::

端口号是 16 位的。1024 以下的端口是**知名端口**，保留给标准服务（在 Unix 上绑定它们需要特权）；客户端通常让内核挑选一个**临时端口**——上面那次运行挑的是 37408。四值标识正是一个服务器端口可以同时承载成千上万条连接的原因：它们或客户端地址不同、或端口不同。

::: definition 网络字节序 {#def-byte-order}
因特网协议首部中的多字节整数——端口号、地址、长度——都按**大端序**传输，最高有效字节在前；这称为**网络字节序**。原生字节序是小端的主机（如 x86-64 和多数 ARM 系统）必须转换：在 C 中用 `htons`/`htonl`（“host to network short/long”，主机序转网络序的短整数/长整数）与 `ntohs`/`ntohl`，在 Python 中用 `struct` 模块的 `!` 前缀。
:::

在测试机（小端）上，端口 $5000 = \texttt{0x1388}$ 在内存中存成字节 `88 13`，在线路上却必须呈现为 `13 88`：

```console
$ python3 -c "import socket, struct; print(socket.htons(5000), struct.pack('!H', 5000).hex())"
34835 1388
```

`htons(5000)` 返回 $34835 = \texttt{0x8813}$，即按小端存放恰为 `13 88` 的那个整数。忘记转换是一个经典缺陷：只要客户端和服务器都是小端、且只同彼此通信，程序就能工作；一碰上任何正确的实现就失效。地址 `192.0.2.10` 无论在什么主机上同样都是这四个字节、这个顺序：`c0 00 02 0a`。（字节序本身见 [[computer-systems/bits-integers]]。）

名字用 `getaddrinfo` 变成地址。它会查 `/etc/hosts` 和 DNS（[[networks/application-layer]]），返回一个地址*列表*——IPv6 和 IPv4 都有，每种也许有好几个——按客户端应当尝试的先后排列（RFC 6724）。健壮的客户端逐个尝试，直到有一个连上为止。Python 的 `socket.create_connection` 和 `socket.create_server` 替你把这件事做了。

### 调用序列

TCP 服务器与客户端的调用如下：

- **服务器**：`socket` 创建套接字；`bind` 给它一个本地地址和端口；`listen` 把它标记为**监听套接字**，监听套接字把连接请求接收进一个队列（**等待队列**，backlog）；`accept` 等待连接，并为到来的连接返回一个*新的* **已连接套接字**，监听套接字则留下来准备接待下一个客户端。之后服务器在已连接套接字上 `recv`、`send`，最后 `close`。
- **客户端**：`socket`，然后 `connect` 到服务器的地址。`connect` 执行 TCP 的三次握手（[[networks/tcp-congestion]]），连接建立后返回。之后是 `send`、`recv` 和 `close`。

::: widget graph
nodes: socket@0,4; bind@1,4; listen@2,4; accept@3,4; recv@4,4; send@5,4; close@6,4; Csocket@2,1; connect@3,1; Csend@4,1; Crecv@5,1; Cclose@6,1
edges: socket>bind; bind>listen; listen>accept; accept>recv; recv>send; send>close; Csocket>connect; connect>accept; connect>Csend; Csend>recv; send>Crecv; Csend>Crecv; Crecv>Cclose
algorithm: topo
start: socket
caption: 一次请求–应答中 TCP 服务器（上排）与客户端（下排，带 `C` 前缀）的调用。箭头表示“必须先于”：服务器开始监听之前 `connect` 不可能完成；客户端发出数据之前，服务器的 `recv` 不可能返回数据。逐步走完拓扑排序，可以看到一种调用得以完成的先后次序；注意满足条件的次序不止一种——客户端可以在服务器 `bind` 之前或之后创建——但每一种都尊重箭头。双方都先调用 `recv` 就会死锁：那样就没有哪个 `send` 能抢在前面了。
:::

这个 Python 服务器有两个细节值得一提。`setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)` 让重启后的服务器即使旧连接还处于 TCP 的 `TIME_WAIT` 状态（连接关闭后会持续到几分钟之久，原因在 [[networks/tcp-congestion]] 中解释）也能重新绑定它的端口。用 `ss` 可以看到这些状态：

```console
$ ss -tan '( sport = :5000 or dport = :5000 )'
State     Recv-Q Send-Q Local Address:Port  Peer Address:Port
LISTEN    0      128        127.0.0.1:5000       0.0.0.0:*
TIME-WAIT 0      0          127.0.0.1:37408    127.0.0.1:5000
TIME-WAIT 0      0          127.0.0.1:37416    127.0.0.1:5000
TIME-WAIT 0      0          127.0.0.1:37420    127.0.0.1:5000
```

这里处于 `TIME-WAIT` 的是*客户端*那一端，因为客户端先关闭。第二个细节是客户端的 `shutdown(SHUT_WR)`，即**半关闭**：它告诉服务器“我发完了”（TCP 发出一个 FIN 报文段），于是服务器的 `recv` 返回 `b""`——文件结束——而客户端仍然可以继续接收响应。没有它，服务器会等更多数据、客户端会等响应，永远等下去。

::: example 一次请求–应答死锁 {#ex-deadlock}
从 `echo_client.py` 中删去 `sock.shutdown(socket.SHUT_WR)` 这一行再运行。会发生什么？在不恢复这一行的前提下，有哪两种修复办法？
::: solution
客户端发出消息后调用 `recv`，等服务器回复并最终关闭。服务器收到消息、原样回发——所以客户端确实收到了 `HELLO, NETWORK`——然后又调用 `recv`，等待更多数据或文件结束。此时客户端正处在它的循环 `while chunk := sock.recv(4096)` 里，等服务器那边的文件结束。双方都在等对方先结束：**死锁**，一直持续到有一方被杀掉为止。（Python 的 `with` 块会关闭套接字，但那要等循环结束——而它永不结束。）

根本问题是双方都不知道一条消息在哪里结束。修复办法就是下文 [[#def-framing]] 中的那几种：要么客户端只读取与自己发送量相同的字节（双方都知道长度——长度前缀协议把这一点明确化），要么协议有一个分隔符（比如换行符），服务器在分隔符后作出响应、客户端随即停止读取。半关闭是第三种修复，即“一条连接一条消息”的方案，HTTP/1.0 就是这么做的。
:::
:::

服务器绑定的是 `127.0.0.1`，所以只有同一台机器上的程序能访问它。绑定 `0.0.0.0`（IPv6 用 `::`）则接受主机每个接口上、任何能路由到它的地方的连接；只有当你确实打算做一个公开的服务、并且准备好迎接恶意输入时才这样做。

## C 语言的 TCP 客户端与服务器

C 的接口就是内核提供的那个；Python 接口只是它上面薄薄的一层。下面这个客户端接受一个主机名、一个端口和一条消息，并使用 `getaddrinfo`，从而对 IPv4 和 IPv6 一视同仁：

```c
/* client.c：连接到 host:port，发送 argv[3]，打印响应直到文件结束 */
#define _POSIX_C_SOURCE 200809L
#include <netdb.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc != 4) { fprintf(stderr, "usage: %s host port message\n", argv[0]); return 2; }
    struct addrinfo hints = {0}, *res, *p;
    hints.ai_family = AF_UNSPEC;            /* IPv4 或 IPv6，名字有哪个用哪个 */
    hints.ai_socktype = SOCK_STREAM;        /* TCP */
    int err = getaddrinfo(argv[1], argv[2], &hints, &res);
    if (err != 0) { fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(err)); return 1; }
    int fd = -1;
    for (p = res; p != NULL; p = p->ai_next) {      /* 逐个尝试各地址 */
        fd = socket(p->ai_family, p->ai_socktype, p->ai_protocol);
        if (fd < 0) continue;
        if (connect(fd, p->ai_addr, p->ai_addrlen) == 0) break;
        close(fd);
        fd = -1;
    }
    freeaddrinfo(res);
    if (fd < 0) { perror("connect"); return 1; }
    const char *msg = argv[3];
    size_t len = strlen(msg);
    for (size_t off = 0; off < len; ) {     /* write 可能写不满：循环 */
        ssize_t k = write(fd, msg + off, len - off);
        if (k < 0) { perror("write"); return 1; }
        off += (size_t) k;
    }
    shutdown(fd, SHUT_WR);                  /* 发出 FIN：我方发完了 */
    char buf[4096];
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) > 0)
        fwrite(buf, 1, (size_t) n, stdout);
    putchar('\n');
    close(fd);
    return n < 0;
}
```

服务器直接使用 IPv4 地址结构，以便展示字节序转换：

```c
/* server.c：在 127.0.0.1:<port> 上的迭代式 TCP 回显服务器 */
#define _POSIX_C_SOURCE 200809L
#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

static int write_all(int fd, const char *p, size_t n) {  /* 对短写进行循环 */
    while (n > 0) {
        ssize_t k = write(fd, p, n);
        if (k < 0) return -1;
        p += k;
        n -= (size_t) k;
    }
    return 0;
}

int main(int argc, char *argv[]) {
    if (argc != 2) { fprintf(stderr, "usage: %s port\n", argv[0]); return 2; }
    int lfd = socket(AF_INET, SOCK_STREAM, 0);
    if (lfd < 0) { perror("socket"); return 1; }
    int one = 1;
    setsockopt(lfd, SOL_SOCKET, SO_REUSEADDR, &one, sizeof one);
    struct sockaddr_in addr = {0};
    addr.sin_family = AF_INET;
    addr.sin_port = htons((unsigned short) atoi(argv[1]));  /* 网络字节序 */
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);           /* 127.0.0.1 */
    if (bind(lfd, (struct sockaddr *) &addr, sizeof addr) < 0) { perror("bind"); return 1; }
    if (listen(lfd, 16) < 0) { perror("listen"); return 1; }
    for (;;) {
        struct sockaddr_in peer;
        socklen_t plen = sizeof peer;
        int cfd = accept(lfd, (struct sockaddr *) &peer, &plen);
        if (cfd < 0) { perror("accept"); continue; }
        char ip[INET_ADDRSTRLEN];
        inet_ntop(AF_INET, &peer.sin_addr, ip, sizeof ip);
        printf("client %s port %u\n", ip, ntohs(peer.sin_port));
        fflush(stdout);
        char buf[4096];
        ssize_t n;
        while ((n = read(cfd, buf, sizeof buf)) > 0)        /* 回显直到文件结束 */
            if (write_all(cfd, buf, (size_t) n) < 0) break;
        close(cfd);
    }
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o server server.c && gcc -std=c17 -Wall -Wextra -o client client.c
$ ./server 5001 &
$ ./client 127.0.0.1 5001 "echo, echo"
client 127.0.0.1 port 48568
echo, echo
$ ./client localhost 5001 "via localhost"
client 127.0.0.1 port 48570
via localhost
```

（两者编译时都没有警告，加上 `-fsanitize=address,undefined` 也一样。）第二次运行比看上去更有趣。在测试机上，`localhost` 先解析到 `::1`，而服务器只监听 IPv4。跟踪客户端的系统调用可以看到：`getaddrinfo` 返回两个地址，IPv6 的尝试被拒绝，循环回落到 IPv4：

```console
$ strace -e trace=connect ./client localhost 5000 "hello from C"
...
connect(3, {sa_family=AF_INET6, sin6_port=htons(5000), ... "::1" ...}, 28) = -1 ECONNREFUSED (Connection refused)
connect(3, {sa_family=AF_INET, sin_port=htons(5000), sin_addr=inet_addr("127.0.0.1")}, 16) = 0
HELLO FROM C
```

（其中的 `...` 隐去了 `getaddrinfo` 自己的探测。）只取第一个地址的客户端会失败。服务器对 `write` 的循环就是 [[computer-systems/system-io#prop-write-all]] 的 `write_all`：在套接字上，当内核发送缓冲区满时，`write` 可能发出比要求少的字节。

::: example 连接被拒绝 {#ex-refused}
当客户端连接一个没有进程在监听的端口——例如 `./client 127.0.0.1 5009 hi`——在分组和系统调用的层面上会发生什么？
::: solution
```console
$ ./client 127.0.0.1 5009 hi
connect: Connection refused
```

客户端的内核向 5009 端口发出连接请求（一个 TCP SYN 报文段）。服务器主机的内核找不到该端口的监听套接字，于是回以一个 TCP **复位**（RST）报文段。客户端内核随即让 `connect` 以 `ECONNREFUSED` 失败。这一切在一个往返之内发生。反之，如果主机不存在、或防火墙悄悄丢弃了 SYN，`connect` 会重传 SYN 若干次，直到一分钟或更长的超时之后才失败（`ETIMEDOUT`）——这就是客户端常常自己设置更短的 connect 超时的原因。
:::
:::

## 字节流，不是消息流

关于 TCP 套接字最重要的一条在 [[#def-socket]] 里已经写明：TCP 提供的是**字节流**。发送方对 `send` 的调用不会被作为整体保留。内核可能把几次小的发送合并进一个报文段，可能把一个大的拆成许多报文段；而接收方的 `recv` 只把已经到达的字节返回，至多返回请求的那么多。

::: example 消息边界消失了 {#ex-boundaries}
发送方进行三次调用：`sendall(b"hello")`、`sendall(b"world")`，半秒后再 `sendall(b"!" * 100000)`。接收方看到什么？
::: solution
```python
# stream.py：TCP 不保留消息边界
import socket, threading, time

lsock = socket.create_server(("127.0.0.1", 0))      # 端口 0：内核挑一个空闲端口
port = lsock.getsockname()[1]

def sender():
    with socket.create_connection(("127.0.0.1", port)) as s:
        s.sendall(b"hello")                          # 两条独立的“消息”
        s.sendall(b"world")
        time.sleep(0.5)
        s.sendall(b"!" * 100000)                     # 一条大的“消息”

threading.Thread(target=sender).start()
conn, _ = lsock.accept()
time.sleep(0.2)                                      # 让两个小发送都到达
print(conn.recv(4096))                               # 一次 recv 把两条都返回
sizes = []
while chunk := conn.recv(65536):
    sizes.append(len(chunk))
print(len(sizes), "recv calls for 100000 bytes:", sizes)
```

```console
$ python3 stream.py
b'helloworld'
2 recv calls for 100000 bytes: [65536, 34464]
$ python3 stream.py
b'helloworld'
3 recv calls for 100000 bytes: [32768, 65536, 1696]
```

两条小“消息”一起到达，一次 `recv` 把两条一起返回：接收方分不清一条在哪里结束。那条大的分片到达，每片大小取决于时机，每次运行都不一样。在环回接口上这只是偶尔发生；在真实网络上，报文段约 1,460 字节、时延又各不相同，一条大消息**总是**会被拆开——“在我机器上跑得好好的”代码会在线上出故障。
:::
:::

因此，应用层协议必须标明自己消息的起止。

::: definition 消息分帧 {#def-framing}
**分帧（framing）**方案让接收方能够从字节流中恢复出发送方的消息边界。常用方案有：

- **分隔符**：每条消息以一个在其内部不可能出现的字节序列结尾，例如 HTTP/1.1 和 SMTP 中结束每一行的 `\r\n`；
- **长度前缀**：每条消息前面是一个固定大小字段给出的长度，HTTP/2 帧首部和 TLS 记录首部都是这样；
- **一条连接一条消息**：发送方在消息结束时关闭（或半关闭）连接，我们的回显客户端和 HTTP/1.0 就是这样。
:::

对二进制数据而言，长度前缀是最容易正确实现的一种。接收方需要一个**恰好**读取 $n$ 字节的函数——不管字节怎样到达：

```python
# framing.py：TCP 字节流上的长度前缀消息
import socket, struct, threading

def recv_exact(sock, n):
    """从 sock 恰好读出 n 字节并返回；若对端先关闭则抛出 EOFError。"""
    buf = bytearray()
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            raise EOFError(f"connection closed after {len(buf)} of {n} bytes")
        buf += chunk
    return bytes(buf)

MAX_MSG = 1 << 20                          # 拒绝来自故障对等方的荒谬长度

def send_msg(sock, payload):
    sock.sendall(struct.pack("!I", len(payload)) + payload)   # 4 字节大端长度

def recv_msg(sock):
    (n,) = struct.unpack("!I", recv_exact(sock, 4))
    if n > MAX_MSG:
        raise ValueError(f"message of {n} bytes is too long")
    return recv_exact(sock, n)

if __name__ == "__main__":
    lsock = socket.create_server(("127.0.0.1", 0))
    def client():
        with socket.create_connection(lsock.getsockname()) as s:
            for m in [b"hello", b"", b"world" * 3]:
                send_msg(s, m)
    threading.Thread(target=client).start()
    conn, _ = lsock.accept()
    try:
        while True:
            print(recv_msg(conn))
    except EOFError as e:
        print("EOF:", e)
```

```console
$ python3 framing.py
b'hello'
b''
b'worldworldworld'
EOF: connection closed after 0 of 4 bytes
```

::: proposition recv_exact 的正确性 {#prop-recv-exact}
设每次调用 `sock.recv(k)`（$k \ge 1$）要么返回流的接下来 $j$ 个字节（某个 $1 \le j \le k$），要么当且仅当对等方已关闭其发送侧、且它的全部字节都已被接收时返回 `b""`。那么只要对等方在关闭前还发送至少 $n$ 个字节，`recv_exact(sock, n)` 就按顺序返回流的接下来 $n$ 个字节；否则它在消耗完所有剩余字节后抛出 `EOFError`。
:::

::: proof
**不变式**：在循环的开头，`buf` 按顺序保存着流的接下来 `len(buf)` 个字节，且 $0 \le$ `len(buf)` $\le n$。初始时 `buf` 为空。在一次迭代中，$k = n - $`len(buf)` $\ge 1$。若 `recv` 返回 $j \ge 1$ 个字节，它们就是跟在 `buf` 中那些字节之后的字节，且 $j \le k$，所以追加之后 `buf` 按顺序保存着接下来 `len(buf)` $+ j \le n$ 个字节：不变式保持成立。若它返回 `b""`，则对等方已关闭、它发送过的每个字节都已收到——如今全都在 `buf` 里，少于 $n$ 个——函数便抛出 `EOFError`。每次成功的迭代都使 `len(buf)` 至少增加 $1$，因此至多 $n$ 次之后 `len(buf)` $= n$，循环退出，且由不变式，`buf` 恰好保存接下来的 $n$ 个字节。若对等方发送至少 $n$ 个字节，那么 $n$ 个字节收到之前 `recv` 不可能返回 `b""`，于是 `EOFError` 不可能发生。
:::

`recv_msg` 先读 4 字节长度，再读那么多字节，所以由 [[#prop-recv-exact]]，它按顺序恰好返回交给 `send_msg` 的那些有效载荷——包括空的那一个。注意 `MAX_MSG` 检查。没有它，一个（失陷或恶意的）对等方可以报一个四十亿的长度，让接收方试图分配四十吉字节。从网络上读到的**每一个**长度、计数或偏移都是不可信输入，使用前必须检查；大多数面向网络的安全漏洞——C 语言解析器中的缓冲区溢出、内存耗尽、2014 年的“心脏出血（Heartbleed）”缺陷（服务器信任了客户端发来的一个长度字段，就把自己内存中的那么多字节交了出去）——都源于忘记这一点。

::: warning 一次 send 不等于一次 recv
诱惑在于用一次 `recv(4096)` 读出一条消息并假设它是完整的，或用一次 `send` 发出请求并假设全部发了出去。两者都是错的：`recv` 可能返回一条消息的一部分，也可能返回好几条消息的一部分（[[#ex-boundaries]]），而 `send`（不像 Python 的 `sendall`）可能只发出缓冲区的一部分。一定要循环——发送用 `sendall` 或 `write_all`，接收用类似 `recv_exact` 的分帧层——并且要用大消息、以及一次只发一个字节的对等方来测试。
:::

## UDP 套接字

UDP 套接字收发一个个的**数据报**。没有连接、没有握手、没有重传、没有定序：每次 `sendto` 产生一个数据报，它要么完整到达一次，要么根本不达。作为回报，UDP 不添加任何时延、保留消息边界，因此适合 DNS 这样短小的请求–响应协议、迟到即无用的实时媒体，以及在用户空间构造的新传输协议（如 QUIC）。

```python
# udp_server.py：对 127.0.0.1:5002 上收到的每个数据报，回复它的长度
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("127.0.0.1", 5002))
while True:
    data, client = sock.recvfrom(65535)           # 每次调用收到一整个数据报
    print(client, len(data), "bytes")
    sock.sendto(f"got {len(data)} bytes".encode(), client)
```

客户端必须自己应对丢失。这里它等回复等半秒，最多重试三次：

```python
# udp_client.py：发送数据报，带超时与重试以应对丢失
import socket

def request(sock, data, server, tries=3, timeout=0.5):
    sock.settimeout(timeout)
    for attempt in range(1, tries + 1):
        sock.sendto(data, server)
        try:
            reply, _ = sock.recvfrom(65535)
            return reply
        except socket.timeout:
            print(f"attempt {attempt}: no reply")
    raise TimeoutError("server did not answer")

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
    for size in (5, 1400, 60000):
        print(request(sock, b"x" * size, ("127.0.0.1", 5002)))
    try:
        sock.sendto(b"x" * 70000, ("127.0.0.1", 5002))
    except OSError as e:
        print("70000 bytes:", e)
    try:
        request(sock, b"hello", ("127.0.0.1", 5003))      # 这里无人监听
    except TimeoutError as e:
        print(e)
```

```console
$ python3 udp_server.py &
$ python3 udp_client.py
b'got 5 bytes'
b'got 1400 bytes'
b'got 60000 bytes'
70000 bytes: [Errno 90] Message too long
attempt 1: no reply
attempt 2: no reply
attempt 3: no reply
server did not answer
```

每次 `recvfrom` 都恰好返回一个数据报，无论它多大。一个 UDP 数据报经 IPv4 至多携带 $65535 - 8 - 20 = 65507$ 字节数据，因为 IP 总长度字段是 16 位，而 IP 和 UDP 首部分别占 20 和 8 字节，所以 70,000 字节被发送方的内核拒绝。大于路径 MTU（约 1,500 字节）的数据报会被拆成 IP **分片**（[[networks/network-layer]]），丢任何一个分片就等于丢整个数据报，所以真正在用的 UDP 协议都把数据报保持得很小——DNS 传统上是 512 字节，QUIC 约 1,200–1,500 字节。

对 5003 端口（无人监听）的请求只是超时而已。如果客户端先在自己的 UDP 套接字上调用 `connect`——它不发送任何东西，只是把对端地址固定下来——内核就会报告服务器主机回送的 ICMP “port unreachable”（端口不可达）消息：

```console
$ python3 -c "
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('127.0.0.1', 5003)); s.send(b'hello')
s.recv(100)"
ConnectionRefusedError: [Errno 111] Connection refused
```

（最后一行之前的回溯信息略去。）一个未连接的、可能从任何人那里接收的套接字无法判断这个错误对应自己发出的哪个数据报，所以内核不予报告。

::: quiz
一个程序向另一大洲上的一台 UDP 服务器用 `sendto` 发送三个 100 字节的数据报。服务器可能观察到下面哪些情形？
- [x] 收到了第二个数据报，却没有收到第一个和第三个。
- [x] 在第二个之前收到第三个。
- [ ] 一次 `recvfrom(4096)` 把前两个数据报合在一起返回，200 字节。
- [ ] 收到了第一个数据报的前 50 个字节。
::: solution
UDP 可能丢失或重排数据报（路由可能改变，分组可能走不同的路径），所以头两种情形都可能发生。但它从不合并、也从不拆分数据报：每次 `recvfrom` 恰好返回一整个数据报，所以后两种不可能。（数据报在少数情况下还可能被复制。）对照 TCP：那里什么都不丢、不乱序，但边界不被保留。
:::
:::

## 服务许多客户端

上面的回显服务器是**迭代式**的：一次只服务一个客户端，忙于一个客户端时，其他客户端就在监听套接字的等待队列里排着。每个请求都很短时，这也许可以接受。可一旦某个请求要花时间——读磁盘、查数据库、或者等一个慢客户端把数据发来——所有人就都得等。

::: example 迭代式与并发服务器 {#ex-concurrency}
一个服务器服务每个请求需要 1 s（用 `time.sleep` 模拟）。三个客户端同时接入。用迭代式服务器、以及每条连接一个线程的服务器，它们各自什么时候拿到响应？
::: solution
```python
# slow_server.py MODE：服务每个请求需 1 s；MODE 取 "iterative" 或 "threads"
import socket, sys, threading, time

def handle(conn):
    with conn:
        request = conn.recv(1024)
        time.sleep(1.0)                      # 模拟慢磁盘或慢数据库
        conn.sendall(b"done: " + request)

lsock = socket.create_server(("127.0.0.1", 5004))
while True:
    conn, _ = lsock.accept()
    if sys.argv[1] == "threads":
        threading.Thread(target=handle, args=(conn,), daemon=True).start()
    else:
        handle(conn)                         # 下一个客户端在等待队列里排队
```

```python
# clients.py N：同时启动 N 个客户端，报告各自的完成时刻
import socket, sys, threading, time

start = time.monotonic()
def client(i):
    with socket.create_connection(("127.0.0.1", 5004)) as s:
        s.sendall(f"request {i}".encode())
        reply = s.recv(1024).decode()
    print(f"{reply} after {time.monotonic() - start:.2f} s")

threads = [threading.Thread(target=client, args=(i,)) for i in range(int(sys.argv[1]))]
for t in threads: t.start()
for t in threads: t.join()
```

```console
$ python3 slow_server.py iterative &
$ python3 clients.py 3
done: request 1 after 1.01 s
done: request 2 after 2.01 s
done: request 0 after 3.01 s
$ python3 slow_server.py threads &
$ python3 clients.py 3
done: request 2 after 1.01 s
done: request 0 after 1.01 s
done: request 1 after 1.01 s
```

迭代式服务器一个接一个地答复客户端，在第 1、2、3 秒（按连接到达等待队列的先后，未必是客户端线程启动的先后）。每条连接一个线程时，三个客户端同时得到服务，1 s 后一起完成。一般地，$N$ 个服务时间为 $s$ 的同时请求，迭代式服务器里第 $k$ 个被服务的客户端等 $ks$，平均等 $s(N + 1)/2$，最后一个等 $Ns$。
:::
:::

**并发服务器**有三种经典构造法。

- **每条连接一个进程。** `accept` 之后服务器调用 `fork`（[[computer-systems/exceptions-processes]]）；子进程服务这条连接然后退出，父进程关闭自己手里那份已连接套接字的副本，回到 `accept`。进程彼此隔离——一个崩溃不影响其余——但每个进程都要花内存和上下文切换，而且不便共享数据。早期 Unix 网络守护进程和 Apache Web 服务器的 prefork 模式就是这样工作的。
- **每条连接一个线程**（或者一个从队列里领取连接的**线程池**）。线程共享内存，因而更便宜、还能共享缓存，但共享数据必须用锁保护（[[operating-systems]]）。线程池给线程数设上界：$k$ 个线程、$N$ 个耗时 $s$ 的同时请求，最后一个在 $\lceil N/k \rceil s$ 之后完成。
- **事件循环。** 单个线程询问内核：众多套接字中哪些已经*就绪*——有数据可读，或发送缓冲区有了空位——然后对每个就绪的套接字做非阻塞处理。

::: algorithm 事件驱动服务器 {#alg-event-loop}
1. 把监听套接字和每个已连接套接字置于**非阻塞**模式，并把它们登记给一个就绪通知机制（`select`、`poll`、Linux 的 `epoll`、BSD 的 `kqueue`）。
2. 重复：
   1. 等待，直到至少一个登记在册的套接字就绪。
   2. 对每个就绪的套接字：若它是监听套接字，`accept` 新连接并登记它；否则 `recv` 可用的字节，推进该连接的协议状态（一个解析器、一个搭到一半的响应），并把要回的答复排进队列；`recv` 返回零字节表示对端已关闭，于是注销并关闭该套接字。
   3. 向可写的就绪套接字发送排队的输出，装不下的部分留待以后。
:::

```python
# event_server.py：单线程用事件循环（selectors）服务许多回显客户端
import selectors, socket

sel = selectors.DefaultSelector()            # Linux 上用 epoll，BSD/macOS 上用 kqueue
lsock = socket.create_server(("127.0.0.1", 5005))
lsock.setblocking(False)
sel.register(lsock, selectors.EVENT_READ, data=None)

while True:
    for key, _ in sel.select():              # 阻塞，直到某个套接字就绪
        if key.data is None:                 # 监听套接字：来了新客户端
            conn, addr = lsock.accept()
            conn.setblocking(False)
            sel.register(conn, selectors.EVENT_READ, data=addr)
            print("open ", addr, "clients:", len(sel.get_map()) - 1)
        else:                                # 客户端套接字有数据（或 EOF）
            conn = key.fileobj
            data = conn.recv(4096)
            if data:
                conn.sendall(data)           # 简化处理：见正文
            else:
                print("close", key.data)
                sel.unregister(conn)
                conn.close()
```

```console
$ python3 event_server.py &
$ python3 -c "
import socket
a = socket.create_connection(('127.0.0.1', 5005)); b = socket.create_connection(('127.0.0.1', 5005))
a.sendall(b'from a'); b.sendall(b'from b'); print(b.recv(100), a.recv(100))
a.close(); b.sendall(b'b again'); print(b.recv(100)); b.close()"
open  ('127.0.0.1', 37522) clients: 1
open  ('127.0.0.1', 37536) clients: 2
b'from b' b'from a'
close ('127.0.0.1', 37522)
b'b again'
close ('127.0.0.1', 37536)
```

（服务器和客户端的输出行按实际发生的先后交错显示。）一个线程服务了两个客户端。代码取了一个在注释里标出的捷径：非阻塞套接字上的 `sendall` 在发送缓冲区装满时会抛出 `BlockingIOError`，这在响应很大或客户端很慢时就会发生。完整的实现应当遵循 [[#alg-event-loop]] 的步骤 2.3，按连接保存尚未发出的字节，并登记 `EVENT_WRITE` 直到它们发完——这就是真正的服务器都使用框架（Python 的 `asyncio`，或 libuv 这类库）而不是手写事件循环的原因。

事件循环用很少的内存就能管理数万个大多空闲的连接，因为一个连接只花费它的缓冲区和状态，不花一个线程的栈；nginx、Node.js 和许多高性能服务器就是这么工作的。代价是任何处理程序都不许阻塞：一次慢计算或一次阻塞调用会让所有客户端停摆。许多服务器把几种办法组合起来——每个处理器核心一个事件循环，另配一个线程池处理阻塞工作。

::: widget plot
f: x*s; ceil(x/k)*s; s
x: 1, 40
y: 0, 40
sliders: s=1:0.1:2:0.1; k=4:1:16:1
labels: \text{迭代}; \text{含 } k \text{ 个线程的线程池}; \text{无界并发}
caption: $x$ 个同时到达的请求中最后一个得到答复的时间，设每个请求需要等待 $s$ 秒（是等待，不是占用 CPU 的 $s$ 秒）：迭代式服务器（$xs$）、$k$ 线程的线程池（$\lceil x/k \rceil s$，阶梯形曲线）、以及并发无上限的服务器（如对非阻塞 I/O 的事件循环，$s$）。增大 $k$，阶梯就变平。模型假设请求的时间都花在等待别的事情上；若请求需要 CPU，那么任何服务器设计都不可能好于核数所允许的程度。
:::

### 防御性服务器

服务器是一个陌生人都可以向它发送输入的程序。除了检查每一个长度、防御性地解析之外，健壮的服务器还必须限制任何一个客户端所能消耗的资源。针对“每连接一线程”服务器的一个经典拒绝服务手法是：打开许多连接，再以极慢的速度发送请求——每隔几秒一个字节——让所有线程都被拖在等待上；防御办法是每次读取都设**超时**（`sock.settimeout`、`SO_RCVTIMEO`）、限制请求大小和每客户端连接数，以及采用空闲连接很便宜的事件驱动设计。而承载任何隐私内容的服务器都必须加密自己的连接：Python 的 `ssl` 模块和 OpenSSL 之类的 C 库能在已连接的套接字外面包一层 TLS（[[networks/application-layer]]）。绝不要自创加密算法。

::: history
套接字接口是为 4.2BSD Unix 设计的。加州大学伯克利分校于 1983 年发布 4.2BSD，其中的 TCP/IP 实现主要由比尔·乔伊（Bill Joy）、萨姆·莱夫勒（Sam Leffler）等人在 DARPA 资助下编写；它免费可得，对 TCP/IP 在大学中的普及功不可没。此后这些调用变化甚微：POSIX 把它们标准化了；`getaddrinfo`（RFC 2553，1999，后修订为 RFC 3493）取代只支持 IPv4 的 `gethostbyname` 以支持 IPv6；就绪接口则从 `select`（4.2BSD）经 `poll` 演化为 Linux 的 `epoll`（内核 2.5.44，2002）和 BSD 的 `kqueue`（2000）。丹·凯格尔（Dan Kegel）1999 年的文章《The C10K problem》（C 一万个连接问题）——如何在一台机器上服务一万个并发客户端——让事件驱动设计成为主流。W. 理查德·史蒂文斯（W. Richard Stevens）的《UNIX 网络编程》（*UNIX Network Programming*，1990；与 Fenner、Rudoff 合作的第三版，2003）至今仍是权威指南。
:::

## 后续内容

下一章 [[networks/reliable-transport]] 揭开 `send` 与 `recv` 之下的世界：一个传输协议如何在丢包的网络之上交付一条可靠的流。[[networks/tcp-congestion]] 解释 `connect` 背后的握手、上面见到的 `TIME_WAIT` 状态，以及 TCP 如何决定 `send` 能以多快的速度进行。线程与锁的并发属于 [[operating-systems]] 和 [[parallel-computing]]；分布在许多服务器上的服务——负载均衡、复制、以及正是建立在这些套接字之上的远程过程调用——则属于 [[distributed-systems]]。

::: summary
- **套接字**是一个通信端点的文件描述符；TCP 套接字（`SOCK_STREAM`）给出可靠的字节流，UDP 套接字（`SOCK_DGRAM`）给出不可靠的数据报（[[#def-socket]]）。
- 服务器调用 `socket`、`bind`、`listen`，然后 `accept`——它为每个客户端返回一个新的已连接套接字；客户端调用 `socket` 和 `connect`。使用 `getaddrinfo`（或 `create_connection`），并尝试它返回的每一个地址。
- 首部字段使用**网络字节序**，即大端序（[[#def-byte-order]]）。
- TCP 不保留消息边界：`recv` 可能返回一条消息的一部分，也可能返回好几条消息（[[#ex-boundaries]]）。协议需要**分帧**——分隔符或长度前缀（[[#def-framing]]）——接收方需要 `recv_exact`（[[#prop-recv-exact]]）。检查每一个收到的长度。
- UDP 保留边界，但可能丢失、复制数据报或使它们乱序；客户端要加上超时和重试。
- **并发服务器**使用进程、线程（或线程池），或非阻塞套接字上的**事件循环**（[[#alg-event-loop]]）；用超时和限额约束每个客户端的资源。
:::

## 习题

::: exercise 网络序下的端口 {level=1 check="20480"}
端口号 80（HTTP）是 16 位值 `0x0050`。在一台小端主机上，`htons(80)` 返回哪个整数？（用十进制输入。）
::: solution
`htons` 交换两个字节，得到 `0x5000` $= 5 \times 4096 = 20480$。按小端存放时，`0x5000` 就是字节 `00 50`——即 80 的大端表示，也就是必须放在线路上的样子。在大端主机上，`htons(80)` 返回 80。
:::
:::

::: exercise 最大的 UDP 数据报 {level=1 check="65507"}
已知 IPv4 总长度字段是 16 位，把 20 字节的 IP 首部（不含选项）和 8 字节的 UDP 首部都计入在内，一个 UDP 数据报能携带的最大载荷是多少字节？（输入字节数。）
::: solution
总共 $2^{16} - 1 = 65535$ 字节，减去 $20 + 8 = 28$ 字节首部，剩 $65507$ 字节。正文中 70,000 字节的 `sendto` 正是因此以 `EMSGSIZE`（“Message too long”）失败。
:::
:::

::: exercise recv 返回什么？{level=1}
客户端用一次 `sendall` 发送 `GET / HTTP/1.1\r\nHost: a\r\n\r\n`（27 字节）。服务器反复调用 `recv(10)`。一般地说出所有可能的返回值序列，并说明服务器何时知道请求已经完整。
::: solution
在 27 个字节全部返回之前，每次调用返回流中按顺序的 1 到 10 个字节；此后再次调用会阻塞直到更多数据到达（若客户端已关闭，则返回 `b""`）。所以返回的长度是若干介于 1 和 10 之间、总和为 27 的数的任意序列——比如 $10, 10, 7$，或 $3, 10, 10, 4$，或 $1, 1, \dots$——服务器无法预知是哪一种。它只能靠分帧知道请求完整：不带主体的 HTTP/1.1 请求在第一个空行 `\r\n\r\n` 处结束，所以服务器必须不断累积字节，直到看到这个序列。
:::
:::

::: exercise 同一端口上的两个服务器 {level=2}
在两个终端里各启动一次 `python3 echo_server.py`。第二个会怎样？为什么？然后再启动一个副本，让一个客户端连上它，趁客户端还连着用 Ctrl-C 停掉服务器，并立刻重启。为什么只有靠 `SO_REUSEADDR` 才能重启成功？
::: solution
第二个 `bind` 以 `OSError: [Errno 98] Address already in use` 失败：一个给定的本地地址和端口上只能有一个套接字用于监听（除非两者都设置特殊的 `SO_REUSEPORT` 选项——那是刻意把端口共享给多个进程做负载均衡）。第二个场景里，杀掉服务器先关闭了它那一端的连接，所以**服务器**那一端在接下来的几分钟里处于 `TIME_WAIT`，仍然占用本地地址 127.0.0.1:5000。没有 `SO_REUSEADDR` 时，Linux 拒绝把监听套接字绑定到一个被 `TIME_WAIT` 连接占用的地址；有了它，绑定被允许，因为新连接的四值标识将与旧的不同。
:::
:::

::: exercise 基于分隔符的分帧 {level=2}
写一个 Python 函数 `recv_line(sock, buf)`，从一个 TCP 套接字返回一行（不含结尾的 `\n`），使用 `bytearray` 类型的 `buf` 保存已收到但尚未返回的字节（换行符之后的字节因此留给下一次调用）。若连接在换行符之前关闭则抛出 `EOFError`，并拒绝长于 8192 字节的行。用一个先在一次调用里发 `"a\nbb\nccc"`、再在另一次调用里发 `"c\n"` 的发送方测试它。
::: solution
```python
import socket, threading

MAX_LINE = 8192

def recv_line(sock, buf):
    while True:
        i = buf.find(b"\n")
        if i >= 0:                              # 缓冲区里有一条完整的行
            line = bytes(buf[:i])
            del buf[:i + 1]                     # 其余部分留给下一次调用
            return line
        if len(buf) > MAX_LINE:
            raise ValueError("line too long")
        chunk = sock.recv(4096)
        if not chunk:
            raise EOFError("connection closed in the middle of a line")
        buf += chunk

lsock = socket.create_server(("127.0.0.1", 0))
def sender():
    with socket.create_connection(lsock.getsockname()) as s:
        s.sendall(b"a\nbb\nccc")
        s.sendall(b"c\n")
threading.Thread(target=sender).start()
conn, _ = lsock.accept()
buf = bytearray()
for _ in range(3):
    print(recv_line(conn, buf))
```

```console
$ python3 lines.py
b'a'
b'bb'
b'cccc'
```

函数先在缓冲区里查找，所以一次 `recv` 里到达的两行都会返回；跨两次 `recv` 被拆开的一行也能拼回。正确性论证与 [[#prop-recv-exact]] 相同：`buf` 始终按顺序保存着已收到但尚未返回的流字节。每次从头搜索整个缓冲区，对一条分成许多段的长行要花 $O(n^2)$；生产环境的实现会记住已经搜索到的位置。
:::
:::

::: exercise 等待队列 {level=2 check="4"}
一个迭代式服务器的服务时间是每个请求 $s = 0.5$ s，它正在接受连接。八个客户端同时接入。(a) 最后一个什么时候拿到响应？(b) 等待响应的平均等待时间是多少？(c) 同样八个客户端改用带 $k = 4$ 线程池的服务器。最后一个什么时候拿到响应？（(a) 的答案以秒为单位输入。）
::: solution
(a) 客户端逐个被服务：第 $k$ 个在 $0.5k$ s 完成，最后一个在 $8 \times 0.5 = 4$ s。(b) 平均值是 $0.5 \times (1 + 2 + \dots + 8)/8 = 0.5 \times 4.5 = 2.25$ s，即 $s(N+1)/2$（[[#ex-concurrency]]）。(c) 两轮、每轮四个：最后一个在 $\lceil 8/4 \rceil \times 0.5 = 1$ s 完成。（这一切都假设等待队列容量至少为 8；队列容量更小时，内核会不再应答进一步的连接请求，客户端将在超时后重试。）
:::
:::

::: exercise C 语言的长度前缀协议 {level=3}
写 C 函数 `int send_msg(int fd, const void *buf, uint32_t len)` 和 `int recv_msg(int fd, void *buf, uint32_t cap, uint32_t *len)`，实现 `framing.py` 的 4 字节大端长度前缀分帧，使 C 程序能与那个 Python 程序对话。`recv_msg` 必须把载荷长度存入 `*len`，并在收到一条消息（可能为空）时返回 $1$，在消息开始之前干净地到达流末尾时返回 $0$，在出错时返回 $-1$——包括消息长于 `cap`、或消息中途流结束。用 Python 发送方测试它。
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <arpa/inet.h>
#include <errno.h>
#include <stdint.h>
#include <unistd.h>

static int write_all(int fd, const void *p, size_t n) {
    const char *c = p;
    while (n > 0) {
        ssize_t k = write(fd, c, n);
        if (k < 0) { if (errno == EINTR) continue; return -1; }
        c += k; n -= (size_t) k;
    }
    return 0;
}

/* 恰好读 n 字节：返回 n；若在任何字节之前遇到 EOF 返回 0；出错或中途 EOF 返回 -1。 */
static ssize_t read_exact(int fd, void *p, size_t n) {
    char *c = p;
    size_t got = 0;
    while (got < n) {
        ssize_t k = read(fd, c + got, n - got);
        if (k < 0) { if (errno == EINTR) continue; return -1; }
        if (k == 0) return got == 0 ? 0 : -1;
        got += (size_t) k;
    }
    return (ssize_t) got;
}

int send_msg(int fd, const void *buf, uint32_t len) {
    uint32_t be = htonl(len);                   /* 网络字节序的长度 */
    if (write_all(fd, &be, 4) < 0) return -1;
    return write_all(fd, buf, len);
}

int recv_msg(int fd, void *buf, uint32_t cap, uint32_t *len) {
    uint32_t be;
    ssize_t r = read_exact(fd, &be, 4);
    if (r <= 0) return (int) r;                 /* 0：干净的 EOF；-1：错误 */
    *len = ntohl(be);
    if (*len > cap) return -1;                  /* 绝不信任来自线路的长度 */
    if (*len > 0 && read_exact(fd, buf, *len) != (ssize_t) *len) return -1;
    return 1;
}
```

写一个 `main`：监听 127.0.0.1（如 `server.c`），接受一个连接，运行 `while ((r = recv_msg(fd, buf, sizeof buf, &n)) == 1) printf("[%.*s]\n", (int) n, buf);`；让 Python 客户端用它的 `send_msg` 发出 `framing.py` 的三条消息，便会打印 `[hello]`、`[]` 和 `[worldworldworld]`。把长度单独返回很要紧：若设计是返回长度本身、并用 $0$ 表示流末尾，就分不清空消息和流的结束。另有两处微妙之处：`read_exact` 区分“消息之间的流末尾”（干净）与“消息之内的流末尾”（错误）；长度检查发生在读取载荷**之前**，因此恶意长度无法溢出 `buf`。首部和载荷分两次 `write` 可能产生两个小报文段；真正的实现会用 `writev` 把它们合并。
:::
:::

::: exercise 一个完备的事件循环 {level=3}
正文里的事件驱动服务器在非阻塞套接字上调用 `sendall`。(a) 当一个客户端大量发送却从不读取自己的响应时，究竟会出什么问题？(b) 依照 [[#alg-event-loop]] 描述使服务器正确的修改，并论证有了这些修改以后，任何客户端都无法阻塞其他客户端。
::: solution
(a) 服务器把一切原样回发。客户端不读取，它的接收缓冲区先被填满，接着 TCP 的流量控制（[[networks/tcp-congestion]]）使服务器的内核发不出数据，服务器的发送缓冲区也随之填满。非阻塞套接字上的下一次 `sendall` 只能写出数据的一部分并抛出 `BlockingIOError`（非阻塞套接字上，内核缓冲区满时 Python 的 `sendall` 会放弃），使事件循环崩溃——或者，假如套接字是阻塞的，`sendall` 将永远阻塞，所有其他客户端一起停摆。

(b) 为每条连接维护一个输出缓冲区。数据到达时，把响应追加到该缓冲区而不是立即发送，试着调用一次 `conn.send(outbuf)`，它接受了多少字节就删掉多少；若还有剩余，就为该套接字登记 `EVENT_READ | EVENT_WRITE`。选择器报告套接字可写时再 `send` 一些；缓冲区清空后回到只登记 `EVENT_READ`。为限制内存，对输出缓冲区超过限额的连接停止读取（注销其 `EVENT_READ`），这样一个不读取的客户端终将被自己的流量控制拖住。有了这些改动，循环所执行的每一次套接字操作都要么立即传送一些字节，要么不等待地返回 `BlockingIOError`，于是循环的每一轮对每个就绪套接字只做有界的工作量，并回到 `select`；一个慢的或恶意的客户端只能拖延自己的数据，永远拖不住循环。
:::
:::
