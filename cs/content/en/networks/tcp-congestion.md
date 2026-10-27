In October 1986 the link between the Lawrence Berkeley Laboratory and the University of California at Berkeley — two sites 400 yards apart, connected through three network hops — suddenly carried data at 40 bits per second instead of its usual 32 kilobits per second: a factor of nearly a thousand. Nothing was broken. Every host was obeying the TCP specification of the time, which told it to retransmit a segment when its timer expired and to send as much as the receiver allowed. As the network filled up, queues grew, segments were delayed past their timers, hosts retransmitted them, the retransmissions filled the queues further, and soon the links were busy carrying copies of segments that had already arrived or would be dropped. This was **congestion collapse**, and the internet suffered a series of them that year.

Van Jacobson's response, published in 1988, changed TCP from a protocol that only avoided overrunning the *receiver* to one that also avoids overrunning the *network*, using nothing but the arrival and loss of its own segments as evidence. The algorithms he introduced, refined over almost four decades, still govern most of the traffic on the internet. They also solve a second problem without anyone coordinating it: they share a bottleneck link roughly fairly between competing flows.

This chapter studies TCP as defined in RFC 9293 (2022): its segments, its connection setup and teardown and the state machine that governs them, its round-trip time estimation, and its **flow control**. Then it turns to **congestion control**: the slow start, congestion avoidance and fast recovery of TCP Reno (RFC 5681), why additive increase and multiplicative decrease converge to a fair share, the throughput that results, and the modern algorithms CUBIC and BBR. It builds on the sliding-window protocols of [[networks/reliable-transport]].

## The TCP connection

TCP provides a reliable, ordered, full-duplex byte stream between two sockets, with flow and congestion control. It is **connection-oriented**: the two ends exchange segments to set up state — sequence numbers, buffer sizes, options — before data flow, and the connection exists only in the two end hosts. Routers know nothing of it.

