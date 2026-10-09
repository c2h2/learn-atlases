# Chinese Atlas — content guide

Chinese Atlas (`/learn/chinese/`, 中文图谱) is a course in Chinese language and literature for native
speakers: readers who grew up with Chinese in mainland China, have finished secondary school, and
want to know their language and its literature at the level of a university degree in 汉语言文学 —
characters and calligraphy, modern Chinese, classical Chinese, literature from the 《诗经》 to the
present day, literary theory and world literature, and writing and reasoning. It is not a course in
Chinese as a foreign language. Every chapter is a long, self-contained lesson in the style of a very
good university textbook: a real question first, then clear definitions and rules with their
explanations, many examples and worked analyses, interactive figures, quick checks and graded
exercises with full answers.

**Lessons are written in Chinese.** Pages open in Chinese by default (`default_lang` in the spec).
An English version of a lesson is optional and comes later (`tools/TRANSLATION_GUIDE_EN.md`).

The engine is Maths Atlas's (`/learn/maths/`). For markup and depth, read its reference lesson
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`; for Chinese typography and tone,
read one of its Chinese lessons, `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`.
Both are far from our subject; their care is the standard.

**Every lesson is written by hand to this standard.** Never generate lessons, course fields,
examples, exercises or milestones from templates, scripts or language models. A chapter is either
written properly or it stays "待编写" (its file does not exist): a placeholder that looks like a
lesson is worse than no lesson. Medicine Atlas shows why — `/learn/medicine/pending/README.md`
describes the generated filler that had to be taken off that site, and `/learn/medicine/tools/check.php`
now rejects its patterns. This atlas's checker does not have those patterns yet; the rule applies
all the same.

## 1. Files, and how the engine reads them

```
content/en/<course>/course.json    base record: structure (slugs, area, level, order, prerequisites,
                                   chapter requires, years, people) and the English text — see §3
