# Quant Trading Atlas

A detailed, interactive course in systematic trading research — how a rule is specified, measured
and criticised — with an English and Simplified Chinese interface, on the same engine as
[Maths Atlas](../maths/). Plain PHP, no framework and no database.

**For education only — not investment or trading advice.** Every page carries this notice.
Nothing here recommends a security, a fund, a broker or a strategy.

The worked cases are the fifty public examples at [quants.md](https://quants.md/)
(QuantJourney, Apache-2.0): weight strategies, order strategies and walk-forward tests.
Where a lesson quotes one of their figures, it is that project's published backtest, not a
result this atlas has re-run and not a forecast. The catalogue and the rules for quoting it
are in `tools/LIBRARY.md`.

**Status.** All 12 courses and 60 English lessons are written, to `tools/CONTENT_GUIDE.md`.
`php tools/check.php --lang=en` reports no errors and no depth warnings. Trading charts
(`equity`, `compound`, `candles`, `average`, `bands`, `barlimit`, `stop`, `folds`, `weights`,
`sharpe`, `payoff`, `spread`, `formation`) live in `assets/js/widgets/quant.js`. The Chinese
translation is not started, so the site title still says "(skeleton)" until
`MA_SKELETON` in `inc/bootstrap.php` is set to `false`.

| Year | Courses |
|---|---|
| 1 | Markets and Data, Performance and Risk |
| 2 | Statistics for Trading Research, Trend Following, Mean Reversion, Momentum |
| 3 | Portfolio Construction, Orders and Execution, Backtesting, Asset Classes |
| 4 | Validation and Overfitting, Research Practice |

Areas: markets and data, measurement, signals, portfolios, execution, research design, and
practice. Pathways on the map: the research core, signals, portfolios and orders, testing a
rule, and the open library.

Probability, statistics and linear algebra are taught in full in the Maths Atlas. This atlas
uses them and links there. Asset-pricing theory lives in the Economics and Finance Atlas.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md`.
- The fifty library cases: `tools/LIBRARY.md`.
- Figures: `tools/WIDGET_GUIDE.md`.
- Chinese, when it is started: `tools/TRANSLATION_GUIDE_ZH.md`.

```sh
php tools/check.php [course …]          # typeset, validate and report depth
bash tools/check.sh [course …]
```

`php tools/check.php` lists every missing lesson as a warning.
