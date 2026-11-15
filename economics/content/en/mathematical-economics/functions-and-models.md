A city is considering a fare of 2 units of money for its buses. At that fare, about 40 thousand rides a day are taken. If the fare were 3, ridership would fall; if it were 1, buses would be packed. The operator's cost depends on how many buses it runs, and the number of buses it is willing to run depends on the fare. When is this market in balance? How would a subsidy, or a rise in fuel prices, change the picture?

The questions are economic. The language in which modern economics answers them is mathematical: we write ridership as a **function** of the fare, cost as a function of output, and **equilibrium** as the point at which two functions agree. This chapter is about that translation. It introduces the functions economists actually use — linear, power, exponential and logarithmic — and the idea of an equilibrium as a solution of an equation. Full treatments of sets, functions and graphs live in the [Maths Atlas](/a/maths/lesson.php?c=calculus-1&l=real-functions); what we need here is the economic reading of those objects.

Throughout the course, numbers in worked examples are illustrative. They are not forecasts, and they are not advice about fares, output or investment.

## Variables, parameters and functions

An economic model is a collection of relationships among quantities. Some of those quantities are chosen inside the model (price and quantity in a market, consumption in a household problem); they are **endogenous**. Others are taken as given (a tax rate, a world price, a technological constant); they are **exogenous**, or **parameters**. The same symbol can play either role depending on the question: the wage is a parameter for a single competitive firm and an endogenous variable in a labour-market model.

