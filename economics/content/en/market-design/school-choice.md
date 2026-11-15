A parent ranking schools is playing a game, whether the district says so or not. If the assignment rule is “we try to give everyone their first choice, and if a school has too many first-choice applicants we break ties by priority, and leftover seats go to second choices”, then listing a popular school first is a risk: a rejected first choice does not fall gently to a second choice, because second-choice seats have already been filled by other families’ first choices. Families with a safe nearby school learn to list that school first. Families who do not learn it lose. That rule is the **Boston mechanism**, and it was the assignment rule of Boston’s public schools until 2005. The rule that replaced it, and that New York City adopted for high schools in 2003, is student-proposing **deferred acceptance**, the algorithm of the previous chapter, with schools’ “preferences” replaced by published **priorities**.

This chapter compares those rules on strategy-proofness, stability and efficiency; describes the NRMP as a many-to-one matching market with couples; and treats both as applications of [[market-design/stable-matching]] and of the incentive-compatibility ideas of [[information-economics/mechanism-design]]. Participation numbers are historical (NRMP 2024, Boston and NYC published redesigns). Nothing here is advice about where to apply to school or to a residency.

## School choice as a matching market

::: definition School-choice problem {#def-school-choice}
A finite set $I$ of students, a finite set $S$ of schools, a capacity $q_s$ for each school, a strict preference ranking $\succ_i$ of schools for each student (with remaining unmatched allowed), and a strict **priority** ranking $\succ_s$ of students at each school (walk-zone, sibling, lottery number, test score — whatever the district publishes). An **assignment** is a matching of students to schools that respects capacities. A student–school pair $(i, s)$ **blocks** an assignment $\mu$ if $s \succ_i \mu(i)$ and $i$ has higher priority at $s$ than some student assigned there (or $s$ has an empty seat). An assignment is **stable** (or **justified-envy-free**) if it is individually rational and unblocked.
:::

Priorities are not preferences. A school does not “want” a student; the district has decided that a sibling, or a walk-zone resident, or a higher lottery number, has a better claim. Stability in this language is **elimination of justified envy**: no student can point to a seat at a school she prefers and say “that seat belongs to someone the published rule ranks below me”. Unjustified envy — preferring a school whose occupants all have higher priority — is allowed.

The designer’s instruments are the priorities (often constrained by law) and the **mechanism** that maps reported rankings into an assignment. Three mechanisms have been the applied menu.

## Three mechanisms

**Student-proposing deferred acceptance.** Students propose, schools hold the highest-priority applicants up to capacity and reject the rest, rejected students propose to their next choice. Output: the student-optimal stable matching, by [[market-design/stable-matching#thm-da]] in its many-to-one form (Gale and Shapley 1962 already treated college admissions). Strategy-proof for students, by [[market-design/stable-matching#thm-sp]]. Not Pareto efficient among students: a cycle of students could swap schools and all be better off, at the cost of a stability violation.

**Boston (immediate-acceptance) mechanism.** Round 1: every student applies to her reported first choice; each school admits the highest-priority applicants up to capacity, and those admissions are *final*. Round 2: unmatched students apply to their reported second choice, for remaining seats only; admissions are again final. And so on. A student who listed a popular school first and was rejected does not take her priority to round 2 in any useful sense: the seats at her second choice may already be gone to students who listed it first.

**Top trading cycles (TTC) for school choice** (Abdulkadiroğlu and Sönmez 2003). Each student points to her favourite school; each school points to its highest-priority student. A cycle is executed (those students are assigned those schools) and removed; repeat. TTC is strategy-proof and Pareto efficient among students. It is not stable: a high-priority student can be “traded” out of a school to complete a cycle, and then have justified envy.

::: definition Boston mechanism {#def-boston}
In each round $k = 1, 2, \dots$, every still-unassigned student applies to her $k$-th listed school. Each school, looking only at this round’s applicants and at its *remaining* seats, admits the highest-priority applicants up to remaining capacity. Admissions are final. The algorithm ends when every student is assigned or has exhausted her list.
:::

::: proposition Boston is not strategy-proof {#prop-boston-not-sp}
There exist school-choice profiles at which a student is strictly better off listing a school other than her true favourite first. In particular, a student who is sure to be rejected at her true first choice, and who has high priority at her true second choice, can lose that second-choice seat by listing the first choice first.
:::

::: proof
The example in [[#ex-boston]] is a proof by exhibition. The general reason: Boston uses the reported first choice as an *admission round*, not as a proposal that can be held. Priority at a school is only spent in the round in which the student applies there. A student who “wastes” round 1 on an unattainable school spends her priority at attainable schools in later rounds, when seats are gone. Misreporting the attainable school as first choice spends the priority when the seats are still there.
:::

::: example Manipulating Boston {#ex-boston}
Two schools, $A$ and $B$, one seat each. Three students, $i, j, k$. Priorities: at $A$, $j \succ i \succ k$; at $B$, $i \succ k \succ j$. True preferences: $i$ ranks $A \succ B$; $j$ ranks $A \succ B$; $k$ ranks $B \succ A$. Boston, with truthful lists: round 1, $i$ and $j$ apply to $A$, $k$ applies to $B$. School $A$ admits $j$ (higher priority) and rejects $i$; school $B$ admits $k$. Student $i$ is unmatched after round 1; in round 2 she applies to $B$, which is full. So $i$ is unassigned, $j$ gets $A$, $k$ gets $B$. What if $i$ lists $B$ first?
::: solution
If $i$ lists $B \succ A$, round 1: $j$ applies to $A$, $i$ applies to $B$, $k$ applies to $B$. School $A$ admits $j$. School $B$ compares $i$ and $k$, admits $i$ (higher priority). Student $k$ is rejected, applies to $A$ in round 2, $A$ is full. Outcome: $i$ gets $B$, $j$ gets $A$, $k$ unassigned. Student $i$ prefers this (she has $B$ rather than nothing). The misreport is profitable. Under student-proposing DA, truthful lists already give $i$ the seat at $B$: $i$ and $j$ propose to $A$, $A$ holds $j$ and rejects $i$, $i$ proposes to $B$, $B$ holds $i$ (and rejects $k$ if $k$ also proposed there). DA, played truthfully, matches $i$ to $B$ without requiring her to guess.
:::
:::

::: warning “List your true first choice” is not always advice
Under DA it is: strategy-proofness is the theorem that the truth is a dominant strategy. Under Boston it is not, and districts that used Boston and *told* families to list their true first choice were telling them to play a dominated strategy. The 2005 Boston redesign, and the information campaign that went with it, were in part a recognition of that contradiction (Abdulkadiroğlu, Pathak, Roth and Sönmez, 2005, *American Economic Review* Papers and Proceedings).
:::

::: example DA versus TTC {#ex-da-ttc}
Three students $i_1, i_2, i_3$, three schools $s_1, s_2, s_3$, one seat each.

| student | ranking | school | priority |
|---|---|---|---|
| $i_1$ | $s_2, s_1, s_3$ | $s_1$ | $i_1, i_3, i_2$ |
| $i_2$ | $s_1, s_2, s_3$ | $s_2$ | $i_2, i_1, i_3$ |
| $i_3$ | $s_1, s_2, s_3$ | $s_3$ | $i_3, i_1, i_2$ |

Compute student-proposing DA and TTC. Which is better for students? Which is stable?
::: solution
**DA.** Round 1: $i_1$ proposes to $s_2$; $i_2$ and $i_3$ propose to $s_1$. School $s_1$ holds $i_3$ (priority $i_1 \succ i_3 \succ i_2$ would hold $i_1$ if $i_1$ had applied; among $i_3, i_2$ it holds $i_3$) and rejects $i_2$; $s_2$ holds $i_1$. Round 2: $i_2$ proposes to $s_2$. School $s_2$ prefers $i_2$ to $i_1$, holds $i_2$, rejects $i_1$. Round 3: $i_1$ proposes to $s_1$. School $s_1$ prefers $i_1$ to $i_3$, holds $i_1$, rejects $i_3$. Round 4: $i_3$ proposes to $s_2$; $s_2$ holds $i_2$ and rejects $i_3$. Round 5: $i_3$ proposes to $s_3$ and is held. Matching: $i_1$–$s_1$, $i_2$–$s_2$, $i_3$–$s_3$.

**TTC.** Each student points at her favourite school; each school points at its highest-priority student: $i_1 \to s_2$, $i_2 \to s_1$, $i_3 \to s_1$; $s_1 \to i_1$, $s_2 \to i_2$, $s_3 \to i_3$. Cycle $i_1 \to s_2 \to i_2 \to s_1 \to i_1$. Execute: $i_1$ gets $s_2$, $i_2$ gets $s_1$. Remaining: $i_3 \to s_3 \to i_3$, so $i_3$ gets $s_3$. Matching: $i_1$–$s_2$, $i_2$–$s_1$, $i_3$–$s_3$.

TTC gives $i_1$ and $i_2$ their first choices; DA gave them their second choices. TTC is student-Pareto-superior to DA. TTC is **unstable**: $i_3$ prefers $s_1$ to $s_3$ and has higher priority at $s_1$ than $i_2$, so $(i_3, s_1)$ is justified envy. DA’s matching is stable (it is the student-optimal stable matching). The designer who wants no justified envy uses DA; the designer who wants student efficiency and strategy-proofness, and is willing to tolerate justified envy, uses TTC.
:::
:::

::: example Same priorities, Boston equals DA {#ex-aligned}
Two schools, one seat each; two students. Both rank $A \succ B$. Priorities at both schools: $i \succ j$. Run Boston and student-proposing DA, both with truthful lists.
::: solution
Boston: both apply to $A$ in round 1; $A$ admits $i$ finally and rejects $j$; $j$ applies to $B$ in round 2. DA: both propose to $A$; $A$ holds $i$, rejects $j$; $j$ proposes to $B$. Same assignment: $i$ to $A$, $j$ to $B$. When priority orders coincide across schools, Boston’s “final in round 1” and DA’s “hold and maybe later reject” do not disagree on this profile. The Boston incentive to misreport appears when priorities *differ* across schools, as in [[#ex-boston]].
:::
:::

::: example A lottery as priority {#ex-lottery}
One school, two seats; three students. The school’s priority is a random lottery order $i \succ j \succ k$, drawn once and published. Students all rank the school above being unmatched. What does DA (equivalently Boston, with one school) do? Is anyone’s report able to change the assignment?
::: solution
All three propose (or apply) to the school; it holds $i$ and $j$ and rejects $k$. The assignment is the two highest lottery numbers. With one school, listing it is a dominant strategy under either rule, and misreporting “unmatched first” only makes a student unmatched. A lottery is a priority; DA with a lottery is a serial dictatorship in this one-school case, and is strategy-proof.
:::
:::

::: quiz
A district that wants a strategy-proof mechanism with no justified envy should use
- [ ] the Boston mechanism, because it “tries to give first choices”
- [x] student-proposing deferred acceptance
- [ ] TTC, because TTC is efficient
- [ ] a lottery that ignores priorities
::: solution
Boston is not strategy-proof ([[#prop-boston-not-sp]]). TTC is strategy-proof and efficient but not stable. A lottery that ignores priorities is strategy-proof in a trivial sense and typically unstable. Student-proposing DA is strategy-proof for students and stable.
:::
:::

## New York, Boston, and other cities

New York City’s high-school assignment was, until 2003, a fragmented process: students applied to a subset of schools, schools made offers, students held one and waited, and a large residual was assigned administratively. Abdulkadiroğlu, Pathak and Roth (2005, *American Economic Review* Papers and Proceedings; 2009, *American Economic Review*) describe the redesign: a single student-proposing DA, with schools’ rankings of students (for screened schools) or lotteries (for unscreened schools) in place of hospital preferences. About 90,000 students a year were assigned in the new match. The designers’ stated aims were to end the residual administrative assignment, to make it safe to list true preferences, and to respect schools’ screens.

Boston Public Schools used the Boston mechanism until 2005. Abdulkadiroğlu, Pathak, Roth and Sönmez (2005) documented strategic listing and proposed DA or TTC. The district adopted student-proposing DA in 2005, with walk-zone and sibling priorities. Pathak and Sönmez (2008, *American Economic Review*) showed, theoretically, that Boston’s mechanism favoured families who were sophisticated about the game, relative to DA; the distributional argument, not only strategy-proofness, was part of the case for the switch.

Other cities followed, with variations. Amsterdam used a DA-like mechanism for secondary schools; Ghana’s computerised university placement has been studied as a school-choice problem (Abdulkadiroğlu, Angrist and Pathak, among others, have related work on exams). England’s school-admissions code, after 2007, restricted “first-preference first” (Boston-like) rules and pushed local authorities toward equal-preference (DA-like) rules, following Pathak and Sönmez (2013, *American Economic Review*) on the ranking of mechanisms by their incentive to manipulate. China’s *gaokao*-based college admissions have used variants of immediate acceptance and of DA in different provinces and years; Chen and Kesten (2017, *Journal of Political Economy*) analyse the Chinese parallel mechanism as an interpolation. The chapter records these as applications of the same comparison — Boston versus DA versus TTC — not as a ranking of education systems.

::: widget plot
f: 1-0.5*x; 0.8-0.3*x; 0.4
x: 0, 1
y: 0, 1
labels: \text{DA (stable, SP)}; \text{TTC (efficient, SP)}; \text{Boston (neither)}
caption: A schematic, not a measurement. Deferred acceptance sits on the stability-and-strategy-proofness corner; TTC on the efficiency-and-strategy-proofness corner; Boston on neither. There is no mechanism in the box that is stable, strategy-proof and student-Pareto-efficient (Abdulkadiroğlu and Sönmez 2003; the impossibility is the school-choice form of Roth 1982). Hover is decorative: the three lines are labels of trade-offs, not estimated frontiers.
:::

## The medical match

The US National Resident Matching Program (NRMP) assigns graduating doctors to residency positions. It is a **many-to-one** matching market: each applicant wants one seat, each programme has a quota. A 1952 clearing house, the National Intern Matching Program, replaced a chaotic market of exploding offers (Roth 1984). The algorithm was hospital-proposing deferred acceptance. In the 1990s the match came under pressure: applicants (and a lawsuit) alleged that the hospital-proposing algorithm was unfair to doctors, and **couples** — two applicants who wanted to be in the same city — were using ad hoc tricks to stay together.

Roth and Peranson redesigned the algorithm. The 1998 Match was the first to use an **applicant-proposing** deferred-acceptance algorithm that treats a couple as a single agent with preferences over *pairs* of programmes (Roth and Peranson 1999, *American Economic Review*). Existence of a stable matching is no longer guaranteed once couples are present (Roth 1984 already noted this); the Roth–Peranson procedure searches for a stable matching with respect to the reported lists, and in practice finds one. The 2024 Main Residency Match had 44,853 applicants who certified a rank-order list and 41,503 positions in 6,395 programmes; 1,218 couples participated, with a couples match rate of 93.6 percent (NRMP, *2024 Main Residency Match by the Numbers*, March 2024). Those figures describe one year’s operation of the mechanism. They are not a forecast of any applicant’s outcome, and they are not a recommendation to enter the Match.

::: application Couples as one agent
A couple $(a, b)$ submits a list of ordered pairs of programmes, $(h, h')$, meaning “$a$ at $h$ and $b$ at $h'$”. The algorithm proposes on behalf of the couple down that list. A programme that holds $a$ may later be asked to release $a$ so that the couple can move together to a later pair; the deferred-acceptance logic extends, with extra care for the consistency of the two seats. The rural-hospital theorem need not hold: a programme can fill in one stable matching (when couples are absent from its city) and not in another. The design choice is still to search for stability, including stability for couples, rather than to let couples negotiate outside the match — because outside negotiation was what unravelled the pre-1952 market.
:::

::: quiz
The 1998 NRMP redesign switched the proposing side to applicants, and accommodated couples, primarily in order to
- [ ] raise hospitals’ payoffs
- [x] make it safe for applicants (and couples) to list true preferences, and to produce a stable matching that includes couples
- [ ] maximise the number of filled rural seats
- [ ] replace matching with an auction
::: solution
Applicant-proposing DA is strategy-proof for individual applicants ([[market-design/stable-matching#thm-sp]]); the Roth–Peranson extension searches for stability with couples. Rural seats are constrained by [[market-design/stable-matching#thm-rural]] and by geography, not by which side proposes. There is no price in the Match.
:::
:::

Strategy-proofness for *couples* is not guaranteed: a couple can in principle profit from truncating or reordering pair-lists. In a market of the NRMP’s size, with short lists, the documented gains from such manipulation are small, which is the large-market consolation of Kojima, Pathak and Roth (2013, *American Economic Review*) and related papers. The Match is a designed market that satisfies the chapter’s constraints approximately, at a scale at which approximation is the relevant standard.

## Evidence

Chen and Sönmez (2006, *Journal of Economic Theory*) ran laboratory school-choice sessions: under Boston, subjects misreported in the direction [[#ex-boston]] predicts; under DA, truth-telling was much more common; TTC sat in between (the pointing rule is less transparent). Abdulkadiroğlu, Pathak, Roth and Sönmez (2006, NBER) and subsequent field papers used Boston and NYC administrative data to document pre-reform strategic lists (popular schools underlisted by families without a safe walk-zone) and post-reform changes in listing behaviour.

Pathak and Sönmez (2008) is the theoretical distributional result: Boston’s equilibrium can rank sophisticated families above sincere ones at the same true preference and priority, which DA cannot. Whether that inequity was first-order in Boston’s data is an empirical question the 2005 switch does not itself answer; the switch removed the *mechanism* that created the inequity.

NRMP: Roth (1984, 2003) and Roth and Peranson (1999) are the primary sources for the history and the algorithm. The NRMP’s own *Results and Data* reports, published annually, are the source for participation counts. This course uses the 2024 report.

## Where this leads

[[market-design/exchange-without-money]] drops the school side’s priorities and the hospital side’s preferences: houses and donor kidneys do not rank applicants. The right algorithm is then top trading cycles, the same TTC that was an alternative in school choice, now in its original Shapley–Scarf home. The incentive lesson of this chapter travels: a mechanism that asks families to game the first-choice round will be gamed; a mechanism with a dominant strategy will be used, by most people, as if it had one.

::: history
Gale and Shapley (1962) already framed college admissions as many-to-one matching. The Boston mechanism was the working rule of Boston Public Schools for decades before it had that name in the literature; Abdulkadiroğlu and Sönmez, “School choice: a mechanism design approach” (*American Economic Review*, 2003), named it, compared it with DA and TTC, and supplied the framework for the NYC (2003) and Boston (2005) redesigns. Roth and Peranson’s NRMP redesign was first used in 1998 and described in the *American Economic Review* in 1999. Pathak and Sönmez (2008, 2013) developed the comparison of mechanisms by manipulability, which influenced England’s admissions-code changes after 2007.
:::

::: summary
- School choice is a many-to-one matching problem with published **priorities** in place of school preferences. Stability is elimination of justified envy ([[#def-school-choice]]).
- **Boston** (immediate acceptance) is not strategy-proof: a wasted first-choice application can cost a second-choice seat ([[#def-boston]], [[#prop-boston-not-sp]]).
- **Student-proposing DA** is strategy-proof for students and stable, not student-Pareto-efficient. **TTC** is strategy-proof and efficient, not stable. No mechanism is all three.
- NYC high schools (2003) and Boston (2005) switched to DA. England restricted first-preference-first rules after 2007. Chinese provincial college admissions have used related interpolations.
- The NRMP is a many-to-one DA market. The 1998 Roth–Peranson redesign is applicant-proposing and treats couples as a unit. In 2024, 44,853 applicants certified a list for 41,503 positions (NRMP).
:::

## Exercises

::: exercise Boston, first round {level=1}
Two schools, one seat each; two students. Both students rank $A \succ B$. Priorities at $A$: $i \succ j$; at $B$: $j \succ i$. Under Boston with truthful lists, who gets $A$?
::: solution
Round 1: both apply to $A$. School $A$ admits $i$ (higher priority) and rejects $j$, *finally*. Student $j$ applies to $B$ in round 2 and is admitted. So $i$ gets $A$, $j$ gets $B$.
:::
:::

::: exercise The same profile under DA {level=1}
The same profile as the previous exercise, student-proposing DA, truthful lists. Who gets $A$?
::: solution
Both propose to $A$; $A$ holds $i$ and rejects $j$; $j$ proposes to $B$; $B$ holds $j$. Same assignment. (The profiles on which Boston and DA *differ* are those in which a rejected first choice would, under DA, still have been available as a hold at the second choice — or those in which someone is manipulating Boston.)
:::
:::

::: exercise A profitable Boston misreport {level=1}
In [[#ex-boston]], student $i$’s truthful Boston outcome is unassigned. Her misreport (listing $B$ first) gives her $B$. Which does she prefer, given her true ranking $A \succ B$?
::: solution
She prefers $B$ to being unassigned, so the misreport is profitable. She still prefers $A$ to $B$, but $A$ is not attainable against $j$’s priority.
:::
:::

::: exercise Justified envy under TTC {level=2}
In [[#ex-da-ttc]], identify the student who has justified envy under TTC, the school she envies, and the student who holds that seat. Check the priority.
::: solution
Student $i_3$ is at $s_3$ and prefers $s_1$. The occupant of $s_1$ is $i_2$. Priority at $s_1$ is $i_1 \succ i_3 \succ i_2$, so $i_3$ has higher priority than $i_2$. The pair $(i_3, s_1)$ is justified envy.
:::
:::

::: exercise Why DA is not student-efficient {level=2}
In [[#ex-da-ttc]], DA assigned $i_1$–$s_1$, $i_2$–$s_2$, $i_3$–$s_3$. TTC assigned $i_1$–$s_2$, $i_2$–$s_1$, $i_3$–$s_3$. Show that the TTC matching student-Pareto-dominates the DA matching, and that the dominating matching is unstable.
::: solution
Under TTC, $i_1$ has $s_2$ rather than $s_1$ (an improvement: she ranks $s_2$ first), $i_2$ has $s_1$ rather than $s_2$ (an improvement), $i_3$ has the same school. So TTC Pareto-dominates DA among students. Instability is the justified envy of the previous exercise.
:::
:::

::: exercise Couples, a tiny market {level=2}
Two programmes $h_1, h_2$, one seat each. A couple $(a, b)$ ranks the pair $(h_1, h_2)$ first ( $a$ at $h_1$, $b$ at $h_2$) and being unmatched second. A single applicant $c$ ranks $h_1 \succ h_2$. Programmes both rank $c \succ a \succ b$. Is there a stable matching that places the couple? Is there a stable matching that places $c$?
::: hint
If the couple is placed, $c$ is unmatched and blocks with $h_1$. If $c$ is at $h_1$, the couple cannot both be placed.
:::
::: solution
If $(a, b)$ occupy $(h_1, h_2)$, $c$ is unmatched. Then $(c, h_1)$ blocks: $c$ prefers $h_1$ to being unmatched, and $h_1$ prefers $c$ to $a$. If $c$ occupies $h_1$ and (say) $b$ occupies $h_2$, the couple is split, which they rank below being unmatched together; they would rather both be unmatched than split, so the matching is not individually rational for the couple. If $c$ occupies $h_1$ and $a, b$ unmatched: the couple does not block (their only acceptable pair is fully occupied). Programme $h_2$ is empty; nobody acceptable to $h_2$ who wants $h_2$ is unmatched except $b$, but $b$ will not take $h_2$ without $a$. A stable matching exists: $c$ at $h_1$, $h_2$ empty, couple unmatched. There is **no** stable matching that places the couple. This is the existence failure Roth (1984) pointed out; the Roth–Peranson algorithm, in a larger market, searches and in practice finds a stable matching when one exists, and reports the difficulty when one does not.
:::
:::

::: exercise Immediate acceptance, three schools {level=3}
Three schools, one seat each; three students. All students rank $s_1 \succ s_2 \succ s_3$. Priorities at every school: $i \succ j \succ k$. Run Boston. Run DA. Do they differ? Who has an incentive to misreport under Boston?
::: solution
Boston: round 1, all apply to $s_1$; $s_1$ admits $i$ (finally) and rejects $j, k$. Round 2, $j$ and $k$ apply to $s_2$; $s_2$ admits $j$ and rejects $k$. Round 3, $k$ gets $s_3$. DA: $i, j, k$ propose to $s_1$; $s_1$ holds $i$, rejects $j, k$; $j, k$ propose to $s_2$; $s_2$ holds $j$, rejects $k$; $k$ proposes to $s_3$. Same assignment. Student $k$ cannot do better by misreporting (she is last everywhere). Student $j$, if she listed $s_2$ first, would get $s_2$ in Boston round 1, which she already gets. Nobody has a *profitable* misreport here because the priority order is the same at every school — the profile is too aligned. The Boston incentive appears when priorities *differ* across schools, as in [[#ex-boston]].
:::
:::

::: exercise No mechanism is stable, strategy-proof and efficient {level=3}
Using [[#ex-da-ttc]] and strategy-proofness of DA and of TTC, argue that no mechanism can be simultaneously stable, strategy-proof for students, and student-Pareto-efficient.
::: hint
DA is the unique stable strategy-proof mechanism (in the student-optimal sense: any stable mechanism that is strategy-proof for students must select the student-optimal stable matching — Alcalde and Barberà 1994, *Economic Theory*). That matching is not efficient in the example.
:::
::: solution
In [[#ex-da-ttc]] the unique stable matching that can be selected by a strategy-proof stable mechanism is the DA matching (the student-optimal stable matching; any other stable matching would be worse for some student who could then manipulate toward DA, by the same logic as Roth 1982). That matching is student-Pareto-dominated by the TTC matching. Hence a stable strategy-proof mechanism is not efficient on this profile. TTC is efficient and strategy-proof on this profile, and not stable. The three properties are incompatible.
:::
:::

::: exercise NRMP proposing side {level=3}
Give two reasons, in the language of this course, why the 1998 redesign made applicants the proposing side rather than programmes. Then state one theorem that says rural programmes should not expect the switch, by itself, to fill empty seats.
::: solution
(1) Strategy-proofness: applicant-proposing DA is dominant-strategy incentive compatible for individual applicants ([[market-design/stable-matching#thm-sp]]), so the Match can tell doctors to rank programmes in true order. (2) Applicant-optimality among stable matchings ([[market-design/stable-matching#thm-da]]): among stable matchings, the applicant-proposing output is the one every (individual) applicant likes best. Rural programmes: the rural-hospital theorem ([[market-design/stable-matching#thm-rural]]) says that a programme that fails to fill a seat in one stable matching fails to fill it in every stable matching. Switching from programme-proposing to applicant-proposing moves *along* the lattice of stable matchings; it does not enlarge the set of filled rural seats. (Couples complicate the theorem, but they do not reverse the qualitative point that empty rural seats are a preference-and-geography problem, not a proposing-side problem.)
:::
:::

