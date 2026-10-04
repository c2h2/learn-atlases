At a party, $n$ guests leave their hats at the door, and at the end of the evening the hats are handed back at random. On average, how many guests get their own hat back? In [[probability/probability-spaces]] we found the probability that *nobody* does, using inclusion–exclusion; finding the whole distribution of the number of matches takes even more work. Yet the *average* number of matches can be found in one line, and the answer is $1$, whether there are $3$ guests or $3$ million. The tool that makes this possible is **linearity of expectation**, which holds without any assumption of independence.

This chapter collects the most powerful techniques for computing with expectations. We begin with linearity and the method of **indicator variables**. Then we define **conditional expectation**, the expected value of one random variable given the value of another, and prove the laws of total expectation and total variance, which let us analyse a random quantity in stages. Finally we meet **generating functions**: the probability generating function $\E s^X$ and the moment generating function $\E e^{tX}$ encode a whole distribution in a single function, turn sums of independent random variables into products, and give the most efficient route to moments, to the extinction probability of a population and to the central limit theorem.

## Linearity of expectation {#linearity}

In [[probability/joint-distributions]] we saw that $\E(X+Y) = \E X + \E Y$ for discrete or jointly continuous random variables, as a consequence of the formula for $\E g(X,Y)$. By induction this extends to any finite number of terms.

