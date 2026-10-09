# Economics & Finance Atlas

A detailed, interactive course through university economics and finance — from supply and demand
to microeconomics and macroeconomics, econometrics and causal inference, game theory and market
design, corporate finance, asset pricing and derivatives, trade, development, and public, labour,
behavioural and environmental economics — with an English and Simplified Chinese interface, on the
same engine as [Maths Atlas](../maths/). Plain PHP, no framework and no database.

**For education only — not investment or financial advice.** Every page carries this notice.

**Status: curriculum skeleton.** All 25 courses and 220 chapters are defined, with chapter
summaries and prerequisites. Lessons, course overviews, outcomes, history, references, the
timeline, the Chinese course overlays and economics-specific figures are still to be written;
missing chapters show as "to be written". The site title says "(skeleton)" until `MA_SKELETON`
in `inc/bootstrap.php` is set to `false`.

| Year | Courses |
|---|---|
| 1 | Principles of Economics, Mathematics for Economists, Economic History |
| 2 | Microeconomics, Macroeconomics, Econometrics, Game Theory, Money and Banking, Corporate Finance |
| 3 | Economic Growth, Business Cycles and Monetary Policy, Causal Inference, Industrial Organisation, Asset Pricing, International Trade, International Finance, Development Economics, Public Economics, Labour Economics, Behavioural Economics, Environmental Economics |
| 4 | Information and Incentives, Market Design, Time Series, Derivatives |

Areas: microeconomics, macroeconomics, quantitative methods, games and markets, finance, global
economy and history, and policy and behaviour. Pathways on the map: the economics core, finance,
economic theory, policy and applied economics, and global and development economics.

Probability, statistics and linear algebra are taught in full in the Maths Atlas; Mathematics for
Economists covers the tools as economists use them and links there.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (depth targets, the education-only rule,
  neutrality, data sourcing, notation). Every lesson is written by hand — never generated.
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for economics figures such as
  supply and demand, budget lines, game solvers and game trees, auctions, Solow and IS–LM, the
  efficient frontier and option pricing).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, economics and finance
  terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list (320 warnings for the skeleton — 220 lessons, and four empty fields in each of the 25
courses).
