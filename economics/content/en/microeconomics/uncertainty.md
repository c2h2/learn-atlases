A farmer's harvest depends on rain; a household's wealth depends on whether a fire occurs; a worker's income depends on whether she keeps her job. In each case the objects of choice are not sure bundles but **lotteries**: lists of outcomes with probabilities. The theory of this chapter — **expected utility**, axiomatised by John von Neumann and Oskar Morgenstern in 1944 — is how intermediate microeconomics handles those lists. It delivers a utility function over wealth whose *curvature* now has meaning: concavity is **risk aversion**, and a single derivative ratio, the **Arrow–Pratt coefficient**, ranks it.

The apparatus is the UMP of [[microeconomics/consumer-choice]] with a different interpretation of the goods: state-contingent consumption, prices equal to probabilities (or to state-claim prices, once markets are introduced). Nothing in the chapter is a recommendation to buy or decline insurance, to gamble, or to hold any asset. Examples use illustrative wealth levels and fictional premia; they are not a forecast and not financial advice.

## Lotteries and expected utility

::: definition Lottery {#def-lottery}
A (simple) **lottery** over a finite set of outcomes $w_1, \dots, w_S$ is a probability vector $\pi = (\pi_1, \dots, \pi_S)$ with $\pi_s \ge 0$ and $\sum_s \pi_s = 1$. Outcome $w_s$ occurs with probability $\pi_s$. A **compound lottery** is a lottery whose prizes are themselves lotteries. Two lotteries are identified if they induce the same distribution over final outcomes (reduction of compound lotteries).
:::

Outcomes will be wealth levels, measured in units of a numeraire consumption good. Preferences $\succsim$ now rank lotteries, not sure bundles. Completeness and transitivity are imposed as before. The extra structure is the **independence axiom**: if $F \succsim G$, then for any lottery $H$ and any $\alpha \in (0,1]$, the mixture $\alpha F + (1-\alpha)H$ is ranked at least as high as $\alpha G + (1-\alpha)H$. Independence says that a common continuation $H$ does not reverse the ranking of $F$ and $G$. It is powerful, convenient, and the axiom most often violated in experiments (the Allais paradox, below).

::: theorem von Neumann–Morgenstern expected utility {#thm-vnm}
A preference relation on lotteries over a finite set of outcomes satisfies completeness, transitivity, independence and a continuity (Archimedean) axiom if and only if there exists a function $u$ on outcomes, unique up to positive affine transformations $a u + b$ with $a > 0$, such that

$$
F \succsim G \quad\iff\quad \sum_s \pi_s^F u(w_s) \ge \sum_s \pi_s^G u(w_s).
$$ {#eq-eu}

The number $\E_F[u(w)]$ is the **expected utility** of $F$. The function $u$ is a **Bernoulli utility** (or vNM utility) over wealth.
:::

The proof is in Mas-Colell, Whinston and Green, Proposition 6.B.2; we will use the result. Two comments on uniqueness. First, $u$ is **cardinal** in a precise sense: affine transformations preserve the ranking of lotteries, but strictly increasing transformations that are not affine generally do not. That is the difference from [[microeconomics/preferences-and-utility#thm-ordinal]]. Second, expected utility is a *representation* of preferences over lotteries, not a claim that the consumer computes means in her head. Alternative representations (rank-dependent utility, prospect theory) drop independence and fit some experiments better; they are the subject of [[behavioural-economics]].

::: example A two-outcome lottery {#ex-two-outcome}
Wealth is 100 with probability $0.8$ and 50 with probability $0.2$ (a 50-unit loss with chance one in five). Compute expected wealth, and expected utility for $u(w) = \ln w$ and for $u(w) = \sqrt{w}$.
::: solution
Expected wealth: $\E[w] = 0.8\cdot 100 + 0.2\cdot 50 = 90$.

Log: $\E[u] = 0.8\ln 100 + 0.2\ln 50 = 0.8\cdot 4.605170 + 0.2\cdot 3.912023 = 4.466541$.

Square root: $\E[u] = 0.8\cdot 10 + 0.2\cdot\sqrt{50} = 8 + 0.2\cdot 7.071068 = 9.414214$.
:::
:::

::: widget plot
f: log(x); 2*sqrt(x)-6; 0.05*(x-1)
x: 1, 20
y: 0, 6
labels: \ln w; 2\sqrt{w}-6; \text{linear (risk-neutral)}
caption: Three Bernoulli utilities over wealth, vertically shifted and scaled so they can be drawn together (affine transformations do not change rankings). The log and the square root are strictly concave — risk averse. The linear function is risk neutral. Pick two wealth levels, join them by a chord, and compare the chord to the graph: Jensen's inequality says the chord lies below a concave $u$, which is exactly $\E[u(w)] < u(\E[w])$.
:::

## Risk aversion

::: definition Risk aversion {#def-risk-aversion}
The consumer is (strictly) **risk averse** if she always prefers the expected value of a lottery to the lottery itself: $\delta_{\E[w]} \succsim F$ for every $F$, strictly whenever $F$ is non-degenerate. She is **risk neutral** if she is indifferent, and **risk loving** if she prefers the lottery.
:::

::: proposition Jensen and concavity {#prop-jensen}
The consumer is risk averse if and only if $u$ is concave, and strictly risk averse if and only if $u$ is strictly concave. Equivalently, $\E[u(w)] \le u(\E[w])$ for every lottery, which is Jensen's inequality.
:::

::: proof
Risk aversion says that for every pair $w_1, w_2$ and every $\pi$, $\pi u(w_1) + (1-\pi)u(w_2) \le u(\pi w_1 + (1-\pi)w_2)$, which is concavity of $u$. The converse is Jensen's inequality for a random variable taking finitely many values. Strictness follows from strict concavity.
:::

Concavity of $u$ over wealth is a statement about *preferences over lotteries*, not about diminishing marginal utility of a sure bundle. The two ideas were historically entangled (Bernoulli's 1738 St Petersburg essay already used a concave $u$ to resolve an infinite expected-value paradox), but they are conceptually distinct: ordinal $u$ over sure bundles can be replaced by any increasing $f(u)$, which would destroy concavity, whereas vNM $u$ cannot.

::: definition Certainty equivalent and risk premium {#def-ce}
The **certainty equivalent** $\mathrm{CE}(F)$ of a lottery $F$ is the sure wealth that is indifferent to $F$: $u(\mathrm{CE}(F)) = \E_F[u(w)]$. The **risk premium** is $\Pi(F) = \E[w] - \mathrm{CE}(F)$. A risk-averse consumer has $\mathrm{CE}(F) \le \E[w]$ and $\Pi(F) \ge 0$.
:::

::: example Certainty equivalents {#ex-ce}
For the lottery of [[#ex-two-outcome]], compute CE and $\Pi$ when $u = \ln w$ and when $u = \sqrt{w}$.
::: solution
Log: $u(\mathrm{CE}) = 4.466541$, so $\mathrm{CE} = e^{4.466541} \approx 87.055$. Risk premium $\Pi = 90 - 87.055 = 2.945$.

Square root: $\sqrt{\mathrm{CE}} = 9.414214$, so $\mathrm{CE} \approx 88.627$. Risk premium $\Pi = 90 - 88.627 = 1.373$.

Log is more risk averse than square root on this lottery: it attaches a larger premium and a lower certainty equivalent. The next section ranks them systematically.
:::
:::

## The Arrow–Pratt coefficient

::: definition Arrow–Pratt coefficients {#def-arrow-pratt}
For a twice differentiable $u$ with $u' > 0$, the **Arrow–Pratt coefficient of absolute risk aversion** at wealth $w$ is

$$
r_A(w) = -\frac{u''(w)}{u'(w)},
$$ {#eq-ra}

and the **coefficient of relative risk aversion** is $r_R(w) = w\, r_A(w) = -w u''(w)/u'(w)$.
:::

The sign of $r_A$ is the sign of risk aversion: $r_A > 0$ iff $u$ is strictly concave. The magnitude ranks consumers.

::: theorem Pratt's theorem {#thm-pratt}
For two twice differentiable Bernoulli utilities $u$ and $v$, with $u' > 0$ and $v' > 0$, the following are equivalent:

1. $r_A^u(w) \ge r_A^v(w)$ for all $w$;
2. $u = \psi \circ v$ for a strictly increasing concave $\psi$;
3. the risk premium (and the certainty equivalent) of every lottery is at least as large (at least as small) under $u$ as under $v$, at every wealth.

In that case $u$ is **more risk averse** than $v$ in the Arrow–Pratt sense.
:::

The proof (Pratt 1964) is a Taylor expansion for small risks plus a global comparison via $\psi$. For a small risk $\tilde\varepsilon$ with $\E[\tilde\varepsilon] = 0$ and variance $\sigma^2$, Pratt's approximation is $\Pi \approx \tfrac12 \sigma^2 r_A(w)$, which is why $r_A$ is the right local measure: the premium is proportional to variance and to $r_A$.

Standard families:

- $u = \ln w$: $r_A = 1/w$, $r_R = 1$. Decreasing absolute risk aversion (DARA); constant relative risk aversion (CRRA) of 1.
- $u = w^{1-\gamma}/(1-\gamma)$ for $\gamma > 0$, $\gamma \neq 1$: $r_R = \gamma$, $r_A = \gamma/w$. CRRA; log is the $\gamma \to 1$ limit.
- $u = -e^{-\alpha w}$: $r_A = \alpha$, $r_R = \alpha w$. Constant absolute risk aversion (CARA).
- $u = \sqrt{w}$: $\gamma = 1/2$, $r_A = 1/(2w)$, $r_R = 1/2$. Less risk averse than log.

::: example Ranking log and square root {#ex-pratt-rank}
Compute $r_A$ for $u = \ln w$ and $u = \sqrt{w}$ at $w = 90$. Compare with the premia in [[#ex-ce]] and with Pratt's small-risk approximation, using $\mathrm{Var}(w) = 400$ for the lottery of [[#ex-two-outcome]].
::: solution
Log: $u' = 1/w$, $u'' = -1/w^2$, $r_A = 1/w = 1/90 \approx 0.01111$. Square root: $u' = 1/(2\sqrt{w})$, $u'' = -1/(4 w^{3/2})$, $r_A = 1/(2w) = 1/180 \approx 0.00556$. Log is more risk averse at every $w$.

Pratt approximation: $\Pi \approx \tfrac12 \cdot 400 \cdot r_A(90) = 200 r_A$. Log: $200/90 \approx 2.222$ versus actual $2.945$. Square root: $200/180 \approx 1.111$ versus actual $1.373$. The approximation understates because the risk is not small (a 50-unit loss on a mean of 90 is a large discrete jump). The ranking is the one Pratt's theorem predicts.
:::
:::

::: warning Curvature of an ordinal $u$ is meaningless
A homework script that computes $-u''/u'$ for the Cobb–Douglas $u = x_1^a x_2^{1-a}$ of the consumer chapters, and calls the result "risk aversion", is mixing two theories. That $u$ is ordinal; an increasing rewrite would change $u''$. The Arrow–Pratt coefficient is defined on a *Bernoulli* utility, unique up to affine transformations (which cancel in the ratio $-u''/u'$). Use it only on $u$ over wealth or over lotteries, in this chapter's sense.
:::

::: quiz
Two consumers have $u_A = \ln w$ and $u_B = \sqrt{w}$. Which statement is correct?
- [ ] B is more risk averse because $\sqrt{w}$ is steeper at low $w$
- [x] A is more risk averse in the Arrow–Pratt sense: $r_A^{\ln}(w) = 1/w > 1/(2w) = r_A^{\sqrt{}}$
- [ ] They cannot be compared, because $u$ is ordinal
- [ ] Both are risk neutral, because both are increasing
::: solution
[[#thm-pratt]] ranks them by $r_A$. Log has twice the absolute risk aversion of square root at every $w$, matching the larger premium in [[#ex-ce]]. Steepness of $u$ is not the criterion (and can be rescaled by the affine $a$). These $u$ are Bernoulli, not ordinal representations of sure-bundle preferences. Increasingness is monotonicity, not risk neutrality; risk neutrality is linearity of $u$.
:::
:::

## Demand for insurance

A consumer with wealth $w$ faces a loss $L$ with probability $\pi$, and can buy coverage $I \in [0, L]$ at premium $q = p I$ per unit of coverage (a unit of indemnity pays 1 if the loss occurs). Final wealth is $w - pI$ if no loss and $w - L - pI + I$ if loss. Expected utility is

$$
(1-\pi)\, u(w - p I) + \pi\, u(w - L + (1-p)I).
$$ {#eq-ins-eu}

::: proposition Mossin's theorem {#prop-mossin}
If $u$ is strictly concave and the premium is **fair**, $p = \pi$, the unique optimum is full coverage $I = L$. If the premium is unfair, $p > \pi$, a risk-averse consumer chooses partial coverage $I < L$ (and $I > 0$ if $p$ is not too far above $\pi$ and $r_A$ is not too small).
:::

::: proof
Differentiate [[#eq-ins-eu]] with respect to $I$:

$$
-(1-\pi) p\, u'(w_{\text{no}}) + \pi(1-p)\, u'(w_{\text{loss}}).
$$

At a fair $p = \pi$ this equals $\pi(1-\pi)\bigl(u'(w_{\text{loss}}) - u'(w_{\text{no}})\bigr)$, which is zero if and only if $w_{\text{loss}} = w_{\text{no}}$ (because $u'$ is strictly decreasing), i.e. $I = L$. The second derivative is negative by concavity. If $p > \pi$, the same derivative at $I = L$ (where $w_{\text{loss}} = w_{\text{no}}$) equals $u'(w-pL)\,(\pi - p) < 0$, so the consumer wants to cut $I$ below $L$.
:::

Fair full insurance equalises wealth across states, which a risk-averse consumer wants. An unfair loading is a reason to retain some risk. Moral hazard and adverse selection — the consumer's hidden action or hidden type — are further reasons, taught in [[information-economics/asymmetric-information]]; they are not needed for Mossin's result.

::: example Fair and unfair insurance {#ex-insurance}
Wealth $w = 100$, loss $L = 50$ with $\pi = 0.2$, $u = \ln w$. (a) Show that fair full insurance beats no insurance, using the numbers of [[#ex-ce]]. (b) At a loading $p = 0.25$, check whether a small amount of cover raises expected utility from the no-insurance point.
::: solution
(a) Fair premium for full cover: $q = 0.2\cdot 50 = 10$. Sure wealth $90$, $u = \ln 90 \approx 4.49981$. No insurance: $\E[u] \approx 4.46654$ from [[#ex-two-outcome]]. Full fair insurance wins, as [[#prop-mossin]] requires. The gain in utility is about $0.033$; in money, the consumer would pay up to the risk premium $2.945$ *above* the fair 10 to avoid the risk, i.e. up to $12.945$ for full cover.

(b) At $I = 0$, the derivative of expected utility with respect to $I$ is $-(1-\pi)p u'(w) + \pi(1-p)u'(w-L) = -0.8\cdot 0.25\cdot(1/100) + 0.2\cdot 0.75\cdot(1/50) = -0.002 + 0.003 = 0.001 > 0$. A little cover still helps. (The optimum is interior, $0 < I < 50$; finding it requires solving $(1-\pi)p / w_{\text{no}} = \pi(1-p)/w_{\text{loss}}$, a linear equation in $I$.)
:::
:::

The numbers in [[#ex-insurance]] are a classroom illustration. Real premia include loading for administrative cost and capital, and real contracts have deductibles and copayments for reasons Mossin's one-risk model does not contain. Treating the calculation as a shopping instruction would be a mistake the atlas is written to avoid.

## State claims, diversification and Allais

Two further ideas close the chapter.

**State-contingent consumption.** If a complete set of Arrow securities pays 1 in a single state, the consumer of [[microeconomics/consumer-choice]] buys a bundle $(c_1, \dots, c_S)$ at prices equal (in a risk-neutral world) to probabilities, or more generally at state prices $q_s$. Risk aversion makes indifference curves in the state-claim diagram convex to the origin; fair insurance is the $45^\circ$ line of equal consumption across states. Complete markets plus expected utility are the foundation of [[asset-pricing]].

**Diversification.** Two independent risks, each with a positive risk premium, have a combined premium smaller than the sum of the premia when $u$ is concave (Rothschild and Stiglitz 1970, in the language of mean-preserving spreads). That is the insurance value of not putting all the harvest in one field. It is a property of concave $u$ and imperfectly correlated risks, not a recommendation of any particular portfolio.

**The Allais paradox.** Maurice Allais (1953) offered a pair of choices, of which a typical version is: $A$: 1 million for sure versus $B$: 0.89 chance of 1 million, 0.10 chance of 5 million, 0.01 chance of 0; and $C$: 0.11 chance of 1 million versus $D$: 0.10 chance of 5 million. Independence requires $A \succ B$ if and only if $C \succ D$. Many subjects choose $A$ and $D$. Expected utility cannot rationalise that pair. The finding is robust and is one reason independence is treated as a useful axiom rather than a psychological law. Kahneman and Tversky's prospect theory (1979) was built in part to accommodate Allais; it is discussed in [[behavioural-economics]].

::: history
**1738, Daniel Bernoulli.** *Specimen theoriae novae de mensura sortis* (St Petersburg) proposed that people maximise expected *log* wealth, resolving a game of infinite expected value. The essay is the ancestor of concave $u$, not yet of the axiomatic theory.

**1944, John von Neumann and Oskar Morgenstern.** *Theory of Games and Economic Behavior*, appendix, axiomatised expected utility. The uniqueness-up-to-affine-transformations result is theirs.

**1953, Maurice Allais.** *Le comportement de l'homme rationnel devant le risque* presented the paradox that still bears his name.

**1964, John Pratt.** *Risk aversion in the small and in the large* defined $r_A$ and proved [[#thm-pratt]]. Kenneth Arrow's essays of the same period introduced the same coefficient and the DARA hypothesis.

**1968, Jan Mossin.** *Aspects of rational insurance purchasing* proved full cover at a fair premium and partial cover at an unfair one.
:::

## Where this leads

Expected utility is the default risk module of the atlas. Asset pricing replaces probabilities with state prices and a stochastic discount factor ([[asset-pricing]]); information economics adds hidden types and hidden actions ([[information-economics/asymmetric-information]]); public economics uses concave $u$ to motivate social insurance ([[public-economics/social-insurance]]). General equilibrium with uncertainty is an Edgeworth box of state claims ([[microeconomics/general-equilibrium]]). When independence is too strong, behavioural economics takes over. For the firm side of this course, risk will stay off-stage: production and cost in the next chapter are certain.

::: summary
- A lottery is a distribution over outcomes. Expected utility $\E[u(w)]$ represents preferences that satisfy completeness, transitivity, independence and continuity; $u$ is unique up to positive affine transformations.
- Risk aversion is concavity of $u$ (Jensen). The certainty equivalent satisfies $u(\mathrm{CE}) = \E[u]$, and the risk premium is $\E[w]-\mathrm{CE} \ge 0$.
- Arrow–Pratt $r_A = -u''/u'$ ranks risk aversion. Pratt's theorem: higher $r_A$ everywhere iff a larger premium on every lottery. For small risks, $\Pi \approx \tfrac12 \sigma^2 r_A$.
- Mossin: full insurance at a fair premium; partial insurance at an unfair premium. Illustrative, not advice.
- Independence is the axiom Allais's choices violate. It remains the workhorse; it is not a fact about every laboratory subject.
:::

## Exercises

::: exercise Expected wealth {level=1 check="90"}
A loss of 50 hits with probability $0.2$ on wealth 100. What is expected wealth? (Enter $\E[w]$.)
::: solution
$0.8\cdot 100 + 0.2\cdot 50 = 90$.
:::
:::

::: exercise A log certainty equivalent {level=1}
For $u = \ln w$ and the same lottery, $\E[u] \approx 4.46654$. Show that $\mathrm{CE} \approx 87.06$ and $\Pi \approx 2.94$.
::: solution
$\mathrm{CE} = e^{4.46654} \approx 87.06$, and $\Pi = 90 - 87.06 \approx 2.94$.
:::
:::

::: exercise Relative risk aversion {level=1 check="2"}
For $u(w) = -1/w$ (which is CRRA), compute $r_R(w)$. (Enter the coefficient.)
::: solution
$u' = 1/w^2$, $u'' = -2/w^3$, so $r_A = 2/w$ and $r_R = w r_A = 2$.
:::
:::

::: exercise Fair full insurance {level=2}
Wealth 200, loss 80 with probability $0.1$, $u = \ln w$. Compute expected utility with no insurance and with fair full insurance. Which is larger?
::: solution
No insurance: $0.9\ln 200 + 0.1\ln 120 \approx 0.9\cdot 5.2983 + 0.1\cdot 4.7875 = 5.2472$. Fair full insurance: premium $8$, sure wealth $192$, $\ln 192 \approx 5.2575$. Full insurance wins, by about $0.010$.
:::
:::

::: exercise Pratt's approximation {level=2}
A consumer with $r_A(w) = 0.02$ faces a small risk of variance $25$. Approximate the risk premium.
::: solution
$\Pi \approx \tfrac12 \sigma^2 r_A = \tfrac12 \cdot 25 \cdot 0.02 = 0.25$.
:::
:::

::: exercise CARA and a fair gamble {level=2}
Let $u(w) = -e^{-\alpha w}$ with $\alpha = 0.01$, current wealth $100$. A fair coin toss adds or subtracts $10$. Compute $\E[u]$ and the certainty equivalent.
::: hint
$\E[u] = -\tfrac12\bigl(e^{-\alpha(110)} + e^{-\alpha(90)}\bigr)$. Then $\mathrm{CE} = -\frac1\alpha \ln\bigl(-\E[u]\bigr)$.
:::
::: solution
$e^{-1.1} \approx 0.33287$, $e^{-0.9} \approx 0.40657$, so $-\E[u] = 0.36972$ and $\E[u] \approx -0.36972$. Then $\mathrm{CE} = -100\ln(0.36972) \approx 99.50$. Expected wealth is $100$; the premium is about $0.50$. Pratt: $\tfrac12 \cdot 100 \cdot 0.01 = 0.50$, here essentially exact because CARA plus a symmetric two-point risk is a favourable case for the approximation.
:::
:::

::: exercise Mossin's unfair first-order condition {level=3}
For $u = \ln w$, $w = 100$, $L = 50$, $\pi = 0.2$, $p = 0.25$, write the first-order condition for $I$ and solve for $I$.
::: hint
$(1-\pi)p / (w - pI) = \pi(1-p)/(w - L + (1-p)I)$.
:::
::: solution
$0.8\cdot 0.25 / (100 - 0.25 I) = 0.2\cdot 0.75 / (50 + 0.75 I)$, so $0.2 / (100 - 0.25 I) = 0.15 / (50 + 0.75 I)$. Cross-multiply: $0.2(50 + 0.75 I) = 0.15(100 - 0.25 I)$, so $10 + 0.15 I = 15 - 0.0375 I$, hence $0.1875 I = 5$ and $I = 5/0.1875 = 80/3 \approx 26.67$. Partial cover, as [[#prop-mossin]] requires when $p > \pi$. Check $0 < I < 50$.
:::
:::

::: exercise Independence and a mixture {level=3}
A consumer with expected-utility preferences ranks a sure 10 above a fifty-fifty chance of 0 or 30. Must she rank a fifty-fifty chance of 10 or 20 above a twenty-five / seventy-five chance of 0 or 30? Explain from independence (and reduction).
::: solution
Write $F = \delta_{10}$, $G = \tfrac12 \delta_0 + \tfrac12 \delta_{30}$, and $H = \delta_{20}$. Independence with $\alpha = 1/2$ gives $\tfrac12 F + \tfrac12 H \succsim \tfrac12 G + \tfrac12 H$, i.e. a fifty-fifty of 10 or 20 versus a lottery that, after reduction, is $1/4$ on 0, $1/4$ on 30, $1/2$ on 20 — which is *not* the lottery in the question. The question's second pair is $\tfrac12 \delta_{10} + \tfrac12 \delta_{20}$ versus $\tfrac14 \delta_0 + \tfrac34 \delta_{30}$. Independence does *not* force a ranking of that second pair from $F \succsim G$ alone, because the mixing weights and the common prize do not match. (A student who answers "yes, by independence" has mixed up the weights.) To rank the second pair one needs the actual $u$, not just the ranking of $F$ and $G$.
:::
:::

::: exercise DARA and insurance {level=3}
Show that if $u$ displays decreasing absolute risk aversion, a rise in wealth $w$ (holding $L$, $\pi$ and an unfair $p$ fixed) reduces the optimal *uninsured* amount $L - I$. (A verbal argument using Pratt is enough: richer consumers are less risk averse in the absolute sense, so they retain more risk.)
::: solution
DARA means $r_A(w)$ falls with $w$. By Pratt, the consumer at higher wealth is less absolutely risk averse, so the risk premium she will pay per unit of variance is smaller. At an unfair price $p > \pi$, the optimum trades a loading cost against a risk-reduction benefit; the benefit is proportional (locally) to $r_A$. A smaller $r_A$ therefore yields a smaller $I$ and a larger retained loss $L-I$. (Formally, differentiate the FOC of [[#prop-mossin]] with respect to $w$ and use $r_A' < 0$; see Mossin 1968.) This is a comparative-static of the model, not a claim about any particular household's policy.
:::
:::
