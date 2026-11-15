Education is expensive, and it raises wages. The human-capital explanation, taken up in [[labour-economics/human-capital]], is that school makes people more productive. Michael Spence asked a different question: suppose school does *not* raise productivity at all — it is a lock-in of time, a sequence of examinations, a credential — could it still raise wages? Yes, if it is cheaper for more able people to sit through, and if employers cannot see ability directly. Education then works as a **signal**: a costly action that conveys information because the people for whom it is cheap are also the people the employer wants to hire. The used-car seller of the previous chapter could not make her peach believed; the worker in this chapter can, by choosing a credential that a lemon-worker would not copy.

The idea is broader than schools. Warranties, advertising, debt, dividends, and the length of a guarantee are all potential signals. The job-market model is the cleanest place to see the logic, the multiplicity of equilibria, and the refinement that selects among them. It is a signalling game in the sense of [[game-theory/signalling]], specialised to a labour market with competitive employers and a continuous education choice.

## The Spence game

A worker has ability $\theta \in \{\theta_L, \theta_H\}$, with $0 < \theta_L < \theta_H$. Ability is the worker’s productivity: a type-$\theta$ worker produces $\theta$ in any job. The worker knows $\theta$; employers do not. The prior probability of the high type is $\lambda \in (0, 1)$, commonly known. Before entering the labour market the worker chooses an education level $e \ge 0$ at a cost $c(e, \theta)$ that is increasing and strictly convex in $e$, with $c(0, \theta) = 0$. Education does not enter production: it is pure signal. Employers observe $e$, form a belief $\mu(e) = \Prob(\theta = \theta_H \mid e)$, and offer a wage equal to expected productivity given that belief, because employers are competitive and risk-neutral and make zero profit.

