# English Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese English-teaching materials and linguistics
textbooks (e.g. 章振邦主编《新编英语语法教程》, 胡壮麟主编《语言学教程》, 张培基等《英汉翻译教程》,
连淑能《英汉对比研究》, and the 人教版 and 外研版 school textbooks), with linguistics terms as fixed by
全国科学技术名词审定委员会《语言学名词》. Neutral, clear teaching register. Faithful to the English:
never add, drop or change rules, examples, exceptions or caveats. Translate meaning, not word order.

**In this atlas the Chinese version is not a courtesy copy.** Readers at levels 1–2 (A1–B1) learn
from the Chinese explanations, so the Chinese lessons of level-1 and level-2 courses are written
together with the English ones (see `tools/CONTENT_GUIDE.md` §2) and must be at least as clear.

## Files

```
content/zh/<course>/course.json   overlay: ONLY the translatable fields, same structure and list order
content/zh/<course>/<chapter>.md  full translation of content/en/<course>/<chapter>.md
```

`course.json` overlay keys: `title`, `full_title`, `tagline`, `summary`, `overview` (list),
`outcomes` (list), `chapters` (list of `{"title", "summary"}` in the same order), `history`
(list of `{"title", "detail"}` in the same order — keep `people` names in Latin script; do not
include `year`), `references` (list of `{"note"}` — book titles and authors stay as published).
Do not copy slugs, ids or other untranslated fields. Titles and summaries follow the rules below:
cited English words stay in italics (`*Be* 和 *have*`).

## What is translated and what stays in English

| translate | keep exactly as in the English |
|---|---|
| explanations, headings, definitions and rule statements | example words and sentences (in italics) |
| block titles, quiz questions and options that are explanations | quiz options and exercise items that *are* English being tested |
| exercise instructions, hints and solutions (the reasoning) | answers that are English forms, and every accepted variant |
| figure captions and titles | figure settings (`nodes:`, `states:`, word lists …) |
| glosses of meaning | IPA, stress and intonation marks, labels such as S V O, GB/GA, BrE/AmE |
| | passages and model texts (emails, essays, dialogues, poems) |
| | ✗ and ✓ marks and the sentences they mark |

When the English explains an English word, the word stays in English and the explanation is
translated: *Since* 后面接时间点，*for* 后面接一段时间。

## Example sentences, dialogues and passages

- **Levels 1–2: every example sentence gets a Chinese translation**, directly after the italic
  English, in full-width brackets, with the Chinese sentence's own final punctuation inside:

  ```
  - *She has lived here since 2019.*（她从2019年起一直住在这里。）
  ```

  Word and phrase glosses take no final punctuation: *bank*（河岸）. A meaning written in single
  quotes in the English (*bank* ‘the side of a river’) becomes Chinese quotation marks: *bank*“河岸”.
- **Levels 3–4:** translate an example only where its meaning is hard or where the point is the
  contrast with Chinese.
- **Natural Chinese first.** Translate as a good Chinese writer would say it. When the point is the
  structure, add a literal rendering after the natural one, labelled: （直译：……）.
- **✗ sentences are not translated**: they are not acceptable English, and a translation would
  make them look as if they were. If the reader needs the intended meaning, add it:
  ✗ *He go to school by bus.*（意思是：他坐公共汽车上学。）
- **Dialogues** keep the speaker labels as in the English (`**Li Wei:**`), with the translation of
  each turn after it at levels 1–2.
- **Passages** (a poem, a model email, an essay extract) stay in English in a blockquote. At levels
  1–2 add a full translation after the passage, in a paragraph beginning **译文：**; at levels 3–4
  add one only if the English lesson's discussion needs it.

## Markup must stay identical

The Chinese lesson must have **exactly the same block structure** as the English one:

- the same headings in the same order, with the same `{#id}` if the English has one;
- every `:::kind` block in the same order with the same `{#id …}` attributes, `level=` and
  `check="…"` values unchanged; the same nesting (solutions, hints, answers, quiz options with
  `[x]`/`[ ]`); block titles are translated (`::: note English and Chinese` → `::: note 英汉对比`);
- every `:::widget` block: keep the type and every key/value exactly; translate only `caption:`
  and `title:` values (and words inside `\text{…}` in TeX labels);
