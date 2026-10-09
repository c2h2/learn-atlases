# EE Atlas

A detailed, interactive course through university electrical and electronic engineering, in
English and Simplified Chinese, on the same engine as [Maths Atlas](../maths/). Plain PHP, no
framework and no database.

**Status: being written.** All 22 courses and 182 chapters are defined, with chapter summaries and
prerequisites. Circuit Analysis I is written (its nine lessons and course record), and so are the
course record and first two lessons of Circuit Analysis II. The other lessons and course records,
the Chinese lessons, the timeline and the EE-specific figures are still to be written; missing
chapters show as "in preparation". Generated placeholder text that stood in for most lessons until
2026-10-09 is kept in [`pending/`](pending/) for reference only.

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
the to-do list. It reports as an **error** any lesson or course field that contains generated filler
like the text in [`pending/`](pending/), so a page is either written by hand or visibly "in
preparation".
