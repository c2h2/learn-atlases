Here is a complete network server in fifteen lines of Python. It waits for clients on port 5000 of your own machine, reads whatever each one sends, and sends it back in capital letters:

```python
# echo_server.py: an iterative TCP echo server on 127.0.0.1:5000
import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as lsock:
    lsock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    lsock.bind(("127.0.0.1", 5000))         # loopback only: unreachable from outside
    lsock.listen()
    print("listening on", lsock.getsockname())
    while True:
        conn, addr = lsock.accept()         # blocks until a client connects
        with conn:
            print("connection from", addr)
            while True:
                data = conn.recv(4096)      # at most 4096 bytes; b"" means EOF
                if not data:
                    break
                conn.sendall(data.upper())  # sendall loops until all bytes are sent
            print("closed", addr)
```

and a client to go with it:

```python
# echo_client.py: send a line to the echo server and print the reply
import socket, sys

msg = " ".join(sys.argv[1:]).encode("utf-8")
with socket.create_connection(("127.0.0.1", 5000)) as sock:
    print("local", sock.getsockname(), "-> remote", sock.getpeername())
    sock.sendall(msg)
    sock.shutdown(socket.SHUT_WR)           # no more data from us: server sees EOF
    reply = b""
    while chunk := sock.recv(4096):         # read until the server closes
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

Every networked program — a web browser, a database driver, the DNS resolver in your operating system — is built on the same few calls: `socket`, `bind`, `listen`, `accept` and `connect` to set up communication, and `send` and `recv` (or plain `write` and `read`) to carry it out. This interface, the **Berkeley sockets API**, has been the standard way for programs to use TCP/IP since 4.2BSD Unix in 1983, and every major language wraps it with only cosmetic changes.

This chapter teaches it. We look at what a socket is and how addresses are written; build TCP clients and servers in Python and in C; meet the property of TCP that catches out almost every beginner — it carries a stream of bytes, not messages — and fix it with message framing; contrast UDP's datagrams; and finally make servers that handle many clients at once, with threads or with an event loop. All examples run on the **loopback** interface (`127.0.0.1` for IPv4, `::1` for IPv6), which never leaves your machine; you can run them without network access and without disturbing anyone. The chapter assumes Unix I/O from [[computer-systems/system-io]], whose short counts reappear here with a vengeance.

## Sockets and addresses

::: definition Socket {#def-socket}
A **socket** is an endpoint for communication, created by the `socket` system call and represented in Unix by a file descriptor ([[computer-systems/system-io#def-fd]]). It has an **address family** (`AF_INET` for IPv4, `AF_INET6` for IPv6, `AF_UNIX` for local communication between processes on one host) and a **type**: `SOCK_STREAM` for a reliable, ordered, connection-oriented byte stream (TCP on the internet families), or `SOCK_DGRAM` for unreliable, connectionless datagrams (UDP).

A TCP connection is identified by the four values (local IP address, local port, remote IP address, remote port); a socket's **local address** is set by `bind` or chosen automatically by the kernel, and its **remote address** by `connect` or `accept`.
:::

Port numbers are 16-bit. Ports below 1024 are **well-known ports**, reserved for standard services (binding them on Unix needs privileges); clients normally let the kernel choose an **ephemeral port** — in the run above it chose 37408. The four-value identification is why one server port can carry thousands of connections at once: they differ in the client's address or port.

::: definition Network byte order {#def-byte-order}
Multi-byte integers in internet protocol headers — port numbers, addresses, lengths — are transmitted **big-endian**, most significant byte first; this is called **network byte order**. Hosts whose native order is little-endian, such as x86-64 and most ARM systems, must convert: in C with `htons`/`htonl` ("host to network short/long") and `ntohs`/`ntohl`, and in Python with the `!` prefix of the `struct` module.
:::

On the test machine (little-endian), port $5000 = \texttt{0x1388}$ is stored in memory as the bytes `88 13`, but must appear on the wire as `13 88`:

```console
$ python3 -c "import socket, struct; print(socket.htons(5000), struct.pack('!H', 5000).hex())"
34835 1388
```

`htons(5000)` returns $34835 = \texttt{0x8813}$, the integer whose little-endian bytes are `13 88`. Forgetting a conversion is a classic bug: the program works when client and server are both little-endian and talk only to each other, and fails against any correct implementation. The address `192.0.2.10` is likewise the four bytes `c0 00 02 0a` in that order, whatever the host. (Byte order itself is covered in [[computer-systems/bits-integers]].)

Names are turned into addresses with `getaddrinfo`, which consults `/etc/hosts` and DNS ([[networks/application-layer]]) and returns a *list* of addresses — IPv6 and IPv4, possibly several of each — in the order the client should try them (RFC 6724). A robust client tries each in turn until one connects. Python's `socket.create_connection` and `socket.create_server` do this work for you.

### The sequence of calls

A TCP server and client make these calls:

- **Server**: `socket` creates a socket; `bind` gives it a local address and port; `listen` marks it as a **listening socket**, which accepts connection requests into a queue (the **backlog**); `accept` waits for a connection and returns a *new* **connected socket** for it, leaving the listening socket ready for the next client. The server then `recv`s and `send`s on the connected socket and `close`s it.
- **Client**: `socket`, then `connect` to the server's address. `connect` performs TCP's three-way handshake ([[networks/tcp-congestion]]) and returns when the connection is established. Then `send`, `recv` and `close`.

::: widget graph
nodes: socket@0,4; bind@1,4; listen@2,4; accept@3,4; recv@4,4; send@5,4; close@6,4; Csocket@2,1; connect@3,1; Csend@4,1; Crecv@5,1; Cclose@6,1
edges: socket>bind; bind>listen; listen>accept; accept>recv; recv>send; send>close; Csocket>connect; connect>accept; connect>Csend; Csend>recv; send>Crecv; Csend>Crecv; Crecv>Cclose
algorithm: topo
caption: The calls of a TCP server (top row) and client (bottom row, prefixed `C`) for one request and reply. An arrow means "must happen before": `connect` cannot complete before the server is listening, and the server's `recv` cannot return data before the client has sent them. Step through the topological sort to see one order in which the calls can complete; notice that many orders are possible — the client may be created before or after the server's `bind` — but every one respects the arrows. A deadlock happens when both sides call `recv` first: then neither `send` can ever come first.
:::

Two details of the Python server deserve comment. `setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)` lets a restarted server bind its port even while old connections to that port are in TCP's `TIME_WAIT` state, which lasts up to a few minutes after a connection closes (the reason is explained in [[networks/tcp-congestion]]). You can see the state with `ss`:

```console
$ ss -tan '( sport = :5000 or dport = :5000 )'
State     Recv-Q Send-Q Local Address:Port  Peer Address:Port
LISTEN    0      128        127.0.0.1:5000       0.0.0.0:*
TIME-WAIT 0      0          127.0.0.1:37408    127.0.0.1:5000
TIME-WAIT 0      0          127.0.0.1:37416    127.0.0.1:5000
TIME-WAIT 0      0          127.0.0.1:37420    127.0.0.1:5000
```

Here the *clients'* ends are in `TIME-WAIT`, because the clients closed first. The second detail is the client's `shutdown(SHUT_WR)`, a **half-close**: it tells the server "I have finished sending" (TCP sends a FIN segment), so the server's `recv` returns `b""` — end of file — while the client can still receive the reply. Without it, the server would wait for more data and the client for the reply, for ever.

::: example A request–response deadlock {#ex-deadlock}
Remove the line `sock.shutdown(socket.SHUT_WR)` from `echo_client.py` and run it again. What happens, and which two ways are there to fix it without restoring the line?
::: solution
The client sends its message and calls `recv`, waiting for the server to reply and eventually close. The server receives the message, echoes it — so the client does in fact get `HELLO, NETWORK` back — and calls `recv` again, waiting for more data or for end of file. The client is now in its loop `while chunk := sock.recv(4096)`, waiting for end of file from the server. Each side waits for the other to finish: a **deadlock**, which lasts until one side is killed. (Python's `with` block would close the socket, but only after the loop ends, which it never does.)

The underlying problem is that neither side knows where a message ends. The fixes are those of [[#def-framing]] below: either the client reads only as many bytes as it sent (both sides know the length — a length-prefix protocol makes this explicit), or the protocol has a delimiter, such as a newline, after which the server replies and the client stops reading. Half-closing is the third fix, the "one message per connection" scheme, and is what HTTP/1.0 did.
:::
:::

The server binds `127.0.0.1`, so only programs on the same machine can reach it. Binding `0.0.0.0` (or `::` for IPv6) accepts connections on every interface of the host, from anywhere that can route to it; do that only for a service that is meant to be public and is ready for hostile input.

## A TCP client and server in C

The C interface is the one the kernel provides; the Python one is a thin layer over it. The client below takes a host name, a port and a message, and uses `getaddrinfo` so that it works with IPv4 and IPv6 alike:

```c
/* client.c: connect to host:port, send argv[3], print the reply until EOF */
#define _POSIX_C_SOURCE 200809L
#include <netdb.h>
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc != 4) { fprintf(stderr, "usage: %s host port message\n", argv[0]); return 2; }
    struct addrinfo hints = {0}, *res, *p;
    hints.ai_family = AF_UNSPEC;            /* IPv4 or IPv6, whichever the name has */
    hints.ai_socktype = SOCK_STREAM;        /* TCP */
    int err = getaddrinfo(argv[1], argv[2], &hints, &res);
    if (err != 0) { fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(err)); return 1; }
    int fd = -1;
    for (p = res; p != NULL; p = p->ai_next) {      /* try each address in turn */
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
    for (size_t off = 0; off < len; ) {     /* write may be short: loop */
        ssize_t k = write(fd, msg + off, len - off);
        if (k < 0) { perror("write"); return 1; }
        off += (size_t) k;
    }
    shutdown(fd, SHUT_WR);                  /* send FIN: we have finished sending */
    char buf[4096];
    ssize_t n;
    while ((n = read(fd, buf, sizeof buf)) > 0)
        fwrite(buf, 1, (size_t) n, stdout);
    putchar('\n');
    close(fd);
    return n < 0;
}
```

The server uses an IPv4 address structure directly, to show the byte-order conversions:

```c
/* server.c: iterative TCP echo server on 127.0.0.1:<port> */
#define _POSIX_C_SOURCE 200809L
#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

