Every separation of variables so far has led to the same small eigenvalue problem, $X'' + \lambda X = 0$ with some boundary conditions, and every time the eigenfunctions turned out to be orthogonal, so that we could expand the initial data in them. Was that luck? Real problems quickly leave the world of sines and cosines. A rod whose conductivity or density varies along its length, a rod that loses heat at its end by Newton's law of cooling, a drum (which leads to Bessel functions) or a sphere (Legendre functions) all lead to eigenvalue problems of the form

$$
\bigl(p(x)\,y'\bigr)' - q(x)\,y + \lambda\,w(x)\,y = 0
$$

with boundary conditions at the two ends. In 1836–37 Charles-François Sturm and Joseph Liouville showed that, under mild conditions on $p$, $q$ and $w$, such problems always behave like the sine series: the eigenvalues are real and form an increasing sequence tending to infinity, the eigenfunctions are orthogonal (with a weight), the $n$th eigenfunction wiggles exactly $n - 1$ times, and every reasonable function can be expanded in them.

The reason is the same as for symmetric matrices in [[linear-algebra/spectral-theorem]]: the differential operator is **self-adjoint** with respect to a suitable inner product. In this chapter we set up the theory, prove the algebraic facts (real eigenvalues, orthogonality, simplicity, the Rayleigh quotient) in full, state the deeper existence and completeness theorem with a sketch of its proof, and work through problems in which the eigenvalues are no longer given by a formula.

## Sturm–Liouville problems

Where does the general equation come from? Consider heat flow in a rod whose specific heat $c(x)$, density $\rho(x)$ and conductivity $K(x)$ vary with position. The derivation of [[pde/heat-equation]] goes through unchanged until the last step and gives

$$
c(x)\rho(x)\,u_t = \bigl(K(x)\,u_x\bigr)_x.
$$

Separating $u = X(x)T(t)$ gives $T' = -\lambda T$ and $(KX')' + \lambda c\rho X = 0$. This is the equation above with $p = K$, $q = 0$ and **weight** $w = c\rho$. A term $-qX$ appears if the rod also loses heat through its sides at a rate proportional to its temperature.

