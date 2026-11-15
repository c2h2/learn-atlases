A diner who has already paid a buffet price of 20 units eats a second plate that she does not enjoy, “to get her money’s worth”. A shopper who would not pay 12 units for a mug she does not own refuses to sell the same mug, once it is in her hand, for 12. A committee that has spent two years and a large budget on a project whose expected return has collapsed votes to finish it. In each case the standard model of the consumer in [[microeconomics/consumer-choice]] has a sharp prediction: sunk costs do not enter the opportunity-cost comparison; willingness to pay and willingness to accept coincide when income effects are small; continuation values, not historical outlays, decide whether a project goes on. People often do the opposite. Behavioural economics begins with such **anomalies** — robust, replicable departures from the predictions of the standard model — and asks which small changes in the model restore a useful account of what we see.

This chapter is about the standard model itself: what “rationality” means in economics, which axioms do the work, how those axioms are tested on choice data, and where they fail. It is also about what they do *not* mean. An economist’s rational agent is not a cold calculator with infinite memory. She is a preference relation that is complete and transitive, or a demand that satisfies the weak axiom of revealed preference. Once those conditions are granted, a utility function exists and the apparatus of intermediate microeconomics applies. Behavioural work does not throw the apparatus away. It asks which axiom is the one that is failing, and whether a nearby model — still written with preferences, still solved by maximisation — fits better.

## What rationality means in economics

In everyday speech a rational choice is a wise one. In economics it is a **consistent** one. The theory of the consumer starts with a set $X$ of bundles and a binary relation $\succsim$ on $X$, read “is at least as good as”. Completeness says the agent can compare any two bundles; transitivity says the comparisons do not cycle. Continuity, on a Euclidean consumption set, rules out jumps that would prevent a utility representation. Nothing in those axioms says the agent is selfish, or well informed, or happy with the result.

