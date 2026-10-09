# Chinese Atlas — English translation guide

In this atlas **Chinese is the source**. Lessons and course records are written in Chinese first
(`tools/CONTENT_GUIDE.md`); English versions are optional and come later, for readers who study
Chinese literature in English, for students abroad and for teachers. Target: the plain British
English of the other atlases, the register of a good English-language textbook of Chinese
literature or linguistics. Faithful to the Chinese: never add, drop or change facts, examples,
quotations, analyses or caveats. Translate meaning, not word order.

## Files

```
content/en/<course>/course.json   base record: its English text is the English version of the course
content/en/<course>/<chapter>.md  English version of content/zh/<course>/<chapter>.md
data/milestones.json              English text of the timeline (the Chinese is in content/zh/_data/)
```

The English course records are not optional: the engine reads the course list from `content/en`,
and every list in the Chinese overlay (`overview`, `outcomes`, `history`, `references`) needs an
English entry at the same position or it is dropped (`tools/CONTENT_GUIDE.md` §1). Titles, taglines,
summaries and chapter summaries already exist in English; keep them in step when the Chinese changes.

English lessons are optional, but the engine still treats English as its source language: when an
English lesson exists, `tools/check.php` applies the depth targets to it and compares the Chinese
lesson's numbered blocks and anchors with it, reporting any difference as an ERROR against the
Chinese file. So translate whole lessons, keep the structure identical, and never leave a partial
English lesson in `content/en`.

## Markup must stay identical

The English lesson has **exactly the same block structure** as the Chinese one:

- the same headings in the same order — the Chinese headings have automatic ids (`sec-1` …) unless
  the author gave one, so give the English heading the same explicit `{#id}` where the Chinese has one;
- every `:::kind` block in the same order with the same `{#id …}` attributes, `level=` and `check="…"`
  values unchanged; the same nesting (solutions, hints, answers, quiz options with `[x]`/`[ ]`); block
  titles are translated (`::: note 辨析` → `::: note Distinctions`);
- every `:::widget` block: keep the type and every key/value exactly; translate only `caption:` and
  `title:` values;
- references `[[…]]` unchanged (their link text is generated in English automatically); a custom
  label `[[target|text]]` gets its `text` translated;
- every `$…$` and `$$…$$` formula unchanged; tables keep their columns and rows.

## What is translated and what stays in Chinese

