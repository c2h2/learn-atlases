A bond is a schedule of money payments. Once the unit of account of [[money-banking/money-and-payments]] is fixed, the only question a buyer asks of that schedule is what it is worth *today*. The answer is a **present value**, and the rate that makes the present value equal to the market price is a **yield**. This chapter is the arithmetic of that answer, plus the distinction between a real rate and a nominal rate.

Two facts organise everything that follows. First, a given stream of payments is worth less when it is discounted at a higher rate — so bond prices and yields move in opposite directions. Second, a nominal rate of 6 per cent with expected inflation of 2 per cent is not the same real deal as 6 per cent with expected inflation of 5 per cent. Irving Fisher's split, $1+i = (1+r)(1+\pi^e)$, is the accounting of that difference.

The numbers in the worked examples are invented cash flows for fictional issuers. Dated market yields (a Treasury series, a policy rate) are observations on a day, sourced and not a forecast. Nothing in the chapter is a recommendation to buy, sell or hold any security, nor advice about household saving.

## Present value

A unit of account promised for delivery in one year is not the same object as a unit in the hand. If a safe one-year claim pays a net interest rate $i$, then 1 today grows to $1+i$ in a year, and a certain payment $C$ in a year is worth $C/(1+i)$ today. That is the **discount factor** for one year. For $t$ years at a constant rate the discount factor is $1/(1+i)^t$.

