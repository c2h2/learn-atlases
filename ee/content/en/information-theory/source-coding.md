A fax machine of the 1980s scanned a page as about two million black and white dots, yet sent it over a telephone line in well under a minute, because most of a typed page is white and long white runs can be described in a few bits. A PNG image, a ZIP archive and a FLAC audio file are all reconstructed bit for bit from files much smaller than the original data. **Source coding** — lossless data compression — removes redundancy by giving short descriptions to likely messages and long ones to unlikely messages, exactly as Morse code gives E a single dot and Q a long sequence.

How far can this go? [[information-theory/entropy-information]] defined the entropy $H(X)$ and suggested, with a game of twenty questions, that it is the average number of bits a source really needs. This lesson proves it. We first characterise the codes that can be decoded at all (**prefix codes** and the **Kraft inequality**), then show that no code beats $H$ bits per symbol and that codes within one bit of $H$ always exist (the **source coding theorem**). Coding blocks of symbols closes the last bit, and the **asymptotic equipartition property** explains why: a long source sequence is almost certainly one of about $2^{nH}$ equally likely "typical" sequences. Finally we construct the codes used in practice — **Huffman codes**, which are optimal symbol by symbol, and **arithmetic codes**, which approach the entropy of a whole message — and look briefly at universal compressors that need no probability model at all.

## Codes that can be decoded {#sec-codes}

A source emits symbols $X_1, X_2, \dots$ from a finite alphabet $\mathcal X$. A **binary code** $C$ assigns to each symbol $x$ a **codeword** $C(x)$, a string of bits of length $\ell(x)$. A message is encoded by concatenating codewords, with no separators: the decoder sees only one long bit string.

