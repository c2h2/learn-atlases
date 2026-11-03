Read this short text and count how many times each word appears.

> *Tom has a dog. The dog is big and brown. Every morning Tom and the dog go to the park. In the park the dog runs and Tom reads a book.*

The text has 31 words. The word *the* appears 5 times, *dog* 4 times, *and* and *Tom* 3 times each, and *a* and *park* twice. Each of the other twelve words appears only once. If you knew just the six most frequent words of this text, you would already know 19 of its 31 words — more than half.

This is not an accident of one short text. In every long text, in every language that has been studied, a few words are used very often and most words are used rarely. This simple fact has a big consequence for learners: **some words are much more useful than others**, so the order in which you learn words matters. This chapter explains how words are counted, what **coverage** means, what research says about how many words a reader needs, and how to decide which words to learn first.

## Counting words

Before we can say how frequent a word is, we must decide what counts as "one word". There are several answers, and each is useful for something.

::: definition Tokens and types {#def-token-type}
**Tokens** (形符) are all the words in a text, counted every time they appear. **Types** (类符) are the different word forms in a text, each counted once.
:::

In the sentence *The cat sat on the mat*, there are 6 tokens but only 5 types, because *the* appears twice. (We usually ignore capital letters, so *The* and *the* are the same type.)

::: definition Lemma and word family {#def-lemma-family}
A **lemma** (词元) is a base form together with its inflected forms in the same word class: *work*, *works*, *worked*, *working* (verb) are one lemma. A **word family** (词族) is wider: the base form, its inflected forms and its common derived forms, such as *work*, *worker*, *workable*, *rework*.
:::

Research on reading usually counts word families, because a learner who knows *work* well can usually understand *worker* when they meet it. The chapter [[core-vocabulary/word-families]] looks at families in detail. When you read a number like "8,000 words", always ask: tokens, types, lemmas or families? A dictionary that has "100,000 words" counts headwords; a research paper that says "8,000 words" may mean 8,000 families, which is many more forms.

::: example Counting tokens and types {#ex-count-tokens}
How many tokens and how many types are in this sentence? *The cat sat on the mat and the dog sat on the floor.*
::: solution
**Tokens.** Count every word: *The* (1) *cat* (2) *sat* (3) *on* (4) *the* (5) *mat* (6) *and* (7) *the* (8) *dog* (9) *sat* (10) *on* (11) *the* (12) *floor* (13). There are **13 tokens**.

**Types.** List each different word once, ignoring capitals: *the*, *cat*, *sat*, *on*, *mat*, *and*, *dog*, *floor*. There are **8 types**.

Check: *the* appears 4 times, *sat* twice, *on* twice, and the other 5 types once each: 4 + 2 + 2 + 5 = 13.
:::
:::

::: quiz
How many **lemmas** are there in *Anna plays tennis. Her brother played football. They both like playing.*?
- [ ] 11
- [x] 9
- [ ] 7
- [ ] 13
::: solution
There are 11 tokens: *Anna, plays, tennis, Her, brother, played, football, They, both, like, playing*. *Plays*, *played* and *playing* are three forms of one lemma, *play*. So the lemmas are *Anna, play, tennis, her, brother, football, they, both, like*: 9 lemmas.
:::
:::

## A few words do most of the work

When researchers count the words in a large collection of texts — a **corpus** (语料库) — they always find the same pattern. One of the first large computer corpora was the Brown Corpus, about one million words of American English printed in 1961, put together at Brown University by W. Nelson Francis and Henry Kučera. In it:

- *the* is the most frequent word, with 69,971 tokens — nearly 7% of all the words;
- *of* is second, with 36,411 tokens — a little over 3.5%;
- *and* is third, with 28,852 tokens — about 2.8%.

So these three words alone make up about 13% of the corpus — between one word in seven and one in eight. At the other end, thousands of words appear only once.

::: theorem Frequency falls steeply with rank {#rule-zipf}
If the words of a large text are put in order of frequency, a word's frequency is roughly inversely proportional to its **rank** (its place in the list): the second word is used about half as often as the first, the third about a third as often, and so on. This tendency is called **Zipf's law** (齐夫定律). It is a good description of the most frequent few thousand words, and only approximate after that.
:::

::: proof
The pattern is named after the American linguist George Kingsley Zipf, who described it in *The Psycho-Biology of Language* (1935) and *Human Behavior and the Principle of Least Effort* (1949). It is not a law of grammar but a regularity found by counting. The Brown Corpus shows it roughly: half of the 69,971 tokens of *the* would be about 35,000, and *of* has 36,411; a third would be about 23,300, and *and* has 28,852. Real counts never fit the formula exactly. Why the pattern appears is still discussed; one simple reason is that the most frequent words are short **function words** — *the*, *of*, *and*, *to*, *a* — which are needed in almost every sentence, whatever the topic. The chapter [[core-vocabulary/function-words]] is about them.
:::

::: widget plot
f: 100/(x*(ln(V) + 0.5772))
x: 1, 20
y: 0, 10
sliders: V=50000:5000:200000:5000
points: 1,6.9; 2,3.59; 3,2.84
labels: Zipf model: share of all tokens (%)
caption: The line is Zipf's model: the word at rank $r$ makes up about $1/r$ of the share of the most frequent word. The slider sets how many different words (types) the model has in total. The three dots are the real shares of *the*, *of* and *and* in the Brown Corpus (6.9%, 3.59% and 2.84%). The model is close but not exact — real counts never follow the formula perfectly. Notice how quickly the line falls: by rank 20 each word has well under 1% of the text.
:::

## Coverage

The steep fall in frequency means that a learner who knows the most frequent words already knows a large part of any text. We measure this with **coverage**.

::: definition Text coverage {#def-coverage}
**Text coverage** (文本覆盖率) is the percentage of the tokens in a text that a reader knows (or that a given word list contains):

coverage = (tokens known ÷ all tokens) × 100%.
:::

In the opening text about Tom and his dog, the six most frequent words give a coverage of 19 ÷ 31 ≈ 61%. A real reader knows many more words than six, of course. The question that research asks is: **how much coverage does a reader need to understand a text?**

::: example What does 95% coverage mean on a page? {#ex-coverage-page}
A page of a graded reader has 300 words. How many words on the page are unknown if a reader's coverage is (a) 95%, (b) 98%? How often does the reader meet an unknown word?
::: solution
(a) 95% known means 5% unknown: 5% of 300 = 0.05 × 300 = **15 unknown words** on the page. That is one unknown word in every 20 words — about one in every two lines of a printed book.

(b) 98% known means 2% unknown: 0.02 × 300 = **6 unknown words**. That is one unknown word in every 50 words — about one in every four or five lines.

The difference between 95% and 98% looks small, but it is the difference between 15 and 6 unknown words on the page. For a reader, that changes reading from hard work into something closer to pleasure.
:::
:::

## How much coverage, and how many words?

Several studies have tested how coverage affects reading. Here are the best known. Each study used different texts and readers, so the numbers are guides, not exact rules.

| study | what was tested | main finding |
|---|---|---|
| Laufer (1989) | learners' scores on reading tests compared with the share of words in the text they knew | readers who knew at least **95%** of the words were much more likely to reach a reasonable level of comprehension |
| Hu & Nation (2000) | the same story with 80%, 90%, 95% and 100% of the words known (unknown words replaced by made-up words) | for most learners to understand a story well without help, about **98%** coverage was needed |
| Laufer & Ravenhorst-Kalovski (2010) | vocabulary size and reading scores of a large group of learners | 95% coverage is a minimal level and 98% an optimal one; about **4,000–5,000** word families give 95% and about **8,000** give 98% |
| Nation (2006) | how many word families are needed for 98% coverage of different kinds of text, using lists from the British National Corpus | about **8,000–9,000** word families for written texts such as novels and newspapers; about **6,000–7,000** for unscripted spoken English |
| Webb & Rodgers (2009) | the words in film scripts | about **3,000** word families (plus proper nouns) give 95% coverage of films, and about **6,000** give 98% |

::: theorem Coverage thresholds for reading {#rule-coverage-thresholds}
Research suggests that reading without help usually needs at least **95%** coverage (one unknown word in 20) and is comfortable at about **98%** (one unknown word in 50). For general English, 98% coverage of written texts needs a vocabulary of roughly **8,000–9,000 word families** (Nation 2006); spoken English needs somewhat fewer.
:::

::: proof
The thresholds come from studies like those in the table, which compared how much readers understood with how many words they knew. They are not sharp borders: comprehension rises gradually with coverage, and readers with good background knowledge or strong reading skills can understand more at the same coverage. Spoken English needs fewer words because conversation repeats the most frequent words more. Graded readers, which use a limited vocabulary, are written so that learners can read at high coverage early on — see [[reading-skills/extensive-reading]].
:::

These numbers can look frightening. 8,000 word families is a lot. But remember three things:

1. **You do not start from zero.** Coverage rises fastest at the beginning. The first thousand or two word families give a large share of every text, because they include *the*, *of*, *and* and the other function words, and the commonest nouns, verbs and adjectives.
2. **Many words are related.** A word family counts *decide*, *decision*, *decisive* and *undecided* as one. Knowing word parts helps a lot ([[core-vocabulary/word-families]]).
3. **Graded material exists.** Graded readers and texts written for learners keep the vocabulary within a limit, so you can read at 98% coverage long before you know 8,000 families.

::: warning "Knowing 95% of the words means understanding 95% of the text"
This is a common misunderstanding. Coverage measures **words**, not **understanding**. At 95% coverage you still meet an unknown word every 20 words, and some of those may be key words. In Hu & Nation's (2000) study, many learners at 95% coverage did not reach good comprehension. Also, "known" in these studies means the reader knows the word well enough in that context — not just that the word looks familiar.
:::

::: quiz
A text has 500 tokens. A reader knows 480 of them. What is the reader's coverage?
- [ ] 80%
- [ ] 95%
- [x] 96%
- [ ] 98%
::: solution
480 ÷ 500 = 0.96, which is 96%. That is above the 95% minimum but below the 98% level that research links with comfortable reading.
:::
:::

## High-, mid- and low-frequency words

Researchers often divide the vocabulary of English into bands by frequency. One widely used division is that of Schmitt and Schmitt (2014):

| band | word families | how to learn them |
|---|---|---|
| high-frequency | the most frequent **3,000** or so | worth deliberate study, and worth learning for use (productively) |
| mid-frequency | from about 3,000 to about **9,000** | needed for reading real texts; learned through much reading and listening, plus deliberate study of the words you meet often |
| low-frequency | beyond about 9,000 | met rarely; learned when needed, or guessed from context and word parts |

A fourth group cuts across these bands: **specialised vocabulary**, the words of a subject or a kind of text. For university study in English, Averil Coxhead's *Academic Word List* (2000) collected 570 word families, such as *analyse*, *concept* and *significant*, that are frequent in academic texts across many subjects but not among the most frequent general words. In her corpus of academic texts they covered about 10% of the tokens. The course *Collocation and Register* returns to this in [[collocation-and-register/academic-vocabulary]].

::: theorem Learn the most frequent words first, then the words you need {#rule-learn-frequent-first}
In general, a learner gains most by learning high-frequency words first and learning them well. After that, the choice should also depend on need: a nurse, an engineer and a student of history each need different specialised words.
:::

::: proof
Frequency gives the best return: a high-frequency word appears in almost every text, so each one adds to coverage everywhere, while a low-frequency word may not appear again for months. But frequency lists are made from large general corpora, so they do not show what a particular learner needs. A word like *patient* (noun) or *prescription* may be of medium frequency in general English but essential for a nurse. Nation (2013) recommends deliberate attention to high-frequency words and to the specialised words of the learner's field, and strategies such as guessing from context and using word parts for low-frequency words.
:::

::: example Which words to learn first? {#ex-which-first}
Wang Fang is reading a simple story and meets five words she does not know: *afraid*, *lantern*, *during*, *shiver*, *quickly*. She has time to learn three of them well today. Which three should she choose, and why?
::: solution
She should think about frequency and about how useful each word is in many different texts.

- *during* — a very frequent function word (a preposition: *during the night*). It will appear in almost every story and textbook. **Learn it.**
- *quickly* — very frequent, and part of the family *quick*, *quickly*, *quickness*. **Learn it.**
- *afraid* — frequent in stories and in everyday speech (*I'm afraid of dogs*; *I'm afraid I can't come*). **Learn it.**
- *shiver* — less frequent. It is worth noticing (‘shake because you are cold or afraid’), but it can wait.
- *lantern* — low-frequency. The story may need it, but she will rarely meet it again. A quick look at the meaning is enough.

Good choice: *during*, *quickly*, *afraid*. A learner's dictionary helps here, because many of them mark the most frequent words ([[core-vocabulary/using-a-dictionary]]).
:::
:::

::: example Estimating coverage of a short text {#ex-estimate-coverage}
Here is a short message:

> *Sorry, I can't come to the meeting tomorrow. My daughter is ill and I have to take her to the doctor.*

A learner knows every word except *meeting* and *daughter*. What is her coverage, and is she likely to understand the message?
::: solution
Count the tokens. *Sorry* (1) *I* (2) *can't* (3) *come* (4) *to* (5) *the* (6) *meeting* (7) *tomorrow* (8) *My* (9) *daughter* (10) *is* (11) *ill* (12) *and* (13) *I* (14) *have* (15) *to* (16) *take* (17) *her* (18) *to* (19) *the* (20) *doctor* (21). There are 21 tokens (counting *can't* as one word).

Unknown: 2 tokens. Known: 19. Coverage = 19 ÷ 21 ≈ 0.905, about **90%**.

That is below the 95% level, and the unknown words are important ones: *meeting* tells you what the writer cannot come to, and *daughter* who is ill. She may understand the general message (the writer cannot come because someone is ill) but miss key details. This shows that coverage is only part of the story: **which** words are unknown matters too.
:::
:::

::: note English and Chinese
Chinese readers often think about vocabulary in terms of **characters**. Counts of Chinese texts show a similar pattern: a few thousand characters make up almost all of ordinary written Chinese. But an English "word family" and a Chinese character are different units, so the numbers cannot be compared directly. A Chinese word (词) is often two characters (学习, 电脑), and knowing both characters does not always mean knowing the word. English word families have the same kind of problem: knowing *under* and *stand* does not tell you the meaning of *understand*.
:::

::: history
Counting words to choose what to teach is about a hundred years old. The American psychologist Edward Thorndike published *The Teacher's Word Book* (1921), a list of 10,000 English words ranked by frequency, counted by hand from millions of words of text, and later *The Teacher's Word Book of 30,000 Words* with Irving Lorge (1944). Michael West's *A General Service List of English Words* (1953) chose about 2,000 headwords for learners, using both frequency and usefulness. Computers changed the work: the Brown Corpus (texts from 1961) was followed by much larger corpora such as the 100-million-word British National Corpus (1994). Zipf's books of 1935 and 1949 described the shape of the frequency curve, and Laufer (1989), Hu & Nation (2000) and Nation (2006) connected coverage with reading.
:::

## Where this leads

Word families make the numbers in this chapter more manageable: [[core-vocabulary/word-families]]. The most frequent words of all are function words: [[core-vocabulary/function-words]]. To learn high-frequency words well and keep them, see [[core-vocabulary/learning-and-remembering]]. In the course *Reading Skills*, [[reading-skills/words-from-context]] shows what to do with the unknown words that remain, and [[reading-skills/extensive-reading]] shows how reading at high coverage builds vocabulary.

::: summary
- Words can be counted as **tokens** (every occurrence), **types** (different forms), **lemmas** (a base form and its inflections) or **word families** (also derived forms).
- A few words are very frequent and most are rare. In the Brown Corpus, *the* alone is nearly 7% of all tokens. **Zipf's law** describes this roughly: frequency is about inversely proportional to rank.
- **Coverage** is the percentage of tokens in a text that a reader knows.
- Research suggests about **95%** coverage for reading with effort and **98%** for comfortable reading (Laufer 1989; Hu & Nation 2000; Laufer & Ravenhorst-Kalovski 2010).
- 98% coverage of written English needs roughly **8,000–9,000 word families**, and spoken English about 6,000–7,000 (Nation 2006).
- Learn the high-frequency words first and well, then the words you need for your purposes; graded readers let you read at high coverage early.
:::

## Exercises

::: exercise Count the tokens {level=1 check="13"}
How many tokens are in this sentence? *I like tea, but my sister likes coffee and my brother likes milk.*
::: solution
*I* (1) *like* (2) *tea* (3) *but* (4) *my* (5) *sister* (6) *likes* (7) *coffee* (8) *and* (9) *my* (10) *brother* (11) *likes* (12) *milk* (13). There are **13** tokens. Punctuation marks are not counted.
:::
:::

::: exercise Count the types {level=1 check="11"}
How many types are in the same sentence? *I like tea, but my sister likes coffee and my brother likes milk.*
::: hint
*Like* and *likes* are different forms, so they are different types.
:::
::: solution
The different forms are *I, like, tea, but, my, sister, likes, coffee, and, brother, milk*: **11** types. *My* appears twice and *likes* appears twice, so 13 tokens give 11 types. (They make 10 lemmas, because *like* and *likes* are one lemma.)
:::
:::

::: exercise Calculate coverage {level=1 check="98"}
A text has 400 tokens. A reader knows 392 of them. What is the reader's coverage, in per cent?
::: solution
392 ÷ 400 = 0.98, so the coverage is **98%**. That is the level research links with comfortable reading.
:::
:::

::: exercise Lemmas in a family {level=2 check="4"}
The words *happy*, *happier*, *happiness*, *unhappy* and *happily* belong to one word family. How many lemmas are they?
::: solution
*Happy* and *happier* are one lemma (the comparative is an inflected form of the adjective). *Happiness* (noun), *unhappy* (a different adjective, made with a prefix) and *happily* (adverb) are each a lemma of their own. So there are **4** lemmas: *happy*, *happiness*, *unhappy*, *happily*. All of them are one word family.
:::
:::

::: exercise Unknown words on a page {level=2 check="10"}
A page has 250 words, and a reader's coverage is 96%. How many unknown words are there on the page?
::: solution
Unknown = 100% − 96% = 4%. 4% of 250 = 0.04 × 250 = **10** unknown words, about one every 25 words.
:::
:::

::: exercise Zipf's law {level=2 check="1500"}
In a corpus, the most frequent word appears 6,000 times. If the corpus followed Zipf's law exactly, about how many times would the fourth most frequent word appear?
::: solution
Zipf's law says frequency is inversely proportional to rank, so the word at rank 4 appears about 1/4 as often as the word at rank 1: 6,000 ÷ 4 = **1,500** times. Real corpora only follow this roughly ([[#rule-zipf]]).
:::
:::

::: exercise Choosing words for a purpose {level=3}
Chen Yu is a nurse who is going to work in a hospital in Australia. Which of these words should she learn **first** and learn well enough to use, and which can wait? Explain your choices using [[#rule-learn-frequent-first]].

*although*, *temperature*, *injection*, *stethoscope*, *however*, *patient*, *ancestor*, *pain*, *harpoon*
::: solution
Learn first, for use:

- *although*, *however* — frequent general words (linking words) that she will need in speech and writing.
- *patient*, *pain*, *temperature* — frequent in general English and essential in her job.
- *injection* — not among the most frequent general words, but central to her specialised vocabulary.

Can wait or only needs recognition:

- *stethoscope* — specialised and useful in her job, but she will mostly need to recognise it; she can learn it when she meets it.
- *ancestor*, *harpoon* — low-frequency and not related to her needs.

Other reasonable answers are possible (for example, putting *stethoscope* in the first group), as long as the reasons combine frequency and need.
:::
:::

::: exercise Is this text right for you? {level=3}
Choose a page of English that you would like to read (a graded reader, a news story for learners, a short article). Count the tokens on half a page, mark every word you do not know, and calculate your coverage. Then decide: is this text good for (a) reading for pleasure, (b) careful study with a dictionary, or (c) not yet? Explain your decision in two or three sentences.
::: hint
Use the thresholds in [[#rule-coverage-thresholds]]. If you count 150 tokens, then 98% means about 3 unknown words and 95% about 7 or 8.
:::
::: solution
Answers will differ. A model answer:

*I counted 160 tokens and marked 6 unknown words, so my coverage is 154 ÷ 160 ≈ 96%. That is above 95% but below 98%, so the text is good for careful study with a dictionary, but it is a little too hard for reading for pleasure. For pleasure reading I should choose an easier book where I meet only two or three unknown words on half a page.*

A good answer shows the counting, the calculation and a decision based on the 95% and 98% levels.
:::
:::

::: exercise Explaining a plan {level=3}
A friend says: *I'm going to learn English vocabulary by starting at page 1 of a big dictionary and learning every word in order.* Write a short reply (60–100 words) in English that explains why this is not a good plan and suggests a better one. Use at least two facts from this chapter.
::: solution
A model reply:

*That will take a very long time, and many of the words will be rare. A big dictionary has words like "aardvark" on its first pages, which you may never read again. A few words do most of the work: in the Brown Corpus, "the" alone is nearly 7% of all the words. It is better to learn the most frequent words first. Research says you need about 98% coverage to read comfortably, so read graded readers and learn the words you meet often.*

A good answer mentions frequency (Zipf's law or the Brown Corpus figures) and coverage (95% or 98%), and suggests learning frequent words first and reading at a suitable level.
:::
:::
