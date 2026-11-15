A default-free bond is a claim to a known stream of cash. Its price is still $p = \E[mx]$, but the payoff $x$ is not random if we ignore inflation and default, so the randomness that remains is the randomness of $m$ over the life of the bond. That randomness is the **term structure**: why a one-year claim and a thirty-year claim, both sure in nominal terms, trade at different yields, and why those yields move. This chapter defines spot and forward rates, bootstraps a curve from coupon bonds, computes duration and convexity, and states the expectations, liquidity-premium and preferred-habitat accounts of the curve. The cash flows are invented. A yield is not a forecast of holding-period return, and nothing here is a recommendation to hold any maturity.

Valuing a single coupon bond at a given yield is [[corporate-finance/valuing-bonds]]. The SDF is [[asset-pricing/stochastic-discount-factor]].

## Spot rates, forward rates and yields

::: definition Discount, spot and forward {#def-spot}
Let $P(0,T)$ be the price, today, of a default-free zero-coupon bond that pays $1$ at date $T$. The **spot rate** (zero-coupon yield) of maturity $T$, with annual compounding, is

$$
z_T = P(0,T)^{-1/T} - 1,
$$

so $P(0,T) = 1/(1+z_T)^T$. The **one-period forward rate** from $T$ to $T+1$, agreed today, is

$$
f_{T,T+1} = \frac{P(0,T)}{P(0,T+1)} - 1 = \frac{(1+z_{T+1})^{T+1}}{(1+z_T)^T} - 1.
$$

A **yield to maturity** $y$ of a coupon bond is the constant rate that prices its cash flows: $p = \sum_{\tau} c_{\tau}/(1+y)^{\tau}$. Yield to maturity equals the spot rate only for zeros; for coupon bonds it is a blend of the spots along the cash-flow schedule.
:::

The **yield curve** is $z_T$ (or the par-coupon yield) against $T$. An **upward-sloping** curve has $z_T$ increasing in $T$, so that forwards lie above spots; a **inverted** curve has $z_T$ decreasing, and forwards below spots. The curve is a set of prices. It becomes a set of expected future short rates only given a model of $m$, which is the content of the last section of this chapter.

::: proposition Factorisation of a zero {#prop-factor}
A long zero is a product of one-period forwards:

$$
P(0,T) = \frac{1}{(1+z_1)(1+f_{1,2})\cdots(1+f_{T-1,T})}.
$$

Equivalently, $(1+z_T)^T = (1+z_1)(1+f_{1,2})\cdots(1+f_{T-1,T})$. The identity is bookkeeping: it does not say that $f_{T,T+1}$ is an expected future spot.
:::

::: proof
By definition, $1+f_{t,t+1} = P(0,t)/P(0,t+1)$. The product of those ratios from $t = 0$ to $t = T-1$, with $P(0,0) = 1$, telescopes to $1/P(0,T)$. Taking $T$-th roots gives the equivalent form in spots.
:::

A **coupon bond** with cash flows $c_1,\ldots,c_T$ (the last including principal) has price $p = \sum_{\tau=1}^{T} c_{\tau} P(0,\tau)$. If the curve is known, the price is a sum. If the price is known and the curve is not, one **bootstraps**: recover $z_1$ from the shortest zero (or from a one-period coupon bond), then $z_2$ from a two-period coupon bond, and so on.

::: example Bootstrapping three spots {#ex-boot}
A one-year zero costs $0.97$ per unit of face. A two-year $4$ per cent annual coupon bond, face $100$, costs $99$. A three-year $5$ per cent annual coupon bond, face $100$, costs $100$. Recover $z_1$, $z_2$, $z_3$ and the forwards $f_{1,2}$, $f_{2,3}$.
::: solution
$z_1 = 1/0.97 - 1 \approx 0.030928$. The two-year bond pays $4$ then $104$:

$$
\frac{4}{1+z_1} + \frac{104}{(1+z_2)^2} = 99 \implies (1+z_2)^2 = \frac{104}{99 - 4/1.030928} = \frac{104}{95.120},
$$

so $z_2 \approx 0.045637$. The three-year bond pays $5$, $5$, $105$:

$$
\frac{5}{1+z_1} + \frac{5}{(1+z_2)^2} + \frac{105}{(1+z_3)^3} = 100,
$$

and $z_3 \approx 0.050487$. Then $f_{1,2} = (1+z_2)^2/(1+z_1) - 1 \approx 0.06056$ and $f_{2,3} = (1+z_3)^3/(1+z_2)^2 - 1 \approx 0.06025$. The curve of spots is upward-sloping ($3.09$, $4.56$, $5.05$ per cent); the one-year forwards from year $1$ and year $2$ sit near $6.05$ per cent, above the spots, as [[#prop-factor]] requires on an upward curve. These are invented quotes, not a government curve on any date.
:::
:::

A yield to maturity is a different object, and it is the number a coupon bond is usually quoted in.

::: example Price at a flat yield, and the inverse problem {#ex-ytm}
A three-year $5$ per cent annual coupon bond, face $100$, is priced at a flat yield of $6$ per cent. Compute the price. Then, if the same bond is observed at a price of $102$, compute the yield to maturity (the unique positive root of the pricing equation).
::: solution
At $y = 0.06$,

$$
p = \frac{5}{1.06} + \frac{5}{1.06^2} + \frac{105}{1.06^3} \approx 4.7170 + 4.4490 + 88.1610 = 97.327.
$$

At a price of $102$, Newton's method on $g(y) = 5/(1+y) + 5/(1+y)^2 + 105/(1+y)^3 - 102$, starting at $y = 0.05$, converges in two steps to $y \approx 0.042755$. The bond trades *above* par, so its yield sits *below* the coupon rate of $5$ per cent, as it must. The $6$ per cent price and the $4.28$ per cent yield are two different quotes, on two different prices, of the same cash-flow schedule. Neither is a forecast of next year's short rate.
:::
:::

::: widget newton
f: 5/(1+x) + 5/(1+x)^2 + 105/(1+x)^3 - 102
x0: 0.05
x: 0, 0.12
y: -10, 10
caption: Newton's method for the yield to maturity of the three-year $5$ per cent bond at a price of $102$. The root is near $0.0428$. Step through the iteration; it settles in two steps from $x_0 = 0.05$. The figure is the invented bond of [[#ex-ytm]], not a market quote.
:::

::: widget plot
f: 0.031 + 0.022*(1-exp(-a*x))
x: 0.25, 10
y: 0.02, 0.07
sliders: a=0.5:0.15:1.5:0.05
labels: \text{spot curve}
caption: A cartoon of an upward-sloping spot curve, $z_T = 0.031 + 0.022(1-e^{-aT})$, in the shape of a one-factor Nelson–Siegel level-plus-slope. Raise $a$ and the curve approaches its long rate faster. The numbers are a sketch, not a fitted government curve, and the long rate is not a forecast of average future short rates unless a model of $m$ says so.
:::

## Duration, convexity and immunisation

A bond's price falls when its yield rises. The first-order sensitivity is **duration**; the second is **convexity**.

::: definition Macaulay and modified duration, convexity {#def-duration}
For a coupon bond with cash flows $c_{\tau}$ at dates $\tau = 1,\ldots,T$, price $p$ and yield $y$ (annual compounding matching the cash-flow frequency),

$$
D_{\mathrm{Mac}} = \frac{1}{p}\sum_{\tau=1}^{T} \tau\,\frac{c_{\tau}}{(1+y)^{\tau}}, \qquad D_{\mathrm{mod}} = \frac{D_{\mathrm{Mac}}}{1+y},
$$

$$
\mathrm{Conv} = \frac{1}{p}\sum_{\tau=1}^{T} \tau(\tau+1)\frac{c_{\tau}}{(1+y)^{\tau+2}}.
$$

Macaulay duration is a present-value-weighted average maturity, in years. Modified duration satisfies $dp/p \approx - D_{\mathrm{mod}}\, dy$. Convexity is the second derivative: $d^2p/dy^2 = p\cdot\mathrm{Conv}$, so

$$
\frac{\Delta p}{p} \approx - D_{\mathrm{mod}}\,\Delta y + \tfrac12 \mathrm{Conv}\,(\Delta y)^2.
$$
:::

Duration is lower when the coupon is higher (more of the present value arrives early) and when the yield is higher (distant cash is discounted more). A zero of maturity $T$ has Macaulay duration $T$. A perpetuity with coupon rate equal to $y$ has Macaulay duration $(1+y)/y$; at $y = 0.05$ that is $21$ years.

::: example Duration and a one-point yield rise {#ex-dur}
For the three-year $5$ per cent bond at $y = 0.06$ (price $97.327$ from [[#ex-ytm]]), compute Macaulay duration, modified duration and convexity. Then compare the duration approximation, the duration-plus-convexity approximation, and the exact price at $y = 0.07$.
::: solution
$D_{\mathrm{Mac}} \approx 2.857$ years, $D_{\mathrm{mod}} \approx 2.696$, $\mathrm{Conv} \approx 10.004$. A one-point rise in yield, $\Delta y = 0.01$, gives a duration-only price change of $-2.696\times 0.01\times 97.327 \approx -2.624$, hence an approximate price of $94.703$. Adding convexity, $+0.5\times 10.004\times 0.01^2\times 97.327 \approx +0.049$, gives $94.752$. The exact price at $7$ per cent is $94.751$. Convexity has accounted for the curvature; duration alone overstated the fall, as it must for a conventional fixed-coupon bond, which is convex. These are the invented cash flows. Duration is a local sensitivity, not a forecast of how any government curve will move.
:::
:::

**Immunisation** is the matching of a liability's Macaulay duration with that of a bond portfolio, so that a small *parallel* shift in a *flat* yield curve leaves the surplus approximately unchanged. It is a first-order, one-factor hedge. It fails if the curve steepens, if the shift is large (convexity then matters, and a more convex portfolio gains on a large move), or if cash flows must be reinvested at new rates as time passes (duration matching has to be rebalanced). Redington (1952) is the classical actuarial statement. This chapter treats immunisation as an application of [[#def-duration]], not as a prescription for any particular balance sheet.

::: example A two-bond duration match {#ex-imm}
A liability of duration $3$ years is to be matched, at a flat $5$ per cent yield, with a two-year $4$ per cent annual coupon bond (price $98.141$, Macaulay duration $1.961$) and a five-year $5$ per cent annual coupon bond (price $100$, Macaulay duration $4.546$). Find the value weights.
::: solution
$w_2 D_2 + w_5 D_5 = 3$ and $w_2 + w_5 = 1$ give $w_2 = (4.546-3)/(4.546-1.961) \approx 0.598$ and $w_5 \approx 0.402$. The mix has Macaulay duration $3$ at this yield. A small parallel shift leaves the present-value surplus approximately unchanged; a twist of the curve, or a large shift, does not. The two bonds are invented, and the mix is a numerical illustration of a first-order condition, not a recommended barbell.
:::
:::

::: warning Treating yield as expected return
The yield to maturity is the constant rate that, if it were the reinvestment rate of every coupon and if the bond were held to maturity, would be the holding-period return. If the curve moves, or if coupons are not reinvested at $y$, the realised holding-period return is a different number. A one-year return on a ten-year bond is approximately $y - D_{\mathrm{mod}}\Delta y$, which can be far from $y$. Quoting a yield of $5$ per cent is not a forecast that the holder will earn $5$ per cent over the next year, and it is not a reason to prefer that bond to a shorter one.
:::

## What the curve is saying

Why would $z_{10}$ exceed $z_1$? Three classical accounts, none of which this course treats as the unique truth.

**Pure expectations.** Forward rates *are* expected future spots: $1+f_{T,T+1} = \E[1+z_1^{(T)}]$, in the risk-neutral or the physical measure according to the statement. An upward curve then means that the short rate is expected to rise. The account is a statement that term premia are zero, i.e. that $m$ does not, at the margin, distinguish long bonds from rolled shorts. It is a useful null. It is rejected, in most samples of US Treasuries, by the finding that high forwards do not, one-for-one, precede high future spots (Fama and Bliss 1987; Campbell and Shiller 1991): the expectations hypothesis fails in its strong form.

**Liquidity (term) premium.** Hicks (1939) and Kaldor: long bonds have more interest-rate risk, risk-averse holders demand a premium, and forwards exceed expected spots by that premium. An upward curve is then a mix of expected rate rises and a positive term premium. The sign of the premium is an assumption about who is the marginal holder and what else is in their portfolio; a holder who *liabilities* are long may pay a premium to hold longs, which is the opposite sign.

**Preferred habitat.** Culbertson (1957) and Modigliani and Sutch (1966): different clienteles inhabit different maturities, and supplies in those habitats move relative prices. The modern version is Vayanos and Vila (2021): arbitrageurs with limited capital transmit supply shocks along the curve, and term premia vary with the amount of duration the arbitrageurs have to hold. Preferred habitat is compatible with no arbitrage (there is still an $m$); it is not compatible with a term premium that is constant across maturities and time.

In SDF language, $P(0,T) = \E[m_{0,T}]$, where $m_{0,T} = m_1 m_2 \cdots m_T$ is the multi-period discount factor. A one-factor short-rate model — Vasicek (1977), Cox–Ingersoll–Ross (1985) — specifies a process for the short rate and a market price of rate risk, hence an $m$, and produces a whole curve from two or three parameters. Affine models of Duffie and Kan (1996) generalise that idea. This course only needs the identification: a term-structure *model* is a model of $m$ specialised to default-free claims. Fitting it to a curve on one date is an interpolation. Using it to forecast next year's excess return on longs is a test of the model's term premium, and that test is the expectations-hypothesis literature above.

::: quiz
On an upward-sloping spot curve, one-period forward rates lie:
- [ ] below the spots of the same maturity
- [x] above the spots, because a rising $z_T$ forces the last one-period factor $1+f_{T-1,T}$ above $1+z_T$
- [ ] equal to expected future spots, without further assumption
- [ ] equal to the coupon rate of par bonds
::: solution
[[#prop-factor]] is an identity: an increasing $z_T$ pulls the marginal forward above the spot. Equality of forwards with expected future spots is the expectations hypothesis, an extra assumption. Par coupon rates lie between spots of nearby maturities but are not equal to forwards.
:::
:::

## Where this leads

[[derivatives]] prices options on bonds and on rates by taking $\E^*$ of a non-linear payoff, using the same $m$ that prices the underlying zeros. Credit-risky claims replace the default-free $x = 1$ by a recovery in default; that is a different course. [[time-series]] is where the statistical tests of the expectations hypothesis, and the estimation of affine models, are done properly. The next time a yield curve is described as “pricing in” a path of short rates, ask which measure — physical or risk-neutral — and which term premium has been set to zero.

::: history
Frederick Macaulay's *Some Theoretical Problems Suggested by the Movements of Interest Rates, Bond Yields and Stock Prices in the United States since 1856* (NBER, 1938) defined the duration that bears his name. John Hicks's *Value and Capital* (1939) stated the liquidity-premium hypothesis. The expectations hypothesis in its modern statistical form is tested by Fama and Bliss (1987, *American Economic Review*) and Campbell and Shiller (1991, *Review of Economic Studies*). Oldřich Vasicek's 'An Equilibrium Characterization of the Term Structure' (*Journal of Financial Economics*, 1977) and Cox, Ingersoll and Ross (1985, *Econometrica*) are the first widely used one-factor short-rate models. Redington (1952, *Journal of the Institute of Actuaries*) is the classical immunisation paper.
:::

::: summary
- A zero of maturity $T$ has price $P(0,T) = 1/(1+z_T)^T$. Forwards factor the long zero: $(1+z_T)^T = \prod (1+f)$. Yield to maturity is the constant rate that prices a coupon bond; it equals $z_T$ only for zeros.
- Bootstrapping recovers spots from coupon prices, shortest first. In the invented three-bond book, $z_1 \approx 3.09\%$, $z_2 \approx 4.56\%$, $z_3 \approx 5.05\%$, with one-year forwards near $6.05\%$.
- A three-year $5$ per cent bond yields $6$ per cent at a price of $97.327$, and yields $4.276$ per cent at a price of $102$. Newton's method finds the second number in two steps from $0.05$.
- Macaulay duration is a present-value-weighted maturity. Modified duration is the percentage price sensitivity to $y$. Convexity is the second-order term and is positive for fixed coupons. Immunisation matches duration to a liability under a parallel, small, flat-curve shift.
- The expectations hypothesis, liquidity premia and preferred habitat are three accounts of why $z_T$ varies with $T$. The strong expectations hypothesis is rejected, in standard US samples, by Fama–Bliss and Campbell–Shiller tests. A term-structure model is a model of $m$.
:::

## Exercises

::: exercise One-year spot {level=1 check="0.030928"}
A one-year zero costs $0.97$ per unit of face. Enter $z_1$ to six decimals.
::: solution
$1/0.97 - 1 = 0.030927835\ldots$, which rounds to $0.030928$. This is [[#ex-boot]].
:::
:::

::: exercise Price at $6$ per cent {level=1 check="97.327"}
Enter the price of the three-year $5$ per cent annual bond at a flat $6$ per cent yield, to three decimals.
::: solution
$5/1.06 + 5/1.06^2 + 105/1.06^3 \approx 97.327$, as in [[#ex-ytm]]. The face is $100$, so the bond is below par, as $y >$ coupon requires.
:::
:::

::: exercise Perpetuity duration {level=1 check="21"}
Enter the Macaulay duration, in years, of a perpetuity at $y = 0.05$.
::: solution
$(1+y)/y = 1.05/0.05 = 21$. A thirty-year coupon bond at the same yield has duration well below $21$; the perpetuity is the upper limit for a fixed coupon at this $y$.
:::
:::

::: exercise Two-year spot {level=2 check="0.0456"}
From [[#ex-boot]], enter $z_2$ to four decimals.
::: solution
$z_2 \approx 0.045637$, which rounds to $0.0456$. The corresponding $f_{1,2}$ is about $0.0606$.
:::
:::

::: exercise Modified duration {level=2 check="2.696"}
From [[#ex-dur]], enter modified duration of the three-year $5$ per cent bond at $y = 0.06$, to three decimals.
::: solution
$D_{\mathrm{Mac}}/1.06 \approx 2.857/1.06 \approx 2.696$. The duration-only price change for $\Delta y = 0.01$ is then about $-2.624$ units of money.
:::
:::

::: exercise Newton's first step {level=2}
For $g(y) = 5/(1+y)+5/(1+y)^2+105/(1+y)^3-102$ at $y_0 = 0.05$, compute $g(y_0)$ and $g'(y_0)$, and take one Newton step. Compare with the root $0.042755$.
::: solution
At $y = 0.05$ the price is $100$ (par), so $g(0.05) = 100-102 = -2$. The derivative is minus the present-value-weighted sum of times, $g'(y) = -\sum \tau c_{\tau}/(1+y)^{\tau+1} = -p D_{\mathrm{mod}}$ at par. A three-year $5$ per cent bond at $5$ per cent has $D_{\mathrm{Mac}} = (1\times 5 + 2\times 5 + 3\times 105)/100 = 2.85$, $D_{\mathrm{mod}} = 2.85/1.05 \approx 2.714$, so $g'(0.05) \approx -271.4$ (price per unit of $y$). The Newton step is $0.05 - (-2)/(-271.4) = 0.05 - 0.00737 = 0.04263$, already within $0.00013$ of the root $0.042755$. The second step finishes the job, as the widget shows.
:::
:::

::: exercise Why immunisation is only first-order {level=3}
A surplus is duration-matched on a flat curve. Sketch two curve moves that change the surplus to first order, and one move that changes it only to second order. What does a more convex asset portfolio do in the second-order case?
::: hint
Parallel small shift; steepening; large parallel shift.
:::
::: solution
A *steepening* (or any twist that is not a parallel shift of a flat curve) changes the present values of the asset and the liability by different amounts even if Macaulay durations match, because the cash-flow *schedules* differ; that is a first-order failure of the one-factor hedge. A *large parallel* shift is second-order: duration matching cancels the first derivative, convexity remains. A small parallel shift of a flat curve is the case immunisation is built for, and the surplus is unchanged to first order. A more convex asset portfolio (typically, more dispersed cash-flow dates — a barbell rather than a bullet) *gains* on a large parallel move, because $\tfrac12 \mathrm{Conv}(\Delta y)^2$ is positive. That gain is a second-order edge, not a reason to barbell without regard to the twists that are first-order.
:::
:::

::: exercise Forwards and the expectations hypothesis {level=3}
Using [[#prop-factor]], show that if $z_T$ is increasing in $T$ then $f_{T-1,T} > z_T$. Under the pure expectations hypothesis (in the physical measure, with certainty, or with risk-neutral expectation replacing the future spot), what does an upward curve then say about future short rates? Name the finding that rejects the strong form of this hypothesis on US Treasuries.
::: hint
Write $(1+z_T)^T = (1+z_{T-1})^{T-1}(1+f_{T-1,T})$ and compare $z_T$ with $z_{T-1}$.
:::
::: solution
$(1+z_T)^T = (1+z_{T-1})^{T-1}(1+f_{T-1,T})$. If $z_T > z_{T-1} > 0$, then $1+z_T > 1+z_{T-1}$, so $1+f_{T-1,T} = (1+z_T)^T / (1+z_{T-1})^{T-1} > 1+z_T$, hence $f_{T-1,T} > z_T$. Under pure expectations, $f_{T-1,T}$ is the expected future one-period spot (or its risk-neutral counterpart). An upward curve then means expected short rates sit above today's long spot, hence well above today's short spot: the short rate is expected to rise. Fama and Bliss (1987) and Campbell and Shiller (1991) find that the slope of the US Treasury curve does *not* forecast future spot changes one-for-one; the forecastability of the *excess return* on longs is the other side of that failure. The strong expectations hypothesis is rejected; a weak form with a constant (or slowly moving) term premium is the usual replacement, and even that is strained by the evidence that term premia move.
:::
:::
