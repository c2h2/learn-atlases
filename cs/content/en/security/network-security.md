A small company has an office network, a web shop hosted in a data centre, staff who work from home, and a payment provider it talks to over the internet. Its packets cross switches it owns, Wi-Fi that anyone in the car park can hear, and dozens of networks run by strangers. The protocols that carry them — Ethernet, ARP, IP, DNS, BGP, TCP — were designed for a cooperative network and mostly believe what they are told. Network security is the engineering that lets such an organisation communicate safely anyway: it decides which traffic may flow at all, protects the traffic that does flow, and watches for signs that something has gone wrong.

This chapter applies the ideas of [[security/security-principles]] to networks. We first ask what an attacker on a network can do and recall, briefly, the weaknesses of the protocols themselves — many of which were met already in the networks course, where they are explained with their protocols. We then study **firewalls** as reference monitors for traffic, with a first-match rule evaluator run on sample packets, and network **segmentation** and **zero trust** as defence in depth. Next come **secure channels** in practice — TLS, IPsec, WireGuard and SSH — and what a VPN does and does not provide. Finally we study **intrusion detection** and the base-rate problem that makes it hard, with Bayes' theorem doing the arithmetic. The cryptography behind secure channels is in [[cryptography/protocols]]; here we treat it as a tool with stated guarantees.

## Attackers on a network