- references `[[…]]` unchanged (their link text is generated in Chinese automatically); a custom
  label `[[target|text]]` gets its `text` translated;
- every `$…$` and `$$…$$` formula unchanged; a literal dollar sign stays `\$`;
- tables keep their columns and rows; code blocks are not translated.

`tools/check.php` compares the numbered blocks and anchors of each Chinese lesson with the English
one and reports any difference as an ERROR.

## Typography

- Full-width Chinese punctuation in Chinese sentences: ，。；：？！（）“”、《》
- English inside Chinese text — a word, an italic example, an IPA transcription — is separated
  from Han characters by one half-width space, and touches full-width punctuation directly:
  `动词 *go* 的过去式是 *went*。`, `/θ/ 是普通话里没有的音。` Numbers and formulas follow the house
  rule of the other atlases: written directly next to Han characters (`2019年`, `第3章`); the site
  adds a thin space around formulas.
- English examples keep their English punctuation and curly quotes inside the italics.
- Italics: Chinese text has none; emphasis is `**…**`. Italic is reserved for English examples and
  cited forms, exactly as in the English lesson (the checker relies on this — see "Check").
- Bold `**…**` for the defined term at its definition, followed at first use by the English term
  in brackets: **现在完成时**（present perfect）.
- People's names: scholars in Latin script on first mention with the standard Chinese form where one
  exists — 乔姆斯基（Chomsky）, 韩礼德（Halliday）, 格赖斯（Grice）, 奥斯汀（Austin）, 塞尔（Searle）,
  约翰逊（Samuel Johnson）, 乔叟（Chaucer）, 莎士比亚（Shakespeare）, 琼斯（Daniel Jones）,
  卡奇鲁（Kachru）, 奈达（Nida）, 韦努蒂（Venuti）; Chinese scholars in characters: 严复, 王力, 吕叔湘,
  赵元任, 章振邦, 葛传槼. Fictional people in examples keep the English spelling (*Li Wei*).
- Book titles in 《》, followed by the original title in brackets for English books when well
  known: 《英语语法大全》（*A Comprehensive Grammar of the English Language*）.
- Block captions are generated by the site (定义、规则、解释、例、习题、解答、提示、注、常见错误……);
  do not write them.

## Terminology (use consistently)

Mainland usage. Grammar terms follow 章振邦 and the school textbooks where they agree; linguistics
terms follow 《语言学名词》. Give the English term in brackets at its first use in each lesson. Where a
school term and a linguistics term differ, see "Terms that need care" below.

### 语音

| English | 中文 |
|---|---|
| phonetics / phonology | 语音学 / 音系学 |
| International Phonetic Alphabet (IPA) | 国际音标 |
| phonemic / phonetic transcription | 音位标音（宽式标音） / 语音标音（严式标音） |
| phone / phoneme / allophone | 音素 / 音位 / 音位变体 |
| vowel / consonant / semivowel | 元音 / 辅音 / 半元音 |
| monophthong / diphthong / triphthong | 单元音 / 双元音 / 三元音 |
| long / short vowel; schwa | 长元音 / 短元音；央元音（schwa，/ə/） |
| voiced / voiceless | 浊音 / 清音 |
| aspirated / unaspirated; aspiration | 送气音 / 不送气音；送气 |
| place / manner of articulation; articulator | 发音部位 / 发音方法；发音器官 |
| vocal folds / alveolar ridge / hard palate / soft palate | 声带 / 齿龈 / 硬腭 / 软腭 |
| plosive (stop) / fricative / affricate | 爆破音（塞音） / 摩擦音（擦音） / 破擦音（塞擦音） |
| nasal / lateral / approximant | 鼻音 / 边音 / 近音 |
| bilabial / labiodental / dental / alveolar | 双唇音 / 唇齿音 / 齿间音 / 齿龈音 |
| postalveolar / palatal / velar / glottal | 齿龈后音 / 硬腭音 / 软腭音 / 声门音 |
| minimal pair | 最小对立体 |
| syllable / onset / nucleus / coda | 音节 / 音节首 / 音节核 / 音节尾 |
| consonant cluster | 辅音连缀 |
| stress / primary / secondary stress | 重音 / 主重音 / 次重音 |
| word / sentence / contrastive stress | 词重音 / 句重音 / 对比重音 |
| strong form / weak form | 强读式 / 弱读式 |
| connected speech / linking / linking r / intrusive r | 连贯语流 / 连读 / 连接 r / 插入 r |
| assimilation / elision | 同化 / 省音 |
| rhythm / stress-timed / syllable-timed | 节奏 / 重音计时 / 音节计时 |
| intonation / tone unit / nucleus | 语调 / 调群 / 调核 |
| fall / rise / fall-rise | 降调 / 升调 / 降升调 |
| (lexical) tone | 声调 |
| accent / General British (GB) / General American (GA) / RP | 口音 / 通用英式发音（GB） / 通用美式发音（GA） / 标准发音（RP） |
| lexical set (KIT, DRESS …) | 词汇集（名称 KIT、DRESS 等保留英文） |
| spelling–sound correspondence / phonics | 拼读规律 / 自然拼读 |

