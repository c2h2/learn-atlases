Signalling, screening and the principal–agent problem are three extensive forms for one constraint: the informed party must be willing to do what the designer wants, given what she knows. **Mechanism design** drops the extensive form and keeps the constraint. A designer names a social choice — who gets the object, whether the bridge is built, how much a regulated firm can charge — as a function of information she does not have. She then specifies a game, a **mechanism**, whose equilibrium outcome is that social choice. The **revelation principle** says that it is enough to consider games in which each person simply reports her type and finds it optimal to report truthfully. Incentive compatibility, which has been the recurring constraint of this course, becomes the definition of what is implementable.

This chapter sets out that language, proves the revelation principle, and meets the first great impossibility: Gibbard–Satterthwaite, which says that if there are three or more alternatives and no transfers, the only strategy-proof onto social choice functions are dictatorships. The next chapter puts transfers back in and asks when *efficiency* is implementable: Vickrey–Clarke–Groves, budget balance, and Myerson–Satterthwaite.

## Social choice functions and mechanisms

A set of agents $i = 1, \dots, n$ have types $\theta_i \in \Theta_i$, privately known, drawn from a commonly known prior. An **outcome** $x$ lies in a set $X$ (an allocation, perhaps with transfers). Agent $i$’s payoff is $u_i(x, \theta_i)$. A designer, who does not observe the types, has a target.

