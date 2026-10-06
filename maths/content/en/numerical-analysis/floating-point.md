Type `0.1 + 0.2 == 0.3` into Python and the answer is `False`: the computer reports `0.1 + 0.2` as `0.30000000000000004`. Add `0.1` to itself ten times and you get `0.9999999999999999`. These are not bugs. A computer stores real numbers with a fixed number of binary digits, so almost every number it handles — including $0.1$ — is slightly wrong, and almost every arithmetic operation adds another tiny error.

Usually these errors are around $10^{-16}$ and do not matter. Sometimes they matter enormously. In 1991 a Patriot missile battery in Dhahran failed to intercept an incoming Scud missile, and 28 soldiers were killed, because the system counted time in tenths of a second and $0.1$ has no exact binary representation: after about $100$ hours of operation the accumulated error in the clock was about a third of a second, enough for the radar to look in the wrong place. Numerical analysis begins with understanding these errors well enough to predict when they are harmless and when they are fatal.

This chapter explains how real numbers are represented in floating-point arithmetic, proves the basic bound on rounding errors, and introduces the two ideas that organise the rest of the course: the **conditioning** of a problem (how sensitive its answer is to small changes in the data) and the **stability** of an algorithm (whether it introduces more error than the problem deserves).

## Floating-point numbers

Scientific notation writes $6.022\times10^{23}$ or $-1.6\times10^{-19}$: a fixed number of significant digits times a power of the base. A floating-point system does the same with a fixed precision.

