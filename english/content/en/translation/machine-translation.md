A small Chinese company sends a supplier this message, written in Chinese and passed through a machine translation system before sending:

> 王经理：上次的样品我们看了，质量没问题，就是包装有点意见。她说下周能不能再寄一批过来？价格方面还是按老规矩。
>
> *Manager Wang: Last time's samples we have seen, quality no problem, just packaging has a little opinion. She said next week can send another batch? Price aspect still according to old rules.*

The English above was written for this lesson to show the kinds of error that machine translation between Chinese and English has typically produced; it is not the output of any particular system, and current systems (as of 2026) usually do better on a message like this. Even so, each error is instructive. 意见 has been translated by its first dictionary equivalent, *opinion*, where it means ‘reservations, complaints’. 她 — someone mentioned earlier in the conversation, not in this message — becomes *She* with no antecedent. The question has no English question structure. 老规矩 ‘the usual terms’ becomes *old rules*. 王经理, a form of address, becomes a heading. A human translator would write:

> *Dear Mr Wang, We've looked at the samples you sent last time. The quality is fine, but we have a few concerns about the packaging. Ms Li asks whether you could send another batch next week. Pricing would be on the usual terms.*

Machine translation (MT) is now used by millions of people every day and by most professional translators as part of their work. It is fast, free or cheap, and often remarkably fluent. It is also capable of errors that a fluent surface hides. This lesson describes how machine translation developed and how current systems work in outline, the errors they typically make between English and Chinese, how to decide when to use it, and how to **post-edit** its output — the skill that the use of MT demands of translators and learners alike.

## How machine translation works

