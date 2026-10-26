Concept generation ([[design-process/concept-generation]]) deliberately produces more ideas than can be developed. Concept selection narrows them to one — or, more often, to two or three that are carried forward until tests or analysis can separate them. The decision is made with incomplete information: the concepts are sketches, their performance is estimated, and the requirements themselves ([[design-process/requirements]]) may still move. The aim of the methods in this chapter is not to compute the "right" answer from numbers that are partly guesses, but to make the comparison explicit, consistent and open to challenge, to show which judgements the decision depends on, and to direct effort to the information that would change it.

The chapter moves from coarse to fine. Pugh's screening matrix compares many concepts against a reference with plus, minus and same; weighted scoring matrices refine the comparison of a short list; sensitivity analysis asks how much the weights would have to change to alter the ranking; Pareto dominance identifies which concepts are worth considering at all whatever the weights; expected-value reasoning brings in risk and the value of a test; and simple physical models discriminate between concepts on the attributes that matter most. A final section explains why scoring methods, used carelessly, can mislead.

## Screening: the Pugh matrix {#sec-pugh}

::: definition Concept screening matrix {#def-pugh}
A **screening matrix** (Pugh matrix) lists the selection criteria as rows and the concepts as columns. One concept — often an existing product or the team's current favourite — is chosen as the **datum**. Every other concept is compared with the datum on each criterion and marked **+** (better), **−** (worse) or **S** (about the same). The numbers of pluses and minuses, and their difference (the **net score**), summarise each concept, but the matrix is read row by row as well as column by column.
:::

::: algorithm Pugh's method of controlled convergence {#alg-pugh}
1. Agree the criteria from the specification; keep them few (5–10), independent and relevant to discriminating between the concepts.
2. Choose a datum; draw all concepts to a similar level of detail.
3. Rate each concept against the datum with +, S, −; discuss disagreements rather than averaging them.
4. Sum pluses, minuses and net score. Eliminate concepts that are clearly worse; for promising concepts, look at their minuses and ask whether a feature of another concept could remove them, creating **hybrid** concepts.
5. Change the datum to the strongest concept and repeat, until one or a few concepts remain that cannot be improved further by combination.
:::

Stuart Pugh called this *controlled convergence*: the number of concepts alternately shrinks (elimination) and grows (hybrids) while their quality rises. The method is deliberately coarse. Its strength is that it forces the team to compare each concept with a concrete reference on each criterion and to talk about why; its weakness is that every criterion counts equally and the magnitude of a difference is lost.

::: example Screening can-crusher concepts {#ex-pugh}
The datum is the team's current product, a simple wall-mounted lever crusher. Four concepts from the morphological chart of [[design-process/concept-generation#ex-morph]] are compared: C1 foot pedal with toggle linkage and gravity magazine; C2 electric motor driving a power screw and platen; C3 electric motor with a pair of rollers and a magazine; C4 hand lever with a toggle linkage (otherwise as the datum). The team's ratings are:

| criterion | C1 | C2 | C3 | C4 |
|---|---|---|---|---|
| ease of loading | + | S | + | S |
| user effort | + | + | + | + |
| pinch safety | S | + | − | S |
| throughput (cans per minute) | + | S | + | S |
| manufacturing cost | − | − | − | S |
| worktop footprint | − | − | S | S |
| ease of cleaning | S | − | − | S |

Compute the scores and suggest the next step.
::: solution
C1: 3 pluses, 2 minuses, net $+1$. C2: 2 pluses, 3 minuses, net $-1$. C3: 3 pluses, 3 minuses, net $0$. C4: 1 plus, 0 minuses, net $+1$.
C2 is worse than the datum on more criteria than it is better and offers nothing that C1 or C3 does not; it can be dropped. C4 is a safe, small improvement. C1 and C3 offer real gains (loading and throughput) at a cost. Reading the rows: C1's minuses (cost, footprint) come from the separate pedal and frame; C3's from the motor and rollers. A hybrid "C5" — the toggle linkage of C4 with the gravity magazine of C1, still hand-operated — may keep most of C1's gains without the frame. The next round uses C1 as the datum and compares C3, C4 and C5 with it.
Sanity check: the net scores are close ($-1$ to $+1$), as is typical when the datum is a reasonable product. A concept with a net score of $+5$ in a first round usually means the datum was poorly chosen or the criteria favour one concept.
:::
:::

## Weighted scoring {#sec-scoring}

Once the list is short, the comparison is refined by giving the criteria **weights** and rating each concept on a finer scale.

::: definition Weighted-sum score {#def-weighted}
With criteria $i = 1,\dots,m$ of weights $w_i \ge 0$, $\sum_i w_i = 1$, and ratings $r_{ij}$ of concept $j$ on criterion $i$ on a common scale (e.g. 1 to 5, or 0 to 1), the **weighted score** of concept $j$ is
$$
S_j = \sum_{i=1}^{m} w_i\,r_{ij}.
$$ {#eq-weighted}
:::

Ratings may come from judgement against a reference ("3 = same as datum, 5 = much better") or, better, from estimated metric values $x_{ij}$ through a **value function** that maps the metric onto the rating scale. The simplest is linear between the marginal and ideal values of the specification:
$$
v_i(x) = \frac{x - x_{i,\text{marg}}}{x_{i,\text{ideal}} - x_{i,\text{marg}}},\qquad \text{clipped to } [0, 1],
$$ {#eq-value}
so that a concept that just meets the marginal value scores 0 and one that reaches the ideal value scores 1. The same formula works for "smaller is better" metrics, since then $x_{i,\text{ideal}} < x_{i,\text{marg}}$.

::: proposition What the weighted sum is sensitive to {#prop-scale}
(a) Replacing *all* ratings by $a\,r_{ij} + b$ with the same $a > 0$ and $b$ for every criterion does not change the ranking of concepts by [[#eq-weighted]].
(b) Rescaling the ratings of *one* criterion, $r_{kj} \to a_k r_{kj} + b_k$ with $a_k \ne 1$, is equivalent to changing its weight from $w_k$ to $a_k w_k$ (and adding a constant to every score), and can change the ranking.
:::

::: proof
(a) $S'_j = \sum_i w_i(a r_{ij} + b) = a S_j + b\sum_i w_i = aS_j + b$; an increasing affine map preserves order. (b) $S'_j = S_j + w_k(a_k - 1)r_{kj} + w_kb_k = \sum_{i\ne k} w_ir_{ij} + (a_kw_k)r_{kj} + w_kb_k$. The constant $w_kb_k$ is the same for all concepts; the factor $a_kw_k$ acts as a new weight on criterion $k$. Because different weights can give different rankings (see [[#prop-breakeven]]), so can rescaling one criterion.
:::

The practical consequence is that a weight has no meaning on its own: it is the importance of moving from the bottom to the top of *that criterion's scale*. If cost is rated on a range from £20 to £25 and safety on a range from "dangerous" to "intrinsically safe", equal weights do not mean the two matter equally. Weights should be set with the ranges in view — "how much would we value moving cost from £25 to £20 compared with moving mass from 12 kg to 8 kg?" — a practice called **swing weighting** in decision analysis.

::: example A weighted scoring matrix {#ex-weighted}
After screening, three can-crusher concepts remain: C1 (foot pedal and toggle), C3 (motor and rollers) and C4 (hand lever and toggle). With weights safety $0.30$, user effort $0.25$, cost $0.25$, size $0.20$ and ratings on a 1–5 scale

| criterion (weight) | C1 | C3 | C4 |
|---|---|---|---|
| safety (0.30) | 4 | 3 | 4 |
| user effort (0.25) | 4 | 5 | 2 |
| cost (0.25) | 3 | 2 | 5 |
| size (0.20) | 3 | 2 | 4 |

compute the weighted scores.
::: solution
By [[#eq-weighted]]:
$S_{C1} = 0.30\cdot4 + 0.25\cdot4 + 0.25\cdot3 + 0.20\cdot3 = 1.20 + 1.00 + 0.75 + 0.60 = 3.55$.
$S_{C3} = 0.90 + 1.25 + 0.50 + 0.40 = 3.05$.
$S_{C4} = 1.20 + 0.50 + 1.25 + 0.80 = 3.75$.
C4 ranks first, C1 second, C3 third. The margin between C4 and C1 is $0.20$ on a scale whose steps are $1$ — less than the uncertainty in a single rating multiplied by its weight ($0.25\times1 = 0.25$), so the ranking of the top two is fragile and needs the sensitivity check of the next section. Sanity check: all scores lie between the lowest and highest ratings, as weighted averages must.
:::
:::

## Sensitivity to the weights {#sec-sensitivity}

Weights are the least certain inputs of a scoring matrix: different people, or the same people on different days, assign different weights. The decision is robust only if the ranking survives plausible changes.

::: proposition Break-even weight {#prop-breakeven}
Vary the weight $u$ of one criterion $k$ from 0 to 1, scaling the other weights in proportion so that they sum to $1 - u$. Then each score is linear in $u$,
$$
S_j(u) = u\,r_{kj} + (1 - u)\,\bar R_j,\qquad \bar R_j = \frac{\sum_{i\ne k} w_i r_{ij}}{\sum_{i\ne k} w_i},
$$
and concepts $A$ and $B$ have equal scores at the **break-even weight**
$$
u^{*} = \frac{\bar R_A - \bar R_B}{(\bar R_A - \bar R_B) - (r_{kA} - r_{kB})},
$$ {#eq-breakeven}
provided $0 \le u^* \le 1$; otherwise one concept is better for every value of $u$.
:::

::: proof
With the other weights scaled to $w_i(1 - u)/\sum_{i\ne k}w_i$, the score is $u\,r_{kj} + (1 - u)\bar R_j$, which is linear in $u$. Setting $S_A(u) = S_B(u)$: $u(r_{kA} - r_{kB}) + (1 - u)(\bar R_A - \bar R_B) = 0$, i.e. $u[(r_{kA} - r_{kB}) - (\bar R_A - \bar R_B)] = -(\bar R_A - \bar R_B)$, which rearranges to [[#eq-breakeven]]. Two straight lines cross at most once, so outside the crossing one concept is ahead throughout; if $u^*$ lies outside $[0,1]$ they do not cross on the admissible range.
:::

::: example How much must user effort matter? {#ex-sensitivity}
In [[#ex-weighted]], vary the weight $u$ of user effort. Find the weights at which C1 and C3 overtake C4.
::: solution
The other weights $(0.30, 0.25, 0.20)$ sum to $0.75$. Averages over safety, cost and size:
$\bar R_{C1} = (0.30\cdot4 + 0.25\cdot3 + 0.20\cdot3)/0.75 = 2.55/0.75 = 3.400$;
$\bar R_{C3} = (0.90 + 0.50 + 0.40)/0.75 = 2.400$;
$\bar R_{C4} = (1.20 + 1.25 + 0.80)/0.75 = 4.333$.
C1 against C4: $u^* = (3.400 - 4.333)/[(3.400 - 4.333) - (4 - 2)] = (-0.933)/(-2.933) = 0.318$.
C3 against C4: $u^* = (2.400 - 4.333)/[(2.400 - 4.333) - (5 - 2)] = (-1.933)/(-4.933) = 0.392$.
So C4 stays first while the weight of user effort is below $0.318$; between $0.318$ and $0.5$ C1 leads (C1 and C3 tie at $u = 0.5$), and above $0.5$ C3 leads. The current weight is $0.25$, only $0.07$ below the first switch. Before committing, the team should check with users how much effort matters — for example by letting a few of them crush a bag of cans with mock-ups of C1 and C4. Check at $u = 0.25$: $S_{C4} = 0.25\cdot2 + 0.75\cdot4.333 = 3.75$ ✓ (as in [[#ex-weighted]]).
:::
:::

::: widget plot
f: 4*x + 3.4*(1 - x); 5*x + 2.4*(1 - x); 2*x + (13/3)*(1 - x)
x: 0, 1
y: 1.5, 5
labels: S_{C1}; S_{C3}; S_{C4}
vlines: 0.25
points: 0.3182, 3.5909; 0.3919, 3.4189; 0.5, 3.7
caption: Weighted scores of the three can-crusher concepts as the weight $u$ of user effort (horizontal) varies from 0 to 1, the other weights scaled in proportion. The vertical line is the weight actually used ($0.25$). The marked points are the break-even weights: C1 overtakes C4 at $0.318$, C3 overtakes C4 at $0.392$, and C3 overtakes C1 at $0.5$. Read off how far the weight can move before the decision changes — here not far — and notice that every line is straight, so a sensitivity study needs only the crossings.
:::

## Dominance and the Pareto front {#sec-pareto}

Some comparisons need no weights at all. If concept A is at least as good as concept B on every criterion and strictly better on one, nobody who prefers more of every good thing should choose B.

::: definition Dominance and Pareto optimality {#def-pareto}
With criteria to be minimised $f_1,\dots,f_m$ (maximised criteria change sign), concept $A$ **dominates** concept $B$ if $f_i(A) \le f_i(B)$ for all $i$ and $f_i(A) < f_i(B)$ for at least one $i$. A concept that is dominated by no other concept is **Pareto-optimal** (non-dominated); the set of their criterion vectors is the **Pareto front**.
:::

::: proposition Weighted sums select Pareto-optimal concepts {#prop-pareto}
If all weights are strictly positive, every concept that minimises $\sum_i w_i f_i$ over the candidate set is Pareto-optimal.
:::

::: proof
Suppose $A$ minimises the weighted sum but is dominated by some $B$: $f_i(B) \le f_i(A)$ for all $i$ with strict inequality for at least one $i = k$. Multiplying by $w_i > 0$ and adding gives $\sum_i w_if_i(B) < \sum_i w_if_i(A)$, because the $k$-th term is strictly smaller and no term is larger. This contradicts the minimality of $A$.
:::

The converse is false: a Pareto-optimal concept that lies in a "dent" of the front (where the front is not convex) minimises no weighted sum, however the weights are chosen. Weighted scoring can therefore never recommend such a concept, even though some decision-makers might prefer it. Plotting the candidates in the plane of the two most important criteria is the simplest way to see this.

::: example Mass against cost for a bracket {#ex-pareto}
Six concepts for a vehicle bracket have estimated mass and unit cost
A $(1.2\,\mathrm{kg}, £18)$, B $(0.8\,\mathrm{kg}, £30)$, C $(1.5\,\mathrm{kg}, £15)$, D $(1.3\,\mathrm{kg}, £25)$, E $(0.9\,\mathrm{kg}, £26)$, F $(2.0\,\mathrm{kg}, £14)$.
(a) Which concepts are dominated? (b) If each kilogram saved is worth $\lambda$ pounds to the customer (in fuel over the vehicle's life), the total is $\text{cost} + \lambda\,m$. Which concept is best for $\lambda = £20/\mathrm{kg}$ and for $\lambda = £50/\mathrm{kg}$, and over what range of $\lambda$ is each concept best?
::: solution
(a) D is dominated by A (lighter, $1.2 < 1.3\,\mathrm{kg}$, and cheaper, £18 < £25). No other concept is dominated: going from F to C to A to E to B, mass falls and cost rises. The Pareto front is {F, C, A, E, B}.
(b) For $\lambda = 20$: totals A $18 + 24 = 42$, B $46$, C $45$, D $51$, E $44$, F $54$; A is best. For $\lambda = 50$: A $78$, B $70$, C $90$, D $90$, E $71$, F $114$; B is best.
Adjacent front concepts swap at $\lambda = \Delta\text{cost}/\Delta m$: F→C at $1/0.5 = 2$, C→A at $3/0.3 = 10$, A→E at $8/0.3 = 26.7$, E→B at $4/0.1 = 40\,£/\mathrm{kg}$. So F is best below £2/kg, C from 2 to 10, A from 10 to 26.7, E from 26.7 to 40 and B above £40/kg. D is never best for any $\lambda$, as [[#prop-pareto]] requires. Sanity check: the swap values increase along the front, which means the front is convex and every non-dominated concept is selected for some $\lambda$; on a non-convex front some concept would be skipped.
:::
:::

::: widget plot
f: K - lam*x
x: 0.5, 2.2
y: 0, 40
sliders: lam=20:0:60:1; K=42:10:120:1
labels: \text{cost} = K - \lambda m
points: 1.2,18; 0.8,30; 1.5,15; 1.3,25; 0.9,26; 2.0,14
caption: The six bracket concepts of [[#ex-pareto]] in the mass (kg, horizontal)–cost (£, vertical) plane, with a line of constant total $\text{cost} + \lambda m = K$. Set $\lambda$ and lower $K$ until the line just touches a point: that concept minimises the total. With $\lambda = 20$ and $K = 42$ the line touches A at $(1.2, 18)$. Increase $\lambda$ and the line steepens, rolling the optimum along the front to E and then B. The point D at $(1.3, 25)$ is never the first point touched — it is dominated by A.
:::

## Risk and the value of information {#sec-uncertainty}

Ratings and metric estimates for immature concepts are uncertain, and concepts differ in how uncertain they are: a proven mechanism is predictable, a new working principle may fail outright. Scoring a risky concept by its most likely performance hides this. Decision analysis offers two simple tools.

::: definition Expected value and value of information {#def-evpi}
If a decision leads to outcomes $k$ with probabilities $p_k$ and values $V_k$ (profit, cost, a score), its **expected value** is $\mathrm{EV} = \sum_k p_kV_k$. The **expected value of perfect information** (EVPI) about an uncertain quantity is the expected value of deciding *after* learning the quantity, minus the best expected value of deciding *before*; it is never negative and is an upper limit on what a test or prototype that reveals the quantity is worth.
:::

::: example Prototype before committing? {#ex-evpi}
A team must choose between concept X, a proven design with an expected programme value of £2.0 M, and concept Y, which uses a new sealing principle. If the seal works (probability $0.6$) Y is worth £3.5 M; if it fails late in development the team must fall back to X with delay, and the programme is worth only £0.5 M. A prototype that would reveal whether the seal works costs £0.2 M and fits in the schedule. What should the team do?
::: solution
Without a test: $\mathrm{EV}(X) = 2.0$; $\mathrm{EV}(Y) = 0.6\times3.5 + 0.4\times0.5 = 2.1 + 0.2 = 2.3\,$M. Y has the higher expected value, but there is a $40\,\%$ chance of ending with £0.5 M instead of a certain £2.0 M.
With perfect information first: if the seal works choose Y (3.5); if not, choose X before committing (2.0). $\mathrm{EV} = 0.6\times3.5 + 0.4\times2.0 = 2.9\,$M. EVPI $= 2.9 - 2.3 = 0.6\,$M.
The prototype costs £0.2 M, less than the £0.6 M it can be worth; net expected value of testing first $2.9 - 0.2 = 2.7\,$M $> 2.3$. Build the prototype, then decide. This is the quantitative form of the general advice to test the riskiest feature of a concept first. Sanity check: EVPI ($0.6$) equals the probability of failure ($0.4$) times the loss it avoids ($2.0 - 0.5 = 1.5$), as it should when the information only changes the decision in the failure case.
:::
:::

::: warning Precision is not accuracy
A scoring matrix that reports $S = 3.547$ against $3.512$ looks decisive and is not. Ratings on a 1–5 scale are judgements uncertain by at least $\pm 1$; weights are uncertain by several hundredths. Before trusting a ranking, (i) check whether the winner is dominated or close to being dominated, (ii) vary each important weight to its break-even value ([[#prop-breakeven]]), (iii) vary the most uncertain ratings by one step, and (iv) ask what *information* would change the decision. If the ranking is fragile, the right output of the selection meeting is not a winner but a test plan.
:::

## Early modelling to discriminate between concepts {#sec-modelling}

The most uncertain ratings are often the ones that a simple physical model could settle: will the concept be light enough, stiff enough, fast enough? A few lines of mechanics at the concept stage are worth more than a refined scoring matrix. The aim is a model that captures the scaling — how the attribute depends on the concept's free choices — not a detailed design.

::: proposition Mass of a stiffness-limited beam {#prop-index}
A cantilever of given length $L$ must carry a tip load $F$ with tip deflection at most $\delta$. (a) If its cross-section is a solid square whose side $b$ is free, the minimum mass is proportional to $\rho/E^{1/2}$. (b) If it is a thin-walled tube of fixed mean diameter whose wall thickness $t$ is free, the minimum mass is proportional to $\rho/E$. Here $\rho$ is the density and $E$ the Young's modulus of the material.
:::

::: proof
The tip deflection of a cantilever is $\delta = FL^3/(3EI)$ ([[mechanics-of-materials]]), so the stiffness requirement is $I \ge FL^3/(3E\delta)$. (a) For a solid square, $I = b^4/12$ and the mass is $m = \rho L b^2 = \rho L\sqrt{12 I}$. At the minimum $I$, $m = \rho L\sqrt{12FL^3/(3E\delta)} = 2L^{5/2}\sqrt{F/\delta}\,\rho/E^{1/2}$. (b) For a thin tube of mean radius $r$, $I \approx \pi r^3t$ and $m \approx 2\pi r t L\rho = 2LI\rho/r^2$; at the minimum $I$, $m = 2FL^4\rho/(3E\delta r^2)$, proportional to $\rho/E$. The proportionality constants depend only on the loading and geometry, which are the same for all materials. The assumptions are linear elasticity, slender-beam theory, a stiffness rather than strength limit, and (for the tube) a wall thin enough not to buckle locally.
:::

::: example Steel or aluminium? It depends on the concept {#ex-index}
For a stiffness-limited arm, compare steel ($E = 210\,\mathrm{GPa}$, $\rho = 7850\,\mathrm{kg/m^3}$) and aluminium alloy ($E = 70\,\mathrm{GPa}$, $\rho = 2700\,\mathrm{kg/m^3}$; typical handbook values) for the two concepts of [[#prop-index]].
::: solution
(a) Solid square of free size: $m_{\text{Al}}/m_{\text{steel}} = (2700/\sqrt{70})/(7850/\sqrt{210}) = 322.7/541.7 = 0.596$. Aluminium saves about $40\,\%$ of the mass.
(b) Tube of fixed diameter: $m_{\text{Al}}/m_{\text{steel}} = (2700/70)/(7850/210) = 38.57/37.38 = 1.03$. The two materials give practically the same mass.
The concept decides the comparison. When the section can grow, a light, less stiff material wins because bending stiffness rises faster with size ($I \propto b^4$) than mass ($\propto b^2$); when the outer shape is fixed by packaging, only the wall thickness can change, $I$ and $m$ both grow linearly with $t$, and the specific modulus $E/\rho$ — almost the same for steel and aluminium — is all that matters. Ashby's material indices generalise this reasoning ([[materials-science]]). Sanity check: the ratios are dimensionless, and in (b) the result reflects the well-known near-equality of $E/\rho$ for most structural metals ($\approx 26\,\mathrm{MJ/kg}$ for both).
:::
:::

## Pitfalls of aggregation {#sec-pitfalls}

Scoring methods combine many judgements into one number, and some ways of combining are unsound. Three problems are worth knowing.

**Voting cycles.** If a team ranks concepts by majority vote between pairs, the group's preferences can be cyclic even though every member's are consistent. Three engineers rank three concepts as $A \succ B \succ C$, $B \succ C \succ A$ and $C \succ A \succ B$. A majority (the first and third) prefers A to B, a majority (first and second) prefers B to C, and a majority (second and third) prefers C to A. The outcome depends on the order in which pairs are put to the vote. Kenneth Arrow's impossibility theorem (1951) shows that no method of aggregating individual rankings of three or more alternatives satisfies a small set of reasonable conditions in all cases. George Hazelrigg argued in 1996 that this undermines multi-criteria scoring methods in engineering design; others have replied that aggregating criteria for a single decision-maker is not the same as aggregating voters. The practical lesson is uncontroversial: do not decide by repeated pairwise votes, and keep the decision's basis (weights, ratings and their sources) explicit.

**Double counting.** Criteria that measure the same thing — "low mass" and "easy to carry", or "few parts" and "low assembly cost" — give that attribute two weights. Check the criteria for overlap before weighting them.

**Scores without anchors.** A rating of "4" means nothing unless the scale is anchored ("3 = same as datum", or a metric value through [[#eq-value]]). Unanchored ratings drift towards the middle and toward whatever the rater already prefers.

::: quiz
Concept P beats concept Q on cost and on safety, and ties on every other criterion. A colleague proposes adjusting the weights to see whether Q could still win. What is the right response?
- [ ] Do the sensitivity study; with suitable weights Q might win.
- [x] It is unnecessary: P dominates Q, so Q cannot win for any positive weights.
- [ ] Switch to a Pugh matrix, which handles ties better.
- [ ] Give the tied criteria zero weight and recompute.
::: solution
P is at least as good as Q on every criterion and strictly better on two, so it dominates Q. By the argument of [[#prop-pareto]], P scores higher than Q for any strictly positive weights (and at least as high for non-negative weights). Q can be removed from the comparison — unless some criterion has been left out, which is worth asking about.
:::
:::

::: history
Stuart Pugh, an engineer who became professor of engineering design at the University of Strathclyde, presented his concept-selection method in the paper "Concept selection: a method that works" (1981) and in his book *Total Design* (1991). Kenneth Arrow's *Social Choice and Individual Values* (1951) proved the impossibility theorem; George Hazelrigg's 1996 paper in the ASME *Journal of Mechanical Design* on its implications for engineering design, and his 1998 "framework for decision-based engineering design", started a long debate about the foundations of scoring methods in design. The idea of the Pareto optimum comes from the economist Vilfredo Pareto's work around 1900, and the analysis of material choice by performance indices was systematised by Michael Ashby in *Materials Selection in Mechanical Design* (first edition 1992).
:::

::: summary
- Screen many concepts with a Pugh matrix (+, S, − against a datum); eliminate, hybridise to remove weaknesses, change the datum, repeat.
- Score a short list with $S_j = \sum_i w_i r_{ij}$; anchor the ratings, preferably through value functions from marginal to ideal metric values.
- A weight is the importance of the full range of its criterion's scale: rescaling one criterion is the same as changing its weight.
- Scores are linear in any one weight; the break-even weight $u^*$ tells how far a weight can move before the ranking changes.
- Dominated concepts can be dropped without any weights; a positive-weight weighted sum always selects a Pareto-optimal concept, but not every Pareto-optimal concept can be selected that way.
- For risky concepts use expected values and the value of information; a test whose cost is below the EVPI is usually worth doing first.
- Simple physical models (such as $m \propto \rho/E^{1/2}$ or $\rho/E$ for stiffness-limited beams) often discriminate better than refined scores, and the result depends on the concept's free variables.
- Avoid pairwise voting, double counting and unanchored scales; report a ranking together with its sensitivity.
:::

## Exercises

::: exercise Pugh net score {#exr-pugh level=1 check="2"}
Against the datum, a concept is rated $+, +, -, S, -, +, S, +$ on eight criteria. What is its net score? (Enter the number.)
::: solution
Four pluses, two minuses: net $4 - 2 = +2$.
:::
:::

::: exercise A weighted score {#exr-weighted level=1 check="3.45"}
A concept is rated 3, 5 and 2 on three criteria with weights $0.40$, $0.35$ and $0.25$. What is its weighted score? (Enter $S$.)
::: solution
$0.40\times3 + 0.35\times5 + 0.25\times2 = 1.20 + 1.75 + 0.50 = 3.45$.
:::
:::

::: exercise Counting the Pareto front {#exr-pareto level=1 check="4"}
Six concepts have (mass in kg, cost in £): P $(3, 40)$, Q $(2.5, 55)$, R $(4, 35)$, S $(3.5, 45)$, T $(2, 70)$, U $(3, 50)$; both are to be minimised. How many concepts are non-dominated? (Enter the number.)
::: solution
S is dominated by P ($3 < 3.5$, $40 < 45$); U is dominated by P (equal mass, $40 < 50$). P, Q, R and T are not dominated: ordered by mass T $(2, 70)$, Q $(2.5, 55)$, P $(3, 40)$, R $(4, 35)$, cost falls as mass rises. Four concepts.
:::
:::

::: exercise A break-even weight {#exr-breakeven level=2 check="0.4"}
Concept A rates 5 on criterion $k$ and has an average of $\bar R_A = 2$ over the other criteria; concept B rates 2 on $k$ and has $\bar R_B = 4$. Above what weight $u$ of criterion $k$ does A score higher? (Enter $u$.)
::: solution
By [[#eq-breakeven]], $u^* = (2 - 4)/[(2 - 4) - (5 - 2)] = (-2)/(-5) = 0.4$. Check: at $u = 0.4$, $S_A = 0.4\times5 + 0.6\times2 = 3.2$ and $S_B = 0.4\times2 + 0.6\times4 = 3.2$ ✓; for $u > 0.4$ A, with the larger rating on $k$, is ahead.
:::
:::

::: exercise A value function {#exr-value level=2 check="0.625"}
The specification gives a marginal mass of $12\,\mathrm{kg}$ and an ideal mass of $8\,\mathrm{kg}$. A concept is estimated at $9.5\,\mathrm{kg}$. What is its rating on the linear value function [[#eq-value]]? (Enter $v$ between 0 and 1.)
::: solution
$v = (9.5 - 12)/(8 - 12) = (-2.5)/(-4) = 0.625$.
:::
:::

::: exercise Is the test worth it? {#exr-evpi level=2 check="0.4"}
Concept X is worth a certain £1.0 M. Concept Y is worth £2.4 M if a new mechanism works (probability $0.5$) and £0.2 M if it fails late. What is the expected value of perfect information about the mechanism? Would a £0.3 M test be worth doing? (Enter the EVPI in £M.)
::: solution
Without information: $\mathrm{EV}(Y) = 0.5\times2.4 + 0.5\times0.2 = 1.3 > 1.0$, so choose Y with $\mathrm{EV} = 1.3$. With perfect information: $0.5\times2.4 + 0.5\times1.0 = 1.7$. EVPI $= 1.7 - 1.3 = 0.4\,$M. A test costing £0.3 M is worth doing if it is close to conclusive: net $1.7 - 0.3 = 1.4 > 1.3$. Check: EVPI $= 0.5\times(1.0 - 0.2) = 0.4$ ✓.
:::
:::

::: exercise Tube or solid section? {#exr-index level=3 check="0.41"}
A stiffness-limited cantilever arm may be made of steel or of carbon-fibre-reinforced polymer with $E = 100\,\mathrm{GPa}$ and $\rho = 1550\,\mathrm{kg/m^3}$ along the arm (treat both as isotropic beams). (a) For a thin-walled tube of fixed diameter, what is the mass ratio $m_{\text{CFRP}}/m_{\text{steel}}$, rounded to two decimal places? (b) Is the advantage of CFRP larger or smaller if the section is a solid square of free size? (c) Derive the index for a third concept: a rectangular section of fixed width $b$ and free depth $h$. (Enter the ratio of (a).)
::: solution
(a) $\rho/E$: steel $7850/210 = 37.38$; CFRP $1550/100 = 15.50$ (in $\mathrm{kg\,m^{-3}\,GPa^{-1}}$). Ratio $15.50/37.38 = 0.4147$, i.e. $0.41$.
(b) $\rho/E^{1/2}$: steel $7850/\sqrt{210} = 541.7$; CFRP $1550/\sqrt{100} = 155.0$; ratio $0.286$. The advantage is larger (a $71\,\%$ saving instead of $59\,\%$) because the less stiff material can also use a bigger section.
(c) $I = bh^3/12 \ge FL^3/(3E\delta)$ gives $h \propto E^{-1/3}$, and $m = \rho Lbh \propto \rho/E^{1/3}$. The more freedom the concept has to grow the section, the smaller the exponent on $E$ and the more low-density materials are favoured.
:::
:::

::: exercise Choosing a concept for the stair-climbing trolley {#exr-design level=3}
Take the three concepts from the last exercise of [[design-process/concept-generation]] (or three of your own for a product of your choice). (a) Screen them with a Pugh matrix against a datum (a conventional sack truck). (b) Build a weighted scoring matrix with at least five criteria, anchored ratings and justified weights. (c) Find the break-even weight of the criterion you are least sure about. (d) Identify the single most uncertain rating, propose a model or a test that would settle it, and say whether its cost is justified.
::: solution
Answers will differ; a good one has these features. (a) The datum is concrete and drawn at the same level of detail; each + or − is explained in a sentence; hybrids are proposed where a concept's minus could be removed by borrowing a feature. (b) Criteria come from the specification and do not overlap (e.g. hand force on stairs, mass, safety against run-away, cost, folded size); the run-away requirement is treated as a pass/fail constraint, not a weighted criterion; ratings are anchored to metric estimates through value functions (e.g. hand force: marginal $150\,\mathrm N$, ideal $80\,\mathrm N$). (c) The break-even calculation uses [[#eq-breakeven]] and states whether the decision is robust. (d) Typically the most uncertain rating is the hand force of a manual tri-star concept; a quick estimate (moment of the load about the step edge, divided by the handle lever arm) followed by a wooden mock-up on a real staircase costs a few hours and can change the decision, so its value of information is high.
:::
:::

## Further reading

Ulrich, Eppinger and Yang's *Product Design and Development* (7th ed., 2020) presents concept screening and scoring as a two-stage process with practical advice. Pugh's *Total Design* (1991) explains controlled convergence in his own words. Cross's *Engineering Design Methods* (5th ed., 2021) covers weighted objectives and their pitfalls, and Ashby's *Materials Selection in Mechanical Design* develops the performance indices of [[#prop-index]] into a complete method for choosing materials at the concept stage.
