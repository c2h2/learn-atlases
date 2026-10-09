# English Atlas — content guide

English Atlas (`/learn/english/`) is a course in how English works, written for learners and
especially for Chinese speakers: pronunciation, vocabulary and grammar, reading and writing from
everyday texts to academic papers, listening and speaking, and the history, varieties and
translation of English. Every chapter is a long, self-contained lesson in the style of a very good
textbook: a real question first, then clear definitions and rules with their explanations, many
examples, worked analyses, interactive figures, quick checks and graded exercises with full answers.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the markup and the level
of care expected: read it before writing, even though its subject is far from ours.

**Every lesson is written by hand to this standard.** Never generate lessons, course fields,
example sentences, exercises or milestones from templates, scripts, word lists or language models.
A chapter is either written properly or it stays "to be written" (its file does not exist): a
placeholder that looks like a lesson is worse than no lesson. Medicine Atlas shows why —
`/learn/medicine/pending/README.md` describes the generated filler that had to be taken off the
site, and `/learn/medicine/tools/check.php` now rejects its patterns. This atlas's checker does not
have those patterns yet; the rule applies all the same.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §3)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
content/zh/<course>/…              the Chinese versions (tools/TRANSLATION_GUIDE_ZH.md)
data/milestones.json               events for the timeline of English
```

The curriculum (26 courses in seven areas — pronunciation, vocabulary, grammar, reading, writing,
listening and speaking, and language studies — over four levels) is fixed in the `course.json`
files. **Do not rename, add, remove or reorder courses or chapters**, because other lessons link
to them.

## 2. Readers and levels

The four levels of the engine (`LEVELS` in `inc/content.php`) are bands of the Common European
Framework of Reference for Languages (CEFR, Council of Europe 2001; Companion Volume 2020):

| level | label | the reader … |
|---|---|---|
| 1 | A1–A2 | can handle familiar, everyday situations in simple English |
| 2 | B1 | can deal with most everyday situations and read straightforward texts |
| 3 | B2 | can follow complex texts and talk and write in detail with some fluency |
| 4 | C1–C2 | can use English flexibly for study and work, close to a highly educated user |

The right-hand column is our own short paraphrase; quote the official descriptors only with
attribution. China's Standards of English Language Ability (中国英语能力等级量表, 2018) has nine
levels; published studies relate them to the CEFR, but treat any correspondence as approximate and
cite the study if you give one.

- **Grade the English of every lesson.** Explanations are written in plain English no more than
  about one band above the course's level: at levels 1–2, short sentences, common words, one idea
  per sentence and a defined term before it is used; at levels 3–4, the English text is itself
  reading practice, so it may be as rich as the subject needs, but never obscure for its own sake.
- **Levels 1 and 2 are read mainly in Chinese.** A beginner cannot learn grammar from an English
  explanation, so for level-1 and level-2 courses the Chinese version is written together with the
  English lesson, not later; a lesson at these levels is not finished until both exist.
- Other readers — teachers, Chinese speakers far above the course's level, native speakers who want
  to understand their grammar — should find nothing to correct: plain is not the same as
  simplified into error.

## 3. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the course covers, why it matters for a learner, how it is organised, what Chinese speakers usually find hard in it and how to approach it. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Use…", "Choose…", "Pronounce…", "Recognise…", "Write…", "Explain…"), concrete enough to test. |
| `history` | 5–10 events `{"year": 1755, "title": "…", "detail": "1–2 sentences", "people": ["Samuel Johnson"]}` in chronological order, each tied to a publication or event whose date you can verify. For skills courses these are milestones in describing and teaching that part of English (a dictionary, a grammar, a pronouncing dictionary, a corpus). No invented quotations. |
| `references` | 4–8 books `{"title", "authors", "year", "note"}` that learners and teachers actually use — for example Swan (*Practical English Usage*), Murphy (*English Grammar in Use*), Carter & McCarthy (*Cambridge Grammar of English*), Biber et al. (*Longman Grammar of Spoken and Written English*), Huddleston & Pullum (*The Cambridge Grammar of the English Language* and *A Student's Introduction to English Grammar*), Quirk et al. (*A Comprehensive Grammar of the English Language*), Roach (*English Phonetics and Phonology*), Cruttenden (*Gimson's Pronunciation of English*), Wells (*Longman Pronunciation Dictionary*, *English Intonation*), Nation (*Learning Vocabulary in Another Language*), Swales & Feak (*Academic Writing for Graduate Students*), Williams & Bizup (*Style*), Baugh & Cable (*A History of the English Language*), Crystal (*The Cambridge Encyclopedia of the English Language*), Jenkins (*Global Englishes*), Levinson (*Pragmatics*), Baker (*In Other Words*), 章振邦《新编英语语法教程》, 连淑能《英汉对比研究》. Give the year of the edition you cite; `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`, only earlier chapters or chapters of
prerequisite courses). Keep titles plain text, except italics for cited English words
(`*Be* and *have*`); no `$…$`.

The timeline (`data/milestones.json`) holds about 30 milestones `{"year", "title", "detail",
"people", "area"}`, `area` being one of the seven area keys (`sounds`, `words`, `grammar`,
`reading`, `writing`, `speaking`, `language`). Typical anchors, each to be checked against a
standard history (Baugh & Cable; *The Cambridge History of the English Language*) before use: the
Anglo-Saxon settlements (5th century), the Norman Conquest (1066), Chaucer's *Canterbury Tales*
(c. 1387–1400), Caxton's press at Westminster (1476), the King James Bible (1611), Johnson's
*Dictionary* (1755), Lowth's *Short Introduction to English Grammar* (1762), Webster's *American
Dictionary* (1828), the founding of the International Phonetic Association (1886), the first
fascicle of the *Oxford English Dictionary* (1884) and its completion (1928), Jones's *English
Pronouncing Dictionary* (1917), West's *General Service List* (1953), Quirk et al.'s *Comprehensive
Grammar* (1985), the *COBUILD* dictionary (1987) and the CEFR (2001).

## 4. Depth targets for every lesson (checked by tools/check.php)

- **2,500–4,500 words** at levels 1–2 and **3,000–5,500** at levels 3–4 (example sentences and
  dialogues count; `tools/check.php` warns below 2,500). At the lower levels the length comes from
  examples, dialogues and practice, not from long paragraphs of explanation.
- **Definitions and rules** as numbered blocks (≥ 3 in total).
- **≥ 4 worked examples** (`:::example` with a `:::solution`): an analysis carried out step by step
  — choosing the tense in a short text and saying why, marking the stress in a phrase, finding the
  clause elements of a sentence, correcting a paragraph, paraphrasing a sentence. Lists of example
  sentences are ordinary text, not `example` blocks.
- **≥ 1 interactive figure** (see §8), **≥ 1 quick check** (`:::quiz`; 3–5 is better, because
  apart from numeric answers quizzes are the only answers the site marks), **≥ 1 `:::warning`** (a common
  mistake), one `:::history` block, and a `:::summary` ("Key takeaways", 5–8 bullets) just before
  the exercises.
- **`## Exercises` with ≥ 8 exercises**: about 3 routine (`level=1`), 3 standard (`level=2`) and
  2+ challenging (`level=3`: a rewriting task, a short text to analyse or correct, a piece of
  writing or a spoken task). **Every exercise has a complete `:::solution`** listing all acceptable
  answers; add a `:::hint` for harder ones.