| translate | keep in Chinese (with an English rendering where needed) |
|---|---|
| explanations, headings, definitions and rule statements | quoted texts, classical and modern — the original stays and the English follows |
| block titles, quiz questions, and options that are explanations | characters, words and sentences being analysed (a character's components, a phrase cut into constituents, a 病句 and its correction) |
| exercise instructions, hints and solutions (the reasoning) | answers that are Chinese forms, and every accepted variant |
| figure captions and titles | figure settings (characters, poems, sentences) |
| glosses of meaning | Pinyin, IPA, tone values, 平仄 marks (○ ● ◎ △ ▲), the bracket notation of sentence analysis |

- **Quotations.** The Chinese original first, exactly as in the Chinese lesson (simplified characters,
  same punctuation), then the English rendering, with its source in brackets:

  ```
  > 床前明月光，疑是地上霜。举头望明月，低头思故乡。
  >
  > Before my bed the moonlight is bright; I take it for frost on the ground. I raise my head to
  > gaze at the bright moon, and lower it, thinking of home. (Our translation.)
  ```

  Translate for meaning, keeping the line structure of verse; say "(Our translation.)" or name the
  translator and date.
- **Public-domain translations** may be quoted when the translator died more than 70 years ago
  (before 1956 at the time of writing), for example James Legge (d. 1897), Herbert A. Giles (d. 1935),
  L. Cranmer-Byng (d. 1945), and Florence Ayscough (d. 1942) with Amy Lowell (d. 1925). They are often
  dated or loose: use one only when its wording is the point (the history of translation, the course
  on world literature) or when it is accurate enough; otherwise translate yourself. **Not** in the
  public domain under that rule, and quoted only briefly with attribution where the translation itself
  is discussed: Arthur Waley (d. 1966), Lionel Giles (d. 1958), Witter Bynner (d. 1968), Ezra Pound
  (d. 1972), Lin Yutang (d. 1976), Kenneth Rexroth (d. 1982), Gladys Yang (d. 1999) and Yang Xianyi
  (d. 2009), David Hawkes (d. 2009), Burton Watson (d. 2017), and every living translator. Check the
  date of each translator before quoting.
- **Characters in English text** are simplified, as in the Chinese lesson; traditional or ancient
  forms only where the Chinese lesson uses them.

## Romanisation and names

- **Hanyu Pinyin** for people, places and terms, family name first, given names written as one word:
  Li Bai, Du Fu, Su Shi, Sima Qian, Qu Yuan, Cao Xueqin, Lu Xun, Mao Dun, Ba Jin, Lao She, Shen
  Congwen, Qian Zhongshu, Wang Guowei; Chang'an, Luoyang, Xi'an. Not Wade–Giles (not Li Po, Tu Fu,
  Ssu-ma Ch'ien), except for names long established in English in another form — Confucius and
  Mencius (Latinised), Sun Yat-sen, Chiang Kai-shek — and for people known abroad by a form they used
  themselves: Eileen Chang for 张爱玲, Lin Yutang for 林语堂, and writers from Hong Kong and Taiwan as
  they romanise their own names (Pai Hsien-yung for 白先勇; Jin Yong, also Louis Cha, for 金庸). At
  first mention give the other form in brackets if readers may know it: Hu Shi (Hu Shih).
- **First mention** of a person: Pinyin, characters, dates — Su Shi 苏轼 (1037–1101); courtesy and
  literary names in Pinyin with characters: (courtesy name Zizhan 子瞻, literary name Dongpo 东坡).
- **Terms.** A Chinese term with no good English equivalent is given at first mention in italic Pinyin
  with tone marks, the characters and a gloss: *yìjìng* 意境 ('the realm of meaning a poem creates');
  afterwards italic Pinyin without tone marks, or the English gloss. Pinyin follows
  《汉语拼音正词法基本规则》 (GB/T 16159—2012) for word division and capitals.
- **Titles of works** in italics for books, plays and long poems (*Book of Songs*), single quotation
  marks for short poems and essays ('Quiet Night Thoughts'); a work with no standard English title
  gets italic Pinyin, characters and a translation at first mention.

Standard English titles (use the first form; the others are common alternatives):

| 中文 | English |
|---|---|
| 《诗经》 | *Book of Songs* (*Classic of Poetry*, *Book of Odes*; *Shijing*) |
| 《楚辞》 / 《离骚》 | *Songs of Chu* (*Chuci*) / *Encountering Sorrow* (*Li Sao*) |
| 《论语》 / 《孟子》 / 《庄子》 / 《老子》 | *Analects* / *Mencius* / *Zhuangzi* / *Laozi* (*Daodejing*) |
| 《左传》 / 《国语》 / 《战国策》 | *Zuo Tradition* (*Zuozhuan*) / *Discourses of the States* / *Intrigues of the Warring States* |
| 《史记》 / 《汉书》 | *Records of the Grand Historian* (*Shiji*) / *Book of Han* |
| 《说文解字》 | *Shuowen jiezi* (*Explaining Graphs and Analysing Characters*) |
| 《文心雕龙》 | *The Literary Mind and the Carving of Dragons* (*Wenxin diaolong*) |
| 《世说新语》 | *A New Account of Tales of the World* (*Shishuo xinyu*) |
| 《古诗十九首》 | *Nineteen Old Poems* |
| 《唐诗三百首》 | *Three Hundred Tang Poems* |
| 《三国演义》 | *Romance of the Three Kingdoms* |
| 《水浒传》 | *Water Margin* (*Outlaws of the Marsh*) |
| 《西游记》 | *Journey to the West* |
| 《金瓶梅》 | *The Plum in the Golden Vase* (*Jin Ping Mei*) |
| 《红楼梦》 | *Dream of the Red Chamber* (*The Story of the Stone*) |
| 《聊斋志异》 | *Strange Tales from a Chinese Studio* (*Liaozhai zhiyi*) |
| 《儒林外史》 | *The Scholars* (*The Unofficial History of the Scholars*) |
| 《西厢记》 / 《窦娥冤》 | *The Story of the Western Wing* (*Romance of the Western Chamber*) / *The Injustice to Dou E* |
| 《牡丹亭》 / 《长生殿》 / 《桃花扇》 | *The Peony Pavilion* / *The Palace of Eternal Youth* / *The Peach Blossom Fan* |
| 《人间词话》 | *Remarks on Song Lyrics in the Human World* (*Renjian cihua*) |
| 《狂人日记》 / 《阿Q正传》 | 'A Madman's Diary' / *The True Story of Ah Q* |
| 《呐喊》 / 《彷徨》 / 《野草》 | *Call to Arms* (*Outcry*) / *Wandering* / *Wild Grass* |
| 《子夜》 / 《家》 / 《骆驼祥子》 | *Midnight* / *Family* / *Rickshaw Boy* (*Camel Xiangzi*) |
| 《雷雨》 / 《边城》 / 《围城》 | *Thunderstorm* / *Border Town* / *Fortress Besieged* |

## Dynasties, periods and dates

- Dynasty names in Pinyin: Shang, Western Zhou, Spring and Autumn period, Warring States, Qin,
  Western Han, Eastern Han, Three Kingdoms, Western Jin, Eastern Jin, Southern and Northern Dynasties,
  Sui, Tang, Five Dynasties and Ten Kingdoms, Northern Song, Southern Song, Liao, Jin, Yuan, Ming,
  Qing; the Republic of China (1912–1949) and the People's Republic of China (from 1949). "Six
  Dynasties" (六朝) strictly means the six dynasties with their capital at Jiankang (Wu, Eastern Jin,
  Song, Qi, Liang, Chen); English-language scholarship also uses it for the whole period of division
  between the Han and the Sui (220–589), as the course title "Han–Six Dynasties Literature" does.
  Say which you mean where it matters.
- Dates follow the Chinese lesson, which uses the mainland convention (《中国历史年代简表》). Some
  English-language references differ by a few years (the end of the Qin, the start of the Western Han
  and of the Yuan, the end of the Qing); do not "correct" the Chinese lesson's dates silently — report
  a real discrepancy instead.
- Reign periods: "the Kaiyuan era (713–741)"; "in the 23rd year of Kaiyuan (735)". Years before the
  common era as "221 BC", consistent with the other atlases; "AD" only where a year could be
  misread (AD 100).
- Traditional measures (里, 斤, 尺) are explained at first use, with the period: their size changed.

## Terminology (use consistently)

Where a Chinese term has competing English translations, the first is this atlas's choice and the
others are given in brackets at first use; ⚑ marks terms whose translations differ in meaning or
are disputed — see "Terms that need care".

### Characters and writing

| 中文 | English |
|---|---|
| 汉字 | Chinese character (sinogram) |
| 文字学 | the study of the Chinese script; Chinese palaeography (古文字学) |
| 六书 ⚑ | the six categories (*liushu*) |
| 象形 / 指事 / 会意 ⚑ | pictograph / indicative / compound ideograph (associative compound) |
| 形声 ⚑ | phono-semantic compound (semantic-phonetic compound) |
| 转注 / 假借 | *zhuanzhu* (mutually glossing characters; disputed) / phonetic loan (rebus) |
| 三书说 | the three-category theory |
| 形旁 / 声旁 | semantic component (signific) / phonetic component (phonophore) |
| 部首 / 部件 / 笔画 / 笔顺 | radical (section header) / component / stroke / stroke order |
| 通假字 / 古今字 / 异体字 | phonetic loan character (*tongjia*) / ancient and modern forms of a word / variant form |
| 繁体字 / 简化字 / 规范汉字 | traditional character / simplified character / standard character |
| 甲骨文 / 金文 | oracle-bone inscriptions / bronze inscriptions |
| 大篆 / 小篆 / 隶书 | large seal script / small seal script / clerical script |
| 楷书 / 行书 / 草书 | regular script / running script (semi-cursive) / cursive script |
| 隶变 | the clerical change |
| 书法 / 碑学 / 帖学 / 拓片 | calligraphy / the stele school / the model-book school / rubbing |

### Sounds of Mandarin

| 中文 | English |
|---|---|
| 普通话 ⚑ | Putonghua (standard Mandarin) |
| 汉语拼音 | Hanyu Pinyin |
| 声母 / 韵母 / 声调 | initial / final / tone |
| 韵头 / 韵腹 / 韵尾 | medial / nucleus / coda |
| 开口呼 / 齐齿呼 / 合口呼 / 撮口呼 | open, even-teeth, closed and round-mouth finals (*kaiqi hecuo*) |
| 调值 / 调类 | tone value (pitch contour) / tone category |
| 五度标记法 | Chao's five-level tone notation |
| 阴平 / 阳平 / 上声 / 去声 | first (high level) / second (rising) / third (dipping) / fourth (falling) tone |
| 变调 / 轻声 / 儿化 | tone sandhi / neutral tone / rhotacisation (*erhua*) |
| 送气 / 不送气 | aspirated / unaspirated |
| 零声母 / 卷舌音（翘舌音） | zero initial / retroflex |
| 音素 / 音位 | phone / phoneme |
| 普通话水平测试 | Putonghua Proficiency Test (PSC) |

### Grammar, vocabulary and rhetoric

| 中文 | English |
|---|---|
| 语素 / 词 / 短语 | morpheme / word / phrase |
| 实词 / 虚词 | content word / function word |
| 量词 ⚑ | classifier (measure word) |
| 助词：结构助词 / 动态助词 / 语气词 | particle: structural particle / aspect particle / modal particle |
| 主语 / 谓语 / 宾语 | subject / predicate / object |
| 定语 / 状语 / 补语 ⚑ | attributive / adverbial / complement |
| 中心语 | head |
| 层次分析 | immediate-constituent analysis |
| 把字句 ⚑ / 被字句 | the *ba* construction (disposal construction) / the *bei* passive |
| 连动句 / 兼语句 / 存现句 | serial-verb construction / pivotal construction / existential sentence |
| 复句 / 关联词语 | complex sentence / connectives |
| 流水句 ⚑ | flowing sentence (*liushuiju*) |
| 病句 | faulty sentence |
| 联合式 / 偏正式 / 补充式 / 动宾式 / 主谓式 | coordinate / modifier–head / verb–complement / verb–object / subject–predicate compound |
| 成语 / 惯用语 / 歇后语 | four-character idiom (*chengyu*) / idiomatic phrase / two-part allegorical saying (*xiehouyu*) |
| 外来词 / 字母词 | loanword / lettered word |
| 修辞 / 修辞格 | rhetoric / figure of speech |
| 比喻（明喻、暗喻、借喻） | metaphor and simile (simile, metaphor, implicit metaphor) |
| 比拟 / 借代 / 夸张 | personification (and its reverse) / metonymy / hyperbole |
| 对偶 / 排比 / 反复 / 设问 / 反问 | antithesis / parallelism / repetition / hypophora / rhetorical question |
| 通感 / 双关 | synaesthesia / pun |
| 语体 ⚑ / 风格 | register / style |

### Classical Chinese and philology

| 中文 | English |
|---|---|
| 文言 ⚑ / 白话 | Classical Chinese (Literary Chinese; *wenyan*) / the vernacular (*baihua*) |
| 古代汉语 | (as a course) Classical Chinese; (as a stage of the language) earlier Chinese |
| 词类活用 | word-class shift |
| 使动用法 / 意动用法 | causative use / putative use |
| 判断句 / 宾语前置 / 定语后置 | nominal sentence / fronted object / postposed attributive |
| 古今异义 | change of meaning (false friends between classical and modern Chinese) |
| 本义 / 引申义 | original meaning / extended meaning |
| 断句 / 句读 | punctuating (sentence division) / *judou* (traditional pause marks) |
| 训诂 | exegesis (glossing) |
| 注疏 | commentaries and subcommentaries |
| 校勘 / 版本 / 目录 | collation / edition / bibliography (catalogue) |
| 经史子集 | the four divisions: Classics, Histories, Masters, Collections |
| 今译 | modern Chinese translation |

### Historical phonology

| 中文 | English |
|---|---|
| 音韵学 | Chinese historical phonology |
| 上古汉语 / 中古汉语 / 近代汉语 | Old Chinese / Middle Chinese / Early Mandarin |
| 反切 | *fanqie* spelling |
| 韵书 / 韵图 | rhyme dictionary / rhyme table |
| 韵部 / 韵摄 | rhyme group / rhyme class (*she*) |
| 等 ⚑ / 开合 | division (grade) / open and closed (unrounded and rounded) |
| 平声 / 上声 / 去声 / 入声 ⚑ | level tone / rising tone / departing tone / entering tone (checked tone) |
| 三十六字母 | the thirty-six initials |
| 浊音清化 / 入派三声 / 腭化 | devoicing of voiced initials / distribution of the entering tone among the other tones / palatalisation |
| 平水韵 / 新韵 | the Pingshui rhymes / the "new rhymes" based on Putonghua |
| 拟音 | reconstruction |

### Poetry and metre

| 中文 | English |
|---|---|
| 平仄 ⚑ | level and oblique tones |
| 近体诗（格律诗） / 古体诗 | regulated verse (recent-style poetry) / ancient-style verse |
| 律诗 / 绝句 / 排律 | regulated poem (*lüshi*) / quatrain (*jueju*) / extended regulated verse (*pailü*) |
| 五言 / 七言 | five-character / seven-character (line) |
| 粘 / 对 | adhesion / opposition (the tonal links between lines) |
| 对仗 ⚑ | parallelism (parallel couplet) |
| 拗救 / 孤平 / 三平尾 | irregularity and compensation / lone level tone / three level tones at the end of a line |
| 押韵 / 韵脚 | rhyme / rhyme word |
| 词 ⚑ / 词牌 | song lyric (*ci*) / tune title (*cipai*) |
| 小令 / 长调（慢词） | short lyric (*xiaoling*) / long lyric (*manci*) |
| 上阕 / 下阕 | first stanza / second stanza |
| 曲 / 散曲 / 套数 / 衬字 | *qu* (song or aria) / *sanqu* (non-dramatic song) / song suite / padding word |
| 赋 ⚑ | rhapsody (*fu*) |
| 骈文 | parallel prose (*pianwen*) |
| 乐府 | *yuefu* (Music Bureau poems; ballads) |
| 赋、比、兴 ⚑ | *fu*, *bi*, *xing* (exposition, comparison, evocation) |
| 意象 / 用典 | image (*yixiang*) / allusion |

### Genres and literary history

| 中文 | English |
|---|---|
| 散文 ⚑ | prose (classical); essay (modern) |
| 小说 ⚑ | fiction; a novel, novella or story by length |
| 志怪 / 志人 / 笔记 | tales of the strange (*zhiguai*) / anecdotes of people (*zhiren*) / notebook literature (*biji*) |
| 传奇 ⚑ | Tang tale (*chuanqi*); Ming–Qing southern drama (*chuanqi*) |
| 话本 / 章回小说 | storyteller's script (*huaben*) / chapter novel (*zhanghui xiaoshuo*) |
| 杂剧 | variety play (*zaju*) |
| 戏曲 ⚑ / 昆曲 / 话剧 | Chinese opera (*xiqu*) / Kunqu / spoken drama (*huaju*) |
| 神魔小说 / 世情小说 / 才子佳人小说 | gods-and-demons novel / novel of manners / scholar-and-beauty romance |
| 古文 ⚑ / 古文运动 | ancient-style prose (*guwen*) / the *guwen* movement |
| 唐宋八大家 | the Eight Masters of Tang and Song Prose |
| 建安风骨 | the Jian'an spirit (*Jian'an fenggu*) |
| 新文化运动 / 五四运动 / 文学革命 | New Culture Movement / May Fourth Movement / Literary Revolution |
| 新诗 / 杂文 | new poetry (modern verse) / *zawen* (polemical essay) |
| 左联 | League of Left-Wing Writers |
| 伤痕文学 ⚑ / 反思文学 / 改革文学 | scar literature / reflection literature / reform literature |
| 朦胧诗 ⚑ | Misty Poetry (Obscure Poetry) |
| 寻根文学 / 先锋小说 / 新写实小说 | root-seeking literature / avant-garde fiction / new realism |
| 网络文学 | online literature (web fiction) |
| 港澳台文学 / 海外华文文学 | literature of Hong Kong, Macao and Taiwan / Chinese-language literature abroad |

