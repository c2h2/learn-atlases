# Medicine Atlas

A detailed, interactive course through the medical curriculum, in English and Simplified Chinese,
on the same engine as [Maths Atlas](../maths/). Plain PHP, no framework and no database.

**For education only — not medical advice.** Every page carries this notice.

**Status: being written, chapter by chapter.** The curriculum (27 courses, 224 chapters) is fixed and
complete, with chapter titles, summaries and prerequisites, and the course records and lessons are
being written to the standard in `tools/CONTENT_GUIDE.md`. A chapter with no lesson yet is not a dead
end: `lesson.php` says so plainly, offers the chapter in the other language when that exists, links
every chapter of the course that is already written, prints the full course outline with each
chapter's status, and is sent `noindex`; course pages, the atlas map and the chapter chain omit links
to unwritten chapters rather than leading a reader to an empty page. The generated placeholder text that
used to stand in for lessons has been removed from `content/` and is kept in [`pending/`](pending/)
for reference only.

| Phase | Courses |
|---|---|
| 1 · Basic sciences | Cells and Biochemistry, Medical Genetics, Anatomy, Physiology, Immunology, Microbiology, Pathology, Pharmacology |
| 2 · Organ systems | Clinical Skills, Cardiovascular, Respiratory, Kidney and Urinary Tract, Gastrointestinal System and Liver, Endocrine System and Diabetes, Nervous System, Musculoskeletal System and Skin, Blood and Haematology, Epidemiology and Evidence |
| 3 · Clinical medicine | Infectious Diseases, Surgery, Emergency and Critical Care, Paediatrics, Obstetrics and Gynaecology, Psychiatry, Older People and Palliative Care |
| 4 · Population and practice | Public and Global Health, Medical Ethics and Law |

In this site the engine's `theorem` blocks are labelled **Principle**, `proof` blocks
**Explanation**, and the theorem index is **Key concepts**.

## Progress

`php tools/check.php` is the to-do list; as of this writing it reports **0 errors** and these warnings:

| Still to write | Count |
|---|---|
| English lessons | 209 of 224 still to write (course 1 complete; course 2 *Medical Genetics* 6 of 8) |
| Chinese lessons | 215 of 224 still to translate (course 1 translated in full) |
| Course records (`overview`, `outcomes`, `history`, `references`) | 25 of 27 remaining, plus 26 Chinese overlays | 25 of 27 remaining, plus 26 Chinese overlays |

Course 1 is the reference: `php tools/check.sh cell-biochemistry` ends at **0 errors, 0 warnings**, and every
lesson of that course renders without a JavaScript or KaTeX error in either language. `php tools/audit.php`
crawls every page over HTTP and reports status codes, PHP errors, empty pages, links into unwritten
chapters and forward references; it exits non-zero if a page breaks.

Written lessons pass every depth target in `tools/CONTENT_GUIDE.md` and render with no KaTeX or figure
errors (`node tools/shot.js "lesson.php?c=…&l=…" out.png`, also with `&lang=zh`). Work through the
courses in `order` and finish a course in both languages before starting the next; chapter and course
identifiers are fixed and must not change.

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
