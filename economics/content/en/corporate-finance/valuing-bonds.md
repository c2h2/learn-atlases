A bond is a dated list of promised cash flows: coupons and a principal repayment. Once those cash flows are written down, the time-value toolkit of [[corporate-finance/time-value-of-money]] turns them into a price at a stated discount rate, or turns an observed price into a rate. That rate is the bond’s **yield to maturity**. This chapter is about the mapping between prices and yields, and about how the mapping moves when yields move — the mapping’s slope and curvature, duration and convexity.

The cash flows here are **promised** cash flows, not expected cash flows. A government bond in a textbook example is treated as default-free, so promised and expected coincide. A corporate bond may default, in which case the promised coupons overstate what holders expect to receive and the yield overstates the expected return by a credit spread. We record the distinction and then, until [[corporate-finance/capital-structure]] and [[money-banking/interest-rates]], compute with promised cash flows at a stated yield. Every bond in the examples is fictional; every yield is an illustrative number. Nothing in the chapter is a recommendation to buy, sell or hold a bond, and nothing is a forecast of interest rates. The atlas is for education only — not investment or financial advice.

A bond market quotes prices and yields together because they are two units for the same object. Saying that “bond prices fall when yields rise” is not a separate empirical law; it is the derivative of the present-value formula with respect to the discount rate, and it is strictly negative for a bond with positive cash flows. Duration makes that derivative a number of years, and convexity records that the price–yield curve bows toward the origin.

## Bond cash flows, prices and yields