### Criticism and theory

| 中文 | English |
|---|---|
| 诗言志 / 诗缘情 | poetry expresses intent / poetry follows from feeling |
| 文以载道 | writing as a vehicle of the Way |
| 气 / 文气 | *qi* (vital energy) / the *qi* of writing |
| 风骨 ⚑ | *fenggu* ('wind and bone'; vigour of feeling and structure) |
| 滋味 | flavour (Zhong Rong) |
| 妙悟 | wondrous awakening (*miaowu*; Yan Yu) |
| 意境 ⚑ | *yijing* (the realm of meaning; artistic conception) |
| 境界 ⚑ / 有我之境 / 无我之境 | *jingjie* (world; realm) / the world with self / the world without self (Wang Guowei) |
| 神韵 ⚑ | *shenyun* (spirit and resonance; Wang Shizhen) |
| 性灵 ⚑ | *xingling* (native sensibility; Yuan Mei) |
| 知人论世 / 以意逆志 | knowing the person and the times / using one's understanding to meet the poet's intent |
| 言意之辨 | the debate on words and meaning |
| 文学概论（文学理论） | introduction to literary theory |
| 典型 / 形象 | type (the typical) / image (literary figure) |
| 比较文学 / 接受美学 | comparative literature / reception aesthetics (reception theory) |