### 语法

| English | 中文 |
|---|---|
| part of speech, word class | 词类（词性） |
| noun / verb / adjective / adverb / pronoun | 名词 / 动词 / 形容词 / 副词 / 代词 |
| preposition / conjunction / determiner / interjection | 介词 / 连词 / 限定词 / 感叹词 |
| article / definite / indefinite / zero article | 冠词 / 定冠词 / 不定冠词 / 零冠词 |
| countable / uncountable / collective noun | 可数名词 / 不可数名词 / 集体名词 |
| quantifier / classifier (in Chinese) | 量化词（数量限定词） / 量词 |
| possessive (genitive) / demonstrative | 所有格 / 指示词 |
| personal / reflexive / relative pronoun | 人称代词 / 反身代词 / 关系代词 |
| subject / predicate / object / complement / adverbial | 主语 / 谓语 / 宾语 / 补语 / 状语 |
| direct / indirect object | 直接宾语 / 间接宾语 |
| subject complement / object complement | 主语补语（表语） / 宾语补语 |
| clause pattern (SV, SVO, SVC …) | 基本句型 |
| phrase / noun / verb / prepositional phrase | 短语 / 名词短语 / 动词短语 / 介词短语 |
| head / premodifier / postmodifier / apposition | 中心词 / 前置修饰语 / 后置修饰语 / 同位语 |
| lexical verb / auxiliary / modal verb / linking verb | 实义动词 / 助动词 / 情态动词 / 系动词 |
| transitive / intransitive verb | 及物动词 / 不及物动词 |
| finite / non-finite | 限定（谓语动词） / 非限定（非谓语动词） |
| infinitive / bare infinitive / to-infinitive | 不定式 / 不带 to 的不定式 / 带 to 的不定式 |
| -ing form / gerund / present participle / past participle | -ing 形式 / 动名词 / 现在分词 / 过去分词 |
| tense / aspect | 时 / 体 |
| present simple / present progressive | 一般现在时 / 现在进行时 |
| present perfect / present perfect progressive | 现在完成时 / 现在完成进行时 |
| past simple / past progressive / past perfect | 一般过去时 / 过去进行时 / 过去完成时 |
| ways of talking about the future | 将来时间的表达 |
| progressive / perfect aspect | 进行体 / 完成体 |
| stative / dynamic verb | 状态动词 / 动态动词 |
| voice / active / passive | 语态 / 主动语态 / 被动语态 |
| mood / indicative / imperative / subjunctive | 语气 / 陈述语气 / 祈使语气 / 虚拟语气 |
| modality / epistemic / deontic / dynamic modality | 情态 / 认识情态 / 道义情态 / 动力情态 |
| hedge / booster | 模糊限制语 / 强化语 |
| clause / main clause / subordinate clause | 分句 / 主句 / 从句 |
| coordination / subordination | 并列 / 从属 |
| relative clause / defining / non-defining | 关系从句（定语从句） / 限制性 / 非限制性 |
| noun (nominal) clause / adverbial clause | 名词性从句 / 状语从句 |
| conditional (zero, first, second, third, mixed) | 条件句（零类、第一类、第二类、第三类、混合） |
| direct / reported speech; backshift | 直接引语 / 间接引语；时态后移 |
| cleft sentence / fronting / inversion | 分裂句（强调句） / 前置 / 倒装 |
| ellipsis / substitution | 省略 / 替代 |
| agreement (concord) | 一致（主谓一致） |
| comparative / superlative | 比较级 / 最高级 |
| question tag / existential *there* | 附加疑问句（反意疑问句） / 存在句（there be 句型） |
| participle clause / dangling participle | 分词分句（分词短语） / 垂悬分词 |

