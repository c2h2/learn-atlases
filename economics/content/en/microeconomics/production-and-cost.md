A bakery that wants 100 loaves a day can use many mixes of ovens and hours. Some mixes are wasteful: the same 100 loaves with more of both inputs. The rest lie on an **isoquant**. Among those, the mix that costs least at the going wage and rental is the one a cost-minimising bakery uses, and that least cost, as a function of the wage, the rental and the 100 loaves, is the **cost function**. Demand theory was a maximisation; production theory is, first, a minimisation. The two are dual in the same way the UMP and the EMP were dual.

This chapter writes down a **production function**, the associated marginal products and the **marginal rate of technical substitution**, classifies **returns to scale**, solves cost minimisation, and constructs short-run and long-run cost curves. Profit maximisation and the competitive industry wait until [[microeconomics/competitive-markets]]. Shephard's lemma returns: the derivative of the cost function with respect to an input price is the conditional factor demand. Notation: output $q$, inputs capital $K$ and labour $L$, wage $w$, rental rate of capital $r$. In this chapter $r$ is a rental rate, not a real interest rate.

## Technology

::: definition Production function {#def-production}
A **production function** $f : \R_+^2 \to \R_+$ assigns to each input bundle $(K, L)$ the maximum output $q = f(K, L)$ obtainable from those inputs. An **isoquant** for output $q$ is the set $\set{(K, L) : f(K, L) = q}$. The **marginal product** of labour is $f_L = \partial f/\partial L$, and of capital $f_K = \partial f/\partial K$, when the derivatives exist. The **marginal rate of technical substitution** of labour for capital is

$$
\mathrm{MRTS}_{L,K} = \frac{f_L}{f_K} = -\frac{\mathrm{d}K}{\mathrm{d}L}\Big|_{\text{isoquant}}.
$$ {#eq-mrts}

We assume $f$ is continuous, strictly increasing on the positive orthant, and quasiconcave (so isoquants are convex to the origin). Concavity of $f$ is stronger: it gives diminishing marginal products and a convex production set.
:::

An isoquant is an indifference curve for output. Convexity to the origin is diminishing MRTS: as the bakery uses more labour and less capital, an extra hour replaces fewer oven-minutes. Perfect substitutes (linear $f$) have constant MRTS; Leontief (min) isoquants are L-shaped and the MRTS is undefined at the corner. The geometry is close enough to the consumer's that it is worth keeping the dictionary in view: isoquant $\leftrightarrow$ indifference curve, MRTS $\leftrightarrow$ MRS, isocost $\leftrightarrow$ budget line, output $q$ $\leftrightarrow$ target utility. The economic difference is important. Output is cardinal in a way that ordinal utility is not — 200 loaves are twice 100 in a sense that $u=200$ is not twice $u=100$ — and the firm's constraint is a technological one, not a market one, until input prices enter the cost-minimisation problem.

Diminishing marginal products are an assumption about $f$, not a theorem. They are the usual case for a single input when the other is held fixed (too many bakers in one kitchen), and they are compatible with any returns to scale for *proportional* expansion of both inputs. A Cobb–Douglas $f = K^{1/3} L^{2/3}$ has diminishing $f_L$ and $f_K$ and constant returns to scale at the same time. Confusing the two — treating diminishing MP as decreasing returns to scale — is a standard error, and it leads to the wrong cost curves.

::: definition Returns to scale {#def-rts}
The technology has **constant returns to scale** (CRS) if $f(\lambda K, \lambda L) = \lambda f(K, L)$ for all $\lambda > 0$; **increasing returns** (IRS) if $f(\lambda K, \lambda L) > \lambda f(K, L)$ for $\lambda > 1$; and **decreasing returns** (DRS) if the inequality is reversed. If $f$ is homogeneous of degree $k$, Euler's theorem gives $K f_K + L f_L = k f(K, L)$; CRS is $k = 1$.
:::

CRS is the benchmark of the competitive model: doubling all inputs doubles output, and (we will see) average cost is independent of $q$. IRS is the natural language of fixed costs and of natural monopoly; DRS can stand in for a hidden fixed factor. A Cobb–Douglas $f = A K^a L^b$ has returns $a+b$.

::: example Three technologies {#ex-three-tech}
For each technology, compute $\mathrm{MRTS}_{L,K}$ and classify returns to scale. (a) $f = \sqrt{K L}$. (b) $f = 2K + L$. (c) $f = \min\set{K, 2L}$.
::: solution
(a) $f_K = \tfrac12 \sqrt{L/K}$, $f_L = \tfrac12 \sqrt{K/L}$, so $\mathrm{MRTS} = K/L$. Homogeneous of degree 1: CRS. Isoquants are rectangular hyperbolas, like Cobb–Douglas indifference curves.

(b) $f_K = 2$, $f_L = 1$, $\mathrm{MRTS} = 1/2$, constant. Homogeneous of degree 1: CRS. Isoquants are straight lines of slope $-1/2$. Labour and capital are perfect substitutes at two-for-one.

(c) The corner ray is $K = 2L$. MRTS is undefined at the corner, $0$ on the horizontal arm and $+\infty$ on the vertical arm. Homogeneous of degree 1: CRS. One machine-hour requires two labour-hours; extra units of either input alone produce nothing.
:::
:::

::: widget contour
f: (x*y)^0.5
x: 0.2, 24
y: 0.2, 12
levels: 10
gradient: true
constraint: r*x + w*y - 32
point: 16, 4
sliders: r=1:0.4:2:0.1; w=4:1:8:0.5
caption: Isoquants of $q=\sqrt{K L}$ ($x=K$, $y=L$) and the isocost $rK+wL=32$. At $(w,r)=(4,1)$ the cost-minimising bundle for $q=8$ is $(K,L)=(16,4)$, which sits on this isocost. Raise $w$: labour is dearer, and the tangency slides towards more $K$ and less $L$. The gradient of $f$ is parallel to $(r,w)$ at a cost-minimising point.
:::

## Cost minimisation

::: definition Cost minimisation {#def-cost-min}
The **cost-minimisation problem** at input prices $(w, r) \gg 0$ and output $q > 0$ is

$$
\min_{K, L \ge 0} w L + r K \quad\text{subject to}\quad f(K, L) \ge q.
$$ {#eq-cmp}

A solution $(K(w, r, q), L(w, r, q))$ is a pair of **conditional factor demands**. The value is the **cost function** $c(w, r, q) = w L(w, r, q) + r K(w, r, q)$.
:::

This is the EMP of [[microeconomics/slutsky-and-welfare]] with $u$ replaced by $f$ and $\bar u$ by $q$. Interior first-order conditions: $\mathrm{MRTS}_{L,K} = w/r$, together with $f(K, L) = q$. The last unit of money spent on each input must yield the same marginal product. Corners occur when the MRTS never equals $w/r$ (perfect substitutes). Cost minimisation is not optional in the competitive model: a firm that produces $q$ with the wrong mix of $K$ and $L$ has a higher cost than $c(w, r, q)$ and, facing a price $p$, will make less profit than a rival who minimises. In the short run the firm may be stuck with the wrong $K$; that is why short-run cost lies above long-run cost except at the one output for which the inherited $K$ happens to be optimal.

A useful accounting identity, once the FOC holds, is that cost shares equal output elasticities under Cobb–Douglas, and more generally $wL/c = f_L L / (f_K K + f_L L)$. Under CRS the denominator is $q$ by Euler, and $wL/q$ is the labour share of revenue if the firm sells at $p = MC = AC$. That is the microfoundation of the "one-third, two-thirds" split used to calibrate $a$ and $b$ on national accounts.

::: proposition Shephard's lemma for cost {#prop-shephard-cost}
If $c$ is differentiable,

$$
L(w, r, q) = \frac{\partial c}{\partial w},\qquad K(w, r, q) = \frac{\partial c}{\partial r}.
$$ {#eq-shephard-cost}

The function $c$ is homogeneous of degree 1 in $(w, r)$, concave in $(w, r)$, increasing in $q$, and the substitution matrix of conditional factor demands is negative semidefinite. If $f$ is CRS then $c(w, r, q) = q\, c(w, r, 1)$: average cost is independent of scale.
:::

::: proof
Envelope: the Lagrangian is $wL + rK + \mu(q - f(K, L))$; $\partial\mathcal{L}/\partial w = L$ at the optimum. Homogeneity: scaling both prices scales the objective, not the feasible set. Concavity in prices: $c$ is a minimum of linear functions of $(w, r)$. CRS: $f(\lambda K, \lambda L) = \lambda f(K, L)$ implies that the cheapest way to produce $q$ is $q$ times the cheapest way to produce 1, at the same factor prices.
:::

::: example Cobb–Douglas cost {#ex-cd-cost}
Let $f = \sqrt{K L}$, $w = 4$, $r = 1$, $q = 8$. Find the cost-minimising $(K, L)$ and $c$. Then write $c(w, r, q)$ for general prices.
::: solution
$\mathrm{MRTS} = K/L = w/r = 4$, so $K = 4L$. Then $\sqrt{4L\cdot L} = 2L = 8$, $L = 4$, $K = 16$. Cost $c = 4\cdot 4 + 1\cdot 16 = 32$.

Generally, $K/L = w/r$ and $\sqrt{K L} = q$ give $K = q\sqrt{w/r}$, $L = q\sqrt{r/w}$, and

$$
c(w, r, q) = 2q\sqrt{w r}.
$$ {#eq-cd-cost}

Shephard check: $\partial c/\partial w = q \sqrt{r/w} = L$. At the numbers, $2\cdot 8\cdot\sqrt{4} = 32$, matching. Homogeneity of degree 1 in prices is visible; CRS of $f$ makes $c$ linear in $q$.
:::
:::

::: example Leontief and perfect-substitute cost {#ex-leontief-cost}
(a) $f = \min\set{K, 2L}$, $w = 4$, $r = 1$, $q = 8$. (b) $f = 2K + L$, same prices and output. Find $(K, L)$ and cost in each case.
::: solution
(a) Produce on the ray $K = 2L$ with $K = 8$, so $L = 4$, $K = 8$. Cost $4\cdot 4 + 1\cdot 8 = 24$. Off the ray, extra input is wasted.

(b) $\mathrm{MRTS} = 1/2$. Compare with $w/r = 4$. One unit of output from labour alone costs $w/1 = 4$; from capital alone costs $r/2 = 1/2$. Capital is the cheaper source, so $K = 4$, $L = 0$, cost $4$. (If $w/r$ were below $1/2$, the firm would use only labour.)
:::
:::

## Short run and long run

In the **short run** some input is fixed; conventionally $K = \bar K$. Short-run cost is

$$
c_s(w, r, q; \bar K) = w L(q, \bar K) + r \bar K,
$$

where $L(q, \bar K)$ is defined by $f(\bar K, L) = q$ (assuming this is feasible). **Fixed cost** is $r\bar K$; **variable cost** is $w L(q, \bar K)$. **Marginal cost** $MC = \partial c_s/\partial q$; **average cost** $AC = c_s/q$; **average variable cost** $AVC = VC/q$. In the **long run** both inputs are free and $c(w, r, q)$ is the function of [[#def-cost-min]].

::: proposition Long-run cost as an envelope {#prop-envelope-cost}
$c(w, r, q) = \min_{\bar K} c_s(w, r, q; \bar K)$. Consequently the long-run average cost curve is the lower envelope of the short-run average cost curves, and at the $\bar K$ that is optimal for a given $q$, short-run and long-run marginal costs agree.
:::

::: proof
The long-run problem can be solved by first choosing $L$ given $K$ and then choosing $K$; that nested problem is exactly $\min_{\bar K} c_s$. Envelope: differentiating $c_s$ with respect to $q$ at the optimal $\bar K$ holds $\bar K$ fixed, which is the short-run MC, and the envelope theorem says this equals long-run MC.
:::

::: example Short-run cost with fixed capital {#ex-sr-cost}
Continue with $f = \sqrt{K L}$, $w = 4$, $r = 1$, and now $\bar K = 9$. (a) Find short-run $L(q)$, $c_s(q)$, $MC$ and $AVC$. (b) At $q = 8$, compare short-run cost with the long-run cost 32 of [[#ex-cd-cost]]. (c) Which $\bar K$ would make short-run cost equal long-run cost at $q = 8$?
::: solution
(a) $\sqrt{9 \cdot L} = q$ so $3\sqrt{L} = q$, $L = q^2/9$. Then $VC = 4q^2/9$, $FC = 9$, $c_s = 4q^2/9 + 9$. $MC = 8q/9$, $AVC = 4q/9$, $AC = 4q/9 + 9/q$.

(b) At $q = 8$, $L = 64/9 \approx 7.11$, $c_s = 4\cdot 64/9 + 9 = 256/9 + 9 \approx 37.44$, which exceeds the long-run 32. The firm is stuck with too little capital (9 rather than 16) and loads up on labour.

(c) The long-run $K$ for $q = 8$ is 16. At $\bar K = 16$, $L = q^2/K = 64/16 = 4$, $c_s = 16 + 16 = 32$, matching. That is [[#prop-envelope-cost]] in numbers.
:::
:::

::: widget plot
f: 2*x; 2*x + 16/x; x
x: 0.5, 12
y: 0, 24
labels: MC=2q; AC=q+16/q; AVC=q
caption: Cost curves for $C(q) = q^2 + 16$ (a reduced form, capital already optimised or a single-input technology). Marginal cost cuts average cost at its minimum: $q = 4$, $AC = 8$. AVC lies below AC by the average fixed cost $16/q$. These curves are the firm's supply ingredients in [[microeconomics/competitive-markets]]: the firm supplies along MC above min AVC.
:::

The U-shape of $AC$ in the figure comes from a quadratic cost, which is DRS. Under CRS, long-run $AC$ is a horizontal line at $c(w, r, 1)$. Under IRS, long-run $AC$ falls with $q$. Textbook U-shaped *long-run* $AC$ combines IRS at low $q$ (spreading a setup cost) with DRS at high $q$ (a scarce managerial input). Nothing in the algebra forces that shape; it is an assumption about $f$.

The short-run / long-run distinction is a horizon, not a calendar. Capital is "fixed" when it cannot be adjusted in the time the firm has to answer a demand shock; a software firm whose "capital" is code may have a very short long run, and a nuclear plant a very long short run. Marshall's language survives because the nested minimisation — first $L$ given $K$, then $K$ — is the right mathematics whenever some input is slower than another. The envelope [[#prop-envelope-cost]] does not depend on calling the slow input capital.

A second warning about pictures: $MC$ is drawn through the bottom of $AC$ and $AVC$ because of a tautology, not a technological law. If $MC < AC$, producing a little more pulls the average down; if $MC > AC$, it pulls the average up. Therefore $MC$ cuts $AC$ from below at the minimum of $AC$, whenever that minimum is interior. The same tautology relates $MC$ to $AVC$. Checking that a plotted $MC$ actually goes through those minima is the cheapest test that a figure is consistent.

::: warning Marginal cost is not the cost of the last unit
$MC = \mathrm{d}C/\mathrm{d}q$ is the derivative, the extra cost of a small extra unit, not $C(q) - C(q-1)$ unless $q$ is integer and the derivative is constant. Average cost $C(q)/q$ includes sunk and fixed costs; a firm that prices at AC in a sunk-cost industry is not following the first-order condition of the next chapter, which is $p = MC$ (with a shutdown test on AVC). Confusing AC with MC is the most common arithmetic error on cost curves.
:::

::: quiz
A CRS Cobb–Douglas firm has $c(w, r, q) = 2q\sqrt{w r}$. If wages and rentals both double, what happens to conditional factor demands and to cost?
- [ ] Demands double and cost doubles
- [x] Demands are unchanged and cost doubles
- [ ] Demands halve and cost is unchanged
- [ ] The firm switches to a different isoquant
::: solution
Homogeneity: $c(2w, 2r, q) = 2 c(w, r, q)$ by [[#prop-shephard-cost]]. Shephard: $L = \partial c/\partial w$ is homogeneous of degree 0 in prices, so factor demands do not change — the same point on the same isoquant, just more expensive. The isoquant is determined by $q$, which is held fixed in the CMP.
:::
:::

## Evidence

Production functions are estimated, not just differentiated. Two regularities, and one warning, suffice here.

**Factor shares.** Under CRS and competitive factor markets, Euler's theorem says $wL + rK = q$, so the labour share $wL/q$ equals the output elasticity $f_L L/f$. For Cobb–Douglas that share is the exponent $b$, a constant. The labour share of national income in the United States was close to two-thirds for much of the twentieth century (the Kaldor fact), which is why $f = K^{1/3} L^{2/3}$ is a common calibration; it has declined since about 2000 in several rich countries (Karabarbounis and Neiman 2014), which is a reason to prefer CES with $\sigma \neq 1$.

**Returns to scale in plants.** Engineering studies of specific processes often find IRS at low output (a pipeline, a plant) and CRS or mild DRS once the process is replicated. Estimated markups and concentration are the subject of [[industrial-organisation/market-structure]]; at this stage the point is only that $a+b = 1$ is a convenient central case, not a measurement.

**Identification.** A regression of $\ln q$ on $\ln K$ and $\ln L$ does not recover $a$ and $b$ if input choices are correlated with unobserved productivity (Marschak and Andrews 1944). Modern production-function estimators (Olley and Pakes 1996; Levinsohn and Petrin 2003) use investment or materials as proxies. The Lagrangian of this chapter treats $f$ as known; estimation does not.

::: history
**1890, Alfred Marshall.** *Principles of Economics* distinguished the short run, in which capital is fixed, from the long run, in which both factors adjust, and drew the envelope of average cost curves.

**1928, Charles Cobb and Paul Douglas.** *A theory of production* fitted $q = A K^a L^{1-a}$ to US manufacturing data and found $a$ near one-third, matching the capital share.

**1934, John Hicks.** *The Theory of Wages* defined the elasticity of substitution, the curvature of the isoquant that CES later parametrised.

**1953, Paul Samuelson.** *Prices of factors and goods in general equilibrium* developed the cost function as the value of the CMP and used Shephard's lemma (Shephard, *Cost and Production Functions*, 1953) to recover factor demands.
:::

## Where this leads

The cost function is the firm's analogue of the consumer's expenditure function. The next chapter maximises $p q - c(w, r, q)$ and reads off a supply curve ([[microeconomics/competitive-markets]]). Conditional labour demand $L(w, r, q)$ is one ingredient of [[labour-economics/labour-demand]]; the other is the output that competitive firms choose. In general equilibrium, the same $f$ sits in the production set of the Robinson Crusoe and two-sector economies ([[microeconomics/general-equilibrium]]). Returns to scale decide whether a competitive equilibrium can exist: IRS is an invitation to [[industrial-organisation/monopoly-pricing]].

::: summary
- A production function $f(K, L)$ summarises the technology. Isoquants are level curves; $\mathrm{MRTS} = f_L/f_K$. Returns to scale are the behaviour of $f(\lambda K, \lambda L)$.
- Cost minimisation equates MRTS to $w/r$. Conditional factor demands are the solutions; $c(w, r, q)$ is the value. Shephard's lemma: $L = \partial c/\partial w$, $K = \partial c/\partial r$.
- For $f = \sqrt{K L}$, $c = 2q\sqrt{w r}$. Leontief produces on a ray; perfect substitutes produce at a corner.
- Short-run cost holds $K$ fixed. Long-run cost is the envelope of short-run costs. $MC$ cuts $AC$ at min $AC$.
- CRS implies $c(w, r, q) = q\, c(w, r, 1)$. IRS and DRS make long-run $AC$ fall or rise with $q$.
:::

## Exercises

::: exercise MRTS {level=1 check="2"}
For $f = K^{1/3} L^{2/3}$, compute $\mathrm{MRTS}_{L,K}$ at $(K, L) = (8, 8)$. (Enter the value of the MRTS.)
::: solution
$f_L = (2/3) K^{1/3} L^{-1/3}$, $f_K = (1/3) K^{-2/3} L^{2/3}$, so $\mathrm{MRTS} = 2K/L = 2$ at $(8, 8)$.
:::
:::

::: exercise Returns to scale {level=1}
Classify $f = K^{1/2} L^{1/2}$, $g = K^{1/2} L$, and $h = 2K + 3L$ as IRS, CRS or DRS.
::: solution
$f(\lambda K, \lambda L) = \lambda f$: CRS. $g(\lambda K, \lambda L) = \lambda^{3/2} g$: IRS. $h(\lambda K, \lambda L) = \lambda h$: CRS.
:::
:::

::: exercise Conditional labour {level=1 check="4"}
From [[#ex-cd-cost]], at $w = 4$, $r = 1$, $q = 8$, what is $L$? (Enter labour.)
::: solution
$L = 4$.
:::
:::

::: exercise Shephard check {level=2}
For $c = 2q\sqrt{w r}$, compute $\partial c/\partial w$ and $\partial c/\partial r$ and match them to $L = q\sqrt{r/w}$ and $K = q\sqrt{w/r}$.
::: solution
$\partial c/\partial w = q \sqrt{r/w} = L$, $\partial c/\partial r = q \sqrt{w/r} = K$.
:::
:::

::: exercise A corner technology {level=2}
$f = 2K + L$, $q = 10$. For what wage–rental ratios does the firm use only capital? Only labour? Both?
::: solution
Cost per unit of output: capital $r/2$, labour $w$. Only capital if $r/2 < w$, i.e. $w/r > 1/2$. Only labour if $w/r < 1/2$. Both (any mix) if $w/r = 1/2$.
:::
:::

::: exercise Short-run numbers {level=2 check="9"}
In [[#ex-sr-cost]], $\bar K = 9$, $w = 4$, $r = 1$. What is short-run total cost at $q = 0$ (the fixed cost)? (Enter the cost.)
::: solution
At $q = 0$, $L = 0$, $c_s = r\bar K = 9$.
:::
:::

::: exercise Derive the Cobb–Douglas cost function {level=3}
Let $f = K^a L^{1-a}$. From $\mathrm{MRTS} = w/r$ and $f = q$, derive $c(w, r, q) = q \bigl(r/a\bigr)^a \bigl(w/(1-a)\bigr)^{1-a}$. Check that $a = 1/2$ recovers $c = 2q\sqrt{w r}$.
::: hint
$f_L/f_K = ((1-a)/a)(K/L) = w/r$, so $rK = a c$ and $wL = (1-a)c$ (cost shares equal exponents).
:::
::: solution
$\mathrm{MRTS} = ((1-a)/a)(K/L) = w/r$ rearranges to $r K = \frac{a}{1-a} w L$. Then $c = wL + rK = wL/(1-a)$, so $wL = (1-a)c$ and $rK = a c$. Substitute into $q = K^a L^{1-a}$:

$$
q = \Bigl(\frac{a c}{r}\Bigr)^a \Bigl(\frac{(1-a)c}{w}\Bigr)^{1-a} = c \Bigl(\frac{a}{r}\Bigr)^a \Bigl(\frac{1-a}{w}\Bigr)^{1-a}.
$$

Solving for $c$ gives $c = q (r/a)^a (w/(1-a))^{1-a}$. At $a = 1/2$: $(r/(1/2))^{1/2} (w/(1/2))^{1/2} q = q \cdot 2 \sqrt{w r}$.
:::
:::

::: exercise Envelope of short-run cost {level=3}
For $f = \sqrt{K L}$, $w = 4$, $r = 1$, write $c_s(q; \bar K) = 4q^2/\bar K + \bar K$. Minimise over $\bar K$ and recover the long-run cost $c(q) = 4q$. Confirm that the minimising $\bar K$ equals the long-run conditional demand $K = q\sqrt{w/r} = 2q$.
::: solution
Differentiate with respect to $\bar K$: $-4q^2/\bar K^2 + 1 = 0$, so $\bar K = 2q$. Then $c_s = 4q^2/(2q) + 2q = 2q + 2q = 4q$. And $c(w, r, q) = 2q\sqrt{w r} = 2q\sqrt{4} = 4q$, matching. Conditional capital demand is $K = q\sqrt{w/r} = 2q$, which is exactly the minimising $\bar K$. That is [[#prop-envelope-cost]] as a calculus exercise.
:::
:::
