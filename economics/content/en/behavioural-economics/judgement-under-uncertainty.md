A city has two colours of taxi, Blue and Green. Green cabs are $15\%$ of the fleet, Blue cabs $85\%$. A witness to a hit-and-run says the cab was Green. In tests, the witness identifies colour correctly $80\%$ of the time and errs $20\%$ of the time, independently of the true colour. What is the probability that the cab was Green? Most people say something near $80\%$. Bayes’ rule says about $41\%$. The $80\%$ is a likelihood; the $15\%$ is a base rate; the answer is a posterior. Confusing those three numbers is not a rounding error. It is a systematic way of judging probabilities, and it shows up in medical diagnosis, in legal evidence, in financial forecasting and in the way people sample the past.

This chapter is about **judgement**: how people form probabilities and quantities, as opposed to how they *choose* among lotteries (the subject of [[behavioural-economics/prospect-theory]]). Tversky and Kahneman (1974) organised a large experimental literature around three **heuristics** — representativeness, availability and anchoring — and the **biases** those heuristics produce when they are applied in the wrong environment. The research programme is descriptive. It does not say that people are foolish, and it does not say that every probability a person states is a bias. It says that a small set of mental procedures, which often work, leave a signature of predictable errors, and that those errors are large enough to matter for economics.

The standard against which the errors are measured is the probability calculus, in particular [Bayes’ theorem](/a/maths/lesson.php?c=probability&l=conditional-probability) and the rules for conjunction, disjunction and sampling. A brief reminder of that standard is the next section; the rest of the chapter is the psychology and the evidence, including the replications and the criticisms.

## The Bayesian benchmark

Let $H$ be a hypothesis (the cab is Green; the patient has the disease) and $E$ an item of evidence (the witness says Green; the test is positive). Write $\Prob(H)$ for the **prior**, $\Prob(E \mid H)$ for the **likelihood**, and $\Prob(H \mid E)$ for the **posterior**. Bayes’ rule is an identity, not a theory of mind:

