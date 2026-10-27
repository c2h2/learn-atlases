Someone hands you three $1000 \times 1000$ matrices $A$, $B$, $C$ and claims that $AB = C$. Checking by multiplying costs about a billion multiplications. Here is a test that costs about three million: pick a random vector $r$ of zeros and ones and check whether $A(Br) = Cr$. If $AB = C$, the test always passes. If $AB \ne C$, it fails with probability at least $1/2$ — and twenty independent repetitions leave less than one chance in a million of being fooled. No deterministic method is known that is anywhere near as fast.

An algorithm that flips coins is **randomised**. Randomness buys simplicity and speed — randomised quicksort ([[algorithms/divide-and-conquer#thm-quicksort]]) is simpler than any deterministic $O(n\log n)$-guaranteed quicksort, and quickselect ([[algorithms/sorting-selection#thm-quickselect]]) is simpler and faster in practice than the median of medians. It also defeats adversaries: an input cannot be bad for an algorithm whose choices are not yet made. The price is that we must reason about probabilities, and be precise about what is random — the algorithm's coin flips, never the input. This chapter sets out the two kinds of randomised algorithm, the probabilistic tools used to analyse them, and three classic examples: verifying matrix products, **universal hashing**, and Karger's randomised **minimum cut**. Probability itself — sample spaces, expectation, independence — is in [Maths Atlas: probability](/learn/maths/lesson.php?c=probability&l=probability-spaces).

## Las Vegas and Monte Carlo

::: definition Las Vegas and Monte Carlo algorithms {#def-lv-mc}
A randomised algorithm makes random choices, and its behaviour on a fixed input $x$ is a random variable. It is

- **Las Vegas** if it always returns a correct answer, while its running time $T(x)$ is random; we bound the **expected running time** $\max_{\lvert x\rvert = n}\E[T(x)]$;
- **Monte Carlo** if its running time is bounded, while its answer may be wrong with some probability; we bound the **error probability** $\max_{\lvert x\rvert = n}\Prob[\text{wrong answer on } x]$.

A Monte Carlo algorithm for a yes/no problem has **one-sided error** if it can err only on one kind of input (say, it may say "yes" when the truth is "no", but never the reverse).
:::

Randomised quicksort and quickselect are Las Vegas: they always sort or select correctly, and only the time varies. The matrix test is Monte Carlo with one-sided error: "no" answers come with a witness and are always right.

The two kinds convert into each other. A Las Vegas algorithm with expected time $\E[T] \le t(n)$ becomes Monte Carlo by stopping it after $2t(n)$ steps and answering arbitrarily: by Markov's inequality ([[#thm-markov]]) it fails to finish with probability at most $1/2$. A Monte Carlo algorithm whose answers can be *checked* quickly becomes Las Vegas: repeat until the check succeeds.

### Amplification

Errors of Monte Carlo algorithms shrink exponentially with repetition. If a one-sided algorithm errs with probability at most $p < 1$ on each run, and runs use independent random choices, then $k$ runs all err with probability at most $p^k$ — so we answer "no" if any run does. For $p = 1/2$, $k = 20$ runs give error below $10^{-6}$, and $k = 64$ below $10^{-19}$, far less likely than a hardware fault. Two-sided errors can also be amplified, by majority vote, using the Chernoff bound below.

## Probabilistic tools

Most analyses use a handful of facts.

**Linearity of expectation.** $\E[X + Y] = \E[X] + \E[Y]$ for any random variables, *independent or not*. Combined with **indicator random variables** $I_A$ (equal to $1$ if event $A$ happens and $0$ otherwise, with $\E[I_A] = \Prob[A]$), it turns counting into summing probabilities: the expected number of events that happen is the sum of their probabilities. That was the proof of [[algorithms/divide-and-conquer#thm-quicksort]].

::: example Counting updates of a running maximum {#ex-records}
A program scans $n$ distinct keys in random order and updates `best` whenever it sees a key larger than all before it (the loop in the quiz of [[algorithms/correctness-recurrences]]). How many updates does it make in expectation? The answer matters when an update is expensive — writing to disk, or hiring a new candidate in the "hiring problem".
::: solution
Let $I_k$ indicate that the $k$-th key scanned is larger than the $k - 1$ before it. In a uniformly random order, each of the first $k$ keys is equally likely to be the largest of them, so $\E[I_k] = 1/k$. By linearity, the expected number of updates is $\sum_{k=1}^n 1/k = H_n \approx \ln n$ — although the indicators are not obviously independent, linearity does not care. An experiment:

```python
import random

def records(a):
    """How many times does the running maximum change while scanning a?"""
    best, count = float('-inf'), 0
    for x in a:
        if x > best:
            best, count = x, count + 1
    return count

random.seed(7)
n, trials = 1000, 2000
avg = sum(records(random.sample(range(n), n)) for _ in range(trials)) / trials
print(round(avg, 2), round(sum(1 / k for k in range(1, n + 1)), 2))
```

```console
$ python3 records.py
7.48 7.49
```

For $n = 1000$ the average over $2000$ random orders is $7.48$, against $H_{1000} \approx 7.49$. On a *sorted* input there are $n$ updates; shuffling the input first — making the order random by the algorithm's own choice — turns the average-case bound into an expected bound for every input.
:::
:::

**The union bound.** $\Prob[A_1 \cup \dots \cup A_k] \le \sum_i\Prob[A_i]$, again with no independence needed.

::: theorem Markov's inequality {#thm-markov}
If $X \ge 0$ is a random variable and $a > 0$, then $\Prob[X \ge a] \le \E[X]/a$.
:::

::: proof
Let $I$ be the indicator of $X \ge a$. Then $aI \le X$ always (if $I = 1$ then $X \ge a$; if $I = 0$ then $X \ge 0$). Taking expectations, $a\Prob[X \ge a] \le \E[X]$.
:::

**Independent trials.** If each attempt succeeds with probability $p$, independently, the number of attempts until the first success is **geometric**: $\Prob[N = k] = (1-p)^{k-1}p$, with $\E[N] = 1/p$, and $\Prob[N > k] = (1-p)^k \le e^{-pk}$, using $1 - x \le e^{-x}$.

::: widget distribution
dist: geometric
params: p=0.25
a: 1
b: 4
caption: The number of independent trials until the first success, each succeeding with probability $p$. Its mean is $1/p$, and the tail $\Prob[N > k] = (1-p)^k$ decays geometrically: with $p = 1/4$ the shaded probability of success within $4$ trials is $1 - (3/4)^4 \approx 0.68$. Move the slider for $p$ and watch the mean $1/p$; a Las Vegas algorithm that succeeds in each round with probability $p$ needs $1/p$ rounds on average and very rarely many more.
:::

**Chernoff bounds.** Sums of many independent indicators are sharply concentrated around their mean. One convenient form: if $X = X_1 + \dots + X_k$ with independent $X_i \in \{0, 1\}$ and $\mu = \E[X]$, then for $0 < \delta \le 1$,
$$
\Prob[X \ge (1 + \delta)\mu] \le e^{-\delta^2\mu/3}, \qquad \Prob[X \le (1 - \delta)\mu] \le e^{-\delta^2\mu/2}.
$$
We use these without proof (see [Maths Atlas: limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems) for the related law of large numbers). For example, a two-sided Monte Carlo algorithm that is right with probability $2/3$ and is run $k$ times independently errs by majority vote only if at most $k/2$ runs are right, while $\mu = 2k/3$; with $\delta = 1/4$, $(1 - \delta)\mu = k/2$, so the error is at most $e^{-k/48}$.

## Verifying matrix products

::: algorithm Freivalds' test {#alg-freivalds}
Given $n \times n$ matrices $A$, $B$, $C$: choose $r \in \{0, 1\}^n$ uniformly at random; compute $x = A(Br)$ and $y = Cr$ with three matrix–vector products; answer "$AB = C$" if $x = y$ and "$AB \ne C$" otherwise. Repeat $k$ times, answering "$AB = C$" only if every run does.
:::

::: theorem Freivalds' test {#thm-freivalds}
If $AB = C$, the test always answers "$AB = C$". If $AB \ne C$, a single run answers "$AB = C$" with probability at most $1/2$, so $k$ runs err with probability at most $2^{-k}$. Each run takes $\Theta(n^2)$ time.
:::

::: proof
If $AB = C$ then $A(Br) = (AB)r = Cr$ for every $r$. Suppose $D = AB - C \ne 0$; we must show $\Prob[Dr = 0] \le 1/2$. Pick an entry $d_{ij} \ne 0$. The $i$-th entry of $Dr$ is
$$
(Dr)_i = d_{ij}r_j + \sum_{l\ne j}d_{il}r_l = d_{ij}r_j + y,
$$
where $y$ depends only on the entries $r_l$ with $l \ne j$. Fix those entries arbitrarily (this is the **principle of deferred decisions**: we reveal $r_j$ last). Then $(Dr)_i = 0$ only if $d_{ij}r_j = -y$, and since $d_{ij} \ne 0$ at most one of the two values $r_j \in \{0, 1\}$ satisfies this. So, conditioned on any values of the other entries, $\Prob[(Dr)_i = 0] \le 1/2$, and therefore unconditionally $\Prob[Dr = 0] \le \Prob[(Dr)_i = 0] \le 1/2$. Independent runs multiply these probabilities. Each matrix–vector product takes $\Theta(n^2)$ time.
:::

```python
import random

def matmul(A, B):
    return [[sum(a * b for a, b in zip(row, col)) for col in zip(*B)] for row in A]

def matvec(A, x):
    return [sum(a * b for a, b in zip(row, x)) for row in A]

def freivalds(A, B, C, trials=20):
    """Monte Carlo test of AB = C: False is always right; True errs w.p. <= 2^-trials."""
    n = len(A)
    for _ in range(trials):
        r = [random.randint(0, 1) for _ in range(n)]
        if matvec(A, matvec(B, r)) != matvec(C, r):   # O(n^2) per trial
            return False                              # a witness: AB != C
    return True

random.seed(42)
n = 60
A = [[random.randint(-9, 9) for _ in range(n)] for _ in range(n)]
B = [[random.randint(-9, 9) for _ in range(n)] for _ in range(n)]
C = matmul(A, B)
print(freivalds(A, B, C))
C[17][42] += 1                                        # one wrong entry
print(freivalds(A, B, C))
```

```console
$ python3 freivalds.py
True
False
```

::: example How often one run is fooled {#ex-freivalds}
In the listing, after changing the single entry $C_{17,42}$, what is the exact probability that one run of the test is fooled?
::: solution
Now $D = AB - C$ has exactly one non-zero entry, $d_{17,42} = -1$. So $Dr = 0$ exactly when $r_{42} = 0$, which has probability exactly $1/2$: the bound of [[#thm-freivalds]] is tight. The probability that all $20$ runs are fooled is $2^{-20} \approx 9.5 \times 10^{-7}$. With more wrong entries the test usually does better: if row $i$ of $D$ has several non-zero entries, $(Dr)_i = 0$ needs a coincidence among several random bits.
:::
:::

The same idea — evaluate at a random point and see whether you get zero — tests whether a polynomial is identically zero. The **Schwartz–Zippel lemma** says that a non-zero polynomial of total degree $d$ in any number of variables vanishes at a point chosen uniformly from $S^k$ with probability at most $d/\lvert S\rvert$ ([[#ex-schwartz-zippel]]). No deterministic polynomial-time algorithm for this **polynomial identity testing** problem is known.

::: quiz
A Monte Carlo algorithm answers a yes/no question; when the true answer is "yes" it says "yes" with probability at least $0.1$, and when the true answer is "no" it always says "no". How many independent runs make the error probability at most $10^{-6}$, if we answer "yes" when any run says "yes"?

- [ ] $7$
- [ ] $60$
- [x] $132$
- [ ] $10^6$
::: solution
Errors happen only on "yes" inputs, when every run says "no", with probability at most $0.9^k$. We need $0.9^k \le 10^{-6}$, i.e. $k \ge 6\ln 10/(-\ln 0.9) = 13.8155/0.10536 \approx 131.1$, so $k = 132$. Even a weak one-sided test becomes reliable with modest repetition.
:::
:::

## Universal hashing

A hash table with chaining stores $n$ keys in $m$ buckets, putting key $k$ in the list of bucket $h(k)$ ([[data-structures/hash-tables]]). Its operations take time proportional to the length of a chain, and the usual claim "$O(1)$ expected time" is often justified by assuming the keys are random. But keys are not random: they are identifiers, addresses, words — and for *any* fixed hash function $h$ there is a set of keys that all hash to one bucket (by the pigeonhole principle, some bucket receives at least $\lvert U\rvert/m$ keys of the universe $U$). An adversary — or an unlucky data set — can turn the table into a linked list.

The remedy is to choose the hash function **at random** from a family, when the table is created. Then no fixed set of keys is bad, because the adversary does not know which function will be used.

::: definition Universal family {#def-universal}
A family $\mathcal H$ of functions from a universe $U$ to $\{0, 1, \dots, m-1\}$ is **universal** if for all distinct keys $k \ne l$ in $U$,
$$
\Prob_{h \in \mathcal H}[h(k) = h(l)] \le \frac1m,
$$
where $h$ is chosen uniformly from $\mathcal H$. That is, any two fixed keys collide no more often than they would under a truly random function.
:::

::: theorem Chains are short on average {#thm-universal-chain}
Let $h$ be chosen from a universal family, and store a set $K$ of $n$ keys in a table with chaining. For any key $k$, the expected number of keys of $K$ other than $k$ that land in $k$'s bucket is at most $n/m$. So the expected time to search for any key — present or absent — is $O(1 + \alpha)$ with load factor $\alpha = n/m$.
:::

::: proof
For each $l \in K$ with $l \ne k$, let $I_l$ indicate $h(l) = h(k)$; by universality $\E[I_l] \le 1/m$. The number of other keys in $k$'s bucket is $\sum_{l} I_l$, whose expectation by linearity is at most $(n - 1)/m$ if $k \in K$, or $n/m$ if not. A search computes $h(k)$ and scans the chain, which costs $O(1)$ plus the chain length.
:::

::: quiz
A hash table uses the fixed function $h(k) = k \bmod 1024$ for integer keys. Which statement is correct?

- [ ] Searches take $O(1)$ expected time for every set of keys, because $h$ spreads keys evenly.
- [x] Some sets of keys make every search take $\Theta(n)$ time; universal hashing removes the dependence on the key set.
- [ ] It is universal, since every bucket receives the same number of keys from $\{0, \dots, 1023\}$.
- [ ] Choosing $1024$ buckets, a power of two, makes collisions impossible.
::: solution
For any fixed $h$, a set of keys all congruent mod $1024$ — such as multiples of $1024$, common for aligned memory addresses — lands in one bucket. Spreading the *universe* evenly is not universality, which is a property of a random family and holds for every pair of keys. With $h$ drawn from a universal family, the expected chain length is $O(1 + \alpha)$ for every key set ([[#thm-universal-chain]]).
:::
:::

Note what is random here: the *choice of $h$*. The keys are arbitrary, even chosen by an adversary — as long as the adversary does not see $h$. Universal families exist and are easy to compute.

::: theorem The Carter–Wegman family {#thm-carter-wegman}
Let $p$ be a prime with every key in $\{0, 1, \dots, p-1\}$, and $m < p$. For $1 \le a \le p - 1$ and $0 \le b \le p - 1$ let
$$
h_{a,b}(k) = \big((ak + b) \bmod p\big) \bmod m.
$$
Then $\mathcal H_{p,m} = \{h_{a,b}\}$ is a universal family of $p(p-1)$ functions.
:::

::: proof
Fix keys $k \ne l$ and put $r = (ak + b) \bmod p$ and $s = (al + b) \bmod p$. First, $r \ne s$: their difference is $a(k - l) \bmod p$, a product of two numbers not divisible by the prime $p$, hence non-zero mod $p$. Second, the map $(a, b) \mapsto (r, s)$ is a bijection from the $p(p-1)$ pairs with $a \ne 0$ onto the $p(p-1)$ pairs with $r \ne s$: given $(r, s)$, the system has the unique solution $a = (r - s)(k - l)^{-1} \bmod p$ (non-zero) and $b = (r - ak) \bmod p$, since $k - l$ is invertible mod $p$ ([Maths Atlas: modular arithmetic](/learn/maths/lesson.php?c=number-theory&l=congruences)). So when $(a, b)$ is uniform, $(r, s)$ is uniform over pairs of distinct residues mod $p$.

The keys collide when $r \equiv s \pmod m$. For a fixed $r$, the values $s \ne r$ in $\{0, \dots, p-1\}$ with $s \equiv r \pmod m$ number at most $\lceil p/m\rceil - 1 \le (p + m - 1)/m - 1 = (p - 1)/m$. So
$$
\Prob[h_{a,b}(k) = h_{a,b}(l)] \le \frac{(p-1)/m}{p - 1} = \frac1m.
$$
:::

```python
import random

P = 2**31 - 1                                 # a prime larger than every key

def random_hash(m):
    """Draw h(k) = ((a k + b) mod P) mod m from the Carter-Wegman family."""
    a, b = random.randrange(1, P), random.randrange(0, P)
    return lambda k: ((a * k + b) % P) % m

random.seed(1)
m = 100
keys = [i * m for i in range(1000)]           # all congruent to 0 mod m
fixed = [k % m for k in keys]                 # the naive hash k mod m
print("k mod m: largest bucket", max(fixed.count(v) for v in set(fixed)))
h = random_hash(m)
loads = [0] * m
for k in keys:
    loads[h(k)] += 1
print("universal: largest bucket", max(loads), "average", sum(loads) / m)
```

```console
$ python3 uhash.py
k mod m: largest bucket 1000
universal: largest bucket 12 average 10.0
```

::: example Defeating a bad key set {#ex-universal}
Explain the output: why does `k mod m` put all $1000$ keys in one bucket, and what does [[#thm-universal-chain]] predict for the universal function?
::: solution
The keys $0, 100, 200, \dots$ are all multiples of $m = 100$, so `k % m` is $0$ for every one of them: a single chain of length $1000$, and every search costs $\Theta(n)$. Such patterns are common in real data (addresses aligned to multiples of a power of two, identifiers with a fixed suffix). With $h_{a,b}$ drawn at random, the expected number of other keys sharing a key's bucket is at most $999/100 \approx 10$, and indeed the average load is $10$ and the fullest bucket holds $12$ keys. A different seed gives a different $h$ and different loads, but the expectation bound holds for every key set, including this adversarial one.
:::
:::

::: warning Randomised hashing needs secret randomness
"Hash tables take $O(1)$ expected time" is true for universal hashing only if the random choice of $h$ is hidden from whoever chooses the keys. If an attacker can learn or guess $h$ — because it is fixed in the source code, or seeded predictably — they can send keys that all collide, and a server that stores request parameters in a hash table slows to a crawl (**hash flooding**, a denial-of-service attack publicised in 2011 against many web frameworks). The defence is a keyed hash function with a secret random seed per process: since Python 3.4, `str` and `bytes` hashing uses SipHash with a random key chosen at start-up (unless `PYTHONHASHSEED` fixes it). Note also that "expected $O(1)$" bounds the *average* over the choice of $h$, not the worst case: an individual operation can still be slow.
:::

Stronger guarantees come from stronger families. A **$k$-wise independent** family makes the hash values of any $k$ distinct keys independent and uniform; with $2$-wise independence one can bound the variance of chain lengths, and with $O(\log n)$-wise independence the longest chain is $O(\log n/\log\log n)$ with high probability. **Perfect hashing** (Fredman, Komlós and Szemerédi, 1984) uses two levels of universal hashing to store a static set with $O(1)$ *worst-case* lookups in $O(n)$ space.

## Karger's minimum cut

A **cut** of a connected undirected multigraph $G$ (parallel edges allowed) is a partition of its vertices into two non-empty sets; its **size** is the number of edges crossing it. The **global minimum cut** problem asks for a cut of smallest size — the fewest links whose failure disconnects a network. One could run a maximum-flow algorithm ([[algorithms/network-flow]]) from a fixed $s$ to every other vertex $t$, but Karger's algorithm is far simpler.

To **contract** an edge $\{u, v\}$ is to merge $u$ and $v$ into a single vertex, keeping all edges from $u$ or $v$ to other vertices (possibly creating parallel edges) and deleting the edges between $u$ and $v$, which would become self-loops. Each contraction reduces the number of vertices by one. A cut of the contracted graph corresponds to a cut of $G$ of the same size (each merged vertex stands for a set of original vertices), so contraction never creates new small cuts.

::: algorithm Karger's contraction algorithm {#alg-karger}
While the multigraph has more than two vertices, choose an edge uniformly at random from all remaining edges and contract it. When two vertices remain, return the cut between the two sets of original vertices they represent.
:::

::: theorem Karger's success probability {#thm-karger}
Let $C$ be a particular minimum cut of a connected multigraph with $n \ge 2$ vertices. The contraction algorithm returns $C$ with probability at least
$$
\frac{2}{n(n-1)} = \binom n2^{-1}.
$$
:::

::: proof
Let $c = \lvert C\rvert$ be the minimum cut size. Every vertex has degree at least $c$ — otherwise the edges at that vertex would form a smaller cut — so a multigraph with $k$ vertices has at least $kc/2$ edges. The algorithm returns $C$ if and only if it never contracts an edge of $C$: contracting an edge of $C$ puts two vertices from opposite sides together, while contracting other edges keeps the two sides of $C$ apart, and at the end the two remaining vertices are then exactly the two sides.

Let $E_i$ be the event that the $i$-th contraction avoids $C$. Before the $i$-th contraction, given $E_1, \dots, E_{i-1}$, the graph has $k = n - i + 1$ vertices, $C$ is still a cut of it of size $c$ — and still a minimum cut, since contraction creates no new cuts — so the graph has at least $kc/2$ edges, and
$$
\Prob[E_i \mid E_1 \cap \dots \cap E_{i-1}] \ge 1 - \frac{c}{kc/2} = 1 - \frac{2}{k} = \frac{k-2}{k}.
$$
Multiplying over the $n - 2$ contractions, $k = n, n-1, \dots, 3$,
$$
\Prob[\text{return } C] \ge \prod_{k=3}^{n}\frac{k - 2}{k} = \frac{1 \cdot 2 \cdot 3 \cdots (n-2)}{3 \cdot 4 \cdots n} = \frac{2}{n(n-1)}.
$$
:::

A success probability of $1/\binom n2$ looks hopeless, but amplification rescues it: run the algorithm $N = \binom n2\ln n$ times independently and keep the smallest cut found. All runs miss $C$ with probability at most
$$
\Big(1 - \binom n2^{-1}\Big)^{\binom n2\ln n} \le e^{-\ln n} = \frac1n.
$$
Each run can be implemented in $O(m\,\alpha(n))$ time as Kruskal's algorithm on a random order of the edges: contract edges in random order with union–find ([[algorithms/greedy-algorithms#lem-rank]]), skipping edges inside a component, until two components remain. (Contracting a uniformly random remaining edge is the same as taking the next edge of a random permutation that is not a self-loop.) The total is $O(n^2 m\log n\,\alpha(n))$ — polynomial and simple; Karger and Stein's recursive refinement (1996) brings it to $O(n^2\log^3 n)$.

```python
import random
from itertools import combinations

def find(parent, x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]        # path halving
        x = parent[x]
    return x

def contract(n, edges):
    """One run of Karger's algorithm on vertices 0..n-1; returns a cut size."""
    parent, components = list(range(n)), n
    order = edges[:]
    random.shuffle(order)                    # contract edges in random order
    for u, v in order:
        if components == 2:
            break
        ru, rv = find(parent, u), find(parent, v)
        if ru != rv:                         # skip edges that became self-loops
            parent[ru] = rv
            components -= 1
    return sum(1 for u, v in edges if find(parent, u) != find(parent, v))

# two 5-cliques joined by two edges: the minimum cut has size 2
edges = list(combinations(range(5), 2)) + list(combinations(range(5, 10), 2))
edges += [(0, 5), (1, 6)]
random.seed(2026)
runs = 10000
cuts = [contract(10, edges) for _ in range(runs)]
print(min(cuts), cuts.count(2) / runs, round(1 / 45, 4))
```

```console
$ python3 karger.py
2 0.2648 0.0222
```

::: example Karger on two cliques {#ex-karger}
Interpret the output, and compute how many runs give a $99\%$ chance of finding the minimum cut using only the guarantee of [[#thm-karger]].
::: solution
The graph has $n = 10$ vertices and $22$ edges; the minimum cut separates the two cliques and has size $2$ (every other cut cuts at least $4$ clique edges). In $10\,000$ runs, $26.5\%$ returned the minimum cut — far better than the guaranteed $1/\binom{10}{2} = 1/45 \approx 2.2\%$, because the bound assumed the worst case in which every vertex has degree exactly $c$, whereas here most edges lie inside the cliques and are unlikely to be the cut edges. Using only the guarantee, $N$ runs fail with probability at most $(44/45)^N$, which is at most $0.01$ when $N \ge \ln 100/(-\ln(44/45)) \approx 4.605/0.02247 \approx 205$ runs.
:::
:::

::: widget plot
f: (1 - 1/45)^x; exp(-x/45); (1 - 0.2648)^x
x: 0, 250
y: 0, 1
labels: \text{guaranteed bound } (1 - 1/45)^N; e^{-N/45}; \text{observed } (1 - 0.265)^N
points: 205,0.00998
caption: Probability that $N$ independent runs of Karger's algorithm all miss the minimum cut of the ten-vertex example. The guarantee $(1 - 1/\binom{n}{2})^N \le e^{-N/\binom n2}$ falls below $1\%$ at $N = 205$ (the dot); with the observed per-run success rate the failure probability vanishes after a couple of dozen runs. Amplification turns a weak but positive success probability into near-certainty.
:::

::: corollary The number of minimum cuts {#cor-min-cuts}
A connected graph with $n$ vertices has at most $\binom n2$ distinct minimum cuts.
:::

::: proof
The events "the algorithm returns $C$", for the different minimum cuts $C$, are disjoint (one run returns one cut), and each has probability at least $1/\binom n2$ by [[#thm-karger]]. Their probabilities sum to at most $1$, so there are at most $\binom n2$ of them. The bound is tight: a cycle on $n$ vertices has exactly $\binom n2$ minimum cuts (remove any two of its $n$ edges).
:::

A probabilistic argument has proved a deterministic fact — an instance of the **probabilistic method**.

::: history
Random sampling for computation goes back to the Monte Carlo method of Stanisław Ulam, John von Neumann and Nicholas Metropolis at Los Alamos (named in a 1949 paper by Metropolis and Ulam). Randomised *algorithms* took off in the 1970s: Robert Solovay and Volker Strassen (1977) and Michael Rabin (1980, building on Gary Miller's 1976 test) gave fast randomised primality tests, the basis of practical public-key cryptography; Rūsiņš Freivalds published his matrix-verification test in 1977; and Rabin's 1976 lecture "Probabilistic algorithms" set out the programme. Lawrence Carter and Mark Wegman introduced universal hashing in 1977 (journal version 1979). Jacob Schwartz (1980) and Richard Zippel (1979) proved the polynomial-identity lemma. David Karger's contraction algorithm appeared in 1993, and his recursive version with Clifford Stein in 1996. Whether randomness is ever *necessary* for efficient computation is open: the conjecture $\mathsf{P} = \mathsf{BPP}$ says it is not, and primality — once the flagship of randomised algorithms — was shown to be in $\mathsf{P}$ by Agrawal, Kayal and Saxena in 2002.
:::

## Where this leads

Randomised algorithms are everywhere in practice: hashing in every language runtime, randomised pivots in sorting libraries, primality tests in cryptography ([[cryptography]]), random sampling and sketching for big data, and randomised rounding in approximation algorithms. [[complexity]] studies the classes they define — $\mathsf{RP}$, $\mathsf{ZPP}$, $\mathsf{BPP}$ — and the evidence that randomness can be removed (derandomisation). Probabilistic analysis also underlies the average-case behaviour of deterministic algorithms, such as quicksort on random inputs, and the design of distributed protocols that break symmetry by coin flips ([[distributed-systems]]).

::: summary
- **Las Vegas** algorithms are always correct with random running time; **Monte Carlo** algorithms have bounded time and a small error probability ([[#def-lv-mc]]). The randomness is in the algorithm, never in the input.
- Tools: linearity of expectation with indicators, the union bound, **Markov's inequality** ([[#thm-markov]]), geometric waiting times, Chernoff bounds. Independent repetition drives a one-sided error $p$ down to $p^k$.
- **Freivalds' test** checks $AB = C$ in $O(n^2)$ time per run with one-sided error at most $1/2$ ([[#thm-freivalds]]).
- **Universal hashing**: choosing $h$ at random from a family with collision probability $\le 1/m$ gives expected chain length $\le 1 + \alpha$ for every key set ([[#thm-universal-chain]]); $((ak + b) \bmod p) \bmod m$ is universal ([[#thm-carter-wegman]]). The choice must stay secret.
- **Karger's algorithm** finds a given minimum cut with probability $\ge 1/\binom n2$ ([[#thm-karger]]); $\binom n2\ln n$ repetitions fail with probability $\le 1/n$. Hence there are at most $\binom n2$ minimum cuts ([[#cor-min-cuts]]).
:::

## Exercises

::: exercise Expected rounds {level=1 check="8"}
A Las Vegas algorithm repeats a round that costs $O(n)$ and succeeds with probability $1/8$, independently, until it succeeds. What is the expected number of rounds? (Enter the number.)
::: solution
The number of rounds is geometric with $p = 1/8$, so its expectation is $1/p = 8$. The expected running time is $O(8n) = O(n)$, and the probability of needing more than $k$ rounds is $(7/8)^k$.
:::
:::

::: exercise Markov's inequality {level=1 check="1/4"}
Randomised quicksort makes in expectation fewer than $2n\ln n$ comparisons. Use Markov's inequality to bound the probability that it makes at least $8n\ln n$. (Enter the bound.)
::: solution
With $X$ the number of comparisons, $\Prob[X \ge 8n\ln n] \le \E[X]/(8n\ln n) < 2n\ln n/(8n\ln n) = 1/4$. Markov's bound is weak — the true probability is tiny for large $n$ — but it needs nothing except non-negativity and the mean.
:::
:::

::: exercise Collisions among random hashes {level=2 check="4950/1000"}
$100$ keys are hashed with a function chosen from a universal family into $m = 1000$ buckets. Bound the expected number of colliding pairs. (Enter the bound.)
::: solution
There are $\binom{100}{2} = 4950$ pairs, each colliding with probability at most $1/1000$; by linearity of expectation the expected number of colliding pairs is at most $4950/1000 = 4.95$. This does not make collisions unlikely: by the birthday paradox, $100$ keys hashed by a truly random function into $1000$ buckets are all in different buckets with probability $\prod_{i=1}^{99}(1 - i/1000) \approx 0.006$, so some collision is almost certain. Universal hashing promises few collisions on average, not none.
:::
:::

::: exercise A universal family? {level=2}
Is the family $\{h_a(k) = ak \bmod m : 0 \le a < m\}$, for keys in $\{0, \dots, m-1\}$ with $m$ prime, universal? Is it universal when $m$ is a power of $2$?
::: solution
For prime $m$ and $k \ne l$, $h_a(k) = h_a(l)$ iff $a(k - l) \equiv 0 \pmod m$ iff $a = 0$ (since $k - l \not\equiv 0$ is invertible), which has probability $1/m$: universal. For $m = 2^r$ it is not: take $k = 0$ and $l = 2^{r-1}$; then $a l \bmod m$ is $0$ whenever $a$ is even, so they collide with probability $1/2 > 1/m$ (for $r \ge 2$).
:::
:::

::: exercise Schwartz–Zippel in one variable {#ex-schwartz-zippel level=2}
Prove the one-variable case of the Schwartz–Zippel lemma: a non-zero polynomial $q(x)$ of degree $d$ over a field, evaluated at $x$ chosen uniformly from a finite set $S$ of field elements, is zero with probability at most $d/\lvert S\rvert$. Use it to test whether two polynomials given as products of linear factors, $\prod_i(x - a_i)$ and $\prod_i(x - b_i)$, are equal, with error at most $1/100$.
::: solution
A non-zero polynomial of degree $d$ over a field has at most $d$ roots (each root $r$ splits off a factor $x - r$, by the division algorithm, lowering the degree). So at most $d$ elements of $S$ are roots, and $\Prob[q(x) = 0] \le d/\lvert S\rvert$. For the test, the difference $q = \prod(x - a_i) - \prod(x - b_i)$ has degree at most $d = n$ (the number of factors); pick $x$ from $S = \{0, 1, \dots, 100n - 1\}$ (working with exact integers or modulo a large prime), evaluate both products in $O(n)$ arithmetic operations, and declare them equal if the values agree. If the polynomials differ, the test is fooled with probability at most $n/(100n) = 1/100$; expanding the products instead would cost $\Theta(n^2)$.
:::
:::

::: exercise Karger on a cycle {level=2 check="1/6"}
On a cycle with $4$ vertices, what is the exact probability that one run of Karger's algorithm returns a *specific* minimum cut? Compare with the bound $1/\binom42$. (Enter the probability.)
::: solution
The cycle has $4$ edges, and its minimum cuts are the pairs of edges ($c = 2$): removing any two edges of a cycle splits it into two paths. A specific minimum cut $C$ survives the first contraction with probability $2/4$ (one of the two edges outside $C$ must be contracted). Contracting an edge of a $4$-cycle leaves a triangle, consisting of the two edges of $C$ and the remaining edge outside $C$; the second and last contraction must pick that edge, with probability $1/3$. So $C$ is returned with probability $\frac12 \cdot \frac13 = \frac16$ — exactly the bound $1/\binom42$. Since the cycle has $\binom42 = 6$ minimum cuts and every run returns one of them, each is returned with probability exactly $1/6$.
:::
:::

::: exercise Coupon collecting {level=3}
Hashing $n$ keys into $n$ buckets with a truly random function, how many keys must be inserted, in expectation, before every bucket is non-empty? Prove that the answer is $nH_n \approx n\ln n$.
::: solution
Split the process into phases: phase $i$ ($i = 1, \dots, n$) lasts while exactly $i - 1$ buckets are non-empty. In phase $i$ each new key lands in an empty bucket with probability $p_i = (n - i + 1)/n$, independently of the past, so the phase length is geometric with mean $n/(n - i + 1)$. By linearity of expectation the total is $\sum_{i=1}^n n/(n - i + 1) = n\sum_{j=1}^n 1/j = nH_n$, and $H_n = \ln n + O(1)$. So with $n$ keys in $n$ buckets, many buckets stay empty — about $n/e$ of them in expectation, since each is empty with probability $(1 - 1/n)^n \approx 1/e$.
:::
:::

::: exercise Las Vegas from Monte Carlo {level=3}
Suppose a Monte Carlo algorithm $\mathcal A$ for a search problem runs in time $T(n)$ and returns a correct solution with probability at least $p > 0$ (otherwise a wrong one), and a solution can be verified in time $V(n)$. Construct a Las Vegas algorithm and bound its expected running time. Then show that the converse needs no verifier: a Las Vegas algorithm with expected time $t(n)$ gives a Monte Carlo algorithm with time $2kt(n)$ and failure probability at most $2^{-k}$.
::: solution
*Las Vegas:* repeat: run $\mathcal A$, verify its output, stop if correct. Each round costs $T(n) + V(n)$ and succeeds with probability at least $p$, independently, so the number of rounds is dominated by a geometric variable with mean $1/p$, and the expected time is at most $(T(n) + V(n))/p$; the answer is always correct. *Monte Carlo:* run the Las Vegas algorithm for at most $2t(n)$ steps; by Markov's inequality it has not finished with probability at most $t(n)/(2t(n)) = 1/2$. Do this $k$ times with fresh randomness, returning the first answer produced (always correct); all $k$ attempts time out with probability at most $2^{-k}$, in total time $2kt(n)$. (Restarting is valid because each attempt's running time has expectation at most $t(n)$, whatever happened before.)
:::
:::
