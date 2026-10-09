# English Atlas

A detailed, interactive course in how English works — pronunciation, vocabulary and grammar,
reading and writing from everyday texts to academic papers, listening and speaking, and the
history, varieties and translation of English — written for learners and especially for Chinese
speakers, in English and Simplified Chinese, on the same engine as [Maths Atlas](../maths/). Plain
PHP, no framework and no database.

**Status: curriculum skeleton.** All 26 courses and 251 chapters are defined, with taglines,
summaries, chapter summaries and prerequisites. Lessons, course overviews, outcomes, history,
references, the timeline, the Chinese course overlays and the English-specific figures are still
to be written; missing chapters show as "to be written". While `MA_SKELETON` is `true` in
`inc/bootstrap.php` the site calls itself "English Atlas (skeleton)" (英语图谱（框架）); switch it off
once the lessons are written.

The four levels are bands of the Common European Framework of Reference (`LEVELS` in
`inc/content.php`: A1–A2, B1, B2, C1–C2; the atlas page filters by "CEFR level"). The seven areas
are pronunciation, vocabulary, grammar, reading, writing, listening and speaking, and language
studies (linguistics, the history and varieties of English, and English–Chinese translation).
Theorem and proof blocks are shown as **Rule** and **Explanation**, and the index of numbered
statements is called "Definitions and rules".

| Level | Course | Slug | Area | Chapters |
|---|---|---|---|---|
| A1–A2 | Sounds of English | `sounds-of-english` | Pronunciation | 10 |
| A1–A2 | Core Grammar | `core-grammar` | Grammar | 12 |
| A1–A2 | Core Vocabulary | `core-vocabulary` | Vocabulary | 9 |
| A1–A2 | Everyday English | `everyday-english` | Listening & speaking | 9 |
| B1 | Tense and Aspect | `tense-and-aspect` | Grammar | 9 |
| B1 | Nouns and Articles | `nouns-and-articles` | Grammar | 9 |
| B1 | Verb Patterns | `verb-patterns` | Grammar | 9 |
| B1 | Stress, Rhythm and Intonation | `connected-speech` | Pronunciation | 10 |
| B1 | Word Formation | `word-formation` | Vocabulary | 9 |
| B1 | Reading Skills | `reading-skills` | Reading | 9 |
| B1 | Sentences and Paragraphs | `sentences-and-paragraphs` | Writing | 10 |
| B1 | Listening and Conversation | `listening-and-conversation` | Listening & speaking | 9 |
| B2 | Complex Sentences | `complex-sentences` | Grammar | 10 |
| B2 | Modality | `modality` | Grammar | 9 |
| B2 | Collocation and Register | `collocation-and-register` | Vocabulary | 9 |
| B2 | Academic Reading | `academic-reading` | Reading | 9 |
| B2 | Essay Writing | `essay-writing` | Writing | 11 |
| B2 | Presentations and Discussion | `presentations-and-discussion` | Listening & speaking | 9 |
| B2 | Pragmatics and Politeness | `pragmatics` | Listening & speaking | 9 |
| C1–C2 | Academic Writing | `academic-writing` | Writing | 10 |
| C1–C2 | Style and Rhetoric | `style-and-rhetoric` | Writing | 10 |
| C1–C2 | Reading Literature | `reading-literature` | Reading | 10 |
| C1–C2 | English Linguistics | `linguistics` | Language studies | 10 |
| C1–C2 | History of English | `history-of-english` | Language studies | 10 |
| C1–C2 | World Englishes | `world-englishes` | Language studies | 10 |
| C1–C2 | English–Chinese Translation | `translation` | Language studies | 11 |

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (readers and levels, depth targets, block
  kinds, descriptive grammar, pronunciation models, contrastive notes on Chinese, example sentences
  and copyright, notation). Every lesson is written by hand; nothing is generated from templates.
  At levels A1–A2 and B1 the Chinese version is written together with the English one, because
  beginners learn from it.
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, audio and data rules, and the plan for
  English figures such as vowel and consonant charts, minimal pairs, stress and intonation, tense
  timelines, sentence trees, an article chooser, a word builder, Zipf and coverage plots, scansion,
  the Great Vowel Shift and a map of English in the world).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (what is translated and what stays in English, example
  formats, markup rules, typography, and grammar, phonetics, linguistics and translation terms).

Engine work to do before the first lessons:

- **IPA font.** The self-hosted fonts lack most IPA symbols; self-host an OFL font such as
  Charis SIL or Gentium Plus and add markup for transcriptions.
- **Audio.** No atlas plays sound: add a shared helper for recorded files and, where suitable,
  local `speechSynthesis` voices (button-triggered, labelled as synthetic).
- **Figures of our own.** `tools/mkatlas.py` accepts only figure types from the Maths Atlas
  catalogue and rewrites `data/widgets.json`, the Lab groups and the figure strings on every run;
  it needs an atlas-local catalogue before any English figure is built.
- **Text answers.** Exercise checks are numeric; accepting text answers would let the site mark
  fill-in-the-gap exercises.
- Optionally, a dedicated block for English–Chinese contrast notes (until then
  `::: note English and Chinese`).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
node tools/shot.js "lesson.php?c=…&l=…" out.png # screenshot a page and report JavaScript errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.

The engine in this directory is a generated copy of the Maths Atlas engine: re-run
`python3 tools/mkatlas.py tools/atlas-specs/english.json` from the repository root to bring in
engine fixes (course records, this README and `tools/*.md` are never overwritten). Engine changes
belong in `/learn/maths/` or in the generator, not in the copied files here.
