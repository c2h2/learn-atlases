Hang a mass $m$ on a spring and pull it down. When you let go it oscillates, and if there is friction the oscillations die away. Let $x(t)$ be the displacement from equilibrium. The spring pulls back with force $-kx$ (Hooke's law), friction resists the motion with force $-cx'$, and Newton's second law gives

$$
m\,x'' + c\,x' + k\,x = 0 .
$$ {#eq-spring}

This is a **second-order linear equation with constant coefficients**, and it is a model for far more than springs: the same equation governs the charge in an electrical circuit, the swaying of a building and, to a first approximation, every system near a stable equilibrium. Should the mass bounce up and down, or creep back to rest? Will a car's suspension wobble after a pothole? The answers are hidden in a quadratic equation.

This chapter develops the theory of second-order linear equations. The central fact is that **the solutions of a linear homogeneous equation form a vector space of dimension two**. We prove this using the existence theorem, the superposition principle and the Wronskian; then we find explicit bases of solutions for equations with constant coefficients, for Cauchy–Euler equations, and — given one solution — for any second-order linear equation.

## Linear equations of second order

::: definition Second-order linear equation {#def-linear2}
A **second-order linear equation** in standard form is

$$
y'' + p(t)\,y' + q(t)\,y = g(t),
$$ {#eq-linear2}

with coefficients $p, q$ and forcing term $g$ continuous on an open interval $I$. It is **homogeneous** if $g \equiv 0$. Writing $L[y] = y'' + py' + qy$, the equation reads $L[y] = g$.
:::

An equation $P(t)y'' + Q(t)y' + R(t)y = G(t)$ is put into standard form by dividing by $P$, which is allowed only where $P(t) \neq 0$. Points where $P$ vanishes are **singular points** of the equation; the theory below applies on intervals that avoid them, and [[ode/series-solutions]] studies what happens at them.

For a second-order equation it is natural to prescribe two initial conditions, $y(t_0) = y_0$ and $y'(t_0) = y_1$ — for the spring, the initial position and velocity. With these the solution is determined for all time.

::: theorem Existence and uniqueness for linear equations {#thm-eu2}
If $p$, $q$ and $g$ are continuous on an open interval $I$, then for every $t_0 \in I$ and all $y_0, y_1 \in \R$ the IVP

$$
y'' + p(t)y' + q(t)y = g(t), \qquad y(t_0) = y_0, \quad y'(t_0) = y_1
$$

has exactly one solution, and it is defined on the **whole** interval $I$.
:::

::: proof
Put $\mathbf{x}(t) = \bigl(y(t), y'(t)\bigr)$. Then $y$ solves the IVP if and only if $\mathbf{x}$ solves the first-order *system*

$$
\mathbf{x}' = A(t)\,\mathbf{x} + \mathbf{b}(t), \qquad A(t) = \begin{pmatrix} 0 & 1 \\ -q(t) & -p(t)\end{pmatrix},\quad \mathbf{b}(t) = \begin{pmatrix} 0 \\ g(t)\end{pmatrix}, \qquad \mathbf{x}(t_0) = \begin{pmatrix} y_0 \\ y_1\end{pmatrix}.
$$

On a closed interval $[\alpha,\beta] \subseteq I$ containing $t_0$, the right-hand side $\mathbf{F}(t,\mathbf{x}) = A(t)\mathbf{x} + \mathbf{b}(t)$ satisfies $\norm{\mathbf{F}(t,\mathbf{x}) - \mathbf{F}(t,\mathbf{z})} = \norm{A(t)(\mathbf{x}-\mathbf{z})} \le L\norm{\mathbf{x} - \mathbf{z}}$, where $L$ is the maximum over $[\alpha,\beta]$ of the operator norm of $A(t)$, finite because the entries are continuous. The proofs of the Picard–Lindelöf theorem and of global existence on a strip ([[ode/existence-uniqueness#thm-picard]], [[ode/existence-uniqueness#thm-global]]) use only the triangle inequality and $\norm{\int \mathbf{v}} \le \int\norm{\mathbf{v}}$, so they carry over word for word to vector-valued functions. Hence there is exactly one solution on $[\alpha,\beta]$; since every point of $I$ lies in such an interval, uniqueness lets us patch these together into one solution on $I$. The details for systems are written out in [[ode/linear-systems]].
:::

A useful consequence: **the only solution of a homogeneous equation with $y(t_0) = y'(t_0) = 0$ is $y \equiv 0$**, because the zero function is a solution of that IVP.

::: warning Divide by the leading coefficient first
For $t^2y'' - 3ty' + 4y = 0$ the standard form has $p = -3/t$ and $q = 4/t^2$, which are discontinuous at $t = 0$. [[#thm-eu2]] then applies on $(0,\infty)$ and on $(-\infty,0)$ separately, but says nothing about an interval containing $0$. Indeed both $t^2$ and $0$ solve this equation with $y(0) = y'(0) = 0$, so uniqueness genuinely fails at the singular point.
:::

## Superposition and the Wronskian

::: theorem Superposition principle {#thm-superposition}
The operator $L[y] = y'' + py' + qy$ is linear: for twice differentiable $y_1, y_2$ and constants $c_1, c_2$,

$$
L[c_1y_1 + c_2y_2] = c_1L[y_1] + c_2L[y_2].
$$

Consequently, any linear combination of solutions of the homogeneous equation $L[y] = 0$ is again a solution: the solutions form a vector space.
:::

::: proof
Differentiation is linear, so $(c_1y_1 + c_2y_2)'' = c_1y_1'' + c_2y_2''$ and similarly for the first derivative. Hence

$$
L[c_1y_1 + c_2y_2] = c_1y_1'' + c_2y_2'' + p\,(c_1y_1' + c_2y_2') + q\,(c_1y_1 + c_2y_2) = c_1L[y_1] + c_2L[y_2].
$$

If $L[y_1] = L[y_2] = 0$, the right-hand side is $0$. The set of solutions contains $0$ and is closed under linear combinations, so it is a subspace of the vector space of twice differentiable functions on $I$.
:::

How large is this vector space? Two solutions $y_1, y_2$ are **linearly dependent** on $I$ if one is a constant multiple of the other there (precisely: $c_1y_1 + c_2y_2 \equiv 0$ for constants not both zero), and **linearly independent** otherwise. The tool for detecting independence is a determinant.

::: definition Wronskian {#def-wronskian}
The **Wronskian** of two differentiable functions $y_1, y_2$ is

$$
W[y_1, y_2](t) = \begin{vmatrix} y_1(t) & y_2(t) \\ y_1'(t) & y_2'(t)\end{vmatrix} = y_1(t)\,y_2'(t) - y_1'(t)\,y_2(t).
$$
:::

The Wronskian is the determinant of the linear system we must solve to fit initial conditions, which is why it controls everything.

::: theorem Fundamental sets of solutions {#thm-general}
Let $y_1, y_2$ be solutions of $y'' + py' + qy = 0$ on $I$ with $W[y_1,y_2](t_0) \neq 0$ for some $t_0 \in I$. Then every solution on $I$ can be written as

$$
y = c_1\,y_1 + c_2\,y_2
$$

for unique constants $c_1, c_2$. Such a pair is called a **fundamental set of solutions**, and $c_1y_1 + c_2y_2$ the **general solution**.
:::

::: proof
Let $y$ be any solution. We want constants with $c_1y_1(t_0) + c_2y_2(t_0) = y(t_0)$ and $c_1y_1'(t_0) + c_2y_2'(t_0) = y'(t_0)$. This is a $2\times2$ linear system whose determinant is $W[y_1,y_2](t_0) \neq 0$, so it has exactly one solution $(c_1, c_2)$ (Cramer's rule, [[linear-algebra/determinants]]). With these constants, $z = c_1y_1 + c_2y_2$ is a solution by [[#thm-superposition]] and has the same initial values as $y$ at $t_0$. By the uniqueness part of [[#thm-eu2]], $z = y$ on $I$. The constants are unique because any representation must satisfy the same linear system.
:::

The hypothesis asks for $W \neq 0$ at just one point. That this is enough is explained by a remarkable formula for the Wronskian of two solutions, which can be computed *without knowing the solutions*.

::: theorem Abel's identity {#thm-abel}
If $y_1, y_2$ solve $y'' + p(t)y' + q(t)y = 0$ on $I$, then for any $t_0 \in I$

$$
W[y_1,y_2](t) = W[y_1,y_2](t_0)\,\exp\left(-\int_{t_0}^{t} p(s)\,ds\right) \qquad (t \in I).
$$ {#eq-abel}

In particular $W$ is either identically zero on $I$ or never zero on $I$.
:::

::: proof
Differentiate $W = y_1y_2' - y_1'y_2$; the terms $y_1'y_2'$ cancel:

$$
W' = y_1y_2'' - y_1''y_2 = y_1\bigl(-py_2' - qy_2\bigr) - \bigl(-py_1' - qy_1\bigr)y_2 = -p\,\bigl(y_1y_2' - y_1'y_2\bigr) = -p\,W.
$$

So $W$ solves the first-order linear equation $W' + pW = 0$, and [[ode/first-order#thm-linear]] gives [[#eq-abel]]. The exponential factor never vanishes, so $W(t) = 0$ for one $t$ exactly when $W(t_0) = 0$.
:::

::: corollary The Wronskian test for solutions {#cor-wronskian}
Two solutions $y_1, y_2$ of $y'' + py' + qy = 0$ on $I$ are linearly independent if and only if $W[y_1,y_2](t) \neq 0$ for some (equivalently, every) $t\in I$. Hence the solution space is exactly two-dimensional.
:::

::: proof
If $y_1, y_2$ are dependent, say $y_2 = cy_1$ (or $y_1 \equiv 0$), the columns of the Wronskian matrix are proportional and $W \equiv 0$. Conversely suppose $W(t_0) = 0$. Then the linear system $c_1y_1(t_0) + c_2y_2(t_0) = 0$, $c_1y_1'(t_0) + c_2y_2'(t_0) = 0$ has a non-zero solution $(c_1,c_2)$. The function $y = c_1y_1 + c_2y_2$ solves the equation with $y(t_0) = y'(t_0) = 0$, so $y\equiv 0$ by uniqueness, and $y_1,y_2$ are dependent.

For the dimension: let $y_1, y_2$ be the solutions with $(y_1, y_1')(t_0) = (1, 0)$ and $(y_2, y_2')(t_0) = (0,1)$, which exist by [[#thm-eu2]]. Their Wronskian at $t_0$ is $1$, so they are independent, and by [[#thm-general]] they span the solution space. They form a basis.
:::

::: quiz
Which pairs form a fundamental set of solutions of $y'' - y = 0$ on $\R$? (Select all that apply.)
- [x] $e^t,\ e^{-t}$
- [x] $\cosh t,\ \sinh t$
- [ ] $e^t,\ 2e^t$
- [x] $e^t,\ e^t + e^{-t}$
::: solution
All the functions listed are solutions. $W[e^t, e^{-t}] = -2$, $W[\cosh t,\sinh t] = \cosh^2 t - \sinh^2 t = 1$ and $W[e^t, e^t + e^{-t}] = -2$ are non-zero, so these pairs are fundamental sets. The pair $e^t, 2e^t$ is dependent ($W \equiv 0$): it spans only a one-dimensional subspace and cannot fit both $y(0)$ and $y'(0)$.
:::
:::

::: warning The Wronskian test is for solutions
For arbitrary functions, $W \equiv 0$ does **not** imply dependence. The functions $t^3$ and $\lvert t\rvert^3$ have $W \equiv 0$ on $\R$ but are independent on $\R$ (see [[#exr-3-10]]). [[#cor-wronskian]] uses the differential equation in an essential way — through uniqueness — and the conclusion is that two such functions cannot both solve one equation $y'' + py' + qy = 0$ with continuous coefficients on $\R$.
:::

## Equations with constant coefficients

For $a\,y'' + b\,y' + c\,y = 0$ with real constants $a \neq 0$, $b$, $c$, we look for solutions of the form $y = e^{rt}$, because differentiating an exponential just multiplies it by a constant. Substituting,

$$
a\,r^2e^{rt} + b\,r\,e^{rt} + c\,e^{rt} = (ar^2 + br + c)\,e^{rt} = 0,
$$

and since $e^{rt}\neq 0$, $e^{rt}$ is a solution exactly when $r$ is a root of the **characteristic equation**

$$
a\,r^2 + b\,r + c = 0 .
$$ {#eq-characteristic}

A quadratic has two distinct real roots, one repeated real root, or a pair of complex conjugate roots, and each case gives a fundamental set.

::: theorem Constant coefficients {#thm-constant}
Let $r_1, r_2$ be the roots of [[#eq-characteristic]]. A fundamental set of solutions of $ay'' + by' + cy = 0$ on $\R$ is:

1. $e^{r_1t},\ e^{r_2t}$ if $r_1 \neq r_2$ are real;
2. $e^{rt},\ t\,e^{rt}$ if $r_1 = r_2 = r$;
3. $e^{\lambda t}\cos\mu t,\ e^{\lambda t}\sin\mu t$ if $r_{1,2} = \lambda \pm i\mu$ with $\mu \neq 0$.
:::

::: proof
In each case we show that both functions are solutions and that their Wronskian is non-zero; [[#thm-general]] does the rest. Write $P(r) = ar^2 + br + c$ and $L[y] = ay'' + by' + cy$, so that $L[e^{rt}] = P(r)e^{rt}$.

1. Both exponentials are solutions, and $W = e^{r_1t}\,r_2e^{r_2t} - r_1e^{r_1t}e^{r_2t} = (r_2 - r_1)\,e^{(r_1+r_2)t} \neq 0$.

2. A repeated root satisfies $P(r) = 0$ and $P'(r) = 2ar + b = 0$. For $y = te^{rt}$ we have $y' = (1 + rt)e^{rt}$ and $y'' = (2r + r^2t)e^{rt}$, so

$$
L[te^{rt}] = \bigl(a(2r + r^2t) + b(1 + rt) + ct\bigr)e^{rt} = \bigl(t\,P(r) + P'(r)\bigr)e^{rt} = 0 .
$$

The Wronskian is $e^{rt}(1 + rt)e^{rt} - re^{rt}\,te^{rt} = e^{2rt} \neq 0$.

3. For complex $r = \lambda + i\mu$, define $e^{rt} = e^{\lambda t}(\cos\mu t + i\sin\mu t)$ (Euler's formula, [[complex-analysis/elementary-functions]]). Differentiating real and imaginary parts with the product rule shows $\frac{d}{dt}e^{rt} = re^{rt}$ for complex $r$ too, so $L[e^{rt}] = P(r)e^{rt} = 0$. Because $a, b, c$ are real, $L$ maps real functions to real functions, and so

$$
L[\operatorname{Re} e^{rt}] = \operatorname{Re} L[e^{rt}] = 0, \qquad L[\operatorname{Im} e^{rt}] = \operatorname{Im}L[e^{rt}] = 0 .
$$

Thus $e^{\lambda t}\cos\mu t$ and $e^{\lambda t}\sin\mu t$ are real solutions, and a direct computation gives $W = \mu\,e^{2\lambda t} \neq 0$.
:::

::: intuition Where does $t e^{rt}$ come from?
When the roots $r_1 \neq r_2$ are distinct, $\dfrac{e^{r_2t} - e^{r_1t}}{r_2 - r_1}$ is a solution. Now let $r_2 \to r_1 = r$ (by perturbing the coefficients). The quotient tends to the derivative of $e^{rt}$ *with respect to* $r$, which is $t\,e^{rt}$. The second solution in the repeated case is the limit of the difference quotient of the two solutions that are merging.
:::

::: example Two distinct real roots {#ex-distinct}
Solve $y'' + y' - 6y = 0$, $y(0) = 1$, $y'(0) = 0$.
::: solution
The characteristic equation $r^2 + r - 6 = (r + 3)(r - 2) = 0$ has roots $2$ and $-3$, so $y = c_1e^{2t} + c_2e^{-3t}$. The initial conditions give $c_1 + c_2 = 1$ and $2c_1 - 3c_2 = 0$, so $c_1 = \tfrac35$, $c_2 = \tfrac25$:

$$
y = \tfrac35\,e^{2t} + \tfrac25\,e^{-3t}.
$$

The decaying part fades quickly and the solution grows like $\tfrac35e^{2t}$. Only the initial values with $y'(0) = -3y(0)$ produce a decaying solution.
:::
:::

::: example A repeated root {#ex-repeated}
Solve $y'' + 4y' + 4y = 0$, $y(0) = 1$, $y'(0) = 0$.
::: solution
$r^2 + 4r + 4 = (r+2)^2$ has the double root $r = -2$, so $y = (c_1 + c_2t)e^{-2t}$. Then $y(0) = c_1 = 1$ and $y'(0) = c_2 - 2c_1 = 0$ give $c_2 = 2$:

$$
y = (1 + 2t)\,e^{-2t}.
$$

The factor $1 + 2t$ grows, but the exponential wins, and $y\to 0$ without ever crossing zero for $t > 0$.
:::
:::

::: example Complex roots {#ex-complex}
Solve $y'' + 2y' + 5y = 0$, $y(0) = 1$, $y'(0) = 1$, and write the answer as a single damped sinusoid.
::: solution
$r^2 + 2r + 5 = 0$ gives $r = -1 \pm 2i$, so $y = e^{-t}(c_1\cos 2t + c_2\sin 2t)$. Now $y(0) = c_1 = 1$ and $y'(0) = -c_1 + 2c_2 = 1$, so $c_2 = 1$:

$$
y = e^{-t}(\cos 2t + \sin 2t) = \sqrt2\,e^{-t}\sin\left(2t + \frac{\pi}{4}\right),
$$

using $\sin(A + B) = \sin A\cos B + \cos A\sin B$ with $\cos\frac\pi4 = \sin\frac\pi4 = \frac{1}{\sqrt2}$. The solution oscillates with angular frequency $2$ inside the envelope $\pm\sqrt2\,e^{-t}$.
:::
:::

::: remark Higher-order equations
Everything extends to $a_ny^{(n)} + \dots + a_1y' + a_0y = 0$ with constant coefficients: a real root $r$ of multiplicity $m$ of the characteristic polynomial contributes $e^{rt}, te^{rt}, \dots, t^{m-1}e^{rt}$, and each pair $\lambda\pm i\mu$ of multiplicity $m$ contributes $t^ke^{\lambda t}\cos\mu t$ and $t^ke^{\lambda t}\sin\mu t$ for $k < m$; the solution space has dimension $n$. For example $y''' - y = 0$ has characteristic roots $1$ and $-\tfrac12 \pm \tfrac{\sqrt3}{2}i$, so its general solution is $c_1e^t + e^{-t/2}\bigl(c_2\cos\tfrac{\sqrt3}{2}t + c_3\sin\tfrac{\sqrt3}{2}t\bigr)$. The cleanest proofs use the linear-algebra viewpoint of [[ode/linear-systems]].
:::

## Reduction of order and Cauchy–Euler equations

For equations with variable coefficients there is no general recipe for solutions. But if one solution $y_1$ is known — by inspection, from a series, or from physics — a second one can always be found. The idea (going back to d'Alembert) is to look for $y_2 = v\,y_1$; substituting produces a first-order equation for $v'$, hence the name **reduction of order**. Abel's identity gives the answer directly.

::: proposition Reduction of order {#prop-reduction}
Let $y_1$ be a solution of $y'' + p(t)y' + q(t)y = 0$ with $y_1(t)\neq 0$ on $I$. Then

$$
y_2(t) = y_1(t)\int\frac{e^{-\int p(t)\,dt}}{y_1(t)^2}\,dt
$$ {#eq-reduction}

is a second solution, and $y_1, y_2$ form a fundamental set on $I$.
:::

::: proof
Let $y_2$ be any solution with $W[y_1,y_2] \neq 0$ (one exists by [[#cor-wronskian]]). By the quotient rule and [[#thm-abel]],

$$
\left(\frac{y_2}{y_1}\right)' = \frac{y_1y_2' - y_1'y_2}{y_1^2} = \frac{W}{y_1^2} = \frac{C\,e^{-\int p}}{y_1^2}
$$

for a constant $C\neq 0$, so $y_2/y_1$ is an antiderivative of $Ce^{-\int p}/y_1^2$. Conversely, define $y_2$ by [[#eq-reduction]] and $v = y_2/y_1$, so $v' = e^{-\int p}/y_1^2$. Then $y_2' = v'y_1 + vy_1'$, $y_2'' = v''y_1 + 2v'y_1' + vy_1''$ and

$$
L[y_2] = v\,L[y_1] + y_1v'' + (2y_1' + py_1)v' = 0 + \bigl(y_1^2v'\bigr)'/y_1 + p\,y_1v' = \frac{1}{y_1}\Bigl(\bigl(e^{-\int p}\bigr)' + p\,e^{-\int p}\Bigr) = 0 .
$$

Finally $W[y_1, y_2] = y_1^2v' = e^{-\int p} \neq 0$.
:::

::: example A second solution of Legendre's equation {#ex-legendre-q}
The function $y_1 = t$ solves Legendre's equation $(1 - t^2)y'' - 2ty' + 2y = 0$ on $(-1,1)$ (check: $0 - 2t + 2t = 0$). Find a second solution.
::: solution
In standard form $p(t) = -\dfrac{2t}{1-t^2}$, so $-\int p\,dt = \int\frac{2t}{1-t^2}\,dt = -\ln(1 - t^2)$ and $e^{-\int p} = \dfrac{1}{1-t^2}$. On $(0,1)$, where $y_1 \neq 0$, [[#eq-reduction]] and partial fractions give

$$
y_2 = t\int\frac{dt}{t^2(1-t^2)} = t\int\left(\frac{1}{t^2} + \frac{1}{2(1+t)} + \frac{1}{2(1-t)}\right)dt = t\left(-\frac1t + \frac12\ln\frac{1+t}{1-t}\right) = \frac t2\ln\frac{1+t}{1-t} - 1 .
$$

This formula makes sense on all of $(-1,1)$, including $t = 0$, and a direct check shows it solves the equation there. By Abel's identity $W[y_1,y_2] = C/(1-t^2)$, and indeed $W = ty_2' - y_2 = \frac{1}{1-t^2}$. The second solution blows up logarithmically at $t = \pm1$, the singular points of the equation. It is the Legendre function $Q_1$, met again in [[ode/series-solutions]].
:::
:::

A family where a first solution is easy to find is the **Cauchy–Euler** (or equidimensional) equation

$$
a\,t^2y'' + b\,t\,y' + c\,y = 0 \qquad (t > 0),
$$

where each derivative is multiplied by the matching power of $t$. Trying $y = t^r$ gives $\bigl(ar(r-1) + br + c\bigr)t^r = 0$, so $t^r$ is a solution when $r$ solves the **indicial equation** $ar(r-1) + br + c = 0$. The substitution $t = e^s$ turns the equation into one with constant coefficients (because $t\frac{d}{dt} = \frac{d}{ds}$), so the three cases of [[#thm-constant]] translate directly: distinct real roots give $t^{r_1}, t^{r_2}$; a repeated root gives $t^r, t^r\ln t$; complex roots $\lambda\pm i\mu$ give $t^\lambda\cos(\mu\ln t)$ and $t^\lambda\sin(\mu\ln t)$.

::: example Reduction of order for a Cauchy–Euler equation {#ex-reduction}
Solve $t^2y'' - 3ty' + 4y = 0$ on $t > 0$.
::: solution
The indicial equation $r(r-1) - 3r + 4 = r^2 - 4r + 4 = (r-2)^2 = 0$ has the double root $r = 2$, giving only $y_1 = t^2$. In standard form $p(t) = -3/t$, so $e^{-\int p} = e^{3\ln t} = t^3$, and [[#eq-reduction]] gives

$$
y_2 = t^2\int\frac{t^3}{t^4}\,dt = t^2\int\frac{dt}{t} = t^2\ln t .
$$

The general solution on $(0,\infty)$ is $y = c_1t^2 + c_2t^2\ln t$, and $W[t^2, t^2\ln t] = t^3$, in agreement with Abel's identity ($W = Ce^{-\int p} = Ct^3$).
:::
:::

::: widget plot
f: cos(ln(x)); sin(ln(x)); x^2*ln(x)
x: 0.002, 3
y: -1.5, 1.5
labels: \cos(\ln t); \sin(\ln t); t^2\ln t
caption: Solutions of Cauchy–Euler equations near the singular point $t = 0$. The solutions $\cos(\ln t)$ and $\sin(\ln t)$ of $t^2y'' + ty' + y = 0$ oscillate infinitely often as $t\to0^+$, ever faster; $t^2\ln t$ from [[#ex-reduction]] tends to $0$ but is not twice differentiable at $0$. Zoom towards the origin: behaviour like this cannot occur at a point where the coefficients are continuous.
:::

## Free mechanical vibrations

We return to the spring [[#eq-spring]], $mx'' + cx' + kx = 0$, with mass $m > 0$, stiffness $k > 0$ and damping coefficient $c \ge 0$.

**No damping.** If $c = 0$ the characteristic roots are $\pm i\omega_0$ with **natural frequency** $\omega_0 = \sqrt{k/m}$, and

$$
x(t) = A\cos\omega_0t + B\sin\omega_0t = R\cos(\omega_0t - \delta), \qquad R = \sqrt{A^2+B^2},\quad \cos\delta = \frac AR,\ \sin\delta = \frac BR .
$$

This is **simple harmonic motion** with amplitude $R$, phase $\delta$ and period $2\pi/\omega_0$. The period does not depend on the amplitude — the property that made pendulum clocks possible (for small swings; see [[ode/nonlinear-systems]]).

::: warning Getting the phase right
It is tempting to write $\delta = \arctan(B/A)$, but $\arctan$ only returns angles in $(-\frac\pi2,\frac\pi2)$. If $A < 0$ you must add $\pi$. For $x = -\cos t + \sin t$ the correct form is $\sqrt2\cos\bigl(t - \frac{3\pi}{4}\bigr)$, whereas $\arctan(B/A) = -\frac\pi4$ would give $\sqrt2\cos(t + \frac\pi4) = \cos t - \sin t$, the negative of the right answer. Always check the signs of $\cos\delta = A/R$ and $\sin\delta = B/R$.
:::

**With damping.** The roots are $r = \dfrac{-c\pm\sqrt{c^2 - 4mk}}{2m}$, and the sign of the discriminant gives three regimes.

| regime | condition | solution |
|---|---|---|
| overdamped | $c^2 > 4mk$ | $c_1e^{r_1t} + c_2e^{r_2t}$ with $r_2 < r_1 < 0$ |
| critically damped | $c^2 = 4mk$ | $(c_1 + c_2t)\,e^{-ct/(2m)}$ |
| underdamped | $c^2 < 4mk$ | $R\,e^{-ct/(2m)}\cos(\mu t - \delta)$, $\ \mu = \dfrac{\sqrt{4mk - c^2}}{2m}$ |

In every case with $c > 0$ the solution tends to $0$: when the roots are real they are both negative (their sum is $-c/m < 0$ and their product is $k/m > 0$), and when complex their real part is $-c/(2m) < 0$. An overdamped or critically damped system crosses equilibrium at most once; an underdamped one oscillates with **quasi-frequency** $\mu < \omega_0$ inside a decaying exponential envelope. The physical reason for the decay is that damping dissipates energy.

::: proposition Energy dissipation {#prop-energy}
For a solution of $mx'' + cx' + kx = 0$, the total energy $E(t) = \tfrac12 m\,x'(t)^2 + \tfrac12 k\,x(t)^2$ (kinetic plus potential) satisfies

$$
E'(t) = -c\,x'(t)^2 \le 0 .
$$

So energy is conserved when $c = 0$ and non-increasing when $c > 0$.
:::

::: proof
By the chain rule and the equation, $E' = m\,x'x'' + k\,x\,x' = x'\,(mx'' + kx) = x'\,(-cx') = -c\,(x')^2$.
:::

::: example An underdamped spring {#ex-underdamped}
A spring system has $m = 1$, $c = 2$, $k = 10$ and starts at rest at $x = 1$. Find the motion, its quasi-period and its amplitude–phase form.
::: solution
The characteristic equation $r^2 + 2r + 10 = 0$ gives $r = -1\pm3i$: underdamped, since $c^2 = 4 < 40 = 4mk$. So $x = e^{-t}(c_1\cos3t + c_2\sin3t)$ with $x(0) = c_1 = 1$ and $x'(0) = -c_1 + 3c_2 = 0$, i.e. $c_2 = \tfrac13$:

$$
x(t) = e^{-t}\left(\cos 3t + \tfrac13\sin 3t\right) = \frac{\sqrt{10}}{3}\,e^{-t}\cos(3t - \delta), \qquad \delta = \arctan\tfrac13 \approx 0.322,
$$

where $\delta$ is in the first quadrant because both coefficients are positive. The quasi-frequency is $\mu = 3$, so successive maxima are $2\pi/3 \approx 2.09$ time units apart, compared with the undamped period $2\pi/\sqrt{10}\approx 1.99$. Each quasi-period the amplitude shrinks by the factor $e^{-2\pi/3}\approx 0.12$.
:::
:::

::: widget oscillator
m: 1
c: 0.4
k: 4
F: 0
x0: 1
v0: 0
caption: A mass–spring system $mx'' + cx' + kx = 0$. With $m = 1$, $k = 4$ the critical damping is $c = 2\sqrt{mk} = 4$. Increase $c$ from $0.4$: the oscillations die faster and slow down slightly, stop altogether at $c = 4$, and for larger $c$ the mass creeps back ever more slowly — too much damping is as bad as too little.
:::

The phase plane gives another view. Writing $v = x'$, the equation becomes the system $x' = v$, $v' = -\frac km x - \frac cm v$, and each solution traces a curve in the $(x,v)$-plane. Undamped motion gives closed ellipses (the level curves of the energy); underdamped motion spirals into the origin; over- and critically damped motion approaches it without spiralling.

::: widget phaseplane
matrix: 0, 1; -4, -0.4
x: -2, 2
y: -4, 4
points: 1, 0; -1.5, 2
caption: The spring as a first-order system $x' = v$, $v' = -kx - cv$ (here $m = 1$; horizontal axis $x$, vertical axis $v$). The bottom row of the matrix is $(-k, -c)$. Set the damping entry to $0$ to see closed orbits, then make it more negative: the spiral tightens, and beyond $-4$ (critical damping for $k = 4$) the spirals straighten into a node with two straight-line solutions.
:::

::: quiz
A system has $m = 2$, $c = 4$, $k = 2$. How does it move after being displaced?
- [ ] It oscillates with slowly decreasing amplitude.
- [x] It is critically damped: it returns to equilibrium without oscillating, crossing zero at most once.
- [ ] It is overdamped and never reaches equilibrium even in the limit.
- [ ] It oscillates forever with constant amplitude.
::: solution
$c^2 = 16$ and $4mk = 16$ are equal, so the system is critically damped: the characteristic equation $2r^2 + 4r + 2 = 2(r+1)^2$ has the double root $-1$, and $x = (c_1 + c_2t)e^{-t}$. This tends to $0$ and vanishes for at most one value of $t$.
:::
:::

::: application Suspensions, circuits and buildings
Car suspensions and the door closers on fire doors are designed to be close to critically damped: they return to equilibrium as fast as possible without overshooting. In an electrical circuit with an inductor $L$, resistor $R$ and capacitor $C$ in series, the charge satisfies $Lq'' + Rq' + q/C = 0$ — exactly [[#eq-spring]] with inductance playing the role of mass, resistance of friction and $1/C$ of stiffness. Engineers move freely between the mechanical and electrical pictures. Tall buildings use tuned mass dampers, large masses on springs and dampers near the top, to dissipate the energy of swaying caused by wind and earthquakes.
:::

::: history
Euler discovered the exponential substitution for linear equations with constant coefficients in 1739, in correspondence with Johann Bernoulli, and published the method in 1743, including the cases of repeated roots and of complex roots, which give sines and cosines. Abel's identity for the Wronskian appears in a paper by Niels Henrik Abel of 1827, and Joseph Liouville extended it to equations of any order in 1838. The determinant itself was introduced by the Polish mathematician Józef Hoene-Wroński in 1812; the name "Wronskian" was given by Thomas Muir in 1882.
:::

## Where this leads

When the spring is pushed by an external force the equation becomes non-homogeneous, $mx'' + cx' + kx = F(t)$; by the superposition principle its solutions are one particular solution plus the general solution found here, and [[ode/nonhomogeneous]] shows how to find that particular solution and explains resonance. The [[ode/laplace-transform]] handles discontinuous and impulsive forcing. Rewriting the equation as a first-order system, as in the phase-plane figure, leads to [[ode/linear-systems]], where the characteristic equation becomes the characteristic polynomial of a matrix. For variable coefficients with singular points, power series take over in [[ode/series-solutions]], and the oscillation of solutions is the starting point of [[pde/sturm-liouville]].

::: summary
- Linear IVPs $y'' + py' + qy = g$, $y(t_0) = y_0$, $y'(t_0) = y_1$ have a unique solution on the whole interval where $p, q, g$ are continuous ([[#thm-eu2]]).
- Solutions of the homogeneous equation form a vector space (superposition) of dimension exactly two ([[#thm-superposition]], [[#cor-wronskian]]).
- The Wronskian $W = y_1y_2' - y_1'y_2$ of two solutions satisfies Abel's identity $W(t) = W(t_0)e^{-\int p}$; it is either never zero (fundamental set) or identically zero (dependent).
- For $ay'' + by' + cy = 0$, the roots of $ar^2 + br + c = 0$ give $e^{r_1t}, e^{r_2t}$; or $e^{rt}, te^{rt}$; or $e^{\lambda t}\cos\mu t, e^{\lambda t}\sin\mu t$ ([[#thm-constant]]).
- Given one non-vanishing solution $y_1$, reduction of order gives $y_2 = y_1\int e^{-\int p}/y_1^2$; Cauchy–Euler equations are solved with $t^r$.
- A damped spring is overdamped, critically damped or underdamped as $c^2 - 4mk$ is positive, zero or negative; with $c > 0$ energy decreases and all motion dies out.
:::

## Exercises

::: exercise Distinct roots {level=1 check="12"}
Solve $y'' - 5y' + 6y = 0$, $y(0) = 1$, $y'(0) = 4$, and evaluate $y(\ln 2)$.
::: solution
$r^2 - 5r + 6 = (r-2)(r-3)$, so $y = c_1e^{2t} + c_2e^{3t}$ with $c_1 + c_2 = 1$ and $2c_1 + 3c_2 = 4$. Hence $c_2 = 2$, $c_1 = -1$, and $y = -e^{2t} + 2e^{3t}$. At $t = \ln 2$: $y = -4 + 2\cdot 8 = 12$.
:::
:::

::: exercise A Wronskian {level=1 check="3"}
Compute $W[\cos 3t, \sin 3t]$. Which equation do these functions solve, and is the answer consistent with Abel's identity?
::: solution
$W = \cos3t\cdot3\cos3t - (-3\sin3t)\sin3t = 3(\cos^2 3t + \sin^2 3t) = 3$. Both functions solve $y'' + 9y = 0$, for which $p = 0$, so Abel's identity predicts a constant Wronskian — as found.
:::
:::

::: exercise Amplitude {level=1 check="sqrt(5)"}
Solve $y'' + 9y = 0$, $y(0) = 2$, $y'(0) = -3$, and find the amplitude of the oscillation.
::: solution
$y = A\cos 3t + B\sin 3t$ with $A = 2$ and $3B = -3$, so $y = 2\cos3t - \sin3t$. The amplitude is $R = \sqrt{2^2 + (-1)^2} = \sqrt5$. (In phase form, $y = \sqrt5\cos(3t - \delta)$ with $\cos\delta = 2/\sqrt5 > 0$ and $\sin\delta = -1/\sqrt5 < 0$, so $\delta = -\arctan\frac12$.)
:::
:::

::: exercise A Cauchy–Euler equation {level=1 check="5/3"}
Solve $t^2y'' - 2y = 0$, $y(1) = 1$, $y'(1) = 0$ on $t > 0$, and evaluate $y(2)$.
::: solution
The indicial equation $r(r-1) - 2 = r^2 - r - 2 = (r-2)(r+1) = 0$ gives $y = c_1t^2 + c_2t^{-1}$. Then $c_1 + c_2 = 1$ and $2c_1 - c_2 = 0$, so $c_1 = \frac13$, $c_2 = \frac23$, and $y = \frac{t^2}{3} + \frac{2}{3t}$. Thus $y(2) = \frac43 + \frac13 = \frac53$.
:::
:::

::: exercise Abel's identity without solving {level=2 check="1/2"}
Let $y_1, y_2$ be solutions of $t\,y'' + 2y' + te^{t}y = 0$ on $t > 0$ with $W[y_1,y_2](1) = 2$. Find $W[y_1,y_2](2)$.
::: solution
In standard form $p(t) = 2/t$, so by [[#thm-abel]], $W(t) = W(1)\exp\bigl(-\int_1^t \frac2s\,ds\bigr) = 2t^{-2}$. Hence $W(2) = \frac12$. We never needed the solutions themselves — which is fortunate, since they are not elementary functions.
:::
:::

::: exercise Reduction of order {level=2}
Verify that $y_1 = e^t$ solves $t\,y'' - (t+1)\,y' + y = 0$ on $t > 0$, and find a second, independent solution.
::: solution
$L[e^t] = te^t - (t+1)e^t + e^t = 0$. In standard form $p = -\frac{t+1}{t} = -1 - \frac1t$, so $e^{-\int p} = e^{t + \ln t} = te^t$. By [[#eq-reduction]],

$$
y_2 = e^t\int\frac{te^t}{e^{2t}}\,dt = e^t\int te^{-t}\,dt = e^t\bigl(-(t+1)e^{-t}\bigr) = -(t + 1).
$$

So $y_2 = t + 1$ (dropping the sign) is a second solution; check: $t\cdot 0 - (t+1)\cdot1 + (t+1) = 0$. The general solution is $c_1e^t + c_2(t+1)$.
:::
:::

::: exercise Critical damping {level=2 check="6"}
A mass of $1$ kg hangs on a spring of stiffness $9$ N/m. What damping coefficient $c$ makes the system critically damped? For this $c$, solve the IVP $x(0) = 1$, $x'(0) = 0$ and find the maximum of $\lvert x\rvert$ for $t \ge 0$.
::: solution
Critical damping requires $c^2 = 4mk = 36$, so $c = 6$. Then $r^2 + 6r + 9 = (r+3)^2$ and $x = (c_1 + c_2t)e^{-3t}$ with $c_1 = 1$ and $c_2 - 3c_1 = 0$: $x = (1 + 3t)e^{-3t}$. For $t > 0$, $x' = -9te^{-3t} < 0$, so $x$ decreases from $1$ towards $0$ without crossing it, and $\max\lvert x\rvert = 1$, attained at $t = 0$.
:::
:::

::: exercise A common zero {level=3}
Let $y_1, y_2$ be solutions of $y'' + p(t)y' + q(t)y = 0$ on $I$ (with $p, q$ continuous) that vanish at the same point $t_0\in I$. Prove that they are linearly dependent. Deduce that $\sin t$ and $\sin 2t$ cannot both solve such an equation on any interval containing $0$.
::: solution
$W(t_0) = y_1(t_0)y_2'(t_0) - y_1'(t_0)y_2(t_0) = 0 - 0 = 0$, so by [[#cor-wronskian]] they are dependent. Since $\sin t$ and $\sin 2t$ both vanish at $0$ but are not proportional on any interval around $0$ (their ratio $2\cos t$ is not constant), they cannot be solutions of one such equation with coefficients continuous on an interval containing $0$.
:::
:::

::: exercise Sturm's separation theorem {level=3}
Let $y_1, y_2$ be linearly independent solutions of $y'' + p(t)y' + q(t)y = 0$ on $I$, and let $a < b$ be consecutive zeros of $y_1$ in $I$. Prove that $y_2$ has exactly one zero in $(a,b)$. (The zeros of independent solutions **interlace**, as those of $\sin t$ and $\cos t$ do.)
::: hint
$W$ has constant sign. Evaluate it at $a$ and $b$, and compare the signs of $y_1'(a)$ and $y_1'(b)$.
:::
::: solution
By [[#cor-wronskian]], $W = y_1y_2' - y_1'y_2$ never vanishes on $I$, so it has constant sign. At a zero of $y_1$, $W = -y_1'y_2$; hence $y_1'(a)$, $y_1'(b)$, $y_2(a)$, $y_2(b)$ are all non-zero. Since $y_1$ has no zeros in $(a,b)$, it has constant sign there, say positive; then $y_1'(a) > 0$ and $y_1'(b) < 0$ (they are non-zero, and $y_1$ rises from $0$ at $a$ and falls to $0$ at $b$). From $W(a) = -y_1'(a)y_2(a)$ and $W(b) = -y_1'(b)y_2(b)$ having the same sign, $y_2(a)$ and $y_2(b)$ have opposite signs, so by the intermediate value theorem $y_2$ has a zero in $(a,b)$.

If $y_2$ had two zeros in $(a,b)$, the same argument with the roles of $y_1, y_2$ exchanged would give a zero of $y_1$ strictly between them, contradicting the fact that $a, b$ are consecutive zeros of $y_1$. So $y_2$ has exactly one zero in $(a,b)$.
:::
:::

::: exercise Wronskian zero but independent {level=3}
Let $y_1(t) = t^3$ and $y_2(t) = \lvert t\rvert^3$. Show that both are twice continuously differentiable on $\R$, that $W[y_1,y_2]\equiv 0$, but that $y_1, y_2$ are linearly independent on $\R$. Explain why this does not contradict [[#cor-wronskian]].
::: solution
For $t \ge 0$, $y_2 = t^3$, and for $t \le 0$, $y_2 = -t^3$; so $y_2' = 3t\lvert t\rvert$ and $y_2'' = 6\lvert t\rvert$, which are continuous. On $t \ge 0$ the functions coincide, so $W = 0$; on $t \le 0$, $y_2 = -y_1$, so again $W = 0$. Hence $W \equiv 0$. But if $c_1t^3 + c_2\lvert t\rvert^3 \equiv 0$ on $\R$, then $t = 1$ gives $c_1 + c_2 = 0$ and $t = -1$ gives $-c_1 + c_2 = 0$, so $c_1 = c_2 = 0$: they are independent on $\R$.

There is no contradiction, because [[#cor-wronskian]] is about *solutions* of an equation $y'' + py' + qy = 0$ with $p, q$ continuous on $\R$. Indeed, $y_1$ and $y_2$ cannot both solve such an equation: they would both satisfy $y(0) = y'(0) = 0$, so by uniqueness both would be identically zero. (They do both solve $t^2y'' - 4ty' + 6y = 0$, whose standard form is singular at $t = 0$.)
:::
:::
