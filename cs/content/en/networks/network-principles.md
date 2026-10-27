Suppose you upload a 1-megabyte photograph from London to a server in Sydney. The light in the undersea fibre has to travel roughly 17,000 km, and light in glass moves at about $2 \times 10^8$ m/s, two-thirds of its speed in vacuum. However fast your connection, the first bit cannot arrive sooner than

$$
\frac{1.7 \times 10^7\ \text{m}}{2 \times 10^8\ \text{m/s}} = 85\ \text{ms}.
$$

Pushing the $8 \times 10^6$ bits of the photograph onto a 1 Gb/s link takes another $8$ ms. Upgrade the link to 100 Gb/s and the second number shrinks to $0.08$ ms, but the first does not change at all. Two different quantities — how *fast* bits can be put onto a wire and how *long* each bit takes to cross it — govern every network, and confusing them is the most common mistake in reasoning about network performance.

This chapter builds the vocabulary and the models used in the rest of the course. We start with the central design decision of the internet, **packet switching**, and see why it beats reserving a circuit for every conversation. We then take a packet apart in time — the four components of delay, queueing and loss, throughput and the bandwidth–delay product — with formulas that let you estimate the performance of a network on the back of an envelope. Finally we look at how the internet's protocols are organised into **layers**, why that organisation has lasted fifty years, and what the network as a whole looks like: hosts, access networks, internet service providers and the standards that bind them.

## Circuits and packets

A network connects **hosts** (or **end systems**): laptops, phones, servers, sensors. Hosts are joined by **links** — copper, optical fibre, radio — and by **switches** and **routers** that pass data from link to link. The question is how the capacity of the links is shared among all the hosts that want to communicate.

