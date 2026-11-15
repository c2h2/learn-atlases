The IS–LM model determines $Y$ at a given $P$. It does not say what $P$ will be, or how $\pi$ and $u$ co-move. That is the job of **aggregate supply** and of the **Phillips curve**. A. W. Phillips’s 1958 scatter for the United Kingdom looked like a menu: less unemployment at the cost of faster wage growth. Friedman (1968) and Phelps (1967–68) argued that the menu is temporary, and that in the long run the Phillips curve is vertical at the natural rate $u_n$ of [[macroeconomics/unemployment]]. The subsequent fifty years of theory — Lucas’s surprise-supply function, Taylor’s staggered contracts, Calvo’s sticky-price model, the New Keynesian Phillips curve — are variations on that argument, differing in how $\pi^e$ is formed and in why $P$ does not jump.

This chapter writes a short-run aggregate-supply (SRAS) schedule, derives the Phillips curve as the same object in $(\pi, u)$ space, and studies a disinflation under adaptive and under rational expectations. The slope coefficient in the Phillips curve is $\beta$ in this chapter; the discount factor of [[macroeconomics/consumption-and-saving]] does not appear. The chapter is for education only. A sacrifice-ratio calculation is not a recommendation to disinflate at a particular speed, and it is not a forecast of any country’s inflation path.

## Sticky wages, sticky prices and SRAS

If every nominal wage and every price were reset continuously at the competitive level, $Y$ would sit at $Y_n=F(\bar K,\bar L)$ and the classical dichotomy of [[macroeconomics/money-and-inflation]] would hold at every instant. The short run of IS–LM denies that. Two mechanisms, not mutually exclusive, make $Y$ respond to $P$ (or to $\pi$) at a finite horizon.

**Sticky nominal wages.** Suppose the nominal wage $W$ is set in advance, to equate expected labour demand with expected labour supply at $P^e$. If $P$ then comes in above $P^e$, the real wage $W/P$ is lower than expected, firms hire more, and $Y>Y_n$. If $P<P^e$, $Y<Y_n$. Fischer (1977) and Taylor (1980) made this a staggered-contract model; the qualitative SRAS is