### Logic and writing

| 中文 | English |
|---|---|
| 概念 / 内涵 / 外延 | concept / intension / extension |
| 定义 / 划分 | definition / division |
| 命题（判断） / 直言命题 | proposition (judgement) / categorical proposition |
| 联言 / 选言 / 假言命题 | conjunctive / disjunctive / hypothetical (conditional) proposition |
| 充分条件 / 必要条件 / 充要条件 | sufficient / necessary / necessary and sufficient condition |
| 演绎 / 归纳 / 类比 | deduction / induction / analogy |
| 三段论 / 中项 / 周延 | syllogism / middle term / distributed |
| 谬误：偷换概念 / 循环论证 / 以偏概全 | fallacies: equivocation / begging the question / hasty generalisation |
| 记叙 / 描写 / 抒情 / 说明 / 议论 | narration / description / expression of feeling / exposition / argument (the five modes of writing) |
| 论点 / 论据 / 论证 | claim (thesis) / evidence / reasoning |
| 立论 / 驳论 | constructive argument / refutation |
| 应用文 / 公文 | practical writing / official document |
| 申论 | *shenlun* (the essay test of the civil-service examination) |
| 文献综述 / 参考文献 / 学术规范 | literature review / references / norms of academic conduct |

### Linguistics and dialects

