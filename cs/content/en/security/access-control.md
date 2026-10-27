Once a system knows who is asking ([[security/authentication]]), it must decide whether to grant the request. May this lecturer change that mark? May this process open that file, connect to that address, read that camera? Every multi-user system answers millions of such questions a second, and an error in any one of them can hand an attacker the whole system — "broken access control" has headed the OWASP list of web-application risks since 2021. Behind the questions lie two quite different concerns: *what the policy should be* (who ought to be allowed what) and *how to enforce it* so that no request slips past the check.

This chapter develops both. We start with Lampson's **access-control matrix** and its two implementations, access-control lists and capabilities, with Unix permissions as the example everyone uses. We define the **reference monitor**, the mechanism that must mediate every access, and the time-of-check-to-time-of-use bugs that arise when it does not. We prove that deciding whether a general access-control system can ever leak a right is **undecidable**, then study the **mandatory** policies that sidestep the problem — Bell–LaPadula for confidentiality and Biba for integrity — and the **role-based** model used in organisations. We end with the confused-deputy problem, capability systems and **sandboxing**, including a system-call filter written and run on this machine. The hardware and kernel mechanisms underneath — privilege levels, page tables, the system-call boundary, containers and virtual machines — are in [[operating-systems/os-structure]] and [[operating-systems/virtualisation]], and are not repeated here.

## The access-control matrix

