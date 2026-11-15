When private demand collapsed in 2008–09, almost every large economy let its budget deficit widen, and many legislated extra spending or tax cuts: the U.S. American Recovery and Reinvestment Act of February 2009, China's 2008–09 programme, Germany's two packages, Japan's several supplements (IMF *Fiscal Monitor*, 2009–10). How much output those actions bought is still disputed. Barro and Redlick (*Quarterly Journal of Economics*, 2011) estimated defence-spending multipliers well below one on a long U.S. sample; Romer and Romer (*American Economic Review*, 2010) estimated tax-increase multipliers around three; Auerbach and Gorodnichenko (*AEJ: Economic Policy*, 2012) found larger multipliers in recessions than in booms; Ramey's surveys (*Journal of Economic Literature*, 2011; with Zubairy, *Journal of Political Economy* 2018) put the typical spending multiplier in a range from about $0.6$ to $1.5$, with larger values when rates are at the ZLB. This chapter is that dispute, set in the models the course has already built.

**Automatic stabilisers** move the deficit without a new law. **Discretionary** fiscal policy is a new law. The **multiplier** is the derivative of output with respect to a fiscal instrument. In the RBC model of [[business-cycles/real-business-cycles]] the government-spending multiplier is small and consumption typically falls. In the New Keynesian model of [[business-cycles/new-keynesian-model]], especially at the ZLB of [[business-cycles/zero-lower-bound]], it can be large and consumption can rise. The evidence has not chosen a single number, and a number that is right at the ZLB is wrong when the Taylor rule is active. Trade-offs — debt, composition, lags, political economy — are stated as trade-offs. Nothing in the chapter is a recommendation to pass or repeal a bill, and nothing is tax advice.

Notation: $G_t$ real government purchases, $T_t$ taxes (lump-sum unless stated), $b_t$ the real debt-to-GDP ratio, $c$ the marginal propensity to consume out of current income in static examples. Inflation $\pi$ and the gap $\tilde y$ keep their NK meanings. The multiplier is $\partial Y/\partial G$ or $\partial Y/\partial T$, not a welfare ranking.

## Automatic stabilisers