::: definition Circuit switching and packet switching {#def-switching}
In **circuit switching**, before two hosts communicate the network reserves a fixed share of the capacity of every link on a path between them — a **circuit** — for the whole duration of the conversation, whether or not data are being sent. The share is usually a time slot in a repeating frame (**time-division multiplexing**, TDM) or a frequency band (**frequency-division multiplexing**, FDM).

In **packet switching**, data are divided into **packets**, each carrying a **header** with the destination address. Packets from many conversations share the links on demand: a switch receives a packet, looks at its header, and sends it on an outgoing link as soon as that link is free, keeping it in a **queue** (buffer) meanwhile. No capacity is reserved.
:::

The telephone network was built on circuits: a call reserved a 64 kb/s channel end to end, which suits a conversation that produces a steady stream of speech samples. Computer traffic is different. A person browsing the web sends nothing for seconds, then requests a page that arrives in a burst of a few hundred kilobytes, then sends nothing again. A circuit sized for the burst sits idle almost all the time; a circuit sized for the average makes the burst painfully slow. Packet switching lets the idle capacity of one user serve the burst of another.

### Store-and-forward

Most packet switches are **store-and-forward**: a switch must receive the *whole* packet before it can begin to send it on, because it needs to check the packet for errors and read its header. A packet of $L$ bits takes $L/R$ seconds to transmit on a link of rate $R$ bits per second, so a packet that crosses several links pays that cost on each.

::: proposition Store-and-forward delay {#prop-saf}
A source sends $P$ packets of $L$ bits each, back to back, over a path of $N$ links, each of rate $R$, through $N-1$ store-and-forward switches. Ignore propagation, processing and any other traffic. Then the last packet arrives at the destination at time

$$
d = (N + P - 1)\,\frac{L}{R}.
$$ {#eq-saf}
:::

::: proof
Write $\tau = L/R$ for the time to transmit one packet on one link. We claim that packet $k$ (for $k = 1, \dots, P$) finishes crossing link $j$ (for $j = 1, \dots, N$) at time $(k + j - 1)\tau$, and prove it by induction on $k + j$. Packet $1$ crosses link $1$ during $[0, \tau]$. In general packet $k$ can start on link $j$ only when two conditions hold: it has completely arrived over link $j - 1$ (at time $(k + j - 2)\tau$ by induction, or at time $(k-1)\tau$ when $j = 1$, since the source sends back to back), and link $j$ has finished sending packet $k - 1$ (at time $(k - 1 + j - 1)\tau = (k + j - 2)\tau$ by induction, or never busy when $k = 1$). Both happen at time $(k + j - 2)\tau$, so packet $k$ starts on link $j$ then and finishes $\tau$ later, at $(k + j - 1)\tau$. The last packet, $k = P$, finishes the last link, $j = N$, at $(P + N - 1)\tau$.
:::

The formula has a simple reading: the first packet needs $N\tau$ to cross the path, and after that one packet emerges every $\tau$ — the path is a **pipeline**.

::: example Why messages are cut into packets {#ex-segmentation}
A host sends a message of $M = 8 \times 10^6$ bits (1 MB) to another host over $N = 3$ links of $R = 10$ Mb/s, through two store-and-forward routers. Ignoring headers and propagation, how long does the transfer take if (a) the message is sent as one huge packet, (b) it is cut into packets of $10^4$ bits?
::: solution
(a) With $P = 1$ and $L = M$, [[#eq-saf]] gives $d = 3 \cdot M/R = 3 \times 0.8\ \text{s} = 2.4$ s. Each router waits for the whole megabyte before forwarding any of it, so the three links are used one after another.

(b) Now $P = 800$ and $L/R = 10^4 / 10^7 = 1$ ms, so $d = (3 + 800 - 1) \times 1\ \text{ms} = 0.802$ s. While router 1 forwards packet $k$, the source is already sending packet $k+1$: all three links work in parallel. Cutting the message into packets made the transfer three times faster. With real headers, smaller packets are not always better — each packet carries a header of fixed size, and [[#exr-optimal-packet]] finds the best packet size.
:::
:::

::: widget plot
f: (N + M/x - 1)*(x + h)/R
x: 500, 100000
y: 0, 3
sliders: N=3:2:10:1; h=320:0:2000:40; M=8000000:1000000:16000000:1000000; R=10000000:1000000:100000000:1000000
labels: \text{transfer time (s)}
caption: Total store-and-forward time for an $M$-bit message cut into packets carrying $x$ payload bits plus an $h$-bit header each, over $N$ links of rate $R$ (the model of [[#ex-segmentation]] with headers). Try $h = 0$: the curve keeps falling as $x$ shrinks, so tiny packets look ideal. Then raise $h$: very small packets waste time on headers, very large ones lose the pipelining, and a minimum appears — near $x = \sqrt{hM/(N-1)}$, as [[#exr-optimal-packet]] proves. Increase $N$ and watch the best packet size fall.
:::

### Statistical multiplexing

The second argument for packets concerns how many users a link can support. Packet switching shares capacity *statistically*: it bets that not all users will be active at once.

::: example Circuits against packets {#ex-statmux}
A link of 10 Mb/s is shared by users who each send at 1 Mb/s when active and are active, independently, 10% of the time. (a) How many users can circuit switching support? (b) With packet switching and 30 users, what is the probability that more than 10 are active at the same moment, so that their combined demand exceeds the link?
::: solution
(a) Each circuit reserves 1 Mb/s, so the link supports $10$ users — whether or not they are active.

(b) The number of active users $X$ is binomial with $n = 30$ and $p = 0.1$. Demand exceeds capacity when $X \ge 11$:

$$
\Prob(X \ge 11) = \sum_{k=11}^{30} \binom{30}{k} (0.1)^k (0.9)^{30-k} \approx 8.9 \times 10^{-5}.
$$

(Computed in Python with `math.comb`.) So packet switching supports three times as many users, and they find the link overloaded less than one moment in ten thousand; during those moments packets queue briefly rather than being refused. With 40 users the probability rises to about $1.5 \times 10^{-3}$, and with 50 to about $0.0094$.
:::
:::

::: widget distribution
dist: binomial
params: n=30, p=0.1
a: 11
b: 30
caption: The number of simultaneously active users in [[#ex-statmux]]. The shaded tail $X \ge 11$ is the probability that demand exceeds the 10 Mb/s link. Increase $n$ (more users) and watch the tail grow slowly at first and then quickly: statistical multiplexing works because the binomial distribution is concentrated near its mean $np$, with standard deviation only $\sqrt{np(1-p)}$. Try $p = 0.5$ — bursty traffic is what makes sharing pay; steady traffic gains little.
:::

The price of packet switching is unpredictability. When a burst arrives, packets wait in queues and their delay varies; when the burst is too long, queues overflow and packets are lost. Circuits give guaranteed, constant delay but waste capacity. The internet chose packets and spends much of its protocol machinery — retransmission, congestion control, buffering in applications — coping with the consequences.

## Delay, loss and throughput

Follow a single packet as it leaves a router. Its total delay at that **node** has four parts.

::: definition Components of nodal delay {#def-delay}
For a packet of $L$ bits passing through a node onto a link of rate $R$ bits per second and length $d$ metres, on which signals propagate at speed $s$:

- the **processing delay** $d_\text{proc}$ is the time to examine the header, check for bit errors and decide on the outgoing link (typically microseconds or less in a router);
- the **queueing delay** $d_\text{queue}$ is the time spent waiting for the outgoing link to become free (from zero to many milliseconds, depending on the traffic);
- the **transmission delay** $d_\text{trans} = L/R$ is the time to push all $L$ bits onto the link;
- the **propagation delay** $d_\text{prop} = d/s$ is the time for one bit to travel the length of the link; $s \approx 2 \times 10^8$ m/s in fibre and copper, about $3 \times 10^8$ m/s through air.

The **nodal delay** is $d_\text{nodal} = d_\text{proc} + d_\text{queue} + d_\text{trans} + d_\text{prop}$, and the end-to-end delay is the sum of the nodal delays along the path.
:::

Transmission and propagation delay are often confused, but they have nothing to do with each other. Transmission delay depends on the packet size and the link rate and not on distance; propagation delay depends on distance and the medium and not on the packet or the rate. A useful image: cars (bits) leaving a toll booth one every few seconds (transmission) and then driving at constant speed down the motorway (propagation). A 1500-byte packet on a 10 Gb/s link occupies only $1.2$ µs of transmission time, during which its first bit travels $240$ m of fibre; on a 1 Mb/s link, transmission takes $12$ ms and the packet is spread over $2400$ km of fibre.

::: example Delay over two links {#ex-two-links}
Host A sends a 1500-byte packet to host B through one router. The link from A to the router is 1000 km long at 100 Mb/s; the link from the router to B is 10 km long at 10 Mb/s. Signals propagate at $2 \times 10^8$ m/s, processing is negligible and there is no other traffic. What is the end-to-end delay?
::: solution
The packet has $L = 1500 \times 8 = 12000$ bits.

| link | $d_\text{trans} = L/R$ | $d_\text{prop} = d/s$ |
|---|---|---|
| A → router | $12000 / 10^8 = 120$ µs | $10^6 / (2 \times 10^8) = 5$ ms |
| router → B | $12000 / 10^7 = 1.2$ ms | $10^4 / (2 \times 10^8) = 50$ µs |

The router must receive the whole packet before forwarding it, so the delays simply add: $0.12 + 5 + 1.2 + 0.05 = 6.37$ ms. Propagation dominates on the long link, transmission on the slow one. Doubling the speed of the long link would save only $60$ µs.
:::
:::

### Queueing and loss

Queueing delay is the interesting component, because it depends on everything else happening in the network. Let packets of $L$ bits arrive at a queue at an average rate of $a$ packets per second, to be sent on a link of $R$ bits per second.

::: definition Traffic intensity {#def-intensity}
The **traffic intensity** (or **utilisation**) of a link is $\rho = La/R$, the ratio of the average rate at which bits arrive to the rate at which the link can send them.
:::

If $\rho > 1$, bits arrive faster than they can leave, and the queue grows without bound — or, since real buffers are finite, packets are dropped. The first rule of network design is therefore *never let the traffic intensity exceed 1 for long*. What is less obvious is that queues become long well *before* $\rho = 1$. If packets arrived perfectly regularly, one every $L/R$ seconds or slower, no packet would ever wait. Real arrivals are bursty, and bursts build queues. The classical model, due to Erlang and developed for packet networks by Kleinrock, makes this exact.

::: theorem Mean delay in an M/M/1 queue {#thm-mm1}
Suppose packets arrive as a Poisson process of rate $\lambda$ (independent exponential gaps between arrivals, mean $1/\lambda$), transmission times are independent and exponential with mean $1/\mu$, there is one link and an unlimited buffer, and $\rho = \lambda/\mu < 1$. Then in the steady state the number of packets in the system (queued or being sent) is $n$ with probability $\pi_n = (1 - \rho)\rho^n$, the mean number is $\bar N = \rho/(1 - \rho)$, and the mean time a packet spends in the system is

$$
T = \frac{1}{\mu - \lambda} = \frac{1/\mu}{1 - \rho}.
$$ {#eq-mm1}
:::

::: proof
Under these assumptions the number of packets in the system is a continuous-time Markov chain on $\set{0, 1, 2, \dots}$ that moves from $n$ to $n+1$ at rate $\lambda$ (an arrival) and from $n$ to $n - 1$ at rate $\mu$ when $n \ge 1$ (a departure). In the steady state, the long-run rate of transitions across the "cut" between states $n$ and $n+1$ must be the same in both directions, since the chain cannot cross a cut upwards more often than downwards in the long run: $\lambda \pi_n = \mu \pi_{n+1}$. Hence $\pi_{n+1} = \rho\, \pi_n$ and $\pi_n = \rho^n \pi_0$. The probabilities sum to $1$, and since $\rho < 1$ the geometric series converges: $\pi_0 \sum_{n \ge 0} \rho^n = \pi_0/(1-\rho) = 1$, so $\pi_0 = 1 - \rho$. The mean is

$$
\bar N = \sum_{n \ge 0} n (1-\rho)\rho^n = (1 - \rho) \cdot \frac{\rho}{(1-\rho)^2} = \frac{\rho}{1-\rho},
$$

using $\sum_{n\ge0} n\rho^n = \rho/(1-\rho)^2$. Finally, **Little's law** — in any system in steady state the mean number of customers equals the arrival rate times the mean time each spends there, $\bar N = \lambda T$ — gives $T = \bar N/\lambda = \rho / (\lambda(1 - \rho)) = 1/(\mu - \lambda)$.
:::

The assumptions are idealised — internet traffic is burstier than Poisson, and packet sizes are far from exponential — so take [[#eq-mm1]] as a model, not a law. But its shape is right, and it is the shape that matters: the delay, measured in units of the service time $1/\mu$, is $1/(1 - \rho)$. At 50% utilisation a packet spends on average twice its transmission time in the system; at 90%, ten times; at 99%, a hundred times.

::: widget plot
f: s/(1 - x)
x: 0, 0.98
y: 0, 50
sliders: s=1:0.5:5:0.5
labels: \text{mean delay } T
caption: Mean time in an M/M/1 queue against utilisation $\rho = x$, in units of the service time $s = 1/\mu$ ([[#thm-mm1]]). Notice how flat the curve is below about $\rho = 0.5$ and how steeply it rises past $0.8$: a link at 95% load has ten times the delay of one at 50%, although it carries less than twice the traffic. This is why network operators upgrade links long before they are "full", and why a little extra capacity — or a little less traffic — removes most queueing delay.
:::

Real routers have finite buffers. When a packet arrives at a full buffer it is **dropped** (lost), and the fraction of packets lost rises with the traffic intensity. Loss is not a failure of the network but part of its design: in the internet the network layer makes no promise to deliver, and recovering from loss is left to the hosts ([[networks/reliable-transport]]). As we shall see in [[networks/tcp-congestion]], TCP even uses loss as its signal that the network is congested.

::: quiz
A router's outgoing link runs at 1 Gb/s and carries an average of 900 Mb/s. Its operator doubles the link rate to 2 Gb/s, with the same traffic. According to the M/M/1 model, by what factor does the mean time a packet spends at this router fall?
- [ ] By a factor of 2, because the link is twice as fast.
- [x] By a factor of 11.
- [ ] By a factor of 20.
- [ ] It does not change, because the traffic is the same.
::: solution
Let the old service rate be $\mu$ packets per second, so the arrival rate is $\lambda = 0.9\mu$. Before the upgrade, [[#eq-mm1]] gives $T = 1/(\mu - 0.9\mu) = 10/\mu$. After it, the service rate is $2\mu$ and $T = 1/(2\mu - 0.9\mu) = 1/(1.1\mu)$. The ratio is $10 \times 1.1 = 11$. Half of the gain comes from each packet's transmission taking half as long; the rest — a factor of $5.5$ — from the utilisation falling from $0.9$ to $0.45$, which almost empties the queue.
:::
:::

## Throughput and the bandwidth–delay product

Delay tells us how long one bit takes to arrive; **throughput** tells us how many bits per second arrive over a period. For a file transfer the throughput, not the delay, decides how long the download takes.

::: definition Throughput {#def-throughput}
The **instantaneous throughput** of a transfer from host A to host B is the rate, in bits per second, at which B receives data at a given moment. If a file of $F$ bits takes $T$ seconds to arrive, the **average throughput** is $F/T$.
:::

::: proposition Bottleneck throughput {#prop-bottleneck}
Consider a long transfer over a path of links with rates $R_1, R_2, \dots, R_N$, where the transfer has link $i$ to itself or receives a fixed share $R_i$ of it. Then the long-run throughput of the transfer is at most $R_\text{min} = \min_i R_i$, and a sender transmitting at exactly $R_\text{min}$ achieves it with bounded queues.
:::

::: proof
Let $B_i(t)$ be the number of bits that have crossed link $i$ by time $t$. A bit can cross link $i$ only after crossing link $i - 1$, so $B_i(t) \le B_{i-1}(t)$, and link $i$ sends at most $R_i$ bits per second, so $B_i(t) \le R_i t$. Hence the bits delivered satisfy $B_N(t) \le \min_i B_i(t) \le R_\text{min}\, t$ for every $t$, and the long-run throughput $\lim B_N(t)/t$ is at most $R_\text{min}$. Conversely, if the source sends at rate $R_\text{min}$, every link receives bits no faster than it can send them ($R_\text{min} \le R_i$), so no queue grows beyond the packet being received, and bits leave the last link at rate $R_\text{min}$.
:::

The slowest link is the **bottleneck**. In today's internet the core links are fast and lightly loaded, so the bottleneck is usually an access link at one end (a home connection, a mobile radio link) — or a link shared by many flows.

::: example A shared core link {#ex-shared}
A client with a 50 Mb/s access link downloads from a server with a 100 Mb/s access link. In between, the path crosses a 1 Gb/s link in an ISP's network that is shared equally by 25 such transfers. What is the throughput of the download?
::: solution
The download receives $1000/25 = 40$ Mb/s of the shared link. The throughput is $\min(100, 40, 50) = 40$ Mb/s, and the bottleneck is the shared core link, not either access link. If ten of the other transfers finish, the share rises to $1000/15 \approx 67$ Mb/s, and the client's own 50 Mb/s access link becomes the bottleneck. (Who decides that each of 25 flows gets an equal share, and how they discover it without a central authority, is the subject of congestion control in [[networks/tcp-congestion]].)
:::
:::

Delay and rate meet in a single number that we shall need in almost every chapter.

::: definition Bandwidth–delay product {#def-bdp}
The **bandwidth–delay product** of a path is $R \times \text{RTT}$, the bottleneck rate multiplied by the **round-trip time** (the time for a bit to go from sender to receiver and for a reply to come back). It is the number of bits "in flight" when the sender transmits continuously at rate $R$ and waits for each bit's acknowledgement.
:::

The bandwidth–delay product is the size of the pipe. A sender that wants the full rate $R$ must have $R \times \text{RTT}$ bits sent but not yet acknowledged; if it limits itself to fewer — because a protocol limits the "window" of unacknowledged data — its throughput is at most window/RTT, whatever the link rate.

::: example A long fat network {#ex-lfn}
A path has a bottleneck of 10 Gb/s and a round-trip time of 100 ms. (a) What is its bandwidth–delay product? (b) The original TCP header has a 16-bit field for the amount of unacknowledged data the receiver will accept, so at most 65,535 bytes may be in flight. What throughput can such a connection achieve over this path?
::: solution
(a) $R \times \text{RTT} = 10^{10} \times 0.1 = 10^9$ bits $= 125$ MB. The pipe holds 125 megabytes.

(b) The sender may send 65,535 bytes and must then wait for acknowledgements, which arrive one RTT after the data were sent. So it sends at most $65535 \times 8$ bits per $0.1$ s, $\approx 5.24$ Mb/s — about $0.05\%$ of the link. This is why TCP acquired a **window scale** option (RFC 1323 in 1992, now RFC 7323), which multiplies the 16-bit field by up to $2^{14}$.
:::
:::

::: warning Bandwidth is not speed
"A faster connection" usually means a higher link rate, which reduces only the transmission delay $L/R$. It does nothing for propagation delay, which is set by distance and the speed of light, and nothing for the many round trips that a short web transfer needs to set up connections ([[networks/application-layer]]). For a small web page fetched from the other side of the world, round trips dominate and doubling the link rate hardly helps; moving the content closer — the idea behind content distribution networks — does. Conversely, for a bulk transfer over a long path, the bandwidth–delay product, not the link rate, often limits throughput.
:::

## Protocol layers

A network is useful only if hosts built by different people, running different software, agree on exactly what to send and what it means. That agreement is a protocol.

::: definition Protocol {#def-protocol}
A **protocol** defines the **format** of the messages exchanged between two or more communicating entities, the **order** in which they are sent, and the **actions** taken on sending or receiving a message or on other events (such as a timer expiring).
:::

The work of moving data from a program on one host to a program on another is far too complex for a single protocol: it must cope with signals on wires, with errors and lost packets, with finding a route across thousands of networks, with matching data to the right program, and with the meaning of the data. The internet divides the work into **layers**. Each layer provides a **service** to the layer above, using only the service of the layer below plus its own actions; and each layer on one host talks, through its protocol, to the same layer on another host.

::: definition The internet protocol stack {#def-stack}
The internet's architecture has five layers, from the top:

| layer | service | unit of data | examples |
|---|---|---|---|
| application | the network applications themselves | message | HTTP, DNS, SMTP, TLS |
| transport | delivery between *processes* on two hosts | segment (TCP) or datagram (UDP) | TCP, UDP, QUIC |
| network | delivery between *hosts* across many networks, by routing | datagram (packet) | IP, ICMP, routing protocols |
| link | delivery between *neighbouring* nodes over one link | frame | Ethernet, Wi-Fi, 5G radio |
| physical | moving individual bits over the medium | bit | twisted pair, fibre, radio |

The seven-layer **OSI reference model** (ISO 7498, 1984) adds a **presentation** layer (data representation, encryption) and a **session** layer (dialogue control) between application and transport. In the internet these functions, where needed, are built into applications.
:::

On the sending host, each layer takes the data given to it by the layer above — its **payload** — and adds its own **header** (and sometimes a trailer) with the information its peer needs. This is **encapsulation**: an HTTP message becomes the payload of a TCP segment, which becomes the payload of an IP datagram, which becomes the payload of an Ethernet frame. Each router along the path removes the link-layer frame, examines the IP header, and re-encapsulates the datagram in a new frame for the next link; it never looks at the TCP header or the HTTP message. Link-layer switches look only at frames. The receiving host strips the headers in reverse order.

::: example The cost of encapsulation {#ex-overhead}
A TCP connection sends full-sized segments over Ethernet, whose largest payload (the **MTU**, maximum transmission unit) is 1500 bytes. The IP and TCP headers are 20 bytes each (without options). On the wire, each Ethernet frame also carries a 14-byte header and 4-byte frame check sequence, is preceded by an 8-byte preamble, and is followed by a 12-byte minimum gap of silence. What fraction of a 1 Gb/s Ethernet link's capacity carries application data?
::: solution
Each segment carries $1500 - 20 - 20 = 1460$ bytes of application data. It occupies $1500 + 14 + 4 + 8 + 12 = 1538$ byte times on the wire. The efficiency is $1460 / 1538 \approx 94.9\%$, so the best possible application throughput on 1 Gb/s Ethernet is about $949$ Mb/s. In practice TCP adds a 12-byte timestamp option to most segments (RFC 7323), leaving 1448 bytes of data and $94.1\%$. For small messages the overhead is much worse: a voice call sending 160-byte audio samples with RTP (12 bytes), UDP (8) and IP (20) headers spends a fifth of each IP packet on headers, before the link layer adds its own.
:::
:::

### Why layers work

Layering is a form of **modularity**: each layer can change without the others noticing, as long as its service stays the same. Ethernet has gone from 10 Mb/s on coaxial cable (1980s) to 400 Gb/s on fibre without any change to IP or TCP; applications from email to video calls have been built on the same transport protocols. The cost is some duplication (error detection happens at several layers) and some lost information (a layer cannot see why the layer below behaved as it did — a problem that returns in [[networks/wireless-mobile]], where TCP cannot tell radio errors from congestion).

The internet's layering has a distinctive shape, often drawn as an **hourglass**. At the narrow waist is a single network-layer protocol, IP, which every host and router must speak. Below it are many link technologies, above it many transport protocols and thousands of applications. IP demands very little of the links (they need only carry packets, perhaps unreliably) and promises very little to the layers above (it delivers packets *best effort*, without guarantees of delivery, order or timing). Because the waist is so thin, any new link can join the internet by carrying IP, and any new application can use any link without knowing it exists.

Where should a function such as reliability go? A famous answer came from Saltzer, Reed and Clark.

::: proposition The end-to-end argument {#prop-e2e}
A function that can be implemented completely and correctly only with the knowledge and help of the applications at the end points should be implemented at the end points. Providing it in the network as well can be justified only as a performance enhancement, never as a replacement.
:::

This is a design principle rather than a theorem, but its justification is a real argument. Take reliable file transfer. Even if every link retransmitted corrupted frames perfectly, a file could still be damaged by a faulty router memory, a buggy operating system or a failing disk at the receiver. The only way to be sure the file arrived intact is for the receiving application to check it — say with a checksum computed by the sender — and ask again if necessary. Since the end points must do this anyway, link-level reliability cannot replace it; it can only make the end-to-end check fail less often. That is why the internet's network layer is unreliable, why reliability lives in TCP on the hosts, and why some links (Wi-Fi, notably) still retransmit locally: the end-to-end argument permits it as a performance measure, because a lossy radio link would otherwise cause end-to-end retransmissions over the whole path.

::: intuition A letter in an envelope in an envelope
Layering is like a company's post room. A manager writes a letter (application data) and gives it to an assistant, who puts it in an envelope addressed to a colleague in another office (transport: which person). The post room puts that in a bag for the right city (network: which building), and the courier puts the bag in a van for the next depot (link: which hop). Each depot opens only the van, reads the bag's label, and loads it into a different van. Nobody but the colleague opens the envelope, and the manager does not care whether the vans are diesel or electric.
:::

## The architecture of the internet

The internet is a network of networks, run by tens of thousands of independent organisations.

- **Hosts** connect through an **access network**: a home's cable, DSL or fibre connection, a mobile network, a company or university's Ethernet and Wi-Fi.
- Access networks belong to, or buy service from, **internet service providers** (ISPs). Small, regional ISPs buy **transit** from larger ones, which buy from a few dozen global **tier-1** ISPs that reach every destination without paying anyone for transit. ISPs of similar size often **peer** — exchange traffic between their own customers without payment — directly or at **internet exchange points** (IXPs), buildings where many networks connect to a shared switch.
- Large content providers run their own global networks and data centres and connect directly to many access ISPs, bypassing the upper tiers for much of their traffic.

Each independently administered network is an **autonomous system** with its own routing policy; how traffic finds its way across tens of thousands of them is the subject of [[networks/routing]]. The protocols themselves are standards. The internet's are written by the Internet Engineering Task Force (IETF) and published as numbered **Requests for Comments**: IP is RFC 791 (1981), UDP RFC 768 (1980), TCP RFC 9293 (2022, replacing RFC 793 of 1981). Link-layer standards such as Ethernet (IEEE 802.3) and Wi-Fi (IEEE 802.11) come from the IEEE, and cellular standards from 3GPP. Throughout this course we cite RFC numbers so that you can read the definitive text: they are free, and the best of them are very readable.

### A network that was not designed for adversaries

The internet's early designers assumed users who trusted each other, and many of its protocols carry no authentication. Three classes of attack follow directly from the architecture, and each has a standard family of defences.

- **Eavesdropping.** A packet passes through many networks whose operators, or anyone who can tap a link or a shared Wi-Fi channel, can read it. The defence is end-to-end encryption at the transport or application layer — TLS ([[networks/application-layer]]) and QUIC — which hides content (though not, by itself, who is talking to whom).
- **Spoofing.** Nothing in IP stops a host writing any source address into a packet. Defences include filtering at the network edge, where an ISP drops packets from its customers whose source addresses do not belong to them (RFC 2827, "BCP 38"), and protocols that authenticate peers cryptographically instead of trusting addresses.
- **Denial of service.** Because packet switching shares capacity on demand, a flood of traffic from many compromised machines can exhaust a link or a server. Defences include over-provisioning, filtering and rate limiting close to the source, and spreading a service over many locations so that no single link is a target.

We return to each where the relevant protocol appears. The detailed study of attacks and defences is the subject of [[security]].

::: quiz
Which of the following statements about the internet's layers are true?
- [x] A router processes the network-layer header of each packet but not the transport-layer header.
- [ ] TCP guarantees delivery because IP retransmits lost packets on each link.
- [x] A new link technology can carry internet traffic without changes to TCP or HTTP.
- [ ] Every layer adds a header to every packet at every router along the path.
::: solution
Routers implement the physical, link and network layers only: they read the IP header to forward a datagram and never need the TCP header (except for features outside the layered model, such as firewalls and NAT, discussed in [[networks/network-layer]]). IP is best effort and does not retransmit; reliability is provided by TCP at the end hosts, following the end-to-end argument. Because IP is the narrow waist, a new link only has to carry IP datagrams. Routers strip and re-add only the link-layer frame; the IP, TCP and application headers are added once, by the sender.
:::
:::

::: history
Packet switching was invented twice. Paul Baran at the RAND Corporation proposed, in his 1964 series *On Distributed Communications*, a network of many redundant links over which "message blocks" are relayed hop by hop, so that a communications system could survive the loss of many of its nodes. Independently, Donald Davies at Britain's National Physical Laboratory proposed in 1965–66 a national network for computers and coined the word *packet*. Leonard Kleinrock's queueing theory of message-switched networks (his 1962 thesis, published as a book in 1964) supplied the mathematics. These ideas came together in the ARPANET, whose first link carried a message from UCLA to SRI on 29 October 1969. To connect the ARPANET with radio and satellite packet networks, Vint Cerf and Bob Kahn published "A Protocol for Packet Network Intercommunication" in May 1974: the design that became TCP and IP, split into two protocols in 1978. The ARPANET switched to TCP/IP on 1 January 1983, a date often given as the birth of the internet. Jerome Saltzer, David Reed and David Clark's "End-to-end arguments in system design" (*ACM Transactions on Computer Systems*, 1984) gave the architecture its most quoted principle, and Clark's "The design philosophy of the DARPA internet protocols" (SIGCOMM 1988) explained the priorities behind it — survivability first, accounting last.
:::

## Where this leads

The remaining chapters follow the layers from the top down. [[networks/application-layer]] studies the web, DNS and email, and [[networks/sockets]] shows how programs use the transport layer. [[networks/reliable-transport]] builds reliable delivery on an unreliable network, using the delay and bandwidth–delay product of this chapter to analyse it, and [[networks/tcp-congestion]] shows how TCP shares bottleneck links fairly. [[networks/network-layer]] and [[networks/routing]] explain IP addressing and how routes are computed across autonomous systems, and [[networks/link-layer]] and [[networks/wireless-mobile]] go down to Ethernet, Wi-Fi and cellular networks. The queueing model of [[#thm-mm1]] is developed in probability courses ([Maths Atlas: Markov chains](/learn/maths/)) and reappears in [[operating-systems]] and [[distributed-systems]].

::: summary
- **Packet switching** shares link capacity on demand; it supports many more bursty users than **circuit switching** ([[#ex-statmux]]) at the cost of variable delay and occasional loss.
- Store-and-forward transmission of $P$ packets over $N$ links takes $(N + P - 1)L/R$ ([[#prop-saf]]): cutting messages into packets pipelines the path.
- Nodal delay is processing + queueing + **transmission** ($L/R$) + **propagation** ($d/s$) ([[#def-delay]]); transmission depends on size and rate, propagation on distance.
- Queueing delay grows like $1/(1 - \rho)$ with utilisation $\rho$ ([[#thm-mm1]]); queues become long well before a link is full, and with finite buffers they cause loss.
- Throughput is limited by the **bottleneck** link ([[#prop-bottleneck]]); filling a path needs a **bandwidth–delay product** $R \times \text{RTT}$ of data in flight.
- The internet has five **layers** — application, transport, network, link, physical — with **encapsulation** of each layer's message in the one below, and IP as the narrow waist of the hourglass.
- The **end-to-end argument** places functions such as reliability at the end hosts; the network itself is best effort.
:::

## Exercises

::: exercise Transmission delay {level=1 check="120"}
How long does it take to transmit a 1500-byte packet onto a 100 Mb/s link? (Enter the answer in microseconds.)
::: solution
$L = 1500 \times 8 = 12000$ bits, so $d_\text{trans} = L/R = 12000 / 10^8\ \text{s} = 1.2 \times 10^{-4}$ s $= 120$ µs. The length of the link does not matter.
:::
:::

::: exercise Propagation delay {level=1 check="10"}
A fibre link is 2000 km long, and signals propagate at $2 \times 10^8$ m/s. What is its propagation delay, and does it depend on the link rate? (Enter the delay in milliseconds.)
::: solution
$d_\text{prop} = d/s = 2 \times 10^6 / (2 \times 10^8) = 10^{-2}$ s $= 10$ ms. It does not depend on the link rate or the packet size: a 1 Mb/s link and a 100 Gb/s link of the same length have the same propagation delay.
:::
:::

::: exercise Bandwidth–delay product in bytes {level=1 check="10"}
A path has a bottleneck rate of 1 Gb/s and a round-trip time of 80 ms. How many bytes must a sender have in flight to keep the path full, and how many 1500-byte packets is that? (Enter the number of megabytes, $1\ \text{MB} = 10^6$ bytes.)
::: solution
$R \times \text{RTT} = 10^9 \times 0.08 = 8 \times 10^7$ bits $= 10^7$ bytes $= 10$ MB, or $10^7 / 1500 \approx 6667$ full-sized packets. A sender with less data in flight cannot use the whole gigabit ([[#def-bdp]]).
:::
:::

::: exercise A queue at a busy router {level=2 check="5"}
Packets arrive at a router's output link as a Poisson process at 800 packets per second, and the link can send on average 1000 packets per second, with exponentially distributed transmission times. Using the M/M/1 model, find the mean number of packets at the link and the mean time a packet spends there. (Enter the mean time in milliseconds.)
::: solution
$\rho = 800/1000 = 0.8$. By [[#thm-mm1]], $\bar N = \rho/(1 - \rho) = 0.8/0.2 = 4$ packets, and $T = 1/(\mu - \lambda) = 1/(1000 - 800) = 0.005$ s $= 5$ ms. Check with Little's law: $\lambda T = 800 \times 0.005 = 4 = \bar N$. A packet whose own transmission takes 1 ms on average spends five times that at the link.
:::
:::

::: exercise When does queueing dominate? {level=2 check="0.9"}
In the M/M/1 model, at what utilisation $\rho$ is the mean time in the system exactly ten times the mean transmission time $1/\mu$? (Enter $\rho$.)
::: solution
By [[#eq-mm1]], $T \mu = 1/(1 - \rho)$. Setting $1/(1-\rho) = 10$ gives $1 - \rho = 0.1$, so $\rho = 0.9$. At 90% load, a packet waits on average nine transmission times before its own transmission begins.
:::
:::

::: exercise Which layer? {level=2}
For each task, name the layer of the internet stack that performs it, and say whether a router on the path takes part: (a) choosing which outgoing link leads towards the destination host; (b) delivering bytes to the right program on the destination host; (c) detecting that a frame was corrupted on a single Wi-Fi hop; (d) asking for a web page by name; (e) turning bits into light pulses in a fibre.
::: solution
(a) Network layer (IP forwarding, with routes computed by routing protocols); routers do this — it is their main job. (b) Transport layer (port numbers in TCP or UDP); only the hosts. (c) Link layer (the frame check sequence of 802.11); performed by the two nodes at the ends of that hop, which may be a host and an access point, or a router's interface. (d) Application layer (HTTP); only the hosts. (e) Physical layer; every node that transmits on a fibre, including routers.
:::
:::

::: exercise Statistical multiplexing with more users {level=2 check="0.0015"}
In the setting of [[#ex-statmux]] (a 10 Mb/s link; users who send at 1 Mb/s when active and are active independently with probability $0.1$), what is the probability, to two significant figures, that more than 10 of 40 users are active at once? (Enter the probability.)
::: solution
With $X \sim \Bin(40, 0.1)$,

$$
\Prob(X \ge 11) = 1 - \sum_{k=0}^{10} \binom{40}{k} (0.1)^k (0.9)^{40-k} \approx 0.00147,
$$

which is $0.0015$ to two significant figures (Python: `sum(comb(40,k)*0.1**k*0.9**(40-k) for k in range(11,41))` gives `0.0014697…`). The mean number active is $4$ and the standard deviation $\sqrt{40 \times 0.1 \times 0.9} \approx 1.9$, so $11$ active users is more than three and a half standard deviations above the mean.
:::
:::

::: exercise The best packet size {#exr-optimal-packet level=3 check="sqrt(1280000000)"}
A message of $M$ bits is sent over $N \ge 2$ store-and-forward links of rate $R$. It is cut into packets carrying $p$ bits of data each (assume $p$ divides $M$), and each packet also carries an $h$-bit header. Ignoring propagation and processing, (a) show that the transfer time is $T(p) = (N - 1 + M/p)(p + h)/R$; (b) treating $p$ as continuous, show that $T$ is minimised at $p^* = \sqrt{hM/(N - 1)}$; (c) evaluate $p^*$ for $M = 8 \times 10^6$, $N = 3$ and $h = 320$ (a 40-byte header). (Enter $p^*$ in bits.)
::: solution
(a) There are $P = M/p$ packets, each of $L = p + h$ bits, so [[#prop-saf]] gives $T = (N + M/p - 1)(p + h)/R$.

(b) Expand: $R\,T(p) = (N-1)p + (N-1)h + M + Mh/p$. Differentiating, $R\,T'(p) = (N - 1) - Mh/p^2$, which is negative for $p < p^*$ and positive for $p > p^*$ where $p^* = \sqrt{Mh/(N-1)}$, so $p^*$ is the global minimum on $p > 0$ (equivalently, $R\,T''(p) = 2Mh/p^3 > 0$, so $T$ is convex). Small packets pay too many headers ($Mh/p$); large packets lose pipelining ($(N-1)p$); the optimum balances the two terms, which are equal at $p^*$.

(c) $p^* = \sqrt{320 \times 8 \times 10^6 / 2} = \sqrt{1.28 \times 10^9} \approx 35777$ bits, about 4.5 kB, giving $T \approx 0.814$ s at $R = 10$ Mb/s, against $0.828$ s for $10^4$-bit packets. The minimum is shallow — the curve in the figure above is flat near $p^*$ — which is one reason real networks can fix a single maximum packet size for all traffic.
:::
:::

::: exercise Pipelining with propagation {level=3}
Generalise [[#prop-saf]]: suppose each of the $N$ links also has propagation delay $d_\text{prop}$, and each switch has processing delay $d_\text{proc}$ per packet (performed after the packet has fully arrived and before it is transmitted, and overlapping with the reception of later packets). Show that the last of $P$ back-to-back packets arrives at time $(N + P - 1)L/R + N d_\text{prop} + (N - 1) d_\text{proc}$, and evaluate it for $P = 800$ packets of $10^4$ bits over $N = 3$ links of 10 Mb/s, each 1000 km long ($s = 2 \times 10^8$ m/s), with $d_\text{proc} = 10$ µs.
::: solution
Let $\tau = L/R$ and $\delta_j = (j - 1)(d_\text{prop} + d_\text{proc})$, the fixed lateness that the first $j - 1$ links and switches add before link $j$. We claim packet $k$ finishes *transmission* onto link $j$ at time $(k + j - 1)\tau + \delta_j$. For $j = 1$ this is the back-to-back source, $k\tau$. For $j > 1$, packet $k$ is fully received at switch $j - 1$ at time $(k + j - 2)\tau + \delta_{j-1} + d_\text{prop}$, becomes ready $d_\text{proc}$ later, at $(k + j - 2)\tau + \delta_j$; link $j$ finishes packet $k - 1$ at $(k + j - 2)\tau + \delta_j$ by induction (or is idle if $k = 1$). Both conditions hold at the same moment, so packet $k$ finishes on link $j$ at $(k + j - 1)\tau + \delta_j$. The last bit then propagates over link $N$, arriving at $(P + N - 1)\tau + (N-1)(d_\text{prop} + d_\text{proc}) + d_\text{prop} = (N + P - 1)\tau + N d_\text{prop} + (N-1) d_\text{proc}$.

For the numbers: $\tau = 1$ ms, $d_\text{prop} = 10^6/(2 \times 10^8) = 5$ ms, so the time is $802 + 15 + 0.02 = 817.02$ ms. Propagation and processing add a fixed amount, paid once per link, not once per packet — another reason pipelining wins.
:::
:::
