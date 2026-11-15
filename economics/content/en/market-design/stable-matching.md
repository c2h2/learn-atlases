A set of medical graduates has to be assigned to hospitals, a set of students to schools, a set of workers to firms. There is no price that can legally or practically clear the market. What can be asked of an assignment is that it be **stable**: no graduate and hospital who are not matched both prefer each other to their current assignment. Unstable assignments unravel. Hospitals make exploding early offers; students accept them in a panic; better matches that would have been available later never form. Gale and Shapley’s 1962 paper gave a definition of stability, a proof that a stable matching always exists, and an algorithm that finds one. That algorithm — **deferred acceptance** — is the engine of the rest of this course’s matching half.

The model in this chapter is **two-sided one-to-one matching**, the “marriage market”. Many-to-one (hospitals with several seats, schools with several places) is a corollary, used in [[market-design/school-choice]]. One-sided matching without money is [[market-design/exchange-without-money]]. Preferences here are **strict** and **complete**; indifferences and incomplete lists are a later, applied, complication.

## The market and stability

::: definition Two-sided one-to-one matching {#def-matching}
A **matching market** consists of two finite disjoint sets $M$ (men, doctors, students) and $W$ (women, hospitals, schools), together with, for each $m \in M$, a strict preference ranking $\succ_m$ over $W \cup \{m\}$, and for each $w \in W$, a strict ranking $\succ_w$ over $M \cup \{w\}$. Ranking oneself means preferring to be unmatched. A **matching** is a function $\mu$ from $M \cup W$ to itself with $\mu(\mu(x)) = x$, $\mu(m) \in W \cup \{m\}$, $\mu(w) \in M \cup \{w\}$. We write $\mu(m) = w$ to say that $m$ and $w$ are matched.
:::

The matching is **individually rational** if nobody is matched to a partner she ranks below being unmatched. Individual rationality is not enough.

::: definition Stability {#def-stability}
A matching $\mu$ is **stable** if it is individually rational and there is no **blocking pair**: a pair $(m, w)$ with $w \succ_m \mu(m)$ and $m \succ_w \mu(w)$. That is, nobody prefers to walk away, and no unmatched pair both prefer each other to their current partners.
:::

Stability is a **core** property: a blocking pair is a coalition of two that can improve upon $\mu$ with their own resources (each other). In a market that can rematch, an unstable matching will not last. Roth (1984, *Journal of Political Economy*) documented the pre-1945 US intern market as a case of unravelling driven by instability, and the 1952 National Intern Matching Program as a (hospital-proposing) deferred-acceptance procedure that restored a match date.

::: example A three-by-three market {#ex-three}
Three doctors $d_1, d_2, d_3$ and three hospitals $h_1, h_2, h_3$. Preferences (best to worst; unmatched omitted, and everyone prefers any listed partner to being unmatched):

| doctor | ranking | hospital | ranking |
|---|---|---|---|
| $d_1$ | $h_1, h_2, h_3$ | $h_1$ | $d_2, d_1, d_3$ |
| $d_2$ | $h_1, h_3, h_2$ | $h_2$ | $d_1, d_3, d_2$ |
| $d_3$ | $h_2, h_1, h_3$ | $h_3$ | $d_1, d_2, d_3$ |

The matching $\mu$ that pairs $(d_1, h_1)$, $(d_2, h_3)$, $(d_3, h_2)$ — is it stable? What about $\nu$ that pairs $(d_1, h_2)$, $(d_2, h_1)$, $(d_3, h_3)$?
::: solution
Under $\mu$: check pairs. $(d_2, h_1)$: $d_2$ ranks $h_1$ first, above $\mu(d_2) = h_3$; $h_1$ ranks $d_2$ first, above $\mu(h_1) = d_1$. So $(d_2, h_1)$ blocks $\mu$. Unstable.

Under $\nu$: $(d_1, h_2)$, $(d_2, h_1)$, $(d_3, h_3)$. Candidate blocks: $(d_1, h_1)$ — $d_1$ prefers $h_1$ to $h_2$, but $h_1$ is matched to $d_2$ and ranks $d_2$ above $d_1$, so $h_1$ will not block. $(d_1, h_3)$ — $d_1$ prefers $h_3$ to $h_2$? No, $h_2 \succ_{d_1} h_3$. $(d_2, h_3)$ — $d_2$ prefers $h_3$ to $h_1$? No. $(d_3, h_1)$ — $d_3$ prefers $h_1$ to $h_3$, but $h_1$ ranks $d_3$ last, below $d_2$. $(d_3, h_2)$ — $d_3$ prefers $h_2$ to $h_3$, and $h_2$ is matched to $d_1$; $h_2$ ranks $d_1$ first, above $d_3$, so no. $(d_2, h_2)$ — $d_2$ prefers $h_1$ to $h_2$ already has $h_1$, which she prefers. All individually rational. No blocking pair. $\nu$ is stable.
:::
:::

## Deferred acceptance

Gale and Shapley’s algorithm constructs a stable matching by letting one side propose and the other side provisionally hold, never committing until the end.

::: algorithm Gale–Shapley deferred acceptance (proposer-proposing) {#alg-da}
**Input.** Preference rankings of every $m \in M$ and $w \in W$.
**Output.** A matching $\mu_M$.

1. Each unmatched proposer $m$ proposes to the highest-ranked respondent she has not yet proposed to (or stays unmatched if she has exhausted her acceptable list).
2. Each respondent $w$ holds the most-preferred acceptable proposal she has received so far, including the one she was holding, and rejects the rest.
3. Rejected proposers become unmatched. Repeat from step 1 until no new proposal is made.
4. Each respondent is matched to the proposer she is holding (or to herself, if she holds none).
:::

The algorithm terminates: there are finitely many possible proposals, and no proposer repeats a proposal. The output is a matching. The remarkable fact is that it is stable, and that it is the stable matching every proposer likes best.

::: theorem Existence, proposer-optimality {#thm-da}
The matching $\mu_M$ produced by proposer-proposing deferred acceptance is stable. Moreover it is the **proposer-optimal** stable matching: every proposer likes $\mu_M$ at least as much as any other stable matching, and every respondent likes it *no more* than any other stable matching (it is respondent-pessimal among stable matchings). Running the algorithm with the sides reversed produces the **respondent-optimal** stable matching $\mu_W$.
:::

::: proof
**Stability.** Suppose $(m, w)$ blocks $\mu_M$. Then $w \succ_m \mu_M(m)$, so $m$ proposed to $w$ before proposing to $\mu_M(m)$ (or before stopping). So $w$ received $m$’s proposal and subsequently rejected it, in favour of someone she ranked higher — and she only ever upgrades her hold. Her final match $\mu_M(w)$ therefore satisfies $\mu_M(w) \succ_w m$, contradicting that she is willing to block with $m$. Individual rationality: nobody proposes to, or holds, an unacceptable partner.

**Proposer-optimality.** Say a respondent $w$ is **achievable** for $m$ if some stable matching pairs them. Claim: DA never has a proposer rejected by an achievable respondent. Suppose, for a first rejection of this kind, that $w$ rejects $m$ in favour of $m'$, and $w$ is achievable for $m$. Then $m' \succ_w m$. If $m'$ prefers $w$ to every other achievable partner, then any stable matching that pairs $m$ with $w$ leaves $m'$ with someone he likes less than $w$, so $(m', w)$ would block it — contradiction. If $m'$ has an achievable partner he likes more than $w$, he would have been rejected by that partner *earlier*, contradicting that this is the first such rejection. Hence DA never rejects a proposer from an achievable respondent, so $\mu_M(m)$ is $m$’s favourite achievable partner.

**Respondent-pessimality.** If some respondent strictly preferred $\mu_M$ to another stable matching $\mu$, then (because $\mu_M$ is proposer-optimal) the proposers who moved would be worse off, and a blocking-pair argument on $\mu$ follows — the standard lattice duality, spelled out as [[#thm-lattice]] below.
:::

::: example Running DA on the three-by-three market {#ex-da-run}
Run doctor-proposing DA on [[#ex-three]]. Then run hospital-proposing DA. Compare the two matchings.
::: solution
**Doctor-proposing.** Round 1: $d_1$ and $d_2$ both propose to $h_1$; $d_3$ proposes to $h_2$. Hospital $h_1$ holds $d_2$ (her favourite) and rejects $d_1$; $h_2$ holds $d_3$. Round 2: $d_1$ proposes to $h_2$. Hospital $h_2$ compares $d_1$ with $d_3$, prefers $d_1$, holds $d_1$ and rejects $d_3$. Round 3: $d_3$ proposes to $h_1$. Hospital $h_1$ holds $d_2$, prefers $d_2$ to $d_3$, rejects $d_3$. Round 4: $d_3$ proposes to $h_3$. Hospital $h_3$ holds $d_3$. Stop. Matching: $(d_1, h_2)$, $(d_2, h_1)$, $(d_3, h_3)$ — the stable $\nu$ of [[#ex-three]].

**Hospital-proposing.** Round 1: $h_1$ proposes to $d_2$; $h_2$ to $d_1$; $h_3$ to $d_1$. Doctor $d_1$ holds $h_2$ (prefers $h_2$ to $h_3$? $d_1$’s ranking is $h_1, h_2, h_3$, so she prefers $h_2$ to $h_3$, holds $h_2$, rejects $h_3$). Doctor $d_2$ holds $h_1$. Round 2: $h_3$ proposes to $d_2$. Doctor $d_2$ ranks $h_1$ first, $h_3$ second, so holds $h_1$ and rejects $h_3$. Round 3: $h_3$ proposes to $d_3$. Doctor $d_3$ holds $h_3$. Stop. Matching: $(d_1, h_2)$, $(d_2, h_1)$, $(d_3, h_3)$. In this profile the two sides’ DA outputs **coincide**: the stable matching is unique.
:::
:::

A unique stable matching is common in small textbook examples and not guaranteed. The next example has two.

::: example Two stable matchings {#ex-two-stable}
Two doctors, two hospitals. $d_1$: $h_1 \succ h_2$; $d_2$: $h_2 \succ h_1$; $h_1$: $d_2 \succ d_1$; $h_2$: $d_1 \succ d_2$. Find both stable matchings by running DA both ways.
::: solution
Doctor-proposing: both get their first choice, $(d_1, h_1)$, $(d_2, h_2)$. Hospitals get their second choices. Hospital-proposing: hospitals propose to $d_2$ and $d_1$ respectively, i.e. $h_1$ to $d_2$, $h_2$ to $d_1$; doctors hold those (each is their second choice, but it is the only proposal). Matching $(d_1, h_2)$, $(d_2, h_1)$. Both are stable: in the first, a blocking pair would need a doctor to prefer a hospital she already has as first choice; in the second, a hospital to prefer a doctor she already has as first choice. The two matchings are the two extremes of [[#thm-da]].
:::
:::

::: example An unmatched agent {#ex-unmatched}
Two doctors, one hospital. $d_1$: $h \succ d_1$; $d_2$: $h \succ d_2$; $h$: $d_1 \succ d_2$. Run doctor-proposing DA. Who is unmatched? Could a different stable matching match $d_2$?
::: solution
Both doctors propose to $h$; $h$ holds $d_1$ and rejects $d_2$. Matching: $(d_1, h)$, $d_2$ unmatched. Any matching that pairs $d_2$ with $h$ leaves $d_1$ unmatched; then $(d_1, h)$ blocks, because $h$ prefers $d_1$ to $d_2$ and $d_1$ prefers $h$ to being unmatched. So $d_2$ is unmatched in every stable matching — [[#thm-rural]] in a one-seat market.
:::
:::

::: widget plot
f: 1-x; x
x: 0, 1
y: 0, 1
labels: \text{proposer welfare (schematic)}; \text{respondent welfare (schematic)}
caption: A schematic of the trade-off in [[#thm-da]]: among stable matchings, moving toward the proposer-optimal end raises proposers’ welfare and lowers respondents’. There is no cardinal axis in the discrete model; the figure is a reminder of the conflict, not a computation. The two lines cross at a unique stable matching, when the extremes coincide.
:::

## The lattice and the rural-hospital theorem

The set of stable matchings is not an unordered pile.

::: theorem Lattice of stable matchings {#thm-lattice}
If $\mu$ and $\mu'$ are stable, the matching $\mu \vee_M \mu'$ that assigns each proposer her *more*-preferred partner (according to $\succ_m$) of $\mu(m)$ and $\mu'(m)$, and the matching $\mu \wedge_M \mu'$ that assigns each proposer her *less*-preferred, are themselves stable. The set of stable matchings is a distributive lattice under this order, with top $\mu_M$ and bottom $\mu_W$.
:::

::: proof
(Sketch.) The only way $\mu \vee_M \mu'$ could fail to be a matching is if two proposers were assigned the same respondent. If $m$ and $m'$ both claimed $w$, then $w$ was matched to one of them, say $m$, under $\mu$, and to $m'$ under $\mu'$. The proposer who claims $w$ as an *improvement* on the other matching, together with $w$, produces a blocking pair of the matching in which $w$ was with the less-preferred proposer — contradicting stability of $\mu$ and $\mu'$. Individual rationality is inherited. A blocking pair of $\mu \vee_M \mu'$ can be shown to block $\mu$ or $\mu'$. Duality gives the meet. Knuth (1976) noted the lattice structure; Conway is credited with the join-and-meet argument.
:::

A corollary used constantly in hospital matching is that the set of filled seats, and the set of matched doctors, does not vary across stable matchings.

::: theorem Rural hospital theorem {#thm-rural}
(McVitie and Wilson 1970; Gale and Sotomayor 1985; Roth 1986.) Any hospital (respondent) that fails to fill its quota in one stable matching fails to fill it in every stable matching. Any doctor (proposer) unmatched in one stable matching is unmatched in every stable matching. In the one-to-one model: the set of unmatched agents is the same at every stable matching.
:::

The name records a disappointment: rural hospitals that cannot fill their seats under one stable matching cannot fill them by switching to another stable matching. The problem is the preference profile, not the choice of a point in the lattice. Expanding the set of doctors, or changing rural hospitals’ attractiveness, is a different intervention.

::: quiz
Doctor-proposing deferred acceptance produces
- [ ] the unique stable matching, always
- [x] the doctor-optimal stable matching, which may or may not coincide with the hospital-optimal one
- [ ] an unstable matching that is efficient
- [ ] the matching that maximises the number of doctor–hospital pairs
::: solution
[[#thm-da]]. Uniqueness is a special case, as in [[#ex-da-run]], not the rule, as in [[#ex-two-stable]]. Stability is guaranteed; maximising the *number* of matches is not the criterion (and by [[#thm-rural]] that number is the same at every stable matching anyway).
:::
:::

## Incentives

Stability is a property of the *matching*. Incentive compatibility is a property of the *mechanism* that produces it from reported preferences.

::: theorem Strategy-proofness of DA for the proposing side {#thm-sp}
Proposer-proposing deferred acceptance is **strategy-proof** for proposers: no proposer has a profitable misreport of her ranking, for any true profile of the others. It is *not* strategy-proof for respondents: there exist profiles at which a respondent can profitably misreport. No stable mechanism is strategy-proof for both sides (Roth 1982).
:::

::: proof
(Sketch of proposer strategy-proofness, Dubins and Freedman 1981; Roth 1982.) A proposer who misreports either still proposes down a list that DA would have walked anyway, or skips an achievable partner and is rejected by a later one, ending with someone she likes less than $\mu_M(m)$, or names an unachievable partner who then rejects her. The lattice fact that $\mu_M(m)$ is her best achievable partner is what closes the argument: she cannot, by lying, make a better partner achievable, because achievability is a property of the true profile and of stability, not of her report.

For respondents: in [[#ex-two-stable]], hospital $h_1$ under doctor-proposing DA is matched to $d_1$, her second choice. If she reports only $d_2$ as acceptable, doctor-proposing DA produces $(d_2, h_1)$, $(d_1, h_2)$, which she prefers. The misreport is profitable. Roth’s impossibility: if a stable mechanism were strategy-proof for both sides, it would have to produce both $\mu_M$ and $\mu_W$ whenever those differ, which it cannot.
:::

The applied consequence is the one the NRMP eventually took ([[market-design/school-choice]]): if you can choose which side proposes, and you care about one side’s incentives, let *that* side propose. Doctors (applicants) proposing makes it safe for doctors to list their true ranking. Hospitals then have an incentive to manipulate, which in a large market with many-to-one matching is limited (Immorlica and Mahdian; Kojima and Pathak 2009, *American Economic Review*), but not zero.

::: warning Stability is not strategy-proofness
A matching can be stable *with respect to the reported preferences* and still be the product of a game in which someone lied. Boston-mechanism assignments in school choice ([[market-design/school-choice]]) were often stable with respect to the lists parents submitted, and those lists were not true preferences. Deferred acceptance is special because, for the proposing side, the two coincide: the unique dominant-strategy report is the truth, and the outcome is stable with respect to the truth.
:::

## Efficiency and the core

Every stable matching is **Pareto efficient** for the two sides taken together? No: stability is Pareto efficiency for *pairs*, not for the grand coalition in the ordinal sense that is most useful. In two-sided matching, stable matchings *are* weakly Pareto efficient for proposers (no other matching, stable or not, makes every proposer strictly better off — because $\mu_M$ already gives each her best achievable, and anything better for all proposers would not be a matching). They need not maximise a utilitarian sum, because there is no cardinal utility in the model as stated. If one attaches numbers, a stable matching can have lower total surplus than an unstable one; the justification for stability is that the unstable surplus will not survive blocking, not that it was never larger.

The core of the matching game, when pairs can freely rematch, *is* the set of stable matchings. That is why the chapter treats stability as the design constraint rather than as one criterion among many.

::: intuition Propose, hold, reject
Deferred acceptance is what a careful respondent does in a drawing room: she does not accept the first tolerable proposal, and she does not wait forever. She holds the best so far and waits to see whether someone better proposes. Proposers, meanwhile, walk down their lists. The algorithm is that drawing room, with the timing disciplined so that nobody proposes twice to the same person and nobody holds two partners. Stability is the property that, when the music stops, no one still sitting down wants to swap with someone still standing.
:::

## Evidence

Roth (1984) reconstructed the US intern market: exploding offers from the 1940s, a centralised 1951–52 algorithm that turned out to be hospital-proposing DA, and a stable match that stuck. Regional medical matches in the UK that were *not* equivalent to DA (the “priority” algorithms of some regions in the 1960s–90s) failed or were abandoned; those that were DA-like survived (Roth 1990, 1991, *American Economic Review* / *Science*). Laboratory experiments (Kagel and Roth 2000, *Games and Economic Behavior*; Chen and Sönmez 2006, *Journal of Economic Theory*, on school choice) find that DA’s proposing side mostly reports truthfully, and that the receiving side manipulates when the profile is small enough to make manipulation transparent.

Large-market theory (Immorlica and Mahdian 2005; Kojima and Pathak 2009) shows that the fraction of respondents who can profitably manipulate DA goes to zero when the market is large and lists are short. That is the theoretical consolation for running applicant-proposing DA in a medical match with tens of thousands of participants (NRMP 2024: 44,853 applicants certifying a rank-order list, 41,503 positions; NRMP *2024 Main Residency Match by the Numbers*).

## Where this leads

[[market-design/school-choice]] takes DA into many-to-one matching with priorities rather than hospital preferences, compares it with the Boston mechanism, and describes the NRMP’s Roth–Peranson redesign, including couples. [[market-design/exchange-without-money]] drops the second side: a housing market, or a kidney-exchange pool, in which the objects (houses, donor kidneys) do not have preferences, and **top trading cycles** replaces DA.

::: history
David Gale and Lloyd Shapley’s “College admissions and the stability of marriage” appeared in the *American Mathematical Monthly* in 1962. They defined stability, proved existence by exhibiting deferred acceptance, and noted proposer-optimality. Donald Knuth’s 1976 monograph *Mariages stables* developed the lattice. Alvin Roth’s 1982 *Mathematics of Operations Research* paper proved that no stable mechanism is strategy-proof for both sides, and his 1984 *Journal of Political Economy* paper identified the NRMP algorithm as hospital-proposing DA. The 2012 Nobel Memorial Prize was awarded to Roth and Shapley “for the theory of stable allocations and the practice of market design”. Gale had died in 2008.
:::

::: summary
- A two-sided matching is **stable** if it is individually rational and has no blocking pair ([[#def-stability]]).
- Gale–Shapley **deferred acceptance** ([[#alg-da]]) produces a stable matching, and the proposer-proposing version produces the proposer-optimal (respondent-pessimal) one ([[#thm-da]]).
- The set of stable matchings is a lattice ([[#thm-lattice]]). The set of unmatched agents is the same at every stable matching ([[#thm-rural]]).
- DA is strategy-proof for proposers, not for respondents. No stable mechanism is strategy-proof for both sides ([[#thm-sp]]).
- Unstable matching markets unravel; DA-like clearing houses have tended to survive. In large markets, respondent manipulation of DA becomes rare.
:::

## Exercises

::: exercise A blocking pair {level=1}
In [[#ex-three]], exhibit the blocking pair of $\mu = \{(d_1, h_1), (d_2, h_3), (d_3, h_2)\}$ and verify both sides’ preferences.
::: solution
$(d_2, h_1)$: $d_2$ ranks $h_1$ first, above $h_3$; $h_1$ ranks $d_2$ first, above $d_1$.
:::
:::

::: exercise One round of DA {level=1}
Two doctors, two hospitals. $d_1$: $h_1 \succ h_2$; $d_2$: $h_1 \succ h_2$; $h_1$: $d_1 \succ d_2$; $h_2$: $d_1 \succ d_2$. Run doctor-proposing DA. Who is matched to whom?
::: solution
Round 1: both doctors propose to $h_1$. Hospital $h_1$ holds $d_1$, rejects $d_2$. Round 2: $d_2$ proposes to $h_2$, who holds $d_2$. Matching: $(d_1, h_1)$, $(d_2, h_2)$.
:::
:::

::: exercise Unique or not {level=1}
In the previous exercise, run hospital-proposing DA. Is the stable matching unique?
::: solution
Hospital-proposing: $h_1$ proposes to $d_1$, $h_2$ to $d_1$. Doctor $d_1$ holds $h_1$ (her first choice), rejects $h_2$. Then $h_2$ proposes to $d_2$, who holds $h_2$. Same matching. Unique in this profile.
:::
:::

::: exercise Two stables, welfare {level=2}
In [[#ex-two-stable]], which matching is better for doctors? For hospitals? Relate the answer to [[#thm-da]].
::: solution
Doctor-proposing DA gave $(d_1, h_1)$, $(d_2, h_2)$: each doctor has her first choice. Hospital-proposing DA gave $(d_1, h_2)$, $(d_2, h_1)$: each hospital has her first choice. Doctors prefer the first matching, hospitals the second. That is proposer-optimality and respondent-pessimality.
:::
:::

::: exercise A misreport {level=2}
In [[#ex-two-stable]], under doctor-proposing DA, show that hospital $h_1$ can profitably list only $d_2$ as acceptable. What matching results?
::: solution
True-preference DA: $(d_1, h_1)$, $(d_2, h_2)$; $h_1$ gets $d_1$. If $h_1$ lists only $d_2$: round 1, $d_1$ proposes to $h_1$ and is rejected (unacceptable); $d_2$ proposes to $h_2$ and is held. Round 2: $d_1$ proposes to $h_2$; $h_2$ prefers $d_1$ to $d_2$, holds $d_1$, rejects $d_2$. Round 3: $d_2$ proposes to $h_1$ and is held. Matching $(d_1, h_2)$, $(d_2, h_1)$. Hospital $h_1$ now has $d_2$, her first choice. Profitable.
:::
:::

::: exercise Rural hospitals, one-to-one {level=2}
Three doctors, two hospitals, all hospitals acceptable to all doctors, both doctors acceptable to both hospitals, and $d_3$ ranked last by both hospitals. Argue from [[#thm-rural]] that $d_3$ is unmatched in every stable matching.
::: hint
Exhibit one stable matching in which $d_3$ is unmatched; the theorem does the rest.
:::
::: solution
Run doctor-proposing DA: $d_1$ and $d_2$ will be held by the two hospitals (whatever the exact rankings, there are only two seats and both hospitals prefer anyone to $d_3$ once the first two are available — more carefully: if some hospital preferred $d_3$ to one of the others we would have a different profile). A sure example: both hospitals rank $d_1 \succ d_2 \succ d_3$, doctors rank arbitrarily. DA matches $d_1$ and $d_2$; $d_3$ is unmatched. That matching is stable ($d_3$ and a hospital: the hospital prefers its current doctor). By [[#thm-rural]], $d_3$ is unmatched in every stable matching. Adding a third hospital would be a different market.
:::
:::

::: exercise No stable mechanism is strategy-proof for both sides {level=3}
Using [[#ex-two-stable]] and [[#thm-da]], prove that a mechanism which always selects a stable matching cannot be strategy-proof for both doctors and hospitals.
::: hint
If it were, doctors would want it to select the doctor-optimal matching and hospitals the hospital-optimal matching, whenever those differ.
:::
::: solution
In [[#ex-two-stable]] there are two stable matchings, $\mu_D$ (doctor-optimal) and $\mu_H$ (hospital-optimal). A stable mechanism must pick one of them (there are no others). If it picks $\mu_D$, then as in the misreport exercise a hospital can profitably deviate (the deviation produces $\mu_H$, which is stable for the *reported* preferences and better for her). If it picks $\mu_H$, a doctor can analogously misreport to force $\mu_D$. So whichever stable matching the mechanism names in this profile, someone on the other side has a profitable deviation. Hence no stable mechanism is strategy-proof for both sides.
:::
:::

::: exercise Many-to-one, a first look {level=3}
A hospital $h$ has two seats. Three doctors, preferences: $d_1$: $h \succ d_1$ (only $h$ acceptable); $d_2$: $h \succ d_2$; $d_3$: $h \succ d_3$. Hospital $h$ ranks $d_1 \succ d_2 \succ d_3$ and prefers to fill both seats rather than leave one empty. What does hospital-proposing DA (the hospital proposes to its top two) produce? What does doctor-proposing DA produce? Is anyone unmatched who could have been matched?
::: solution
Hospital-proposing: $h$ proposes to $d_1$ and $d_2$; both accept. Matching: $d_1, d_2$ at $h$, $d_3$ unmatched. Doctor-proposing: all three propose to $h$; $h$ holds $d_1$ and $d_2$, rejects $d_3$. Same matching. By the rural-hospital theorem (many-to-one version), $d_3$ is unmatched in every stable matching, and $h$ fills both seats in every stable matching. No one who could have been matched in a stable matching is left unmatched; filling $d_3$ would require dropping a better doctor, and $h$ would not agree.
:::
:::

::: exercise Blocking and efficiency {level=3}
Give a three-by-three preference profile and a matching that is Pareto efficient (no other matching makes everyone at least as well off and someone strictly better off, among doctors *and* hospitals) but unstable. Explain the block.
::: hint
A blocking pair improves the pair and typically hurts their previous partners, so the matching the block moves *to* need not Pareto-dominate the matching it moves *from*. An unstable matching can therefore still be Pareto efficient for the grand coalition. Build a two-by-two profile in which the two perfect matchings each make two agents better off and two worse off, and one of them has a blocking pair.
:::
::: solution
Two doctors $d_1, d_2$, two hospitals $h_1, h_2$. Preferences: $d_1$: $h_2 \succ h_1$; $d_2$: $h_2 \succ h_1$; $h_1$: $d_1 \succ d_2$; $h_2$: $d_1 \succ d_2$. Matching $\mu$: $(d_1, h_1)$, $(d_2, h_2)$. This is unstable: $(d_1, h_2)$ blocks ($d_1$ prefers $h_2$, $h_2$ prefers $d_1$ to $d_2$). Is $\mu$ Pareto efficient? The only other perfect matching is $(d_1, h_2)$, $(d_2, h_1)$. Relative to $\mu$, $d_1$ and $h_2$ are better off, $d_2$ and $h_1$ are worse off ($d_2$ goes from $h_2$ to $h_1$, her second choice; $h_1$ goes from $d_1$ to $d_2$). So neither matching Pareto-dominates the other. $\mu$ is Pareto efficient and unstable. Stability is a pairwise-core requirement, not ordinal Pareto efficiency for the grand coalition.
:::
:::