::: definition Regular Sturm–Liouville problem {#def-sl}
A **regular Sturm–Liouville problem** on a bounded interval $[a, b]$ consists of the equation

$$
\bigl(p(x)y'\bigr)' - q(x)\,y + \lambda\,w(x)\,y = 0, \qquad a < x < b,
$$ {#eq-sl}

where $p$, $p'$, $q$, $w$ are real and continuous on $[a, b]$ and $p > 0$, $w > 0$ on $[a, b]$, together with **separated boundary conditions**

$$
\alpha_1y(a) + \alpha_2y'(a) = 0, \qquad \beta_1y(b) + \beta_2y'(b) = 0,
$$ {#eq-sl-bc}

with real constants such that $(\alpha_1, \alpha_2) \ne (0,0)$ and $(\beta_1,\beta_2)\ne(0,0)$. A number $\lambda$ (real or complex) for which there is a solution $y \not\equiv 0$ is an **eigenvalue**, and $y$ is a corresponding **eigenfunction**.
:::

The separated conditions include Dirichlet ($\alpha_2 = 0$), Neumann ($\alpha_1 = 0$) and Robin conditions at each end. It is convenient to write the equation as $Ly = \lambda wy$, with the **Sturm–Liouville operator**

$$
Ly = -(py')' + qy.
$$

::: remark Every second-order equation can be put in this form
If $a_2(x)y'' + a_1(x)y' + a_0(x)y + \lambda a_3(x)y = 0$ with $a_2 > 0$, multiply by $\mu = \frac{1}{a_2}e^{\int a_1/a_2}$. With $p = e^{\int a_1/a_2}$ one checks that $\mu a_2y'' + \mu a_1y' = (py')'$, so the equation becomes [[#eq-sl]] with $q = -\mu a_0$ and $w = \mu a_3$. For example, the Cauchy–Euler equation $x^2y'' + xy' + \lambda y = 0$ on $[1, b]$ becomes $(xy')' + \frac{\lambda}{x}y = 0$: here $p = x$, $q = 0$ and $w = \frac1x$.
:::

::: quiz
Which of the following are **regular** Sturm–Liouville problems? Select all that apply.
- [x] $y'' + \lambda y = 0$ on $[0,1]$ with $y(0) = 0$, $y'(1) + 2y(1) = 0$
- [x] $(e^xy')' + \lambda e^xy = 0$ on $[0,1]$ with $y(0) = y(1) = 0$
- [ ] $\bigl((1 - x^2)y'\bigr)' + \lambda y = 0$ on $[-1, 1]$, with $y$ bounded
- [ ] $y'' + \lambda y = 0$ on $[0,1]$ with $y(0) = y(1)$, $y'(0) = y'(1)$
::: solution
The first two have $p > 0$, $w > 0$ continuous on the closed interval and separated boundary conditions. Legendre's equation has $p = 1 - x^2$, which vanishes at both endpoints, so it is a **singular** problem (treated at the end of the chapter). The last problem has **periodic** boundary conditions, which link the two ends and are not separated; such problems share most, but not all, of the properties below.
:::
:::

## Self-adjointness

The whole theory rests on an integration-by-parts identity.

::: lemma Lagrange's identity and Green's formula {#lem-green}
For twice continuously differentiable functions $u$, $v$ on $[a, b]$ (real or complex valued),

$$
u\,Lv - v\,Lu = \frac{d}{dx}\Bigl[p\bigl(u'v - uv'\bigr)\Bigr],
$$

and consequently

$$
\int_a^b\bigl(u\,Lv - v\,Lu\bigr)\,dx = \Bigl[p\bigl(u'v - uv'\bigr)\Bigr]_a^b.
$$ {#eq-green}

If $u$ and $v$ both satisfy the boundary conditions [[#eq-sl-bc]], the right-hand side is zero.
:::

::: proof
Expanding with the product rule,

$$
u\,Lv - v\,Lu = -u(pv')' + v(pu')' = -\bigl(upv'\bigr)' + u'pv' + \bigl(vpu'\bigr)' - v'pu' = \bigl(p(u'v - uv')\bigr)',
$$

and integrating gives [[#eq-green]]. Now suppose both functions satisfy the condition at $x = a$: $\alpha_1u(a) + \alpha_2u'(a) = 0$ and $\alpha_1v(a) + \alpha_2v'(a) = 0$. Then the linear system

$$
\begin{pmatrix} u(a) & u'(a)\\ v(a) & v'(a)\end{pmatrix}\begin{pmatrix}\alpha_1\\ \alpha_2\end{pmatrix} = \begin{pmatrix}0\\0\end{pmatrix}
$$

has a non-zero solution, so its determinant $u(a)v'(a) - u'(a)v(a)$ vanishes. The same argument at $x = b$ shows that both boundary terms vanish.
:::

In terms of the inner products $\inner{f}{g} = \int_a^bfg\,dx$ and $\inner{f}{g}_w = \int_a^bf(x)g(x)w(x)\,dx$, the lemma says that

$$
\inner{Lu}{v} = \inner{u}{Lv}
$$

for all $C^2$ functions satisfying the boundary conditions: $L$ is **symmetric** (self-adjoint), just as a symmetric matrix $A$ satisfies $Au\cdot v = u\cdot Av$. The boundary conditions are part of the operator; without them the boundary term would not vanish.

## Eigenvalues and eigenfunctions

::: theorem Basic properties of the eigenvalues {#thm-sl-basic}
For a regular Sturm–Liouville problem:

1. every eigenvalue is real;
2. eigenfunctions $y_m$, $y_n$ belonging to different eigenvalues are **orthogonal with weight** $w$:

$$
\inner{y_m}{y_n}_w = \int_a^by_m(x)\,y_n(x)\,w(x)\,dx = 0;
$$

3. every eigenvalue is **simple**: any two eigenfunctions for the same eigenvalue are multiples of each other, and the eigenfunction can be chosen real-valued.
:::

::: proof
1. Let $Ly = \lambda wy$ with $y\not\equiv0$, possibly complex. Since $p$, $q$, $w$ and the constants in [[#eq-sl-bc]] are real, taking complex conjugates gives $L\bar y = \bar\lambda w\bar y$, and $\bar y$ satisfies the boundary conditions. Green's formula [[#eq-green]] with $u = \bar y$, $v = y$ gives

$$
0 = \int_a^b\bigl(\bar y\,Ly - y\,L\bar y\bigr)\,dx = (\lambda - \bar\lambda)\int_a^bw\abs{y}^2\,dx.
$$

The integral is positive because $w > 0$ and $y$ is continuous and not identically zero. Hence $\lambda = \bar\lambda$.

2. If $Ly_m = \lambda_mwy_m$ and $Ly_n = \lambda_nwy_n$, Green's formula gives $0 = \int_a^b(y_m\,Ly_n - y_n\,Ly_m)\,dx = (\lambda_n - \lambda_m)\int_a^by_my_nw\,dx$. Since $\lambda_m \ne \lambda_n$, the integral vanishes.

3. Let $y_1$, $y_2$ be eigenfunctions for the same $\lambda$. Both satisfy the condition at $a$, so, exactly as in the proof of [[#lem-green]], the vectors $\bigl(y_1(a), y_1'(a)\bigr)$ and $\bigl(y_2(a), y_2'(a)\bigr)$ are linearly dependent: there are constants $c_1, c_2$, not both zero, with $y = c_1y_1 + c_2y_2$ satisfying $y(a) = y'(a) = 0$. But $y$ solves the linear equation $(py')' + (\lambda w - q)y = 0$, which can be written $y'' = -\frac{p'}{p}y' - \frac{\lambda w - q}{p}y$ with continuous coefficients, and the only solution with $y(a) = y'(a) = 0$ is $y \equiv 0$ ([[ode/existence-uniqueness]]). So $c_1y_1 + c_2y_2 \equiv 0$. Finally, since $\lambda$ is real, the real and imaginary parts of a complex eigenfunction are solutions satisfying the boundary conditions, and at least one of them is not identically zero.
:::

The next proposition explains why, in all our examples, the eigenvalues have been non-negative.

::: proposition The Rayleigh quotient {#prop-rayleigh}
If $y$ is an eigenfunction with eigenvalue $\lambda$, then

$$
\lambda = \frac{-\bigl[p\,y\,y'\bigr]_a^b + \displaystyle\int_a^b\bigl(p\,(y')^2 + q\,y^2\bigr)\,dx}{\displaystyle\int_a^bw\,y^2\,dx}.
$$ {#eq-rayleigh}

Consequently, if $q \ge 0$ on $[a,b]$ and the boundary conditions satisfy $\alpha_1\alpha_2 \le 0$ and $\beta_1\beta_2 \ge 0$, then every eigenvalue is $\ge 0$; and $\lambda = 0$ can occur only if $q\equiv0$ and the constant function satisfies the boundary conditions.
:::

::: proof
Multiply $(py')' - qy + \lambda wy = 0$ by $y$ and integrate, integrating the first term by parts:

$$
\bigl[p\,y\,y'\bigr]_a^b - \int_a^bp\,(y')^2\,dx - \int_a^bq\,y^2\,dx + \lambda\int_a^bw\,y^2\,dx = 0,
$$

which rearranges to [[#eq-rayleigh]]. For the sign: if $\alpha_2 \ne 0$, the condition at $a$ gives $y'(a) = -\frac{\alpha_1}{\alpha_2}y(a)$, so $p(a)y(a)y'(a) = -\frac{\alpha_1\alpha_2}{\alpha_2^2}p(a)y(a)^2 \ge 0$; if $\alpha_2 = 0$, then $y(a) = 0$ and the term is $0$. Similarly $-p(b)y(b)y'(b) = \frac{\beta_1\beta_2}{\beta_2^2}p(b)y(b)^2 \ge 0$ (or $0$). So the numerator is a sum of non-negative terms and $\lambda \ge 0$. If $\lambda = 0$, every term vanishes; in particular $\int p(y')^2 = 0$ forces $y' \equiv 0$, so $y$ is a non-zero constant, and then $\int qy^2 = 0$ forces $q \equiv 0$.
:::

For the Neumann problem $y'' + \lambda y = 0$, $y'(0) = y'(L) = 0$, the constant is indeed an eigenfunction with $\lambda = 0$; for Dirichlet or Robin conditions with $h > 0$ it is not, and all eigenvalues are strictly positive.

The algebraic facts do not tell us that eigenvalues exist at all, or that there are enough eigenfunctions to expand an arbitrary function. That is the content of the main theorem.

::: theorem Sturm–Liouville theorem {#thm-sl-main}
For a regular Sturm–Liouville problem:

1. The eigenvalues form an infinite sequence $\lambda_1 < \lambda_2 < \lambda_3 < \cdots$ with $\lambda_n\to\infty$; asymptotically $\lambda_n/n^2 \to \pi^2\big/\bigl(\int_a^b\sqrt{w/p}\,dx\bigr)^2$.
2. **Oscillation:** the eigenfunction $y_n$ belonging to $\lambda_n$ has exactly $n - 1$ zeros in the open interval $(a, b)$.
3. **Completeness:** let $f$ be piecewise smooth on $[a, b]$, and define its **eigenfunction expansion** $\sum_n c_ny_n$ with

$$
c_n = \frac{\inner{f}{y_n}_w}{\inner{y_n}{y_n}_w} = \frac{\int_a^bf\,y_n\,w\,dx}{\int_a^by_n^2\,w\,dx}.
$$ {#eq-sl-coeffs}

Then the expansion converges to $\frac12\bigl(f(x^+) + f(x^-)\bigr)$ at every $x\in(a,b)$. For every piecewise continuous $f$ it converges in the weighted mean square, and Parseval's identity $\int_a^bf^2w\,dx = \sum_nc_n^2\int_a^by_n^2w\,dx$ holds.
:::

::: proof {collapsed}
*Sketch.* The full proof is longer than this chapter; see Coddington and Levinson, *Theory of Ordinary Differential Equations*, chapters 7–8, or Birkhoff and Rota, *Ordinary Differential Equations*, chapters 10–11. The two main ideas are as follows.

*Existence and completeness* come from turning the differential equation into an integral equation. Shifting $\lambda$ if necessary, we may assume $0$ is not an eigenvalue. Then for each continuous $g$ the boundary value problem $Ly = g$ has a unique solution, given by $y(x) = \int_a^bG(x,s)\,g(s)\,ds$, where the **Green's function** $G$ is continuous and, because $L$ is self-adjoint, symmetric: $G(x,s) = G(s,x)$. The eigenvalue problem $Ly = \lambda wy$ becomes $y = \lambda\int_a^bG(x,s)w(s)y(s)\,ds$, an eigenvalue problem for an integral operator $K$ that is compact and self-adjoint on the space of functions with the inner product $\inner\cdot\cdot_w$. The spectral theorem for compact self-adjoint operators — the infinite-dimensional analogue of [[linear-algebra/spectral-theorem]] — provides an orthonormal sequence of eigenfunctions of $K$, with eigenvalues $\mu_n = 1/\lambda_n \to 0$, that spans the range of $K$; since that range is dense, the eigenfunctions are complete in the mean-square sense. Pointwise convergence for piecewise smooth $f$ follows by comparing the eigenfunction expansion with an ordinary Fourier series ("equiconvergence").

*Oscillation and ordering* come from Sturm's comparison theorem: if $y$ and $z$ solve $(py')' + Q_1y = 0$ and $(pz')' + Q_2z = 0$ with $Q_2 > Q_1$, then $z$ has a zero strictly between any two consecutive zeros of $y$. Increasing $\lambda$ increases $Q = \lambda w - q$, so solutions oscillate faster; following the solution with the initial condition at $a$ as $\lambda$ increases, each time a new zero enters through $b$ in the right way, the boundary condition at $b$ is met once — producing exactly one eigenvalue for each number of interior zeros. The **Prüfer substitution** $py' = r\cos\theta$, $y = r\sin\theta$ turns this into a first-order equation for the angle $\theta$, which makes the counting rigorous.
:::

So the sine series is the prototype, not an exception. Expansions in Sturm–Liouville eigenfunctions are called **generalised Fourier series**, and everything proved for Fourier series in [[pde/fourier-series]] about best approximation and Bessel's inequality carries over word for word to the weighted inner product $\inner\cdot\cdot_w$, because those proofs used nothing but orthogonality.

::: intuition Why the zeros count the eigenvalues
Locally, $(py')' + \lambda wy = 0$ looks like $y'' + \frac{\lambda w}{p}y = 0$, which oscillates with local wavelength $2\pi\sqrt{p/(\lambda w)}$. Larger $\lambda$ means faster oscillation, so more wiggles fit between $a$ and $b$. The boundary conditions can be met only when the solution has completed just the right amount of oscillation, which happens once for each number of interior zeros — exactly as $\sin\frac{n\pi x}{L}$ has $n - 1$ interior zeros. The asymptotic formula in [[#thm-sl-main]] says that for large $n$ the problem behaves like a sine series in the "travel time" variable $\int\sqrt{w/p}\,dx$.
:::

::: remark The Rayleigh–Ritz principle
Combining [[#eq-rayleigh]] with completeness gives a variational characterisation of the lowest eigenvalue: for Dirichlet conditions,

$$
\lambda_1 = \min\left\{\frac{\int_a^b\bigl(p(y')^2 + qy^2\bigr)\,dx}{\int_a^bwy^2\,dx} : y\in C^1[a,b],\ y(a) = y(b) = 0,\ y\not\equiv0\right\},
$$

the minimum being attained at $y = y_1$. (Expand $y = \sum c_ny_n$; the quotient becomes $\sum\lambda_nc_n^2\norm{y_n}_w^2\big/\sum c_n^2\norm{y_n}_w^2 \ge \lambda_1$.) Any trial function therefore gives an **upper bound** for $\lambda_1$, and a good guess gives a very good bound. This is the basis of the Ritz method and of finite element methods.
:::

::: example Estimating a fundamental frequency {#ex-ritz}
A non-uniform rod leads to the problem $-\bigl((1 + x)y'\bigr)' = \lambda y$ on $[0, 1]$ with $y(0) = y(1) = 0$. Use the trial function $\sin\pi x$ to bound $\lambda_1$ from above, and compare with the exact value.
::: solution
Here $p = 1 + x$, $q = 0$, $w = 1$. For $y = \sin\pi x$,

$$
\int_0^1(1 + x)\pi^2\cos^2\pi x\,dx = \pi^2\left(\frac12 + \int_0^1x\,\frac{1 + \cos2\pi x}{2}\,dx\right) = \pi^2\left(\frac12 + \frac14 + 0\right) = \frac{3\pi^2}{4},
$$

since $\int_0^1x\cos2\pi x\,dx = 0$, while $\int_0^1\sin^2\pi x\,dx = \frac12$. So the Rayleigh–Ritz principle gives $\lambda_1 \le \frac{3\pi^2}{2} \approx 14.80$. On the other hand, since $p \ge 1$, the exercises below give $\lambda_1 \ge \pi^2 \approx 9.87$. The exact value can be found by substituting $s = 1 + x$, which turns the equation into $(sy')' + \lambda y = 0$, solved by Bessel functions of $2\sqrt{\lambda s}$; numerically $\lambda_1 \approx 14.338$. The crude trial function is only $3\%$ too high: because the Rayleigh quotient is stationary at an eigenfunction, a first-order error in the trial function causes only a second-order error in the eigenvalue.
:::
:::

## Examples

### A Robin condition: eigenvalues without a formula

::: example A rod cooling at one end {#ex-robin}
Find the eigenvalues and eigenfunctions of

$$
y'' + \lambda y = 0, \qquad y(0) = 0, \qquad y'(1) + h\,y(1) = 0 \qquad (h > 0).
$$

The condition at $x = 1$ describes an end losing heat to surroundings at temperature $0$ by Newton's law of cooling, with heat transfer coefficient $h$.
::: solution
Here $p = w = 1$, $q = 0$, $\alpha_1\alpha_2 = 1\cdot 0 = 0$ and $\beta_1\beta_2 = h > 0$, so by [[#prop-rayleigh]] all eigenvalues are $\ge 0$, and $\lambda = 0$ is impossible (the constant does not satisfy $y(0) = 0$). For $\lambda = \mu^2 > 0$ the condition $y(0) = 0$ gives $y = \sin\mu x$, and the condition at $1$ becomes

$$
\mu\cos\mu + h\sin\mu = 0, \qquad\text{that is}\qquad \tan\mu = -\frac{\mu}{h}.
$$

This transcendental equation has no closed-form solutions, but the graphs of $\tan\mu$ and $-\mu/h$ show exactly one root $\mu_n$ in each interval $\bigl((n - \tfrac12)\pi, n\pi\bigr)$, $n = 1, 2, \dots$: on that interval $\tan\mu$ increases from $-\infty$ to $0$ while $-\mu/h$ is negative and decreasing. So $\lambda_n = \mu_n^2$ with $(n-\tfrac12)^2\pi^2 < \lambda_n < n^2\pi^2$, and $\mu_n - (n - \frac12)\pi \to 0$ as $n\to\infty$. For $h = 1$, solving numerically (by bisection or Newton's method, [[numerical-analysis/root-finding]]),

$$
\mu_1 \approx 2.0288,\quad \mu_2 \approx 4.9132,\quad \mu_3 \approx 7.9787,\quad \mu_4\approx 11.0855,
$$

so $\lambda_1 \approx 4.116$, $\lambda_2\approx 24.14$, $\lambda_3 \approx 63.66$. The eigenfunctions $\sin\mu_nx$ are orthogonal on $[0, 1]$ by [[#thm-sl-basic]], which is far from obvious directly, since the $\mu_n$ are not multiples of a common number. Their squared norms are

$$
\int_0^1\sin^2\mu_nx\,dx = \frac12 - \frac{\sin2\mu_n}{4\mu_n} = \frac12\left(1 + \frac{\cos^2\mu_n}{h}\right),
$$

where we used $\sin\mu_n\cos\mu_n = \tan\mu_n\cos^2\mu_n = -\frac{\mu_n}{h}\cos^2\mu_n$.
:::
:::

::: widget plot
f: tan(x); -x/h
x: 0, 15
y: -12, 12
sliders: h=1:0.1:5:0.1
labels: \tan\mu; -\mu/h
caption: The eigenvalue equation $\tan\mu = -\mu/h$ of [[#ex-robin]] (the horizontal axis is $\mu$). Each branch of $\tan\mu$ between $(n-\tfrac12)\pi$ and $n\pi$ crosses the line once, at $\mu_n$. Move the slider: as $h \to 0$ (an insulated end) the crossings move to $(n - \tfrac12)\pi$, and as $h\to\infty$ (an end held at $0$) they move up to $n\pi$. For large $n$ the crossings approach the asymptotes, whatever $h$ is.
:::

::: example Heat loss at one end {#ex-robin-heat}
A rod $0 \le x \le 1$ with $k = 1$ has its left end held at $0$ and its right end cooling by Newton's law, $u_x(1,t) + u(1,t) = 0$. Initially $u(x, 0) = 1$. Find $u(x,t)$ and its decay rate.
::: solution
Separation of variables leads to the eigenvalue problem of [[#ex-robin]] with $h = 1$, so

$$
u(x,t) = \sum_{n=1}^\infty c_n\,e^{-\mu_n^2t}\sin\mu_nx.
$$

By [[#eq-sl-coeffs]] with $w = 1$,

$$
c_n = \frac{\int_0^1\sin\mu_nx\,dx}{\int_0^1\sin^2\mu_nx\,dx} = \frac{(1 - \cos\mu_n)/\mu_n}{\frac12\left(1 + \cos^2\mu_n\right)},
$$

which gives $c_1 \approx 1.189$, $c_2 \approx 0.313$, $c_3 \approx 0.278$. (As a check, summing a few thousand terms at $x = \frac12$ gives $1.000$, as completeness promises.) For large $t$, $u \approx 1.189\,e^{-4.116\,t}\sin(2.029\,x)$. The decay rate $\mu_1^2 \approx 4.12$ lies between the rate $\pi^2/4 \approx 2.47$ for a perfectly insulated right end and $\pi^2 \approx 9.87$ for a right end held at $0$, as it should for a partially insulating end.
:::
:::

### A Cauchy–Euler problem

::: example Eigenfunctions with a weight {#ex-euler}
Solve the eigenvalue problem $x^2y'' + xy' + \lambda y = 0$ on $[1, b]$ with $y(1) = y(b) = 0$ (where $b > 1$), and verify the orthogonality relation.
::: solution
In Sturm–Liouville form the equation is $(xy')' + \frac\lambda xy = 0$, so $p = x$, $q = 0$, $w = \frac1x$; both conditions are Dirichlet, so $\lambda > 0$ by [[#prop-rayleigh]]. Trying $y = x^m$ gives $m^2 + \lambda = 0$, so $m = \pm i\mu$ with $\mu = \sqrt\lambda$, and $x^{\pm i\mu} = e^{\pm i\mu\ln x}$. The real solutions are $\cos(\mu\ln x)$ and $\sin(\mu\ln x)$. The condition $y(1) = 0$ selects $\sin(\mu\ln x)$, and $y(b) = 0$ requires $\mu\ln b = n\pi$. Hence

$$
\lambda_n = \left(\frac{n\pi}{\ln b}\right)^2, \qquad y_n(x) = \sin\left(\frac{n\pi\ln x}{\ln b}\right), \qquad n = 1, 2, \dots
$$

The substitution $t = \ln x$, $dt = dx/x$, turns the weighted inner product into an ordinary one:

$$
\int_1^by_m(x)y_n(x)\frac{dx}{x} = \int_0^{\ln b}\sin\frac{m\pi t}{\ln b}\sin\frac{n\pi t}{\ln b}\,dt = \begin{cases} 0 & m\ne n,\\ \frac{\ln b}{2} & m = n,\end{cases}
$$

confirming [[#thm-sl-basic]]. Each $y_n$ has $n - 1$ zeros in $(1,b)$, at $x = b^{j/n}$, as [[#thm-sl-main]] predicts — but they are spaced geometrically, not evenly. Here $\int_1^b\sqrt{w/p}\,dx = \int_1^b\frac{dx}{x} = \ln b$, and the asymptotic formula of [[#thm-sl-main]] is exact.
:::
:::

::: widget plot
f: sin(n*pi*ln(x)/ln(10))
x: 1, 10
y: -1.2, 1.2
sliders: n=1:1:8:1
labels: y_n(x) = \sin\left(n\pi\ln x/\ln 10\right)
caption: The eigenfunctions of [[#ex-euler]] with $b = 10$. Step through $n$: $y_n$ has exactly $n-1$ zeros inside $(1, 10)$, as the oscillation theorem says, but they crowd towards $x = 1$. The local wavelength is proportional to $\sqrt{p/w} = x$, so the eigenfunctions oscillate fastest where $p$ is small and the weight $w$ is large.
:::

::: quiz
Using [[#thm-sl-main]], how many zeros does the eigenfunction belonging to the fourth eigenvalue $\lambda_4$ of [[#ex-robin]] have in the open interval $(0, 1)$?
- [ ] $4$
- [x] $3$
- [ ] $2$
- [ ] It depends on $h$.
::: solution
The $n$th eigenfunction has exactly $n - 1$ interior zeros, whatever the (separated) boundary conditions, so $y_4 = \sin\mu_4x$ has $3$. Directly: $\mu_4 \in (3.5\pi, 4\pi)$, so $\mu_4x$ runs through $(0, \mu_4)$, which contains the three multiples $\pi, 2\pi, 3\pi$ but not $4\pi$.
:::
:::

## Singular problems and special functions

Many important problems violate the hypotheses of [[#def-sl]] at an endpoint: $p$ vanishes there, or the interval is infinite. They are called **singular** Sturm–Liouville problems. Typically the boundary condition at a singular endpoint is replaced by the requirement that the solution stays **bounded**, and much of the theory survives. Two examples, met in [[ode/series-solutions]], are central to mathematical physics.

- **Legendre's equation** $\bigl((1 - x^2)y'\bigr)' + \lambda y = 0$ on $[-1, 1]$ has $p = 1 - x^2$ vanishing at both ends. Bounded solutions exist only for $\lambda = n(n+1)$, $n = 0, 1, 2, \dots$, and they are the Legendre polynomials $P_0 = 1$, $P_1 = x$, $P_2 = \frac12(3x^2 - 1)$, …, orthogonal on $[-1,1]$ with weight $1$. They arise from Laplace's equation in spherical coordinates.
- **Bessel's equation** $(xy')' - \frac{\nu^2}{x}y + \lambda xy = 0$ on $[0, a]$ with $y(a) = 0$ and $y$ bounded at $0$, where $p = x$ vanishes at $0$. The eigenfunctions are $J_\nu(\sqrt{\lambda}\,x)$, with $\sqrt{\lambda_k}\,a$ the positive zeros of the Bessel function $J_\nu$, and they are orthogonal with weight $x$. They describe the vibrations of a circular drum and heat flow in a cylinder.

::: example A Legendre expansion {#ex-legendre}
Check that $P_2(x) = \frac12(3x^2 - 1)$ satisfies Legendre's equation $\bigl((1 - x^2)y'\bigr)' + \lambda y = 0$ with $\lambda = 6$, and expand $f(x) = x^2$ in Legendre polynomials.
::: solution
$P_2' = 3x$, so $\bigl((1 - x^2)\cdot 3x\bigr)' = 3 - 9x^2 = -6\cdot\frac12(3x^2 - 1)$, which gives $\bigl((1-x^2)P_2'\bigr)' + 6P_2 = 0$; and $6 = n(n+1)$ with $n = 2$. Since $x^2$ is an even polynomial of degree $2$, only $P_0 = 1$ and $P_2$ can appear (the odd $P_1 = x$ is orthogonal to it). With weight $w = 1$,

$$
c_0 = \frac{\int_{-1}^1x^2\,dx}{\int_{-1}^11\,dx} = \frac{2/3}{2} = \frac13, \qquad c_2 = \frac{\int_{-1}^1x^2P_2\,dx}{\int_{-1}^1P_2^2\,dx} = \frac{\frac12\left(\frac65 - \frac23\right)}{\frac25} = \frac23,
$$

using $\int_{-1}^1x^4\,dx = \frac25$ and $\int_{-1}^{1}P_2^2\,dx = \frac25$. Indeed $\frac13 + \frac23\cdot\frac12(3x^2 - 1) = x^2$.
:::
:::

Green's formula still applies: for these bounded eigenfunctions the boundary term $p(u'v - uv')$ tends to $0$ at a singular endpoint, because $p$ vanishes there fast enough to absorb any growth of the derivatives. So the eigenvalues are real and the eigenfunctions orthogonal, exactly as before. The detailed spectral theory of singular problems, begun by Hermann Weyl in 1910, is more delicate; for instance, on an infinite interval the spectrum may contain whole intervals rather than isolated eigenvalues.

::: warning Orthogonality needs the weight and the boundary conditions
Two common slips. First, eigenfunctions of [[#eq-sl]] are orthogonal with respect to the weight $w$ in the equation, not in the plain inner product: the eigenfunctions of [[#ex-euler]] are *not* orthogonal in $\int_1^by_my_n\,dx$. Always put the equation into the form [[#eq-sl]] first, so that you can read off $w$. Second, orthogonality depends on the boundary conditions making the boundary term in Green's formula vanish. Functions such as $\sin\mu_mx$ and $\sin\mu_nx$ with arbitrary $\mu_m \neq \mu_n$ are generally not orthogonal on $[0,1]$; it is the shared Robin condition that makes the eigenfunctions of [[#ex-robin]] orthogonal.
:::

::: application Quantum mechanics
The time-independent Schrödinger equation for a particle of mass $m$ in one dimension, $-\frac{\hbar^2}{2m}\psi'' + V(x)\psi = E\psi$, is a Sturm–Liouville problem with $p = \frac{\hbar^2}{2m}$, $q = V$, $w = 1$ and eigenvalue $E$. The theorems of this chapter become physics: the energy levels of a particle confined to a region are real and discrete, $E_1 < E_2 < \cdots$; the ground state has no nodes and the $n$th state has $n - 1$; states of different energies are orthogonal; and every state is a superposition of energy eigenstates, whose coefficients give the probabilities of measuring each energy. The Rayleigh quotient is the variational principle physicists use to estimate ground-state energies. Singular problems on infinite intervals, such as the harmonic oscillator $V = \frac12m\omega^2x^2$ (Hermite functions) or the hydrogen atom (Laguerre functions), are exactly the cases Weyl's theory was built for.
:::

::: history
Charles-François Sturm (1803–1855) and Joseph Liouville (1809–1882), friends and colleagues in Paris, published the fundamental papers on the subject in 1836–1837 in the first volumes of the *Journal de Mathématiques Pures et Appliquées*, which Liouville had just founded. Sturm, motivated by Fourier's and Poisson's work on heat conduction in non-uniform bodies, studied the zeros of solutions of second-order linear equations and proved his comparison and oscillation theorems — remarkable because they extract precise qualitative information from equations that cannot be solved explicitly. Liouville studied the expansion of arbitrary functions in the eigenfunctions and their convergence. Their work was an early landmark of the qualitative theory of differential equations. In the early twentieth century David Hilbert's theory of integral equations recast it as spectral theory of symmetric operators, and Hermann Weyl (1910) extended it to singular problems — the framework into which Schrödinger's quantum mechanics fitted in 1926.
:::

## Where this leads

Sturm–Liouville theory is the one-dimensional case of the spectral theory of self-adjoint differential operators. In higher dimensions the Laplacian on a bounded region with Dirichlet or Neumann conditions has the same properties — real eigenvalues tending to infinity, orthogonal eigenfunctions, complete expansions — and separation of variables on rectangles, discs and balls produces products of the one-dimensional eigenfunctions met here: sines, Bessel functions and Legendre functions ([[pde/laplace-equation]], [[pde/wave-equation]]). When the interval becomes infinite the discrete sum over eigenfunctions turns into an integral, and for $-y'' = \lambda y$ on the whole line this is precisely the Fourier transform ([[pde/fourier-transform]]). The functional-analytic proof sketched for [[#thm-sl-main]], via compact self-adjoint operators, is developed in courses on functional analysis, building on [[measure-theory/lp-spaces]].

::: summary
- A regular Sturm–Liouville problem is $(py')' - qy + \lambda wy = 0$ on $[a,b]$ with $p, w > 0$ and separated boundary conditions; any second-order linear equation can be put in this form.
- Green's formula shows that $Ly = -(py')' + qy$ is self-adjoint on functions satisfying the boundary conditions ([[#lem-green]]).
- Hence the eigenvalues are real, eigenfunctions of different eigenvalues are orthogonal with weight $w$, and each eigenvalue is simple ([[#thm-sl-basic]]).
- The Rayleigh quotient [[#eq-rayleigh]] shows that eigenvalues are non-negative for the usual physical boundary conditions, and gives upper bounds for $\lambda_1$.
- The eigenvalues form a sequence $\lambda_1<\lambda_2<\cdots\to\infty$, the $n$th eigenfunction has $n-1$ interior zeros, and piecewise smooth functions can be expanded in eigenfunctions with coefficients $c_n = \inner{f}{y_n}_w/\inner{y_n}{y_n}_w$ ([[#thm-sl-main]]).
- With Robin conditions the eigenvalues solve transcendental equations such as $\tan\mu = -\mu/h$ and must be found numerically, but orthogonality and completeness still hold.
- Singular problems (Legendre, Bessel) keep reality and orthogonality, and produce the special functions of mathematical physics.
:::

## Exercises

::: exercise Putting an equation in Sturm–Liouville form {level=1 check="2"}
Write $y'' + 2y' + \lambda y = 0$ in Sturm–Liouville form, identify $p$, $q$, $w$, and find the eigenvalues for the boundary conditions $y(0) = y(\pi) = 0$. What is $\lambda_1$?
::: solution
Multiplying by $e^{2x}$: $e^{2x}y'' + 2e^{2x}y' = (e^{2x}y')'$, so the equation is $(e^{2x}y')' + \lambda e^{2x}y = 0$ with $p = w = e^{2x}$ and $q = 0$. The characteristic equation $r^2 + 2r + \lambda = 0$ has roots $-1 \pm\sqrt{1-\lambda}$. For $\lambda \le 1$ the solutions are $e^{-x}(A + Bx)$ or combinations of two real exponentials, and the two Dirichlet conditions force $A = B = 0$. For $\lambda > 1$, $y = e^{-x}\bigl(A\cos\nu x + B\sin\nu x\bigr)$ with $\nu = \sqrt{\lambda - 1}$; $y(0) = 0$ gives $A = 0$ and $y(\pi) = 0$ gives $\nu = n$. So $\lambda_n = 1 + n^2$ with eigenfunctions $e^{-x}\sin nx$, and $\lambda_1 = 2$. (Check orthogonality: $\int_0^\pi e^{-x}\sin mx\,e^{-x}\sin nx\,e^{2x}\,dx = \int_0^\pi\sin mx\sin nx\,dx = 0$ for $m\ne n$.)
:::
:::

::: exercise Insulated ends of a longer rod {level=1 check="pi^2/4"}
Find all eigenvalues of $y'' + \lambda y = 0$ on $[0,2]$ with $y'(0) = y'(2) = 0$. What is the smallest **positive** eigenvalue?
::: solution
By [[#prop-rayleigh]] (with $\alpha_1 = \beta_1 = 0$) all eigenvalues are $\ge0$, and $\lambda = 0$ is an eigenvalue with eigenfunction $1$. For $\lambda = \mu^2 > 0$, $y'(0) = 0$ gives $y = \cos\mu x$, and $y'(2) = -\mu\sin2\mu = 0$ gives $\mu = \frac{n\pi}{2}$. So the eigenvalues are $\lambda_n = \frac{n^2\pi^2}{4}$, $n = 0, 1, 2,\dots$, and the smallest positive one is $\frac{\pi^2}{4}$.
:::
:::

::: exercise A weighted norm {level=1 check="1/2"}
Verify directly that $y_1 = \sin(\pi\ln x)$ and $y_2 = \sin(2\pi\ln x)$ are orthogonal on $[1, e]$ with weight $1/x$, and compute $\displaystyle\int_1^e\sin^2(\pi\ln x)\,\frac{dx}{x}$.
::: solution
With $t = \ln x$, $\int_1^e\sin(\pi\ln x)\sin(2\pi\ln x)\frac{dx}{x} = \int_0^1\sin\pi t\sin2\pi t\,dt = 0$ by the orthogonality of sines, and $\int_1^e\sin^2(\pi\ln x)\frac{dx}{x} = \int_0^1\sin^2\pi t\,dt = \frac12$. (This is [[#ex-euler]] with $b = e$.)
:::
:::

::: exercise A Rayleigh quotient bound {level=2 check="10"}
For $-y'' = \lambda y$, $y(0) = y(1) = 0$, compute the Rayleigh quotient $R[y] = \int_0^1(y')^2\,dx\big/\int_0^1y^2\,dx$ of the trial function $y = x(1 - x)$, and compare with the true $\lambda_1$.
::: solution
$y' = 1 - 2x$, so $\int_0^1(1 - 2x)^2\,dx = \frac13$, and $\int_0^1x^2(1-x)^2\,dx = \frac1{30}$. Hence $R[y] = \frac{1/3}{1/30} = 10$. By the Rayleigh–Ritz principle this is an upper bound for $\lambda_1 = \pi^2 \approx 9.8696$, and a very good one (error about $1.3\%$), because $x(1-x)$ has roughly the shape of $\sin\pi x$.
:::
:::

::: exercise An eigenfunction expansion {level=2 check="4/pi"}
Expand $f(x) = 1$ on $[1, e]$ in the eigenfunctions $y_n = \sin(n\pi\ln x)$ of $(xy')' + \frac{\lambda}{x}y = 0$, $y(1) = y(e) = 0$. What is $c_1$?
::: solution
By [[#eq-sl-coeffs]] with $w = 1/x$ and $\int_1^ey_n^2\frac{dx}x = \frac12$,

$$
c_n = 2\int_1^e\sin(n\pi\ln x)\,\frac{dx}{x} = 2\int_0^1\sin n\pi t\,dt = \frac{2\bigl(1 - (-1)^n\bigr)}{n\pi},
$$

so $c_n = \frac{4}{n\pi}$ for odd $n$ and $0$ for even $n$, and $1 = \frac4\pi\sum_{n\ \text{odd}}\frac{\sin(n\pi\ln x)}{n}$ for $1 < x < e$. In the variable $t = \ln x$ this is just the sine series of $1$ on $(0, 1)$. In particular $c_1 = \frac{4}{\pi}$.
:::
:::

::: exercise Robin eigenvalues {level=2}
For the problem of [[#ex-robin]], show that $\mu_n - (n - \frac12)\pi \to 0$ as $n \to\infty$, and that $\mu_n$ increases with $h$. What happens to the eigenvalues as $h\to0^+$ and as $h\to\infty$, and why is that physically reasonable?
::: solution
On $\bigl((n-\frac12)\pi, n\pi\bigr)$ the root satisfies $\tan\mu_n = -\mu_n/h$, which is less than $-(n - \frac12)\pi/h \to -\infty$. Since $\tan$ increases from $-\infty$ at $(n - \frac12)\pi$, a very negative value of $\tan\mu_n$ forces $\mu_n$ close to $(n-\frac12)\pi$: precisely, writing $\mu_n = (n - \frac12)\pi + \eps_n$, we get $\tan\mu_n = -\cot\eps_n$, so $\cot\eps_n = \mu_n/h \to\infty$ and $\eps_n \to 0$. If $h$ increases, the line $-\mu/h$ becomes less steep, so it meets the increasing branch of $\tan\mu$ further to the right: $\mu_n$ increases. As $h\to0^+$ the condition becomes $y'(1) = 0$ (insulated end) and $\mu_n \to (n-\frac12)\pi$; as $h\to\infty$ it becomes $y(1) = 0$ (end held at temperature $0$) and $\mu_n \to n\pi$. A larger heat transfer coefficient lets heat escape faster, so every mode decays faster ($\lambda_n = \mu_n^2$ is larger).
:::
:::

::: exercise A lower bound from the potential {level=3}
Let $y$ be an eigenfunction of $-y'' + q(x)y = \lambda y$ on $[a,b]$ with $y(a) = y(b) = 0$, where $q$ is continuous. Prove that $\lambda > \min_{[a,b]}q$.
::: solution
By [[#eq-rayleigh]] with $p = w = 1$ and the boundary term zero,

$$
\lambda = \frac{\int_a^b(y')^2\,dx + \int_a^bqy^2\,dx}{\int_a^by^2\,dx} \ge \frac{\int_a^b(y')^2\,dx}{\int_a^by^2\,dx} + \min q.
$$

The first fraction is strictly positive: if $\int(y')^2 = 0$ then $y$ would be constant, hence zero because $y(a) = 0$, which is impossible for an eigenfunction. So $\lambda > \min q$. (Physically: a quantum particle in a box can never have energy as low as the minimum of its potential.)
:::
:::

::: exercise A lower bound for the first eigenvalue {level=3}
For a regular problem with Dirichlet conditions $y(a) = y(b) = 0$ and $q \ge 0$, prove that

$$
\lambda_1 \ge \frac{\min p}{\max w}\cdot\frac{\pi^2}{(b - a)^2}.
$$
::: hint
Use the Rayleigh quotient and Wirtinger's inequality $\int_a^b(y')^2 \ge \frac{\pi^2}{(b-a)^2}\int_a^by^2$ for $y(a) = y(b) = 0$, proved in the exercises of [[pde/heat-equation]].
:::
::: solution
Let $y_1$ be an eigenfunction for $\lambda_1$. By [[#eq-rayleigh]] (the boundary term vanishes) and $q \ge 0$,

$$
\lambda_1 = \frac{\int_a^b\bigl(p(y_1')^2 + qy_1^2\bigr)dx}{\int_a^bwy_1^2\,dx} \ge \frac{\min p\int_a^b(y_1')^2\,dx}{\max w\int_a^by_1^2\,dx} \ge \frac{\min p}{\max w}\cdot\frac{\pi^2}{(b-a)^2},
$$

where the last step is Wirtinger's inequality (on $[a, b]$, of length $b - a$). For $p = w = 1$, $q = 0$ this is an equality, $\lambda_1 = \pi^2/(b-a)^2$. A stiffer string (larger $p$) or a lighter one (smaller $w$) has a higher fundamental frequency.
:::
:::

::: exercise Periodic boundary conditions {level=3}
Show that Green's formula [[#eq-green]] has zero boundary term for $u$, $v$ satisfying the **periodic** conditions $y(a) = y(b)$, $y'(a) = y'(b)$, provided $p(a) = p(b)$. Then find all eigenvalues and eigenfunctions of $y'' + \lambda y = 0$ on $[-\pi,\pi]$ with periodic conditions, and show that part 3 of [[#thm-sl-basic]] fails. Which parts of the proof survive?
::: solution
The boundary term is $p(b)\bigl(u'(b)v(b) - u(b)v'(b)\bigr) - p(a)\bigl(u'(a)v(a) - u(a)v'(a)\bigr)$, and with $p(a) = p(b)$, $u(a) = u(b)$, $u'(a) = u'(b)$ (and likewise for $v$) the two terms are equal, so it vanishes. Hence parts 1 and 2 of [[#thm-sl-basic]] (reality and orthogonality) hold with the same proofs. For $y'' + \lambda y = 0$: $\lambda < 0$ gives no periodic solutions except $0$; $\lambda = 0$ gives the constants; $\lambda = n^2$ ($n\ge1$) gives $y = A\cos nx + B\sin nx$, all of which are periodic. So $\lambda = n^2$ has the **two-dimensional** eigenspace spanned by $\cos nx$ and $\sin nx$, and part 3 fails. The proof of part 3 used a boundary condition at the single point $a$ to make the vectors $(y_1(a), y_1'(a))$ and $(y_2(a), y_2'(a))$ dependent; periodic conditions relate values at $a$ to values at $b$ and impose no such restriction. The eigenfunctions are exactly those of the full Fourier series of [[pde/fourier-series]].
:::
:::