::: definition Spence signalling game {#def-spence}
The **Spence job-market signalling game** has the following timing.

1. Nature draws the worker’s type $\theta \in \{\theta_L, \theta_H\}$ with $\Prob(\theta_H) = \lambda$.
2. The worker, knowing $\theta$, chooses education $e \ge 0$ and pays $c(e, \theta)$.
3. Employers observe $e$ (not $\theta$), form a belief $\mu(e)$, and bid the wage up to expected productivity $w(e) = \mu(e)\,\theta_H + \bigl(1-\mu(e)\bigr)\theta_L$.
4. The worker’s payoff is $w(e) - c(e, \theta)$. The employed firm’s payoff is $\theta - w(e)$.

A **perfect Bayesian equilibrium** is a pair of strategies $(e_L, e_H)$ and a belief $\mu(\cdot)$ such that each type chooses $e$ to maximise $w(e) - c(e, \theta)$ given $w(e) = \E[\theta \mid e]$, and $\mu$ is Bayes-consistent on the path of play. Off the path, $\mu(e) \in [0, 1]$ is unrestricted by Bayes’ rule and is part of the equilibrium.
:::

The wage schedule $w(e)$ is pinned down on the path by competition: if only low types choose $e$, the wage is $\theta_L$; if only high types do, it is $\theta_H$; if both do, it is the prior mean $\bar\theta = \lambda\theta_H + (1-\lambda)\theta_L$. Off the path the wage can be anything in $[\theta_L, \theta_H]$, depending on the belief the equilibrium assigns to that unused $e$. That freedom is why there are many equilibria.

The engine of the model is a single-crossing property: at any $(e, w)$, the low type’s indifference curve is steeper than the high type’s, so a small increase in education, compensated by a small increase in the wage, is more attractive to the high type.

::: definition Single crossing {#def-single-crossing}
The cost function $c(e, \theta)$ satisfies **single crossing** (the Spence–Mirrlees condition) if the marginal cost of education is strictly decreasing in type:

$$
\frac{\partial^2 c}{\partial e\,\partial \theta} < 0.
$$

Equivalently, the marginal rate of substitution between wage and education, $c_e(e, \theta)$, is strictly decreasing in $\theta$. Indifference curves of different types therefore cross at most once.
:::

Two families used below both satisfy single crossing: the linear cost $c(e, \theta) = e/\theta$ and the quadratic cost $c(e, \theta) = e^2/(2\theta)$. In each case a more able worker finds it cheaper, at the margin, to acquire another unit of $e$. That is an assumption, not a theorem. It is plausible if ability makes studying easier; it is less plausible if “ability” is a family connection that does not help in the classroom. The whole of signalling stands or falls with some version of this ranking.

::: intuition Why the cheap type is the one who signals
A signal is not a statement, and it is not a certificate that the school is willing to print for anyone. It is an action whose cost differs by type. The employer who sees a high $e$ infers high ability *because a low-ability worker would have found that $e$ too expensive for the wage it buys*. If the cost did not differ by type, anyone could mimic anyone, and the action would convey nothing. Cheap talk — a costless statement “I am high ability” — is not a signal in this sense; it is discussed in [[game-theory/signalling]].
:::

## Separating equilibria

In a **separating** equilibrium the two types choose different education levels, so the employer infers type perfectly from $e$. The low type, once identified, is paid $\theta_L$. Because education is costly and does not raise productivity, the low type then chooses $e_L = 0$: any positive $e$ would be a pure waste. The high type chooses some $e_H > 0$ and is paid $\theta_H$. For this to be optimal for both types, two incentive constraints must hold.

::: proposition Separating education {#prop-separating}
Assume single crossing and $c(0, \theta) = 0$. In any separating perfect Bayesian equilibrium, $e_L = 0$ and $e_H$ lies in an interval $[\underline{e}, \overline{e}]$, where $\underline{e}$ is the smallest $e$ that the low type will not mimic,

$$
\theta_L \ge \theta_H - c(e, \theta_L) \quad\Leftrightarrow\quad c(e, \theta_L) \ge \theta_H - \theta_L,
$$ {#eq-ic-low}

and $\overline{e}$ is the largest $e$ that the high type prefers to being paid $\theta_L$ at $e = 0$,

$$
\theta_H - c(e, \theta_H) \ge \theta_L.
$$ {#eq-ic-high}

Single crossing implies $\underline{e} \le \overline{e}$, so the interval is non-empty. Off-path beliefs that support any such $e_H$ exist: for example, $\mu(e) = 1$ for $e \ge e_H$ and $\mu(e) = 0$ otherwise.
:::

::: proof
If $e_L > 0$, the low type could cut education to 0 and still be paid at least $\theta_L$ (the worst off-path belief), a profitable deviation; so $e_L = 0$ and $w(0) = \theta_L$. The high type’s choice $e_H$ must not be envied by the low type, which is [[#eq-ic-low]], and must be better for the high type than taking $e = 0$ and the low wage, which is [[#eq-ic-high]]. (Any other deviation by the high type to some $e \ne e_H$ can be deterred by giving that $e$ a pessimistic belief.)

To see that $\underline{e} \le \overline{e}$, rewrite the two constraints as $c(\underline{e}, \theta_L) = \theta_H - \theta_L$ and $c(\overline{e}, \theta_H) = \theta_H - \theta_L$. The same cost increment $\theta_H - \theta_L$ is required of both types; because $c(\cdot, \theta_H)$ lies below $c(\cdot, \theta_L)$ and is less steep, it reaches that increment at a larger $e$. Hence the interval is non-empty.

The stated off-path beliefs make $w(e) = \theta_H$ for $e \ge e_H$ and $w(e) = \theta_L$ otherwise. The low type then faces a wage jump of $\theta_H - \theta_L$ at $e_H$, which [[#eq-ic-low]] says is not worth the cost, and the high type’s best point on this step function is $e_H$ itself by [[#eq-ic-high]] and the fact that extra education beyond $e_H$ is costly.
:::

Among these equilibria one is distinguished: the **Riley** (or least-cost separating) outcome, in which $e_H = \underline{e}$. All other separating equilibria waste still more education to send the same message. We return to the selection of $\underline{e}$ after a pair of numerical examples.

::: example Linear cost, least-cost separation {#ex-linear-sep}
Let $\theta_L = 1$, $\theta_H = 2$, $\lambda = 1/2$ and $c(e, \theta) = e/\theta$. Find the interval of separating education levels for the high type, the Riley outcome, and each type’s equilibrium payoff. Compare with the complete-information benchmark, in which $\theta$ is public and education is not chosen.
::: solution
The low-type incentive constraint is $1 \ge 2 - e/1$, hence $e \ge 1$. The high-type constraint is $2 - e/2 \ge 1$, hence $e \le 2$. Separating equilibria have $e_L = 0$ and $e_H \in [1, 2]$. The Riley outcome is $e_H = 1$. Payoffs: the low type receives $w - c = 1$; the high type receives $2 - 1/2 = 1.5$.

Under complete information both types choose $e = 0$ (education is unproductive) and are paid their productivity, so payoffs are 1 and 2. Signalling costs the high type $0.5$ in extra education and costs the low type nothing. Total expected surplus falls from $\bar\theta = 1.5$ to $1.5 - \lambda \cdot (1/2) = 1.25$. The missing $0.25$ is the resource cost of the signal, a deadweight loss.
:::
:::

::: example Quadratic cost {#ex-quadratic-sep}
Keep $\theta_L = 1$, $\theta_H = 2$, $\lambda = 1/2$, but now $c(e, \theta) = e^2/(2\theta)$. Find the Riley education of the high type and both types’ payoffs.
::: solution
Low-type IC: $1 \ge 2 - e^2/2$, so $e^2 \ge 2$ and $e \ge \sqrt{2}$. High-type IC: $2 - e^2/4 \ge 1$, so $e^2 \le 4$ and $e \le 2$. The Riley level is $e_H = \sqrt{2} \approx 1.414$. The high type’s cost is $(\sqrt{2})^2 / 4 = 2/4 = 1/2$, so her payoff is $2 - 1/2 = 1.5$. The low type’s payoff is 1. The numbers match [[#ex-linear-sep]] for payoffs, with a different education unit. Expected deadweight loss is again $\lambda \times 1/2 = 1/4$.
:::
:::

The high type’s payoff of $1.5$ in both examples is not a coincidence of the arithmetic. In the Riley outcome the low type’s incentive constraint binds, so the high type is held to the payoff that just stops mimicry. With two types that payoff happens to equal $\theta_H - (\theta_H - \theta_L) \cdot c_e(\underline{e}, \theta_H)/c_e(\underline{e}, \theta_L)$, which for both of the cost families above is $1.5$.

::: widget plot
f: 1 + x*x/2; 1.5 + x*x/4; 2
x: 0, 2.4
y: 0, 4.2
labels: \text{low type }U=1; \text{high type }U=1.5; w=\theta_H
points: 0,1; 1.414,2
caption: Indifference curves in $(e, w)$-space for the quadratic costs of [[#ex-quadratic-sep]]. The low type’s curve through $(0, 1)$ hits $w = 2$ at $e = \sqrt{2}$; the high type’s curve through $(\sqrt{2}, 2)$ is flatter, so she strictly prefers that point to $(0, 1)$. The Riley outcome is the point of tangency-from-below of the low type’s indifference curve with the high wage line.
:::

## Pooling equilibria

In a **pooling** equilibrium both types choose the same $e = \hat e$, so the employer learns nothing and pays the prior mean $\bar\theta = \lambda\theta_H + (1-\lambda)\theta_L$. For pooling at $\hat e$ to be an equilibrium, neither type must want to deviate to some other $e$, given the off-path beliefs. The most pessimistic off-path belief — $\mu(e) = 0$ for all $e \ne \hat e$, so $w(e) = \theta_L$ off the path — is the one that makes pooling easiest to support, because it makes deviation least attractive.

::: proposition Pooling at zero {#prop-pooling}
Under the pessimistic off-path belief $w(e) = \theta_L$ for $e \ne \hat e$, pooling at $\hat e$ is an equilibrium if and only if both types prefer $(\hat e, \bar\theta)$ to $(0, \theta_L)$ and to any other $e$ paid $\theta_L$. In particular, pooling at $\hat e = 0$ is always an equilibrium under that belief: both types receive $\bar\theta$ and education is free, which dominates being paid $\theta_L$ at any positive $e$.
:::

::: proof
At $\hat e = 0$ the payoff is $\bar\theta$ for both types. A deviation to $e > 0$ yields at most $\theta_L - c(e, \theta) < \theta_L < \bar\theta$. So neither type deviates. For $\hat e > 0$ the same comparison must be made against $(0, \theta_L)$: the high type (who has the lower cost) is the one who might prefer to drop education and take $\theta_L$, and the constraint $\bar\theta - c(\hat e, \theta_H) \ge \theta_L$ bounds how large $\hat e$ can be.
:::

Pooling at zero is efficient: no resources are spent on a useless signal, and the worker is paid her expected product. It is also informationally uninformative. The high type would like to break the pool if she can be believed; the low type would like to stay in it. Whether the pool *can* be broken depends on what employers believe when they see an unexpected $e$. That is a question the equilibrium concept, as stated in [[#def-spence]], does not answer: any off-path belief in $[0, 1]$ is allowed. The intuitive criterion, below, restricts those beliefs.

::: example A pooling wage and a tempting deviation {#ex-pool-break}
In the quadratic example of [[#ex-quadratic-sep]], with $\lambda = 1/2$ so $\bar\theta = 1.5$, consider pooling at $\hat e = 0$. The high type’s payoff is $1.5$. Compare this with her Riley payoff. Then suppose she contemplates a deviation to $e = \sqrt{2}$. For which off-path beliefs is that deviation profitable?
::: solution
The Riley payoff was also $1.5$, so at these parameters the high type is indifferent between pooling at zero and least-cost separation. (If $\lambda$ were larger, $\bar\theta$ would be closer to 2 and pooling at zero would be strictly better for her; if $\lambda$ were smaller, Riley would be better.)

A deviation to $e = \sqrt{2}$ costs her $1/2$ and yields wage $w = \mu(\sqrt{2})\cdot 2 + \bigl(1-\mu(\sqrt{2})\bigr)\cdot 1 = 1 + \mu(\sqrt{2})$. The deviation payoff is $1 + \mu - 1/2 = 1/2 + \mu$, which exceeds $1.5$ if and only if $\mu > 1$. That is impossible. So at $\lambda = 1/2$ the high type does *not* want to deviate to the Riley education, whatever employers believe about it. (She would want to deviate to a *smaller* $e$ if that $e$ were believed to come from her: the cost would be lower and a belief $\mu = 1$ would still pay 2.)

Now change the prior to $\lambda = 1/4$, so $\bar\theta = 1.25$. Pooling at zero pays 1.25. Deviating to $\sqrt{2}$ with belief $\mu = 1$ pays $2 - 1/2 = 1.5 > 1.25$. The high type will break the pool if she is believed. The intuitive criterion, next, says she *should* be believed, because the low type would not follow her even at the most optimistic wage.
:::
:::

::: quiz
In the Spence model with two types, which statement is correct?
- [ ] Every equilibrium is efficient, because wages equal expected productivity.
- [x] Separating equilibria waste education; the Riley outcome is the least wasteful among them, but pooling at zero wastes none.
- [ ] The low type chooses positive education in a separating equilibrium, to avoid being confused with the high type.
- [ ] Single crossing is optional: without it, the same separating interval exists but is harder to compute.
::: solution
Wages equal expected productivity by competition, but education is a real cost. That cost is a deadweight loss in any separating equilibrium; it is zero in pooling at $e = 0$. The low type sets $e_L = 0$ when separating. Single crossing is what makes the separating interval non-empty; without it the high type may be unable to choose an $e$ that the low type will not copy.
:::
:::

## The intuitive criterion and the Riley outcome

Cho and Kreps (1987) proposed a restriction on off-path beliefs that has become the standard refinement for this game. The idea is that an unexpected action should not be attributed to a type who could not possibly gain from it, even under the most favourable belief.

::: definition Intuitive criterion {#def-intuitive}
Fix an equilibrium with payoffs $U_\theta^*$ for each type. An off-path action $e$ **fails the intuitive criterion** if there is a type $\theta$ for whom $e$ is equilibrium-dominated — $w - c(e, \theta) < U_\theta^*$ for every feasible wage $w \in [\theta_L, \theta_H]$ — and the other type $\theta'$ strictly gains from $e$ whenever employers, having deleted $\theta$, assign probability one to $\theta'$. An equilibrium **survives the intuitive criterion** if no such $e$ exists.
:::

In the two-type Spence game the criterion does a great deal of work.

::: proposition Riley is the unique intuitive equilibrium {#prop-riley}
Assume single crossing, two types, and the Spence game of [[#def-spence]]. The unique perfect Bayesian equilibrium that survives the intuitive criterion is the Riley (least-cost separating) outcome: $e_L = 0$, $e_H = \underline{e}$ as defined in [[#eq-ic-low]]. Every pooling equilibrium and every separating equilibrium with $e_H > \underline{e}$ fails the criterion.
:::

::: proof
Take a pooling equilibrium at $\hat e$, with payoffs $U_L = \bar\theta - c(\hat e, \theta_L)$ and $U_H = \bar\theta - c(\hat e, \theta_H)$. By single crossing there exists an $e$ slightly above the low type’s indifference curve through $(\hat e, \bar\theta)$ and slightly below the high type’s. At that $e$ the low type loses even if paid $\theta_H$, so the intuitive criterion deletes the low type; the high type then gains if paid $\theta_H$. The pool is broken.

Take a separating equilibrium with $e_H > \underline{e}$. The high type can deviate to some $e \in (\underline{e}, e_H)$. The low type would not follow even at wage $\theta_H$, by definition of $\underline{e}$; the high type gains, because she obtains the same wage $\theta_H$ at a lower cost. The intuitive criterion deletes the low type at that $e$ and the deviation succeeds.

The Riley outcome itself survives. Any deviation $e \in (0, \underline{e})$ is profitable for the low type if it is paid $\theta_H$, so the criterion does not delete the low type, and a belief that puts weight on the low type can (and in equilibrium does) make the deviation unattractive to the high type. Deviations $e > \underline{e}$ are costly for the high type and unnecessary. Deviations by the low type away from 0 are never profitable on the equilibrium wage schedule.
:::

The Riley outcome is not efficient — the high type still over-educates relative to complete information — but it is the unique prediction of the standard refinement. With more than two types the same logic produces a unique least-cost separating profile, in which the lowest type chooses $e = 0$ and each higher type chooses the cheapest $e$ that the type just below will not mimic. The over-education of the top type then compounds down the ladder: each type’s incentive constraint, binding against the type below, pushes the next type further out.

::: warning Signalling is not screening
In this chapter the *informed* party moves first: the worker chooses $e$, then employers bid. That is signalling. In the next chapter the *uninformed* party moves first: an insurer or a monopolist offers a menu of contracts, and the informed party self-selects. That is screening. The mathematics is close — both rest on single crossing and incentive compatibility — but the equilibrium constructions differ, and so does who captures the surplus. A common confusion is to call every contract that sorts types a “signal”. Reserve that word for an action taken by the informed side before the uninformed side commits to a price.
:::

::: widget plot
f: 1 + x/a; 1.5 + x/(2*a)
sliders: a=1:0.5:2:0.1
x: 0, 3
y: 0, 5
labels: \text{low type through }(0,1); \text{high type through }(0,1.5)
caption: Linear-cost indifference curves $w = U + e/\theta$, with $\theta_L = 1$, $\theta_H = 2$. The slider $a$ scales both costs (a lower $a$ is a cheaper signal). The low type’s curve through $(0, 1)$ hits $w = 2$ at $e = a$; that is the Riley education. Flatten the costs (raise $a$) and the required signal grows. Signalling is more wasteful when it is *harder*, not when it is easier: a cheap signal must be sent in a larger quantity to keep the low type from copying it.
:::

## Human capital, sheepskin and evidence

Spence’s question was rhetorical: he did not claim that education is unproductive. He claimed that *some* of the return to education can be a return to information rather than to skill, and that the two are not identified by the wage–schooling gradient alone. A year of school that raises wages by 10 per cent could be a 10 per cent productivity gain, a 10 per cent information gain, or any mix. Separating them is an empirical task, and it is unfinished.

Several patterns are at least consistent with a signalling component. **Sheepskin effects** — discrete wage jumps at diploma years, larger than the jumps at adjacent years — were documented by Hungerford and Solon (1987) and Jaeger and Page (1996) in US Census data. A human-capital model with a smooth production function does not predict a jump at year 16 that is missing at year 15; a signalling model does, if employers use the degree as the signal. Tyler, Murnane and Willett (2000) compared US workers who obtained a GED credential by just passing the exam with those who just failed, and found a wage return to the credential for some groups, which is a sheepskin in a regression-discontinuity design. Clark and Martorell (2014), using high-school exit exams in Texas, found little wage return to the diploma itself once scores were controlled, a result they read as evidence against a pure sheepskin at that margin.

A second family of tests uses **changes in the signalling environment**. Lang and Kropp (1986) argued that a compulsory-schooling law, which forces low types to acquire more education, should (if education is a signal) push high types to acquire still more, in order to keep the separation; a pure human-capital model has no such spillover. They found evidence of those spillovers in US compulsory-schooling variation. Bedard (2001) used variation in university access across Canadian provinces. In a signalling model, restricting university access mixes would-be university types into the high-school-graduate pool, which raises the wage attached to a high-school credential and so reduces dropping out of high school; opening access should increase dropouts. She found that pattern.

Arteaga (2018) studied a Colombian university reform that reduced the coursework required for a degree in economics and business without (on her evidence) reducing human capital much; wages of subsequent graduates fell, consistent with employers reading the degree as a weaker signal.

None of this says that human capital is negligible. Instrumental-variable estimates of the return to schooling — Angrist and Krueger (1991) on quarter of birth, Oreopoulos (2006) on British compulsory schooling, among many others — typically find returns of the same order as OLS, around 6 to 12 per cent per year in high-income countries, which is hard to reconcile with a model in which school is pure lock-in. The natural reading is that both channels operate: school produces skill *and* sorts. The models of this chapter isolate the second channel so that it can be seen; they are not a claim that the first is zero. [[labour-economics/human-capital]] takes up the measurement.

Outside the labour market the same structure has been applied to **warranties** (a longer warranty is cheaper for a seller who knows the product will not fail), **advertising** (Milgrom and Roberts 1986: a high-quality seller is more willing to burn money on an advertisement, because she expects repeat purchases), and **capital structure** (Ross 1977: a manager who knows the firm is sound is more willing to take on debt). In each case the test is single crossing: the good type must have a lower marginal cost of the action, or a higher marginal benefit.

::: application Warranties as a signal of quality
A manufacturer knows whether a product fails with probability $0.1$ (sound) or $0.4$ (fragile). Repairing a failure costs 10. A full warranty therefore costs the sound manufacturer $1$ in expectation and the fragile manufacturer $4$. Buyers cannot observe quality but can observe the warranty. If a full warranty is offered only by the sound type, buyers pay the sound-type price for a warranted unit; the fragile type copies only if the price gain exceeds the extra warranty cost of $3$. A one-year warranty on a used car, or a ten-year warranty on a boiler, can be read this way — with the caveat that a warranty is also insurance, so it mixes signalling with the risk-sharing of [[microeconomics/uncertainty]]. The last exercise of the chapter puts numbers on the incentive constraint.
:::

## Where this leads

Signalling is the informed party’s answer to Akerlof’s problem: spend resources to be believed. The uninformed party has a different answer, which is to offer a menu and let types sort themselves. That is screening, and it is the next chapter. The two together are the hidden-information half of the course.

With more than two types, or a continuum, the Riley ladder of binding incentive constraints becomes a differential equation, the same equation that appears in monopoly screening and in mechanism design. The revelation principle of [[information-economics/mechanism-design]] will say that any signalling equilibrium can be recast as a direct mechanism in which the worker reports a type and is assigned an $(e, w)$ pair; the assignment must be incentive-compatible. Signalling, screening and mechanism design are three languages for one constraint.

::: history
Michael Spence’s “Job Market Signaling” appeared in the *Quarterly Journal of Economics* in 1973, from his Harvard PhD thesis; a book, *Market Signaling*, followed in 1974. A. Michael Spence was then at Harvard and later at Stanford. The multiplicity of equilibria was recognised immediately; Riley (1975, 1979) proposed the least-cost separating outcome as the natural selection, and Cho and Kreps (1987) gave that selection a non-equilibrium-belief foundation, the intuitive criterion, in a paper whose leading application was Spence’s game. Parallel work on insurance (Rothschild and Stiglitz 1976) and on education as human capital (Becker, Mincer) meant that from the mid-1970s onwards the return to schooling was read in two incompatible ways. Spence shared the 2001 Nobel Prize with Akerlof and Stiglitz.
:::

::: summary
- In Spence’s game, education is a pure signal: it does not raise productivity, but it is cheaper for high-ability workers. Employers pay expected productivity given the observed education.
- Single crossing ($c_{e\theta} < 0$) makes sorting possible. Separating equilibria have $e_L = 0$ and $e_H$ in an interval; the Riley outcome is the least-cost end of that interval.
- Pooling equilibria exist too, including efficient pooling at $e = 0$, under pessimistic off-path beliefs.
- The intuitive criterion selects the Riley outcome uniquely in the two-type game. High types over-educate relative to complete information; that over-education is a deadweight loss.
- Empirically, sheepskin effects and some reform studies are consistent with a signalling component of the return to schooling; IV estimates of that return are also consistent with human capital. Both channels can operate at once.
:::

## Exercises

::: exercise Linear-cost interval {level=1 check="2"}
In the model of [[#ex-linear-sep]], $\theta_L = 1$, $\theta_H = 2$, $c(e, \theta) = e/\theta$. What is the *largest* high-type education that can appear in a separating equilibrium? (Enter that number.)
::: solution
The high-type incentive constraint is $2 - e/2 \ge 1$, so $e \le 2$. The largest such education is 2.
:::
:::

::: exercise Riley payoff {level=1 check="1.5"}
In the same linear-cost model, the Riley outcome has $e_H = 1$. What is the high type’s payoff? (Enter it.)
::: solution
Wage 2 minus cost $1/2$ equals $1.5$.
:::
:::

::: exercise Prior mean {level=1 check="1.6"}
Types are $\theta_L = 1$ and $\theta_H = 2$, and the prior probability of the high type is $\lambda = 0.6$. What wage is paid in a pooling equilibrium? (Enter the pooling wage.)
::: solution
$w = 0.6 \times 2 + 0.4 \times 1 = 1.2 + 0.4 = 1.6$.
:::
:::

::: exercise Quadratic IC {level=2}
Let $\theta_L = 1$, $\theta_H = 3$ and $c(e, \theta) = e^2/(2\theta)$. Find the Riley education of the high type and both types’ payoffs in the Riley outcome.
::: hint
The low type must not prefer $(e_H, 3)$ to $(0, 1)$.
:::
::: solution
Low-type IC: $1 \ge 3 - e^2/2$, so $e^2/2 \ge 2$, $e^2 \ge 4$, $e \ge 2$. High-type IC: $3 - e^2/6 \ge 1$, so $e^2/6 \le 2$, $e^2 \le 12$, $e \le \sqrt{12} = 2\sqrt{3} \approx 3.464$. Riley: $e_H = 2$. High-type cost is $4/(6) = 2/3$, payoff $3 - 2/3 = 7/3$. Low-type payoff is 1.
:::
:::

::: exercise When pooling beats Riley {level=2}
In the quadratic model of [[#ex-quadratic-sep]] ($\theta_L = 1$, $\theta_H = 2$, $c = e^2/(2\theta)$), the high type’s Riley payoff is $1.5$. For which priors $\lambda$ does the high type strictly prefer pooling at $e = 0$ to Riley separation? Does the intuitive criterion care about her preference?
::: solution
Pooling at zero pays $\bar\theta = \lambda \cdot 2 + (1-\lambda)\cdot 1 = 1 + \lambda$. This exceeds $1.5$ when $\lambda > 1/2$. So if high types are a majority, they would rather sit in an uninformative pool than pay for a signal. The intuitive criterion nevertheless rejects the pool, for every $\lambda \in (0, 1)$: the argument in [[#prop-riley]] never used the value of $\lambda$, only single crossing. The refinement can therefore select an outcome that the high type does not like. (Whether that is a strength or a weakness of the criterion is a standing discussion.)
:::
:::

::: exercise A productive signal {level=2}
Suppose education raises productivity as well as signalling: a type-$\theta$ worker who chooses $e$ produces $\theta + e$ and pays $c(e, \theta) = e^2/(2\theta)$, with $\theta_L = 1$, $\theta_H = 2$. Under complete information, what $e$ would each type choose? In a Riley-style separating equilibrium with $e_L$ at the complete-information level, write the low-type incentive constraint that determines $e_H$.
::: solution
Under complete information the wage equals $\theta + e$, so type $\theta$ maximises $\theta + e - e^2/(2\theta)$. The first-order condition is $1 = e/\theta$, hence $e = \theta$: the low type chooses 1 and the high type chooses 2. Productivities are 2 and 4, payoffs are $2 - 1/2 = 1.5$ and $4 - 4/4 = 3$.

In a separating equilibrium the low type still chooses her complete-information $e_L = 1$ (she is identified, and 1 is myopically optimal given wage $\theta_L + e$). The high type must choose $e_H > 2$ large enough that the low type will not mimic. The low type who mimics receives wage $\theta_H + e_H = 2 + e_H$ and pays $e_H^2/2$, so the IC is

$$
1.5 \ge 2 + e_H - \frac{e_H^2}{2}.
$$

That is $e_H^2/2 - e_H - 0.5 \ge 0$. The relevant root greater than 2 is $e_H = 1 + \sqrt{2} \approx 2.414$. The high type over-educates relative to her complete-information choice of 2, but by less than she did when education was unproductive. Mixing human capital with signalling reduces, without eliminating, the distortion.
:::
:::

::: exercise Three types {level=3}
Types $\theta \in \{1, 2, 3\}$ are equally likely, $c(e, \theta) = e/\theta$, and education is unproductive. Construct the least-cost separating (Riley) profile: $e_1$, $e_2$, $e_3$ and the three payoffs. Verify that type 1 does not want to mimic type 2, that type 2 does not want to mimic type 3, and that type 1 does not want to mimic type 3.
::: hint
Set $e_1 = 0$. Bind type 1’s IC against type 2 to get $e_2$, then bind type 2’s IC against type 3 to get $e_3$.
:::
::: solution
Type 1 is paid 1 at $e_1 = 0$, payoff 1.

Type 2 is paid 2 at $e_2$, and type 1’s IC binds: $1 = 2 - e_2/1$, so $e_2 = 1$. Type 2’s cost is $1/2$, payoff $2 - 0.5 = 1.5$.

Type 3 is paid 3 at $e_3$, and type 2’s IC binds: $1.5 = 3 - e_3/2$, so $e_3/2 = 1.5$, $e_3 = 3$. Type 3’s cost is $3/3 = 1$, payoff $3 - 1 = 2$.

Type 1 mimicking type 3: payoff $3 - 3/1 = 0 < 1$, so the non-adjacent IC is slack. (This is a general fact under single crossing: it is enough to check local constraints.) Type 3 mimicking type 2: $2 - 1/3 = 5/3 < 2$, not tempting. Type 3 mimicking type 1: $1 - 0 = 1 < 2$. Type 2 mimicking type 1: $1 < 1.5$. All constraints hold.

Expected education cost is $(1/3)(0 + 1/2 + 1) = 1/2$, which is the deadweight loss per worker. Under complete information the loss would be zero.
:::
:::

::: exercise Warranties {level=3}
A sound product fails with probability $0.1$, a fragile one with probability $0.4$. Repair costs 10. Buyers are risk-neutral and value a working unit at 50 and a failed-and-unrepaired unit at 0; they do not observe quality but observe the warranty coverage $x \in [0, 1]$, the fraction of the repair that the seller pays. Production cost is 20 for both types (so quality is not a cost difference in manufacture, only in failures). The seller’s expected cost of warranty $x$ is $10 p x$. Assume competitive buyers, so the price of a product believed to be sound is $50 - 10\times 0.1 = 49$ without a warranty, wait — if the warranty covers $x$, the buyer’s expected value is $50 - (1-x) \cdot 10 p$ minus the price... Simplify: let the price be the buyer’s expected value given beliefs and $x$.

Show that a full warranty $x = 1$ offered only by the sound type is a separating equilibrium if the fragile type’s gain from being mistaken for sound, net of the extra warranty cost, is negative. Compute that net gain.
::: hint
If the fragile type mimics, she receives the sound-type price and pays the fragile-type warranty cost.
:::
::: solution
With a full warranty the buyer is fully insured against failure: she receives a working unit for sure (the seller repairs). Her willingness to pay is 50, regardless of $p$. A sound seller who offers $x = 1$ and is believed has expected profit $50 - 20 - 10\times 0.1 = 29$. A fragile seller who is identified and offers $x = 0$ (no warranty) faces willingness to pay $50 - 10\times 0.4 = 46$, profit $46 - 20 = 26$.

If the fragile type mimics — offers $x = 1$ and is believed to be sound — she receives 50 and pays production plus warranty $20 + 10\times 0.4 = 24$, profit $26$. That equals her separating payoff of 26, so she is indifferent. The net gain from mimicry is $26 - 26 = 0$. The separating configuration is (weakly) incentive-compatible. If repair costs were slightly higher for the fragile type, or if buyers paid a shade less than 50 for a warranted unit of uncertain origin, the inequality would be strict. This is the Riley boundary: the bad type is just willing to copy, and a slightly richer warranty, or a slightly larger cost gap, would make separation strict.
:::
:::

::: exercise Destroying education {level=3}
Spence’s original paper noted that a social planner who wants to maximise surplus might wish to *tax* education, or even to destroy some of it, because in a separating equilibrium education is already excessive. In the linear-cost model of [[#ex-linear-sep]], suppose a planner can cap education at some $\bar e < 1$. What happens to the set of equilibria? Can the planner raise expected surplus relative to Riley? Can she reach the complete-information surplus?
::: solution
Riley requires $e_H = 1$. If the cap is $\bar e < 1$, the low type’s IC cannot hold at any feasible $e_H$: $c(e, \theta_L) = e < 1 = \theta_H - \theta_L$. Separation is impossible. The remaining candidates are pooling equilibria at some $\hat e \le \bar e$. Pooling at 0 is feasible and has expected surplus $\bar\theta = 1.5$, which is the complete-information surplus and is strictly larger than Riley’s $1.25$. So a harsh enough cap, by making separation infeasible, can *raise* surplus, provided the market then pools rather than shutting down. The planner cannot, however, force pooling: she can only remove the separating option. Off-path beliefs might still try to support other (wasteful) pooling at $\hat e > 0$ below the cap; the intuitive criterion would then push toward pooling at 0, which is the surplus-maximising outcome.

This is a case in which an intervention that looks anti-education is, inside the pure-signalling model, pro-efficiency. Once education also produces human capital, as in the earlier exercise, the same cap has a cost, and the optimum is interior. The model is a warning against reading every year of school as surplus, not a recommendation to close schools.
:::
:::
