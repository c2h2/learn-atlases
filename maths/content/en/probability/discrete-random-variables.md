A student sits a multiple-choice test of $20$ questions, each with four options, and guesses every answer at random. How many questions should they expect to get right, how much will the score vary, and what is the chance of scraping a pass with $10$ or more? We could answer by listing the $4^{20}$ possible answer sheets, but the question is really about a single number attached to each outcome, the score, and about how likely each value of that number is.

A number determined by the outcome of a random experiment is called a **random variable**. Random variables let us move from events to quantities: instead of asking whether something happens we ask how much, how many or how long. This chapter treats random variables that take a finite or countable set of values. We define their distributions, their **expectation** (the long-run average value) and their **variance** (the typical size of fluctuations around it), and meet the four distributions that appear again and again: Bernoulli, binomial, geometric and Poisson. (The answers for the guessing student, worked out in [[#ex-guessing]]: on average $5$ right, with a standard deviation of about $1.9$, and a chance of only $1.4\%$ of reaching $10$.)

## Random variables and their distributions {#random-variables}

::: definition Random variable {#def-random-variable}
Let $(\Omega, \mathcal{F}, \Prob)$ be a probability space. A **random variable** is a function $X\colon \Omega \to \R$ such that $\{\omega \in \Omega : X(\omega) \le x\} \in \mathcal{F}$ for every $x\in\R$. It is **discrete** if there is a finite or countable set $S \subset \R$ with $\Prob(X \in S) = 1$.
:::

The technical condition guarantees that statements such as "$X \le 3$" are events, so that they have probabilities; it holds automatically when $\Omega$ is countable and $\mathcal{F}$ contains all subsets, and you may safely ignore it in this chapter (it is the notion of a **measurable function** of [[measure-theory/measurable-functions]]). We write $\{X = x\}$ for the event $\{\omega : X(\omega) = x\}$, $\{X \in A\}$ for $\{\omega : X(\omega)\in A\}$, and so on, and abbreviate $\Prob(\{X = x\})$ to $\Prob(X = x)$.

Random variables are usually denoted by capital letters and their possible values by lower-case letters. For example, when two dice are rolled, $X(i, j) = i + j$ (the total) and $M(i,j) = \max(i,j)$ are random variables on $\Omega = \{1,\ldots,6\}^2$. Another indispensable example: for any event $A$, the **indicator** $\mathbf{1}_A$ is the random variable equal to $1$ if $A$ occurs and $0$ otherwise.

::: definition Probability mass function and distribution function {#def-pmf}
The **probability mass function** (pmf) of a discrete random variable $X$ is

$$
p_X(x) = \Prob(X = x) \qquad (x \in \R),
$$

and its (cumulative) **distribution function** (cdf) is $F_X(x) = \Prob(X\le x)$.
:::

A pmf is non-negative, is non-zero only at countably many points, and satisfies $\sum_x p_X(x) = 1$, since the events $\{X = x\}$, $x \in S$, are disjoint and their union has probability $1$. By countable additivity, probabilities of all events involving $X$ follow from the pmf:

$$
\Prob(X \in A) = \sum_{x\in A} p_X(x).
$$ {#eq-pmf-sum}

In particular $F_X(x) = \sum_{t\le x} p_X(t)$ is a step function, jumping by $p_X(x)$ at each possible value $x$. The collection of probabilities $\Prob(X\in A)$ is called the **distribution** (or **law**) of $X$; two random variables with the same pmf have the same distribution, even if they are defined on different sample spaces.

::: example The larger of two dice {#ex-max-dice}
Two fair dice are rolled and $M$ is the larger of the two scores. Find the pmf of $M$.
::: solution
It is easiest to go through the distribution function. $M \le k$ means that *both* dice show at most $k$, which happens for $k^2$ of the $36$ outcomes. So $\Prob(M\le k) = k^2/36$ for $k = 1, \ldots, 6$, and

$$
\Prob(M = k) = \Prob(M\le k) - \Prob(M \le k-1) = \frac{k^2 - (k-1)^2}{36} = \frac{2k-1}{36}.
$$

The values $\tfrac{1}{36}, \tfrac{3}{36}, \tfrac{5}{36}, \tfrac{7}{36}, \tfrac{9}{36}, \tfrac{11}{36}$ add up to $1$, as they must. Large maxima are much more likely than small ones: $M = 6$ unless both dice avoid six.
:::
:::

If $g$ is a function and $X$ a random variable, then $Y = g(X)$ is again a random variable, and its pmf is obtained by collecting the values of $x$ that $g$ sends to the same $y$:

$$
p_Y(y) = \Prob(g(X) = y) = \sum_{x : g(x) = y} p_X(x).
$$ {#eq-function-pmf}

## Expectation {#expectation}

If you play a game many times, winning $x$ with probability $p_X(x)$ each time, your average winnings per game should be close to $\sum_x x\,p_X(x)$: the value $x$ turns up in a fraction of about $p_X(x)$ of the games. This weighted average is the expectation. (That averages really do settle down to it is the law of large numbers, proved in [[probability/limit-theorems]].)

::: definition Expectation {#def-expectation}
The **expectation** (expected value, mean) of a discrete random variable $X$ is

$$
\E X = \sum_x x\,p_X(x),
$$ {#eq-expectation}

provided the sum converges absolutely, that is, $\sum_x \lvert x\rvert\, p_X(x) < \infty$. Otherwise $X$ has no (finite) expectation.
:::

Absolute convergence ensures that the value does not depend on the order in which the possible values are listed ([[calculus-2/convergence-tests]]). For a fair die, $\E X = \tfrac16(1+2+\dots+6) = \tfrac72$, a value the die never shows: the expectation is an average, not a typical value. For an indicator, $\E\mathbf{1}_A = 1\cdot\Prob(A) + 0 \cdot \Prob(A^c) = \Prob(A)$, a small identity with large consequences in [[probability/expectation]].

::: remark The St Petersburg paradox
Expectations can fail to exist. A fair coin is tossed until it shows heads; if this takes $k$ tosses, you win $2^k$ pounds. The win is $2^k$ with probability $2^{-k}$, so $\sum_k 2^k\cdot 2^{-k} = 1 + 1 + 1 + \cdots$ diverges and the game has infinite expected value. Yet few people would pay even £50 to play. The puzzle was posed by Nicolaus Bernoulli in 1713, and Daniel Bernoulli's 1738 resolution, published by the St Petersburg Academy, introduced the idea that the *utility* of money grows more slowly than the amount.
:::

To find the expectation of $g(X)$ we do not need the pmf of $g(X)$ first.

::: theorem Expectation of a function of a random variable {#thm-lotus}
Let $X$ be discrete and $g\colon\R\to\R$. Then

$$
\E\,g(X) = \sum_x g(x)\,p_X(x),
$$ {#eq-lotus}

whenever the sum converges absolutely.
:::

::: proof
Let $Y = g(X)$. Using [[#eq-function-pmf]] and then the fact that $g(x) = y$ in the inner sum,

$$
\E Y = \sum_y y\,p_Y(y) = \sum_y \sum_{x:\, g(x) = y} y\,p_X(x) = \sum_y \sum_{x:\, g(x) = y} g(x)\,p_X(x) = \sum_x g(x)\,p_X(x).
$$

The last step regroups the terms: every $x$ belongs to exactly one inner sum, the one with $y = g(x)$. The same computation with $\lvert g\rvert$ in place of $g$ (all terms non-negative) shows that $\sum_y \lvert y\rvert p_Y(y) = \sum_x \lvert g(x)\rvert p_X(x) < \infty$, so $\E Y$ exists and the rearrangement is legitimate.
:::

This result is sometimes called the *law of the unconscious statistician*, because it is so natural that people use it without noticing that it needs proof. Taking $g(x) = ax + b$ gives

$$
\E(aX + b) = \sum_x (ax + b)\,p_X(x) = a\sum_x x\,p_X(x) + b\sum_x p_X(x) = a\,\E X + b.
$$ {#eq-linear-one}

More generally $\E(X + Y) = \E X + \E Y$ for *any* two random variables with expectations, independent or not; this **linearity of expectation** is proved in [[probability/joint-distributions]] and exploited in [[probability/expectation#thm-linearity]].

::: quiz
$X$ is equally likely to be $1$, $2$ or $3$. Which statement is true?
- [ ] $\E(1/X) = 1/\E X = \tfrac12$
- [x] $\E(1/X) = \tfrac{11}{18}$, which is larger than $1/\E X$
- [ ] $\E(1/X) = \tfrac{11}{18}$, which is smaller than $1/\E X$
- [ ] $\E(1/X)$ is undefined
::: solution
By [[#thm-lotus]], $\E(1/X) = \tfrac13\bigl(1 + \tfrac12 + \tfrac13\bigr) = \tfrac{11}{18} \approx 0.611$, while $1/\E X = 1/2$. In general $\E g(X) \ne g(\E X)$; only for linear $g$ are they always equal. (For convex $g$, such as $1/x$ on $x > 0$, Jensen's inequality gives $\E g(X) \ge g(\E X)$.)
:::
:::

## Variance {#variance}

Two random variables can have the same mean but very different spreads: winning £0 or £2 with equal probability, and winning £0 or £2000 with probabilities $0.9995$ and $0.0005$, both have mean £1. The variance measures spread by the average squared distance from the mean.

::: definition Variance and standard deviation {#def-variance}
Let $X$ have mean $\mu = \E X$ and $\E X^2 < \infty$. The **variance** of $X$ is

$$
\Var X = \E\bigl[(X - \mu)^2\bigr] = \sum_x (x-\mu)^2\,p_X(x),
$$

and its **standard deviation** is $\sigma_X = \sqrt{\Var X}$.
:::

The standard deviation has the same units as $X$, which makes it the more interpretable measure; the variance has better algebraic properties. (When $\E X^2 < \infty$ the mean exists, because $\lvert x\rvert \le 1 + x^2$.) Since $(X-\mu)^2 \ge 0$, the variance is non-negative, and it is zero exactly when $X = \mu$ with probability $1$.

::: theorem Properties of variance {#thm-variance}
If $\E X^2 < \infty$ and $a, b$ are constants, then

1. $\Var X = \E(X^2) - (\E X)^2$;
2. $\Var(aX + b) = a^2\,\Var X$.
:::

::: proof
(1) By [[#thm-lotus]] with $g(x) = (x-\mu)^2 = x^2 - 2\mu x + \mu^2$,

$$
\Var X = \sum_x x^2 p_X(x) - 2\mu\sum_x x\,p_X(x) + \mu^2\sum_x p_X(x) = \E X^2 - 2\mu^2 + \mu^2 = \E X^2 - \mu^2 .
$$

(2) By [[#eq-linear-one]], $aX + b$ has mean $a\mu + b$, so $(aX + b) - (a\mu + b) = a(X - \mu)$, and $\Var(aX+b) = \E\bigl[a^2(X-\mu)^2\bigr] = a^2\Var X$, again by [[#thm-lotus]].
:::

Part (2) says that shifting a random variable does not change its spread, and scaling it by $a$ scales the standard deviation by $\lvert a\rvert$.

::: example A fair die {#ex-die}
Find the mean, variance and standard deviation of the score $X$ of a fair die.
::: solution
We already know $\E X = \tfrac72$. Next, $\E X^2 = \tfrac16(1 + 4 + 9 + 16 + 25 + 36) = \tfrac{91}{6}$. By [[#thm-variance]],

$$
\Var X = \frac{91}{6} - \Bigl(\frac72\Bigr)^2 = \frac{182 - 147}{12} = \frac{35}{12} \approx 2.917, \qquad \sigma_X = \sqrt{35/12} \approx 1.708 .
$$

Scores lie on average about $1.7$ away from $3.5$ in the root-mean-square sense; the actual distances $\tfrac12, \tfrac32, \tfrac52$ (each with probability $\tfrac13$) have root mean square $\sqrt{(1/4 + 9/4 + 25/4)/3} = \sqrt{35/12}$.
:::
:::

::: warning Variance is not linear
$\Var(2X) = 4\Var X$, not $2\Var X$; and $\Var(X + X) = \Var(2X) = 4 \Var X$, which differs from the variance of the total of *two independent* copies of $X$, namely $2\Var X$ ([[probability/joint-distributions]]). Doubling one bet doubles your risk (standard deviation); making two independent bets of the same size multiplies it only by $\sqrt2$. Also remember that $\Var(-X) = \Var X$ and $\Var(X + b) = \Var X$: variance never becomes negative.
:::

::: quiz
If $\Var X = 4$, what is $\Var(3 - 2X)$?
- [ ] $-5$
- [ ] $-8$
- [ ] $8$
- [x] $16$
::: solution
By [[#thm-variance]], $\Var(3 - 2X) = (-2)^2\Var X = 16$. The constant $3$ shifts the distribution and does not affect the spread, and the sign of the multiplier disappears when it is squared.
:::
:::

## Bernoulli trials and the binomial distribution {#binomial}

The simplest random variable takes only the values $0$ and $1$. A **Bernoulli trial** is an experiment with two outcomes, "success" and "failure", and $X \sim \operatorname{Bernoulli}(p)$ means $\Prob(X = 1) = p$ and $\Prob(X = 0) = 1 - p$. Then $\E X = p$, $\E X^2 = p$ and $\Var X = p - p^2 = p(1-p)$.

Now perform $n$ independent Bernoulli trials, each with success probability $p$ (see [[probability/conditional-probability]] for the meaning of independence here), and count the successes.

::: theorem The binomial distribution {#thm-binomial}
Let $X$ be the number of successes in $n$ independent trials, each a success with probability $p$, and write $q = 1 - p$. Then

$$
\Prob(X = k) = \binom{n}{k}p^k q^{\,n-k}, \qquad k = 0, 1, \ldots, n.
$$ {#eq-binomial}

We write $X\sim\Bin(n, p)$.
:::

::: proof
An outcome is a sequence of $n$ results such as $SFFSF\ldots$. By independence, a particular sequence with $k$ successes and $n-k$ failures has probability $p^k q^{n-k}$, whatever the positions of the successes. The event $\{X = k\}$ is the disjoint union of the $\binom nk$ such sequences, one for each choice of the $k$ positions of the successes ([[discrete/counting]]), so its probability is $\binom nk p^kq^{n-k}$. By the binomial theorem the probabilities add up to $(p + q)^n = 1$.
:::

::: proposition Mean and variance of the binomial {#prop-binomial-moments}
If $X\sim\Bin(n,p)$, then $\E X = np$ and $\Var X = np(1-p)$.
:::

::: proof
We use the identities $k\binom nk = n\binom{n-1}{k-1}$ and $k(k-1)\binom nk = n(n-1)\binom{n-2}{k-2}$, which follow from writing out the factorials. For the mean, the $k=0$ term vanishes, and substituting $j = k - 1$,

$$
\E X = \sum_{k=1}^n n\binom{n-1}{k-1}p^kq^{n-k} = np\sum_{j=0}^{n-1}\binom{n-1}{j}p^jq^{n-1-j} = np\,(p+q)^{n-1} = np.
$$

For the variance it is easier to compute the **factorial moment** $\E[X(X-1)]$ first. The same substitution trick with $j = k-2$ gives

$$
\E[X(X-1)] = \sum_{k=2}^n n(n-1)\binom{n-2}{k-2}p^kq^{n-k} = n(n-1)p^2 .
$$

Hence $\E X^2 = \E[X(X-1)] + \E X = n(n-1)p^2 + np$ (using [[#thm-lotus]] to split the sum), and

$$
\Var X = n(n-1)p^2 + np - n^2p^2 = np - np^2 = np(1-p).
$$
:::

Both results are what intuition suggests: $n$ trials with success rate $p$ produce about $np$ successes, and (as we shall see in [[probability/expectation]]) the variance of a sum of independent terms is the sum of the variances, $n\cdot p(1-p)$.

::: example Guessing on a multiple-choice test {#ex-guessing}
For the student from the introduction, $X\sim\Bin(20, \tfrac14)$. Find $\E X$, the standard deviation of $X$, and $\Prob(X \ge 10)$.
::: solution
By [[#prop-binomial-moments]], $\E X = 20\cdot\tfrac14 = 5$ and $\Var X = 20\cdot\tfrac14\cdot\tfrac34 = 3.75$, so $\sigma_X = \sqrt{3.75}\approx 1.94$. For the tail,

$$
\Prob(X\ge 10) = \sum_{k=10}^{20}\binom{20}{k}\Bigl(\frac14\Bigr)^k\Bigl(\frac34\Bigr)^{20-k} \approx 0.0139 .
$$

The largest term is $\Prob(X=10) = \binom{20}{10}4^{-10}(3/4)^{10} \approx 0.0099$, and the terms then fall off rapidly. A score of $10$ is about $2.6$ standard deviations above the mean, and guessing produces it only about once in $72$ attempts.
:::
:::

::: widget distribution
dist: binomial
params: n=20, p=0.25
a: 10
b: 20
caption: The pmf of $\Bin(20, 0.25)$ with $\Prob(10 \le X \le 20) \approx 0.014$ shaded. Move $p$ towards $\tfrac12$ and the distribution becomes symmetric about $np$; push $p$ towards $0$ or $1$ and it becomes skewed and squashed against the end. Increase $n$ and notice that the spread grows like $\sqrt{n}$, not like $n$.
:::

A **Galton board** produces binomial random variables mechanically: a ball falls through $n$ rows of pins and bounces left or right at each pin, independently with probability $\tfrac12$. Its final position is determined by the number of bounces to the right, which is $\Bin(n, \tfrac12)$.

::: widget galton
rows: 12
balls: 300
p: 0.5
caption: Each ball makes $12$ independent left–right choices, so its slot is the number of right bounces, a $\Bin(12, \tfrac12)$ random variable. The pile approaches the shape of the pmf as more balls fall; with $p \neq \tfrac12$ the pile drifts and becomes lopsided. The bell shape that emerges for many rows is the subject of the central limit theorem in [[probability/limit-theorems]].
:::

### Sampling without replacement {#hypergeometric}

The binomial model assumes independent trials, as when we sample *with* replacement. When a sample of $n$ items is drawn *without* replacement from a population of $N$ items of which $K$ are "successes", the draws are dependent, and the number $X$ of successes in the sample has the **hypergeometric distribution**

$$
\Prob(X = k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}, \qquad \max(0, n - N + K)\le k\le\min(n, K).
$$ {#eq-hypergeometric}

Indeed, all $\binom Nn$ samples are equally likely, and a sample with exactly $k$ successes is made by choosing $k$ of the $K$ successes and $n-k$ of the $N-K$ failures. Its mean is $nK/N$, the same as that of $\Bin(n, K/N)$, but its variance $n\frac KN\bigl(1-\frac KN\bigr)\frac{N-n}{N-1}$ is smaller than the binomial variance by the **finite population correction** $\frac{N-n}{N-1}$; both facts are proved with indicator variables in [[probability/expectation#ex-hypergeometric]]. When $N$ is much larger than $n$, removing a few items barely changes the proportions, and the hypergeometric distribution is close to $\Bin(n, K/N)$. This is why an opinion poll of $1000$ people drawn without replacement from millions can be analysed with binomial calculations.

::: example Acceptance sampling {#ex-quality-control}
A batch of $50$ items contains $5$ defective ones. An inspector tests $10$ items chosen at random without replacement and accepts the batch if none is defective. Find the probability that the batch is accepted, and compare with the binomial approximation.
::: solution
Here $N = 50$, $K = 5$, $n = 10$, and acceptance means $X = 0$:

$$
\Prob(X = 0) = \frac{\binom50\binom{45}{10}}{\binom{50}{10}} = \frac{45}{50}\cdot\frac{44}{49}\cdots\frac{36}{41}\approx 0.311 .
$$

(The product form comes from the multiplication rule: the first item tested is good with probability $\tfrac{45}{50}$, the second, given the first was good, with probability $\tfrac{44}{49}$, and so on.) The binomial approximation $\Bin(10, 0.1)$ gives $0.9^{10}\approx 0.349$. The approximation is rough because the sample is a fifth of the batch: each good item drawn makes the next one slightly more likely to be defective. A batch with $10\%$ defectives slips through this inspection almost a third of the time, which is worth knowing before relying on it.
:::
:::

## The geometric distribution {#geometric}

Instead of fixing the number of trials, keep performing independent trials until the first success, and count the trials.

::: definition Geometric distribution {#def-geometric}
A random variable $X$ has the **geometric distribution** with parameter $p\in(0,1]$, written $X\sim\operatorname{Geom}(p)$, if

$$
\Prob(X = k) = (1-p)^{k-1}p, \qquad k = 1, 2, 3, \ldots
$$
:::

This is the distribution of the number of the trial on which the first success occurs: $X = k$ means $k - 1$ failures followed by a success, which by independence has probability $q^{k-1}p$ with $q = 1-p$. The probabilities form a geometric series with sum $p/(1-q) = 1$. The tail probabilities are especially simple: $X > k$ means that the first $k$ trials all fail, so

$$
\Prob(X > k) = q^k \qquad (k = 0, 1, 2, \ldots).
$$ {#eq-geometric-tail}

Some books instead count the failures before the first success, $Y = X - 1$, with values $0, 1, 2, \ldots$; always check which convention is in use.

::: proposition Mean and variance of the geometric distribution {#prop-geometric-moments}
If $X\sim\operatorname{Geom}(p)$, then $\E X = \dfrac1p$ and $\Var X = \dfrac{1-p}{p^2}$.
:::

::: proof
For $\lvert q\rvert < 1$ the geometric series $\sum_{k\ge0} q^k = (1-q)^{-1}$ may be differentiated term by term ([[calculus-2/power-series]]):

$$
\sum_{k=1}^\infty kq^{k-1} = \frac{1}{(1-q)^2}, \qquad \sum_{k=2}^\infty k(k-1)q^{k-2} = \frac{2}{(1-q)^3}.
$$

Hence $\E X = p\sum_{k\ge1}kq^{k-1} = p/p^2 = 1/p$, and

$$
\E[X(X-1)] = pq\sum_{k\ge2}k(k-1)q^{k-2} = \frac{2pq}{p^3} = \frac{2q}{p^2}.
$$

So $\Var X = \E[X(X-1)] + \E X - (\E X)^2 = \dfrac{2q}{p^2} + \dfrac1p - \dfrac{1}{p^2} = \dfrac{2q + p - 1}{p^2} = \dfrac{q}{p^2}$, using $p - 1 = -q$.
:::

::: example Waiting for a six {#ex-waiting-six}
A fair die is rolled until it shows a six. Find the expected number of rolls, and the probability that more than $10$ rolls are needed.
::: solution
The number of rolls is $X\sim\operatorname{Geom}(\tfrac16)$, so $\E X = 6$ and $\Var X = \frac{5/6}{1/36} = 30$, giving a standard deviation of about $5.5$ — almost as large as the mean. By [[#eq-geometric-tail]],

$$
\Prob(X > 10) = \Bigl(\frac56\Bigr)^{10} \approx 0.1615 .
$$

So in about one game in six you are still waiting after ten rolls, even though six rolls are needed "on average". Geometric waiting times are notoriously variable.
:::
:::

The geometric distribution has a striking property: a long wait so far does not make success any more imminent.

::: theorem Memorylessness of the geometric distribution {#thm-memoryless}
If $X\sim\operatorname{Geom}(p)$, then for all integers $m, n\ge 0$

$$
\Prob(X > m + n \mid X > m) = \Prob(X > n).
$$
:::

::: proof
Since $\{X > m+n\}\subseteq\{X > m\}$, the intersection of the two events is $\{X > m+n\}$, and by [[#eq-geometric-tail]]

$$
\Prob(X > m+n\mid X>m) = \frac{\Prob(X > m+n)}{\Prob(X > m)} = \frac{q^{m+n}}{q^m} = q^n = \Prob(X>n).
$$
:::

Given that the first $m$ trials have failed, the number of further trials needed has the same distribution as the original waiting time: the process "starts afresh". Conversely, the geometric is the *only* distribution on $\{1, 2, \ldots\}$ with this property (see the exercises).

::: warning The gambler's fallacy
After a roulette wheel has shown red eight times in a row, many players feel that black is "due". For independent spins this is false: the probability of black on the next spin is exactly what it always was, $18/37$ on a European wheel. Memorylessness is the precise statement: the number of further spins until black has the same geometric distribution whatever happened before. Independent trials have no memory and do not compensate for past streaks.
:::

## The Poisson distribution {#poisson}

Many counts arise from a large number of independent opportunities, each with a small chance: the number of typing errors on a page, of radioactive decays in a second, of calls to a help line in a minute, of insurance claims in a day. Such counts are modelled by the Poisson distribution.

::: definition Poisson distribution {#def-poisson}
A random variable $X$ has the **Poisson distribution** with parameter $\lambda > 0$, written $X\sim\operatorname{Poisson}(\lambda)$, if

$$
\Prob(X = k) = e^{-\lambda}\frac{\lambda^k}{k!}, \qquad k = 0, 1, 2, \ldots
$$
:::

These probabilities add up to $e^{-\lambda}\sum_k \lambda^k/k! = e^{-\lambda}e^\lambda = 1$, by the exponential series. The parameter is the mean, and also the variance: by the same shift-of-index trick as before,

$$
\E X = \sum_{k=1}^\infty k e^{-\lambda}\frac{\lambda^k}{k!} = \lambda\sum_{k=1}^\infty e^{-\lambda}\frac{\lambda^{k-1}}{(k-1)!} = \lambda, \qquad \E[X(X-1)] = \lambda^2\sum_{k=2}^\infty e^{-\lambda}\frac{\lambda^{k-2}}{(k-2)!} = \lambda^2,
$$

so $\Var X = \lambda^2 + \lambda - \lambda^2 = \lambda$. Equality of mean and variance is a quick diagnostic for whether count data might be Poisson.

The reason the Poisson distribution is so common is the following theorem: it is the limit of the binomial when there are many trials, each with a small probability of success.

::: theorem Poisson approximation to the binomial {#thm-poisson-limit}
Let $p_n\in(0,1)$ satisfy $np_n\to\lambda > 0$ as $n\to\infty$. Then for every fixed $k\ge0$

$$
\binom{n}{k}p_n^k(1-p_n)^{n-k} \longrightarrow e^{-\lambda}\frac{\lambda^k}{k!} \qquad (n\to\infty).
$$
:::

::: proof
Write the binomial probability as a product of four factors:

$$
\binom nk p_n^k(1-p_n)^{n-k} = \frac{(np_n)^k}{k!}\cdot\frac{n(n-1)\cdots(n-k+1)}{n^k}\cdot(1-p_n)^{n}\cdot(1-p_n)^{-k}.
$$

As $n\to\infty$ with $k$ fixed: the first factor tends to $\lambda^k/k!$; the second is $\prod_{j=0}^{k-1}(1 - j/n)\to1$; and since $p_n\to0$ (because $np_n$ converges), the fourth tends to $1$. For the third, $\ln(1 - t)/(-t)\to1$ as $t\to0$ (the derivative of $\ln$ at $1$), so

$$
n\ln(1-p_n) = -np_n\cdot\frac{\ln(1-p_n)}{-p_n}\longrightarrow -\lambda\cdot 1,
$$

and by continuity of the exponential $(1-p_n)^n = e^{n\ln(1-p_n)}\to e^{-\lambda}$. Multiplying the four limits gives the result.
:::

For example, if $1000$ independent components each fail with probability $0.002$, the number of failures is $\Bin(1000, 0.002)$, which is very close to $\operatorname{Poisson}(2)$:

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---|---|---|---|---|---|
| $\Bin(1000, 0.002)$ | $0.13506$ | $0.27067$ | $0.27094$ | $0.18063$ | $0.09022$ | $0.03602$ |
| $\operatorname{Poisson}(2)$ | $0.13534$ | $0.27067$ | $0.27067$ | $0.18045$ | $0.09022$ | $0.03609$ |

The Poisson model needs only the mean $\lambda$, not the (often unknown) numbers $n$ and $p$ separately.

::: example Deaths by horse kick {#ex-horse-kicks}
In 1898 Ladislaus Bortkiewicz published records of soldiers killed by horse kicks in the Prussian cavalry. For ten army corps over the twenty years 1875–1894, the $200$ corps-years show $122$ deaths, distributed as follows:

| deaths in a corps-year | $0$ | $1$ | $2$ | $3$ | $\ge 4$ |
|---|---|---|---|---|---|
| number of corps-years | $109$ | $65$ | $22$ | $3$ | $1$ |

Fit a Poisson distribution and compare.
::: solution
The average number of deaths per corps-year is $\lambda = 122/200 = 0.61$, and we use this as the Poisson parameter. The expected number of corps-years with $k$ deaths is then $200\,e^{-0.61}(0.61)^k/k!$:

| deaths | $0$ | $1$ | $2$ | $3$ | $\ge4$ |
|---|---|---|---|---|---|
| observed | $109$ | $65$ | $22$ | $3$ | $1$ |
| Poisson expected | $108.7$ | $66.3$ | $20.2$ | $4.1$ | $0.7$ |

The agreement is remarkably close. Each soldier had a tiny chance of being killed in a given year, independently of the others, which is exactly the situation of [[#thm-poisson-limit]]. Bortkiewicz called this the "law of small numbers". (In [[statistics/hypothesis-testing]] we will learn how to test formally whether such agreement is good enough.)
:::
:::

::: widget distribution
dist: poisson
params: lambda=2
caption: The $\operatorname{Poisson}(\lambda)$ pmf. For small $\lambda$ it is concentrated on $0$ and $1$ and strongly skewed; as $\lambda$ grows the distribution moves right, spreads out like $\sqrt\lambda$ and becomes more symmetric. Notice the two equal tallest bars when $\lambda$ is a whole number (at $\lambda - 1$ and $\lambda$): an exercise below explains why.
:::

::: quiz
Which of these counts is most naturally modelled by a Poisson distribution?
- [ ] The number of heads in $10$ tosses of a coin
- [ ] The number of rolls of a die until the first six
- [ ] The number of aces in a poker hand
- [x] The number of misprints in a $300$-page book
::: solution
Misprints arise from a very large number of opportunities (every character), each with a tiny probability, roughly independently: the situation of [[#thm-poisson-limit]]. The other three are, exactly, binomial $\Bin(10, \tfrac12)$, geometric $\operatorname{Geom}(\tfrac16)$ and hypergeometric (with $N = 52$, $K = 4$, $n = 5$).
:::
:::

::: history
The expectation of a game was the central concept of Christiaan Huygens's *De ratiociniis in ludo aleae* (1657), which reasoned about the fair price of a gamble. Jacob Bernoulli studied repeated independent trials in his *Ars Conjectandi* (1713), and the binomial distribution and Bernoulli trials bear his name. Siméon-Denis Poisson obtained the Poisson distribution as a limit of the binomial in *Recherches sur la probabilité des jugements en matière criminelle et en matière civile* (1837), a book about the reliability of jury verdicts. It attracted little attention until Ladislaus Bortkiewicz's *Das Gesetz der kleinen Zahlen* (1898) showed how well it describes rare events, with the horse-kick data as its most famous illustration.
:::

## Where this leads {#where-next}

Random variables with a continuum of possible values, such as lifetimes and measurement errors, need densities instead of mass functions; they are the subject of [[probability/continuous-random-variables]], where the exponential distribution appears as the continuous analogue of the geometric, and the normal distribution as the limit of the binomial. Several random variables considered together have a joint distribution ([[probability/joint-distributions]]). Linearity of expectation, indicator variables and generating functions in [[probability/expectation]] make many of this chapter's calculations much shorter. The binomial and Poisson models are the basis of estimates and tests for proportions and counts in [[statistics/estimation]] and [[statistics/hypothesis-testing]].

::: summary
- A random variable is a numerical function of the outcome; a discrete one is described by its pmf $p_X(x) = \Prob(X=x)$, with $\Prob(X\in A) = \sum_{x\in A}p_X(x)$.
- $\E X = \sum_x x\,p_X(x)$ (when absolutely convergent) and $\E g(X) = \sum_x g(x)\,p_X(x)$ ([[#thm-lotus]]); in general $\E g(X) \ne g(\E X)$.
- $\Var X = \E(X-\mu)^2 = \E X^2 - \mu^2$ and $\Var(aX+b) = a^2\Var X$.
- $\Bin(n,p)$ counts successes in $n$ independent trials: pmf $\binom nk p^kq^{n-k}$, mean $np$, variance $npq$.
- $\operatorname{Geom}(p)$ is the waiting time for the first success: $\Prob(X>k) = q^k$, mean $1/p$, variance $q/p^2$; it is memoryless.
- $\operatorname{Poisson}(\lambda)$ has pmf $e^{-\lambda}\lambda^k/k!$ and mean and variance $\lambda$; it is the limit of $\Bin(n,p)$ when $n\to\infty$ and $np\to\lambda$, and models counts of rare events.
- The factorial moment $\E[X(X-1)]$ is often the easiest route to a variance.
:::

## Exercises

::: exercise Ten tosses {level=1 check="15/128"}
A fair coin is tossed $10$ times. Find the probability of exactly $3$ heads.
::: solution
The number of heads is $\Bin(10,\tfrac12)$, so the probability is $\binom{10}{3}2^{-10} = \dfrac{120}{1024} = \dfrac{15}{128}\approx 0.117$.
:::
:::

::: exercise Counting sixes {level=1 check="25/6"}
A fair die is rolled $30$ times and $X$ is the number of sixes. Find $\E X$ and $\Var X$; enter the variance.
::: solution
$X\sim\Bin(30,\tfrac16)$, so $\E X = 5$ and $\Var X = 30\cdot\tfrac16\cdot\tfrac56 = \tfrac{25}{6}\approx 4.17$.
:::
:::

::: exercise A quiet minute {level=1 check="8.5*exp(-3)"}
Calls arrive at a help desk at an average rate of $3$ per minute, and the number in a given minute is modelled as $\operatorname{Poisson}(3)$. Find the probability of at most $2$ calls in a minute.
::: solution
$\Prob(X\le2) = e^{-3}\bigl(1 + 3 + \tfrac{9}{2}\bigr) = 8.5\,e^{-3}\approx 0.423$.
:::
:::

::: exercise A lottery {level=1 check="binom(6,3)*binom(43,3)/binom(49,6)"}
In a lottery, $6$ numbers are drawn without replacement from $1, \ldots, 49$, and you hold a ticket with $6$ different numbers. Find the probability that exactly $3$ of your numbers are drawn.
::: solution
Your $6$ numbers play the role of the $K = 6$ "successes" among $N = 49$, and the draw is a sample of $n = 6$. By [[#eq-hypergeometric]],

$$
\Prob(X = 3) = \frac{\binom63\binom{43}{3}}{\binom{49}{6}} = \frac{20\cdot 12\,341}{13\,983\,816} = \frac{246\,820}{13\,983\,816}\approx 0.0177,
$$

about one ticket in $57$.
:::
:::

::: exercise The smaller of two dice {level=2 check="91/36"}
Two fair dice are rolled and $N$ is the smaller score. Find the pmf of $N$ and $\E N$.
::: hint
Compute $\Prob(N\ge k)$ first, as in [[#ex-max-dice]].
:::
::: solution
$N\ge k$ means both dice show at least $k$, which happens in $(7-k)^2$ of the $36$ outcomes. So $\Prob(N = k) = \Prob(N\ge k) - \Prob(N\ge k+1) = \dfrac{(7-k)^2 - (6-k)^2}{36} = \dfrac{13 - 2k}{36}$ for $k = 1, \ldots, 6$, that is $\tfrac{11}{36}, \tfrac{9}{36}, \ldots, \tfrac{1}{36}$. Then

$$
\E N = \frac{1\cdot11 + 2\cdot9 + 3\cdot7 + 4\cdot5 + 5\cdot 3 + 6\cdot1}{36} = \frac{91}{36}\approx 2.53.
$$

As a check, $\E M = \sum_k k(2k-1)/36 = \tfrac{161}{36}$ for the maximum, and $\E N + \E M = \tfrac{252}{36} = 7$, the expected total: indeed $N + M$ always equals the total of the two dice.
:::
:::

::: exercise Free throws {level=2 check="0.7^3*0.3"}
A basketball player makes each free throw with probability $0.7$, independently. Find the probability that the first miss occurs on the fourth throw, and the expected number of throws up to and including the first miss.
::: solution
"Success" is now a miss, with probability $0.3$, so the throw of the first miss is $\operatorname{Geom}(0.3)$: $\Prob(X=4) = 0.7^3\times0.3 = 0.1029$ and $\E X = 1/0.3 = \tfrac{10}{3}$.
:::
:::

::: exercise A rare blood type {level=2 check="1-5*exp(-2)"}
One person in $2000$ has a certain rare blood type. Use the Poisson approximation to find the probability that at least $3$ of $4000$ unrelated donors have it.
::: solution
The number with the blood type is $\Bin(4000, \tfrac1{2000})$, approximately $\operatorname{Poisson}(2)$ by [[#thm-poisson-limit]]. Then

$$
\Prob(X\ge3) \approx 1 - e^{-2}\Bigl(1 + 2 + \frac{2^2}{2}\Bigr) = 1 - 5e^{-2}\approx 0.3233,
$$

which agrees with the exact binomial value to seven decimal places.
:::
:::

::: exercise Tail sums {level=3}
Let $X$ take values in $\{0, 1, 2, \ldots\}$. Prove that $\E X = \sum_{k=0}^\infty\Prob(X > k)$ (both sides may be infinite). Use this to give a two-line proof that a $\operatorname{Geom}(p)$ random variable has mean $1/p$.
::: hint
Write $j = \sum_{k=0}^{j-1}1$ and exchange the order of summation.
:::
::: solution
Since all terms are non-negative, we may exchange the order of summation freely:

$$
\E X = \sum_{j=1}^\infty j\,\Prob(X = j) = \sum_{j=1}^\infty\sum_{k=0}^{j-1}\Prob(X=j) = \sum_{k=0}^\infty\sum_{j=k+1}^\infty\Prob(X = j) = \sum_{k=0}^\infty\Prob(X>k).
$$

For $X\sim\operatorname{Geom}(p)$, $\Prob(X>k) = q^k$, so $\E X = \sum_{k\ge0}q^k = \dfrac{1}{1-q} = \dfrac1p$.
:::
:::

::: exercise The most likely Poisson value {level=3}
Let $X\sim\operatorname{Poisson}(\lambda)$ and $p_k = \Prob(X=k)$. Show that $p_k/p_{k-1} = \lambda/k$ for $k\ge1$. Deduce that $p_k$ increases while $k < \lambda$ and decreases while $k > \lambda$, so that the most likely value is $\lfloor\lambda\rfloor$, and that if $\lambda$ is an integer the values $\lambda - 1$ and $\lambda$ are equally likely.
::: solution
$\dfrac{p_k}{p_{k-1}} = \dfrac{e^{-\lambda}\lambda^k/k!}{e^{-\lambda}\lambda^{k-1}/(k-1)!} = \dfrac{\lambda}{k}$. This ratio is greater than $1$ when $k < \lambda$, equal to $1$ when $k = \lambda$ and less than $1$ when $k > \lambda$. So $p_0 < p_1 < \dots$ as long as the index stays below $\lambda$, and the sequence decreases afterwards. If $\lambda$ is not an integer, the largest term is $p_{\lfloor\lambda\rfloor}$ (the last index with $k < \lambda$). If $\lambda$ is an integer, $p_\lambda/p_{\lambda-1} = 1$, so the two largest terms $p_{\lambda-1}$ and $p_\lambda$ are equal.
:::
:::

::: exercise Memorylessness characterises the geometric {level=3}
Let $X$ take values in $\{1, 2, 3, \ldots\}$ with $\Prob(X > 1) > 0$, and suppose $\Prob(X > m+n\mid X > m) = \Prob(X>n)$ for all integers $m, n\ge0$ with $\Prob(X > m) > 0$. Prove that $X\sim\operatorname{Geom}(p)$ for some $p\in(0,1]$.
::: solution
Let $G(k) = \Prob(X > k)$, so $G(0) = 1$, and put $q = G(1) \in (0, 1)$ (we have $q > 0$ by assumption, and $q < 1$ is shown below). The hypothesis says $G(m+n) = G(m)G(n)$ whenever $G(m) > 0$. We show by induction that $G(k) = q^k$. This holds for $k = 0, 1$. If $G(k) = q^k > 0$, then $G(k+1) = G(k)G(1) = q^{k+1}$. Hence $G(k) = q^k$ for all $k$, and

$$
\Prob(X = k) = G(k-1) - G(k) = q^{k-1}(1 - q) \qquad (k\ge1),
$$

which is the $\operatorname{Geom}(p)$ pmf with $p = 1 - q$. Finally $q < 1$: if $q = 1$, then $\Prob(X > k) = 1$ for every $k$. But the events $\{X > k\}$ decrease to the empty set, because $X$ is finite, so by continuity of probability ([[probability/probability-spaces#thm-continuity]]) their probabilities tend to $0$, a contradiction.
:::
:::
