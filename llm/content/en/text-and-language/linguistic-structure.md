Everything in this course so far has treated text as a sequence of symbols with statistics. Linguists describe it differently: words are built from smaller meaningful parts, sentences have a hierarchical structure that is not visible in the string, and meaning is composed from the meanings of parts according to that structure. For decades natural-language processing made this structure explicit, with separate programs for each level — a morphological analyser, a part-of-speech tagger, a parser, a named-entity recogniser — chained into a pipeline. Large language models make none of it explicit, and yet they produce grammatical text, agree verbs with distant subjects and resolve many ambiguities. Understanding the structure they must somehow capture, and the classical algorithms that captured it explicitly, is useful both for building systems and for asking what language models have learned.

This chapter surveys the levels of linguistic structure and the classical tasks and algorithms attached to them: **morphology** and its relation to tokenisation, **part-of-speech tagging** with hidden Markov models and the Viterbi algorithm, **named-entity recognition** as sequence labelling, **syntax** — constituency grammars parsed by the CKY algorithm, and dependency trees — and **semantics**, from word senses to semantic roles. It ends with what probing studies have found about this structure inside neural language models. For a fuller linguistic treatment of each level, see the Chinese Atlas lessons on [morphology](/learn/chinese/lesson.php?c=linguistics&l=morphology), [syntax](/learn/chinese/lesson.php?c=linguistics&l=syntax), [semantics](/learn/chinese/lesson.php?c=linguistics&l=semantics) and [pragmatics](/learn/chinese/lesson.php?c=linguistics&l=pragmatics), which treat general linguistics with examples from Chinese and English.

## Levels of structure {#sec-levels}

Linguistics traditionally distinguishes:

- **Phonetics and phonology**: the sounds of speech and the system that organises them (and, for written language, orthography).
- **Morphology**: the internal structure of words — *un-happi-ness*.
- **Syntax**: how words combine into phrases and sentences — that *the old man* is a unit, and the subject of *saw* in *the old man saw the boat*.
- **Semantics**: meaning — of words (*bank* has several senses), and of sentences, composed from their parts.
- **Pragmatics** and **discourse**: meaning in context — what a speaker intends by *Can you pass the salt?*, what *it* refers to across sentences.

Each level is ambiguous in its own way, and resolving the ambiguity at one level often needs information from another. Classical NLP systems handled the levels with separate models; neural models learn them jointly from raw text, which is a large part of why they work better.

## Morphology {#sec-morphology}

