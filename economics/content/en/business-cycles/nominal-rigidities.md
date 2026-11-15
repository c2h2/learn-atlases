In the real business cycle model of [[business-cycles/real-business-cycles]], the price of the single good is a numeraire and money, if it exists, is a veil. Double every nominal price and every nominal wage overnight and nothing real changes: hours, consumption and capital are determined by tastes and technology. That **neutrality of money** is a long-run property that almost every modern model still wants. It is a short-run property that the data reject. The Volcker disinflation of 1981–82 was a monetary event and an NBER recession (July 1981–November 1982, unemployment peaking at 10.8 percent). Romer and Romer (*American Economic Review*, 2004) identified a sequence of Federal Reserve contractions from the narrative record; output and hours fall afterwards. Christiano, Eichenbaum and Evans (*Journal of Political Economy*, 2005) found the same in a VAR. Something in the short-run price mechanism is not the flexible-price benchmark.

This chapter is that mechanism. **Nominal rigidities** — costs of changing prices or wages, or contracts that fix a nominal number for a while — make the price level slow, so that a change in nominal demand changes real demand. Menu costs, Taylor staggered contracts and Calvo pricing are three ways to write the same idea. Micro evidence from scanner data and CPI micro files says how slow is slow. Inflation $\pi$ re-enters; the output gap $\tilde y$ will be defined properly in [[business-cycles/new-keynesian-model]]. Notation: $P_t$ is the price level, $i_t$ the nominal interest rate, and $\theta$ (in Calvo) the probability of *not* resetting a price.

## Neutrality, and where it fails

