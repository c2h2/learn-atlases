A tenant farmer’s harvest depends on the weather and on how carefully the field was tended. The landlord sees the harvest, not the tending. If the tenant is paid a fixed wage, she bears no risk and has no reason to tend; if she pays a fixed rent, she bears all the risk, including the weather she cannot control. Sharecropping — a split of the harvest — sits in between. That is the **principal–agent problem** under **moral hazard**: a hidden action, a noisy signal, and a contract that has to buy effort without loading too much risk onto the person who acts.

The same structure is a manager’s bonus, a surgeon’s malpractice rule, an insurer’s deductible, and a regulator’s price cap. The agent’s type may be known; what is not known is what she *does* after the contract is signed. The mathematics is a constrained optimisation, as in [[mathematical-economics/constrained-optimisation]]: maximise the principal’s payoff subject to the agent’s participation and incentive-compatibility constraints. The recurring lesson is that the first-best — efficient effort and efficient risk sharing at once — is not attainable, and that the second-best contract uses every informative signal, including signals that are not themselves valuable output.

## Hidden action

::: definition Moral hazard {#def-moral-hazard}
**Moral hazard** (hidden action) is a contractual situation in which, after the contract is signed, one party takes a payoff-relevant action that the other does not observe. The uninformed party — the **principal** — sees only a noisy signal of the action, typically an output $x$, and can write a contract $w(x)$ on that signal. The informed party — the **agent** — chooses the action to maximise her own expected payoff given $w$.
:::

The insurance origin of the phrase is the tendency of the insured to take less care. The modern usage is broader and does not require a moral failing: a worker who slacks because her wage does not depend on output is in a moral-hazard problem whether or not she is blameworthy. What matters is the information constraint.

::: definition Principal–agent problem {#def-pa}
A (static, hidden-action) **principal–agent problem** consists of:

- a principal, risk-neutral unless stated otherwise, with payoff $x - w$;
- an agent with von Neumann–Morgenstern utility $u(w)$ strictly increasing and weakly concave, and a private cost $\psi(e)$ of action $e \in E$, with $\psi$ strictly increasing;
- a signal $x$ with conditional density (or probability) $f(x \mid e)$;
- an outside option giving the agent reservation utility $\bar u$;
- a contract $w(\cdot)$ offered by the principal, after which the agent chooses $e$ and $x$ is realised.

The principal maximises $\E[x - w(x) \mid e]$ subject to the agent’s **participation** (individual-rationality) constraint $\E[u(w(x)) \mid e] - \psi(e) \ge \bar u$ and the agent’s **incentive-compatibility** constraint that $e$ maximise $\E[u(w(x)) \mid e'] - \psi(e')$ over $e' \in E$.
:::

If $e$ were observable, the principal could write $w$ as a function of $e$ (or force a recommended $e$ by a harsh penalty) and the IC would drop out. That **first-best** problem is ordinary risk sharing.

::: proposition First-best risk sharing {#prop-first-best}
Suppose the principal is risk-neutral, the agent is strictly risk-averse ($u'' < 0$), and $e$ is observable. Then the optimal contract implements the efficient action $e^*$ and pays a **constant** wage $w^*$ satisfying $u(w^*) - \psi(e^*) = \bar u$. The efficient action maximises $\E[x \mid e] - c_{\text{FB}}(e)$, where $c_{\text{FB}}(e)$ is the certain wage that delivers $\bar u + \psi(e)$.
:::

::: proof
For a given $e$, the principal must deliver expected utility $\bar u + \psi(e)$ at minimum expected wage. By Jensen’s inequality, $\E[u(w(x))] \le u(\E[w])$, with equality if and only if $w$ is constant, so the cheapest way to deliver a given expected utility is full insurance. The constant $w^*$ that does so is $u^{-1}(\bar u + \psi(e))$. The principal then chooses $e$ to maximise $\E[x \mid e] - u^{-1}(\bar u + \psi(e))$.
:::

Full insurance and incentives pull in opposite directions. Any contract that makes the agent’s pay depend on $x$, in order to make $e$ attractive, also makes the agent bear risk she is worse at bearing than the principal. The second-best contract is the best compromise.

::: warning Moral hazard is not adverse selection
A health insurer who cannot tell the sick from the healthy faces adverse selection ([[information-economics/asymmetric-information]]). A health insurer who cannot tell whether the insured took care, *after* enrolment, faces moral hazard. Experience rating, deductibles and co-payments are instruments for the second problem; underwriting, mandates and risk-adjustment are instruments for the first. Mixing the labels mixes the instruments.
:::

## Binary effort

The trade-off is visible in a two-action, two-output example that can be solved by hand. Let $e \in \{0, 1\}$, with cost $0$ or $\psi > 0$. Output is $x_L < x_H$, with $p_e = \Prob(x_H \mid e)$ and $p_1 > p_0$. Wages are $w_L, w_H \ge 0$ in the two output states. The agent’s utility of money is $u$, strictly increasing and strictly concave. The principal wants to implement $e = 1$ (we will check that this is worthwhile).

Participation and incentive compatibility, with $e = 1$ intended, are

$$
p_1 u(w_H) + (1-p_1) u(w_L) - \psi \ge \bar u, \qquad \bigl(p_1 - p_0\bigr)\bigl(u(w_H) - u(w_L)\bigr) \ge \psi.
$$ {#eq-binary-ir-ic}

The IC says that the gain in expected utility of money from working must cover the cost. Because $p_1 > p_0$, this requires $u(w_H) > u(w_L)$: a bonus in the good state.

::: proposition Second-best binary contract {#prop-binary}
Assume $u' > 0$, $u'' < 0$, and that implementing $e = 1$ is optimal. At the second-best contract both constraints in [[#eq-binary-ir-ic]] bind. The implied utility levels $u_H = u(w_H)$ and $u_L = u(w_L)$ are

$$
u_H = \bar u + \psi + (1-p_1)\frac{\psi}{p_1 - p_0}, \qquad u_L = \bar u + \psi - p_1\frac{\psi}{p_1 - p_0},
$$

and wages are $w_H = u^{-1}(u_H)$, $w_L = u^{-1}(u_L)$. Expected wage exceeds the first-best wage $u^{-1}(\bar u + \psi)$, by a Jensen gap that is the agency cost of risk.
:::

::: proof
The principal’s cost is $p_1 w_H + (1-p_1) w_L = p_1 u^{-1}(u_H) + (1-p_1) u^{-1}(u_L)$, strictly convex in $(u_H, u_L)$ because $u^{-1}$ is strictly convex. The two constraints are linear in $(u_H, u_L)$. At an interior minimum both bind (a slack IR would allow a uniform cut in utility; a slack IC would allow a mean-preserving contraction of $(u_L, u_H)$, which a risk-averse agent and a convex cost of utility both welcome). Solving the two linear equations gives the stated $u_H, u_L$. Jensen’s inequality then says $p_1 w_H + (1-p_1) w_L > u^{-1}(p_1 u_H + (1-p_1) u_L) = u^{-1}(\bar u + \psi)$.
:::

::: example Square-root utility {#ex-sqrt}
Let $u(w) = \sqrt{w}$, $\psi = 1$, $\bar u = 7$, $p_1 = 2/3$, $p_0 = 1/3$, and output $x_H = 210$, $x_L = 30$. Compute the first-best wage and profit if $e = 1$ is implemented, the second-best wages, the expected second-best wage, and the second-best profit. Confirm that the principal prefers to implement $e = 1$ rather than $e = 0$ at the first-best, and that this ranking survives at the second-best.
::: solution
First-best, $e = 1$: $\sqrt{w} - 1 = 7$, so $\sqrt{w} = 8$, $w = 64$. Expected output is $(2/3)\times 210 + (1/3)\times 30 = 140 + 10 = 150$. Profit is $150 - 64 = 86$. First-best, $e = 0$: $\sqrt{w} = 7$, $w = 49$, expected output $(1/3)\times 210 + (2/3)\times 30 = 70 + 20 = 90$, profit $90 - 49 = 41$. So $e = 1$ is the first-best action.

Second-best: $\Delta p = 1/3$, and [[#prop-binary]] gives

$$
\sqrt{w_H} = 7 + 1 + \bigl(1-\tfrac23\bigr)\frac{1}{1/3} = 8 + \tfrac13 \cdot 3 = 9, \qquad \sqrt{w_L} = 8 - \tfrac23 \cdot 3 = 8 - 2 = 6.
$$

Wages: $w_H = 81$, $w_L = 36$. Expected wage $(2/3)\times 81 + (1/3)\times 36 = 54 + 12 = 66$. Profit $150 - 66 = 84$. The agency cost is $66 - 64 = 2$, or equivalently $86 - 84 = 2$.

Implementing $e = 0$ at the second-best is the same as the first-best (no incentive problem), profit 41, which is still worse than 84. The principal implements $e = 1$ and pays the extra 2.
:::
:::

The numbers are chosen so that IC and IR can be read off without a calculator: $\sqrt{w_H} - \sqrt{w_L} = 3$ and $\Delta p \times 3 = 1 = \psi$; the expected utility of money is $(2/3)\times 9 + (1/3)\times 6 = 8 = \bar u + \psi$.

::: widget plot
f: 8 + 2*(x-2/3); 8
x: 0, 1
y: 4, 12
labels: \text{binding IC through FB}; \text{first-best utility}
caption: Not the contract itself, but the idea of [[#prop-binary]]. Horizontal axis is $p = \Prob(x_H)$. The first-best delivers utility of money 8 at every $p$ (horizontal line). The second-best, to raise the slope enough that a move from $p_0 = 1/3$ to $p_1 = 2/3$ is worth $\psi = 1$, must tilt: utility 6 at $p = 0$ and 9 at $p = 1$. The tilt is costly because $u^{-1}$ is convex.
:::

## The likelihood ratio and informative signals

With more than two outputs the same logic produces Holmström’s characterisation. Write $u_x = u(w(x))$. The principal minimises $\E[w(x) \mid e]$ subject to IR and IC. Using the first-order approach — replacing IC by the requirement that the agent’s expected utility be stationary in $e$ — the pointwise first-order condition for $w(x)$ is

$$
\frac{1}{u'(w(x))} = \lambda + \mu \frac{f_e(x \mid e)}{f(x \mid e)},
$$ {#eq-likelihood}

where $\lambda, \mu \ge 0$ are multipliers on IR and IC, and $f_e/f$ is the **likelihood ratio** of the signal. (Mirrlees, Holmström 1979, and Rogerson 1985 give conditions under which the first-order approach is valid; the monotone likelihood-ratio property, $f_e/f$ increasing in $x$, is the headline one, and it makes $w(x)$ increasing.)

::: theorem Informativeness principle {#thm-informativeness}
Let $x$ be output and $s$ an additional signal, with joint density $f(x, s \mid e)$. In the first-order characterisation [[#eq-likelihood]], the optimal wage $w(x, s)$ is independent of $s$ if and only if $f(x, s \mid e)$ factors so that $s$ is uninformative about $e$ given $x$ — that is, $s$ is a **sufficient statistic** for $e$ together with $x$, or is independent of $e$ given $x$. Any signal that is informative about the action, even if it is not itself valuable output, has positive value in the contract.
:::

::: proof
The first-order condition with two signals is $1/u'(w(x,s)) = \lambda + \mu f_e(x,s \mid e)/f(x,s \mid e)$. The right-hand side is independent of $s$ for all $(x, s)$ if and only if $f_e/f$ is. That is equivalent to $\partial/\partial s \log f(\cdot \mid e)$ being independent of $e$, i.e. to $s$ being uninformative about $e$ given $x$. If the ratio depends on $s$, a wage that ignores $s$ cannot satisfy the condition, so the constrained-optimal $w$ uses $s$.
:::

The theorem is the reason a firm looks at a manager’s *relative* performance, not only at the firm’s own profit; the reason an insurer uses experience rating; and the reason a teacher’s bonus might be tied to students’ scores *net of* the school’s average. A signal that is pure noise, or that is a deterministic function of $x$, is useless. A signal that moves beliefs about $e$ is useful even if it has no direct payoff.

::: example Relative performance {#ex-relative}
Two divisions produce $x_i = e_i + \varepsilon + \eta_i$, $i = 1, 2$, where $\varepsilon$ is a common shock (the market, the weather) and $\eta_i$ are independent idiosyncratic shocks. The principal observes both outputs. Show, informally, that the contract for manager 1 should depend on $x_1 - x_2$, and that if $\eta_i = 0$ (only common shocks) the first-best can be restored.
::: solution
The difference $x_1 - x_2 = e_1 - e_2 + \eta_1 - \eta_2$ is independent of $\varepsilon$. Conditioning on $x_2$ therefore filters out the common shock from $x_1$. Holmström’s theorem says that $x_2$, being informative about $e_1$ given $x_1$ (because of $\varepsilon$), belongs in manager 1’s contract. In the extreme $\eta_i = 0$, one has $x_1 - x_2 = e_1 - e_2$ exactly, so effort is observed and the first-best contract of [[#prop-first-best]] is feasible: pay a constant wage, and punish any difference $x_1 - x_2$ that is inconsistent with the recommended efforts. Common shocks, however large, are then harmless. This is the theoretical case for **yardstick competition** (Shleifer 1985) and for the relative-performance evaluation used in executive pay.
:::
:::

## Limited liability and the linear-exponential-normal contract

Two further workhorse models are used constantly in applications.

**Limited liability.** If the agent is risk-neutral ($u(w) = w$) but wages cannot be negative, the first-best is again out of reach whenever the agent is poor. Implementing $e = 1$ requires $w_H - w_L \ge \psi / (p_1 - p_0)$ by IC, and $w_L \ge 0$ by limited liability. The cheapest contract sets $w_L = 0$ and $w_H = \psi / (p_1 - p_0)$. Expected wage is $p_1 \psi / (p_1 - p_0) > \psi$, so the agent earns a **limited-liability rent** $p_0 \psi / (p_1 - p_0)$ above her cost. The principal may then choose not to implement high effort, even though high effort is efficient, because the rent is too expensive. Credit rationing and the under-provision of incentives in start-ups are often told in this language: the agent cannot be made to pay in the bad state.

::: example A risk-neutral agent who cannot be fined {#ex-ll}
Let $\psi = 12$, $p_1 = 0.8$, $p_0 = 0.2$, $\bar u = 0$, $x_H = 100$, $x_L = 0$, $u(w) = w$ and $w \ge 0$. Compute the first-best cost of $e = 1$, the second-best wages, the agent’s rent, and both profits.
::: solution
First-best: pay 12 for sure (or any lottery with mean 12), profit $\E[x \mid 1] - 12 = 80 - 12 = 68$. Second-best: $w_L = 0$, $w_H = 12 / 0.6 = 20$. Expected wage $0.8 \times 20 = 16$. Rent $16 - 12 = 4$, which equals $p_0 \psi / \Delta p = 0.2 \times 12 / 0.6 = 4$. Profit $80 - 16 = 64$. Agency cost 4. Implementing $e = 0$ costs 0 and yields 20, profit 20, which is worse. The principal implements $e = 1$ and leaves the rent.
:::
:::

**Linear-exponential-normal (LEN).** Holmström and Milgrom (1987) showed that in a continuous-time model with exponential (CARA) utility and Brownian noise, the optimal contract is linear in cumulative output. The static LEN model takes that linearity as a restriction and delivers closed forms used throughout organisational economics. The agent has CARA utility with coefficient $r > 0$, cost $\psi(e) = e^2/2$, and output $x = e + \varepsilon$ with $\varepsilon \sim \mathcal{N}(0, \sigma^2)$. A linear contract $w = \alpha + \beta x$ gives certainty equivalent $\alpha + \beta e - \tfrac12 r \beta^2 \sigma^2 - e^2/2$. The agent chooses $e = \beta$. Substituting into the principal’s problem (the principal is risk-neutral and sets $\alpha$ to bind IR) yields

$$
\beta^* = \frac{1}{1 + r\sigma^2}.
$$ {#eq-len-beta}

The incentive share $\beta$ is decreasing in risk aversion $r$ and in noise $\sigma^2$. First-best would like $\beta = 0$ for insurance and $e = 1$ for effort, which a linear contract cannot combine unless $\sigma = 0$. When $\sigma = 0$, a contract with $\beta = 1$ implements $e = 1$ and there is no risk to share; when $\sigma > 0$, the second-best $\beta^*$ lies in $(0, 1)$.

::: proposition LEN incentive intensity {#prop-len}
In the LEN model with $w = \alpha + \beta x$, $x = e + \varepsilon$, $\varepsilon \sim \mathcal{N}(0,\sigma^2)$, CARA coefficient $r$ and cost $e^2/2$, the optimal slope is [[#eq-len-beta]] and the implemented effort is $e = \beta^*$. First-best effort is $e = 1$. Expected surplus is $\dfrac{1}{2(1+r\sigma^2)}$, against a first-best surplus of $1/2$.
:::

::: proof
The agent’s certainty equivalent is $\alpha + \beta e - \tfrac12 r \beta^2 \sigma^2 - e^2/2$. Maximising in $e$ gives $e = \beta$. The principal’s expected profit is $e - \E[w] = e - \alpha - \beta e$. Binding IR sets the certainty equivalent to 0 (reservation 0), so $\alpha = -\beta e + \tfrac12 r \beta^2 \sigma^2 + e^2/2$. Substitute $e = \beta$:

$$
\pi = \beta - \tfrac12 r \beta^2 \sigma^2 - \tfrac12 \beta^2.
$$

The first-order condition $1 - r\sigma^2 \beta - \beta = 0$ gives [[#eq-len-beta]]. Surplus equals $\pi$ because the agent’s CE is 0. Substituting $\beta^*$ gives $1/(2(1+r\sigma^2))$. First-best: $e - e^2/2$ maximised at $e = 1$, surplus $1/2$, with the principal bearing all risk by a constant wage.
:::

::: example A numerical LEN contract {#ex-len}
Let $r = 1$ and $\sigma^2 = 1$. Compute $\beta^*$, $e$, the risk premium, and first-best and second-best surplus. What happens to $\beta^*$ if the noise variance doubles?
::: solution
$\beta^* = 1/(1+1) = 1/2$, so $e = 1/2$. The risk premium is $\tfrac12 r \beta^2 \sigma^2 = \tfrac12 \cdot 1 \cdot \tfrac14 \cdot 1 = 1/8$. Effort cost is $(1/2)^2/2 = 1/8$. Expected output is $1/2$. Surplus is $1/2 - 1/8 - 1/8 = 1/4$, matching $1/(2\cdot 2) = 1/4$. First-best surplus is $1/2$. Agency cost is $1/4$.

If $\sigma^2 = 2$, $\beta^* = 1/(1+2) = 1/3$. Incentives weaken as the signal gets noisier, which is [[#thm-informativeness]] in closed form: a noisier $x$ is less informative about $e$, so the contract puts less weight on it.
:::
:::

::: widget plot
f: 1/(1+r*x)
sliders: r=1:0.2:4:0.1
x: 0, 4
y: 0, 1.05
labels: \beta^*(r,\sigma^2)
caption: LEN incentive intensity $\beta = 1/(1+r\sigma^2)$ against noise variance $\sigma^2$. Drag risk aversion $r$. At $\sigma^2 = 0$ the agent is the residual claimant ($\beta = 1$); as noise or risk aversion grows, the contract moves toward a salary ($\beta \to 0$). That is the risk–incentive trade-off in one curve.
:::

::: intuition Sell the firm, except for risk
If the agent were risk-neutral, the first-best would be to “sell the firm”: set $\beta = 1$, $\alpha = -\E[x \mid e^*] + \bar u + \psi(e^*)$, and let the agent choose. Risk aversion is the only reason not to. The LEN formula is that sentence made quantitative: $\beta$ is 1 minus a discount for risk, and the discount is $r\sigma^2/(1+r\sigma^2)$.
:::

## Evidence

Sharecropping, the opening example, was studied as a moral-hazard contract by Stiglitz (1974) and, in a development setting, by a large empirical literature. Binswanger and Rosenzweig (1986) and, later, Banerjee, Gertler and Ghatak (2002) on tenancy reform in West Bengal, document that the share, the tenant’s wealth (limited liability) and the crop’s riskiness move together in the direction [[#eq-len-beta]] predicts: poorer, more risk-averse tenants, and noisier crops, are associated with lower-powered shares. Randomised experiments that change monitoring — for example, Duflo, Hanna and Ryan (2012) on teacher attendance in Rajasthan, with cameras as a monitor — find that making the action more observable raises the action, which is the informativeness principle in the field.

Executive pay is the other large laboratory. Jensen and Murphy (1990) estimated that US CEOs in the 1970s–80s received about \$3.25 of extra wealth per \$1,000 of extra shareholder value, a $\beta$ of 0.00325, which they read as too low for incentives; Hall and Liebman (1998) found much higher sensitivities once options were included, and the subsequent literature (surveyed in Edmans, Gabaix and Jenter 2017) has argued both that $\beta$ is still small relative to [[#eq-len-beta]] with plausible $r$ and $\sigma$, and that it is the right order of magnitude once the CEO’s risk aversion and the firm’s volatility are taken seriously. Relative performance evaluation is used, but less than [[#ex-relative]] would suggest, a standing puzzle. None of these numbers is a recommendation about how executives should be paid; they are measurements of existing contracts, to be read against the model.

Insurance moral hazard is identified when a change in coverage, holding the pool fixed, changes claims. Einav, Finkelstein, Ryan, Schrimpf and Cullen (2013) used a large US employer’s health-insurance menu and found a substantial “moral hazard” elasticity of spending to coverage, distinct from the adverse-selection movement of the pool. Auto-insurance deductibles and workers’ compensation experience rating have similar, usually smaller, estimated elasticities. The two information problems of this course, selection and hidden action, are both present in the same markets and have to be estimated together.

## Where this leads

Once the agent has several actions, or several periods, or several agents, the binary and LEN templates have to be rewritten. Multitasking, career concerns, tournaments and relational contracts are the next chapter. If the action is an *investment* that cannot be contracted on because the future state cannot be described, the problem is no longer moral hazard in the Holmström sense but an incomplete contract, and the instrument is ownership rather than a wage; that is [[information-economics/incomplete-contracts]].

The same first-order condition [[#eq-likelihood]] reappears in mechanism design when the hidden object is a type rather than an action: the likelihood ratio is replaced by a virtual valuation. Seeing both as “pay according to how much the observation changes the principal’s inference” is the right unification.

::: history
The phrase “moral hazard” is from the nineteenth-century insurance industry. The modern principal–agent model is due to James Mirrlees (notes from the 1970s; published 1999), Steven Shavell (1979), and Bengt Holmström’s “Moral Hazard and Observability” (*Bell Journal of Economics*, 1979), which gave the likelihood-ratio characterisation and the informativeness principle. Sanford Grossman and Oliver Hart (1983) recast the problem as a two-stage optimisation — implementability of actions, then the cost of each action — which is the organisation of [[#prop-binary]]. Holmström and Paul Milgrom (1987) derived linear contracts in continuous time, and their 1991 multitask paper, taken up in the next chapter, showed why the LEN $\beta$ can be zero even when a signal exists. Holmström shared the 2016 Nobel Prize with Hart.
:::

::: summary
- Moral hazard: hidden action after the contract. The principal sees a noisy signal and writes $w(\cdot)$ on it.
- First-best, with a risk-averse agent and a risk-neutral principal: constant wage, efficient action. Incentives and insurance conflict as soon as the action is hidden.
- Binary second-best: both IR and IC bind; the agent is rewarded in the good state and (unless limited liability binds) punished in the bad state; expected wage exceeds the first-best.
- Holmström’s informativeness principle: use every signal that shifts beliefs about the action; relative performance evaluation is the leading application.
- Limited liability produces rents and can lead the principal to implement too little effort. LEN gives $\beta = 1/(1+r\sigma^2)$: incentives weaken with risk aversion and noise.
:::

## Exercises

::: exercise First-best wage {level=1 check="64"}
In [[#ex-sqrt]], the first-best contract implementing $e = 1$ pays a constant wage. What is that wage? (Enter it.)
::: solution
$\sqrt{w} - 1 = 7$ gives $w = 64$.
:::
:::

::: exercise Second-best bonus {level=1 check="81"}
In the same example, what is the second-best wage in the high-output state? (Enter it.)
::: solution
$\sqrt{w_H} = 9$, so $w_H = 81$.
:::
:::

::: exercise LEN slope {level=1 check="0.25"}
In the LEN model, $r = 1$ and $\sigma^2 = 3$. What is $\beta^*$? (Enter it as a decimal.)
::: solution
$\beta^* = 1/(1+3) = 1/4 = 0.25$.
:::
:::

::: exercise Agency cost {level=2 check="2"}
In [[#ex-sqrt]], what is the agency cost of implementing $e = 1$ (the gap between second-best expected wage and first-best wage)? (Enter it.)
::: solution
Expected second-best wage 66, first-best 64, gap 2.
:::
:::

::: exercise Limited-liability rent {level=2}
A risk-neutral agent with $\bar u = 0$ and $w \ge 0$ has $\psi = 6$, $p_1 = 3/4$, $p_0 = 1/4$. Compute $w_H$, $w_L$, expected wage if $e = 1$ is implemented, and the rent. If expected output at $e = 1$ is 20 and at $e = 0$ is 5, does the principal implement $e = 1$?
::: solution
$w_L = 0$, $w_H = 6 / (1/2) = 12$. Expected wage $(3/4)\times 12 = 9$. Rent $9 - 6 = 3$. Profit at $e = 1$: $20 - 9 = 11$. Profit at $e = 0$: $5 - 0 = 5$. Yes, implement $e = 1$.
:::
:::

::: exercise CARA certainty equivalent {level=2}
An agent with CARA coefficient $r = 2$ faces a linear contract $w = 4 + 0.4 x$, with $x = e + \varepsilon$ and $\varepsilon \sim \mathcal{N}(0, 1)$. Cost is $e^2/2$. Compute her certainty equivalent as a function of $e$, her chosen $e$, and the CE at that $e$.
::: hint
The CARA certainty equivalent of a normal lottery $m + \sigma Z$ is $m - \tfrac12 r \sigma^2$.
:::
::: solution
Given $e$, $w$ is normal with mean $4 + 0.4 e$ and variance $0.16$. CE $= 4 + 0.4 e - \tfrac12 \cdot 2 \cdot 0.16 - e^2/2 = 4 + 0.4 e - 0.16 - e^2/2$. She maximises $0.4 e - e^2/2$, so $e = 0.4$. CE at $e = 0.4$: $4 + 0.16 - 0.16 - 0.08 = 3.92$. (The risk premium ate the expected bonus, and effort cost is $0.08$.)
:::
:::

::: exercise Likelihood ratio in the binary model {level=3}
In the two-output model the analogue of $f_e/f$ is a difference of probabilities, not a derivative. Using the Kuhn–Tucker conditions on [[#eq-binary-ir-ic]] with convex cost $u^{-1}$, show that

$$
\frac{1}{u'(w_H)} = \lambda + \mu \frac{p_1 - p_0}{p_1}, \qquad \frac{1}{u'(w_L)} = \lambda - \mu \frac{p_1 - p_0}{1-p_1},
$$

and compare with [[#eq-likelihood]]. Interpret $(p_1-p_0)/p_1$ as a likelihood ratio.
::: solution
Minimise $p_1 u^{-1}(u_H) + (1-p_1) u^{-1}(u_L)$ subject to $p_1 u_H + (1-p_1) u_L - \psi \ge \bar u$ and $(p_1-p_0)(u_H - u_L) \ge \psi$. Let $\lambda, \mu$ be the multipliers. Differentiating in $u_H$:

$$
p_1 \cdot \frac{1}{u'(w_H)} = \lambda p_1 + \mu (p_1 - p_0) \quad\Rightarrow\quad \frac{1}{u'(w_H)} = \lambda + \mu \frac{p_1-p_0}{p_1}.
$$

Differentiating in $u_L$:

$$
(1-p_1)\frac{1}{u'(w_L)} = \lambda(1-p_1) - \mu(p_1-p_0) \quad\Rightarrow\quad \frac{1}{u'(w_L)} = \lambda - \mu \frac{p_1-p_0}{1-p_1}.
$$

The discrete likelihood of $e = 1$ versus $e = 0$ given $x_H$ is $p_1 / p_0$; the *increment* $(p_1 - p_0)/p_1 = 1 - p_0/p_1$ is the analogue of $f_e/f$ for a two-point action. It is positive at $x_H$ and negative at $x_L$, so $w_H > w_L$, as we already knew. This is [[#eq-likelihood]] in the binary model.
:::
:::

::: exercise When not to implement high effort {level=3}
In the limited-liability model, $u(w) = w$, $w \ge 0$, $\bar u = 0$, $\psi = 12$, $p_1 = 0.8$, $p_0 = 0.2$ as in [[#ex-ll]], but now $x_H = 18$, $x_L = 0$. Compute profits from implementing $e = 1$ and $e = 0$. What does the principal do? Compare with the first-best action.
::: hint
Expected output at $e = 1$ is now much smaller; the rent has not changed.
:::
::: solution
The second-best contract for $e = 1$ is unchanged: $w_H = 20$, $w_L = 0$, expected wage 16. Expected output is $0.8 \times 18 = 14.4$, profit $14.4 - 16 = -1.6$. Implementing $e = 0$ yields output $0.2 \times 18 = 3.6$ and wage 0, profit $3.6$. The principal implements $e = 0$. First-best: $e = 1$ costs 12 and yields 14.4, profit 2.4; $e = 0$ yields 3.6. First-best still wants $e = 1$ (just), but the limited-liability rent of 4 tips the second-best to $e = 0$. This is a hidden-action analogue of Akerlof’s lost trades: a socially useful action is not implemented because it cannot be bought without leaving a rent.
:::
:::

::: exercise An extra signal {level=3}
Modify [[#ex-sqrt]] by giving the principal a second, binary signal $s \in \{G, B\}$, independent of output given $e$, with $\Prob(s = G \mid e = 1) = 3/4$ and $\Prob(s = G \mid e = 0) = 1/4$. Argue, using [[#thm-informativeness]], that the optimal wage depends on $s$ as well as on $x$. Without recomputing the whole contract, say in which of the four $(x, s)$ cells the wage is highest and in which it is lowest.
::: solution
Given $x$, the signal $s$ is still informative about $e$ (it is independent of $x$ given $e$, and its distribution depends on $e$), so Holmström’s theorem says $w$ depends on $s$. The likelihood of $e = 1$ is highest when both $x = x_H$ and $s = G$, and lowest when both $x = x_L$ and $s = B$. Under the monotone likelihood-ratio property the wage is therefore highest at $(x_H, G)$ and lowest at $(x_L, B)$. The other two cells are in between; their ranking depends on which signal is more informative. Here $\Delta p_x = 1/3$ and $\Delta p_s = 1/2$, so $s$ is the stronger signal and $(x_L, G)$ may well pay more than $(x_H, B)$. The qualitative point does not require that calculation: two informative signals are better than one, and the contract uses both.
:::
:::