::: definition Floating-point system {#def-float}
A **floating-point system** with base $\beta \ge 2$, precision $p \ge 1$ and exponent range $e_{\min} \le e \le e_{\max}$ consists of $0$ and the numbers

$$
x = \pm\,(d_0.d_1d_2\ldots d_{p-1})_\beta\times\beta^{e} = \pm\left(d_0 + \frac{d_1}{\beta} + \cdots + \frac{d_{p-1}}{\beta^{p-1}}\right)\beta^e ,
$$

with digits $d_i \in \set{0, 1, \dots, \beta - 1}$, $d_0 \ne 0$ (the number is **normalised**) and $e_{\min} \le e \le e_{\max}$. The number $m = (d_0.d_1\ldots d_{p-1})_\beta$, which satisfies $1 \le m < \beta$, is the **significand** and $e$ is the **exponent**.
:::

Almost all computers use the binary formats of the IEEE 754 standard. In base $2$ the leading digit of a normalised number is always $1$, so it need not be stored.

| format | bits | precision $p$ | exponent range | unit roundoff $u = 2^{-p}$ | largest number |
|---|---|---|---|---|---|
| single | $32$ | $24$ | $-126 \le e \le 127$ | $5.96\times10^{-8}$ | $3.40\times10^{38}$ |
| double | $64$ | $53$ | $-1022 \le e \le 1023$ | $1.11\times10^{-16}$ | $1.80\times10^{308}$ |

Double precision, the default in Python, MATLAB, Julia and most scientific software, therefore carries about $16$ significant decimal digits. The standard also defines **subnormal** numbers (with $d_0 = 0$ at the smallest exponent) that fill the gap between $0$ and the smallest normalised number $2^{-1022} \approx 2.2\times10^{-308}$, the special values $\pm\infty$, and `NaN` ("not a number", the result of $0/0$ or $\sqrt{-1}$).

::: example A toy floating-point system {#ex-toy}
List the positive numbers of the binary system with $p = 3$, $e_{\min} = -1$ and $e_{\max} = 2$.
::: solution
The significands are $(1.00)_2 = 1$, $(1.01)_2 = 1.25$, $(1.10)_2 = 1.5$ and $(1.11)_2 = 1.75$. Multiplying by $2^e$ for $e = -1, 0, 1, 2$:

| exponent | numbers | spacing |
|---|---|---|
| $e = -1$ | $0.5,\ 0.625,\ 0.75,\ 0.875$ | $0.125$ |
| $e = 0$ | $1,\ 1.25,\ 1.5,\ 1.75$ | $0.25$ |
| $e = 1$ | $2,\ 2.5,\ 3,\ 3.5$ | $0.5$ |
| $e = 2$ | $4,\ 5,\ 6,\ 7$ | $1$ |

There are only $16$ positive numbers. They are not evenly spaced: the gap doubles at each power of $2$, but the *relative* gap (gap divided by size) stays between $\frac18$ and $\frac14$. Numbers from $7.5$ upwards overflow (those between $7$ and $7.5$ still round to $7$), and positive numbers below $0.5$ underflow (to subnormals or $0$).
:::
:::

::: widget floatline
p: 3
emin: -1
emax: 2
value: 2.3
caption: The toy system of [[#ex-toy]] on a number line. The value $2.3$ lies between the neighbours $2$ and $2.5$ and rounds to $2.5$, a relative error of $0.087 < u = 2^{-3}$. Move the value and change the precision $p$: each extra bit halves every gap, and from the smallest normal number $2^{e_{\min}}$ up to the overflow threshold the *relative* rounding error never exceeds $u = 2^{-p}$ (below $2^{e_{\min}}$ the read-out reports underflow).
:::

The pattern in [[#ex-toy]] holds in general. Between $\beta^e$ and $\beta^{e+1}$ the floating-point numbers are equally spaced with gap $\beta^{e - p + 1}$. In particular the gap between $1$ and the next larger floating-point number is

$$
\eps_M = \beta^{1-p} ,
$$

the **machine epsilon**: $2^{-52} \approx 2.22\times10^{-16}$ in double precision. Half of it is the **unit roundoff** $u = \frac12\beta^{1-p}$, which is $2^{-53} \approx 1.11\times10^{-16}$ for doubles.

A number such as $0.1$ has an infinite binary expansion, $0.1 = (0.000110011001100\ldots)_2$, so it is not a floating-point number. The double nearest to it is

$$
\operatorname{fl}(0.1) = 0.1000000000000000055511151231257827021181583404541015625 ,
$$

which explains the surprises of the introduction: the errors in $\operatorname{fl}(0.1)$, $\operatorname{fl}(0.2)$ and $\operatorname{fl}(0.3)$ do not cancel exactly.

## Rounding and the standard model

::: definition Rounding {#def-rounding}
For a real number $x$ within the range of the floating-point system, $\operatorname{fl}(x)$ denotes the floating-point number nearest to $x$ (**round to nearest**; if there are two, IEEE arithmetic chooses the one whose last digit is even). The **absolute error** of an approximation $\hat x$ to $x$ is $\abs{\hat x - x}$, and for $x \ne 0$ its **relative error** is $\abs{\hat x - x}/\abs x$.
:::

::: theorem Relative rounding error {#thm-rounding}
If $x$ lies in the range of a floating-point system with unit roundoff $u = \frac12\beta^{1-p}$ (that is, $\beta^{e_{\min}} \le \abs x \le$ the largest floating-point number), then

$$
\operatorname{fl}(x) = x(1 + \delta) \qquad\text{for some } \abs\delta \le u .
$$ {#eq-fl}
:::

::: proof
By symmetry we may assume $x > 0$. Choose the exponent $e$ with $\beta^e \le x < \beta^{e+1}$. In this range the floating-point numbers are $m\beta^e$ with $m = (d_0.d_1\ldots d_{p-1})_\beta$, so consecutive numbers differ by $\beta^{e - p + 1}$, and $x$ lies between two of them (counting $\beta^{e+1}$ itself, which is also a floating-point number unless $x$ is near the overflow threshold, where the largest number serves). The nearest one is at distance at most half the gap:

$$
\abs{\operatorname{fl}(x) - x} \le \tfrac12\beta^{e - p + 1}.
$$

Dividing by $x \ge \beta^e$ gives $\dfrac{\abs{\operatorname{fl}(x) - x}}{x} \le \tfrac12\beta^{1-p} = u$. Setting $\delta = \frac{\operatorname{fl}(x) - x}{x}$ gives [[#eq-fl]].
:::

The theorem says that *relative* errors, not absolute errors, are uniformly small in floating-point arithmetic. The IEEE standard goes further and requires that the basic operations be **correctly rounded**: the computed result of $x + y$, $x - y$, $x\times y$, $x/y$ or $\sqrt x$ is the exact result rounded to the nearest floating-point number. Combined with [[#thm-rounding]] this gives the model on which all rounding error analysis is built.

::: axiom The standard model of floating-point arithmetic {#ax-standard-model}
For floating-point numbers $x$ and $y$ and $\circ \in \set{+, -, \times, /}$, if no overflow or underflow occurs,

$$
\operatorname{fl}(x \circ y) = (x\circ y)(1 + \delta), \qquad \abs\delta \le u ,
$$ {#eq-standard-model}

and similarly $\operatorname{fl}(\sqrt x) = \sqrt x\,(1 + \delta)$ with $\abs\delta \le u$.
:::

Each *single* operation is therefore almost perfect. The trouble comes from long chains of operations, and from operations that magnify errors already present.

::: warning Floating-point arithmetic is not real arithmetic
Many laws of algebra fail. Addition is not associative: in double precision $(1 + 10^{16}) - 10^{16} = 0$, because $1 + 10^{16}$ rounds to $10^{16}$ (the gap between doubles near $10^{16}$ is $2$), while $1 + (10^{16} - 10^{16}) = 1$. Equality tests between computed numbers are fragile: test $\abs{a - b} \le \text{tol}\cdot\abs b$ instead of `a == b`. And $\eps_M$ is *not* the smallest positive number — that is about $5\times10^{-324}$ (a subnormal); $\eps_M$ is the relative spacing of the numbers near $1$.
:::

::: quiz
In double precision, which statement about the machine epsilon $\eps_M = 2^{-52} \approx 2.2\times10^{-16}$ is correct?
- [ ] It is the smallest positive floating-point number.
- [x] It is the distance from $1$ to the next larger floating-point number.
- [ ] Every computed result has absolute error at most $\eps_M$.
- [ ] Numbers smaller than $\eps_M$ are rounded to $0$.
::: solution
$\eps_M$ is the gap just above $1$. Near $x$ the gap is roughly $\eps_M\abs x$, so absolute errors scale with the size of the numbers: near $10^{16}$ the gap is $2$, near $10^{-16}$ it is about $10^{-32}$. Numbers far smaller than $\eps_M$, down to about $10^{-308}$ (or $5\times10^{-324}$ with subnormals), are represented perfectly well.
:::
:::

## Cancellation

Subtracting two nearly equal numbers is the most common way in which small errors become large ones.

::: theorem Error amplification in subtraction {#thm-cancellation}
Let $\hat x = x(1 + \delta_1)$ and $\hat y = y(1 + \delta_2)$ with $\abs{\delta_1}, \abs{\delta_2} \le \delta$, and $x \ne y$. Then

$$
\frac{\abs{(\hat x - \hat y) - (x - y)}}{\abs{x - y}} \le \frac{\abs x + \abs y}{\abs{x - y}}\,\delta .
$$ {#eq-cancellation}
:::

::: proof
$(\hat x - \hat y) - (x - y) = x\delta_1 - y\delta_2$, whose absolute value is at most $\abs x\abs{\delta_1} + \abs y\abs{\delta_2} \le (\abs x + \abs y)\delta$. Divide by $\abs{x - y}$.
:::

When $x \approx y$, the factor $\frac{\abs x + \abs y}{\abs{x-y}}$ is huge: the leading digits cancel, and what remains is dominated by the errors in the trailing digits. This is **catastrophic cancellation**. Note that the subtraction itself is harmless — it is usually even exact ([[#exr-sterbenz]]); it merely *reveals* the errors committed earlier.

::: example Cancellation in a simple formula {#ex-cos}
Evaluate $f(x) = \dfrac{1 - \cos x}{x^2}$ for small $x$ in double precision. The true values tend to $\frac12$.
::: solution
Computed values of the formula as written, and of the equivalent formula $g(x) = \dfrac{2\sin^2(x/2)}{x^2}$ (using $1 - \cos x = 2\sin^2\frac x2$):

| $x$ | $10^{-2}$ | $10^{-4}$ | $10^{-5}$ | $10^{-6}$ | $10^{-7}$ | $10^{-8}$ |
|---|---|---|---|---|---|---|
| $f(x)$ as written | $0.499\,995\,833\,347$ | $0.499\,999\,996\,96$ | $0.500\,000\,041$ | $0.500\,044$ | $0.499\,600$ | $0$ |
| $g(x)$ | $0.499\,995\,833\,347$ | $0.499\,999\,999\,58$ | $0.499\,999\,999\,996$ | $0.500\,000\,000\,000$ | $0.500\,000\,000\,000$ | $0.5$ |

For $x = 10^{-8}$, $\cos x = 1 - 5\times10^{-17}$ rounds to exactly $1$, the numerator becomes $0$, and *all* digits are lost. For $x = 10^{-6}$, $\operatorname{fl}(\cos x)$ carries an absolute error up to about $10^{-16}$, while $1 - \cos x \approx 5\times10^{-13}$: by [[#eq-cancellation]] the relative error can reach $\frac{2}{5\times10^{-13}}\times 10^{-16} \approx 4\times10^{-4}$, and indeed only four digits are right. The rewritten formula involves no subtraction of nearly equal quantities and is accurate to full precision for every $x$.
:::
:::

::: example The quadratic formula {#ex-quadratic}
Find the roots of $x^2 - 10^8x + 1 = 0$ in double precision.
::: solution
The roots are $x_{1,2} = \frac{10^8 \pm\sqrt{10^{16} - 4}}{2}$, approximately $10^8$ and $10^{-8}$. Computing $x_1$ with the plus sign is fine. But the small root $x_2 = \frac{10^8 - \sqrt{10^{16} - 4}}{2}$ subtracts two numbers that agree in about $16$ digits, and the computer returns $7.450\,580\,596\,923\,828\times10^{-9}$ — wrong in the first digit (the true value is $1.000\ldots\times10^{-8}$).

The cure is to avoid the subtraction. Since $x_1x_2 = c/a = 1$ (Vieta's formula), compute $x_2 = \frac{c}{a x_1}$, or equivalently $x_2 = \frac{2c}{-b + \sqrt{b^2 - 4ac}}$, which adds two positive numbers. This gives $1.000\,000\,000\,000\,000\times10^{-8}$, correct to all digits shown. A robust quadratic solver computes the larger root with the sign that avoids cancellation and the other from the product of the roots.
:::
:::

```python
import math

def quadratic_roots(a, b, c):
    """Real roots of a x^2 + b x + c = 0 (assumes b*b >= 4ac), avoiding cancellation."""
    d = math.sqrt(b*b - 4*a*c)
    q = -0.5 * (b + math.copysign(d, b))   # b and copysign(d, b) have the same sign
    return q / a, c / q
```

::: widget plot
f: x^7 - 7x^6 + 21x^5 - 35x^4 + 35x^3 - 21x^2 + 7x - 1; (x - 1)^7
x: 0.99, 1.01
y: -3e-14, 3e-14
labels: \text{expanded}; (x-1)^7
caption: The same polynomial evaluated two ways near $x = 1$. The factored form $(x-1)^7$ is a smooth curve of size at most $10^{-14}$; the expanded form adds and subtracts terms of size up to $35$ whose sum is tiny, and each carries a rounding error near $35u \approx 4\times10^{-15}$. The result is pure noise. Zoom out to $[0.98, 1.02]$ in your mind: the signal grows like $(x-1)^7$ while the noise stays near $10^{-14}$.
:::

## Truncation error versus rounding error

Most numerical methods replace a limit by a finite computation and so make a **truncation error** even in exact arithmetic. In floating point, rounding errors add to it, and the two kinds of error often pull in opposite directions. The derivative is the classic example.

::: theorem Error of the forward difference {#thm-forward-difference}
Let $f$ be twice continuously differentiable near $x$ with $\abs{f''} \le M$ there, and suppose the computed values satisfy $\hat f(t) = f(t)(1 + \delta_t)$ with $\abs{\delta_t} \le u$, where $\abs{f} \le F$ near $x$. Then, ignoring the (much smaller) errors of the subtraction and division themselves,

$$
\abs{\frac{\hat f(x + h) - \hat f(x)}{h} - f'(x)} \le \frac{Mh}{2} + \frac{2uF}{h} .
$$ {#eq-fd-error}

The right-hand side is smallest for $h_* = 2\sqrt{uF/M}$, where it equals $2\sqrt{uFM}$.
:::

::: proof
By Taylor's theorem ([[calculus-2/taylor-series#thm-taylor]]), $f(x + h) = f(x) + hf'(x) + \frac{h^2}{2}f''(\xi)$ for some $\xi$ between $x$ and $x + h$, so the exact difference quotient satisfies

$$
\abs{\frac{f(x+h) - f(x)}{h} - f'(x)} = \frac h2\abs{f''(\xi)} \le \frac{Mh}{2}.
$$

The rounding errors change the numerator by $f(x+h)\delta_{x+h} - f(x)\delta_x$, of absolute value at most $2uF$, and hence the quotient by at most $\frac{2uF}{h}$. The triangle inequality gives [[#eq-fd-error]]. Finally $\phi(h) = \frac{Mh}{2} + \frac{2uF}{h}$ has $\phi'(h) = \frac M2 - \frac{2uF}{h^2}$, which vanishes at $h_* = 2\sqrt{uF/M}$, where $\phi(h_*) = \sqrt{uFM} + \sqrt{uFM}$.
:::

For $f = \exp$ at $x = 1$ we have $M \approx F \approx e$, so $h_* \approx 2\sqrt u \approx 2\times10^{-8}$ and the best attainable error is about $2e\sqrt u \approx 6\times10^{-8}$ — only half of the sixteen available digits. Actual computed errors:

| $h$ | $10^{-1}$ | $10^{-2}$ | $10^{-4}$ | $10^{-6}$ | $10^{-8}$ | $10^{-10}$ | $10^{-12}$ | $10^{-14}$ | $10^{-16}$ |
|---|---|---|---|---|---|---|---|---|---|
| error | $1.4\times10^{-1}$ | $1.4\times10^{-2}$ | $1.4\times10^{-4}$ | $1.4\times10^{-6}$ | $6.6\times10^{-9}$ | $1.5\times10^{-6}$ | $4.3\times10^{-4}$ | $9.3\times10^{-3}$ | $2.7$ |

For large $h$ the error is $\approx\frac{e}{2}h$, the truncation error; for small $h$ it grows like $\frac1h$ because of rounding; at $h = 10^{-16}$ the computer finds $1 + h = 1$ and returns the derivative $0$. (The error at $h = 10^{-8}$ is luckily smaller than the bound.)

::: widget sequence
a: -log10(abs((exp(1 + 10^(-n)) - exp(1))*10^n - e))
N: 16
start: 1
caption: The number of correct digits, $-\log_{10}\lvert\text{error}\rvert$, in the forward-difference estimate of $\frac{d}{dx}e^x$ at $x = 1$ with $h = 10^{-n}$. Accuracy improves by one digit per step while truncation error dominates, peaks at about $8$ digits near $h = 10^{-8}$, and then falls as rounding error takes over. At $n = 16$ the difference quotient is $0$.
:::

## Conditioning

Some problems are sensitive to their data no matter how cleverly we compute. If the input $x$ is known only to relative accuracy $\delta$ (because it was measured, or merely stored in floating point), how accurate can $f(x)$ be?

::: definition Condition number {#def-condition}
Let $f$ be differentiable at $x$, with $x \ne 0$ and $f(x) \ne 0$. The **relative condition number** of $f$ at $x$ is

$$
\kappa_f(x) = \abs{\frac{x\,f'(x)}{f(x)}} .
$$

A problem is **well-conditioned** at $x$ if $\kappa_f(x)$ is of moderate size and **ill-conditioned** if it is large.
:::

::: theorem Conditioning governs error propagation {#thm-conditioning}
Let $f$ be twice continuously differentiable near $x$, with $x \ne 0$ and $f(x) \ne 0$. If $\hat x = x(1 + \delta)$, then

$$
\frac{f(\hat x) - f(x)}{f(x)} = \frac{x f'(x)}{f(x)}\,\delta + O(\delta^2) , \qquad\text{so}\qquad \frac{\abs{f(\hat x) - f(x)}}{\abs{f(x)}} \le \kappa_f(x)\abs\delta + O(\delta^2).
$$
:::

::: proof
By Taylor's theorem, $f(\hat x) = f(x + x\delta) = f(x) + f'(x)\,x\delta + \frac12f''(\xi)\,x^2\delta^2$ with $\xi$ between $x$ and $\hat x$. Divide by $f(x)$; since $f''$ is bounded near $x$, the last term is $O(\delta^2)$.
:::

So the condition number is the factor by which relative errors in the data are amplified, to first order. Since data in double precision already carry relative errors of size $u \approx 10^{-16}$, a condition number of $10^k$ means that we can expect to lose about $k$ digits, *whatever algorithm we use*.

::: example Condition numbers {#ex-condition}
Compute the condition numbers of (a) $f(x) = \sqrt x$, (b) $f(x) = x - 1$, (c) $f(x) = \ln x$, (d) $f(x) = e^x$.
::: solution
(a) $\kappa = \abs{\frac{x\cdot\frac{1}{2\sqrt x}}{\sqrt x}} = \frac12$: the square root halves relative errors, perfectly conditioned.

(b) $\kappa = \abs{\frac{x}{x - 1}}$, which is huge near $x = 1$: subtraction of nearly equal numbers is ill-conditioned, in agreement with [[#thm-cancellation]]. At $x = 1.000\,001$, $\kappa \approx 10^6$.

(c) $\kappa = \abs{\frac{x\cdot\frac1x}{\ln x}} = \frac{1}{\abs{\ln x}}$, large near $x = 1$, where $\ln x$ is near $0$. (This is why libraries provide `log1p(t)` $= \ln(1 + t)$, which takes the small quantity $t$ itself as input.)

(d) $\kappa = \abs x$: the exponential is well-conditioned for moderate $x$, but at $x = 700$ a relative error of $10^{-16}$ in $x$ becomes about $7\times10^{-14}$ in $e^x$.
:::
:::

::: quiz
The relative condition number of $f(x) = \tan x$ is $\kappa(x) = \abs{\frac{x}{\sin x\cos x}}$. Where is evaluating $\tan x$ ill-conditioned?
- [ ] Near $x = 0$
- [x] Near $x = \frac\pi2$
- [ ] Near $x = \frac\pi4$
- [ ] Nowhere; $\tan$ is a standard function
::: solution
As $x\to0$, $\kappa \to 1$ (since $\frac{x}{\sin x}\to1$ and $\cos x \to 1$), so small $x$ is fine. Near $\frac\pi2$, $\cos x \to 0$ and $\kappa \to\infty$: a tiny relative change in $x$ changes $\tan x$ enormously, because the graph is nearly vertical. At $\frac\pi4$, $\kappa = \frac{\pi/4}{1/2} \approx 1.57$.
:::
:::

## Stability of algorithms

Conditioning is a property of the *problem*; stability is a property of the *algorithm* we use to solve it. The quadratic formula of [[#ex-quadratic]] and the formula for $f(x)$ in [[#ex-cos]] are unstable ways of solving well-conditioned problems.

::: definition Forward and backward error; stability {#def-stability}
Suppose an algorithm computes $\hat y$ as an approximation to $y = f(x)$. The **forward error** is $\abs{\hat y - y}$ (or its relative version). The **backward error** is the smallest $\abs{\Delta x}/\abs x$ such that $\hat y = f(x + \Delta x)$: the relative change in the data for which the computed answer is exactly right. An algorithm is **backward stable** if its backward error is always of order $u$.
:::

Backward stability is the best one can ask of an algorithm: it says the computed answer is the exact answer to a slightly perturbed problem, which is all we could hope for given that the data are themselves rounded. By [[#thm-conditioning]],

$$
\text{relative forward error} \lesssim \kappa_f(x)\times\text{backward error} ,
$$

so a backward stable algorithm applied to a well-conditioned problem gives an accurate answer, while an ill-conditioned problem may give an inaccurate answer even with a perfect algorithm.

::: quiz
A backward stable algorithm (backward error about $10^{-16}$) is applied to a problem with condition number $\kappa = 10^{10}$. What relative forward error should you expect?
- [ ] About $10^{-16}$, because the algorithm is stable
- [x] Up to about $10^{-6}$
- [ ] About $10^{-26}$
- [ ] Nothing can be said
::: solution
Forward error $\lesssim \kappa\times$ backward error $= 10^{10}\times10^{-16} = 10^{-6}$: about six correct digits remain. Stability guarantees that the algorithm adds no error beyond what the data's own rounding already implies; it cannot remove the sensitivity of the problem.
:::
:::

### Summation

Summation is the simplest algorithm with a non-trivial error analysis. We need a lemma about accumulated factors $1 + \delta$.

::: lemma Products of rounding factors {#lem-gamma}
If $\abs{\delta_i} \le u$ for $i = 1, \dots, n$ and $nu < 1$, then

$$
\prod_{i=1}^n(1 + \delta_i) = 1 + \theta_n, \qquad \abs{\theta_n} \le \gamma_n := \frac{nu}{1 - nu} .
$$
:::

::: proof
Expanding the product, $\abs{\prod(1 + \delta_i) - 1} \le \prod(1 + \abs{\delta_i}) - 1 \le (1 + u)^n - 1$ (each term of the expansion of the left side is bounded by the corresponding term on the right). Since $1 + u \le e^u$ and $e^{t} \le \frac{1}{1 - t}$ for $0 \le t < 1$ (equivalent to $1 - t \le e^{-t}$), we get $(1 + u)^n \le e^{nu} \le \frac{1}{1 - nu}$, so $\abs{\theta_n} \le \frac{1}{1 - nu} - 1 = \gamma_n$.
:::

For example, with $n = 10^6$ and $u = 2^{-53}$, $\gamma_n \approx 1.1\times10^{-10}$; to first order $\gamma_n \approx nu$.

::: theorem Error of recursive summation {#thm-summation}
Let $\hat s$ be the floating-point sum of $x_1, \dots, x_n$ computed as $((x_1 + x_2) + x_3) + \cdots + x_n$, and suppose $(n - 1)u < 1$. Then

$$
\hat s = \sum_{i=1}^n x_i(1 + \theta^{(i)}), \quad \abs{\theta^{(i)}} \le \gamma_{n-1}, \qquad\text{hence}\qquad \abs{\hat s - s} \le \gamma_{n-1}\sum_{i=1}^n\abs{x_i} .
$$
:::

::: proof
Let $\hat s_1 = x_1$ and $\hat s_k = \operatorname{fl}(\hat s_{k-1} + x_k) = (\hat s_{k-1} + x_k)(1 + \delta_k)$ with $\abs{\delta_k} \le u$ by [[#eq-standard-model]]. Unwinding the recursion,

$$
\hat s_n = x_1\prod_{k=2}^n(1 + \delta_k) + x_2\prod_{k=2}^{n}(1 + \delta_k) + x_3\prod_{k=3}^n(1 + \delta_k) + \cdots + x_n(1 + \delta_n).
$$

Each $x_i$ is multiplied by at most $n - 1$ factors $1 + \delta_k$, so by [[#lem-gamma]] its factor is $1 + \theta^{(i)}$ with $\abs{\theta^{(i)}} \le \gamma_{n-1}$ (a product of fewer factors satisfies an even smaller bound). Subtracting $s = \sum x_i$ and using the triangle inequality gives the bound on $\abs{\hat s - s}$.
:::

The first statement says that recursive summation is backward stable: the computed sum is the exact sum of slightly perturbed terms. The forward error bound shows when it is accurate: if all $x_i$ have the same sign then $\sum\abs{x_i} = \abs s$ and the relative error is at most $\gamma_{n-1} \approx nu$; with cancellation, $\sum\abs{x_i}$ can be much larger than $\abs s$. The proof also shows that early terms suffer the most rounding, which suggests adding small terms first. Summing $\sum_{k=1}^{10^6}\frac1{k^2}$ in *single* precision gives $1.644\,725\,3$ from $k = 1$ upwards and $1.644\,933\,0$ from $k = 10^6$ downwards; the true value is $1.644\,933\,07$. Going forwards, once the sum is near $1.64$ every term below $2^{-24} \approx 6\times10^{-8}$ (half the gap between single-precision numbers there), that is every term from $k = 4097$ on, is simply rounded away.

A clever algorithm due to Kahan carries along the rounding error of each addition and feeds it back in.

```python
def kahan_sum(xs):
    """Compensated summation: error bound about 2u * sum|x_i|, independent of n."""
    s = 0.0          # running sum
    c = 0.0          # running compensation for lost low-order bits
    for x in xs:
        y = x - c    # correct the next term by the error of the previous step
        t = s + y    # big + small: low-order digits of y are lost ...
        c = (t - s) - y   # ... and recovered here (algebraically c = 0)
        s = t
    return s
```

Adding $0.1$ ten million times with a plain loop gives $999\,999.999\,838\,975\,4$; `kahan_sum` gives $1\,000\,000.0$, as does Python's exactly rounded `math.fsum`.

### An unstable recurrence

::: example A recurrence that explodes {#ex-recurrence}
The integrals $I_n = \int_0^1 x^ne^{x-1}\,dx$ satisfy $I_0 = 1 - e^{-1}$ and, by integration by parts, $I_n = 1 - nI_{n-1}$. Compute $I_{20}$.
::: solution
Since $0 < x^ne^{x-1} \le x^n$ on $(0, 1]$, the true values satisfy $0 < I_n < \frac{1}{n+1}$; they decrease slowly to $0$. Running the recurrence forwards in double precision gives:

| $n$ | $5$ | $10$ | $15$ | $17$ | $18$ | $20$ | $25$ |
|---|---|---|---|---|---|---|---|
| forward recurrence | $0.145\,533$ | $0.083\,877\,070\,06$ | $0.059\,034$ | $0.057\,19$ | $-0.029\,45$ | $-30.19$ | $1.93\times10^{8}$ |
| true value | $0.145\,533$ | $0.083\,877\,070\,10$ | $0.059\,018$ | $0.052\,77$ | $0.050\,12$ | $0.045\,54$ | $0.037\,09$ |

The negative value at $n = 18$ is impossible. The cause: $I_0$ is stored with an error $\eps_0$ of about $10^{-17}$, and each step multiplies the current error by $-n$, so the error in $I_n$ is $(-1)^n n!\,\eps_0$; $20! \approx 2.4\times10^{18}$. The *problem* is fine; the *algorithm* amplifies errors by $n!$.

Running the recurrence **backwards**, $I_{n-1} = \frac{1 - I_n}{n}$, divides the error by $n$ at each step. Starting from the crude guess $I_{40} = 0$ (error less than $\frac{1}{41}$) and recurring down, the error is divided by $40\cdot39\cdots21 \approx 3.4\times10^{29}$ by the time we reach $n = 20$, and the backward recurrence gives $I_{20} = 0.045\,544\,884\,075\,818\,05$, correct to all sixteen significant digits.
:::
:::

::: warning A stable algorithm cannot rescue an ill-conditioned problem
Stability and conditioning are independent. Rewriting $1 - \cos x$ as $2\sin^2\frac x2$ helped because the *problem* "compute $1 - \cos x$ from $x$" is well-conditioned; only the algorithm was poor. But if the input is $c = \cos x$ itself, rounded to double precision, then computing $1 - c$ is ill-conditioned for $c \approx 1$ and no rearrangement can recover the lost digits. Before blaming an algorithm, compute the condition number of the problem.
:::

::: application Why floating point beat fixed point
Early computers often used **fixed-point** arithmetic, with a fixed number of digits after the binary point. That makes *absolute* errors uniform, which suits money but not science, where quantities range from $10^{-30}$ kg to $10^{30}$ kg. Floating point makes *relative* errors uniform ([[#thm-rounding]]) over a range of more than $600$ orders of magnitude, which is why it won. The Patriot failure in the introduction was a fixed-point error: $0.1$ was chopped to $24$ bits, an error of about $9.5\times10^{-8}$ seconds per tick, multiplied by the $3.6$ million ticks in $100$ hours.
:::

::: history
Konrad Zuse's relay computer Z3 (1941) already used binary floating-point numbers. The error analysis of algorithms began in earnest when electronic computers arrived: John von Neumann and Herman Goldstine analysed Gaussian elimination in 1947, and Alan Turing introduced the term "condition number" in 1948. James Wilkinson developed backward error analysis in the 1950s and set it out in *Rounding Errors in Algebraic Processes* (1963). Until the 1980s every manufacturer had its own floating-point format with its own quirks, so that programs gave different answers on different machines; the IEEE 754 standard of 1985, designed above all by William Kahan, ended this, and Kahan received the Turing Award in 1989 for his work on floating-point computation. Kahan also published the compensated summation algorithm, in 1965.
:::

## Where this leads

Every later chapter combines a truncation error analysis, usually based on Taylor's theorem, with an awareness of rounding: the attainable accuracy of root finding near multiple roots ([[numerical-analysis/root-finding]]), the stability of interpolation formulas ([[numerical-analysis/interpolation]]), and above all the condition number of a matrix and the backward stability of Gaussian elimination with pivoting ([[numerical-analysis/direct-methods]]). The theme of instability returns for differential equations, where an unstable method amplifies errors exponentially, much like the recurrence in [[#ex-recurrence]] ([[numerical-analysis/numerical-odes]]).

::: summary
- Computers represent reals as $\pm m\times\beta^e$ with $p$ significant digits; IEEE double precision has $p = 53$ bits, unit roundoff $u = 2^{-53} \approx 1.1\times10^{-16}$ and range up to about $10^{308}$.
- Rounding has relative error at most $u$, and each correctly rounded operation satisfies $\operatorname{fl}(x\circ y) = (x\circ y)(1 + \delta)$, $\abs\delta \le u$.
- Subtracting nearly equal numbers amplifies earlier relative errors by $\frac{\abs x + \abs y}{\abs{x - y}}$ (catastrophic cancellation); rewrite formulas to avoid it.
- Truncation and rounding errors compete: the forward difference achieves its best accuracy, about $\sqrt u$, at $h \approx \sqrt u$.
- The condition number $\kappa_f(x) = \abs{xf'(x)/f(x)}$ measures the sensitivity of the problem; expect to lose about $\log_{10}\kappa$ digits.
- An algorithm is backward stable if it computes the exact answer for slightly perturbed data; forward error $\lesssim$ condition number $\times$ backward error.
- Recursive summation is backward stable with error at most $\gamma_{n-1}\sum\abs{x_i}$; unstable recurrences can amplify errors by factors like $n!$.
:::

## Exercises

::: exercise Machine epsilon of a toy system {level=1 check="1/4"}
In the binary system with $p = 3$ of [[#ex-toy]], what is the machine epsilon, the distance from $1$ to the next floating-point number?
::: solution
The next number after $1 = (1.00)_2$ is $(1.01)_2 = 1.25$, so $\eps_M = 2^{1-p} = 2^{-2} = \frac14$. The unit roundoff is $u = \frac18$.
:::
:::

::: exercise A condition number {level=1 check="3"}
Find the relative condition number of $f(x) = x^3$ at any $x \ne 0$.
::: solution
$\kappa = \abs{\frac{x\cdot3x^2}{x^3}} = 3$. A relative error $\delta$ in $x$ becomes about $3\delta$ in $x^3$, consistent with $(1 + \delta)^3 \approx 1 + 3\delta$.
:::
:::

::: exercise Unit roundoff in single precision {level=1 check="2^(-24)"}
Single precision has $p = 24$. What is its unit roundoff $u$, and about how many significant decimal digits does it carry? (Enter $u$.)
::: solution
$u = 2^{-p} = 2^{-24} \approx 5.96\times10^{-8}$, so single precision carries about $-\log_{10}u \approx 7.2$ significant decimal digits.
:::
:::

::: exercise Removing a cancellation {level=2}
For large $x$, the expression $\sqrt{x + 1} - \sqrt x$ suffers from cancellation. Find an equivalent expression without it, and explain what happens to each formula at $x = 10^{16}$ in double precision.
::: solution
Multiplying by the conjugate, $\sqrt{x+1} - \sqrt x = \dfrac{1}{\sqrt{x + 1} + \sqrt x}$, which adds two positive numbers and is accurate. At $x = 10^{16}$, $x + 1$ rounds to $x$ (the gap between doubles there is $2$), so the original formula returns $0$, while the rewritten one returns $\frac{1}{2\times10^8} = 5\times10^{-9}$, correct to full precision (the true value is $5\times10^{-9}(1 - 2.5\times10^{-17} + \cdots)$).
:::
:::

::: exercise The logarithm near 1 {level=2 check="1/ln(1.001)"}
Find the relative condition number of $f(x) = \ln x$ at $x = 1.001$. If $x$ is known with relative error $10^{-16}$, about how many correct digits can $\ln x$ have? (Enter the condition number.)
::: solution
$\kappa = \frac{1}{\abs{\ln x}} = \frac{1}{\ln 1.001} \approx 1000.5$. Relative errors are amplified by about $10^3$, so the relative error in $\ln x$ can be about $10^{-13}$: roughly $13$ correct digits instead of $16$.
:::
:::

::: exercise The central difference {level=2}
Show that the central difference $\frac{f(x + h) - f(x - h)}{2h}$ has truncation error at most $\frac{M_3h^2}{6}$ when $\abs{f'''} \le M_3$, and with rounding errors as in [[#thm-forward-difference]] a total error at most $\frac{M_3h^2}{6} + \frac{uF}{h}$. Find the optimal $h$ and the best error, and evaluate them for $f = \exp$ at $x = 1$.
::: hint
Expand $f(x \pm h)$ to third order and use the intermediate value theorem to combine the two remainders.
:::
::: solution
By Taylor's theorem, $f(x \pm h) = f(x) \pm hf'(x) + \frac{h^2}{2}f''(x) \pm \frac{h^3}{6}f'''(\xi_\pm)$. Subtracting, $f(x+h) - f(x-h) = 2hf'(x) + \frac{h^3}{6}\left(f'''(\xi_+) + f'''(\xi_-)\right)$, so the truncation error is $\frac{h^2}{12}\abs{f'''(\xi_+) + f'''(\xi_-)} \le \frac{M_3h^2}{6}$. Rounding errors change the numerator by at most $2uF$ and hence the quotient by at most $\frac{2uF}{2h} = \frac{uF}{h}$. Minimising $\phi(h) = \frac{M_3h^2}{6} + \frac{uF}{h}$: $\phi'(h) = \frac{M_3h}{3} - \frac{uF}{h^2} = 0$ gives $h_* = \left(\frac{3uF}{M_3}\right)^{1/3}$, and $\phi(h_*) = \frac{M_3h_*^2}{6} + \frac{M_3h_*^2}{3} = \frac{M_3h_*^2}{2}$. For $\exp$ at $1$, $F \approx M_3 \approx e$, so $h_* \approx (3u)^{1/3} \approx 6.9\times10^{-6}$ and the best error is about $\frac e2h_*^2 \approx 6.5\times10^{-11}$ — about $10$ correct digits instead of $8$.
:::
:::

::: exercise A stable quadratic solver {level=2}
Use the function `quadratic_roots` above to explain why it avoids the cancellation of [[#ex-quadratic]], and verify by hand that it returns the correct roots of $x^2 - 5x + 6 = 0$.
::: solution
The quantity $q = -\frac12\left(b + \operatorname{sign}(b)\sqrt{b^2 - 4ac}\right)$ adds $b$ and a number of the *same* sign, so no cancellation occurs. (The only remaining subtraction is in the discriminant $b^2 - 4ac$, which cancels only when $b^2 \approx 4ac$, i.e. near a double root; that problem is itself ill-conditioned, so no formula can do much better.) The roots are $q/a$ and $c/q$, because $q$ is $a$ times one root and the product of the roots is $c/a$. For $a = 1$, $b = -5$, $c = 6$: $\sqrt{25 - 24} = 1$, $\operatorname{sign}(b)\cdot1 = -1$, $q = -\frac12(-5 - 1) = 3$. The roots are $q/a = 3$ and $c/q = 2$.
:::
:::

::: exercise An inner product {level=3}
Let $\hat s$ be the computed value of $s = \sum_{i=1}^n x_iy_i$ (products formed in floating point, then summed recursively). Using [[#eq-standard-model]] and [[#lem-gamma]], prove that $\abs{\hat s - s} \le \gamma_n\sum_{i=1}^n\abs{x_iy_i}$.
::: solution
Each product is computed as $x_iy_i(1 + \eps_i)$ with $\abs{\eps_i} \le u$. Summing these $n$ numbers recursively, as in the proof of [[#thm-summation]], term $i$ is further multiplied by at most $n - 1$ factors $(1 + \delta_k)$. So $\hat s = \sum_i x_iy_i\prod_{j}(1 + \delta_{ij})$ where each product has at most $n$ factors with $\abs{\delta_{ij}} \le u$. By [[#lem-gamma]] each product equals $1 + \theta^{(i)}$ with $\abs{\theta^{(i)}} \le \gamma_n$ (fewer factors give a smaller bound, since $\gamma_k$ increases with $k$). Hence $\abs{\hat s - s} = \abs{\sum_ix_iy_i\theta^{(i)}} \le \gamma_n\sum_i\abs{x_iy_i}$. This bound is the basis of the error analysis of matrix multiplication and Gaussian elimination.
:::
:::

::: exercise Sterbenz's lemma {level=3 #exr-sterbenz}
Let $x$ and $y$ be positive floating-point numbers in a binary system with precision $p$ (ignore underflow) such that $\frac y2 \le x \le 2y$. Prove that $x - y$ is a floating-point number, so that it is computed exactly.
::: hint
Assume $y \le x \le 2y$. Write both numbers as integer multiples of the gap $2^{e - p + 1}$ of the smaller one, where $2^e \le y < 2^{e+1}$.
:::
::: solution
By symmetry suppose $y \le x \le 2y$ (otherwise swap roles and change the sign). Let $2^e \le y < 2^{e+1}$. Then $y = M_y2^{e-p+1}$ for an integer $M_y$ with $2^{p-1} \le M_y < 2^p$. Since $x \ge y \ge 2^e$, the exponent of $x$ is at least $e$, so $x$ is also an integer multiple of $2^{e - p + 1}$: $x = M_x2^{e-p+1}$. Then $x - y = (M_x - M_y)2^{e-p+1}$ with $0 \le M_x - M_y$, and $x - y \le 2y - y = y < 2^{e+1}$ gives $M_x - M_y < 2^{p}$. An integer below $2^p$ times a power of two is a floating-point number with at most $p$ significant bits (normalised, or zero). So $x - y$ is exactly representable, and correct rounding returns it exactly.
:::
:::

::: exercise Error growth in the recurrence {level=3}
In [[#ex-recurrence]], suppose the computed $\hat I_0 = I_0 + \eps_0$ and that all later arithmetic is exact. Prove that $\hat I_n - I_n = (-1)^nn!\,\eps_0$. Then show that the backward recurrence $I_{n-1} = (1 - I_n)/n$ started at $N$ with error $\eps_N$ produces an error of absolute value $\frac{n!}{N!}\abs{\eps_N}$ at index $n < N$.
::: solution
Let $E_n = \hat I_n - I_n$. Subtracting $I_n = 1 - nI_{n-1}$ from $\hat I_n = 1 - n\hat I_{n-1}$ gives $E_n = -nE_{n-1}$, so by induction $E_n = (-n)(-(n-1))\cdots(-1)E_0 = (-1)^nn!\,\eps_0$. Backwards, $\hat I_{n-1} - I_{n-1} = -\frac{1}{n}(\hat I_n - I_n)$, so $E_{n-1} = -E_n/n$ and $\abs{E_n} = \frac{\abs{E_N}}{N(N-1)\cdots(n+1)} = \frac{n!}{N!}\abs{\eps_N}$. With $N = 40$, $n = 20$ and $\abs{\eps_N} < \frac{1}{41}$ this is below $\frac{20!}{40!\cdot 41} \approx 7\times10^{-32}$.
:::
:::
