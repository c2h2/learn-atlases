A teacher who is paid for test scores will teach to the test. A salesperson paid only for this month’s revenue will neglect the client who might buy next year. A team that splits its bonus equally will have members who hope the others will work. These are not failures of the binary principal–agent model of [[information-economics/moral-hazard]]; they are what that model becomes once the agent has several tasks, several periods, or several colleagues. Organisations live in that richer world. This chapter takes four standard extensions — **multitasking**, **career concerns**, **tournaments** and **relational contracts** — and a fifth, **team production**, which is Holmström’s theorem on why a budget-balancing team cannot be efficient.

The common thread is measurement. When every action has a clean, contractable signal, the LEN formula $\beta = 1/(1+r\sigma^2)$ is a reasonable guide. When some actions are unmeasured, or the future cannot be written into today’s contract, or several people produce one output, the same formula, applied naively to the signals that *are* available, does harm. The organisational response is sometimes to flatten incentives, sometimes to pay on relative performance, sometimes to stop writing the contract and rely on a repeated relationship.

## Multitasking

::: definition Multitask principal–agent problem {#def-multitask}
An agent chooses a vector of efforts $\mathbf{e} = (e_1, \dots, e_n)$, at cost $\psi(\mathbf{e})$, which is strictly convex. The principal’s benefit is $B(\mathbf{e})$. A vector of signals $\mathbf{y} = \mathbf{e} + \boldsymbol\varepsilon$ is observed, with some components possibly missing (those tasks are unmeasurable). A linear contract pays $w = \alpha + \boldsymbol\beta \cdot \mathbf{y}$. The **equal-compensation** (or balanced-incentives) principle is the requirement that, at an interior optimum, marginal incentives on any two tasks that are perfect substitutes in the agent’s cost be equal.
:::

Holmström and Milgrom (1991) is the reference. The one-task LEN formula must not be applied componentwise. If task 2 is unmeasurable ($\beta_2$ is stuck at 0) and the two tasks compete for the agent’s attention, then $\beta_1$ should also be low — often zero. Paying for what you can measure pulls effort off what you cannot.

::: proposition Balanced incentives with two tasks {#prop-balanced}
Suppose the agent has a single pool of effort, $\psi = \tfrac12 (e_1 + e_2)^2$ with $e_1, e_2 \ge 0$, and the principal’s benefit is $B = b_1 e_1 + b_2 e_2$ with $b_2 > b_1 > 0$. Only task 1 is measurable, so the contract is $w = \alpha + \beta y_1$. Then any $\beta > 0$ induces $e_2 = 0$ and $e_1 = \beta$, and the principal’s benefit is only $b_1 \beta$. The optimal contract in this class is $\beta = 0$ whenever the agent will, at a flat wage, supply a positive amount of the *unmeasured* task from some other motive (career concerns, intrinsic motivation, a professional norm). If no such motive exists, a positive $\beta$ buys only the less valuable task, and may still be used if $b_1$ is large enough relative to the risk cost.
:::

::: proof
The agent maximises $\alpha + \beta e_1 - \tfrac12(e_1+e_2)^2$ (ignoring noise, which does not affect the effort choice under LEN). The marginal cost of either task is $e_1 + e_2$. The marginal private return is $\beta$ on task 1 and $0$ on task 2. Hence all effort goes to task 1 whenever $\beta > 0$, with $e_1 = \beta$ and $e_2 = 0$. Benefit $b_1 \beta$ is strictly less, per unit of effort, than $b_2 \beta$ would have been. A flat wage $\beta = 0$ does not distort the mix; it also buys no effort from the wage. If some other motive puts a shadow price $\nu$ on total effort and does not favour task 1, the agent at $\beta = 0$ splits effort toward task 2, which is the more valuable one. That is the case for a flat wage.
:::

The result is the theoretical case for **low-powered incentives** in complex jobs: teaching, medicine, management, research. A test-score bonus, a fee-for-service schedule, a quarterly-revenue commission — each is a $\beta$ on one measured dimension. If the unmeasured dimensions are the ones the organisation actually wants, the bonus is not a small improvement; it is a distortion.

::: example Teaching to the test {#ex-test}
A teacher allocates effort between test preparation $e_T$ and broader instruction $e_B$, with cost $\tfrac12(e_T + e_B)^2$. The school values $B = 0.4 e_T + e_B$. Test scores are $y = e_T + \varepsilon$ and can be contracted on; broader instruction cannot. The teacher will, at a flat wage, supply total effort $1$ from professional norms, split equally if the wage does not favour either task. Compare outcomes under a score bonus $\beta = 0.4$ (matching the school’s weight on test preparation) and under a flat wage.
::: solution
At a flat wage the norm supplies $e_T + e_B = 1$, split equally: $e_T = e_B = 1/2$. Benefit $B = 0.4\times 0.5 + 0.5 = 0.7$.

A bonus $\beta = 0.4$ on test scores makes the private return to $e_T$ equal to $0.4$ plus any residual norm. Even without the norm, the teacher sets $e_T = 0.4$, $e_B = 0$, and $B = 0.16$, which is worse. With the norm still supplying a shadow value of effort, the bonus tilts the whole unit of effort onto test preparation: $e_T = 1$, $e_B = 0$, $B = 0.4$, still worse than $0.7$. The bonus reduced the school’s objective. Flattening pay — paying a salary — is the better contract inside this model.
:::
:::

::: warning Paying for what you can measure
The LEN formula of the previous chapter, applied to whatever signal happens to be available, is the wrong instinct in a multitask job. A precise signal on a minor task is an invitation to distort. The right instinct is: *what will this bonus pull the agent away from?* If the answer is “the unmeasured part of the job that we actually care about”, the bonus should be small, or zero.
:::

::: widget plot
f: 0.4*x; 1-x; 0.4*x + (1-x)
x: 0, 1
y: 0, 1.1
labels: 0.4\,e_T; e_B; B
caption: The teacher has one unit of effort to split: $e_T$ on the horizontal axis, $e_B = 1 - e_T$. The school’s benefit $B = 0.4 e_T + e_B$ is decreasing in $e_T$. A test-score bonus that raises $e_T$ walks the school *down* this line. The flat-wage split $e_T = 1/2$ sits in the middle; teaching-to-the-test sits at the right-hand end.
:::

## Career concerns

Even a flat wage can buy effort if the labour market is watching. Holmström (1982, published 1999) modelled a worker of unknown ability $a$, producing $y_t = a + e_t + \varepsilon_t$ in each period. Wages are paid in advance, equal to expected output given the public history, because employers compete. The worker cannot be given an explicit incentive contract — perhaps because output is observed by the market but not by a court — but she can work today in order to look able tomorrow.

::: definition Career-concerns model {#def-career}
In Holmström’s **career-concerns** model, ability $a \sim \mathcal{N}(m_0, 1/h_0)$ is fixed and unknown to everyone (including the worker). Output $y_t = a + e_t + \varepsilon_t$ is public, with $\varepsilon_t \sim \mathcal{N}(0, 1/h_\varepsilon)$ independent. The market wage in period $t$ equals $\E[a \mid y^{t-1}] + e_t^{\text{expected}}$. The worker, discounting with factor $\delta$, chooses $e_t$ each period; effort is not observed. In the last period of a finite career, $e = 0$ if effort is costly and the wage is already set.
:::

The market’s posterior on $a$ after seeing $y_1$, given anticipated effort $\hat e_1$, is a precision-weighted average of the prior and of $y_1 - \hat e_1$. The worker, taking $\hat e_1$ as given, wants to inflate $y_1$ in order to inflate future wages. In a two-period career with cost $e^2/2$, the first-period effort satisfies $e_1 = \delta \cdot \frac{h_\varepsilon}{h_0 + h_\varepsilon}$: the discount factor times the weight the market will put on the first observation. Effort is decreasing in the prior precision $h_0$ (a well-known worker has little to prove) and increasing in the signal precision $h_\varepsilon$. Second-period effort is zero.

::: example A two-period career {#ex-career}
Let $h_0 = 1$, $h_\varepsilon = 1$, $\delta = 1$ (no discounting) and $\psi(e) = e^2/2$. Compute first-period effort, the weight on $y_1$ in the posterior mean, and the worker’s first-period certainty-equivalent cost. Compare with a myopic worker who does not think about tomorrow, and with the first-best $e = 1$ (if the social benefit of effort is 1 per unit).
::: solution
The posterior weight on the first observation is $h_\varepsilon / (h_0 + h_\varepsilon) = 1/2$. With $\delta = 1$, $e_1 = 1/2$. The cost is $(1/2)^2 / 2 = 1/8$. A myopic worker sets $e_1 = 0$. First-best effort, if $B'(e) = 1$, is $e = 1$. Career concerns therefore supply some, but not all, of the efficient effort in period 1, and none in period 2. Young workers work harder than old workers in this model, not because they are more productive, but because more of their lifetime wages are still to be set.
:::
:::

Career concerns can substitute for an explicit contract, which is why professions with no piece rate — lawyers on partnership tracks, academics before tenure, junior doctors — still supply effort. They can also over-supply the *visible* task, which is multitasking again: a junior consultant who bills extra hours to look busy is the career-concerns version of [[#ex-test]]. And they fade: a CEO near retirement, or a civil servant who will not be promoted, has a weaker career-concern motive, which is one argument for explicit deferred pay (pensions, clawbacks, delayed vesting) as a substitute.

## Tournaments

When several agents produce comparable output, the principal can pay on rank rather than on levels. Lazear and Rosen (1981) showed that a **tournament** — a prize $W$ for the winner and $w$ for the loser — can implement the same effort as a linear piece rate, with an advantage when common shocks would have contaminated the piece rate.

::: proposition Tournament effort {#prop-tournament}
Two identical risk-neutral agents have cost $\psi(e) = e^2/2$ and output $y_i = e_i + \varepsilon_i$, with $\varepsilon_1 - \varepsilon_2$ distributed symmetrically with density $g$ at zero. A tournament pays $W$ to the agent with the higher $y$ and $w$ to the other. In a symmetric Nash equilibrium, effort is $e^* = g(0)\,(W - w)$. The principal can implement any $e$ by choosing the spread $W - w$, and can satisfy participation by choosing the level of $W + w$.
:::

::: proof
Agent 1 wins with probability $\Prob(\varepsilon_1 - \varepsilon_2 > e_2 - e_1) = 1 - G(e_2 - e_1)$, where $G$ is the cdf of $\varepsilon_1 - \varepsilon_2$. Expected payoff is $w + (W-w)\bigl(1 - G(e_2 - e_1)\bigr) - e_1^2/2$. Differentiating in $e_1$ and imposing $e_1 = e_2 = e^*$ gives $(W-w) g(0) = e^*$, as claimed. The spread sets incentives; the sum of prizes is a lump-sum that meets IR. Common additive shocks cancel in the comparison $y_1 - y_2$ and do not affect $e^*$.
:::

::: example A Tullock contest {#ex-tullock}
Two risk-neutral agents compete for a prize $V = 16$. The probability that $i$ wins is $e_i / (e_1 + e_2)$ (a Tullock contest-success function), and cost is $e_i^2/2$. Find the symmetric Nash effort, each agent’s expected payoff, and total effort. What prize would implement first-best total effort if the principal’s benefit is $e_1 + e_2$?
::: solution
Agent 1 maximises $\frac{e_1}{e_1+e_2} \cdot 16 - e_1^2/2$. The first-order condition is $16 \cdot e_2 / (e_1+e_2)^2 = e_1$. At a symmetric equilibrium $e_1 = e_2 = e$, this is $16 /(4e) = e$, so $e^2 = 4$ and $e = 2$. Each agent’s expected prize is 8, cost is 2, payoff is 6. Total effort is 4.

First-best: maximise $e_1 + e_2 - e_1^2/2 - e_2^2/2$, so $e_i = 1$ and total effort is 2. The tournament *over*-provides effort: $e = 2 > 1$. A prize $V$ implements $e = \sqrt{V}/2$, so $e = 1$ requires $V = 4$. Tournaments do not automatically implement the right effort; the spread has to be chosen. With more than two contestants, or with a convex prize structure, the same warning applies more strongly — a fact used (and sometimes abused) in the design of sales contests and of promotion races.
:::
:::

Tournaments filter common shocks, which is their information-theoretic appeal, and they require only an ordinal ranking, which is their measurement appeal. Their costs are sabotage (it can be as useful to lower a rival’s $y$ as to raise one’s own), collusion (both agents slack and split the prizes), and risk: a risk-averse agent dislikes a prize that is all-or-nothing. Promotion to a better-paid job is the most common tournament in organisations; the wage at the next rank is then not only a payment for skill at that rank, but also a prize that bought effort at the rank below (Lazear and Rosen; Rosen 1986 on the span of the prize structure).

## Teams and the budget-breaking theorem

When output is the joint product of several agents and only the joint product is observed, sharing rules run into a fundamental constraint.

::: theorem Holmström’s budget-breaking theorem {#thm-teams}
Let $n \ge 2$ agents choose efforts $e_i$ at private cost $\psi_i(e_i)$, producing a joint output $y = Y(e_1, \dots, e_n)$ that is deterministic and strictly increasing. A sharing rule $s_i(y)$ with $\sum_i s_i(y) = y$ for all $y$ (budget balance) cannot implement the efficient effort profile as a Nash equilibrium, if each $\psi_i$ is strictly increasing and $Y$ is differentiable.
:::

::: proof
Efficiency requires $Y_i(\mathbf{e}^*) = \psi_i'(e_i^*)$ for each $i$. Nash equilibrium under a differentiable sharing rule requires $s_i'(Y(\mathbf{e}^*)) Y_i(\mathbf{e}^*) = \psi_i'(e_i^*)$. Budget balance, differentiated, gives $\sum_i s_i'(y) = 1$ for all $y$. Combining, $\sum_i \psi_i'(e_i^*) / Y_i(\mathbf{e}^*) = 1$. But efficiency would require each ratio $\psi_i'/Y_i$ to equal 1, hence the sum to equal $n \ge 2$, a contradiction.
:::

The way out is to **break the budget**: introduce a principal who does not work, who absorbs a residual, and who can threaten to destroy surplus (or withhold a bonus) if $y$ falls short of the efficient target. A forcing contract — pay each agent a bonus if $y \ge Y(\mathbf{e}^*)$, otherwise pay little — implements efficiency, because each agent is then pivotal. The principal’s role, in this view, is not to monitor but to be the residual claimant who is *not* on the sharing rule.

::: example Two partners {#ex-partners}
Two agents produce $y = e_1 + e_2$ at cost $e_i^2/2$ each. First-best is $e_i = 1$, $y = 2$, total cost 1, surplus 1. Under equal sharing $s_i = y/2$, find Nash efforts and surplus. Then exhibit a forcing contract, using a third-party principal, that restores the first-best.
::: solution
Under equal sharing, agent $i$ maximises $\tfrac12(e_i + e_j) - e_i^2/2$, so $e_i = 1/2$. Then $y = 1$, total cost $2 \times (1/2)^2/2 = 1/4$, surplus $1 - 1/4 = 3/4$, against first-best surplus 1.

Forcing contract: the principal pays each agent $1$ if $y \ge 2$, and $0$ otherwise, and keeps $y - 2$ (which is 0 on the path). Each agent, given $e_j = 1$, wants $e_i = 1$ to hit the target and collect 1, net of cost $1/2$, rather than miss and collect 0. Budget is broken off the path: if $y < 2$ the agents receive nothing and the principal receives $y$, or output is wasted. On the path the budget balances. This is the organisational role of a residual claimant who is not a worker.
:::
:::

## Relational contracts

Many of the bonuses that organisations actually pay are not written in a court-enforceable contract. They are paid because the relationship will continue. A **relational contract** is a self-enforcing agreement in a repeated game ([[game-theory/repeated-games]]): the principal promises a bonus $b$ if output is good, the agent works if she expects the bonus, and both keep the agreement because breaking it would collapse the relationship.

::: definition Relational incentive contract {#def-relational}
A (stationary) **relational contract** in a repeated principal–agent relationship with discount factor $\delta$ specifies an effort $e$, a fixed salary $a$, and a bonus $b$ paid when a public signal indicates that the effort was supplied. It is **self-enforcing** if (i) the agent’s incentive constraint holds given that the bonus will be paid, (ii) the principal’s constraint that paying $b$ is better than reneging and losing the relationship holds, and (iii) both parties prefer to continue the relationship rather than take their outside options. Limited liability or non-verifiability is what makes the bonus informal: a court will not enforce it.
:::

A stripped-down computation: each period, effort costs 4 and produces 10, so surplus is 6. The bonus that makes the agent work is $b \ge 4$. The principal, after seeing good output, is tempted to keep the 10 and not pay $b$. Honesty is worth the continuation value of the relationship, $\frac{\delta}{1-\delta} \times 6$, if the surplus is split so that the principal captures it all after the bonus (a simplifying assumption). Then the principal pays if $\frac{\delta}{1-\delta} \cdot 6 \ge b \ge 4$, which requires $\delta \ge 0.4$. Below that discount factor no bonus is both large enough for the agent and small enough for the principal, and the relationship cannot support effort.

::: example A self-enforcing bonus {#ex-relational}
Surplus per period if effort is supplied: 6. Effort cost: 4. Outside options: 0. The principal captures the surplus, the agent is held to 0 plus cost-covering. Find the smallest $\delta$ that supports effort. What happens if the surplus falls to 3 (a worse technology, or more competition)?
::: solution
Need $b \ge 4$ and $\frac{\delta}{1-\delta} \cdot 6 \ge b$, so $\frac{\delta}{1-\delta} \cdot 6 \ge 4$, hence $6\delta \ge 4 - 4\delta$, $10\delta \ge 4$, $\delta \ge 0.4$. If surplus is 3, $\frac{\delta}{1-\delta} \cdot 3 \ge 4$ gives $3\delta \ge 4 - 4\delta$, $7\delta \ge 4$, $\delta \ge 4/7 \approx 0.57$. A less productive relationship needs more patience (or a thicker future) to sustain the same bonus. This is why relational contracts are easier inside a firm with a long horizon than in a one-shot procurement, and why a price war that destroys continuation value can collapse informal bonus systems.
:::
:::

::: widget plot
f: 6*x/(1-x); 4
x: 0.05, 0.8
y: 0, 20
labels: \text{continuation value}; \text{required bonus}
caption: The principal’s continuation value $\frac{\delta}{1-\delta}\cdot 6$ against the discount factor (horizontal axis), and the bonus $b = 4$ the agent needs. They cross at $\delta = 0.4$. To the right of the crossing, a relational contract can pay the bonus; to the left, the principal would renege. Drag the picture in your head: a smaller surplus lowers the curve and raises the required $\delta$.
:::

Levin (2003) characterised optimal relational contracts with a continuum of signals: they look like a bonus band, with a target and a payment that is 0 or a cap, not a finely sloped LEN $\beta$. Shapiro and Stiglitz (1984) used a related idea for efficiency wages: a firm pays above the going wage, and fires a worker caught shirking; unemployment is the continuation penalty that makes the threat real. The common structure is a future rent that is lost if the agent (or the principal) cheats.

## Evidence and where this leads

Multitasking has a large field literature. Jacob and Levitt (2003) documented cheating by Chicago teachers on high-stakes tests; more generally, Campbell’s law — a social indicator used as a target becomes a worse indicator — is the informal statement of [[#prop-balanced]]. Baker, Gibbons and Murphy (1994, 2002) took relational contracts to the boundary of the firm: make-or-buy depends not only on the hold-up of the next chapter but on which relationship can better sustain an informal bonus. Tournaments are visible in promotion data (the wage jump at promotion is larger than the productivity jump at that rank, consistent with a prize) and in sales contests; sabotage is harder to measure but is a standard complaint in forced-ranking systems.

Career concerns have a clean prediction about age and effort, and about the *kind* of project a manager takes (too much signal, too little value, when young). Chevalier and Ellison (1999) found that young US mutual-fund managers, more than old ones, herded toward the average portfolio, which is a career-concerns distortion: looking like a low-ability manager is more costly when the market is still learning.

The next chapter takes the contract itself as incomplete: not because a court cannot see $y$, but because the parties cannot describe the relevant future states. Ownership, rather than a bonus, becomes the instrument, and the boundary of the firm is the question.

::: quiz
Holmström's budget-breaker result for a partnership says that
- [ ] partners can share the whole output and still implement first-best effort
- [x] if every partner's share of output sums to one, Nash effort is too low; a third party who absorbs a residual can restore incentives
- [ ] tournaments cannot work in teams
::: solution
With a balanced budget $\sum s_i(x)=x$, each partner internalises only her share of the marginal product, so effort is too low. Breaking the budget — a principal who pays bonuses that do not sum to $x$ in every state — can implement the first-best. Tournaments are a different instrument (relative performance) and can work in teams; they are not the budget-breaker theorem.
:::
:::

::: history
Edward Lazear and Sherwin Rosen’s “Rank-Order Tournaments as Optimum Labor Contracts” appeared in the *Journal of Political Economy* in 1981. Bengt Holmström’s “Moral Hazard in Teams” (*Bell Journal*, 1982) proved the budget-breaking theorem, and his career-concerns paper, circulating from 1982, was published in the *Review of Economic Studies* in 1999. Holmström and Paul Milgrom’s “Multitask Principal–Agent Analyses” (*Journal of Law, Economics, & Organization*, 1991) is the origin of balanced incentives and of the modern case for low-powered pay in complex jobs. Shapiro and Stiglitz’s efficiency-wage model is from 1984; Jonathan Levin’s characterisation of relational contracts is from the *American Economic Review*, 2003. Holmström’s half of the 2016 Nobel Prize covered this whole cluster: teams, multitasking, career concerns.
:::

::: summary
- Multitasking: a bonus on a measured task pulls effort off unmeasured tasks. When tasks compete, the right response is often to flatten pay.
- Career concerns: even a flat wage buys effort if the market is learning ability. Effort is front-loaded in the career and can itself be distorted toward visible tasks.
- Tournaments: the prize spread sets effort; common shocks cancel. Sabotage, collusion and risk are the costs. Promotion races are the leading application.
- Teams: a budget-balancing sharing rule cannot implement efficient effort. A principal who breaks the budget (a residual claimant) can.
- Relational contracts: an informal bonus is self-enforcing when the continuation value of the relationship covers the temptation to renege. Patience and surplus are complements.
:::

## Exercises

::: exercise Teaching to the test {level=1 check="0.4"}
In [[#ex-test]], a score bonus that tilts the teacher’s whole unit of effort onto test preparation yields what school benefit $B$? (Enter $B$.)
::: solution
$e_T = 1$, $e_B = 0$, $B = 0.4$.
:::
:::

::: exercise Career-concerns effort {level=1 check="0.5"}
In [[#ex-career]], with $h_0 = h_\varepsilon = 1$ and $\delta = 1$, what is first-period effort? (Enter it.)
::: solution
$e_1 = \delta h_\varepsilon / (h_0 + h_\varepsilon) = 1/2$.
:::
:::

::: exercise Tournament spread {level=1}
Two risk-neutral agents, $\psi = e^2/2$, and $g(0) = 1/4$. What prize spread $W - w$ implements $e^* = 1$?
::: solution
$e^* = g(0)(W-w)$, so $1 = (1/4)(W-w)$, hence $W - w = 4$.
:::
:::

::: exercise Equal sharing {level=2 check="0.5"}
In [[#ex-partners]], under equal sharing $s_i = y/2$ with $y = e_1 + e_2$ and cost $e_i^2/2$, what effort does each agent supply in Nash equilibrium? (Enter it.)
::: solution
FOC: $1/2 = e_i$, so $e_i = 1/2$.
:::
:::

::: exercise Relational discount factor {level=2 check="0.4"}
In [[#ex-relational]], surplus is 6 and the required bonus is 4. What is the smallest $\delta$ that supports effort? (Enter it as a decimal.)
::: solution
$\delta \ge 0.4$.
:::
:::

::: exercise A measured and an unmeasured task {level=2}
An agent has cost $(e_1^2 + e_2^2)/2$ (independent tasks), the principal’s benefit is $e_1 + e_2$, and only $y_1 = e_1 + \varepsilon$ is contractable. The agent is risk-neutral. Find the optimal $\beta_1$, the induced $(e_1, e_2)$, and surplus. Compare with first-best. Why does this *not* contradict [[#prop-balanced]]?
::: solution
Risk-neutral, so $\beta_1 = 1$ (sell task 1). Then $e_1 = 1$, $e_2 = 0$ (no incentive on task 2). Surplus $1 - 1/2 = 1/2$. First-best: $e_1 = e_2 = 1$, surplus $2 - 1 = 1$. Half the surplus is lost because task 2 is unincentivised. This does not contradict [[#prop-balanced]], because here the tasks do *not* compete in cost: raising $\beta_1$ does not reduce $e_2$ (which is already 0). Substitutability is the ingredient that can make $\beta_1 = 0$ optimal; independent costs make a positive $\beta_1$ harmless to task 2 and therefore desirable.
:::
:::

::: exercise Tullock with $n$ agents {level=3}
$n$ identical risk-neutral agents compete for a prize $V$, with contest-success probability $e_i / \sum_j e_j$ and cost $e_i^2/2$. Find the symmetric Nash effort as a function of $n$ and $V$. What happens to each agent’s effort, and to total effort, as $n \to \infty$?
::: hint
The marginal probability of winning, at a symmetric point, is $(n-1)/(n^2 e)$.
:::
::: solution
Payoff: $V \cdot e_i / \sum e_j - e_i^2/2$. Differentiating and setting $e_i = e$ for all $i$: $V \cdot (n-1)/(n^2 e) = e$, so $e^2 = V(n-1)/n^2$, $e = \sqrt{V(n-1)}/n$. Individual effort falls as $1/n$ (approximately). Total effort $n e = \sqrt{V(n-1)}$ *rises* like $\sqrt{n}$ and is unbounded. With a large field, a Tullock prize dissipates more and more effort in the aggregate, even as each person slacks. (Whether that is good depends on whether the principal values total effort or only the winner’s effort.)
:::
:::

::: exercise Breaking the budget {level=3}
Three agents produce $y = e_1 + e_2 + e_3$ at cost $e_i^2/2$ each. First-best is $e_i = 1$, $y = 3$. Equal sharing is $s_i = y/3$. Find Nash efforts and surplus. Then write a forcing contract that implements the first-best, and say what the principal receives on and off the path.
::: solution
Equal sharing: FOC $1/3 = e_i$, $e_i = 1/3$, $y = 1$, total cost $3 \times (1/3)^2 / 2 = 1/6$, surplus $1 - 1/6 = 5/6$. First-best surplus $3 - 3/2 = 1.5$.

Forcing: pay each agent $1$ if $y \ge 3$, else $0$. Given $e_{-i} = (1, 1)$, agent $i$ gets 1 by setting $e_i = 1$ (net $1 - 1/2 = 1/2$) and 0 by setting $e_i < 1$. She complies. On the path the principal pays 3 and receives $y = 3$, net 0; the agents’ total surplus is $3 \times 1/2 = 1.5$, which is the first-best surplus. Off the path, if anyone slacks, the principal pays 0 and keeps $y$ (budget broken from the agents’ point of view). The principal can charge an up-front fee that extracts the $1.5$, or can be a budget-breaker who is not in the firm to make money on the path.
:::
:::

::: exercise Relational surplus and patience {level=3}
A relationship generates surplus $S$ per period if the agent works at cost $c$, with $S > c > 0$. Outside options are 0. The bonus must satisfy $b \ge c$, and the principal’s honesty constraint is $\frac{\delta}{1-\delta} S \ge b$ (the principal captures $S$ each period on the path). (a) Find the smallest $\delta$ that supports effort, as a function of $S$ and $c$. (b) Suppose $S = 10$, $c = 4$. A one-time shock (a recession) lowers $S$ to 3 for a single period, after which $S$ returns to 10. Can the principal still pay the bonus in the recession period if $\delta = 0.5$? If not, what happens to the relationship?
::: hint
In the recession period the continuation value is still $\frac{\delta}{1-\delta} \times 10$, because next period is normal; the current $S$ does not enter the honesty constraint except as the thing being split.
:::
::: solution
(a) Need $\frac{\delta}{1-\delta} S \ge c$, so $\delta S \ge c(1-\delta)$, $\delta(S+c) \ge c$, $\delta \ge c/(S+c)$.

(b) With $S = 10$, $c = 4$, the threshold is $4/14 \approx 0.29$. And $\delta = 0.5$ is above it. In the recession period the honesty constraint is $\frac{0.5}{0.5} \times 10 = 10 \ge b = 4$, which still holds: the *future* is what disciplines the principal, and the future is intact. The principal can pay. (If the shock were believed to be permanent, $S = 3$ forever, the threshold would rise to $4/7 \approx 0.57 > 0.5$, and the relational contract would collapse.) Distinguishing transitory from permanent shocks is therefore essential for relational contracts; a principal who treats a recession as the end of the relationship destroys the very continuation value that would have carried her through it.
:::
:::
