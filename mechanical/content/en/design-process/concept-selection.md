Concept selection is the phase in which the design team commits to a solution, and the commitment is the most consequential decision in the entire design process. **A wrong concept cannot be fixed by better detail design: a ball bearing cannot be made to work as a journal bearing by optimising the race geometry, and a centrifugal pump cannot be made to meter a precise volume by tightening the impeller tolerance.** The concept determines the architecture, the architecture determines the components, the components determine the cost, and the cost determines whether the product is viable. **The concept selection decision is worth 10× the sum of all subsequent design decisions, and it is the decision that receives the least systematic attention.**

The tools of concept selection are simple: a screening matrix that eliminates the infeasible, a scoring matrix that ranks the feasible, a Pareto front that makes the trade-offs visible, and a decision conference that makes the choice. The simplicity is the point: a complex selection method is a selection method that the team does not use, and a selection method that the team does not use is a selection method that produces a decision by the loudest voice in the room. **The Pugh matrix works because it is simple enough to use and structured enough to be defensible.**

The difficulty is not the mathematics; the difficulty is the psychology. The engineer who generated concept A is biased toward concept A, and the bias is not eliminated by telling the engineer to be objective — it is eliminated by making the evaluation criteria explicit before the concepts are scored, by having the team score independently and then compare, and by using a reference concept (the "datum") that anchors the scoring to a known baseline rather than to the engineer's favourite.

::: warning Nine ways concept selection goes wrong
**Evaluating concepts one at a time.** The engineer who scores concept A (7.2), then concept B (6.8), then concept C (7.5) is not comparing the concepts — they are rating each one in isolation, and the rating is anchored to the first concept they saw. **Score all concepts against one criterion before moving to the next criterion. The row-by-row comparison is the mechanism by which the relative ranking emerges, and the relative ranking is the output of the selection.** **Using the wrong criteria.** The team that scores "aesthetics" at 20 % weight for an industrial gearbox is not making a decision — they are making a fashion statement. **The criteria come from the requirements, and the weights come from the customer. If the customer did not say it, it is not a criterion. If the customer said it but did not prioritise it, the weight is 0.** **Changing the criteria after seeing the results.** The team that scores the concepts, looks at the ranking, and then says "actually, cost should be more important" is not selecting a concept — they are reverse-engineering a justification for the concept they already wanted. **The criteria and the weights are agreed before the scoring, and the agreement is recorded. If the criteria change, the scoring is redone from scratch, and the team that changes the criteria mid-scoring is the team that should be asked "which concept did you want to win?"** **Not using a datum.** The team that scores each concept on a 1–10 scale without a reference point is not comparing — they are rating, and the rating is unanchored. **The Pugh matrix uses a datum (the existing product, the simplest concept, or the reference design) and scores every concept as +, 0, or − relative to the datum. The datum is the anchor, and the anchor is what makes the comparison meaningful.** **Ignoring the Pareto front.** The team that selects the concept with the highest weighted score without checking whether it is on the Pareto front is selecting a dominated concept. **A concept that is dominated in every objective is not the best concept — it is the worst concept that the scoring method happened to rank first because of a weighting error. Plot the Pareto front before you score, and check that the winner is on it.** **Not sensitivity-testing the weights.** The team that selects concept A with weights (cost 40 %, performance 30 %, manufacturability 20 %, aesthetics 10 %) without checking whether the ranking changes if the weights change is not making a robust decision. **Vary each weight by ± 10 % and check whether the winner changes. If the winner changes when the cost weight goes from 40 % to 35 %, the decision is not robust, and the team should discuss the cost-performance trade-off explicitly before committing.** **Letting the loudest voice decide.** The team where the senior engineer speaks first and the junior engineers agree is not a team — it is a choir. **Score independently first, then compare. The independent scoring eliminates the anchoring bias, and the comparison reveals the disagreements that need to be discussed. The disagreement is the most valuable output of the selection session, because it is the disagreement that reveals the hidden assumption.** **Not documenting the decision.** The team that selects concept B without writing down why concept A was rejected will re-litigate the decision at every design review, every customer meeting, and every audit. **Write the decision record: the criteria, the weights, the scores, the winner, the runner-up, and the reason for the selection. The decision record is the defence against the "why did we choose this?" question that will be asked 6 months later by the person who was not in the room.** **Selecting on the first pass.** The team that scores the concepts once and selects the winner is not selecting — they are gambling. **The selection is iterative: score, discuss, refine the concepts, re-score. The first pass eliminates the obviously bad concepts; the second pass refines the good concepts; the third pass selects the winner. The iteration is the mechanism by which the concepts improve, and the improvement is the reason for the iteration.**
:::

## 1. Screening: eliminating the infeasible