$$
\Prob(H \mid E) = \frac{\Prob(E \mid H)\,\Prob(H)}{\Prob(E)}, \qquad \Prob(E) = \Prob(E \mid H)\Prob(H) + \Prob(E \mid \neg H)\Prob(\neg H).
$$ {#eq-bayes}

In odds form, which is often cleaner,

$$
\frac{\Prob(H \mid E)}{\Prob(\neg H \mid E)} = \frac{\Prob(E \mid H)}{\Prob(E \mid \neg H)} \cdot \frac{\Prob(H)}{\Prob(\neg H)}.
$$

The first factor on the right is the **likelihood ratio**. A witness who is right $80\%$ of the time, on both colours, has likelihood ratio $0.80/0.20 = 4$ in favour of whatever colour she names. A prior odds of $15:85$ then becomes a posterior odds of $60:85$, and a posterior probability $60/(60+85) = 12/29 \approx 0.41$.

::: definition Bayesian judgement {#def-bayes-judge}
An agent’s stated probabilities are **Bayesian** (with respect to a stated prior and likelihood) if they coincide with [[#eq-bayes]]. **Base-rate neglect** is the pattern of reporting a posterior close to the likelihood $\Prob(E \mid H)$ and insensitive to $\Prob(H)$. **Conservatism** is the opposite pattern: a posterior that moves too little, relative to Bayes, when $E$ arrives.
:::

::: example The cab problem {#ex-cab}
Compute $\Prob(\text{Green} \mid \text{witness says Green})$ in the opening example. Then recompute it if Green cabs are $15\%$ of the fleet but the witness is right $80\%$ of the time on Green and only $60\%$ of the time on Blue (so the errors are no longer symmetric).
::: solution
With a symmetric $80\%$ witness, $\Prob(E \mid G) = 0.80$, $\Prob(E \mid B) = 0.20$, $\Prob(G) = 0.15$. The numerator of Bayes is $0.80 \times 0.15 = 0.12$; the marginal of $E$ is $0.12 + 0.20 \times 0.85 = 0.12 + 0.17 = 0.29$; the posterior is $0.12/0.29 \approx 0.4138$. About $41\%$, not $80\%$.

With the asymmetric witness, $\Prob(E \mid G) = 0.80$ and $\Prob(E \mid B) = 0.40$ (because she is right on Blue only $60\%$ of the time, so she says Green $40\%$ of the time when the cab is Blue). Numerator $0.80 \times 0.15 = 0.12$; marginal $0.12 + 0.40 \times 0.85 = 0.12 + 0.34 = 0.46$; posterior $0.12/0.46 \approx 0.2609$. A noisier report on Blue *lowers* the posterior that the cab is Green, because “says Green” is now a more common event when the cab is Blue. Likelihoods without a base rate still do not answer the question.
:::
:::

::: widget bayes
mode: test
prevalence: 0.15
sensitivity: 0.8
specificity: 0.8
caption: The cab problem as a diagnostic test. Prevalence is the Green base rate, sensitivity is $\Prob(\text{says Green}\mid\text{Green})$, specificity is $\Prob(\text{says Blue}\mid\text{Blue})$. Start at $0.15$, $0.80$, $0.80$ and read the posterior; then raise the base rate toward $0.5$ and watch the posterior climb toward the witness’s accuracy. The widget’s natural-frequency display is the same arithmetic as [[#eq-bayes]].
:::

Medical versions of the same arithmetic are harsher, because base rates are smaller. A disease with prevalence $1\%$, a test with $90\%$ sensitivity and $90\%$ specificity, and a positive result, give a posterior of $0.01 \times 0.9 / (0.01 \times 0.9 + 0.99 \times 0.1) = 0.009 / 0.108 \approx 0.083$, about $8\%$. Eddy (1982) found that physicians often quoted a number near the sensitivity. Gigerenzer and Hoffrage (1995) showed that recasting the same problem in **natural frequencies** — “$10$ in $1\,000$ have the disease; of those $10$, $9$ test positive; of the $990$ without, $99$ test positive” — brings many answers close to $9/(9+99)$. The psychology is not that people cannot multiply. It is that the Bayesian calculation is unnatural in probability language and much less so in counts.

::: quiz
A test is $99\%$ sensitive and $99\%$ specific. The disease has prevalence $1$ in $1\,000$. A randomly selected person tests positive. The posterior is closest to
- [ ] $99\%$
- [ ] $50\%$
- [x] $9\%$
- [ ] $1\%$
::: solution
Numerator $0.99 \times 0.001 = 0.00099$. False-positive mass $0.01 \times 0.999 \approx 0.00999$. Posterior $0.00099 / (0.00099 + 0.00999) \approx 0.090$, about $9\%$. The $99\%$ is the likelihood, not the posterior. Prevalence of $0.1\%$ is the number that does most of the work.
:::
:::

## Representativeness

The **representativeness** heuristic answers “how likely is $A$ to have come from process $B$?” by “how much does $A$ look like $B$?”. A sequence of coin tosses HTHTHT looks more representative of a fair coin than HHHHHH, so it is judged more likely, even though both have probability $2^{-6}$. A shy, tidy, poetry-loving student is judged more likely to be a librarian than a farmer, even in a world with many more farmers. The heuristic is not crazy: likelihoods $\Prob(\text{data} \mid \text{model})$ really do track resemblance to a prototype, in many models. The error is to treat resemblance as a posterior, or as a probability of a conjunction, or as a sampling distribution.

::: definition Representativeness {#def-represent}
A probability judgement is produced by **representativeness** when $\Prob(A \mid B)$ or $\Prob(B \mid A)$ is replaced by a similarity score $s(A, B)$ between the event (or person, or sample) $A$ and a prototype of $B$. Typical signatures are **base-rate neglect**, the **conjunction fallacy**, **insensitivity to sample size**, and **misconceptions of randomness** (the gambler’s fallacy and the hot-hand belief).
:::

**The conjunction fallacy.** Tversky and Kahneman (1983) described Linda, a 31-year-old outspoken philosophy graduate concerned with discrimination and social justice, and asked which was more probable: (i) Linda is a bank teller; (ii) Linda is a bank teller and is active in the feminist movement. A majority chose (ii). But for any events $F$ and $T$,

$$
\Prob(T \cap F) \le \Prob(T),
$$ {#eq-conjunction}

with equality only if $T \subseteq F$ almost surely. The inequality is an axiom of probability, not an empirical claim. Representativeness predicts the reversal: “feminist bank teller” resembles the description more than “bank teller” does. Critics (Gigerenzer, Hertwig) have argued that “probable” is read as “plausible” or that the word “and” is read as “and, in particular”. The fallacy shrinks, but does not always vanish, when the question is put in frequency language (“how many of $100$ people like Linda…”) and when the two options are evaluated jointly rather than separately. It is a real, procedure-sensitive effect, not a trick of one wording.

::: proposition Conjunction bound {#prop-conjunction}
For any probability $\Prob$ and any events $A, B$, $\Prob(A \cap B) \le \min\bigl(\Prob(A), \Prob(B)\bigr)$. Hence any pair of stated probabilities with $p(A \cap B) > p(A)$ cannot be the restriction of a single probability measure.
:::
::: proof
$A \cap B \subseteq A$, so monotonicity of $\Prob$ gives $\Prob(A \cap B) \le \Prob(A)$; similarly $\le \Prob(B)$.
:::

**Base rates, again.** Kahneman and Tversky (1973) gave a description of a student drawn from a class that was $70\%$ engineers and $30\%$ lawyers, or the reverse, and found that the stated profession tracked the description and barely tracked the base rate. When the description was empty (“you have no information”), base rates were used. Representativeness is the proposed mechanism: a description that *matches* a profession swamps the prior. Economics cares because market participants who ignore base rates will over-react to colourful news and under-react to base-rate information such as long-run default frequencies. Whether they do so in markets, after prices have aggregated many judgements, is a different and harder question, taken up as an empirical claim in asset-pricing courses, not as a theorem here.

**Sample size and the law of small numbers.** Tversky and Kahneman (1971) argued that people treat small samples as more representative of the population than sampling theory allows. A hospital with $15$ births a day and a hospital with $45$ are both asked how often they record days with more than $60\%$ boys. The sampling variance is larger at $n = 15$, so extreme days are more common there; many subjects said the two hospitals were equal, or that the large hospital had more extremes. The same intuition produces the **gambler’s fallacy** (after a run of heads, tails is “due”) and, in other frames, the **hot-hand** belief (after a run of hits, another hit is more likely). Both can be Bayesian in a world where the coin might be biased; both are fallacies for a coin known to be fair. Gilovich, Vallone and Tversky (1985) found no hot hand in NBA shooting data as they sliced it; Miller and Sanjurjo (2018) showed that a selection bias in the way conditional frequencies were computed had hidden a small hot hand. The episode is a warning about the chapter as a whole: the first famous demonstration is not always the last word, and “no effect” can be an artefact just as “an effect” can be.

::: example Boys, girls and two hospitals {#ex-hospitals}
Births are independent, $\Prob(\text{boy}) = 1/2$. Hospital $S$ has $n = 15$ births a day, hospital $L$ has $n = 45$. Using a normal approximation, which hospital has the larger probability of a day with at least $60\%$ boys? Sketch the two probabilities.
::: solution
For $S$, $60\%$ of $15$ is $9$, so we want $\Prob(X \ge 9)$ with $X \sim \mathrm{Bin}(15, 1/2)$. Mean $7.5$, variance $3.75$, sd $\approx 1.94$. The cut $8.5$ (continuity correction) is $(8.5-7.5)/1.94 \approx 0.52$ sd above the mean, so $\Prob \approx 1 - \Phi(0.52) \approx 0.30$. For $L$, $60\%$ of $45$ is $27$, $X \sim \mathrm{Bin}(45, 1/2)$, mean $22.5$, sd $\approx 3.35$, cut $26.5$ is $(26.5-22.5)/3.35 \approx 1.19$ sd above, $\Prob \approx 1 - \Phi(1.19) \approx 0.12$. The small hospital has the more extreme days, by a factor of about two and a half. Representativeness, applied to “a hospital”, does not see the $n$.
:::
:::

::: widget distribution
dist: binomial
params: n=15, p=0.5
a: 9
b: 15
caption: Daily boy-births in the small hospital, $n=15$. Shade from $9$ to $15$ (at least $60\%$ boys) and read the probability. Then switch $n$ to $45$ and shade from $27$ to $45$: the right tail shrinks, which is the law of large numbers at work and the opposite of the ‘law of small numbers’ intuition.
:::

## Availability and anchoring

The **availability** heuristic answers “how frequent is $A$?” by “how easily do instances of $A$ come to mind?”. Ease of recall tracks frequency in a stable, well-sampled environment, and then the heuristic is a good estimator. It parts company with frequency when instances are more or less *retrievable* for reasons that have nothing to do with how often they happen: vividness, recency, media coverage, personal involvement.

Tversky and Kahneman (1973) found that people overestimated the number of English words with K in the first position relative to words with K in the third position, because initial-K words are easier to retrieve. Lichtenstein, Slovic, Fischhoff, Layman and Combs (1978) found that causes of death that are heavily reported (homicide, tornado) were overestimated relative to quieter killers (asthma, diabetes). After a flood, take-up of flood insurance rises in the affected basin and decays with time (Gallagher 2014, *American Economic Journal: Applied Economics*): a field signature of availability, and also of recency. Availability is one reason that risk regulation tracks recent disasters rather than expected damage, a theme that returns in [[behavioural-economics/behavioural-policy]].

::: definition Availability and anchoring {#def-avail-anchor}
A frequency or probability is judged by **availability** when it is replaced by the ease with which instances are retrieved or imagined. A numerical estimate is produced by **anchoring and adjustment** when the agent starts from a salient number (the **anchor**) and adjusts insufficiently. The anchor need not be informative; insufficient adjustment predicts that estimates are biased toward it.
:::

**Anchoring.** Tversky and Kahneman (1974) spun a wheel of fortune in front of subjects, obtaining $10$ or $65$, and then asked whether the percentage of African countries in the United Nations was above or below that number, and then what the percentage was. Means were $25$ after the low anchor and $45$ after the high one. The wheel was visibly random. Ariely, Loewenstein and Prelec (2003) anchored willingness to pay for wine, books and chocolates on the last two digits of the subject’s social-security number, and obtained a “coherent arbitrariness”: internally ordered valuations that were collectively arbitrary. Many Labs (Klein et al. 2014) replicated anchoring with a large, pre-registered design; the effect is not a one-lab curiosity. What remains debated is the *mechanism*: insufficient adjustment from a starting point (Tversky and Kahneman), selective retrieval of anchor-consistent evidence (Mussweiler and Strack), and conversational implication (“the experimenter would not mention $65$ if the answer were $10$”) all have support, and they have different implications for whether an obviously irrelevant anchor in a market still bites.

For economics the relevant anchors are not wheels of fortune. They are list prices, past transaction prices, round numbers, and the first offer in a negotiation. Northcraft and Neale (1987) found that even professional estate agents’ valuations of a property moved with the asking price. In take-it-or-leave-it bargaining, the opening offer is both a strategic move and an anchor; the two interpretations are not identified from the offer alone.

::: example A noisy anchor {#ex-anchor}
A quantity $\theta = 40$ is estimated by $a + \lambda\,(\theta + \varepsilon - a)$, where $a$ is the anchor, $\varepsilon$ is mean-zero noise, and $\lambda \in (0, 1]$ is the adjustment weight ($\lambda = 1$ is full adjustment to the unbiased signal $\theta + \varepsilon$). What is the expected estimate after a high anchor $a = 65$ and after a low anchor $a = 10$, if $\lambda = 0.4$? What $\lambda$ would make the expected gap between the two anchors equal to the $20$-point gap in Tversky and Kahneman’s U.N. experiment (means $45$ and $25$)?
::: solution
$\E[\hat\theta \mid a] = a + \lambda(\theta - a) = \lambda\theta + (1-\lambda)a$. With $\lambda = 0.4$ and $\theta = 40$, the high-anchor expectation is $0.4 \times 40 + 0.6 \times 65 = 16 + 39 = 55$; the low-anchor expectation is $16 + 0.6 \times 10 = 22$. The gap is $33$ points. Generally the expected gap between anchors $a_H$ and $a_L$ is $(1-\lambda)(a_H - a_L)$. Setting $(1-\lambda)(65-10) = 20$ gives $1-\lambda = 20/55 = 4/11$, so $\lambda = 7/11 \approx 0.64$. About two-thirds of the way from the anchor toward the true value still leaves a $20$-point gap, because the anchors themselves are $55$ points apart. Insufficient adjustment is identified from the gap only once one takes a stand on how far apart the anchors were.
:::
:::

## Overconfidence and calibration

Ask a group to state $90\%$ confidence intervals for ten uncertain quantities (the length of the Nile, next year’s inflation, the revenue of a firm they have just read about). If the intervals are **calibrated**, about nine of the ten should contain the truth. Lichtenstein, Fischhoff and Phillips (1982), in a review that still holds up, found hit rates around $40$–$60\%$ for intervals that were supposed to be $90\%$ or $98\%$. People state intervals that are too tight: they are **overprecise**. A related finding is **overplacement** (“I am better than the median”) on easy tasks and **underplacement** on hard ones (the “hard–easy” effect). A third, **overestimation** of one’s absolute performance, is a different object. Moore and Healy (2008) insisted on keeping the three apart; much of the popular literature does not.

::: definition Calibration and overprecision {#def-calibration}
A set of stated $p$-intervals is **calibrated** if the fraction of times the true value falls inside the interval is $p$. **Overprecision** is the pattern of hit rates below $p$ for $p$ near $1$. A stated probability $q$ for a binary event is calibrated if the event happens with frequency $q$ among the cases where $q$ was stated.
:::

Overprecision matters in economics wherever an agent’s action depends on how sure she is, not just on her point estimate: entry into entrepreneurship, the tightness of a bid, the decision to litigate, the refusal to insure, the volume of trade in a market where both sides think they are the one with the edge (an idea going back to Varian, and to theoretical work by Daniel, Hirshleifer and Subrahmanyam 1998, among others). It is *not* a prediction about the agent’s own finances in this course, and it is not a recommendation to trade. It is a restriction on beliefs: posterior variances are too small relative to the information.

A useful Bayesian benchmark is that a well-calibrated agent who receives a signal of known precision should report intervals that reflect that precision. Overprecision is then a claim that the agent treats the signal as more precise than it is, or treats prior uncertainty as smaller than it is, or fails to integrate the two. Which of those three is the right process model is not settled. The reduced-form fact — hit rates on $90\%$ intervals well below $90\%$ — is one of the more reliable findings in judgement research, and it has been replicated with professionals (economists’ growth forecasts, physicians’ diagnosis, lawyers’ case assessments) as well as with students.

::: warning Overconfidence is not one thing
Saying “people are overconfident” without distinguishing overprecision, overplacement and overestimation leads to contradictory predictions. Men overplace themselves on the easy quiz and underplace themselves on the hard one; that is not a uniform shift in self-regard. $90\%$ intervals that catch the truth $50\%$ of the time are overprecise even when the point estimates are unbiased. A model of a financial market, a labour market or a court that needs “overconfidence” has to say which of the three it is using, and to pick evidence that speaks to that one.
:::

::: example Hit rates {#ex-hits}
One hundred $90\%$ intervals are elicited. Fifty-four contain the true value. Give a standard error for the hit rate under the null of calibration, and a $z$-statistic for that null. Is calibration rejected at conventional sizes?
::: solution
Under the null, each interval is a Bernoulli($0.9$) trial if we treat the items as independent (a modelling choice: common knowledge across items would induce dependence). Then $\hat p = 0.54$, $\mathrm{se} = \sqrt{0.9 \times 0.1 / 100} = 0.03$ under the null, $z = (0.54 - 0.90)/0.03 = -12$. Calibration is rejected at any conventional size. Using the estimated variance $\sqrt{0.54 \times 0.46 / 100} \approx 0.050$ still gives $z \approx -7.2$. The finding is not a small-sample fluke. (Dependence across items would inflate the true standard error; even multiplying it by three leaves a rejection.)
:::
:::

## Evidence, replications and criticisms

The heuristics-and-biases programme is fifty years old, and it has been criticised from the beginning. Three lines of criticism are worth keeping distinct.

**The ecological critique.** Gigerenzer and the ABC group have argued that many “biases” appear because the experimenter presents probabilities, percentages and one-shot problems, whereas the mind is built for natural frequencies and for repeated sampling. Recasting Linda and the cab problem in frequency language often reduces the error rate, sometimes sharply. That is a contribution, and this chapter has used it. It does not make the original error uninteresting: markets, courts and clinics *do* present one-shot probability problems, and policy is often written in percentages. An error that disappears in frequencies and reappears in probabilities is still an error in the environment where it appears.

**The conversational critique.** Hilton, Schwarz and others have argued that some tasks violate Gricean maxims: the subject infers that a mentioned anchor, or a mentioned description, is relevant, and uses it. That is a real confound for wheel-of-fortune anchoring and for some conjunction tasks. It is a much weaker confound for anchors that markets themselves present (list prices) and for conjunction fallacies that survive frequency wording.

**The replication critique.** The Open Science Collaboration (2015) estimate that about $36\%$ of a sample of psychology findings replicated is a fact about that sample, which was not a sample of Tversky–Kahneman experiments. Many Labs (Klein et al. 2014) did include anchoring, and it replicated. Camerer et al. (2016, 2018) found higher replication rates in experimental economics than in some areas of psychology, but well below $100\%$. The honest summary for this chapter: representativeness (conjunction, base-rate neglect in description problems), anchoring, and overprecision of confidence intervals are repeatedly obtained; the original hot-hand “null”, the original law-of-small-numbers demonstrations, and many one-off availability illustrations are more fragile or have been re-interpreted. A stylised fact here is a family of results, not a single $p$-value.

Economics has its own evidence, which is the reason the chapter belongs in this atlas. Professional forecasters’ intervals are too tight (Zarnowitz and Lambros 1987, and a long subsequent literature). Jurors and judges mishandle base rates in the cab-problem mould (Koehler and Thompson’s reviews). Consumers’ take-up of insurance tracks recent shocks more than expected loss (Gallagher 2014; a related literature on earthquake and flood insurance). Entrepreneurs’ entry is hard to reconcile with calibrated beliefs about success rates (a literature associated with Camerer and Lovallo 1999, among others). None of these is a laboratory curiosity, and none of them is a licence to ignore base rates, sample size or calibration in a model until the model has been asked whether those departures change its predictions by enough to matter.

::: history
Tversky and Kahneman’s 1974 *Science* paper, and Kahneman and Tversky’s 1973 *Psychological Review* paper on representativeness, are the canonical sources; the 1982 collection *Judgment under Uncertainty: Heuristics and Biases* (Kahneman, Slovic and Tversky, eds.) gathered the first wave of experiments. Meehl’s 1954 book on clinical versus statistical prediction, and Edwards’s work on conservatism in Bayesian updating in the 1960s, are earlier. Gigerenzer and Hoffrage (1995) opened the frequency-format debate; Gilovich, Vallone and Tversky (1985) and Miller and Sanjurjo (2018) bracket the hot-hand controversy. Kahneman’s *Thinking, Fast and Slow* (2011) is the public synthesis; it is more confident, in places, than the later replication literature. Read it, then read the papers.
:::

## Where this leads

Judgement is an input to choice. An agent who neglects base rates, or who overweights a vivid scenario, will buy different lotteries from an expected-utility maximiser who uses [[#eq-bayes]]; that is one route into [[behavioural-economics/prospect-theory]], which however is a theory of *choice*, not of probability judgement, and which can be applied even when the probabilities are given. Present bias ([[behavioural-economics/present-bias]]) is a different departure, about time rather than probability. Overprecision interacts with limited attention ([[behavioural-economics/limited-attention]]): an agent who is sure she has seen everything will not look. In games, level-$k$ thinking ([[behavioural-economics/behavioural-game-theory]]) is a judgement about other people, and the same representativeness logic — “they will play the salient number” — does part of the work. The Bayesian benchmark does not become less important as we leave the chapter. It is the ruler. Heuristics are interesting because they are systematic departures from it, not because it has been replaced.

::: summary
- Bayes’ rule ([[#eq-bayes]], [[#def-bayes-judge]]) is the benchmark. Likelihoods are not posteriors; base rates are not optional.
- **Representativeness** ([[#def-represent]]) substitutes similarity for probability and produces base-rate neglect, the conjunction fallacy ([[#prop-conjunction]]) and the law of small numbers.
- **Availability** substitutes ease of retrieval for frequency; **anchoring** ([[#def-avail-anchor]]) produces estimates biased toward a salient number, including numbers that are visibly random.
- **Overprecision** ([[#def-calibration]]) — $90\%$ intervals that catch the truth far less than $90\%$ of the time — is a more reliable finding than a generic claim that “people are overconfident”.
- Frequency formats, conversational implicature and failed replications all cut some of the original demonstrations down. They do not cut down the cab problem, anchoring, or miscalibrated intervals as families of results.
- The economic content is in environments where these judgements are an input to prices, take-up, entry or verdicts — and in asking whether the departure from Bayes is large enough to change the model’s predictions.
:::

## Exercises

::: exercise A symmetric witness {level=1 check="0.4138"}
In the opening cab problem, enter $\Prob(\text{Green} \mid \text{says Green})$ to four decimal places.
::: solution
$0.80 \times 0.15 / (0.80 \times 0.15 + 0.20 \times 0.85) = 0.12/0.29 \approx 0.4138$.
:::
:::

::: exercise A rare disease {level=1 check="0.0833"}
Prevalence $1\%$, sensitivity $90\%$, specificity $90\%$, positive test. Enter the posterior to four decimal places.
::: solution
$0.009 / (0.009 + 0.099) = 0.009/0.108 \approx 0.0833$.
:::
:::

::: exercise Conjunction {level=1}
A subject states $\Prob(\text{teller}) = 0.15$ and $\Prob(\text{feminist teller}) = 0.25$. Which axiom of probability is violated? Give the bound [[#prop-conjunction]] implies for the conjunction, given the first number.
::: solution
Monotonicity (the conjunction bound) is violated: $0.25 > 0.15$. The bound is $\Prob(\text{feminist teller}) \le 0.15$.
:::
:::

::: exercise Likelihood ratio {level=2}
A witness is right with probability $q$ on both colours. Green cabs have base rate $\pi$. Show that the posterior that the cab is Green, given “says Green”, equals $\dfrac{q\pi}{q\pi + (1-q)(1-\pi)}$. For which $q$ does the posterior equal the base rate? For which $\pi$ does it equal $q$?
::: hint
Write Bayes’ rule and factor.
:::
::: solution
Numerator $q\pi$; denominator $q\pi + (1-q)(1-\pi)$, which is the displayed formula. If $q = 1/2$ the witness is uninformative and the posterior equals $\pi$. If $\pi = 1/2$ the base rate is uninformative and the posterior equals $q$. Those are the only cases in which “report the likelihood” or “report the base rate” is Bayesian. For the cab numbers $q = 0.8$, $\pi = 0.15$, neither shortcut is correct.
:::
:::

::: exercise Anchoring gap {level=2 check="0.6364"}
In [[#ex-anchor]], the $\lambda$ that matches a $20$-point mean gap between anchors $65$ and $10$ is $7/11$. Enter it as a decimal to four places.
::: solution
$7/11 \approx 0.6364$.
:::
:::

::: exercise Two hospitals, exact {level=2}
For $n = 15$ and $p = 1/2$, compute $\Prob(X \ge 9)$ exactly as a binomial sum, and compare it with the normal approximation $1 - \Phi(0.52) \approx 0.30$ used in [[#ex-hospitals]].
::: hint
$\Prob(X = k) = 2^{-15} \binom{15}{k}$. You need $\binom{15}{9} + \cdots + \binom{15}{15}$.
:::
::: solution
$\binom{15}{9} = 5005$, $\binom{15}{10} = 3003$, $\binom{15}{11} = 1365$, $\binom{15}{12} = 455$, $\binom{15}{13} = 105$, $\binom{15}{14} = 15$, $\binom{15}{15} = 1$. Sum $9949$. Total $2^{15} = 32768$. Probability $9949/32768 \approx 0.3036$, in close agreement with $0.30$. The approximation was not the source of the qualitative result.
:::
:::

::: exercise Calibration $z$ {level=3}
Fifty $98\%$ intervals are elicited; $28$ contain the truth. Using the null variance $p(1-p)/n$ with $p = 0.98$, compute the $z$-statistic for the null of calibration. Does a two-sided test at $5\%$ reject?
::: hint
$\mathrm{se} = \sqrt{0.98 \times 0.02 / 50}$.
:::
::: solution
$\hat p = 28/50 = 0.56$. Null se $= \sqrt{0.0196/50} = \sqrt{0.000392} \approx 0.0198$. $z = (0.56-0.98)/0.0198 \approx -21.2$. The $5\%$ two-sided critical value is $1.96$; the test rejects overwhelmingly. Even if dependence across items multiplied the se by five, $z$ would still be about $-4$.
:::
:::

::: exercise When representativeness is Bayesian {level=3}
A population is a mixture: with probability $\pi$ a coin is fair, with probability $1-\pi$ it has two heads. You see HH. Compute $\Prob(\text{two-headed} \mid HH)$. Explain in one paragraph why, in this environment, using representativeness (“HH looks like a two-headed coin”) moves the judgement in the *same direction* as Bayes, and why that does not salvage representativeness in the cab problem.
::: hint
Likelihood of HH is $1/4$ under fair and $1$ under two-headed.
:::
::: solution
$\Prob(\text{two-headed} \mid HH) = \dfrac{1 \cdot (1-\pi)}{1 \cdot (1-\pi) + (1/4)\pi} = \dfrac{1-\pi}{1-\pi + \pi/4} = \dfrac{4(1-\pi)}{4-3\pi}$. For $\pi = 1/2$ this is $4/5 = 0.8$. Representativeness says HH “looks like” two-headed, and Bayes agrees that the posterior on two-headed should rise. The heuristic is directionally right when the prototype of $H$ really does have higher likelihood for the data. In the cab problem the witness’s report “looks like” a Green cab, and that is the *likelihood*; the error is to ignore the base rate $\pi = 0.15$, which Bayes does not ignore. Representativeness tracks $\Prob(E \mid H)$ and neglects $\Prob(H)$. It therefore agrees with Bayes when priors are fifty-fifty (or already absorbed into the prototype) and disagrees when they are extreme. The cab problem is the second case; the two-headed coin with $\pi = 1/2$ is closer to the first.
:::
:::

::: exercise Natural frequencies {level=2}
Rewrite the $1\%$-prevalence, $90\%$-sensitivity, $90\%$-specificity test in natural frequencies per $1\,000$ people, and read off the posterior among those who test positive. Confirm it matches [[#ex-cab]]’s medical cousin, $0.0833$.
::: solution
Of $1\,000$ people, $10$ have the disease and $990$ do not. Of the $10$, $9$ test positive; of the $990$, $99$ test positive. Positive testers: $9+99 = 108$, of whom $9$ have the disease. Posterior $9/108 = 1/12 \approx 0.0833$. The frequency display and Bayes’ rule are the same arithmetic; the display is what Gigerenzer and Hoffrage (1995) found people can actually perform.
:::
:::