::: theorem Linearity of expectation {#thm-linearity}
If $X_1,\ldots,X_n$ have expectations and $a_1,\ldots,a_n,b$ are constants, then

$$
\E\Bigl(\sum_{i=1}^na_iX_i + b\Bigr) = \sum_{i=1}^na_i\,\E X_i + b .
$$

No assumption of independence is needed.
:::

::: proof
For $n = 1$ this is $\E(aX+b) = a\E X + b$ ([[probability/discrete-random-variables]], [[probability/continuous-random-variables]]). Suppose it holds for $n-1$ terms, and write $S = \sum_{i<n}a_iX_i$. Then $\sum_{i\le n}a_iX_i + b = S + (a_nX_n + b)$, and by the two-variable case $\E(S + a_nX_n + b) = \E S + \E(a_nX_n + b) = \sum_{i<n}a_i\E X_i + a_n\E X_n + b$, using the induction hypothesis for $\E S$. (The two-variable case was proved for discrete and for jointly continuous pairs; in complete generality it is a basic property of the Lebesgue integral, [[measure-theory/lebesgue-integral]].)
:::

The power of linearity comes from combining it with **indicator variables**. To find the expected number of events among $A_1,\ldots,A_n$ that occur, write that number as $N = \mathbf{1}_{A_1}+\dots+\mathbf{1}_{A_n}$; since $\E\mathbf{1}_{A_i} = \Prob(A_i)$,

$$
\E N = \sum_{i=1}^n\Prob(A_i).
$$ {#eq-indicator-method}

The events can be dependent in complicated ways; it does not matter.

::: example Matching hats {#ex-hats}
$n\ge2$ hats are returned to their $n$ owners in a uniformly random order. Let $N$ be the number of owners who receive their own hat. Find $\E N$ and $\Var N$.
::: solution
Let $A_i$ be the event that guest $i$ gets their own hat. In a uniformly random permutation, hat $i$ is equally likely to go to each of the $n$ guests, so $\Prob(A_i) = 1/n$, and by [[#eq-indicator-method]]

$$
\E N = n\cdot\frac1n = 1 .
$$

For the variance we need the covariances of the indicators. For $i\ne j$, $\Prob(A_i\cap A_j) = \frac{(n-2)!}{n!} = \frac{1}{n(n-1)}$, so

$$
\Cov(\mathbf{1}_{A_i},\mathbf{1}_{A_j}) = \frac{1}{n(n-1)} - \frac{1}{n^2} = \frac{1}{n^2(n-1)} .
$$

The indicators are positively correlated: if guest $i$ has the right hat, the remaining hats are a little more likely to match. By [[probability/joint-distributions#thm-covariance]], summing $n$ variances $\frac1n(1-\frac1n)$ and $n(n-1)$ ordered pairs of covariances,

$$
\Var N = n\cdot\frac1n\Bigl(1 - \frac1n\Bigr) + n(n-1)\cdot\frac{1}{n^2(n-1)} = 1 - \frac1n + \frac1n = 1 .
$$

Both the mean and the variance equal $1$ for every $n\ge2$ — the same as for a $\operatorname{Poisson}(1)$ random variable, and indeed the distribution of $N$ converges to $\operatorname{Poisson}(1)$; we saw in [[probability/probability-spaces]] that $\Prob(N = 0)\to e^{-1}$.
:::
:::

::: widget distribution
dist: poisson
params: lambda=1
caption: The $\operatorname{Poisson}(1)$ distribution, the limit of the number of fixed points of a random permutation. $\Prob(N = 0) = \Prob(N = 1) = e^{-1}\approx0.368$, and three or more matches happen only about $8\%$ of the time. For a party of $10$ guests the exact probabilities agree with these to about six decimal places.
:::

Indicators also settle the claims about sampling without replacement made in [[probability/discrete-random-variables]].

::: example Mean and variance of the hypergeometric distribution {#ex-hypergeometric}
A sample of $n$ items is drawn without replacement from $N$ items, of which $K$ are successes. Let $X$ be the number of successes in the sample and $p = K/N$. Show that $\E X = np$ and $\Var X = np(1-p)\dfrac{N-n}{N-1}$.
::: solution
Let $A_i$ be the event that the $i$-th item drawn is a success. By symmetry each draw is equally likely to be any of the $N$ items, so $\Prob(A_i) = p$ and $\E X = np$. For $i\ne j$, the ordered pair of items in draws $i$ and $j$ is equally likely to be any ordered pair of distinct items, so $\Prob(A_i\cap A_j) = \frac{K(K-1)}{N(N-1)}$ and

$$
\Cov(\mathbf{1}_{A_i},\mathbf{1}_{A_j}) = \frac{K(K-1)}{N(N-1)} - \frac{K^2}{N^2} = \frac{K\bigl((K-1)N - K(N-1)\bigr)}{N^2(N-1)} = -\frac{p(1-p)}{N-1}.
$$

Hence

$$
\Var X = np(1-p) - n(n-1)\frac{p(1-p)}{N-1} = np(1-p)\Bigl(1 - \frac{n-1}{N-1}\Bigr) = np(1-p)\frac{N-n}{N-1}.
$$

The negative covariance (one success drawn leaves fewer for later) makes the variance smaller than the binomial $np(1-p)$; if the whole population is sampled, $n = N$, the variance is $0$, as it must be.
:::
:::

::: example The coupon collector {#ex-coupon}
Each box of cereal contains one of $n$ different toys, each equally likely, independently of other boxes. How many boxes must you buy, on average, to collect all $n$ toys?
::: solution
Let $T$ be the number of boxes, and write $T = T_1 + T_2 + \dots + T_n$, where $T_k$ is the number of boxes bought after the $(k-1)$-th new toy appears, up to and including the box with the $k$-th new toy. While you have $k-1$ different toys, each box contains a new one with probability $\frac{n-k+1}{n}$, independently, so $T_k\sim\operatorname{Geom}\bigl(\frac{n-k+1}{n}\bigr)$, with mean $\frac{n}{n-k+1}$. By linearity,

$$
\E T = \sum_{k=1}^n\frac{n}{n-k+1} = n\Bigl(1 + \frac12 + \frac13 + \dots + \frac1n\Bigr) = nH_n,
$$

where $H_n$ is the $n$-th harmonic number. For $n = 6$ (all six faces of a die) this is $14.7$ rolls; for $n = 50$ it is about $225$ boxes. Since $H_n\approx\ln n + 0.577$, the expected number grows like $n\ln n$: the last few toys take most of the time, the final one alone needing $n$ boxes on average.
:::
:::

::: warning Linearity is for sums, not for products or other functions
$\E(X+Y) = \E X+\E Y$ always, but $\E(XY) = \E X\,\E Y$ needs extra information, such as independence (and fails in general: take $Y = X$, so that $\E X^2\ne(\E X)^2$ unless $X$ is constant). Likewise $\E\max(X,Y)\ne\max(\E X,\E Y)$ and $\E(1/X)\ne1/\E X$ in general. A frequent error in the coupon collector problem is to argue "each toy has probability $1/n$ per box, so $n$ boxes suffice on average": that confuses the expected number of boxes until a *particular* toy appears ($n$) with the time until *all* have appeared ($nH_n$).
:::

::: quiz
Ten people are in a room, with birthdays independent and uniform over $365$ days. What is the expected number of pairs of people who share a birthday?
- [ ] $10/365$
- [x] $45/365$
- [ ] $1 - \prod_{k=0}^{9}(1 - k/365)$
- [ ] $90/365$
::: solution
There are $\binom{10}{2} = 45$ pairs, and each pair shares a birthday with probability $\frac{1}{365}$. By linearity the expected number of matching pairs is $45/365\approx0.123$, although the events for different pairs are dependent. The third option is the probability of *at least one* shared birthday ($\approx0.117$) — close, but a different quantity.
:::
:::

## Conditional expectation {#conditional-expectation}

The conditional distribution of $X$ given $Y = y$ ([[probability/joint-distributions]]) is a probability distribution, so it has a mean.

::: definition Conditional expectation {#def-conditional-expectation}
The **conditional expectation of $X$ given $Y = y$** is the mean of the conditional distribution:

$$
\E(X\mid Y=y) = \sum_xx\,p_{X\mid Y}(x\mid y)\qquad\text{or}\qquad\E(X\mid Y=y) = \int_{-\infty}^\infty x\,f_{X\mid Y}(x\mid y)\,dx,
$$

in the discrete and jointly continuous cases. If $g(y) = \E(X\mid Y = y)$, the random variable $g(Y)$ is denoted $\E(X\mid Y)$.
:::

It is important that $\E(X\mid Y)$ is a *random variable*: a function of $Y$, whose value is the best prediction of $X$ once $Y$ is known. For the uniform point in a disc ([[probability/joint-distributions#ex-disc]]), $\E(Y\mid X) = 0$ by symmetry, and for the standard bivariate normal ([[probability/joint-distributions#prop-bivariate-normal]]), $\E(Y\mid X) = \rho X$. The most important property is that averaging the conditional expectation over $Y$ gives back the unconditional expectation.

::: theorem Law of total expectation {#thm-tower}
If $X$ has an expectation, then

$$
\E\bigl[\E(X\mid Y)\bigr] = \E X .
$$ {#eq-tower}

In the discrete case this reads $\E X = \sum_y\E(X\mid Y = y)\,\Prob(Y = y)$.
:::

::: proof
In the discrete case, with $g(y) = \E(X\mid Y=y)$,

$$
\E g(Y) = \sum_yg(y)p_Y(y) = \sum_y\sum_xx\frac{p_{X,Y}(x,y)}{p_Y(y)}p_Y(y) = \sum_xx\sum_yp_{X,Y}(x,y) = \sum_xx\,p_X(x) = \E X .
$$

The exchange of the order of summation is justified because the same calculation with $\lvert x\rvert$ in place of $x$ gives the finite value $\E\lvert X\rvert$. The continuous case is identical with integrals and densities, and $f_{X\mid Y}(x\mid y)f_Y(y) = f_{X,Y}(x,y)$.
:::

The law of total expectation is the expectation version of the law of total probability, and it is used in the same way: to compute $\E X$, condition on whatever makes the problem easy. Two further rules are intuitive and follow from the definitions in the same way: if $X$ and $Y$ are independent then $\E(X\mid Y) = \E X$ (knowing $Y$ does not help predict $X$), and for any function $h$, $\E\bigl(h(Y)X\mid Y\bigr) = h(Y)\,\E(X\mid Y)$ (once $Y$ is known, $h(Y)$ behaves like a constant).

::: example Waiting for two heads in a row {#ex-hh}
A fair coin is tossed until two consecutive heads appear. Find the expected number of tosses.
::: solution
Let $\mu$ be the expected number of tosses from the start, and $\mu_H$ the expected number of *further* tosses needed when the last toss was a head (but the game is not over). Condition on the next toss (**first-step analysis**). From the start, one toss is made; with probability $\tfrac12$ it is a tail and we are back at the start, and with probability $\tfrac12$ it is a head:

$$
\mu = 1 + \tfrac12\mu + \tfrac12\mu_H .
$$

After a head, one more toss either finishes the game (head) or sends us back to the start (tail):

$$
\mu_H = 1 + \tfrac12\cdot0 + \tfrac12\mu .
$$

Here we use the law of total expectation together with the independence of the tosses, which means that after a tail the future looks exactly as it did at the start. Substituting the second equation into the first gives $\mu = 1 + \tfrac12\mu + \tfrac12 + \tfrac14\mu$, so $\tfrac14\mu = \tfrac32$ and $\mu = 6$. (Surprisingly, waiting for "head then tail" takes only $4$ tosses on average: see the exercises.)
:::
:::

Conditioning also decomposes the variance.

::: theorem Law of total variance {#thm-total-variance}
Define the conditional variance $\Var(X\mid Y) = \E\bigl(X^2\mid Y\bigr) - \bigl(\E(X\mid Y)\bigr)^2$. If $\E X^2<\infty$, then

$$
\Var X = \E\bigl[\Var(X\mid Y)\bigr] + \Var\bigl(\E(X\mid Y)\bigr).
$$ {#eq-total-variance}
:::

::: proof
Write $g(Y) = \E(X\mid Y)$. By the law of total expectation applied to $X^2$,

$$
\E\bigl[\Var(X\mid Y)\bigr] = \E\bigl[\E(X^2\mid Y)\bigr] - \E\bigl[g(Y)^2\bigr] = \E X^2 - \E\bigl[g(Y)^2\bigr],
$$

and, since $\E g(Y) = \E X$,

$$
\Var g(Y) = \E\bigl[g(Y)^2\bigr] - (\E X)^2 .
$$

Adding the two lines gives $\E X^2 - (\E X)^2 = \Var X$.
:::

The two terms have a clear meaning: the total variability of $X$ is the average variability *within* each group (fixed $Y$) plus the variability *between* the group means. This decomposition is the basis of the analysis of variance in statistics.

::: example Random sums and insurance {#ex-random-sum}
An insurer receives $N$ claims in a year, with $N\sim\operatorname{Poisson}(100)$. The claim sizes $X_1,X_2,\ldots$ are independent, independent of $N$, with mean £2000 and standard deviation £1500. Find the mean and standard deviation of the total $S = X_1+\dots+X_N$.
::: solution
Write $m = \E X_i$ and $s^2 = \Var X_i$. Given $N = n$, the total is a sum of $n$ independent claims (their distribution is unaffected by the value of $N$, by independence), so $\E(S\mid N) = Nm$ and $\Var(S\mid N) = Ns^2$. By the laws of total expectation and total variance,

$$
\E S = \E(Nm) = m\,\E N,\qquad\Var S = \E(Ns^2) + \Var(Nm) = s^2\,\E N + m^2\Var N .
$$

With $\E N = \Var N = 100$: $\E S = \pounds200\,000$ and $\Var S = 100\,(1500^2 + 2000^2) = 6.25\times10^8$, so the standard deviation is £25,000. Note that the randomness in the *number* of claims contributes more to the variance ($m^2\Var N = 4\times10^8$) than the randomness in their sizes ($s^2\E N = 2.25\times10^8$). The formula $\E S = \E N\,\E X$ is known as **Wald's identity**.
:::
:::

::: example A coin of unknown bias {#ex-unknown-bias}
A coin's probability of heads $P$ is itself random, uniformly distributed on $[0,1]$. Given $P = p$, the coin is tossed $n$ times independently. Find the mean and variance of the number of heads $X$.
::: solution
Given $P$, $X\sim\Bin(n,P)$, so $\E(X\mid P) = nP$ and $\Var(X\mid P) = nP(1-P)$. With $\E P = \tfrac12$, $\E P^2 = \tfrac13$ and $\Var P = \tfrac1{12}$:

$$
\E X = n\,\E P = \frac n2,\qquad\Var X = n\,\E\bigl[P(1-P)\bigr] + n^2\Var P = n\Bigl(\frac12 - \frac13\Bigr) + \frac{n^2}{12} = \frac{n(n+2)}{12}.
$$

For a fair coin the variance would be $n/4$; uncertainty about the coin's bias inflates the variance to order $n^2$. In fact $X$ turns out to be *uniformly* distributed on $\{0,1,\ldots,n\}$ (whose variance is exactly $n(n+2)/12$), a result essentially due to Thomas Bayes and revisited in [[statistics/bayesian]].
:::
:::

## Probability generating functions {#pgf}

For random variables with values in $\{0,1,2,\ldots\}$, the whole sequence of probabilities can be packaged into a single power series.

::: definition Probability generating function {#def-pgf}
Let $X$ take values in $\{0,1,2,\ldots\}$ with $p_k = \Prob(X = k)$. Its **probability generating function** (pgf) is

$$
G_X(s) = \E\,s^X = \sum_{k=0}^\infty p_ks^k,
$$

defined at least for $\lvert s\rvert\le1$, where the series converges absolutely because $\sum p_k = 1$.
:::

Some examples, each a short calculation from the definition (with $q = 1-p$):

| distribution | $\operatorname{Bernoulli}(p)$ | $\Bin(n,p)$ | $\operatorname{Geom}(p)$ | $\operatorname{Poisson}(\lambda)$ |
|---|---|---|---|---|
| pgf $G(s)$ | $q + ps$ | $(q+ps)^n$ | $\dfrac{ps}{1-qs}$ | $e^{\lambda(s-1)}$ |

For instance $\E s^X = \sum_ke^{-\lambda}\lambda^ks^k/k! = e^{-\lambda}e^{\lambda s}$ for the Poisson. Generating functions of sequences were met in [[discrete/generating-functions]]; here the sequence is a probability distribution.

::: theorem Properties of probability generating functions {#thm-pgf}
Let $X$, $Y$ take values in $\{0,1,2,\ldots\}$.

1. (Uniqueness) $G_X$ determines the distribution: $p_k = G_X^{(k)}(0)/k!$.
2. (Moments) $\E X = G_X'(1)$ and $\E[X(X-1)] = G_X''(1)$, where derivatives at $1$ are left derivatives, possibly infinite.
3. (Sums) If $X$ and $Y$ are independent, then $G_{X+Y}(s) = G_X(s)\,G_Y(s)$.
4. (Random sums) If $N, X_1, X_2,\ldots$ are independent, the $X_i$ all have pgf $G_X$, and $S = X_1+\dots+X_N$ (with $S = 0$ when $N = 0$), then $G_S(s) = G_N\bigl(G_X(s)\bigr)$.
:::

::: proof
(1) $G_X$ is a power series with radius of convergence at least $1$, so it can be differentiated term by term inside $\lvert s\rvert<1$, and its coefficients are recovered as $G_X^{(k)}(0)/k!$ ([[calculus-2/power-series]]).

(2) For $0\le s<1$, $G_X'(s) = \sum_{k\ge1}kp_ks^{k-1}$. As $s$ increases to $1$ each term increases to $kp_k$, so the sum increases to $\sum_kkp_k = \E X$ (for a series of non-negative terms, the limit can be taken term by term; this is Abel's theorem). The second derivative is handled in the same way, with terms $k(k-1)p_ks^{k-2}$.

(3) $s^{X+Y} = s^Xs^Y$, and $s^X$, $s^Y$ are independent (functions of independent random variables), so by [[probability/joint-distributions#thm-product]] $\E s^{X+Y} = \E s^X\,\E s^Y$.

(4) Condition on $N$. Given $N = n$, $S$ is a sum of $n$ independent random variables with pgf $G_X$, so by (3) $\E(s^S\mid N = n) = G_X(s)^n$. By the law of total expectation, $G_S(s) = \E\bigl[G_X(s)^N\bigr] = G_N\bigl(G_X(s)\bigr)$.
:::

Part (3) converts the convolution of [[probability/joint-distributions#thm-convolution]] into a product. For example, the pgf of $\Bin(n,p)$ is the $n$-th power of the Bernoulli pgf, because a binomial variable is a sum of $n$ independent Bernoulli variables, and two independent Poisson variables have $G_{X+Y}(s) = e^{\lambda(s-1)}e^{\mu(s-1)} = e^{(\lambda+\mu)(s-1)}$, giving a one-line proof that their sum is $\operatorname{Poisson}(\lambda+\mu)$.

::: example Thinning a Poisson count {#ex-thinning}
A hen lays $N\sim\operatorname{Poisson}(\lambda)$ eggs, and each egg hatches with probability $p$, independently of everything else. Find the distribution of the number of chicks.
::: solution
The number of chicks is $S = X_1+\dots+X_N$, with $X_i\sim\operatorname{Bernoulli}(p)$ indicating whether egg $i$ hatches. By part (4) of [[#thm-pgf]], with $G_X(s) = q + ps$ and $G_N(s) = e^{\lambda(s-1)}$,

$$
G_S(s) = e^{\lambda(q + ps - 1)} = e^{\lambda p(s-1)},
$$

which is the pgf of $\operatorname{Poisson}(\lambda p)$. By uniqueness, $S\sim\operatorname{Poisson}(\lambda p)$. A Poisson number of events, each kept independently with probability $p$, is again Poisson.
:::
:::

### Branching processes

Generating functions are the natural tool for a classic problem raised by Francis Galton: will a family name die out? In a **Galton–Watson branching process**, each individual has a random number of children with pgf $G$, independently of all others, and $Z_n$ is the size of generation $n$, starting from $Z_0 = 1$. Since $Z_{n+1}$ is a random sum of $Z_n$ independent offspring counts, part (4) of [[#thm-pgf]] gives $G_{Z_{n+1}} = G_{Z_n}\circ G$, and by induction the pgf of $Z_n$ is the $n$-fold composition $G_n = G\circ G\circ\dots\circ G$.

::: theorem Extinction probability {#thm-extinction}
The probability $\eta$ that the population eventually dies out is the smallest non-negative solution of $G(s) = s$. If the mean number of children $m = G'(1)$ satisfies $m\le1$ (and $\Prob(\text{exactly one child})<1$), then $\eta = 1$; if $m>1$, then $\eta<1$.
:::

::: proof
Let $e_n = \Prob(Z_n = 0) = G_n(0)$. Extinction by generation $n$ implies extinction by generation $n+1$, so $e_n$ increases, and by continuity of probability $e_n\to\eta = \Prob(\text{extinction})$. Since $e_{n+1} = G(e_n)$ and $G$ is continuous on $[0,1]$, letting $n\to\infty$ gives $\eta = G(\eta)$. If $\psi\ge0$ is any solution of $G(\psi) = \psi$, then $e_0 = 0\le\psi$, and if $e_n\le\psi$ then $e_{n+1} = G(e_n)\le G(\psi) = \psi$ because $G$ is increasing; so $e_n\le\psi$ for all $n$ and $\eta\le\psi$. Thus $\eta$ is the smallest such solution.

For the criterion (a sketch): $G$ is convex on $[0,1]$ with $G(1) = 1$. If $m = G'(1)>1$, then $G(s)<s$ for $s$ slightly less than $1$, while $G(0)\ge0$, so by the intermediate value theorem there is a root of $G(s) = s$ in $[0,1)$ and $\eta<1$. If $m\le1$, convexity gives $G(s)\ge1 - m(1-s)\ge s$, with strict inequality for $s<1$ unless $G(s) = s$ identically (that is, every individual has exactly one child); so the only root in $[0,1]$ is $1$.
:::

::: widget plot
f: exp(m*(x - 1)); x
x: 0, 1
y: 0, 1
sliders: m=1.5:0.2:3:0.05
labels: G(s) = e^{m(s-1)}; s
caption: Branching with $\operatorname{Poisson}(m)$ offspring. The extinction probability is where the curve $G(s)$ first meets the diagonal. For $m\le1$ they meet only at $s = 1$: extinction is certain. As $m$ rises above $1$ a second crossing appears and moves left; at $m = 1.5$ it is at $s\approx0.417$, so a population started by one individual survives forever with probability about $0.58$.
:::

## Moment generating functions {#mgf}

For random variables that are not integer-valued we replace $s^X$ by $e^{tX}$ (formally $s = e^t$).

::: definition Moment generating function {#def-mgf}
The **moment generating function** (mgf) of a random variable $X$ is

$$
M_X(t) = \E\,e^{tX},
$$

for those $t$ at which the expectation is finite. We say that $X$ **has an mgf** if $M_X(t)<\infty$ for all $t$ in some interval $(-h,h)$, $h>0$.
:::

::: theorem Properties of moment generating functions {#thm-mgf}
Suppose $X$ and $Y$ have mgfs.

1. (Moments) For $\lvert t\rvert<h$, $M_X(t) = \sum_{k=0}^\infty\dfrac{\E X^k}{k!}t^k$; in particular all moments are finite and $\E X^k = M_X^{(k)}(0)$.
2. (Sums) If $X$ and $Y$ are independent, then $M_{X+Y}(t) = M_X(t)M_Y(t)$; also $M_{aX+b}(t) = e^{bt}M_X(at)$.
3. (Uniqueness) If $M_X(t) = M_Y(t)$ for all $t$ in an interval $(-h,h)$, then $X$ and $Y$ have the same distribution.
:::

::: proof
(1) *Sketch.* Expand $e^{tX} = \sum_k(tX)^k/k!$. For $\lvert t\rvert<h$, $\sum_k\lvert tX\rvert^k/k! = e^{\lvert tX\rvert}\le e^{tX} + e^{-tX}$, whose expectation $M_X(t) + M_X(-t)$ is finite. This domination allows the expectation to be taken term by term (by the dominated convergence theorem, [[measure-theory/lebesgue-integral]]), giving the power series; the coefficients of a power series are its derivatives at $0$ divided by $k!$.

(2) $e^{t(X+Y)} = e^{tX}e^{tY}$ is a product of independent random variables, so its expectation is $M_X(t)M_Y(t)$ by [[probability/joint-distributions#thm-product]]. The second formula is $\E e^{t(aX+b)} = e^{bt}\E e^{(at)X}$.

(3) This is an inversion theorem for the Laplace transform; its proof is beyond this course. It can be found, for instance, in Billingsley's *Probability and Measure* (Section 30) or, via characteristic functions, in Grimmett and Stirzaker's *Probability and Random Processes* (Chapter 5).
:::

For $Z\sim\Normal(0,1)$, completing the square as in the lognormal exercise of [[probability/continuous-random-variables]] gives $M_Z(t) = e^{t^2/2}$, and so for $X = \mu+\sigma Z$, by part (2),

$$
M_X(t) = e^{\mu t + \sigma^2t^2/2}.
$$ {#eq-normal-mgf}

Expanding $e^{t^2/2} = 1 + \frac{t^2}{2} + \frac{t^4}{8} + \dots$ and comparing with part (1) gives $\E Z = 0$, $\E Z^2 = 1$, $\E Z^3 = 0$, $\E Z^4 = 3$. Other mgfs: $\operatorname{Exp}(\lambda)$ has $M(t) = \dfrac{\lambda}{\lambda-t}$ for $t<\lambda$ (so $\E X^k = k!/\lambda^k$), and $\operatorname{Poisson}(\lambda)$ has $M(t) = e^{\lambda(e^t-1)}$.

::: widget plot
f: 1/(1 - x); exp(x^2/2)
x: -2, 0.8
y: 0, 5
tangent: 0
labels: M(t) \text{ for } \operatorname{Exp}(1); M(t) \text{ for } \Normal(0,1)
caption: Two moment generating functions; both pass through $(0,1)$ since $M(0) = \E e^0 = 1$. The tangent to the $\operatorname{Exp}(1)$ mgf at $t = 0$ has slope $M'(0) = 1 = \E X$; drag it along the curve. The normal mgf has slope $0 = \E Z$ at $t=0$, and its curvature there is $M''(0) = 1 = \E Z^2$. The exponential mgf blows up at $t = 1$: it exists only for $t<\lambda$.
:::

::: corollary Sums of independent normals {#cor-normal-sum}
If $X\sim\Normal(\mu_1,\sigma_1^2)$ and $Y\sim\Normal(\mu_2,\sigma_2^2)$ are independent, then $X+Y\sim\Normal(\mu_1+\mu_2,\ \sigma_1^2+\sigma_2^2)$. More generally any linear combination $a_1X_1+\dots+a_nX_n + b$ of independent normal random variables is normal.
:::

::: proof
By part (2) of [[#thm-mgf]] and [[#eq-normal-mgf]],

$$
M_{X+Y}(t) = e^{\mu_1t+\sigma_1^2t^2/2}e^{\mu_2t+\sigma_2^2t^2/2} = e^{(\mu_1+\mu_2)t + (\sigma_1^2+\sigma_2^2)t^2/2},
$$

which is the mgf of $\Normal(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$; by uniqueness, that is the distribution of $X+Y$. The general statement follows by induction, using $M_{aX+b}(t) = e^{bt}M_X(at)$, which shows that $aX + b$ is normal whenever $X$ is.
:::

::: example Who is taller? {#ex-taller}
In a population, men's heights are $\Normal(170, 8^2)$ and women's heights are $\Normal(160, 7^2)$, in centimetres. A man and a woman are chosen independently at random. Find the probability that the woman is taller.
::: solution
Let $X$ and $Y$ be the man's and the woman's heights. By [[#cor-normal-sum]] (with $a_1 = -1$), $D = Y - X\sim\Normal(160 - 170,\ 7^2 + 8^2) = \Normal(-10, 113)$. Hence

$$
\Prob(Y>X) = \Prob(D>0) = 1 - \Phi\Bigl(\frac{0-(-10)}{\sqrt{113}}\Bigr) = 1 - \Phi(0.941)\approx0.173 .
$$

Note that the variances add although we subtract the heights. (For real couples the independence assumption is questionable, since partners' heights are positively correlated; with positive correlation $\Var D$ is smaller and the probability lower.)
:::
:::

::: remark When there is no mgf
Not every distribution has an mgf: for the Cauchy distribution $\E e^{tX} = \infty$ for every $t\ne0$, and the lognormal distribution has moments of all orders but $\E e^{tX} = \infty$ for every $t>0$. The **characteristic function** $\varphi_X(t) = \E e^{itX}$, using complex exponentials, always exists because $\lvert e^{itX}\rvert = 1$, and it has the same multiplication and uniqueness properties; it is the tool used in the general proof of the central limit theorem.
:::

::: quiz
A random variable has moment generating function $M(t) = e^{3(e^t - 1)}$. What are its distribution and variance?
- [ ] $\Normal(3, 1)$, variance $1$
- [x] $\operatorname{Poisson}(3)$, variance $3$
- [ ] $\operatorname{Exp}(3)$, variance $\tfrac19$
- [ ] $\Bin(3, e^{-1})$
::: solution
$e^{\lambda(e^t-1)}$ is the $\operatorname{Poisson}(\lambda)$ mgf, here with $\lambda = 3$, and uniqueness identifies the distribution. Directly: $M'(t) = 3e^tM(t)$, so $\E X = M'(0) = 3$; $M''(t) = (3e^t + 9e^{2t})M(t)$, so $\E X^2 = 12$ and $\Var X = 12 - 9 = 3$.
:::
:::

::: history
The expectation of a gamble was the central notion of Christiaan Huygens's treatise of 1657. Generating functions were introduced by Abraham de Moivre in the early eighteenth century, for instance to count the ways of obtaining a given total with several dice, and Pierre-Simon Laplace made them a systematic method in his *Théorie analytique des probabilités* (1812), whose first part is devoted to the "calculus of generating functions". The extinction problem was posed by Francis Galton in the *Educational Times* in 1873, and Henry William Watson's solution using iterated generating functions appeared in a joint paper with Galton in 1875; the correct criterion had already been stated by Irénée-Jules Bienaymé in 1845, a fact rediscovered only in the 1970s. Conditional expectation with respect to a general random variable was defined rigorously by Andrey Kolmogorov in 1933, using the Radon–Nikodym theorem.
:::

## Where this leads {#where-next}

Moment generating functions give the proof of the central limit theorem in [[probability/limit-theorems]]: the mgf of a standardised sum converges to $e^{t^2/2}$. First-step analysis, used for the two-heads problem, is the basic technique for absorption probabilities and expected hitting times in [[probability/markov-chains]]. Conditional expectation is the foundation of prediction and regression ([[statistics/regression]]), and the law of total variance underlies the decomposition of sums of squares in the analysis of variance. In measure-theoretic probability, $\E(X\mid Y)$ is defined as an orthogonal projection, which connects it with [[linear-algebra/least-squares]].

::: summary
- Linearity: $\E\sum a_iX_i = \sum a_i\E X_i$ for any random variables with expectations — independence is not needed.
- The indicator method: the expected number of events that occur is $\sum\Prob(A_i)$; variances of such counts need the covariances of the indicators.
- $\E(X\mid Y)$ is a random variable, a function of $Y$; $\E[\E(X\mid Y)] = \E X$, and $\Var X = \E[\Var(X\mid Y)] + \Var(\E(X\mid Y))$.
- Conditioning on the first step turns expected waiting times into linear equations.
- For integer-valued $X$, the pgf $G_X(s) = \E s^X$ determines the distribution, gives $\E X = G'(1)$, multiplies for independent sums and composes for random sums.
- A branching process dies out with probability equal to the smallest root of $G(s) = s$, which is $1$ exactly when the mean number of offspring is at most $1$ (excluding the trivial case of exactly one child).
- The mgf $M_X(t) = \E e^{tX}$ generates moments, multiplies for independent sums and determines the distribution; the normal mgf $e^{\mu t+\sigma^2t^2/2}$ shows that sums of independent normals are normal.
:::

## Exercises

::: exercise A hundred dice {level=1 check="875/3"}
One hundred fair dice are rolled. Find the expectation and the variance of the total.
::: solution
By linearity the expectation is $100\times\tfrac72 = 350$. The dice are independent, so variances add: $100\times\tfrac{35}{12} = \tfrac{875}{3}\approx291.7$ (standard deviation about $17.1$).
:::
:::

::: exercise Reading a pgf {level=1 check="4"}
A random variable has pgf $G(s) = (0.2 + 0.8s)^5$. Identify its distribution and find its mean.
::: solution
This is $(q+ps)^n$ with $n = 5$, $p = 0.8$: the $\Bin(5, 0.8)$ distribution, by uniqueness. Its mean is $G'(1) = 5\times0.8\times(0.2+0.8)^4 = 4$.
:::
:::

::: exercise Reading an mgf {level=1 check="16"}
A random variable $X$ has mgf $M(t) = e^{2t + 8t^2}$. Identify the distribution and find $\Var X$.
::: solution
Comparing with $e^{\mu t + \sigma^2t^2/2}$: $\mu = 2$ and $\sigma^2/2 = 8$, so $X\sim\Normal(2, 16)$ and $\Var X = 16$.
:::
:::

::: exercise Distinct faces {level=2 check="6*(1-(5/6)^6)"}
A fair die is rolled $6$ times. Find the expected number of different faces that appear.
::: hint
Use an indicator for each face.
:::
::: solution
Let $A_j$ be the event that face $j$ appears at least once; $\Prob(A_j) = 1 - (5/6)^6$. By linearity the expected number of distinct faces is $6\bigl(1 - (5/6)^6\bigr)\approx3.99$. So on average only about four of the six faces turn up in six rolls.
:::
:::

::: exercise Head then tail {level=2 check="4"}
A fair coin is tossed until the pattern "head followed by tail" first appears. Find the expected number of tosses.
::: solution
Let $\mu$ be the expected number from the start and $\mu_H$ the expected number of further tosses once the last toss is a head. From the start: $\mu = 1 + \tfrac12\mu + \tfrac12\mu_H$. After a head, a tail finishes and another head leaves us in the same state: $\mu_H = 1 + \tfrac12\cdot0 + \tfrac12\mu_H$, so $\mu_H = 2$. Then $\tfrac12\mu = 2$ and $\mu = 4$. The difference from the $6$ tosses needed for two heads (see [[#ex-hh]]) is that a failed attempt at "HT" (another head) still leaves you one step from success, while a failed attempt at "HH" (a tail) sends you back to the start.
:::
:::

::: exercise A shop's takings {level=2 check="4250"}
The number of customers in a shop in an hour is $\operatorname{Poisson}(10)$, and customers spend independent amounts with mean £20 and standard deviation £5, independent of the number of customers. Find the mean and variance of the takings in an hour; enter the variance.
::: solution
By [[#ex-random-sum]], the mean is $10\times20 = \pounds200$ and the variance is $s^2\E N + m^2\Var N = 25\times10 + 400\times10 = 4250$, a standard deviation of about £65.
:::
:::

::: exercise Four toys {level=2 check="25/3"}
Each packet of crisps contains one of $4$ collectable cards, all equally likely, independently. Find the expected number of packets needed to collect all four.
::: solution
By [[#ex-coupon]], $4\bigl(1+\tfrac12+\tfrac13+\tfrac14\bigr) = 4\cdot\tfrac{25}{12} = \tfrac{25}{3}\approx8.33$.
:::
:::

::: exercise An extinction probability {level=3 check="0.4"}
In a branching process each individual has $0$, $1$ or $2$ children with probabilities $0.2$, $0.3$ and $0.5$. Find the mean number of children and the probability that the line descended from one individual dies out.
::: solution
$G(s) = 0.2 + 0.3s + 0.5s^2$ and $m = G'(1) = 0.3 + 1 = 1.3>1$, so extinction is not certain. Solve $G(s) = s$: $0.5s^2 - 0.7s + 0.2 = 0$, that is $5s^2 - 7s + 2 = 0 = (5s - 2)(s - 1)$. The roots are $s = 0.4$ and $s = 1$; by [[#thm-extinction]] the extinction probability is the smaller root, $0.4$.
:::
:::

::: exercise Splitting a Poisson sum {level=3}
Let $X\sim\operatorname{Poisson}(\lambda)$ and $Y\sim\operatorname{Poisson}(\mu)$ be independent. Prove that, given $X + Y = n$, the conditional distribution of $X$ is $\Bin\bigl(n,\frac{\lambda}{\lambda+\mu}\bigr)$. Deduce $\E(X\mid X+Y)$.
::: solution
By independence and the fact that $X+Y\sim\operatorname{Poisson}(\lambda+\mu)$, for $0\le k\le n$,

$$
\Prob(X = k\mid X+Y = n) = \frac{\Prob(X = k)\Prob(Y = n-k)}{\Prob(X+Y = n)} = \frac{e^{-\lambda}\frac{\lambda^k}{k!}e^{-\mu}\frac{\mu^{n-k}}{(n-k)!}}{e^{-(\lambda+\mu)}\frac{(\lambda+\mu)^n}{n!}} = \binom nk\Bigl(\frac{\lambda}{\lambda+\mu}\Bigr)^k\Bigl(\frac{\mu}{\lambda+\mu}\Bigr)^{n-k}.
$$

This is the $\Bin\bigl(n,\frac{\lambda}{\lambda+\mu}\bigr)$ pmf. Its mean is $\frac{n\lambda}{\lambda+\mu}$, so $\E(X\mid X+Y) = \dfrac{\lambda}{\lambda+\mu}(X+Y)$. If two independent Poisson streams of events are merged, each event of the merged stream came from the first stream with probability $\lambda/(\lambda+\mu)$, independently of the others.
:::
:::

::: exercise Normal moments from the mgf {level=3 check="3"}
Use the mgf $e^{t^2/2}$ to prove that the standard normal has $\E Z^{2k} = \dfrac{(2k)!}{2^kk!} = 1\cdot3\cdot5\cdots(2k-1)$ and $\E Z^{2k+1} = 0$. Enter $\E Z^4$.
::: solution
$e^{t^2/2} = \sum_{k\ge0}\dfrac{(t^2/2)^k}{k!} = \sum_{k\ge0}\dfrac{t^{2k}}{2^kk!}$. By part (1) of [[#thm-mgf]] the coefficient of $t^j$ is $\E Z^j/j!$. There are no odd powers, so the odd moments vanish, and comparing coefficients of $t^{2k}$ gives $\E Z^{2k}/(2k)! = 1/(2^kk!)$, that is $\E Z^{2k} = \frac{(2k)!}{2^kk!}$. Since $(2k)! = \bigl(2\cdot4\cdots2k\bigr)\bigl(1\cdot3\cdots(2k-1)\bigr) = 2^kk!\,\bigl(1\cdot3\cdots(2k-1)\bigr)$, this equals $1\cdot3\cdots(2k-1)$. In particular $\E Z^4 = 3$ and $\E Z^6 = 15$.
:::
:::