::: definition Morpheme {#def-morpheme}
A **morpheme** is a minimal unit of language with a meaning or grammatical function. A **free** morpheme can stand alone as a word (*happy*, *book*); a **bound** morpheme cannot (*un-*, *-ness*, *-s*). Bound morphemes are **affixes** (prefixes, suffixes, infixes) attached to a **stem**. **Inflection** adds grammatical information without changing the word's basic category or meaning (*book* → *books*, *walk* → *walked*); **derivation** forms a new word, often of a new category (*happy* → *happiness*, *read* → *readable*); **compounding** combines stems (*whaleboat*).
:::

Languages differ widely in how much work morphology does. **Isolating** languages such as Mandarin Chinese and Vietnamese have little inflection and express grammatical relations mostly by word order and function words. **Agglutinative** languages such as Turkish, Finnish and Japanese chain many affixes, each with one function: Turkish *evlerimizden*, "from our houses", is *ev-ler-imiz-den*, house-PLURAL-OUR-FROM. **Fusional** languages such as Russian, Latin and German pack several functions into one affix: the Latin ending *-ōrum* marks both genitive case and plural number. English is mostly isolating with some fusional inflection. Rich morphology multiplies the number of word forms — a Finnish noun has over a dozen cases, each in singular and plural — which is one reason the word-level vocabularies of [[text-and-language/text-as-data]] grow fastest for such languages.

::: example Segmenting words into morphemes {#ex-morphemes}
Segment *unhappinesses*, *rewrites* and *whaleboats* into morphemes, label each as free or bound, and say which affixes are inflectional. Compare with the byte-level BPE segmentation of *human beings* in [[text-and-language/tokenisation#sec-byte-bpe]].
::: solution
*un-happi-ness-es*: the free stem *happy* (spelled *happi* before a suffix), the derivational prefix *un-* (negation) and suffix *-ness* (adjective → noun), and the inflectional plural *-es*. *re-write-s*: derivational *re-* ("again"), the free stem *write*, inflectional *-s* (third person singular present). *whale-boat-s*: a compound of two free stems with inflectional *-s*. The BPE tokeniser trained on *Moby-Dick* split *human beings* into ` hum` `an` ` be` `ings`: the boundary in *be-ings* matches a morpheme boundary (stem *be*, derivational *-ing*, plural *-s* merged into one piece), the one in *hum-an* does not. BPE boundaries follow frequency, and coincide with morphemes only when frequent suffixes make them do so.
:::
:::

Two classical normalisations reduce word forms to a common base. A **stemmer** strips affixes by rule: the Porter stemmer (Porter, 1980) maps *connection*, *connected* and *connecting* to *connect*, but also *university* and *universe* to *univers*. A **lemmatiser** maps each form to its dictionary form (*lemma*) using a lexicon and the word's part of speech: *better* → *good* (adjective), *saw* → *see* (verb) or *saw* (noun). Both were standard preprocessing for search and classification; subword tokenisation and neural models have made them unnecessary for most purposes, although morphologically informed tokenisation is still studied for languages with rich morphology.

## Parts of speech and tagging {#sec-pos}

Words fall into classes — nouns, verbs, adjectives, determiners, pronouns, prepositions — that behave alike syntactically. The **Universal Dependencies** (UD) project defines $17$ universal part-of-speech tags (UPOS) intended to apply across languages, among them `NOUN`, `PROPN` (proper noun), `VERB`, `AUX` (auxiliary), `ADJ`, `ADV`, `ADP` (adposition: preposition or postposition), `DET`, `PRON`, `NUM`, `CCONJ`, `PUNCT`; English corpora have also used the $45$ more detailed tags of the Penn Treebank (`NN`, `NNS`, `VBD`, `VBZ`, …). **Part-of-speech tagging** assigns a tag to every token of a sentence. Its difficulty is ambiguity: *book* is a noun in *read the book* and a verb in *book a table*, and in the classic example *time flies like an arrow* every word but *an* has more than one possible tag.

The classical statistical tagger is a **hidden Markov model**: a Markov chain over tags, each of which emits a word.

::: definition Hidden Markov model tagger {#def-hmm}
An **HMM tagger** with tag set $\mathcal{T}$ (size $K$) and vocabulary $\mathcal{V}$ has **transition probabilities** $P(t_i\mid t_{i-1})$ (a bigram model over tags, with start and end symbols) and **emission probabilities** $P(w_i\mid t_i)$. It assigns to a sentence $w_{1:T}$ with tags $t_{1:T}$ the joint probability

$$
P(w_{1:T}, t_{1:T}) = \Big(\prod_{i=1}^{T}P(t_i\mid t_{i-1})\,P(w_i\mid t_i)\Big)P(\texttt{</s>}\mid t_T),\qquad t_0 = \texttt{<s>},
$$ {#eq-hmm}

and tags a sentence with $\hat t_{1:T} = \arg\max_{t_{1:T}}P(w_{1:T}, t_{1:T})$. From a tagged corpus, both distributions are estimated by counting, as in [[text-and-language/ngram-models#prop-ngram-mle]], with smoothing.
:::

The tags are "hidden": a tagger sees only words. There are $K^T$ tag sequences — $17^{20}\approx4\times10^{24}$ for a $20$-word sentence — but the bigram structure allows exact maximisation by dynamic programming, as the unigram tokeniser did in [[text-and-language/tokenisation#prop-viterbi]].

::: algorithm Viterbi decoding for an HMM {#alg-viterbi}
For each position $i = 1, \dots, T$ and tag $t$, compute $\delta_i(t)$, the largest probability of a tag sequence for $w_{1:i}$ that ends in tag $t$, and a back-pointer $\psi_i(t)$:

1. $\delta_1(t) = P(t\mid\texttt{<s>})\,P(w_1\mid t)$.
2. For $i = 2, \dots, T$: $\delta_i(t) = \max_{s}\delta_{i-1}(s)\,P(t\mid s)\cdot P(w_i\mid t)$, and $\psi_i(t)$ is the maximising $s$.
3. $\hat t_T = \arg\max_t\delta_T(t)\,P(\texttt{</s>}\mid t)$; then $\hat t_{i-1} = \psi_i(\hat t_i)$ for $i = T, \dots, 2$.

In practice the computation is done with log-probabilities to avoid underflow.
:::

::: proposition Correctness and cost of Viterbi {#prop-viterbi-hmm}
The algorithm returns a tag sequence maximising [[#eq-hmm]], in $O(TK^2)$ time and $O(TK)$ memory.
:::

::: proof
By induction on $i$, $\delta_i(t)$ is the maximum over tag sequences $t_{1:i}$ with $t_i = t$ of $\prod_{j\le i}P(t_j\mid t_{j-1})P(w_j\mid t_j)$. For $i = 1$ this is the definition. For $i > 1$, such a sequence consists of a sequence ending at position $i - 1$ in some tag $s$, followed by $t$; its probability is that of the prefix times $P(t\mid s)P(w_i\mid t)$, which depends on the prefix only through $s$. Maximising first over prefixes ending in $s$ gives $\delta_{i-1}(s)$, by the induction hypothesis, and then over $s$ gives the recursion. The final step includes the end transition, and following back-pointers reconstructs a maximising sequence. Each of the $TK$ values $\delta_i(t)$ takes a maximum over $K$ predecessors, hence $O(TK^2)$ time; storing $\delta$ and $\psi$ takes $O(TK)$ memory.
:::

::: example Viterbi by hand {#ex-viterbi-hmm}
A two-tag HMM has $P(N\mid\texttt{<s>}) = 0.7$, $P(V\mid\texttt{<s>}) = 0.3$, $P(N\mid N) = 0.4$, $P(V\mid N) = 0.6$, $P(N\mid V) = 0.7$, $P(V\mid V) = 0.3$, and emissions $P(\textit{time}\mid N) = 0.1$, $P(\textit{time}\mid V) = 0.01$, $P(\textit{flies}\mid N) = 0.02$, $P(\textit{flies}\mid V) = 0.05$. Ignoring the end symbol, find the best tagging of *time flies*.
::: solution
$\delta_1(N) = 0.7\cdot0.1 = 0.07$ and $\delta_1(V) = 0.3\cdot0.01 = 0.003$. Then

$$
\begin{aligned}
\delta_2(N) &= \max(0.07\cdot0.4,\ 0.003\cdot0.7)\cdot0.02 = 0.028\cdot0.02 = 0.00056, & \psi_2(N) &= N,\\
\delta_2(V) &= \max(0.07\cdot0.6,\ 0.003\cdot0.3)\cdot0.05 = 0.042\cdot0.05 = 0.0021, & \psi_2(V) &= N.
\end{aligned}
$$

The larger final value is $\delta_2(V)$, and its back-pointer is $N$: the best tagging is *time*/N *flies*/V, with probability $0.0021$. The alternative *time*/N *flies*/N (a kind of insect) has probability $0.00056$, a quarter as large.
:::
:::

Here is an HMM tagger trained on ten tagged sentences written for this lesson, with add-$0.1$ smoothing, applied to sentences containing the ambiguous words *book* and *flies* and the unseen word *bites*:

```python
import math, collections

# a tiny tagged corpus written for this lesson (Universal Dependencies tags)
tagged = """the/DET dog/NOUN barks/VERB
a/DET cat/NOUN sleeps/VERB
the/DET old/ADJ man/NOUN books/VERB a/DET flight/NOUN
she/PRON reads/VERB the/DET book/NOUN
they/PRON book/VERB a/DET table/NOUN
the/DET book/NOUN is/AUX old/ADJ
time/NOUN flies/VERB
the/DET flies/NOUN bite/VERB
he/PRON saw/VERB the/DET old/ADJ dog/NOUN
the/DET man/NOUN reads/VERB a/DET book/NOUN"""
sents = [[tuple(t.split("/")) for t in line.split()] for line in tagged.splitlines()]

trans, emit, tagc = collections.Counter(), collections.Counter(), collections.Counter()
for s in sents:
    tags = ["<s>"] + [t for _, t in s] + ["</s>"]
    trans.update(zip(tags, tags[1:]))
    for w, t in s:
        emit[t, w] += 1; tagc[t] += 1
tags = sorted(tagc)
words = {w for s in sents for w, _ in s}
out_of = collections.Counter()
for (a, b), n in trans.items():
    out_of[a] += n                       # number of transitions leaving a

def p_trans(a, b):                       # add-0.1 smoothed transition probability
    return (trans[a, b] + 0.1) / (out_of[a] + 0.1 * (len(tags) + 1))
def p_emit(t, w):                        # add-0.1 smoothed emission probability
    return (emit[t, w] + 0.1) / (tagc[t] + 0.1 * (len(words) + 1))

def viterbi(ws):
    """best[i][t] = (log-prob of the best tag sequence for ws[:i+1] ending in t, back-pointer)"""
    best = [{t: (math.log(p_trans("<s>", t) * p_emit(t, ws[0])), None) for t in tags}]
    for w in ws[1:]:
        col = {}
        for t in tags:
            prev = max(tags, key=lambda s: best[-1][s][0] + math.log(p_trans(s, t)))
            col[t] = (best[-1][prev][0] + math.log(p_trans(prev, t) * p_emit(t, w)), prev)
        best.append(col)
    last = max(tags, key=lambda t: best[-1][t][0] + math.log(p_trans(t, "</s>")))
    path = [last]
    for col in reversed(best[1:]):
        path.append(col[path[-1]][1])
    return list(reversed(path))

for s in ["they book the flight", "the book flies", "she reads a old book", "the dog bites"]:
    ws = s.split()
    print(" ".join(f"{w}/{t}" for w, t in zip(ws, viterbi(ws))))
print("P(VERB | PRON) =", round(p_trans("PRON", "VERB"), 3), " P(NOUN | DET) =", round(p_trans("DET", "NOUN"), 3))
```

```text
they/PRON book/VERB the/DET flight/NOUN
the/DET book/NOUN flies/VERB
she/PRON reads/VERB a/DET old/ADJ book/NOUN
the/DET dog/NOUN bites/VERB
P(VERB | PRON) = 0.838  P(NOUN | DET) = 0.778
```

*book* is tagged as a verb after a pronoun and as a noun after a determiner, *flies* as a verb after a noun; the unseen *bites* is tagged `VERB` because the transitions make a verb the likeliest tag after `DET NOUN`, while its smoothed emission probability is small under every tag. The transition model alone carries much of the information. The tag bigram model is itself a Markov chain:

::: widget markov
matrix: 0,0,0,3/5,1/10,3/10,0; 1/3,0,0,0,2/3,0,0; 0,1,0,0,0,0,0; 0,2/11,0,0,9/11,0,0; 5/12,0,1/12,0,0,0,1/2; 0,0,0,0,0,0,1; 4/9,0,0,5/9,0,0,0
states: start/end; ADJ; AUX; DET; NOUN; PRON; VERB
start: 0
steps: 25
caption: The maximum-likelihood tag transitions of the ten training sentences of the listing, as a Markov chain (the start and end symbols are merged into one state, so the walk produces one tag sequence after another). A walk generates "sentence shapes" such as DET ADJ NOUN VERB DET NOUN; an HMM emits a word from each tag along the way.
:::

HMM taggers trained on about a million words of annotated newspaper text reach roughly $96$–$97\%$ token accuracy on English; discriminative sequence models — maximum-entropy Markov models, **conditional random fields** (Lafferty, McCallum and Pereira, 2001) and later neural taggers — raised this to about $97$–$98\%$, close to the level at which annotators themselves disagree (Manning, 2011). Much of the remaining error is on unknown words, which an HMM handles poorly since it knows only the word identity; discriminative taggers add features such as suffixes and capitalisation.

## Named entities {#sec-ner}

**Named-entity recognition** (NER) finds mentions of names of people, organisations, locations and similar categories. Because a name can span several tokens, it is cast as sequence labelling with a special tag scheme.

::: definition BIO tagging {#def-bio}
In the **BIO** (inside–outside–beginning) scheme, each token receives `B-X` if it begins an entity of type $X$, `I-X` if it continues one, and `O` if it is outside every entity. A sequence of BIO tags determines a set of **entity spans** $(i, j, X)$. NER is evaluated at the level of spans: a predicted entity is correct only if its boundaries and type both match a gold entity exactly, and precision, recall and $F_1$ ([[text-and-language/text-classification#def-f1]]) are computed over entities.
:::

*Captain Ahab of the Pequod sailed from Nantucket* is tagged

| Captain | Ahab | of | the | Pequod | sailed | from | Nantucket |
|---|---|---|---|---|---|---|---|
| `B-PER` | `I-PER` | `O` | `O` | `B-MISC` | `O` | `O` | `B-LOC` |

with three entities: a person, a ship (a miscellaneous name in the CoNLL-2003 scheme of `PER`, `ORG`, `LOC` and `MISC`; Tjong Kim Sang and De Meulder, 2003) and a location. Whether *Captain* belongs to the name is an annotation-guideline decision, and differences in such decisions limit how comparable NER results are across datasets. Conditional random fields over BIO tags, and later neural sequence labellers with a CRF output layer (Lample et al., 2016), were the standard NER models before fine-tuned Transformers.

## Syntax: constituency and context-free grammars {#sec-syntax}

The sentence *the old man saw the boat* is not just a string. Its words group into **constituents** — *the old man* and *the boat* are noun phrases, *saw the boat* a verb phrase — that can be moved, replaced by a pronoun or coordinated as units. **Constituency grammar** describes this hierarchy by rewriting rules.

::: definition Context-free grammar and PCFG {#def-pcfg}
A **context-free grammar** consists of non-terminal symbols (S, NP, VP, …) with a start symbol S, terminal symbols (words) and rules $A\to\beta$ rewriting a non-terminal as a sequence of symbols. A **parse tree** of a sentence is a tree whose root is S, whose leaves are the sentence's words in order, and in which each internal node and its children form a rule. A grammar is in **Chomsky normal form** if every rule is $A\to B\,C$ or $A\to w$. A **probabilistic context-free grammar** (PCFG) attaches a probability $P(A\to\beta)$ to each rule, with $\sum_\beta P(A\to\beta) = 1$ for each $A$; the probability of a tree is the product of the probabilities of the rules it uses.
:::

::: example Estimating a PCFG from a treebank {#ex-pcfg-mle}
In a small treebank, the non-terminal VP is expanded $40$ times: $24$ times as $\text{VP}\to\text{V NP}$, $10$ times as $\text{VP}\to\text{VP PP}$ and $6$ times as $\text{VP}\to\text{V}$. Give the maximum-likelihood rule probabilities, and the probability of the subtree $[\text{VP}\ [\text{VP}\ \text{V NP}]\ \text{PP}]$ not counting the rules inside V, NP and PP.
::: solution
As for $n$-gram models, the maximum-likelihood estimate is the relative frequency of each expansion among the expansions of the same non-terminal: $P(\text{VP}\to\text{V NP}) = 24/40 = 0.6$, $P(\text{VP}\to\text{VP PP}) = 10/40 = 0.25$, $P(\text{VP}\to\text{V}) = 6/40 = 0.15$. The subtree uses $\text{VP}\to\text{VP PP}$ and then $\text{VP}\to\text{V NP}$: $0.25\cdot0.6 = 0.15$. (Strictly, $\text{VP}\to\text{V}$ is not in Chomsky normal form; CKY implementations convert such unary rules or handle them separately.)
:::
:::

The most common syntactic ambiguity is **attachment**. In *I saw the man with the telescope*, the phrase *with the telescope* can modify *saw* (I used the telescope) or *the man* (the man had it). Ambiguity grows explosively with sentence length.

::: proposition Counting bracketings {#prop-catalan}
The number of binary trees with $n$ leaves in a fixed left-to-right order is the Catalan number

$$
C_{n-1} = \frac{1}{n}\binom{2n - 2}{n - 1},
$$

which grows like $4^{n}/n^{3/2}$ up to a constant factor. A sentence of $n$ words therefore has $C_{n-1}$ possible unlabelled binary bracketings.
:::

::: proof
Let $b_n$ be the number of binary trees with $n$ ordered leaves, so $b_1 = 1$. The root of a tree with $n\ge2$ leaves splits them into a left subtree with the first $k$ leaves and a right subtree with the remaining $n - k$, for some $1\le k\le n - 1$, and the two subtrees are independent, so $b_n = \sum_{k=1}^{n-1}b_kb_{n-k}$. This is the recurrence of the Catalan numbers, $C_m = \sum_{i=0}^{m-1}C_iC_{m-1-i}$ with $C_0 = 1$, shifted by one: setting $b_n = C_{n-1}$ satisfies it, since $C_{n-1} = \sum_{i=0}^{n-2}C_iC_{n-2-i} = \sum_{k=1}^{n-1}b_kb_{n-k}$. The closed form and the asymptotic $C_m\sim4^m/(m^{3/2}\sqrt\pi)$ are standard (via the generating function $C(x) = (1 - \sqrt{1 - 4x})/(2x)$ and Stirling's formula).
:::

A seven-word sentence has $C_6 = 132$ bracketings, a twenty-word sentence $C_{19} = 1{,}767{,}263{,}190$. A grammar rules most of them out, but realistic grammars still leave hundreds or thousands of parses for long sentences, so a parser needs both an efficient search and a way to prefer one parse — which is what a PCFG's probabilities provide.

::: widget plot
f: log10(4^(x-1)/((x-1)^1.5*sqrt(pi)))
x: 2, 30
y: 0, 16
points: 3,0.301; 5,1.146; 7,2.121; 10,3.687; 15,6.427; 20,9.247; 30,15.001
labels: $\log_{10}$ of the asymptotic approximation $4^{n-1}/((n-1)^{3/2}\sqrt\pi)$
caption: The number of binary bracketings of an $n$-word sentence, $C_{n-1}$, on a logarithmic scale: exact values (points: $2, 14, 132, 4862, \dots$) and the asymptotic formula of [[#prop-catalan]] (curve), which overestimates slightly for small $n$. A thirty-word sentence — ordinary in newspaper text — has about $10^{15}$ bracketings.
:::

::: algorithm CKY parsing (Cocke, Kasami, Younger) {#alg-cky}
**Input:** a PCFG in Chomsky normal form and a sentence $w_1, \dots, w_n$.

1. For each $i$, set $\pi[i, i+1, A] = P(A\to w_{i+1})$ for every rule $A\to w_{i+1}$ (indices count positions between words, $0$ to $n$).
2. For span lengths $\ell = 2, \dots, n$, for each start $i$ with $j = i + \ell\le n$, for each split $k$ with $i < k < j$ and each rule $A\to B\,C$: set $\pi[i, j, A] = \max\big(\pi[i, j, A],\ P(A\to B\,C)\,\pi[i, k, B]\,\pi[k, j, C]\big)$, remembering the maximising $(k, B, C)$.
3. The most probable parse has probability $\pi[0, n, S]$ and is recovered from the remembered choices.

Replacing $\max$ by a sum gives the **inside algorithm**, which computes the total probability of the sentence under the grammar.
:::

CKY is the Viterbi algorithm for trees: the best parse of a span combines best parses of its two parts, so optimal substructure holds as in [[#prop-viterbi-hmm]]. It runs in $O(n^3\lvert R\rvert)$ time for $\lvert R\rvert$ binary rules — $O(n^2)$ spans, each with $O(n)$ split points — despite the exponential number of trees. The listing below fills the same chart but keeps every parse in each cell, to display the ambiguity; a real parser keeps only the best one per non-terminal.

```python
import collections

# a probabilistic context-free grammar in Chomsky normal form
binary = {("S", "NP", "VP"): 1.0, ("VP", "V", "NP"): 0.6, ("VP", "VP", "PP"): 0.4,
          ("NP", "NP", "PP"): 0.2, ("NP", "Det", "N"): 0.5, ("PP", "P", "NP"): 1.0}
lexical = {("NP", "I"): 0.3, ("V", "saw"): 1.0, ("Det", "the"): 1.0,
           ("N", "man"): 0.6, ("N", "telescope"): 0.4, ("P", "with"): 1.0}

def cky(words):
    """chart[i, j][A] = list of (probability, tree) for every parse of words[i:j] rooted in A"""
    n = len(words)
    chart = collections.defaultdict(lambda: collections.defaultdict(list))
    for i, w in enumerate(words):
        for (A, word), p in lexical.items():
            if word == w:
                chart[i, i + 1][A].append((p, (A, w)))
    for span in range(2, n + 1):
        for i in range(n - span + 1):
            j = i + span
            for k in range(i + 1, j):                    # split point
                for (A, B, C), p in binary.items():
                    for pb, tb in chart[i, k][B]:
                        for pc, tc in chart[k, j][C]:
                            chart[i, j][A].append((p * pb * pc, (A, tb, tc)))
    return chart[0, n]["S"]

def show(t):
    return t[1] if isinstance(t[1], str) and len(t) == 2 else "[" + t[0] + " " + " ".join(show(c) for c in t[1:]) + "]"

parses = cky("I saw the man with the telescope".split())
total = sum(p for p, _ in parses)
for p, t in sorted(parses, reverse=True):
    print(f"P = {p:.6f} ({p / total:.3f} of total)  {show(t)}")
```

```text
P = 0.004320 (0.667 of total)  [S I [VP [VP saw [NP the man]] [PP with [NP the telescope]]]]
P = 0.002160 (0.333 of total)  [S I [VP saw [NP [NP the man] [PP with [NP the telescope]]]]]
```

(Pre-terminal labels are omitted in the printed trees.) The grammar gives probability $0.4$ to $\text{VP}\to\text{VP PP}$ and $0.2$ to $\text{NP}\to\text{NP PP}$, so attaching the prepositional phrase to the verb is twice as probable — whatever the words are. This is the main weakness of plain PCFGs: rule probabilities ignore the words, while the right attachment depends on them (*with the telescope* versus *with the hat*). **Lexicalised** grammars (Collins, 1997; Charniak, 1997), which condition rules on head words, and later neural parsers, which score spans from contextual representations, address it. On the Penn Treebank (Marcus, Santorini and Marcinkiewicz, 1993), about a million words of *Wall Street Journal* text annotated with trees, constituency parsers went from about $88$–$90\%$ bracket $F_1$ with lexicalised PCFGs in the late 1990s to above $95\%$ with neural models.

## Syntax: dependencies {#sec-dependencies}

An alternative description of syntax links words directly. In *the old man saw the boat*, *man* is the subject of *saw*, *boat* its object, *the* and *old* depend on *man*.

::: definition Dependency tree {#def-dependency}
A **dependency tree** of a sentence $w_1, \dots, w_n$ is a directed tree on the nodes $\{0, 1, \dots, n\}$, rooted at an artificial node $0$ (ROOT), in which every word has exactly one incoming arc from its **head**, labelled with a grammatical relation (`nsubj`, `obj`, `det`, `amod`, …). It is **projective** if, drawn above the sentence, no two arcs cross.
:::

For *the old man saw the boat*: ROOT → *saw* (`root`), *saw* → *man* (`nsubj`), *saw* → *boat* (`obj`), *man* → *the* (`det`), *man* → *old* (`amod`), *boat* → *the* (`det`). Every word has one head, so the tree has exactly $n$ arcs (exercise 10).

::: example A non-projective tree {#ex-nonprojective}
In *A hearing is scheduled on the issue today*, the phrase *on the issue* modifies *hearing*, *today* modifies *scheduled*, and *scheduled* is the root. Number the words $1$–$8$ and decide whether the tree is projective.
::: solution
The arcs are ROOT($0$) → *scheduled* ($4$); *scheduled* → *hearing* ($2$, `nsubj`), → *is* ($3$, `aux`), → *today* ($8$, `obl`); *hearing* → *A* ($1$, `det`), → *issue* ($7$, `nmod`); *issue* → *on* ($5$, `case`), → *the* ($6$, `det`). The arc from *hearing* ($2$) to *issue* ($7$) spans positions $2$–$7$, and the arc from ROOT ($0$) to *scheduled* ($4$) spans $0$–$4$; since $0 < 2 < 4 < 7$, the two arcs cross. The tree is non-projective: a modifier has been separated from its head by the verb. Such trees are rare in English but common in languages with freer word order, and transition-based parsers that build only projective trees cannot produce them without extensions.
:::
:::

Dependency trees describe languages with free word order more naturally than constituency trees, and the **Universal Dependencies** project (de Marneffe, Nivre and colleagues) annotates treebanks with one cross-linguistically consistent scheme of tags and relations; its releases cover well over $100$ languages (as of 2026). Dependency parsers are either **transition-based**, building the tree with a sequence of shift and attach actions predicted by a classifier, as in Nivre's arc-standard system, or **graph-based**, scoring all possible arcs and finding the best tree with a maximum spanning tree algorithm (McDonald et al., 2005); neural versions of both (Chen and Manning, 2014; Dozat and Manning, 2017) reach labelled attachment scores in the low-to-mid $90$s on English.

::: quiz
Which of the following are correct about the HMM tagger and the CKY parser?
- [x] Both find an exact optimum over exponentially many structures by dynamic programming
- [x] Both rely on the score of a structure being a product of local factors
- [ ] CKY's running time is linear in the sentence length
- [ ] An HMM tagger can use the next word when choosing the current tag only if it uses a trigram tag model
::: solution
Viterbi and CKY both exploit optimal substructure, which holds because the probability factorises into transitions and emissions (HMM) or rule probabilities (PCFG). CKY is cubic in $n$. And Viterbi decoding already uses the whole sentence — the best tag at position $i$ depends on later words through the later $\delta$ values and the back-pointers — regardless of the order of the tag model.
:::
:::

## Semantics {#sec-semantics}

**Lexical semantics** studies word meanings and the relations between them. Most frequent words have several senses: WordNet (Miller, 1995), a lexical database of English that groups words into sets of synonyms (*synsets*) linked by relations such as hypernymy (*whale* is a kind of *cetacean*, which is a kind of *mammal*) and meronymy (*fin* is part of *fish*), lists dozens of senses for the verb *run*. **Word-sense disambiguation** chooses the sense of each occurrence in context — the task that static embeddings ([[text-and-language/word-embeddings]]) cannot do with one vector per word, and that contextual embeddings do implicitly.

**Compositional semantics** builds the meaning of a sentence from the meanings of its parts and the way they are combined — Frege's principle. Formal semantics represents meanings in logic: *every whale breathes* as $\forall x\,(\textit{whale}(x)\to\textit{breathes}(x))$, which makes inference precise but requires a correct parse and a complete lexicon. A shallower and more robust representation is **semantic role labelling**, which identifies who did what to whom: in *Ahab hunted the whale with a harpoon*, *Ahab* is the agent (`ARG0` in PropBank; Palmer, Gildea and Kingsbury, 2005), *the whale* the patient (`ARG1`), *with a harpoon* the instrument. Semantic roles stay the same under syntactic alternations — *the whale was hunted by Ahab* has the same roles in a different syntax — which is why they were used for question answering and information extraction.

**Pragmatics** concerns meaning beyond the literal: implicature (*some of the crew survived* suggests that not all did), presupposition, speech acts and reference. Language models face it constantly in dialogue, and it is a recurring source of difficulty in evaluating whether a model "understood" an instruction.

::: warning Structure is not optional just because it is implicit
It is tempting to conclude that since large language models are trained without trees or tags, linguistic structure is irrelevant to them. It is not: the regularities that grammars describe are present in the text, and a model that predicts text well must capture them in some form. What changed is that the structure no longer has to be specified by hand, and is not forced into a single representation. Conversely, explicit annotations are far from obsolete — treebanks and tagged corpora are how one tests whether a model has learned particular structures, and for many low-resource languages they remain the best available supervision.
:::

## Structure inside neural language models {#sec-probing}

If language models capture syntax, where is it? **Probing** trains a small classifier to predict a linguistic property — a part-of-speech tag, a dependency relation, the depth of a word in the parse tree — from a model's internal representations, and takes high accuracy as evidence that the property is linearly decodable. Tenney, Das and Pavlick (2019) found that in BERT, information relevant to part-of-speech tagging is most decodable in lower layers, parsing in middle layers and semantic roles and coreference in higher ones, roughly in the order of the classical pipeline. Hewitt and Manning (2019) found a linear transformation of contextual embeddings under which squared distances between words approximate their distances in the dependency tree — a "structural probe". Hewitt and Liang (2019) cautioned that a powerful enough probe can learn a task itself, and proposed comparing with control tasks; and decodability does not show that the model *uses* the information, which causal methods test ([[interpretability/probing-attribution]], [[interpretability/causal-interventions]]). Targeted evaluations of grammatical knowledge, such as subject–verb agreement across intervening clauses (Linzen, Dupoux and Goldberg, 2016) and minimal-pair benchmarks like BLiMP (Warstadt et al., 2020), test the same question behaviourally.

::: application The classical pipeline today
The individual tasks of this chapter are still used, as of 2026, in settings where explicit structure is needed and cheap: tokenisation, tagging and dependency parsing libraries for information extraction and corpus linguistics, named-entity recognition for indexing and anonymisation, lemmatisation for search in morphologically rich languages, and treebanks for linguistic research and for evaluating models. Large language models can also be prompted to produce tags and parses directly, with accuracy that depends on the language and the annotation scheme, and are often used to produce silver-standard annotations that are then checked by people.
:::

::: history
Pāṇini's grammar of Sanskrit (around the 4th century BCE) is a precise generative description of morphology and syntax. Structural linguists of the 20th century, among them Leonard Bloomfield and Zellig Harris, developed methods of segmentation and distributional analysis; Noam Chomsky's *Syntactic Structures* (1957) introduced generative grammar and the hierarchy of formal grammars, and Lucien Tesnière's *Éléments de syntaxe structurale* (1959) dependency grammar. The CKY algorithm was found independently by Cocke, Kasami (1965) and Younger (1967); Viterbi (1967) published his algorithm for decoding convolutional codes, and Baum and colleagues developed the estimation of hidden Markov models in the late 1960s. Church (1988) and DeRose (1988) built influential statistical part-of-speech taggers. The Penn Treebank (Marcus et al., 1993) made statistical parsing possible; Collins (1997) and Charniak (1997) built lexicalised PCFG parsers, Lafferty et al. (2001) introduced conditional random fields, and the CoNLL shared tasks (from 1999) standardised chunking, NER (2003) and dependency parsing (2006–07). Universal Dependencies began in 2014. Neural taggers and parsers (Collobert et al., 2011; Chen and Manning, 2014) and then pretrained Transformers absorbed the pipeline.
:::

::: summary
- Linguistic structure has levels — phonology, morphology, syntax, semantics, pragmatics — each ambiguous, each once handled by a separate model.
- Morphemes are minimal meaningful units; inflection, derivation and compounding build words; languages range from isolating to agglutinative and fusional. Subword tokenisers find morpheme-like pieces only when frequency favours them.
- Part-of-speech tagging with an HMM combines tag transitions and word emissions; Viterbi decoding finds the best of $K^T$ tag sequences in $O(TK^2)$ time. NER is sequence labelling with BIO tags, evaluated by entity-level $F_1$.
- A sentence of $n$ words has $C_{n-1}$ binary bracketings; a PCFG scores trees as products of rule probabilities, and CKY finds the best parse in $O(n^3\lvert R\rvert)$ time. Plain PCFGs ignore words when choosing attachments; lexicalised and neural parsers do not.
- Dependency trees link each word to its head with a labelled relation; Universal Dependencies provides consistent treebanks for well over $100$ languages.
- Semantics ranges from word senses (WordNet, disambiguation) to compositional meaning and semantic roles. Probing studies find much of this structure decodable from neural language models' representations, with the caveat that decodable is not the same as used.
:::

## Exercises

::: exercise Counting bracketings {level=1 check="14"}
How many binary bracketings does a five-word sentence have? List them for three words.
::: solution
$C_4 = \frac15\binom84 = 14$. For three words $a\,b\,c$ there are $C_2 = 2$: $((a\,b)\,c)$ and $(a\,(b\,c))$.
:::
:::

::: exercise BIO tags {level=1 check="3"}
Write the BIO tags for *Elizabeth Bennet met Mr Darcy at Netherfield Park* with types `PER` and `LOC`, treating *Mr* as part of the name. How many entities are there?
::: solution
*Elizabeth* `B-PER`, *Bennet* `I-PER`, *met* `O`, *Mr* `B-PER`, *Darcy* `I-PER`, *at* `O`, *Netherfield* `B-LOC`, *Park* `I-LOC`: three entities, two people and one location.
:::
:::

::: exercise A Viterbi value {level=1 check="0.0021"}
In [[#ex-viterbi-hmm]], verify $\delta_2(V)$, and compute the probability of the tagging *time*/V *flies*/V.
::: solution
$\delta_2(V) = \max(0.07\cdot0.6, 0.003\cdot0.3)\cdot0.05 = 0.042\cdot0.05 = 0.0021$. The tagging V V has probability $0.3\cdot0.01\cdot0.3\cdot0.05 = 0.000045$, far smaller.
:::
:::

::: exercise The size of the search space {level=2 check="17^10"}
How many tag sequences does a $10$-word sentence have with the $17$ UPOS tags? How many elementary steps (products of a $\delta$ value and a transition probability) does Viterbi decoding need?
::: solution
$17^{10} = 2.0\times10^{12}$ sequences. Viterbi computes $10\times17$ values $\delta_i(t)$, each a maximum over $17$ predecessors: about $10\cdot17^2 = 2{,}890$ products (slightly fewer, since the first position has no predecessor).
:::
:::

::: exercise A parse probability {level=2 check="0.3*0.4*0.6*0.5*0.6*0.5*0.4"}
Compute by hand the probability of the verb-attachment parse of *I saw the man with the telescope* under the grammar of the CKY listing, and check it against the printed value.
::: solution
The tree uses $\text{S}\to\text{NP VP}$ ($1$), $\text{NP}\to I$ ($0.3$), $\text{VP}\to\text{VP PP}$ ($0.4$), $\text{VP}\to\text{V NP}$ ($0.6$), $\text{V}\to\textit{saw}$ ($1$), $\text{NP}\to\text{Det N}$ twice ($0.5\cdot0.5$), $\text{Det}\to\textit{the}$ twice ($1$), $\text{N}\to\textit{man}$ ($0.6$), $\text{N}\to\textit{telescope}$ ($0.4$), $\text{PP}\to\text{P NP}$ and $\text{P}\to\textit{with}$ ($1$). The product is $0.3\cdot0.4\cdot0.6\cdot0.5\cdot0.6\cdot0.5\cdot0.4 = 0.00432$, as printed. The noun-attachment parse replaces $0.4$ (VP → VP PP) by $0.2$ (NP → NP PP) and has $0.00216$.
:::
:::

::: exercise Morphological analysis {level=2}
Segment the Finnish word *taloissammekin*, "also in our houses" (*talo* "house"), given that *-i-* marks plural, *-ssa* the inessive case ("in"), *-mme* "our" and *-kin* "also". Classify the morphemes as inflectional or other, and explain what such words imply for a word-level vocabulary and for a BPE tokeniser trained mostly on English.
::: solution
*talo-i-ssa-mme-kin*: the stem *talo*, plural *-i-*, inessive *-ssa*, first person plural possessive *-mme*, and the clitic *-kin* ("also"). Plural, case and possessive are inflectional; *-kin* is a clitic particle. Since each noun combines with many case, number, possessive and clitic endings, a single noun has hundreds of forms, most rare, so a word-level vocabulary is hopeless. A BPE tokeniser trained mostly on English has learned few Finnish merges and will cut such words into short, arbitrary pieces, producing long sequences — the premium of [[text-and-language/tokenisation#def-parity]]; one trained on enough Finnish tends to learn frequent endings such as *-ssa* as tokens.
:::
:::

::: exercise Entity-level $F_1$ {level=2 check="2/3"}
A gold annotation has $4$ entities. A system predicts $5$, of which $3$ match gold entities exactly in span and type; one more has the right type but includes an extra word. Compute entity-level precision, recall and $F_1$.
::: solution
Only exact matches count: $\mathrm{TP} = 3$, precision $3/5 = 0.6$, recall $3/4 = 0.75$, $F_1 = 2\cdot0.6\cdot0.75/1.35 = 2/3 = 0.667$. The near miss counts as both a false positive and a false negative, which is why entity-level scores are stricter than token-level accuracy.
:::
:::

::: exercise The forward algorithm for an HMM {level=3}
Modify [[#alg-viterbi]] to compute $P(w_{1:T}) = \sum_{t_{1:T}}P(w_{1:T}, t_{1:T})$, and use it with the tagger of the listing to find what fraction of the probability of *they book the flight* is carried by the best tagging.
::: solution
Replace the maximum by a sum: $\alpha_1(t) = P(t\mid\texttt{<s>})P(w_1\mid t)$, $\alpha_i(t) = \sum_s\alpha_{i-1}(s)P(t\mid s)\cdot P(w_i\mid t)$, and $P(w_{1:T}) = \sum_t\alpha_T(t)P(\texttt{</s>}\mid t)$; the proof of [[#prop-viterbi-hmm]] applies with sums, by distributivity. Appended to the listing:

```python
def forward(ws):
    """alpha[t] = P(ws[:i+1], tag_i = t), summed over all earlier tag sequences"""
    alpha = {t: p_trans("<s>", t) * p_emit(t, ws[0]) for t in tags}
    for w in ws[1:]:
        alpha = {t: sum(alpha[s] * p_trans(s, t) for s in tags) * p_emit(t, w) for t in tags}
    return sum(alpha[t] * p_trans(t, "</s>") for t in tags)

ws = "they book the flight".split()
total = forward(ws)
path = viterbi(ws)
p_best = p_trans("<s>", path[0]) * p_emit(path[0], ws[0])
for (a, b), w in zip(zip(path, path[1:]), ws[1:]):
    p_best *= p_trans(a, b) * p_emit(b, w)
p_best *= p_trans(path[-1], "</s>")
print(f"P(sentence) = {total:.4e};  P(best tagging) = {p_best:.4e};  share {p_best / total:.3f}")
```

```text
P(sentence) = 3.6603e-05;  P(best tagging) = 3.4507e-05;  share 0.943
```

The best tagging carries $94\%$ of the probability: in this small model the sentence is barely ambiguous once *they* has fixed the tag of *book*. In EM training of HMMs from untagged text (the Baum–Welch algorithm), the forward and backward probabilities give the expected counts of each transition and emission.
:::
:::

::: exercise Catalan numbers {level=3 check="132"}
Use the recurrence $b_n = \sum_{k=1}^{n-1}b_kb_{n-k}$ of [[#prop-catalan]] to compute $b_1, \dots, b_7$, and confirm that $b_7 = C_6$ by the closed formula.
::: solution
$b_1 = 1$, $b_2 = 1$, $b_3 = 2$, $b_4 = 1\cdot2 + 1\cdot1 + 2\cdot1 = 5$, $b_5 = 5 + 2 + 2 + 5 = 14$, $b_6 = 14 + 5 + 4 + 5 + 14 = 42$, $b_7 = 42 + 14 + 10 + 10 + 14 + 42 = 132$. The closed form gives $C_6 = \frac17\binom{12}{6} = \frac{924}{7} = 132$. So the seven-word sentence of the CKY listing has $132$ binary bracketings, of which the grammar allows exactly the $2$ printed.
:::
:::

::: exercise Arcs of a dependency tree {level=3}
Show that a dependency tree of an $n$-word sentence has exactly $n$ arcs, and that the number of possible unlabelled dependency trees (not necessarily projective) is $(n + 1)^{n-1}$. How many are there for $n = 3$?
::: solution
Every word has exactly one incoming arc and ROOT has none, so there are $n$ arcs — as for any tree on $n + 1$ nodes. Unlabelled dependency trees are the spanning trees of the complete graph on $\{0, \dots, n\}$, rooted at $0$, with all arcs directed away from the root; each undirected spanning tree gives exactly one such orientation. By Cayley's formula, the complete graph on $m$ labelled nodes has $m^{m-2}$ spanning trees; with $m = n + 1$ this is $(n + 1)^{n-1}$. For $n = 3$, $4^2 = 16$ trees. (Graph-based parsers search this space with maximum spanning arborescence algorithms such as Chu–Liu–Edmonds.)
:::
:::