content/zh/<course>/course.json    Chinese overlay: the Chinese text of the same fields
content/zh/<course>/<chapter>.md   the lesson, in Chinese
content/en/<course>/<chapter>.md   optional English version (tools/TRANSLATION_GUIDE_EN.md)
data/milestones.json               timeline events: structure and English text
content/zh/_data/milestones.json   the Chinese text of the same events, in the same order
```

The engine was built for English sources with Chinese translations, and three of its habits shape
the rules below (see `inc/content.php`, `inc/i18n.php`, `timeline.php`, `tools/check.php`):

- **The course list comes from `content/en`.** On Chinese pages each record is overlaid with
  `content/zh/<course>/course.json`, which may hold only `title`, `full_title`, `tagline`, `summary`,
  `overview`, `outcomes`, `chapters` (each `{"title", "summary"}`), `history` (no `year`) and
  `references`. **Lists are overlaid index by index**: a Chinese entry with no English entry at the
  same position is silently dropped, and `tools/check.php` reports an ERROR when the counts differ.
  Every list you write in Chinese therefore needs an English entry at the same position — at least a
  faithful short translation. The timeline works the same way.
- **Chinese pages fall back to English, not the other way round.** A chapter page shows
  `content/<language>/<course>/<chapter>.md`; an English page whose chapter exists only in Chinese
  says "to be written", and English pages count only English lessons. That is an engine to-do (§9),
  not a reason to write English first.
- **The checker's depth targets apply only to English lessons** for now. Markup errors, figure
  settings and unresolved references in Chinese lessons are already reported as errors; length,
  examples, exercises and the summary and history blocks must be checked by hand (§10).

The curriculum (28 courses in seven areas over four years) is fixed in the `course.json` files.
**Do not rename, add, remove or reorder courses or chapters**, because other lessons link to them.

## 2. Readers and register

- **Readers.** Native speakers with 高中语文 behind them. Year-1 courses assume nothing more; later
  courses assume their prerequisite courses and each chapter's `requires`. Teachers and graduates in
  the subject should find nothing to correct.
- **Make the implicit explicit.** A native speaker uses 把字句, 轻声 and 平仄 without being able to
  describe them; the lesson's first job is to describe what readers already do, and only then to go
  beyond it. Never talk down to the reader, and never assume knowledge the prerequisites do not give.
- **Standard modern written Chinese**: plain, exact and readable, the register of the best
  university textbooks. No 八股 and no 应试套话 (“体现了作者……的思想感情”“具有深远的历史意义和现实意义”),
  no slogans, no 堆砌辞藻, no 文白夹杂 outside quotations. Several courses teach readers to see through
  such writing; the lessons must not use it.
- **Terms.** Bold a term where it is defined. For terms of linguistics and literary theory that come
  from Western scholarship, give the English (or other original) term in brackets at first use:
  **能指**（signifier）. Where textbooks use different terms for one thing (主语/主题, 句读/断句), say
  which this atlas uses and why.
- **Voice.** “我们” for shared reasoning; address the reader directly only in instructions.

## 3. course.json — what to fill in

The skeleton already has, in both files, `title`, `full_title`, `tagline`, `summary` and the chapters'
`title` and `summary`; the English base also has `slug`, `area`, `level`, `order`, `prerequisites`,
the chapters' `slug` and `requires`, and `next`. You complete, in Chinese first and then in English
at the same positions:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the course covers, why it matters to a native speaker, how it is organised, what is hard about it and how to approach it. |
| `outcomes` | 6–10 outcomes, each beginning with a verb (“分析……”“辨别……”“标出……”“翻译……”“写出……”), concrete enough to test. |
| `history` | 5–10 events in chronological order. Base: `{"year": 1958, "title": "…", "detail": "1–2 sentences", "people": ["…"]}` with the English text and people in Hanyu Pinyin; overlay: `{"title", "detail", "people"}` in Chinese, people in characters, **no `year`**. `year` is one integer, negative before the common era (−221 is shown as 公元前221年); write 约 / c. in the text for approximate dates. Every event is tied to a datable source; no legend presented as fact. |
| `references` | 4–8 works readers actually use, cited as published: Chinese books with their Chinese title and authors in the base record too, foreign works by the Chinese translation readers would use (with the translator). The base `note` says in English what each is good for, the overlay `note` says it in Chinese. Give the edition and year of the copy you cite. |

Typical references, by area (the years given are first editions or editions known to exist; cite
the edition you actually use, and check whether a newer one has appeared):

- 汉字: 裘锡圭《文字学概要》（商务印书馆，1988；修订本 2013）；许慎《说文解字》（通行本为大徐本）; 《通用规范汉字表》（2013）.
- 现代汉语: 黄伯荣、廖序东主编《现代汉语》（高等教育出版社，增订本，最新一版）；胡裕树主编《现代汉语》（上海教育出版社）；
  朱德熙《语法讲义》（商务印书馆，1982）；吕叔湘《现代汉语八百词》（商务印书馆）；陈望道《修辞学发凡》（1932）；
  叶蜚声、徐通锵《语言学纲要》（北京大学出版社）；《现代汉语词典》（商务印书馆，最新一版）.
- 古代汉语: 王力主编《古代汉语》（中华书局，校订重排本）；郭锡良等编著《古代汉语》（商务印书馆）；王力《汉语史稿》；
  唐作藩《音韵学教程》（北京大学出版社）；《古汉语常用字字典》（商务印书馆）；《辞源》《汉语大词典》《汉语大字典》.
- 古代文学: 袁行霈主编《中国文学史》（高等教育出版社，第三版 2014）；游国恩等主编《中国文学史》（人民文学出版社）；
  王力《诗词格律》（中华书局）；鲁迅《中国小说史略》；郭绍虞主编《中国历代文论选》（上海古籍出版社）.
- 现当代文学: 钱理群、温儒敏、吴福辉《中国现代文学三十年》（北京大学出版社）；洪子诚《中国当代文学史》（北京大学出版社）；
  陈思和主编《中国当代文学史教程》（复旦大学出版社）.
- 文论与外国文学: 童庆炳主编《文学理论教程》（高等教育出版社）；韦勒克、沃伦《文学理论》（中译本）；
  郑克鲁等主编《外国文学史》（高等教育出版社）；王国维《人间词话》；刘勰《文心雕龙》（with a standard modern edition such as 范文澜注 or 周振甫注）.
- 写作与思维: 《普通逻辑》（上海人民出版社，编写组）；金岳霖主编《形式逻辑》（人民出版社）；GB/T 9704—2012《党政机关公文格式》；
  GB/T 7714—2015《信息与文献　参考文献著录规则》.

You may polish `tagline`, `summary` and the chapter `summary` strings (in both files), and adjust a
chapter's `requires` list (prerequisite chapters as `"course/chapter"`, only earlier chapters of the
same course or chapters of prerequisite courses). Keep titles plain text: no `$…$`, no italics.

The timeline holds about 30 milestones: `data/milestones.json` `{"year", "title", "detail",
"people", "area"}` in English (`area` one of `script`, `language`, `classical`, `ancient`, `modern`,
`theory`, `writing`) and `content/zh/_data/milestones.json` with the Chinese `title`, `detail` and
`people` in the same order. Typical anchors, each to be checked against a standard history before
use: the Shang oracle-bone inscriptions (late Shang, c. 13th–11th century BC), the compilation of the
《诗经》, the Qin standardisation of the script (221 BC), 许慎《说文解字》 (completed c. AD 100), 刘勰
《文心雕龙》 (c. 501), 陆法言《切韵》 (601), 《广韵》 (1008), 周德清《中原音韵》 (1324), 《康熙字典》
(1716), the first printed edition of 《红楼梦》 (程甲本, 1791), 《马氏文通》 (1898), the discovery of the
oracle bones (1899), 胡适《文学改良刍议》 and the literary revolution (1917), 鲁迅《狂人日记》 (1918),
the national phonetic alphabet 注音字母 (1918), 《汉语拼音方案》 (1958), 《简化字总表》 (1964) and
《通用规范汉字表》 (2013).

## 4. Depth targets for every lesson

The checker applies these only to English lessons for now (§1, §9); meet them in the Chinese lesson
and check them by hand (§10).

- **About 6,000–11,000 Han characters** (at least 5,000). The engine counts two Han characters as one
  "word", so this is its 3,000–5,500-word target; quoted texts count, punctuation does not, and neither
  do characters outside U+3400–U+9FFF (CJK Extension B and beyond, 〇).
- **Definitions and rules** as numbered blocks (≥ 3 in total).
- **≥ 4 worked examples** (`::: example` with a `::: solution`): an analysis carried out step by
  step — the structure of a character, the immediate constituents of a sentence, the 平仄 of a
  regulated poem checked against its pattern, a passage of 文言 translated with the reasons for each
  choice, the narrative point of view of a passage, a faulty sentence diagnosed and corrected.
  Lists of example sentences are ordinary text, not `example` blocks.
- **≥ 1 interactive figure** (§8), **≥ 1 quick check** (`::: quiz`; 3–5 is better, because apart
  from numeric answers quizzes are the only answers the site marks), **≥ 1 `::: warning`**, one
  `::: history` block, and a `::: summary` (要点回顾, 5–8 bullets) just before the exercises.
- **`## 习题` with ≥ 8 exercises**: about 3 routine (`level=1`), 3 standard (`level=2`) and 2+
  challenging (`level=3`: a passage to translate or analyse, a poem to scan, an argument to evaluate,
  a short piece of writing). **Every exercise has a complete `::: solution`** listing all acceptable
  answers; add a `::: hint` for harder ones.

