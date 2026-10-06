# Medicine Atlas

A detailed, interactive course through the medical curriculum, in English and Simplified Chinese,
on the same engine as [Maths Atlas](../maths/). Plain PHP, no framework and no database.

**For education only — not medical advice.** Every page carries this notice.

**Status: curriculum skeleton.** All 27 courses and 224 chapters are defined, with chapter
summaries and prerequisites. Lessons, course overviews, outcomes, history, references, the timeline
and medicine-specific figures are still to be written; missing chapters show as "in preparation".

| Phase | Courses |
|---|---|
| 1 · Basic sciences | Cells and Biochemistry, Medical Genetics, Anatomy, Physiology, Immunology, Microbiology, Pathology, Pharmacology |
| 2 · Organ systems | Clinical Skills, Cardiovascular, Respiratory, Kidney and Urinary Tract, Gastrointestinal System and Liver, Endocrine System and Diabetes, Nervous System, Musculoskeletal System and Skin, Blood and Haematology, Epidemiology and Evidence |
| 3 · Clinical medicine | Infectious Diseases, Surgery, Emergency and Critical Care, Paediatrics, Obstetrics and Gynaecology, Psychiatry, Older People and Palliative Care |
| 4 · Population and practice | Public and Global Health, Medical Ethics and Law |

In this site the engine's `theorem` blocks are labelled **Principle**, `proof` blocks
**Explanation**, and the theorem index is **Key concepts**.

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
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.
