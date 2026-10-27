The internet's network layer makes no promises. A packet sent from one host to another may arrive, arrive damaged, arrive twice, arrive after packets sent later, or never arrive at all — and in the last case nobody tells the sender. Yet when you download a file, every byte arrives exactly once, in order, intact. Somewhere between the unreliable network and your program, a protocol turns a lossy channel into a reliable one.

How? The obvious answer — "send each packet, and send it again if it is lost" — hides every difficulty. How does the sender know a packet was lost, when the only evidence is silence? If the receiver's acknowledgement is lost instead, the sender will resend a packet the receiver already has: how does the receiver recognise the duplicate? And waiting for an acknowledgement after every packet would waste almost the whole capacity of a long, fast path ([[networks/network-principles#ex-lfn]]). This chapter answers these questions from first principles. We begin with the transport layer's simplest job, delivering packets to the right process, and the minimal transport protocol that does only that, **UDP**, with its **Internet checksum**. Then we build reliable transfer step by step — acknowledgements, sequence numbers, timers — arriving at the **alternating-bit protocol**, prove it correct, and find out why it is slow. Finally we **pipeline** it, with **go-back-N** and **selective repeat**, and prove how many sequence numbers each needs. TCP, the subject of the next chapter, is a refinement of these designs.

## Multiplexing and UDP

The network layer delivers datagrams to a *host*. Many processes on the host may be communicating at once, so the transport layer's first task is **demultiplexing**: delivering each arriving segment to the right socket ([[networks/sockets#def-socket]]). The sender's side, **multiplexing**, gathers data from many sockets, adds the headers needed for demultiplexing, and passes the segments to the network layer. Port numbers carry the information. A UDP socket is identified by its destination IP address and port alone, so datagrams from many clients to port 53 all reach the one DNS server socket; a TCP connected socket is identified by all four values (source and destination addresses and ports), so each client's connection has its own socket.