::: definition Subjects, objects and the access-control matrix {#def-acm}
A protection state consists of a set $S$ of **subjects** (active entities: users, processes), a set $O$ of **objects** (passive entities: files, devices, memory segments, and usually the subjects too), a set $\mathcal R$ of **rights** (read, write, execute, own, …), and an **access-control matrix** $A$ with a row for each subject and a column for each object, where the entry $A[s, o] \subseteq \mathcal R$ is the set of rights $s$ has over $o$. A request by $s$ to perform an operation needing right $r$ on $o$ is permitted if and only if $r \in A[s, o]$.
:::

The matrix (Lampson, 1971) is a model, not a data structure: with thousands of users and millions of files it is enormous and almost entirely empty. Real systems store it sparsely, in one of two ways.

- By **columns**: each object carries an **access-control list** (ACL) of (subject, rights) pairs. To check a request, look up the subject in the object's list. Revoking everyone's access to an object is easy; finding everything one subject can access means scanning every object.
- By **rows**: each subject holds a list of **capabilities**, unforgeable tokens each naming an object and a set of rights. To check a request, the subject presents a capability. Finding a subject's rights is easy and so is delegating one (hand over the capability); revoking access to an object is hard, because copies of its capabilities may be anywhere.

A Unix file descriptor is a capability: once `open` has succeeded, the descriptor grants reading or writing without a further check, can be inherited by a child process or passed to another process over a Unix-domain socket, and keeps working even if the file's permissions are later changed. The permission bits on the file, consulted only at `open`, are the ACL.

::: example One matrix, two representations {#ex-acm}
Subjects `alice` (a lecturer), `bob` (a student) and the process `backup`; objects `marks.db`, `exam.pdf` and `notes.txt`. Alice owns and may read and write `marks.db` and `exam.pdf`; Bob may read `notes.txt`; Alice may read and write `notes.txt`; `backup` may read all three. Write the matrix, its ACLs and its capability lists, and say which representation answers "what can `backup` read?" and "who can read `exam.pdf`?" quickly.
::: solution
| | `marks.db` | `exam.pdf` | `notes.txt` |
|---|---|---|---|
| `alice` | own, r, w | own, r, w | r, w |
| `bob` | | | r |
| `backup` | r | r | r |

ACLs (columns): `marks.db`: alice {own, r, w}, backup {r}; `exam.pdf`: alice {own, r, w}, backup {r}; `notes.txt`: alice {r, w}, bob {r}, backup {r}. Capability lists (rows): alice: (marks.db, {own, r, w}), (exam.pdf, {own, r, w}), (notes.txt, {r, w}); bob: (notes.txt, {r}); backup: (marks.db, r), (exam.pdf, r), (notes.txt, r). "What can `backup` read?" is one row — a capability list answers it directly, while ACLs require scanning every object. "Who can read `exam.pdf`?" is one column — the ACL. Auditors usually ask the second kind of question about sensitive objects, and the first kind when a subject is compromised ("what could the attacker reach?"); that is why systems that use ACLs often need separate tooling for the first.
:::
:::

### Unix permissions

Unix compresses each file's ACL into nine bits plus an owner and a group: read, write and execute for the **owner** (user), the **group**, and **others**. (Full POSIX ACLs extend this with named users and groups, but the nine bits remain the common case.) The check is not a union of the three classes but a selection.

::: algorithm Unix permission check {#alg-unix-perm}
Given a process with effective user ID $u$ and group IDs $G$, a file with owner $o$, group $g$ and mode bits, and a requested access $a \in \{r, w, x\}$:

1. If $u = 0$ (root), allow read and write; allow execute if any execute bit is set (or the file is a directory).
2. Else if $u = o$, decide using the **owner** bits only.
3. Else if $g \in G$, decide using the **group** bits only.
4. Else decide using the **other** bits.

The first applicable class decides; later classes are never consulted.
:::

Because the first matching class decides, the owner can have *fewer* rights than everyone else:

```console
$ id
uid=1000(c2h2) gid=1000(c2h2) groups=1000(c2h2),27(sudo),997(ollama)
$ echo "marks" > notes.txt; chmod 077 notes.txt; ls -l notes.txt
----rwxrwx 1 c2h2 c2h2 6 Oct 27 17:28 notes.txt
$ cat notes.txt
cat: notes.txt: Permission denied
$ chmod 640 notes.txt; ls -l notes.txt; cat notes.txt
-rw-r----- 1 c2h2 c2h2 6 Oct 27 17:28 notes.txt
marks
```

The owner was refused although "others" could read — and yet the owner could run `chmod` to fix it, because the right to change a file's mode belongs to its owner regardless of the mode bits. Ownership is a meta-right: control over the ACL itself. This is the essence of **discretionary access control** (DAC): owners decide who may access their objects.

Two further features matter for security. A program file with the **setuid** bit runs with the *file owner's* effective user ID rather than the caller's: `passwd` is setuid root so that an ordinary user can update the password database, which only root may write. This is how Unix grants controlled privilege, and why every setuid-root program is part of the trusted computing base: a bug in one, given input by an unprivileged user, may give that user root. Least privilege therefore asks setuid programs to be few and small, to drop privileges as early as possible, and to treat everything about their caller — arguments, environment variables, open file descriptors, current directory — as hostile. Second, **root** bypasses the checks entirely. Linux splits root's power into about forty **capabilities** (a different use of the word: privileges such as `CAP_NET_BIND_SERVICE` to bind ports below 1024, or `CAP_SYS_ADMIN`), so that a service can be given only the one it needs.

## The reference monitor

Lampson's matrix says *what* the policy is. James Anderson's 1972 report for the US Air Force said what an enforcement mechanism must be.

::: definition Reference monitor {#def-refmon}
A **reference monitor** is the component that decides every access by a subject to an object. A **reference validation mechanism** implementing it must be

1. **always invoked** (complete mediation): every access goes through it, with no way around;
2. **tamperproof**: subjects cannot modify it or the data it relies on;
3. **verifiable**: small and simple enough to be analysed and tested to a high degree of assurance.

The **trusted computing base** (TCB) is the set of all hardware, firmware and software on which the enforcement of the policy depends; the reference validation mechanism is its core.
:::

In an operating system the kernel is the reference monitor for files, processes and devices: user programs reach objects only through system calls, the processor's privilege levels and page tables make the kernel tamperproof, and the system-call boundary is where mediation happens ([[operating-systems/os-structure]]). A database server is the reference monitor for tables, and a web application for its own business objects — which is precisely why so many web vulnerabilities are access-control failures: the application *is* the monitor, written afresh for each application, and it must check, on every request, that the authenticated user may touch the specific record named in the request. Checking that a user is logged in is not the same as checking that this user may see invoice 1043.

### Time of check to time of use

Complete mediation fails subtly when the check and the use are separate operations on a name that can change in between.

::: definition TOCTOU race {#def-toctou}
A **time-of-check-to-time-of-use** (TOCTOU) race occurs when a program checks a property of an object identified by a name (a path, an address, a user-supplied pointer), and later uses the object identified by the same name, while another party can change what the name refers to between the two steps. The check then validates one object and the use acts on another.
:::

The classic case is a setuid program that wants to write a file on behalf of its caller, but only if the caller could write it. It calls `access(path, W_OK)` — which checks using the *real* user ID — and then `open(path, O_WRONLY)` with its root privileges. Between the two calls, the caller replaces `path` by a symbolic link to a file only root may write. The check passed for the caller's file; the write lands on the protected one. The kernel's double-fetch problem ([[operating-systems/os-structure]]) is the same bug with a memory address for a name.

The cure follows from the definition: make the check and the use refer to the *same object*, not the same name.

- **Use, then check the handle.** Open the file first (with `O_NOFOLLOW` to refuse symbolic links in the last component, or `openat2` with `RESOLVE_NO_SYMLINKS` on Linux), then call `fstat` on the descriptor and check its owner and type. The descriptor names one object for good.
- **Let the kernel check at use time.** A program that needs to act as its caller should temporarily *become* the caller (switch its effective user ID with `seteuid`) and let `open` do the permission check atomically.
- **Copy once.** For data supplied by an untrusted party, copy it into private memory, then validate and use the copy.
- **Use atomic operations.** Create files with `O_CREAT | O_EXCL` (fail if the name exists), and create temporary files with `mkstemp`, never by checking that a name is free and then creating it.

::: warning "The check passed, so the access is safe"
A permission check is a statement about the world at the moment it was made. If the decision is cached, or the object is named again later, the check says nothing about the later state: the file may have been replaced, the user's role revoked, the session logged out, the account balance spent. Complete mediation means checking the access *that actually happens*, on the object it actually happens to, and re-checking (or invalidating cached decisions) when authority can change. When you see "check, then act" on the same name in code, ask what can change the name's meaning in between.
:::

## Can a right leak? The safety problem

A discretionary system lets subjects change the matrix — create files, grant rights to others. A natural question for an administrator is: starting from this state, can subject $s$ *ever* obtain right $r$ over object $o$? Harrison, Ruzzo and Ullman formalised this in 1976.

::: definition HRU protection system {#def-hru}
A **protection system** has a finite set of rights and a finite set of **commands**, each of the form
"if $r_1 \in A[s_1, o_1]$ and … and $r_k \in A[s_k, o_k]$ then $op_1; \dots; op_n$",
where the parameters $s_i, o_i$ are bound to subjects and objects when the command is invoked, and each $op_j$ is a **primitive operation**: enter or delete a right in a cell, create or destroy a subject or object. A state **leaks** right $r$ if some command enters $r$ into a cell that did not contain it. A state is **safe** for $r$ if no sequence of commands from it leaks $r$.
:::

::: theorem Safety is undecidable {#thm-hru}
There is no algorithm that decides, given a protection system, an initial state and a right $r$, whether the state is safe for $r$.
:::

::: proof {collapsed}
We reduce the halting problem for Turing machines, which is undecidable ([[theory-of-computation/decidability]]), to the complement of safety. Given a Turing machine $M$ with states $Q$, tape alphabet $\Gamma$ and halting state $q_f$, build a protection system whose rights are $Q \cup \Gamma \cup \{\mathit{own}, \mathit{end}\}$. Represent a tape of $k$ cells by $k$ subjects $s_1, \dots, s_k$ in a chain: $\mathit{own} \in A[s_i, s_{i+1}]$ links each cell to the next, $A[s_i, s_i]$ contains the symbol in cell $i$, the current state $q$ is placed in $A[s_h, s_h]$ for the head position $h$, and $\mathit{end} \in A[s_k, s_k]$ marks the last cell.

For each transition $\delta(q, X) = (p, Y, R)$ add a command "if $q \in A[s, s]$ and $X \in A[s, s]$ and $\mathit{own} \in A[s, s']$ and $Z \in A[s', s']$ then delete $q, X$ from $A[s, s]$; enter $Y$ into $A[s, s]$; enter $p$ into $A[s', s']$", one for each symbol $Z$, and similarly for left moves (using the $\mathit{own}$ link in the other direction). For a right move from the last cell add a command that creates a new subject, links it with $\mathit{own}$, moves $\mathit{end}$ to it and writes the blank symbol there. Each command's conditions match only the cell under the head, and exactly one command applies in each configuration, so the command sequences correspond exactly to runs of $M$ on its input, encoded in the initial state. The right $q_f$ is entered into some cell if and only if $M$ halts. A decision procedure for safety with respect to $q_f$ would therefore decide the halting problem, which is impossible.
:::

The theorem does not say that access control is hopeless. It says that a *sufficiently general* discretionary model cannot be analysed automatically, so the answer must come from restricting the model. HRU themselves showed that safety is decidable for **mono-operational** systems (each command has one primitive operation), and later models (take–grant, typed access matrices) identify further decidable classes. The more robust response is to take the most important decisions out of the hands of users altogether.

## Mandatory access control

In a discretionary system, any program a user runs can give away that user's data: a Trojan horse in a spreadsheet macro can copy a secret file into a file the attacker can read, and the system has no grounds to object, because the user (or rather the user's process) owns both. **Mandatory access control** (MAC) attaches labels to subjects and objects that ordinary subjects cannot change, and a system-wide rule decides on the labels.

### Bell–LaPadula: confidentiality

Military classification has **levels** — Unclassified < Confidential < Secret < Top Secret — and **categories** (or compartments) naming subject areas, such as `NUC` or `CRYPTO`. A person cleared for Secret in category `NUC` should not see Secret `CRYPTO` documents.

::: definition Security labels and dominance {#def-labels}
A **security label** is a pair $(\ell, C)$ of a level $\ell$ from a totally ordered set and a set $C$ of categories. Label $(\ell_1, C_1)$ **dominates** $(\ell_2, C_2)$, written $(\ell_1, C_1) \succeq (\ell_2, C_2)$, if $\ell_1 \ge \ell_2$ and $C_1 \supseteq C_2$. Dominance is a partial order, and the labels form a **lattice**: any two labels have a least upper bound $(\max(\ell_1, \ell_2), C_1 \cup C_2)$ and a greatest lower bound $(\min(\ell_1, \ell_2), C_1 \cap C_2)$.
:::

::: widget relation
set: L0; LA; LB; LAB; H0; HA; HB; HAB
pairs: L0,L0; L0,LA; L0,LB; L0,LAB; L0,H0; L0,HA; L0,HB; L0,HAB; LA,LA; LA,LAB; LA,HA; LA,HAB; LB,LB; LB,LAB; LB,HB; LB,HAB; LAB,LAB; LAB,HAB; H0,H0; H0,HA; H0,HB; H0,HAB; HA,HA; HA,HAB; HB,HB; HB,HAB; HAB,HAB
view: properties
name: D
editable: false
caption: The dominance relation on the eight labels with two levels L < H and categories from $\{A, B\}$: the label `LA` is (L, $\{A\}$), `H0` is (H, $\emptyset$), and a pair $x, y$ means $y$ dominates $x$. The read-outs confirm that dominance is reflexive, antisymmetric and transitive — a partial order — but not total: neither `LA` nor `HB` dominates the other, so neither may read the other's objects. Count the $27$ pairs: $3$ ordered pairs of levels times $9$ pairs of nested category sets.
:::

::: definition Bell–LaPadula model {#def-blp}
Each subject $s$ has a clearance $\lambda(s)$ and each object $o$ a classification $\lambda(o)$, both security labels, fixed by the system. A state is **secure** if every current access satisfies:

1. **simple security property** ("no read up"): if $s$ has read access to $o$, then $\lambda(s) \succeq \lambda(o)$;
2. **$\star$-property** ("no write down"): if $s$ has write (or append) access to $o$, then $\lambda(o) \succeq \lambda(s)$;
3. **discretionary property**: every current access is also permitted by an access-control matrix.

(The model distinguishes a subject's maximum clearance from its current level; we take them equal for simplicity.)
:::

The $\star$-property is the subtle one. A Secret subject may *write up* to Top Secret objects but not *down* to Unclassified ones, because the subject may have read Secret data and could otherwise copy it downwards. It is what defeats the Trojan horse: a program running at Secret, however malicious, cannot write anything an Unclassified subject can read.

::: theorem Basic security theorem {#thm-bst}
Let a system start in a secure state, and suppose every transition (a rule granting or revoking access) satisfies: an access added by the transition satisfies the simple security, $\star$- and discretionary properties in the new state, and any access in the old state that would violate them in the new state (for example after a label change) is removed. Then every reachable state is secure.
:::

::: proof
By induction on the number of transitions. The initial state is secure by assumption. Suppose state $v$ is secure and a transition leads to $v'$. Each access in $v'$ is either new — then it satisfies the three properties by the first condition — or was present in $v$ and kept; by the second condition, kept accesses satisfy the properties in $v'$ (any that would not were removed). Hence every access in $v'$ satisfies the properties, so $v'$ is secure.
:::

The theorem is almost trivial, and John McLean pointed out in 1987 that it is satisfied by a system that, on any request, downgrades every subject and object to the lowest label and then grants it — perfectly "secure" in the sense of the definition, and useless. The lesson is that a security model's guarantees are only as meaningful as its definition of a secure state, and that **tranquillity** — labels do not change during operation, or change only under strict rules — is an essential part of Bell–LaPadula. With tranquillity, the theorem shows that information cannot flow downwards *through the accesses the model sees*. It says nothing about **covert channels**: a Secret process that modulates its CPU usage or disk activity can signal to an Unclassified process observing response times. Covert and side channels are the reason least common mechanism matters ([[security/security-principles#def-saltzer-schroeder]]).

::: example Applying Bell–LaPadula {#ex-blp}
Levels are U < C < S < TS and categories are drawn from $\{\mathit{NUC}, \mathit{EUR}\}$. Major Smith has clearance (S, {NUC, EUR}); a process she runs has the same label. Decide each request: read a document labelled (C, {EUR}); read (TS, {NUC}); write to (S, {NUC}); write to (TS, {NUC, EUR}); append to (C, {}); read (S, {NUC, EUR, US}) where `US` is a third category.
::: solution
Read (C, {EUR}): S $\ge$ C and {NUC, EUR} $\supseteq$ {EUR}, so her label dominates — allowed. Read (TS, {NUC}): TS > S — no read up, refused. Write to (S, {NUC}): the object must dominate her label; {NUC} $\not\supseteq$ {NUC, EUR}, so writing would leak EUR information into a NUC-only document — refused. Write to (TS, {NUC, EUR}): TS $\ge$ S and the categories are equal — allowed (writing up). Append to (C, {}): writing down — refused. Read (S, {NUC, EUR, US}): her categories do not include US — refused. Notice that she cannot write to *any* object below her full label, not even one of her own earlier documents at (S, {NUC}); in practice she must run a process at a lower current level, which then cannot read her higher-level material.
:::
:::

### Biba: integrity

Ken Biba (1977) observed that integrity is the dual of confidentiality. Give subjects and objects **integrity labels** — say, *system*, *user*, *untrusted* — and consider the risk that low-integrity data corrupts high-integrity objects. The **strict integrity** policy reverses the Bell–LaPadula rules: "no read down" (a subject may read only objects whose integrity label dominates its own, so it is never influenced by less trustworthy data) and "no write up" (a subject may write only objects its own label dominates).

::: proposition Confidentiality and integrity together {#prop-blp-biba}
Suppose a system enforces both Bell–LaPadula and strict Biba, using the *same* label for each subject and object as both its security label and its integrity label. Then a subject can read and write only objects whose label equals its own.
:::

::: proof
Reading $o$ requires $\lambda(s) \succeq \lambda(o)$ by the simple security property and $\lambda(o) \succeq \lambda(s)$ by "no read down"; by antisymmetry of the partial order, $\lambda(s) = \lambda(o)$. Writing requires $\lambda(o) \succeq \lambda(s)$ by the $\star$-property and $\lambda(s) \succeq \lambda(o)$ by "no write up", so again $\lambda(o) = \lambda(s)$.
:::

The proposition shows why the two goals are enforced with *independent* labels in practice: the confidentiality of a document and its trustworthiness are different things (a public software update is unclassified but must be of high integrity). Modern integrity mechanisms are mostly of Biba's kind, simplified. Windows' **mandatory integrity control** (since Vista, 2007) labels processes and objects Low, Medium, High or System and forbids writing up, so a browser renderer running at Low cannot modify the user's files. Commercial integrity policies are better described by Clark and Wilson's 1987 model, in which data may be changed only by certified **transformation procedures** (a double-entry posting, never a direct edit of a balance), with separation of duty between those who certify, execute and audit them. For commercial confidentiality, Brewer and Nash's **Chinese Wall** model (1989) lets a consultant read any one company's data, after which the data of that company's competitors becomes inaccessible — a policy whose rules depend on the history of accesses.

Labels-based MAC is deployed in Linux as **SELinux** (from the US National Security Agency, merged in 2003) and AppArmor, which confine system services: a compromised web server confined by an SELinux policy can read its document root and write its logs, but not read users' home directories, whatever its Unix user ID would allow. Mobile operating systems are mandatory systems too: apps cannot grant each other access to their private storage.

::: quiz
Under Bell–LaPadula, which flow does the $\star$-property prevent?

- [ ] A Secret subject reading a Top Secret file.
- [x] A Secret subject copying text it has read into an Unclassified file.
- [ ] An Unclassified subject writing a note into a Secret file.
- [ ] A Top Secret subject reading a Secret file.
::: solution
The $\star$-property forbids writing to objects whose label does not dominate the subject's — writing down — which is how a Secret subject (or a Trojan horse running as one) would leak Secret information to Unclassified readers. Reading up (the first option) is prevented by the simple security property; writing up (the third) and reading down (the fourth) are allowed.
:::
:::

## Role-based access control

Organisations do not think about individual permissions: they think about jobs. A nurse on a ward may read the records of that ward's patients; a pharmacist may dispense; an auditor may read the logs. **Role-based access control** (RBAC; Ferraiolo and Kuhn, 1992; Sandhu and colleagues, 1996; a NIST model standardised in 2004 as ANSI INCITS 359) puts roles between users and permissions.

::: definition Role-based access control {#def-rbac}
An RBAC system has sets of users $U$, roles $R$ and permissions $P$ (operations on objects), a **user assignment** $UA \subseteq U \times R$ and a **permission assignment** $PA \subseteq P \times R$. Optionally, a **role hierarchy** $\succeq$ on $R$ lets a senior role inherit the permissions of its juniors. User $u$ may exercise permission $p$ if there are roles $r, r'$ with $(u, r) \in UA$, $r \succeq r'$ and $(p, r') \in PA$. **Constraints** restrict the assignments: **static separation of duty** forbids any user from being assigned (directly or by inheritance) to both of two conflicting roles; **dynamic separation of duty** forbids activating both in the same session.
:::

Roles change slowly while people change jobs often, so administration becomes a matter of assigning people to roles — the change that makes RBAC worthwhile in large organisations. Least privilege enters through **sessions**: a user activates only the roles needed for the current task.

::: example Roles for the marks system {#ex-rbac}
Roles Student, TA, Lecturer and Registrar have the permissions "read own marks", "read course marks", "edit course marks" and "publish marks" respectively; Lecturer is senior to TA, which is senior to Student. Lecturer and Registrar are in static separation of duty (whoever enters marks must not also publish them). Users: alice is a Lecturer, bob a TA, carol a Registrar, and dave has been assigned both Lecturer and Registrar. Compute each user's permissions and check the constraint.
::: solution
```python
PA = {"Student": {"read own marks"},                 # permission assignment
      "TA": {"read course marks"},
      "Lecturer": {"edit course marks"},
      "Registrar": {"publish marks"}}
SENIOR = {"Lecturer": {"TA"}, "TA": {"Student"}}       # role hierarchy: senior -> juniors
UA = {"alice": {"Lecturer"}, "bob": {"TA"},            # user assignment
      "carol": {"Registrar"}, "dave": {"Lecturer", "Registrar"}}
EXCLUSIVE = [{"Lecturer", "Registrar"}]                # static separation of duty

def junior_closure(roles):
    seen, todo = set(), list(roles)
    while todo:
        r = todo.pop()
        if r not in seen:
            seen.add(r); todo.extend(SENIOR.get(r, ()))
    return seen

def permissions(user):
    return set().union(*(PA[r] for r in junior_closure(UA[user])))

for u in UA:
    bad = [sorted(e) for e in EXCLUSIVE if e <= junior_closure(UA[u])]
    print(f"{u:6s} {sorted(permissions(u))}" + (f"  VIOLATES {bad}" if bad else ""))
```

```console
alice  ['edit course marks', 'read course marks', 'read own marks']
bob    ['read course marks', 'read own marks']
carol  ['publish marks']
dave   ['edit course marks', 'publish marks', 'read course marks', 'read own marks']  VIOLATES [['Lecturer', 'Registrar']]
```

Alice inherits the TA and Student permissions through the hierarchy. Dave's assignment violates separation of duty — he could alter and publish marks with nobody else involved — and an RBAC administration tool should reject it when it is made, not report it afterwards. Note also an artefact of the hierarchy: inheriting Student gives Lecturers "read own marks", harmless here but a reminder that inheritance grants more than one may intend, and should be reviewed like any other grant.
:::
:::

**Attribute-based access control** (ABAC) generalises roles to rules over attributes of the user, the object and the environment ("a nurse may read the record of a patient on her ward during her shift"), at the cost of policies that are harder to analyse.

## Capabilities and the confused deputy

Norm Hardy described in 1988 a problem that ACLs cannot solve. A compiler on a time-sharing system was given the right to write to a billing file, so that it could record usage. A user ran the compiler and named the billing file as the *output* file. The compiler, writing with its own authority, overwrote the billing records. Each access was permitted; the compiler was a **confused deputy**, exercising authority it held for one purpose on behalf of a client who did not hold it.

The root cause is **ambient authority**: the compiler's rights were attached to *who it was*, so any name it was handed was checked against all of them. With capabilities, the user would pass the compiler a capability for the output file — which the user could only obtain for files the user may write — and the compiler would use *that* capability for output and its own capability only for billing. Designation and authority travel together, so a client cannot make a deputy use authority the client does not have. Web servers that fetch a URL supplied by a user (server-side request forgery, [[security/web-security]]) and cross-site request forgery are confused deputies in modern dress.

Capability-based systems have a long history — Hydra and the CAP computer in the 1970s, KeyKOS in the 1980s, the formally verified seL4 microkernel (2009) — and the ideas are increasingly deployed in mainstream systems: FreeBSD's **Capsicum** (Watson and colleagues, 2010) lets a process enter a capability mode in which it can use only the file descriptors it already holds; WebAssembly's system interface grants modules pre-opened directories instead of the whole file system; and the CHERI processor architecture makes every pointer a hardware capability with bounds ([[security/memory-safety]]).

## Isolation and sandboxing

The access-control mechanisms above decide individual requests. **Isolation** reduces the set of requests a component can make at all, so that its compromise does limited damage. The operating system's process boundary is the basic tool, and modern software is split into processes along trust boundaries: a web browser renders each site in a separate low-privilege process, so that a bug in the renderer gives an attacker only that sandbox (Chrome's **site isolation**, enabled by default in 2018 after Spectre showed that a process cannot protect its secrets from code running inside it). OpenSSH separates a small privileged monitor from an unprivileged process that parses network input. Containers and virtual machines extend the boundary to whole applications and operating systems, with the trade-offs discussed in [[operating-systems/virtualisation]].

A **sandbox** narrows a process's interface to the kernel itself. On Linux, **seccomp** filters (since 2012) let a process install a small program, in the classic BPF instruction set, that the kernel runs on every system call to allow it, fail it with an error, or kill the process. A filter can only ever *remove* permissions, and once installed it cannot be removed, even by the process itself; child processes inherit it.

::: example A system-call filter {#ex-seccomp}
Install a seccomp filter that makes every attempt to open a file fail with "permission denied", and show that an `open` that succeeded before the filter fails after it.
::: solution
```c
#include <errno.h>
#include <fcntl.h>
#include <linux/audit.h>
#include <linux/filter.h>
#include <linux/seccomp.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>
#include <sys/prctl.h>
#include <sys/syscall.h>

#define DENY(nr) BPF_JUMP(BPF_JMP | BPF_JEQ | BPF_K, (nr), 0, 1), \
                 BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_ERRNO | EACCES)

int main(void) {
    struct sock_filter prog[] = {
        /* load the architecture; kill the process if it is not x86-64 */
        BPF_STMT(BPF_LD | BPF_W | BPF_ABS, offsetof(struct seccomp_data, arch)),
        BPF_JUMP(BPF_JMP | BPF_JEQ | BPF_K, AUDIT_ARCH_X86_64, 1, 0),
        BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_KILL_PROCESS),
        /* load the system-call number and refuse the ones that open files */
        BPF_STMT(BPF_LD | BPF_W | BPF_ABS, offsetof(struct seccomp_data, nr)),
        DENY(__NR_open), DENY(__NR_openat), DENY(__NR_openat2),
        BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_ALLOW),      /* everything else */
    };
    struct sock_fprog fprog = { sizeof prog / sizeof prog[0], prog };

    printf("before: open returns %d\n", open("/etc/hostname", O_RDONLY));
    prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0);      /* required to filter without root */
    if (prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER, &fprog) != 0) { perror("prctl"); return 1; }
    int fd = open("/etc/hostname", O_RDONLY);
    printf("after:  open returns %d (%s)\n", fd, fd < 0 ? strerror(errno) : "allowed");
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -o filter filter.c && ./filter
before: open returns 3
after:  open returns -1 (Permission denied)
```

The filter checks the architecture first, because system-call numbers differ between architectures and a process could otherwise switch to another calling convention to evade a check written for one. `PR_SET_NO_NEW_PRIVS` promises that this process and its children will never gain privileges through setuid programs; without it, an unprivileged process could install a filter and then run a setuid program under conditions its authors never expected, so the kernel insists. This toy filter is a **deny list**, the wrong design for real use: it misses any way of reaching files it did not name (a descriptor inherited from the parent, for example). Production sandboxes, such as those of browsers and of systemd services, are **allow lists** — fail-safe defaults — that permit only the few dozen calls a component needs, usually after it has opened everything it will ever use.
:::
:::

The same pattern — acquire resources, then irrevocably give up the right to acquire more — appears in OpenBSD's `pledge` and `unveil`, Capsicum's capability mode, and the permission models of mobile operating systems. It is least privilege made operational: the component that parses untrusted input should be the one with the least authority.

::: history
Butler Lampson's "Protection" (1971; reprinted in *Operating Systems Review*, 1974) introduced the access-control matrix, and his "A note on the confinement problem" (1973) identified covert channels. James Anderson's 1972 report defined the reference monitor. David Bell and Leonard LaPadula developed their model at MITRE between 1973 and 1976, and Ken Biba his integrity model in 1977. Michael Harrison, Walter Ruzzo and Jeffrey Ullman proved the undecidability of safety in "Protection in operating systems" (*Communications of the ACM*, 1976). Multics (from 1965) was the first major system designed around protection rings, ACLs and mandatory labels. David Clark and David Wilson's commercial integrity model appeared in 1987, the Chinese Wall model of David Brewer and Michael Nash in 1989, Norm Hardy's confused deputy in 1988, and role-based access control from David Ferraiolo and Richard Kuhn (1992) and Ravi Sandhu and colleagues (1996). The NSA's SELinux was released in 2000 and merged into Linux 2.6 in 2003; seccomp filters arrived in Linux 3.5 in 2012 and Capsicum in FreeBSD 9 in 2012.
:::

## Where this leads

Access control assumes that the reference monitor is correct and cannot be bypassed. [[security/memory-safety]] studies how memory-corruption bugs let attackers take over the very code that is supposed to enforce it, and the defences that keep a bug from becoming a privilege escalation. [[security/web-security]] treats the browser as a reference monitor with its own policy (the same-origin policy) and the confused deputies that undermine it. [[security/malware]] shows how attackers escalate privileges after an initial foothold and how isolation contains them. Information flow — the idea behind Bell–LaPadula, taken to the level of program variables — reappears in the taint analysis of [[security/secure-development]], and the type systems that can enforce it in [[programming-languages/type-systems]].

::: summary
- The **access-control matrix** ([[#def-acm]]) records each subject's rights over each object; **ACLs** store its columns and **capabilities** its rows. Unix stores a compressed ACL and checks only the first matching class ([[#alg-unix-perm]]); file descriptors are capabilities.
- A **reference monitor** must be always invoked, tamperproof and verifiable ([[#def-refmon]]). In a web application, the application itself is the monitor and must check every object in every request.
- **TOCTOU** races ([[#def-toctou]]) arise when a check and a use name an object separately; make them refer to the same object (descriptors, atomic operations, copy once).
- For general discretionary systems, whether a right can ever leak is **undecidable** ([[#thm-hru]]), by a reduction from the halting problem.
- **Mandatory** policies fix labels centrally: **Bell–LaPadula** ([[#def-blp]]) forbids reading up and writing down, **Biba** the opposite for integrity; both are only as good as their notion of a secure state and say nothing about covert channels.
- **RBAC** ([[#def-rbac]]) assigns permissions to roles and roles to users, with hierarchies and separation-of-duty constraints.
- Ambient authority creates **confused deputies**; capabilities tie designation to authority. **Sandboxes** such as seccomp ([[#ex-seccomp]]) shrink a process's kernel interface and should be allow lists.
:::

## Exercises

::: exercise Reading permission bits {level=1}
A file has mode `-rw-r-----`, owner `alice`, group `staff`. For each process, say whether it may read and whether it may write the file: (a) effective user `alice`; (b) user `bob`, member of `staff`; (c) user `carol`, not in `staff`; (d) user `alice` if the mode were `----rw-rw-`.
::: solution
(a) Owner bits `rw-`: read and write. (b) Group bits `r--`: read only. (c) Other bits `---`: neither. (d) Alice is the owner, so only the owner bits `---` apply: neither — even though group and others may read and write. She can, however, `chmod` the file back, since owners may always change the mode ([[#alg-unix-perm]]).
:::
:::

::: exercise Octal modes {level=1 check="750"}
Write in octal the mode giving the owner read, write and execute, the group read and execute, and others nothing. (Enter the three octal digits as a number.)
::: solution
Each class is a 3-bit number with $r = 4$, $w = 2$, $x = 1$: owner $4 + 2 + 1 = 7$, group $4 + 1 = 5$, others $0$, so `750` (`rwxr-x---`).
:::
:::

::: exercise Counting labels {level=1 check="64"}
A system has $4$ levels and $4$ categories. How many security labels are there? (Enter the number.)
::: solution
A label is a level together with a subset of the categories: $4 \times 2^4 = 64$.
:::
:::

::: exercise Bell–LaPadula decisions {level=2}
With levels U < C < S < TS and categories $\{A, B, C\}$, a subject has label (S, {A, B}). For each object say whether the subject may read it, write it, both or neither: (a) (C, {A}); (b) (S, {A, B}); (c) (TS, {A, B, C}); (d) (S, {C}); (e) (U, {}).
::: solution
Read needs subject $\succeq$ object; write needs object $\succeq$ subject. (a) S $\ge$ C and {A, B} $\supseteq$ {A}: read only. (b) Equal labels: both. (c) TS $\ge$ S and {A, B, C} $\supseteq$ {A, B}: write only. (d) Neither dominates the other ({A, B} and {C} are incomparable): neither. (e) The subject dominates: read only.
:::
:::

::: exercise Separation of duty by counting {level=2 check="3"}
An organisation has roles $r_1, \dots, r_6$ and the static separation-of-duty constraints $\{r_1, r_2\}$, $\{r_3, r_4\}$, $\{r_5, r_6\}$ (no user may hold both roles of a pair). With no hierarchy, what is the largest number of roles a single user may hold? (Enter the number.)
::: solution
The constraints partition the roles into three pairs, and a user may take at most one role from each pair, so at most $3$ roles — for example $\{r_1, r_3, r_5\}$ — and every choice of one per pair is allowed, giving $2^3 = 8$ maximal combinations.
:::
:::

::: exercise Find the TOCTOU bug {level=2}
A setuid-root program receives a file name from its caller and does: `stat(name)`; if the file is owned by the caller, `open(name, O_WRONLY)` and write the caller's data into it. Explain the race and give a corrected design.
::: solution
Between `stat` and `open`, the caller can replace `name` with a symbolic link (or rename another file into place) pointing to a file owned by root; the check examined the caller's file and the root-privileged open acts on the other. Fixes: (1) temporarily switch the effective user ID to the caller's (`seteuid`) before opening, so the kernel's own check at `open` time is the check, then switch back; or (2) open first with `O_NOFOLLOW` (and, on Linux, `openat2` with `RESOLVE_NO_SYMLINKS` to cover every path component), then `fstat` the descriptor and verify its owner and that it is a regular file before writing. Better still, redesign so that no setuid program is needed — for example a service that accepts a descriptor the caller has opened itself, which is a capability for exactly the file the caller may write.
:::
:::

::: exercise The confused deputy and capabilities {level=3}
A print service runs with permission to read every user's files, so that it can print them. Users submit jobs by file name. (a) Show how a user can print another user's private file, and relate the attack to [[#def-refmon]]. (b) Redesign the service with capabilities. (c) Explain why simply making the service check "may the requesting user read this file?" before printing is weaker than (b).
::: solution
(a) The user submits the name of a file she may not read; the service opens it with its own authority and prints it. The reference monitor (the kernel) checked the *service's* rights, which is all it can see; the policy "a user may print only files she may read" was never mediated, because the authority used was ambient to the service. (b) The client opens the file itself — the kernel checks the client's rights — and passes the open descriptor to the service over a Unix-domain socket. The service has no ambient read permission at all; it can read only what clients hand it, so it cannot be confused. (c) A check by name is a TOCTOU race: between the service's check (using, say, `access()` or its own reading of the permission bits on the caller's behalf) and its `open`, the user can swap the name for a symbolic link to a protected file. The service also has to re-implement the kernel's access-control logic (ACLs, group membership, mandatory labels) exactly, and any discrepancy is a hole. Passing a capability makes the check and the use the same act, performed by the real reference monitor.
:::
:::

::: exercise Safety for a restricted system {level=3}
Consider a protection system whose commands never create subjects or objects (only enter and delete rights), with $n$ subjects, $m$ objects and a set $\mathcal R$ of $k$ rights. Prove that safety is decidable for such systems, and bound the number of protection states that a decision procedure must explore. Why does this not contradict [[#thm-hru]]?
::: solution
Without creation, the sets $S$ and $O$ are fixed, so a protection state is determined by the matrix: each of the $nm$ cells holds a subset of $\mathcal R$, giving at most $2^{knm}$ states. Commands map states to states, so the set of states reachable from the initial one can be found by breadth-first search over this finite graph; the state is unsafe for $r$ exactly when the search reaches a transition that enters $r$ into a cell lacking it. The search terminates because it visits each of the finitely many states at most once, so safety is decidable, in time $O(2^{knm})$ times the cost of trying each command with each binding of its parameters (finitely many, since the parameters range over fixed finite sets). This does not contradict [[#thm-hru]] because the reduction there needs subject creation to model an unbounded tape; without creation the "tape" is bounded and the system is like a linear-bounded automaton, whose halting is decidable. The bound is exponential, and HRU showed that safety for systems without creation is $\mathsf{PSPACE}$-complete, so it is decidable but not efficiently in general.
:::
:::