static int write_all(int fd, const char *p, size_t n) {  /* loop over short writes */
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
    addr.sin_port = htons((unsigned short) atoi(argv[1]));  /* network byte order */
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
        while ((n = read(cfd, buf, sizeof buf)) > 0)        /* echo until EOF */
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

(Both compile without warnings, also with `-fsanitize=address,undefined`.) The second run is more interesting than it looks. On the test machine `localhost` resolves to `::1` first, and the server listens only on IPv4. Tracing the client's system calls shows `getaddrinfo` returning both addresses, the IPv6 attempt being refused and the loop falling back to IPv4:

```console
$ strace -e trace=connect ./client localhost 5000 "hello from C"
...
connect(3, {sa_family=AF_INET6, sin6_port=htons(5000), ... "::1" ...}, 28) = -1 ECONNREFUSED (Connection refused)
connect(3, {sa_family=AF_INET, sin_port=htons(5000), sin_addr=inet_addr("127.0.0.1")}, 16) = 0
HELLO FROM C
```

(The `...` hides `getaddrinfo`'s own probes.) A client that took only the first address would have failed. The server's loop around `write` is the `write_all` of [[computer-systems/system-io#prop-write-all]]: on a socket, `write` may send fewer bytes than asked when the kernel's send buffer is full.

::: example Connection refused {#ex-refused}
What happens, at the level of packets and of system calls, when a client connects to a port on which no process listens — for example `./client 127.0.0.1 5009 hi`?
::: solution
```console
$ ./client 127.0.0.1 5009 hi
connect: Connection refused
```

The client's kernel sends a connection request (a TCP SYN segment) to port 5009. The server host's kernel finds no listening socket for that port and answers with a TCP **reset** (RST) segment. The client's kernel then fails `connect` with `ECONNREFUSED`. This happens within one round trip. If instead the host did not exist or a firewall silently dropped the SYN, `connect` would retransmit the SYN several times and fail only after a timeout of a minute or more (`ETIMEDOUT`) — which is why clients often set their own, shorter, connect timeout.
:::
:::

## A stream of bytes, not of messages

The most important fact about TCP sockets is in [[#def-socket]]: TCP provides a *byte stream*. The sender's calls to `send` are not preserved as units. The kernel may combine several small sends into one segment, split a large one into many segments, and the receiver's `recv` returns whatever bytes have arrived, up to the size requested.

::: example Message boundaries disappear {#ex-boundaries}
A sender makes three calls: `sendall(b"hello")`, `sendall(b"world")` and, half a second later, `sendall(b"!" * 100000)`. What does the receiver see?
::: solution
```python
# stream.py: TCP does not preserve message boundaries
import socket, threading, time

lsock = socket.create_server(("127.0.0.1", 0))      # port 0: the kernel picks a free port
port = lsock.getsockname()[1]

def sender():
    with socket.create_connection(("127.0.0.1", port)) as s:
        s.sendall(b"hello")                          # two separate "messages"
        s.sendall(b"world")
        time.sleep(0.5)
        s.sendall(b"!" * 100000)                     # one large "message"

threading.Thread(target=sender).start()
conn, _ = lsock.accept()
time.sleep(0.2)                                      # let both small sends arrive
print(conn.recv(4096))                               # one recv returns both
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

The two small "messages" arrived together and one `recv` returned both: the receiver cannot tell where one ended. The large one arrived in pieces whose sizes depend on timing and differ from run to run. On the loopback interface this happens only occasionally; across a real network, with segments of about 1,460 bytes and varying delays, a large message is *always* split, and code that "worked on my machine" fails in production.
:::
:::

An application protocol must therefore mark where its messages begin and end.

::: definition Message framing {#def-framing}
A **framing** scheme lets a receiver recover the sender's message boundaries from a byte stream. The common schemes are:

- **delimiters**: each message ends with a byte sequence that cannot occur inside it, such as the `\r\n` that ends each line of HTTP/1.1 and SMTP;
- **length prefixes**: each message is preceded by its length in a fixed-size field, as in the HTTP/2 frame header and the TLS record header;
- **one message per connection**: the sender closes (or half-closes) the connection at the end of the message, as in our echo client and in HTTP/1.0.
:::

Length prefixes are the simplest to implement correctly for binary data. The receiver needs a function that reads *exactly* $n$ bytes, however they arrive:

```python
# framing.py: length-prefixed messages over a TCP byte stream
import socket, struct, threading

def recv_exact(sock, n):
    """Return exactly n bytes from sock, or raise EOFError if the peer closes first."""
    buf = bytearray()
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            raise EOFError(f"connection closed after {len(buf)} of {n} bytes")
        buf += chunk
    return bytes(buf)

MAX_MSG = 1 << 20                          # refuse absurd lengths from a faulty peer

def send_msg(sock, payload):
    sock.sendall(struct.pack("!I", len(payload)) + payload)   # 4-byte big-endian length

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

::: proposition Correctness of recv_exact {#prop-recv-exact}
Suppose each call `sock.recv(k)` with $k \ge 1$ either returns the next $j$ bytes of the stream for some $1 \le j \le k$, or returns `b""` if and only if the peer has closed its sending side and all its bytes have been received. Then `recv_exact(sock, n)` returns the next $n$ bytes of the stream, in order, if the peer sends at least $n$ more bytes before closing; otherwise it raises `EOFError` after consuming all remaining bytes.
:::

::: proof
**Invariant**: at the top of the loop, `buf` holds the next `len(buf)` bytes of the stream in order, and $0 \le$ `len(buf)` $\le n$. Initially `buf` is empty. In an iteration, $k = n - $`len(buf)` $\ge 1$. If `recv` returns $j \ge 1$ bytes, they are the bytes following those in `buf`, and $j \le k$, so after appending, `buf` holds the next `len(buf)` $+ j \le n$ bytes in order: the invariant holds. If it returns `b""`, the peer has closed and every byte it sent has been received — all of them now in `buf`, fewer than $n$ — and the function raises `EOFError`. Each successful iteration increases `len(buf)` by at least $1$, so after at most $n$ of them `len(buf)` $= n$, the loop exits, and by the invariant `buf` holds exactly the next $n$ bytes. If the peer sends at least $n$ bytes, `recv` cannot return `b""` before $n$ have been received, so `EOFError` is impossible.
:::

`recv_msg` reads a 4-byte length and then that many bytes, so by [[#prop-recv-exact]] it returns exactly the payloads given to `send_msg`, in order — including the empty one. Note the `MAX_MSG` check. Without it, a peer (faulty or hostile) could send a length of four billion and make the receiver try to allocate four gigabytes. *Every* length, count or offset read from the network is untrusted input and must be checked before use; most network-facing security vulnerabilities — buffer overflows in C parsers, memory exhaustion, the "Heartbleed" bug of 2014 in which a server trusted a length field from the client and returned that many bytes of its own memory — come from forgetting this.

::: warning One send is not one receive
It is tempting to read a message with a single `recv(4096)` and assume it is complete, or to send a request with a single `send` and assume all of it went. Both are wrong: `recv` may return part of a message or parts of several ([[#ex-boundaries]]), and `send` (unlike Python's `sendall`) may send only part of its buffer. Always loop — `sendall` or `write_all` for sending, a framing layer such as `recv_exact` for receiving — and test with large messages and with a peer that sends one byte at a time.
:::

## UDP sockets

A UDP socket sends and receives individual **datagrams**. There is no connection, no handshake, no retransmission and no ordering: each `sendto` produces one datagram, which arrives whole, once, or not at all. In exchange UDP adds no delay and preserves message boundaries, which suits short request–response protocols such as DNS, real-time media where a late packet is useless, and new transports built in user space, such as QUIC.

```python
# udp_server.py: answer each datagram on 127.0.0.1:5002 with its length
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("127.0.0.1", 5002))
while True:
    data, client = sock.recvfrom(65535)           # one whole datagram per call
    print(client, len(data), "bytes")
    sock.sendto(f"got {len(data)} bytes".encode(), client)
```

The client must cope with loss itself. Here it waits half a second for a reply and retries up to three times:

```python
# udp_client.py: send datagrams, with a timeout and retries in case of loss
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
        request(sock, b"hello", ("127.0.0.1", 5003))      # nobody listens here
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

Each `recvfrom` returned exactly one datagram, however large. A UDP datagram can carry at most $65535 - 8 - 20 = 65507$ bytes of data over IPv4, because the IP total-length field is 16 bits and the IP and UDP headers take 20 and 8 bytes, so 70,000 bytes were refused by the sender's kernel. Datagrams larger than the path's MTU (about 1,500 bytes) are split into IP **fragments** ([[networks/network-layer]]), and losing any fragment loses the datagram, so real UDP protocols keep datagrams small — DNS traditionally to 512 bytes, QUIC to about 1,200–1,500.

The request to port 5003, where nobody listens, simply timed out. If the client first calls `connect` on its UDP socket — which sends nothing, but fixes the peer address — the kernel reports the ICMP "port unreachable" message that the server host sends back:

```console
$ python3 -c "
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('127.0.0.1', 5003)); s.send(b'hello')
s.recv(100)"
ConnectionRefusedError: [Errno 111] Connection refused
```

(The traceback before the last line is omitted.) An unconnected socket receiving from anyone cannot tell which of its datagrams the error refers to, so the kernel does not report it.

::: quiz
A program sends three datagrams of 100 bytes with `sendto` to a UDP server on another continent. Which of the following can the server observe?
- [x] It receives the second datagram but not the first or third.
- [x] It receives the third before the second.
- [ ] One `recvfrom(4096)` returns the first two datagrams together, 200 bytes.
- [ ] It receives 50 bytes of the first datagram.
::: solution
UDP may lose or reorder datagrams (routes can change and packets can take different paths), so the first two options are possible. But it never merges or splits them: each `recvfrom` returns exactly one whole datagram, so the last two are impossible. (A datagram may in rare cases be duplicated, too.) Contrast TCP, where nothing is lost or reordered, but boundaries are not preserved.
:::
:::

## Serving many clients

The echo servers above are **iterative**: they serve one client at a time, and while they are busy with one, others wait in the listening socket's backlog. When each request is quick, that may be acceptable. When a request takes a while — reading a disk, querying a database, or waiting for a slow client to send its data — everyone waits.

::: example Iterative and concurrent servers {#ex-concurrency}
A server needs 1 s to serve each request (simulated with `time.sleep`). Three clients connect at the same moment. When does each get its reply, with an iterative server and with one thread per connection?
::: solution
```python
# slow_server.py MODE: each request takes 1 s to serve; MODE is "iterative" or "threads"
import socket, sys, threading, time

def handle(conn):
    with conn:
        request = conn.recv(1024)
        time.sleep(1.0)                      # stand-in for a slow disk or database
        conn.sendall(b"done: " + request)

lsock = socket.create_server(("127.0.0.1", 5004))
while True:
    conn, _ = lsock.accept()
    if sys.argv[1] == "threads":
        threading.Thread(target=handle, args=(conn,), daemon=True).start()
    else:
        handle(conn)                         # the next client waits in the backlog
```

```python
# clients.py N: start N clients at once and report when each finishes
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

The iterative server answers the clients one after another, at 1, 2 and 3 seconds (in the order their connections reached the backlog, which need not be the order the client threads were started). With a thread per connection, all three are served at once and finish after 1 s. In general, with $N$ simultaneous requests of service time $s$, the $k$-th client served by an iterative server waits $ks$, the mean is $s(N + 1)/2$, and the last waits $Ns$.
:::
:::

There are three classic ways to build a **concurrent server**.

- **A process per connection.** After `accept`, the server calls `fork` ([[computer-systems/exceptions-processes]]); the child serves the connection and exits, the parent closes its copy of the connected socket and goes back to `accept`. Processes are isolated from each other — a crash in one does not affect the rest — but each costs memory and a context switch, and they cannot easily share data. The original Unix network daemons and the Apache web server's prefork mode work this way.
- **A thread per connection** (or a **pool** of threads that take connections from a queue). Threads share memory, so they are cheaper and can share caches, but shared data must be protected by locks ([[operating-systems]]). A pool bounds the number of threads: with $k$ threads and $N$ simultaneous requests of time $s$, the last finishes after $\lceil N/k \rceil s$.
- **An event loop.** A single thread asks the kernel which of many sockets are *ready* — have data to read, or room in their send buffer — and handles each ready socket without blocking.

::: algorithm Event-driven server {#alg-event-loop}
1. Put the listening socket and every connected socket in **non-blocking** mode, and register them with a readiness-notification mechanism (`select`, `poll`, Linux `epoll`, BSD `kqueue`).
2. Repeat:
   1. Wait until at least one registered socket is ready.
   2. For each ready socket: if it is the listening socket, `accept` the new connection and register it; otherwise `recv` the available bytes, advance that connection's protocol state (a parser, a partly built reply), and queue any reply; a `recv` of zero bytes means the peer closed, so unregister and close the socket.
   3. Send queued output to sockets that are ready for writing, keeping whatever does not fit for later.
:::

```python
# event_server.py: one thread serves many echo clients with an event loop (selectors)
import selectors, socket

sel = selectors.DefaultSelector()            # epoll on Linux, kqueue on BSD and macOS
lsock = socket.create_server(("127.0.0.1", 5005))
lsock.setblocking(False)
sel.register(lsock, selectors.EVENT_READ, data=None)

while True:
    for key, _ in sel.select():              # block until some socket is ready
        if key.data is None:                 # the listening socket: a new client
            conn, addr = lsock.accept()
            conn.setblocking(False)
            sel.register(conn, selectors.EVENT_READ, data=addr)
            print("open ", addr, "clients:", len(sel.get_map()) - 1)
        else:                                # a client socket has data (or EOF)
            conn = key.fileobj
            data = conn.recv(4096)
            if data:
                conn.sendall(data)           # simplification: see the text
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

(The lines from the server and the client are shown interleaved in the order they happened.) One thread served both clients. The code takes a shortcut marked in a comment: `sendall` on a non-blocking socket raises `BlockingIOError` if the send buffer fills, which happens with large replies or slow clients. A complete implementation follows step 2.3 of [[#alg-event-loop]], keeping unsent bytes per connection and registering for `EVENT_WRITE` until they are gone — which is why real servers use a framework (Python's `asyncio`, or libraries such as libuv) rather than writing the loop by hand.

Event loops handle tens of thousands of mostly idle connections with little memory, because a connection costs only its buffers and state, not a thread's stack; this is how nginx, Node.js and many high-performance servers work. The price is that no handler may block: a single slow computation or blocking call stalls every client. Many servers combine the approaches — an event loop per processor core, with a thread pool for blocking work.

::: widget plot
f: x*s; ceil(x/k)*s; s
x: 1, 40
y: 0, 40
sliders: s=1:0.1:2:0.1; k=4:1:16:1
labels: \text{iterative}; \text{pool of } k \text{ threads}; \text{unbounded concurrency}
caption: Time until the last of $x$ simultaneous requests is answered, when each request takes $s$ seconds of waiting (not of CPU time): an iterative server ($xs$), a pool of $k$ threads ($\lceil x/k \rceil s$, the staircase) and a server with unlimited concurrency, such as an event loop over non-blocking I/O ($s$). Increase $k$ and the staircase flattens. The model assumes that requests spend their time waiting for something else; if they need the CPU, no server design can do better than the number of cores allows.
:::

### Defensive servers

A server is a program that strangers can send input to. Beyond checking every length and parsing defensively, a robust server must bound the resources any one client can consume. A classic denial-of-service technique against thread-per-connection servers opens many connections and sends a request extremely slowly, a byte every few seconds, so that every thread is tied up waiting; the defences are **timeouts** on every read (`sock.settimeout`, `SO_RCVTIMEO`), limits on request size and connections per client, and event-driven designs in which idle connections are cheap. And a server that carries anything private must encrypt its connections: Python's `ssl` module and C libraries such as OpenSSL wrap a connected socket in TLS ([[networks/application-layer]]). Never invent your own encryption.

::: history
The sockets interface was designed for 4.2BSD Unix, released by the University of California, Berkeley, in 1983 with a TCP/IP implementation largely written by Bill Joy, Sam Leffler and colleagues under DARPA funding; its free availability did much to spread TCP/IP through universities. The calls have changed remarkably little since: POSIX standardised them, `getaddrinfo` (RFC 2553, 1999, revised as RFC 3493) replaced the IPv4-only `gethostbyname` to support IPv6, and readiness interfaces evolved from `select` (4.2BSD) through `poll` to Linux's `epoll` (kernel 2.5.44, 2002) and BSD's `kqueue` (2000). Dan Kegel's 1999 essay "The C10K problem" — how to serve ten thousand concurrent clients on one machine — made event-driven designs mainstream. W. Richard Stevens's *UNIX Network Programming* (1990; third edition with Fenner and Rudoff, 2003) remains the definitive guide.
:::

## Where this leads

The next chapter, [[networks/reliable-transport]], opens up what happens beneath `send` and `recv`: how a transport protocol delivers a reliable stream over a network that loses packets. [[networks/tcp-congestion]] explains the handshake behind `connect`, the `TIME_WAIT` state seen above, and how TCP decides how fast `send` may go. Concurrency with threads and locks belongs to [[operating-systems]] and [[parallel-computing]]; services spread over many servers — load balancing, replication, remote procedure calls built on exactly these sockets — to [[distributed-systems]].

::: summary
- A **socket** is a file descriptor for a communication endpoint; TCP sockets (`SOCK_STREAM`) give a reliable byte stream, UDP sockets (`SOCK_DGRAM`) unreliable datagrams ([[#def-socket]]).
- A server calls `socket`, `bind`, `listen` and then `accept`, which returns a new connected socket per client; a client calls `socket` and `connect`. Use `getaddrinfo` (or `create_connection`) and try every address it returns.
- Header fields are in **network byte order**, big-endian ([[#def-byte-order]]).
- TCP does not preserve message boundaries: `recv` may return part of a message or several messages ([[#ex-boundaries]]). Protocols need **framing** — delimiters or length prefixes ([[#def-framing]]) — and receivers need `recv_exact` ([[#prop-recv-exact]]). Check every length received.
- UDP preserves boundaries but may lose, duplicate or reorder datagrams; clients add timeouts and retries.
- **Concurrent servers** use processes, threads (or pools), or an **event loop** over non-blocking sockets ([[#alg-event-loop]]); bound every client's resources with timeouts and limits.
:::

## Exercises

::: exercise Ports in network order {level=1 check="20480"}
The port number 80 (HTTP) is the 16-bit value `0x0050`. On a little-endian host, what integer does `htons(80)` return? (Enter it in decimal.)
::: solution
`htons` swaps the two bytes, giving `0x5000` $= 5 \times 4096 = 20480$. Stored little-endian, `0x5000` is the bytes `00 50` — the big-endian representation of 80, which is what must go on the wire. On a big-endian host `htons(80)` returns 80.
:::
:::

::: exercise The largest UDP datagram {level=1 check="65507"}
What is the largest payload a single UDP datagram can carry over IPv4, given that the IPv4 total-length field is 16 bits and counts the 20-byte IP header (without options) and the 8-byte UDP header? (Enter the number of bytes.)
::: solution
$2^{16} - 1 = 65535$ bytes in all, minus $20 + 8 = 28$ bytes of headers, leaves $65507$ bytes. The 70,000-byte `sendto` in the text failed with `EMSGSIZE` ("Message too long") for this reason.
:::
:::

::: exercise What does recv return? {level=1}
A client sends `GET / HTTP/1.1\r\nHost: a\r\n\r\n` (27 bytes) in one `sendall`. The server calls `recv(10)` repeatedly. List every possible sequence of return values, in general terms, and say when the server knows the request is complete.
::: solution
Each call returns between 1 and 10 bytes of the stream, in order, until all 27 have been returned; after that, further calls block until more data arrive (or return `b""` if the client closes). So the returned lengths are any sequence of numbers between 1 and 10 summing to 27 — for instance $10, 10, 7$ or $3, 10, 10, 4$ or $1, 1, \dots$ — and the server cannot predict which. It knows the request is complete only by framing: an HTTP/1.1 request without a body ends at the first empty line, `\r\n\r\n`, so the server must accumulate bytes until it has seen that sequence.
:::
:::

::: exercise Two servers on one port {level=2}
You start `python3 echo_server.py` twice, in two terminals. What happens to the second one, and why? Then start one copy, connect a client to it, stop the server with Ctrl-C while the client is connected, and restart it immediately. Why does the restart succeed only because of `SO_REUSEADDR`?
::: solution
The second `bind` fails with `OSError: [Errno 98] Address already in use`: only one socket may be bound to a given local address and port for listening (unless both set the special `SO_REUSEPORT` option, which deliberately shares the port for load balancing). In the second scenario, killing the server closes its end of the connection first, so the *server's* end of that connection enters `TIME_WAIT` for up to a few minutes, still using local address 127.0.0.1:5000. Without `SO_REUSEADDR`, Linux refuses to bind a listening socket to an address in use by a `TIME_WAIT` connection; with it, the bind is allowed, because the four-value identifiers of new connections will differ from the old one.
:::
:::

::: exercise A delimiter-based framing {level=2}
Write a Python function `recv_line(sock, buf)` that returns one line (without its terminating `\n`) from a TCP socket, using a `bytearray` `buf` that holds bytes received but not yet returned (so that bytes after the newline are kept for the next call). Raise `EOFError` if the connection closes before a newline, and refuse lines longer than 8192 bytes. Test it with a sender that sends `"a\nbb\nccc"` in one call and `"c\n"` in another.
::: solution
```python
import socket, threading

MAX_LINE = 8192

def recv_line(sock, buf):
    while True:
        i = buf.find(b"\n")
        if i >= 0:                              # a complete line is buffered
            line = bytes(buf[:i])
            del buf[:i + 1]                     # keep the rest for the next call
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

The function first looks in the buffer, so two lines that arrive in one `recv` are both returned, and a line split across two `recv`s is reassembled. The correctness argument is that of [[#prop-recv-exact]]: `buf` always holds, in order, the stream bytes received but not yet returned. Searching the whole buffer each time costs $O(n^2)$ for a long line in many pieces; a production version would remember how far it had already searched.
:::
:::

::: exercise The backlog {level=2 check="4"}
An iterative server with service time $s = 0.5$ s per request is accepting connections. Eight clients connect at the same moment. (a) When does the last get its reply? (b) What is the mean waiting time until the reply? (c) The same eight clients use a server with a pool of $k = 4$ threads. When does the last get its reply? (Enter the answer to (a) in seconds.)
::: solution
(a) The clients are served one at a time: the $k$-th finishes at $0.5k$ s, the last at $8 \times 0.5 = 4$ s. (b) The mean is $0.5 \times (1 + 2 + \dots + 8)/8 = 0.5 \times 4.5 = 2.25$ s, which is $s(N+1)/2$ ([[#ex-concurrency]]). (c) Two rounds of four: the last finishes at $\lceil 8/4 \rceil \times 0.5 = 1$ s. (All of this assumes the backlog is at least 8; with a smaller backlog, the kernel stops answering further connection requests, and clients retry after a timeout.)
:::
:::

::: exercise A length-prefixed protocol in C {level=3}
Write C functions `int send_msg(int fd, const void *buf, uint32_t len)` and `int recv_msg(int fd, void *buf, uint32_t cap, uint32_t *len)` that implement the 4-byte big-endian length-prefix framing of `framing.py`, so that a C program and the Python one can talk to each other. `recv_msg` must store the payload length in `*len` and return $1$ when it has received a message (possibly empty), $0$ on a clean end of stream before a message begins, and $-1$ on error, including a message longer than `cap` or a stream that ends mid-message. Test it against the Python sender.
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

/* Read exactly n bytes: returns n, 0 if EOF before any byte, -1 on error or EOF mid-way. */
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
    uint32_t be = htonl(len);                   /* length in network byte order */
    if (write_all(fd, &be, 4) < 0) return -1;
    return write_all(fd, buf, len);
}

int recv_msg(int fd, void *buf, uint32_t cap, uint32_t *len) {
    uint32_t be;
    ssize_t r = read_exact(fd, &be, 4);
    if (r <= 0) return (int) r;                 /* 0: clean EOF; -1: error */
    *len = ntohl(be);
    if (*len > cap) return -1;                  /* never trust a length from the wire */
    if (*len > 0 && read_exact(fd, buf, *len) != (ssize_t) *len) return -1;
    return 1;
}
```

A `main` that listens on 127.0.0.1 (as in `server.c`), accepts one connection, and runs `while ((r = recv_msg(fd, buf, sizeof buf, &n)) == 1) printf("[%.*s]\n", (int) n, buf);` prints `[hello]`, `[]` and `[worldworldworld]` when a Python client sends the three messages of `framing.py` with its `send_msg`. Returning the length separately matters: a design that returned the length itself, with $0$ for end of stream, could not tell an empty message from the end. Two further subtleties: `read_exact` distinguishes "end of stream between messages" (clean) from "end of stream inside a message" (an error), and the length check happens *before* reading the payload, so a hostile length cannot overflow `buf`. Two `write` calls for header and payload may produce two small segments; real implementations combine them with `writev`.
:::
:::

::: exercise A complete event loop {level=3}
The event-driven server in the text calls `sendall` on non-blocking sockets. (a) Explain exactly what goes wrong when a client sends a lot of data but never reads its replies. (b) Describe the changes, following [[#alg-event-loop]], that make the server correct, and argue that with them no client can block the others.
::: solution
(a) The server echoes everything back. The client does not read, so its receive buffer fills, then TCP's flow control ([[networks/tcp-congestion]]) stops the server's kernel from sending, and the server's send buffer fills too. The next `sendall` on the non-blocking socket can write only part of its data and raises `BlockingIOError` (Python's `sendall` on a non-blocking socket gives up when the kernel buffer is full), crashing the loop — or, had the socket been blocking, `sendall` would block for ever and every other client would stall.

(b) Keep a per-connection output buffer. When data arrive, append the reply to that buffer instead of sending it, and try `conn.send(outbuf)` once, removing however many bytes it accepted; if bytes remain, register the socket for `EVENT_READ | EVENT_WRITE`. When the selector reports the socket writable, `send` more, and when the buffer empties, go back to `EVENT_READ` only. To bound memory, stop reading from (unregister `EVENT_READ` for) a connection whose output buffer exceeds a limit, so a client that does not read is eventually throttled by its own flow control. With these changes, every socket operation the loop performs either transfers some bytes immediately or returns `BlockingIOError` without waiting, so each iteration of the loop does a bounded amount of work per ready socket and returns to `select`; a slow or malicious client can only delay its own data, never the loop.
:::
:::