::: definition UDP {#def-udp}
The **User Datagram Protocol** (RFC 768, 1980) adds to IP only demultiplexing and optional error detection. Its header is 8 bytes:

| bits 0–15 | bits 16–31 |
|---|---|
| source port | destination port |
| length (header + data, in bytes) | checksum |

The checksum covers a **pseudo-header** — the source and destination IP addresses, a zero byte, the protocol number (17 for UDP) and the UDP length — followed by the UDP header (with the checksum field set to zero) and the data, padded with a zero byte to an even length. Over IPv4 a checksum of zero means "not computed"; over IPv6 the checksum is mandatory (RFC 8200).
:::

UDP provides no connection setup, no retransmission, no ordering and no congestion control. That is its point: an application that needs none of them — a DNS lookup, a stream of voice samples that is useless if late, a new transport protocol built in user space such as QUIC — gets the network's raw service with 8 bytes of overhead and no delay added. The pseudo-header is a layering violation forced by practicality: including the IP addresses in the checksum lets the receiver detect a datagram delivered to the wrong host.

### The Internet checksum

::: definition Internet checksum {#def-checksum}
The **Internet checksum** (RFC 1071) of a sequence of bytes is computed by splitting it into 16-bit big-endian words (padding with a zero byte if the length is odd), adding the words in **one's-complement arithmetic** — ordinary addition in which any carry out of the top bit is added back into the bottom bit (**end-around carry**) — and taking the one's complement (bitwise NOT) of the sum. The sender stores the result in the checksum field. The receiver adds all the words *including* the checksum; the data pass the check if the one's-complement sum is `0xFFFF`, that is, if its complement is $0$.
:::

```python
# checksum.py: the Internet checksum (RFC 1071) of a UDP datagram (RFC 768)
import socket, struct

def internet_checksum(data: bytes) -> int:
    if len(data) % 2:
        data += b"\x00"                          # pad odd lengths with a zero byte
    total = 0
    for (word,) in struct.iter_unpack("!H", data):   # 16-bit big-endian words
        total += word
        total = (total & 0xFFFF) + (total >> 16)     # end-around carry
    return ~total & 0xFFFF                       # one's complement of the sum

def udp_datagram(src, dst, sport, dport, payload):
    length = 8 + len(payload)
    pseudo = socket.inet_aton(src) + socket.inet_aton(dst) + struct.pack("!BBH", 0, 17, length)
    header = struct.pack("!HHHH", sport, dport, length, 0)      # checksum 0 for now
    csum = internet_checksum(pseudo + header + payload)
    if csum == 0:
        csum = 0xFFFF                            # 0 means "no checksum" in UDP over IPv4
    return struct.pack("!HHHH", sport, dport, length, csum) + payload, pseudo

dgram, pseudo = udp_datagram("192.0.2.1", "198.51.100.2", 5000, 7, b"Hi!")
print("datagram:", dgram.hex(" "))
print("checksum: %#06x" % struct.unpack("!H", dgram[6:8]))
print("receiver's check:", hex(internet_checksum(pseudo + dgram)))     # 0 if intact
bad = bytearray(dgram); bad[9] ^= 0x01                                  # flip one bit
print("after a bit flip:", hex(internet_checksum(pseudo + bytes(bad))))
```

```console
$ python3 checksum.py
datagram: 13 88 00 07 00 0b 96 a8 48 69 21
checksum: 0x96a8
receiver's check: 0x0
after a bit flip: 0x1
```

::: example A UDP checksum by hand {#ex-checksum}
Verify the checksum `0x96a8` of the 11-byte datagram above, from 192.0.2.1 port 5000 to 198.51.100.2 port 7 (the echo service), carrying the three bytes `Hi!`.
::: solution
The words summed are:

| part | 16-bit words |
|---|---|
| pseudo-header: source address 192.0.2.1 | `c000` `0201` |
| destination address 198.51.100.2 | `c633` `6402` |
| zero, protocol 17; UDP length 11 | `0011` `000b` |
| UDP header: ports 5000 and 7 | `1388` `0007` |
| length 11; checksum 0 | `000b` `0000` |
| data `H` `i` `!` and a pad byte | `4869` `2100` |

Their ordinary sum is `0x26955`. Folding the carries back in — $\texttt{0x6955} + \texttt{0x2} = \texttt{0x6957}$ — gives the one's-complement sum, and its complement is $\texttt{0xFFFF} - \texttt{0x6957} = \texttt{0x96A8}$. At the receiver, the same words with `96a8` in place of `0000` sum to $\texttt{0x6957} + \texttt{0x96A8} = \texttt{0xFFFF}$, whose complement is $0$: the datagram passes. Flipping the low bit of the byte `i` changes one word by $1$, the sum becomes `0xFFFE`, and the check gives $1$.
:::
:::

Why such an odd-looking sum? Because it has properties that made it cheap on the computers of the 1970s and still do today.

::: proposition Properties of the Internet checksum {#prop-checksum}
Let $S(w_1, \dots, w_n)$ be the one's-complement sum of 16-bit words. Then:

1. $S$ does not depend on the order of the words, so the sum can be computed in any order, in parallel, or incrementally when one word changes (as routers do when they decrement the IPv4 time-to-live).
2. $S$, viewed as an integer, is congruent to $w_1 + \dots + w_n$ modulo $2^{16} - 1$.
3. The checksum detects every error that changes a single bit, and more generally every error confined to one 16-bit word, except a change of that word between `0x0000` and `0xFFFF`.
4. The checksum does not detect the swapping of two 16-bit words.
:::

::: proof
For (2): adding a carry back in replaces a sum $x = 2^{16}c + y$ by $y + c$, and $x - (y + c) = c(2^{16} - 1)$, so each fold preserves the value modulo $2^{16}-1$. Hence the final sum is congruent to the ordinary sum of the words. (One's-complement arithmetic has two representations of zero, `0x0000` and `0xFFFF`; both are $\equiv 0$.) Property (1) follows, because the ordinary sum does not depend on the order. Property (4) follows too: swapping two words leaves the ordinary sum unchanged.

For (3): if one word changes from $w$ to $w'$, the receiver's sum changes by $w' - w$ modulo $2^{16} - 1$. It still passes the check only if $w' \equiv w \pmod{2^{16}-1}$. Since $0 \le w, w' \le 2^{16} - 1$, that happens for $w \ne w'$ only when $\{w, w'\} = \{\texttt{0x0000}, \texttt{0xFFFF}\}$. A single bit flip changes a word by $\pm 2^j$ with $0 \le j \le 15$, which is never $\pm(2^{16}-1)$, so it is always detected.
:::

The Internet checksum is weak by modern standards: it misses reordered words, and roughly one in $2^{16}$ random multi-bit errors. Links therefore use much stronger cyclic redundancy checks ([[networks/link-layer]]), and the checksum is a last line of defence against errors introduced *inside* routers and hosts, where link checks cannot see them — the end-to-end argument of [[networks/network-principles#prop-e2e]] in action.

::: warning A checksum is not a signature
A checksum detects *accidental* corruption. It offers no protection against an adversary, who can modify a packet and recompute the checksum (or exploit property 4 to change data without changing it). Integrity against attackers needs a **message authentication code** keyed with a secret, as TLS and QUIC provide ([[networks/application-layer]]); this is a cryptographic primitive ([[cryptography]]), not an error-detecting code.
:::

## Building a reliable channel

We now design a protocol that provides a **reliable data transfer** service: the sending application hands messages to the protocol, and the receiving protocol delivers them to the receiving application exactly once each, uncorrupted and in the order sent. The protocol runs over an **unreliable channel** — a model of the network — which may do the following to each packet:

- **corrupt** it: we assume that corruption is always detected by a checksum (a corrupted packet is as good as lost);
- **lose** it;
- but *not* reorder packets: the channel is **FIFO**. We relax this at the end of the chapter.

A protocol is a pair of programs, a **sender** and a **receiver**, each a state machine reacting to events: a message from the application, a packet from the channel, a timer expiring. We build them up in three steps.

**Step 1: acknowledgements.** If the channel only corrupted packets, the receiver could reply to each packet with an **acknowledgement** (ACK) if it passed the checksum, or a **negative acknowledgement** (NAK) if not; the sender would retransmit after a NAK. Protocols based on this are called **ARQ** (automatic repeat request) protocols.

**Step 2: sequence numbers.** But the ACK or NAK may itself be corrupted. If the sender, unsure, retransmits, the receiver may get a second copy of a packet it has already delivered — and it cannot tell a duplicate from a new packet with the same content. The fix is a **sequence number** in each packet. For a sender that waits for each packet to be acknowledged before sending the next, a single bit suffices: the receiver expects the packet after the one it last accepted, and a packet with the other bit is a duplicate. With sequence numbers, NAKs become unnecessary: the receiver just acknowledges the last packet it accepted, *with its number*, and an ACK for the previous packet means "not this one".

**Step 3: timers.** If the channel can lose packets, silence is the only evidence of loss. The sender starts a **timer** when it sends a packet and retransmits if no acknowledgement has arrived when the timer expires. Choosing the **timeout** well is hard: too short and the sender retransmits packets that were merely delayed (harmless for correctness, thanks to sequence numbers, but wasteful); too long and recovery is slow. It must be at least a round-trip time. How TCP estimates it is in [[networks/tcp-congestion]].

Put together, these give the classic protocol.

::: algorithm Alternating-bit protocol {#alg-abp}
**Sender**, with a bit $s$, initially $0$:

1. Wait for a message $m$ from the application. Make the packet $(s, m, \text{checksum})$, send it, and start the timer.
2. Wait for one of:
   1. an uncorrupted ACK carrying bit $s$: stop the timer, set $s \gets 1 - s$, go to step 1;
   2. a corrupted ACK, or an ACK carrying $1 - s$: ignore it, keep waiting;
   3. the timer expires: resend the packet $(s, m, \text{checksum})$, restart the timer, keep waiting.

**Receiver**, with an expected bit $e$, initially $0$, on receiving a packet:

1. If it is corrupted, ignore it (or acknowledge bit $1 - e$).
2. If it carries bit $e$: deliver its message to the application, send ACK with bit $e$, and set $e \gets 1 - e$.
3. If it carries bit $1 - e$ (a duplicate): do not deliver it, but send ACK with bit $1 - e$ again — the previous ACK may have been lost.
:::

::: theorem Correctness of the alternating-bit protocol {#thm-abp}
Over FIFO channels (in both directions) that may lose packets and corrupt them detectably, the alternating-bit protocol delivers to the receiving application only messages that the sender was given, each at most once and in order. If, moreover, each packet retransmitted infinitely often is eventually received uncorrupted, then every message is eventually delivered.
:::

::: proof
Number the messages $0, 1, 2, \dots$; message $i$ is sent with bit $i \bmod 2$. Let $m$ be the index of the sender's current message (so $s = m \bmod 2$) and $d$ the number of messages the receiver has delivered (so $e = d \bmod 2$). We show that the following holds at all times:

**Invariant.** Either (A) $d = m$, the receiver has delivered exactly messages $0, \dots, m-1$, every data packet in the forward channel is a copy of message $m - 1$ or $m$, with all copies of $m-1$ ahead of all copies of $m$, and every ACK in the reverse channel carries bit $1 - s$; or (B) $d = m + 1$, the receiver has delivered exactly $0, \dots, m$, every data packet in the forward channel is a copy of $m$, and the ACKs in the reverse channel are some with bit $1 - s$ followed (FIFO) by some with bit $s$.

Initially (A) holds with $m = d = 0$ and empty channels. Consider each event.

- *In (A), the receiver gets a copy of $m - 1$*: it carries bit $(m-1) \bmod 2 = 1 - e$, so the receiver re-ACKs bit $1 - e = 1 - s$. (A) still holds.
- *In (A), the receiver gets a copy of $m$*: it carries bit $e$, so the receiver delivers message $m$ — the correct next message — sends ACK $e = s$, and $d$ becomes $m + 1$. All copies of $m - 1$ were ahead of this packet in the FIFO channel, so they are gone, and only copies of $m$ remain. The ACK with bit $s$ joins the reverse channel behind any with bit $1 - s$. (B) holds.
- *In (B), the receiver gets a copy of $m$*: it carries bit $m \bmod 2 = 1 - e$ (since $e = (m+1) \bmod 2$), a duplicate; the receiver re-ACKs bit $1 - e = s$. (B) holds.
- *The sender gets an ACK with bit $1 - s$*: ignored, nothing changes. (In (A) these are the only ACKs.)
- *In (B), the sender gets an ACK with bit $s$*: it advances to $m + 1$. Now $d = m + 1$ is the new $m$; the forward channel holds copies of the old $m$, now "$m-1$", and the sender's new packets join behind them; the remaining ACKs in the reverse channel carry the old bit $s$, which is the new $1 - s$. (A) holds.
- *Timeouts, losses and corruption* add copies of the current message to the back of the forward channel or remove packets; neither changes which case holds or the ordering properties.

Delivery happens only in the second case, and always delivers message $d$ when $d = m$: so messages are delivered in order, each once. For liveness: in (A), the sender retransmits message $m$ until it is received, which eventually happens; then (B) holds, and the receiver acknowledges every copy, so the sender eventually receives an ACK with bit $s$ and advances.
:::

The proof shows where the FIFO assumption is used: it guarantees that a stale copy of message $m-1$ cannot overtake message $m$ and arrive when the receiver expects message $m + 1$, which has the same bit. On a channel that can reorder packets by arbitrary amounts, no protocol with a bounded set of sequence numbers can be correct; real protocols assume a *maximum packet lifetime* instead, after which old packets are certain to have disappeared.

### The cost of stopping and waiting

The alternating-bit protocol is a **stop-and-wait** protocol: it sends one packet and waits a round trip for its acknowledgement.

::: proposition Utilisation of stop-and-wait {#prop-stopwait}
Over a link of rate $R$ with round-trip time $\text{RTT}$, with packets of $L$ bits, negligible-size ACKs and no losses, a stop-and-wait sender is transmitting for the fraction

$$
U_\text{sender} = \frac{L/R}{\text{RTT} + L/R}
$$ {#eq-utilisation}

of the time, and its throughput is $L / (\text{RTT} + L/R)$.
:::

::: proof
One cycle runs from the moment the sender starts transmitting a packet until the moment it can start the next: $L/R$ to transmit the packet, after which its last bit reaches the receiver $\text{RTT}/2$ later, and the ACK returns $\text{RTT}/2$ after that. The cycle lasts $\text{RTT} + L/R$, of which the sender transmits for $L/R$, delivering $L$ bits.
:::

::: example Stop-and-wait across a continent {#ex-stopwait}
A 1 Gb/s path has an RTT of 30 ms. A stop-and-wait protocol sends 1500-byte packets. What are its utilisation and throughput?
::: solution
$L/R = 12000 / 10^9 = 12$ µs. By [[#eq-utilisation]], $U = 0.012 / 30.012 \approx 0.0004$: the sender transmits 0.04% of the time. The throughput is $12000\ \text{bits} / 30.012\ \text{ms} \approx 400$ kb/s — on a gigabit link. The protocol is correct and useless. The bandwidth–delay product is $10^9 \times 0.03 = 3 \times 10^7$ bits, about 2,500 packets; to use the link, the sender must have that many unacknowledged packets in flight.
:::
:::

## Pipelining

A **pipelined** protocol lets the sender transmit up to $N$ packets before receiving acknowledgements. That requires a range of sequence numbers larger than one bit, buffering at the sender (for packets sent but not yet acknowledged, which may need retransmission) and perhaps at the receiver. There are two basic designs, which differ in how they recover from loss.

Both use a **sliding window**. The sender's sequence numbers fall into four regions: already acknowledged; sent but not yet acknowledged; usable — not yet sent but allowed by the window; and not usable yet. The **window** is the range of $N$ numbers starting at the **base**, the oldest unacknowledged packet. As acknowledgements arrive, the base moves up and the window slides forward.

::: widget plot
f: min(1, x*l/(r + l))
x: 0, 3000
y: 0, 1.05
sliders: l=0.012:0.001:0.12:0.001; r=30:1:200:1
labels: U
caption: Sender utilisation $U = \min(1, N \cdot (L/R) / (\text{RTT} + L/R))$ against the window size $N = x$ in packets ([[#eq-window-util]] below), with transmission time $L/R = l$ and $\text{RTT} = r$, both in milliseconds. The start values are those of [[#ex-stopwait]]: 1500-byte packets on 1 Gb/s, RTT 30 ms. Utilisation grows linearly until the window covers the whole round trip and then saturates; the knee is at the bandwidth–delay product in packets. Increase $r$ and watch the knee move right: long paths need large windows. Increase $l$ (bigger packets or a slower link) and fewer packets suffice.
:::

### Go-back-N

::: algorithm Go-back-N {#alg-gbn}
Sequence numbers are taken modulo $2^k$; the window size is $N$.

**Sender**, with variables $\textit{base}$ and $\textit{next}$, both initially $0$:

1. *Message from the application*: if $\textit{next} < \textit{base} + N$, send packet $\textit{next}$ with the message, start the timer if $\textit{base} = \textit{next}$, and set $\textit{next} \gets \textit{next} + 1$; otherwise refuse (or buffer) the message.
2. *ACK $a$ received* (cumulative: "all packets up to $a$ arrived"): set $\textit{base} \gets a + 1$; stop the timer if $\textit{base} = \textit{next}$, otherwise restart it.
3. *Timeout*: restart the timer and resend all packets $\textit{base}, \dots, \textit{next} - 1$.

**Receiver**, with $\textit{expected}$ initially $0$: on an uncorrupted packet numbered $\textit{expected}$, deliver it, send ACK $\textit{expected}$, and increment $\textit{expected}$; on any other packet, discard it and resend ACK $\textit{expected} - 1$.
:::

The go-back-N receiver is as simple as can be: it keeps no buffer and accepts only the next packet in order. The single timer belongs to the oldest unacknowledged packet. The cost is that one loss throws away all the packets sent after it, which the sender must retransmit even though they arrived.

::: example Go-back-N with a loss {#ex-gbn}
A go-back-N sender with $N = 4$ has packets $0$ to $6$ to send. Packet 2 is lost the first time it is sent; nothing else is lost. Trace the protocol and count the transmissions.
::: solution
| event | sender window after | receiver |
|---|---|---|
| send 0, 1, 2, 3 | $[0, 3]$ | |
| | | gets 0: deliver, ACK 0 |
| | | gets 1: deliver, ACK 1 |
| | | (2 lost) gets 3: discard, ACK 1 |
| ACK 0: base 1, send 4 | $[1, 4]$ | |
| ACK 1: base 2, send 5 | $[2, 5]$ | |
| ACK 1 (duplicate): no change | $[2, 5]$ | gets 4: discard, ACK 1 |
| | | gets 5: discard, ACK 1 |
| timeout: resend 2, 3, 4, 5 | $[2, 5]$ | gets 2, 3, 4, 5: deliver each, ACK 2, 3, 4, 5 |
| ACK 2: base 3, send 6 | $[3, 6]$ | gets 6: deliver, ACK 6 |
| ACKs 3, 4, 5, 6 | done | |

Transmissions: $0$–$5$ once ($6$), then $2$–$5$ again ($4$), then $6$ ($1$): $11$ transmissions for $7$ packets. Packets 3, 4 and 5 crossed the network twice although their first copies arrived intact.
:::
:::

### Selective repeat

::: algorithm Selective repeat {#alg-sr}
Sequence numbers modulo $2^k$; sender and receiver windows of size $N$.

**Sender**: as in go-back-N, may have packets $\textit{base}, \dots, \textit{base} + N - 1$ outstanding, but keeps a separate timer for **each** packet. On the timeout of packet $n$, it resends only packet $n$. On an ACK for packet $n$ (individual, not cumulative), it marks $n$ acknowledged, and if $n = \textit{base}$ it advances $\textit{base}$ to the smallest unacknowledged number.

**Receiver**, with window $[\textit{rbase}, \textit{rbase} + N - 1]$:

1. Packet $n$ in the window: send ACK $n$ and buffer the packet if it is new. If $n = \textit{rbase}$, deliver it and all consecutively numbered buffered packets after it, and advance $\textit{rbase}$ past them.
2. Packet $n$ in $[\textit{rbase} - N, \textit{rbase} - 1]$ (already delivered): send ACK $n$ again — the earlier ACK may have been lost — but do not deliver it.
3. Otherwise ignore the packet.
:::

Selective repeat retransmits only what is lost, at the price of a receiver buffer and per-packet timers. In [[#ex-gbn]] with selective repeat, packets 3, 4 and 5 are buffered by the receiver, only packet 2 is retransmitted on its timeout, and delivery of 2–5 happens together on its arrival: $8$ transmissions instead of $11$.

::: example Too many sequence numbers in the window {#ex-sr-ambiguity}
A selective-repeat protocol uses 2-bit sequence numbers ($0$–$3$) and windows of size $N = 3$. Show a run in which the receiver accepts a duplicate as new data.
::: solution
The sender sends packets with true numbers $0, 1, 2$, carrying sequence numbers $0, 1, 2$. All three arrive; the receiver delivers them, ACKs each, and moves its window to the true numbers $3, 4, 5$, which carry sequence numbers $3, 0, 1$. All three ACKs are lost. The sender's timer for packet $0$ expires and it resends it, with sequence number $0$. The receiver sees sequence number $0$, which is in its window — it takes it for true packet $4$ and buffers the old data as new. Corruption, undetected.

With $N = 2$ the same run is harmless: after delivering $0$ and $1$, the receiver's window is true $\{2, 3\}$, sequence numbers $\{2, 3\}$, while the sender can only resend sequence numbers $\{0, 1\}$, which the receiver recognises as the previous window and re-ACKs.
:::
:::

The example generalises to an exact limit.

::: theorem Window sizes for sequence numbers modulo $2^k$ {#thm-window}
Assume FIFO channels that may lose packets, and $k$-bit sequence numbers. Go-back-N works correctly for every pattern of losses if and only if $N \le 2^k - 1$. Selective repeat works correctly for every pattern of losses if and only if $N \le 2^{k-1}$.
:::

::: proof
Write $n$ for a packet's true (unbounded) number; it is sent as $n \bmod 2^k$. Let $r$ be the receiver's next expected true number (for selective repeat, $r = \textit{rbase}$) and $b$ the sender's base at some moment. Two facts hold at all times. First, $b \le r$: the sender advances only on ACKs, which acknowledge only packets the receiver has received, and the receiver has received packets below $r$ only. (For selective repeat, packets in $[b, r)$ may be acknowledged individually, but $b$ moves only past acknowledged packets, all of which are below $r$ or buffered in the receiver's window; in either case $b \le r$ holds for the base, and all outstanding packets are below $b + N$.) Second, $b \ge r - N$: the receiver has received packet $r - 1$, which the sender sent while its window contained it, so $r - 1 \le b' + N - 1$ for the base $b'$ at that time, and $b \ge b'$. Hence every packet the sender can send or resend — including those still in the channel, which by FIFO and the same argument were sent from windows with base at least $r - N$ — has true number in $[r - N, r + N - 1]$.

*Go-back-N, sufficiency.* The receiver must accept exactly the packet with true number $r$. Another packet in $[r - N, r + N - 1]$ has the same sequence number only if its true number is $r \pm 2^k$. But the sender's packets have true numbers at most $b + N - 1 \le r + N - 1$; so $r + 2^k$ is possible only if $2^k \le N - 1$, and $r - 2^k \ge r - N$ only if $2^k \le N$. With $N \le 2^k - 1$, neither occurs.

*Selective repeat, sufficiency.* The receiver must distinguish packets in its window $[r, r + N - 1]$ (to buffer) from those in $[r - N, r - 1]$ (to re-ACK). Together these are $2N$ consecutive true numbers. If $2N \le 2^k$, their sequence numbers are all distinct, so the receiver classifies every packet correctly.

*Necessity.* For go-back-N with $N = 2^k$ (or more): the sender sends true packets $0, \dots, 2^k - 1$, all are received and delivered, and all ACKs are lost. The receiver now expects true $2^k$, sequence number $0$; the sender times out and resends true packet $0$, sequence number $0$, which the receiver delivers as new. For selective repeat with $N > 2^{k-1}$: the sender sends true $0, \dots, N-1$; all arrive and all ACKs are lost; the receiver's window is $[N, 2N - 1]$, which contains true number $2^k$ because $N \le 2^k \le 2N - 1$; the sender resends true $0$, whose sequence number equals that of $2^k$, and the receiver accepts it as new ([[#ex-sr-ambiguity]] is the case $k = 2$, $N = 3$).
:::

### Throughput and loss

With a window of $N$ packets the sender transmits $N$ packets per cycle of $\text{RTT} + L/R$, as long as that does not exceed the link rate:

$$
U = \min\left(1,\ \frac{N \cdot L/R}{\text{RTT} + L/R}\right).
$$ {#eq-window-util}

The window needed to fill the pipe is $N \ge 1 + \text{RTT}/(L/R)$: the bandwidth–delay product in packets, plus one. In [[#ex-stopwait]] that is $2501$ packets.

Loss changes the picture differently for the two protocols. Model a sender whose window exactly fills the pipe, sending one packet per slot of $L/R$, on a channel that loses each data packet independently with probability $p$, and suppose a loss is detected just as the window runs out, $N$ slots after the lost packet was sent. Selective repeat retransmits only lost packets, so each packet needs on average $1/(1-p)$ transmissions and the efficiency is $1 - p$. In go-back-N, each failed transmission of a packet also wastes the $N - 1$ slots after it. A packet fails a geometric number of times with mean $p/(1-p)$, so it costs on average $1 + N p/(1 - p)$ slots, and the efficiency is

$$
E_\text{GBN} = \frac{1 - p}{1 + (N - 1)p}.
$$ {#eq-gbn-eff}

```python
# gbn.py: go-back-N over a lossy channel, one packet per time slot
import random

def go_back_n(n, N, D, p, seed=1):
    """Send packets 0..n-1 with window N over a channel with one-way delay D slots
    that loses each data packet with probability p (ACKs are not lost)."""
    rng = random.Random(seed)
    base = nxt = expected = 0                    # sender window [base, nxt); receiver
    timer, sent, t = None, 0, 0
    data, acks, delivered = [], [], []           # channel contents: (arrival time, seq)
    while expected < n:
        for a in [s for (at, s) in acks if at == t]:      # cumulative ACKs arriving
            if a >= base:
                base = a + 1
                timer = t + 2 * D + 1 if base < nxt else None
        if timer is not None and t >= timer:     # timeout: go back to base
            nxt, timer = base, None
        if nxt < min(base + N, n):               # send one packet if the window allows
            if rng.random() >= p:
                data.append((t + D, nxt))
            if timer is None:
                timer = t + 2 * D + 1
            nxt, sent = nxt + 1, sent + 1
        for s in [s for (at, s) in data if at == t]:      # receiver: in order only
            if s == expected:
                delivered.append(s)
                expected += 1
            acks.append((t + D, expected - 1))
        t += 1
    assert delivered == list(range(n))           # every packet, once, in order
    return sent, t

for p in (0.0, 0.01, 0.05, 0.1):
    sent, slots = go_back_n(20000, N=9, D=4, p=p)
    print(f"p={p:<4} transmissions per packet {sent / 20000:.3f}"
          f"  predicted {(1 + 8 * p) / (1 - p):.3f}")
```

```console
$ python3 gbn.py
p=0.0  transmissions per packet 1.000  predicted 1.000
p=0.01 transmissions per packet 1.101  predicted 1.091
p=0.05 transmissions per packet 1.477  predicted 1.474
p=0.1  transmissions per packet 2.016  predicted 2.000
```

The simulation sends 20,000 packets with window $N = 9$ over a channel of one-way delay $4$ slots (so the window, $2 \times 4 + 1$ slots, just fills the pipe) and checks that the receiver delivers every packet exactly once, in order. The transmissions per packet agree with the model's $1/E_\text{GBN} = (1 + (N-1)p)/(1-p)$ to within the randomness of the run.

::: widget plot
f: (1 - x)/(1 + (N - 1)*x); 1 - x
x: 0, 0.2
y: 0, 1
sliders: N=10:1:1000:1
labels: \text{go-back-N}; \text{selective repeat}
caption: Efficiency against the loss rate $x = p$ for a window of $N$ packets that just fills the pipe ([[#eq-gbn-eff]]). With $N = 10$ the two protocols are close at low loss; raise $N$ to $100$ or $1000$ — a fast, long path — and go-back-N collapses at loss rates of a few per cent, because every loss costs a whole window of retransmissions. This is why protocols for high bandwidth–delay products buffer out-of-order data and retransmit selectively.
:::

::: quiz
A go-back-N receiver has delivered packets 0–9 and receives packet 11. What does it do?
- [ ] Buffers packet 11 and sends ACK 11.
- [x] Discards packet 11 and sends ACK 9.
- [ ] Discards packet 11 and sends a NAK for packet 10.
- [ ] Delivers packet 11 and waits for packet 10.
::: solution
The go-back-N receiver accepts only the next packet in order, here 10 ([[#alg-gbn]]). It discards 11 and repeats its cumulative acknowledgement of the last in-order packet, ACK 9; the sender will eventually time out and resend everything from 10. (Repeated ACKs like this are what TCP's *fast retransmit* uses as an early hint of loss: [[networks/tcp-congestion]].) Buffering packet 11 and acknowledging it individually is what selective repeat does.
:::
:::

## In practice

Real transport protocols combine these ideas. TCP numbers *bytes*, not packets, with 32-bit sequence numbers; its acknowledgements are cumulative, like go-back-N's, and carry the number of the next byte expected; but almost every implementation buffers out-of-order data, like selective repeat, and the **selective acknowledgement** option (SACK, RFC 2018) lets the receiver report which blocks beyond the cumulative point it holds, so that the sender retransmits only the gaps. On a fast path even $2^{32}$ byte numbers wrap around within seconds — at 10 Gb/s in about $3.4$ s — faster than an old segment might linger in the network, so TCP adds timestamps to tell old segments from new (PAWS, RFC 7323). QUIC avoids the problem differently: its packet numbers go up to $2^{62}$ and are never reused, even for retransmissions, which carry the lost data in new packets; this also removes any ambiguity about which copy of a packet an acknowledgement refers to.

The FIFO assumption of [[#thm-abp]] does not hold in the internet: packets on different routes can be reordered. Protocols rely instead on a bound on how long a packet can survive — IP's time-to-live field and a *maximum segment lifetime* (MSL), assumed by TCP to be two minutes — and choose sequence-number spaces large enough that no number is reused while an old packet with it may still exist. The remaining design question — how large the window should be, given that the network is shared with other senders — is the subject of the next chapter.

::: history
The alternating-bit protocol was published by K. A. Bartlett, R. A. Scantlebury and P. T. Wilkinson of the National Physical Laboratory, home of Donald Davies's packet-switching work, in "A note on reliable full-duplex transmission over half-duplex links" (*Communications of the ACM*, 1969). Sliding-window protocols with go-back-N recovery were built into the link-layer protocols of the 1970s, notably IBM's SDLC and its ISO successor HDLC, and the sliding window was central to Cerf and Kahn's 1974 transmission control program. N. V. Stenning's "A data transfer protocol" (1976) gave one of the first formal correctness proofs for a sliding-window protocol, starting a long line of work on protocol verification. The Internet checksum's design and fast implementation were described by R. Braden, D. Borman and C. Partridge in RFC 1071 (1988).
:::

## Where this leads

[[networks/tcp-congestion]] turns the protocols of this chapter into TCP: connection setup and teardown, byte sequence numbers, timeout estimation, flow control, and the congestion control that chooses the window size. Error-detecting codes stronger than the checksum, and link-layer retransmission, appear in [[networks/link-layer]] and [[networks/wireless-mobile]]. The style of correctness proof used for [[#thm-abp]] — an invariant over the states of several machines and the channels between them — is developed for distributed algorithms in [[distributed-systems]], and the impossibility of reliable agreement over lossy channels (the "two generals" problem) appears there too.

::: summary
- The transport layer **demultiplexes** segments to sockets by port number. **UDP** adds only ports, a length and a checksum (8 bytes) to IP ([[#def-udp]]).
- The **Internet checksum** is the complement of the one's-complement sum of 16-bit words ([[#def-checksum]]); it detects all single-bit errors but not reordered words, and it is no defence against attackers ([[#prop-checksum]]).
- Reliable transfer over a lossy channel needs **acknowledgements**, **sequence numbers** (to recognise duplicates) and **timers** (to detect loss). The **alternating-bit protocol** is correct over FIFO channels ([[#thm-abp]]).
- Stop-and-wait utilisation is $(L/R)/(\text{RTT} + L/R)$ ([[#prop-stopwait]]); filling a path needs a window of about one bandwidth–delay product.
- **Go-back-N** uses cumulative ACKs and one timer and resends the whole window after a loss; **selective repeat** buffers out-of-order packets and resends only losses.
- With $k$-bit sequence numbers, go-back-N needs $N \le 2^k - 1$ and selective repeat $N \le 2^{k-1}$ ([[#thm-window]]).
- Under loss, go-back-N's efficiency $(1-p)/(1 + (N-1)p)$ collapses for large windows, while selective repeat's is $1 - p$ ([[#eq-gbn-eff]]).
:::

## Exercises

::: exercise A checksum of three words {level=1 check="20976"}
Compute the Internet checksum of the three 16-bit words `0x1234`, `0xF00D`, `0xABCD`. (Enter the checksum in decimal.)
::: solution
$\texttt{0x1234} + \texttt{0xF00D} = \texttt{0x10241}$; folding the carry gives $\texttt{0x0241} + 1 = \texttt{0x0242}$. Adding $\texttt{0xABCD}$ gives $\texttt{0xAE0F}$, with no carry. The checksum is the complement, $\texttt{0xFFFF} - \texttt{0xAE0F} = \texttt{0x51F0} = 20976$. Check: $\texttt{0xAE0F} + \texttt{0x51F0} = \texttt{0xFFFF}$.
:::
:::

::: exercise Utilisation of stop-and-wait {level=1 check="1/101"}
A stop-and-wait protocol sends 1250-byte packets over a 100 Mb/s path with RTT 10 ms. What is the sender's utilisation? (Enter it as a fraction or decimal.)
::: solution
$L = 10^4$ bits, so $L/R = 10^4/10^8 = 0.1$ ms, and [[#eq-utilisation]] gives $U = 0.1/(10 + 0.1) = 1/101 \approx 0.0099$: about 1%, or a throughput of about 990 kb/s.
:::
:::

::: exercise Window limits {level=1 check="4"}
A protocol uses 3-bit sequence numbers. What is the largest window go-back-N can use, and the largest selective repeat can use? (Enter the selective-repeat window.)
::: solution
By [[#thm-window]] with $k = 3$: go-back-N allows $N \le 2^3 - 1 = 7$, selective repeat $N \le 2^2 = 4$.
:::
:::

::: exercise Filling the pipe {level=2 check="2251"}
For the path of [[#ex-stopwait]] (1 Gb/s, RTT 30 ms, 1500-byte packets), what is the smallest window, in packets, that gives a utilisation of at least 90%? How many bits of sequence number does selective repeat need for that window? (Enter the window.)
::: solution
By [[#eq-window-util]] we need $N \cdot 0.012 / 30.012 \ge 0.9$, that is $N \ge 0.9 \times 30.012/0.012 = 2250.9$, so $N = 2251$. Selective repeat needs $2^{k-1} \ge 2251$, so $k - 1 \ge 12$ ($2^{11} = 2048$ is too small, $2^{12} = 4096$ suffices): $k = 13$ bits.
:::
:::

::: exercise Counting go-back-N transmissions {level=2 check="9"}
A go-back-N sender with window $N = 3$ sends packets $0$ to $5$. Packet 1 is lost the first time; nothing else is lost, and the timeout is long enough that no packet times out unnecessarily. How many transmissions are made in total? (Enter the number.)
::: solution
The sender sends 0, 1, 2. Packet 0 arrives (ACK 0), so the window becomes $[1, 3]$ and the sender sends 3. Packet 1 is lost; 2 and 3 are discarded, each producing ACK 0 again. The window stays $[1, 3]$ until the timeout, when 1, 2 and 3 are resent and acknowledged in turn, letting the sender send 4 and 5. Transmissions: $0, 1, 2, 3$ ($4$), $1, 2, 3$ ($3$), $4, 5$ ($2$): $9$ in all.
:::
:::

::: exercise Stop-and-wait over a lossy channel {level=2}
In the alternating-bit protocol, each data packet is lost independently with probability $p$, ACKs are never lost, and the timeout is exactly one RTT after the end of a transmission (so a timeout fires as soon as an ACK would have arrived). Show that the expected number of transmissions per message is $1/(1-p)$ and that the throughput is $(1 - p) L / (\text{RTT} + L/R)$. Is the same true if ACKs are lost with probability $q$ independently?
::: solution
Each attempt succeeds with probability $1 - p$, independently, so the number of attempts is geometric with mean $1/(1-p)$. Every attempt, failed or not, takes exactly $\text{RTT} + L/R$ (a failed one ends with the timeout at the moment the ACK would have arrived). So the expected time per message is $(\text{RTT} + L/R)/(1-p)$ and, by the renewal reward theorem (long-run rate = reward per cycle / mean cycle length), the throughput is $(1-p) L/(\text{RTT} + L/R)$. If ACKs are lost too, an attempt succeeds only if both the packet and its ACK get through, with probability $(1 - p)(1 - q)$, so the mean number of attempts is $1/((1-p)(1-q))$ and the throughput is multiplied by $(1-p)(1-q)$. The extra transmissions caused by lost ACKs deliver duplicates, which the receiver discards and re-acknowledges.
:::
:::

::: exercise What the checksum misses {level=3}
(a) Use property 2 of [[#prop-checksum]] to show that the Internet checksum fails to detect an error exactly when the ordinary sum of the words changes by a multiple of $2^{16} - 1$. (b) Find two different 4-byte messages with the same checksum that differ in only two bit positions. (c) Explain why the checksum is independent of byte order, in the sense that computing it on byte-swapped words gives the byte-swapped checksum (RFC 1071 uses this to let little-endian machines skip conversions).
::: solution
(a) The receiver's check passes when the one's-complement sum of all words, including the checksum, is $\equiv 0 \pmod{2^{16}-1}$. For intact data it is. An error changes the ordinary sum by some $\Delta$, and by property 2 the one's-complement sum changes by $\Delta \bmod (2^{16}-1)$; so the error goes undetected if and only if $\Delta \equiv 0 \pmod{2^{16} - 1}$.

(b) Flip bit $0$ of the first word from $0$ to $1$ (adding $1$) and bit $0$ of the second word from $1$ to $0$ (subtracting $1$): $\Delta = 0$. For example the words `0x0000 0x0001` and `0x0001 0x0000` (bytes `00 00 00 01` and `00 01 00 00`) both have one's-complement sum `0x0001` and checksum `0xFFFE`. Any pair of opposite flips in the same bit position of two words is missed.

(c) Swapping the bytes of a 16-bit word is a rotation by 8 bits. In one's-complement arithmetic, rotating every summand by 8 bits rotates the sum by 8 bits, because the end-around carry makes the sum behave as arithmetic on a ring of 16 bits in which the carry out of bit 15 enters bit 0, exactly as a carry out of bit 7 enters bit 8: the addition is the same "circular" operation whichever byte is called high. And complementing commutes with rotation. So the checksum computed on byte-swapped words is the byte-swapped checksum, and a little-endian machine can sum its native 16-bit loads and store the result without conversion.
:::
:::

::: exercise A selective-repeat simulator {level=3}
Adapt `gbn.py` to selective repeat: per-packet timers (each $2D + 1$ slots), individual ACKs, and a receiver that buffers packets in its window $[\textit{rbase}, \textit{rbase} + N - 1]$. Use true (unbounded) numbers internally but check, as the receiver accepts each packet, that its true number is in the window — that is, that a receiver seeing only numbers modulo $2^k$ with $2N \le 2^k$ would have classified it correctly. Measure the transmissions per packet for $N = 9$, $D = 4$ and $p \in \set{0.01, 0.05, 0.1}$ and compare with the prediction $1/(1-p)$.
::: solution
```python
import random

def selective_repeat(n, N, D, p, seed=1):
    rng = random.Random(seed)
    base = nxt = rbase = 0
    timers, acked, buffered, delivered = {}, set(), set(), []
    data, acks, sent, t = [], [], 0, 0
    while rbase < n:
        for a in [s for (at, s) in acks if at == t]:    # individual ACKs
            acked.add(a)
            timers.pop(a, None)
            while base in acked:
                base += 1
        resend = [s for s, due in timers.items() if due <= t]
        if resend:                                       # retransmit the oldest timed-out packet
            s = min(resend)
        elif nxt < min(base + N, n):
            s, nxt = nxt, nxt + 1
        else:
            s = None
        if s is not None:                                # one transmission per slot
            if rng.random() >= p:
                data.append((t + D, s))
            timers[s] = t + 2 * D + 1
            sent += 1
        for s in [s for (at, s) in data if at == t]:
            assert rbase - N <= s < rbase + N            # classifiable modulo 2^k if 2N <= 2^k
            if s >= rbase:
                buffered.add(s)
                while rbase in buffered:
                    buffered.remove(rbase)
                    delivered.append(rbase)
                    rbase += 1
            acks.append((t + D, s))                      # ACK new packets and duplicates alike
        t += 1
    assert delivered == list(range(n))
    return sent

for p in (0.01, 0.05, 0.1):
    print(f"p={p:<4} transmissions per packet {selective_repeat(20000, 9, 4, p) / 20000:.3f}"
          f"  predicted {1 / (1 - p):.3f}")
```

```console
$ python3 sr.py
p=0.01 transmissions per packet 1.011  predicted 1.010
p=0.05 transmissions per packet 1.054  predicted 1.053
p=0.1  transmissions per packet 1.114  predicted 1.111
```

The assertion on $s$ never fails, as [[#thm-window]] predicts: every packet the receiver sees is within $N$ of its window base. Compared with go-back-N's $1.101$, $1.477$ and $2.016$ on the same channel, selective repeat sends only what is lost. Note the simplification that ACKs are never lost; adding ACK loss requires no change to the logic, since lost ACKs simply cause timeouts and duplicate packets, which the receiver re-acknowledges.
:::
:::
