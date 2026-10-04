A dart is thrown at a circular board and lands at a uniformly random point. Its horizontal and vertical coordinates are two random variables. Are they independent? On average, does a dart far to the right tend to be higher or lower? It seems natural to answer "independent" and "neither", but only the second answer is right. Learning that the dart is near the right-hand edge tells you that it cannot be far above or below the centre, so the coordinates are dependent, even though there is no tendency for one to increase with the other.

Most interesting questions involve several random quantities at once: the height and weight of a person, the returns on two shares, the lifetimes of the components in a machine, the total of two dice. To answer them we need the **joint distribution** of the random variables, which describes not only each variable separately but also how they relate. This chapter introduces joint mass functions and densities, the marginal and conditional distributions derived from them, independence of random variables, **covariance** and **correlation** as measures of linear association, the distribution of a sum of independent random variables, and the bivariate normal distribution.

## Joint distributions of discrete random variables {#discrete-joint}

::: definition Joint probability mass function {#def-joint-pmf}
The **joint probability mass function** of discrete random variables $X$ and $Y$, defined on the same probability space, is

$$
p_{X,Y}(x,y) = \Prob(X = x,\ Y = y),
$$

where the comma means "and": $\Prob(X = x, Y = y) = \Prob(\{X = x\}\cap\{Y = y\})$.
:::

As for a single random variable, the joint pmf is non-negative, sums to $1$ over all pairs, and determines the probability of every event involving the pair: $\Prob\bigl((X,Y)\in A\bigr) = \sum_{(x,y)\in A}p_{X,Y}(x,y)$.

The distributions of $X$ and $Y$ individually are called **marginal distributions**, because when the joint pmf is written as a table they appear as row and column totals in the margins. The events $\{Y = y\}$ form a partition (up to an event of probability zero), so by the law of total probability

$$
p_X(x) = \sum_y p_{X,Y}(x,y),\qquad p_Y(y) = \sum_x p_{X,Y}(x,y).
$$ {#eq-marginal-pmf}

Conditioning works as for events: the **conditional pmf** of $X$ given $Y = y$ (where $p_Y(y) > 0$) is

$$
p_{X\mid Y}(x\mid y) = \Prob(X = x\mid Y = y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}.
$$

::: example Drawing without replacement {#ex-urn}
An urn contains $3$ red and $2$ blue balls. Two balls are drawn without replacement. Let $X = 1$ if the first ball is red and $X = 0$ otherwise, and define $Y$ in the same way for the second ball. Find the joint pmf, the marginal pmfs, and the conditional pmf of $Y$ given $X = 1$.
::: solution
By the multiplication rule, $\Prob(X = 1, Y = 1) = \tfrac35\cdot\tfrac24 = \tfrac{3}{10}$, $\Prob(X=1,Y=0) = \tfrac35\cdot\tfrac24 = \tfrac{3}{10}$, $\Prob(X=0,Y=1) = \tfrac25\cdot\tfrac34 = \tfrac{3}{10}$ and $\Prob(X=0,Y=0) = \tfrac25\cdot\tfrac14 = \tfrac{1}{10}$. With the margins added:

| | $Y = 0$ | $Y = 1$ | $p_X$ |
|---|---|---|---|
| $X = 0$ | $1/10$ | $3/10$ | $2/5$ |
| $X = 1$ | $3/10$ | $3/10$ | $3/5$ |
| $p_Y$ | $2/5$ | $3/5$ | $1$ |

So $X$ and $Y$ have the same marginal distribution, $\operatorname{Bernoulli}(\tfrac35)$: before you look at the first ball, the second is just as likely to be red as the first. But they are not independent: $\Prob(Y = 1\mid X = 1) = \dfrac{3/10}{3/5} = \dfrac12$, while $\Prob(Y=1\mid X = 0) = \dfrac{3/10}{2/5} = \dfrac34$. A red first ball makes a red second ball less likely.
:::
:::

## Jointly continuous random variables {#continuous-joint}

::: definition Joint density {#def-joint-density}
Random variables $X$ and $Y$ are **jointly continuous** with **joint density** $f_{X,Y}\colon\R^2\to[0,\infty)$ if

$$
\Prob\bigl((X,Y)\in A\bigr) = \iint_A f_{X,Y}(x,y)\,dx\,dy
$$

for every reasonable region $A\subseteq\R^2$ (rectangles, discs, half-planes and, in general, the Borel sets).
:::

The joint density is probability per unit *area*: for a small rectangle, $\Prob(x<X\le x+h,\ y<Y\le y+k)\approx f_{X,Y}(x,y)\,hk$. Its graph is a surface over the plane enclosing volume $1$, and probabilities are volumes under it, computed as double integrals ([[multivariable/multiple-integrals]]).

::: proposition Marginal densities {#prop-marginal-density}
If $(X,Y)$ has joint density $f_{X,Y}$, then $X$ and $Y$ are continuous with densities

$$
f_X(x) = \int_{-\infty}^\infty f_{X,Y}(x,y)\,dy, \qquad f_Y(y) = \int_{-\infty}^\infty f_{X,Y}(x,y)\,dx .
$$
:::

::: proof
For any $a$, the event $\{X\le a\}$ is $\{(X,Y)\in A\}$ with $A$ the half-plane $\{(x,y): x\le a\}$. Writing the double integral over $A$ as an iterated integral (legitimate for non-negative integrands by Tonelli's theorem),

$$
F_X(a) = \iint_A f_{X,Y}(x,y)\,dx\,dy = \int_{-\infty}^a\Bigl(\int_{-\infty}^\infty f_{X,Y}(x,y)\,dy\Bigr)dx,
$$

so the inner integral is a density of $X$ in the sense of [[probability/continuous-random-variables#def-density]]. The argument for $Y$ is the same.
:::

By analogy with the discrete case, the **conditional density** of $Y$ given $X = x$ is

$$
f_{Y\mid X}(y\mid x) = \frac{f_{X,Y}(x,y)}{f_X(x)}\qquad\text{where } f_X(x) > 0.
$$ {#eq-conditional-density}

Since $\Prob(X = x) = 0$ this cannot be justified by the definition of conditional probability directly; instead, under mild continuity conditions, $\Prob(Y\le y\mid x\le X\le x+h)$ tends as $h\to0$ to $\int_{-\infty}^{y} f_{Y\mid X}(t\mid x)\,dt$, and for each fixed $x$ the function $f_{Y\mid X}(\cdot\mid x)$ is a density in $y$.

::: example A non-uniform density on the square {#ex-xy-density}
Let $f(x,y) = x + y$ for $0\le x,y\le1$ and $0$ elsewhere. Check that $f$ is a joint density, find the marginal density of $X$, and compute $\Prob(X + Y\le1)$.
::: solution
The integral of $f$ over the unit square is $\int_0^1\int_0^1(x+y)\,dy\,dx = \int_0^1\bigl(x + \tfrac12\bigr)dx = 1$, and $f\ge0$, so it is a joint density. The inner integral was the marginal: $f_X(x) = x + \tfrac12$ for $0\le x\le1$, and by symmetry $f_Y(y) = y + \tfrac12$. For the event $X + Y\le1$ we integrate over the triangle below the line $y = 1 - x$:

$$
\Prob(X+Y\le1) = \int_0^1\int_0^{1-x}(x+y)\,dy\,dx = \int_0^1\Bigl(x(1-x) + \frac{(1-x)^2}{2}\Bigr)dx = \int_0^1\Bigl(\frac12 - \frac{x^2}{2}\Bigr)dx = \frac13 .
$$

The triangle has half the area of the square but only a third of the probability, because the density is smaller near the origin.
:::
:::

::: example A uniform point in a disc {#ex-disc}
Let $(X,Y)$ be uniformly distributed on the unit disc $D = \{x^2+y^2\le1\}$, so that $f_{X,Y} = 1/\pi$ on $D$ and $0$ outside. Find the marginal density of $X$ and the conditional distribution of $Y$ given $X = x$.
::: solution
For $-1\le x\le1$ the vertical line at $x$ meets $D$ in the segment $\lvert y\rvert\le\sqrt{1-x^2}$, so

$$
f_X(x) = \int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}}\frac1\pi\,dy = \frac2\pi\sqrt{1-x^2}.
$$

This semicircular density is *not* uniform: values of $X$ near $0$ are more likely, because the disc is taller there. For $\lvert x\rvert<1$,

$$
f_{Y\mid X}(y\mid x) = \frac{1/\pi}{\tfrac2\pi\sqrt{1-x^2}} = \frac{1}{2\sqrt{1-x^2}}\qquad\text{for }\lvert y\rvert\le\sqrt{1-x^2},
$$

so given $X = x$, $Y$ is uniform on $[-\sqrt{1-x^2},\sqrt{1-x^2}]$. The conditional distribution depends on $x$: near the edge, $Y$ is confined to a short interval. This is the dependence described in the introduction.
:::
:::

## Independent random variables {#independence}

::: definition Independent random variables {#def-independent-rv}
Random variables $X$ and $Y$ are **independent** if

$$
\Prob(X\in A,\ Y\in B) = \Prob(X\in A)\,\Prob(Y\in B)
$$

for all (Borel) sets $A, B\subseteq\R$; that is, every event determined by $X$ is independent of every event determined by $Y$. More generally $X_1,\ldots,X_n$ are independent if $\Prob(X_1\in A_1,\ldots,X_n\in A_n) = \prod_i\Prob(X_i\in A_i)$ for all $A_1,\ldots,A_n$, and an infinite sequence is independent if every finite subfamily is.
:::

Checking all sets $A$, $B$ would be impossible in practice; the next theorem reduces independence to a factorisation of the joint pmf or density.

::: theorem Independence criteria {#thm-independence-criteria}
1. Discrete $X$ and $Y$ are independent if and only if $p_{X,Y}(x,y) = p_X(x)\,p_Y(y)$ for all $x$, $y$.
2. Jointly continuous $X$ and $Y$ are independent if and only if $f_X(x)f_Y(y)$ is a joint density of $(X,Y)$, that is, $f_{X,Y}(x,y) = f_X(x)f_Y(y)$ (except possibly on a set of zero area).
:::

::: proof
(1) If $X$ and $Y$ are independent, take $A = \{x\}$ and $B = \{y\}$. Conversely, if the pmf factorises then for any $A$, $B$, summing over the possible values,

$$
\Prob(X\in A, Y\in B) = \sum_{x\in A}\sum_{y\in B}p_X(x)p_Y(y) = \Bigl(\sum_{x\in A}p_X(x)\Bigr)\Bigl(\sum_{y\in B}p_Y(y)\Bigr) = \Prob(X\in A)\Prob(Y\in B).
$$

(2) If $f_X(x)f_Y(y)$ is a joint density, the same computation with double integrals over the rectangle $A\times B$ gives $\Prob(X\in A,Y\in B) = \int_A f_X\int_B f_Y = \Prob(X\in A)\Prob(Y\in B)$. Conversely, if $X$ and $Y$ are independent, then for all $a$, $b$

$$
\Prob(X\le a, Y\le b) = F_X(a)F_Y(b) = \int_{-\infty}^a\int_{-\infty}^bf_X(x)f_Y(y)\,dy\,dx,
$$

so the probability measure of $(X,Y)$ and the one defined by the density $f_Xf_Y$ agree on all quadrants $(-\infty,a]\times(-\infty,b]$. A uniqueness theorem of measure theory ([[measure-theory/sigma-algebras]]) says that two probability measures on $\R^2$ that agree on all quadrants agree on all Borel sets, so $f_Xf_Y$ is a joint density. Two densities of the same distribution can differ only on a set of zero area.
:::

A useful consequence: if a joint density has the form $f(x,y) = g(x)h(y)$ for $(x,y)$ in a *rectangle* $I\times J$ (possibly infinite) and is zero outside it, then $X$ and $Y$ are independent, with densities proportional to $g$ on $I$ and $h$ on $J$. Without the rectangle, the conclusion fails: the uniform density on the disc in [[#ex-disc]] is constant inside the disc, but the disc is not a rectangle, and the coordinates are dependent.

Independence is inherited by functions: if $X$ and $Y$ are independent, then so are $g(X)$ and $h(Y)$ for any functions $g$, $h$, because $\{g(X)\in A\} = \{X\in g^{-1}(A)\}$ is an event determined by $X$. The same holds for functions of disjoint groups of independent random variables, such as $X_1 + X_2$ and $X_3X_4$.

::: example Competing exponential clocks {#ex-competing}
Two components fail independently after times $X\sim\operatorname{Exp}(\lambda)$ and $Y\sim\operatorname{Exp}(\mu)$. Find the distribution of the time $T = \min(X,Y)$ of the first failure, and the probability that the first component fails first.
::: solution
The minimum exceeds $t$ exactly when both lifetimes do, so by independence, for $t\ge0$,

$$
\Prob(T>t) = \Prob(X>t)\Prob(Y>t) = e^{-\lambda t}e^{-\mu t} = e^{-(\lambda+\mu)t}.
$$

Hence $T\sim\operatorname{Exp}(\lambda+\mu)$: failure rates of independent components add. For the second question, integrate the joint density $\lambda e^{-\lambda x}\mu e^{-\mu y}$ over the region $\{x<y\}$:

$$
\Prob(X<Y) = \int_0^\infty\lambda e^{-\lambda x}\Bigl(\int_x^\infty\mu e^{-\mu y}\,dy\Bigr)dx = \int_0^\infty\lambda e^{-(\lambda+\mu)x}\,dx = \frac{\lambda}{\lambda+\mu}.
$$

For example, with mean lifetimes of $1000$ and $2000$ hours ($\lambda = 0.001$, $\mu = 0.0005$), the first failure comes after $1/0.0015\approx667$ hours on average, and it is the first component with probability $\tfrac23$.
:::
:::

::: quiz
$X$ and $Y$ have joint density $f(x,y) = 8xy$ for $0<x<y<1$ and $0$ otherwise. The formula is a product of a function of $x$ and a function of $y$. Are $X$ and $Y$ independent?
- [ ] Yes, because $f$ factorises as $8x\cdot y$.
- [x] No, because the region where $f>0$ is a triangle, not a rectangle.
- [ ] Yes, because $f$ integrates to $1$.
- [ ] It depends on the value of $y$.
::: solution
The density is $8xy\cdot\mathbf{1}_{\{x<y\}}$, and the indicator does not factorise. Concretely, $\Prob(X>\tfrac12, Y<\tfrac12) = 0$, because $X<Y$ always, but both $\Prob(X>\tfrac12)$ and $\Prob(Y<\tfrac12)$ are positive, so their product is not $0$. Factorisation only proves independence when the region is a rectangle.
:::
:::

## Covariance and correlation {#covariance}

To measure how two random variables vary together we need expectations of functions of both. The rule for one variable extends with the same proof (in the discrete case; the continuous case is again a theorem of integration theory):

$$
\E\,g(X,Y) = \sum_{x,y}g(x,y)\,p_{X,Y}(x,y)\qquad\text{or}\qquad\E\,g(X,Y) = \iint g(x,y)\,f_{X,Y}(x,y)\,dx\,dy,
$$ {#eq-lotus-2d}

provided the sum or integral converges absolutely. Taking $g(x,y) = ax+by$ and using the marginal formulas gives **linearity of expectation**, $\E(aX+bY) = a\E X+b\E Y$, for *any* $X$ and $Y$ with expectations, dependent or not. For instance, in the discrete case,

$$
\E(X+Y) = \sum_{x,y}(x+y)p_{X,Y}(x,y) = \sum_xx\sum_yp_{X,Y}(x,y) + \sum_yy\sum_xp_{X,Y}(x,y) = \E X + \E Y .
$$

Linearity and its applications are the main theme of [[probability/expectation]].

::: theorem Expectation of a product of independent random variables {#thm-product}
If $X$ and $Y$ are independent and have expectations, then $XY$ has an expectation and $\E(XY) = \E X\,\E Y$.
:::

::: proof
In the discrete case, by [[#eq-lotus-2d]] and [[#thm-independence-criteria]],

$$
\E(XY) = \sum_{x,y}xy\,p_X(x)p_Y(y) = \Bigl(\sum_xx\,p_X(x)\Bigr)\Bigl(\sum_yy\,p_Y(y)\Bigr) = \E X\,\E Y,
$$

and the same computation with $\lvert x\rvert\lvert y\rvert$ shows that the double sum converges absolutely, which justifies splitting it. In the continuous case replace the sums by integrals and the joint density by $f_X(x)f_Y(y)$.
:::

::: definition Covariance and correlation {#def-covariance}
Let $X$ and $Y$ have finite variances, with means $\mu_X$, $\mu_Y$ and standard deviations $\sigma_X$, $\sigma_Y$. Their **covariance** is

$$
\Cov(X,Y) = \E\bigl[(X-\mu_X)(Y-\mu_Y)\bigr] = \E(XY) - \mu_X\mu_Y,
$$

and, when $\sigma_X,\sigma_Y>0$, their **correlation** is

$$
\Corr(X,Y) = \rho_{X,Y} = \frac{\Cov(X,Y)}{\sigma_X\sigma_Y}.
$$

$X$ and $Y$ are **uncorrelated** if $\Cov(X,Y) = 0$.
:::

(The second formula for the covariance follows by expanding the product and using linearity: $\E(XY - \mu_YX - \mu_XY + \mu_X\mu_Y) = \E(XY) - \mu_X\mu_Y$. The product $XY$ has an expectation because $\lvert xy\rvert\le\tfrac12(x^2+y^2)$.) The covariance is positive when $X$ and $Y$ tend to be above their means together and below them together, and negative when one tends to be high while the other is low.

::: theorem Properties of covariance {#thm-covariance}
For random variables with finite variances and constants $a, b, c$:

1. $\Cov(X,Y) = \Cov(Y,X)$ and $\Cov(X,X) = \Var X$;
2. $\Cov(aX + bY + c, Z) = a\Cov(X,Z) + b\Cov(Y,Z)$;
3. $\Var(X+Y) = \Var X + \Var Y + 2\Cov(X,Y)$, and more generally $\Var\bigl(\sum_iX_i\bigr) = \sum_i\Var X_i + 2\sum_{i<j}\Cov(X_i,X_j)$;
4. if $X$ and $Y$ are independent, then $\Cov(X,Y) = 0$ and $\Var(X+Y) = \Var X + \Var Y$.
:::

::: proof
(1) is immediate from the definition. (2) The mean of $aX+bY+c$ is $a\mu_X + b\mu_Y + c$, so $(aX + bY + c) - \E(aX+bY+c) = a(X-\mu_X) + b(Y-\mu_Y)$; multiply by $Z - \mu_Z$ and take expectations using linearity. (3) By (1) and (2), $\Var(X+Y) = \Cov(X+Y, X+Y) = \Cov(X,X) + \Cov(X,Y) + \Cov(Y,X) + \Cov(Y,Y)$, which is the formula; the general case expands $\Cov\bigl(\sum_iX_i,\sum_jX_j\bigr)$ in the same way. (4) By [[#thm-product]], $\E(XY) = \mu_X\mu_Y$, so $\Cov(X,Y) = 0$; then use (3).
:::

Part (4) is the fact behind the warning in [[probability/discrete-random-variables]]: two independent bets of the same size have variance $2\Var X$, while doubling one bet gives $4\Var X$. For the urn of [[#ex-urn]], $\E(XY) = \Prob(X=1,Y=1) = \tfrac{3}{10}$ and $\E X = \E Y = \tfrac35$, so

$$
\Cov(X,Y) = \frac{3}{10} - \frac{9}{25} = -\frac{3}{50}, \qquad \Corr(X,Y) = \frac{-3/50}{\tfrac35\cdot\tfrac25} = -\frac14 .
$$

The negative sign records that drawing a red ball first makes a red ball second less likely. Covariance has awkward units (the product of the units of $X$ and $Y$); correlation is dimensionless and always lies between $-1$ and $1$.

::: theorem Correlation inequality {#thm-correlation-bound}
If $X$ and $Y$ have finite, positive variances, then $-1\le\Corr(X,Y)\le1$. Moreover $\Corr(X,Y) = 1$ if and only if $Y = a + bX$ with probability $1$ for some constants $a$ and $b>0$, and $\Corr(X,Y) = -1$ if and only if the same holds with $b<0$.
:::

::: proof
Let $X^* = (X-\mu_X)/\sigma_X$ and $Y^* = (Y-\mu_Y)/\sigma_Y$ be the standardised variables, which have mean $0$ and variance $1$; by part (2) of [[#thm-covariance]], $\Cov(X^*,Y^*) = \rho$, the correlation of $X$ and $Y$. By part (3),

$$
0\le\Var(X^*\mp Y^*) = 1 + 1 \mp 2\rho = 2(1\mp\rho).
$$

The two signs give $\rho\le1$ and $\rho\ge-1$. If $\rho = 1$, then $\Var(X^* - Y^*) = 0$, so $X^* - Y^*$ equals its mean $0$ with probability $1$, that is $Y = \mu_Y + \frac{\sigma_Y}{\sigma_X}(X - \mu_X)$, a linear function with positive slope. If $\rho = -1$, then $X^*+Y^* = 0$ with probability $1$, giving a negative slope. Conversely, if $Y = a + bX$ then $\Cov(X,Y) = b\Var X$ and $\sigma_Y = \lvert b\rvert\sigma_X$, so $\rho = b/\lvert b\rvert = \pm1$.
:::

The theorem shows what correlation measures: how close the pair is to lying on a straight line. It says nothing about non-linear relationships.

::: widget regression
points: 1,1.8; 2,2.6; 3,3.9; 4,4.1; 5,5.4; 6,5.9; 7,7.2
degree: 1
caption: For a cloud of points, the squared correlation coefficient equals the $R^2$ shown with the fitted line ([[statistics/regression]]). Drag points off the line and watch $R^2$ fall; drag one point far away and see how a single outlier can create or destroy correlation. Then arrange the points along a parabola: the relationship is perfect, yet $R^2$ can be close to $0$.
:::

::: warning Uncorrelated does not mean independent
Independence implies zero covariance, but not conversely. If $X\sim\operatorname{U}(-1,1)$ and $Y = X^2$, then $Y$ is a function of $X$ — as dependent as it gets — yet $\Cov(X,Y) = \E X^3 - \E X\,\E X^2 = 0$ by symmetry. Similarly the coordinates of the uniform point in a disc ([[#ex-disc]]) are uncorrelated (by symmetry $\E(XY) = 0 = \E X\,\E Y$) but dependent. Correlation detects only *linear* association. And even a strong correlation between two variables does not show that one causes the other; both may be driven by a third variable, as in Simpson's paradox ([[probability/conditional-probability]]).
:::

::: quiz
$X$ and $Y$ are independent with $\Var X = 4$ and $\Var Y = 9$. What is $\Var(X - Y)$?
- [ ] $-5$
- [ ] $5$
- [x] $13$
- [ ] $\sqrt{13}$
::: solution
$\Var(X - Y) = \Var X + \Var(-Y) + 2\Cov(X,-Y) = 4 + (-1)^2\cdot9 + 0 = 13$. Variances of independent random variables add even when the variables are subtracted: subtracting $Y$ adds uncertainty just as adding it does.
:::
:::

## Sums of independent random variables {#sums}

The distribution of $X + Y$ is needed constantly: total waiting times, total claims, sums of measurement errors. When $X$ and $Y$ are independent it is given by a **convolution**.

::: theorem Convolution formula {#thm-convolution}
Let $X$ and $Y$ be independent.

1. If they are discrete, $\displaystyle\Prob(X+Y = z) = \sum_xp_X(x)\,p_Y(z-x)$.
2. If they are continuous, $X+Y$ is continuous with density $\displaystyle f_{X+Y}(z) = \int_{-\infty}^\infty f_X(x)\,f_Y(z-x)\,dx$.
:::

::: proof
(1) The event $\{X+Y = z\}$ is the disjoint union over $x$ of $\{X = x, Y = z - x\}$, whose probability is $p_X(x)p_Y(z-x)$ by independence.

(2) By independence the joint density is $f_X(x)f_Y(y)$. For each $z$, integrate it over the half-plane $\{x+y\le z\}$, substituting $y = u - x$ in the inner integral and then exchanging the order of integration (Tonelli's theorem):

$$
\Prob(X+Y\le z) = \int_{-\infty}^\infty f_X(x)\int_{-\infty}^{z-x}f_Y(y)\,dy\,dx = \int_{-\infty}^z\Bigl(\int_{-\infty}^\infty f_X(x)f_Y(u-x)\,dx\Bigr)du .
$$

So the inner integral is a density of $X+Y$.
:::

::: example Sums of Poisson random variables {#ex-poisson-sum}
Let $X\sim\operatorname{Poisson}(\lambda)$ and $Y\sim\operatorname{Poisson}(\mu)$ be independent. Show that $X+Y\sim\operatorname{Poisson}(\lambda+\mu)$.
::: solution
For $n\ge0$, only $0\le k\le n$ contribute to the convolution sum, and by the binomial theorem

$$
\Prob(X+Y = n) = \sum_{k=0}^ne^{-\lambda}\frac{\lambda^k}{k!}e^{-\mu}\frac{\mu^{n-k}}{(n-k)!} = \frac{e^{-(\lambda+\mu)}}{n!}\sum_{k=0}^n\binom nk\lambda^k\mu^{n-k} = e^{-(\lambda+\mu)}\frac{(\lambda+\mu)^n}{n!}.
$$

So if a shop receives on average $3$ calls an hour on one line and $2$ on another, independently and each Poisson, the total is $\operatorname{Poisson}(5)$. This is consistent with the "rare events" picture: combining two sources of rare events gives another one.
:::
:::

::: example The sum of two uniforms {#ex-uniform-sum}
Let $X$ and $Y$ be independent $\operatorname{U}(0,1)$ random variables. Find the density of $S = X+Y$.
::: solution
Here $f_X(x)f_Y(z-x) = 1$ exactly when $0\le x\le1$ and $0\le z-x\le1$, that is $\max(0,z-1)\le x\le\min(1,z)$, and $0$ otherwise. So $f_S(z)$ is the length of this interval:

$$
f_S(z) = \begin{cases} z, & 0\le z\le1,\\ 2 - z, & 1\le z\le2,\\ 0, & \text{otherwise.}\end{cases}
$$

The sum of two flat densities is a triangle peaked at $1$: totals near the middle can be made in more ways, just as $7$ is the most likely total of two dice. Adding a third uniform gives a piecewise-quadratic density that already looks bell-shaped, a first glimpse of the central limit theorem.
:::
:::

Repeated convolution of exponentials produces the **gamma** distributions: if $X_1,\ldots,X_n$ are independent $\operatorname{Exp}(\lambda)$, an induction with [[#thm-convolution]] shows that $X_1+\dots+X_n$ has density

$$
f(x) = \frac{\lambda^nx^{n-1}}{(n-1)!}e^{-\lambda x}\qquad(x>0).
$$ {#eq-gamma}

This is the waiting time until the $n$-th event of a Poisson process (see the exercises for $n=2$).

::: widget plot
f: x^(n - 1)*exp(-x)/gamma(n)
x: 0, 25
y: 0, 1
sliders: n=1:1:12:1
labels: \text{density of } X_1 + \dots + X_n
caption: The density of the sum of $n$ independent $\operatorname{Exp}(1)$ random variables. For $n = 1$ it is the exponential density; as $n$ increases the peak moves right (the mean is $n$), spreads out like $\sqrt n$ and becomes more and more symmetric and bell-shaped. The central limit theorem in [[probability/limit-theorems]] explains why.
:::

## The bivariate normal distribution {#bivariate-normal}

The most important joint distribution is the bivariate normal. It describes pairs such as the heights of fathers and sons, or the errors in two coordinates of a measurement, in which each variable is normal and the dependence is linear.

::: definition Standard bivariate normal distribution {#def-bivariate-normal}
Let $-1<\rho<1$. The pair $(X,Y)$ has the **standard bivariate normal distribution with correlation $\rho$** if its joint density is

$$
f(x,y) = \frac{1}{2\pi\sqrt{1-\rho^2}}\exp\Bigl(-\frac{x^2 - 2\rho xy + y^2}{2(1-\rho^2)}\Bigr),\qquad (x,y)\in\R^2.
$$ {#eq-bivariate-normal}
:::

::: proposition Properties of the bivariate normal {#prop-bivariate-normal}
If $(X,Y)$ is standard bivariate normal with correlation $\rho$, then

1. $X$ and $Y$ are each $\Normal(0,1)$;
2. given $X = x$, $Y$ has the $\Normal(\rho x, 1-\rho^2)$ distribution;
3. $\Corr(X,Y) = \rho$;
4. $X$ and $Y$ are independent if and only if $\rho = 0$.
:::

::: proof
Complete the square in $y$: $x^2 - 2\rho xy + y^2 = (y - \rho x)^2 + (1-\rho^2)x^2$. Hence

$$
f(x,y) = \underbrace{\frac{1}{\sqrt{2\pi}}e^{-x^2/2}}_{\varphi(x)}\cdot\underbrace{\frac{1}{\sqrt{2\pi(1-\rho^2)}}\exp\Bigl(-\frac{(y-\rho x)^2}{2(1-\rho^2)}\Bigr)}_{g_x(y)},
$$

where, for each fixed $x$, $g_x$ is the $\Normal(\rho x, 1-\rho^2)$ density in $y$. Integrating over $y$ gives $f_X(x) = \varphi(x)$, proving (1) for $X$; by the symmetry of [[#eq-bivariate-normal]] in $x$ and $y$, the same holds for $Y$. Then $f_{Y\mid X}(y\mid x) = f(x,y)/\varphi(x) = g_x(y)$, which is (2). For (3), the means are $0$ and the variances $1$, so $\Corr(X,Y) = \E(XY)$, and integrating first over $y$ (the mean of $g_x$ is $\rho x$),

$$
\E(XY) = \int_{-\infty}^\infty x\varphi(x)\Bigl(\int_{-\infty}^\infty y\,g_x(y)\,dy\Bigr)dx = \int_{-\infty}^\infty\rho x^2\varphi(x)\,dx = \rho\,\E X^2 = \rho .
$$

(4) If $\rho = 0$ then $f(x,y) = \varphi(x)\varphi(y)$, so $X$ and $Y$ are independent by [[#thm-independence-criteria]]; if they are independent then $\rho = \Corr(X,Y) = 0$ by [[#thm-covariance]].
:::

Part (4) is special to the bivariate normal: for jointly normal variables, and *only* for such well-behaved families, uncorrelated means independent. The general bivariate normal distribution is obtained by rescaling, $(\mu_X+\sigma_XX,\ \mu_Y+\sigma_YY)$; its density has elliptical contours centred at $(\mu_X,\mu_Y)$, tilted according to the sign of $\rho$.

::: widget surface
f: exp(-(x^2 - 2*r*x*y + y^2)/(2*(1 - r^2)))/(2*pi*sqrt(1 - r^2))
x: -3, 3
y: -3, 3
sliders: r=0.6:-0.95:0.95:0.05
contours: true
caption: The standard bivariate normal density with correlation $r$. At $r = 0$ the surface is a round hill with circular contours, the product of two normal curves. As $r$ moves towards $1$ the hill is squeezed into a ridge along the line $y = x$, and towards $-1$ along $y = -x$. Every vertical slice is a bell curve: the slice at $x$ is centred at $rx$, which is the conditional mean of part (2).
:::

Part (2) contains the phenomenon Francis Galton called **regression to the mean**. If standardised heights of fathers ($X$) and adult sons ($Y$) are bivariate normal with $\rho = 0.5$, then the sons of fathers two standard deviations above average are on average only $\rho\cdot2 = 1$ standard deviation above average. Nothing pulls sons towards mediocrity; the effect arises because a father's height is only partly passed on, and it works equally in reverse (fathers of tall sons are also less extreme). It reappears in [[statistics/regression]].

::: history
The bivariate normal density appeared in work on errors of observation in two dimensions, notably by Auguste Bravais in 1846. Its statistical importance was recognised by Francis Galton, who studied the heights of parents and children in the 1880s, found the elliptical contours in his data, and introduced regression (1886) and correlation (1888) to describe them. Karl Pearson put correlation on a systematic mathematical footing in the 1890s with the product-moment formula now called Pearson's correlation coefficient.
:::

## Where this leads {#where-next}

Linearity of expectation, conditional expectation $\E(Y\mid X)$ and generating functions — which turn convolutions into products — are developed in [[probability/expectation]]. Variances of sums of independent random variables, computed here, drive the law of large numbers and the central limit theorem in [[probability/limit-theorems]]. In statistics, joint distributions of samples underlie everything: the independence of the sample mean and sample variance for normal data ([[statistics/sampling]]), and the bivariate normal model of [[statistics/regression]]. Random vectors in $n$ dimensions, with covariance matrices instead of single covariances, connect this chapter to [[linear-algebra/spectral-theorem]].

::: summary
- The joint pmf or joint density of $(X,Y)$ determines all probabilities about the pair; marginals are obtained by summing or integrating out the other variable, and conditional distributions by dividing by a marginal.
- $X$ and $Y$ are independent if all events about $X$ are independent of all events about $Y$; equivalently the joint pmf or density factorises — on a rectangle.
- $\E g(X,Y)$ is a double sum or integral; linearity $\E(X+Y) = \E X+\E Y$ always holds, and $\E(XY) = \E X\,\E Y$ when $X$, $Y$ are independent.
- $\Cov(X,Y) = \E(XY) - \E X\E Y$; $\Var(X+Y) = \Var X+\Var Y+2\Cov(X,Y)$, so variances of independent variables add.
- $\Corr(X,Y)\in[-1,1]$, with $\pm1$ exactly for exact linear relationships; zero correlation does not imply independence, and correlation does not imply causation.
- Sums of independent random variables have convolution distributions: Poisson plus Poisson is Poisson, uniform plus uniform is triangular, sums of exponentials are gamma.
- In the bivariate normal, marginals and conditionals are normal, $\E(Y\mid X=x) = \rho x$ (regression to the mean), and uncorrelated means independent.
:::

## Exercises

::: exercise A joint table {level=1 check="1/20"}
$X$ and $Y$ take values in $\{0,1\}$ with $p(0,0) = 0.2$, $p(0,1) = 0.3$, $p(1,0) = 0.1$, $p(1,1) = 0.4$. Find the marginal pmfs and $\Cov(X,Y)$.
::: solution
$\Prob(X = 1) = 0.1+0.4 = 0.5$ and $\Prob(Y=1) = 0.3+0.4 = 0.7$, so $\E X = 0.5$, $\E Y = 0.7$. Also $\E(XY) = p(1,1) = 0.4$. Hence $\Cov(X,Y) = 0.4 - 0.5\times0.7 = 0.05$.
:::
:::

::: exercise Variance of a combination {level=1 check="17"}
$X$ and $Y$ are independent with $\Var X = 3$ and $\Var Y = 5$. Find $\Var(2X - Y + 7)$.
::: solution
$\Var(2X - Y + 7) = 4\Var X + \Var Y = 12 + 5 = 17$, using [[#thm-covariance]] with $\Cov(X,Y) = 0$; the constant does not matter.
:::
:::

::: exercise A factorising density {level=1 check="2/5"}
$(X,Y)$ has joint density $f(x,y) = 6x^2y$ on the unit square $0\le x,y\le1$. Show that $X$ and $Y$ are independent and find $\Prob(X<Y)$.
::: solution
On the square (a rectangle) $f(x,y) = 3x^2\cdot2y$, a product of densities on $[0,1]$, so $X$ and $Y$ are independent with $f_X(x) = 3x^2$ and $f_Y(y) = 2y$. Then

$$
\Prob(X<Y) = \int_0^1 2y\Bigl(\int_0^y3x^2\,dx\Bigr)dy = \int_0^12y^4\,dy = \frac25 .
$$
:::
:::

::: exercise First failure {level=2 check="500"}
Three independent components have exponential lifetimes with means $1000$, $2000$ and $2000$ hours. A system fails as soon as any one of its components fails. Find the expected lifetime of the system, and the probability that the first component is the one that fails first.
::: solution
The failure rates are $0.001$, $0.0005$ and $0.0005$ per hour. As in [[#ex-competing]], the minimum of independent exponential lifetimes exceeds $t$ exactly when all three do, so $\Prob(T>t) = e^{-0.001t}e^{-0.0005t}e^{-0.0005t} = e^{-0.002t}$: the system lifetime is $\operatorname{Exp}(0.002)$, with mean $1/0.002 = 500$ hours. The first component fails first with probability $0.001/(0.001 + 0.0005 + 0.0005) = \tfrac12$, by the same integral as in the example with $\mu$ replaced by the combined rate $0.001$ of the other two (their minimum is $\operatorname{Exp}(0.001)$ and is independent of the first lifetime).
:::
:::

::: exercise Correlation of a sum {level=2 check="1/sqrt(2)"}
$X$ and $Y$ are independent with the same variance $\sigma^2>0$. Find $\Corr(X, X+Y)$.
::: solution
$\Cov(X,X+Y) = \Var X + \Cov(X,Y) = \sigma^2$ and $\Var(X+Y) = 2\sigma^2$, so

$$
\Corr(X,X+Y) = \frac{\sigma^2}{\sigma\cdot\sqrt2\,\sigma} = \frac{1}{\sqrt2}\approx0.707 .
$$
:::
:::

::: exercise Correlation for a non-uniform density {level=2 check="-1/11"}
For the density $f(x,y) = x + y$ on the unit square of [[#ex-xy-density]], find $\Corr(X,Y)$.
::: solution
From $f_X(x) = x+\tfrac12$: $\E X = \int_0^1x\bigl(x+\tfrac12\bigr)dx = \tfrac13 + \tfrac14 = \tfrac7{12}$ and $\E X^2 = \tfrac14 + \tfrac16 = \tfrac5{12}$, so $\Var X = \tfrac5{12} - \tfrac{49}{144} = \tfrac{11}{144}$; the same holds for $Y$. Next

$$
\E(XY) = \int_0^1\int_0^1xy(x+y)\,dx\,dy = \frac13\cdot\frac12 + \frac12\cdot\frac13 = \frac13,
$$

so $\Cov(X,Y) = \tfrac13 - \tfrac{49}{144} = -\tfrac{1}{144}$ and $\Corr(X,Y) = \dfrac{-1/144}{11/144} = -\dfrac{1}{11}$. The correlation is weakly negative: the density is largest near the corner $(1,1)$ but the constraint of total mass $1$ makes large values of one coordinate slightly favour small values of the other.
:::
:::

::: exercise Uncorrelated but dependent {level=3}
Let $X\sim\operatorname{U}(-1,1)$ and $Y = X^2$. Prove that $\Cov(X,Y) = 0$ but that $X$ and $Y$ are not independent.
::: solution
$\E X = 0$ and $\E X^3 = \int_{-1}^1\tfrac12x^3\,dx = 0$ (odd integrand), so $\Cov(X,Y) = \E(X\cdot X^2) - \E X\,\E X^2 = 0$. For dependence, consider $A = \{X>\tfrac12\}$ and $B = \{Y<\tfrac14\}$. Then $\Prob(A) = \tfrac14$ and $\Prob(B) = \Prob(\lvert X\rvert<\tfrac12) = \tfrac12$, but $A\cap B = \varnothing$ because $X>\tfrac12$ forces $Y>\tfrac14$. So $\Prob(A\cap B) = 0\ne\tfrac18 = \Prob(A)\Prob(B)$.
:::
:::

::: exercise Binomial plus binomial {level=3}
Let $X\sim\Bin(m,p)$ and $Y\sim\Bin(n,p)$ be independent. Prove, using the convolution formula, that $X+Y\sim\Bin(m+n,p)$, and explain the result in terms of Bernoulli trials.
::: hint
You will need Vandermonde's identity $\sum_k\binom mk\binom{n}{j-k} = \binom{m+n}{j}$.
:::
::: solution
With $q = 1-p$, for $0\le j\le m+n$,

$$
\Prob(X+Y = j) = \sum_k\binom mkp^kq^{m-k}\binom{n}{j-k}p^{j-k}q^{n-j+k} = p^jq^{m+n-j}\sum_k\binom mk\binom n{j-k} = \binom{m+n}jp^jq^{m+n-j},
$$

by Vandermonde's identity (choosing $j$ objects from $m+n$ means choosing $k$ from the first $m$ and $j-k$ from the other $n$, for some $k$; see [[discrete/counting]]). In terms of trials: $X$ counts successes in $m$ independent trials and $Y$ in $n$ further trials independent of the first, so $X+Y$ counts successes in $m+n$ independent trials with the same success probability.
:::
:::

::: exercise The second arrival {level=3}
Let $X$ and $Y$ be independent $\operatorname{Exp}(\lambda)$. Use the convolution formula to show that $X+Y$ has density $\lambda^2ze^{-\lambda z}$ for $z>0$, as claimed in [[#eq-gamma]] for $n = 2$, and find $\Prob(X+Y>1)$ when $\lambda = 1$.
::: solution
For $z>0$, $f_X(x)f_Y(z-x)$ is non-zero only for $0<x<z$, where it equals $\lambda e^{-\lambda x}\lambda e^{-\lambda(z-x)} = \lambda^2e^{-\lambda z}$, independent of $x$. Hence $f_{X+Y}(z) = \int_0^z\lambda^2e^{-\lambda z}\,dx = \lambda^2ze^{-\lambda z}$. With $\lambda = 1$, integrating by parts,

$$
\Prob(X+Y>1) = \int_1^\infty ze^{-z}\,dz = \Bigl[-ze^{-z} - e^{-z}\Bigr]_1^\infty = 2e^{-1}\approx0.736 .
$$

This is also $\Prob(N\le1)$ for $N\sim\operatorname{Poisson}(1)$, the number of events of a rate-$1$ Poisson process in $[0,1]$: the second event comes after time $1$ exactly when at most one event occurs by then, and $e^{-1}(1+1) = 2e^{-1}$.
:::
:::
