Michael Faraday began a diary in 1813, as a twenty-two-year-old bookbinder's apprentice with a few months of lectures behind him, and he did not stop writing in it for forty years. Its pages run from naked-eye observations of a candle flame to the most delicate electromagnetic measurements ever made by hand, and they are governed by a single working resolution: *nothing is too small a thing to be observed well* — and nothing observed well may be left unrecorded. The habit was not sentimentality. Because of the diary we can date the induction ring experiments to the autumn of 1831 almost to the hour, and a century of physicists could repeat them from the entries alone. **A result that is not recorded is a result that never happened** — not to a patent examiner, not to a reviewer, not to your own memory on the grey morning after the demonstration. After the balance, the notebook is the chemist's most valuable instrument, and this chapter is about the three things you do with it: keep the record, lay the numbers out in tables and graphs that tell the truth, and extract from a scatter of points the straight line — with its slope, its intercept and their uncertainties — that turns a bench calibration into a physical constant.

The arithmetic of uncertainty was built in [[laboratory-methods/measurement-uncertainty]]: every reading is an interval, independent errors combine in quadrature, and the uncertainty, not the calculator, fixes the last significant digit. Here that machinery is spent on the largest single data set of the experimental laboratory — a calibration, a dozen points that must be collapsed into one line. The route runs from the notebook to the table, the table to the graph, the graph to the least-squares fit, and the fit to the honest reading of what it does and does not say. Legendre and Gauss, who appear at the end of this chapter, would recognise every step; Faraday, who filled thousands of pages with exactly these things, would not need to be convinced of the first one.

## The laboratory notebook

