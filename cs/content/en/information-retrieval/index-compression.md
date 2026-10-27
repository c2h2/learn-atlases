The inverted index of [[information-retrieval/inverted-indexes]] was built by sorting all $(\text{term}, \text{docID})$ pairs in memory. For *Alice* that is a few thousand pairs. A web-scale collection of $10^{10}$ pages with $500$ distinct terms each has $5 \times 10^{12}$ postings; stored as $32$-bit integers they occupy $20$ TB, far beyond the memory of any machine, and the pairs to be sorted are larger still. Two problems follow, and this chapter solves both. **Construction:** how do we build an index whose input and output do not fit in memory, and keep it up to date as documents arrive? **Compression:** how do we store the postings so that they take a small fraction of $32$ bits each — and, just as important, so that a query can decode them faster than it could have read uncompressed data from storage?

The key observation for compression is that a posting list is a sorted list of docIDs, so the **gaps** between consecutive entries are small positive integers, most of them very small for frequent terms. We study codes for integers that give small numbers short codewords: the byte-aligned **variable-byte** code, and the bit-level **Elias $\gamma$** and **$\delta$** codes and **Golomb–Rice** codes, implemented in Python and measured on an index of *Alice*'s paragraphs. We prove their lengths, prove that they are uniquely decodable, and use the **Kraft inequality** and a counting argument to see how far from optimal they are. Prerequisites are the inverted index, sorting ([[algorithms/sorting-selection]]) and the external merge sort of [[databases/query-processing]].

## Building indexes that do not fit in memory

