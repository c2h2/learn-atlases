A language model never sees words. It sees a sequence of integers, produced from text by a chain of decisions that are easy to overlook: which characters exist, how they are stored as bytes, whether two strings that look identical are treated as the same, and where one word ends and the next begins. Each decision changes what the model can learn and how much it costs to run. A model that cannot tell that *café* typed on one keyboard equals *café* typed on another has two words where a reader sees one; a tokeniser that works on bytes spends three times as many symbols on a Chinese character as on an English letter.

This chapter is about text before any model touches it. The first half covers **characters**: Unicode code points, the UTF-8 encoding that turns them into bytes (computed bit by bit), and the normalisation forms that decide when two strings are equal. The second half covers **words**: types and tokens, corpora, and two empirical regularities that hold in almost every language and every corpus — **Zipf's law**, which says that a few words are very frequent and most words are very rare, and **Heaps' law**, which says that new words keep appearing however much text one reads. Both laws are fitted below on a real public-domain novel, and both explain why the next chapter, [[text-and-language/tokenisation]], abandons whole words as the units of a language model.

## Characters and code points {#sec-unicode}

Computers store numbers, so text must be represented by numbers. Early systems used small tables: ASCII (1963) assigns the numbers $0$ to $127$ to the English alphabet, digits, punctuation and control codes, and dozens of incompatible 8-bit extensions added accented letters, Cyrillic or Greek in the upper half $128$–$255$. A file meant nothing without knowing which table had been used, and no table could hold Chinese, Japanese and Korean, which need tens of thousands of characters. Unicode replaced all of them with a single table.