::: definition Social choice function {#def-scf}
A **social choice function** (SCF) is a map $f: \Theta_1 \times \cdots \times \Theta_n \to X$. It names an outcome for every type profile. The SCF is **efficient** (ex post Pareto) if, for every $\theta$, no other outcome $x$ has $u_i(x, \theta_i) \ge u_i(f(\theta), \theta_i)$ for all $i$ with a strict inequality for some $i$. It is **dictatorial** if there is an agent $i$ such that, for every $\theta$, $f(\theta)$ maximises $i$’s payoff over $X$.
:::

Efficiency is a property of $f$, not of a game. The designer’s problem is to find a game that makes $f(\theta)$ the equilibrium outcome when the true types are $\theta$.

::: definition Mechanism {#def-mechanism}
A **mechanism** is a pair $\Gamma = (M, g)$, where $M = M_1 \times \cdots \times M_n$ is a message space and $g: M \to X$ is an outcome function. A **direct** mechanism has $M_i = \Theta_i$ for every $i$: each agent reports a type. Together with the prior and the payoffs, $\Gamma$ defines a Bayesian game in the sense of [[game-theory/bayesian-games]]. The mechanism **implements** $f$ in a given solution concept (dominant strategies, Bayesian Nash, Nash) if, in every equilibrium of that concept, the equilibrium outcome at type profile $\theta$ is $f(\theta)$.
:::

An auction is a mechanism: messages are bids, $g$ is the allocation-and-payment rule. A voting rule is a mechanism: messages are ballots. A screening menu is a mechanism: messages are the chosen contracts, $g$ is the contract itself. The first-price sealed-bid auction and the Dutch auction are different mechanisms that, in some environments, implement the same SCF.

::: example A public project as an SCF {#ex-public-scf}
Three agents must decide whether to build a project of cost 16. Agent $i$’s value is $\theta_i \in \{0, 10\}$, privately known. An outcome is a pair $(q, t_1, t_2, t_3)$ with $q \in \{0, 1\}$ (build or not) and transfers $t_i$ (positive if $i$ pays). Payoffs are $\theta_i q - t_i$. The efficient SCF builds if and only if $\sum \theta_i \ge 16$, i.e. if and only if at least two agents have $\theta_i = 10$. Specify $f$ on the eight type profiles (up to permutation), ignoring transfers for a moment: when does it build?
::: solution
Profiles with two or three tens: $\sum \theta = 20$ or $30 \ge 16$, build. Profiles with one or zero tens: $\sum \theta = 10$ or $0 < 16$, do not build. So $f$ builds on the four profiles (up to permutation: three of type two-tens, one of type three-tens) and not on the other four. Transfers are not determined by efficiency alone; they are the instrument that will make this $q(\theta)$ incentive-compatible, and they are the subject of the next chapter’s VCG construction. For this chapter, the point is that $f$ is a function of the whole profile, which nobody observes.
:::
:::

## Incentive compatibility and the revelation principle

A direct mechanism $(f, t)$, with $f$ the allocation and $t$ a transfer rule, is **dominant-strategy incentive-compatible** (DSIC, or strategy-proof) if, for every $i$, every $\theta_i, \theta_i'$, and every $\theta_{-i}$,

$$
u_i\bigl(f(\theta_i, \theta_{-i}), t_i(\theta_i, \theta_{-i}), \theta_i\bigr) \ge u_i\bigl(f(\theta_i', \theta_{-i}), t_i(\theta_i', \theta_{-i}), \theta_i\bigr).
$$

It is **Bayesian incentive-compatible** (BIC) if the same inequality holds in expectation over $\theta_{-i}$, given $i$’s belief. DSIC is stronger: it does not rely on beliefs or on others playing equilibrium.

::: definition Incentive compatibility {#def-ic}
A social choice function $f$ (possibly with transfers) is **dominant-strategy incentive-compatible** if truthful report is a weakly dominant strategy in the direct mechanism that implements $f$. It is **Bayesian incentive-compatible** if truthful report is a Bayesian–Nash equilibrium of that direct mechanism. In either case, the inequalities are the **incentive-compatibility (IC) constraints**.
:::

The revelation principle says that, for the purpose of knowing *which* SCFs can be implemented, it is enough to look at direct IC mechanisms.

::: theorem Revelation principle {#thm-revelation}
Suppose a (possibly indirect) mechanism $\Gamma = (M, g)$ has a Bayesian–Nash equilibrium $m^*(\cdot)$ whose outcome $g(m^*(\theta))$ equals $f(\theta)$ for every $\theta$. Then the direct mechanism with outcome function $f$ is Bayesian incentive-compatible, and truthful report implements $f$. An analogous statement holds for dominant-strategy equilibria: if $m_i^*(\theta_i)$ is dominant in $\Gamma$, then $f$ is DSIC.
:::

::: proof
Take any $i$, any types $\theta_i, \theta_i'$, and any $\theta_{-i}$. In $\Gamma$, $m_i^*(\theta_i)$ is a best response to $m_{-i}^*(\theta_{-i})$, so

$$
u_i\bigl(g(m_i^*(\theta_i), m_{-i}^*(\theta_{-i})), \theta_i\bigr) \ge u_i\bigl(g(m_i'(\theta_i'), m_{-i}^*(\theta_{-i})), \theta_i\bigr)
$$

for any alternative message, including the message $m_i^*(\theta_i')$ that type $\theta_i'$ would have sent. But $g(m^*(\theta)) = f(\theta)$ and $g(m^*(\theta_i', \theta_{-i})) = f(\theta_i', \theta_{-i})$. Substituting gives the IC inequality for $f$. The Bayesian version takes expectations over $\theta_{-i}$; the dominant-strategy version does not need to.
:::

The proof is a relabelling. Whatever game the designer had in mind, the equilibrium *messages* as a function of type can be composed with the outcome function to produce a direct mechanism, and no type wants to send another type’s message, because that is just a deviation in the original game. Indirect mechanisms are not thereby useless — they may have smaller message spaces, or be easier to play, or select among multiple equilibria — but they cannot implement an SCF that no direct IC mechanism can.

::: example From a first-price auction to a direct mechanism {#ex-first-price}
Two bidders have independent private values $\theta_i$ uniform on $[0, 1]$. In a first-price sealed-bid auction, the symmetric Bayesian–Nash bid is $m_i(\theta_i) = \theta_i/2$ ([[market-design/auction-formats]]). The winner is the higher type and pays her bid. Write the equivalent direct mechanism: who gets the object, and what does each type pay, as a function of reported types?
::: solution
The higher reported type $\hat\theta_i$ gets the object (because bids $\hat\theta/2$ preserve the ranking). The winner pays $\hat\theta_{\text{winner}}/2$; the loser pays 0. Truthful report is a Bayesian–Nash equilibrium of this direct mechanism, by the revelation principle, because $m^*(\theta) = \theta/2$ was an equilibrium of the original auction. (It is not DSIC: a type who knew the other’s bid would shade differently. The second-price auction, by contrast, is DSIC, and its direct form is: higher report wins, winner pays the other’s report.)
:::
:::

::: widget plot
f: x; 2*x-1
x: 0, 1
y: -1, 1.2
labels: \theta; \text{virtual value }2\theta-1
caption: For $\theta$ uniform on $[0, 1]$, the envelope formula of the exercises makes the designer care about the *virtual* value $2\theta - 1$, not $\theta$ itself. The virtual value is negative below $1/2$: a profit-maximising designer (Myerson) excludes those types, while an efficient designer (VCG, next chapter) still serves them. The gap between $\theta$ and $2\theta-1$ is the information-rent cost of incentive compatibility.
:::

::: intuition Why “just tell me your type” is enough
The designer does not need the agent to play a clever strategy. She can ask for the type, *simulate* the clever strategy herself, and plug the result into $g$. If the agent wanted to play as if she were another type, she can just name that type. The IC constraints are exactly the statement that she does not want to.
:::

::: warning The revelation principle does not pick the equilibrium
If the original mechanism has several equilibria, the revelation principle applied to one of them produces a direct mechanism that implements $f$ *in some* equilibrium. It does not eliminate the others, and it does not say that truth-telling is the unique equilibrium of the direct mechanism. Maskin’s implementation theory, below, is the refinement that asks for *all* equilibria to give $f$. For most of this course, including screening and optimal auctions, the weaker, one-equilibrium notion is what we use.
:::

## Gibbard–Satterthwaite

When transfers are not available — voting, matching without money, the choice of a public statue — incentive compatibility is a severe constraint.

::: theorem Gibbard–Satterthwaite {#thm-gs}
Suppose $X$ is finite with at least three alternatives, the domain of preferences is all strict rankings of $X$, and $f: \Theta \to X$ is an SCF that is DSIC and onto (every alternative is chosen at some preference profile). Then $f$ is dictatorial.
:::

::: proof
Sketch of one standard route (Gibbard 1973; the full argument is longer than a textbook paragraph). Onto and DSIC imply **monotonicity**: if $f(\theta) = x$ and the ranking of $x$ against every other alternative does not fall for anyone, then $f(\theta') = x$. Monotonicity plus a rich domain imply that $f$ is **dictatorial**, by an argument in the style of Arrow’s theorem: the family of “decisive” coalitions (coalitions that can force $x$ over $y$) is an ultrafilter on the set of agents, and with finitely many agents an ultrafilter is a singleton, the dictator. Strategy-proofness is used to get monotonicity; onto-ness (or unanimity) is used to get existence of decisive coalitions. For a complete proof see Mas-Colell, Whinston and Green, Proposition 23.C.3, or Reny (2001) for a short argument that treats Arrow and Gibbard–Satterthwaite in parallel.
:::

The theorem is an impossibility of *non-dictatorial strategy-proof voting* on an unrestricted domain. It is not an impossibility of voting. Majority rule, plurality, Borda, instant runoff — all are used, and all are manipulable at some profiles. The theorem says that this manipulability is not a defect of those particular rules; it is a defect of every non-dictatorial onto rule, once there are three or more alternatives and all rankings are allowed.

::: example Plurality is manipulable {#ex-plurality}
Three voters, three alternatives $A, B, C$. Rankings: voter 1 has $A \succ C \succ B$; voter 2 has $B \succ A \succ C$; voter 3 has $C \succ B \succ A$. Plurality (each names a top alternative; ties broken alphabetically) elects $A$ on sincere ballots. Show that voter 3 can profitably name $B$ instead of $C$.
::: solution
Sincere plurality: $A$, $B$, $C$ have one vote each; the tie-break elects $A$. If voter 3 names $B$, the tally is $A: 1$, $B: 2$, $C: 0$, and $B$ wins. Voter 3 ranks $B$ above $A$, so the deviation is profitable. Plurality is not DSIC. (Borda and instant runoff fail at other, equally short, profiles.) Gibbard–Satterthwaite says that the search for a non-manipulable replacement, on this domain, is hopeless unless we are willing to install a dictator or to restrict the domain (single-peaked preferences, as in median voting, are the leading restriction that restores strategy-proofness).
:::
:::

::: quiz
The revelation principle says that
- [ ] every SCF is implementable, by asking people their types
- [x] if an SCF is implementable at all (in Bayesian Nash, or in dominant strategies), then it is implementable by a direct incentive-compatible mechanism
- [ ] truthful report is the unique equilibrium of every direct mechanism
- [ ] Gibbard–Satterthwaite is false once we allow indirect mechanisms
::: solution
The principle is a reduction: it does not create implementability, it relocates it to the IC constraints of a direct mechanism. Indirect mechanisms cannot escape Gibbard–Satterthwaite, because if an indirect mechanism implemented a non-dictatorial onto $f$ in dominant strategies, the revelation principle would produce a DSIC direct $f$, which the theorem forbids.
:::
:::

## Implementation and Maskin monotonicity

The revelation principle delivers $f$ as *an* equilibrium. A stronger demand, due to Maskin (1977/1999), is **Nash implementation**: every Nash equilibrium of the mechanism should give $f(\theta)$, at every $\theta$, and some equilibrium should exist. That rules out “unwanted” equilibria of the direct mechanism.

A necessary condition is **Maskin monotonicity**: if $f(\theta) = x$ and, in a new profile $\theta'$, $x$ does not fall in anyone’s ranking against any alternative, then $f(\theta') = x$. With at least three agents, Maskin monotonicity plus a no-veto condition is also sufficient: there exists a (typically large-message) mechanism that Nash-implements $f$. The construction is clever and rarely practical; its value is the characterisation. Many natural SCFs, including majority rule, fail Maskin monotonicity, which is why Nash implementation is a demanding standard.

For this course the working standard remains BIC or DSIC of a direct mechanism, as in screening and in the VCG mechanisms of the next chapter. Implementation theory is the warning that “an equilibrium” is not “the equilibrium”.

::: application Regulation as a mechanism
A regulator does not know a utility’s cost type $\theta$. She wants the efficient quantity $q(\theta)$ and a transfer that covers cost without leaving too much rent. Baron and Myerson (1982) and Laffont and Tirole (1986, 1993) treat the regulatory contract as a direct mechanism: the firm reports $\theta$, and the regulator assigns $(q(\hat\theta), t(\hat\theta))$. Incentive compatibility is the same constraint as in [[information-economics/screening#prop-ndat]], and the same conclusions follow: no distortion at the top, downward distortion at the bottom, an information rent for low-cost firms. The revelation principle is what licenses writing the regulation as a menu of contracts, which is how it appears in practice (price-cap menus, cost-of-service with sharing rules).
:::

## Where this leads

Once transfers are allowed and payoffs are quasi-linear, DSIC is much less grim than Gibbard–Satterthwaite: the Vickrey–Clarke–Groves family implements efficient allocations in dominant strategies. The remaining constraints are participation and budget balance, and they cannot always be met together. That is the next chapter, and it is the reason a bilateral monopoly with hidden values cannot be guaranteed to trade efficiently even by the best mechanism.

The same IC constraints, in a Bayesian setting with quasi-linear payoffs, are the envelope formula that Myerson used to derive optimal auctions, taken up in [[market-design/optimal-auctions]]. Mechanism design is the unifying language; auctions, regulation, public-good provision and matching are the applications.

::: history
Leonid Hurwicz, from the 1960s onwards, asked what resource-allocation mechanisms could be used when information is dispersed, and introduced incentive compatibility as a constraint. Allan Gibbard (1973) and Mark Satterthwaite (1975) proved the dictatorship theorem for strategy-proof voting. The revelation principle was formulated in several places around 1979 — Myerson, Dasgupta–Hammond–Maskin, Gibbard — and became the working method of the field. Eric Maskin’s 1977 paper on Nash implementation (published in the *Review of Economic Studies* in 1999) gave the monotonicity characterisation. Hurwicz, Maskin and Myerson shared the 2007 Nobel Prize “for having laid the foundations of mechanism design theory”.
:::

::: summary
- A social choice function names an outcome for every type profile. A mechanism is a game whose equilibrium is supposed to deliver that outcome.
- The revelation principle: any SCF implementable in Bayesian Nash (or dominant strategies) is implementable by a direct incentive-compatible mechanism. Indirect games do not expand the set of implementable SCFs.
- Incentive compatibility — DSIC or BIC — is the constraint. Screening menus and signalling wage schedules are IC direct mechanisms.
- Gibbard–Satterthwaite: with three or more alternatives, unrestricted rankings, no transfers, the only onto DSIC SCFs are dictatorships. Every standard voting rule is manipulable somewhere.
- Maskin monotonicity is necessary for Nash implementation of *all* equilibria. The working standard in this course is the weaker, one-equilibrium notion.
:::

## Exercises

::: exercise Dictatorship is DSIC {level=1}
Let $X = \{A, B, C\}$ and let $f$ always choose voter 1’s top alternative. Show that $f$ is DSIC. Is it onto? Is it efficient?
::: solution
Voter 1, by naming her true top, gets her top; any other report yields something she likes weakly less. Voters 2 and 3 cannot affect the outcome, so they have no profitable deviation. Hence DSIC. Every alternative is 1’s top at some profile, so $f$ is onto. It is efficient (ex post Pareto) because the chosen alternative is someone’s unique top, hence cannot be Pareto-dominated. This is the SCF that Gibbard–Satterthwaite says we are stuck with, on an unrestricted domain without transfers.
:::
:::

::: exercise A two-alternative exception {level=1}
With two alternatives $A, B$ and an odd number of voters, majority rule is DSIC. Why does this not contradict Gibbard–Satterthwaite?
::: solution
The theorem requires at least three alternatives. With two alternatives, majority rule (and several other rules) is strategy-proof: naming your favourite is dominant, because there is no third alternative to use as a strategic vote. The “at least three” hypothesis is necessary.
:::
:::

::: exercise Direct form of second-price {level=1}
In a second-price (Vickrey) auction of one object, two bidders, private values. Describe the direct mechanism. Is it DSIC?
::: solution
Each bidder reports a value. The higher report wins and pays the lower report; the loser pays 0. This is DSIC: the argument is the standard Vickrey argument (your report does not affect the price you pay, only whether you win, so you want to win if and only if your value exceeds the price, i.e. the other’s report). The next chapter generalises this to VCG.
:::
:::

::: exercise IC in a discrete public good {level=2}
Two agents, $\theta_i \in \{0, 1\}$, independent with $\Prob(\theta_i = 1) = 1/2$. A public good of cost $1.2$ should be provided iff $\theta_1 + \theta_2 \ge 1.2$, hence iff both agents have type 1 (because a single type-1 agent contributes only 1). Transfers: each pays $0.6$ if the good is provided and $0$ otherwise. Is truthful report a Bayesian–Nash equilibrium? Is it DSIC?
::: hint
Check a type-1 agent’s incentive to report 0, given a belief that the other is type 1 with probability $1/2$.
:::
::: solution
The efficient rule provides only if both report 1. Each then pays 0.6.

*Bayesian IC.* A type-1 agent who reports 1: with probability $1/2$ the other is type 1, the good is provided, payoff $1 - 0.6 = 0.4$; with probability $1/2$ the other is type 0, no provision, payoff 0. Expected payoff $0.2$. If she reports 0, the good is never provided (it needs two 1s), payoff 0. So she prefers to report 1. A type-0 agent who reports 1: with probability $1/2$ the good is provided and she pays 0.6 for a good worth 0 to her, payoff $-0.6$; with probability $1/2$ payoff 0. Expected $-0.3 < 0$, which is her payoff from reporting 0. So BIC holds.

*DSIC.* A type-0 agent who knows the other reports 1 (or, in dominant-strategy terms: against the other reporting 1) gets payoff $-0.6$ if she reports 1 and 0 if she reports 0. She does not want to report 1, so the deviation that BIC worried about is not a dominant-strategy problem for type 0. For type 1 against the other reporting 1: report 1 gives $0.4$, report 0 gives 0. Against the other reporting 0: both reports give 0. So truth is weakly dominant. The mechanism *is* DSIC in this instance. (Change the cost to $0.8$, provide iff at least one reports 1, and DSIC will fail: a type 1, facing another type 1, would rather report 0 and free-ride.)
:::
:::

::: exercise Free-riding {level=2}
Modify the previous exercise: cost is $0.8$, and $f$ provides iff at least one reported type is 1. Each contributor who reported 1 pays $0.8 / k$ where $k$ is the number of reported 1s; reported 0s pay nothing. Show that truthful report is *not* DSIC.
::: solution
Let agent 1 have $\theta_1 = 1$ and suppose agent 2 reports 1. If agent 1 reports 1, the good is provided and she pays $0.4$, payoff $0.6$. If she reports 0, the good is still provided (agent 2’s report) and she pays 0, payoff $1$. She free-rides. Truth is not dominant. (This is the classical free-rider problem recast as a failed IC constraint. VCG, in the next chapter, will charge the *pivotal* agent her externality, which in this profile is 0 for a second contributor — so VCG also does not charge her, and still provides. The difference is that VCG’s payments are not designed to cover the cost, only to get IC.)
:::
:::

::: exercise Envelope and virtual value {level=2}
An agent with quasi-linear payoff $\theta q - t$, $\theta \in [0, 1]$, faces a direct mechanism $(q(\hat\theta), t(\hat\theta))$. Show that DSIC implies that $q$ is non-decreasing and that

$$
t(\theta) = t(0) + \theta q(\theta) - \int_0^\theta q(z)\,dz.
$$

(This is the envelope formula used in [[information-economics/screening]] and in Myerson’s optimal auction.)
::: hint
DSIC for types $\theta$ and $\theta'$ gives two inequalities; add them to get monotonicity, then take a derivative.
:::
::: solution
DSIC: $\theta q(\theta) - t(\theta) \ge \theta q(\theta') - t(\theta')$ and $\theta' q(\theta') - t(\theta') \ge \theta' q(\theta) - t(\theta)$. Adding, $(\theta - \theta')\bigl(q(\theta) - q(\theta')\bigr) \ge 0$, so $q$ is non-decreasing. The agent’s equilibrium payoff $U(\theta) = \theta q(\theta) - t(\theta)$ then satisfies $U(\theta) \ge U(\theta') + (\theta - \theta') q(\theta')$. This is the statement that $U$ has subgradient $q$, so $U'(\theta) = q(\theta)$ almost everywhere, hence $U(\theta) = U(0) + \int_0^\theta q$. Substituting $U(\theta) = \theta q(\theta) - t(\theta)$ and $U(0) = -t(0)$ gives the formula. The transfer is determined, up to a constant, by the allocation rule. That is why screening and optimal-auction problems reduce to choosing $q(\cdot)$ subject to monotonicity.
:::
:::

::: exercise GS and a restricted domain {level=3}
Three alternatives $\{L, M, R\}$ (left, middle, right) lie on a line. Preferences are **single-peaked**: each voter has a peak in $\{L, M, R\}$ and ranks alternatives by distance from the peak. The SCF $f$ that chooses the median of the three peaks is well-defined. Show that $f$ is DSIC. Why does this not contradict Gibbard–Satterthwaite?
::: hint
A voter whose peak is already the median cannot change the median in a direction she likes; a voter whose peak is to the left of the median can only move the median further right, or not at all, by lying.
:::
::: solution
Suppose voter 1’s peak is $L$ and the current median is $M$ (so the other two peaks are, in some order, not both $L$). If she reports $L$, the median is $M$. If she reports $M$, the median is still $M$ or moves toward $M$. If she reports $R$, the median moves weakly right, to $M$ or $R$, both of which she likes less than $M$. So she cannot profit. The case of a peak at $R$ is symmetric. If her peak is already the median, any lie either leaves the median or moves it away from her peak. Hence DSIC.

Gibbard–Satterthwaite assumes an *unrestricted* domain (all strict rankings). Single-peakedness excludes $L \succ R \succ M$ and $R \succ L \succ M$. On the restricted domain, the median rule is a non-dictatorial, onto, strategy-proof SCF. Domain restrictions are the standard escape from GS; they are also a modelling choice that has to be justified (political preferences over a left–right line often are single-peaked; rankings of three unrelated public projects often are not).
:::
:::

::: exercise Revelation from an indirect menu {level=3}
A monopolist offers two bundles, $(q_L, P_L) = (1, 2)$ and $(q_H, P_H) = (3, 8)$, as in [[information-economics/screening#ex-mussa]]. Types are $\theta_L = 2$, $\theta_H = 3$. Write this as a direct mechanism: what allocation and transfer does each reported type receive? Verify the IC inequalities. What would a type-3 agent get if she reported 2, and why does she not?
::: solution
Direct mechanism: a report of $\theta_L$ receives $q = 1$, $t = 2$; a report of $\theta_H$ receives $q = 3$, $t = 8$. (A report outside $\{2, 3\}$ is off-path; assign it, say, the low bundle.) Type 2’s payoff from truth: $2\cdot 1 - 2 = 0$; from reporting 3: $2\cdot 3 - 8 = -2$. Type 3’s payoff from truth: $3\cdot 3 - 8 = 1$; from reporting 2: $3\cdot 1 - 2 = 1$. IC holds (type 3’s IC binds). She does not strictly prefer to report 2 because the information rent $(\theta_H - \theta_L)q_L = 1$ was built into $P_H$ exactly so that she is indifferent. The screening menu *is* the direct mechanism; the revelation principle is the licence to have written it that way rather than as some more complicated bargaining game.
:::
:::

::: example A Groves-style transfer in a two-person public good {#ex-groves-preview}
Two agents, values $\theta_1, \theta_2 \in \R$, cost of a public good equal to 10. The efficient rule is $q = 1$ iff $\theta_1 + \theta_2 \ge 10$. Consider the transfers $t_i = 10 - \theta_j$ if $q = 1$ and $i$ is pivotal (without $i$, $\theta_j < 10$), and $t_i = 0$ otherwise. Take $\theta_1 = 8$, $\theta_2 = 5$. Who is pivotal, what is paid, and does agent 1 want to report truthfully given $\theta_2 = 5$?
::: solution
Sum is 13, so $q = 1$. Without agent 1, $\theta_2 = 5 < 10$, so agent 1 is pivotal and pays $t_1 = 10 - 5 = 5$. Without agent 2, $\theta_1 = 8 < 10$, so agent 2 is also pivotal and pays $t_2 = 10 - 8 = 2$. Agent 1’s payoff is $8 - 5 = 3 > 0$; if she reported $4$ (say), the sum of reports would be 9, $q = 0$, payoff 0, which is worse. If she reported 100, $q$ would still be 1 and her payment, which does not depend on her report, would still be 5. She cannot gain by lying. This is a Clarke pivot rule, the leading special case of VCG, developed in the next chapter.
:::
:::

::: exercise An SCF that is BIC but not DSIC {level=3}
Two agents, types independent uniform on $[0, 1]$, one object, the efficient SCF assigns the object to the higher type. Transfers: the winner pays $1/2$ (a posted price), the loser pays 0; if both reports are $\ge 1/2$ the object is assigned at random and the winner still pays $1/2$; if both are below $1/2$ the object is not sold. (This is a posted-price mechanism, not the efficient SCF.) Instead consider the **expected-externality** (d’Aspremont–Gérard-Varet) transfers for the *efficient* assignment: $t_i(\hat\theta_i) = \E_{\theta_j}[-\theta_j \mathbf{1}_{\{\hat\theta_i \ge \theta_j\}}] + \text{a function of }\hat\theta_j$ only. Argue that truthful report is BIC for the efficient assignment with these transfers, but that it is not DSIC, by exhibiting a type and a realised $\theta_j$ against which a lie is profitable.
::: hint
The AGV transfer makes the reporter internalise the *expected* externality, not the realised one. If she knows $\theta_j$, the realised externality is not equal to the expected one.
:::
::: solution
AGV charges agent $i$ the expected value of the object to $j$ in the event that $i$’s report wins it, which is $\E[\theta_j \mathbf{1}_{\{\hat\theta_i \ge \theta_j\}}]$. For $\theta_j$ uniform on $[0, 1]$, this equals $\int_0^{\hat\theta_i} \theta_j\,d\theta_j = \hat\theta_i^2/2$. Agent $i$’s expected payoff from reporting $\hat\theta$, when her type is $\theta$, is $\theta \hat\theta - \hat\theta^2/2$ (she wins with probability $\hat\theta$). This is maximised at $\hat\theta = \theta$. So BIC holds.

Not DSIC: suppose $\theta_j$ is realised at $0.2$ and $i$ knows it (or we test dominance against this report). Truth for $\theta_i = 0.9$ wins and pays $0.9^2/2 = 0.405$, payoff $0.9 - 0.405 = 0.495$. The realised VCG payment would have been $0.2$, payoff $0.7$. More to the point as a profitable *lie*: reporting $0.21$ still wins against $0.2$ and pays $0.21^2/2 \approx 0.022$, payoff $\approx 0.878$, which is better than reporting $0.9$. Knowing $\theta_j$, she wants to report just above it, not her true $\theta_i$. AGV is BIC, not DSIC. VCG (next chapter) is DSIC, and its payment here would be the realised $\theta_j = 0.2$, independent of her report (conditional on winning).
:::
:::
