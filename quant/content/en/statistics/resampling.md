The ordinary standard error of a mean divides by $\sqrt{n}$ because it treats the observations as independent draws. A return series is one path. Resampling asks what else that path could have looked like if it is rebuilt from its own pieces. Pieces of length one destroy runs. Pieces that are blocks keep the runs that fit inside a block. Neither procedure can invent a return that the path never contained, and neither procedure is a decision to trade.

The $\sqrt{n}$ scaling itself is the conclusion of the central limit theorem under an independent, finite-variance model. The proof is in the Maths Atlas, in [limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems). This chapter does not prove it, and it does not pretend that a histogram of bootstrap means is that theorem. The bootstrap is a different construction: it resamples one observed series.

## Draws of length one

:::definition i.i.d. bootstrap sample {#def-iid-boot}
Let $x_1,\ldots,x_n$ be the observed series. An **i.i.d. bootstrap sample** is a sequence $X_1^\star,\ldots,X_n^\star$ in which each coordinate is drawn independently and uniformly from $\{x_1,\ldots,x_n\}$, with replacement. The bootstrap law, written $\E^\star$, $\Var^\star$ and $\Corr^\star$, is the law of these draws with the observed numbers held fixed. It is a probability model on rearrangements and repetitions of the sample. It is not a model of a new year of prices.
:::

The bootstrap mean $\bar X^\star = n^{-1}\sum_{t=1}^n X_t^\star$ is the statistic people compare with $\bar x$. Its bootstrap expectation is not a new fact about the market. It is an identity.

:::proposition Bootstrap mean and bootstrap correlation {#prop-iid}
Under [[#def-iid-boot]], $\E^\star[X_t^\star] = \bar x$ for each $t$, and therefore $\E^\star[\bar X^\star] = \bar x$. If the observed values are not all equal, then for $t \neq s$

$$
\Corr^\star(X_t^\star, X_s^\star) = 0.
$$

In particular the bootstrap law has lag-1 correlation zero, whether or not the original series does.
:::

:::proof
A single draw is uniform on the $n$ observed values, so

$$
\E^\star[X_t^\star] = \frac{1}{n}\sum_{i=1}^n x_i = \bar x.
$$

The bootstrap mean is the average of $n$ such draws, and expectation passes inside the average, so $\E^\star[\bar X^\star] = \bar x$. This does not require the $x_i$ to be distinct.

Distinct coordinates are independent by the definition of the i.i.d. bootstrap. Independence of two random variables with finite variances implies that their covariance is zero. The bootstrap variance of one coordinate is

$$
\Var^\star(X_t^\star) = \frac{1}{n}\sum_{i=1}^n (x_i - \bar x)^2,
$$

which is the variance of the discrete uniform distribution on the sample, divisor $n$ rather than $n-1$. If the observed values are not all equal this variance is positive. The correlation of two distinct coordinates is a zero covariance divided by a positive product of standard deviations, hence zero. The original series may have a large sample lag-1 correlation. The bootstrap law has just set the correlation of every pair of positions to zero. One finite resample will not have sample correlation exactly zero; it wobbles around a law whose correlation is zero. The wobble is the next example. The law is the proposition.
:::

This is why an i.i.d. bootstrap cannot represent a series whose lag-1 correlation is the object of interest. The world the bootstrap samples from has been built with that correlation equal to zero. Using it to form an interval for a mean is a statement that the dependence may be ignored for that particular statistic, or that there is no dependence. [[statistics/stationarity-and-regimes]] is full of series for which the second statement is false, even when the signed lag-1 correlation is itself near zero, because absolute returns can still cluster. An interval that assumes the clustering away is an interval for a different problem.

:::quiz
The observed series has sample lag-1 correlation $0.720887$, and the eight values are not all equal. What is $\Corr^\star(X_t^\star, X_{t-1}^\star)$ under the i.i.d. bootstrap law?
- [ ] $0.720887$, because the bootstrap copies the sample.
- [x] $0$, because distinct draws are independent and the bootstrap variance is positive.
- [ ] $-0.016687$, because that is the correlation of the seed-$61$ resample.
- [ ] $1$, because each draw is taken from the same sample.
:::solution
[[#prop-iid]] sets the correlation of distinct positions to zero whenever the observations are not all equal. The sample correlation $0.720887$ describes the original order. The number $-0.016687$ is one finite resample, which is allowed to miss the law. Drawing from one sample does not force the correlation of two independent coordinates to be $1$.
:::
:::

## Blocks

A block is a consecutive piece of the original path. Copying the piece copies the dependence inside it.

:::definition Overlapping block {#def-block}
Let $\ell$ be an integer with $1 \le \ell \le n$. The **overlapping block** of length $\ell$ starting at index $i$, for $i = 1,\ldots, n-\ell+1$, is the segment $(x_i, x_{i+1}, \ldots, x_{i+\ell-1})$. There are $M = n - \ell + 1$ such blocks. They overlap. The observation $x_1$ sits in only the first block. An observation in the middle sits in up to $\ell$ blocks. For $\ell = 1$ the blocks are the original points and $M = n$, which is the i.i.d. bootstrap's deck of cards.
:::

:::algorithm Moving-block bootstrap {#alg-block}
Given the series, a block length $\ell$, and a desired sample length $n$:

1. Form the $M = n - \ell + 1$ overlapping blocks of [[#def-block]].
2. Draw starting indices independently and uniformly from the $M$ possible starts, with replacement. Draw $\lceil n/\ell \rceil$ of them.
3. Concatenate the chosen blocks in the order drawn.
4. Keep the first $n$ observations of the concatenation. If $\ell$ divides $n$, step 2 draws exactly $n/\ell$ blocks and nothing is trimmed.
5. Compute the statistic on that concatenation. A new draw of the starting indices gives a new bootstrap sample.

The joins between blocks are not original neighbours. Dependence that lives further apart than $\ell$ is not copied. The block length is a choice, and trying several lengths because one of them produced a flattering interval is a search, in the sense of [[statistics/testing-and-snooping]].
:::

One property of a single block is exact, and it is the reason the block length is not a cosmetic parameter.

:::proposition A random consecutive pair keeps the sample correlation {#prop-pair}
Let $\ell = 2$, so $M = n - 1$ and the blocks are exactly the consecutive pairs of the series. Draw one start uniformly. Let $(Y, Z)$ be the two observations in the chosen block. If the sample lag-1 correlation of the series exists, then the correlation of $(Y, Z)$ under this draw equals that sample lag-1 correlation.
:::

:::proof
A uniform start puts mass $1/M$ on each consecutive pair $(x_i, x_{i+1})$. The correlation of a discrete uniform distribution on a fixed list of points is the ordinary sample correlation of that list: the means, the products of centred coordinates, and the two sums of squares are the same sums that appear in the sample lag-1 correlation, and the divisor $M$ cancels between covariance and variances. Therefore $\Corr(Y, Z)$ under the random block equals the sample lag-1 correlation of $x$. If that sample correlation is positive, the law of one block of length $2$ has the same positive correlation. [[#prop-iid]] says the law of two i.i.d. bootstrap draws has correlation zero. The two procedures are not small variations of each other. They encode opposite answers to the question "do neighbours stay together?".

The concatenation in [[#alg-block]] is less tidy than a single block. Inside a block, neighbours are original neighbours. Across a join, the two observations come from independently drawn blocks, and that pair behaves like an i.i.d. draw. A longer concatenation dilutes the sample correlation with those joins. Choosing $\ell = n$ copies the whole series and makes no joins, and also makes no new samples. The block length is a compromise between copying the dependence and having more than one distinct resample. The proposition is the $\ell = 2$ case of the copying half.
:::

There is an edge effect on the mean, and it should not be waved through. Because the middle of the series sits in more overlapping blocks than the ends do, the average of the $M$ block means is not exactly $\bar x$. For the series in the example below, with $n = 8$ and $\ell = 2$, each position appears in $1, 2, 2, 2, 2, 2, 2, 1$ blocks, the sample mean is $0.0235$, and the average of the seven block means is $0.163/7 \approx 0.023286$. The gap is about $0.000214$. A circular block bootstrap, which wraps the series so that every position sits in exactly $\ell$ blocks, removes this particular gap. This chapter uses the plain overlapping blocks of [[#alg-block]] and does not call their means unbiased. The i.i.d. case is unbiased, by [[#prop-iid]]. The block case is close, on this series, and it is not exact.

The procedure also cannot see outside the sample.

:::proposition Support of a resample {#prop-support}
Every coordinate of an i.i.d. bootstrap sample, and every coordinate of a moving-block bootstrap sample, equals one of the original observations $x_1,\ldots,x_n$. A number that is not among those $n$ values is not in the support of either resample.
:::

:::proof
By [[#def-iid-boot]], each i.i.d. coordinate is drawn from $\{x_1,\ldots,x_n\}$. By [[#alg-block]], each block is a segment of the original series, and the concatenation is made of those segments. A coordinate in the concatenation is some $x_i$. Neither construction adds a shock, extrapolates a tail, or inserts a regime that contributed no observation. If every observed return lies in an interval $[m, M]$, every resampled return lies in $[m, M]$.
:::

This is the sense in which a bootstrap interval does not cover a break that has not happened yet. The interval is a function of the observed path. A future return outside the observed set of values is invisible to both resamples. Even a future return that equals some past value, but arrives in a configuration the blocks cannot represent — a run longer than $\ell$ of a kind that never occurred — is not something the block draw knows how to build, except by an accidental join. The interval is a description of the sampling variation of a statistic under a stated rearrangement of one path. It is not a probability that the next regime stays inside the last one.

:::quiz
The observed returns are $0.01$, $0.00$, $-0.01$ and $0.02$. Which number can appear as a coordinate of a moving-block bootstrap sample?
- [ ] $-0.10$, if the block length is long enough to reach a later crash.
- [ ] $0.05$, because a block mean may land between the observations.
- [x] $-0.01$, because it is one of the original observations.
- [ ] $0.0235$, because every resampled coordinate equals the sample mean.
:::solution
[[#prop-support]] says every resampled coordinate equals one of the original observations. Among the four choices, only $-0.01$ is in the observed set. A longer block is still a piece of the observed path, so it cannot contain $-0.10$. A block mean is a statistic computed afterwards; it is not a coordinate of the resample. The sample mean is not one of the four observations.
:::
:::

## One seeded path

The series in this section is invented. Call it a short return path with two scales, not a price path:

$$
x = (0.005,\ 0.004,\ 0.006,\ 0.003,\ 0.040,\ 0.035,\ 0.050,\ 0.045).
$$

There are $n = 8$ observations. Their sum is $0.188$, so the sample mean is $0.188/8 = 0.0235$. The sample lag-1 correlation, in the pair sense of [[statistics/moments-and-dependence]], is $0.720887$. Neighbours look alike: four small returns, then four larger ones. The series was built that way so that a single resample can show the i.i.d. draw tearing the likeness apart.

The draws below come from NumPy's `numpy.random.default_rng`, version $2.3.3$, seeded with $61$. The i.i.d. indices are one call to `integers(0, 8, size=8)` on that generator. The block starts are a separate generator, seeded again with $61$, calling `integers(0, 7, size=4)`, because $M = 7$ when $\ell = 2$ and four blocks of length $2$ make a series of length $8$. Indices are $0$-based, matching the generator. The resampled values are listed, so the means can be checked without the generator.

:::example One i.i.d. draw and one block draw {#ex-seed}
The i.i.d. indices are $3, 2, 6, 6, 3, 5, 5, 5$. The block starts are $2, 2, 5, 5$. Write out both resamples, compute both means, and compute both sample lag-1 correlations.
:::solution
Index $3$ of $x$ is $0.003$, index $2$ is $0.006$, index $6$ is $0.050$, index $5$ is $0.035$. The i.i.d. resample is

$$
0.003,\ 0.006,\ 0.050,\ 0.050,\ 0.003,\ 0.035,\ 0.035,\ 0.035.
$$

Its sum is $0.217$ and its mean is $0.217/8 = 0.027125$. Its sample lag-1 correlation is $-0.016687$. The original correlation was $0.720887$. One i.i.d. draw has knocked it down to a number indistinguishable from zero at the precision of eight points. That is [[#prop-iid]] showing itself in a single sample: the law has correlation zero, and this draw landed close to the law. A different seed would wobble elsewhere. The proposition is about the law, and the example is one draw from it, fixed by the seed so that the arithmetic can be repeated.

The $0$-based start $2$ is the block $(x_3, x_4) = (0.006, 0.003)$ in $1$-based language. The start $5$ is $(x_6, x_7) = (0.035, 0.050)$. Drawing those starts in the order $2, 2, 5, 5$ concatenates

$$
0.006,\ 0.003,\ 0.006,\ 0.003,\ 0.035,\ 0.050,\ 0.035,\ 0.050.
$$

The sum is $0.188$ and the mean is $0.188/8 = 0.0235$, the same as the original mean on this particular draw, not by the unbiasedness identity, which does not hold exactly for overlapping blocks. The sample lag-1 correlation of the concatenation is $0.718163$. It is close to the original $0.720887$. Inside each block the original neighbours were copied, which is [[#prop-pair]]. The joins, of which this draw has three, happened not to destroy the correlation. They were not obliged to be so kind. A block length of $2$ on a series whose dependence is a single break in the middle can still mix the two halves when a start falls on the break. Here the starts $2$ and $5$ fell inside the halves, and the repeated blocks reproduced them.

The comparison the seed was chosen to make readable is the pair of correlations: about $0.72$ in the original, about $0.72$ in the block resample, and about $0$ in the i.i.d. resample. The comparison of means, $0.0235$ against $0.027125$ against $0.0235$, is real and is not the point. Both procedures are aimed at a mean in this example only because a mean is easy to add. The i.i.d. procedure's damage is to the dependence, which a mean does not record.
:::
:::

:::example The seven block means {#ex-edge}
For the same series and $\ell = 2$, list the seven overlapping block means and average them.
:::solution
The blocks and their means are

| start ($0$-based) | block | mean |
|---:|---|---:|
| $0$ | $0.005, 0.004$ | $0.0045$ |
| $1$ | $0.004, 0.006$ | $0.0050$ |
| $2$ | $0.006, 0.003$ | $0.0045$ |
| $3$ | $0.003, 0.040$ | $0.0215$ |
| $4$ | $0.040, 0.035$ | $0.0375$ |
| $5$ | $0.035, 0.050$ | $0.0425$ |
| $6$ | $0.050, 0.045$ | $0.0475$ |

The sum of the seven means is $0.163$, and $0.163/7 = 0.0232857\ldots$, which is $0.023286$ to six decimals. The sample mean of the eight observations is $0.0235$. The difference is the edge effect: the first and last observations sit in one block each, and the six middle observations sit in two. The block that crosses the break, start $3$, is the one whose mean $0.0215$ mixes a small return with a large one. A bootstrap that draws this start is copying the break, not the interior of either regime. Averaging all seven block means weights that crossing block equally with the others. It is not a particularly good estimator of anything. It is evidence that "draw overlapping blocks" is not a synonym for "draw an unbiased copy of the sample mean".
:::
:::

:::example A return the resample cannot produce {#ex-support}
The observed returns are $0.01, 0.00, -0.01, 0.02$. A later date produces the return $-0.10$. Show that neither an i.i.d. bootstrap sample nor a moving-block bootstrap sample from the four observations can contain $-0.10$. What is the smallest number that can appear?
:::solution
The observed set is $\{0.01,\ 0.00,\ -0.01,\ 0.02\}$. By [[#prop-support]], every resampled coordinate is one of these four numbers. The value $-0.10$ is not among them, so it has probability zero under both bootstrap laws. The smallest observable resampled value is the smallest observation, $-0.01$.

An interval formed from bootstrap means of these four points lives inside the range of averages of $\{0.01, 0.00, -0.01, 0.02\}$. That interval can be wide, because the sample is short. It does not become an interval about $-0.10$. A break that has not happened in the sample is outside the support, however long one resamples. Block length does not help: a block is a piece of a path that never contained $-0.10$. This is a limitation of the method, not a defect in the seed. Walk-forward folds taken from the same path, discussed in [[validation/walk-forward]], share the limitation. They rearrange and withhold pieces of one history. They do not add the crash that the history omitted.
:::
:::

:::example What the i.i.d. law does to a positive correlation {#ex-law}
The series $x$ has sample lag-1 correlation $0.720887$. Without drawing a sample, state the lag-1 correlation of the i.i.d. bootstrap law, and state the correlation of one uniformly chosen overlapping block of length $2$.
:::solution
[[#prop-iid]] gives $\Corr^\star(X_t^\star, X_{t-1}^\star) = 0$ for the i.i.d. law, because distinct draws are independent and the eight numbers are not all equal, so the bootstrap variance is positive. [[#prop-pair]] gives the correlation of a uniformly chosen consecutive pair as the sample lag-1 correlation of $x$, which is $0.720887$. The two answers, $0$ and $0.720887$, are properties of two laws. [[#ex-seed]] is one draw from each procedure, in which the realised sample correlations were $-0.016687$ and $0.718163$. The realised numbers are allowed to miss the laws. On this seed they did not miss by much.
:::
:::

:::widget clt
dist: exponential
n: 10
samples: 2000
caption: Sample means of independent draws from an exponential population, against the normal curve the central limit theorem predicts. The theorem is proved in the Maths Atlas and is not proved here. A block bootstrap of one return path is not this picture.
:::

The widget draws independent copies from a population. The bootstrap draws copies from a sample. The normal curve drawn on top of the widget is the central limit theorem's approximation for a mean of independent terms. It is a statement about a triangular array of independent models as $n$ grows. It is not a statement about the concatenation of blocks from a single financial path, and this chapter supplies no proof of it. When the path has volatility clustering, the relevant variance of a mean is not $\sigma^2/n$ for the marginal $\sigma^2$. Dependence changes the variance of the sum. A block bootstrap is one attempt to let the sample carry that change, inside the blocks, without writing down a variance formula. It succeeds only to the extent that the blocks look like the dependence one will face again. [[#prop-support]] is the hard stop on that sentence.

:::warning The interval conditions on one history
A bootstrap percentile interval reports the spread of a statistic across resamples of the observed series. It does not report the probability of a regime that contributed no observations. It does not undo a search: if the series itself is the profit-and-loss of the best of twenty rules, resampling that series treats the winner as if it had been pre-specified. The fix for the search is to put the search inside the resample, which is the idea of White's reality check in [[statistics/testing-and-snooping]], not to bootstrap the winner alone and call the interval honest. Choosing $\ell$ after seeing the interval is a further search.
:::

:::intuition Length one against length $\ell$
An i.i.d. draw asks the sample which values occurred, and then forgets the order. A block draw asks which short paths occurred. [[#ex-seed]] is the same eight numbers under both questions. The means moved a little. The lag-1 correlations did not: one of them was destroyed and the other was kept. A research claim about a mean, in a series one is genuinely willing to call weakly dependent, may survive the i.i.d. simplification. A research claim about persistence, of the kind [[trend/the-trend-hypothesis]] names, does not even get a hearing under [[#prop-iid]], because the bootstrap law has set the correlation to zero before any interval is formed.
:::

:::application What the interval is for
Used carefully, a block bootstrap interval is a way to attach a sampling spread to a pre-specified statistic — a mean, a lag-1 correlation, a Sharpe ratio whose definition was fixed in advance — when the dependence is local and the block length is long enough to cover it and short enough to leave more than one block. The spread is conditional on the observed path. It widens a claim. It does not confirm the claim against a different decade, a different universe, or a different cost. A walk-forward test withholds a later slice of the same path, which answers a different question: whether a rule frozen on the earlier slice still scores on the later slice. Both are one-history procedures. Saying so is part of reporting them.
:::

:::remark The seed is part of the example, not part of the method
The indices $3, 2, 6, 6, 3, 5, 5, 5$ and the starts $2, 2, 5, 5$ are one draw. Another seed produces another pair of series. The propositions are the part that does not depend on the seed. Quoting $0.027125$ as "the" i.i.d. bootstrap mean of this series would be the same mistake as quoting one backtest path as a parameter. It is the mean of the resample that this seed happened to draw. The bootstrap expectation of that mean, under the i.i.d. law, is $0.0235$, by [[#prop-iid]], and no seed is required for that identity.
:::

:::history
In 2000 Halbert White gave a bootstrap test of whether the best rule in a large catalogue beats a benchmark, once the search itself is taken into account. The resampling in that test is a resampling of dates, with every rule's result on a date kept together, so that the maximum is recomputed inside each resample. The i.i.d. and block constructions in this chapter are the simpler objects underneath: how a single series is rebuilt, and what rebuilding does to a lag. White's test is not a library backtest, it has not been run on the invented series above, and it does not promote the series with mean $0.0235$ into a rule.
:::

## Where this leads

The hypothesis that a positive dependence at an intermediate horizon is a fact about markets, rather than a fact about one bootstrap world, is [[trend/the-trend-hypothesis]]. Holding out a later slice of a single history, which a bootstrap does not do, is [[validation/walk-forward]]. The probability of at least one false rejection, which a bootstrap of a winner does not remove, is [[statistics/testing-and-snooping]]. Regimes, and the warning that a block drawn in calm weather contains no stress that was never observed, are [[statistics/stationarity-and-regimes]].

:::summary
- An i.i.d. bootstrap sample draws observations independently from the empirical set. Its expectation of the sample mean equals the sample mean. Its correlation between distinct positions is zero.
- An overlapping block of length $\ell$ is a consecutive segment. There are $n - \ell + 1$ of them. The moving-block bootstrap concatenates randomly chosen blocks and trims to length $n$.
- One uniformly chosen block of length $2$ has correlation equal to the sample lag-1 correlation. The i.i.d. law has correlation zero. The two procedures disagree about neighbours.
- On the invented eight-point series, mean $0.0235$ and lag-1 correlation $0.720887$, seed $61$ gave an i.i.d. mean $0.027125$ with correlation $-0.016687$, and a block mean $0.0235$ with correlation $0.718163$.
- Overlapping blocks weight the middle of the sample more than the ends. On this series the average of the seven block means is about $0.023286$, not $0.0235$.
- Every resampled coordinate is an observed value. A break that has not happened is outside the support of the interval.
- The central limit theorem's normal curve is a different theorem, proved elsewhere, about independent draws. It is not a proof of a bootstrap interval.
:::

## Exercises

:::exercise Bootstrap expectation of a mean {#exr-mean level=1 check="3"}
The observed sample is $1, 3, 5$. What is $\E^\star[\bar X^\star]$ under the i.i.d. bootstrap? (Enter the expectation.)
:::solution
By [[#prop-iid]] the bootstrap expectation of the resampled mean equals the sample mean. The sample mean is $(1+3+5)/3 = 3$. The expectation is $3$.
:::
:::

:::exercise How many blocks {#exr-count level=1 check="7"}
A series has length $8$ and the block length is $2$. How many overlapping blocks are there? (Enter the count.)
:::solution
[[#def-block]] gives $M = n - \ell + 1 = 8 - 2 + 1 = 7$. There are $7$ overlapping blocks.
:::
:::

:::exercise The seeded i.i.d. mean {#exr-iidmean level=1 check="0.027125"}
The i.i.d. resample in [[#ex-seed]] is $0.003, 0.006, 0.050, 0.050, 0.003, 0.035, 0.035, 0.035$. Compute its mean. (Enter the mean.)
:::solution
The sum is $0.003 + 0.006 + 0.050 + 0.050 + 0.003 + 0.035 + 0.035 + 0.035 = 0.217$. The mean is $0.217/8 = 0.027125$. The mean is $0.027125$.
:::
:::

:::exercise The seeded block mean {#exr-blockmean level=2 check="0.0235"}
The block concatenation in [[#ex-seed]] is $0.006, 0.003, 0.006, 0.003, 0.035, 0.050, 0.035, 0.050$. Compute its mean. (Enter the mean.)
:::solution
The sum is $0.006 + 0.003 + 0.006 + 0.003 + 0.035 + 0.050 + 0.035 + 0.050 = 0.188$. The mean is $0.188/8 = 0.0235$. The mean is $0.0235$, equal to the original sample mean on this draw.
:::
:::

:::exercise How many blocks to draw {#exr-k level=2 check="4"}
A series of length $12$ is to be rebuilt by the moving-block bootstrap with $\ell = 3$, and $3$ divides $12$. How many blocks does [[#alg-block]] draw? (Enter the count.)
:::solution
Because $\ell$ divides $n$, the algorithm draws $n/\ell = 12/3 = 4$ blocks, and the concatenation already has length $12$. It draws $4$ blocks.
:::
:::

:::exercise An endpoint {#exr-end level=2 check="1"}
For $n = 8$ and $\ell = 2$, in how many overlapping blocks does the first observation appear? (Enter the count.)
:::solution
A block of length $2$ contains the first observation only if it starts at the first observation. Every later start begins at the second observation or after. The first observation appears in $1$ block. The appearance counts along the whole series are $1, 2, 2, 2, 2, 2, 2, 1$.
:::
:::

:::exercise Why the i.i.d. correlation is zero {#exr-corr level=3}
Prove that under [[#def-iid-boot]], if the observed values are not all equal, the bootstrap correlation of two distinct coordinates is zero.
:::hint
Distinct draws are independent by construction. Independence gives a zero covariance. The denominator of the correlation is positive precisely because the values are not all equal. Do not confuse this population correlation under the bootstrap law with the sample correlation of one resample.
:::
:::solution
Fix $t \neq s$. The coordinates $X_t^\star$ and $X_s^\star$ are independent and each has the discrete uniform distribution on the observed sample, so each has expectation $\bar x$ and variance $n^{-1}\sum_i (x_i - \bar x)^2$. Independence implies $\Cov^\star(X_t^\star, X_s^\star) = 0$. The variance is positive because not all $x_i$ are equal: otherwise every squared deviation would be zero. The correlation is therefore $0/(\text{positive number}) = 0$. This is the lag-1 case of [[#prop-iid]] as well as every other lag. It does not say that a single resample of length $n$ has sample correlation exactly zero. [[#ex-seed]] landed at $-0.016687$, which is a sample correlation under a law whose correlation is zero.
:::
:::

:::exercise Outside the support {#exr-support level=3 check="-0.01"}
The observed returns are $0.01, 0.00, -0.01, 0.02$. What is the smallest value that can appear as a coordinate of an i.i.d. or moving-block bootstrap sample? (Enter that value.)
:::hint
[[#prop-support]] says every resampled coordinate is a copy of an observed return. The smallest coordinate in a resample is therefore the smallest observation, not a number beyond it.
:::
:::solution
The observed values are $0.01$, $0.00$, $-0.01$ and $0.02$. The smallest is $-0.01$. A bootstrap coordinate equals one of the four, so it cannot be smaller than $-0.01$, and it can equal $-0.01$ whenever that observation is the one drawn, or the block that contains it is the block drawn. A hypothetical later return of $-0.10$ is outside the support. The smallest value that can appear is $-0.01$.
:::
:::