### 词汇

| English | 中文 |
|---|---|
| morpheme / free / bound morpheme | 语素 / 自由语素 / 粘着语素 |
| root / stem / affix / prefix / suffix | 词根 / 词干 / 词缀 / 前缀 / 后缀 |
| inflection / derivation | 屈折变化 / 派生 |
| compounding / compound | 复合 / 复合词 |
| conversion / clipping / blending / back-formation | 转类 / 截短 / 拼缀 / 逆构词 |
| acronym / initialism | 首字母拼音词（如 NASA） / 首字母缩略词（如 BBC） |
| word family / lemma / headword | 词族 / 词元 / 词目 |
| type / token | 类符 / 形符 |
| collocation / collocate / node word | 搭配 / 搭配词 / 节点词 |
| idiom / fixed expression / phrasal verb / prepositional verb | 习语 / 固定表达 / 短语动词 / 介词动词 |
| register / formal / informal | 语域 / 正式 / 非正式 |
| connotation / denotation | 内涵意义 / 概念意义 |
| synonym / antonym / hyponym / hypernym | 同义词 / 反义词 / 下义词 / 上义词 |
| polysemy / homonym / homophone | 一词多义 / 同形同音异义词 / 同音异义词 |
| false friend / loanword / calque | 假朋友（形似义异词） / 外来词 / 仿译词 |
| etymology / cognate | 词源 / 同源词 |
| learner's dictionary / corpus / concordance line | 学习型词典 / 语料库 / 索引行 |
| frequency list / text coverage | 词频表 / 文本覆盖率 |
| receptive / productive vocabulary | 接受性词汇 / 产出性词汇 |
| spaced repetition / retrieval practice | 间隔重复 / 提取练习 |

### 阅读与写作

| English | 中文 |
|---|---|
| skimming / scanning / intensive / extensive reading | 略读 / 寻读 / 精读 / 泛读 |
| main idea / topic sentence / supporting sentence | 主旨 / 主题句 / 支撑句 |
| inference / reference (to an earlier noun) | 推断 / 指代 |
| cohesion / coherence / cohesive device | 衔接 / 连贯 / 衔接手段 |
| connective / discourse marker / signposting | 连接词 / 话语标记语 / 路标语 |
| text type / genre | 语篇类型 / 体裁 |
| thesis statement / claim / evidence | 论点句 / 主张 / 证据 |
| counter-argument / concession / rebuttal / fallacy | 反方论点 / 让步 / 反驳 / 谬误 |
| paraphrase / summary / quotation | 改述 / 概要 / 引语 |
| citation / in-text citation / reference list | 引用 / 文内引注 / 参考文献 |
| plagiarism / academic integrity | 剽窃 / 学术诚信 |
| literature review / abstract / research question | 文献综述 / 摘要 / 研究问题 |
| nominalisation | 名词化 |
| run-on sentence / comma splice / sentence fragment | 连写句 / 逗号粘连 / 句子片段 |
| draft / revise / edit / proofread | 初稿 / 修改 / 编辑 / 校对 |
| readability | 可读性 |
| rhetoric / ethos / pathos / logos | 修辞学 / 人格诉求 / 情感诉求 / 理性诉求 |
| figure of speech / metaphor / simile / metonymy | 修辞格 / 隐喻 / 明喻 / 转喻 |
| irony / understatement / hyperbole | 反讽 / 低调陈述 / 夸张 |
| parallelism / antithesis / alliteration / rhetorical question | 排比 / 对照 / 头韵 / 修辞性问句 |
| metre / foot / iamb / trochee / iambic pentameter | 格律 / 音步 / 抑扬格 / 扬抑格 / 抑扬格五音步 |
| scansion / rhyme / rhyme scheme | 音步划分 / 押韵 / 韵式 |
| sonnet / blank verse / free verse | 十四行诗 / 素体诗 / 自由诗 |
| narrator / point of view / plot / character / setting | 叙述者 / 叙述视角 / 情节 / 人物 / 背景 |
| close reading | 细读 |

### 语用学与语言学