::: definition Rule-based, statistical and neural machine translation {#def-mt}
- **Rule-based MT** (from the 1950s): linguists wrote dictionaries and rules for analysing the source sentence and generating the target. Output was often grammatical in simple cases and rigid or wrong in complex ones.
- **Statistical MT** (from about 1990): systems learned the probabilities of word and phrase correspondences from large collections of human translations (**parallel corpora**), and chose the most probable translation of each sentence.
- **Neural MT** (from about 2014): a neural network trained on parallel corpora represents the whole source sentence as numbers and generates the target sentence word by word, each word chosen in the light of the source and of the words already generated. Most current systems use the **Transformer** architecture (Vaswani et al., 2017), whose **attention** mechanism lets each output word draw on all parts of the source.
- **Large language models** (widespread from about 2022): very large neural networks trained on text in many languages, which can translate when instructed, and can also be asked to follow a glossary, keep a register or explain a choice.
:::

All current systems share one property that matters for their users: they learn from examples of language use, not from an understanding of the situation the text describes. They predict what a translation of a sentence like this one usually looks like. That is why their output is so fluent — fluency is exactly what the training data contain — and why their errors are of a particular kind: plausible, confident, and sometimes wrong in meaning.

::: widget markov
matrix: 0, 0.6, 0.4, 0, 0, 0; 0, 0, 0, 0.5, 0.3, 0.2; 0, 1, 0, 0, 0, 0; 0, 0, 0, 0, 0, 1; 1, 0, 0, 0, 0, 0; 1, 0, 0, 0, 0, 0
states: the; bank; river; account; of; closed
start: 0
steps: 30
title: Fluent but blind
caption: A toy model, made for this lesson, of how a system that predicts the next word from the previous one produces fluent sequences. After *the*, it chooses *bank* or *river*; after *bank*, most often *account* — because in its (imagined) training data the financial sense is commoner — even when the text was about a river bank. Run the walk: every sequence is locally fluent (*the river bank closed*, *the bank account closed*), and nothing in the model knows what the text is about. Real systems condition on far more context than one word and are vastly more accurate, but the principle — choose the probable continuation — is the same, and so is the kind of error it produces when the probable reading is not the intended one.
:::

## Typical errors between English and Chinese

::: theorem Where to look for MT errors {#rule-errors}
When checking machine translation between English and Chinese, look first at:

1. **Word sense**: words with several senses, translated by the commonest one (意见, 紧张, 加油; *bank*, *issue*, *party*), especially in short texts and single words without context.
2. **Reference**: pronouns and gender (spoken *tā* and written 他/她 → *he*/*she*/*it*), zero subjects supplied wrongly, *it* and *they* translated as 它 and 他们 where Chinese would repeat the noun or use nothing.
3. **Grammatical categories into English**: tense, number and articles chosen wrongly or inconsistently ([[translation/chinese-into-english#rule-supply]]).
4. **Omissions and additions**: a clause, a negation or a qualifier silently dropped, or words added that the source does not contain — the most dangerous errors, because the output still reads well.
5. **Terminology and consistency**: the same term translated in different ways in different sentences.
6. **Names**: personal and place names translated by meaning, transliterated wrongly, or given in the wrong order ([[translation/idioms-culture#rule-names]]).
7. **Register and formulas**: the wrong level of formality, calques of letter and sign formulas, flattened tone.
8. **Numbers, units and dates**: usually right, sometimes catastrophically wrong (万/亿 conversions, dates in the wrong order).
9. **Culture-bound terms and idioms**: translated literally or replaced by an equivalent that does not fit.
:::

::: proof
These are the places where the contrasts between English and Chinese require information that the sentence itself may not contain: the sense of a polysemous word depends on the situation, the referent of a pronoun or a zero subject may lie in another sentence or outside the text, and tense, number and definiteness must be supplied into English from context ([[translation/english-chinese-compared#rule-categories]]). Systems that translate sentence by sentence, or that have little context, fail most often here. Omissions and additions are a known weakness of neural systems: because they generate fluent output word by word, they can produce a fluent sentence that does not correspond to the whole source. Translators and researchers have often observed that such accuracy errors are harder for readers to notice than errors of fluency, precisely because fluent output is trusted.
:::

::: example Diagnosing errors {#ex-diagnose}
This English–Chinese pair was constructed for the lesson to show typical problems. Find the errors and classify them with [[#rule-errors]]. Source: *The minister did not rule out further cuts, but she said that the issue would be discussed at the party conference in May.* Machine-style output: 部长排除了进一步削减，但他说这个问题将在五月的聚会上讨论。
::: solution
1. **Omission of negation** (point 4): *did not rule out* (没有排除) has become 排除了 ‘ruled out’ — the meaning is reversed.
2. **Reference and gender** (point 2): *she* has become 他.
3. **Word sense** (point 1): *party conference* (a political party's conference, 党代会 or 党的年会) has become 聚会 ‘a social gathering, party’.
4. **Word sense** (point 1): *the issue* → 这个问题 is acceptable.
5. Corrected: 部长没有排除进一步削减开支的可能，但她表示，这一问题将在五月的党代会上讨论。 — note the added 开支 (*cuts* in what? the context of public spending) and 的可能 (*rule out* means ‘exclude the possibility’), which a human translator supplies from context; and 表示, the normal reporting verb in Chinese news.
:::
:::

::: warning Trusting fluency
✗ *The output reads perfectly, so it must be right.* Fluency is evidence that the system has produced likely target-language text, not that it has translated the source.

✓ Check meaning against the source sentence by sentence, starting with negations, numbers, names, conditions and pronouns. Read the output as English (or Chinese) only after that.
:::

::: example Errors into Chinese {#ex-into-chinese}
A constructed output, of a kind older systems produced and current ones still sometimes do. Source: *If you have any questions about your booking, please do not hesitate to contact us, and one of our team will get back to you within 24 hours.* Output: 如果你有任何关于你的预订的问题，请不要犹豫联系我们，我们团队的一个人将在24小时内回到你。 Identify the problems and post-edit fully.
::: solution
1. **Word sense / idiom** (point 9): *get back to you* ‘reply’ has become 回到你 ‘return to you’, which is meaningless.
2. **Register and formulas** (point 7): *please do not hesitate to contact us* is an English formula; 请不要犹豫联系我们 is a calque. The Chinese formula is 欢迎随时联系我们 or 请随时与我们联系. 你 should be 您 in customer service.
3. **翻译腔** in the structure: 任何关于你的预订的问题 (a 的-chain and two possessives), 我们团队的一个人 (*one of our team*). Chinese names the helper less precisely and leaves the possessives out ([[translation/english-into-chinese#rule-omit]]).
4. **Full post-editing**: 如对预订有任何疑问，欢迎随时联系我们，我们将在24小时内回复您。

The output was understandable except for the last clause; the meaning error would not have been caught by someone reading for the gist.
:::
:::

## When to use machine translation

::: theorem Assess the risk first {#rule-risk}
Before using MT, ask:

1. **What happens if it is wrong?** For a menu or a casual message, little; for a contract, a medical leaflet, safety instructions or an immigration form, a great deal. The higher the risk, the more complete the human checking must be — and some texts should be translated by a qualified human translator from the start.
2. **Is the text confidential?** Pasting a text into an online service may send it to a third party and store it. Contracts, personal data, medical records and unpublished work may not be shared without permission.
3. **Who will check it?** Post-editing requires someone who knows **both** languages and the subject. A monolingual reader cannot judge accuracy.
4. **What is the text type?** MT is strongest on informative texts with standard language; weakest on literary, creative, persuasive and highly specialised texts, on dialect and on very short texts with no context.
5. **What are the rules?** Clients, employers, publishers and universities may restrict or forbid MT, or require that its use be declared ([[academic-writing/academic-integrity]]).
:::

::: proof
The risk question comes first because MT errors are unpredictable: the same system can translate one sentence perfectly and reverse the meaning of the next. In low-risk uses, a reader can tolerate errors and ask for clarification; in high-risk uses, one error can cause financial loss, legal liability or physical harm. Confidentiality is a professional duty for translators ([[translation/interpreting#rule-conduct]]) and a legal duty under data-protection laws in many countries. Point 5 matters for learners: in a translation course, submitting machine output as one's own work misrepresents the work; in a language course, it removes the practice the exercise was meant to provide.
:::

::: quiz
A hospital in Britain needs a Chinese version of its instructions for patients before surgery (what not to eat, which medicines to stop). What is the best approach?
- [ ] Machine translation, because the text is short and standard.
- [ ] Machine translation checked by a Chinese-speaking patient.
- [x] A qualified translator (who may use MT as a tool), with review by a second qualified person, and terminology checked against Chinese medical sources.
- [ ] An English version only, because translation is risky.
::: solution
The text is high-risk: an error could harm a patient. It needs a professional translator responsible for the result, and a review. Whether the translator uses MT internally is a question of method; the responsibility and the checking are what matter. A patient without medical knowledge cannot reliably check accuracy, and providing no translation leaves patients without information they need.
:::
:::

## Post-editing

::: definition Post-editing {#def-post-editing}
**Post-editing** (译后编辑) is the correction of machine translation output by a human to achieve a stated level of quality. The international standard ISO 18587:2017 (*Translation services — Post-editing of machine translation output — Requirements*) distinguishes **light post-editing**, which aims at a merely comprehensible text, and **full post-editing**, which aims at a text comparable to a human translation.
:::

::: theorem A post-editing procedure {#rule-post-edit}
1. **Know the target level**: light (understandable, accurate in content, style not polished) or full (publishable).
2. **Read the source**, segment by segment, before the output, so that the output does not shape your understanding.
3. **Fix meaning first**: omissions, additions, wrong senses, reversed negations, wrong numbers and names ([[#rule-errors]]).
4. **Then terminology and consistency**, using the client's glossary ([[translation/specialised-translation#rule-termbase]]).
5. **Then grammar**, and — for full post-editing only — **style, register and flow**, including the restructuring that natural English or Chinese requires (the techniques of [[translation/english-into-chinese]] and [[translation/chinese-into-english]]).
6. **Use as much of the output as you can**: in light post-editing, do not make changes of preference; in full post-editing, rewrite whatever is not good enough, even if that means rewriting the sentence.
7. **Read the final text without the source**, as in any translation ([[translation/what-translation-is#rule-procedure]]).
:::

::: proof
The order — meaning, terminology, grammar, style — follows the severity of errors: a stylistically awkward sentence that is accurate is a smaller problem than an elegant one that says the opposite of the source. Reading the source first is important because fluent output **primes** the post-editor: once you have read a plausible sentence, you tend to read the source as if it said that. Point 6 states the economics of post-editing: its purpose is to save time compared with translating from scratch, so preferential changes waste the saving in light post-editing; but in full post-editing, a sentence that needs restructuring should be restructured, because the result must read as a good human translation. Studies of post-editing have generally found that it can be faster than translating from scratch for suitable texts and good output, and slower when the output is poor — which is why the assessment of [[#rule-risk]] comes first.
:::

::: example Light and full post-editing {#ex-post-edit}
Post-edit this output twice — light and full. Source: 本产品适用于家庭、办公室等室内场所，使用前请仔细阅读说明书，并妥善保管。 Output (constructed): *This product is suitable for indoor places such as family and office. Before use please read the instruction carefully, and keep properly.*
::: solution
1. **Meaning check**: 家庭 here means ‘homes’, not *family* (word sense); *keep properly* has no object — 妥善保管 refers to the manual (omission of reference); *the instruction* should be *the instructions* or *the manual* (number and term).

2. **Light post-editing** (meaning and grammar, minimal changes): *This product is suitable for indoor places such as homes and offices. Before use, please read the instructions carefully and keep them in a safe place.*

3. **Full post-editing** (publishable manual style): *This product is designed for indoor use, for example in homes and offices. Please read these instructions carefully before use and keep them for future reference.*

The full version uses the conventional English formulas of manuals (*designed for indoor use*, *keep them for future reference*); the light version keeps the output's structure wherever it is correct.
:::
:::

::: example Consistency across sentences {#ex-consistency}
A machine translation of a three-sentence Chinese leaflet renders 志愿者 as *volunteer* in the first sentence, *voluntary worker* in the second and *volunteers person* in the third; and 社区 as *community*, *district* and *neighbourhood*. What should a post-editor do, and why does this happen?
::: solution
1. **Choose one term for each concept**, from the client's glossary or from parallel texts: *volunteers* for 志愿者; *community* or *neighbourhood* for 社区, depending on what the leaflet's 社区 is (an administrative unit, often *community*, or the area people live in, often *neighbourhood*). Apply it throughout.
2. **Why it happens**: many systems translate sentence by sentence and choose the most probable rendering in each context, with no memory of earlier choices; they do not know that variation in a leaflet suggests different things. Systems that take whole documents and glossaries as input do better, but consistency must still be checked.
3. Correct *volunteers person*, which is ungrammatical, in any case.
:::
:::

## Evaluating machine translation

Researchers and developers measure MT quality in two ways. **Automatic metrics** compare the output with one or more human reference translations: the best known, **BLEU** (Papineni et al., 2002), counts how many word sequences of the output also occur in the references. Such metrics are fast and useful for comparing versions of a system, but a translation can be good and differ from the reference, or close to the reference and wrong in one crucial word. Later metrics, including some based on neural networks, correlate better with human judgements. **Human evaluation** asks people to judge **adequacy** (does the output convey the meaning of the source?) and **fluency** (is it good target-language text?), or to classify errors with a typology such as **MQM** (Multidimensional Quality Metrics). For a user, the lesson is simple: a published claim that a system is "as good as a human" refers to a particular test, on particular texts, with a particular measure.

::: quiz
Why can a high BLEU score fail to show that a translation is correct?
- [ ] Because BLEU only works for European languages.
- [x] Because it counts overlapping word sequences with reference translations, so an output can match most of the reference and still change the meaning, for instance by dropping *not*.
- [ ] Because BLEU measures only fluency.
- [ ] Because a high score always means the translation is literal.
::: solution
BLEU measures surface overlap with references. Omitting a single *not* changes the meaning completely but changes the overlap only slightly. Conversely, a good translation that uses different words from the reference scores lower than it deserves.
:::
:::

::: note English and Chinese
- **Learners and MT.** MT can help a learner understand a text, check a draft, or see alternative wordings; it cannot judge which alternative fits the situation, and it removes the practice that writing and translating exercises provide. Use it after you have tried, compare its version with yours, and ask why they differ ([[collocation-and-register/false-friends-chinglish]]).
- **Single words and short phrases** are where MT is least reliable, because there is no context to choose the sense: use a learner's dictionary and a corpus instead ([[core-vocabulary/using-a-dictionary]]).
- **Back-translation** — translating the output back into the source language — is a weak check: a system can translate its own error back into a correct-looking source.
- **Chinese-specific traps**: 他/她 when the source is spoken or ambiguous; subjectless sentences; 了 rendered as a past tense where it marks a change of state; 万 and 亿; names translated by meaning; 成语 rendered literally ([[translation/idioms-culture#rule-chengyu]]).
:::

::: history
In 1949 Warren Weaver, a director at the Rockefeller Foundation, circulated a memorandum suggesting that computers might translate, and in 1954 Georgetown University and IBM demonstrated a system translating selected Russian sentences into English. Optimism led to heavy funding in the United States, until the ALPAC report of 1966 concluded that machine translation was slower, less accurate and more expensive than human translation and recommended basic research instead; funding fell sharply. Rule-based systems continued to be developed for limited uses, and in 1984 Makoto Nagao proposed translation by analogy with stored examples. From about 1990, researchers at IBM (Brown et al.) showed that translation could be learned statistically from parallel corpora, and statistical systems dominated online translation for two decades. Neural machine translation, introduced in research papers of 2014, replaced them from about 2016; the Transformer architecture (Vaswani et al., 2017) became standard; and from about 2022, general-purpose large language models also came to be used for translation. Post-editing became a recognised professional service, with its own international standard, ISO 18587, in 2017.
:::

## Where this leads

This is the last lesson of the course. Its methods depend on everything before it: the theory of what a translation should be ([[translation/what-translation-is]]), the contrasts that cause most MT errors ([[translation/english-chinese-compared]]), and the techniques of word choice, restructuring and shifts that post-editing applies ([[translation/translating-words]], [[translation/english-into-chinese]], [[translation/chinese-into-english]], [[translation/structural-shifts]]). Corpora, which machine translation learns from, are introduced in [[collocation-and-register/using-a-corpus]] and [[linguistics/corpus-linguistics]]; next-word prediction, the principle behind language models, in [[core-vocabulary/function-words]].

::: summary
- MT has moved from **rules** (1950s) through **statistics** (1990s) to **neural networks** (2014–) and **large language models** (2020s); all current systems learn from examples of language use ([[#def-mt]]).
- Their output is **fluent**, and their errors are often **plausible**: wrong senses, wrong pronouns and gender, wrong tense and number, omissions and additions, inconsistent terms, names, register, numbers and culture-bound terms ([[#rule-errors]]).
- **Assess the risk** before using MT: consequences of error, confidentiality, who can check, text type, and the rules that apply ([[#rule-risk]]).
- **Post-editing** corrects MT output to a stated level — **light** or **full** (ISO 18587:2017) — fixing meaning first, then terminology, grammar and style ([[#def-post-editing]], [[#rule-post-edit]]).
- Read the **source first** and the output second; never trust fluency as evidence of accuracy.
- Automatic scores such as **BLEU** compare outputs with references; they are useful for developers and cannot certify that a translation is correct.
:::

## Exercises

::: exercise Classify the error {level=1}
Classify each error using [[#rule-errors]]. (a) 我们公司有三千员工 → *Our company has three thousand employee.* (b) 她是我的老板 (spoken, transcribed as 他是我的老板) → *He is my boss.* (c) 请勿吸烟 → *Please don't smoke cigarettes or else.* (d) 销售额达到两亿元 → *Sales reached 2 billion yuan.*
::: solution
(a) Grammar — number (*employees*). (b) Reference — gender, from an ambiguous spoken *tā*. (c) Addition (*or else*) and register — a sign formula (*No Smoking*). (d) Number — 两亿 is *200 million*.
:::
:::

::: exercise Word senses without context {level=1}
Give two different correct translations of each word, with a context for each, to show why a system translating it alone may fail. (a) 加油 (b) *issue* (c) 紧张
::: solution
(a) 给车加油 *fill up the car*; 比赛加油 *Come on!* / *Go for it!* (b) *issue* 问题 (*a political issue*); 期 (*the March issue of a magazine*); 发行 (*the issue of new shares*). (c) 我很紧张 *I'm nervous*; 关系紧张 *tense relations*; 资金紧张 *money is tight*.
:::
:::

::: exercise Light or full? {level=1}
Which level of post-editing suits each use? (a) An engineer wants to know roughly what a Chinese technical article says. (b) A company's English website. (c) Internal emails between colleagues who share a project. (d) A translated novel.
::: solution
(a) Light, or even raw MT with care, since the engineer only needs the gist and can ask about details. (b) Full. (c) Light, if both sides know the text was machine-translated. (d) Full post-editing is not enough for literature: a literary translation needs a translator ([[translation/literary-translation]]); MT may be at most a tool in the process.
:::
:::

::: exercise Post-edit a passage {level=2}
Fully post-edit this constructed output for a tourist leaflet. Source: 景区开放时间为每天8:00—17:30，16:30停止售票。请游客文明游览，爱护公共设施。 Output: *The scenic area open time is every day 8:00—17:30, 16:30 stop selling tickets. Please tourists civilized visit, love public facilities.*
::: solution
*Opening hours: 8:00 a.m. to 5:30 p.m. daily (last tickets 4:30 p.m.). Please respect the site and take care of its facilities.* — 文明游览 is a Chinese public formula with no direct English equivalent; *civilised* sounds insulting in English. *Love public facilities* is a calque of 爱护. *Last tickets* or *Ticket office closes at 4:30 p.m.* is the English convention. *Scenic area* can be dropped or replaced by the site's name.
:::
:::

::: exercise Find the omission {level=2}
Compare the source and the constructed output, and find what has been lost. Source: *Unless otherwise agreed in writing, payment shall be made within thirty days of the date of the invoice.* Output: 付款应在发票日期起三十天内支付。
::: solution
The whole condition *Unless otherwise agreed in writing* (除非另有书面约定) has been omitted — a serious error in a contract, since it changes the parties' rights. The output also has a redundancy (付款应……支付). Corrected: 除双方另有书面约定外，应自发票开具之日起三十日内付款。
:::
:::

::: exercise Pronouns and zero subjects {level=2}
Translate into English, supplying the subjects and pronouns that an MT system might get wrong, and explain your decisions. 李芳给张伟打电话，说明天的会取消了。他很高兴，因为正好要去医院看母亲。
::: solution
*Li Fang called Zhang Wei to say that tomorrow's meeting had been cancelled. He was pleased, because he needed to visit his mother in hospital anyway.* — 他 refers to Zhang Wei (Li Fang is a woman's name here, and the written 他 confirms a male referent); the zero subject of 说 is Li Fang; the zero subject of 要去 is Zhang Wei; 母亲 is *his mother*. Backshift gives *had been cancelled*. A system that guessed Li Fang's gender from the name could make *she* or *he* errors; the translator must check.
:::
:::

::: exercise Should MT be used? {level=3}
For each situation, decide whether and how MT should be used, and justify your answer with [[#rule-risk]]. (a) A student wants to understand a Chinese news article for an essay. (b) A small business wants to translate its terms and conditions into English for its website. (c) A teacher wants to send a short message to the English-speaking parents of a new pupil. (d) A researcher has unpublished interview transcripts in Chinese and wants an English draft.
::: solution
(a) Reasonable for understanding, with care over key claims, names and numbers; anything quoted in the essay should be checked against the original or translated by the student, and the use of MT acknowledged if the rules require. (b) High risk (legal text): a qualified translator should be responsible, with review; MT at most as the translator's tool. (c) Low risk: MT followed by a check by someone who reads both languages, or a simple message written directly in English; keep it short and clear. (d) Confidential: participants' data may not be sent to an online service without consent and the approval of the ethics procedure; use a system that keeps data local if permitted, and post-edit fully before analysis, since interview language is informal and context-dependent.
:::
:::

::: exercise Compare human and machine {level=3}
Translate a paragraph of 80–100 words of your choice from Chinese into English yourself. Then obtain a machine translation of the same paragraph (with permission, and nothing confidential), and write 150 words comparing the two: where is the machine better, where are you, and which errors of [[#rule-errors]] did each version make?
::: hint
Compare meaning first (omissions, senses, references), then terminology, grammar and style. Do not assume that the more fluent version is the more accurate one.
:::
::: solution
Answers vary. A good comparison identifies specific sentences; checks both versions against the source for meaning before judging style; notices typical machine strengths (fluent collocations, standard formulas, speed) and weaknesses (context-dependent senses, references across sentences, culture-bound terms, consistency), and typical learner weaknesses (articles, tense, word-for-word structure); and ends with a revised version that takes the best of each, stating that it was produced with the help of MT.
:::
:::
