# Chinese Atlas — 中文图谱

A detailed, interactive course in Chinese language and literature for native speakers — readers who
grew up with the language in mainland China and want to know it, and its literature, at the level
of a university degree in 汉语言文学: characters and calligraphy, the sounds, words and grammar of
modern Chinese, classical Chinese, literature from the 《诗经》 to the present day, literary theory
and world literature, and clear writing and reasoning. It is **not** a course in Chinese as a
foreign language. It runs on the same engine as [Maths Atlas](../maths/): plain PHP, no framework
and no database.

**Status: curriculum skeleton.** All 28 courses and 270 chapters are defined, in Chinese and in
English, with taglines, summaries, chapter summaries and prerequisites. Lessons, course overviews,
outcomes, history, references, the timeline and the figures of our own are still to be written;
missing chapters show as "待编写" / "to be written". While `MA_SKELETON` is `true` in
`inc/bootstrap.php` the site calls itself "中文图谱（框架）" / "Chinese Atlas (skeleton)"; switch it
off once the lessons are written.

**Chinese first.** The spec sets `default_lang: "zh"`, so pages open in Chinese unless the reader's
browser asks for English first or the reader picks English (the choice is kept in the cookie
`chinese_lang`). Lessons are written in Chinese (`content/zh/<course>/<chapter>.md`); English versions
are optional translations made later. The course records are split the way the engine needs them:
`content/en/<course>/course.json` holds the structure and the English text, and
`content/zh/<course>/course.json` overlays the Chinese text field by field and list by list.

The four levels are the years of a university degree (`LEVELS` in `inc/content.php`: Year 1–4,
大一—大四). The seven areas are characters (汉字), modern Chinese (现代汉语), classical Chinese
(古代汉语), classical literature (古代文学), modern literature (现当代文学), theory and world
literature (文论与外国文学), and writing and reasoning (写作与思维). Theorem and proof blocks are shown
as **规则 / Rule** and **解释 / Explanation**, and the index of numbered statements is called
"定义与规则" / "Definitions and rules".

| Year | 课程 | Course | Slug | Area | Chapters |
|---|---|---|---|---|---|
| 1 | 汉字学 | Chinese Characters | `chinese-characters` | 汉字 | 11 |
| 1 | 现代汉语语音 | The Sounds of Mandarin | `sounds-of-mandarin` | 现代汉语 | 9 |
| 1 | 现代汉语词汇 | Modern Chinese Vocabulary | `modern-vocabulary` | 现代汉语 | 9 |
| 1 | 现代汉语语法 | Modern Chinese Grammar | `modern-grammar` | 现代汉语 | 9 |
| 1 | 古代汉语（一） | Classical Chinese I | `classical-chinese-1` | 古代汉语 | 10 |
| 1 | 先秦文学 | Pre-Qin Literature | `pre-qin-literature` | 古代文学 | 10 |
| 1 | 基础写作 | Foundations of Writing | `foundations-of-writing` | 写作与思维 | 9 |
| 2 | 书写与书法 | Handwriting and Calligraphy | `calligraphy` | 汉字 | 9 |
| 2 | 修辞与语体 | Rhetoric and Style | `rhetoric` | 现代汉语 | 9 |
| 2 | 古代汉语（二） | Classical Chinese II | `classical-chinese-2` | 古代汉语 | 9 |
| 2 | 秦汉魏晋南北朝文学 | Han–Six Dynasties Literature | `han-to-nanbeichao` | 古代文学 | 10 |
| 2 | 唐五代文学 | Tang Literature | `tang-literature` | 古代文学 | 9 |
| 2 | 诗词格律与鉴赏 | Classical Poetry | `poetry-metrics` | 古代文学 | 10 |
| 2 | 文学概论 | Literary Theory | `literary-theory` | 文论与外国文学 | 10 |
| 2 | 中国现代文学 | Modern Chinese Literature | `modern-literature` | 现当代文学 | 10 |
| 2 | 议论文与评论写作 | Argument and Commentary | `argumentative-writing` | 写作与思维 | 10 |
| 2 | 逻辑与批判性思维 | Logic and Critical Thinking | `logic` | 写作与思维 | 10 |
| 3 | 宋代文学 | Song Literature | `song-literature` | 古代文学 | 9 |
| 3 | 元明清文学 | Yuan, Ming and Qing Literature | `yuan-ming-qing` | 古代文学 | 11 |
| 3 | 中国当代文学 | Contemporary Literature | `contemporary-literature` | 现当代文学 | 9 |
| 3 | 语言学概论 | Introduction to Linguistics | `linguistics` | 现代汉语 | 10 |
| 3 | 音韵学 | Historical Phonology | `phonology` | 古代汉语 | 9 |
| 3 | 外国文学 | World Literature | `world-literature` | 文论与外国文学 | 11 |
| 3 | 应用文与公文写作 | Practical Writing | `applied-writing` | 写作与思维 | 9 |
| 4 | 汉语方言 | Chinese Dialects | `dialects` | 现代汉语 | 10 |
| 4 | 汉语史 | History of Chinese | `history-of-chinese` | 古代汉语 | 9 |
| 4 | 中国古代文论 | Classical Criticism | `classical-criticism` | 文论与外国文学 | 10 |
| 4 | 学术写作与论文 | Academic Writing | `academic-writing` | 写作与思维 | 10 |

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (readers and register, how the Chinese and
  English files fit together, depth targets, block kinds, sources and textbooks, quoting classical
  texts, copyright of modern works and translations, character and pronunciation norms, notation
  for 平仄, 注音 and sentence analysis). Every lesson is written by hand; nothing is generated from
  templates or language models.