::: definition Unicode code points {#def-codepoint}
The **Unicode code space** is the set of integers $0$ to $\text{10FFFF}_{16} = 1{,}114{,}111$, written U+0000 to U+10FFFF. It is divided into $17$ **planes** of $2^{16} = 65{,}536$ code points; plane $0$, U+0000–U+FFFF, is the **Basic Multilingual Plane**. The $2{,}048$ code points U+D800–U+DFFF (**surrogates**) are reserved for the UTF-16 encoding and never denote characters; the remaining $1{,}114{,}112 - 2{,}048 = 1{,}112{,}064$ are the **Unicode scalar values**. The standard assigns some scalar values to **abstract characters**, each with a name and properties (category, case mappings, decomposition). A **Unicode string** is a finite sequence of scalar values.
:::

Unicode 16.0 (September 2024), the version in the Python 3.14 used for this chapter, assigns $154{,}998$ characters; each new version adds a few thousand (historic scripts, CJK ideographs, emoji), so the count is best treated as "about $155{,}000$ and growing" (as of 2026). Most of the code space is empty, and will stay so.

A code point is not the same thing as what a reader perceives as one character. Unicode distinguishes three levels:

- The **code point** — the unit of the standard, and what Python's `len` counts.
- The **grapheme cluster** — what a user perceives as one character, which may be several code points. The letter *é* can be the single code point U+00E9 or the pair U+0065 (e) followed by U+0301 (combining acute accent). The flag of France is two code points, the regional indicators F and R. The family emoji 👨‍👩‍👧 is five: man, zero-width joiner, woman, zero-width joiner, girl.
- The **glyph** — the shape a font draws, which depends on the font and on context (Arabic letters change shape by position; *f* and *i* may be drawn as a ligature).

A language model works with code points or, more often, with the bytes that encode them; the grapheme level is invisible to it unless the training data teach it. Reversing a string code point by code point can therefore separate an accent from its letter or break an emoji in two — one of several reasons why "simple" character manipulation is hard for language models, as [[text-and-language/tokenisation]] explains.

## From code points to bytes: UTF-8 {#sec-utf8}

Files and network messages are sequences of bytes, integers from $0$ to $255$. An **encoding form** maps each scalar value to a short byte sequence. Unicode defines three: UTF-32 uses four bytes for everything, UTF-16 two or four, and UTF-8 one to four. UTF-8 is the encoding of the vast majority of web pages and the default in most programming languages and operating systems, and it is the byte stream seen by byte-level tokenisers.

::: algorithm UTF-8 encoding {#alg-utf8}
Write the scalar value $c$ in binary and choose the number of bytes by its size:

| range of $c$ | bits | byte 1 | byte 2 | byte 3 | byte 4 |
|---|---|---|---|---|---|
| U+0000 – U+007F | 7 | `0xxxxxxx` | | | |
| U+0080 – U+07FF | 11 | `110xxxxx` | `10xxxxxx` | | |
| U+0800 – U+FFFF | 16 | `1110xxxx` | `10xxxxxx` | `10xxxxxx` | |
| U+10000 – U+10FFFF | 21 | `11110xxx` | `10xxxxxx` | `10xxxxxx` | `10xxxxxx` |

Fill the `x` positions with the bits of $c$, most significant first, padding with leading zeros to the number of bits in the second column. Surrogates (U+D800–U+DFFF) are not encoded. The first byte of a sequence is the **lead byte**; the others, all of the form `10xxxxxx`, are **continuation bytes**.
:::

::: example Four characters, byte by byte {#ex-utf8}
Encode *é* (U+00E9), *€* (U+20AC), *中* (U+4E2D) and 😀 (U+1F600) in UTF-8.
::: solution
**é**: $\text{E9}_{16} = 233$ lies in U+0080–U+07FF, so it takes two bytes and 11 bits: `000 1110 1001` regrouped as `00011` and `101001`. The bytes are `110 00011` $=$ C3 and `10 101001` $=$ A9.

**€**: $\text{20AC}_{16}$ needs three bytes and 16 bits: `0010 0000 1010 1100` regrouped as `0010 | 000010 | 101100`. The bytes are `1110 0010` $=$ E2, `10 000010` $=$ 82 and `10 101100` $=$ AC.

**中**: $\text{4E2D}_{16}$ = `0100 1110 0010 1101`, regrouped as `0100 | 111000 | 101101`, gives `1110 0100` $=$ E4, `10 111000` $=$ B8, `10 101101` $=$ AD.

**😀**: $\text{1F600}_{16}$ is beyond U+FFFF, so four bytes and 21 bits: `000 011111 011000 000000`. The bytes are `11110 000` $=$ F0, `10 011111` $=$ 9F, `10 011000` $=$ 98 and `10 000000` $=$ 80.

So *é* costs two bytes, *€* and *中* three, and 😀 four. A code point needs as many bytes as its size requires, whatever the script's importance or the number of its speakers.
:::
:::

The same computation in Python, checked against the built-in codec:

```python
import unicodedata

def utf8_encode(cp):
    """Encode one code point (an int) as UTF-8 by hand; returns a list of byte values."""
    if cp < 0x80:                      # 1 byte : 0xxxxxxx
        return [cp]
    if cp < 0x800:                     # 2 bytes: 110xxxxx 10xxxxxx
        return [0xC0 | cp >> 6, 0x80 | cp & 0x3F]
    if cp < 0x10000:                   # 3 bytes: 1110xxxx 10xxxxxx 10xxxxxx
        if 0xD800 <= cp <= 0xDFFF:
            raise ValueError("surrogates are not characters")
        return [0xE0 | cp >> 12, 0x80 | cp >> 6 & 0x3F, 0x80 | cp & 0x3F]
    if cp <= 0x10FFFF:                 # 4 bytes: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        return [0xF0 | cp >> 18, 0x80 | cp >> 12 & 0x3F, 0x80 | cp >> 6 & 0x3F, 0x80 | cp & 0x3F]
    raise ValueError("beyond U+10FFFF")

for ch in "Aé€中😀":
    mine = utf8_encode(ord(ch))
    assert bytes(mine) == ch.encode("utf-8")       # agrees with Python's codec
    print(f"U+{ord(ch):04X} {unicodedata.name(ch):<34} {' '.join(f'{b:02X}' for b in mine)}")

s = "naïve café"
print(len(s), "code points,", len(s.encode("utf-8")), "bytes")
```

```text
U+0041 LATIN CAPITAL LETTER A             41
U+00E9 LATIN SMALL LETTER E WITH ACUTE    C3 A9
U+20AC EURO SIGN                          E2 82 AC
U+4E2D CJK UNIFIED IDEOGRAPH-4E2D         E4 B8 AD
U+1F600 GRINNING FACE                      F0 9F 98 80
10 code points, 12 bytes
```

(In Python, `>>` and `&` bind more tightly than `|`, and `>>` more tightly than `&`, so `0x80 | cp >> 6 & 0x3F` means `0x80 | ((cp >> 6) & 0x3F)`.) The design of UTF-8 has four properties that matter whenever text is processed as bytes.

::: proposition Properties of UTF-8 {#prop-utf8}
1. **ASCII compatibility.** A byte below $128$ occurs in a UTF-8 string only as the encoding of the corresponding ASCII character.
2. **Unique decoding and self-synchronisation.** The lead byte determines the length of its sequence, and lead bytes and continuation bytes are distinguishable, so a byte string has at most one decoding, and a decoder that starts in the middle of a string finds the next character boundary after skipping at most three bytes.
3. **Shortest form.** Each scalar value has exactly one encoding; the "overlong" encodings that would fit a small value into a longer pattern are invalid.
4. **Order.** Comparing two UTF-8 strings byte by byte (lexicographically) gives the same order as comparing their sequences of code points.
:::

::: proof
(1) Every byte of a multi-byte sequence has its top bit set: lead bytes begin `110`, `1110` or `11110`, continuation bytes `10`. So a byte `0xxxxxxx` can only be a one-byte sequence, which is the ASCII character.

(2) The patterns `0`, `10`, `110`, `1110`, `11110` are prefix-free — none is the beginning of another — so the first bits of any byte say whether it is a continuation byte or a lead byte, and a lead byte says how many continuation bytes follow. Reading from the start, each sequence is therefore determined, and there is at most one way to split a byte string into encoded characters. A decoder placed at an arbitrary byte skips continuation bytes (`10xxxxxx`) until it meets a lead byte; since a sequence has at most three continuation bytes, it skips at most three.

(3) The encoding rule chooses the number of bytes from the range of $c$, and the ranges in [[#alg-utf8]] are disjoint, so the encoding is a function. A decoder must reject, for example, C0 80 (which would decode to U+0000 using two bytes); with that rule the decoding is the inverse of the encoding and each scalar value has one valid form.

(4) Let $a$ and $b$ be code points with $a < b$. If they need the same number of bytes, their encodings are their bit strings, zero-padded to the same length, cut into the same fields behind the same fixed prefixes; comparing the bytes compares the bits from the most significant end, which is comparing the numbers. If $a$ needs fewer bytes than $b$, the lead byte of $a$ is smaller: lead bytes for one, two, three and four bytes lie in $[\text{00}, \text{7F}]$, $[\text{C2}, \text{DF}]$, $[\text{E0}, \text{EF}]$ and $[\text{F0}, \text{F4}]$, increasing intervals. Since the encodings are prefix-free, comparing two strings byte by byte reaches a first differing byte inside the first differing code point, and the order there is the code-point order.
:::

Two consequences recur in this course. First, **byte counts depend on the script**: ASCII letters take one byte; Latin letters with diacritics, Greek, Cyrillic, Hebrew and Arabic take two; most other characters of the Basic Multilingual Plane — Devanagari, Thai, Chinese, Japanese, Korean — take three; emoji and rare CJK ideographs take four. A tokeniser that starts from bytes therefore starts from a sequence two or three times longer for Hindi or Chinese than for English text of the same content, a disparity that [[text-and-language/tokenisation#sec-disparity]] measures. Second, **any byte string can be split into tokens, but not every byte string is text**: a model that generates bytes, or byte-level tokens, can produce invalid UTF-8 (a lead byte with no continuation), which decoders must handle.

::: quiz
How many bytes does the string `naïve café` (ten code points, one space, no combining characters) occupy in UTF-8?
- [ ] $10$
- [ ] $11$
- [x] $12$
- [ ] $20$
::: solution
Eight of the ten code points are ASCII (one byte each, including the space); *ï* (U+00EF) and *é* (U+00E9) lie in U+0080–U+07FF and take two bytes each. Total $8 + 2\cdot2 = 12$, as the listing printed.
:::
:::

## When are two strings equal? Normalisation {#sec-normalisation}

The pair "e + combining acute" and the single code point "é" are different sequences of code points that every reader regards as the same text. Unicode calls them **canonically equivalent**. A weaker relation, **compatibility equivalence**, identifies characters that are variants of the same thing for most purposes but may look different: the ligature *ﬁ* (U+FB01) and the two letters *fi*, the full-width *Ａ* (U+FF21) used in East Asian typography and the ordinary *A*, the circled digit *①* and the digit *1*, the superscript *²* and the digit *2*.

::: definition Normalisation forms {#def-normal-forms}
Unicode Standard Annex #15 defines four **normalisation forms**, functions from strings to strings:

- **NFD** (canonical decomposition): replace every character by its canonical decomposition, recursively, and put sequences of combining marks into a standard order.
- **NFC** (canonical composition): apply NFD, then recombine base characters and marks into precomposed characters wherever the standard allows.
- **NFKD** and **NFKC**: the same, but using compatibility decompositions as well as canonical ones.

Two strings are canonically equivalent if and only if they have the same NFD (equivalently, the same NFC), and compatibility equivalent if and only if they have the same NFKD (equivalently NFKC). Each form is idempotent: normalising twice gives the same result as normalising once.
:::

::: example Normalisation in practice {#ex-normalise}
Apply NFC, NFD and NFKC to *e*+U+0301, *é*, *ﬁ*, *①*, *Ａ*, *x²* and *Å*.
::: solution
```python
import unicodedata
for t in ["é", "é", "ﬁ", "①", "Ａ", "x²", "Å"]:
    forms = {f: unicodedata.normalize(f, t) for f in ("NFC", "NFD", "NFKC")}
    print(repr(t), {f: [f"U+{ord(c):04X}" for c in v] for f, v in forms.items()})
```

```text
'é' {'NFC': ['U+00E9'], 'NFD': ['U+0065', 'U+0301'], 'NFKC': ['U+00E9']}
'é' {'NFC': ['U+00E9'], 'NFD': ['U+0065', 'U+0301'], 'NFKC': ['U+00E9']}
'ﬁ' {'NFC': ['U+FB01'], 'NFD': ['U+FB01'], 'NFKC': ['U+0066', 'U+0069']}
'①' {'NFC': ['U+2460'], 'NFD': ['U+2460'], 'NFKC': ['U+0031']}
'Ａ' {'NFC': ['U+FF21'], 'NFD': ['U+FF21'], 'NFKC': ['U+0041']}
'x²' {'NFC': ['U+0078', 'U+00B2'], 'NFD': ['U+0078', 'U+00B2'], 'NFKC': ['U+0078', 'U+0032']}
'Å' {'NFC': ['U+00C5'], 'NFD': ['U+0041', 'U+030A'], 'NFKC': ['U+00C5']}
```

The two spellings of *é* print identically and have the same NFC and NFD, so they are canonically equivalent. NFC and NFD leave *ﬁ*, *①*, *Ａ* and *²* alone, because these are only compatibility variants; NFKC maps them to *fi*, *1*, *A* and *2*. (*Å* here was typed as U+00C5; the Ångström sign U+212B also normalises to U+00C5 under NFC.)
:::
:::

Normalisation is a choice made by the tokeniser's designer. SentencePiece ([[text-and-language/tokenisation]]) applies an NFKC-based rule by default; the byte-level tokenisers of the GPT-2 family apply no normalisation at all and leave the model to learn that the two forms of *é* mean the same thing. Neither choice is free: without normalisation the same word has several encodings and statistics are split between them; with NFKC some distinctions are destroyed.

::: warning Normalisation and case folding can change meaning
NFKC turns $x^2$ written with a superscript into *x2* and the chemical-looking *H₂O* into *H2O*; it is appropriate for search and matching, not for text that must be reproduced exactly. Lower-casing is not a normalisation form and is language-dependent: in Turkish, the lower case of *I* is dotless *ı*, and German *ß* upper-cases to *SS*, so a round trip changes the string's length. Whatever is done to training text must be done identically at inference time; a tokeniser trained on NFKC text and fed un-normalised text sees code points it has rarely or never seen.
:::

## Words, types and corpora {#sec-words}

Above the level of characters, text is made of words — or so it seems in English. Counting words requires deciding what one is.

::: definition Tokens, types and corpora {#def-types}
A **corpus** is a body of text collected for study. A **word segmentation** (tokenisation, in the classical sense) cuts the corpus into a sequence of **word tokens** — running words — $w_1, w_2, \dots, w_N$; $N$ is the size of the corpus in tokens. The distinct values that occur are its **word types**; their set is the **vocabulary**, of size $V$. The **frequency** $c(w)$ of a type is the number of its tokens, so $\sum_wc(w) = N$. A type with $c(w) = 1$ is a **hapax legomenon** (Greek, "said once").
:::

The sentence *the cat sat on the mat* has $N = 6$ tokens and $V = 5$ types, *the* having frequency $2$. Even for English the segmentation involves choices — is *don't* one token or two, is *New York* one, are *Cat* and *cat* the same type, are *run*, *runs* and *ran*? — and every choice changes $N$, $V$ and the counts. Many writing systems make the choice harder still. Chinese, Japanese and Thai do not separate words with spaces, so segmentation is itself a prediction problem, and Chinese linguists debate what a "word" is (see the Chinese Atlas lessons on [morphology](/learn/chinese/lesson.php?c=linguistics&l=morphology) and on [characters in the digital age](/learn/chinese/lesson.php?c=chinese-characters&l=characters-digital)). Agglutinative languages such as Turkish and Finnish build long words from many morphemes, so that the number of distinct word forms is enormous. [[text-and-language/linguistic-structure]] returns to morphology; here we use a deliberately simple rule — lower-case the text and take maximal runs of letters, allowing internal apostrophes — and study the counts it produces.

Corpora used for language modelling have grown by orders of magnitude. The Brown Corpus (Francis and Kučera, compiled in the 1960s) contains about one million words of American English in $500$ samples from $15$ genres, and was the basis of early frequency studies. Project Gutenberg offers tens of thousands of public-domain books. The pretraining corpora of large language models, assembled mainly from filtered web crawls, are measured in trillions of tokens (as of 2026; see [[pretraining/training-data]]). The statistical laws below hold at all of these scales.

## Zipf's law {#sec-zipf}

Sort the types of a corpus by frequency, most frequent first, and let $f(r)$ be the frequency of the type of rank $r$. In every natural-language corpus, $f(r)$ falls steeply and smoothly.

::: definition Zipf's law {#def-zipf}
A corpus follows **Zipf's law** with exponent $s > 0$ if the frequency of the type of rank $r$ is approximately

$$
f(r)\approx\frac{C}{r^{s}},\qquad\text{equivalently}\qquad\log f(r)\approx\log C - s\log r,
$$ {#eq-zipf}

for a constant $C$. For word frequencies $s$ is close to $1$. Zipf's law is an empirical regularity, not a theorem: it describes the middle of the rank range well, the most frequent few types and the long tail of rare types less well. Mandelbrot's generalisation $f(r)\approx C/(r + b)^{s}$ fits the head better.
:::

On a log–log plot [[#eq-zipf]] is a straight line of slope $-s$. Here it is fitted to *Moby-Dick* by Herman Melville (1851), Project Gutenberg eBook #2701, downloaded on 2026-10-27 (the file includes Gutenberg's header and licence, which are cut off):

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()     # Moby-Dick, Project Gutenberg #2701
start = raw.index("\n", raw.index("*** START OF")) + 1  # strip the Gutenberg header ...
end = raw.index("*** END OF")                           # ... and licence footer
words = re.findall(r"[a-z]+(?:['’][a-z]+)*", raw[start:end].lower())
counts = collections.Counter(words)
ranked = counts.most_common()                           # [(type, frequency)], by rank
N, V = len(words), len(counts)
print("tokens N =", N, " types V =", V)
print("hapax legomena:", sum(1 for w, c in ranked if c == 1))
for r in (1, 2, 3, 4, 5, 10, 100, 1000, 10000):
    w, c = ranked[r - 1]
    print(f"rank {r:>5}: {w!r:>12} {c:>6}  r*f = {r * c}")

def fit(xs, ys):                                        # least-squares line y = a + b x
    n = len(xs); mx = sum(xs) / n; my = sum(ys) / n
    b = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    return my - b * mx, b

xs = [math.log10(r) for r in range(10, 1001)]           # ranks 10..1000
ys = [math.log10(ranked[r - 1][1]) for r in range(10, 1001)]
a, b = fit(xs, ys)
print(f"Zipf fit, ranks 10-1000: log10 f = {a:.3f} {b:+.3f} log10 r  (s = {-b:.3f})")
```

```text
tokens N = 216625  types V = 17368
hapax legomena: 7650
rank     1:        'the'  14535  r*f = 14535
rank     2:         'of'   6624  r*f = 13248
rank     3:        'and'   6447  r*f = 19341
rank     4:          'a'   4739  r*f = 18956
rank     5:         'to'   4627  r*f = 23135
rank    10:          'i'   1993  r*f = 19930
rank   100:      'white'    281  r*f = 28100
rank  1000:    'minutes'     21  r*f = 21000
rank 10000:  'inlanders'      1  r*f = 10000
Zipf fit, ranks 10-1000: log10 f = 4.575 -1.083 log10 r  (s = 1.083)
```

If Zipf's law held exactly with $s = 1$, the product $r\cdot f(r)$ would be constant. It is not constant, but over four orders of magnitude of rank it stays between about $10{,}000$ and $30{,}000$ while $f$ itself falls from $14{,}535$ to $1$. The fitted exponent over ranks $10$–$1000$ is $s = 1.083$.

::: widget regression
points: 0,4.16; 0.3,3.82; 0.48,3.81; 0.7,3.67; 1,3.3; 1.3,3.12; 1.7,2.75; 2,2.45; 2.3,2.11; 2.7,1.64; 3,1.32; 3.3,1.04; 3.7,0.6
degree: 1
x: -0.2, 4
y: 0, 4.5
caption: Zipf's law in *Moby-Dick*: $\log_{10}$ of the frequency of the type of rank $r$ against $\log_{10}r$, for the ranks $1, 2, 3, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000$ (from the listing). The least-squares line has slope close to $-1$. Drag a point to see how much the head (the first few ranks) pulls the fitted slope, and try degree $2$ to see the slight concavity of real rank–frequency curves.
:::

::: example Reading a Zipf fit {#ex-zipf-fit}
Using the fitted line $\log_{10}f = 4.575 - 1.083\log_{10}r$, predict the frequency of the type of rank $100$ in *Moby-Dick* and compare it with the observed $281$. What does the exact law $f(r) = f(1)/r$ predict?
::: solution
$\log_{10}f = 4.575 - 1.083\cdot2 = 2.409$, so $f\approx10^{2.409}\approx256$, about $9\%$ below the observed $281$. The exact $s = 1$ law anchored at the top word predicts $14{,}535/100\approx145$, far too low, because *the* is more frequent than the rest of the curve suggests — the head of the distribution is where Zipf's law fits worst, which is why the fit excluded ranks below $10$.
:::
:::

Zipf's law makes two quantitative predictions that matter for language modelling: a handful of types account for a large share of all tokens, and most types are rare.

::: proposition Coverage under Zipf's law {#prop-coverage}
Suppose the vocabulary has $V$ types with frequencies exactly proportional to $1/r$. Then the fraction of all tokens that belong to the $k$ most frequent types is

$$
\frac{H_k}{H_V}\approx\frac{\ln k + \gamma}{\ln V + \gamma},\qquad H_n = \sum_{r=1}^{n}\frac1r,
$$

where $\gamma = 0.5772\ldots$ is the Euler–Mascheroni constant.
:::

::: proof
With $f(r) = C/r$, the number of tokens of the top $k$ types is $C\sum_{r\le k}1/r = CH_k$ and the total is $CH_V$; the constant cancels. The approximation is the classical asymptotic $H_n = \ln n + \gamma + O(1/n)$, which follows from comparing the sum with $\int_1^n dx/x = \ln n$.
:::

For *Moby-Dick*, $V = 17{,}368$ and $H_V = 10.34$, so the proposition predicts that the top $100$ types cover $H_{100}/H_V = 5.187/10.34 = 50.2\%$ of the text; the actual coverage, computed from the same counts, is $50.6\%$. A hundred words — nearly all of them function words — make up half of the novel, and to cover $90\%$ of the tokens would take about $6{,}000$ types under the same law (exercise 9). The other half of the prediction concerns the tail.

::: proposition Most types are rare {#prop-hapax}
Suppose the frequency of the type of rank $r$ is $C/r$ and treat ranks as continuous, so that the number of types with frequency at least $m$ is $C/m$. Then the number of types with frequency exactly $m$ is

$$
V_m = \frac{C}{m} - \frac{C}{m + 1} = \frac{C}{m(m+1)},
$$

and since the rarest type has frequency $1$, $V\approx C$. Hence about $\tfrac12$ of all types occur once, $\tfrac16$ twice, $\tfrac1{12}$ three times, and in general a fraction $1/\big(m(m+1)\big)$ occur $m$ times.
:::

::: proof
A type has frequency at least $m$ exactly when $C/r\ge m$, that is when $r\le C/m$, so there are $C/m$ such types (ignoring rounding). The types with frequency exactly $m$ are those with frequency at least $m$ but not at least $m + 1$, giving the difference shown. The type of largest rank $V$ has frequency $C/V\approx1$, so $V\approx C$, and dividing $V_m$ by $V$ gives the fractions. They sum to one: $\sum_{m\ge1}\big(\tfrac1m - \tfrac1{m+1}\big) = 1$, a telescoping series.
:::

In *Moby-Dick*, $7{,}650$ of the $17{,}368$ types are hapax legomena — $44\%$, against the predicted $50\%$ — and $2{,}899$ occur exactly twice, $16.7\%$, against the predicted $\tfrac16 = 16.7\%$. The consequence for a statistical model is stark. Almost half the vocabulary is seen once, so nothing reliable can be estimated about it from this corpus; and in a new text of the same kind, a sizeable fraction of tokens will be types never seen at all. This is the **sparse data problem** that [[text-and-language/ngram-models]] meets head on, and that is far worse for pairs and triples of words than for single words.

::: intuition Why should Zipf's law hold?
There is no agreed explanation, and several very different mechanisms produce rank–frequency curves of this shape. Zipf (1949) argued for a "principle of least effort" balancing speaker and hearer. Herbert Simon (1955) showed that a rich-get-richer process — each new word is a repeat of an old word with probability proportional to its past frequency, or a new word with small probability — yields a power law. George Miller (1957) observed that even a monkey typing random letters and spaces produces "words" whose rank–frequency curve is close to Zipfian, so the law alone says little about language. What the law reliably gives is a description: a heavy tail of rare events that no corpus exhausts.
:::

## Heaps' law: the vocabulary never stops growing {#sec-heaps}

Read a corpus from the start and count how many distinct types have been seen after $n$ tokens. If the vocabulary of a language were a fixed, finite list, this count would level off. It does not.

::: definition Heaps' law {#def-heaps}
A corpus follows **Heaps' law** (also called Herdan's law) if the number of distinct types among its first $n$ tokens is approximately

$$
V(n)\approx Kn^{\beta},\qquad 0 < \beta < 1,
$$ {#eq-heaps}

for constants $K$ and $\beta$. For English word types, $\beta$ is typically between about $0.4$ and $0.7$ and $K$ between about $5$ and $100$, depending on the corpus and the segmentation. Like Zipf's law it is an empirical regularity.
:::

Continuing the listing, record $V(n)$ at roughly logarithmically spaced $n$ and fit a line to $\log V$ against $\log n$:

```python
seen, growth = set(), {}
checkpoints = {int(10 ** (k / 4)) for k in range(12, 22)} | {N}   # n = 1000, 1778, ..., N
for i, w in enumerate(words, 1):
    seen.add(w)
    if i in checkpoints:
        growth[i] = len(seen)
for n in sorted(growth):
    print(f"n = {n:>6}  V(n) = {growth[n]:>5}")
ks = sorted(growth)
a2, b2 = fit([math.log10(n) for n in ks], [math.log10(growth[n]) for n in ks])
print(f"Heaps fit: V = {10 ** a2:.2f} * n^{b2:.3f}")
```

```text
n =   1000  V(n) =   469
n =   1778  V(n) =   790
n =   3162  V(n) =  1258
n =   5623  V(n) =  1914
n =  10000  V(n) =  2895
n =  17782  V(n) =  4108
n =  31622  V(n) =  5937
n =  56234  V(n) =  8318
n = 100000  V(n) = 11872
n = 177827  V(n) = 15973
n = 216625  V(n) = 17368
Heaps fit: V = 5.90 * n^0.660
```

Even in the last fifth of the novel, about one token in $25$ is a type not seen before.

::: widget plot
f: K*(1000*x)^b/1000
x: 0, 230
y: 0, 25
sliders: K=5.9:1:20:0.1; b=0.66:0.3:1:0.01
labels: $V(n)/1000$ for $V = Kn^{\beta}$, $n$ in thousands of tokens
points: 10,2.895; 31.622,5.937; 56.234,8.318; 100,11.872; 177.827,15.973; 216.625,17.368
caption: Heaps' law: the number of distinct word types (thousands) after the first $n$ thousand tokens of *Moby-Dick* (points, from the listing) and the curve $Kn^{\beta}$. The fitted values $K = 5.9$, $\beta = 0.66$ pass through the points; with $\beta = 1$ every token would be new, and as $\beta$ falls towards $0.3$ the vocabulary saturates much sooner than real text does.
:::

::: example Extrapolating the vocabulary {#ex-heaps}
Using the fit $V(n) = 5.90\,n^{0.660}$, estimate (a) how much the vocabulary grows when the corpus is doubled, and (b) the vocabulary of a corpus of one billion tokens written like *Moby-Dick*.
::: solution
(a) $V(2n)/V(n) = 2^{0.660} = 1.58$: doubling the text adds $58\%$ more types, whatever $n$ is. (b) $5.90\cdot(10^{9})^{0.660} = 5.90\cdot10^{5.94}\approx5.1$ million types. The second number should not be trusted to better than a factor of a few: it extrapolates from $2\times10^{5}$ to $10^{9}$ tokens, and a billion tokens of real text would come from many authors and topics, with names, numbers, misspellings and foreign words that one novel lacks. The qualitative point survives: a word-level vocabulary keeps growing, roughly as a power of the corpus size.
:::
:::

Zipf's and Heaps' laws are related. If tokens were drawn independently from a fixed distribution with Zipfian probabilities over an unbounded vocabulary, the vocabulary would grow as a power of $n$ with exponent $1/s$.

::: proposition Heaps from Zipf {#prop-heaps-zipf}
Let tokens be drawn independently from a distribution on infinitely many types with $p_r = r^{-s}/\zeta(s)$ for $r = 1, 2, \dots$ and some $s > 1$, where $\zeta(s) = \sum_rr^{-s}$. Then the expected number of distinct types among $n$ draws satisfies $\mathbb{E}[V(n)]\sim c\,n^{1/s}$ as $n\to\infty$, for a constant $c > 0$ depending on $s$.
:::

::: proof
Type $r$ appears among $n$ draws with probability $1 - (1 - p_r)^n$, so by linearity of expectation $\mathbb{E}[V(n)] = \sum_{r\ge1}\big(1 - (1 - p_r)^n\big)$. Write $a = 1/\zeta(s)$ and $u = n^{-1/s}$. For large $n$ the terms that matter have small $p_r$, where $(1 - p_r)^n\approx e^{-np_r}$, and the sum is approximated by an integral:

$$
\sum_{r\ge1}\big(1 - e^{-anr^{-s}}\big)\approx\int_0^\infty\big(1 - e^{-anx^{-s}}\big)\,dx = n^{1/s}\int_0^\infty\big(1 - e^{-ay^{-s}}\big)\,dy,
$$

substituting $x = n^{1/s}y$. The last integral is finite: its integrand is at most $1$ near $0$ and behaves like $ay^{-s}$ for large $y$, which is integrable because $s > 1$. Hence $\mathbb{E}[V(n)]\sim c\,n^{1/s}$ with $c = \int_0^\infty(1 - e^{-ay^{-s}})\,dy$. (The errors from replacing $(1 - p)^n$ by $e^{-np}$ and the sum by the integral are of lower order; Karlin (1967) gives a rigorous treatment of such occupancy problems.)
:::

The model behind the proposition — independent draws from one fixed distribution — is not how text is produced: words are bursty (once *whale* has appeared, it reappears), topics drift, and the fitted Zipf exponent depends on which ranks are used. For *Moby-Dick* the Zipf fit gives $1/s = 1/1.083 = 0.92$, while the directly fitted Heaps exponent is $0.66$; the idealised relation predicts the shape of the law, not its exponent. Both laws, however, say the same thing about modelling: **a word-level vocabulary cannot be closed**. Any fixed list of words will meet unknown words in new text, and the rarest listed words will have too few examples to learn from.

::: application Consequences for language models
A model with a fixed list of word types must map every other word to a single "unknown" symbol, discarding exactly the rare, informative words (names, technical terms) that Zipf's law says are most of the vocabulary. Subword tokenisers ([[text-and-language/tokenisation]]) avoid the problem by building every word from a closed inventory of pieces — down to the $256$ byte values of UTF-8 if necessary — while keeping frequent words whole. The heavy tail also explains why the vocabulary sizes of language models are a compromise, typically tens of thousands to a few hundred thousand tokens (as of 2026): a larger vocabulary shortens sequences, but each additional token is rarer and its embedding is trained on fewer examples.
:::

::: history
The International Telegraph Alphabet and later ASCII (American Standard Code for Information Interchange, 1963) standardised small character sets for teleprinters and computers. Joe Becker, Lee Collins and Mark Davis began the work that led to Unicode in 1987–88, and Unicode 1.0 appeared in 1991, harmonised with the ISO/IEC 10646 standard soon after. UTF-8 was designed by Ken Thompson and Rob Pike in September 1992 for the Plan 9 operating system, and published as an Internet standard (now RFC 3629, 2003, which limits it to U+10FFFF). The rank–frequency regularity was noticed by the French stenographer Jean-Baptiste Estoup (1916) and the physicist Edward Condon (1928) before George Kingsley Zipf made it famous in *The Psycho-Biology of Language* (1935) and *Human Behavior and the Principle of Least Effort* (1949); Benoît Mandelbrot proposed his generalisation in 1953. Gustav Herdan (1960) and Harold Heaps (1978, in a book on information retrieval) described the power-law growth of vocabulary. Henry Kučera and W. Nelson Francis published *Computational Analysis of Present-Day American English* (1967), the frequency study of the Brown Corpus.
:::

::: summary
- Unicode assigns code points U+0000–U+10FFFF; $1{,}112{,}064$ of them are scalar values (surrogates excluded), and about $155{,}000$ are assigned characters (Unicode 16.0). A user-perceived character (grapheme cluster) may be several code points.
- UTF-8 encodes a code point in $1$–$4$ bytes, with prefix-free lead bytes and `10xxxxxx` continuation bytes; it is ASCII-compatible, uniquely decodable, self-synchronising and order-preserving. Byte counts depend on the script: $1$ for ASCII, $2$ for most alphabets with diacritics, $3$ for CJK and most Indic scripts, $4$ for emoji.
- Canonically equivalent strings have the same NFC/NFD; NFKC also merges compatibility variants (ligatures, full-width forms, superscripts) and can change meaning. Normalise training and inference text identically.
- A corpus of $N$ tokens has $V$ types. Zipf's law $f(r)\approx C/r^{s}$ with $s\approx1$ holds empirically: in *Moby-Dick* ($N = 216{,}625$, $V = 17{,}368$) the top $100$ types cover half the text while $44\%$ of types occur once.
- Heaps' law $V(n)\approx Kn^{\beta}$ (fitted $\beta = 0.66$ for *Moby-Dick*): new words never stop appearing, so a word-level vocabulary cannot be closed — the motivation for subword tokenisation.
:::

## Exercises

::: exercise Bytes of a German word {level=1 check="7"}
How many bytes does *Größe* occupy in UTF-8 (NFC form)? Give the bytes of *ß* (U+00DF).
::: solution
*G*, *r* and *e* are ASCII, one byte each; *ö* (U+00F6) and *ß* (U+00DF) are in U+0080–U+07FF, two bytes each. Total $3 + 4 = 7$ bytes. For *ß*: $\text{DF}_{16}$ = `000 1101 1111` regrouped as `00011` and `011111`, giving `110 00011` $=$ C3 and `10 011111` $=$ 9F.
:::
:::

::: exercise Decoding by hand {level=1 check="8364"}
Decode the UTF-8 byte sequence E2 82 AC. Give the code point in decimal.
::: solution
E2 = `1110 0010` is a three-byte lead byte contributing `0010`; 82 = `10 000010` contributes `000010`; AC = `10 101100` contributes `101100`. Concatenating, `0010 000010 101100` = $\text{20AC}_{16} = 8364$, the euro sign — the inverse of [[#ex-utf8]].
:::
:::

::: exercise Code points and bytes {level=1 check="9"}
The string *日本語* (Japanese for "Japanese language") consists of the code points U+65E5, U+672C, U+8A9E. How many code points, and how many UTF-8 bytes, does it have? How many bytes would its English translation *Japanese* take?
::: solution
Three code points, each between U+0800 and U+FFFF, so three bytes each: $9$ bytes. *Japanese* is eight ASCII letters, $8$ bytes. The two strings cost about the same number of bytes although one has three characters and the other eight; a byte-level model of Japanese sees each character as three symbols.
:::
:::

::: exercise A Zipf prediction {level=2 check="14535/50"}
Assume Zipf's law with $s = 1$ holds exactly from the top, $f(r) = f(1)/r$, with $f(1) = 14{,}535$ as for *the* in *Moby-Dick*. Predict the frequency of the type of rank $50$. Is the prediction likely to be too high or too low, given [[#ex-zipf-fit]]?
::: solution
$f(50) = 14{,}535/50 = 290.7$. Since *the* is unusually frequent relative to the rest of the curve (the head is above the fitted line), anchoring at rank $1$ with slope $-1$ underestimates the middle ranks — at rank $100$ it predicted $145$ against an observed $281$ — so this prediction is probably too low. (The observed frequency at rank $50$, the type *what*, is in fact $565$.)
:::
:::

::: exercise Types of frequency three {level=2 check="1/12"}
Under the assumptions of [[#prop-hapax]], what fraction of types occur exactly three times? What fraction occur more than three times?
::: solution
$V_3/V = 1/(3\cdot4) = 1/12\approx0.083$. The types with frequency at least $4$ number $C/4$, a fraction $\tfrac14$; equivalently $1 - \tfrac12 - \tfrac16 - \tfrac1{12} = \tfrac14$.
:::
:::

::: exercise Doubling the corpus {level=2 check="2^0.66"}
With Heaps' law $V(n) = Kn^{0.66}$, by what factor does the vocabulary grow when the corpus is doubled? How many times larger must the corpus be to double the vocabulary?
::: solution
$V(2n)/V(n) = 2^{0.66} = 1.580$. To double the vocabulary, $\lambda^{0.66} = 2$, so $\lambda = 2^{1/0.66} = 2^{1.515} = 2.86$: almost three times as much text for twice as many types.
:::
:::

::: exercise Three-byte code points {level=2 check="61440"}
How many Unicode scalar values are encoded with exactly three bytes in UTF-8? How many with four?
::: solution
Three bytes cover U+0800–U+FFFF, that is $2^{16} - 2^{11} = 65{,}536 - 2{,}048 = 63{,}488$ code points, of which the $2{,}048$ surrogates are not scalar values: $61{,}440$. Four bytes cover U+10000–U+10FFFF, $16\cdot65{,}536 = 1{,}048{,}576$ scalar values. Check: $128 + 1{,}920 + 61{,}440 + 1{,}048{,}576 = 1{,}112{,}064$, the number of scalar values in [[#def-codepoint]].
:::
:::

::: exercise Coverage of $90\%$ {level=3 check="6176"}
Under the exact $s = 1$ Zipf law with $V = 17{,}368$ types, find the smallest $k$ such that the top $k$ types cover at least $90\%$ of the tokens. Use the approximation of [[#prop-coverage]], then check with exact harmonic numbers.
::: solution
We need $H_k\ge0.9H_V$. With $H_n\approx\ln n + \gamma$: $\ln k + \gamma\ge0.9(\ln V + \gamma)$, so $k\ge\exp\big(0.9(\ln17{,}368 + 0.5772) - 0.5772\big) = \exp(8.731) = 6{,}176$. An exact computation,

```python
V = 17368
HV = sum(1 / r for r in range(1, V + 1))     # 10.3396
k, h = 0, 0.0
while h < 0.9 * HV:
    k += 1; h += 1 / k
print(k)                                       # 6176
```

gives the same $k = 6{,}176$. Covering the first half of the tokens takes $100$ types; covering $90\%$ takes over a third of the vocabulary. The last $10\%$ of the text is spread over more than $11{,}000$ types.
:::
:::

::: exercise A UTF-8 decoder {level=3}
Write a function `utf8_decode(bs)` that takes a `bytes` object and returns the list of code points, raising `ValueError` on invalid input: an unexpected continuation byte, a truncated sequence, an overlong encoding, a surrogate, or a value above U+10FFFF. Test it on the output of `utf8_encode` and on the invalid inputs `b"\xc0\x80"`, `b"\xe4\xb8"` and `b"\xed\xa0\x80"`.
::: solution
```python
def utf8_decode(bs):
    out, i = [], 0
    while i < len(bs):
        b = bs[i]
        if b < 0x80:   n, cp, lo = 0, b, 0
        elif b >> 5 == 0b110:   n, cp, lo = 1, b & 0x1F, 0x80
        elif b >> 4 == 0b1110:  n, cp, lo = 2, b & 0x0F, 0x800
        elif b >> 3 == 0b11110: n, cp, lo = 3, b & 0x07, 0x10000
        else:
            raise ValueError(f"unexpected byte {b:02X} at {i}")
        for j in range(1, n + 1):
            if i + j >= len(bs) or bs[i + j] >> 6 != 0b10:
                raise ValueError("truncated sequence")
            cp = cp << 6 | bs[i + j] & 0x3F
        if cp < lo: raise ValueError("overlong encoding")
        if 0xD800 <= cp <= 0xDFFF: raise ValueError("surrogate")
        if cp > 0x10FFFF: raise ValueError("beyond U+10FFFF")
        out.append(cp); i += n + 1
    return out

print([hex(c) for c in utf8_decode("Aé€中😀".encode("utf-8"))])
for bad in (b"\xc0\x80", b"\xe4\xb8", b"\xed\xa0\x80"):
    try: utf8_decode(bad)
    except ValueError as e: print(bad, "->", e)
```

```text
['0x41', '0xe9', '0x20ac', '0x4e2d', '0x1f600']
b'\xc0\x80' -> overlong encoding
b'\xe4\xb8' -> truncated sequence
b'\xed\xa0\x80' -> surrogate
```

The lead byte gives the length and the smallest value that length may encode (`lo`); each continuation byte must start with `10` and contributes six bits. The three invalid inputs are an overlong NUL, a three-byte sequence cut short, and the encoding of the surrogate U+D800.
:::
:::

::: exercise Normalisation and counting {level=3}
A corpus mixes the two canonically equivalent forms of *café* (with U+00E9 and with e + U+0301) in equal numbers, and also contains the full-width string *ｃａｆé*. (a) How many types does a word counter that does no normalisation see? (b) After NFC? (c) After NFKC? (d) Give one argument for and one against applying NFKC before training a tokeniser for a general-purpose language model.
::: solution
(a) Three types: the code-point sequences differ. (b) Two: NFC merges the two forms of *café* (they have the same canonical decomposition), but full-width letters are only compatibility variants. (c) One: NFKC maps U+FF43 etc. to ASCII *c*, *a*, *f*, and composes the accent. (d) For: statistics of the same word are no longer split across encodings, the vocabulary is smaller, and inputs typed on different systems are treated alike. Against: NFKC is lossy — superscripts, ligatures, full-width forms and some mathematical letters carry meaning or formatting that the model can then neither read nor reproduce, which matters for code, mathematics and faithful copying of text.
:::
:::
