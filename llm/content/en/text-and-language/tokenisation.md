A neural language model has an input layer with one row per symbol and an output layer with one probability per symbol, so before anything is learned someone must fix the list of symbols. Whole words are the obvious choice and a bad one: [[text-and-language/text-as-data]] showed that a word vocabulary never closes — half the types of a novel occur once, and new ones keep coming. Characters or bytes are the opposite choice: a tiny, closed alphabet, but sequences five times longer, and a model that must spend capacity rediscovering that *t*, *h*, *e* make a word. Modern models sit in between. They use **subword tokenisers**, learned from data, that keep frequent words whole and build rare words from pieces.

This chapter builds the three subword algorithms in use — **byte-pair encoding** (BPE), **WordPiece** and the **unigram language model** — runs BPE by hand and in Python, trains a byte-level BPE tokeniser on a real novel, and then looks at the consequences of tokenisation that users of language models notice: odd failures at spelling and arithmetic, sensitivity to spaces and capitals, and large differences in cost between languages.

## What a tokeniser is {#sec-tokeniser}

::: definition Tokeniser {#def-tokeniser}
A **tokeniser** consists of a finite **vocabulary** $\mathcal{V}$ of **tokens**, each identified with an integer id in $\{0, \dots, \lvert\mathcal{V}\rvert - 1\}$ and standing for a string (or byte string), together with two maps:

- an **encoder** $\operatorname{enc}$ from strings to finite sequences of ids, and
- a **decoder** $\operatorname{dec}$ from id sequences to strings, usually the concatenation of the tokens' strings.

The tokeniser is **lossless** if $\operatorname{dec}(\operatorname{enc}(s)) = s$ for every string $s$, and **complete** (has no out-of-vocabulary inputs) if $\operatorname{enc}$ is defined on every string. In practice the encoder is a pipeline: **normalisation** (for instance NFKC, [[text-and-language/text-as-data#def-normal-forms]]), **pre-tokenisation** (splitting into chunks, for instance at spaces, that tokens may not cross), and the **model** proper, which segments each chunk into tokens.
:::

A language model trained on top of a tokeniser defines a distribution over id sequences, $p_\theta(x_1, \dots, x_T) = \prod_tp_\theta(x_t\mid x_{<t})$, and the tokeniser turns this into a distribution over text. The three classical choices of model illustrate the trade-off.

- **Word-level**: split at spaces and punctuation, keep the $V$ most frequent words, map the rest to a special token `<unk>`. Not complete without `<unk>`, and not lossless with it. Sequences are short (about one token per word in English).
- **Character-level**: one token per code point. Lossless and nearly complete, but Unicode has about $155{,}000$ assigned characters, so either the vocabulary is large or rare characters become `<unk>`. Sequences are long, roughly five or six tokens per English word including spaces.
- **Byte-level**: one token per UTF-8 byte, $\lvert\mathcal{V}\rvert = 256$. Lossless and complete for every possible input. Sequences are as long as the UTF-8 encoding — and, by [[text-and-language/text-as-data#prop-utf8]], two to three times longer for many non-Latin scripts than for English.

Sequence length matters because the cost of a Transformer grows with it (quadratically for attention, [[transformers/attention-complexity]]) and because a fixed context window holds less text when tokens are short. Vocabulary size matters because the embedding and output matrices have $\lvert\mathcal{V}\rvert\times d_{\text{model}}$ parameters each, and because each token's embedding is learned only from that token's occurrences. Subword tokenisers give up a little of each to gain a lot of both.

## Byte-pair encoding {#sec-bpe}

Byte-pair encoding began as a data-compression method: Gage (1994) repeatedly replaced the most frequent pair of adjacent bytes in a file by a byte value not otherwise used. Sennrich, Haddow and Birch (2016) turned it into a way of learning a subword vocabulary for neural machine translation: start from characters and repeatedly **merge** the most frequent adjacent pair of symbols into a new symbol.

::: algorithm BPE training (Sennrich et al., 2016) {#alg-bpe}
**Input:** a corpus pre-tokenised into words with frequencies $c(w)$; a number of merges $m$.

1. Write each word as a sequence of its characters followed by an end-of-word marker `</w>`. The initial vocabulary is the set of characters (and the marker).
2. Repeat $m$ times:
   1. Count every adjacent pair of symbols $(a, b)$ over the corpus, each occurrence in word $w$ counting $c(w)$.
   2. Choose the most frequent pair (with a fixed rule for ties).
   3. Add the new symbol $ab$ to the vocabulary, record the merge $(a, b)$, and replace every occurrence of $a$ followed by $b$ in the corpus by $ab$, scanning each word from left to right.

**Output:** the ordered list of merges. To **encode** a new word, split it into characters and `</w>` and apply the merges in the order in which they were learned.
:::

::: example BPE by hand {#ex-bpe-hand}
Train BPE on the corpus of Sennrich et al.: *low* ($5$ times), *lower* ($2$), *newest* ($6$), *widest* ($3$). Find the first five merges, and the segmentation of *lowest*, a word not in the corpus. Break ties alphabetically.
::: solution
Initially the words are `l o w </w>` (×5), `l o w e r </w>` (×2), `n e w e s t </w>` (×6) and `w i d e s t </w>` (×3), a total of $5\cdot4 + 2\cdot6 + 6\cdot7 + 3\cdot7 = 95$ symbols. Pair counts:

| pair | count | pair | count |
|---|---|---|---|
| `e s` | $6 + 3 = 9$ | `s t` | $9$ |
| `t </w>` | $9$ | `l o`, `o w` | $7$ each |
| `w e` | $2 + 6 = 8$ | `n e`, `e w` | $6$ each |
| `w </w>` | $5$ | `i d`, `d e`, `w i` | $3$ each |
| `e r`, `r </w>` | $2$ each | | |

Merge 1 is `e s` (count $9$; it is alphabetically first among the pairs of count $9$). Now *newest* is `n e w es t </w>` and *widest* `w i d es t </w>`, and `es t` has count $9$: merge 2 is `es t`, and merge 3 is `est </w>`, also $9$. Then `l o` ($7$) and `lo w` ($7$): merges 4 and 5. After five merges the corpus reads `low </w>` (×5), `low e r </w>` (×2), `n e w est</w>` (×6), `w i d est</w>` (×3): $95 - (9 + 9 + 9 + 7 + 7) = 54$ symbols.

To encode *lowest*: `l o w e s t </w>` → (merge 1) `l o w es t </w>` → (2) `l o w est </w>` → (3) `l o w est</w>` → (4) `lo w est</w>` → (5) `low est</w>`. The unseen word is split into two meaningful pieces, a stem and a suffix, learned from other words.
:::
:::

The same in Python — a direct transcription of [[#alg-bpe]], run for ten merges:

```python
import collections

def pair_counts(vocab):
    """vocab: {tuple of symbols: word frequency} -> Counter of adjacent symbol pairs"""
    pairs = collections.Counter()
    for word, freq in vocab.items():
        for a, b in zip(word, word[1:]):
            pairs[a, b] += freq
    return pairs

def merge(vocab, pair):
    """Replace every occurrence of the adjacent pair (a, b) by the symbol a+b."""
    a, b = pair
    out = {}
    for word, freq in vocab.items():
        new, i = [], 0
        while i < len(word):
            if i + 1 < len(word) and word[i] == a and word[i + 1] == b:
                new.append(a + b); i += 2
            else:
                new.append(word[i]); i += 1
        out[tuple(new)] = freq
    return out

def train_bpe(word_freqs, num_merges):
    vocab = {tuple(w) + ("</w>",): f for w, f in word_freqs.items()}
    merges = []
    for _ in range(num_merges):
        pairs = pair_counts(vocab)
        if not pairs:
            break
        best = max(sorted(pairs), key=lambda p: pairs[p])   # most frequent; ties: alphabetical
        merges.append((best, pairs[best]))
        vocab = merge(vocab, best)
    return merges, vocab

def encode(word, merges):
    """Apply the learned merges, in the order learned, to a new word."""
    symbols = {tuple(word) + ("</w>",): 1}
    for pair, _ in merges:
        symbols = merge(symbols, pair)
    return list(next(iter(symbols)))

corpus = {"low": 5, "lower": 2, "newest": 6, "widest": 3}
merges, vocab = train_bpe(corpus, 10)
for k, (pair, count) in enumerate(merges, 1):
    print(f"merge {k:>2}: {pair[0]!r:>8} + {pair[1]!r:<7} (count {count})")
print(vocab)
for w in ["lowest", "newer", "wider", "slow"]:
    print(w, "->", encode(w, merges))
```

```text
merge  1:      'e' + 's'     (count 9)
merge  2:     'es' + 't'     (count 9)
merge  3:    'est' + '</w>'  (count 9)
merge  4:      'l' + 'o'     (count 7)
merge  5:     'lo' + 'w'     (count 7)
merge  6:      'e' + 'w'     (count 6)
merge  7:     'ew' + 'est</w>' (count 6)
merge  8:      'n' + 'ewest</w>' (count 6)
merge  9:    'low' + '</w>'  (count 5)
merge 10:      'd' + 'est</w>' (count 3)
{('low</w>',): 5, ('low', 'e', 'r', '</w>'): 2, ('newest</w>',): 6, ('w', 'i', 'dest</w>'): 3}
lowest -> ['low', 'est</w>']
newer -> ['n', 'ew', 'e', 'r', '</w>']
wider -> ['w', 'i', 'd', 'e', 'r', '</w>']
slow -> ['s', 'low</w>']
```

After ten merges the frequent words *low* and *newest* are single tokens, while the rare *lower* is `low e r </w>`. The new word *slow* is encoded without any unknown symbol, as `s` + `low</w>`. Notice also that the result depends on the tie-breaking rule (merges 6–8 all have count $6$) and that merges can produce pieces with no linguistic meaning, such as `ew`: BPE optimises frequency, not morphology.

::: proposition Properties of BPE {#prop-bpe}
Let a BPE tokeniser be trained with $m$ merges on a corpus whose initial segmentation has $L_0$ symbols.

1. The vocabulary has at most $\lvert\mathcal{V}_0\rvert + m$ symbols, where $\mathcal{V}_0$ is the initial alphabet.
2. If the chosen pair has $a\ne b$, the merge reduces the number of symbols in the corpus by exactly the pair's count. Hence after $m$ such merges the corpus has $L_0 - \sum_{k=1}^{m}n_k$ symbols, where $n_k$ is the count of the $k$-th merged pair, and each merge is the greedy choice that shortens the corpus most.
3. Encoding is lossless — the concatenation of the tokens of a word is the word — and complete for every word whose characters are all in $\mathcal{V}_0$.
:::

::: proof
(1) Each merge adds at most one new symbol. (It can add none if the merged string already exists, for instance when both `a bc` and `ab c` are merged; then the two merges produce the same string.)

(2) If $a\ne b$, two occurrences of the pair $(a, b)$ in a word cannot overlap: overlapping would need a symbol that is both the $b$ of one occurrence and the $a$ of the next, so $a = b$. The left-to-right scan therefore replaces every counted occurrence, and each replacement turns two symbols into one. Summing over the corpus with multiplicities $c(w)$, the length falls by exactly the pair's count. The greedy statement follows: among all possible merges, the one with the largest count shortens the corpus most. (If $a = b$, as in `a a a`, counting overlapping pairs gives $2$ while only one replacement is possible, so the reduction can be smaller than the count; exercise 9.)

(3) A merge replaces two adjacent symbols by their concatenation, so the concatenation of all the symbols of a word never changes; it starts as the word. Encoding a word with characters in $\mathcal{V}_0$ starts from valid symbols and every merge produces a vocabulary symbol, so the output consists of tokens.
:::

The proposition says BPE is a **greedy compressor**: each step makes the training corpus as short as one merge can. It is not globally optimal — choosing the best sequence of $m$ merges is a much harder combinatorial problem — and greedy choices made early constrain later ones. Empirically, training on more data or with more merges gives longer tokens with diminishing returns, as the next section measures.

## Byte-level BPE {#sec-byte-bpe}

Starting BPE from characters leaves the alphabet $\mathcal{V}_0$ open: an emoji or a Chinese character absent from training becomes `<unk>`. Radford et al. (2019), for GPT-2, started instead from the $256$ byte values. Every string is a byte sequence, so the tokeniser is complete with no unknown token at all, and merges learn multi-byte characters just as they learn multi-letter words. GPT-2's vocabulary has $50{,}257$ tokens: $256$ bytes, $50{,}000$ merges and one special end-of-text token. To keep merges from crossing word boundaries in unhelpful ways ("dog." and "dog!" becoming separate tokens), GPT-2 first splits text with a regular expression into runs of letters, runs of digits and runs of other symbols, each run keeping its leading space; merges never cross these chunks.

Here is byte-level BPE trained on the bytes of *Moby-Dick* (Project Gutenberg eBook #2701, the text of [[text-and-language/text-as-data#sec-zipf]]), with a simplified version of GPT-2's pre-tokenisation pattern, followed by tokenisation of the first sentence of Article 1 of the Universal Declaration of Human Rights in its official English, French, Russian and Chinese versions.

```python
import re, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]

# GPT-2-style pre-tokenisation: letters, digits, other symbols; a word keeps its leading space
PAT = re.compile(r" ?[^\W\d_]+| ?\d+| ?[^\s\w]+|\s+(?!\S)|\s+")
chunks = collections.Counter(PAT.findall(text))
words = {tuple(c.encode("utf-8")): f for c, f in chunks.items()}   # symbols: ints 0..255
print("pre-tokens:", sum(chunks.values()), " distinct:", len(chunks),
      " bytes:", sum(len(w) * f for w, f in words.items()))

def pair_counts(words):
    pairs = collections.Counter()
    for w, f in words.items():
        for a, b in zip(w, w[1:]):
            pairs[a, b] += f
    return pairs

def merge(words, pair, new):
    out = {}
    for w, f in words.items():
        s, i = [], 0
        while i < len(w):
            if i + 1 < len(w) and (w[i], w[i + 1]) == pair:
                s.append(new); i += 2
            else:
                s.append(w[i]); i += 1
        out[tuple(s)] = f
    return out

token_bytes = {i: bytes([i]) for i in range(256)}         # token id -> its bytes
merges = []
for step in range(1000):                                   # about a minute and a half in CPython
    pairs = pair_counts(words)
    best = max(pairs, key=lambda p: (pairs[p], p))         # most frequent; ties by larger ids
    new = 256 + step
    token_bytes[new] = token_bytes[best[0]] + token_bytes[best[1]]
    merges.append(best)
    words = merge(words, best, new)
    if step < 6 or (step + 1) in (100, 300, 1000):
        n = sum(len(w) * f for w, f in words.items())
        print(f"merge {step + 1:>4}: {token_bytes[new]!r:<15} tokens in corpus {n}")

rank = {pair: 256 + k for k, pair in enumerate(merges)}
def encode(s):
    ids = []
    for chunk in PAT.findall(s):
        w = list(chunk.encode("utf-8"))
        while len(w) > 1:                                  # apply the earliest-learned merge
            cands = [(rank[p], i) for i, p in enumerate(zip(w, w[1:])) if p in rank]
            if not cands:
                break
            r, i = min(cands)
            w[i:i + 2] = [r]
        ids += w
    return ids

show = lambda ids: [token_bytes[i].decode("utf-8", "replace") for i in ids]
udhr = {   # Universal Declaration of Human Rights, Article 1, first sentence
    "English": "All human beings are born free and equal in dignity and rights.",
    "French":  "Tous les êtres humains naissent libres et égaux en dignité et en droits.",
    "Russian": "Все люди рождаются свободными и равными в своем достоинстве и правах.",
    "Chinese": "人人生而自由，在尊严和权利上一律平等。",
}
for lang, s in udhr.items():
    ids = encode(s)
    assert b"".join(token_bytes[i] for i in ids) == s.encode("utf-8")   # lossless
    print(f"{lang:<8} chars {len(s):>3}  bytes {len(s.encode()):>4}  tokens {len(ids):>4}")
print(show(encode(udhr["English"])))
for s in [" whale", " Whale", "whale", " WHALE", " strawberry", " 1851"]:
    print(repr(s), show(encode(s)))
```

```text
pre-tokens: 283958  distinct: 24002  bytes: 1233772
merge    1: b' t'           tokens in corpus 1202661
merge    2: b'he'           tokens in corpus 1176426
merge    3: b' a'           tokens in corpus 1155974
merge    4: b'in'           tokens in corpus 1136486
merge    5: b' the'         tokens in corpus 1120156
merge    6: b' s'           tokens in corpus 1105402
merge  100: b'\xe2\x80\x9d' tokens in corpus 723194
merge  300: b'our'          tokens in corpus 577122
merge 1000: b'ought'        tokens in corpus 452949
English  chars  63  bytes   63  tokens   23
French   chars  72  bytes   75  tokens   41
Russian  chars  69  bytes  127  tokens  127
Chinese  chars  19  bytes   57  tokens   57
['A', 'll', ' hum', 'an', ' be', 'ings', ' are', ' b', 'orn', ' f', 'ree', ' and', ' e', 'qu', 'al', ' in', ' d', 'ign', 'ity', ' and', ' right', 's', '.']
' whale' [' whale']
' Whale' [' Whale']
'whale' ['whale']
' WHALE' [' W', 'HA', 'L', 'E']
' strawberry' [' st', 'raw', 'ber', 'ry']
' 1851' [' 1', '8', '5', '1']
```

Several things are visible. Merge 5 creates ` the` from ` t` and `he`, merges of merges. Merge 100 creates the three-byte closing quotation mark `”` (E2 80 9D): byte-level BPE learns multi-byte characters only if they are frequent. After $1{,}000$ merges the corpus has shrunk from $1{,}233{,}772$ bytes to $452{,}949$ tokens, $2.72$ bytes per token; production tokenisers with $50{,}000$–$250{,}000$ tokens trained on far more text reach roughly four bytes per token on English (as of 2026), the figure used for conversions in [[text-and-language/perplexity]].

::: widget regression
points: 1,1.167; 2,1.706; 2.301,1.967; 2.477,2.138; 2.602,2.272; 2.699,2.383; 2.778,2.473; 2.845,2.549; 2.903,2.614; 2.954,2.672; 3,2.724
degree: 1
x: 0.8, 3.2
y: 1, 3
caption: Compression achieved by byte-level BPE on *Moby-Dick*: bytes per token in the training corpus against $\log_{10}$ of the number of merges ($10$ to $1000$, from the same run as the listing). Each tenfold increase in merges buys roughly one more byte per token over this range, with the curve bending down as the merges reach rarer pairs. Try degree $2$ to see the diminishing returns.
:::

## WordPiece {#sec-wordpiece}

WordPiece was introduced by Schuster and Nakajima (2012) for Japanese and Korean voice search, used by Google's neural machine translation system (Wu et al., 2016), and made widely known by BERT (Devlin et al., 2019), whose English vocabulary has about $30{,}000$ WordPiece tokens. Google did not release its training code; the description below follows the open reimplementations (notably Hugging Face's), which differ from BPE in two places.

::: definition WordPiece {#def-wordpiece}
Words are written as their first character followed by the remaining characters each marked as word-internal with the prefix `##` (so *low* becomes `l ##o ##w`). Training merges, at each step, the adjacent pair $(a, b)$ with the largest **score**

$$
\operatorname{score}(a, b) = \frac{c(ab)}{c(a)\,c(b)},
$$ {#eq-wordpiece}

where $c(ab)$ is the number of adjacent occurrences of the pair and $c(a)$, $c(b)$ the numbers of occurrences of the symbols. Encoding a word is **greedy longest-match-first**: take the longest vocabulary token that is a prefix of the word, then the longest `##` token that is a prefix of the rest, and so on; if at some point no token matches, the whole word becomes `[UNK]`.
:::

The score divides the pair count by the counts of its parts, so it prefers pairs whose parts rarely occur apart: it is the ratio of the observed pair probability $c(ab)/N$ to the probability $c(a)c(b)/N^2$ that independence would predict, divided by the constant $N$ — the ratio the quantity whose logarithm is the **pointwise mutual information** of [[text-and-language/word-embeddings]]. Merging $a$ and $b$ into one symbol increases the likelihood of a unigram model of the symbol sequence by an amount that grows with this ratio, which is the original motivation for the criterion.

::: example WordPiece versus BPE on the same corpus {#ex-wordpiece}
For the corpus of [[#ex-bpe-hand]], written in WordPiece form, compute the scores of the pairs `##e ##s`, `##s ##t`, `l ##o` and `w ##i`. Which pair does WordPiece merge first?
::: solution
The symbol counts (each occurrence weighted by word frequency) are: `##e` $= 5\cdot0 + 2 + 2\cdot6 + 3 = 17$ (one in *lower*, two in *newest*, one in *widest*), `##s` $= 9$, `##t` $= 9$, `l` $= 7$, `##o` $= 7$, `w` $= 3$, `##i` $= 3$. The pair counts are $9$, $9$, $7$ and $3$. Scores:

$$
\tfrac{9}{17\cdot9} = 0.059,\qquad \tfrac{9}{9\cdot9} = 0.111,\qquad \tfrac{7}{7\cdot7} = 0.143,\qquad \tfrac{3}{3\cdot3} = 0.333.
$$

WordPiece merges `w ##i` first (as does `##i ##d`, which also scores $1/3$), even though it occurs only $3$ times: *w* and *i* never occur except together in *widest*. BPE merged `e s` first because it was the most frequent pair. WordPiece prefers cohesive pairs, BPE frequent ones.
:::
:::

## The unigram language model {#sec-unigram}

BPE and WordPiece build a vocabulary bottom-up and segment deterministically. Kudo (2018) proposed the reverse: start from a large vocabulary, treat segmentation as probabilistic, and prune.

::: definition Unigram language-model tokeniser {#def-unigram}
A **unigram tokeniser** has a vocabulary $\mathcal{V}$ and a probability $p(t)$ for each token, $\sum_{t\in\mathcal{V}}p(t) = 1$. A **segmentation** of a string $x$ is a sequence of tokens $\mathbf{t} = (t_1, \dots, t_k)$ whose concatenation is $x$; write $S(x)$ for the set of segmentations. The model assigns

$$
P(\mathbf{t}) = \prod_{i=1}^{k}p(t_i),\qquad P(x) = \sum_{\mathbf{t}\in S(x)}P(\mathbf{t}).
$$ {#eq-unigram}

The encoder returns the most probable segmentation $\mathbf{t}^* = \arg\max_{\mathbf{t}\in S(x)}P(\mathbf{t})$.
:::

The number of segmentations grows exponentially with the length of $x$ (a string of $n$ characters with all substrings in the vocabulary has $2^{n-1}$), but the best one is found by dynamic programming.

::: proposition Viterbi segmentation {#prop-viterbi}
For $i = 0, 1, \dots, n$ let $B(i)$ be the largest log-probability of a segmentation of the prefix $x_{1:i}$ (with $B(0) = 0$ and $B(i) = -\infty$ if there is none). Then

$$
B(i) = \max_{\substack{0\le j < i\\ x_{j+1:i}\in\mathcal{V}}}\Big(B(j) + \log p(x_{j+1:i})\Big),
$$

and $\mathbf{t}^*$ is recovered by remembering the maximising $j$ at each $i$. If tokens have at most $\ell$ characters, the computation takes $O(n\ell)$ vocabulary look-ups.
:::

::: proof
Any segmentation of $x_{1:i}$ has a last token $x_{j+1:i}$ for some $j < i$, preceded by a segmentation of $x_{1:j}$. Its log-probability is the log-probability of that shorter segmentation plus $\log p(x_{j+1:i})$, by [[#eq-unigram]]. For fixed $j$ this is largest when the shorter segmentation is optimal, giving $B(j) + \log p(x_{j+1:i})$; maximising over $j$ gives the recursion. (Optimal substructure holds because the score is a sum over tokens.) Each $i$ examines at most $\ell$ values of $j$, so there are $O(n\ell)$ steps. Replacing $\max$ by a sum of probabilities gives the **forward algorithm**, which computes $P(x)$ in the same time (exercise 8).
:::

::: example A Viterbi segmentation {#ex-viterbi}
A unigram vocabulary contains, among other tokens, `l` (0.04), `o` (0.05), `w` (0.04), `e` (0.08), `s` (0.06), `t` (0.07), `lo` (0.02), `low` (0.05), `we` (0.01), `est` (0.04), `west` (0.005) and `st` (0.03). Find the most probable segmentation of *lowest* and its share of $P(\textit{lowest})$.
::: solution
```python
import math
p = {"l": 0.04, "o": 0.05, "w": 0.04, "e": 0.08, "s": 0.06, "t": 0.07,
     "lo": 0.02, "low": 0.05, "we": 0.01, "est": 0.04, "west": 0.005, "st": 0.03}

def viterbi(x, p):
    """best[i] = (log-prob, segmentation) of the best segmentation of x[:i]"""
    best = [(0.0, [])] + [(-math.inf, None)] * len(x)
    for i in range(1, len(x) + 1):
        for j in range(max(0, i - 4), i):            # pieces are at most 4 characters long
            piece = x[j:i]
            if piece in p and best[j][1] is not None:
                score = best[j][0] + math.log(p[piece])
                if score > best[i][0]:
                    best[i] = (score, best[j][1] + [piece])
    return best[-1]

def all_segmentations(x, p):
    if not x:
        yield []; return
    for k in range(1, len(x) + 1):
        if x[:k] in p:
            for rest in all_segmentations(x[k:], p):
                yield [x[:k]] + rest

logp, seg = viterbi("lowest", p)
print("Viterbi:", seg, "P =", f"{math.exp(logp):.3g}")
segs = sorted(all_segmentations("lowest", p), key=lambda s: -math.prod(p[t] for t in s))
total = sum(math.prod(p[t] for t in s) for s in segs)
print(len(segs), "segmentations; P(x) =", f"{total:.4g}")
for s in segs[:5]:
    q = math.prod(p[t] for t in s)
    print(f"{' + '.join(s):<22} {q:.3g}   posterior {q / total:.3f}")
```

```text
Viterbi: ['low', 'est'] P = 0.002
15 segmentations; P(x) = 0.002292
low + est              0.002   posterior 0.873
low + e + st           0.00012   posterior 0.052
lo + west              0.0001   posterior 0.044
lo + w + est           3.2e-05   posterior 0.014
low + e + s + t        1.68e-05   posterior 0.007
```

The best segmentation is `low + est` with probability $0.05\cdot0.04 = 0.002$, which is $87\%$ of the total probability $P(\textit{lowest}) = 0.002292$ spread over $15$ segmentations. A segmentation into more tokens multiplies more probabilities below one, so the unigram model has a built-in preference for few, long tokens.
:::
:::

**Training** a unigram tokeniser alternates two steps, starting from a large seed vocabulary (for example all frequent substrings of the corpus). The **EM step** fits the probabilities $p(t)$ by maximising the corpus likelihood $\sum_wc(w)\log P(w)$, where the expected number of times each token is used is computed over all segmentations with the forward–backward algorithm. The **pruning step** computes, for each token, how much the likelihood would fall if it were removed, and drops the tokens with the smallest loss (Kudo keeps the best $80\%$ each round), always keeping single characters so that every string remains segmentable. The two steps repeat until the vocabulary reaches the target size.

Because the model is probabilistic, it can also **sample** segmentations rather than always using the best one. Kudo's **subword regularisation** draws $\mathbf{t}$ with probability proportional to $P(\mathbf{t})^{\alpha}$ during training, so the model sees *lowest* sometimes as `low + est`, sometimes as `low + e + st`; this acts as data augmentation and improved translation quality in his experiments. BPE-dropout (Provilkov et al., 2020) achieves a similar effect for BPE by randomly skipping merges.

::: widget plot
f: 1/(1+0.06^x+0.05^x+0.016^x+0.0084^x+0.005^x+0.003^x+0.0016^x+0.00096^x+0.00042^x+0.0003^x+0.000134^x+0.000096^x+0.000042^x+0.0000134^x); 0.05^x/(1+0.06^x+0.05^x+0.016^x+0.0084^x+0.005^x+0.003^x+0.0016^x+0.00096^x+0.00042^x+0.0003^x+0.000134^x+0.000096^x+0.000042^x+0.0000134^x)
x: 0, 2
y: 0, 1
labels: $P(\text{low + est})$; $P(\text{lo + west})$
caption: Subword regularisation for *lowest* with the vocabulary of [[#ex-viterbi]]: the probability of sampling the best segmentation (`low + est`) and the third best (`lo + west`) when segmentations are drawn with probability proportional to $P(\mathbf{t})^{\alpha}$, against $\alpha$. At $\alpha = 0$ all $15$ segmentations are equally likely; at $\alpha = 1$ the model's own posterior ($0.873$) is used; as $\alpha$ grows, sampling approaches the deterministic Viterbi segmentation.
:::

## SentencePiece {#sec-sentencepiece}

All three algorithms above assume a pre-tokenisation into words, usually at spaces — which does not exist for Chinese or Japanese and loses information about spacing. **SentencePiece** (Kudo and Richardson, 2018) is a library that implements BPE and the unigram model directly on raw text. It treats the input as a sequence of Unicode characters including spaces, replaces each space by the visible symbol `▁` (U+2581), and learns tokens such as `▁the`, so decoding is exact concatenation followed by replacing `▁` with a space. By default it applies NFKC-based normalisation, and an optional **byte fallback** represents characters outside the vocabulary by their UTF-8 bytes, making the tokeniser complete. SentencePiece unigram models are used, for example, by T5 and ALBERT, and SentencePiece BPE with byte fallback by the first Llama models; GPT-2-style byte-level BPE (with libraries such as OpenAI's `tiktoken`) is used by the GPT family and many open models. Vocabulary sizes of public models range from about $32{,}000$ (the original Llama, 2023) to over $250{,}000$ (Gemma), as documented in their technical reports (as of 2026).

::: quiz
Which of these tokenisers can encode an arbitrary string, including emoji and scripts absent from training, without an unknown token?
- [ ] Word-level with the $50{,}000$ most frequent words
- [ ] WordPiece with a character-level base vocabulary built from the training corpus
- [x] Byte-level BPE
- [x] SentencePiece unigram with byte fallback
::: solution
Byte-level BPE starts from all $256$ byte values, and byte fallback gives SentencePiece the same guarantee; every string is a byte sequence. Word-level tokenisers map unseen words to `<unk>`, and a character-level WordPiece vocabulary cannot encode a character that never appeared in training.
:::
:::

## Tokenisation artefacts {#sec-artefacts}

The tokeniser is fixed before training and is invisible in a model's interface, so its effects show up as puzzling behaviour.

**Spelling and counting.** In the listing, *strawberry* is four tokens, ` st`, `raw`, `ber`, `ry`; a production tokeniser may use one or two. The model receives ids, not letters, so a question such as "how many *r*s are in *strawberry*?" asks it about the internal spelling of tokens, which it can learn only indirectly from data in which words are spelled out. Errors on such tasks, and on reversing or rhyming words, are partly tokenisation effects rather than failures of reasoning — though models can also learn to work around them.

**Case and spaces.** ` whale`, ` Whale` and `whale` are three unrelated tokens, and ` WHALE` is four. The model must learn separately that they are the same word. A prompt that ends with a trailing space leaves the next word's natural token (which includes its leading space) unavailable, which can visibly change the continuation.

**Numbers.** ` 1851` became ` 1` `8` `5` `1` here; other tokenisers learn frequent numbers such as years as single tokens, so that $1851$ is one token and $1852$ two. Arithmetic then has to operate on inconsistent chunks of digits. To make digit positions consistent, some tokenisers split numbers into single digits (PaLM, 2022; Llama, 2023) and others into groups of at most three digits.

**Under-trained tokens.** A token can be frequent in the tokeniser's training data and almost absent from the model's training data, so that its embedding is barely trained. Rumbelow and Watkins (2023) found such tokens in GPT-2 and GPT-3 vocabularies (the best known is ` SolidGoldMagikarp`, a Reddit user name) that made models behave erratically; Land and Bartolo (2024) gave methods to detect under-trained tokens in open models.

::: warning A token is not a word, and token counts are not text lengths
It is tempting to read "a 128,000-token context" or "$\$x$ per million tokens" as a statement about words. It is not: the number of tokens per word depends on the tokeniser, the language and the kind of text (code, numbers, rare names). For English prose, "about four characters or three-quarters of a word per token" is a common rule of thumb for current tokenisers, but it can be wrong by a factor of several for other languages. Likewise per-token losses and perplexities of models with different tokenisers are not comparable ([[text-and-language/perplexity]]).
:::

## Multilingual disparity {#sec-disparity}

The listing tokenised the same sentence in four languages with a tokeniser trained only on English. English needed $23$ tokens, French $41$, Chinese $57$ — one per byte, three per character — and Russian $127$, again one per byte: no Cyrillic pair occurred in *Moby-Dick*, so no Cyrillic merge was learned.

::: definition Tokenisation parity {#def-parity}
For a tokeniser $\tau$ and a pair of parallel texts — a text $x_A$ in language $A$ and its translation $x_B$ in language $B$ — the **tokenisation premium** (or parity ratio) of $A$ relative to $B$ is $\lvert\tau(x_A)\rvert/\lvert\tau(x_B)\rvert$, the ratio of their lengths in tokens, averaged over a parallel corpus. A ratio near $1$ means the tokeniser treats the two languages equally.
:::

Real tokenisers are trained on multilingual data and do far better than the English-only one above, but they inherit the imbalance of their training data. Petrov, La Malfa, Torr and Bibi (2023), measuring tokenisers of widely used models on the FLORES-200 parallel corpus, found that the same content can need many times more tokens in some languages than in English — up to about $15$ times in the worst cases they report — with low-resource languages and non-Latin scripts most affected, even for byte-level and character-level tokenisers. Since use of commercial models is billed per token and the context window is fixed in tokens, speakers of such languages pay more, fit less text into the context and wait longer for responses; the model also has fewer tokens' worth of text to learn from per sentence. Proposed mitigations include training tokenisers on more balanced data, larger vocabularies, and tokenisers designed for parity; Petrov et al. argue for the last.

::: example The cost of a premium {#ex-parity}
Using the counts of the listing, compute the premiums of French, Chinese and Russian relative to English, and the number of copies of the Russian sentence that fit into a context of $2{,}048$ tokens compared with the English one.
::: solution
French $41/23 = 1.78$, Chinese $57/23 = 2.48$, Russian $127/23 = 5.52$. A $2{,}048$-token context holds $\lfloor2048/23\rfloor = 89$ copies of the English sentence but only $\lfloor2048/127\rfloor = 16$ of the Russian one. The figures exaggerate the situation for real multilingual tokenisers, but the mechanism — merges are learned where the training data are — is the same.
:::
:::

::: example Embedding parameters {#ex-embedding-params}
GPT-2 small has $\lvert\mathcal{V}\rvert = 50{,}257$ and $d_{\text{model}} = 768$, with the input embedding matrix shared with the output layer. How many parameters does that matrix have, and what fraction of the model's roughly $124$ million parameters is it? What if the vocabulary were $256{,}000$?
::: solution
$50{,}257\times768 = 38{,}597{,}376$, about $31\%$ of $124$ million. With $256{,}000$ tokens the matrix would have $196.6$ million parameters, more than the rest of the model. For small models the vocabulary is a large share of the parameter budget; for models with billions of parameters it is a small one, which is one reason larger models tend to use larger vocabularies.
:::
:::

::: history
Gage's byte-pair encoding (1994) was a compression algorithm. Word segmentation for Japanese and Korean speech recognition led Schuster and Nakajima (2012) to WordPiece. Sennrich, Haddow and Birch's *Neural Machine Translation of Rare Words with Subword Units* (ACL 2016) made BPE the standard way to give translation models an open vocabulary, and Wu et al. (2016) used WordPiece in Google's production translation system. Kudo (2018) introduced the unigram tokeniser and subword regularisation, and Kudo and Richardson (2018) released SentencePiece. Radford et al. (2019) used byte-level BPE in GPT-2, and that design, with refinements to pre-tokenisation, is used by many later models. Tokenisation-free models that operate directly on bytes or characters, such as CANINE (Clark et al., 2022) and ByT5 (Xue et al., 2022), and later byte-level architectures that group bytes into variable-length patches, remain an active research direction (as of 2026).
:::

::: summary
- A tokeniser maps text to a sequence of ids from a fixed vocabulary; it should be lossless and complete. Words give short sequences but an open vocabulary; bytes give a closed vocabulary of $256$ but long sequences; subwords compromise.
- BPE starts from characters (or bytes) and greedily merges the most frequent adjacent pair; each merge with $a\ne b$ shortens the training corpus by the pair's count. New words are encoded by applying the merges in order.
- WordPiece merges the pair with the highest $c(ab)/(c(a)c(b))$ and encodes by greedy longest match; the unigram model assigns token probabilities, encodes by Viterbi dynamic programming, trains by EM and pruning, and allows sampled segmentations.
- Byte-level BPE (GPT-2: $256 + 50{,}000 + 1$ tokens) and SentencePiece with byte fallback need no unknown token.
- Tokenisation explains odd failures at spelling, counting and arithmetic, sensitivity to spaces and case, and under-trained "glitch" tokens.
- The same content can cost many times more tokens in some languages (Petrov et al., 2023), affecting price, context and quality.
:::

## Exercises

::: exercise Counting symbols {level=1 check="95"}
How many symbols (characters and end-of-word markers, with multiplicity) does the corpus of [[#ex-bpe-hand]] contain before any merge?
::: solution
*low*: $4$ symbols with `</w>`, times $5$ = $20$; *lower*: $6\times2 = 12$; *newest*: $7\times6 = 42$; *widest*: $7\times3 = 21$. Total $95$.
:::
:::

::: exercise After three merges {level=1 check="68"}
How many symbols does that corpus contain after the first three merges (`e s`, `es t`, `est </w>`)?
::: solution
Each merge involves distinct symbols, so by [[#prop-bpe]] each reduces the length by its count, $9$: $95 - 27 = 68$. Directly: *low* $20$, *lower* $12$, *newest* `n e w est</w>` $4\times6 = 24$, *widest* `w i d est</w>` $4\times3 = 12$; $20 + 12 + 24 + 12 = 68$.
:::
:::

::: exercise Encoding a new word {level=1 check="5"}
Using the ten merges printed by the BPE listing, encode *slower*. How many tokens does it have (counting `</w>` as part of a token or as its own token, as the merges dictate)?
::: solution
`s l o w e r </w>`: merges 1–3 do not apply (there is no `e s`); merge 4 gives `lo`, merge 5 `low`; merge 9 needs `low </w>`, which does not occur. Result: `s`, `low`, `e`, `r`, `</w>` — $5$ tokens.
:::
:::

::: exercise A WordPiece score {level=2 check="1/17"}
In [[#ex-wordpiece]], compute the WordPiece score of `##e ##s` and explain why BPE and WordPiece rank this pair so differently.
::: solution
$c(\texttt{\#\#e\ \#\#s}) = 9$, $c(\texttt{\#\#e}) = 17$, $c(\texttt{\#\#s}) = 9$, so the score is $9/(17\cdot9) = 1/17 = 0.059$. BPE ranks it first because $9$ is the largest pair count; WordPiece ranks it low because `##e` is common and appears in many other pairs, so `##e` followed by `##s` is not much more frequent than chance would suggest.
:::
:::

::: exercise Probability of a segmentation {level=2 check="0.02*0.005"}
With the vocabulary of [[#ex-viterbi]], compute $P(\texttt{lo + west})$. Why is the Viterbi segmentation of *lowest* not `lo + west`, although that uses only two tokens?
::: solution
$P = p(\texttt{lo})\,p(\texttt{west}) = 0.02\cdot0.005 = 0.0001$, while $P(\texttt{low + est}) = 0.05\cdot0.04 = 0.002$, twenty times larger. Both have two tokens; the unigram model prefers the segmentation whose tokens are individually more probable, and `west` is a rare token in this vocabulary.
:::
:::

::: exercise Tokenisation premium {level=2 check="127/23"}
From the byte-level BPE listing, compute the tokenisation premium of the Russian sentence relative to the English one. Explain why it equals the ratio of the Russian sentence's UTF-8 length to the English token count.
::: solution
$127/23 = 5.52$. The tokeniser learned no merge involving Cyrillic bytes (Cyrillic does not occur in *Moby-Dick*), and the spaces before Russian words are followed by Cyrillic bytes, so the merges with leading spaces never apply either. Every byte is its own token, and the Russian count equals its UTF-8 length, $127$ bytes ($69$ characters: $58$ Cyrillic letters at two bytes each, and $10$ spaces and a full stop at one byte each, $116 + 11 = 127$).
:::
:::

::: exercise Byte-level bounds {level=2 check="4*20"}
A string has $20$ code points. What is the largest number of tokens a byte-level BPE tokeniser can produce for it, and when is it attained? What is the smallest possible number of tokens for a tokeniser with a vocabulary that contains the string?
::: solution
Each code point takes at most $4$ UTF-8 bytes and each byte is at least one token, so at most $80$ tokens, attained when all $20$ code points are outside the BMP (for instance emoji) and no merge applies. If the whole string is a vocabulary token and pre-tokenisation does not split it, one token suffices.
:::
:::

::: exercise The forward algorithm {level=3 check="0.00229193168"}
Modify the Viterbi recursion of [[#prop-viterbi]] to compute $P(x) = \sum_{\mathbf{t}\in S(x)}P(\mathbf{t})$, implement it, and check that it gives $P(\textit{lowest})$ of [[#ex-viterbi]] without enumerating the $15$ segmentations.
::: solution
Let $\alpha(i) = \sum_{\mathbf{t}\in S(x_{1:i})}P(\mathbf{t})$, with $\alpha(0) = 1$. Splitting by the last token, $\alpha(i) = \sum_{j<i,\ x_{j+1:i}\in\mathcal{V}}\alpha(j)\,p(x_{j+1:i})$, since the probability is a product and the sum over segmentations of $x_{1:j}$ factors out.

```python
p = {"l": 0.04, "o": 0.05, "w": 0.04, "e": 0.08, "s": 0.06, "t": 0.07,
     "lo": 0.02, "low": 0.05, "we": 0.01, "est": 0.04, "west": 0.005, "st": 0.03}
def forward(x, p, maxlen=4):
    alpha = [1.0] + [0.0] * len(x)          # alpha[i] = P(x[:i]) summed over segmentations
    for i in range(1, len(x) + 1):
        for j in range(max(0, i - maxlen), i):
            alpha[i] += alpha[j] * p.get(x[j:i], 0.0)
    return alpha
a = forward("lowest", p)
print([f"{v:.4g}" for v in a])
print(a[-1])
```

```text
['1', '0.04', '0.022', '0.05088', '0.00429', '0.0002574', '0.002292']
0.00229193168
```

$P(\textit{lowest}) = 0.00229193$, as by enumeration. In EM training this forward pass, with a matching backward pass, gives each token's expected count in $O(n\ell)$ time instead of a sum over exponentially many segmentations.
:::
:::

::: exercise When a merge saves less than its count {level=3}
(a) Show that if BPE counts pairs by sliding a window over each word, the pair `a a` in the word `a a a` is counted twice but can be merged only once. (b) What does the left-to-right merge produce for `a a a a`, and how many symbols does it save compared with the count? (c) Explain why [[#prop-bpe]] part 2 still holds for every pair with $a\ne b$.
::: solution
(a) The windows are positions $(1, 2)$ and $(2, 3)$, both `a a`: count $2$. Merging the first uses up the middle `a`, so only one replacement is possible: `aa a`, saving $1$ symbol, not $2$. (b) `a a a a` has count $3$; the left-to-right scan merges positions $(1, 2)$ and $(3, 4)$ to give `aa aa`, saving $2$, one less than the count. (c) For $a\ne b$, occurrences of $(a, b)$ cannot share a symbol, because a shared symbol would have to be $b$ (end of the first) and $a$ (start of the second). So all counted occurrences are disjoint and all are replaced. Implementations either accept this small discrepancy for repeated symbols or count non-overlapping occurrences.
:::
:::

::: exercise A greedy tokeniser that is not optimal {level=3}
WordPiece encodes by greedy longest match. Construct a vocabulary and a word for which greedy longest-match encoding fails (produces `[UNK]`) although a segmentation into vocabulary tokens exists. What does this say about the difference between WordPiece encoding and Viterbi encoding with a unigram model?
::: solution
Take the vocabulary $\{\texttt{a}, \texttt{ab}, \texttt{\#\#bc}, \texttt{\#\#d}\}$ and the word *abcd*. Greedy longest match takes `ab` (longer than `a`), leaving *cd*; no `##` token is a prefix of *cd*, so the encoder gives up and outputs `[UNK]` for the whole word. Yet `a ##bc ##d` is a valid segmentation. Greedy matching commits to the longest first token without looking ahead. The Viterbi recursion of [[#prop-viterbi]] considers every possible last token for every prefix, so it finds a segmentation whenever one exists, and the most probable one under its scores. (Real WordPiece vocabularies contain every single character in both plain and `##` form, so this failure is rare in practice; greedy encoding can still produce more tokens than necessary.)
:::
:::