| 中文 | English |
|---|---|
| 语言学 / 音系学 / 形态学 / 句法学 / 语义学 / 语用学 | linguistics / phonology / morphology / syntax / semantics / pragmatics |
| 孤立语 / 黏着语 / 屈折语 | isolating / agglutinative / fusional language |
| 语法化 / 历史比较法 | grammaticalisation / the comparative method |
| 汉藏语系 | Sino-Tibetan family |
| 方言 ⚑ / 方言区 | dialect (*fangyan*; topolect) / dialect group |
| 官话 | Mandarin (*guanhua*) |
| 吴语 / 粤语 / 闽语 / 客家话 | Wu / Yue (Cantonese for the speech of Guangzhou and Hong Kong) / Min / Hakka |
| 湘语 / 赣语 / 晋语 / 徽语 / 平话 | Xiang / Gan / Jin / Hui / Pinghua |
| 文白异读 | literary and colloquial readings |

## Terms that need care

- **普通话, 国语, 华语, Mandarin.** 普通话 is the standard language of the PRC, defined in 1955–1956;
  国语 is the earlier and Taiwanese term, 华语 the term in Singapore and Malaysia. "Mandarin" in
  English covers both the standard and the northern dialect group (官话). Write "Putonghua" or
  "standard Mandarin" for the standard and "Mandarin dialects" for 官话.
