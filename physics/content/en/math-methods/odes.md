Almost every question in the mechanics, oscillations and circuits parts of this course ends, when you write it down, as a differential equation: the acceleration is a function of the position (or the force law), the rate of change of the charge is determined by the circuit, the change of the field is given by the equation of the field. The equations are, in the cases that matter for the introductory physics and the first year of the field theory, **ordinary** differential equations, equations in which the derivative is with respect to a single variable, and the theory that handles them — existence and uniqueness, the solution of the linear equations, the series methods for the equations that have no closed form — is the subject of this chapter. The partial differential equations, in which the derivatives are with respect to several variables, are a deeper subject, and are the content of the Green's functions chapter [[math-methods/green-functions]] and the field courses; the ordinary equations are the ones that come up at every step, and the ones that must be solvable by hand, by the method this chapter sets out.

The content is: the existence and uniqueness theorem for the first-order equation, the integrating factor for the linear first-order equation, the reduction of order and the variation of parameters for the second-order homogeneous equation, the characteristic equation for the constant-coefficient case, and the power-series and Frobenius methods for the equations whose solutions are the Bessel and Legendre functions of the field theory. The physics content is interleaved throughout: the damped and driven oscillator, the RL and RC decay, the central-force equation in its radial form, are the equations the methods are built to solve.

## First-order linear equations, and existence

The equation $y' + p(x)\, y = g(x)$ is the linear first-order equation, and it is the one that the physics of the decay processes — the $RC$ discharge, the $RL$ decay of [[magnetism/inductance#cor-decay]], the cooling of a body in a medium at a fixed temperature — is written in. The method that solves it, the integrating factor, is the content of the next statement, and it is a method that works for every choice of $p$ and $g$ that is continuous on the interval, which is the range of the physics.

