When your laptop sends a packet to a web server, IP decides that the packet must go first to the router at the edge of your network. But the router is not reached by its IP address. The packet has to be put in a **frame** addressed to the router's network interface card, using a completely different kind of address, sent over a shared radio channel or an Ethernet cable on which other devices are also transmitting, protected by a code strong enough to catch the bit errors that the medium will occasionally introduce, and passed through one or more **switches** that have never been told where anyone is. Each of these tasks belongs to the **link layer**, the layer that moves a datagram across a single link.

A datagram crosses many links between source and destination — Wi-Fi, then Ethernet, then fibre between routers, then Ethernet again in a data centre — and each may use a different link-layer protocol. This chapter studies the problems they all share. We start with **error detection**: parity, the Hamming distance that governs what any code can do, and the cyclic redundancy checks used by Ethernet and Wi-Fi. Then **multiple access**: how many senders share one channel, from time slots to ALOHA (with its famous efficiency of $1/e$) to Ethernet's CSMA/CD. Then **Ethernet** and its 48-bit addresses, **ARP**, which maps IP addresses to them, and **switches**, which learn where hosts are, the spanning tree protocol that keeps switched networks free of loops, and virtual LANs. Wireless links, with their own access protocols, follow in [[networks/wireless-mobile]].

## Link-layer services

A link-layer protocol is implemented mostly in the **network interface** — the network adapter, or "network interface card" — in hardware and firmware, with the rest in the operating system's driver. Its services:

