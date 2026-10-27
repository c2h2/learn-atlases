Suppose that, instead of the three tables of the running example, the registrar had kept one big table with a row per enrolment:

| sid | name | code | title | dept | building | grade |
|---|---|---|---|---|---|---|
| 1 | Ada | CS101 | Programming | CS | Turing | A |
| 1 | Ada | CS202 | Databases | CS | Turing | B |
| 1 | Ada | MA101 | Calculus | MA | Noether | A |
| 2 | Bao | CS101 | Programming | CS | Turing | C |
| 2 | Bao | MA210 | Statistics | MA | Noether | B |
| 3 | Chen | CS202 | Databases | CS | Turing | A |
| … | … | … | … | … | … | … |

It answers every question with no joins, yet it is a poor design. Ada's name is stored three times, and the CS department's building once per CS enrolment. These repetitions cause **anomalies**:

- an **update anomaly**: if the CS department moves to a new building, every CS row must change, and a program that misses one leaves the database contradicting itself;
- an **insertion anomaly**: a new course with no students yet cannot be recorded at all, since every row needs a sid (part of the key);
- a **deletion anomaly**: if Bao withdraws from MA210 — the only Statistics enrolment in a smaller example — the fact that MA210 is called Statistics disappears with it.

The cause is that the table mixes several independent facts — about students, about courses, about departments, about enrolments — whose keys differ. This chapter makes that diagnosis precise with **functional dependencies**, develops their logic (Armstrong's axioms and the closure algorithm), defines the **normal forms** BCNF and 3NF that rule out such redundancy, and gives algorithms that decompose a bad schema into good ones while guaranteeing that no information is lost and that the constraints can still be checked. We prove each guarantee: this is one of the few places in computing where design rules come with theorems.

## Functional dependencies

::: definition Functional dependency {#def-fd}
Let $X, Y$ be sets of attributes of a relation schema $R$. A relation $r$ over $R$ **satisfies** the **functional dependency** (FD) $X \to Y$ if any two tuples of $r$ that agree on all attributes of $X$ also agree on all attributes of $Y$:

$$
\forall t, u \in r:\quad t[X] = u[X] \;\Rightarrow\; t[Y] = u[Y].
$$

An FD **holds** on the schema if every legal instance satisfies it. It is **trivial** if $Y \subseteq X$ (then every relation satisfies it).
:::

We write attribute sets without braces and commas when no confusion arises: $\text{sid}\,\text{code} \to \text{grade}$, or $AB \to C$ for single-letter attributes. The big table above satisfies, and the university's rules guarantee,

$$
F = \set{\text{sid} \to \text{name},\ \ \text{code} \to \text{title}\,\text{dept},\ \ \text{dept} \to \text{building},\ \ \text{sid}\,\text{code} \to \text{grade}}.
$$ {#eq-uni-fds}

FDs generalise keys: $K$ is a superkey of $R$ exactly when $K \to R$ holds ([[databases/relational-model#def-key]]). Like keys, they are statements about all legal instances, so they come from the application's rules, not from inspecting data. An instance can *refute* an FD (two tuples agreeing on $X$ but not on $Y$) but never prove one.

### Implication and Armstrong's axioms

Given $F$, other FDs follow: from $\text{code} \to \text{dept}$ and $\text{dept} \to \text{building}$, every legal instance also satisfies $\text{code} \to \text{building}$. We say $F$ **implies** $X \to Y$, written $F \models X \to Y$, if every relation satisfying all FDs of $F$ satisfies $X \to Y$. The **closure** $F^+$ is the set of all FDs implied by $F$. Implication is a semantic notion; William Armstrong gave rules that derive exactly the implied FDs.

::: definition Armstrong's axioms {#def-armstrong}
For attribute sets $X, Y, Z$:
1. **Reflexivity**: if $Y \subseteq X$ then $X \to Y$.
2. **Augmentation**: if $X \to Y$ then $XZ \to YZ$.
3. **Transitivity**: if $X \to Y$ and $Y \to Z$ then $X \to Z$.

We write $F \vdash X \to Y$ if $X \to Y$ can be derived from $F$ by finitely many applications of these rules.
:::

Three useful rules follow. **Union**: from $X \to Y$ and $X \to Z$, augmentation gives $X \to XY$ and $XY \to YZ$, and transitivity gives $X \to YZ$. **Decomposition**: from $X \to YZ$ and $YZ \to Y$ (reflexivity), $X \to Y$. **Pseudotransitivity**: from $X \to Y$ and $WY \to Z$, augmentation gives $WX \to WY$, then $WX \to Z$. By union and decomposition, $X \to A_1 \cdots A_k$ is equivalent to the $k$ FDs $X \to A_i$, so we may always assume single attributes on the right.

::: theorem Soundness and completeness of Armstrong's axioms {#thm-armstrong}
For every set $F$ of FDs over $R$ and all $X, Y \subseteq R$: $F \vdash X \to Y$ if and only if $F \models X \to Y$.
:::

The proof of completeness uses the attribute closure, which is also the main practical tool.

::: definition Attribute closure {#def-closure}
The **closure** of $X$ under $F$ is $X^+ = \set{A \in R : F \vdash X \to A}$, the set of attributes that $X$ determines.
:::

By union and decomposition, $F \vdash X \to Y$ if and only if $Y \subseteq X^+$. So to test any FD, and to test whether $X$ is a superkey ($X^+ = R$), it suffices to compute $X^+$.

::: algorithm Attribute closure {#alg-closure}
Input: a set $X$ of attributes and a set $F$ of FDs. Output: $X^+$.
1. $Z \gets X$.
2. Repeat until $Z$ does not change: for each FD $V \to W$ in $F$, if $V \subseteq Z$ then $Z \gets Z \cup W$.
3. Return $Z$.
:::

```python
def closure(X, F):
    """Attribute closure X+ under FDs F, a list of (lhs, rhs) pairs of sets."""
    result = set(X)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in F:
            if lhs <= result and not rhs <= result:
                result |= rhs              # lhs is determined, so rhs is too
                changed = True
    return result
```

Each pass over $F$ either adds an attribute or ends the loop, so there are at most $\lvert R \rvert + 1$ passes, and the running time is $O(\lvert R\rvert \cdot \lVert F\rVert)$, where $\lVert F \rVert$ is the total size of the FDs. (A cleverer version with counters runs in linear time $O(\lVert F\rVert)$, as in unit propagation for Horn clauses.)

::: proof Proof of [[#thm-armstrong]]
*Soundness* ($\vdash$ implies $\models$): we show each rule preserves satisfaction in any relation $r$. Reflexivity: if $t[X] = u[X]$ and $Y \subseteq X$ then $t[Y] = u[Y]$. Augmentation: if $t[XZ] = u[XZ]$ then $t[X] = u[X]$, so $t[Y] = u[Y]$ by $X \to Y$, and with $t[Z] = u[Z]$ we get $t[YZ] = u[YZ]$. Transitivity: $t[X] = u[X]$ gives $t[Y] = u[Y]$, which gives $t[Z] = u[Z]$. By induction on the length of a derivation, every derived FD holds in every $r$ satisfying $F$.

*Closure algorithm correct*: let $Z$ be the output of [[#alg-closure]]. Every attribute added is derivable: initially $F \vdash X \to Z$ by reflexivity, and if $F \vdash X \to Z$ and $V \to W \in F$ with $V \subseteq Z$, then $X \to V$ (decomposition), $X \to W$ (transitivity) and $X \to Z \cup W$ (union). So $Z \subseteq X^+$; the converse inclusion follows from what we prove next.

*Completeness* ($\models$ implies $\vdash$): suppose $F \nvdash X \to Y$; we build a relation satisfying $F$ but not $X \to Y$. Let $Z$ be the output of [[#alg-closure]] for $X$, so $Y \not\subseteq Z$ — otherwise the derivations above would give $F \vdash X \to Y$. Let $r = \set{t, u}$ where $t$ has value $0$ in every attribute and $u$ has value $0$ on $Z$ and $1$ elsewhere. Then $r$ violates $X \to Y$, since $t, u$ agree on $X \subseteq Z$ and differ on an attribute of $Y - Z$. And $r$ satisfies every $V \to W$ in $F$: if $t, u$ agree on $V$ then $V \subseteq Z$; since the algorithm stopped, $W \subseteq Z$, so $t, u$ agree on $W$. Hence $F \not\models X \to Y$. Taking the contrapositive gives completeness, and also shows that the output $Z$ contains every $A$ with $F \models X \to A$, so $Z = X^+$.
:::

::: example Closures and keys of the enrolment table {#ex-closure}
For the big table with FDs [[#eq-uni-fds]], compute $\text{code}^+$, $\text{sid}^+$ and $(\text{sid}\,\text{code})^+$, and find all candidate keys.
::: solution
$\text{code}^+$: start with $\set{\text{code}}$; $\text{code} \to \text{title}\,\text{dept}$ adds title and dept; now $\text{dept} \to \text{building}$ applies and adds building; nothing else applies. So $\text{code}^+ = \set{\text{code}, \text{title}, \text{dept}, \text{building}}$.

$\text{sid}^+ = \set{\text{sid}, \text{name}}$.

$(\text{sid}\,\text{code})^+$: both of the above, and then $\text{sid}\,\text{code} \to \text{grade}$ adds grade: all seven attributes. So $\set{\text{sid}, \text{code}}$ is a superkey.

Candidate keys: neither sid nor code appears on any right-hand side, so every superkey must contain both (nothing else can determine them). Hence $\set{\text{sid}, \text{code}}$ is the only candidate key. The Python function above confirms all three closures. The useful observation — an attribute that is on no right side belongs to every key — makes key-finding by hand quick.
:::
:::

When every FD has a single attribute on the left, the closure is plain graph reachability: draw an arrow $A \to B$ for each FD, and $A^+$ is the set of vertices reachable from $A$.

::: widget graph
nodes: sid@0,1.5; name@1,2; code@0,0.5; title@1,1; dept@1,0; building@2,0; grade@2,1.5
edges: sid>name; code>title; code>dept; dept>building
algorithm: bfs
start: code
caption: The single-attribute FDs of [[#eq-uni-fds]] as a directed graph. Breadth-first search from code reaches title, dept and building — exactly $\text{code}^+$ — and the path code → dept → building is the transitive dependency behind the update anomaly. Start from sid: only name is reached. The FD $\text{sid}\,\text{code} \to \text{grade}$ has two attributes on the left, which a graph cannot show (grade is unreachable from either alone); that is why [[#alg-closure]] works with sets rather than vertices.
:::

The same FDs can be viewed as a relation on the set of attributes. Its transitive closure contains every single-attribute FD that follows by transitivity:

::: widget relation
set: sid; name; code; title; dept; building; grade
pairs: sid,name; code,title; code,dept; dept,building
view: properties
editable: true
caption: The single-attribute FDs of [[#eq-uni-fds]] as a relation "determines" on the attributes. It is not reflexive — although every attribute trivially determines itself, by reflexivity in [[#def-armstrong]] — and not transitive: the closure adds the pair (code, building), the FD $\text{code} \to \text{building}$ derived by transitivity. Click the matrix to add the pair (building, dept) and watch the closure grow; which FDs would that new rule imply?
:::

### Covers

Two sets of FDs $F$ and $G$ are **equivalent** if $F^+ = G^+$; $G$ is then a **cover** of $F$. To check, test every FD of $G$ against $F$ by closure and vice versa. Algorithms work best with a small cover.

::: definition Minimal cover {#def-minimal-cover}
A set $G$ of FDs is **minimal** if (1) every right side is a single attribute; (2) no FD $X \to A$ in $G$ has an **extraneous** attribute on the left, i.e. $G$ is not equivalent to $G$ with $X \to A$ replaced by $(X - \set{B}) \to A$ for some $B \in X$; and (3) no FD is **redundant**, i.e. $G - \set{X \to A}$ is not equivalent to $G$. A **minimal cover** of $F$ is a minimal set equivalent to $F$.
:::

A minimal cover is computed in three steps, in this order: split right sides into single attributes; for each FD $X \to A$ and each $B \in X$, drop $B$ if $A \in (X - \set B)^+$; then drop each FD $X \to A$ for which $A \in X^+$ computed with the *other* FDs. Every set of FDs has a minimal cover, though not necessarily a unique one.

::: example Computing a minimal cover {#ex-cover}
Find a minimal cover of $F = \set{A \to BC,\ B \to C,\ AB \to D,\ A \to D}$.
::: solution
1. Single right sides: $A \to B$, $A \to C$, $B \to C$, $AB \to D$, $A \to D$.
2. Extraneous attributes: only $AB \to D$ has a composite left side. Is $B$ extraneous? $A^+ = \set{A, B, C, D}$ contains $D$, so yes: replace it by $A \to D$, which duplicates an FD already present. Is $A$ extraneous? $B^+ = \set{B, C}$ does not contain $D$, so no — but $B$ is already gone.
3. Redundant FDs: $A \to C$ is redundant, since with $A \to B$ and $B \to C$ we get $A^+ \ni C$; the duplicate $A \to D$ goes too. $A \to B$ is not redundant (without it $A^+ = \set{A, C, D}$), nor is $B \to C$ (without it $B^+ = \set B$), nor $A \to D$ (without it $A^+ = \set{A, B, C}$).

A minimal cover is $\set{A \to B,\ B \to C,\ A \to D}$. Doing step 3 before step 2 can leave redundant FDs, which is why the order matters.
:::
:::

## Normal forms

Redundancy arises when a non-trivial FD $X \to A$ has a left side $X$ that is not a superkey: then many tuples may share the same $X$-value, and each repeats the same $A$-value. The strictest normal form forbids exactly that.

::: definition Boyce–Codd normal form {#def-bcnf}
A relation schema $R$ with FDs $F$ is in **Boyce–Codd normal form** (BCNF) if for every non-trivial FD $X \to Y$ in $F^+$ with $X \cup Y \subseteq R$, $X$ is a superkey of $R$.
:::

For a schema with its own FDs it suffices to check the FDs of $F$ (if all left sides in $F$ are superkeys, every derived FD's left side is a superkey too, [[#ex-bcnf-check]]). The big table is not in BCNF: in $\text{code} \to \text{title}$, the attribute code is not a superkey. Neither is sid for $\text{sid} \to \text{name}$, nor dept for $\text{dept} \to \text{building}$. Every one of these violations corresponds to one of the anomalies.

Sometimes BCNF demands more than is possible without losing the ability to check an FD cheaply, and a slightly weaker form is used.

::: definition Third normal form {#def-3nf}
An attribute is **prime** if it belongs to some candidate key. A schema $R$ with FDs $F$ is in **third normal form** (3NF) if for every non-trivial FD $X \to A$ in $F^+$ with $X \cup \set A \subseteq R$ and $A$ a single attribute, either $X$ is a superkey of $R$ or $A$ is prime.
:::

BCNF implies 3NF, since the first alternative of 3NF is the BCNF condition. The difference lies in FDs whose right side is part of a key. The classic example: a tutoring scheme where each tutor teaches one course, and each student has one tutor per course. With $R = (\text{student}, \text{course}, \text{tutor})$ and

$$
F = \set{\text{tutor} \to \text{course},\quad \text{student}\,\text{course} \to \text{tutor}},
$$ {#eq-tutor}

the candidate keys are $\set{\text{student}, \text{course}}$ and $\set{\text{student}, \text{tutor}}$, so all three attributes are prime and $R$ is in 3NF. It is not in BCNF: tutor is not a superkey, and the table repeats "Rao teaches CS101" for every student Rao tutors.

(First normal form, atomic values, was introduced with the relational model; **second normal form**, which forbids a non-prime attribute from depending on part of a candidate key, is of historical interest only: every 3NF schema is in 2NF.)

::: quiz
$R(A, B, C)$ has FDs $\set{AB \to C,\ C \to A}$. Which normal forms does it satisfy?
- [ ] Neither 3NF nor BCNF.
- [x] 3NF but not BCNF.
- [ ] BCNF but not 3NF.
- [ ] Both 3NF and BCNF.
::: solution
The candidate keys are $AB$ ($AB^+ = ABC$) and $BC$ ($BC^+ = \set{B, C, A}$); $C$ alone gives $\set{A, C}$. So $A$, $B$, $C$ are all prime, and every FD satisfies 3NF. But $C \to A$ has a left side that is not a superkey, so $R$ is not in BCNF. This is the tutor example with $A$ = course, $B$ = student, $C$ = tutor. BCNF but not 3NF is impossible, since BCNF implies 3NF.
:::
:::

## Decompositions

The cure for a bad schema is to **decompose** it: replace $R$ by schemas $R_1, \dots, R_k$ with $R_1 \cup \dots \cup R_k = R$, storing $r_i = \pi_{R_i}(r)$ instead of $r$. Two properties decide whether a decomposition is acceptable.

::: definition Lossless join and dependency preservation {#def-lossless}
A decomposition $\set{R_1, \dots, R_k}$ of $R$ is **lossless** (has a lossless join) with respect to $F$ if every relation $r$ over $R$ satisfying $F$ equals the join of its projections:

$$
r = \pi_{R_1}(r) \bowtie \pi_{R_2}(r) \bowtie \dots \bowtie \pi_{R_k}(r).
$$

It is **dependency-preserving** if the union of the projections $F_i = \set{X \to Y \in F^+ : X \cup Y \subseteq R_i}$ is equivalent to $F$.
:::

The join always *contains* $r$ — every tuple of $r$ is the join of its own projections — so "lossy" means that the join adds **spurious** tuples. Information is lost not because data disappears but because we can no longer tell which combinations were real. Dependency preservation matters for a different reason: if every FD can be checked within one table, an update can be validated by looking at that table alone; otherwise checking an FD needs a join on every update.

::: theorem Lossless binary decomposition {#thm-heath}
A decomposition of $R$ into $R_1$ and $R_2$ is lossless with respect to $F$ if and only if $F \models (R_1 \cap R_2) \to R_1$ or $F \models (R_1 \cap R_2) \to R_2$, that is, if and only if the common attributes form a superkey of $R_1$ or of $R_2$.
:::

::: proof
Let $X = R_1 \cap R_2$.

*If.* Suppose $X \to R_2$ holds, and let $r$ satisfy $F$. Take $s$ in the join: there are $t, u \in r$ with $t[R_1] = s[R_1]$, $u[R_2] = s[R_2]$, and in particular $t[X] = u[X] = s[X]$. By $X \to R_2$, $t[R_2] = u[R_2] = s[R_2]$. So $t$ agrees with $s$ on $R_1 \cup R_2 = R$, i.e. $s = t \in r$. The case $X \to R_1$ is symmetric.

*Only if.* Suppose neither FD is implied. As in the completeness proof of [[#thm-armstrong]], let $r = \set{t, u}$ where $t$ is $0$ everywhere and $u$ is $0$ on $X^+$ and $1$ elsewhere; $r$ satisfies $F$. Since $X \subseteq X^+$, $t$ and $u$ agree on $X$, so the join contains the tuple $s$ with $s[R_1] = t[R_1]$ and $s[R_2] = u[R_2]$. Because $R_2 \not\subseteq X^+$, there is $B \in R_2 - X^+$ with $u[B] = 1$, and $B \notin R_1$ (since $B \notin X$), so $s[B] = 1 \ne t[B]$: $s \ne t$. Because $R_1 \not\subseteq X^+$, some $A \in R_1 - X^+$ has $s[A] = t[A] = 0 \ne u[A]$: $s \ne u$. So the join contains a spurious tuple, and the decomposition is lossy.
:::

The "if" direction is Heath's theorem (1971). For decompositions into more than two schemas, losslessness is tested with the **chase** algorithm of Aho, Beeri and Ullman (1979), or guaranteed by construction, as in the two algorithms below.

::: example A lossy decomposition {#ex-lossy}
Decompose Enrolled(sid, code, grade) into $(\text{sid}, \text{grade})$ and $(\text{code}, \text{grade})$. Is it lossless? How many tuples does the join of the projections have on the ten-row instance of [[databases/relational-model]]?
::: solution
The common attribute is grade, and $\text{grade}^+ = \set{\text{grade}}$ under $\text{sid}\,\text{code} \to \text{grade}$, so grade is a superkey of neither part; by [[#thm-heath]] the decomposition is lossy. On the instance: grade A was given to students $\set{1, 3}$ in courses $\set{\text{CS101}, \text{MA101}, \text{CS202}, \text{MA210}}$, giving $2 \cdot 4 = 8$ combinations; grade B to students $\set{1,2,3,4}$ in all four courses, $16$ combinations; grade C to student $2$ in CS101, $1$ combination. The join has $25$ tuples instead of $10$ — SQLite agrees:

```sql
SELECT COUNT(*) FROM (SELECT DISTINCT sid, grade FROM Enrolled)
                JOIN (SELECT DISTINCT code, grade FROM Enrolled) USING (grade);
```

```text
25
```

Fifteen tuples are spurious, among them $(3, \text{CS101}, \text{A})$, although Chen never took CS101. Decomposing on $(\text{sid}, \text{code})$ and $(\text{sid}, \text{code}, \text{grade})$ would be lossless but pointless; the useful decompositions split off the targets of FDs whose left side is not a key.
:::
:::

### BCNF decomposition

::: algorithm BCNF decomposition {#alg-bcnf}
Input: schema $R$ and FDs $F$. Output: a lossless decomposition into BCNF schemas.
1. $D \gets \set{R}$.
2. While some $S \in D$ is not in BCNF:
   1. find a non-trivial FD $X \to Y$ in $F^+$ with $X \cup Y \subseteq S$ and $X$ not a superkey of $S$;
   2. replace $S$ in $D$ by $S_1 = X^+ \cap S$ and $S_2 = X \cup (S - X^+)$.
3. Return $D$.
:::

::: theorem Correctness of BCNF decomposition {#thm-bcnf}
[[#alg-bcnf]] terminates, and its output is a lossless decomposition of $R$ in which every schema is in BCNF.
:::

::: proof
*Termination.* At a split, $S_1 = X^+ \cap S \subsetneq S$ because $X$ is not a superkey of $S$; and $S_2 = X \cup (S - X^+) \subsetneq S$ because it misses the attributes of $Y - X$, which are non-empty (the FD is non-trivial) and lie in $X^+$. Both parts are strictly smaller than $S$, so the process stops: a schema of one attribute is always in BCNF.

*Lossless.* $S_1 \cap S_2 = X$ (attributes of $S_2$ outside $X$ are outside $X^+$), and $X \to S_1$ since $S_1 \subseteq X^+$. By [[#thm-heath]] each split is lossless with respect to the FDs holding on $S$. Losslessness composes: if $S$ is replaced by a lossless decomposition of itself inside a lossless decomposition, the join of all parts equals the join with $S$'s parts joined first (joins are associative and commutative), which is $\pi_S(r)$, and so the whole is still $r$. By induction on the number of splits, the final decomposition is lossless.

*BCNF.* The loop ends only when every schema is in BCNF.
:::

::: example Decomposing the enrolment table {#ex-bcnf}
Apply [[#alg-bcnf]] to the big table with FDs [[#eq-uni-fds]]. Is the result dependency-preserving?
::: solution
- $S = $ (sid, name, code, title, dept, building, grade) violates BCNF with $\text{code} \to \text{title}\,\text{dept}$. $\text{code}^+ \cap S = \set{\text{code}, \text{title}, \text{dept}, \text{building}}$, so $S_1 = $ (code, title, dept, building) and $S_2 = $ (code, sid, name, grade).
- $S_2$ violates BCNF with $\text{sid} \to \text{name}$ (its key is sid code): split into (sid, name) and (sid, code, grade).
- $S_1$ violates BCNF with $\text{dept} \to \text{building}$ (its key is code): split into (dept, building) and (code, title, dept).

Result: Student(sid, name), Enrolled(sid, code, grade), Course(code, title, dept), Department(dept, building) — exactly the tables a good designer would write, now derived. Each FD of $F$ lies inside one schema, so the decomposition is dependency-preserving. (Choosing $\text{code} \to \text{building}$ as the first violation would have produced (code, building) and lost $\text{dept} \to \text{building}$; it is wise to split on FDs from a minimal cover.)
:::
:::

BCNF cannot always be had together with dependency preservation. In the tutor schema [[#eq-tutor]], the only BCNF violation is $\text{tutor} \to \text{course}$, giving $(\text{tutor}, \text{course})$ and $(\text{student}, \text{tutor})$. This is lossless (tutor is a key of the first), but the FD $\text{student}\,\text{course} \to \text{tutor}$ mentions attributes of both tables and holds in neither alone. Every decomposition of $R$ into BCNF either keeps $R$ whole — not BCNF — or splits it into schemas that cannot contain all three attributes, so *no* BCNF decomposition of $R$ preserves dependencies ([[#ex-tutor]]). To prevent a student from having two tutors for one course, the database would have to join the tables on every insertion.

### 3NF synthesis

3NF is the compromise that can always be achieved together with both guarantees.

::: algorithm 3NF synthesis {#alg-3nf}
Input: schema $R$ and FDs $F$. Output: a lossless, dependency-preserving decomposition into 3NF.
1. Compute a minimal cover $G$ of $F$.
2. For each left side $X$ occurring in $G$, create the schema $X \cup \set{A : X \to A \in G}$.
3. If no schema created so far contains a candidate key of $R$, add one schema consisting of a candidate key.
4. Remove any schema contained in another.
:::

::: theorem Correctness of 3NF synthesis {#thm-3nf}
The output of [[#alg-3nf]] is dependency-preserving and lossless, and every schema in it is in 3NF.
:::

::: proof
*Dependency preservation.* Every FD $X \to A$ of $G$ lies inside the schema created for $X$ (step 4 only deletes schemas contained in others, which keeps the FD inside a larger one). So the union of the projected FDs contains $G$, whose closure is $F^+$.

*Lossless.* Let $S_0$ be a schema containing a candidate key $K$ of $R$ (step 3 ensures one). Let $r$ satisfy $F$ and let $s$ be a tuple of the join of the projections; so for each schema $S_j$ there is $u_j \in r$ with $u_j[S_j] = s[S_j]$. We show $u_0 = s$. Run [[#alg-closure]] on $K$ using the FDs of $G$; we prove by induction that $u_0$ agrees with $s$ on every attribute added. Initially $u_0[K] = s[K]$ because $K \subseteq S_0$. When an FD $X \to A$ of $G$ adds $A$, with $X$ already in the closure, it lies inside some schema $S_j$, so $u_j[X] = s[X] = u_0[X]$ by induction; since $r$ satisfies $X \to A$, $u_0[A] = u_j[A] = s[A]$. As $K^+ = R$, $u_0 = s$, so $s \in r$.

*3NF.* A schema $K$ added in step 3 is a candidate key of $R$, and it is a candidate key of the schema $K$ too (a proper subset determining $K$ would determine $R$); so every attribute of it is prime, and any FD on it satisfies 3NF. Consider a schema $S = X \cup Y$ from step 2, where $Y = \set{A : X \to A \in G}$. First, $X$ is a candidate key of $S$: it determines $S$, and if a proper subset $X' \subset X$ did, then $X' \to A$ for some $A \in Y$ would make an attribute of $X$ extraneous in $X \to A$, contradicting minimality. Now let $Z \to B$ be a non-trivial FD with $Z \cup \set B \subseteq S$ and $Z$ not a superkey of $S$. If $B \in X$, $B$ is prime in $S$ and 3NF holds. Suppose $B \in Y$, so $X \to B \in G$. Run [[#alg-closure]] on $Z$ with the FDs of $G$; it reaches $B$. If the run used $X \to B$, then $X \subseteq Z^+$ at that point, so $Z \to X \to S$ and $Z$ is a superkey of $S$ — contradiction. If not, then $Z \to B$ follows from $G' = G - \set{X \to B}$; and $X \to Z$ also follows from $G'$, because $Z \subseteq S - \set B$ and $X$ determines each attribute of $S - \set{B}$ by reflexivity or by an FD $X \to A$ with $A \ne B$. Then $X \to B$ follows from $G'$, so it is redundant in $G$ — contradicting minimality. So every such FD has a prime right side, and $S$ is in 3NF.
:::

::: example 3NF synthesis {#ex-3nf}
Apply [[#alg-3nf]] to $R(A, B, C, D, E)$ with $F = \set{A \to B,\ B \to C,\ CD \to E,\ E \to A}$.
::: solution
$F$ is already a minimal cover (single right sides; in $CD \to E$, $C^+ = \set C$ and $D^+ = \set D$ do not contain $E$; no FD follows from the others). Step 2 gives $AB$, $BC$, $CDE$, $EA$. Candidate keys of $R$: $D$ appears on no right side, so it is in every key; $D^+ = \set D$, $AD^+ = BD^+ = CD^+ = DE^+ = R$. So the keys are $AD$, $BD$, $CD$, $DE$, and $CDE$ contains the key $CD$: step 3 adds nothing. The decomposition is $\set{AB, BC, CDE, AE}$. Each schema is in 3NF, as [[#thm-3nf]] promises, but not all are in BCNF: on $CDE$ the FD $E \to C$ holds (since $E^+ = ABCE$), and $E$ is not a superkey of $CDE$ — the right side $C$ is prime, because $CD$ is a key of $CDE$. A hidden FD of this kind, visible only through the closure, is why BCNF must be tested on projected FDs.

The original $R$ was itself in 3NF, because every attribute is prime — and not in BCNF, since $A \to B$ has a non-key left side. [[#alg-bcnf]] on $R$ gives a lossless BCNF decomposition such as $\set{AB, BC, AE, DE}$, which loses $CD \to E$ (no schema contains $C$, $D$ and $E$). This is the general trade-off: BCNF removes all FD redundancy but may lose dependencies; 3NF keeps dependencies but may keep some redundancy.
:::
:::

::: warning Normalisation is not "split every table as far as possible"
Two opposite mistakes are common. One is to decompose without checking losslessness: splitting on attributes that are not a key of either part, as in [[#ex-lossy]], silently invents facts. The other is to treat normalisation as a goal in itself. A decomposition into BCNF is guaranteed lossless only when done by [[#alg-bcnf]], dependency preservation may be lost, and every split adds joins to queries. Analytical databases deliberately **denormalise** (a "star schema" repeats dimension attributes) because they are read far more than written; then the anomalies are managed by reloading data in bulk. Normal forms tell you exactly what redundancy you have; whether to keep it is an engineering decision.
:::

## Beyond functional dependencies

BCNF removes redundancy caused by FDs, but not all redundancy is of that kind. Suppose each lecturer teaches several courses and speaks several languages, independently, and the table Lect(lid, course, language) records all combinations. If Rao teaches CS101 and CS202 and speaks English and Hindi, the table has four rows. There are no non-trivial FDs, so the only key is all three attributes and the table is in BCNF, yet adding a third language means adding two rows.

::: definition Multivalued dependency {#def-mvd}
A relation $r$ over $R$ satisfies the **multivalued dependency** (MVD) $X \twoheadrightarrow Y$ if, with $Z = R - X - Y$, whenever $t, u \in r$ agree on $X$, there is a tuple $v \in r$ with $v[X] = t[X]$, $v[Y] = t[Y]$ and $v[Z] = u[Z]$. A schema is in **fourth normal form** (4NF) if for every non-trivial MVD $X \twoheadrightarrow Y$ that holds ($Y \not\subseteq X$, $X \cup Y \ne R$), $X$ is a superkey.
:::

Here $\text{lid} \twoheadrightarrow \text{course}$: the courses of a lecturer combine with all of the lecturer's languages. Every FD $X \to Y$ is also an MVD, and the analogue of [[#thm-heath]] holds: a decomposition into $R_1, R_2$ is lossless if and only if $R_1 \cap R_2 \twoheadrightarrow R_1$ holds (Fagin, 1977). Decomposing into (lid, course) and (lid, language) removes the redundancy. Join dependencies, the general condition for lossless decomposition into several parts (as for the ternary relationship of [[databases/conceptual-design#prop-ternary]]), lead to fifth normal form; they are rare in practice.

::: quiz
Which decomposition of $R(A, B, C)$ with $F = \set{A \to B}$ is lossless?
- [x] $AB$ and $AC$
- [ ] $AB$ and $BC$
- [ ] $AC$ and $BC$
- [x] $ABC$ and $A$
::: solution
By [[#thm-heath]], the common attributes must determine one side. $AB \cap AC = A$ and $A \to AB$: lossless. $AB \cap BC = B$, and $B^+ = \set B$: lossy. $AC \cap BC = C$, $C^+ = \set C$: lossy. $ABC \cap A = A$, which trivially determines $A$: lossless (and useless, since $ABC$ is the original schema).
:::
:::

::: history
Codd introduced first normal form in 1970 and second and third normal forms in "Further normalization of the data base relational model" (IBM report 1971, published 1972). Ian Heath's 1971 workshop paper "Unacceptable file operations in a relational data base" gave the lossless-join condition for two components. Boyce–Codd normal form appeared in Codd's "Recent investigations in relational data base systems" (1974), crediting Raymond Boyce; William W. Armstrong's "Dependency structures of data base relationships" (IFIP Congress 1974) gave the axioms and proved their completeness. Philip Bernstein's "Synthesizing third normal form relations from functional dependencies" (*ACM TODS*, 1976) gave the synthesis algorithm; Ronald Fagin introduced multivalued dependencies and fourth normal form in 1977; and Alfred Aho, Catriel Beeri and Jeffrey Ullman's "The theory of joins in relational databases" (*TODS*, 1979) introduced the chase. Claudio Lucchesi and Sylvia Osborn showed in 1978 that deciding whether an attribute is prime is NP-complete, which makes testing 3NF NP-complete as well.
:::

## Where this leads

The schemas produced here are the tables of the physical design. Each decomposition trades update anomalies for joins at query time, which is why join algorithms ([[databases/query-processing]]) and join ordering ([[databases/query-optimisation]]) matter so much. FDs reappear in the optimiser, which uses keys and foreign keys to estimate join sizes and to remove redundant `DISTINCT` and `GROUP BY` work, and in the SQL standard's rule for grouped queries ([[databases/sql]]). Large analytical and distributed systems often denormalise on purpose, accepting redundancy to avoid joins across machines; Kleppmann's book discusses those trade-offs, which continue in [[distributed-systems]].

::: summary
- A **functional dependency** $X \to Y$ says that equal $X$-values force equal $Y$-values in every legal instance; keys are the FDs $K \to R$.
- **Armstrong's axioms** (reflexivity, augmentation, transitivity) are sound and complete; in practice, test $X \to Y$ by computing the **attribute closure** $X^+$ ([[#alg-closure]]).
- An attribute on no right-hand side is in every candidate key; a **minimal cover** has single right sides, no extraneous left attributes and no redundant FDs.
- **BCNF**: every non-trivial FD has a superkey on the left. **3NF**: or its right side is prime. BCNF implies 3NF.
- A binary decomposition is **lossless** iff the common attributes are a superkey of one part ([[#thm-heath]]); lossy decompositions add spurious tuples.
- [[#alg-bcnf]] always gives a lossless BCNF decomposition but may lose dependencies; [[#alg-3nf]] always gives a lossless, dependency-preserving 3NF decomposition.
- MVDs and 4NF capture redundancy from independent multivalued facts that FDs cannot see; denormalisation is a deliberate engineering choice, not an error.
:::

## Exercises

In exercises 1–5, $R = ABCDE$ and $F = \set{A \to B,\ B \to C,\ CD \to E,\ E \to A}$, as in [[#ex-3nf]].

::: exercise A closure {level=1 check="3"}
Compute $A^+$ and $(AD)^+$. (Enter the number of attributes in $A^+$.)
::: solution
$A^+$: $A \to B$ adds $B$, $B \to C$ adds $C$; $CD \to E$ needs $D$. So $A^+ = \set{A, B, C}$, with $3$ attributes. $(AD)^+$: $A, D, B, C$, then $CD \to E$ adds $E$: all of $R$, so $AD$ is a superkey.
:::
:::

::: exercise Counting candidate keys {level=1 check="4"}
Find all candidate keys of $R$. (Enter how many there are.)
::: solution
$D$ is on no right side, so every key contains $D$; $D^+ = \set{D}$, so it is not a key alone. Adding one attribute: $AD^+$, $BD^+$ ($B, C$, then $E$, then $A$), $CD^+$ ($E$, then $A$, then $B$) and $DE^+$ ($A$, $B$, $C$) are all $R$. So $AD$, $BD$, $CD$ and $DE$ are candidate keys, and any other superkey contains one of them: $4$ keys.
:::
:::

::: exercise Deriving rules {level=1}
Derive the pseudotransitivity rule (from $X \to Y$ and $WY \to Z$ infer $WX \to Z$) and the rule "from $X \to Y$ and $Z \to W$ infer $XZ \to YW$" from Armstrong's axioms, naming the axiom used at each step.
::: solution
Pseudotransitivity: augment $X \to Y$ by $W$ to get $WX \to WY$; with $WY \to Z$, transitivity gives $WX \to Z$.

Second rule: augment $X \to Y$ by $Z$: $XZ \to YZ$. Augment $Z \to W$ by $Y$: $YZ \to YW$. Transitivity: $XZ \to YW$.
:::
:::

::: exercise Counting superkeys {level=2 check="15"}
How many superkeys does $R$ have? (Enter the number.)
::: solution
A set is a superkey iff it contains $D$ and at least one of $A, B, C, E$ (each of $AD, BD, CD, DE$ is a key, and $D$ alone is not). Sets containing $D$: $2^4 = 16$; minus the set $\set D$ itself: $15$. (Equivalently $2^4 - 1$ non-empty subsets of $\set{A, B, C, E}$, each joined with $D$.)
:::
:::

::: exercise BCNF and dependency loss {level=2}
Is $R$ in 3NF? In BCNF? Apply [[#alg-bcnf]] starting with the violation $A \to B$, and determine which FDs of $F$ are lost.
::: solution
All attributes are prime (each is in one of the keys $AD, BD, CD, DE$), so $R$ is in 3NF; $A \to B$ has a non-superkey left side, so it is not in BCNF. Split on $A$: $A^+ = ABC$, giving $S_1 = ABC$ and $S_2 = ADE$. In $S_1$, $B \to C$ violates BCNF (key $A$): split into $BC$ and $AB$. On $S_2 = ADE$ the FDs that hold include $E \to A$ and $AD \to E$ (since $(AD)^+ = R$), so its keys are $AD$ and $DE$, and $E \to A$ violates BCNF: split into $AE$ and $DE$. Result $\set{AB, BC, AE, DE}$, lossless by [[#thm-bcnf]]. FDs $A \to B$, $B \to C$ and $E \to A$ are each inside a schema, but $CD \to E$ is not, and it does not follow from the projected FDs (which never mention $C$ and $D$ together); so $CD \to E$ is lost.
:::
:::

::: exercise Counting spurious tuples {level=2 check="15"}
In [[#ex-lossy]], how many spurious tuples does the join contain? Name one decomposition of Enrolled(sid, code, grade) into two schemas of two attributes each that is lossless, or show that none exists.
::: solution
The join has $25$ tuples and the original $10$, so $25 - 10 = 15$ are spurious. The only FD is $\text{sid}\,\text{code} \to \text{grade}$. Two-attribute schemas covering all three attributes share exactly one attribute: (sid, code) with (sid, grade) shares sid; (sid, code) with (code, grade) shares code; (sid, grade) with (code, grade) shares grade. In each case the shared attribute's closure is itself, which is a superkey of neither part, so by [[#thm-heath]] none is lossless.
:::
:::

::: exercise BCNF checking with F alone {#ex-bcnf-check level=2}
Prove that if for every non-trivial FD $X \to Y$ in $F$ the left side $X$ is a superkey of $R$, then $R$ (with all its attributes) is in BCNF. Why does this shortcut fail for a schema $S \subsetneq R$ obtained by decomposition?
::: solution
Let $V \to W$ be a non-trivial FD in $F^+$ and suppose $V$ is not a superkey, so $V^+ \ne R$. Run [[#alg-closure]] on $V$. Since $V \to W$ is non-trivial, $W \not\subseteq V$ but $W \subseteq V^+$, so at least one FD of $F$ adds an attribute. The first one to do so, $X \to Y$, has $X \subseteq V$ (nothing had been added yet) and $Y \not\subseteq X$, so it is non-trivial and, by assumption, $X$ is a superkey. Then $V \supseteq X$ determines $R$, contradicting $V^+ \ne R$. Hence every non-trivial FD of $F^+$ has a superkey on the left.

For a sub-schema $S$, the FDs that hold on $S$ are those of $F^+$ inside $S$, which need not be visible in $F$. Example: $R = ABC$, $F = \set{A \to B, B \to C}$, $S = AC$. No FD of $F$ lies inside $S$, but $A \to C$ holds on $S$ — here harmlessly, since $A$ is a key of $S$; in general, as in [[#ex-3nf]], such hidden FDs can violate BCNF, so one must test with closures of subsets of $S$.
:::
:::

::: exercise The tutor schema {#ex-tutor level=3}
For [[#eq-tutor]], prove that no decomposition of $R$ = (student, course, tutor) into BCNF schemas is dependency-preserving.
::: solution
$R$ itself is not in BCNF (tutor → course). Any other decomposition consists of schemas with at most two of the three attributes. The FD $\text{student}\,\text{course} \to \text{tutor}$ must follow from the union of the projected FDs. Each projected FD has all its attributes inside a two-attribute schema. The FDs of $F^+$ on two attributes are: $\text{tutor} \to \text{course}$, and trivial ones; $\text{student} \to \text{course}$, $\text{student} \to \text{tutor}$, $\text{course} \to \text{tutor}$ and $\text{course} \to \text{student}$ are not implied ($\text{student}^+ = \set{\text{student}}$, $\text{course}^+ = \set{\text{course}}$), and neither is $\text{tutor} \to \text{student}$. So the union of the projections implies at most $\set{\text{tutor} \to \text{course}}$, under which $(\text{student}\,\text{course})^+ = \set{\text{student}, \text{course}}$ does not contain tutor. Hence $\text{student}\,\text{course} \to \text{tutor}$ is lost in every BCNF decomposition.
:::
:::

::: exercise 3NF with one key implies BCNF {level=3}
Prove: if a schema $R$ in 3NF has exactly one candidate key, then it is in BCNF.
::: solution
Suppose $R$ is in 3NF with unique candidate key $K$, and let $X \to A$ be a non-trivial FD ($A \notin X$) with $X$ not a superkey. By 3NF, $A$ is prime, so $A \in K$. Consider $K' = (K - \set A) \cup X$. It determines $X$ and hence $A$, so it determines $K$ and is a superkey. It therefore contains a candidate key, which must be $K$ — the only one. So $A \in K'$; as $A \notin K - \set A$, $A \in X$, contradicting non-triviality. Hence every non-trivial FD has a superkey on the left: $R$ is in BCNF.
:::
:::

::: exercise Implementing the algorithms {level=3}
Using `closure`, write `candidate_keys(R, F)` (enumerate subsets by increasing size, keep superkeys containing no smaller key) and `is_bcnf(R, F)`, and test them on the big enrolment table and on $R = ABCDE$ above.
::: solution
```python
from itertools import combinations

def candidate_keys(R, F):
    keys = []
    for k in range(1, len(R) + 1):
        for X in map(set, combinations(sorted(R), k)):
            if closure(X, F) >= R and not any(K <= X for K in keys):
                keys.append(X)           # minimal: no smaller key inside
    return keys

def is_bcnf(R, F):
    # all FDs inside R that follow from F: X -> (X+ & R) for every subset X
    for k in range(1, len(R) + 1):
        for X in map(set, combinations(sorted(R), k)):
            if (closure(X, F) & R) - X and not closure(X, F) >= R:
                return False, X          # X determines something but is not a superkey
    return True, None

def fds(s):
    return [(set(l.split()), set(r.split()))
            for l, r in (p.split("->") for p in s.split(";"))]

R1 = set("sid name code title dept building grade".split())
F1 = fds("sid -> name; code -> title dept; dept -> building; sid code -> grade")
R2, F2 = set("ABCDE"), fds("A -> B; B -> C; C D -> E; E -> A")
print([sorted(K) for K in candidate_keys(R1, F1)], is_bcnf(R1, F1))
print([sorted(K) for K in candidate_keys(R2, F2)], is_bcnf(R2, F2))
print(is_bcnf(set("AB"), F2), is_bcnf(set("CDE"), F2))
```

```console
$ python3 keys.py
[['code', 'sid']] (False, {'code'})
[['A', 'D'], ['B', 'D'], ['C', 'D'], ['D', 'E']] (False, {'A'})
(True, None) (False, {'E'})
```

Both algorithms are exponential in $\lvert R\rvert$, as they must be in the worst case: a schema can have exponentially many candidate keys — up to $\binom{n}{\lfloor n/2\rfloor}$ for $n$ attributes, by Sperner's theorem, since no key contains another. For the textbook-sized schemas of design work this is no obstacle. Because `is_bcnf` tests the projected FDs, it works for decomposed schemas too: it finds that $CDE$, a schema of the 3NF synthesis in [[#ex-3nf]], is not in BCNF, since $E \to C$ holds on it ($E^+ = ABCE$) while $E$ is not a superkey of $CDE$.
:::
:::
