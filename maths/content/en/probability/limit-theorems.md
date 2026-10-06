Toss a fair coin $10\,000$ times. You will not get exactly $5000$ heads (the probability of that is under $1\%$), but you can be practically sure that the proportion of heads will be close to $\tfrac12$. More precisely, the number of heads will lie between $4900$ and $5100$ with probability about $0.955$, and outside $4800$ to $5200$ fewer than once in $16\,000$ experiments. Chance, which is wild for a single toss, becomes almost perfectly predictable in aggregate. This is why casinos and insurers can plan with confidence, why opinion polls of a thousand people say something about millions, and why averaging repeated measurements reduces error.

Two theorems make this precise. The **law of large numbers** says that the average of many independent observations converges to their expected value. The **central limit theorem** describes the fluctuations around that limit: they are of size $\sigma/\sqrt n$, and their distribution is approximately normal, *whatever the distribution of the individual observations*. Together they are the foundation of statistics. We begin with two simple inequalities that bound the probability of large deviations, use them to prove the weak law of large numbers, state and partly prove the strong law, and then prove the central limit theorem using the moment generating functions of [[probability/expectation]].

## Markov's and Chebyshev's inequalities {#inequalities}

If we know only the mean of a random variable, or its mean and variance, what can we say about the probability that it is far from typical? Surprisingly much.

::: theorem Markov's inequality {#thm-markov}
If $X\ge0$ and $a>0$, then

$$
\Prob(X\ge a)\le\frac{\E X}{a}.
$$
:::

::: proof
Compare $X$ with the random variable $a\mathbf{1}_{\{X\ge a\}}$, which equals $a$ when $X\ge a$ and $0$ otherwise. In the first case $X\ge a$; in the second $X\ge0$. So $a\mathbf{1}_{\{X\ge a\}}\le X$ always, and taking expectations (expectation preserves inequalities, by linearity applied to the non-negative difference) gives $a\,\Prob(X\ge a)\le\E X$.
:::

For instance, if the mean income in a country is £30,000, then at most a tenth of the population can earn £300,000 or more — otherwise those people alone would push the mean above £30,000. Markov's inequality needs $X\ge0$: without it, a small probability of a huge negative value could balance a large probability of moderately large values.

Applying Markov's inequality to the non-negative random variable $(X-\mu)^2$ gives a bound in terms of the variance.

::: theorem Chebyshev's inequality {#thm-chebyshev}
If $X$ has mean $\mu$ and finite variance $\sigma^2$, then for every $\eps>0$

