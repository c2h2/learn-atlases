Which chapters of *Alice's Adventures in Wonderland* mention both the Rabbit and the Queen? A program can answer by reading all $12$ chapters, $26\,658$ words, and noting where both words occur. That takes milliseconds for one book and is how the Unix tool `grep` works. For a library of ten million books it means reading about $500$ GB of text for every query, and for a web search engine, whose collection is measured in hundreds of billions of pages, it is out of the question: at $1$ GB/s a single scan of a $100$ TB collection takes more than a day. The answer is to do the reading once, in advance, and to record for every word the list of places where it occurs — the index at the back of a book, built by machine for every word.

This chapter builds that structure, the **inverted index**, and uses it to answer **Boolean queries** (`rabbit AND queen`, `cat OR dormouse`, `rabbit AND NOT queen`), **phrase queries** (`"white rabbit"`) and **wildcard queries** (`rab*`). We prove the merge algorithm for intersecting posting lists correct and linear, show how query order and **galloping search** reduce the cost to nearly $m \log(n/m)$ for lists of lengths $m \le n$, extend postings with positions for phrases, and look at the dictionary that maps terms to their lists. The terms come from the text processing of [[information-retrieval/text-processing]]; the dictionary uses the hash tables of [[data-structures/hash-tables]] or the B+-trees of [[databases/storage-indexing]]. Throughout, the running example is *Alice* split into its $12$ chapters, $d_1, \dots, d_{12}$.

## From incidence matrix to inverted index

The most direct representation of "which words occur in which documents" is a table.

