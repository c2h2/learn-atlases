A sure 3\,000 units is offered, or an $80\%$ chance of $4\,000$. Most people take the sure amount. A $25\%$ chance of $3\,000$ is offered, or a $20\%$ chance of $4\,000$. Most people take the $20\%$ chance of $4\,000$. The second pair is the first pair with every probability multiplied by $1/4$. Expected-utility theory, through the independence axiom, forbids the pattern: whichever lottery you prefer in the first pair, you must prefer the corresponding scaled lottery in the second. The pattern is the **certainty effect**, a cousin of the Allais paradox, and it is the opening exhibit of Kahneman and Tversky’s 1979 paper in *Econometrica*. Prospect theory was written to fit that exhibit, and a handful of others, with two ingredients the standard model does not have: a **value function** defined on gains and losses relative to a reference point, and a **probability-weighting function** that overweights small probabilities and underweights large ones.

This chapter develops those two ingredients, in the 1992 cumulative form that is used in applications, and then reads off the endowment effect, status-quo bias, and the reflection effect. It also records the criticisms: Plott and Zeiler on the endowment-effect protocol, Koszegi and Rabin on the reference point as an equilibrium expectation, and Rabin’s calibration theorem on what expected-utility risk aversion over modest stakes would imply for large ones. The standard theory, which you have from [[microeconomics/uncertainty]], is not discarded. It is the special case $\lambda = 1$, $w(p) = p$, and a reference point that does not move.

## Expected utility and the Allais paradox

A **lottery** (or prospect) $P$ assigns probabilities to monetary outcomes. von Neumann and Morgenstern (1944) showed that a preference over lotteries satisfies completeness, transitivity, continuity and **independence** if and only if it has an expected-utility representation $P \mapsto \sum_x p(x)\, u(x)$, with $u$ unique up to positive affine transformation. Independence is the axiom that does the distinctive work: if $P \succsim Q$ then, for any $R$ and any $\alpha \in (0, 1]$, $\alpha P + (1-\alpha) R \succsim \alpha Q + (1-\alpha) R$. Mixing with a common $R$ does not reverse a ranking.