::: definition Classes of codes {#def-code-classes}
A code is
- **non-singular** if distinct symbols get distinct codewords;
- **uniquely decodable** if every concatenation of codewords $C(x_1)C(x_2)\cdots C(x_k)$ can be produced by only one symbol sequence;
- a **prefix code** (or **instantaneous code**) if no codeword is a prefix of another.

Its **expected length** is $L(C) = \sum_x p(x)\ell(x)$ bits per symbol.
:::

Every prefix code is uniquely decodable, and more: the decoder can recognise the end of each codeword the moment it arrives, without looking ahead. The classes are strictly nested, as this table for a four-symbol alphabet shows.

| symbol | singular | non-singular, not UD | UD, not prefix | prefix |
|---|---|---|---|---|
| $a$ | $0$ | $0$ | $0$ | $0$ |
| $b$ | $0$ | $1$ | $01$ | $10$ |
| $c$ | $1$ | $01$ | $011$ | $110$ |
| $d$ | $1$ | $10$ | $0111$ | $111$ |

In the second code the string $01$ could be $ab$ or $c$. The third is uniquely decodable — every codeword begins with $0$, so each $0$ marks the start of a new one — but the decoder must see the *next* $0$ before it knows that a codeword has ended. The fourth can be decoded on the fly.

A prefix code is a binary **tree**: start at the root, go left for $0$ and right for $1$, and place each codeword at a **leaf**. The prefix condition says that no codeword sits at an internal node on the path to another. Decoding is a walk from the root to a leaf, then back to the root.

## The Kraft inequality {#sec-kraft}

Short codewords are valuable, but they use up the tree: once $0$ is a codeword, half of all possible strings are unavailable. The Kraft inequality makes the budget exact.

::: theorem Kraft inequality {#thm-kraft}
The codeword lengths $\ell_1, \dots, \ell_m$ of a binary prefix code satisfy

$$
\sum_{i=1}^m 2^{-\ell_i} \le 1 .
$$ {#eq-kraft}

Conversely, for any lengths satisfying [[#eq-kraft]] there is a prefix code with those lengths.
:::

::: proof
Let $\ell_{\max}$ be the largest length and extend the code tree to a full tree of depth $\ell_{\max}$, which has $2^{\ell_{\max}}$ leaves. A codeword of length $\ell_i$ is the ancestor of $2^{\ell_{\max} - \ell_i}$ of these leaves, and by the prefix condition the sets of descendants of different codewords are disjoint. Hence $\sum_i2^{\ell_{\max} - \ell_i} \le 2^{\ell_{\max}}$, which is [[#eq-kraft]].

For the converse, sort the lengths, $\ell_1 \le \ell_2 \le \dots \le \ell_m$, and assign codewords in order: give symbol $i$ the first $\ell_i$ bits of the binary expansion of $F_i = \sum_{j<i}2^{-\ell_j}$. Codeword $i$ corresponds to the dyadic interval $[F_i, F_i + 2^{-\ell_i})$ of $[0, 1)$, and these intervals are consecutive and, by [[#eq-kraft]], fit inside $[0, 1)$. A codeword is a prefix of another exactly when its interval contains the other's, which cannot happen for disjoint intervals; and since $F_i$ is a multiple of $2^{-\ell_{i-1}}$ and so of $2^{-\ell_i}$, truncating its expansion to $\ell_i$ bits is exact.
:::

The lengths $\{1, 2, 3, 3\}$ give $\tfrac12 + \tfrac14 + \tfrac18 + \tfrac18 = 1$: they fill the tree, and the construction gives $0, 10, 110, 111$. The lengths $\{1, 2, 2, 3\}$ give $\tfrac98 > 1$: no prefix code — and, by the next theorem, no uniquely decodable code at all — has them.

::: theorem McMillan's inequality {#thm-mcmillan}
The codeword lengths of every uniquely decodable binary code satisfy the Kraft inequality [[#eq-kraft]].
:::

::: proof
Let $S = \sum_i2^{-\ell_i}$ and consider its $k$-th power,

$$
S^k = \sum_{i_1, \dots, i_k}2^{-(\ell_{i_1} + \dots + \ell_{i_k})} = \sum_{n=1}^{k\ell_{\max}}A_n2^{-n},
$$

where $A_n$ is the number of sequences of $k$ codewords whose concatenation has total length $n$. Unique decodability means these concatenations are distinct bit strings, and there are only $2^n$ strings of length $n$, so $A_n \le 2^n$. Hence $S^k \le k\ell_{\max}$ for every $k$. If $S > 1$, $S^k$ grows exponentially and would eventually exceed the linear bound; therefore $S \le 1$.
:::

McMillan's theorem tells the designer that nothing is lost by insisting on prefix codes: any set of lengths achievable by a uniquely decodable code is achievable by an instantaneous one.

::: quiz
A designer proposes a prefix code for six symbols with lengths $1, 2, 3, 4, 5, 5$. What can you say?
- [ ] It is impossible, because the Kraft sum exceeds $1$
- [x] It is possible, and the Kraft sum is exactly $1$, so no codeword can be shortened without lengthening another
- [ ] It is possible, but one codeword could be shortened for free
- [ ] It is possible only if the code is not instantaneous
::: solution
$\tfrac12 + \tfrac14 + \tfrac18 + \tfrac1{16} + \tfrac1{32} + \tfrac1{32} = 1$. A code with Kraft sum $1$ is **complete**: its tree has no unused leaves. Shortening any codeword would push the sum above $1$, violating [[#thm-kraft]]. The code is $0, 10, 110, 1110, 11110, 11111$.
:::
:::

## The source coding theorem {#sec-theorem}

We now ask for the lengths that minimise $L = \sum p_i\ell_i$ subject to Kraft's inequality. Ignore for a moment that lengths must be integers: minimising $\sum p_i\ell_i$ subject to $\sum2^{-\ell_i} = 1$ with a Lagrange multiplier gives $2^{-\ell_i} \propto p_i$, so $\ell_i = \log_2(1/p_i)$, the self-information of [[information-theory/entropy-information#def-self-info]], and then $L = H(X)$. Each symbol should cost exactly its surprisal.

::: theorem Source coding theorem for symbol codes {#thm-source-coding}
The expected length of any uniquely decodable binary code for a random variable $X$ satisfies

$$
L \ge H(X),
$$ {#eq-lower-bound}

with equality if and only if $p(x) = 2^{-\ell(x)}$ for every $x$. There exists a prefix code with

$$
H(X) \le L < H(X) + 1 .
$$ {#eq-upper-bound}
:::

::: proof
Lower bound. Let $S = \sum_x2^{-\ell(x)} \le 1$ (McMillan) and define the pmf $r(x) = 2^{-\ell(x)}/S$. Then

$$
L - H(X) = \sum_xp(x)\ell(x) + \sum_xp(x)\log_2p(x) = \sum_xp(x)\log_2\frac{p(x)}{r(x)} - \log_2S = D(p\Vert r) + \log_2\frac1S \ge 0,
$$

because $D(p\Vert r) \ge 0$ by [[information-theory/entropy-information#thm-gibbs]] and $S \le 1$. Equality needs $p = r$ and $S = 1$, i.e. $p(x) = 2^{-\ell(x)}$.

Upper bound. Choose the **Shannon code lengths** $\ell(x) = \lceil\log_2(1/p(x))\rceil$. They satisfy Kraft, since $2^{-\ell(x)} \le p(x)$ and $\sum p(x) = 1$, so by [[#thm-kraft]] a prefix code with these lengths exists. And $\ell(x) < \log_2(1/p(x)) + 1$, so $L < H(X) + 1$.
:::

The theorem has an important corollary for a code designed with the wrong statistics. If the true pmf is $p$ but the lengths are chosen as $\lceil\log_2(1/q(x))\rceil$, the same computation gives

$$
H(p) + D(p\Vert q) \le L < H(p) + D(p\Vert q) + 1 .
$$ {#eq-mismatch}

The relative entropy is precisely the price, in bits per symbol, of a wrong model.

The extra bit in [[#eq-upper-bound]] hurts when $H$ is small. A binary source with $P(1) = 0.1$ has $H = 0.469$ bits, but every code for single symbols needs one bit per symbol. The cure is to code **blocks**: treat $n$ consecutive symbols $X^n = (X_1, \dots, X_n)$ as one super-symbol. For a memoryless source $H(X^n) = nH(X)$ (by the chain rule with independence), and [[#thm-source-coding]] applied to $X^n$ gives $nH \le L_n < nH + 1$, where $L_n$ is the expected length per block. Per source symbol,

$$
H(X) \le \frac{L_n}{n} < H(X) + \frac1n .
$$ {#eq-block}

As $n \to \infty$ the rate approaches the entropy. For a source with memory the same argument gives the **entropy rate** $\lim_nH(X^n)/n$, which is smaller than $H(X_1)$ when the symbols are dependent.

## Typical sequences {#sec-aep}

Why does block coding work so well? Because long sequences from a source are, in a precise sense, almost all alike. Toss a biased coin with $P(1) = 0.1$ a hundred times. The single most likely sequence is all zeros, with probability $0.9^{100} = 2.7\times10^{-5}$ — yet you will essentially never see it. What you will see is a sequence with about ten ones. There are $\binom{100}{10} \approx 1.7\times10^{13}$ such sequences, each with probability $0.1^{10}0.9^{90} \approx 7.6\times10^{-15}$, and they share most of the probability.

::: widget distribution
dist: binomial
params: n=100, p=0.1
a: 5
b: 15
caption: The number of ones in $n$ independent bits with $P(1) = p$. The shaded range $5$–$15$ carries about $94\,\%$ of the probability for $n = 100$, $p = 0.1$. Increase $n$: the relative spread $\sigma/n = \sqrt{p(1 - p)/n}$ shrinks, so the fraction of ones in a long sequence is almost certainly close to $p$. This is the law of large numbers behind the typical set.
:::

::: theorem Asymptotic equipartition property {#thm-aep}
Let $X_1, X_2, \dots$ be independent and identically distributed with entropy $H$. Then

$$
-\frac1n\log_2p(X_1, \dots, X_n) \to H \quad\text{in probability as } n \to \infty .
$$ {#eq-aep}

Consequently, for each $\epsilon > 0$ the **typical set** $A_\epsilon^{(n)}$ of sequences with $2^{-n(H + \epsilon)} \le p(x^n) \le 2^{-n(H - \epsilon)}$ satisfies, for all sufficiently large $n$:
1. $P\big(X^n \in A_\epsilon^{(n)}\big) > 1 - \epsilon$;
2. $\lvert A_\epsilon^{(n)}\rvert \le 2^{n(H + \epsilon)}$;
3. $\lvert A_\epsilon^{(n)}\rvert \ge (1 - \epsilon)\,2^{n(H - \epsilon)}$.
:::

::: proof
By independence, $-\tfrac1n\log_2p(X^n) = \tfrac1n\sum_{i=1}^n\big(-\log_2p(X_i)\big)$ is an average of $n$ independent copies of the random variable $-\log_2p(X)$, whose mean is $H$. The weak law of large numbers gives [[#eq-aep]], and property 1 is a restatement of it. For property 2, every typical sequence has probability at least $2^{-n(H + \epsilon)}$, so $1 \ge \sum_{x^n\in A}p(x^n) \ge \lvert A\rvert\,2^{-n(H + \epsilon)}$. For property 3, every typical sequence has probability at most $2^{-n(H - \epsilon)}$, so $1 - \epsilon < P(A) \le \lvert A\rvert\,2^{-n(H - \epsilon)}$.
:::

The typical set is tiny — about $2^{nH}$ sequences out of $\lvert\mathcal X\rvert^n = 2^{n\log_2\lvert\mathcal X\rvert}$ — and yet it contains nearly all the probability, spread almost evenly ("equipartition"). This gives a second proof of the achievability half of the coding theorem: index the typical sequences with $n(H + \epsilon) + 1$ bits, prefixed by a flag bit; send the rare atypical sequences uncompressed with $n\log_2\lvert\mathcal X\rvert + 1$ bits. The average length per symbol is at most $(1 - \epsilon)(H + \epsilon) + \epsilon\log_2\lvert\mathcal X\rvert + 2/n$, which can be made as close to $H$ as we like. Conversely, any set of fewer than $2^{n(H - \epsilon)}$ sequences captures a vanishing probability (exercise), so fixed-rate codes below $H$ fail almost always. The same typical-set reasoning, applied to pairs of input and output sequences, proves the channel coding theorem in [[information-theory/channel-capacity]].

::: widget plot
f: -x*log2(x) - (1 - x)*log2(1 - x); -x*log2(p) - (1 - x)*log2(1 - p); x*log2(x/p) + (1 - x)*log2((1 - x)/(1 - p))
x: 0.001, 0.999
y: 0, 3.5
sliders: p=0.1:0.02:0.5:0.01
labels: \tfrac1n\log_2\#\text{sequences}; -\tfrac1n\log_2p(x^n); D(k/n\Vert p)
caption: Counting sequences of length $n$ by their fraction of ones $k/n$ (horizontal axis). Blue: there are about $2^{nH_b(k/n)}$ such sequences. Orange: each has probability $2^{-n[\cdots]}$, a straight line. Their class has total probability about $2^{-nD}$, where $D$ (green) is the gap between the line and the curve. The line is tangent to the curve exactly at $k/n = p$: only sequences with the "right" fraction of ones have non-vanishing total probability, and there the count is $2^{nH_b(p)}$. Change $p$ and the tangent point follows.
:::

::: example How big is the typical set? {#ex-typical}
For $n = 100$ independent bits with $P(1) = 0.1$, compare the number of typical sequences with the total number of sequences, and estimate the number of bits needed to index them.
::: solution
$H_b(0.1) = 0.469$, so the typical set has about $2^{nH} = 2^{46.9} \approx 1.3\times10^{14}$ sequences, against $2^{100} \approx 1.3\times10^{30}$ in all — a fraction $2^{-53}$, one in about $10^{16}$. An index needs about $47$ bits instead of $100$. (The $\epsilon$-slack matters at this modest $n$: the sequences with $5$ to $15$ ones, which carry about $94\,\%$ of the probability, number about $2^{58}$; the exponent per symbol converges to $H$ only as $n$ grows, as [[#eq-aep]] promises.)
:::
:::

## Huffman codes {#sec-huffman}

The Shannon lengths $\lceil\log_2(1/p)\rceil$ come within a bit of the entropy but are rarely optimal. For a single symbol with $p = 0.6$ and another with $p = 0.4$, they give lengths $1$ and $2$, when $1$ and $1$ obviously suffice. David Huffman found the optimal construction in 1952.

::: algorithm Huffman coding {#alg-huffman}
Input: symbol probabilities $p_1, \dots, p_m$.
1. Make each symbol a leaf node with weight $p_i$.
2. While more than one node remains: remove the two nodes of smallest weight, make them the two children of a new node whose weight is their sum, and insert the new node.
3. The remaining node is the root. Label the two branches from each internal node $0$ and $1$; the codeword of a symbol is the sequence of labels from the root to its leaf.
:::

::: theorem Optimality of Huffman codes {#thm-huffman}
A Huffman code has the smallest expected length of all uniquely decodable codes for the given probabilities.
:::

::: proof
By McMillan's theorem it suffices to compare with prefix codes. We use three facts about an optimal prefix code, assuming $p_1 \ge p_2 \ge \dots \ge p_m$.

(a) If $p_j > p_k$ then $\ell_j \le \ell_k$: otherwise swapping the two codewords changes $L$ by $(p_j - p_k)(\ell_k - \ell_j) < 0$.
(b) The two longest codewords have the same length: in an optimal tree every internal node has two children (a node with one child could be removed, shortening its subtree), so the deepest leaf has a sibling at the same depth.
(c) Hence there is an optimal code in which the two least probable symbols $m - 1$ and $m$ are siblings at the greatest depth (swap them into the deepest sibling pair, which by (a) does not increase $L$).

Now induct on $m$. For $m = 2$ the code $\{0, 1\}$ is optimal. For $m > 2$, merge symbols $m - 1$ and $m$ into one symbol of probability $p_{m-1} + p_m$. Any prefix code $C'$ for the reduced alphabet becomes a code $C$ for the original one by splitting the merged leaf into two children, and $L(C) = L(C') + p_{m-1} + p_m$. By (c), some optimal code for the original alphabet arises in this way from a code for the reduced alphabet, so minimising $L(C)$ is the same as minimising $L(C')$ — which Huffman's algorithm does, by the induction hypothesis, because its next steps are exactly Huffman's algorithm on the reduced alphabet.
:::

::: example A five-symbol Huffman code {#ex-huffman}
Construct a Huffman code for the probabilities $p(a) = 0.4$, $p(b) = 0.2$, $p(c) = 0.2$, $p(d) = 0.1$, $p(e) = 0.1$. Compute its expected length, the entropy and the variance of the codeword length.
::: solution
Merge the two smallest: $d + e = 0.2$. The weights are now $0.4\,(a)$, $0.2\,(b)$, $0.2\,(c)$, $0.2\,(de)$. Three nodes tie at $0.2$; merge the original symbols $b + c = 0.4$. Now $0.4\,(a)$, $0.4\,(bc)$, $0.2\,(de)$: merge $de$ with $a$ to give $0.6$. Finally merge $0.6$ and $0.4$ at the root. Labelling the root's branches $0 \to bc$, $1 \to (a, de)$:

| symbol | $p$ | codeword | $\ell$ |
|---|---|---|---|
| $a$ | $0.4$ | $10$ | $2$ |
| $b$ | $0.2$ | $00$ | $2$ |
| $c$ | $0.2$ | $01$ | $2$ |
| $d$ | $0.1$ | $110$ | $3$ |
| $e$ | $0.1$ | $111$ | $3$ |

$L = 0.4\cdot2 + 0.2\cdot2 + 0.2\cdot2 + 0.1\cdot3 + 0.1\cdot3 = 2.2$ bits. The entropy is $H = 0.4\log_2\tfrac1{0.4} + 2\cdot0.2\log_25 + 2\cdot0.1\log_210 = 0.529 + 0.929 + 0.664 = 2.122$ bits, so the code is within $0.08$ bits of the bound. $E[\ell^2] = 0.4\cdot4 + 0.4\cdot4 + 0.2\cdot9 = 5.0$, and the variance is $5.0 - 2.2^2 = 0.16$.

Had we merged $de$ with $b$ at the second step, we would have obtained lengths $1, 2, 3, 4, 4$ — also $L = 2.2$, also optimal, but with variance $6.2 - 4.84 = 1.36$. When a code feeds a constant-rate channel through a buffer, the low-variance code (merge combined nodes as late as possible) needs a much smaller buffer.
:::
:::

::: example Huffman coding of blocks {#ex-huffman-blocks}
A sensor outputs independent bits with $P(1) = 0.1$. Find the rate in bits per source bit achieved by Huffman coding single bits, pairs and triples.
::: solution
Singles: two symbols need one bit each — rate $1$, against $H = 0.469$.

Pairs: $p(00) = 0.81$, $p(01) = p(10) = 0.09$, $p(11) = 0.01$. Huffman merges $0.01 + 0.09 = 0.10$, then $0.10 + 0.09 = 0.19$, then $0.19 + 0.81$. Lengths $1, 2, 3, 3$ (for $00$, $01$ or $10$, the other, $11$) give $L_2 = 0.81 + 2\cdot0.09 + 3\cdot0.09 + 3\cdot0.01 = 1.29$ bits per pair, $0.645$ bits per source bit.

Triples: eight blocks with probabilities $0.729$, three of $0.081$, three of $0.009$ and one of $0.001$. Running the algorithm gives $L_3 = 1.598$ bits per triple, $0.533$ bits per source bit. (Blocks of four give $0.493$.) The rate approaches $0.469$ from above, inside the bound $H + 1/n$ of [[#eq-block]] — slowly, and at the cost of a codebook of $2^n$ entries. Arithmetic coding, next, gets the same benefit without the codebook.
:::
:::

::: example Designing a code for a telemetry link {#ex-telemetry}
A monitoring station reports one of eight conditions $1000$ times per second, with probabilities $0.30, 0.20, 0.15, 0.12, 0.10, 0.06, 0.04, 0.03$. The radio link carries $2800\,\mathrm{bit/s}$. Can a fixed-length code be used? A Shannon code? Design a code that works, and state the margin.
::: solution
A fixed-length code needs $\lceil\log_28\rceil = 3$ bits per report, $3000\,\mathrm{bit/s}$: too much. The entropy is $H = 2.676$ bits, so the source needs at least $2676\,\mathrm{bit/s}$ — the link is in principle sufficient, with only a $4.6\,\%$ margin.

Shannon lengths $\lceil\log_2(1/p)\rceil = 2, 3, 3, 4, 4, 5, 5, 6$ give $L = 3.21$ bits — worse than fixed length, a reminder that the "within one bit" guarantee can be loose.

Huffman's algorithm gives lengths $2, 2, 3, 3, 3, 4, 5, 5$ (Kraft sum $\tfrac14\cdot2 + \tfrac18\cdot3 + \tfrac1{16} + \tfrac1{32}\cdot2 = 1$) and $L = 0.6 + 0.4 + 0.45 + 0.36 + 0.3 + 0.24 + 0.2 + 0.15 = 2.70$ bits, so the average bit rate is $2700\,\mathrm{bit/s}$, a $3.6\,\%$ margin below the link rate. Because the codeword lengths vary, the transmitter needs a buffer: in a burst of rare conditions it receives $5$ bits per report while sending $2.8$. A buffer of a few hundred bits makes overflow negligible for random bursts; a robust design would also add a rule (for example, dropping repeated low-priority reports) for when the buffer fills.
:::
:::

## Arithmetic coding {#sec-arithmetic}

Huffman codes waste up to a bit per *symbol* (more precisely, up to $p_{\max} + 0.086$ bits), and block Huffman codes need exponentially large tables. **Arithmetic coding** treats the whole message as a single block without ever listing the codebook. Its idea goes back to Shannon's proof of [[#thm-kraft]]: a message corresponds to an interval of $[0, 1)$ whose width is its probability, and any binary fraction that pins the interval down identifies the message.

::: definition Arithmetic coding interval {#def-arithmetic}
Order the alphabet and let $F(x) = \sum_{x' < x}p(x')$ be the cumulative probability *below* $x$. The interval of the empty message is $[0, 1)$. If the current interval is $[\mathrm{low}, \mathrm{low} + w)$ and the next symbol is $x$, the new interval is

$$
\big[\mathrm{low} + wF(x),\ \mathrm{low} + wF(x) + w\,p(x)\big) .
$$ {#eq-arith}

After $n$ symbols the interval width is $p(x_1)\cdots p(x_n) = p(x^n)$. The codeword is the binary expansion, truncated to $\ell = \lceil\log_2(1/p(x^n))\rceil + 1$ bits, of a number in the interval (for instance its midpoint).
:::

::: theorem Length of arithmetic codes {#thm-arith-length}
The truncated codeword of [[#def-arithmetic]] identifies the interval uniquely, and the set of codewords for messages of length $n$ is prefix-free. The expected length satisfies $L_n < nH(X) + 2$, i.e. less than $H + 2/n$ bits per symbol.
:::

::: proof
Let $m$ be the midpoint of the interval of width $w = p(x^n)$, and $\hat m$ its truncation to $\ell$ bits, so $0 \le m - \hat m < 2^{-\ell}$. Since $\ell \ge \log_2(1/w) + 1$, we have $2^{-\ell} \le w/2$. The dyadic interval $[\hat m, \hat m + 2^{-\ell})$ — all binary fractions that begin with the codeword — therefore lies within $[m - w/2, m + w/2)$, the message's interval. Intervals of different messages are disjoint, so their dyadic intervals are disjoint, which means no codeword is a prefix of another. The length is $\ell < \log_2(1/p(x^n)) + 2$; averaging over $x^n$ gives $L_n < nH + 2$.
:::

In practice the encoder never computes the final interval with infinite precision. Whenever the interval lies entirely in $[0, \tfrac12)$ or $[\tfrac12, 1)$, the leading bit of the codeword is settled; the encoder outputs it and doubles the interval. With this **renormalisation** an arithmetic coder works with fixed-precision integers (typically $32$ bits) and emits bits as it goes. The probabilities can change from symbol to symbol, which makes arithmetic coding the natural partner of an **adaptive model** that predicts each symbol from its context — the structure of the CABAC coder in H.264 and H.265 video and of the best text compressors.

::: example Encoding a short message {#ex-arith}
A source has $p(a) = 0.6$, $p(b) = 0.3$, $p(c) = 0.1$, ordered $a < b < c$. Encode the message $aab$ arithmetically.
::: solution
The cumulative probabilities are $F(a) = 0$, $F(b) = 0.6$, $F(c) = 0.9$. Starting from $[0, 1)$:

- $a$: $[0, 0.6)$, width $0.6$.
- $a$: $[0 + 0.6\cdot0,\ 0 + 0.6\cdot0.6) = [0, 0.36)$, width $0.36$.
- $b$: $[0 + 0.36\cdot0.6,\ 0.216 + 0.36\cdot0.3) = [0.216, 0.324)$, width $0.108 = 0.6\cdot0.6\cdot0.3$.

The codeword needs $\ell = \lceil\log_2(1/0.108)\rceil + 1 = \lceil3.21\rceil + 1 = 5$ bits. The midpoint is $0.27 = 0.01000101\ldots_2$; truncated to five bits it is $0.01000_2 = 0.25$, and every binary fraction beginning $0.01000$ lies in $[0.25, 0.28125)$, inside the message interval. The codeword is $01000$. The ideal length is $\log_2(1/0.108) = 3.21$ bits; the two-bit overhead of [[#thm-arith-length]] is paid once per message, not per symbol, so for long messages it is negligible. The decoder, knowing the message length (or with an end-of-message symbol), repeats the subdivisions and at each step picks the symbol whose subinterval contains $0.25$.
:::
:::

::: warning Entropy is a property of the model, not of the file
"The entropy of this file" has no meaning until a probability model is chosen. Coding English text with single-letter frequencies achieves about $4.1$ bits per character; a model that conditions on the previous few characters achieves well under $3$; large neural language models predict text so well that arithmetic coding driven by them reaches around one bit per character. The source coding theorem guarantees only that you cannot beat the entropy *of the true distribution*; a better model is closer to it. Conversely, a code optimised for the wrong model costs $D(p\Vert q)$ extra bits by [[#eq-mismatch]], and a compressor applied to already-compressed or encrypted data cannot shrink it further — such data looks like independent fair bits.
:::

## Universal compression {#sec-universal}

Huffman and arithmetic coding need the source statistics. Often they are unknown or changing, and the compressor must learn them. Abraham Lempel and Jacob Ziv showed in 1977–78 how to compress without any explicit model. Their **LZ77** algorithm replaces each repeated string by a pointer (distance, length) to an earlier occurrence within a sliding window; **LZ78** and its variant **LZW** (Terry Welch, 1984) build a dictionary of phrases, each a previously seen phrase extended by one symbol. For any stationary ergodic source, the number of bits per symbol produced by Lempel–Ziv coding converges to the entropy rate as the data length grows: the algorithms are **universal**.

::: application Compressors in everyday use
The DEFLATE format of ZIP, gzip and PNG combines LZ77 (pointers into the last $32\,\mathrm{kB}$) with Huffman coding of the literals, lengths and distances. GIF images use LZW. JPEG codes its quantised DCT coefficients with Huffman (or, rarely, arithmetic) codes after run-length coding the zeros; MP3 and AAC use Huffman tables. The ITU Group 3 fax standard uses a fixed "modified Huffman" code for the lengths of black and white runs. Modern formats — H.264/H.265 video (CABAC), JPEG 2000, the `zstd` and `xz` compressors (finite-state and range coding, close relatives of arithmetic coding) — pair adaptive context models with arithmetic-type coders. In each case, the compressed size is measured against an entropy estimate of the residual data to decide whether a better model is worth its complexity.
:::

::: quiz
A binary source has $P(1) = 0.01$. Which statement about compressing it is correct?
- [ ] A Huffman code for single bits achieves about $0.08$ bits per source bit
- [ ] No code can do better than one bit per source bit, since the alphabet is binary
- [x] Arithmetic coding of long messages approaches $H_b(0.01) = 0.081$ bits per source bit
- [ ] The entropy is $\log_2(1/0.01) = 6.6$ bits per source bit
::: solution
Huffman coding of single bits needs one bit per bit, since each of the two symbols needs a codeword of length at least one. The entropy is $H_b(0.01) = 0.0808$ bits, the limit for long blocks or arithmetic coding. $\log_2(1/0.01)$ is the self-information of a rare $1$, not the average.
:::
:::

## Where this leads {#sec-leads}

The source coding theorem is half of Shannon's programme. The other half, [[information-theory/channel-capacity]], shows that a channel can carry $C$ bits per use reliably; the **source–channel separation theorem** proved there says that compressing to $H$ bits and then protecting them with a channel code is optimal, which is why digital systems are designed in two separate layers. Lossy compression of analog signals — quantisation in [[communication-systems/pulse-code-modulation]], transform coding in images and audio — is governed by **rate–distortion theory**, the lossy counterpart of this lesson, which gives for a Gaussian source the rate $R(D) = \tfrac12\log_2(\sigma^2/D)$ bits per sample for mean-square distortion $D$. The prefix-tree and interval arguments here reappear in the decoding trees of [[information-theory/convolutional-codes]] and in the successive-cancellation decoding of polar codes in [[information-theory/modern-codes]].

::: history
Shannon's 1948 paper stated the source coding theorem and described a code built from cumulative probabilities, essentially the construction in the proof of [[#thm-kraft]]; Robert Fano described a related top-down splitting method in an MIT report of 1949 (the Shannon–Fano code). Leon Kraft proved his inequality in his 1949 MIT master's thesis, and Brockway McMillan extended it to all uniquely decodable codes in 1956. David Huffman, a student in Fano's information theory class at MIT, devised his bottom-up algorithm as an alternative to a term paper and published it in the *Proceedings of the IRE* in 1952. Peter Elias's idea of coding cumulative probabilities recursively was recorded in Norman Abramson's 1963 textbook; Jorma Rissanen and Richard Pasco independently made arithmetic coding practical with finite-precision arithmetic in 1976. Jacob Ziv and Abraham Lempel published their universal algorithms in 1977 and 1978.
:::

::: summary
- Prefix codes can be decoded instantaneously; the codeword lengths of any uniquely decodable code satisfy Kraft's inequality $\sum2^{-\ell_i} \le 1$, and any lengths that satisfy it are achieved by a prefix code.
- No uniquely decodable code has expected length below $H(X)$; Shannon lengths $\lceil\log_2(1/p)\rceil$ give $L < H + 1$, and coding blocks of $n$ symbols brings the rate within $1/n$ of $H$.
- A code designed for the wrong distribution $q$ costs an extra $D(p\Vert q)$ bits per symbol.
- The AEP: a long i.i.d. sequence almost surely has probability close to $2^{-nH}$, and the roughly $2^{nH}$ typical sequences carry almost all the probability.
- Huffman's algorithm (merge the two least probable nodes repeatedly) gives an optimal symbol code; ties allow codes of equal $L$ but different length variance.
- Arithmetic coding narrows an interval by each symbol's probability and outputs about $\log_2(1/p(x^n)) + 2$ bits for the whole message, approaching the entropy without a codebook and adapting easily to changing models.
- Lempel–Ziv methods compress universally, without a model, and underlie ZIP, gzip and PNG.
:::

## Exercises

::: exercise Kraft sum {level=1 check="2/4+3/8+1/16"}
A prefix code has codeword lengths $2, 2, 3, 3, 3, 4$. Compute the Kraft sum. Could another codeword of length $4$ be added without breaking the prefix condition?
::: solution
$\tfrac14 + \tfrac14 + \tfrac18 + \tfrac18 + \tfrac18 + \tfrac1{16} = 0.9375$. Adding one more codeword of length $4$ raises the sum to exactly $1$, so yes — by the converse of [[#thm-kraft]] — and the code then becomes complete.
:::
:::

::: exercise Classifying a code {level=1}
Is the code $\{0, 01, 11\}$ a prefix code? Is it uniquely decodable? Decode the bit string $0111$.
::: solution
It is not a prefix code ($0$ is a prefix of $01$). It is uniquely decodable: reversing every codeword gives $\{0, 10, 11\}$, a prefix code, so the string can be decoded uniquely from the end. Reading $0111$ backwards, $11 \to$ the third symbol, then $10$ reversed is $01 \to$ the second symbol; so the message is (second, third): $01\,|\,11$. Note that a decoder reading forwards could not know, after $0$, whether that symbol has ended until it sees how many $1$s follow.
:::
:::

::: exercise A dyadic source {level=1 check="1.875"}
Construct a Huffman code for probabilities $\tfrac12, \tfrac14, \tfrac18, \tfrac1{16}, \tfrac1{16}$ and find its expected length in bits.
::: solution
The merges $\tfrac1{16} + \tfrac1{16} = \tfrac18$, $\tfrac18 + \tfrac18 = \tfrac14$, $\tfrac14 + \tfrac14 = \tfrac12$, $\tfrac12 + \tfrac12$ give lengths $1, 2, 3, 4, 4$ and codewords $0, 10, 110, 1110, 1111$. $L = \tfrac12 + \tfrac12 + \tfrac38 + \tfrac4{16} + \tfrac4{16} = 1.875$ bits, equal to the entropy because every probability is a power of $\tfrac12$ ([[#thm-source-coding]], equality case).
:::
:::

::: exercise Another Huffman code {level=2 check="2.3"}
Find a Huffman code for probabilities $0.25, 0.25, 0.2, 0.15, 0.15$, its expected length in bits, and its efficiency $H/L$.
::: solution
Merge $0.15 + 0.15 = 0.3$; then $0.2 + 0.25 = 0.45$; then $0.25 + 0.3 = 0.55$; then $0.45 + 0.55$. The lengths are $2, 2, 2, 3, 3$ (the $0.25$ merged last with $0.3$ and the other $0.25$ with $0.2$ both sit at depth $2$; the $0.15$s at depth $3$). $L = 2(0.25 + 0.25 + 0.2) + 3(0.3) = 1.4 + 0.9 = 2.3$ bits. $H = 2(0.5) + 0.2\log_25 + 2(0.15)\log_2(1/0.15) = 1 + 0.464 + 0.821 = 2.285$ bits, so the efficiency is $2.285/2.3 = 99.4\,\%$.
:::
:::

::: exercise The cost of a wrong model {level=2 check="0.25"}
A source has probabilities $\tfrac12, \tfrac14, \tfrac18, \tfrac18$, but the designer assumed it was uniform and used the code $00, 01, 10, 11$. How many bits per symbol are wasted compared with the optimal code? Verify that the answer is $D(p\Vert q)$.
::: solution
The fixed code uses $2$ bits per symbol; the optimal code ($0, 10, 110, 111$) uses $H = 1.75$. The waste is $0.25$ bits. $D(p\Vert u) = \sum p\log_2(4p) = \tfrac12\log_22 + \tfrac14\log_21 + 2\cdot\tfrac18\log_2\tfrac12 = 0.5 + 0 - 0.25 = 0.25$ bits, in agreement with [[#eq-mismatch]] (the lengths $\log_2(1/q) = 2$ are integers here, so the bound is met exactly).
:::
:::

::: exercise Decoding an arithmetic code {level=2}
With the source of [[#ex-arith]] ($p(a) = 0.6$, $p(b) = 0.3$, $p(c) = 0.1$), a decoder receives the codeword $111$ and is told the message has two symbols. Find the message, and check that the codeword length is the one the encoder would have chosen.
::: solution
$0.111_2 = 0.875$. In $[0, 1)$, $0.875$ lies in $[0.6, 0.9)$: first symbol $b$. Within $[0.6, 0.9)$ of width $0.3$, the subintervals are $a$: $[0.6, 0.78)$, $b$: $[0.78, 0.87)$, $c$: $[0.87, 0.9)$; $0.875$ is in $c$. The message is $bc$, with interval $[0.87, 0.9)$ of width $0.03$. The encoder would use $\lceil\log_2(1/0.03)\rceil + 1 = \lceil5.06\rceil + 1 = 7$ bits — it would not have sent $111$, whose dyadic interval $[0.875, 1)$ is not inside $[0.87, 0.9)$. A decoder that knows the length can still read $111$ as $bc$, but the prefix property of [[#thm-arith-length]] needs the full seven bits; the midpoint $0.885 = 0.11100010\ldots_2$ gives $1110000$, whose dyadic interval $[0.875, 0.8828)$ does lie inside.
:::
:::

::: exercise Atypical sets are useless {level=2}
Show that any set $B_n$ of at most $2^{n(H - 2\epsilon)}$ sequences has $P(X^n \in B_n) \to 0$ as $n \to \infty$. Interpret the result for fixed-rate codes.
::: solution
Split $B_n$ into its typical and atypical parts. The typical part has at most $2^{n(H - 2\epsilon)}$ sequences, each of probability at most $2^{-n(H - \epsilon)}$, so its probability is at most $2^{-n\epsilon} \to 0$. The atypical part has probability at most $P(X^n \notin A_\epsilon^{(n)}) \to 0$ by [[#thm-aep]]. A fixed-rate code with $n(H - 2\epsilon)$ bits can describe only $2^{n(H - 2\epsilon)}$ sequences without error, so its probability of failing tends to one: rates below the entropy are impossible for reliable fixed-rate coding, not merely inefficient.
:::
:::

::: exercise Huffman coding of triples {level=3 check="1.598/3"}
::: hint
The eight blocks have probabilities $0.729$, $0.081$ (three times), $0.009$ (three times) and $0.001$. Merge carefully: the second-level node weights are $0.010$, $0.018$, $0.028$, …
:::
Verify the rate $0.533$ bits per source bit quoted in [[#ex-huffman-blocks]] for blocks of three bits with $P(1) = 0.1$, giving the codeword lengths.
::: solution
Merges: $0.001 + 0.009 = 0.010$; $0.009 + 0.009 = 0.018$; $0.010 + 0.018 = 0.028$; $0.028 + 0.081 = 0.109$; $0.081 + 0.081 = 0.162$; $0.109 + 0.162 = 0.271$; $0.271 + 0.729 = 1$. Reading the tree from the root: $0.729$ (block $000$) and $0.271$ are at depth $1$; $0.109$ and $0.162$ at depth $2$; the two $0.081$ blocks inside $0.162$, the third $0.081$ and the node $0.028$ (both inside $0.109$) at depth $3$; $0.010$ and $0.018$ at depth $4$; and the $0.001$ block and the three $0.009$ blocks at depth $5$. Lengths: $1, 3, 3, 3, 5, 5, 5, 5$; Kraft sum $\tfrac12 + \tfrac38 + \tfrac4{32} = 1$. $L_3 = 0.729 + 3(0.243) + 5(0.028) = 0.729 + 0.729 + 0.140 = 1.598$ bits per triple, $0.533$ bits per source bit.
:::
:::

::: exercise Run-length coding a fax line {level=3}
::: hint
The run length $R$ of white pixels, ending at a black pixel, is geometric: $P(R = r) = (1 - q)^rq$. Its entropy is $H_b(q)/q$.
:::
In a scanned page, each pixel is independently black with probability $q = 0.05$. (a) Find the entropy per pixel. (b) Show that coding the lengths of white runs (each ended by a black pixel) loses nothing: the entropy per run divided by the mean number of pixels per run equals the entropy per pixel. (c) A simple code sends each run length in a fixed $6$-bit field, using an escape for runs over $62$. Estimate its rate in bits per pixel ignoring escapes, and compare.
::: solution
(a) $H_b(0.05) = 0.286$ bits per pixel. (b) A run of $r$ whites followed by one black is $r + 1$ pixels, with $E[R + 1] = 1/q = 20$ pixels per run. $H(R) = -\sum(1 - q)^rq\log_2\big((1 - q)^rq\big) = -\log_2q - E[R]\log_2(1 - q) = \big[-q\log_2q - (1 - q)\log_2(1 - q)\big]/q = H_b(q)/q = 5.73$ bits per run, and $5.73/20 = 0.286$ bits per pixel, the same: the runs are a one-to-one description of the pixel sequence, and they are independent, so no information or efficiency is lost. (c) Six bits per run gives $6/20 = 0.30$ bits per pixel, only $5\,\%$ above the entropy (runs of $63$ or more occur with probability $0.95^{63} = 4\,\%$ and need escapes, adding a little). A Huffman or Golomb code for the geometric distribution gets closer, as the fax standard's modified Huffman tables do.
:::
:::