::: definition Term–document incidence matrix {#def-incidence}
For a collection of $N$ documents and a vocabulary of $V$ terms, the **incidence matrix** is the $V \times N$ matrix $A$ with $A_{t,d} = 1$ if term $t$ occurs in document $d$ and $A_{t,d} = 0$ otherwise. Row $t$ is the **incidence vector** of $t$.
:::

A Boolean query becomes bitwise arithmetic on rows. With chapters as documents, the rows for `rabbit` and `queen` are

| | $d_1$ | $d_2$ | $d_3$ | $d_4$ | $d_5$ | $d_6$ | $d_7$ | $d_8$ | $d_9$ | $d_{10}$ | $d_{11}$ | $d_{12}$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| rabbit | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 1 |
| queen | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |
| AND | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 1 |

so the answer to `rabbit AND queen` is $\set{d_8, d_{11}, d_{12}}$. For a toy collection this is perfect. For a real one the matrix is hopeless: a million documents with a vocabulary of a million terms give $10^{12}$ bits, $125$ GB. Yet almost all of it is zero. A document of $1\,000$ tokens has at most $1\,000$ ones in its column, so the matrix holds at most $10^9$ ones — at least $99.9\%$ zeros — and by Zipf's law ([[information-retrieval/text-processing#def-zipf]]) most rows have only a handful of ones. The sparse representation stores only the ones.

::: definition Inverted index {#def-inverted-index}
An **inverted index** consists of
- a **dictionary** (or **lexicon**): the set of terms, each with its **document frequency** $\mathrm{df}_t$, the number of documents containing $t$, and a pointer to its posting list; and
- for each term $t$, a **posting list** $P_t$: the sorted list of the identifiers (**docIDs**) of the documents that contain $t$. Each entry is a **posting**. Postings may carry more information: the **term frequency** $\mathrm{tf}_{t,d}$ (the number of occurrences of $t$ in $d$), and the positions of the occurrences.

The index is **inverted** in the sense that a document is naturally a list of terms, and the index lists, for each term, its documents.
:::

DocIDs are integers assigned to documents, usually in the order they are added to the collection; keeping each posting list sorted by docID is the decision on which everything in this chapter depends. Sorted lists can be merged in linear time, and the gaps between consecutive docIDs are small numbers that compress well ([[information-retrieval/index-compression]]).

### Building an index by sorting

::: algorithm Sort-based index construction {#alg-build}
Input: documents $d_1, \dots, d_N$, already tokenised and normalised.
1. For each document $d$ and each token $t$ of $d$, emit the pair $(t, d)$.
2. Sort all pairs by term, and pairs with the same term by docID.
3. Scan the sorted pairs. For each term, start a posting list; for each distinct docID, append it, with the number of equal pairs as $\mathrm{tf}_{t,d}$; set $\mathrm{df}_t$ to the length of the list.
:::

Because step 2 sorts by $(t, d)$, every posting list comes out sorted by docID with no further work. The cost is dominated by the sort, $O(T \log T)$ comparisons for $T$ tokens. When the pairs do not fit in memory this becomes an external sort, and then a distributed one; those versions are the subject of [[information-retrieval/index-compression]], and the MapReduce form, in which the shuffle does the sorting, is in [[distributed-systems/data-processing]].

::: example Building a small index {#ex-build}
Build the inverted index, with term frequencies, of $d_1$ = "The Rabbit ran.", $d_2$ = "The Queen ran after the rabbit." and $d_3$ = "A cat sat." after case folding.
::: solution
Step 1 emits $(\texttt{the},1), (\texttt{rabbit},1), (\texttt{ran},1), (\texttt{the},2), (\texttt{queen},2), (\texttt{ran},2), (\texttt{after},2), (\texttt{the},2), (\texttt{rabbit},2), (\texttt{a},3), (\texttt{cat},3), (\texttt{sat},3)$: $12$ pairs. Sorting gives
$$
\begin{aligned}
&(\texttt{a},3), (\texttt{after},2), (\texttt{cat},3), (\texttt{queen},2), (\texttt{rabbit},1), (\texttt{rabbit},2),\\
&(\texttt{ran},1), (\texttt{ran},2), (\texttt{sat},3), (\texttt{the},1), (\texttt{the},2), (\texttt{the},2).
\end{aligned}
$$
Grouping (postings written $d\!:\!\mathrm{tf}$):

| term | df | postings |
|---|---|---|
| a | 1 | 3:1 |
| after | 1 | 2:1 |
| cat | 1 | 3:1 |
| queen | 1 | 2:1 |
| rabbit | 2 | 1:1, 2:1 |
| ran | 2 | 1:1, 2:1 |
| sat | 1 | 3:1 |
| the | 2 | 1:1, 2:2 |

There are $8$ terms and $11$ postings; the two pairs $(\texttt{the}, 2)$ became one posting with $\mathrm{tf} = 2$.
:::
:::

The same construction in Python, for the twelve chapters of *Alice*:

```python
import re
from collections import defaultdict

text = open("alice.txt", encoding="utf-8").read()
chapters = re.split(r"\n\s*CHAPTER [IVXL]+\s*\n", text)[1:]      # 12 documents
docs = [re.findall(r"[a-z]+(?:'[a-z]+)?", c.lower()) for c in chapters]

pairs = sorted({(t, d) for d, toks in enumerate(docs, 1) for t in toks})   # (term, docID), sorted
index = defaultdict(list)
for t, d in pairs:
    index[t].append(d)                        # docIDs arrive in increasing order

print("terms", len(index), "postings", len(pairs))
for t in ("rabbit", "hatter", "queen", "cat", "turtle", "gryphon", "dormouse", "tarts"):
    print(f"{t:9s} df={len(index[t]):2d} {index[t]}")
```
```text
terms 2618 postings 7348
rabbit    df= 7 [1, 2, 4, 8, 10, 11, 12]
hatter    df= 3 [6, 7, 11]
queen     df= 6 [6, 7, 8, 9, 11, 12]
cat       df= 5 [1, 2, 3, 6, 8]
turtle    df= 3 [9, 10, 12]
gryphon   df= 4 [9, 10, 11, 12]
dormouse  df= 2 [7, 11]
tarts     df= 2 [11, 12]
```

The $26\,658$ tokens of the chapters (the `CHAPTER` lines removed, chapter titles kept) collapse into $7\,348$ postings, an average of $2.8$ per term. The posting lists already tell a story: the Hatter and the Dormouse are at the tea party (chapter 7) and the trial (chapter 11), the Gryphon appears in chapter 9 and stays to the end.

## Boolean retrieval

::: definition Boolean retrieval model {#def-boolean}
A **Boolean query** is an expression built from terms with the operators AND, OR and NOT. Its answer is a set of documents: a term denotes its posting list as a set, AND denotes intersection, OR union and NOT complement relative to the whole collection. A document is either in the answer or not; the model has no notion of one document matching *better* than another.
:::

The core operation is the intersection of two sorted posting lists, which walks both lists in step like the merge of merge sort.

::: algorithm Intersecting two posting lists {#alg-intersect}
Input: sorted lists $p_1$ of length $x$ and $p_2$ of length $y$.
1. $i \gets 0$, $j \gets 0$, $\mathit{answer} \gets$ empty list.
2. While $i < x$ and $j < y$:
   1. if $p_1[i] = p_2[j]$: append $p_1[i]$ to $\mathit{answer}$; $i \gets i + 1$; $j \gets j + 1$;
   2. else if $p_1[i] < p_2[j]$: $i \gets i + 1$;
   3. else $j \gets j + 1$.
3. Return $\mathit{answer}$.
:::

```python
def intersect(p1, p2):
    answer, i, j, comps = [], 0, 0, 0
    while i < len(p1) and j < len(p2):
        comps += 1                                  # count loop iterations (comparisons)
        if p1[i] == p2[j]:
            answer.append(p1[i]); i += 1; j += 1
        elif p1[i] < p2[j]:
            i += 1
        else:
            j += 1
    return answer, comps

print(intersect(index["rabbit"], index["queen"]))
```
```text
([8, 11, 12], 10)
```

::: theorem Correctness and cost of the merge intersection {#thm-intersect}
For sorted lists $p_1, p_2$ of distinct elements, of lengths $x$ and $y$, [[#alg-intersect]] returns exactly the elements common to both, in sorted order, after at most $x + y - 1$ iterations (for $x, y \ge 1$). Hence it runs in $\Theta(x + y)$ time in the worst case.
:::

::: proof
*Correctness.* **Claim:** an element is passed over (its pointer advanced without output) only if it does not occur in the other list. Suppose $p_1[i] < p_2[j]$ and we advance $i$. Every element of $p_2$ from position $j$ on is at least $p_2[j] > p_1[i]$, so $p_1[i]$ is not among them. Every element $p_2[j']$ with $j' < j$ was itself passed over or output at some earlier iteration, when it was compared with some $p_1[i']$, $i' \le i$; if it was output it equals $p_1[i']$ with $i' < i$, which is smaller than $p_1[i]$ since $p_1$ is strictly increasing; if it was passed over then $p_2[j'] < p_1[i'] \le p_1[i]$. Either way $p_2[j'] \ne p_1[i]$. So $p_1[i]$ is not in $p_2$, and the case $p_1[i] > p_2[j]$ is symmetric.

By the claim, neither copy of a common element $c$ is ever passed over. When the loop stops, one list is exhausted, so each of its elements was either output or passed over; the copy of $c$ in that list was not passed over, so $c$ was output. Conversely, an element is output only when $p_1[i] = p_2[j]$, so everything output is common. The outputs are increasing because both pointers move forwards through increasing lists.

*Cost.* Every iteration increases $i + j$ by at least $1$. Before the last iteration both lists are unexhausted, so $i \le x - 1$ and $j \le y - 1$ and $i + j \le x + y - 2$. As $i + j$ starts at $0$, at most $x + y - 2$ iterations precede the last one, hence there are at most $x + y - 1$ in all, each taking constant time.
:::

The union (OR) and difference (AND NOT) of two sorted lists are computed by the same walk, appending in different cases, and also take $\Theta(x + y)$ time. Note that `NOT queen` alone would mean the complement of a posting list, which is as long as the collection; a query processor therefore evaluates `rabbit AND NOT queen` as a difference of two lists and never materialises the complement.

::: widget venn
sets: 3
expr: (A | B) & C'
labels: rabbit; cat; queen
caption: The query `(rabbit OR cat) AND NOT queen` as a region of the Venn diagram of the three posting lists. Type another expression, such as `A & B & C` or `(A & C) | B`, and think about the order in which a query processor would merge the lists to compute it. On *Alice*'s chapters this query returns $\set{d_1, d_2, d_3, d_4, d_{10}}$ ([[#ex-boolean]]).
:::

::: example Evaluating a Boolean query {#ex-boolean}
Evaluate `(rabbit OR cat) AND NOT queen` on the chapters of *Alice*, using the posting lists printed above.
::: solution
$P_{\text{rabbit}} = [1, 2, 4, 8, 10, 11, 12]$ and $P_{\text{cat}} = [1, 2, 3, 6, 8]$. The union walk outputs each docID once: $[1, 2, 3, 4, 6, 8, 10, 11, 12]$ ($9$ documents). Subtract $P_{\text{queen}} = [6, 7, 8, 9, 11, 12]$: walking both lists, keep $1, 2, 3, 4$ (all smaller than $6$), drop $6$ and $8$ (in $P_{\text{queen}}$), keep $10$ (between $9$ and $11$), drop $11$ and $12$. The answer is $\set{d_1, d_2, d_3, d_4, d_{10}}$: the chapters with a rabbit or a cat but no queen.
:::
:::

### Query optimisation

A conjunction of $k$ terms, $t_1 \text{ AND } \dots \text{ AND } t_k$, can be evaluated by intersecting the lists two at a time in any order. The order matters.

::: proposition Processing in order of increasing frequency {#prop-df-order}
Evaluate $t_1 \text{ AND } \dots \text{ AND } t_k$ by intersecting the posting lists in increasing order of document frequency, $\mathrm{df}_{t_1} \le \mathrm{df}_{t_2} \le \dots \le \mathrm{df}_{t_k}$, keeping a running result $R$. Then every intermediate result has at most $\mathrm{df}_{t_1}$ elements, and with merge intersection the total number of iterations is at most
$$
(k - 1)\,\mathrm{df}_{t_1} + \sum_{i=2}^{k} \mathrm{df}_{t_i}.
$$
:::

::: proof
The running result after intersecting with $P_{t_i}$ is a subset of $P_{t_1}$, so $\abs{R} \le \mathrm{df}_{t_1}$ throughout. Intersecting $R$ with $P_{t_i}$ for $i = 2, \dots, k$ costs at most $\abs{R} + \mathrm{df}_{t_i} \le \mathrm{df}_{t_1} + \mathrm{df}_{t_i}$ iterations by [[#thm-intersect]]; summing over the $k - 1$ intersections gives the bound.
:::

Starting with the rarest term also lets the processor stop early: once $R$ is empty, the answer is empty. The document frequencies are stored in the dictionary precisely so that the processor can plan the order before touching any posting list. For general Boolean expressions the processor estimates the size of each subexpression — an OR is at most the sum of its operands, an AND at most the smaller — and orders the merges accordingly, a miniature of the cost-based optimisation of [[databases/query-optimisation]].

::: example Three-way conjunction {#ex-conjunction}
Evaluate `rabbit AND hatter AND dormouse` on *Alice*'s chapters in increasing order of df, counting iterations.
::: solution
The document frequencies are $\mathrm{df}_{\text{dormouse}} = 2$, $\mathrm{df}_{\text{hatter}} = 3$ and $\mathrm{df}_{\text{rabbit}} = 7$, so we intersect $[7, 11]$ with $[6, 7, 11]$ first: compare $7$ with $6$ (advance the second list), $7 = 7$ (output), $11 = 11$ (output) — $3$ iterations, $R = [7, 11]$. Then $R$ with $[1, 2, 4, 8, 10, 11, 12]$: $7$ against $1, 2, 4$ (advance three times), $7 < 8$ (advance $R$), $11$ against $8, 10$, then $11 = 11$ — $7$ iterations, $R = [11]$. In all $10$ iterations, and the answer is chapter $11$, "Who Stole the Tarts?". The bound of [[#prop-df-order]] is $2 \cdot 2 + 3 + 7 = 14$.
:::
:::

## Faster intersection

When one list is much shorter than the other — `dormouse` against `the`, or a rare name against a common word in a web-scale index, where lists of length $10^3$ and $10^9$ are both normal — walking the long list one posting at a time is wasteful. Almost all of its postings are skipped, and we would like to skip them in bulk.

The older remedy is **skip pointers**: every $s$-th posting of a long list stores a pointer to the posting $s$ places ahead, and the merge follows a skip pointer whenever its target is still smaller than the current element of the other list. A common heuristic places about $\sqrt{L}$ evenly spaced skips on a list of length $L$, balancing the number of skips followed against the steps walked between them. Skips help only for AND queries and cost space, and since they are fixed when the list is written, they cannot adapt to the other list. A more flexible approach needs only that the long list be stored so that its $i$-th element can be read directly, as in an array or in blocks of compressed postings with a small directory of block maxima.

::: algorithm Intersection by galloping search {#alg-gallop}
Input: a short sorted list $q$ of length $m$ and a long sorted list $p$ of length $n$, $m \le n$.
1. $j \gets 0$; $\mathit{answer} \gets$ empty list.
2. For each $x$ in $q$, in order:
   1. *Gallop.* Probe $p[j], p[j+1], p[j+3], p[j+7], \dots$, that is $p[j + 2^k - 1]$ for $k = 0, 1, 2, \dots$, until a probe is at least $x$ or runs off the end of $p$.
   2. *Binary search* between the last probe that was smaller than $x$ and the first that was not, for the first position $j'$ with $p[j'] \ge x$; set $j \gets j'$.
   3. If $j = n$, stop. If $p[j] = x$, append $x$ to $\mathit{answer}$.
3. Return $\mathit{answer}$.
:::

The exponential search of step 2.1 is due to Bentley and Yao (1976); combining it with a sweep through the short list is often called **galloping**, the name of the same technique in the merge step of the Timsort sorting algorithm.

```python
def gallop(p, lo, x, cnt):
    """Smallest index i >= lo with p[i] >= x (len(p) if none); cnt[0] counts comparisons."""
    prev, probe, step = lo - 1, lo, 1
    while probe < len(p):                 # probe lo, lo+1, lo+3, lo+7, ... until p[probe] >= x
        cnt[0] += 1
        if p[probe] >= x: break
        prev, probe, step = probe, probe + step, step * 2
    lo, hi = prev + 1, min(probe, len(p)) # p[prev] < x, and p[hi] >= x if hi < len(p)
    while lo < hi:                        # binary search for the first p[i] >= x in [lo, hi)
        mid = (lo + hi) // 2; cnt[0] += 1
        if p[mid] < x: lo = mid + 1
        else: hi = mid
    return lo

def intersect_gallop(short, long):
    out, j, cnt = [], 0, [0]
    for x in short:
        j = gallop(long, j, x, cnt)
        if j == len(long): break
        if long[j] == x: out.append(x)
    return out, cnt[0]
```

::: theorem Cost of galloping intersection {#thm-gallop}
[[#alg-gallop]] computes $q \cap p$ for sorted lists of distinct elements using at most
$$
2m \log_2\!\Bigl(\frac{n}{m} + 1\Bigr) + 3m
$$
comparisons. In particular it uses $O\bigl(m \log(n/m + 1)\bigr)$ comparisons, which is $O(m + n)$ always and much less than $n$ when $m \ll n$.
:::

::: proof
*Correctness.* Each search returns the first position $j'$ at or after the current $j$ with $p[j'] \ge x$. All positions before $j$ hold values smaller than an earlier element of $q$, hence smaller than $x$; so $x \in p$ if and only if $p[j'] = x$. Since $q$ is increasing, starting the next search at $j'$ skips nothing.

*Cost of one search.* Let $g \ge 0$ be the distance $j' - j$ the search advances. The gallop probes offsets $2^k - 1$ for $k = 0, 1, \dots$ and stops at the first $k$ with $2^k - 1 \ge g$ (or at the end of the list, which only makes it stop sooner), so it makes at most $K + 1$ probes where $K = \lceil \log_2(g + 1) \rceil$. The binary search then covers the positions strictly between offsets $2^{K-1} - 1$ and $2^K - 1$ inclusive of the latter, an interval of $2^{K-1}$ positions, which takes at most $K$ comparisons. So one search costs at most $2K + 1 \le 2\log_2(g + 1) + 3$ comparisons.

*Total.* Let $g_1, \dots, g_m$ be the advances. They sum to at most $n$, since $j$ never decreases and never exceeds $n$. The function $\log_2(g + 1)$ is concave, so by Jensen's inequality
$$
\sum_{i=1}^{m} \log_2(g_i + 1) \le m \log_2\!\Bigl(\frac{1}{m}\sum_i g_i + 1\Bigr) \le m \log_2\!\Bigl(\frac{n}{m} + 1\Bigr).
$$
Adding $3$ for each of the $m$ searches gives the bound. Finally, $\log_2(1 + u) \le u \log_2 e$ for $u \ge 0$, so $m \log_2(n/m + 1) \le n \log_2 e$ and the cost is also $O(m + n)$.
:::

An experiment (an observation on random data, not a theorem) shows how close the bound is. Draw a long list of $n = 10^6$ docIDs from $\set{0, \dots, 10^7 - 1}$ and short lists of $m$ elements, half of them taken from the long list:

```text
m=    10 found=     5 gallop comparisons=     323  m*log2(n/m)=      166  merge<=m+n=1000010
m=   100 found=    54 gallop comparisons=    2592  m*log2(n/m)=     1329  merge<=m+n=1000100
m=  1000 found=   552 gallop comparisons=   19216  m*log2(n/m)=     9966  merge<=m+n=1001000
m= 10000 found=  5498 gallop comparisons=  127048  m*log2(n/m)=    66439  merge<=m+n=1010000
m=100000 found= 54995 gallop comparisons=  654219  m*log2(n/m)=   332193  merge<=m+n=1100000
```

Galloping uses about $2m \log_2(n/m)$ comparisons, as the proof predicts — a factor of $3\,000$ fewer than merging when $m = 10$, and still better at $m = n/10$. The bound is close to optimal: there are $\binom{m+n}{m}$ ways to interleave two sorted lists, so by the decision-tree argument of [[algorithms/sorting-selection]] any comparison-based algorithm that *merges* them needs at least $\log_2 \binom{m+n}{m} \approx m \log_2(n/m) + m \log_2 e$ comparisons in the worst case, and similar lower bounds hold for intersection.

::: widget plot
f: 1 + x; 2*x*log2(1/x + 1)
x: 0.001, 1
y: 0, 2.2
labels: \text{merge } (m+n)/n; \text{galloping } 2m\log_2(n/m+1)/n
caption: Comparisons per element of the long list, as a function of the ratio $m/n$ of the list lengths. Galloping is far cheaper when one list is much shorter and loses only when the lists have similar lengths (the curves cross near $m/n \approx 0.3$), so a query processor chooses between the two by comparing the document frequencies — or uses galloping throughout, which is never worse than a small constant factor.
:::

::: quiz
A query processor intersects a list of $1\,000$ postings with one of $10^8$ postings. Roughly how many comparisons does galloping need, compared with about $10^8$ for the merge?
- [ ] About $10^3$
- [x] About $3 \times 10^4$
- [ ] About $10^7$
- [ ] About $10^8$; galloping only helps for lists in memory
::: solution
$2m \log_2(n/m) = 2 \times 1000 \times \log_2(10^5) \approx 2000 \times 16.6 \approx 3.3 \times 10^4$, about $3\,000$ times fewer than the merge. In a compressed on-disk index the long list is read in blocks, and the same idea skips whole blocks using a small directory of each block's largest docID.
:::
:::

## Phrase and proximity queries

Users put phrases in quotation marks — `"white rabbit"`, `"mock turtle"`, `"to be or not to be"` — and expect the words adjacent and in order. A docID-only index cannot check this: `white AND rabbit` matches any chapter containing both words anywhere. Two extensions solve the problem.

A **biword index** treats every pair of consecutive terms as a term of its own (`white rabbit`, `rabbit with`, …). A two-word phrase is then a single lookup, and a longer phrase `"a b c d"` becomes the conjunction `"a b" AND "b c" AND "c d"`, which can give false matches (the three biwords might occur separately). The dictionary grows enormously — there are far more distinct word pairs than words — so biwords are used selectively, for common phrases or for pairs involving stop words.

::: definition Positional index {#def-positional}
A **positional index** stores in each posting the sorted list of positions at which the term occurs in the document: $P_t = \langle (d, \mathrm{tf}_{t,d}, [k_1, k_2, \dots, k_{\mathrm{tf}}]), \dots \rangle$, where position $k$ means the $k$-th token of $d$ (counting from $0$). A document $d$ contains the phrase $t_1 t_2$ if and only if there is a position $k$ with $k$ in the positions of $t_1$ in $d$ and $k + 1$ in the positions of $t_2$ in $d$.
:::

::: algorithm Positional phrase intersection {#alg-phrase}
To find documents containing the phrase $t_1 t_2 \dots t_\ell$:
1. Intersect the docID lists of $t_1, \dots, t_\ell$ as in [[#alg-intersect]] (rarest first).
2. For each document $d$ in the intersection, let $S$ be the positions of $t_1$ in $d$. For $i = 2, \dots, \ell$: replace $S$ by $\set{k \in S : k + i - 1 \in \mathrm{pos}(t_i, d)}$, computed by merging the sorted list $S + (i - 1)$ with the positions of $t_i$. If $S$ becomes empty, $d$ does not contain the phrase.
3. Report $d$ (with the starting positions $S$) if $S$ is non-empty after the last term.
:::

Replacing "equals $k + i - 1$" by "lies within $k$ positions" gives **proximity queries** such as `rabbit /3 watch` (the two words at most three positions apart, in either order), which are standard in legal and patent search. Step 2 costs time linear in the number of positions examined, so a phrase query costs roughly the total term frequency of its words in the candidate documents — for phrases of common words such as `"to be or not to be"`, a great deal.

::: example A phrase in chapter 4 {#ex-phrase}
In chapter 4 of *Alice* ("The Rabbit Sends in a Little Bill"), the positional postings are $\mathrm{pos}(\texttt{white}) = [10, 83, 424]$ and $\mathrm{pos}(\texttt{rabbit}) = [1, 11, 132, 266, 318, 781, 1003, 1031, 1043, 1103, 1200, 1817]$. Does the chapter contain `"white rabbit"`, and where? Then look at the whole book.
::: solution
Shift the positions of `white` by one: $[11, 84, 425]$, and merge with the positions of `rabbit`. $11$ is in both lists; $84$ lies between $11$ and $132$, and $425$ between $318$ and $781$, so neither is. The phrase occurs once, starting at position $10$: the chapter begins with its title, so tokens $0$–$6$ are "the rabbit sends in a little bill", followed by "It was the White Rabbit, trotting slowly back again". The same computation on every chapter gives the number of occurrences of each phrase:

```text
white rabbit {1: 2, 2: 1, 4: 1, 8: 2, 10: 1, 11: 7, 12: 8}
mock turtle {9: 25, 10: 28, 12: 1}
march hare {6: 4, 7: 21, 11: 5, 12: 1}
```

Chapter 5 contains `white` once (Father William's hair "has become very white") but no `rabbit`, so it was eliminated at step 1 without looking at positions. And `white AND rabbit` matches exactly the same seven chapters as the phrase — at chapter granularity, unlike in a large collection, almost every co-occurrence happens to be the phrase.
:::
:::

Positions are expensive. The positional index of *Alice*'s chapters holds $26\,658$ positions — one per token — against $7\,348$ docID postings, $3.6$ times as many numbers. In a large collection with long documents the ratio is larger, and positional indexes are typically two to four times the size of docID-plus-tf indexes even after compression. Engines nevertheless store positions for most fields, because phrase matching and proximity are strong signals for ranking as well as for filtering.

## The dictionary and wildcard queries

The dictionary maps each term to its document frequency and the location of its posting list. Two structures are common.

- A **hash table** ([[data-structures/hash-tables]]) gives expected $O(1)$ lookup of an exact term (plus the cost of hashing it). It cannot answer "all terms beginning with `rab`", and it must be resized as the vocabulary grows, which by Heaps' law it always does ([[information-retrieval/text-processing#def-heaps]]).
- A **sorted structure** — a B+-tree ([[databases/storage-indexing]]), a sorted array searched by binary search, or a trie or finite-state transducer, as in Lucene — gives $O(\log V)$ lookup and keeps terms in lexicographic order, so a **prefix query** `rab*` is a range scan from `rab` up to (but excluding) `rac`.

A query with the wildcard elsewhere needs more. A **suffix query** `*bit` is a prefix query on a second dictionary of reversed terms (`tib*`), and `ra*it` is the intersection of the prefix query `ra*` with the suffix query `*it`.

::: definition Permuterm and $k$-gram indexes {#def-kgram}
The **permuterm index** of a term $w$ adds an end marker `$` and enters every rotation of `w$` into a sorted dictionary, each pointing to $w$: for `hat` the rotations are `hat$`, `at$h`, `t$ha` and `$hat`. A query `X*Y` is rotated to `Y$X*` and answered as a prefix query. The **$k$-gram index** maps each sequence of $k$ consecutive characters of `$w$` (with `$` marking both ends) to the list of terms containing it; a wildcard query is answered by intersecting the term lists of the $k$-grams of its fixed parts and then checking the candidates against the pattern.
:::

::: example Wildcards two ways {#ex-wildcard}
Find the terms of *Alice* matching `h*er` with the permuterm index, and the terms matching `red*` with a bigram ($k = 2$) index. Why does the bigram index need a post-filtering step?
::: solution
*Permuterm.* Rotate `h*er$` so that the `*` comes last: `er$h*`. A term $w$ matches `h*er` exactly when some rotation of `w$` begins with `er$h` — for `hatter$` it is the rotation `er$hatt`. A prefix scan of the permuterm dictionary for `er$h` returns exactly the matching terms; in *Alice* they are `hatter`, `her` and `however`.

*Bigrams.* With end markers, `red*` requires the bigrams `$r`, `re` and `ed`. Intersecting their three term lists gives $17$ terms of *Alice*: `red` and `reduced`, but also `received`, `recognised`, `remarked`, `replied`, `returned`, `roared` and nine others. All of them begin with `r` and contain `re` and `ed` *somewhere*, but only `red` and `reduced` contain them in the order and adjacency the pattern demands. A $k$-gram index records which pieces occur, not where, so every candidate must be checked against the pattern — a cheap string match on a short candidate list. The bigram index is much smaller than the permuterm index, which stores every rotation of every term.
:::
:::

### Spelling correction

The dictionary also supports **spelling correction**. For a query term not in the dictionary (`dormose`), candidate corrections are dictionary terms at small **edit distance** — the minimum number of insertions, deletions and substitutions turning one string into the other, computed by the dynamic programme of [[algorithms/dynamic-programming]] in $O(\abs{u}\cdot\abs{v})$ time. Computing it against all $V$ terms is too slow, so a $k$-gram index first retrieves terms that share many $k$-grams with the query (measured, for instance, by the Jaccard coefficient of the two $k$-gram sets, which returns in [[information-retrieval/web-search]]), and edit distance ranks only those. Among candidates at equal distance, the most frequent term in the collection or in past queries is the usual choice; web engines learn corrections from the query logs of users who retype their queries.

::: warning A Boolean index answers sets, not rankings
Boolean queries give **exact-match** semantics: every document in the answer satisfies the query and none outside it does. That is what professional searchers in law, patents and systematic medical reviews want, because they need to know exactly what they searched. For everyone else it is the wrong model. `rabbit AND queen AND hatter AND dormouse` returns nothing or a handful; `rabbit OR queen` returns thousands with no order. Users cannot steer between "too few" and "too many" by adding and removing operators, and there is no notion of *best* match. Ranked retrieval ([[information-retrieval/vector-space]]) keeps the inverted index but scores documents; most of the rest of this course is about how.
:::

::: history
Indexes of words are old: the first concordance of the Latin Bible, listing every occurrence of every word, was compiled by Dominican friars under Hugh of Saint-Cher around 1230. Mechanised **coordinate indexing**, in which a query intersects the lists of documents filed under each keyword, was introduced by Mortimer Taube in his Uniterm system in the early 1950s, and Hans Peter Luhn at IBM built keyword-in-context (KWIC) indexes by computer around 1960. Online Boolean search services — DIALOG (Lockheed, commercially available from 1972), MEDLINE (1971) and the LEXIS legal service (1973) — were the dominant form of retrieval for decades. Jon Bentley and Andrew Yao's "An almost optimal algorithm for unbounded searching" (1976) gave the exponential search used in galloping, and Erik Demaine, Alejandro López-Ortiz and Ian Munro's "Adaptive set intersections, unions, and differences" (SODA 2000) analysed intersection algorithms whose cost adapts to the input. Doug Cutting began writing the Lucene search library in 1999; it became an Apache project in 2001 and underlies many search engines today.
:::

## In practice

A production index is not one structure but many. New documents are indexed in memory and flushed as immutable **segments**, each a complete small inverted index, which are periodically merged in the background; deletions are recorded in a bit vector and removed at merge time ([[information-retrieval/index-compression]] analyses this logarithmic merging). Posting lists are stored compressed in blocks of, say, $128$ docIDs, with a small directory of the last docID of each block so that galloping can skip blocks without decompressing them. Large collections are **partitioned by document**: each machine indexes a subset of the documents, every query is sent to all machines, and the partial results are combined, as in the partitioned stores of [[distributed-systems/distributed-storage]]. Partitioning by term is possible but makes multi-term queries expensive, because their lists live on different machines.

## Where this leads

The inverted index is the foundation of everything that follows. [[information-retrieval/index-compression]] builds it for collections that do not fit in memory and compresses the docID gaps to a byte or less per posting. [[information-retrieval/vector-space]] adds term weights and scores documents instead of filtering them, using the same posting-list walks, now **document-at-a-time** with top-$k$ heaps and the WAND and MaxScore algorithms that skip documents that cannot make the top $k$ — galloping in another guise. Web-scale indexing, crawling and duplicate detection are in [[information-retrieval/web-search]].

::: summary
- An **inverted index** ([[#def-inverted-index]]) stores, for each term, its document frequency and a posting list of docIDs sorted in increasing order, optionally with term frequencies and positions; it is the sparse form of the incidence matrix ([[#def-incidence]]).
- It is built by emitting $(t, d)$ pairs and **sorting** them ([[#alg-build]]); at scale this becomes external and distributed sorting.
- **Boolean queries** ([[#def-boolean]]) are evaluated by walking sorted lists: intersection, union and difference take $\Theta(x + y)$ time ([[#thm-intersect]]); never materialise `NOT t`.
- Intersect **rarest first**: intermediate results never exceed the smallest df ([[#prop-df-order]]).
- **Galloping** intersection costs $O(m \log(n/m + 1))$ comparisons ([[#thm-gallop]]), close to the lower bound and much faster than merging when $m \ll n$; skip pointers are an older, less flexible alternative.
- **Positional indexes** ([[#def-positional]]) answer phrase and proximity queries by merging position lists ([[#alg-phrase]]), at two to four times the space.
- The dictionary is a hash table (exact lookup) or a sorted structure (prefix queries); permuterm and $k$-gram indexes handle general wildcards ([[#def-kgram]]), and $k$-grams with edit distance support spelling correction.
:::

## Exercises

::: exercise Counting postings {level=1 check="12"}
Build the docID-only inverted index of $d_1$ = "to be or not to be", $d_2$ = "to see or not to see", $d_3$ = "be what you see". How many postings does it contain? (Enter the number of postings.)
::: solution
The posting lists are `be` $\to [1, 3]$, `not` $\to [1, 2]$, `or` $\to [1, 2]$, `see` $\to [2, 3]$, `to` $\to [1, 2]$, `what` $\to [3]$ and `you` $\to [3]$: $7$ terms and $2 + 2 + 2 + 2 + 2 + 1 + 1 = 12$ postings. The $16$ tokens shrink to $12$ postings because repeated terms within a document (`to` and `be` in $d_1$, `to` and `see` in $d_2$) give one posting each, with $\mathrm{tf} = 2$.
:::
:::

::: exercise Merge iterations {level=1 check="6"}
How many loop iterations does [[#alg-intersect]] make on $p_1 = [2, 4, 6, 8]$ and $p_2 = [1, 2, 3, 9]$? (Enter the number of iterations.)
::: solution
$(2,1)$: advance $p_2$. $(2,2)$: output $2$, advance both. $(4,3)$: advance $p_2$. $(4,9)$: advance $p_1$. $(6,9)$: advance $p_1$. $(8,9)$: advance $p_1$, which is now exhausted. That is $6$ iterations, below the bound $x + y - 1 = 7$; the answer is $[2]$.
:::
:::

::: exercise Planning a query {level=1}
The document frequencies of four terms are $\mathrm{df}_a = 4\,000$, $\mathrm{df}_b = 300$, $\mathrm{df}_c = 90\,000$ and $\mathrm{df}_d = 25\,000$. In what order should `a AND b AND c AND d` be processed, and what bound on the number of merge iterations does [[#prop-df-order]] give? For `(a OR c) AND (b OR d)`, what order would you choose, using upper bounds on the sizes of the ORs?
::: solution
Increasing df: $b, a, d, c$. The bound is $(4 - 1) \cdot 300 + 4\,000 + 25\,000 + 90\,000 = 119\,900$ iterations. For the second query, $\abs{a \cup c} \le 94\,000$ and $\abs{b \cup d} \le 25\,300$; compute $b \text{ OR } d$ first (about $25\,300$ iterations), then $a \text{ OR } c$ (about $94\,000$), and intersect the smaller with the larger. Since both unions must be computed anyway, the order matters less here; what matters is that the final intersection could use galloping from the smaller union.
:::
:::

::: exercise Union and difference {level=2}
Write the merge-style algorithms for $p_1 \cup p_2$ and $p_1 \setminus p_2$ on sorted lists, and prove that each takes at most $x + y$ iterations.
::: solution
*Union.* While both lists are unexhausted: if $p_1[i] = p_2[j]$ output it and advance both; if $p_1[i] < p_2[j]$ output $p_1[i]$ and advance $i$; else output $p_2[j]$ and advance $j$. Then output the rest of whichever list remains. *Difference.* While both are unexhausted: if equal, advance both (output nothing); if $p_1[i] < p_2[j]$, output $p_1[i]$ and advance $i$; else advance $j$. Then output the rest of $p_1$.

Correctness follows the proof of [[#thm-intersect]]: an element is passed over only when the other list has moved beyond it, so it cannot occur there. For the cost, each iteration of the main loop and each element copied at the end advances $i + j$ by at least one, and $i + j \le x + y$ throughout, so there are at most $x + y$ steps. Both outputs are sorted, so they can be fed into further merges.
:::
:::

::: exercise Galloping by hand {level=2 check="8"}
Run [[#alg-gallop]] with $q = [7, 11]$ and $p = [1, 2, 4, 8, 10, 11, 12]$ (the lists of `dormouse` and `rabbit`), counting comparisons as in the listing. How many comparisons are made? (Enter the number.)
::: solution
For $x = 7$, starting at $j = 0$: probe $p[0] = 1 < 7$, $p[1] = 2 < 7$, $p[3] = 8 \ge 7$ — $3$ probes. Binary search in positions $[2, 3)$: compare $p[2] = 4 < 7$, so the first position with $p \ge 7$ is $3$ — $1$ comparison. $p[3] = 8 \ne 7$. For $x = 11$, starting at $j = 3$: probe $p[3] = 8$, $p[4] = 10$, $p[6] = 12 \ge 11$ — $3$ probes; binary search in $[5, 6)$: $p[5] = 11 \ge 11$ — $1$ comparison; $p[5] = 11$ matches. Total $3 + 1 + 3 + 1 = 8$ comparisons, and the answer is $[11]$; `intersect_gallop([7, 11], index["rabbit"])` returns `([11], 8)`. On lists this short galloping does no better than merging; its advantage is for $m \ll n$.
:::
:::

::: exercise A phrase of three words {level=2}
In a document the positions are $\mathrm{pos}(\texttt{to}) = [0, 4, 9, 15]$, $\mathrm{pos}(\texttt{be}) = [1, 5, 12]$, $\mathrm{pos}(\texttt{or}) = [2, 7]$. Use [[#alg-phrase]] to find all occurrences of the phrase `"to be or"`. Then find the pairs that satisfy the proximity query `to /2 or` (at most two positions apart, either order).
::: solution
$S = [0, 4, 9, 15]$. For `be` (offset $1$): keep $k$ with $k + 1 \in [1, 5, 12]$: $k = 0, 4$, so $S = [0, 4]$. For `or` (offset $2$): keep $k$ with $k + 2 \in [2, 7]$: only $k = 0$ ($4 + 2 = 6$ is not a position of `or`). The phrase occurs once, at position $0$. For `to /2 or`: pairs with $\abs{k_{\text{to}} - k_{\text{or}}} \le 2$ are $(0, 2)$, $(4, 2)$, $(9, 7)$; $(15, \cdot)$ is too far. So three pairs, and $(4, 2)$ has the words in the "wrong" order, which a proximity query allows.
:::
:::

::: exercise Space for skip pointers {level=3}
A posting list of length $L$ has a skip pointer every $s$ postings. Model an intersection with a much shorter list as: for each of the $m$ elements of the short list, the processor follows skip pointers until the next skip target is too large and then walks at most $s - 1$ postings. Show that, for a single lookup that must traverse the whole list, the number of steps is at most $L/s + s$, minimised at $s = \sqrt{L}$, and explain why this heuristic is less useful than galloping when $m$ varies.
::: solution
A traversal from the start to any position follows at most $\lceil L/s \rceil$ skips and then walks at most $s - 1$ postings, so at most $L/s + s$ steps (up to rounding). The function $L/s + s$ has derivative $-L/s^2 + 1$, zero at $s = \sqrt{L}$, where it equals $2\sqrt{L}$. That is the origin of the $\sqrt{L}$ heuristic. But it optimises a *single* lookup. With $m$ lookups spread through the list, the skips followed total at most $L/s$ for the whole intersection, not per lookup, while the walks cost up to $m(s - 1)$; the best $s$ is then about $\sqrt{L/m}$, which depends on the other list. Because skip pointers are fixed when the list is written, one spacing cannot suit both short and long partners. Galloping adapts automatically and achieves $O(m \log(L/m + 1))$ for every $m$ ([[#thm-gallop]]), needing only random access to the list (or a block directory).
:::
:::

::: exercise Biwords versus positions {level=3}
A collection has $T$ tokens and vocabulary $V$. (a) Give an upper bound on the number of entries in the dictionary of a biword index and on the number of biword postings. (b) A phrase query of $\ell \ge 3$ words is answered by the biword index as a conjunction of $\ell - 1$ biwords. Construct a document that is returned but does not contain the phrase. (c) Why does a positional index never make this mistake?
::: solution
(a) Each of the $T - 1$ adjacent token pairs (per document, a few fewer at document boundaries) is an occurrence of one biword, so there are at most $T - 1$ distinct biwords and at most $T - 1$ postings — and also at most $V^2$ distinct biwords. In practice the number of distinct biwords is a large multiple of $V$, which is the problem. (b) For `"to be or"`, the biwords are `to be` and `be or`. The document "to be honest, let it be or not" contains both biwords but not the phrase. (c) The positional algorithm checks that the occurrences line up at consecutive positions $k, k+1, \dots, k + \ell - 1$ for one starting position $k$, which is exactly the definition of the phrase occurring; the biword conjunction checks only that each adjacent pair occurs somewhere.
:::
:::

::: exercise Permuterm size {level=2 check="6"}
How many entries does the permuterm index add for the term `alice`? (Enter the number of rotations.)
::: solution
The string `alice$` has $6$ characters and so $6$ rotations: `alice$`, `lice$a`, `ice$al`, `ce$ali`, `e$alic`, `$alice`. In general a term of length $\ell$ contributes $\ell + 1$ entries, so the permuterm dictionary is about (average term length $+ 1$) times larger than the ordinary one — roughly a factor of $8$ to $10$ for English.
:::
:::
