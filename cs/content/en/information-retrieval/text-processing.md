A reader types `rabbits` into the search box of a digital library that holds Lewis Carroll's *Alice's Adventures in Wonderland*. The book never contains the string `rabbits`. It contains `Rabbit` (with a capital letter, because it is the White Rabbit), `rabbit-hole`, `Rabbit's` and, in one place, `RABBIT` in capitals. A program that compares bytes finds nothing; a reader who skims the book finds the White Rabbit on the first page. Before any clever ranking can happen, a search engine has to decide what the *units* of text are and when two of them count as the same. That is the subject of this chapter.

We follow a document from bytes to **terms**, the units an index is built on. First the bytes are decoded into characters and the characters normalised, so that visually identical strings compare equal. Then the character stream is cut into **tokens**, and tokens are mapped to terms by case folding, stop-word handling and **stemming**, with the Porter stemmer as the main algorithm. Every one of these steps trades recall against precision, and none is free of surprises. The second half of the chapter measures what comes out: the frequencies of terms follow **Zipf's law** and the vocabulary grows by **Heaps' law**. We fit both laws to the full text of *Alice*, a public-domain book, and derive consequences that shape every later chapter — why stop words take so much space in an index, why half the vocabulary occurs once, and how large a dictionary we must expect. The data structure built from the terms, the inverted index, is the subject of [[information-retrieval/inverted-indexes]].

## Documents, characters and encodings