::: definition Function {#def-function}
A **function** $f$ from a set $D$ to a set $C$ assigns to each $x \in D$ exactly one value $f(x) \in C$. We write $f\colon D\to C$. The set $D$ is the **domain**; $C$ is the **codomain**; the set of values that $f$ actually takes is the **range** (or image). In economics $D$ and $C$ are almost always intervals of real numbers, often restricted to the non-negative orthant because prices and quantities cannot be negative.
:::

We write $q = D(p)$ for a demand function, $C = C(q)$ for a cost function, $Y = F(K, L)$ for a production function. The notation $y = f(x)$ names the output, the rule and the input; once the rule is fixed we may speak of "the function $f$" or "the function $f(x)$" without confusion. What must stay distinct is the **variable** $x$, which we imagine changing, and any **parameter** that sits in the formula and is held fixed while we study that change.

::: example A linear demand function {#ex-linear-demand}
A café's daily demand for cups of coffee is $q = 120 - 4p$, for prices $p$ in units of money per cup at which $q \ge 0$. (a) What is the domain of economically relevant prices? (b) How many cups are demanded at $p = 20$? (c) What is total revenue at that price?
::: solution
(a) Demand is non-negative when $120 - 4p \ge 0$, so $p \le 30$. Together with $p \ge 0$ the relevant domain is $0 \le p \le 30$. (b) At $p = 20$, $q = 120 - 80 = 40$ cups. (c) Revenue is $R = p\,q = 20 \times 40 = 800$ units of money. We will meet the revenue function $R(p) = p\,(120-4p) = 120p - 4p^2$ again as soon as we have derivatives.
:::
:::

A function is not a formula. The formula $q = 120 - 4p$ is one representation of a demand relationship; a table of observed price–quantity pairs, a graph, or a verbal rule ("quantity demanded falls by four cups for every extra unit of money on the price") can define the same function. What the definition requires is uniqueness: at a given price there is one quantity demanded. If two different quantities were demanded at the same price, $D$ would not be a function.

::: remark Independent and dependent variables
It is conventional to put the **independent** variable on the horizontal axis and the **dependent** variable on the vertical axis. Marshall, and almost every supply-and-demand diagram since, did the opposite: quantity on the horizontal axis, price on the vertical. The curves in those diagrams are therefore **inverse** demand and **inverse** supply — $p$ as a function of $q$. The economics is the same; only the name of the function changes. We will be explicit whenever we switch.
:::

## Linear functions and market equilibrium

The simplest useful specification is a **linear function**

$$
y = a + b x,
$$

with intercept $a$ and slope $b$. In a demand equation $b$ is negative (the law of demand, holding other things equal); in a supply equation $b$ is positive. Linearity is a local approximation as well as a global assumption: even if the "true" demand curve is bent, a linear formula can be a serviceable description near a particular price.

Write inverse demand and inverse supply as

$$
p = a - b q, \qquad p = c + d q,
$$ {#eq-linear-ds}

with $a > c \ge 0$ and $b, d > 0$. The first says that consumers' willingness to pay starts at $a$ and falls by $b$ for each extra unit; the second says that the lowest price at which firms will produce starts at $c$ and rises by $d$ for each extra unit.

::: definition Market equilibrium {#def-equilibrium}
A **market equilibrium** of [[#eq-linear-ds]] is a pair $(q^*, p^*)$ such that the inverse-demand price at $q^*$ equals the inverse-supply price at $q^*$:

$$
a - b q^* = c + d q^*.
$$

Equivalently, quantity demanded at $p^*$ equals quantity supplied at $p^*$. At that pair the market **clears**: every unit that is produced is sold, and every buyer who is willing to pay $p^*$ is served.
:::

Solving the displayed equation,

$$
q^* = \frac{a-c}{b+d}, \qquad p^* = \frac{ad + bc}{b+d}.
$$ {#eq-linear-eq}

::: proposition Unique linear equilibrium {#prop-linear-eq}
If $a > c$ and $b, d > 0$, the linear market [[#eq-linear-ds]] has a unique equilibrium, given by [[#eq-linear-eq]]. Both $q^*$ and $p^*$ are positive. If $a \le c$, the only candidate with non-negative quantity is $q^* = 0$: willingness to pay never exceeds marginal cost, and the market is inactive.
:::
::: proof
The equation $(a-c) = (b+d)q$ has a unique real solution because $b+d > 0$. That solution is positive precisely when $a > c$. Substituting into either curve gives $p^*$; the two expressions $a - b q^*$ and $c + d q^*$ agree by construction, and a short rearrangement produces the formula in [[#eq-linear-eq]]. Uniqueness of $q^*$ gives uniqueness of $p^*$. If $a \le c$ then $a - bq \le c + dq$ for every $q \ge 0$, with equality only at $q = 0$ when $a = c$.
:::

The proof is one line of algebra. The economics in it is the classification: a linear market either has a unique interior equilibrium or it has no trade. There is no third possibility — no pair of equilibria, no interval of prices that all clear the market. That sharpness is a gift of linearity, and it disappears as soon as the curves can bend enough to cross twice. (They can: think of a forward-falling supply curve in a labour market with a strong income effect, or of a Giffen demand curve. Those cases need the tools of [[mathematical-economics/functions-of-several-variables]] and [[microeconomics/slutsky-and-welfare]].)

::: example A linear market {#ex-linear-market}
Inverse demand is $p = 40 - 2q$ and inverse supply is $p = 4 + q$, with $q$ measured in thousands of units. Find the equilibrium. What happens to $q^*$ and $p^*$ if a per-unit tax of $t = 3$ is levied on sellers, so that the inverse-supply curve becomes $p = 4 + t + q$?
::: solution
Without the tax, $40 - 2q = 4 + q$ gives $36 = 3q$, so $q^* = 12$ and $p^* = 4 + 12 = 16$. With the tax, $40 - 2q = 7 + q$ gives $33 = 3q$, so $q^{**} = 11$ and the price buyers pay is $p_b = 7 + 11 = 18$. Sellers receive $p_b - 3 = 15$. Quantity falls by 1, the buyer price rises by 2 and the seller price falls by 1: two-thirds of the tax is paid by buyers in this example, one-third by sellers. The split is the ratio of slopes, $b : d = 2 : 1$, a fact we will derive properly with elasticities in the next chapter.
:::
:::

::: widget plot
f: a - b*x; c + d*x
x: 0, 24
y: 0, 44
sliders: a=40:24:48:1; b=2:0.5:4:0.1; c=4:0:12:0.5; d=1:0.2:3:0.1
labels: \text{inverse demand}; \text{inverse supply}
caption: Quantity on the horizontal axis, price on the vertical — Marshall's convention. Drag $a$ (the demand intercept) up: both equilibrium price and quantity rise. Drag $c$ (the supply intercept) up, as a tax on sellers would: price paid by buyers rises, quantity falls. Steepen demand (raise $b$): a given supply shift then moves price more and quantity less.
:::

::: intuition Why write a model
A diagram can show one equilibrium. A model shows how the equilibrium depends on parameters. The formulae in [[#eq-linear-eq]] are already a comparative-static result: $\partial q^*/\partial a = 1/(b+d) > 0$, so a parallel upward shift of demand raises quantity. Once the model is written, that conclusion is a derivative, not a guess. The rest of the course is the same move, applied to richer models.
:::

::: quiz
In the linear market $p = a - bq$, $p = c + dq$ with $a > c$ and $b,d > 0$, a parallel upward shift of demand (an increase in $a$)
- [ ] raises the equilibrium price and lowers the equilibrium quantity
- [x] raises both the equilibrium price and the equilibrium quantity
- [ ] lowers both
- [ ] has an ambiguous effect on quantity, depending on $b$ and $d$
::: solution
From [[#eq-linear-eq]], $q^* = (a-c)/(b+d)$ and $p^* = (ad+bc)/(b+d)$. Both increase in $a$. Graphically, the demand curve shifts up and the intersection slides up the supply curve.
:::
:::

## Power functions

Many of the curves that economists draw are not linear. A **power function** has the form $y = A x^k$ with $A > 0$. The exponent $k$ is the object of interest.

- $k = 1$: a ray through the origin (constant average and marginal values).
- $0 < k < 1$: increasing and concave; the standard shape for a production function of one input, and for a utility function of one good, when extra units are valuable but less so than the units already had.
- $k > 1$: increasing and convex; total cost often looks like this once capacity is strained.
- $k < 0$: decreasing; the natural shape for a demand curve that never hits the axes, and for average cost that falls with scale.

The family $q = A p^{-\varepsilon}$ with $\varepsilon > 0$ is **isoelastic demand**: as we will prove in the next chapter, the price elasticity of demand is the constant $-\varepsilon$ at every price. It is the demand curve of choice when one wants elasticities, not slopes, to be the primitive.

::: example Isoelastic demand and revenue {#ex-isoelastic}
Demand is $q = 80\, p^{-1.5}$. (a) How many units are demanded at $p = 4$? (b) What happens to revenue $R = p q$ as $p$ changes?
::: solution
(a) $q = 80 \times 4^{-1.5} = 80 / 8 = 10$. (b) $R = p \cdot 80 p^{-1.5} = 80 p^{-0.5}$, which is *decreasing* in $p$. Raising the price from 4 to 9, for instance, cuts quantity from 10 to $80/27 \approx 2.96$ and cuts revenue from 40 to $80/3 \approx 26.67$. For this demand curve, quantity falls more than in proportion to the price rise, so revenue falls. That is the content of "elastic demand", made precise in [[mathematical-economics/derivatives-and-elasticities]].
:::
:::

The workhorse production function of applied economics is **Cobb–Douglas**

$$
F(K, L) = A K^{\alpha} L^{\beta}, \qquad A > 0,\; \alpha > 0,\; \beta > 0,
$$ {#eq-cd}

named for Charles Cobb and Paul Douglas's 1928 study of US manufacturing. (Cobb was the mathematician; Douglas assembled the series of capital, labour and output.) The exponents have two readings, developed in [[mathematical-economics/functions-of-several-variables]]: $\alpha$ is the elasticity of output with respect to capital, and $\alpha+\beta$ is the **degree of homogeneity**, which classifies returns to scale.

::: example A Cobb–Douglas number {#ex-cobb-douglas}
Take $F(K,L) = K^{0.3} L^{0.7}$. Compute output at $(K,L) = (8, 27)$. If both inputs are doubled, what happens to output?
::: solution
$F(8,27) = 8^{0.3}\, 27^{0.7} = (2^3)^{0.3}\,(3^3)^{0.7} = 2^{0.9}\, 3^{2.1} \approx 1.866 \times 10.045 \approx 18.74$. Doubling both inputs gives $F(16,54) = 16^{0.3}\, 54^{0.7} = (2\times 8)^{0.3}\,(2\times 27)^{0.7} = 2^{0.3+0.7} F(8,27) = 2 F(8,27)$. Output doubles: the function is homogeneous of degree $\alpha+\beta = 1$, **constant returns to scale**. That is a theorem, not a coincidence, and we prove it as Euler's theorem in [[mathematical-economics/functions-of-several-variables]].
:::
:::

Cobb–Douglas is special — unitary elasticity of substitution, log-linear, easy to estimate — and it is used as much because it is tractable as because it is true. Other functional forms (CES, translog, quasilinear, Stone–Geary) exist because applied work needs flexibility that [[#eq-cd]] does not have. The course will introduce them when a model requires them.

## Exponential and logarithmic functions

A quantity that grows, or decays, at a *proportional* rate leads to an **exponential function**. If a bank balance $B$ earns a continuously compounded instantaneous rate $r$, then

$$
B(t) = B_0 e^{rt}.
$$ {#eq-exp}

The same formula describes a population growing at rate $r$, a price level inflating at rate $r$, and — with $r$ negative — radioactive decay or depreciation of a capital stock. The number $e \approx 2.71828$ is the unique base for which the derivative of $e^{x}$ is $e^{x}$ itself; that is why continuous compounding, and almost every growth model in [[mathematical-economics/difference-and-differential-equations]], is written in base $e$. Discrete compounding at annual rate $i$, $n$ times a year, gives $B_0(1 + i/n)^{nt}$, which tends to [[#eq-exp]] with $r = i$ as $n \to \infty$. (The limit is proved as a standard exercise on sequences in the [Maths Atlas](/a/maths/lesson.php?c=calculus-2&l=sequences).)

The inverse of the exponential is the **natural logarithm** $\ln$, defined by $\ln(e^x) = x$ and $e^{\ln x} = x$ for $x > 0$. Logarithms convert products to sums, $\ln(xy) = \ln x + \ln y$, and convert exponents to products, $\ln(x^k) = k \ln x$. Both identities are used constantly: a Cobb–Douglas production function is linear in logarithms, $\ln F = \ln A + \alpha \ln K + \beta \ln L$, which is why it is the first specification in an empirical growth-accounting exercise; and the derivative of $\ln y(t)$ is the instantaneous proportional growth rate of $y$, a fact the next chapter rests on.

::: example Continuous compounding {#ex-compound}
A deposit of 1 000 units of money is left for 10 years at an instantaneous rate $r = 0.05$. What is the balance at $t = 10$? How long does the deposit take to double?
::: solution
$B(10) = 1000\, e^{0.05 \times 10} = 1000\, e^{0.5} \approx 1000 \times 1.64872 = 1648.72$. Doubling means $e^{rt} = 2$, so $t = \ln 2 / r \approx 0.693/0.05 = 13.86$ years. The well-known "rule of 70" — doubling time in years $\approx 70 / (\text{percent rate})$ — is this calculation with $\ln 2 \approx 0.693$ rounded to $0.70$ and the rate quoted in per cent. These figures illustrate a formula; they are not a forecast of any actual return, and they are not a recommendation to hold any particular deposit.
:::
:::

::: widget sequence
a: 1000*(1+r)^n
N: 20
start: 0
sliders: r=0.05:0.01:0.12:0.01
y: 900, 4000
caption: A deposit of 1 000 growing at annual rate $r$, compounded once a year: the $n$th term is $1000(1+r)^n$. Raise $r$ and the path steepens. Continuous compounding at the same $r$ would sit slightly above this path, at $1000 e^{rt}$.
:::

Logarithms also measure **orders of magnitude**. World GDP in 2020 was on the order of $10^{14}$ US dollars at market exchange rates (World Bank WDI, accessed 2026); a logarithmic scale is the only honest way to put China, Nigeria and Luxembourg on the same chart. In empirical work one almost always runs regressions in logs, so that coefficients are elasticities. Probability and the statistics of those regressions are taught in the [Maths Atlas](/a/maths/lesson.php?c=statistics&l=regression) and in [[econometrics/simple-regression]].

## Inverse functions

A function $f$ is **invertible** if each value in its range comes from exactly one input: $f(x_1) = f(x_2)$ implies $x_1 = x_2$. The **inverse function** $f^{-1}$ then satisfies $f^{-1}(f(x)) = x$ and $f(f^{-1}(y)) = y$. Strictly monotone continuous functions on an interval are invertible; that is the theorem we use.

Demand $q = D(p)$ with $D$ strictly decreasing has an inverse $p = P(q) = D^{-1}(q)$, the **inverse demand** (or willingness-to-pay) function. Supply similarly. Marshall's diagram plots $P(q)$ and the inverse supply; a textbook that writes $q = a - bp$ is using the direct demand. Converting between them is mechanical for linear and power functions and a numerical problem otherwise.

::: example Inverting a linear demand {#ex-inverse}
Invert $q = 120 - 4p$ to obtain inverse demand, and invert $q = 80 p^{-1.5}$ to obtain inverse demand in the isoelastic case.
::: solution
From $q = 120 - 4p$ we get $4p = 120 - q$, so $p = 30 - q/4$, on $0 \le q \le 120$. From $q = 80 p^{-3/2}$ we get $p^{-3/2} = q/80$, so $p = (80/q)^{2/3}$. At $q = 10$ this returns $p = 8^{2/3} = 4$, matching [[#ex-isoelastic]].
:::
:::

::: warning Demand is not inverse demand
Writing $q = 10 - p$ and then plotting that formula with $q$ on the horizontal axis produces the wrong picture: the intercepts swap and the slope is the reciprocal of what the diagram needs. Decide first whether the formula is $q$ as a function of $p$ or $p$ as a function of $q$, and plot accordingly. In this atlas, widgets that show Marshallian diagrams are always fed *inverse* demand and inverse supply, with $x$ equal to quantity.
:::

The inverse of $y = e^{x}$ is $x = \ln y$; the inverse of $y = \ln x$ is $x = e^{y}$. The inverse of a linear function $y = a + bx$ with $b \neq 0$ is $x = (y-a)/b$. Not every function that arises in economics is invertible on its whole domain: a Laffer curve relating tax revenue to the tax rate typically rises and then falls, so two rates can yield the same revenue and no global inverse exists. One can still invert locally, on an interval where the function is strictly monotone — a first glimpse of the implicit function theorem of [[mathematical-economics/comparative-statics]].

## Equilibrium as the solution of an equation

Linear markets can be solved by hand. Nonlinear ones generally cannot. An equilibrium is still "a number $q$ at which demand price equals supply price", but finding that number is a numerical problem.

::: definition Equilibrium of a market {#def-eq-general}
Given (inverse) demand $P_d(q)$ and (inverse) supply $P_s(q)$, an **equilibrium quantity** is a root of

$$
g(q) := P_d(q) - P_s(q) = 0.
$$

An **equilibrium price** is then $p^* = P_d(q^*) = P_s(q^*)$. In terms of direct demand and supply the same equilibrium is a root of $D(p) - S(p) = 0$.
:::

For strictly decreasing $P_d$ and strictly increasing $P_s$ with $P_d(0) > P_s(0)$ and the two curves eventually crossing, a unique positive root exists by the intermediate value theorem ([Maths Atlas](/a/maths/lesson.php?c=calculus-1&l=continuity)). Existence and uniqueness are separate questions as soon as either curve can bend backwards.

::: example A nonlinear market {#ex-nonlinear}
Direct demand is $q = 100/p$ (so inverse demand is $p = 100/q$) and supply is $q = 2p$. Find the equilibrium.
::: solution
Equating quantities, $100/p = 2p$, so $p^2 = 50$ and $p^* = \sqrt{50} = 5\sqrt{2} \approx 7.071$ (the negative root is not a price). Then $q^* = 2p^* = 10\sqrt{2} \approx 14.142$. Equivalently, $100/q = q/2$ gives $q^2 = 200$ and the same $q^*$.
:::
:::

When a closed form is unavailable one uses a numerical solver. Newton's method, taught as a root-finding algorithm in the [Maths Atlas](/a/maths/lesson.php?c=numerical-analysis&l=root-finding), iterates $x_{n+1} = x_n - g(x_n)/g'(x_n)$. The same loop computes an internal rate of return in [[corporate-finance/capital-budgeting]] and a yield to maturity in [[asset-pricing/fixed-income]].

::: widget newton
f: 100/x - x/2
x0: 10
x: 4, 20
y: -8, 16
steps: 6
caption: Newton’s method solving $100/q - q/2 = 0$, the equilibrium of [[#ex-nonlinear]]. Starting at $q = 10$, the iterates lock onto $q^* = \sqrt{200} \approx 14.14$ in a few steps. Try a starting value below 5: the tangent can overshoot, a reminder that Newton is local.
:::

A macroeconomic equilibrium is the same object in more variables. Goods-market equilibrium in a closed Keynesian cross is the fixed point $Y = C(Y) + I + G$ of the expenditure function; labour-market equilibrium is a wage at which labour demand equals labour supply; a general equilibrium of an Arrow–Debreu economy is a price vector at which every market clears at once. The mathematics of those systems — existence by a fixed-point theorem, uniqueness under gross substitutes, computation by tatonnement or by a complementarity solver — is built on the one-dimensional picture of this section.

## Where this leads

Every later chapter of this course takes a function and does something to it. [[mathematical-economics/derivatives-and-elasticities]] differentiates, and reads the derivative as a marginal quantity or an elasticity. [[mathematical-economics/integration]] integrates, and reads the integral as surplus or present value. [[mathematical-economics/matrices-and-linear-models]] replaces one equation with many, as in a Leontief input–output table. [[mathematical-economics/functions-of-several-variables]] lets demand, utility and production depend on more than one argument. Optimisation chapters ask for the best point on a function; dynamics chapters ask how a function of time evolves.

The economic content sits in [[microeconomics]] and [[macroeconomics]], which *use* these tools rather than developing them. If a step of analysis, linear algebra or probability needs a full proof, follow the link to the Maths Atlas; this course will not repeat those proofs, but it will not skip the economic argument that needs them.

::: history
**1838, Antoine Augustin Cournot.** *Recherches sur les principes mathématiques de la théorie des richesses* is the first sustained use of functions to describe a market. Cournot wrote demand as $D = F(p)$, assumed $F$ decreasing and differentiable, and solved monopoly and duopoly as calculus problems. He drew the demand curve with price on the horizontal axis — the opposite of Marshall’s later convention.

**1890, Alfred Marshall.** *Principles of Economics* put quantity on the horizontal axis and popularised the crossing of a falling demand curve and a rising supply curve as the picture of equilibrium. Marshall treated the linear and isoelastic cases in footnotes and kept the main text verbal; the mathematics of this chapter is what those footnotes contain.
:::

::: summary
- A **function** assigns one output to each input in its domain. In a model, **endogenous** variables are determined inside the model; **parameters** are held fixed.
- Linear inverse demand $p = a - bq$ and inverse supply $p = c + dq$ have a unique equilibrium $q^* = (a-c)/(b+d)$ when $a > c$ and $b,d > 0$.
- **Power functions** $Ax^k$ give isoelastic demand and Cobb–Douglas production $A K^{\alpha} L^{\beta}$. The sum of exponents is the degree of homogeneity (returns to scale).
- **Exponential** growth $B_0 e^{rt}$ describes continuous compounding; the **natural logarithm** converts products to sums and levels to growth rates.
- Demand $q = D(p)$ and inverse demand $p = P(q)$ are inverses of each other. Marshallian diagrams plot the inverse.
- An **equilibrium** is a root of demand minus supply. Linear markets are solved by algebra; nonlinear markets by a closed form when one exists, otherwise numerically.
:::

## Exercises

::: exercise Domain of a demand function {level=1}
A cinema’s demand is $q = 200 - 8p$. For which prices is demand non-negative? How many seats are demanded at $p = 15$, and what is revenue at that price?
::: solution
$200 - 8p \ge 0$ gives $p \le 25$. With $p \ge 0$ the relevant domain is $0 \le p \le 25$. At $p = 15$, $q = 200 - 120 = 80$ and revenue is $15 \times 80 = 1200$.
:::
:::

::: exercise A linear market {level=1 check="20"}
Inverse demand is $p = 50 - q$ and inverse supply is $p = 5 + \tfrac12 q$. Find the equilibrium price. (Enter the equilibrium price.)
::: solution
$50 - q = 5 + \tfrac12 q$ gives $45 = \tfrac32 q$, so $q^* = 30$ and $p^* = 50 - 30 = 20$.
:::
:::

::: exercise Isoelastic arithmetic {level=1}
Demand is $q = 162\, p^{-2}$. Compute quantity and revenue at $p = 3$ and at $p = 9$. Does raising the price raise or lower revenue?
::: solution
At $p = 3$, $q = 162/9 = 18$ and $R = 54$. At $p = 9$, $q = 162/81 = 2$ and $R = 18$. Revenue falls. (In the next chapter we will see that this demand has elasticity $-2$, so it is elastic and revenue moves against the price.)
:::
:::

::: exercise Cobb–Douglas scaling {level=2}
Let $F(K,L) = 4 K^{1/2} L^{1/4}$. Compute $F(16, 81)$. Compute $F(64, 324)$ and compare with $F(16,81)$. What degree of homogeneity does the comparison suggest?
::: solution
$F(16,81) = 4 \cdot 16^{1/2} \cdot 81^{1/4} = 4 \cdot 4 \cdot 3 = 48$. Scaling both inputs by $t$ multiplies output by $t^{3/4}$, because $F(tK,tL) = 4 (tK)^{1/2}(tL)^{1/4} = t^{3/4} F(K,L)$. The second point is four times the first in each input, so $F(64,324) = 4^{3/4} \times 48$. Since $4^{3/4} = (2^2)^{3/4} = 2^{3/2} = 2\sqrt{2} \approx 2.8284$, we obtain $F(64,324) \approx 135.76$. Directly: $64^{1/2} = 8$ and $324^{1/4} = (18^2)^{1/4} = \sqrt{18} = 3\sqrt{2} \approx 4.2426$, and $4 \times 8 \times 3\sqrt{2} = 96\sqrt{2} \approx 135.76$. The function is homogeneous of degree $3/4$ (decreasing returns to scale).
:::
:::

::: exercise Inverting demand {level=2}
Find the inverse of $q = 90 - 3p$, and the inverse of $q = 16 p^{-1/2}$. At what price is quantity equal to 4 in each case?
::: solution
$q = 90 - 3p$ gives $p = 30 - q/3$. At $q = 4$, $p = 30 - 4/3 = 86/3 \approx 28.67$. For the isoelastic curve, $q = 16/\sqrt{p}$ gives $\sqrt{p} = 16/q$, so $p = 256/q^2$. At $q = 4$, $p = 256/16 = 16$.
:::
:::

::: exercise A tax in a linear market {level=2}
In [[#ex-linear-market]] the per-unit tax on sellers was $t = 3$. Repeat the calculation for a tax of $t = 6$. Compute the change in the buyer price and in the seller price relative to the no-tax equilibrium $(q,p) = (12, 16)$. What fraction of this larger tax do buyers pay?
::: solution
Inverse supply becomes $p = 10 + q$. Then $40 - 2q = 10 + q$ gives $30 = 3q$, so $q = 10$ and the buyer price is $20$. Sellers receive $14$. The buyer price has risen by 4 and the seller price has fallen by 2, out of a tax of 6: buyers still pay two-thirds. The fraction is $b/(b+d) = 2/3$, independent of $t$ in the linear model.
:::
:::

::: exercise Nonlinear equilibrium {level=3 check="6"}
Inverse demand is $p = 48/q$ and inverse supply is $p = q + 2$. Find the positive equilibrium quantity. (Enter the equilibrium quantity.)
::: solution
Set $48/q = q + 2$ and multiply through by $q$: $48 = q^2 + 2q$, so $q^2 + 2q - 48 = 0$. Factoring, $(q + 8)(q - 6) = 0$. The only positive root is $q^* = 6$, with $p^* = 8$.
:::
:::

::: exercise Existence without uniqueness {level=3}
Invent a pair of (inverse) demand and supply functions, both defined for $q \ge 0$, that have *two* distinct positive equilibria. Sketch the argument that they do, and say which of the hypotheses of [[#prop-linear-eq]] has been dropped.
::: hint
One of the curves must fail to be monotone.
:::
::: solution
Take a strictly decreasing inverse demand $P_d(q) = 12 - q$ and a U-shaped inverse supply $P_s(q) = (q-4)^2 + 1$, whose minimum is $1$ at $q = 4$. Setting $12 - q = (q-4)^2 + 1$ and writing $z = q - 4$ yields $z^2 + z - 7 = 0$, so $z = \frac{-1 \pm \sqrt{29}}{2}$. The two corresponding quantities are $q_1 = 4 + \frac{-1+\sqrt{29}}{2} \approx 6.193$ and $q_2 = 4 + \frac{-1-\sqrt{29}}{2} \approx 0.807$. Both are positive, and $P_d$ equals $P_s$ at each. The dropped hypothesis is that supply is increasing ($d > 0$ in the linear case). With a non-monotone supply curve, two crossings are possible. Whether such a supply curve is economically plausible — a backward-bending labour supply is the usual story — is a separate question; the mathematics only shows that uniqueness needs monotonicity.
:::
:::