::: definition Neutrality and superneutrality {#def-neutrality}
Money is **neutral** if a once-and-for-all, proportional change in all nominal quantities (the money stock, wages, prices) leaves all real quantities unchanged. It is **superneutral** if a change in the *growth rate* of money leaves real quantities unchanged. Flexible-price, complete-markets models with money only as a unit of account deliver both, up to small inflation-tax effects on money demand.
:::

David Hume's 1752 essays already separated the thought experiment of a doubled money stock from the messy transition. Lucas's 1972 islands model (*Journal of Economic Theory*) kept neutrality of *perceived* money and broke neutrality of *unperceived* money: only a surprise can move output, and only while information is incomplete. New classical models of the 1970s (Sargent and Wallace; Barro) pushed that logic to a policy conclusion — anticipated money does nothing real — that the Volcker episode and later identified-monetary-policy VARs did not support. The New Keynesian response, developed through the 1980s, was not to drop rational expectations. It was to drop instantaneous price adjustment.

Two primitive stories are worth keeping distinct.

- **Information rigidities.** Prices could be changed costlessly, but firms do not continuously observe the state (Mankiw and Reis, *Quarterly Journal of Economics* 2002, sticky information; Woodford's noisy-information variants). Neutrality fails because the *mapping* from money to perceived demand is slow.
- **Adjustment costs and contracts.** Firms know the state but changing a posted price costs something real (a menu, a customer-annoyance cost, a union negotiation), or a contract has already fixed the nominal wage. Neutrality fails because the *instrument* is slow.

The rest of this chapter develops the second story, which is the backbone of the three-equation model. Sticky information is a close cousin and produces a different Phillips curve (inflation depends on lagged expectations of current conditions). Both can be true at once.

::: proposition Classical dichotomy in the flexible-price limit {#prop-dichotomy}
If every price $P_{jt}$ is reset every period to the profit-maximising level given $P_t$ and real marginal cost, the aggregate price level $P_t$ scales one-for-one with nominal demand and the real allocation $(C_t,N_t,K_{t+1})$ is the RBC allocation of [[business-cycles/real-business-cycles]]. Monetary policy can then choose $P_t$ (or $i_t$, via a Fisher equation $i_t = r_t + \E_t\pi_{t+1}$) without changing $\tilde y_t\equiv 0$.
:::
::: proof
With a symmetric reset every period, relative prices are one and the mark-up is the desired mark-up. Real marginal cost is then pinned by the desired mark-up, which pins the labour-market equilibrium at the flexible-price hours $N_t^n$. The Euler equation and capital law are real. The only role of $P_t$ is to clear the money market or to satisfy the Fisher equation at the real rate the allocation requires. Hence $\tilde y_t = \ln Y_t - \ln Y_t^n = 0$.
:::

The output gap as a *monetary* object is born the moment [[#prop-dichotomy]] fails.

## Menu costs

A **menu cost** is a fixed real cost of changing a posted nominal price. Mankiw (*Quarterly Journal of Economics*, 1985) showed that a small menu cost can be privately optimal to pay or not pay, while the *social* cost of not paying it — the demand externality on other firms — is first-order. Akerlof and Yellen (*Quarterly Journal of Economics*, 1985) made the same point with near-rationality: firms that ignore a second-order private loss impose a first-order aggregate one.

::: definition Menu-cost inaction {#def-menu}
A firm with a desired log price $p_t^*$ and a current log price $p$ will not reset if the private loss from mispricing, typically $\frac12 \varepsilon (p-p_t^*)^2$ times real revenue in a constant-elasticity demand system with elasticity $\varepsilon$, is smaller than the menu cost $\phi$. The **inaction band** is

$$
\abs{p-p_t^*} < \bar p \equiv \sqrt{2\phi/(\varepsilon \times\text{revenue factor})}.
$$ {#eq-band}

Inside the band the nominal price is fixed; a monetary shock that moves $p_t^*$ by less than $\bar p$ does not move $p$.
:::

State-dependent models (Caplin and Spulber, *Quarterly Journal of Economics* 1987; Golosov and Lucas, *Journal of Political Economy* 2007; Gertler and Leahy, *AEJ: Macro* 2008) make the band endogenous. Caplin and Spulber's striking result was that *aggregate* money can still be neutral: firms that are about to hit the band's edge reset one-for-one with money, and they are just numerous enough. Golosov and Lucas showed that with idiosyncratic productivity shocks the "selection effect" — the firms that reset are those furthest from $p^*$ — makes the aggregate price level much more flexible than the average duration of a posted price would suggest. That is the leading reason one cannot read a micro duration of, say, eight months as an eight-month wait in a Calvo model.

::: example A one-percent desired-price move {#ex-menu}
A firm faces elasticity $\varepsilon=6$, a quadratic loss $\frac12\varepsilon (p-p^*)^2$ measured as a fraction of real revenue, and a menu cost equal to $0.04$ percent of revenue. How wide is the inaction band, in percent? Will the firm reset after a $1$ percent monetary shock that moves $p^*$ by $1$ percent if it started at $p=p^*$?
::: solution
The band is $\bar p = \sqrt{2\phi/\varepsilon} = \sqrt{2\times 0.0004/6} = \sqrt{0.0001333} = 0.0115$, or $1.15$ percent on each side. A $1$ percent move of $p^*$ from a starting point $p=p^*$ lands *inside* the band, so the firm does not reset. The private loss is $\frac12\times 6\times (0.01)^2 = 0.0003$, or $0.03$ percent of revenue, which is less than $\phi=0.04$ percent. A $2$ percent move would land outside and trigger a reset. Small menu costs therefore rationalise a lot of micro inertia for small shocks — and much less inertia for large ones, which is the state-dependent signature.
:::
:::

::: intuition Why a small cost can have large effects
The firm's profit function is *flat* at the optimum: the first-order condition already set the derivative to zero, so a small mispricing costs second order. The area under the demand curve that other firms and consumers lose when this firm is mispriced is first order. That is Mankiw's 1985 aggregation: privately second-order, socially first-order. It is also why "firms would never leave money on the table" is not an argument against stickiness. They leave second-order money on the table.
:::

## Staggered contracts and Calvo pricing

Taylor (*Journal of Political Economy*, 1980) wrote overlapping two-period nominal wage contracts: half the workers reset each period, each contract lasts two periods, and the wage is set as an average of current and expected market wages and tightness. The aggregate wage is then an average of the new contract and the old one, and money has real effects for as long as a contract still binds. Fischer (*Journal of Political Economy*, 1977) had a related overlapping-indexation structure. These models deliver a Phillips curve with both backward-looking and forward-looking terms.

Calvo (*Journal of Monetary Economics*, 1983) replaced deterministic staggering with a constant-probability draw. Each period, a firm is allowed to reset its price with probability $1-\theta$ and must keep last period's price with probability $\theta$, independently of how long it has been since the last reset and independently of how far $p$ is from $p^*$. The draw is a modelling convenience, not a description of a legal contract. Its virtue is aggregation: the distribution of prices in use is a geometric mixture, and the inflation rate obeys a simple expectational difference equation.

::: definition Calvo pricing {#def-calvo}
Each period a fraction $1-\theta$ of firms, drawn at random, reset a nominal price $P_t^*$ to maximise the expected present value of profits while that price remains in force. The remaining fraction $\theta$ keep $P_{t-1}$. The aggregate price level (in a symmetric monopolistic-competition aggregator with elasticity $\varepsilon$) satisfies

$$
P_t^{1-\varepsilon} = \theta P_{t-1}^{1-\varepsilon} + (1-\theta)(P_t^*)^{1-\varepsilon}.
$$ {#eq-calvo-agg}

The mean duration of a posted price is $1/(1-\theta)$ periods.
:::

Log-linearising [[#eq-calvo-agg]] around a zero-inflation steady state gives

$$
\pi_t = (1-\theta)(p_t^* - p_{t-1}),
$$

and the reset price $p_t^*$ is a present value of current and expected future nominal marginal costs, discounted at $\beta\theta$. Combining these produces the **New Keynesian Phillips curve** of the next chapter,

$$
\pi_t = \beta\E_t\pi_{t+1} + \lambda\,\widehat{\mathrm{mc}}_t,
\qquad \lambda = \frac{(1-\theta)(1-\beta\theta)}{\theta},
$$ {#eq-nkpc-mc}

where $\widehat{\mathrm{mc}}_t$ is real marginal cost in log deviation from the steady-state desired mark-up. The slope $\lambda$ is decreasing in $\theta$: stickier prices, flatter Phillips curve. Rotemberg (*Journal of Monetary Economics*, 1982) obtained a formally identical Phillips curve from a quadratic cost of *changing* prices, without random draws; the mapping between the Rotemberg penalty and $\theta$ is a calibration choice.

::: proposition Duration and the Calvo hazard {#prop-duration}
Under Calvo, the probability that a price set at $t$ still binds at $t+k$ is $\theta^k$. The expected duration is $\sum_{k=0}^{\infty}\theta^k = 1/(1-\theta)$. The fraction of prices reset at least once within a year (four quarters) is $1-\theta^4$.
:::
::: proof
The survival function of a geometric distribution with continuation probability $\theta$ is $\theta^k$. The mean of that distribution, counting the current quarter as the first, is $1/(1-\theta)$. The probability of surviving four quarters without a reset is $\theta^4$, so the complementary probability is $1-\theta^4$.
:::

::: example A quarterly Calvo parameter {#ex-calvo-theta}
Take $\theta=0.75$ at quarterly frequency, $\beta=0.99$. Compute mean duration, the share of prices that reset within a year, and the slope $\lambda$ in [[#eq-nkpc-mc]].
::: solution
Mean duration is $1/0.25=4$ quarters. The share that reset within a year is $1-0.75^4 = 1-0.3164 = 0.684$, about two thirds. Then $\lambda = (0.25)(1-0.99\times 0.75)/0.75 = 0.25\times 0.2575/0.75 = 0.0858$. A $1$ percent real-marginal-cost gap produces $0.086$ percentage points of inflation on impact, holding expected future inflation fixed. That is a flat Phillips curve — the Calvo price of matching an eight-to-twelve-month micro duration. Mapping $\widehat{\mathrm{mc}}$ into an output gap, as the next chapter does, multiplies $\lambda$ by a factor on the order of $2$, still leaving a modest slope.
:::
:::

::: warning Calvo is not a menu cost {#warn-calvo}
Calvo firms reset with probability $1-\theta$ even if they are already at $p^*$, and they fail to reset with probability $\theta$ even if they are far from $p^*$. That is the opposite of state dependence, and it kills the Golosov–Lucas selection effect. Using a Calvo $\theta$ calibrated to the *average* micro duration therefore *overstates* stickiness in the aggregate relative to a menu-cost model with the same average duration. Nakamura and Steinsson (*Annual Review of Economics*, 2013) survey the quantitative gap. The three-equation model of the next chapter uses Calvo anyway, because it aggregates. Treat $\theta$ as a reduced-form slope, not as a structural hazard.
:::

::: widget plot
f: (1-th)*(1-0.99*th)/th
sliders: th=0.75:0.5:0.95
x: 0, 1
y: 0, 0.6
labels: \text{lambda (ignore x)}
caption: The Calvo slope $\lambda=(1-\theta)(1-\beta\theta)/\theta$ with $\beta=0.99$, plotted as a horizontal line against a dummy $x$. Move $\theta$ from $0.5$ (mean duration two quarters) to $0.95$ (twenty quarters). The Phillips curve flattens fast: at $\theta=0.75$ one has $\lambda\approx 0.086$; at $\theta=0.9$ one has $\lambda\approx 0.011$. A given marginal-cost gap then needs a much larger output movement to move inflation — or, equivalently, inflation becomes cheap to stabilise and output expensive.
:::

The widget's first function does not depend on $x$; it is a slider readout of $\lambda(\theta)$. Read the value off the vertical axis as you move $\theta$.

## Micro evidence on prices and wages

The empirical literature using CPI micro data and scanner data is large enough to constrain $\theta$, and not large enough to choose between Calvo and menu costs.

- **Bils and Klenow** (*Journal of Political Economy*, 2004), U.S. CPI 1995–97: the median duration of a posted price is about $4.3$ months. Including sales is the reason the number is that low.
- **Nakamura and Steinsson** (*Quarterly Journal of Economics*, 2008), CPI 1998–2005: excluding sales, median duration is $8$–$11$ months. Sales are transitory and may not be the margin on which monetary non-neutrality operates. They also document that the frequency of regular-price changes co-moves with inflation (more resets when $\pi$ is high), a state-dependent signature.
- **Alvarez, Le Bihan and Lippi** (*American Economic Review*, 2016) and the ECB *Inflation Persistence Network*: euro-area consumer prices have durations of the same order, with substantial cross-country and cross-sector dispersion. Producer prices are stickier than consumer prices in several studies.
- **Klenow and Kryvtsov** (*American Economic Review*, 2008) decompose inflation into an intensive margin (size of changes) and an extensive margin (frequency). In U.S. CPI data both margins move; a pure Calvo model has only the intensive margin.
- **Wages.** Individual wage records (for example, Barattieri, Basu and Gottschalk, *AEJ: Macro* 2014, for the United States) show a large mass of exactly-zero nominal wage changes, especially at low inflation. Bewley (*Why Wages Don't Fall During a Recession*, 1999) documented the personnel-practice reasons. Sticky *nominal* wages, combined with flexible prices, produce a real-wage mechanism that is almost the dual of sticky prices; Erceg, Henderson and Levin (*Journal of Monetary Economics*, 2000) put both into a New Keynesian model and showed that the extra rigidity matters for welfare and for the output–inflation trade-off.

None of these studies is a randomised trial of monetary policy. They measure the *hazard* of a price change, not the *causal* effect of money on output. Combining them with identified monetary shocks (Romer–Romer; high-frequency surprises around FOMC announcements, Gürkaynak, Sack and Swanson *International Journal of Central Banking* 2005 and a large later literature) is how one gets from "prices last three quarters" to "money is non-neutral for several quarters". The mapping is model-dependent, which is why the warning on Calvo versus menu costs is not a footnote.

::: example From monthly frequency to quarterly $\theta$ {#ex-monthly}
Bils and Klenow's median duration of $4.3$ months corresponds to a monthly reset probability of $1/4.3 \approx 0.233$. If months are independent, what is the probability that a price is *not* reset in a given quarter, and what quarterly Calvo $\theta$ does that suggest? Compare with Nakamura–Steinsson's $9$-month (sales-excluded) duration.
::: solution
The quarterly survival probability is $(1-0.233)^3 = 0.767^3 \approx 0.452$. That is a quarterly $\theta$ of about $0.45$, mean duration $1/0.55\approx 1.8$ quarters — much more flexible than the $\theta=0.75$ popular in estimated DSGE models. For a $9$-month duration the monthly hazard is $1/9\approx 0.111$, quarterly survival $(0.889)^3\approx 0.702$, so $\theta\approx 0.70$, mean duration $3.3$ quarters, in the DSGE ballpark. Whether sales "count" is therefore a first-order calibration choice, not a detail.
:::
:::

::: example Indexation and a lagged term {#ex-index}
Suppose a fraction $\omega$ of non-resetting firms index to last period's inflation, so the NKPC becomes $\pi_t = \frac{\beta}{1+\beta\omega}\E_t\pi_{t+1} + \frac{\omega}{1+\beta\omega}\pi_{t-1} + \frac{\lambda}{1+\beta\omega}\widehat{\mathrm{mc}}_t$. If $\omega=0.5$, $\beta=0.99$ and $\lambda=0.086$, what weight sits on lagged inflation, and why does this help match inflation persistence?
::: solution
The weight on $\pi_{t-1}$ is $0.5/(1+0.99\times 0.5)=0.5/1.495\approx 0.33$. One third of inflation is then inherited from last quarter even if $\widehat{\mathrm{mc}}$ is white noise. Pure Calvo ($\omega=0$) has no such term: inflation is only as persistent as marginal cost. Christiano, Eichenbaum and Evans (2005) used indexation for that reason. Whether $\omega=0.5$ is a structural description of contracts or a reduced-form patch for omitted persistence is the Gali–Gertler versus Rudd–Whelan dispute.
:::
:::

::: quiz
A Calvo $\theta=0.8$ at quarterly frequency means that
- [ ] every firm waits exactly five quarters between price changes
- [x] a firm has an $80$ percent chance of keeping its price this quarter, regardless of how long it has been since the last change
- [ ] the aggregate price level is fixed for four quarters
- [ ] menu costs are $80$ percent of revenue
::: solution
Calvo is a constant hazard: the probability of not resetting is $\theta$ each period, memoryless. Mean duration is $1/(1-\theta)=5$ quarters, but that is a mean, not a fixed wait. The aggregate price level moves every period because $1-\theta=20$ percent of firms reset. Menu costs are a different model.
:::
:::

## Real rigidities and the missing magnification

Ball and Romer (*Review of Economic Studies*, 1990) pointed out that *nominal* rigidities of plausible private size do not, by themselves, produce much aggregate non-neutrality. One also needs **real rigidities**: features that make a firm's desired relative price insensitive to aggregate demand — intermediate inputs (Basu, *American Economic Review* 1995), strategic complementarity in pricing (the desired $p^*$ depends on other firms' prices), or a labour-supply schedule that is elastic at the margin. Without them, the firms that *do* reset move a lot, and the aggregate price level still jumps. Estimated New Keynesian models (Smets and Wouters 2007) load heavily on these complementarities, sometimes more than the micro evidence on mark-ups and input-output structure easily bears. That is an open quantitative tension, not a reason to return to flexible prices: the identified monetary VARs still want several quarters of real effects.

Indexation is a reduced-form patch. Christiano, Eichenbaum and Evans (2005) let non-resetting firms index to lagged inflation, which adds a backward-looking term to the Phillips curve and helps match inflation persistence. Pure Calvo around a zero-inflation steady state has *no* intrinsic inflation persistence: $\pi_t$ is as persistent as $\widehat{\mathrm{mc}}_t$. Whether U.S. inflation is that forward-looking is a live dispute (Gali and Gertler, *Journal of Monetary Economics* 1999, versus Rudd and Whelan, *Journal of Monetary Economics* 2005).

## Where this leads

[[business-cycles/new-keynesian-model]] takes Calvo pricing, the household Euler equation of the RBC chapter, and an interest-rate rule, and writes three linear equations in $(\tilde y_t,\pi_t,i_t)$. That is the workhorse. [[business-cycles/monetary-policy-rules]] asks how the rule should look if prices are sticky in this sense. If one prefers menu costs, the qualitative non-neutrality survives and the quantitative Phillips slope changes; the three-equation apparatus is then an approximation. Wage rigidity, which this chapter only sketched, reappears as an extra trade-off: with both prices and wages sticky, there is no policy that simultaneously stabilises inflation, wage inflation and the output gap (Erceg–Henderson–Levin). That is a reason the "divine coincidence" of the next chapter is special, not generic.

::: history
**1977–80, Stanley Fischer and John B. Taylor.** Overlapping nominal contracts showed that rational expectations plus a fixed nominal wage or price for two periods is enough for money to move output. **1983, Guillermo A. Calvo.** Random staggering delivered a tractable, forward-looking Phillips curve. **1985, N. Gregory Mankiw and George A. Akerlof with Janet L. Yellen.** Menu costs and near-rationality explained why a privately tiny friction is not privately absurd, yet aggregates to a first-order demand externality.
:::

::: summary
- Money is neutral when every price resets continuously. Identified monetary shocks and disinflations say that it is not, for several quarters.
- Menu costs create an inaction band; small shocks need not move posted prices, large shocks do. Selection effects in state-dependent models make *aggregate* prices more flexible than average durations suggest.
- Calvo pricing is a constant-hazard convenience. Mean duration is $1/(1-\theta)$; the Phillips slope $\lambda=(1-\theta)(1-\beta\theta)/\theta$ falls rapidly as $\theta$ rises.
- Micro durations are $4$–$11$ months in U.S. CPI data depending on sales; euro-area studies are in the same range. Wages show a mass of zero nominal changes.
- Real rigidities are needed to magnify small nominal frictions. Calvo versus menu cost, and the role of indexation, remain quantitative disputes; non-neutrality itself is not.
:::

## Exercises

::: exercise Calvo duration {level=1 check="5"}
If $\theta=0.8$ quarterly, what is the mean duration of a posted price, in quarters? (Enter the integer.)
::: solution
$1/(1-0.8)=5$.
:::
:::

::: exercise Yearly resets {level=1 check="0.59"}
With $\theta=0.8$, what fraction of prices are reset at least once within four quarters, to two decimals? (Enter e.g. 0.59.)
::: solution
$1-0.8^4 = 1-0.4096=0.5904$, so $0.59$.
:::
:::

::: exercise Neutrality {level=1}
State the thought experiment in [[#def-neutrality]] and give one historical episode from this chapter that is hard to reconcile with short-run neutrality.
::: solution
Double (or scale) all nominal quantities at once; real quantities should not change if money is neutral. The Volcker disinflation of 1981–82 combined a deliberate monetary tightening with an 16-month NBER recession and unemployment of 10.8 percent. A purely real account must claim that a technology or preference shock happened to coincide with the FOMC's actions; the narrative and VAR evidence cited in the introduction make that coincidence a stretch.
:::
:::

::: exercise Menu-cost band {level=2 check="0.02"}
In the quadratic-loss formula of [[#def-menu]], take $\varepsilon=4$ and $\phi=0.0008$ of revenue. Compute $\bar p=\sqrt{2\phi/\varepsilon}$ to two decimals (as a decimal, not percent). (Enter e.g. 0.02.)
::: solution
$\sqrt{2\times 0.0008/4}=\sqrt{0.0004}=0.02$. The band is $\pm 2$ percent.
:::
:::

::: exercise Phillips slope {level=2}
Using [[#eq-nkpc-mc]] with $\beta=0.99$, compare $\lambda$ at $\theta=0.6$ and $\theta=0.9$. What does the comparison say about the cost of a given demand expansion in inflation units?
::: solution
At $\theta=0.6$, $\lambda=(0.4)(1-0.99\times 0.6)/0.6=(0.4)(0.406)/0.6=0.271$. At $\theta=0.9$, $\lambda=(0.1)(1-0.891)/0.9=(0.1)(0.109)/0.9=0.0121$. Stickier prices (higher $\theta$) flatten the Phillips curve by a factor of about twenty. A given real-marginal-cost (hence output-gap) expansion then produces much less inflation — which is a reason a central bank that faces very sticky prices can move $\tilde y$ with little $\pi$, and a reason the same bank has trouble moving $\pi$ without large $\tilde y$ when it wants to disinflate.
:::
:::

::: exercise Sales and $\theta$ {level=2}
Why does excluding sales from the CPI micro data raise estimated durations, and why might a monetary model care more about the sales-excluded number?
::: solution
Sales are frequent, transitory markdowns that return to a regular price. Including them counts many short spells and pulls the median duration down (Bils–Klenow $4.3$ months versus Nakamura–Steinsson $8$–$11$). If sales are a response to idiosyncratic inventory or demand and are not the margin on which firms respond to a monetary shock, the regular-price duration is the one that belongs in $\theta$. If sales *are* a monetary margin, excluding them overstates stickiness. The data do not settle that; they force the modeller to pick.
:::
:::

::: exercise Selection versus Calvo {level=3}
Explain the Golosov–Lucas selection effect in a menu-cost model, and why a Calvo calibration to the same average duration overstates monetary non-neutrality.
::: hint
Which firms reset, and by how much, after an aggregate shock?
:::
::: solution
In a menu-cost model the firms that reset are those already near the edge of the inaction band — the most mispriced. Their reset is large, so the aggregate price index moves more, per resetting firm, than it would if a random $\theta$-share reset (Calvo). Matching the *average* duration therefore requires, under Calvo, more aggregate stickiness than the menu-cost model produces. Golosov and Lucas (2007) found that this selection can make money close to neutral unless real rigidities damp the size of those resets. Subsequent work (Midrigan, *Econometrica* 2011, with multi-product firms; Nakamura and Steinsson's survey) has qualified the quantitative punch, but the qualitative ranking remains: Calvo is the more non-neutral of the two, given the same micro duration.
:::
:::

::: exercise Fischer–Taylor versus Calvo {level=3}
In Taylor's two-period overlapping contracts every wage is reset on a known date. In Calvo the reset date is random. Discuss one empirical implication of that difference for the distribution of price ages and one implication for a disinflation announced in advance.
::: hint
Memoryless hazard versus a spike at a known maturity; credibility and the front-loading of a Taylor contract.
:::
::: solution
Taylor (and Fischer) produce a *uniform* distribution of contract ages between $0$ and the known length, and a spike of resets at that length. Calvo produces a geometric distribution of ages, with some prices arbitrarily old. Empirically, a spike at a focal duration (one year, for many wages and some catalogues) favours Taylor; a long right tail of old prices favours Calvo or a heterogeneous-menu-cost mix. For an announced, credible disinflation, Taylor contracts that are reset *before* the disinflation can front-load the new path of money into the new wage, so the real effects shrink with the announcement; Calvo firms that happen not to draw a reset still carry the old price, so announcement is not enough — one also needs the hazard $1-\theta$ to work through the stock of old prices. That is one reason purely forward-looking Calvo disinflations can be costly even when fully believed (Ball, *American Economic Review* 1994, on sacrifice ratios with sticky prices).
:::
:::