$$
\Prob\bigl(\lvert X-\mu\rvert\ge\eps\bigr)\le\frac{\sigma^2}{\eps^2}.
$$ {#eq-chebyshev}

Equivalently, with $\eps = k\sigma$: $\Prob(\lvert X-\mu\rvert\ge k\sigma)\le1/k^2$.
:::

::: proof
The events $\{\lvert X-\mu\rvert\ge\eps\}$ and $\{(X-\mu)^2\ge\eps^2\}$ are the same. By Markov's inequality applied to $(X-\mu)^2\ge0$ with $a = \eps^2$,

$$
\Prob\bigl((X-\mu)^2\ge\eps^2\bigr)\le\frac{\E(X-\mu)^2}{\eps^2} = \frac{\sigma^2}{\eps^2}.
$$
:::

Chebyshev's inequality holds for *every* distribution with finite variance, which makes it crude for any particular one. Compare its bounds with the exact values for a normal distribution:

| $k$ | $1.5$ | $2$ | $3$ |
|---|---|---|---|
| Chebyshev bound on $\Prob(\lvert X-\mu\rvert\ge k\sigma)$ | $0.444$ | $0.250$ | $0.111$ |
| exact value for a normal $X$ | $0.134$ | $0.046$ | $0.003$ |

Yet the bound cannot be improved without further assumptions: if $X = \pm k$ with probability $\frac{1}{2k^2}$ each and $X = 0$ otherwise, then $\mu = 0$, $\sigma = 1$ and $\Prob(\lvert X\rvert\ge k) = 1/k^2$ exactly.

::: quiz
A random variable has mean $100$ and standard deviation $10$, and nothing else is known about it. What is the best lower bound Chebyshev's inequality gives for $\Prob(70<X<130)$?
- [ ] $0.997$
- [x] $\tfrac89\approx0.889$
- [ ] $\tfrac23$
- [ ] $\tfrac13$
::: solution
The interval is $\mu\pm3\sigma$, so $\Prob(\lvert X-\mu\rvert\ge30)\le\tfrac19$ and $\Prob(70<X<130)\ge\tfrac89$. The value $0.997$ is correct for a *normal* random variable, but without knowing the distribution only Chebyshev's guarantee is available.
:::
:::

## The law of large numbers {#lln}

Let $X_1, X_2, \ldots$ be independent random variables with a common distribution — **independent and identically distributed**, abbreviated iid — with mean $\mu$ and variance $\sigma^2$. Think of them as repeated measurements of the same quantity. Write

$$
S_n = X_1+\dots+X_n,\qquad\bar X_n = \frac{S_n}{n}
$$

for the sum and the **sample mean** of the first $n$. By linearity $\E\bar X_n = \mu$, and since variances of independent random variables add ([[probability/joint-distributions#thm-covariance]]),

$$
\Var\bar X_n = \frac{1}{n^2}\Var S_n = \frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n}.
$$ {#eq-var-mean}

The standard deviation of the average is $\sigma/\sqrt n$: averaging $100$ measurements reduces the error by a factor of $10$. To say that $\bar X_n$ "converges" to $\mu$ we need a notion of convergence for random variables.

::: definition Convergence in probability {#def-conv-prob}
A sequence of random variables $Y_n$ **converges in probability** to a constant $c$, written $Y_n\xrightarrow{\;\Prob\;}c$, if for every $\eps>0$

$$
\Prob\bigl(\lvert Y_n - c\rvert\ge\eps\bigr)\to0\qquad(n\to\infty).
$$
:::

::: theorem Weak law of large numbers {#thm-wlln}
Let $X_1,X_2,\ldots$ be iid with mean $\mu$ and finite variance $\sigma^2$. Then $\bar X_n\xrightarrow{\;\Prob\;}\mu$; indeed, for every $\eps>0$,

$$
\Prob\bigl(\lvert\bar X_n-\mu\rvert\ge\eps\bigr)\le\frac{\sigma^2}{n\eps^2}.
$$ {#eq-wlln-bound}
:::

::: proof
Apply Chebyshev's inequality to $\bar X_n$, which has mean $\mu$ and variance $\sigma^2/n$ by [[#eq-var-mean]]. The bound tends to $0$ as $n\to\infty$ for each fixed $\eps$.
:::

The proof used only that the $X_i$ are uncorrelated with a common mean and variance, so the theorem holds under that weaker assumption. (With more work, the finite-variance assumption can be dropped: $\E\lvert X_1\rvert<\infty$ suffices.) The most important special case is the one that motivated Jacob Bernoulli.

::: corollary Bernoulli's law of large numbers {#cor-bernoulli}
In $n$ independent trials of an experiment, let $N_n(A)$ be the number of trials in which the event $A$ occurs. Then the relative frequency $N_n(A)/n$ converges in probability to $\Prob(A)$.
:::

::: proof
$N_n(A)/n$ is the sample mean of the iid indicators $\mathbf{1}_A$ of the individual trials, which have mean $\Prob(A)$ and variance $\Prob(A)(1-\Prob(A))\le\tfrac14$. Apply [[#thm-wlln]].
:::

This closes a circle begun in [[probability/probability-spaces]]: we motivated the axioms by the behaviour of relative frequencies, and now the axioms *prove* that relative frequencies converge to probabilities.

::: widget lln
experiment: coin
trials: 2000
runs: 5
caption: Five independent runs of $2000$ coin tosses, each showing the running proportion of heads. Early on the runs wander widely; later they are squeezed towards $\tfrac12$, at a rate of about $1/\sqrt n$. Run it again: the paths are different every time, but the funnel they are confined to is always the same shape.
:::

::: example How many tosses? {#ex-how-many}
How many tosses of a fair coin guarantee, by the bound [[#eq-wlln-bound]], that the proportion of heads lies within $0.01$ of $\tfrac12$ with probability at least $0.95$?
::: solution
Here $\sigma^2 = \tfrac14$ and $\eps = 0.01$, and we need $\dfrac{1/4}{n(0.01)^2}\le0.05$, that is $n\ge\dfrac{0.25}{0.05\times0.0001} = 50\,000$. Chebyshev's inequality makes no use of the shape of the distribution, so this is very conservative; the central limit theorem below shows that about $9600$ tosses actually suffice.
:::
:::

::: warning The law of large numbers does not "balance out" deviations
After an excess of heads, the law of large numbers does *not* say that tails become more likely to restore the balance — independent tosses have no memory ([[probability/discrete-random-variables]]). The proportion of heads converges to $\tfrac12$ because early deviations are *swamped* by the growing number of tosses, not because they are corrected. In fact the difference between the number of heads and $n/2$ typically grows, like $\sqrt n$; it is only the difference *divided by $n$* that shrinks. After $10\,000$ tosses an imbalance of $50$ heads is entirely typical, and after a million tosses an imbalance of $500$ is.
:::

::: quiz
A fair coin has shown $520$ heads in its first $1000$ tosses. What is the expected number of heads after $2000$ tosses in total?
- [ ] $1000$, because the law of large numbers will correct the excess
- [x] $1020$
- [ ] $980$, because tails are now due
- [ ] It cannot be computed without knowing the order of the first $1000$ results
::: solution
The next $1000$ tosses are independent of the first $1000$ and contribute $500$ heads on average, so the expected total is $520 + 500 = 1020$. The excess of $20$ heads is not removed — but the expected *proportion* falls from $0.52$ to $0.51$, because the excess is now divided by $2000$. That is how the law of large numbers works.
:::
:::

The weak law says that for each large $n$, a large deviation of $\bar X_n$ is unlikely. A stronger statement is that, with probability $1$, the whole sequence of averages converges.

::: definition Almost sure convergence {#def-as}
$Y_n$ converges to $c$ **almost surely** if $\Prob\bigl(Y_n\to c\text{ as }n\to\infty\bigr) = 1$.
:::

::: theorem Strong law of large numbers {#thm-slln}
If $X_1,X_2,\ldots$ are iid with $\E\lvert X_1\rvert<\infty$ and mean $\mu$, then $\bar X_n\to\mu$ almost surely.
:::

::: proof
*We prove the theorem under the extra assumption $\E X_1^4<\infty$; the general case, due to Kolmogorov, needs a truncation argument and can be found in Grimmett and Stirzaker, Chapter 7.* Replacing $X_i$ by $X_i-\mu$ we may assume $\mu = 0$. Expand

$$
\E S_n^4 = \sum_{i,j,k,l}\E(X_iX_jX_kX_l).
$$

By independence and $\E X_i = 0$, every term in which some index appears exactly once vanishes. What remains are the $n$ terms $\E X_i^4$ and the terms $\E(X_i^2X_j^2) = \sigma^4$ with $i\ne j$, of which there are $3n(n-1)$ (choose how the four positions split into two pairs, in $3$ ways, and an ordered pair of distinct indices). So $\E S_n^4 = n\E X_1^4 + 3n(n-1)\sigma^4\le Cn^2$ for a constant $C$. By Markov's inequality applied to $S_n^4$, for each $\eps>0$,

$$
\Prob(\lvert\bar X_n\rvert\ge\eps) = \Prob\bigl(S_n^4\ge n^4\eps^4\bigr)\le\frac{Cn^2}{n^4\eps^4} = \frac{C}{\eps^4n^2}.
$$

These probabilities have a finite sum over $n$. Now use the **Borel–Cantelli lemma**: if events $A_n$ satisfy $\sum_n\Prob(A_n)<\infty$, then with probability $1$ only finitely many of them occur. (Proof: the event that infinitely many occur is contained in $\bigcup_{n\ge m}A_n$ for every $m$, whose probability is at most $\sum_{n\ge m}\Prob(A_n)\to0$ by the union bound.) Hence, for each $\eps>0$, with probability $1$ we have $\lvert\bar X_n\rvert<\eps$ for all sufficiently large $n$. Applying this with $\eps = 1, \tfrac12, \tfrac13, \ldots$ and intersecting these countably many events of probability $1$ (the intersection still has probability $1$), we get $\bar X_n\to0$ almost surely.
:::

The strong law is what justifies the **Monte Carlo method**: to estimate an integral $I = \int_0^1g(x)\,dx$, generate iid uniform random numbers $U_1,U_2,\ldots$ and average $g(U_i)$. Since $\E g(U_i) = I$, the averages converge to $I$, and by [[#eq-var-mean]] the error after $n$ samples is typically about $\sigma_g/\sqrt n$, where $\sigma_g$ is the standard deviation of $g(U)$.

::: widget montecarlo
mode: integral
f: exp(-x^2)
a: 0
b: 1
n: 1000
caption: Monte Carlo estimation of $\int_0^1e^{-x^2}\,dx\approx0.7468$. Here $\sigma_g\approx0.20$, so with $n = 1000$ points the sample-mean estimate (the average of the $g(U_i)$ described above) is typically within about $0.006$ of the truth; the hit-or-miss estimate, which counts the points under the curve, is less accurate. Rerun several times and compare the spread of the sample-mean estimates with that prediction; then multiply $n$ by $4$ and check that the typical error halves.
:::

## Convergence in distribution and the central limit theorem {#clt}

The law of large numbers tells us that $\bar X_n - \mu\to0$; [[#eq-var-mean]] says this difference is of order $\sigma/\sqrt n$. To see its *shape* we magnify it by $\sqrt n/\sigma$, forming the **standardised sum**

$$
Z_n = \frac{S_n - n\mu}{\sigma\sqrt n} = \frac{\bar X_n-\mu}{\sigma/\sqrt n},
$$

which has mean $0$ and variance $1$ for every $n$. The astonishing fact is that the distribution of $Z_n$ approaches the same limit whatever the distribution of the $X_i$.

::: definition Convergence in distribution {#def-conv-dist}
Random variables $Y_n$ **converge in distribution** to $Y$, written $Y_n\xrightarrow{\;d\;}Y$, if $F_{Y_n}(x)\to F_Y(x)$ at every $x$ at which $F_Y$ is continuous.
:::

(The restriction to continuity points is needed so that, for example, the constants $1/n$ converge in distribution to the constant $0$, although $F_{1/n}(0) = 0$ while $F_0(0) = 1$. When the limit is normal, $F_Y = \Phi$ is continuous everywhere.)

::: theorem Central limit theorem {#thm-clt}
Let $X_1,X_2,\ldots$ be iid with mean $\mu$ and finite variance $\sigma^2>0$. Then $Z_n = (S_n-n\mu)/(\sigma\sqrt n)\xrightarrow{\;d\;}\Normal(0,1)$; that is, for every $x\in\R$,

$$
\Prob\Bigl(\frac{S_n - n\mu}{\sigma\sqrt n}\le x\Bigr)\longrightarrow\Phi(x)\qquad(n\to\infty).
$$ {#eq-clt}
:::

In practice the theorem is used as an approximation: for large $n$, $S_n$ is approximately $\Normal(n\mu, n\sigma^2)$ and $\bar X_n$ is approximately $\Normal(\mu,\sigma^2/n)$.

We prove the theorem under the extra assumption that the $X_i$ have a moment generating function. The proof rests on a result we state without proof.

::: theorem Continuity theorem for moment generating functions {#thm-continuity-mgf}
Suppose $Y_n$ and $Y$ have moment generating functions and $M_{Y_n}(t)\to M_Y(t)$ for every $t$ in some interval $(-h,h)$. Then $Y_n\xrightarrow{\;d\;}Y$.
:::

(This is due to J. H. Curtiss (1942); proofs, and the analogous theorem for characteristic functions, are in Billingsley's *Probability and Measure* and in Grimmett and Stirzaker.) We also need a familiar limit: if real numbers $c_n\to c$, then

$$
\Bigl(1 + \frac{c_n}{n}\Bigr)^n\to e^c,
$$ {#eq-exp-limit}

which follows as in the proof of the Poisson approximation in [[probability/discrete-random-variables]]: $n\ln(1 + c_n/n) = c_n\cdot\frac{\ln(1+c_n/n)}{c_n/n}\to c$ (the second factor tends to $1$; if $c_n = 0$ the term is $0$ anyway).

::: proof
*Proof of the CLT when the $X_i$ have an mgf (a careful sketch).* Let $Y_i = (X_i-\mu)/\sigma$, which are iid with mean $0$ and variance $1$, and let $M$ be their common mgf, finite on some $(-h,h)$. By [[probability/expectation#thm-mgf]], $M$ is given by a convergent power series near $0$, with $M(0) = 1$, $M'(0) = \E Y_i = 0$ and $M''(0) = \E Y_i^2 = 1$. By Taylor's theorem,

$$
M(s) = 1 + \frac{s^2}{2} + r(s),\qquad\text{where } \frac{r(s)}{s^2}\to0\text{ as }s\to0 .
$$

Now $Z_n = (Y_1+\dots+Y_n)/\sqrt n$, so by the multiplication and scaling rules for mgfs, for each fixed $t$ and all $n$ large enough that $\lvert t\rvert/\sqrt n<h$,

$$
M_{Z_n}(t) = M\Bigl(\frac{t}{\sqrt n}\Bigr)^n = \Bigl(1 + \frac{t^2}{2n} + r\Bigl(\frac{t}{\sqrt n}\Bigr)\Bigr)^n = \Bigl(1 + \frac{c_n}{n}\Bigr)^n,\qquad c_n = \frac{t^2}{2} + n\,r\Bigl(\frac{t}{\sqrt n}\Bigr).
$$

For $t\ne0$, $n\,r(t/\sqrt n) = t^2\cdot\dfrac{r(t/\sqrt n)}{(t/\sqrt n)^2}\to t^2\cdot0 = 0$, and for $t = 0$ it is $0$. Hence $c_n\to t^2/2$ and, by [[#eq-exp-limit]], $M_{Z_n}(t)\to e^{t^2/2}$, the mgf of $\Normal(0,1)$. The continuity theorem gives $Z_n\xrightarrow{\;d\;}\Normal(0,1)$.

Without the mgf assumption, the same argument works with the characteristic function $\E e^{itX}$, which always exists; see Grimmett and Stirzaker, Section 5.10.
:::

The proof shows *why* the normal distribution appears: after standardisation, only the mean and variance of $X_i$ survive in the limit, through the first two terms of the Taylor expansion; all higher-order features (skewness, the shape of the tails) are washed out by the factor $1/\sqrt n$.

::: widget clt
dist: exponential
n: 5
samples: 2000
caption: Histogram of $2000$ simulated sample means of $n$ exponential observations, against the normal curve predicted by the central limit theorem. The exponential distribution is very skewed, and for $n = 1$ or $2$ the histogram is too; by $n = 30$ the bell shape is close, though a slight right skew remains. Try the bimodal and the die populations as well: very different starting shapes, the same limit.
:::

::: warning What the central limit theorem does and does not say
The theorem is about *sums and averages* of many independent terms, not about individual observations: a sample of $1000$ incomes does not become normally distributed, but its *mean* is approximately normal. It needs a **finite variance**: the average of $n$ independent standard Cauchy variables has the same Cauchy distribution as a single one, so it neither concentrates nor becomes normal. And "$n\ge30$" is a rule of thumb, not a theorem: for a symmetric population the approximation can be good at $n = 5$, while for a very skewed one (such as rare-event indicators) hundreds of observations may be needed. The **Berry–Esseen theorem** quantifies this: the error in [[#eq-clt]] is at most $C\,\E\lvert X_1-\mu\rvert^3/(\sigma^3\sqrt n)$, with a constant $C<0.48$.
:::

### The normal approximation to the binomial

A $\Bin(n,p)$ random variable is a sum of $n$ independent Bernoulli variables, each with mean $p$ and variance $p(1-p)$, so for large $n$ it is approximately $\Normal\bigl(np, np(1-p)\bigr)$. This special case, found by de Moivre for $p = \tfrac12$ and extended by Laplace, is the **de Moivre–Laplace theorem**. Since the binomial is discrete, the approximation is improved by a **continuity correction**: the probability of the integer $k$ is spread over the interval $[k-\tfrac12, k+\tfrac12]$.

::: example A hundred tosses {#ex-hundred-tosses}
A fair coin is tossed $100$ times. Approximate the probability of at least $60$ heads.
::: solution
$X\sim\Bin(100,\tfrac12)$ has mean $50$ and standard deviation $\sqrt{100\cdot\tfrac14} = 5$. With the continuity correction, $\{X\ge60\} = \{X\ge59.5\}$, and

$$
\Prob(X\ge60)\approx1 - \Phi\Bigl(\frac{59.5-50}{5}\Bigr) = 1 - \Phi(1.9)\approx0.0287 .
$$

The exact binomial probability is $0.0284$. Without the continuity correction we would get $1-\Phi(2)\approx0.0228$, a much worse approximation. Sixty heads in a hundred tosses is unusual but not extraordinary: it happens about once in $35$ attempts.
:::
:::

::: example The total of a hundred dice {#ex-hundred-dice}
One hundred fair dice are rolled. Approximate the probability that the total lies between $330$ and $370$ inclusive.
::: solution
Each die has mean $\tfrac72$ and variance $\tfrac{35}{12}$, so the total $S$ has mean $350$ and variance $\tfrac{3500}{12}$, a standard deviation of $17.08$. With the continuity correction,

$$
\Prob(330\le S\le370)\approx\Phi\Bigl(\frac{370.5-350}{17.08}\Bigr) - \Phi\Bigl(\frac{329.5-350}{17.08}\Bigr) = 2\Phi(1.200) - 1\approx0.770 .
$$

The exact probability, computed by repeated convolution, is $0.7697$. The individual dice are uniform on six values, nothing like a bell curve, yet the total of a hundred of them is almost perfectly normal.
:::
:::

::: example Sizing an opinion poll {#ex-poll}
A poll will estimate the proportion $p$ of voters supporting a party by the proportion $\hat p$ in a random sample of size $n$. How large must $n$ be for $\hat p$ to lie within $3$ percentage points of $p$ with probability about $0.95$, whatever $p$ is?
::: solution
$\hat p$ is the mean of $n$ Bernoulli($p$) indicators, so it has mean $p$ and standard deviation $\sqrt{p(1-p)/n}\le\frac{1}{2\sqrt n}$, since $p(1-p)\le\tfrac14$. By the CLT, $\Prob(\lvert\hat p - p\rvert<1.96\,\mathrm{sd})\approx0.95$. So we need

$$
1.96\cdot\frac{1}{2\sqrt n}\le0.03,\qquad\text{that is}\qquad n\ge\Bigl(\frac{1.96}{0.06}\Bigr)^2\approx1067.1,
$$

so a sample of about $1068$ suffices. Chebyshev's inequality would demand $n\ge\frac{1/4}{0.05\times0.03^2}\approx5556$. This is why national polls typically interview around a thousand people, regardless of the population size, which (for a population much larger than the sample) hardly matters. We return to this calculation in [[statistics/confidence-intervals#ex-poll-ci]].
:::
:::

::: example Why insurance works {#ex-insurance}
An insurer sells $n$ independent policies for a premium of £550 each. The claim on a policy has mean £500 and standard deviation £2000 (most policies claim nothing, a few claim a lot). Approximate the probability that total claims exceed total premiums, for $n = 1000$ and for $n = 10\,000$.
::: solution
Total claims $S$ have mean $500n$ and standard deviation $2000\sqrt n$, and premiums total $550n$. By the CLT,

$$
\Prob(S>550n)\approx1 - \Phi\Bigl(\frac{550n - 500n}{2000\sqrt n}\Bigr) = 1 - \Phi\Bigl(\frac{\sqrt n}{40}\Bigr).
$$

For $n = 1000$ this is $1-\Phi(0.79)\approx0.21$: a loss in about one year in five. For $n = 10\,000$ it is $1 - \Phi(2.5)\approx0.006$. The expected profit grows like $n$ but the standard deviation of the total only like $\sqrt n$, so a large enough pool of independent risks makes a loss very unlikely. (The approximation is rougher in the far tail, and the argument fails if risks are not independent — a flood or a pandemic produces many claims at once.)
:::
:::

::: quiz
$X_1,\ldots,X_{48}$ are independent and uniform on $[0,1]$. Approximately what is the distribution of $S = X_1+\dots+X_{48}$?
- [ ] Uniform on $[0, 48]$
- [ ] $\Normal(24, 48)$
- [x] $\Normal(24, 4)$
- [ ] $\Normal(24, 16)$
::: solution
Each $X_i$ has mean $\tfrac12$ and variance $\tfrac1{12}$, so $S$ has mean $24$ and variance $48\cdot\tfrac{1}{12} = 4$ (standard deviation $2$). By the CLT, $S$ is approximately $\Normal(24, 4)$. (Old computers generated approximately normal random numbers by adding twelve uniforms and subtracting $6$, which gives mean $0$ and variance $1$.)
:::
:::

::: history
Jacob Bernoulli proved the first law of large numbers, for relative frequencies, in his *Ars Conjectandi* (1713), after twenty years of work; he called it his "golden theorem". Abraham de Moivre found the normal approximation to the binomial in 1733, and Pierre-Simon Laplace extended it in 1810 to sums of quite general independent errors. Siméon-Denis Poisson coined the name "law of large numbers" in 1837. Irénée-Jules Bienaymé (1853) and Pafnuty Chebyshev (1867) found the inequality that gives a two-line proof of the weak law, and Chebyshev's students Andrey Markov and Aleksandr Lyapunov carried the theory forward; Lyapunov's 1901 proof of the central limit theorem under general conditions used characteristic functions, which became the standard tool. Jarl Waldemar Lindeberg gave a sharp general sufficient condition in 1922, and George Pólya named the result the "central limit theorem" (zentraler Grenzwertsatz) in 1920, meaning central to probability theory. Émile Borel proved the strong law for coin tossing in 1909, and Andrey Kolmogorov proved it for all iid sequences with finite mean.
:::

## Where this leads {#where-next}

The central limit theorem is the engine of classical statistics. It explains why sample means are approximately normal ([[statistics/sampling]]), it gives the margins of error of [[statistics/confidence-intervals]] and the z-tests of [[statistics/hypothesis-testing]], and it justifies the large-sample normality of maximum likelihood estimators ([[statistics/estimation]]). Laws of large numbers also hold for dependent sequences: for a Markov chain the long-run fraction of time spent in a state converges to its stationary probability ([[probability/markov-chains]]). The different modes of convergence (in probability, almost sure, in mean square) are compared systematically in [[measure-theory/lp-spaces]].

::: summary
- Markov: $\Prob(X\ge a)\le\E X/a$ for $X\ge0$. Chebyshev: $\Prob(\lvert X-\mu\rvert\ge\eps)\le\sigma^2/\eps^2$; valid for every distribution, hence crude for any particular one.
- The sample mean of $n$ iid observations has mean $\mu$ and standard deviation $\sigma/\sqrt n$.
- Weak law: $\bar X_n\to\mu$ in probability, proved from Chebyshev; strong law: $\bar X_n\to\mu$ with probability $1$. Relative frequencies converge to probabilities.
- The law of large numbers works by swamping deviations, not by correcting them; the gambler's fallacy is still a fallacy.
- CLT: $(S_n - n\mu)/(\sigma\sqrt n)\to\Normal(0,1)$ in distribution, for any iid sequence with finite variance; so $\bar X_n\approx\Normal(\mu,\sigma^2/n)$ for large $n$.
- The MGF proof: $M(t/\sqrt n)^n = (1 + t^2/(2n) + o(1/n))^n\to e^{t^2/2}$ — only the mean and variance survive.
- For binomial probabilities use $\Normal(np, np(1-p))$ with a continuity correction; finite variance is essential (the Cauchy distribution is a counterexample).
:::

## Exercises

::: exercise Markov's bound {level=1 check="1/4"}
A non-negative random variable has mean $5$. What is the best upper bound Markov's inequality gives for $\Prob(X\ge20)$?
::: solution
$\Prob(X\ge20)\le5/20 = \tfrac14$.
:::
:::

::: exercise Chebyshev's bound {level=1 check="3/4"}
$X$ has mean $50$ and standard deviation $5$. Give the best lower bound Chebyshev's inequality provides for $\Prob(40<X<60)$.
::: solution
The interval is $\mu\pm2\sigma$, so $\Prob(\lvert X-50\rvert\ge10)\le\tfrac{25}{100} = \tfrac14$ and $\Prob(40<X<60)\ge\tfrac34$.
:::
:::

::: exercise Averaging measurements {level=1 check="2"}
A measurement has standard deviation $10$. Find the standard deviation of the average of $25$ independent measurements.
::: solution
By [[#eq-var-mean]], $\sigma/\sqrt n = 10/5 = 2$.
:::
:::

::: exercise Sixes {level=2}
A fair die is rolled $300$ times. Use the normal approximation with continuity correction to estimate the probability of at least $60$ sixes.
::: solution
The number of sixes is $\Bin(300,\tfrac16)$, with mean $50$ and standard deviation $\sqrt{300\cdot\tfrac16\cdot\tfrac56} = \sqrt{41.67}\approx6.455$. Then

$$
\Prob(X\ge60)\approx1-\Phi\Bigl(\frac{59.5-50}{6.455}\Bigr) = 1-\Phi(1.47)\approx0.071 .
$$

(The exact value is $0.073$; the small discrepancy comes from the skewness of the binomial when $p = \tfrac16$.)
:::
:::

::: exercise Tosses for two-decimal accuracy {level=2 check="9604"}
Using the central limit theorem, find how many tosses of a fair coin are needed for the proportion of heads to be within $0.01$ of $\tfrac12$ with probability $0.95$. (Use $1.96$ for the $97.5\%$ point of the normal distribution.)
::: solution
The proportion has standard deviation $\frac{1}{2\sqrt n}$, and we need $1.96\cdot\frac{1}{2\sqrt n} = 0.01$, so $\sqrt n = 98$ and $n = 9604$ — about a fifth of the $50\,000$ that Chebyshev's inequality required in [[#ex-how-many]].
:::
:::

::: exercise Light bulbs in sequence {level=2}
A lighthouse uses bulbs one after another, each replaced immediately when it fails. Lifetimes are independent and exponential with mean $1000$ hours. Approximate the probability that $100$ bulbs last more than $110\,000$ hours in total.
::: solution
Each lifetime has mean $1000$ and standard deviation $1000$ (for the exponential they are equal), so the total has mean $100\,000$ and standard deviation $1000\sqrt{100} = 10\,000$. By the CLT, $\Prob(S>110\,000)\approx1-\Phi(1)\approx0.159$. (The exact distribution of $S$ is the gamma distribution of [[probability/joint-distributions]], which gives $0.158$: the approximation is excellent.)
:::
:::

::: exercise A limit via the CLT {level=3 check="1/2"}
Use the central limit theorem to evaluate $\displaystyle\lim_{n\to\infty}e^{-n}\sum_{k=0}^n\frac{n^k}{k!}$.
::: hint
The sum is $\Prob(S_n\le n)$ for a suitable sum of independent Poisson random variables.
:::
::: solution
Let $S_n = X_1+\dots+X_n$ with $X_i$ iid $\operatorname{Poisson}(1)$. By [[probability/joint-distributions#ex-poisson-sum]], $S_n\sim\operatorname{Poisson}(n)$, so the expression equals $\Prob(S_n\le n)$. Each $X_i$ has mean and variance $1$, so by the CLT

$$
\Prob(S_n\le n) = \Prob\Bigl(\frac{S_n - n}{\sqrt n}\le0\Bigr)\to\Phi(0) = \frac12 .
$$

(The convergence is slow: the values for $n = 10, 100, 1000$ are $0.583$, $0.527$, $0.508$.)
:::
:::

::: exercise A Chernoff bound {level=3}
(a) Prove that for any random variable $X$ with mgf $M$, any $a$ and any $t>0$ with $M(t)<\infty$, $\Prob(X\ge a)\le e^{-ta}M(t)$. (b) For $S_n\sim\Bin(n,\tfrac12)$, take $t = \ln3$ to show that $\Prob\bigl(S_n\ge\tfrac34n\bigr)\le\bigl(2\cdot3^{-3/4}\bigr)^n\approx0.877^n$, and compare with Chebyshev's bound for $n = 100$.
::: solution
(a) For $t>0$, $X\ge a$ if and only if $e^{tX}\ge e^{ta}$. By Markov's inequality applied to $e^{tX}\ge0$, $\Prob(X\ge a)\le\E e^{tX}/e^{ta} = e^{-ta}M(t)$.

(b) $S_n$ has mgf $\bigl(\tfrac{1+e^t}{2}\bigr)^n$. With $a = \tfrac34n$ and $e^t = 3$,

$$
\Prob\bigl(S_n\ge\tfrac34n\bigr)\le3^{-3n/4}\Bigl(\frac{1+3}{2}\Bigr)^n = \bigl(2\cdot3^{-3/4}\bigr)^n\approx0.8774^n.
$$

For $n = 100$ this is about $2\times10^{-6}$. Chebyshev gives only $\Prob(\lvert S_n - 50\rvert\ge25)\le\frac{25}{625} = 0.04$. (The exact probability is about $2.8\times10^{-7}$.) Chernoff bounds decay exponentially in $n$, which makes them the standard tool for bounding error probabilities of randomised algorithms.
:::
:::

::: exercise Convergence to a constant {level=3}
Prove that if $Y_n\xrightarrow{\;d\;}c$, where $c$ is a constant (a random variable equal to $c$ with probability $1$), then $Y_n\xrightarrow{\;\Prob\;}c$.
::: solution
The distribution function of the constant $c$ is $F(x) = 0$ for $x<c$ and $F(x) = 1$ for $x\ge c$, continuous everywhere except at $c$. Let $\eps>0$. Since $c-\eps$ and $c+\tfrac\eps2$ are continuity points, $F_{Y_n}(c-\eps)\to0$ and $F_{Y_n}(c+\tfrac\eps2)\to1$. Therefore

$$
\Prob(\lvert Y_n-c\rvert\ge\eps)\le\Prob(Y_n\le c-\eps) + \Prob\bigl(Y_n>c+\tfrac\eps2\bigr) = F_{Y_n}(c-\eps) + 1 - F_{Y_n}\bigl(c+\tfrac\eps2\bigr)\to0 .
$$

(We used $c + \tfrac\eps2$ rather than $c+\eps$ so that $\{Y_n\ge c+\eps\}\subseteq\{Y_n>c+\tfrac\eps2\}$.) In general convergence in distribution is weaker than convergence in probability, but when the limit is constant the two coincide.
:::
:::