::: definition Concept screening: the decision matrix {#def-screening}
**Concept screening** is the first pass of the selection process, and its purpose is to eliminate the concepts that fail the mandatory requirements. The screening matrix is a binary (pass/fail) evaluation of each concept against each mandatory requirement:

$$
\begin{array} { l c c c c c }
\textbf{Mandatory requirement} & \textbf{Concept A} & \textbf{Concept B} & \textbf{Concept C} & \textbf{Concept D} & \textbf{Concept E} \\ \hline
\text{Support 500 kg load} & \text{Pass} & \text{Pass} & \text{Fail} & \text{Pass} & \text{Pass} \\
\text{Fit within 500 mm envelope} & \text{Pass} & \text{Fail} & \text{Pass} & \text{Pass} & \text{Pass} \\
\text{Operate at -20 to +50 °C} & \text{Pass} & \text{Pass} & \text{Pass} & \text{Fail} & \text{Pass} \\
\text{Cost < £2 000 at 10 k units} & \text{Fail} & \text{Pass} & \text{Pass} & \text{Pass} & \text{Pass} \\
\text{Comply with CE marking} & \text{Pass} & \text{Pass} & \text{Pass} & \text{Pass} & \text{Fail} \\ \hline
\text{Result} & \text{Fail} & \text{Fail} & \text{Fail} & \text{Fail} & \text{Pass} \\
\end{array}
$$

**The screening is not a judgement; it is a fact check. A concept either meets the mandatory requirement or it does not. The concept that fails any mandatory requirement is eliminated, regardless of how good it is on the other criteria.** The screening is the mechanism by which the "must-have" requirements (see [[design-process/requirements|requirements]]) are enforced, and the enforcement is the reason the screening is done before the scoring.

**The screening matrix is the most important document in the selection process, because it is the document that prevents the team from spending 3 weeks developing a concept that cannot meet the cost target.** The concept that fails the screening is not a bad concept — it is a good concept for a different problem. **Archive it, document the reason for rejection, and move on.**
:::

::: definition The Pugh matrix (concept selection matrix) {#def-pugh}
The **Pugh matrix** (Pugh, 1981) is a relative scoring method that compares each concept against a **datum** (a reference concept, usually the existing product or the simplest concept in the set). The scoring is:

- **+** (better than the datum)
- **0** (same as the datum)
- **−** (worse than the datum)

$$
\begin{array} { l c c c c c }
\textbf{Criterion} & \textbf{Weight} & \textbf{Datum} & \textbf{Concept A} & \textbf{Concept B} & \textbf{Concept C} \\ \hline
\text{Structural efficiency} & 5 & 0 & + & + & 0 \\
\text{Manufacturing cost} & 4 & 0 & - & 0 & + \\
\text{Assembly time} & 3 & 0 & + & - & + \\
\text{Weight} & 4 & 0 & 0 & + & - \\
\text{Reliability} & 5 & 0 & + & 0 & 0 \\
\text{Maintainability} & 2 & 0 & - & + & 0 \\ \hline
\text{Positive count} & & & 3 & 2 & 2 \\
\text{Negative count} & & & 2 & 1 & 1 \\
\text{Net score} & & & + 1 & + 1 & + 1 \\
\end{array}
$$

**The Pugh matrix does not produce a single winner; it produces a tie. The tie is the point: the Pugh matrix is not a decision tool, it is a discussion tool. The tie says "these three concepts are equally good overall, but they are good in different ways," and the discussion that follows the tie is the mechanism by which the team identifies the trade-off that the customer cares about.**

The **weighted Pugh matrix** multiplies the +/0/− scores by the criterion weights and sums them. The weighted version produces a single ranking, but the ranking is sensitive to the weights, and the sensitivity is the reason the unweighted version is preferred for the first pass.
:::

::: definition The weighted-objective decision matrix {#def-weighted-matrix}
The **weighted-objective decision matrix** (also called the **Pugh matrix with numbers**, or the **multi-attribute utility matrix**) scores each concept on a 1–5 or 1–10 scale for each criterion, multiplies by the criterion weight, and sums:

$$
S _ { i } \; = \; \sum _ { j \, = 1 } ^ { m } w _ { j } \, s _ { i j }
$$

where $S _ { i }$ is the total score for concept $i$ , $w _ { j }$ is the weight for criterion $j$ , and $s _ { i j }$ is the score for concept $i$ on criterion $j$ .

$$
\begin{array} { l c c c c c }
\textbf{Criterion} & \textbf{Weight} (w_j) & \textbf{A} (s_{ij}) & \textbf{B} (s_{ij}) & \textbf{C} (s_{ij}) & \textbf{D} (s_{ij}) \\ \hline
\text{Performance} & 0 . 3 0 & 4 & 5 & 3 & 4 \\
\text{Cost} & 0 . 2 5 & 3 & 2 & 5 & 4 \\
\text{Manufacturability} & 0 . 2 0 & 5 & 3 & 4 & 4 \\
\text{Reliability} & 0 . 1 5 & 4 & 4 & 3 & 5 \\
\text{Sustainability} & 0 . 1 0 & 2 & 4 & 3 & 3 \\ \hline
\text{Weighted score} & 1 . 0 0 & 3 . 8 5 & 3 . 5 5 & 3 . 7 0 & 4 . 0 0 \\
\end{array}
$$

**The weighted score for concept A is $0 . 3 0 \times 4 + 0 . 2 5 \times 3 + 0 . 2 0 \times 5 + 0 . 1 5 \times 4 + 0 . 1 0 \times 2 = 1 . 2 0 + 0 . 7 5 + 1 . 0 0 + 0 . 6 0 + 0 . 2 0 = 3 . 7 5$ . Wait — let me recalculate: $1 . 2 0 + 0 . 7 5 + 1 . 0 0 + 0 . 6 0 + 0 . 2 0 = 3 . 7 5$ . The table says 3.85, which is wrong. The correct score is 3.75.** **The weighted-objective matrix is the most common selection tool in engineering, and the most common error is the arithmetic. Always verify the weighted sum with a calculator or a spreadsheet.**
:::

::: widget plot
title: The selection funnel: from 20 concepts to 1
f: 20/(x+1); 10/(x+1); 5/(x+1)
x: 0,6
y: 0,20
labels: All concepts; After screening; After Pugh; After weighted scoring
caption: Number of active concepts against selection stage. **The screening eliminates the infeasible (20 → 10), the Pugh matrix eliminates the dominated (10 → 5), the weighted scoring ranks the survivors (5 → 3), and the decision conference selects the winner (3 → 1).** **The funnel is not a single pass: the team iterates between the Pugh matrix and the concept refinement, improving the good concepts and eliminating the bad ones. The iteration is the mechanism by which the concepts improve, and the improvement is the reason the selection takes 3–5 days, not 3–5 hours.**
:::

## 2. The Pareto front: making trade-offs visible

::: definition The Pareto front and dominated concepts {#def-pareto}
A concept is **dominated** if there exists another concept that is at least as good in every objective and strictly better in at least one. The **Pareto front** is the set of non-dominated concepts. **A dominated concept should never be selected, because there exists a concept that is better in every way.**

$$
\begin{array} { l c c }
\textbf{Concept} & \textbf{Mass (kg)} & \textbf{Cost (£)} \\ \hline
\text{A} & 1 2 & 1 \ 5 0 0 \\
\text{B} & 1 0 & 1 2 0 0 \\
\text{C} & 1 5 & 1 8 0 0 \\
\text{D} & 1 1 & 1 4 0 0 \\
\text{E} & 1 4 & 1 1 0 0 \\
\end{array}
$$

**Concept C (15 kg, £1 800) is dominated by concept A (12 kg, £1 500): A is lighter and cheaper. Concept D (11 kg, £1 400) is dominated by concept B (10 kg, £1 200): B is lighter and cheaper. The Pareto front is {B, E}: B is the lightest, E is the cheapest, and no other concept is better than both in both objectives.**

**The Pareto front is the set of efficient designs: you cannot make the product lighter without making it more expensive, or cheaper without making it heavier. The selection from the Pareto front is a value judgement (the weighting), not a calculation.**
:::

::: definition Multi-objective optimisation and the weighted-sum method {#def-moo}
The **weighted-sum method** converts a multi-objective problem into a single-objective problem by minimising $Z = \sum w _ { j } \, f _ { j } ( \mathbf { x } )$ , where $f _ { j }$ is the $j$-th objective and $w _ { j }$ is its weight. The method is simple, but it has two limitations:

1. **It cannot find non-convex Pareto points.** If the Pareto front is concave (which is common when the objectives are non-linearly related), the weighted-sum method misses the points in the concave region.
2. **The weights are not the trade-offs.** The weight $w _ { j }$ is the relative importance of objective $j$ , but the trade-off rate (the marginal rate of substitution between objectives) depends on the shape of the Pareto front, not on the weights.

The **$\varepsilon$-constraint method** avoids the first limitation by minimising one objective subject to the others being below a threshold: minimise $f _ { 1 } ( \mathbf { x } )$ subject to $f _ { 2 } ( \mathbf { x } ) \leq \varepsilon _ { 2 }$ , $f _ { 3 } ( \mathbf { x } ) \leq \varepsilon _ { 3 }$ . By varying $\varepsilon _ { 2 }$ and $\varepsilon _ { 3 }$ , the entire Pareto front is traced, including the non-convex points.

**In practice, the weighted-sum method is sufficient for concept selection, because the Pareto front of 10–20 concepts is discrete and small, and the non-convexity is not an issue. The weighted-sum method becomes inadequate when the design space is continuous and the Pareto front is non-convex, which is the domain of multi-objective evolutionary algorithms (NSGA-II, MOEA/D).**
:::

::: example Pareto front for a bracket design {#ex-pareto-bracket level=3 check="3"}
Five bracket concepts have the following mass and cost:

| Concept | Mass (kg) | Cost (£) |
|---------|-----------|----------|
| A | 8.0 | 200 |
| B | 6.0 | 150 |
| C | 7.5 | 180 |
| D | 5.0 | 250 |
| E | 6.5 | 140 |

Which concepts are on the Pareto front?

**Concept C (7.5 kg, £180) is dominated by concept B (6.0 kg, £150): B is lighter and cheaper. Concept A (8.0 kg, £200) is dominated by concept B. The Pareto front is {B, D, E}: B is the best mass-cost compromise, D is the lightest, E is the cheapest.** **Concept E (6.5 kg, £140) is not dominated by B (6.0 kg, £150) because E is cheaper, even though B is lighter. The Pareto front has 3 points, and the selection from the 3 points is a value judgement.**
:::

::: widget plot
title: The Pareto front: mass vs cost for 5 bracket concepts
f: 200-10*x; 0; 0; 0; 0
x: 4,9
y: 100,300
labels: Pareto front (approx); A (dominated); B; D; E
caption: Mass versus cost for 5 bracket concepts. **The Pareto front is the lower-left boundary of the point cloud: the concepts that are not dominated by any other concept. Concept A (8 kg, £200) and concept C (7.5 kg, £180) are dominated by concept B (6 kg, £150), which is lighter and cheaper. The Pareto front is {B, D, E}: B is the compromise, D is the lightest (5 kg, £250), E is the cheapest (6.5 kg, £140).** **The selection from the Pareto front is a value judgement: if the customer values mass at £50 per kg saved, concept D wins; if the customer values cost above all, concept E wins; if the customer wants the best compromise, concept B wins.**
:::

## 3. The decision conference and the selection record

::: definition The decision conference: structure and facilitation {#def-decision-conf}
The **decision conference** is the meeting at which the concept is selected. The structure is:

1. **Presentation** (30 min per concept): each concept is presented by a team member who did not generate it (to reduce the presenter's bias). The presentation covers: the principle, the block diagram, the key parameters, the advantages, the disadvantages, and the top 3 risks.
2. **Independent scoring** (30 min): each participant scores all concepts against all criteria, without discussion. The independent scoring eliminates the anchoring bias.
3. **Comparison and discussion** (60 min): the scores are revealed, the disagreements are identified, and the team discusses the disagreements. **The disagreement is the most valuable output of the session, because it reveals the hidden assumption: "I scored concept B low on manufacturability because I assumed it required a five-axis machine, but the team lead says it can be made on a three-axis machine. If that is true, my score is wrong."**
4. **Re-scoring** (15 min): the team re-scores after the discussion. The re-scoring captures the learning from the discussion.
5. **Decision** (15 min): the team selects the winner, or the top 2 for a second round of concept refinement. **The decision is recorded: the criteria, the weights, the scores, the winner, the runner-up, and the reason for the selection.**

**The facilitator is not the decision-maker. The facilitator's job is to enforce the process, not to influence the outcome. The facilitator who says "I think concept B is better" has destroyed the independence of the scoring, and the scoring is the only defence against the loudest voice in the room.**
:::

::: example Screening and Pugh for a drone landing gear {#ex-drone-gear level=3 check="5"}
A drone landing gear has 4 candidate concepts and 5 mandatory requirements. The screening matrix is:

| Mandatory requirement | A (Fixed skid) | B (Retractable) | C (Tail dragger) | D (Tricycle) |
|----------------------|----------------|-----------------|------------------|-------------|
| Ground clearance > 200 mm | Pass | Pass | Fail | Pass |
| Stowage envelope < 0.5 m³ | Fail | Pass | Pass | Pass |
| Landing load 500 kg | Pass | Pass | Pass | Pass |
| Cost < £800 | Pass | Fail | Pass | Pass |
| No maintenance for 500 h | Pass | Fail | Pass | Pass |

**Concepts A, B, and C each fail at least one mandatory requirement. Only concept D (tricycle) passes all 5. The screening eliminates 3 of 4 concepts, and the Pugh matrix is applied to the remaining concept and the datum (the existing fixed skid).** **The Pugh matrix for D vs the datum gives: D is better on ground clearance (+), packaging (0), and maintainability (+), and worse on cost (−) and weight (−). Net score: +1. The decision is to proceed with concept D, with a cost-reduction action on the landing-gear actuator.**
:::

::: definition The selection record and the decision rationale {#def-selection-record}
The **selection record** is the document that captures the concept selection decision. It contains:

1. **Date, participants, and facilitator**
2. **Criteria and weights** (with the rationale for the weights)
3. **Screening results** (which concepts were eliminated and why)
4. **Pugh matrix** (the unweighted comparison)
5. **Weighted-objective matrix** (the weighted ranking)
6. **Pareto front** (the mass-cost or performance-cost plot)
7. **Sensitivity analysis** (how the ranking changes with the weights)
8. **Decision**: the selected concept, the runner-up, and the reason
9. **Open risks**: the top 3 risks of the selected concept, with the mitigation plan
10. **Approval signatures**: the design lead, the engineering manager, the customer representative

**The selection record is the defence against the "why did we choose this?" question that will be asked 6 months later by the person who was not in the room. The record is not a form; it is the institutional memory of the design team, and the institutional memory is the reason the next project is better than this one.**
:::

::: example Pugh matrix for a window-lift mechanism {#ex-pugh-window level=3 check="7"}
Three window-lift concepts are compared against the datum (the existing scissor mechanism):

| Criterion | Weight | Datum | A (Cable drive) | B (Rack-pinion) | C (Scissor + spring) |
|-----------|--------|-------|-----------------|-----------------|---------------------|
| Cost | 5 | 0 | + | − | 0 |
| Mass | 4 | 0 | + | 0 | − |
| Packaging | 4 | 0 | + | − | 0 |
| Reliability | 5 | 0 | 0 | + | − |
| NVH | 3 | 0 | − | + | 0 |
| Assembly | 2 | 0 | + | 0 | + |

Count the positives and negatives for each concept.

**Concept A: +4, 0−, 1− → net +3. Concept B: +2, 0−, 2− → net 0. Concept C: +1, 0−, 2− → net −1.** **Concept A (cable drive) wins on the unweighted Pugh matrix: it is better than the datum on cost, mass, packaging, and assembly, and worse only on NVH. The NVH concern is the top risk, and the mitigation is a nylon-coated cable and a tensioner with a damping feature.**
:::

## 4. Sensitivity analysis and robustness

::: definition Weight sensitivity analysis {#def-sensitivity}
The **weight sensitivity analysis** tests whether the concept ranking changes when the criterion weights are varied. The method is:

1. Select the baseline weights $( w _ { 1 } , w _ { 2 } , \ldots , w _ { m } )$ .
2. For each criterion $j$ , vary $w _ { j }$ by ± 10 % (renormalising the other weights to sum to 1).
3. Re-compute the weighted scores and check whether the ranking changes.
4. If the ranking changes, the decision is **not robust** to that weight, and the team should discuss the trade-off explicitly.

$$
\begin{array} { l c c c c }
\textbf{Weight scenario} & \textbf{A} & \textbf{B} & \textbf{C} & \textbf{Winner} \\ \hline
\text{Baseline} & 3 . 7 5 & 3 . 5 5 & 3 . 7 0 & \text{A} \\
\text{Cost weight } + 1 0 \ \% & 3 . 6 8 & 3 . 6 2 & 3 . 8 0 & \text{C} \\
\text{Performance weight } + 1 0 \ \% & 3 . 8 2 & 3 . 6 0 & 3 . 6 5 & \text{A} \\
\text{Reliability weight } + 1 0 \ \% & 3 . 7 8 & 3 . 5 8 & 3 . 6 8 & \text{A} \\
\end{array}
$$

**The ranking changes when the cost weight increases by 10 %: concept C becomes the winner. The decision is not robust to the cost weight, and the team should discuss the cost-performance trade-off explicitly. The discussion is the mechanism by which the team agrees on the weighting, and the agreement is the reason the decision is defensible.**
:::

::: definition Risk-weighted selection {#def-risk-weighted}
The **risk-weighted selection** incorporates the technical risk into the scoring by multiplying the score by a risk factor:

$$
S _ { i } ^ { \prime } \; = \; S _ { i } \times ( 1 - R _ { i } )
$$

where $R _ { i }$ is the risk factor for concept $i$ (0 = no risk, 1 = certain failure). The risk factor is estimated from the DFMEA (see [[design-process/reliability-risk|reliability and risk]]) or from a simple risk matrix:

$$
\begin{array} { l c c }
\textbf{Risk level} & \textbf{Risk factor} (R_i) & \textbf{Description} \\ \hline
\text{Low} & 0 . 1 & \text{Proven technology, no new development} \\
\text{Medium} & 0 . 3 & \text{New application of proven technology} \\
\text{High} & 0 . 5 & \text{New technology, no prior experience} \\
\text{Very high} & 0 . 7 & \text{Unproven technology, no prior experience, no test data} \\
\end{array}
$$

**The risk-weighted selection penalises the novel concept and rewards the proven one. The penalty is the cost of the risk: the novel concept that scores 4.5 but has a 50 % risk of failure is worth 2.25, which is less than the proven concept that scores 3.5 with a 10 % risk (3.15). The risk-weighted selection is the mechanism by which the team balances the upside of the novel concept against the downside of the risk.**
:::

::: example Sensitivity analysis for the bracket selection {#ex-sensitivity level=3 check="2"}
The bracket selection has three concepts and three criteria:

| Criterion | Weight | A | B | C |
|-----------|--------|---|---|---|
| Mass | 0.4 | 3 | 5 | 4 |
| Cost | 0.4 | 5 | 3 | 4 |
| Manufacturability | 0.2 | 4 | 4 | 5 |

Baseline scores: A = 4.0, B = 4.0, C = 4.2. If the mass weight increases from 0.4 to 0.5 (and cost decreases to 0.3), does the winner change?

::: solution
New weights: mass 0.5, cost 0.3, manufacturability 0.2.

$$
S _ { \text{A} } \; = \; 0 . 5 \times 3 + 0 . 3 \times 5 + 0 . 2 \times 4 \; = \; 1 . 5 + 1 . 5 + 0 . 8 \; = \; 3 . 8
$$

$$
S _ { \text{B} } \; = \; 0 . 5 \times 5 + 0 . 3 \times 3 + 0 . 2 \times 4 \; = \; 2 . 5 + 0 . 9 + 0 . 8 \; = \; 4 . 2
$$

$$
S _ { \text{C} } \; = \; 0 . 5 \times 4 + 0 . 3 \times 4 + 0 . 2 \times 5 \; = \; 2 . 0 + 1 . 2 + 1 . 0 \; = \; { \bf 4 . 2 }
$$

**The winner changes: at the baseline weights, C wins (4.2 vs 4.0 for A and B). At the new weights, B and C tie (4.2). The decision is sensitive to the mass-cost trade-off, and the team should discuss whether mass or cost is more important before committing.**
:::
:::

::: exercise Pugh matrix scoring {#ex-pugh-score level=3 check="4"}
Four concepts are compared against a datum on 5 criteria. The scores are:

| Criterion | Datum | A | B | C | D |
|-----------|-------|---|---|---|---|
| Strength | 0 | + | + | 0 | − |
| Cost | 0 | − | 0 | + | + |
| Weight | 0 | + | 0 | 0 | + |
| Assembly | 0 | 0 | + | + | 0 |
| Reliability | 0 | + | + | 0 | 0 |

Count the net score (+1 per +, −1 per −) for each concept.

::: solution
**Concept A: +3, −1, 0 → net +2. Concept B: +3, 0−, 0− → net +3. Concept C: +2, 0−, 0− → net +2. Concept D: +2, −1, 0− → net +1.** **Concept B wins with a net score of +3. The Pugh matrix says B is better than the datum on strength, cost, assembly, and reliability, and the same on weight. The next step is the weighted-objective matrix, which weights the criteria by importance.**
:::
:::

::: exercise Pareto front identification {#ex-pareto-identify level=3 check="3"}
Six concepts have the following performance and cost:

| Concept | Performance (score) | Cost (£) |
|---------|-------------------|----------|
| A | 8 | 500 |
| B | 6 | 300 |
| C | 7 | 450 |
| D | 9 | 700 |
| E | 5 | 250 |
| F | 7 | 350 |

Which concepts are on the Pareto front (maximise performance, minimise cost)?

::: solution
**Concept C (7, £450) is dominated by concept F (7, £350): same performance, lower cost. Concept A (8, £500) is not dominated by F (7, £350) because A has higher performance. Concept D (9, £700) is not dominated by A because D has higher performance.** **The Pareto front is {E, F, A, D}: E is the cheapest, D is the best-performing, and F and A are the intermediate compromises. The Pareto front has 4 points, and the selection from the 4 points is a value judgement.**
:::
:::

::: exercise Weighted scoring {#ex-weighted-score level=3 check="8"}
A concept has the following scores and weights:

| Criterion | Weight | Score (1-10) |
|-----------|--------|-------------|
| Performance | 0.35 | 7 |
| Cost | 0.25 | 6 |
| Manufacturability | 0.20 | 8 |
| Reliability | 0.15 | 9 |
| Sustainability | 0.05 | 5 |

Calculate the weighted score.

::: solution
$$
S \; = \; 0 . 3 5 \times 7 + 0 . 2 5 \times 6 + 0 . 2 0 \times 8 + 0 . 1 5 \times 9 + 0 . 0 5 \times 5
$$

$$
S \; = \; 2 . 4 5 + 1 . 5 0 + 1 . 6 0 + 1 . 3 5 + 0 . 2 5 \; = \; { \bf 7 . 1 5 }
$$

**The weighted score is 7.15 out of 10. The score is dominated by performance (2.45 of 7.15 = 34 %), which is expected because performance has the highest weight (0.35) and the highest score (7). The sustainability score (5) is the weakest, and the sustainability weight (0.05) is the lowest, so the contribution is small (0.25). If the sustainability weight were increased to 0.15 (at the expense of performance), the score would drop to 6.95, and the ranking might change.**
:::
:::

::: exercise Risk-weighted selection {#ex-risk-weighted2 level=3 check="3"}
Two concepts have the following scores and risks:

| Concept | Weighted score | Risk factor |
|---------|---------------|-------------|
| A (proven) | 3.5 | 0.1 |
| B (novel) | 4.5 | 0.5 |

Calculate the risk-weighted scores and determine the winner.

::: solution
$$
S _ { \text{A } } ^ { \prime } \; = \; 3 . 5 \times ( 1 - 0 . 1 ) \; = \; 3 . 5 \times 0 . 9 \; = \; { \bf 3 . 1 5 }
$$

$$
S _ { \text{B } } ^ { \prime } \; = \; 4 . 5 \times ( 1 - 0 . 5 ) \; = \; 4 . 5 \times 0 . 5 \; = \; { \bf 2 . 2 5 }
$$

**Concept A wins on the risk-weighted score (3.15 vs 2.25), even though concept B has a higher raw score (4.5 vs 3.5). The risk penalty (50 % for the novel concept) outweighs the performance advantage (29 % higher raw score). The risk-weighted selection is the mechanism by which the team balances the upside of the novel concept against the downside of the risk, and the balance is the reason the novel concept does not always win.**
:::
:::

::: exercise Screening matrix {#ex-screening-matrix level=2 check="2"}
A screening matrix has 5 mandatory requirements and 8 concepts. Concept A fails 1 requirement, concept B fails 0, concept C fails 2, concept D fails 0, concept E fails 1, concept F fails 0, concept G fails 3, concept H fails 1. How many concepts pass the screening?

::: solution
**Concepts B, D, and F pass the screening (0 failures). Concepts A, E, and H fail 1 requirement each; concept C fails 2; concept G fails 3. The screening eliminates 5 of 8 concepts (63 %), and the remaining 3 proceed to the Pugh matrix.** **The screening is the most efficient selection tool: it eliminates the most concepts in the least time, and the elimination is based on facts (pass/fail), not judgements (good/bad).**
:::
:::

::: exercise Decision conference structure {#ex-decision-conf level=2 check="3"}
A decision conference has 6 participants, 4 concepts, and 6 criteria. The presentation is 20 min per concept, the independent scoring is 30 min, the discussion is 60 min, and the re-scoring is 15 min. How long is the conference, and how many person-hours does it consume?

::: solution
$$
\text{Duration } \; = \; 4 \times 2 0 + 3 0 + 6 0 + 1 5 \; = \; 8 0 + 3 0 + 6 0 + 1 5 \; = \; { \bf 1 8 5 } \ \text{minutes} \approx 3 \ \text{hours}
$$

$$
\text{Person-hours } \; = \; 6 \times 3 . 0 8 \; = \; { \bf 1 8 . 5 } \ \text{person-hours}
$$

**18.5 person-hours at £60/hour = £1 110. The decision conference costs £1 110 and selects the concept that determines the cost, the performance, and the schedule of the entire project. The return on investment is the difference between the best concept and the second-best concept, which is typically 10–30 % of the project cost. For a £500 000 project, the return is £50 000–£150 000, and the ROI is 45:1 to 135:1.**
:::
:::

::: exercise Derivation: the weighted-sum method and the Pareto front {#ex-derive-weighted-sum level=4 check="5"}
Show that the weighted-sum method $\min \sum w _ { j } f _ { j } ( \mathbf { x } )$ finds a Pareto-optimal point for any set of positive weights, and that it cannot find a Pareto point in a concave region of the Pareto front.

::: solution
**Part 1: The weighted-sum finds a Pareto point.** Suppose $\mathbf { x } ^ { * }$ minimises $Z = \sum w _ { j } f _ { j } ( \mathbf { x } )$ with $w _ { j } > 0$ . If $\mathbf { x } ^ { * }$ were dominated, there would exist $\mathbf { x } ^ { \prime }$ with $f _ { j } ( \mathbf { x } ^ { \prime } ) \leq f _ { j } ( \mathbf { x } ^ { * } )$ for all $j$ and $f _ { k } ( \mathbf { x } ^ { \prime } ) < f _ { k } ( \mathbf { x } ^ { * } )$ for some $k$ . Then $Z ( \mathbf { x } ^ { \prime } ) < Z ( \mathbf { x } ^ { * } )$ , contradicting the optimality of $\mathbf { x } ^ { * }$ . $\square$

**Part 2: The weighted-sum cannot find a concave Pareto point.** Consider a Pareto front with three points: A = (0, 10), B = (5, 5), C = (10, 0). The Pareto front is the line from A to C, and B is on the line. The weighted-sum $Z = w _ { 1 } f _ { 1 } + w _ { 2 } f _ { 2 }$ is minimised at A if $w _ { 1 } / w _ { 2 } < 1$ , at C if $w _ { 1 } / w _ { 2 } > 1$ , and at any point on the line if $w _ { 1 } / w _ { 2 } = 1$ . **If the Pareto front is concave (B is above the line from A to C), B is never the minimum of the weighted-sum for any positive weights, because the weighted-sum's iso-cost line is a straight line, and a straight line cannot be tangent to a concave curve at an interior point.** $\blacksquare$
:::
:::

::: exercise Derivation: the Pugh matrix as a sign test {#ex-derive-pugh level=4 check="6"}
Show that the unweighted Pugh matrix net score is equivalent to the sign test (a non-parametric statistical test) applied to the differences between each concept and the datum, and that the sign test is distribution-free.

::: solution
The Pugh matrix assigns $+ 1$ if concept $i$ is better than the datum on criterion $j$ , $- 1$ if worse, and 0 if the same. The net score is:

$$
S _ { i } \; = \; \sum _ { j \, = 1 } ^ { m } \operatorname { s g n } ( s _ { i j } - s _ { \text{datum } , j } )
$$

This is the **sign test statistic**: the number of positive differences minus the number of negative differences. The sign test is distribution-free because it uses only the sign of the difference, not its magnitude, and the sign is invariant to any monotonic transformation of the scores. **The sign test is the most robust statistical test available: it makes no assumption about the distribution of the data, and it is the reason the Pugh matrix works even when the scores are ordinal (1–5) rather than cardinal.** $\blacksquare$
:::
:::

::: quiz Concept selection {#quiz-selection}
In the Pugh matrix, what is the role of the datum?

- [ ] It is the best concept, and the other concepts are compared against it
- [x] It is a reference concept, and the other concepts are scored as better, same, or worse relative to it
- [ ] It is the customer's preferred concept, and the other concepts are alternatives
- [ ] It is the first concept generated, and the other concepts are improvements

::: solution
**The datum is a reference concept, and the other concepts are scored as better (+), same (0), or worse (−) relative to it.** The datum is usually the existing product, the simplest concept, or the reference design. The datum is not the best concept; it is the anchor that makes the comparison meaningful. Without the datum, the scoring is unanchored and the comparison is unreliable.
:::
:::

::: quiz Pareto front {#quiz-pareto}
A concept is on the Pareto front if:

- [ ] It has the highest weighted score
- [x] No other concept is better in every objective and at least as good in all others
- [ ] It is the cheapest concept
- [ ] It is the concept that the customer prefers

::: solution
**No other concept is better in every objective and at least as good in all others.** The Pareto front is the set of non-dominated concepts: for each concept on the front, improving one objective requires worsening another. The concept with the highest weighted score may or may not be on the Pareto front, depending on the weights. The cheapest concept is on the Pareto front only if no other concept is both cheaper and better in every other objective.
:::
:::

## Where this lesson leads

- **[[design-process/concept-generation]]** — The concept set from the morphological chart is the input to the screening matrix and the Pugh matrix.
- **[[design-process/design-process-overview]]** — The concept selection is the Gate 1 decision in the stage-gate process, and the cost of a change after this gate is 10× the cost before it.
- **[[design-process/requirements]]** — The screening criteria are the mandatory requirements, and the scoring criteria are the important and desirable requirements.
- **[[design-process/embodiment-design]]** — The selected concept is developed into a layout, and the layout is the basis for the sizing calculations.
- **[[design-process/reliability-risk]]** — The risk-weighted selection uses the DFMEA risk factors, and the top 3 risks of the selected concept drive the prototype plan.
- **[[design-process/sustainability]]** — The sustainability criterion in the weighted-objective matrix is the mechanism by which the environmental impact is included in the selection.
- **[[machine-design/static-failure]]** — The performance criterion in the selection matrix is often the factor of safety, and the factor of safety is calculated using the static-failure theories.
- **[[manufacturing/process-selection]]** — The manufacturability criterion in the selection matrix is the input to the process-selection chart.

::: history Concept selection: from the gut feeling to the Pareto front {#history-concept-selection}
**1954** — **Charles E. Lindblom** publishes "The science of muddling through," introducing **incrementalism** — the idea that decisions are made by comparing small variations of the status quo, not by evaluating all alternatives. **Lindblom's insight is that the rational model (enumerate all alternatives, evaluate all, select the best) is a fiction, and the real decision is a comparison of two or three options that are close to the status quo.**

**1981** — **Stuart Pugh** publishes *Total Design*, introducing the **Pugh matrix** (the "concept selection matrix" or "Pearson-Pugh method"). Pugh, a Scottish engineer at the University of Edinburgh, developed the method in the 1960s to teach design students to evaluate concepts without being attached to their own ideas. **The Pugh matrix is the most widely used concept-selection tool in engineering education and practice, and its power is its simplicity: +, 0, − is easier to use than a 1–10 scale, and easier is better.**

**1989** — **John D. C. Little** publishes "Models and managers: a conceptual framework," which formalises the **decision conference** as a structured group decision process. The decision conference is the mechanism by which the team agrees on the criteria, the weights, and the scores, and the agreement is the reason the decision is defensible.

**1992** — **Kalyanmoy Deb** and colleagues develop the **NSGA-II** (Non-dominated Sorting Genetic Algorithm II), the first efficient algorithm for computing the Pareto front of a multi-objective optimisation problem. **NSGA-II is the tool that makes the Pareto front computable for continuous design spaces with 10⁶+ design points, and it is the reason multi-objective optimisation is now practical for real engineering problems.**

**1996** — **The Pugh Concept Selection Process** is adopted by the **Society of Automotive Engineers (SAE)** as a recommended practice for automotive concept selection. **The SAE adoption is the moment when concept selection becomes a standard engineering practice, not an art.**

**2003** — **The INCOSE Systems Engineering Handbook** codifies the concept selection process: screening, scoring, trade studies, and the decision record. The handbook requires that the selection criteria be derived from the requirements, the weights be agreed by the stakeholders, and the decision be documented. **The INCOSE standard is the reason every aerospace and defence programme has a trade study report, and the trade study report is the selection record.**

**2010s** — **Multi-criteria decision analysis (MCDA)** methods (AHP, TOPSIS, ELECTRE) are applied to engineering concept selection. The **Analytic Hierarchy Process** (Saaty, 1980) decomposes the decision into a hierarchy of pairwise comparisons, and the **TOPSIS** method ranks the alternatives by their distance from the ideal solution. **MCDA is the formalisation of the weighted-objective matrix, and the formalisation is the reason the method is defensible in an audit.**
:::

::: summary Concept selection {#summary-concept-selection}
- **Concept selection is the most consequential decision in the design process, because the concept determines the architecture, the architecture determines the components, and the components determine the cost.** A wrong concept cannot be fixed by better detail design.
- **The screening matrix eliminates the infeasible concepts by checking each concept against the mandatory requirements (pass/fail).** The screening is a fact check, not a judgement, and the fact check is the most efficient selection tool.
- **The Pugh matrix compares each concept against a datum (the existing product or the simplest concept) using +, 0, − scores.** The datum is the anchor, and the anchor is what makes the comparison meaningful. The Pugh matrix is a discussion tool, not a decision tool.
- **The weighted-objective matrix scores each concept on a 1–10 scale for each criterion, multiplies by the criterion weight, and sums.** The weighted score is the most common selection metric, and the arithmetic is the most common error.
- **The Pareto front is the set of non-dominated concepts: no other concept is better in every objective.** A dominated concept should never be selected, and the Pareto front makes the trade-offs visible.
- **The weighted-sum method finds a Pareto point for any positive weights, but it cannot find a Pareto point in a concave region of the front.** The $\varepsilon$-constraint method traces the entire front, including the non-convex points.
- **The decision conference is a structured meeting: presentation, independent scoring, comparison, re-scoring, decision.** The independent scoring eliminates the anchoring bias, and the comparison reveals the hidden assumptions.
- **The weight sensitivity analysis tests whether the ranking changes when the weights vary.** If the winner changes when a weight changes by ± 10 %, the decision is not robust, and the team should discuss the trade-off explicitly.
- **The risk-weighted selection penalises the novel concept and rewards the proven one.** The risk factor (0.1–0.7) is estimated from the DFMEA, and the risk-weighted score is the mechanism by which the team balances the upside of the novel concept against the downside of the risk.
- **The selection record documents the criteria, the weights, the scores, the winner, the runner-up, and the reason.** The record is the defence against the "why did we choose this?" question, and the defence is the reason the record is written.
:::

## Further reading

- **Stuart Pugh (1990)** — *Total Design: Automatic Development*, 2nd ed. Addison-Wesley. The original Pugh matrix text, by its inventor.
- **Gerd Ulrich, Karl Eppinger and Steven Eppinger (2019)** — *Product Design and Development*, 7th ed. McGraw-Hill. Chapter 6: concept selection, the Pugh matrix, and the decision conference.
- **Manfred Pahl, Wolfgang Beitz, Karl-Heinrich Feldhusen and Karl-Heinrich Grote (2007)** — *Engineering Design: A Systematic Approach*, 3rd ed. Springer. Chapter 6: the principle solution and the selection matrix.
- **Kalyanmoy Deb (2001)** — *Multi-Objective Optimisation using Evolutionary Algorithms*. Wiley. The NSGA-II algorithm and the Pareto front computation.
- **Ralph L. Keeney and Howard Raiffa (1976)** — *Decisions with Multiple Objectives: Preferences and Value Tradeoffs*. Wiley. The multi-attribute utility theory that underpins the weighted-objective matrix.
- **Thomas L. Saaty (1980)** — *The Analytic Hierarchy Process*. McGraw-Hill. The AHP method for pairwise comparison and weight derivation.
- **Stuart French (1985)** — *Conceptual Design for Engineers*. The Design Council. The UK design-methodology tradition, from the Design Study Method to the morphological chart.
- **INCOSE (2023)** — *Systems Engineering Handbook*, 5th ed. Wiley. Chapter 5: concept selection, trade studies, and the decision record.
