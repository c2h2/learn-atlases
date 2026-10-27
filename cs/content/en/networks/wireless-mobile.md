Sit next to a Wi-Fi access point and a download may run at hundreds of megabits per second; walk to the far end of the building, behind two concrete walls, and it slows to a trickle — although nothing about the network beyond the access point has changed. Step outside, and your phone switches to the mobile network; the video call you were on carries on, perhaps after a pause, although your device now has a different IP address, reached through a different operator's equipment. And on a congested radio link, a TCP connection may crawl even when the link has capacity to spare, because TCP mistakes every corrupted frame for a sign of congestion.

Wireless and mobile networking differ from the wired networks of the previous chapters in two separate ways. **Wireless** is a property of the link: signals weaken with distance, bounce off walls, interfere with each other, and cannot be heard by every station, so error rates are high and variable and the multiple access problem is harder than on a cable. **Mobility** is a property of the user: a device moves from one point of attachment to another, possibly between networks, and the network must keep delivering its packets. This chapter studies both: radio links and the Shannon limit on their capacity; Wi-Fi's CSMA/CA protocol and its frame format; the architecture of cellular networks; how mobility is handled, from Mobile IP to cellular handover; and finally what wireless links do to TCP and how protocols compensate. It draws on [[networks/link-layer]] for multiple access and on [[networks/tcp-congestion]] for congestion control.

## Wireless links

A radio signal spreads out as it travels, so its power falls with distance — in free space with the square of the distance, and much faster indoors and through obstacles. **Free-space path loss** in decibels is

