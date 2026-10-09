# Medicine Atlas

A detailed, interactive course through the medical curriculum, in English and Simplified Chinese,
on the same engine as [Maths Atlas](../maths/). Plain PHP, no framework and no database.

**For education only — not medical advice.** Every page carries this notice.

**Status: written.** All 27 courses and 224 chapters have their lessons and course records in
English and Simplified Chinese, written to the standard in `tools/CONTENT_GUIDE.md`. Should a
chapter ever lack a lesson, it is not a dead end: `lesson.php` says so plainly, offers the chapter
in the other language when that exists, links every chapter of the course that is already written,
prints the full course outline with each chapter's status, and is sent `noindex`; course pages, the
atlas map and the chapter chain omit links to unwritten chapters rather than leading a reader to an
empty page. The generated placeholder text that used to stand in for lessons has been removed from
`content/` and is kept in [`pending/`](pending/) for reference only.

| Phase | Courses |
|---|---|
| 1 · Basic sciences | Cells and Biochemistry, Medical Genetics, Anatomy, Physiology, Immunology, Microbiology, Pathology, Pharmacology |
| 2 · Organ systems | Clinical Skills, Cardiovascular, Respiratory, Kidney and Urinary Tract, Gastrointestinal System and Liver, Endocrine System and Diabetes, Nervous System, Musculoskeletal System and Skin, Blood and Haematology, Epidemiology and Evidence |
| 3 · Clinical medicine | Infectious Diseases, Surgery, Emergency and Critical Care, Paediatrics, Obstetrics and Gynaecology, Psychiatry, Older People and Palliative Care |
| 4 · Population and practice | Public and Global Health, Medical Ethics and Law |

In this site the engine's `theorem` blocks are labelled **Principle**, `proof` blocks
**Explanation**, and the theorem index is **Key concepts**.

## Progress

As of 2026-10-09 `php tools/check.php` reports **0 errors, 0 warnings** in both languages. All 224
lessons are written and translated, and every course record and Chinese overlay is complete. Together
the lessons hold 907 worked examples, 224 interactive figures and 1 808 exercises with solutions.
`php tools/audit.php` crawls every page over HTTP and reports status codes, PHP errors, empty pages,
links into unwritten chapters and forward references; it exits non-zero if a page breaks. On
2026-10-09 it found no broken page, and every lesson was present in both languages.

Every lesson passes the depth targets in `tools/CONTENT_GUIDE.md`. Check a revised lesson with
`bash tools/check.sh <course>` and look at it rendered (`node tools/shot.js "lesson.php?c=…&l=…"
out.png`, also with `&lang=zh`). Revise the Chinese translation together with the English, and never
change chapter or course identifiers.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` — depth targets, and the rules on sources,
  medicines, sensitive topics and language that keep the site educational.
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for figures such as
  pharmacokinetics, ECG rhythms, diagnostic tests and epidemic models).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography and medical terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
php tools/audit.php [--lang=zh] [--course=…]    # crawl every page: status, PHP errors, dead links
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list. It reports as an **error** any lesson or course field that still contains the generated
filler described in [`pending/`](pending/), so a page is either written by hand or visibly "in
preparation" — never machine filler.

## Chinese lessons

`content/zh/**` mirrors `content/en/**`: a Chinese lesson per English lesson, plus a
`course.json` overlay per course holding only the translated fields (title, full_title,
tagline, summary, overview, outcomes, chapters, history, references). The engine picks
`content/zh/...` when the page language is Chinese and falls back to English otherwise, so an
untranslated lesson reads as English rather than as nothing.

Chinese is **translated by hand**, one lesson at a time, following
[`tools/TRANSLATION_GUIDE_ZH.md`](tools/TRANSLATION_GUIDE_ZH.md): same headings, same numbered
blocks and anchors, same formulas, same figure settings — `tools/check.php` compares the Chinese
lesson with the English block by block and errors on any difference. The frame-transfer generators
that produced the first corpus are retired and kept in `pending/tools/`; they cannot write medicine.

```sh
bash tools/check.sh --lang=zh <course>   # structure parity, figures, leftover English
```