Suggested shape (adapt to the topic):

```
(intro paragraphs, no heading: a real situation or puzzle, e.g. why "I've lost my keys" but "I lost my keys yesterday")
## Form                    how the structure is built (tables of forms, spelling, pronunciation)
## Meaning and use         definitions and rules with explanations, examples, quick checks
## <contrast>              how it differs from its neighbours (present perfect vs past simple …)
::: note English and Chinese    what changes for a Chinese speaker, and why
## Common mistakes         optional if :::warning blocks are not enough
## Where this leads        later chapters and courses that build on this one (with links)
:::summary
## Exercises
```

### Kinds of block in this atlas

The engine's block kinds are those of Maths Atlas, two of them relabelled for this atlas:

| kind | shown as | use |
|---|---|---|
| `definition` | Definition | terms: *aspect*, *countable noun*, *minimal pair*, *collocation*. Ids `def-…`. |
| `theorem` | **Rule** | rules of form and use, stated with their scope ("In formal writing…", "In British English…"). A tendency is stated as a tendency ("usually", "in most registers"), with the evidence. Ids `rule-…`. |
| `proof` | **Explanation** | why the rule holds — meaning, history, frequency — and where it stops holding. The ∎ end mark is added automatically. |
| `example` + `solution` | Example | a worked analysis (see §4). Ids `ex-…`. |
| `exercise` | Exercise | `level=1`, `level=2` or `level=3`; solutions and hints are collapsed. |
| `quiz` | Quick check | multiple choice, marked by the site: options `- [x]` (correct) and `- [ ]`, then a `solution`. |
| `warning` | Common mistake | a typical error and why it is wrong, with ✗ and ✓ forms. |
| `note` | Note | with the title **English and Chinese** (`::: note English and Chinese`) for contrastive notes; other notes as needed. |
| `intuition`, `remark`, `application` | Intuition, Remark, Application | the idea behind a rule in plain words; asides; real uses (emails, interviews, seminars). |
| `history`, `summary` | Historical note, Key takeaways | once per lesson each. |