::: definition Rational preference {#def-rational-pref}
A binary relation $\succsim$ on a set $X$ is a **rational preference** if it is
**complete**: for all $x, y \in X$, $x \succsim y$ or $y \succsim x$ (or both); and
**transitive**: $x \succsim y$ and $y \succsim z$ imply $x \succsim z$.
If $X \subseteq \R^n$ is convex and $\succsim$ is also continuous, then there exists a continuous utility function $u: X \to \R$ such that $x \succsim y$ if and only if $u(x) \ge u(y)$.
:::

The representation is unique only up to strictly increasing transformation. That is why economics talks about ordinal utility in the sure world of [[microeconomics/preferences-and-utility]], and why a statement such as “this bundle gives twice as much utility” has no meaning until more structure — expected utility, or a cardinal welfare function — is added. Completeness is already a strong claim: it says the agent never shrugs. Transitivity is the claim that makes maximisation well defined. If $x$ is chosen from $\{x, y\}$ and $y$ from $\{y, z\}$ and $z$ from $\{z, x\}$, there is no bundle that maximises $\succsim$ on the triple.

::: example A cycle of three restaurants {#ex-cycle}
A diner prefers restaurant $A$ to $B$ when those two are the menu, $B$ to $C$ when those two are the menu, and $C$ to $A$ when those two are the menu. The three pairwise choices are observed on three different nights, with nothing else changing. Is there a utility function that rationalises the three choices?
::: solution
No. A utility representation would require $u(A) > u(B)$, $u(B) > u(C)$ and $u(C) > u(A)$, which cannot hold for any real-valued $u$. Equivalently, the revealed preference relation has a cycle, so it is not transitive and [[#def-rational-pref]] fails. (If the three nights differed in a payoff-relevant way — a different companion, a different walk from the office — the observations would not be three choices from the same preference, and there would be no paradox.)
:::
:::

Utility maximisation on a budget set is a special case. With prices $p$ and income $m$, the ordinary (Marshallian) demand $x(p, m)$ is the maximiser of $u$ on $\{x \in X: p \cdot x \le m\}$. The testable content of that hypothesis, when we do not observe $u$, is a restriction on how demand may change as the budget changes.

::: definition Weak axiom of revealed preference {#def-warp}
A demand $x(p, m)$ satisfies the **weak axiom of revealed preference** (WARP) if, whenever $p \cdot x(p', m') \le m$ and $x(p, m) \ne x(p', m')$, one has $p' \cdot x(p, m) > m'$. In words: if $x(p', m')$ was affordable when $x(p, m)$ was chosen, and the two bundles are distinct, then $x(p, m)$ must have been strictly too expensive when $x(p', m')$ was chosen.
:::

WARP is the finite-data shadow of the idea that chosen bundles are preferred to the bundles that were affordable and not chosen. It is necessary for utility maximisation. On two observations it is also almost sufficient; with many observations the stronger **generalised axiom** (GARP) is the right test, and Afriat’s theorem says that GARP is necessary and sufficient for the existence of a concave, strictly increasing utility that rationalises the data. We will work with WARP, which already catches the anomalies this chapter cares about.

::: proposition WARP is necessary for utility maximisation {#prop-warp-nec}
Suppose $x(p, m)$ maximises a preference $\succsim$ on the budget set. Then $x$ satisfies WARP.
:::
::: proof
Suppose $p \cdot x(p', m') \le m$ and $x(p, m) \ne x(p', m')$. Then $x(p', m')$ was affordable when $x(p, m)$ was chosen, so $x(p, m) \succ x(p', m')$ (strictly, because the two are distinct and the maximiser is unique, or because local non-satiation turns weak preference plus distinctness into a cheaper-point contradiction). Therefore $x(p, m)$ cannot have been affordable when $x(p', m')$ was chosen: $p' \cdot x(p, m) > m'$.
:::

::: example Two budgets, two bundles {#ex-warp}
A consumer faces two budget situations. Under prices $(2, 2)$ and income $20$ she buys $(6, 4)$. Under prices $(1, 3)$ and income $20$ she buys $(5, 5)$. Does this pair of observations satisfy WARP?
::: solution
Check affordability of each bundle on the other budget. The cost of $(5, 5)$ at prices $(2, 2)$ is $2 \cdot 5 + 2 \cdot 5 = 20$, so $(5, 5)$ was exactly affordable when $(6, 4)$ was chosen. The cost of $(6, 4)$ at prices $(1, 3)$ is $1 \cdot 6 + 3 \cdot 4 = 18$, which is strictly less than $20$, so $(6, 4)$ was affordable — in fact cheaper — when $(5, 5)$ was chosen. The two bundles are distinct. WARP therefore fails: each chosen bundle was affordable in the other situation, so the data cannot come from maximising a single preference. A utility maximiser who chose $(6, 4)$ on the first budget would have had to find $(6, 4)$ too expensive on the second.
:::
:::

::: widget plot
f: 10 - x; (20 - x)/3
x: 0, 12
y: 0, 12
labels: \text{budget 1 }(p=(2,2)); \text{budget 2 }(p=(1,3))
points: 6,4; 5,5
caption: Two budget lines of income 20. The marked points are the choices in [[#ex-warp]]: $(6,4)$ on the steeper line and $(5,5)$ on the flatter one. Each point lies on or inside the other budget, which is exactly a WARP violation. Drag the view to confirm that $(6,4)$ sits strictly inside budget 2.
:::

WARP is a statement about *choices*, not about thoughts. An agent who cannot report a preference, or who reports a cycle in speech, may still satisfy WARP on the budgets we observe. Conversely, an agent who talks a good game may violate it. Behavioural economics takes this revealed-preference stance seriously: the data are choices, and a model is a restriction on choices. Introspection and survey answers are clues, not the object to be explained.

::: warning Rationality is not selfishness
A common slide in first-year courses draws a “rational” agent as one who maximises her own money. That is a different assumption, **self-interest**, and it is not part of [[#def-rational-pref]]. Parents who spend on their children, donors who give to strangers, and responders who reject unfair ultimatum offers can all be rational in the economist’s sense: they maximise a complete, transitive preference, just not a preference that depends only on own consumption. Social preferences are the subject of [[behavioural-economics/social-preferences]]. Confusing the two leads to the mistaken claim that every kind act is a refutation of economics, and to the opposite mistake that economics has nothing to say about kind acts.
:::

## Bounded rationality

Completeness and transitivity are silent on the cost of deciding. Herbert Simon’s 1955 argument was that the scarce resource is often not the budget but the agent’s attention and computing time. A chess player does not enumerate the game tree; a shopper does not solve a Lagrangean in the supermarket aisle. Simon proposed that people **satisfice**: they search until they find an option that meets an aspiration level, and they stop.

::: definition Satisficing {#def-satisfice}
An agent **satisfices** with aspiration level $a$ on a set of options that arrive sequentially if she accepts the first option $x$ with $u(x) \ge a$ (or the last option, if none meets $a$). The aspiration level may itself adjust with experience. Satisficing is a procedure, not a preference: the choice it produces depends on the order in which options are inspected and on $a$.
:::

Satisficing can look like utility maximisation when the aspiration is high and search is cheap, and like random choice when the aspiration is low and the menu is long. It is a leading example of **bounded rationality**: behaviour that is goal-directed but subject to cognitive constraints. Two modelling styles have grown out of Simon’s observation.

The first style writes an *optimal* procedure under explicit constraints on information or computation. Rational inattention (Sims), sparse maximisation (Gabaix), and sequential search (McCall, Weitzman) are of this kind: the agent maximises, but the object maximised already includes the cost of looking. Those models are taken up in [[behavioural-economics/limited-attention]]. They are “behavioural” in the hypotheses they encode, not in any abandonment of maximisation.

The second style writes a *simple* procedure that is not the solution of a cost-of-thinking problem, and studies its implications. Heuristics in the sense of Tversky and Kahneman — representativeness, availability, anchoring — are of this kind; so are level-$k$ step-by-step reasoning in games and many mental-accounting rules. The justification, when there is one, is empirical fit plus tractability, not an optimality claim.

::: example Searching for a flat {#ex-search}
A student will look at up to four flats. Each inspection costs $1$ unit of hassle, and the values of the flats, in the order she will see them, are $8$, $5$, $12$ and $7$. She cannot return to a rejected flat. A maximiser who knows the four values in advance inspects until she has seen the best, here the third. A satisficer with aspiration $9$ stops at the first flat that meets $9$. What does each type do, and what net value (value minus inspection costs) does each obtain? What if the aspiration is $6$?
::: solution
The unconstrained maximiser who knows the list takes the third flat, having paid $3$ in inspection costs, for a net of $12 - 3 = 9$. (If she must pay to inspect even a flat she then takes, the same accounting applies to every procedure.) The satisficer with $a = 9$ rejects $8$, rejects $5$, and accepts $12$, also paying $3$, also netting $9$. With $a = 6$ she accepts the first flat: net $8 - 1 = 7$, which is worse. The two procedures agree when the aspiration sits between the first acceptable value and the true maximum, and they disagree when it does not. A modeller who observes only the chosen flat cannot tell them apart on this one menu; observing how the choice changes with the order of inspection would tell them apart, because only the satisficer’s choice is order-dependent.
:::
:::

::: intuition As-if and the as-is
Milton Friedman’s 1953 essay on positive economics defended “as-if” maximisation: a theory is to be judged by its predictions, not by the realism of its assumptions, as a billiard player may not know the angles and yet play as if she had solved the physics. Behavioural economics does not reject as-if. It notes that as-if expected-utility maximisation fails particular, portable predictions — Allais choices, the endowment effect, declining discount rates — and that a nearby as-if model (prospect theory, $\beta$–$\delta$ discounting) restores them. The argument with Friedman is over which predictions count, not over whether assumptions must be literally true. Where we can open the black box, with process data or response times or eye-tracking, we do; where we cannot, we still need a model that is right as if.
:::

## Anomalies that started the field

An **anomaly**, in Thaler’s usage, is an empirical regularity that is difficult to rationalise with the standard model and that is produced by a psychology one can name. The word is a claim about the literature, not a theorem. Several regularities from the 1970s and 1980s still organise the course.

**Preference reversals.** Lichtenstein and Slovic (1971) offered subjects a pair of bets: a “P-bet” with a high chance of a modest prize, and a “\$-bet” with a smaller chance of a larger prize. Asked which bet they preferred, many chose the P-bet. Asked to state a selling price for each, many put a higher price on the \$-bet. The two tasks revealed opposite rankings of the same pair. A single preference relation cannot do that. Later work (Tversky, Slovic and Kahneman 1990) traced the reversal to the way prices are generated — an anchoring on the monetary prize of the \$-bet — rather than to intransitive preference in choice. The finding is therefore as much about **procedure invariance** (the ranking should not depend on whether we elicit it by choice or by valuation) as about transitivity.

**Framing.** Tversky and Kahneman (1981) described a disease expected to kill 600 people. In the “gain” frame, programme A saves 200 people for sure and programme B saves 600 with probability $1/3$ (otherwise none). In the “loss” frame, programme C lets 400 die for sure and programme D lets 600 die with probability $2/3$ (otherwise none). The two pairs are the same, but a majority chose A over B and D over C. The standard model has no room for two descriptions of the same consequence to produce two choices: preferences are defined on outcomes, not on the sentences that name them. Prospect theory, in [[behavioural-economics/prospect-theory]], treats the frame as selecting a reference point.

**The decoy (attraction) effect.** Add to a menu $\{x, y\}$ a third option $z$ that is dominated by $x$ but not by $y$. Huber, Payne and Puto (1982) found that the share of $x$ rises. Regularity — a standard implication of any random-utility model in which adding an option cannot raise the probability of an existing one — is violated. The decoy makes $x$ look like a compromise, or makes $x$’s advantages easier to see. Menu dependence of this kind is a cousin of the **compromise effect** (Simonson 1989) and of **choice overload**, taken up with the replications in [[behavioural-economics/limited-attention]].

**Sunk-cost continuation.** Arkes and Blumer (1985) found that people who had paid more for a theatre season used more of the tickets, and that hypothetical decision-makers were more willing to finish a half-built plane when the past outlay was described as large. Standard opportunity-cost reasoning says the past outlay is gone. The psychology is that abandoning the project makes the past outlay feel like a loss, and losses loom larger than gains. Whether the same pattern survives when the stakes are a firm’s, not a questionnaire’s, is a live empirical question; it is well documented for small personal outlays.

**Status-quo bias and the endowment effect.** Samuelson and Zeckhauser (1988) documented a disproportionate sticking with the default in survey choices among investment allocations and health plans. Kahneman, Knetsch and Thaler (1990), in a much-replicated classroom market with mugs, found that randomly assigned owners demanded roughly twice as much to sell as non-owners were willing to pay. With small income effects the standard model predicts that the two valuations coincide and that the volume of trade will be about half the mugs. The gap is the **endowment effect**; its leading explanation is loss aversion relative to the current holding, developed in [[behavioural-economics/prospect-theory]]. Plott and Zeiler (2005, 2007) argued that much of the gap is an artefact of the experimental instructions; Isoni, Loomes and Sugden (2011) recovered a gap for lotteries with those instructions. The right summary is not “the endowment effect is an illusion” or “the endowment effect is a law of nature”. It is that a WTA–WTP gap appears reliably for some goods and procedures and shrinks with market experience (List 2003) and with certain training.

::: example A decoy on a three-item menu {#ex-decoy}
Two shops sell the same two cameras. Camera $H$ (high quality) is priced at $10$, camera $L$ (low quality) at $6$. Shop 1 offers only $\{H, L\}$. Shop 2 adds a third camera $D$ that is worse than $H$ on quality and costs $10$ — a decoy dominated by $H$. In a classroom, 32 of 80 students choose $H$ in shop 1 and 48 choose $L$. In shop 2, 50 of 80 choose $H$, 22 choose $L$, and 8 choose $D$. Has regularity been violated? What is the change in $H$’s share?
::: solution
Regularity says that the probability of choosing $H$ from a larger menu cannot exceed the probability of choosing $H$ from a subset. Here $\Prob(H \mid \{H, L\}) = 32/80 = 0.40$ and $\Prob(H \mid \{H, L, D\}) = 50/80 = 0.625$. The share of $H$ *rises* by $0.225$ when a dominated option is added, so regularity fails. The decoy drew a little mass of its own ($8/80$) and, more importantly, moved choosers from $L$ to $H$. A random-utility model in which $H$, $L$ and $D$ have independent noise cannot do this: adding $D$ can only steal share from $H$ and $L$. (Enter the share of $H$ in shop 2 as a decimal if asked: $0.625$.)
:::
:::

::: quiz
A dataset of two choices violates WARP. Which conclusion is licensed?
- [ ] The chooser is selfish.
- [ ] The chooser’s preference is incomplete.
- [x] No single complete, transitive preference, maximised on each budget, can have generated both choices.
- [ ] The chooser is unaware of one of the prices.
::: solution
WARP is necessary for utility maximisation ([[#prop-warp-nec]]). A violation means that no single rational preference ([[#def-rational-pref]]) maximised on each budget set can fit both observations. It does not speak to selfishness, and it does not isolate completeness as the failed axiom — transitivity, maximisation itself, or a changing preference would also suffice. Unawareness of a price is one *possible* mechanism, not a conclusion from the data alone.
:::
:::

## How behavioural economics proceeds

The research programme that grew out of these anomalies has a method, not just a list.

First, **keep the modelling language of economics**. An agent, a constraint, a maximisation (or a simple alternative procedure), and, in markets and games, an equilibrium. The point of prospect theory is not that “people are irrational”. It is that a value function $v$ defined on gains and losses, together with a weighting function $w$, organises a large set of choices that expected utility does not.

Second, **nest the standard model**. Loss aversion of $1$ is expected utility in the sure world; $\beta = 1$ is exponential discounting; Fehr–Schmidt envy and guilt of $0$ is own-payoff maximisation; infinitely precise logit best responses are Nash. Nesting makes the behavioural model testable: the standard model is the null, and a parameter measures the departure.

Third, **take the model to several environments**. A finding that lives only in one classroom protocol is a curiosity. A finding that appears in the laboratory, in administrative data, and in a natural experiment — default enrolment in pensions in the United States (Madrian and Shea 2001), in Denmark (Chetty, Friedman, Leth-Petersen, Nielsen and Olsen 2014), and in opt-out organ-donation regimes (Johnson and Goldstein 2003) — is a candidate stylised fact. Failures to replicate are part of the same discipline. Iyengar and Lepper’s (2000) jam-aisle result, in which more choice reduced purchases, has a much more mixed record than the original paper suggested (Scheibehenne, Greifeneder and Todd 2010; Chernev, Böckenholt and Goodman 2015). The Open Science Collaboration (2015) recovered only about $36\%$ of a sample of psychology findings at the original effect size; Many Labs (Klein et al. 2014), by contrast, replicated several of the classical Kahneman–Tversky demonstrations, including anchoring. A course that reported only the first paper in each line would mis-teach the subject.

Fourth, **separate description from welfare**. That people overweight small probabilities, or stick with defaults, is a positive claim. That they would be better off if a planner reweighted the probabilities, or changed the default, is a welfare claim, and it needs a criterion. Revealed preference cannot be that criterion once the same person reveals two preferences in two frames. Behavioural welfare economics, in [[behavioural-economics/behavioural-policy]], is the attempt to say something disciplined anyway.

::: remark Portable predictions
Koszegi (2014) and Rabin (2013) have argued that the useful behavioural models are those whose predictions travel: loss aversion predicts both insurance for modest risks and the endowment effect; present bias predicts both under-saving and a demand for commitment; inequality aversion predicts both ultimatum rejections and wage compression. A model that explains one experiment with one free parameter per cell does not travel. This course privileges models that travel, and it flags, as we go, where a parameter fitted in one setting has been asked to work in another and has failed.
:::

## Evidence

The anomalies above are not all on the same footing, and it is part of the subject to say so.

**Well replicated, portable.** Loss aversion in choices over money (Tversky and Kahneman 1992; many subsequent parameter estimates around $\lambda \approx 2$). Default effects on enrolment (Madrian and Shea 2001; Choi, Laibson, Madrian and Metrick 2004; Chetty et al. 2014). Present-bias preference reversals for dated rewards, at least in the aggregate (Thaler 1981; Frederick, Loewenstein and O’Donoghue 2002), with a more complicated picture once effort rather than money is the reward (Augenblick, Niederle and Sprenger 2015). Ultimatum rejections of offers below about $20$–$30\%$ of the pie, across many countries, with quantitative variation (Güth, Schmittberger and Schwarze 1982; Roth, Prasnikar, Okuno-Fujiwara and Zamir 1991; Henrich et al. 2001, 2005).

**Real, but sensitive to procedure.** The endowment effect for consumption goods (Kahneman, Knetsch and Thaler 1990; Plott and Zeiler 2005, 2007; Isoni, Loomes and Sugden 2011; Ericson and Fuster 2014). Anchoring on irrelevant numbers (Tversky and Kahneman 1974; Ariely, Loewenstein and Prelec 2003), which Many Labs replicated, but whose size depends on the plausibility of the anchor. Framing of the Asian-disease type, which is robust as a demonstration and less so as a quantitative parameter.

**Contested or overstated.** Choice overload as a general phenomenon (Iyengar and Lepper 2000 versus the meta-analyses cited above). A single large “nudge effect” in policy, which academic abstracts overstate relative to at-scale trials (DellaVigna and Linos 2022; the Maier et al. 2022 / Mertens et al. 2022 exchange is discussed in [[behavioural-economics/behavioural-policy]]). Social-preference giving in dictator games, which shrinks when the dictator can take as well as give, or when the recipient is not in the room (List 2007; Bardsley 2008).

The right attitude is neither “the standard model is finished” nor “the anomalies are all experimenter demand”. It is to ask, of each regularity, how large it is, in which domains it appears, and which of the axioms in [[#def-rational-pref]] and [[#def-warp]] is the one that has to give.

::: application Revealed preference in the field
Blow, Browning and Crawford (2008) and related work test GARP on household scanner data. Violations exist but are often small, in the sense that a modest measurement error in prices or quantities would restore consistency. That is not a licence to ignore laboratory anomalies: the scanner test has little power against reference dependence or present bias, both of which can produce demand that looks locally like a utility maximiser’s. It is a reminder that the standard model is a good *local* approximation for many household budget shares, which is why it remains the starting point in [[microeconomics/consumer-choice]] and why behavioural models are written as deformations of it rather than as replacements.
:::

::: history
Herbert Simon named bounded rationality in the mid-1950s and received the 1978 Nobel Prize in part for that programme. Independently, Allais (1953) and, later, Ellsberg (1961) produced lottery choices that expected utility could not fit; those paradoxes are the opening of [[behavioural-economics/prospect-theory]]. The modern field coalesced when Tversky and Kahneman’s 1974 and 1979 papers gave psychologists’ regularities a form economists could estimate, and when Thaler (1980) began to write them into consumer theory — sunk costs, the endowment effect, mental accounting — as a “positive theory of consumer choice”. Kahneman received the 2002 Nobel Prize (Tversky had died in 1996); Thaler received the 2017 prize. Experimental economists, notably Vernon Smith, Charles Plott and Alvin Roth, supplied the designs that made the anomalies measurable, and often pushed back on their interpretation. The tension between “anomalies as refutations” and “anomalies as features of the protocol” is as old as the field and is not resolved by naming a winner.
:::

## Where this leads

The next chapter, [[behavioural-economics/judgement-under-uncertainty]], takes up the heuristics that produce probability judgements, which is where Tversky and Kahneman began. Prospect theory then replaces expected utility for choices over money ([[behavioural-economics/prospect-theory]]); present bias replaces exponential discounting ([[behavioural-economics/present-bias]]); social preferences replace own-payoff maximisation ([[behavioural-economics/social-preferences]]). Limited attention and mental accounting ([[behavioural-economics/limited-attention]]) return to Simon’s scarcity of cognition, now with models that can be estimated. Behavioural game theory ([[behavioural-economics/behavioural-game-theory]]) asks what happens when the other player is not a Nash computer either. The last chapter ([[behavioural-economics/behavioural-policy]]) asks what a planner is supposed to do with all of this, and where the evidence on nudges currently stands. The standard theory you already have — [[microeconomics/consumer-choice]], [[microeconomics/uncertainty]], [[microeconomics/labour-and-intertemporal-choice]], [[game-theory/nash-equilibrium]] — is not discarded. It is the special case each of those chapters deforms, and it remains the right model when the deformation is small.

::: summary
- In economics, **rationality** is completeness and transitivity of preference ([[#def-rational-pref]]), not selfishness, not omniscience, and not a claim that the agent is happy with the result.
- Utility maximisation on budgets implies WARP ([[#def-warp]], [[#prop-warp-nec]]). A pair of choices that each lie inside the other’s budget cannot come from a single maximised preference.
- **Bounded rationality** (Simon) is goal-directed choice under cognitive constraints. Satisficing ([[#def-satisfice]]) is a procedure; rational inattention is maximisation with an information cost. They are not the same model.
- Anomalies that helped to start the field include preference reversals, framing, decoy effects, sunk-cost continuation, status-quo bias and the endowment effect. They are not all equally robust.
- Behavioural models keep the language of agents and equilibrium, nest the standard model, and are judged by portable predictions and by replications, not by the vividness of a single demonstration.
- Description is not welfare. Two frames, two choices, one person: revealed preference no longer says which choice is the welfare-relevant one.
:::

## Exercises

::: exercise A missing comparison {level=1}
A relation on $\{x, y, z\}$ has $x \succsim y$, $y \succsim z$ and $x \succsim z$, but neither $y \succsim x$ nor $x \succsim y$ is the issue — rather, $y$ and $x$ *are* ranked, and the missing piece is that $z$ is not compared with $x$ at all. Which axiom in [[#def-rational-pref]] fails? Can the relation still be represented by a utility function on the whole set?
::: solution
Completeness fails, because $z$ and $x$ are unranked. (Transitivity of the comparisons that exist is fine.) A utility representation on the whole set requires completeness: $u(x) \ge u(z)$ or the reverse would rank the pair. One can still represent the *ranked* pairs by a utility on a subset, but not on $\{x, y, z\}$.
:::
:::

::: exercise WARP, satisfied {level=1}
Under prices $(1, 2)$ and income $10$ a consumer buys $(4, 3)$. Under prices $(2, 1)$ and income $10$ she buys $(3, 4)$. Does WARP hold?
::: solution
Cost of $(3, 4)$ at $(1, 2)$: $1 \cdot 3 + 2 \cdot 4 = 11 > 10$, so $(3, 4)$ was not affordable when $(4, 3)$ was chosen. Cost of $(4, 3)$ at $(2, 1)$: $2 \cdot 4 + 1 \cdot 3 = 11 > 10$, so $(4, 3)$ was not affordable when $(3, 4)$ was chosen. WARP’s hypothesis “the other bundle was affordable” never triggers, so WARP holds (vacuously, on this pair). The two observations are consistent with maximising, for example, $u = x_1 x_2$.
:::
:::

::: exercise A cycle in demand {level=1 check="18"}
In [[#ex-warp]] the second observation is $(5, 5)$ at prices $(1, 3)$ and income $20$. What is the cost of the first bundle $(6, 4)$ at those prices? (Enter that cost.)
::: solution
$1 \cdot 6 + 3 \cdot 4 = 18$. Because $18 < 20$, $(6, 4)$ was affordable when $(5, 5)$ was chosen, which is half of the WARP violation.
:::
:::

::: exercise Satisficing versus the best {level=2}
Five options arrive in order, with values $3, 10, 6, 12, 8$. Inspection of each option costs $1$, including the one taken. A maximiser who knows the list in advance takes the best. A satisficer with aspiration $9$ takes the first option at or above $9$. Compute the net value (value minus total inspection cost) of each procedure. Which aspiration levels, among integers $1$ to $12$, give the satisficer a strictly higher net than the maximiser on this list?
::: hint
The maximiser must inspect until the best item appears. Count how many inspections that is.
:::
::: solution
The best item is $12$, in position $4$, so the maximiser inspects four times and nets $12 - 4 = 8$. The satisficer with $a = 9$ rejects $3$, accepts $10$ on the second inspection, and nets $10 - 2 = 8$, a tie. For the satisficer to beat $8$ she must stop at the $10$ (net $8$) or, better, would need a first-item value that is not on this list. Stopping at $12$ costs $4$ and nets $8$. Stopping at $3$ nets $2$. No integer aspiration beats the maximiser on this list: $a \le 3$ takes $3$ (net $2$); $4 \le a \le 10$ takes $10$ (net $8$); $11 \le a \le 12$ takes $12$ (net $8$); $a \ge 13$ takes the last item $8$ (net $3$). The best the satisficer can do here is to tie. That is the usual pattern when the list is known to the maximiser: satisficing is a way of *not needing* the list, not a way of beating someone who has it.
:::
:::

::: exercise Decoy arithmetic {level=2 check="0.625"}
In [[#ex-decoy]], what is the share of camera $H$ in shop 2? Enter the decimal.
::: solution
$50/80 = 0.625$.
:::
:::

::: exercise Procedure invariance {level=2}
A subject chooses the P-bet over the \$-bet in a pairwise choice, and states a higher selling price for the \$-bet than for the P-bet. Which of completeness, transitivity, and procedure invariance is the most direct casualty? Could a complete, transitive preference over *final wealth* produce the two observations if the two tasks are not the same object of choice?
::: solution
The most direct casualty is procedure invariance: two elicitation procedures rank the same pair in opposite ways. Completeness is not at stake (both tasks produce a ranking). Transitivity of a single preference over bets is at stake only if we insist that choice and valuation are the same preference; if they are not, there is no single relation to be transitive. A complete, transitive preference over final wealth *could* produce the pattern if the two tasks are different objects — for example if stating a price is treated as an anchoring-and-adjustment procedure rather than as an indifference report, which is Tversky, Slovic and Kahneman’s (1990) interpretation. The observation is then a fact about the mapping from preference to reported prices, not a cycle in preference.
:::
:::

::: exercise GARP on three observations {level=3}
A consumer is observed three times:

| observation | prices $(p_1, p_2)$ | income | bundle |
|---|---|---|---|
| 1 | $(1, 1)$ | $10$ | $(7, 3)$ |
| 2 | $(1, 2)$ | $12$ | $(4, 4)$ |
| 3 | $(2, 1)$ | $12$ | $(5, 2)$ |

Check pairwise WARP for each ordered pair of distinct observations. Does the dataset satisfy WARP? If not, name a violating pair.
::: hint
For each pair, test whether the bundle chosen in one situation was affordable in the other.
:::
::: solution
Cost of bundle 2 at prices 1: $1 \cdot 4 + 1 \cdot 4 = 8 \le 10$, so bundle 2 was affordable when 1 was chosen. Cost of bundle 1 at prices 2: $1 \cdot 7 + 2 \cdot 3 = 13 > 12$, so bundle 1 was *not* affordable when 2 was chosen. Pair $(1, 2)$ is fine. Cost of bundle 3 at prices 1: $1 \cdot 5 + 1 \cdot 2 = 7 \le 10$; cost of bundle 1 at prices 3: $2 \cdot 7 + 1 \cdot 3 = 17 > 12$. Pair $(1, 3)$ is fine. Cost of bundle 3 at prices 2: $1 \cdot 5 + 2 \cdot 2 = 9 \le 12$; cost of bundle 2 at prices 3: $2 \cdot 4 + 1 \cdot 4 = 12 \le 12$. Bundle 2 was affordable (exactly) when 3 was chosen, and bundle 3 was affordable when 2 was chosen, and the bundles are distinct. Pair $(2, 3)$ violates WARP. The dataset is not rationalisable by a single preference. (A GARP check would look at *indirect* revealed preference as well; here a direct cycle is already enough.)
:::
:::

::: exercise Sunk cost and opportunity cost {level=3}
A firm has spent $40$ on a non-recoverable licence. Completing the project costs a further $70$ and yields expected revenue $100$. Scrapping the project yields $0$. Separately, a new project with the same remaining cost $70$ and expected revenue $100$ is available, with no past outlay.

(a) What does a standard profit maximiser do in each situation?
(b) A behavioural manager feels a loss of $\lambda$ times any “wasted” licence. She completes the first project if $100 - 70 - \lambda \cdot 40 \ge -\lambda \cdot 40$, interpreting scrapping as realising the loss on the licence. Does $\lambda$ affect the completion decision as written? Rewrite the comparison so that scrapping *avoids* a further loss of the extra $70$ but “realises” the $40$, and completion “avoids realising” the $40$ at the cost of $70$. For which $\lambda$ does she then complete a project that a profit maximiser would also complete, and for which $\lambda$ does she complete a project whose remaining NPV is negative?
::: hint
The standard comparison ignores the $40$ in both the “complete” and the “scrap” columns. The behavioural comparison depends on how the reference point treats the sunk outlay.
:::
::: solution
(a) Remaining NPV is $100 - 70 = 30 > 0$, so the maximiser completes the first project and takes the new project. The $40$ is gone in every branch and cancels. (b) As written, $30 - 40\lambda \ge -40\lambda$ simplifies to $30 \ge 0$, so $\lambda$ drops out: if the licence is “lost” whether or not she completes, loss aversion does not distort completion. The distortion appears when scrapping is coded as *realising* the loss $40\lambda$ and completion is coded as *not* realising it. Then she completes if $100 - 70 \ge -40\lambda$, i.e. $30 \ge -40\lambda$, which is always true for $\lambda \ge 0$. That cannot produce over-completion of a *bad* project. To get over-completion, let the remaining NPV be negative, say revenue $60$ instead of $100$, so remaining NPV $= -10$. The maximiser scraps. The manager who treats completion as avoiding the realisation of $40\lambda$ completes if $-10 \ge -40\lambda$, i.e. $\lambda \ge 1/4$. For $\lambda > 1/4$ she finishes a project that should be killed; for $\lambda < 1/4$ she agrees with the maximiser. The lesson is that sunk-cost continuation is not a consequence of loss aversion *alone*: it needs a reference-dependent coding in which abandonment, but not continuation, realises the past outlay as a loss. That coding is a hypothesis, testable by varying whether the outlay is described as still “on the books”.
:::
:::

::: exercise Nested models {level=2}
A researcher estimates a demand model in which the consumer maximises $u(x) = v(x - r)$, with $r$ a reference bundle and $v$ steeper for negative arguments (loss aversion). Name the parameter restriction that recovers ordinary utility maximisation of $v(x)$. Why is that restriction worth reporting alongside the behavioural estimates?
::: solution
Set $r = 0$ (or, more generally, make $v$ linear, so that the kink does not bite) and give $v$ the same slope on both sides of $r$; equivalently, set the loss-aversion coefficient $\lambda = 1$ and let the reference drop out. Ordinary maximisation of $v(x)$ is then nested. Reporting the nested model is worth doing because it is the null of the behavioural claim, it is what a reader from [[microeconomics/consumer-choice]] expects as a benchmark, and a likelihood-ratio (or Wald) test of $\lambda = 1$ is the right way to say whether loss aversion is needed for these data. A behavioural model that does not nest the standard one cannot be compared with it on the same likelihood.
:::
:::