::: definition Document, collection and information need {#def-collection}
A **document** is the unit a retrieval system returns: a web page, an e-mail, a paragraph, a chapter or a book, depending on the application. A **collection** (or **corpus**) is the set $D = \set{d_1, \dots, d_N}$ of documents the system searches, with $N = \abs{D}$. An **information need** is what the user wants to know; a **query** is the user's attempt to express it, usually a few words. A document is **relevant** if it satisfies the information need — not merely if it contains the query words.
:::

The choice of unit matters. Indexing *Alice* as one document makes every query that mentions the White Rabbit return the whole book; indexing each of its $12$ chapters or its roughly $800$ paragraphs separately lets the system point to the passage that answers the need. Web search engines index pages; e-mail search indexes messages but may treat attachments separately; question-answering systems often index passages of a few hundred words. The chapters that follow assume the unit has been chosen.

### From bytes to characters

A file is a sequence of bytes. To read it as text we need its **character encoding**. Today almost all text on the web is in **UTF-8**, which encodes each Unicode code point in $1$ to $4$ bytes and leaves ASCII unchanged; older documents use Latin-1, Windows-1252, Shift-JIS, GB 2312 and many others, sometimes declared in a header (HTTP `Content-Type`, an HTML `<meta charset>`) and sometimes not at all, in which case the encoding has to be guessed from byte statistics. A wrong guess turns `café` into `cafÃ©`, and that document can no longer be found by its own words. The structure of documents matters too: HTML markup, scripts and navigation menus must be stripped or treated as separate **fields** (title, headings, body, anchor text), because a word in a title says more about a page than a word in a footer. We return to fields in [[information-retrieval/probabilistic-retrieval]].

Even correctly decoded, Unicode text has several representations of the same visible string. The letter é is one code point (U+00E9, "LATIN SMALL LETTER E WITH ACUTE") or two (U+0065 `e` followed by U+0301, a combining acute accent). The ligature ﬁ (U+FB01) looks like `fi`; full-width Ａ (U+FF21) used in East Asian text looks like `A`; ① is a circled digit one.

::: definition Unicode normalisation {#def-normalisation}
The Unicode standard (Annex 15) defines **canonical equivalence** — two sequences represent the same abstract character, such as precomposed é and `e` + combining acute — and the weaker **compatibility equivalence**, which also identifies formatting variants such as ligatures, full-width forms and circled digits. The normal forms **NFC** and **NFD** replace a string by its canonical composed or decomposed form; **NFKC** and **NFKD** do the same for compatibility equivalence. Two strings are canonically equivalent exactly when their NFC forms are equal.
:::

::: example Normalising before comparing {#ex-unicode}
Show in Python that the two encodings of `café` differ as strings but agree after normalisation, and see what NFKC and case folding do to some awkward strings.
::: solution
```python
import unicodedata as u
a, b = "café", "café"          # precomposed é, and e + combining acute
print(a == b, len(a), len(b), u.normalize("NFC", b) == a)
print(u.normalize("NFKC", "ﬁnance"), "Straße".lower(), "Straße".casefold(),
      u.normalize("NFKC", "①"), u.normalize("NFKC", "ＡＢ"))
```
```text
False 4 5 True
finance straße strasse 1 AB
```
The two strings look identical but have $4$ and $5$ code points, and compare unequal until both are put in NFC. NFKC turns the ligature into `fi`, the circled one into `1` and the full-width letters into ASCII. Python's `lower` leaves the German ß alone, while `casefold` — Unicode's **case folding**, designed for caseless matching — maps it to `ss`, so that `Straße` matches `STRASSE`. An indexer applies the *same* normalisation to documents and to queries; which form it chooses is a design decision, but NFKC followed by case folding is a common choice for search.
:::
:::

## Tokenisation

::: definition Token, type and term {#def-token}
**Tokenisation** splits a character sequence into **tokens**, the instances of character sequences treated as units (here, roughly, words). A **type** is the class of all tokens with the same character sequence. A **term** is a (possibly normalised) type that is entered in the index's dictionary. The **vocabulary** $V$ of a collection is its set of terms, and we also write $V$ for its size when no confusion can arise. The total number of tokens in a collection is written $T$.
:::

In the sentence "the cat sat on the mat" there are $6$ tokens and $5$ types (`the` occurs twice). Whether `The` and `the` are one term depends on normalisation, discussed below. For English the obvious tokeniser — split on anything that is not a letter — is a good start, and the one this chapter uses for *Alice* keeps an internal apostrophe so that `don't` and `Alice's` stay whole:

```python
import re
from collections import Counter

text = open("alice.txt", encoding="utf-8").read()
text = text[text.index("CHAPTER I"):]          # drop the title and Gutenberg note
tokens = re.findall(r"[a-z]+(?:'[a-z]+)?", text.lower())
freq = Counter(tokens)
print(len(tokens), len(freq))
print(freq.most_common(8))
```
```text
26682 2630
[('the', 1642), ('and', 872), ('to', 729), ('a', 632), ('she', 541), ('it', 530), ('of', 514), ('said', 462)]
```

Here `alice.txt` is the Project Gutenberg plain-text edition of the book (public domain); every count in this chapter comes from running these lines on it. *Alice* has $T = 26\,682$ tokens and $2\,630$ types under this tokeniser. Change the regular expression and both numbers change: a tokeniser that splits at apostrophes turns `don't` (the most common contraction, $61$ times) into `don` and `t`, and creates the "words" `ll`, `ve` and `s` out of `I'll`, `I've` and `Alice's`.

### Hard cases

Simple rules break on ordinary text:

- **Apostrophes.** `O'Neill`, `don't`, `Alice's`, `rock 'n' roll`, and the quotation marks of the Gutenberg edition, which uses a backquote and an apostrophe (`` `and what is the use of a book,' ``) — the closing quote must not be glued to `book`.
- **Hyphens.** `rabbit-hole` might be one term or two; `co-operate` and `cooperate` should probably match; a hyphen at the end of a printed line is usually an artefact of typesetting.
- **Punctuation inside tokens.** `C++`, `C#`, `.NET`, `3.14`, `1,000,000`, `U.S.A.`, `e-mail`, `user@example.org`, `https://example.org/a?b=c`, `10:30`, `2026-10-27`. A tokeniser for technical or web text recognises such patterns before splitting, because a user who searches for `C++` does not want every document containing the letter C.
- **Case.** `Apple` (a company) and `apple`, `US` and `us`, `Bush` and `bush` differ in meaning, but most users type lower case, so most engines fold case anyway and accept the loss.
- **Languages without spaces.** Chinese and Japanese text has no spaces between words, and German, Finnish and Dutch write compounds as one word (`Lebensversicherungsgesellschaft`, life insurance company). Systems either **segment** words with a dictionary or statistical model, or index overlapping character **$n$-grams** (for Chinese, usually pairs of characters) and accept some false matches.

::: example Greedy segmentation goes wrong {#ex-maxmatch}
The **maximum-matching** heuristic segments a string without spaces by repeatedly taking the longest dictionary word that starts at the current position (falling back to one character). Segment `thetabledownthere` with the dictionary $\set{\texttt{a}, \texttt{able}, \texttt{bled}, \texttt{down}, \texttt{here}, \texttt{led}, \texttt{own}, \texttt{tab}, \texttt{table}, \texttt{the}, \texttt{theta}, \texttt{there}}$.
::: solution
From position $0$ the dictionary words that start there are `the` and `theta`; the longest is `theta`. The rest is `bledownthere`, where the longest match is `bled`; then `ownthere` gives `own`, and `there` remains.

```python
def maxmatch(s, D):
    out, i = [], 0
    while i < len(s):
        for j in range(len(s), i, -1):         # longest candidate first
            if s[i:j] in D or j == i + 1:
                out.append(s[i:j]); i = j; break
    return out
D = {"the", "theta", "table", "tab", "bled", "led", "down", "own", "there", "here", "a", "able"}
print(maxmatch("thetabledownthere", D))
```
```text
['theta', 'bled', 'own', 'there']
```
The intended reading, `the table down there`, is also a segmentation into dictionary words, but the greedy choice of `theta` at the start can never be undone. Maximum matching works surprisingly well for Chinese with a good dictionary, yet errors like this one are why modern segmenters score whole segmentations, often with a dynamic programme over positions in the style of [[algorithms/dynamic-programming]], using word probabilities.
:::
:::

::: warning "Just split on spaces" is not a tokeniser
Splitting on whitespace leaves punctuation attached (`book,'` and `book` become different types), splits nothing in Chinese, and treats `New York` as two unrelated words. Tokenisation is language-dependent and domain-dependent: the rules for chemical names, programming code, tweets with `#hashtags` and `@mentions`, or legal citations all differ. Above all, **the query must be tokenised exactly as the documents were.** If the index keeps `C++` but the query parser drops `+`, the query `C++` searches for `c`, and an apparently perfect index fails.
:::

The language models of the [LLM Atlas](/learn/llm/lesson.php?c=text-and-language&l=tokenisation) use a different kind of tokenisation — **subword** units learned from data, such as byte-pair encoding, which split rare words into pieces and need no language-specific rules. They are designed to give a model a fixed, small vocabulary, not to define units of matching, and classic search engines still tokenise into words.

## From tokens to terms

Two tokens that a user would consider "the same word" should usually map to the same term. **Normalisation** in this sense builds **equivalence classes** of tokens: case folding puts `Rabbit`, `RABBIT` and `rabbit` in one class; removing periods puts `U.S.A.` with `USA`; removing accents puts `naïve` with `naive`. Each class is named by one representative, the term. An alternative is **query expansion**: keep tokens distinct in the index, and expand the query `rabbit` into `rabbit OR Rabbit OR rabbits`. Expansion is more flexible — it can be asymmetric (a query `window` might match `windows`, but perhaps a query `Windows` should not match `window`) — but makes queries slower.

### Stop words

The most frequent words of English — `the`, `and`, `to`, `a`, `of` — occur in nearly every document and say almost nothing about what it is about. A **stop list** is a set of such words that are discarded from documents and queries. In *Alice* the $25$ most frequent types make up $38.1\%$ of all tokens, so a stop list of $25$ words would shrink the index by over a third.

Modern web search engines nevertheless keep stop words, for three reasons. Compression ([[information-retrieval/index-compression]]) makes their long posting lists cheap, because the gaps between consecutive documents containing `the` are tiny. Ranking functions such as tf–idf and BM25 give such terms almost no weight automatically ([[information-retrieval/vector-space]]). And some queries consist of nothing *but* stop words or depend on them: `to be or not to be`, the band `The The`, `flights to London` versus `flights from London`. Stop lists survive in smaller systems and as a query-time optimisation.

### Stemming and lemmatisation

`rabbit` and `rabbits`, `begin`, `began`, `begins`, `beginning` and `begun` are forms of one word. Linguists distinguish **inflection** (number, tense: `rabbit`/`rabbits`, `walk`/`walked`) from **derivation**, which makes new words (`relate` → `relation` → `relational`).

::: definition Stemming and lemmatisation {#def-stemming}
A **stemmer** maps a token to a **stem** by rule-based removal and rewriting of suffixes; the stem need not be a word (`ponies` → `poni`). A **lemmatiser** maps a token to its **lemma**, the dictionary form (`began` → `begin`, `better` → `good`), using a vocabulary and morphological analysis, often with the part of speech. Both are many-to-one maps used to form equivalence classes of tokens.
:::

The best-known stemmer for English is Martin Porter's algorithm of 1980. It describes a word by its pattern of consonants and vowels.

::: definition Porter's measure {#def-porter-measure}
A letter other than `a e i o u` is a **consonant**, except that `y` is a vowel when it follows a consonant. Writing $C$ for a maximal run of consonants and $V$ for a maximal run of vowels, every word has the form $[C](VC)^m[V]$, where the brackets mean "optional". The number $m$ is the **measure** of the word: the number of times a vowel run is followed by a consonant run.
:::

For example `tr`, `tree` and `by` have $m = 0$; `trouble`, `oats` and `ivy` have $m = 1$; `troubles`, `private` and `orrery` have $m = 2$. The measure approximates the number of syllables before the end, and Porter uses it to avoid stripping suffixes from words that are already short: `-ate` is removed from `activate` but not from `plate`. The algorithm consists of five steps of rules, each of the form "(condition) $S_1 \to S_2$": if the word ends in suffix $S_1$ and the part before it, the candidate stem, satisfies the condition, replace $S_1$ by $S_2$. Within a step, only the rule with the longest matching $S_1$ fires.

::: algorithm Porter stemmer, step 1 (plurals and -ed, -ing) {#alg-porter1}
Let $w$ be the lower-case word; $*v*$ means "the stem contains a vowel", $*d$ "the stem ends in a double consonant", and $*o$ "the stem ends consonant–vowel–consonant, the last not `w`, `x` or `y`".
1. **Step 1a.** Apply the first that matches: `sses` → `ss`; `ies` → `i`; `ss` → `ss`; `s` → (nothing).
2. **Step 1b.** If $w$ ends in `eed`: replace by `ee` when the stem has $m > 0$, and stop. Otherwise, if $w$ ends in `ed` or `ing` and the stem satisfies $*v*$, remove the suffix and then:
   1. if the result ends in `at`, `bl` or `iz`, add `e`;
   2. else if $*d$ and the double letter is not `l`, `s` or `z`, remove one of the doubled letters;
   3. else if $m = 1$ and $*o$, add `e`.
3. Steps 1c to 5 (not shown) turn a final `y` after a vowel-containing stem into `i`, map derivational suffixes such as `ational` → `ate` and `iveness` → `ive` under $m > 0$, remove `-al`, `-ance`, `-ment` and similar under $m > 1$, and tidy a final `e` and a final `ll`.
:::

```python
def is_cons(w, i):                     # Porter's consonant test; y after a consonant is a vowel
    if w[i] in "aeiou": return False
    if w[i] == "y": return i == 0 or not is_cons(w, i - 1)
    return True

def measure(stem):                     # m in [C](VC)^m[V]
    pattern = "".join("c" if is_cons(stem, i) else "v" for i in range(len(stem)))
    return pattern.count("vc")         # each vowel-to-consonant change is one VC

def has_vowel(stem):
    return any(not is_cons(stem, i) for i in range(len(stem)))

def cvc(w):                            # ends consonant-vowel-consonant, last not w, x, y
    return (len(w) >= 3 and is_cons(w, len(w) - 3) and not is_cons(w, len(w) - 2)
            and is_cons(w, len(w) - 1) and w[-1] not in "wxy")

def step1(w):
    for suf, rep in (("sses", "ss"), ("ies", "i"), ("ss", "ss"), ("s", "")):   # step 1a
        if w.endswith(suf):
            w = w[: len(w) - len(suf)] + rep; break
    if w.endswith("eed"):                                                    # step 1b
        if measure(w[:-3]) > 0: w = w[:-1]
        return w
    for suf in ("ed", "ing"):
        if w.endswith(suf) and has_vowel(w[: -len(suf)]):
            w = w[: -len(suf)]
            if w.endswith(("at", "bl", "iz")): return w + "e"
            if len(w) > 1 and w[-1] == w[-2] and is_cons(w, len(w) - 1) and w[-1] not in "lsz":
                return w[:-1]
            if measure(w) == 1 and cvc(w): return w + "e"
            return w
    return w
```

Run on the examples of Porter's paper, this reproduces his published results:

```text
caresses->caress ponies->poni ties->ti caress->caress cats->cat feed->feed agreed->agree
plastered->plaster bled->bled motoring->motor sing->sing conflated->conflate
troubled->trouble sized->size hopping->hop tanned->tan falling->fall hissing->hiss
fizzed->fizz failing->fail filing->file
```

::: example Tracing step 1 {#ex-porter-trace}
Apply step 1 to `hopping`, `hoping`, `feed`, `bled` and `meetings`, giving the rule that fires and the measure where it matters.
::: solution
- `hopping`: step 1a does nothing. It ends in `ing` and the stem `hopp` contains the vowel `o`, so remove `ing`: `hopp`. It ends in a double consonant `pp` (not `l`, `s`, `z`), so remove one: **`hop`**.
- `hoping`: remove `ing` (stem `hop` has a vowel) giving `hop`. No `at`/`bl`/`iz`, no double consonant. The measure of `hop` is $1$ (pattern $cvc$, one $vc$) and it ends consonant–vowel–consonant with last letter `p`, so add `e`: **`hope`**. The two rules keep `hopping` and `hoping` apart.
- `feed`: ends in `eed`; the stem `f` has $m = 0$, so nothing happens: **`feed`**. (`agreed` has stem `agr`, $m = 1$, and becomes `agree`.)
- `bled`: ends in `ed` but the stem `bl` has no vowel, so the rule does not fire: **`bled`**. Without the vowel condition `bled` would become the non-word `bl`.
- `meetings`: step 1a removes `s` giving `meeting`; step 1b removes `ing` (stem `meet` has vowels) giving `meet`; `meet` ends in `t` after `e` — not a double consonant — and ends vowel–vowel–consonant, so $*o$ fails: **`meet`**.
:::
:::

Stemming is crude. Porter maps `university` and `universe` to `univers`, and `organization` and `organ` to `organ` (conflations that hurt precision), but leaves `alumnus` and `alumni`, or `matrices` and `matrix`, apart (failures that hurt recall). Its effect on retrieval quality has been measured many times and is modest: for English, stemming usually helps a little on average, mostly by improving recall, and hurts some queries badly. For morphologically rich languages such as Finnish, Hungarian or Turkish, where one noun can have hundreds of forms, it helps much more. Porter later wrote the **Snowball** language for stemmers, and Snowball stemmers for dozens of languages, including a revised English stemmer ("Porter2"), are what most open-source search engines use today. Lemmatisation is more accurate but needs a dictionary and part-of-speech tagging, and in experiments its advantage over good stemming for retrieval is small.

::: quiz
Which of these is the main reason most web search engines do *not* remove stop words from the index?
- [ ] Stop words are rare, so they cost nothing to index.
- [x] Some queries depend on them, and compression and term weighting make keeping them cheap and harmless.
- [ ] Stemming already removes them.
- [ ] Stop words have high idf, so they are good for ranking.
::: solution
Stop words are the *most* frequent words, so their posting lists are long; but the gaps between postings are tiny and compress to about a byte or less each, and weighting schemes give them near-zero weight (their inverse document frequency is low, not high). Queries such as `to be or not to be` or `flights to London` need them, so engines keep them and handle them efficiently.
:::
:::

## The statistics of text

How are the $26\,682$ tokens of *Alice* distributed over its $2\,630$ types? Sort the types by decreasing frequency, give the most frequent rank $1$, and look at the product of rank and frequency:

| rank $r$ | term | frequency $f_r$ | $r \cdot f_r$ |
|---:|---|---:|---:|
| $1$ | the | $1642$ | $1642$ |
| $2$ | and | $872$ | $1744$ |
| $3$ | to | $729$ | $2187$ |
| $5$ | she | $541$ | $2705$ |
| $10$ | alice | $386$ | $3860$ |
| $20$ | with | $180$ | $3600$ |
| $50$ | herself | $83$ | $4150$ |
| $100$ | never | $48$ | $4800$ |
| $200$ | anything | $20$ | $4000$ |
| $500$ | surprised | $7$ | $3500$ |
| $1000$ | pieces | $3$ | $3000$ |

(Types with equal frequency are ordered by first occurrence; with many ties at low frequencies, ranks there are somewhat arbitrary.) Frequency falls by a factor of almost $500$ while the product $r f_r$ stays within a factor of three.

::: definition Zipf's law {#def-zipf}
A collection obeys **Zipf's law** with exponent $s > 0$ if the frequency of the term of rank $r$ is approximately
$$
f_r \approx \frac{C}{r^{s}}
$$ {#eq-zipf}
for a constant $C$; the classical form has $s = 1$, so that $r \cdot f_r$ is roughly constant. Equivalently $\log f_r \approx \log C - s \log r$: on log–log axes, frequency against rank is a straight line of slope $-s$.
:::

Zipf's law is an empirical regularity, not a theorem: it is an **observation** about real text, true only approximately, and the exponent depends on the text and on the tokeniser. Fitting a least-squares line to the points $(\log_{10} r, \log_{10} f_r)$ (the method of [Maths Atlas: regression](/learn/maths/lesson.php?c=statistics&l=regression)) gives:

```python
import math
def fit(xs, ys):                       # least-squares line y = a + b x
    n = len(xs); mx = sum(xs) / n; my = sum(ys) / n
    b = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    return my - b * mx, b

ranked = freq.most_common()
for lo, hi in ((1, len(ranked)), (10, 1000)):
    xs = [math.log10(r) for r in range(lo, hi + 1)]
    ys = [math.log10(ranked[r - 1][1]) for r in range(lo, hi + 1)]
    a, b = fit(xs, ys)
    print(f"Zipf fit ranks {lo}-{hi}: log10 f = {a:.3f} {b:+.3f} log10 r")
```
```text
Zipf fit ranks 1-2630: log10 f = 4.045 -1.210 log10 r
Zipf fit ranks 10-1000: log10 f = 3.884 -1.132 log10 r
```

The fitted exponent is $s \approx 1.21$ over all ranks and $s \approx 1.13$ over the middle ranks $10$ to $1000$, where the law fits best. At the top, the handful of most frequent words are flatter than the line (`the` would have to be even more frequent to lie on it), and at the bottom the steps of the frequency $1, 2, 3, \dots$ and the arbitrary order of tied ranks distort the fit. Fitting by least squares on log–log axes is also statistically crude — it gives the thousands of rare types as much weight as the frequent ones, and better estimators exist — but it is the standard first look.

::: widget regression
points: 0.00,3.22; 0.30,2.94; 0.70,2.73; 1.00,2.59; 1.30,2.26; 1.70,1.92; 2.00,1.68; 2.30,1.30; 2.70,0.85; 3.00,0.48; 3.30,0.00
degree: 1
x: -0.2, 3.6
y: -0.3, 3.6
caption: Zipf's law in *Alice*: $\log_{10}$ of the frequency against $\log_{10}$ of the rank for ranks $1, 2, 5, 10, \dots, 1000, 2000$. The least-squares line has slope about $-1.2$. Drag the first two points (ranks $1$ and $2$) to see how strongly a few frequent words pull the fitted exponent, and notice that the points bend below the line at the right, where every type occurs only once or twice.
:::

Why Zipf's law holds is still debated. George Zipf explained it by a "principle of least effort" balancing speaker and hearer; Herbert Simon derived it from a rich-get-richer process in which new words appear at a constant rate and old words are reused in proportion to their past use; and George Miller observed that even text typed by a monkey hitting random keys, with the space bar as one key, gives a power law in rank. We will not need an explanation — only consequences, which follow from the law as a model.

### Consequences of Zipf's law

::: proposition The frequency spectrum {#prop-spectrum}
Suppose $f_r = C/r$ exactly (Zipf with $s = 1$), treating ranks as continuous. Then the number of types that occur exactly $k$ times is approximately
$$
V_k \approx \frac{C}{k(k+1)}.
$$
If the rarest types occur once, $C \approx V$ and the fraction of types that occur exactly $k$ times is $1/(k(k+1))$: one half of all types occur once, one sixth twice, one twelfth three times.
:::

::: proof
A type has frequency at least $k$ exactly when its rank satisfies $C/r \ge k$, that is $r \le C/k$, so about $C/k$ types have frequency at least $k$. The types with frequency exactly $k$ are those with frequency at least $k$ but not at least $k + 1$:
$$
V_k \approx \frac{C}{k} - \frac{C}{k+1} = \frac{C}{k(k+1)}.
$$
The type of largest rank $V$ has frequency $C/V$; setting this to $1$ gives $C = V$, and then $V_k / V \approx 1/(k(k+1))$, which is $1/2$, $1/6$ and $1/12$ for $k = 1, 2, 3$.
:::

In *Alice*, $1\,143$ of the $2\,630$ types ($43.5\%$) occur exactly once — they are called **hapax legomena**, "said once" — and $409$ occur twice, against predictions of $1\,315$ and $438$. The prediction is rough, because the real exponent exceeds $1$, but the qualitative point stands: in any collection, a large fraction of the vocabulary consists of words seen once — rare names, misspellings, numbers, foreign words — and a search engine must index every one of them, because users search for rare words precisely because they are discriminating.

::: proposition Share of the most frequent terms {#prop-topk}
Under Zipf's law with $s = 1$ and vocabulary size $V$, the $k$ most frequent terms account for a fraction
$$
\frac{\sum_{r=1}^{k} C/r}{\sum_{r=1}^{V} C/r} = \frac{H_k}{H_V} \approx \frac{\ln k + 0.5772}{\ln V + 0.5772}
$$
of all tokens, where $H_n = 1 + \tfrac12 + \dots + \tfrac1n$ is the $n$-th harmonic number.
:::

::: proof
The number of tokens of the term of rank $r$ is $C/r$, so the top $k$ terms contribute $C H_k$ tokens out of $C H_V$; the constant cancels. The approximation is $H_n = \ln n + \gamma + O(1/n)$ with Euler's constant $\gamma \approx 0.5772$.
:::

::: example How much do the top 100 words cover? {#ex-top100}
Predict, from [[#prop-topk]], the share of the $100$ most frequent types among the tokens of *Alice*, and compare with the measured value.
::: solution
$H_{100} = 5.1874$ and $H_{2630} = 8.4521$, so the prediction is $5.1874 / 8.4521 = 0.614$. Measured: the top $100$ types account for $59.2\%$ of the $26\,682$ tokens. So about $100$ words — $3.8\%$ of the vocabulary — make up three fifths of the text. The postings of these few terms therefore dominate the size of an uncompressed index, which is why stop lists once seemed attractive and why compression of long, dense lists ([[information-retrieval/index-compression]]) matters so much.
:::
:::

The logarithmic growth of $H_V$ has a less obvious consequence: as a collection grows and $V$ increases, the share of any fixed set of top terms *falls*, slowly, because ever more tokens go to the long tail of rare words.

### Heaps' law: how fast the vocabulary grows

How many distinct terms should we expect in a collection of $T$ tokens? Reading *Alice* from the beginning and counting distinct types after every $2\,000$ tokens:

| tokens read $T$ | $2000$ | $6000$ | $10\,000$ | $14\,000$ | $18\,000$ | $22\,000$ | $26\,682$ |
|---|---:|---:|---:|---:|---:|---:|---:|
| types $V(T)$ | $586$ | $1166$ | $1534$ | $1861$ | $2129$ | $2347$ | $2630$ |

The vocabulary keeps growing — new words appear in every chapter, such as the names of new characters — but more and more slowly.

::: definition Heaps' law {#def-heaps}
A collection obeys **Heaps' law** (also called Herdan's law) if the vocabulary size after $T$ tokens is approximately
$$
V(T) \approx K\, T^{\beta}
$$ {#eq-heaps}
for constants $K > 0$ and $0 < \beta < 1$. For English text typical values are $10 \le K \le 100$ and $0.4 \le \beta \le 0.6$. Like Zipf's law, it is an empirical observation.
:::

Taking logarithms, $\log V = \log K + \beta \log T$, a straight line again. The least-squares fit to the $14$ checkpoints of *Alice* (every $2\,000$ tokens and the end) is

```text
Heaps fit: K = 7.79, beta = 0.572
```

so $V(T) \approx 7.79\, T^{0.572}$; at the full length this gives $7.79 \times 26\,682^{0.572} \approx 2\,651$, close to the true $2\,630$.

::: widget regression
points: 3.301,2.768; 3.602,2.949; 3.778,3.067; 3.903,3.130; 4.000,3.186; 4.079,3.236; 4.146,3.270; 4.204,3.299; 4.255,3.328; 4.301,3.348; 4.342,3.371; 4.380,3.395; 4.415,3.411; 4.426,3.420
degree: 1
x: 3.2, 4.5
y: 2.7, 3.5
caption: Heaps' law in *Alice*: $\log_{10} V$ against $\log_{10} T$ at every $2\,000$ tokens. The slope of the line is the exponent $\beta \approx 0.57$ and the intercept is $\log_{10} K \approx 0.89$. Try degree $2$: the points curve slightly downwards, a sign that a single power law is only an approximation over a short range.
:::

::: example Sizing a dictionary {#ex-heaps}
Using the fit to *Alice*, estimate the vocabulary of a collection of one million tokens of similar text. Then say how much the text must grow for the vocabulary to double.
::: solution
$V(10^6) \approx 7.79 \times (10^6)^{0.572} = 7.79 \times 10^{3.432} \approx 21\,000$ terms. For the vocabulary to double we need $K (cT)^\beta = 2 K T^\beta$, so $c^\beta = 2$ and $c = 2^{1/\beta} = 2^{1/0.572} \approx 3.36$: the text must grow more than threefold. Extrapolating a fit made on $27\,000$ tokens to a million is risky — a different author or subject would bring in new words faster — but the two conclusions that matter for system design are robust. The vocabulary never stops growing (there is no fixed dictionary to preallocate), and it grows much more slowly than the collection, roughly as its square root, so the dictionary of even a very large collection is small compared with its postings. A collection of $10^{11}$ tokens with $K = 44$ and $\beta = 0.49$ — values reported for a news collection — would have about $44 \times 10^{5.39} \approx 11$ million terms.
:::
:::

::: quiz
A collection of $10^8$ tokens obeys Heaps' law with $\beta = 0.5$. It grows to $10^{10}$ tokens. By what factor does its vocabulary grow?
- [ ] $100$
- [x] $10$
- [ ] $2$
- [ ] It does not grow: the vocabulary of a language is fixed.
::: solution
$V \propto T^{0.5}$, so multiplying $T$ by $100$ multiplies $V$ by $100^{0.5} = 10$. The vocabulary of a real collection keeps growing — names, numbers, misspellings, new words — but much more slowly than the text.
:::
:::

Heaps' law is connected to Zipf's. If tokens were drawn independently from a Zipf distribution with exponent $s > 1$, the vocabulary after $T$ tokens would grow like $T^{1/s}$ ([[#ex-heaps-zipf]]). Real text is not a sequence of independent draws: words are **bursty** — once `Gryphon` appears it appears many times in the same chapter — and this is visible in *Alice*. Shuffling the $26\,682$ tokens into a random order (one shuffle, with a fixed seed) (so that each is an independent draw from the book's own word distribution) changes the vocabulary after the first $2\,000$ tokens from $586$ to $672$: in the real book, the second mention of a word comes sooner than chance would predict, and new words arrive more slowly early on. Burstiness returns in [[information-retrieval/probabilistic-retrieval]] as the motivation for BM25's saturating term frequency.

::: widget plot
f: 10^4 / x^s; 4000 / x
sliders: s=0.6:0.05:1.6
x: 1, 100
y: 0, 5000
labels: C/r^{s},\ C = 10^4; 4000/r
caption: The Zipf curve $f_r = C/r^s$ on ordinary (linear) axes, with $C = 10\,000$, beside the classical $s = 1$ curve for $C = 4000$. On linear axes a power law looks like a sharp corner: a few ranks carry most of the mass and a long tail of ranks carries a little each. Increase $s$ and watch the head sharpen and the tail thin; at $s$ near $0.6$ the tail holds most of the tokens.
:::

::: history
Statistical regularities of word frequencies were noticed by the French stenographer Jean-Baptiste Estoup in 1916 and by Edward Condon in 1928, but are named after the Harvard linguist George Kingsley Zipf, who documented them across languages in *The Psycho-Biology of Language* (1935) and *Human Behavior and the Principle of Least Effort* (1949). Hans Peter Luhn at IBM used frequency in "The automatic creation of literature abstracts" (*IBM Journal of Research and Development*, 1958) to argue that the words most indicative of a document's content are neither the most frequent nor the rarest. Gustav Herdan described vocabulary growth in *Type–Token Mathematics* (1960), and Harold Heaps, in *Information Retrieval: Computational and Theoretical Aspects* (1978), gave the form used in retrieval. Julie Beth Lovins published the first English stemmer in 1968, and Martin Porter's "An algorithm for suffix stripping" (*Program*, 1980) became the standard; Porter's Snowball framework followed around 2001. Unicode 1.0 appeared in 1991, and the UTF-8 encoding devised by Ken Thompson and Rob Pike in 1992 now carries almost all text on the web.
:::

## In practice

Open-source engines such as Lucene (and Elasticsearch and OpenSearch, built on it) and Tantivy express text processing as an **analysis chain**: a character filter (strip HTML, map characters), a tokeniser (often the word-boundary rules of Unicode Annex 29, which work tolerably for most languages that use spaces), and token filters (lower-casing or case folding, stop words, a Snowball stemmer, synonyms). Different fields get different chains — an identifier field is not stemmed, a title field may be — and the same chain is applied to the query for each field. As of 2026, analysis for Chinese, Japanese and Korean typically uses dictionary-based or statistical segmenters, or character bigrams. Systems also index more than the plain stem: many keep the exact token as well, so that a quoted phrase query can require exact forms while an ordinary query matches stems.

The design principle is that each step is a decision about which tokens are equivalent, and every decision gains recall on some queries and loses precision on others. Measuring the net effect needs the methods of [[information-retrieval/evaluation]], applied to the queries the system actually receives.

## Where this leads

The terms produced by this chapter become the keys of the inverted index ([[information-retrieval/inverted-indexes]]), the data structure that maps each term to the documents containing it, built with the hash tables of [[data-structures/hash-tables]] or a sorted dictionary. Zipf's law explains the shape of that index — a few enormous posting lists and millions of tiny ones — and Heaps' law its dictionary size, both used in [[information-retrieval/index-compression]]. Term frequencies within documents and document frequencies across the collection become the raw material of ranking in [[information-retrieval/vector-space]] and [[information-retrieval/probabilistic-retrieval]]. Subword tokenisation and word embeddings, which avoid hand-written rules altogether, are developed in the [LLM Atlas](/learn/llm/lesson.php?c=text-and-language&l=word-embeddings) and return in [[information-retrieval/dense-retrieval]].

::: summary
- Text processing turns bytes into **terms**: decode the encoding, normalise Unicode (NFC or NFKC) and fold case, tokenise, and map tokens to terms by equivalence classing ([[#def-normalisation]], [[#def-token]]).
- Tokenisation is language- and domain-dependent: apostrophes, hyphens, `C++`, URLs and unsegmented languages all need rules; documents and queries **must** be processed identically.
- Stop lists remove frequent words, but modern engines keep them because compression and weighting make them cheap and some queries need them.
- Stemmers such as Porter's ([[#alg-porter1]]) strip suffixes using the measure $m$ ([[#def-porter-measure]]); they trade a modest recall gain for occasional precision losses, and help most in morphologically rich languages.
- **Zipf's law** $f_r \approx C/r^s$ ([[#def-zipf]]) fits real text approximately ($s \approx 1.1$–$1.2$ in *Alice*): a few terms dominate the tokens ([[#prop-topk]]) and about half the types occur once ([[#prop-spectrum]]).
- **Heaps' law** $V \approx K T^\beta$ ([[#def-heaps]]) with $\beta \approx 0.4$–$0.6$: the vocabulary grows without bound but sublinearly ($\beta \approx 0.57$ in *Alice*).
- Both laws are empirical observations that guide system design; they are not theorems and their parameters depend on the text and the tokeniser.
:::

## Exercises

::: exercise Tokens and types {level=1 check="7"}
Tokenise `The cat sat on the mat with the other cat.` by splitting on non-letters and folding case. How many types are there? (Enter the number of types.)
::: solution
The tokens are `the cat sat on the mat with the other cat`: $10$ tokens. The types are `the` ($3$ times), `cat` ($2$), `sat`, `on`, `mat`, `with`, `other`: $7$ types. Without case folding, `The` and `the` would be different types and there would be $8$.
:::
:::

::: exercise Porter's measure {level=1 check="4"}
Compute Porter's measure $m$ of `relational`. (Enter $m$.)
::: solution
Mark each letter: r($c$) e($v$) l($c$) a($v$) t($c$) i($v$) o($v$) n($c$) a($v$) l($c$). The pattern is $cvcvcvvcvc$, which groups as $C(VC)(VC)(VC)(VC)$: the vowel-to-consonant changes are e→l, a→t, o→n and a→l, so $m = 4$. Running `measure("relational")` from the listing prints `4`. Step 2 of the full algorithm will turn `relational` into `relate` by the rule $(m > 0)$ `ational` → `ate`.
:::
:::

::: exercise Step 1 by hand {level=1}
Apply step 1 of the Porter stemmer ([[#alg-porter1]]) to `rating`, `controlling`, `sky` and `yes`. Explain each result.
::: solution
- `rating`: remove `ing` (stem `rat` has a vowel) to get `rat`. The result ends in `at`, so the first sub-rule fires and adds `e`: `rate`.
- `controlling`: remove `ing` to get `controll`; it ends in a double consonant, but the letter is `l`, which is excluded, so it stays `controll` (step 5b later removes one `l`, giving `control`).
- `sky`: no rule of step 1 applies (no `s`, `ed` or `ing`), so `sky` is unchanged; $m = 0$, since `y` after the consonant `k` is a vowel and the pattern is $ccv$.
- `yes`: step 1a removes the final `s`, giving `ye` — a reminder that stems need not be words, and that very short words are over-stemmed. The listing prints `rate`, `controll`, `sky` and `ye`.
:::
:::

::: exercise Frequency four {level=2 check="2630/20"}
Using [[#prop-spectrum]] with $C = V = 2630$, predict the number of types in *Alice* that occur exactly four times. (Enter the prediction exactly.) The actual number is $149$; comment.
::: solution
$V_4 \approx V/(4 \cdot 5) = 2630/20 = 131.5$. The actual count, $149$, is higher; for $k = 1$ the prediction was too high ($1315$ against $1143$). Both deviations say the same thing: the real spectrum is flatter than the $s = 1$ model at the very bottom, so fewer types occur once and more occur a few times than the model predicts. With a general exponent $s$ the same argument gives $V_k \propto k^{-1/s} - (k+1)^{-1/s}$.
:::
:::

::: exercise Doubling the vocabulary {level=2 check="2^(1/0.572)"}
With Heaps' law $V = K T^{0.572}$, by what factor must the number of tokens grow for the vocabulary to double? (Enter the factor.)
::: solution
$K(cT)^{0.572} = 2KT^{0.572}$ gives $c^{0.572} = 2$, so $c = 2^{1/0.572} \approx 3.36$. In general, with exponent $\beta$ the factor is $2^{1/\beta}$: about $4$ for $\beta = 1/2$, and larger for smaller $\beta$.
:::
:::

::: exercise The top 25 words {level=2}
Use [[#prop-topk]] to predict the share of the $25$ most frequent types among the tokens of *Alice* ($V = 2630$). The measured share is $38.1\%$. Explain the direction of the discrepancy using the fitted exponent.
::: solution
$H_{25} = 3.8160$ and $H_{2630} = 8.4521$, so the prediction is $3.8160 / 8.4521 = 0.451$, i.e. $45\%$. The measured $38.1\%$ is lower. At the top of the list the real frequencies fall *less* steeply than the line fitted to the whole range: `the` would need to occur far more often for $r f_r$ to be constant (compare $r f_r = 1642$ at rank $1$ with about $4000$ further down). So the head carries less of the mass than a pure power law would give it. A model that fits the head better, such as Mandelbrot's $f_r = C/(r + q)^s$ with a shift $q > 0$, is often used for this reason.
:::
:::

::: exercise Heaps from Zipf {#ex-heaps-zipf level=3}
Suppose each token is drawn independently from a fixed distribution over an unbounded vocabulary with $p_r = r^{-s}/\zeta(s)$ for the term of rank $r$, where $s > 1$ and $\zeta(s) = \sum_{r \ge 1} r^{-s}$. Show that the expected vocabulary size after $T$ tokens satisfies $\E[V(T)] = \Theta(T^{1/s})$, so that such a model predicts Heaps' law with $\beta = 1/s$. Compare with *Alice*.
::: hint
$\E[V(T)] = \sum_r \bigl(1 - (1 - p_r)^T\bigr)$. Split the sum at the rank $r^*$ where $T p_r = 1$.
:::
::: solution
Term $r$ is in the vocabulary after $T$ tokens unless all $T$ draws miss it, so by linearity of expectation $\E[V(T)] = \sum_{r \ge 1} \bigl(1 - (1 - p_r)^T\bigr)$. Let $r^* = (T/\zeta(s))^{1/s}$, the rank with $T p_r = 1$.

*Upper bound.* Each summand is at most $1$, and also at most $T p_r$ (by Bernoulli's inequality $(1 - p)^T \ge 1 - Tp$). So
$$
\E[V(T)] \le r^* + \sum_{r > r^*} T p_r \le r^* + \frac{T}{\zeta(s)} \int_{r^* - 1}^{\infty} x^{-s}\,dx = r^* + \frac{T}{\zeta(s)} \frac{(r^*-1)^{1-s}}{s - 1} = O(r^*),
$$
because $\frac{T}{\zeta(s)} (r^*)^{1 - s} = (r^*)^s (r^*)^{1-s} = r^*$.

*Lower bound.* For $r \le r^*$ we have $p_r \ge 1/T$, so $(1 - p_r)^T \le (1 - 1/T)^T \le e^{-1}$ and the summand is at least $1 - e^{-1}$. Hence $\E[V(T)] \ge (1 - e^{-1}) \lfloor r^* \rfloor$.

Together, $\E[V(T)] = \Theta(r^*) = \Theta(T^{1/s})$, Heaps' law with $\beta = 1/s$. For *Alice*, $s \approx 1.13$–$1.21$ would predict $\beta \approx 0.83$–$0.88$, far above the measured $0.57$. The model fails because real text is not an independent sequence: it is bursty, and its vocabulary is not drawn from a fixed distribution — a chapter introduces new characters and topics. Even the shuffled book, which is independent draws from *Alice*'s own finite vocabulary, has a fitted $\beta$ of only about $0.52$, because a finite vocabulary of $2\,630$ types must flatten the curve as it is exhausted. The two "laws" are best treated as separate empirical descriptions.
:::
:::

::: exercise A better segmenter {level=3}
Write a function that segments a string without spaces into dictionary words so as to use the **fewest** words, returning `None` if no segmentation exists. Run it on the string and dictionary of [[#ex-maxmatch]]. What is its running time for a string of length $n$ and longest dictionary word of length $L$, assuming dictionary lookup costs $O(L)$?
::: solution
Let $\mathit{best}[i]$ be the fewest words needed to segment the first $i$ characters. Then $\mathit{best}[0] = 0$ and $\mathit{best}[j] = \min\set{\mathit{best}[i] + 1 : j - L \le i < j,\ s[i:j] \in D}$; remembering the minimising $i$ lets us read the segmentation backwards.

```python
def segment(s, D):
    L = max(map(len, D))
    best, back = [0] + [None] * len(s), [None] * (len(s) + 1)
    for j in range(1, len(s) + 1):
        for i in range(max(0, j - L), j):
            if best[i] is not None and s[i:j] in D and (best[j] is None or best[i] + 1 < best[j]):
                best[j], back[j] = best[i] + 1, i
    if best[len(s)] is None:
        return None
    words, j = [], len(s)
    while j > 0:
        words.append(s[back[j]:j]); j = back[j]
    return words[::-1]

D = {"the", "theta", "table", "tab", "bled", "led", "down", "own", "there", "here", "a", "able"}
print(segment("thetabledownthere", D))
```
```text
['the', 'table', 'down', 'there']
```
Both `the table down there` and `theta bled own there` use $4$ words, and the dynamic programme returns the first because of how it breaks ties (it replaces $\mathit{best}[j]$ only on a strict improvement). Fewest words is only a heuristic; to prefer the sensible reading in general one maximises the product of word probabilities instead, which is the same dynamic programme with $-\log p(w)$ as the cost of each word. There are $n$ positions $j$, each tries at most $L$ split points, and each test slices and looks up a string of length at most $L$, so the time is $O(nL^2)$.
:::
:::

::: exercise Code points {level=1 check="5"}
How many code points does the NFD (decomposed) form of the string `café` have? (Enter the number.)
::: solution
NFD decomposes é into `e` followed by U+0301 COMBINING ACUTE ACCENT, so `café` becomes `c`, `a`, `f`, `e`, U+0301: $5$ code points, though it displays as $4$ characters. This is the string `b` of [[#ex-unicode]], for which `len(b)` printed `5`.
:::
:::

::: exercise Stemming and evaluation {level=2}
A collection contains documents about the universe (astronomy) and about universities. Explain, in terms of precision and recall, the effect of Porter stemming on the queries `universe expansion` and `university admissions`, and suggest a mitigation.
::: solution
Porter maps both `universe` and `university` to `univers`. For `universe expansion`, documents about university expansion (new campuses) now match the first term, so irrelevant documents may be retrieved: **precision falls**. Recall gains little, since `universe` has few other forms worth conflating (`universes`). Symmetrically for `university admissions`. A mitigation is to index both stemmed and unstemmed forms and give exact matches a higher weight, or to use a less aggressive stemmer (one that only removes inflectional suffixes, such as plural `s`) or a lemmatiser, which keeps the two lemmas apart. Whether any of these helps on balance must be measured on real queries ([[information-retrieval/evaluation]]).
:::
:::
