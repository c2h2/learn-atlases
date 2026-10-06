# EE Atlas

A detailed, interactive course through university electrical and electronic engineering, in
English and Simplified Chinese, on the same engine as [Maths Atlas](../maths/). Plain PHP, no
framework and no database.

**Status: curriculum skeleton.** All 22 courses and 182 chapters are defined, with chapter
summaries and prerequisites. Lessons, course overviews, outcomes, history, references, the
timeline and EE-specific figures are still to be written; missing chapters show as "in preparation".

| Year | Courses |
|---|---|
| 1 | Circuit Analysis I, Digital Logic, Circuit Analysis II |
| 2 | Signals and Systems, Electromagnetics, Semiconductor Devices, Electronics I, Computer Architecture |
| 3 | Electronics II, Digital Integrated Circuits, Embedded Systems, Instrumentation and Measurement, Control Systems, Random Signals and Noise, Communication Systems, Digital Signal Processing, Electric Machines, Power Electronics |
| 4 | Information Theory and Coding, Power Systems, RF and Microwave Engineering, Optoelectronics and Photonics |

Areas: circuits, electronics and devices, digital and computer systems, signals and
communications, electromagnetics and photonics, power and energy, control and instrumentation.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (structure, depth targets, markup, notation).
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for EE figure types such as
  schematics, Bode plots and the Smith chart); `lab.php?w=<type>` shows each type.
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, mathematics and EE terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning, so its output is
the to-do list.
