Every speaker of Mandarin is already an expert in pitch. To say *mā* 妈, *má* 麻, *mǎ* 马 and *mà* 骂 correctly, you must control the height and direction of your voice on every syllable, many times a second. So why do so many teachers say that Chinese learners' English intonation is "flat", or "choppy", or that every word "sounds like it has a tone"?

The answer is not that Mandarin speakers lack pitch control, but that Mandarin and English use pitch for **different jobs**. In Mandarin, pitch is first of all part of the word; in English it belongs to the phrase ([[connected-speech/intonation-basics#def-tone]]). Habits that are exactly right for one job can get in the way of the other. This chapter compares the two systems, shows where Mandarin habits help and where they interfere, and gives practical ways to train English pitch patterns. It does not re-teach English intonation itself — for that, see [[connected-speech/intonation-basics]] and [[connected-speech/intonation-meaning]].

## Tones in Mandarin

To compare the two systems, we need a way of writing Mandarin tones. The usual one was invented by the Chinese linguist Yuen Ren Chao (Zhao Yuanren 赵元任).

::: definition Chao tone numbers {#def-chao}
In **Chao tone numbers** (or *tone letters*), the speaker's pitch range is divided into five levels, from 1 (lowest) to 5 (highest), and a tone is written as the levels at its start, (turning point,) and end. The four tones of Standard Mandarin, said on their own, are:

| tone | pinyin mark | Chao numbers | shape | example |
|---|---|---|---|---|
| 1 (阴平) | ā | 55 | high level | *mā* 妈 'mother' |
| 2 (阳平) | á | 35 | rising | *má* 麻 'hemp' |
| 3 (上声) | ǎ | 214 | low, dipping, then rising | *mǎ* 马 'horse' |
| 4 (去声) | à | 51 | falling, high to low | *mà* 骂 'scold' |

There is also the **neutral tone** (轻声): a short, light syllable whose pitch depends on the tone before it, as in the second syllable of *māma* 妈妈, *xièxie* 谢谢 or *dōngxi* 东西.
:::

These values describe syllables said alone. In connected speech they change:

::: theorem Mandarin tones in connected speech {#rule-sandhi}
1. **Third tone before third tone** becomes a rising tone, like tone 2: *nǐ hǎo* 你好 is said *ní hǎo*; *hěn hǎo* 很好 is said *hén hǎo*.
2. **Third tone before other tones** usually keeps only its low part (a "half third tone", about 21 or 211): *hǎo chī* 好吃, *Běijīng* 北京. The full dipping 214 is heard mainly at the end of an utterance or when the syllable is emphasised.
3. ***Yī* 一 and *bù* 不** change their tones depending on the next syllable: *bù* becomes *bú* before a fourth tone (*bú shì* 不是), and *yī* becomes *yí* before a fourth tone (*yí gè* 一个) and *yì* before other tones (*yì tiān* 一天).
4. **Neutral-tone syllables** are short and weak, and their pitch is set by the preceding syllable: fairly low after tone 1, 2 or 4, and higher after tone 3.
:::

::: proof
These changes are part of the grammar of Mandarin, not optional variants: a speaker who said *nǐ hǎo* with two full 214 tones would sound strange. They show that Mandarin pitch is not simply a string of fixed shapes, one per syllable; it is adjusted to neighbours, as English sounds are adjusted in assimilation ([[connected-speech/elision-assimilation]]). But the adjustments are local and rule-governed, and each syllable still carries a tone that identifies the word. Other Chinese varieties have different systems: **Cantonese** is usually described with six tones (for example *si1* 诗 55, *si2* 史 25, *si3* 试 33, *si4* 时 21, *si5* 市 23, *si6* 事 22), uses level tones at several heights, and has no neutral tone of the Mandarin kind. Speakers of Cantonese, Wu, Min and other varieties bring their own pitch habits to English, and not everything in this chapter applies to them equally.
:::

The figure shows the four Mandarin tones in Chao numbers, beside an English fall.

::: widget plot
f: 5; 3 + 2*x; 2 - 5.464*x + 7.464*x^2; 5 - 4*x; 3 + r*(1 - 2*x)
x: 0, 1
y: 0.5, 5.5
sliders: r=1.5:0.5:2:0.1
labels: tone 1 (55); tone 2 (35); tone 3 (214); tone 4 (51); English ↘No (range r)
caption: The four tones of Standard Mandarin said on their own, drawn on Chao's five-level scale (1 = lowest, 5 = highest), with time across one syllable. The fifth line is an English fall on the one-word answer *↘No*. Its size is not fixed: the slider r sets the pitch range, from a small, low fall (r = 0.5, bored or routine) to a large one from top to bottom (r = 2, emphatic). A Mandarin fourth tone must fall from high to low to be recognised; an English fall can be large or small, and the size carries attitude rather than meaning ([[connected-speech/intonation-meaning#rule-range]]). These are idealised shapes, not measurements.
:::

## Mandarin intonation

It is often said that "Chinese has tones, so it has no intonation". This is not true. Mandarin speakers also use pitch over whole utterances to signal questions, focus, emotion and the end of a turn.

::: theorem How Mandarin intonation works {#rule-mandarin-int}
1. **Tones keep their shapes.** Intonation in Mandarin changes the **height and range** of the tones — raising or lowering them, widening or narrowing them — but a fourth tone still falls and a second tone still rises.
2. **Questions without a particle** (*Nǐ míngtiān zǒu?* 你明天走？) are typically said with a raised pitch, especially towards the end, while the last syllable keeps its own tone.
3. **Focus** is shown by widening the range of the focused word and lengthening it; in Beijing Mandarin the pitch of the following words is lowered and compressed (Xu 1999).
4. **Declination**: over a statement, pitch tends to drift gradually down, as in English.
:::

::: proof
Yuen Ren Chao described this relationship with a famous image: the syllable tones are like small ripples riding on the large waves of intonation (Chao 1968). The two levels add together. In English there is only one level: unstressed syllables have no pitch of their own, and the main movement of the phrase starts on the nucleus and runs through the tail ([[connected-speech/sentence-stress#def-nucleus]]). This is why an English tail can be long, low and flat after a fall — *I ˈsaw it in the ↘**pa**per this morning* — while every syllable of a Mandarin tail must still be recognisable by its tone, even if compressed.
:::

::: example Questions in two languages {#ex-questions}
Compare how pitch makes these into questions.

1. Mandarin: *Nǐ míngtiān qù?* 你明天去？ ('You're going tomorrow?')
2. English: *You're going to↗**mor**row?*
::: solution
1. In Mandarin the whole sentence is said on a raised pitch, especially at the end, but *qù* 去 is still a fourth tone: it falls, from a higher starting point and perhaps less steeply. A listener hears both the word *qù* and the question.
2. In English the nucleus is *-mor-*, and the voice rises from there to the end of the tone unit: *-row* continues upwards. There is no word tone to keep, so the end of the question is high.

A learner who transfers the Mandarin pattern may say *You're going tomorrow?* on a high pitch overall but end with a fall on *-row* (as if it were a fourth-tone syllable). An English listener hears the fall and may take the question for a statement.
:::
:::

::: quiz
In the Mandarin question *Tā shì lǎoshī?* 他是老师？ ('He's a teacher?'), said without a particle, what normally happens to the last syllable *shī*?
- [ ] It changes to a rising second tone, to show the question.
- [x] It keeps its high level first tone, but the pitch of the sentence, especially near the end, is raised.
- [ ] It becomes a neutral tone.
- [ ] Nothing: Mandarin questions without particles are not possible.
::: solution
In Mandarin, intonation changes the height and range of the tones but not their shapes ([[#rule-mandarin-int]]): *shī* stays a first tone, on a raised pitch. If it became a rising tone, a listener might hear a different syllable. In English, by contrast, *He's a ↗**teach**er?* rises from the nucleus, because the word *teacher* has no tone to keep.
:::
:::

## Where Mandarin habits interfere

::: theorem Common transfer patterns {#rule-transfer}
Teachers and researchers commonly describe the following features in the English of Mandarin-speaking learners. Not every learner has all of them.

1. **A pitch movement on every syllable**, or on every stressed syllable, as if each had a tone. The result sounds choppy, and the listener cannot find the nucleus. Short words are often given a falling, fourth-tone-like pitch: *I ↘ want ↘ to ↘ go ↘ home.*
2. **Falls that are too short and too steep** at the end of tone units, like a fourth tone. In English they can sound abrupt or impatient ([[connected-speech/intonation-meaning#rule-range]]).
3. **A narrow range overall**, especially when reading aloud or concentrating on words — so that the speaker sounds flat or uninterested.
4. **Few rises and fall-rises**, so that non-final tone units sound finished and questions in statement form sound like statements.
5. **The nucleus in the wrong place**, because the main pitch movement is not concentrated on one syllable ([[connected-speech/sentence-stress]]).
:::

::: proof
Each of these follows from the Mandarin system. If every syllable needs a pitch target, it is natural to give one to every English syllable too — and the fourth tone, a clear fall, is very common in Mandarin speech and an easy default. A Mandarin fall happens within one syllable, so English falls are made too short. The pitch range of Mandarin is "spent" on tones, and the attitude that English expresses by range is expressed in Mandarin largely by particles ([[connected-speech/intonation-meaning]]). Questions in Mandarin are marked by particles or raised register rather than by a final rise. None of these is a sign of poor pitch control; they are signs of good control of a different system.

There are also **advantages**. Mandarin speakers can hear and produce pitch differences precisely; the neutral tone gives them a model for weak syllables and tails; Beijing Mandarin, like English, compresses the pitch after a focus (but Cantonese does not; see [[connected-speech/sentence-stress]]); and the dipping third tone is close in shape to the English fall-rise.
:::

::: example A choppy reading {#ex-choppy}
A learner reads: *I went to the shop to buy some bread.* Each word has its own small fall, like a fourth tone, and *bread* ends with a short, steep fall. What would you change?
::: solution
1. **One nucleus.** In a single tone unit there is one main movement, on the last content word: *I ˈwent to the ˈshop to ˈbuy some ↘**bread**.*
2. **No falls on function words.** *I*, *to*, *the*, *some* are weak forms ([[connected-speech/weak-forms]]) with no pitch movement of their own; they ride on the pitch of the stressed syllables.
3. **Stressed syllables step, not fall.** Before the nucleus, *went*, *shop* and *buy* are stressed but usually carry only a slight step in pitch, often each a little lower than the last.
4. **A longer, smoother fall.** The fall on *bread* starts higher and takes the whole syllable, ending low: it is spread out, not clipped.

A useful image: in English, most of the sentence is the run-up, and the nucleus is the jump.
:::
:::

::: warning Do not map English stress onto Mandarin tones
✗ Treating English stressed syllables as fourth tones and unstressed ones as first tones, so that each syllable of *PHOtograph* gets a pitch shape of its own: a fall on *PHO-*, then two high level syllables.
✗ Treating the English fall as "tone 4" and the rise as "tone 2" on each word: *↘ Where ↘ do ↘ you ↗ live?*

English stress is shown by length, loudness, vowel quality and pitch together ([[sounds-of-english/word-stress-basics]]), and the pitch of a stressed syllable depends on its place in the intonation pattern, not on the word. The same syllable *PHO-* can be high, low, rising or falling, and it is still *photograph*. Mandarin tones can help you **feel** a pitch shape (see below), but they are not a code for English words.
:::

## Training English pitch

::: theorem Ways to practise {#rule-practice}
1. **Hum the tune.** Say a phrase, then hum it with your mouth closed, keeping only the pitch and rhythm. Humming removes the words and with them the habit of a tone per syllable. Then say it again, keeping the hummed tune.
2. **Mark before you speak.** Mark the tone units (|), the nucleus (bold) and the tone (↘ ↗ ↘↗) on a text before reading it. Most learners read better when they have decided in advance where the movement goes.
3. **Exaggerate.** Make the fall or rise on the nucleus much bigger than feels natural. Recordings usually show that the "exaggerated" version sounds normal ([[connected-speech/intonation-meaning#ex-learner]]).
4. **Shadow.** Listen to a short recording of natural speech and speak along with it, a fraction of a second behind, copying the melody rather than the words.
5. **Use Mandarin tones as a bridge — on one syllable only.** A one-syllable English answer can borrow a tone's shape: *↘No* like the fall of tone 4, *↗Yes?* like the rise of tone 2, and a fall-rise *↘↗Well …* like a full third tone. Then spread the same shape over longer phrases, with the movement starting on the nucleus.
:::

::: proof
These techniques work on different parts of the problem. Humming and shadowing train the ear and voice on whole melodies instead of syllable-by-syllable targets. Marking separates the decision about where the movement goes from the effort of speaking. Exaggeration counteracts the narrow range that comes from concentration. The tone bridge uses something the learner can already do — produce a fall, a rise or a dip on a single syllable — as a starting point, and then teaches the English feature that Mandarin does not have: spreading that movement across a tail. No technique is a substitute for listening to a great deal of natural English; but they make it easier to notice what you hear.
:::

::: example From one syllable to a phrase {#ex-bridge}
Use the tone bridge to practise a fall-rise, starting with one syllable.

1. *↘↗**Sure**.* 2. *I'm ↘↗**sure**.* 3. *I'm ↘↗**sure** it's fine.* 4. *I'm ↘↗**sure** it'll be fine on the day.*
::: solution
1. On a single syllable, the English fall-rise is close to a full Mandarin third tone 214 — down, then up — but begins higher: *sure* starts mid-high, falls and rises again.
2. *I'm* is unstressed and low; the whole fall-rise still happens on *sure*.
3. Now the fall happens on *sure*, and the rise is spread over the tail *it's fine*: *sure* falls, *it's* is low, and *fine* rises. *Fine* has no tone of its own here; it simply carries the end of the rise.
4. The tail is longer: *sure* falls, *it'll be fine on the* stay low, and *day* rises. The same tune, stretched.

Meaning: the speaker is reassuring, perhaps with a slight reservation (*I'm sure it'll be fine — but …*), as in [[connected-speech/intonation-meaning#rule-attitude]]. In this exercise, the learner moves from a tone-like movement on one syllable to an English movement over a phrase.
:::
:::

::: example Marking a short text {#ex-mark}
Mark this message for reading aloud (GB), then say it with the marks.

*Hi everyone. The meeting has moved to Thursday afternoon. If you can't come, please let me know by Wednesday. Thanks.*
::: solution
*↘**Hi** everyone. | The ˈmeeting has ˈmoved to ˈThursday ↘**af**ternoon. | If you ↘↗**can't** come, | ˈplease let me ˈknow by ↘**Wednes**day. | ↘**Thanks**.*

- *everyone* is in the tail of *Hi* (a vocative after the nucleus).
- *Thursday afternoon*: the nucleus is on the last content word; *Thursday* is stressed but has no separate movement.
- *If you can't come*: a non-final clause, fall-rise; the nucleus is *can't*, because the negation is the important part.
- *Thanks* with a high, wide fall — friendly, not abrupt.

Five tone units, five nuclei: every other syllable rides on these.
:::
:::

::: note English and Chinese
- **Neutral tone as a model for the tail.** The light, short syllables of *xièxie* 谢谢 or *zhuōzi* 桌子 are the closest thing in Mandarin to English unstressed syllables and tails. Saying English tails "like neutral tones" — short, quiet, following the pitch of the nucleus — is a useful image.
- **The fourth tone and English falls.** The fourth tone is short and steep. An English fall on a final nucleus is usually more spread out, and its size varies with attitude. Practise long falls on words such as *↘**no**w*, *↘**rea**lly*, *↘**won**derful*.
- **Speakers of other varieties.** Cantonese speakers, with six tones and many level tones, may give English syllables level pitches at different heights, and, since Cantonese does not compress pitch after a focus (Wu and Xu 2010), they may find low, flat English tails harder than Beijing speakers do. Speakers of Wu varieties such as Shanghainese, in which tone often spreads over a whole word, may have different habits again.
- **Chinese learners are not the only ones.** Speakers of other tone languages (Vietnamese, Thai, Yoruba) and of languages with very different intonation (French, Japanese) also need to learn the English system. The difficulties described here concern pitch habits, not ability.
:::

::: history
Yuen Ren Chao (Zhao Yuanren, 1892–1982) proposed his system of tone letters in "A system of tone-letters", published in *Le Maître Phonétique* in 1930; it is still the standard way to describe the tones of Chinese and of many other languages. The pinyin system, with its tone marks ā á ǎ à, was adopted in the People's Republic of China in 1958. Chao's *A Grammar of Spoken Chinese* (1968) described the interaction of tone and intonation, including the image of ripples on waves. In the 1990s, phoneticians such as Yi Xu used acoustic measurements to show how Mandarin speakers mark focus and questions while keeping the shapes of the tones (Xu 1999). Comparisons between Chinese and English pitch, and the problems of learners, have become a major area of research in second-language phonetics since then.
:::

## Where this leads

The last chapter of the course, [[connected-speech/hearing-fast-speech]], uses stress, weak forms, linking and intonation together to decode natural speech. Practice with recordings, shadowing and media is developed in [[listening-and-conversation/learning-from-media]].

::: summary
- Mandarin uses pitch to distinguish **words** (tones: 55, 35, 214, 51, and the neutral tone, in Chao numbers); English uses it for **phrases** — nucleus, tone and range ([[#def-chao]]).
- Mandarin tones change in context (third-tone sandhi, the half third, *yī* and *bù*) but each syllable keeps a tone ([[#rule-sandhi]]).
- Mandarin also has intonation: it raises, lowers, widens and narrows the tones, but keeps their shapes — "ripples on waves" ([[#rule-mandarin-int]]).
- Typical transfer: a movement on every syllable, short steep falls, a narrow range, few rises and fall-rises, and an unclear nucleus ([[#rule-transfer]]). There are advantages too: precise pitch control, the neutral tone, and post-focus compression in Beijing Mandarin.
- Practise by humming, marking, exaggerating and shadowing; use tone shapes on one syllable as a bridge, then spread them over the tail ([[#rule-practice]]).
:::

## Exercises

::: exercise Chao numbers {level=1}
Write the Chao numbers of each tone, said on its own: 1. *tāng* 汤 2. *táng* 糖 3. *tǎng* 躺 4. *tàng* 烫
::: solution
1. 55 2. 35 3. 214 4. 51
:::
:::

::: exercise Tone sandhi {level=1}
How is the first syllable pronounced in normal speech?

1. *hěn hǎo* 很好 2. *bù duì* 不对 3. *yī tiān* 一天 4. *hǎo chī* 好吃
::: solution
1. *hén* — tone 3 before tone 3 becomes a rise. 2. *bú* — before a fourth tone. 3. *yì* — before a first tone. 4. A half third tone (low, about 21): *hǎo* before tone 1.
:::
:::

::: exercise Word or phrase? {level=1}
In which language does changing the pitch change the **word**, and in which does it change the **message** of the phrase? Give one example of each.
::: solution
Mandarin: changing the pitch can change the word — *mǎi* 买 'buy' vs *mài* 卖 'sell'. English: changing the pitch changes the message, not the word — *↘**Mon**day* (an answer) vs *↗**Mon**day?* (a question) ([[connected-speech/intonation-basics#def-tone]]).
:::
:::

::: exercise How far does it fall? {level=2 check="4"}
On Chao's five-level scale, by how many levels does the fourth tone fall when said on its own?
::: solution
Tone 4 is 51: from level 5 to level 1, a fall of 4 levels. (An English fall has no fixed size: it may be small or large, and its size carries attitude.)
:::
:::

::: exercise Find the nucleus {level=2}
A learner says each word with a separate falling pitch: *She ↘ is ↘ a ↘ teach ↘ er.* Rewrite it with one tone unit, mark the nucleus, and describe what should happen to the other syllables.
::: solution
*She's a ↘**teach**er.* The nucleus is *teach-*; the fall starts there and *-er* is low, in the tail. *She's a* is unstressed, with no movement of its own — said quickly and lightly, as a run-up. Using the contraction *She's* (or a weak *is* /z/) also removes a syllable that was wrongly stressed.
:::
:::

::: exercise Question or statement? {level=2}
A learner asks *You're from Shanghai?* on a high pitch, but the last syllable *-hai* has a short fall. Explain why an English listener might not hear a question, and how to fix it.
::: solution
In English, a question in statement form is marked only by the rise ([[connected-speech/intonation-basics#rule-questions]]). The learner raised the overall pitch, as in a Mandarin question without a particle, but kept a fall on the last syllable — perhaps because *hǎi* 海 has a tone in Mandarin, or by habit. The English listener hears the final fall and interprets a statement. Fix: put the nucleus on *-hai* and **rise** from there: *You're from Shang↗**hai**?* — the end of the utterance should be clearly higher than the nucleus start.
:::
:::

::: exercise Hum and say {level=3}
Choose three sentences from this course's examples (for instance *Would you like ↗tea | or ↘coffee?*, *If you're ↘↗free | we could go to the ↘cinema*, *It's a ↘lovely day, | ↘isn't it?*). For each: (1) mark it; (2) hum it; (3) say it with the hummed tune; (4) record it and compare. Note what changed between your first attempt and your last.
::: solution
Answers vary. A good report notes, for example: "On my first try I gave *would*, *like* and *tea* separate falls; after humming, the only movements were the rise on *tea* and the fall on *coffee*." Or: "My fall on *cinema* was too short; humming made it longer." The key test is whether, in the recording, the listener can hear one main movement per tone unit, on the marked nucleus.
:::
:::

::: exercise Teach it to a friend {level=3}
Write a short explanation (80–120 words, in English or Chinese) for a Chinese-speaking friend of the main difference between Mandarin tones and English intonation, with one example of each and one practical tip.
::: solution
Model (English): "In Mandarin, every syllable has its own tone, and the tone is part of the word: *mǎi* 买 means 'buy' and *mài* 卖 means 'sell'. In English, the words don't have tones. Instead, each phrase has one main pitch movement, on the most important word, and it changes the message, not the word: *Monday* falling is an answer; *Monday* rising is a question. So in English, don't give every word a pitch movement. Choose the important word, make one clear fall or rise there, and keep the other words light and quick. Tip: hum the sentence first, then say it with the same tune." Answers vary; a good one gives an accurate example of each and a usable tip.
:::
:::
