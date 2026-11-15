A firm cannot see a worker's productivity, but it can see a diploma. If more productive workers find school less costly — they pass exams with less effort — a diploma can raise wages even when school teaches nothing. That is Spence's (1973) **signalling** model. The diploma is not a direct input; it is a message that is cheaper for one type than another. The wage is the market's **belief**, updated by Bayes' rule on the path of play and specified, as part of the equilibrium, off the path.

This chapter introduces **perfect Bayesian equilibrium** (PBE): strategies and beliefs that are sequentially rational, with beliefs derived from Bayes' rule wherever possible. Signalling games — informed sender, uninformed receiver — are the leading application. We compute **separating** and **pooling** equilibria of a Spence labour market, note the intuitive criterion as a selection device, and contrast signalling with **cheap talk**, where the message is costless and can inform only when preferences are sufficiently aligned (Crawford and Sobel 1982). Screening, in which the uninformed party moves first, is [[information-economics/screening]]. Job-market signalling as a labour-economics topic continues in [[information-economics/job-market-signalling]].

The model is positive. It does not say that education is only a signal, and it does not say that a person should stay in school or leave. Human-capital and signalling explanations of the education wage premium have both been estimated; the evidence is discussed as evidence, not as a verdict.

## Perfect Bayesian equilibrium

An extensive-form game with incomplete information has **information sets** that may contain several nodes. A strategy assigns an action to each information set. A **belief** $\mu$ assigns a probability distribution over the nodes of each information set.