- **文言.** "Classical Chinese" is this atlas's term; "Literary Chinese" is common in linguistics and
  avoids implying a single classical period. Either is acceptable; be consistent within a lesson.
- **方言.** Chinese usage calls the major varieties 方言 ("dialects") although many are not mutually
  intelligible. Translate as "dialect"; the dialects course explains the debate (and the coinage
  "topolect"). Do not take sides beyond what the Chinese lesson says.
- **六书 and its categories.** "The six categories" describes the system better than "six scripts" or
  "six principles". Avoid "pictophonetic" for 形声字: the phonetic part is not a picture of a sound.
- **量词.** In Chinese grammar a classifier (个, 本, 张); not an English quantifier.
- **补语.** A Chinese 补语 (resultative, directional, potential, degree complements) is not the
  English "complement" (as in *She is a teacher*); keep "complement" but explain at first use.
- **把字句.** "The *ba* construction"; "disposal construction" (Wang Li) describes one view of its
  meaning and is given in brackets.
- **流水句.** A sequence of loosely joined clauses typical of Chinese, not the English writing error
  called a "run-on sentence"; use "flowing sentence" with *liushuiju*.
- **语体.** Usually "register" (口语语体, 书面语体); "style" translates 风格 and 文体 in the sense of a
  writer's style.