$$
Y = Y_n + \alpha (P - P^e), \qquad \alpha > 0.
$$ {#eq-sras}

**Sticky prices.** With monopolistic competition, a firm that cannot reset its price when marginal cost rises will meet demand at the old price, and aggregate $Y$ will rise when aggregate demand rises. Mankiw (1985) showed that small menu costs can make this privately optimal; Calvo (1983) made the reset probability a constant. The New Keynesian Phillips curve of [[business-cycles/nominal-rigidities]] is the modern form. For this chapter, [[#eq-sras]] is enough: output exceeds potential when the price level exceeds the price level people had expected.

::: definition Short-run and long-run aggregate supply {#def-sras}
**Short-run aggregate supply (SRAS)** is [[#eq-sras]]: $Y$ increasing in $P$ given $P^e$. **Long-run aggregate supply (LRAS)** is the vertical line $Y=Y_n$, along which $P=P^e$ and the classical model of [[macroeconomics/national-income]] holds. A rise in $Y_n$ (more $K$, more $L$, higher $A$) shifts both; a rise in $P^e$ shifts SRAS up, one-for-one in $P$.
:::

The IS–LM equilibrium at a given $P$ is a point on **aggregate demand (AD)**, derived properly in the next chapter. Combined with SRAS, it determines $(Y,P)$ in the short run; combined with LRAS, it determines $P$ in the long run, with $Y=Y_n$. An unexpected rise in $M$ or $G$ moves AD along a given SRAS, raising $Y$ and $P$; as $P^e$ catches up, SRAS shifts up until $Y$ has returned to $Y_n$ and $P$ has risen in proportion to $M$ (neutrality restored).

::: example A surprise price level {#ex-sras}
$Y_n=1000$, $\alpha=20$, $P^e=10$. If $P=12$, what is $Y$? What real wage, relative to the expected real wage, does a sticky-$W$ story imply, taking labour demand as $L=Y$ for a one-input parable?
::: solution
$Y=1000+20(12-10)=1040$. The nominal wage was set for $P^e=10$, so $W/P$ is $10/12=5/6$ of $W/P^e$. Firms, facing a 17 per cent lower real wage, produce 4 per cent more output in this calibration. The numbers are illustrative; $\alpha$ is a reduced-form slope, not a deep parameter, and it will be smaller if wages are less sticky or if diminishing $F_L$ is steeper.
:::
:::

::: widget plot
f: 8+(x-1000)/20; 12-(x-1000)/25
x: 800, 1200
y: 4, 16
sliders: pe=8:4:14:0.5
labels: \text{SRAS }P=P^e+(Y-Y_n)/\alpha; \text{AD}
caption: Output $Y$ on the horizontal axis, the price level $P$ on the vertical. SRAS is drawn for $Y_n=1000$ and a slider $P^e$; AD is a downward-sloping IS–LM locus (a rise in $P$ lowers $M/P$ and $Y$). At $P^e=8$ the crossing is above $Y_n$. Raise $pe$ toward the actual $P$: SRAS shifts up, $Y$ falls back toward $1000$, and $P$ rises further. That is the short-run-to-long-run transition after a demand expansion.
:::

The AD in the widget is a linear illustration, $P=12-(Y-1000)/25$; the next chapter derives its slope from IS–LM. The qualitative experiment does not depend on the linear form.

## The Phillips curve

Okun’s law, [[macroeconomics/unemployment#eq-okun]], translates $Y-Y_n$ into $u-u_n$. Inflation is $\pi \approx P/P_{-1}-1$. Substituting both into [[#eq-sras]] produces a relationship between $\pi$ and $u$, given expected inflation.

::: definition Expectations-augmented Phillips curve {#def-pc}
The **Phillips curve** is

$$
\pi = \pi^e - \beta (u - u_n) + v,
$$ {#eq-pc}

where $\beta>0$ and $v$ is a supply shock (energy, food, a VAT change, a productivity jump). Equivalently, in gap form, $\pi = \pi^e + (\beta/\gamma)(Y-Y_n)/Y_n + v$ with $\gamma$ the Okun coefficient. The original Phillips (1958) and Samuelson–Solow (1960) curves omitted $\pi^e$ and $v$; the **expectations-augmented** form is Friedman–Phelps.
:::

::: proposition The natural-rate hypothesis {#prop-nairu}
If $\pi^e=\pi$ in the long run (expectations are correct) and $v=0$, then [[#eq-pc]] implies $u=u_n$, independently of $\pi$. There is no long-run trade-off between inflation and unemployment. The long-run Phillips curve is vertical at $u_n$.
:::

::: proof
Set $\pi=\pi^e$ and $v=0$ in [[#eq-pc]]: $0=-\beta(u-u_n)$, so $u=u_n$. The inflation rate at which this occurs is determined on the demand side (by $\mu$, in the quantity theory, or by the central bank’s target).
:::

The **NAIRU** — non-accelerating-inflation rate of unemployment — is $u_n$ under a further assumption on $\pi^e$: if $\pi^e_t=\pi_{t-1}$ (adaptive expectations, in the simplest form), then $\pi_t-\pi_{t-1}=-\beta(u_t-u_n)+v_t$, and inflation is stable only at $u=u_n$. Holding $u$ below $u_n$ produces *accelerating* inflation. That is Friedman’s 1968 prediction, and it is the reason the 1960s menu of Samuelson and Solow did not survive the 1970s.

::: example Reading a Phillips curve {#ex-pc}
$\pi^e=0.03$, $\beta=0.5$, $u_n=0.05$, $v=0$. What inflation rate does [[#eq-pc]] give at $u=0.05$, at $u=0.03$, and at $u=0.09$?
::: solution
At $u=u_n$, $\pi=\pi^e=3$ per cent. At $u=0.03$, $\pi=0.03-0.5(-0.02)=0.04$, or 4 per cent. At $u=0.09$, $\pi=0.03-0.5(0.04)=0.01$, or 1 per cent. A two-point unemployment gap, either way, maps into a one-point inflation gap at this $\beta$. The original Phillips scatter was in wage-inflation space; the translation to price inflation assumes a stable mark-up and trend productivity, which is a further reduced form.
:::
:::

::: widget plot
f: pe - 0.5*(x-5)
x: 0, 12
y: -2, 10
sliders: pe=3:0:8:0.5
labels: \text{Phillips curve }\pi=\pi^e-\beta(u-u_n)
caption: Unemployment $u$ (per cent) on the horizontal axis, inflation $\pi$ (per cent) on the vertical. The curve is drawn for $u_n=5$ per cent and $\beta=0.5$, with expected inflation $pe$ as a slider. Raise $pe$: the whole curve shifts up, and the unemployment rate that delivers $\pi=2$ per cent, say, rises. That is why a 1960s-style attempt to sit at $u<u_n$ cannot keep $\pi$ from climbing once $\pi^e$ follows.
:::

::: quiz
The natural-rate hypothesis says that, in the long run,
- [ ] any $u$ can be maintained at a constant $\pi$, given the right $\mu$
- [x] $u=u_n$ at any constant $\pi$, once $\pi^e=\pi$
- [ ] $\pi=0$ is the only inflation consistent with $u=u_n$
- [ ] the Phillips curve is downward-sloping even when expectations are correct
::: solution
Correct expectations and no supply shock force $u=u_n$ at *whatever* constant $\pi$ the demand side has chosen. Zero inflation is not privileged by [[#prop-nairu]]; it may be privileged by the costs of inflation in [[macroeconomics/money-and-inflation]], which is a different argument.
:::
:::

::: example An Okun translation {#ex-okun-pc}
Okun’s law is $(Y-Y_n)/Y_n=-2(u-u_n)$ and SRAS is $Y=Y_n+50(P-P^e)$, with $Y_n=1000$ and $P^e=P_{-1}=10$. If $P=10.4$, compute the output gap, $u-u_n$, and — using $\pi=P/P_{-1}-1$ and $\pi^e=0$ because $P^e=P_{-1}$ — the implied $\beta$ in [[#eq-pc]] with $v=0$.
::: solution
$Y=1000+50(0.4)=1020$, so the output gap is $2$ per cent. Then $u-u_n=-0.02/2=-0.01$, an unemployment rate one point below $u_n$. Inflation is $10.4/10-1=0.04$ and $\pi^e=0$, so $0.04=-\beta(-0.01)$ gives $\beta=4$. A steep SRAS (large $\alpha$) would have produced a smaller $P$ movement and a smaller $\beta$ in $(u,\pi)$ space. The translation is [[#eq-pc]] as a rewriting of SRAS, not an independent fact.
:::
:::

## Adaptive versus rational expectations

The content of [[#eq-pc]] depends on $\pi^e$.

**Adaptive expectations.** A simple form is $\pi^e_t = \pi_{t-1}$, or a geometric update $\pi^e_t = \pi^e_{t-1} + \lambda(\pi_{t-1}-\pi^e_{t-1})$. Disinflation then requires a period of $u>u_n$: inflation comes down only as the unemployment gap pulls $\pi$ below $\pi^e$ and $\pi^e$ slowly follows. The **sacrifice ratio** is the cumulative output (or unemployment) gap divided by the fall in inflation.

**Rational expectations.** $\pi^e_t=\E_{t-1}\pi_t$, and the expectation is formed with the correct model. A *credible*, fully anticipated disinflation can then occur with no output gap, if $P$ is free to jump (Sargent 1982, on the ends of the 1920s hyperinflations). If $P$ is sticky, even a credible disinflation costs output, but less than under adaptive expectations, because $\pi^e$ jumps when the policy rule jumps (Ball 1994, *Journal of Monetary Economics*). The **Lucas surprise-supply function** (Lucas 1972, 1973) is SRAS with rational expectations: only unanticipated demand moves $Y$.

::: definition Sacrifice ratio {#def-sacr}
The **sacrifice ratio** is the cumulative percentage-point-years of the output gap (or of $u-u_n$) incurred per percentage-point reduction in inflation. If $\pi^e_t=\pi_{t-1}$ and $v=0$, a reduction of inflation by $\Delta\pi$ that is achieved by a constant gap $\tilde u = u-u_n$ lasting $N$ periods costs $N\tilde u$ point-years of unemployment, and $\Delta\pi = \beta N \tilde u$ from iterating [[#eq-pc]], so the unemployment sacrifice ratio is $1/\beta$.
:::

::: example A disinflation under adaptive expectations {#ex-disinf}
$\beta=0.5$, $u_n=5$ per cent, $\pi$ currently $8$ per cent and expected to remain $8$ per cent. The central bank wants $\pi=2$ per cent. If it holds $u$ at $8$ per cent until inflation has fallen, how many years does it take, and what is the cumulative unemployment gap? What is the sacrifice ratio in unemployment point-years per point of $\pi$?
::: solution
Each year, $\pi_t = 8 - 0.5(8-5)=6.5$ in year 1 if $\pi^e$ starts at $8$ and $u=8$. Then $\pi^e$ becomes $6.5$, year 2 gives $\pi=6.5-1.5=5.0$, year 3 gives $3.5$, year 4 gives $2.0$. Four years at a three-point unemployment gap: $12$ point-years. Inflation has fallen $6$ points, so the ratio is $12/6=2$, which equals $1/\beta$. (The arithmetic is exact here because $\beta\times 3=1.5$ happens to divide $6$ neatly.) A cold-turkey path that put $u$ even higher would shorten $N$ and, under this linear adaptive model, would not change the sacrifice ratio. Under rational expectations plus sticky prices, a more front-loaded, more credible path typically *lowers* the ratio (Ball 1994).
:::
:::

::: warning The Phillips curve is not a menu
A policymaker who treats [[#eq-pc]] as a stable menu, ignoring $\pi^e$, will try to buy low $u$ with a little more $\pi$ and will discover that $\pi^e$ has shifted the menu. That is the 1960s–70s story in the United States and the United Kingdom: $u$ was pushed below what later estimates of $u_n$ would suggest, and inflation rose from the low single digits to the double digits (BLS CPI-U; U.K. ONS RPI/CPI historical series). The opposite error is to treat the vertical long-run curve as a claim about the next quarter, and to conclude that a demand expansion cannot lower $u$ even temporarily. Friedman’s address asserted both the temporary trade-off and the absence of a permanent one. The two claims travel together.
:::

## Supply shocks and the 1970s

The term $v$ in [[#eq-pc]] is not a residual of convenience. An oil-price jump raises firms’ costs and, with sticky wages, raises $\pi$ at a given $u$ — an upward shift of the Phillips curve and a leftward shift of SRAS. The 1973–74 and 1979 oil shocks did exactly that: U.S. CPI inflation peaked near 12 per cent in 1974 and near 13.5 per cent in 1980 (BLS), while $u$ *rose*, which a movement along a stable 1960s Phillips curve could not have produced. Blinder (1979, *Economic Events, Ideas, and Policies*) and Bruno and Sachs (*Economics of Worldwide Stagflation*, 1985) are the standard accounts. A negative $v$ (a productivity boom, a fall in energy prices) shifts the curve down; the mid-1980s and the mid-2010s each had a spell of this kind.

Stagflation — high $\pi$ and high $u$ together — is the empirical wrecking ball for an unaugmented Phillips curve, and the reason $v$ and $\pi^e$ both belong in [[#eq-pc]]. Demand shocks move $\pi$ and $u$ in opposite directions (along the curve); supply shocks move them in the same direction (the curve shifts). That decomposition is the Phillips curve’s main use, and it is only as good as the estimate of $u_n$ and of $\pi^e$.

## Competing views

**Keynesian (1960s).** The Phillips curve is a menu. Policy picks a point. Samuelson and Solow (1960, *American Economic Review*) were explicit that the curve might shift, and they still presented it as a trade-off for the next few years.

**Monetarist / Friedman–Phelps.** The curve is vertical in the long run at $u_n$. Policy cannot peg $u<u_n$. Adaptive expectations make disinflation costly.

**New classical / Lucas.** The curve is $\pi - \E\pi = -\beta(u-u_n)$. Only surprises matter; a systematic policy rule is already in $\E\pi$ and has no output effect. Lucas (1973, *American Economic Review*) reported that the output–inflation trade-off was weaker in countries with more variable inflation, which is what the surprise-supply function predicts.

**New Keynesian.** Prices are sticky because of staggered setting, not because of misperception. The New Keynesian Phillips curve is $\pi_t = \delta \E_t \pi_{t+1} + \kappa x_t + v_t$, with $x_t$ a real marginal-cost or output gap, $\delta$ a discount factor, and $\kappa$ a function of the Calvo reset probability. Credibility still matters, because $\E_t\pi_{t+1}$ appears; disinflation is still costly, because of the stickiness. Clarida, Galí and Gertler (1999, *Journal of Economic Literature*) is the survey; Galí’s textbook is the course that follows this one at the next level.

The four views agree that a *sustained* attempt to hold $u$ below $u_n$ produces rising inflation. They disagree about the cost of a *credible* disinflation and about whether anticipated monetary policy can move $Y$ at all.

## Evidence

**The 1970s and the Volcker disinflation.** U.S. CPI inflation fell from 13.5 per cent in 1980 to 3.2 per cent in 1983 (BLS, annual). The unemployment rate rose from 7.1 per cent in 1980 to 9.7 per cent in 1982 (BLS). Ball (1994) estimated a U.S. sacrifice ratio around $2$ for that episode — two point-years of $u-u_n$ per point of $\pi$ — in the same range as [[#ex-disinf]]. The fall in $\pi$ was faster than a purely backward-looking $\pi^e$ with a small $\beta$ would have implied, which is evidence that $\pi^e$ did some of the work, though not all of it: $u$ did rise.

**Flattening.** Many estimates find a smaller $\beta$ after the 1990s in high-income countries (Blanchard, Cerutti and Summers 2015, IMF working paper; Stock and Watson, various). Possible reasons: better-anchored $\pi^e$, a change in wage-setting, globalisation of goods prices. A flatter curve means a given unemployment gap moves $\pi$ less, which is a blessing for a central bank that wants to run $u$ a little below $u_n$ and a curse for one that wants to bring $\pi$ down with a small gap. The flattening is an estimated reduced form; it is not a theorem, and it may not survive a large, persistent shock — a caution the 2021–23 inflation revived.

**2021–23.** U.S. CPI inflation peaked at 9.1 per cent year-on-year in June 2022 (BLS); euro-area HICP peaked at 10.6 per cent in October 2022 (Eurostat). Unemployment in both economies remained near historically low rates (OECD Employment Outlook 2024, 2025). Readings differ: a demand boom on top of a small $u_n$; a $v$ shock from energy, food and bottlenecks; a de-anchoring of $\pi^e$ that did not, in the event, last. Survey $\pi^e$ (Michigan, ECB SPF, New York Fed SCE) rose and then fell back as realised $\pi$ fell. The episode is too recent to have a settled decomposition, and this chapter does not offer one.

**Cross-country $u_n$.** Japan’s $u$ near 2.5 per cent in 2025 and South Africa’s near 32 per cent in 2024 (World Bank WDI) are not two points on one Phillips curve. They are two natural rates, as [[macroeconomics/unemployment]] argued. Applying [[#eq-pc]] to a country requires an estimate of *that* country’s $u_n$.

## Where this leads

[[macroeconomics/ad-as-and-stabilisation]] puts SRAS together with AD and studies shocks, lags, rules and the Lucas critique. [[business-cycles/nominal-rigidities]] and [[business-cycles/new-keynesian-model]] replace [[#eq-sras]] with Calvo pricing and a three-equation system. Open-economy supply shocks and imported inflation belong to [[international-finance]].

::: history
**1958, A. W. Phillips.** “The Relation Between Unemployment and the Rate of Change of Money Wage Rates in the United Kingdom, 1861–1957” (*Economica*) plotted a downward-sloping scatter that Samuelson and Solow (1960) translated into a U.S. inflation–unemployment menu. **1968, Milton Friedman; 1967–68, Edmund Phelps.** The natural-rate hypothesis and the expectations-augmented Phillips curve. **1972, Robert Lucas.** “Expectations and the Neutrality of Money” (*Journal of Economic Theory*) derived a surprise-supply function from imperfect information, and with it the policy-ineffectiveness of anticipated money. **1980, John Taylor; 1983, Guillermo Calvo.** Staggered wage contracts and a constant-hazard sticky-price model, the two workhorses of New Keynesian supply.
:::

::: summary
- SRAS is $Y=Y_n+\alpha(P-P^e)$. LRAS is vertical at $Y_n$. Sticky wages and sticky prices are the two standard microfoundations.
- The expectations-augmented Phillips curve is $\pi=\pi^e-\beta(u-u_n)+v$. The long-run curve is vertical at $u_n$ once $\pi^e=\pi$.
- Adaptive expectations make disinflation costly; the unemployment sacrifice ratio is $1/\beta$ in the linear case. Rational expectations plus credibility can lower the cost; sticky prices keep it from going to zero.
- Supply shocks shift the Phillips curve and produce stagflation. Demand shocks move $\pi$ and $u$ in opposite directions along the curve.
- Keynesian, monetarist, new classical and New Keynesian views share the vertical long-run curve and disagree about the cost of a credible disinflation and about whether anticipated policy moves $Y$.
:::

## Exercises

::: exercise An SRAS reading {level=1 check="960"}
$Y_n=1000$, $\alpha=20$, $P^e=10$, $P=8$. Compute $Y$. (Enter $Y$.)
::: solution
$Y=1000+20(8-10)=960$.
:::
:::

::: exercise A Phillips reading {level=1 check="2"}
$\pi^e=3$ per cent, $\beta=0.5$, $u_n=5$ per cent, $u=7$ per cent, $v=0$. What is $\pi$, in per cent? (Enter the number without the per cent sign.)
::: solution
$\pi=3-0.5(7-5)=2$ per cent.
:::
:::

::: exercise Okun and SRAS {level=1}
Okun’s law is $(Y-Y_n)/Y_n=-2(u-u_n)$. If $u-u_n=0.02$ and $Y_n=500$, what is $Y$?
::: solution
The output gap is $-4$ per cent, so $Y=0.96\times 500=480$.
:::
:::

::: exercise Adaptive disinflation {level=2}
$\pi^e_t=\pi_{t-1}$, $\beta=0.5$, $u_n=4$ per cent, $\pi_0=10$ per cent. The central bank holds $u=6$ per cent. Compute $\pi_1$, $\pi_2$ and $\pi_3$. How many years until $\pi$ first falls to $4$ per cent or below?
::: solution
Each year the gap $u-u_n=2$ per cent subtracts $\beta\times 2=1$ point from $\pi$. So $\pi_1=9$, $\pi_2=8$, $\pi_3=7$. Reaching $4$ from $10$ takes $6$ years: $\pi_6=4$. Cumulative unemployment gap: $6\times 2=12$ point-years for a $6$-point fall in $\pi$, a sacrifice ratio of $2=1/\beta$.
:::
:::

::: exercise A supply shock {level=2}
Starting from $u=u_n=5$ per cent and $\pi=\pi^e=2$ per cent, a supply shock $v=+3$ per cent hits for one year. If $u$ remains at $u_n$, what is that year’s $\pi$? If the central bank instead holds $\pi$ at $2$ per cent, what $u$ does [[#eq-pc]] require that year?
::: solution
At unchanged $u$, $\pi=2+3=5$ per cent. To hold $\pi=2$, the equation needs $2=2-0.5(u-5)+3$ if $\beta=0.5$, so $0=-0.5(u-5)+3$, $u-5=6$, $u=11$ per cent. A one-year oil shock, fully offset in inflation, is a large unemployment event at this slope. Many central banks in 2022 chose a point in between: some rise in $\pi$, some rise in $u$ relative to a no-shock path. The equation does not pick the point.
:::
:::

::: exercise Rational expectations, flexible prices {level=2}
Under the Lucas surprise-supply function $Y-Y_n=\alpha(\pi-\E\pi)$ and $\E\pi=\pi$ because the monetary expansion is announced and prices are flexible, what is $Y-Y_n$? What does this say about a pre-announced, credible disinflation in a flexible-price model?
::: solution
$Y-Y_n=0$. A pre-announced, credible change in $\mu$ changes $\pi$ and $\E\pi$ together and leaves $Y$ at $Y_n$. That is Sargent’s 1982 account of the 1920s ends of hyperinflation, and it is the new classical benchmark. If prices are sticky, the same announcement still has to grind through unreset prices, and $Y-Y_n$ is not zero.
:::
:::

::: exercise The sacrifice ratio with a flatter curve {level=3}
Suppose $\beta$ falls from $0.5$ to $0.25$ (a flatter Phillips curve). In the linear adaptive model of [[#def-sacr]], what happens to the unemployment sacrifice ratio? What does this imply for a central bank that must reduce $\pi$ by $4$ points? What does it imply for one that is content with $\pi$ at target and is choosing how hard to push $u$ below $u_n$?
::: hint
The sacrifice ratio is $1/\beta$ in that model. The two policy questions reverse the benefit and the cost of a small $\beta$.
:::
::: solution
The sacrifice ratio doubles, from $2$ to $4$. A $4$-point disinflation now costs $16$ unemployment point-years rather than $8$, if expectations remain backward-looking. Flattening is bad news for disinflation. It is milder news — in the same model — for a bank that wants a little extra employment at a stable $\pi$: the inflation *cost* of $u<u_n$ is smaller, but Friedman’s accelerationist logic still says that a *permanent* gap produces a rising $\pi^e$, not a stable one. A flatter curve delays the acceleration; it does not cancel [[#prop-nairu]].
:::
:::

::: exercise From SRAS to the Phillips curve {level=3}
Start from $Y=Y_n+\alpha(P-P^e)$. Assume $P=(1+\pi)P_{-1}$, $P^e=(1+\pi^e)P_{-1}$, and Okun’s law $(Y-Y_n)/Y_n=-\gamma(u-u_n)$. Derive [[#eq-pc]] and give $\beta$ in terms of $\alpha,\gamma,Y_n,P_{-1}$.
::: hint
$P-P^e=(\pi-\pi^e)P_{-1}$. Substitute Okun into SRAS.
:::
::: solution
$Y-Y_n=\alpha(\pi-\pi^e)P_{-1}$. Divide by $Y_n$: $(Y-Y_n)/Y_n=\alpha(P_{-1}/Y_n)(\pi-\pi^e)$. The left-hand side is $-\gamma(u-u_n)$, so $-\gamma(u-u_n)=\alpha(P_{-1}/Y_n)(\pi-\pi^e)$, hence $\pi=\pi^e - \bigl(\gamma Y_n/(\alpha P_{-1})\bigr)(u-u_n)$. Thus $\beta = \gamma Y_n/(\alpha P_{-1})$. A larger Okun coefficient (more unemployment per output gap) or a smaller $\alpha$ (steeper diminishing returns, less wage stickiness) steepens the Phillips curve in $(u,\pi)$ space. The derivation treats $v=0$ and a linearisation of $P/P_{-1}$; a supply shock enters as an additive $v$ on the right-hand side of [[#eq-pc]].
:::
:::
