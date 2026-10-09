# Medicine Atlas — content guide

Medicine Atlas (`/learn/medicine/`) teaches the medical curriculum in depth for students and
curious readers: how the body works, how disease develops, how it is recognised and treated, and
how the health of populations is protected. Every chapter is a long, self-contained lesson in the
style of a very good textbook: motivation and mechanisms first, then precise definitions, explained
principles, clinical cases, interactive figures, quick checks and graded exercises with full
answers.

**It is an educational resource, not medical advice.** Every page carries a footer saying so. The
rules in §4 keep the content consistent with that.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Read its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, for the expected depth, tone
and markup.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
```

The curriculum (27 courses, 224 chapters) follows an integrated medical curriculum in four phases:
1 basic sciences, 2 organ systems with clinical skills and epidemiology, 3 clinical medicine,
4 population health and ethics; seven areas (basic, defence, disease, systems, clinical, life,
population). **Do not rename, add, remove or reorder courses or chapters.**

## 2. course.json — what to fill in

The skeleton has `slug`, `title`, `full_title`, `area`, `level` (phase), `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete
`overview` (2–4 paragraphs), `outcomes` (6–10, starting with a verb: "Explain…", "Recognise…",
"Interpret…", "Outline the management of…"), `history` (5–10 dated events with people: Harvey,
Jenner, Semmelweis, Snow, Pasteur, Koch, Lister, Röntgen, Banting and Best, Fleming, Florey and
Chain, Franklin, Watson and Crick, Doll and Hill …; facts must be verifiable) and `references`
(4–8 standard textbooks and authoritative sources with a `note`, e.g. Guyton and Hall, Ganong,
Gray's Anatomy for Students, Moore, Alberts, Lippincott Biochemistry, Thompson & Thompson,
Janeway, Mims, Robbins, Rang and Dale, Kumar and Clark, Davidson, Harrison, the Oxford Handbooks,
Bailey and Love, Nelson, Williams Obstetrics, the Oxford Textbook of Psychiatry, Gordis,
Greenhalgh's *How to Read a Paper*, Beauchamp and Childress, WHO and national guidelines).

The timeline (`data/milestones.json`) needs about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}` from Hippocrates to genomic medicine.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words**; a student should be able to learn the topic from this page alone.
- **≥ 3 numbered blocks**: `definition` for conditions, terms and criteria; `theorem` blocks
  render as **Principle** — use them for physiological laws and general principles (Starling's
  law, Fick's law, the Frank–Starling mechanism, Virchow's triad); `proof` blocks render as
  **Explanation** — the mechanism behind a principle.
- **≥ 4 worked examples**: fictional clinical cases ("A 58-year-old man presents with…") worked
  through step by step, and quantitative examples (clearance, half-life, A–a gradient, anion gap,
  predictive values).
- **≥ 1 interactive figure**, **≥ 1 quick check**, **≥ 1 `:::warning`** (a common pitfall), one
  `:::history` block, a `:::summary`, and **≥ 8 exercises** with complete answers (about 3
  routine, 3 standard, 2+ challenging: data interpretation, a case with a differential diagnosis,
  a calculation). Add `check="…"` when the answer is a single number.

## 4. Accuracy, safety and tone

- **Education, not advice.** Explain mechanisms, presentations, investigations and the principles
  of management. Never address the reader as a patient ("you should take…"), never give
  individual treatment recommendations, and say that management follows current local guidelines.
- **Sources.** Follow established textbooks and authoritative guidelines (WHO, national bodies,
  specialist societies). Guidelines change and differ between countries: say which you follow
  and date statements that may change ("as of 2026, NICE recommends…"). Never invent figures,
  studies or quotations.
- **Medicines.** Teach drug classes, mechanisms, indications, key adverse effects and
  interactions. Do not give doses or regimens as instructions; where a number is needed for a
  pharmacology calculation, mark it as an illustrative value and say that doses come from a
  current formulary for the individual patient.
- **Sensitive topics.** For suicide and self-harm, follow safe-messaging guidance: no methods or
  lethality details, a compassionate tone, and a pointer to support services. Poisoning chapters
  cover recognition and principles of management, not toxic-dose information that could enable
  harm. Do not describe how to obtain, make or misuse drugs.
- **People and cases.** All cases are fictional. Use person-first, non-stigmatising language
  ("a person with diabetes", "a person who uses drugs"); include diversity of age, sex and
  ethnicity; describe how presentations can differ between groups (for example skin conditions on
  darker skin). No photographs of real patients; diagrams and figures only.
- **Spelling and units.** British medical spelling (anaemia, oedema, haemoglobin, paediatrics,
  oesophagus; but fetus, as in current British usage); SI units (mmol/L, kPa) with common conventional units in brackets
  where readers meet both (glucose in mg/dL, blood gases in mmHg).
- **Verification.** Check every calculation with `python3`; check facts against at least one
  standard textbook or guideline.

## 5. Markup

As in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for blocks
(`:::definition`, `:::theorem` (Principle), `:::proof` (Explanation), `:::example` +
`:::solution`, `:::exercise`, `:::quiz`, `:::warning`, `:::intuition`, `:::application`,
`:::history`, `:::summary`), references (`[[#id]]`, `[[course/chapter]]`,
`[[course/chapter#id]]`) and answer checks. Formulas (KaTeX) are welcome for physiology and
pharmacology: $Q = \dfrac{\Delta P}{R}$, $C(t) = C_0 e^{-kt}$, $t_{1/2} = \dfrac{\ln 2}{k}$.

## 6. Interactive figures

The available types are in `data/widgets.json`: function plots (dose–response,
concentration–time), slope fields, phase planes and ODE solvers (pharmacokinetic and epidemic
models), probability distributions, Bayes' rule (diagnostic tests), hypothesis tests and
confidence intervals (trials), regression, Markov chains (disease progression), Monte Carlo and
networks (contact tracing). Try each at `/learn/medicine/lab.php?w=<type>`. Medicine-specific
figures (pharmacokinetics, ECG rhythms, the oxygen–haemoglobin curve, spirometry, blood-gas
interpretation, the SIR epidemic, Kaplan–Meier curves, forest plots, growth charts, pedigrees …)
are planned in `tools/WIDGET_GUIDE.md`; use a type only once it is in the catalogue.

## 6.1 What the checker enforces, and two traps

- **Generated filler is an error.** A lesson or course field containing the skeleton's phrasing
  ("the one that the … is for", 以及者…) fails the check whatever its length; the originals live in
  `pending/` for reference only and must never be copied from.
- **Figure parameters** are validated by `tools/build.js` against `data/widgets.json`: ranges are
  `"min, max"` with a comma (`x: 0.5, 100`), lists are separated by `; ` (`hlines: 50; 150`), and
  `plot` functions must use the variable `x`. Only the 13 types in the catalogue exist — the
  medicine-specific figures in `tools/WIDGET_GUIDE.md` have not been built.
- **`check="…"` is compared numerically to 1e-6 relative.** Put exact values there; when the answer is
  meant to be rounded, write the rounding in the attribute, e.g. `check="round(61.5*log10(8/150))"`.
- Verify every calculation with `python3` before writing it into an exercise (the guide asks for this;
  it is also the easiest way to find an error before a reader does).

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/medicine
bash tools/check.sh <course> [<course> …]
```

Fix every `ERROR`; depth `warn`ings must be gone for finished lessons. Preview at
`http://f.g77k.com/learn/medicine/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`).