The "Definitions and rules" page lists `definition` and `theorem` blocks only. **Do not use
`lemma`, `proposition`, `corollary`, `axiom` or `algorithm`**: they keep their mathematical names
and are not listed. Write a procedure (choosing an article, checking a paragraph) as a numbered
list inside a rule or a note.

`check="…"` on an exercise is compared **numerically** with the reader's answer, so it fits only
answers that are one number (the number of syllables, morphemes or clauses). Text answers cannot be
checked by the site yet; give them in full in the `:::solution` (or a short `:::answer`), with every
acceptable variant. Questions that have one right choice among a few belong in a `:::quiz`.

## 5. Accuracy, sources and fairness

- **Describe English as it is used.** Follow the major reference grammars — Quirk et al. (1985),
  Biber et al. (1999), Huddleston & Pullum (2002), Carter & McCarthy (2006), Swan (*Practical
  English Usage*, 4th ed., 2016) — and learner's dictionaries (Oxford, Cambridge, Longman,
  Collins COBUILD, Merriam-Webster). Check every rule in at least two of them.
- **No zombie rules.** "Never split an infinitive", "never end a sentence with a preposition" and
  "never begin a sentence with *And* or *But*" are not rules of English. Where readers have met them,
  say what they are — style preferences or features of a register — and show what careful writers
  actually do. Singular *they* (*Someone left their umbrella*) is standard English.
- **Mark variety and register.** Say when usage differs between British and American English
  (*have got* / *have*, *at the weekend* / *on the weekend*, *in hospital* / *in the hospital*) and
  between registers (formal, informal, spoken, written, academic). The site writes British spelling
  in its own text; lessons teach both varieties and never call either wrong.
- **Pronunciation models.** Teach two reference accents, General British (GB — the name
  Cruttenden's *Gimson's Pronunciation of English* uses for the modern successor of RP) and
  General American (GA), and give both wherever they differ. Use one transcription system
  throughout — that of the *Longman Pronunciation Dictionary* (Wells) — and set it out once, with
  keywords, in the first chapters of *Sounds of English*; Wells's lexical sets (KIT, DRESS, TRAP …)
  name vowels across accents. No accent is "correct": the aim is to be understood easily, not to
  imitate one speaker. Readers may have learned other symbol sets (the "DJ" and "KK" notations of
  Chinese classrooms): give a correspondence table once and then use ours. **Pinyin letters are
  not IPA**: Pinyin *b, d, g* are voiceless unaspirated stops, *x, q, j* are sounds English does not
  have, and *r* is not the English /r/.
- **Contrastive notes are accurate about Chinese.** The usual points of difficulty — no articles;
  no inflection for tense or number; aspect marked by 了, 过, 着 and 在 rather than by verb forms;
  modifiers (including relative clauses) placed before the noun; topic–comment sentences; spoken
  *tā* for *he*, *she* and *it*; syllables that end only in *-n*, *-ng* (or *-r*); stops that
  contrast in aspiration rather than voicing; sounds such as /θ/, /ð/, /v/ and /ʒ/; lexical tone
  instead of English stress and intonation — affect learners differently. Chinese speakers have
  different first languages and dialects (Cantonese, Wu, Min, Hakka, many Mandarin varieties), so
  say which speakers a difficulty concerns (n/l confusion, for example, is regional). Check claims
  about Chinese against a reference grammar (Li & Thompson, *Mandarin Chinese: A Functional
  Reference Grammar*; 朱德熙《语法讲义》). Describe Chinglish (中式英语) neutrally, as the
  understandable result of transfer, never as a joke.
