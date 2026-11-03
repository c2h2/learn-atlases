Zhao Lin sends a quick text message to a friend:

> *Arrive station six. Meet café near exit. Bring umbrella — rain.*

Her friend understands it. The message keeps only the words with clear meanings: *arrive*, *station*, *six*, *meet*, *café*, *exit*, *bring*, *umbrella*, *rain*. Now compare the full English sentences:

> *I'll arrive at the station at six. Let's meet in the café near the exit. Bring an umbrella — it's going to rain.*

The full version adds words such as *I*, *'ll*, *at*, *the*, *in*, *an*, *it* and *going to*. These small words carry little meaning on their own, but without them the sentences are not normal English. They are **function words**. They are also the most frequent words in the language: [[core-vocabulary/frequency-and-coverage]] showed that *the*, *of* and *and* alone make up about 13% of a large corpus. This chapter explains what function words are, why they matter so much, why they are hard for Chinese speakers, and why they are best learned in phrases.

## Content words and function words

::: definition Content words and function words {#def-content-function}
**Content words** (实词) carry most of the meaning of a sentence: nouns (*station*, *umbrella*), main verbs (*arrive*, *bring*), adjectives (*small*, *wet*) and most adverbs (*quickly*). **Function words** (虚词, sometimes called *grammar words*) mainly show how the content words are related: articles and other determiners (*the*, *a*, *this*, *some*), pronouns (*I*, *it*, *them*), prepositions (*at*, *in*, *of*), conjunctions (*and*, *but*, *because*), auxiliary and modal verbs (*be*, *have*, *do*, *will*, *can*), and a few others (*not*, *to* before a verb, *there* in *there is*).
:::

There is another difference. Content words are an **open class**: new nouns, verbs and adjectives enter English all the time (*selfie*, *podcast*, *to google*). Function words are a **closed class**: English has a few hundred of them, and new ones are very rarely added. So you can learn all the function words of English — and you will meet them on every page.

| group | examples | what they do |
|---|---|---|
| articles and determiners | *a*, *an*, *the*, *this*, *that*, *my*, *some*, *every* | show which or how many: *the station*, *my bag* |
| pronouns | *I*, *you*, *she*, *it*, *we*, *they*, *me*, *them*, *who* | stand for nouns: *Bring it.* |
| prepositions | *at*, *in*, *on*, *of*, *for*, *with*, *from*, *to*, *near* | show place, time and other relations: *at six*, *near the exit* |
| conjunctions | *and*, *but*, *or*, *because*, *if*, *when*, *that* | join words and clauses: *tea and coffee*; *I stayed at home because it rained.* |
| auxiliary and modal verbs | *be*, *have*, *do*, *will*, *can*, *must*, *should* | build tenses, questions and negatives, and add meanings such as ability: *Do you know? I can swim.* |
| others | *not*, *to* (before a verb), *there* (in *there is*), *it* (in *it's raining*) | negation, infinitives, "empty" subjects |

Word classes in general are introduced in [[core-grammar/word-classes]].

::: quiz
How many function-word **tokens** are in *She put the keys on the table.*?
- [ ] 2
- [ ] 3
- [x] 4
- [ ] 5
::: solution
The function words are *She* (pronoun), *the* (article), *on* (preposition) and *the* again: **4** tokens (but only 3 types, because *the* appears twice). The content words are *put*, *keys* and *table*.
:::
:::

## Why function words are so frequent

Every sentence needs function words, whatever its topic. A text about football and a text about chemistry share few content words, but both are full of *the*, *of*, *and*, *to*, *a* and *in*. That is why function words are at the top of every frequency list.

::: theorem The most frequent words are function words {#rule-function-frequent}
In large corpora of English, the most frequent words are almost all function words. In the Brown Corpus ([[core-vocabulary/frequency-and-coverage]]) the three most frequent words are *the*, *of* and *and*, and the rest of the top ten are function words too, such as *to*, *a*, *in*, *that* and *is*. In ordinary texts, function words usually make up a large share of the tokens — often close to half.
:::

::: proof
Function words express grammatical relations — which, where, when, how many, who did what to whom — and these are needed in nearly every clause. Content words express the topic, and topics change from text to text, so each content word is used much less often. A closed class of a few hundred words that are used everywhere must have very high frequencies. The exact share of function words depends on the text and on how they are counted (for example, whether *be* and *have* count as function words when they are main verbs), so "close to half" is a rough guide, not a fixed number; the next example shows how to count it in a real text.
:::

::: example Counting function words in a short text {#ex-count-function}
What share of the tokens in this text are function words?

> *My sister lives in a small town near the sea. She works at a hotel, and in the evenings she walks on the beach with her dog.*
::: solution
Mark each token as content (C) or function (F):

*My* F, *sister* C, *lives* C, *in* F, *a* F, *small* C, *town* C, *near* F, *the* F, *sea* C — 10 tokens, 5 F.

*She* F, *works* C, *at* F, *a* F, *hotel* C, *and* F, *in* F, *the* F, *evenings* C, *she* F, *walks* C, *on* F, *the* F, *beach* C, *with* F, *her* F, *dog* C — 17 tokens, 11 F.

Total: 27 tokens, of which 16 are function words: 16 ÷ 27 ≈ 59%. More than half of this text is function words, although they are only 11 different words (*my*, *in*, *a*, *near*, *the*, *she*, *at*, *and*, *on*, *with*, *her*). The 11 content words (*sister*, *lives*, *small*, *town*, *sea*, *works*, *hotel*, *evenings*, *walks*, *beach*, *dog*) tell us what the text is about.
:::
:::

::: widget markov
matrix: 0,0,0.5,0.5,0,0,0; 0,0,0.5,0.5,0,0,0; 0,0,0,0,0.4,0.4,0.2; 0,0,0,0,0.4,0.4,0.2; 0.5,0.5,0,0,0,0,0; 0.5,0.5,0,0,0,0,0; 0.25,0.25,0.25,0.25,0,0,0
states: the; a; cat; dog; saw; chased; and
start: 0
steps: 30
caption: A tiny hand-made model of word order, in the style of Shannon's (1948) approximations to English. Each arrow gives the chance that one word follows another: after *the* or *a* comes a noun; after a noun comes a verb or *and*; after a verb comes *the* or *a* again. Run the walk to generate "sentences" such as *the cat saw a dog and the cat chased …*. The content words never follow each other directly: the function words *the*, *a* and *and* sit between them. In the long run (the stationary distribution) these three function words make up almost 40% of the words — a toy model, but a similar picture to real texts.
:::

## Function words in speech

Because function words are so frequent and so predictable, English speakers say them quickly and quietly. Most function words have two pronunciations: a **strong form**, used when the word is stressed or said alone, and a **weak form**, used in normal connected speech, usually with the vowel /ə/.

| word | strong form | weak form | example |
|---|---|---|---|
| *to* | /tuː/ | /tə/ | *I want to go.* /aɪ ˈwɒnt tə ˈɡəʊ/ (GB) |
| *for* | /fɔː/ (GB), /fɔːr/ (GA) | /fə/ (GB), /fər/ (GA) | *This is for you.* |
| *and* | /ænd/ | /ənd/, /ən/ | *fish and chips* |
| *of* | /ɒv/ (GB), /ʌv/ (GA) | /əv/ | *a cup of tea* |
| *can* | /kæn/ | /kən/ | *I can swim.* |
| *at* | /æt/ | /ət/ | *at six* |
| *was* | /wɒz/ (GB), /wʌz/ (GA) | /wəz/ | *It was late.* |

::: theorem Function words are usually unstressed {#rule-weak-forms}
In normal speech, function words are usually unstressed and said in their weak forms, while content words carry the stress. Function words take their strong forms when they are stressed for emphasis or contrast (*It's for you, not for him*), when they are said alone, and often at the end of a phrase (*Who's it for?* /fɔː/).
:::

::: proof
English speech has a rhythm built on stressed syllables, and the stressed syllables are mostly in the content words, which carry the new information. Function words are predictable from the grammar, so speakers can reduce them without losing meaning. This is why learners who know every word of a sentence may still not hear *to* or *of* in fast speech: they are listening for /tuː/ and /ɒv/ and hearing /tə/ and /əv/. [[connected-speech/weak-forms]] gives the full list of weak forms and practice in hearing them; [[sounds-of-english/word-stress-basics]] explains stress.
:::

::: example Marking weak forms {#ex-weak-forms}
Which words in this sentence are usually said in their weak forms? *I want to go to the shop for some bread and milk.*
::: solution
The content words *want*, *go*, *shop*, *bread* and *milk* are stressed. The function words that usually have weak forms here are:

- *to* (twice) → /tə/
- *the* → /ðə/
- *for* → /fə/ (GB), /fər/ (GA)
- *some* → /səm/
- *and* → /ən/

*I* is a function word too, but it has no weak form with /ə/; it is simply unstressed. In fast speech the sentence sounds roughly like *I WANT tə GO tə thə SHOP fə səm BREAD ən MILK*.
:::
:::

## Learning function words in phrases

The meanings of function words are often hard to explain on their own. What does *at* mean? Or *of*? It is much easier to learn them in the phrases where they appear: *at six*, *at the station*, *at home*, *a cup of tea*, *one of my friends*.

::: theorem Learn function words in phrases {#rule-phrases}
Learn prepositions, articles and other function words together with the words they go with, as short phrases: *on Monday*, *in May*, *at night*, *in the morning*, *by bus*, *on foot*, *interested in*, *afraid of*, *listen to*. Learn the whole phrase, not the function word and a translation.
:::

::: proof
Many uses of function words follow patterns that can be explained (*at* for points of time, *on* for days, *in* for longer periods: [[core-grammar/prepositions-time-place]]), but many others are fixed by the word they go with: we say *interested in* but *keen on*, *afraid of* but *frightened by* (or *of*), *on foot* but *by bus*. No translation of *in* or *on* can predict these. Learning the phrase stores the function word with its partner, so it comes out correctly in speech. The chapter [[core-vocabulary/phrases-and-chunks]] develops this idea.
:::

Here are some useful groups to learn as phrases:

- **time**: *at six o'clock*, *at night*, *at the weekend* (BrE) / *on the weekend* (AmE), *on Monday*, *on 3 May*, *in May*, *in 2026*, *in the morning*
- **place**: *at home*, *at work*, *at school*, *in the kitchen*, *on the table*, *on the wall*, *in London*
- **transport**: *by bus*, *by train*, *by car*, *on foot*, *get on the bus*, *get in the car*
- **adjective + preposition**: *interested in*, *good at*, *afraid of*, *proud of*, *different from*, *married to*
- **verb + preposition**: *listen to*, *look at*, *wait for*, *depend on*, *belong to*

::: example Choosing at, on or in {#ex-at-on-in}
Complete each phrase with *at*, *on* or *in*, and say which pattern it follows.

1. *___ Friday*
2. *___ half past eight*
3. *___ the summer*
4. *___ my birthday*
5. *___ night*
::: solution
1. *on Friday* — days take *on*.
2. *at half past eight* — clock times take *at*.
3. *in the summer* — seasons and longer periods take *in*.
4. *on my birthday* — a particular day takes *on*.
5. *at night* — a fixed phrase; compare *in the morning*, *in the afternoon*, *in the evening*, but *at night*. Learn it as a whole.
:::
:::

::: note English and Chinese
Chinese also has function words (虚词): 的, 了, 吗, 呢, 在, 和, 把, 被 and others. But the two languages use them differently, and several English function words have no Chinese counterpart:

- **Articles.** Chinese has no articles, so *a*, *an* and *the* are among the most frequent words in English and among the hardest for Chinese speakers. See [[nouns-and-articles/a-and-the]].
- **Auxiliary *do*.** English needs *do* to make most questions and negatives: *Do you live here? I don't know.* Chinese uses 吗 and 不 without an extra verb. See [[core-grammar/questions-and-negatives]].
- **"Empty" subjects.** English needs a subject even when nothing is doing the action: *It's raining. It's late. There is a problem.* Chinese says 下雨了, 很晚了, 有个问题.
- **And.** Chinese 和 usually joins nouns (我和你). English *and* also joins verbs and whole clauses: *I went home and had dinner.*
- **Prepositions.** Chinese 在 covers many uses of *at*, *in* and *on*, so the English choice has to be learned phrase by phrase.

Because these words are short and unstressed, learners can leave them out without noticing, and listeners usually still understand. But the result sounds like the text message at the start of this chapter.
:::

::: warning Missing function words
These mistakes are common because the Chinese sentence has no word in that place.

- ✗ *She very happy.* ✓ *She is very happy.* (*be* is needed before an adjective)
- ✗ *Where you live?* ✓ *Where do you live?*
- ✗ *I am agree with you.* ✓ *I agree with you.* (here an extra *be* is added)
- ✗ *Is raining.* ✓ *It's raining.*
- ✗ *I bought book yesterday.* ✓ *I bought a book yesterday.*
- ✗ *I'll see you in Monday.* ✓ *I'll see you on Monday.*
:::

::: quiz
Which sentence is correct?
- [ ] *My brother good at maths.*
- [ ] *My brother is good in maths.*
- [x] *My brother is good at maths.*
- [ ] *My brother is good on maths.*
::: solution
The sentence needs the verb *is* before the adjective, and the fixed phrase is *good at* (something). *Good in* and *good on* are not used for school subjects.
:::
:::

::: example Rebuilding a short message {#ex-rebuild}
Rewrite the text message from the start of the chapter as full, natural English, then list the function words you added and say what each one does.

> *Arrive station six. Meet café near exit. Bring umbrella — rain.*
::: solution
One natural version:

> *I'll arrive at the station at six. Let's meet in the café near the exit. Bring an umbrella — it's going to rain.*

Function words added:

- *I*, *it* — pronouns as subjects (English sentences need a subject; *it* is the "empty" subject of *rain*).
- *'ll* (*will*) and *'s going to* — auxiliary forms that place the actions in the future.
- *at* (twice), *in*, *near* — prepositions of place and time (*near* was already in the message).
- *the* (three times), *an* — articles: the station, café and exit are known to both people; *an umbrella* is any umbrella.
- *Let's* (*let us*) — a fixed way to make a suggestion.

Other correct versions are possible, for example *I arrive at the station at six* (a timetable fact).
:::
:::

::: history
The difference between words that carry meaning and words that show grammar is old. Chinese scholars had long distinguished "full" and "empty" words, and Ma Jianzhong's 《马氏文通》 (1898), the first systematic grammar of Chinese written in Chinese, divided words into 实字 and 虚字 — the source of today's terms 实词 and 虚词. In English grammar, Henry Sweet's *A New English Grammar* (1891) separated "full words" from "form-words". The term *function words* comes from the American linguist Charles C. Fries, whose *The Structure of English* (1952), based on recordings of real telephone conversations, set apart four large classes of content words from fifteen small groups of function words. Corpus counts from the 1960s onwards showed how frequent function words are.
:::

## Where this leads

Articles are the subject of [[nouns-and-articles/a-and-the]]; prepositions of time and place of [[core-grammar/prepositions-time-place]]; auxiliaries in questions and negatives of [[core-grammar/questions-and-negatives]]; pronouns of [[core-grammar/nouns-pronouns]]. Weak forms in fast speech are practised in [[connected-speech/weak-forms]]. The next step in this course is to learn function words inside larger chunks: [[core-vocabulary/phrases-and-chunks]].

::: summary
- **Content words** (nouns, main verbs, adjectives, most adverbs) carry meaning; **function words** (determiners, pronouns, prepositions, conjunctions, auxiliaries and modals, *not*, *to*, *there*) show how the content words are related.
- Function words are a **closed class** of a few hundred words, but they are the most frequent words of English: *the*, *of* and *and* head the Brown Corpus list, and function words often make up close to half of a text.
- In speech, function words are usually unstressed and use **weak forms** with /ə/: *to* /tə/, *of* /əv/, *and* /ən/.
- Many uses of function words are fixed by their partners (*interested in*, *at night*, *on foot*), so learn them in **phrases**.
- Articles, auxiliary *do*, "empty" *it* and *there*, and the range of *and* and of prepositions differ from Chinese; missing function words are among the commonest learner mistakes.
:::

## Exercises

::: exercise Content or function? {level=1}
Sort these words into content words and function words.

*kitchen*, *the*, *because*, *run*, *beautiful*, *them*, *with*, *slowly*, *can*, *teacher*, *or*, *some*
::: solution
- Content words: *kitchen*, *run*, *beautiful*, *slowly*, *teacher*.
- Function words: *the*, *because*, *them*, *with*, *can*, *or*, *some*.
:::
:::

::: exercise Count the function words {level=1 check="6"}
How many function-word tokens are in this sentence? *We went to the park and played with a ball.*
::: solution
The sentence has 10 tokens. The content words are *went*, *park*, *played* and *ball* (4). The function words are *We* (pronoun), *to* (preposition), *the* (article), *and* (conjunction), *with* (preposition) and *a* (article): **6**.
:::
:::

::: exercise At, on, in or by? {level=1}
Complete with *at*, *on*, *in* or *by*.

1. *I usually go to work ___ bus.*
2. *She was born ___ 2008.*
3. *The meeting is ___ Tuesday.*
4. *I'll call you ___ seven o'clock.*
5. *We walked there ___ foot.*
::: solution
1. *by* — *by bus*, *by train*, *by car* (no article).
2. *in* — years take *in*.
3. *on* — days take *on*.
4. *at* — clock times take *at*.
5. *on* — the fixed phrase *on foot*.
:::
:::

::: exercise Put back the function words {level=2}
Add the missing function words to make correct sentences.

*My father teacher. He works school near our home. Every day he goes there foot, and evening he reads newspaper.*
::: solution
*My father **is a** teacher. He works **at a** school near our home. Every day he goes there **on** foot, and **in the** evening he reads **the** newspaper.*

Added: *is* (the verb *be* before a noun complement), *a* (twice — a teacher, a school), *at* (place of work; *in* is also possible), *on* (*on foot*), *in the* (*in the evening*), *the* (*the newspaper* — the daily paper; *a newspaper* is also possible).
:::
:::

::: exercise Which preposition? {level=2}
Complete each phrase with the usual preposition.

1. *interested ___ music*
2. *afraid ___ spiders*
3. *listen ___ the radio*
4. *wait ___ the bus*
5. *different ___ my brother*
::: solution
1. *in*
2. *of*
3. *to*
4. *for*
5. *from* — in all varieties; British English also uses *different to* and American English *different than*, both mainly informal.
:::
:::

::: exercise Weak forms {level=2}
List the function words in this sentence and give the weak form that each usually has in normal speech. *I was waiting for a bus at the station.*
::: solution
- *I* — unstressed, but it has no weak form with /ə/.
- *was* → /wəz/
- *for* → /fə/ (GB), /fər/ (GA)
- *a* → /ə/
- *at* → /ət/
- *the* → /ðə/

The content words *waiting*, *bus* and *station* carry the stress.
:::
:::

::: exercise From message to sentences {level=3}
Rewrite this text message as full, natural English sentences. Then underline (or list) every function word you added.

> *Sorry late. Train slow. Arrive office ten. Start meeting without me.*
::: solution
A model:

> *Sorry, I'm going to be late. The train is very slow. I'll arrive at the office at ten. Please start the meeting without me.*

Function words added: *I*, *'m* … *going to* … *be* (the future with *be going to*), *The*, *is*, *I*, *'ll*, *at*, *the*, *at*, *the*. (*Very* and *please* are also added; they are adverbs used for emphasis and politeness.) Other correct versions are possible, for example *I'm sorry I'm late* if the writer is already late.
:::
:::

::: exercise Correct a travel diary {level=3}
Correct the mistakes with function words in this diary entry. There are six.

> *Last weekend I went to Beijing by the train. Weather was very cold, and was snowing on Saturday. I visited Great Wall with my friend Wang Jun, he very interested on history.*
::: hint
Look for missing articles, a missing subject, a missing verb, a wrong preposition and two clauses joined by a comma only.
:::
::: solution
1. *by the train* → *by train* (no article in *by* + transport).
2. *Weather was* → *The weather was*.
3. *and was snowing* → *and it was snowing* (an "empty" subject *it* is needed).
4. *Great Wall* → *the Great Wall* (this name takes *the*).
5. *he very interested* → *who is very interested* (or *. He is very interested*) — the verb *is* is missing, and two sentences should not be joined by a comma only.
6. *interested on* → *interested in*.

Corrected:

> *Last weekend I went to Beijing by train. The weather was very cold, and it was snowing on Saturday. I visited the Great Wall with my friend Wang Jun, who is very interested in history.*
:::
:::
