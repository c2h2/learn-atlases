Firm A can collect 100 units of money today, or 110 units in one year, and it cannot have both. The two offers are not two ways of writing the same number. The 100 units, if they arrive today, can be lent until next year; the 110 units, if they arrive next year, cannot be spent today. Comparing them is the whole of the **time value of money**: a unit of cash is dated, and cash at different dates is converted by compounding forward or discounting back. Once the conversion is in place, a factory, a bond and a share become lists of dated cash flows, and the lists can be added.

The conversion factor is an **interest rate**, or more generally a **discount rate**. In this chapter the rate is a given number, the opportunity cost of tying up cash for a stated period. Where that number comes from — a quoted loan rate, a bond yield, a cost of capital built from risk — is the subject of later chapters. Here we take the rate as data, state whether it is annual, effective or continuously compounded, and compute. Every numerical example uses illustrative cash flows and fictional firms. The calculations are arithmetic about those invented numbers. They are not a forecast, and they are not advice to lend, borrow, or accept a project. The atlas is for education only — not investment or financial advice.

The mathematics is the geometric series and the exponential, already used for surplus and present value in [[mathematical-economics/integration]]. The economic content is the dating of cash and the discipline of not adding units that live at different times. Opportunity cost, from [[principles/thinking-like-an-economist]], is what the discount rate is meant to capture: the best alternative use of the cash over the same horizon, in the same risk class. Until [[corporate-finance/risk-and-return]] we treat “the same risk class” as a phrase that licences a single rate, not as a derived object.

## Compounding and discounting

A unit of cash invested at a constant per-period rate $r$ grows by the factor $1+r$ each period. After $t$ periods the unit has become $(1+r)^t$. That is **compounding**: interest itself earns interest. **Simple interest**, which applies $r$ only to the original principal, is a different convention and is not used for the valuation identities in this course.