Suggested shape (adapt to the topic):

```
（导语，无标题：一个真实的问题，例如“为什么‘一骑红尘妃子笑’的‘骑’今天读 qí？”）
## <第一个问题>          定义、规则与解释、例子、小测验
## <第二个问题>          ……（共 3–6 节）
::: note 辨析           容易混淆的概念放在一起比较
## 常见错误              可选，当 ::: warning 不够时
## 后续内容              后续章节与课程（附链接）
::: summary
## 习题
```

### Kinds of block in this atlas

The block kinds are those of Maths Atlas, two of them relabelled for this atlas (the captions are
generated by the site; never write them yourself):

| kind | shown as | use |
|---|---|---|
| `definition` | 定义 / Definition | terms: 形声字, 语素, 意象, 周延. Ids `def-…`. |
| `theorem` | **规则 / Rule** | rules of the language and of form: 上声变调, 律诗的粘与对, 笔顺规则, 三段论的规则, 浊音清化. A tendency is stated as a tendency (“一般”“多数情况下”), with the evidence. Ids `rule-…`. |
| `proof` | **解释 / Explanation** | why the rule holds — history, phonetics, meaning — and where it stops holding. The ∎ end mark is added automatically. |
| `example` + `solution` | 例 / Example | a worked analysis (§4). Ids `ex-…`. |
| `exercise` (+ `hint`, `solution`, `answer`) | 习题 / Exercise | `level=1`, `level=2` or `level=3`; hints and solutions are collapsed. |
| `quiz` | 小测验 / Quick check | multiple choice, marked by the site: options `- [x]` (correct) and `- [ ]`, then a `solution`. |
| `warning` | 常见错误 / Common mistake | a typical error and why it is wrong: 错别字, 误读, 病句, 望文生义的字源解说, 张冠李戴的引文, with ✗ and ✓. |
| `note` | 注 / Note | give recurring notes a title: `::: note 辨析`, `::: note 版本异文`, `::: note 延伸阅读`. |
| `intuition`, `remark`, `application` | 直观理解, 注记, 应用 | the idea behind a rule in plain words; asides; uses in reading, writing and work. |
| `history`, `summary` | 历史注记, 要点回顾 | once per lesson each. |

