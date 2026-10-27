Here is a puzzle. A delivery van must visit 30 shops, each exactly once, travelling only along the roads on a given map. Does such a route exist? Nobody knows a method that is substantially better than trying a huge number of orders, and for a map that is cleverly drawn the search can take longer than any computer will run. Yet if a colleague hands you a route, you can check it in a minute: is every shop on the list once, and is every consecutive pair joined by a road?

Many problems share this shape: **solutions may be hard to find but are easy to check**. Factoring a number, colouring a map with three colours, packing boxes into a lorry, scheduling exams, finding a proof of a theorem of bounded length — in each case a proposed answer can be verified quickly. This chapter turns that observation into a definition, the class $\mathsf{NP}$, shows that it coincides with polynomial time on nondeterministic machines, and states the question at the centre of the course: is every problem whose solutions can be checked quickly also a problem whose solutions can be *found* quickly? That is, does $\mathsf{P} = \mathsf{NP}$?

## Verifiers and certificates

::: definition Verifier {#def-verifier}
A **verifier** for a language $L$ is a deterministic algorithm $V$ that halts on all inputs and satisfies

$$
L = \{w : V \text{ accepts } \langle w, c\rangle \text{ for some string } c\}.
$$ {#eq-verifier}

A string $c$ with $V$ accepting $\langle w, c\rangle$ is a **certificate** (or **witness**) for $w$. $V$ is a **polynomial-time verifier** if its running time is polynomial in $\lvert w\rvert$ — the length of $w$ alone.
:::

Two conditions hide inside [[#eq-verifier]]. **Completeness**: every $w \in L$ has at least one certificate. **Soundness**: no $w \notin L$ has a certificate, however cleverly chosen — the verifier must not be fooled. Since a polynomial-time verifier can read only polynomially many symbols of its input, we may assume that certificates have length at most $p(\lvert w\rvert)$ for a polynomial $p$; longer certificates are never needed.

::: definition The class NP {#def-np}
$\mathsf{NP}$ is the class of languages that have polynomial-time verifiers.
:::

The name stands for **nondeterministic polynomial time**, for reasons explained in [[#sec-ntm]] — not for "non-polynomial". Here are the examples that will accompany us through the course.

- $\mathit{HAMPATH} = \{\langle G, s, t\rangle : G$ is a directed graph with a **Hamiltonian path** from $s$ to $t\}$, a path that visits every vertex exactly once. Certificate: the sequence of vertices.
- $\mathit{CLIQUE} = \{\langle G, k\rangle : G$ is an undirected graph with a $k$-**clique**$\}$, a set of $k$ vertices that are pairwise adjacent. Certificate: the $k$ vertices.
- $\mathit{SUBSET\text{-}SUM} = \{\langle a_1, \dots, a_m, T\rangle :$ some sub-collection of the $a_i$ sums to $T\}$, numbers in binary. Certificate: the indices of the chosen numbers.
- $\mathit{COMPOSITES} = \{\langle N\rangle : N = pq$ for integers $p, q \ge 2\}$, $N$ in binary. Certificate: a factor $p$.
- $\mathit{SAT} = \{\langle\varphi\rangle : \varphi$ is a satisfiable Boolean formula$\}$. Certificate: a satisfying assignment.

::: example A verifier for CLIQUE and HAMPATH {#ex-verifiers}
Write polynomial-time verifiers for $\mathit{CLIQUE}$ and $\mathit{HAMPATH}$, and run them on the graph with vertices $1, \dots, 6$ and edges $12, 13, 23, 24, 34, 45, 46, 56$.
::: solution
```python
from itertools import combinations

def verify_clique(edges, k, cert):
    """Accept iff cert is a set of k pairwise adjacent vertices."""
    E = {frozenset(e) for e in edges}
    return (len(set(cert)) == k and
            all(frozenset((u, v)) in E for u, v in combinations(cert, 2)))

def verify_hampath(vertices, edges, s, t, cert, directed=False):
    """Accept iff cert lists every vertex once, from s to t, along edges."""
    E = set(map(tuple, edges)) | (set() if directed else {(v, u) for u, v in edges})
    return (sorted(cert) == sorted(vertices) and cert[0] == s and cert[-1] == t
            and all((cert[i], cert[i + 1]) in E for i in range(len(cert) - 1)))

V = [1, 2, 3, 4, 5, 6]
E = [(1, 2), (1, 3), (2, 3), (2, 4), (3, 4), (4, 5), (4, 6), (5, 6)]
print(verify_clique(E, 3, [2, 3, 4]), verify_clique(E, 4, [1, 2, 3, 4]))
print(verify_hampath(V, E, 1, 6, [1, 3, 2, 4, 5, 6]),
      verify_hampath(V, E, 1, 6, [1, 2, 3, 4, 6, 5]))
```

```console
$ python3 verify.py
True False
True False
```

$\{2, 3, 4\}$ is a triangle, so $\langle G, 3\rangle \in \mathit{CLIQUE}$. The certificate $\{1, 2, 3, 4\}$ is rejected because $1$ and $4$ are not adjacent — this does not show that $G$ has no $4$-clique, only that this certificate is bad (in fact $G$ has none). The route $1, 3, 2, 4, 5, 6$ is a Hamiltonian path from $1$ to $6$; the second candidate fails because it ends at $5$. Each verifier makes $O(k^2)$ or $O(n)$ set look-ups after building the edge set in $O(m)$ — polynomial in the input length.
:::
:::

Notice what the verifiers do *not* do: they never search. All the difficulty of the problem has been moved into the certificate, which the verifier is simply given.

::: widget graph
nodes: 1@0,1; 2@1,2; 3@1,0; 4@2,1; 5@3,2; 6@3,0
edges: 1-2; 1-3; 2-3; 2-4; 3-4; 4-5; 4-6; 5-6
algorithm: dfs
start: 1
caption: The graph of [[#ex-verifiers]]. Drag the vertices to find the triangle $\{2,3,4\}$ and the Hamiltonian path $1, 3, 2, 4, 5, 6$. Step through depth-first search from $1$: it visits every vertex in linear time, but a DFS tree is not a Hamiltonian path in general — the search for one must, as far as anyone knows, consider exponentially many orders in the worst case.
:::

## Nondeterministic time {#sec-ntm}

The original definition of $\mathsf{NP}$ uses nondeterministic Turing machines ([[theory-of-computation/turing-machines#thm-ntm]]).

::: definition Nondeterministic time {#def-ntime}
A nondeterministic Turing machine is a **$t(n)$-time decider** if, on every input of length $n$, every branch of its computation halts within $t(n)$ moves. $\mathsf{NTIME}(t(n))$ is the class of languages decided by $O(t(n))$-time nondeterministic multitape Turing machines.
:::

The machine accepts if *some* branch accepts. It is useful to imagine that it can make lucky guesses: whenever it has a choice, it takes the one that leads to acceptance if any does. A nondeterministic machine for $\mathit{CLIQUE}$ "guesses" $k$ vertices and then checks them. This guess-and-check pattern is exactly a verifier, and the two definitions agree.

::: theorem Verifiers and nondeterminism {#thm-np-ntm}
$$
\mathsf{NP} = \bigcup_{k \ge 0} \mathsf{NTIME}(n^k).
$$
:::

::: proof
*Verifier $\Rightarrow$ machine.* Let $V$ verify $L$ in time $n^k$ (for $n \ge 2$; constants change nothing). Then certificates of length more than $n^k$ are never read in full, so we may restrict to certificates of length at most $n^k$. Build a nondeterministic machine $N$: on input $w$ of length $n$, nondeterministically write a string $c$ of length at most $n^k$ (at each step choose a symbol, or stop), then run $V$ on $\langle w, c\rangle$ and accept iff $V$ does. Every branch halts within $O(n^k)$ moves for writing plus $O(n^k)$ for $V$. Some branch accepts iff some certificate works iff $w \in L$.

*Machine $\Rightarrow$ verifier.* Let $N$ decide $L$ in nondeterministic time $n^k$, with at most $b$ choices per move. A branch of $N$ on $w$ is determined by its sequence of choices, a string over $\{1, \dots, b\}$ of length at most $n^k$. Define $V$: on input $\langle w, c\rangle$, simulate $N$ on $w$, using the $i$-th symbol of $c$ to resolve the $i$-th choice; reject if $c$ names a non-existent choice or runs out; accept iff this branch accepts. $V$ is deterministic and runs in time $O(n^k)$. If $w \in L$ then the choice sequence of an accepting branch is a certificate; if $w \notin L$ no branch accepts, so no $c$ makes $V$ accept.
:::

Both views are useful. The verifier view is usually easier for showing that a problem is in $\mathsf{NP}$, and it explains what $\mathsf{NP}$ is "really" about: the existence of short, efficiently checkable proofs of membership. The machine view connects $\mathsf{NP}$ to the other complexity classes defined by machines, such as $\mathsf{NL}$ in [[complexity/space-complexity]].

::: example Counting the guesses for CLIQUE {#ex-clique-branches}
For $\langle G, 3\rangle$ with $G$ the graph of [[#ex-verifiers]], how many candidate certificates (sets of $3$ vertices) are there, how many are accepted, and how many branches would a nondeterministic machine need to succeed?
::: solution
There are $\binom{6}{3} = 20$ three-element sets. The accepted ones are the triangles of $G$: $\{1, 2, 3\}$, $\{2, 3, 4\}$ and $\{4, 5, 6\}$ — three of the twenty. A nondeterministic machine needs just one accepting branch; a deterministic search in the worst case tries all $\binom{n}{k}$ sets, which for $k = n/2$ is about $2^n/\sqrt{n}$.
:::
:::

## P, NP and exponential time

::: definition Exponential time {#def-exp}
$$
\mathsf{EXP} = \bigcup_{k \ge 0} \mathsf{TIME}\bigl(2^{n^k}\bigr).
$$
:::

::: theorem P ⊆ NP ⊆ EXP {#thm-p-np-exp}
$\mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{EXP}$.
:::

::: proof
If $L \in \mathsf{P}$, a polynomial-time decider for $L$ is a verifier that ignores its certificate (take $c = \varepsilon$). If $L \in \mathsf{NP}$ with verifier $V$ running in time $p(n)$ over alphabet $\Sigma$, decide $L$ by running $V$ on $\langle w, c\rangle$ for every string $c$ of length at most $p(n)$. There are at most $(\lvert\Sigma\rvert + 1)^{p(n)} = 2^{O(p(n))}$ such strings and each run takes $p(n)$ steps, so the total time is $2^{O(p(n))} \cdot p(n) \le 2^{n^k}$ for a suitable $k$ and large $n$.
:::

We know that $\mathsf{P} \ne \mathsf{EXP}$ (the time hierarchy theorem, [[complexity/hierarchies]]), so at least one of the two inclusions is strict. Which one — or both — is unknown. Most researchers believe both are.

::: quiz
Which statements follow from the definitions and [[#thm-p-np-exp]]?
- [x] Every problem in $\mathsf{P}$ is in $\mathsf{NP}$.
- [ ] Every problem in $\mathsf{NP}$ requires exponential time.
- [x] Every problem in $\mathsf{NP}$ can be decided in exponential time.
- [ ] A problem is in $\mathsf{NP}$ if a proposed "no" answer can be checked quickly.
::: solution
$\mathsf{P} \subseteq \mathsf{NP}$ and $\mathsf{NP} \subseteq \mathsf{EXP}$ are proved above. "Requires exponential time" is not known for any problem in $\mathsf{NP}$ — it would imply $\mathsf{P} \ne \mathsf{NP}$ — and is false for the problems in $\mathsf{P}$. $\mathsf{NP}$ asks for certificates of *membership* ("yes" answers); short certificates for "no" answers define $\mathsf{coNP}$, below.
:::
:::

## Search versus decision

$\mathsf{NP}$ is a class of yes/no problems, but in practice we want the clique, the route or the assignment, not just a "yes". For the problems we care about, the two versions are equally hard up to a polynomial factor.

::: theorem Search reduces to decision for SAT {#thm-self-reduction}
If $\mathit{SAT} \in \mathsf{P}$, then there is a polynomial-time algorithm that, given a satisfiable formula $\varphi$, outputs a satisfying assignment.
:::

::: proof
Let $D$ decide $\mathit{SAT}$ in polynomial time and let $\varphi$ have variables $x_1, \dots, x_n$. For $i = 1, \dots, n$: let $\varphi_1$ be $\varphi$ with $x_i$ replaced by $\mathsf{true}$ (and simplified). If $D$ accepts $\varphi_1$, set $x_i \gets \mathsf{true}$ and $\varphi \gets \varphi_1$; otherwise set $x_i \gets \mathsf{false}$ and replace $x_i$ in $\varphi$ by $\mathsf{false}$.

*Invariant:* after step $i$, the current formula is satisfiable. Initially this holds. If $\varphi$ is satisfiable, some satisfying assignment gives $x_i$ some value $v$; if $v = \mathsf{true}$ then $\varphi_1$ is satisfiable and we take it, and if $\varphi_1$ is not satisfiable then $v = \mathsf{false}$ for every satisfying assignment and the other branch is satisfiable. After step $n$ the formula has no variables and is satisfiable, so it is true, and the values chosen satisfy the original $\varphi$. The algorithm makes $n$ calls to $D$ on formulas no longer than $\varphi$, plus polynomial work for substitution: polynomial time.
:::

This property is called **self-reducibility**. Every $\mathsf{NP}$-complete problem we meet has it, and in [[complexity/np-completeness]] we will see that a polynomial-time algorithm for $\mathit{SAT}$ would give polynomial-time *search* algorithms for every problem in $\mathsf{NP}$.

::: example Fixing variables one at a time {#ex-self-reduction}
Apply the procedure of [[#thm-self-reduction]] to $\varphi = (x_1 \lor x_2) \land (\lnot x_1 \lor x_3) \land (\lnot x_2 \lor \lnot x_3)$, using brute force as the "decider".
::: solution
Setting $x_1 = \mathsf{true}$ leaves $x_3 \land (\lnot x_2 \lor \lnot x_3)$, which is satisfiable ($x_2 = \mathsf{false}$, $x_3 = \mathsf{true}$): keep $x_1 = \mathsf{true}$. Setting $x_2 = \mathsf{true}$ leaves $x_3 \land \lnot x_3$, unsatisfiable: so $x_2 = \mathsf{false}$, leaving $x_3$. Setting $x_3 = \mathsf{true}$ leaves the empty conjunction, true: keep it. The output is $(x_1, x_2, x_3) = (\mathsf{true}, \mathsf{false}, \mathsf{true})$, and indeed all three clauses hold. In code (clauses as lists of signed variable numbers):

```python
from itertools import product

def satisfiable(clauses, n):
    """Brute-force SAT test (stands in for a hypothetical fast decider)."""
    return any(all(any((lit > 0) == a[abs(lit) - 1] for lit in c) for c in clauses)
               for a in product([False, True], repeat=n))

def restrict(clauses, var, value):
    """Set variable var to value: drop satisfied clauses, delete false literals."""
    out = []
    for c in clauses:
        if (var if value else -var) in c:
            continue                      # clause satisfied
        out.append([lit for lit in c if abs(lit) != var])
    return out

def find_assignment(clauses, n):
    if not satisfiable(clauses, n):
        return None
    assignment = []
    for v in range(1, n + 1):
        trial = restrict(clauses, v, True)
        value = satisfiable(trial, n)     # one decision query per variable
        clauses = trial if value else restrict(clauses, v, False)
        assignment.append(value)
    return assignment

phi = [[1, 2], [-1, 3], [-2, -3]]         # (x1 v x2)(~x1 v x3)(~x2 v ~x3)
print(find_assignment(phi, 3))
```

```console
$ python3 selfred.py
[True, False, True]
```

An empty clause `[]` (all its literals made false) is unsatisfiable, since `any([])` is false.
:::
:::

## coNP

$\mathsf{NP}$ is asymmetric. A satisfiable formula has a short proof of satisfiability, but what is a short proof that a formula is *unsatisfiable*? Listing all $2^n$ assignments is not short.

::: definition coNP {#def-conp}
$\mathsf{coNP} = \{L : \overline{L} \in \mathsf{NP}\}$. Equivalently, $L \in \mathsf{coNP}$ iff there are a polynomial $p$ and a polynomial-time algorithm $V$ such that $w \in L$ iff $V$ accepts $\langle w, c\rangle$ for **every** $c$ of length at most $p(\lvert w\rvert)$.
:::

(Strictly, $\overline{L}$ includes strings that do not encode a formula at all; such strings are recognised in polynomial time and we ignore them.) Examples: $\mathit{UNSAT}$, the unsatisfiable formulas; $\mathit{TAUT}$, the formulas true under every assignment; $\mathit{PRIMES}$, since its complement is $\mathit{COMPOSITES}$. In each case a "no" answer has a short certificate — a satisfying assignment, a falsifying assignment, a factor.

::: theorem Basic facts about coNP {#thm-conp}
1. $\mathsf{P} \subseteq \mathsf{NP} \cap \mathsf{coNP}$.
2. If $\mathsf{P} = \mathsf{NP}$ then $\mathsf{NP} = \mathsf{coNP}$.
3. Equivalently: if $\mathsf{NP} \ne \mathsf{coNP}$ then $\mathsf{P} \ne \mathsf{NP}$.
:::

::: proof
(1) $\mathsf{P}$ is closed under complement (swap accept and reject), so $L \in \mathsf{P}$ gives $\overline{L} \in \mathsf{P} \subseteq \mathsf{NP}$, i.e. $L \in \mathsf{coNP}$; and $L \in \mathsf{NP}$ by [[#thm-p-np-exp]]. (2) If $\mathsf{P} = \mathsf{NP}$ then $L \in \mathsf{NP} \Rightarrow L \in \mathsf{P} \Rightarrow \overline{L} \in \mathsf{P} = \mathsf{NP} \Rightarrow L \in \mathsf{coNP}$, and symmetrically $\mathsf{coNP} \subseteq \mathsf{NP}$. (3) is the contrapositive of (2).
:::

The converse of (2) is not known: $\mathsf{NP} = \mathsf{coNP}$ might hold even if $\mathsf{P} \ne \mathsf{NP}$. It is widely believed that $\mathsf{NP} \ne \mathsf{coNP}$, which would mean that some true statements, such as "this formula is a tautology", have no short proofs in *any* proof system that can be checked efficiently — a question studied in proof complexity.

### Problems in NP ∩ coNP

A problem in $\mathsf{NP} \cap \mathsf{coNP}$ has short certificates for both answers. Jack Edmonds called such a problem one with a **good characterisation**, and in many historical cases a good characterisation came first and a polynomial-time algorithm later: linear programming (duality gives both certificates), and primality.

::: theorem Primality has short certificates {#thm-pratt}
$\mathit{PRIMES} \in \mathsf{NP} \cap \mathsf{coNP}$.
:::

::: proof
$\mathit{PRIMES} \in \mathsf{coNP}$ because a factor of a composite number is a certificate. For $\mathit{PRIMES} \in \mathsf{NP}$ we use a fact from number theory: an integer $p \ge 3$ is prime iff there is $g$ with $g^{p-1} \equiv 1 \pmod p$ and $g^{(p-1)/q} \not\equiv 1 \pmod p$ for every prime $q$ dividing $p - 1$.

*Why the fact holds.* The two conditions say exactly that $g$ has order $p - 1$ in the multiplicative group of units modulo $p$: the order divides $p - 1$ by the first, and is not a proper divisor of it by the second (a proper divisor of $p - 1$ divides $(p-1)/q$ for some prime $q$). If $p$ is prime, a **primitive root** of order $p - 1$ exists ([Maths Atlas: number theory](/learn/maths/lesson.php?c=number-theory&l=primitive-roots)). Conversely, if $g$ has order $p - 1$, then $1, g, \dots, g^{p-2}$ are $p - 1$ distinct units modulo $p$, so every one of $1, \dots, p - 1$ is coprime to $p$, and $p$ is prime.

*The certificate* for $p$ (Pratt, 1975) is: $g$; the prime factorisation $p - 1 = q_1^{e_1} \cdots q_r^{e_r}$; and, recursively, a certificate for each odd $q_i$ (for $q = 2$ nothing). The verifier checks that the factorisation multiplies out to $p - 1$, checks the conditions on $g$ by fast modular exponentiation ($O(\log p)$ multiplications modulo $p$ each), and checks the sub-certificates.

*Size.* Let $N(p)$ be the number of primes appearing in the certificate tree, with $N(2) = 1$ and $N(p) \le 2 + \sum_i N(q_i)$ over the odd prime factors $q_i$ of $p - 1$. We show $N(p) \le 3\log_2 p - 1$ for odd primes $p$ by induction. If $p - 1$ is a power of $2$, $N(p) = 2 \le 3\log_2 3 - 1$. Otherwise $p - 1 = 2^{a}\prod q_i^{e_i}$ with $a \ge 1$ and at least one odd $q_i$, so $\prod_i q_i \le (p-1)/2$ and

$$
N(p) \le 2 + \sum_i (3\log_2 q_i - 1) \le 2 + 3\log_2\tfrac{p-1}{2} - 1 < 3\log_2 p - 2.
$$

Each node carries $O(\log p)$ numbers of $O(\log p)$ bits (there are at most $\log_2 p$ prime factors), and the checks at a node take time polynomial in $\log p$. So the whole certificate has length polynomial in the input length $\log p$ and is verified in polynomial time.
:::

::: example A certificate that 97 is prime {#ex-pratt}
Write down and check a Pratt certificate for $97$.
::: solution
$96 = 2^5 \cdot 3$, and $g = 5$ works: $5^{96} \equiv 1$, $5^{96/2} = 5^{48} \equiv 96 \equiv -1$ and $5^{96/3} = 5^{32} \equiv 35 \pmod{97}$, neither of them $1$. (Python: `pow(5, 48, 97)` gives `96`, `pow(5, 32, 97)` gives `35`.) For the factor $3$: $3 - 1 = 2$, and $g = 2$ has $2^2 = 4 \equiv 1$ and $2^1 = 2 \not\equiv 1 \pmod 3$. The prime $2$ needs nothing. The certificate tree has nodes $97, 2, 3, 2$: four primes, well within the bound $3\log_2 97 - 1 \approx 18.8$.
:::
:::

Since 2002 we know more: $\mathit{PRIMES} \in \mathsf{P}$ (Agrawal–Kayal–Saxena). As of 2026, the decision version of **factoring** — given $N$ and $k$, does $N$ have a prime factor at most $k$? — is in $\mathsf{NP} \cap \mathsf{coNP}$ ([[#ex-factor-np-conp]]) but not known to be in $\mathsf{P}$. This is one reason factoring is not expected to be $\mathsf{NP}$-complete: an $\mathsf{NP}$-complete problem in $\mathsf{coNP}$ would force $\mathsf{NP} = \mathsf{coNP}$.

::: widget venn
sets: 2
expr: A & B
labels: NP; coNP
caption: The believed picture. The overlap $\mathsf{NP} \cap \mathsf{coNP}$ (shaded) contains $\mathsf{P}$, and also problems such as factoring (decision version) that are not known to be in $\mathsf{P}$. $\mathit{SAT}$ lies in $\mathsf{NP}$ outside the overlap and $\mathit{TAUT}$ in $\mathsf{coNP}$ outside it — unless $\mathsf{NP} = \mathsf{coNP}$, in which case the two circles coincide. Try the expression `A | B` for $\mathsf{NP} \cup \mathsf{coNP}$, and `A - B` for the problems that would witness $\mathsf{NP} \ne \mathsf{coNP}$.
:::

::: quiz
Which of these languages are known to be in $\mathsf{coNP}$?
- [x] $\mathit{TAUT}$, the Boolean formulas true under every assignment.
- [x] $\mathit{PATH}$ (reachability in a directed graph).
- [x] $\{\langle G, k\rangle : G \text{ has no } k\text{-clique}\}$.
- [ ] $\mathit{HAMPATH}$.
::: solution
$\mathit{TAUT}$: a falsifying assignment certifies non-membership. $\mathit{PATH} \in \mathsf{P} \subseteq \mathsf{coNP}$. "No $k$-clique" is the complement of $\mathit{CLIQUE} \in \mathsf{NP}$, so it is in $\mathsf{coNP}$ by definition. $\mathit{HAMPATH}$ is in $\mathsf{NP}$; it is in $\mathsf{coNP}$ only if $\mathsf{NP} = \mathsf{coNP}$, since it is $\mathsf{NP}$-complete ([[complexity/np-complete-problems]] and the argument of [[#ex-factor-np-conp]]).
:::
:::

There is a useful way to read the two classes as proof systems. A language is in $\mathsf{NP}$ if a prover can convince a polynomial-time checker that $w \in L$ by sending a short message; it is in $\mathsf{coNP}$ if a prover can do the same for $w \notin L$. In $\mathsf{P}$, no prover is needed at all. The central questions of the next chapters — is $\mathsf{P} = \mathsf{NP}$, is $\mathsf{NP} = \mathsf{coNP}$ — ask whether the prover's help ever makes a real difference. Later chapters let the prover and checker interact, flip coins or read only a few bits of the proof, and [[complexity/approximation-pcp]] shows that the last of these leads, surprisingly, to strong limits on approximation algorithms.

## The P versus NP question

$$
\mathsf{P} \overset{?}{=} \mathsf{NP}
$$

If $\mathsf{P} = \mathsf{NP}$, every problem whose solutions can be checked efficiently could be solved efficiently, and — by self-reducibility — the solutions could be *found* efficiently. Scheduling, routing, packing and protein-folding models with succinct certificates would become tractable; most of today's public-key cryptography, which relies on problems in $\mathsf{NP}$ being hard on average, would be broken in principle; and a proof of any theorem with a proof of reasonable length could be found about as fast as it can be checked. If $\mathsf{P} \ne \mathsf{NP}$, then for some problems exhaustive search cannot be avoided, in the sense that no algorithm solves all their instances in polynomial time.

As of 2026 the question is **open**. It is one of the seven Millennium Prize Problems announced by the Clay Mathematics Institute in 2000, each with a prize of one million US dollars. Most researchers believe that $\mathsf{P} \ne \mathsf{NP}$, for reasons that are not proofs: decades of failed attempts to find efficient algorithms for thousands of $\mathsf{NP}$-complete problems, any one of which would suffice ([[complexity/np-completeness]]); the success of cryptography; and the analogy with mathematics, where checking a proof is so much easier than finding one. [[complexity/hierarchies]] explains why standard proof techniques cannot settle the question.

::: warning NP does not mean "not polynomial"
$\mathsf{NP}$ is *nondeterministic* polynomial time, and it contains $\mathsf{P}$: sorting, shortest paths and every other polynomial-time problem are in $\mathsf{NP}$. Saying "this problem is NP, so it needs exponential time" is wrong twice: membership in $\mathsf{NP}$ is an *upper* bound on difficulty (solutions can be checked quickly), and no problem in $\mathsf{NP}$ has been proved to need more than polynomial time. The statement people usually mean is "this problem is $\mathsf{NP}$-hard, so a polynomial-time algorithm for it would prove $\mathsf{P} = \mathsf{NP}$" — see [[complexity/np-completeness]]. Note also that $\mathsf{NP}$ consists of *decision* problems; "the travelling salesman problem is in NP" refers to its yes/no version ("is there a tour of length at most $B$?").
:::

::: history
In a letter of 20 March 1956 Kurt Gödel asked John von Neumann how many steps a machine would need to decide whether a formula has a proof of length $n$ — linear or quadratic in $n$, or necessarily exponential — and noted that a positive answer would have "consequences of the greatest importance"; the letter was rediscovered in the late 1980s. Jack Edmonds (1965) distinguished problems with a "good characterisation" (in modern terms $\mathsf{NP} \cap \mathsf{coNP}$) from those with a good algorithm. The class $\mathsf{NP}$ and the $\mathsf{P}$ versus $\mathsf{NP}$ question were formulated by Stephen Cook in "The complexity of theorem-proving procedures" (1971) and, independently, by Leonid Levin in the Soviet Union (published 1973); the name $\mathsf{NP}$ became standard after Richard Karp's paper of 1972. Vaughan Pratt published his primality certificates in "Every prime has a succinct certificate" (*SIAM Journal on Computing*, 1975). The Clay Mathematics Institute listed $\mathsf{P}$ versus $\mathsf{NP}$ among its Millennium Prize Problems in 2000.
:::

## Where this leads

To argue that a particular problem is unlikely to be in $\mathsf{P}$ we need a way to compare problems. [[complexity/np-completeness]] introduces polynomial-time reductions and proves the Cook–Levin theorem: $\mathit{SAT}$ is as hard as every problem in $\mathsf{NP}$. [[complexity/np-complete-problems]] shows that $\mathit{CLIQUE}$, $\mathit{HAMPATH}$, $\mathit{SUBSET\text{-}SUM}$ and many others are equally hard. Quantifiers will return in [[complexity/hierarchies]]: $\mathsf{NP}$ is defined by one "there exists" over certificates and $\mathsf{coNP}$ by one "for all", and alternating them gives the polynomial hierarchy.

::: summary
- A **verifier** accepts $\langle w, c\rangle$ for some certificate $c$ iff $w \in L$ ([[#def-verifier]]); $\mathsf{NP}$ is the class of languages with polynomial-time verifiers ([[#def-np]]). Certificates then have polynomial length.
- $\mathsf{NP} = \bigcup_k \mathsf{NTIME}(n^k)$: guessing a certificate and checking it is the same as nondeterministic polynomial time ([[#thm-np-ntm]]).
- $\mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{EXP}$ ([[#thm-p-np-exp]]); brute force over certificates takes exponential time.
- For $\mathit{SAT}$, finding a solution reduces to deciding satisfiability with $n$ queries (**self-reducibility**, [[#thm-self-reduction]]).
- $\mathsf{coNP}$ has short certificates for "no" answers ([[#def-conp]]); $\mathsf{P} \subseteq \mathsf{NP} \cap \mathsf{coNP}$, and $\mathsf{P} = \mathsf{NP}$ would imply $\mathsf{NP} = \mathsf{coNP}$ ([[#thm-conp]]). $\mathit{PRIMES}$ is in $\mathsf{NP} \cap \mathsf{coNP}$ by Pratt certificates ([[#thm-pratt]]), and in fact in $\mathsf{P}$.
- Whether $\mathsf{P} = \mathsf{NP}$ is open as of 2026; it is widely believed that $\mathsf{P} \ne \mathsf{NP}$ and $\mathsf{NP} \ne \mathsf{coNP}$.
:::

## Exercises

::: exercise Which certificates are short? {level=1}
For each language, give a short certificate and a polynomial-time check, or explain why the obvious certificate is not short: (a) $\{\langle G\rangle : G$ is $3$-colourable$\}$; (b) $\{\langle G\rangle : G$ is *not* $3$-colourable$\}$; (c) $\{\langle G, k\rangle : G$ has a vertex cover of size at most $k\}$; (d) $\{\langle a_1, \dots, a_m\rangle :$ the $a_i$ can be split into two groups of equal sum$\}$.
::: solution
(a) A colouring $c\colon V \to \{1, 2, 3\}$; check $c(u) \ne c(v)$ for every edge: $O(m)$. In $\mathsf{NP}$.
(b) The obvious certificate — "every one of the $3^n$ colourings fails" — has exponential length. The problem is in $\mathsf{coNP}$; it is not known (and not believed) to be in $\mathsf{NP}$.
(c) A set $C$ of at most $k$ vertices; check that every edge has an endpoint in $C$. In $\mathsf{NP}$.
(d) The set of indices in the first group; add both sums and compare. In $\mathsf{NP}$ ($\mathit{PARTITION}$; it is $\mathsf{NP}$-complete).
:::
:::

::: exercise Counting candidate certificates {level=1 check="20"}
How many candidate certificates does a brute-force algorithm for $\mathit{CLIQUE}$ examine on a graph with $6$ vertices and $k = 3$, if it tries every set of $3$ vertices? (Enter the number.)
::: solution
$\binom{6}{3} = \frac{6 \cdot 5 \cdot 4}{3!} = 20$. (For the graph of [[#ex-clique-branches]], $3$ of them are triangles.)
:::
:::

::: exercise Checking a route {level=1}
In the directed graph with edges $s \to a$, $s \to b$, $a \to b$, $b \to a$, $a \to t$, $b \to t$, which of the sequences $s, a, b, t$; $s, b, a, t$; $s, a, t$; $s, b, t, a$ are Hamiltonian paths from $s$ to $t$?
::: solution
$s, a, b, t$: edges $s \to a$, $a \to b$, $b \to t$ exist, all four vertices once, ends at $t$ — yes. $s, b, a, t$: $s \to b$, $b \to a$, $a \to t$ — yes. $s, a, t$ misses $b$ — no. $s, b, t, a$ does not end at $t$ and uses $t \to a$, which does not exist — no.
:::
:::

::: exercise Closure of NP {level=2}
Prove that $\mathsf{NP}$ is closed under union, intersection, concatenation and Kleene star. Why does the same approach not show that $\mathsf{NP}$ is closed under complement?
::: solution
Let $V_1, V_2$ be polynomial-time verifiers for $L_1, L_2$. *Union:* a certificate is a pair $(i, c)$ with $i \in \{1, 2\}$; accept iff $V_i$ accepts $\langle w, c\rangle$. *Intersection:* certificate $(c_1, c_2)$; accept iff both accept. *Concatenation:* certificate $(j, c_1, c_2)$; accept iff $V_1$ accepts $\langle w_1\cdots w_j, c_1\rangle$ and $V_2$ accepts $\langle w_{j+1}\cdots w_n, c_2\rangle$. *Star:* certificate: split points $0 = j_0 < j_1 < \dots < j_r = n$ and certificates $c_1, \dots, c_r$ for the pieces (accept $\varepsilon$ directly); since $r \le n$, the certificate has polynomial length and the checks take polynomial time. Each verifier is sound because it accepts only when genuine certificates exist for the parts. For complement we would need a certificate proving that *no* certificate exists for $w$ in $L_1$; switching "accept" and "reject" in $V_1$ gives a verifier that accepts $\langle w, c\rangle$ whenever *some* $c$ is bad, which is a different (and usually trivial) language.
:::
:::

::: exercise A primitive root modulo 23 {level=2 check="5"}
Find the smallest $g \ge 2$ that satisfies the conditions of [[#thm-pratt]] for $p = 23$, and complete a Pratt certificate for $23$. (Enter $g$.)
::: solution
$22 = 2 \cdot 11$, so $g$ must satisfy $g^{11} \not\equiv 1$ and $g^{2} \not\equiv 1 \pmod{23}$. $g = 2$: $2^{11} = 2048 = 89 \cdot 23 + 1 \equiv 1$, fails. $g = 3$: $3^{11} \equiv 1$ ($3$ is a square modulo $23$, since $7^2 = 49 \equiv 3$), fails. $g = 4 = 2^2$: a square, fails. $g = 5$: $5^{11} \equiv 22 \equiv -1$ and $5^2 = 25 \equiv 2$, so $g = 5$ works. For $11$: $10 = 2 \cdot 5$, and $g = 2$ works ($2^5 = 32 \equiv 10$, $2^2 = 4$). For $5$: $4 = 2^2$, and $g = 2$ works ($2^2 = 4 \not\equiv 1 \pmod 5$). So the certificate is $(23; 5; 2 \cdot 11)$, $(11; 2; 2 \cdot 5)$, $(5; 2; 2^2)$.
:::
:::

::: exercise Search for cliques {level=2}
Suppose a polynomial-time algorithm $D$ decides $\mathit{CLIQUE}$. Show how to *find* a $k$-clique in a graph that has one, using at most $n$ calls to $D$.
::: solution
Process the vertices $v_1, \dots, v_n$ in turn, maintaining a graph $H$ (initially $G$) that still has a $k$-clique. For each $v_i$, ask $D$ whether $H - v_i$ (delete $v_i$ and its edges) has a $k$-clique; if yes, set $H \gets H - v_i$; otherwise keep $v_i$. *Invariant:* $H$ has a $k$-clique. At the end, every remaining vertex $v$ is needed: removing it would destroy all $k$-cliques — but deleting it was tested when $H$ was larger, and a $k$-clique avoiding $v$ in the final $H$ would also have avoided $v$ then. So every $k$-clique of the final $H$ contains every vertex of $H$, i.e. $H$ itself is a $k$-clique. That is $n$ calls plus polynomial work.
:::
:::

::: exercise Factoring from a decision procedure {level=3}
Let $\mathit{FACTOR} = \{\langle N, k\rangle : N$ has a divisor $d$ with $2 \le d \le k\}$. Show that $\mathit{FACTOR} \in \mathsf{NP}$, and that if $\mathit{FACTOR} \in \mathsf{P}$ then the complete prime factorisation of $N$ can be computed in time polynomial in $\log N$. Implement the search in Python using a (slow) stand-in for the decider.
::: solution
*In $\mathsf{NP}$:* the certificate is $d$; check $2 \le d \le k$ and $d \mid N$.

*Search:* the smallest divisor $d \ge 2$ of $N$ is prime, and $\langle N, k\rangle \in \mathit{FACTOR}$ iff $k \ge d$. Binary search on $k \in [2, N]$ finds $d$ with $O(\log N)$ calls. Divide $N$ by $d$ and repeat; $N$ at least halves each time, so there are at most $\log_2 N$ rounds, for $O(\log^2 N)$ calls in all, each on numbers of $O(\log N)$ bits.

```python
def factor_oracle(N, k):              # stand-in: a real one would be fast
    return any(N % d == 0 for d in range(2, min(k, N) + 1))

def smallest_divisor(N):
    lo, hi = 2, N                     # N itself divides N, so the answer is in [lo, hi]
    while lo < hi:
        mid = (lo + hi) // 2
        if factor_oracle(N, mid): hi = mid
        else: lo = mid + 1
    return lo

def factorise(N):
    primes = []
    while N > 1:
        d = smallest_divisor(N); primes.append(d); N //= d
    return primes

print(factorise(2 * 3 * 3 * 101 * 9973))
```

```console
$ python3 factor.py
[2, 3, 3, 101, 9973]
```
:::
:::

::: exercise Factoring is in NP ∩ coNP {#ex-factor-np-conp level=3}
Show that $\mathit{FACTOR}$ from the previous exercise is in $\mathsf{coNP}$. Conclude that if $\mathit{FACTOR}$ were $\mathsf{NP}$-complete (every problem in $\mathsf{NP}$ reducible to it in polynomial time; see [[complexity/np-completeness]]), then $\mathsf{NP} = \mathsf{coNP}$.
::: solution
*Certificate for $\langle N, k\rangle \notin \mathit{FACTOR}$:* the prime factorisation $N = p_1 p_2 \cdots p_r$ (with repetition), together with a Pratt certificate for each $p_i$ ([[#thm-pratt]]). The verifier checks that the product is $N$, that each $p_i$ is prime (via its certificate, or now by the AKS algorithm), and that every $p_i > k$. Since $r \le \log_2 N$ and each Pratt certificate is polynomial in $\log N$, this is a polynomial-time check. Soundness: the smallest divisor $\ge 2$ of $N$ is a prime, which must be one of the $p_i$ by unique factorisation, so if all $p_i > k$ then $N$ has no divisor in $[2, k]$.

*Consequence:* suppose $\mathit{FACTOR}$ is $\mathsf{NP}$-complete and let $L \in \mathsf{NP}$, with $f$ a polynomial-time reduction from $L$ to $\mathit{FACTOR}$. Then $w \notin L$ iff $f(w) \notin \mathit{FACTOR}$, and the latter has a short certificate. So $\overline{L} \in \mathsf{NP}$, i.e. $L \in \mathsf{coNP}$. Hence $\mathsf{NP} \subseteq \mathsf{coNP}$, and taking complements, $\mathsf{coNP} \subseteq \mathsf{NP}$.
:::
:::
