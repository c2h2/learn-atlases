In 2008–09, and again in 2020, governments spent on a scale that peacetime budgets had not seen, and central banks cut policy rates toward zero and bought assets. In 2021–23 many of the same economies saw inflation rates not observed since the 1980s. **Macroeconomic policy** is the attempt to stabilise aggregate activity and the price level with two instruments: **fiscal policy** (government spending and taxes) and **monetary policy** (the policy rate, and sometimes the quantity of base money and the composition of the central bank’s balance sheet). This chapter is a first look: the quantity theory of money, a Keynesian multiplier, aggregate demand and aggregate supply, and the limits of each instrument. It is not a forecast, not a recommendation of any policy mix, and not investment advice.

The measurement of $Y$, $P$ and unemployment was the previous chapter. The question here is why they move together in the short run, and what a government or a central bank can do about that.

## Money and the quantity theory

::: definition Money {#def-money}
**Money** is the generally accepted medium of exchange in an economy, and typically also a unit of account and a store of value. The **monetary base** is currency in circulation plus reserves at the central bank. Broader aggregates (**M1**, **M2**, …) add deposits and other liquid instruments, on definitions that vary by country. The **velocity** of a monetary aggregate $M$ is $V = PY/M$, the number of times a unit of $M$ turns over against nominal GDP in a period.
:::

The **quantity equation** is the identity

$$
MV = PY.
$$ {#eq-quantity}

It becomes a theory when $V$ and $Y$ are pinned down. The **quantity theory of money**, in its strict form, takes $V$ as constant (or independently determined) and $Y$ as at its full-employment level in the long run. Then a change in $M$ becomes a proportional change in $P$.

::: proposition Quantity theory (strict) {#prop-qtm}
If $V$ and $Y$ are fixed, then $\%\Delta M = \%\Delta P$. Inflation is, in that case, a monetary phenomenon: a sustained rise in $P$ requires a sustained rise in $M$ relative to $Y$.
:::

::: proof
Take logs of [[#eq-quantity]] and differentiate: $\%\Delta M + \%\Delta V = \%\Delta P + \%\Delta Y$. With $\%\Delta V = \%\Delta Y = 0$, the claim follows.
:::

::: example A doubling of $M$ {#ex-qtm}
$M = 200$, $V = 4$, $Y = 400$. (a) Find $P$. (b) If $M$ rises to 240 and $V$ and $Y$ are unchanged, find the new $P$ and the inflation rate.
::: solution
(a) $P = MV/Y = 800/400 = 2$. (b) $P' = 960/400 = 2.4$. Inflation $= 0.4/2 = 20$ per cent, equal to the 20 per cent rise in $M$.
:::
:::

The strict theory is a long-run benchmark. In the short run $V$ moves (people hoard money in a panic; they spend faster when inflation is expected) and $Y$ moves (the next sections). Hyperinflations — Germany 1923, Zimbabwe 2007–08, Venezuela in the late 2010s — are the cases in which the monetary story is overwhelming: the price level rose by orders of magnitude as the authorities financed deficits by creating base money (see, among many, Sargent, 1982, on the end of four 1920s hyperinflations). Moderate inflations have a more mixed accounting: oil shocks, bottlenecks, and fiscal-monetary interaction as well as $M$.

The **Fisher relation** links nominal and real interest rates: $i \approx r + \pi^e$, where $i$ is the nominal rate, $r$ the real rate, and $\pi^e$ expected inflation. A central bank that sets $i$ is, given $\pi^e$, setting $r$. When $\pi^e$ is unstable, the same $i$ can mean very different real rates.

::: example Two real rates {#ex-fisher}
A borrower faces a nominal interest rate of 9 per cent. In economy A, expected inflation is 7 per cent; in economy B, expected inflation is 1 per cent. Compute the approximate real rate in each. In which economy is borrowing, in real terms, more expensive?
::: solution
In A, $r \approx 9 - 7 = 2$ per cent. In B, $r \approx 9 - 1 = 8$ per cent. Borrowing is more expensive in B, even though the quoted (nominal) rate is the same. A comparison of “the interest rate” across high-inflation and low-inflation years that forgets this split is a comparison of the wrong number.
:::
:::

::: warning Nominal interest is not the real cost of borrowing
A 10 per cent nominal interest rate with 8 per cent expected inflation is a 2 per cent real rate, roughly; the same 10 per cent with expected deflation of 2 per cent is a 12 per cent real rate. Indexing, inflation-linked bonds, and the Fisher relation are the ways to keep the two apart. Policy discussion that quotes only the policy rate, without inflation, is quoting the wrong relative price for goods today versus goods tomorrow.
:::

## Aggregate demand, the multiplier, and fiscal policy

In a simple Keynesian cross, with a closed economy, no inflation, and a fixed price level, output is determined by demand:

$$
Y = C(Y-T) + I + G,
$$

where $C$ is consumption of disposable income $Y-T$, with **marginal propensity to consume** $\mathrm{MPC} = C' \in (0,1)$. If $C = c_0 + c(Y-T)$ and $I$ is given,

$$
Y = \frac{1}{1-c}\bigl(c_0 - cT + I + G\bigr).
$$ {#eq-multiplier}

The **multiplier** $1/(1-c)$ says how much $Y$ rises when $G$ (or $I$, or $c_0$) rises by one, with $T$ fixed.

::: example A spending multiplier {#ex-multiplier}
$\mathrm{MPC} = 0.75$, so the multiplier is 4. Government purchases rise by 10, with taxes fixed, and $I$ is unchanged. By how much does $Y$ rise in this model? What if the 10 is instead a tax cut, with $G$ fixed?
::: solution
$\Delta Y = 4 \times 10 = 40$. A tax cut of 10 raises disposable income by 10 at the first round, of which 7.5 is consumed, so the autonomous injection is $c\times 10 = 7.5$ and $\Delta Y = 4\times 7.5 = 30$. The tax multiplier is $-c/(1-c) = -3$ here, smaller than the spending multiplier because the first round is partly saved.
:::
:::

::: widget sequence
a: 10*(0.75)^(n-1)
N: 16
mode: sums
limit: 40
caption: The spending multiplier as a series. An extra 10 of $G$ is income for someone, who spends 7.5, which is income for someone else, who spends 5.625, and so on. Partial sums approach $10/(1-0.75) = 40$. Raise, in your head, the leakage $1-c$: the sequence decays faster and the limit falls.
:::

The multiplier is a model, not a measurement. Estimated fiscal multipliers in the empirical literature range from near zero to above 2, depending on the state of the cycle (larger when unemployment is high and the policy rate is at its floor), on whether the exchange rate floats, on whether monetary policy offsets, and on the instrument (purchases versus taxes versus transfers). Ramey (2011, *Journal of Economic Literature*) and the subsequent narrative and local-projection literatures are the place to read the dispute. This course records the range and does not pick a number for “the” multiplier.

**Automatic stabilisers** — unemployment benefits, a progressive tax — move $G$ up and $T$ down when $Y$ falls, without a new statute. **Discretionary** fiscal policy is a new statute. The limits of discretion are lags (recognition, legislation, implementation), political economy, and public debt. Gross government debt as a share of GDP, in 2023, was about 122 per cent in the United States (IMF WEO, general government), about 264 per cent in Japan, about 88 per cent in India, about 85 per cent in Brazil, and about 56 per cent in Nigeria (IMF World Economic Outlook database, accessed 2026). Those ratios are not a verdict on any particular extra pound of spending; they are a constraint that later courses, in [[macroeconomics]] and [[public-economics]], treat as a solvency and a risk-premium issue.

## Aggregate supply and the short-run trade-off

**Aggregate demand** (AD) is the $(P, Y)$ pairs at which the goods and money (or rate) markets both clear; it slopes down, in the standard story, because a higher $P$ cuts real balances, raises the interest rate, and crowds out $I$ (and, in an open economy, cuts net exports). **Short-run aggregate supply** (SRAS) slopes up if some wages or prices are sticky, so that a higher $P$ raises real output. **Long-run aggregate supply** (LRAS) is vertical at potential output $Y^*$, determined by technology, capital and labour, as in the classical quantity-theory world.

::: definition AD–AS equilibrium {#def-adas}
A **short-run macroeconomic equilibrium** is a pair $(Y, P)$ on both AD and SRAS. A **long-run equilibrium** also has $Y = Y^*$ on LRAS. A **demand shock** shifts AD; a **supply shock** (oil, a pandemic that closes sectors, a productivity jump) shifts SRAS and possibly LRAS.
:::

A fall in AD — a collapse of $I$, a cut in $G$, a monetary tightening, a fall in export demand — lowers $Y$ and $P$ in the short run. Unemployment rises cyclically. A leftward shift of SRAS raises $P$ and lowers $Y$: **stagflation**, the 1970s combination that a pure AD story does not produce.

::: widget plot
f: 16-0.5*x; 4+0.5*x
x: 0, 28
y: 0, 22
vlines: 12
labels: \text{AD}; \text{SRAS}
caption: A sketch of AD–AS. Short-run equilibrium is where AD meets SRAS, at $Y = 12$, $P = 10$. The vertical line is LRAS at potential $Y^* = 12$. Imagine shifting AD down (subtract a constant from the first function): $Y$ and $P$ both fall in the short run. Imagine shifting SRAS up: $P$ rises and $Y$ falls. The figure is a teaching sketch, not an estimated model of any country.
:::

::: example A demand-led recession {#ex-recession}
AD is $P = 16 - 0.5Y$, SRAS is $P = 4 + 0.5Y$, LRAS at $Y^* = 12$. (a) Confirm the short-run equilibrium is at potential. (b) AD shifts to $P = 13 - 0.5Y$. Find the new short-run $(Y, P)$. Is there a recessionary gap?
::: solution
(a) $16 - 0.5Y = 4 + 0.5Y$ gives $12 = Y$, $P = 10$. (b) $13 - 0.5Y = 4 + 0.5Y$ gives $9 = Y$, $P = 8.5$. Output is 3 below potential: a recessionary gap. Unemployment, on Okun-type arithmetic, would rise. In the long run, if wages fall, SRAS shifts down until $Y$ returns to 12 at a still lower $P$. How fast that happens is the live dispute between Keynesian and classical readings of the 1930s and of 2008–09.
:::
:::

The **Phillips curve** is the labour-market face of SRAS: in its original 1958 form (A. W. Phillips, *Economica*), a negative association between wage inflation and unemployment in the UK. Friedman (1968) and Phelps (1968) argued that only *unexpected* inflation would buy lower unemployment, and that in the long run the curve is vertical at the natural rate. The 1970s stagflation was read, by many, as a confirmation. The 2010s combination of low unemployment and low inflation in several high-income countries was read as a flattening. There is no settled slope. [[macroeconomics]] and [[business-cycles]] treat the New Keynesian version, in which the slope depends on how sticky prices are and on how anchored expectations are.

## Monetary policy

A modern central bank’s main instrument is a **policy interest rate** (the federal funds rate target in the United States, the ECB’s deposit facility rate, the Bank of England’s Bank Rate, the PBOC’s seven-day reverse repo rate, among others). Open-market operations and standing facilities keep the market rate near the target. When the policy rate is at the **zero lower bound** (or a slightly negative bound), the bank may buy longer-term assets (**quantitative easing**) to affect yields and balance-sheet quantities.

The **Taylor rule** (Taylor, 1993) is a description of how a rate *might* respond to inflation and the output gap:

$$
i = r^* + \pi + 0.5(\pi - \pi^*) + 0.5\,\frac{Y - Y^*}{Y^*},
$$

with $r^*$ a real-rate benchmark and $\pi^*$ an inflation target. It is a benchmark, not a law, and not a recommendation of any particular $r^*$ or $\pi^*$. Many inflation-targeting banks announce $\pi^*$ (often 2 per cent in high-income countries, as of 2026) and use a forecast of $\pi$ as the intermediate guide.

Transmission runs from the policy rate to other rates, to credit, to the exchange rate, to asset prices, and then to $C$ and $I$ and $NX$. Each step has a lag and a leak. This atlas does not advise on how to “play” those asset prices.

::: quiz
In the AD–AS sketch, a central bank tightens, shifting AD left. In the short run one should expect
- [ ] $Y$ up, $P$ up
- [x] $Y$ down, $P$ down
- [ ] $Y$ down, $P$ up
- [ ] $Y$ unchanged, $P$ down, because LRAS is vertical
::: solution
A leftward AD shift along an upward SRAS lowers $Y$ and $P$. $Y$ unchanged would be the long-run outcome, after SRAS has adjusted, and even then $P$ would be lower. The short-run claim is the first of those.
:::
:::

## What is in dispute

Several positive questions are not settled, and should not be presented as settled.

- **The size of fiscal multipliers**, as already noted: larger at the zero lower bound and in recessions in many estimates (Auerbach and Gorodnichenko, 2012, *American Economic Journal: Economic Policy*), smaller when the economy is closed to slack or when a monetary offset is tight. The IMF’s own multipliers in programme design have been revised (Blanchard and Leigh, 2013, *IMF Economic Review*).
- **The causes of the Great Depression.** Keynesian accounts emphasise a collapse of demand and a failure of policy to replace it; monetarist accounts (Friedman and Schwartz, 1963) emphasise the fall in the US money stock and bank failures; others emphasise the gold standard, debt deflation (Fisher, 1933), or a productivity shock. The 2008–09 recession revived parts of each list: a financial crash, a demand collapse, a zero lower bound.
- **The 2021–23 inflation.** Demand (fiscal transfers, a shift of spending toward goods), supply (pandemic disruptions, then an energy shock after Russia’s invasion of Ukraine in 2022), and monetary accommodation have all been cited. Different high-income countries shared the inflation and differed in the mix; emerging-market economies that had already lived with higher inflation had a different starting point. Attributing “the” cause is not something this chapter does.

Normative questions — how much inflation to target, how fast to consolidate a debt, how to split the burden of a disinflation — depend on whose losses count and on risk aversion over tail events. They are not theorems of AD–AS.

::: application Okun’s arithmetic
Arthur Okun (1962) documented a regular association between the gap of output from trend and the gap of unemployment from a benchmark. A rough modern rule of thumb in some high-income countries is that a 2 per cent fall in $Y$ relative to $Y^*$ goes with a 1 percentage-point rise in the unemployment rate, but the coefficient differs by country and decade (Ball, Leigh and Loungani, 2017, *Journal of Money, Credit and Banking*). The rule is a translation device between the $Y$ of AD–AS and the unemployment rate of the previous chapter, not a structural law.
:::

::: history
**1936, John Maynard Keynes; 1968, Milton Friedman.** Keynes’s *General Theory of Employment, Interest and Money* argued that aggregate demand could settle below full employment and that fiscal (and monetary) policy could close the gap. Friedman’s presidential address to the American Economic Association, “The Role of Monetary Policy” (*American Economic Review*, 1968), argued that monetary policy could not permanently peg unemployment below the natural rate, and that inflation expectations would shift the short-run Phillips curve. The decades since have been a sequence of attempts to combine the two: New Keynesian models with sticky prices and a Taylor rule are the current teaching core of [[macroeconomics]], not the last word.
:::

## Where this leads

[[macroeconomics]] develops IS–LM, the New Keynesian 3-equation model, and the government budget constraint. [[money-banking]] is the financial system through which monetary policy actually passes. [[international-finance]] opens the economy: exchange rates, capital flows, the impossible trinity. [[business-cycles]] is the evidence on shocks. This chapter is the map of the instruments and of the arguments, at the level of AD–AS and $MV = PY$.

::: summary
- The quantity equation $MV = PY$ is an identity; the quantity theory is the claim that, with $V$ and $Y$ determined independently, inflation tracks money growth. It is a long-run benchmark, tight in hyperinflations, looser in moderate inflations.
- The simple Keynesian multiplier is $1/(1-\mathrm{MPC})$ for a rise in $G$. Estimated multipliers vary with slack, monetary offset and the instrument.
- AD–AS organises demand shocks ( $Y$ and $P$ in the same direction in the short run) and supply shocks (opposite directions). Long-run supply is vertical at potential output.
- Monetary policy sets a short-term rate, and at the bound may use the balance sheet. Transmission is lagged. A Taylor-type rule is a description, not a prescription.
- Multipliers, the Depression, and the 2021–23 inflation are live disputes. Separate positive claims from the value judgements in any “should”.
:::

## Exercises

::: exercise Quantity equation {level=1 check="2"}
$M = 200$, $V = 4$, $Y = 400$. Find $P$. (Enter $P$.)
::: solution
$P = 800/400 = 2$.
:::
:::

::: exercise A monetary expansion {level=1}
In the previous exercise $M$ rises 10 per cent, $V$ and $Y$ fixed. What is inflation?
::: solution
$M' = 220$, $P' = 880/400 = 2.2$, inflation $= 10$ per cent, equal to money growth.
:::
:::

::: exercise Multiplier {level=1}
$\mathrm{MPC} = 0.8$. Compute the government-purchases multiplier and the change in $Y$ if $G$ rises by 5.
::: solution
Multiplier $= 1/0.2 = 5$. $\Delta Y = 25$.
:::
:::

::: exercise Tax versus spending {level=2}
In the model of [[#eq-multiplier]] with $c = 0.8$, compare $\Delta Y$ from $\Delta G = 10$ with $\Delta Y$ from $\Delta T = -10$.
::: solution
Spending: $\Delta Y = 5\times 10 = 50$. Tax cut: autonomous consumption rises by $c\times 10 = 8$, $\Delta Y = 5\times 8 = 40$. The difference is 10, equal to the first-round saving out of the tax cut.
:::
:::

::: exercise A supply shock {level=2}
Using AD $P = 16 - 0.5Y$ and the original SRAS $P = 4 + 0.5Y$, now shift SRAS to $P = 7 + 0.5Y$. Find the new short-run $(Y, P)$. Compare with $(12, 10)$.
::: solution
$16 - 0.5Y = 7 + 0.5Y$ gives $9 = Y$, $P = 11.5$. Output fell from 12 to 9; the price level rose from 10 to 11.5. Stagflation: lower $Y$, higher $P$.
:::
:::

::: exercise Fisher arithmetic {level=2}
The nominal policy rate is 5 per cent. If expected inflation rises from 2 per cent to 6 per cent and the nominal rate is unchanged, what happens to the approximate real rate? What would a Taylor-type rule, holding the output gap at zero, tell the bank to do to $i$ if $\pi^*$ is 2 per cent and the coefficient on the inflation gap is 0.5 (plus the one-for-one Fisher term)?
::: solution
Real rate falls from about 3 per cent to about $-1$ per cent. The inflation gap rises from 0 to 4 per cent. A Taylor rule $i = r^* + \pi + 0.5(\pi-\pi^*)$ with $r^* = 3$ would set $i = 3+2+0 = 5$ at the old inflation of 2 per cent, and $i = 3+6+0.5\times 4 = 11$ at the new inflation of 6 per cent. The bank would have to raise $i$ by about 6 percentage points, not leave it at 5, if it wanted to follow that rule. The exercise is arithmetic on a formula, not advice.
:::
:::

::: exercise Multiplier with a leakage {level=3}
Extend [[#eq-multiplier]] to a closed economy in which $I = \bar I - br$ is interest-sensitive and $r$ rises with $Y$ because money demand rises with $Y$ at a given $M$ (a sketch of IS–LM). Explain in a paragraph why the resulting $\Delta Y/\Delta G$ is smaller than $1/(1-c)$. Then compute the Keynesian-cross multiplier if, in addition, a fraction $m = 0.2$ of each extra unit of income is spent on imports, with $c = 0.8$ still the MPC including imports, so the domestic MPC is $c-m$.
::: hint
Crowding out through $r$ is an extra leakage. With imports, the denominator is $1 - (c-m)$.
:::
::: solution
In the cross, every extra unit of $Y$ produces $c$ of extra demand. If $I$ falls as $r$ rises with $Y$, some of that extra demand is offset, so the fixed point $Y$ does not rise as far: the multiplier is smaller. With imports, domestic demand’s marginal response is $c-m = 0.6$, and the multiplier is $1/0.4 = 2.5$, against $1/0.2 = 5$ when $m = 0$. Openness is a leakage; so is crowding-out. Both are reasons estimated multipliers can be well below the textbook $1/(1-c)$.
:::
:::

::: exercise From AD–AS to unemployment {level=3}
In [[#ex-recession]] part (b), $Y$ falls from 12 to 9, a 25 per cent fall. Using a coefficient of $1/2$ in an Okun rule (a 2 per cent output gap goes with a 1 percentage-point unemployment rise), what happens to the unemployment rate if it started at 5 per cent? Why is this calculation too large to be a realistic quarterly event, and what does that say about the sketch?
::: solution
A 25 per cent output gap would map to a 12.5 percentage-point rise in unemployment, to 17.5 per cent. That is Depression-sized, not a typical recession. The AD shift in the exercise was drawn large for arithmetic transparency (the constant in AD fell from 16 to 13 on a scale where $Y^* = 12$). Realistic short-run gaps are a few per cent of $Y^*$, and unemployment movements of one or two points. The diagram’s qualitative directions survive; its numerical scale is a classroom choice.
:::
:::