The 定义与规则 page lists `definition` and `theorem` blocks only. **Do not use `lemma`,
`proposition`, `corollary`, `axiom` or `algorithm`**: they keep their mathematical captions (引理,
命题, 推论, 公理, 算法) and are not listed. In the logic course in particular, a 命题 is defined in a
`definition` block (`::: definition 直言命题 {#def-categorical}`) — the `proposition` kind would
print a numbered “命题” caption that means something else. Write a procedure (分析一个句子, 检查一首诗的
格律) as a numbered list inside a rule or a note.

`check="…"` on an exercise is compared **numerically** with the reader's answer, so it fits only
answers that are one number (a stroke count, the number of morphemes, syllables or clauses). Text
answers cannot be checked by the site yet; give them in full in the `::: solution` (or a short
`::: answer`), with every acceptable variant. Questions with one right choice among a few belong in
a `::: quiz`.

## 5. Accuracy, sources and fairness

- **Follow the standard textbooks and reference works** (§3) for terms, analyses and facts, and check
  every factual claim in at least two of them. Where the standard systems differ — 黄廖本 and 胡裕树本
  analyse some sentences differently; scholars read 六书 and especially 转注 differently; some prefer
  the 三书说 — say which analysis the lesson follows and name the alternative. Never present one
  school's view as the only one.
- **Literary history is even-handed and sourced**, in the manner of the mainstream textbooks
  (袁行霈; 钱理群等; 洪子诚). Give contested questions as contested, with the main positions: the
  authorship of the last forty chapters of 《红楼梦》, the dating of 《古诗十九首》, the authenticity
  of some attributions. No polemics, no ranking of writers by politics, no settling of scores.
  Political periods that shaped literature (the campaigns of the 1950s, the Cultural Revolution) are
  treated as the standard textbooks treat them: factually, with dates and sources, as context for the
  works; no present-day political commentary.
