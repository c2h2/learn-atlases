# Chemistry Atlas

A detailed, interactive course through university chemistry — general and physical chemistry,
inorganic and organic chemistry, analytical chemistry and spectroscopy, biochemistry and medicinal
chemistry, materials, polymers and the environment — in English and Simplified Chinese, on the same
engine as [Maths Atlas](../maths/). Plain PHP, no framework and no database.

**Status: curriculum skeleton.** All 24 courses and 211 chapters are defined, with taglines,
summaries, chapter summaries and prerequisites. Lessons, course overviews, outcomes, history,
references, the timeline, the Chinese course overlays and chemistry-specific figures are still to be
written; missing chapters show as "to be written". While `MA_SKELETON` is `true` in
`inc/bootstrap.php` the site calls itself "Chemistry Atlas (skeleton)"; switch it off once the
lessons are written.

| Year | Courses |
|---|---|
| 1 | General Chemistry I, General Chemistry II, Chemical Bonding, Laboratory Methods |
| 2 | Chemical Thermodynamics, Chemical Kinetics, Quantum Chemistry, Organic Chemistry I, Organic Chemistry II, Main-Group Chemistry, Analytical Chemistry, Biochemistry |
| 3 | Spectroscopy, Coordination Chemistry, Organometallics and Catalysis, Organic Synthesis, Electrochemistry, Statistical Thermodynamics, Materials Chemistry, Polymer Chemistry, Environmental Chemistry |
| 4 | Computational Chemistry, Medicinal Chemistry, Green and Industrial Chemistry |

Areas: general chemistry, physical chemistry, inorganic chemistry, organic chemistry, analytical
chemistry and spectroscopy, the chemistry of life, and materials, environment and industry.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (depth targets, accuracy and safety rules,
  chemical notation). Every lesson is written by hand; nothing is generated from templates.
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for chemistry figures such as a
  3D molecule viewer, VSEPR shapes, orbitals and MO diagrams, titration curves, reaction profiles,
  kinetics, phase diagrams, spectra and crystal lattices).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, mathematics and chemistry
  terminology).

Engine work to do before the first lessons: add KaTeX's mhchem extension for `\ce{…}` chemical
equations (vendored, loaded by `tools/build.js` and by the browser fallback), and optionally relabel
theorem/proof blocks for chemistry (for example "Law" and "Derivation"), as Medicine Atlas does.

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.
