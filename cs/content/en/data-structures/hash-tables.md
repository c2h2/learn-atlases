A compiler meets the name `total_price` and must find out, at once, what that name was declared to be. A web server receives a session token and must find the session it belongs to. A spelling checker must decide whether "recieve" is a word. Each of these is a lookup by **key** in a large collection, repeated millions of times. A sorted array with binary search answers in $O(\log n)$ time ([[data-structures/asymptotic-analysis#thm-binary-search]]) but is slow to update; a linked list is easy to update but takes $\Theta(n)$ to search. Can we do better than both?

If the keys were small integers, say $0$ to $999$, we could simply use an array of $1000$ slots and store the item with key $k$ in slot $k$: lookup, insertion and deletion would all take $O(1)$ time. **Hashing** extends this idea to keys of any kind — strings, tuples, large numbers — by computing from each key a small integer, its **hash value**, and using it as an array index. Different keys can produce the same index, so the art lies in choosing the function well and in dealing with the resulting **collisions**. When this is done well, every operation takes $O(1)$ time *on average* — and we will be precise about what "on average" means, because that phrase hides the most common misunderstanding about hash tables.

## The dictionary problem

::: definition Map (dictionary) {#def-map}
A **map** (also called a **dictionary** or **associative array**) stores a set of (key, value) pairs with distinct keys. Its operations are `put(k, v)` (associate $v$ with $k$, replacing any previous value), `get(k)` (the value associated with $k$, or an error if none), `delete(k)` and `contains(k)`. A **set** is the special case with keys only.
:::

Python's `dict` and `set` ([[programming-1/dictionaries-sets]]), Java's `HashMap` and `HashSet`, and C++'s `std::unordered_map` are hash tables implementing these ADTs. We write $U$ for the **universe** of possible keys, $n$ for the number of keys stored, and $m$ for the number of slots in the table.

A **direct-address table** is an array $T[0..\lvert U\rvert - 1]$ in which key $k$ lives in $T[k]$. It is perfect when $U$ is small, but useless when $U$ is the set of all strings, or of all 64-bit integers: the array would be astronomically large even though only a few thousand keys are ever stored. Hashing keeps an array of size $m$ proportional to $n$, not to $\lvert U\rvert$.

## Hash functions

::: definition Hash function and collision {#def-hash}
A **hash function** for a table of $m$ slots is a function $h\colon U \to \set{0, 1, \dots, m-1}$. Key $k$ **hashes to** slot $h(k)$, and $h(k)$ is its **hash value**. Two distinct keys $k \ne k'$ **collide** if $h(k) = h(k')$.
:::

If $\lvert U\rvert > m$, collisions are unavoidable by the pigeonhole principle: some slot receives at least $\lvert U \rvert / m$ keys of the universe. A good hash function makes them rare *for the keys that actually occur*. We want $h$ to be

- **deterministic** — the same key always hashes to the same slot, or we could never find it again;
- **fast** — $O(1)$ time for fixed-size keys, $O(\text{length})$ for strings;
- **spreading** — keys that occur in practice, including similar keys such as `x1`, `x2`, `x3`, should land in slots that look independent and uniformly distributed.

### Integers: the division and multiplication methods

The **division method** takes $h(k) = k \bmod m$. It is fast but sensitive to $m$. If $m = 2^p$, then $k \bmod m$ is just the low $p$ bits of $k$, and keys that differ only in their high bits — memory addresses aligned to multiples of $16$, for instance — all collide. A prime $m$ not close to a power of $2$ is a common choice.

The **multiplication method** fixes $m = 2^p$ (convenient for doubling the table) and a constant $0 < A < 1$, and takes $h(k) = \lfloor m \cdot (kA \bmod 1)\rfloor$: the first $p$ bits of the fractional part of $kA$. With $w$-bit words it is computed by one multiplication and a shift: take $s = \lfloor A\cdot 2^w\rfloor$, multiply $k\cdot s$ modulo $2^w$, and keep the top $p$ bits. Knuth suggested $A \approx (\sqrt5 - 1)/2 \approx 0.618$. Every bit of $k$ influences the high bits of the product, so the low-bit problem of the division method disappears.

### Strings: polynomial hashing

A string $s = c_0 c_1 \dots c_{\ell-1}$ is turned into a number by treating its character codes as the digits of a number in some base $B$:

$$
h(s) = \bigl(c_0 B^{\ell - 1} + c_1 B^{\ell - 2} + \dots + c_{\ell-1}\bigr) \bmod m,
$$ {#eq-poly-hash}

computed by Horner's rule with a reduction modulo $m$ after each step, so the numbers stay small:

```python
def string_hash(s, base=31, m=101):
    h = 0
    for ch in s:
        h = (h * base + ord(ch)) % m    # Horner's rule, reducing as we go
    return h

for w in ["cat", "act", "tac", "dog"]:
    print(w, string_hash(w))
```

```console
$ python3 strhash.py
cat 90
act 48
tac 48
dog 58
```

The hash depends on the *order* of the characters — `cat` and `act` differ — unlike the tempting but terrible "sum of the character codes", which sends every anagram to the same slot. Even so, `act` and `tac` collide here: with only $101$ slots, collisions among a handful of keys are expected, as the next section shows.

::: example Computing a polynomial hash by hand {#ex-poly-hash}
Compute `string_hash("cat")` with base $31$ and $m = 101$. The codes are `c` $= 99$, `a` $= 97$, `t` $= 116$.
::: solution
Horner's rule, reducing modulo $101$ at each step:

| step | computation | $h$ |
|---|---|---|
| start | | $0$ |
| `c` | $(0\cdot 31 + 99) \bmod 101$ | $99$ |
| `a` | $(99 \cdot 31 + 97) \bmod 101 = 3166 \bmod 101$ | $35$ |
| `t` | $(35 \cdot 31 + 116) \bmod 101 = 1201 \bmod 101$ | $90$ |

So $h(\texttt{cat}) = 90$, as the program printed. Reducing at each step gives the same result as computing $99\cdot31^2 + 97\cdot 31 + 116 = 98\,262$ and reducing once ($98\,262 = 972 \cdot 101 + 90$), because $(a \bmod m)\cdot B + c \equiv aB + c \pmod m$ — see [Maths Atlas: modular arithmetic](/learn/maths/lesson.php?c=number-theory&l=congruences).
:::
:::

### Python's `hash`

Python separates the two jobs. The built-in `hash(x)` maps an object to a 64-bit integer; the table then reduces it to a slot. For integers, `hash(n)` is $n$ reduced modulo the prime $2^{61} - 1$ on 64-bit builds (with the quirk that `hash(-1)` is $-2$, because $-1$ signals an error in CPython's C code). For strings and bytes, since Python 3.4 `hash` uses the keyed function SipHash with a key chosen randomly at start-up, so `hash("cat")` differs from one run of Python to the next (unless the environment variable `PYTHONHASHSEED` fixes it). The reason is security, discussed in [[#sec-worst-case]]. Only immutable objects are hashable by default: a `list` cannot be a dictionary key, because changing it after insertion would change its hash and strand it in the wrong slot.

## Collisions are inevitable: the birthday problem

How many keys can we insert before the first collision? Suppose, as an idealisation, that each key's hash value is independent and uniformly distributed over the $m$ slots.

::: proposition Birthday bound {#prop-birthday}
If $n$ keys are hashed independently and uniformly into $m$ slots, the expected number of colliding pairs is $\binom{n}{2}/m = n(n-1)/(2m)$, and the probability that there is no collision at all is

$$
\prod_{i=0}^{n-1}\Bigl(1 - \frac{i}{m}\Bigr) \;\le\; e^{-n(n-1)/(2m)}.
$$
:::

::: proof
For each pair of keys $i < j$ let $X_{ij}$ be $1$ if they collide and $0$ otherwise. Whatever slot key $i$ lands in, key $j$ lands in the same one with probability $1/m$, so $\E[X_{ij}] = 1/m$. By linearity of expectation (which needs no independence between the $X_{ij}$), the expected number of colliding pairs is $\sum_{i<j}\E[X_{ij}] = \binom n2 / m$.

For no collision, key $i+1$ must avoid the $i$ slots already used, which happens with probability $1 - i/m$ independently of what came before; multiplying gives the product. Since $1 - x \le e^{-x}$ for all real $x$, the product is at most $\exp(-\sum_{i<n} i/m) = e^{-n(n-1)/(2m)}$.
:::

With $m = 365$ "slots" and $n = 23$ people, the expected number of pairs sharing a birthday is $23\cdot22/730 \approx 0.69$, and the probability of no shared birthday is $0.493$: more likely than not, two of the 23 share a birthday. In hashing terms, collisions become likely once $n$ is around $\sqrt m$ — with a million slots, after only about a thousand keys. So collision handling is not an exceptional case; it is the normal operation of every hash table. (Probability background: [Maths Atlas: expectation](/learn/maths/lesson.php?c=probability&l=expectation).)

## Separate chaining

The simplest way to handle collisions is to let each slot hold a list of all the keys that hash to it.

::: definition Hash table with separate chaining {#def-chaining}
A **hash table with separate chaining** is an array $T[0..m-1]$ of **buckets**, each a list (often a linked list) of (key, value) pairs. Key $k$ is stored in bucket $T[h(k)]$. `get(k)` and `delete(k)` search bucket $T[h(k)]$ for $k$; `put(k, v)` replaces the value if $k$ is found there and otherwise adds $(k, v)$ to the bucket. The **load factor** is $\alpha = n/m$, the average number of keys per bucket.
:::

::: example Inserting into a chained table {#ex-chaining}
Insert the keys $50, 700, 76, 85, 92, 73, 101$ into a chained table with $m = 7$ and $h(k) = k \bmod 7$, appending to the end of each chain. Which buckets are used, and how many key comparisons does a successful search for each key make?
::: solution
The hash values are $50 \bmod 7 = 1$, $700 \bmod 7 = 0$, $76 \bmod 7 = 6$, $85 \bmod 7 = 1$, $92 \bmod 7 = 1$, $73 \bmod 7 = 3$, $101 \bmod 7 = 3$. The table is

| bucket | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| chain | 700 | 50 → 85 → 92 | | 73 → 101 | | | 76 |

Searching for a key compares it with every key before it in its chain and then with itself: $50, 700, 73, 76$ need $1$ comparison, $85$ and $101$ need $2$, and $92$ needs $3$. The average is $(1+1+1+2+3+1+2)/7 = 11/7 \approx 1.57$. The load factor is $\alpha = 7/7 = 1$; the formula of [[#thm-chaining]] predicts $1 + \alpha/2 - \alpha/(2n) = 1 + 0.5 - 1/14 \approx 1.43$ for random hash values — these keys were not random, and three landed in one bucket. An unsuccessful search for, say, $8$ (bucket 1) makes $3$ comparisons.
:::
:::

Here is a complete chained map in Python, using Python lists as buckets and growing the table when the load factor exceeds $1$:

```python
class ChainedHashMap:
    """Map with separate chaining; doubles the table when the load factor exceeds 1."""
    def __init__(self, m=8):
        self.table = [[] for _ in range(m)]   # each bucket: a list of (key, value)
        self.n = 0

    def _bucket(self, key):
        return self.table[hash(key) % len(self.table)]

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        raise KeyError(key)

    def put(self, key, value):
        bucket = self._bucket(key)
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)       # replace an existing key
                return
        bucket.append((key, value))
        self.n += 1
        if self.n > len(self.table):           # load factor above 1: grow
            self._resize(2 * len(self.table))

    def delete(self, key):
        bucket = self._bucket(key)
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = bucket[-1]         # order in a bucket is irrelevant
                bucket.pop()
                self.n -= 1
                return
        raise KeyError(key)

    def _resize(self, m):
        old = self.table
        self.table = [[] for _ in range(m)]
        for bucket in old:                     # rehash: positions depend on m
            for k, v in bucket:
                self._bucket(k).append((k, v))
```

```python
d = ChainedHashMap()
for i, word in enumerate("the quick brown fox jumps over the lazy dog".split()):
    d.put(word, i)
print(d.n, len(d.table), d.get("the"), d.get("dog"))
d.delete("fox")
print(d.n, sum(len(b) for b in d.table))
```

```console
$ python3 chained.py
8 8 6 8
7 7
```

The second `put("the", 6)` replaced the value of the first, so there are $8$ distinct keys; the load factor reached exactly $1$ without exceeding it, so no resize happened. (Which bucket each word lands in changes from run to run, because Python randomises string hashes; the printed results do not depend on it.)

### The cost of chaining

The cost of `get(k)` is $O(1)$ to compute $h(k)$ plus the number of keys in bucket $h(k)$ that are examined. In the worst case all $n$ keys hash to the same bucket and a search takes $\Theta(n)$ — no better than a linked list. To say anything better we need an assumption about how keys spread out.

::: definition Simple uniform hashing {#def-suha}
The **simple uniform hashing assumption** is that each key is equally likely to hash to any of the $m$ slots, independently of where the other keys hash.
:::

This is a statement about the keys and the hash function together, and no fixed hash function satisfies it for all inputs: whatever $h$ is, some $n$ keys of a large universe share a slot. It is a model of "typical" inputs. Under it, the length of a particular bucket is a sum of $n$ independent indicators with probability $1/m$ each — binomial with mean $\alpha$, and close to a Poisson distribution with mean $\alpha$ when $m$ is large.

::: widget distribution
dist: poisson
params: lambda=1
a: 0
b: 2
caption: Under simple uniform hashing the number of keys in a given bucket is approximately Poisson with mean $\lambda = \alpha$. At load factor $1$, about $37\%$ of buckets are empty, $37\%$ hold one key and only $8\%$ hold three or more; the shaded part is the chance a bucket holds at most two keys. Move $\lambda$ to see how chains lengthen as the table fills.
:::

A quick simulation agrees. It throws $100\,000$ keys at random into $100\,000$ buckets and compares the fraction of buckets of each length with the Poisson probabilities $e^{-1}/k!$:

```python
import random
from collections import Counter
from math import exp, factorial

random.seed(1)
m = n = 100_000                       # load factor 1
lengths = Counter()
counts = [0] * m
for _ in range(n):
    counts[random.randrange(m)] += 1  # a random bucket for each key
for c in counts:
    lengths[c] += 1
for k in range(7):                    # observed fraction vs Poisson(1)
    print(k, f"{lengths[k] / m:.4f}", f"{exp(-1) / factorial(k):.4f}")
print("longest chain:", max(counts))
```

```console
$ python3 chains.py
0 0.3668 0.3679
1 0.3695 0.3679
2 0.1837 0.1839
3 0.0612 0.0613
4 0.0154 0.0153
5 0.0030 0.0031
6 0.0005 0.0005
longest chain: 7
```

The frequencies match to about three decimal places. The longest chain, $7$, is much longer than the average of $1$: the expected *maximum* chain length grows like $\ln n/\ln\ln n$, a reminder that "expected $O(1)$ per operation" is not "every chain is short".

::: theorem Expected cost of chaining {#thm-chaining}
Under simple uniform hashing, in a chained table with load factor $\alpha = n/m$:

1. an unsuccessful search examines $\alpha$ keys on average, so it takes $\Theta(1 + \alpha)$ expected time;
2. a successful search for a key chosen uniformly from the $n$ stored keys, where each new key was appended to the end of its chain, examines $1 + \dfrac{\alpha}{2} - \dfrac{\alpha}{2n}$ keys on average, also $\Theta(1 + \alpha)$.

In particular, if $m$ is kept proportional to $n$, so that $\alpha = O(1)$, every operation takes $O(1)$ expected time.
:::

::: proof
(1) An unsuccessful search for $k$ examines every key in bucket $h(k)$. For each stored key $x$, the probability that $x$ is in that bucket is $1/m$, so by linearity the expected number of keys examined is $n/m = \alpha$. Adding the $O(1)$ cost of computing $h(k)$ gives $\Theta(1 + \alpha)$.

(2) Number the stored keys $x_1, \dots, x_n$ in order of insertion. A search for $x_i$ examines $x_i$ itself and the keys before it in its chain, which are exactly the keys $x_j$ with $j < i$ and $h(x_j) = h(x_i)$. Each such $j$ contributes with probability $1/m$, so the expected number examined is $1 + (i-1)/m$. Averaging over $i$,

$$
\frac1n \sum_{i=1}^{n}\Bigl(1 + \frac{i-1}{m}\Bigr) = 1 + \frac{1}{nm}\cdot\frac{n(n-1)}{2} = 1 + \frac{n-1}{2m} = 1 + \frac{\alpha}{2} - \frac{\alpha}{2n}. \qquad\blacksquare
$$
:::

### Resizing

The theorem requires $\alpha = O(1)$, so the table must grow with $n$. When $\alpha$ exceeds a threshold (say $1$ for chaining), allocate a table of twice the size and **rehash**: reinsert every key, because $h(k) = \operatorname{hash}(k) \bmod m$ changes with $m$. A rehash costs $\Theta(n)$, but by the doubling argument of [[data-structures/arrays-lists#thm-doubling]] the total cost of rehashes over $n$ insertions is $O(n)$, so insertion remains $O(1)$ — now *expected amortised*: expected over the hashing, amortised over the sequence.

## Universal hashing

Simple uniform hashing is an assumption about the input. An adversary who knows $h$ can violate it on purpose by choosing keys that collide. The answer, due to Carter and Wegman, moves the randomness from the input to the algorithm: choose the hash function itself at random, when the table is created, from a suitable family.

::: definition Universal family {#def-universal}
A family $\mathcal H$ of hash functions $U \to \set{0, \dots, m-1}$ is **universal** if for every pair of distinct keys $x \ne y$,

$$
\Prob_{h \in \mathcal H}\bigl[h(x) = h(y)\bigr] \le \frac1m,
$$

where $h$ is drawn uniformly at random from $\mathcal H$.
:::

The probability is over the choice of $h$ only; the keys are arbitrary, even chosen by an adversary — as long as the adversary chooses them without knowing which $h$ was drawn.

::: theorem Chaining with universal hashing {#thm-universal}
Let $h$ be drawn from a universal family, and let a chained table hold any fixed set of $n$ keys. For any key $k$, the expected number of stored keys other than $k$ in bucket $h(k)$ is at most $\alpha$ if $k$ is not stored, and at most $(n-1)/m < \alpha$ if it is. Hence each search takes $O(1 + \alpha)$ expected time, for every set of keys.
:::

::: proof
For each stored key $x \ne k$ let $Y_x = 1$ if $h(x) = h(k)$ and $0$ otherwise. By universality $\E[Y_x] \le 1/m$. The number of other keys in $k$'s bucket is $\sum_{x \ne k} Y_x$, whose expectation is at most $1/m$ times the number of terms: $n/m$ if $k$ is not stored, $(n-1)/m$ if it is.
:::

Universal families exist and are cheap to evaluate. For integer keys in $\set{0, \dots, p - 1}$ with $p$ prime and $p \ge m$, the family

$$
h_{a,b}(k) = \bigl((ak + b) \bmod p\bigr) \bmod m, \qquad a \in \set{1, \dots, p-1},\; b \in \set{0, \dots, p-1}
$$ {#eq-carter-wegman}

is universal (Carter and Wegman 1979; a proof is in Cormen, Leiserson, Rivest and Stein, §11.3). Choosing $a$ and $b$ at random when the table is created costs nothing per operation. For instance, with $p = 17$, $m = 6$, $a = 3$, $b = 4$: $h(8) = ((24 + 4) \bmod 17) \bmod 6 = 11 \bmod 6 = 5$.

::: example Two keys under a universal family {#ex-universal}
Take $p = 5$ and $m = 2$ in [[#eq-carter-wegman]], so there are $4 \times 5 = 20$ functions $h_{a,b}$. For the keys $x = 1$ and $y = 3$, count how many of the $20$ functions make them collide, and compare with the bound $1/m$.
::: solution
First compute $u = (a + b) \bmod 5$ and $v = (3a + b) \bmod 5$; the keys collide when $u \bmod 2 = v \bmod 2$. Since $a \ne 0$ and $3 - 1 = 2$ is invertible modulo $5$, we have $u \ne v$, and as $(a, b)$ ranges over the $20$ choices, $(u, v)$ ranges over all $20$ ordered pairs of *distinct* residues modulo $5$ exactly once. (Given $u \ne v$, solve $2a \equiv v - u$ and $b \equiv u - a$.) So we count ordered pairs $u \ne v$ in $\set{0,1,2,3,4}$ with the same parity: the even residues $\set{0, 2, 4}$ give $3 \cdot 2 = 6$ pairs and the odd residues $\set{1, 3}$ give $2\cdot 1 = 2$, a total of $8$. The collision probability is $8/20 = 0.4 \le 1/m = 0.5$, as universality requires.

The same argument works in general: the map $(a, b) \mapsto (u, v)$ is a bijection onto pairs of distinct residues, and among the $p - 1$ values $v \ne u$ at most $\lceil p/m\rceil - 1 \le (p-1)/m$ have $v \equiv u \pmod m$. That is the proof of universality in outline.
:::
:::

::: quiz
A chained table with $m = 1000$ buckets holds $n = 3000$ keys, and uses a hash function drawn from a universal family. Which statement is guaranteed?
- [ ] Every bucket holds exactly $3$ keys.
- [ ] No bucket holds more than $3$ keys.
- [x] For each key $k$, the expected number of other keys in $k$'s bucket is at most about $3$.
- [ ] Searches take at most $4$ comparisons.
::: solution
Universality bounds an *expectation* over the random choice of $h$, for each fixed key ([[#thm-universal]]): at most $(n-1)/m \approx 3$ other keys share $k$'s bucket on average. It says nothing about every bucket at once, and some unlucky draws of $h$ make long chains; it only makes them unlikely.
:::
:::

## Open addressing

**Open addressing** stores all keys in the array itself, one per slot, with no lists. When the slot $h(k)$ is occupied, we try other slots in a fixed order — the **probe sequence** of $k$ — until we find $k$ or an empty slot.

::: definition Open addressing and probe sequences {#def-open}
In **open addressing**, each key $k$ has a probe sequence $h(k, 0), h(k, 1), \dots, h(k, m-1)$ that is a permutation of $\set{0, \dots, m-1}$. Insertion places $k$ in the first empty slot of its sequence; search follows the sequence until it finds $k$ (success) or an empty slot (failure). Common choices, with ordinary hash functions $h_1, h_2$:

- **linear probing**: $h(k, i) = (h_1(k) + i) \bmod m$;
- **quadratic probing**: $h(k, i) = (h_1(k) + c_1 i + c_2 i^2) \bmod m$;
- **double hashing**: $h(k, i) = (h_1(k) + i\,h_2(k)) \bmod m$, with $h_2(k)$ never $0$ and coprime to $m$ (for example $m$ prime, or $m$ a power of $2$ and $h_2(k)$ odd).

The load factor $\alpha = n/m$ is now at most $1$.
:::

::: example Linear probing {#ex-linear-probing}
Insert $50, 700, 76, 85, 92, 73, 101$ (in that order) into a table of size $m = 7$ with linear probing and $h_1(k) = k \bmod 7$. How many probes does each insertion take?
::: solution
| key | $h_1(k)$ | slots probed | placed in | probes |
|---|---|---|---|---|
| 50 | 1 | 1 | 1 | 1 |
| 700 | 0 | 0 | 0 | 1 |
| 76 | 6 | 6 | 6 | 1 |
| 85 | 1 | 1, 2 | 2 | 2 |
| 92 | 1 | 1, 2, 3 | 3 | 3 |
| 73 | 3 | 3, 4 | 4 | 2 |
| 101 | 3 | 3, 4, 5 | 5 | 3 |

The final table is `[700, 50, 85, 92, 73, 101, 76]`, completely full. A successful search for a key repeats its insertion probes, so the average is $13/7 \approx 1.86$, worse than chaining's $11/7$ in [[#ex-chaining]] on the same keys. Notice what happened to $73$: its home slot $3$ was taken by $92$, a key with a *different* hash value, because the cluster starting at slot $1$ had grown into it. This is **primary clustering**: occupied runs grow, and the longer a run, the more likely the next key lands in it and makes it longer still.
:::
:::

**Deletion** needs care. Simply emptying a slot would break the search for any key whose probe sequence passed through that slot: the search would stop at the new hole and wrongly report failure. The usual fix is to replace a deleted key with a **tombstone** marker, which searches skip over and insertions may reuse. Tombstones count towards the load for searching, so a table with many deletions is periodically rebuilt. (Linear probing alone allows an alternative, moving later keys of the run backwards to close the hole.)

### The cost of open addressing

The analogue of simple uniform hashing for open addressing is the **uniform hashing assumption**: the probe sequence of each key is equally likely to be any of the $m!$ permutations of the slots, independently for different keys. Double hashing approximates it reasonably; linear probing, whose sequences are only the $m$ cyclic shifts, does not.

::: theorem Expected probes with uniform hashing {#thm-open}
Under the uniform hashing assumption, in an open-address table with load factor $\alpha = n/m < 1$:

1. an unsuccessful search makes at most $\dfrac{1}{1 - \alpha}$ probes in expectation;
2. a successful search for a uniformly chosen stored key makes at most $\dfrac{1}{\alpha}\ln\dfrac{1}{1-\alpha}$ probes in expectation.
:::

::: proof
(1) Let $X$ be the number of probes. Since $X$ takes positive integer values, $\E[X] = \sum_{i \ge 1}\Prob[X \ge i]$. An unsuccessful search makes at least $i$ probes exactly when the first $i - 1$ probed slots are all occupied. The first probe hits an occupied slot with probability $n/m$; given that, the second probe is to a uniformly random *other* slot, occupied with probability $(n-1)/(m-1)$; and so on. Since $(n-j)/(m-j) \le n/m$ for $0 \le j < n \le m$,

$$
\Prob[X \ge i] = \frac{n}{m}\cdot\frac{n-1}{m-1}\cdots\frac{n-i+2}{m-i+2} \le \alpha^{i-1},
\qquad
\E[X] \le \sum_{i\ge1}\alpha^{i-1} = \frac{1}{1-\alpha}.
$$

(2) A successful search for a key follows the same probes as the insertion of that key. When the $(i+1)$st key was inserted, the table held $i$ keys, so by (1) the insertion — an unsuccessful search followed by a write — made at most $1/(1 - i/m) = m/(m-i)$ probes in expectation. Averaging over the $n$ keys,

$$
\frac1n\sum_{i=0}^{n-1}\frac{m}{m-i} = \frac{1}{\alpha}\sum_{j=m-n+1}^{m}\frac1j \le \frac1\alpha\int_{m-n}^{m}\frac{dx}{x} = \frac1\alpha\ln\frac{m}{m-n} = \frac1\alpha\ln\frac{1}{1-\alpha},
$$

where the sum is bounded by the integral because $1/x$ is decreasing.
:::

At $\alpha = 1/2$ the bounds are $2$ and $1.39$ probes; at $\alpha = 0.9$ they are $10$ and $2.56$. Unsuccessful searches suffer most as the table fills. Linear probing is worse because of clustering: Knuth's analysis (1963; *The Art of Computer Programming*, volume 3, §6.4), assuming independent uniformly random hash values $h_1(k)$, gives approximately

$$
\frac12\Bigl(1 + \frac{1}{(1-\alpha)^2}\Bigr) \text{ probes (unsuccessful)}, \qquad \frac12\Bigl(1 + \frac{1}{1-\alpha}\Bigr) \text{ probes (successful)}
$$ {#eq-knuth-linear}

for large tables. We state these without proof.

::: widget plot
f: 1/(1 - x); (1 + 1/(1 - x)^2)/2; 1 + x
labels: \text{open, uniform hashing}; \text{linear probing}; \text{chaining}
x: 0, 0.95
y: 0, 25
caption: Expected probes (key comparisons for chaining) in an unsuccessful search against the load factor $\alpha$. Chaining degrades gently ($1+\alpha$ counting the hash computation); open addressing explodes as $\alpha \to 1$, linear probing fastest. This is why open-address tables are resized well before they fill — Python's `dict`, for example, at two-thirds full.
:::

A simulation of linear probing (an observation, with idealised random hash values, $m = 1000$ and $20$ trials per load factor) agrees well with [[#eq-knuth-linear]]:

```python
import random

def linear_probing_experiment(m, alpha, trials=20):
    """Average probes for successful and unsuccessful search with linear probing."""
    succ = unsucc = 0.0
    for _ in range(trials):
        table = [None] * m
        home = {}                                  # key -> its hash value
        for key in range(int(alpha * m)):
            h = home[key] = random.randrange(m)    # an idealised random hash value
            while table[h] is not None:
                h = (h + 1) % m                    # probe the next slot
            table[h] = key
        # successful search: probes from home slot to the key's slot
        succ += sum((table.index(k) - h) % m + 1 for k, h in home.items()) / len(home)
        # unsuccessful search: from every possible home slot to the first empty slot
        total = 0
        for h in range(m):
            probes = 1
            while table[(h + probes - 1) % m] is not None:
                probes += 1
            total += probes
        unsucc += total / m
    return succ / trials, unsucc / trials

random.seed(2026)
for alpha in [0.5, 0.75, 0.9]:
    s, u = linear_probing_experiment(1000, alpha)
    print(f"alpha {alpha}: successful {s:.2f} (formula {(1 + 1/(1 - alpha)) / 2:.2f}), "
          f"unsuccessful {u:.2f} (formula {(1 + 1/(1 - alpha)**2) / 2:.2f})")
```

```console
$ python3 probing.py
alpha 0.5: successful 1.49 (formula 1.50), unsuccessful 2.54 (formula 2.50)
alpha 0.75: successful 2.47 (formula 2.50), unsuccessful 8.42 (formula 8.50)
alpha 0.9: successful 5.22 (formula 5.50), unsuccessful 46.77 (formula 50.50)
```

Why use linear probing at all, then? Because its probes visit consecutive slots, which lie in the same cache lines; on real hardware a few extra probes in cache are cheaper than one probe that misses (see the locality discussion in [[data-structures/arrays-lists]]). With a good hash function and $\alpha$ kept below about $0.7$, linear probing is among the fastest hash tables in practice. Its theory is also better than its reputation: Pagh, Pagh and Ružić (2007) proved that linear probing with a 5-wise independent hash family has $O(1)$ expected cost per operation for any fixed $\alpha < 1$.

## Hash tables are not always O(1) {#sec-worst-case}

::: warning "Hash tables are O(1)" needs three qualifications
Every $O(1)$ claim for hash tables is **expected**, rests on an **assumption**, and is **amortised** if the table resizes.

1. *Expected, not worst case.* With any fixed hash function, some set of keys all collide, and then chaining costs $\Theta(n)$ per search and open addressing as much. The $O(1)$ is an average over random hash values ([[#thm-chaining]], [[#thm-open]]) or over a random choice of hash function ([[#thm-universal]]).
2. *An assumption about the keys or the function.* Simple uniform hashing is a model of typical inputs; a poor hash function (summing characters, taking low bits of aligned addresses) violates it badly on ordinary data.
3. *Amortised when resizing.* An insertion that triggers a rehash costs $\Theta(n)$ by itself.

Hashing a key also takes time proportional to its length: looking up a string of length $\ell$ costs $\Theta(\ell)$ to hash, and comparing keys costs up to $\Theta(\ell)$ per comparison.
:::

The first point matters for security. If an attacker can predict the hash function of a web server's request parser, they can send thousands of parameter names that all collide, turning each insertion into a scan of a long chain and making the server do $\Theta(n^2)$ work for $n$ parameters. Scott Crosby and Dan Wallach described such **algorithmic complexity attacks** in 2003, and in 2011 they were demonstrated against several web platforms. The defence is the idea of [[#thm-universal]]: make the hash function unpredictable by choosing it randomly at start-up from a well-designed family. That is why Python randomises string hashing (by default since Python 3.3, using SipHash since 3.4) and why `hash("cat")` changes between runs. Many libraries also cap the damage by limiting the number of keys accepted from untrusted input, and Java's `HashMap` (since Java 8) turns very long chains into balanced trees, bounding the worst case at $O(\log n)$ per operation.

### Python's dict

As of CPython 3.14, `dict` is an open-address table whose size is a power of $2$. It does not probe linearly: the probe sequence is generated by the recurrence $j \gets (5j + 1 + \mathit{perturb}) \bmod 2^p$, where $\mathit{perturb}$ starts as the full hash value and is shifted right by $5$ bits at each step, so that all bits of the hash eventually influence the sequence. The table is resized when it becomes two-thirds full. Since Python 3.6 the entries are stored in a separate dense array in insertion order, with the hash table holding only small indices into it; this saves memory and is why iteration follows insertion order, which the language has guaranteed since Python 3.7. These are implementation details that may change; the guarantees are the average $O(1)$ operations and the iteration order.

::: quiz
An open-address table with linear probing has load factor $0.9$. Approximately how many probes does an unsuccessful search make on average, according to Knuth's formula?
- [ ] $2$
- [ ] $10$
- [x] $50$
- [ ] $100$
::: solution
$\tfrac12(1 + 1/(1 - 0.9)^2) = \tfrac12(1 + 100) = 50.5$. Uniform hashing would need at most $1/(1-0.9) = 10$ probes; the difference is the cost of primary clustering. At $\alpha = 0.5$ linear probing needs only $2.5$.
:::
:::

::: history
Hashing was invented at IBM in the early 1950s. Hans Peter Luhn wrote an internal memorandum in January 1953 proposing to place items in "buckets" by a computed address, with chaining for overflows; Gene Amdahl, Elaine McGraw and Arthur Samuel used open addressing with linear probing in an assembler for the IBM 701 in 1954. Arnold Dumey gave the first published description, with division by a prime, in 1956, and W. Wesley Peterson's "Addressing for random-access storage" (*IBM Journal of Research and Development*, 1957) analysed open addressing. Donald Knuth's 1963 analysis of linear probing, later in *The Art of Computer Programming*, volume 3 (1973), was among his first analyses of algorithms. J. Lawrence Carter and Mark Wegman introduced universal hashing in "Universal classes of hash functions" (*Journal of Computer and System Sciences*, 1979). Scott Crosby and Dan Wallach's "Denial of service via algorithmic complexity attacks" (USENIX Security, 2003) showed why the randomness matters in practice, and the keyed hash SipHash of Jean-Philippe Aumasson and Daniel J. Bernstein (2012) became the default string hash of Python, Rust and other languages.
:::

## Where this leads

Hash tables are the workhorse behind sets, maps, caches, symbol tables in [[compilers]], hash joins and indexes in [[databases]], and deduplication everywhere. When the keys must also be kept in *order* — to find the smallest key, the next key after $k$, or all keys in a range — hashing cannot help, because it deliberately scatters similar keys; binary search trees ([[data-structures/binary-search-trees]]) and their balanced versions ([[data-structures/balanced-trees]]) support ordered operations in $O(\log n)$ time. Graph algorithms use hash maps for adjacency when vertices have arbitrary names ([[data-structures/graph-representations]]). Randomised algorithms built on hashing — Bloom filters, count-min sketches, perfect and cuckoo hashing — are part of [[algorithms]], and cryptographic hash functions, a different notion designed to resist deliberate attack, are studied in [[cryptography]].

::: summary
- A hash table maps keys to slots of an array by a hash function $h\colon U\to\set{0,\dots,m-1}$ ([[#def-hash]]); collisions are inevitable and, by the birthday bound ([[#prop-birthday]]), appear once $n \approx \sqrt m$.
- Good hash functions are deterministic, fast and spread realistic keys; for strings use a polynomial hash ([[#eq-poly-hash]]), never a sum of characters.
- **Separate chaining** ([[#def-chaining]]) keeps a list per slot; under simple uniform hashing searches cost $\Theta(1 + \alpha)$ expected ([[#thm-chaining]]).
- **Universal hashing** ([[#def-universal]]) chooses $h$ at random and gives the same expected bound for *every* set of keys ([[#thm-universal]]).
- **Open addressing** ([[#def-open]]) probes within the array; under uniform hashing an unsuccessful search costs at most $1/(1-\alpha)$ probes ([[#thm-open]]), and linear probing suffers clustering but has good locality. Deletion needs tombstones.
- Keep $\alpha$ bounded by resizing and rehashing; insertion is then $O(1)$ expected amortised.
- "$O(1)$" for hash tables is expected, assumption-dependent and amortised; the worst case is $\Theta(n)$, which attackers can exploit unless the hash function is randomised.
:::

## Exercises

::: exercise Division-method collisions {level=1 check="2"}
With $h(k) = k \bmod 10$, insert the keys $12, 44, 13, 88, 23, 94, 11, 39, 20, 16, 5$ into a chained table with $10$ buckets. What is the length of the longest chain? (Enter the length.)
::: solution
The last digits are $2, 4, 3, 8, 3, 4, 1, 9, 0, 6, 5$. Bucket $3$ gets $13, 23$ and bucket $4$ gets $44, 94$; every other bucket receives at most one key (bucket $7$ none). So the longest chain has length $2$. With $11$ keys in $10$ buckets at least one collision was certain, by the pigeonhole principle.
:::
:::

::: exercise Birthday estimate {level=1 check="435/10000"}
Thirty keys are hashed uniformly and independently into $m = 10\,000$ slots. What is the expected number of colliding pairs? (Enter the exact value.)
::: solution
By [[#prop-birthday]] it is $\binom{30}{2}/m = 435/10\,000 = 0.0435$.
:::
:::

::: exercise Linear probing with deletion {level=1}
In the final table of [[#ex-linear-probing]], key $85$ (in slot $2$) is deleted by simply setting the slot to empty. Which searches now fail wrongly? How does a tombstone avoid this?
::: solution
A search fails wrongly if its probe sequence passes through slot $2$ before reaching the key's own slot. Keys $73$ and $101$ have home slot $3$, so their searches start at slot $3$ and never visit slot $2$: they still succeed. Key $92$ has home slot $1$ and is stored in slot $3$: its search probes slot $1$ (holding $50$), then slot $2$, finds it empty and reports "not found" — wrongly. A tombstone in slot $2$ tells the search "keep going", so it proceeds to slot $3$ and finds $92$.
:::
:::

::: exercise Average successful search {level=2 check="11/7"}
Verify the average number of comparisons for a successful search in [[#ex-chaining]] by listing the comparisons for every key. (Enter the exact average.)
::: solution
Chains: bucket 0: $700$; bucket 1: $50, 85, 92$; bucket 3: $73, 101$; bucket 6: $76$. Comparisons: $700{:}\,1$, $50{:}\,1$, $85{:}\,2$, $92{:}\,3$, $73{:}\,1$, $101{:}\,2$, $76{:}\,1$. Total $11$ over $7$ keys: $11/7$.
:::
:::

::: exercise Choosing a table size {level=2}
A program stores up to $10^6$ keys with linear probing and needs an average unsuccessful search of at most $3$ probes, by [[#eq-knuth-linear]]. What is the largest load factor allowed, and how many slots does the table need? Compare with what uniform hashing ([[#thm-open]]) would require.
::: solution
Solve $\tfrac12(1 + 1/(1-\alpha)^2) \le 3$: $1/(1-\alpha)^2 \le 5$, so $1 - \alpha \ge 1/\sqrt5 \approx 0.447$ and $\alpha \le 0.553$. The table needs $m \ge 10^6/0.553 \approx 1.81\times10^6$ slots. Under uniform hashing, $1/(1-\alpha) \le 3$ gives $\alpha \le 2/3$ and $m \ge 1.5\times 10^6$.
:::
:::

::: exercise A bad hash function for strings {level=2}
A programmer hashes strings by the sum of their character codes modulo $m = 1024$. The keys are all $8$-letter strings over the lowercase letters `a`–`z`. Show that at most $201$ distinct slots can ever be used, and explain why this is far worse than [[#eq-poly-hash]].
::: solution
The codes are $97$ to $122$, so the sum of $8$ codes lies between $8 \cdot 97 = 776$ and $8\cdot 122 = 976$: only $976 - 776 + 1 = 201$ possible values, all below $1024$. So at most $201$ of the $1024$ slots are ever used, and the sums are concentrated near the middle ($876$), so a few slots get most of the keys; moreover all anagrams collide. With the polynomial hash, the value depends on the positions as well, the range before reduction is enormous, and reducing modulo $m$ spreads it over all slots.
:::
:::

::: exercise Universal hashing by hand {level=2 check="1"}
With the family [[#eq-carter-wegman]] for $p = 13$, $m = 4$, $a = 5$, $b = 7$, compute $h(10)$. (Enter the slot.)
::: solution
$5\cdot 10 + 7 = 57$, and $57 \bmod 13 = 57 - 52 = 5$; then $5 \bmod 4 = 1$. So $h(10) = 1$.
:::
:::

::: exercise Expected empty buckets {level=3}
Under simple uniform hashing, $n$ keys are placed in $m$ buckets. (a) Find the expected number of empty buckets, and its limit fraction when $n = m \to \infty$. (b) Show that the expected number of pairs of keys in the same bucket is $\binom n2/m$, and deduce that $\E\bigl[\sum_j \ell_j^2\bigr] = n + n(n-1)/m$, where $\ell_j$ is the length of bucket $j$. (c) Explain why $\sum_j \ell_j^2 / n$ is the right measure of the average cost of a successful search when every stored key is searched equally often.
::: solution
(a) Bucket $j$ is empty with probability $(1 - 1/m)^n$; by linearity the expected number of empty buckets is $m(1 - 1/m)^n$. For $n = m$, the fraction $(1 - 1/m)^m \to e^{-1} \approx 0.368$, matching the simulation.

(b) The number of pairs in the same bucket is $\sum_{x<y}[h(x) = h(y)]$, with expectation $\binom n2 \cdot\frac1m$ by linearity. Also $\sum_j \binom{\ell_j}{2}$ counts the same pairs, and $\ell_j^2 = 2\binom{\ell_j}{2} + \ell_j$, so $\E[\sum_j\ell_j^2] = 2\binom n2/m + n = n + n(n-1)/m$.

(c) If each key is searched equally often and a search in a bucket of length $\ell$ costs on average about $(\ell+1)/2$ comparisons, the average cost over keys is $\frac1n\sum_j \ell_j\cdot\frac{\ell_j + 1}{2} = \frac{1}{2n}\sum_j\ell_j^2 + \frac12$: a bucket of length $\ell$ is hit by $\ell$ of the keys and costs about $\ell/2$ each, so long chains count quadratically. Substituting (b) gives $1 + (n-1)/(2m)$, the formula of [[#thm-chaining]].
:::
:::

::: exercise Implementing linear probing {level=3}
Write a class `LinearProbingSet` with `add`, `contains` and `remove`, using linear probing, tombstones, and doubling when the number of occupied slots (keys plus tombstones) exceeds half the capacity. Test it against Python's `set` on a random sequence of $10\,000$ operations.
::: solution
```python
import random

EMPTY, TOMB = object(), object()            # unique markers

class LinearProbingSet:
    def __init__(self, m=8):
        self.t = [EMPTY] * m
        self.n = self.used = 0               # keys; keys plus tombstones

    def _find(self, x):                      # slot of x, or the first free slot
        m, j, free = len(self.t), hash(x) % len(self.t), None
        while self.t[j] is not EMPTY:
            if self.t[j] is TOMB:
                free = j if free is None else free
            elif self.t[j] == x:
                return j, True
            j = (j + 1) % m
        return (j if free is None else free), False

    def contains(self, x):
        return self._find(x)[1]

    def add(self, x):
        j, found = self._find(x)
        if found:
            return
        if self.t[j] is EMPTY:
            self.used += 1
        self.t[j] = x
        self.n += 1
        if 2 * self.used > len(self.t):
            self._rebuild(2 * len(self.t))

    def remove(self, x):
        j, found = self._find(x)
        if found:
            self.t[j] = TOMB                 # keep the probe chain intact
            self.n -= 1

    def _rebuild(self, m):                   # also clears tombstones
        keys = [k for k in self.t if k is not EMPTY and k is not TOMB]
        self.t, self.n, self.used = [EMPTY] * m, 0, 0
        for k in keys:
            self.add(k)

random.seed(7)
s, ref = LinearProbingSet(), set()
for _ in range(10_000):
    x, op = random.randrange(500), random.random()
    if op < 0.5:
        s.add(x); ref.add(x)
    elif op < 0.8:
        s.remove(x); ref.discard(x)
    assert s.contains(x) == (x in ref)
print("ok", s.n, len(ref), len(s.t))
```

```console
$ python3 lpset.py
ok 316 316 1024
```

The table never fills, because rebuilding happens when keys plus tombstones exceed half the capacity, so `_find` always terminates. Tombstones are reused by `add` but are only cleared by a rebuild; a production version would also rebuild at the same size when tombstones dominate.
:::
:::
