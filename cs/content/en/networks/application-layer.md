Start a tiny web server on your own machine — Python's standard library has one — and ask it for two files with `curl -v`, which prints every line it sends (`>`) and receives (`<`):

```python
# serve11.py: serve the current directory on 127.0.0.1:8000 with HTTP/1.1
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"      # keep connections open (persistent)

ThreadingHTTPServer(("127.0.0.1", 8000), Handler).serve_forever()
```

```console
$ curl -sv http://127.0.0.1:8000/index.html http://127.0.0.1:8000/style.css
* Established connection to 127.0.0.1 (127.0.0.1 port 8000) from 127.0.0.1 port 51946
> GET /index.html HTTP/1.1
> Host: 127.0.0.1:8000
> User-Agent: curl/8.18.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: SimpleHTTP/0.6 Python/3.14.4
< Date: Tue, 27 Oct 2026 07:44:46 GMT
< Content-type: text/html
< Content-Length: 60
< Last-Modified: Tue, 27 Oct 2026 07:44:25 GMT
<
<!doctype html>
<title>Hello</title>
<p>Hello, network.</p>
* Reusing existing http: connection with host 127.0.0.1
> GET /style.css HTTP/1.1
...
< HTTP/1.1 200 OK
< Content-type: text/css
< Content-Length: 29
```

(Output shortened where marked.) That is the whole of the web's core protocol: a few lines of text asking for a resource by name, and a few lines of text plus the resource in reply. Everything else in this chapter — persistent connections, caching, cookies, HTTP/2 and HTTP/3, the domain name system that turns `www.example.org` into an address, email and content distribution networks — exists to make that exchange fast, scalable and safe for billions of users.

The **application layer** is where network applications live: the web, email, video calls, games, file synchronisation. Its protocols are the most numerous and the most visible, and they are the ones most programmers design or use directly. We study three of the oldest and most important in detail, and use them to illustrate the questions every application protocol must answer: who talks to whom, what the messages look like, what the transport layer below provides, and how the design copes with scale and with adversaries.

## How network applications are organised

A network application is a set of programs running on different hosts that communicate over the network. The programs are **processes**, in the sense of [[computer-systems/exceptions-processes]], and they exchange messages through the operating system.