- **Varieties of English.** World Englishes, Englishes used as a lingua franca, and non-standard
  dialects are systematic varieties, not mistakes. Explain what "standard" means and when it is
  expected (exams, formal writing); never mock an accent or a group of speakers.
- **Claims about frequency and learning carry their evidence.** Name the corpus or study and give
  the exact figure: Nation (2006) on how many word families are needed for reading and listening,
  Laufer (1989) and Hu & Nation (2000) on vocabulary coverage, Ebbinghaus (1885) on forgetting,
  Cepeda et al. (2006) on spacing. No "fluent in 30 days" promises, no claims that one method
  suits everyone, and no promotion of products, apps, courses or schools.
- **Exams.** The atlas teaches English, not exam technique. Exams (CET-4/6, IELTS, TOEFL, the
  gaokao, kaoyan English) may be described in general terms, dated ("as of 2026"), because formats
  change; never reproduce their papers or tasks, and never promise scores.

## 6. Example sentences, texts and copyright

- **Write the examples yourself.** They should sound natural — something a real person would say
  or write — and be as short as the point allows. People in examples are fictional, with names
  from many cultures, Chinese names among them (written family name first: *Li Wei*, *Wang Fang*,
  which is itself worth a note on English name order). No real private individuals, no stereotypes
  (of nationality, gender, age, religion or occupation), no political or religious messages, no
  product placement, and nothing that would embarrass a reader using the lesson in class. Taboo
  words appear only where register or swearing is the topic, and as little as possible.
- **Never copy** textbook dialogues or texts, exam papers (CET, IELTS, TOEFL, gaokao, kaoyan),
  song lyrics, film or TV scripts, news articles, or proprietary word lists (Oxford 3000/5000, the
  English Vocabulary Profile, lists derived from COCA). Openly licensed lists are cited and used to
  inform the choice of words, not embedded wholesale: many (the New General Service List, for
  example) use a Creative Commons ShareAlike licence, which does not fit the repository's CC0.
- **Quotation** of copyright texts is limited to a sentence or two, attributed, and only when that
  text itself is being discussed.
- **Longer passages only from the public domain**: the author died more than 70 years ago (before
  1956) *and* the work was first published before 1931 — check both, because the two rules differ
  between countries. Modern editions can add their own copyright (notes, modernised spelling), so
  take the text from an early edition or a plain transcription. A translation has its own
  copyright: a public-domain original in a modern translation is not public domain.
- **Model texts** (emails, essays, abstracts, dialogues for listening) are written for the atlas.
  Never present a text you wrote as authentic, and never present machine output as a model.

## 7. Markup and notation

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
headings, lists, tables, blocks, references (`[[#id]]`, `[[course/chapter]]`,
`[[course/chapter#id]]`) and attributes. A reference renders its own label ("Rule 3.2"), so write
`[[#rule-present-perfect]]`, never "Rule [[#rule-present-perfect]]" (the checker flags the
duplicated label). Links to other atlases are plain
Markdown links (`[Maths Atlas](/learn/maths/)`): `[[…]]` only works inside one atlas.

Conventions of this atlas:

- **Cited words and example sentences in italics**, in running text and in lists: the word *run*,
  the sentence *She has lived here since 2019.* (The Chinese checker skips italics, so the Chinese
  version can keep the same examples.) Italics need a non-letter on each side: write *walked* or
  *walk* + *-ed*, not \*walk\*ed.
- **Meanings in single curly quotes**: *bank* ‘the side of a river’.
- **Unacceptable forms**: ✗ before the sentence, the acceptable form with ✓, a doubtful one with
  ?: ✗ *He go to school by bus.* ✓ *He goes to school by bus.* Never mark them with a bare asterisk
  as linguists do — here an asterisk starts italics; explain that convention in words in
  *English Linguistics*.