Recall from [[security/security-principles#def-threat-model]] that a threat model fixes the adversary's capabilities. Networks have three standard positions.

::: definition Network adversaries {#def-net-adversary}
An **on-path** (or man-in-the-middle) adversary sees the packets between two parties and can drop, delay, modify, replay and inject them; this is the **Dolev–Yao** model used to analyse cryptographic protocols. An **off-path** adversary can send packets with arbitrary contents, including forged source addresses, but cannot see the traffic between the parties. A **local** adversary is attached to the same link or Wi-Fi network as its target, and can therefore take part in that link's protocols (ARP, DHCP, neighbour discovery).
:::

Which position an attacker occupies decides which defences matter. Cryptography defeats even an on-path adversary's attempts to read or modify traffic — but not to drop it, so availability needs other measures. Randomness in protocol fields (TCP initial sequence numbers, DNS query identifiers and source ports) is enough against off-path attackers, who must guess it, and useless against on-path ones, who simply read it. And a local adversary is only as dangerous as the link's lack of authentication allows.

### Protocol weaknesses, briefly

The networks course explains each of these with its protocol; here we only line them up by layer, with the defence.

| layer | weakness | defence |
|---|---|---|
| link | **ARP spoofing**: any host on a LAN may answer an ARP query for another host's address, redirecting its traffic | switch features that check ARP against DHCP records, port authentication (802.1X), and end-to-end encryption |
| link | open or weakly protected Wi-Fi is readable by anyone in range | WPA3 ([[networks/wireless-mobile]]) and, again, encryption above the link |
| network | **source-address spoofing**: IP does not authenticate source addresses ([[networks/network-principles]]) | **ingress filtering** at network edges (BCP 38, RFC 2827, 2000) |
| network | **BGP hijacks and leaks**: autonomous systems accept their neighbours' announcements ([[networks/routing]]) | prefix filtering, RPKI and route origin validation |
| transport | SYN floods, blind reset injection ([[networks/tcp-congestion]]) | SYN cookies, random sequence numbers, RFC 5961 checks |
| application | DNS cache poisoning ([[networks/application-layer]]) | source-port randomisation, DNSSEC, encrypted DNS |

The pattern is the same everywhere: a protocol accepts a claim (an address, a route, a reply) because checking it was once thought too expensive or unnecessary, and the defence either adds a check (filtering, signatures) or makes the claim irrelevant by authenticating at a higher layer. The second kind is far more robust, because it does not depend on every network on the path being configured well. That is the **end-to-end argument** applied to security: a property that the endpoints need should be ensured by the endpoints.

### Denial of service and amplification

Availability is the goal cryptography cannot protect. A **denial-of-service** (DoS) attack exhausts some resource of the target — link capacity, connection tables, CPU — and a **distributed** DoS (DDoS) uses many machines, often a botnet of compromised devices; the Mirai botnet of 2016, built from poorly secured cameras and routers, disrupted a major DNS provider and many websites that depended on it. The cheapest floods use **reflection**: the attacker sends requests with the victim's address forged as the source to servers that reply to the victim.

::: definition Amplification factor {#def-amplification}
For a request–response protocol, the **amplification factor** of a request is the ratio of the number of bytes the server sends in response to the number of bytes in the request. An attacker who can send $B$ bytes per second of spoofed requests with amplification factor $\alpha$ directs about $\alpha B$ bytes per second at the victim.
:::

Protocols with small UDP requests and large replies make the best reflectors. In 2014 the US computer emergency readiness team listed factors of about 28 to 54 for DNS and 556.9 for an old monitoring command of NTP; memcached servers left open to the internet were measured in 2018 at factors in the tens of thousands.

::: example Reflection arithmetic {#ex-amplification}
An attacker controls machines with a total upstream capacity of $200$ Mb/s and uses open DNS resolvers, each $64$-byte query producing a $3{,}200$-byte reply. What traffic reaches the victim? Which defences remove the problem, and at which point in the network?
::: solution
The amplification factor is $3200/64 = 50$, so the victim receives about $50 \times 200 = 10{,}000$ Mb/s $= 10$ Gb/s, enough to fill the access links of most organisations — from senders whose own traffic is unremarkable. Three defences act at different points. (1) **Ingress filtering** at the attacker's networks would drop the spoofed queries before they leave, since their source addresses do not belong there; it protects everyone except the network that deploys it, which is the economic difficulty ([[security/security-principles]]). (2) **Closing open resolvers** (answering only one's own clients) and **response rate limiting** at the reflectors remove the amplifier. (3) At the victim, nothing local helps once the link is full; the defence is upstream: the provider or a scrubbing service with more capacity filters the flood (here, by dropping DNS responses the victim never asked for) before it reaches the victim's link.
:::
:::

Modern protocols are designed not to be amplifiers. The clearest example is QUIC.

::: proposition An anti-amplification limit {#prop-quic-limit}
Suppose a server, before it has validated that a client really receives packets at its claimed address, sends at most $k$ times as many bytes to that address as it has received from it (QUIC, RFC 9000, uses $k = 3$), and that the client's first packet must be at least $m$ bytes long (QUIC requires $1200$). Then reflection through such a server has amplification factor at most $k$, and an attacker must send at least $m$ bytes to provoke any response at all.
:::

::: proof
An attacker who forges the victim's address never receives the server's replies, so it cannot complete address validation (which requires echoing a token sent to that address). The server therefore remains in the unvalidated state for that address, in which, by assumption, its total output to the address is at most $k$ times its input from the address. The only input attributable to the address is what the attacker sent in the victim's name, so the bytes reaching the victim are at most $k$ times the attacker's bytes. Since responses are triggered only by packets of at least $m$ bytes, the attacker's cost per response is at least $m$ bytes.
:::

Padding the first packet looks wasteful, but it is precisely what makes the protocol a poor weapon: an attacker gains at most a factor $3$, rather than $50$ or $50{,}000$.

## Firewalls

A **firewall** is a reference monitor for network traffic ([[security/access-control#def-refmon]]): placed where traffic crosses a trust boundary, it decides for each packet or connection whether to allow it, according to a policy. The simplest kind is a stateless **packet filter**.

::: definition Rule list and first-match semantics {#def-rules}
A **packet filter** has an ordered list of **rules** $r_1, \dots, r_n$. Each rule has a **match** — a predicate on packet header fields, typically a source prefix, a destination prefix, a protocol and a destination port range — and an **action**, allow or deny. Under **first-match semantics**, a packet receives the action of the first rule in the list that matches it; if no rule matches, it receives a **default action**.
:::

::: algorithm First-match packet filtering {#alg-first-match}
Given a packet $x$ and rules $r_1, \dots, r_n$ with default action $d$:

1. For $i = 1, \dots, n$: if $\mathit{match}_i(x)$, return $\mathit{action}_i$.
2. Return $d$.

The cost is $O(n)$ predicate evaluations per packet; production firewalls compile the rules into decision trees or hash tables keyed by fields to make it nearly independent of $n$.
:::

Fail-safe defaults ([[security/security-principles#def-saltzer-schroeder]]) say the default action must be **deny**: anything not explicitly needed is refused, so a forgotten rule blocks a service (and someone complains) rather than exposing one (and nobody notices). The usual policy for an organisation's border is *deny inbound except to named public services, allow outbound for the protocols staff need*, plus — under **egress filtering** — refusal of outbound traffic that should never occur, such as servers opening connections to arbitrary internet hosts, which is how many compromised machines contact their controllers.

::: example Evaluating a rule set {#ex-firewall}
A company's border firewall protects a public web server at `192.0.2.10`, an SSH server at `192.0.2.20`, and internal networks in `10.0.0.0/8`, of which the laboratory subnet `10.0.5.0/24` is quarantined. Evaluate six packets against the rule list below.
::: solution
```python
from ipaddress import ip_address, ip_network

# (action, source network, destination network, protocol, destination port or None)
RULES = [
    ("allow", "0.0.0.0/0",    "192.0.2.10/32", "tcp", 443),   # 1 public web server
    ("allow", "10.0.0.0/8",   "192.0.2.20/32", "tcp", 22),    # 2 SSH from inside only
    ("deny",  "10.0.5.0/24",  "0.0.0.0/0",     "any", None),  # 3 quarantined lab subnet
    ("allow", "10.0.0.0/8",   "0.0.0.0/0",     "tcp", 443),   # 4 staff browse the web
    ("deny",  "0.0.0.0/0",    "0.0.0.0/0",     "any", None),  # 5 default deny
]

def decide(src, dst, proto, port):
    """First-match evaluation: the first rule whose fields all match decides."""
    for i, (action, s, d, p, dport) in enumerate(RULES, start=1):
        if (ip_address(src) in ip_network(s) and ip_address(dst) in ip_network(d)
                and p in ("any", proto) and dport in (None, port)):
            return i, action
    return None, "deny"                       # fail-safe if no rule matches

for pkt in [("203.0.113.7", "192.0.2.10", "tcp", 443),
            ("203.0.113.7", "192.0.2.20", "tcp", 22),
            ("10.1.2.3",    "192.0.2.20", "tcp", 22),
            ("10.0.5.9",    "198.51.100.1", "tcp", 443),
            ("10.1.2.3",    "198.51.100.1", "tcp", 443),
            ("10.1.2.3",    "198.51.100.1", "udp", 53)]:
    print(pkt, "->", decide(*pkt))
```

```console
('203.0.113.7', '192.0.2.10', 'tcp', 443) -> (1, 'allow')
('203.0.113.7', '192.0.2.20', 'tcp', 22) -> (5, 'deny')
('10.1.2.3', '192.0.2.20', 'tcp', 22) -> (2, 'allow')
('10.0.5.9', '198.51.100.1', 'tcp', 443) -> (3, 'deny')
('10.1.2.3', '198.51.100.1', 'tcp', 443) -> (4, 'allow')
('10.1.2.3', '198.51.100.1', 'udp', 53) -> (5, 'deny')
```

An outside host reaches the web server (rule 1) but not SSH (rule 5); an inside host reaches SSH (rule 2) and the web (rule 4); the quarantined lab is blocked by rule 3 before rule 4 can allow it. The last packet — a DNS query straight to an outside server — is denied by default, which is intended if staff must use the company's resolver, and a bug report otherwise. But there is a hole: a lab machine connecting to the SSH server matches rule 2 *before* reaching rule 3, so the quarantine does not cover it. Order is part of the policy.
:::
:::

The hole in the example is an instance of a general phenomenon that firewall analysis tools look for.

::: definition Shadowed rules {#def-shadow}
Rule $r_j$ is **shadowed** if every packet that matches $r_j$ matches some earlier rule $r_i$, $i < j$; then $r_j$ never decides anything. It is **partially overridden** if some packets matching it are decided by earlier rules with a different action.
:::

::: proposition Detecting shadowing {#prop-shadow}
If each rule's match is a product of intervals — one interval per header field (prefixes and port ranges are intervals) — then whether rule $r_j$ is shadowed can be decided exactly, in time polynomial in the number of rules for a fixed number of fields.
:::

::: proof
Rule $r_j$ is shadowed exactly when its match box $M_j$ is contained in the union $M_1 \cup \dots \cup M_{j-1}$ of the earlier boxes. Along each field $f$, the endpoints of the intervals of $M_1, \dots, M_j$ cut $M_j$'s interval into at most $2j$ elementary pieces, inside each of which every earlier interval either contains the whole piece or misses it. The product of elementary pieces over the $d$ fields partitions $M_j$ into at most $(2j)^d$ cells, and each cell is either entirely inside a box $M_i$ or entirely outside it. So $M_j$ is covered if and only if every cell lies in some earlier box, which we check by testing each cell against each of the $j - 1$ earlier rules: $O(j \cdot (2j)^d)$ tests, polynomial for fixed $d$.
:::

(In the example, rule 3 is partially overridden by rule 2; a tool would flag it, and the fix is to move the quarantine rule to the top.) Stateless filters have a deeper limitation: to allow staff to browse the web they must also allow the *replies*, from port 443 on any outside host to high ports on inside hosts, which a forger can imitate. A **stateful** firewall keeps a **connection-tracking** table: an outbound connection creates an entry, and inbound packets are allowed only if they belong to an existing entry. Linux's netfilter (configured with `nftables`) and the firewalls of every home router work this way. Application-layer gateways and web proxies go further and inspect the content of the traffic, at the cost of becoming a large, exposed parser — part of the attack surface ([[security/security-principles#prop-combine]]).

::: quiz
A rule list is (1) allow TCP from anywhere to `192.0.2.10` port 80; (2) deny TCP from `198.51.100.0/24` to `192.0.2.10` port 80; (3) deny everything. What happens to a TCP packet from `198.51.100.7` to `192.0.2.10` port 80?

- [x] It is allowed by rule 1, and rule 2 is shadowed.
- [ ] It is denied by rule 2, because deny rules take precedence.
- [ ] It is denied by rule 3, the default.
- [ ] The result depends on the order in which the firewall loaded the rules.
::: solution
Under first-match semantics ([[#def-rules]]) the packet matches rule 1 and is allowed; every packet matching rule 2 also matches rule 1, so rule 2 is shadowed ([[#def-shadow]]) and never takes effect. To block that network, rule 2 must come before rule 1. (Some systems, such as cloud security groups, use "any allow wins" semantics instead; know which your system uses.)
:::
:::

### Segmentation and zero trust

A single border firewall creates a "hard shell with a soft centre": once an attacker is inside — through a phishing email, a compromised laptop, a vulnerable server — everything is reachable. **Segmentation** applies defence in depth to the network: separate zones for public servers (a **DMZ**), staff machines, databases, payment systems and industrial controls, with firewalls between them that allow only the flows each zone needs. A web server in the DMZ may reach the database on its port and nothing else; staff laptops may not reach the database at all. An intruder must then cross several independent boundaries, each one an opportunity for detection.

**Zero trust** (Google's BeyondCorp, described from 2014; NIST SP 800-207, 2020) takes the idea to its conclusion: network location confers no trust at all. Every request to every service is authenticated and authorised on its own merits — who the user is, whether the device is managed and patched, whether this access is normal — usually by an access proxy in front of the service, so being "on the office network" grants nothing. Zero trust is not a product but the principle of complete mediation applied to networks: decide every access, not merely the first packet at the border.

## Secure channels in practice

Filtering decides *whether* traffic flows; secure channels protect what does. Their guarantees against an on-path adversary — confidentiality, integrity, authentication of the endpoints and, with ephemeral key exchange, forward secrecy — come from the authenticated key exchange and authenticated encryption of [[cryptography/protocols]]. The protocols differ mainly in *what* they protect and *how identities are established*.

- **TLS** (1.3, RFC 8446, 2018) protects one application connection — HTTPS, mail submission, database connections — and authenticates servers (and optionally clients) with certificates ([[cryptography/signatures]]). It is the default answer for any application protocol. Its metadata limits are in [[networks/application-layer]].
- **IPsec** (architecture RFC 4301, 2005; key exchange IKEv2, RFC 7296, 2014) protects IP packets between hosts or between gateways. Its **Encapsulating Security Payload** (ESP) provides authenticated encryption; in **tunnel mode** the whole original packet, headers included, is encrypted and carried inside a new packet between two gateways — the classic site-to-site VPN.
- **WireGuard** (Jason Donenfeld, 2017; in Linux since 2020) is a deliberately small VPN protocol built on the Noise framework, with a fixed modern suite (Curve25519, ChaCha20-Poly1305, BLAKE2s) and peers identified simply by their public keys. Its few thousand lines of code are an application of economy of mechanism: no cipher negotiation, hence no downgrade attacks, and a code base small enough to audit.
- **SSH** (Tatu Ylönen, 1995; SSH-2 in RFCs 4251–4254, 2006) protects remote logins and file transfers. It usually authenticates servers by **trust on first use**: the client records the server's host key at the first connection and warns loudly if it ever changes. The first connection is therefore unprotected against an on-path attacker, which is why host keys should be distributed in advance (or certified) for important servers, and why the warning must never be ignored.

::: example What a VPN protects {#ex-vpn}
An employee in a café connects to the company's VPN, then visits an external news site over HTTPS and opens the internal wiki. For each of the café's Wi-Fi operator, the company, and the news site, say what it can observe.
::: solution
The **café operator** sees only encrypted packets between the laptop and the company's VPN gateway: their sizes, timing and the gateway's address, but not which sites are visited (assuming the laptop's DNS queries also go through the tunnel). The **company**, at the other end of the tunnel, sees the destination of every connection — the news site's address and, from DNS and TLS metadata, its name — and everything on the internal wiki, but not the content of the HTTPS session to the news site, which is encrypted end to end by TLS. The **news site** sees connections coming from the company's gateway address rather than the café's, plus everything the browser itself reveals: cookies, logins and browser fingerprint ([[security/privacy]]). The VPN moved the point of trust from the café to the company; it did not remove it.
:::
:::

::: warning "A VPN makes me secure and anonymous"
A VPN creates an encrypted tunnel to a gateway; it protects traffic from the networks *between you and the gateway*, nothing more. The gateway's operator — your employer, or a commercial VPN provider — sees what your local network used to see, so you are choosing whom to trust, not removing the need for trust. It does not protect you from malware on your device, from the website you visit, or from tracking by cookies and logins, and it adds nothing to the confidentiality of a connection already protected by TLS. And inside an organisation, a VPN that admits a laptop to the whole internal network is the "soft centre" problem again: a compromised laptop becomes an insider. Zero-trust access, which authorises each service separately, is the modern correction.
:::

## Intrusion detection

Prevention fails sometimes, so networks are also watched. An **intrusion detection system** (IDS) examines traffic (a network IDS, such as Snort, Suricata or Zeek) or host activity (a host IDS) and raises alarms; an intrusion *prevention* system also blocks what it detects.

::: definition Signature and anomaly detection {#def-ids}
A **signature-based** (misuse) detector raises an alarm when activity matches a pattern describing known attacks — a byte sequence in a packet, a sequence of requests. An **anomaly-based** detector builds a model of normal behaviour (traffic volumes, which hosts talk to which, typical login times) and raises an alarm when activity deviates from it by more than a threshold. A detector's quality is described by its **detection rate** (true-positive rate) $\Pr[A \mid I]$ and its **false-alarm rate** (false-positive rate) $\Pr[A \mid \neg I]$, where $A$ is the event "alarm" and $I$ the event "the activity is an intrusion".
:::

Signatures are precise but see only what is already known, and encryption hides payloads from network sensors, pushing detection towards endpoints and towards metadata (who connects to whom, how often, how much). Anomaly detection can find the new, but "unusual" is not the same as "malicious", and here arithmetic becomes decisive.

::: proposition The base-rate problem {#prop-base-rate}
Let the fraction of monitored events that are intrusions be $\pi = \Pr[I]$, the detection rate $d = \Pr[A \mid I]$ and the false-alarm rate $f = \Pr[A \mid \neg I]$. Then the probability that an alarm signals a real intrusion is
$$
\Pr[I \mid A] = \frac{d\pi}{d\pi + f(1 - \pi)},
$$ {#eq-base-rate}
and if $f \gg \pi$, most alarms are false whatever the value of $d$: $\Pr[I \mid A] \le \pi / (f(1 - \pi)) \approx \pi/f$.
:::

::: proof
By Bayes' theorem, $\Pr[I \mid A] = \Pr[A \mid I]\Pr[I] / \Pr[A]$, and by the law of total probability $\Pr[A] = \Pr[A \mid I]\Pr[I] + \Pr[A \mid \neg I]\Pr[\neg I] = d\pi + f(1 - \pi)$, which gives [[#eq-base-rate]]. For the bound, drop the term $d\pi$ from the denominator: $\Pr[I \mid A] \le d\pi/(f(1 - \pi)) \le \pi/(f(1 - \pi))$ since $d \le 1$, and this is $\pi/f$ up to a factor $1/(1 - \pi)$, which is $1 + O(\pi)$ for small $\pi$.
:::

::: example How many alarms are real? {#ex-ids}
A network sees $10^6$ connections a day, of which $20$ are part of intrusions. A detector catches $99\%$ of intrusive connections and wrongly flags $0.1\%$ of normal ones. How many alarms a day, and what fraction are real? What false-alarm rate would make two-thirds of alarms real?
::: solution
Here $\pi = 2 \times 10^{-5}$. Expected true alarms: $20 \times 0.99 = 19.8$; false alarms: $(10^6 - 20) \times 0.001 \approx 1000$. So about $1020$ alarms a day, of which $19.8/1019.8 \approx 1.9\%$ are real — an analyst must investigate fifty false alarms for each true one, and will soon start ignoring them, which is the real failure. With $f = 10^{-5}$, false alarms drop to about $10$ and $\Pr[I \mid A] = 19.8/(19.8 + 10.0) \approx 0.66$. Reducing false alarms by a factor of $100$ mattered far more than improving detection from $99\%$ to $100\%$ could.
:::
:::

::: widget bayes
mode: test
prevalence: 0.0001
sensitivity: 0.99
specificity: 0.999
caption: The base-rate problem ([[#prop-base-rate]]) as natural frequencies: "prevalence" is the fraction of events that are intrusions, "sensitivity" the detection rate and "specificity" one minus the false-alarm rate. With one intrusion in $10{,}000$ events, $99\%$ detection and a $0.1\%$ false-alarm rate, only about $9\%$ of alarms are real. Lower the prevalence to its minimum and watch the true alarms vanish among the false ones; then raise the specificity towards $100\%$ — that slider, not sensitivity, controls whether alarms can be trusted.
:::

Stefan Axelsson's 1999 analysis of this effect explains the shape of modern security operations. Detectors are tuned for low false-alarm rates and their alerts are **correlated** — an alarm that coincides with a suspicious login and a new outbound connection from the same host is far more credible than any one of them — so that analysts see a few high-quality incidents rather than thousands of events. Logs from firewalls, servers, authentication systems and endpoints are collected centrally (in a SIEM, a security information and event management system) so that such correlations are possible, and so that, after an incident, investigators can reconstruct what happened. **Honeypots** — decoy systems and credentials that no legitimate user should ever touch — are the extreme case: their base rate of legitimate use is zero, so every alarm is meaningful.

::: quiz
A detector has a $100\%$ detection rate and a $1\%$ false-alarm rate. One event in $10{,}000$ is an intrusion. About what fraction of alarms are real?

- [ ] $99\%$
- [ ] $50\%$
- [x] $1\%$
- [ ] $0.01\%$
::: solution
By [[#eq-base-rate]], $\Pr[I \mid A] = 10^{-4}/(10^{-4} + 0.01 \times 0.9999) \approx 10^{-4}/0.0101 \approx 0.0098$, about $1\%$. Out of $10{,}000$ events there is $1$ true alarm and about $100$ false ones.
:::
:::

::: history
Jeffrey Mogul described packet filtering for Unix gateways in 1989, and William Cheswick and Steven Bellovin's *Firewalls and Internet Security* (1994) set out border defence for a generation. James Anderson's 1980 report on threat monitoring and Dorothy Denning's "An intrusion-detection model" (*IEEE Transactions on Software Engineering*, 1987) founded intrusion detection; Vern Paxson's Bro (1998, now Zeek) and Martin Roesch's Snort (1998) became the standard network monitors, and Stefan Axelsson analysed the base-rate fallacy in 1999. Tatu Ylönen wrote SSH in 1995 after a password-sniffing incident at his university; IPsec was standardised from 1995 and revised in 2005, and Jason Donenfeld published WireGuard in 2017. Paul Ferguson and Daniel Senie's ingress-filtering recommendation, BCP 38, dates from 2000. Google's BeyondCorp papers (from 2014) and NIST SP 800-207 (2020) turned zero trust from a slogan into an architecture.
:::

## Where this leads

Network defences meet the attacks of earlier and later chapters at the boundary. [[security/authentication]] and [[security/access-control]] provide the identities and decisions on which zero-trust access proxies rely. Malicious software that crosses the perimeter, and the incident response that follows a detection, belong to [[security/malware]]. What networks reveal about people even when traffic is encrypted — and how anonymity networks such as Tor hide who talks to whom — is part of [[security/privacy]]. The protocols themselves are developed in [[networks]], the cryptographic core of secure channels in [[cryptography/protocols]], and the design of protocols that resist abuse from the start in [[security/secure-development]].

::: summary
- Network adversaries are **on-path**, **off-path** or **local** ([[#def-net-adversary]]); randomness stops off-path guessing, only cryptography stops on-path tampering, and nothing at the endpoints stops a link being flooded.
- Many protocols trust unauthenticated claims (ARP, IP source addresses, BGP, DNS); defences add checks or, more robustly, authenticate end to end.
- **Reflection** multiplies an attacker's bandwidth by the amplification factor ([[#def-amplification]]); ingress filtering, closed resolvers and anti-amplification limits such as QUIC's factor of $3$ ([[#prop-quic-limit]]) are the remedies.
- A **firewall** is a reference monitor for traffic: first-match rules ([[#alg-first-match]]) with **default deny**; order matters and shadowed rules ([[#def-shadow]]) can be found exactly. Stateful filtering, **segmentation** and **zero trust** extend complete mediation inside the network.
- **TLS**, **IPsec**, **WireGuard** and **SSH** provide secure channels at different layers; a **VPN** moves trust to its gateway rather than removing it.
- **Intrusion detection** by signatures or anomalies is limited by the **base rate**: when intrusions are rare, the false-alarm rate decides whether alarms mean anything ([[#prop-base-rate]]).
:::

## Exercises

::: exercise Amplification {level=1 check="40"}
A request of $50$ bytes elicits a response of $2{,}000$ bytes. What is the amplification factor? (Enter the number.)
::: solution
$2000/50 = 40$.
:::
:::

::: exercise Traffic at the victim {level=1 check="3"}
Under QUIC's anti-amplification limit, an attacker forging a victim's address sends $1$ Gb/s of initial packets to QUIC servers. At most how many Gb/s can reach the victim? (Enter the number.)
::: solution
By [[#prop-quic-limit]] with $k = 3$, at most $3$ Gb/s — the same order as the attacker's own capacity, so there is little to gain compared with flooding the victim directly.
:::
:::

::: exercise Which rule decides? {level=1}
Using the rules of [[#ex-firewall]], decide: (a) `10.0.5.9` to `192.0.2.20`, TCP port 22; (b) `203.0.113.7` to `192.0.2.10`, TCP port 80; (c) `10.2.0.1` to `192.0.2.10`, TCP port 443.
::: solution
(a) Rule 2 allows it — the quarantine hole. (b) No allow rule mentions port 80, so rule 5 denies it. (c) Rule 1 matches (any source to the web server on 443) and allows it.
:::
:::

::: exercise Fixing the rule order {level=2}
Rewrite the rule list of [[#ex-firewall]] so that the quarantined subnet is completely isolated while every other decision of the example stays the same, and prove that your list makes the same decision as the original for every packet not from `10.0.5.0/24`.
::: solution
Move rule 3 to the front: (3, 1, 2, 4, 5). For a packet from `10.0.5.0/24`, the new first rule matches and denies it, whatever its destination. For any other packet, the new first rule does not match, so the remaining rules are tried in the original relative order 1, 2, 4, 5; in the original list, rule 3 did not match such a packet either, so the original order 1, 2, 3, 4, 5 also effectively tried 1, 2, 4, 5. First-match semantics then gives the same decision in both lists.
:::
:::

::: exercise Alarms per day {level=2 check="0.5"}
A detector sees $5 \times 10^5$ events a day, $50$ of them intrusions. Its detection rate is $100\%$ and its false-alarm rate $10^{-4}$. What fraction of alarms are real? (Enter a decimal, rounded to one decimal place.)
::: solution
True alarms: $50$. False alarms: $(5 \times 10^5 - 50) \times 10^{-4} \approx 50$. So $\Pr[I \mid A] \approx 50/100 = 0.5$.
:::
:::

::: exercise Trust on first use {level=2}
Explain precisely what an on-path attacker can and cannot do against SSH's trust-on-first-use host authentication (a) at the first connection to a server, (b) at later connections, and (c) if the user habitually accepts changed-key warnings. Suggest two ways to remove the first-connection weakness.
::: solution
(a) At the first connection the client has no record of the server's key, so an attacker on the path can present its own key, be recorded as "the server", and relay the session, reading everything (including a typed password; public-key client authentication is safer because the signature is bound to the session and cannot be replayed to the real server). (b) Afterwards the client holds the genuine key (if the first connection was not attacked); an attacker presenting another key triggers the warning and cannot impersonate the server without its private key. (c) Accepting warnings reduces every connection to case (a). Remedies: distribute host keys in advance through a trusted channel (configuration management writing `known_hosts`), sign host keys with an SSH certificate authority whose key clients trust, or publish key fingerprints in DNSSEC-signed SSHFP records.
:::
:::

::: exercise The bound in the base-rate proposition {level=3}
Prove from [[#eq-base-rate]] that $\Pr[I \mid A] \ge 1/2$ if and only if $d\pi \ge f(1 - \pi)$, and deduce that with $d = 1$ and $\pi = 10^{-5}$ the false-alarm rate must be at most about $10^{-5}$ for half the alarms to be real. Interpret the condition in words.
::: solution
$\Pr[I \mid A] = d\pi/(d\pi + f(1-\pi)) \ge 1/2$ is equivalent (both denominators positive) to $2d\pi \ge d\pi + f(1-\pi)$, that is $d\pi \ge f(1 - \pi)$. With $d = 1$ and $\pi = 10^{-5}$, this is $f \le 10^{-5}/(1 - 10^{-5}) \approx 1.00001 \times 10^{-5}$. In words: half the alarms are real exactly when the expected number of true alarms is at least the expected number of false ones — the detector's false alarms on the vast majority of normal events must be no more frequent than the intrusions themselves.
:::
:::

::: exercise A stateful filter {level=3}
Extend the evaluator of [[#ex-firewall]] into a stateful filter: an outbound TCP packet allowed by the rules records the connection's 5-tuple (protocol, source address and port, destination address and port) in a table, and an inbound packet is allowed if it is the reverse of a recorded tuple, otherwise the rules apply. Test that a reply to an allowed outbound connection passes while an unsolicited packet with the same addresses but a different port is denied. What must a real implementation add?
::: solution
```python
from ipaddress import ip_address, ip_network

RULES = [("allow", "10.0.0.0/8", "0.0.0.0/0", "tcp", 443),
         ("deny",  "0.0.0.0/0",  "0.0.0.0/0", "any", None)]
conns = set()

def rules(src, dst, proto, dport):
    for action, s, d, p, port in RULES:
        if (ip_address(src) in ip_network(s) and ip_address(dst) in ip_network(d)
                and p in ("any", proto) and port in (None, dport)):
            return action
    return "deny"

def filter_packet(proto, src, sport, dst, dport):
    if (proto, dst, dport, src, sport) in conns:     # reply to a tracked connection
        return "allow (state)"
    action = rules(src, dst, proto, dport)
    if action == "allow":
        conns.add((proto, src, sport, dst, dport))
    return action

print(filter_packet("tcp", "10.1.2.3", 50000, "198.51.100.1", 443))
print(filter_packet("tcp", "198.51.100.1", 443, "10.1.2.3", 50000))
print(filter_packet("tcp", "198.51.100.1", 443, "10.1.2.3", 50001))
```

```console
allow
allow (state)
deny
```

The reply matches the reversed tuple and passes; the packet to another port does not, so the rules deny it. A real implementation also tracks TCP state (only a `SYN` may create an entry, entries are removed after `FIN`/`RST` or a timeout), checks that sequence numbers are plausible, bounds the table's size (otherwise a flood of new connections exhausts it — a denial of service against the firewall), and handles UDP and ICMP "connections" with timeouts and related error messages.
:::
:::