::: definition Automatic stabiliser {#def-auto}
An **automatic stabiliser** is a feature of the tax-and-transfer system that makes the *cyclically unadjusted* budget balance move with $\tilde y$ without a new statute. Progressive income taxes, profit taxes, and unemployment-insurance benefits are the leading examples. The **budget semi-elasticity** $\eta$ is the improvement in the budget balance, as a share of potential GDP, when the output gap rises by one percentage point.
:::

The OECD publishes cyclically adjusted balances and semi-elasticities. For many OECD members $\eta$ lies between $0.4$ and $0.6$: a $2$ percent negative gap worsens the budget by about $1$ percent of GDP, holding policy fixed (OECD *Economic Outlook* annexes; Girouard and André, OECD Economics Department Working Paper 2005, still the template). The United States is in that band; several Nordic systems are more elastic; several middle-income systems with thin unemployment insurance are less. Automatic stabilisers are larger in countries with larger governments, which is an accounting identity as much as a policy choice.

Automatic stabilisers have two virtues that discretionary packages do not: they are timely (no legislative lag) and they reverse when $\tilde y$ reverses (no withdrawal debate). Their vice is that $\eta$ is whatever the tax code was when the recession arrived, not whatever $\eta$ a multiplier estimate would want. They also do not recapitalise banks or target a distressed $q$; that is [[business-cycles/financial-frictions]], not a tax schedule.

::: example Semi-elasticity arithmetic {#ex-eta}
Take $\eta=0.5$ and a year in which $\tilde y=-4$ percent. By how much does the automatic piece worsen the budget, as a share of GDP? If the headline deficit widens by $6$ percent of GDP in that year, how much of the widening is the OECD's cyclical piece versus a discretionary (or residual) piece?
::: solution
The automatic worsening is $\eta\times 4 = 2$ percent of GDP. Of a $6$ point headline widening, $2$ are cyclical and $4$ are the residual — a mix of discretionary stimulus, one-off bank support, and any mis-measurement of $\tilde y$. Cyclically adjusted balances are only as good as the gap they are adjusted with; after 2008, revisions to potential output reclassified some of what had looked discretionary (IMF *Fiscal Monitor* vintages).
:::
:::

## Multipliers in theory

A static Keynesian cross with lump-sum taxes, no imports and a fixed interest rate gives the textbook

$$
\frac{\mathrm{d}Y}{\mathrm{d}G} = \frac{1}{1-c},
$$ {#eq-keynes}

where $c$ is the marginal propensity to consume. At $c=0.6$ the multiplier is $2.5$. That number is an upper bound in a closed economy with a fixed $i$, not a description of any particular year.

::: definition Government-purchase multiplier {#def-mult}
The **government-purchase multiplier** is $\mathrm{d}Y/\mathrm{d}G$ for a specified path of $G$, a specified monetary rule, and a specified financing (lump-sum taxes, distortionary taxes, or debt). The **tax multiplier** $\mathrm{d}Y/\mathrm{d}T$ is defined analogously and is typically negative. Both are model objects; an estimated number is an estimate of one such object, not of all of them.
:::

::: proposition Multipliers in the RBC and NK laboratories {#prop-mult}
(i) In the baseline RBC model with lump-sum financing, a persistent rise in $G$ raises hours and output through a negative wealth effect on leisure, and typically *lowers* consumption (Baxter and King, *American Economic Review* 1993). The multiplier on impact is positive but usually less than one. (ii) In the three-equation NK model with an operational Taylor rule, extra $G$ raises $\tilde y$ and $\pi$, the rule raises $i$, and crowding-out through the real rate *shrinks* the multiplier relative to [[#eq-keynes]]. (iii) At a binding ZLB the Taylor-rule channel is shut, expected inflation can *rise* with $G$, the real rate falls, and the NK multiplier can exceed one and can exceed [[#eq-keynes]] (Christiano, Eichenbaum and Rebelo, *Journal of Political Economy* 2011; Eggertsson, *NBER Macroeconomics Annual* 2010).
:::
::: proof
(Sketch.) (i) The resource constraint is $C+I+G=Y$. The wealth effect of extra $G$ (or of the taxes that finance it) raises labour supply; $Y$ rises, $C$ falls unless the extra output more than covers $G$, which it does not at standard Frisch elasticities. (ii) Extra $G$ is a positive $r^n$ (or IS) shock in the NK block; [[business-cycles/new-keynesian-model#prop-iid]] then gives a damped rise in $\tilde y$ and $\pi$, and a rise in $i$. (iii) At $i=\underline{i}$, IS is [[business-cycles/zero-lower-bound#prop-zlb-gap]]: a rise in $\E\pi$ *lowers* the real rate. If extra $G$ raises the gap and inflation along the NKPC, the real-rate channel *crowds in* rather than out, and the multiplier is increasing in the expected duration of the bound.
:::

Ricardian equivalence (Barro, *Journal of Political Economy* 1974; the consumption chapter of [[macroeconomics/consumption-and-saving]]) is the RBC polar case for *tax-financed versus debt-financed* $G$: if households are infinitely lived, taxes are lump-sum, and capital markets are perfect, the timing of $T$ does not matter and a tax cut financed by debt does not raise $C$. Finite lives, liquidity constraints and myopia break the equivalence and restore a tax multiplier. The NK model with a fraction of **rule-of-thumb** households (Galí, López-Salido and Vallés, *Journal of the European Economic Association* 2007) is the tractable version: those households consume their current after-tax income, $c$ in [[#eq-keynes]] becomes a deep parameter again, and the multiplier rises with their share.

::: example Keynesian-cross arithmetic {#ex-cross}
If $c=0.6$ and the interest rate is fixed, what is $\mathrm{d}Y/\mathrm{d}G$? If an import propensity $m=0.2$ is added, so the marginal leakage is $1-c+m$, what is the multiplier?
::: solution
$1/(1-0.6)=2.5$. With imports, $1/(1-0.6+0.2)=1/0.6\approx 1.67$. Openness leaks demand abroad; small open economies have smaller demand multipliers, holding $i$ fixed. Exchange-rate and monetary reactions can overturn that ranking, which is why a table of multipliers without a monetary regime is not a table.
:::
:::

::: example A ZLB multiplier in a two-period sketch {#ex-zlb-mult}
Period $1$ is at the ZLB, period $2$ is unconstrained with $\tilde y_2=0$. IS: $\tilde y_1 = 0 + \pi_2 + r_1^n + \gamma g_1$, where $g_1$ is extra $G$ as a share of output and $\gamma$ is a direct resource-constraint weight. NKPC in period $1$: $\pi_1 = \kappa\tilde y_1$, and $\pi_2=\pi_1$ if inflation is persistent for this sketch. Then $\tilde y_1 = \kappa\tilde y_1 + r_1^n + \gamma g_1$. If $\kappa=0.5$, $\gamma=1$, $r_1^n=-0.04$ and $g_1=0.02$, what is $\tilde y_1$ with and without the extra $G$?
::: solution
$\tilde y_1(1-\kappa)= r_1^n+\gamma g_1$, so $\tilde y_1 = (r_1^n+\gamma g_1)/0.5$. Without extra $G$, $\tilde y_1=-0.04/0.5=-0.08$. With $g_1=0.02$, $\tilde y_1=(-0.04+0.02)/0.5=-0.04$. The $2$ percent of GDP in extra $G$ raises the gap by $4$ percent of GDP, a multiplier of $2$ in this sketch. The amplification is $\kappa$ feeding into expected inflation feeding into the real rate. If $\kappa=0$, the same $g_1$ would raise $\tilde y_1$ one-for-one at most through $\gamma$, with no real-rate crowding-in. The numbers are a classroom skeleton of Christiano–Eichenbaum–Rebelo, not their calibrated value (which can be larger).
:::
:::

::: warning A multiplier is not a welfare weight
$\mathrm{d}Y/\mathrm{d}G>1$ means output rises by more than $G$. It does not mean that the extra $G$ was the right public good, or that the debt issued to finance it has a low social cost, or that a tax cut of the same size would have been worse. Woodford (*AEJ: Macro*, 2011) is explicit: the NK multiplier is a derivative, and the optimal $G$ still compares the marginal value of public goods to the marginal cost of resources, with an extra term when $\tilde y<0$ at the ZLB. Reporting a multiplier as if it were a cost–benefit ratio is a category error.
:::

::: widget sequence
a: (1-0.6^n)/(1-0.6)
N: 16
mode: terms
limit: 2.5
start: 1
caption: Partial sums of the Keynesian-cross geometric series $1+c+c^2+\cdots$ with $c=0.6$, approaching $2.5$. This is the fixed-$i$, closed-economy upper bound of [[#eq-keynes]], not an estimate for 2009. Compare the $n=4$ partial sum ($2.176$) with the infinite-horizon $2.5$: even the textbook multiplier takes time if the rounds are calendar time.
:::

## Evidence

The identification problem is the same as everywhere in this atlas: $G$ and $Y$ co-move because $Y$ moves $G$ (automatic stabilisers, and legislatures that spend in booms) as well as because $G$ moves $Y$. Four strategies dominate the literature, and they do not agree.

1. **Narrative military spending.** Ramey and Shapiro (*Carnegie-Rochester*, 1998), Ramey (2011), Barro and Redlick (2011), Ramey and Zubairy (2018) use defence-spending news, often from *Business Week* and similar, as shocks. Multipliers cluster around $0.6$–$1.2$ in U.S. quarterly data, with Ramey and Zubairy finding little extra at the ZLB in a historical U.S. sample that includes the 1930s and 1940s. Barro and Redlick's long-sample defence multiplier is about $0.4$–$0.8$.
2. **Narrative tax changes.** Romer and Romer (2010) classify U.S. tax bills as motivated by inherited deficit or by long-run growth, not by the current cycle, and find a tax multiplier around $-3$ after three years. Cloyne (*American Economic Review*, 2013) finds large tax multipliers for the United Kingdom. Subsequent work has argued about foresight and about whether "long-run" bills are really exogenous.
3. **Local multipliers.** Cross-region estimates (Nakamura and Steinsson, *American Economic Review* 2014, U.S. states; Acconcia, Corsetti and Simonelli, *American Economic Review* 2014, Italy; a large post-2010 literature) identify relative $G$ across places that share a monetary policy. They typically find multipliers above one. Translation to a *national* multiplier requires an assumption about the monetary regime and about spillovers; Nakamura and Steinsson are explicit that their number is an open-economy relative multiplier, closer to a ZLB (or currency-union) object than to a closed-economy Taylor-rule object.
4. **Regime-switching and local projections.** Auerbach and Gorodnichenko (2012) estimate larger multipliers in recessions (above $1.5$ in some specifications) than in expansions (near zero or negative). Ramey and Zubairy (2018), using a different recession definition and military news, do not find the same split. Blanchard and Leigh (*American Economic Review Papers and Proceedings*, 2013) showed that IMF growth-forecast errors in 2010–11 were correlated with planned fiscal consolidation, which they read as evidence that the Fund's assumed multipliers (around $0.5$) were too small. The IMF's own subsequent *World Economic Outlook* (October 2012, ch. 1) raised the multipliers it used in forecasts.

Emerging and developing economies add a financing constraint. Ilzetzki, Mendoza and Végh (*Journal of Monetary Economics*, 2013) find smaller, sometimes negative, spending multipliers in developing samples, especially under fixed exchange rates that are combined with capital-inflow reversals — a financial-friction overlay. Commodity exporters' $G$ co-moves with export prices; identification is then even harder (IMF *Fiscal Monitor*).

The honest summary is a range, not a point. Spending multipliers of $0.5$–$1.5$ in normal times, possibly larger at the ZLB or in a currency union, and tax multipliers that may be larger than spending multipliers in narrative U.S. evidence, with local multipliers above one. Anyone who needs a single number in order to pass a law is using a different criterion from this chapter.

::: quiz
In the New Keynesian model, the government-purchase multiplier is largest when
- [ ] the Taylor rule is very aggressive ($\phi_\pi$ and $\phi_y$ large) and the ZLB is slack
- [x] the ZLB binds and extra $G$ raises expected inflation
- [ ] Ricardian equivalence holds and prices are flexible
- [ ] the country is small and open with a floating rate and an inflation-targeting Taylor rule
::: solution
(ii) of [[#prop-mult]]: at the ZLB the real-rate channel crowds in. An aggressive Taylor rule crowds out. Flexible-price Ricardian RBC has a small multiplier and falling consumption. A small open inflation targeter leaks demand abroad and raises $i$ with $\pi$, both of which shrink a demand multiplier.
:::
:::

::: widget plot
f: 1/(1-c); 1/(1-c+0.5*p)
sliders: c=0.6:0.3:0.8; p=1.5:0.5:3
x: 0, 1
y: 0, 6
labels: \text{fixed } i; \text{with Taylor crowding-out}
caption: Horizontal axis is unused. The two horizontal lines are a Keynesian-cross multiplier $1/(1-c)$ and a schematic crowded-out multiplier $1/(1-c+0.5\phi_\pi)$. Raise $c$ to lift both; raise $p=\phi_\pi$ to lower only the second. At the ZLB one is stuck on the first line. The figure is a cartoon of [[#prop-mult]], not an estimated surface.
:::

## Debt, composition and lags

A multiplier on $Y$ is silent on $b_t$. The law of motion in [[macroeconomics/fiscal-policy-and-debt]],

$$
b_{t+1} = \frac{1+r_t}{1+g_t}\, b_t + d_t,
$$ {#eq-debt}

with $d_t$ the primary deficit as a share of GDP, says that a stimulus which raises $g_t$ (growth) and is reversed before $r$ rises can *lower* $b$ even if $d$ is temporarily high. A stimulus that is not reversed, or that is perceived as a permanent rise in $d$, raises $b$. Blanchard's 2019 AEA presidential address argued that $r<g$ in a long U.S. sample makes the arithmetic kinder; subsequent 2022–23 rate rises (and still-high debt ratios in Italy, Japan, the United States — IMF *Fiscal Monitor*, 2024) make it less kind. Neither arithmetic picks a 2009 package.

::: example Debt arithmetic {#ex-debt}
Take $b_t=1.0$ (debt equal to a year's GDP), $r_t=0.02$, $g_t=0.01$ and a primary deficit $d_t=0.03$. What is $b_{t+1}$ from [[#eq-debt]]? If instead growth were $g_t=0.04$ with the same $r$ and $d$, what is $b_{t+1}$?
::: solution
$b_{t+1}=(1.02/1.01)\times 1.0+0.03=1.0099+0.03=1.0399$, about $104$ percent of GDP. With $g=0.04$, $b_{t+1}=(1.02/1.04)\times 1+0.03=0.9808+0.03=1.0108$, barely above $100$ percent. The same primary deficit is almost consistent with a stable ratio when growth exceeds the interest rate. This is accounting, not a reason to ignore $d$; a later rise in $r$ reverses the comparison.
:::
:::

Composition matters as much as size. Transfers to liquidity-constrained households have a different $c$ from purchases of structures with a two-year lead time (the legislative and implementation lags of Friedman 1948 and the Mundell–Fleming policy-lag discussion). Investment-grade public capital can raise $y^n$ as well as $\tilde y$, which is a growth-theory effect, not a cycle effect. Distortionary labour taxes, used to back a future $b$, shrink the NK multiplier (Drautzburg and Uhlig, *Journal of Monetary Economics* 2015). Rule-of-thumb households raise it.

::: application 2009, without a verdict
The IMF's 2010–12 consolidations in several European programmes assumed multipliers around $0.5$ and had to live with Blanchard–Leigh's subsequent finding that the assumption was too low *in that sample*. The U.S. ARRA was a mix of transfers, tax cuts and G, spread over 2009–11, at a time when the funds rate was at the ZLB — the configuration in which Christiano–Eichenbaum–Rebelo want a large multiplier and in which Ramey–Zubairy's historical ZLB sample does not always find one. China's 2008–09 programme was investment-heavy and local-government-financed, with a different financial-friction overlay (IMF WEO, October 2010). Reporting these as "stimulus works" or "stimulus fails" is a slogan. Reporting them as observations that any one multiplier number must be consistent with is this course's job.
:::

## Where this leads

This is the last chapter of the course. The measurement of [[business-cycles/business-cycle-facts]], the two laboratories of RBC and NK, the policy rule, the ZLB and the financial accelerator are all inputs to a fiscal derivative $\mathrm{d}Y/\mathrm{d}G$. Open-economy leaks, exchange rates and cross-border fiscal spillovers belong to [[international-finance/current-account]] and to Mundell–Fleming. Long-run debt sustainability belongs to [[macroeconomics/fiscal-policy-and-debt]]. The live dispute on multipliers will not be settled by a tighter Calvo $\theta$; it will be settled, if at all, by better shocks and by being explicit about the monetary regime in which those shocks occurred.

::: history
**1936, John Maynard Keynes.** The *General Theory* put $G$ into a demand-determined short run and, with Kahn's earlier multiplier, made $\mathrm{d}Y/\mathrm{d}G=1/(1-c)$ the first fiscal derivative in the course's ancestry. **1974, Robert J. Barro.** "Are Government Bonds Net Wealth?" (*Journal of Political Economy*) stated the Ricardian benchmark against which every tax multiplier is still compared. **2010–12, Christina D. Romer and David H. Romer; Olivier Blanchard and Daniel Leigh; Valerie A. Ramey.** Narrative tax shocks, IMF forecast errors, and defence-news surveys are the three papers (or groups) around which the modern empirical range is organised.
:::

::: summary
- Automatic stabilisers move the deficit with $\tilde y$ at a semi-elasticity $\eta\approx 0.4$–$0.6$ in many OECD economies. They are timely and self-reversing; they are not targeted at bank net worth.
- The Keynesian-cross multiplier $1/(1-c)$ is a fixed-$i$ upper bound. RBC wealth effects make $\mathrm{d}Y/\mathrm{d}G<1$ and typically cut $C$. NK with an active Taylor rule sits in between. NK at the ZLB can exceed one via expected inflation.
- Empirical spending multipliers often lie in $0.5$–$1.5$; narrative tax multipliers can be larger; local multipliers are larger still and measure a different object. Recession versus expansion, and ZLB versus not, remain disputed (Auerbach–Gorodnichenko versus Ramey–Zubairy).
- A multiplier is not a welfare criterion. Debt, composition, lags and distortionary future taxes are part of the same problem.
- Always state the monetary regime. A 2009 number is not a 1999 number.
:::

## Exercises

::: exercise Keynesian cross {level=1 check="2"}
If $c=0.5$ and $i$ is fixed, what is $\mathrm{d}Y/\mathrm{d}G$? (Enter the multiplier.)
::: solution
$1/(1-0.5)=2$.
:::
:::

::: exercise Semi-elasticity {level=1 check="1.5"}
If $\eta=0.5$ and $\tilde y=-3$ percent, by how many percent of GDP does the automatic piece worsen the budget? (Enter the number, without a minus sign.)
::: solution
$0.5\times 3=1.5$.
:::
:::

::: exercise Open-economy leak {level=1 check="1.25"}
With $c=0.4$ and import propensity $m=0.2$, compute $1/(1-c+m)$. (Enter the multiplier.)
::: solution
$1/(1-0.4+0.2)=1/0.8=1.25$.
:::
:::

::: exercise RBC sign of consumption {level=2}
In Baxter and King (1993), a persistent rise in $G$ financed by lump-sum taxes typically lowers $C$. Give the wealth-effect argument, and say what extra ingredient (rule-of-thumb households, ZLB, or a productivity of public capital) could reverse the sign.
::: solution
Households are poorer by the present value of extra $G$. Leisure and consumption are normal goods, so labour supply rises and $C$ falls. $Y$ rises, but not enough to cover $G$ at standard Frisch elasticities, so $C+I$ falls. Rule-of-thumb households who consume current income can make aggregate $C$ rise; a ZLB real-rate crowding-in can do the same in NK; productive public capital raises $y^n$ and can raise private $C$ in the long run. The sign of $C$ is therefore a test of the laboratory, not a fact independent of the model.
:::
:::

::: exercise Local versus national {level=2}
Nakamura and Steinsson (2014) estimate U.S. *state-level* multipliers above one. Why is that number not, by itself, the multiplier a federal package would have when the Fed is following an active Taylor rule?
::: solution
States share a monetary policy: relative $G$ in one state does not raise the federal funds rate the way a national $G$ does. The estimate is therefore closer to a currency-union or ZLB multiplier (no extra tightening aimed at *this* $G$) than to a closed-economy Taylor-rule multiplier. Spillovers to other states and the financing of federal versus state spending are further wedges. The paper is explicit about this; citing it as "the" ARRA multiplier skips that sentence.
:::
:::

::: exercise Blanchard–Leigh {level=2}
Blanchard and Leigh (2013) found that countries with larger planned consolidations in 2010–11 had more negative growth *forecast errors* relative to the IMF's forecasts. Why is that a statement about the Fund's assumed multiplier rather than a new estimate of $\mathrm{d}Y/\mathrm{d}G$ from scratch?
::: solution
The Fund's forecasts embedded a multiplier (around $0.5$). If the true multiplier were larger, growth would come in below forecast in proportion to the planned consolidation. The regression of forecast errors on planned $\Delta G$ identifies the *gap* between true and assumed multipliers, not the level of the true multiplier, and only in that sample of consolidations. It is evidence that $0.5$ was too small for 2010–11 Europe; it is not a $3$ from Romer–Romer, and it is not a $0.8$ from Barro–Redlick.
:::
:::

::: exercise ZLB crowding-in {level=3}
Using [[#prop-mult]] (iii) and the NKPC, explain why a *larger* $\kappa$ can *raise* the ZLB spending multiplier, whereas in normal times a larger $\kappa$ (a more aggressive inflation response to the gap) leads the Taylor rule to crowd out more.
::: hint
At the bound, inflation is an instrument for the real rate. Off the bound, inflation is a reason $i$ rises.
:::
::: solution
At $i=\underline{i}$, extra $G$ that raises $\tilde y$ raises $\pi$ by $\kappa$ on the NKPC. Higher $\E\pi$ *lowers* the real rate, which raises $\tilde y$ further — crowding-in that is increasing in $\kappa$. Off the bound, the same extra $\pi$ makes the Taylor rule raise $i$ by $\phi_\pi\kappa$ extra, which *raises* the real rate if $\phi_\pi>1$ and crowds out more when $\kappa$ is larger. The slope of the Phillips curve therefore changes sign in the multiplier comparative static when the bound starts to bind. That is one reason a 2009 estimate need not match a 1999 estimate even if $\kappa$ is the same.
:::
:::

::: exercise Ricardian versus rule-of-thumb {level=3}
A temporary lump-sum tax cut of $1$ percent of GDP is financed by debt. Compare the consumption response of (a) a Ricardian household, (b) a rule-of-thumb household, and (c) a household at a binding collateral constraint as in [[business-cycles/financial-frictions#eq-collateral]]. Which laboratory is closest to Romer and Romer's large tax multiplier, and what identification worry remains?
::: hint
Who spends the $1$ percent today? What does the narrative classification have to get right?
:::
::: solution
(a) The Ricardian household saves the tax cut to pay the future tax, so $C$ does not move (Barro 1974). (b) The rule-of-thumb household spends $c$ of it, so $C$ rises by about $c$ percent of GDP. (c) The collateral-constrained household may spend all of it, and the extra net worth may relax $m$ and crowd in borrowing, so $C$ can rise by more than $1$ percent of GDP. Romer–Romer's estimate around $-3$ for a tax *increase* is closer to (b) or (c) than to (a). The identification worry is foresight and motivation: if bills classified as "long-run" were still timed with the cycle, or were anticipated, the estimate mixes $\mathrm{d}Y/\mathrm{d}T$ with reverse causality. Large tax multipliers are evidence against pure Ricardian RBC, not a proof of a particular $c$.
:::
:::
