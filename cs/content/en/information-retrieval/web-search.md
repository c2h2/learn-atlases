The techniques of the previous chapters were developed for libraries: a fixed collection, written in good faith, indexed once. The web is none of these. Nobody hands a search engine its collection; it must be **crawled**, page by page, from servers that belong to other people and that may ask not to be crawled. Pages change, appear and vanish every second. A large fraction of what a crawler fetches is a copy or near-copy of something already seen — mirrors, printer-friendly versions, pages that differ only in an advertisement or a date. And because a high ranking is worth money, many pages are written to deceive ranking functions. Against all this the web offers something a library does not: **links**. A link from one page to another is a small, public judgement that the target is worth visiting, and hundreds of millions of authors make such judgements.

This chapter covers the three problems that distinguish web search. **Crawling**: the architecture of a crawler, the politeness it owes to servers, and the Robots Exclusion Protocol (RFC 9309), with a matcher implemented from the standard. **Near-duplicate detection**: shingling and the Jaccard coefficient, **MinHash** with a proof that it estimates the Jaccard coefficient, locality-sensitive hashing to find candidate pairs, and Charikar's **SimHash**. **Link analysis**: **PageRank** as the stationary distribution of a random surfer, with a proof that teleportation makes it exist, unique and computable by power iteration at a guaranteed rate, and Kleinberg's **HITS** hubs and authorities. The graph algorithms are those of [[algorithms/graph-search]], Markov chains are in [Maths Atlas: Markov chains](/learn/maths/lesson.php?c=probability&l=markov-chains), and eigenvectors in [Maths Atlas: eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues).

## Crawling

