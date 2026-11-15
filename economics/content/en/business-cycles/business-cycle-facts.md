In February 2020 the U.S. economy was still expanding, as it had been since June 2009. Two months later the National Bureau of Economic Research (NBER) Business Cycle Dating Committee would identify April 2020 as a trough: the shortest recession in the American chronology, and one of the deepest. Real GDP fell by about 10 percent from the fourth quarter of 2019 to the second quarter of 2020 (Bureau of Economic Analysis); the unemployment rate jumped from 3.5 percent in February to 14.8 percent in April (Bureau of Labor Statistics). By contrast the previous recession, dated December 2007 to June 2009, lasted eighteen months, cut real GDP by 4.3 percent from peak quarter to trough quarter, and took unemployment from 5.0 percent to a peak of 10.0 percent in October 2009. Same country, same dating rule, two very different contractions.

A **business cycle** is not a calendar of GDP growth rates. It is a co-movement of many real and nominal series around a slowly moving trend: output, hours, consumption, investment, employment, and usually inflation and credit. This chapter is about measuring that co-movement — how to take the trend out, what the remaining cycle looks like, and how official bodies date turning points. Without the facts, the real business cycle model of [[business-cycles/real-business-cycles]] and the New Keynesian model of [[business-cycles/new-keynesian-model]] have nothing to hit. Notation: $Y_t$ is real output (GDP), $y_t = \ln Y_t$, a hat $\hat x_t$ is a log deviation from a trend or steady state, and $\tilde y_t$ is an **output gap**. Inflation is $\pi_t$. Profit, if it appears, is $\Pi$.

## What a business cycle is

