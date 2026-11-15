The Solow model takes the saving rate as a parameter. People do not. A household that can wait will save more when the return on capital is high and consume more when it is low, and a planner who cares about future generations will not pile up capital past the point at which extra machines yield less than the discount rate. The **Ramsey–Cass–Koopmans** model is the Solow model with that behaviour in place of $s$.

Frank Ramsey (1928, *Economic Journal*) posed the planner's problem; David Cass (1965, *Review of Economic Studies*) and Tjalling Koopmans (1965) recast it in modern optimal-control language and added population growth. The competitive equilibrium of a complete-markets economy with infinitely lived households coincides with the planner's path (under standard convexity), so the model is also a theory of the market. The golden rule of the last chapters is replaced by a **modified golden rule** that builds in impatience. Dynamic inefficiency of the Solow oversaving kind cannot occur: a household that was stacking capital with return below the discount rate would simply consume it.

The tools are the Euler equation and a two-dimensional phase diagram. Dynamic optimisation is developed in [[mathematical-economics/dynamic-optimisation]]; the phase plane is the same object as in the [Maths Atlas chapter on nonlinear systems](/a/maths/lesson.php?c=ode&l=nonlinear-systems). What follows is the workhorse of modern macroeconomics: the same Euler equation reappears in real-business-cycle models, in New Keynesian models as the dynamic IS curve, and in climate-economy models as the rule that prices the future. Getting it right, with the saddle and the modified golden rule attached, is the point of the chapter. The algebra is not more difficult than Solow's; the extra state of mind is that $c$ is chosen, not residual.

## The planner

A representative household, growing at rate $n$, has instantaneous utility $u(c)$ with $u'>0$, $u''<0$, and Inada conditions $u'(0)=\infty$, $u'(\infty)=0$. The planner discounts at rate $\rho > n$ and maximises

