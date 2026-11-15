A firm sells at a price that depends on how much it puts on the market. Producing one more unit would add something to revenue and something to cost. Should it produce that unit? The answer is a comparison of two rates of change: **marginal revenue** and **marginal cost**. If the firm instead asks a different question — "if we cut the price by one per cent, by how many per cent does quantity demanded rise?" — the answer is an **elasticity**, a rate of change in proportional rather than absolute units.

Both objects are derivatives. This chapter treats the derivative as economists use it: as a marginal quantity, as an elasticity, and as a growth rate. The definition, the rules, and the mean value theorem are proved in the [Maths Atlas](/a/maths/lesson.php?c=calculus-1&l=derivatives); we take those results as given and spend our pages on the economic reading.

## The derivative as a marginal quantity

::: definition Derivative {#def-derivative}
Let $f$ be defined on an open interval containing $a$. The **derivative** of $f$ at $a$ is

$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h},
$$ {#eq-deriv}

when the limit exists. We also write $\dfrac{\dd f}{\dd x}(a)$. If $f'(a)$ exists for every $a$ in an interval, the function $a \mapsto f'(a)$ is the **derived function**, or simply "the derivative".
:::

The numerator $f(a+h) - f(a)$ is the change in $f$ when the input changes by $h$; dividing by $h$ gives the average rate of change. The derivative is the limit of that average as the step shrinks to zero — the **instantaneous** rate of change. In economics the step is often "one more unit of output" or "one more worker", and the derivative is then called a **marginal** quantity.

| function | derivative | name |
|---|---|---|
| $C(q)$, total cost | $C'(q)$ | marginal cost, $MC$ |
| $R(q)$, total revenue | $R'(q)$ | marginal revenue, $MR$ |
| $\pi(q) = R(q) - C(q)$, profit | $\pi'(q)$ | marginal profit |
| $F(L)$, output as a function of labour | $F'(L)$ | marginal product of labour, $MPL$ |
| $u(x)$, utility of one good | $u'(x)$ | marginal utility |

The units match the reading: if $C$ is in units of money and $q$ is in physical units, $C'(q)$ is in units of money per unit of output. That is exactly the extra cost of a small extra unit.

For a differentiable function the best linear approximation near $a$ is the **tangent line** $y = f(a) + f'(a)(x-a)$. Economists use this constantly: the extra cost of $\Delta q$ extra units is approximately $MC(q)\,\Delta q$, and the approximation is good when $\Delta q$ is small. The error is of order $(\Delta q)^2$ if $f$ is twice differentiable ([Taylor's theorem](/a/maths/lesson.php?c=calculus-2&l=taylor-series)).