::: definition Business cycle {#def-cycle}
A **business cycle** is a recurrent but not periodic fluctuation of aggregate real activity around a longer-run trend, lasting more than a few months and less than a decade, and shared by many sectors and many series. An **expansion** (or boom) is the phase from trough to peak; a **recession** (contraction) is the phase from peak to trough. A **depression** is a recession that is unusually deep or long; the term is historical, not a separate statistical category.
:::

Burns and Mitchell, in *Measuring Business Cycles* (NBER, 1946), insisted on three properties that still organise the evidence. Fluctuations are **recurrent** — they happen again and again — but not **periodic**: there is no fixed period of seven years, or forty months, that one could set a clock by. They are **pervasive**: industrial production, employment, real income and wholesale–retail sales move together, which is why a dating committee looks at a cluster of series rather than at GDP alone. And they are fluctuations **around a trend**, not the trend itself. U.S. real GDP in 2023 was many times its 1948 level (BEA); the cycle is the wiggle, not the climb.

Two measurement questions follow immediately. First, what is the trend? A linear time trend, a Hodrick–Prescott smooth, a band-pass filter and a Hamilton regression will not give the same cycle, and the choice is a statement about which frequencies one wishes to call "business cycle". Second, when does a decline count as a recession? The newspaper rule of "two consecutive quarters of falling real GDP" is a useful shorthand used by some statistical offices; it is not the NBER's definition, and it would have missed the 2001 U.S. recession, in which GDP was nearly flat.

::: definition Output gap {#def-gap}
The **output gap** at date $t$ is the log deviation of actual output from a measure of **potential** (or trend, or natural) output $Y_t^*$:

$$
\tilde y_t = \ln Y_t - \ln Y_t^* \approx \frac{Y_t - Y_t^*}{Y_t^*}.
$$ {#eq-gap}

A negative gap is slack; a positive gap is activity above the chosen benchmark. The definition is silent on how $Y_t^*$ is constructed: a statistical trend, a production-function estimate of capacity, or the flexible-price level of output in a model are three different objects.
:::

The approximation in [[#eq-gap]] is the usual log-difference: $\ln(1+x)\approx x$ for small $x$. If $Y=97$ and $Y^*=100$, the simple percentage gap is $-3.0$ percent and the log gap is $100\ln(0.97)\approx -3.05$ percent. For gaps of a few percent the two are interchangeable; for the 2020 collapse they are not.

::: example A log-linear trend {#ex-trend}
An eight-year annual series of real GDP is $100, 104, 109, 112, 115, 118, 120, 125$. Fit $y_t = a + b t + u_t$ by ordinary least squares on $t=1,\dots,8$, report the implied trend growth rate, and compute the log cycle $\hat y_t = y_t - \hat a - \hat b t$ in percent.
::: solution
Let $y_t = \ln Y_t$. Ordinary least squares on a constant and $t$ gives $\hat a = 4.588$ and $\hat b = 0.03026$ (computed with a linear-algebra solver; $R^2=0.984$). Trend growth is $e^{\hat b}-1 = 3.07$ percent a year, a little below the sample mean of simple growth rates ($3.24$ percent), because log-linearisation weights the later, larger levels differently from an average of $Y_t/Y_{t-1}-1$. The log cycle, in percent, is

$$
(-1.28,\ -0.38,\ 1.29,\ 0.98,\ 0.59,\ 0.14,\ -1.20,\ -0.15).
$$

Year 3 sits $1.3$ percent above trend; year 7 sits $1.2$ percent below. The series never looks like a recession in the NBER sense — there is no cluster of declining activity — but it already has a cycle once the trend is removed. Changing the sample, or adding a quadratic term, would move those eight numbers.
:::
:::

## Detrending

Every cyclical fact is a joint statement about the data and the filter. Write

$$
y_t = \tau_t + c_t,
$$ {#eq-decomp}

with $\tau_t$ the trend and $c_t$ the cycle. The leading recipes are a deterministic trend, first differences, the Hodrick–Prescott (HP) filter, a band-pass filter, and a direct forecast of the trend such as Hamilton's.

::: definition Hodrick–Prescott filter {#def-hp}
Given a series $y_1,\dots,y_T$ and a smoothing parameter $\lambda>0$, the **Hodrick–Prescott trend** $\{\tau_t\}$ minimises

$$
\sum_{t=1}^{T} (y_t - \tau_t)^2 + \lambda \sum_{t=2}^{T-1}\bigl[(\tau_{t+1}-\tau_t)-(\tau_t-\tau_{t-1})\bigr]^2.
$$ {#eq-hp}

The cycle is $c_t = y_t - \tau_t$. As $\lambda\to 0$ the trend hugs the series; as $\lambda\to\infty$ the trend becomes the OLS linear trend of [[#ex-trend]]. The conventional choice for quarterly data is $\lambda=1600$, proposed by Hodrick and Prescott (discussion paper 1980; *Journal of Money, Credit and Banking* 1997) from a prior that a large cyclical move is about 5 percent a quarter and a large change in the trend growth rate about $1/8$ of a percent.
:::

The first sum in [[#eq-hp]] is a penalty for missing the data; the second is a penalty for changing the slope of the trend. Ravn and Uhlig (*Review of Economics and Statistics*, 2002) showed that to keep the same frequency cutoff when the sampling rate changes one should scale $\lambda$ with the fourth power of the frequency ratio: $\lambda_{\text{annual}}\approx 6.25$ and $\lambda_{\text{monthly}}\approx 129\,600$ if one starts from $1600$ at quarterly frequency. An older convention used $\lambda=100$ annually and $\lambda=14\,400$ monthly; those numbers are still common in applied work, so a table of "HP-filtered volatilities" is not comparable across papers until $\lambda$ is stated.

::: proposition HP filter as a linear smoother {#prop-hp-linear}
The HP trend is the unique solution of the sparse linear system $(I + \lambda D^\top D)\boldsymbol\tau = \mathbf{y}$, where $D$ is the $(T-2)\times T$ second-difference matrix with rows $(1,-2,1)$ along the diagonal. The cycle is therefore a two-sided moving average of the whole sample: $c_t$ depends on $y_1,\dots,y_T$, including observations after $t$.
:::
::: proof
The objective [[#eq-hp]] is a strictly convex quadratic in $\boldsymbol\tau$. Differentiating with respect to $\tau_t$ and stacking the first-order conditions produces $I\boldsymbol\tau + \lambda D^\top D\boldsymbol\tau = \mathbf{y}$. The matrix $I+\lambda D^\top D$ is positive definite, hence invertible. Each row of the inverse has non-zero entries on both sides of the current date, so the filter is two-sided.
:::

Two-sidedness is convenient for describing history and poisonous for real-time policy. At the end of the sample the filter has no future to average over, so the latest "gap" jumps whenever a new observation arrives — the **end-point problem**. Hamilton (*Review of Economics and Statistics*, 2018) added three further objections: the HP cycle of an integrated series has spurious dynamics; a statistical estimate of $\lambda$ is typically far below $1600$; and a regression of $y_{t+h}$ on a few recent lags of $y$ produces a cycle with none of those artefacts. The profession has not abandoned HP — most of the stylised facts below were originally stated with it — but a serious paper now reports more than one filter.

A **band-pass filter** (Baxter and King, *Review of Economics and Statistics* 1999; Christiano and Fitzgerald, *International Economic Review* 2003) is more explicit about frequencies. Burns and Mitchell thought of cycles as lasting from $1.5$ to $8$ years; a band-pass keeps those periods and drops both the slow trend and the high-frequency noise. First differences, $y_t-y_{t-1}$, keep everything except a zero-frequency trend and overweight the highest frequencies. None of these objects is the output gap of a model. In [[business-cycles/new-keynesian-model]] the gap $\tilde y_t$ is the deviation of output from the level that would prevail with flexible prices; that natural level can itself be cyclical.

::: widget plot
f: a + b*x; a + b*x + c*sin(2*pi*x/p)
sliders: a=2:1:3; b=0.03:0:0.06; c=0.04:0:0.12; p=8:4:16
x: 0, 40
y: 1.5, 4.2
labels: \text{trend}; \text{series}
caption: The upper curve is a linear trend plus a sine wave standing in for the cycle. Raise the amplitude $c$ until the oscillations are obvious; then shorten the period $p$ and notice that a filter which treats eight-year swings as "trend" would absorb them. The HP penalty $\lambda$ is a choice of which of those swings count as $\tau_t$.
:::

::: example Five observations and $\lambda=6.25$ {#ex-hp-small}
For the annual series $(2.0,\ 2.2,\ 1.9,\ 2.3,\ 2.1)$ compute the HP trend and cycle at $\lambda=6.25$.
::: solution
Solve $(I+6.25\, D^\top D)\boldsymbol\tau = \mathbf{y}$ with $T=5$. The trend is $(2.039,\ 2.072,\ 2.098,\ 2.133,\ 2.158)$ and the cycle is $(-0.039,\ 0.128,\ -0.198,\ 0.167,\ -0.058)$, all to three decimals. The middle observation $1.9$ is $0.20$ below trend; the filter has used the neighbouring $2.2$ and $2.3$ to decide that $1.9$ is a dip rather than a shift in slope. With only five points the two-sidedness is extreme — every cycle observation is using almost the whole sample — which is why textbook illustrations of HP use long quarterly series.
:::
:::

::: warning The filter is part of the fact
Reporting that "investment is three times as volatile as GDP" without naming the filter, the sample and whether the series are logs is not a fact, it is a mood. Stock and Watson's U.S. postwar HP moments, the OECD's band-passed CLI, and a growth-rate standard deviation from the IMF *World Economic Outlook* database are three different numbers. Always write $\lambda$, the dates and the transformation.
:::

## Stylised facts

A **stylised fact** is an empirical regularity robust enough to survive a few changes of sample and filter, not a theorem. The postwar industrial-country list, assembled by Kydland and Prescott (*Federal Reserve Bank of Minneapolis Quarterly Review*, 1990), Backus and Kehoe (*American Economic Review*, 1992) and Stock and Watson (NBER Macroeconomics Annual, 1999), is still the target for quantitative models.

::: definition Cyclical moments {#def-moments}
For HP-filtered logs, the **relative volatility** of a series $x$ is $\sigma_x/\sigma_y$, the ratio of standard deviations. The series is **procyclical** if $\operatorname{corr}(c^x, c^y)>0$, **countercyclical** if the correlation is negative, and **acyclical** if it is near zero. **Persistence** is $\operatorname{corr}(c^y_t, c^y_{t-1})$.
:::

The following regularities hold, with the usual caveats, for the United States, the large western European economies, Japan and several other OECD members on quarterly data since the 1960s, HP-filtered with $\lambda=1600$.

1. **Amplitudes are modest most of the time.** The standard deviation of the U.S. HP-filtered log GDP cycle is on the order of $1.5$ percent in the Great Moderation sample (mid-1980s to 2007; Stock and Watson 2002). Recessions of 2008–09 and 2020 sit in the tails.
2. **Consumption of non-durables and services is less volatile than GDP**; **investment is more volatile**, typically by a factor of two to four; **government purchases** are weakly procyclical or acyclical; **net exports** are countercyclical in most industrial countries (Backus, Kehoe and Kydland, *Journal of Political Economy* 1992). Durables consumption behaves more like investment.
3. **Hours and employment are procyclical.** The split between hours per worker and employment varies: Europe has used hours more, the United States employment more. Labour productivity (output per hour) is procyclical in raw U.S. data — a fact RBC models were built to match — but the correlation is sample-dependent and identification of technology shocks is not a moment (see [[business-cycles/real-business-cycles]]).
4. **Real wages are mildly procyclical or acyclical**, not the strongly countercyclical real wage of a Keynesian labour-demand story with a fixed labour supply. That is a genuine problem for both a purely demand-driven labour market and a purely technology-driven one; the evidence does not pick a winner by itself.
5. **Inflation and the price level.** In the Burns–Mitchell sample and through the 1970s inflation was procyclical (the Phillips correlation of [[macroeconomics/aggregate-supply]]). From the mid-1980s, in many inflation-targeting countries, the correlation of HP-filtered inflation with the GDP cycle weakened; Stock and Watson (1999) already documented the change for the United States. The 2021–23 inflation surge, coming as activity rebounded from 2020, restored a procyclical reading in several countries — a reminder that "the" cyclical behaviour of prices is a regime, not a constant.
6. **Persistence.** First-order autocorrelations of HP-filtered GDP are around $0.8$–$0.9$ at quarterly frequency, so a half-life of a typical shock, if one pretends the cycle is AR(1) with root $0.85$, is on the order of a year. The filter itself induces some of that persistence (another Hamilton 2018 point).
7. **International co-movement.** Output cycles of large industrial economies are positively correlated, more so for countries that trade more (Imbs, *Review of Economics and Statistics* 2004). Consumption is *less* correlated across countries than output is — the Backus–Kehoe–Kydland quantity anomaly relative to a complete-markets benchmark, taken up in [[international-finance/current-account]].

Emerging and developing economies are not a scaled-down version of this list. Aguiar and Gopinath (*Journal of Political Economy*, 2007) documented that in many emerging markets the cycle is more volatile, consumption is often *more* volatile than output, and the trade balance is strongly countercyclical. They interpreted the pattern as shocks to trend growth rather than to a stationary cycle; subsequent work (García-Cicco, Pancrazi and Uribe, *American Economic Review* 2010, on Argentina) has argued that financial frictions can produce the same moments without a trend shock. Both readings will return in [[business-cycles/financial-frictions]]. Africa, South Asia and parts of the Middle East have shorter reliable quarterly national accounts; annual Maddison and Penn World Table data still show large swings associated with commodity prices, conflict and policy crises (World Bank WDI; IMF WEO). A theory calibrated only to the United States is a theory of one economy.

::: example Relative volatilities in a constructed sample {#ex-moments}
Ten HP-style cyclical observations (in percent) on output are
$-1.2,\ 0.5,\ 1.8,\ -0.4,\ 2.1,\ -2.5,\ 0.8,\ 1.1,\ -1.5,\ 0.3$.
Cyclical consumption is $0.7$ times output plus a small residual $(0.10,-0.20,0.15,0.05,-0.10,0.20,-0.05,0.10,0.00,-0.15)$; cyclical investment is $2.5$ times output plus $(0.30,-0.40,0.20,0.10,-0.20,0.50,-0.10,0.20,0.00,-0.30)$. Compute the sample standard deviations, relative volatilities and correlations of consumption and investment with output.
::: solution
The sample standard deviation of output is $1.485$. Consumption has standard deviation $0.997$ and relative volatility $0.67$; the correlation with output is $0.99$. Investment has standard deviation $3.579$ and relative volatility $2.41$; the correlation is $1.00$ at two decimals. The constructed series were built to mimic the textbook pattern — consumption smoother than GDP, investment two-to-three times more volatile, both procyclical — not to estimate an economy. A single residual draw this small is not a sampling experiment; it is arithmetic that makes the definitions in [[#def-moments]] concrete.
:::
:::

::: quiz
Which statement is a stylised fact of postwar industrial-country quarterly data, HP-filtered, rather than a theorem?
- [ ] Investment is less volatile than GDP because of consumption smoothing.
- [x] Investment is more volatile than GDP, and consumption of non-durables is less volatile than GDP.
- [ ] Real wages are strongly countercyclical.
- [ ] Net exports are procyclical in most OECD economies.
::: solution
Relative volatilities and the sign of net exports are empirical regularities (Backus–Kehoe–Kydland and Stock–Watson). They are not implied by consumption smoothing alone: smoothing predicts a smooth *consumption* path, and investment then has to absorb shocks to output, but that is a model, not a fact. Real wages are mildly procyclical or acyclical, not strongly countercyclical. Net exports are typically countercyclical.
:::
:::

## Dating recessions

The NBER Business Cycle Dating Committee, currently a small group of academic macroeconomists, does not use a formula. Its 2021 statement (and the 2008 statement for the previous recession) defines a recession as a *significant decline in economic activity that is spread across the economy and lasts more than a few months*, visible in real GDP, real income, employment, industrial production and wholesale–retail sales. Peaks and troughs are months, not quarters. The committee waits for data revisions; the June 2009 trough was announced in September 2010.

::: definition NBER peak and trough {#def-nber}
An NBER **peak** is the last month of an expansion; the following month is the first month of recession. An NBER **trough** is the last month of recession. The chronology does not require two consecutive quarters of falling real GDP, does not use a fixed threshold on the unemployment rate, and does not produce an output gap.
:::

Recent U.S. turning points, from the NBER chronology, are worth having in one place.

| peak | trough | duration (months) | notes |
|---|---|---|---|
| January 1980 | July 1980 | 6 | brief; inflation still high |
| July 1981 | November 1982 | 16 | Volcker disinflation; unemployment peaked at 10.8 percent |
| July 1990 | March 1991 | 8 | oil-price spike, savings-and-loan stress |
| March 2001 | November 2001 | 8 | investment bust; GDP nearly flat |
| December 2007 | June 2009 | 18 | financial crisis; real GDP $-4.3$ percent peak-to-trough |
| February 2020 | April 2020 | 2 | pandemic shutdown; unemployment 14.8 percent in April 2020 |

Sources: NBER Business Cycle Dating Committee announcements; BEA for the 2007–09 GDP drop; BLS for unemployment peaks. No recession has been dated between April 2020 and the time of writing (2026).

Other jurisdictions date differently. Statistics Canada and the CEPR Euro Area Business Cycle Dating Committee use related judgemental procedures. Several countries and the popular press use **two consecutive quarters of negative real GDP growth**; that rule is transparent and fast, and it is not equivalent to the NBER rule. The 2001 U.S. recession had no two-quarter GDP streak in the currently published BEA accounts; the 2020 recession was obvious on any rule.

The OECD's **Composite Leading Indicators** (CLI) are a different object again: they are designed to anticipate turning points in the growth cycle (deviations from trend), not to date classical recessions after the fact. A CLI crossing its long-term trend of $100$ is a signal, not an official recession. The IMF *World Economic Outlook* does not date national recessions; it reports annual (and some quarterly) growth, inflation and gaps, and it has at times used a rule of thumb that a **global recession** is a year in which world real GDP per capita falls (IMF WEO, April 2009, on 2009; the Fund's subsequent discussions of 2020). World output grew $3.3$ percent in 2023 and was projected at $3.2$ percent in 2024 (IMF WEO, October 2024) — a slow expansion by pre-2008 standards, not a recession. Those WEO numbers are forecasts when they refer to the future and outturns when they refer to the past; they are not a cycle chronology.

::: intuition Peaks are months because employment is monthly
GDP is a quarterly integral. Employment, industrial production and sales are monthly. A committee that waited for two GDP quarters would have dated 2020 as a one-quarter event and would have been a year late on 2008. Using several monthly series is how Burns and Mitchell thought about diffusion: a recession is when the *typical* activity series has turned down, not when one noisy aggregate has.
:::

::: example Two-quarter rule versus the NBER {#ex-two-quarter}
Quarterly real GDP growth (percent, not annualised) in a fictional economy is $0.6,\ 0.4,\ -0.1,\ 0.2,\ -0.3,\ -0.4,\ 0.1$. Which quarters would a two-consecutive-quarters rule mark as recession, and why might a dating committee disagree?
::: solution
The only pair of consecutive negative quarters is the fifth and sixth ($-0.3$ and $-0.4$). A two-quarter rule therefore dates a recession covering those two quarters, with a peak at the end of quarter 4 and a trough at the end of quarter 6. A committee looking at employment might have seen a peak already in quarter 3, when GDP dipped $0.1$ percent, if payrolls had already been falling; or it might have waited, if the $0.2$ percent bounce in quarter 4 had been matched by a bounce in hours. The rule and the committee are different estimators of the same informal idea — a broad, persistent decline — and they will sometimes split.
:::
:::

## The output gap and Okun's law

Potential output $Y_t^*$ in [[#def-gap]] is not observed. Statistical agencies publish gaps anyway, because fiscal and monetary policy need a slack measure. The U.S. Congressional Budget Office constructs a production-function potential (labour force, NAIRU, capital, trend productivity). The OECD and the IMF publish output gaps for member countries in the *Economic Outlook* and the WEO, typically from a production function or an HP-style filter, revised every vintage. A 2023 gap of "$-0.5$ percent of potential GDP" in an OECD table is a model output, not a measurement like a CPI index.

**Okun's law** is the empirical relation between the output gap and the unemployment gap. Arthur Okun (1962, Cowles Foundation; popularised in his 1970 essays) wrote, for the United States of his time,

$$
u_t - u_t^* \approx -\beta\, \tilde y_t,
$$ {#eq-okun}

with $\beta$ on the order of $1/2$ when $\tilde y$ is in percent: a $2$ percent negative output gap went with $1$ percentage point of extra unemployment. The coefficient is not a structural parameter. It has been smaller in some U.S. recoveries (the "jobless" recoveries after 1991 and 2001) and it differs across countries with different labour-market institutions (Ball, Leigh and Loungani, IMF Working Paper 2013). Using $\beta=0.5$ as a back-of-envelope is reasonable; treating it as a law of nature is not.

::: example Okun's arithmetic {#ex-okun}
In a country whose Okun coefficient is $\beta=0.5$, unemployment is $6.5$ percent and the estimated natural rate is $4.5$ percent. What output gap does Okun's law imply? If instead $\beta=0.4$, as in some European estimates, what gap?
::: solution
From [[#eq-okun]], $\tilde y = -(u-u^*)/\beta = -2.0/0.5 = -4$ percent of potential. With $\beta=0.4$ the same unemployment gap implies $\tilde y = -2.0/0.4 = -5$ percent. A looser Okun link (smaller $\beta$) means a given unemployment gap corresponds to *more* missing output, because employment (or hours) responds less to output. The calculation is only as good as $u^*$ and $\beta$; both are estimated.
:::
:::

::: widget sequence
a: 1.5*(0.85)^n
N: 24
mode: terms
limit: 0
start: 0
caption: An AR(1) cycle $c_t = 0.85 c_{t-1}$ starting at $1.5$ percent, a crude picture of persistence after a one-off shock. The half-life is $\ln 0.5/\ln 0.85 \approx 4.3$ quarters. Change nothing here — there is no slider — but compare the decay with the HP sine wave above: real cycles are irregular, not a single root and not a single period.
:::

## Evidence from several regions

The facts above were written for industrial countries because that is where quarterly national accounts, labour-force surveys and price indexes have the longest overlap. A few dated cross-checks keep the sample from collapsing to the United States.

- **Euro area.** The CEPR dating committee identified a recession from 2008 Q1 to 2009 Q2 and a second from 2011 Q3 to 2013 Q1 (the sovereign-debt double dip), which a U.S.-style single-recession narrative would miss. Eurostat real GDP in the euro area fell about 5.8 percent peak-to-trough in 2008–09.
- **Japan.** The 1990s and 2000s produced several shallow recessions around a much slower trend than 1950–90 (Cabinet Office; IMF WEO). Dating the cycle and dating "stagnation" are different exercises; [[business-cycles/zero-lower-bound]] takes up the monetary side.
- **China.** Official annual real GDP growth has not been negative in the published post-1978 series (National Bureau of Statistics; World Bank WDI), but growth *cycles* — accelerations and slowdowns around a fast trend — are first-order, and 2020 recorded the weakest official annual growth in decades. An HP filter on a 6–10 percent trend will still extract a cycle.
- **India, Brazil, South Africa, Turkey.** Emerging-market cycles in the 1990s and 2000s were dominated by sudden stops and commodity prices (IMF WEO historical; see also the Aguiar–Gopinath moments). Volatility of consumption relative to GDP is often above one.
- **Commodity exporters.** Chile, Nigeria, Russia and Australia show terms-of-trade driven cycles; real exchange rates and fiscal balances co-move with export prices (IMF *World Economic Outlook* and *Fiscal Monitor*, various issues). That is a different shock process from a U.S. technology or demand shock, not a different definition of a cycle.

None of these observations is a forecast. Vintage matters: OECD and IMF output gaps for 2007 looked small in 2007 and look larger in later vintages once the trend was revised down after the financial crisis (Orphanides and van Norden, *Journal of Money, Credit and Banking* 2002, on real-time gap errors).

## Where this leads

A table of moments is a target, not an explanation. [[business-cycles/real-business-cycles]] asks how far a competitive equilibrium with technology shocks, labour supply and capital can go in matching relative volatilities and co-movement when prices are flexible. [[business-cycles/nominal-rigidities]] and [[business-cycles/new-keynesian-model]] ask what changes when prices are sticky, so that demand shocks and monetary policy can move $\tilde y$ and $\pi$. Dating 2008–09 as an NBER recession does not decide whether the impulse was a technology shock, a financial shock or a demand shock; that is the subject of [[business-cycles/financial-frictions]]. The output gap of this chapter is a statistical object; the gap in the New Keynesian Phillips curve is a model object. Keeping the two separate is the main discipline the rest of the course requires.

::: history
**1946, Arthur F. Burns and Wesley C. Mitchell.** *Measuring Business Cycles* (NBER) turned turning-point dating into a reproducible, judgemental procedure on a cluster of monthly series. The NBER's subsequent committee still cites that book. **1980/1997, Robert J. Hodrick and Edward C. Prescott.** Their filter, circulated at Carnegie Mellon and Minnesota in 1980 and published in 1997, became the default trend–cycle split in quantitative macroeconomics, for better and — as Hamilton argued in 2018 — for worse.
:::

::: summary
- A business cycle is recurrent, irregular co-movement of many series around a trend; a recession is a broad, persistent decline, not a two-quarter GDP rule.
- Every cyclical moment depends on the detrending method. The HP filter with $\lambda=1600$ (quarterly) is the conventional default; it is two-sided and has an end-point problem.
- In industrial-country quarterly data, consumption is smoother than GDP, investment is more volatile, hours are procyclical, and net exports are typically countercyclical. Emerging-market cycles are more volatile and often have consumption *more* volatile than GDP.
- The NBER dates monthly peaks and troughs from several indicators (most recently February–April 2020 and December 2007–June 2009). The OECD CLI and the IMF WEO answer different questions.
- The output gap $\tilde y_t$ is defined only once potential output is. Okun's law links it to unemployment with a coefficient that is not structural.
:::

## Exercises

::: exercise Log gap versus percentage gap {level=1 check="-5.13"}
If $Y=95$ and $Y^*=100$, compute the log output gap $100\ln(Y/Y^*)$ to two decimal places. (Enter that number, with the minus sign.)
::: solution
$100\ln(0.95) = 100\times(-0.051293)= -5.13$ to two decimals. The simple percentage gap is $-5.00$ percent. The difference is no longer negligible.
:::
:::

::: exercise Two-quarter dating {level=1}
Quarterly growth rates (percent) are $0.3,\ -0.2,\ 0.1,\ -0.4,\ -0.3,\ 0.2$. Under a two-consecutive-quarters rule, which quarters are in recession?
::: solution
Quarters 4 and 5 are the only consecutive negative pair ($-0.4$ and $-0.3$). Quarter 2 is an isolated negative and does not count under this rule.
:::
:::

::: exercise Okun with $\beta=0.5$ {level=1 check="-3"}
Unemployment is $7.0$ percent, $u^*=5.5$ percent, and $\beta=0.5$ in [[#eq-okun]]. What output gap, in percent of potential, does Okun's law imply? (Enter the signed number.)
::: solution
$\tilde y = -(7.0-5.5)/0.5 = -3$.
:::
:::

::: exercise Relative volatility {level=2}
HP-filtered log investment has sample standard deviation $4.8$ percent; HP-filtered log GDP has $1.6$ percent. Consumption's standard deviation is $1.2$ percent. Report the two relative volatilities and say whether they match the industrial-country stylised pattern.
::: solution
Investment relative to GDP: $4.8/1.6=3.0$. Consumption relative to GDP: $1.2/1.6=0.75$. Yes: investment is several times more volatile than GDP, consumption less volatile.
:::
:::

::: exercise HP penalty intuition {level=2}
Explain, without formulas, what happens to the HP cycle of a series that contains a permanent drop in the *growth rate* (a trend break) if $\lambda$ is very large, and if $\lambda$ is near zero.
::: solution
Very large $\lambda$ forces the trend toward a single straight line, so a permanent growth-rate drop is dumped into the cycle: the cycle will look like a long, growing gap. Near-zero $\lambda$ lets the trend follow the series, so the break is absorbed into $\tau_t$ and the cycle stays small. That is why a slowdown in trend growth (Japan after 1990; parts of southern Europe after 2008) can be misread as a huge, persistent output gap if the filter is too stiff.
:::
:::

::: exercise AR(1) half-life {level=2 check="7"}
If the cycle follows $c_t = 0.9 c_{t-1}+\varepsilon_t$, how many quarters is the half-life $\ln 0.5/\ln 0.9$, rounded to the nearest integer? (Enter that integer.)
::: solution
$\ln 0.5/\ln 0.9 \approx 6.58$, which rounds to $7$ quarters.
:::
:::

::: exercise NBER versus GDP {level=3}
The 2001 U.S. recession is dated March–November 2001 by the NBER, yet currently published quarterly real GDP does not show two consecutive negative quarters around that date. Using [[#def-nber]], explain how that can happen and what it implies for using GDP as a real-time recession detector.
::: hint
Think about which series the committee lists, about data revisions, and about a shallow recession concentrated in investment and employment.
:::
::: solution
The NBER definition requires a significant, diffused, persistent decline, not a GDP rule. In 2001 payroll employment and industrial production fell while GDP was cushioned by consumption; the product-side and income-side GDP estimates also disagreed in real time. Subsequent BEA revisions changed the quarterly profile. A mechanical two-quarter GDP rule is then both too slow (it waits for two quarters and for revisions) and too narrow (it ignores employment). The episode is a reason the committee exists, not a reason to ignore GDP: GDP remains the best single summary of activity, just not a dating algorithm.
:::
:::

::: exercise Emerging-market moments {level=3}
Aguiar and Gopinath (2007) found that in many emerging markets consumption is *more* volatile than output and the trade balance is strongly countercyclical. Contrast this with the OECD pattern, and give two competing interpretations that later chapters will return to.
::: hint
Trend shocks versus financial frictions; think also of limited consumption insurance and commodity income.
:::
::: solution
In the OECD list, non-durable consumption is smoother than GDP and net exports are only moderately countercyclical. In several emerging markets $\sigma_C/\sigma_Y>1$ and net exports swing sharply into surplus in recessions (export volumes and collapsing imports). Interpretation 1: shocks to the *trend* growth rate (Aguiar–Gopinath) make households revise permanent income, so consumption moves at least as much as current output. Interpretation 2: domestic financial frictions and sudden stops (García-Cicco, Pancrazi, Uribe 2010; the apparatus of [[business-cycles/financial-frictions]]) force consumption to track current income and force net exports to adjust when capital inflows reverse. Commodity-price shocks can mimic either. The moments do not by themselves choose the interpretation.
:::
:::
