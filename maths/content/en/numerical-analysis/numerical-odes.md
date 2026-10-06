The motion of a pendulum with large swings, the spread of an epidemic, the reactions in a chemical plant, the orbit of a spacecraft: all are governed by initial value problems

$$
\mathbf y'(t) = \mathbf f\bigl(t, \mathbf y(t)\bigr), \qquad \mathbf y(t_0) = \mathbf y_0,
$$ {#eq-ivp}

and almost none of them can be solved by a formula. The existence and uniqueness theorem ([[ode/existence-uniqueness]]) guarantees a solution when $\mathbf f$ is Lipschitz continuous in $\mathbf y$, but to know what the solution *is* we must compute it. A numerical method produces approximations $\mathbf y_n \approx \mathbf y(t_n)$ on a grid $t_n = t_0 + nh$ with **step size** $h$.

In [[calculus-2/intro-odes]] we met the simplest method, Euler's, and saw that its error is proportional to $h$. This chapter develops the theory properly. We define the local truncation error and prove that it controls the global error; we derive Runge–Kutta methods, up to the classical fourth-order method that has been the default choice for a century; and we meet the phenomenon that makes the subject subtle — **stiffness**, where explicit methods are forced to take absurdly small steps not for accuracy but for **stability**, and implicit methods come to the rescue. For simplicity we write scalar equations; everything extends to systems with absolute values replaced by norms.

## One-step methods and their errors

::: definition One-step method, truncation error and order {#def-one-step}
A **one-step method** computes $y_{n+1} = y_n + h\,\Phi(t_n, y_n; h)$ for some increment function $\Phi$. Its **local truncation error** at step $n + 1$ is the amount by which the *exact* solution fails to satisfy the method, per unit step:

$$
\tau_{n+1} = \frac{y(t_{n+1}) - y(t_n)}{h} - \Phi\bigl(t_n, y(t_n); h\bigr).
$$

The method is **consistent** if $\max_n\abs{\tau_n} \to 0$ as $h \to 0$, and has **order** $p$ if $\abs{\tau_n} \le Ch^p$ for all $n$ and all small $h$, for every sufficiently smooth $f$. The **global error** is $e_n = y(t_n) - y_n$.
:::

For **Euler's method**, $\Phi = f(t_n, y_n)$, and Taylor's theorem ([[calculus-2/taylor-series#thm-taylor]]) gives $y(t_{n+1}) = y(t_n) + hy'(t_n) + \frac{h^2}{2}y''(\xi_n)$ with $y'(t_n) = f(t_n, y(t_n))$, so

$$
\tau_{n+1} = \frac h2y''(\xi_n), \qquad \abs{\tau_{n+1}} \le \frac{M_2h}{2}, \quad M_2 = \max\abs{y''} .
$$

Euler's method is consistent and has order $1$. The key question is whether small truncation errors at each step add up to a small global error, or whether they can be amplified. The next theorem shows that, for a Lipschitz increment function, they are amplified by at most a fixed factor.

::: theorem Convergence of one-step methods {#thm-convergence}
Suppose that $\Phi$ is Lipschitz continuous in $y$, $\abs{\Phi(t, u; h) - \Phi(t, v; h)} \le L\abs{u - v}$, and that $\abs{\tau_n} \le T$ for all $n$ with $t_n \le t_{\text{end}}$. If $y_0 = y(t_0)$, then for all such $n$

$$
\abs{e_n} \le \frac{T}{L}\left(e^{L(t_n - t_0)} - 1\right).
$$ {#eq-global-bound}

In particular, a method of order $p$ with Lipschitz increment function has global error $O(h^p)$ on every bounded interval.
:::

::: proof
By the definition of $\tau_{n+1}$, the exact solution satisfies $y(t_{n+1}) = y(t_n) + h\Phi(t_n, y(t_n); h) + h\tau_{n+1}$. Subtracting $y_{n+1} = y_n + h\Phi(t_n, y_n; h)$,

$$
e_{n+1} = e_n + h\bigl[\Phi(t_n, y(t_n); h) - \Phi(t_n, y_n; h)\bigr] + h\tau_{n+1}, \qquad \abs{e_{n+1}} \le (1 + hL)\abs{e_n} + hT .
$$

With $e_0 = 0$, induction gives $\abs{e_n} \le hT\sum_{k=0}^{n-1}(1 + hL)^k = hT\frac{(1 + hL)^n - 1}{hL} = \frac TL\bigl((1 + hL)^n - 1\bigr)$. Finally $1 + hL \le e^{hL}$, so $(1 + hL)^n \le e^{nhL} = e^{L(t_n - t_0)}$.
:::

The factor $e^{L(t_n - t_0)}$ reflects the sensitivity of the differential equation itself: nearby solutions can separate at most like $e^{Lt}$. For Euler's method $L$ is the Lipschitz constant of $f$ and $T = \frac{M_2h}{2}$, so

$$
\abs{y(t_n) - y_n} \le \frac{M_2h}{2L}\left(e^{L(t_n - t_0)} - 1\right).
$$

::: example The error bound for Euler's method {#ex-euler-bound}
Bound the error of Euler's method for $y' = y$, $y(0) = 1$ at $t = 1$, and compare with the actual errors.
::: solution
Here $f(t, y) = y$ is Lipschitz with $L = 1$, and $\abs{y''} = e^t \le e = M_2$ on $[0, 1]$. The bound is

$$
\abs{e(1)} \le \frac{eh}{2}\left(e^1 - 1\right) \approx 2.34h .
$$

Euler's method gives $y_n = (1 + h)^n$, i.e. $(1 + h)^{1/h}$ at $t = 1$, and the actual errors $e - (1 + h)^{1/h}$ are $0.125$, $0.065$ and $0.033$ for $h = 0.1$, $0.05$ and $0.025$: about half the bound $0.234$, $0.117$, $0.058$, and halving with $h$ as the theorem predicts. The bound is pessimistic by a constant factor, but it gets the order right — which is what matters for choosing $h$.
:::
:::

::: warning Local and global order differ by one
The error committed in a *single* Euler step is $\frac{h^2}{2}y''$, of order $h^2$, but reaching a fixed time takes $\frac{t - t_0}{h}$ steps, so the global error is of order $h$. Conventions vary: some books call $h\tau_n$ the local error and say it is $O(h^{p+1})$. With the definition used here (truncation error per unit step), a method of order $p$ has $\tau = O(h^p)$ *and* global error $O(h^p)$. When estimating an order from experiments, always measure the global error at a fixed time.
:::

::: remark Rounding error sets a floor
[[#thm-convergence]] assumes exact arithmetic. In floating point, each step also adds a rounding error of relative size about $u$, and over $\frac{t - t_0}{h}$ steps these accumulate to roughly $\frac{u}{h}$ (or $\frac{u}{\sqrt h}$ if they behave like random errors). The total error therefore behaves like $Ch^p + \frac{u}{h}$, the same competition between truncation and rounding as for difference quotients in [[numerical-analysis/floating-point#thm-forward-difference]]. For Euler's method in double precision the best attainable error is around $10^{-8}$, reached with about $10^8$ steps; for RK4 the truncation error falls so quickly that rounding rarely matters. This is one more reason to prefer higher-order methods over tiny steps.
:::

## Runge–Kutta methods

Euler's method uses only the slope at the start of each step. Runge–Kutta methods sample the slope at several points inside the step and combine the samples so that the Taylor expansion of the exact solution is matched to higher order — without ever differentiating $f$.

::: definition Explicit Runge–Kutta method {#def-rk}
An explicit $s$-stage **Runge–Kutta method** computes

$$
k_i = f\Bigl(t_n + c_ih,\ y_n + h\sum_{j<i}a_{ij}k_j\Bigr), \quad i = 1, \dots, s, \qquad y_{n+1} = y_n + h\sum_{i=1}^sb_ik_i ,
$$

with coefficients usually displayed in a **Butcher tableau**: the $c_i$ on the left, the strictly lower triangular matrix $(a_{ij})$ beside them and the weights $b_i$ underneath.
:::

The simplest improvement on Euler is **Heun's method** (the explicit trapezoidal rule): take an Euler step to predict the end point, then average the slopes at both ends,

$$
k_1 = f(t_n, y_n), \qquad k_2 = f(t_n + h,\ y_n + hk_1), \qquad y_{n+1} = y_n + \frac h2(k_1 + k_2).
$$

Another is the **midpoint method**: $k_2 = f\left(t_n + \frac h2, y_n + \frac h2k_1\right)$ and $y_{n+1} = y_n + hk_2$. Both are second order, and the next theorem explains why.

::: theorem Order conditions for two stages {#thm-rk2}
The two-stage method $y_{n+1} = y_n + h(b_1k_1 + b_2k_2)$ with $k_1 = f(t_n, y_n)$, $k_2 = f(t_n + c_2h, y_n + a_{21}hk_1)$ has order $2$ for every smooth $f$ if and only if

$$
b_1 + b_2 = 1, \qquad b_2c_2 = \tfrac12, \qquad b_2a_{21} = \tfrac12 .
$$
:::

::: proof
Write $f$, $f_t$, $f_y$ for values at $(t_n, y(t_n))$. Differentiating $y' = f(t, y)$ by the chain rule gives $y'' = f_t + f_yf$, so by Taylor's theorem

$$
\frac{y(t_{n+1}) - y(t_n)}{h} = f + \frac h2\left(f_t + f_yf\right) + O(h^2).
$$

Expanding $k_2$ by Taylor's theorem in two variables, $k_2 = f + c_2hf_t + a_{21}hff_y + O(h^2)$, so $\Phi = b_1k_1 + b_2k_2 = (b_1 + b_2)f + b_2h\left(c_2f_t + a_{21}f_yf\right) + O(h^2)$. Subtracting,

$$
\tau = (1 - b_1 - b_2)f + h\left[\left(\tfrac12 - b_2c_2\right)f_t + \left(\tfrac12 - b_2a_{21}\right)f_yf\right] + O(h^2).
$$

This is $O(h^2)$ for every $f$ if the three conditions hold. Conversely, taking $f = 1$, $f = t$ and $f = y$ (for which $f_t$ or $f_yf$ is non-zero alone) shows that each condition is necessary.
:::

Heun's method has $b_1 = b_2 = \frac12$, $c_2 = a_{21} = 1$; the midpoint method has $b_1 = 0$, $b_2 = 1$, $c_2 = a_{21} = \frac12$. Matching more terms requires more stages. Kutta's **classical fourth-order method** is the most famous result:

$$
\begin{aligned}
k_1 &= f(t_n, y_n), & k_2 &= f\left(t_n + \tfrac h2,\ y_n + \tfrac h2k_1\right), \\
k_3 &= f\left(t_n + \tfrac h2,\ y_n + \tfrac h2k_2\right), & k_4 &= f(t_n + h,\ y_n + hk_3), \\
y_{n+1} &= y_n + \tfrac h6\left(k_1 + 2k_2 + 2k_3 + k_4\right). & &
\end{aligned}
$$ {#eq-rk4}

When $f$ does not depend on $y$, this reduces to Simpson's rule ([[numerical-analysis/numerical-integration]]) for $\int_{t_n}^{t_{n+1}}f(t)\,dt$. Verifying that it has order $4$ for general $f$ means matching eight terms of the Taylor expansion (Butcher's theory of rooted trees organises this; see Hairer, Nørsett and Wanner, *Solving Ordinary Differential Equations I*, Chapter II). For the linear equation $y' = \lambda y$ the check is easy: with $z = h\lambda$, $k_1 = \lambda y_n$, $k_2 = \lambda y_n\left(1 + \frac z2\right)$, $k_3 = \lambda y_n\left(1 + \frac z2 + \frac{z^2}{4}\right)$, $k_4 = \lambda y_n\left(1 + z + \frac{z^2}{2} + \frac{z^3}{4}\right)$, and

$$
y_{n+1} = \left(1 + z + \frac{z^2}{2} + \frac{z^3}{6} + \frac{z^4}{24}\right)y_n ,
$$

the Taylor polynomial of degree $4$ of $e^{z}$, which is the exact growth factor $y(t_{n+1})/y(t_n)$.

```python
def rk4(f, t0, y0, t_end, n):
    """Classical Runge-Kutta method with n equal steps; y may be a NumPy array."""
    h = (t_end - t0) / n
    t, y = t0, y0
    for _ in range(n):
        k1 = f(t, y)
        k2 = f(t + h/2, y + h/2 * k1)
        k3 = f(t + h/2, y + h/2 * k2)
        k4 = f(t + h, y + h * k3)
        y = y + h/6 * (k1 + 2*k2 + 2*k3 + k4)
        t = t + h
    return y
```

::: example One step of RK4 by hand {#ex-rk4-step}
Take one RK4 step of size $h = 0.1$ for $y' = y$, $y(0) = 1$.
::: solution
$k_1 = 1$; $k_2 = 1 + 0.05\cdot1 = 1.05$; $k_3 = 1 + 0.05\cdot1.05 = 1.0525$; $k_4 = 1 + 0.1\cdot1.0525 = 1.105\,25$. Then

$$
y_1 = 1 + \frac{0.1}{6}\left(1 + 2.1 + 2.105 + 1.105\,25\right) = 1 + \frac{0.1}{6}\cdot6.310\,25 = 1.105\,170\,833 .
$$

The exact value is $e^{0.1} = 1.105\,170\,918$, so the error after one step is $8.5\times10^{-8}$ — the first omitted Taylor term $\frac{0.1^5}{120} \approx 8.3\times10^{-8}$. Euler's method would give $1.1$, with error $5\times10^{-3}$.
:::
:::

::: example Measuring orders of convergence {#ex-orders}
Solve $y' = -2ty^2$, $y(0) = 1$, whose exact solution is $y = \frac{1}{1 + t^2}$, up to $t = 2$ with Euler, Heun and RK4, and estimate the orders from the errors.
::: solution
The global errors $y_N - y(2)$ for successive halvings of $h$:

| $h$ | Euler | Heun | RK4 |
|---|---|---|---|
| $0.2$ | $-1.42\times10^{-2}$ | $2.99\times10^{-3}$ | $1.10\times10^{-5}$ |
| $0.1$ | $-6.66\times10^{-3}$ | $6.95\times10^{-4}$ | $6.54\times10^{-7}$ |
| $0.05$ | $-3.23\times10^{-3}$ | $1.68\times10^{-4}$ | $3.97\times10^{-8}$ |
| $0.025$ | $-1.59\times10^{-3}$ | $4.12\times10^{-5}$ | $2.44\times10^{-9}$ |
| $0.0125$ | $-7.91\times10^{-4}$ | $1.02\times10^{-5}$ | $1.51\times10^{-10}$ |

Successive ratios approach $2.01$, $4.03$ and $16.1$, so the observed orders $\log_2(\text{ratio})$ are $1$, $2$ and $4$, as the theory predicts. Per function evaluation, RK4 (four per step) with $h = 0.2$ — that is, $40$ evaluations — is already more accurate than Euler with $h = 0.0125$ ($160$ evaluations) by a factor of $70$.
:::
:::

::: widget odesolver
f: -2*t*y^2
y0: 1
t: 0, 2
exact: 1/(1 + t^2)
h: 0.2
methods: euler; heun; rk4
caption: Euler, Heun and RK4 for $y' = -2ty^2$, $y(0) = 1$, against the exact solution $\frac{1}{1+t^2}$. With $h = 0.2$ Euler is visibly off (too high while the solution falls steeply, slightly too low near the end), Heun is close and RK4 is indistinguishable from the exact curve. Halve the step size and compare the global errors: they fall by about $2$, $4$ and $16$.
:::

::: quiz
A method gives global errors $3.2\times10^{-3}$ with $h = 0.1$ and $2.0\times10^{-4}$ with $h = 0.05$. What is its observed order?
- [ ] $1$
- [ ] $2$
- [ ] $3$
- [x] $4$
::: solution
The ratio is $\frac{3.2\times10^{-3}}{2.0\times10^{-4}} = 16 = 2^4$, so the error behaves like $Ch^4$: order $4$, as for RK4. (A single pair of measurements can mislead; check with a third step size that the ratio is stable.)
:::
:::

In practice the step size is not fixed. **Adaptive** solvers use an *embedded pair* of Runge–Kutta formulas of orders $p$ and $p + 1$ sharing the same stages; their difference estimates the local error, and the step is shrunk where the solution changes quickly and enlarged where it is smooth. The Dormand–Prince pair of orders $4$ and $5$ (1980) is behind MATLAB's `ode45` and the default method `RK45` of SciPy's `solve_ivp`.

## Stability and stiffness

Convergence ([[#thm-convergence]]) concerns $h \to 0$. In practice $h$ is fixed, and a different question arises: does the method reproduce the *qualitative* behaviour of the solution with the step size we can afford? The test case is the linear equation

$$
y' = \lambda y, \qquad \lambda \in \C,\ \operatorname{Re}\lambda < 0,
$$ {#eq-test}

whose solutions $y = y_0e^{\lambda t}$ decay to $0$. (Complex $\lambda$ arise from systems $\mathbf y' = A\mathbf y$, which decouple into such equations along the eigenvectors of $A$, as in [[ode/linear-systems]]; and near an equilibrium every smooth system looks like its linearisation.)

::: definition Stability function and region {#def-stability-region}
A one-step method applied to [[#eq-test]] gives $y_{n+1} = R(z)\,y_n$ with $z = h\lambda$, for some function $R$, the **stability function**. Its **region of absolute stability** is $\mathcal S = \set{z \in \C : \abs{R(z)} \le 1}$. A method is **A-stable** if $\mathcal S$ contains the whole left half-plane $\operatorname{Re}z \le 0$.
:::

Since $y_n = R(z)^ny_0$, the numerical solution decays like the exact one exactly when $\abs{R(h\lambda)} < 1$, and it grows without bound if $\abs{R(h\lambda)} > 1$, however accurate each step may seem. The stability functions of our methods are:

| method | $R(z)$ | interval of stability on the negative real axis |
|---|---|---|
| Euler | $1 + z$ | $-2 \le z \le 0$ |
| Heun | $1 + z + \frac{z^2}{2}$ | $-2 \le z \le 0$ |
| RK4 | $1 + z + \frac{z^2}{2} + \frac{z^3}{6} + \frac{z^4}{24}$ | $-2.785 \le z \le 0$ |
| backward Euler | $\dfrac{1}{1 - z}$ | all $z \le 0$ |
| trapezoidal rule | $\dfrac{1 + z/2}{1 - z/2}$ | all $z \le 0$ |

For Euler, $\mathcal S$ is the disc of radius $1$ centred at $-1$; for real $\lambda < 0$ it requires $h \le \frac{2}{\abs\lambda}$.

::: example An explicit method exploding {#ex-instability}
Apply Euler's method to $y' = -50(y - \cos t)$, $y(0) = 0$, up to $t = 2$.
::: solution
The exact solution is $y = \frac{2500}{2501}\cos t + \frac{50}{2501}\sin t - \frac{2500}{2501}e^{-50t}$: after a brief transient of duration about $0.1$, it simply follows the slowly varying function $\approx\cos t$. Accuracy alone would allow quite large steps. But the error obeys (approximately) $e' = -50e$, so Euler is stable only for $h \le \frac{2}{50} = 0.04$. The errors at $t = 2$:

| method | $h$ | steps | error at $t = 2$ |
|---|---|---|---|
| Euler | $0.01$ | $200$ | $-3.8\times10^{-5}$ |
| Euler | $0.02$ | $100$ | $-7.7\times10^{-5}$ |
| Euler | $0.04$ | $50$ | $-1.0$ |
| Euler | $0.05$ | $40$ | $-1.1\times10^{7}$ |
| RK4 | $0.05$ | $40$ | $3.2\times10^{-4}$ |
| RK4 | $0.0625$ | $32$ | $-8.3\times10^{6}$ |
| backward Euler | $0.1$ | $20$ | $3.5\times10^{-4}$ |
| backward Euler | $0.5$ | $4$ | $1.1\times10^{-3}$ |

At $h = 0.04$ we have $R(h\lambda) = 1 - 2 = -1$: the transient never decays but flips sign at every step. At $h = 0.05$, $\abs R = 1.5$ and the error grows by $1.5^{40} \approx 10^7$. RK4 is stable up to $h = \frac{2.785}{50} = 0.0557$ and fails beyond. The implicit backward Euler method (below) is stable for every $h$ and gives a useful answer with four steps.
:::
:::

::: widget odesolver
f: -50*(y - cos(t))
y0: 0
t: 0, 2
exact: (2500/2501)*cos(t) + (50/2501)*sin(t) - (2500/2501)*exp(-50*t)
h: 0.03
methods: euler; rk4
caption: The stiff problem $y' = -50(y - \cos t)$. With $h = 0.03$ both explicit methods track the smooth solution after the initial transient (Euler overshoots and oscillates there, because its growth factor for the transient is $R = 1 - 1.5 = -0.5$). Increase $h$ slowly: at $h = 0.04$ Euler's transient stops decaying and oscillates, beyond it Euler explodes, and RK4 follows as soon as $h$ exceeds its limit $2.785/50 \approx 0.0557$, that is, from $h = 0.056$ on the slider. Nothing about the *solution* changed — it is as smooth as ever — only the stability limit of the method was crossed.
:::

::: quiz
For $y' = -100y$, what is the largest step size for which Euler's method gives a decaying numerical solution?
- [ ] $h < 0.1$
- [ ] $h < 0.01$
- [x] $h < 0.02$
- [ ] Any $h$, since the exact solution decays
::: solution
Euler gives $y_{n+1} = (1 - 100h)y_n$, which decays iff $\abs{1 - 100h} < 1$, i.e. $0 < h < 0.02$. For $0.01 < h < 0.02$ the factor is negative, so the decay is oscillatory; at $h = 0.02$ it is $-1$ and the numerical solution oscillates without decaying.
:::
:::

::: example Energy drift for an oscillator {#ex-oscillator}
The harmonic oscillator $y'' = -y$ becomes the first-order system $y' = v$, $v' = -y$, whose energy $E = y^2 + v^2$ is constant. What happens to $E$ under Euler's method and under RK4 with $63$ steps per period ($h = 2\pi/63 \approx 0.0997$)?
::: solution
Euler gives $y_{n+1} = y_n + hv_n$, $v_{n+1} = v_n - hy_n$, so

$$
E_{n+1} = (y_n + hv_n)^2 + (v_n - hy_n)^2 = (1 + h^2)(y_n^2 + v_n^2) = (1 + h^2)E_n .
$$

The energy grows by the factor $(1 + h^2)^{63} = 1.87$ in every period, and by $510$ after ten periods: the computed orbit spirals outwards, however small $h$ is (only the rate changes). In the language of stability regions, the system has eigenvalues $\lambda = \pm i$, and $\abs{R(\pm ih)} = \abs{1 \pm ih} = \sqrt{1 + h^2} > 1$: the imaginary axis lies outside Euler's stability disc. For RK4, $\abs{R(ih)}^2 = 1 - \frac{h^6}{72} + \frac{h^8}{576}$, so the energy *decreases*, but only by a relative $8.6\times10^{-7}$ per period. Converting a higher-order equation into a first-order system in this way is how general-purpose ODE software handles second-order problems.
:::
:::

### Implicit methods

The **backward Euler method** evaluates the slope at the *end* of the step:

$$
y_{n+1} = y_n + h\,f(t_{n+1}, y_{n+1}).
$$

The unknown $y_{n+1}$ appears on both sides, so each step requires solving an equation — for a system, a nonlinear system, usually by Newton's method ([[numerical-analysis/root-finding]]) with an LU factorisation of $I - h\frac{\partial\mathbf f}{\partial\mathbf y}$ ([[numerical-analysis/direct-methods]]). This makes each step more expensive, but on [[#eq-test]] it gives $y_{n+1} = \frac{y_n}{1 - h\lambda}$. The **trapezoidal rule** $y_{n+1} = y_n + \frac h2\bigl(f(t_n, y_n) + f(t_{n+1}, y_{n+1})\bigr)$ is also implicit, and second order.

::: theorem A-stability {#thm-a-stability}
The backward Euler method and the trapezoidal rule are A-stable. No explicit Runge–Kutta method is A-stable.
:::

::: proof
For backward Euler, if $\operatorname{Re}z \le 0$ then $\abs{1 - z} \ge \operatorname{Re}(1 - z) \ge 1$, so $\abs{R(z)} = \frac{1}{\abs{1 - z}} \le 1$. For the trapezoidal rule, $\abs{1 + \frac z2}^2 - \abs{1 - \frac z2}^2 = 2\operatorname{Re}z \le 0$ when $\operatorname{Re}z \le 0$, so $\abs{R(z)} \le 1$.

For an explicit $s$-stage method applied to [[#eq-test]], each $k_i$ is $\lambda y_n$ times a polynomial in $z$ (by induction on $i$, since $k_i$ involves only $k_1, \dots, k_{i-1}$), so $R(z) = 1 + z\sum_ib_i(\ldots)$ is a polynomial of degree at most $s$. Consistency forces $\sum_ib_i = 1$, so $R(z) = 1 + z + \cdots$ is not constant, and a non-constant polynomial satisfies $\abs{R(x)} \to \infty$ as $x \to -\infty$ along the real axis. So $\mathcal S$ does not contain the whole negative real axis.
:::

A problem is called **stiff** when its solution of interest varies slowly, but the equation also has rapidly decaying components (eigenvalues of the Jacobian $\partial\mathbf f/\partial\mathbf y$ with large negative real part), so that explicit methods need steps limited by stability rather than by accuracy. Stiffness is common: chemical reactions with fast and slow rates, circuits with very different time constants, and above all spatial discretisations of diffusion equations ([[pde/heat-equation]]), where the eigenvalues grow like the inverse square of the grid spacing, so that refining the grid makes the explicit step limit shrink quadratically. For stiff problems one uses implicit methods: backward differentiation formulas (BDF, Gear 1971; `method='BDF'` in SciPy) or implicit Runge–Kutta methods such as Radau IIA (`method='Radau'`).

::: quiz
A chemical reaction model has Jacobian eigenvalues $-0.5$ and $-10^6$, and you need the solution up to $t = 100$, where all interesting behaviour happens on time scales of order $1$. Which approach is sensible?
- [ ] Classical RK4 with $h = 0.1$, since the solution is smooth
- [ ] Classical RK4 with $h = 2\times10^{-6}$
- [x] An implicit A-stable or BDF method with steps chosen for accuracy, for example $h \approx 0.1$
- [ ] Euler's method with $h = 0.1$, as it is the most robust
::: solution
The problem is stiff. RK4 with $h = 0.1$ has $h\lambda = -10^5$, far outside its stability interval $[-2.785, 0]$, and explodes. RK4 with $h \le 2.785\times10^{-6}$ is stable but needs about $4\times10^7$ steps. Such an implicit method is stable for any step on this problem, so $h$ can be chosen for the accuracy of the slow component, giving about $1000$ steps (each requiring a linear solve, which is cheap for a small system). Euler's method is explicit and has the same problem as RK4.
:::
:::

::: warning Stability is not accuracy
An A-stable method never blows up on decaying problems, but large steps can still be inaccurate. Backward Euler with large $h$ damps the fast transient correctly but is only first order, and the trapezoidal rule, though A-stable, has $R(z) \to -1$ as $z \to -\infty$: very fast components are not damped but flip sign at every step, producing slowly decaying oscillations. Choose the step size for the accuracy you need in the slow solution, and the method for stability.
:::

::: application Simulating the solar system
Long-time simulations add a further requirement: some problems have conserved quantities, such as the energy of a planetary system. Ordinary methods, even high-order ones, let the energy drift slowly, so that simulated planets spiral inwards or outwards over millions of orbits. **Symplectic** integrators, such as the Störmer–Verlet (leapfrog) method used in molecular dynamics and celestial mechanics, preserve the geometric structure of Hamiltonian systems and keep the energy error bounded for exponentially long times. Choosing a method that respects the qualitative features of the problem — decay, oscillation, conservation — is the central theme of modern numerical ODE theory.
:::

::: history
Leonhard Euler described his method in his *Institutiones calculi integralis* (1768). Francis Bashforth and John Couch Adams introduced multistep methods in 1883 in a study of capillary drops. Carl Runge (1895) proposed sampling the slope inside each step, Karl Heun (1900) and Martin Wilhelm Kutta (1901) developed the idea, and Kutta's paper contains the classical fourth-order method. Charles Curtiss and Joseph Hirschfelder identified "stiff" equations in chemical kinetics in 1952. Germund Dahlquist proved in 1956 that convergence of multistep methods is equivalent to consistency plus stability, and in 1963 introduced A-stability and showed its limits. John Butcher's algebraic theory of Runge–Kutta order conditions (from 1963) made the systematic construction of high-order methods possible.
:::

## Where this leads

Linear multistep methods (Adams and BDF) reuse past values instead of extra stages and are the basis of many adaptive stiff solvers. Boundary value problems, where conditions are given at both ends of an interval, are solved by shooting (repeated initial value solves with Newton's method on the unknown initial data) or by finite differences that lead to the linear systems of [[numerical-analysis/direct-methods]]. Applying ODE solvers to the spatially discretised heat and wave equations — the *method of lines* — connects this chapter with [[pde/heat-equation]] and [[pde/wave-equation]]; there explicit methods face stability limits $h \le C(\Delta x)^2$ for the heat equation and $h \le C\,\Delta x$ for the wave equation, the latter being the famous Courant–Friedrichs–Lewy condition. The qualitative theory of the systems being simulated is in [[ode/nonlinear-systems]].

::: summary
- A one-step method $y_{n+1} = y_n + h\Phi(t_n, y_n; h)$ has order $p$ if its truncation error per unit step is $O(h^p)$; Euler's method has order $1$.
- If $\Phi$ is Lipschitz with constant $L$ and $\abs\tau \le T$, the global error is at most $\frac TL(e^{L(t - t_0)} - 1)$: order $p$ locally gives order $p$ globally.
- Runge–Kutta methods sample the slope inside the step; Heun and midpoint are second order (conditions $b_1 + b_2 = 1$, $b_2c_2 = b_2a_{21} = \frac12$), and the classical RK4 is fourth order. Verify orders experimentally from error ratios $2^p$.
- On $y' = \lambda y$ a method gives $y_{n+1} = R(h\lambda)y_n$; the region $\abs{R} \le 1$ limits the step size of explicit methods (Euler: $h \le 2/\abs\lambda$ for real $\lambda < 0$).
- Stiff problems have fast decaying components that force tiny steps on explicit methods although the solution is smooth; implicit methods such as backward Euler and the trapezoidal rule are A-stable and solve them efficiently.
- No explicit Runge–Kutta method is A-stable; implicit methods require solving (non)linear equations at each step, usually by Newton's method.
:::

## Exercises

::: exercise One Euler step {level=1 check="1.1"}
Take one Euler step of size $h = 0.1$ for $y' = t + y$, $y(0) = 1$.
::: solution
$y_1 = y_0 + hf(t_0, y_0) = 1 + 0.1\,(0 + 1) = 1.1$. (The exact solution $y = 2e^t - t - 1$ gives $y(0.1) = 1.110\,34$.)
:::
:::

::: exercise A stability limit {level=1 check="1/50"}
What is the largest step size for which Euler's method applied to $y' = -100y$ satisfies $\abs{R(h\lambda)} \le 1$?
::: solution
$\abs{1 - 100h} \le 1$ means $0 \le h \le 0.02 = \frac{1}{50}$.
:::
:::

::: exercise Evaluating a stability function {level=1 check="1/2"}
Evaluate the stability function of Heun's method at $z = -1$.
::: solution
$R(-1) = 1 - 1 + \frac12 = \frac12$. So with $h\lambda = -1$ each step multiplies the solution by $0.5$, while the exact factor is $e^{-1} \approx 0.368$.
:::
:::

::: exercise One RK4 step for growth {level=2 check="1 + 0.1 + 0.01/2 + 0.001/6 + 0.0001/24"}
Show that one RK4 step of size $h = 0.1$ for $y' = y$, $y(0) = 1$ gives exactly $1 + 0.1 + \frac{0.1^2}{2} + \frac{0.1^3}{6} + \frac{0.1^4}{24}$.
::: solution
By the computation after [[#eq-rk4]], one step multiplies $y_n$ by $R(z) = 1 + z + \frac{z^2}{2} + \frac{z^3}{6} + \frac{z^4}{24}$ with $z = h\lambda = 0.1$. This agrees with [[#ex-rk4-step]]: $1.105\,170\,833$.
:::
:::

::: exercise Heun on the test equation {level=2}
Show that Heun's method applied to $y' = \lambda y$ gives $y_{n+1} = \left(1 + z + \frac{z^2}{2}\right)y_n$ with $z = h\lambda$, and deduce its interval of stability on the negative real axis.
::: solution
$k_1 = \lambda y_n$ and $k_2 = \lambda(y_n + hk_1) = \lambda y_n(1 + z)$, so $y_{n+1} = y_n + \frac h2\lambda y_n(2 + z) = \left(1 + z + \frac{z^2}{2}\right)y_n$. For real $z$, $R(z) = \frac12\left((z + 1)^2 + 1\right) > 0$, and $R(z) \le 1$ iff $(z + 1)^2 \le 1$ iff $-2 \le z \le 0$.
:::
:::

::: exercise Backward Euler on a stiff equation {level=2 check="1/6"}
Apply one step of the backward Euler method with $h = 0.1$ to $y' = -50y$, $y(0) = 1$. Compare with forward Euler.
::: solution
Backward Euler: $y_1 = y_0 + h(-50y_1)$, so $y_1 = \frac{y_0}{1 + 5} = \frac16 \approx 0.167$ (exact: $e^{-5} \approx 0.0067$; inaccurate but decaying). Forward Euler: $y_1 = (1 - 5)y_0 = -4$, and after $n$ steps $(-4)^n$: explosive.
:::
:::

::: exercise Estimating the order from data {level=2 check="4"}
RK4 applied to the logistic equation $y' = y(1 - y)$, $y(0) = \frac12$ gives the approximations $0.731\,058\,283\,7$, $0.731\,058\,560\,1$ and $0.731\,058\,577\,5$ to $y(1)$ for $h = 0.2$, $0.1$ and $0.05$. Without using the exact solution, estimate the order $p$ from the ratio $\frac{y^{(0.2)} - y^{(0.1)}}{y^{(0.1)} - y^{(0.05)}}$, assuming the error behaves like $Ch^p$.
::: solution
If $y^{(h)} = y + Ch^p$, then $y^{(2h)} - y^{(h)} = C(2^p - 1)h^p$, so the ratio of consecutive differences is $2^p$. Here the differences are $0.731\,058\,560\,1 - 0.731\,058\,283\,7 = 2.764\times10^{-7}$ and $0.731\,058\,577\,5 - 0.731\,058\,560\,1 = 1.74\times10^{-8}$, with ratio about $15.9 \approx 2^4$. So $p = 4$, as expected for RK4. (The exact value is $\frac{1}{1 + e^{-1}} = 0.731\,058\,578\,6$; the actual errors, $-2.9\times10^{-7}$, $-1.8\times10^{-8}$ and $-1.2\times10^{-9}$, confirm it.) This trick needs no exact solution and is how orders are checked in practice.
:::
:::

::: exercise The trapezoidal rule {level=3}
Show that the trapezoidal rule $y_{n+1} = y_n + \frac h2\bigl(f(t_n, y_n) + f(t_{n+1}, y_{n+1})\bigr)$ has stability function $R(z) = \frac{1 + z/2}{1 - z/2}$, that $\abs{R(z)} < 1$ exactly when $\operatorname{Re}z < 0$, and that its truncation error is $O(h^2)$.
::: solution
For $f = \lambda y$: $y_{n+1}\left(1 - \frac z2\right) = y_n\left(1 + \frac z2\right)$, giving $R$. With $z = x + iy$, $\abs{1 + z/2}^2 - \abs{1 - z/2}^2 = (1 + x/2)^2 - (1 - x/2)^2 = 2x$, so $\abs R < 1$ iff $x < 0$. For the truncation error, $\tau = \frac{y(t_{n+1}) - y(t_n)}{h} - \frac12\bigl(y'(t_n) + y'(t_{n+1})\bigr)$ (since $f(t, y(t)) = y'(t)$). By Taylor's theorem $\frac{y(t_n + h) - y(t_n)}{h} = y' + \frac h2y'' + \frac{h^2}{6}y''' + O(h^3)$ and $\frac12(y'(t_n) + y'(t_n + h)) = y' + \frac h2y'' + \frac{h^2}{4}y''' + O(h^3)$, so $\tau = -\frac{h^2}{12}y''' + O(h^3)$: second order. (This is the trapezoid quadrature error of [[numerical-analysis/numerical-integration#thm-basic-errors]] in disguise.)
:::
:::

::: exercise The discrete Gronwall inequality {level=3}
Let $a_n \ge 0$ satisfy $a_{n+1} \le (1 + hL)a_n + hT$ for $n \ge 0$, with $h, L, T > 0$. Prove that $a_n \le e^{nhL}a_0 + \frac TL\left(e^{nhL} - 1\right)$, and explain how this extends [[#thm-convergence]] to the case $e_0 \ne 0$ (for instance an initial value rounded to machine precision).
::: solution
By induction, $a_n \le (1 + hL)^na_0 + hT\sum_{k=0}^{n-1}(1 + hL)^k$: true for $n = 0$, and if true for $n$ then $a_{n+1} \le (1 + hL)\left[(1 + hL)^na_0 + hT\sum_{k<n}(1 + hL)^k\right] + hT = (1 + hL)^{n+1}a_0 + hT\sum_{k\le n}(1 + hL)^k$. The geometric sum is $\frac{(1 + hL)^n - 1}{hL}$, and $(1 + hL)^n \le e^{nhL}$, giving the claim. With $a_n = \abs{e_n}$, the global error bound becomes $\abs{e_n} \le e^{L(t_n - t_0)}\abs{e_0} + \frac TL\left(e^{L(t_n - t_0)} - 1\right)$: an initial error is amplified at most by the same factor $e^{L(t - t_0)}$ as the truncation errors, so the method is stable with respect to perturbations of the data.
:::
:::

::: exercise No explicit method is A-stable, concretely {level=3}
Find the largest $r$ such that RK4 is stable on $[-r, 0]$, i.e. solve $R(-r) = 1$ for $R(z) = 1 + z + \frac{z^2}{2} + \frac{z^3}{6} + \frac{z^4}{24}$, numerically to three decimals. How small must $h$ be for $y' = -1000y$?
::: hint
$R(z) - 1 = z\left(1 + \frac z2 + \frac{z^2}{6} + \frac{z^3}{24}\right)$; find the real root of the cubic factor by Newton's method.
:::
::: solution
We need the negative real root of $q(z) = 1 + \frac z2 + \frac{z^2}{6} + \frac{z^3}{24}$, i.e. of $z^3 + 4z^2 + 12z + 24 = 0$. Newton's method from $z_0 = -3$ gives $z_1 = -2.8$, $z_2 = -2.785\,37$, $z_3 = -2.785\,293\,6$, converging quadratically to $z = -2.785\,29$. For $-2.785 < z < 0$ one checks $\abs{R(z)} < 1$ (on this interval $R$ is positive, with its minimum $0.270$ near $z = -1.60$). So RK4 is stable on $[-2.785, 0]$, and for $\lambda = -1000$ it needs $h \le 0.002\,785$ — even if the solution of interest varies on a time scale of seconds.
:::
:::