Sort-based construction ([[information-retrieval/inverted-indexes#alg-build]]) generates every pair $(t, d)$ and sorts. When the pairs do not fit in memory, the textbook solution is an **external merge sort**: sort memory-sized runs, write them out, and merge the runs ([[databases/query-processing]]). Two refinements make this practical for indexing.

::: algorithm Blocked sort-based indexing (BSBI) {#alg-bsbi}
1. Assign each term a **termID** using an in-memory dictionary, so that a pair $(\text{termID}, \text{docID})$ takes $8$ bytes.
2. Read documents, emitting pairs, until the pairs fill a block of memory. Sort the block by $(\text{termID}, \text{docID})$, group it into posting lists, and write it to disk as a **run**.
3. Repeat until the collection is exhausted, giving $k$ runs.
4. Merge the $k$ runs with a $k$-way merge (a heap of the first unread entry of each run, as in [[data-structures/heaps]]), concatenating the posting lists of each termID from the runs in order, and write the final index.
:::

Because docIDs are assigned in increasing order as documents are read, the posting list of a term in run $i$ contains only docIDs smaller than those in run $i + 1$, so step 4 concatenates rather than sorts. The weakness of BSBI is the global term dictionary of step 1, which must stay in memory and itself grows by Heaps' law ([[information-retrieval/text-processing#def-heaps]]).

::: algorithm Single-pass in-memory indexing (SPIMI) {#alg-spimi}
1. Start an empty in-memory hash table from terms to growable posting lists.
2. For each token $(t, d)$ in document order: look up $t$, creating an entry if needed, and append $d$ to its list unless $d$ is already its last element (otherwise increment its term frequency).
3. When memory is full, sort the *terms* of the hash table, write the dictionary and posting lists in term order to disk as a run, and empty the table.
4. At the end, merge the runs as in BSBI, matching terms by string.
:::

SPIMI never sorts postings — they are appended in docID order — and needs no global dictionary, since each run carries its own terms. Its time is $O(T)$ for $T$ tokens plus the sorting of each run's terms and the final merge. Each run can also be compressed as it is written, so more of the collection fits in each block. At the scale of thousands of machines, the same idea becomes a MapReduce job in which mappers emit $(t, d)$ pairs, the shuffle partitions them by term and sorts them, and reducers write posting lists ([[distributed-systems/data-processing]]); in practice a large index is partitioned by document, with one such index per partition.

### Dynamic indexes

Collections change. New documents must become searchable within seconds or minutes, and documents are deleted or updated. The simple design keeps a small **in-memory index** of recent documents, searched together with the large **main index**, and merges the two when memory fills. If the merge rewrites the whole main index every time, the cost is quadratic.

::: theorem Logarithmic merging {#thm-log-merge}
Let the in-memory index hold $n$ postings and let $T$ postings arrive in total. **Immediate merging** — merging the in-memory index into a single main index whenever it fills — writes $\Theta(T^2/n)$ postings. **Logarithmic merging** keeps on-disk indexes $I_0, I_1, I_2, \dots$, where $I_i$ is either empty or holds $2^i n$ postings; when memory fills, its contents become a new index of size $n$, and while two indexes of the same size exist they are merged into one of twice the size. Logarithmic merging writes $O(T \log(T/n))$ postings, and at any time at most $\lfloor \log_2(T/n) \rfloor + 1$ on-disk indexes exist.
:::

::: proof
*Immediate merging.* After the $j$-th flush the main index holds $jn$ postings, all of which are rewritten. With $T/n$ flushes the number of postings written is $\sum_{j=1}^{T/n} jn = n \cdot \frac{(T/n)(T/n + 1)}{2} = \Theta(T^2/n)$.

*Logarithmic merging.* The indexes behave like a binary counter: after $c$ flushes, $I_i$ is non-empty exactly when bit $i$ of $c$ is $1$, because adding one flush of size $n$ is adding $1$ to the counter and every carry is a merge of two equal indexes. A posting is written once when it is flushed to $I_0$ and once each time the index containing it is merged into the next level. Each merge moves it to a strictly higher level, and the highest level ever used, $i$, satisfies $2^i n \le T$, so $i \le \log_2(T/n)$. Hence each posting is written at most $\log_2(T/n) + 1$ times and the total is at most $T(\log_2(T/n) + 1) = O(T \log(T/n))$. The number of non-empty indexes is the number of $1$ bits of $c \le T/n$, at most $\lfloor \log_2(T/n) \rfloor + 1$.
:::

The price is that a query must consult up to $\log_2(T/n) + 1$ indexes and combine their results; posting lists of the same term in different indexes cover disjoint docID ranges, so combining is concatenation. Lucene's segments with a tiered merge policy follow this design: each flush produces an immutable segment and a background thread merges segments of similar size. Deleted documents are marked in a bit vector and physically removed when their segment is merged; an update is a deletion plus an insertion.

::: example Counting merges {#ex-log-merge}
The in-memory index holds $n = 1\,000$ postings and $T = 8\,000$ postings arrive. How many postings does each strategy write?
::: solution
*Immediate:* the main index after flushes $1, \dots, 8$ holds $1\,000, 2\,000, \dots, 8\,000$ postings, so $1\,000 \cdot (1 + 2 + \dots + 8) = 36\,000$ postings are written. *Logarithmic:* flush 1 writes $I_0$ ($1\,000$). Flush 2 writes $1\,000$ then merges two indexes of $1\,000$ into $I_1$ ($2\,000$). Flush 3: $1\,000$. Flush 4: $1\,000$, merge into a second index of $2\,000$ ($2\,000$), merge the two $2\,000$s into $I_2$ ($4\,000$). Flushes 5 to 8 repeat flushes 1 to 4 ($1\,000 + 3\,000 + 1\,000 + 7\,000 = 12\,000$) and the final merge of two $4\,000$s writes $8\,000$. Total: $12\,000 + 12\,000 + 8\,000 = 32\,000$, which is $T(\log_2(T/n) + 1) = 8\,000 \times 4$ exactly. The gap is small at this size; for $T/n = 1\,000$ flushes it is $500{,}500 n$ against about $11\,000 n$.
:::
:::

## Gaps and the shape of posting lists

Build an index of *Alice* with each of its $800$ paragraphs as a document, so that the posting lists are longer and more interesting than with chapters:

```python
import re
from collections import defaultdict

text = open("alice.txt", encoding="utf-8").read()
text = text[text.index("CHAPTER I"):]
paras = [p for p in re.split(r"\n\s*\n", text) if re.search(r"[a-z]", p)]
index = defaultdict(list)
for d, p in enumerate(paras, 1):
    for t in sorted(set(re.findall(r"[a-z]+(?:'[a-z]+)?", p.lower()))):
        index[t].append(d)                      # docIDs in increasing order
print("documents", len(paras), "terms", len(index), "postings", sum(map(len, index.values())))

def gaps(plist):                                # first docID, then differences
    return [plist[0]] + [b - a for a, b in zip(plist, plist[1:])]
```
```text
documents 800 terms 2615 postings 21227
```

::: definition Gap (delta) encoding {#def-gaps}
A posting list $d_1 < d_2 < \dots < d_f$ is stored as its **gaps** (or **d-gaps**) $g_1 = d_1$ and $g_i = d_i - d_{i-1}$ for $i \ge 2$. All gaps are positive integers, they sum to $d_f \le N$, and the list is recovered by prefix sums: $d_i = g_1 + \dots + g_i$.
:::

The gaps of a few lists show the pattern:

```text
the 643 [1, 1, 1, 1, 1, 1, 1, 1]
alice 347 [2, 2, 1, 1, 2, 1, 2, 1]
rabbit 38 [1, 2, 1, 2, 6, 21, 68, 1]
hatter 53 [277, 22, 2, 8, 2, 6, 3, 1]
dormouse 33 [301, 18, 13, 1, 21, 11, 1, 4]
```

(the number after each term is its document frequency, then its first eight gaps). The list of `the`, which occurs in $643$ of the $800$ paragraphs, consists mostly of $1$s; the average gap of a term is about $N/\mathrm{df}_t$, so frequent terms have tiny gaps and rare terms large ones. The Hatter's first gap is $277$ because he first appears in paragraph $277$, and then gaps are small because he occurs in bursts — the tea party, the trial. Burstiness makes small gaps even more common than a uniform spread would. A fixed-width code wastes almost all of its bits on such data: every gap fits in $\lceil \log_2 801 \rceil = 10$ bits, but most need one or two. We want a **variable-length code** in which small integers get short codewords.

## Byte-aligned codes

::: definition Variable-byte code {#def-vbyte}
The **variable-byte** (VB) code writes a positive integer $n$ in base $128$, most significant digit first, one digit per byte in the low $7$ bits; the high bit of a byte is $1$ in the **last** byte of the number and $0$ in all others. A number with $\ell = \lfloor \log_2 n \rfloor + 1$ binary digits takes $\lceil \ell / 7 \rceil$ bytes.
:::

(Some systems use the opposite convention — high bit $1$ meaning "more bytes follow" — and the least significant digit first; the analysis is the same.)

```python
def vb_encode(n):                 # variable-byte: 7 bits per byte, high bit set on the last byte
    out = []
    while True:
        out.insert(0, n % 128)
        if n < 128: break
        n //= 128
    out[-1] += 128
    return bytes(out)

def vb_decode(data):
    nums, n = [], 0
    for b in data:
        if b < 128: n = 128 * n + b
        else: nums.append(128 * n + b - 128); n = 0
    return nums

data = b"".join(vb_encode(g) for g in [824, 5, 214577])
print(data.hex(" "), vb_decode(data))
```
```text
06 b8 85 0d 0c b1 [824, 5, 214577]
```

::: example Variable-byte by hand {#ex-vbyte}
Encode the gaps $824$, $5$ and $214\,577$ in variable-byte code, and check the output above.
::: solution
$824 = 6 \cdot 128 + 56$: digits $6, 56$. The first byte is `00000110` = `0x06`; the last byte has the high bit set: $128 + 56 = 184$ = `10111000` = `0xb8`. $5$ is a single digit, in a last byte: $128 + 5 = 133$ = `0x85`. $214\,577 = 13 \cdot 128^2 + 12 \cdot 128 + 49$ (since $13 \cdot 16\,384 = 212\,992$ and $1\,585 = 12 \cdot 128 + 49$): bytes `0x0d`, `0x0c` and $128 + 49 = 177$ = `0xb1`. Altogether `06 b8 85 0d 0c b1`: $6$ bytes for three numbers that would take $12$ bytes as $32$-bit integers. The decoder accumulates $n \gets 128 n + b$ for bytes below $128$ and emits on a byte with the high bit set.
:::
:::

Variable-byte coding never splits a byte, so decoding is a tight loop of shifts and comparisons with no bit manipulation, and it is easy to vectorise. Its weakness is that the smallest codeword is $8$ bits, so it cannot exploit the many gaps of $1$ in the lists of frequent terms: `the`, whose gaps are almost all $1$, still costs $8$ bits per posting.

## Bit-level codes: Elias gamma and delta

To spend fewer than $8$ bits on small gaps we must work with bits. The binary representation of $n \ge 1$ always starts with a $1$; the remaining $\lfloor \log_2 n \rfloor$ bits are the **offset**. For $13 = 1101_2$ the offset is `101`. The offset alone is not decodable — we would not know where it ends — so we prefix its length.

::: definition Unary, gamma and delta codes {#def-gamma}
- The **unary** code of $k \ge 0$ is $k$ ones followed by a zero: $\mathrm{U}(3) = \texttt{1110}$.
- The **Elias $\gamma$ code** of $n \ge 1$ is the unary code of the offset length followed by the offset: $\gamma(n) = \mathrm{U}(\lfloor \log_2 n \rfloor)\ \mathrm{offset}(n)$. So $\gamma(1) = \texttt{0}$, $\gamma(2) = \texttt{100}$, $\gamma(13) = \texttt{1110}\,\texttt{101}$.
- The **Elias $\delta$ code** of $n \ge 1$ replaces the unary length by the $\gamma$ code of the number of binary digits: $\delta(n) = \gamma(\lfloor \log_2 n \rfloor + 1)\ \mathrm{offset}(n)$. So $\delta(1) = \texttt{0}$, $\delta(13) = \gamma(4)\,\texttt{101} = \texttt{11000}\,\texttt{101}$.
:::

(Elias's original paper and some textbooks write the unary part with zeros and the terminator as a one; the conventions are interchangeable.)

```python
def gamma(n):                     # Elias gamma, n >= 1: unary length, then offset
    b = bin(n)[3:]                # binary of n without its leading 1
    return "1" * len(b) + "0" + b

def delta(n):                     # Elias delta: gamma code of the length, then offset
    b = bin(n)[3:]
    return gamma(len(b) + 1) + b

def gamma_decode(bits, i=0):      # returns (value, next position)
    k = 0
    while bits[i] == "1": k += 1; i += 1
    i += 1                        # skip the 0
    return int("1" + bits[i:i + k], 2), i + k

def delta_decode(bits, i=0):
    L, i = gamma_decode(bits, i)  # L = number of binary digits of n
    return int("1" + bits[i:i + L - 1], 2), i + L - 1

for n in (1, 2, 3, 4, 5, 9, 13, 24, 511, 1025):
    print(f"{n:5d} gamma={gamma(n):21s} delta={delta(n):18s} vb={vb_encode(n).hex(' ')}")
```
```text
    1 gamma=0                     delta=0                  vb=81
    2 gamma=100                   delta=1000               vb=82
    3 gamma=101                   delta=1001               vb=83
    4 gamma=11000                 delta=10100              vb=84
    5 gamma=11001                 delta=10101              vb=85
    9 gamma=1110001               delta=11000001           vb=89
   13 gamma=1110101               delta=11000101           vb=8d
   24 gamma=111101000             delta=110011000          vb=98
  511 gamma=11111111011111111     delta=111000111111111    vb=03 ff
 1025 gamma=111111111100000000001 delta=11100110000000001  vb=08 81
```

The bit strings here are Python strings of `0` and `1` characters, which is clear but about $8$ times larger than real bits; a real implementation packs bits into machine words. Decoding a concatenation, for the three gaps of [[#ex-vbyte]]:

```python
bits = "".join(gamma(g) for g in [824, 5, 214577])
i, out = 0, []
while i < len(bits):
    v, i = gamma_decode(bits, i); out.append(v)
print(len(bits), out)
```
```text
59 [824, 5, 214577]
```

A test that encodes and decodes $3\,000$ random lists with each code (all round trips succeed) is a useful habit with codes like these, where an off-by-one error in a length field silently corrupts everything after it.

::: theorem Lengths of the gamma and delta codes {#thm-gamma-length}
For $n \ge 1$, writing $\lambda = \lfloor \log_2 n \rfloor$,
$$
\abs{\gamma(n)} = 2\lambda + 1, \qquad \abs{\delta(n)} = \lambda + 2\lfloor \log_2(\lambda + 1) \rfloor + 1.
$$
Hence $\abs{\gamma(n)} \le 2\log_2 n + 1$ and $\abs{\delta(n)} = \log_2 n + O(\log \log n)$.
:::

::: proof
The binary representation of $n$ has $\lambda + 1$ digits, so the offset has $\lambda$ bits and its unary length code has $\lambda + 1$ bits; adding gives $2\lambda + 1$. For $\delta$, the length field is $\gamma(\lambda + 1)$, which by the first formula has $2\lfloor \log_2(\lambda + 1) \rfloor + 1$ bits, followed by the $\lambda$ offset bits. The bounds follow from $\lambda \le \log_2 n$.
:::

So $\gamma$ spends twice the information-theoretic minimum $\log_2 n$, while $\delta$ is asymptotically optimal; but for small numbers $\gamma$ is shorter ($\abs{\gamma(2)} = 3$ while $\abs{\delta(2)} = 4$), and they tie at many values in between. For the small gaps of frequent terms $\gamma$ is the better of the two.

::: lemma Prefix-freeness {#lem-prefix}
The $\gamma$ and $\delta$ codes are **prefix codes**: no codeword is a prefix of another. Consequently a concatenation of codewords can be decoded uniquely, from left to right, without separators.
:::

::: proof
Suppose $\gamma(m)$ is a prefix of $\gamma(n)$. Both begin with a unary length code, and a unary code ends at its first zero, so the two unary parts are identical, the offset lengths are equal, and both codewords have the same total length $2\lambda + 1$. A prefix of equal length is the whole string, so $\gamma(m) = \gamma(n)$; since $n$ is recovered from its codeword as $1$ followed by the offset, $m = n$. The same argument applies to $\delta$: the leading $\gamma$ code is determined uniquely because $\gamma$ is prefix-free, it fixes the offset length, and then the total length. For unique decodability, the decoder reads the shortest prefix of the remaining bits that is a codeword — exactly what `gamma_decode` does — and by prefix-freeness that is the only codeword that can start there.
:::

### How short can a code be?

::: theorem Kraft inequality {#thm-kraft}
If a prefix code assigns codewords of lengths $\ell_1, \ell_2, \dots$ to a finite or countable set of symbols, then
$$
\sum_i 2^{-\ell_i} \le 1.
$$
Conversely, any lengths satisfying this inequality are the lengths of some prefix code. (McMillan showed that the inequality holds for every uniquely decodable code, prefix or not.)
:::

::: proof
Map a codeword $c = c_1 c_2 \dots c_\ell$ to the interval $I_c = [0.c_1 c_2 \dots c_\ell,\ 0.c_1 c_2 \dots c_\ell + 2^{-\ell})$ of real numbers in $[0, 1)$ whose binary expansion begins with $c$; its length is $2^{-\ell}$. If the intervals of two codewords $c, c'$ overlapped, with $\abs{c} \le \abs{c'}$, then some number would have binary expansions beginning with both, so $c$ would be a prefix of $c'$. In a prefix code the intervals are therefore disjoint subsets of $[0, 1)$, and their total length is at most $1$; this holds for every finite subset of the codewords, hence for the whole sum. For the converse, sort the lengths increasingly and assign to each the left end of the next free part of $[0,1)$, written in binary to $\ell_i$ places; the disjointness argument runs backwards.
:::

The Kraft inequality says that short codewords are a scarce resource. It immediately shows that no prefix code can encode every integer in $\log_2 n + c$ bits, since $\sum_n 2^{-\log_2 n - c} = 2^{-c}\sum_n 1/n$ diverges; the extra $O(\log\log n)$ of $\delta$ is the price of being able to encode arbitrarily large integers. More usefully, a code with lengths $\ell(n)$ is optimal for the distribution $p(n) = 2^{-\ell(n)}$: by Shannon's source coding theorem the expected length under a distribution $p$ is at least the entropy $-\sum p(n) \log_2 p(n)$, with equality when $\ell(n) = -\log_2 p(n)$. The $\gamma$ code, with $2^{-\abs{\gamma(n)}} = 2^{-2\lfloor \log_2 n \rfloor - 1} \approx 1/(2n^2)$, is therefore ideal for gaps distributed like $1/n^2$ — a heavy-tailed distribution, plausible when terms are bursty.

### Golomb and Rice codes

A different model of gaps gives a different optimal code. If a term with document frequency $\mathrm{df}$ occurred in each document independently with probability $p = \mathrm{df}/N$ (the **Bernoulli model**), its gaps would be geometrically distributed: $\Prob(g = k) = (1 - p)^{k-1} p$.

::: definition Golomb and Rice codes {#def-golomb}
The **Golomb code** with parameter $b \ge 1$ writes $n \ge 1$ as $q = \lfloor (n - 1)/b \rfloor$ in unary followed by the remainder $r = (n - 1) - qb$ in truncated binary (using $\lfloor \log_2 b \rfloor$ or $\lceil \log_2 b \rceil$ bits). A **Rice code** is a Golomb code with $b = 2^k$, so the remainder is exactly $k$ bits.
:::

For geometric gaps with parameter $p$, Gallager and Van Voorhis (1975) proved that the Golomb code with $b$ the smallest integer satisfying $(1-p)^b + (1-p)^{b+1} \le 1$ is an optimal prefix code — we state this without proof. For small $p$ this gives $b \approx (\ln 2)/p \approx 0.69\, N/\mathrm{df}$. The parameter depends on the term, so it is stored in the dictionary or derived from $\mathrm{df}_t$, which the decoder knows. A Rice code rounds $b$ to a power of $2$ for speed:

```python
def rice(n, k):                                 # Rice code (Golomb with b = 2^k), n >= 1
    q, r = (n - 1) >> k, (n - 1) & ((1 << k) - 1)
    return "1" * q + "0" + (format(r, f"0{k}b") if k else "")
```

::: example Golomb parameters {#ex-golomb}
A term occurs in $\mathrm{df} = 33$ of $N = 800$ documents (the `dormouse` of *Alice*'s paragraphs). Choose the Rice parameter by the rule $b \approx 0.69\, N/\mathrm{df}$, and encode the gaps $301$, $18$ and $1$.
::: solution
$0.69 \times 800 / 33 = 16.7$, so $b = 16 = 2^4$ and $k = 4$. Gap $301$: $n - 1 = 300 = 18 \cdot 16 + 12$, so $18$ ones, a zero and `1100`: $23$ bits. Gap $18$: $17 = 1 \cdot 16 + 1$: `10` then `0001`, $6$ bits. Gap $1$: $0 = 0 \cdot 16 + 0$: `0` then `0000`, $5$ bits. Compare $\gamma$: $\abs{\gamma(301)} = 17$, $\abs{\gamma(18)} = 9$, $\abs{\gamma(1)} = 1$. The Rice code is worse for the outlier $301$ (the first appearance) and for the burst gap $1$, better for typical gaps near $N/\mathrm{df} \approx 24$, where it spends about $6$ bits against $\gamma$'s $9$.
:::
:::

### Measured on *Alice*

Encoding all $21\,227$ gaps of the paragraph index with each code gives (sizes of the postings only, excluding the dictionary):

```text
fixed 32-bit       679264 bits  32.00 bits/posting
fixed 10-bit       212270 bits  10.00 bits/posting
variable byte      190920 bits   8.99 bits/posting
gamma              148147 bits   6.98 bits/posting
delta              144921 bits   6.83 bits/posting
Rice, per-term k   122332 bits   5.76 bits/posting
lower bound sum log2 C(N, df) = 117604 bits, 5.54 bits/posting
```

The last line is a bound explained in [[#prop-subset-bound]]. This is a tiny collection — with only $800$ documents a fixed-width code needs only $10$ bits — so the gains over fixed width look modest. In a collection of $N = 10^9$ documents the fixed width is $30$ bits while the gaps of frequent terms remain tiny, and compressed indexes are routinely a fifth to a tenth of their uncompressed size. The ranking of the codes is typical: variable-byte is about one byte per posting, the Elias codes do better, and a parameterised code matched to each term's density does better still.

::: proposition A lower bound for a posting list {#prop-subset-bound}
Any encoding that can represent every set of $f$ docIDs from $\set{1, \dots, N}$ must use at least $\lceil \log_2 \binom{N}{f} \rceil$ bits for some such set. Moreover $\log_2 \binom{N}{f} \approx f \log_2(N/f) + f \log_2 e$ when $f \ll N$.
:::

::: proof
There are $\binom{N}{f}$ distinct sets, and an encoding into bit strings of length at most $\ell$ can distinguish at most $2^{\ell + 1} - 1$ of them, so $\ell \ge \log_2 \binom{N}{f} - 1$ for some set; a fixed-length encoding needs $\lceil \log_2 \binom{N}{f}\rceil$ bits exactly. For the approximation, $\binom{N}{f} = \frac{N(N-1)\cdots(N-f+1)}{f!}$; for $f \ll N$ the numerator is about $N^f$, and Stirling's formula gives $\log_2 f! \approx f \log_2 f - f \log_2 e$, so $\log_2\binom{N}{f} \approx f\log_2 N - f\log_2 f + f\log_2 e$.
:::

Summed over all terms, this bound is $5.54$ bits per posting for *Alice*, and the per-term Rice code comes within $0.22$ bits of it. Codes can beat the bound on typical lists only by exploiting structure that the counting argument ignores, such as burstiness and the clustering of related documents — which is why the assignment of docIDs matters ([[#ex-reorder]]).

::: widget plot
f: 2*floor(log2(x)) + 1; floor(log2(x)) + 2*floor(log2(floor(log2(x)) + 1)) + 1; 8*(floor(floor(log2(x))/7) + 1); log2(x)
x: 1, 300
y: 0, 24
labels: |\gamma(n)|; |\delta(n)|; \text{variable byte}; \log_2 n
caption: Codeword lengths in bits for the integers $1$ to $300$. The staircase of $\gamma$ climbs two bits per doubling of $n$, $\delta$ about one bit plus a slowly growing length field, and variable-byte jumps from $8$ to $16$ bits at $n = 128$. For gaps below about $30$, $\gamma$ is shortest; $\gamma$ and $\delta$ cross over near $n = 32$; zoom out ($x$ up to $10^5$) to see $\delta$ win for large gaps.
:::

::: quiz
A frequent term occurs in nearly every document, so almost all its gaps are $1$. Approximately how many bits per posting do the $\gamma$ code and the variable-byte code use for it?
- [x] $\gamma$: about $1$; variable-byte: $8$
- [ ] $\gamma$: about $3$; variable-byte: $1$
- [ ] Both about $8$
- [ ] $\gamma$: $0$, because the gaps carry no information
::: solution
$\gamma(1) = \texttt{0}$ is one bit, while variable-byte never uses less than a byte. In *Alice*, the list of `the` costs $1.47$ bits per gap in $\gamma$ and exactly $8$ in variable-byte. For such dense lists a bit vector ($1$ bit per document) is another option, and engines often switch representation when a list becomes dense.
:::
:::

## Speed: why compression makes search faster

A compressed index is smaller, but is it slower? Decoding costs CPU time, yet reading from storage, or even from main memory, is slower still. If an index is $4$ times smaller, four times as much of it fits in the memory cache, and each list is read with a quarter of the transfers. Scholer, Williams, Yiannis and Zobel (2002) showed that byte-aligned codes made query evaluation *faster* than an uncompressed index, because the saved transfer time exceeded the decoding time; bit-level codes such as $\gamma$ compressed better but decoded more slowly. Since then the design of codes has been driven by what modern processors do quickly — few branches, whole machine words, SIMD instructions:

- **Word-aligned codes** such as Simple-9 (Anh and Moffat, 2005) pack as many small gaps as fit into one $32$-bit word, with $4$ selector bits saying how they are packed.
- **Frame-of-reference** and **PForDelta** codes (Zukowski, Héman, Nes and Boncz, 2006) encode a block of, say, $128$ gaps with the same bit width $w$, chosen so that most gaps fit, and store the few larger **exceptions** separately; unpacking $128$ values of $w$ bits is a branch-free loop that vectorises well.
- **Elias–Fano** encoding (revived for indexes by Vigna, 2013) stores a monotone sequence of $f$ values below $N$ in at most $f\bigl(2 + \lceil \log_2(N/f) \rceil\bigr)$ bits — within about $2$ bits per element of [[#prop-subset-bound]] — and supports jumping to the first value $\ge x$ without decoding everything before it.

Which code is best depends on the hardware and the query mix, and benchmarks change as processors change; as of 2026, block-based schemes in the PForDelta family and Elias–Fano variants are common in research and production systems, and Lucene has long stored postings in bit-packed blocks of $128$. The principles are stable: encode gaps, choose code lengths that match the distribution of gaps, organise lists in blocks with skip information so that query processing ([[information-retrieval/vector-space]]) can jump over blocks it does not need, and measure the speed of decoding as well as the space.

::: warning "Compression is a trade of time for space"
For an index this is usually false. Decoding a few bits per posting with a good code is faster than reading $32$ uncompressed bits per posting from memory or disk, so a well-compressed index is both smaller *and* faster. The trade-off appears only at the extremes: the codes that compress best (arithmetic coding, per-term adaptive models) decode too slowly, and a code that decodes fastest (uncompressed arrays) wastes memory bandwidth. The best design point has moved over the years with hardware, from bit-level codes to byte- and word-aligned to SIMD block codes, and it must be re-measured rather than assumed.
:::

## Compressing the dictionary

The dictionary is small next to the postings, but it should stay in memory, because every query term is looked up in it. A dictionary of $V$ terms stored as fixed-width records wastes space on short terms; instead store all terms concatenated in one long string and keep, for each term, a pointer into the string. **Blocking** stores a pointer only for every $k$-th term and prefixes each term with its length byte, so a lookup binary-searches the block pointers and then scans at most $k$ terms. **Front coding** exploits the sorted order: within a block, each term records the length of the prefix it shares with the previous term and the remaining suffix.

::: example Front coding {#ex-front-coding}
Front-code the sorted terms of *Alice* beginning with `beg`: `beg`, `began`, `begged`, `begin`, `beginning`, `begins`, `begun`.
::: solution
Write each term as (length of prefix shared with the previous term, rest): `beg` $(0, \texttt{beg})$, `began` $(3, \texttt{an})$, `begged` $(3, \texttt{ged})$, `begin` $(3, \texttt{in})$, `beginning` $(5, \texttt{ning})$, `begins` $(5, \texttt{s})$, `begun` $(3, \texttt{un})$. The suffixes have $3 + 2 + 3 + 2 + 4 + 1 + 2 = 17$ characters, plus one prefix-length byte per term (and a suffix length or terminator): about $31$ bytes, against $39$ characters for the terms in full. To read `begins` the decoder must reconstruct the block from its start, which is why front coding works within blocks of $k$ terms, each starting with a term written out in full.
:::
:::

Lucene goes further and stores its term dictionary as a **finite-state transducer**, an automaton that shares both prefixes and suffixes of terms and maps each term to the location of its postings; automata are developed in [[theory-of-computation]].

::: history
Peter Elias introduced the $\gamma$ and $\delta$ codes in "Universal codeword sets and representations of the integers" (*IEEE Transactions on Information Theory*, 1975). Solomon Golomb's "Run-length encodings" (1966) gave the code bearing his name, and Robert Gallager and David Van Voorhis proved its optimality for geometric distributions in 1975; Robert Rice described the power-of-two special case in 1979. Leon Kraft's inequality is from his 1949 master's thesis at MIT, and Brockway McMillan extended it to all uniquely decodable codes in 1956. The application of these codes to inverted files was developed in the 1990s by Alistair Moffat, Justin Zobel and colleagues in Melbourne, and summarised in Witten, Moffat and Bell's *Managing Gigabytes* (1994; 2nd edition 1999). Steffen Heinz and Justin Zobel described single-pass in-memory indexing in 2003. Falk Scholer and colleagues showed in 2002 that compression speeds up query evaluation, and Justin Zobel and Alistair Moffat's survey "Inverted files for text search engines" (*ACM Computing Surveys*, 2006) remains the standard overview of the area.
:::

## Where this leads

Compressed, block-organised posting lists are what the scoring algorithms of [[information-retrieval/vector-space]] actually traverse; their block directories let the WAND and MaxScore algorithms skip whole blocks, and storing a maximum score per block, as modern engines do, makes skipping even more effective. Term frequencies and positions are compressed with the same codes (term frequencies are small integers, positions are gap-encoded within each document). Distributed construction and partitioning of indexes across machines is the subject of [[distributed-systems/data-processing]] and returns in [[information-retrieval/web-search]]. The codes themselves — prefix codes, Kraft's inequality, entropy — belong to information theory, which also underlies the compression of the dense vectors used in [[information-retrieval/dense-retrieval]].

::: summary
- Indexes larger than memory are built by writing sorted runs and merging them: BSBI with termIDs ([[#alg-bsbi]]) or SPIMI with per-run dictionaries ([[#alg-spimi]]); at scale, by a distributed sort.
- Dynamic collections use an in-memory index plus on-disk indexes; **logarithmic merging** writes $O(T \log(T/n))$ postings instead of $\Theta(T^2/n)$ ([[#thm-log-merge]]).
- Posting lists are stored as **gaps** ([[#def-gaps]]), small integers whose average is about $N/\mathrm{df}$.
- **Variable-byte** ([[#def-vbyte]]) is simple and fast but never uses fewer than $8$ bits; **$\gamma$** uses $2\lfloor\log_2 n\rfloor + 1$ bits and **$\delta$** $\log_2 n + O(\log\log n)$ ([[#thm-gamma-length]]); both are prefix codes ([[#lem-prefix]]).
- The **Kraft inequality** ([[#thm-kraft]]) limits how short codes can be; a code is optimal for the distribution $2^{-\ell(n)}$, and **Golomb–Rice** codes ([[#def-golomb]]) are optimal for geometric gaps with $b \approx 0.69 N/\mathrm{df}$.
- A list of $f$ docIDs needs about $f \log_2(N/f) + 1.44 f$ bits in the worst case ([[#prop-subset-bound]]); on *Alice* the per-term Rice code is within $4\%$ of this.
- Good compression makes search **faster**, not slower; modern systems use block-based, word-aligned or SIMD codes and Elias–Fano, chosen by measurement.
:::

## Exercises

::: exercise Gamma code {level=1 check="9"}
Write the $\gamma$ code of $19$. How many bits does it have? (Enter the length.)
::: solution
$19 = 10011_2$, so $\lambda = 4$ and the offset is `0011`. The unary code of $4$ is `11110`, so $\gamma(19) = \texttt{11110}\,\texttt{0011}$, with $2 \cdot 4 + 1 = 9$ bits.
:::
:::

::: exercise Variable-byte length {level=1 check="3"}
How many bytes does the variable-byte code of $100\,000$ use? (Enter the number of bytes.)
::: solution
$2^{16} = 65\,536 \le 100\,000 < 2^{17}$, so $100\,000$ has $17$ binary digits and needs $\lceil 17/7 \rceil = 3$ bytes. Directly: $100\,000 = 6 \cdot 128^2 + 13 \cdot 128 + 32$, three base-$128$ digits.
:::
:::

::: exercise Decoding by hand {level=1}
Decode the $\gamma$-coded bit string `1110001110101011111101101111011` into a list of gaps, and then into docIDs.
::: solution
Read a unary length, then that many offset bits. `1110` gives $\lambda = 3$, offset `001`: $1001_2 = 9$. Next `110`: $\lambda = 2$, offset `10`: $110_2 = 6$. Next `10`: $\lambda = 1$, offset `1`: $11_2 = 3$. Next `111110`: $\lambda = 5$, offset `11011`: $111011_2 = 59$. Next `110`: $\lambda = 2$, offset `11`: $111_2 = 7$. The gaps are $9, 6, 3, 59, 7$ and the docIDs, their prefix sums, are $9, 15, 18, 77, 84$. Check: $\abs{\gamma}$ values $7 + 5 + 3 + 11 + 5 = 31$ bits, the length of the string.
:::
:::

::: exercise Gamma against delta {level=2 check="32"}
Find the smallest $n$ for which $\abs{\delta(n)} < \abs{\gamma(n)}$. (Enter $n$.)
::: solution
With $\lambda = \lfloor \log_2 n \rfloor$, $\abs{\gamma(n)} - \abs{\delta(n)} = (2\lambda + 1) - (\lambda + 2\lfloor\log_2(\lambda+1)\rfloor + 1) = \lambda - 2\lfloor\log_2(\lambda + 1)\rfloor$. For $\lambda = 1, 2, 3, 4$ this is $1 - 2 = -1$, $2 - 2 = 0$, $3 - 4 = -1$, $4 - 4 = 0$; for $\lambda = 5$ it is $5 - 4 = 1 > 0$. So $\delta$ is first strictly shorter at $\lambda = 5$, i.e. $n = 32$: $\abs{\gamma(32)} = 11$ and $\abs{\delta(32)} = 5 + 2\cdot 2 + 1 = 10$. For $n \le 31$ the $\gamma$ code is never longer.
:::
:::

::: exercise Kraft for gamma {level=2}
Show that the $\gamma$ code satisfies the Kraft inequality with equality, $\sum_{n \ge 1} 2^{-\abs{\gamma(n)}} = 1$, and explain what equality means for a prefix code.
::: solution
There are $2^\lambda$ integers $n$ with $\lfloor \log_2 n \rfloor = \lambda$ (from $2^\lambda$ to $2^{\lambda+1} - 1$), each with a codeword of $2\lambda + 1$ bits. So
$$
\sum_{n \ge 1} 2^{-\abs{\gamma(n)}} = \sum_{\lambda \ge 0} 2^\lambda \cdot 2^{-(2\lambda+1)} = \sum_{\lambda \ge 0} 2^{-\lambda - 1} = 1.
$$
Equality means the code is **complete**: the dyadic intervals of the codewords ([[#thm-kraft]]) cover $[0, 1)$ up to a set of measure zero, so no codeword can be shortened, and every infinite bit string begins with a codeword. Such a code wastes no "coding space", but it is optimal only for the distribution $p(n) = 2^{-\abs{\gamma(n)}} \approx 1/(2n^2)$ that it implicitly assumes.
:::
:::

::: exercise The Golomb rule {level=2}
For geometric gaps $\Prob(g = k) = (1 - p)^{k-1}p$, the Golomb code with parameter $b$ spends $q + 1$ unary bits where $q = \lfloor (g - 1)/b \rfloor$. Show that the probability that $q \ge 1$ is $(1-p)^b$, and use this to explain why choosing $b$ with $(1-p)^b \approx 1/2$, i.e. $b \approx (\ln 2)/p$, is natural. Evaluate for $p = 0.01$.
::: solution
$q \ge 1$ exactly when $g > b$, i.e. when the first $b$ documents after the previous posting all lack the term, which has probability $(1-p)^b$. More generally $\Prob(q \ge j) = (1-p)^{jb}$, so $q$ is itself geometric with ratio $(1-p)^b$. The unary code is the optimal prefix code for a geometric distribution of ratio $1/2$ (its codeword lengths $q + 1$ are exactly $-\log_2$ of the probabilities $2^{-(q+1)}$), so we want $(1 - p)^b = 1/2$, i.e. $b = \ln 2 / (-\ln(1-p)) \approx (\ln 2)/p$ for small $p$. The remainder $r = (g - 1) \bmod b$ is then nearly uniform on $\set{0, \dots, b-1}$, for which (truncated) binary is optimal. For $p = 0.01$: $b \approx 0.693/0.01 = 69.3$; exactly, $\ln 2/(-\ln 0.99) = 68.97$, so $b = 69$, and the Rice code would round to $64$.
:::
:::

::: exercise Logarithmic merging and query cost {level=3}
In logarithmic merging ([[#thm-log-merge]]) a query must consult every non-empty on-disk index. (a) After $c$ flushes, how many indexes exist? (b) A variant merges $r$ indexes of equal size at a time ("$r$-way merging"), so that sizes are $n, rn, r^2 n, \dots$ and up to $r - 1$ indexes of each size may exist. Show that each posting is written $O(\log_r (T/n))$ times and that up to $(r - 1)\lceil \log_r(T/n) \rceil$ indexes may exist. What does increasing $r$ trade?
::: solution
(a) The indexes mirror the binary representation of $c$: index $I_i$ is non-empty exactly when bit $i$ of $c$ is $1$. So the number of indexes is the number of $1$ bits of $c$, between $1$ and $\lfloor\log_2 c\rfloor + 1$.

(b) Now the indexes mirror the base-$r$ representation of $c$: level $i$ holds as many indexes of size $r^i n$ as the $i$-th base-$r$ digit of $c$, at most $r - 1$, and when an $r$-th index of a level would appear the $r$ indexes are merged into one at the next level (a carry). Each posting is written once when flushed and once per carry it takes part in, each moving it up one level; the top level $i$ has $r^i n \le T$, so a posting is written at most $\log_r(T/n) + 1$ times, $O(\log_r(T/n))$, and the total is $O(T\log_r(T/n))$. The number of indexes is the digit sum of $c$ in base $r$, at most $(r - 1)$ times the number of digits, $(r - 1)\lceil\log_r(T/n)\rceil$ up to rounding. Increasing $r$ reduces the construction cost (fewer levels, each posting rewritten fewer times) but increases the number of indexes a query must consult. At the extremes, $r = 2$ is logarithmic merging and $r = T/n$ is "never merge" (no rewriting, $T/n$ indexes per query); immediate merging is the opposite extreme of a single index and quadratic cost.
:::
:::

::: exercise Reordering documents {#ex-reorder level=3}
The size of a gap-encoded index depends on how docIDs are assigned. (a) Show that if a term occurs in $f$ documents, the sum of its gaps is at most $N$, and that for the $\gamma$ code the total length is at most $f(2\log_2(N/f) + 1)$. (b) Explain why assigning consecutive docIDs to similar documents (for example, sorting web pages by URL, so that pages of the same site are adjacent) reduces the size of the index, even though every list has the same length $f$.
::: solution
(a) The gaps $g_1, \dots, g_f$ sum to the last docID, at most $N$. By [[#thm-gamma-length]], $\abs{\gamma(g)} \le 2\log_2 g + 1$, and since $\log_2$ is concave, Jensen's inequality gives $\sum_i \log_2 g_i \le f \log_2\bigl(\frac{1}{f}\sum_i g_i\bigr) \le f\log_2(N/f)$. Hence the total is at most $f(2\log_2(N/f) + 1)$.

(b) The bound in (a) is attained when the gaps are all equal, $N/f$; the length is much smaller when the gaps are **uneven** — many small gaps and a few large ones — because $\log_2$ is concave: replacing two gaps $a, b$ by $1$ and $a + b - 1$ keeps their sum but reduces $\log_2 a + \log_2 b$ to $\log_2(a + b - 1)$ when $a, b \ge 2$. Similar documents share vocabulary, so putting them next to each other turns each term's occurrences into **runs** of nearby docIDs — small gaps inside a cluster, a large jump between clusters. Sorting by URL groups pages of a site, which share navigation text, language and topic; reported index-size reductions from such reordering are substantial (tens of percent), and the effect is larger for codes such as $\gamma$ and Elias–Fano partitions that adapt to local density. This is the same effect that burstiness has on the gaps of `hatter` in *Alice*.
:::
:::

::: exercise Implement a Rice decoder {level=2}
Write `rice_decode(bits, k, i)` returning the decoded value and the next position, the inverse of the `rice` function above, and test it by encoding and decoding the gaps $301, 18, 1$ with $k = 4$.
::: solution
```python
def rice(n, k):
    q, r = (n - 1) >> k, (n - 1) & ((1 << k) - 1)
    return "1" * q + "0" + (format(r, f"0{k}b") if k else "")

def rice_decode(bits, k, i=0):
    q = 0
    while bits[i] == "1": q += 1; i += 1      # unary quotient
    i += 1                                     # skip the terminating 0
    r = int(bits[i:i + k], 2) if k else 0      # k-bit remainder
    return (q << k) + r + 1, i + k

bits = "".join(rice(g, 4) for g in [301, 18, 1])
i, out = 0, []
while i < len(bits):
    v, i = rice_decode(bits, 4, i); out.append(v)
print(len(bits), out)
```
```text
34 [301, 18, 1]
```
The $34$ bits are the $23 + 6 + 5$ of [[#ex-golomb]].
:::
:::