- **Dates, names and attributions are checked**: 生卒年 (with 约 and the main views where they are
  uncertain — 屈原, 曹雪芹), 字号, dynasty and reign dates. **No invented quotations**: sayings
  falsely attributed to famous writers circulate widely online; quote only from the works themselves,
  with the source.
- **No 望文生义.** Popular explanations of characters (“親不見”“愛無心” and the like) are usually
  wrong. Explain a character's origin from its early forms and modern scholarship (裘锡圭; the
  standard collections of oracle-bone and bronze forms), and say where 《说文解字》 has been corrected
  by excavated forms (为 is a hand leading an elephant, not 《说文》's “母猴也”).
- **Pronunciation norms.** Readings follow 《现代汉语词典》 (latest edition) and 《普通话异读词审音表》
  (1985; check whether a revised table has been issued); Pinyin follows 《汉语拼音正词法基本规则》
  (GB/T 16159—2012). Give the reading for the sense of a 多音字. Traditional readings kept for rhyme
  or old sense (斜 read xiá in 杜牧《山行》, 骑 read jì in “一骑红尘”) are practices of some teachers, not
  the norm: give the standard reading first and describe the practice as such (the 1985 table made
  骑 qí throughout).
- **Character norms.** Running text uses the forms of 《通用规范汉字表》 (2013). Traditional, variant
  and ancient forms appear only where the topic needs them (文字学, 书法, 版本, 繁简对应, 通假) and
  are labelled: 繁体“後”. Quote classical texts in simplified characters, except where the form
  matters — simplification merged some characters (后/後, 发/發/髮, 干/乾/幹, 云/雲, 余/餘), and a
  discussion of such words gives both forms. Avoid characters outside the common fonts (CJK
  Extension B and beyond): on many devices they show as empty boxes. If one is indispensable, describe
  it by its components (⿰木口) or draw it in a figure.
- **Dialects are described, never ranked.** No dialect is “土”, “不标准” or a corrupt form of
  Putonghua; the standard language is one variety with a particular social role. Transcribe dialect
  forms in IPA with tone values as Chao's five-level numbers ([ma⁵⁵] or ma55, stating the
  convention), and cite the sources (《汉语方音字汇》; 《方言调查字表》; 《中国语言地图集》; 曹志耘主编
  《汉语方言地图集》). Describe their classifications in words and diagrams; never copy their maps
  (copyright, and the map rules in `tools/WIDGET_GUIDE.md`). Say whose speech an example records
  (place, generation) — dialects vary within a county.
- **Examinations.** The atlas teaches the language and its literature, not exam technique. 高考作文,
  申论, the 普通话水平测试 and 考研 papers may be described in general terms, dated (“截至2026年”), because
  formats change; never reproduce their papers or their published model essays, and never promise
  scores. The writing courses examine the formulas of exam essays critically and teach readers to
  write without them.
- **Logic and argument examples** are chosen for the logic, not to win a political, religious or
  social argument; fallacies are illustrated with invented or historical examples, never by mocking
  real groups.

## 6. Texts, quotations and copyright

- **Classical texts** are in the public domain. Quote them exactly from a standard edition (中华书局
  and 上海古籍出版社 point-and-collate editions, the 十三经注疏, standard collected works), with the
  source as 《书名·篇名》 or 作者《篇名》, and check against a second edition where texts vary. Note
  variants that matter: the familiar 《静夜思》 (“床前明月光……举头望明月”) differs from the Song
  editions of 李白's collected works (“床前看月光……举头望山月”).
- **Modern editorial work is not public domain.** The punctuation, collation notes, annotations and
  modern-Chinese translations of modern editions are the editors' work and may be protected. Quote a
  passage's text, but write your own 注释 and 今译; do not copy an edition's notes or apparatus.
