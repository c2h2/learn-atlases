A chain of thought is one sample from a distribution over reasoning paths. Sample again at a positive temperature and the model may take a different route — and arrive at a different answer. The previous chapter treated that variability as noise in a single attempt. This chapter treats it as a resource. If several independent attempts are made, we can **vote** on their answers, **check** them with a verifier, or simply ask whether **any** of them is right. All three ideas are old in statistics and machine learning, and all three became central to language-model reasoning between 2021 and 2023. They are also the cleanest place in the course to do exact probability: how much does voting help, when does it stop helping, and how should the success of $k$ attempts be measured?

[[prompting-rag/prompt-design#sec-self-consistency]] introduced self-consistency and proved that plurality voting converges to the most probable answer. Here we go further. We derive self-consistency as an approximation to marginalising over reasoning paths; compute the accuracy of a majority vote exactly and prove the Condorcet jury theorem; show precisely how correlated errors break it; derive the unbiased estimator of pass@$k$ used throughout code and reasoning evaluation; and analyse best-of-$n$ selection with a verifier, including why a better verifier is the bottleneck once samples are plentiful.

## Reasoning paths as latent variables {#sec-marginal}

Write the model's output for a question $x$ as a reasoning path $z$ followed by an answer $a$, extracted by a parser. The path is a means to an end: two different chains that end in "the answer is $54$" give the same answer, and what we care about is

$$
p_\theta(a\mid x) = \sum_{z} p_\theta(z, a\mid x),
$$ {#eq-marginal}

the probability of the *answer*, summed over all the ways of reaching it. Greedy decoding follows a single high-probability path, and the answer at its end need not be the answer with the highest marginal probability: many moderately likely paths may agree on one answer while the single most likely path ends somewhere else.

::: definition Self-consistency {#def-sc}
**Self-consistency** (Wang et al., 2023) samples $n$ paths $(z_j, a_j)\sim p_\theta(\cdot\mid x)$ independently at temperature $T > 0$, and returns the answer with the most votes,

$$
\hat a_n = \arg\max_a \sum_{j=1}^n \mathbf 1[a_j = a],
$$

with ties broken uniformly at random. **Weighted self-consistency** replaces the indicator by a weight $w_j$, for example the length-normalised probability of the path or a verifier's score.
:::

::: proposition Voting estimates the mode of the marginal {#prop-mode}
The vote count of answer $a$ divided by $n$, $\hat p_n(a) = \frac1n\sum_j\mathbf 1[a_j = a]$, is an unbiased and consistent estimator of the marginal $p_\theta(a\mid x)$ of [[#eq-marginal]]. Hence self-consistency returns the mode of the empirical estimate of the marginal answer distribution, and, if that distribution has a unique mode $a^*$, $\hat a_n\to a^*$ with probability one as $n\to\infty$.
:::

::: proof
Each $\mathbf 1[a_j = a]$ is a Bernoulli variable with mean $\Prob(a_j = a) = \sum_z p_\theta(z, a\mid x) = p_\theta(a\mid x)$, so $\E\,\hat p_n(a) = p_\theta(a\mid x)$, and by the strong law of large numbers $\hat p_n(a)\to p_\theta(a\mid x)$ almost surely. The convergence of the argmax for a finite set of answers is [[prompting-rag/prompt-design#prop-plurality]].
:::

The proposition explains a finding of Wang et al. that is otherwise surprising. They compared plain majority voting with weighting each path by its probability under the model. Weighting by the *unnormalised* path probability $p_\theta(z,a\mid x)$ did much worse — long paths have tiny probabilities, so the vote is dominated by whichever path happens to be shortest. Weighting by the *length-normalised* probability (the geometric mean of the token probabilities) did about as well as the plain vote. The plain vote already is a Monte Carlo estimate of [[#eq-marginal]]; weighting by $p_\theta$ would double-count the model's probabilities, because the samples were drawn from $p_\theta$ in the first place.

### What Wang et al. found {#sec-wang}

With $40$ sampled paths (temperature $0.5$–$0.7$, top-$k$ sampling with $k = 40$ for most models), self-consistency improved over greedy chain of thought on every arithmetic and commonsense benchmark tested. For PaLM 540B on GSM8K, accuracy rose from $56.5\%$ to $74.4\%$; the paper reports gains of $17.9$ points on GSM8K, $11.0$ on SVAMP, $12.2$ on AQuA, $6.4$ on StrategyQA and $3.9$ on ARC-challenge. Self-consistency also beat alternatives that use the same number of samples: ranking samples by their probability, beam search, and ensembles of different prompts. Accuracy rose quickly over the first $5$–$10$ samples and then flattened.

::: example Greedy path versus marginal answer {#ex-greedy}
A model's paths for a question fall into five groups. The most likely single path (probability $0.08$) ends in answer $48$; no other path ending in $48$ has probability above $0.01$, and paths ending in $48$ have total probability $0.20$. Paths ending in $54$ are individually less likely (none above $0.03$) but have total probability $0.55$; the rest scatter over other answers. Which answer does greedy decoding give (approximately), which does self-consistency converge to, and which is the model "more confident" in?
::: solution
Greedy decoding approximates the single most likely path, so it answers $48$. By [[#prop-mode]], self-consistency converges to the mode of the marginal, $54$, which has $0.55$ of the probability mass against $0.20$ for $48$. The model's confidence in an *answer* is its marginal probability, so it is more confident in $54$; the greedy path is a high-probability outlier. With $n = 10$ samples, $54$ is expected to receive $5.5$ votes and $48$ only $2$.
:::
:::

## The exact accuracy of a majority vote {#sec-condorcet}

Suppose first that answers are effectively binary — right or wrong — and that each sample is right with probability $p$, independently. With $n = 2m+1$ samples (odd, to avoid ties), the majority is right when at least $m+1$ samples are, and the number of right samples $X$ is binomial:

$$
P_n(p) = \Prob(X\ge m+1) = \sum_{k=m+1}^{n}\binom nk p^k(1-p)^{n-k}.
$$ {#eq-majority}

This is a lower bound for plurality voting when wrong answers are spread over several values, because then the correct answer can win with fewer than half the votes ([[prompting-rag/prompt-design#ex-competitor]]).

::: theorem Condorcet jury theorem {#thm-condorcet}
Let $n = 2m+1$ voters vote independently, each correct with probability $p$, and let $P_n(p)$ be the probability that the majority is correct, [[#eq-majority]]. Then

$$
P_{n+2}(p) - P_n(p) = \binom{2m+1}{m}\,p^{m+1}(1-p)^{m+1}\,(2p - 1).
$$ {#eq-condorcet-step}

Consequently, if $p > 1/2$, then $P_n(p)$ is strictly increasing in $n$ and $P_n(p)\to1$; if $p < 1/2$, it is strictly decreasing and tends to $0$; and $P_n(1/2) = 1/2$ for every odd $n$.
:::

::: proof
Let $X$ be the number of correct votes among the first $n = 2m+1$ voters and add two more. The majority of $n+2$ needs $m+2$ correct votes. The outcome can differ from the majority of the first $n$ only when the first $n$ are as close as possible: if $X = m$ (majority wrong), the majority becomes right exactly when both new votes are right, probability $p^2$; if $X = m+1$ (majority right), it becomes wrong exactly when both new votes are wrong, probability $q^2$ with $q = 1-p$. In every other case two votes cannot change the result. Hence

$$
P_{n+2} - P_n = \Prob(X = m)\,p^2 - \Prob(X = m+1)\,q^2 = \binom{2m+1}{m}p^mq^{m+1}p^2 - \binom{2m+1}{m+1}p^{m+1}q^mq^2,
$$

and since $\binom{2m+1}{m} = \binom{2m+1}{m+1}$ this equals $\binom{2m+1}{m}p^{m+1}q^{m+1}(p - q)$, which is [[#eq-condorcet-step]] because $p - q = 2p - 1$. Its sign is that of $2p-1$, which gives the monotonicity.

For the limit with $p > 1/2$: the majority is wrong only if $X\le n/2$, that is $X - np\le -n(p - \tfrac12)$. Chebyshev's inequality with $\Var X = npq$ gives

$$
1 - P_n\le\Prob\big(\lvert X - np\rvert\ge n(p-\tfrac12)\big)\le\frac{npq}{n^2(p-\frac12)^2} = \frac{pq}{n(p-\frac12)^2}\to0.
$$

The case $p < 1/2$ follows by exchanging the roles of right and wrong. For $p = 1/2$ the distribution of $X$ is symmetric about $n/2$ and $n$ is odd, so $\Prob(X\ge m+1) = \Prob(X\le m) = 1/2$.
:::

Chebyshev's bound is crude. Hoeffding's inequality, $1 - P_n\le\exp(-2n(p-\frac12)^2)$, gives exponential decay and a practical rule: to push the error of the vote below $\delta$ it suffices that $n\ge\ln(1/\delta)/\big(2(p-\frac12)^2\big)$. The dependence on the *margin* $p - \frac12$ is quadratic, so a model that is right $55\%$ of the time needs about sixteen times as many votes as one that is right $70\%$ of the time for the same guarantee.

::: example Majority votes by hand {#ex-majority}
Each sample is right with probability $0.7$. Compute the probability that a majority of $3$ and of $5$ is right, and check the step formula [[#eq-condorcet-step]].
::: solution
$P_3 = 0.7^3 + 3\cdot0.7^2\cdot0.3 = 0.343 + 0.441 = 0.784$. $P_5 = 0.7^5 + 5\cdot0.7^4\cdot0.3 + 10\cdot0.7^3\cdot0.3^2 = 0.16807 + 0.36015 + 0.3087 = 0.83692$. The step formula with $m = 1$: $\binom31\,0.7^2\,0.3^2\,(0.4) = 3\cdot0.49\cdot0.09\cdot0.4 = 0.05292$, and indeed $0.83692 - 0.784 = 0.05292$. Each extra pair of votes helps less than the last: the binomial coefficient grows like $4^m/\sqrt m$ but $(pq)^{m+1} = 0.21^{m+1}$ shrinks faster.
:::
:::

## When votes are correlated {#sec-correlated}

The Condorcet theorem assumes independent votes with the *same* accuracy $p$. Samples from one model for one question are independent given the prompt, but the relevant accuracy $p$ is a property of the *question*: on some questions the model is right $95\%$ of the time, on others $20\%$. Viewed across a benchmark, the votes on a randomly chosen question are correlated — they share the question's difficulty — and that correlation changes the conclusion completely.

::: theorem Majority voting under a latent difficulty {#thm-mixture}
Let a question's per-sample accuracy $P$ be random with distribution $\mu$ on $[0,1]$, and let the votes on that question be independent Bernoulli$(P)$ given $P$. Then the probability that the majority of $n = 2m+1$ votes is correct, averaged over questions, is $\E[P_n(P)]$, and

$$
\lim_{n\to\infty}\E[P_n(P)] = \mu\big(P > \tfrac12\big) + \tfrac12\,\mu\big(P = \tfrac12\big),
$$

while the single-sample accuracy is $\E[P]$. Two votes on the same question have correlation $\rho = \Var(P)/\big(\E[P](1-\E[P])\big)$.
:::

::: proof
Given $P = p$ the votes are independent, so the conditional probability that the majority is right is $P_n(p)$, and averaging over $P$ gives $\E[P_n(P)]$. By [[#thm-condorcet]], $P_n(p)\to\mathbf 1[p > \frac12] + \frac12\mathbf 1[p = \frac12]$ for every $p$, and $0\le P_n\le1$, so the dominated convergence theorem allows exchanging the limit and the expectation. For the correlation, let $V_1, V_2$ be two votes. $\E[V_1V_2] = \E[\E[V_1V_2\mid P]] = \E[P^2]$, so $\Cov(V_1, V_2) = \E[P^2] - \E[P]^2 = \Var(P)$, and each vote has variance $\E[P](1-\E[P])$.
:::

The limit depends only on the fraction of questions on which the model is *more often right than wrong*. Voting turns every question with $p > 1/2$ into a certain success and every question with $p < 1/2$ into a certain failure. If the model's single-sample accuracy is mostly earned on questions where it is right only sometimes, voting can lower accuracy. By de Finetti's theorem, every infinite exchangeable sequence of binary votes has this mixture form, so [[#thm-mixture]] covers correlated votes in general, as long as no sample is privileged.

::: example Voting can hurt {#ex-hurt}
On a benchmark, $60\%$ of the questions are easy for a model ($p = 0.9$) and $40\%$ are hard ($p = 0.4$). What is the single-sample accuracy, the limit of majority voting, and the correlation of two votes?
::: solution
Single sample: $0.6\cdot0.9 + 0.4\cdot0.4 = 0.54 + 0.16 = 0.70$. By [[#thm-mixture]], the vote tends to $\mu(P > 1/2) = 0.6$: it gains on the easy questions ($0.9\to1$) but loses everything on the hard ones ($0.4\to0$), a net loss of $10$ points. $\Var(P) = 0.6\cdot0.81 + 0.4\cdot0.16 - 0.7^2 = 0.486 + 0.064 - 0.49 = 0.06$, so $\rho = 0.06/(0.7\cdot0.3) = 0.286$. The listing below computes the whole curve: the vote first *helps* slightly (to $0.724$ at $n = 3$) and then declines towards $0.6$. Independent votes with $p = 0.7$ would instead approach $1$.
:::
:::

::: widget plot
f: sum(binom(2*floor(x/2)+1, k)*p^k*(1-p)^(2*floor(x/2)+1-k), k, floor(x/2)+1, 2*floor(x/2)+1); 0.6*sum(binom(2*floor(x/2)+1, k)*0.9^k*0.1^(2*floor(x/2)+1-k), k, floor(x/2)+1, 2*floor(x/2)+1) + 0.4*sum(binom(2*floor(x/2)+1, k)*0.4^k*0.6^(2*floor(x/2)+1-k), k, floor(x/2)+1, 2*floor(x/2)+1)
x: 0, 101
y: 0, 1
sliders: p=0.7:0.3:0.9:0.01
labels: independent votes, accuracy $p$; mixture: $60\%$ at $0.9$, $40\%$ at $0.4$
caption: Probability that a majority of $n$ votes is right (the horizontal axis is $n$, rounded down to an odd number). The first curve has independent votes of accuracy $p$ ([[#thm-condorcet]]): it rises to $1$ for $p > 1/2$ and falls to $0$ for $p < 1/2$. The second is the benchmark of [[#ex-hurt]], with single-sample accuracy $0.7$ but correlated votes ([[#thm-mixture]]): it peaks at a few votes and then declines towards $0.6$. Set $p = 0.7$ to compare two benchmarks with the same single-sample accuracy.
:::

Correlation also appears *within* a question. A model that has learned a common misconception produces the same wrong answer often; then the wrong answer is the mode, $\hat a_n$ converges to it, and the vote makes the model confidently wrong. The diagnostic is the **agreement rate** — the share of votes received by the winning answer. Wang et al. observed that it is correlated with accuracy, which makes it useful for deciding when to abstain or to spend more samples ([[reasoning/test-time-scaling]]); but on questions with a systematic error, high agreement is not evidence of correctness.

::: warning Self-consistency is not a confidence measure
A $9$-to-$1$ vote does not mean the answer is right with probability $0.9$. The vote fraction estimates the model's marginal probability of the answer ([[#prop-mode]]), which is calibrated only if the model's distribution is. A model that makes the same mistake consistently will produce unanimous votes for it. Use agreement as a *relative* signal — low agreement flags hard or ambiguous questions — and calibrate it against labelled data before treating it as a probability.
:::

## Pass@k {#sec-passk}

Voting needs answers that can be compared. In program synthesis there is something better: unit tests. If any of $k$ attempts passes the tests, the problem is solved — the user (or a system) can run the tests and keep the passing program. The natural metric is the probability that at least one of $k$ samples is correct.

::: definition pass@k {#def-passk}
For a problem on which one sample is correct with probability $p$, $\text{pass@}k = 1 - (1-p)^k$, the probability that at least one of $k$ independent samples is correct. On a benchmark, pass@$k$ is the average of this quantity over problems. Coverage, the term used in [[reasoning/test-time-scaling]], is the same quantity.
:::

Estimating pass@$k$ directly — draw $k$ samples per problem, record success, average — is wasteful and noisy, and it needs a fresh set of samples for every $k$. Chen et al. (2021), introducing the HumanEval benchmark with the Codex models, drew $n\ge k$ samples per problem once and used every $k$-subset of them.

::: theorem Unbiased estimator of pass@k {#thm-passk}
Draw $n\ge k$ independent samples for a problem and let $c$ of them be correct. Then

$$
\widehat{\text{pass@}k} = 1 - \frac{\binom{n-c}{k}}{\binom nk} = 1 - \prod_{i = n-c+1}^{n}\Big(1 - \frac ki\Big)
$$ {#eq-passk}

(with the value $1$ when $n - c < k$) is an unbiased estimator of $1 - (1-p)^k$. The plug-in estimator $1 - (1-c/n)^k$ is biased downwards for $k\ge2$ and $0 < p < 1$.
:::

::: proof
Label the samples $1,\dots,n$, and for each $k$-element subset $S$ let $I_S = 1$ if some sample in $S$ is correct. The samples in $S$ are $k$ independent draws, so $\E I_S = 1-(1-p)^k$ for every $S$. The average of $I_S$ over all $\binom nk$ subsets therefore also has expectation $1-(1-p)^k$, by linearity of expectation. That average equals $1 - (\text{number of subsets with no correct sample})/\binom nk$, and a subset has no correct sample exactly when it is drawn from the $n-c$ incorrect ones, of which there are $\binom{n-c}{k}$ subsets. This is the first form of [[#eq-passk]].

For the product form,

$$
\frac{\binom{n-c}{k}}{\binom nk} = \frac{(n-c)!\,(n-k)!}{n!\,(n-c-k)!} = \prod_{i=n-c+1}^{n}\frac{i-k}{i},
$$

because $(n-k)!/(n-c-k)!$ is the product of the $c$ integers $i - k$ for $i = n-c+1,\dots,n$ and $n!/(n-c)!$ the product of the corresponding $i$.

For the plug-in estimator, let $\hat p = c/n$, with $\E\hat p = p$. The function $u\mapsto(1-u)^k$ is strictly convex on $[0,1]$ for $k\ge2$, and $\hat p$ is not almost surely constant when $0 < p < 1$, so Jensen's inequality gives $\E(1-\hat p)^k > (1-p)^k$ and hence $\E[1 - (1-\hat p)^k] < 1 - (1-p)^k$.
:::

The product form matters in practice: $\binom{200}{100}\approx9\times10^{58}$ overflows many number formats, while the product of $c$ terms near $1$ is stable. Chen et al. used $n = 200$ samples per problem and reported $k$ up to $100$. Their $12$-billion-parameter Codex model solved $28.8\%$ of HumanEval's $164$ problems with one sample and $70.2\%$ with $100$ samples per problem (pass@$100$) — an early demonstration that a model "knows how to" solve far more problems than it solves on a typical attempt, which is the starting point of [[reasoning/test-time-scaling]].

::: example Estimating pass@5 {#ex-passk}
For one problem, $n = 20$ samples were drawn and $c = 3$ passed the tests. Estimate pass@$1$ and pass@$5$ with [[#eq-passk]] and with the plug-in estimator.
::: solution
pass@$1$: $1 - \binom{17}{1}/\binom{20}{1} = 1 - 17/20 = 0.15$, the same as $c/n$ (for $k = 1$ the two estimators coincide). pass@$5$: $\binom{17}{5} = 6188$ and $\binom{20}{5} = 15504$, so $1 - 6188/15504 = 0.6009$; the product form gives $1 - \frac{13}{18}\cdot\frac{14}{19}\cdot\frac{15}{20} = 1 - \frac{2730}{6840} = 0.6009$. The plug-in estimate is $1 - 0.85^5 = 0.5563$. They differ because the plug-in estimator is biased downwards, though for this particular sample the unbiased estimator is above the truth if the true $p$ happens to be $0.15$; unbiasedness is a property of the average over repetitions, which the listing below checks.
:::
:::

::: widget plot
f: 1 - (1 - p)^x; 1 - (1 - p/10)^x
x: 1, 200
y: 0, 1
sliders: p=0.15:0.01:0.6:0.01
labels: pass@$k$ for one problem, $1-(1-p)^k$; a problem ten times harder
caption: pass@$k$ against the number of samples $k$ for a problem with single-sample success probability $p$, and for one ten times harder. On a log scale of $k$ both curves are S-shaped; the hard problem needs about ten times as many samples to reach the same coverage. A benchmark mixes problems of all difficulties, so its pass@$k$ is an average of such curves — the origin of the slow, roughly log-linear growth of coverage studied in [[reasoning/test-time-scaling]].
:::

::: warning pass@k is not an accuracy you can deploy
pass@$k$ with large $k$ assumes an oracle that recognises the correct sample. For code with complete unit tests that oracle exists; for most other tasks it does not, and the realistic number is the accuracy of a *selection* method — voting or a verifier — which lies between pass@$1$ and pass@$k$. Reporting pass@$100$ next to another system's pass@$1$ compares different things. Report $k$, $n$, the temperature, and whether the selection step was available at test time.
:::

## Best-of-n with a verifier {#sec-verifier}

Between voting (no external signal) and pass@$k$ (a perfect oracle) lies selection with a learned **verifier**. Cobbe et al. (2021), introducing GSM8K, trained a generator on the training solutions, sampled $100$ solutions for each training problem, labelled each by whether its final answer was correct, and trained a verifier to predict that label from the problem and the solution. At test time they sampled $100$ solutions and returned the one the verifier scored highest. With this procedure a $6$-billion-parameter model outperformed a fine-tuned $175$-billion-parameter one, and the authors reported that verification gave about the same improvement as a $30$-fold increase in model size.

::: definition Best-of-n selection {#def-bon}
Given samples $y_1,\dots,y_n$ for input $x$ and a scoring function $r(x, y)$ (a verifier or reward model), **best-of-$n$** returns $y_{j^*}$ with $j^* = \arg\max_j r(x, y_j)$. **Verifier-weighted voting** returns $\arg\max_a\sum_j r(x,y_j)\,\mathbf 1[a_j = a]$.
:::

::: proposition Best-of-n is bounded by pass@n {#prop-bon}
For any scoring function, the probability that best-of-$n$ returns a correct sample is at most pass@$n$, with equality if the scoring function ranks every correct sample above every incorrect one.
:::

::: proof
Best-of-$n$ returns one of the $n$ samples, so it can be correct only if at least one sample is correct, an event of probability pass@$n$. If every correct sample outscores every incorrect one, the maximum is attained by a correct sample whenever one exists.
:::

The interesting case is an imperfect verifier. Each additional sample is another chance to include a correct solution, but also another chance to include a wrong solution that the verifier happens to score highly. As $n$ grows the first effect saturates (pass@$n\to1$) while the second keeps growing: the maximum of $n$ scores is pulled into the tail of whatever distribution scores best, and if any wrong solutions systematically fool the verifier, best-of-$n$ eventually finds them. Cobbe et al. observed exactly this: verifier-selected accuracy improved up to a few hundred samples per problem and then declined. It is a small instance of the reward over-optimisation discussed in [[post-training]]: optimising harder against an imperfect proxy eventually moves away from the true objective.

::: example A verifier that can be fooled {#ex-fool}
A generator is right with probability $0.3$. A verifier gives correct solutions a score distributed as $\mathcal N(2, 1)$ and wrong ones $\mathcal N(0, 1)$, except that $2\%$ of wrong solutions are "convincing" and score $\mathcal N(3.5, 1)$. Estimate best-of-$n$ accuracy for $n = 1, 16, 1024$.
::: solution
For $n = 1$ the verifier plays no role: accuracy $0.3$. For moderate $n$ the verifier mostly separates correct from ordinary wrong solutions; the listing below estimates $0.80$ at $n = 16$, against pass@$16 = 1 - 0.7^{16} = 0.997$. For large $n$, the expected number of convincing wrong solutions is $1024\cdot0.7\cdot0.02\approx14$, against about $307$ correct ones; the highest score now belongs to the best of $14$ draws from $\mathcal N(3.5, 1)$ or the best of $307$ from $\mathcal N(2,1)$, and the former wins about two times in three. The listing estimates $0.33$ — hardly better than one sample. A verifier with a rare blind spot is safe at small $n$ and dangerous at large $n$.
:::
:::

Verifiers have since taken many forms. An **outcome reward model** scores a whole solution; a **process reward model** scores every step, which both improves selection and enables search ([[reasoning/process-outcome-rewards]], [[reasoning/search]]). **Generative verifiers** are language models prompted or trained to judge a solution by writing their own reasoning and a verdict, and their judgements can themselves be sampled and voted on (Zhang et al., 2024). For free-form answers that cannot be compared for equality, **universal self-consistency** asks a model to pick the response most consistent with the others (Chen et al., 2023). And when an exact check exists — unit tests, a proof checker, substitution into an equation — the verifier is perfect for the property it checks, which is what makes reinforcement learning on such tasks possible ([[reasoning/verifiable-rewards]]).

::: quiz
A model is right with probability $0.45$ on every question of a benchmark, and its wrong answers are spread over many different values, none with probability above $0.1$. What happens as the number of self-consistency votes grows? (Select all that apply.)
- [x] Plurality voting converges to the correct answer.
- [ ] Voting makes accuracy decrease, because $0.45 < 1/2$.
- [x] The binary majority formula [[#eq-majority]] understates the accuracy of the plurality vote here.
- [ ] pass@$k$ is the accuracy that self-consistency achieves.
::: solution
The correct answer is the mode ($0.45 > 0.1$), so by [[#prop-mode]] the plurality vote converges to it. The Condorcet failure for $p < 1/2$ applies to a *binary* vote, where all wrong votes count together; here they split. pass@$k$ assumes an oracle and is an upper bound on any selection method.
:::
:::

## A numerical laboratory {#sec-code}

The listing checks three results of the chapter in plain Python: majority-vote accuracy for independent votes and for the mixture of [[#ex-hurt]] (exact and simulated), the unbiased pass@$k$ estimator against the plug-in estimator by simulation, and best-of-$n$ with the fallible verifier of [[#ex-fool]].

```python
import math, random
rng = random.Random(1)

def majority_exact(p, n):                      # n odd, independent votes
    return sum(math.comb(n, k) * p**k * (1 - p)**(n - k) for k in range(n // 2 + 1, n + 1))

# 1. Majority vote: independent votes vs a mixture of easy and hard questions
mix = [(0.6, 0.9), (0.4, 0.4)]                 # (fraction of questions, per-sample accuracy)
print("  n   indep p=0.7   mixture (mean 0.7)   simulated mixture")
for n in [1, 3, 5, 11, 25, 51, 101]:
    sim = 0
    for _ in range(20000):
        p = 0.9 if rng.random() < 0.6 else 0.4
        sim += sum(rng.random() < p for _ in range(n)) > n / 2
    exact_mix = sum(w * majority_exact(p, n) for w, p in mix)
    print(f"{n:3d}   {majority_exact(0.7, n):10.4f}   {exact_mix:18.4f}   {sim / 20000:17.4f}")

# 2. pass@k: unbiased estimator vs naive plug-in, on one problem with true p = 0.15
def pass_at_k(n, c, k):
    if n - c < k:
        return 1.0
    return 1.0 - math.prod(1 - k / i for i in range(n - c + 1, n + 1))

p, n, k, reps = 0.15, 20, 5, 100000
true = 1 - (1 - p)**k
unb = naive = 0.0
for _ in range(reps):
    c = sum(rng.random() < p for _ in range(n))
    unb += pass_at_k(n, c, k); naive += 1 - (1 - c / n)**k
print(f"\ntrue pass@{k} = {true:.4f}  unbiased mean = {unb / reps:.4f}  naive mean = {naive / reps:.4f}")
print(f"example n=20, c=3, k=5: {pass_at_k(20, 3, 5):.4f}  (comb form {1 - math.comb(17, 5) / math.comb(20, 5):.4f})")

# 3. Best-of-n with an imperfect verifier
# correct samples score N(2, 1); wrong ones N(0, 1), except 2% of wrong ones that fool it: N(3.5, 1)
def best_of_n(n, p=0.3, trials=4000):
    wins = 0
    for _ in range(trials):
        best, ok = -1e9, False
        for _ in range(n):
            if rng.random() < p:
                s, good = rng.gauss(2, 1), True
            else:
                s, good = (rng.gauss(3.5, 1) if rng.random() < 0.02 else rng.gauss(0, 1)), False
            if s > best:
                best, ok = s, good
        wins += ok
    return wins / trials
print("\n   n   pass@n (perfect verifier)   best-of-n (noisy verifier)")
for n in [1, 4, 16, 64, 256, 1024]:
    print(f"{n:4d}   {1 - 0.7**n:25.4f}   {best_of_n(n):26.4f}")
```

```text
  n   indep p=0.7   mixture (mean 0.7)   simulated mixture
  1       0.7000               0.7000              0.6996
  3       0.7840               0.7240              0.7227
  5       0.8369               0.7218              0.7210
 11       0.9218               0.6984              0.6976
 25       0.9825               0.6615              0.6621
 51       0.9986               0.6294              0.6250
101       1.0000               0.6084              0.6037

true pass@5 = 0.5563  unbiased mean = 0.5560  naive mean = 0.5180
example n=20, c=3, k=5: 0.6009  (comb form 0.6009)

   n   pass@n (perfect verifier)   best-of-n (noisy verifier)
   1                      0.3000                       0.3108
   4                      0.7599                       0.6583
  16                      0.9967                       0.8023
  64                      1.0000                       0.6985
 256                      1.0000                       0.5240
1024                      1.0000                       0.3252
```

The independent column climbs to $1$ as [[#thm-condorcet]] predicts, while the mixture with the same single-sample accuracy peaks at $n = 3$ and decays towards $0.6$, as [[#thm-mixture]] predicts; simulation and exact values agree to within sampling error (about $0.003$). The unbiased estimator averages to the true $0.5563$ within $0.0003$, while the plug-in estimator is low by almost four points — a bias that would make every model look worse at large $k$. Best-of-$n$ with the fallible verifier peaks near $n = 16$ and then falls back to roughly single-sample accuracy, although a perfect verifier would be right essentially always.

::: history
Condorcet (1785) proved that a majority of independent jurors, each more likely right than wrong, becomes almost certainly right as the jury grows; the correlated case has been studied in social choice since at least the 1980s. Ensembles and voting are old ideas in machine learning (bagging, Breiman 1996). For language models, Cobbe et al. (2021) trained verifiers to select among sampled GSM8K solutions, and Chen et al. (2021) introduced HumanEval and the unbiased pass@$k$ estimator with the Codex models. Wang et al. posted *Self-consistency improves chain of thought reasoning in language models* in March 2022 (ICLR 2023). Li et al. (2023) combined diverse prompts with verifier-weighted voting, Lightman et al. (2023) compared outcome and process verifiers for best-of-$n$, Chen et al. (2023) proposed universal self-consistency, and Zhang et al. (2024) trained generative verifiers. Brown et al. (2024) measured how coverage keeps growing with hundreds or thousands of samples, and how selection fails to keep up.
:::

::: summary
- **Self-consistency** samples $n$ reasoning paths and returns the plurality answer; the vote fractions estimate the **marginal** answer probability $p_\theta(a\mid x) = \sum_z p_\theta(z,a\mid x)$, so voting finds the mode of the marginal rather than the end of the most likely path.
- For independent binary votes, $P_{n+2} - P_n = \binom{2m+1}{m}(pq)^{m+1}(2p-1)$: majority accuracy rises to $1$ if $p > 1/2$ and falls to $0$ if $p < 1/2$ (**Condorcet**); the required $n$ grows like $(p - \frac12)^{-2}$.
- With question-level difficulty $P$, votes are correlated and majority accuracy tends to $\mu(P > \frac12)$, which can be *below* the single-sample accuracy $\E P$. Agreement is a relative signal, not a calibrated probability.
- **pass@$k$** $= 1 - (1-p)^k$; with $n$ samples and $c$ correct, $1 - \binom{n-c}k/\binom nk = 1 - \prod_{i=n-c+1}^{n}(1 - k/i)$ is unbiased, while the plug-in $1 - (1-c/n)^k$ underestimates.
- **Best-of-$n$** with a verifier is bounded by pass@$n$; an imperfect verifier can make accuracy fall as $n$ grows, because more samples include more wrong solutions that fool it.
:::

## Exercises

::: exercise Three votes {level=1 check="0.784"}
Each sample is correct with probability $0.7$, independently. What is the probability that the majority of $3$ samples is correct?
::: solution
$0.7^3 + 3\cdot0.7^2\cdot0.3 = 0.343 + 0.441 = 0.784$.
:::
:::

::: exercise pass@3 from ten samples {level=1 check="8/15"}
Ten samples were drawn for a problem and $2$ were correct. Compute the unbiased estimate of pass@$3$ as an exact fraction.
::: solution
$1 - \binom83/\binom{10}3 = 1 - 56/120 = 64/120 = 8/15\approx0.533$. Product form: $1 - (1 - 3/9)(1 - 3/10) = 1 - \frac23\cdot\frac7{10} = 1 - \frac{14}{30} = \frac{8}{15}$.
:::
:::

::: exercise The limit of a mixture {level=1 check="0.7"}
On $70\%$ of a benchmark's questions a model is right with probability $0.8$, and on the other $30\%$ with probability $0.3$. What is the limiting accuracy of majority voting? Is it above or below single-sample accuracy?
::: solution
By [[#thm-mixture]] the limit is $\mu(P > 1/2) = 0.7$. The single-sample accuracy is $0.7\cdot0.8 + 0.3\cdot0.3 = 0.65$, so here voting helps, by $5$ points in the limit.
:::
:::

::: exercise One step of Condorcet {level=2 check="0.03456"}
For $p = 0.6$, compute $P_5 - P_3$ with [[#eq-condorcet-step]] and check it against the direct values of $P_3$ and $P_5$.
::: solution
With $m = 1$: $\binom31(0.6\cdot0.4)^2(2\cdot0.6 - 1) = 3\cdot0.0576\cdot0.2 = 0.03456$. Directly, $P_3 = 0.216 + 0.432 = 0.648$ and $P_5 = 0.07776 + 0.2592 + 0.3456 = 0.68256$, and $0.68256 - 0.648 = 0.03456$.
:::
:::

::: exercise How many votes? {level=2 check="231"}
Using Hoeffding's bound $1 - P_n\le\exp(-2n(p - \frac12)^2)$, find the smallest odd $n$ that guarantees that a majority vote of independent samples with $p = 0.6$ is wrong with probability at most $0.01$.
::: solution
Require $\exp(-2n\cdot0.01)\le0.01$, that is $n\ge\ln(100)/0.02 = 230.26$. The smallest odd integer is $231$. The exact binomial calculation needs far fewer ($n = 133$), because Hoeffding's bound is conservative; the scaling with $(p - \frac12)^{-2}$ is nevertheless the right one.
:::
:::

::: exercise Plurality with spread errors {level=2 check="0.448"}
A model's answers are correct with probability $0.4$ and take each of three different wrong values with probability $0.2$. With $3$ samples and ties broken uniformly at random, what is the probability that the plurality vote is correct?
::: solution
The correct answer wins outright with at least $2$ correct votes: $3\cdot0.4^2\cdot0.6 + 0.4^3 = 0.288 + 0.064 = 0.352$. With exactly $1$ correct vote it can still tie for first if the two wrong votes differ: the probability that two wrong votes are equal is $3\cdot0.2^2/0.6^2 = 1/3$ given that both are wrong, so the probability of exactly one correct vote and two different wrong ones is $3\cdot0.4\cdot0.36\cdot\frac23 = 0.288$, and then a three-way tie is broken in favour of the correct answer with probability $1/3$, contributing $0.096$. Total $0.352 + 0.096 = 0.448$, above the binary majority value $0.352$.
:::
:::

::: exercise Jensen and the plug-in estimator {level=2}
Show directly that for $k = 2$ the plug-in estimator $1 - (1-\hat p)^2$ with $\hat p = c/n$ has expectation $1 - (1-p)^2 - p(1-p)/n$, and that the unbiased estimator [[#eq-passk]] for $k = 2$ equals $1 - \frac{(n-c)(n-c-1)}{n(n-1)}$.
::: solution
$\E(1-\hat p)^2 = (1 - \E\hat p)^2 + \Var\hat p = (1-p)^2 + p(1-p)/n$, using $\Var\hat p = p(1-p)/n$ for a binomial proportion. Hence $\E[1 - (1-\hat p)^2] = 1 - (1-p)^2 - p(1-p)/n$: biased downwards by exactly the variance of $\hat p$. For the unbiased estimator, $\binom{n-c}{2}/\binom n2 = \frac{(n-c)(n-c-1)}{n(n-1)}$. Its expectation can be checked with $\E[(n-c)(n-c-1)] = n(n-1)(1-p)^2$, the second factorial moment of the binomial count $n - c$ of failures.
:::
:::

::: exercise The best-of-n crossover {level=3}
In the verifier model of [[#ex-fool]], take the limit of very large $n$. The numbers of correct and of convincing wrong samples are then about $0.3n$ and $0.014n$, and the ordinary wrong samples no longer matter. (a) Find the limit of the probability that best-of-$n$ is correct, and explain it. (b) How would the conclusion change if convincing wrong solutions scored $\mathcal N(2, 1.5^2)$ — the same mean as correct ones but a larger spread?
::: solution
(a) For large $n$, best-of-$n$ is correct when the maximum of about $0.3n$ draws from $\mathcal N(2,1)$ exceeds the maximum of about $0.014n$ draws from $\mathcal N(3.5,1)$. The maximum of $M$ standard normals grows like $\sqrt{2\ln M}$, so the two maxima grow as $2 + \sqrt{2\ln(0.3n)}$ and $3.5 + \sqrt{2\ln(0.014n)}$. Their difference is $\sqrt{2\ln(0.3n)} - \sqrt{2\ln(0.014n)} - 1.5$, and $\sqrt{2\ln(an)} - \sqrt{2\ln(bn)} = \frac{2\ln(a/b)}{\sqrt{2\ln an} + \sqrt{2\ln bn}}\to0$, so the convincing group's head start of $1.5$ eventually dominates and the probability of a correct selection tends to $0$, slowly — the listing's $0.33$ at $n = 1024$ is on the way down. (b) With equal means but larger spread, the maximum of the wrong group grows like $2 + 1.5\sqrt{2\ln(0.014n)}$ against $2 + \sqrt{2\ln(0.3n)}$; the factor $1.5$ wins for large $n$, so again best-of-$n$ eventually prefers wrong solutions. Any wrong mode with heavier right tail than the correct solutions' score distribution is eventually selected.
:::
:::

::: exercise Implement plurality voting exactly {level=3}
Write a plain-Python function `plurality_accuracy(pi, n)` that computes exactly the probability that plurality voting over $n$ independent samples returns answer $0$, where `pi` is the list of answer probabilities (answer $0$ correct) and ties are broken uniformly at random. Check it on the distributions $(0.4, 0.35, 0.25)$ and $(0.4, 0.2, 0.2, 0.2)$ against the table in [[prompting-rag/prompt-design#ex-competitor]] for $n = 3$ and $n = 5$.
::: solution
Enumerate all vote-count vectors with the multinomial distribution:

```python
import math

def compositions(n, parts):
    if parts == 1:
        yield (n,); return
    for i in range(n + 1):
        for rest in compositions(n - i, parts - 1):
            yield (i,) + rest

def plurality_accuracy(pi, n):
    total = 0.0
    for counts in compositions(n, len(pi)):
        prob = math.factorial(n)
        for c, q in zip(counts, pi):
            prob *= q**c / math.factorial(c)
        top = max(counts)
        if counts[0] == top:
            total += prob / counts.count(top)     # random tie-break
    return total

for pi in [(0.4, 0.35, 0.25), (0.4, 0.2, 0.2, 0.2)]:
    print(pi, [round(plurality_accuracy(pi, n), 3) for n in (1, 3, 5, 11)])
```

```text
(0.4, 0.35, 0.25) [0.4, 0.422, 0.443, 0.493]
(0.4, 0.2, 0.2, 0.2) [0.4, 0.448, 0.509, 0.635]
```

These agree with the table. The number of count vectors is $\binom{n+K-1}{K-1}$ for $K$ answers, which is small for the sizes used here; for large $n$ a dynamic programme over answers is faster.
:::
:::