::: definition Clients, servers and sockets {#def-client-server}
In the **client–server** architecture, a **server** is a process on an always-on host with a fixed, well-known address that waits for requests; a **client** is a process that initiates contact with a server, sends requests and receives responses. In a **peer-to-peer** architecture, hosts (**peers**) act as both clients and servers to one another without relying on a dedicated server.

A process sends and receives messages through a **socket**, the interface between the application and the transport layer. A process is identified on the network by the **IP address** of its host and a 16-bit **port number** on that host. Well-known servers use standard ports: 80 for HTTP, 443 for HTTPS, 53 for DNS, 25 for SMTP between mail servers.
:::

The web and email are client–server; file sharing with BitTorrent and many video-call media paths are peer-to-peer. Peer-to-peer designs scale naturally — each new peer brings capacity as well as demand — but must cope with peers that come and go and with hosts behind address translators ([[networks/network-layer]]). Most large services today are client–server, with the "server" in fact a data centre of many thousands of machines behind one name.

An application chooses the transport service it needs. **TCP** gives a reliable, ordered byte stream with congestion control; **UDP** delivers individual datagrams with no guarantees and no delay of its own; **QUIC**, a newer transport built on UDP, gives multiple reliable streams with encryption built in. None of them guarantees throughput or timing: an application that needs a minimum rate (video) or bounded delay (voice) must adapt to what the network provides. Programming with sockets is the subject of [[networks/sockets]], and the transport protocols are built in [[networks/reliable-transport]] and [[networks/tcp-congestion]].

::: definition Application-layer protocol {#def-app-protocol}
An **application-layer protocol** specifies the types of messages exchanged (requests and responses), their syntax (fields and how they are delimited), their semantics (what the fields mean), and the rules for when and how a process sends and responds to messages. Open protocols such as HTTP and SMTP are published as RFCs, so independent implementations interoperate; many applications use proprietary protocols.
:::

## The web and HTTP

A **web page** consists of a **base HTML file** and the **objects** it references: images, style sheets, scripts, fonts. Each object is named by a **URL** such as `https://www.example.org/images/logo.png`: a scheme (`https`), a host name (`www.example.org`) and a path (`/images/logo.png`). The **HyperText Transfer Protocol** defines how a client (a browser) requests objects and how a server responds. Its meaning — methods, status codes, header fields, caching — is defined once for every version in RFC 9110 (2022); the version-specific wire formats are RFC 9112 (HTTP/1.1), RFC 9113 (HTTP/2) and RFC 9114 (HTTP/3).

::: definition HTTP messages {#def-http}
An HTTP/1.1 **request** is a request line — a **method**, a request target and the version, as in `GET /index.html HTTP/1.1` — followed by **header fields** of the form `Name: value`, one per line, an empty line, and an optional **body**. Each line ends with carriage return and line feed (`\r\n`). The `Host` header is mandatory in HTTP/1.1, so that one server address can host many sites.

A **response** is a status line — the version, a three-digit **status code** and a reason phrase, as in `HTTP/1.1 200 OK` — then header fields, an empty line and the body. The body's length is given by `Content-Length` or by chunked transfer coding.
:::

The common methods are `GET` (retrieve a resource), `HEAD` (the same, headers only), `POST` (submit data to be processed), `PUT` (store a resource), and `DELETE`. `GET`, `HEAD`, `PUT` and `DELETE` are **idempotent** — repeating them has the same effect as doing them once — which matters when a client retries after a lost response. Status codes are grouped by first digit: 1xx informational, 2xx success (`200 OK`), 3xx redirection (`301 Moved Permanently`, `304 Not Modified`), 4xx client error (`404 Not Found`, `403 Forbidden`), 5xx server error (`500 Internal Server Error`, `503 Service Unavailable`).

HTTP is **stateless**: the server keeps no memory of earlier requests from the same client. This makes servers simple and lets a request be answered by any of many machines. Applications that need state — a shopping basket, a login — use **cookies** (RFC 6265): the server sends `Set-Cookie: session=…` in a response, and the browser returns `Cookie: session=…` with later requests to that site. Cookies are also the mechanism behind cross-site tracking, which is why browsers now restrict "third-party" cookies set by sites other than the one being visited.

### Connections and response time

HTTP runs over TCP (HTTP/1.1 and HTTP/2) or QUIC (HTTP/3). Before the first request, TCP needs a **three-way handshake**: the client sends a connection request, the server replies, and the client acknowledges — and may send its request with that acknowledgement. So a request on a new TCP connection costs one round trip to open the connection and one more for the request and response.

::: proposition HTTP response time {#prop-http-time}
A page consists of a base file and $n$ further small objects on the same server; the round-trip time is $\text{RTT}$, transmission times are negligible, and TLS is not used. Then the time until the last object arrives is

- $2(n + 1)\,\text{RTT}$ with **non-persistent** connections (a new TCP connection per object) opened one after another;
- $(n + 2)\,\text{RTT}$ with one **persistent** connection on which each request is sent after the previous response;
- $3\,\text{RTT}$ with one persistent connection on which all $n$ requests for the objects are sent at once (pipelining in HTTP/1.1, or multiplexing in HTTP/2 and HTTP/3).
:::

::: proof
A non-persistent fetch costs one RTT for the handshake and one for the request and response, so $2$ RTTs per object, and the $n + 1$ fetches are sequential. With a persistent connection the handshake is paid once ($1$ RTT); then the base file ($1$ RTT) and each of the $n$ objects ($1$ RTT each) follow, giving $(n + 2)$ RTT. If all object requests go out together as soon as the base file has been parsed, their responses all return within one further RTT: $1 + 1 + 1 = 3$ RTT. (The objects cannot be requested before the base file arrives, because the client learns their names from it.)
:::

::: example A page of ten images {#ex-page-time}
A page has a base file and $10$ images. The RTT to the server is $40$ ms. Compute the page load time for the three cases of [[#prop-http-time]].
::: solution
Non-persistent and serial: $2 \times 11 \times 40 = 880$ ms. Persistent without pipelining: $12 \times 40 = 480$ ms. Persistent with all requests at once: $3 \times 40 = 120$ ms. Browsers before HTTP/2 worked around the cost of serial requests by opening up to six parallel TCP connections per server; with HTTP/2 a single connection carries all requests concurrently. If the server were on another continent with an RTT of $200$ ms, the three figures would be $4.4$ s, $2.4$ s and $0.6$ s, while a hundredfold increase in link rate would change none of them — the warning of [[networks/network-principles#ex-lfn]] in another form.
:::
:::

::: widget plot
f: 2*(x + 1)*r; (x + 2)*r; 3*r
x: 0, 20
y: 0, 2000
sliders: r=40:5:200:5
labels: \text{non-persistent}; \text{persistent, serial}; \text{persistent, concurrent}
caption: Page load time in milliseconds against the number of objects $x$ referenced by the base file, for a round-trip time of $r$ ms ([[#prop-http-time]]). Every line is proportional to $r$: halving the distance to the server halves every curve, which is what content distribution networks exploit. Notice that concurrent requests make load time independent of the number of objects — until the objects are large enough that transmission time, which this model ignores, takes over.
:::

### Caching and conditional requests

The fastest request is one that is never sent. A **web cache** (or **proxy**) keeps copies of recently fetched objects and answers repeated requests itself; browsers have private caches, and organisations and content distribution networks run shared ones. A server says how long a response may be reused with `Cache-Control: max-age=3600` (seconds). When a cached copy may be stale, the cache asks the origin server whether it has changed with a **conditional request**, carrying the validator it got earlier — `If-Modified-Since` with the date from `Last-Modified`, or `If-None-Match` with an entity tag from `ETag`. If the object is unchanged, the server answers `304 Not Modified` with no body. Against the local server above:

```console
$ curl -s -o /dev/null -D - -H "If-Modified-Since: Tue, 27 Oct 2026 07:44:25 GMT" \
       http://127.0.0.1:8000/index.html
HTTP/1.1 304 Not Modified
Server: SimpleHTTP/0.6 Python/3.14.4
Date: Tue, 27 Oct 2026 07:45:42 GMT
```

::: example A cache on an institution's access link {#ex-cache}
An institution's 20 Mb/s access link to the internet carries web traffic averaging 18 Mb/s, all of it responses to requests from inside. Model the link as an M/M/1 queue ([[networks/network-principles#thm-mm1]]). By what factor does the queueing part of the access link's delay change if a cache that answers 40% of requests (and so 40% of the traffic, for objects of equal size) is installed inside the institution?
::: solution
Without the cache the utilisation is $\rho = 18/20 = 0.9$, and the mean time at the link is $(1/\mu)/(1 - 0.9) = 10/\mu$. With the cache only $60\%$ of the traffic crosses the link: $\rho = 0.6 \times 0.9 = 0.54$ and the mean time is $(1/\mu)/0.46 \approx 2.17/\mu$. The delay at the link falls by a factor of about $4.6$, and 40% of requests no longer cross it at all, being answered over the fast local network. A cache costing far less than a faster access link removes most of the congestion — a direct use of the steep curve of [[networks/network-principles]].
:::
:::

### HTTP/2, HTTP/3 and TLS

HTTP/1.1's textual format and one-request-at-a-time connections became a bottleneck for pages of a hundred objects. **HTTP/2** (RFC 7540 in 2015, now RFC 9113) keeps HTTP's meaning but changes the wire format: messages are split into binary **frames** belonging to numbered **streams**, many streams are interleaved on one TCP connection, and header fields are compressed (HPACK, RFC 7541). This removes HTTP-level **head-of-line blocking** — a large response no longer delays small ones behind it — but not TCP's: TCP delivers one ordered byte stream, so when one packet is lost, every stream on the connection waits for its retransmission, even streams whose data all arrived.

**HTTP/3** (RFC 9114, 2022) solves this by running over **QUIC** (RFC 9000, 2021), a transport protocol on top of UDP that provides several independently ordered streams in one connection: a lost packet delays only the streams whose data it carried. QUIC also merges the transport and cryptographic handshakes and identifies connections by connection IDs rather than addresses, so a phone moving from Wi-Fi to a mobile network can keep its connection. As of 2026, W3Techs reports HTTP/3 support on roughly 38–40% of websites, with much higher shares on large content distribution networks.

Nearly all web traffic is now encrypted with **Transport Layer Security** (TLS 1.3, RFC 8446, 2018) — `https` is HTTP over TLS over TCP, and QUIC uses the TLS 1.3 handshake internally. TLS provides **confidentiality** (eavesdroppers see ciphertext), **integrity** (modifications are detected) and **server authentication**: the server proves, with a certificate signed by a certificate authority the client trusts, that it holds the private key for the name the client asked for. In a TLS 1.3 handshake the client's first message, the `ClientHello`, already carries its share of a Diffie–Hellman key exchange; the server replies with its own share, its certificate and a signature, and from then on everything is encrypted. The mathematics belongs to [[cryptography]]; what matters here is the cost in round trips.

::: example Time to the first byte {#ex-ttfb}
A browser fetches a page from a new server with RTT $50$ ms (after the server's address is known). How long until the first byte of the response arrives with (a) HTTP/1.1 over TLS 1.3 over TCP, (b) the same with the older TLS 1.2, (c) HTTP/3 over QUIC, (d) HTTP/3 resuming an earlier session with 0-RTT data?
::: solution
(a) TCP handshake $1$ RTT, TLS 1.3 handshake $1$ RTT, request and response $1$ RTT: $3 \times 50 = 150$ ms. (b) TLS 1.2 needs two round trips for a full handshake: $4 \times 50 = 200$ ms. (c) QUIC combines the transport and TLS handshakes into one round trip: $2 \times 50 = 100$ ms. (d) With a key remembered from an earlier connection, the client may send its request in its very first flight ("0-RTT data"): $1 \times 50 = 50$ ms. 0-RTT data can be **replayed** by an attacker who records and resends the first flight, so TLS 1.3 (§8 of RFC 8446) and HTTP restrict it to requests that are safe to repeat, such as idempotent `GET`s.
:::
:::

::: warning HTTPS does not hide which site you visit
TLS encrypts the content of requests and responses — paths, cookies, form data, pages — but not everything. The IP address of the server is visible to every network on the path. The DNS query that looked up the name is traditionally sent unencrypted (unless DNS over TLS or HTTPS is used, below). And the server name is sent in clear in the `ClientHello`'s **Server Name Indication** field, so that a server hosting many sites can choose the right certificate, unless both ends support the newer Encrypted Client Hello extension. The sizes and timing of encrypted packets can also reveal a surprising amount. HTTPS protects *what* you do on a site much better than *which* site you visit.
:::

## The domain name system

People use names such as `www.example.org`; IP routes packets to addresses such as `192.0.2.10` or `2001:db8::10`. The **Domain Name System** (DNS, RFC 1034 and RFC 1035, 1987) is the distributed database that maps one to the other, and much more. Almost every network interaction begins with a DNS lookup.

A single central name server would be a single point of failure, a traffic bottleneck, far from most users, and impossible to keep up to date for hundreds of millions of names. DNS instead distributes the database over a hierarchy of servers, each responsible for one part of the **name space**.

::: definition DNS name space, zones and servers {#def-dns}
Domain names form a tree: the **root** at the top, then **top-level domains** (TLDs) such as `org`, `uk` and `com`, then their subdomains; a name lists its labels from the leaf to the root, separated by dots. The tree is divided into **zones**, each administered by one organisation and served by its **authoritative name servers**, which hold the definitive records for the names in the zone and **delegate** subtrees to other zones.

- **Root servers** know the authoritative servers of every TLD. There are 13 root server identities, `a.root-servers.net` to `m.root-servers.net`, run by 12 independent operators, each replicated at many sites by anycast ([[networks/routing]]).
- **TLD servers** know the authoritative servers of each domain registered under the TLD.
- **Authoritative servers** answer for the names in their zones.

Clients do not normally contact these directly. A host sends its query to a **recursive resolver** (run by its ISP, organisation, or a public service), which finds the answer by asking authoritative servers and **caches** what it learns.
:::

::: definition Resource records {#def-rr}
The DNS database consists of **resource records** $(\text{name}, \text{TTL}, \text{class}, \text{type}, \text{value})$, where the **TTL** (time to live) says in seconds how long the record may be cached and the class is almost always `IN` (internet). Common types:

| type | value |
|---|---|
| `A` | an IPv4 address of the name |
| `AAAA` | an IPv6 address of the name |
| `NS` | the name of an authoritative server for the zone named |
| `CNAME` | the canonical name of which this name is an alias |
| `MX` | a mail server for the domain, with a preference number |
| `TXT` | free text, used for domain verification and email authentication |
| `SOA` | administrative data for the zone (serial number, timers) |
:::

::: algorithm Iterative resolution {#alg-dns-resolve}
A recursive resolver answers a query for name $q$ and type $t$:

1. If a valid (unexpired) answer for $(q, t)$ is in the cache, return it.
2. Let $S$ be the servers of the closest enclosing zone whose `NS` records are cached (at worst, the root servers, whose addresses are configured as **root hints**).
3. Repeat:
   1. Send the query $(q, t)$ to a server in $S$.
   2. If the reply is an answer, cache it with its TTL and return it.
   3. If the reply is a **referral** — `NS` records for a zone closer to $q$, usually with their addresses ("glue") — cache them and set $S$ to those servers.
   4. If the reply says the name does not exist (`NXDOMAIN`), cache that negative answer (RFC 2308) and return it.
:::

The resolver's queries are *iterative* (each server answers with what it knows, an answer or a referral), while the client's query to the resolver is *recursive* (the resolver does all the work). Each step moves strictly down the tree towards $q$, so with no loops in the delegations the algorithm ends after at most as many referrals as $q$ has labels (plus extra lookups for name-server names given without glue, and for `CNAME` chains).

::: example Resolving a name from scratch {#ex-resolve}
A laptop asks its resolver for the `A` record of `www.example.org`. The resolver's cache is empty. The round-trip times are $10$ ms from the laptop to the resolver, $20$ ms from the resolver to a root server, $30$ ms to the `org` servers and $80$ ms to the authoritative servers of `example.org`. Trace the resolution, find the delay, and find it again for a lookup of `mail.example.org` a minute later.
::: solution
1. Laptop → resolver: `www.example.org A?` (recursive).
2. Resolver → root server: `www.example.org A?` Reply: a referral, "`org` is served by these name servers", with their addresses.
3. Resolver → an `org` server: the same question. Reply: a referral to the name servers of `example.org`.
4. Resolver → an `example.org` server: the same question. Reply: an authoritative answer, `www.example.org. 300 IN A 192.0.2.10`.
5. Resolver → laptop: the answer, which the resolver caches for 300 s.

The delay is $10 + 20 + 30 + 80 = 140$ ms. A minute later, the resolver still has the `NS` records for `example.org` (TTLs for delegations are typically hours or days), so it goes straight to step 4: $10 + 80 = 90$ ms. A third lookup of `www.example.org` within 300 s is answered from the cache in $10$ ms. Caching is what makes DNS scale: root servers see only a tiny fraction of all lookups.
:::
:::

### The DNS message

DNS queries and replies share one binary format (RFC 1035, §4). A 12-byte **header** holds a 16-bit **identifier**, chosen by the querier and copied into the reply so that it can be matched to the query; 16 bits of flags (whether this is a query or response `QR`, an opcode, "authoritative answer" `AA`, "truncated" `TC`, "recursion desired" `RD`, "recursion available" `RA`, and a 4-bit response code `RCODE`, with 0 for no error and 3 for `NXDOMAIN`); and four 16-bit counts, of questions, answers, authority records and additional records. Then come the sections themselves. A name is encoded as a sequence of **labels**, each a length byte followed by that many characters, ending with a zero byte for the root; to save space, a later occurrence of a name may be replaced by a two-byte **pointer** whose top two bits are `11` and whose remaining 14 bits are the offset of an earlier copy of the name in the message.

To see the format, here is a toy authoritative server for one name, which you can run on your own machine. It listens on UDP port 5353 of the loopback address so that it needs no privileges and touches no real network. The addresses `192.0.2.0/24` and the name suffix `.test` are reserved for documentation and testing (RFC 5737, RFC 6761), so they cannot clash with real ones.

```python
# dnstoy.py: a toy authoritative DNS server for one name, on 127.0.0.1:5353 (UDP)
import socket, struct

ZONE = {"www.example.test": "192.0.2.10"}       # name -> IPv4 address (A record)

def parse_name(msg, i):
    labels = []
    while msg[i] != 0:                          # a sequence of length-prefixed labels
        n = msg[i]
        labels.append(msg[i + 1:i + 1 + n].decode("ascii"))
        i += 1 + n
    return ".".join(labels).lower(), i + 1      # skip the terminating zero byte

def answer(query):
    qid, flags = struct.unpack("!HH", query[:4])
    name, end = parse_name(query, 12)
    qtype, qclass = struct.unpack("!HH", query[end:end + 4])
    question = query[12:end + 4]
    rcode = 0 if name in ZONE else 3            # 3 = NXDOMAIN (no such name)
    rd = flags & 0x0100                         # echo the "recursion desired" bit
    found = rcode == 0 and qtype == 1 and qclass == 1
    header = struct.pack("!HHHHHH", qid, 0x8400 | rd | rcode,   # QR=1, AA=1
                         1, 1 if found else 0, 0, 0)
    if not found:
        return header + question
    rr = struct.pack("!HHHIH", 0xC00C, 1, 1, 300, 4)   # pointer to name, A, IN, TTL, len
    return header + question + rr + socket.inet_aton(ZONE[name])

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("127.0.0.1", 5353))
while True:
    query, client = sock.recvfrom(512)
    sock.sendto(answer(query), client)
```

(It trusts its input, which a real server must never do: a truncated or malicious query would make it raise an exception.) The standard `dig` tool can query it:

```console
$ python3 dnstoy.py &
$ dig @127.0.0.1 -p 5353 www.example.test A +norecurse
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39301
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;www.example.test.		IN	A

;; ANSWER SECTION:
www.example.test.	300	IN	A	192.0.2.10

;; Query time: 1 msec
;; SERVER: 127.0.0.1#5353(127.0.0.1) (UDP)
;; MSG SIZE  rcvd: 50
```

::: example A DNS query byte by byte {#ex-dns-bytes}
Build the query for `www.example.test`, type `A`, by hand, send it to the toy server and decode the reply.
::: solution
```python
# dnsquery.py: build a DNS query by hand, send it to the toy server, decode the reply
import socket, struct

def encode_name(name):
    out = b""
    for label in name.split("."):
        out += bytes([len(label)]) + label.encode("ascii")
    return out + b"\x00"

query = (struct.pack("!HHHHHH", 0x1234, 0x0000, 1, 0, 0, 0)   # ID, flags, 1 question
         + encode_name("www.example.test") + struct.pack("!HH", 1, 1))  # type A, class IN
print("query ", len(query), "bytes:", query.hex(" "))

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.settimeout(2)
sock.sendto(query, ("127.0.0.1", 5353))
reply, _ = sock.recvfrom(512)
print("reply ", len(reply), "bytes:", reply.hex(" "))
qid, flags, qd, an, ns, ar = struct.unpack("!HHHHHH", reply[:12])
print(f"id={qid:#06x} flags={flags:#06x} answers={an}")
ttl, rdlen = struct.unpack("!IH", reply[-10:-4])
print("TTL", ttl, "address", socket.inet_ntoa(reply[-4:]))
```

```console
$ python3 dnsquery.py
query  34 bytes: 12 34 00 00 00 01 00 00 00 00 00 00 03 77 77 77 07 65 78 61 6d 70 6c 65 04 74 65 73 74 00 00 01 00 01
reply  50 bytes: 12 34 84 00 00 01 00 01 00 00 00 00 03 77 77 77 07 65 78 61 6d 70 6c 65 04 74 65 73 74 00 00 01 00 01 c0 0c 00 01 00 01 00 00 01 2c 00 04 c0 00 02 0a
id=0x1234 flags=0x8400 answers=1
TTL 300 address 192.0.2.10
```

Reading the query: `12 34` is the identifier; `00 00` the flags (a standard query, recursion not desired); `00 01` one question, then three zero counts. The name is `03 77 77 77` ("3, `www`"), `07` + `example`, `04` + `test`, `00`; then type `00 01` (A) and class `00 01` (IN). The name takes $1 + 3 + 1 + 7 + 1 + 4 + 1 = 18$ bytes, and the query $12 + 18 + 4 = 34$.

The reply repeats the identifier and question. Its flags `84 00` are binary `1000 0100 0000 0000`: `QR` = 1 (a response), opcode 0, `AA` = 1 (authoritative), `RCODE` = 0. The answer record starts with `c0 0c`, a pointer (top bits `11`) to offset `0x0c` = 12, where the name begins in the question — 2 bytes instead of 18. Then type A, class IN, TTL `00 00 01 2c` = 300 seconds, data length 4, and the address `c0 00 02 0a` = 192.0.2.10. Total $34 + 16 = 50$ bytes, as `dig` reported.
:::
:::

DNS normally runs over UDP port 53: a lookup is one small query and one small reply, and a lost one is simply repeated after a timeout. Replies too large for a UDP message have the `TC` flag set and are fetched again over TCP. Encrypted transports — DNS over TLS (RFC 7858) and DNS over HTTPS (RFC 8484) — hide queries from the networks between the client and its resolver, though the resolver itself still sees them.

### Attacks on DNS and their defences

Because a resolver accepts a UDP reply whose identifier and question match a query it sent, an off-path attacker who can guess those values can race the real server with a forged reply and have false data cached — **cache poisoning**. Dan Kaminsky showed in 2008 that asking about many random nonexistent names gives the attacker an unlimited number of races, making a 16-bit identifier alone hopelessly weak. The immediate defence was to randomise the resolver's UDP source port as well (RFC 5452), multiplying the guessing space by tens of thousands. The lasting defence is **DNSSEC** (RFC 4033–4035), in which zones sign their records, and resolvers verify the signatures along a chain of trust from the root, so forged records are rejected whatever their timing. DNS is also abused to amplify denial-of-service attacks, because a small query with a forged source address can elicit a large reply sent to the victim; resolvers that answer only their own clients, rate limiting, and source-address filtering at the network edge ([[networks/network-principles]]) are the countermeasures.

::: quiz
A resolver has just looked up `www.example.org`, receiving the `NS` records of `org` (TTL 2 days), the `NS` records of `example.org` (TTL 1 day) and the `A` record of `www.example.org` (TTL 5 minutes). An hour later, a client asks for `shop.example.net`, a name in a different TLD. Which servers must the resolver contact?
- [x] A root server, then a `net` server, then an authoritative server for `example.net`.
- [ ] Only an authoritative server for `example.net`, because `example` is cached.
- [ ] Only the `org` servers, which forward the query.
- [ ] None: the answer is in the cache.
::: solution
Nothing cached helps: the cache holds delegations for `org` and `example.org`, but `example.net` is in the `net` zone, so the closest cached enclosing zone is the root. The resolver needs the full chain root → `net` → `example.net` (and caches the `net` delegation for next time). Names are matched label by label from the right; `example.net` and `example.org` have nothing in common except the root.
:::
:::

## Electronic mail

Email is the oldest application still in heavy use, and its architecture predates the web. A message goes from the sender's **user agent** (a mail program or web mail page) to the sender's **mail server**, which relays it to the recipient's mail server using the **Simple Mail Transfer Protocol** (SMTP, RFC 5321) over TCP port 25. The recipient's mail server stores it in a mailbox, from which the recipient's user agent later retrieves it with an **access protocol** such as IMAP (RFC 9051) or through a web interface. SMTP is a *push* protocol (the sender initiates the transfer); retrieval is *pull*. The relaying server finds the recipient's server by looking up the `MX` records of the domain after the `@`.

An SMTP exchange is a dialogue of text commands and three-digit replies, in the same style as HTTP. An illustrative session between two servers of the fictional domains `example.org` and `example.net` (S = receiving server, C = sending server):

```text
S: 220 mx.example.net ESMTP ready
C: EHLO mail.example.org
S: 250-mx.example.net
S: 250 STARTTLS
C: STARTTLS
S: 220 Go ahead
   (TLS handshake; the session continues encrypted)
C: MAIL FROM:<alice@example.org>
S: 250 OK
C: RCPT TO:<bob@example.net>
S: 250 OK
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>
C: From: Alice <alice@example.org>
C: To: Bob <bob@example.net>
C: Subject: Lunch
C:
C: Are you free at one?
C: .
S: 250 OK: queued
C: QUIT
S: 221 Bye
```

Note the two levels of addressing: the **envelope** (`MAIL FROM`, `RCPT TO`), which SMTP uses for delivery, and the **message header** (`From:`, `To:`, defined by RFC 5322), which is part of the message's content and shown to the reader. Nothing in the original SMTP checks that either is genuine, which is why forged sender addresses are a staple of spam and phishing. Modern defences are layered on top: **SPF** (RFC 7208) publishes in DNS which servers may send mail for a domain, **DKIM** (RFC 6376) has the sending domain sign messages, and **DMARC** (RFC 7489) tells receivers what to do with mail that fails these checks. `STARTTLS` (RFC 3207) encrypts each server-to-server hop, but not the message as stored on the servers.

## Content distribution networks

A popular video service or software update cannot be served from one data centre: the RTT to distant users would make every request slow ([[#prop-http-time]]), the data centre's links would be a bottleneck, and the same bytes would cross the same expensive long-distance links millions of times. A **content distribution network** (CDN) instead stores copies of content on servers in many locations — inside access ISPs, at internet exchange points, in regional data centres — and directs each client to a nearby copy.

Two mechanisms do the directing. With **DNS redirection**, the content provider's name (say `video.example.com`) is a `CNAME` for a name in the CDN's zone, whose authoritative servers answer each query with the address of a cluster chosen for the resolver that asked — near it, lightly loaded, and holding the content. With **anycast**, many clusters announce the *same* IP address into the routing system, and routing itself delivers each client's packets to a nearby one ([[networks/routing]]). Either way the RTT falls from hundreds of milliseconds to a few, the provider's links carry each object once per cluster rather than once per user, and the load of a sudden surge — or a denial-of-service attack — is spread over the whole network.

::: history
Tim Berners-Lee proposed the World Wide Web at CERN in March 1989 and had the first server, browser and HTML running by the end of 1990; HTTP was a one-line protocol at first, documented as HTTP/1.0 in RFC 1945 (1996) and as HTTP/1.1 in RFC 2068 (1997) and RFC 2616 (1999). Before DNS, every ARPANET host's names were listed in a single file, `HOSTS.TXT`, maintained at SRI and copied by everyone; Paul Mockapetris designed the domain name system in 1983 (RFC 882 and 883), revised as RFC 1034 and 1035 in 1987. Email between machines predates both: Ray Tomlinson sent the first networked email, choosing the `@` sign, in 1971, and Jon Postel's SMTP was published as RFC 821 in 1982. Akamai, founded in 1998 from research at MIT, built the first large commercial CDN. Google's experimental SPDY protocol (2009) became the basis of HTTP/2 (2015), and its QUIC experiments (from 2012) were standardised by the IETF as RFC 9000 in 2021, with HTTP/3 following in RFC 9114 in 2022.
:::

## Where this leads

The next chapter, [[networks/sockets]], writes clients and servers like the ones in this chapter in Python and C. [[networks/reliable-transport]] and [[networks/tcp-congestion]] open up the transport layer that HTTP, SMTP and DNS rely on, explaining the handshakes counted in [[#prop-http-time]] and why TCP's single byte stream causes head-of-line blocking. Anycast and the routing that CDNs exploit are part of [[networks/routing]]. TLS, certificates and the public-key cryptography behind them are developed in [[cryptography]] and [[security]], and replicated services spread over many data centres in [[distributed-systems]].

::: summary
- Applications are **client–server** or **peer-to-peer**; processes communicate through **sockets** identified by IP address and port, choosing a transport (TCP, UDP or QUIC) for the service they need.
- **HTTP** is a stateless request–response protocol of methods, status codes and header fields (RFC 9110); cookies add state.
- Page load time is dominated by round trips: non-persistent connections cost $2$ RTT per object, persistent ones $1$, and concurrent requests make the cost independent of the number of objects ([[#prop-http-time]]).
- **Caches** and **conditional requests** (`304 Not Modified`) avoid transfers; a cache can remove most of the queueing on a busy access link ([[#ex-cache]]).
- **HTTP/2** multiplexes streams on one TCP connection; **HTTP/3** runs over **QUIC**, removing TCP's head-of-line blocking and combining the transport and TLS 1.3 handshakes.
- **DNS** is a hierarchical, cached, distributed database of resource records; resolvers resolve names iteratively from the root ([[#alg-dns-resolve]]), and caching makes it scale. Its binary message format compresses names with pointers.
- **SMTP** pushes mail between servers; SPF, DKIM, DMARC and TLS are later additions that address its lack of authentication. **CDNs** cut round-trip times by serving content from nearby copies, chosen by DNS or anycast.
:::

## Exercises

::: exercise Serial non-persistent connections {level=1 check="880"}
A page has a base file and 10 small images on one server, with RTT 40 ms. Using non-persistent connections opened one after another and ignoring transmission times, how long does the page take to load? (Enter the time in milliseconds.)
::: solution
By [[#prop-http-time]], each of the $11$ objects needs $2$ RTTs (handshake, then request and response): $2 \times 11 \times 40 = 880$ ms ([[#ex-page-time]]).
:::
:::

::: exercise Reading status codes {level=1}
Explain what a client should do on receiving each of these responses: (a) `301 Moved Permanently` with `Location: https://www.example.org/new`; (b) `304 Not Modified`; (c) `404 Not Found`; (d) `503 Service Unavailable` with `Retry-After: 120`.
::: solution
(a) The resource has a new permanent URL, given in `Location`: fetch it from there, and a cache or bookmark may update the old URL. (b) The client sent a conditional request and its cached copy is still valid: use the cached copy (and refresh its freshness lifetime from the response headers). (c) The server has no resource at that URL: show an error; retrying will not help unless something changes. (d) The server is temporarily overloaded or down for maintenance: wait at least 120 seconds before trying again. Clients that retry immediately and repeatedly make overload worse, which is why such hints — and randomised, growing back-off — matter.
:::
:::

::: exercise A name on the wire {level=1 check="17"}
How many bytes does the name `www.example.com` occupy in a DNS message when written in full (without a compression pointer)? (Enter the number of bytes.)
::: solution
Each label is a length byte followed by its characters, and the name ends with a zero byte: $(1 + 3) + (1 + 7) + (1 + 3) + 1 = 17$ bytes. In general a name of $k$ labels with $c$ characters in total occupies $c + k + 1$ bytes, which is the length of the dotted name plus $2$.
:::
:::

::: exercise Handshakes and the first byte {level=2 check="150"}
A browser with a cached DNS answer connects to a new server with RTT 50 ms and requests a page using HTTP/1.1 over TLS 1.3 over TCP. How long until the first byte of the response arrives, and how much would HTTP/3 save? (Enter the first time in milliseconds.)
::: solution
TCP's handshake ($1$ RTT), TLS 1.3's handshake ($1$ RTT) and the request and response ($1$ RTT): $150$ ms. HTTP/3 over QUIC combines the first two, giving $100$ ms, a saving of $50$ ms — one third — on every new connection ([[#ex-ttfb]]).
:::
:::

::: exercise A cache on the access link {level=2 check="0.54"}
In [[#ex-cache]], what is the utilisation of the access link after the cache is installed, and what hit rate would be needed to bring it down to $0.45$? (Enter the utilisation after installing the 40% cache.)
::: solution
The link carries the fraction $1 - h$ of the traffic, where $h$ is the hit rate. With $h = 0.4$: $\rho = 0.6 \times 18/20 = 0.54$. For $\rho = 0.45$ we need $(1 - h) \times 0.9 = 0.45$, so $h = 0.5$. (Objects of unequal sizes complicate this: what matters is the fraction of *bytes* served by the cache, which is usually smaller than the fraction of requests, because popular objects tend to be small.)
:::
:::

::: exercise Counting DNS queries {level=2 check="3"}
A resolver whose cache holds only the root hints resolves `www.cs.example.ac.uk`. Assume each zone boundary is at a dot — `uk`, `ac.uk`, `example.ac.uk` and `cs.example.ac.uk` are separate zones — and that every referral comes with glue addresses. (a) How many queries does the resolver send? (b) How many does it send if `uk` and `ac.uk` are served by the same servers, so that the `uk` servers answer the `ac.uk` part themselves, and `cs.example.ac.uk` is not a separate zone but part of `example.ac.uk`? (Enter the answer to (b).)
::: solution
(a) Root (referral to `uk`), `uk` (referral to `ac.uk`), `ac.uk` (referral to `example.ac.uk`), `example.ac.uk` (referral to `cs.example.ac.uk`), `cs.example.ac.uk` (answer): $5$ queries. (b) The root refers to the `uk` servers; they hold the `ac.uk` zone too and refer directly to `example.ac.uk`; its servers answer for `www.cs.example.ac.uk` because no further delegation exists: $3$ queries. The number of queries depends on where zones are cut, not on the number of labels.
:::
:::

::: exercise Parallel connections {level=3 check="240"}
Before HTTP/2, browsers fetched objects over up to $k$ parallel connections. (a) Show that a page of a base file and $n$ small objects, fetched with non-persistent connections, $k$ at a time, takes $2\,\text{RTT}\,(1 + \lceil n/k \rceil)$, under the assumptions of [[#prop-http-time]]. (b) Evaluate this for $n = 10$, $k = 5$, $\text{RTT} = 40$ ms. (c) What is the corresponding time with $k$ persistent connections, each sending its next request after its previous response, and why might parallel connections be unfair to other users of a bottleneck link? (Enter the time in (b) in milliseconds.)
::: solution
(a) The base file needs a connection of its own ($2$ RTT) because the objects' names are unknown until it arrives. The $n$ objects then go in rounds of at most $k$ simultaneous fetches; each round takes $2$ RTT (handshake and request–response, in parallel on all connections), and $\lceil n/k\rceil$ rounds are needed. Total: $2\,\text{RTT}(1 + \lceil n/k\rceil)$.

(b) $2 \times 40 \times (1 + 2) = 240$ ms.

(c) Open the first connection and fetch the base file ($2$ RTT); open the other $k-1$ connections ($1$ RTT, though a browser can open them while the base file arrives) and then fetch $\lceil n/k\rceil$ objects on each in sequence, $\lceil n/k\rceil$ RTT. That is at most $(3 + \lceil n/k\rceil)$ RTT $= 200$ ms here, or $(2 + \lceil n/k \rceil)$ RTT $= 160$ ms if the extra connections are opened early. Congestion control ([[networks/tcp-congestion]]) shares a bottleneck roughly equally *per connection*, so a client with six connections receives about six times the share of a client with one: parallel connections improve one user's load time partly at others' expense. HTTP/2's single multiplexed connection removed the incentive.
:::
:::

::: exercise Decoding compressed names {level=3}
Write a Python function `decode_name(msg, i)` that decodes the DNS name starting at offset `i` of the message `msg`, following compression pointers, and returns the name and the offset just after it *in the original position* (after the pointer, if one was followed). It must refuse messages whose pointers form a loop. Test it on the 50-byte reply of [[#ex-dns-bytes]].
::: solution
A pointer jumps elsewhere, but the name *in the record being parsed* ends right after the two pointer bytes, so remember that position the first time a pointer is followed. A malicious message can contain a pointer to itself; real parsers bound the number of jumps (or require pointers to point strictly backwards).

```python
def decode_name(msg, i):
    """Return (name, next_index) for the DNS name starting at msg[i]."""
    labels, end, hops = [], None, 0
    while True:
        n = msg[i]
        if n == 0:                         # root label: the name is complete
            i += 1
            break
        if n & 0xC0 == 0xC0:               # compression pointer: 14-bit offset
            if end is None:
                end = i + 2                # the name ends after the pointer
            i = ((n & 0x3F) << 8) | msg[i + 1]
            hops += 1
            if hops > 64:
                raise ValueError("pointer loop")
            continue
        labels.append(msg[i + 1:i + 1 + n].decode("ascii"))
        i += 1 + n
    return ".".join(labels), (end if end is not None else i)

reply = bytes.fromhex("12348400000100010000000003777777076578616d706c6504746573740000010001"
                      "c00c000100010000012c0004c000020a")
print(decode_name(reply, 12))      # the question
print(decode_name(reply, 34))      # the answer's name: a pointer to offset 12
loop = b"\x00" * 12 + b"\xc0\x0c"
try:
    decode_name(loop, 12)
except ValueError as e:
    print("error:", e)
```

```console
$ python3 dname.py
('www.example.test', 30)
('www.example.test', 36)
error: pointer loop
```

The question's name ends at offset $30$ (where its type field begins), and the answer's name — a pointer at offsets $34$–$35$ — ends at $36$, where the answer's type field begins. A production parser should also check every index against `len(msg)` (here an out-of-range index raises `IndexError`) and limit names to 255 bytes, as RFC 1035 requires: parsing untrusted input defensively is how servers avoid crashes and memory-safety bugs.
:::
:::

::: exercise Head-of-line blocking {level=3}
An HTTP/2 connection over TCP carries four streams, each downloading a different image; the RTT is 100 ms. One TCP segment, carrying data of stream 1 only, is lost; the sender retransmits it one RTT later, and all later segments arrive. (a) For how long, approximately, is data of streams 2–4 that arrived after the lost segment held back from the browser? (b) What happens with HTTP/3 over QUIC? (c) Why could the HTTP/2 designers not fix this without changing the transport protocol?
::: solution
(a) TCP delivers bytes to the application strictly in order. Everything after the hole — for all four streams, since they are interleaved in one byte stream — waits in the receiver's buffer until the retransmission arrives, roughly one RTT (here about 100 ms, plus the time to detect the loss). (b) QUIC numbers and orders data per stream. The lost packet's data belong only to stream 1, so streams 2–4 are delivered as they arrive; only stream 1 waits for the retransmission. (c) The blocking happens inside TCP, in the operating system kernel, below HTTP: TCP's service is a single ordered byte stream, and it has no idea that the bytes belong to independent streams. Fixing it required a transport with streams as a first-class concept — QUIC — which, being implemented over UDP in user space, could also be deployed without waiting for every operating system and middlebox to change.
:::
:::
