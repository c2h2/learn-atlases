---
title: "Syllables and Hanyu Pinyin"
---

"Xi'an" and "xian" ("beforehand") begin with the same four letters and must be written differently — one apostrophe separates two cities from one adverb. **A syllable is the unit in which Mandarin is breathed, and Hanyu Pinyin is the engineering drawing of that unit: it encodes linguistic principle (phonemic generalisation, complementary distribution), historical habit (zh for an unaspirated sound, the dropped umlaut), and the sociology of orthography (word-spacing, capitalisation).** This chapter keeps three tools apart: square brackets [ ] for phonetic substance, slashes / / for phonemes, and an unbracketed string for a **spelling** (as in zhī); **each layer is audited against its own books**, which is the rule of the whole course.

## The syllable: one shaping of pitch between breaths

::: definition What a syllable is here {#def-yinjie}
**Working definition**: a syllable is what one pulse of the breath-stream carries — in most languages identified by a sonority peak, in Mandarin identified additionally by **one tone**, since a syllable without a tone is not sayable. **Two things follow that students repeatedly miss. ① In Mandarin the syllable and the morpheme are usually, but not always, aligned**: 葡萄 pútao is one word in two syllables and neither syllable means anything alone, while 朋友 péngyou is two morphemes and the second is neutralised. **Counting characters is not counting morphemes, and neither is counting syllables** (the vocabulary course's segmentation problem, in the mouth). **② The syllable is where the phonotaxis lives**: most of what is hard for a learner — the shapes, not the sounds — is a rule about which segments may stand in which positions of one syllable, which is the next section. **One caution about the tone: it is suprasegmental, so it does not occupy a slot in the segment count; a syllable with four segments and a tone has four segments and a tone, not five.**
:::

::: definition The template of the Mandarin syllable {#def-muban}
**The template, in its fullest form**: `(C) (G) V (N)` — an optional initial, an optional medial, a nucleus, and an optional coda; plus tone. **Three names the tradition uses and the course keeps: 声母 the initial, 韵头 the medial, 韵腹 the nucleus, 韵尾 the coda, with 韵母 the last three together.** **Capacity: at most four segmental slots are filled** (as in 窗 /ʂ u a ŋ/), **which is the ceiling the first exercise asks you to confirm.** **Four restrictions do the real work. ① The coda is limited to two nasals** (-n, -ng) **and, in the standard language, to nothing else: no -p, -t, -k, no -s, no -l** (the dialects keep what was lost — Cantonese has all six, which is why a Cantonese speaker hears "two missing sets" where a learner hears "the same word said wrong"). **② The initial may be zero, but then the spelling must supply something** (yi, wu, yu), which is a spelling rule and not a sound. **③ The medial and the nucleus are subject to a small set of licensed combinations**, so a vowel is "front rounded" only under conditions the template states — the fact behind the umlaut rules. ④ **The tone may not attach to every shape equally in the colloquial register**: neutral-tone syllables are the exception, and they are exceptions of the word, not of the phonology (stress and tone are the next chapter's business). **Rule of this section: learn the template as a permission list, and you can predict what Mandarin does not have, which is more useful than a list of what it does.**
:::

::: theorem Mandarin opens no consonant clusters {#rule-jujin}
**Statement**: within one syllable, consonants do not combine: **there is no /st/, no /nt/, no /lɡ/; every consonant is either an initial alone or the nasal coda alone.** **Corollaries: ① a learner who writes "spl" or "-cts" is importing a template, not a sound; ② loanwords epenthesise or delete** — a foreign cluster is broken by inserting a vowel or by dropping a member; **③ the "long" pinyin spellings (zhuang, chuāng) are single onsets, not clusters** — `zh` is one consonant written with two letters, `u` a medial, `ang` the rhyme.
:::

::: proof A customs gate that admits one at a time
Take the syllable as a hall with a turnstile that admits one consonant, then a vowel, then at most one nasal. **Now try to smuggle the English word "strengths" through**: its template allows three consonants before the vowel and three after, so the attempt fails not for lack of sounds but for lack of places. **Then try the reverse test, which is the useful one: is /ŋ/ absent from Mandarin? No — it is everywhere, but only at the back of the hall (韵尾 -ng), never at the front; the language has the sound and forbids the position.** **The general method: when a foreign learner says a Mandarin sound "does not exist", ask first whether the position exists.** The same argument recurs in the initials chapter as the "bo po mo fo" question and in the dialects chapter as the map of codas; here it is simply the shape of the hall.
:::

::: widget graph
nodes: 音节@0,2; 声母@-3,0.8; 韵母@0,0.8; 声调@3,0.8; 韵头@-1.4,-0.8; 韵腹@0,-0.8; 韵尾@1.4,-0.8
edges: 音节>声母; 音节>韵母; 音节>声调; 韵母>韵头; 韵母>韵腹; 韵母>韵尾
caption: The syllable and its four slots, the no-cluster theorem, the four spelling transformations, and word-spelling.
:::

::: example Parsing shuāng to the bottom {#ex-shuang}
**Take shuāng and state: the number of syllables, the number of segments, the initial, the medial, the nucleus, the coda, the tone, and the phonetic substance of `sh` and of `u` here.**

::: solution
**One syllable, four segments** /ʂ u a ŋ/ **plus tone: initial `sh` = ʂ (a voiceless retroflex fricative — one sound, two letters), medial `u` = u, nucleus `a`, coda `ng` = ŋ, tone 55 falling to 51? no: first tone is high level 55.** **Note the three traps. ① `sh` is one phoneme, so "four letters before the vowel" is not four sounds; ② the coda is a single nasal, written with two letters; ③ the medial `u` here is a true [u]-like glide, not the [y] that appears after j, q, x.** **The method is the chapter's: letters, phonemes and substance are three accounts, and the same word must be audited in all three** (see the note at the end).
:::
:::

::: example A four-character template test {#ex-sige-muban}
**Which of these are legal Mandarin syllables, which are legal but empty, and which are words: `fai`, `to`, `ŋi`, `tʂʰuɑn`? (Write them in pinyin first.)**

::: solution
**In pinyin: fai, to, (initial ŋ + i), chuan.** **Verdicts: `fai` — passes the template (f + ai is a licensed combination) and the dictionary has no entry: legal, empty.** `to` — same status; Mandarin has 多 [twɔ] and no [to] series. `ŋi` — **fails the template**, since ŋ is not on the initial list, though it is a live initial in Cantonese and in southern Hokkien readings, and it is legal there. `chuān/chuán/chuàn` — legal, populated, and **the third tone is nearly empty, held up by rare characters.** **Three separate accounts, then: permissive template, populated lexicon, and frequency of use.** **A learner's error and a dialect's normality are often the same string scored against different books — which is the general lesson, and the reason this course counts the books one by one.**
:::
:::

## The Pinyin scheme is a manual

**Before the rules, the status of the document: the scheme of 1958 is a standard for spelling, not a textbook of phonetics, and it says so.** It is allowed to be inconsistent in the service of learnability; it deliberately keeps a few historical residues; and **it is not a notation for sounds — which is why "Pinyin is inaccurate" is a category error, and "Pinyin's spelling rules are complicated" is a fair complaint about a different object.** The rules below are the whole of what makes the first page of any textbook look arbitrary.

::: theorem Four spelling transformations {#rule-pinxiu}
**① The umlaut rule**: after j, q, x (and y) the front-rounded vowel is written without its points — `ju` is [tɕy]; after n and l the points stay, because `nu` and `nǚ` contrast. **② The reduction of the falling diphthongs**: `iou`, `uei`, `uen` are written `iu`, `ui`, `un` after an initial — the spelling hides a weak element that a careful pronunciation still has. **③ The zero-initial conversions**: `i-` becomes `yi-`, `u-` becomes `wu-`, `ü-` becomes `yu-`, and a following `i`/`u` becomes `y` — so that a syllable never begins with a lowercase vowel alone. **④ The dividing apostrophe** before a syllable beginning in a vowel when confusion is possible (Xi'an). **Three notes on the design. ① The four rules save marks in the common case and spend rules in the general case: none of them is a sound change; all are about the eye.** ② **Each is justified by a minimal pair or by its absence**: `nu`/`nǚ` keeps the points, `jiu`/`jiou` needs no distinction, so the reduction is harmless. ③ **They interact with the template**: rules ① and ③ exist because the template forbids certain openings, and rule ① exists because the distribution of [tɕ] and [tɕʰ] before front and back vowels is complementary — **the scheme is exploiting a phonological fact to avoid a diacritic, which is good engineering and, for the phonologist, a small temptation to think the language is simpler than the notation.**
:::

::: proof Each rule saves one mark and spends one
Take the two competing demands of an alphabet: **never write the same sound two ways, and never write two sounds one way. Pinyin trades the first away in three places to keep the second cheap.** **Case ①**: `i` stands for three vowels — the front unrounded of `bi`, the retroflex-adjacent of `zhi`, and the front rounded of `qu` (**this is the famous "one letter, three sounds" and it is possible because the three never occur in the same position: complementary distribution permits a single symbol**). **Case ②**: the umlaut points are deleted exactly where they could not be misread. **Case ③**: `w` and `y` are not phonemes but boundary markers with the shape of consonants. **Now the proof of the chapter's claim: every "quirk" of the scheme is a place where a phonological generalisation was used as a printing economy.** A learner is told the rules as arbitrary; they are in fact a compressed description of the sound system, and the compression is why a linguist can defend the scheme and still lose an argument with an adult beginner.
:::

::: example Which letter carries the tone {#ex-diaohao}
**Place the tone mark on: jiǔ, hǎn, guī, xī, lüè, and state the rule you used, plus the two exceptions.**

::: solution
**Rule: mark the main vowel, with the priority `a` > `o`/`e` > the second element of `i`/`u`/`ü` when both are present** — hence jiǔ (on the `u`, since `iu` is `iou` and the head is the later element), guī (same), hǎn (on `a`), xī (only one), lüè (on `e`). **Two special cases: an syllable with no vowel at all in `m`/`n` interjections takes the mark wherever the syllable's peak sits, and neutral tone takes no mark.** **The trap this exercise exists to spring: `iu` and `ui` look as if the mark should go on the first letter because that is what the ear lengthens in careful speech; the spelling hides a third element and the rule follows the hidden structure, not the visible two.** **Which is a nice illustration of a general point: a orthography's exceptions are usually fossils of the analysis underneath it.**
:::
:::

::: quiz How many segmental slots can one Mandarin syllable fill? ( )
- [ ] Three
- [x] Four
- [ ] Five
- [ ] Unlimited

::: solution
Initial, medial, nucleus, coda — the tone is suprasegmental.
:::
:::

::: quiz Why is `ŋi` illegal in Standard Mandarin? ( )
- [ ] The sound ŋ does not exist in Mandarin
- [x] ŋ has no licensed position at the front of a syllable
- [ ] i cannot follow a velar
- [ ] The tone is missing

::: solution
The language has the sound and forbids the place.
:::
:::

::: quiz The umlaut is dropped after j, q, x because ( ).
- [ ] The vowel is no longer rounded there
- [x] The distribution is complementary, so no contrast can be lost
- [ ] It is hard to type
- [ ] French does it

::: solution
The points stay after n and l, where 路 and 绿 differ.
:::
:::

## Writing by word: the orthography

**The scheme also specifies word-spelling, which is the part that surprises foreigners and Chinese readers alike: `péngyou` is one word, `Hànzì` capitalises the proper element, `Xī'an` takes an apostrophe, and `kǒngzi` is spelled as one unit whether or not a learner perceives it that way.** **Three rules and one dispute. ① Spelling is by word, so the writer must decide what a word is — which is the segmentation problem of the vocabulary course, now with a legal answer and no agreed definition.** ② **Capitalisation marks the beginning of a sentence and of proper names, and the convention for titles and institutions is unsettled in practice.** ③ **The apostrophe appears only where a boundary would be misread**; the rules of 1976 and their 2012 revision differ on details, and dictionaries do not always follow either. **The dispute is worth naming: word-spelling makes the reader's parsing visible, so every spelling is an analysis; a reform of spelling is a batch of unvoted linguistic claims.**

::: example A business card in pinyin {#ex-mingpian}
**Write in pinyin: "Wang Li, teacher of Chinese at Beijing Normal University, lives in Haidian; she likes painting." Then list every decision you took that a colleague might take differently.**

::: solution
**One defensible version: Wáng Lì, Jiàoshī / Zhōngguó huà? — better: Wáng Lì, Hàishī dàxué Hànyuē jiàoshī, zhù Hàidiàn. Xǐhuan huà huà.** **The decisions: surname and given name capitalised separately and hyphenless or hyphenated (two conventions); the institution name as one unit or split; 汉语 as Hànyǔ (one word) while 老师 may be jiàoshī after the title; the verb-object pair 画画 written huà huà (two words) or huàhuà (one), which is exactly the segmentation dispute; and whether to mark tones at all on a card, which is a social decision, not a rule.** **The lesson: every one of these is a claim about where a word ends, and the orthography requires you to make the claim in public.** That is the difference between a phonetic notation and a spelling system, and it is why pinyin can be technically sound and still produce arguments.
:::
:::

::: warning Three frequent spelling accidents
**Writing `Xian` for the city** (**the apostrophe is not decoration; it is the boundary marker the rules require**); **marking the tone of `jiu` on the first vowel** (**the hidden third element governs**, the tone-mark example); **writing `lu:`, `v`, or `nv` and then being corrected for typing rather than for spelling** (**the keyboard's `v` is an interface convention, not a rule of the scheme** — the note below keeps the three systems apart).
:::

::: history
**1950s**: a committee considers both a Latin-based scheme and native-style alphabets, and the Latin solution is adopted for its technical and international convenience (**standard account**); **the scheme is approved in 1958** (**standard account**). **Its ancestors**: late-Qing phonographic movements, the Republican-era romanisation controversies (including a state-sponsored Latinxua Sin Wenz), and a long tradition of missionaries spelling Chinese for their own mouths (**standard account**; the world-literature and language-society courses meet the same missionaries from another angle). **1977–1982**: place-name and personal-name spelling are settled for international use, and pinyin becomes the romanisation standard for libraries and telecommunication (**standard account**: ISO adoption in 1982). **1980s–2000s**: input methods make pinyin the most-used keyboard in the country, and **the tone marks disappear from ordinary typing while the spelling survives** (**standard account**). **The short reading: a spelling designed to teach literacy became the interface of digital writing, which is the largest unintended consequence of a language-planning document in this century.**
:::

::: note Distinguishing IPA, pinyin and zhuyin: names and substances {#note-sanzhongxiutong}
**Three systems, three purposes, one common confusion. IPA** is a universal notation whose letters are chosen for phonetic similarity and whose rules are set by a society of phoneticians: **it records substance and takes no side in spelling.** **Pinyin** is a national standard for spelling Chinese, built with phonemic economy and a word-level orthography: **it records an analysis and has legal status.** **Zhuyin** is a native alphabet of the same analysis, taught in one variety of the standard and used for input and dictionary order there: **it is a spelling too, and its symbols are not decomposable into features.** **The audit: for any string you meet, ask first which account you are reading — name of a letter, value in a spelling, or substance in a transcription.** The same three-column habit that this course demands of a claim, a note and a citation is what a sound system demands of its notations, and it will be tested in the exercises below.
:::

::: application Your keyboard is a phonology laboratory
**Type in pinyin without tone marks and watch what the software does: it segments, it predicts by frequency, it corrects your `cn` to `ch`, and it decides whether `xian` is 先, 西安 or 现.** **Every one of these is a linguistic decision, made by a model rather than by a committee, and every one is visible to you as a candidate list: an orthographic ambiguity displayed as a menu.** **Three experiments worth doing. ① Type a string with no legal parse and see what is invented. ② Type a dialectal reading that your template forbids and note which standard word is offered instead — that is the software enforcing the phonotaxis the first half of this chapter described.** ③ **Type a word you know is spelled two ways by different dictionaries and record which wins.** **The point is not that the software is right; it is that for the first time in history the ambiguity of the spelling is measurable, which makes the keyboard an instrument for the chapter's last exercise.**
:::

## What comes next

**The next chapters take the template apart: the initials and their places of articulation, the finals as a system rather than a list, the tones and their sandhi, and the stress and intonation that the scheme does not write at all.** **Keep three habits from this chapter: count slots before counting sounds; ask whether a missing sound is a missing position; and file every notation in its own column, because the fastest way to say something wrong about Mandarin is to quote its spelling as though it were a transcription.**

::: summary
This chapter delivered: **the syllable** (one pulse plus one tone; morpheme alignment is not guaranteed), **the template** (four slots, two codas, a permission list), **the no-cluster theorem** (with its proof by turnstile and its loanword corollary), **the four spelling transformations** (each an economy bought with a phonological fact), **the tone-mark rule** (following the hidden structure), **word-spelling** (a public analysis with no agreed definition), and the three-account discipline — **letters, phonemes, substance** — that the note and the keyboard section both exist to install.
:::

## Exercises

::: exercise Template capacity {level=1 check="4"}
By [[#def-muban]], how many segmental phonemes can a maximally filled Mandarin syllable contain (tone not counted)?
::: solution
Four: one each of initial, medial, nucleus and coda (as in 窗 /ʂ u a ŋ/). The tone occupies no slot — it is suprasegmental — so four is the ceiling.
:::
:::

::: exercise Find the illegal spelling {level=1}
Each spelling below violates one clause; correct it and name the clause: (1) xian (the city "西安"); (2) lǔ (the colour "green"); (3) jiù (the number "nine"); (4) qü (the verb "go"); (5) nu (the noun "woman").
::: solution
(1) Xī'an: capitalise the proper name and divide before an initial vowel. (2) lǜ: the umlaut must keep its points after n and l, where 路 and 绿 contrast. (3) jiǔ: the word is third tone, and the mark on `iu` goes on the later element in any case. (4) qù: after j, q, x the points are dropped. (5) nǚ: points kept and third tone — delete either and you have written "努". **Every decision follows from one test: if a contrast stands there, the mark must stand; if none can, the mark must go. The scheme's economy and its disambiguation are the same sentence.**
:::
:::

::: exercise Audit the letter names {level=1}
Teaching gives the initials the names "bo po mo fo", while the scheme says these are only the "calling sounds" of letters. Explain why a bare b needs a tail, and whether that tail misleads.
::: solution
A pure stop has nothing to sustain after release, so a classroom cannot call it or hold it; a short vowel is attached to make a sayable name — **a pedagogic device, not a record of substance.** And yes, it misleads: a student who hears "bo" as the sound of b attributes either voicing or a vowel tail to it. **The remedy is this chapter's three-layer discipline: the name of a letter, its value inside a spelling, and the substance it stands for are three accounts, audited separately.**
:::
:::

::: exercise Diagnose the stuck template {level=2}
A friend returning from England wants to practise three sounds Mandarin "does not have": [ŋi⁵¹], [fai⁵¹], [to⁵⁵]. For each: does the template permit it, does a dictionary have a character, and what counts as common?
::: solution
**[ŋi⁵¹]**: not permitted — ŋ is not on the initial list (it serves only in coda position), though it is a live initial in Cantonese and colloquial Hokkien. **[fai⁵¹]**: permitted and empty — f + ai is legal, and the standard has no such syllable (费 is fèi), while several varieties say something close for "fly/ash". **[to⁵⁵]**: likewise "template passes, dictionary empty" — 多 is [twɔ], and the [to] series belongs to Cantonese. **Three accounts: permissive template, populated lexicon, and frequency; comparative dialectology and lexicography both work in the gaps between them.**
:::
:::

::: exercise Place the apostrophe {level=2}
Decide which compounds need a dividing apostrophe, write it or justify its absence: 西安, 皮鹅, 白衣 (衣 as yi), 名誉 (míngyù), 感恩 (two zero-initials, one word).
::: solution
**西安 Xī'an**: needed — unmarked it parses as one syllable, xian, and this is the scheme's textbook case. **皮鹅 pí'o**: needed — a standard example. **白衣 bái yī**: not needed — spelling by word separates them and `yi` carries its own boundary. **名誉 míngyù**: not needed — `y` marks the boundary itself. **感恩**: gǎn'ēn is safer, though gannen is readable — **the rule requires the mark only where misreading is possible, and at the margin two answers are defensible; quote the four words "misreading is possible" and state your parse.**
:::
:::

::: exercise The trade-offs of the scheme {level=3}
"知" zhī uses a digraph rather than a special letter, while "女" nǚ keeps its two points. Defend each decision on the balance of economy against disambiguation, then give one objection to each.
::: solution
**The digraph zh**: no modification to keyboard or type (economy), and it forms a family with ch and sh, which teaches easily (disambiguation); **objection**: the spelling inflates — "zhīdào" needs five letters where a single symbol for [tʂ] would save two, a real cost in the teleprint era. **The umlaut on ü**: obligatory after n and l where the contrast exists, deleted after j, q, x, y where complementary distribution guarantees safety; **objection**: the put-on-and-take-off rule is a conditional that beginners must memorise, and some keyboard systems simply write `v` for everything — **which is what everyday digital typing has in fact chosen, a de facto dual system.** Both positions are on the record of the 1950s discussions; what this exercise grades is reasoning for a norm, and it takes no side.
:::
:::

::: exercise Audit a syllable table in the wild {level=3}
Using any pinyin-ordered dictionary: (1) find one example character for ch- + -uan in each tone; (2) explain why the dictionary orders finals by letters rather than by the mouth; (3) count the characters under chuān, chuán, chuǎn, chuàn and say which tone is busiest and which is propped up by rare characters.
::: solution
**Sample: chuān 穿, chuán 传/船, chuǎn 踳 (rare), chuàn 串/钏** — level, rising and departing are well stocked, while the third tone is thin and rests on odd characters. **A dictionary's order is a projection of the syllable template plus the letters of the spelling** (the main vowel letter first, then the coda letter, ü filed with u), **not a picture of the mouth — a neat case of the scheme shaping teaching and retrieval.** For (3), **use only the dictionary in front of you, cite page numbers, and write the path you took: the audit trail is worth more than the count.** That is this course's empirical minimum, and it is the same duty the academic-writing course calls a search log.
:::
:::