A **crawler** (spider, robot) starts from a set of **seed** URLs, fetches each page, extracts its links, and adds the new URLs to a queue of pages to fetch, the **URL frontier**. As a graph algorithm this is breadth-first search on the web graph ([[algorithms/graph-search#alg-bfs]]); as a system it is a distributed program that fetches thousands of pages per second for months without overloading anyone.

::: algorithm Crawler main loop {#alg-crawler}
1. Take a URL $u$ from the frontier (chosen by priority and by politeness, below).
2. Resolve the host name (with a local DNS cache), check the host's `robots.txt` (cached), and fetch $u$ if permitted.
3. If the page's content is an exact or near duplicate of a page already stored, record the duplication and stop processing it.
4. Otherwise store and index the page, and extract its links. **Normalise** each link (resolve relative URLs, lower-case the scheme and host, remove default ports and fragments, apply site-specific rules) and discard it if it has already been seen (a set membership test, often with a Bloom filter in front of a disk-based set).
5. Add the new URLs to the frontier with a priority, and record the time to revisit $u$.
:::

The frontier must reconcile two goals. **Priority** decides which pages are worth fetching first: pages with high estimated quality (PageRank of the known graph, below), pages that change often, pages users click. **Politeness** limits the load on each server: a crawler must not open many simultaneous connections to one host or fetch from it in rapid succession. The Mercator crawler (Heydon and Najork, 1999) introduced the standard design: front queues ordered by priority feed back queues each holding URLs of a single host, and a heap of the times at which each host may next be contacted ensures a delay — often several times the duration of the last fetch — between requests to the same host. **Revisiting** is a scheduling problem of its own: a page that changes daily should be re-crawled more often than one that never changes, but re-crawling every page in proportion to its change rate turns out not to maximise average freshness, because pages that change faster than they can be revisited are a lost cause (Cho and Garcia-Molina, 2000).

### The Robots Exclusion Protocol

A site tells crawlers what they may fetch with a file `/robots.txt` at the top of the host. The convention was proposed by Martijn Koster in 1994 and standardised, after nearly three decades of informal use, as **RFC 9309** (September 2022).

::: definition robots.txt (RFC 9309) {#def-robots}
A `robots.txt` file consists of **groups**. Each group begins with one or more `user-agent` lines naming crawlers by **product token** (matched case-insensitively; `*` matches any crawler) followed by `allow` and `disallow` **rules**, each with a path **pattern**. In a pattern `*` matches any sequence of characters and a final `$` matches the end of the path. A crawler obeys the group(s) whose user-agent matches its product token, combining their rules if several match, and otherwise the `*` group. For a given URL path, the **most specific** matching rule — the one with the longest pattern, in octets — decides; if an `allow` and a `disallow` rule are equally specific, `allow` should be used. If no rule matches, access is allowed; the path `/robots.txt` itself is always allowed.
:::

RFC 9309 also specifies behaviour around the file. A crawler should follow at least five consecutive redirects when fetching it. If the server answers with a client error (a `4xx` status, such as `404 Not Found`), the crawler may access any resource; if it answers with a server error (`5xx`) or is unreachable, the crawler must assume **complete disallow**. Crawlers must be able to parse at least $500$ KiB of the file, and should not use a cached copy for more than $24$ hours unless the file has become unreachable. The rules are per host, protocol and port: `http://example.org/robots.txt` says nothing about `https://shop.example.org/`.

A matcher that follows the standard's precedence rules fits in a few lines:

```python
import re

def pattern_matches(pat, path):                       # '*' = any sequence, '$' at the end = end of path
    rx = "".join(".*" if c == "*" else re.escape(c) for c in pat.rstrip("$"))
    return re.match(rx + ("$" if pat.endswith("$") else ""), path) is not None

def allowed(groups, agent, path):
    """groups: list of (user-agent tokens in lower case, [(kind, pattern), ...])."""
    agent = agent.lower()
    chosen = [r for a, r in groups if agent in a]     # the group(s) naming this product token
    if not chosen: chosen = [r for a, r in groups if "*" in a]
    best = None                                       # longest matching pattern wins; allow wins ties
    for kind, pat in (rule for r in chosen for rule in r):
        if pat and pattern_matches(pat, path):        # an empty pattern matches nothing
            if best is None or len(pat) > len(best[1]) or (len(pat) == len(best[1]) and kind == "allow"):
                best = (kind, pat)
    return best is None or best[0] == "allow"
```

(A short `parse` function, not shown, splits the file into groups: consecutive `user-agent` lines start a group, and the `allow`/`disallow` lines that follow belong to it.)

::: example Applying robots.txt {#ex-robots}
A site's `robots.txt` reads
```text
User-agent: *
Disallow: /private/
Allow: /private/press/
Disallow: /*.pdf$

User-agent: examplebot
User-agent: otherbot
Disallow: /
Allow: /public/
```
Decide, for a crawler called `anybot` and for one called `ExampleBot`, which of several paths may be fetched.
::: solution
`anybot` matches no named group, so it uses the `*` group. `ExampleBot` matches `examplebot` case-insensitively, so it uses the second group and ignores the first entirely. The matcher prints:

```text
anybot     /index.html              allowed
anybot     /private/x.html          disallowed
anybot     /private/press/a.html    allowed
anybot     /docs/report.pdf         disallowed
ExampleBot /public/page             allowed
ExampleBot /index.html              disallowed
```

For `/private/press/a.html` both `Disallow: /private/` ($9$ octets) and `Allow: /private/press/` ($15$ octets) match, and the longer wins. For `/docs/report.pdf`, the pattern `/*.pdf$` matches because `*` absorbs `docs/report` and `$` anchors the end. For `ExampleBot`, `Allow: /public/` ($8$ octets) beats `Disallow: /` ($1$ octet) on `/public/page`, while every other path is disallowed.

Implementations differ. Python's standard `urllib.robotparser` (tested with Python 3.14) applies the *first* matching rule in file order rather than the longest, and answers `False` for both `anybot` on `/private/press/a.html` and `ExampleBot` on `/public/page`. A crawler author must know which semantics a library implements.
:::
:::

::: warning robots.txt is a request, not a lock
`robots.txt` is a convention that well-behaved crawlers honour voluntarily; RFC 9309 says explicitly that it is not a form of access authorisation. Listing `/private/` in it does not protect anything — it advertises the path to anyone who reads the file. Content that must not be fetched needs authentication. Conversely, honouring `robots.txt` is the *minimum* a responsible crawler does, not the whole of its obligations. It should identify itself with a descriptive user-agent and a contact address, limit its request rate per host and back off on errors or slow responses, respect site terms and the law on copyright and personal data, and avoid crawling spaces that generate infinite URLs (calendars, session identifiers). As of 2026, the purposes of crawling — search indexing, archiving, research, training machine-learning models — are increasingly distinguished by site owners, who name specific product tokens in `robots.txt` to allow some and refuse others; a crawler that collects for one purpose under another's name abuses the convention. The examples in this chapter run on local strings, not against real sites.
:::

## Near-duplicate detection

Studies of large crawls have repeatedly found that a large fraction of pages — figures of around a quarter to a third have been reported — are near-duplicates of other pages. **Exact** duplicates are easy: compute a hash of each page's content and compare (a fingerprint such as a 64-bit hash; see [[data-structures/hash-tables]]). Near-duplicates differ in a timestamp, a counter, an advertisement or a few edited words, and their hashes are unrelated. We need a measure of similarity and a way to find similar pairs among billions of pages without comparing all pairs.

::: definition Shingles and the Jaccard coefficient {#def-jaccard}
The **$k$-shingles** of a document are the set of all its sequences of $k$ consecutive words (or characters). The **Jaccard coefficient** of two sets is
$$
J(S, T) = \frac{\abs{S \cap T}}{\abs{S \cup T}},
$$
with $J = 1$ for identical sets and $J = 0$ for disjoint ones. Two documents are **near-duplicates** if the Jaccard coefficient of their shingle sets exceeds a threshold such as $0.9$.
:::

Shingling makes similarity sensitive to word order and local context: an edit of one word changes the $k$ shingles that contain it and leaves the rest intact. With $k = 4$ words, the first sentence of *Alice* ($57$ words, $54$ distinct shingles) and a version with "very tired" changed to "rather tired" and "thought Alice" to "said Alice" share $46$ shingles of $62$ in the union, $J = 0.742$.

Computing $J$ exactly needs the full shingle sets, thousands of entries per page. The breakthrough, due to Andrei Broder (1997), was a tiny **sketch** of each set from which $J$ can be estimated.

::: theorem MinHash estimates the Jaccard coefficient {#thm-minhash}
Let $S, T$ be non-empty subsets of a finite universe $U$, and let $\pi$ be a permutation of $U$ chosen uniformly at random. Write $\min \pi(S)$ for the smallest value $\pi(x)$ over $x \in S$. Then
$$
\Prob\bigl[\min \pi(S) = \min \pi(T)\bigr] = J(S, T).
$$
:::

::: proof
Consider the element $z \in S \cup T$ with the smallest value $\pi(z)$. Because $\pi$ is a uniformly random permutation, every element of $S \cup T$ is equally likely to be this $z$: by symmetry, the permutation is equally likely to put any one of them first among them. If $z \in S \cap T$, then $z$ is the minimiser of both $S$ and $T$ and the two minima are equal. If $z \in S \setminus T$, then $\min\pi(S) = \pi(z)$ while $\min\pi(T) > \pi(z)$, because $T \subseteq S \cup T$ does not contain $z$ and every other element of $S \cup T$ has a larger value; the minima differ, and symmetrically if $z \in T \setminus S$. So the minima are equal exactly when $z \in S \cap T$, which happens with probability $\abs{S \cap T}/\abs{S \cup T}$.
:::

::: corollary The MinHash estimator {#cor-minhash}
With $n$ independent random permutations $\pi_1, \dots, \pi_n$, the **MinHash signature** of $S$ is $(\min \pi_1(S), \dots, \min \pi_n(S))$, and the fraction $\hat J$ of positions in which the signatures of $S$ and $T$ agree is an unbiased estimator of $J(S, T)$ with variance $J(1 - J)/n$. By Chebyshev's inequality, $\Prob[\abs{\hat J - J} \ge \eps] \le J(1-J)/(n\eps^2)$.
:::

::: proof
The agreement at position $i$ is a Bernoulli variable with mean $J$ by [[#thm-minhash]], and the $n$ positions are independent, so $n\hat J$ is binomial with parameters $n$ and $J$: $\E[\hat J] = J$ and $\Var[\hat J] = J(1 - J)/n$. Chebyshev's inequality gives the tail bound.
:::

The signature has, say, $n = 200$ numbers per page whatever the page's length, and comparing two signatures costs $O(n)$. In practice random permutations of a huge universe are replaced by hash functions, here $x \mapsto (ax + b) \bmod p$ with $p = 2^{61} - 1$ applied to a 64-bit hash of each shingle. Such functions are only approximately **min-wise independent**, the property the proof needs, but behave well in practice:

```python
import random, hashlib

def h64(s):                                    # a fixed 64-bit hash of a string
    return int.from_bytes(hashlib.blake2b(s.encode(), digest_size=8).digest(), "big")

P = (1 << 61) - 1                              # a prime; x -> (a x + b) mod P approximates a permutation
def minhash_signature(S, n, seed=0):
    rng = random.Random(seed)                  # the same seed gives the same n functions for every set
    ab = [(rng.randrange(1, P), rng.randrange(P)) for _ in range(n)]
    xs = [h64(s) % P for s in S]
    return [min((a * x + b) % P for x in xs) for a, b in ab]

def estimate(sig1, sig2):                      # fraction of positions where the minima agree
    return sum(u == v for u, v in zip(sig1, sig2)) / len(sig1)
```

On four passages — $A$, the first sentence of *Alice*; $B$ with two small edits; $C$ with two different edits; $D$, the book's second sentence — the true Jaccard coefficients of the $4$-word shingle sets and the estimates from signatures of $16$, $64$ and $256$ hash functions are (the last column is explained under SimHash below):

```text
J(A,B) = 0.742  MinHash n=16,64,256: 0.625, 0.656, 0.715  SimHash distance 5
J(A,C) = 0.828  MinHash n=16,64,256: 0.750, 0.797, 0.836  SimHash distance 7
J(B,C) = 0.606  MinHash n=16,64,256: 0.375, 0.516, 0.590  SimHash distance 8
J(A,D) = 0.000  MinHash n=16,64,256: 0.000, 0.000, 0.000  SimHash distance 33
```

With $n = 256$ the standard deviation $\sqrt{J(1-J)/n}$ is about $0.03$, and the estimates are within that of the truth.

::: example MinHash by hand {#ex-minhash}
Let $S = \set{1, 3, 4}$ and $T = \set{1, 2, 4, 5}$ in the universe $\set{1, \dots, 5}$. Compute $J(S, T)$, and the MinHash agreements under the four permutations $\pi_1 = (3, 5, 1, 4, 2)$, $\pi_2 = (2, 4, 5, 1, 3)$, $\pi_3 = (5, 1, 4, 2, 3)$ and $\pi_4 = (1, 3, 2, 5, 4)$, where $\pi = (\pi(1), \dots, \pi(5))$.
::: solution
$S \cap T = \set{1, 4}$ and $S \cup T = \set{1, 2, 3, 4, 5}$, so $J = 2/5$.
- $\pi_1$: on $S$ the values are $\pi_1(1) = 3$, $\pi_1(3) = 1$, $\pi_1(4) = 4$, minimised by $3$; on $T$ they are $3, 5, 4, 2$, minimised by $5$. The element of $S \cup T$ with the smallest value is $3 \in S \setminus T$: **disagree**.
- $\pi_2$: the smallest value among all five elements is $\pi_2(4) = 1$, and $4 \in S \cap T$: **agree**.
- $\pi_3$: the overall minimiser is $2$ ($\pi_3(2) = 1$), in $T \setminus S$: **disagree** (the minimum over $S$ is at $4$, value $2$).
- $\pi_4$: the overall minimiser is $1 \in S \cap T$: **agree**.

Two agreements in four give $\hat J = 0.5$, against the true $0.4$. The proof of [[#thm-minhash]] is visible in each line: what matters is only which element of $S \cup T$ comes first, and the signatures agree exactly when it lies in the intersection.
:::
:::

### Finding candidate pairs: locality-sensitive hashing

Signatures make one comparison cheap, but a billion pages still form $5 \times 10^{17}$ pairs. **Locality-sensitive hashing** (LSH) finds the pairs likely to be similar without examining the others. Split each signature of $n = br$ numbers into $b$ **bands** of $r$ numbers, hash each band to a bucket, and declare two documents a **candidate pair** if they fall into the same bucket for at least one band. Only candidates are compared in full.

::: proposition The banding S-curve {#prop-banding}
If two documents have Jaccard coefficient $s$ and their signatures use independent min-hashes, they become a candidate pair with probability
$$
1 - \bigl(1 - s^{r}\bigr)^{b}.
$$
:::

::: proof
Within one band, the $r$ positions agree independently with probability $s$ each ([[#thm-minhash]]), so the whole band agrees with probability $s^r$ (ignoring accidental collisions of different bands in the bucket hash). The pair fails to become a candidate only if all $b$ bands disagree somewhere, with probability $(1 - s^r)^b$.
:::

As a function of $s$ this is an S-shaped curve with its steepest rise near $s \approx (1/b)^{1/r}$. With $b = 20$ bands of $r = 5$ ($n = 100$), the threshold is about $0.55$, and the probabilities of becoming a candidate are $0.047$ at $s = 0.3$, $0.47$ at $0.5$, $0.80$ at $0.6$, $0.975$ at $0.7$ and $0.9996$ at $0.8$. Increasing $r$ moves the threshold up and sharpens it; increasing $b$ moves it down. LSH, introduced in general form by Piotr Indyk and Rajeev Motwani (1998), is also the classical approach to approximate nearest-neighbour search in vector spaces, the problem of [[information-retrieval/dense-retrieval]].

::: widget plot
f: 1 - (1 - x^r)^b
sliders: r=1:1:10; b=1:1:50
x: 0, 1
y: 0, 1
labels: \Pr[\text{candidate}] = 1-(1-s^r)^b
caption: The probability that two documents with Jaccard coefficient $s$ share at least one band. Start at $r = 5$, $b = 20$ and note the threshold near $0.55$. Raise $r$ to $10$ with $b = 20$: the curve shifts right and steepens, so fewer false candidates but more missed near-duplicates; then raise $b$ to compensate. Every setting trades false positives (work) against false negatives (missed duplicates).
:::

### SimHash

Moses Charikar (2002) gave a different sketch, a single short **fingerprint** whose Hamming distance reflects the *cosine* similarity of weighted feature vectors. To compute a $64$-bit SimHash, hash every feature of the document (a word, a shingle) to $64$ bits; keep $64$ counters; for each feature, add its weight to counter $i$ if bit $i$ of its hash is $1$ and subtract it otherwise; the fingerprint has bit $i$ set when counter $i$ is positive.

```python
def simhash(text, bits=64):                    # Charikar's fingerprint of word-pair features
    v = [0] * bits
    for feature in shingles(text, 2):          # each distinct word pair, weight 1
        h = h64(feature)
        for i in range(bits):
            v[i] += 1 if (h >> i) & 1 else -1
    return sum(1 << i for i in range(bits) if v[i] > 0)
```

In the output above the edited passages have fingerprints within Hamming distance $5$ to $8$ of each other, while the unrelated passage $D$ is at distance $33$ — about the $32$ expected for unrelated $64$-bit strings. Why does this work? Each bit of the fingerprint is the sign of a sum $\sum_f w_f\, \sigma_i(f)$, where $\sigma_i(f) = \pm 1$ is the $i$-th hash bit of feature $f$ mapped to a sign: the sign of the inner product of the document's feature vector with a pseudo-random vector of $\pm 1$ entries. Each bit is a **random hyperplane** test.

::: theorem Random hyperplanes and angles {#thm-hyperplane}
Let $\vec u, \vec v \in \R^m$ be non-zero vectors at angle $\theta \in [0, \pi]$, and let $\vec g$ be a random vector with a rotation-invariant distribution (for example, independent standard normal coordinates). Then
$$
\Prob\bigl[\sgn(\vec g \cdot \vec u) \ne \sgn(\vec g \cdot \vec v)\bigr] = \frac{\theta}{\pi}.
$$
Consequently the expected Hamming distance between $k$-bit fingerprints made from $k$ independent random vectors is $k\theta/\pi$.
:::

::: proof
The signs differ exactly when the hyperplane $\set{\vec x : \vec g \cdot \vec x = 0}$ separates $\vec u$ from $\vec v$. Only the projection of $\vec g$ onto the plane spanned by $\vec u$ and $\vec v$ matters for the two signs, and by rotation invariance that projection, when non-zero, points in a uniformly random direction in the plane. Its zero line (the trace of the hyperplane in the plane) is then a uniformly random line through the origin, determined by an angle uniform in $[0, \pi)$. The line separates $\vec u$ and $\vec v$ exactly when its angle falls within the angle $\theta$ between them, which happens with probability $\theta/\pi$. The projection is zero with probability $0$. The statement about fingerprints follows by linearity of expectation over the $k$ bits.
:::

Hash-derived $\pm 1$ vectors are not rotation-invariant, so for SimHash the theorem holds only approximately, but the behaviour is as predicted. Gurmeet Manku, Arvind Jain and Anish Das Sarma (2007) reported using $64$-bit SimHash fingerprints at Google to detect near-duplicate web pages, treating pages within Hamming distance $3$ as near-duplicates and finding all fingerprints within that distance of a query fingerprint by splitting the bits into blocks and indexing permuted copies of the fingerprint table — the pigeonhole principle guarantees that two fingerprints differing in at most $3$ bits agree exactly on at least one of $4$ blocks.

::: quiz
Two sets have Jaccard coefficient $0.6$. With $n = 100$ independent min-hashes, what is the standard deviation of the MinHash estimate?
- [ ] $0.0024$
- [x] $0.049$
- [ ] $0.24$
- [ ] $0.6$
::: solution
$\sqrt{J(1-J)/n} = \sqrt{0.6 \times 0.4 / 100} = \sqrt{0.0024} \approx 0.049$ ([[#cor-minhash]]). Quadrupling $n$ halves it. The first option is the variance, not the standard deviation.
:::
:::

## Link analysis

::: definition Web graph {#def-web-graph}
The **web graph** is the directed graph $G = (V, E)$ whose vertices are pages and with an edge $(p, q)$ when page $p$ links to page $q$. The **out-degree** $\mathrm{out}(p)$ is the number of distinct pages $p$ links to. A page with out-degree $0$ is **dangling**. The text of a link, its **anchor text**, is indexed as part of the *target* page, since it describes the target in someone else's words.
:::

Counting in-links is a first measure of a page's importance, and an easy one to inflate: create a thousand pages that all link to yours. Sergey Brin and Lawrence Page's insight (1998) was to make importance recursive: a page is important if important pages link to it, and a page's vote is divided among all the pages it links to.

### The random surfer

Imagine a surfer who starts at a random page and repeatedly clicks a link chosen uniformly at random from the current page. The fraction of time spent at each page in the long run is a natural measure of importance — pages linked from many frequently visited pages are visited often. Two problems arise. At a dangling page the surfer is stuck. And the surfer can be trapped in a group of pages that link only to each other (a **spider trap**), which would absorb all the importance. The fix is **teleportation**: at each step, with probability $1 - \alpha$, the surfer ignores the links and jumps to a page chosen uniformly at random; from a dangling page it always jumps.

::: definition PageRank {#def-pagerank}
Let $n = \abs{V}$. Let $P$ be the $n \times n$ row-stochastic matrix with $P_{pq} = 1/\mathrm{out}(p)$ if $(p, q) \in E$ and $0$ otherwise, except that the row of a dangling page $p$ is uniform, $P_{pq} = 1/n$. For a **damping factor** $\alpha \in (0, 1)$, the **Google matrix** is
$$
G = \alpha P + (1 - \alpha)\, \tfrac{1}{n} \mathbf 1 \mathbf 1\T,
$$
and the **PageRank** vector is the row vector $\vec x$ with non-negative entries summing to $1$ such that $\vec x G = \vec x$: the **stationary distribution** of the Markov chain with transition matrix $G$. Written out, for every page $q$,
$$
x_q = \frac{1 - \alpha}{n} + \alpha \sum_{p \to q} \frac{x_p}{\mathrm{out}(p)} + \alpha \sum_{p \text{ dangling}} \frac{x_p}{n}.
$$ {#eq-pagerank}
:::

Brin and Page used $\alpha = 0.85$: the surfer follows about $1/(1 - \alpha) \approx 6.7$ links on average before teleporting. Teleportation may also be to a non-uniform distribution $\vec v$ over pages (**personalised PageRank**), replacing $\frac1n \mathbf 1\T$ by $\vec v$; everything below holds for any $\vec v$ with positive entries.

Does the stationary distribution exist, is it unique, and how do we compute it for billions of pages? For a general Markov chain the answers can be no, no and "with difficulty": a chain with two closed classes has many stationary distributions, and a periodic chain does not converge. The teleportation term settles all three questions.

::: theorem Perron–Frobenius for positive matrices {#thm-perron}
If $M$ is a square matrix with all entries strictly positive, then $M$ has a real eigenvalue $\rho > 0$ equal to its spectral radius, $\rho$ is a simple eigenvalue, it has a left eigenvector with all entries strictly positive, every other eigenvalue $\lambda$ satisfies $\abs\lambda < \rho$, and no other eigenvalue has a non-negative eigenvector. For a row-stochastic positive matrix, $\rho = 1$.
:::

We state this classical theorem without proof (see [Maths Atlas: eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues) for the background). Since every entry of $G$ is at least $(1 - \alpha)/n > 0$, it applies to $G$: there is exactly one stationary distribution, with all entries positive. The theorem says nothing about how fast power iteration converges; for PageRank we can prove existence, uniqueness and a convergence rate directly, by a short argument that uses only the special structure of $G$.

::: theorem PageRank exists, is unique and is computed by power iteration {#thm-pagerank}
Let $G = \alpha P + (1 - \alpha)\mathbf 1 \vec v$ with $P$ row-stochastic, $\vec v$ a probability row vector and $0 \le \alpha < 1$. Then there is exactly one probability vector $\vec x$ with $\vec x G = \vec x$. For any probability vector $\vec x^{(0)}$, the iterates $\vec x^{(k+1)} = \vec x^{(k)} G$ satisfy
$$
\norm{\vec x^{(k)} - \vec x}_1 \le 2\alpha^{k}.
$$
:::

::: proof
For a probability vector $\vec y$ we have $\vec y\,\mathbf 1 = 1$, so $\vec y G = \alpha \vec y P + (1 - \alpha)\vec v$, again a probability vector. Now take two probability vectors $\vec y, \vec z$. Then
$$
\vec y G - \vec z G = \alpha (\vec y - \vec z) P,
$$
because the teleportation terms $(1 - \alpha)\vec v$ cancel. For any row vector $\vec w$ and row-stochastic $P$, $\norm{\vec w P}_1 = \sum_q \abs{\sum_p w_p P_{pq}} \le \sum_q \sum_p \abs{w_p} P_{pq} = \sum_p \abs{w_p} = \norm{\vec w}_1$. Hence
$$
\norm{\vec y G - \vec z G}_1 \le \alpha \norm{\vec y - \vec z}_1:
$$
the map $\vec y \mapsto \vec y G$ is a **contraction** with factor $\alpha < 1$ on the set of probability vectors, which is closed and bounded in $\R^n$.

*Uniqueness.* If $\vec x G = \vec x$ and $\vec x' G = \vec x'$, then $\norm{\vec x - \vec x'}_1 = \norm{\vec x G - \vec x' G}_1 \le \alpha\norm{\vec x - \vec x'}_1$, which forces $\norm{\vec x - \vec x'}_1 = 0$.

*Existence and convergence.* The iterates satisfy $\norm{\vec x^{(k+1)} - \vec x^{(k)}}_1 \le \alpha^k \norm{\vec x^{(1)} - \vec x^{(0)}}_1$, so for $m > k$ the triangle inequality gives $\norm{\vec x^{(m)} - \vec x^{(k)}}_1 \le (\alpha^k + \dots + \alpha^{m-1}) \cdot 2 \le 2\alpha^k/(1 - \alpha)$, and the sequence is Cauchy. Its limit $\vec x$ is a probability vector (the set is closed), and since $\vec y \mapsto \vec y G$ is continuous, $\vec x G = \lim \vec x^{(k)} G = \lim \vec x^{(k+1)} = \vec x$. Finally, $\norm{\vec x^{(k)} - \vec x}_1 = \norm{\vec x^{(k-1)}G - \vec x G}_1 \le \alpha \norm{\vec x^{(k-1)} - \vec x}_1 \le \dots \le \alpha^k \norm{\vec x^{(0)} - \vec x}_1 \le 2\alpha^k$, since two probability vectors are at $L_1$ distance at most $2$.
:::

So the convergence rate is governed by the damping factor alone, independent of the size or shape of the graph: with $\alpha = 0.85$, about $50$ iterations reduce the error bound to $2 \times 0.85^{50} \approx 6 \times 10^{-4}$, and $150$ iterations to $10^{-10}$. (Haveliwala and Kamvar showed in 2003 that the second eigenvalue of $G$ has modulus at most $\alpha$, the spectral form of the same fact.) Each iteration is one pass over the edges, computing [[#eq-pagerank]] without ever forming the dense matrix $G$: the teleportation and dangling terms are the same for every page and are added once.

::: algorithm PageRank by power iteration {#alg-pagerank}
1. $x_p \gets 1/n$ for every page $p$.
2. Repeat until $\norm{\vec y - \vec x}_1 < \varepsilon$:
   1. $D \gets \sum_{p \text{ dangling}} x_p$.
   2. $y_q \gets (1 - \alpha)/n + \alpha D/n$ for every $q$.
   3. For every edge $(p, q)$: $y_q \gets y_q + \alpha\, x_p/\mathrm{out}(p)$.
   4. $\vec x \gets \vec y$.
:::

```python
def pagerank(links, alpha=0.85, tol=1e-10, max_iter=200):
    """links: page -> list of pages it links to. Returns (ranks, residual history)."""
    pages = sorted(set(links) | {q for out in links.values() for q in out})
    n = len(pages)
    x = {p: 1 / n for p in pages}                  # start from the uniform distribution
    history = []
    for _ in range(max_iter):
        dangling = sum(x[p] for p in pages if not links.get(p))   # pages without out-links
        y = {p: (1 - alpha) / n + alpha * dangling / n for p in pages}
        for p, out in links.items():
            for q in out:
                y[q] += alpha * x[p] / len(out)    # follow a random out-link of p
        res = sum(abs(y[p] - x[p]) for p in pages)  # L1 change in this iteration
        history.append(res); x = y
        if res < tol: break
    return x, history
```

::: example PageRank of a four-page web {#ex-pagerank}
Pages $A$, $B$, $C$, $D$ link as $A \to B$, $A \to C$, $B \to C$, $C \to A$, $D \to C$. Write the Google matrix for $\alpha = 0.85$ and solve [[#eq-pagerank]] exactly.
::: solution
No page is dangling. $P$ has rows $A: (0, \frac12, \frac12, 0)$, $B: (0, 0, 1, 0)$, $C: (1, 0, 0, 0)$, $D: (0, 0, 1, 0)$, and $G = 0.85P + 0.0375\,\mathbf 1\mathbf 1\T$:
$$
G = \begin{pmatrix} 0.0375 & 0.4625 & 0.4625 & 0.0375 \\ 0.0375 & 0.0375 & 0.8875 & 0.0375 \\ 0.8875 & 0.0375 & 0.0375 & 0.0375 \\ 0.0375 & 0.0375 & 0.8875 & 0.0375 \end{pmatrix}.
$$
With $t = (1 - \alpha)/n = 3/80$ and $\alpha = 17/20$, [[#eq-pagerank]] reads $x_D = t$ (no page links to $D$), $x_B = t + \alpha x_A/2$, $x_C = t + \alpha(x_A/2 + x_B + x_D)$, $x_A = t + \alpha x_C$. Substituting the first two into the third gives $x_C = t + \alpha\bigl(x_A/2 + t + \alpha x_A/2 + t\bigr) = t(1 + 2\alpha) + \tfrac{\alpha(1+\alpha)}{2}x_A$, and then $x_A = t + \alpha x_C$ yields
$$
x_A = \frac{t(1 + \alpha + 2\alpha^2)}{1 - \alpha^2(1 + \alpha)/2} = \frac{659}{1769} \approx 0.3725,
$$
and then $x_C = (x_A - t)/\alpha = 2789/7076 \approx 0.3941$, $x_B = 27713/141520 \approx 0.1958$, $x_D = 0.0375$; the four sum to $1$. The power-iteration listing prints `{'A': 0.3725, 'B': 0.1958, 'C': 0.3941, 'D': 0.0375}` after $47$ iterations. $C$, with three in-links, ranks first, but $A$, with a single in-link, is close behind, because that link comes from $C$ and is $C$'s only out-link. $D$ gets only the teleportation share.
:::
:::

::: widget markov
matrix: 0.0375,0.4625,0.4625,0.0375; 0.0375,0.0375,0.8875,0.0375; 0.8875,0.0375,0.0375,0.0375; 0.0375,0.0375,0.8875,0.0375
states: A; B; C; D
start: 3
steps: 30
caption: The random surfer on the four-page web of [[#ex-pagerank]], with damping factor $0.85$. Start the walk at $D$ and watch the distribution after $n$ steps converge to the stationary distribution $(0.3725, 0.1958, 0.3941, 0.0375)$ — the PageRank vector — whatever the start. The surfer bounces between $A$ and $C$ and rarely visits $D$, which no page links to.
:::

On a larger example with a dangling page $G$ and a two-page cycle $E \leftrightarrow F$:

```python
web2 = {"A": ["B", "C"], "B": ["C", "E"], "C": ["A"], "D": ["C", "G"], "E": ["F", "G"],
        "F": ["E"], "G": []}                       # G is a dangling page
ranks, hist = pagerank(web2)
```
```text
{'A': 0.2008, 'C': 0.1917, 'E': 0.1917, 'G': 0.1354, 'B': 0.1232, 'F': 0.1193, 'D': 0.0379}
residuals: ['3.82e-01', '2.31e-01', '1.88e-01', '9.44e-02', '3.19e-02', '9.05e-03'] ... 8.3e-11 after 33 iterations
```

The residual $\norm{\vec x^{(k+1)} - \vec x^{(k)}}_1$ fell below $10^{-10}$ after $33$ iterations, faster than the worst-case bound, because the ratios of successive residuals ($0.60$, $0.81$, $0.50$, $0.34$, …) are mostly below $\alpha$ for this graph. Without teleportation and dangling-page handling, the cycle $E \leftrightarrow F$ would trap the surfer and the dangling page $G$ would leak probability.

::: widget graph
nodes: A@1,2; B@2,3; C@2,1; D@3,1; E@3,3; F@4,3; G@4,1
edges: A>B; A>C; B>C; B>E; C>A; D>C; D>G; E>F; E>G; F>E
caption: The seven-page web of the second PageRank run. Drag the pages to see the structure: $A$, $B$, $C$ form a cluster, $E$ and $F$ a two-page cycle that would be a spider trap without teleportation, and $G$ is dangling. Compare the ranks: $A$ comes first with only one in-link (from $C$, which links nowhere else), while $D$, with no in-links, has only the teleportation share.
:::

PageRank is **query-independent**: it is computed once for the whole graph and combined, as one feature among many, with query-dependent scores such as BM25 ([[information-retrieval/learning-to-rank]]). Its use as a dominant ranking signal invited **link spam**: **link farms** of pages linking to each other and to a target, links bought or left in comments and forums. Counter-measures include discounting links marked `rel="nofollow"` (introduced in 2005 for user-generated content), detecting densely interlinked farms, and **TrustRank** (Gyöngyi, Garcia-Molina and Pedersen, 2004), a personalised PageRank that teleports only to a hand-checked set of trustworthy seed pages, so that trust flows outward from them and spam far from any seed receives little. As of 2026 link-based scores remain one of many signals in web ranking; their weight relative to others is not public.

### HITS: hubs and authorities

Jon Kleinberg (1998, journal version 1999) observed that on a topic two kinds of page matter: **authorities**, which contain good information, and **hubs**, which link to many good authorities (resource lists, directories). The definitions are mutually recursive: a good authority is linked from good hubs, and a good hub links to good authorities.

::: definition HITS {#def-hits}
Let $A$ be the adjacency matrix of a set of pages, $A_{pq} = 1$ if $p$ links to $q$. **Hyperlink-induced topic search** assigns authority scores $\vec a$ and hub scores $\vec h$ (column vectors) by iterating
$$
\vec a \gets A\T \vec h, \qquad \vec h \gets A \vec a,
$$
normalising each vector to unit length after each step. In HITS the graph is not the whole web but a **base set**: the top results for a query (the **root set**) together with the pages they link to and some of the pages that link to them.
:::

::: proposition HITS computes principal eigenvectors {#prop-hits}
After $k$ rounds starting from $\vec h^{(0)} = \mathbf 1$, $\vec a^{(k)}$ is proportional to $(A\T A)^{k-1} A\T \mathbf 1$ and $\vec h^{(k)}$ to $(A A\T)^{k}\mathbf 1$. If the largest eigenvalue of the symmetric positive semidefinite matrix $A\T A$ is simple and $A\T\mathbf 1$ is not orthogonal to its eigenvector, the authority vectors converge to the unit principal eigenvector of $A\T A$, and likewise the hub vectors converge to that of $A A\T$.
:::

::: proof
The two update rules compose to $\vec a \gets A\T A\, \vec a$ and $\vec h \gets A A\T \vec h$ up to scaling, which gives the closed forms by induction. A symmetric positive semidefinite matrix $M$ has an orthonormal basis of eigenvectors $\vec e_1, \dots, \vec e_n$ with eigenvalues $\lambda_1 > \lambda_2 \ge \dots \ge \lambda_n \ge 0$ (the spectral theorem). Write the starting vector as $\sum_i c_i \vec e_i$ with $c_1 \ne 0$. Then $M^k$ applied to it is $\sum_i c_i \lambda_i^k \vec e_i = \lambda_1^k\bigl(c_1\vec e_1 + \sum_{i \ge 2} c_i (\lambda_i/\lambda_1)^k \vec e_i\bigr)$, and since $\lambda_i/\lambda_1 < 1$ for $i \ge 2$, after normalisation it converges to $\pm\vec e_1$; with non-negative iterates the sign is $+$.
:::

::: example Two rounds of HITS {#ex-hits}
Pages $p_1$ and $p_2$ link to $q_1$, and $p_1$ also links to $q_2$. Run HITS from $\vec h = (1, 1)$ on $(p_1, p_2)$ for two rounds and compare with the principal eigenvector of $A\T A$.
::: solution
Round 1: $a_{q_1} = h_{p_1} + h_{p_2} = 2$ and $a_{q_2} = h_{p_1} = 1$; normalised, $\vec a = (2, 1)/\sqrt5 = (0.894, 0.447)$. Then $h_{p_1} = a_{q_1} + a_{q_2} = 3/\sqrt5$ and $h_{p_2} = a_{q_1} = 2/\sqrt5$; normalised, $\vec h = (3, 2)/\sqrt{13}$. Round 2: $\vec a \propto (3 + 2, 3) = (5, 3)$, normalised $(0.857, 0.514)$. On the authorities, $A\T A = \begin{pmatrix} 2 & 1 \\ 1 & 1\end{pmatrix}$ ($q_1$ has two in-links, $q_2$ one, and they share the hub $p_1$), with largest eigenvalue $(3 + \sqrt5)/2 = 2.618$ and unit eigenvector $(0.851, 0.526)$. After two rounds HITS is already within $0.012$ of it in each coordinate; the second eigenvalue $(3 - \sqrt5)/2 = 0.382$ is small, so convergence is fast. $q_1$ is the stronger authority and $p_1$, which links to both, the stronger hub.
:::
:::

On the seven-page web, a hundred HITS iterations give

```text
authority {'C': 0.797, 'G': 0.408, 'E': 0.352, 'B': 0.244, 'F': 0.125, 'A': 0.0, 'D': 0.0}
hub       {'D': 0.583, 'B': 0.557, 'A': 0.504, 'E': 0.258, 'F': 0.171, 'C': 0.0, 'G': 0.0}
```

$C$, linked from three hubs, is the top authority; $D$, $B$ and $A$, which all point to $C$, are the top hubs. Note that $A$ has authority $0$ although $C$ links to it: $C$'s only link goes to $A$, $A$ is not pointed to by any of the strong hubs, and the principal eigenvector concentrates on the dominant community, zeroing out the weaker one. This is a known property of HITS — the result can depend on a small part of the graph, and on graphs whose largest eigenvalue is repeated the limit depends on the starting vector — along with its vulnerability to **topic drift** when the base set contains a dense cluster of off-topic pages. HITS is computed at query time on a small graph, which made it expensive for a web engine; PageRank is computed offline once for all queries. The two ideas, and the eigenvector view of importance behind both, have been reused far beyond the web, in citation analysis, social networks and recommendation.

::: history
The first web crawlers appeared in 1993–1994, among them Matthew Gray's World Wide Web Wanderer and Brian Pinkerton's WebCrawler, the first engine to index the full text of pages (1994). Martijn Koster proposed the robots exclusion standard in 1994; it was published as RFC 9309 in 2022 by Koster, Gary Illyes, Henner Zeller and Lizzi Sassman. Allan Heydon and Marc Najork described the Mercator crawler in 1999. Andrei Broder introduced shingling and min-wise hashing in "On the resemblance and containment of documents" (1997), and with Steven Glassman, Mark Manasse and Geoffrey Zweig applied them to cluster the whole AltaVista crawl the same year; Piotr Indyk and Rajeev Motwani formalised locality-sensitive hashing in 1998, and Moses Charikar's "Similarity estimation techniques from rounding algorithms" (STOC 2002) introduced the hyperplane sketch behind SimHash. Sergey Brin and Lawrence Page described PageRank and the Google prototype in "The anatomy of a large-scale hypertextual web search engine" (WWW7, 1998), and Jon Kleinberg's "Authoritative sources in a hyperlinked environment" (SODA 1998; *Journal of the ACM*, 1999) introduced hubs and authorities.
:::

## Where this leads

A web engine combines everything in this course: crawled pages are processed into terms ([[information-retrieval/text-processing]]), deduplicated, indexed in compressed, document-partitioned indexes across many machines ([[information-retrieval/index-compression]], [[distributed-systems/data-processing]]), and ranked in stages — a fast BM25-like first stage with dynamic pruning ([[information-retrieval/vector-space]]) followed by learned models that combine hundreds of features, among them PageRank and anchor-text scores, described in [[information-retrieval/learning-to-rank]]. Computing PageRank on a graph of billions of edges is itself a classic iterative dataflow job ([[distributed-systems/data-processing]]). MinHash and locality-sensitive hashing reappear in [[information-retrieval/dense-retrieval]] as early methods for approximate nearest-neighbour search, and the random-hyperplane theorem underlies binary embeddings of dense vectors.

::: summary
- A crawler is a polite, prioritised, distributed breadth-first search ([[#alg-crawler]]): per-host queues and delays enforce politeness, priorities and change rates decide what to fetch and revisit.
- **robots.txt** (RFC 9309, [[#def-robots]]) groups rules by user-agent; the longest matching rule wins and `allow` wins ties; `4xx` means no restrictions, `5xx` means disallow everything. It is a voluntary convention, not access control, and libraries implement it differently.
- Near-duplicates are compared by the **Jaccard coefficient** of shingle sets ([[#def-jaccard]]); **MinHash** agrees with probability exactly $J$ under random permutations ([[#thm-minhash]]), giving an unbiased estimator with variance $J(1-J)/n$ ([[#cor-minhash]]).
- **LSH banding** turns signatures into candidate pairs with probability $1 - (1 - s^r)^b$ ([[#prop-banding]]); **SimHash** fingerprints have Hamming distances proportional to angles, by the random-hyperplane theorem ([[#thm-hyperplane]]).
- **PageRank** ([[#def-pagerank]]) is the stationary distribution of a random surfer with teleportation; the Google matrix is positive, so Perron–Frobenius applies ([[#thm-perron]]), and power iteration converges with error at most $2\alpha^k$ regardless of the graph ([[#thm-pagerank]]).
- **HITS** ([[#def-hits]]) computes hub and authority scores as principal eigenvectors of $AA\T$ and $A\T A$ ([[#prop-hits]]), at query time on a small base set.
:::

## Exercises

::: exercise Jaccard of shingle sets {level=1 check="1/2"}
With $2$-word shingles, compute the Jaccard coefficient of "a rose is a rose" and "a rose is red". (Enter $J$.)
::: solution
The shingles of the first text are `a rose`, `rose is`, `is a`, `a rose`, which as a set is $\set{\texttt{a rose}, \texttt{rose is}, \texttt{is a}}$. The second gives $\set{\texttt{a rose}, \texttt{rose is}, \texttt{is red}}$. The intersection has $2$ elements and the union $4$ (`a rose`, `rose is`, `is a`, `is red`), so $J = 2/4 = 1/2$. With $3$-word shingles the sets are $\set{\texttt{a rose is}, \texttt{rose is a}, \texttt{is a rose}}$ and $\set{\texttt{a rose is}, \texttt{rose is red}}$, with intersection $1$ and union $4$, so $J = 1/4$: longer shingles make similarity stricter.
:::
:::

::: exercise A banding probability {level=1 check="1 - (1 - 0.8^4)^10"}
Signatures are split into $b = 10$ bands of $r = 4$. What is the probability that two documents with Jaccard coefficient $0.8$ become a candidate pair? (Enter the probability.)
::: solution
By [[#prop-banding]], $1 - (1 - 0.8^4)^{10} = 1 - (1 - 0.4096)^{10} = 1 - 0.5904^{10} \approx 1 - 0.0052 = 0.9948$.
:::
:::

::: exercise A robots.txt decision {level=1}
Under RFC 9309, with the file
```text
User-agent: *
Disallow: /shop
Allow: /shop/catalogue
Disallow: /*?session=
```
may a generic crawler fetch `/shop/catalogue/item?id=7`, `/shopping`, `/shop/catalogue?session=42` and `/about`?
::: solution
- `/shop/catalogue/item?id=7`: `Disallow: /shop` ($5$ octets) and `Allow: /shop/catalogue` ($15$) both match; the longer allows it. **Allowed.**
- `/shopping`: `Disallow: /shop` matches, because patterns are prefixes (`/shop` is a prefix of `/shopping`); nothing longer matches. **Disallowed** — a common surprise; `/shop/` would have been the intended rule.
- `/shop/catalogue?session=42`: `Allow: /shop/catalogue` ($15$ octets) and `Disallow: /*?session=` ($11$ octets, with `*` matching `shop/catalogue`) both match; the longer pattern is the `Allow`. **Allowed**, perhaps not what the site intended. Pattern length, not specificity of meaning, decides.
- `/about`: no rule matches. **Allowed.**
:::
:::

::: exercise PageRank of a cycle {level=2 check="1/3"}
Three pages link in a cycle $A \to B \to C \to A$. What is the PageRank of $A$ for any $\alpha$? (Enter $x_A$.) Then add a link $A \to C$ and compute the PageRank vector for $\alpha = 0.85$.
::: solution
By symmetry (the cycle is invariant under rotation, and the PageRank is unique by [[#thm-pagerank]]), all three ranks are equal: $x_A = 1/3$. With the extra link, $A$ links to $B$ and $C$. Equations with $t = 0.05$: $x_B = t + 0.85 x_A/2$, $x_C = t + 0.85(x_A/2 + x_B)$, $x_A = t + 0.85 x_C$. Substituting, $x_C = t + 0.85(x_A/2 + t + 0.425x_A) = 0.0925 + 0.78625 x_A$, so $x_A = 0.05 + 0.85(0.0925 + 0.78625x_A) = 0.128625 + 0.6683125x_A$, giving $x_A = 0.128625/0.3316875 = 0.3878$, $x_C = 0.3974$, $x_B = 0.2148$. $C$ gains from the extra link, and $B$, which now receives only half of $A$'s vote, loses.
:::
:::

::: exercise MinHash for unequal sets {level=2}
Let $T \subseteq S$ with $\abs T = 10$ and $\abs S = 40$. What is $J(S, T)$? What is the probability that the minimiser of $S$ under a random permutation lies in $T$? Use this to describe how to estimate the **containment** $\abs{S \cap T}/\abs{T}$ of one document in another from MinHash signatures and the set sizes.
::: solution
$J = 10/40 = 1/4$. The minimiser of $S$ is uniform over $S$, so it lies in $T$ with probability $10/40 = 1/4$ — the same event as $\min\pi(S) = \min\pi(T)$ here, because $T \subseteq S$. In general, from an estimate $\hat J$ of $J$ and the sizes $\abs S$, $\abs T$: since $\abs{S \cap T} = J\abs{S \cup T}$ and $\abs{S \cup T} = \abs S + \abs T - \abs{S \cap T}$, we get $\abs{S \cap T} = J(\abs S + \abs T)/(1 + J)$, so the containment is estimated by $\hat J(\abs S + \abs T)/((1 + \hat J)\abs T)$. For $J = 1/4$: $\frac14 \cdot 50 / (\frac54 \cdot 10) = 1$, correctly saying that $T$ is wholly contained in $S$. Broder's 1997 paper defined both resemblance and containment for exactly this use.
:::
:::

::: exercise Convergence iterations {level=2 check="ceil(log(1e-8/2)/log(0.85))"}
Using the bound of [[#thm-pagerank]], how many power iterations with $\alpha = 0.85$ guarantee an $L_1$ error below $10^{-8}$? (Enter the number of iterations.)
::: solution
We need $2 \cdot 0.85^k < 10^{-8}$, i.e. $k > \ln(5 \times 10^{-9})/\ln 0.85 = (-19.11)/(-0.1625) = 117.6$, so $k = 118$ iterations suffice whatever the graph. With $\alpha = 0.99$ the same accuracy would need about $1\,900$ iterations, one reason for not choosing $\alpha$ close to $1$; another is that the ranking becomes very sensitive to small changes in the graph.
:::
:::

::: exercise Dangling pages done wrong {level=3}
A common bug is to drop dangling pages' rows instead of making them uniform, so that $P$ has zero rows and is only sub-stochastic. Show that the iteration $\vec x \gets \alpha \vec x P + \frac{1-\alpha}{n}\mathbf 1\T$ then still converges, but to a vector whose entries sum to less than $1$, and that renormalising the result gives the correct PageRank of [[#def-pagerank]].
::: solution
Let $\tilde P$ be $P$ with the dangling rows set to zero, and $\vec d$ the indicator column vector of dangling pages, so $P = \tilde P + \frac1n \vec d\,\mathbf 1\T$. The buggy map $\vec y \mapsto \alpha\vec y\tilde P + \frac{1-\alpha}{n}\mathbf 1\T$ is a contraction in $L_1$ with factor $\alpha$ (since $\norm{\vec w\tilde P}_1 \le \norm{\vec w}_1$), so it converges to a unique fixed point $\tilde{\vec x} = \frac{1-\alpha}{n}\mathbf 1\T(I - \alpha\tilde P)^{-1}$. Its entries sum to less than $1$ whenever some mass sits on dangling pages, since that mass is lost in each step. Now let $\vec x$ be the true PageRank; with $D = \vec x\vec d$ its mass on dangling pages, it satisfies $\vec x = \alpha\vec x\tilde P + \bigl(\frac{1-\alpha}{n} + \frac{\alpha D}{n}\bigr)\mathbf 1\T = \alpha \vec x\tilde P + c\,\mathbf 1\T$ with $c = \frac{1 - \alpha + \alpha D}{n}$. So $\vec x = c\,\mathbf 1\T (I - \alpha\tilde P)^{-1} = \frac{nc}{1-\alpha}\tilde{\vec x}$: the true PageRank is a scalar multiple of the buggy fixed point, and since it sums to $1$, it is obtained by normalising $\tilde{\vec x}$. The ranking of pages is therefore the same; only the scale is wrong.
:::
:::

::: exercise Implement SimHash search by blocks {level=3}
Fingerprints have $64$ bits and near-duplicates are those within Hamming distance $k = 3$. Explain why splitting fingerprints into $4$ blocks of $16$ bits guarantees that two near-duplicate fingerprints agree exactly on at least one block, and write a function that, given a list of fingerprints, returns all pairs within distance $3$ by indexing each block in a hash table.
::: solution
If two $64$-bit strings differ in at most $3$ positions, those positions fall into at most $3$ of the $4$ blocks, so at least one block is identical (pigeonhole). Index every fingerprint under each of its $4$ blocks; any near-duplicate pair shares a bucket, so it suffices to compare fingerprints within buckets.

```python
from collections import defaultdict
from itertools import combinations

def near_pairs(fps, k=3, blocks=4, bits=64):
    w = bits // blocks
    buckets = defaultdict(list)
    for idx, f in enumerate(fps):
        for b in range(blocks):
            buckets[(b, (f >> (b * w)) & ((1 << w) - 1))].append(idx)
    pairs = set()
    for members in buckets.values():
        for i, j in combinations(members, 2):
            if bin(fps[i] ^ fps[j]).count("1") <= k:
                pairs.add((min(i, j), max(i, j)))
    return sorted(pairs)

print(near_pairs([0x0cb2e57c9c068770, 0x08b7e57e9c268770, 0x0cb2e57c9c068771, 0xffff000000000000]))
```
```text
[(0, 2)]
```
The first and third fingerprints differ in one bit and are reported; the first two (the SimHash fingerprints of passages $A$ and $B$, distance $5$) are more than $3$ apart and are not. Each bucket holds fingerprints that agree on $16$ bits, about $N/2^{16}$ of $N$ random fingerprints, so the expected number of comparisons is about $4\binom{N}{2}/2^{16}$ rather than $\binom N2$; Manku and colleagues used more tables with permuted bit orders to shrink buckets further.
:::
:::
