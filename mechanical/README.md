# Mechanical & Aerospace Atlas

A detailed, interactive course through university mechanical and aerospace engineering — statics
and dynamics, solid mechanics, thermofluids, materials and manufacturing, design, control and
robotics, and aerospace — in English and Simplified Chinese, on the same engine as
[Maths Atlas](../maths/). Plain PHP, no framework and no database.

**Status: curriculum skeleton.** All 24 courses and 215 chapters are defined, with taglines,
summaries, chapter summaries and prerequisites. Lessons, course overviews, outcomes, history,
references, the timeline, the Chinese course overlays and mechanical and aerospace figures are
still to be written; missing chapters show as "to be written", and the site title says
"skeleton" until `MA_SKELETON` in `inc/bootstrap.php` is set to `false`.

| Year | Courses |
|---|---|
| 1 | Statics, Dynamics, Engineering Graphics, Materials Science |
| 2 | Mechanics of Materials, Thermodynamics, Fluid Mechanics, Mechanisms, Manufacturing, Design Process |
| 3 | Heat Transfer, Vibrations, Machine Design, Solid Mechanics, Control Systems, Mechatronics, Aerodynamics, Propulsion, Flight Mechanics |
| 4 | Finite Element Method, Computational Fluid Dynamics, Energy Systems, Orbital Mechanics, Robotics |

Areas: solid mechanics, dynamics and vibration, thermofluids, materials and manufacturing, design,
control and robotics, and aerospace. Circuits and electronics are taught in the
[Electrical Engineering Atlas](../ee/) and the mathematics in [Maths Atlas](../maths/); lessons
link there instead of repeating them.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (depth targets, units and notation, accuracy
  and safety rules; every lesson is written by hand).
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, what the 22 catalogued types already cover,
  and the plan for mechanical and aerospace figures such as free-body diagrams, a truss solver,
  beam diagrams, Mohr's circle, linkages, thermodynamic cycles and airfoil pressure distributions).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, mathematical and engineering
  terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.