- **Transcriptions**: phonemic /təˈmɑːtəʊ/ (GB), /təˈmeɪtoʊ/ (GA) between slashes, phonetic detail
  [tʰ] in square brackets, primary and secondary stress ˈ ˌ, length ː. In running text a stress
  pattern can be shown as Oo, oO, oOo (O = stressed syllable). Intonation: ↘ and ↗ before the
  nucleus, with the nucleus in bold: *I ↘**told** you.*
- **Labels**: S, V, O, C, A for clause elements; NP, VP, PP, AdjP, AdvP for phrases; GB/GA and
  BrE/AmE for varieties.
- **Dialogues**: one line per turn, speaker in bold: `**Li Wei:** *Is this seat free?*`
- **Dollar signs start formulas.** An example such as *It costs \$5.* must be written with `\$`.
  Other currency symbols (£, €, ¥) need no escape. Formulas are rarely needed in this atlas
  (Zipf's law, readability formulas); when they are, use `$…$` as in Maths Atlas.
- **Avoid** braces `{…}` at the end of a heading or block line (they are read as attributes) and
  the pattern `[text](http…)` unless you mean a link.

## 8. Interactive figures

The available types are in `data/widgets.json`; try each at `/learn/english/lab.php?w=<type>`:

- `plot` — curves with sliders: forgetting and spacing models, Zipf's law (plot the logarithms:
  the type has no log axes), coverage curves from a formula.
- `fourier` — a periodic wave built from harmonics, as in a voiced sound (illustrative: it is not a
  recording of speech).
- `distribution` — word-length and sentence-length models compared with counts from a cited text.
- `markov` — next-word prediction from a small hand-made transition table, as in Shannon's (1948)
  approximations to English.
- `graph` — trees and networks: language families, word families, simple sentence trees,
  argument structure (directed edges).
- `venn` — meaning relations (hyponymy, overlap of near-synonyms) and quantifiers.
- `truthtable` — the logic of *and*, *or*, *not*, *if … then* and *unless*, inclusive and exclusive
  *or*, contrapositives in academic argument.

Use a kept type only when it genuinely serves the lesson. English figures (vowel and consonant
charts, minimal pairs, stress and intonation, tense timelines, sentence trees, the article chooser,
the word builder, Zipf and coverage plots of pasted text, scansion, the Great Vowel Shift, a map of
English in the world …) are planned in `tools/WIDGET_GUIDE.md`; use a type only once it is in the
catalogue. A lesson whose figure does not exist yet is not finished: write it, leave the checker's
warning, and say in your report which figure it needs.

## 9. Engine work before the first lessons

- **IPA font.** The self-hosted Archivo and JetBrains Mono subsets lack most IPA symbols (of
  ʃ θ ð ŋ ʒ ɪ ʊ ɔ ɑ æ ʌ ɜ ː ˈ ˌ ɒ ɡ ɹ ʔ ɾ ɐ, Archivo has only ð, æ, ə and ŋ), so transcriptions fall
  back to whatever system font the reader has and look uneven. Self-host an IPA-capable font under
  the SIL Open Font Licence (Charis SIL or Gentium Plus, subset to the symbols used) and add markup
  for transcriptions that selects it.
- **Audio.** No atlas plays sound yet. Options: the browser's `speechSynthesis` (no files to host,
  but voices differ between devices and may be missing, and some are online services that would
  send text off the site — use only voices with `localService`), or recorded or generated audio
  files under a licence that allows redistribution. Never autoplay; label synthetic speech as
  synthetic. Until audio exists, pronunciation lessons describe sounds in words, diagrams and
  transcriptions.
- **Text answers.** `check="…"` accepts only numbers; a list of accepted text answers (normalised
  for case, spaces and apostrophes) would let the site mark fill-in-the-gap exercises.
- **Possibly a dedicated block** for English–Chinese contrast notes, so they can be styled and
  counted; until then use `::: note English and Chinese`.

## 10. Check your work

```
cd /var/www/f.g77k.com/learn/english
bash tools/check.sh <course> [<course> …]
```

This validates figures, references and structure and prints a depth table per lesson. Fix every
`ERROR`; depth `warn`ings must be gone for finished lessons (except a missing figure that does not
exist yet, see §8). Preview at
`http://f.g77k.com/learn/english/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`).
Read your rendered lesson at least once, in both languages at levels 1–2.