::: definition Expected utility {#def-eu}
A preference over lotteries has an **expected-utility (EU)** representation if there is $u$ such that $P \succsim Q$ if and only if $\sum_x p_P(x)\, u(x) \ge \sum_x p_Q(x)\, u(x)$. The independence axiom is necessary. Concave $u$ is risk aversion: the sure amount $\E_P[x]$ is preferred to $P$.
:::

Maurice Allais (1953) offered, in effect, the following two pairs (prizes in millions of 1950s French francs, here written as $1$m and $5$m).

- Problem 1: $A$ is $1$m for sure; $B$ is $0.89$ on $1$m, $0.10$ on $5$m, $0.01$ on $0$.
- Problem 2: $C$ is $0.11$ on $1$m (else $0$); $D$ is $0.10$ on $5$m (else $0$).

The modal laboratory pattern, then and now, is $A \succ B$ and $D \succ C$.

::: proposition Allais choices violate independence {#prop-allais}
The ranking $A \succ B$ together with $D \succ C$, on the lotteries above, is inconsistent with independence and therefore with EU.
:::
::: proof
Write $A = 0.89\,[1\mathrm{m}] + 0.11\,[1\mathrm{m}]$ and $B = 0.89\,[1\mathrm{m}] + 0.11\, R$, where $R$ is the lottery that yields $5$m with probability $10/11$ and $0$ with probability $1/11$. Independence says $A \succ B$ if and only if $[1\mathrm{m}] \succ R$. The same $R$ appears in problem 2: $C = 0.89\,[0] + 0.11\,[1\mathrm{m}]$ and $D = 0.89\,[0] + 0.11\, R$, so independence says $C \succ D$ if and only if $[1\mathrm{m}] \succ R$. The two revealed rankings cannot both hold.
:::

The common-consequence $0.89$ on $1$m in problem 1, and on $0$ in problem 2, “should not matter” and does. A parallel **common-ratio** form is the $3\,000$ versus $4\,000$ example in the opening paragraph. EU can fit $A \succ B$ by making $u$ concave enough, but then it predicts $C \succ D$, which is not what people do. It can fit $D \succ C$ with less concavity, but then it predicts $B \succ A$. No $u$ does both. That is the content of [[#prop-allais]]: the conflict is in the axiom, not in the curvature of $u$.

::: example A common-ratio pair {#ex-common-ratio}
Let $P = (4000, 0.80)$ (else $0$) and $Q = (3000, 1)$, and let $P' = (4000, 0.20)$ and $Q' = (3000, 0.25)$. Show that $Q \succ P$ and $P' \succ Q'$ jointly violate independence. If $u(0) = 0$, what inequality on $u(3000)/u(4000)$ does each ranking impose?
::: solution
$P' = \tfrac14 P + \tfrac34 [0]$ and $Q' = \tfrac14 Q + \tfrac34 [0]$, so independence says $Q \succ P$ if and only if $Q' \succ P'$. The observed pair of rankings contradicts that. With $u(0) = 0$, $Q \succ P$ is $u(3000) > 0.80\, u(4000)$, i.e. $u(3000)/u(4000) > 0.80$; $P' \succ Q'$ is $0.20\, u(4000) > 0.25\, u(3000)$, i.e. $u(3000)/u(4000) < 0.80$. The two inequalities are incompatible.
:::
:::

Rabin (2000) gave a different reason to be unhappy with EU as a theory of modest-stakes risk aversion. If a risk-averse EU maximiser turns down a $50$–$50$ lose-$100$/gain-$110$ bet at *every* wealth level, then she will also turn down $50$–$50$ lose-$1\,000$/gain-$x$ bets for arbitrarily large $x$. Concavity that is visible on a $\$100$ scale, applied globally, is an absurd attitude to large bets. The calibration theorem is a theorem about EU, not about people: it says that if you want a model of modest-stakes risk aversion that does not wreck large-stakes behaviour, you cannot use a globally concave $u$ on wealth. You need a kink or a curvature that is *local*, which is what a reference-dependent value function provides.

## The value function and loss aversion

Kahneman and Tversky (1979) replaced $u$ on wealth with a **value function** $v$ on gains and losses relative to a **reference point** $r$. Tversky and Kahneman (1992), the version used below, estimated a one-parameter family on each side of $r$ and a coefficient of loss aversion.

::: definition Prospect-theory value function {#def-value}
For a monetary outcome $x$ and a reference point $r$, write $\Delta = x - r$. The **Tversky–Kahneman value function** is

$$
v(\Delta) =
\begin{cases}
\Delta^{\alpha} & \Delta \ge 0, \\
-\lambda (-\Delta)^{\beta} & \Delta < 0,
\end{cases}
$$ {#eq-value}

with $0 < \alpha, \beta \le 1$ and $\lambda \ge 1$. The parameter $\lambda$ is the **coefficient of loss aversion**. Tversky and Kahneman’s median estimates were $\alpha \approx \beta \approx 0.88$ and $\lambda \approx 2.25$. The function is concave over gains (diminishing sensitivity), convex over losses (also diminishing sensitivity), and steeper for losses than for equal-sized gains (loss aversion).
:::

The kink at the origin is the distinctive economic prediction. A $50$–$50$ gain $g$ / loss $\ell$ is accepted only if $v(g) + v(-\ell) \ge 0$, i.e. $g^{\alpha} \ge \lambda \ell^{\beta}$. With $\alpha = \beta$ this is $g/\ell \ge \lambda^{1/\alpha}$. At the median estimates, $\lambda^{1/\alpha} \approx 2.25^{1/0.88} \approx 2.61$: a $50$–$50$ bet must gain at least about $2.6$ times what it puts at risk, if the reference point is current wealth and the bet is the only thing on the table. That is a theory of modest-stakes risk aversion that does not touch the agent’s curvature over lifetime wealth. It is also a theory of **rejection of small mixed bets**, which EU with a smooth $u$ can produce only by making $u$ extremely concave.

::: widget plot
f: if(x>=0, x^a, -l*(-x)^a)
sliders: a=0.88:0.5:1:0.02; l=2.25:1:4:0.05
x: -8, 8
y: -18, 8
labels: v(x)
vlines: 0
hlines: 0
caption: The Tversky–Kahneman value function [[#eq-value]] with $\beta = \alpha$. Start at $\alpha = 0.88$, $\lambda = 2.25$. Raise $\lambda$ and watch the loss side steepen; raise $\alpha$ toward $1$ and watch diminishing sensitivity fade. The kink at $0$ is loss aversion; the curvature on each side is diminishing sensitivity.
:::

::: example A mixed bet {#ex-mixed}
Using [[#eq-value]] with $\alpha = \beta = 0.88$ and $\lambda = 2.25$, evaluate $v(100)$, $v(-100)$ and $v(110)$. Does prospect theory, with equal $50$–$50$ decision weights on the two sides for a first pass, accept a $50$–$50$ gain $110$ / lose $100$ bet? What gain $g$ makes the $50$–$50$ bet against a loss of $100$ indifferent, still with equal weights?
::: solution
$v(100) = 100^{0.88} \approx 57.54$, $v(-100) = -2.25 \times 100^{0.88} \approx -129.47$, $v(110) \approx 62.58$. Equal-weight value of the bet: $0.5 \times 62.58 + 0.5 \times (-129.47) \approx -33.4 < 0$, so the bet is rejected. Indifference against a loss of $100$ requires $v(g) = -v(-100) = 129.47$, so $g^{0.88} = 129.47$, $g = 129.47^{1/0.88} \approx 261$. The ratio $g/\ell \approx 2.61$ matches $\lambda^{1/\alpha}$. (Cumulative probability weighting, below, changes the $50$–$50$ weights slightly and does not reverse the rejection.)
:::
:::

**The endowment effect** is loss aversion applied to a good the agent now holds. Let $v$ be defined over mugs, or over money, with the same $\lambda$. An agent who does not own a mug will pay up to $p$ satisfying $v(-p) + v(\text{mug as gain}) = 0$. An agent who owns the mug will sell only at $q$ satisfying $v(q) + v(\text{mug as loss}) = 0$. With a piecewise-linear $v$ the ratio $q/p$ equals $\lambda$. Kahneman, Knetsch and Thaler (1990) obtained WTA/WTP ratios in the region of $2$ for Cornell mugs, against a standard prediction of about $1$ when income effects are small. The experiment has been run many times. Plott and Zeiler (2005, 2007) argued that the gap shrinks or vanishes under a protocol that trains subjects on the Becker–DeGroot–Marschak mechanism and emphasises that the assignment is random. Isoni, Loomes and Sugden (2011) recovered a gap for *lotteries* under that protocol. List (2003) found that experienced sports-card dealers showed little endowment effect, while inexperienced traders showed a large one. The honest summary is the one in [[behavioural-economics/rationality-and-anomalies]]: a WTA–WTP gap is real for some goods and procedures, smaller with experience and with some training, and not an accounting identity from $\lambda = 2.25$.

::: proposition Endowment ratio under piecewise-linear $v$ {#prop-endowment}
Suppose money is evaluated linearly, a good is worth $u > 0$ as a gain and $-\lambda u$ as a loss, and income effects are zero. Then willingness to pay $p$ and willingness to accept $q$ satisfy $q/p = \lambda$. If loss aversion applies to money as well as to the good, the same arithmetic gives $q/p = \lambda^2$.
:::
::: proof
With linear money and loss aversion on the good only, a non-owner pays $p$ if $u - p \ge 0$, so $p = u$; an owner sells at $q$ if $q - \lambda u \ge 0$, so $q = \lambda u$. The ratio is $\lambda$. If money paid is itself a loss and money received a gain, a non-owner accepts the purchase when $u - \lambda p \ge 0$, so $p = u/\lambda$, and an owner accepts the sale when $q - \lambda u \ge 0$, so $q = \lambda u$. The ratio is $\lambda^2$. Which coding is right is an empirical hypothesis, not a theorem: the mug experiments of Kahneman, Knetsch and Thaler (1990) produced ratios in the region of $2$, closer to $\lambda$ than to $\lambda^2$ at $\lambda = 2.25$, which is one reason later work (Bateman, Munro, Rhodes, Starmer and Sugden 1997; Koszegi and Rabin 2006) treats the coding of money as part of the model to be tested.
:::

Status-quo bias is the same kink applied to a default bundle: moving away from the default creates a loss on the attributes given up and a gain on the attributes acquired, and $\lambda > 1$ tilts the comparison toward staying. Samuelson and Zeckhauser (1988) documented the tilt in survey choices; default effects in enrolment, in [[behavioural-economics/behavioural-policy]], are the field counterpart.

## Probability weighting

The second ingredient is a transformation of probabilities. People overweight small probabilities (which is why they buy both lottery tickets and disaster insurance) and underweight probabilities near one (which is why a sure $3\,000$ beats an $80\%$ chance of $4\,000$, while a $25\%$ chance of $3\,000$ loses to a $20\%$ chance of $4\,000$). Kahneman and Tversky (1979) wrote a weighting function $\pi(p)$ on individual probabilities. That specification can violate first-order stochastic dominance. Tversky and Kahneman (1992) recast the model in **rank-dependent** form, following Quiggin (1982): weights are attached to *cumulative* probabilities, and dominance is restored.

::: definition Cumulative prospect theory {#def-cpt}
Order the outcomes of a lottery $x_1 \le \cdots \le x_k \le r < x_{k+1} \le \cdots \le x_n$, with probabilities $p_i$. **Cumulative prospect theory (CPT)** evaluates the lottery as

$$
V = \sum_{i=1}^{k} \pi_i^{-}\, v(x_i - r) + \sum_{i=k+1}^{n} \pi_i^{+}\, v(x_i - r),
$$

where the **decision weights** are the increments of a weighting function $w^{-}$ on the loss tail and of $w^{+}$ on the gain tail. For the Tversky–Kahneman family,

$$
w(p) = \frac{p^{\gamma}}{\bigl(p^{\gamma} + (1-p)^{\gamma}\bigr)^{1/\gamma}},
$$ {#eq-weight}

with a separate $\gamma$ on each side. Their median estimates were $\gamma^{+} \approx 0.61$ and $\gamma^{-} \approx 0.69$. For a two-outcome mixed lottery, $\pi^{+} = w^{+}(p_{\mathrm{gain}})$ and $\pi^{-} = w^{-}(p_{\mathrm{loss}})$.
:::

The function [[#eq-weight]] is inverse-S shaped for $\gamma < 1$: it lies above the diagonal near $0$ (overweighting of small probabilities) and below the diagonal near $1$ (underweighting of large probabilities). At $\gamma = 1$ one recovers $w(p) = p$ and, with $\lambda = 1$ and $\alpha = \beta = 1$, expected value. Prelec (1998) proposed the alternative $w(p) = \exp\bigl(-(-\ln p)^{\alpha}\bigr)$, which has a similar shape and a cleaner axiomatics; both are used.

::: widget plot
f: x; x^g / (x^g + (1-x)^g)^(1/g)
sliders: g=0.61:0.4:1:0.01
x: 0, 1
y: 0, 1
labels: p; w(p)
caption: The Tversky–Kahneman weighting function [[#eq-weight]]. Start at $\gamma = 0.61$. The curve overweights small $p$ and underweights large $p$. Slide $\gamma$ to $1$ to recover the diagonal $w(p) = p$ of expected utility.
:::

At $\gamma = 0.61$, $w(0.01) \approx 0.055$, $w(0.10) \approx 0.186$, $w(0.50) \approx 0.421$, $w(0.90) \approx 0.712$. A one-in-a-hundred chance is treated as more than five in a hundred; a fifty-fifty is treated as about forty-two in a hundred. The second fact, combined with loss aversion, makes $50$–$50$ mixed bets even less attractive than the equal-weight calculation in [[#ex-mixed]] suggested: the gain is underweighted relative to the loss.

::: example Certainty and common ratio under CPT {#ex-cpt-ratio}
Using $v(\Delta) = \Delta^{0.88}$ on gains and $w$ with $\gamma = 0.61$, compare $V(3000 \text{ sure})$ with $V(4000 \text{ with } p = 0.80)$, and compare $V(3000 \text{ with } p = 0.25)$ with $V(4000 \text{ with } p = 0.20)$. Does CPT reproduce the certainty effect of the opening paragraph?
::: solution
$v(3000) = 3000^{0.88} \approx 1147.8$ and $v(4000) \approx 1478.5$. With one nonzero gain, the decision weight is $w(p)$. Then $V(3000, 1) = v(3000) \approx 1148$ because $w(1) = 1$, and $V(4000, 0.80) = w(0.80)\, v(4000) \approx 0.607 \times 1478.5 \approx 898$. The sure $3\,000$ wins. In the scaled pair, $V(3000, 0.25) = w(0.25)\, v(3000) \approx 0.291 \times 1147.8 \approx 334$ and $V(4000, 0.20) = w(0.20)\, v(4000) \approx 0.261 \times 1478.5 \approx 386$. The $20\%$ chance of $4\,000$ wins. CPT therefore reproduces the certainty effect: the underweighting of $0.80$ relative to $1$ is more severe than the underweighting of $0.20$ relative to $0.25$. Expected utility, with any $u$, cannot do both ([[#ex-common-ratio]]).
:::
:::

The **reflection effect** is diminishing sensitivity plus weighting, applied to losses. A sure loss of $3\,000$ is *rejected* in favour of an $80\%$ chance of losing $4\,000$: convex $v$ on losses plus underweighting of $0.80$ produces risk-seeking in the loss frame. The Asian-disease problem of Tversky and Kahneman (1981), already met in [[behavioural-economics/rationality-and-anomalies]], is the same mathematics with lives instead of money. The frame selects the reference point; the value function and the weights then do the rest.

::: example Insurance against a rare loss {#ex-insurance}
A one-in-a-hundred chance of losing $100$ has expected loss $1$. Using $v(\Delta) = -2.25(-\Delta)^{0.88}$ on losses and $w^{-}$ with $\gamma = 0.69$, compare $w^{-}(0.01)\, v(-100)$ with $v(-1)$. Does CPT prefer to pay $1$ for sure to avoid the $1\%$ loss of $100$, if that is the only comparison?
::: solution
$v(-100) \approx -129.47$ and $w^{-}(0.01) \approx 0.040$, so $w^{-}\, v(-100) \approx -5.14$. $v(-1) = -2.25$. Because $-2.25 > -5.14$, the sure payment of $1$ is better than the $1\%$ chance of losing $100$ under CPT: overweighting of the small probability, plus loss aversion, produces a demand for insurance at a price well above expected loss. Expected value is indifferent at a premium of $1$; a globally concave $u$ that rejected this insurance would, by Rabin (2000), reject large-stakes bets that nobody rejects. This is a model of a stylised agent, not a recommendation to buy insurance.
:::
:::

::: quiz
The Allais modal pair $A \succ B$ and $D \succ C$ is inconsistent with expected utility because
- [ ] people cannot compute probabilities
- [x] independence forbids ranking $A$ over $B$ and $D$ over $C$ together, whatever $u$ is
- [ ] $u$ is not concave enough
- [ ] the reference point is current wealth
::: solution
[[#prop-allais]] is an axiom violation, not a curvature violation. Some $u$ fit $A \succ B$ and some fit $D \succ C$; none fit both. Probability-computation errors and reference points are different models.
:::
:::

::: warning Decision weights are not beliefs
$w(p)$ is not a subjective probability. An agent can state that a chance is one in a hundred, and still choose as if the chance were five in a hundred. CPT is a theory of *choice*, not of judgement; the judgement chapter ([[behavioural-economics/judgement-under-uncertainty]]) is about the stated $p$, not about $w(p)$. Confusing the two leads to the mistaken claim that prospect theory says people cannot read a probability, and to the opposite claim that a well-calibrated probability forecast immunises a person against the certainty effect. Neither follows.
:::

## The reference point

The value function is defined on gains and losses, so everything depends on $r$. Kahneman and Tversky treated $r$ as the status quo, or as the payoff the agent was asked to view as zero. That is enough for classroom lotteries. It is not enough for a worker whose wage is compared with last year’s wage, a shareholder whose shares are compared with the purchase price, or a consumer whose next purchase is compared with the price she expected to pay.

Koszegi and Rabin (2006) proposed that $r$ is **rational expectations**: the reference point is the distribution of outcomes the agent expected, and the agent’s behaviour has to be consistent with those expectations. A shopper who expected to buy at $10$ experiences a $12$ price as a loss; a shopper who expected $12$ does not. The same $12$ produces two different $v$’s, and the expectation is an equilibrium of the model, not an extra parameter. Koszegi–Rabin preferences nest prospect theory’s consumption utility plus a gain–loss utility applied to the difference between realised and expected consumption. They have been used for labour supply, insurance, and the timing of purchases. They also make a sharp, distinctive prediction: an agent who expected to take a $50$–$50$ mixed bet may take it (to avoid the loss of disappointing herself), while an agent who expected to reject it will reject it. Endowment effects become expectations effects.

The Koszegi–Rabin apparatus is more than this course needs to compute by hand, but the lesson is mandatory: **a reference point is a hypothesis**. Treating $r$ as whatever rationalises the last choice makes prospect theory unfalsifiable. Treating $r$ as the status quo, the expected price, or a previously announced target, and then asking the model to predict a *new* choice, is a test.

::: remark Narrow framing
A related hypothesis, **narrow framing** (Kahneman and Lovallo 1993; Barberis, Huang and Thaler 2006), is that people evaluate a bet, a project or a day’s trading in isolation rather than mixing it with the rest of their wealth. Loss aversion applied narrowly rejects mixed bets that would be accepted if they were merged with existing risk. EU on total wealth, by contrast, barely notices a $\$100$ bet. Narrow framing plus [[#eq-value]] is Rabin’s way out of the calibration theorem: the curvature that is visible on modest stakes is the kink at $r$, applied to the framed bet, not the concavity of $u$ on lifetime consumption. This is a modelling claim about how prospects are edited, not a recommendation about how anyone should frame their own money.
:::

## Evidence

**Choice under risk.** Tversky and Kahneman (1992) fitted [[#eq-value]] and [[#eq-weight]] to median certainty equivalents of a stated set of lotteries. Subsequent parametric work (Gonzalez and Wu 1999; Booij, van Praag and van de Kuilen 2010; many others) finds $\lambda$ typically between $1.5$ and $2.5$, $\alpha$ between $0.6$ and $0.9$, and a weighting function that is inverse-S shaped, with substantial heterogeneity. The qualitative pattern — risk aversion on mixed and on high-probability gains, risk seeking on high-probability losses and on low-probability gains — is the most replicated finding in this course.

**Insurance and lotteries.** Overweighting of small probabilities, combined with loss aversion, produces the joint demand for lottery tickets (a long-shot gain) and for insurance against modest losses, which EU with a globally concave $u$ cannot produce without ruining large-stakes behaviour (the Rabin point). Field evidence on insurance deductibles and on the demand for extended warranties is consistent with that qualitative picture, with the usual caveat that market prices also reflect loading and selection.

**The endowment effect.** Covered above. A fair reading of Plott–Zeiler, Isoni–Loomes–Sugden, List, and Ericson and Fuster’s (2014) review is that a WTA–WTP gap is not an experimental artefact *in general*, is sensitive to procedure and experience, and is larger for consumption goods and for lottery tickets than for tokens of known cash value.

**Failures and limits.** CPT does not, by itself, deliver a theory of *when* the reference point updates. It is a static model of a single choice. It is not a good model of choices that are dominated once they are written as wealth, which is why Tversky and Kahneman imposed an editing phase in 1979 and moved to rank-dependent weights in 1992. It over-predicts the rejection of mixed bets in some professional populations (List’s dealers; some traders) and under-predicts the demand for skewness in others. Parameter estimates from one domain (laboratory lotteries) do not always travel to another (insurance, labour supply) without re-fitting $\lambda$ and $\gamma$. That is a limitation of the functional form, not a reason to return to a globally concave $u$ on wealth.

::: history
Bernoulli (1738) had already argued that people value money by a concave $u$ on wealth; von Neumann and Morgenstern (1944) gave the axiomatic EU theory; Allais (1953) produced the paradox that independence cannot survive. Kahneman and Tversky’s 1979 *Econometrica* paper, and Tversky and Kahneman’s 1992 recasting, are the two canonical sources for this chapter. Quiggin (1982) introduced rank-dependent utility, which CPT borrows. Koszegi and Rabin (2006) is the leading economic model of an endogenous reference point; Rabin (2000) is the calibration theorem. Kahneman received the 2002 Nobel Prize; Tversky had died in 1996 and could not share it.
:::

## Where this leads

Reference dependence is not only about lotteries. Present bias ([[behavioural-economics/present-bias]]) is a different departure — about time, not about gains and losses — but the two interact whenever a loss is dated (the cost of going to the gym today, the premium paid now). Social preferences ([[behavioural-economics/social-preferences]]) sometimes use a reference point that is another person’s payoff. Limited attention and mental accounting ([[behavioural-economics/limited-attention]]) are, in part, theories of which frame, and which $r$, get selected. Behavioural policy ([[behavioural-economics/behavioural-policy]]) uses loss aversion to design defaults and disclosures; whether that is a welfare improvement is a separate question, taken up there. The EU model of [[microeconomics/uncertainty]] remains the right benchmark, and the right model when $\lambda = 1$, $w(p) = p$, and $r$ is idle.

::: summary
- EU ([[#def-eu]]) cannot fit the Allais (common-consequence or common-ratio) pattern, because independence forbids it ([[#prop-allais]]).
- Prospect theory evaluates outcomes as gains and losses relative to a reference point, with a kinked value function ([[#def-value]], [[#eq-value]]) and a weighting function ([[#def-cpt]], [[#eq-weight]]).
- Loss aversion ($\lambda \approx 2$) produces rejection of modest mixed bets, the endowment effect ([[#prop-endowment]]) and status-quo bias. Diminishing sensitivity plus weighting produces the fourfold pattern of risk attitudes and the certainty effect.
- Decision weights are not beliefs. The reference point is a hypothesis; Koszegi and Rabin (2006) make it an equilibrium expectation.
- The endowment-effect protocol is contested (Plott and Zeiler; Isoni, Loomes and Sugden; List). The qualitative pattern of choice under risk is not.
- EU on wealth cannot be the model of modest-stakes risk aversion (Rabin 2000). CPT is one model that can; it is not the only one, and its parameters do not always travel.
:::

## Exercises

::: exercise Allais in numbers {level=1}
Using $u(x) = \sqrt{x}$ with prizes $1$ and $5$ (and $u(0) = 0$), compute EU of $A$, $B$, $C$ and $D$ in the Allais pair of this chapter. Which of $A$ versus $B$ and $C$ versus $D$ does this $u$ predict, and why can no $u$ predict the modal pair $A \succ B$, $D \succ C$?
::: solution
$\mathrm{EU}(A) = 1$, $\mathrm{EU}(B) = 0.89 \cdot 1 + 0.10 \cdot \sqrt{5} \approx 0.89 + 0.224 = 1.114$, so $B \succ A$. $\mathrm{EU}(C) = 0.11$, $\mathrm{EU}(D) = 0.10 \cdot \sqrt{5} \approx 0.224$, so $D \succ C$. This $u$ fits the second ranking and misses the first. Any EU ranking of $A$ against $B$ is, by [[#prop-allais]], the same as the ranking of $C$ against $D$; the modal pair disagrees across the two problems, so no $u$ fits both.
:::
:::

::: exercise Value at the kink {level=1 check="57.54"}
With $\alpha = 0.88$, enter $v(100) = 100^{0.88}$ to two decimal places.
::: solution
$100^{0.88} \approx 57.54$.
:::
:::

::: exercise Loss aversion ratio {level=1 check="2.25"}
With $\alpha = \beta$ and [[#eq-value]], what is $\bigl\lvert v(-x)/v(x) \bigr\rvert$ for any $x > 0$? Enter the Tversky–Kahneman median $\lambda$.
::: solution
$\lvert v(-x)/v(x) \rvert = \lambda$, here $2.25$, independent of $x$ when $\alpha = \beta$.
:::
:::

::: exercise Mixed-bet hurdle {level=2 check="2.61"}
With $\alpha = \beta = 0.88$ and $\lambda = 2.25$, a $50$–$50$ gain $g$ / loss $100$ is indifferent (equal weights) when $g/100 = \lambda^{1/\alpha}$. Enter that ratio to two decimal places.
::: solution
$2.25^{1/0.88} \approx 2.61$.
:::
:::

::: exercise Weighting at one per cent {level=2}
Using [[#eq-weight]] with $\gamma = 0.61$, compute $w(0.01)$ and compare it with $0.01$. What does the comparison say about the demand for a one-in-a-hundred lottery, relative to expected value, if $v$ is approximately linear on that gain?
::: hint
$w(p) = p^{\gamma} / \bigl(p^{\gamma} + (1-p)^{\gamma}\bigr)^{1/\gamma}$.
:::
::: solution
$0.01^{0.61} \approx 0.0603$, $(0.99)^{0.61} \approx 0.994$, sum of those $\approx 1.054$, raised to $1/0.61 \approx 1.090$; $w(0.01) \approx 0.0603/1.090 \approx 0.055$ (more precisely $0.0553$). The one-in-a-hundred chance is weighted about five and a half times its probability. A roughly linear $v$ then values the lottery at about $5.5$ times its expected value, which is a theory of long-shot demand — and, on the loss side with $w^{-}$, of insurance against rare losses. It is not a recommendation to buy either.
:::
:::

::: exercise Endowment arithmetic {level=2}
A mug is worth $u = 4$ as a gain. Money is linear, loss aversion applies only to the mug, and $\lambda = 2$. What are WTP and WTA? If loss aversion applies to money as well, what are they? Which pair is closer to a WTA/WTP ratio of $2$?
::: solution
Good-only: WTP $= 4$, WTA $= 8$, ratio $2$. Both-sides: WTP $= 4/2 = 2$, WTA $= 8$, ratio $4 = \lambda^2$. The observed ratios near $2$ in the mug experiments sit closer to the first coding ([[#prop-endowment]]).
:::
:::

::: exercise Reflection {level=3}
Using $v$ with $\alpha = \beta = 0.88$, $\lambda = 2.25$ and $w$ with $\gamma^{+} = \gamma^{-} = 0.61$, compare a sure loss of $3000$ with an $80\%$ chance of losing $4000$ (else $0$). Which does CPT pick? Contrast with the gain-side comparison in [[#ex-cpt-ratio]].
::: hint
On the loss side the decision weight on $-4000$ is $w^{-}(0.80)$, and $v(-x) = -\lambda x^{0.88}$.
:::
::: solution
$v(-3000) = -2.25 \times 3000^{0.88} \approx -2.25 \times 1147.8 \approx -2583$. $v(-4000) \approx -2.25 \times 1478.5 \approx -3327$. $w(0.80) \approx 0.607$, so $V(\text{risky loss}) \approx 0.607 \times (-3327) \approx -2020$, which is *greater* than $-2583$. CPT therefore prefers the risky loss to the sure loss: risk-seeking on the loss side. On the gain side, [[#ex-cpt-ratio]] preferred the sure gain. That pair of rankings is the reflection effect. EU with concave $u$ would reject risk on both sides.
:::
:::

::: exercise Koszegi–Rabin in a sentence {level=3}
A shopper will face price $10$ or $12$ with equal probability, and can commit in advance to a purchase plan (buy at $10$ only, buy at both prices, or buy at neither). In the Koszegi–Rabin sense, the reference point is that plan’s implied distribution of outcomes. Explain, without computing, why “buy only at $10$” can be an equilibrium plan even if, once $12$ is realised and the plan was “buy at both”, she would still buy at $12$. What would you need to know to decide which plans are equilibria?
::: hint
An equilibrium plan is one the shopper is willing to follow when the reference point is the plan itself. Surprise losses are evaluated against a reference that did not include them.
:::
::: solution
If the plan is “buy at both prices”, the expected price is $11$ and paying $12$ is a small loss relative to that expectation; she may still buy. If the plan is “buy only at $10$”, then at a price of $12$ she expected *not* to have the good and not to pay; buying would be a loss of $12$ against a reference of $0$ paid, which loss aversion can deter, while not buying realises the plan and produces no surprise. So “buy only at $10$” can be consistent with itself even though a different plan would have led her to buy at $12$. To decide which plans are equilibria one needs $u$, $\lambda$, and the gain–loss weights in Koszegi–Rabin utility, and then to check, for each candidate plan, whether following it is optimal given that it is expected. That is a fixed-point condition, not a comparison of two numbers against a status-quo $r$.
:::
:::

::: exercise Rabin in one calculation {level=2}
An EU maximiser with $u(w) = \ln w$ and current wealth $10\,000$ is offered a $50$–$50$ lose $100$ / gain $110$ bet. Does she accept? Comment on Rabin’s point in light of your answer.
::: solution
She accepts if $0.5 \ln(9900) + 0.5 \ln(10110) \ge \ln(10000)$, i.e. if $\sqrt{9900 \times 10110} \ge 10000$. The product is $100\,089\,000$, whose square root is about $10\,004.4 > 10\,000$. She accepts, barely. Log utility at this wealth is almost risk-neutral on a $\$100$ scale, which is Rabin’s point run in reverse: the concavity that *would* reject the bet at every wealth is far more severe than log, and that severe concavity, applied globally, refuses large-stakes bets that everyone would take. Modest-stakes rejections need a local kink, not a global $u$.
:::
:::
