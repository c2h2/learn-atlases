A wage subsidy is introduced. Does employment rise, and by how much? A tariff is levied. Does the domestic price rise by the full amount of the tariff, or by less? An oil shock raises a firm's energy cost. Does it cut output, and what happens to its profit even after it has re-optimised?

Each of these is a **comparative-static** question: how does an equilibrium, or an optimum, move when a parameter moves? The raw materials are already in hand — an equilibrium is a root of a function, an optimum is a critical point of a Lagrangian — and the extra mathematics is the **implicit function theorem**, which differentiates those conditions, and the **envelope theorem**, which says that the first-order effect of a parameter on a *maximised* objective is the direct effect, holding the choice variables fixed. This chapter develops both, with the tax, the competitive firm, and the household as leading cases.

## Equilibria as implicit functions

An equilibrium condition $F(x, \theta) = 0$ defines the endogenous variable $x$ as a function of the parameter $\theta$, provided the condition can be "solved" for $x$. Linear markets could be solved in closed form; most models cannot. Differentiating the identity $F\bigl(x^*(\theta), \theta\bigr) = 0$ still gives $dx^*/d\theta$.

::: theorem Implicit function theorem, one variable {#thm-ift}
Let $F(x, \theta)$ be $C^1$ in a neighbourhood of $(x_0, \theta_0)$ with $F(x_0, \theta_0) = 0$ and $F_x(x_0, \theta_0) \neq 0$. Then there exist neighbourhoods of $\theta_0$ and of $x_0$, and a unique $C^1$ function $x^*(\theta)$ defined on the first, such that $x^*(\theta_0) = x_0$, $F\bigl(x^*(\theta), \theta\bigr) = 0$, and

$$
\frac{\dd x^*}{\dd \theta} = -\frac{F_\theta}{F_x}\Big|_{\bigl(x^*(\theta), \theta\bigr)}.
$$ {#eq-ift}
:::
::: proof Sketch
This is [[mathematical-economics/functions-of-several-variables#prop-implicit]] with the second variable treated as a parameter. The full statement, with several equations and several parameters, is in the [Maths Atlas](/a/maths/lesson.php?c=multivariable&l=partial-derivatives) and in de la Fuente (2000, ch. 5): one needs the Jacobian matrix $D_x F$ to be invertible, and then $D_\theta x^* = -\bigl(D_x F\bigr)^{-1} D_\theta F$.
:::

The economic content of $F_x \neq 0$ is a **regularity** condition: the equilibrium is locally unique and responds smoothly to the parameter. If $F_x = 0$, the picture is typically a fold — two equilibria colliding and disappearing, as in some multiple-equilibrium macro models — and comparative statics in the derivative sense fails.

::: example A tax in a linear market {#ex-tax-ift}
Inverse demand $p = a - b q$ and inverse supply $p = c + t + d q$, with a per-unit tax $t$ on sellers. Equilibrium quantity satisfies $F(q, t) := a - bq - (c+t+dq) = 0$. Compute $dq^*/dt$ from [[#eq-ift]] and compare with the closed form.
::: solution
$F_q = -b-d$, $F_t = -1$, so $dq^*/dt = -(-1)/(-b-d) = -1/(b+d) < 0$. The closed form $q^* = (a-c-t)/(b+d)$ differentiates to the same thing. The buyer price $p_b = a - b q^*$ then has $dp_b/dt = -b\, dq^*/dt = b/(b+d) \in (0,1)$: the price rises, but by less than the tax, as in [[mathematical-economics/functions-and-models#ex-linear-market]].
:::
:::

::: example A nonlinear market {#ex-nonlinear-cs}
Demand is $q = A p^{-\eta}$ and supply is $q = B p^{\gamma}$, with $\eta, \gamma > 0$. Find $d\ln p^*/d\ln A$, the elasticity of the equilibrium price with respect to a demand shifter.
::: solution
Equilibrium: $A p^{-\eta} = B p^{\gamma}$, so $p^{\eta+\gamma} = A/B$ and $p^* = (A/B)^{1/(\eta+\gamma)}$. Then $d\ln p^*/d\ln A = 1/(\eta+\gamma)$. From the implicit function theorem: $F(p, A) = A p^{-\eta} - B p^{\gamma} = 0$, $F_p = -\eta A p^{-\eta-1} - \gamma B p^{\gamma-1}$, $F_A = p^{-\eta}$, so

$$
\frac{\dd p^*}{\dd A} = -\frac{p^{-\eta}}{-\eta A p^{-\eta-1} - \gamma B p^{\gamma-1}} = \frac{p}{\eta A + \gamma B p^{\eta+\gamma}}.
$$

At equilibrium $B p^{\eta+\gamma} = A$, so the denominator is $(\eta+\gamma)A$ and $dp^*/dA = p^*/\bigl(A(\eta+\gamma)\bigr)$, hence $d\ln p^*/d\ln A = 1/(\eta+\gamma)$, matching. The more elastic either side of the market, the less a demand shock moves the price.
:::
:::

::: widget plot
f: a - 2*x; 4 + t + x
x: 0, 20
y: 0, 42
sliders: a=40:24:48:1; t=0:0:12:0.5
labels: \text{demand}; \text{supply with tax}
caption: Slide $t$ up: the supply curve shifts up one-for-one with the tax, equilibrium quantity falls, and the buyer price rises by a fraction $b/(b+d) = 2/3$ of $t$. Slide $a$ up: a demand shock raises both price and quantity. The slopes are the comparative-static derivatives of [[#ex-tax-ift]].
:::

## Comparative statics of an optimum

When $x^*(\theta)$ maximises $f(x, \theta)$, the first-order condition $f_x\bigl(x^*(\theta), \theta\bigr) = 0$ is an equilibrium condition of the previous kind. Differentiating it gives the response of the *choice* to the parameter.

::: proposition Shift of an unconstrained maximum {#prop-opt-cs}
Let $f(x, \theta)$ be $C^2$ and suppose $x^*(\theta)$ is an interior maximiser with $f_{xx}\bigl(x^*,\theta\bigr) < 0$. Then

$$
\frac{\dd x^*}{\dd \theta} = -\frac{f_{x\theta}}{f_{xx}}.
$$ {#eq-opt-cs}

The choice $x^*$ moves in the same direction as the shift in marginal benefit $f_{x\theta}$, because $f_{xx} < 0$ at a maximum.
:::
::: proof
Differentiate $f_x\bigl(x^*(\theta),\theta\bigr) = 0$ with respect to $\theta$: $f_{xx} x^{*\prime} + f_{x\theta} = 0$, and solve. The second-order condition $f_{xx} < 0$ gives the sign.
:::

This is Samuelson's **correspondence principle** in one dimension: the same second-order condition that makes $x^*$ a maximum also signs the comparative statics.

::: example A competitive firm {#ex-firm-cs}
A competitive firm has $C(q)$ strictly convex and faces price $p$. Then $x^*$ in [[#prop-opt-cs]] is output, $\theta$ is $p$, and $f = p q - C(q)$. Compute $dq^*/dp$.
::: solution
$f_q = p - C'(q)$, $f_{qq} = -C''(q) < 0$, $f_{qp} = 1$. So $dq^*/dp = 1/C''(q) > 0$: supply slopes up, with slope equal to the reciprocal of the slope of marginal cost. That is the supply curve of the competitive firm.
:::
:::

With several choice variables the same identity reads $Hf \, \dd\mathbf{x}^* + f_{\mathbf{x}\theta}\, \dd\theta = \mathbf{0}$, so $\dd\mathbf{x}^*/\dd\theta = -(Hf)^{-1} f_{\mathbf{x}\theta}$. Negative-definiteness of the Hessian, which we already need for a maximum, makes $-(Hf)^{-1}$ positive definite and signs own-effects: a rise in the price of an input cuts the demand for that input.

::: intuition Why the indirect effect vanishes
At a maximum the objective is flat in the choice: $f_x = 0$. A small forced movement of $x$ therefore costs nothing, to first order. When a parameter moves, the household or the firm *does* move $x$, but that movement is, locally, a walk along a flat ridge, and it does not change $v$ at the first order. Only the direct, partial effect $f_\theta$ survives. That is why a small tax $t$ costs the firm $q^* t$ in profit, even though the firm will also cut output: the output cut is a second-order mercy.
:::

::: warning Total versus partial
The derivative $dx^*/d\theta$ is a *total* derivative: as $\theta$ moves, $x$ moves with it. The partial $f_\theta$ holds $x$ fixed. Confusing the two is the error the envelope theorem exists to prevent — and to exploit.
:::

## The envelope theorem

A maximum-value function $v(\theta) = f\bigl(x^*(\theta), \theta\bigr)$ depends on $\theta$ both directly and through $x^*$. The indirect effect vanishes.

::: theorem Envelope theorem, unconstrained {#thm-envelope}
Let $v(\theta) = \max_x f(x, \theta) = f\bigl(x^*(\theta), \theta\bigr)$, with $x^*$ an interior $C^1$ maximiser. Then

$$
v'(\theta) = f_\theta\bigl(x^*(\theta), \theta\bigr).
$$ {#eq-envelope}

The derivative of the maximised objective with respect to the parameter is the partial of the objective, evaluated at the optimum — as if the choice had not responded.
:::
::: proof
$v'(\theta) = f_x x^{*\prime} + f_\theta$. At an interior maximum $f_x = 0$, so the first term drops.
:::

The constrained version is the same argument applied to the Lagrangian: $v'(\theta) = \mathcal{L}_\theta$ at the optimum, which is how [[mathematical-economics/constrained-optimisation#thm-shadow]] was proved ($c$ entered $\mathcal{L}$ only through $\lambda(c-g)$, so $\mathcal{L}_c = \lambda$).

::: example Profit and a price {#ex-hotelling}
For the competitive firm of [[#ex-firm-cs]], maximised profit is $\pi^*(p) = p q^*(p) - C\bigl(q^*(p)\bigr)$. Then $\pi^{*\prime}(p) = q^*(p)$, by [[#eq-envelope]] (the partial of $pq - C$ with respect to $p$ is $q$). This is **Hotelling's lemma**: the supply function is the derivative of the profit function. A discrete check: if $C(q) = q^2/2$ then $q^* = p$ and $\pi^* = p^2/2$, whose derivative is $p = q^*$.
:::

::: example Roy's identity, sketched {#ex-roy}
A household maximises $u(\mathbf{x})$ subject to $\mathbf{p}\cdot\mathbf{x} = m$. Indirect utility is $v(\mathbf{p}, m) = u\bigl(\mathbf{x}(\mathbf{p}, m)\bigr)$. The Lagrangian is $u + \lambda(m - \mathbf{p}\cdot\mathbf{x})$, so the envelope theorem gives $v_m = \lambda$ and $v_{p_i} = -\lambda x_i$. Dividing, $x_i(\mathbf{p}, m) = -v_{p_i}/v_m$: **Roy's identity**, the demand function recovered from indirect utility. The full development is in [[microeconomics/consumer-choice]].
:::

::: quiz
A firm maximises $\pi(q, t) = (p-t)q - C(q)$, where $t$ is a per-unit tax. At the optimum, $d\pi^*/dt$ equals
- [ ] $-q^* - (p-t-C') dq^*/dt$, the total derivative including the output response
- [x] $-q^*$, the partial of $\pi$ with respect to $t$ at the optimum
- [ ] $0$, because the firm re-optimises
- [ ] $-C'(q^*)$
::: solution
By the envelope theorem the output-response term is multiplied by $\pi_q = 0$ and drops. The remaining partial is $-q^*$. Re-optimisation matters for *output*, not for the first-order effect on profit. (Second-order, the firm is better off re-optimising than not: that is why the second derivative of $\pi^*$ involves $dq^*/dt$.)
:::
:::

::: widget plot
f: p*x - 0.5*x*x; p*p/2
x: 0, 12
y: 0, 55
sliders: p=6:2:10:0.2
labels: \text{profit at this } q; \text{maximised profit } \pi^*(p)
caption: For $C = q^2/2$ and price $p$, profit as a function of $q$ is the parabola, and maximised profit is the horizontal line at $p^2/2$. Slide $p$: the peak of the parabola rides along, and the height of the peak rises at rate $q^* = p$, Hotelling's lemma. The parabola itself shifts by $q\,\Delta p$ at each $q$; at the old optimum that is the whole first-order change.
:::

## Several parameters and several equations

The general comparative-static formula is matrix algebra. If $\mathbf{F}(\mathbf{x}, \boldsymbol\theta) = \mathbf{0}$ with $n$ equations in $n$ endogenous variables, and $D_x \mathbf{F}$ is invertible, then

$$
D_\theta \mathbf{x}^* = -\bigl(D_x \mathbf{F}\bigr)^{-1} D_\theta \mathbf{F}.
$$ {#eq-ift-n}

For an optimum, $D_x \mathbf{F}$ is the Hessian (or the bordered Hessian, with constraints). Cramer's rule then gives each $dx_i^*/d\theta_j$ as a ratio of determinants, which is how one signs substitution effects in consumer theory: the own-substitution matrix is negative semidefinite because the bordered Hessian of a constrained maximum has a definite sign pattern. That argument is the content of [[microeconomics/slutsky-and-welfare]]; the linear algebra is [[#eq-ift-n]] plus [[mathematical-economics/matrices-and-linear-models#prop-leading-minors]].

::: remark Qualitative comparative statics
Sometimes one cannot sign $dx^*/d\theta$ from the second-order conditions alone. Then the model does not answer the question, and the honest report is that the effect is ambiguous. Adding an assumption (gross substitutes, a normal good, a small income effect) is a restriction on $F$, not a property of the implicit function theorem. Samuelson's correspondence principle — infer the sign of a comparative static from the stability of an adjustment process — is one way to add such a restriction; it is not a theorem of statics, and we return to it in the next chapter.
:::

When several parameters move at once, the total differential of the equilibrium is $D_x F\, \dd\mathbf{x}^* + D_\theta F\, \dd\boldsymbol\theta = \mathbf{0}$. Superposition holds because the system has been linearised: the effect of two taxes is, to first order, the sum of the effects of each tax. Large changes require either the closed form or a finite-difference re-solve of $F(x,\theta)=0$. The derivative is a local answer; a 50 per cent tariff is not a small $\dd\theta$.

**Le Chatelier's principle**, as Samuelson imported it into economics, is a comparative-static refinement: a choice responds less (in absolute value) to a parameter when an extra constraint is imposed. Labour demand is less elastic in the short run, when capital is fixed, than in the long run, when capital can adjust. Formally, if $x^*(\theta)$ maximises $f(x,z,\theta)$ unconstrained in $z$ and $x^{**}(\theta)$ maximises it with $z$ held at the original optimum, then $\abs{dx^*/d\theta} \ge \abs{dx^{**}/d\theta}$ under concavity. The envelope theorem is the engine: the extra margin of adjustment can only help, so the value function is "more convex" in $\theta$ when $z$ is free, and its derivative (the choice, by Hotelling) is therefore steeper.

Not every comparative static is a derivative of an optimum. An equilibrium of a game, or of a market with externalities, need not be the critical point of a single function, and then there is no envelope and no correspondence principle to sign the Jacobian. One differentiates the equilibrium conditions anyway, using [[#eq-ift-n]], and one reports an ambiguous sign when the Jacobian does not deliver one. Adding a stability assumption — that a tatonnement $\dot p = D(p)-S(p)$ converges — can sign $D_p - S_p < 0$ and thereby sign a tax incidence, which is Samuelson's correspondence principle in the large. It is an extra hypothesis about adjustment, not a theorem of statics.

## Where this leads

Roy's identity, Shephard's lemma, Hotelling's lemma and the Slutsky equation are all envelopes. They are the working tools of [[microeconomics]]. In [[public-economics]] the envelope theorem is how one computes the marginal cost of public funds without re-solving the household's problem. In [[economic-growth]] the envelope theorem applied to a Bellman equation is an Euler equation. The next chapter puts time into the picture: the equilibrium condition becomes a difference or a differential equation, and "stability" acquires a meaning.

Local uniqueness, which the implicit function theorem delivers, is not global uniqueness. A market can have three equilibria, each of them regular, and a parameter can move the *number* of equilibria as well as their locations. Comparative statics at one equilibrium is silent about the others, and silent about jumps when an equilibrium disappears at a fold. Reporting "the" effect of a tax, in a model with multiple equilibria, requires a selection rule (stability, a history, a sunspot) that the derivative itself does not provide.

An empirical comparative static is a derivative estimated from data. Difference-in-differences, a regression of quantity on a tax with controls, an event study around a price-cap change — each is an attempt to measure $dx^*/d\theta$ without writing down $F$. The theory of this chapter says what that derivative *is* in a given model, and therefore what sign it should have and which other derivatives it should equal (Hotelling, Roy, Slutsky symmetry). When the estimate and the model's prediction disagree, either the model is wrong or the estimate is not the derivative the model was talking about (a partial rather than a total, a short-run rather than a long-run, a compensated rather than an uncompensated). Comparative statics is the vocabulary in which that disagreement is stated.

::: history
**1937, John Hicks.** *Théorie mathématique de la valeur en régime de libre concurrence*, and *Value and Capital* (1939), made comparative statics — the displacement of an equilibrium — a method, and introduced the compensated demand curve that signs substitution effects.

**1947, Paul Samuelson.** *Foundations of Economic Analysis* states the correspondence principle and treats the envelope theorem (without the modern name) as the source of Hotelling's lemma and of the properties of maximum-value functions.

**1974, Eugene Silberberg.** “A revision of comparative statics methodology in economics” (*Journal of Economic Theory*) put the envelope theorem at the centre of the graduate treatment of comparative statics, the organisation followed in Silberberg and Suen (2001).
:::

::: summary
- An equilibrium $F(x,\theta) = 0$ with $F_x \neq 0$ defines a $C^1$ function $x^*(\theta)$ with $x^{*\prime} = -F_\theta/F_x$ (**implicit function theorem**).
- At an unconstrained maximum, $dx^*/d\theta = -f_{x\theta}/f_{xx}$. The second-order condition signs the response: a rise in marginal benefit raises the choice.
- The **envelope theorem** says $v'(\theta) = f_\theta$ at the optimum: the indirect effect through $x^*$ is first-order zero. Hotelling's lemma, Roy's identity and the shadow-price theorem are instances.
- With several equations, $D_\theta x^* = -(D_x F)^{-1} D_\theta F$. Signing the result uses the definiteness of a Hessian or bordered Hessian.
:::

## Exercises

::: exercise A linear tax {level=1 check="-0.5"}
In the market $p = 30 - q$, $p = 6 + q + t$, compute $dq^*/dt$. (Enter $dq^*/dt$ as a decimal, for example `-0.5`.)
::: solution
$F(q,t) = 30 - q - (6 + q + t) = 24 - 2q - t$. Then $F_q = -2$, $F_t = -1$, so $dq^*/dt = -(-1)/(-2) = -1/2$. Closed form: $q^* = (24-t)/2$, same derivative.
:::
:::

::: exercise A competitive supply slope {level=1}
Cost is $C(q) = 2q + \tfrac12 q^2$. A competitive firm faces price $p$. Find $q^*(p)$ and $dq^*/dp$, and confirm [[#eq-opt-cs]].
::: solution
$MC = 2 + q$, so $q^* = p-2$ for $p \ge 2$ (and $q^* = 0$ otherwise). Then $dq^*/dp = 1$. From [[#eq-opt-cs]], $f = pq - 2q - q^2/2$, $f_{qq} = -1$, $f_{qp} = 1$, so $-f_{qp}/f_{qq} = 1$.
:::
:::

::: exercise Hotelling by hand {level=1}
For the firm of the previous exercise, compute maximised profit $\pi^*(p)$ for $p \ge 2$ and differentiate it. Compare with $q^*(p)$.
::: solution
$\pi^*(p) = p(p-2) - 2(p-2) - \tfrac12 (p-2)^2 = (p-2)\bigl(p-2 - \tfrac12(p-2)\bigr) = \tfrac12 (p-2)^2$. Then $\pi^{*\prime}(p) = p-2 = q^*(p)$, which is Hotelling's lemma.
:::
:::

::: exercise An isoelastic tax {level=2}
Demand $q = 100/p$ and supply $q = 2p$. A per-unit tax $t$ on sellers replaces supply by $q = 2(p_s) = 2(p_b - t)$, where $p_b$ is the buyer price. Using $F(p_b, t) = 100/p_b - 2(p_b - t) = 0$, compute $dp_b/dt$ at $t = 0$.
::: solution
At $t = 0$, $100/p = 2p$, $p^* = \sqrt{50} = 5\sqrt{2} \approx 7.071$. Now $F_p = -100/p^2 - 2$ and $F_t = 2$, so $dp_b/dt = -2 / (-100/p^2 - 2) = 2 / (2 + 100/p^2)$. At $t = 0$, $100/p^2 = 2$, so $dp_b/dt = 2/(2+2) = 1/2$. Buyers pay half of a small tax; the other half falls on sellers. (Isoelastic demand of elasticity $-1$ and linear supply of elasticity $1$ share a tax equally at the original equilibrium.)
:::
:::

::: exercise A two-input envelope {level=2}
A firm has $\pi(K, L; p) = p K^{1/3} L^{1/3} - 4K - L$, as in [[mathematical-economics/unconstrained-optimisation#ex-two-inputs]] with the $20$ replaced by a variable $p$. At the optimum of that example $p = 20$, $K^* = 500/27$, $L^* = 2000/27$. Compute $\partial\pi^*/\partial p$ by the envelope theorem, without re-solving the FOCs.
::: solution
The partial of $\pi$ with respect to $p$, holding $K,L$ at the optimum, is $K^{1/3} L^{1/3} = (500/27)^{1/3}(2000/27)^{1/3} = 100/9$, as computed in that example (where $p F = 2000/9$, so $F = 100/9$). Thus $d\pi^*/dp = 100/9 \approx 11.11$. This is Hotelling in two inputs: the derivative of profit with respect to the output price is output.
:::
:::

::: exercise Signing an own-price effect {level=2}
A household maximises $u(x,y) = \ln x + \ln y$ subject to $p x + y = m$ (the price of $y$ is 1). Find $x^*(p,m)$ and $\partial x^*/\partial p$. Is the effect negative? Decompose it, informally, into a substitution effect and an income effect.
::: solution
$x^* = m/(2p)$, so $\partial x^*/\partial p = -m/(2p^2) < 0$. Substitution: a higher $p$ makes $x$ dearer relative to $y$, which cuts $x$. Income: real income falls, and $x$ is normal, which cuts $x$ further. Both effects go the same way for this normal good; a Giffen good would need the income effect to dominate, which Cobb–Douglas cannot produce.
:::
:::

::: exercise Envelope with a constraint {level=3}
Let $v(a,m) = \max_{x,y} \bigl\{\, x^a y^{1-a} : p_x x + p_y y = m \,\bigr\}$ with $0 < a < 1$. Using the Lagrangian, compute $\partial v/\partial a$ at the optimum by the envelope theorem. Interpret the result in terms of $\ln x^* - \ln y^*$.
::: hint
$a$ enters the objective, not the constraint. The envelope derivative is $\partial\mathcal{L}/\partial a = x^a y^{1-a} \ln(x/y)$.
:::
::: solution
$\mathcal{L} = x^a y^{1-a} + \lambda(m - p_x x - p_y y)$. Then $\mathcal{L}_a = x^a y^{1-a} \bigl(\ln x - \ln y\bigr) = v \ln(x/y)$. At the Cobb–Douglas optimum $p_x x = a m$, $p_y y = (1-a)m$, so $x/y = \bigl(a/(1-a)\bigr)(p_y/p_x)$ and $\partial v/\partial a = v \ln\bigl( \tfrac{a}{1-a} \tfrac{p_y}{p_x} \bigr)$. Raising $a$ raises maximised utility if and only if $x^* > y^*$, that is if the household was already consuming more of the good whose exponent is rising. (This is a preference-parameter derivative, not a policy lever.)
:::
:::

::: exercise When the IFT fails {level=3}
Let $F(x, \theta) = x^2 - \theta$. For $\theta > 0$ there are two equilibria, $x = \pm\sqrt{\theta}$; at $\theta = 0$ they collide. Compute $F_x$ at $\theta = 0$ and explain why [[#thm-ift]] does not produce a $C^1$ branch through $(0,0)$ that can be continued to $\theta < 0$. Sketch what a fold looks like in the $(x,\theta)$-plane.
::: solution
$F_x = 2x$, which is zero at $(x,\theta) = (0,0)$. The hypothesis $F_x \neq 0$ fails. For $\theta > 0$ two real roots exist; for $\theta < 0$ none do. In the $(x,\theta)$-plane the locus $x^2 = \theta$ is a parabola on its side, with a fold at the origin. No $C^1$ function $x^*(\theta)$ can pass through the origin and remain real on both sides of $\theta = 0$. (One *can* follow either branch for $\theta > 0$, and each has $dx/d\theta = 1/(2x) \to \infty$ as $x \to 0$: the derivative blows up as the fold is approached.) Multiple-equilibrium models in macroeconomics often have this geometry at a saddle-node bifurcation.
:::
:::