- **平仄.** "Level and oblique" (also "level and deflected"). Oblique covers the rising, departing and
  entering tones.
- **入声.** "Entering tone" is the literal and usual term; "checked tone" describes syllables ending in
  -p, -t, -k (or a glottal stop). Putonghua has no entering tone.
- **等.** In rhyme tables, "division" (also "grade"; Divisions I–IV). Choose one and keep it.
- **对仗.** Parallelism in couplets (word class, meaning and tone); "antithesis" only for contrast of
  meaning (对偶 in rhetoric covers both).
- **词.** "Song lyric" or *ci* for the poetic form; never just "word" or "poem" in that sense.
- **赋.** The genre is "rhapsody" (also "rhyme-prose", "poetic exposition"); the technique 赋 in 赋比兴
  is "exposition". Do not mix them.
- **赋、比、兴.** *Xing* has no settled translation ("evocation", "stimulus", "affective image");
  keep the Pinyin and explain.
- **散文 and 小说.** In classical contexts 散文 is prose as opposed to verse or parallel prose; in
  modern literature it is the literary essay. 小说 is fiction of any length; choose "novel", "novella"
  or "story" by length.
- **传奇.** Two genres share the name: Tang tales and Ming–Qing southern drama. Always say which.
- **古文.** "Ancient-style prose" (the *guwen* of Han Yu); in 文字学, 古文 can also mean ancient
  scripts. Translate by sense.
- **戏曲.** "Chinese opera" is established but misleading (it is sung, spoken and acted theatre);
  give *xiqu* at first use.
- **伤痕文学, 朦胧诗.** "Scar literature" and "Misty Poetry" are the established English names;
  "Literature of the Wounded" and "Obscure Poetry" are alternatives. 朦胧 was first a critics'
  complaint; say so if the Chinese lesson does.
- **意境, 境界, 风骨, 神韵, 性灵.** There are no agreed English equivalents. Keep the Pinyin and gloss
  it as the critic used it; never translate two of them with the same English word.
- **楷书, 草书.** "Regular script" (also "standard script"); "cursive script" (also "grass script").

## Check

```
bash tools/check.sh --lang=en <course>   # the English version: markup, figures, references, depth
bash tools/check.sh --lang=zh <course>   # confirms the Chinese lesson still matches it
```

Both runs must end with `0 errors`. Preview the English page at
`http://f.g77k.com/learn/chinese/lesson.php?c=<course>&l=<chapter>&lang=en`.

## Workflow

1. Translate one lesson at a time: read the whole Chinese file, then write the whole English file
   (`content/en/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   explanation, solution, hint, quiz question, caption and history note. Never summarise or shorten.
2. Run both checks above and fix every ERROR in your file.
3. Do not edit Chinese files, code or tools. If the Chinese has a genuine mistake, keep the
   translation faithful and report it.

A model for markup and tone (Maths Atlas, same engine, the other direction):
`/var/www/f.g77k.com/learn/maths/content/en/multivariable/gradient.md` and its Chinese version
`/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`. Site name: Chinese Atlas.
