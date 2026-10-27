A university runs an online system in which lecturers enter marks and students read them. It works perfectly: every page loads, every mark is stored, every report adds up. Is it *secure*? The question has no answer yet, because we have not said what the system must protect, against whom, and what it is allowed to assume. A student who changes a mark, a former employee whose account still works, a lecturer who reads marks for courses she does not teach, a flood of requests the night before results day, a backup tape left on a train — each is a different failure, stopped by different mechanisms, and some matter far more than others. Security engineering starts by making those questions precise.

This chapter sets up the vocabulary for the whole course. We define **security goals** (confidentiality, integrity, availability and their relatives), separate a **policy** — what is allowed — from the **mechanisms** that enforce it, and learn to write a **threat model**: who the adversary is and what they can do. We then meet three tools for thinking systematically about threats — attack trees, STRIDE and risk estimates — and the design principles of Saltzer and Schroeder (1975), which still describe most of what good security design means. Everything later in the course — authentication, access control, memory safety, web and network defence — is an instance of these ideas. The cryptographic building blocks we rely on are developed in [[cryptography]]; here we treat them as tools with stated guarantees.

## Security goals

Security is about keeping a system working as intended *when someone is trying to make it fail*. Reliability engineering asks what happens when components fail at random; security asks what happens when an intelligent adversary chooses the failure. That changes everything: an event with probability $10^{-9}$ under random faults may happen every time if an attacker can arrange it.

The classic goals are three.