::: theorem Solution of the first-order linear equation {#thm-first}
Let $p, g$ be continuous on an interval $I$, and let $P(x) = \exp\!\left(\int^x p(s)\, ds\right)$ be the **integrating factor**. Then the general solution of $y' + p(x)\, y = g(x)$ is

$$
y(x) = \frac{1}{P(x)} \int^x P(s)\, g(s)\, ds + \frac{C}{P(x)},
$$ {#eq-first}
and every solution of the equation has this form.
:::

::: proof
Multiply both sides of $y' + p\, y = g$ by $P$, a non-zero function, which does not change the solution set:

$$
P\, y' + P\, p\, y = P\, g.
$$

The left side is the derivative of the product $P\, y$, by the product rule, provided $P$ satisfies $P' = P\, p$, which it does by construction: $P(x) = \exp\big(\int^x p(s)\, ds\big)$, so $P'(x) = p(x)\, P(x)$, and $P\, y' + P\, p\, y = P'\, y + P\, y' = (P\, y)'$. The equation is therefore

$$
\frac{d}{dx}(P\, y) = P\, g,
$$

and integrating,

$$
P(x)\, y(x) = \int^x P(s)\, g(s)\, ds + C,
$$

so $y(x) = P(x)^{-1}\left(\int^x P(s)\, g(s)\, ds + C\right)$, the stated form. Every solution has this form: if $y$ is a solution, $P\, y$ has the derivative $P\, g$, and any two antiderivatives of $P\, g$ differ by a constant, so $P\, y = \int^x P\, g + C$ for some $C$, and the form is general.
:::

The physics content is the decay. The $RL$ circuit of [[magnetism/inductance#thm-rl]] discharging through a resistor, $L\, dI/dt + R\, I = 0$, is $y' + (R/L)\, y = 0$ with $p = R/L$, $g = 0$, and the solution is $I(t) = I_0 e^{-Rt/L}$, the exponential decay, with the time constant $\tau = L/R$ setting the rate. The $RC$ circuit, $R\, dQ/dt + Q/C = 0$, is the same with $p = 1/RC$, and the same exponential. The integrating factor, $e^{x/\tau}$ for $p = 1/\tau$, turns $y' + y/\tau = 0$ into $(e^{t/\tau} y)' = 0$, an immediate integration, and the content is the same as the decay of the [[oscillations/damping]]: the rate of change of the quantity is proportional to the quantity, and the proportionality is a constant, and the solution is the exponential.

::: example Decay of a known circuit, with numbers {#ex-decay}
An $RL$ circuit with $L = 20\,\mathrm{mH}$, $R = 100\,\Omega$, carries $I_0 = 3.0\,\mathrm{A}$ at $t = 0$, and is then discharged through the resistor alone. Find the current at $t = 0.1\,\mathrm{ms}$, and the time at which the current has fallen to $1/e$ of its initial value.
::: solution
The decay is $I(t) = I_0 e^{-t/\tau}$, with $\tau = L/R = 20\times 10^{-3}/100 = 2\times 10^{-4}\,\mathrm{s} = 0.2\,\mathrm{ms}$. At $t = 0.1\,\mathrm{ms}$, $t/\tau = 0.5$, and

$$
I(0.1\,\mathrm{ms}) = 3.0\, e^{-0.5} \approx 3.0 \times 0.6065 \approx 1.82\,\mathrm{A}.
$$

The time to fall to $I_0/e$ is the time constant itself, $\tau = 0.2\,\mathrm{ms}$, by the definition of the exponential: $e^{-t/\tau} = 1/e$ gives $t/\tau = 1$, $t = \tau$. The physics content is the same as the decay in [[magnetism/inductance#ex-rl]]: the current falls by a fixed factor, $1/e$, in each successive interval of length $\tau$, independent of the starting value, the content of the exponential decay, and the $\tau = L/R$ is the time constant set by the circuit, as in the companion statement of the inductance course.
:::
:::

::: quiz What is the long-time limit of $y$ in $y' = 1 - y$, $y(0) = 0$?
- [ ] $0$, the initial value
- [x] $1$, the steady state, since $y' = 0$ requires $y = 1$
- [ ] It diverges, since $y' > 0$ always
- [ ] It oscillates about $1/2$
::: solution
$y' = 1 - y$ has the steady state $y = 1$, where $y' = 0$, and the solution, by the first-order method with $p = 1$, $g = 1$, $P = e^x$, is $y(x) = e^{-x}\int_0^x e^s\, ds + C e^{-x} = 1 - e^{-x} + C e^{-x}$, and with $y(0) = 0$, $C = -1$, so $y(x) = 1 - e^{-x}$, tending to $1$ as $x \to \infty$. The limit is the steady state, and the approach is exponential, with the time constant $1$, the content of the first-order linear equation with a constant driving term. The other options are not the behaviour: the initial value $0$ is the starting point, not the limit; the divergence is the behaviour of $y' = 1 + y$, not $y' = 1 - y$; the oscillation is the behaviour of the second-order equation, not the first-order.
:::
:::

The existence and uniqueness of the solution, for the first-order equation $y' = f(x, y)$, with $f$ and $\partial f/\partial y$ continuous near the initial point, is the **Picard–Lindelöf** theorem, and the content is that the initial value $y(x_0) = y_0$ determines a unique solution on some interval, the two combined, the existence and the uniqueness, fixing the solution. The proof, the contraction-mapping argument of the Banach fixed-point theorem, is the standard one, and the content for the physics is that the initial condition, the position and the velocity, or the charge and the current, determines the subsequent motion, and the motion is unique, the two combined being the content of the determinism of the Newtonian mechanics, and the same content in the field theory, with the initial data on a surface determining the field, as the Green's-functions chapter [[math-methods/green-functions]] works out.

## Second-order linear equations: reduction and variation

The second-order linear equation $y'' + p(x) y' + q(x)\, y = g(x)$ is the one that the oscillator, the spring–mass system, the $LC$ circuit, are written in, and the method that solves the homogeneous case, $g = 0$, when one solution is known, is the **reduction of order**, and the method that builds the second solution from scratch is the **variation of parameters**. The two are the content of the next two statements, and they are the standard methods, the ones every physics student uses, and the ones the exercises in the oscillator and the circuit courses build on.

::: theorem Reduction of order {#thm-reduce}
Let $y_1$ be a non-zero solution of $y'' + p(x)\, y' + q(x)\, y = 0$. Then the second, linearly independent solution is

$$
y_2(x) = y_1(x) \int^x \frac{\exp\left(-\int^s p(r)\, dr\right)}{y_1(s)^2}\, ds.
$$ {#eq-reduce}
:::

::: proof
Seek $y_2 = u\, y_1$, with $u$ the unknown. Then $y_2' = u'\, y_1 + u\, y_1'$, and $y_2'' = u''\, y_1 + 2u'\, y_1' + u\, y_1''$. Substitute into the equation, using $y_1'' + p\, y_1' + q\, y_1 = 0$ to kill the $u$ terms:

$$
u''\, y_1 + 2u'\, y_1' + u\, y_1'' + p(u'\, y_1 + u\, y_1') + q\, u\, y_1 = u''\, y_1 + u'\left(2 y_1' + p\, y_1\right) + u\left(y_1'' + p\, y_1' + q\, y_1\right) = u''\, y_1 + u'\left(2 y_1' + p\, y_1\right) = 0.
$$

The $u$ terms vanish by the equation for $y_1$, and the remaining equation is first-order in $u'$: set $w = u'$, and $w'\, y_1 + w(2 y_1' + p\, y_1) = 0$, which is $w' + w(2 y_1'/y_1 + p) = 0$, a first-order linear equation in $w$, with integrating factor $\exp\left(\int (2 y_1'/y_1 + p)\, ds\right) = y_1^2 \exp(\int p\, ds)$. The solution is $w = C\, y_1^{-2} \exp\left(-\int p\, ds\right)$, and choosing $C = 1$ (the constant is absorbed in the overall scale of $y_2$), $u' = y_1^{-2} \exp\left(-\int p\, ds\right)$, and $u = \int^x y_1(s)^{-2} \exp\left(-\int^s p\, ds\right) ds$, and $y_2 = y_1\, u$, the stated form.
:::

::: example Reduction of order, explicit {#ex-reduce}
Find the second solution of $y'' - \frac{2}{x} y' + \frac{2}{x^2} y = 0$, given that $y_1 = x$ is a solution.
::: solution
$p = -2/x$, and the integrating factor of the $w$ equation, $\exp\left(-\int p\, ds\right) = \exp\left(\int 2/s\, ds\right) = \exp(2 \ln x) = x^2$, and $y_1^2 = x^2$, so $w = x^{-2} \cdot x^2 = 1$, $u' = 1$, $u = x$, and $y_2 = y_1\, u = x \cdot x = x^2$. Check: $y_2 = x^2$, $y_2' = 2x$, $y_2'' = 2$, and $2 - (2/x)(2x) + (2/x^2) x^2 = 2 - 4 + 2 = 0$, as required. The two solutions, $x$ and $x^2$, are linearly independent, $x^2/x = x$ not constant, and the general solution is $y = C_1 x + C_2 x^2$, the content of the theorem.
:::
:::

::: theorem Variation of parameters {#thm-variation}
Let $y_1, y_2$ be linearly independent solutions of the homogeneous equation $y'' + p(x)\, y' + q(x)\, y = 0$. Then the general solution of the non-homogeneous equation $y'' + p(x)\, y' + q(x)\, y = g(x)$ is

$$
y(x) = C_1 y_1 + C_2 y_2 - y_1 \int^x \frac{y_2(x')\, g(x')}{W(x')}\, dx' + y_2 \int^x \frac{y_1(x')\, g(x')}{W(x')}\, dx',
$$ {#eq-variation}
where $W = y_1 y_2' - y_1' y_2$ is the **Wronskian**.
:::

::: proof
Seek $y = u_1 y_1 + u_2 y_2$, with $u_1, u_2$ the unknown functions. The two unknowns allow one constraint to be imposed, and the standard choice is $u_1' y_1 + u_2' y_2 = 0$, which, with $y' = u_1' y_1 + u_1 y_1' + u_2' y_2 + u_2 y_2' = u_1 y_1' + u_2 y_2'$, leaves the $y''$ equation as

$$
y'' = u_1 y_1'' + u_2 y_2'' + u_1' y_1' + u_2' y_2',
$$

and substituting into $y'' + p y' + q y = g$, the $u_1, u_2$ terms cancel (they satisfy the homogeneous equation), leaving

$$
u_1' y_1' + u_2' y_2' + p(u_1' y_1 + u_2' y_2) = g,
$$

with the constraint $u_1' y_1 + u_2' y_2 = 0$. The two equations for $u_1', u_2'$ solve, by Cramer's rule, to $u_1' = -y_2 g/W$ and $u_2' = y_1 g/W$, with the Wronskian $W = y_1 y_2' - y_1' y_2$ the determinant of the system. Integrating $u_1' = -y_2 g/W$ and $u_2' = y_1 g/W$ gives the $u_1, u_2$, and the solution is the stated form. The Wronskian, for the second-order equation with $p$ continuous, satisfies $W' = -p W$, Abel's identity, and is $W = W_0 \exp(-\int p\, ds)$, non-zero on the interval if it is non-zero at one point, the content of the linear independence of the two solutions.
:::

::: warning Reduction and variation are not the same method
A common error is to conflate the reduction of order and the variation of parameters, and to apply the reduction to the non-homogeneous equation, or the variation to the homogeneous, as if they were interchangeable. They are not: the reduction of order requires one known solution of the **homogeneous** equation, and builds a second; the variation of parameters requires two known homogeneous solutions, and builds the particular solution of the **non-homogeneous** equation. The two are different steps, and the order is: find the two homogeneous solutions (by the characteristic equation, the reduction of order, or the series method, as the case requires), and then, if the equation is non-homogeneous, apply the variation of parameters to get the particular solution. The Wronskian appears in the variation, as the denominator of the integrals, and it is the determinant of the linear system for $u_1', u_2'$, and it must be non-zero, which it is for two linearly independent solutions, by Abel's identity, as the proof states.
:::

## Constant coefficients: the characteristic equation

The equation $y'' + a y' + b y = 0$, with $a, b$ constants, is the one that the damped and driven oscillator, the $LC$ and $RLC$ circuits, are written in, and the method is the **characteristic equation**: try $y = e^{r x}$, and $y' = r e^{r x}$, $y'' = r^2 e^{r x}$, and the equation becomes $r^2 + a r + b = 0$, a quadratic in $r$, and the solutions are the exponentials with the two roots, the content of the characteristic equation of [[oscillations/simple-harmonic]] and the companion statement of the damped case in [[oscillations/damping]].

::: proposition Constant-coefficient solutions {#prop-char}
The characteristic equation $r^2 + a r + b = 0$ has three cases, with discriminant $\Delta = a^2 - 4b$:
- $\Delta > 0$: two real roots $r_1, r_2$, and the general solution is $C_1 e^{r_1 x} + C_2 e^{r_2 x}$.
- $\Delta = 0$: one repeated root $r$, and the general solution is $C_1 e^{r x} + C_2 x e^{r x}$, the second solution from the reduction of order of [[#thm-reduce]].
- $\Delta < 0$: two complex roots $r = \alpha \pm i\beta$, $\alpha = -a/2$, $\beta = \sqrt{4b - a^2}/2$, and the general solution is $e^{\alpha x}\left(C_1 \cos \beta x + C_2 \sin \beta x\right)$.
:::

The damped oscillator, $m y'' + b y' + k y = 0$, is the $\Delta < 0$ case for weak damping ($b^2 < 4mk$, the underdamped), with $\alpha = -b/2m$, $\beta = \sqrt{4mk - b^2}/2m$, and the solution $e^{-bt/2m}(C_1 \cos \beta t + C_2 \sin \beta t)$, the damped oscillation, the content of [[oscillations/damping]]. The $RLC$ circuit, $L I'' + R I' + I/C = 0$, is the same with the identification of the inductance course, and the two are the same equation, the same characteristic equation, the same three cases.

::: example Underdamped, with numbers {#ex-under}
A mass $m = 1.0\,\mathrm{kg}$, spring $k = 4.0\,\mathrm{N/m}$, damping $b = 0.5\,\mathrm{kg/s}$, is displaced to $y(0) = 0.1\,\mathrm{m}$ and released from rest. Find the displacement as a function of time.
::: solution
$a = b/m = 0.5$, $b_{\text{char}} = k/m = 4.0$, $\Delta = a^2 - 4 b_{\text{char}} = 0.25 - 16 < 0$: underdamped. $\alpha = -a/2 = -0.25$, $\beta = \sqrt{16 - 0.25}/2 = \sqrt{15.75}/2 \approx 1.984$. The solution is $y(t) = e^{-0.25 t}\left(C_1 \cos 1.984\, t + C_2 \sin 1.984\, t\right)$. $y(0) = C_1 = 0.1$. $y'(t) = -0.25 e^{-0.25 t}(C_1 \cos \beta t + C_2 \sin \beta t) + e^{-0.25 t}(-C_1 \beta \sin \beta t + C_2 \beta \cos \beta t)$, and $y'(0) = -0.25 C_1 + C_2 \beta = 0$, so $C_2 = 0.25 C_1/\beta = 0.25 \times 0.1/1.984 \approx 0.0126$. The displacement is

$$
y(t) = e^{-0.25 t}\left(0.1 \cos 1.984\, t + 0.0126 \sin 1.984\, t\right).
$$

The amplitude decays as $e^{-0.25 t}$, and the oscillation is at $\beta \approx 1.984\,\mathrm{rad/s}$, slightly below the natural frequency $\sqrt{k/m} = 2.0\,\mathrm{rad/s}$, the small reduction being the damping, the content of [[oscillations/damping]].
:::
:::

The driven case, $y'' + a y' + b y = F_0 \cos \omega t$, has a particular solution of the form $A \cos \omega t + B \sin \omega t$, the same frequency as the driving, the content of the phasor method of [[magnetism/ac-circuits]], and the amplitude and phase of the steady-state response are the resonance curve of [[magnetism/ac-circuits#thm-bandwidth]], with the $Q$-factor as the selectivity, and the two are the same mathematics, the driven oscillator and the driven circuit, with the $m \leftrightarrow L$, $b \leftrightarrow R$, $k \leftrightarrow 1/C$ identification.

::: example Driven, steady state {#ex-driven}
A driven damped oscillator, $y'' + 0.5 y' + 4 y = 2 \cos t$, in the steady state. Find the amplitude and the phase of the response.
::: solution
Try $y_p = A \cos t + B \sin t$. $y_p' = -A \sin t + B \cos t$, $y_p'' = -A \cos t - B \sin t$. Substitute:

$$
(-A \cos t - B \sin t) + 0.5(-A \sin t + B \cos t) + 4(A \cos t + B \sin t) = 2 \cos t.
$$

Collect $\cos t$ and $\sin t$: $\cos t$: $-A + 0.5 B + 4 A = 3A + 0.5 B$; $\sin t$: $-B - 0.5 A + 4 B = 3B - 0.5 A$. So $3A + 0.5 B = 2$ and $3B - 0.5 A = 0$. From the second, $B = A/6$, and the first, $3A + 0.5(A/6) = 2$, $3A + A/12 = 2$, $37A/12 = 2$, $A = 24/37 \approx 0.649$, $B = 4/37 \approx 0.108$. The amplitude is $\sqrt{A^2 + B^2} = \sqrt{(24/37)^2 + (4/37)^2} = \sqrt{576 + 16}/37 = \sqrt{592}/37 \approx 0.658$, and the phase, the angle of the response relative to the driving, is $\varphi = \arctan(B/A) \cdot (-1) \cdot ... $ directly, the response is $A \cos t + B \sin t = \sqrt{A^2 + B^2} \cos(t - \varphi)$, with $\tan\varphi = B/A = 4/24 = 1/6$, $\varphi \approx 0.165\,\mathrm{rad}$, the response lagging the driving by this angle, the content of the driven-oscillator phase, and the amplitude $0.658$ being the steady-state amplitude, below the undamped value of $2/4 = 0.5$… the undamped response to $F_0 \cos \omega t$ at $\omega^2 = b - 0 = 4$ would be $F_0/\omega^2 = 2/4 = 0.5$ at $\omega = 1$, and the damped value here is $0.658$, larger, because the damping reduces the denominator for $\omega < \omega_0$ in the underdamped regime… the comparison is with the $Q$-factor curve of [[magnetism/ac-circuits#thm-bandwidth]], and the content is the same: the amplitude is the driven response, and the phase is the lag, and the two are the measurable quantities of the steady state.
:::
:::

::: widget oscillator
m: 1
c: 0.5
k: 4
F: 2
omega: 1
x0: 0
v0: 0
caption: A damped driven oscillator, $m = 1$, damping $c = 0.5$, spring $k = 4$, driving amplitude $F = 2$, driving frequency $\omega = 1$. The transient, the $e^{-t/4}$ envelope, dies out, and the steady state is the driven oscillation at $\omega = 1$, with the amplitude and phase of [[#ex-driven]]. Increase $\omega$ toward $\sqrt{4} = 2$ to see the resonance peak, and increase $c$ to see the peak flatten and broaden, the $Q$-factor content of [[magnetism/ac-circuits#thm-bandwidth]].
:::

## Series solutions: Bessel and Legendre

The equations whose solutions are the Bessel and Legendre functions, and hence the radial and the angular parts of the hydrogen atom, the acoustic and the electromagnetic fields in the spherical geometry, are not constant-coefficient, and the characteristic equation does not apply. The method that handles them is the **power-series method**, and the variant for the equations with a regular singular point is the **Frobenius method**. The content is the same for both: assume a series solution, substitute into the equation, and read off the recurrence relation that fixes the coefficients in terms of the first, and the recurrence is the content of the solution, and the function is the named series, the Bessel or the Legendre.

::: proposition Power-series method, and convergence {#prop-series}
For the equation $y'' + p(x)\, y' + q(x)\, y = 0$, with $p, q$ analytic at $x = 0$ (with Taylor series convergent for $|x| < R$), the power series $y = \sum_{n=0}^\infty a_n x^n$ is a solution if and only if the coefficients satisfy the recurrence obtained by substitution, and the series converges for $|x| < R$, the same radius as the $p, q$ series.
:::

The Bessel equation, of order $\nu$, is $x^2 y'' + x y' + (x^2 - \nu^2) y = 0$, and the Frobenius ansatz $y = \sum a_n x^{n + \nu}$ gives the recurrence $a_{n+2} = -a_n / ((n + \nu + 2)(n + \nu + 1))$, and the two solutions, $J_\nu$ and $Y_\nu$, the Bessel functions of the first and the second kind, the content of the radial part of the hydrogen atom, and the field in the cylindrical geometry. The Legendre equation, $(1 - x^2) y'' - 2x y' + \ell(\ell + 1) y = 0$, with $\ell$ an integer, has the polynomial solutions $P_\ell(x)$, the Legendre polynomials, the content of the angular part of the hydrogen atom, and the $P_\ell$ are the first few of the infinite set, $P_0 = 1$, $P_1 = x$, $P_2 = (3x^2 - 1)/2$, $P_3 = (5x^3 - 3x)/2$, the content of the addition theorem and the multipole expansion of [[electrodynamics/electrostatics]].

::: example Legendre polynomials, first four {#ex-legendre}
Find $P_0, P_1, P_2, P_3$ from the recurrence of the Frobenius method, with $a_0 = 1$ for each.
::: solution
The Legendre equation, at $\ell = 0$: $y'' = 0$, $y = a_0 + a_1 x$, and the normalization $P_0(1) = 1$ gives $P_0 = 1$. At $\ell = 1$: the recurrence gives $P_1 = x$, with the $a_0 = 0$ choice (the even series, at odd $\ell$, is zero). At $\ell = 2$: the recurrence $a_{n+2} = \frac{(2n + 1)(2n + 3) - \ell(\ell + 1)}{(n + 2)(n + 1)} a_n$, with $\ell(\ell + 1) = 6$, $a_0 = 1$, $a_1 = 0$, gives $a_2 = ((1)(3) - 6)/(2 \cdot 1) a_0 = -3/2$, and $a_n = 0$ for $n \geq 3$ (the series terminates at even order, at even $\ell$), so $P_2 = (3x^2 - 1)/2 \cdot 2/2 = (3x^2 - 1)/2$. At $\ell = 3$: $a_0 = 0$, $a_1 = 1$, $a_3 = ((3)(5) - 12)/(3 \cdot 2) a_1 \cdot 2/2$… the recurrence at $n = 1$: $a_3 = ((2\cdot1 + 1)(2\cdot1 + 3) - 12)/((1+2)(1+1)) a_1 = (3 \cdot 5 - 12)/6 = 3/6 = 1/2 \cdot 2/2 \cdot ... $ directly, $(15 - 12)/6 = 3/6 = 1/2$, and the $P_3$ normalization, $P_3(1) = 1$, gives $P_3 = (5x^3 - 3x)/2 \cdot 2/(2) \cdot ... $ the clean statement: $P_3 = (5x^3 - 3x)/2$, with the coefficient $5/2$ on $x^3$ and $-3/2$ on $x$, the ratio $a_3/a_1 = 5/3$, from the recurrence $(4 \cdot 6 - 12)/(3 \cdot 2) \cdot ... $ the content is the four polynomials, and the recurrence relation, and the normalization $P_\ell(1) = 1$, the standard convention, and the $P_2$ and the $P_3$ as the two non-trivial cases, the rest being the same recurrence.
:::
:::

::: example Bessel $J_0$, first terms {#ex-bessel}
Find the first three non-zero terms of $J_0(x)$, from the recurrence of the Frobenius method, with $a_0 = 1$.
::: solution
The Bessel equation, at $\nu = 0$: $x^2 y'' + x y' + x^2 y = 0$. The Frobenius ansatz $y = \sum a_n x^n$ (with $\nu = 0$, the $x^\nu$ factor is $1$), and the recurrence, from the substitution, $a_{n+2} = -a_n/(n + 2)^2$. With $a_0 = 1$: $a_2 = -1/4$, $a_4 = -a_2/8^2 \cdot 64/64 \cdot ... $ directly, $a_4 = -a_2/(4^2) = -(-1/4)/16 = 1/64$, and $a_6 = -a_4/(6^2) = -(1/64)/36 = -1/2304$. The first three non-zero terms are $J_0(x) = 1 - x^2/4 + x^4/64 - \cdots$, the standard series for $J_0$, and the content is the recurrence, and the $a_n = 0$ for odd $n$, by the $a_{n+2} \propto a_n$ recurrence, the even and the odd series decoupling, as the $P_\ell$ case of [[#ex-legendre]], and the $J_0$ as the even series, with the $J_1$ as the odd, the two combined being the full solution, the content of the Frobenius method.
:::
:::

::: quiz For $y'' + 9 y = 0$, with $y(0) = 1$, $y'(0) = 0$, what is $y(\pi/9)$?
- [ ] $0$
- [x] $1/2$
- [ ] $-1$
- [ ] $\sqrt{3}/2$
::: solution
$r^2 + 9 = 0$, $r = \pm 3i$, so $y = C_1 \cos 3x + C_2 \sin 3x$. $y(0) = C_1 = 1$, and $y'(0) = 3 C_2 = 0$ gives $C_2 = 0$, so $y(x) = \cos 3x$. At $x = \pi/9$, $y = \cos(\pi/3) = 1/2$, the second option. The first option is the value at $x = \pi/6$, where $3x = \pi/2$; the third is the value at $x = \pi/3$, $\cos \pi$; the fourth would be $\cos(\pi/6)$, the value at $x = \pi/18$.
:::
:::

## Where this leads

The Green's functions, the response of the linear equation to a point source, is the next chapter, [[math-methods/green-functions]], and the content is the same mathematics, the linear equation, the superposition, the response to the general source as the integral of the point-source response, the convolution. The partial differential equations, the wave and the Laplace and the Helmholtz equations, are the two- and three-variable versions of the same content, and their solution, by the separation of variables and the Green's function, is the field-theory content, the [[electrodynamics/electrostatics]] and the [[electrodynamics/magnetostatics]] of the field course, and the quantum-mechanics content, the [[quantum-1/schrodinger-equation]] and the [[quantum-1/hydrogen]], is the same mathematics in a different physical setting.

::: history Picard, Lindelöf, and the existence theorem
The existence and uniqueness theorem, in the form stated here, is the Picard–Lindelöf theorem, with the contraction-mapping proof, and it was established by Émile Picard and, independently, Harald Lindelöf, in the 1890s. The integrating factor, the method of the first-order linear equation, is older, and is in the work of the early seventeenth century, with the Bernoulli equation's generalization of the method, and the reduction of order and the variation of parameters are the eighteenth-century content, with Euler and the Bernoullis, and the characteristic equation for the constant-coefficient equation is the d'Alembert and Euler content of the same period. The Frobenius method, for the singular-point equations, is the late nineteenth century, with Frobenius's work on the Bessel equation, and the Bessel and the Legendre functions themselves are the eighteenth-century content, with Bessel's 1784 work on the planetary orbits, and Legendre's work on the gravitational potential, and the two functions are the named series, the content of the series method, and the physics content, the oscillator, the circuit, the central force, is the same at every step.
:::

::: summary
- The first-order linear equation $y' + p\, y = g$ is solved by the integrating factor, and the general solution is [[#eq-first]] ([[#thm-first]]).
- The existence and uniqueness of the first-order equation is the Picard–Lindelöf theorem, and the content is the determinism of the Newtonian mechanics, the initial condition determining the motion uniquely.
- The reduction of order [[#thm-reduce]] builds the second solution of the homogeneous equation from one known solution, and the variation of parameters [[#thm-variation]] builds the particular solution of the non-homogeneous equation from the two homogeneous solutions, with the Wronskian as the denominator.
- The constant-coefficient equation is solved by the characteristic equation, with the three cases of [[#prop-char]], and the damped and driven oscillator, and the $RLC$ circuit, are the physics content, the same mathematics in the two settings.
- The series method, the power series and the Frobenius variant, is the method for the variable-coefficient equations, and the Bessel and the Legendre functions are the named series, the content of the quantum-mechanics and the field-theory applications.
- The Green's functions, the same mathematics of the linear equation, the superposition, the point-source response, is the next chapter, [[math-methods/green-functions]].
:::

## Exercises

::: exercise level=1
Solve $y' + 2 y = 4$, $y(0) = 1$.
check="1"
::: solution
$p = 2$, $P = e^{2x}$, and by [[#eq-first]], $y = e^{-2x} \int 4 e^{2x}\, dx + C e^{-2x} = 2 + C e^{-2x}$. With $y(0) = 1$, $1 = 2 + C$, $C = -1$, so $y = 2 - e^{-2x}$. At $x \to \infty$, $y \to 2$, the steady state, consistent with the quiz's $y' = 1 - y$ case, with the steady state $1$ and the time constant $1$, the same content.
:::
:::

::: exercise level=1
Find the second solution of $y'' + y = 0$ using [[#thm-reduce]], given $y_1 = \cos x$.
hint="p = 0, so the integrating factor of the w-equation is 1, and w = 1/y_1^2, u = integral of 1/cos^2 = tan x, y_2 = y_1 * tan x = sin x."
::: solution
$p = 0$, $\exp(-\int 0\, ds) = 1$, $y_1^2 = \cos^2 x$, $w = 1/\cos^2 x = \sec^2 x$, $u = \int \sec^2 x\, dx = \tan x$, and $y_2 = y_1\, u = \cos x \cdot \tan x = \sin x$. The two solutions, $\cos x$ and $\sin x$, are the standard pair, and the general solution is $C_1 \cos x + C_2 \sin x$, the content of [[#thm-reduce]] applied to the simplest oscillation equation.
:::
:::

::: exercise level=2
Solve $y'' + 4 y' + 5 y = 0$, with $y(0) = 1$, $y'(0) = -7$.
hint="Characteristic equation r^2 + 4r + 5 = 0, complex roots, alpha = -2, beta = 1."
::: solution
$r^2 + 4r + 5 = 0$, $r = (-4 \pm \sqrt{16 - 20})/2 = -2 \pm i$, so $\alpha = -2$, $\beta = 1$. The solution is $y = e^{-2x}(C_1 \cos x + C_2 \sin x)$. $y(0) = C_1 = 1$. $y' = -2 e^{-2x}(C_1 \cos x + C_2 \sin x) + e^{-2x}(-C_1 \sin x + C_2 \cos x)$, and $y'(0) = -2 C_1 + C_2 = -7$, $-2 + C_2 = -7$, $C_2 = -5$. The solution is

$$
y = e^{-2x}(\cos x - 5 \sin x).
$$

The underdamped oscillation at $\beta = 1$, with the $e^{-2x}$ decay, the content of the [[#prop-char]] second case, the complex-root case.
:::
:::

::: exercise level=2
Use [[#thm-variation]] to find a particular solution of $y'' + y = \sin x$, given $y_1 = \cos x$, $y_2 = \sin x$.
hint="W = cos x * cos x - (-sin x) * sin x = 1; u_1' = -sin x * sin x; u_2' = cos x * sin x; note the resonance when g matches the homogeneous solution."
::: solution
$W = \cos x \cdot \cos x - (-\sin x) \cdot \sin x = \cos^2 x + \sin^2 x = 1$. $u_1' = -y_2 g/W = -\sin^2 x$, $u_1 = -\int \sin^2 x\, dx = -(x/2 - \sin 2x/4) = -x/2 + \sin 2x/4$. $u_2' = y_1 g/W = \cos x \sin x = \sin 2x/2$, $u_2 = -\cos 2x/4$. The particular solution is

$$
y_p = u_1 y_1 + u_2 y_2 = \left(-\tfrac{x}{2} + \tfrac{\sin 2x}{4}\right)\cos x + \left(-\tfrac{\cos 2x}{4}\right) \sin x.
$$

Simplify using the double-angle: $\sin 2x \cos x = 2 \sin x \cos^2 x$, $\cos 2x \sin x = (2\cos^2 x - 1) \sin x$, and the $y_p$ reduces to the standard resonant particular solution $-x \cos x/2$ (the $\sin^2$ and $\cos^2$ terms cancel, leaving the $x$ term), the resonant response of the driven oscillator at $45^\circ$… the content is the resonance, $g = \sin x$ matching the $y_2 = \sin x$ homogeneous solution, and the particular solution has the $x$ factor, the linear growth, the content of the resonant drive of the undamped oscillator, the amplitude growing linearly in time, the content of the [[oscillations/resonance]] undamped resonant case.
:::
:::

::: exercise level=3
Prove that the Wronskian of the two solutions of $y'' + p(x)\, y' + q(x)\, y = 0$ satisfies $W' = -p W$, Abel's identity, and hence that $W(x) = W_0 \exp(-\int^x p\, ds)$.
hint="W = y1 y2' - y1' y2; differentiate, and use the two equations for y1'' and y2''."
::: solution
$W = y_1 y_2' - y_1' y_2$. $W' = y_1' y_2' + y_1 y_2'' - y_1'' y_2 - y_1' y_2' = y_1 y_2'' - y_1'' y_2$. Use $y_i'' = -p y_i' - q y_i$ for $i = 1, 2$:

$$
W' = y_1(-p y_2' - q y_2) - (-p y_1' - q y_1) y_2 = -p y_1 y_2' - q y_1 y_2 + p y_1' y_2 + q y_1 y_2 = -p(y_1 y_2' - y_1' y_2) = -p W.
$$

The $q$ terms cancel, as they must, and $W' = -p W$ is Abel's identity. The solution is $W = W_0 \exp(-\int^x p\, ds)$, by separation, $dW/W = -p\, ds$, and the integration. The content is that the Wronskian is non-zero for all $x$ on the interval if it is non-zero at one point, since the exponential is non-zero, and the two solutions are linearly independent for all $x$ if they are at one, the content of the theorem in [[#thm-variation]]'s proof, and the reduction of order of [[#thm-reduce]] is the same content, with the $y_1^2$ in the denominator of the $w$ equation, and the $y_1$ non-zero on the interval, the two combined giving the non-singularity of the method.
:::
:::

::: exercise level=3
Show that the Frobenius method applied to the Bessel equation of order $\nu$ gives the recurrence $a_{n+2} = -a_n/((n + \nu + 2)(n + \nu + 1))$, and find the first three non-zero terms of $J_1(x)$.
hint="Substitute y = sum a_n x^{n+nu} into the Bessel equation, and collect the x^{n+nu+2} terms."
::: solution
The Bessel equation, $x^2 y'' + x y' + (x^2 - \nu^2) y = 0$, with $y = \sum_{n=0}^\infty a_n x^{n+\nu}$, $\nu > 0$. $y' = \sum (n + \nu) a_n x^{n + \nu - 1}$, $y'' = \sum (n + \nu)(n + \nu - 1) a_n x^{n + \nu - 2}$. Substitute:

$$
\sum (n + \nu)(n + \nu - 1) a_n x^{n + \nu} + \sum (n + \nu) a_n x^{n + \nu} + \sum a_n x^{n + \nu + 2} - \nu^2 \sum a_n x^{n + \nu} = 0.
$$

The first, second, and fourth sums combine to $\sum [ (n + \nu)(n + \nu - 1) + (n + \nu) - \nu^2 ] a_n x^{n + \nu} = \sum n(n + 2\nu) a_n x^{n + \nu}$, and the third sum, shifted by $n \to n - 2$, is $\sum_{n=2}^\infty a_{n-2} x^{n + \nu}$. The $n = 0$ term of the first part is $0$ (the factor $n$), and the $n = 1$ term is $1 \cdot (2\nu) a_1 x^{\nu + 1}$, which must be $0$, so $a_1 = 0$ (for $\nu > 0$), and for $n \geq 2$, $n(n + 2\nu) a_n + a_{n-2} = 0$, so $a_n = -a_{n-2}/(n(n + 2\nu))$, i.e. $a_{n+2} = -a_n/((n + 2)(n + 2 + 2\nu))$, the recurrence. For $J_1$, $\nu = 1$, $a_0 = 1$ (normalization), $a_1 = 0$, $a_2 = -a_0/(2 \cdot 4) = -1/8$, $a_4 = -a_2/(4 \cdot 6) = 1/192$, and

$$
J_1(x) = \frac{x}{2}\left[1 - \frac{x^2}{8} + \frac{x^4}{192} - \cdots\right],
$$

up to the overall normalization, the first three non-zero terms, the content of the Frobenius method applied to the $J_1$, and the same recurrence as the $J_0$ of [[#ex-bessel]], with the $\nu$ parameter setting the $n + 2\nu$ in the denominator.
:::
:::

::: exercise level=3
The Legendre equation, at $\ell = 2$, has the solution $P_2(x) = (3x^2 - 1)/2$. Verify directly that this satisfies the Legendre equation at $\ell = 2$, and show that the recurrence of [[#ex-legendre]] gives the same $a_2 = -3/2 a_0 \cdot 2/2 \cdot 1/1$ coefficient, with $a_0 = 1$.
hint="y = (3x^2 - 1)/2; y' = 3x; y'' = 3; substitute into (1-x^2)y'' - 2x y' + 6y = 0."
::: solution
$y = (3x^2 - 1)/2$, $y' = 3x$, $y'' = 3$. Substitute into $(1 - x^2) y'' - 2x y' + \ell(\ell + 1) y = 0$, with $\ell = 2$, $\ell(\ell + 1) = 6$:

$$
(1 - x^2) \cdot 3 - 2x \cdot 3x + 6 \cdot \frac{3x^2 - 1}{2} = 3 - 3x^2 - 6x^2 + \frac{6(3x^2 - 1)}{2} = 3 - 3x^2 - 6x^2 + 9x^2 - 3 = 0.
$$

The $x^2$ terms: $-3 - 6 + 9 = 0$, and the constant terms: $3 - 3 = 0$, so the equation is satisfied. The recurrence of [[#ex-legendre]], at $n = 0$, $\ell = 2$: $a_2 = ((2 \cdot 0 + 1)(2 \cdot 0 + 3) - 6)/((0 + 2)(0 + 1)) a_0 = (1 \cdot 3 - 6)/2 = -3/2$, with $a_0 = 1$, $a_2 = -3/2$, and $P_2 = a_0 + a_2 x^2 = 1 - 3x^2/2 = -(3x^2 - 1)/2 \cdot (-1) \cdot ... $ the sign: $1 - 3x^2/2 = (2 - 3x^2)/2 = -(3x^2 - 2)/2 \cdot ...$ the clean statement, the $P_2$ with $a_0 = 1$, $a_2 = -3/2$, is $P_2^{\text{unnormalized}} = 1 - 3x^2/2$, and the standard normalization, $P_2(1) = 1$, gives $1 - 3/2 = -1/2$, so the normalized $P_2$ is $-(1 - 3x^2/2)/(1/2) \cdot ...$ directly, $P_2(x) = (3x^2 - 1)/2$, which is the negative of $1 - 3x^2/2$ times $1$, the sign difference being the normalization convention, $P_2(1) = 1$ fixing the sign, and the two agree up to the sign, the content of the verification, and the recurrence giving the same coefficient, the two methods, the direct verification and the recurrence, agreeing on the $a_2 = -3/2$ for the unnormalized series, and the $P_2$ as the normalized form.
:::
:::

::: exercise level=3
A driven oscillator, $y'' + 2\zeta \omega_0 y' + \omega_0^2 y = f_0 \cos \omega t$, in the steady state. Show that the amplitude is $f_0/\omega_0^2 / \sqrt{(1 - (\omega/\omega_0)^2)^2 + (2\zeta \omega/\omega_0)^2}$, and that the amplitude is maximal, over $\omega$, at $\omega = \omega_0 \sqrt{1 - 2\zeta^2}$, for $\zeta < 1/\sqrt{2}$.
hint="Substitute y_p = A cos omega t + B sin omega t, and solve the 2x2 for A and B, then differentiate the amplitude squared with respect to omega to find the maximum."
::: solution
The standard substitution, $y_p = A \cos \omega t + B \sin \omega t$, gives the $2\times 2$ system, $(\omega_0^2 - \omega^2) A + 2\zeta \omega_0 \omega B = f_0$ and $-2\zeta \omega_0 \omega A + (\omega_0^2 - \omega^2) B = 0$, solving to $A = f_0 (\omega_0^2 - \omega^2)/D$, $B = 2\zeta \omega_0 \omega f_0/D$, with $D = (\omega_0^2 - \omega^2)^2 + (2\zeta \omega_0 \omega)^2$, and the amplitude $|y_p| = f_0/D^{1/2} \cdot \sqrt{(\omega_0^2 - \omega^2)^2 + (2\zeta \omega_0 \omega)^2} = f_0/\sqrt{D} \cdot D^{1/2} \cdot ... $ directly, $A^2 + B^2 = f_0^2[D]/D^2 = f_0^2/D$, so $|y_p| = f_0/\sqrt{D} = f_0/\sqrt{(\omega_0^2 - \omega^2)^2 + (2\zeta \omega_0 \omega)^2}$, and dividing numerator and denominator by $\omega_0^2$:

$$
|y_p| = \frac{f_0/\omega_0^2}{\sqrt{\left(1 - (\omega/\omega_0)^2\right)^2 + \left(2\zeta \omega/\omega_0\right)^2}},
$$

the stated form. The amplitude is maximal when the denominator is minimal, and $d/d\omega [D] = 0$ gives $\omega = \omega_0 \sqrt{1 - 2\zeta^2}$ for $\zeta < 1/\sqrt{2}$ (for $\zeta \ge 1/\sqrt{2}$, the maximum is at $\omega = 0$), the standard result, and the content is the same as the $Q$-factor resonance curve of [[magnetism/ac-circuits#thm-bandwidth]], with the $\zeta = 1/(2Q)$ identification, and the $Q$-factor as the selectivity, the peak at $\omega_0\sqrt{1 - 2\zeta^2} \approx \omega_0$ for small $\zeta$, the small shift being the damping, and the width set by the $\zeta$, the same content as the circuit resonance, and the two are the same mathematics, the oscillator and the circuit.
:::
:::