- Figures: `tools/WIDGET_GUIDE.md` (API and conventions, data licences, the rule on maps of China,
  and the plan for figures such as stroke order, the evolution of the script, component trees,
  tone contours, a 平仄 checker, 词谱, 反切, sentence analysis, syllogisms and citations).
- English versions: `tools/TRANSLATION_GUIDE_EN.md` (what is translated, classical quotations,
  romanisation, standard English titles, dynasties, and a term table).

Engine work to do before the first lessons:

- **Chinese as the source language.** The engine still treats English as the source.
  `tools/check.php` applies the depth targets, the summary and history checks and the
  "lesson not written yet" to-do list only to `content/en`, and compares a Chinese lesson's
  numbered blocks with an English one only when that exists; English pages do not fall back to the
  Chinese lesson (they say "to be written"), and the English index, course and about pages count
  only English lessons. This atlas needs a source-language option (for example `source_lang: "zh"`
  in the spec, handled by the generator) that turns all of this round, with the length target
  counted in Han characters. Markup errors and unresolved references in Chinese lessons are
  already reported. (The `/learn` landing page already counts this atlas's Chinese lessons.)
- **Figures of our own.** `tools/mkatlas.py` accepts only figure types from the Maths Atlas
  catalogue and rewrites `data/widgets.json`, the Lab groups and `inc/lang/zh-figures.php` on every
  run; it needs an atlas-local catalogue before any Chinese figure is built.
- **注音 and images.** Lessons cannot show pinyin above characters (no ruby markup; raw HTML is
  escaped) or include images (no image syntax), so readings of 多音字 and rare characters go in
  brackets, and ancient forms, calligraphy and rubbings need a figure type or image support.
- **Typefaces.** Chinese text uses the reader's system sans-serif font. A Kai or Song face for
  poems, calligraphy models and character forms (for example LXGW WenKai or Source Han Serif, both
  under the SIL Open Font Licence) would have to be self-hosted and subset; characters outside
  the common fonts (CJK Extension B and beyond) show as empty boxes on many devices.
- **Text answers.** Exercise checks are numeric; accepting text answers (characters, pinyin, a
  平仄 pattern) would let the site mark fill-in exercises.
- **Filler check.** Medicine Atlas's checker rejects generated filler; this checker does not yet.
- **No maps of China** without the review that Chinese map regulations require (see
  `tools/WIDGET_GUIDE.md`); dialect areas and poets' journeys are shown as diagrams and timelines.

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
node tools/shot.js "lesson.php?c=…&l=…" out.png # screenshot a page and report JavaScript errors
```

`tools/check.php` lists every missing English lesson and empty course field as a warning; until the
source-language option exists, the to-do list for this atlas is the set of chapters without a
`content/zh/<course>/<chapter>.md`.

The engine in this directory is a generated copy of the Maths Atlas engine: re-run
`python3 tools/mkatlas.py tools/atlas-specs/chinese.json` from the repository root to bring in
engine fixes (course records, this README and `tools/*.md` are never overwritten). Engine changes
belong in `/learn/maths/` or in the generator, not in the copied files here.