::: definition Confidentiality, integrity and availability {#def-cia}
For information or a resource in a system:

- **Confidentiality**: it is disclosed only to those authorised to learn it.
- **Integrity**: it is modified (created, changed, deleted) only by those authorised to do so and in authorised ways; for a system, it behaves as specified.
- **Availability**: those authorised to use it can do so when they need to.

Together these are often called the **CIA triad**.
:::

Several further goals are refinements or combinations. **Authenticity** is integrity of origin: a message really comes from whom it claims. **Accountability** means that actions can be traced to the party responsible, which needs authentication and tamper-resistant logs. **Non-repudiation** is the strong form in which the responsible party cannot plausibly deny it to a third party (a digital signature gives this, a shared-key MAC does not: [[cryptography/signatures]]). **Privacy** concerns personal information and the people it describes rather than the system's owner, and is the subject of [[security/privacy]].

The goals pull against each other. Encrypting everything helps confidentiality but a lost key destroys availability. Requiring two people to approve every change protects integrity but slows legitimate work. Keeping detailed logs helps accountability but may hurt privacy. Security design is the art of choosing the trade-off that fits the system, and the choice depends on the system: for a bank's ledger integrity dominates, for a medical record confidentiality and availability both matter (a doctor locked out in an emergency is a failure too), and for a public website availability and integrity of content matter far more than confidentiality.

### Policies and mechanisms

A **security policy** says what is and is not allowed; a **mechanism** is a method, tool or procedure that enforces part of a policy. "Only the lecturer of a course may change its marks" is a policy; passwords, an access-control check in the application, and a database permission are mechanisms. Keeping the two apart is the first habit of a security engineer: arguing about passwords before agreeing who may change marks is arguing about the wrong thing.

To reason about policies precisely we use a state-machine view, following Bishop.

::: definition Security policy and secure system {#def-policy}
Model a system as a set $P$ of states with transitions between them. A **security policy** is a partition of $P$ into **authorised** (secure) states $Q$ and **unauthorised** states $P \setminus Q$. A system is **secure** with respect to the policy if it starts in a state of $Q$ and no sequence of transitions can take it to a state outside $Q$.
:::

::: definition Secure and precise mechanisms {#def-mechanism}
A **security mechanism** restricts the system to a set of reachable states $R \subseteq P$. The mechanism is **secure** if $R \subseteq Q$, **precise** if $R = Q$, and **broad** if there is a state $r \in R$ with $r \notin Q$.
:::

A secure mechanism may forbid some authorised states — a system that refuses every request is perfectly secure and perfectly useless — and the gap $Q \setminus R$ measures how much legitimate behaviour the mechanism costs. A broad mechanism has a hole. Most real mechanisms are both imprecise *and* slightly broad, and the engineering question is whether the hole matters.

::: proposition Combining mechanisms {#prop-combine}
Let mechanisms $M_1$ and $M_2$ restrict a system to $R_1$ and $R_2$, and suppose that running both restricts it to $R_1 \cap R_2$. If either mechanism is secure for a policy $Q$, so is the combination. The combination is precise only if $Q \subseteq R_1 \cap R_2$, which may fail even when both mechanisms are precise for different policies.
:::

::: proof
If $R_1 \subseteq Q$ then $R_1 \cap R_2 \subseteq R_1 \subseteq Q$, and similarly for $R_2$; so the combination is secure. Precision means $R_1 \cap R_2 = Q$; since $R_1 \cap R_2 \subseteq Q$ holds by security, precision is equivalent to $Q \subseteq R_1 \cap R_2$, that is, to neither mechanism forbidding an authorised state. If $M_1$ is precise for a different policy $Q_1$ with $Q \not\subseteq Q_1$, some authorised state of $Q$ lies outside $R_1 = Q_1$ and the combination forbids it.
:::

The assumption "running both gives $R_1 \cap R_2$" is the crux. It holds when each mechanism only *blocks* transitions — a firewall in front of an application with its own checks. It fails when one mechanism can change the behaviour of the other: a logging component that parses attacker-controlled input can itself become a way in, enlarging the reachable set rather than shrinking it. The Log4Shell vulnerability of December 2021 (CVE-2021-44228), in which a widely used Java logging library interpreted special strings in logged data as instructions to fetch and run code, is the classic case ([[security/web-security]]). Adding a component adds code, and code is attack surface.

::: quiz
A file server's policy says that only members of group `staff` may read `/payroll`. The administrator configures the operating system so that *nobody* can read `/payroll`, and payroll staff are given printouts instead. In the terms of [[#def-mechanism]], the mechanism is:

- [x] secure but not precise
- [ ] precise
- [ ] broad
- [ ] neither secure nor broad
::: solution
No reachable state has an unauthorised reader, so $R \subseteq Q$: secure. But states in which a staff member reads the file are authorised and unreachable, so $R \ne Q$: not precise. (Whether the printouts are secure is a separate question about a different system — paper also has an access-control problem.)
:::
:::

## Threat models

A policy says what must not happen. A **threat model** says what the adversary can do to make it happen. Without one, security claims are meaningless: a lock that stops a passer-by does not stop someone with a crowbar, and nobody calls the lock broken for that reason.

::: definition Threat model {#def-threat-model}
A **threat model** for a system states

1. the **assets** to protect and the security goals for each;
2. the **adversaries**: who they are, what they want, and their **capabilities** — what they can observe, what they can send or modify, what they know, how much computation, money and time they have, and which parts of the system they control or can corrupt;
3. the **trust assumptions**: the components assumed to behave correctly (the **trusted computing base**, TCB), and the assumptions about the environment.

A **vulnerability** is a weakness that lets an adversary within the model violate a goal; a **threat** is a potential violation; an **attack** is an attempt to exploit a vulnerability; a **control** or **countermeasure** reduces a vulnerability or its consequences.
:::

The **trusted computing base** deserves special attention: it is everything whose failure can break the policy. For the marks system it includes the web application, the database, the operating systems beneath them, the administrators, and the build system that produced the software. "Trusted" here means *relied upon*, not *trustworthy*. Making the TCB small is one of the most effective things a designer can do, because everything outside it may fail without harm.

The adversary's capabilities are where most of the thinking goes. Standard models recur across the course:

- **Network attacker** (the Dolev–Yao model of 1983): reads, deletes, modifies, replays and injects any message on the network, but cannot break the cryptography. Cryptographic protocols are designed against this attacker ([[cryptography/protocols]]); an **off-path** attacker who can inject but not read is weaker and is what TCP sequence numbers resist ([[networks/tcp-congestion]]).
- **Malicious user**: a legitimate user with an account who tries to exceed their rights — the student who wants to change marks. Access control ([[security/access-control]]) is designed against this attacker.
- **Malicious input**: anyone who can send data that the system parses — a web form, an uploaded file, an email. Memory-safety and injection bugs ([[security/memory-safety]], [[security/web-security]]) are exploited this way.
- **Insider**: an administrator or employee with legitimate privileges. Separation of duty and audit logs are the main defences.
- **Physical attacker**: steals a laptop or attaches a device. Disk encryption and tamper resistance address this.

The **attack surface** is the set of points at which an adversary can supply input or observe behaviour: every network port, every parsed file format, every system call, every user-interface field. Reducing it — closing ports, removing features, not parsing what you do not need — is often cheaper than securing it.

::: warning "Our system is secure" without a threat model
A claim that a system is secure is a claim about a set of adversaries. "Encrypted with AES-256" says nothing about an adversary who reads the key from a configuration file, phones the help desk, or exploits a bug in the web server that holds the decrypted data. Whenever you see a security claim, ask: secure against whom, doing what, and assuming what? Conversely, do not dismiss a threat model because it excludes some adversary — every useful model excludes something — but check that the exclusions are written down and acceptable.
:::

### Attack trees

An **attack tree** (Schneier, 1999) organises the ways an adversary can reach a goal.

::: definition Attack tree {#def-attack-tree}
An **attack tree** is a rooted tree whose root is the adversary's goal and whose internal nodes are sub-goals of two kinds: an **OR node** is achieved if *any* child is achieved, an **AND node** if *all* children are. Leaves are basic attack steps, each labelled with attributes such as a cost $c(\ell)$ to the adversary or a probability of success. The **cost** of a node $v$ is defined recursively:
$$
c(v) = \begin{cases} c(\ell) & \text{if } v = \ell \text{ is a leaf,} \\ \min_{u \text{ child of } v} c(u) & \text{if } v \text{ is an OR node,} \\ \sum_{u \text{ child of } v} c(u) & \text{if } v \text{ is an AND node.} \end{cases}
$$ {#eq-tree-cost}
:::

::: proposition Cheapest attack {#prop-cheapest}
Assume that the adversary's cost of carrying out a set of leaves is the sum of their costs, and that leaves in different subtrees are distinct. Then $c(\text{root})$ is the minimum total cost of a set of leaves that achieves the root, and evaluating [[#eq-tree-cost]] bottom-up takes time linear in the size of the tree.
:::

::: proof
By structural induction on the tree we prove that $c(v)$ is the minimum cost of a leaf set achieving $v$. For a leaf this is its own cost. For an OR node $v$, a set achieves $v$ exactly when it achieves some child $u$, so the cheapest set for $v$ is the cheapest among the cheapest sets for each child: by induction, $\min_u c(u)$. For an AND node, a set achieves $v$ exactly when it achieves every child. Because the children's subtrees have distinct leaves, a set achieving all children is a disjoint union of sets $S_u$, one achieving each child $u$, of cost $\sum_u \text{cost}(S_u)$, minimised by minimising each term separately: $\sum_u c(u)$. Each node is visited once and does work proportional to its number of children, so the total time is linear.
:::

When the same leaf appears in several subtrees (in the example below, "enter office after hours" serves two branches), the recursion may count it twice and overestimate the cost; the exact minimum is then a harder optimisation problem. In practice the tree is a thinking tool and the numbers are rough, so this matters less than it seems — but it is worth knowing which assumption a calculation makes.

::: example An attack tree for the exam paper {#ex-attack-tree}
An adversary wants to read an exam paper before the exam. It is printed and kept in a locked cabinet in the lecturer's office, and the file is on the lecturer's account, which needs a password and a second factor. The adversary can (with rough costs, in arbitrary units of effort): enter the office after hours ($100$), pick the cabinet lock ($300$) or find the key in the desk ($50$); learn the lecturer's password ($400$) and defeat the second factor ($1000$); or find the office PC left logged in ($150$, after entering the office); or bribe a member of the print-room staff ($500$). Find the cheapest attack, and see what two countermeasures do.
::: solution
The tree has three branches under the OR root: *steal the printed copy* = AND(enter office, OR(pick lock, find key)); *read the file* = OR(AND(password, second factor), AND(enter office, PC unlocked)); *bribe*. Bottom-up: OR(pick, key) $= \min(300, 50) = 50$, so the printed copy costs $100 + 50 = 150$. Remote login costs $400 + 1000 = 1400$ and the unattended PC $100 + 150 = 250$, so the file costs $250$. The root costs $\min(150, 250, 500) = 150$. A short program does the same:

```python
# Attack tree: ("leaf", name, cost) | ("and", name, [children]) | ("or", name, [children])
def cheapest(node):
    """Return (cost, list of leaves) of the cheapest way to achieve node."""
    kind, name, x = node
    if kind == "leaf":
        return x, [name]
    results = [cheapest(child) for child in x]
    if kind == "or":                      # attacker picks the cheapest child
        return min(results)
    cost = sum(c for c, _ in results)     # "and": every child is needed
    return cost, [leaf for _, leaves in results for leaf in leaves]

enter = ("leaf", "enter office after hours", 100)
tree = ("or", "read exam paper", [
    ("and", "steal printed copy", [
        enter,
        ("or", "open cabinet", [("leaf", "pick lock", 300),
                                ("leaf", "find key in desk", 50)])]),
    ("or", "read the file", [
        ("and", "log in remotely", [("leaf", "learn password", 400),
                                    ("leaf", "defeat second factor", 1000)]),
        ("and", "use unattended PC", [enter,
                                      ("leaf", "PC left unlocked", 150)])]),
    ("leaf", "bribe print-room staff", 500)])
print(cheapest(tree))
```

```console
$ python3 tree.py
(150, ['enter office after hours', 'find key in desk'])
```

If the lecturer keeps the key on her person (removing the $50$ leaf), the printed copy costs $100 + 300 = 400$ and the cheapest attack becomes the unattended PC at $250$. If PCs also lock automatically, the cheapest is now $\min(400, 1400, 500) = 400$. Two cheap procedural controls raised the adversary's cost from $150$ to $400$; the expensive technical control, the second factor, did nothing for the cheapest attack, because it protected a branch that was never the weakest. The adversary always takes the cheapest path, so effort spent elsewhere is wasted.
:::
:::

### STRIDE

Attack trees start from a goal. **STRIDE**, devised at Microsoft by Loren Kohnfelder and Praerit Garg in 1999, starts from the system: draw a **data-flow diagram** of external entities, processes, data stores and the data flows between them, mark the **trust boundaries** that data crosses, and for each element ask about six kinds of threat, each the violation of one property.

| threat | property violated | example in the marks system | typical control |
|---|---|---|---|
| **S**poofing | authenticity | logging in as the lecturer | authentication ([[security/authentication]]) |
| **T**ampering | integrity | altering a mark in transit or in the database | MACs, signatures, access control |
| **R**epudiation | non-repudiation | a lecturer denies changing a mark | audit logs, signatures |
| **I**nformation disclosure | confidentiality | reading other students' marks | encryption, access control |
| **D**enial of service | availability | flooding the server on results day | rate limiting, capacity, filtering |
| **E**levation of privilege | authorisation | a student gains lecturer rights | least privilege, input validation, isolation |

Not every threat applies to every element. In Microsoft's "STRIDE per element" chart, external entities are subject to S and R; processes to all six; data stores to T, I and D (and R when the store is a log); data flows to T, I and D.

::: example STRIDE for the marks system {#ex-stride}
The diagram has one external entity (the student's browser), one process (the web application), one data store (the marks database) and two data flows (browser to application, application to database), with a trust boundary between the browser and the application. List the threats STRIDE per element produces and pick three to discuss.
::: solution
The browser contributes S and R ($2$ threats), the application all six ($6$), the database T, I, D ($3$) and each data flow T, I, D ($3 \times 2 = 6$): $17$ threats. Three examples: *spoofing the browser* — someone logs in with a student's stolen password, countered by good authentication and multi-factor login; *information disclosure on the browser–application flow* — marks read on the network, countered by TLS; *elevation of privilege in the application* — a request that changes a mark, sent by a student who edits a hidden form field, countered by checking authorisation on the server for every request, never trusting the client. The last one is the most likely to be missed in development, and the reason "broken access control" heads the OWASP Top 10 list of web risks ([[security/web-security]]). STRIDE does not rank the threats; that is the job of a risk estimate.
:::
:::

## Risk

Security budgets are finite, so threats must be ranked. The classical quantitative approach estimates, for each threat, the **single loss expectancy** (SLE, the cost of one occurrence) and the **annualised rate of occurrence** (ARO), and multiplies them to get the **annualised loss expectancy**
$$
\text{ALE} = \text{SLE} \times \text{ARO}.
$$ {#eq-ale}
A control is worth buying, on this view, if the reduction in ALE exceeds its annual cost.

::: example Is the control worth it? {#ex-ale}
A breach of a customer database is estimated to cost $£200{,}000$ (notification, fines, lost business) and to happen about once in ten years. An improved monitoring and patching service costs $£8{,}000$ a year and is estimated to cut the rate to once in fifty years. Is it worth buying?
::: solution
Before: $\text{ALE} = 200{,}000 \times 0.1 = £20{,}000$. After: $200{,}000 \times 0.02 = £4{,}000$. The control reduces expected loss by $£16{,}000$ a year at a cost of $£8{,}000$, a net benefit of $£8{,}000$ a year. Notice how sensitive this is: if the true rate before was once in forty years ($\text{ARO} = 0.025$), the reduction would be only $£1{,}000$ and the control would not pay — and nobody knows the rate to within a factor of four.
:::
:::

Such numbers are guesses dressed as arithmetic, and experienced practitioners use them mainly to force explicit reasoning about likelihood and impact, often on coarse scales (low/medium/high) arranged in a **risk matrix**. The categories of response are more robust than the numbers: a risk can be **mitigated** (add controls), **transferred** (insurance, contracts), **avoided** (do not offer the feature, do not collect the data) or **accepted** (document it and move on). Avoidance is underrated: data you never collected cannot leak.

Risk is also shaped by **economics**. Ross Anderson's 2001 essay "Why information security is hard — an economic perspective" observed that many failures are failures of incentives: the party who could fix a problem is often not the party who suffers from it (a software vendor does not bear its customers' breach costs), security is hard for buyers to measure so they cannot reward it, and network effects reward shipping first and securing later. Good engineering cannot fix bad incentives alone, which is one reason regulation and liability are part of security.

## Design principles

In 1975 Jerome Saltzer and Michael Schroeder, writing about the Multics system, listed eight design principles for protection mechanisms. Half a century later they remain the best short guide to secure design.

::: definition The Saltzer–Schroeder principles {#def-saltzer-schroeder}
1. **Economy of mechanism**: keep the design as simple and small as possible, so that it can be inspected and its errors found.
2. **Fail-safe defaults**: base access decisions on permission rather than exclusion; the default is no access, and a mistake should deny rather than allow.
3. **Complete mediation**: check every access to every object for authority, not only the first one, and do not rely on cached decisions without considering when they become stale.
4. **Open design**: the design should not be secret; security should depend on keys or passwords, not on the ignorance of attackers.
5. **Separation of privilege**: where feasible, require two independent conditions (two keys, two people) to grant access.
6. **Least privilege**: every program and every user should run with the smallest set of privileges needed for the job.
7. **Least common mechanism**: minimise mechanisms shared by several users, since every shared mechanism is a potential channel between them.
8. **Psychological acceptability**: the human interface must be easy to use, so that users apply the protection routinely and correctly.

They also mentioned two principles that they judged imperfectly applicable to computers: **work factor** (compare the cost of circumventing a mechanism with the attacker's resources) and **compromise recording** (record that a compromise occurred even if you cannot prevent it).
:::

Each principle names a whole family of later techniques. *Economy of mechanism* is why the TCB should be small and why a microkernel or a hypervisor is easier to trust than a monolithic kernel ([[operating-systems/os-structure]]). *Fail-safe defaults* is the "default deny" rule of firewalls ([[security/network-security]]) and the reason a whitelist of allowed input is safer than a blacklist of dangerous input. *Complete mediation* is the reference monitor of [[security/access-control]], and its violation is the time-of-check-to-time-of-use bug. *Open design* is Kerckhoffs's principle of 1883 in cryptography. *Separation of privilege* is multi-factor authentication and two-person approval. *Least privilege* is why web servers drop root after binding to port 443 and why browsers run each site in a sandboxed process. *Least common mechanism* explains why shared caches are dangerous: the Spectre and Meltdown attacks of 2018 leaked secrets through processor caches and speculative execution, mechanisms shared between programs that were never meant to communicate. *Psychological acceptability* opened the field of usable security: Alma Whitten and Doug Tygar's 1999 study "Why Johnny can't encrypt" found that most participants could not use a well-designed email-encryption program correctly in 90 minutes.

::: example Applying the principles to a backup script {#ex-principles}
A nightly script, run as `root` by `cron`, copies the marks database to a remote server. It logs in to the remote server with a password stored in the script, and it accepts a configuration file from `/tmp` if one is present. Identify the violated principles and fix them.
::: solution
*Least privilege*: the script needs to read one database file and make one network connection; running as `root` gives it the whole machine. Run it as a dedicated unprivileged account that can read only the database dump. *Fail-safe defaults* and *complete mediation*: reading a configuration file from the world-writable `/tmp` lets any local user change where the backup goes; read configuration only from a directory writable by the backup account, and refuse to run if its permissions are wrong. *Open design* is not violated by publishing the script, but storing the password in it means anyone who reads the script can log in; use a key that is authorised on the remote side only for this task (for SSH, a key restricted to one command), so that the secret grants no more than the job needs — least privilege again. *Compromise recording*: log each run and alert if the backup fails or the destination changes. Note how one weakness (the `/tmp` file) would have given any local user `root`, because the script combined untrusted input with excessive privilege — the pattern behind most privilege-escalation bugs.
:::
:::

### Defence in depth

No single mechanism is perfect, so systems layer them: a firewall, then authentication, then authorisation, then encryption of stored data, then monitoring. The idea is **defence in depth**, and its benefit can be quantified under an idealised assumption.

::: proposition Layered defences {#prop-layers}
Suppose an attack must defeat $k$ layers of defence, and layer $i$ is defeated with probability $p_i$, independently of the others. Then the attack succeeds with probability $\prod_{i=1}^k p_i$. If instead, with probability $c$, a **common-mode** failure defeats all layers at once (and otherwise they fail independently), the attack succeeds with probability $c + (1 - c)\prod_{i=1}^k p_i \ge c$.
:::

::: proof
The attack succeeds exactly when every layer is defeated. By independence, the probability that all $k$ events occur is the product of their probabilities. In the second model, condition on whether the common-mode event happens: if it does (probability $c$) the attack succeeds; if not (probability $1 - c$) it succeeds with probability $\prod p_i$ by the first part. The law of total probability gives the sum, which is at least $c$ since the second term is non-negative.
:::

With three layers each defeated one time in ten, independence gives $10^{-3}$. But if one time in a hundred there is a single cause that defeats them all — the same stolen administrator password works on the firewall, the server and the database; all three run the same vulnerable library — the probability is $0.01 + 0.99 \times 0.001 \approx 0.011$, eleven times worse, and adding more layers can never push it below $0.01$. Layers help only when they are *diverse*: different mechanisms, different code, different credentials, different administrators.

::: widget plot
f: p^x; c + (1-c)*p^x
x: 1, 8
y: 0, 0.3
sliders: p=0.3:0.05:0.9:0.05; c=0.02:0:0.2:0.01
labels: independent layers p^k; with common-mode failure c + (1-c)p^k
caption: The probability that an attack defeats $k$ layers of defence ([[#prop-layers]]), against the number of layers $k$ on the horizontal axis. With independent layers (first curve) each extra layer multiplies the probability by $p$. Raise the common-mode probability $c$ and watch the second curve flatten onto the line $y = c$: once the layers share a weakness, adding more of the same kind is almost worthless. Set $c = 0$ to see the curves coincide.
:::

::: quiz
Which of these is the best example of *least common mechanism*?

- [ ] Requiring both a password and a hardware key to log in.
- [x] Giving each customer of a cloud service a separate virtual machine instead of separate accounts on one shared server.
- [ ] Publishing the source code of an encryption program.
- [ ] Denying every network connection that is not explicitly allowed.
::: solution
Least common mechanism asks us to minimise what users share. Separate virtual machines share only the hypervisor and the hardware, whereas accounts on one server share the kernel, the file system, temporary directories and every daemon ([[operating-systems/virtualisation]]). The other options illustrate separation of privilege, open design and fail-safe defaults.
:::
:::

### Security through obscurity

The principle of open design is often misread. It does not say secrets are bad: keys and passwords are secrets. It says the *design* must not be the secret, for three reasons: designs leak (through reverse engineering, departing employees or stolen documents) and cannot be changed cheaply when they do; a secret design cannot be reviewed by people who would find its flaws; and the defender cannot know whether the secret is still secret. A key, by contrast, is small, random and replaceable. Hiding details — not advertising software versions, not publishing network maps — can add a little to the attacker's work factor, but only as one layer on top of a design that is secure when fully known. Systems whose security rested entirely on secret algorithms have a poor record: the proprietary encryption of DVDs (CSS) was broken within weeks of its reverse engineering in 1999, and the secret ciphers of the GSM mobile system were reconstructed and found weak.

### People and process

Systems are run by people, and the cheapest attack is often on them. Phishing, pretexting to a help desk, and passwords written on monitors are not failures of users but of designs that ask humans to do what humans cannot do reliably — remember dozens of random strings, inspect URLs character by character, or tell a genuine warning from a false one after seeing hundreds of false ones. Good design makes the secure action the easy action: password managers and hardware keys that check the website's identity for the user ([[security/authentication]]), safe defaults that need no configuration, and warnings shown rarely enough to be believed. Organisations also need *process*: patching, backups, key management, incident response ([[security/malware]]) and the habit of learning from failures without blaming individuals.

::: history
The modern field began with reports for the US Department of Defense on sharing computers between users with different clearances. Willis Ware's Defense Science Board task force report *Security Controls for Computer Systems* (1970) analysed the problem; James P. Anderson's *Computer Security Technology Planning Study* (1972) introduced the reference monitor. Butler Lampson's "Protection" (1971) defined the access-control matrix, and David Bell and Leonard LaPadula's models (1973) formalised military confidentiality. Jerome Saltzer and Michael Schroeder's "The protection of information in computer systems" (*Proceedings of the IEEE*, 1975) gave the design principles of this chapter. The US *Trusted Computer System Evaluation Criteria* (the "Orange Book", 1983, issued as a standard in 1985) graded systems by the assurance they offered, and was succeeded internationally by the Common Criteria (ISO/IEC 15408, 1999). Threat modelling as an engineering practice dates from STRIDE (Kohnfelder and Garg at Microsoft, 1999) and Bruce Schneier's attack trees (1999). Ross Anderson's *Security Engineering* (first edition 2001, third 2020) and his 2001 essay on economics broadened the subject from mechanisms to systems, people and incentives.
:::

## Where this leads

The rest of the course applies these ideas layer by layer. [[security/authentication]] establishes who is asking — the S of STRIDE. [[security/access-control]] decides what they may do, with the reference monitor as the embodiment of complete mediation and formal models of confidentiality and integrity policies. [[security/memory-safety]] and [[security/web-security]] study the bugs through which malicious input turns into elevation of privilege, and their mitigations. [[security/network-security]] applies defence in depth to networks, [[security/malware]] studies what happens when defences fail and how to respond, [[security/privacy]] turns to the people whose data systems hold, and [[security/secure-development]] builds threat modelling and testing into the way software is made. The cryptography used throughout is in [[cryptography]], and the ethics of security work — disclosure, testing only systems you are authorised to test — in [[software-engineering/professional-ethics]].

::: summary
- Security means preserving **confidentiality, integrity and availability** ([[#def-cia]]) and related goals (authenticity, accountability, non-repudiation) against an intelligent adversary. The goals conflict, and the right balance depends on the system.
- Separate the **policy** (which states are authorised) from the **mechanisms** that enforce it; a mechanism is secure if it never reaches an unauthorised state and precise if it allows every authorised one ([[#def-mechanism]]).
- Every security claim is relative to a **threat model**: assets, adversaries and their capabilities, and the **trusted computing base** ([[#def-threat-model]]). Keep the TCB and the attack surface small.
- **Attack trees** find the adversary's cheapest path ([[#prop-cheapest]]); effort spent on branches that are not the weakest is wasted. **STRIDE** walks a data-flow diagram asking about spoofing, tampering, repudiation, disclosure, denial of service and elevation of privilege.
- **Risk** combines likelihood and impact (ALE $=$ SLE $\times$ ARO); the numbers are rough, but mitigate, transfer, avoid or accept is a useful discipline.
- The **Saltzer–Schroeder principles** — economy of mechanism, fail-safe defaults, complete mediation, open design, separation of privilege, least privilege, least common mechanism, psychological acceptability — still guide design.
- **Defence in depth** multiplies the attacker's difficulty only when layers fail independently; common-mode failures put a floor under the probability of breach ([[#prop-layers]]).
:::

## Exercises

::: exercise Classify the goal {level=1}
For each incident, name the security goal (confidentiality, integrity or availability) primarily violated: (a) ransomware encrypts a hospital's patient records; (b) a laptop with an unencrypted disk of salary data is stolen; (c) an attacker changes the bank account number on a supplier's invoice; (d) a botnet floods a ticketing site during a sale.
::: solution
(a) Availability — the records still exist and are unchanged in content, but nobody can use them (many ransomware groups now also steal data first, adding confidentiality). (b) Confidentiality. (c) Integrity (specifically authenticity of the payment details). (d) Availability.
:::
:::

::: exercise Counting STRIDE threats {level=1 check="31"}
A data-flow diagram has two external entities, two processes, one data store and four data flows. How many threats does STRIDE per element list, using S, R for entities; all six for processes; T, I, D for stores and flows? (Enter the number.)
::: solution
Entities give $2 \times 2 = 4$, processes $2 \times 6 = 12$, the store $3$ and the flows $4 \times 3 = 12$, a total of $4 + 12 + 3 + 12 = 31$. The number grows quickly with the diagram, which is why teams prioritise the elements that cross trust boundaries.
:::
:::

::: exercise Annualised loss {level=1 check="12400"}
Laptops containing customer data are stolen at a rate of $0.6$ per year across a firm; each theft costs $£25{,}000$ in notification and fines when the disk is unencrypted, and $£1{,}000$ (the hardware) when it is encrypted. Disk encryption costs $£2{,}000$ a year to manage. By how much does encryption reduce the annualised loss expectancy net of its cost? (Enter the amount in pounds.)
::: solution
Without encryption, $\text{ALE} = 0.6 \times 25{,}000 = £15{,}000$. With it, $\text{ALE} = 0.6 \times 1{,}000 = £600$. The reduction is $£14{,}400$, and after the $£2{,}000$ cost the net benefit is $£12{,}400$ a year.
:::
:::

::: exercise Which principle? {level=2}
Name the Saltzer–Schroeder principle best illustrated or violated by each, and say whether it is followed or violated: (a) a web application checks the user's role when the page loads but not when the form on it is submitted; (b) launching a missile requires two officers to turn keys simultaneously; (c) a phone's operating system gives each app access only to the files and sensors it has requested and the user approved; (d) a router ships with the administrator password `admin`; (e) a system prints a security warning on every login, which users click through without reading.
::: solution
(a) Complete mediation, violated: the submission is an access too, and an attacker can submit the form without loading the page. (b) Separation of privilege, followed. (c) Least privilege, followed. (d) Fail-safe defaults, violated — the default configuration is open to anyone who knows the published password; secure products ship with unique per-device passwords or force a change on first use. (e) Psychological acceptability, violated: warnings that are always shown train users to ignore them.
:::
:::

::: exercise Shared leaves in an attack tree {level=2 check="300"}
In [[#ex-attack-tree]], "enter office after hours" appears in two branches. Suppose the adversary wants to *both* read the file and steal the printed copy (an AND node over those two branches), and entering the office is done once for both. What is the true minimum cost, and what does [[#eq-tree-cost]] give if the shared leaf is counted twice? (Enter the true minimum.)
::: solution
Printed copy: enter ($100$) + key ($50$). File: either remote login ($1400$) or unattended PC ($100$ for entry + $150$). Sharing the entry, the combination "enter, key, PC unlocked" costs $100 + 50 + 150 = 300$. The recursion computes $c(\text{copy}) + c(\text{file}) = 150 + 250 = 400$, counting the entry twice. So the true minimum is $300$; the recursion overestimates by $100$, exactly the cost of the shared leaf counted twice.
:::
:::

::: exercise Defence in depth with correlation {level=2 check="0.01099"}
Three layers are each defeated with probability $0.1$; with probability $0.01$ a common cause defeats all three. Using [[#prop-layers]], compute the probability that an attack succeeds. (Enter the exact value.)
::: solution
$c + (1 - c)p^3 = 0.01 + 0.99 \times 0.001 = 0.01 + 0.00099 = 0.01099$, about eleven times the value $0.001$ for independent layers.
:::
:::

::: exercise When combining mechanisms loses precision {level=3}
[[#prop-combine]] assumes that running two mechanisms together restricts the system to $R_1 \cap R_2$. (a) Show that the set of states reachable under both mechanisms is always a subset of $R_1 \cap R_2$, and give a small state machine in which it is a proper subset although $M_1$ is precise for $Q_1$ and $M_2$ for $Q_2$. (b) Explain why real combinations can even be *less secure* than either part.
::: solution
(a) Model each mechanism as a set of transitions it blocks, and let the combination block the union. Any run allowed by the combination is allowed by each mechanism alone, so every state it reaches lies in $R_1$ and in $R_2$. For a proper subset, take states $s_0$ (start), $t$, $t'$, $s$ with transitions $s_0 \to t \to s$ and $s_0 \to t' \to s$. Let $M_1$ block $s_0 \to t'$ and $M_2$ block $s_0 \to t$. Then $R_1 = \{s_0, t, s\} = Q_1$ and $R_2 = \{s_0, t', s\} = Q_2$, so each is precise for its policy, and $R_1 \cap R_2 = \{s_0, s\}$. But together they block both ways out of $s_0$, so only $\{s_0\}$ is reachable: the authorised state $s \in Q_1 \cap Q_2$ is lost. Reachability is a property of paths, not of states, so intersecting per-mechanism reachable sets overestimates what the combination allows. (A real instance: one rule allows transfers only from verified accounts, another only from accounts still in their first-week probation; separately each permits a new customer to transfer eventually, together they never do.)

(b) The proposition assumes each mechanism only blocks transitions. A real security component also adds code — it parses input, holds credentials, runs with privilege — and its bugs add *new* transitions. An intrusion-detection system that parses every packet, a logging library that interprets logged strings (Log4Shell), or an endpoint agent running in the kernel can each become the way in, so the reachable set of the combination can contain states that neither original system could reach. Every mechanism should be judged also as attack surface.
:::
:::

::: exercise Attack trees with probabilities {level=3}
Instead of costs, label each leaf $\ell$ with a probability $q(\ell)$ that the adversary succeeds at that step, independently of all others, and suppose the adversary tries every leaf. Give recursive formulas for the probability that an OR node and an AND node are achieved, prove them under the assumption that subtrees have disjoint leaves, and evaluate the root of [[#ex-attack-tree]] treating the two "enter office" leaves as independent attempts, with probabilities enter $0.5$, pick lock $0.2$, find key $0.3$, password $0.1$, second factor $0.05$, PC unlocked $0.4$, bribe $0.1$.
::: solution
For an AND node, all children must succeed; with disjoint leaf sets, the children's success events depend on disjoint sets of independent leaves and are therefore independent, so $q(v) = \prod_u q(u)$. For an OR node, the node fails only if every child fails, so $q(v) = 1 - \prod_u (1 - q(u))$. Both follow by structural induction exactly as in [[#prop-cheapest]], with independence of children replacing additivity of cost.

Evaluate: open cabinet $= 1 - 0.8 \times 0.7 = 0.44$; printed copy $= 0.5 \times 0.44 = 0.22$. Remote login $= 0.1 \times 0.05 = 0.005$; unattended PC $= 0.5 \times 0.4 = 0.2$; file $= 1 - 0.995 \times 0.8 = 0.204$. Root $= 1 - (1 - 0.22)(1 - 0.204)(1 - 0.1) = 1 - 0.78 \times 0.796 \times 0.9 = 1 - 0.558792 = 0.441208 \approx 0.44$. The assumption that the adversary tries everything (and is not deterred by being caught on the first failed attempt) makes this an upper estimate; with a real shared entry leaf the events are correlated and the formula is only approximate.
:::
:::