- **Framing**: encapsulating each datagram in a **frame** with a header (addresses, a type field saying which network-layer protocol the payload belongs to) and a trailer (an error-detecting code), and marking where frames begin and end.
- **Link access**: a **medium access control** (MAC) protocol decides when a node may transmit, which matters when several nodes share one broadcast channel.
- **Error detection**, and on some links **correction** or **reliable delivery** by retransmission — wireless links retransmit locally because their error rates are high ([[networks/network-principles#prop-e2e]] explains why this is a performance measure, not a substitute for end-to-end checks).
- **Flow control** between adjacent nodes, on some links.

Links are either **point-to-point** — one sender at each end, as on a fibre between two routers or a cable between a host and a switch — or **broadcast**, where many nodes share one channel and every node hears every transmission, as on Wi-Fi, a cable-modem network or the original Ethernet. Broadcast links need a multiple access protocol.

## Error detection and correction

Bits are flipped in transit by noise, interference and attenuation. The sender adds **error-detecting and -correcting** bits (EDC) to the data $D$; the receiver checks $D'$ and $\text{EDC}'$ — possibly altered — against each other. No code catches every error; the aim is to make undetected errors astronomically rare at low cost.

The simplest code is a single **parity bit**: append one bit so that the number of 1s is even. Any odd number of bit errors is detected, any even number is missed — a poor bet when errors come in **bursts**, as they usually do. **Two-dimensional parity** arranges the data in a grid and adds a parity bit to every row and every column; a single flipped bit then shows up in exactly one row and one column, which locates it, so it can be **corrected** without retransmission.

::: definition Hamming distance {#def-hamming}
The **Hamming distance** $d(u, v)$ between two bit strings of equal length is the number of positions in which they differ. The **minimum distance** of a code (a set of valid codewords) is the smallest Hamming distance between two different codewords.
:::

::: theorem Detection and correction capability {#thm-hamming}
A code with minimum distance $d$ detects every error pattern of at most $d - 1$ bits, and can correct every error pattern of at most $\lfloor (d-1)/2 \rfloor$ bits by decoding a received word to the nearest codeword. No code of minimum distance $d$ can do better in the worst case.
:::

::: proof
*Detection.* An error of $t \le d - 1$ bits turns codeword $c$ into a word at distance $t$ from $c$, with $1 \le t < d$, which cannot be another codeword; so the receiver sees an invalid word. *Correction.* Let $t \le \lfloor (d-1)/2 \rfloor$, so $2t < d$, and suppose $c$ was sent and $r$ received with $d(c, r) = t$. For any other codeword $c'$, the triangle inequality gives $d(c', r) \ge d(c', c) - d(c, r) \ge d - t > t$. So $c$ is the unique nearest codeword to $r$. *Optimality.* Take codewords $c, c'$ at distance $d$. Flipping the $d$ positions where they differ turns $c$ into $c'$, an undetectable error of $d$ bits. And there is a word $r$ with $d(c, r) = \lceil d/2 \rceil$ and $d(c', r) = \lfloor d/2 \rfloor$ (flip half of those positions); an error of $\lceil d/2 \rceil$ bits on $c$ produces $r$, which is at least as close to $c'$, so it cannot be corrected reliably.
:::

A single parity bit gives minimum distance 2 (detect one error, correct none). Two-dimensional parity has minimum distance 4 (changing one data bit also changes its row parity, its column parity and the parity bit in the corner, and no smaller change leaves every row and column even). Error-correcting codes with large minimum distance are used where retransmission is costly — deep-space links, storage media, and the physical layers of Wi-Fi and cellular radio — while most links only detect errors and drop bad frames.

### Cyclic redundancy checks

The error-detecting code of Ethernet, Wi-Fi and most other links is the **cyclic redundancy check** (CRC). It treats bit strings as polynomials with coefficients in $\set{0, 1}$, added and subtracted modulo 2 — that is, by XOR, with no carries.

::: definition Cyclic redundancy check {#def-crc}
Sender and receiver agree on a **generator** polynomial $G(x)$ of degree $r$, whose leading and constant coefficients are 1. For data bits $D$, read as a polynomial $D(x)$, the sender computes the remainder

$$
R(x) = x^r D(x) \bmod G(x)
$$

(of degree less than $r$, so $r$ bits) and transmits $D$ followed by $R$, which as a polynomial is $T(x) = x^r D(x) + R(x)$. Since subtraction is addition mod 2, $T(x)$ is divisible by $G(x)$. The receiver divides what it receives by $G(x)$ and accepts it if the remainder is zero.
:::

::: example A CRC by hand {#ex-crc}
Compute the CRC of $D = 110101$ with generator $G = 1011$ (that is, $x^3 + x + 1$, so $r = 3$), and check that a single-bit error is detected.
::: solution
Append $r = 3$ zeros and divide by $1011$ using XOR, placing the generator under each leading 1 in turn:

| step | bits after XOR with $G$ under the leading 1 |
|---|---|
| start | `110101000` |
| 1 | `011001000` |
| 2 | `001111000` |
| 3 | `000100000` |
| 4 | `000001100` |
| 5 | `000000111` |

The remainder is the last 3 bits, $R = 111$, and the frame carries $110101\,111$. The receiver divides $110101111$ by $1011$ and gets remainder $000$. If the last bit is flipped, to $110101110$, the remainder becomes $001$: the error is caught. (A Python function doing the same long division gives these remainders; with real CRCs, hardware does it with a shift register and a few XOR gates, at line rate.)
:::
:::

::: proposition What a CRC detects {#prop-crc}
Let $G(x)$ have degree $r$ and a nonzero constant term. An error pattern $E(x)$ (the positions of flipped bits) is undetected if and only if $G(x)$ divides $E(x)$. Consequently a CRC with generator $G$:

1. detects every **burst** error — all flipped bits within a window of $r$ consecutive bits;
2. detects every error with an odd number of flipped bits if $x + 1$ divides $G(x)$;
3. detects every single-bit error (a special case of 1).
:::

::: proof
The receiver gets $T(x) + E(x)$, whose remainder is $(T(x) + E(x)) \bmod G = E(x) \bmod G$ since $G \mid T$. So the error is missed iff $G \mid E$.

(1) A burst confined to $r$ consecutive positions has $E(x) = x^i B(x)$ with $B(x)$ nonzero of degree at most $r - 1$ and $B(0) = 1$ (the burst's lowest bit is flipped). $G$ cannot divide $B$, whose degree is smaller. And $G$ has no factor in common with $x^i$, because its constant term is 1, so $x$ does not divide $G$; since polynomials over the field of two elements factor uniquely, $G \mid x^i B$ would imply $G \mid B$. So $G \nmid E$.

(2) If $x + 1$ divides $G$ and $G$ divides $E$, then $x + 1$ divides $E$, so $E(1) = 0$. But $E(1)$ is the number of flipped bits modulo 2, so the number is even. Hence every odd-sized error is detected.
:::

Ethernet's CRC-32 uses $G(x) = x^{32} + x^{26} + x^{23} + x^{22} + x^{16} + x^{12} + x^{11} + x^{10} + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1$ (written `0x04C11DB7`). It detects all bursts of up to 32 bits and all errors of up to three bits in frames of Ethernet's size, and misses a random error pattern with probability about $2^{-32}$. Implementations add two twists: the register starts at all ones (so that leading zeros are not invisible) and the result is complemented, and bits are processed least significant first, matching the order in which Ethernet transmits them:

```python
# crc32.py: the CRC-32 of Ethernet and zlib, bit by bit, checked against zlib
import zlib

POLY = 0xEDB88320          # x^32 + x^26 + ... + 1 (0x04C11DB7) with its bits reversed

def crc32(data: bytes) -> int:
    crc = 0xFFFFFFFF                         # initial value: all ones
    for byte in data:
        crc ^= byte                          # bits are processed least significant first
        for _ in range(8):
            if crc & 1:
                crc = (crc >> 1) ^ POLY      # "subtract" (XOR) the generator
            else:
                crc >>= 1
    return crc ^ 0xFFFFFFFF                  # final complement

msg = b"The quick brown fox jumps over the lazy dog"
print(f"{crc32(msg):#010x} {zlib.crc32(msg):#010x}")
print(f"{crc32(b'123456789'):#010x}")        # the standard check value
bad = bytearray(msg); bad[10] ^= 0b00011100  # a 3-bit burst error
print(f"{crc32(bytes(bad)):#010x}  (changed: {crc32(bytes(bad)) != crc32(msg)})")
```

```console
$ python3 crc32.py
0x414fa339 0x414fa339
0xcbf43926
0x2fab629e  (changed: True)
```

The function agrees with the C implementation in `zlib`, and `0xcbf43926` is the standard check value of CRC-32 for the string `123456789`.

::: warning A CRC is not a cryptographic hash
A CRC is linear: the CRC of $D_1 \oplus D_2$ is determined by the CRCs of $D_1$ and $D_2$, and anyone can compute the CRC of anything. It is excellent against random errors and worthless against an adversary, who can alter a frame and fix up its CRC with a few XORs. Wired Equivalent Privacy, the first Wi-Fi security protocol (1997), used a CRC-32 as an integrity check inside its encryption; because both the CRC and the stream cipher are linear, attackers could flip chosen bits of encrypted frames and correct the encrypted CRC without knowing the key — one of several flaws for which WEP was abandoned. Integrity against attackers needs a keyed message authentication code ([[cryptography]]).
:::

## Multiple access protocols

On a broadcast channel of rate $R$ shared by $N$ nodes, two transmissions that overlap in time **collide** and are both lost. A **multiple access protocol** tells nodes when to transmit. Ideally: a single active node gets rate $R$; $M$ active nodes get about $R/M$ each; the protocol is decentralised; and it is simple. There are three families.

**Channel partitioning** divides the channel: **TDMA** gives each node a time slot in a repeating frame, **FDMA** a frequency band (and **CDMA**, used in 3G cellular networks, a code). These are fair and collision-free, but a node gets at most $R/N$ even when it is the only one with data — the disadvantage of circuit switching ([[networks/network-principles#def-switching]]).

**Taking turns** protocols pass the right to send around: a master **polls** each node in turn (Bluetooth works this way), or a **token** circulates among the nodes. They give an active node more than $R/N$, but the master or token is a single point of failure, and passing it costs time.

**Random access** protocols let a node transmit at the full rate $R$ whenever it likes, detect collisions, and retransmit after a random delay. They are decentralised and simple, and they are what Ethernet and Wi-Fi use. The question is how much capacity is lost to collisions.

### ALOHA

::: algorithm Slotted ALOHA {#alg-slotted-aloha}
Time is divided into slots of one frame time $L/R$, and nodes are synchronised to the slots.

1. A node with a new frame transmits it at the start of the next slot.
2. If no other node transmitted in that slot, the frame succeeds.
3. If there was a collision (detected at the end of the slot), the node retransmits the frame in each subsequent slot with probability $p$, independently, until it succeeds.
:::

::: theorem Efficiency of slotted ALOHA {#thm-aloha}
Suppose $N$ nodes always have frames to send, and each transmits in each slot with probability $p$, independently. The probability that a slot carries a successful transmission is $N p (1 - p)^{N - 1}$. It is maximised at $p = 1/N$, where it equals $(1 - 1/N)^{N-1}$, which decreases to $1/e \approx 0.368$ as $N \to \infty$.
:::

::: proof
A slot succeeds when exactly one node transmits: any of the $N$ nodes, with probability $p$, while the other $N - 1$ do not, each with probability $1 - p$. So $f(p) = N p (1 - p)^{N-1}$. Differentiating,

$$
f'(p) = N (1 - p)^{N-2} \bigl( (1 - p) - (N - 1)p \bigr) = N (1 - p)^{N-2} (1 - N p),
$$

which is positive for $p < 1/N$ and negative for $p > 1/N$ (when $0 < p < 1$), so the maximum is at $p = 1/N$, with $f(1/N) = (1 - 1/N)^{N-1}$. Writing $(1 - 1/N)^{N-1} = (1 - 1/N)^N / (1 - 1/N)$ and using $(1 - 1/N)^N \to 1/e$ gives the limit $1/e$. The sequence is decreasing because $\ln$ of it, $(N-1)\ln(1 - 1/N)$, decreases in $N$ (a calculus exercise).
:::

So at best about 37% of the slots carry data, 37% are empty and 26% have collisions. **Pure ALOHA** — the original protocol of Norman Abramson's ALOHAnet radio network in Hawaii (1971), without slots — does worse: a frame sent at time $t_0$ collides with any frame that starts in $(t_0 - L/R, t_0 + L/R)$, a vulnerable period twice as long, and the maximum efficiency halves to $1/(2e) \approx 0.18$ ([[#exr-pure-aloha]]).

::: widget plot
f: N*x*(1 - x)^(N - 1); N*x*(1 - x)^(2*(N - 1))
x: 0, 1
y: 0, 0.6
sliders: N=10:2:100:1
labels: \text{slotted ALOHA}; \text{pure ALOHA}
caption: The fraction of time carrying successful frames when $N$ always-busy nodes each transmit with probability $x = p$ ([[#thm-aloha]] and [[#exr-pure-aloha]]). The slotted curve peaks at $p = 1/N$ with height $(1 - 1/N)^{N-1}$; move $N$ and watch the peak slide left and settle near $1/e \approx 0.37$, and the pure-ALOHA peak near $1/(2e) \approx 0.18$. Notice how sharply efficiency falls when $p$ is too large: too eager a retransmission policy turns the channel into a stream of collisions — the reason Ethernet adapts its retransmission probability to the load.
:::

### CSMA/CD and Ethernet's back-off

Two simple improvements remove most collisions. **Carrier sensing** (CSMA): listen before transmitting, and wait if the channel is busy. Collisions can still happen, because a signal takes time to propagate: a node that starts transmitting cannot be heard by a distant node until $d_\text{prop}$ later, and that node may start in the meantime. **Collision detection** (CD): keep listening while transmitting, and stop as soon as a collision is detected, instead of wasting the rest of the frame time.

::: algorithm Ethernet CSMA/CD (classic shared Ethernet) {#alg-csmacd}
1. When a frame is ready, sense the channel; wait while it is busy, then transmit.
2. While transmitting, monitor the channel. If the whole frame is sent without detecting another signal, it is done.
3. If a collision is detected, stop and send a short **jam** signal so that every node detects the collision.
4. **Binary exponential back-off**: after the $n$-th consecutive collision of this frame, choose $K$ uniformly at random from $\set{0, 1, \dots, 2^{\min(n, 10)} - 1}$, wait $K \cdot 512$ bit times, and return to step 1. After 16 attempts, give up.
:::

The back-off adapts to the number of active nodes without knowing it: after one collision, two colliding nodes pick from $\set{0, 1}$ and collide again with probability $1/2$; after the $n$-th, the range has grown to $2^n$ values and a few colliding nodes are unlikely to choose the same one. Effectively the transmission probability $p$ of [[#thm-aloha]] is tuned towards $1/(\text{number of active nodes})$.

For collision detection to work, a sender must still be transmitting when the evidence of a collision comes back to it. The worst case is a collision with a node at the far end of the cable that starts just before the first signal arrives; its signal takes another $d_\text{prop}$ to return. So the **minimum frame** must last at least the round-trip propagation time, $2 d_\text{prop}$. Classic 10 Mb/s Ethernet fixed the **slot time** at 512 bit times, 51.2 µs, which (with repeaters' delays) bounded the network's diameter at about 2.5 km, and gave the minimum frame size of 64 bytes, which Ethernet keeps to this day.

An approximate analysis due to Metcalfe and Boggs gives the efficiency of CSMA/CD with many busy nodes as about

$$
E \approx \frac{1}{1 + 5\, d_\text{prop}/d_\text{trans}},
$$

where $d_\text{trans}$ is the time to transmit a maximum-size frame. It approaches 1 when propagation is short compared with frames, which is why CSMA/CD works so much better than ALOHA on a LAN: collisions are detected quickly and cost only a fraction of a frame.

::: example Classic Ethernet efficiency {#ex-csmacd}
A 10 Mb/s shared Ethernet spans 2.5 km with propagation speed $2 \times 10^8$ m/s and carries 1500-byte frames. Estimate its efficiency, and the efficiency if the same cable ran at 1 Gb/s.
::: solution
$d_\text{prop} = 2500/(2 \times 10^8) = 12.5$ µs and $d_\text{trans} = 12000/10^7 = 1.2$ ms, so $d_\text{prop}/d_\text{trans} \approx 0.0104$ and $E \approx 1/(1 + 0.052) \approx 0.95$. At 1 Gb/s, $d_\text{trans} = 12$ µs, the ratio is about $1.04$, and $E \approx 1/(1 + 5.2) \approx 0.16$ — little better than ALOHA. Worse, a 64-byte frame lasts only $0.512$ µs at 1 Gb/s, during which a signal travels about 100 m, so collision detection would fail on any longer cable. This is one reason fast Ethernet abandoned shared cables for switched, full-duplex links, on which there are no collisions at all.
:::
:::

## Ethernet, addresses and ARP

Ethernet, invented at Xerox PARC in 1973, standardised as IEEE 802.3 and running at rates from 10 Mb/s to 800 Gb/s (as of 2026), is the dominant wired LAN technology. The early versions used a shared coaxial cable with CSMA/CD; since the late 1990s almost all Ethernet has been **switched**: every host has its own full-duplex cable to a switch port, so there is no shared medium and no collisions, and the MAC protocol of [[#alg-csmacd]] survives only in the standard. What has survived intact is the frame format.

::: definition MAC addresses and the Ethernet frame {#def-ethernet}
A **MAC address** (link-layer address) is 48 bits, written as six hexadecimal bytes such as `00:1b:21:3a:4f:5c`. Manufacturers assign them from blocks whose first three bytes (the **OUI**) identify the manufacturer; the second-lowest bit of the first byte marks **locally administered** addresses (many devices now use random local addresses on Wi-Fi for privacy), and the lowest bit marks **group** (multicast) addresses. `ff:ff:ff:ff:ff:ff` is the **broadcast** address, received by every interface on the LAN.

An Ethernet frame consists of:

| field | bytes | purpose |
|---|---|---|
| preamble and start-of-frame delimiter | 7 + 1 | alternating bits to synchronise the receiver's clock; `10101011` |
| destination address | 6 | |
| source address | 6 | |
| EtherType | 2 | payload protocol: `0x0800` IPv4, `0x86DD` IPv6, `0x0806` ARP |
| payload | 46–1500 | padded to at least 46 bytes |
| frame check sequence | 4 | CRC-32 of the addresses, type and payload |
:::

An adapter accepts a frame whose destination is its own address, the broadcast address or a multicast group it has joined, and discards others. Ethernet provides no acknowledgements: a frame with a bad CRC is simply dropped, and recovery, if any, is left to higher layers. The minimum payload of 46 bytes makes the minimum frame 64 bytes from destination to CRC, the slot-time minimum.

Why have link-layer addresses at all, when hosts have IP addresses? Because the layers are independent: an adapter's MAC address is fixed when it is made and works on any LAN, whatever network-layer protocol is used, while IP addresses depend on where a host is attached and are assigned by the network ([[networks/network-layer#def-cidr]]). Something must translate between them.

::: definition Address Resolution Protocol {#def-arp}
To send an IPv4 datagram to an address $a$ on its own subnet, a host needs $a$'s MAC address. The **Address Resolution Protocol** (ARP, RFC 826) keeps an **ARP table** of (IP address, MAC address, expiry time) entries. If $a$ is not in the table, the host broadcasts an **ARP request** — "who has $a$? tell (my IP address, my MAC address)" — in a frame to `ff:ff:ff:ff:ff:ff`. The interface with address $a$ replies directly, in a unicast frame, with its MAC address; both sides record the mapping, which expires after a time (minutes) unless refreshed. IPv6 uses the equivalent **neighbour discovery** protocol (RFC 4861), with ICMPv6 messages sent to multicast addresses instead of broadcasts.
:::

::: example Sending to another subnet {#ex-arp}
Host A (`192.0.2.10/24`, MAC `02:00:00:00:00:0a`) sends a datagram to server S (`198.51.100.7`) on another subnet. A's default gateway is router R, whose interface on A's subnet is `192.0.2.1` with MAC `02:00:00:00:00:01`. A's ARP table is empty. List the frames A sends and the addresses in them.
::: solution
1. A compares `198.51.100.7` with its own prefix `192.0.2.0/24`: not local, so the next hop is the gateway `192.0.2.1` ([[networks/network-layer#def-cidr]]).
2. A has no MAC address for `192.0.2.1`, so it broadcasts an ARP request: destination MAC `ff:ff:ff:ff:ff:ff`, source `02:00:00:00:00:0a`, EtherType `0x0806`, asking who has `192.0.2.1`.
3. R replies with a unicast ARP reply to `02:00:00:00:00:0a`: `192.0.2.1` is at `02:00:00:00:00:01`. A caches it.
4. A sends the datagram in a frame with destination MAC `02:00:00:00:00:01` (R's), source `02:00:00:00:00:0a`, EtherType `0x0800`; inside, the IP header has destination `198.51.100.7` (S's) and source `192.0.2.10`.

The IP destination is S throughout, but the MAC destination is the *next hop*, R. R strips the frame, looks up S in its forwarding table, and puts the same datagram in a new frame — with new MAC addresses — for the next link. A never learns, or needs, S's MAC address.
:::
:::

ARP has no authentication: any host on the LAN can send ARP replies claiming any IP address, and others will update their tables. An attacker can thereby redirect a victim's traffic for the gateway to itself — **ARP spoofing** — and read or alter it. Defences include **dynamic ARP inspection** on managed switches, which drops ARP replies that do not match the addresses the switch saw assigned by DHCP; static ARP entries for critical hosts; and, most fundamentally, end-to-end encryption (TLS), which makes intercepted traffic useless. The same lesson as before: protocols designed for cooperative networks need defences added in layers, and encryption at the ends protects against weaknesses anywhere in between.

## Switches

A **switch** connects many Ethernet links and forwards frames between them, looking only at link-layer headers. It is **transparent**: hosts address frames to each other, not to the switch, and do not know it is there. It is also **self-learning**: it builds its forwarding table without configuration.

::: algorithm Self-learning switch {#alg-switch}
The switch table has entries (MAC address, port, time). When a frame arrives on port $i$ with source $s$ and destination $t$:

1. **Learn**: record (or refresh) the entry ($s$, $i$, now).
2. **Forward**: if $t$ is in the table on port $j$: if $j = i$, discard the frame (**filtering**: source and destination are on the same segment); otherwise send it on port $j$ only. If $t$ is not in the table, or is the broadcast address, send the frame on every port except $i$ (**flooding**).
3. Remove entries older than an **ageing time** (typically 300 s), so that the table follows hosts that move.
:::

::: example A switch learning {#ex-switch}
A switch with ports 1–4 has hosts A on port 1, B on port 2, C on port 3 and D on port 4, and an empty table. Frames are sent in this order: A → D, D → A, B → A, C → B, A → C. For each, say which ports the switch sends it on and what it learns.
::: solution
| frame | learned | table lookup | sent on |
|---|---|---|---|
| A → D | A at 1 | D unknown | 2, 3, 4 (flood) |
| D → A | D at 4 | A at 1 | 1 |
| B → A | B at 2 | A at 1 | 1 |
| C → B | C at 3 | B at 2 | 2 |
| A → C | (A refreshed) | C at 3 | 3 |

Only the first frame is flooded; once each host has sent a frame, the switch knows where it is. B and C received a copy of the first frame, addressed to D, and discarded it in their adapters.
:::
:::

Switches have a vulnerability of their own: their tables are finite. An attacker flooding a switch with frames from millions of invented source addresses fills the table, after which frames to unknown — that is, all evicted — destinations are flooded to every port, where the attacker can see them. **Port security** features limit the number of addresses learned per port and so prevent this.

### Loops and the spanning tree

For reliability, LANs are often wired with redundant links between switches. But a loop is disastrous for self-learning switches: a broadcast frame is flooded round the loop for ever — there is no TTL in Ethernet — and multiplies at every switch with more than two ports in the loop, until the links are saturated (a **broadcast storm**).

The **spanning tree protocol** (STP, IEEE 802.1D; today usually its faster successor RSTP, 802.1w) disables enough ports to make the active topology a tree. Switches exchange messages called **bridge protocol data units** and (1) elect as **root** the switch with the smallest identifier (a configurable priority followed by its MAC address); (2) each other switch computes its least-cost path to the root — a distributed shortest-path computation like distance-vector routing ([[networks/routing#alg-dv]]) — and keeps the port on that path as its **root port**; (3) on each LAN segment the switch with the cheapest path to the root forwards for that segment (its **designated port**); every other port is **blocked** for data frames. The active links form a tree spanning all switches, so every frame has exactly one path; if a link fails, the switches recompute the tree and unblock ports as needed. Radia Perlman, who designed the algorithm at Digital Equipment Corporation in 1985, summed it up in a poem, "Algorhyme": "I think that I shall never see / a graph more lovely than a tree."

### Switches, routers and virtual LANs

Switches and routers both forward packets, at different layers. Switches are plug-and-play and fast, but every host must learn every other's MAC address and broadcast traffic (ARP, DHCP) reaches every host, so a single switched LAN does not scale beyond a few thousand hosts; and the spanning tree uses only a tree of the links. Routers need configuration (addresses, routing protocols), but they confine broadcasts, use all links through routing, and scale to the internet. Large networks therefore combine both: switched LANs of moderate size, joined by routers.

Within a switched network, **virtual LANs** (VLANs, IEEE 802.1Q) divide one physical network into several logical ones: each switch port is assigned to a VLAN, frames are flooded only within their VLAN, and traffic between VLANs must go through a router, as if they were separate LANs. Links between switches (**trunks**) carry frames of many VLANs, each marked with a 4-byte **802.1Q tag** containing a 12-bit VLAN identifier (so at most 4,094 VLANs; the values 0 and 4095 are reserved) and a 3-bit priority. VLANs let an organisation separate departments, guests and devices without rewiring, and keep broadcast domains small.

Data centres push all of this to extremes: tens of thousands of servers connected by many layers of switches and routers in a **Clos** topology — a multi-rooted tree with many equal-cost paths between any two racks — with routing (often BGP, inside the data centre) and equal-cost multipath used instead of spanning trees, so that every link carries traffic.

::: quiz
Which statements about switches are true?
- [x] A switch floods a frame whose destination MAC address is not in its table.
- [ ] A switch replaces the source MAC address of a frame with its own before forwarding it.
- [x] Without the spanning tree protocol, a loop of switches can circulate a broadcast frame indefinitely.
- [ ] Hosts must be configured with the address of the switch they are connected to.
::: solution
Switches flood unknown destinations ([[#alg-switch]]) and forward frames unchanged — they are transparent, which is also why hosts need no configuration for them. (A *router* does rewrite the link-layer addresses: [[#ex-arp]].) Ethernet frames have no hop limit, so a loop without spanning tree circulates broadcasts until the network is saturated.
:::
:::

::: history
Robert Metcalfe and David Boggs built the first Ethernet at Xerox PARC in 1973, running at 2.94 Mb/s on a coaxial cable, inspired by Norman Abramson's ALOHAnet — a packet radio network linking the islands of the University of Hawaii from 1971 — and described it in "Ethernet: distributed packet switching for local computer networks" (*Communications of the ACM*, 1976). Digital, Intel and Xerox published a 10 Mb/s specification in 1980, which became IEEE 802.3 in 1983. Lawrence Roberts proposed slotted ALOHA in 1972, doubling ALOHA's efficiency. W. Wesley Peterson introduced cyclic codes for error detection in 1961; Richard Hamming had published his distance and the first single-error-correcting codes in 1950. Radia Perlman designed the spanning tree algorithm in 1985, and switched Ethernet displaced shared cables during the 1990s.
:::

## Where this leads

Wireless links share many ideas of this chapter — random access, link-layer retransmission, MAC addresses — but replace collision detection with collision avoidance, for reasons explained in [[networks/wireless-mobile]]. Error-correcting codes are developed in coding theory, with algebraic foundations in [Maths Atlas](/learn/maths/); the hardware of network adapters and shift-register CRCs belongs to the [Electrical Engineering Atlas](/learn/ee/). Network security at the link layer — 802.1X port authentication, Wi-Fi encryption — is part of [[security]].

::: summary
- The link layer moves frames across one link: framing, medium access, error detection, sometimes reliable delivery; it is implemented largely in the network adapter.
- A code of minimum **Hamming distance** $d$ detects $d - 1$ errors and corrects $\lfloor (d-1)/2 \rfloor$ ([[#thm-hamming]]). **CRCs** divide by a generator polynomial modulo 2 ([[#def-crc]]) and catch all bursts of up to $r$ bits and, if $x + 1 \mid G$, all odd-sized errors ([[#prop-crc]]); they offer no protection against attackers.
- Multiple access: channel partitioning, taking turns, or **random access**. Slotted ALOHA's efficiency is at most $(1 - 1/N)^{N-1} \to 1/e$ ([[#thm-aloha]]); pure ALOHA's $1/(2e)$.
- **CSMA/CD** with **binary exponential back-off** ([[#alg-csmacd]]) made shared Ethernet efficient when propagation is short compared with frames; the minimum frame of 64 bytes comes from the collision-detection slot.
- **Ethernet** frames carry 48-bit MAC addresses, an EtherType and a CRC-32 ([[#def-ethernet]]); **ARP** maps IP addresses to MAC addresses on a subnet ([[#def-arp]]) and needs protection against spoofing.
- **Self-learning switches** build their tables from source addresses and flood unknown destinations ([[#alg-switch]]); the **spanning tree protocol** removes loops; **VLANs** split one switched network into several broadcast domains.
:::

## Exercises

::: exercise What a code can do {level=1 check="3"}
A code has minimum Hamming distance 4. How many bit errors can it always detect, and how many can it always correct? (Enter the number it can detect.)
::: solution
By [[#thm-hamming]] it detects up to $d - 1 = 3$ errors and corrects up to $\lfloor 3/2 \rfloor = 1$. It can therefore be used to correct single errors while still detecting (but not correcting) double errors — "SECDED", the scheme used in ECC memory.
:::
:::

::: exercise A CRC remainder {level=1 check="3"}
Compute the CRC remainder $R$ for data $D = 101110$ and generator $G = 1001$. (Enter $R$ as a decimal number.)
::: solution
Append three zeros: $101110000$. XOR $1001$ under each leading 1: $101110000 \to 001010000 \to 000011000 \to 000001010 \to 000000011$. So $R = 011$, which is $3$. The transmitted bits are $101110\,011$, and dividing them by $1001$ leaves remainder $0$.
:::
:::

::: exercise The Ethernet minimum frame {level=1 check="64"}
Classic 10 Mb/s Ethernet requires each frame to last at least 512 bit times. How many bytes is that, and how long does a minimum frame last in microseconds? (Enter the number of bytes.)
::: solution
$512/8 = 64$ bytes, lasting $512/10^7$ s $= 51.2$ µs. A shorter frame could finish before news of a collision with a node at the far end of a 2.5 km network returned, and the sender would wrongly believe it had succeeded.
:::
:::

::: exercise Slotted ALOHA with ten nodes {level=2 check="0.9^9"}
Ten nodes always have frames to send over a slotted ALOHA channel. What transmission probability maximises the efficiency, and what is the maximum efficiency? (Enter the efficiency.)
::: solution
By [[#thm-aloha]], $p = 1/N = 0.1$, giving efficiency $(1 - 1/10)^{9} = 0.9^9 \approx 0.387$ — a little above the limit $1/e \approx 0.368$.
:::
:::

::: exercise Waiting after collisions {level=2 check="179.2"}
On 10 Mb/s Ethernet, a frame has just suffered its third collision. What is the expected back-off time before the node senses the channel again? (Enter the time in microseconds.)
::: solution
After the third collision $K$ is uniform on $\set{0, \dots, 2^3 - 1} = \set{0, \dots, 7}$, with mean $3.5$. Each unit is $512$ bit times $= 51.2$ µs, so the expected wait is $3.5 \times 51.2 = 179.2$ µs. After the tenth collision the range stops growing at $\set{0, \dots, 1023}$, a mean wait of about $26$ ms.
:::
:::

::: exercise A switch with a hub {level=2}
In [[#ex-switch]], suppose hosts A and E are both connected to port 1 through an old hub (which repeats every frame to all its ports). Starting from an empty table, frames are sent: A → E, E → A, A → B. For each, say what the switch does, and why it is right to discard a frame.
::: solution
A → E: the switch learns A at port 1; E is unknown, so it floods on ports 2–4. (E has also received the frame directly through the hub.) E → A: it learns E at port 1; A is at port 1, the port the frame arrived on, so the switch **filters** (discards) it — A has already received it through the hub, and sending it anywhere else would waste bandwidth. A → B: A refreshed at port 1; B unknown, flood on 2–4. The filtering rule is exactly what lets a switch connect shared segments without forwarding their local traffic.
:::
:::

::: exercise Pure ALOHA {#exr-pure-aloha level=3}
In pure (unslotted) ALOHA, each of $N$ nodes always has frames and starts a transmission in any interval of one frame time with probability $p$, independently (a discrete approximation). (a) Argue that a frame starting at $t_0$ succeeds if no other node starts in $(t_0 - L/R, t_0 + L/R)$, and that the efficiency is $N p (1 - p)^{2(N-1)}$. (b) Show that it is maximised at $p = 1/(2N - 1)$ and that the maximum tends to $1/(2e)$. (c) Evaluate it for $N = 10$.
::: solution
(a) A frame occupies $[t_0, t_0 + L/R]$. Another frame overlaps it if it starts in $(t_0 - L/R, t_0 + L/R)$: before $t_0$, if it has not finished by $t_0$; after $t_0$, if it starts before our frame ends. That window is two frame times, so each other node stays silent in it with probability $(1-p)^2$, and the efficiency is $Np(1-p)^{2(N-1)}$.

(b) Let $f(p) = Np(1-p)^{2N-2}$. Then $f'(p) = N(1-p)^{2N-3}\bigl((1-p) - (2N-2)p\bigr) = N(1-p)^{2N-3}(1 - (2N-1)p)$, positive below $p^* = 1/(2N-1)$ and negative above, so $p^*$ is the maximum. There, $f(p^*) = \tfrac{N}{2N-1}\left(1 - \tfrac{1}{2N-1}\right)^{2N-2}$. As $N \to \infty$, $\tfrac{N}{2N-1} \to \tfrac12$ and $\left(1 - \tfrac{1}{2N-1}\right)^{2N-2} \to e^{-1}$, so the maximum tends to $1/(2e) \approx 0.184$.

(c) $N = 10$: $p^* = 1/19$ and $f(p^*) = \tfrac{10}{19}\left(\tfrac{18}{19}\right)^{18} \approx 0.199$ — about half of slotted ALOHA's $0.387$ for the same $N$, as the figure shows.
:::
:::

::: exercise A table-driven CRC-32 {level=3}
The bitwise `crc32` above does eight steps per byte. Real software precomputes a 256-entry table so that each byte costs one lookup. (a) Explain why the effect of processing one byte depends only on the low 8 bits of the register XORed with the byte, followed by a shift of the rest. (b) Implement the table-driven version, check it against `zlib.crc32` on random inputs, and compare running times.
::: solution
(a) In the bitwise loop, after `crc ^= byte` each of the eight steps shifts right by one and XORs `POLY` depending only on the current low bit. Over eight steps, the bits that decide the XORs are the eight low bits of `crc ^ byte` (each XOR of `POLY` can change the bits that will be tested later, but only as a function of those same eight bits). The upper 24 bits are just shifted right by 8 and XORed with a combination of `POLY` shifts determined by the low 8 bits. So the eight steps compute `(crc >> 8) ^ TABLE[(crc ^ byte) & 0xFF]`, where `TABLE[i]` is the result of the eight steps applied to `i` alone (linearity of XOR).

(b)
```python
import os, time, zlib

POLY = 0xEDB88320

def make_table():
    table = []
    for i in range(256):
        c = i
        for _ in range(8):
            c = (c >> 1) ^ POLY if c & 1 else c >> 1
        table.append(c)
    return table

TABLE = make_table()

def crc32_table(data):
    crc = 0xFFFFFFFF
    for byte in data:
        crc = (crc >> 8) ^ TABLE[(crc ^ byte) & 0xFF]
    return crc ^ 0xFFFFFFFF

def crc32_bitwise(data):
    crc = 0xFFFFFFFF
    for byte in data:
        crc ^= byte
        for _ in range(8):
            crc = (crc >> 1) ^ POLY if crc & 1 else crc >> 1
    return crc ^ 0xFFFFFFFF

for n in (0, 1, 7, 1000):
    d = os.urandom(n)
    assert crc32_table(d) == crc32_bitwise(d) == zlib.crc32(d)
data = os.urandom(200_000)
for f in (crc32_bitwise, crc32_table, zlib.crc32):
    t = time.perf_counter(); f(data); print(f.__name__, f"{time.perf_counter() - t:.4f} s")
```

```console
$ python3 crctable.py
crc32_bitwise 0.1780 s
crc32_table 0.0253 s
crc32 0.0001 s
```

All three agree. On the test machine the table-driven version is about seven times faster than the bitwise one, and `zlib`'s C implementation (which uses wider tables and, where available, the processor's carry-less multiplication instructions) is faster again by a factor of several hundred: in production, use the library.
:::
:::