- **Digital text collections** (中国哲学书电子化计划, 汉典, 识典古籍, 中华经典古籍库, 中国基本古籍库,
  CBETA and others) are for finding and checking texts. Read each one's terms: most forbid bulk
  copying, and many allow only personal or non-commercial use, which does not fit this repository's
  CC0 dedication. Never scrape them.
- **Modern works.** The term of copyright in China is the author's life plus 50 years (《著作权法》,
  2020 revision); many other countries use life plus 70, and the atlas is read worldwide. So:
  - **Longer passages** (more than a few lines) only from authors who died more than 70 years ago —
    that is, before 1956 at the time of writing: 鲁迅 (d. 1936), 朱自清 (1948), 闻一多 (1946),
    郁达夫 (1945), 萧红 (1942), 徐志摩 (1931), 戴望舒 (1950). Check the date for each author.
  - **Everyone else** — 胡适 (d. 1962), 老舍 (1966), 周作人 (1967), 郭沫若 (1978), 茅盾 (1981),
    沈从文 (1988), 张爱玲 (1995), 曹禺 (1996), 钱锺书 (1998), 冰心 (1999), 巴金 (2005) and every
    living writer — is quoted only briefly, with attribution, where the passage itself is being
    discussed: the fair-use rule of 《著作权法》 第二十四条 (“为介绍、评论某一作品或者说明某一问题，在作品中
    适当引用他人已经发表的作品”).
- **Translations have their own copyright**, running from the translator's death. 朱生豪's
  Shakespeare (d. 1944) and 林纾's versions (d. 1924) may be quoted at length; 傅雷 (d. 1966) is in
  the public domain in China but not yet under life plus 70, so only briefly; most modern
  translations are protected. Check each translator, and when in doubt translate a short passage
  yourself from a public-domain original and say so.
- **Model texts** (范文, sample letters and official documents, essays, dialogues for analysis) are
  written for the atlas. Never copy 作文书, 高考满分作文 or published model documents, never present
  a text you wrote as authentic, and never present machine output as a model.
- **Official documents.** Laws, regulations and other official documents of state organs are not
  protected by copyright in China (《著作权法》 第五条); 《通用规范汉字表》, issued by the State Council,
  is one. National standards such as GB/T 15834 or GB/T 7714 are sold as publications: summarise
  their rules in your own words and quote only what you discuss.
- **Images.** No scans or photographs from books, auction sites or museum pages unless they carry a
  clear open licence (CC0 or a public-domain mark, credited in `THIRD-PARTY-NOTICES.md`); ancient
  forms and calligraphy are drawn for the atlas (§9).

## 7. Markup and notation

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
headings, lists, tables, blocks, references (`[[#id]]`, `[[course/chapter]]`,
`[[course/chapter#id]]`) and attributes. What behaves differently with Chinese text (tested on this
engine):

- **Ids are ASCII.** Give blocks short, stable ids in Pinyin or English (`{#def-xingshengzi}`,
  `{#rule-shangsheng-biandiao}`). Chinese headings get automatic ids `sec-1`, `sec-2` … (Han
  characters are dropped), which change when a section is added: give an explicit `{#id}` to every
  heading you link to.
