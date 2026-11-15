A house is occupied by an owner who would rather have a different house, occupied by someone who would rather have a third, occupied by someone who would rather have the first. No money changes hands — perhaps because the objects are public housing, perhaps because they are living kidneys, perhaps because the owners are not allowed to sell. The market is a **housing market** in Shapley and Scarf’s sense: each agent owns one object and wants at most one object. The algorithm that clears it is **top trading cycles**. The same algorithm, adapted, organises **kidney exchange**: a patient with a willing but incompatible living donor is paired with other such pairs, and donors are swapped so that each patient receives a compatible kidney. Money is illegal; cycles and chains are not.

This chapter takes TTC from the housing market, where it is the unique core mechanism, to kidney exchange, where the objects are organs, the constraints are blood type and tissue type, and the matching is run by a transplant centre or a national programme. Figures for exchange volumes are historical. Nothing here is medical advice, and nothing here is a recommendation to join, or to design, any particular exchange.

## Housing markets

::: definition Housing market {#def-housing}
A finite set $N$ of agents, each endowed with one **house** (object) $e_i$. Each agent $i$ has a strict preference ranking $\succ_i$ over the $|N|$ houses, including her own. A **matching** (allocation) is a bijection $\mu$ of houses to agents. The matching is **individually rational** if $\mu(i) \succeq_i e_i$ for every $i$. A coalition $S \subseteq N$ **blocks** $\mu$ if the members of $S$ can reallocate *their own* houses among themselves so that every member is at least as well off and one is strictly better off. The **core** is the set of unblocked matchings.
:::

There is no second side. Houses do not have preferences. Stability in the Gale–Shapley sense is not the right constraint; the core is. Shapley and Scarf (1974, *Journal of Mathematical Economics*) showed that the core is nonempty, and that a particular algorithm finds it.

::: algorithm Top trading cycles (Shapley–Scarf) {#alg-ttc}
**Input.** Endowments $e_i$ and strict rankings $\succ_i$.
**Output.** A matching $\mu_{\mathrm{TTC}}$.

1. Each agent points to the owner of her most-preferred remaining house. (Pointing to oneself is allowed: it means she wants her own remaining house.)
2. There is at least one **cycle** (a finite set of agents each pointing at the next, including loops of length 1). Assign to each agent in a cycle the house she is pointing at, and remove those agents and houses.
3. Repeat on the remaining market until no agent remains.
:::

Finiteness plus “everyone points” implies a cycle exists: a finite directed graph in which every out-degree is one has a cycle. The algorithm terminates. The output is a matching. It is the unique core allocation.

::: theorem TTC and the core {#thm-ttc-core}
In a housing market with strict preferences, the TTC matching is the **unique** core matching. It is individually rational, Pareto efficient, and **strategy-proof**: no agent gains by misreporting her ranking, for any true reports of the others. (Roth 1982, *Economics Letters*, proved strategy-proofness; Ma 1994, *International Journal of Game Theory*, proved that TTC is the unique mechanism that is individually rational, efficient and strategy-proof.)
:::

::: proof
**Core, sketch.** Suppose a coalition $S$ blocks $\mu_{\mathrm{TTC}}$. Let $i \in S$ be an agent who was removed in the *earliest* TTC round among members of $S$. Then the house $i$ received was her favourite among houses still present at that round, hence among houses owned by $S$ (later-removed houses were still present). She cannot be made strictly better off using $S$’s houses, a contradiction.

**Uniqueness.** A core matching must give every agent in the first TTC cycle her TTC house: those houses are the first-cycle agents’ favourites in the whole market, so any other assignment of them is blocked by a subcycle. Removing the first cycle, the same argument applies to the next. Hence the core is a singleton.

**Strategy-proofness, sketch.** An agent who misreports either still points along the path TTC would have walked, or points at a house that leaves her cycle later, receiving a house she likes less (because TTC already gave her the best house she could claim by pointing at it when it was still there). She cannot jump a cycle she does not belong to: the owners in that cycle are pointing among themselves, using their true preferences, independent of her report.
:::

::: example A four-house cycle {#ex-four}
Four agents $A, B, C, D$ own houses $a, b, c, d$. Preferences (best to worst):

| agent | ranking |
|---|---|
| $A$ | $b, c, a, d$ |
| $B$ | $c, a, b, d$ |
| $C$ | $a, b, c, d$ |
| $D$ | $d, a, b, c$ |

Run TTC. Who gets which house? Is anyone left with her endowment?
::: solution
Round 1: $A$ points at $B$ (wants $b$), $B$ at $C$ (wants $c$), $C$ at $A$ (wants $a$), $D$ at $D$ (wants $d$). Cycles: $A \to B \to C \to A$, and $D \to D$. Execute both. $A$ gets $b$, $B$ gets $c$, $C$ gets $a$, $D$ keeps $d$. $D$ is a loop of length 1: she ranked her own house first, so she is already at her top. The three-cycle is a swap along a cycle of length 3, not a pairwise swap: $A$ does not get $c$, even though $c$ is her second choice, because $b$ is available in the cycle.
:::
:::

::: example A profitable-looking lie that is not {#ex-ttc-truth}
In [[#ex-four]], suppose $A$ reports $c$ as her favourite (a lie: she prefers $b$). What does TTC do? Compare with the truth-telling outcome.
::: solution
Round 1 with $A$ pointing at $C$: $A \to C \to A$ is a cycle of length 2 (since $C$ still wants $a$). $B$ points at $C$, but $C$ is in a cycle with $A$. Execute $A \leftrightarrow C$: $A$ gets $c$, $C$ gets $a$. Then $B$ points at whoever owns her favourite remaining house; $c$ is gone, so $B$ points at $A$’s old house $a$, which is now $C$’s assignment and has been removed... After $A$ and $C$ leave with $c$ and $a$, remaining are $B$ (endowment $b$) and $D$ (endowment $d$). $B$’s ranking of remaining houses: $b, d$ ($c$ and $a$ gone). $B$ points at herself, keeps $b$. $D$ keeps $d$. So $A$ gets $c$, her *second* choice, whereas truth-telling gave her $b$, her first. The lie hurt her. That is [[#thm-ttc-core]] in a four-person number.
:::
:::

::: warning TTC is not deferred acceptance
Both algorithms use the word “point” or “propose”, and both are strategy-proof for one side. They solve different problems. DA matches two sides who each have preferences (or priorities). TTC reallocates objects among owners who have preferences over objects. Running DA on a housing market would require inventing preferences for the houses; running TTC on a two-sided market would ignore the schools’ priorities. School-choice TTC ([[market-design/school-choice]]) is a hybrid: schools point at high-priority students, students point at favourite schools, and a cycle is a trade of priority claims. That hybrid is not the Shapley–Scarf theorem, and it is not stable.
:::

::: widget plot
f: 1; 0.7; 0.4
x: 0, 3
y: 0, 1.2
labels: \text{core (unique)}; \text{IR and efficient, not SP}; \text{not IR}
hlines: 1
caption: A schematic of [[#thm-ttc-core]]. In a housing market with strict preferences the core is a single point, and TTC hits it. Other individually rational and efficient allocations exist in some profiles but are not strategy-proof to implement. Hover is decorative.
:::

::: quiz
In a Shapley–Scarf housing market with strict preferences, the core
- [ ] may be empty, as in some two-sided markets with couples
- [x] contains exactly one matching, which TTC finds
- [ ] contains every individually rational matching
- [ ] is the set of stable matchings in the Gale–Shapley sense
::: solution
[[#thm-ttc-core]]: the core is a singleton, TTC’s output. It can be empty in two-sided matching *with couples*, which is a different model. Individual rationality is weaker than the core. Houses have no preferences, so Gale–Shapley stability is not defined.
:::
:::

## Kidney exchange

A patient with kidney failure who has a willing living donor may still be unable to use that donor: blood-type incompatibility (A, B, AB, O) or a positive crossmatch (tissue-type antibodies). **Kidney paired donation** (paired exchange) matches two such pairs: donor 1 gives to patient 2, donor 2 gives to patient 1. Three-way and longer **cycles** extend the idea. An **altruistic donor** (a donor with no attached patient) can start a **chain**: she gives to patient 1, whose donor gives to patient 2, and so on, ending with a patient on the deceased-donor waiting list or with a bridge donor.

Money for organs is illegal in the United States (National Organ Transplant Act 1984), in the United Kingdom, and in every country that runs a public exchange. The market is a matching market without money. Roth, Sönmez and Ünver (2004, *Quarterly Journal of Economics*; 2005, *Journal of Economic Theory*; 2007, *American Economic Review*) modelled it as a housing market in which a “house” is a donor kidney, an “owner” is a patient–donor pair, and preferences are compatibility plus, optionally, quality. Pairwise exchange is TTC restricted to cycles of length 2; allowing longer cycles recovers more of the core.

::: definition Kidney-exchange problem {#def-kidney}
A set of **patient–donor pairs** $(p_i, d_i)$, a compatibility relation (which donors can give to which patients), and optionally a set of **altruistic donors**. A **cycle** of length $k$ is a sequence of pairs in which $d_{i_1}$ is compatible with $p_{i_2}$, $d_{i_2}$ with $p_{i_3}$, $\ldots$, $d_{i_k}$ with $p_{i_1}$. A **chain** is a path starting at an altruistic donor. An exchange is a collection of disjoint cycles (and, if allowed, chains). The designer’s problem is to choose an exchange; the medical constraint is that a cycle of length $k$ requires $k$ simultaneous operations (so that nobody gives a kidney and then finds her intended recipient’s donor has withdrawn). Chains can be non-simultaneous, because the altruistic donor has no attached patient who would be left without a kidney if the chain breaks.
:::

Pairwise-only exchange leaves gains on the table. A three-way cycle can clear three pairs that have no pairwise match (a classic blood-type example: an A-patient with a B-donor, a B-patient with an A-donor, and an O-patient with an AB-donor — actually the standard illustration is two-way A–B / B–A, plus longer cycles involving O). Roth, Sönmez and Ünver (2007) showed that with only pairwise swaps, some efficient exchanges are missed, and that allowing three-way cycles captures most of the gain in simulations calibrated to US blood-type frequencies. Longer cycles add less, and are surgically heavier.

::: example Two-way and three-way {#ex-three-way}
Three pairs. Compatibility (donor of row can give to patient of column):

|  | $p_1$ | $p_2$ | $p_3$ |
|---|---|---|---|
| $d_1$ | no | yes | no |
| $d_2$ | no | no | yes |
| $d_3$ | yes | no | no |

Is there a pairwise exchange? Is there a three-way cycle?
::: solution
Pairwise: $(1,2)$ is compatible one way ($d_1 \to p_2$) but not the other ($d_2 \not\to p_1$). $(2,3)$: $d_2 \to p_3$ yes, $d_3 \not\to p_2$. $(1,3)$: $d_1 \not\to p_3$, $d_3 \to p_1$ yes. No pairwise swap. Three-way: $d_1 \to p_2 \to d_2 \to p_3 \to d_3 \to p_1 \to d_1$, a cycle of length 3. All three pairs can be cleared if three-way exchange is allowed, and none if it is not.
:::
:::

::: example An altruistic chain of length two {#ex-chain}
An altruistic donor $d_0$ is compatible with $p_1$; $d_1$ is compatible with $p_2$; $d_2$ is not compatible with anyone in the pool. There is no cycle among the two pairs. What exchange does a chain allow? What happens if $d_1$ withdraws after $d_0$ has given to $p_1$ but before $d_1$ has given to $p_2$?
::: solution
The chain $d_0 \to p_1$, then $d_1 \to p_2$, clears both pairs. Pair 2’s donor $d_2$ can give to the deceased-donor waiting list or remain a bridge. If $d_1$ withdraws after $p_1$ has received $d_0$’s kidney, pair 1 is already transplanted (and $d_1$ may still be asked, but if she withdraws, $p_2$ does not receive). Pair 2 is intact — $d_2$ has not given — and can re-enter the pool. Pair 1 is not left without a kidney. That is the non-simultaneity advantage of chains over cycles.
:::
:::

::: application New England, UNOS, and other programmes
The New England Program for Kidney Exchange, organised with Roth, Sönmez, Ünver and clinicians at fourteen transplant centres, began pairing exchanges in 2004–05. UNOS (now the Organ Procurement and Transplantation Network, OPTN) opened a national kidney paired-donation programme in the United States later; the UK’s NHS Blood and Transplant runs a national living-kidney-sharing scheme (quarterly matching runs; NHSBT annual reports document the number of transplants from paired and altruistic donation). South Korea has had a paired-exchange programme since the 1990s; Australia, Canada and the Netherlands run national or multi-centre schemes. China’s regulation of living donation and the absence of a national paired-exchange clearing house as of the mid-2010s are discussed in the transplant-policy literature; this course does not assess that policy. Numbers of transplants from exchange are published by the programmes and change every year; they are not reproduced here as if they were a forecast.
:::

Chains, once altruistic donors are admitted, change the algorithm. A long chain can clear many pairs that no cycle of feasible length could, because O-donors (who can give to anyone) are scarce in the pair pool — O-patients with non-O donors enter the pool, O-donors with O-patients often donate directly and never enter. An altruistic O-donor is particularly valuable as a chain-starter. Rees and colleagues (2009, *New England Journal of Medicine*) reported a 10-transplant “never-ending” chain; longer chains have since been run. The matching problem becomes a maximum-weight collection of cycles of bounded length plus chains, which is an integer programme, not TTC as written. TTC remains the right intuition for the *pairwise and cyclic* core; the operational programmes use optimisation with medically chosen weights (waiting time, HLA mismatch, paediatric status) subject to those cycle-length constraints.

::: proposition Pairwise exchange and efficiency {#prop-pairwise}
If only pairwise swaps are allowed, the resulting matching may be Pareto inefficient among patients even when a longer cycle would have been medically feasible. Allowing cycles of length up to $3$ restores efficiency in a class of simulations with US ABO frequencies (Roth, Sönmez and Ünver 2007); the precise gain is an empirical quantity, not a theorem, and it depends on pool size and on tissue-type sensitivity.
:::

The statement is deliberately not a theorem about all profiles: [[#ex-three-way]] is the theorem that pairwise *can* be inefficient; the “most of the gain” claim is the simulation result in the 2007 paper.

::: widget montecarlo
mode: integral
f: 1-x
a: 0
b: 1
n: 1000
caption: Monte Carlo estimate of $\int_0^1 (1-x)\,\mathrm{d}x = 1/2$. In a large random pool, the fraction of pairs that are two-way compatible is an expectation of this kind (here a stand-in linear rate, not a clinical ABO/HLA model). Increase the number of draws and watch the estimate settle. This is a numerical integral, not an estimate of any programme’s transplant rate.
:::

## Incentives in exchange

TTC is strategy-proof in the housing market. Kidney exchange is not a pure housing market: surgeons choose weights, patients and donors can withhold a pair from the pool, and a pair can in principle hide a compatible donor to wait for a better match. Sönmez and Ünver (and later work with Roth) study **individual rationality** for pairs (do not make a pair worse than their own donor, if compatible) and **incentive compatibility** with respect to revealing extra compatible donors. The operational defence is that the pool is large, the weights are published, and a pair that withholds a compatible donor delays its own patient’s transplant. It is not the housing-market theorem.

Deceased-donor waiting lists, by contrast, are typically **priority** rules (waiting time, medical urgency, HLA match, geography), closer to school-choice priorities than to TTC. Combining a deceased-donor list with a living-donor exchange — for example, giving a chain-end patient priority on the deceased list — is a hybrid that programmes have used, and it raises incentive questions (does a pair prefer to wait for a deceased kidney rather than exchange?) that are specific to each country’s allocation policy. This course stops at naming the hybrid; it does not rank national allocation policies.

## Evidence

Roth, Sönmez and Ünver’s 2004–07 papers combined theory with simulations on UNOS blood-type frequencies and on tissue-type data from the New England programme. The qualitative predictions — pairwise-only misses three-way cycles; O-patients with non-O donors accumulate in the pool; altruistic-donor chains help O-patients — have been the working hypotheses of the programmes that followed. Ashlagi, Gilchrist, Roth and Rees (2011, *American Economic Journal: Microeconomics*) and subsequent papers study chain length and the value of “bridge” donors. Laboratory tests of TTC in the housing-market frame (Chen and Sönmez 2002, *Journal of Economic Theory*) find high rates of truth-telling, consistent with strategy-proofness, with some residual misreporting when the cycle structure is hard to see.

The pre-history is clinical rather than economic: Rapaport (1986) proposed paired exchange; South Korean centres were running two-way exchanges in the 1990s; the economic contribution was to treat the pool as a market to be *designed*, with an algorithm, rather than as a sequence of pairwise deals a coordinator happens to notice.

## Where this leads

This is the last chapter of the course. The two halves — auctions and matching — share a method and do not share a price. An auction elicits values by making bidders pay; a matching mechanism elicits preferences by making it safe to tell the truth, or fails to. Revenue equivalence, virtual values, the winner’s curse and demand reduction are the auctionist’s tools. Stability, deferred acceptance, strategy-proofness and top trading cycles are the matching theorist’s. Market design, as a field, is the habit of using both, on purpose, in markets that used to be left to unravel or to a first-come queue.

::: history
Lloyd Shapley and Herbert Scarf, “On cores and indivisibility” (*Journal of Mathematical Economics*, 1974), introduced the housing market and TTC (crediting David Gale with the algorithm). Alvin Roth (1982) proved TTC is strategy-proof; Jinpeng Ma (1994) proved uniqueness in the class of individually rational, efficient, strategy-proof mechanisms. Roth, Sönmez and Ünver’s kidney-exchange papers (2004, 2005, 2007) took TTC and cycle-and-chain optimisation to living-donor kidneys; the New England programme began in 2004. The 2012 Nobel citation to Roth and Shapley names both the matching theory and the kidney-exchange application.
:::

::: summary
- A **housing market** is a one-sided assignment of owners to objects. The core is nonempty and a singleton under strict preferences; **top trading cycles** finds it and is strategy-proof ([[#def-housing]], [[#alg-ttc]], [[#thm-ttc-core]]).
- TTC is not DA. School-choice TTC is a hybrid that uses priorities; it is efficient and strategy-proof, not stable.
- **Kidney exchange** is a housing market in which houses are donor kidneys and feasibility is compatibility. Pairwise swaps miss three-way (and longer) cycles ([[#ex-three-way]]). Altruistic-donor **chains** can be non-simultaneous and are especially valuable when O-donors are scarce in the pair pool.
- Operational programmes use integer programmes with medically chosen weights and a cap on cycle length, not textbook TTC. Strategy-proofness is then approximate.
- Money for organs is illegal in the jurisdictions discussed. The design is matching without money, not an auction.
:::

## Exercises

::: exercise A two-person swap {level=1}
Two agents. $A$ ranks $b \succ a$; $B$ ranks $a \succ b$. Run TTC. Who gets which house?
::: solution
$A$ points at $B$, $B$ points at $A$. One cycle of length 2. $A$ gets $b$, $B$ gets $a$.
:::
:::

::: exercise A loop of length 1 {level=1}
Three agents. $A$ ranks $a \succ b \succ c$; $B$ ranks $c \succ b \succ a$; $C$ ranks $c \succ a \succ b$. Run TTC.
::: solution
Round 1: $A$ points at $A$ (wants $a$), $B$ at $C$ (wants $c$), $C$ at $C$ (wants $c$). Cycles: $A \to A$ and $C \to C$. $A$ keeps $a$, $C$ keeps $c$. Remaining: $B$, who keeps $b$. Matching: each keeps her endowment. Check: $B$ wants $c$, but $C$ wants her own house and will not trade. The core does not give $B$ house $c$.
:::
:::

::: exercise Individual rationality {level=1}
In [[#ex-four]], $D$ kept $d$. Why would a matching that gave $D$ house $a$ (and rearranged the others) violate individual rationality or the core?
::: solution
$D$ ranks $d$ first, so any matching with $\mu(D) \neq d$ makes $D$ worse off than her endowment, hence is not individually rational, hence not in the core. TTC’s loop $D \to D$ is that fact, computed.
:::
:::

::: exercise A three-cycle {level=2}
Three agents. $A$: $b \succ c \succ a$; $B$: $c \succ a \succ b$; $C$: $a \succ b \succ c$. Run TTC. Confirm that no pairwise swap is in the core.
::: solution
$A \to B \to C \to A$. One cycle of length 3: $A$ gets $b$, $B$ gets $c$, $C$ gets $a$. A pairwise swap, say $A$ with $B$: $A$ would get $b$ (good), $B$ would get $a$, but $B$ ranks $a$ below $c$, so $B$ is worse than TTC (and worse than the three-cycle, which she can achieve with $C$). Any pair is missing the third house they need. The core matching is the three-cycle, not a two-cycle.
:::
:::

::: exercise Strategy-proofness, a small lie {level=2}
In the previous exercise, $A$ reports $c$ as her favourite. What does TTC assign her? Compare with truth-telling.
::: solution
$A$ points at $C$, $C$ points at $A$: cycle $A \leftrightarrow C$. $A$ gets $c$, $C$ gets $a$. Then $B$ keeps $b$. Truth-telling gave $A$ house $b$, which she ranks above $c$. The lie dropped her from first to second. (Enter nothing; the comparison is ordinal.)
:::
:::

::: exercise Kidney pairwise gap {level=2}
In [[#ex-three-way]], how many patients receive a kidney if only pairwise exchange is allowed? If three-way cycles are allowed?
::: solution
Pairwise: $0$. Three-way: $3$.
:::
:::

::: exercise Why chains need not be simultaneous {level=3}
A cycle of four pairs is scheduled, and the donor of pair 3 withdraws on the morning of surgery. Why is that a problem for the other three pairs? Why is the same withdrawal *less* of a problem if pair 3 is in the middle of a chain that started with an altruistic donor who has already given?
::: hint
In a cycle, someone has already given, or is about to give, on the promise of receiving. In a chain, the altruistic donor had no attached patient.
:::
::: solution
In a cycle every donor gives *because* her attached patient will receive. If one donor withdraws after another has given, a patient has lost a kidney and her own donor may already have given — a loss the pair cannot be made whole for, except by a deceased-donor priority that the programme may or may not have promised. Hence cycles are operated simultaneously. In a chain, the altruistic donor gave with no attached patient; if a later donor withdraws, the chain stops, the last patient who was about to receive does not, and no pair that already transacted is left without a kidney (those surgeries have already been completed, each patient having received before or as her donor gave, in the non-simultaneous protocol that programmes actually use — typically, the patient receives *before* her donor gives to the next, or on the same day). The remaining pair is still intact and can re-enter the pool. That is why chains can be longer than simultaneous operating-theatre capacity.
:::
:::

::: exercise TTC uniqueness {level=3}
Two agents, $A$ ranks $b \succ a$, $B$ ranks $b \succ a$. Both want $B$’s house. What does TTC do? Why is the core still a singleton? Who blocks the matching that gives $b$ to $A$?
::: solution
Round 1: $A$ points at $B$, $B$ points at $B$. Cycle $B \to B$: $B$ keeps $b$. Then $A$ keeps $a$. Core: $B$ has her favourite house, so any matching that takes it from her is blocked by $\{B\}$ (a coalition of one, using her own endowment). The matching that gives $b$ to $A$ and $a$ to $B$ is blocked by $\{B\}$. Unique core matching: each keeps her endowment. Efficiency: $A$ would like $b$, but $B$ will not give it up; Pareto efficiency does not require $B$ to surrender her first choice. (This is also individual rationality for $B$.)
:::
:::

::: exercise School-choice TTC is not Shapley–Scarf TTC {level=3}
In two or three sentences, distinguish Shapley–Scarf TTC from the school-choice TTC of [[market-design/school-choice]]. Which theorem (core uniqueness, strategy-proofness, stability) transfers to school-choice TTC, and which does not?
::: solution
Shapley–Scarf TTC reallocates privately owned objects; pointing is at owners of favourite objects; the core is a singleton and the mechanism is IR, efficient and strategy-proof. School-choice TTC has no private ownership of seats: students point at favourite schools, schools point at high-priority students, and a cycle assigns seats by trading *priority claims*. Strategy-proofness and student-efficiency transfer (Abdulkadiroğlu and Sönmez 2003). Core-uniqueness in the housing-market sense does not apply (there is no endowment core), and stability / elimination of justified envy **fails**, as in [[market-design/school-choice#ex-da-ttc]].
:::
:::
