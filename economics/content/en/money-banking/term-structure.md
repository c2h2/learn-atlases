A one-year loan and a ten-year loan are not the same product, even when both are promises to pay money. They differ in when the money arrives, in how uncertain the payments are, and in how easily the claim can be sold. Those differences show up as differences in yield. This chapter splits the yield on a debt claim into a **risk structure** (default, liquidity, tax treatment, at a given maturity) and a **term structure** (the pattern of yields across maturities, for a given risk class).

The previous chapter defined yield to maturity for a single bond ([[money-banking/interest-rates]]). Here a whole curve of those yields has to be explained. Three classical stories — pure expectations, liquidity (term) premia, and segmented markets — compete, and they are not mutually exclusive. Rating agencies summarise default risk in a letter; a letter is not a probability, but a transition matrix between letters is a usable model of how ratings move. The numbers on fictional bonds are illustrative. Dated Treasury yields are observations (FRED, H.15), not a forecast and not a recommended position.

## The risk structure of interest rates

Two bonds with the same promised cash-flow dates can trade at different yields. The gap is a **spread**, usually quoted in basis points (one basis point is 0.01 percentage points).

::: definition Credit spread {#def-spread}
The **credit spread** (or default spread) of a risky bond is the difference between its yield to maturity and the yield on a government (or otherwise default-free) bond of the same currency and comparable maturity. A **liquidity spread** is the extra yield on an otherwise similar but less readily traded instrument. A **tax spread** is the yield gap attributable to different tax treatments of the payments (for example, the gap between taxable and tax-exempt bonds in systems that exempt some interest from income tax).
:::

Default risk is the dominant component of most corporate and sovereign spreads over the local government curve. If a bond promises $C_t$ but pays it only with probability $1-\delta$ (and pays a recovery fraction $\rho$ of face in default), a risk-neutral buyer discounts the *expected* payment, not the promised one. The promised yield $y_{\mathrm{promised}}$ that solves the usual present-value equation from the *promised* cash flows then exceeds the default-free yield. Even with risk-neutral buyers,

$$
y_{\mathrm{promised}} - y_{\mathrm{safe}} \approx (1-\rho)\delta
$$ {#eq-spread-approx}

for a one-period bond with a small default probability $\delta$. Risk-averse buyers demand more; so do buyers who cannot diversify the default (a single-name concentration). Recovery, the probability, and the risk adjustment are all inside a published spread, which is why a 150 basis-point spread is not a 1.5 per cent annual default probability.

::: proposition One-period risk-neutral spread {#prop-rn-spread}
A one-period risky bond with face 1 pays $1$ with probability $1-\delta$ and $\rho$ with probability $\delta$. A one-period safe bond pays 1. If buyers are risk-neutral and both bonds are priced off the same discount rate $r$ on expected cash flows, the promised yield $y$ on the risky bond satisfies $1+y = (1+r)/\bigl(1-\delta(1-\rho)\bigr)$. Hence $y-r \approx \delta(1-\rho)$ when $\delta(1-\rho)$ is small.
:::

::: proof
The risky bond's price is $P = \bigl[(1-\delta)\cdot 1 + \delta\rho\bigr]/(1+r) = \bigl[1 - \delta(1-\rho)\bigr]/(1+r)$. Its promised yield solves $P = 1/(1+y)$, so $1+y = (1+r)/\bigl[1-\delta(1-\rho)\bigr]$. Taking logs, $y-r \approx \delta(1-\rho)$ to first order. The approximation drops higher-order terms in $\delta(1-\rho)$ and uses $\ln(1+x)\approx x$.
:::

**Ratings** (AAA, AA, …, C, D, and the parallel scales of the major agencies) are ordinal summaries of default risk, produced by private firms from accounting, sector and country information. They are not probabilities, they are not unique across agencies, and they are not official. They are still the language in which many investment mandates and bank capital rules are written, which is why a downgrade can force a sale even if no holder has changed their own forecast. A simple way to model rating dynamics is a **Markov chain**: next period's rating depends on this period's rating through a transition matrix, not on the more distant past.

::: widget markov
matrix: 0.90,0.08,0.02,0.00; 0.05,0.85,0.08,0.02; 0.00,0.10,0.80,0.10; 0.00,0.00,0.00,1.00
states: A; BBB; BB; D
start: 0
steps: 20
caption: An invented four-state rating chain. D is absorbing (default). Start in A and step through the walk; then start in BB. The matrix is not an agency's published table. It shows the logic of a rating as a state, not a forecast of any issuer.
:::

Liquidity premia appear when two claims with similar default risk trade at different yields because one is costlier to sell in size. On-the-run (just issued) government bonds typically yield a little less than off-the-run bonds of similar duration — a liquidity gap, not a default gap. In a crisis the gap widens: holders pay for the instrument they can repo or sell. Tax premia are mechanical in systems that exempt some interest: a tax-exempt yield $y_{\mu}$ and a taxable yield $y$ satisfy $y_{\mu} \approx (1-\tau)y$ for an investor with marginal tax rate $\tau$, if default and liquidity are comparable. Observed municipal-to-Treasury ratios in the United States wander around that line rather than sitting on it, because of default risk, tax-law uncertainty and clientele effects.

::: example A risk-neutral one-year spread {#ex-one-year-spread}
A fictional one-year safe yield is 5 per cent. A one-year risky zero has a 4 per cent chance of default and recovery of 40 per cent of face. What promised yield does a risk-neutral buyer require? What is the spread in basis points? Compare with the approximation $\delta(1-\rho)$.
::: solution
Expected payoff per unit of face: $0.96 \times 1 + 0.04 \times 0.40 = 0.976$. Price: $0.976/1.05 = 0.92952$. Promised yield: $1/0.92952 - 1 = 0.07582$, or 7.582 per cent. Spread: $7.582 - 5 = 2.582$ percentage points, or 258 basis points. Approximation: $\delta(1-\rho) = 0.04 \times 0.60 = 0.024$, or 240 basis points. The approximation understates the spread slightly because it ignores compounding through $1+r$ (the exact formula in [[#prop-rn-spread]] is $1.05/0.976 - 1 - 0.05 = 0.07582 - 0.05 = 0.02582$).
:::
:::

::: warning A rating is not a probability and a spread is not a default rate
A BBB letter does not mean "the one-year default probability is $x$". A 200 basis-point spread does not mean "the market thinks default is 2 per cent a year". Recovery, risk premia, liquidity and tax all sit inside the spread, and a rating is an ordinal class. Translating either into a trading view is a separate, and here unasked, exercise.
:::

## Spot rates, the yield curve and forward rates

The **yield curve** (term structure) is the map from maturity to yield, at a date, for a stated class of claims — typically default-free government bonds, on a stated compounding convention.

::: definition Spot and forward rates {#def-spot-forward}
The **spot rate** $s_n$ (or $i_{nt}$) is the yield to maturity on a default-free zero-coupon claim with $n$ periods to maturity. One unit today grows to $(1+s_n)^n$ at date $n$. The **one-period forward rate** $f_{n,n+1}$ from date $n$ to $n+1$, contracted today, is the rate satisfying

$$
(1+s_{n+1})^{n+1} = (1+s_n)^n (1+f_{n,n+1}),
$$ {#eq-forward}

so $f_{n,n+1} = (1+s_{n+1})^{n+1}/(1+s_n)^n - 1$. A **par yield** is the coupon rate that prices a coupon bond at par given the spot curve. Coupon-bond yields to maturity are *not* spot rates, except for zeros; they are averages of spots, weighted by the present-value shares of the coupons and principal.
:::

**Bootstrapping** reads spots off a set of coupon bonds by peeling one maturity at a time: the one-year coupon (or bill) gives $s_1$; the two-year coupon, with its first coupon discounted at $s_1$, gives $s_2$; and so on. With missing maturities one interpolates. The resulting zero curve is an input to almost every later pricing exercise.

A curve is **upward-sloping** (the usual case in peacetime data), **downward-sloping** or inverted, **humped**, or **flat**. Inversion — short rates above long rates — has often preceded recessions in US data, a correlation that is not a theorem and not a trading rule. The next section offers three explanations of the slope.

::: widget plot
f: 0.03 + 0.02*(1-exp(-0.4*x)); 0.055 - 0.015*(1-exp(-0.5*x)); 0.04 + 0*x
x: 0.25, 10
y: 0.02, 0.07
labels: \text{upward}; \text{inverted}; \text{flat}
caption: Three invented yield curves, with maturity in years on the horizontal axis and the spot rate on the vertical. Toggle which curve you look at. Shapes are a classification, not a forecast of any government's curve and not a recommendation.
:::

::: example Forward rates from three spots {#ex-forwards}
Annual spots are $s_1 = 4\%$, $s_2 = 4.5\%$, $s_3 = 5\%$. Compute the one-year forward rates $f_{1,2}$ and $f_{2,3}$.
::: solution
$f_{1,2} = (1.045)^2 / 1.04 - 1 = 1.092025/1.04 - 1 = 0.050024$, or 5.002 per cent. $f_{2,3} = (1.05)^3 / (1.045)^2 - 1 = 1.157625 / 1.092025 - 1 = 0.060072$, or 6.007 per cent. An upward-sloping spot curve produces forward rates that lie above the spots: each new spot is an average of previous spots and the new forward, so the forward has to sit above the spot to pull the average up.
:::
:::

::: example Bootstrapping a two-year spot {#ex-bootstrap}
A one-year 4 per cent annual coupon bond (face 100) trades at par. A two-year 5 per cent annual coupon bond trades at 100.96. Recover $s_1$ and $s_2$, and the implied two-year yield to maturity of the coupon bond (which you already know from the price — use it as a check on the idea that YTM is not $s_2$).
::: solution
Par one-year 4 per cent: $s_1 = 0.04$. The two-year bond:

$$
100.96 = \frac{5}{1.04} + \frac{105}{(1+s_2)^2} \implies \frac{105}{(1+s_2)^2} = 100.96 - 4.8077 = 96.1523,
$$

so $(1+s_2)^2 = 105/96.1523 = 1.09202$ and $s_2 = 0.04500$ (4.50 per cent). The coupon bond's own YTM solves $100.96 = 5/(1+y) + 105/(1+y)^2$, which gives $y \approx 4.49$ per cent, a blend of $s_1$ and $s_2$, slightly below $s_2$ because part of the cash flow comes at date 1. YTM is not the two-year spot.
:::
:::

## Three theories of the term structure

Why is the curve usually upward-sloping, and why does it invert?

::: definition Pure expectations hypothesis {#def-eh}
The **pure expectations hypothesis** (EH) in its common log (or, approximately, linear) form says that the long rate is the average of expected future short rates, and that the forward rate is the expected future spot:

$$
(1+s_n)^n = \prod_{k=0}^{n-1} \bigl(1 + \E i_{t+k}\bigr), \qquad f_{n,n+1} = \E_t s_{1,\, t+n},
$$ {#eq-eh}

where $i_{t+k}$ is the one-period short rate at $t+k$ and $s_{1,t+n}$ is the future one-period spot. Risk premia are zero. A weaker **returns version** equates expected one-period returns across maturities.
:::

Under EH, an upward-sloping curve means the short rate is expected to rise; an inverted curve means it is expected to fall. The story is clean and, as a complete description, false. Expected excess returns on long bonds are not zero on average: they vary with the business cycle and with uncertainty. That is the opening for a term premium.

The **liquidity-premium** (or **term-premium**) hypothesis keeps the expectations machinery and adds a premium $L_n \ge 0$ that rises with maturity, because long bonds have more duration risk ([[money-banking/interest-rates#def-duration]]) and because many holders prefer short claims (Hicks 1939; a preferred-habitat version is Modigliani and Sutch 1966). Then $f_{n,n+1} = \E_t s_{1,t+n} + L_{n+1}$, and the curve can slope up even if short rates are expected to stay put. An inversion then requires expected short-rate declines large enough to swamp the premium — which is why inversion can still be a recession signal *in a term-premium world*, if the market expects the central bank to cut in a downturn.

**Segmented markets** (Culbertson 1957) treat each maturity as its own market, with its own demand (pension funds at the long end, money-market funds at the short) and supply (the government's issuance). Substitution across maturities is limited, so a shock to supply at one maturity moves that yield without a matching move in expected short rates. Preferred habitat is the compromise: habitats exist, but they can be invaded when premia become large.

::: proposition EH and the slope {#prop-eh-slope}
Under the linear one-period EH $s_2 = \tfrac12 \bigl(i + \E i'\bigr)$, where $i$ is today's short rate and $\E i'$ is the expected next-period short rate, the two-period curve slopes up if and only if $\E i' > i$. With a constant term premium $\ell > 0$ in $s_2 = \tfrac12 \bigl(i + \E i'\bigr) + \ell$, the curve can slope up when $\E i' = i$.
:::

::: proof
$s_2 - i = \tfrac12(\E i' - i)$ under EH, which is positive iff $\E i' > i$. With the premium, $s_2 - i = \tfrac12(\E i' - i) + \ell$, and $\E i' = i$ already gives $s_2 - i = \ell > 0$.
:::

No single hypothesis is the profession's settled view. Affine term-structure models used in central banks and in asset-pricing courses put both expected short rates and time-varying premia into a common state-space machine ([[asset-pricing/fixed-income]]). For this course it is enough to read a curve as a mixture: a path of expected policy rates plus premia plus, at times, quantity effects from issuance and from central-bank purchases.

::: history
**1939, John Hicks.** *Value and Capital* gave the liquidity-premium account of the term structure: long bonds must yield more, on average, because they carry more interest-rate risk and because many holders prefer to lend short. The idea sits beside the pure expectations hypothesis (Fisher, and later Lutz and Meiselman) and Culbertson's 1957 segmented-markets paper as one of the three classical stories of this chapter.
:::

::: example Expectations versus a term premium {#ex-eh-lp}
Today's one-year rate is 4 per cent. The expected one-year rate, one year from now, is 6 per cent. (a) Under pure EH, what is the two-year spot (geometric version)? (b) If a term premium of 30 basis points is added to the two-year *yield* (not to the forward), what is $s_2$?
::: solution
(a) $(1+s_2)^2 = 1.04 \times 1.06 = 1.1024$, so $s_2 = \sqrt{1.1024} - 1 = 0.04995$, or 5.00 per cent. (b) $s_2 = 0.04995 + 0.0030 = 0.05295$, or 5.30 per cent. The implied forward is then $(1.05295)^2/1.04 - 1 = 0.0662$, which is the 6 per cent expected short rate plus about 62 basis points of forward premium — not equal to the 30 basis-point yield premium, because a yield is an average of a short rate and a forward. Mixing "premium on the yield" with "premium on the forward" is a standard slip.
:::
:::

::: quiz
If the one-year spot is 3 per cent and the two-year spot is 3 per cent, the one-year forward starting in one year is
- [ ] 0 per cent
- [x] 3 per cent
- [ ] 6 per cent
- [ ] impossible to compute without an expectations hypothesis
::: solution
$f_{1,2} = (1.03)^2/(1.03) - 1 = 0.03$. The forward is an identity from the two spots ([[#eq-forward]]), not a hypothesis. EH would add the claim that 3 per cent is also the expected future spot.
:::
:::

## Evidence

US Treasury constant-maturity yields (Board of Governors, H.15, via FRED) are the usual laboratory. The 10-year yield averaged 5.13 per cent in October 2026 (GS10); the federal funds target range was 3.75–4.00 per cent as of 14 November 2026. A 10-year yield above the overnight target is an upward slope at those dates; the slope has the opposite sign in other months of other years. An inverted US curve (10-year below 3-month, or 10-year below 2-year) preceded most US recessions since the 1960s, with a lag of a few quarters to more than a year, and with a false alarm around 1998 (Estrella and Mishkin 1998 is the classic paper; the subsequent literature is large). Correlation is not a structural theorem: the same inversion is, under EH, a forecast of falling short rates, which is what a central bank does in a downturn.

Credit spreads (for example, Moody's Baa less the 10-year Treasury, FRED series such as BAA10Y) widen in recessions and in financial crises: 2008–09, spring 2020, and smaller episodes. Spreads are compensation for default, for risk, and for liquidity, in proportions that shift. Emerging-market sovereign spreads over Treasuries (J.P. Morgan EMBI-style indices, reported by the BIS and by national sources) move with global risk appetite as well as with local fundamentals; they are not a ranking of countries.

Rating transition studies by the agencies themselves (annual default and transition studies) document that default rates in a letter class are higher in recessions than in expansions, so a constant Markov matrix is a simplification. The widget's absorbing D is the right qualitative feature: default is not a letter one is promoted out of.

## Where this leads

Banks and other intermediaries live on spreads: they borrow at one yield and lend at another, across both risk and maturity ([[money-banking/financial-intermediation]], [[money-banking/banking]]). A duration gap is a bet on the term structure, whether the bank thinks of it that way or not. Central banks influence the short end directly and the long end through expected future shorts and, under quantitative easing, through quantity effects on premia ([[money-banking/monetary-policy-implementation]]). Asset-pricing courses take the next step: no-arbitrage curves, affine models, and the expectations hypothesis as a set of testable restrictions ([[asset-pricing/fixed-income]]).

::: summary
- The risk structure of yields, at a given maturity, reflects default, liquidity and tax treatment. A credit spread is not a default probability.
- Ratings are ordinal classes; a Markov transition matrix is a model of how those classes move, with default typically absorbing.
- Spot rates discount zeros. Forward rates are identities from spots. Coupon yields are blends of spots, not spots themselves.
- The pure expectations hypothesis reads the curve as expected future short rates. Term premia and habitat (segmentation) effects sit on top of that reading and can make the curve slope up even when shorts are not expected to rise.
- Inversion has often preceded US recessions; that is a documented correlation, not a theorem and not a trading rule.
:::

## Exercises

::: exercise Spread in basis points {level=1 check="150"}
A Baa corporate yield is 6.5 per cent and a comparable Treasury yield is 5.0 per cent. What is the spread in basis points? (Enter the integer.)
::: solution
$(6.5-5.0)\times 100 = 150$.
:::
:::

::: exercise Forward identity {level=1}
$s_1 = 2\%$, $s_2 = 3\%$. Compute $f_{1,2}$.
::: solution
$f_{1,2} = (1.03)^2/1.02 - 1 = 1.0609/1.02 - 1 = 0.040098$, or 4.01 per cent.
:::
:::

::: exercise Rating as a state {level=1}
In the four-state chain of the Markov widget, why is a walk that has entered D still in D after ten further steps? What economic feature is that?
::: solution
The last row of the matrix is $(0,0,0,1)$: from D the chain stays in D with probability 1. Default is modelled as absorbing. A defaulted claim is not, in this toy, upgraded back to BB. (In practice a restructured issuer can be rated again, which would be a different chain.)
:::
:::

::: exercise Risk-neutral recovery {level=2}
Safe one-year yield 4 per cent. A risky one-year zero has $\delta = 0.10$ and recovery $\rho = 0.50$. Risk-neutral buyers. Find the promised yield and the spread.
::: solution
Expected payoff $0.90 + 0.10\times 0.50 = 0.95$. Price $0.95/1.04 = 0.91346$. Promised yield $1/0.91346 - 1 = 0.09474$ (9.47 per cent). Spread $9.47 - 4 = 5.47$ percentage points. Approximation $\delta(1-\rho) = 5$ percentage points.
:::
:::

::: exercise EH two-year {level=2 check="5"}
One-year rate 4 per cent, expected next one-year rate 6 per cent, pure EH, linear (arithmetic) average. What is the two-year yield in per cent? (Enter the integer.)
::: solution
$s_2 = (4+6)/2 = 5$.
:::
:::

::: exercise Bootstrap three-year {level=2}
Spots $s_1 = 0.03$, $s_2 = 0.04$ are known. A three-year 5 per cent annual coupon bond (face 100) prices at 102. Find $s_3$.
::: solution
$102 = 5/1.03 + 5/(1.04)^2 + 105/(1+s_3)^3$. The first two present values are $4.8544 + 4.6228 = 9.4772$. Residual $102 - 9.4772 = 92.5228 = 105/(1+s_3)^3$, so $(1+s_3)^3 = 105/92.5228 = 1.13486$, $1+s_3 = 1.0431$, $s_3 \approx 4.31$ per cent.
:::
:::

::: exercise Term premium versus inversion {level=3}
Suppose the term premium in the two-year yield is a constant 40 basis points and the linear EH-with-premium relation is $s_2 = \tfrac12(i+\E i') + 0.004$. If $i = 5$ per cent, how low must $\E i'$ be for the curve to invert ($s_2 < i$)? Interpret.
::: hint
Set $s_2 < 0.05$ and solve for $\E i'$.
:::
::: solution
$s_2 < 0.05$ iff $\tfrac12(0.05 + \E i') + 0.004 < 0.05$ iff $0.05 + \E i' < 0.092$ iff $\E i' < 0.042$. The expected short rate must fall by more than 80 basis points, enough to swamp a 40 basis-point yield premium. Inversion is still a statement about expected easing, just a stronger one than under pure EH (which would invert as soon as $\E i' < 0.05$).
:::
:::

::: exercise Why YTM is not a spot {level=3}
Using $s_1 = 4\%$, $s_2 = 6\%$, price a two-year 5 per cent annual coupon bond (face 100) off the spots, then compute its yield to maturity. Show that the YTM lies between the two spots. Why, intuitively?
::: hint
YTM is a present-value-weighted blend of the spots that discount the two payments.
:::
::: solution
$P = 5/1.04 + 105/(1.06)^2 = 4.8077 + 93.4496 = 98.257$. YTM solves $98.257 = 5/(1+y) + 105/(1+y)^2$. Try $y = 0.059$: $5/1.059 + 105/1.059^2 = 4.7214 + 93.626 = 98.347$. A shade high versus 98.257, so $y$ is a little above 5.9 per cent, still below $s_2 = 6$ per cent and above $s_1 = 4$ per cent. The first payment is discounted at 4 per cent, the second at 6 per cent; YTM is a single rate that mimics both, hence a blend, pulled toward the principal's date but not all the way.
:::
:::