$$
\text{FSPL} = 20 \log_{10} d + 20 \log_{10} f - 147.55\ \text{dB}
$$ {#eq-fspl}

for distance $d$ in metres and frequency $f$ in hertz: at 2.4 GHz the signal is about $60$ dB (a factor of a million) weaker after 10 m, and each tenfold increase in distance costs another $20$ dB. Higher frequencies lose more and pass through walls less well, which is why the 6 GHz band of recent Wi-Fi has shorter range than 2.4 GHz. Signals also reflect off surfaces and arrive by several paths of different lengths, which add constructively or destructively — **multipath fading** — so the received power can change by orders of magnitude when a device moves a few centimetres. And other transmitters in the same band — other networks, Bluetooth devices, microwave ovens at 2.4 GHz — add **interference**.

::: definition Signal-to-noise ratio {#def-snr}
The **signal-to-noise ratio** (SNR) at a receiver is the ratio of the received signal power to the power of noise (and, in the **SINR**, interference) in the same band, usually given in decibels: $\text{SNR}_\text{dB} = 10 \log_{10}(P_\text{signal}/P_\text{noise})$. A **modulation** scheme maps bits to signals; at a given SNR, schemes that pack more bits into each symbol (such as 256-QAM, 8 bits per symbol) have a higher **bit error rate** (BER) than robust ones (such as BPSK, 1 bit per symbol).
:::

How fast can a channel carry data at a given SNR? Claude Shannon answered in 1948, with a theorem that sets an absolute limit no engineering can beat.

::: theorem Shannon–Hartley capacity {#thm-shannon}
A channel of bandwidth $B$ hertz with additive white Gaussian noise and signal-to-noise ratio $\text{SNR}$ (as a power ratio) has capacity

$$
C = B \log_2 (1 + \text{SNR})\ \text{bits per second}:
$$ {#eq-shannon}

for every rate below $C$ there are codes that transmit with error probability as small as desired, and at every rate above $C$ the error probability is bounded away from zero.
:::

We state this result without proof; it belongs to information theory, and its proof — a random-coding argument for achievability and a converse from Fano's inequality — is in Cover and Thomas's *Elements of Information Theory*. Two consequences matter here. Capacity grows linearly with bandwidth, which is why each Wi-Fi generation has used wider channels (20, 40, 80, 160 and, in Wi-Fi 7, 320 MHz). And it grows only logarithmically with SNR at high SNR, so doubling the transmit power adds just $B$ bits per second ([[#exr-shannon-regimes]]).

::: example The capacity of a Wi-Fi channel {#ex-shannon}
A 20 MHz channel has an SNR of 25 dB. What is its Shannon capacity? What if the device moves away and the SNR falls to 5 dB?
::: solution
25 dB is a power ratio of $10^{2.5} \approx 316$. By [[#eq-shannon]], $C = 20 \times 10^6 \times \log_2 317 \approx 20 \times 10^6 \times 8.31 \approx 166$ Mb/s. At 5 dB (ratio $10^{0.5} \approx 3.16$), $C = 20 \times 10^6 \times \log_2 4.16 \approx 41$ Mb/s. Real systems achieve a large fraction of capacity with modern codes, so Wi-Fi adapts: **rate adaptation** algorithms choose, frame by frame, the modulation and coding scheme that the current SNR supports, falling back to slower, more robust ones as the signal weakens. That is the slow download at the far end of the building.
:::
:::

::: widget plot
f: B*log2(1 + 10^(x/10))
x: -10, 40
y: 0, 1000
sliders: B=20:20:320:20
labels: C\ \text{(Mb/s)}
caption: Shannon capacity in Mb/s against the SNR $x$ in decibels for a channel of $B$ MHz ([[#thm-shannon]]). Notice that the curve is nearly a straight line in decibels at high SNR — each extra 3 dB (doubling the power) adds only $B$ Mb/s — while widening the channel scales the whole curve. Try $B = 320$ (a Wi-Fi 7 channel) at 30 dB, then $B = 20$ at the same SNR. Below about 0 dB the capacity is small but not zero: data can be sent even when the noise is stronger than the signal, at low rate, which is how deep-space probes and some cellular modes work.
:::

Two more properties of radio make multiple access hard. A station cannot hear other transmissions while it is itself transmitting — its own signal, at the antenna, is millions of times stronger than anything arriving — so **collision detection is impossible**. And not every station hears every other: in the **hidden terminal** problem, stations A and C are both in range of an access point B but out of range of each other (too far apart, or separated by an obstacle), so neither can sense the other's transmissions and both may transmit at once, colliding at B.

## Wi-Fi

Wi-Fi is the IEEE 802.11 family of wireless LAN standards. Stations (hosts) associate with an **access point** (AP), and the AP with its stations forms a **basic service set** (BSS), named by an **SSID**; the AP connects to a wired network, usually through an Ethernet switch. Stations can also form an **ad hoc** network without an AP. A station joins by **scanning** — listening for **beacon** frames that APs broadcast about ten times a second, or sending probe requests — then **associating** with a chosen AP and, on secured networks, authenticating.

| standard (marketing name) | year | bands | nominal maximum rate |
|---|---|---|---|
| 802.11b | 1999 | 2.4 GHz | 11 Mb/s |
| 802.11a / 802.11g | 1999 / 2003 | 5 / 2.4 GHz | 54 Mb/s |
| 802.11n (Wi-Fi 4) | 2009 | 2.4, 5 GHz | 600 Mb/s |
| 802.11ac (Wi-Fi 5) | 2013 | 5 GHz | about 6.9 Gb/s |
| 802.11ax (Wi-Fi 6, 6E) | 2021 | 2.4, 5, 6 GHz | about 9.6 Gb/s |
| 802.11be (Wi-Fi 7) | certified from 2024 | 2.4, 5, 6 GHz | about 46 Gb/s |

The nominal rates assume the widest channels, several spatial streams (multiple antennas, **MIMO**) and ideal conditions; as of 2026 typical devices achieve a small fraction of them. All use the same basic medium access protocol, extended over time with scheduled access (802.11ax schedules many stations at once on different subcarriers, OFDMA).

### CSMA/CA

Because collisions cannot be detected, 802.11 tries to **avoid** them, and confirms success with an explicit acknowledgement.

::: algorithm 802.11 CSMA/CA (distributed coordination function) {#alg-csmaca}
Constants: a slot time, SIFS (short interframe space) and DIFS (distributed interframe space, $= \text{SIFS} + 2$ slots); contention window bounds $\text{CW}_\text{min}$ and $\text{CW}_\text{max}$.

**Sender**, with a frame to send:

1. Set $\text{CW} \gets \text{CW}_\text{min}$.
2. If the channel has been idle for DIFS, and this is a fresh frame after an idle period, transmit. Otherwise, choose a **back-off counter** uniformly from $\set{0, 1, \dots, \text{CW}}$.
3. While the counter is positive: after each slot in which the channel stays idle (once it has been idle for DIFS), decrement the counter; while the channel is busy, freeze it.
4. When the counter reaches $0$, transmit the whole frame (there is no collision detection).
5. If an ACK arrives within a timeout, the frame succeeded. Otherwise set $\text{CW} \gets \min(2\,\text{CW} + 1, \text{CW}_\text{max})$ and return to step 2, giving up after a retry limit.

**Receiver**: on a frame with a correct CRC, wait SIFS and send an ACK.
:::

The design choices each address a property of radio. The ACK is needed because the sender cannot hear a collision; it follows after the short SIFS, shorter than DIFS, so no other station can grab the channel in between. The back-off counter is chosen *before* transmitting, not only after a collision, because several stations waiting for the same busy period would otherwise all transmit the moment it ends. Freezing the counter while the channel is busy gives stations that have waited longest a better chance next time. And the contention window doubles after each failure, as in Ethernet's back-off ([[networks/link-layer#alg-csmacd]]).

For the hidden terminal problem, 802.11 offers an optional reservation. Before a long frame, the sender transmits a short **request to send** (RTS) with the duration of the exchange; the AP answers with a **clear to send** (CTS), which every station in range of the AP hears — including hidden ones — and each sets a **network allocation vector** (NAV), a timer during which it treats the channel as busy. Collisions can then happen only between the short RTS frames. Because RTS/CTS adds overhead, it is normally used only for frames longer than a threshold.

::: example How fast is a 54 Mb/s link? {#ex-wifi-throughput}
Estimate the throughput of a single 802.11a station sending 1500-byte IP datagrams at 54 Mb/s, with no other traffic and no collisions, using the standard's timing: slot 9 µs, SIFS 16 µs, DIFS 34 µs, a 20 µs preamble before every frame, OFDM symbols of 4 µs, $\text{CW}_\text{min} = 15$, and ACKs sent at 24 Mb/s.
::: solution
```python
# wifi.py: time to send one 1500-byte datagram with 802.11a (5 GHz OFDM), no collisions
import math

SLOT, SIFS = 9, 16                       # microseconds (IEEE 802.11a timing)
DIFS = SIFS + 2 * SLOT                   # 34 us
PREAMBLE = 20                            # PLCP preamble and header, us
CW_MIN = 15                              # back-off drawn from 0..15 slots

def airtime(nbytes, rate_mbps):
    bits = 16 + 8 * nbytes + 6           # SERVICE field + data + tail bits
    per_symbol = rate_mbps * 4           # one OFDM symbol lasts 4 us
    return PREAMBLE + 4 * math.ceil(bits / per_symbol)

def exchange(rate, ack_rate, payload=1500):
    data = airtime(payload + 8 + 28, rate)   # LLC/SNAP 8 + MAC header 24 + FCS 4
    ack = airtime(14, ack_rate)
    return DIFS + SLOT * CW_MIN / 2 + data + SIFS + ack, data, ack

for rate, ack_rate in ((54, 24), (6, 6)):
    total, data, ack = exchange(rate, ack_rate)
    print(f"{rate:2} Mb/s: data {data} us, ACK {ack} us, cycle {total} us, "
          f"throughput {1500 * 8 / total:.1f} Mb/s")
```

```console
$ python3 wifi.py
54 Mb/s: data 248 us, ACK 28 us, cycle 393.5 us, throughput 30.5 Mb/s
 6 Mb/s: data 2072 us, ACK 44 us, cycle 2233.5 us, throughput 5.4 Mb/s
```

Each datagram becomes a 1536-byte frame (8 bytes of LLC/SNAP encapsulation, a 24-byte MAC header and a 4-byte CRC), which at 54 Mb/s (216 bits per symbol) takes 57 symbols, 228 µs, plus the preamble: 248 µs. The cycle adds DIFS (34 µs), an average back-off of $7.5$ slots ($67.5$ µs), SIFS (16 µs) and the ACK (28 µs): $393.5$ µs per datagram, so the throughput is $12000/393.5 \approx 30.5$ Mb/s — 56% of the nominal rate, with no other station present. The overheads are fixed in time, so they cost proportionally more at higher rates, which is why newer standards **aggregate** many datagrams into one frame and acknowledge them with one block ACK. At 6 Mb/s the same datagram needs $2233.5$ µs and the throughput is $5.4$ Mb/s.
:::
:::

### The 802.11 frame

An 802.11 data frame has a 2-byte frame control field (type, and flags including *to DS* and *from DS*, saying whether the frame is going to or coming from the wired "distribution system"), a 2-byte **duration** (used to set other stations' NAVs), up to four 48-bit addresses, a sequence control field (so that the receiver can discard duplicates when an ACK is lost and the frame is retransmitted), the payload and a CRC-32.

::: definition Addresses in an 802.11 frame {#def-80211-addresses}
In a frame between a station and an access point, **address 1** is the MAC address of the wireless receiver (the station or AP that should receive and acknowledge the frame), **address 2** that of the wireless transmitter, and **address 3** that of the device on the wired side — the final destination of a frame going to the distribution system, or the original source of one coming from it. Address 4 is used only when APs relay frames to each other wirelessly (a mesh or bridge).
:::

::: example A frame through an access point {#ex-80211-frame}
Host H, associated with access point AP, sends an IP datagram to the router R that is H's default gateway; R is on the Ethernet behind the AP. What MAC addresses appear in the 802.11 frame H sends, and in the Ethernet frame the AP sends to R?
::: solution
H's frame has *to DS* set: address 1 = AP (the wireless receiver, which will send the ACK), address 2 = H (the transmitter), address 3 = R (the destination on the wired side). The AP acknowledges it, converts it to an Ethernet frame ([[networks/link-layer#def-ethernet]]) with destination R and source H — not the AP's own address: an AP is a link-layer bridge, so R sees the frame as coming directly from H and learns H's MAC address, as a switch would. On the way back, R sends an Ethernet frame to H; the AP's 802.11 frame has *from DS* set, address 1 = H, address 2 = AP, address 3 = R.
:::
:::

Wireless frames can be received by anyone in range, so Wi-Fi security is essential. **WPA2** (based on IEEE 802.11i, 2004) and **WPA3** (2018) authenticate stations — with a shared passphrase, or in enterprise networks with per-user credentials through 802.1X — and derive fresh keys for each session, with which every frame is encrypted and integrity-protected using AES. WPA3's **SAE** handshake prevents an eavesdropper who records a login from testing passphrase guesses offline, a weakness of WPA2's pre-shared-key mode. An open network, by contrast, protects nothing, and an attacker can set up a fake access point with the same SSID (an "evil twin"); the defence is to rely on end-to-end encryption (TLS, with certificate checking) rather than on the network, and on WPA3-Enterprise with server certificates where the network itself must be trusted.

::: quiz
Why does 802.11 use acknowledgements and collision avoidance instead of Ethernet's collision detection?
- [x] A transmitting station cannot hear other stations' signals over its own.
- [x] Two stations may both be in range of the AP but not of each other.
- [ ] Radio waves travel more slowly than signals in copper, so collisions take too long to detect.
- [ ] Wi-Fi frames are too short for collision detection.
::: solution
The first two are the reasons: a station's own transmission swamps its receiver, and hidden terminals cannot sense each other's carrier, so a collision at the AP may be invisible to both senders. Radio waves travel at about $3 \times 10^8$ m/s, faster than signals in cable; and Wi-Fi frames are often long. Because collisions go undetected, the only evidence of success is an explicit ACK, and collisions are made less likely by random back-off before every transmission and, optionally, RTS/CTS.
:::
:::

## Cellular networks

Cellular networks provide wide-area wireless access over licensed spectrum. Their architecture is very different from Wi-Fi's, because operators must authenticate and bill subscribers, cover whole countries, and keep connections alive at motorway speeds.

In **4G LTE** (3GPP Release 8, 2008), a phone — **user equipment** (UE) — connects over the radio to a **base station** (eNodeB) serving one or more cells. The base stations connect to the operator's **core network** (the Evolved Packet Core): the **mobility management entity** (MME) handles authentication and tracks where each device is; the **home subscriber server** (HSS) holds subscriber data and keys; and the **serving gateway** and **packet data network gateway** (S-GW, P-GW) carry the user's data in **tunnels** from the base station to the edge of the operator's network, where the P-GW assigns the device its IP address and connects to the internet. **5G** (Release 15, 2018) keeps this structure with new names — the base station is a gNB, and the core's functions (AMF for access and mobility, SMF for sessions, UPF for user data) are software services — and adds wider channels, higher frequency bands and much lower radio latency. As of 2026, 5G networks are widely deployed and 4G still carries much of the world's mobile traffic.

The radio access is **scheduled**, not random: the base station allocates time–frequency blocks of its OFDMA channel to devices, in both directions, every millisecond or less, according to their demand and channel quality. This avoids the collisions and contention overhead of CSMA but needs a central scheduler — the base station — which a cellular network has and a Wi-Fi network of independent stations does not. Devices are authenticated with keys stored in the SIM, using a challenge–response protocol (**authentication and key agreement**, AKA) run between the device and its home network, which also derives the keys that encrypt the radio link.

## Mobility

When a device moves, two different things can happen. If it moves within one network — between Wi-Fi access points on the same subnet, or between cells of one operator — it can keep its IP address, and the network only has to change where it delivers frames or tunnels. If it moves to a different network, it gets a new IP address from that network ([[networks/network-layer]]), and every connection identified by the old address — every TCP connection, by its four values ([[networks/sockets#def-socket]]) — would break, unless something hides the change.

::: definition Home and visited networks {#def-mobility}
A mobile device has a permanent **home network**, where it has a permanent **home address**, and a **home agent** — a router or gateway there that keeps track of where it is. When it is in another, **visited** (foreign) network, it obtains a **care-of address** there, and registers it with the home agent. A **correspondent** is any host communicating with the mobile device.
:::

There are two ways to deliver packets to a mobile device away from home. In **indirect routing**, correspondents send to the home address as usual; the home network's routing brings the packets to the home agent, which **tunnels** them — encapsulates each datagram in another addressed to the care-of address — to the visited network, where they are unwrapped and delivered. The mobile's replies can go directly to the correspondent. This is transparent to correspondents and handles moves between visited networks by a single update at the home agent, but every packet makes a detour through the home network, the **triangle routing** problem. In **direct routing**, the correspondent learns the care-of address (from the home agent) and tunnels to it directly, which avoids the detour at the price of making correspondents mobility-aware and complicating moves.

**Mobile IP** (RFC 5944 for IPv4; Mobile IPv6, RFC 6275) standardises indirect routing with an optional direct mode, but has seen little deployment on the general internet. Cellular networks use the same architecture in their own way: a roaming phone's data are often tunnelled from the visited network's gateway back to its home network's P-GW ("home routing"), so the phone keeps an address from its home operator and appears on the internet from its home country, at the cost of the triangle detour. Within one operator's network, a **handover** moves a device from one base station to another while its tunnel endpoint at the gateway stays fixed: the old and new base stations coordinate directly (over the X2 or Xn interface), the old one forwards packets still in flight to the new one, and the core switches the tunnel's end — usually within tens of milliseconds, unnoticed by TCP.

::: example The cost of triangle routing {#ex-triangle}
A traveller whose phone's home network is in Paris is visiting Tokyo and makes a call to a friend in Tokyo. With home routing, the call's packets travel from the friend to the home gateway in Paris and back to Tokyo. If the one-way delay between Tokyo and Paris is 110 ms and within Tokyo 3 ms, what are the one-way delays with home routing and with local routing?
::: solution
Home routing: the friend's packets go Tokyo → Paris (110 ms) → Tokyo (110 ms), about 220 ms, plus a few milliseconds within each city: roughly $223$ ms one way, $446$ ms round trip. Locally routed: about $3$ ms. Speech becomes awkward above about 150 ms one way, so for interactive traffic the detour matters; for web browsing it adds two intercontinental round trips' worth of latency to every exchange ([[networks/application-layer#prop-http-time]]). This is why roaming arrangements increasingly let a visited network give the device a local internet breakout for some traffic.
:::
:::

An alternative to keeping addresses fixed is to let them change and make the *transport* survive. QUIC identifies connections by connection IDs rather than addresses, so a client that moves from Wi-Fi to cellular can simply continue from its new address after a quick check that it really owns it (**connection migration**, RFC 9000 §9), and Multipath TCP (RFC 8684) can carry one connection over several addresses at once. Moving the problem to the end hosts is, once again, the end-to-end argument at work.

## Wireless links and transport protocols

TCP's congestion control treats loss as congestion ([[networks/tcp-congestion#alg-reno]]). On a wireless link, frames are lost to noise, fading and collisions with no congestion at all, and every such loss halves TCP's window. By the square-root formula ([[networks/tcp-congestion#prop-mathis]]), a residual loss rate of 1% on a path with an RTT of 50 ms limits a TCP flow with 1460-byte segments to about $\sqrt{1.5}\cdot 1460 \cdot 8/(0.05 \sqrt{0.01}) \approx 2.9$ Mb/s — whatever the radio's rate. Mobility adds handovers, during which packets are delayed or lost in bursts, and the RTT of a radio link varies by an order of magnitude as the scheduler and the retransmissions come and go, which inflates TCP's timeout ([[networks/tcp-congestion#alg-rto]]).

Three kinds of remedy are used.

1. **Local recovery**: retransmit lost frames on the wireless link itself, where the round trip is short, so that the transport protocol rarely sees a loss. Wi-Fi does this with its ACKs and retry limit, cellular networks with fast hybrid ARQ and a reliable link-layer protocol. The cost is extra and variable delay.
2. **Making the sender aware of the wireless link**: the original split-connection approach terminates TCP at the base station and runs a separate connection over the wireless hop (violating end-to-end semantics, and impossible when the transport is encrypted, as QUIC always is); explicit loss notifications have been proposed but are little used.
3. **Congestion control that does not equate loss with congestion**, such as BBR ([[networks/tcp-congestion]]), which responds mainly to measured bandwidth and RTT.

Local recovery is by far the most important, and its effect is easy to quantify.

::: proposition Link-layer retransmission {#prop-arq}
Suppose each transmission of a frame over a link is lost independently with probability $q$, and the link layer retransmits a lost frame up to $k$ times. Then the frame is lost for good with probability $q^{k+1}$, and the expected number of transmissions per frame is $(1 - q^{k+1})/(1 - q)$.
:::

::: proof
The frame is lost for good only if all $k + 1$ attempts fail, which by independence has probability $q^{k+1}$. Attempt $j$ (for $j = 1, \dots, k + 1$) is made if and only if the first $j - 1$ attempts failed, with probability $q^{j-1}$. The expected number of attempts is therefore $\sum_{j=1}^{k+1} q^{j-1} = (1 - q^{k+1})/(1 - q)$, a geometric sum.
:::

::: example Wi-Fi retries and TCP {#ex-retries}
A Wi-Fi link loses 10% of frame transmissions, independently. Compare the loss rate TCP sees with no retransmission and with a retry limit of 3, and their effects on a TCP flow with RTT 50 ms and 1460-byte segments.
::: solution
Without retries TCP sees $p = 0.1$, and [[networks/tcp-congestion#eq-mathis]] gives about $\sqrt{15} \times 1460 \times 8/0.05 \approx 0.90$ Mb/s. With up to $3$ retries, by [[#prop-arq]] the residual loss is $0.1^4 = 10^{-4}$, and the formula gives about $\sqrt{15000} \times 233.6\ \text{kb/s} \approx 28.6$ Mb/s — thirty times more, so that the flow is now limited by the radio rate rather than by TCP's reaction to loss. The price is $(1 - 0.1^4)/0.9 \approx 1.11$ transmissions per frame, and occasional extra delays of a few hundred microseconds per retry. Independence matters: if losses come in bursts (a person walking in front of the antenna), consecutive retries fail together and the residual loss is much higher than $q^{k+1}$.
:::
:::

::: widget plot
f: sqrt(1.5)*1460*8/(r/1000)/sqrt(x^(k + 1))/1000000
x: 0.01, 0.5
y: 0, 100
sliders: k=0:0:7:1; r=50:10:300:10
labels: \text{TCP throughput (Mb/s)}
caption: The square-root formula's TCP throughput in Mb/s when each wireless transmission is lost with probability $x = q$ and the link layer retries up to $k$ times, so TCP sees loss $q^{k+1}$ ([[#prop-arq]]); RTT $r$ ms, MSS 1460 bytes. With $k = 0$ the throughput collapses even at a few per cent loss. Raise $k$ one step at a time and watch the curve lift by orders of magnitude; the real limit then becomes the radio rate (here not drawn), and the formula's prediction above it is meaningless. Lengthen the RTT and every curve falls proportionally.
:::

::: warning A wireless link is not "slower Ethernet"
It is tempting to model a Wi-Fi or cellular link as a wired link with a lower rate. Its behaviour is different in kind: its rate changes from moment to moment with the radio conditions and the number of competing stations; its losses are partly random rather than congestive; its delay varies with scheduling and retransmissions; and stations sharing it slow each other down in surprising ways — a single station far from the access point, transmitting at a low rate, occupies the channel for so long per frame that every other station's throughput falls to about its level ([[#exr-anomaly]]). Protocols and applications designed for a fixed, reliable, wired link degrade badly on such links; those that measure and adapt (rate adaptation, BBR, adaptive video bit rates) do well.
:::

::: history
Guglielmo Marconi's radio telegraphy came at the start of the twentieth century, but wireless *packet* networking began with Norman Abramson's ALOHAnet at the University of Hawaii (1971), whose random access protocol shaped Ethernet ([[networks/link-layer]]). Claude Shannon's "A mathematical theory of communication" (1948) fixed the limits within which every later radio system has worked. The first IEEE 802.11 standard appeared in 1997 at 2 Mb/s, and the Wi-Fi Alliance was formed in 1999 to certify interoperability. Charles Perkins led the design of Mobile IP, published as RFC 2002 in 1996. Hari Balakrishnan, Venkata Padmanabhan, Srinivasan Seshan and Randy Katz compared ways of improving TCP over wireless links (SIGCOMM 1996), showing the value of link-layer recovery that is aware of TCP. Martin Heusse and colleagues described the 802.11 "performance anomaly" in 2003. Cellular data went from GPRS on GSM (around 2000) to LTE (3GPP Release 8, 2008) and 5G (Release 15, 2018).
:::

## Where this leads

This chapter completes the tour of the layers. Security for wireless and mobile networks — WPA3, cellular authentication, tracking and location privacy — is developed in [[security]], and the cryptography behind it in [[cryptography]]. Services that must keep working as devices move, disconnect and reconnect — replicated data, synchronisation, consistency — are the subject of [[distributed-systems]]. The physics of antennas, modulation and coding belongs to the [Electrical Engineering Atlas](/learn/ee/), and Shannon's theory to courses on information theory.

::: summary
- Radio signals suffer **path loss** ([[#eq-fspl]]), multipath **fading** and **interference**; the **SNR** ([[#def-snr]]) determines the bit error rate of each modulation, and **rate adaptation** picks the scheme frame by frame.
- **Shannon capacity** $B \log_2(1 + \text{SNR})$ ([[#thm-shannon]]) grows linearly with bandwidth and logarithmically with SNR.
- Wireless stations cannot detect collisions and may be **hidden** from each other, so **802.11** uses **CSMA/CA**: random back-off before transmitting, link-layer ACKs, exponential back-off and optional RTS/CTS ([[#alg-csmaca]]). Fixed overheads make throughput much lower than the nominal rate ([[#ex-wifi-throughput]]).
- 802.11 frames carry up to four addresses ([[#def-80211-addresses]]); access points bridge between Wi-Fi and Ethernet. WPA2/WPA3 encrypt and authenticate.
- **Cellular** networks schedule radio resources centrally and tunnel user data through a core network to a gateway; handovers move a device between base stations without changing its address.
- **Mobility** between networks uses a home agent and care-of address ([[#def-mobility]]); **indirect routing** is transparent but causes triangle routing ([[#ex-triangle]]). QUIC's connection migration handles address changes end to end.
- TCP misreads wireless losses as congestion; **link-layer retransmission** cuts the residual loss to $q^{k+1}$ ([[#prop-arq]]), restoring TCP throughput at the cost of variable delay.
:::

## Exercises

::: exercise Decibels {level=1 check="1000"}
A received signal is 30 dB above the noise. What is the ratio of signal power to noise power? What is the SNR in decibels if the signal power is then halved? (Enter the power ratio for 30 dB.)
::: solution
$10^{30/10} = 10^3 = 1000$. Halving the power subtracts $10 \log_{10} 2 \approx 3.01$ dB, giving about $27$ dB. Decibels turn multiplication into addition, which is why link budgets — transmit power, antenna gains, path loss, noise — are added up in dB.
:::
:::

::: exercise Shannon capacity {level=1 check="166"}
What is the Shannon capacity of a 20 MHz channel at an SNR of 25 dB, to the nearest Mb/s? (Enter the capacity in Mb/s.)
::: solution
As in [[#ex-shannon]]: $20 \times \log_2(1 + 10^{2.5}) = 20 \times \log_2(317.2) \approx 20 \times 8.309 \approx 166$ Mb/s.
:::
:::

::: exercise Path loss {level=1 check="60"}
Using [[#eq-fspl]], what is the free-space path loss at 2.4 GHz over 10 m, to the nearest decibel? How much more is it at 100 m, and at 5 GHz over 10 m? (Enter the loss at 2.4 GHz and 10 m.)
::: solution
$20 \log_{10} 10 + 20 \log_{10}(2.4 \times 10^9) - 147.55 = 20 + 187.60 - 147.55 \approx 60$ dB. At 100 m, $20$ dB more ($80$ dB). At 5 GHz over 10 m, $20 \log_{10}(5/2.4) \approx 6.4$ dB more, about $66$ dB — before walls, which attenuate higher frequencies more.
:::
:::

::: exercise Residual loss {level=2 check="0.0016"}
A link loses 20% of frame transmissions independently and retries each frame up to 3 times. What fraction of frames is lost for good, and what is the expected number of transmissions per frame? (Enter the fraction lost.)
::: solution
By [[#prop-arq]] with $q = 0.2$ and $k = 3$: lost for good with probability $0.2^4 = 0.0016$; expected transmissions $(1 - 0.0016)/0.8 = 1.248$.
:::
:::

::: exercise Hidden terminals {level=2}
Stations A and C are associated with access point B; A and C cannot hear each other. A sends a long frame to B; while it is in progress, C's back-off counter reaches zero. (a) What happens without RTS/CTS? (b) Describe the exchange with RTS/CTS and explain why C stays silent. (c) Why is RTS/CTS not used for every frame?
::: solution
(a) C senses an idle channel (it cannot hear A) and transmits; the two frames collide at B, which receives neither correctly and sends no ACK. Both senders time out, double their contention windows and retry — and may collide again. (b) A sends an RTS to B carrying the duration of the whole exchange; B replies with a CTS carrying the remaining duration, which C hears; C sets its NAV and defers until the exchange — data and ACK — is over. Only the short RTS frames can now collide. (c) RTS and CTS cost two extra frames, each with its preamble and SIFS, on every exchange: worthwhile before long frames in networks with hidden stations, but wasted for short frames, which cost little more to retransmit than an RTS. Hence a configurable length threshold.
:::
:::

::: exercise Triangle routing {level=2 check="223"}
In [[#ex-triangle]], what is the one-way delay of home-routed packets from the friend to the traveller, and how much would direct routing save on each round trip? (Enter the one-way delay in milliseconds.)
::: solution
About $220$ ms between the two cities (Tokyo to Paris and back) plus about $3$ ms of local delivery in Tokyo: $\approx 223$ ms. Direct, local routing takes about $3$ ms one way, so each round trip saves about $2 \times (223 - 3) = 440$ ms.
:::
:::

::: exercise The performance anomaly {#exr-anomaly level=3 check="4.57"}
Two stations share an 802.11a access point; both always have 1500-byte datagrams to send. Station F transmits at 54 Mb/s, station S, far away, at 6 Mb/s (with ACKs at 6 Mb/s). Assume CSMA/CA gives each station the same number of transmission opportunities in the long run and ignore collisions. Using the cycle times of `wifi.py`, find each station's throughput and compare with F's throughput when alone. (Enter each station's throughput in Mb/s, to two decimal places.)
::: solution
`wifi.py` gives a cycle of $393.5$ µs per datagram at 54 Mb/s and $2233.5$ µs at 6 Mb/s. With equal opportunities, the stations alternate: in $393.5 + 2233.5 = 2627$ µs each sends one datagram of $12000$ bits. So each gets $12000/2627\ \text{µs} \approx 4.57$ Mb/s, a total of $9.14$ Mb/s. F, which alone would get $30.5$ Mb/s, is dragged down below the $5.4$ Mb/s that S would get alone. CSMA/CA is fair in *frames*, not in *time*, so slow stations take most of the airtime. Remedies include airtime fairness in access points (scheduling equal time rather than equal frames), steering clients to better access points, and disabling the slowest rates.
:::
:::

::: exercise Two regimes of capacity {#exr-shannon-regimes level=3}
From [[#eq-shannon]], show that (a) at high SNR, doubling the signal power increases capacity by approximately $B$ bits per second; (b) at low SNR, capacity is approximately $B \cdot \text{SNR}/\ln 2$, proportional to power; and (c) for a fixed total power $P$ and noise power spectral density $N_0$ (so that $\text{SNR} = P/(N_0 B)$), capacity increases with bandwidth but tends to the finite limit $P/(N_0 \ln 2)$ as $B \to \infty$.
::: solution
(a) For large SNR, $\log_2(1 + 2\,\text{SNR}) - \log_2(1 + \text{SNR}) = \log_2\frac{1 + 2\,\text{SNR}}{1 + \text{SNR}} \to \log_2 2 = 1$, so the capacity increases by about $B \times 1$ bit per second. (b) For small $x$, $\ln(1 + x) = x - x^2/2 + \dots \approx x$, so $C = B \ln(1 + \text{SNR})/\ln 2 \approx B\,\text{SNR}/\ln 2$. (c) $C(B) = B \log_2(1 + P/(N_0 B))$. Writing $u = P/(N_0 B)$, $C = \frac{P}{N_0} \cdot \frac{\log_2(1 + u)}{u}$, and $\log_2(1 + u)/u$ is decreasing in $u > 0$ (as $\ln(1 + u)/u$ is: its derivative is $(u/(1+u) - \ln(1 + u))/u^2 < 0$), so $C$ increases as $B$ grows ($u$ falls). As $B \to \infty$, $u \to 0$ and $\log_2(1 + u)/u \to 1/\ln 2$, so $C \to P/(N_0 \ln 2)$. More bandwidth helps, but with diminishing returns once the signal is spread so thin that it is below the noise; in the high-SNR regime of (a), bandwidth is what pays.
:::
:::
