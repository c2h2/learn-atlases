---
title: "Tones"
---

The four characters 宇宙洪荒 happen to have the tone values (pitch contours) 214, 51, 35 and 55 — third (上), fourth (去), second (阳) and first (阴), one contour type to each character, as if teaching aids had been prepared in advance for a lesson on tone. Tone is the layer on which Chinese differs most from other languages, and the one most easily left by native speakers in the state 日用而不知 ('used every day without being known'): you can use the four tones, and yet may be unable to say clearly whether "the third tone really does fall and then rise", or "why someone hears your tone wrong and yet hears your stress right". This chapter puts tone on file: what it is (a contour of pitch), how it is recorded (the five-level notation), which ones Putonghua (standard Mandarin) has (the four tones, plus the neutral tone), what it governs (distinguishing meaning), and how it and the intonation of the sentence coexist.

## Tone is a contour of pitch

::: definition Tone {#def-shengdiao}
The **pattern of rise, fall and bend in pitch** while a syllable is pronounced, capable of distinguishing lexical or grammatical meaning, is called **tone**. It is one meaning-distinguishing use of pitch (see the account, at the end of [[sounds-of-mandarin/speech-sounds]], of what the four elements are): in a syllable that carries tone, the pitch of the main vowel is not level, nor free to rise and fall as one pleases, but proceeds along a contour laid down by the system — besides high and low, **shape** is required: level, rising, falling, rising-falling, falling-rising.
:::

::: theorem What tone hears is the "shape", not absolute pitch {#rule-xiangdui}
The same tone value is the same tone for everyone. A bass voice reading 妈, a soprano reading 妈, a child reading 妈 in a shrill voice: so long as the **shape of the relative rise and fall** in pitch is the same (high level), the listener classes them as one and the same tone. Tone is a contour that stretches and shrinks inside an individual's own pitch range.
:::

::: proof Everyday evidence that shape is constant
On the telephone a man and a woman pronounce 买 and 卖 each in a pitch region comfortable for themselves. The falling shape of 卖 does not change, and no one mishears it — a direct experience of the constancy of shape. The strong evidence in the laboratory is **transposed synthesis**: raise or lower the fundamental-frequency curve of a stretch of recording as a whole (keeping the shape), and recognition of the tone category is essentially unaffected; keep the absolute values of the fundamental frequency but **flatten the shape** (pare 51 down to 33), and subjects at once hear 爸 as of a kind with 巴. What human hearing uses to parse linguistic tone is precisely the same set of mechanisms as the "compression of pitch range" which language applies to intonation — when you are excited the range widens and every tone grows "steeper", and the listener still recovers the words you used. This relativity of tone also explains why, in learning a dialect or in singing, one must change over to another "pitch conversion table": the shape has to be moved as a whole, and absolute values are not to be relied on at all. In passing, one common misunderstanding should be taken apart. Some people suppose that "my voice is bright, so my tones are accurate" — how wide or narrow the range is only says whether the canvas is a good one, and does not guarantee that the shape has been drawn correctly. Whether a tone value is accurate is always measured by the course the curve takes.
:::

::: widget plot
f: 5; 3 + 2x; if(x < 0.5, 2 - 2x, 1 + 6(x - 0.5)); 5 - 4x
x: 0, 1
y: 0, 6
labels: 阴平 55; 阳平 35; 上声 214; 去声 51
caption: Contour curves of the four tones of Putonghua. The vertical axis is the five-level notation (see [[#def-wudu]]); the horizontal axis is normalised duration. The first tone runs high and level all the way; the second rises from mid to high; the fourth drops all the way down; the third falls and then rises, its low point lying in the lower part of the range — the pit of the "falling-rising tone" is exactly this lowness. Hover to check the values. Each of the four lines corresponds to a representative character of the sort 春, 潮, 雨 and 雪.
:::

## Tone value, tone category and the five-level notation {#sec-diaozhi-diaolei}

::: definition Tone value and tone category {#def-diaozhi-diaolei}
The **tone value** is the actual pronunciation of a tone, written in a pitch form (five-level digits), as with the Putonghua first tone (阴平, high level) at 55 and the fourth tone (去声, falling) at 51. The **tone category** is the name of a class of tones, the class got by grouping tone values — Putonghua has four tone categories: 阴平, the first tone (high level); 阳平, the second tone (rising); 上声, the third tone (dipping); and 去声, the fourth tone (falling), commonly called the "four tones". Tone value says "how it is pronounced"; tone category says "which class it belongs to". The category names (阴, 阳, 上, 去) carry an origin in the history of Middle Chinese sounds (see [[phonology/mc-finals-tones]]). In different dialects, categories of the same name often have different tone values, and categories of the same value may also bear different names.
:::

::: definition The five-level notation {#def-wudu}
Chao's five-level tone notation, the method of recording tone devised by Zhao Yuanren 赵元任 (Yuen Ren Chao): take one person's pitch range and divide it into five levels (1 the lowest, 5 the highest); with time as the horizontal axis and level as the vertical, draw the curve of the tone value, or else use two or three digits directly to record the levels of the start and the end (and of the low point in the middle): 55 high level, 35 mid rising, 51 a full fall, 214 falling-rising. As a companion set there are also "tone letters", marked beside the character (˥ ˧˥ ˨˩˦ ˥˩). What the five levels record is **relative** pitch, which answers directly to [[#rule-xiangdui]].
:::

The file of the four tones of Putonghua is as follows (the tone values are the notation in general use; the authorities differ slightly in detail, and the third tone especially):

| Tone category | Tone value | Contour type | Example characters |
|---|---|---|---|
| 阴平 (first tone) | 55 | high level | 春、花、天、开 |
| 阳平 (second tone) | 35 | mid rising | 潮、河、回、明 |
| 上声 (third tone) | 214 | falling-rising (low curve) | 雨、水、马、草 |
| 去声 (fourth tone) | 51 | full fall | 落、雪、夜、地 |

The most standard example characters in the whole table are the set of four on *i*, 衣、移、倚、毅: [i⁵⁵], [i³⁵], [i²¹⁴], [i⁵¹] — the same syllable wearing four hats, one hat to a character. Calling over the four tones in class also commonly uses grouped "four-tone sets" (四声联): 诗—时—使—试 (the ʅ row), 飞—肥—匪—费 (the ei row), 之—直—止—至 (the ʅ row, another series). When practising tone values, start from these sets in which "initial and final are entirely the same, and only the hat is changed". No other variable in the sound is allowed to move — controlling the variables is the first lesson of a phonetic experiment.

::: remark The "lowness" of the third tone
The point of how the full third-tone value 214 sounds does not lie in "rising at the end", but in the **first half being low and long**. Said alone, or under emphasis, the rising tail is clear; in the flow of speech, before another tone, it is mostly read only as the low level "half third" (半上) ［21］ ("say the third tone slowly, and in ordinary speech the third tone of ‘北京’ often never reaches level 4" — compare the chapter on tone sandhi, [[sounds-of-mandarin/sandhi]]). Say the third tone slowly; in ordinary speech, even the citation form of the single character 北 often has a rising tail that never reaches level 4 — some textbooks, on this basis, hold that the "base tone" (本调) of the third tone should be written as low level 21, the rising tail being something filled in at a pause. This is a minority analysis, and it has a basis. This course follows the usual textbooks and writes 214: when it is a single character, or under emphasis, practise it as 214; when it is read in connection, follow the rules of tone sandhi.
:::

::: application Tone's "list of patients"
The tone faults that come up most often in speaking Putonghua can be written out as a clinic's list. ① The fourth tone does not fall far enough: 51 is pronounced as 53, and the impression is 没劲儿 ('no force to it') — in practising 夜, 大 and 去, fall to the bottom of the range. ② The second tone starts too high: 35 is pronounced as 45 or even 55, so that 人 comes close to 仁 and the two are not distinguished. ③ The rising tail of the third tone is overdone: a single character is bent into three turns, and inside words a rising tone is struck in full at every point, so that the listener is led off instead. ④ Tone categories are carried over from a dialect: the tone values of the mother tongue are fitted directly onto the Putonghua categories (the categories of each local dialect correspond neatly with those of Putonghua, while the tone values are displaced; precisely for this reason, "getting the category right and pronouncing the value wrong" is the principal component of a dialect accent). The prescription for diagnosing oneself is a single word: record. Record 衣移倚毅 and the sets for each tone, draw the five-level curves and set them against the standard; that does more good than reading a tongue-twister ten times.
:::

::: quiz
In the five-level notation, what does "5" mean?
- [ ] Five hundred vibrations a second
- [x] The highest level in an individual's pitch range
- [ ] The fifth degree of the diatonic scale
- [ ] One fifth louder than level 4
::: solution
The five-level notation divides the range of each person, from the very top to the very bottom, into five equal steps, and 5 is the highest step — each person's own "ceiling" is different, while the relative position of the steps is the same, which is exactly why it is suited to recording tones whose "shape is constant" ([[#def-wudu]]). The other options lump pitch together with frequency and with intensity.
:::
:::

## What work tone does: distinguishing meaning

::: example Four hats on one syllable {#ex-si-ma}
Write the tone values of 妈、麻、马、骂, explain what kind of minimal opposition they form, and find another four-tone set with the same initial and final.
::: solution
妈 [ma⁵⁵], 麻 [ma³⁵], 马 [ma²¹⁴], 骂 [ma⁵¹]: initial and final are entirely the same, the tone values each differ, and the four words stand in minimal opposition to one another — tone, all by itself, has changed the word. Another set: 西 [ɕi⁵⁵], 习 [ɕi³⁵], 洗 [ɕi²¹⁴], 细 [ɕi⁵¹]. Just as with the initial and the final, only when tone is entered on the phoneme inventory (a suprasegmental phoneme) does it count as the full class roll of the sound system of Putonghua.
:::
:::

::: example Filing 宇宙洪荒 character by character {#ex-yuzhou}
Mark a tone value on each character of 宇宙洪荒, and point out why the four characters together are an ideal "table of the four tones".
::: solution
宇 [y²¹⁴], third tone; 宙 [tʂou⁵¹], fourth tone; 洪 [xʊŋ³⁵], second tone; 荒 [xwaŋ⁵⁵], first tone — one character to each of the four tone categories, all four contours seen complete at a single glance, and all of them characters in common use. Read the four characters through once, and then scramble the order into 荒洪宙宇 (55 35 51 214): you have still not changed the characters. Tone is not stuck to the "character" and altered now this way, now that. It is a fixed property which the lexicon hangs on each entry, and only in reading aloud does tone sandhi arise on the spot (see [[sounds-of-mandarin/sandhi]]).
:::
:::

::: example Tone set against the neutral tone {#ex-didao}
地道 dìdào and 地·道 di·dao differ in meaning. Explain which layer the difference falls on.
::: solution
The former wears its own tone on each of the two syllables (51+51), and is the adjective "standard, pure"; the latter loses the base tone on the second syllable, which is light and short (51+轻, neutral), and is the noun "underground passage" — the difference does not lie in the initial or the final, but in **whether there is a tone, and in light versus heavy**: the neutral tone is not a fifth tone; it is the state in which a syllable's tonal features have been "stripped off" ([[sounds-of-mandarin/sandhi]]). Pairs that exist by the same means also include 东西: dōng xī is a direction (east and west), dōng·xi is a thing; 大爷 dà yé (a form of address for an elder of one's grandfather's generation, the one senior by order of birth) and dà·ye (another name for a father's brother, differing slightly with the dialect) work in the same way.
:::
:::

::: theorem The number of tone categories is the system's own accounts {#rule-diaolei-shumu}
How many tone categories a language or a dialect has is arrived at by induction from its own history, and is not laid down by the name "four tones": Putonghua has 4 (and, on one account, the neutral tone besides); most of Wu has about 7; the traditional analysis of Yue has 9 (level, rising, departing and entering each divided into yin and yang, with such additions as a yin rising, the ways of counting differing among the authorities); there are also Mandarin (*guanhua*) localities with the three tones level, rising and departing, whose splits and mergers differ from those of Beijing. As a tone category the entering tone (checked tone) has disappeared in Putonghua (the short tone closed by a stop coda was distributed into the other tones), yet it is alive in Jin, Yue, Min, Hakka and others.
:::

::: proof The right way to count tone categories (and why the "entering tone" is hard to count)
The way of counting is still the substitution method: under the same segmental conditions, does changing the pitch contour change the word, and each contour that changes the word forms a class of its own. Test Putonghua with the four hats on "i", and you have 4 at once. The same test in Wu and in Yue separates out more classes. The entering tone with a -p, -t or -k coda forms a group by itself; its "shortness", its "ending sound" and its "tone value" are tied together as three things, and different scholars keep the books by "tone category" or by "coda", hence the various accounts of 9 classes, of 8 classes, and so on — disagreement about the number is for the most part disagreement about the bookkeeping, not disagreement of the ear. This is precisely phonemics' "disagreement about what to group together", played out again on tone ([[sounds-of-mandarin/speech-sounds#rule-phoneme-test]]).
:::

## Tone and intonation: how two layers of pitch coexist

Tone is at work on the **character**; intonation is at work on the **sentence**. Statement, question, calling and emphasis add "tilt and compression" to the pitch of the whole sentence: a fourth tone at the end of a statement is still "falling" in shape, only the whole range slides downward; a question said with a rise lifts the range at the end of the whole sentence, and the character 卖, pronounced a little higher and a little steeper, is still 卖 and is not heard as 买 — because the shape has not changed. The two layers are loaded at the same time, and neither destroys the other: this is the most famous piece of engineering in the processing of Chinese speech. Sentence-final interrogative mood is also often mistaken for "a tone with a rise added on": the 吗 of 你去吗 is read as a neutral tone to begin with; what rises is the tail of the intonation of the whole sentence, not an extra tone-hat worn by 吗 — when the accounts of tone and of intonation are written down, they must be kept apart. Singing is the counter-example and the limit: the melody forces the direction of absolute pitch, the shape of the tone is flattened, and distinguishing meaning depends entirely on context — the old rule of composition, 依字行腔 ('letting the melody follow the character'), matching a first tone with a level straight melodic figure, a fourth tone with a downward-sliding figure, and the like, is precisely a patch applied so that tone may "keep its shape" inside a melody. Kunqu and old-school Peking opera are particular about this.

::: intuition Think of the five-level notation as "numbered notation"
The five-level notation works on the same principle as 首调唱名 ('tonic sol-fa', the movable-do names): 12345 are not absolute pitches, but steps on a scale. In a choir the men's and women's parts stand an octave apart; sung from the same sheet of 简谱 ('numbered musical notation'), the frequencies are entirely different, and yet the piece is the same one. Tone is the same — take each person's range as that person's own "do re mi sol la": 55 is "la—la—" held out level, 35 is the ascent "mi→la", 51 is the straight drop "la→do", and 214 is "re→do→fa", sinking first and then flicking up. Once tone values are remembered by singing from notation, an accordion-like habit of absolute pitch can no longer deceive you. Ear training is practised along the way: if, on hearing 衣移倚毅, you can hum inwardly "la-la, mi-la, re-do-fa, la-do", then this course on tone may be counted as begun.
:::

::: warning Do not use a tone value as a tone name, and do not count the neutral tone as a fifth tone
✗ "Putonghua has five tones: yin, yang, rising, departing, plus the neutral tone" (阴阳上去加轻声) — the neutral tone does not distinguish tone categories; it is a light, short pronunciation that has lost the base tone, and does not count as a "fifth tone". ✗ Calling 55 "level tone" (平声), and calling 214 "the tone value of the third tone is a fall and then a rise, and in any position it is read out in full" — the tone value changes with position (the half third, tone sandhi), while the category name does not change. The four category names "level, rising, departing, entering" (平上去入) are the accounts of Middle Chinese history (the level tone is today divided into yin and yang; the entering tone has been distributed in full). Using them to name today's tone values puts the wrong hat on the wrong head. ✓ When you state a numerical value, bring the words "tone value" with it ("55 is the actual tone value, in this position, of this third-tone character"); when you speak of a class, use "tone category"; when you speak of a light, short pronunciation, use "neutral tone".
:::

::: history
The name "four tones" (四声) began in the Southern Dynasties. Zhou Yong 周颙 wrote the *Sisheng qieyun* 《四声切韵》 (*Qieyun of the Four Tones*; the book is lost), and Shen Yue 沈约 advocated the doctrine of 四声八病 ('the four tones and the eight ills') for the tonal regulation of verse and prose — in 《宋书·谢灵运传论》, the discussion of the biography of Xie Lingyun 谢灵运 in the *Song shu* 《宋书》 (*Book of Song*), “欲使宫羽相变，低昂互节” ('wishing to make the notes *gong* and *yu* alternate, and the low and the high to measure one another.' (Our translation.)) — and from then on level, rising, departing and entering became the bones and joints of the analysis of tone in Chinese. From the Northern Dynasties on, the condition for dividing the level tone into yin and yang was whether the initial was voiceless or voiced (清 or 浊); after the devoicing of voiced initials the tone values split in two, and from this come today's "yin and yang, rising and departing" (阴阳上去). In the Yuan, Zhou Deqing 周德清, in the *Zhongyuan yinyun* 《中原音韵》 (*Rhymes of the Central Plains*, 1324), for northern *qu* "distributed the entering tone among the three tones" (入派三声), and recorded the scene of the disappearance of the entering tone in the north. At the modern end, in the 1920s Zhao Yuanren created the five-level method of recording tone, and the tone letters; only thereafter did surveys of tone values in the Chinese dialects have a scale in common use — the string of digits at the upper right of every head character in today's *Xiandai Hanyu cidian* 《现代汉语词典》 (*The Contemporary Chinese Dictionary*) is a product of this ruler.
:::

## The rule by which loanwords wear a hat

When a sound from outside enters Chinese, the tone is taken on the spot. The 珈琲 of 咖啡 originally had old readings, and is now read kā fēi, two first-tone hats, with no correspondence at all to the heavy-light pattern of English *coffee*; 沙发 shā fā, 雷达 léi dá, 幽默 yōu mò — all of them follow the base tone of the characters used to borrow them. In the age of "Mr Democracy" and "Mr Science" (德先生, 赛先生), what was assigned to *democracy* and *science* was the tones of the two characters 德 and 赛, from which it can be seen that the tone system's handling of foreign goods is "imitate the sounds as far as possible, and let the tones take orders". For comparison: when Japanese borrows Chinese words, it too must remodel the tones according to its own phonology (the Han readings and the Wu readings, 汉音吴音). Tone is a sovereignty that no system will negotiate away — which agrees with the general rule in [[linguistics/phonetics-phonology]] that "a borrowed sound first passes through the filter of the phonology".

::: quiz
Both characters of 咖啡 are first tone, a treatment wholly different from that of English *coffee* (the stress in front, the following syllable light and weak). This shows that ( ).
- [ ] Chinese loanwords do not in fact imitate a foreign pronunciation
- [x] Tone and stress each have their own system; a loanword entering Chinese has to change hats and wear a tone of this system
- [ ] English has no variation of high and low pitch
- [ ] The pronunciation of 咖啡 is an exception for foreign words, specially laid down by a table for the review of pronunciation
::: solution
Phonological adaptation of loanwords is the normal case: segments imitate the original sound as far as possible, and suprasegmentals (tone, and stress) are assigned afresh according to the home system. 咖啡 uses the base tones of characters that already exist, and there can be no talk of a special stipulation (D is wrong); English does have variation in pitch, only it is not used to distinguish the meanings of words (C is wrong); A is the opposite of the fact of "imitating as far as possible".
:::
:::

## What follows

The modifications of tone in the stream of speech (the half third, two third tones in succession, the tone sandhi of 一 and 不), together with the neutral tone and rhotacisation (*erhua*), have a whole chapter at [[sounds-of-mandarin/sandhi]]. Level and oblique tones are verse metre's separate account of tone values; see [[poetry-metrics/level-oblique]]. Correspondences among the tone categories of the dialects ("what most characters in the first tone of a given dialect are read as in Putonghua") are a subject shared by the correction of dialect pronunciation and by historical phonology; see [[dialects/mandarin-dialects]] and [[phonology/to-mandarin]]. The acoustic measurement of curves of pitch belongs on the border between [[linguistics/phonetics-phonology]] and acoustic phonetics.

::: summary
- Tone is a meaning-distinguishing contour of pitch; hearing it depends on relative shape, not on absolute pitch ([[#rule-xiangdui]]).
- Tone value is the actual pronunciation (five-level digits); tone category is the class arrived at by grouping (Putonghua: first tone 阴平 55, second tone 阳平 35, third tone 上声 214, fourth tone 去声 51). The five-level notation was created by Zhao Yuanren.
- Tone can change a word by itself alone (妈麻马骂, 西习洗细); it is a suprasegmental phoneme. The neutral tone is a light, short pronunciation that has lost the base tone, not a fifth tone.
- The low curve of the third tone is the basis of how it is heard; in connected reading it is often read only as the "half third". The number of tone categories is entered in the books according to the system. The entering tone is distributed into other tones in Putonghua, and still exists in the southern dialects.
- Tone and intonation belong severally to the two layers of character and sentence, and coexist by a division of labour between "shape" and "pitch range". Singing is the extreme case in which tone is flattened by the melody.
- The historical accounts of the categories (the level tone splitting into yin and yang; the distribution of the entering tone among the three tones) are there in everyday tone values, and from this a course on tone leads straight into Chinese historical phonology. When a loanword enters Chinese, the segments are imitated as far as possible, and the tones are assigned afresh according to the home system.
:::

## Exercises

::: exercise Where a tone value starts {level=1 check="3"}
On the five-level notation, the second-tone value 35 starts at which level?
::: solution
Level 3: a mid-rising tone starts from the middle and rises to the highest. Likewise, 51 starts from level 5, and 214 starts from level 2, with level 1 as its lowest.
:::
:::

::: exercise Counting tone categories {level=1 check="4"}
Not counting the neutral tone, how many tone categories does Putonghua have in all?
::: solution
4: the first tone (阴平), the second (阳平), the third (上声) and the fourth (去声). The neutral tone is the loss and the weakening of tone, and does not enter the accounts of the tone categories ([[#rule-diaolei-shumu]]).
:::
:::

::: exercise Four hats {level=1}
On the model of 衣移倚毅 for *i*, make up a set of four-tone example characters for each of the finals u and ü, and mark the tone values. Then check the final a: can all four tone categories be fitted with characters in common use?
::: solution
The u row: 乌 [u⁵⁵], 无 [u³⁵], 五 [u²¹⁴], 悟 [u⁵¹]. The ü row: 淤 [y⁵⁵], 鱼 [y³⁵], 雨 [y²¹⁴], 遇 [y⁵¹] (with a zero initial the proper spelling is yū, yú, yǔ, yù). The a row can be filled out only by relying on the four readings of 啊, yin and yang, rising and departing (ā á ǎ à), and apart from the interjection words formed with it are scarce — what this question really tests is an awareness of the accounts: Putonghua does not, for every final, spread characters so as to fill all four tone categories, and some tables that are "complete in the four tones" are held up by characters with more than one reading. Whether or not the spread can be made full is itself a trace of the history of the sound system.
:::
:::

::: exercise Moving the shape {level=2}
Using the five-level notation, record the tone values of the four tones of your dialect (if you are not sure, find an older native speaker, have them read standard pairs of the 衣移倚毅 type, and take an average). Then write one rule of correspondence between the tone categories of your dialect and those of Putonghua, and give two characters that test an exception.
::: solution
A model: the tone values of Kaifeng speech in Henan are about 41, 55, 35 and 24 (first tone a low fall, second tone high level, third tone a high rise, fourth tone a low rise — the notations of the various authorities differ slightly). An example of a rule of correspondence: Kaifeng fourth tone 24 corresponds to Putonghua fourth tone 51 (大, 路); Kaifeng first tone 41 corresponds to Putonghua first tone 55 (天, 风). Exceptions must be stated explicitly: the reading, in conservative speech, of characters whose entering tone was distributed into the various tones, set against the newer speech as it draws closer to Putonghua, is a living example of "a rule in the course of moving". Marking looks at whether the tone values come from a real elicitation of the sounds, and whether the rule has left a place for exceptions.
:::
:::

::: exercise Whose 妈 {level=2}
A male voice has a fundamental frequency of about 110 Hz, a female voice of about 220 Hz. Someone says: "A woman's 妈 is an octave higher than a man's, so what she is pronouncing is not the first tone 55." Using the principles of this chapter, refute that sentence.
::: solution
What the five-level notation records is the relative step inside an individual's pitch range, and it has nothing to do with absolute frequency ([[#def-wudu]], [[#rule-xiangdui]]): a woman's level "5" is indeed somewhere about 250 Hz, but if, in singing 妈, she keeps it high and level, neither rising nor falling, the tone value is still 55 and the tone category is still the first tone. To take a difference of frequency across persons for a difference of tone value is to make the mistake of setting "altitude" beside "slope" — just as taking "absolute pitch" for "tone" directly contradicts, in [[sounds-of-mandarin/speech-sounds]], the statement that "absolute pitch does not distinguish meaning".
:::
:::

::: exercise Judging "a fall first, then a rise" {level=2}
A teacher teaches that "the third tone is a fall and then a rise", and the pupils read the third tone, wherever it occurs, as a complete fall-rise. Point out where this teaching is right and where it is wrong, and give a prescription in stages for the classroom.
::: solution
Right: in the citation tone, and in a position of emphasis, the third tone does indeed have the full falling-rising form 214, and "low" is the mark by which it is heard. Wrong: to treat this as the pronunciation "in any position" — before a tone that is not itself the third, the third tone is read only as the half third 21 (the 北 of 北京); when two third tones come together, the former character changes to 35 (你好); before the neutral tone there is also a change ([[sounds-of-mandarin/sandhi]]). The prescription: in reading single characters aloud, practise the full tone 214; in reading words aloud, practise 21 and 35; only when you come to sentences speak of "low and long; do not cock the tail". The line taken in an examination (when the "base tone" is to be given) follows the usual textbooks and writes 214.
:::
:::

::: exercise Category correspondences and history {level=3}
The four characters 诗、时、死、四 are read today as 55, 35, 214 and 51. Infer their tone categories in Middle Chinese (level, rising, departing, entering; voiceless and voiced need not be placed exactly — it is enough that the direction be right), and explain how "the initial of 时 and the initial of 诗, one voiced and one voiceless" accounts for "both being level tone, and yet different in the tone they have today".
::: solution
诗 (first tone), 时 (second tone), 死 (third tone), 四 (fourth tone): for the level, rising and departing tones of Middle Chinese, where they have gone can in outline be traced — a level-tone character is read today as the first tone or the second, the condition being whether the Middle Chinese initial was voiceless or voiced. A voiceless (fully voiceless, 全清) level tone passes into today's first tone (诗, the *shu* and *xin* initials, fully voiceless); a voiced (fully voiced, 全浊) level tone passes into today's second tone (时, the *chan* initial 禅母, fully voiced). "The level tone splits into yin and yang" is precisely the tonal compensation for the devoicing of voiced initials (the story of the stops in 平送仄不送, 'aspirated in the level tone, unaspirated in the oblique', is the other half of the same sound change; see [[sounds-of-mandarin/initials]] and [[phonology/to-mandarin]]). 死 (rising tone, the 止 rhyme, the *xin* initial) and 四 (departing tone, the 至 rhyme, the *xin* initial) are then the distinction of rising and departing left on today's tone values. For the marking: stating clearly that "one and the same tone category of today has historical sources mixed in it, and one and the same ancient tone category splits into today's tones according to voicing" is enough to meet the standard.
:::
:::

::: exercise Tone's "pitch-range experiment" {level=3}
With a phone, record yourself reading the sentence 春天的周末 once in an ordinary voice and once in a whisper (breathy, without voicing). Compare whether the tones of the two are "still there", and write two hundred characters explaining the difference.
::: solution
Observation: read ordinarily, the contours of the five characters of 春天的周末 (55, 55, neutral, 55, 51) are distinct; the whispered version has removed the periodic vibration of the vocal folds and left only the spectrum of the breath noise, and the listener distinguishes tone mainly by residual cues of strength and of the shape of the mouth, so that distinguishing meaning clearly gets worse and yet does not collapse altogether (the identity of the consonants and the vowels is still there). The explanation must bring the point into the open: what the five-level notation records is the fundamental-frequency contour **that carries voice**; without vibration of the vocal folds, the physical carrier of the tone value is gone — and from this "tone depends on voiced sound" is confirmed. The "contour" of a tone, however, has in hearing some redundant coding that can be relied on, and, taken together with what a native speaker expects, a part of it still remains.
:::
:::