::: definition Coupon bond {#def-bond}
A **coupon bond** with face value $F$, coupon rate $c$, maturity $n$ (in years) and annual coupons promises the cash-flow stream $(0, cF, cF, \dots, cF + F)$, with $n$ coupons and the face value repaid at the last coupon date. A **zero-coupon bond** (a discount bond) has $c = 0$ and pays only $F$ at maturity. The **current yield** is the annual coupon divided by the current price; it ignores principal repayment and is not a present-value rate.
:::

With annual coupons and a constant per-year yield $y$, the price is the present value of the coupons (an ordinary annuity) plus the present value of the face:

$$
P = cF \cdot \frac{1 - (1+y)^{-n}}{y} + \frac{F}{(1+y)^{n}}, \qquad y \neq 0,
$$ {#eq-bond-price}

and $P = n\,cF + F$ when $y = 0$. If coupons arrive $m$ times a year, the same formula is applied to $mn$ periods at the per-period yield $y/m$ and the per-period coupon $cF/m$, with the quoted **bond-equivalent** annual yield equal to $m$ times the per-period yield. Conventions for accrued interest, day counts and compounding differ across markets; a problem that does not name a convention is using annual coupons and an annually compounded yield, or naming the alternative.

::: definition Yield to maturity {#def-ytm}
The **yield to maturity** (YTM) of a bond is the constant per-period rate $y$ that equates the bond’s price to the present value of its *promised* remaining cash flows. It is the internal rate of return of the promised stream, computed from the current dirty price. Existence and uniqueness of $y > -1$ follow from the fact that promised cash flows are non-negative and not all zero, so present value is strictly decreasing in $y$ and runs from $+\infty$ to $0$ as $y$ runs from $-1$ to $+\infty$.
:::

Three elementary consequences of [[#eq-bond-price]] are used constantly. If $y = c$, the bond prices at par: $P = F$. If $y > c$, it prices at a discount: $P < F$. If $y < c$, it prices at a premium: $P > F$. The current yield $cF/P$ lies between $c$ and $y$ for a discount or premium bond, because it misses the pull of the price toward par as maturity approaches.

::: proposition Bond prices fall when yields rise {#prop-price-yield}
For a coupon bond with positive remaining cash flows, $\partial P / \partial y < 0$. At $y = 0$ the price is the undiscounted sum of remaining cash flows; as $y \to \infty$ the price tends to $0$. The price–yield curve is convex: $\partial^{2} P / \partial y^{2} > 0$.
:::

::: proof
Differentiating [[#eq-bond-price]] term by term,

$$
\frac{\partial P}{\partial y} = -\sum_{t=1}^{n} t\, C_t (1+y)^{-(t+1)},
$$

where $C_t = cF$ for $t < n$ and $C_n = cF + F$. Every term is negative, so the derivative is negative. Differentiating again, each term $t(t+1) C_t (1+y)^{-(t+2)}$ is positive, so the second derivative is positive.
:::

The proposition is an identity about promised cash flows discounted at a single yield. It is not a claim about how any particular market yield will move next week, and it is not a claim about a bond that can default (whose expected cash flows themselves depend on the state of the economy).

::: example A five-year five-percent bond {#ex-five-percent}
A fictional bond pays a $5$ percent coupon once a year on a face value of $100$ units and matures in five years. Compute its price at annual yields of $4$, $5$, $6$ and $7$ percent.
::: solution
The cash flows are $5, 5, 5, 5, 105$. [[#eq-bond-price]] gives

| yield $y$ | price $P$ |
|---|---|
| $0.04$ | $104.45$ |
| $0.05$ | $100.00$ |
| $0.06$ | $95.79$ |
| $0.07$ | $91.80$ |

At $y = c = 5$ percent the bond is at par. A one-percentage-point rise in the yield, from $5$ to $6$ percent, cuts the price by $4.21$ units; a one-percentage-point fall, from $5$ to $4$ percent, raises it by $4.45$ units. The two moves are not equal: the price–yield curve is convex, so a yield decline raises the price by more than the same yield increase cuts it. The four prices are present values of an invented promised stream. They are not quotes, and they are not a reason to prefer one yield to another.
:::
:::

::: example Finding a yield {#ex-ytm}
A fictional four-year bond with annual $6$ percent coupons and face $100$ sells for $96$ units. What is its yield to maturity?
::: solution
The yield solves

$$
\frac{6}{1+y} + \frac{6}{(1+y)^{2}} + \frac{6}{(1+y)^{3}} + \frac{106}{(1+y)^{4}} = 96.
$$

There is no closed form for $n > 2$. Newton’s method, starting at $y_0 = 0.07$, iterates on $f(y) = P_{\text{formula}}(y) - 96$. The unique root is $y \approx 0.07186$, or about $7.19$ percent. Because the bond is below par, the yield lies above the coupon rate, as the par identity requires. A one-line check: substituting $y = 0.07186$ back into the present-value formula recovers $96$ to two decimal places.
:::
:::

::: widget newton
f: 6/(1+x)+6/(1+x)^2+6/(1+x)^3+106/(1+x)^4-96
method: newton
x0: 0.07
steps: 8
x: 0, 0.16
y: -20, 20
caption: Newton’s method for the yield to maturity of the four-year 6 percent bond priced at 96. Step through the iteration: the root is about 7.19 percent. The cash flows and the price are invented.
:::

::: widget plot
f: 5*(1-(1+x)^(-5))/x + 100/(1+x)^5
x: 0.001, 0.15
y: 60, 130
hlines: 100
labels: \text{price}
caption: Price of the five-year 5 percent bond as a function of the annual yield. The curve falls and bows up (convex). It crosses par (the horizontal line at 100) at the coupon rate 5 percent. Drag along the curve and watch the slope steepen at low yields. Illustrative cash flows, not a market quote.
:::

Zero-coupon bonds make the discounting fully visible: a three-year zero with face $100$ at a $5$ percent annual yield is worth $100 / (1.05)^3 \approx 86.38$ units. A coupon bond is a bundle of zeros, one for each remaining payment, and its price is the sum of those zero prices. That is the **spot-rate** view, taken up properly in [[asset-pricing/fixed-income]] and [[money-banking/term-structure]]; in this chapter a single yield $y$ stands in for the whole spot curve, which is accurate when the curve is flat and is an average when it is not.

::: quiz
A bond with a $5$ percent coupon, annual payments and face $100$ has a yield to maturity of $6$ percent. Which statement is correct?
- [ ] The bond prices above par, because the coupon is positive.
- [x] The bond prices below par, because the yield exceeds the coupon rate.
- [ ] The bond prices at par, because face is $100$.
- [ ] The current yield equals the yield to maturity.
::: solution
[[#eq-bond-price]] at $y > c$ gives $P < F$. The current yield $cF/P$ exceeds $c$ (because $P < F$) but is still below $y$, because the holder also receives a capital gain as the price is pulled to par. Par would require $y = c$. A positive coupon is not a reason for a premium; the comparison of $y$ with $c$ is.
:::
:::

## Holding-period returns and the pull to par

Yield to maturity is a *promised* compound return if the bond is held to maturity, promised coupons are paid, and those coupons are reinvested at the same yield. None of the three clauses is free. A holding period shorter than maturity produces a return that depends on the selling yield; reinvestment at a different rate produces a realised compound return different from $y$; default breaks the promise.

If a bond is bought at $P_0$, earns a coupon $C$ over the year, and is then worth $P_1$, the **holding-period return** is $(C + P_1)/P_0 - 1$. When the yield does not change, a coupon bond’s price moves toward par as maturity shortens — the **pull to par** — and the holding-period return equals the original yield.

::: example An unchanged yield {#ex-hpr}
Take the five-year $5$ percent bond of [[#ex-five-percent]] priced at a $6$ percent yield, so $P_0 \approx 95.79$. One year later the bond is a four-year $5$ percent bond. If the yield is still $6$ percent, what is the new price, and what is the holding-period return?
::: solution
A four-year $5$ percent bond at $y = 6$ percent is worth

$$
5 \cdot \frac{1 - (1.06)^{-4}}{0.06} + \frac{100}{(1.06)^{4}} \approx 96.53.
$$

The holding-period return is $(5 + 96.53)/95.79 - 1 = 0.06$. The original yield is recovered, not by magic, but because every remaining cash flow is still discounted at $6$ percent and one year of discounting has rolled off. If the yield a year later had been $7$ percent, the four-year price would have been about $93.23$ and the holding-period return would have been $(5 + 93.23)/95.79 - 1 \approx -0.025$, a loss. The two calculations illustrate the identity and its sensitivity. They are not a forecast of next year’s yield.
:::
:::

::: warning Yield is not an expected return once default is possible
For a default-free bond held to maturity with coupons reinvested at $y$, yield to maturity and realised compound return coincide. For a corporate bond they do not. The yield is computed from *promised* coupons; the expected return is computed from *expected* coupons, which are smaller if default can occur. The gap is a credit spread, and it compensates, in equilibrium models, for expected loss and for the risk of that loss. Treating a high-yield corporate bond’s YTM as if it were a promised-and-delivered return overstates what holders expect to earn. The overstatement is a property of the definition, visible before any data are brought in.
:::

## Duration and convexity

The slope $\partial P / \partial y$ in [[#prop-price-yield]] has units of money per unit of yield. Macaulay’s duration converts the slope into a time, a weighted average maturity of the cash flows, and modified duration converts that time back into a percentage price sensitivity.

::: definition Macaulay and modified duration {#def-duration}
For a bond with price $P$ at yield $y$ (compounded once per period) and remaining cash flows $C_t$, **Macaulay duration** is

$$
D_{\mathrm{Mac}} = \frac{1}{P} \sum_{t=1}^{n} t\, C_t (1+y)^{-t}.
$$ {#eq-mac}

It is measured in periods. **Modified duration** is $D_{\mathrm{Mod}} = D_{\mathrm{Mac}} / (1+y)$, and it satisfies

$$
\frac{1}{P} \frac{\mathrm{d}P}{\mathrm{d}y} = - D_{\mathrm{Mod}}.
$$ {#eq-mod}

**Convexity** is $(1/P)\,\mathrm{d}^{2}P/\mathrm{d}y^{2} = (1/P) \sum_{t} t(t+1) C_t (1+y)^{-(t+2)}$.
:::

Macaulay duration of a zero-coupon bond is its maturity: there is only one cash flow. Macaulay duration of a level perpetuity is $(1+y)/y$; at $y = 6$ percent that is $17.67$ years, far below infinity, because distant coupons are heavily discounted. Coupon bonds sit between: $D_{\mathrm{Mac}}$ is less than maturity, and it is shorter when the coupon is higher (more of the present value arrives early) and when the yield is higher (the same reason).

::: proposition First-order duration approximation {#prop-duration}
A small change $\Delta y$ in the yield changes the bond’s price by approximately

$$
\frac{\Delta P}{P} \approx - D_{\mathrm{Mod}}\,\Delta y + \tfrac12 \,\mathrm{Conv}\,(\Delta y)^{2}.
$$ {#eq-dur-approx}

The first term is the tangent to the price–yield curve; the second is the convexity correction. Because convexity is positive, the tangent *understates* the price of a non-callable coupon bond for a finite yield move in either direction.
:::

::: proof
Taylor’s theorem for $P(y + \Delta y)$ up to second order, divided by $P$, and the identifications of modified duration and convexity in [[#def-duration]]. The remainder is $O((\Delta y)^3)$. Positive convexity is [[#prop-price-yield]].
:::

::: example Duration of the five-year bond {#ex-duration}
For the five-year $5$ percent bond of [[#ex-five-percent]] at $y = 6$ percent, $P \approx 95.79$. Compute Macaulay duration, modified duration, and the duration-plus-convexity approximation to the price at $y = 7$ percent. Compare with the exact price $91.80$.
::: solution
The weighted times are

$$
D_{\mathrm{Mac}} = \frac{1}{95.7876}\bigl(1\cdot 5/1.06 + 2\cdot 5/1.06^{2} + 3\cdot 5/1.06^{3} + 4\cdot 5/1.06^{4} + 5\cdot 105/1.06^{5}\bigr) \approx 4.535
$$

years. Modified duration is $4.535 / 1.06 \approx 4.278$. Convexity is about $23.41$. A one-percentage-point rise $\Delta y = 0.01$ is not small, and the first-order approximation gives

$$
\Delta P \approx -4.278 \times 95.79 \times 0.01 \approx -4.10,
$$

so a predicted price of $91.69$, about $0.11$ below the exact $91.80$. Adding $\tfrac12 \times 23.41 \times 95.79 \times (0.01)^{2} \approx 0.11$ recovers $91.80$ to two decimals. The tangent understated the price; convexity put back the bow. For a $0.10$-percentage-point move the first-order term would already have been accurate to a few hundredths of a unit, which is why modified duration is used as a local sensitivity and not as a pricing engine for large yield jumps.
:::
:::

Immunisation — matching the Macaulay duration of assets to that of liabilities so that a parallel yield shift leaves surplus approximately unchanged — is an application of [[#eq-dur-approx]] at the first order. It is a first-order, parallel-shift calculation. It fails when the yield curve does not shift in parallel, when cash flows are not fixed (callable bonds, mortgage-backed securities), and when the match is not rebalanced as durations drift. Stating those limits is part of the definition of the tool; using the tool on a particular balance sheet is not a recommendation this course makes.

::: intuition Duration is an elasticity
Modified duration is the percentage fall in price per unit rise in yield, the elasticity of price with respect to $1+y$ up to a sign. A long, low-coupon bond has a large duration and is therefore more sensitive to a given yield shift than a short, high-coupon bond. That comparison is about the *shape* of two present-value formulae. It is not a ranking of which bond is “better”.
:::

::: quiz
A zero-coupon bond with five years to maturity has Macaulay duration
- [ ] less than five years, because of discounting
- [x] equal to five years
- [ ] greater than five years, because the cash flow is distant
- [ ] equal to its modified duration
::: solution
A zero has a single cash flow at maturity, so [[#eq-mac]] collapses to $D_{\mathrm{Mac}} = n = 5$. Discounting changes the *weight* of that cash flow, which is $1$, not the time at which it arrives. Modified duration is $5/(1+y)$, which is less than five years for $y > 0$.
:::
:::

## Evidence

The inverse price–yield relation is an identity, but the *path* of yields is not. Nominal government yields in the large high-income economies fell, with interruptions, from the early 1980s to the early 2020s, and then rose sharply in 2022–23 as inflation returned (see, among other sources, the OECD’s long-term interest-rate series and the BIS *Annual Economic Report* for 2023). Coupon bonds issued at the low yields of 2020–21 had long durations; the 2022 yield rise produced large mark-to-market losses on those bonds, a duration lesson written into the accounts of pension funds and banks. The UK gilt-market stress of September 2022, documented by the Bank of England, was in part a duration-and-leverage event: liability-driven investors had matched duration with derivatives and were forced to sell as yields rose. Those episodes illustrate [[#prop-duration]]; they are not a prediction of the next move in yields.

Credit spreads — the gap between a corporate yield and a government yield of similar maturity — vary with ratings, with seniority, and with the cycle. They are the subject of [[money-banking/term-structure]] and of the credit-risk chapters of [[derivatives]]. For this chapter it is enough that a spread is a gap between two yields, each of which still prices a promised stream by [[#eq-bond-price]].

::: history
Frederick Macaulay introduced duration in *Some Theoretical Problems Suggested by the Movements of Interest Rates, Bond Yields and Stock Prices in the United States since 1856* (National Bureau of Economic Research, 1938), as a better measure of the life of a bond than calendar maturity. Homer and Leibowitz’s *Inside the Yield Book* (1972) made the price–yield relation and the reinvestment assumption standard reading for practitioners. The Taylor expansion with convexity became textbook material in the 1980s as interest-rate volatility, and the market for options on bonds, made the second derivative impossible to ignore.
:::

## Where this leads

A share is not a bond: its cash flows are residual and not promised. The same present-value algebra applies once a stream of expected dividends or free cash flows is written down, which is [[corporate-finance/valuing-stocks]]. The yield $y$ in this chapter is an input; [[corporate-finance/risk-and-return]] asks where a discount rate comes from when cash flows are risky. Default, seniority and the agency conflict between shareholders and creditors are [[corporate-finance/capital-structure]] and [[corporate-finance/governance]]. The term structure — many spot rates rather than one yield — is [[money-banking/term-structure]] and [[asset-pricing/fixed-income]].

::: summary
- A coupon bond is an annuity of coupons plus repayment of face; its price at a constant yield $y$ is [[#eq-bond-price]].
- Yield to maturity is the constant rate that equates price to the present value of *promised* cash flows. If $y = c$ the bond is at par; if $y > c$ it is at a discount.
- Bond prices fall when yields rise, and the price–yield curve is convex. That is the derivative of the present-value formula, not a separate market law.
- Macaulay duration is the present-value-weighted average maturity of the cash flows; modified duration is the percentage price sensitivity to a small yield change.
- Yield to maturity equals a realised holding-period return only if the bond does not default, is held to maturity, and coupons are reinvested at the same yield. Drop any clause and the equality fails.
- All numerical bonds in this chapter are fictional. The formulae convert a stated stream and a stated yield into a price; they do not recommend a bond or forecast a yield.
:::

## Exercises

::: exercise A par identity {level=1 check="100"}
A three-year bond pays an annual coupon of $4$ units on a face of $100$. Its yield to maturity is $4$ percent. What is its price? (Enter the price.)
::: solution
When $y = c$ the bond prices at par, so $P = 100$. Directly: $4/1.04 + 4/1.04^{2} + 104/1.04^{3} = 100$.
:::
:::

::: exercise A zero-coupon price {level=1 check="86.38"}
A three-year zero-coupon bond with face $100$ has an annual yield of $5$ percent. What is its price, rounded to two decimal places?
::: solution
$100 / (1.05)^3 \approx 86.3838$, which rounds to $86.38$.
:::
:::

::: exercise Premium, par or discount {level=1 check="94.65"}
A three-year bond with annual $4$ percent coupons and face $100$ has a yield of $6$ percent. What is its price, rounded to two decimal places?
::: solution
$4/1.06 + 4/1.06^{2} + 104/1.06^{3} \approx 94.6540$, which rounds to $94.65$. The bond is at a discount because $y > c$.
:::
:::

::: exercise A two-year yield {level=2 check="0.0609"}
A two-year bond with annual $5$ percent coupons and face $100$ sells for $98$. What is its yield to maturity, as a decimal rounded to four places (so $6.09$ percent is $0.0609$)?
::: solution
Solve $5/(1+y) + 105/(1+y)^{2} = 98$. Let $x = 1+y$. Then $5x + 105 = 98 x^{2}$, so $98x^{2} - 5x - 105 = 0$. The positive root is $x = \bigl(5 + \sqrt{25 + 41160}\bigr)/196 \approx 1.06092$, hence $y \approx 0.0609$. Newton’s method from $0.06$ reaches the same value.
:::
:::

::: exercise Macaulay duration of a zero {level=2 check="5"}
What is the Macaulay duration, in years, of a five-year zero-coupon bond?
::: solution
A zero has a single cash flow at maturity, so $D_{\mathrm{Mac}} = 5$.
:::
:::

::: exercise Duration of a two-year coupon bond {level=2 check="1.91"}
A two-year bond with annual $10$ percent coupons, face $100$ and yield $10$ percent (so it is at par) has Macaulay duration how many years, rounded to two decimal places?
::: solution
$P = 100$. Then $D_{\mathrm{Mac}} = \bigl(1 \cdot 10/1.10 + 2 \cdot 110 / 1.10^{2}\bigr)/100 = (9.0909 + 181.8182)/100 = 1.9091$, which rounds to $1.91$. Modified duration is $1.91/1.10 \approx 1.74$.
:::
:::

::: exercise A holding-period identity {level=3}
Take the five-year $5$ percent bond priced at $y = 6$ percent in [[#ex-five-percent]]. Suppose that one year later the yield is still $6$ percent. Show, without using the numerical prices, that the holding-period return equals $6$ percent. Then compute the numerical holding-period return if the yield instead jumps to $7$ percent at the end of the year.
::: hint
Write $P_0(y)$ and $P_1(y)$ as present values of the remaining cash flows and factor $(1+y)$.
:::
::: solution
Let $C_t$ be the remaining cash flows of the original five-year bond. Then $P_0 = \sum_{t=1}^{5} C_t (1+y)^{-t}$ and, with unchanged $y$, the one-year-later price is $P_1 = \sum_{t=1}^{4} C_{t+1} (1+y)^{-t}$. The first cash flow $C_1$ is received during the year, so

$$
(C_1 + P_1) / P_0 = \frac{\sum_{t=1}^{5} C_t (1+y)^{-(t-1)}}{\sum_{t=1}^{5} C_t (1+y)^{-t}} = 1+y.
$$

The holding-period return is $y = 0.06$. If instead the selling yield is $7$ percent, the four-year $5$ percent bond is worth about $93.23$, and $(5 + 93.23)/95.79 - 1 \approx -0.0255$, a loss of about $2.55$ percent. The identity requires an unchanged yield; a jump in $y$ breaks it.
:::
:::

::: exercise Perpetuity duration {level=3 check="17.67"}
A level perpetuity of coupons, discounted at $y = 6$ percent, has Macaulay duration $(1+y)/y$ years. What is that duration, rounded to two decimal places?
::: hint
Start from $P = C/y$ and $D_{\mathrm{Mac}} = (1/P) \sum_{t=1}^{\infty} t C (1+y)^{-t}$, and use the arithmetico-geometric sum $\sum t x^{t} = x/(1-x)^{2}$ for $|x|<1$.
:::
::: solution
$(1.06)/0.06 = 17.666\ldots$, which rounds to $17.67$. Derivation: with $x = 1/(1+y)$, the sum $\sum_{t \ge 1} t x^{t} = x/(1-x)^{2}$, so $D_{\mathrm{Mac}} = (C/P) \cdot x/(1-x)^{2}$. Substitute $P = C/y$ and $1-x = y/(1+y)$ to obtain $(1+y)/y$.
:::
:::

::: exercise Semi-annual coupons {level=3 check="103.59"}
A fictional four-year bond with face $100$ pays a $6$ percent annual coupon in two equal semi-annual instalments of $3$. The bond-equivalent yield is $5$ percent (that is, $2.5$ percent per six-month period). What is the price, rounded to two decimal places?
::: solution
There are eight periods. The price is $\sum_{t=1}^{7} 3 / (1.025)^{t} + 103 / (1.025)^{8} = 3(1-1.025^{-8})/0.025 + 100/1.025^{8} \approx 103.585$, which rounds to $103.59$. The bond is at a premium because the per-period coupon rate $3/100$ exceeds the per-period yield $0.025$.
:::
:::
