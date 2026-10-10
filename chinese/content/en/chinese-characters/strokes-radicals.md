---
title: "Strokes, components and radicals"
---

From "how this character is written, stroke by stroke" to "how this pile of characters is looked up, how it is ordered and how it is standardised", this chapter sets out in one go the hierarchy of the smallest units of the Chinese character (sinogram) — **strokes, components and the whole character** — together with the **radical** (section header) used for retrieval. They are the grammar of the teaching of character recognition, the screws of lexicography, and the underlying specification of the engineering of input methods and font libraries.

## Strokes: the smallest unit of writing {#sec-bihua}

::: definition Strokes and the stroke system {#def-bihua}
A stroke is **a continuous stretch of line completed in writing from the moment the pen is set down until it is lifted**, and it is the smallest unit in the analysis of the modern Chinese character. The *Standard Stroke Order of Generally Used Characters in Modern Chinese* (《现代汉语通用字笔顺规范》, issued by the State Language Commission in 1997) classes the strokes of characters in general use under **five great classes: horizontal, vertical, left-falling, dot and turning** (the so-called "method of the character 札": the horizontal as in 一, the vertical as in 丨, the left-falling as in 丿, the dot as in 丶, and the turning as in 乙). The turning class contains several dozen small classes, including the horizontal-turn, the vertical-turn, the left-falling-turn, and various compound strokes with bends and hooks. Counting strokes, arranging entries for lookup, and counting the frequency of characters all operate by this five-way classification: 为 has four strokes, 凸 five, and 爽 ten.
:::

::: definition Stroke order: the linear standard of writing {#def-bishun}
Stroke order is the order in which strokes appear. Eight rules are in general use: **horizontal before vertical** (十), **left-falling before right-falling** (人), **from top to bottom** (三), **from left to right** (明), **outside before inside** (月), **the inside before the opening is sealed** (田), **the middle before the two sides** (小, 水), and, for the 走之 bottom, **the right-falling stroke written last** (过, 建). There are besides a number of rules special to particular characters: in an upper-right three-sided enclosure, the top comes before the lower left (司, 冈); in a character with a 戈 hook, the slanting hook is written before the short left-falling and the dot that follow it (我, 成); where a left-falling stroke and a turning stroke cross, the left-falling comes before the turn (九, 力).
:::

::: theorem Stroke order is not a question of taste; it is a question of the standard {#rule-bishun-gui}
If different stroke orders for one and the same character exist side by side, they directly manufacture three accidents. (1) **The stroke count does not agree** — whether 必 is written with the 心 first or with the left-falling first differs from book to book, and a lookup table then has nothing to follow. (2) **Marks are lost on assessment against the standard** — the teaching of Chinese and the tests of teacher qualification mark the papers by the *Stroke Order Standard*, and a popular order (for example writing the two vertical left-falling strokes of 火 first and then filling in the dots) is counted wrong without exception. (3) **Standards for information processing conflict** — ordering by classes of stroke (as in old editions of the *Cihai* 辞海 ('Sea of Words'), and in the ordering of some character sets) classifies by the first stroke of the stroke order; if the first strokes do not agree, the place in the sequence drifts. So remember: stroke order is something that has a **national standard**. Authority rests with the *Standard Stroke Order of Generally Used Characters in Modern Chinese*. A disputed character is looked up there, and not in a moving picture on the internet.
:::

::: example Checking the stroke order character by character {#ex-bishun-yan}
Write out, according to the standard, the stroke sequence and the stroke count of 为, 九, 火 and 凸.
::: solution
为: dot, left-falling, horizontal-turning hook, dot — four strokes. 九: left-falling, horizontal-turning bent hook — two strokes (left-falling before the turn). 火: dot, short left-falling, vertical left-falling, right-falling — four strokes (the dots on the two sides first, then the two strokes that prop it up). 凸: short vertical, horizontal, vertical, horizontal-turn-turn-turn, long horizontal — five strokes. The standard of judgement does not rely on the feel of the hand; it relies on consulting a table — and that is precisely why the "standard" exists.
:::
:::

::: widget graph
nodes: 永@0,3; 侧（点）@-3.2,1.6; 勒（横）@-1.6,1.6; 努（竖）@0,1.6; 趯（钩）@1.6,1.6; 策（提）@3.2,1.6; 掠（长撇）@-2.4,0.2; 啄（短撇）@-0.8,0.2; 磔（捺）@0.8,0.2; 缺：折、横折钩@2.6,0.2
edges: 永>侧（点）; 永>勒（横）; 永>努（竖）; 永>趯（钩）; 永>策（提）; 永>掠（长撇）; 永>啄（短撇）; 永>磔（捺）; 永>缺：折、横折钩
caption: The Eight Principles of 永: calligraphers of the Tang and the Song took the single character 永 as a teaching aid for eight kinds of brush method (侧, 勒, 努, 趯, 策, 掠, 啄, 磔 — that is, dot, horizontal, vertical, hook, rising, long left-falling, short left-falling and right-falling). Looked at by the modern five-way classification, it is in fact not "complete": strokes of the turning class do not appear at all. "The eight principles furnish every stroke" is a mnemonic of the study of calligraphy, not a statistic of the study of strokes; the two stand an age apart.
:::

## From the Eight Principles of 永 to the standardisation of character forms {#sec-baxing}

::: history From the eight principles to the national standard: a thousand-year road of standardising strokes
Discussions of calligraphy in the Tang, circulating under the name of Zhang Xu 张旭 and others, established the "Eight Principles of the character 永". What the Song *Yuhai* 玉海 ('Sea of Jade') quotes, and what Chen Yizeng 陈绎曾 of the Yuan greatly elaborated in *Hanlin yaojue* 翰林要诀 ('Essentials of the Hanlin') — the eight principles are in essence **a mnemonic for the teaching of brush method**, not a taxonomy of strokes. After printing arose, the first real problem appeared: for one and the same character, copyists and block-cutters wrote it in different ways, and the **character form** needed a standard. In 1965 the Ministry of Culture and the 文委 published the *Table of Printed Forms of Chinese Characters in General Use* (《印刷通用汉字字形表》, 6,196 characters), and settled the principles of the new character forms, "follow the popular, follow the simple, and attend to systematicity". A batch of old printed forms left the stage (for example, the belly of 者 takes 日 and not 曰; the last stroke of 今 takes a dot and not a horizontal; the lower part of 琴 follows 今 and not 金). There followed, one after another, the *Table of Generally Used Characters in Modern Chinese* (《现代汉语通用字表》, 7,000 characters) in 1988, the *Standard Stroke Order of Generally Used Characters in Modern Chinese* in 1997, and the *Table of Chinese Character Radicals* (《汉字部首表》; 201 main radicals and 99 attached-form radicals) in 2009. By this point the four-piece set "character form — stroke count — stroke order — radical assignment" had all been standardised: the old world of the traditional "master who writes large characters" gave way to the precise engineering of national standards.
:::

::: warning The printed form is not the only correct character
"Whether a vertical hook carries a hook", "whether a dot is written as a side-dot or as a rising dot", "the right-falling of the wood radical changed to a dot" — these are normal discrepancies between **printed character forms and handwritten variants**. What the standard governs is the stroke count, the stroke order and the composition in components (the identity of the constituents). It does not govern a taste for the brush, or the style of fine detail. When homework is marked, to count it wrong because "the horizontal-turn of 口 was written as two strokes", or, the other way about, to allow "the pause-corner at the start of a horizontal to count as one stroke", is in either case to mix up the standard for character form and the standard for strokes. Judging a standard character has three layers: **the constituents right, the stroke count right, the stroke order right**. Whether the shape is fat or thin is not among them.
:::

## Components: the structural layer between strokes and the whole character {#sec-bujian}

::: definition Components and types of structure {#def-bujian}
A component (a code element, a grapheme, a constituent) is a unit **made up of strokes and also possessed of an independent capacity to form characters**: 意 may be split into 音 and 心, and 音 split again into 立 and 日. By whether they can stand alone as characters, they divide into **character-forming components** (日, 木, 口) and **non-character pieces** (刂, 宀, 艹, 辶, whose standard names are 立刀儿, 宝盖头, 草字头 and 走之底 — 'standing knife', 'treasure-cover head', 'grass-character head' and 'walking bottom' — and the names themselves were also laid down by the 1997 standard). By their function in forming characters they divide into three classes, **semantic component (signific), phonetic component (phonophore) and marker** (for the distinction of characters in which a component is also the phonetic, see [[chinese-characters/phonetic-compounds]]). By the layout of the whole character they divide into five types of structure: **left–right, top–bottom, enclosure, the 品 arrangement and single-body**.
:::

::: theorem Component analysis is a "two-level cut", not one wild taking-apart {#rule-liangceng}
A scientific split cuts only **a single layer of structure**: first, by the immediate constituents, sever the character in two with one cut (意 → 音 + 心), then split each of them further down (音 → 立 + 日). A split that skips a layer (意 → 立 + 日 + 心, in one breath) destroys structural information, stroke counts and encoding. Split in the wrong place, and the relations of inheritance are thrown into complete disorder — if 颖 is split, skipping a layer, into the three pieces 匕, 禾 and 页, the intermediate structural layer 顷 is lost, and both the explanatory study of the character and the encoding are thrown out of place. Analysis goes on until it reaches "the smallest unit that still forms a character, or that is a component by convention", and stops; what remains is a non-character piece or a single-body marker.
:::

::: example A component check-up for five characters {#ex-tijian}
问, 壁, 颖, 疑 and 国: point out the immediate constituents and the type of structure, and mark the semantic components, the phonetic components and the markers among them.
::: solution
问: 门 + 口, inside and outside (does the form of 门 indicate the meaning? 问 is 从口门声 — here 门 is a special case of a phonetic component). 壁: 辟 + 土, a phono-semantic compound (semantic-phonetic compound); 辟 is the phonetic and 土 the semantic; top–bottom. 颖: 从禾顷声 (the *Shuowen jiezi* (*Explaining Graphs and Analysing Characters*) says "颖，禾末也", '颖 is the tip of the grain.' (Our translation.)); 禾 is the semantic component and 顷 the phonetic. 疑: in the oracle-bone inscriptions it has the form of a person holding a pestle and walking in doubt; after the clerical change the relations among the components lost their weight — component analysis judges it a **marker character** (an orphan whose constituents no longer indicate sound or meaning). 国: 囗 + 玉. Whether 国 is a compound ideograph (associative compound) built on 玉, or a phono-semantic compound, is disputed — 囗 is a symbol of range (a constituent of the marker kind), 玉 indicates the meaning, and the simplified character 国 is often cited as a case in the discussion of "phono-semantic compounds turning muddy after simplification" (the details are in the next chapter). The conclusion of the check-up: even with characters such as 疑 and 国, whose components look clear, the judgement of function is often anaemic too.
:::
:::

## Radicals: a history of retrieval, from 540 to 201 {#sec-bushou}

::: definition The radical {#def-bushou}
A radical is **a head character under which characters are grouped by semantic class or by graphic form**. Characters of the same radical are gathered in one place in a dictionary. Its function has two faces: **a marker of semantic class** (艸, 水 and 玉 mark the categories in a string — the legacy of the *Shuowen* system) and **a pure symbol of retrieval** (the "method of looking characters up" face of dictionaries in recent times; even "under which radical a hard-to-find character is to be sought" is fixed as a mnemonic: characters one cannot find are sought by the initial stroke, and by the appendix of characters hard to find). A radical is not a component. A component is a unit of structure; a radical is a unit of ordering. Which component of one and the same character is taken as the radical is for the dictionary to decide.
:::

::: history Four slimmings of the radical system {#sec-bushou-line}
- Eastern Han, Xu Shen 许慎, *Shuowen jiezi*: 540 radicals, one character to a radical; the radicals were all chosen as characters with the power to command a semantic class, and the logic of graphic composition and the function of retrieval were one;
- Liao, Xingjun 行均, *Longkan shoujian* 龙龛手鉴 ('Hand Mirror of the Dragon Shrine') (997), answering the need to look up popular written forms, had already reduced and merged the radicals to 242 — the first sign of the slimming of the radicals;
- Ming, Mei Yingzuo 梅膺祚, *Zihui* 字汇 ('Compendium of Characters') (1615): merged and reduced to **214 radicals**, the radicals arranged by stroke count and, within a radical, the characters again arranged by stroke count — the radical turned from a system of semantic classes into a **skeleton for retrieval**. The Qing *Kangxi Dictionary* (《康熙字典》) followed it, and it became the greatest common denominator of modern times;
- From the Republican period to the present: the *Ciyuan* (《辞源》) and the *Cihai* each made their own additions and cuts (somewhere about 200 radicals); the *Xinhua Dictionary* (《新华字典》, first edition 1953) used lookup by "radical plus stroke count", with 189 radicals; in 2009 the *Table of Chinese Character Radicals* fixed **201 main radicals and 99 attached-form radicals**, settling the shares and ending the disputes for reference books and for informatisation.
:::

::: example Three unsettled cases of assigning radicals {#ex-sanhua}
Under which radical is each of 为, 闻 and 颖 looked up, in the three systems?
::: solution
为: there is no character-forming radical it can be assigned to, so it goes under the **丶 radical** (taking the first stroke — a typical case of the lookup rule "查不到部首查起笔", 'if the radical cannot be found, look up the initial stroke'). 闻: the 门 radical (the outer form has priority, although the semantic sign is in 耳). 颖: the *Shuowen* line assigns it to the **禾 radical** (the semantic component); in the *Xinhua Dictionary*, looking it up by the modern character form under the **匕 radical or the 页 radical**, one can in either case reach it by way of the table of characters hard to find. In a radical system in which form and meaning have come apart, "where the character is actually entered" always has more of a say than "where the character ought to be".
:::
:::

::: intuition In a child's eyes a character is a picture; in a dictionary's eyes a character is a set of nesting dolls
A pupil in the first year, writing 树, will conclude on their own that it is "the three components 木, 又 and 寸". What is written is right, but the layer of the split is not (the standard analysis in several layers is 树 → 木 + 尌, and 尌 → 壴 + 寸; nor is the popular split into 木, 又 and 寸 without its reasons — the hierarchy of components simply allows more than one set of analyses, so long as each is self-consistent). The way to put it is: **analysis has its axioms, and a character has no unique answer**. The study of components and the study of radicals are engineering disciplines of the "good enough" kind; only when the standard is unified is there any exchanging of views. This is precisely the join between this chapter and the next (simplification and the standard): once a standard is published, the writing of characters, the looking of them up, their ordering, and the codes of input methods all follow it.
:::

::: example The Four-Corner numbers: another road that bypasses the radical {#ex-sijiao}
Why, in the 1920s, did Four-Corner lookup have to be invented? State the two great sore points of looking characters up by radical, and the countermeasure of the Four-Corner numbers.
::: solution
The first sore point: not knowing the radical (the difficulty of 彙, 为 and 凸). The second sore point: the radical has no fixed position in the character (it may stand above, below, to the left, to the right, inside or outside), and the cost of hunting through the pages is high. The Four-Corner numbers (proposed by Wang Yunwu 王云五 in 1925) simply abolish the radical, and take one **stroke-shape** from each of the four corners of the character to compile a four-digit number (with one supplementary digit attached). If you can see the character, you can write the code — and an uncommon character of the kind of 端 or 放 can be retrieved while you wait. The price is the subjective ambiguity of judging stroke-shapes, and the cost of training in the mnemonic. In the end it lost to lookup by Pinyin (from *The Contemporary Chinese Dictionary*, 《现代汉语词典》, of 1978 onward), yet, where one "knows the form but not the sound", in archives and in the putting in order of old books, it keeps a single thread of incense burning. The competitive history of methods of lookup shows: **the merit of a retrieval system lies not in the elegance of its principle, but in the threshold it sets for the user**.
:::
:::

::: history A dispute over the strokes of one character: taking 乃 and 与 as the mirror {#sec-naiyu}
乃, in running script (semi-cursive), is finished by writing it linked, in a single stroke, whereas the standard of the regularised form fixes it as two strokes, and those who popularly write it in one stroke are many. The stroke order of 与 (horizontal, vertical-turn-turn-hook, horizontal) has long been fought over both inside the classroom and outside it. The public procedure for handling small cases of this kind is: teachers and publishing houses carry the standard out, and when the standard is revised it is changed on the evidence of investigation. The determinacy of strokes is the first "table of identity-card numbers" that the modern state has given the world of writing. The *First List for Sorting Out Variant Characters* of 1955 (《第一批异体字整理表》) and the *Table of Character Forms* and the *Stroke Order Standard* of 1965 are of one continuous line: **first fix the form, then fix the order, and only then can the "canon" be fixed**.
:::

::: summary
The three-piece set of levels: strokes (five classes: horizontal, vertical, left-falling, dot, turning) → components (character-forming / non-character; semantic / phonetic / marker; five layouts) → the whole character. The radical is a unit of retrieval and not a unit of structure: 540 radicals (the *Shuowen jiezi*) → 214 radicals (the *Zihui*, the *Kangxi Dictionary*) → 201 main radicals (the national standard of 2009). Eight rules of stroke order, plus rules special to particular characters; the authority is the *Stroke Order Standard* of 1997. The change from old printed forms to new was settled with one blow of the hammer by the *Table of Character Forms* of 1965. The Eight Principles of 永 are a mnemonic of brush method, not a tally of strokes. Component analysis cuts a single layer, and stops at the smallest functional piece. The succession of radical assignment, the Four-Corner numbers and lookup by Pinyin writes out in full the evolutionary law of tools, that "the threshold comes first".
:::

::: quiz
By the five-way classification of the "method of the character 札", the strokes that make up the character 为 are ( ).
- [ ] horizontal, vertical, left-falling, dot
- [x] dot, left-falling, turning, dot
- [ ] left-falling, horizontal-turning hook, dot, dot
- [ ] dot, horizontal, vertical-turning, dot
::: solution
为 has four strokes: dot, left-falling, horizontal-turning hook (the turning class), dot — a stroke of the turning class counts as only one stroke. The three-way division is a common popular error (splitting the horizontal-turning hook into two strokes).
:::
:::

::: quiz
Which of the following does not belong among the stroke-order rules in general use? ( )
- [ ] the inside before the opening is sealed
- [ ] the middle before the two sides
- [x] long before short
- [ ] outside before inside
::: solution
"Long before short" is made up. Among the eight rules in general use there is no entry that orders strokes by their length. Length is a matter of the style of holding the brush; it does not enter the standard.
:::
:::

::: quiz
The *Table of Chinese Character Radicals* (2009) fixes the number of main radicals at ( ).
- [ ] 214
- [ ] 189
- [x] 201
- [ ] 540
::: solution
201 main radicals, and 99 attached-form radicals. 214 is the old system of the *Zihui* and the *Kangxi Dictionary*; 189 is the number of radicals the *Xinhua Dictionary* once used; 540 is the ancient number in the *Shuowen jiezi*.
:::
:::

::: exercise Counting strokes {level=1}
Count the standard number of strokes of the following characters: "凸, 爽, 四, 乃, 乃"? A repetition — correction: "凸, 爽, 四, 为, 火".
::: solution
凸 5, 爽 11, 四 5, 为 4, 火 4. 四 has five strokes (vertical, horizontal-turn, left-falling, vertical bend, horizontal — the last stroke is the long horizontal that seals the opening; do not drop the left-falling and merge it into the vertical bend). 爽 has eleven strokes (大 plus four ㄨ).
:::
:::

::: exercise Finding the errors {level=1}
Point out the errors in the following statements: (1) "The Eight Principles of 永 include all eight basic strokes"; (2) "A radical is simply the component with the most meaning"; (3) "Only when the stroke order is right can the stroke count be right".
::: solution
(1) The eight principles are a mnemonic of brush method; reckoned by the modern five classes of stroke, 永 is not complete (the turning class is missing). (2) A radical is a unit of ordering; it does not necessarily indicate meaning (in the lookup system, 为 is assigned to the 丶 radical). (3) The two halves of the sentence are not conditions of each other — stroke order and stroke count are different dimensions. A wrong order may have the count right, and a right order may have the count wrong (when strokes are split apart or joined together).
:::
:::

::: exercise Segmenting into components {level=2}
For 赢, 裹, 街 and 国, make a single-layer cut into immediate constituents, and mark the type of each constituent (character-forming / non-character; able to indicate sound or meaning / marker).
::: solution
赢: the *Shuowen jiezi* says "从贝，嬴省声", 'from 贝, with 嬴 abbreviated as the phonetic.' (Our translation.) A scholarly segmentation first divides the two layers "嬴 abbreviated / 贝". The popular "亡口月贝凡", handy for remembering and for writing, is a multi-layer popular split — both accounts may be used, but one must state which layer one's own is. 裹: 从衣, 果声 ('following 衣, with 果 as the phonetic'); 衣 is cut open through the middle and wraps 果 (the so-called pierced-centre structure). 街: 从行, 圭声 ('following 行, with 圭 as the phonetic'); 行 is divided into a left half and a right half, each of them a character. 国: 囗 + 玉 (囗 a symbol of range, 玉 a semantic sign; whether 玉 is at the same time the phonetic is disputed). The weight of this question falls on "first cut the immediate constituents, and only then talk of function". Whoever splits 赢 into five pieces in one breath, without distinguishing layers, loses marks.
:::
:::

::: exercise Lookup in practice {level=2}
Without using Pinyin, find where 彧, 杌 and 耄 belong, by the radical method, the Four-Corner number method and the method of ordering by strokes respectively: for each, write the radical / the first corner of the number / the class of initial stroke it falls under, and report for each method whether it will jam.
::: solution
彧: mainstream dictionaries enter it under the 彡 radical; if one does not know the radical, one searches alongside by the table of characters hard to find, in the horizontal class of initial stroke. 杌: the 木 radical; the first stroke is horizontal (the first stroke of the hand radical and the first stroke of the wood radical are both assigned to the horizontal class). 耄: the 老 radical (the altered head 耂); the initial stroke is horizontal. Where one jams is the point an honest report must dwell on: 彧 jams easily (the radical is not known), 杌 does not jam (the semantic component is obvious), 耄 half-jams (whether or not one can recognise the altered 耂 of the 老 radical). The conclusion of trying it: the threshold of the radical method lies in "remembering the altered forms of radicals, and where a character belongs".
:::
:::

::: exercise A short essay: should stroke order "follow the popular"? {level=3}
For characters such as 火, 必, 为 and 与, stroke order has long run on two tracks, the "standard for teaching" and "popular writing among the public". Write a short essay of eight hundred to twelve hundred characters: should the standard of stroke order give way to popular writing? You are required to cite the framework, from this chapter, of the "three accidents of the problem of the standard", and to find one counter-example for each.
::: solution
Points for marking: the position is clear and well reasoned (both giving way and not giving way can be written well); the "accident framework" is used correctly (lookup, assessment, ordering) — the case for giving way is mostly argued from the continuity of handwriting and from the cognitive load, while the case for holding to the established standard stresses the stability of the standard and consistency in the processing of information; the counter-examples are real (for example a real case in which the popular writing of 乃 in one stroke makes a count of two strokes fail, or a hypothetical case in which the popular order of 九, the turn before the left-falling, shifts its place in an ordering); extra marks if the conclusion offers a workable scheme (for example "a single standard in teaching, the two tracks coexisting in society, and systems of lookup taking the standard as their authority").
:::
:::
