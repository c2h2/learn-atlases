A rise in the price of rice has two consequences for the shopper. Rice is more expensive relative to beans, so she substitutes towards beans. And her budget set has shrunk: at the old bundle she is poorer, and if rice is a normal good she buys less of it for that reason too. Marshallian demand $x(\mathbf{p}, m)$ folds the two effects together. To take them apart we solve a different problem — reach a *target utility* as cheaply as possible — whose solution, **Hicksian demand**, holds real income constant in the sense of utility. The identity that links the two demands is the **Slutsky equation**, derived by Eugen Slutsky in 1915 and the organising fact of applied demand analysis.

The same dual problem produces a money-metric of welfare. The extra cash that would restore the old utility at the new prices is **compensating variation**; the cash the consumer would give up, at the old prices, to avoid the change is **equivalent variation**. Both are areas under Hicksian curves. Consumer surplus, the area under the Marshallian curve, lies between them and coincides with both when income effects vanish.

This chapter is dual to [[microeconomics/consumer-choice]]. The mathematical engine is the envelope theorem ([[mathematical-economics/comparative-statics]]). Notation: Marshallian $x(\mathbf{p}, m)$, Hicksian $h(\mathbf{p}, u)$, indirect utility $v(\mathbf{p}, m)$, expenditure $e(\mathbf{p}, u)$.

## Expenditure minimisation

