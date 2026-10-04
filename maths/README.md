# Maths Atlas

A detailed, interactive course through university mathematics, in English and Simplified Chinese.
Plain PHP, no framework and no database.

- **18 courses, 141 chapters** in four years of study: logic and proof, calculus I–II, linear algebra,
  discrete maths, multivariable calculus, probability, statistics, ODEs, real analysis, complex
  analysis, abstract algebra, number theory, numerical analysis, PDEs, topology, differential
  geometry and measure theory.
- Each chapter is a long, self-contained lesson. Across the site there are about 540 000 words, 1 500 numbered
  definitions and theorems, 1 000 proofs, 800 worked examples, 1 400 exercises with full solutions,
  350 quick checks and 410 interactive figures (58 figure types).
- Every lesson is also translated into Simplified Chinese (`?lang=zh`), with the interface,
  figures, course pages, timeline and catalogue.

## Pages

| Page | What it shows |
|---|---|
| `index.php` | The atlas: every course as a chain of chapters, grouped by area and year |
| `course.php?c=<course>` | Course overview, outcomes, chapters, history and recommended books |
| `lesson.php?c=<course>&l=<chapter>` | A lesson: definitions, theorems and proofs, examples, figures, quick checks, exercises |
| `map.php` | Dependencies between all chapters |
| `theorems.php` | Every definition and theorem, searchable |
| `practice.php` | Every exercise, filterable by course and level, with answer checking |
| `timeline.php` | Milestones in the history of mathematics |
| `lab.php` | Every interactive figure, with editable settings |
| `about.php` | How to use the atlas |

## Layout

```
content/en/<course>/course.json      course record (chapters, outcomes, history, references)
content/en/<course>/<chapter>.md     lesson, in the markup described in tools/CONTENT_GUIDE.md
content/zh/<course>/…                Chinese overlay of course.json and full Chinese lessons
data/widgets.json                    catalogue of figure types: the contract between lessons and figures
data/macros.json, data/milestones.json
inc/                                 renderer (markdown.php), content index, i18n, page chrome
inc/lang/zh.php, zh-figures.php      Chinese interface strings (pages, figures)
assets/js/                           core.js (MA namespace), expr.js (expression language), plot.js (SVG plots, controls)
assets/js/widgets/*.js               the figure types, one file per group
assets/vendor/                       KaTeX, D3 (self-hosted, no CDN)
tools/                               build, checks and authoring guides
```

## Running it

Any PHP 8.1+ server works; formulas are pre-rendered when the build has run and are rendered in the
browser otherwise. Caches go to `data/cache/`, which must be writable by the web server.

```sh
php -S localhost:8000 -t ..    # then open http://localhost:8000/maths/
```

## Building and checking

```sh
tools/build.sh                         # typeset every formula with KaTeX (node), check, warm all page caches
tools/check.sh [--lang=en|zh] [course …]   # KaTeX, figures, structure and depth checks for some courses
php tools/i18n_keys.php --missing      # interface strings without a Chinese translation
```

`tools/check.php` reports broken markup, unresolved references, exercises without solutions,
Chinese lessons whose numbered blocks differ from the English, malformed course overlays and
Chinese lines that still look like English. It also reports lessons below the depth targets.

Browser checks use puppeteer-core outside the repository
(`npm install --prefix ~/.cache/maths-tools puppeteer-core`, or set `MATHS_TOOLS`) and a Chromium
binary (`CHROME`, default: Playwright's headless shell). `MATHS_BASE` sets the site URL.

```sh
node tools/labcheck.js [type …] [--lessons] [--zh] [--dark]   # load figures and report errors
node tools/shot.js "lesson.php?c=pde&l=heat-equation" out.png [--dark] [--width=390]
```

## Writing

- Lessons: `tools/CONTENT_GUIDE.md` (structure, depth targets, markup, references, figures).
- Figures: `tools/WIDGET_GUIDE.md` (the figure API and conventions); `lab.php?w=<type>` shows each type.
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup that must stay identical, typography, terminology).
  Interface strings go through `t('…')` in PHP and `MA.t('…')` in JavaScript; `MA.t('Next@@step')`
  is a second sense of the same English word with its own translation.