::: definition Present value {#def-pv}
Given a discount rate $i$ per period, the **present value** of a stream of payments $C_1, C_2, \ldots, C_n$ due at the end of periods $1,\ldots,n$ is

$$
\mathrm{PV} = \sum_{t=1}^{n} \frac{C_t}{(1+i)^t}.
$$ {#eq-pv}

A **perpetuity** is the case $n=\infty$ with $C_t = C$ for all $t$, which sums to $C/i$ when $i>0$. An **annuity** is a finite stream of equal payments. The formula assumes a constant rate, annual (or per-period) compounding, and certain payments. If payments are uncertain, $C_t$ is replaced by an expected payment and $i$ by a rate that includes a risk adjustment — a step this chapter does not take.
:::

The rate $i$ in [[#eq-pv]] is an input. In a market it is read off other instruments of similar risk and maturity, or it is the unknown that is solved for from a price (the next section). Compounding conventions matter: a rate quoted as 6 per cent a year compounded twice a year is not the same as 6 per cent compounded once. The **effective annual rate** of a nominal rate $i^{(m)}$ compounded $m$ times a year is $(1 + i^{(m)}/m)^m - 1$. Continuous compounding is the limit $m\to\infty$, giving $e^{r} - 1$ as the effective annual rate of a continuous rate $r$.

::: widget sequence
a: (1.05)^n
N: 20
mode: terms
start: 0
limit: 0
caption: Compound growth of one unit at 5 per cent a year: the term is $a_n = (1.05)^n$. Step through $n$. The same arithmetic run backwards is discounting. The 5 per cent is an illustrative rate, not a forecast of any market.
:::

A perpetuity that pays 8 each year, discounted at 5 per cent, is worth $8/0.05 = 160$. At 8 per cent it is worth $8/0.08 = 100$. Doubling the rate more than halves the value, because a perpetuity has cash flows in the far future that are crushed by a higher $i$. That sensitivity is duration in embryonic form.

::: example A two-year coupon bond as a present value {#ex-two-year-pv}
A fictional issuer promises 6 at the end of year 1 and 106 at the end of year 2 (a 6 per cent coupon on a face value of 100, paid annually). Discount the payments at 5 per cent a year. What is the present value? Repeat at 6 per cent and at 7 per cent.
::: solution
At 5 per cent,

$$
\mathrm{PV} = \frac{6}{1.05} + \frac{106}{1.05^2} = 5.7143 + 96.1451 = 101.859.
$$

At 6 per cent the bond is worth $6/1.06 + 106/1.06^2 = 100$ exactly: it is priced at **par** when the discount rate equals the coupon rate, for an annual-pay coupon bond. At 7 per cent, $\mathrm{PV} = 6/1.07 + 106/1.07^2 = 98.192$. The same payments are worth less at a higher rate. The three prices are the raw material of [[#prop-inverse]] below.
:::
:::

::: example A ten-year annuity {#ex-annuity}
A fictional contract pays 10 at the end of each of the next 10 years. Discount at 6 per cent a year. What is the present value? Compare with $10$ undiscounted payments of 10, and with a perpetuity of 10 at the same rate.
::: solution
The annuity formula is $C\bigl(1 - (1+i)^{-n}\bigr)/i$, so

$$
\mathrm{PV} = 10 \cdot \frac{1 - 1.06^{-10}}{0.06} = 73.601.
$$

Ten payments of 10, undiscounted, would be 100. A perpetuity of 10 at 6 per cent is $10/0.06 = 166.667$. The ten-year annuity is 73.6 per cent of the undiscounted total and 44.2 per cent of the perpetuity: the missing tail of the perpetuity, years 11 onward, is still worth $166.667 - 73.601 = 93.066$ today. Distant payments are not negligible at 6 per cent.
:::
:::

## Yield to maturity and the price–yield curve

A market does not quote a present value; it quotes a **price**. The rate that makes [[#eq-pv]] equal to that price is the **yield to maturity**.

::: definition Yield to maturity {#def-ytm}
The **yield to maturity** $y$ of a bond with current price $P$ and payments $C_1,\ldots,C_n$ is the solution of

$$
P = \sum_{t=1}^{n} \frac{C_t}{(1+y)^t},
$$ {#eq-ytm}

when a unique positive root exists. For a **zero-coupon bond** (a discount instrument) with face $F$ due in $n$ periods, $y = (F/P)^{1/n} - 1$. Yield to maturity is an internal rate of return on the promised cash flows, not a forecast of the return that will be earned if the bond is sold before maturity or if a coupon is reinvested at a different rate.
:::

Equation [[#eq-ytm]] is a polynomial in $1/(1+y)$. Descartes' rule, plus the fact that all $C_t$ are positive for an ordinary coupon bond, gives a unique positive $y$. There is no closed form once $n>2$, so one solves it numerically — Newton, bisection, or a financial calculator. The widget below does Newton on a three-year illustrative bond.

::: widget newton
f: 5/(1+x) + 5/(1+x)^2 + 105/(1+x)^3 - 97.2
x0: 0.05
steps: 6
x: 0, 0.12
y: -20, 20
caption: Newton's method for the yield to maturity of a fictional three-year 5 per cent annual coupon bond priced at 97.2. The function is $P(x) - 97.2$; a root is a yield. Start at 0.05 and step. The cash flows are invented. The root is a number that fits [[#eq-ytm]], not a predicted market rate.
:::

::: proposition Bond prices and yields move inversely {#prop-inverse}
Let $P(y)$ be the right-hand side of [[#eq-ytm]] as a function of the yield, with $C_t \ge 0$ for all $t$ and $C_t > 0$ for some $t$. Then $P'(y) < 0$ for $y > -1$. Hence a unique $y$ corresponds to each $P$ in the range of the map, and an increase in the yield lowers the price.
:::

::: proof
Differentiating term by term,

$$
P'(y) = \sum_{t=1}^{n} \frac{-t\, C_t}{(1+y)^{t+1}} < 0
$$

whenever at least one $C_t$ is positive and $1+y>0$. Strict monotonicity gives invertibility on that domain: the yield map is one-to-one. The second derivative $P''(y) > 0$, so $P(y)$ is strictly convex — the price–yield curve bows toward the origin, which is the source of **convexity** as a second-order sensitivity.
:::

::: widget plot
f: 6/(1+x) + 106/(1+x)^2; 5/(1+x) + 5/(1+x)^2 + 5/(1+x)^3 + 5/(1+x)^4 + 105/(1+x)^5
x: 0.01, 0.12
y: 70, 130
labels: \text{2-year 6\% coupon}; \text{5-year 5\% coupon}
caption: Illustrative price–yield curves for two fictional annual-pay bonds, both with face 100. The horizontal axis is the yield $y$. Drag the eye along either curve: a higher $y$ is a lower price. The five-year bond is steeper in this window — more sensitive, a first look at duration. Invented cash flows, not a market and not a forecast.
:::

A coupon bond sells at **par** when $P$ equals face value, at a **premium** when $P$ is above face, and at a **discount** when $P$ is below face. For an annual-pay bond, par means $y$ equals the coupon rate, as in [[#ex-two-year-pv]]. Premium bonds have $y$ below the coupon rate; discount bonds have $y$ above it. A zero-coupon bond with a positive yield always sells at a discount to face.

::: warning Yield to maturity is not the realised return
The yield in [[#def-ytm]] is the constant rate at which the *promised* cash flows discount back to $P$. If the bond is sold in a year, the one-year return is $(C_1 + P_1)/P_0 - 1$, which equals $y$ only in special cases (one-year remaining maturity, or an unchanged yield curve of a particular shape). If coupons are reinvested at a rate other than $y$, the compound return over the full life is not $y$ either. Quoting a yield as if it were a guaranteed holding-period return is the standard misreading.
:::

::: example A two-year 8 per cent bond priced at 102 {#ex-ytm-solve}
A fictional annual-pay bond with face 100 pays a coupon of 8 each year and trades at 102. Find the yield to maturity. (A quadratic; no need for Newton.)
::: solution
$102 = 8/(1+y) + 108/(1+y)^2$. Multiply through by $(1+y)^2$:

$$
102(1 + 2y + y^2) = 8(1+y) + 108 \implies 102 y^2 + 196 y - 14 = 0.
$$

The discriminant is $196^2 + 4\cdot 102\cdot 14 = 38416 + 5712 = 44128$, and $\sqrt{44128} \approx 210.067$. The positive root is

$$
y = \frac{-196 + 210.067}{204} \approx 0.06895,
$$

or 6.90 per cent a year. The bond is a premium bond, so its yield lies below the 8 per cent coupon, as the par rule requires.
:::
:::

A **bill** or zero with a short residual maturity is often quoted on a simple (bank-discount or money-market) basis rather than as a compound yield. The **bond-equivalent yield** of a bill with face $F$, price $P$ and $t$ days to maturity is $(F-P)/P \times 365/t$ (actual/365). The **discount yield** uses $F$ in the denominator: $(F-P)/F \times 360/t$ in some bill markets. The two are not interchangeable; a comparison of a bill with a coupon bond has to put both on the same compounding and day-count convention.

## Duration and the size of the price change

[[#prop-inverse]] says the direction. **Duration** says the size, to first order.

::: definition Macaulay duration {#def-duration}
For a bond with price $P(y)$ as in [[#eq-ytm]], the **Macaulay duration** is the present-value-weighted average maturity of its payments,

$$
D_{\mathrm{Mac}} = \frac{1}{P} \sum_{t=1}^{n} t \cdot \frac{C_t}{(1+y)^t}.
$$ {#eq-mac}

**Modified duration** is $D_{\mathrm{Mod}} = D_{\mathrm{Mac}}/(1+y)$ (with $y$ the per-period yield matching the payment frequency). Then

$$
\frac{1}{P}\frac{\mathrm{d}P}{\mathrm{d}y} = - D_{\mathrm{Mod}},
$$ {#eq-dp}

so a small increase $\Delta y$ in the yield changes the price by about $-D_{\mathrm{Mod}} \cdot P \cdot \Delta y$. Duration is measured in periods; modified duration is a sensitivity.
:::

A zero-coupon bond has Macaulay duration equal to its maturity: there is only one payment. A coupon bond has duration strictly less than maturity, because some present value arrives early. Duration falls when the yield rises (more of the present value is in the early coupons) and rises with maturity, other things equal, with a caveat for deep-discount long bonds that need not concern a first course. Convexity, $P''(y)/P$, is the next term in the Taylor expansion and is why the first-order approximation understates the price of an ordinary coupon bond after a yield move of either sign.

::: example Duration of the two-year 6 per cent bond {#ex-duration}
Take the bond of [[#ex-two-year-pv]] at a yield of 5 per cent, where $P = 101.859$. Compute Macaulay and modified duration, and approximate the price change if the yield jumps to 6 per cent. Compare with the exact price at 6 per cent, which is 100.
::: solution
The present values of the two payments are $6/1.05 = 5.7143$ and $106/1.05^2 = 96.1451$. Macaulay duration is

$$
D_{\mathrm{Mac}} = \frac{1\cdot 5.7143 + 2\cdot 96.1451}{101.859} = \frac{198.0045}{101.859} \approx 1.944 \text{ years}.
$$

Modified duration is $1.944/1.05 \approx 1.851$. A 100 basis-point rise in yield predicts $\Delta P \approx -1.851 \times 101.859 \times 0.01 \approx -1.886$, hence a predicted price of $101.859 - 1.886 = 99.973$. The exact price at 6 per cent is 100. The linear approximation overstates the fall by about 0.027, which is the convexity remainder. For a 100 basis-point move on a two-year bond the error is small; on a long low-coupon bond it is not.
:::
:::

Banks, in [[money-banking/banking]], will use duration as a gap: the difference between the duration of assets and the (leverage-weighted) duration of liabilities. The arithmetic is the same; the object is a net worth rather than a single bond. Asset-pricing courses return to duration as the first factor in a term-structure model ([[asset-pricing/fixed-income]]).

::: quiz
A one-year zero with face 100 trades at 96. Its yield to maturity (annual compounding) is closest to
- [ ] 4.00 per cent
- [x] 4.17 per cent
- [ ] 4.00 per cent on a discount basis, which is the same as the compound yield
- [ ] 96 per cent
::: solution
$y = 100/96 - 1 = 0.041667$, or 4.17 per cent. The discount yield $(100-96)/100 = 4.00$ per cent is a different convention and is not the compound yield in [[#def-ytm]].
:::
:::

## Real and nominal rates: the Fisher relation

A nominal payment is a payment in units of money. A real payment is a payment in units of goods. If $P_t$ is the price level, a nominal cash flow $C_t$ buys $C_t/P_t$ goods. Inflation $\pi_{t+1} = P_{t+1}/P_t - 1$ therefore sits between a nominal interest rate and a real one.

::: definition Fisher relation {#def-fisher}
Let $i$ be a one-period nominal interest rate and $\pi^e$ the inflation expected over the same period. The corresponding **ex ante real rate** $r$ satisfies

$$
1 + i = (1+r)(1+\pi^e) \qquad\text{so}\qquad r = \frac{1+i}{1+\pi^e} - 1 \approx i - \pi^e
$$ {#eq-fisher}

when $r$ and $\pi^e$ are small. The **ex post** real rate replaces $\pi^e$ with realised inflation. The approximation $r \approx i - \pi^e$ drops the cross term $r\pi^e$.
:::

Fisher (1896, 1930) treated the real rate as determined in the market for goods and saving, and the nominal rate as the real rate plus expected inflation. That is a theory of *how $i$ is set*, on top of the identity that defines $r$ given $i$ and $\pi^e$. The identity always holds; the theory does not. In the short run, with sticky prices, a rise in the nominal policy rate can raise the real rate because $\pi^e$ does not jump one-for-one — that is the opening move of most New Keynesian stories ([[business-cycles]]). In a long-run classical description, $r$ is anchored by productivity and thrift, and $i$ inherits a one-for-one move in $\pi^e$ (the **Fisher effect**).

Inflation-indexed government bonds, where they exist (TIPS in the United States, index-linked gilts in the United Kingdom), quote a real yield directly. The difference between a nominal yield and an indexed yield of similar maturity is a **break-even inflation rate**. Break-even inflation is not a survey expectation: it includes an inflation risk premium and a liquidity differential between the two instruments. It is a market-implied number, useful and not a forecast to trade on.

::: example Fisher arithmetic {#ex-fisher}
A one-year nominal rate is 6 per cent. Expected inflation is 2 per cent. What is the exact ex ante real rate? What is the linear approximation? If realised inflation turns out to be 4 per cent, what is the ex post real rate?
::: solution
Exact: $r = 1.06/1.02 - 1 = 0.039216$, or 3.92 per cent. Approximation: $6-2 = 4$ per cent. The cross term $r\pi^e \approx 0.08$ percentage points is the gap. Ex post, $1.06/1.04 - 1 = 0.01923$, or 1.92 per cent. Unexpected inflation transferred real resources from the lender to the borrower. That transfer is why inflation risk is a risk, and why indexed bonds exist.
:::
:::

Dated observations, not forecasts: the US 10-year Treasury constant-maturity yield averaged 5.13 per cent in October 2026 (Board of Governors, H.15, FRED series GS10). The FOMC's target range for the federal funds rate was 3.75 to 4.00 per cent as of 14 November 2026 (FOMC statement of 28 October 2026; FRED DFEDTARU). Those two numbers are a short rate and a long rate on particular dates; their difference is a slope, the subject of the next chapter, not a recommended position.

A **nominal** present value uses a nominal $i$ and nominal cash flows. A **real** present value uses a real $r$ and cash flows in units of goods. Mixing a real rate with nominal cash flows, or the reverse, is a dimensional error, and it is a common one.

::: history
**1930, Irving Fisher.** *The Theory of Interest* restated and extended Fisher's 1896 appreciation-and-interest argument: the nominal rate is the real rate plus expected inflation, with a cross term. The book is the source of the Fisher relation used in this chapter. The identity that defines the ex ante real rate given $i$ and $\pi^e$ should not be confused with Fisher's further claim about how $i$ is determined.
:::

::: quiz
If the nominal rate is 5 per cent and expected inflation is 5 per cent, the exact ex ante real rate is
- [ ] 0
- [x] $1.05/1.05 - 1 = 0$
- [ ] 10 per cent
- [ ] undefined, because the approximation $r \approx i - \pi^e$ is the definition
::: solution
The exact formula gives $r = 0$. The approximation gives the same in this special case because the cross term is $r\pi^e = 0$. The approximation is not the definition; [[#eq-fisher]] is.
:::
:::

## Evidence

Two empirical regularities are well documented and still not theorems.

On the price–yield relation there is nothing to test beyond arithmetic: a coupon bond's price, computed from [[#eq-ytm]], falls when $y$ rises. What is empirical is the *behaviour of $y$*. Short-term nominal rates follow the policy rate closely in systems where the central bank operates on the overnight market (the next two chapters but one). Longer yields move with expected future short rates and with term premia, which is the next chapter.

On Fisher, the long-run correlation between nominal rates and inflation is strong. Periods of high inflation — the United Kingdom and the United States in the 1970s, Brazil and Argentina in several episodes of the late twentieth century, Türkiye in the 2020s — are periods of high nominal rates. The short-run correlation of *ex post* real rates with inflation is often negative, because inflation surprises are large relative to the movement in $i$. That is why the distinction between ex ante and ex post in [[#def-fisher]] is not pedantry.

Real policy rates, computed as a policy rate minus a contemporaneous inflation rate, were negative in many advanced economies for years after 2008 and again in 2020–21, and were positive in 2023–26 as inflation receded more slowly than policy rates rose. Those are descriptions of dated series (official policy rates and consumer-price inflation from national statistical offices). They are not a verdict on whether real rates "should" be positive.

## Where this leads

Default risk, liquidity and tax treatment put a **risk structure** on yields of the same maturity; expected future short rates and term premia put a **term structure** on yields of different maturities ([[money-banking/term-structure]]). Banks hold these instruments on both sides of the balance sheet, so a shift in $y$ revalues assets and liabilities by their durations ([[money-banking/banking]]). Corporate-finance courses use the same present-value machine for project evaluation ([[corporate-finance/time-value-of-money]], [[corporate-finance/valuing-bonds]]). Asset pricing replaces the constant $i$ with a stochastic discount factor ([[asset-pricing]]). The algebra of [[#eq-pv]] does not change; the rate that belongs in it does.

::: summary
- Present value discounts a stream of payments at a stated rate; a perpetuity of $C$ is worth $C/i$.
- Yield to maturity is the constant rate that equates a bond's promised cash flows to its price. It is not, in general, a realised holding-period return.
- Bond prices and yields move inversely; the price–yield curve is strictly decreasing and convex for ordinary coupon bonds.
- Macaulay duration is a weighted-average maturity; modified duration is the first-order per-cent sensitivity of price to a yield change.
- The Fisher relation splits a nominal rate into a real rate and expected inflation. The split is an identity given $\pi^e$; the Fisher *effect* is the further claim that $i$ moves one-for-one with $\pi^e$ in the long run.
- Mixing real rates with nominal cash flows (or the reverse) is a dimensional error. Dated market yields are observations, not forecasts and not advice.
:::

## Exercises

::: exercise Perpetuity {level=1 check="125"}
A perpetuity pays 10 each year. The discount rate is 8 per cent. What is its present value? (Enter the present value.)
::: solution
$10/0.08 = 125$.
:::
:::

::: exercise Par bond {level=1}
Why is an annual-pay coupon bond with coupon rate $c$ and face 100 worth exactly 100 when discounted at $y = c$?
::: solution
$P = \sum_{t=1}^{n} c\cdot 100/(1+c)^t + 100/(1+c)^n$. The sum of the discounted coupons is a geometric series equal to $100\bigl(1 - (1+c)^{-n}\bigr)$, and adding the discounted face $100/(1+c)^n$ leaves 100. The same algebra is the statement that a loan at rate $c$, amortised by coupons at $c$, has remaining principal equal to face at every date if it was issued at par.
:::
:::

::: exercise One-year zero {level=1 check="4"}
A one-year zero with face 100 trades at 96.15. What is its yield to maturity in per cent, to the nearest whole number? (Enter that integer.)
::: solution
$y = 100/96.15 - 1 \approx 0.04004$, or 4.00 per cent. Nearest integer: 4.
:::
:::

::: exercise Two-year price {level=2 check="98.19"}
A two-year 6 per cent annual-pay bond with face 100 is discounted at 7 per cent. What is its price, to two decimal places? (Enter the price.)
::: solution
$6/1.07 + 106/1.07^2 = 5.6075 + 92.5845 = 98.19$.
:::
:::

::: exercise Fisher exact versus approximate {level=2}
Nominal rate 12 per cent, expected inflation 7 per cent. Compute the exact real rate and the approximation $i - \pi^e$. How large is the cross-term error, in percentage points?
::: solution
Exact: $1.12/1.07 - 1 = 0.04673$, or 4.673 per cent. Approximation: 5 per cent. Error: about 0.327 percentage points. The approximation is worse when rates are high, which is when one most wants it to be good — a reason to use the exact formula in inflating economies.
:::
:::

::: exercise Duration of a zero {level=2}
A 10-year zero yields 5 per cent compounded annually and has face 100. Compute its price, its Macaulay duration and the first-order approximation to the price if the yield rises by 10 basis points.
::: solution
$P = 100/1.05^{10} \approx 61.391$. Macaulay duration is 10 years (single payment). Modified duration is $10/1.05 \approx 9.524$. $\Delta P \approx -9.524 \times 61.391 \times 0.001 \approx -0.585$. Predicted new price $\approx 60.806$. The exact price at 5.1 per cent is $100/1.051^{10} \approx 60.807$. The linear approximation is already very close at 10 basis points.
:::
:::

::: exercise Effective annual rate {level=3}
A rate is quoted as 12 per cent a year compounded monthly. What is the effective annual rate? What continuously compounded rate has the same effective annual rate?
::: hint
Effective annual rate is $(1 + i^{(m)}/m)^m - 1$. Continuous: $e^{r} - 1$ equals that number.
:::
::: solution
$(1 + 0.12/12)^{12} - 1 = (1.01)^{12} - 1 \approx 0.126825$, or 12.6825 per cent. The continuous rate $r$ satisfies $e^{r} = 1.126825$, so $r = \ln 1.126825 \approx 0.1194$, or 11.94 per cent. A quoted 12 per cent monthly-compounded is *more* than 12 per cent effective, and it matches a *lower* continuously compounded rate, because continuous compounding is a more frequent clock.
:::
:::

::: exercise Convexity remainder {level=3}
For the two-year 6 per cent bond at $y = 0.05$, $P = 101.859$, $D_{\mathrm{Mod}} \approx 1.851$. The convexity $\frac{1}{P}\sum t(t+1)C_t/(1+y)^{t+2}$ equals approximately 5.239. Approximate the price at $y = 0.06$ with the second-order Taylor expansion and compare with the exact price of 100.
::: hint
$\Delta P \approx -D_{\mathrm{Mod}} P \Delta y + \tfrac12 \mathrm{Conv}\, P (\Delta y)^2$.
:::
::: solution
$\Delta y = 0.01$. First-order term: $-1.851 \times 101.859 \times 0.01 \approx -1.886$. Second-order term: $0.5 \times 5.239 \times 101.859 \times 0.0001 \approx 0.0267$. Predicted $\Delta P \approx -1.859$, predicted price $\approx 100.000$. The exact price is 100. At a 100 basis-point move, convexity almost wipes out the first-order error for this short bond. The remainder of the Taylor series is negligible here; it would not be for a 30-year low-coupon bond and a large yield jump.
:::
:::