::: definition Expenditure minimisation problem {#def-emp}
Given $u$ and a target utility $\bar u$ in the range of $u$, the **expenditure minimisation problem** (EMP) is

$$
\min_{\mathbf{x} \ge \mathbf{0}} \mathbf{p}\cdot\mathbf{x} \quad\text{subject to}\quad u(\mathbf{x}) \ge \bar u.
$$ {#eq-emp}

A solution $h(\mathbf{p}, \bar u)$ is a **Hicksian (compensated) demand**. The value of the problem is the **expenditure function** $e(\mathbf{p}, \bar u) = \mathbf{p}\cdot h(\mathbf{p}, \bar u)$.
:::

Geometry: the lowest budget line that still touches the indifference curve $u = \bar u$. At an interior tangency the condition is again $\mathrm{MRS}_{ij} = p_i/p_j$, but the second equation is $u(\mathbf{x}) = \bar u$ rather than $\mathbf{p}\cdot\mathbf{x} = m$. Same slopes, different constraint.

The Lagrangian is $\mathcal{L} = \mathbf{p}\cdot\mathbf{x} + \mu\bigl(\bar u - u(\mathbf{x})\bigr)$. First-order conditions $p_i = \mu u_i$ are the same as $u_i = \lambda p_i$ with $\lambda = 1/\mu$. The problems share their interior tangency condition; they differ in what is held constant.

::: proposition Duality identities {#prop-duality}
Assume $u$ is continuous, strictly increasing and strictly quasiconcave, so both problems have unique solutions. Then

$$
h(\mathbf{p}, u) = x\bigl(\mathbf{p},\, e(\mathbf{p}, u)\bigr), \qquad x(\mathbf{p}, m) = h\bigl(\mathbf{p},\, v(\mathbf{p}, m)\bigr),
$$ {#eq-duality}

and $e(\mathbf{p}, v(\mathbf{p}, m)) = m$, $v(\mathbf{p}, e(\mathbf{p}, u)) = u$. Hicksian demand is what the consumer would buy if her income were adjusted to keep utility at $u$; Marshallian demand is Hicksian demand at the utility she actually reaches.
:::

::: proof
Let $\mathbf{x}^* = x(\mathbf{p}, m)$. Then $u(\mathbf{x}^*) = v(\mathbf{p}, m)$ and $\mathbf{p}\cdot\mathbf{x}^* = m$. The bundle $\mathbf{x}^*$ is feasible for the EMP at target $v(\mathbf{p}, m)$, so $e(\mathbf{p}, v(\mathbf{p}, m)) \le m$. If the inequality were strict, there would be a cheaper bundle still yielding $v(\mathbf{p}, m)$; adding the leftover cash and using monotonicity would beat $v(\mathbf{p}, m)$ in the UMP, a contradiction. Hence $e(\mathbf{p}, v) = m$ and, by uniqueness, $h(\mathbf{p}, v) = x(\mathbf{p}, m)$. The other pair of identities is the same argument with the roles reversed.
:::

::: example Cobb–Douglas Hicksian demand {#ex-cd-hicks}
For $u = x_1^a x_2^{1-a}$ the expenditure function and Hicksian demands are

$$
e(\mathbf{p}, u) = \frac{u\, p_1^a p_2^{1-a}}{a^a (1-a)^{1-a}},\qquad
h_1(\mathbf{p}, u) = a\,\frac{e(\mathbf{p}, u)}{p_1},\qquad
h_2(\mathbf{p}, u) = (1-a)\,\frac{e(\mathbf{p}, u)}{p_2}.
$$ {#eq-cd-hicks}

Take $a = 1/2$, so $e = 2u\sqrt{p_1 p_2}$ and $h_1 = u\sqrt{p_2/p_1}$. At $p_1 = 1$, $p_2 = 1$, $m = 8$ the consumer reaches $v = 4$ (because $v = m/(2\sqrt{p_1 p_2})$). Compute $h_1$ at the original prices and at $p_1' = 4$.
::: solution
At $(1,1)$ and $u = 4$: $h_1 = 4\sqrt{1/1} = 4$, which equals Marshallian $x_1 = 8/(2\cdot 1) = 4$. At $p_1' = 4$: $h_1 = 4\sqrt{1/4} = 2$. The compensated consumer, given enough extra cash to stay at $u = 4$, cuts her rice consumption from 4 to 2 as its price quadruples. The uncompensated consumer, whose income stays at 8, cuts further: $x_1(4, 1, 8) = 8/(2\cdot 4) = 1$.
:::
:::

The extra cut from 2 to 1 is the income effect. Making that split precise is the next section.

## Shephard's lemma and the substitution matrix

::: theorem Shephard's lemma {#thm-shephard}
If $e$ is differentiable at $(\mathbf{p}, u)$, then

$$
h_i(\mathbf{p}, u) = \frac{\partial e}{\partial p_i}(\mathbf{p}, u).
$$ {#eq-shephard}

Consequently $e$ is concave in $\mathbf{p}$, homogeneous of degree 1 in $\mathbf{p}$, increasing in $u$ and non-decreasing in each $p_i$, and the substitution matrix $D_p h(\mathbf{p}, u) = D_{pp}^2 e(\mathbf{p}, u)$ is symmetric, negative semidefinite, and satisfies $D_p h(\mathbf{p}, u)\,\mathbf{p} = \mathbf{0}$.
:::

::: proof
Envelope: the Lagrangian of the EMP is $\mathbf{p}\cdot\mathbf{x} + \mu(u - u(\mathbf{x}))$; its derivative with respect to $p_i$, holding $\mathbf{x}$ and $\mu$ at their optimal values, is $x_i = h_i$. Homogeneity: $e(\lambda\mathbf{p}, u) = \lambda e(\mathbf{p}, u)$ because the feasible set of the EMP does not depend on prices and the objective scales. Differentiating that identity with respect to $\lambda$ at $\lambda = 1$ and using Shephard gives $\mathbf{p}\cdot h = e$, which we already knew, and differentiating with respect to $p$ gives $D_p h\,\mathbf{p} = \mathbf{0}$ (Hicksian demands are homogeneous of degree zero in $\mathbf{p}$). Concavity in $\mathbf{p}$: $e(\mathbf{p}, u) = \min_{\mathbf{x}: u(\mathbf{x})\ge u} \mathbf{p}\cdot\mathbf{x}$ is the minimum of linear functions of $\mathbf{p}$, hence concave. A concave $C^2$ function has a negative-semidefinite Hessian; that Hessian is $D_p h$, and it is symmetric by Young's theorem.
:::

Negative semidefiniteness of $D_p h$ is the **compensated law of demand**: $h_i$ cannot rise with $p_i$ when utility is held constant. Own-substitution terms $\partial h_i/\partial p_i \le 0$. Off-diagonal terms $\partial h_i/\partial p_j$ can have either sign (gross substitutes or complements in the Hicksian sense), but symmetry $\partial h_i/\partial p_j = \partial h_j/\partial p_i$ is a restriction that Marshallian cross-derivatives do not obey.

::: warning Hicksian demand is not observable
Nobody reports the utility they came to the shop with. $h(\mathbf{p}, u)$ is constructed, from $x(\mathbf{p}, m)$ and an income adjustment, or from a specified $u$. Plots that treat a market demand curve as "the" demand curve for welfare are using Marshallian $x(\mathbf{p}, m)$ as if it were Hicksian. The error is zero only when income effects are zero (quasi-linear utility). The next two sections quantify the gap.
:::

## The Slutsky equation

Fix all prices except $p_i$, and fix income $m$. As $p_i$ changes, Marshallian demand moves for two reasons: the budget line pivots (relative prices), and the consumer's real income changes. Duality says $x_i(\mathbf{p}, m) = h_i(\mathbf{p}, v(\mathbf{p}, m))$. Differentiate with respect to $p_j$.

::: theorem The Slutsky equation {#thm-slutsky}
If $h$ and $v$ are differentiable,

$$
\frac{\partial x_i}{\partial p_j}(\mathbf{p}, m) = \frac{\partial h_i}{\partial p_j}\bigl(\mathbf{p}, v(\mathbf{p}, m)\bigr) - x_j(\mathbf{p}, m)\,\frac{\partial x_i}{\partial m}(\mathbf{p}, m).
$$ {#eq-slutsky}

The first term on the right is the **substitution effect**; the second is the **income effect**. In matrix form, $D_p x = D_p h - (\partial x/\partial m)\, x^{\T}$.
:::

::: proof
Differentiate $x_i(\mathbf{p}, m) = h_i(\mathbf{p}, v(\mathbf{p}, m))$ with respect to $p_j$:

$$
\frac{\partial x_i}{\partial p_j} = \frac{\partial h_i}{\partial p_j} + \frac{\partial h_i}{\partial u}\cdot\frac{\partial v}{\partial p_j}.
$$

Roy's identity gives $\partial v/\partial p_j = -x_j\,\partial v/\partial m$. Duality also gives $h_i(\mathbf{p}, u) = x_i(\mathbf{p}, e(\mathbf{p}, u))$, so $\partial h_i/\partial u = (\partial x_i/\partial m)\,(\partial e/\partial u)$. And $\partial e/\partial u \cdot \partial v/\partial m = 1$ because $e(\mathbf{p}, v(\mathbf{p}, m)) = m$. Combining, $(\partial h_i/\partial u)(\partial v/\partial p_j) = -x_j\,\partial x_i/\partial m$, which is [[#eq-slutsky]].
:::

For an own-price change ($i = j$) the substitution effect is negative (Shephard). The income effect $-x_i \partial x_i/\partial m$ has the opposite sign to $\partial x_i/\partial m$:

- **Normal good** ($\partial x_i/\partial m > 0$): the income effect reinforces the substitution effect. Marshallian demand slopes down more steeply than Hicksian demand.
- **Inferior good** ($\partial x_i/\partial m < 0$): the income effect works against substitution. Marshallian demand is flatter than Hicksian, and if the income effect dominates, $\partial x_i/\partial p_i > 0$: a **Giffen good**.

A Giffen good must be inferior, but an inferior good need not be Giffen. Giffen behaviour is a large income effect on a good that already absorbs a large budget share $x_i$, so that $x_i \partial x_i/\partial m$ can outweigh $\partial h_i/\partial p_i$.

::: example A numerical Slutsky decomposition {#ex-slutsky-num}
Continue with $u = \sqrt{x_1 x_2}$, $(p_1, p_2, m) = (1, 1, 8)$, so $x = (4, 4)$ and $v = 4$. The price of good 1 rises to $4$. Using [[#ex-cd-hicks]], decompose the change in $x_1$ into substitution and income effects (Hicksian, at the original utility).
::: solution
Old Marshallian: $x_1(1, 1, 8) = 4$. New Marshallian: $x_1(4, 1, 8) = 1$. Total change $\Delta x_1 = -3$.

Hicksian at original utility: $h_1(1, 1, 4) = 4$ and $h_1(4, 1, 4) = 2$. Substitution effect: $2 - 4 = -2$.

Income effect: new Marshallian minus new Hicksian, $1 - 2 = -1$. (Equivalently: the income needed to restore $u = 4$ at the new prices is $e(4, 1, 4) = 2\cdot 4\cdot 2 = 16$, so the consumer is $8$ units poorer in money-metric terms; the Engel effect on good 1 of losing $8$ of income at the new prices is $x_1(4, 1, 16) - x_1(4, 1, 8) = 2 - 1 = 1$, and the income effect is the negative of that.)

Check: $-2 + (-1) = -3$. Good 1 is normal, so both pieces are negative and Marshallian demand falls by more than Hicksian demand.
:::
:::

The **Slutsky compensated** demand uses the old *bundle's cost* rather than the old utility: income is adjusted to $p'\cdot x(\mathbf{p}, m)$ so the old bundle stays just affordable. For small changes the two compensations agree; for discrete changes they differ by a second-order term. Hicksian compensation is the one that enters welfare. Slutsky compensation is the one revealed-preference tests can use, because it is observable.

::: widget plot
f: 4/x; 4/sqrt(x)
x: 0.4, 8
y: 0, 12
labels: \text{Marshallian } x_1=4/p_1; \text{Hicksian } h_1=4/\sqrt{p_1}
caption: Demand for good 1 as a function of $p_1$, from [[#ex-slutsky-num]], with $p_2=1$ and original $u=4$ (so original $m=8$ at $p_1=1$). Marshallian $x_1=4/p_1$ (income fixed at 8); Hicksian $h_1=4/\sqrt{p_1}$ (utility fixed at 4). At $p_1=1$ the curves meet at $4$; at $p_1=4$ Marshallian is at $1$ and Hicksian at $2$. The vertical gap is the income effect. The Hicksian curve is flatter, as it must be for a normal good: $\lvert\partial h/\partial p\rvert \le \lvert\partial x/\partial p\rvert$.
:::

::: quiz
If good $i$ is Giffen, which statement follows from the Slutsky equation?
- [ ] The substitution effect $\partial h_i/\partial p_i$ is positive
- [x] Good $i$ is inferior, and the income effect outweighs the substitution effect
- [ ] Hicksian demand slopes up
- [ ] The good's budget share must be small
::: solution
Shephard's lemma still gives $\partial h_i/\partial p_i \le 0$; compensated demand cannot slope up. For Marshallian demand to slope up, $-x_i \partial x_i/\partial m$ must be positive and larger in magnitude than $\partial h_i/\partial p_i$, so $\partial x_i/\partial m < 0$ (inferior) and $x_i$ must be large enough for the product to dominate. A *small* budget share makes Giffen behaviour harder, not easier.
:::
:::

## Measuring welfare: CV, EV and consumer surplus

A price change from $\mathbf{p}^0$ to $\mathbf{p}^1$, with income fixed at $m$, moves the consumer from $u^0 = v(\mathbf{p}^0, m)$ to $u^1 = v(\mathbf{p}^1, m)$. Two money measures of that move are standard.

::: definition Compensating and equivalent variation {#def-cv-ev}
The **compensating variation** of the change is the extra income that restores the old utility at the new prices,

$$
\mathrm{CV} = e(\mathbf{p}^1, u^0) - e(\mathbf{p}^1, u^1) = e(\mathbf{p}^1, u^0) - m.
$$ {#eq-cv}

The **equivalent variation** is the income the consumer would give up at the old prices to avoid the change (or would need, at the old prices, to match the new utility),

$$
\mathrm{EV} = e(\mathbf{p}^0, u^0) - e(\mathbf{p}^0, u^1) = m - e(\mathbf{p}^0, u^1).
$$ {#eq-ev}

By Shephard's lemma both are integrals of Hicksian demand. For a rise in a single price $p_i$ from $p_i^0$ to $p_i^1$,

$$
\mathrm{CV} = \int_{p_i^0}^{p_i^1} h_i(\mathbf{p}, u^0)\,\mathrm{d}p_i,\qquad
\mathrm{EV} = \int_{p_i^0}^{p_i^1} h_i(\mathbf{p}, u^1)\,\mathrm{d}p_i.
$$ {#eq-cv-integral}
:::

The sign convention here is: CV and EV are positive when the consumer is *hurt* (a price rise, a tax). Some texts flip the sign and speak of willingness to pay for a gain. What matters is to pick one convention and stay with it; this course uses "positive = compensation needed".

**Consumer surplus** is the Marshallian analogue,

$$
\Delta\mathrm{CS} = \int_{p_i^0}^{p_i^1} x_i(\mathbf{p}, m)\,\mathrm{d}p_i.
$$ {#eq-cs}

It is the area under the ordinary demand curve. It is observable, which is why [[principles/markets-and-welfare]] uses it, and it is not in general equal to either CV or EV.

::: proposition Ordering of CV, CS and EV {#prop-cv-cs-ev}
For an own-price *rise* of a *normal* good, $\mathrm{CV} \ge \Delta\mathrm{CS} \ge \mathrm{EV} \ge 0$. For a *fall*, the inequalities reverse (all three are then negative on our sign convention, and $\lvert\mathrm{EV}\rvert \ge \lvert\Delta\mathrm{CS}\rvert \ge \lvert\mathrm{CV}\rvert$). If preferences are quasi-linear in some other good, income effects for good $i$ vanish and $\mathrm{CV} = \Delta\mathrm{CS} = \mathrm{EV}$.
:::

::: proof
For a normal good the Hicksian curve through $u^0$ lies above the Marshallian curve to the right of $p_i^0$, which lies above the Hicksian curve through $u^1$ (because $u^1 < u^0$ after a price rise, and Hicksian demand increases with $u$ for a normal good). Integrating $p_i^0 \to p_i^1$ gives the ordering. Quasi-linearity: $\partial x_i/\partial m = 0$ in the interior, so Slutsky says $\partial x_i/\partial p_i = \partial h_i/\partial p_i$, the three curves coincide, and the three integrals coincide.
:::

::: example CV, EV and CS for a fourfold price rise {#ex-cv-ev}
With the numbers of [[#ex-slutsky-num]] — $u = \sqrt{x_1 x_2}$, $p_2 = 1$, $m = 8$, $p_1$ from $1$ to $4$ — compute CV, EV and $\Delta\mathrm{CS}$.
::: solution
$u^0 = 4$, $u^1 = v(4, 1, 8) = 8/(2\cdot 2) = 2$. Expenditure $e = 2u\sqrt{p_1 p_2}$.

$\mathrm{CV} = e(4, 1, 4) - 8 = 16 - 8 = 8$. The consumer needs 8 extra units of income at the new prices to get back to $u = 4$.

$\mathrm{EV} = 8 - e(1, 1, 2) = 8 - 4 = 4$. She would pay 4, at the old prices, to avoid the rise.

$\Delta\mathrm{CS} = \int_1^4 x_1(p_1, 1, 8)\,\mathrm{d}p_1 = \int_1^4 4/p_1\,\mathrm{d}p_1 = 4\ln 4 \approx 5.545$.

The ordering $8 > 5.545 > 4$ matches [[#prop-cv-cs-ev]] for a normal good. The Marshallian area is a decent approximation here; it is not exact. For quasi-linear $u = \ln x_1 + x_2$ the three numbers would be identical.
:::
:::

::: example Quasi-linear equality of the three measures {#ex-ql-cv}
Let $u = \ln x_1 + x_2$ with $p_2 = 1$ and $m$ large enough for an interior solution, so $x_1 = 1/p_1$. The price of good 1 rises from $1$ to $e$. Compute CV, EV and $\Delta\mathrm{CS}$.
::: solution
Interior demand does not depend on $m$ or on $u$, so Marshallian and both Hicksian curves are the same rectangular hyperbola $h_1 = 1/p_1$. Each integral is $\int_1^e (1/p_1)\,\mathrm{d}p_1 = \ln e - \ln 1 = 1$. Thus $\mathrm{CV} = \mathrm{EV} = \Delta\mathrm{CS} = 1$. This is [[#prop-cv-cs-ev]] in a number: when the income effect is zero, it does not matter which curve one integrates.
:::
:::

::: widget riemann
f: 4/x
a: 1
b: 4
n: 8
method: mid
x: 0.5, 5
y: 0, 5
caption: Mid-point Riemann sums for $\Delta\mathrm{CS} = \int_1^4 4/p_1\,\mathrm{d}p_1 = 4\ln 4 \approx 5.545$, the Marshallian area in [[#ex-cv-ev]]. Raise $n$ and the sum approaches $4\ln 4$. The corresponding CV integral uses Hicksian $h_1=4/\sqrt{p_1}$ (area $8$) and the EV integral uses $h_1=2/\sqrt{p_1}$ (area $4$). Consumer surplus sits between them.
:::

::: quiz
A quasi-linear consumer has $u = v(x_1) + x_2$ and an interior solution. A tax raises $p_1$. Which welfare measure should be used?
- [ ] CV only, because taxes require compensation
- [ ] EV only, because it uses the old prices
- [x] Any of CV, EV or $\Delta\mathrm{CS}$; they are equal
- [ ] None of them, because quasi-linearity is ordinal
::: solution
Interior quasi-linearity kills the income effect on good 1, so the Marshallian and both Hicksian curves coincide and the three integrals are the same number. Quasi-linearity is a cardinalisation, but the *equality* of the three money measures is a property of the preference relation (parallel indifference curves), not of a particular $u$.
:::
:::

## Income and substitution in pictures, and Giffen evidence

The **Hicksian decomposition** of a discrete price fall, drawn in an indifference map, is the standard two-step picture: first pivot the budget line along the old indifference curve (substitution, $A \to B$), then shift it out in parallel to the new budget (income, $B \to C$). For a price *rise* the parallel shift is inwards. If $C$ lies to the left of $A$ on the $x_1$-axis the good is ordinary; if $C$ lies to the right of $A$ it is Giffen.

Giffen behaviour is rare in data because it needs a large budget share, inferiority, and a small substitution effect (poor substitutes). Robert Giffen's original claim about bread in nineteenth-century Britain was never well documented. Jensen and Miller (2008, *American Economic Review*) found Giffen behaviour for rice among poor urban households in Hunan province: randomly subsidising rice *reduced* rice consumption for households that were poor but not so poor that they ate only rice. The estimated Giffen response was concentrated in that window, as the theory predicts. It is a real phenomenon and a narrow one.

Inferiority without Giffen behaviour is common: bus travel, cheap cuts of meat, and (in some samples) rice as income grows out of the Giffen window all have negative Engel curves and downward-sloping Marshallian demand. The substitution effect wins.

::: history
**1915, Eugen Slutsky.** *Sulla teoria del bilancio del consumatore*, in the *Giornale degli Economisti*, derived [[#eq-slutsky]] in terms of the derivatives of demand. The paper was almost unknown in English until R. G. D. Allen and John Hicks rediscovered the decomposition in the 1930s.

**1939, John Hicks.** *Value and Capital* defined compensating and equivalent variation and popularised the indifference-curve picture of substitution and income effects. Hicks used the utility-constant (Hicksian) compensation; Slutsky had used the bundle-constant compensation.

**1942, John Hicks.** *The generalised theory of consumer's surplus* related CV, EV and Marshallian surplus; Harold Hotelling (1938) had already treated related line integrals of demand.

**1980, Angus Deaton and John Muellbauer.** The Almost Ideal Demand System made the Slutsky matrix a set of testable restrictions on estimated budget-share equations, turning [[#thm-slutsky]] into applied econometrics.
:::

## Where this leads

With $x(\mathbf{p}, m)$, $h(\mathbf{p}, u)$, $v$ and $e$ in hand, the consumer's apparatus is complete for two goods and a cash income. Two extensions occupy the next two chapters: the budget may be an *endowment* rather than cash, which is how labour supply and saving are set up ([[microeconomics/labour-and-intertemporal-choice]]); and the "goods" may be state-contingent consumption, which is expected utility ([[microeconomics/uncertainty]]). On the firm side the EMP becomes cost minimisation and Shephard's lemma becomes the derivative of the cost function ([[microeconomics/production-and-cost]]). Welfare comparisons of taxes, subsidies and price controls in [[public-economics/efficiency-costs-of-taxation]] and [[principles/markets-and-welfare]] are, at bottom, comparisons of CV or EV; the first welfare theorem of [[microeconomics/welfare-theorems]] says when the uncompensated market allocation already maximises one such measure.

::: summary
- The EMP minimises $\mathbf{p}\cdot\mathbf{x}$ subject to $u(\mathbf{x}) \ge \bar u$. Its solution is Hicksian demand $h(\mathbf{p}, u)$; its value is the expenditure function $e(\mathbf{p}, u)$.
- Duality: $h(\mathbf{p}, u) = x(\mathbf{p}, e(\mathbf{p}, u))$ and $x(\mathbf{p}, m) = h(\mathbf{p}, v(\mathbf{p}, m))$. Shephard's lemma: $h = \nabla_p e$. The substitution matrix $D_p h$ is symmetric and negative semidefinite.
- The Slutsky equation $\partial x_i/\partial p_j = \partial h_i/\partial p_j - x_j \partial x_i/\partial m$ splits every Marshallian price effect into substitution (utility-constant) and income. Giffen goods are inferior goods whose income effect dominates.
- CV is the integral of $h(\cdot, u^0)$; EV is the integral of $h(\cdot, u^1)$; $\Delta\mathrm{CS}$ is the integral of $x(\cdot, m)$. For a price rise of a normal good, $\mathrm{CV} \ge \Delta\mathrm{CS} \ge \mathrm{EV}$. Quasi-linearity makes all three equal.
- Hicksian demand is not directly observed; Marshallian demand is. Welfare numbers computed from Marshallian areas are approximations, exact only when income effects are zero.
:::

## Exercises

::: exercise Read off Hicksian demand {level=1 check="2"}
From [[#ex-cd-hicks]], with $a = 1/2$ and $u = 4$, what is $h_1$ at $p_1 = 4$, $p_2 = 1$? (Enter the quantity.)
::: solution
$h_1 = u\sqrt{p_2/p_1} = 4 \sqrt{1/4} = 2$.
:::
:::

::: exercise Expenditure function {level=1 check="16"}
With the same preferences, compute $e((4, 1), 4)$. (Enter the expenditure.)
::: solution
$e = 2u\sqrt{p_1 p_2} = 8\sqrt{4} = 16$. Check via Shephard: $h_1 = 2$, $h_2 = u\sqrt{p_1/p_2} = 4\cdot 2 = 8$, and $4\cdot 2 + 1\cdot 8 = 16$.
:::
:::

::: exercise Sign of the income effect {level=1}
A consumer's Marshallian demand for good 1 falls from 10 to 7 when $p_1$ rises, while Hicksian demand at the original utility falls from 10 to 8. Is good 1 normal or inferior? What is the income effect?
::: solution
Substitution effect $= 8-10 = -2$. Total effect $= -3$. Income effect $= -3-(-2) = -1 < 0$. For an own-price rise, a negative income effect means $\partial x_1/\partial m > 0$: the consumer buys less because she is poorer. Good 1 is normal.
:::
:::

::: exercise Slutsky at a point {level=2}
For Cobb–Douglas $a = 1/2$, at $(p_1, p_2, m) = (2, 1, 12)$ one has $x_1 = 3$. Compute $\partial x_1/\partial p_1$, $\partial x_1/\partial m$, the income-effect term $x_1 \partial x_1/\partial m$, and the substitution term $\partial h_1/\partial p_1$.
::: solution
$x_1 = m/(2p_1)$, so $\partial x_1/\partial p_1 = -m/(2p_1^2) = -12/8 = -1.5$ and $\partial x_1/\partial m = 1/(2p_1) = 1/4$. Income-effect term $x_1 \partial x_1/\partial m = 3\cdot 1/4 = 0.75$. Slutsky: $\partial h_1/\partial p_1 = \partial x_1/\partial p_1 + x_1 \partial x_1/\partial m = -1.5 + 0.75 = -0.75$. (Check: $\partial h_1/\partial p_1 = -a(1-a)m/p_1^2 = -(1/4)\cdot 12/4 = -0.75$.)
:::
:::

::: exercise Consumer surplus for a linear demand {level=2 check="6"}
A quasi-linear consumer has interior inverse demand $p_1 = 8 - x_1$. The price falls from $6$ to $4$. Compute the surplus gain $\Delta\mathrm{CS} = -\mathrm{CV}$ (the three measures coincide). (Enter the gain.)
::: solution
Quantity demanded rises from $x_1(6) = 2$ to $x_1(4) = 4$. The surplus gain is the trapezium $\int_4^6 (8-p)\,\mathrm{d}p = \bigl[8p - p^2/2\bigr]_4^6 = (48-18) - (32-8) = 30-24 = 6$. Equivalently, a trapezium of heights $2$ and $4$ and width $2$ has area $(2+4)/2 \cdot 2 = 6$.
:::
:::

::: exercise CV and EV from the expenditure function {level=2}
Using $e(\mathbf{p}, u) = 2u\sqrt{p_1 p_2}$ and the numbers of [[#ex-cv-ev]] ($m = 8$, $p_2 = 1$, $p_1$ from $1$ to $4$), recompute CV and EV from [[#eq-cv]] and [[#eq-ev]] without looking up the answers. Confirm $\mathrm{CV} > \Delta\mathrm{CS} > \mathrm{EV}$.
::: solution
$u^0 = 8/(2\sqrt{1}) = 4$, $u^1 = 8/(2\sqrt{4}) = 2$. Then $\mathrm{CV} = e((4,1), 4) - 8 = 16-8 = 8$ and $\mathrm{EV} = 8 - e((1,1), 2) = 8-4 = 4$. And $\Delta\mathrm{CS} = 4\ln 4 \approx 5.545$, which lies strictly between $4$ and $8$.
:::
:::

::: exercise Shephard's lemma for Cobb–Douglas {level=3}
Starting from $e(\mathbf{p}, u) = u\, p_1^a p_2^{1-a} / \bigl(a^a (1-a)^{1-a}\bigr)$, compute $\partial e/\partial p_1$ and show that it equals $h_1 = a\, e/p_1$. Then differentiate again to obtain $\partial h_1/\partial p_1$ and verify that it is negative.
::: hint
Logarithmic differentiation: $\partial e/\partial p_1 = (a/p_1)\, e$.
:::
::: solution
Taking $\ln e = \ln u + a\ln p_1 + (1-a)\ln p_2 - \text{const}$, we have $\partial\ln e/\partial p_1 = a/p_1$, so $\partial e/\partial p_1 = a e/p_1 = h_1$. Then

$$
\frac{\partial h_1}{\partial p_1} = a\cdot\frac{(\partial e/\partial p_1)\, p_1 - e}{p_1^2} = a\cdot\frac{a e - e}{p_1^2} = -\frac{a(1-a)e}{p_1^2} < 0.
$$

At a Marshallian point $e = m$, this is $-a(1-a)m/p_1^2$, the substitution term used in [[#ex-slutsky-num]] and the previous derivative exercise.
:::
:::

::: exercise When is a good Giffen? {level=3}
A consumer has $x_1(\mathbf{p}, m) = 3m/p_1 - 10\, p_2/p_1$ (a linear demand system, defined where this is positive and Walras's law can be completed with $x_2$). Compute $\partial x_1/\partial p_1$ and $\partial x_1/\partial m$. For which values of $(p_1, p_2, m)$ is good 1 Giffen? Inferior? Confirm that Giffen implies inferior.
::: hint
Giffen means $\partial x_1/\partial p_1 > 0$; inferior means $\partial x_1/\partial m < 0$.
:::
::: solution
$\partial x_1/\partial p_1 = -3m/p_1^2 + 10 p_2/p_1^2 = (10 p_2 - 3m)/p_1^2$ and $\partial x_1/\partial m = 3/p_1 > 0$. The income derivative is always positive on $p_1 > 0$, so good 1 is never inferior, and therefore never Giffen. And indeed $\partial x_1/\partial p_1 > 0$ would require $m < (10/3) p_2$, but then $x_1 = (3m - 10 p_2)/p_1 < 0$, outside the region where this is a demand. The two restrictions are consistent: wherever $x_1 > 0$ we have $3m > 10 p_2$, hence $\partial x_1/\partial p_1 < 0$. A linear demand with a positive income slope cannot be Giffen on its positive domain.
:::
:::

::: exercise Quasi-linear equality of CV and EV {level=3}
Let $u = v(x_1) + x_2$ with $v' > 0$, $v'' < 0$, and $p_2 = 1$. Suppose the interior solution $x_1(p_1)$ is independent of $m$. Using the expenditure function, show that $\mathrm{CV} = \mathrm{EV}$ for a change in $p_1$.
::: hint
The expenditure function is $e(p_1, u) = p_1 x_1(p_1) + \bigl(u - v(x_1(p_1))\bigr)$, and $x_1$ does not depend on $u$.
:::
::: solution
At an interior optimum $v'(x_1) = p_1$, so $x_1 = x_1(p_1)$ is determined by $p_1$ alone. Then $x_2 = e - p_1 x_1$ and $u = v(x_1) + x_2$, hence $e(p_1, u) = p_1 x_1(p_1) + u - v(x_1(p_1))$. For a change $p_1^0 \to p_1^1$ at income $m$,

$$
\mathrm{CV} = e(p_1^1, u^0) - m = p_1^1 x_1(p_1^1) + u^0 - v(x_1(p_1^1)) - m,
$$

and $m = e(p_1^0, u^0) = p_1^0 x_1(p_1^0) + u^0 - v(x_1(p_1^0))$, so

$$
\mathrm{CV} = \bigl[p_1^1 x_1(p_1^1) - v(x_1(p_1^1))\bigr] - \bigl[p_1^0 x_1(p_1^0) - v(x_1(p_1^0))\bigr].
$$

The same calculation for $\mathrm{EV} = m - e(p_1^0, u^1)$ produces the identical difference, because $u^1$ cancels in the same way. Both equal $\int_{p_1^0}^{p_1^1} x_1(p)\,\mathrm{d}p$ by Shephard, since $h_1 = x_1$ is independent of $u$.
:::
:::