::: definition Future value and present value {#def-pv}
Let $r > -1$ be a per-period discount rate, constant across dates. The **future value** at date $t$ of a cash flow $C_0$ received at date $0$ is

$$
\mathrm{FV}_t(C_0) = C_0\,(1+r)^t.
$$ {#eq-fv}

The **present value** at date $0$ of a cash flow $C_t$ received at date $t$ is

$$
\mathrm{PV}(C_t) = \frac{C_t}{(1+r)^t} = C_t\,(1+r)^{-t}.
$$ {#eq-pv}

A **cash-flow stream** $(C_0, C_1, \dots, C_T)$ has present value $\sum_{t=0}^{T} C_t (1+r)^{-t}$. The rate $r$ is assumed to apply to every period and to cash flows of this risk class. Date $0$ is “now”; cash flows are otherwise received at the end of each period unless a problem says otherwise.
:::

The two operations undo each other: compounding a present value for $t$ periods recovers the future cash flow, and discounting a future value recovers the present cash flow. The factor $(1+r)^{-t}$ is the **discount factor** for date $t$. When $r > 0$ the discount factor falls with $t$: more distant cash is worth less today, because more compounding is given up by waiting. When $r = 0$ the discount factor is $1$ at every date and dating does not matter. Negative rates occur in some money markets; the algebra still works as long as $r \neq -1$.

::: proposition Linearity of present value {#prop-linearity}
Present value, at a fixed rate $r$, is linear in cash flows. For any streams $C$ and $D$ and any scalars $\alpha, \beta$,

$$
\mathrm{PV}(\alpha C + \beta D) = \alpha\,\mathrm{PV}(C) + \beta\,\mathrm{PV}(D).
$$

In particular, the present value of a stream is the sum of the present values of its dated pieces, and a cash flow that is scaled by a constant has a present value scaled by the same constant.
:::

::: proof
Each term $C_t (1+r)^{-t}$ is linear in $C_t$, and a finite sum of linear maps is linear. The same identity holds for an infinite stream whenever the series of present values converges absolutely, so that rearrangement is legitimate.
:::

Linearity is why a firm can value a project by listing incremental cash flows and discounting them one at a time. It is also why two projects that do not interact can be ranked by adding their net present values. Interaction — a shared constraint, a cannibalised sale, a tax that depends on the pair — breaks the “do not interact” clause, not the algebra of [[#prop-linearity]].

::: example Firm A’s two offers {#ex-two-offers}
Firm A is offered 100 units today or 110 units in one year. The opportunity cost of capital for cash flows of this kind is $r = 0.08$ per year, effective. Which offer has the higher present value? What future value does the 100 units become in one year if it is compounded at $8$ percent?
::: solution
The present value of 110 units in one year is $110 / 1.08 = 101.85185\ldots$, which rounds to $101.85$ units. That is larger than $100$, so the delayed offer is worth more *at this rate*. Equivalently, $100$ units compounded for one year become $108$, which is less than $110$. The ranking is the same in present-value units and in future-value units, because multiplying by $1.08$ does not change an inequality.

If the rate had been $12$ percent, the present value of the delayed offer would have been $110 / 1.12 = 98.214\ldots$, below $100$, and the ranking would have reversed. The arithmetic does not say which offer Firm A “should” take in the world; it says which offer is larger once cash has been dated at a stated rate. Changing the rate changes the ranking. The $8$ percent and the $12$ percent are illustrative.
:::
:::

::: example Five years of compounding {#ex-five-years}
A cash flow of $100$ units is compounded at an effective $8$ percent a year for five years. What is its future value? What is the present value, at the same rate, of $100$ units received in five years?
::: solution
The future value is

$$
100 \times (1.08)^5 = 146.93280768,
$$

which rounds to $146.93$ units. The present value of $100$ units in five years is the reciprocal operation:

$$
\frac{100}{(1.08)^5} = 68.05831970,
$$

which rounds to $68.06$ units. A useful check: $68.05831970 \times (1.08)^5 = 100$. The two numbers $146.93$ and $68.06$ describe different cash-flow dates; adding them to each other would mix dates and would not be a present value.
:::
:::

The sequence of compounded values $100, 100(1+r), 100(1+r)^2, \ldots$ is a geometric sequence. Raising $r$ steepens it; at $r = 0$ it is flat.

::: widget sequence
a: 100*(1+r)^n
N: 25
start: 0
sliders: r=0.08:0.00:0.20:0.01
y: 0, 900
caption: Compounded value of 100 units after n years at rate r. Raise r and the sequence steepens; at r = 0 it is a horizontal line at 100. The cash flow is invented, and the figure is not a forecast of any market.
:::

A common approximation for doubling times is the **rule of 72**: the number of years for a balance to double at annual rate $r$ (in percent) is about $72 / (100r)$. At $8$ percent the rule gives $9$ years; the exact doubling time is $\ln 2 / \ln(1.08) \approx 9.006$ years. The rule is a mnemonic, not a theorem, and it deteriorates as $r$ moves away from the neighbourhood of $8$ percent.

::: intuition Dating is a unit conversion
Present value is a change of units, from “units of money at date $t$” into “units of money at date $0$”. The exchange rate is the discount factor $(1+r)^{-t}$. Refusing to convert, and adding a cash flow at date $3$ to a cash flow at date $0$, is the same kind of mistake as adding metres to seconds. The converted numbers can be added, by [[#prop-linearity]], because they have been brought to a common date.
:::

## Annuities and perpetuities

Many contracts repeat. A level loan payment, a coupon on a fixed-rate bond, a constant lease, and a constant dividend in a textbook example are all **annuities**: a cash flow $C$ received at the end of each of $n$ periods. A **perpetuity** is the same object with $n = \infty$. A **growing** annuity or perpetuity scales the cash flow by a constant growth factor each period. Closed forms save adding a long list of discounted terms, and they come from the geometric series.

::: definition Ordinary annuity, annuity due, perpetuity {#def-annuity}
An **ordinary annuity** of $n$ payments is the stream $(0, C, C, \dots, C)$ with $C$ at the end of each of the next $n$ periods. An **annuity due** pays the same $C$ at the *beginning* of each of $n$ periods, so the first payment is immediate. A **level perpetuity** is the infinite ordinary stream $(0, C, C, C, \dots)$. A **growing perpetuity** with first payment $C$ one period from now and growth rate $g$ is the stream $(0, C, C(1+g), C(1+g)^2, \dots)$.
:::

::: proposition Present value of a level annuity and a perpetuity {#prop-annuity-pv}
Let $r \neq 0$. The present value of an ordinary annuity of $n$ payments of $C$ is

$$
\mathrm{PV}_{\text{annuity}} = C \cdot \frac{1 - (1+r)^{-n}}{r}.
$$ {#eq-annuity}

The present value of a level perpetuity is $C/r$, provided $r > 0$. The present value of a growing perpetuity with first payment $C$ and growth $g$ is $C/(r-g)$, provided $r > g$. An annuity due of $n$ payments is worth $(1+r)$ times the corresponding ordinary annuity.
:::

::: proof
The ordinary annuity is $C$ times $\sum_{t=1}^{n} (1+r)^{-t}$. This is a geometric series with first term $(1+r)^{-1}$ and ratio $(1+r)^{-1}$. The sum of $n$ terms is

$$
(1+r)^{-1}\,\frac{1 - (1+r)^{-n}}{1 - (1+r)^{-1}} = \frac{1 - (1+r)^{-n}}{r},
$$

which is [[#eq-annuity]]. Let $n \to \infty$ with $r > 0$: the term $(1+r)^{-n}$ vanishes and the perpetuity value is $C/r$. For the growing perpetuity, factor $C/(1+r)$ out of $\sum_{t=0}^{\infty} \bigl((1+g)/(1+r)\bigr)^{t}$. The ratio is less than $1$ precisely when $r > g$, and the sum is $C/(r-g)$. An annuity due is the ordinary annuity shifted one period earlier, which multiplies its present value by $1+r$; equivalently, it is $C$ today plus an ordinary annuity of $n-1$ payments.
:::

The growing-annuity formula, used less often but derived the same way, is

$$
\mathrm{PV} = \frac{C}{r-g}\Bigl(1 - \bigl(\tfrac{1+g}{1+r}\bigr)^{n}\Bigr), \qquad r \neq g.
$$ {#eq-growing-annuity}

When $r = g$ the $n$ discounted payments each equal $C/(1+r)$, so the present value is $nC/(1+r)$. When $r \le g$ a growing perpetuity has no finite present value: the cash flows grow at least as fast as they are discounted, and the series diverges. That is a statement about the formula, not a prediction that any firm’s dividends will grow at a rate above the discount rate forever.

::: example A ten-year annuity {#ex-annuity}
Firm A is to receive $50$ units at the end of each of the next ten years. The discount rate is $6$ percent a year, effective. What is the present value of the ordinary annuity? What would the present value be if the ten payments arrived at the beginning of each year instead?
::: solution
[[#eq-annuity]] gives

$$
50 \cdot \frac{1 - (1.06)^{-10}}{0.06} = 368.00435257,
$$

which rounds to $368.00$ units. The annuity due is $1.06$ times as large: $390.08461372$, which rounds to $390.08$ units. The extra $22.08$ units are the value of receiving each payment one year sooner. Adding the ten undiscounted $50$s would give $500$, which is the present value only at $r = 0$. At $6$ percent the dating is worth $132$ units of the $500$.
:::
:::

::: example Level and growing perpetuities {#ex-perpetuity}
A contract pays $20$ units a year forever, first payment in one year. At $r = 5$ percent the present value is $20 / 0.05 = 400$ units. A second contract pays $20$ units in one year and then grows at $g = 3$ percent a year forever. At $r = 8$ percent, what is its present value? Why is the answer the same $400$?
::: solution
The growing-perpetuity formula applies because $8\% > 3\%$:

$$
\frac{20}{0.08 - 0.03} = 400.
$$

The two contracts are not the same stream. The first is a flat $20$ discounted at $5$ percent; the second is a growing stream discounted at $8$ percent. They happen to share a present value at these particular rates. Replacing $g$ by $4$ percent in the second contract would raise the present value to $20 / 0.04 = 500$. Replacing $g$ by $8$ percent would make the formula inapplicable: $r = g$ is the boundary at which the infinite sum diverges.
:::
:::

::: warning The first payment’s date
The formula $C/r$ for a perpetuity, and $C/(r-g)$ for a growing perpetuity, assume that the first payment arrives in *one* period, not today. A perpetuity that pays $C$ immediately and then $C$ at the end of every period is worth $C + C/r$. Using $C/r$ for an immediate perpetuity understates the present value by one payment. The same slip with annuities is the confusion of ordinary annuities with annuities due. Bond coupons, treated in [[corporate-finance/valuing-bonds]], are ordinary: the next coupon is not due the instant the bond is bought, unless the purchase falls on a coupon date and the conventions say otherwise.
:::

A **loan amortisation** is the annuity formula run in reverse. If a loan of amount $L$ is repaid by $n$ equal end-of-period payments at rate $r$, the payment is the $C$ that makes [[#eq-annuity]] equal $L$:

$$
C = L \cdot \frac{r}{1 - (1+r)^{-n}}.
$$ {#eq-pmt}

Each payment is part interest on the remaining balance and part repayment of principal. The interest portion falls over the life of the loan; the principal portion rises. The split is an accounting identity once $r$ and the remaining balance are given. It is not a recommendation to take or to refinance any loan.

::: example A five-year level loan {#ex-loan}
A fictional borrower takes a loan of $20{,}000$ units, to be repaid in five equal annual payments at $7$ percent a year, effective. What is the annual payment? How much of the first payment is interest?
::: solution
[[#eq-pmt]] gives

$$
C = 20{,}000 \cdot \frac{0.07}{1 - (1.07)^{-5}} = 4{,}877.81388883,
$$

which rounds to $4{,}877.81$ units. Interest in the first year is $0.07 \times 20{,}000 = 1{,}400$ units, so principal repaid in the first year is $4{,}877.81 - 1{,}400 = 3{,}477.81$ units. The remaining balance at the start of year two is $16{,}522.19$ units. The five payments still total $24{,}389.07$ units; the extra $4{,}389.07$ above the $20{,}000$ is the interest paid over the life of the loan, in undiscounted units. That extra is not a present-value cost: the present value of the five payments, at $7$ percent, is exactly $20{,}000$ by construction.
:::
:::

::: quiz
A growing perpetuity has first payment $12$ units in one year and growth rate $2$ percent. The discount rate is $8$ percent. What is its present value?
- [ ] $12 / 0.08 = 150$
- [x] $12 / (0.08 - 0.02) = 200$
- [ ] $12 / 0.02 = 600$
- [ ] The present value is infinite because the payments grow forever
::: solution
[[#prop-annuity-pv]] gives $C/(r-g) = 12 / 0.06 = 200$, and $r > g$ so the sum converges. Discounting a growing stream at $r$ as if it did not grow, $12/0.08$, ignores the later larger payments. Dividing by $g$ has no present-value meaning. Infinite growth of the *undiscounted* payments does not make the discounted sum diverge when those payments are discounted faster than they grow.
:::
:::

## Effective rates and continuous compounding

A quoted rate is not a well-defined discount rate until its compounding convention is named. A **nominal** annual rate of $8$ percent compounded quarterly means $2$ percent per quarter, four times a year. The amount that $1$ becomes in a year is $(1.02)^4 = 1.08243216$, so the **effective annual rate** is about $8.24$ percent, not $8$ percent. Comparing a quarterly-compounded quote with an annually compounded quote without converting both to a common convention is a unit error of the same kind as adding cash at different dates.

::: definition Effective annual rate {#def-ear}
If a nominal annual rate $r_{\text{nom}}$ is compounded $m$ times a year, the **effective annual rate** (EAR) is

$$
\mathrm{EAR} = \Bigl(1 + \frac{r_{\text{nom}}}{m}\Bigr)^{m} - 1.
$$ {#eq-ear}

Two quoted rates are comparable only after they have been converted to the same compounding frequency, or to EARs. The **annual percentage rate** (APR) in consumer-credit regulation is a nominal rate; it is not in general an EAR. Conventions differ across markets and jurisdictions; a problem must state the convention it is using.
:::

As $m \to \infty$, the right-hand side of [[#eq-ear]] tends to $e^{r_{\text{nom}}} - 1$. That is **continuous compounding**. If a balance grows at a continuously compounded rate $r$, its value after $t$ years is $e^{rt}$ times the starting value, and the present value of a cash flow $C_t$ at date $t$ is $C_t e^{-rt}$.

::: proposition Continuous present value of a constant stream {#prop-continuous-pv}
A continuous stream of cash at rate $C$ per year over the interval $[0, T]$, discounted at a constant continuously compounded rate $r \neq 0$, has present value

$$
\int_0^{T} C e^{-rt}\,\mathrm{d}t = C\,\frac{1 - e^{-rT}}{r}.
$$ {#eq-cont-pv}

As $T \to \infty$ with $r > 0$ this tends to $C/r$, the continuous analogue of the perpetuity formula. The discrete ordinary annuity [[#eq-annuity]] is a Riemann-sum cousin of the same integral.
:::

::: proof
The antiderivative of $e^{-rt}$ is $-e^{-rt}/r$. Evaluating from $0$ to $T$ produces $(1 - e^{-rT})/r$, and multiplying by $C$ gives [[#eq-cont-pv]]. The infinite-horizon limit is $C/r$ because $e^{-rT} \to 0$ when $r > 0$. A right Riemann sum of $C e^{-rt}$ on $n$ equal partitions of $[0, T]$ is a discrete annuity whose per-period rate is $e^{rT/n} - 1$; as $n \to \infty$ the sum converges to the integral.
:::

::: widget riemann
f: 10*exp(-0.06*x)
a: 0
b: 5
n: 8
method: mid
caption: Midpoint rectangles for the continuous present value of a stream of 10 units a year over five years, discounted at a continuously compounded 6 percent. Raise n: the sum approaches 10(1 − e^{−0.30})/0.06 ≈ 43.20. The stream is invented.
:::

::: example Quoted, effective and continuous {#ex-ear}
A savings quote is “$8$ percent, compounded quarterly”. What is the EAR? What continuously compounded rate produces the same EAR? Separately, a continuous stream of $10$ units a year for five years is discounted at a continuously compounded $6$ percent. What is its present value?
::: solution
The EAR is $(1 + 0.08/4)^4 - 1 = (1.02)^4 - 1 = 0.08243216$, or about $8.243$ percent. The continuously compounded rate $r$ that matches this EAR solves $e^{r} - 1 = 0.08243216$, so $r = \ln(1.08243216) \approx 0.0792$, a little below the $8$ percent quote. Continuous compounding at the quoted $8$ percent itself would produce EAR $e^{0.08} - 1 \approx 0.083287$, about $8.329$ percent, which is not the quarterly convention.

The continuous present value is

$$
10 \cdot \frac{1 - e^{-0.06 \times 5}}{0.06} = 10 \cdot \frac{1 - e^{-0.30}}{0.06} \approx 43.19696,
$$

about $43.20$ units. A discrete ordinary annuity of $10$ units a year for five years at an *effective* $6$ percent is $10(1 - 1.06^{-5})/0.06 \approx 42.12$ units. The two numbers answer two different timing questions: a trickle throughout each year versus a lump at the end of each year. Mixing the conventions, and then comparing the $43.20$ with the $42.12$ as if one were “more accurate”, confuses a modelling choice with a measurement error.
:::
:::

::: quiz
A bank quotes $12$ percent compounded monthly. Which statement is correct?
- [ ] The effective annual rate is $12$ percent.
- [x] The effective annual rate is $(1 + 0.12/12)^{12} - 1 \approx 12.68$ percent.
- [ ] The effective annual rate is $12 \times 12 = 144$ percent.
- [ ] Monthly compounding is the same as continuous compounding at $12$ percent.
::: solution
[[#eq-ear]] with $r_{\text{nom}} = 0.12$ and $m = 12$ gives $(1.01)^{12} - 1 \approx 0.126825$, about $12.68$ percent. The quoted $12$ percent is a nominal rate, not an EAR. Multiplying $12$ percent by $12$ confuses a monthly rate of $12$ percent with a monthly rate of $1$ percent. Continuous compounding at $12$ percent would give $e^{0.12} - 1 \approx 12.75$ percent, close to but not equal to monthly compounding.
:::
:::

## Using present values

The capital-budgeting chapter will define **net present value** as the present value of a project’s cash flows, including the (usually negative) initial outlay, and will treat NPV as a decision rule under stated assumptions. This section only records what the time-value toolkit already implies for that rule, so that later chapters can take linearity and dating as given.

If a project’s stream is $(C_0, C_1, \dots, C_T)$ and the discount rate for its risk class is $r$, the net present value is $\mathrm{NPV} = \sum_{t=0}^{T} C_t (1+r)^{-t}$. When $C_0 < 0$ and the later $C_t$ are positive, NPV is the present value of the inflows minus the present value of the outflows. A plot of NPV against $r$ is downward-sloping for such a conventional project: a higher discount rate punishes distant inflows more and makes the project look worse. The rate at which NPV crosses zero is an **internal rate of return**, computed in [[corporate-finance/capital-budgeting]] and, for bonds, as a yield to maturity in [[corporate-finance/valuing-bonds]].

Fisher’s separation argument, from *The Theory of Interest* (1930), is the economic reason a firm can use a market rate at all. If owners can borrow and lend at the same rate $r$ in a complete capital market, the firm maximises the owners’ wealth by maximising the present value of its cash flows at that rate, and the owners then borrow or lend to move consumption across time as they wish. The investment decision and the consumption decision separate. When owners cannot trade at a common $r$, or when cash flows are risky in ways the market does not span, the separation fails and a single discount rate is no longer a sufficient statistic. Those failures are why later chapters spend so long on risk, capital structure and governance.

::: remark Real and nominal rates
If cash flows are forecast in nominal units — including inflation — they must be discounted at a nominal rate. If they are forecast in real units, they must be discounted at a real rate. Mixing a real cash-flow forecast with a nominal discount rate, or the reverse, is a dating error dressed as inflation. The Fisher relation $1 + i = (1+r)(1+\pi^{e})$ connects a nominal rate $i$, a real rate $r$ and expected inflation $\pi^{e}$; it is used in [[money-banking/interest-rates]]. In this course a problem will state whether $r$ is real or nominal. Illustrative examples that never mention inflation are using $r$ as a real effective rate on real cash flows, or equivalently as a nominal rate on already-nominal cash flows, with inflation set to zero as a modelling choice.
:::

::: application A plant with a finite life
Helios Ltd, a fictional manufacturer, can build a plant that costs $100$ units at date $0$ and is expected, in the firm’s planning spreadsheet, to produce a real cash inflow of $40$ units at the end of each of the next four years. At a real discount rate of $10$ percent the present value of the inflows is

$$
40 \cdot \frac{1 - (1.10)^{-4}}{0.10} = 126.79461785,
$$

about $126.79$ units, so the NPV is about $26.79$ units. At $20$ percent the NPV falls to about $3.55$ units; at $0$ percent it is $60$ units. The numbers will reappear as the running example of [[corporate-finance/capital-budgeting]]. They are not a reason to build any plant. They show that a four-year annuity of $40$ and an outlay of $100$ have a positive NPV at $10$ percent and a smaller one at $20$ percent, under the maintained timing and the maintained rate.
:::

## Evidence

Present-value arithmetic is a definition, not an empirical claim, but the *use* of present values in firms is an empirical question. John Graham and Campbell Harvey surveyed 392 chief financial officers and reported, in the *Journal of Financial Economics* (volume 60, 2001), that the internal rate of return and net present value were the two most frequently cited capital-budgeting tools, with the payback period still in wide use. The survey is a snapshot of reported practice among mostly large US firms at the end of the 1990s, not a law of managerial behaviour and not a sample of households or of firms in other countries. Subsequent surveys, including Graham’s later work with colleagues, have found the same ranking of tools with shifts in emphasis; they are cited in [[corporate-finance/capital-budgeting]].

The geometric growth that compounding produces is visible in any long series of a reinvested balance, but a market return is not a constant $r$. Dimson, Marsh and Staunton’s long-run yearbooks document that realised real returns on equities, bonds and bills vary widely across years and across countries; a constant-$r$ calculation is a model, not a description of those paths. Using a historical average return as a discount rate for a project is a further modelling step, taken up in [[corporate-finance/risk-and-return]], and it is not implied by the algebra of this chapter.

::: history
Compound interest is older than corporate finance. Fibonacci’s *Liber Abaci* (1202) already works discount problems; Johan de Witt’s 1671 report on life annuities for the States of Holland prices a stream of contingent payments by discounting. The modern statement that capital is the present value of income, and that a competitive capital market lets investment and consumption decisions separate, is Irving Fisher’s, in *The Rate of Interest* (1907) and more fully in *The Theory of Interest* (1930). John Burr Williams’s *The Theory of Investment Value* (1938) applied the same present-value idea to shares, writing price as discounted dividends — the starting point of [[corporate-finance/valuing-stocks]].
:::

## Where this leads

Bonds are finite annuities plus a principal repayment; their prices and yields are [[#eq-annuity]] plus one extra term, developed in [[corporate-finance/valuing-bonds]]. Shares are modelled as growing perpetuities or as two-stage cousins of them in [[corporate-finance/valuing-stocks]]. Capital budgeting in [[corporate-finance/capital-budgeting]] takes the NPV defined above, compares it with payback and IRR, and asks which cash flows are incremental. The discount rate, treated as data here, is built from risk in [[corporate-finance/risk-and-return]]. Continuous discounting reappears as the present-value integral of a cash-flow density, and as the $e^{-rT}$ that multiplies an option payoff in [[derivatives/options]].

::: summary
- Cash flows at different dates cannot be added until they have been compounded or discounted to a common date at a stated rate $r$.
- The present value of $C_t$ is $C_t (1+r)^{-t}$; present value is linear in cash flows, so a stream is the sum of its dated pieces.
- An ordinary annuity of $n$ payments of $C$ is worth $C\bigl(1-(1+r)^{-n}\bigr)/r$; a level perpetuity is worth $C/r$; a growing perpetuity with first payment $C$ is worth $C/(r-g)$ when $r > g$.
- Quoted rates with different compounding frequencies must be converted to effective annual rates (or to a common frequency) before they are compared; continuous compounding replaces $(1+r)^{t}$ by $e^{rt}$.
- The formulas assume a constant rate, known cash flows, and a named timing convention (end of period versus continuous). They are identities under those assumptions, not forecasts and not advice to lend, borrow or invest.
- Net present value is the present value of a project’s cash flows including the initial outlay; its use as a decision rule, and the construction of $r$ from risk, belong to later chapters.
:::

## Exercises

::: exercise A future value {level=1 check="231.53"}
A cash flow of $200$ units is compounded at an effective $5$ percent a year for three years. What is the future value, rounded to two decimal places? (Enter that rounded value.)
::: solution
$200 \times (1.05)^3 = 200 \times 1.157625 = 231.525$, which rounds to $231.53$.
:::
:::

::: exercise A present value {level=1 check="367.51"}
What is the present value, at an effective $8$ percent a year, of $500$ units received in four years? Round to two decimal places.
::: solution
$500 / (1.08)^4 = 500 / 1.36048896 \approx 367.5149$, which rounds to $367.51$.
:::
:::

::: exercise A growing perpetuity {level=1 check="200"}
A growing perpetuity pays $12$ units in one year and then grows at $2$ percent a year forever. The discount rate is $8$ percent. What is the present value? (Enter the exact present value.)
::: solution
$r > g$, so [[#prop-annuity-pv]] gives $12 / (0.08 - 0.02) = 200$.
:::
:::

::: exercise An ordinary annuity {level=2 check="379.08"}
Firm B will receive $100$ units at the end of each of the next five years. The discount rate is $10$ percent a year, effective. What is the present value of this ordinary annuity, rounded to two decimal places?
::: solution
$100 \times \bigl(1 - (1.10)^{-5}\bigr) / 0.10 = 379.07867694$, which rounds to $379.08$.
:::
:::

::: exercise Effective annual rate {level=2 check="0.1268"}
A nominal rate of $12$ percent is compounded monthly. What is the effective annual rate, rounded to four decimal places (so $12.68$ percent is entered as $0.1268$)?
::: solution
$(1 + 0.12/12)^{12} - 1 = (1.01)^{12} - 1 \approx 0.126825$, which rounds to $0.1268$.
:::
:::

::: exercise Annuity due versus ordinary {level=2 check="390.08"}
Using the ten payments of $50$ units and the $6$ percent rate of [[#ex-annuity]], what is the present value of the *annuity due*, rounded to two decimal places?
::: solution
The ordinary present value is $368.00435257$. Multiplying by $1.06$ gives $390.08461372$, which rounds to $390.08$. Equivalently, $50$ plus an ordinary nine-payment annuity at $6$ percent produces the same number.
:::
:::

::: exercise Continuous present value {level=3 check="62.96"}
A continuous stream of $8$ units a year over ten years is discounted at a continuously compounded $5$ percent. What is the present value, rounded to two decimal places?
::: hint
Use [[#eq-cont-pv]] with $C = 8$, $r = 0.05$, $T = 10$.
:::
::: solution
$8 \times (1 - e^{-0.5}) / 0.05$. Now $e^{-0.5} \approx 0.60653066$, so $1 - e^{-0.5} \approx 0.39346934$ and the present value is $8 \times 7.8693868 \approx 62.955$, which rounds to $62.96$.
:::
:::

::: exercise A growing annuity {level=3 check="187.90"}
A growing annuity pays $C = 30$ units in one year and then grows at $g = 4$ percent a year for a total of $n = 8$ payments. The discount rate is $r = 9$ percent. What is the present value, rounded to two decimal places?
::: hint
[[#eq-growing-annuity]] applies because $r \neq g$.
:::
::: solution
$$
\frac{30}{0.09-0.04}\Bigl(1 - \bigl(\tfrac{1.04}{1.09}\bigr)^{8}\Bigr) = 600 \bigl(1 - (1.04/1.09)^{8}\bigr).
$$

Now $(1.04/1.09)^{8} \approx 0.68683866$, so $1$ minus that ratio is about $0.31316134$, and $600$ times that is $187.8968$, which rounds to $187.90$.
:::
:::

::: exercise Matching a quoted rate to a continuous rate {level=3}
A quote is “$8$ percent compounded quarterly”, as in [[#ex-ear]]. Find the continuously compounded rate $r$ that produces the same effective annual rate, as a decimal to four places. Then confirm that $e^{r} - 1$ recovers the quarterly EAR.
::: hint
The EAR is $(1.02)^4 - 1$. The matching $r$ is the natural log of one plus that EAR.
:::
::: solution
$\mathrm{EAR} = (1.02)^4 - 1 = 0.08243216$. Then $r = \ln(1.08243216) \approx 0.07922$, or $0.0792$ to four decimal places. Check: $e^{0.07922} - 1 \approx 0.08243$, matching the quarterly EAR to five decimal places. The matching continuous rate is *below* the $8$ percent quote, because continuous compounding at $8$ percent would overshoot the quarterly EAR.
:::
:::