- **A reference renders its own caption** (“规则 3.2”), so write `[[#rule-…]]`, never
  “规则 [[#rule-…]]” — the checker flags the duplicated label.
- **Emphasis.** `**…**` is bold: use it for a term at its definition. `*…*` works next to Han
  characters but renders upright and semi-bold on Chinese pages (Chinese has no italics); use it only
  for Latin-script titles and words. Never use a bare `*` for anything else: it starts emphasis, and
  a backslash does not escape it (`\*` prints both characters). Write reconstructed forms with the
  full-width ＊ (＊kʰaʔ) or in a code span.
- **Faulty and correct forms**: ✗ before the faulty sentence, ✓ before the corrected one —
  ✗ 通过这次活动，使我们受到了深刻的教育。 ✓ 这次活动使我们受到了深刻的教育。
- **Typography** follows GB/T 15834—2011 (标点符号用法) and GB/T 15835—2011 (出版物上数字用法), and the
  Chinese conventions of the other atlases (`/learn/maths/tools/TRANSLATION_GUIDE_ZH.md`):
  full-width punctuation in Chinese sentences (，。；：？！、（）“”‘’《》〈〉——……); numbers and formulas
  written directly next to Han characters (2019年, 第3章); a Latin word separated from Han characters
  by one half-width space, except next to full-width punctuation. Titles of books and of poems in
  《》 (李白《静夜思》), a chapter or piece within a book as 《史记·项羽本纪》, a title inside a title in
  〈〉. Year ranges with the 一字线: 1917—1949. Reign dates with the common-era year in brackets:
  贞观十七年（643年）; 公元前221年. Life dates after the name at first mention: 苏轼（1037—1101）.
- **Quotations.** Short ones in running text in “”, with the source; longer ones as a blockquote,
  with the attribution on its own line: `> ——杜甫《春望》`.
- **注音.** Pinyin with tone marks, in full-width brackets after the character: 行（háng）. Tone
  values as Chao's numbers (55, 35, 214, 51). IPA in square brackets for phonetic detail [tʂʰ] and
  slashes for phonemes /p/. Name the reconstruction system you quote for Middle and Old Chinese
  (王力, 李方桂, 郑张尚芳, Baxter–Sagart) and do not mix systems in one table.
- **平仄**: ○ 平, ● 仄, ◎ 可平可仄; mark the rhyme at the end of the line with △ (平声韵) or ▲ (仄声韵):
  `●●○○●，○○●●○△。` In a quoted poem the rhyme characters may be set in bold. Say which rhyme
  system the analysis uses (平水韵, or a modern 新韵) and flag 入声 characters, which are 仄 although
  Putonghua reads many of them in the first or second tone (白, 国, 一, 十, 竹).
- **Sentence analysis.** For immediate-constituent analysis (层次分析) use the `graph` figure or a
  table with one row per layer and the relation of each cut (主谓, 动宾, 偏正, 中补, 联合). For sentence
  elements use the school bracket notation — 定语（ ），状语［ ］，补语〈 〉 — with the heads of
  subject, predicate and object in bold instead of underlining (the site has no underline):
  （我们）**班**［昨天］**举行**了（一场）（热烈的）**讨论**。 State which grammar system the analysis
  follows.
- **Dollar signs start formulas.** A price in yuan needs no escape (¥5); a literal `$` must be
  written `\$`. Formulas are rare here (Zipf's law, readability, logic); when needed, use `$…$`.
- **Avoid** braces `{…}` at the end of a heading or block line (they are read as attributes) and the
  pattern `[text](http…)` unless you mean a link. Raw HTML is escaped and there is no image syntax:
  ruby, images and vertical text are not available in lessons (§9).
- **Links to other atlases** are plain Markdown links (`[数学图谱](/learn/maths/)`): `[[…]]` only
  works inside one atlas.

## 8. Interactive figures

The available types are in `data/widgets.json`; try each at `/learn/chinese/lab.php?w=<type>`:

- `plot` — curves with sliders: tone contours on Chao's five-level scale (pitch against time, with
  `if()` for the dipping third tone), Zipf's law for characters or words (plot the logarithms: the
  type has no log axes), coverage curves from a formula.
- `distribution` — sampling models for the logic course: why small polls mislead, the spread of a
  binomial count, the normal approximation.
- `markov` — next-character or next-word prediction from a small hand-made transition table, as an
  introduction to n-gram models; a model built from 《全唐诗》 needs a figure of our own.
- `bayes` — base rates and updating, for 评估信息: a reliable-seeming test or rumour and a rare event.
- `graph` — trees and networks with fixed positions (`A@x,y`) and directed edges (`A>B`): component
  trees of characters, phonetic series, the Sino-Tibetan family, immediate-constituent trees,
  argument maps, networks of characters in a novel.
- `venn` — relations between concepts (全同, 属种, 交叉, 全异) and the four categorical propositions;
  three sets for a syllogism.
- `truthtable` — 联言, 选言 and 假言 propositions, 充分条件 and 必要条件, equivalences such as
  p → q and ¬q → ¬p.

Use a kept type only when it genuinely serves the lesson. Figures of our own (stroke order, the
evolution of the script, component trees, a 平仄 checker, 词谱, 反切, sentence analysis, syllogisms,
citation formats …) are planned in `tools/WIDGET_GUIDE.md`; use a type only once it is in the
catalogue. A lesson whose figure does not exist yet is not finished: write it, and say in your report
which figure it needs. Text in a figure's settings (characters, a poem, a sentence) is data and
appears unchanged on English pages.

## 9. Engine work before the first lessons

- **Chinese as the source language.** A spec option (for example `source_lang: "zh"`, applied by the
  generator) so that `tools/check.php` applies the depth targets, the summary and history checks and
  the "not written yet" to-do list to `content/zh`, with the length counted in Han characters;
  compares an English version's numbered blocks with the Chinese one rather than the reverse; and so
  that English pages show the Chinese lesson with a notice ("This chapter is available in Chinese
  only") instead of "to be written", and English index, course and about pages count it.
- **注音 (ruby).** Markup for Pinyin above characters, for 多音字 in context, rare characters and
  the readings of 文言 passages; until then readings go in brackets.
- **Images and ancient forms.** There is no image syntax and raw HTML is escaped. Ancient forms
  (甲骨文, 金文, 篆书), calligraphy models and rubbings need either a figure type or image support;
  draw the forms for the atlas as SVG from published sources (cited), never from scans.
- **Typefaces.** Chinese text uses the reader's system sans-serif fonts. A Kai or Song typeface for
  poems, calligraphy models and character forms — LXGW WenKai (霞鹜文楷) or Source Han Serif (思源宋体),
  both under the SIL Open Font Licence — would have to be self-hosted and subset to the characters
  used (full CJK fonts are many megabytes) and credited in `THIRD-PARTY-NOTICES.md`.
- **Text answers.** `check="…"` accepts only numbers; a list of accepted text answers (characters,
  Pinyin with or without tone marks, a 平仄 string) would let the site mark fill-in exercises.
- **Figures of our own.** The generator keeps only Maths Atlas figure types (see
  `tools/WIDGET_GUIDE.md`).
- **Filler check.** Port Medicine Atlas's generated-filler patterns (for Chinese as well as English)
  into the shared checker.

## 10. Check your work

```
cd /var/www/f.g77k.com/learn/chinese
bash tools/check.sh --lang=zh <course> [<course> …]
```

For a Chinese lesson this reports, as errors, broken markup (unclosed or unknown blocks), invalid
figure settings, formula errors, unresolved references and duplicated labels (“规则 [[#…]]”), and,
as warnings, lines that look like untranslated English (twelve or more English words in a row outside
italics, code and references — put quoted English in italics). It does **not** yet check the depth
of a Chinese lesson, so count it yourself before you call a lesson finished:

```
php -r 'echo preg_match_all("/[\x{3400}-\x{9fff}]/u", file_get_contents($argv[1])), " Han characters\n";' content/zh/<course>/<chapter>.md
grep -cE '^::: ?(example|exercise|quiz|widget|definition|theorem)\b' content/zh/<course>/<chapter>.md
```

(the second line counts blocks of all six kinds together; look at the rendered page for the
breakdown). Preview at `http://f.g77k.com/learn/chinese/lesson.php?c=<course>&l=<chapter>` (Chinese
by default; add `&lang=en` for the English page) — from this machine with
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`;
`node tools/labcheck.js --lessons --zh` loads every figure in every Chinese lesson. Read your
rendered lesson at least once from beginning to end.
