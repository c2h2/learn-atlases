A city opens a new bus lane and the fare falls from 3 units of money to 2. Riders who were already taking the bus now pay less; new riders, who were not quite willing to pay 3, now find the trip worth taking. How much better off are they, in units of money? The economist's answer is an area under the demand curve, and an area under a curve is an **integral**.

The same mathematics prices a stream of future income. A land rent of 50 units of money a year, forever, at a continuous discount rate of 4 per cent, is worth $50/0.04 = 1250$ today: that is the integral of $50 e^{-0.04 t}$ from zero to infinity. Consumer surplus, producer surplus, deadweight loss, present value and the fundamental theorem that undoes differentiation are the subject of this chapter. The construction of the Riemann integral and the proof of the fundamental theorem are in the [Maths Atlas](/a/maths/lesson.php?c=calculus-1&l=integrals); we take them as given.

Figures and present-value calculations in this chapter are illustrative. They are not forecasts of fares, land prices or investment returns, and they are not advice.

## Antiderivatives and the fundamental theorem

::: definition Antiderivative {#def-antiderivative}
A differentiable function $F$ is an **antiderivative** of $f$ on an interval if $F'(x) = f(x)$ for every $x$ in the interval. Any two antiderivatives of $f$ differ by a constant. The **indefinite integral** $\int f(x)\, \dd x = F(x) + C$ names the whole family.
:::

The derivatives of the last chapter reverse immediately:

$$
\int x^k\, \dd x = \frac{x^{k+1}}{k+1} + C \quad (k \neq -1), \qquad \int \frac{1}{x}\, \dd x = \ln\abs{x} + C, \qquad \int e^{rx}\, \dd x = \frac{1}{r} e^{rx} + C \quad (r \neq 0).
$$

Linearity holds: $\int \bigl(\alpha f + \beta g\bigr) = \alpha \int f + \beta \int g$. Substitution and integration by parts are the chain rule and the product rule run backwards; they are developed in the [Maths Atlas](/a/maths/lesson.php?c=calculus-1&l=integration-techniques).

The **definite integral** $\int_a^b f(x)\, \dd x$ is the signed area between the graph of $f$ and the $x$-axis from $a$ to $b$: positive where $f > 0$, negative where $f < 0$. It is defined as a limit of Riemann sums, and the fundamental theorem says that this area is the change in any antiderivative.

::: theorem Fundamental theorem of calculus {#thm-ftc}
Let $f$ be continuous on $[a,b]$ and let $F$ be an antiderivative of $f$. Then

$$
\int_a^b f(x)\, \dd x = F(b) - F(a).
$$ {#eq-ftc}

Moreover, the function $G(q) = \int_a^q f(x)\, \dd x$ is differentiable on $(a,b)$ with $G'(q) = f(q)$.
:::

The economic reading of the second part is immediate: if $MC$ is the derivative of $C$, then the integral of $MC$ from $0$ to $q$ recovers variable cost, $C(q) - C(0)$. If $MR$ is the derivative of $R$, the integral of $MR$ recovers total revenue. Differentiation and integration undo each other; marginal quantities and totals are two views of the same function.

::: example Recovering cost from marginal cost {#ex-ftc-cost}
Marginal cost is $MC(q) = 6 + 0.2 q$ and fixed cost is $C(0) = 100$. Find $C(q)$ and evaluate it at $q = 20$.
::: solution
$C(q) = 100 + \int_0^q (6 + 0.2 x)\, \dd x = 100 + \bigl[6x + 0.1 x^2\bigr]_0^q = 100 + 6q + 0.1 q^2$. At $q = 20$, $C = 100 + 120 + 40 = 260$, matching [[mathematical-economics/derivatives-and-elasticities#ex-cost]]. The definite integral from 0 to 20 is variable cost, 160.
:::
:::

::: widget riemann
f: 6 + 0.2*x
a: 0
b: 20
n: 8
method: mid
x: 0, 24
y: 0, 12
caption: Riemann sums for $\int_0^{20} (6+0.2x)\, \dd x$, the variable cost in [[#ex-ftc-cost]]. Raise $n$: the midpoint rectangles fill out the exact area $160$. Switch the method to left or right to see the bias of a monotone integrand; trapezoid and Simpson close the gap faster.
:::

## Consumer and producer surplus

Take inverse demand $P_d(q)$, a decreasing function, and a market price $p^*$ at which $q^*$ units are bought. The buyer of the first unit was willing to pay $P_d$ near zero, which is larger than $p^*$; the buyer of the last unit was willing to pay just $p^*$. The extra willingness to pay, summed over units, is the area between the demand curve and the price line.

::: definition Consumer and producer surplus {#def-surplus}
For inverse demand $P_d$ and market price $p^*$ with $P_d(q^*) = p^*$, **consumer surplus** is

$$
CS = \int_0^{q^*} \bigl(P_d(q) - p^*\bigr)\, \dd q.
$$ {#eq-cs}

For inverse supply $P_s$ with $P_s(q^*) = p^*$, **producer surplus** is

$$
PS = \int_0^{q^*} \bigl(p^* - P_s(q)\bigr)\, \dd q.
$$ {#eq-ps}

**Total surplus** is $CS + PS = \int_0^{q^*} \bigl(P_d(q) - P_s(q)\bigr)\, \dd q$. A policy that prevents some of these units from being traded, or that inserts a wedge between the price buyers pay and the price sellers receive, creates a **deadweight loss** equal to the surplus on the units no longer traded.
:::

Consumer surplus is a money metric of the gains from trade on the demand side, under the special assumption that the marginal utility of money is constant (quasilinear utility). Without that assumption the correct money metrics are compensating and equivalent variation, developed in [[microeconomics/slutsky-and-welfare]]. For the linear and isoelastic demand curves of applied partial-equilibrium work, [[#eq-cs]] is the standard calculation.

::: example Surplus in a linear market {#ex-surplus}
Inverse demand is $p = 40 - 2q$ and inverse supply is $p = 4 + q$, the market of [[mathematical-economics/functions-and-models#ex-linear-market]]. Equilibrium is $(q^*, p^*) = (12, 16)$. Compute $CS$, $PS$ and total surplus. Then compute the deadweight loss of a per-unit tax $t = 3$ on sellers, which moved the market to $q^{**} = 11$, buyer price $18$, seller price $15$.
::: solution
$CS = \int_0^{12} (40-2q-16)\, \dd q = \int_0^{12} (24-2q)\, \dd q = \bigl[24q - q^2\bigr]_0^{12} = 288 - 144 = 144$. $PS = \int_0^{12} (16-4-q)\, \dd q = \int_0^{12} (12-q)\, \dd q = \bigl[12q - q^2/2\bigr]_0^{12} = 144 - 72 = 72$. Total surplus is $216$.

With the tax, $CS = \int_0^{11} (40-2q-18)\, \dd q = \int_0^{11} (22-2q)\, \dd q = 242 - 121 = 121$. $PS = \int_0^{11} (15-4-q)\, \dd q = \int_0^{11} (11-q)\, \dd q = 121 - 60.5 = 60.5$. Tax revenue is $3 \times 11 = 33$. The three items sum to $214.5$, so the deadweight loss is $216 - 214.5 = 1.5$. Directly, the lost surplus is the triangle $\int_{11}^{12} \bigl((40-2q)-(4+q)\bigr)\, \dd q = \int_{11}^{12} (36-3q)\, \dd q = \bigl[36q - 3q^2/2\bigr]_{11}^{12} = (432-216) - (396 - 181.5) = 216 - 214.5 = 1.5$. For a linear market the triangle has area $\tfrac12 \times t \times \Delta q = \tfrac12 \times 3 \times 1 = 1.5$.
:::
:::

::: widget plot
f: 40 - 2*x; 4 + x
x: 0, 20
y: 0, 42
between: true
shade: 0, 12
labels: \text{inverse demand}; \text{inverse supply}
caption: The shaded band between inverse demand and inverse supply from $q = 0$ to $q = 12$ is total surplus, $216$, in [[#ex-surplus]]. Consumer surplus is the part above $p = 16$; producer surplus is the part below. A tax that cuts quantity to 11 punches a triangle of area $1.5$ out of the right-hand end.
:::

::: warning Surplus is not utility, and not cash in a drawer
Consumer surplus is an area, in units of money, under a demand curve. It is not the consumer's utility (which is defined only up to increasing transformation) and it is not a sum of money the consumer holds. Using $CS$ to compare two policies is valid when demand is quasilinear, or as a local approximation when income effects are small. For a large change in the price of a good that takes a substantial share of the budget — housing, food in a low-income household — use compensating variation.
:::

Isoelastic demand $P(q) = A^{1/\eta} q^{-1/\eta}$ has a choke price of $+\infty$ when $\eta > 0$, so the integral for $CS$ from $0$ diverges if $\eta \le 1$. One then computes surplus from a positive $q_{\min}$, or works with a truncated demand. Linear demand has no such problem because willingness to pay is bounded.

## Present value of a stream

A unit of money today can be lent at a continuously compounded instantaneous rate $r > 0$, becoming $e^{rt}$ at date $t$. Equivalently, a unit of money at date $t$ is worth $e^{-rt}$ today. That discount factor converts a **flow** of income into a **stock**: a present value.

::: definition Present value of a continuous stream {#def-pv}
Let $y(t)$ be an income flow at date $t$, in units of money per unit of time, and let $r > 0$ be a constant instantaneous discount rate. The **present value** of the stream from $0$ to $T$ is

$$
PV = \int_0^T y(t)\, e^{-rt}\, \dd t.
$$ {#eq-pv}

A stream that lasts forever has $T = \infty$, provided the improper integral converges. If $y(t) \equiv y$ is constant, then $PV = \dfrac{y}{r}\bigl(1 - e^{-rT}\bigr)$, and the **perpetuity** formula $PV = y/r$ is the limit as $T \to \infty$.
:::
::: proof Perpetuity and finite horizon
$\int_0^T y e^{-rt}\, \dd t = y \bigl[-e^{-rt}/r\bigr]_0^T = (y/r)\bigl(1 - e^{-rT}\bigr)$. As $T \to \infty$, $e^{-rT} \to 0$, so the present value tends to $y/r$.
:::

The discrete analogue, with annual rate $i$ and payments $y$ at the end of each year, is $PV = \sum_{t=1}^T y/(1+i)^t = y \bigl(1 - (1+i)^{-T}\bigr)/i$, and $y/i$ for a perpetuity. Continuous and discrete formulae agree to first order in $r$ (or $i$) when the period is short. None of these formulae is a forecast of a market price; they convert a *hypothetical* stream and a *given* discount rate into a present value, which is an accounting identity once $y$ and $r$ are chosen.

::: example A ten-year stream and a perpetuity {#ex-pv}
A project throws off a continuous flow of 100 units of money a year. The discount rate is $r = 0.05$. What is the present value of the first ten years? Of a perpetual flow at that rate?
::: solution
$PV_{10} = \dfrac{100}{0.05}\bigl(1 - e^{-0.5}\bigr) = 2000\bigl(1 - e^{-0.5}\bigr)$. Since $e^{0.5} \approx 1.64872$, $e^{-0.5} \approx 0.60653$ and $PV_{10} \approx 2000 \times 0.39347 = 786.94$. The perpetuity is $100/0.05 = 2000$. Ten years already capture about 39 per cent of the perpetual value at 5 per cent; the remaining 61 per cent sits in the tail after year 10. At a higher discount rate the tail is worth less: at $r = 0.10$, $e^{-1} \approx 0.3679$ and ten years capture 63 per cent of the perpetuity $100/0.10 = 1000$.
:::
:::

::: widget riemann
f: 100*exp(-0.05*x)
a: 0
b: 10
n: 10
method: mid
x: 0, 12
y: 0, 110
caption: The present value $\int_0^{10} 100 e^{-0.05 t}\, \dd t$ as a Riemann sum. Each rectangle is a slice of discounted income. Raise $n$ to approach $2000(1-e^{-0.5}) \approx 786.94$. The height of the integrand at $t = 0$ is 100; at $t = 10$ it has fallen to $100 e^{-0.5} \approx 60.7$.
:::

::: remark Discount rates are parameters, not recommendations
The calculation treats $r$ as given. In a model, $r$ may be an interest rate, a household's rate of time preference, or a social discount rate chosen for a cost–benefit exercise. Different choices of $r$ produce different present values, sometimes dramatically so for distant payoffs (climate damages are the notorious case). This chapter does not choose $r$ for you. For education only — not investment or financial advice.
:::

A growing stream $y(t) = y_0 e^{gt}$ with $g < r$ has present value $y_0 / (r-g)$ as a perpetuity: replace $r$ by $r-g$ in the constant-flow formula. If $g \ge r$ the improper integral diverges — a growing flow, discounted too weakly, has infinite present value, which is a sign that the model (or the horizon) needs more structure, not a reason to believe in infinite wealth.

## Average values and other economic integrals

The **average value** of a function $f$ on $[a,b]$ is $\dfrac{1}{b-a} \int_a^b f(x)\, \dd x$. Average cost over a production run from $0$ to $q$ is not $C(q)/q$ — that is average cost at the *scale* $q$ — but one can still ask for the average of $MC$ over an interval, which by the fundamental theorem is just the change in $C$ divided by the length of the interval.

Probability densities are non-negative functions that integrate to one; expected values are integrals against those densities. That is the subject of the [Maths Atlas probability course](/a/maths/course.php?c=probability), and of expected-utility theory in [[microeconomics/uncertainty]]. A Lorenz curve is an integral of an income distribution; the Gini coefficient is twice the area between that curve and the diagonal ([[labour-economics/wage-inequality]]).

::: example Average of a growing quantity {#ex-average}
A firm's output is $q(t) = 10 e^{0.02 t}$ over a five-year period. What is its average output over those five years?
::: solution
$\dfrac{1}{5} \int_0^5 10 e^{0.02 t}\, \dd t = 2 \cdot \dfrac{1}{0.02} \bigl(e^{0.1} - 1\bigr) = 100\bigl(e^{0.1}-1\bigr)$. Since $e^{0.1} \approx 1.10517$, the average is about $10.517$. That is slightly more than the midpoint of the path, $q(0) = 10$ and $q(5) \approx 11.05$, because the exponential is convex.
:::
:::

::: quiz
A market has inverse demand $p = 30 - q$ and inverse supply $p = 6 + q$. Consumer surplus at the unconstrained equilibrium is
- [ ] $36$
- [x] $72$
- [ ] $144$
- [ ] $216$
::: solution
$30 - q = 6 + q$ gives $q^* = 12$ and $p^* = 18$. Consumer surplus is the triangle of base $12$ and height $30-18 = 12$, so area $\tfrac12 \times 12 \times 12 = 72$. Producer surplus is also $72$, by symmetry of this pair of curves; total surplus is $144$.
:::
:::

A present-value calculation is only as good as the stream and the rate that go into it. If the flow is a contractual coupon, the formula is an identity once $r$ is chosen. If the flow is an uncertain profit, neither $y(t)$ nor $r$ is known, and the integral is a *model*, not a price. The same warning applies to surplus: $CS$ is exact for a quasilinear demand curve that we have written down, and an approximation — sometimes a poor one — for a household whose income effects are large.

A second integral identity is used constantly in growth and in finance. Differentiating under the integral sign, $\dfrac{\dd}{\dd r} \int_0^\infty y e^{-rt}\, \dd t = -\int_0^\infty t y e^{-rt}\, \dd t$, so the sensitivity of a perpetuity to the discount rate is minus the present-value-weighted duration of the stream. For $y$ constant that duration is $1/r$, and $d(y/r)/dr = -y/r^2$, matching. Duration and convexity of bonds, treated in [[asset-pricing/fixed-income]], are this derivative and the second derivative of [[#eq-pv]].

## Where this leads

Surplus calculations reappear whenever a tax, a quota, a tariff or a monopoly is compared with a competitive benchmark ([[microeconomics/competitive-markets]], [[public-economics/tax-incidence]], [[international-trade/tariffs-and-quotas]]). Present values are the language of [[corporate-finance/capital-budgeting]], of sovereign-debt arithmetic, and of the Hamiltonian in [[mathematical-economics/dynamic-optimisation]]. The next chapter replaces one integral, or one equation, with many: linear systems and the Leontief inverse.

One more reading of the integral is as an **accumulation of a flow**. If $I(t)$ is investment at date $t$ and capital depreciates at rate $\delta$, then $K(T) = K(0) e^{-\delta T} + \int_0^T e^{-\delta(T-t)} I(t)\, \dd t$: today's capital is yesterday's capital, decayed, plus every past investment, decayed from the date it was installed. That is the capital-accumulation identity of growth theory, and it is the same convolution that appears when a linear differential equation is solved by an integrating factor. The present-value integral [[#eq-pv]] is the same formula with the sign of time reversed: future flows discounted back, rather than past flows decayed forward.

Definite integrals also convert densities into totals. If $f(w)$ is the density of a wage distribution, the fraction of workers earning less than $w$ is $F(w) = \int_{-\infty}^w f$, the share of the wage bill they receive is a different integral, and the Lorenz curve plots one cumulative against the other. The Gini coefficient is twice the area between that curve and the diagonal. Nothing in the construction is specific to wages: the same integrals describe land holdings, firm size, and the distribution of cities. What changes is the density $f$, which is an empirical object, not a theorem.

::: history
**1844, Jules Dupuit.** In *De la mesure de l'utilité des travaux publics*, Dupuit argued that the benefit of a bridge or a road is the area under the demand curve, not the toll revenue, and drew the triangle that Marshall later named consumer surplus.

**1890, Alfred Marshall.** *Principles of Economics* named consumer surplus and used it to discuss taxes and railways, with the explicit caveat that the measuring rod of money is reliable only when the marginal utility of money is roughly constant.

**1937, John Hicks.** *Théorie mathématique de la valeur* and then *Value and Capital* (1939) distinguished compensating and equivalent variation from Marshallian surplus, putting the money metric of welfare on a choice-theoretic footing.
:::

::: summary
- An **antiderivative** of $f$ is a function $F$ with $F' = f$. The **fundamental theorem** says $\int_a^b f = F(b)-F(a)$, so the integral of marginal cost is variable cost.
- **Consumer surplus** is the area between inverse demand and the price line; **producer surplus** is the area between the price line and inverse supply. A wedge that cuts quantity creates a **deadweight-loss** triangle.
- The **present value** of a flow $y(t)$ is $\int_0^T y(t) e^{-rt}\, \dd t$. A constant perpetuity is worth $y/r$; a growing one, $y_0/(r-g)$ if $g < r$.
- Surplus is a valid money metric under quasilinear utility (or as a local approximation). Present-value formulae convert a hypothetical stream at a given $r$; they are not forecasts.
:::

## Exercises

::: exercise An antiderivative {level=1}
Find an antiderivative of $MC(q) = 8 + 4q - 0.03 q^2$. If $C(0) = 40$, what is $C(10)$?
::: solution
$C(q) = 40 + 8q + 2q^2 - 0.01 q^3$. At $q = 10$, $C = 40 + 80 + 200 - 10 = 310$.
:::
:::

::: exercise A triangular surplus {level=1 check="50"}
Inverse demand is $p = 20 - q$ and the price is $p^* = 10$. Compute consumer surplus. (Enter $CS$.)
::: solution
$q^* = 10$. $CS = \int_0^{10} (20-q-10)\, \dd q = \int_0^{10} (10-q)\, \dd q = \bigl[10q - q^2/2\bigr]_0^{10} = 100 - 50 = 50$. The triangle has base 10 and height 10, so area $\tfrac12 \times 10 \times 10 = 50$.
:::
:::

::: exercise A perpetuity {level=1}
What is the present value of a perpetual continuous flow of 80 units of money a year at $r = 0.04$? At $r = 0.08$?
::: solution
$80/0.04 = 2000$ and $80/0.08 = 1000$. Doubling the discount rate halves the perpetuity's value.
:::
:::

::: exercise Producer surplus {level=2}
Inverse supply is $p = 2 + 0.5 q$ and the market price is $12$. Find $q^*$ and producer surplus.
::: solution
$12 = 2 + 0.5 q$ gives $q^* = 20$. $PS = \int_0^{20} (12 - 2 - 0.5q)\, \dd q = \int_0^{20} (10 - 0.5q)\, \dd q = \bigl[10q - 0.25 q^2\bigr]_0^{20} = 200 - 100 = 100$. The triangle has base 20 and height 10.
:::
:::

::: exercise Finite-horizon present value {level=2}
A continuous flow of 60 units a year lasts $T = 20$ years. At $r = 0.05$, what is its present value? What fraction of the corresponding perpetuity is that?
::: solution
$PV = (60/0.05)(1-e^{-1}) = 1200(1-e^{-1})$. Since $e^{-1} \approx 0.367879$, $PV \approx 1200 \times 0.632121 = 758.55$. The perpetuity is $1200$, so the fraction is $1-e^{-1} \approx 0.632$.
:::
:::

::: exercise Deadweight loss of a ceiling {level=2}
In the market of [[#ex-surplus]], a price ceiling is set at $p = 10$. Quantity traded is the amount suppliers will offer at that price. Compute that quantity, the new $CS$ and $PS$, and the deadweight loss relative to the unconstrained surplus of 216.
::: solution
Inverse supply $p = 4 + q$ equals 10 at $q = 6$. Demand price at $q = 6$ is $40-12 = 28$, so there is rationing. $PS = \int_0^6 (10-4-q)\, \dd q = \int_0^6 (6-q)\, \dd q = 36 - 18 = 18$. Consumer surplus is the area under demand down to $q = 6$, down to the ceiling, plus — if the units go to the buyers with the highest willingness to pay — the rectangle between 10 and 28 is not all CS because those buyers pay 10: $CS = \int_0^6 (40-2q-10)\, \dd q = \int_0^6 (30-2q)\, \dd q = 180 - 36 = 144$. Total surplus is $144+18 = 162$, so DWL $= 216-162 = 54$. Directly, $\int_6^{12} (36-3q)\, \dd q = \bigl[36q - 3q^2/2\bigr]_6^{12} = (432-216) - (216-54) = 216 - 162 = 54$. This calculation assumes efficient rationing (highest-value buyers are served). If rationing is random, $CS$ is smaller and DWL is larger.
:::
:::

::: exercise Growing perpetuity {level=3}
A flow starts at $y_0 = 40$ and grows continuously at rate $g = 0.02$. The discount rate is $r = 0.06$. Find the present value of the perpetual stream, and the present value of the first 30 years only.
::: hint
$\int_0^T e^{-(r-g)t}\, \dd t = \bigl(1 - e^{-(r-g)T}\bigr)/(r-g)$.
:::
::: solution
$PV_\infty = y_0/(r-g) = 40/0.04 = 1000$. The finite-horizon value is $40 \int_0^{30} e^{-0.04 t}\, \dd t = 40 \cdot (1-e^{-1.2})/0.04 = 1000\bigl(1-e^{-1.2}\bigr)$. Since $e^{1.2} \approx 3.32012$, $e^{-1.2} \approx 0.30119$ and $PV_{30} \approx 698.81$.
:::
:::

::: exercise Isoelastic surplus {level=3}
Inverse demand is $p = 36 q^{-1/2}$ (so $q = 1296 / p^2$) and the price is $p^* = 4$. (a) Find $q^*$. (b) Compute $CS = \int_0^{q^*} \bigl(P(q) - p^*\bigr)\, \dd q$. Does the integral converge at $0$? Also compute the truncated surplus from $q_0 = 1$ to $q^*$.
::: hint
$P(q) - 4$ behaves like $36 q^{-1/2}$ near $0$. The improper integral $\int_0^1 q^{-s}\, \dd q$ converges when $s < 1$.
:::
::: solution
(a) $4 = 36 / \sqrt{q}$ gives $\sqrt{q} = 9$, so $q^* = 81$. (b) $\int_0^{81} (36 q^{-1/2} - 4)\, \dd q = \bigl[72 q^{1/2} - 4q\bigr]_0^{81} = (72 \cdot 9 - 324) - 0 = 324$. The integral converges at $0$ because the exponent $-1/2$ is greater than $-1$. (For unit-elastic inverse demand $A/q$, $\int_0 q^{-1}\, \dd q$ diverges; that is the borderline.) From $q_0 = 1$, $\bigl[72\sqrt{q} - 4q\bigr]_1^{81} = 324 - (72 - 4) = 256$.
:::
:::