| English | 中文 |
|---|---|
| linguistics / descriptive / prescriptive | 语言学 / 描写性的 / 规定性的 |
| morphology / syntax / semantics / pragmatics | 形态学 / 句法学 / 语义学 / 语用学 |
| discourse analysis | 话语分析 |
| constituent / phrase structure / tree diagram | 成分 / 短语结构 / 树形图 |
| speech act / locutionary / illocutionary / perlocutionary act | 言语行为 / 言内行为 / 言外行为 / 言后行为 |
| direct / indirect speech act | 直接言语行为 / 间接言语行为 |
| cooperative principle / maxim / conversational implicature | 合作原则 / 准则 / 会话含义 |
| politeness / face / positive / negative face | 礼貌 / 面子 / 积极面子 / 消极面子 |
| face-threatening act | 面子威胁行为 |
| deixis / presupposition / entailment | 指示语 / 预设 / 蕴涵 |
| corpus linguistics / Zipf's law / n-gram | 语料库语言学 / 齐夫定律 / n 元语法 |
| first / second language acquisition | 第一语言习得 / 第二语言习得 |
| interlanguage / (L1) transfer / fossilisation | 中介语 / （母语）迁移 / 石化 |
| sociolinguistics / variety / dialect / standard language | 社会语言学 / 变体 / 方言 / 标准语 |
| code-switching / style | 语码转换 / 语体 |

### 历史与变体

| English | 中文 |
|---|---|
| Old / Middle / Early Modern / Modern English | 古英语 / 中古英语 / 早期现代英语 / 现代英语 |
| Great Vowel Shift | 元音大推移 |
| Indo-European / Proto-Indo-European / Germanic | 印欧语系 / 原始印欧语 / 日耳曼语族 |
| language family / branch / cognate | 语系 / 语族 / 同源词 |
| Grimm's law / Norman Conquest | 格林定律 / 诺曼征服 |
| standardisation / prescriptivism | 标准化 / 规定主义 |
| World Englishes / inner / outer / expanding circle | 世界英语 / 内圈 / 外圈 / 扩展圈 |
| English as a lingua franca (ELF) | 英语作为通用语（ELF） |
| pidgin / creole | 皮钦语 / 克里奥尔语 |
| China English / Chinglish | 中国英语 / 中式英语 |
| British / American English | 英式英语 / 美式英语 |

### 翻译

| English | 中文 |
|---|---|
| translation / interpreting | 笔译（翻译） / 口译 |
| source / target language; source / target text | 源语 / 目的语；原文 / 译文 |
| equivalence / formal / dynamic equivalence | 对等 / 形式对等 / 动态对等 |
| literal / free translation | 直译 / 意译 |
| domestication / foreignisation | 归化 / 异化 |
| faithfulness, expressiveness, elegance | 信、达、雅（严复《天演论·译例言》） |
| hypotaxis / parataxis | 形合 / 意合 |
| subject-prominent / topic-prominent | 主语突出 / 话题突出 |
| amplification / omission | 增译 / 减译 |
| conversion (of word class) / division / combination of sentences | 词类转换 / 分译 / 合译 |
| consecutive / simultaneous interpreting | 交替传译 / 同声传译 |
| machine translation / post-editing | 机器翻译 / 译后编辑 |

### 级别与框架