$$
\int_0^\infty e^{-(\rho-n)t} u\bigl(c(t)\bigr)\, dt
$$ {#eq-welfare}

subject to $\dot k = f(k) - \delta k - c - n k$, $k(0)$ given, $k\ge 0$, $c\ge 0$. (Population growth appears in the discount because welfare is over per-person utility of a growing clan; the constraint is capital per person.) Technical change is omitted until the end of the chapter; adding labour-augmenting $A$ at rate $g$ replaces $f'(k)$ by $f'(\tilde k)$ and $\rho$ by $\rho + \theta g$ in the formulae below, with $\theta$ the inverse intertemporal elasticity.

::: definition Isoelastic utility {#def-crra}
**Isoelastic** (CRRA) utility is

$$
u(c) = \frac{c^{1-\theta}-1}{1-\theta}, \qquad \theta > 0,\ \theta \neq 1,
$$

and $u(c)=\ln c$ if $\theta=1$. The parameter $\theta$ is the **coefficient of relative risk aversion** and the inverse of the **intertemporal elasticity of substitution**. The Euler equation below is written for this class; the phase diagram's qualitative properties survive for any $u$ with $u'>0>u''$.
:::

In this chapter $\theta$ is not a regression coefficient and not a CAPM beta. It is the curvature of $u$.

::: proposition The Keynes–Ramsey rule {#prop-euler}
An interior solution of the planner's problem satisfies the **Euler equation**

$$
\frac{\dot c}{c} = \frac{1}{\theta}\bigl(f'(k)-\delta-\rho\bigr)
$$ {#eq-euler}

together with the capital constraint

$$
\dot k = f(k)-(n+\delta)k - c
$$ {#eq-kdot-r}

and the **transversality condition** $\lim_{t\to\infty} e^{-(\rho-n)t} u'(c(t)) k(t) = 0$.
:::

::: proof
The current-value Hamiltonian is $\mathcal{H} = u(c) + \mu\bigl(f(k)-(n+\delta)k-c\bigr)$. First-order conditions: $u'(c)=\mu$ and $\dot\mu = (\rho-n)\mu - \mu\bigl(f'(k)-n-\delta\bigr)$. Differentiating $u'(c)=\mu$ and using $u''(c)\dot c = \dot\mu$ with isoelastic $u$ ($u''(c)c/u'(c)=-\theta$) yields [[#eq-euler]]. Transversality is the infinite-horizon boundary condition that the discounted value of capital goes to zero; without it, paths that accumulate capital forever at the expense of consumption could masquerade as candidates.
:::

The Euler equation is a no-arbitrage statement. The left-hand side is the required growth of consumption given curvature $\theta$. The right-hand side is the surplus of the net marginal product of capital over the discount rate. If capital is very productive, consumption should grow (it is worth waiting). If capital is unproductive relative to $\rho$, consumption should fall.

::: example A discrete-time Euler {#ex-discrete-euler}
A household with $u(c)=c^{1-\theta}/(1-\theta)$, $\theta=2$, $\beta=0.96$ (a one-year discount factor) faces a risk-free net return $r=0.08$. If $c_t=10$, what is $c_{t+1}$?
::: solution
The discrete Euler equation is $c_t^{-\theta} = \beta (1+r) c_{t+1}^{-\theta}$, or

$$
\frac{c_{t+1}}{c_t} = \bigl(\beta(1+r)\bigr)^{1/\theta} = (0.96\times 1.08)^{1/2} = 1.0182.
$$

So $c_{t+1}=10.18$. Consumption grows when $\beta(1+r)>1$, i.e. when the return exceeds the discount rate $1/\beta-1=0.0417$. At $r=0.04$ growth would be essentially zero: $(0.96\times 1.04)^{1/2}-1 = -0.0008$. The continuous-time analogue is $\dot c/c = (r-\rho)/\theta$ with $\rho\approx -\ln\beta$.
:::
:::

## The phase diagram

Equations [[#eq-euler]]–[[#eq-kdot-r]] are an autonomous planar system in $(k,c)$. The **$k$-nullcline** is $\dot k=0$, i.e. $c = f(k)-(n+\delta)k$, a hump that peaks at the golden-rule capital $k_{\mathrm{gold}}$ where $f'(k_{\mathrm{gold}})=n+\delta$. The **$c$-nullcline** is $\dot c=0$, i.e. $f'(k)=\rho+\delta$ (or $c=0$). Call that capital stock $k_{\mathrm{rck}}$: the **modified-golden-rule** stock.

::: definition Modified golden rule {#def-mgr}
The **modified-golden-rule** capital stock $k_{\mathrm{rck}}$ satisfies

$$
f'(k_{\mathrm{rck}}) = \rho + \delta
$$ {#eq-mgr}

in the model without technical change (and $f'(\tilde k_{\mathrm{rck}})=\rho+\delta+\theta g$ with labour-augmenting progress at rate $g$). Because $\rho>n$ (required for [[#eq-welfare]] to be finite at a steady state with constant $c$), one has $k_{\mathrm{rck}} < k_{\mathrm{gold}}$: the planner stops short of the golden rule by impatience.
:::

The two nullclines cross at a unique steady state $(k_{\mathrm{rck}}, c^*)$ in the interior. Linearisation of the system there produces one positive and one negative eigenvalue: a **saddle**. Exactly one trajectory, the **saddle path**, converges to the steady state. For each $k(0)$, the planner picks the unique $c(0)$ on that trajectory; any other $c(0)$ eventually hits $c=0$ or $k=0$ and violates transversality.

::: widget phaseplane
f: x^(1/3) - 0.05*x - y
g: (y/2)*((1/3)*x^(-2/3) - 0.07)
x: 0.4, 16
y: 0.05, 2.4
points: 2, 0.7; 2, 1.3; 10, 1.2; 10, 1.8; 10.4, 1.66
nullclines: true
caption: Ramsey phase plane for $f(k)=k^{1/3}$, $\theta=2$, $\rho=0.02$, $\delta=0.05$, $n=0$. The $k$-nullcline is the hump $c=f(k)-\delta k$; the $c$-nullcline is the vertical line $f'(k)=\rho+\delta=0.07$, at $k_{\mathrm{rck}}=10.39$. Click near the crossing: one trajectory feeds into the steady state (the saddle path). Starts that are too high in $c$ hit the $k=0$ axis; starts that are too low over-accumulate. The golden-rule peak of the hump is further right, at $k_{\mathrm{gold}}=17.2$.
:::

::: example Locating the steady state {#ex-locate}
For $f(k)=k^{1/3}$, $\theta=2$, $\rho=0.02$, $\delta=0.05$, $n=0$, compute $k_{\mathrm{rck}}$, $k_{\mathrm{gold}}$, $c^*$, and the implied long-run saving rate $s^* = 1-c^*/f(k_{\mathrm{rck}})$.
::: solution
$f'(k)=(1/3)k^{-2/3}=\rho+\delta=0.07$ gives $k^{-2/3}=0.21$, so $k^{2/3}=1/0.21=4.762$ and $k_{\mathrm{rck}}=4.762^{3/2}=10.39$. Golden-rule capital satisfies $f'(k)=\delta=0.05$, so $k_{\mathrm{gold}}=6.667^{3/2}=17.21$. Then $y^*=10.39^{1/3}=2.182$, $\delta k^*=0.519$, $c^*=1.663$, and $s^*=1-1.663/2.182=0.238$. Golden-rule consumption is $17.21^{1/3}-0.05\times 17.21=2.582-0.860=1.722$, slightly above $c^*$, as [[#def-mgr]] promised. The planner stops short of the golden rule because $\rho>0$.
:::
:::

::: intuition Why the saddle is the whole theory
$k$ is a state: it cannot jump. $c$ is a control: it can. Saddle-path stability is the statement that the household uses the jump in $c$ to put the economy on the unique path that is neither explosive in $k$ nor headed for $k=0$. A Solow household with fixed $s$ cannot make that jump; it crawls along $\dot k = sf(k)-(n+\delta)k$ even if that path is dynamically inefficient. The extra dimension is what rules out oversaving.
:::

## The competitive equilibrium

A competitive equilibrium with complete markets, a representative infinitely-lived household, and competitive firms renting capital and hiring labour replicates the planner.

Firms: $f'(k)=r+\delta$ (the rental covers interest and depreciation) and $f(k)-kf'(k)=w$. Households: the Euler equation $\dot c/c = (1/\theta)(r-\rho)$ and a budget constraint whose present-value form is the transversality condition. Combining, $r=f'(k)-\delta$ puts the market Euler onto [[#eq-euler]]. The goods-market identity $\dot k = f(k)-(n+\delta)k-c$ is the resource constraint. So $(k,c)$ follows the planner's saddle path.

This is a first welfare theorem for a dynamic economy: no externality, complete markets, convex technology, representative agent. It fails in the overlapping-generations model of the next chapter, where the infinite-lived agent's transversality condition is not present and overaccumulation can occur.

::: example A rise in $\delta$ {#ex-delta}
In the model of [[#ex-locate]] ($f(k)=k^{1/3}$, $\rho=0.02$, $n=0$), depreciation rises permanently from $0.05$ to $0.07$. Compute the new $k_{\mathrm{rck}}$ and say whether $c$ jumps up or down at the instant of the shock, starting from the old steady state.
::: solution
The new modified golden rule is $f'(k)=\rho+\delta=0.09$, so $(1/3)k^{-2/3}=0.09$, $k^{2/3}=3.704$, $k_{\mathrm{rck}}=3.704^{3/2}=7.13$, down from $10.39$. The $k$-nullcline $c=f(k)-\delta k$ also *falls*, because a given $k$ now supports less consumption. At the old $k=10.39$, which is now *above* the new $k_{\mathrm{rck}}$, the household wants to run capital down: $c$ jumps **up** (eat some of the capital that has become more expensive to maintain) and then both $c$ and $k$ decline along the new saddle path. Higher depreciation is a wealth loss, but the instantaneous jump in $c$ can be up because the alternative is to maintain a stock that no longer pays.
:::
:::

::: warning Discounting is not a market failure
A common complaint is that the planner (or the market) "underweights the future" because $\rho>0$ puts $k_{\mathrm{rck}}$ below $k_{\mathrm{gold}}$. Within the model that is a preference, not a failure: the household *wants* consumption now more than consumption later, and the market delivers that. Whether $\rho$ *should* be small is a normative question Ramsey himself agonised over, and it is not answered by the Euler equation. Climate-economy models that pick $\rho$ near zero (Stern 2007) versus $\rho$ near observed market returns (Nordhaus) are picking a point on this axis. Do not confuse a value judgement with a missed arbitrage.
:::

## Comparative statics and transitions

A rise in $\rho$ (more impatience) shifts the $c$-nullcline left: $k_{\mathrm{rck}}$ falls, $c^*$ may rise or fall depending on which side of the golden-rule hump one is on (usually fall, because $k_{\mathrm{rck}}$ is already below $k_{\mathrm{gold}}$). A rise in $\theta$ does not move the *steady state* in the model without $g$ (the Euler at $\dot c=0$ does not involve $\theta$), but it flattens the saddle path: consumption is less willing to jump, so more of a shock is absorbed by a slow transition in $k$.

With labour-augmenting technical change at rate $g$, the Euler on the balanced path requires $r = \rho + \theta g$, the **Ramsey-Keynes rule for balanced growth**. The real interest rate is pinned by preference parameters and $g$, not by $s$. That is a sharp prediction, and it is why the Ramsey model is the backbone of the neoclassical business-cycle and climate-economy literatures: $r$ is not a free residual.

::: example The real interest rate on a balanced path {#ex-r}
Take $\rho=0.02$, $\theta=2$, $g=0.02$. What is $r$ on the balanced path? If $\alpha=1/3$ and $\delta=0.05$, what is $\tilde k^*$? Compare with the Solow $\tilde k^*$ at $s=0.2$, $n=0.01$, $g=0.02$, $\delta=0.05$ from [[economic-growth/technology-and-growth-accounting#ex-balanced]].
::: solution
$r=\rho+\theta g=0.02+2\times 0.02=0.06$. Then $f'(\tilde k)=r+\delta=0.11$, so $(1/3)\tilde k^{-2/3}=0.11$, $\tilde k^{2/3}=3.030$, $\tilde k^*=3.030^{3/2}=5.275$. The Solow $\tilde k^*$ at $s=0.2$ was $3.95$. The Ramsey household, at these preference parameters, would choose a higher capital intensity than $s=0.2$ delivers — equivalently, a higher saving rate. Matching the two models is a calibration of $s$ (or of $\rho,\theta$), not a theorem.
:::
:::

::: quiz
In the Ramsey model without technical change, a rise in the discount rate $\rho$
- [ ] raises long-run $k$ because people save for a more impatient future
- [x] lowers long-run $k$, because $f'(k)=\rho+\delta$ requires a higher marginal product
- [ ] has no effect on $k$, only on $c$
- [ ] makes the steady state dynamically inefficient
::: solution
[[#eq-mgr]] shifts left. Impatience reduces accumulation. The new steady state remains below $k_{\mathrm{gold}}$ as long as $\rho>n$, so it is not dynamically inefficient. Dynamic inefficiency is a $k>k_{\mathrm{gold}}$ phenomenon, which this model cannot produce from a finite $\rho$.
:::
:::

## What the Ramsey model adds, and what it does not

It adds: an endogenous $s$ that responds to $r$; a welfare criterion; a reason the competitive path is efficient; a theory of $r$ on the balanced path; saddle-path transitional dynamics in which consumption jumps and capital crawls.

It does not add: a theory of $g$ (still exogenous); heterogeneity (a representative agent); incomplete markets; overlapping generations of finite lives; a government, unless one is put in by hand. Public debt is neutral here under the same conditions as Ricardian equivalence in [[macroeconomics/consumption-and-saving]]: the infinitely-lived household undoes it. In the next chapter debt is not neutral.

Empirically, the Ramsey model with a stable $\rho$ and $\theta$ has trouble with the *level* of $r$ over very long periods (the risk-free rate is low) and with the joint behaviour of $r$ and $g$ (the safe-asset literature, and the secular-stagnation debate, are in part a debate about $\rho$). Those are open questions. They are not a reason to return to a fixed $s$ when the question is efficiency.

## Where this leads

[[economic-growth/overlapping-generations]] drops infinite lives. The Euler equation then holds *within* a generation, not across all future time, and $k$ can exceed $k_{\mathrm{gold}}$. [[economic-growth/endogenous-growth]] keeps infinite lives (or a dynasty) and endogenises $g$. The business-cycle course [[business-cycles/real-business-cycles]] is the Ramsey model with shocks.

For education only — not investment or financial advice. The Euler equation is a description of a model household, not a recommendation about any person's consumption path.

::: history
**1928–1965, Ramsey, Cass, Koopmans.** Ramsey’s 1928 *EJ* paper, written at age 25, maximised an undiscounted integral of utility and obtained the rule that now bears his name; Keynes, as editor, wrote an introduction. The undiscounted objective required a special argument (later, the overtaking criterion) to rank paths. Cass (1965) and Koopmans (1965) introduced $\rho>0$, population, and the Hamiltonian apparatus. The saddle-path diagram is now so standard that it is easy to forget it is a 1960s object.
:::

::: summary
- The planner maximises $\int e^{-(\rho-n)t}u(c)\,dt$ subject to $\dot k=f(k)-(n+\delta)k-c$. The Euler equation is $\dot c/c=(1/\theta)(f'(k)-\delta-\rho)$.
- The steady state is the modified golden rule $f'(k)=\rho+\delta$, with $k_{\mathrm{rck}}<k_{\mathrm{gold}}$ whenever $\rho>n$.
- The $(k,c)$ system is a saddle. Consumption jumps onto the stable arm; capital does not jump.
- Complete markets and a representative infinite-lived household decentralise the planner. Dynamic inefficiency cannot occur.
- With technical change, $r=\rho+\theta g$ on the balanced path: the real interest rate is pinned by preferences and $g$.
:::

## Exercises

::: exercise Modified golden rule {level=1 check="39.0625"}
Let $f(k)=\sqrt{k}$, $\rho=0.03$, $\delta=0.05$, $n=0$. What is $k_{\mathrm{rck}}$? (Enter the exact decimal, for example 39.0625.)
::: solution
$f'(k)=0.5 k^{-1/2}=\rho+\delta=0.08$, so $k^{1/2}=0.5/0.08=6.25$ and $k_{\mathrm{rck}}=39.0625$.
:::
:::

::: exercise Golden versus modified {level=1}
In the previous exercise, compute $k_{\mathrm{gold}}$ and $c$ at both capital stocks. Which is larger?
::: solution
$f'(k_{\mathrm{gold}})=\delta=0.05$, so $0.5/\sqrt{k}=0.05$, $\sqrt{k}=10$, $k_{\mathrm{gold}}=100$. Then $c_{\mathrm{gold}}=\sqrt{100}-0.05\times 100=5$. At $k_{\mathrm{rck}}$, $c=\sqrt{39.0625}-0.05\times 39.0625=6.25-1.953=4.297$. Golden-rule consumption is larger, as the planner's impatience predicts.
:::
:::

::: exercise Euler growth {level=1}
With $\theta=2$, $\rho=0.02$ and $r=0.06$, at what rate does consumption grow (continuous time)?
::: solution
$\dot c/c = (r-\rho)/\theta = 0.04/2 = 0.02$, or 2 per cent a year.
:::
:::

::: exercise A jump in $c$ {level=2}
An economy is on its Ramsey saddle path. An unanticipated, permanent rise in $\rho$ occurs. In the phase diagram, which nullcline moves, which way, and does $c$ jump up or down at the instant of the shock if $k$ is predetermined at a value near the old steady state?
::: solution
The $c$-nullcline $f'(k)=\rho+\delta$ moves left ($k_{\mathrm{rck}}$ falls). The $k$-nullcline does not move. The new saddle path generally lies below the old one near the old $k_{\mathrm{rck}}$: at the old capital stock, the household wants to consume more *now* (it has become more impatient) and then run $k$ down. So $c$ jumps **up**, and $k$ declines toward the new, lower $k_{\mathrm{rck}}$. (If the old $k$ were far below even the new $k_{\mathrm{rck}}$, the jump could have the opposite sign; near the old steady state the upward jump in $c$ is the standard case.)
:::
:::

::: exercise Matching Solow {level=2}
On a Ramsey balanced path with $n=0$, $g=0$ and Cobb–Douglas $\alpha$, the implied saving rate is $s=\delta k/f(k)=\alpha\delta/(\rho+\delta)$. Compute $s$ at $\alpha=1/3$, $\delta=0.05$, $\rho=0.02$. Compare with the Solow $s=0.2$ of earlier chapters.
::: solution
$s = \alpha \delta/(\rho+\delta) = (1/3)(0.05)/0.07 = 0.01667/0.07 = 0.238$. This matches [[#ex-locate]]. It is a little above the illustrative Solow $s=0.2$: the Ramsey household at these parameters accumulates slightly more. To match $s=0.2$ one would raise $\rho$ to $\alpha\delta/s - \delta = (1/3)(0.05)/0.2 - 0.05 = 0.0833-0.05=0.033$.
:::
:::

::: exercise Transversality {level=2}
A candidate path has $k(t)$ growing at a positive rate forever, with $f'(k)-\delta$ approaching $r_\infty < \rho$. Why does it violate transversality under isoelastic utility?
::: solution
$u'(c)=c^{-\theta}$ and, with $r_\infty < \rho$, the Euler equation sends $c$ toward 0 at rate $(\rho-r_\infty)/\theta>0$, so $u'(c)$ *grows* at rate $\theta \times (\rho-r_\infty)/\theta = \rho-r_\infty$. The discounted shadow-value term $e^{-(\rho-n)t}u'(c)k$ then behaves like $e^{-(\rho-n)t} e^{(\rho-r_\infty)t} k(t) = e^{-(r_\infty-n)t}k(t)$ times a constant. If $k$ itself does not go to zero faster than $e^{(r_\infty-n)t}$, the product does not go to 0. In particular if $k$ converges to a constant above $k_{\mathrm{rck}}$ or grows, transversality fails. The condition rules out "accumulate forever, consume never" paths.
:::
:::

::: exercise Adding $g$ {level=3}
Introduce labour-augmenting technology at rate $g$. The planner maximises $\int e^{-(\rho-n)t}u(c)\,dt$ with $c$ consumption *per person*, and $\tilde k = k/A$ the state (here $k=K/L$). Derive the balanced-path Euler condition $r=\rho+\theta g$ for isoelastic $u$. Then, with $\rho=0.01$, $\theta=1$ (log), $g=0.02$, $\delta=0.05$, $\alpha=1/3$, compute $\tilde k^*$ and $r$.
::: hint
On a balanced path $c$ grows at $g$, so $\dot c/c=g$. The Euler is $\dot c/c=(1/\theta)(f'(\tilde k)-\delta-\rho)$.
:::
::: solution
Isoelastic Euler: $\dot c/c = (1/\theta)\bigl(f'(\tilde k)-\delta-\rho\bigr)$. Balanced growth of $c$ at rate $g$ forces $g=(1/\theta)(r-\rho)$ with $r=f'(\tilde k)-\delta$, hence $r=\rho+\theta g$. Numbers: $r=0.01+1\times 0.02=0.03$, $f'(\tilde k)=0.03+0.05=0.08$, $(1/3)\tilde k^{-2/3}=0.08$, $\tilde k^{2/3}=4.167$, $\tilde k^*=4.167^{3/2}=8.51$. Log utility ($\theta=1$) produces a lower $r$ and a higher $\tilde k^*$ than $\theta=2$ did in [[#ex-r]], because the household is more willing to substitute intertemporally and so accumulates more when $g$ requires consumption to grow.
:::
:::

::: exercise Efficiency in one paragraph {level=3}
A Solow economy with $s>\alpha$ is dynamically inefficient. A Ramsey economy with the same technology and $n$, $\delta$ cannot be. Using the Euler equation and the definition of $k_{\mathrm{gold}}$, explain why in a short paragraph aimed at someone who has read [[economic-growth/solow-model]] but not this chapter.
::: solution
Dynamic inefficiency is $k>k_{\mathrm{gold}}$, i.e. $f'(k)<n+\delta$. The Ramsey household's Euler equation at a steady state (no technical change) requires $f'(k)=\rho+\delta$. The integral of discounted utility converges only if $\rho>n$, so $f'(k)=\rho+\delta > n+\delta$, which is $k<k_{\mathrm{gold}}$. The household would not choose to hold capital that yields less than $\rho$: it would eat it. The Solow $s$ that produced overaccumulation is simply not an Euler-equation $s$. Infinite lives plus a complete market for claims on future output are the institutions that make that refusal possible; they are what the next chapter removes.
:::
:::