::: definition The laboratory notebook {#def-notebook}
A **laboratory notebook** is the bound, page-numbered, permanent-ink record of everything done and observed at the bench, written as it happens. It is a **primary legal record**, not a memory aid: it establishes who did what, when, and knowing what. Its rules follow from that status. (i) Bound and consecutively numbered pages — no loose sheets, no spiral pads that can be torn out. (ii) Permanent ink, never pencil. (iii) Every session dated and titled at the top of the first new page, and signed at the end. (iv) Raw readings written into the notebook *as they happen, at the instrument* — never on a hand, a tissue or a phone screen for "transcribing later". (v) A mistake is struck through with a single line so that it remains legible, initialled and dated, with the reason if it is not obvious; it is never erased, scraped out or obliterated with correction fluid. (vi) Nothing is back-dated and no session is rewritten after the fact — a later correction is a new, dated entry.
:::

Why such theatre over a notebook? Because the same document serves four readers with four different suspicions. Your future self needs the version-number of the buffer and the fact that the fourth distillation was the one that worked. A colleague repeating the work needs the deviations from the manual, because the manual is always idealised. A patent examiner needs a dated, witnessed chain showing the idea was yours first. And a misconduct inquiry — an eventuality no honest chemist plans for but every honest chemist survives easily — needs the record to have been untouchable: which is exactly what struck-through mistakes in permanent ink on numbered pages provide. The tissue with the titres on it is not a measurement held loosely; it is a rumour. The reading that "went wrong" and was erased is the reading that will be quoted back, years later, against everything you published around its absence.

::: algorithm A standard notebook entry {#alg-notebook-entry}
1. **Header.** Date, your name, a one-line session title.
2. **Aim.** One or two sentences: what is being determined or prepared, and to what end.
3. **Reagent and apparatus table.** Every chemical with the amount actually taken (mass or volume, with concentration where relevant) and its hazard category or GHS pictograms; a pointer to the written risk assessment. Record what you actually used, including the batch or supplier where the work is sensitive to it.
4. **Procedure.** Cite the manual or published procedure by page, then record **deviations only** — scale changed, a different drying agent, the room that was cold, the temperature you actually held rather than the one you aimed at.
5. **Raw data.** Tables of readings as displayed by the instruments — final and initial burette readings, not "titre"; displayed mass, not "yield". Label every column with quantity and unit.
6. **Observations.** Colours, precipitates, crystallisation, odours (wafted, never inhaled directly), gas evolution, failures, the time the reaction went dark.
7. **Brief conclusion and next step.** What the numbers say so far, what you will do next, and any instruction to your future self.
:::

An entry is complete when a competent stranger could repeat the work from it without asking you anything. That standard costs a few minutes a session and is the difference between a laboratory record and a description of one. The same discipline, carried from the notebook into the write-up, is [[laboratory-methods/reporting-integrity]].

## Tables

A table is a graph that has not been drawn: it should be readable in isolation, with every quantity identified and every number placed so the eye can compare. The rules are short. One quantity per column, and the column header carries the **quantity symbol divided by its unit** — $V_\mathrm{titre}/\mathrm{cm^3}$, $c/\mathrm{mol\,dm^{-3}}$ — so that the cells contain pure numbers and no units ever appear inside them. All entries of a column run to the same number of decimal places, because trailing zeros are claims about resolution ([[laboratory-methods/measurement-uncertainty]]). A caption numbers the table and lets it stand alone: what was measured, of what, at what conditions, with the mean or key result stated. Raw readings and calculated results may sit in the same table only in clearly separated columns.

::: example A titre table, broken and fixed {#ex-titre-table}
This table — everything but the handwriting reproduced faithfully — came from a student report on the standardisation of hydrochloric acid against sodium hydroxide. Find at least five faults, then rewrite it.

| Burette | 1 | 2 | 3 |
|---|---|---|---|
| Final | 24.95 cm3 | 24.9 | 24.92 |
| Initial | 0 | 0 | 0 |
| Titre | 24.95 | 25 | 24.92 |

::: solution
The faults: (a) no caption, so the table cannot stand alone — nothing says what was titrated, at what concentration, or with what indicator; (b) row labels name the instrument, not the quantities, and carry no units; (c) a unit appears inside a cell ("24.95 cm3"); (d) the significant figures wander — $24.95$, $24.9$, $25$ — where a burette is read to $0.05\ \mathrm{cm^3}$ or better, so every entry belongs to the hundredths; (e) the titre row is a calculated quantity mixed among raw readings without comment, and one titre ("25") is inconsistent with its own final reading; (f) the rough titre, if that is what column 2 is, is not labelled as such and should not be averaged with the accurate ones. A fixed version:

**Table 1.** Titration of $25.00\ \mathrm{cm^3}$ of sodium hydroxide solution against hydrochloric acid, with bromocresol green; mean of the three accurate titres $24.92\ \mathrm{cm^3}$ (spread $0.05\ \mathrm{cm^3}$).

| Titre no. | $V_\mathrm{final}/\mathrm{cm^3}$ | $V_\mathrm{initial}/\mathrm{cm^3}$ | $V_\mathrm{titre}/\mathrm{cm^3}$ |
|---|---|---|---|
| rough | 24.45 | 0.00 | 24.45 |
| 1 | 24.95 | 0.00 | 24.95 |
| 2 | 24.90 | 0.00 | 24.90 |
| 3 | 24.92 | 0.00 | 24.92 |

Every header is quantity-over-unit, every cell is a bare number to the hundredths, the rough titre is labelled and excluded, and the caption carries the conditions and the result. The mean of the accurate titres is $(24.95 + 24.90 + 24.92)/3 = 24.923$, reported as $24.92\ \mathrm{cm^3}$ — one figure more than the spread justifies would be dishonest, one fewer wasteful.
:::
:::

## Graphs

::: definition Rules for a scientific graph {#def-graph-rules}
(i) The **independent variable** — the one you set — goes on the horizontal axis; the response goes up the vertical axis. (ii) Every axis is labelled *quantity / unit*, e.g. $c/\mathrm{mol\,dm^{-3}}$, with the scale chosen so the points occupy most of the paper; a broken or non-zero origin is legitimate, but then the intercept cannot be read off the drawing and must be computed. (iii) Where readings carry uncertainties, plot **error bars**; a point without error bars is an assertion of perfection. (iv) Draw a **fitted line or smooth curve**, never a dot-to-dot: the line is a statement about the relationship, the wiggles between points are statements about your handwriting. (v) The caption goes below the graph, numbered, and lets it stand alone — what is plotted, of what, under what conditions, and what the fit gives.
:::

A straight line is worth drawing for its own sake because a straight line is measurable — slope and intercept are numbers you can carry out of the graph — and so the working chemist's most valuable graphing trick is **linearisation**: transforming curved axes until the theory says the data should be straight. Two transformations do almost all the service. A **power law**

$$
y = a\,x^{b}
\qquad\Longrightarrow\qquad
\log y = b\,\log x + \log a
$$

becomes a straight line on **log–log** paper, of slope $b$ (the exponent) and intercept $\log a$; equal spacing on both axes multiplies rather than adds. An **exponential law**

$$
y = a\,e^{bx}
\qquad\Longrightarrow\qquad
\ln y = b\,x + \ln a
$$

becomes a straight line of slope $b$ on **semi-log** paper (logarithmic vertical axis, linear horizontal) — which is why first-order kinetics, radioactive decay and the approach to equilibrium all draw themselves straight on the right axes. In both cases the intercept of the transformed line returns $a$, and the scatter of the points about the line, not the raw $R^2$ of the original curve, is what you read the quality of the law from. One caution the log hides: you may only take logarithms of pure numbers, so the axes must be labelled as ratios, $\log\left(c/\mathrm{mol\,dm^{-3}}\right)$ — the headers in the next example already divide by the units.

::: example The order of a reaction from a log–log plot {#ex-loglog-power-law}
The initial rate $v$ of a reaction in solution was measured at five concentrations $c$ of one reactant:

| $c\,/\,\mathrm{mol\,dm^{-3}}$ | 0.010 | 0.020 | 0.040 | 0.080 | 0.160 |
| $v\,/\,\mathrm{mol\,dm^{-3}\,s^{-1}}$ | $1.7\times10^{-5}$ | $6.2\times10^{-5}$ | $2.6\times10^{-4}$ | $1.01\times10^{-3}$ | $4.2\times10^{-3}$ |

If the rate obeys a power law $v = k\,c^{n}$, extract the order $n$ and the rate coefficient $k$ from a straight-line plot.
::: solution
Take common logarithms of both sides: $\log\left(v\,/\,\mathrm{mol\,dm^{-3}\,s^{-1}}\right) = n\,\log\left(c\,/\,\mathrm{mol\,dm^{-3}}\right) + \log\left(k\,/\,\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}\right)$, so a plot of $\log v$ against $\log c$ should be straight with slope $n$ and intercept $\log k$.

| $\log\left(c\,/\,\mathrm{mol\,dm^{-3}}\right)$ | $-2.000$ | $-1.699$ | $-1.398$ | $-1.097$ | $-0.796$ |
| $\log\left(v\,/\,\mathrm{mol\,dm^{-3}\,s^{-1}}\right)$ | $-4.770$ | $-4.208$ | $-3.585$ | $-2.996$ | $-2.377$ |

The five log points fall on a line; a least-squares fit (the machinery of the next section) gives slope $n = 1.99 \pm 0.02$ and intercept $-0.802 \pm 0.027$, with $R^2 = 0.9997$. The order is therefore $n = 2$ — second order in this reactant — to within the scatter. The intercept converts back by raising ten to its power: $k = 10^{-0.802} = 0.158$, and the units follow from the rate law, $v = k c^{2}$ requiring $\mathrm{mol\,dm^{-3}\,s^{-1}} = k\,\mathrm{mol^{2}\,dm^{-6}}$, so $k = 0.16\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. (The uncertainty of an antilogarithm scales as $\ln 10$ times the uncertainty of the logarithm: $u(k) = 0.158 \times 2.303 \times 0.027 = 0.01$, so $k = 0.16 \pm 0.01\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.) Notice what the log–log plot did: five concentrations spanning a factor of sixteen became four equal steps, and a rate law that looks like nothing on ordinary axes became two numbers with a straight line behind them.
:::
:::

## Least-squares straight lines

A graph answers two questions: *what shape*, and *what numbers*. For the numbers, the eye is a bad straightedge — two people draw two lines through the same points and quote two slopes. The remedy is a rule for drawing the line, and the rule everyone uses minimises squared vertical distances.

::: proposition The least-squares line {#prop-least-squares}
For $n$ points $(x_i, y_i)$, the line $y = a + bx$ that minimises the sum of squared vertical residuals
$$
S(a, b) = \sum_{i=1}^{n}\left(y_i - a - b x_i\right)^{2}
$$
has slope and intercept
$$
b = \frac{S_{xy}}{S_{xx}},
\qquad
a = \bar{y} - b\,\bar{x},
\qquad\text{where}\qquad
S_{xx} = \sum_{i=1}^{n}\left(x_i - \bar{x}\right)^{2},
\quad
S_{xy} = \sum_{i=1}^{n}\left(x_i - \bar{x}\right)\left(y_i - \bar{y}\right).
$$
The least-squares line always passes through the centroid $(\bar{x}, \bar{y})$ of the points.
:::

::: proof The normal equations {#proof-normal-equations}
$S$ is a quadratic in $a$ and $b$ with positive leading coefficients, so its unique stationary point is its minimum. Set the two partial derivatives to zero:
$$
\frac{\partial S}{\partial a} = -2\sum_{i=1}^{n}\left(y_i - a - b x_i\right) = 0
\qquad\Longrightarrow\qquad
\bar{y} = a + b\,\bar{x},
$$
$$
\frac{\partial S}{\partial b} = -2\sum_{i=1}^{n} x_i\left(y_i - a - b x_i\right) = 0.
$$
These two conditions are the **normal equations**. The first is the intercept formula $a = \bar{y} - b\bar{x}$: the line passes through the centroid. Substitute it into the second. Writing each $x_i$ as $\bar{x} + (x_i - \bar{x})$, every term containing the factor $(x_i - \bar{x})$ summed against a constant vanishes because $\sum_i (x_i - \bar{x}) = 0$, and the second equation collapses to
$$
\sum_{i=1}^{n}\left(x_i - \bar{x}\right)\left(y_i - \bar{y}\right) = b\sum_{i=1}^{n}\left(x_i - \bar{x}\right)^{2}
\qquad\Longrightarrow\qquad
b = \frac{S_{xy}}{S_{xx}}.
$$
The stationary point is a minimum: $\partial^2 S/\partial a^2 = 2n > 0$ and the determinant of second derivatives is $4\left(n\sum x_i^2 - (\sum x_i)^2\right) = 4n S_{xx} > 0$ for any set of points not all at one $x$. (The same calculation with the residuals measured horizontally, or in both directions, gives different lines — least squares in $y$ assumes the $x$-values are the ones you set exactly, which is why calibration standards are prepared carefully and read as if perfect.)
:::

::: proposition Standard errors of slope and intercept {#prop-line-uncertainty}
If the $y$-readings are independent, carry a common standard deviation at every $x$, and the $x$-values are exact, then the scatter of the points about the fitted line estimates the **residual standard deviation**
$$
s_\mathrm{res} = \sqrt{\frac{\sum_{i=1}^{n}\left(y_i - a - b x_i\right)^{2}}{n - 2}} ,
$$
(the $n - 2$ degrees of freedom: two have been spent fitting $a$ and $b$), and the **standard errors** of the fitted parameters are
$$
s_b = \frac{s_\mathrm{res}}{\sqrt{S_{xx}}},
\qquad
s_a = s_\mathrm{res}\,\sqrt{\frac{1}{n} + \frac{\bar{x}^{\,2}}{S_{xx}}} .
$$
The fraction of the scatter in $y$ explained by the line is the **coefficient of determination**, $R^2 = S_{xy}^{2}/(S_{xx}\,S_{yy})$, which equals one minus the residual sum of squares divided by the total sum of squares $S_{yy}$.
:::

Read $s_b$ before using it: the slope is pinned down by the *spread* of the $x$-values ($\sqrt{S_{xx}}$ in the denominator), not by their number alone — standards clustered in the middle of the range give a far sloppier slope than standards pushed out to the ends. And $s_a$ shrinks as $\bar{x} \to 0$: if you want a well-determined intercept, centre your standards about zero (for a calibration, that means including a genuine blank). These are the same standard-deviation-of-a-mean ideas as [[laboratory-methods/measurement-uncertainty]], spent on two parameters at once.

::: example A hand least-squares fit: the density of a liquid {#ex-hand-least-squares}
Successive volumes of an alcohol were delivered into a tared beaker and weighed:

| $V\,/\,\mathrm{cm^3}$ | 10.0 | 20.0 | 30.0 | 40.0 | 50.0 |
| $m\,/\,\mathrm{g}$ | 7.9 | 15.9 | 23.5 | 31.8 | 39.3 |

Fit $m = a + \rho V$ by least squares and report the density with its standard error.
::: solution
Here $\bar{x} = 30.0\ \mathrm{cm^3}$ and $\bar{y} = 23.68\ \mathrm{g}$, and the sums of squares and cross-products are best laid out in a table:

| $V_i - \bar{x}$ | $m_i - \bar{y}$ | $(V_i - \bar{x})(m_i - \bar{y})$ | $(V_i - \bar{x})^2$ |
|---|---|---|---|
| $-20.0$ | $-15.78$ | $315.6$ | $400$ |
| $-10.0$ | $-7.78$ | $77.8$ | $100$ |
| $0$ | $-0.18$ | $0$ | $0$ |
| $10.0$ | $8.12$ | $81.2$ | $100$ |
| $20.0$ | $15.62$ | $312.4$ | $400$ |

So $S_{xy} = 787.0\ \mathrm{g\,cm^3}$ and $S_{xx} = 1000\ \mathrm{cm^6}$, and
$$
\rho = b = \frac{787.0}{1000} = 0.787\ \mathrm{g\,cm^{-3}},
\qquad
a = 23.68 - 0.787 \times 30.0 = 0.07\ \mathrm{g}.
$$
The residuals $m_i - (a + \rho V_i)$ are $-0.04$, $+0.09$, $-0.18$, $+0.25$, $-0.12\ \mathrm{g}$; their squares sum to $0.119\ \mathrm{g^2}$, so
$$
s_\mathrm{res} = \sqrt{\frac{0.119}{5 - 2}} = 0.199\ \mathrm{g},
\qquad
s_b = \frac{0.199}{\sqrt{1000}} = 0.0063\ \mathrm{g\,cm^{-3}},
\qquad
s_a = 0.199\sqrt{\frac{1}{5} + \frac{30.0^2}{1000}} = 0.21\ \mathrm{g}.
$$
The density is $\rho = 0.787 \pm 0.006\ \mathrm{g\,cm^{-3}}$ — ethanol's tabulated $\mathrm{20\,^{\circ}C}$ value is $0.789\ \mathrm{g\,cm^{-3}}$, inside one standard error. The intercept is $0.07 \pm 0.21\ \mathrm{g}$: consistent with zero, as it must be, because the beaker was tared — an empty beaker has no liquid mass. With $S_{yy} = 619.5\ \mathrm{g^2}$, $R^2 = 787.0^2/(1000 \times 619.5) = 0.9998$.
:::
:::

::: widget regression
points: 0,0.02; 2,0.14; 4,0.27; 6,0.39; 8,0.52; 10,0.65
degree: 1
caption: A Beer–Lambert calibration: absorbance (vertical) against concentration in $\mu\mathrm{mol\,dm^{-3}}$ (horizontal) for six standards of a dye. Drag any point and watch the least-squares line, its equation and $R^2$ respond — the line is not drawn through whichever points you like best, but is the unique line minimising the sum of squared vertical residuals. This is what "fit the line, then read the unknown" means in practice, and the next two examples work these same six points up into a molar absorption coefficient with its uncertainty.
:::

::: example A Beer–Lambert calibration: $\varepsilon$ with its standard error {#ex-beer-calibration}
Six standards of a dye were measured in a $1.00\ \mathrm{cm}$ cell at the absorption maximum, giving (concentration $c$ in $\mu\mathrm{mol\,dm^{-3}}$, absorbance $A$):

| $c\,/\,\mu\mathrm{mol\,dm^{-3}}$ | 0 | 2 | 4 | 6 | 8 | 10 |
| $A$ | 0.02 | 0.14 | 0.27 | 0.39 | 0.52 | 0.65 |

The Beer–Lambert law, $A = \varepsilon\, l\, c$ ([[analytical-chemistry/molecular-spectrometry]]), says $A$ is linear in $c$ through the origin. Fit the line, extract the molar absorption coefficient $\varepsilon$ with its standard error, and say what the intercept is doing there.
::: solution
With $n = 6$, $\bar{x} = 5.00\ \mu\mathrm{mol\,dm^{-3}}$, $\bar{y} = 0.3317$: $S_{xx} = 70.0\ (\mu\mathrm{mol\,dm^{-3}})^2$ and $S_{xy} = 4.41$, so
$$
b = \frac{4.41}{70.0} = 0.0630\ \mathrm{dm^{3}}\,\mu\mathrm{mol^{-1}},
\qquad
a = 0.3317 - 0.0630 \times 5.00 = 0.0167 .
$$
The fitted values are $0.0167$, $0.1427$, $0.2687$, $0.3947$, $0.5207$, $0.6467$; the residuals are $+0.0033$, $-0.0027$, $+0.0013$, $-0.0047$, $-0.0007$, $+0.0033$ — no curvature, just the $\pm 0.004$ flicker of a room-temperature spectrophotometer. Then
$$
s_\mathrm{res} = \sqrt{\frac{3.7\times10^{-5}}{4}} = 0.0037,
\qquad
s_b = \frac{0.0037}{\sqrt{70.0}} = 0.00044,
\qquad
s_a = 0.0037\sqrt{\frac{1}{6} + \frac{25.0}{70.0}} = 0.0026,
$$
and $R^2 = 0.9998$. The slope is the product $\varepsilon l$; with $l = 1.00\ \mathrm{cm}$ and $10^{6}\ \mu\mathrm{mol} = 1\ \mathrm{mol}$,
$$
\varepsilon = \frac{b}{l} = 0.0630\ \mathrm{dm^{3}}\,\mu\mathrm{mol^{-1}\,cm^{-1}} = 6.30\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,cm^{-1}},
\qquad
s_\varepsilon = 0.00044 \times 10^{6} = 4.4\times10^{2},
$$
so $\varepsilon = (6.30 \pm 0.04)\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$ — a strong band, as dyes are. Now the intercept: $a = 0.0167 \pm 0.0026$ sits six standard errors above zero, so it is not noise. The law says it should vanish; the instrument says it does not. The usual culprits are a blank that was not blank — the "zero" standard carried a little absorbing material, or the reference cuvette differed from the sample cuvette — or stray light reaching the detector at the nominal zero of the scale. The lesson is not to force the line through zero but to keep the intercept and ask what it is: here, re-reading the standards against a properly matched blank would move $a$ to within noise of zero and leave the slope almost untouched.
:::
:::

::: example Reading the unknown off the line {#ex-unknown-from-line}
An unknown solution of the same dye reads $A = 0.440$, with a reading uncertainty $u_A = 0.005$. Use the calibration of [[#ex-beer-calibration]] — $A = (0.0167 \pm 0.0026) + (0.0630 \pm 0.00044)\,c$, with $c$ in $\mu\mathrm{mol\,dm^{-3}}$ — to find its concentration with an uncertainty.
::: solution
Invert the line: $c = (A - a)/b$,
$$
c = \frac{0.440 - 0.0167}{0.0630} = 6.72\ \mu\mathrm{mol\,dm^{-3}} .
$$
Three inputs carry uncertainty — the reading $A$, the intercept $a$ and the slope $b$ — and the propagation rules of [[laboratory-methods/measurement-uncertainty]] give, with partial derivatives $\partial c/\partial A = 1/b$, $\partial c/\partial a = -1/b$ and $\partial c/\partial b = -c/b$,
$$
u_c = \sqrt{\left(\frac{u_A}{b}\right)^{2} + \left(\frac{s_a}{b}\right)^{2} + \left(\frac{c\,s_b}{b}\right)^{2}}
= \sqrt{\left(\frac{0.005}{0.0630}\right)^{2} + \left(\frac{0.0026}{0.0630}\right)^{2} + \left(\frac{6.72 \times 0.00044}{0.0630}\right)^{2}} .
$$
The three terms are $0.079$, $0.042$ and $0.047\ \mu\mathrm{mol\,dm^{-3}}$, so $u_c = 0.10\ \mu\mathrm{mol\,dm^{-3}}$ and
$$
c = 6.7 \pm 0.1\ \mu\mathrm{mol\,dm^{-3}} .
$$
(Technically $a$ and $b$ are correlated — both come from the same fit — and the exact calibration-uncertainty formula is a little different; the quadrature above is the standard working estimate and is good to a few per cent here. See [[analytical-chemistry/statistics-calibration]].) Two checks belong to every such number. The reading $0.440$ lies inside the calibrated absorbance range $0.02$–$0.65$, so this is interpolation, which is what a calibration is for. And had we ignored the intercept and used $c = A/b = 6.98$, we would have been $4\ \%$ high — four times the uncertainty, bought by saving one subtraction.
:::
:::

## Reading a fit honestly

::: warning $R^2$ near one is not validation {#warn-r-squared}
Both fits in this chapter came with $R^2 = 0.9998$ — and one of them had an intercept six standard errors from zero that its $R^2$ never mentioned. $R^2$ measures how tightly the points cluster about *whatever line was fitted*; it is almost blind to the two things that actually betray a bad calibration. So: **look at the residual plot** — the residuals $y_i - (a + bx_i)$ against $x$ — and stop trusting the fit when they show a pattern, because curvature hiding under $R^2 = 0.999$ is exactly how Beer's law fails at high absorbance and how a missed endpoint looks. **Ask whether the intercept makes physical sense**: a Beer's-law intercept should be zero, and a significantly non-zero one is a blank, a stray-light offset or a matrix effect talking, not bad luck. **Never extrapolate beyond the calibrated range** — a calibration is valid only between its extreme standards, because outside them you are trusting the line's shape where you never tested it; dilute the sample and re-read it instead. And **do not force the line through zero** unless the physics demands it, and then say so in the caption: forcing zero on data with a real offset does not remove the offset, it smears it into the slope, and every concentration you read afterwards inherits the smear.
:::

::: quiz
A student's Beer's-law calibration of $A$ against $c$ gives $A = 0.048 + 0.062\,c$ with $s_a = 0.003$; the points are tight and evenly spread, with no curvature in the residuals. The intercept sits sixteen standard errors above zero. What is the most likely cause?
- [x] An offset in the absorbance scale — a blank that was not blank, a mismatched reference cuvette, or stray light — shifting every reading by roughly the same amount.
- [ ] The concentration range was too wide for Beer's law to hold.
- [ ] The slope is too large for this dye, which tilts the line off the origin.
- [ ] The line should have been forced through zero, which would have made the intercept disappear.
::: solution
A uniform upward shift of all readings is exactly what an intercept is, and blanks, cuvettes and stray light are its everyday sources. Curvature from a too-wide range (option two) would show up as a *pattern in the residuals*, which the question rules out; the slope and intercept are fitted together and a steep slope does not "tilt" a line off its own intercept; and forcing the line through zero (option four) would not remove the offset — it would convert it into a slope error and bias every unknown read from the line ([[#warn-r-squared]]). The fix is physical, not arithmetic: re-zero on a true blank and re-read the standards.
:::
:::

::: history
Faraday's diary, begun in 1813 and kept to his death, runs to thousands of pages now preserved at the Royal Institution — dated, numbered, unforgiving of gaps, and the reason we possess the discovery of electromagnetic induction as a dated sequence of experiments rather than a rumour. His resolution that nothing is too small to be observed well, and nothing observed well may go unrecorded, is the professional culture this chapter's notebook rules descend from. The line through the points has its own, older story. In 1805 the French mathematician Adrien-Marie Legendre (Legendre), auditing the inconsistent observations with which comet orbits were computed, published in a few pages of *Nouvelles méthodes pour la détermination des orbites des comètes* the rule of choosing the curve that minimises the *sum of squared* errors — least squares, stated for the straight line in essentially the form of [[#prop-least-squares]]. Carl Friedrich Gauss (Gauss), who claimed priority, supplied the deep reason in 1809: if the errors are normally distributed, the least-squares line is the most probable line — tying the recipe to the bell curve that [[laboratory-methods/measurement-uncertainty]] already leans on. The line on your calibration graph is theirs: a comet-orbit estimator's loss function, kept because squared errors let the normal equations solve in closed form, and because averaging independent readings is the one thing that shrinks random error.
:::

## Where this leads

The notebook becomes a publication in [[laboratory-methods/reporting-integrity]], where captions, figures and uncertainties are the same honesty worn in public. The full statistics of the calibration line — weighted least squares when the scatter grows with concentration, confidence and prediction bands, detection limits — is [[analytical-chemistry/statistics-calibration]], and the instruments behind Beer–Lambert calibrations, including why linearity fails at high absorbance, are [[analytical-chemistry/molecular-spectrometry]]. In [[laboratory-methods/volumetric-technique]] the standards of your calibration are themselves made, and the glassware tolerances there become the $x$-uncertainty this chapter's fits assumed away; the dilutions that produce a calibration series are the solution arithmetic of [[general-chemistry-2/liquids-solutions]]. For the original context of units, figures and quantities-as-ratios, see [[general-chemistry-1/matter-measurement]].

::: summary
- The notebook is a primary legal record, not a memory aid: bound numbered pages, permanent ink, dated sessions, raw readings written as they happen, mistakes struck through once and initialled, nothing erased or back-dated.
- A table takes one quantity per column, headed as quantity-over-unit so cells hold bare numbers at consistent significant figures, with a caption that lets the table stand alone.
- A graph puts the independent variable on the horizontal axis, labels every axis quantity-over-unit, shows error bars, carries a fitted line rather than a dot-to-dot, and is explained by a caption below.
- Linearisation turns laws into lines: a power law $y = ax^b$ is straight on log–log axes with slope $b$; an exponential $y = ae^{bx}$ is straight on semi-log axes with slope $b$; the intercept returns $a$.
- The least-squares line has $b = S_{xy}/S_{xx}$ and $a = \bar{y} - b\bar{x}$, passes through the centroid, and comes from setting the two normal equations to zero.
- Its uncertainties are $s_\mathrm{res} = \sqrt{\sum(y_i - a - bx_i)^2/(n-2)}$, $s_b = s_\mathrm{res}/\sqrt{S_{xx}}$ and $s_a = s_\mathrm{res}\sqrt{1/n + \bar{x}^2/S_{xx}}$: spread the standards wide to pin the slope, include a blank to pin the intercept.
- Read a fit honestly: inspect the residuals, not just $R^2$; demand a physically sensible intercept; never extrapolate beyond the extreme standards; force the line through zero only when the physics says so, and then say so.
:::

## Exercises

::: exercise Critique a graph {level=1}
A report plots the volume of hydrogen collected from a reaction against time, with **time on the vertical axis** and volume on the horizontal; the volume axis is ticked "50, 100, 150" with "$\mathrm{cm^3}$" written once above the axis and the time axis carries no label at all; the six points are joined by straight line segments; the line is extended past the last point at $40\ \mathrm{min}$ to read off a volume at $60\ \mathrm{min}$; and the heading reads "Graph 1". List at least five faults and say what each one costs the reader.
::: solution
(a) The axes are swapped: time is the independent variable and belongs on the horizontal axis — as drawn, the slope means $\mathrm{cm^{-3}\,min}$ instead of the rate in $\mathrm{cm^{3}\,min^{-1}}$. (b) The volume axis labels are bare numbers with the unit written once, instead of every axis being labelled quantity-over-unit ($V/\mathrm{cm^3}$, $t/\mathrm{min}$); the unlabelled time axis forces the reader to guess which variable is which. (c) Dot-to-dot: the segments describe the six measurements and nothing else, hiding the smooth curve the reader needs and inventing corners between points. (d) The extension past $40\ \mathrm{min}$ is extrapolation beyond the data — the reaction may have run out of metal by then, and the reading at $60\ \mathrm{min}$ is fiction; a graph may be interpolated, not extrapolated, without saying so loudly. (e) "Graph 1" is not a caption: nothing states what was reacted, at what mass or temperature, so the figure cannot stand alone. (f) No error bars, though the gas syringe reads to $\pm 0.5\ \mathrm{cm^3}$ — the points claim a perfection they do not have.
:::
:::

::: exercise Slope and intercept of a two-point line {level=1 check="0.064"}
A calibration line for absorbance $A$ against concentration $c$ passes through the points $(2.0,\ 0.143)$ and $(8.0,\ 0.527)$, with $c$ in $\mu\mathrm{mol\,dm^{-3}}$. Find its slope and intercept. (Enter the slope in $\mathrm{dm^{3}}\,\mu\mathrm{mol^{-1}}$.)
::: solution
$b = (0.527 - 0.143)/(8.0 - 2.0) = 0.384/6.0 = 0.064\ \mathrm{dm^{3}}\,\mu\mathrm{mol^{-1}}$, and $a = 0.143 - 0.064 \times 2.0 = 0.015$. Two points always admit an exact line — which is exactly why two points are not a calibration: nothing in the arithmetic can tell you the points were badly scattered about a good line.
:::
:::

::: exercise Read an unknown off a given line {level=1 check="5.00"}
A calibration gives $A = 0.020 + 0.0640\,c$ with $c$ in $\mu\mathrm{mol\,dm^{-3}}$. An unknown reads $A = 0.340$. What is its concentration? (Enter it in $\mu\mathrm{mol\,dm^{-3}}$.)
::: solution
$c = (A - a)/b = (0.340 - 0.020)/0.0640 = 0.320/0.0640 = 5.00\ \mu\mathrm{mol\,dm^{-3}}$. The reading $0.340$ lies inside the calibrated range, so this is interpolation. Dropping the intercept would give $5.31$ — a $6\ \%$ error from a "tiny" correction, which is why the intercept is carried.
:::
:::

::: exercise Least-squares slope of five points {level=2 check="0.98"}
A spring extended by $l$ under added mass $m$:

| $m\,/\,\mathrm{g}$ | 1.0 | 2.0 | 3.0 | 4.0 | 5.0 |
| $l\,/\,\mathrm{cm}$ | 1.0 | 2.1 | 2.9 | 4.1 | 4.9 |

Compute the least-squares slope of $l$ against $m$. (Enter it in $\mathrm{cm\,g^{-1}}$.)
::: solution
$\bar{x} = 3.0$, $\bar{y} = 3.0$. Deviations of $m$: $-2, -1, 0, 1, 2$; of $l$: $-2.0, -0.9, -0.1, 1.1, 1.9$. Then $S_{xy} = (-2)(-2.0) + (-1)(-0.9) + 0 + (1)(1.1) + (2)(1.9) = 4.0 + 0.9 + 1.1 + 3.8 = 9.8\ \mathrm{g\,cm}$ and $S_{xx} = 4 + 1 + 0 + 1 + 4 = 10.0\ \mathrm{g^2}$, so
$$
b = \frac{9.8}{10.0} = 0.98\ \mathrm{cm\,g^{-1}},
\qquad
a = 3.0 - 0.98 \times 3.0 = 0.06\ \mathrm{cm}.
$$
The extension per gram is $0.98\ \mathrm{cm\,g^{-1}}$, and the intercept $0.06\ \mathrm{cm}$ — a small zero error of the pointer, or the mass of the hanger, depending on how the experiment was set.
:::
:::

::: exercise An unknown with its uncertainty {level=2 check="4.33"}
A calibration of absorbance against concentration in $\mu\mathrm{mol\,dm^{-3}}$ gave $a = 0.017 \pm 0.003$ and $b = 0.0630 \pm 0.0005$. An unknown reads $A = 0.290$ with $u_A = 0.004$. Find its concentration with its standard uncertainty. (Enter the concentration in $\mu\mathrm{mol\,dm^{-3}}$.)
::: solution
$c = (0.290 - 0.017)/0.0630 = 0.273/0.0630 = 4.33\ \mu\mathrm{mol\,dm^{-3}}$. Propagating the three inputs with partial derivatives $1/b$, $-1/b$ and $-c/b$:
$$
u_c = \sqrt{\left(\frac{0.004}{0.0630}\right)^{2} + \left(\frac{0.003}{0.0630}\right)^{2} + \left(\frac{4.33 \times 0.0005}{0.0630}\right)^{2}}
= \sqrt{0.063^{2} + 0.048^{2} + 0.034^{2}} = 0.087\ \mu\mathrm{mol\,dm^{-3}},
$$
so $c = 4.33 \pm 0.09\ \mu\mathrm{mol\,dm^{-3}}$. The single absorbance reading dominates the budget — if the number mattered, the cheap improvement is to read the unknown in replicate.
:::
:::

::: exercise Extract the exponent {level=2 check="1.48"}
A student linearises a power law $y = a x^{b}$ and finds, from four well-spread points,

| $\log x$ | $-1.00$ | $-0.50$ | $0.00$ | $0.50$ |
| $\log y$ | $-3.52$ | $-2.73$ | $-2.02$ | $-1.29$ |

Compute the least-squares slope of these four points — the exponent $b$. (Enter $b$.)
::: solution
$\overline{\log x} = -0.25$ and $\overline{\log y} = -2.39$. Deviations of $\log x$: $-0.75, -0.25, 0.25, 0.75$; of $\log y$: $-1.13, -0.34, 0.37, 1.10$. Then $S_{xy} = 0.8475 + 0.085 + 0.0925 + 0.825 = 1.850$ and $S_{xx} = 0.5625 + 0.0625 + 0.0625 + 0.5625 = 1.250$, so
$$
b = \frac{1.850}{1.250} = 1.48 .
$$
The exponent is $1.48 \approx 3/2$ — fractional orders are real, and a log–log plot finds them as easily as whole ones. The intercept, $-2.39 - 1.48 \times (-0.25) = -2.02$, returns $a = 10^{-2.02} = 9.6\times10^{-3}$.
:::
:::

::: exercise Derive the normal equations {level=3}
Starting from $S(a,b) = \sum_{i=1}^{n}\left(y_i - a - b x_i\right)^{2}$, derive the two normal equations and from them $a = \bar{y} - b\bar{x}$ and $b = S_{xy}/S_{xx}$, and show that the stationary point is a minimum. Then show that the sum of the residuals of the fitted line is zero.
::: hint
Differentiate with respect to $a$ and $b$ separately and set each derivative to zero. The first equation is just a statement about the mean. For the second, replace every $x_i$ by $\bar{x} + (x_i - \bar{x})$ and use $\sum_i (x_i - \bar{x}) = 0$ to kill the cross-terms.
:::
::: solution
$\partial S/\partial a = -2\sum_i (y_i - a - b x_i) = 0$ gives $\sum y_i = na + b\sum x_i$; dividing by $n$: $\bar{y} = a + b\bar{x}$, so $a = \bar{y} - b\bar{x}$. $\partial S/\partial b = -2\sum_i x_i(y_i - a - b x_i) = 0$. Substituting $a = \bar{y} - b\bar{x}$, the equation becomes $\sum_i x_i\left[(y_i - \bar{y}) - b(x_i - \bar{x})\right] = 0$; writing $x_i = \bar{x} + (x_i - \bar{x})$, the $\bar{x}$-parts multiply $\sum_i (y_i - \bar{y})$ and $\sum_i (x_i - \bar{x})$, both zero, leaving $S_{xy} = b\,S_{xx}$, i.e. $b = S_{xy}/S_{xx}$. Minimum: $\partial^2 S/\partial a^2 = 2n > 0$ and $\partial^2 S/\partial a^2\,\partial^2 S/\partial b^2 - (\partial^2 S/\partial a\,\partial b)^2 = 4n\sum x_i^2 - 4(\sum x_i)^2 = 4nS_{xx} > 0$ unless all $x_i$ coincide, so the stationary point is the unique global minimum of a quadratic. Finally, the residuals sum to $\sum_i (y_i - a - b x_i) = \sum y_i - na - b\sum x_i = n(\bar{y} - a - b\bar{x}) = 0$ by the first normal equation — the positive and negative residuals always balance, which is why a fit with a *trend* in its residuals has broken the model, not merely the luck.
:::
:::

::: exercise May the intercept be set to zero? {level=3}
Two students calibrate the same dye on two instruments. Instrument 1 gives $A = (0.0167 \pm 0.0026) + (0.0630 \pm 0.0004)\,c$; instrument 2 gives $A = (0.002 \pm 0.003) + (0.0612 \pm 0.0006)\,c$ ($c$ in $\mu\mathrm{mol\,dm^{-3}}$). (a) For each instrument, is the intercept distinguishable from zero at about the $5\ \%$ level (use $t = a/s_a$; take $|t| > 2$ as the criterion)? (b) Do the two intercepts differ from each other ($t = (a_1 - a_2)/\sqrt{s_{a_1}^2 + s_{a_2}^2}$)? (c) Do the slopes differ ($t = (b_1 - b_2)/\sqrt{s_{b_1}^2 + s_{b_2}^2}$)? (d) Instrument 1's owner proposes forcing her line through zero "to agree with Beer's law". Compute the concentration error this creates for an unknown reading $A = 0.440$, and settle the argument.
::: solution
(a) Instrument 1: $t = 0.0167/0.0026 = 6.4$ — the intercept is real, an offset of the absorbance scale. Instrument 2: $t = 0.002/0.003 = 0.7$ — indistinguishable from zero; this blank is a true blank. (b) $t = (0.0167 - 0.002)/\sqrt{0.0026^2 + 0.003^2} = 0.0147/0.0040 = 3.7$: the instruments' offsets genuinely differ — one has been zeroed on a real blank, the other has not. (c) $t = (0.0630 - 0.0612)/\sqrt{0.0004^2 + 0.0006^2} = 0.0018/0.00072 = 2.5$: the slopes differ at about the $2.5\sigma$ level — borderline, worth repeating before concluding the instruments disagree about $\varepsilon$. (d) Forced through zero, instrument 1 gives $c = 0.440/0.0630 = 6.98$; its own line gives $c = (0.440 - 0.0167)/0.0630 = 6.72$. The error is $+0.27\ \mu\mathrm{mol\,dm^{-3}}$, about $4\ \%$ — many times the reading uncertainty, and systematic: every unknown is biased high by $a/b$ no matter where it is read. Beer's law says the *true* intercept is zero; it does not say *your measured* intercept may be deleted. The remedy for instrument 1 is to re-zero on a blank and re-read, not to edit the fit.
:::
:::