::: example Cost, average cost and marginal cost {#ex-cost}
A firm's total cost is $C(q) = 100 + 6q + 0.1 q^2$ for $q \ge 0$. Compute marginal cost and average cost. Evaluate both at $q = 20$, and interpret the comparison.
::: solution
$C'(q) = 6 + 0.2 q$ and $AC(q) = C(q)/q = 100/q + 6 + 0.1 q$ for $q > 0$. At $q = 20$, $MC = 6 + 4 = 10$ and $AC = 5 + 6 + 2 = 13$. Marginal cost is below average cost, so the average is still falling: the next unit costs less than the current average, and producing it pulls the average down. (We prove the general relationship $MC \gtrless AC$ according as $AC$ is rising or falling in [[#prop-mc-ac]].)
:::
:::

::: widget plot
f: 100/x + 6 + 0.1*x; 6 + 0.2*x
x: 2, 40
y: 0, 40
tangent: 20
labels: \text{average cost}; \text{marginal cost}
caption: Average and marginal cost for $C(q) = 100 + 6q + 0.1 q^2$. The draggable tangent is attached to average cost. Slide it to the point where the two curves meet — that is the minimum of $AC$, near $q = \sqrt{1000} \approx 31.6$. To the left, $MC$ lies below $AC$ and $AC$ is falling; to the right the reverse.
:::

The rules of differentiation are the usual ones. If $f$ and $g$ are differentiable and $c$ is a constant, then $(cf)' = c f'$, $(f+g)' = f' + g'$, $(fg)' = f'g + fg'$, and $(f/g)' = (f'g - fg')/g^2$ wherever $g \neq 0$. The chain rule, $(f \circ g)'(x) = f'(g(x))\, g'(x)$, is the most used of all: it is how a tax that shifts a cost curve, or a price that depends on quantity, transmits itself through a model. Proofs are in the [Maths Atlas](/a/maths/lesson.php?c=calculus-1&l=derivatives) and the [chain-rule chapter](/a/maths/lesson.php?c=calculus-1&l=chain-rule). The derivatives we need constantly are

$$
\frac{\dd}{\dd x} x^k = k x^{k-1}, \qquad \frac{\dd}{\dd x} e^{rx} = r e^{rx}, \qquad \frac{\dd}{\dd x} \ln x = \frac{1}{x}.
$$

::: proposition Marginal and average {#prop-mc-ac}
Let $A(q) = C(q)/q$ for $q > 0$, with $C$ differentiable. Then

$$
A'(q) = \frac{C'(q) - A(q)}{q}.
$$ {#eq-mc-ac}

Hence $A$ is strictly decreasing where $MC < AC$, strictly increasing where $MC > AC$, and stationary where $MC = AC$. The same identity holds with revenue in place of cost: $MR$ cuts $AR$ from above at the maximum of average revenue.
:::
::: proof
The quotient rule gives $A'(q) = \bigl(C'(q)\, q - C(q)\bigr)/q^2 = \bigl(C'(q) - C(q)/q\bigr)/q$, which is [[#eq-mc-ac]]. The sign of $A'$ is the sign of $MC - AC$.
:::

This is the relationship every cost-curve diagram encodes. It is not special to cost: it is the relationship between the derivative of a function and the derivative of its average, and it applies to labour productivity, to batting averages, and to the average mark on a growing class.

## Marginal revenue and the output decision

A competitive firm takes the price $p$ as given, so $R(q) = p q$ and $MR = p$. A firm with market power faces a decreasing inverse demand $p = P(q)$, so $R(q) = P(q)\, q$ and the product rule gives

$$
MR(q) = P(q) + P'(q)\, q.
$$ {#eq-mr}

Because $P'(q) < 0$ and $q > 0$, marginal revenue lies *below* the demand curve: to sell one more unit the firm must cut the price a little, and it takes that cut on every unit it was already selling.

::: example Linear inverse demand {#ex-mr-linear}
Inverse demand is $p = 40 - 2q$. Compute total and marginal revenue. Evaluate both, and the price, at $q = 8$.
::: solution
$R(q) = (40-2q)q = 40q - 2q^2$, so $MR(q) = 40 - 4q$. At $q = 8$, $p = 24$, $R = 192$ and $MR = 8$. Selling an extra unit would add 8 to revenue, not 24: the eighth unit itself fetches 24, but the price cut of 2 that was needed to sell it reduced revenue on the previous 7 units by about 14, and $24 - 14 = 10$ is the discrete extra revenue from unit 8 versus unit 7. The derivative $MR = 8$ is the limit of that comparison as the unit shrinks.
:::
:::

A differentiable profit function $\pi(q) = R(q) - C(q)$ has $\pi'(q) = MR(q) - MC(q)$. If an interior maximum exists, it occurs where $\pi'(q) = 0$, that is where **marginal revenue equals marginal cost**. Second-order conditions, and the possibility that the maximum is at a boundary, are the subject of [[mathematical-economics/unconstrained-optimisation]]. For now the first-order condition is a reading of the derivative: at the best output, the last small unit adds as much to revenue as to cost.

::: warning Marginal is not average, and not "the last unit"
Marginal cost at $q = 20$ is the derivative $C'(20)$, not $C(20) - C(19)$ and not $C(20)/20$. For a curved cost function those three numbers differ. The discrete extra cost of one whole unit is a difference; the marginal cost is a derivative; the average cost is a ratio. In [[#ex-cost]], $C(20) = 260$, $C(19) = 100 + 114 + 36.1 = 250.1$, so $C(20)-C(19) = 9.9$, close to but not equal to $MC(20) = 10$. The approximation is better for smoother functions and smaller units.
:::

::: quiz
A firm faces $P(q) = 40 - 2q$ and has $MC(q) = 4 + q$. At the output where $MR = MC$,
- [ ] $q = 12$, the competitive output (where $P = MC$)
- [x] $q = 7.2$, and price is above marginal cost
- [ ] $q = 8$, where $MR = 8$ as in [[#ex-mr-linear]]
- [ ] there is no such output, because $MR$ lies below $MC$ everywhere
::: solution
$MR = 40 - 4q$ equals $4 + q$ when $36 = 5q$, so $q = 7.2$. Then $p = 40 - 14.4 = 25.6$ and $MC = 4 + 7.2 = 11.2$. Price exceeds marginal cost by $14.4$, the usual mark-up of a linear-demand monopolist. The competitive output would be $40-2q = 4+q$, $q = 12$.
:::
:::

## Elasticities

A slope $dq/dp$ has units: cups per unit of money, say. Change the units — measure the price in cents instead of units of money, or quantity in thousands of cups — and the slope changes. An **elasticity** is a slope in proportional units, and is therefore invariant to a change of scale.

::: definition Price elasticity of demand {#def-elasticity}
If $q = D(p)$ is differentiable and $p > 0$, $q > 0$, the **price elasticity of demand** is

$$
\varepsilon(p) = \frac{\dd q}{\dd p} \cdot \frac{p}{q} = \frac{D'(p)\, p}{D(p)}.
$$ {#eq-elasticity}

Equivalently, $\varepsilon = \dfrac{\dd \ln q}{\dd \ln p}$: it is the slope of demand in log–log coordinates. For inverse demand $p = P(q)$ one can write $\varepsilon = \dfrac{P(q)}{P'(q)\, q}$.
:::

Because demand slopes down, $\varepsilon$ is negative. Economists often speak of "an elasticity of 2" meaning $\abs{\varepsilon} = 2$; this atlas keeps the sign, and says **elastic** when $\abs{\varepsilon} > 1$, **inelastic** when $\abs{\varepsilon} < 1$, and **unit-elastic** when $\abs{\varepsilon} = 1$.

The same construction gives an income elasticity $\dfrac{\dd q}{\dd m} \cdot \dfrac{m}{q}$ and a cross-price elasticity $\dfrac{\dd q_i}{\dd p_j} \cdot \dfrac{p_j}{q_i}$. A supply elasticity is defined analogously and is positive for an increasing supply curve.

::: proposition Isoelastic demand {#prop-isoelastic}
Demand of the form $q = A p^{-\eta}$ with $A > 0$ and $\eta > 0$ has $\varepsilon(p) = -\eta$ at every $p > 0$. Conversely, if $\varepsilon(p)$ is a constant $-\eta$ on an interval of prices, then demand on that interval is isoelastic with that exponent.
:::
::: proof
$D'(p) = -\eta A p^{-\eta-1}$, so $D'(p)\, p / D(p) = -\eta A p^{-\eta}/(A p^{-\eta}) = -\eta$. Conversely, $\dfrac{\dd \ln q}{\dd \ln p} = -\eta$ is a differential equation in the variable $u = \ln p$: $\dfrac{\dd \ln q}{\dd u} = -\eta$, so $\ln q = -\eta u + c$ and $q = e^c p^{-\eta}$.
:::

That is why $q = A p^{-\eta}$ is the functional form one writes down when the elasticity, not the slope, is the primitive. Linear demand $q = a - bp$ has elasticity $\varepsilon(p) = -bp/(a-bp)$, which varies from $0$ at $p = 0$ to $-\infty$ as $p$ approaches the choke price $a/b$. One linear demand curve is elastic at high prices and inelastic at low prices.

::: example Point elasticity on a linear demand {#ex-point-elasticity}
Take $q = 120 - 4p$ from the previous chapter. Compute $\varepsilon$ at $p = 20$ and at $p = 10$.
::: solution
$D'(p) = -4$ and $q(20) = 40$, so $\varepsilon(20) = -4 \cdot 20/40 = -2$. At $p = 10$, $q = 80$ and $\varepsilon = -4 \cdot 10/80 = -0.5$. Midway in price between 0 and the choke price 30 the elasticity is $-1$: $p = 15$, $q = 60$, $\varepsilon = -4 \cdot 15/60 = -1$. For any linear demand the midpoint of the demand curve is the unit-elastic point.
:::
:::

Empirical elasticities are estimated, not assumed, and they vary by good, by country and by time horizon. A review by Labandeira, Labeaga and López-Otero (*Energy Economics*, 2017) puts the short-run price elasticity of gasoline demand around $-0.3$ and the long-run elasticity around $-0.8$, with substantial heterogeneity across studies. Food-staple elasticities in low-income settings are often smaller still in the short run; durable-goods elasticities can exceed 1. These are stylised facts with error bands, not theorems, and a model that needs a number should take it from a source and a date.

## Marginal revenue and elasticity

The two readings of the derivative — marginal revenue and elasticity — are linked by an identity that every model of market power uses.

::: theorem Marginal revenue and elasticity {#thm-mr-elasticity}
If inverse demand $P(q)$ is differentiable, $q > 0$ and $\varepsilon(q) \neq 0$, then

$$
MR(q) = P(q)\left(1 + \frac{1}{\varepsilon(q)}\right),
$$ {#eq-mr-elasticity}

where $\varepsilon(q) = P(q)/\bigl(P'(q)\, q\bigr)$ is the price elasticity of demand, expressed as a function of quantity.
:::
::: proof
From [[#eq-mr]], $MR = P + P' q = P\bigl(1 + P' q / P\bigr)$. The term $P' q / P$ is exactly $1/\varepsilon$.
:::

Several immediate consequences are used constantly.

- If demand is elastic, $\varepsilon < -1$, then $1 + 1/\varepsilon > 0$ and $MR > 0$: cutting the price raises revenue.
- If demand is inelastic, $-1 < \varepsilon < 0$, then $MR < 0$: cutting the price lowers revenue. A profit-maximising firm with positive marginal cost never operates on the inelastic part of its demand curve, because it could raise profit by *raising* the price (which raises revenue and cuts cost).
- If demand is unit-elastic, $MR = 0$ and revenue is locally constant.
- The monopolist's mark-up rule $P - MC = -P/\varepsilon$, or $P = MC / \bigl(1 + 1/\varepsilon\bigr)$, is [[#eq-mr-elasticity]] together with $MR = MC$. As demand becomes more elastic, $\varepsilon \to -\infty$ and the mark-up vanishes: the firm looks more like a competitor.

::: example Checking the identity {#ex-mr-identity}
In [[#ex-mr-linear]], at $q = 8$ we had $p = 24$ and $MR = 8$. Direct demand is $q = 20 - p/2$, so $D'(p) = -1/2$ and $\varepsilon = (-1/2)\cdot 24/8 = -1.5$. Then $P(1+1/\varepsilon) = 24\bigl(1 - 2/3\bigr) = 8$, which matches $MR$.
:::

::: widget plot
f: 40 - 2*x; 40 - 4*x
x: 0, 20
y: -20, 44
labels: \text{inverse demand } P; \text{marginal revenue}
caption: Inverse demand $P = 40-2q$ and marginal revenue $MR = 40-4q$. $MR$ is twice as steep and hits zero at $q = 10$, the midpoint of the demand curve, where $\abs{\varepsilon} = 1$. To the right of that point $MR$ is negative and demand is inelastic — a region a profit-maximising firm with positive $MC$ avoids. Check [[#eq-mr-elasticity]] at $q = 8$: $P = 24$, $\varepsilon = -1.5$, and $P(1+1/\varepsilon) = 8 = MR$.
:::

## Logarithmic derivatives and growth rates

If a positive quantity $y$ depends on time, its **instantaneous growth rate** is

$$
g_y = \frac{\dot y}{y} = \frac{\dd}{\dd t} \ln y,
$$ {#eq-growth}

where a dot denotes a time derivative. This is the continuous analogue of the discrete growth rate $(y_{t+1}-y_t)/y_t$, and it is what $\ln y$ is for: differentiating a log converts a level into a growth rate.

Three rules follow from the derivative rules and are used in every growth-accounting exercise.

- $g_{xy} = g_x + g_y$ (the growth rate of a product is the sum of growth rates).
- $g_{x/y} = g_x - g_y$.
- $g_{x^k} = k\, g_x$.

In particular, if $Y = A K^{\alpha} L^{1-\alpha}$ then $g_Y = g_A + \alpha g_K + (1-\alpha) g_L$. That is **Solow's residual**: the part of output growth not accounted for by capital and labour growth is attributed to $A$, total factor productivity. Solow's 1957 decomposition of US data for 1909–49 assigned about seven-eighths of the rise in output per worker to $A$ rather than to capital deepening — a finding that launched a literature, not a settled number. The identity itself is just the logarithmic derivative of Cobb–Douglas.

::: example A growth-rate calculation {#ex-growth}
Real GDP grows at 3 per cent a year and population at 1 per cent a year. What is the growth rate of real GDP per person? If the price level inflates at 2 per cent a year, what is the growth rate of *nominal* GDP?
::: solution
GDP per person is $Y/N$, so $g_{Y/N} = g_Y - g_N = 3\% - 1\% = 2\%$. Nominal GDP is $P \cdot Y$, so $g_{PY} = g_P + g_Y = 2\% + 3\% = 5\%$. These are instantaneous rates; the discrete (year-on-year) rates differ from them by terms of order $g^2$, which at a few per cent a year are a few hundredths of a percentage point.
:::
:::

The same logarithmic derivative is the elasticity: $\varepsilon = \dd \ln q / \dd \ln p$. In log–log paper a constant-elasticity demand curve is a straight line of slope $\varepsilon$, which is why double-log specifications are the default in empirical demand estimation.

::: remark Discrete versus instantaneous
The discrete elasticity $\dfrac{\Delta q / q}{\Delta p / p}$ depends on whether $q$ and $p$ in the denominators are the starting values, the ending values, or an average (the **arc elasticity** uses the averages). The derivative [[#eq-elasticity]] is the limit of all of these as $\Delta p \to 0$, and does not require a choice. For a 1 per cent price change the three discrete versions already agree to a couple of hundredths; for a 20 per cent change they can differ by enough to matter. Quote the formula you used.
:::

## Where this leads

Marginal quantities are the first-order conditions of [[mathematical-economics/unconstrained-optimisation]] and [[mathematical-economics/constrained-optimisation]]: $MR = MC$, $MPL = w/p$, $MRS = p_1/p_2$. Elasticities are the language in which those conditions are compared across markets and over time, and in which tax incidence is apportioned between buyers and sellers. Growth rates are the language of [[economic-growth]] and of the differential equations in [[mathematical-economics/difference-and-differential-equations]]. The next chapter integrates the derivative, and reads the integral as an area — consumer surplus — and as a discounted sum.

::: history
**1890, Alfred Marshall.** *Principles of Economics* introduced the word "elasticity" for $\varepsilon$ and drew the distinction between elastic and inelastic demand, including the implication for tax incidence: the side of the market with the less elastic curve pays more of a tax.

**1928, Charles Cobb and Paul Douglas.** Their *American Economic Review* paper fitted $P = b L^{k} C^{1-k}$ to US manufacturing data and interpreted the exponents as factor shares — an empirical use of the logarithmic derivative that [[#eq-growth]] makes transparent.

**1934, Joan Robinson and Edward Chamberlin.** *The Economics of Imperfect Competition* and *The Theory of Monopolistic Competition* put [[#eq-mr-elasticity]] at the centre of the theory of market power, making the elasticity of demand the parameter that converts a cost into a price.
:::

::: summary
- The **derivative** $f'(a)$ is the instantaneous rate of change of $f$ at $a$. In economics it is a **marginal** quantity: $MC = C'$, $MR = R'$, $MPL = F'$.
- $MR = P + P' q$ lies below a downward-sloping demand curve. An interior profit maximum requires $MR = MC$.
- The **price elasticity of demand** is $\varepsilon = (dq/dp)(p/q) = d\ln q / d\ln p$. It is unit-free. Isoelastic demand $q = A p^{-\eta}$ has $\varepsilon = -\eta$ everywhere.
- **Marginal revenue and elasticity** are linked by $MR = P(1 + 1/\varepsilon)$. A profit-maximising firm with positive $MC$ never operates where demand is inelastic.
- The **logarithmic derivative** $\dot y / y$ is an instantaneous growth rate. Products add, quotients subtract, and powers multiply growth rates.
:::

## Exercises

::: exercise A cubic cost function {level=1}
Let $C(q) = 50 + 4q + q^2 + 0.05 q^3$. Compute $MC(q)$ and $AC(q)$. Evaluate both at $q = 10$.
::: solution
$MC(q) = 4 + 2q + 0.15 q^2$ and $AC(q) = 50/q + 4 + q + 0.05 q^2$. At $q = 10$, $MC = 4 + 20 + 15 = 39$ and $AC = 5 + 4 + 10 + 5 = 24$. Marginal cost is already well above average cost: the cubic term has begun to dominate.
:::
:::

::: exercise Linear monopoly {level=1 check="16"}
Inverse demand is $p = 36 - q$ and $MC = 4$ (constant). Find the output at which $MR = MC$. (Enter that output.)
::: solution
$R = 36q - q^2$, so $MR = 36 - 2q$. Setting $36 - 2q = 4$ gives $2q = 32$, hence $q = 16$. The corresponding price is $20$.
:::
:::

::: exercise Point elasticity {level=1}
Demand is $q = 80 - 2p$. Compute $\varepsilon$ at $p = 10$ and at $p = 30$. Classify demand as elastic or inelastic at each point.
::: solution
$D' = -2$. At $p = 10$, $q = 60$ and $\varepsilon = -2 \cdot 10/60 = -1/3$, inelastic. At $p = 30$, $q = 20$ and $\varepsilon = -2 \cdot 30/20 = -3$, elastic.
:::
:::

::: exercise Isoelastic revenue {level=2}
Demand is $q = 200\, p^{-0.5}$. Show that revenue $R = pq$ is *increasing* in $p$, and compute $R$ at $p = 4$ and at $p = 16$. Reconcile this with [[#thm-mr-elasticity]].
::: solution
$R = 200 p^{0.5}$, which increases in $p$. At $p = 4$, $q = 200/2 = 100$ and $R = 400$; at $p = 16$, $q = 200/4 = 50$ and $R = 800$. Here $\varepsilon = -0.5$, so $\abs{\varepsilon} < 1$ (inelastic) and $MR = P(1 + 1/(-0.5)) = P(1-2) = -P < 0$: raising the price, which *cuts* quantity, raises revenue because $MR$ is negative. The firm would like a still higher price; with $MC > 0$ it would not choose to operate on this curve at all, unless a regulator or a capacity constraint forced it to.
:::
:::

::: exercise The mark-up {level=2}
A monopolist faces isoelastic demand with $\varepsilon = -3$ and has constant $MC = 12$. Using [[#thm-mr-elasticity]], find the profit-maximising price and the mark-up $(P-MC)/P$.
::: solution
$MR = P(1 + 1/(-3)) = P \cdot 2/3$. Set $MR = MC$: $(2/3)P = 12$, so $P = 18$. The mark-up is $(18-12)/18 = 1/3$, which equals $-1/\varepsilon$ as the Lerner index requires.
:::
:::

::: exercise Growth accounting {level=2}
Output is $Y = A K^{1/3} L^{2/3}$. Over a year, $K$ grows by 6 per cent, $L$ by 1.5 per cent and $Y$ by 3 per cent. What is the implied growth rate of $A$?
::: solution
$g_Y = g_A + \tfrac13 g_K + \tfrac23 g_L$, so $3 = g_A + \tfrac13 \cdot 6 + \tfrac23 \cdot 1.5 = g_A + 2 + 1$ and $g_A = 0$. All of the observed output growth is accounted for by factor growth; TFP is flat in this (illustrative) year.
:::
:::

::: exercise Discrete versus instantaneous {level=3}
Demand is $q = 100/p$. The price rises from 4 to 5. Compute (a) the discrete elasticity using starting values in the denominators, (b) the arc elasticity (averages in the denominators), and (c) the instantaneous elasticity at the starting price, at the ending price, and at the midpoint price. Comment.
::: hint
For $q = 100/p$ the instantaneous elasticity is identically $-1$. The discrete versions need not equal $-1$.
:::
::: solution
$q$ falls from 25 to 20. (a) $(\Delta q/q)/(\Delta p/p) = (-5/25)/(1/4) = (-0.2)/0.25 = -0.8$. (b) Arc: $\Delta q / \bar q = -5 / 22.5 = -2/9$, $\Delta p / \bar p = 1 / 4.5 = 2/9$, ratio $-1$. (c) Instantaneous $\varepsilon = -1$ at every price, including 4, 5 and 4.5. The starting-value discrete elasticity is biased toward zero for a price *rise* along a convex (isoelastic) curve; the arc elasticity happens to recover the true $-1$ on this particular function, because $q = 100/p$ makes $p q$ constant and the average formula collapses to $-1$. In general the arc elasticity is a better discrete approximation than either endpoint, but only the derivative is exact.
:::
:::

::: exercise Tax incidence with elasticities {level=3}
In a linear market, inverse demand $p = a - bq$ and inverse supply $p = c + dq$ have, at the equilibrium of [[mathematical-economics/functions-and-models#eq-linear-eq]], demand elasticity $\varepsilon_d = -p/(b q)$ and supply elasticity $\varepsilon_s = p/(d q)$. A per-unit tax $t$ on sellers raises the buyer price by $\dfrac{b}{b+d}\, t$ and lowers the seller price by $\dfrac{d}{b+d}\, t$. Rewrite those shares in terms of $\varepsilon_d$ and $\varepsilon_s$, and interpret.
::: hint
Write the slopes as $b = p/(q \abs{\varepsilon_d})$ and $d = p/(q \varepsilon_s)$, then simplify the ratios $b/(b+d)$ and $d/(b+d)$.
:::
::: solution
From the definitions, $b = p/(q \abs{\varepsilon_d})$ and $d = p/(q \varepsilon_s)$. Therefore

$$
\frac{b}{b+d} = \frac{1/\abs{\varepsilon_d}}{1/\abs{\varepsilon_d} + 1/\varepsilon_s} = \frac{\varepsilon_s}{\varepsilon_s + \abs{\varepsilon_d}}, \qquad \frac{d}{b+d} = \frac{\abs{\varepsilon_d}}{\varepsilon_s + \abs{\varepsilon_d}}.
$$

The buyer price rises by a fraction $\varepsilon_s / (\varepsilon_s + \abs{\varepsilon_d})$ of the tax, and the seller price falls by the complementary fraction. If supply is perfectly elastic ($\varepsilon_s \to \infty$), buyers pay the whole tax; if demand is perfectly inelastic ($\abs{\varepsilon_d} \to 0$), buyers also pay the whole tax. In both limits, and in between, the less elastic side of the market bears more of the tax. The same shares appeared as a slope ratio in [[mathematical-economics/functions-and-models#ex-linear-market]]; elasticities make the comparison unit-free.
:::
:::
