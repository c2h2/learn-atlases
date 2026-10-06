The geometric series of [[calculus-2/series#thm-geometric]] can be read in a new way. For every $x$ with $\abs x < 1$,

$$
\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots = \sum_{n=0}^\infty x^n .
$$ {#eq-geometric-fn}

The left-hand side is a function; the right-hand side looks like a polynomial that never ends. A series of this shape, $\sum c_n (x - a)^n$, is a **power series**. Power series are the main reason infinite series matter outside pure mathematics: they let us treat functions such as $e^x$, $\ln(1+x)$, $\arctan x$ and the solutions of differential equations as "polynomials of infinite degree", which can be evaluated with arithmetic alone, and differentiated and integrated term by term.

Formula [[#eq-geometric-fn]] also shows the catch. At $x = 2$ the left side is $-1$, while the right side is $1 + 2 + 4 + \cdots$, which diverges. A power series represents a function only on a certain interval, and the first task of this chapter is to find that interval. Then we prove that inside it a power series can be differentiated and integrated as if it were a polynomial, and use this to find series for $\ln(1+x)$ and $\arctan x$, to compute $\ln 2$ and $\pi$, and to identify $\sum x^n/n!$ with $e^x$.

## Power series and where they converge

::: definition Power series {#def-power-series}
A **power series centred at $a$** is a series of the form

$$
\sum_{n=0}^\infty c_n (x-a)^n = c_0 + c_1(x - a) + c_2(x-a)^2 + \cdots ,
$$

where the **coefficients** $c_n$ are constants and $x$ is a variable. (By convention $(x-a)^0 = 1$, even at $x = a$.) For each $x$ at which the series converges, its sum defines a value $f(x)$; the set of such $x$ is the **domain of convergence**.
:::

A power series always converges at its centre $x = a$, where it reduces to $c_0$. Three examples show the range of possible behaviour:

- $\sum x^n$ converges exactly for $-1 < x < 1$;
- $\sum \dfrac{x^n}{n!}$ converges for every real $x$ (ratio test: $\abs{\frac{x}{n+1}} \to 0$);
- $\sum n!\,x^n$ converges only at $x = 0$ (for $x \ne 0$ the ratio is $(n+1)\abs{x} \to \infty$).

In each case the domain of convergence is an interval centred at $a$. That is always so, and the reason is a comparison with a geometric series.

::: lemma Convergence spreads inwards {#lem-abel}
If $\sum c_n (x_0 - a)^n$ converges for some $x_0 \ne a$, then $\sum c_n (x-a)^n$ converges absolutely for every $x$ with $\abs{x - a} < \abs{x_0 - a}$.
:::

::: proof
Since $\sum c_n(x_0 - a)^n$ converges, its terms tend to $0$ and so are bounded: $\abs{c_n (x_0-a)^n} \le M$ for all $n$. Let $\abs{x - a} < \abs{x_0 - a}$ and put $q = \abs{x - a}/\abs{x_0 - a} < 1$. Then

$$
\abs{c_n(x-a)^n} = \abs{c_n(x_0 - a)^n}\cdot\abs{\frac{x-a}{x_0 - a}}^n \le M q^n .
$$

The geometric series $\sum Mq^n$ converges, so $\sum\abs{c_n(x-a)^n}$ converges by direct comparison ([[calculus-2/convergence-tests#thm-comparison]]).
:::

::: theorem Radius of convergence {#thm-radius}
For a power series $\sum c_n (x-a)^n$ exactly one of the following holds:

1. the series converges only at $x = a$;
2. the series converges absolutely for every real $x$;
3. there is a number $R > 0$ such that the series converges absolutely for $\abs{x - a} < R$ and diverges for $\abs{x - a} > R$.

The number $R$ is the **radius of convergence**; we set $R = 0$ in case 1 and $R = \infty$ in case 2.
:::

::: proof
Let $D$ be the set of $x$ at which the series converges, and let $R = \sup\set{\abs{x - a} : x \in D}$, allowing $R = \infty$ if the set is unbounded. If $R = 0$ we are in case 1. Otherwise, let $\abs{x - a} < R$. By the definition of supremum there is $x_0 \in D$ with $\abs{x_0 - a} > \abs{x - a}$, and [[#lem-abel]] shows that the series converges absolutely at $x$. If $R = \infty$ this applies to every $x$ (case 2). If $R < \infty$ and $\abs{x - a} > R$, then $x \notin D$ by the definition of $R$, so the series diverges at $x$ (case 3).
:::

The theorem says nothing about the two **endpoints** $x = a \pm R$: there the series may converge absolutely, converge conditionally or diverge, and each endpoint must be checked separately. The **interval of convergence** is the domain of convergence, an interval from $a - R$ to $a + R$ that may or may not contain each endpoint.

### Computing the radius

Applying the ratio or root test to the terms $c_n(x-a)^n$ usually gives $R$ directly.

::: theorem Ratio and root formulas for the radius {#thm-radius-formula}
If $c_n \ne 0$ for all large $n$ and $\abs{c_{n+1}/c_n} \to L$, or if $\abs{c_n}^{1/n} \to L$, where $0 \le L \le \infty$, then the radius of convergence is $R = 1/L$ (with $1/0 = \infty$ and $1/\infty = 0$).
:::

::: proof
Fix $x \ne a$. In the ratio case, the terms $u_n = c_n(x-a)^n$ satisfy

$$
\abs{\frac{u_{n+1}}{u_n}} = \abs{\frac{c_{n+1}}{c_n}}\,\abs{x - a} \to L\abs{x - a}.
$$

By the ratio test ([[calculus-2/convergence-tests#thm-ratio]]) the series converges absolutely if $L\abs{x-a} < 1$ and diverges if $L\abs{x - a} > 1$. If $0 < L < \infty$, this says convergence for $\abs{x-a} < 1/L$ and divergence for $\abs{x-a} > 1/L$, so $R = 1/L$. If $L = 0$ the limit is $0 < 1$ for every $x$, so $R = \infty$; if $L = \infty$ the limit is $\infty$ for every $x \ne a$, so $R = 0$. The root case is identical, using $\abs{u_n}^{1/n} = \abs{c_n}^{1/n}\abs{x - a} \to L\abs{x-a}$ and the root test.
:::

::: example Intervals of convergence {#ex-intervals}
Find the radius and interval of convergence of (a) $\displaystyle\sum_{n=1}^\infty\frac{x^n}{n}$ and (b) $\displaystyle\sum_{n=1}^\infty\frac{(x-2)^n}{n^2\,3^n}$.
::: solution
(a) $\abs{c_{n+1}/c_n} = \frac{n}{n+1} \to 1$, so $R = 1$: absolute convergence for $-1 < x < 1$, divergence for $\abs x > 1$. Endpoints: at $x = 1$ we get the harmonic series, which diverges; at $x = -1$ we get $\sum\frac{(-1)^n}{n}$, which converges by the alternating series test. The interval of convergence is $[-1, 1)$.

(b) Here $c_n = \frac{1}{n^2 3^n}$ and $\abs{c_{n+1}/c_n} = \frac{n^2}{3(n+1)^2} \to \frac13$, so $R = 3$ and the series converges absolutely for $\abs{x - 2} < 3$, i.e. $-1 < x < 5$. At the endpoints $x - 2 = \pm3$ the terms become $\frac{(\pm1)^n}{n^2}$, and $\sum\frac1{n^2}$ converges, so the series converges absolutely at both. The interval of convergence is $[-1, 5]$.
:::
:::

::: quiz
What is the radius of convergence of $\displaystyle\sum_{n=1}^\infty\frac{2^n}{n^3}x^n$?
- [ ] $2$
- [x] $\frac12$
- [ ] $1$
- [ ] $\infty$, because $n^3$ grows
::: solution
$\abs{\dfrac{c_{n+1}}{c_n}} = 2\left(\dfrac{n}{n+1}\right)^3 \to 2$, so $R = \frac12$. The polynomial factor $n^3$ has no effect on the radius (it only influences the endpoints, where here the series converges absolutely); only the exponential factor $2^n$ matters.
:::
:::

::: example A series with gaps {#ex-gaps}
Find the interval of convergence of $\displaystyle\sum_{n=0}^\infty\frac{x^{2n}}{4^n} = 1 + \frac{x^2}{4} + \frac{x^4}{16} + \cdots$.
::: solution
Only even powers occur, so as a power series in $x$ every odd coefficient is $0$ and the ratio $c_{n+1}/c_n$ is undefined: [[#thm-radius-formula]] does not apply directly. Instead apply the ratio test to the terms themselves: $\abs{\frac{x^{2n+2}/4^{n+1}}{x^{2n}/4^n}} = \frac{x^2}{4}$, which is less than $1$ exactly when $\abs x < 2$. Even simpler, the series is geometric with ratio $\frac{x^2}{4}$, so it converges exactly for $\abs x < 2$, with sum $\frac{1}{1 - x^2/4} = \frac{4}{4 - x^2}$. At $x = \pm2$ every term equals $1$ and the series diverges. The interval is $(-2, 2)$ and $R = 2$.
:::
:::

::: warning Endpoints are never decided by the radius
The ratio and root tests give the open interval $\abs{x - a} < R$ and nothing more: at $\abs{x - a} = R$ the limit in the test is exactly $1$. Always substitute each endpoint and test the resulting numerical series separately — [[#ex-intervals]] and [[#ex-gaps]] above show that all combinations occur (neither endpoint, one, or both). And never use the function a series represents outside its interval: $\frac{1}{1-x} = \sum x^n$ is simply false at $x = 2$.
:::

::: widget plot
f: 1/(1-x); sum(x^k, k, 0, N)
sliders: N=4:0:40:1
x: -1.6, 1.6
y: -3, 8
labels: \frac{1}{1-x}; \sum_{k=0}^{N} x^k
vlines: -1; 1
caption: Partial sums $1 + x + \cdots + x^N$ of the geometric series against $\frac{1}{1-x}$. Increase $N$: inside $(-1, 1)$ the polynomials hug the curve ever more closely; outside they peel away, wildly for $\lvert x\rvert > 1$, although $\frac{1}{1-x}$ is perfectly well defined at $x = -1.5$. Near $x = -1$ watch the partial sums flip between about $0$ and $1$.
:::

::: quiz
A power series $\sum c_n x^n$ (centred at $0$) converges at $x = 3$ and diverges at $x = -5$. Which statements must be true? (Select all that apply.)
- [x] It converges at $x = -2$.
- [x] It diverges at $x = 6$.
- [ ] It converges at $x = 4$.
- [x] Its radius of convergence satisfies $3 \le R \le 5$.
::: solution
Convergence at $3$ means $R \ge 3$ (by [[#lem-abel]] the series converges absolutely for $\abs x < 3$, in particular at $-2$). Divergence at $-5$ means $R \le 5$ (otherwise it would converge there), so it diverges for $\abs x > 5$, in particular at $6$. The point $x = 4$ lies in the unknown zone $3 \le \abs x \le 5$: the series might converge or diverge there.
:::
:::

## Differentiating and integrating term by term

Inside its interval of convergence, a power series behaves like a polynomial: its derivative and integral are obtained term by term. This is the key theorem of the chapter.

::: theorem Term-by-term differentiation and integration {#thm-termwise}
Suppose $\sum c_n(x-a)^n$ has radius of convergence $R > 0$, and let $f(x) = \sum_{n=0}^\infty c_n(x-a)^n$ for $\abs{x - a} < R$. Then $f$ is differentiable on $(a - R, a + R)$, and there

$$
f'(x) = \sum_{n=1}^\infty n\,c_n(x-a)^{n-1}, \qquad \int_a^x f(t)\,dt = \sum_{n=0}^\infty\frac{c_n}{n+1}(x-a)^{n+1}.
$$ {#eq-termwise}

Both series on the right also have radius of convergence $R$.
:::

::: proof
Take $a = 0$ to simplify notation (substitute $x - a$ for $x$ in general).

*Step 1: the differentiated series have radius $R$.* Let $\abs x < r < R$ and $q = \abs x/r < 1$. The series converges at $r$, so its terms are bounded: $\abs{c_n}r^n \le M$. Then

$$
n\abs{c_n}\abs{x}^{n-1} \le \frac{M}{r}\,n q^{n-1}, \qquad n(n-1)\abs{c_n}\abs x^{n-2} \le \frac{M}{r^2}\,n(n-1)q^{n-2},
$$

and $\sum nq^{n-1}$ and $\sum n(n-1)q^{n-2}$ converge by the ratio test (the ratios tend to $q < 1$). So $\sum nc_nx^{n-1}$ and $\sum n(n-1)c_nx^{n-2}$ converge absolutely for $\abs x < R$. Conversely, if $\sum n c_n x^{n-1}$ converged at some $x$ with $\abs x > R$, then by [[#lem-abel]] it would converge absolutely at a point $x'$ with $R < \abs{x'} < \abs x$, and since $\abs{c_n x'^n} \le \abs{x'}\cdot n\abs{c_n}\abs{x'}^{n-1}$ the original series would converge at $x'$, contradicting [[#thm-radius]]. So the radius of $\sum nc_nx^{n-1}$ is exactly $R$.

*Step 2: the derivative.* Let $g(x) = \sum_{n\ge1} nc_nx^{n-1}$. Fix $\abs x < R$, choose $r$ with $\abs x < r < R$, and let $h \ne 0$ with $\abs{x + h} < r$. For each $n \ge 1$, by the fundamental theorem of calculus,

$$
(x+h)^n - x^n - nx^{n-1}h = \int_x^{x+h} n\left(t^{n-1} - x^{n-1}\right)dt .
$$

For $t$ between $x$ and $x + h$ we have $\abs t < r$, and by the mean value theorem $\abs{t^{n-1} - x^{n-1}} \le (n-1)r^{n-2}\abs{t - x}$. Integrating this bound,

$$
\abs{(x+h)^n - x^n - nx^{n-1}h} \le n(n-1)r^{n-2}\int_0^{\abs h} s\,ds = \tfrac12 n(n-1)r^{n-2}\abs h^2 .
$$

Multiplying by $\abs{c_n}$ and summing (all three series converge, so we may combine them term by term),

$$
\abs{f(x + h) - f(x) - g(x)h} \le \frac{\abs h^2}{2}\sum_{n=2}^\infty n(n-1)\abs{c_n}r^{n-2} = \frac{K}{2}\abs h^2,
$$

where $K < \infty$ by Step 1 (applied at the point $r < R$). Dividing by $\abs h$: $\abs{\frac{f(x+h) - f(x)}{h} - g(x)} \le \frac K2\abs h \to 0$, so $f'(x) = g(x)$.

*Step 3: the integral.* The series $F(x) = \sum\frac{c_n}{n+1}x^{n+1}$ has $\sum c_nx^n$ as its differentiated series, so by Step 1 it has the same radius $R$, and by Step 2, $F' = f$ on $(-R, R)$. Since $F(0) = 0$, the fundamental theorem of calculus gives $F(x) = \int_0^x f(t)\,dt$.
:::

Applying the theorem repeatedly, $f$ has derivatives of every order on $(a - R, a + R)$, each given by a power series with radius $R$. Differentiating $k$ times and setting $x = a$ kills every term except one:

::: corollary The coefficients are determined by the function {#cor-coefficients}
If $f(x) = \sum c_n(x - a)^n$ with radius $R > 0$, then $f$ is infinitely differentiable on $(a - R, a + R)$ and

$$
c_n = \frac{f^{(n)}(a)}{n!} \qquad (n = 0, 1, 2, \dots).
$$

In particular, if two power series centred at $a$ have the same sum on some interval around $a$, they have the same coefficients.
:::

::: proof
By [[#thm-termwise]] applied $n$ times, $f^{(n)}(x) = \sum_{k \ge n} k(k-1)\cdots(k-n+1)\,c_k(x-a)^{k-n}$. At $x = a$ only the term $k = n$ survives, giving $f^{(n)}(a) = n!\,c_n$. If two series have the same sum near $a$, their derivatives at $a$ agree, hence so do their coefficients.
:::

This corollary is the bridge to [[calculus-2/taylor-series]]: *if* a function has a power series, the series must be its Taylor series.

::: warning Endpoints can change under differentiation and integration
The radius never changes, but endpoint behaviour can. The series $\sum_{n\ge1}\frac{x^n}{n^2}$ converges on $[-1, 1]$; its derivative $\sum\frac{x^{n-1}}{n}$ converges only on $[-1, 1)$; the next derivative $\sum\frac{(n-1)x^{n-2}}{n}$ only on $(-1, 1)$. Differentiation can lose endpoints and integration can gain them, so recheck endpoints after every operation.
:::

::: example Differentiating the geometric series {#ex-differentiate}
Find a closed form for $\displaystyle\sum_{n=1}^\infty nx^n$ when $\abs x < 1$, and evaluate $\displaystyle\sum_{n=1}^\infty\frac{n}{2^n}$.
::: solution
Differentiate [[#eq-geometric-fn]] term by term, which [[#thm-termwise]] allows for $\abs x < 1$:

$$
\frac{1}{(1-x)^2} = \sum_{n=1}^\infty nx^{n-1} \qquad (\abs x < 1).
$$

Multiplying by $x$ gives $\displaystyle\sum_{n=1}^\infty nx^n = \frac{x}{(1-x)^2}$. At $x = \frac12$: $\displaystyle\sum\frac{n}{2^n} = \frac{1/2}{(1/2)^2} = 2$, which agrees with the direct computation in [[calculus-2/series]]. In probability this is the expected number of tosses of a fair coin up to and including the first head.
:::
:::

## Series for logarithms, arctangents and π

Integrating instead of differentiating produces two of the most famous series in mathematics.

::: example The logarithm series {#ex-log-series}
Show that

$$
\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots = \sum_{n=1}^\infty\frac{(-1)^{n+1}x^n}{n} \qquad (-1 < x \le 1),
$$

and deduce that $1 - \frac12 + \frac13 - \frac14 + \cdots = \ln 2$.
::: solution
Replacing $x$ by $-t$ in [[#eq-geometric-fn]], $\dfrac{1}{1+t} = \sum_{n\ge0}(-1)^nt^n$ for $\abs t < 1$. Integrating from $0$ to $x$ term by term ([[#thm-termwise]]) gives the series for $\ln(1+x)$ for $\abs x < 1$.

That argument says nothing about the endpoint $x = 1$, where the series converges only conditionally. To include it we keep track of the remainder. The finite geometric sum gives, for $t \ne -1$,

$$
\frac{1}{1+t} = 1 - t + t^2 - \cdots + (-t)^{n-1} + \frac{(-t)^n}{1 + t}.
$$

Integrating from $0$ to $x$, for $0 \le x \le 1$,

$$
\ln(1+x) = \sum_{k=1}^{n}\frac{(-1)^{k+1}x^k}{k} + (-1)^n\int_0^x\frac{t^n}{1+t}\,dt, \qquad 0 \le \int_0^x\frac{t^n}{1+t}\,dt \le \int_0^x t^n\,dt = \frac{x^{n+1}}{n+1} .
$$

The remainder is at most $\frac{1}{n+1} \to 0$, so the partial sums converge to $\ln(1 + x)$ for $0 \le x \le 1$; at $x = 1$ this is the alternating harmonic series, whose sum is therefore $\ln 2$. (At $x = -1$ the series is minus the harmonic series and diverges, matching $\ln 0 = -\infty$.)
:::
:::

The same series is a poor way to *compute* $\ln 2$: by the alternating series bound, $1000$ terms give only three decimals. A better idea is to subtract the series for $\ln(1-x)$ from that of $\ln(1+x)$, which cancels the even powers:

$$
\ln\frac{1+x}{1-x} = 2\left(x + \frac{x^3}{3} + \frac{x^5}{5} + \cdots\right) \qquad (\abs x < 1).
$$

With $x = \frac13$, so that $\frac{1+x}{1-x} = 2$, three terms give $2\left(\frac13 + \frac{1}{81} + \frac{1}{1215}\right) = 0.693\,004$ (error $1.4\times10^{-4}$) and four terms give $0.693\,135$ (error $1.2\times10^{-5}$). Choosing *where* to expand matters as much as the series itself.

::: example The arctangent series and π {#ex-arctan}
Show that $\arctan x = \displaystyle\sum_{n=0}^\infty\frac{(-1)^n x^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$ for $-1 \le x \le 1$, and deduce the **Madhava–Leibniz series** $\dfrac\pi4 = 1 - \dfrac13 + \dfrac15 - \dfrac17 + \cdots$.
::: solution
Replace $t$ by $t^2$ in the finite geometric sum used above:

$$
\frac{1}{1+t^2} = \sum_{k=0}^{n-1}(-1)^kt^{2k} + \frac{(-1)^nt^{2n}}{1+t^2}.
$$

Integrating from $0$ to $x$ and using $\int_0^x\frac{dt}{1+t^2} = \arctan x$,

$$
\arctan x = \sum_{k=0}^{n-1}\frac{(-1)^kx^{2k+1}}{2k+1} + (-1)^n\int_0^x\frac{t^{2n}}{1+t^2}\,dt .
$$

For $\abs x \le 1$ the remainder has absolute value at most $\abs{\int_0^x t^{2n}\,dt} = \frac{\abs x^{2n+1}}{2n+1} \le \frac{1}{2n+1} \to 0$. So the series converges to $\arctan x$ on $[-1, 1]$. At $x = 1$, $\arctan 1 = \frac\pi4$.
:::
:::

::: widget plot
f: atan(x); sum((-1)^k x^(2k+1)/(2k+1), k, 0, N)
sliders: N=3:0:30:1
x: -2, 2
y: -2, 2
labels: \arctan x; \text{partial sum to } x^{2N+1}
vlines: -1; 1
caption: Partial sums of $x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$ against $\arctan x$. The approximation improves on $[-1, 1]$ as $N$ grows, slowly near $\pm1$, and fails completely outside it, although $\arctan x$ is smooth for all $x$. The radius $R = 1$ is not caused by anything visible on the real line: it is caused by the complex points $\pm i$, where $1 + x^2 = 0$.
:::

The Madhava–Leibniz series converges far too slowly to compute $\pi$: by the alternating series bound, the error after $n$ terms is at most $\frac{1}{2n+1}$ in $\frac\pi4$ (in fact about $\frac1n$ in $\pi$), and indeed $4\sum_{k<1000}\frac{(-1)^k}{2k+1} = 3.140\,592\,65$, still wrong in the third decimal. The cure is to evaluate $\arctan$ at small arguments, where the terms shrink geometrically. **Machin's formula** (1706),

$$
\frac\pi4 = 4\arctan\frac15 - \arctan\frac1{239},
$$

does exactly that. Using $n$ terms of each arctangent series:

| terms of each series | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|
| approximation to $\pi$ | $3.183\,26$ | $3.140\,597$ | $3.141\,621\,0$ | $3.141\,591\,77$ | $3.141\,592\,682$ | $3.141\,592\,652\,6$ |
| error | $4.2\times10^{-2}$ | $-1.0\times10^{-3}$ | $2.8\times10^{-5}$ | $-8.8\times10^{-7}$ | $2.9\times10^{-8}$ | $-9.7\times10^{-10}$ |

Each extra term gains about $1.4$ decimal digits, since the terms of the first series shrink by a factor of roughly $25 = 5^2$. Formulas of this kind were used for nearly all hand and early computer calculations of $\pi$.

::: widget sequence
a: 4*(-1)^n/(2n+1)
start: 0
mode: sums
N: 60
limit: pi
epsilon: 0.05
caption: Partial sums of $4\left(1 - \frac13 + \frac15 - \cdots\right)$, the Madhava–Leibniz series for $\pi$. They oscillate around $\pi$ with error about $\frac1n$ after $n$ terms — compare the table, where Machin's formula reaches nine digits with six terms of each series.
:::

## The exponential series and other constructions

Term-by-term differentiation lets us identify functions through the differential equations they satisfy.

::: example The exponential function {#ex-exp}
Show that $\displaystyle e^x = \sum_{n=0}^\infty\frac{x^n}{n!}$ for every real $x$.
::: solution
Let $f(x) = \sum_{n\ge0}\frac{x^n}{n!}$. The ratio of coefficients is $\frac{n!}{(n+1)!} = \frac1{n+1} \to 0$, so $R = \infty$ by [[#thm-radius-formula]]. By [[#thm-termwise]], for every $x$,

$$
f'(x) = \sum_{n=1}^\infty\frac{n\,x^{n-1}}{n!} = \sum_{n=1}^\infty\frac{x^{n-1}}{(n-1)!} = \sum_{m=0}^\infty\frac{x^m}{m!} = f(x),
$$

and $f(0) = 1$. Now let $g(x) = f(x)e^{-x}$. Then $g'(x) = f'(x)e^{-x} - f(x)e^{-x} = 0$, so $g$ is constant ([[calculus-1/mean-value-theorem]]), and $g(0) = 1$. Hence $f(x) = e^x$. At $x = 1$ this gives $e = \sum\frac{1}{n!} = 2.718\,281\,8\ldots$, the fast series met in [[calculus-2/series#ex-factorials]].
:::
:::

The same idea, applied to $y'' = -y$, produces the series for $\sin x$ and $\cos x$ ([[#exr-sin-cos]]), and in [[ode/series-solutions]] it becomes a general method for solving linear differential equations with power series.

Other operations on power series follow from the rules for series. Within the common interval of convergence, power series can be added and multiplied by constants term by term ([[calculus-2/series#thm-linear]]); a power series in $x$ can be turned into one in $x^2$ or $-x$ or $2x$ by **substitution**, as in [[#ex-gaps]]; and two power series can be **multiplied** like polynomials, collecting powers:

$$
\left(\sum_{n=0}^\infty a_nx^n\right)\left(\sum_{n=0}^\infty b_nx^n\right) = \sum_{n=0}^\infty\left(\sum_{k=0}^n a_kb_{n-k}\right)x^n
$$ {#eq-cauchy-product}

for $\abs x$ less than both radii. This **Cauchy product** formula holds because both series converge absolutely there (a theorem of Cauchy and Mertens; see [[real-analysis/series]]). For example, squaring the geometric series gives $\frac{1}{(1-x)^2} = \sum_n (n+1)x^n$, in agreement with [[#ex-differentiate]].

::: example Expanding about a different centre {#ex-recentre}
Find the power series of $f(x) = \dfrac1x$ centred at $a = 2$, and its interval of convergence.
::: solution
Write $x = 2 + (x - 2)$ and factor out $2$ so as to reach the form $\frac{1}{1 - r}$:

$$
\frac1x = \frac{1}{2 + (x-2)} = \frac12\cdot\frac{1}{1 - \left(-\frac{x-2}{2}\right)} = \frac12\sum_{n=0}^\infty\left(-\frac{x-2}{2}\right)^n = \sum_{n=0}^\infty\frac{(-1)^n(x-2)^n}{2^{n+1}} .
$$

This is valid when $\abs{\frac{x-2}{2}} < 1$, that is $0 < x < 4$; at $x = 0$ and $x = 4$ the terms do not tend to $0$. So $R = 2$, which is exactly the distance from the centre $2$ to the point $0$ where $\frac1x$ blows up. The same function has a different series, with a different radius, about each centre $a \ne 0$, namely $R = \abs a$. As a check, [[#cor-coefficients]] predicts $c_n = f^{(n)}(2)/n!$, and indeed $f^{(n)}(x) = (-1)^n n!\,x^{-n-1}$ gives $c_n = (-1)^n/2^{n+1}$.
:::
:::

::: remark Why is the radius what it is?
The function $\frac{1}{1+x^2}$ is smooth on the whole real line, yet its series $\sum(-1)^nx^{2n}$ has radius $1$. The explanation lies in the complex plane: power series converge in *discs* $\abs{z - a} < R$, and $R$ is the distance from $a$ to the nearest point where the function misbehaves — here the complex zeros $\pm i$ of $1 + z^2$, at distance $1$ from $0$. See [[complex-analysis/analytic-functions]] and [[complex-analysis/laurent-series]].
:::

::: remark Abel's theorem
If a power series with radius $R$ converges at the endpoint $x = a + R$, then its sum is continuous there from the left: $\lim_{x\to (a+R)^-}\sum c_n(x - a)^n = \sum c_nR^n$. This theorem of Niels Henrik Abel (1826) gives another proof that $1 - \frac12 + \frac13 - \cdots = \ln 2$ and $1 - \frac13 + \frac15 - \cdots = \frac\pi4$; the proof uses uniform convergence ([[real-analysis/uniform-convergence]]).
:::

::: quiz
The series $\sum_{n\ge1}\frac{x^n}{n^2}$ has interval of convergence $[-1, 1]$. What is the interval of convergence of its derivative $\sum_{n\ge1}\frac{x^{n-1}}{n}$?
- [ ] $[-1, 1]$, since differentiation does not change the interval
- [x] $[-1, 1)$
- [ ] $(-1, 1)$
- [ ] It depends on the radius, which may change
::: solution
The radius stays $1$ ([[#thm-termwise]]), but the endpoints must be rechecked. At $x = 1$ the derivative series is the harmonic series (divergent); at $x = -1$ it is $\sum\frac{(-1)^{n-1}}{n}$ (convergent by the alternating series test). So the interval is $[-1, 1)$.
:::
:::

::: application Generating functions
A power series can store a whole sequence in a single function: the **generating function** of $(a_n)$ is $\sum a_nx^n$. For the Fibonacci numbers, $\sum F_nx^n = \frac{x}{1 - x - x^2}$ ([[#exr-fibonacci-gf]]), and expanding the right-hand side in partial fractions yields Binet's formula $F_n = (\varphi^n - (-1/\varphi)^n)/\sqrt5$. The radius of convergence encodes the growth rate: here $R = 1/\varphi$ because $F_n$ grows like $\varphi^n$. Generating functions are developed in [[discrete/generating-functions]] and, as probability generating functions, in [[probability/expectation]].
:::

::: history
Power series entered mathematics in a rush in the 1660s. Nicholas Mercator published the series for $\ln(1+x)$ in 1668, and Isaac Newton, who had found it independently together with the binomial series and the series for $\sin x$, set out his methods in *De analysi* (1669). James Gregory found the arctangent series in 1671, and Leibniz the series for $\frac\pi4$ in 1673–74; but the series for the sine, cosine and arctangent, and for $\frac\pi4$, had been found around 1400 by Madhava of Sangamagrama in Kerala, whose work survives through later Indian texts. John Machin used his formula to compute $\pi$ to $100$ decimal places in 1706. The theory of convergence came much later: in his *Cours d'analyse* (1821) Cauchy determined where a power series converges by means of the root test, and Niels Henrik Abel proved his lemma ([[#lem-abel]]) and his continuity theorem in a famous 1826 paper on the binomial series.
:::

## Where this leads

[[#cor-coefficients]] says that a function with a power series has coefficients $f^{(n)}(a)/n!$; in [[calculus-2/taylor-series]] we turn this around and ask which functions are equal to their Taylor series, with an estimate of the error. Power series solve differential equations in [[ode/series-solutions]], and in complex analysis ([[complex-analysis/analytic-functions]]) a function with a convergent power series around every point turns out to be the central object of the subject. The rigorous justification of term-by-term operations through uniform convergence is in [[real-analysis/uniform-convergence]].

::: summary
- A power series $\sum c_n(x - a)^n$ converges on an interval centred at $a$: it converges absolutely for $\abs{x - a} < R$ and diverges for $\abs{x - a} > R$, where $R \in [0, \infty]$ is the radius of convergence.
- $R = 1/L$ when $\abs{c_{n+1}/c_n} \to L$ or $\abs{c_n}^{1/n} \to L$; for series with gaps, apply the ratio test to the terms.
- The endpoints $x = a \pm R$ must always be tested separately.
- Inside the interval, power series can be differentiated and integrated term by term without changing the radius ([[#thm-termwise]]); the sum is infinitely differentiable and $c_n = f^{(n)}(a)/n!$.
- From the geometric series: $\ln(1 + x) = \sum\frac{(-1)^{n+1}x^n}{n}$ on $(-1, 1]$ and $\arctan x = \sum\frac{(-1)^nx^{2n+1}}{2n+1}$ on $[-1, 1]$, so $\ln 2$ and $\frac\pi4$ are alternating series.
- $e^x = \sum\frac{x^n}{n!}$ for all $x$, because the series solves $f' = f$, $f(0) = 1$.
- For computation, expand where the series converges fast (Machin's formula, $\ln\frac{1+x}{1-x}$ at $x = \frac13$).
:::

## Exercises

::: exercise A radius {level=1 check="5"}
Find the radius of convergence of $\displaystyle\sum_{n=1}^\infty\frac{x^n}{n\,5^n}$.
::: solution
$\abs{\dfrac{c_{n+1}}{c_n}} = \dfrac{n\,5^n}{(n+1)5^{n+1}} = \dfrac{n}{5(n+1)} \to \dfrac15$, so $R = 5$ by [[#thm-radius-formula]].
:::
:::

::: exercise An interval {level=1}
Find the interval of convergence of $\displaystyle\sum_{n=1}^\infty\frac{(x-1)^n}{n}$.
::: solution
The ratio of coefficients $\frac{n}{n+1} \to 1$, so $R = 1$ and the series converges absolutely for $0 < x < 2$. At $x = 2$ it is the harmonic series (diverges); at $x = 0$ it is $\sum\frac{(-1)^n}{n}$ (converges). The interval is $[0, 2)$.
:::
:::

::: exercise By substitution {level=1 check="1/2"}
Find a power series for $\dfrac{x}{1+4x^2}$ centred at $0$, and its radius of convergence. (Enter the radius.)
::: solution
Substituting $-4x^2$ into the geometric series, $\dfrac{1}{1+4x^2} = \sum_{n\ge0}(-4x^2)^n$ for $4x^2 < 1$. Multiplying by $x$,

$$
\frac{x}{1+4x^2} = \sum_{n=0}^\infty(-1)^n4^nx^{2n+1} = x - 4x^3 + 16x^5 - \cdots,
$$

valid exactly for $\abs x < \frac12$ (at $x = \pm\frac12$ the terms have absolute value $\frac12$ and do not tend to $0$). So $R = \frac12$.
:::
:::

::: exercise Endpoints that fail {level=2}
Find the interval of convergence of $\displaystyle\sum_{n=1}^\infty\frac{n(x+2)^n}{3^{n+1}}$.
::: solution
$\abs{c_{n+1}/c_n} = \dfrac{(n+1)3^{n+1}}{n\,3^{n+2}} \to \dfrac13$, so $R = 3$ and the series converges absolutely for $\abs{x + 2} < 3$, i.e. $-5 < x < 1$. At the endpoints $(x+2)^n = (\pm3)^n$ and the terms become $\frac{n(\pm1)^n}{3}$, which do not tend to $0$, so the series diverges there. The interval is $(-5, 1)$.
:::
:::

::: exercise Differentiating twice {level=2 check="6"}
Use [[#ex-differentiate]] to find $\displaystyle\sum_{n=1}^\infty\frac{n^2}{2^n}$.
::: hint
Differentiate $\sum nx^n = \frac{x}{(1-x)^2}$ and multiply by $x$.
:::
::: solution
Differentiating $\sum_{n\ge1}nx^n = \frac{x}{(1-x)^2}$ term by term for $\abs x < 1$,

$$
\sum_{n=1}^\infty n^2x^{n-1} = \frac{(1-x)^2 + 2x(1-x)}{(1-x)^4} = \frac{1+x}{(1-x)^3},
\qquad\text{so}\qquad \sum_{n=1}^\infty n^2x^n = \frac{x(1+x)}{(1-x)^3}.
$$

At $x = \frac12$: $\dfrac{\frac12\cdot\frac32}{\frac18} = 6$.
:::
:::

::: exercise A better series for ln 2 {level=2}
Derive $\ln\dfrac{1+x}{1-x} = 2\displaystyle\sum_{n=0}^\infty\frac{x^{2n+1}}{2n+1}$ for $\abs x < 1$, and show that with $x = \frac13$ the error after the terms up to $x^{2N+1}$ is less than $\dfrac{9}{8}\cdot\dfrac{2}{(2N+3)\,3^{2N+3}}$.
::: solution
Subtracting $\ln(1 - x) = -\sum_{n\ge1}\frac{x^n}{n}$ (the logarithm series with $-x$ in place of $x$) from $\ln(1+x) = \sum_{n\ge1}\frac{(-1)^{n+1}x^n}{n}$, the even powers cancel and the odd ones double: $\ln\frac{1+x}{1-x} = 2\left(x + \frac{x^3}{3} + \frac{x^5}{5} + \cdots\right)$ for $\abs x < 1$.

With $x = \frac13$ the tail after $x^{2N+1}$ is

$$
2\sum_{n = N+1}^\infty\frac{x^{2n+1}}{2n+1} \le \frac{2}{2N+3}\left(x^{2N+3} + x^{2N+5} + \cdots\right) = \frac{2}{2N+3}\cdot\frac{x^{2N+3}}{1 - x^2} = \frac98\cdot\frac{2}{(2N+3)3^{2N+3}},
$$

using $1 - x^2 = \frac89$. For $N = 2$ (three terms) the bound is $\frac98\cdot\frac{2}{7\cdot 2187} = 1.47\times10^{-4}$, consistent with the actual error $1.43\times10^{-4}$.
:::
:::

::: exercise A sum involving π {level=2 check="pi/(2*sqrt(3))"}
Find $\displaystyle\sum_{n=0}^\infty\frac{(-1)^n}{(2n+1)\,3^n}$.
::: hint
Compare with the arctangent series at $x = \frac{1}{\sqrt3}$.
:::
::: solution
At $x = \frac1{\sqrt3}$, $x^{2n+1} = \frac{1}{\sqrt3}\cdot\frac{1}{3^n}$, so

$$
\arctan\frac{1}{\sqrt3} = \frac{1}{\sqrt3}\sum_{n=0}^\infty\frac{(-1)^n}{(2n+1)3^n}.
$$

Since $\arctan\frac1{\sqrt3} = \frac\pi6$, the sum is $\sqrt3\cdot\frac\pi6 = \frac{\pi}{2\sqrt3} \approx 0.9069$.
:::
:::

::: exercise Sine and cosine from a differential equation {level=3 #exr-sin-cos}
Let $C(x) = \displaystyle\sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}$ and $S(x) = \displaystyle\sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n+1)!}$. Show that both converge for all $x$, that $C' = -S$ and $S' = C$, and deduce that $C(x) = \cos x$ and $S(x) = \sin x$.
::: hint
Consider $h(x) = \bigl(C(x) - \cos x\bigr)^2 + \bigl(S(x) - \sin x\bigr)^2$.
:::
::: solution
For any fixed $x$, the ratio of consecutive terms of $C$ is $\frac{x^2}{(2n+2)(2n+1)} \to 0$ in absolute value, and similarly for $S$, so both converge for every $x$ (radius $\infty$). Differentiating term by term ([[#thm-termwise]]),

$$
C'(x) = \sum_{n\ge1}\frac{(-1)^n\,2n\,x^{2n-1}}{(2n)!} = \sum_{n\ge1}\frac{(-1)^nx^{2n-1}}{(2n-1)!} = -\sum_{m\ge0}\frac{(-1)^mx^{2m+1}}{(2m+1)!} = -S(x)
$$

(with $m = n - 1$), and similarly $S'(x) = \sum_{n\ge0}\frac{(-1)^nx^{2n}}{(2n)!} = C(x)$. Let $u = C - \cos$ and $v = S - \sin$. Since $\cos' = -\sin$ and $\sin' = \cos$, we get $u' = -v$ and $v' = u$, so $h = u^2 + v^2$ has $h' = 2uu' + 2vv' = -2uv + 2vu = 0$. Thus $h$ is constant, and $h(0) = (1 - 1)^2 + (0 - 0)^2 = 0$. So $u = v = 0$ everywhere: $C = \cos$ and $S = \sin$.
:::
:::

::: exercise The exponential law {level=3}
Using the Cauchy product [[#eq-cauchy-product]] (with absolutely convergent series of numbers) and the binomial theorem, prove directly from the series that $E(x) = \sum_{n\ge0}\frac{x^n}{n!}$ satisfies $E(x)E(y) = E(x+y)$ for all real $x, y$.
::: solution
Both series converge absolutely for all $x$ and $y$. The Cauchy product of $\sum\frac{x^n}{n!}$ and $\sum\frac{y^n}{n!}$ has $n$th term

$$
\sum_{k=0}^n\frac{x^k}{k!}\cdot\frac{y^{n-k}}{(n-k)!} = \frac{1}{n!}\sum_{k=0}^n\binom nk x^ky^{n-k} = \frac{(x+y)^n}{n!}
$$

by the binomial theorem. Hence $E(x)E(y) = \sum_n\frac{(x+y)^n}{n!} = E(x+y)$. This is the law $e^xe^y = e^{x+y}$, derived purely from the series.
:::
:::

::: exercise The Fibonacci generating function {level=3 #exr-fibonacci-gf check="(sqrt(5)-1)/2"}
Let $F_1 = F_2 = 1$ and $F_{n+2} = F_{n+1} + F_n$. Find the radius of convergence $R$ of $G(x) = \sum_{n\ge1}F_nx^n$ and prove that $G(x) = \dfrac{x}{1 - x - x^2}$ for $\abs x < R$.
::: hint
You may use $F_{n+1}/F_n \to \varphi = \frac{1+\sqrt5}{2}$ (proved in the exercises of [[calculus-2/sequences]]). For the formula, multiply $G(x)$ by $1 - x - x^2$ and collect powers.
:::
::: solution
Since $F_{n+1}/F_n \to \varphi$, [[#thm-radius-formula]] gives $R = 1/\varphi = \frac{2}{1+\sqrt5} = \frac{\sqrt5 - 1}{2} \approx 0.618$. For $\abs x < R$ the series $G(x)$, $xG(x)$ and $x^2G(x)$ converge, and combining them term by term,

$$
(1 - x - x^2)G(x) = F_1x + (F_2 - F_1)x^2 + \sum_{n\ge3}(F_n - F_{n-1} - F_{n-2})x^n = x,
$$

because $F_2 - F_1 = 0$ and every bracket in the sum vanishes by the recursion. For $\abs x < R$ the factor $1 - x - x^2$ is non-zero (its roots are $\frac{-1\pm\sqrt5}{2}$, of absolute value $\ge \frac{\sqrt5-1}{2}$), so $G(x) = \frac{x}{1-x-x^2}$.
:::
:::