| English | 中文 |
|---|---|
| CEFR (Common European Framework of Reference for Languages) | 欧洲语言共同参考框架（CEFR） |
| China's Standards of English Language Ability (CSE) | 中国英语能力等级量表 |
| level A1–A2 / B1 / B2 / C1–C2 | A1–A2 级 / B1 级 / B2 级 / C1–C2 级 (in running text; the site's level labels are the bare A1–A2, B1, B2, C1–C2 in both languages) |
| learner / native / non-native speaker | 学习者 / 母语者 / 非母语者 |

### Terms that need care

- **tense and aspect: 时、体 and 时态.** School grammar speaks of 时态 for every combination
  (一般现在时, 现在完成进行时 …, often "16 种时态"). This atlas follows the English lessons, which
  separate tense (时: present and past) from aspect (体: progressive, perfect). Keep the familiar
  names for the combined forms (现在完成时 is fine), but when the English says *tense* in the strict
  sense write 时, and when it says *aspect* write 体. Do not state "英语有 16 种时态" as a fact.
- **体 and 态.** Aspect is 体 (进行体, 完成体); voice is 态 (语态, 被动语态). Never write 进行态 or
  完成态.
- **将来.** English has no future inflection; when the English speaks of "ways of talking about the
  future", write 将来时间的表达, and use 一般将来时 only where the English uses that label.
- **音素 and 音位.** In linguistics a phone is 音素 and a phoneme is 音位. School textbooks call the
  English phonemes "48 个音素". Use 音位 for *phoneme*; at levels 1–2 add once:
  音位（课本里常叫"音素"）.
- **爆破音 and 塞音.** School term and linguistics term for *plosive/stop*: write 爆破音（塞音） at
  first use, then 爆破音 at levels 1–2 and 塞音 in *English Linguistics*, as the English does.
- **分句 and 从句.** *Clause* in general is 分句; *subordinate clause* is 从句; *main clause* is 主句.
  Never call a main clause 从句.
- **量词.** In Chinese grammar 量词 is a classifier (个, 本, 张). English *quantifiers* (*some, many,
  a few*) are 量化词（数量限定词）, never 量词.
- **-ing forms.** Modern grammars treat the gerund and the present participle as one *-ing form*
  (Huddleston & Pullum's *gerund-participle*). Follow the English: -ing 形式 where it says *-ing
  form*, 动名词 / 现在分词 where it distinguishes them.
- **Conditionals and 虚拟语气.** School grammar files unreal conditionals under 虚拟语气; the
  English lessons use the labels zero/first/second/third conditional and speak of unreal or
  hypothetical meaning. Translate the label and the meaning: 第二类条件句（表示与现在事实相反或不太可能的情况）;
  use 虚拟语气 where the English says *subjunctive*.
- **Clause patterns.** School grammar teaches five 基本句型; Quirk et al. distinguish seven (adding
  SVA and SVOA). Translate whichever the English uses and keep its count.
- **内涵 and 外延.** In logic these are intension and extension. For *connotation* and *denotation*
  always write the full 内涵意义 / 概念意义.
- **语调 and 声调.** Intonation (语调) is the melody of an English utterance; tone (声调) is the
  lexical pitch of a Mandarin syllable. Keep them apart, above all in contrastive notes.
- **语域, 语体 and 文体.** *Register* is 语域; *style* in the sense of formal/informal is 语体; *style*
  in the sense of a writer's style, or stylistics, is 文体（文体学）.
- **主题 and 话题.** *Topic sentence* is 主题句; the *topic* of a topic–comment sentence is 话题
  (话题突出).
- **指代 and 参考文献.** *Reference* to an earlier noun is 指代; a *reference* in a bibliography is
  参考文献.
- **皮钦语 and 洋泾浜.** The technical term is 皮钦语. 洋泾浜英语 names the historical Chinese Pidgin
  English of the treaty ports; elsewhere it sounds disparaging.
- **中国英语 and 中式英语.** 中国英语 (*China English*, a term introduced by 葛传槼 in 1980) is the
  English used in China to express Chinese realities, a variety of the expanding circle; 中式英语
  (*Chinglish*) is English shaped by transfer from Chinese. Never use one for the other, and describe
  both without mockery.

## Check

`bash tools/check.sh --lang=zh <course>` — figures, structure parity with English, the course
overlay (same number of list entries as the English, no extra keys) and a warning for any line
that still looks like English prose: twelve or more English words in a row, once formulas,
references, attributes, code, URLs and *italic* spans are removed. English examples written in
italics, as the rules above require, therefore pass. Passages kept in English in a blockquote are
flagged until the checker learns to skip them. The run must end with `0 errors`, and the only
warnings left may be those for English passages in blockquotes.
Preview: `http://f.g77k.com/learn/english/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   explanation, solution, hint, quiz question, caption and history note. Never summarise or
   shorten: the Chinese lesson has the same content as the English, sentence for sentence, plus the
   translations of examples that levels 1–2 require.
2. For level-1 and level-2 courses, work in step with the English author: the lesson is finished
   when both versions are.
3. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
4. Do not edit English files, code or tools. If an English example or rule looks wrong, keep the
   translation faithful and report it — never "correct" English in the Chinese file.

A model for markup and tone (Maths Atlas, same engine):
`/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md` and
`/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 英语图谱.