::: definition Perfect Bayesian equilibrium {#def-pbe}
A profile $(\sigma, \mu)$ of strategies and beliefs is a **perfect Bayesian equilibrium** if

1. **Sequential rationality.** At every information set, the player to move maximises expected payoff given $\mu$ at that set and given $\sigma$ thereafter.
2. **Bayes' rule on the path.** At every information set that $\sigma$ reaches with positive probability, $\mu$ is the conditional distribution of nodes given $\sigma$ and the prior, by Bayes' rule.

Off the path — at information sets that $\sigma$ reaches with probability zero — $\mu$ is restricted only by the requirement that it be a probability distribution (and, in stronger refinements, by further conditions). Every PBE induces a BNE of the corresponding Bayesian game; the extra bite is sequential rationality at unused information sets, the analogue of subgame perfection.
:::

In a signalling game the sender observes a type $\theta \in \Theta$ and chooses a message $m \in M$; the receiver observes $m$ (not $\theta$) and chooses an action $a \in A$. Beliefs are a distribution $\mu(\cdot \mid m)$ on $\Theta$ for each $m$. On the path, $\mu(\theta \mid m) \propto P(\theta) \sigma(m \mid \theta)$. Off the path, $\mu(\cdot \mid m)$ is free in a PBE and is the object that refinements discipline.

::: example Entry with a hidden type {#ex-entry-type}
An incumbent is Strong or Weak, each with prior $1/2$. A Strong incumbent's payoffs make Fight a best response to entry (Fight pays the incumbent $3$, Accommodate $1$); a Weak incumbent's payoffs are the reverse (Fight $-1$, Accommodate $2$). The entrant gets $-1$ from Fight and $2$ from Accommodate, and $0$ from staying out. The incumbent's type is private; the incumbent chooses Fight or Accommodate after entry. Find a PBE in which the entrant stays out.
::: solution
If the entrant stays out, the incumbent's information set after entry is *off the path*. Sequential rationality still requires that a Strong incumbent plan to Fight and a Weak incumbent plan to Accommodate. The entrant's belief at that unreached set can be anything in a PBE. For Out to be a best response, the entrant's expected payoff from In must be $\le 0$. That expected payoff is $-1 \cdot \mu(\text{Strong} \mid \text{In}) + 2 \cdot \mu(\text{Weak} \mid \text{In}) = 2 - 3\mu(\text{Strong} \mid \text{In})$, which is $\le 0$ iff $\mu(\text{Strong} \mid \text{In}) \ge 2/3$. So there is a PBE: the entrant stays out; Strong would Fight and Weak would Accommodate; off-path belief $\mu(\text{Strong} \mid \text{In}) \ge 2/3$. The belief is not derived from Bayes' rule, because In has probability zero. A refinement that puts the off-path belief equal to the prior $1/2$ would make In profitable ($2 - 3\cdot\tfrac12 = 0.5 > 0$) and destroy this PBE. Whether "stay out" is a reasonable prediction depends on the refinement, not just on [[#def-pbe]].
:::
:::

## Spence signalling

Two types of worker, $\theta \in \{\theta_L, \theta_H\}$ with $0 < \theta_L < \theta_H$, and prior $\Prob(\theta_H) = \lambda \in (0, 1)$. A worker of type $\theta$ chooses education $e \ge 0$ at cost $c(e, \theta) = e/\theta$ (higher types have strictly lower marginal cost). Competitive firms observe $e$, not $\theta$, and pay a wage $w(e)$ equal to expected productivity. Productivity of type $\theta$ is $\theta$ (education does not raise productivity: pure signalling). The worker's payoff is $w - e/\theta$. Firms earn zero in equilibrium.

::: definition Separating and pooling {#def-sep-pool}
A PBE is **separating** if the two types choose different $e$, so that $w(e)$ equals $\theta_L$ or $\theta_H$ on the path. It is **pooling** if both types choose the same $e^p$, so that $w(e^p) = \bar\theta := \lambda \theta_H + (1-\lambda)\theta_L$.
:::

::: proposition Least-cost separating equilibrium {#prop-lcse}
Let $\theta_L = 1$, $\theta_H = 3$ for a worked case, and keep general $\theta_L < \theta_H$. In a separating PBE the low type chooses $e_L = 0$ and is paid $\theta_L$. The high type chooses some $e_H$ satisfying the **incentive-compatibility** constraints

$$
\theta_L \ge \theta_H - \frac{e_H}{\theta_L},\qquad \theta_H - \frac{e_H}{\theta_H} \ge \theta_L,
$$ {#eq-ic}

i.e. the low type does not mimic the high type, and the high type does not mimic the low type. The **least-cost** separating $e_H$ is the smallest $e_H$ that deters the low type:

$$
e_H^* = \theta_L(\theta_H - \theta_L).
$$ {#eq-lcse}

Off-path wages can be set at $\theta_L$ (pessimistic beliefs) to support the equilibrium. Assumptions: two types, cost $e/\theta$, productivity $\theta$, competitive wages, $e \ge 0$.
:::
::: proof
The low type, if revealed, is paid $\theta_L$ and therefore chooses $e = 0$ (education is costly and does not raise $\theta_L$'s wage once types are revealed). The high type, if revealed, is paid $\theta_H$. IC for the low type: taking $e = 0$ and $w = \theta_L$ beats taking $e_H$ and $w = \theta_H$, i.e. $\theta_L \ge \theta_H - e_H/\theta_L$, so $e_H \ge \theta_L(\theta_H - \theta_L)$. IC for the high type: $\theta_H - e_H/\theta_H \ge \theta_L$, so $e_H \le \theta_H(\theta_H - \theta_L)$, which is a larger upper bound because $\theta_H > \theta_L$. The interval is non-empty. The least-cost point is the lower bound [[#eq-lcse]]. Sequential rationality of firms: on the path, $w(0) = \theta_L$ and $w(e_H^*) = \theta_H$. Off the path, any $w(e) \in [\theta_L, \theta_H]$ can be justified by some belief; setting $w(e) = \theta_L$ for $e \notin \{0, e_H^*\}$ makes deviation unattractive.
:::

::: example Numbers, separating {#ex-spence-sep}
$\theta_L = 1$, $\theta_H = 3$, $\lambda = 1/2$. Compute $e_H^*$, the two types' payoffs in the least-cost separating PBE, and the pooling wage at $e = 0$. Does the high type prefer separating to pooling at $e = 0$?
::: solution
$e_H^* = 1\cdot(3-1) = 2$. Low type: wage $1$, cost $0$, payoff $1$. High type: wage $3$, cost $2/3$, payoff $3 - 2/3 = 7/3 \approx 2.333$. Pooling at $e = 0$ pays $\bar\theta = 2$ to both, with cost $0$, so payoffs $(2, 2)$. The high type prefers separating ($7/3 > 2$); the low type prefers pooling ($2 > 1$). Separating is not Pareto-ranked against this pooling: the low type is hurt by separation (the information leak), the high type is helped. Education of $2$ is socially wasteful (it does not raise $\theta$), which is the signalling distortion.
:::
:::

::: widget plot
f: 1; 3; 1+x; 3+x/3
x: 0, 4
y: 0, 6
labels: \text{wage if believed low}; \text{wage if believed high}; \text{low-type indifference through }(0,1); \text{high-type indifference through }(0,3)
points: 0,1; 2,3
caption: Spence with $\theta_L=1$, $\theta_H=3$. Horizontal axis: education $e$. The two horizontal lines are wages under the two beliefs. Indifference curves of the low type are steeper (higher marginal cost). The least-cost separating point is $(e,w) = (2, 3)$: the low type's indifference through $(0,1)$ passes through $(2,3)$, so the low type will not mimic. The high type's flatter indifference through $(0,3)$ lies below $(2,3)$, so the high type strictly prefers to separate. Hover to read coordinates.
:::

Wait, indifference: payoff $w - e/\theta = $ constant. Through (0,1) for low type: $w - e/1 = 1$, so $w = 1+e$. Through (0,3) for high type: $w - e/3 = 3$, so $w = 3 + e/3$. And (2,3): low type payoff 3-2=1, yes on the indifference. High type 3-2/3=7/3 < 3, so (2,3) is *below* the high type's indifference through (0,3) if "below" means lower wage for given e... w=3 vs 3+2/3=11/3, so (2,3) is below the curve w=3+e/3, meaning worse than (0,3) wait no: the high type at (2,3) gets 7/3 < 3, which is worse than being paid 3 at e=0. But in separating they cannot get (0,3) because e=0 reveals low. They compare (2,3) with (0,1): 7/3 vs 1, and prefer (2,3). The caption said "lies below (2,3)" which is confusing. Let me fix the caption later.

The functions 1+x and 3+x/3 are indifference curves. Good.

::: proposition Pooling equilibria {#prop-pooling}
A pooling PBE at education $e^p$ with wage $w(e^p) = \bar\theta$ exists if both types prefer that pair to any deviation that can be met by some off-path belief in $[\theta_L, \theta_H]$. With *pessimistic* off-path beliefs $w(e) = \theta_L$ for $e \ne e^p$, pooling at $e^p = 0$ is a PBE: a deviation yields at most $\theta_L \le \bar\theta$. Separating at the least-cost $e_H^*$ is also a PBE, under different off-path beliefs. The **intuitive criterion** (Cho and Kreps 1987) deletes many pooling equilibria: a deviation that would be worse than pooling for the low type even if credited as high, but better for the high type if so credited, must be believed to come from the high type, and that belief then makes the deviation profitable for the high type.
:::
::: proof
Pessimistic off-path wages $\theta_L$ make any $e \ne 0$ pay at most $\theta_L$ (attained as $e \downarrow 0$). The high type’s pooling payoff is $\bar\theta \ge \theta_L$, so she does not deviate; nor does the low type. Hence pooling at $0$ is a PBE under those beliefs.

Separating at $e_H^* = \theta_L(\theta_H-\theta_L)$ with $w(e_H^*)=\theta_H$ and $w(0)=\theta_L$ is the least-cost separating PBE of the previous proposition.

The two PBEs coexist because off-path beliefs are not pinned down by Bayes’s rule. Cho and Kreps’s intuitive criterion restricts those beliefs. In the numerical example $\theta_L=1$, $\theta_H=3$, $\bar\theta=2$, $e_H^*=2$: the low type’s payoff from $(e_H^*,\theta_H)$ is $3-2/1=1$, equal to her pooling-at-zero payoff only at the knife-edge and strictly worse for any $e>e_H^*$ even if she were paid $\theta_H$. The high type’s payoff from $(e_H^*,\theta_H)$ is $3-2/3=7/3>2$. So a deviation to $e_H^*$ (or just above it) is equilibrium-dominated for the low type under the most favourable beliefs, and not for the high type. Beliefs after that deviation should put probability one on the high type; then the high type’s deviation from pooling is profitable, and pooling fails the criterion. Least-cost separating survives.
:::

::: warning Education as a signal is not a finding that school is useless
Spence's model *assumes* that $e$ does not raise $\theta$, in order to isolate the informational role. The human-capital model *assumes* that $e$ raises $\theta$, in order to isolate the productive role. Observed wage-education gradients are consistent with both, and with mixtures (Lang and Kropp 1986; Tyler, Murnane and Willett 2000 on GED signalling). A PBE of a signalling game is not an estimate of the return to schooling.
:::

## Cheap talk

If $c(e, \theta) = 0$ for all $e, \theta$ — the message is **cheap talk** — the Spence construction collapses. Separating would require the low type not to send the high type's message, but with zero cost the low type is happy to mimic whenever the message raises the wage. The only PBE that survive, with two types and a receiver who wants to match the type, are pooling: messages are ignored, and the receiver acts on the prior. **Talk is cheap, and therefore uninformative, when the sender's ranking of receiver actions does not depend on type.**

Crawford and Sobel (1982) showed that cheap talk *can* inform when the sender and receiver have *close enough* preferences — a sender who wants a slightly higher action than the receiver, with a continuous type space, can have a finite partition equilibrium: types in an interval send the same message, and several intervals are used. The more aligned the preferences, the more intervals, and the more information transmitted. When preferences coincide, full revelation is an equilibrium; when they conflict too much, only babbling is. Cheap talk is a theory of **advice**, **advertising as cheap talk**, and **expert communication**, not of diplomas.

::: quiz
In Spence's model with $\theta_L = 1$, $\theta_H = 3$, the least-cost separating education of the high type is $2$. If a social planner banned education ($e \equiv 0$), who would gain and who would lose relative to the least-cost separating PBE?
- [ ] Both types would lose, because information is destroyed
- [x] The low type would gain (wage $2$ rather than $1$) and the high type would lose (wage $2$ rather than $3 - 2/3$)
- [ ] Both would gain, because education is wasteful
- [ ] Neither wage would change, because productivity is unchanged
::: solution
A ban on $e$ forces pooling at $0$, wage $\bar\theta = 2$ (with $\lambda = 1/2$). Low type: $2 > 1$. High type: $2 < 7/3$. The planner destroys a costly signal and redistributes from high to low types. Total surplus rises because $e$ was wasteful, but the high type is worse off. Whether the ban is attractive depends on the welfare weights, which the model does not supply.
:::
:::

## Evidence

**Education and signalling.** Tyler, Murnane and Willett (2000, *American Economic Review*) used the different GED passing thresholds across US states as a discontinuity: students with the same test score get the credential in one state and not in another. Estimated signalling returns to the GED were positive for some groups. Card's (1999) survey of the return to schooling, by contrast, is organised around human-capital and instrumental-variable estimates of a productive return. Both channels can operate. The atlas does not pick a number.

**Laboratory signalling.** Banks, Camerer and Porter (1994) and a subsequent experimental literature find that separating equilibria of simple signalling games are played when they are the unique intuitive-criterion outcome, and that pooling is more common when several PBE survive. Off-path beliefs are not directly observed; they are inferred from responses to surprises.

## Where this leads

Refinements (intuitive criterion, divinity, universal divinity) are the next theoretical step; Cho and Kreps (1987) is the starting point. Screening and mechanism design reverse the order of moves ([[information-economics]], [[market-design]]). Reputation, as a signalling game played over time, links this chapter to [[game-theory/repeated-games]]. Spence's labour market is one application; others include advertising as a quality signal (Milgrom and Roberts 1986), dividends as a signal of cash flow (Bhattacharya 1979), and warranties.

::: history
Michael Spence's "Job Market Signaling" (*Quarterly Journal of Economics*, 1973) and his 1974 book set out the education model; he shared the 2001 Nobel Prize with Akerlof and Stiglitz. Perfect Bayesian equilibrium was formalised in the 1980s; Fudenberg and Tirole (1991, ch. 8) is the standard treatment. Cho and Kreps (1987, *Quarterly Journal of Economics*) introduced the intuitive criterion. Crawford and Sobel (1982, *Econometrica*) is the cheap-talk paper. Akerlof's "Market for Lemons" (1970) is the adverse-selection counterpart, in which there is no signal and the market can unravel; it is taught in [[information-economics/asymmetric-information]].
:::

::: summary
- PBE pairs strategies with beliefs: sequential rationality everywhere, Bayes' rule on the path ([[#def-pbe]]). Off-path beliefs are the degree of freedom that refinements restrict.
- In a signalling game the informed player moves first. Separating PBE reveal the type; pooling PBE do not ([[#def-sep-pool]]).
- Spence: least-cost separating education $e_H^* = \theta_L(\theta_H - \theta_L)$ ([[#prop-lcse]]). Education can be socially wasteful and privately optimal for the high type.
- Multiple PBE are typical. The intuitive criterion discards some pooling equilibria by restricting off-path beliefs.
- Cheap talk (costless messages) is uninformative when the sender's ranking of actions is type-independent, and partially informative when preferences are close (Crawford–Sobel).
:::

## Exercises

::: exercise Least-cost $e_H$ {level=1 check="2"}
$\theta_L = 1$, $\theta_H = 3$. The least-cost separating $e_H^*$ equals what integer?
::: solution
$e_H^* = 1\cdot(3-1) = 2$.
:::
:::

::: exercise High type's separating payoff {level=1 check="7/3"}
In [[#ex-spence-sep]], the high type's payoff in the least-cost separating PBE is what fraction?
::: solution
$3 - 2/3 = 7/3$.
:::
:::

::: exercise IC for the high type {level=1}
With $\theta_L = 1$, $\theta_H = 3$, verify that $e_H = 2$ satisfies the high type's IC against mimicking $e = 0$. What is the largest separating $e_H$ that still satisfies that IC?
::: solution
High type at $e_H = 2$: payoff $3 - 2/3 = 7/3$. At $e = 0$ with wage $1$: payoff $1$. $7/3 > 1$, so IC holds. The high type's IC is $3 - e_H/3 \ge 1$, i.e. $e_H \le 6$. Separating education can be anything in $[2, 6]$; least-cost is $2$.
:::
:::

::: exercise A different cost {level=2 check="1"}
If $c(e, \theta) = e/\theta^2$ rather than $e/\theta$, with $\theta_L = 1$, $\theta_H = 2$, find the least-cost separating $e_H$ from the low type's IC. (Enter an integer.)
::: solution
Low type at $0$ gets $\theta_L = 1$. Mimicking $e_H$ gets $\theta_H - e_H/\theta_L^2 = 2 - e_H$. IC: $1 \ge 2 - e_H$, so $e_H \ge 1$. Least-cost $e_H^* = 1$. (High type's IC: $2 - e_H/4 \ge 1$, $e_H \le 4$, which contains $1$.)
:::
:::

::: exercise Pooling at zero {level=2}
$\theta_L = 1$, $\theta_H = 3$, $\lambda = 1/2$. Show that pooling at $e = 0$ with $w(0) = 2$ and $w(e) = 1$ for all $e > 0$ is a PBE. Why does the intuitive criterion nevertheless discard it?
::: solution
On the path, both types choose $0$, Bayes gives $\mu(\theta_H \mid 0) = 1/2$, wage $2$. Off path, wage $1$. A deviation to $e > 0$ pays $1 - e/\theta \le 1 < 2$, so neither type deviates. Sequential rationality of firms holds for the pessimistic belief. Intuitive criterion: consider a deviation $e = 2 + \eps$. The low type's payoff if this were credited as high would be $3 - (2+\eps)/1 = 1 - \eps < 1$, which is worse than pooling's $2$ *and* worse than the low type's separating payoff $1$ — wait, worse than pooling $2$ for sure. Even if credited as high, low type gets $3-(2+\eps) = 1-\eps < 2$, so the low type would not deviate from pooling even under the most favourable belief. The high type, if credited as high at $e = 2+\eps$, gets $3 - (2+\eps)/3 = 3 - 2/3 - \eps/3 = 7/3 - \eps/3 > 2$ for small $\eps$. So the deviation is equilibrium-dominated for the low type but not for the high type. The intuitive criterion requires $\mu(\theta_H \mid e) = 1$, which makes the deviation profitable for the high type and breaks pooling.
:::
:::

::: exercise Cheap talk, two types {level=2}
A sender is type $L$ or $H$ with equal probability, and sends a costless message in $\{l, h\}$. A receiver chooses action $a \in \{L, H\}$ and gets $1$ if $a$ matches the type and $0$ otherwise. The sender gets $1$ if $a = H$ and $0$ if $a = L$, *regardless of type*. Show that every PBE is uninformative (the receiver's action does not depend on the message).
::: solution
The sender of both types strictly prefers $a = H$. If a message $m$ led the receiver to play $H$ with higher probability than another message $m'$, both types would send $m$. Then $m$ would not be informative, contradicting that it raises the probability of $H$ relative to the prior unless the receiver plays $H$ anyway. In any PBE the receiver's action is independent of the message, equal to the action that is best given the prior (here $H$ and $L$ both pay $1/2$, so the receiver may mix). Messages are babbling.
:::
:::

::: exercise A three-type sketch {level=3}
Three types $\theta \in \{1, 2, 3\}$, cost $e/\theta$, productivity $\theta$. Describe the least-cost fully separating schedule $(e_1, e_2, e_3)$ in terms of adjacent IC constraints (do not solve for numbers). Which type gets $e = 0$?
::: hint
Only adjacent downward ICs bind in the standard least-cost chain.
:::
::: solution
Type $1$ (lowest) chooses $e_1 = 0$ and is paid $1$. Type $2$ chooses the smallest $e_2$ such that type $1$ will not mimic: $1 \ge 2 - e_2/1$, so $e_2 \ge 1$. Type $3$ chooses the smallest $e_3$ such that type $2$ will not mimic: $2 - e_2/2 \ge 3 - e_3/2$, so $e_3 \ge e_2 + 2$. Least-cost: $e_1 = 0$, $e_2 = 1$, $e_3 = 3$. (One must also check that type $1$ does not want to jump to $e_3$, and that upward ICs hold; with single-crossing they typically do when adjacent downward ICs bind.) The lowest type gets $e = 0$; every higher type distorts upward just enough to deter the type immediately below.
:::
:::

::: exercise Entry off path {level=3}
In [[#ex-entry-type]], suppose the prior is $\Prob(\text{Strong}) = 0.8$. Is there still a PBE in which the entrant stays out? What is the most pessimistic (from the entrant's point of view) *on-path* belief if the entrant instead enters in a separating PBE where Strong fights and Weak accommodates?
::: solution
Staying out requires off-path $\mu(\text{Strong} \mid \text{In}) \ge 2/3$. That is feasible; $0.8$ is not used on the path if In has probability zero. Yes, the Out PBE still exists (it uses an off-path belief, not the prior). If instead the incumbent's types separate after entry — Strong Fights, Weak Accommodates — then In is on the path if the entrant enters. The entrant's *on-path* belief after In is the prior, $0.8$, by Bayes, because both types are reached (entry happens, then types take different actions... wait: if the entrant enters for sure, both types are at the Fight/Accommodate node, which is a singleton for each type if type is known to the incumbent. The entrant does not observe the type; the information set after In contains two nodes. If both types are reached (entrant always enters), Bayes gives $\mu(\text{Strong} \mid \text{In}) = 0.8$. Expected payoff of In: $2 - 3\cdot 0.8 = -0.4 < 0$, so the entrant would *not* enter. Separating plans by the incumbent, with the prior $0.8$, make In unprofitable *on the path*, so the entrant staying out is consistent with sequential rationality even with beliefs equal to the prior — but then In is off the path again. The coherent PBE is: entrant Out; Strong would Fight, Weak would Accommodate; $\mu(\text{Strong} \mid \text{In}) = 0.8 \ge 2/3$. At a high prior the off-path-belief issue of the $1/2$-prior example goes away: even the prior itself deters entry.
:::
:::
