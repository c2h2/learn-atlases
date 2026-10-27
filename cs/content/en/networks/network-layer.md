A core router of a large internet service provider holds a table of about a million destinations, and for every packet that arrives — at 400 Gb/s, a minimum-sized packet arrives every couple of nanoseconds — it must find the right entry and send the packet on its way. The entries are not individual addresses, of which there are four billion in IPv4 and $2^{128}$ in IPv6, but **prefixes**: blocks of addresses that share their leading bits, such as all addresses beginning `10.1.`. Several prefixes in the table may contain the destination, and the router must pick the most specific. Making that one operation fast, and choosing addresses so that the tables stay small, are the two problems at the heart of the network layer.

The network layer moves datagrams from a source host to a destination host across many networks. It has two parts. **Forwarding** is local and fast: each router, for each arriving datagram, chooses an outgoing link from a table. **Routing** is global and slow: the routers jointly compute the tables, using routing protocols — the subject of the next chapter, [[networks/routing]]. This chapter covers forwarding and everything it depends on: the IP datagram formats of IPv4 and IPv6, addresses and how blocks of them are assigned and divided into subnets, fragmentation, the network address translation that stretched IPv4's address space for two decades, and the control messages of ICMP.

## Forwarding

::: definition Forwarding table and longest-prefix match {#def-forwarding}
A **prefix** $p/\ell$ is the set of addresses whose first $\ell$ bits equal the first $\ell$ bits of $p$; $\ell$ is the **prefix length**, and an address $a$ **matches** $p/\ell$ if it lies in that set. A router's **forwarding table** is a list of entries (prefix, outgoing interface or next hop). To forward a datagram with destination address $a$, the router uses the entry whose prefix matches $a$ with the greatest prefix length: the **longest-prefix match**. The prefix $0.0.0.0/0$, which matches every address, is the **default route**.
:::

Longest-prefix matching is what makes the table both small and precise: a router can send the whole of `10.0.0.0/8` one way except for `10.1.0.0/16`, which goes another, except for `10.1.2.0/24`, which goes a third. The rule is well defined because of a simple structural fact.

::: proposition Prefixes are nested or disjoint {#prop-nested}
For any two prefixes $P = p/\ell$ and $Q = q/m$ with $\ell \le m$, either $Q \subseteq P$ (when the first $\ell$ bits of $q$ and $p$ agree) or $P \cap Q = \varnothing$. Consequently, the prefixes in a table that match a given address form a chain $P_1 \supset P_2 \supset \dots \supset P_k$ ordered by length, and the longest match is the smallest set in the chain.
:::

::: proof
Let $a \in Q$. Then $a$ agrees with $q$ in its first $m \ge \ell$ bits, so in particular in its first $\ell$ bits. If $q$ and $p$ agree in their first $\ell$ bits, $a$ agrees with $p$ there, so $a \in P$: $Q \subseteq P$. If they disagree somewhere in the first $\ell$ bits, every $a \in Q$ disagrees with $p$ there, so $a \notin P$: the sets are disjoint. Now take the prefixes matching an address $a$; any two of them intersect (both contain $a$), so the shorter contains the longer, and they form a chain.
:::

How does a router find the longest match quickly? The classic data structure is a **binary trie** of prefixes: each node corresponds to a bit string, its children to that string extended by $0$ and by $1$, and a node is marked with a next hop if its string is a prefix in the table.

::: algorithm Longest-prefix match in a binary trie {#alg-lpm}
To look up address $a$ with bits $a_1 a_2 \dots a_{32}$:

1. Let $v$ be the root, and $\textit{best}$ the root's next hop (the default route, if any).
2. For $i = 1, 2, \dots, 32$: if $v$ has no child for bit $a_i$, stop; otherwise move $v$ to that child, and if $v$ is marked, set $\textit{best}$ to its next hop.
3. Return $\textit{best}$.
:::

The walk visits exactly the nodes for the prefixes $a_1 \dots a_i$ of the address that are present in the trie, in order of length, and remembers the last marked one; by [[#prop-nested]] that is the longest matching prefix. A lookup costs at most 32 steps for IPv4 (128 for IPv6), whatever the table size.

```python
# lpm.py: longest-prefix match with a binary trie, checked against brute force
import ipaddress as ip, random

class Trie:
    def __init__(self):
        self.root = {}                           # node: {"0": child, "1": child, "hop": h}

    def insert(self, prefix, hop):
        net = ip.ip_network(prefix)
        bits = format(int(net.network_address), "032b")[:net.prefixlen]
        node = self.root
        for b in bits:
            node = node.setdefault(b, {})
        node["hop"] = hop

    def lookup(self, addr):
        bits = format(int(ip.ip_address(addr)), "032b")
        node, best = self.root, self.root.get("hop")
        for b in bits:                           # walk down, remembering the last hop seen
            if b not in node:
                break
            node = node[b]
            best = node.get("hop", best)
        return best

table = {"0.0.0.0/0": "D", "10.0.0.0/8": "A", "10.1.0.0/16": "B", "10.1.2.0/24": "C"}
t = Trie()
for p, h in table.items():
    t.insert(p, h)
for a in ("10.1.2.3", "10.1.9.9", "10.200.0.1", "192.0.2.1"):
    print(a, "->", t.lookup(a))

def brute(addr):                                 # the longest matching prefix, by definition
    a = ip.ip_address(addr)
    return max((ip.ip_network(p) for p in table if a in ip.ip_network(p)),
               key=lambda n: n.prefixlen)
rng = random.Random(1)
for _ in range(10000):
    a = str(ip.ip_address(rng.getrandbits(32) if rng.random() < 0.5 else
                          (10 << 24) | (1 << 16) | rng.getrandbits(16)))
    assert t.lookup(a) == table[str(brute(a))]
print("10000 random lookups agree")
```

```console
$ python3 lpm.py
10.1.2.3 -> C
10.1.9.9 -> B
10.200.0.1 -> A
192.0.2.1 -> D
10000 random lookups agree
```

::: widget graph
nodes: root@3,6; n0@1,5; n1@5,5; n00@0,4; n01@2,4; n10@4,4; n11@6,4; n010@1.5,3; n011@2.5,3; n101@4.5,3
edges: root-n0; root-n1; n0-n00; n0-n01; n1-n10; n1-n11; n01-n010; n01-n011; n10-n101
algorithm: dfs
start: root
caption: A binary trie for the prefixes of a toy 3-bit address space. Node `n01` stands for the bit string $01$, that is, the prefix $01/2$; its children extend it by one bit. A lookup for the address $011$ walks root → n0 → n01 → n011, remembering the last node that carries a next hop. Step through the depth-first search to see every prefix the trie can represent; notice that a node's subtree is exactly the set of longer prefixes nested inside it ([[#prop-nested]]). Real routers compress such tries — skipping chains of single children, or consuming several bits per step — and the fastest use special memory (TCAM) that compares an address with every prefix at once.
:::

### Inside a router

A router has **input ports**, which terminate incoming links, decode frames and perform the lookup; a **switching fabric**, which moves each datagram from its input port to the right output port; **output ports**, which queue datagrams and transmit them; and a **routing processor**, which runs the routing protocols and computes the forwarding table. The lookup and switching form the **data plane**, done in hardware at line rate; the routing processor is the **control plane**, in software, working on a time scale of milliseconds to seconds.

Queues form wherever datagrams arrive faster than they can leave: mostly at output ports, when several inputs send to the same output at once ([[networks/network-principles#thm-mm1]]). When the output buffer is full, the router must drop a datagram, and which one it drops — the arriving one ("drop-tail") or an earlier choice made by active queue management ([[networks/tcp-congestion]]) — matters to TCP. Queues can also form at input ports when the fabric cannot move datagrams fast enough: a datagram at the head of an input queue, waiting for a busy output, then blocks the datagrams behind it even if their outputs are free — **head-of-line blocking**, the same phenomenon we met in HTTP/2.

In **software-defined networking** (SDN), the control plane is moved out of the individual routers into a logically centralised controller, which computes forwarding rules — matching not only destination prefixes but also other header fields — and installs them in switches through a protocol such as OpenFlow (2008). Large data-centre and wide-area networks run this way; the forwarding operation itself, a table lookup, is unchanged.

## IPv4

::: definition The IPv4 datagram {#def-ipv4}
An IPv4 datagram (RFC 791, 1981) has a header of 20 bytes, plus up to 40 bytes of rarely used options, followed by the payload:

| field | bits | meaning |
|---|---|---|
| version | 4 | 4 |
| header length (IHL) | 4 | in 32-bit words, normally 5 |
| differentiated services, ECN | 6 + 2 | traffic class (RFC 2474); congestion notification (RFC 3168) |
| total length | 16 | header plus payload, in bytes (at most 65,535) |
| identification | 16 | the same in all fragments of one datagram |
| flags, fragment offset | 3 + 13 | "don't fragment" (DF), "more fragments" (MF); offset of this fragment's data in units of 8 bytes |
| time to live (TTL) | 8 | decremented by each router; the datagram is discarded at 0 |
| protocol | 8 | the payload's protocol: 1 ICMP, 6 TCP, 17 UDP |
| header checksum | 16 | Internet checksum of the header only |
| source address, destination address | 32 + 32 | |
:::

The TTL guarantees that a datagram caught in a routing loop dies after at most 255 hops; it also bounds packet lifetimes, which TCP relies on ([[networks/reliable-transport]]). The checksum covers only the header, since the transport layer checks its own data, and because every router decrements the TTL, every router must update it.

::: example An IPv4 header and its checksum {#ex-ipv4-header}
Build the header of a datagram from 192.0.2.1 to 198.51.100.2 carrying 40 bytes of TCP (identification `0x1c46`, DF set, TTL 64), compute its checksum, and find what happens to the checksum when a router decrements the TTL.
::: solution
```python
# ipv4hdr.py: build an IPv4 header (RFC 791) and compute its header checksum
import socket, struct

def internet_checksum(data):
    total = sum(struct.unpack(f"!{len(data) // 2}H", data))
    while total >> 16:
        total = (total & 0xFFFF) + (total >> 16)     # end-around carry
    return ~total & 0xFFFF

def ipv4_header(src, dst, payload_len, ident, ttl=64, proto=6, df=True):
    ver_ihl = (4 << 4) | 5                      # version 4, header length 5 words
    flags_frag = 0x4000 if df else 0            # "don't fragment" bit, offset 0
    hdr = struct.pack("!BBHHHBBH4s4s", ver_ihl, 0, 20 + payload_len, ident,
                      flags_frag, ttl, proto, 0,
                      socket.inet_aton(src), socket.inet_aton(dst))
    csum = internet_checksum(hdr)
    return hdr[:10] + struct.pack("!H", csum) + hdr[12:]

h = ipv4_header("192.0.2.1", "198.51.100.2", payload_len=40, ident=0x1c46)
print(h.hex(" "))
print("checksum %#06x, verify %#06x" % (struct.unpack("!H", h[10:12])[0], internet_checksum(h)))
h2 = bytearray(h); h2[8] -= 1                   # a router decrements the TTL ...
print("after TTL-1, old checksum verifies to %#06x" % internet_checksum(bytes(h2)))
```

```console
$ python3 ipv4hdr.py
45 00 00 3c 1c 46 40 00 40 06 32 3f c0 00 02 01 c6 33 64 02
checksum 0x323f, verify 0x0000
after TTL-1, old checksum verifies to 0x0100
```

Reading the bytes: `45` is version 4 and header length 5 words; `00` the traffic class; `00 3c` the total length, 60; `1c 46` the identification; `40 00` the flags with DF set and offset 0; `40` the TTL, 64; `06` the protocol, TCP; `32 3f` the checksum; then the two addresses. The receiver's check over all ten words gives $0$.

When the TTL byte drops from `0x40` to `0x3f`, the word `40 06` becomes `3f 06`, smaller by `0x0100`, and the old checksum no longer verifies. Because the checksum is a sum ([[networks/reliable-transport#prop-checksum]]), the router need not recompute it from scratch: it adds `0x0100` to the checksum, giving `0x333f` (RFC 1624 gives the exact incremental formula, which handles the carries).
:::
:::

### Fragmentation

Every link has a **maximum transmission unit** (MTU), the largest datagram it can carry: 1,500 bytes on Ethernet, for instance. A datagram larger than the MTU of the next link must be **fragmented** — split into several datagrams, each with a copy of the header (with the same identification), its own total length, a fragment offset giving the position of its data in the original in units of 8 bytes, and the MF flag set on all but the last. Fragments are reassembled only at the destination.

::: example Fragmenting a datagram {#ex-fragment}
A 4,000-byte IPv4 datagram (20-byte header, 3,980 bytes of data) must cross a link with MTU 1,500. Give the length, offset and MF flag of each fragment.
::: solution
Each fragment can carry at most $1500 - 20 = 1480$ bytes of data, and $1480$ is a multiple of $8$, as all fragments but the last must be.

| fragment | data bytes | total length | offset field | MF |
|---|---|---|---|---|
| 1 | $0$–$1479$ | $1500$ | $0$ | 1 |
| 2 | $1480$–$2959$ | $1500$ | $1480/8 = 185$ | 1 |
| 3 | $2960$–$3979$ | $1020 + 20 = 1040$ | $2960/8 = 370$ | 0 |

The receiver collects fragments with the same source, destination, protocol and identification, places each by its offset, and knows it has the whole datagram when it has the fragment with MF $= 0$ and no gaps before it. If any fragment is lost, the whole datagram is lost, and the sender's transport retransmits all of it.
:::
:::

Fragmentation is expensive for routers and fragile: losing one fragment loses the datagram, and middleboxes such as firewalls often cannot handle fragments, which do not all carry the transport header. Modern hosts therefore avoid it with **path MTU discovery** (RFC 1191): they send datagrams with DF set, and a router that would have to fragment one drops it and returns an ICMP "fragmentation needed" message carrying the next link's MTU, so the sender can use smaller segments. IPv6 goes further: routers never fragment.

::: widget plot
f: ceil((x - 20)/(floor((m - 20)/8)*8))
x: 20, 9000
y: 0, 8
sliders: m=1500:576:9000:4
labels: \text{fragments}
caption: The number of fragments needed for an IPv4 datagram of $x$ bytes (20 of them header) on a link whose MTU is $m$ ([[#ex-fragment]]): each fragment carries the largest multiple of 8 bytes that fits in $m - 20$. Start at $m = 1500$ (Ethernet) and move to $m = 576$, the minimum datagram size every IPv4 host must accept, or to $9000$, the "jumbo frames" used in data centres. Notice the staircase: one byte over a threshold costs a whole extra fragment, with its header and its own chance of being lost.
:::

## Addressing

An IPv4 address is 32 bits, written in **dotted-decimal** notation as four bytes: `192.0.2.1` is `11000000 00000000 00000010 00000001`. An address belongs not to a host but to an **interface** — a host's connection to a link — so a router, with many interfaces, has many addresses, and a laptop with Wi-Fi and Ethernet has two.

::: definition Subnets and CIDR {#def-cidr}
A **subnet** is a set of interfaces that can reach each other directly over a link layer, without passing through a router — the hosts on one Ethernet or Wi-Fi network. Its interfaces share an address prefix, written in **CIDR notation** as $a.b.c.d/\ell$ (Classless Inter-Domain Routing, RFC 4632): the first $\ell$ bits are the **network part** and identify the subnet, the remaining $32 - \ell$ the **host part**. Equivalently the prefix is given by a **netmask** with $\ell$ one bits followed by zeros, such as `255.255.255.0` for $\ell = 24$.

A subnet $p/\ell$ contains $2^{32 - \ell}$ addresses. Conventionally the lowest (host part all zeros) names the network and the highest (all ones) is the **broadcast** address, so $2^{32 - \ell} - 2$ are usable for interfaces (point-to-point links may use $/31$ prefixes with both addresses, RFC 3021).
:::

A host decides how to send a datagram by comparing the destination with its own subnet: if the destination is in the same subnet it delivers the datagram directly over the link ([[networks/link-layer]]); otherwise it sends it to its **default gateway**, the router on its subnet. That is longest-prefix matching on a table of two entries.

Before 1993, addresses were divided into fixed **classes** — class A with 8-bit network parts, B with 16 and C with 24 — so an organisation with 2,000 hosts needed a class B network of 65,536 addresses, wasting most of them, while routers needed an entry for every network. CIDR allowed prefixes of any length, both to allocate blocks of the right size and to **aggregate** routes.

::: example Dividing a block into subnets {#ex-vlsm}
An organisation has the block `203.0.113.0/24` and needs subnets for departments of 100, 50 and 20 hosts. Allocate them, smallest prefix first, and say what is left.
::: solution
A subnet for $h$ hosts needs $h + 2$ addresses (network and broadcast), rounded up to a power of two: $128$ for $100$ hosts (a $/25$), $64$ for $50$ (a $/26$), $32$ for $20$ (a $/27$). Allocating the largest first keeps every subnet aligned on a multiple of its size, as prefixes must be:

```python
# subnets.py: CIDR arithmetic with Python's ipaddress module
import ipaddress as ip

block = ip.ip_network("203.0.113.0/24")          # a documentation prefix (RFC 5737)
print(block, "has", block.num_addresses, "addresses; netmask", block.netmask)

# Variable-length subnets for departments needing 100, 50 and 20 hosts
free = [block]
for need in (100, 50, 20):
    prefix = 32 - (need + 2 - 1).bit_length()   # smallest subnet with need+2 addresses
    net = next(n for n in free if n.prefixlen <= prefix)
    free.remove(net)
    sub, *rest = net.subnets(new_prefix=prefix)
    free = sorted(free + rest)
    print(f"{need:3} hosts -> {sub}  usable {sub[1]} - {sub[-2]}  broadcast {sub[-1]}")
print("left over:", free)

# Route aggregation: four consecutive /24s are one /22
four = [ip.ip_network(f"10.1.{i}.0/24") for i in range(4)]
print(list(ip.collapse_addresses(four)))
print(ip.ip_address("10.1.2.77") in ip.ip_network("10.1.0.0/22"))
print(ip.ip_address("2001:0db8:0000:0000:0000:ff00:0042:8329").compressed)
```

```console
$ python3 subnets.py
203.0.113.0/24 has 256 addresses; netmask 255.255.255.0
100 hosts -> 203.0.113.0/25  usable 203.0.113.1 - 203.0.113.126  broadcast 203.0.113.127
 50 hosts -> 203.0.113.128/26  usable 203.0.113.129 - 203.0.113.190  broadcast 203.0.113.191
 20 hosts -> 203.0.113.192/27  usable 203.0.113.193 - 203.0.113.222  broadcast 203.0.113.223
left over: [IPv4Network('203.0.113.224/27')]
[IPv4Network('10.1.0.0/22')]
True
2001:db8::ff00:42:8329
```

The departments receive `203.0.113.0/25`, `.128/26` and `.192/27`; `203.0.113.224/27` is left for later. The last three lines show aggregation — the four consecutive /24 networks `10.1.0.0/24` to `10.1.3.0/24` are the single prefix `10.1.0.0/22` — and an IPv6 address being written in its shortest form (see below).
:::
:::

::: proposition Aggregation {#prop-aggregate}
Two prefixes of length $\ell$ can be replaced by a single prefix of length $\ell - 1$ without changing the set of addresses covered if and only if they agree in their first $\ell - 1$ bits and differ in bit $\ell$. More generally, $2^k$ prefixes of length $\ell$ that agree in their first $\ell - k$ bits and together take all $2^k$ values in bits $\ell - k + 1, \dots, \ell$ are exactly one prefix of length $\ell - k$.
:::

::: proof
The prefix $q/(\ell - 1)$ is the set of addresses agreeing with $q$ in the first $\ell - 1$ bits; it splits, according to bit $\ell$, into exactly two prefixes of length $\ell$, which agree in the first $\ell - 1$ bits and differ in bit $\ell$. Conversely, if two prefixes of length $\ell$ have a union that is a single prefix $R$, then $R$ contains $2 \cdot 2^{32-\ell}$ addresses, so its length is $\ell - 1$, and the two are its two halves. The general statement follows by applying this $k$ times.
:::

Aggregation is why the internet's routing tables have about a million entries rather than billions: an ISP announces one prefix for all its customers' addresses, and the rest of the world needs only that one entry. It works only if addresses are assigned hierarchically, following the topology. A customer who changes ISP but keeps its addresses punches a hole in its old ISP's aggregate, which every router must then carry as a more specific entry — longest-prefix matching makes that work, at the cost of a larger table.

### Where addresses come from

Blocks of addresses are allocated by the **Internet Assigned Numbers Authority** (IANA) to five **regional internet registries**, which allocate them to ISPs and large organisations, which assign them to customers and subnets. IANA allocated its last free IPv4 blocks to the registries on 3 February 2011, and the registries have since run out of ordinary allocations; IPv4 addresses are now traded and leased. Three blocks are reserved for **private** use and never routed on the public internet (RFC 1918): `10.0.0.0/8`, `172.16.0.0/12` and `192.168.0.0/16`.

A host obtains its own address, prefix length, default gateway and DNS resolver automatically with the **Dynamic Host Configuration Protocol** (DHCP, RFC 2131), in four messages carried in UDP: the new host broadcasts a DHCP **discover** (from source address `0.0.0.0`, since it has none); one or more servers reply with an **offer**; the host broadcasts a **request** naming the offer it accepts; the server confirms with an **acknowledgement**. The address is **leased** for a limited time and must be renewed. Because anyone on the link can answer a broadcast discover, a rogue DHCP server can direct hosts to a malicious gateway or resolver; managed switches defend against this by allowing DHCP offers only from designated ports ("DHCP snooping").

::: quiz
A host has address `172.20.5.130/26`. Which of the following destinations will it deliver directly on its own subnet, without its default gateway?
- [x] `172.20.5.150`
- [ ] `172.20.5.100`
- [x] `172.20.5.190`
- [ ] `172.20.5.200`
::: solution
A $/26$ subnet has $64$ addresses, aligned on multiples of $64$ in the last byte: $0$–$63$, $64$–$127$, $128$–$191$, $192$–$255$. The host's address, $130$, is in `172.20.5.128/26`, covering `.128` to `.191` (with `.191` the broadcast address). So `.150` and `.190` are local; `.100` (in `.64/26`) and `.200` (in `.192/26`) are on other subnets and go through the gateway.
:::
:::

## Network address translation

With IPv4 addresses exhausted, most homes and many organisations have a single public address, or a few, shared by all their devices. **Network address translation** (NAT, RFC 3022; behaviour requirements RFC 4787) makes this possible.

::: definition NAT {#def-nat}
A **NAT router** connects a private network, using private addresses, to the internet, using one public address $A$. For each outgoing datagram from private address and port $(a, p)$ to a destination $(d, q)$, it chooses a public port $p'$, records $(a, p) \leftrightarrow (A, p')$ in a **translation table**, and rewrites the source to $(A, p')$ — updating the IP and TCP or UDP checksums. A reply arriving for $(A, p')$ is rewritten back to destination $(a, p)$ using the table. Datagrams arriving for a public port with no table entry are dropped (unless a forwarding rule has been configured).
:::

::: example A NAT translation table {#ex-nat}
Two hosts in a home, `192.168.1.10` and `192.168.1.11`, both open a connection from local port 51000 to a web server at `198.51.100.7:443`. The home router's public address is `203.0.113.5`. What does the server see, and how are replies delivered?
::: solution
The router allocates two different public ports, say $62001$ and $62002$:

| private side | public side | remote |
|---|---|---|
| `192.168.1.10:51000` | `203.0.113.5:62001` | `198.51.100.7:443` |
| `192.168.1.11:51000` | `203.0.113.5:62002` | `198.51.100.7:443` |

The server sees two connections from the same address, `203.0.113.5`, with source ports 62001 and 62002 — the four-value identifiers differ, so they are distinct TCP connections. A reply to `203.0.113.5:62002` matches the second row, and the router rewrites its destination to `192.168.1.11:51000`. Neither host knows its traffic was translated, and the server never learns the private addresses.
:::
:::

NAT saved IPv4, but at a price. It breaks the end-to-end principle that any host can address any other: a host behind a NAT cannot receive incoming connections unless a port is forwarded to it, which complicates servers, peer-to-peer applications and calls. Applications work around it with **NAT traversal** — a host learns its public address and port from a server outside (STUN, RFC 8489) and both peers send packets simultaneously so that each NAT creates an entry for the other ("hole punching"), or they relay through a server (TURN, RFC 8656). NATs must understand transport headers, which makes new transport protocols hard to deploy (one reason QUIC runs over UDP). And ISPs increasingly run **carrier-grade NAT** in their own networks, using the shared block `100.64.0.0/10` (RFC 6598), so that thousands of customers share one public address.

::: warning NAT is not a firewall
Because unsolicited incoming datagrams find no translation entry and are dropped, NAT is often credited with security. That protection is a side effect, and an incomplete one: anything inside can still open connections outward (which is what most malware does), port-forwarding rules and automatic protocols such as UPnP can open holes, and IPv6 hosts usually have public addresses with no NAT at all. Protection from unwanted traffic is the job of a **firewall**, a deliberate policy of which connections are allowed in each direction, which can be applied with or without address translation ([[security]]).
:::

## IPv6

IPv6 (RFC 2460 in 1998, now RFC 8200) was designed in the 1990s to replace IPv4 when its addresses ran out. Its addresses are 128 bits — enough for every subnet to have $2^{64}$ addresses — and its header was simplified to speed up forwarding.

::: definition The IPv6 datagram {#def-ipv6}
The IPv6 header has a fixed size of 40 bytes: version (4 bits, value 6), traffic class (8 bits), **flow label** (20 bits, identifying packets of one flow so that routers can keep them on one path), payload length (16 bits), **next header** (8 bits: the type of the payload or of the first **extension header**, using the same numbers as IPv4's protocol field), **hop limit** (8 bits, the TTL), and the source and destination addresses (128 bits each).

Compared with IPv4 there is no header checksum (the link and transport layers check errors), no fragmentation by routers (a too-large packet is dropped with an ICMPv6 "packet too big" message; sources fragment, if they must, with an extension header), and no options in the main header (they go in extension headers, which most routers never examine).
:::

IPv6 addresses are written as eight groups of four hexadecimal digits separated by colons. To shorten them (RFC 5952), leading zeros in each group are dropped and one run of consecutive all-zero groups is replaced by `::` — so `2001:0db8:0000:0000:0000:ff00:0042:8329` becomes `2001:db8::ff00:42:8329`, as Python printed above. `::1` is the loopback address, `fe80::/10` addresses are **link-local** (valid only on one link, configured automatically on every interface), and `2001:db8::/32` is reserved for documentation. Subnets are normally $/64$, and a host can configure its own address on one by **stateless address autoconfiguration** (RFC 4862): it learns the prefix from routers' advertisements and chooses the 64-bit interface identifier itself — usually at random, and changing over time, for privacy (RFC 8981) — after checking that no other host on the link uses it.

IPv4 and IPv6 cannot talk to each other directly, so the transition has taken decades. Most networks run **dual stack**, giving hosts both kinds of address; IPv6 packets can be **tunnelled** inside IPv4 across networks that do not support them; and **NAT64** (RFC 6146) with **DNS64** lets IPv6-only hosts reach IPv4-only servers. Many mobile networks are now IPv6-only internally. As of 2026, Google's measurements show that about half of its users reach it over IPv6 (a 50% day was first recorded in March 2026), with very large differences between countries.

## ICMP

The **Internet Control Message Protocol** (ICMP, RFC 792; ICMPv6, RFC 4443) carries error reports and diagnostic messages between hosts and routers. ICMP messages are carried in IP datagrams (protocol number 1) and consist of a type, a code, a checksum and, for errors, the header and first bytes of the datagram that caused the error, so that the sender can tell which connection it concerns. Important types:

| type | message | sent when |
|---|---|---|
| 0 / 8 | echo reply / echo request | `ping` |
| 3 | destination unreachable | no route (code 0), host unreachable (1), port unreachable (3), fragmentation needed with DF set (4) |
| 11 | time exceeded | the TTL reached 0 (code 0), or reassembly timed out (code 1) |

`ping` sends echo requests and times the replies — here to the local host, the only target this chapter uses:

```console
$ ping -c 3 127.0.0.1
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.037 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.044 ms
64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.057 ms
```

The "56(84) bytes": 56 bytes of ICMP data, plus an 8-byte ICMP header and a 20-byte IP header. **Traceroute** discovers the routers on a path with the TTL: it sends a probe with TTL 1, which the first router discards, returning an ICMP time-exceeded message from its own address; then a probe with TTL 2, which the second router discards; and so on, until a probe reaches the destination, which replies with a port-unreachable message (for UDP probes to an unused port) or an echo reply. Each round trip time measured on the way shows how the delay builds up along the path.

::: example What traceroute reveals {#ex-traceroute}
A traceroute to a server reports, for hops 1 to 4, round-trip times of about 1, 8, 9 and 85 ms, and hop 3 sometimes shows `*` (no reply). What can you conclude?
::: solution
Hop 1 is the local router. The jump from 1 to 8 ms suggests an access link with a few milliseconds of delay (a home broadband line, say). The small step from 8 to 9 ms is a router nearby in the ISP's network. The jump from 9 to 85 ms is about 76 ms of round trip, roughly $38$ ms one way, or about $7{,}600$ km of fibre at $2 \times 10^8$ m/s: a long-distance link, perhaps across an ocean. The `*` at hop 3 does *not* mean that packets are lost there: routers often rate-limit the ICMP messages they generate, treating them as low priority, while forwarding ordinary traffic at full speed — so occasional missing replies from a router whose later hops respond normally are expected. Note also that each hop's replies may come back by a different path from the probes, so the numbers are indicative rather than exact.
:::
:::

ICMP is also abused, and controlled accordingly. Floods of echo requests are a crude denial-of-service technique, and forged ICMP errors can disrupt connections; endpoints therefore check that the quoted header in an ICMP error matches a connection they have, and routers rate-limit the ICMP they send. Blocking ICMP entirely, however, breaks path MTU discovery and makes connections hang mysteriously when large packets are dropped silently — the "PMTU black hole" — so network operators are advised to filter ICMP selectively, not wholesale (RFC 4890 gives recommendations for ICMPv6).

::: quiz
Which of these statements about IPv6 are true?
- [x] A router never fragments an IPv6 packet.
- [ ] IPv6 routers must recompute a header checksum at every hop, as in IPv4.
- [x] The address `2001:db8:0:0:1:0:0:1` can be written `2001:db8::1:0:0:1`.
- [ ] The address `2001:db8:0:0:1:0:0:1` can be written `2001:db8::1::1`.
::: solution
IPv6 routers drop packets that are too big for the next link and send an ICMPv6 "packet too big" message; only sources fragment. There is no IPv6 header checksum at all. In the compressed form, `::` may replace only *one* run of zero groups, otherwise the reader cannot tell how many zeros each `::` stands for; RFC 5952 says to compress the longest run (the first, if two are equally long), so `2001:db8::1:0:0:1` is the canonical form.
:::
:::

::: history
The Internet Protocol was specified by Jon Postel as RFC 791 in September 1981, completing the split of Cerf and Kahn's 1974 design into separate TCP and IP layers. Its addresses were originally divided into an 8-bit network number and a 24-bit host number; the classes A, B and C followed in 1981, subnetting in 1985 (RFC 950), and classless routing with CIDR in 1993 (RFC 1519, by Vince Fuller, Tony Li, Jessica Yu and Kannan Varadhan), when routing tables were growing alarmingly and class B networks were running out. NAT was described by Kjeld Egevang and Paul Francis in RFC 1631 (1994) as a short-term measure. Work on a successor to IPv4 began in the IETF in the early 1990s and produced IPv6, specified by Steve Deering and Robert Hinden in RFC 1883 (1995) and RFC 2460 (1998). IANA allocated the last free IPv4 blocks on 3 February 2011.
:::

## Where this leads

The forwarding tables of this chapter are computed by the routing algorithms and protocols of [[networks/routing]], which also explains how aggregated prefixes are announced between networks with BGP. [[networks/link-layer]] explains how a datagram crosses each individual link, and how a host finds the link-layer address of its gateway (ARP). Firewalls, packet filtering and the security of the network layer — spoofing, filtering, IPsec — are studied in [[security]]. Mobile hosts that change their IP address as they move are the subject of [[networks/wireless-mobile]].

::: summary
- The network layer **forwards** datagrams using tables computed by **routing**; forwarding uses the **longest-prefix match** ([[#def-forwarding]]), well defined because prefixes are nested or disjoint ([[#prop-nested]]), and computable in a trie in at most 32 steps ([[#alg-lpm]]).
- The **IPv4 header** has 20 bytes: lengths, fragmentation fields, TTL, protocol, a header checksum updated at every hop, and 32-bit addresses ([[#def-ipv4]]).
- Datagrams larger than a link's MTU are **fragmented** into pieces with offsets in units of 8 bytes; hosts avoid this with path MTU discovery.
- **CIDR** prefixes $a.b.c.d/\ell$ contain $2^{32-\ell}$ addresses ([[#def-cidr]]); hierarchical assignment allows **aggregation** ([[#prop-aggregate]]). DHCP configures hosts automatically.
- **NAT** shares one public address among many private ones with a translation table ([[#def-nat]]); it breaks incoming connections and is not a firewall.
- **IPv6** has 128-bit addresses, a fixed 40-byte header, no checksum and no router fragmentation ([[#def-ipv6]]); about half of Google's users used it as of 2026.
- **ICMP** reports errors and supports `ping`, traceroute (TTL exceeded) and path MTU discovery.
:::

## Exercises

::: exercise Counting addresses {level=1 check="1022"}
How many addresses does the prefix `198.18.4.0/22` contain, and how many can be assigned to interfaces on a single subnet with that prefix? (Enter the number of assignable addresses.)
::: solution
$2^{32 - 22} = 2^{10} = 1024$ addresses, from `198.18.4.0` to `198.18.7.255`. Excluding the network address and the broadcast address leaves $1022$.
:::
:::

::: exercise Longest-prefix match {level=1}
A router has the table `0.0.0.0/0 → D`, `10.0.0.0/8 → A`, `10.1.0.0/16 → B`, `10.1.2.0/24 → C`, `10.1.2.128/25 → E`. Where does it send datagrams for (a) `10.1.2.200`, (b) `10.1.2.100`, (c) `10.2.0.1`, (d) `11.0.0.1`?
::: solution
(a) `10.1.2.200` matches $/0$, $/8$, $/16$, $/24$ and `10.1.2.128/25` (since $200 \ge 128$): longest is $/25$, so E. (b) `10.1.2.100` is not in `10.1.2.128/25`, so the longest match is `10.1.2.0/24`: C. (c) `10.2.0.1` matches only $/0$ and $/8$: A. (d) `11.0.0.1` matches only the default route: D.
:::
:::

::: exercise Writing IPv6 addresses {level=1}
Write in RFC 5952 compressed form: (a) `2001:0db8:0000:0000:0000:0000:0000:0001`; (b) `fe80:0000:0000:0000:0204:61ff:fe9d:f156`; (c) `2001:0db8:0000:0001:0000:0000:0000:0001`.
::: solution
(a) `2001:db8::1`. (b) `fe80::204:61ff:fe9d:f156`. (c) The zero runs are one group (the third) and three groups (the fifth to seventh); compress the longer: `2001:db8:0:1::1`. You can check each with `ipaddress.ip_address(…).compressed` in Python.
:::
:::

::: exercise Fragment offsets {level=2 check="555"}
A 5,000-byte IPv4 datagram (20-byte header) is sent onto a link with MTU 1,500. How many fragments are produced, and what is the fragment-offset field of the last one? (Enter the offset field.)
::: solution
The data are $4980$ bytes, and each fragment carries at most $1480$: three full fragments ($3 \times 1480 = 4440$ bytes) and a last one of $540$ bytes — four fragments. The last starts at data byte $4440$, so its offset field is $4440/8 = 555$. Total lengths: $1500, 1500, 1500, 560$.
:::
:::

::: exercise Incremental checksum update {level=2}
In [[#ex-ipv4-header]] the header checksum is `0x323f` with TTL 64. Show that the checksum after the TTL is decremented to 63 is `0x333f`, and verify it with `ipv4hdr.py` (call `ipv4_header` with `ttl=63`). Why must routers update the checksum, and why does IPv6 not need to?
::: solution
The TTL and protocol share the 16-bit word `0x4006`; with TTL 63 it is `0x3f06`, smaller by `0x0100`. The one's-complement sum $S$ of the header words (excluding the checksum) therefore falls by `0x0100`, and the checksum $\lnot S$ rises by `0x0100`: from `0x323f` to `0x333f` (no carries are involved here). Running `ipv4_header("192.0.2.1", "198.51.100.2", 40, 0x1c46, ttl=63)` prints the checksum `0x333f`. Routers must update it because the TTL is part of the checksummed header; IPv6 has no header checksum, leaving error detection to the link layer (which checks every frame with a CRC) and the transport layer (whose checksum covers a pseudo-header with the addresses), which saves work at every hop.
:::
:::

::: exercise Planning subnets {level=2}
A company has `198.51.100.0/24` and needs subnets for 60, 60, 25 and 10 hosts and two point-to-point router links (2 addresses each, as $/31$s). Allocate them with aligned prefixes, and state how many addresses are left.
::: solution
Sizes: $60 + 2 = 62 \to 64$ ($/26$) twice; $25 + 2 \to 32$ ($/27$); $10 + 2 \to 16$ ($/28$); two $/31$s. Largest first: `198.51.100.0/26` and `198.51.100.64/26`; `198.51.100.128/27`; `198.51.100.160/28`; `198.51.100.176/31` and `198.51.100.178/31`. Used: $64 + 64 + 32 + 16 + 2 + 2 = 180$ addresses, leaving $76$: `198.51.100.180/30`, `.184/29`, `.192/26` — every leftover block is itself an aligned prefix, available for later subnets.
:::
:::

::: exercise A trie with fewer nodes {level=3}
(a) Prove that the trie lookup of [[#alg-lpm]] returns the next hop of the longest prefix in the table that matches the address, or the default if there is none. (b) A binary trie for $n$ IPv4 prefixes may have up to about $32n$ nodes, many with a single child. Describe how **path compression** (a "Patricia" trie, in which each node records how many bits to skip) reduces this to at most $2n - 1$ nodes, and why a lookup must then verify the final match.
::: solution
(a) The trie node reached after reading bits $a_1 \dots a_i$ represents the bit string $a_1 \dots a_i$, and it exists exactly when some prefix in the table begins with those bits. A prefix $p/\ell$ matches $a$ iff its bit string equals $a_1 \dots a_\ell$, that is, iff the node for $a_1 \dots a_\ell$ exists and is marked. The walk visits the nodes $a_1 \dots a_i$ for $i = 0, 1, \dots$ until one does not exist; every matching prefix's node is on this path (all its ancestors exist, since they are prefixes of it), and no node beyond the stopping point can be marked and on the path. The variable $\textit{best}$ ends holding the mark of the deepest marked node on the path, which is the longest matching prefix.

(b) In a path-compressed trie, every chain of nodes that have one child and no mark is contracted into a single edge, and each node records the bit position it tests next. Then every node either is marked (at most $n$ such) or has two children; a binary tree whose internal unmarked nodes all have two children and with at most $n$ marked nodes has at most $2n - 1$ nodes. During a lookup the skipped bits are not examined, so the walk may reach a marked node whose prefix does not actually match the address (it differs in a skipped bit); the lookup must therefore compare the address with each candidate prefix — or, efficiently, compare once at the end and backtrack to the longest candidate that does match. BSD Unix's routing table used exactly this structure for many years.
:::
:::

::: exercise NAT and port exhaustion {level=3}
A carrier-grade NAT gives each of its customers a range of 1,000 public ports on a shared public address. (a) How many customers can share one address if ports 1024–65535 are used? (b) A customer's browser opens 200 connections at once to many servers, and a game console 30. Why might the customer still run out of ports, given that a connection holds its port while in TIME-WAIT? (c) A NAT may reuse the same public port for connections to *different* destinations ("endpoint-independent" versus "address-dependent" mapping, RFC 4787). Explain how that changes the count, and what it costs.
::: solution
(a) There are $65535 - 1024 + 1 = 64512$ ports, so $64$ customers with $1000$ ports each (the remaining 512 unused). (b) Each connection needs one public port as long as the NAT keeps its translation entry, and a NAT keeps a TCP entry for a while after the connection closes, because it cannot know whether delayed segments or a retransmitted final `FIN` are still to come (RFC 5382 asks for about four minutes, covering the peers' TIME-WAIT). A busy browser opening and closing hundreds of short connections per minute can therefore have far more entries alive than connections open, and exhaust the 1,000-port range, at which point new connections fail. (c) If the mapping need only be unique per (public port, remote address, remote port), the same public port can carry connections to many different servers at once, so a customer is limited to 1,000 simultaneous connections *per destination* rather than in total, which removes most exhaustion. The cost is that the mapping is no longer endpoint-independent: peer-to-peer NAT traversal (which relies on a peer learning one public port from a server and reusing it with other peers) works less reliably, and logging which customer used a given public address and port at a given time, often a legal requirement, must record the remote endpoint as well.
:::
:::
