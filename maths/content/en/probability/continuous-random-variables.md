What is the probability that a radioactive atom decays at *exactly* $3.000\ldots$ seconds from now, or that a randomly chosen woman is *exactly* $165$ cm tall? In any reasonable model the answer is $0$: there are uncountably many possible values, and no single one can carry positive probability. Yet questions such as "what is the chance the atom survives for another hour?" or "what fraction of women are taller than $175$ cm?" have perfectly good answers. For quantities that vary continuously, probability is not concentrated at points but spread along the line, like mass along a rod, and it is described by a **density**.

This chapter develops the theory of continuous random variables in parallel with the discrete theory of [[probability/discrete-random-variables]], with sums replaced by integrals ([[calculus-1/integrals]]). We start with distribution functions, which work for every random variable, then define densities, expectation and variance. Three distributions dominate applications: the **uniform**, the **exponential** (the continuous analogue of the geometric, and the only memoryless continuous distribution) and the **normal**, the bell curve. Finally we learn how to find the distribution of a function of a random variable, which among other things explains how computers simulate random numbers with any prescribed distribution.

## Distribution functions {#cdf}

The distribution function, introduced for discrete random variables, makes sense for every random variable and is the common language of the discrete and continuous cases.

::: definition Distribution function {#def-cdf}
The (cumulative) **distribution function** of a random variable $X$ is $F_X\colon\R\to[0,1]$,

$$
F_X(x) = \Prob(X\le x).
$$
:::

For any $a < b$, the event $\{X\le b\}$ is the disjoint union of $\{X\le a\}$ and $\{a < X\le b\}$, so

$$
\Prob(a < X\le b) = F_X(b) - F_X(a).
$$ {#eq-interval}

Every distribution function has the first three properties in the next theorem, and conversely any function with these three properties is the distribution function of some random variable (the probability measure it needs, a Lebesgue–Stieltjes measure, is constructed like Lebesgue measure; see [[measure-theory/lebesgue-measure]]).

::: theorem Properties of distribution functions {#thm-cdf}
Let $F$ be the distribution function of a random variable $X$. Then

1. $F$ is non-decreasing: if $x\le y$ then $F(x)\le F(y)$;
2. $\lim_{x\to-\infty}F(x) = 0$ and $\lim_{x\to\infty}F(x) = 1$;
3. $F$ is right-continuous: $\lim_{h\to0^+}F(x+h) = F(x)$ for every $x$;
4. $\Prob(X = x) = F(x) - F(x^-)$, where $F(x^-) = \lim_{h\to0^+}F(x-h)$.
:::

::: proof
(1) If $x\le y$ then $\{X\le x\}\subseteq\{X\le y\}$; apply monotonicity of probability.

For the remaining parts we use continuity of probability ([[probability/probability-spaces#thm-continuity]]) along sequences; since $F$ is monotone, limits along sequences determine the one-sided limits. (2) The events $\{X\le -n\}$ decrease to $\varnothing$ (no real number is $\le -n$ for every $n$), so $F(-n)\to\Prob(\varnothing) = 0$. The events $\{X\le n\}$ increase to $\Omega$ (every real number is $\le n$ for some $n$), so $F(n)\to1$.

(3) The events $\{X\le x + 1/n\}$ decrease to $\{X\le x\}$, so $F(x+1/n)\to F(x)$.

(4) The events $\{X\le x - 1/n\}$ increase to $\{X < x\}$, so $F(x^-) = \Prob(X<x)$, and $\Prob(X = x) = \Prob(X\le x) - \Prob(X<x) = F(x) - F(x^-)$.
:::

Part (4) says that jumps of $F$ correspond to values carrying positive probability. A discrete random variable has a step-function cdf; a continuous one, as we now define it, has a cdf with no jumps at all.

## Densities {#densities}

::: definition Continuous random variable and density {#def-density}
A random variable $X$ is **continuous** if there is a function $f_X\colon\R\to[0,\infty)$, called a (probability) **density** of $X$, such that

$$
F_X(x) = \int_{-\infty}^x f_X(t)\,dt\qquad\text{for all } x\in\R.
$$ {#eq-density}
:::

Letting $x\to\infty$ shows $\int_{-\infty}^\infty f_X(t)\,dt = 1$ (an improper integral, [[calculus-1/improper-integrals]]), and conversely any non-negative integrable $f$ with total integral $1$ is the density of some random variable. Combining [[#eq-density]] with [[#eq-interval]],

$$
\Prob(a < X\le b) = \int_a^b f_X(x)\,dx,
$$

and more generally $\Prob(X\in A) = \int_A f_X(x)\,dx$ for any reasonable set $A$ (any Borel set, in the language of measure theory). Since $F_X$ is an integral it is continuous, so $\Prob(X = x) = 0$ for every $x$ by part (4) of [[#thm-cdf]]. In particular it does not matter whether the endpoints of an interval are included: $\Prob(a\le X\le b) = \Prob(a<X<b)$. By the fundamental theorem of calculus, $F_X' = f_X$ at every point where $f_X$ is continuous.

The density is *not* a probability. Its meaning comes from small intervals: if $f_X$ is continuous at $x$ then

$$
\Prob(x < X\le x + h) = \int_x^{x+h} f_X(t)\,dt \approx f_X(x)\,h \qquad\text{for small } h > 0,
$$

so $f_X(x)$ is probability *per unit length* near $x$, just as the density of a rod is mass per unit length.

::: warning A density is not a probability
Values of a density can exceed $1$. The uniform density on $[0, \tfrac12]$ equals $2$ on that interval, and a normal density with standard deviation $0.01$ has a peak of about $40$. What must equal $1$ is the *area* under the density. Similarly, $f_X(x) = 0.3$ does not mean "$X = x$ with probability $0.3$": that probability is $0$ for every $x$.
:::

::: example Finding the constant {#ex-density-constant}
Let $f(x) = c\,(1 - x^2)$ for $-1\le x\le1$ and $f(x) = 0$ otherwise. Find the value of $c$ that makes $f$ a density, the distribution function, and $\Prob(X > \tfrac12)$.
::: solution
The total area must be $1$:

$$
\int_{-1}^1 c(1-x^2)\,dx = c\Bigl[x - \frac{x^3}{3}\Bigr]_{-1}^1 = \frac43c = 1, \qquad\text{so } c = \frac34 .
$$

(We also need $f\ge0$, which holds since $1-x^2\ge0$ on $[-1,1]$.) For $-1\le x\le 1$,

$$
F(x) = \int_{-1}^x\frac34(1-t^2)\,dt = \frac34\Bigl(x - \frac{x^3}{3} + \frac23\Bigr) = \frac12 + \frac34x - \frac14x^3,
$$

with $F(x) = 0$ for $x<-1$ and $F(x) = 1$ for $x > 1$. Then $\Prob(X > \tfrac12) = 1 - F(\tfrac12) = 1 - \bigl(\tfrac12 + \tfrac38 - \tfrac1{32}\bigr) = \tfrac{5}{32}\approx 0.156$.
:::
:::

::: quiz
A continuous random variable $X$ has density $f(x) = 2$ for $0\le x\le\tfrac12$ and $f(x) = 0$ otherwise. Which statement is correct?
- [ ] $f$ is not a valid density, because $f(x) > 1$.
- [ ] $\Prob(X = 0.25) = 2$.
- [x] $\Prob(X\le0.1) = 0.2$.
- [ ] $\Prob(X\le 0.1) = 0.1$.
::: solution
$f\ge0$ and the area under it is $2\times\tfrac12 = 1$, so it is a valid density. Probabilities are areas: $\Prob(X\le 0.1) = \int_0^{0.1}2\,dx = 0.2$. Individual values have probability $0$; the number $2$ is a probability *per unit length*.
:::
:::

## Expectation and variance {#expectation}

The expectation of a continuous random variable is defined by analogy with the discrete case, with the pmf replaced by the density and the sum by an integral.

::: definition Expectation of a continuous random variable {#def-expectation-cont}
If $X$ has density $f_X$, its **expectation** is

$$
\E X = \int_{-\infty}^\infty x\,f_X(x)\,dx,
$$

provided $\int_{-\infty}^\infty\lvert x\rvert f_X(x)\,dx < \infty$. The variance is $\Var X = \E\bigl[(X - \E X)^2\bigr]$, defined when $\E X^2<\infty$.
:::

The rule for functions carries over: for any reasonable function $g$ (for instance piecewise continuous),

$$
\E\,g(X) = \int_{-\infty}^\infty g(x)\,f_X(x)\,dx,
$$ {#eq-lotus-cont}

whenever the integral converges absolutely. For monotone differentiable $g$ this follows from the change-of-variables theorem later in this chapter by a substitution; the general case is a theorem of measure-theoretic integration, in which expectations are the Lebesgue integrals of [[measure-theory/lebesgue-integral]]. As in the discrete case, [[#eq-lotus-cont]] implies $\E(aX+b) = a\E X+b$, $\Var X = \E X^2 - (\E X)^2$ and $\Var(aX+b) = a^2\Var X$, with the same proofs.

For the density of [[#ex-density-constant]], symmetry about $0$ gives $\E X = 0$ (the integrand $x f(x)$ is odd), and the variance is computed in the exercises.

::: remark Densities without a mean
The **Cauchy** density $f(x) = \dfrac{1}{\pi(1+x^2)}$ is symmetric about $0$, but it has no expectation: $\int_0^\infty\frac{x}{\pi(1+x^2)}\,dx = \lim_{R\to\infty}\frac{1}{2\pi}\ln(1 + R^2) = \infty$. Its tails decay so slowly that large values dominate any average. We will see in [[probability/limit-theorems]] that averages of Cauchy random variables do not settle down at all.
:::

## The uniform distribution {#uniform}

::: definition Uniform distribution {#def-uniform}
$X$ is **uniform** on $[a,b]$, written $X\sim\operatorname{U}(a,b)$, if it has density $f(x) = \dfrac{1}{b-a}$ for $a\le x\le b$ and $0$ otherwise.
:::

The probability of a subinterval is proportional to its length, which is the model of [[probability/probability-spaces]] for a "point chosen at random". The mean is the midpoint and the variance depends only on the length:

$$
\E X = \int_a^b\frac{x}{b-a}\,dx = \frac{a+b}{2}, \qquad \E X^2 = \frac{a^2 + ab + b^2}{3},\qquad \Var X = \frac{(b-a)^2}{12}.
$$

(The variance is $\E X^2 - (\E X)^2 = \frac{4(a^2+ab+b^2) - 3(a+b)^2}{12} = \frac{(b-a)^2}{12}$.) For instance, if buses arrive exactly every $10$ minutes and you turn up at a uniformly random time, your wait is $\operatorname{U}(0,10)$: on average $5$ minutes with standard deviation $10/\sqrt{12}\approx2.9$ minutes, and longer than $7$ minutes with probability $0.3$.

## The exponential distribution {#exponential}

::: definition Exponential distribution {#def-exponential}
$X$ has the **exponential distribution** with rate $\lambda>0$, written $X\sim\operatorname{Exp}(\lambda)$, if its density is $f(x) = \lambda e^{-\lambda x}$ for $x\ge0$ and $f(x) = 0$ for $x < 0$.
:::

Integrating, $F(x) = 1 - e^{-\lambda x}$ for $x\ge0$, and the **survival function** is

$$
\Prob(X > x) = e^{-\lambda x}\qquad(x\ge0).
$$ {#eq-exp-tail}

Integration by parts gives $\E X = \int_0^\infty x\lambda e^{-\lambda x}\,dx = \dfrac1\lambda$ and $\E X^2 = \dfrac{2}{\lambda^2}$, so $\Var X = \dfrac{1}{\lambda^2}$. The exponential distribution models lifetimes of things that do not age (radioactive atoms, electronic components in their working life) and waiting times between events that occur "at random" at rate $\lambda$ per unit time, such as calls to a help line. In the latter role it is linked to the Poisson distribution: if events occur so that the number in any interval of length $t$ is $\operatorname{Poisson}(\lambda t)$ (a **Poisson process**), then the wait $T$ until the first event satisfies $\Prob(T>t) = \Prob(\text{no events in }[0,t]) = e^{-\lambda t}$, so $T\sim\operatorname{Exp}(\lambda)$.

::: widget distribution
dist: exponential
params: lambda=1
cdf: true
caption: The $\operatorname{Exp}(\lambda)$ distribution function; switch to PDF to see the density. Change the rate $\lambda$: the density always starts at height $\lambda$ and the mean $1/\lambda$ (marked with $\pm$ one standard deviation, also $1/\lambda$) moves inversely. The cdf rises to $1 - e^{-1}\approx 0.63$ at the mean, so about $63\%$ of lifetimes are shorter than average.
:::

::: example Radiocarbon {#ex-carbon}
Carbon-14 has a **half-life** of about $5730$ years: half of a large sample of atoms decays in that time. Model the lifetime of one atom as $\operatorname{Exp}(\lambda)$. Find $\lambda$, the mean lifetime, and the probability that an atom survives $10\,000$ years.
::: solution
The half-life $h$ is the median of the lifetime: $\Prob(T > h) = e^{-\lambda h} = \tfrac12$, so $\lambda = \ln 2/h = \ln2/5730\approx1.21\times10^{-4}$ per year. The mean lifetime is $1/\lambda = 5730/\ln2\approx 8267$ years, longer than the half-life because the distribution has a long right tail. Finally

$$
\Prob(T > 10\,000) = e^{-10\,000\lambda} = 2^{-10\,000/5730}\approx0.298 .
$$

Radiocarbon dating runs this calculation backwards: the measured fraction of carbon-14 remaining in a sample determines its age.
:::
:::

Like the geometric distribution, the exponential distribution is **memoryless**: by [[#eq-exp-tail]], for $s,t\ge0$,

$$
\Prob(X > s+t\mid X>s) = \frac{e^{-\lambda(s+t)}}{e^{-\lambda s}} = e^{-\lambda t} = \Prob(X>t).
$$

An atom that has survived for a thousand years is as good as new. Remarkably, this property characterises the exponential distribution.

::: example Waiting at a help desk {#ex-help-desk}
Calls reach a help desk as a Poisson process at an average rate of $4$ per hour. Find the expected waiting time for the first call, the probability of waiting more than half an hour, and the probability of waiting more than another half hour given that no call has arrived in the first $20$ minutes.
::: solution
The waiting time is $T\sim\operatorname{Exp}(4)$, measured in hours, so $\E T = \tfrac14$ hour $= 15$ minutes, and

$$
\Prob(T>\tfrac12) = e^{-4\cdot\frac12} = e^{-2}\approx0.135 .
$$

By memorylessness, $\Prob\bigl(T > \tfrac13 + \tfrac12\mid T>\tfrac13\bigr) = \Prob(T > \tfrac12) = e^{-2}$ as well: twenty quiet minutes do not make a call any more imminent. Also $\Prob(T\le\tfrac{1}{12}) = 1 - e^{-1/3}\approx0.283$, so even though the mean wait is $15$ minutes, more than a quarter of waits are under $5$ minutes. Short waits are the most likely; long ones are rarer but not negligible.
:::
:::

::: theorem The exponential is the only memoryless distribution {#thm-exp-memoryless}
Let $T$ be a random variable with $\Prob(T>t)>0$ for every $t\ge0$ and $\Prob(T > 0) = 1$, and suppose that $\Prob(T > s+t\mid T > s) = \Prob(T>t)$ for all $s,t\ge0$. Then $T\sim\operatorname{Exp}(\lambda)$ for some $\lambda>0$.
:::

::: proof
Let $G(t) = \Prob(T>t) = 1 - F_T(t)$. The hypothesis says $G(s+t) = G(s)G(t)$ for all $s, t\ge0$, and $G(0) = 1$. By [[#thm-cdf]], $G$ is non-increasing, right-continuous and $G(t)\to0$ as $t\to\infty$.

Let $c = G(1) > 0$. If $c$ were $1$, then $G(n) = G(1)^n = 1$ for every integer $n$, contradicting $G(n)\to0$; so $0 < c < 1$, and $c = e^{-\lambda}$ with $\lambda = -\ln c > 0$. For positive integers $m, n$, applying the functional equation repeatedly gives $G(1) = G(1/n)^n$, so $G(1/n) = c^{1/n}$ (the unique positive $n$-th root), and then $G(m/n) = G(1/n)^m = c^{m/n}$. Thus $G(t) = e^{-\lambda t}$ for every positive rational $t$. For any real $t\ge0$ choose rationals $r_k$ decreasing to $t$; right-continuity gives $G(t) = \lim_k e^{-\lambda r_k} = e^{-\lambda t}$. So $F_T(t) = 1 - e^{-\lambda t}$ for $t\ge0$ and $F_T(t) = 0$ for $t<0$, which is the $\operatorname{Exp}(\lambda)$ distribution function.
:::

## The normal distribution {#normal}

The most important distribution in probability and statistics is the normal, or Gaussian, distribution. Its importance comes from the central limit theorem ([[probability/limit-theorems]]): sums of many small independent effects are approximately normal, whatever the distribution of the individual effects. Measurement errors, heights, test scores and many other quantities are well modelled by it.

::: definition Normal distribution {#def-normal}
$X$ has the **normal distribution** with mean $\mu\in\R$ and variance $\sigma^2>0$, written $X\sim\Normal(\mu,\sigma^2)$, if its density is

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\Bigl(-\frac{(x-\mu)^2}{2\sigma^2}\Bigr), \qquad x\in\R.
$$ {#eq-normal-density}

The case $\mu = 0$, $\sigma = 1$ is the **standard normal** distribution, with density $\varphi(z) = e^{-z^2/2}/\sqrt{2\pi}$ and distribution function $\Phi(z) = \int_{-\infty}^z\varphi(t)\,dt$.
:::

The density is a bell-shaped curve, symmetric about $\mu$, with points of inflection at $\mu\pm\sigma$. That the constant $1/(\sigma\sqrt{2\pi})$ is correct rests on a famous integral.

::: theorem The Gaussian integral {#thm-gaussian-integral}
$$
\int_{-\infty}^\infty e^{-x^2/2}\,dx = \sqrt{2\pi}.
$$
:::

::: proof
Let $I$ be the integral; it converges, since $e^{-x^2/2}\le e^{1/2 - \lvert x\rvert}$ (because $x^2/2 \ge \lvert x\rvert - 1/2$). Then $I^2$ is the product of two copies of the integral, which we write as a double integral over the plane and evaluate in polar coordinates $x = r\cos\theta$, $y = r\sin\theta$, $dx\,dy = r\,dr\,d\theta$ ([[multivariable/change-of-variables]]):

$$
I^2 = \int_{-\infty}^\infty\int_{-\infty}^\infty e^{-(x^2+y^2)/2}\,dx\,dy = \int_0^{2\pi}\int_0^\infty e^{-r^2/2}\,r\,dr\,d\theta = 2\pi\Bigl[-e^{-r^2/2}\Bigr]_0^\infty = 2\pi.
$$

(For a non-negative integrand, writing the improper double integral as an iterated integral in either coordinate system is justified by Tonelli's theorem.) Since $I>0$, $I = \sqrt{2\pi}$.
:::

Substituting $z = (x-\mu)/\sigma$ shows that [[#eq-normal-density]] integrates to $1$ for every $\mu$ and $\sigma$. The names of the parameters are justified as follows. If $Z\sim\Normal(0,1)$ then $\E Z = 0$, because $z\varphi(z)$ is odd and integrable, and integrating by parts with $u = z$ and $dv = z\varphi(z)\,dz$ (so $v = -\varphi(z)$),

$$
\E Z^2 = \int_{-\infty}^\infty z\cdot z\varphi(z)\,dz = \Bigl[-z\varphi(z)\Bigr]_{-\infty}^\infty + \int_{-\infty}^\infty\varphi(z)\,dz = 0 + 1 = 1 .
$$

So $\Var Z = 1$. Every normal random variable is a rescaled standard normal: if $Z\sim\Normal(0,1)$ then $X = \mu + \sigma Z\sim\Normal(\mu,\sigma^2)$, and conversely if $X\sim\Normal(\mu,\sigma^2)$ then

$$
Z = \frac{X-\mu}{\sigma}\sim\Normal(0,1)
$$ {#eq-standardise}

(both facts follow from the change-of-variables theorem below). Hence $\E X = \mu + \sigma\E Z = \mu$ and $\Var X = \sigma^2\Var Z = \sigma^2$, and every normal probability reduces to a value of $\Phi$:

$$
\Prob(X\le x) = \Prob\Bigl(Z\le\frac{x-\mu}{\sigma}\Bigr) = \Phi\Bigl(\frac{x-\mu}{\sigma}\Bigr).
$$

The function $\Phi$ has no formula in terms of elementary functions; it is tabulated and built into every statistical package. By symmetry $\Phi(-z) = 1 - \Phi(z)$, so tables list only $z\ge0$. Some values worth knowing:

| $z$ | $0$ | $0.5$ | $1$ | $1.2816$ | $1.5$ | $1.645$ | $1.96$ | $2$ | $2.326$ | $2.576$ | $3$ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| $\Phi(z)$ | $0.5$ | $0.6915$ | $0.8413$ | $0.9000$ | $0.9332$ | $0.9500$ | $0.9750$ | $0.9772$ | $0.9900$ | $0.9950$ | $0.9987$ |

In particular a normal random variable lies within one, two and three standard deviations of its mean with probabilities

$$
\Prob(\lvert X-\mu\rvert<\sigma)\approx0.683,\qquad\Prob(\lvert X-\mu\rvert<2\sigma)\approx0.954,\qquad\Prob(\lvert X-\mu\rvert<3\sigma)\approx0.997,
$$

the **68–95–99.7 rule**.

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -1
b: 1
caption: The standard normal density with $\Prob(-1\le Z\le1)\approx0.683$ shaded. Drag the ends of the shaded interval to $\pm1.96$ to capture $95\%$, the multiplier used in confidence intervals in [[statistics/confidence-intervals]]. Changing $\mu$ slides the curve without changing its shape; changing $\sigma$ stretches it horizontally and squashes it vertically, keeping the area equal to $1$.
:::

::: example Heights {#ex-heights}
Suppose the heights of adult women in a population are modelled as $\Normal(165, 7^2)$, in centimetres. Find the proportion taller than $175$ cm, the proportion between $160$ and $175$ cm, and the height exceeded by only $5\%$ of women.
::: solution
Standardise with [[#eq-standardise]]: $175$ cm corresponds to $z = (175-165)/7 = 10/7\approx1.43$, so

$$
\Prob(X>175) = 1 - \Phi(10/7)\approx 1 - 0.9234 = 0.0766,
$$

about $7.7\%$. Similarly $160$ cm corresponds to $z = -5/7\approx-0.71$, and $\Prob(160<X<175) = \Phi(10/7) - \Phi(-5/7)\approx0.9234 - 0.2375 = 0.686$. For the last part we need the $95$th percentile: $\Phi(z) = 0.95$ at $z\approx1.645$, so the height is $165 + 1.645\times7\approx176.5$ cm.
:::
:::

::: quiz
If $X\sim\Normal(50, 10^2)$, which expression equals $\Prob(X\le 70)$?
- [ ] $\Phi(70)$
- [ ] $\Phi(20)$
- [x] $\Phi(2)$
- [ ] $\Phi(0.2)$
::: solution
Standardising, $\Prob(X\le70) = \Prob\bigl(Z\le\frac{70-50}{10}\bigr) = \Phi(2)\approx0.977$. The value $70$ lies two standard deviations above the mean. Note that the second parameter in $\Normal(50, 10^2)$ is the *variance*; the standard deviation is $10$.
:::
:::

## Functions of a random variable {#transformations}

If $X$ has a known distribution, what is the distribution of $Y = g(X)$? The most reliable method is to compute the distribution function of $Y$ first, by expressing $\{Y\le y\}$ as an event about $X$, and then differentiate.

::: example The square of a standard normal {#ex-chi-square}
Let $Z\sim\Normal(0,1)$ and $Y = Z^2$. Find the density of $Y$.
::: solution
For $y\le0$, $F_Y(y) = 0$. For $y>0$,

$$
F_Y(y) = \Prob(Z^2\le y) = \Prob(-\sqrt y\le Z\le\sqrt y) = \Phi(\sqrt y) - \Phi(-\sqrt y) = 2\Phi(\sqrt y) - 1.
$$

Differentiating with the chain rule ($\Phi' = \varphi$ is continuous),

$$
f_Y(y) = 2\varphi(\sqrt y)\cdot\frac{1}{2\sqrt y} = \frac{1}{\sqrt{2\pi y}}e^{-y/2}\qquad(y>0).
$$

This is the **chi-square distribution with one degree of freedom**, which plays a central role in [[statistics/sampling]]. Note that $f_Y(y)\to\infty$ as $y\to0^+$: a density may be unbounded, provided its integral is $1$.
:::
:::

::: example Breaking a stick once {#ex-stick-once}
A stick of length $1$ is broken at a uniformly random point $U$. Let $L = \max(U, 1-U)$ be the length of the longer piece. Find the distribution of $L$, its mean, and the expected ratio of the shorter piece to the longer one.
::: solution
$L$ takes values in $[\tfrac12, 1]$. For $\tfrac12\le x\le1$, the longer piece has length at most $x$ exactly when both pieces do, that is when $U\le x$ and $1 - U\le x$:

$$
F_L(x) = \Prob(1 - x\le U\le x) = x - (1-x) = 2x - 1 .
$$

So $f_L(x) = 2$ on $[\tfrac12,1]$: $L\sim\operatorname{U}(\tfrac12,1)$, and $\E L = \tfrac34$. The shorter piece is $S = 1 - L$, with $\E S = \tfrac14$. By [[#eq-lotus-cont]],

$$
\E\Bigl(\frac SL\Bigr) = \int_{1/2}^1\frac{1-x}{x}\cdot2\,dx = 2\Bigl[\ln x - x\Bigr]_{1/2}^1 = 2\ln2 - 1\approx0.386,
$$

which is *not* $\E S/\E L = \tfrac13$. The expectation of a ratio is not the ratio of expectations.
:::
:::

When $g$ is strictly monotone the calculation can be done once and for all.

::: theorem Change of variables for densities {#thm-change-variables}
Let $X$ have density $f_X$ and suppose $\Prob(X\in I) = 1$ for an open interval $I$. Let $g\colon I\to\R$ be strictly monotone and continuously differentiable with $g'(x)\neq0$ on $I$, and let $h = g^{-1}$ be its inverse, defined on the interval $g(I)$. Then $Y = g(X)$ has density

$$
f_Y(y) = f_X\bigl(h(y)\bigr)\,\lvert h'(y)\rvert\quad(y\in g(I)),\qquad f_Y(y) = 0 \text{ otherwise}.
$$ {#eq-change-variables}
:::

::: proof
Suppose first that $g$ is increasing, and let $\alpha$ be the left endpoint of $g(I)$ (possibly $-\infty$). For $y\in g(I)$, the event $\{g(X)\le y\}$ equals $\{X\le h(y)\}$ (up to the event $X\notin I$, of probability $0$), so substituting $x = h(u)$, $dx = h'(u)\,du$,

$$
F_Y(y) = \int_{-\infty}^{h(y)}f_X(x)\,dx = \int_\alpha^y f_X\bigl(h(u)\bigr)h'(u)\,du .
$$

Here $h' > 0$, so the integrand is $f_X(h(u))\lvert h'(u)\rvert$, and since $F_Y$ is an integral of this function (with $F_Y = 0$ to the left of $g(I)$ and $F_Y = 1$ to its right) it is a density of $Y$. If $g$ is decreasing, $\{g(X)\le y\} = \{X\ge h(y)\}$ and the same substitution gives $F_Y(y) = \int_\alpha^y f_X(h(u))\,(-h'(u))\,du$, where now $-h' = \lvert h'\rvert > 0$.
:::

The factor $\lvert h'(y)\rvert$ accounts for stretching: where $g$ spreads an interval of $x$-values over a longer interval of $y$-values, the probability per unit length goes down. For a linear map $Y = a + bX$ with $b\ne0$, $h(y) = (y-a)/b$ and

$$
f_Y(y) = \frac{1}{\lvert b\rvert}f_X\Bigl(\frac{y-a}{b}\Bigr).
$$

With $X = Z$ standard normal, $a = \mu$ and $b = \sigma$, this is exactly the $\Normal(\mu,\sigma^2)$ density, proving the claims made about [[#eq-standardise]].

Applying the theorem to $Y = e^X$ with $X\sim\Normal(\mu,\sigma^2)$ (so $h(y) = \ln y$, $h'(y) = 1/y$) gives the **lognormal** density $f_Y(y) = \dfrac{1}{y\sigma\sqrt{2\pi}}\exp\bigl(-(\ln y-\mu)^2/(2\sigma^2)\bigr)$ for $y>0$. Lognormal models fit quantities that arise from many small *multiplicative* effects, such as incomes, particle sizes and share prices.

::: widget distribution
dist: lognormal
params: mu=0, sigma=0.5
caption: The lognormal density of $Y = e^X$ with $X\sim\Normal(\mu,\sigma^2)$. The exponential map stretches the right half of the normal curve and compresses the left half, producing a long right tail. Increase $\sigma$ and watch the skewness grow: the mean $e^{\mu+\sigma^2/2}$ (see the exercises) moves further right of the median $e^{\mu}$.
:::

Finally, a theorem that is the basis of almost all simulation: every continuous distribution can be manufactured from a uniform random number.

::: theorem Inverse transform sampling {#thm-inverse-transform}
Let $F$ be a distribution function that is continuous, and strictly increasing on the interval $J = \{x : 0 < F(x) < 1\}$, and let $F^{-1}\colon(0,1)\to J$ be its inverse there.

1. If $U\sim\operatorname{U}(0,1)$, then $X = F^{-1}(U)$ has distribution function $F$.
2. Conversely, if $X$ has distribution function $F$, then $F(X)\sim\operatorname{U}(0,1)$.
:::

::: proof
(1) $X$ takes values in $J$. For $x\in J$, since $F$ is strictly increasing on $J$, $F^{-1}(U)\le x$ if and only if $U\le F(x)$; hence $\Prob(X\le x) = \Prob(U\le F(x)) = F(x)$, because $\Prob(U\le u) = u$ for $u\in[0,1]$. For $x$ to the left of $J$, $F(x) = 0 = \Prob(X\le x)$, and to the right of $J$, $F(x) = 1 = \Prob(X\le x)$.

(2) For $u\in(0,1)$, $F(X)\le u$ if and only if $X\le F^{-1}(u)$, up to the event $X\notin J$, which has probability zero because $F$ is continuous. Therefore $\Prob(F(X)\le u) = F\bigl(F^{-1}(u)\bigr) = u$, which is the uniform distribution function.
:::

For example, the exponential distribution function $F(x) = 1 - e^{-\lambda x}$ has inverse $F^{-1}(u) = -\ln(1-u)/\lambda$, so $-\ln(1-U)/\lambda\sim\operatorname{Exp}(\lambda)$; since $1 - U$ is also uniform, $-\ln U/\lambda$ works too. Part (2), the **probability integral transform**, is used in [[statistics/hypothesis-testing#thm-p-uniform]] to show that p-values are uniformly distributed when the null hypothesis holds.

::: quiz
$U\sim\operatorname{U}(0,1)$. What is the distribution of $Y = 3U + 2$?
- [ ] $\operatorname{U}(0, 3)$
- [x] $\operatorname{U}(2, 5)$
- [ ] $\operatorname{U}(2, 3)$
- [ ] Not uniform: the density becomes $3$ times larger
::: solution
By [[#thm-change-variables]] with $h(y) = (y-2)/3$, $f_Y(y) = \tfrac13 f_U\bigl(\tfrac{y-2}{3}\bigr)$, which is $\tfrac13$ for $2\le y\le5$ and $0$ otherwise: the $\operatorname{U}(2,5)$ density. Stretching by $3$ makes the density $3$ times *smaller*, so that the area stays $1$.
:::
:::

::: history
The normal curve first appeared in 1733, when Abraham de Moivre found it as an approximation to binomial probabilities for large numbers of trials; he included the result in the second edition of *The Doctrine of Chances* (1738). Carl Friedrich Gauss derived the normal law as the distribution of errors of observation in his *Theoria motus corporum coelestium* (1809), in connection with the method of least squares, and Pierre-Simon Laplace's central limit theorem of 1810 explained why it should arise so often. In the 1830s and 1840s Adolphe Quetelet applied the curve to human measurements such as chest sizes of soldiers. The name "normal" came into general use late in the nineteenth century through Francis Galton and Karl Pearson; Pearson later remarked that it avoided taking sides in the question of priority between Gauss and Laplace, but had the drawback of suggesting that other distributions are abnormal. The exponential law of radioactive decay was established by Ernest Rutherford and Frederick Soddy in 1902–1903.
:::

## Where this leads {#where-next}

Several continuous random variables together are described by a joint density, the subject of [[probability/joint-distributions]], where we also find the distribution of sums such as $X+Y$. Moment generating functions in [[probability/expectation]] give an elegant way to identify distributions such as that of a sum of normals. The normal distribution returns as the universal limit in the central limit theorem ([[probability/limit-theorems]]), and the chi-square distribution of [[#ex-chi-square]] together with its relatives, the $t$ and $F$ distributions, are the backbone of [[statistics/sampling]].

::: summary
- Every random variable has a distribution function $F_X(x) = \Prob(X\le x)$: non-decreasing, right-continuous, from $0$ to $1$, with jumps exactly at values of positive probability.
- A continuous random variable has a density $f_X\ge0$ with $\Prob(a<X\le b) = \int_a^bf_X$; single points have probability $0$, and $f_X(x)$ is probability per unit length, not a probability.
- $\E X = \int xf_X(x)\,dx$, $\E g(X) = \int g(x)f_X(x)\,dx$, and the variance rules are as in the discrete case.
- $\operatorname{U}(a,b)$: mean $\tfrac{a+b}2$, variance $\tfrac{(b-a)^2}{12}$. $\operatorname{Exp}(\lambda)$: $\Prob(X>x) = e^{-\lambda x}$, mean $1/\lambda$, variance $1/\lambda^2$, and it is the only memoryless continuous distribution.
- $\Normal(\mu,\sigma^2)$: standardise with $Z = (X-\mu)/\sigma$ and use $\Phi$; about $68\%$, $95\%$ and $99.7\%$ of the probability lies within $1$, $2$ and $3$ standard deviations.
- To find the distribution of $g(X)$, compute $\Prob(g(X)\le y)$ and differentiate; for monotone $g$, $f_Y(y) = f_X(h(y))\lvert h'(y)\rvert$ with $h = g^{-1}$.
- $F^{-1}(U)$ has distribution function $F$ when $U$ is uniform, and $F(X)$ is uniform: the basis of simulation and of p-values.
:::

## Exercises

::: exercise A triangular density {level=1 check="1/4"}
$X$ has density $f(x) = 2x$ for $0\le x\le1$ (and $0$ otherwise). Find $\Prob(X\le\tfrac12)$ and $\E X$; enter the probability.
::: solution
$\Prob(X\le\tfrac12) = \int_0^{1/2}2x\,dx = \tfrac14$, and $\E X = \int_0^1 2x^2\,dx = \tfrac23$.
:::
:::

::: exercise A component's lifetime {level=1 check="exp(-1.5)"}
The lifetime of a component is exponential with mean $2$ years. Find the probability that it lasts more than $3$ years.
::: solution
The rate is $\lambda = 1/2$ per year, so $\Prob(T>3) = e^{-3/2}\approx0.223$.
:::
:::

::: exercise A uniform variance {level=1 check="25/3"}
Find the variance of a $\operatorname{U}(0,10)$ random variable.
::: solution
$\Var X = (10-0)^2/12 = 100/12 = 25/3\approx8.33$.
:::
:::

::: exercise The variance of the parabolic density {level=2 check="1/5"}
Find $\Var X$ for the density $f(x) = \tfrac34(1-x^2)$ on $[-1,1]$ of [[#ex-density-constant]].
::: solution
$\E X = 0$ by symmetry, so $\Var X = \E X^2 = \dfrac34\displaystyle\int_{-1}^1(x^2 - x^4)\,dx = \dfrac34\Bigl(\dfrac23 - \dfrac25\Bigr) = \dfrac34\cdot\dfrac{4}{15} = \dfrac15$.
:::
:::

::: exercise IQ scores {level=2}
IQ scores are designed to follow approximately $\Normal(100, 15^2)$. Find the proportion of people with IQ above $130$, and the score that marks the top $10\%$.
::: solution
$\Prob(X>130) = 1 - \Phi\bigl(\tfrac{130-100}{15}\bigr) = 1 - \Phi(2)\approx0.0228$, about $2.3\%$. The top $10\%$ starts at the $90$th percentile: $\Phi(z) = 0.9$ at $z\approx1.2816$, so the score is $100 + 1.2816\times15\approx119.2$.
:::
:::

::: exercise The median of an exponential {level=2 check="2*ln(2)"}
Find the median $m$ of the $\operatorname{Exp}(\lambda)$ distribution (the value with $\Prob(X\le m) = \tfrac12$), and evaluate it for $\lambda = 0.5$. Is the median smaller or larger than the mean?
::: solution
$1 - e^{-\lambda m} = \tfrac12$ gives $m = \ln2/\lambda$. For $\lambda = 0.5$, $m = 2\ln2\approx1.386$. Since $\ln2\approx0.693 < 1$, the median is smaller than the mean $1/\lambda$: the long right tail pulls the mean up.
:::
:::

::: exercise From uniform to exponential {level=2}
Let $U\sim\operatorname{U}(0,1)$ and $Y = -\ln U$. Use [[#thm-change-variables]] to show that $Y\sim\operatorname{Exp}(1)$.
::: solution
On $I = (0,1)$, $g(u) = -\ln u$ is strictly decreasing and differentiable, with $g(I) = (0,\infty)$ and inverse $h(y) = e^{-y}$, $h'(y) = -e^{-y}$. Hence for $y>0$, $f_Y(y) = f_U(e^{-y})\,\lvert -e^{-y}\rvert = 1\cdot e^{-y}$, and $f_Y(y) = 0$ for $y\le0$. This is the $\operatorname{Exp}(1)$ density. (This is [[#thm-inverse-transform]] in action.)
:::
:::

::: exercise Mean absolute value of a normal {level=3 check="sqrt(2/pi)"}
Let $Z\sim\Normal(0,1)$. Find $\E\lvert Z\rvert$.
::: solution
By symmetry and the substitution $u = z^2/2$,

$$
\E\lvert Z\rvert = 2\int_0^\infty z\frac{e^{-z^2/2}}{\sqrt{2\pi}}\,dz = \frac{2}{\sqrt{2\pi}}\int_0^\infty e^{-u}\,du = \sqrt{\frac2\pi}\approx0.798 .
$$

So the mean distance from the mean is about $0.8$ standard deviations.
:::
:::

::: exercise The mean of a lognormal {level=3}
Let $X\sim\Normal(\mu,\sigma^2)$. Prove that $\E\,e^X = e^{\mu+\sigma^2/2}$. (So the lognormal mean exceeds its median $e^\mu$.)
::: hint
Write $X = \mu + \sigma Z$ and complete the square in the exponent.
:::
::: solution
With $X = \mu+\sigma Z$, $\E e^X = e^\mu\,\E e^{\sigma Z}$, and

$$
\E e^{\sigma Z} = \int_{-\infty}^\infty e^{\sigma z}\frac{e^{-z^2/2}}{\sqrt{2\pi}}\,dz = e^{\sigma^2/2}\int_{-\infty}^\infty\frac{e^{-(z-\sigma)^2/2}}{\sqrt{2\pi}}\,dz = e^{\sigma^2/2},
$$

because $\sigma z - z^2/2 = \sigma^2/2 - (z-\sigma)^2/2$, and the last integrand is the $\Normal(\sigma, 1)$ density, with integral $1$. Hence $\E e^X = e^{\mu+\sigma^2/2}$. The median of $e^X$ is $e^\mu$, because $e^x$ is increasing and the median of $X$ is $\mu$; the mean is larger by the factor $e^{\sigma^2/2}>1$.
:::
:::

::: exercise Rounding up an exponential {level=3}
Let $X\sim\operatorname{Exp}(\lambda)$ and let $N = \lceil X\rceil$ be $X$ rounded up to the next integer. Prove that $N\sim\operatorname{Geom}(p)$ with $p = 1 - e^{-\lambda}$. (The geometric distribution is the "discrete shadow" of the exponential.)
::: solution
$N$ takes values in $\{1, 2, \ldots\}$ (with probability $1$, since $\Prob(X = 0) = 0$ and $X<\infty$), and for an integer $k\ge 0$, $N > k$ exactly when $X > k$. Hence

$$
\Prob(N>k) = \Prob(X>k) = e^{-\lambda k} = (e^{-\lambda})^k = (1-p)^k .
$$

This is the tail of the $\operatorname{Geom}(p)$ distribution ([[probability/discrete-random-variables]]), and tails determine the pmf via $\Prob(N = k) = \Prob(N>k-1) - \Prob(N>k) = (1-p)^{k-1}p$.
:::
:::
