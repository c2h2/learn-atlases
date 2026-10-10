---
title: "Characters in the digital age"
---

Chinese characters (sinograms) were once declared 'unable to survive the computer'. In the 1980s, that they 'could not enter the information age' was almost the ironclad proof of the thesis that Chinese characters were backward; forty years later, Chinese is one of the languages with the greatest output on the internet, and keyboards and screens show no rejection of Chinese characters at all. This chapter tells the engineering history of that comeback from the brink — four inventions, **encoding, input, glyphs and recognition** — and the new ailments, and the new ways of playing, that the digital age has brought to Chinese characters.

## Encoding: giving Chinese characters a household registration {#sec-bianma}

::: definition From section-position to a unified code point {#def-quwei}
An electronic computer recognises only binary. The first step in getting Chinese characters onto a machine is to assign every character a **number**. China's first motorway was **GB 2312—1980** *Coded Chinese Character Set for Information Interchange · Basic Set*: it takes in 6,763 standard characters other than traditional characters, plus 682 kinds of symbol, and lays them out as a square array of ‘**94 sections × 94 positions in each section**’ (Level 1 characters arranged by Hanyu Pinyin, Level 2 characters by radical (section header) and number of strokes). The mnemonic from section-position code (区位码) to internal code (机内码) is to add 160 (A0 in hexadecimal) at each level. Thus 地 is in section 21, position 21: the section-position code is 2121, the national-standard code (国标码) is then 3535 (hexadecimal), and the internal code is B5B5. **BIG5** (Taiwan, 1984) takes in somewhere about fourteen thousand characters, in double-byte ranges such as 42021—87797; the decade in which it and GB each ran its own affairs was precisely the golden age of garbled Chinese text (乱码).
:::

::: theorem Two thousand years of one script, two thousand years of different codes {#rule-yima}
GB, BIG5, EUC, Shift-JIS, KSX — each part of the cultural sphere of Chinese characters built its own code table, and the same stretch of text, moved into another environment, becomes ‘锟斤拷烫烫烫’. There was only one way out: **one world, one table**. In 1991 the Unicode Consortium was founded. The project carried out in concert with ISO 10646, under ‘common criteria, encode once’ (共同准则、一次编码), put the writing systems of the whole world into a single master table of code points on the scale of a hundred thousand (the standard now in force records more than 150,000 characters). Within it, the **basic block of CJK Unified Ideographs** (U+4E00–U+9FFF) holds 20,992 positions; Extension A (6,592 characters), Extension B (42,711 characters), and so on up to Extension H of Unicode 16.0 in 2024, come to **a total of several tens of thousands of characters**. The ‘ten thousand codes at full gallop’ (万码奔腾) of that time ended in ‘one character, one code, unified worldwide’ (一字一码、全球统一).
:::

::: example One code point, several faces {#ex-yima-duoxing}
Are ‘强／強’ and ‘户／戶’ the same code point on two devices? Why do they display differently? When a character from an extension block in a personal name (such as ‘𬀩’) becomes a box on an old system, which layer is at fault?
::: solution
A unified code point registers only the **abstract character** (字位) and not the **glyph** (字形) — the greatest compromise in the unification of Chinese characters, and its greatest wisdom. ‘强’ and ‘強’, and ‘戸’ and ‘戶’, are in most cases **regional variant glyphs** of one and the same code point, and their look is decided by the font (or by the `lang` rendering environment). That ‘𬀩’ displays as a box shows that the **font layer** lacks the glyph (the code point has its household registration, but the font library has not built the house). The order of remedy is: upgrade the font library → install the manufacturer's extension font → and, as a last resort, use the PUA (Private Use Area) to coin a character or paste in an image. The three layers (code point / glyph / input) each have their own ailment; locate it before giving the medicine.
:::
:::

::: widget graph
nodes: 汉字数字化四件套@0,3; 编码（字有位）@-3.6,1.3; 字库（位有形）@-1.2,1.3; 输入（形可生）@1.2,1.3; 识别（形可读）@3.6,1.3; GB2312-BIG5-Unicode@-3.6,-0.5; 印刷/手写/古籍字体@-1.2,-0.5; 音码-形码-智能预测@1.2,-0.5; OCR-HTR-古文字识别@3.6,-0.5
edges: 汉字数字化四件套>编码（字有位）; 汉字数字化四件套>字库（位有形）; 汉字数字化四件套>输入（形可生）; 汉字数字化四件套>识别（形可读）; 编码（字有位）>GB2312-BIG5-Unicode; 字库（位有形）>印刷/手写/古籍字体; 输入（形可生）>音码-形码-智能预测; 识别（形可读）>OCR-HTR-古文字识别
caption: The four-layer stack for getting Chinese characters onto a machine: encoding gives them a household registration, the font library a face, input a way of coming into being, and recognition eyes. A fault in any layer (garbled text, tofu blocks, slow as an ox, failure to recognise) was, in the 1990s, taken as evidence that 'Chinese characters ought to die' — and the comeback was made precisely by completing all four layers at once.
:::

## Input and printing: from 'ten thousand codes at full gallop' to 'prediction is input' {#sec-shuru}

::: definition Three generations of input methods {#def-sr}
**Sound codes** (音码): Hanyu Pinyin, double Pinyin (双拼), Zhuyin (注音) — no barrier to entry, and disambiguation relies on homophones. **Shape codes** (形码): Cangjie (仓颉; Zhu Bangfu 朱邦复, the late 1970s), Wubi (五笔; Wang Yongmin 王永民, the 1986 version) — characters are split by their roots, duplicate codes are few, a practised hand is fast, and the cost of learning is high. **The third generation (intelligent whole-sentence input)**: as mobile phones and cloud computing matured in the 2000s, prediction by whole-sentence language models turned 'input' into 'selection', and the ceiling on speed gave way to the scale of the corpus behind the input method. The substance of the turnover in the market (Intelligent ABC → Sogou Pinyin in 2006 → the intelligent input methods built into mobile phones) is this: **sovereignty over disambiguation passed from human hands to the model**.
:::

::: history Project 748: the decade that crammed Chinese characters into the laser {#sec-748}
On 1 August 1974 the 'Chinese Character Information Processing System Project' (Project 748) was approved. The task of Wang Xuan's 王选 team was the laser phototypesetting of Chinese characters. The core difficulty was not the laser but the **vast storage and restoration of outline information for Chinese characters** — Wang Xuan, by a parametric description of outlines ('describing strokes with mathematical functions'), together with dedicated very-large-scale circuits, restored in real time glyphs enlarged a hundredfold. In 1979 the first sample newspaper was typeset and run off; in 1981 it passed appraisal; and from the mid-1980s newspaper offices began to retire their lead type. Peking University Founder (北大方正) grew into an industry out of this. Without this battle, who knows how many more years Chinese printing would have remained stuck beside the furnace of 'lead and fire'. The public verdict which this generation of engineering left to the newspaper industry was ‘结束了铅与火的时代’: it had brought the age of lead and fire to an end. (Our translation.) Another battlefield of the same period was 'getting onto the PC': Chinese-character cards, Han cards (汉卡), Chinese Star (中文之星, 1992), Yitian RichWin (倚天RichWin, 1994), and at last native support in Windows — hardware, software and the font library were filled out as three in one, and in the late 1990s the Chinese-language internet began to explode. What had been called 'Chinese characters bidding the information age farewell' was in the end shown to be **an engineering problem, not a problem of the script**.
:::

## Character ailments and new ways of playing in the digital age {#sec-bing}

::: example Is ‘蓝瘦香菇’ a wrongly chosen character? {#ex-lsxg}
Using the 'three-track reckoning of faults' (三轨计过) in [[chinese-characters/standard-characters]], diagnose the following online writing: ① 蓝瘦香菇 (难受想哭, 'feeling awful and wanting to cry'); ② Pinyin initials of the 'awsl' kind; ③ one and the same message, one device showing ‘强’ and another showing ‘強’; ④ ‘砼’ (tóng, a compound ideograph (associative compound) coined in the construction industry) entering an official document.
::: solution
① **Deliberate homophonic rhetoric** (a dialect meme, played as a meme; the person doing it knows the correct characters full well) — not an ailment, but a style of writing; yet if it is carried over into a formal text, it is treated as an error. ② **Discourse in letter-codes** (words coined from the initials of Pinyin): jargon and an in-group cipher, which fails as soon as it crosses out of the group. ③ **A normal phenomenon at the level of abstract character and glyph**: regional glyphs of the same code point under different fonts constitute no error at all, yet are often taken for 'you typed it wrong'. ④ **A character coined within an industry** (just like ‘砼’ above): an 'industry-specific character' on the edge of the lists of standard characters; in an official document it must be changed to 混凝土 ('concrete'). The diagnostic conclusion: the internet is not a 'collapse of characters', but **an intensifying split of register** — each circle lays down its own legitimate writing, and the question of the norm turns from 'right or wrong' to 'what is fitting'.
:::
:::

::: intuition Forgetting the character with the pen in hand: which muscle is declining
Experimental psychology locates it very precisely: what is damaged is **motor production** (the hand's procedure for strokes), not **recognition knowledge** (the glyph store of the eye and the brain) — so you can recognise the two characters ‘尴尬’ at a glance, yet cannot write the left half. Digital input has not weakened 'knowing characters'; it has only changed the channel of production from 'writing stroke by stroke' to 'selecting the whole character' — just as the calculator has not weakened people who have number sense, but has only eliminated people who can only calculate. The criterion for 'whether one should be anxious' lies in the use. If writing characters is left with nothing but the signature and calligraphy, that is a matter of aesthetics; if the occupation still requires handwriting (medical documents, annotations, education), the channel of production has to be deliberately maintained.
:::

::: warning Three popular misunderstandings
(1) 'Unicode unification merges the characters of China, Korea and Japan into one kind of character' — what is unified is the **code point**; variant glyphs are kept as before (rendered separately by regional fonts and by standards for glyphs). (2) 'If the font library lacks a character, blame Unicode for being slow' — a missing character is often a **question of sovereignty**: characters used in personal names have to be submitted to the IRGN/ICC for review as international proposals, the span from submission to entry in the code chart is counted in 'years', and the backlog of 'personal names in rare characters' at local public-security offices is precisely the bottleneck of this pipeline. (3) 'In the age of the keyboard, Chinese characters will be replaced by a Pinyin script' — the direction given by forty years of technical history is exactly the opposite: Pinyin input methods have **raised** the upper limit on the speed of entering Chinese characters, and the screen has instead made the younger generation of the cultural sphere of Chinese characters write more Chinese characters (in the sense of the quantity sent).
:::

::: history OCR and ancient books: letting the machine read a thousand years of characters {#sec-ocr}
The recognition of Chinese characters is a standing hard problem in textbooks of pattern recognition (several thousand classes, similar forms, and characters stuck together). OCR for printed characters was commercialised in the 1990s as scanners spread; handwritten recognition, HTR, was worked at for twenty years in the settings of mobile phones and bank slips; the true watershed is **ancient books and excavated documents**. An infrastructure of 'digital humanities' that joins together scanning, the cutting-out of characters, single-character recognition and glyph retrieval (such as databases of Chinese-character glyphs, character libraries for oracle-bone script, and AI research on piecing fragments together) has turned 'talking about a glyph' into 'looking a glyph up'. The direction has reversed, interestingly — technology invented in those years for 'getting Chinese characters onto the machine' has now become the principal tool for **preserving three thousand years of Chinese characters**.
:::

::: quiz
The structure of GB 2312—1980 is (　　).
- [ ] A linear table sorted by full Pinyin
- [x] A square matrix of 94 sections × 94 positions
- [ ] A Taiwanese mirror of Big5
- [ ] A subset mapping of Unicode
::: solution
'Section-position code' is what the 94×94 matrix means (Level 1 characters by Pinyin, Level 2 characters by radical and number of strokes). It is China's scheme of 1980; Unicode unification came twenty years after it.
:::
:::

::: quiz
‘𫊸’ (a character of an extension block) displays as a box on some devices. The reason is (　　).
- [ ] The code point does not exist
- [x] The font library on that device does not contain this glyph
- [ ] The input method does not support it
- [ ] It is a wrongly written character
::: solution
The code point really does exist (the household registration of the extension block is on the books). The box = a 'tofu block', the current font lacking the glyph. Supplying the font library or the font is enough; it has nothing to do with the input method (being able to type it is not the same as being able to display it, and that is the proof of the two layers).
:::
:::

::: quiz
The person who led the invention of the Chinese-character laser phototypesetting system, and its key technology, are (　　).
- [ ] Wang Yongmin; Wubi roots
- [x] Wang Xuan; mathematical parametric compression of glyph information, and high-speed restoration
- [ ] Wang Yunwu 王云五; the Four-Corner code
- [ ] Qian Weichang 钱伟长; a laser light source
::: solution
Wang Xuan (Project 748) solved the storage of glyphs in vast quantity by describing the outlines of strokes mathematically. This is the foremost project of 'the digital regeneration of Chinese characters'. Wang Yongmin is Wubi, and Wang Yunwu is the Four-Corner code — both of them figures on the side of 'input and retrieval'.
:::
:::

::: exercise Code conversion {level=1}
The section-position code of ‘地’ is 2121. Write its national-standard code and its internal code (hexadecimal), and check by working backwards.
::: solution
The general formula, in two steps: **national-standard code = the section-position code (after conversion to hexadecimal) + 2020H; internal code = the national-standard code + 8080H**. This problem: section-position (21, 21) → hexadecimal (15, 15) → national-standard code 3535H → internal code B5B5H. Working backwards: B5B5 − 8080 = 3535, and 35 − 20 = 15 (hexadecimal) = 21 (decimal); ‘地’ is back at section 21, position 21, and the loop closes. A mistake learners often make is to run the two steps ‘+32 (20H)’ and ‘+160 (80H)’ together as one step.
:::
:::

::: exercise Diagnosis by layer {level=2}
Three incidents. Locate each one in a layer, among 'encoding / font library / input / recognition': ① an email, going from an enterprise system onto an Apple phone, turns into garbled text; ② a certain app can search out one's own name, but in the customer-service reply the name is a box; ③ full-text search of a scanned PDF cannot find a certain word.
::: solution
① The encoding layer (the character sets at the sending and receiving ends do not agree, or the conversion was lost). ② The font-library layer (the font in which the server renders lacks the character, or the font on the other party's device lacks the character — the data are not damaged; the face was not brought along). ③ The recognition layer (the PDF is a picture; OCR was not done, or did not recognise it). Locating the layer is the full outpatient procedure for 'character ailments' in the digital age.
:::
:::

::: exercise Rewriting across registers {level=2}
Rewrite a message in an internet register into two registers: ① a campus notice; ② a text message to an elder (keep the original meaning; appropriateness first): ‘绝绝子这家店，yyds，冲！！！’ This restaurant is absolutely wonderful, the greatest there is — go for it! (Our translation.)
::: solution
① Notice style: ‘本餐厅口味广受好评，欢迎同学们前往品尝。’ The flavour of this restaurant is widely praised; students are welcome to go and try it. (Our translation.) ② Everyday family style: ‘妈，那家店特别好吃，周末带您去试试？’ Mum, that restaurant is especially delicious; shall I take you to try it at the weekend? (Our translation.) What is marked is **the match of register**, not a unique correct character. The original sentence is itself a new rhetorical use of characters that conform (it is not a case of wrongly written characters). What the rewriting task tests is the awareness of 'the same information, more than one system of writing' — the 'calligraphy' of the digital age.
:::
:::

::: exercise Short essay: will AI rewrite Chinese characters? {level=3}
Drawing on this chapter's 'four-layer stack' and the previous chapter's 'retrieval shortcut', write a short essay of eight hundred to twelve hundred characters. How are speech input, continuation by large models, and the generation of writing by images now redistributing the work of 'writing'? Predict the form that the everyday use of Chinese characters will take in ten years' time. You must cite one historical fact from this chapter (any one of Project 748, the succession of input methods, and Unicode unification) as the fulcrum of an analogy, and give a judgement that can be tested, rather than a slogan.
::: solution
Points for marking: the analogy has a fulcrum (for example, taking 'laser phototypesetting did away with the workers who set lead type, but could not do away with the demand for typesetting' as an analogy for 'AI does away with typing, but cannot do away with the demand for writing characters'); an ability to tell the channel of production (handwriting / selection / speaking aloud) from knowledge itself; an example of a 'judgement that can be tested' — 'class hours for teaching handwriting will not be cancelled, but the standard of assessment will turn towards legibility and calligraphy'; and no fatal flaw of stance, whether a thesis that Chinese characters are superior or a thesis that they are doomed to perish.
:::

::: summary
The four-piece set for getting Chinese characters onto a machine: encoding (the section-position square array of GB 2312 → ten thousand codes at full gallop → Unicode's unified code points; 20,992 positions in the CJK basic block, the extensions accumulating to nearly a hundred thousand), the font library (a code point is not a glyph; regional glyphs and tofu blocks), input (sound codes / shape codes / whole-sentence prediction, with sovereignty over disambiguation handed over to the model), recognition (OCR / HTR / the digital humanities of ancient books). Project 748 and laser phototypesetting prove that 'Chinese characters are backward' was in fact a gap in engineering; writing on the internet is not a collapse of characters but a split of register; what is lost, when one forgets the character with the pen in hand, is the muscle of production, not the knowledge of knowing characters. Characters have walked from oracle bones to the screen, and what they have relied on has never been Heaven's mandate, but the boats and oars that each generation builds for the present.
:::
:::
