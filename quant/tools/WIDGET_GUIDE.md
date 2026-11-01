# Quant Trading Atlas — interactive figures

Figures are the Maths Atlas widgets listed in `data/widgets.json`. The economics guide
`../economics/tools/WIDGET_GUIDE.md` documents the factory, `MA.Plot` and `MA.cfg`. Use a type
only if it is in this atlas's catalogue.

Useful mappings for these lessons:

| type | use |
|---|---|
| `plot` | a gross-return path, two moving averages written as functions of a toy price, a band around a mean |
| `sequence` | compounding, $\(1+R)^n$ |
| `distribution` | a normal or lognormal model of a simple return |
| `regression` | a later return against a lagged signal, points the reader can drag |
| `hypothesis`, `confidence` | tests and intervals for a mean excess return |
| `montecarlo`, `lln`, `clt` | sampling noise in a short track record |
| `markov` | a two-regime calm/stress sketch |
| `newton` | a numerical solve, for example a volatility scale |
| `rowreduce` | a small constraint system for weights |

Do not invent a widget type. A caption must tell the reader what to change and what to notice.
Every figure is a toy or a sampling diagram. It is not a price forecast.

Trading charts live in `assets/js/widgets/quant.js` and `data/widgets-local.json`. A refresh with
`tools/mkatlas.py` merges that file into `data/widgets.json`. The types are `equity`, `compound`,
`candles`, `average`, `bands`, `barlimit`, `stop`, `folds`, `weights`, `sharpe`, `payoff`, `spread`
and `formation`.

Use the chapter’s own numbers. `equity` preset `a` is Path A and preset `compare` is orders C and D
from the drawdown proof. `payoff` mode `patha` uses the printed six-decimal simple returns, and the
compound return it shows is the price path’s \(110/100 - 1\). `sharpe` annualises only when the
reader turns on \(\sqrt{252}\), and it multiplies the standard error by the same factor. `folds`
counts windows with \(\lfloor(T-L-H)/S\rfloor+1\). `barlimit` fills only when the limit lies in the bar.
`stop` follows the gap convention in the orders chapter. `weights` assumes zero correlation when it
splits variance. None of these figures fetches a price or recommends a trade.