::: definition The TCP segment {#def-segment}
A TCP segment has a header of 20 to 60 bytes followed by data. In order, the fields are:

| field | bits | meaning |
|---|---|---|
| source port, destination port | 16 + 16 | demultiplexing, as in UDP |
| sequence number | 32 | number of the first data byte of this segment (bytes are numbered) |
| acknowledgement number | 32 | if `ACK` is set: the next byte the sender of this segment expects to receive |
| data offset | 4 | header length in 32-bit words (5 to 15) |
| reserved | 4 | must be zero |
| flags | 8 | `CWR`, `ECE` (congestion notification), `URG`, `ACK`, `PSH`, `RST` (reset), `SYN` (synchronise sequence numbers), `FIN` (no more data from sender) |
| window | 16 | number of bytes, beyond the acknowledged one, the sender of this segment is willing to receive (scaled by the window-scale option) |
| checksum | 16 | Internet checksum over a pseudo-header, the header and the data |
| urgent pointer | 16 | rarely used |
| options | 0–320 | maximum segment size (MSS), window scale, selective acknowledgements (SACK), timestamps |

A `SYN` and a `FIN` each occupy one sequence number, as if they were a byte of data, so that they too are acknowledged reliably.
:::

The **maximum segment size** (MSS) is the largest amount of data a host will put in one segment; it is announced in the `SYN` and is normally the link MTU minus the IP and TCP headers — $1500 - 20 - 20 = 1460$ bytes on Ethernet. Acknowledgements are **cumulative**: acknowledgement number $a$ means "I have received every byte before $a$". A receiver that gets a segment beyond a gap keeps it (unlike go-back-N) but can only repeat its cumulative acknowledgement — a **duplicate ACK** — unless SACK is in use.

### Setting up and tearing down

::: algorithm Three-way handshake {#alg-handshake}
1. The client chooses an **initial sequence number** (ISN) $x$ and sends a segment with `SYN` set and sequence number $x$, with its options (MSS, window scale, SACK permitted, timestamps).
2. The server, if a socket is listening on that port, chooses its own ISN $y$ and replies with `SYN` and `ACK` set, sequence number $y$ and acknowledgement number $x + 1$, with its options.
3. The client replies with `ACK` set, sequence number $x + 1$ and acknowledgement number $y + 1$; this segment may already carry data. Both sides are now `ESTABLISHED`.
:::

Why three messages, and why random initial sequence numbers? Each side must learn the other's starting number and know that the other has learned its own: two `SYN`s and two `ACK`s, with the server's `SYN` and `ACK` combined into one segment. Sequence numbers start at an unpredictable value (RFC 6528 derives them from a secret hash of the connection's addresses and ports plus a clock), for two reasons: segments from an old connection with the same ports are unlikely to fall into the new connection's window, and an off-path attacker who cannot see the traffic cannot guess the numbers needed to inject data or forge a reset into someone else's connection. Early TCP implementations used predictable ISNs, which made exactly such blind spoofing attacks possible.

Closing is done separately in each direction, because a TCP connection is two byte streams. A side that has finished sending sends a `FIN`, which the other acknowledges; the other direction stays open until that side sends its own `FIN` — the half-close that `shutdown(SHUT_WR)` performs ([[networks/sockets]]). A `RST` segment aborts a connection immediately, and is also the reply to a segment for a port where nothing listens ([[networks/sockets#ex-refused]]).

::: definition TCP connection states {#def-states}
A TCP endpoint is in one of eleven states (RFC 9293, §3.3.2): `CLOSED`; `LISTEN` (a server waiting for `SYN`s); `SYN-SENT` and `SYN-RECEIVED` (during the handshake); `ESTABLISHED`; `FIN-WAIT-1`, `FIN-WAIT-2`, `CLOSING` and `TIME-WAIT` (on the side that closes first, the **active close**); `CLOSE-WAIT` and `LAST-ACK` (on the side that closes second, the **passive close**).
:::

::: widget graph
nodes: CLOSED@3,8; LISTEN@1,6.5; SYN_SENT@5,6.5; SYN_RCVD@1,5; ESTABLISHED@3,4; FIN_WAIT_1@1,2.5; CLOSE_WAIT@5,2.5; FIN_WAIT_2@0,1; CLOSING@2,1; LAST_ACK@5,1; TIME_WAIT@1,-0.5
edges: CLOSED>LISTEN; CLOSED>SYN_SENT; LISTEN>SYN_RCVD; SYN_SENT>SYN_RCVD; SYN_SENT>ESTABLISHED; SYN_RCVD>ESTABLISHED; ESTABLISHED>FIN_WAIT_1; ESTABLISHED>CLOSE_WAIT; FIN_WAIT_1>FIN_WAIT_2; FIN_WAIT_1>CLOSING; FIN_WAIT_1>TIME_WAIT; FIN_WAIT_2>TIME_WAIT; CLOSING>TIME_WAIT; CLOSE_WAIT>LAST_ACK; LAST_ACK>CLOSED; TIME_WAIT>CLOSED
algorithm: bfs
start: CLOSED
caption: The main transitions of the TCP state machine ([[#def-states]]). A server goes CLOSED → LISTEN (`listen`) → SYN_RCVD (receives `SYN`, sends `SYN`+`ACK`) → ESTABLISHED (receives `ACK`); a client goes CLOSED → SYN_SENT (`connect`, sends `SYN`) → ESTABLISHED (receives `SYN`+`ACK`, sends `ACK`). The side that closes first takes the left-hand path: FIN_WAIT_1 (sends `FIN`), FIN_WAIT_2 (its `FIN` acknowledged), TIME_WAIT (receives the peer's `FIN`, sends `ACK`) and, after $2\cdot\text{MSL}$, CLOSED; CLOSING handles simultaneous closes. The side that closes second goes ESTABLISHED → CLOSE_WAIT (receives `FIN`) → LAST_ACK (`close`, sends `FIN`) → CLOSED. Step through the breadth-first search to see which states are reachable in how many transitions from CLOSED. Resets and timeouts, which return to CLOSED from almost anywhere, are omitted.
:::

The side that closes first waits in `TIME-WAIT` for twice the **maximum segment lifetime** (MSL; RFC 9293 suggests two minutes, Linux waits 60 seconds in all) before forgetting the connection. Two reasons: its final `ACK` might be lost, in which case the peer will retransmit its `FIN` and must receive the `ACK` again rather than a reset; and old duplicate segments of this connection must die out before a new connection with the same four addresses and ports can start. This is the state we saw with `ss` in [[networks/sockets]].

::: example The kernel's view of a connection {#ex-ss}
On Linux, `ss -ti` shows the state TCP keeps for each connection. Open a connection over the loopback interface, send 10 MB through it, and read off the congestion control algorithm, the window scale, the MSS, the RTT estimate and the retransmission timeout.
::: solution
```python
# ssdemo.py: open a TCP connection on loopback, send data, and show the kernel's view of it
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
    s.sendall(b"x" * 100000)                   # 10 MB in all
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

The connection uses **CUBIC** congestion control (the Linux default; see below). Both ends announced a window scale of $10$, so the 16-bit window field counts units of $2^{10} = 1024$ bytes. The MSS is $65483$ bytes because the loopback interface's MTU is $65536$ (minus IP and TCP headers and the 12-byte timestamp option); on Ethernet it would be $1448$. The smoothed RTT is $0.023$ ms with mean deviation $0.008$ ms, yet the retransmission timeout is $201$ ms, because Linux never sets it below $200$ ms (see [[#alg-rto]]). `bytes_acked` is one more than `bytes_sent` because the `SYN` consumed a sequence number. The 10 MB went out in about 200 segments, since each of the 100 `sendall` calls of 100,000 bytes fits in two segments of up to $65483$ bytes.
:::
:::

### Estimating the round-trip time

TCP retransmits a segment when its **retransmission timer** expires. The timeout must be longer than the round-trip time, which varies with queueing, but not much longer, or recovery is slow. TCP measures the RTT continually and keeps a smoothed average and a measure of its variability.

::: algorithm Retransmission timeout (RFC 6298) {#alg-rto}
Constants $\alpha = 1/8$, $\beta = 1/4$, $K = 4$; clock granularity $G$.

1. Before any measurement, $\text{RTO} \gets 1$ s.
2. On the first RTT measurement $R$: $\text{SRTT} \gets R$, $\text{RTTVAR} \gets R/2$.
3. On each later measurement $R'$:
   $\text{RTTVAR} \gets (1 - \beta)\,\text{RTTVAR} + \beta\,\lvert \text{SRTT} - R' \rvert$, then $\text{SRTT} \gets (1 - \alpha)\,\text{SRTT} + \alpha R'$.
4. Set $\text{RTO} \gets \text{SRTT} + \max(G, K \cdot \text{RTTVAR})$; RFC 6298 says it should then be rounded up to at least 1 s if smaller (Linux uses 200 ms), and may be capped at 60 s or more.
5. When the timer expires, retransmit the earliest unacknowledged segment and double the RTO (**exponential back-off**).
6. **Karn's rule**: do not take RTT measurements from retransmitted segments, because an ACK cannot tell which copy it acknowledges (unless timestamps are used).
:::

$\text{SRTT}$ is an **exponentially weighted moving average**: each sample's weight decays by a factor of $7/8$ per new sample, so it follows changes within a few dozen samples while ignoring noise. Adding four mean deviations makes spurious timeouts rare even when the RTT fluctuates. The back-off in step 5 matters as much as the estimate: when the network is congested, timeouts space themselves out exponentially rather than adding to the load — precisely what the hosts of 1986 did not do.

::: example Updating the timeout {#ex-rto}
The first RTT sample is $100$ ms; the next three are $120$, $80$ and $200$ ms. Compute SRTT, RTTVAR and the RTO (ignoring the minimum and $G$) after each sample.
::: solution
| sample $R$ | RTTVAR | SRTT | RTO $= \text{SRTT} + 4\,\text{RTTVAR}$ |
|---|---|---|---|
| $100$ (first) | $50$ | $100$ | $300$ |
| $120$ | $\tfrac34 \cdot 50 + \tfrac14 \cdot 20 = 42.5$ | $\tfrac78 \cdot 100 + \tfrac18 \cdot 120 = 102.5$ | $272.5$ |
| $80$ | $\tfrac34 \cdot 42.5 + \tfrac14 \cdot 22.5 = 37.5$ | $\tfrac78 \cdot 102.5 + \tfrac18 \cdot 80 = 99.6875$ | $249.6875$ |
| $200$ | $\tfrac34 \cdot 37.5 + \tfrac14 \cdot 100.3125 \approx 53.20$ | $\tfrac78 \cdot 99.6875 + \tfrac18 \cdot 200 \approx 112.23$ | $\approx 325.04$ |

Each RTTVAR update uses the *previous* SRTT, as the algorithm specifies. The sudden $200$ ms sample moves SRTT by only $12.5$ ms but raises RTTVAR by half, so the RTO rises faster than the average — a delay spike makes TCP more cautious. With RFC 6298's minimum, all four RTOs would be rounded up to $1$ s.
:::
:::

### Flow control

The receiving TCP stores arriving bytes in a **receive buffer** until the application reads them. If the application reads slowly, a fast sender could overflow it. **Flow control** prevents this.

::: proposition Flow control {#prop-flow}
Let the receiver have a buffer of $B$ bytes, and let it advertise in every segment the **receive window** $\text{rwnd} = B - (\text{LastByteRcvd} - \text{LastByteRead})$, the free space in its buffer. If the sender keeps $\text{LastByteSent} - \text{LastByteAcked} \le \text{rwnd}$, using the most recent window it has received, the receive buffer never overflows.
:::

::: proof
Consider the advertisement made when the receiver had received up to byte $r_0$ and the application had read up to $\ell_0$; it promised room for $\text{rwnd} = B - (r_0 - \ell_0)$ bytes beyond $r_0$, and it acknowledged everything up to $r_0$. The sender, on receiving it, has $\text{LastByteAcked} = r_0$, so it may send bytes up to $r_0 + \text{rwnd} = B + \ell_0$. Later the application can only have read more, $\ell \ge \ell_0$, so the buffer holds at most $(B + \ell_0) - \ell \le B$ bytes. Advertisements can be reordered or lost, but a sender that uses the window from the segment with the newest acknowledgement only ever uses a promise that is still valid — provided the receiver never **shrinks** the window, that is, never takes back space it has offered, which RFC 9293 strongly discourages for this reason.
:::

When the window falls to zero the sender stops, and periodically sends a one-byte **window probe** so that it learns when space opens up (the reopening advertisement might otherwise be lost and both sides would wait for ever). Note that the window field is 16 bits; on paths with large bandwidth–delay products the **window scale** option (RFC 7323) multiplies it by $2^s$ for $0 \le s \le 14$, so windows up to about 1 GiB are possible ([[networks/network-principles#ex-lfn]]).

::: quiz
A client has sent bytes up to sequence number 9000 and has received an acknowledgement number of 6001 with a window of 4000. What is the highest sequence number of a byte the client may now send?
- [ ] 9000: it has already reached its limit.
- [x] 10000
- [ ] 13000
- [ ] 10001
::: solution
The acknowledgement says the receiver has every byte up to 6000, so $\text{LastByteAcked} = 6000$, and it has room for $4000$ bytes after that: bytes $6001$ to $10000$. The client has sent up to $9000$, so it may send another $1000$ bytes, up to byte $10000$ — provided its congestion window (below) also allows it.
:::
:::

## Congestion control

Flow control protects the receiver. Nothing in it protects the routers in between. A **congestion control** algorithm decides how fast to send so as to use the bottleneck link well without overloading it, and to share it with other flows.

The costs of congestion are easy to list. As the arrival rate at a router approaches the link's capacity, queueing delay grows without bound ([[networks/network-principles#thm-mm1]]). When buffers fill, packets are dropped, and the senders retransmit them — so the link carries both original data and retransmissions, and **goodput** (useful data delivered) falls below the throughput. A packet dropped at its last router wasted the capacity of every link it crossed before. If senders also retransmit packets that were merely delayed, goodput can fall almost to zero: congestion collapse.

There are two broad approaches. In **network-assisted** congestion control, routers tell senders about congestion explicitly: with **explicit congestion notification** (ECN, RFC 3168), a router whose queue is building marks packets (in two bits of the IP header) instead of dropping them, the receiver echoes the mark in the TCP `ECE` flag, and the sender reacts as if a packet had been lost. In **end-to-end** congestion control, the network says nothing, and senders infer congestion from what they observe: loss (timeouts and duplicate ACKs) or increasing delay. TCP was designed for the end-to-end approach, and it remains the default.

::: definition Congestion window {#def-cwnd}
A TCP sender keeps a **congestion window** $\text{cwnd}$, in bytes, and a **slow-start threshold** $\text{ssthresh}$. The amount of unacknowledged data it may have outstanding is

$$
\text{LastByteSent} - \text{LastByteAcked} \le \min(\text{cwnd}, \text{rwnd}).
$$

Since roughly one window is sent per round trip, the sending rate is approximately $\text{cwnd}/\text{RTT}$ bytes per second. TCP's acknowledgements arrive at the rate at which the bottleneck delivers data, so a sender that sends a new segment for each acknowledgement is **self-clocking**: it sends at the bottleneck's rate without measuring it.
:::

### TCP Reno

::: algorithm TCP Reno congestion control (RFC 5681) {#alg-reno}
Let SMSS be the sender's maximum segment size.

1. **Initially**: $\text{cwnd} \gets$ a small initial window (RFC 5681 allows up to about 4 segments; RFC 6928's experimental 10 segments is common in practice), and $\text{ssthresh} \gets$ a large value.
2. **Slow start** (while $\text{cwnd} < \text{ssthresh}$): for each new acknowledgement, $\text{cwnd} \gets \text{cwnd} + \text{SMSS}$. This doubles the window every round trip.
3. **Congestion avoidance** (while $\text{cwnd} \ge \text{ssthresh}$): for each new acknowledgement, $\text{cwnd} \gets \text{cwnd} + \text{SMSS}^2/\text{cwnd}$. This adds about one SMSS per round trip.
4. **Fast retransmit and fast recovery**: on the third duplicate acknowledgement, set $\text{ssthresh} \gets \max(\text{FlightSize}/2, 2\,\text{SMSS})$, where FlightSize is the amount of outstanding data, retransmit the missing segment, and set $\text{cwnd} \gets \text{ssthresh} + 3\,\text{SMSS}$ (three segments have left the network). For each further duplicate ACK, add SMSS to cwnd and send a new segment if allowed. When a new acknowledgement arrives, set $\text{cwnd} \gets \text{ssthresh}$ and continue in congestion avoidance. (NewReno, RFC 6582, refines this for several losses in one window.)
5. **Timeout**: set $\text{ssthresh} \gets \max(\text{FlightSize}/2, 2\,\text{SMSS})$, $\text{cwnd} \gets 1\,\text{SMSS}$, retransmit, and enter slow start.
:::

The logic is that the two loss signals mean different things. Three duplicate ACKs mean that later segments are still getting through — the network is congested but working — so TCP halves its window and carries on. A timeout means that nothing is getting through, so TCP starts again from one segment. "Slow start" is a historical misnomer: compared with sending a whole receive window at once, as TCP did before 1988, it is slow; compared with congestion avoidance it is fast, exponential growth, which finds the available capacity in $O(\log W)$ round trips.

```python
# reno.py: TCP Reno's congestion window, one value per round trip (in segments)
def reno(rounds, capacity, ssthresh=16, timeout_at=()):
    cwnd, trace = 1, []
    for t in range(rounds):
        trace.append((t, cwnd))
        if t in timeout_at:                  # retransmission timeout: back to 1
            ssthresh, cwnd = max(cwnd // 2, 2), 1
        elif cwnd > capacity:                # a loss, detected by 3 duplicate ACKs
            ssthresh = max(cwnd // 2, 2)
            cwnd = ssthresh                  # fast recovery: halve, skip slow start
        elif cwnd < ssthresh:
            cwnd = min(2 * cwnd, ssthresh)   # slow start: double each RTT ...
        else:                                # ... but not beyond ssthresh
            cwnd += 1                        # congestion avoidance: +1 MSS per RTT
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
labels: \text{capacity (24 segments)}
points: 0,1; 1,2; 2,4; 3,8; 4,16; 5,17; 6,18; 7,19; 8,20; 9,21; 10,22; 11,23; 12,24; 13,25; 14,12; 15,13; 16,14; 17,15; 18,16; 19,17; 20,18; 21,19; 22,20; 23,21; 24,22; 25,23; 26,24; 27,25; 28,12; 29,13; 30,14; 31,1; 32,2; 33,4; 34,7; 35,8; 36,9; 37,10; 38,11; 39,12
caption: The congestion window of TCP Reno, in segments, at the start of each round trip, as computed by `reno.py`: slow start from 1 to ssthresh = 16, congestion avoidance until the window exceeds the 24 segments that the path (pipe plus router buffer) can hold, a loss detected by three duplicate ACKs that halves the window to 12, the famous **sawtooth**, and a timeout in round 30 that sends the window back to 1, followed by slow start up to the new ssthresh of 7. Notice that after a fast retransmit the window restarts from half, without slow start; and that the sawtooth's average, about three-quarters of its peak, is what [[#prop-mathis]] turns into a throughput.
:::

::: example A Reno trace {#ex-reno}
A Reno connection with SMSS $= 1$ segment starts with $\text{cwnd} = 1$ and $\text{ssthresh} = 16$. Using the round-by-round model of `reno.py`, find the window in each of the first 16 rounds if the path holds 24 segments, and explain each change.
::: solution
From the output above: rounds $0$–$4$, slow start: $1, 2, 4, 8, 16$, doubling each RTT. At $16 = \text{ssthresh}$, congestion avoidance begins: $17, 18, \dots, 25$ in rounds $5$–$13$, one segment per RTT. In round $13$ the window of $25$ exceeds the $24$ segments the path can hold; a segment is dropped, three duplicate ACKs arrive, and Reno sets $\text{ssthresh} = \lfloor 25/2 \rfloor = 12$ and $\text{cwnd} = 12$ (after fast recovery). Rounds $14$, $15$: $12$, $13$ — linear growth again. (The model rounds the halving down and ignores the brief inflation of cwnd during fast recovery.) The window spends most of its time between $12$ and $25$; at $24$ segments of $1460$ bytes and an RTT of $50$ ms, its average of about $18.5$ segments is roughly $4.3$ Mb/s.
:::
:::

### Why AIMD is fair

In congestion avoidance Reno uses **additive increase, multiplicative decrease** (AIMD): add a constant per round trip, multiply by a constant less than one on congestion. Why this particular combination? Dah-Ming Chiu and Raj Jain answered in 1989 with a simple model.

::: theorem AIMD converges to fairness {#thm-aimd}
Two flows with rates $x_1, x_2 \ge 0$ share a link of capacity $C$. Time proceeds in rounds. In each round, if $x_1 + x_2 \le C$ both flows add $a > 0$ to their rates; if $x_1 + x_2 > C$ both see congestion and multiply their rates by $b$, where $0 < b < 1$. Then the difference $x_1 - x_2$ is unchanged by every increase and multiplied by $b$ at every decrease, there are infinitely many decreases, and therefore $x_1 - x_2 \to 0$: the rates converge to an equal share, oscillating about $C/2$ each.
:::

::: proof
An increase replaces $(x_1, x_2)$ by $(x_1 + a, x_2 + a)$, which leaves $x_1 - x_2$ unchanged; a decrease replaces it by $(b x_1, b x_2)$, which multiplies $x_1 - x_2$ by $b$. Decreases happen infinitely often: whenever $x_1 + x_2 \le C$ the sum grows by $2a$ per round, so it exceeds $C$ within at most $\lfloor C/(2a) \rfloor + 1$ rounds, and a decrease follows. After $k$ decreases, $\lvert x_1 - x_2 \rvert = b^k \lvert x_1^{(0)} - x_2^{(0)} \rvert \to 0$. Meanwhile the sum $x_1 + x_2$ rises to just above $C$ and falls to about $bC$ in every cycle, so each rate oscillates between about $bC/2$ and $C/2$.
:::

The policies that look equally reasonable fail. With additive increase and *additive* decrease, both rates change by the same amount, and $x_1 - x_2$ never changes: an unfair start stays unfair. With multiplicative increase and multiplicative decrease, both change by the same factor, and the *ratio* $x_1/x_2$ never changes. Only AIMD moves the rates towards equality — at each decrease, the larger flow gives up more. In the plane of $(x_1, x_2)$, an increase moves the point at 45°, parallel to the line of fairness $x_1 = x_2$, and a decrease moves it straight towards the origin, which brings it closer to that line.

```python
# aimd.py: two AIMD flows sharing a link of capacity C (synchronised losses)
def aimd(x1, x2, C, rounds, a=1.0, b=0.5):
    points = [(x1, x2)]
    for _ in range(rounds):
        if x1 + x2 > C:                      # link overloaded: both see a loss
            x1, x2 = b * x1, b * x2          # multiplicative decrease
        else:
            x1, x2 = x1 + a, x2 + a          # additive increase
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

(The last two lines of output are omitted.) The gap halves at each loss, exactly as [[#thm-aimd]] predicts.

::: widget plot
f: x; 100 - x
x: 0, 100
y: 0, 100
equal: true
labels: \text{fair: } x_2 = x_1; \text{full: } x_1 + x_2 = 100
points: 70.00,10.00; 81.00,21.00; 40.50,10.50; 65.50,35.50; 32.75,17.75; 57.75,42.75; 28.88,21.38; 53.88,46.38; 26.94,23.19; 51.94,48.19; 25.97,24.09; 50.97,49.09; 25.48,24.55
caption: Two AIMD flows in the $(x_1, x_2)$ plane, computed by `aimd.py`: starting at $(70, 10)$, each round adds $1$ to both rates (a 45° step), and when the total exceeds the capacity $C = 100$ both halve (a jump towards the origin). The marked points are the start and the rates just before and just after each loss. Notice how each jump towards the origin lands closer to the fairness line, so that the zig-zag converges to the point where the two lines cross — full use of the link, shared equally.
:::

Real flows do not see synchronised losses, have different round-trip times, and do not start together, so real TCP fairness is approximate. One systematic effect is worth knowing: a Reno flow adds one segment per *round trip*, so a flow with twice the RTT increases its window half as fast and also turns its window into rate half as fast. Under the assumptions of the next proposition its throughput is inversely proportional to its RTT — distant flows get less.

::: definition Jain's fairness index {#def-jain}
For $n$ flows with throughputs $x_1, \dots, x_n$, **Jain's fairness index** is $J = \left(\sum_i x_i\right)^2 / \left(n \sum_i x_i^2\right)$. It ranges from $1/n$ (one flow gets everything) to $1$ (all equal), and $J = k/n$ when $k$ flows share equally and the rest get nothing.
:::

### The throughput of a Reno flow

::: proposition The square-root formula {#prop-mathis}
Suppose a TCP flow in congestion avoidance sees exactly one loss each time its window reaches $W$ segments, has constant round-trip time $\text{RTT}$, and that this happens periodically, so that a fraction $p$ of its segments are lost. Then its average throughput is

$$
\text{throughput} = \frac{\text{MSS}}{\text{RTT}} \sqrt{\frac{3}{2p}} \approx \frac{1.22 \cdot \text{MSS}}{\text{RTT}\sqrt{p}}.
$$ {#eq-mathis}
:::

::: proof
After each loss the window is halved to $W/2$ and then grows by one segment per RTT, reaching $W$ after $W/2$ round trips, when the next loss occurs. During this cycle the window takes the values $W/2, W/2 + 1, \dots, W$, so the flow sends about $\tfrac{W}{2} \cdot \tfrac{3W}{4} = \tfrac{3W^2}{8}$ segments in $W/2$ round trips (treating the window as growing continuously). One of these is lost, so $p = 8/(3W^2)$, that is $W = \sqrt{8/(3p)}$. The average window is $3W/4$, and the average throughput is $\tfrac{3W}{4} \cdot \tfrac{\text{MSS}}{\text{RTT}} = \tfrac{3}{4}\sqrt{\tfrac{8}{3p}}\,\tfrac{\text{MSS}}{\text{RTT}} = \sqrt{\tfrac{3}{2p}}\,\tfrac{\text{MSS}}{\text{RTT}}$.
:::

The model is crude — it ignores timeouts, slow start and the receive window — but measurements by Mathis, Semke, Mahdavi and Ott (1997) showed it to be a good approximation for long flows, and it explains three facts. Throughput falls with the RTT, as noted above. It falls only as the square root of the loss rate. And high throughput over long paths needs absurdly low loss rates.

::: example Ten gigabits across an ocean {#ex-mathis}
A Reno flow has $\text{MSS} = 1460$ bytes and $\text{RTT} = 100$ ms. (a) What is its throughput at a loss rate of $p = 10^{-4}$? (b) What loss rate would let it reach 10 Gb/s?
::: solution
(a) $\text{MSS}/\text{RTT} = 11680\ \text{bits}/0.1\ \text{s} = 116.8$ kb/s, and $\sqrt{3/(2 \times 10^{-4})} = \sqrt{15000} \approx 122.5$, giving about $14.3$ Mb/s.

(b) Solve [[#eq-mathis]] for $p$: $p = \tfrac32 \left(\tfrac{\text{MSS}}{\text{RTT} \cdot \text{throughput}}\right)^2 = 1.5 \times \left(\tfrac{11680}{0.1 \times 10^{10}}\right)^2 \approx 2 \times 10^{-10}$: at most one loss in five billion segments, which is below the bit error rate of many links. The average window would be about $85{,}600$ segments — the bandwidth–delay product — and the peak $W = \sqrt{8/(3p)} \approx 114{,}000$; after a loss Reno would need $W/2 \approx 57{,}000$ round trips, over an hour and a half, to grow back. Reno cannot use such paths, which is why high-speed algorithms such as CUBIC were designed.
:::
:::

## Modern congestion control

### CUBIC

CUBIC (Ha, Rhee and Xu, 2008; RFC 9438, 2023, replacing RFC 8312) keeps multiplicative decrease but replaces Reno's linear growth with a cubic function of the *time* since the last loss, independent of the RTT. Let $W_\text{max}$ be the window just before the last reduction. After a loss CUBIC multiplies the window by $\beta = 0.7$ and then sets it, at time $t$ after the loss, to

$$
W(t) = C\,(t - K)^3 + W_\text{max}, \qquad K = \sqrt[3]{\frac{W_\text{max}(1 - \beta)}{C}},
$$ {#eq-cubic}

with $C = 0.4$, windows in segments and $t$ in seconds. $K$ is the time at which the window returns to $W_\text{max}$: $W(0) = \beta W_\text{max}$ and $W(K) = W_\text{max}$. The curve is **concave** before $K$ — fast growth at first, slowing as it approaches the level where the last loss happened — and **convex** after it, probing faster and faster for new capacity once it is clear the old limit has gone. Because growth depends on time rather than on round trips, flows with different RTTs grow equally fast, which reduces RTT unfairness. CUBIC also computes the window that Reno would have, and never uses a smaller one (its "Reno-friendly region"), so it is no less aggressive than Reno on short-RTT paths. As of 2026 CUBIC is the default congestion control algorithm in Linux (since 2006), Windows and macOS — the `ss` output in [[#ex-ss]] shows it at work.

::: widget plot
f: 0.4*(x - cbrt(W*(1 - 0.7)/0.4))^3 + W; W; 0.7*W
x: 0, 12
y: 0, 200
sliders: W=100:10:150:5
labels: W(t); W_{\max}; \beta W_{\max}
caption: The CUBIC window ([[#eq-cubic]]) in segments against the time $t = x$ in seconds since a loss, for $W_\text{max} = W$. The window restarts at $0.7\,W_\text{max}$, rises quickly, flattens out near $W_\text{max}$ at $t = K$ (about $4.2$ s for $W_\text{max} = 100$), and then accelerates. Increase $W$: $K$ grows only as the cube root of $W_\text{max}$, so a large window recovers its old level far sooner than Reno, which would need $0.3\,W_\text{max}$ round trips.
:::

### BBR and delay-based control

Loss-based algorithms fill the bottleneck's buffer until it overflows, so a router with a large buffer gives every flow through it a large, standing queueing delay — the problem known as **bufferbloat**. And on paths with random, non-congestive losses (common on radio links, [[networks/wireless-mobile]]) they back off unnecessarily. **Delay-based** algorithms react to rising RTT instead; TCP Vegas (Brakmo and Peterson, 1994) was the first, but it loses out to loss-based flows that share its bottleneck, because they keep filling the queue that Vegas is trying to keep empty.

**BBR** (Cardwell, Cheng, Gunn, Hassas Yeganeh and Jacobson, 2016) takes a model-based approach. A path has, at any time, a **bottleneck bandwidth** $\text{BtlBw}$ and a **round-trip propagation time** $\text{RTprop}$, and the ideal operating point sends at rate $\text{BtlBw}$ with exactly $\text{BtlBw} \times \text{RTprop}$ — one bandwidth–delay product — in flight: the pipe full, the queue empty. BBR estimates $\text{BtlBw}$ as the maximum delivery rate measured over the last several round trips and $\text{RTprop}$ as the minimum RTT over the last ten seconds; it **paces** its packets at its bandwidth estimate rather than sending in bursts, caps the data in flight at a small multiple of the estimated bandwidth–delay product, and periodically probes — sending at 1.25 times the estimate for one round trip, then 0.75 times to drain any queue it created — to discover more bandwidth, and occasionally cuts its window drastically for a fraction of a second to re-measure $\text{RTprop}$. It does not treat loss as its main congestion signal. BBR's original version could be unfair to loss-based flows and caused heavy loss in shallow buffers; later versions add responses to loss and ECN, and as of 2026 BBR is still being standardised in the IETF. It is widely used by large content providers.

Two network-assisted developments complement these algorithms. **Active queue management** in routers — such as CoDel (RFC 8289) — drops or ECN-marks packets early, when a queue has stayed long for a while, instead of waiting for the buffer to fill. And **L4S** (RFC 9330–9332, 2023) defines a separate low-latency service in which senders respond to frequent ECN marks with small, proportional reductions, keeping queues of a millisecond or less.

::: warning Packet loss is not always congestion
Loss-based congestion control assumes that a lost packet means a full queue somewhere. On a wired path that is nearly always true. On a wireless link a packet can be lost to interference or fading with no congestion at all, and a Reno or CUBIC sender halves its window anyway; by [[#prop-mathis]], a loss rate of 1% caps a flow at about $12\,\text{MSS}/\text{RTT}$ no matter how fast the link is. The opposite error also occurs: a router with a huge buffer may lose nothing while adding a second of delay. Link-layer retransmission ([[networks/wireless-mobile]]), ECN and delay-aware algorithms like BBR all address the gap between "a packet was lost" and "the network is congested".
:::

### Attacks on TCP and their defences

TCP's state and its trust in the segments it receives expose it to some classic attacks, each now met by standard defences. A **SYN flood** sends many `SYN`s with forged source addresses; each makes the server allocate state for a half-open connection that will never complete, until the backlog is full and real clients are refused. The defence, **SYN cookies** (D. J. Bernstein, 1996; described in RFC 4987), keeps no state for half-open connections: the server encodes what it needs into its own initial sequence number, as a keyed hash of the connection's addresses and ports and a timestamp, and reconstructs it when the final `ACK` returns that number plus one. **Blind injection** of data or resets into an existing connection requires guessing sequence numbers within the receiver's window; random initial sequence numbers make this hard, and RFC 5961 tightens how strictly an endpoint checks that a `RST` or `SYN` really belongs to the current window. None of this authenticates the data: protection against an attacker *on* the path needs TLS or QUIC encryption, which also prevents middleboxes from tampering with transport headers.

::: history
TCP was specified by Jon Postel in RFC 793 (September 1981), from the design of Cerf and Kahn; it was consolidated with four decades of corrections and extensions as RFC 9293 in 2022. After the congestion collapses of 1986, Van Jacobson, working with Michael Karels at Berkeley, added slow start, congestion avoidance, fast retransmit and improved RTT estimation (with exponential back-off and Karn and Partridge's 1987 rule) to 4.3BSD; his paper "Congestion avoidance and control" (SIGCOMM 1988) is one of the most influential in networking. K. K. Ramakrishnan and Raj Jain's DECbit scheme (1988) pioneered router-assisted congestion signals, the ancestor of ECN, and Dah-Ming Chiu and Raj Jain's 1989 analysis explained why AIMD converges to fairness. Fast recovery appeared in the 4.3BSD "Reno" release of 1990, which gave the algorithm its name. Sally Floyd and Jacobson's Random Early Detection (1993) began active queue management; Matthew Mathis and colleagues published the square-root formula in 1997; Sangtae Ha, Injong Rhee and Lisong Xu's CUBIC appeared in 2008 and Neal Cardwell and colleagues' BBR in 2016.
:::

## Where this leads

TCP's congestion control meets wireless links in [[networks/wireless-mobile]], where losses are not always congestion. The network layer that TCP's segments travel through — IP, its addresses and its ECN bits — is next, in [[networks/network-layer]]. QUIC, which reimplements TCP's reliability and congestion control (usually CUBIC or BBR) in user space over UDP, appeared in [[networks/application-layer]]. The control-theoretic view of congestion control as a distributed optimisation of network utility belongs to advanced courses; the fairness and convergence arguments of [[#thm-aimd]] reappear in distributed resource allocation in [[distributed-systems]].

::: summary
- TCP is a connection-oriented, reliable byte stream; its header carries 32-bit byte **sequence** and cumulative **acknowledgement** numbers, flags and a receive **window** ([[#def-segment]]).
- Connections open with a **three-way handshake** using random initial sequence numbers ([[#alg-handshake]]) and close separately in each direction; the active closer waits in **TIME-WAIT** for $2 \cdot \text{MSL}$ ([[#def-states]]).
- The **retransmission timeout** is $\text{SRTT} + 4\,\text{RTTVAR}$, from exponentially weighted averages, with exponential back-off and Karn's rule ([[#alg-rto]]). **Flow control** keeps unacknowledged data within the receive window ([[#prop-flow]]).
- **Congestion control** limits the sender to $\min(\text{cwnd}, \text{rwnd})$; Reno uses **slow start**, **congestion avoidance** (AIMD), **fast retransmit/recovery** on three duplicate ACKs, and a reset to one segment on timeout ([[#alg-reno]]).
- **AIMD** converges to a fair share because increases preserve the difference between flows and decreases shrink it ([[#thm-aimd]]); AIAD and MIMD do not.
- Reno's throughput is about $1.22\,\text{MSS}/(\text{RTT}\sqrt{p})$ ([[#prop-mathis]]), unfair to long RTTs and unable to fill fast long paths. **CUBIC** grows as a cubic function of time since the last loss; **BBR** paces at a measured bottleneck bandwidth, with about one bandwidth–delay product in flight.
:::

## Exercises

::: exercise Sequence and acknowledgement numbers {level=1 check="1501"}
A client's initial sequence number is $1000$. After the handshake it sends one segment with $500$ bytes of data. What sequence number does that segment carry, and what acknowledgement number does the server send in reply? (Enter the acknowledgement number.)
::: solution
The `SYN` uses sequence number $1000$, so the first data byte is $1001$: the segment carries bytes $1001$–$1500$ and sequence number $1001$. The server acknowledges with the next byte it expects, $1501$.
:::
:::

::: exercise One RTO update {level=1 check="165"}
TCP has $\text{SRTT} = 100$ ms and $\text{RTTVAR} = 10$ ms when a new sample of $60$ ms arrives. Compute the new RTO according to [[#alg-rto]], ignoring the minimum and the clock granularity. (Enter the RTO in milliseconds.)
::: solution
$\text{RTTVAR} \gets \tfrac34 \cdot 10 + \tfrac14 \cdot \lvert 100 - 60 \rvert = 7.5 + 10 = 17.5$ ms; $\text{SRTT} \gets \tfrac78 \cdot 100 + \tfrac18 \cdot 60 = 87.5 + 7.5 = 95$ ms; $\text{RTO} = 95 + 4 \times 17.5 = 165$ ms. The order matters: computing SRTT first and using the new value in the RTTVAR update would give $\lvert 95 - 60 \rvert = 35$, $\text{RTTVAR} = 16.25$ and an RTO of $160$ ms, which is not what RFC 6298 specifies. A sample well below the average still *raises* the RTO here, because it raises the estimated variability.
:::
:::

::: exercise Slow start {level=1 check="6"}
A TCP connection starts with $\text{cwnd} = 1$ segment and a very large ssthresh, and no losses occur. After how many round trips does its window first reach $64$ segments? (Enter the number of round trips.)
::: solution
The window doubles each round trip: $1, 2, 4, 8, 16, 32, 64$. It reaches $64 = 2^6$ after $6$ round trips. In general reaching $W$ takes $\lceil \log_2 W \rceil$ round trips — slow start is exponential.
:::
:::

::: exercise The square-root formula {level=2 check="14.3"}
Using [[#eq-mathis]], what is the throughput of a Reno flow with MSS 1460 bytes, RTT 100 ms and loss rate $10^{-4}$? By what factor does it change if the RTT halves, and if the loss rate quarters? (Enter the throughput in Mb/s, to one decimal place.)
::: solution
As in [[#ex-mathis]]: $116.8\ \text{kb/s} \times \sqrt{15000} \approx 116.8 \times 122.47\ \text{kb/s} \approx 14.3$ Mb/s. Halving the RTT doubles it (to $28.6$ Mb/s); quartering the loss rate also doubles it, since throughput is proportional to $1/\sqrt{p}$.
:::
:::

::: exercise A fairness index {level=2 check="0.75"}
Four flows share a bottleneck and receive $10$, $10$, $10$ and $30$ Mb/s. Compute Jain's fairness index ([[#def-jain]]). What allocation of the same $60$ Mb/s would give an index of $1$? (Enter the index.)
::: solution
$\sum x_i = 60$, $\sum x_i^2 = 100 + 100 + 100 + 900 = 1200$, so $J = 60^2/(4 \times 1200) = 3600/4800 = 0.75$. The index is $1$ exactly when all flows are equal: $15$ Mb/s each.
:::
:::

::: exercise Reno by hand {level=2 check="7"}
Use the round-by-round model of `reno.py`, in which a round's window is recorded at its start and the reaction to a loss takes effect in the next round. At the start of round $0$ a Reno connection is in congestion avoidance with $\text{cwnd} = 20$ segments, and in round $0$ a loss is detected by three duplicate ACKs. In round $5$ a retransmission timeout occurs. What is the window at the start of round $9$? (Enter the window in segments.)
::: solution
Round $0$: $20$; the loss sets $\text{ssthresh} = 10$ and $\text{cwnd} = 10$. Rounds $1$–$5$ (congestion avoidance): $10, 11, 12, 13, 14$. In round $5$ the timeout sets $\text{ssthresh} = \lfloor 14/2 \rfloor = 7$ and $\text{cwnd} = 1$. Rounds $6$–$9$ (slow start, capped at ssthresh): $1, 2, 4$, then $\min(8, 7) = 7$. So the window at the start of round $9$ is $7$, and congestion avoidance resumes from there: $8$ in round $10$. The timeout cost far more than the triple-duplicate-ACK loss: four round trips to climb back to half the previous window.
:::
:::

::: exercise Why not AIAD or MIMD? {level=3}
In the model of [[#thm-aimd]], suppose instead that both flows use (a) additive increase by $a$ and additive decrease by $d$ (never below zero), or (b) multiplicative increase by a factor $c > 1$ and multiplicative decrease by $b < 1$. Show that in (a) the difference $x_1 - x_2$ is constant as long as neither rate hits zero, and that in (b) the ratio $x_1/x_2$ is constant. What does each imply about two flows that start with rates $(70, 10)$? Finally, show that AIMD also converges to *efficiency*: the sum oscillates between about $bC$ and $C + 2a$.
::: solution
(a) Both rates change by the same amount, $+a$ or $-d$, in every round, so $x_1 - x_2$ is unchanged (until a rate would go below zero and is clamped, which helps the smaller flow only at the extreme). Two flows starting at $(70, 10)$ keep a difference of $60$ for ever: the first gets $60$ more than the second. (b) Both rates are multiplied by the same factor in every round, so $x_1/x_2$ is unchanged: the first flow always gets seven times as much. (AIMD is the combination in which the decrease, but not the increase, depends on the current rate, so it is the larger flow that gives up more.) Efficiency: in AIMD the sum grows by $2a$ per round while it is at most $C$, so the first round in which it exceeds $C$ has a sum in $(C, C + 2a]$; the decrease takes it to $(bC, b(C + 2a)]$. So in the long run the sum oscillates between about $bC$ and $C + 2a$, and the link is used on average at between $b$ and $1$ of its capacity — about $75\%$ for $b = 1/2$ in this model, which is why a router buffer of about one bandwidth–delay product was long recommended for a single Reno flow: it keeps the link busy while the window is below its peak.
:::
:::

::: exercise The CUBIC recovery time {level=3 check="cbrt(75)"}
For CUBIC with $C = 0.4$ and $\beta = 0.7$, compute $K$, the time to return to $W_\text{max}$, when $W_\text{max} = 100$ segments; then compare with Reno, whose window, after halving from $100$, grows by one segment per RTT, for RTTs of $10$ ms and $200$ ms. Prove that $W(0) = \beta W_\text{max}$ and that $W$ is increasing, concave on $[0, K]$ and convex on $[K, \infty)$. (Enter $K$ in seconds.)
::: solution
$K = \sqrt[3]{100 \times 0.3/0.4} = \sqrt[3]{75} \approx 4.22$ s, independent of the RTT. Reno needs $50$ round trips to get from $50$ back to $100$: $0.5$ s at RTT $10$ ms and $10$ s at RTT $200$ ms. So CUBIC is slower than Reno on short paths (which is why it switches to Reno's window when that is larger) and much faster on long ones.

From [[#eq-cubic]], $W(0) = C(-K)^3 + W_\text{max} = -CK^3 + W_\text{max} = -W_\text{max}(1 - \beta) + W_\text{max} = \beta W_\text{max}$. Differentiating, $W'(t) = 3C(t - K)^2 \ge 0$, so $W$ is non-decreasing (strictly increasing except at the single point $t = K$), and $W''(t) = 6C(t - K)$, which is negative for $t < K$ (concave) and positive for $t > K$ (convex).
:::
:::

::: exercise Bandwidth–delay product and buffers {level=3}
A single long-lived Reno flow uses a bottleneck of rate $R$ with propagation round-trip time $\tau$; the bottleneck router has a buffer of $B$ bytes. Assume the window at which loss occurs is $W_\text{max} = R\tau + B$ (the pipe plus the buffer) and that after a loss the window is halved. (a) Show that if $B \ge R\tau$, the bottleneck link is never idle. (b) What is the queueing delay when the window is at its peak, for $R = 1$ Gb/s, $\tau = 50$ ms and $B = R\tau$? (c) Explain how this motivated BBR's choice of keeping about one bandwidth–delay product in flight.
::: solution
(a) The link is busy whenever the amount in flight is at least the pipe's capacity $R\tau$: then a packet is always waiting or being sent. After a loss the window falls to $W_\text{max}/2 = (R\tau + B)/2 \ge R\tau$ when $B \ge R\tau$, and it only grows from there until the next loss; so the window never drops below $R\tau$ and the link never idles. With a smaller buffer, the window spends part of each cycle below $R\tau$, and the link is idle part of the time.

(b) At the peak the queue holds $B = R\tau$ bytes, which takes $B/R = \tau = 50$ ms to drain: the queue doubles the RTT, to $100$ ms. With $B = R\tau = 10^9 \times 0.05 = 5 \times 10^7$ bits $= 6.25$ MB, that is a large buffer — and every flow through this router, including interactive ones, sees up to $50$ ms of extra delay.

(c) A loss-based algorithm must fill the buffer to find the limit, so it trades delay for throughput; a buffer of one bandwidth–delay product gives full throughput but doubles the delay at the peak. Keeping exactly $R\tau$ in flight would give full throughput with an empty queue — the optimal operating point. BBR estimates $R$ (as BtlBw) and $\tau$ (as RTprop) and aims for that point, without needing the buffer to overflow; its periodic probes temporarily put a little more in flight to see whether $R$ has grown.
:::
:::
