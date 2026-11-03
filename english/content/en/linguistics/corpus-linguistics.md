Which is more common in English: *big* or *large*? Most speakers would guess *big*, and they would be right in conversation. But in academic writing the order reverses: *large* is the usual word (*a large sample*, *a large proportion*), and *big* is rare. Nobody can see this by introspection, because nobody has a reliable sense of frequency across registers. It became visible only when linguists began to count words in large collections of texts — and it is the kind of fact that changed both dictionaries and grammars once it could be seen.

The study of language through such collections is **corpus linguistics**. [[collocation-and-register/using-a-corpus]] taught the practical skills: what a corpus is, how to read a concordance, raw and normalised frequency, the collocation scores MI, t-score and logDice, and how to check a phrase. [[core-vocabulary/frequency-and-coverage]] introduced tokens, types, Zipf's law and text coverage. This chapter treats corpus linguistics as a method of research. It asks how a corpus is designed so that its results mean something, what annotation adds, how frequency is distributed and how that distribution is plotted, how collocation and keyness statistics are computed, and how the same counts become a simple model of language that predicts the next word — the idea behind modern language models.

## Designing a corpus

::: definition Representativeness and balance {#def-representative}
A corpus is **representative** of a language or variety to the extent that findings from it can be generalised to that variety. Representativeness depends on two choices: the **population** the corpus is meant to represent (British English of the 1990s, American academic prose, the writing of Chinese university students) and the **sampling** of texts from it. A corpus is **balanced** when the kinds of text in it — registers, genres, modes — are included in proportions justified by its purpose. Douglas Biber's article "Representativeness in corpus design" (1993) set out these principles.
:::

No corpus can represent "English" as a whole, because there is no list of all the English ever produced from which to sample, and because nobody can agree on how much weight conversation should have against print. Corpus builders therefore make decisions and document them. The Brown Corpus (completed in 1964) took 500 samples of about 2,000 words each from American texts printed in 1961, in fifteen categories in fixed proportions. The British National Corpus (completed in 1994) contains about 100 million words, about 90 per cent written and 10 per cent spoken. Those proportions are a design decision: speech is far more than a tenth of all English used, but it is very expensive to record and transcribe. A finding such as "*large* is more frequent than *big* in the BNC" is therefore a finding about a mixture in which writing dominates.

::: theorem Kinds of corpus {#rule-corpus-types}
1. A **general reference corpus** samples many registers of a variety in planned proportions: Brown, LOB (its British counterpart, also of 1961 texts), the BNC.
2. A **monitor corpus** grows continuously, adding new texts every year, to track current usage: the Bank of English (used for the COBUILD dictionaries) and the Corpus of Contemporary American English are examples.
3. A **specialised corpus** covers one register or genre: academic articles, legal texts, a single newspaper, children's books.
4. A **diachronic** (historical) corpus samples texts across periods, such as the Helsinki Corpus of English texts from Old English to Early Modern English.
5. A **learner corpus** contains the language of learners, such as the International Corpus of Learner English (ICLE), led by Sylviane Granger, or the Chinese Learner English Corpus (CLEC, 桂诗春 and 杨惠中, 2003).
6. A **parallel corpus** contains texts with their translations, aligned sentence by sentence, used in translation studies and machine translation; a **comparable corpus** contains texts of the same kind written independently in two languages.
:::

::: proof
The types follow from the questions a corpus is built to answer. A dictionary needs a general corpus large enough to show rare senses; a study of change needs texts that are comparable across periods — which is why the "Brown family" of corpora (Brown and LOB from 1961, Frown and FLOB from 1991–2, and later sets) copied Brown's design exactly, so that differences could be attributed to time and variety rather than to sampling. A learner corpus is designed to be compared with a native corpus of the same kind of writing, a method Granger called **contrastive interlanguage analysis**. Specialised corpora can be small: a few hundred thousand words of one genre may show its patterns more clearly than a hundred million words of everything. Size and design must match the question; the rule of thumb is that rare phenomena need large corpora, while common grammatical patterns can be studied in small ones.
:::

::: example Is the finding representative? {#ex-representative}
A student collects 2 million words from an online forum where people discuss video games, and finds that *awesome* is ten times more frequent than *excellent*. She concludes: "In English, *awesome* has replaced *excellent*." Evaluate the conclusion.
::: solution
1. **Population.** The corpus represents one register (informal online discussion), one topic (video games) and probably a narrow group of writers (often young, often American). It does not represent English in general.
2. **Comparison.** To support a claim about change, she would need texts of the same kind from earlier periods; to support a claim about English generally, a balanced corpus or several corpora of different registers. In a general corpus or in academic prose, the result could well be reversed.
3. **Dispersion.** Ten times more frequent could mean that a few very active users say *awesome* constantly. She should report how many different writers use each word.
4. **Meaning.** The two words may not be used for the same things: *awesome* in such forums often works as a reaction (*Awesome!*), *excellent* as an evaluation of something specific.
5. **A defensible conclusion.** "In this forum, *awesome* is used about ten times as often as *excellent*, by many (or few) of its users." The finding is real; the generalisation is not supported by the design.
:::
:::

## Annotation

A raw corpus is a sequence of characters. Before it can answer most linguistic questions, it has to be divided into words and, usually, enriched with linguistic information.

::: definition Tokenisation, lemmatisation and tagging {#def-annotation}
**Tokenisation** divides a text into units (tokens) — usually words and punctuation marks. **Lemmatisation** assigns each token its **lemma**, the dictionary form: *went*, *goes* and *going* → GO. **Part-of-speech (POS) tagging** assigns each token a word-class label from a **tagset**: *the/AT0 dog/NN1 barked/VVD* in the CLAWS tagset used for the BNC, or *the/DT dog/NN barked/VBD* in the Penn Treebank tagset. **Parsing** adds syntactic structure: constituent trees ([[linguistics/phrases-constituents]]) or dependency relations; a parsed corpus is a **treebank**, such as the Penn Treebank (Marcus et al. 1993).
:::

Tagging is done automatically, by programs trained on hand-tagged texts, and it is not perfect: the commonest errors involve words that belong to several classes, such as *that* (determiner, pronoun, conjunction), *round* or *-ing* forms ([[linguistics/morphology#ex-borderline]]). Annotation also makes theoretical commitments. A tagset that has one category for *-ing* forms and one that separates gerunds from participles will give different counts for "verbs", and a researcher who reports frequencies by word class should say which tagset was used.

::: note English and Chinese
For Chinese, tokenisation itself is a research problem, because written Chinese does not mark word boundaries with spaces. **Word segmentation** (分词) must decide whether 中华人民共和国 is one token or several, and whether 吃饭 is one word or a verb and its object ([[linguistics/morphology]] discussed 离合词). Different segmentation standards — such as those used by Peking University and by the Penn Chinese Treebank — give different answers, so word counts for Chinese corpora depend on the segmenter used, and type–token figures from Chinese and English corpora cannot be compared naively. Many Chinese corpus studies count characters as well as words for this reason. Among Chinese corpora, the CCL corpus of Peking University and the BCC corpus of Beijing Language and Culture University are large and searchable online; the Lancaster Corpus of Mandarin Chinese (McEnery and Xiao) was designed to match FLOB, so that the two languages can be compared with the same sampling.
:::

## The distribution of frequency

[[core-vocabulary/frequency-and-coverage#rule-zipf]] stated Zipf's law in its simplest form: the frequency of a word is roughly inversely proportional to its rank. In the Brown Corpus, *the* has 69,971 tokens, *of* 36,411 and *and* 28,852 (Kučera and Francis 1967). Stated with an exponent, the law reads

$$
f(r) \approx \frac{C}{r^{s}},
$$

where $f(r)$ is the frequency of the word at rank $r$, $C$ is a constant (roughly the frequency of the top word) and $s$ is an exponent close to 1. On ordinary axes this curve falls so steeply that most of it is squashed against the axes. Taking logarithms turns it into a straight line:

$$
\log f(r) \approx \log C - s \log r .
$$

So on a plot of $\log f$ against $\log r$, a Zipfian distribution is a straight line with slope $-s$. Corpus linguists check for Zipf's law by drawing exactly this plot.

::: widget plot
title: Zipf's law on logarithmic scales
f: c - s*x
x: 0, 4
y: 0, 5.5
sliders: s=1:0.6:1.4:0.05; c=4.85:4:5.5:0.05
points: 0,4.845; 0.301,4.561; 0.477,4.460
labels: model, log frequency = c − s × log rank
caption: The horizontal axis is $\log_{10}$ of the rank (0 = rank 1, 1 = rank 10, 2 = rank 100, 3 = rank 1,000, 4 = rank 10,000); the vertical axis is $\log_{10}$ of the frequency. A Zipfian distribution is a straight line, and the slider *s* sets its slope. The three dots are *the*, *of* and *and* in the Brown Corpus (69,971, 36,411 and 28,852 tokens: logarithms 4.85, 4.56 and 4.46). With *s* = 1 the line passes close to them but not through them — *and* is more frequent than the exact law predicts. In real corpora the line usually bends at the top ranks and at the bottom, where many words share the lowest frequencies, which is why the exponent is estimated from the middle of the range.
:::

::: theorem Properties of word-frequency distributions {#rule-frequency}
1. **A few types make up most tokens.** The hundred most frequent words of English, almost all function words, account for roughly half of the tokens of a typical general corpus.
2. **Most types are rare.** In any corpus, a large share of the types — often around half — occur only once (**hapax legomena**, [[linguistics/morphology#def-productivity]]).
3. **New types keep appearing.** As a corpus grows, the number of types keeps rising, though more and more slowly; there is no point at which the vocabulary is complete. (The empirical relation between corpus size and vocabulary size is often called **Heaps' law**.)
4. **Frequency is not the same as dispersion.** A word can be frequent because it appears in many texts or because it appears very often in a few. Measures of **dispersion**, such as Juilland's D or Stefan Gries's DP (2008), separate the two: *however* is spread across almost all academic texts, while a technical term may be frequent only in one.
:::

::: proof
These properties are found in every large corpus of every language studied, though the exact figures depend on the corpus, the tokenisation and whether word-forms or lemmas are counted. Property 1 explains the figures for *the*, *of* and *and*; properties 2 and 3 explain why even a hundred-million-word corpus contains words that appear only once, and why corpus size matters for rare phenomena. Why the distribution has this shape is debated. Zipf himself (1949) proposed a "principle of least effort" balancing the speaker's preference for few words against the hearer's need for many; others have shown that even random processes produce roughly Zipfian distributions, so that the law alone tells us less about language than it seems. The practical consequence is not in doubt: frequency lists are a strong guide to which words a learner needs first ([[core-vocabulary/frequency-and-coverage#rule-learn-frequent-first]]), and dispersion matters as much as raw frequency when such lists are built.
:::

::: quiz
On a plot of log frequency against log rank, a corpus follows Zipf's law exactly with exponent 1. What is the slope of the line?
- [ ] 1
- [x] −1
- [ ] 0
- [ ] it is not a straight line
::: solution
If $f(r) = C/r$, then $\log f = \log C - \log r$, a straight line with slope −1. With exponent $s$ the slope is $-s$. On ordinary (not logarithmic) axes, the same distribution is a steep curve, not a straight line.
:::
:::

## Collocation statistics

A collocation is a word combination that occurs more often than chance ([[collocation-and-register/what-is-collocation#def-collocation]]). Corpus linguistics turns "more often than chance" into numbers by comparing the observed frequency O of a pair with its expected frequency E under random scattering. The formulas are given in [[collocation-and-register/using-a-corpus#def-scores]]; here we compute them for one example, to see why they rank collocates so differently.

::: example Computing association scores {#ex-collocation}
In an imaginary corpus of 10,000,000 tokens, the node *rain* occurs 2,000 times. Within a span of four words on each side (eight positions), *heavy* (5,000 tokens in the corpus) occurs 120 times and *torrential* (60 tokens in the corpus) occurs 40 times. The figures are invented for the exercise. Compute E, MI, t-score and logDice for both, and explain the difference.
::: solution
1. **Expected frequency.** $E = \dfrac{f(\text{node}) \times f(\text{collocate})}{N} \times 8$.
   - *heavy*: $E = \dfrac{2000 \times 5000}{10\,000\,000} \times 8 = 8$.
   - *torrential*: $E = \dfrac{2000 \times 60}{10\,000\,000} \times 8 = 0.096$.
2. **MI** $= \log_2(O/E)$.
   - *heavy*: $\log_2(120/8) = \log_2 15 \approx 3.9$.
   - *torrential*: $\log_2(40/0.096) \approx \log_2 417 \approx 8.7$.
3. **t-score** $\approx (O - E)/\sqrt{O}$.
   - *heavy*: $(120 - 8)/\sqrt{120} \approx 112/10.95 \approx 10.2$.
   - *torrential*: $(40 - 0.096)/\sqrt{40} \approx 39.9/6.32 \approx 6.3$.
4. **logDice** $= 14 + \log_2 \dfrac{2O}{f(\text{node}) + f(\text{collocate})}$.
   - *heavy*: $14 + \log_2(240/7000) \approx 14 - 4.87 \approx 9.1$.
   - *torrential*: $14 + \log_2(80/2060) \approx 14 - 4.69 \approx 9.3$.
5. **Interpretation.** MI ranks *torrential* far above *heavy*, because two-thirds of all occurrences of *torrential* are near *rain*: the pair is exclusive. The t-score ranks *heavy* higher, because the pair is frequent and the evidence for it is large. logDice puts them close together. For a learner, *heavy rain* is the collocation to learn first and *torrential rain* the vivid, specialised one — which is the general lesson of [[collocation-and-register/using-a-corpus#rule-scores]].
:::
:::

::: quiz
A collocate list sorted by **MI** puts *torrential* near the top for *rain*; one sorted by **t-score** puts *heavy* and even *the* near the top. Why?
- [ ] MI counts only adjectives.
- [x] MI rewards exclusiveness and can be high for rare pairs; t-score rewards the amount of evidence and favours frequent pairs.
- [ ] t-score is calculated on a smaller corpus.
- [ ] The two lists must be wrong, since collocations have one ranking.
::: solution
MI compares observed with expected frequency as a ratio, so a pair that is rare but almost always occurs together gets a very high score. The t-score grows with the number of co-occurrences, so frequent pairs — including frequent grammatical words — score high. Neither ranking is "correct"; they answer different questions.
:::
:::

::: definition Keyness {#def-keyness}
A **keyword** of a corpus or text is a word that is significantly more frequent in it than in a **reference corpus**. Keyness is measured by comparing the two frequencies with a statistical test, most often the **log-likelihood** statistic, introduced for corpus comparison by Ted Dunning (1993) and popularised by Paul Rayson's tools:

$$
G^2 = 2 \sum O \ln \frac{O}{E},
$$

summed over the two corpora, where O is the observed frequency of the word in each corpus and E its expected frequency if it were equally common (per word) in both. With one degree of freedom, $G^2$ above 3.84 corresponds to p < 0.05 and above 15.13 to p < 0.0001.
:::

::: example A keyword {#ex-keyness}
In a corpus of 1,000,000 words of academic prose, *data* occurs 300 times; in a reference corpus of 1,000,000 words of fiction, it occurs 50 times. (Invented figures.) Is *data* a keyword of academic prose?
::: solution
1. **Expected frequencies.** The two corpora are the same size, so if *data* were equally common in both, each would have half of the 350 tokens: $E_1 = E_2 = 175$.
2. **Log-likelihood.** $G^2 = 2\,[\,300 \ln(300/175) + 50 \ln(50/175)\,] \approx 2\,[\,300 \times 0.539 + 50 \times (-1.253)\,] \approx 2\,[\,161.7 - 62.6\,] \approx 198$.
3. **Decision.** 198 is far above 15.13, so the difference is very unlikely to be due to chance: *data* is a strong positive keyword of the academic corpus.
4. **Caution.** Significance is not size. With very large corpora, tiny differences become "significant"; researchers therefore also report an **effect size**, such as the ratio of normalised frequencies (here 300 : 50, six times as frequent) or the log ratio ($\log_2 6 \approx 2.6$).
:::
:::

## From counts to a model: n-grams

Counting which words follow which gives more than a list of collocations: it gives a model that can **predict** the next word, and so generate text. The idea goes back to Claude Shannon's "A mathematical theory of communication" (1948), in which he produced "approximations to English" by choosing each word according to its probability given the previous word, using the text of a book as his table of counts.

::: definition n-gram model {#def-ngram}
An **n-gram** is a sequence of n words: *heavy rain* is a bigram (n = 2), *in the rain* a trigram (n = 3). An **n-gram model** estimates the probability of a word from the n − 1 words before it, using corpus counts:

$$
P(w_n \mid w_{n-1}) = \frac{C(w_{n-1}\,w_n)}{C(w_{n-1})}
$$

for a bigram model, where C is a count in the corpus. The model assumes that only the last n − 1 words matter — the **Markov assumption** — so a bigram model is a Markov chain whose states are words.
:::

::: widget markov
title: A tiny bigram model
matrix: 0, 0.5, 0.5, 0, 0, 0; 0, 0, 0, 0.6, 0.4, 0; 0, 0, 0, 0.3, 0.7, 0; 0, 0, 0, 0, 0, 1; 0, 0, 0, 0, 0, 1; 1, 0, 0, 0, 0, 0
states: the; cat; dog; sat; ran; on
start: 0
steps: 20
caption: A hand-made table, not counts from a real corpus. Each row gives the probability of the next word after that word: after *the*, *cat* or *dog* with equal chance; after *cat*, *sat* (0.6) or *ran* (0.4); after *dog*, *sat* (0.3) or *ran* (0.7); after *sat* and *ran*, always *on*; after *on*, always *the*. Run the walk and read the words in order: *the dog ran on the cat sat on the …* — every pair of neighbours is fine, but the whole has no plan, because the model sees only one word back. That is exactly the weakness Shannon's approximations showed.
:::

::: theorem What n-gram models can and cannot do {#rule-ngram}
1. Longer n-grams capture more context (*in the pouring* → *rain*) but need far more data, because most long sequences never occur in any corpus, so their counts are zero. This is the **data sparsity** problem.
2. Models therefore use **smoothing** — giving some probability to unseen sequences — and **back-off** to shorter n-grams when longer ones are unseen.
3. n-gram models were for decades the standard language models of speech recognition, spelling correction and machine translation, and they are still useful for measuring how predictable a text is.
4. They cannot capture dependencies beyond their window: in *The keys that the man who lived next door had lost **were** found*, the agreement of *were* with *keys* spans ten words — far beyond any practical n-gram.
:::

::: proof
Rules 1 and 2 follow from Zipf's law: because most types and most sequences are rare, a corpus of any size leaves most possible trigrams and almost all possible five-grams unseen. Rule 4 follows from the structure of language described in [[linguistics/phrases-constituents]] and [[linguistics/clauses-movement]]: dependencies are defined over constituents, which can be of any length, not over a fixed number of words. Neural language models, which since the 2010s have replaced n-gram models in most applications, address both problems: they represent words as points in a learned space, so that similar contexts share information, and they can condition on long stretches of text. The large language models behind modern chatbots are, at their core, next-word predictors trained on corpora of enormous size; how they work is explained in the [LLM Atlas](/learn/llm/). Their success has revived old questions of this course — how much of grammar can be learned from distribution alone — which return in [[linguistics/language-acquisition]].
:::

::: example A bigram estimate {#ex-bigram}
In a small corpus, *strong* occurs 400 times, followed by *tea* 24 times, by *coffee* 10 times and by *argument* 30 times; *powerful* occurs 300 times, followed by *tea* 0 times and by *argument* 6 times. (Invented figures.) Estimate P(*tea* | *strong*) and P(*tea* | *powerful*), and explain what the second estimate shows.
::: solution
1. P(*tea* | *strong*) = 24/400 = 0.06.
2. P(*tea* | *powerful*) = 0/300 = 0.
3. The zero is a real fact about English collocation — native speakers say *strong tea*, not ✗ *powerful tea* ([[collocation-and-register/what-is-collocation#rule-conventional]]) — but an unsmoothed model would also give zero to many perfectly possible combinations that the small corpus happens not to contain, such as *powerful telescope* if it never appeared. A model cannot tell the two kinds of zero apart from counts alone, which is why smoothing is needed and why absence from a corpus is weak evidence of impossibility ([[linguistics/what-linguistics-studies#rule-evidence]]).
:::
:::

::: warning Absence is not ungrammaticality
✗ *The phrase isn't in the corpus, so it's wrong.* A corpus is a sample; rare but grammatical combinations will be missing from any sample, and new ones are made every day. ✓ *The phrase is absent from a large corpus while its alternatives are frequent, and native speakers judge it odd, so it is probably not idiomatic.* Combine corpus counts with judgments and dictionaries, as [[collocation-and-register/using-a-corpus#rule-limits]] advises.
:::

## Corpus linguistics and linguistic theory

Corpus evidence changed descriptions of English in three main ways. First, it showed the extent of **phraseology**: John Sinclair, who led the COBUILD project at Birmingham, argued in *Corpus, Concordance, Collocation* (1991) that speakers rely on an **idiom principle** — using a great number of semi-preconstructed phrases — at least as much as on an **open-choice principle** of combining words freely by grammar. Second, it showed that grammar varies by register: Biber et al.'s *Longman Grammar of Spoken and Written English* (1999) gave frequencies for structures in conversation, fiction, news and academic prose, and found, for example, that the passive and nominalisations are many times more common in academic prose than in conversation. Third, it linked meaning to use, in the tradition of J. R. Firth, who wrote that "you shall know a word by the company it keeps" (1957): **semantic prosody**, the evaluative colouring a word acquires from its collocates (*cause* mostly with unpleasant things, [[collocation-and-register/what-is-collocation#def-prosody]]), was discovered in concordances.

Researchers differ on how far to let the corpus lead. **Corpus-based** studies use corpora to test hypotheses formulated within an existing theory; **corpus-driven** studies, in the term of Elena Tognini-Bonelli (2001), try to let categories emerge from the data with as few prior assumptions as possible. Most work combines the two.

::: history
Before computers, large collections of examples were made by hand: the *Oxford English Dictionary* was built from millions of citation slips sent in by volunteers from the 1850s onwards, and Otto Jespersen's grammar of English (1909–49) rested on a vast collection of quotations. The Survey of English Usage, founded by Randolph Quirk at University College London in 1959, recorded and transcribed spoken English as well as written texts and became the basis of the Quirk grammars. The first computer corpus of English, the Brown Corpus, was completed by W. Nelson Francis and Henry Kučera in 1964, and their frequency analysis appeared in 1967. In the 1960s many linguists, following Chomsky, doubted that corpora could reveal competence, since a corpus contains only performance and lacks the ungrammatical sentences that show the limits of a grammar. The COBUILD dictionary (1987), the BNC (1994) and the Longman grammar (1999) showed what large corpora could do for description, and the field is now central both to applied linguistics and to the language technologies built on statistical and neural models.
:::

## Where this leads

The practical skills are in [[collocation-and-register/using-a-corpus]], [[collocation-and-register/what-is-collocation]] and [[core-vocabulary/frequency-and-coverage]]. Corpora of different periods and varieties provide the evidence for [[linguistics/variation-change]]; learner corpora and the statistics children may track in speech appear in [[linguistics/language-acquisition]]. Language models built on the same counting ideas, and on much more, are explained in the [LLM Atlas](/learn/llm/).

::: summary
- A corpus is **representative** of a defined population through its **sampling** and **balance**; no corpus represents "English" as a whole, so its design must be stated.
- Corpora can be general, monitor, specialised, diachronic, learner, parallel or comparable; size must suit the question.
- **Annotation** (tokenisation, lemmatisation, POS tagging, parsing) makes corpora searchable by linguistic category but involves theoretical choices; Chinese needs **word segmentation**.
- Word frequencies follow **Zipf's law** roughly: a straight line of slope about −1 on a log–log plot; few types make most tokens, many types are **hapax legomena**, and **dispersion** matters as well as frequency.
- **Collocation scores** compare observed with expected frequency: MI favours exclusive pairs, t-score frequent ones; **keyness** (log-likelihood) compares a corpus with a reference, and needs an effect size as well.
- An **n-gram model** predicts the next word from counts under the Markov assumption; it suffers from **data sparsity** and cannot see long-distance dependencies.
- Corpora revealed **phraseology**, **register variation** in grammar and **semantic prosody**; absence from a corpus is not proof of ungrammaticality.
:::

## Exercises

::: exercise Which corpus? {level=1}
Say which kind of corpus would best answer each question.

1. How has the use of *shall* changed since 1960?
2. Do Chinese university students overuse *very* compared with native student writers?
3. How do translators render 了 in English?
4. What are the most common verbs in medical research articles?
::: solution
1. Diachronic, or a set of matched corpora such as Brown, Frown and their successors.
2. A learner corpus (such as CLEC or the Chinese part of ICLE) compared with a comparable native corpus of student writing.
3. A parallel Chinese–English corpus, aligned by sentence.
4. A specialised corpus of medical research articles.
:::
:::

::: exercise Expected frequency {level=1 check="4"}
In a corpus of 5,000,000 tokens, the node *decision* occurs 1,000 times and *make* 2,500 times. Using a span of four positions on each side (eight positions), what is the expected frequency of *make* near *decision*?
::: solution
$E = \dfrac{1000 \times 2500}{5\,000\,000} \times 8 = 0.5 \times 8 = $ **4**.
:::
:::

::: exercise Tagging problems {level=1}
Give the word class of *that* in each sentence, as a tagger should label it.

1. *I know that she left.*
2. *That book is mine.*
3. *The book that I bought was cheap.*
4. *It wasn't that bad.*
::: solution
1. Subordinating conjunction (complementiser). 2. Determiner (determinative). 3. Relative word (tagged as a relative pronoun in some tagsets, a complementiser in others — Huddleston and Pullum treat it as a subordinator). 4. Adverb (degree). The variation in the analysis of 3 is a reminder that tagsets embody grammatical decisions.
:::
:::

::: exercise MI and t-score {level=2}
In the same imaginary corpus as [[#ex-collocation]], *rain* has the collocate *the* (f = 600,000 tokens) 600 times within the span. Compute E, MI and t-score, and say what they show.
::: solution
$E = \dfrac{2000 \times 600\,000}{10\,000\,000} \times 8 = 960$. MI $= \log_2(600/960) = \log_2 0.625 \approx -0.68$. t $\approx (600 - 960)/\sqrt{600} \approx -360/24.5 \approx -14.7$.

*The* occurs near *rain* **less** often than chance (O < E), so both scores are negative: *the* is not a collocate of *rain* in this corpus, despite its high raw count. (Real counts would differ; the point is that raw co-occurrence frequency alone is misleading for very frequent words.)
:::
:::

::: exercise Reading a Zipf plot {level=2}
A student plots log frequency against log rank for a novel and finds a nearly straight line from rank 10 to rank 5,000 with slope −1.1, bending at the top and flattening into steps at the bottom. Explain each feature.
::: solution
- The straight line in the middle is Zipf's law; a slope of −1.1 means an exponent $s \approx 1.1$, close to the classic value.
- The bend at the top occurs because the top few words (*the*, *and*, *to*, *of*, *a*, and in a novel the main character's name and *he* or *she*) do not follow the formula exactly.
- The steps at the bottom occur because many words share the same low frequencies (1, 2, 3 …): all hapax legomena have the same frequency but different ranks, giving a horizontal step for each frequency.
:::
:::

::: exercise Keyness and effect size {level=2}
In a 2,000,000-word corpus of news, *said* occurs 8,000 times; in a 2,000,000-word corpus of academic prose, it occurs 1,000 times. (Invented figures.) Compute the ratio of normalised frequencies and the log ratio, and say whether you would expect the log-likelihood to be significant.
::: solution
Normalised frequencies: news 4,000 per million, academic 500 per million. Ratio 8; log ratio $\log_2 8 = 3$. With counts this large and this unequal, the log-likelihood will be enormous ($E = 4500$ in each; $G^2 = 2[8000 \ln(8000/4500) + 1000 \ln(1000/4500)] \approx 2[4603 - 1504] \approx 6200$), far above 15.13 — significant at any conventional level. *Said* is a strong keyword of news, as reporting of speech would lead us to expect.
:::
:::

::: exercise Design a study {level=3}
Design a corpus study to test the claim that Chinese learners of English overuse *in my opinion* and *I think* in argumentative essays. Say which corpora you would compare, how you would make them comparable, which counts and statistics you would report, and one limitation of the result.
::: hint
Think about topic, task, length, level and the native-speaker comparison. What is "overuse" relative to?
:::
::: solution
A model answer:

*Corpora.* A learner corpus of argumentative essays by Chinese university students (for example from CLEC or the Chinese component of ICLE) and a comparable corpus of argumentative essays by native-speaker students of similar age (such as LOCNESS, the native comparison corpus used with ICLE).

*Comparability.* Same genre (argumentative essays), similar topics and length, similar conditions (timed or not), and if possible similar level of education. Report the sizes in words.

*Counts and statistics.* Frequencies of *in my opinion*, *I think* and related stance expressions (*I believe*, *personally*), normalised per 10,000 words; their dispersion across essays (how many writers use them, not just how often); log-likelihood for significance and log ratio for effect size; and concordance lines to check function (stance, hedging, or a formula at the start of a paragraph).

*Limitation.* "Overuse" relative to native students does not show that the usage is wrong, only different; the difference may also reflect teaching materials or exam training rather than transfer from Chinese. The essays' topics may also differ, and a learner corpus from one university may not represent all Chinese learners.
:::
:::

::: exercise A bigram model by hand {level=3}
Build a bigram table from this tiny corpus, written for the exercise (treat each sentence separately and add a start symbol ⟨s⟩ before each): *I like tea. I like green tea. You like coffee.* Then compute the probability the model gives to the sentence *You like green tea.* and to *I like coffee.*, and explain why both are possible although neither occurs in the corpus.
::: solution
Counts (ignoring the full stops): ⟨s⟩ → *I* 2, *You* 1; *I* → *like* 2; *You* → *like* 1; *like* → *tea* 1, *green* 1, *coffee* 1; *green* → *tea* 1.

Probabilities: P(*I* | ⟨s⟩) = 2/3, P(*You* | ⟨s⟩) = 1/3; P(*like* | *I*) = 1, P(*like* | *You*) = 1; P(*tea* | *like*) = P(*green* | *like*) = P(*coffee* | *like*) = 1/3; P(*tea* | *green*) = 1.

*You like green tea*: 1/3 × 1 × 1/3 × 1 = **1/9**.
*I like coffee*: 2/3 × 1 × 1/3 = **2/9**.

Both sentences are new, but every bigram in them occurs in the corpus, so the model assigns them a probability. This is the strength of n-gram models — generalising from local sequences — and also their limit: a sentence such as *You like tea green* would get probability 0 only because *tea green* is unseen, not because the model knows that adjectives precede nouns in English.
:::
:::
