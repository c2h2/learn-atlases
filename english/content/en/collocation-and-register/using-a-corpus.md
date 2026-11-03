Zhang Min is writing the introduction to her first research report in English and stops at one phrase: should it be *I made research on online learning* or *I did research on online learning*? She asks two classmates and gets two different answers. She types both phrases into a search engine and both produce many results. Her dictionary gives *research* = 研究 and says nothing about the verb. She is left with the learner's oldest problem: when your own sense of what sounds right is not yet reliable, whom do you trust?

The answer of modern linguistics is: trust the evidence of what many speakers and writers actually do, collected in a **corpus**. Since the 1990s, every major learner's dictionary has been built from corpus evidence, and several large corpora can now be searched free of charge through a web browser. This chapter explains what a corpus is, how to read the evidence it gives — concordance lines, frequencies and collocate lists — what the association scores MI, t-score and logDice mean, and how to use all of this to check a phrase in a few minutes. It also explains what a corpus cannot tell you. (Zhang Min's answer, by the way, is *I did research* or, more formally, *I carried out* / *conducted research*; we will see how to find that out.)

## What a corpus is

::: definition Corpus {#def-corpus}
A **corpus** (plural *corpora*) is a large collection of real texts — written, spoken or both — stored electronically and chosen according to a plan, so that it represents a language or a variety of it (British English, American English, academic writing, conversation). Software lets the user search a corpus for words and phrases, count them and see them in context.
:::

The "plan" is what separates a corpus from a random pile of texts. A good general corpus contains many different kinds of text in known proportions, so that its results can be described ("in the spoken part of the corpus, …") and compared. Some well-known English corpora:

| corpus | size | contents |
|---|---|---|
| Brown Corpus (Francis and Kučera, completed 1964) | about 1 million words | American English printed in 1961, 500 samples from 15 categories of text; the first electronic corpus of its kind |
| British National Corpus (BNC, completed 1994) | about 100 million words | British English, mostly from the 1980s and early 1990s; about 90% written, 10% spoken, including recorded conversation |
| Corpus of Contemporary American English (COCA, Mark Davies, first released 2008) | about one billion words in its current version | American English from 1990 onwards, in sections such as spoken (TV and radio), fiction, magazines, newspapers and academic writing |
| learner corpora such as the International Corpus of Learner English (ICLE) and the Chinese Learner English Corpus (CLEC) | from about one million to several million words | writing by learners, used by researchers to study learner language |

A corpus is evidence of **usage**, not of correctness. It shows what people with a particular background, writing or speaking in particular situations, actually produce. That is exactly what a learner who wants to sound natural needs, but it has to be read with care, as the rest of this chapter shows.

::: warning Search-engine hit counts are not corpus evidence
Typing two phrases into a search engine and comparing the "about 2,000,000 results" figures is tempting but unreliable. The figures are rough estimates, not counts; the web contains unedited text, machine translation and a great deal of non-native writing (including Chinglish), so a phrase with many hits may still be unnatural; and a search engine tells you nothing about who wrote the text or in what register. At most, a difference of several orders of magnitude (thousands against millions), with the phrase in quotation marks, is a hint worth checking in a real corpus or a dictionary.
:::

## Concordances

::: definition Concordance {#def-concordance}
A **concordance** is a list of every occurrence of a word or phrase in a corpus, each shown with some words of context on both sides. In the usual format, **KWIC** (‘key word in context’), the search word is lined up in the centre of the screen, so that the patterns to its left and right can be seen at a glance.
:::

Here are ten concordance lines for the noun *research*. They were written for this lesson in the style of a concordance, not taken from a corpus, but they show what a real one looks like.

| left context | node | right context |
|---|---|---|
| *… the team has carried out extensive* | ***research*** | *into the causes of …* |
| *… more than half of the funding for* | ***research*** | *in this area comes …* |
| *… she is currently doing* | ***research*** | *on bilingual children …* |
| *… previous* | ***research*** | *has shown that …* |
| *… we conducted* | ***research*** | *with forty teachers …* |
| *… according to recent* | ***research*** | *by the university …* |
| *… a great deal of* | ***research*** | *has been done on …* |
| *… further* | ***research*** | *is needed to …* |
| *… students who did their own* | ***research*** | *before the interview …* |
| *… the findings of this* | ***research*** | *suggest that …* |

Reading down the left side gives the verbs (*carry out*, *do*, *conduct*) and the adjectives (*extensive*, *previous*, *recent*, *further*); reading down the right side gives the prepositions (*into*, *in*, *on*, *with*, *by*) and the typical verbs that follow (*has shown*, *is needed*, *suggest*). Notice what is **not** there: no *make research*, and no *researches* — in most contexts *research* is uncountable. Most corpus interfaces let you **sort** the lines by the first or second word to the left or right, which brings the patterns together: sorted on the word before *research*, all the *carried out* lines appear in one block.

::: theorem Read concordance lines for patterns, not single examples {#rule-patterns}
A concordance is evidence when it shows a **pattern** repeated across many lines from different texts. A single example proves only that someone once wrote it. To use a concordance:

1. Look at enough lines — at least twenty or thirty for a common word, sorted so that patterns stand out.
2. Note which words recur in each position to the left and right of the node.
3. Check that the recurring lines come from **different texts and writers**, not one document repeated.
4. Note the **meaning** in each line: the same form may have different senses with different collocates.
:::

::: proof
The value of a corpus is that it shows what is typical, and typicality is a matter of repetition. Sinclair (1991) argued that the units of meaning in English become visible only when many occurrences are seen together: a reader of a single text sees *research* once, a reader of a concordance sees the pattern *carry out* + *research* + *into* repeated by dozens of writers who never met. Steps 3 and 4 protect against the two commonest misreadings. A phrase that occurs fifty times may come from one author's book; and *issue*, for example, collocates with *raise* and *address* in the sense ‘problem’ but with *publish* and *latest* in the sense ‘edition of a magazine’.
:::

::: example Make research or do research? {#ex-research}
Zhang Min searches a corpus for the phrases *make research*, *made research*, *do research*, *did research* and *doing research*, and then for any verb followed by *research*. What should she look for, and what will she find?
::: solution
1. **Compare the alternatives.** In general corpora of British or American English, forms of *do research* are found readily, while forms of *make research* are rare or absent. (Try it: in any large corpus the difference is striking.)
2. **Look at the lines that do contain *make* + *research*.** Typically they are not the collocation at all: *make research easier*, *make research more relevant* — *make* + object + adjective, where *research* is the object of a different pattern.
3. **Search for verb + *research* more broadly.** The concordance shows *do*, *carry out* and *conduct* as the main verbs, with *carry out* and *conduct* typical of more formal and academic writing. Other common combinations are *research shows* / *suggests*, *research into* / *on* a topic, and *a piece of research* (because *research* is uncountable).
4. **Confirm in a dictionary.** A learner's dictionary entry for *research* shows *do* / *carry out* / *conduct research* in its examples or collocation box.

Conclusion: *I did research on online learning* is correct; in a research report, *I conducted* (or *carried out*) *research on online learning* fits the register better. *Make research* is the kind of combination Nesselhauf (2005) and others describe as typical of learners whose first language uses one verb for both ‘make’ and ‘do’ (as 做 does).
:::
:::

::: quiz
In a concordance of *issue*, most lines with the verb *raise* before it show the sense ‘a problem or topic for discussion’. What does this tell you?
- [ ] *Raise* can only be used with *issue*.
- [x] *Raise an issue* is a collocation of *issue* in its ‘problem’ sense.
- [ ] *Issue* always means ‘problem’.
- [ ] The corpus contains an error.
::: solution
Collocates go with senses. *Raise* combines with *issue* (also *question*, *concern*, *point*) when *issue* means a topic or problem; in its other sense (an edition of a magazine) *issue* collocates with *latest*, *back* (*a back issue*) and *publish*. Neither word is limited to the other.
:::
:::

## Frequency

Corpus tools give a count for every search. The count is useful only when it is compared with something.

::: definition Raw and normalised frequency {#def-normalised}
The **raw frequency** of a word or phrase is the number of times it occurs in a corpus. Because corpora (and parts of corpora) differ in size, raw frequencies are converted to a **normalised frequency**, usually **per million words**:

$$
\text{frequency per million} = \frac{\text{raw frequency}}{\text{size of the corpus in words}} \times 1\,000\,000.
$$
:::

::: example Comparing two corpora {#ex-normalise}
A learner finds a phrase 240 times in a 100-million-word corpus of British English and 1,800 times in a 1-billion-word corpus of American English. (These numbers are invented for the example.) Is the phrase more frequent in British or American English?
::: solution
Convert both to frequencies per million words:

- British: 240 ÷ 100,000,000 × 1,000,000 = **2.4 per million**.
- American: 1,800 ÷ 1,000,000,000 × 1,000,000 = **1.8 per million**.

Although the raw count is seven and a half times higher in the American corpus, the phrase is relatively **more** frequent in the British one. Even so, the difference is small: before concluding that the phrase is "British", the learner should check whether the two corpora contain similar kinds of text (a corpus with more conversation will contain more conversational phrases) and whether the lines come from many different sources.
:::
:::

Frequencies also differ between the sections of one corpus, and that is how corpora reveal **register**. Biber et al. (1999) compared four registers throughout their grammar — conversation, fiction, news and academic prose — and found, for example, that phrasal verbs are most frequent in fiction and conversation and least frequent in academic prose, while nouns made with *-tion* and *-ity* are far more frequent in academic prose than in conversation. Most corpus interfaces show such a breakdown automatically: a chart of how often the word occurs in each section. A word that is frequent in the academic section and rare in the spoken one is a word for essays, not for chatting with a flatmate ([[collocation-and-register/register]]).

## Collocates and association scores

Instead of searching for a phrase, a corpus tool can be asked for a word's **collocates**: all the words that occur near it more often than expected. This is the quickest way to answer the question "which adjective goes with *rain*?" without guessing the answer first.

::: definition Span and expected frequency {#def-span}
The **span** (or window) is the number of words to the left and right of the node that are searched for collocates, for example four words on each side. The **observed frequency** O of a collocate is the number of times it occurs within the span. The **expected frequency** E is how often it would occur there if words were scattered at random:

$$
E = \frac{f(\text{node}) \times f(\text{collocate})}{N} \times (\text{number of positions in the span}),
$$

where $f$ is the frequency of each word in the corpus and N the size of the corpus.
:::

Comparing O with E shows how far a pair is from chance. Different tools turn that comparison into different **association scores**, and the three most common rank collocates in strikingly different orders.

::: definition MI, t-score and logDice {#def-scores}
- **Mutual information** (Church and Hanks 1990) compares observed and expected frequency on a logarithmic scale: $\text{MI} = \log_2 (O / E)$. An MI of 3 means the pair occurs eight times more often than chance.
- The **t-score** (Church et al. 1991) measures how confident we can be that the pair is not a chance co-occurrence: $t \approx (O - E) / \sqrt{O}$.
- **logDice** (Rychlý 2008) uses only the frequencies of the pair and of the two words: $\text{logDice} = 14 + \log_2 \dfrac{2\,O}{f(\text{node}) + f(\text{collocate})}$, which has a maximum of 14 and does not depend on the size of the corpus.
:::

::: theorem What each score favours {#rule-scores}
- **MI** favours pairs that are **exclusive**: words that rarely occur anywhere except together, even if the pair itself is rare (*torrential rain*, *shrug* + *shoulders*, technical terms, names).
- The **t-score** favours pairs that are **frequent**: common words that occur together often, including grammatical words (*the rain*, *rain in*, *heavy rain*).
- **logDice** gives a balance between the two and is the default in some tools (Sketch Engine and its free learner interface SkELL).

For a learner, a list sorted by t-score shows the collocations worth learning first; a list sorted by MI shows the specialised and vivid ones. Rules of thumb often quoted (for example by Hunston 2002) treat MI ≥ 3 and t ≥ 2 as signs of a real association.
:::

::: proof
The formulas explain the behaviour. MI depends on the **ratio** O/E: when the collocate is rare, E is tiny, so even three or four co-occurrences give a very large ratio. That is why MI lists are full of rare, highly specific words — and also of oddities, such as a misprint that happens twice next to the node. The t-score grows roughly with $\sqrt{O}$, so it cannot become large unless the pair is frequent, whatever the ratio; it therefore rewards common combinations and tends to put grammar words near the top. logDice divides O by the sum of the two frequencies, so a pair with a very frequent partner (such as *the*) scores low, and a pair of moderately frequent words that keep each other's company scores high. The thresholds are conventions, not laws, and they do not apply to logDice; Hunston (2002) and other textbooks treat them as guides for reading lists, not as tests of grammaticality.
:::

::: widget plot
f: log2(x*1000000/(200*c)); (x - 200*c/1000000)/sqrt(x)
x: 1, 40
y: -1, 14
sliders: c=2000:5:40000:5
labels: MI; t-score
hlines: 3; 2
title: How MI and the t-score respond to a collocate's frequency
caption: An invented corpus of one million words, a node that occurs 200 times, and a collocate that occurs *c* times in the corpus; the horizontal axis is the number of times the two occur next to each other (O, one position, so E = 200*c* ÷ 1,000,000). Move the slider. When the collocate is **rare** (small *c*), MI is high even for two or three co-occurrences, while the t-score stays low until the pair is frequent. When the collocate is **very common** (large *c*, like *the*), MI falls towards zero but the t-score still rises with O. The dashed lines mark the rule-of-thumb thresholds MI = 3 and t = 2.
:::

::: example Two lists for one word {#ex-two-lists}
A learner asks a corpus tool for the adjective collocates of *rain* and gets two lists, one sorted by t-score and one by MI. (The lists below were made up for this example, but they show the typical pattern.)

| sorted by t-score | sorted by MI |
|---|---|
| *heavy* | *torrential* |
| *light* | *driving* |
| *the* (see note) | *incessant* |
| *acid* | *freezing* |
| *torrential* | *steady* |
| *steady* | *acid* |

Note: some tools filter out grammatical words such as *the*; this one did not.

Explain the difference, and say which words a learner should learn first.
::: solution
- The **t-score** list starts with *heavy* and *light*: frequent adjectives that very often occur with *rain*. It also contains *the*, a grammatical word with a high t-score simply because it is so common.
- The **MI** list starts with *torrential*, *driving* (‘falling hard and blown by the wind’) and *incessant*: words that are much less frequent but, when they do occur, very often occur with *rain* (or a few other words of weather). They are vivid and precise, but specialised.
- *Acid rain* is a compound term and scores high on both lists.

A learner should learn the top of the t-score list first (*heavy rain*, *light rain*), because these are the combinations needed most often, and then pick useful words from the MI list (*torrential rain*, *steady rain*) for richer descriptions. Unusual items at the top of an MI list should be checked in the concordance before being used: they may come from a single text.
:::
:::

::: quiz
A collocate list for *commit* sorted by MI places a rare legal term at the very top, above *crime* and *suicide*. Why?
- [ ] Because the legal term is the most frequent collocate of *commit*.
- [x] Because MI favours exclusive pairs: a rare word that almost always occurs with *commit* gets a very high score.
- [ ] Because the corpus is wrong.
- [ ] Because MI always puts nouns first.
::: solution
MI compares observed with expected frequency. A rare word has a tiny expected frequency next to *commit*, so even a few co-occurrences give a high ratio. That makes MI good at finding specialised collocations and bad at telling you which collocations are most common; for that, sort by t-score or by raw frequency.
:::
:::

## Checking a phrase, step by step

::: theorem Checking a word combination {#rule-check}
To check whether a combination is natural, and in which register and variety:

1. **Search the exact phrase and its alternatives**, including different forms (*make*/*made*/*making a decision*) or a lemma search if the tool offers one.
2. **Compare normalised frequencies**, not raw counts, and look for large differences rather than small ones.
3. **Read the concordance lines**: is the phrase used in your meaning, by many different writers, and in the grammatical pattern you want?
4. **Look at the distribution across sections** (spoken, fiction, news, academic) to judge the register.
5. **Compare British and American corpora** (or the variety sections of one corpus) if variety matters.
6. **Confirm in a learner's dictionary or a collocation dictionary**, which summarise corpus evidence and add labels (*formal*, *BrE*).
:::

::: example At the weekend or on the weekend? {#ex-weekend}
Zhou Yi has seen both *at the weekend* and *on the weekend*. How can she find out whether one of them is wrong?
::: solution
1. Search both phrases in a British corpus (the BNC) and an American one (COCA), and convert the counts to frequencies per million.
2. The result is clear in direction: *at the weekend* is much more frequent in the British corpus, and *on the weekend* in the American one. (*Over the weekend* is common in both, and *on weekends* is typical of AmE.)
3. The concordance lines show the same meaning in both (‘during the weekend’), used by many different writers.
4. A learner's dictionary confirms it: entries for *weekend* label *at the weekend* as British and *on the weekend* as American (or as American and Australian).

Conclusion: neither is wrong. They belong to different varieties, and Zhou Yi should choose one and use it consistently in a text. The BNC was compiled mostly from texts of the 1980s and early 1990s; more recent British data would show whether *on the weekend* has become commoner in British English since then, as some observers report. That is a reminder to check the date of a corpus before drawing conclusions about current usage.
:::
:::

### Tools a learner can use

The following are freely available as of 2026; names, addresses and conditions of use change, so search for the current version.

- **English-Corpora.org** (Mark Davies) gives access to COCA, the BNC and other corpora through one interface, with free registration and daily limits. It offers frequency by section, collocate lists and comparisons between corpora.
- **BNCweb** (Lancaster University) is another interface to the BNC, with detailed information about speakers and texts.
- **SkELL** (Sketch Engine for Language Learning) is a free, simplified tool designed for learners: it shows example sentences, a "word sketch" of the collocates in each grammatical relation (verbs with the word as object, adjectives that modify it, and so on), and similar words.
- The **Google Books Ngram Viewer** shows how the frequency of a phrase in books has changed over time. It is useful for history and for comparing alternatives, but its texts are books only, with scanning errors, and it shows no context unless you follow the links.
- **Learner's dictionaries** online (Cambridge, Longman, Oxford, Collins COBUILD, Merriam-Webster's Learner's Dictionary) are themselves summaries of corpus evidence, and several show collocations and example sentences from their corpora; [[core-vocabulary/using-a-dictionary]] shows how to read an entry.

A collocation dictionary — for example the *Oxford Collocations Dictionary for Students of English* — is the most convenient source when writing: it lists, for each noun, the verbs and adjectives that go with it, grouped by meaning. It does not give frequencies or show register as clearly as a corpus does, so the two complement each other.

::: note English and Chinese
Chinese learners may already know Chinese corpora such as the BCC corpus of Beijing Language and Culture University or the CCL corpus of Peking University, which work in the same way. Two habits from Chinese-language study need care. First, the bilingual "example sentences" (双语例句) shown by popular online dictionaries are often collected automatically from the web; some come from good translations, others from machine translation or from Chinglish, so they show possible, not necessarily natural, English. Check where an example comes from, and prefer sentences from a learner's dictionary or a corpus of texts written in English. Second, a search in Chinese tells you about 研究, not about *research*: the collocations you need are those of the English base word, so start the search from the English noun and let the corpus tell you its verbs.
:::

## What a corpus cannot tell you

::: theorem The limits of corpus evidence {#rule-limits}
1. **Absence is not proof.** A phrase that does not occur in a corpus may simply be rare, new or specialised; the larger the corpus, the more meaningful its absence.
2. **Presence is not approval.** A phrase that occurs may be a mistake, a joke, a quotation of a mistake or a regional usage; look at who uses it and how often.
3. **A corpus reflects its texts.** Its date, variety and mix of registers limit what it can say: a corpus of 1990s British English says little about how people text each other today.
4. **Frequency is not suitability.** A frequent conversational phrase may be wrong in an essay, and a rare technical collocation may be exactly right in a report.
:::

::: proof
Each point follows from what a corpus is: a finite sample, chosen according to a plan. A sample can miss rare events, include accidents and mirror the choices of the people who built it. Corpus linguists therefore talk about **representativeness** (Biber 1993): how far a corpus represents the range of texts it claims to cover. For a learner, the practical rule is to use corpus evidence alongside a dictionary and a teacher's judgement, and to treat strong, repeated patterns as reliable and single examples as anecdotes.
:::

::: quiz
A learner finds a phrase twice in a 100-million-word corpus, both times in the same novel. What is the most reasonable conclusion?
- [ ] The phrase is standard English.
- [ ] The phrase is wrong.
- [x] There is little evidence that the phrase is in general use; check other sources before using it.
- [ ] The phrase is British.
::: solution
Two occurrences from a single text say very little: the writer may have invented the phrase or used it for effect. The phrase is not proved wrong — absence and near-absence are not proof — but a learner should prefer a combination with clear, repeated evidence from many texts.
:::
:::

::: history
The first computer corpus of English designed for general use, the Brown Corpus, was compiled at Brown University by W. Nelson Francis and Henry Kučera and completed in 1964; its British counterpart, the Lancaster–Oslo/Bergen (LOB) corpus, followed in the 1970s. Randolph Quirk's Survey of English Usage, begun at University College London in 1959, collected spoken and written English on paper slips before it was computerised. In Birmingham, John Sinclair's team built a much larger corpus for the *Collins COBUILD English Language Dictionary* (1987). The 100-million-word British National Corpus was completed in 1994, and Mark Davies's web interfaces, including COCA (2008), made very large corpora searchable by anyone with a browser. Learner corpora such as ICLE (1990s onwards) and CLEC (2003) turned the same methods towards learner language.
:::

## Where this leads

Corpus evidence underlies the rest of this course: the collocations of common verbs and adjectives in [[collocation-and-register/verb-noun-adjective-noun]], the distribution of phrasal verbs across registers in [[collocation-and-register/phrasal-verbs-register]], and the checking of translations in [[collocation-and-register/false-friends-chinglish]]. Corpus linguistics as a field — how corpora are built and annotated, and what they have changed in grammar and dictionaries — is the subject of [[linguistics/corpus-linguistics]]. The vocabulary frequency counts behind word lists are discussed in [[core-vocabulary/frequency-and-coverage]].

::: summary
- A **corpus** is a large, planned collection of real texts that can be searched; it is evidence of usage, not a list of rules.
- A **concordance** shows every occurrence of a word in context (KWIC); read many lines, sorted, for **repeated patterns** across different texts.
- Compare **normalised frequencies** (per million words), not raw counts, and use section breakdowns to judge **register** and variety.
- Collocate lists rank partners by association scores: **MI** favours exclusive, often rare pairs; the **t-score** favours frequent pairs; **logDice** balances the two.
- Check a combination by searching it and its alternatives, comparing frequencies, reading lines, looking at sections and varieties, and confirming in a dictionary.
- Search-engine hit counts and automatically collected bilingual examples are weak evidence.
- Absence is not proof and presence is not approval: a corpus reflects its texts, its date and its variety.
:::

## Exercises

::: exercise Reading a concordance {level=1}
Look at the ten concordance lines for *research* in this chapter. List (a) the verbs used before *research*, (b) the adjectives before it, (c) the prepositions after it.
::: solution
(a) *carried out*, *doing*, *conducted*, *did* (and *has been done*, in the passive). (b) *extensive*, *previous*, *recent*, *further* (also *their own*). (c) *into*, *in*, *on*, *with*, *by*.
:::
:::

::: exercise Per million {level=1 check="3.5"}
A word occurs 350 times in a corpus of 100 million words. What is its frequency per million words?
::: solution
350 ÷ 100,000,000 × 1,000,000 = **3.5** per million.
:::
:::

::: exercise Which score? {level=1}
Which association score would you sort by to find (a) the most common adjectives used with *coffee*, and (b) unusual, specialised adjectives used with *coffee*?
::: solution
(a) The t-score (or raw frequency), which favours frequent pairs: *strong*, *black*, *hot* … (b) MI, which favours exclusive pairs, including rarer words; check them in the concordance before using them.
:::
:::

::: exercise Interpret the result {level=2}
A learner searches for *discuss about* and *discuss* + noun in a large corpus of edited English. *Discuss about* is very rare; *discuss the problem*, *discuss the issue* and *discuss the matter* are frequent. In the few lines with *discuss about*, *about* belongs to a following phrase (*to discuss about ten proposals*). What should the learner conclude?
::: solution
*Discuss* is transitive: it takes a direct object (*discuss the problem*), not ✗ *discuss about the problem*. The few lines with *discuss about* are not counter-evidence, because *about* there means ‘approximately’ and belongs to *about ten proposals* — exactly the kind of misleading line that reading the concordance reveals. (The noun takes *about*: *a discussion about the problem*. Chinese 讨论 does not need a preposition either, so this error is usually influenced by *talk about*.)
:::
:::

::: exercise Plan a check {level=2}
You want to write *The government should take measures to protect old buildings.* You are not sure whether *take measures* is natural, or whether *adopt measures* or *make measures* would be better. Describe, step by step, how you would check, and say what kind of evidence would convince you.
::: solution
1. Search *take measures*, *adopt measures*, *make measures* (all verb forms) in a large corpus; convert to per-million frequencies.
2. Read the lines: is the meaning ‘act to deal with a problem’? Are they from many writers?
3. Look at the sections: these phrases should be most frequent in news and academic or official writing.
4. Ask for the verb collocates of *measures* to see the full set (*take*, *introduce*, *implement*, *adopt*).
5. Confirm in a collocation dictionary.

Convincing evidence: many lines from many sources for *take measures* (and *adopt measures*), with the right meaning, and the dictionary listing them. A typical result is that *take measures* and *introduce* / *adopt* / *implement measures* are all natural in formal writing, while *make measures* is not used in this sense.
:::
:::

::: exercise British or American? {level=2}
Describe how you would find out whether these pairs differ between British and American English, and give the result you expect if you know it: (1) *fill in a form* / *fill out a form*; (2) *have a shower* / *take a shower*.
::: solution
Method for both: search each phrase (all verb forms) in a British corpus and an American corpus, normalise, read the lines, and confirm in a learner's dictionary with variety labels.

Expected results: (1) *fill in a form* is the usual British phrase; *fill out a form* is usual in American English and is also used in British English. (2) *have a shower* is typical of British English and *take a shower* of American English, though both are understood everywhere. Check these in a current corpus: varieties influence each other, and older corpora may not show the newest usage.
:::
:::

::: exercise Investigate a word {level=3}
Choose a noun from your own field of study (for example *data*, *hypothesis*, *policy*, *patient*). Using a free corpus tool, find (a) its five most frequent verb collocates, (b) its five most frequent adjective collocates, (c) its typical prepositions, and (d) the section of the corpus in which it is most frequent. Write a short report (100–150 words) of what you found, with one example sentence of your own for each part, and say which association score or sorting you used.
::: hint
In SkELL, the "word sketch" shows collocates by grammatical relation; in English-Corpora.org, use the collocates search with a part-of-speech filter, or the word's own page.
:::
::: solution
Answers will differ. A model report for *hypothesis*:

> *I searched for* hypothesis *in an academic section of a large corpus and sorted collocates by frequency. The most frequent verbs were* test, support, confirm, reject *and* propose *(*The data support the hypothesis*). The adjectives were* null, alternative, main, working *and* initial *(*Our working hypothesis was that age would matter*). The typical prepositions were* about *and* that-*clauses (*the hypothesis that …*) (*There is a hypothesis about the origin of the disease*). The word was much more frequent in the academic section than in the spoken or fiction sections, which shows that it belongs to formal, academic register.*

Check that each claim names the tool and the sorting, and that each example sentence uses the collocation exactly as found.
:::
:::

::: exercise Evaluate the evidence {level=3}
A classmate argues: "*Learn knowledge* is correct English. I searched for it on the web and found more than 100,000 results." Write a reply (80–120 words) explaining why this is weak evidence and what better evidence would show.
::: solution
A model reply:

> *A web hit count is an estimate, not a count, and the web contains a lot of text written by learners and by machine translation — including exactly the phrases learners are unsure about. It also tells us nothing about who wrote the text. Better evidence would come from a corpus of edited English: there,* learn knowledge *is very rare, while* gain *or* acquire knowledge *and simply* learn a lot *are frequent. A learner's dictionary confirms this: its entry for* knowledge *lists verbs like* gain, acquire *and* have, *not* learn. *So the phrase is understandable, but not the natural choice.*

Key points: hit counts are estimates; the web is not a controlled sample; compare alternatives in a corpus; confirm in a dictionary.
:::
:::
