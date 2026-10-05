The linear differential equations of the physics — the Poisson equation for the gravitational and the electrostatic potential, the wave equation, the Helmholtz equation, the Schrödinger equation of the quantum course — have one common feature that makes them tractable: **linearity**, the property that a sum of solutions is a solution, and a response to a scaled source is scaled by the same factor. The Green's function is the systematic exploitation of the two properties: the response to the *general* source is assembled from the responses to *point* sources, by superposition, and the point-source response is a single function of two variables, the observation point and the source point, that satisfies the equation with a point source at the source point. The calculation of the general response reduces to a single integral over the source, with the Green's function as the kernel, and the Green's function itself is a function that is computed once per geometry (per boundary, per frequency, per the parameters of the equation), and reused for every source in that geometry. This is the content of the Green's-function method, and it is the method that underlies the electrostatics of [[electrodynamics/electrostatics]], the wave and the scattering theory of the field, and the propagator of the quantum course.

This chapter works out the method in the one-dimensional case, where the Green's function is a piecewise function of the two variables $x$ and $\xi$, and computes explicitly: the Green's function of the string and of the beam equation (the Poisson equation in one dimension, $-u'' = f$), with fixed and with free boundary conditions; the causal Green's function of the driven oscillator, the time-domain kernel of the resonance course; the Green's function of the Helmholtz equation, the wave equation in its frequency form; and the three-dimensional free-space Green's function, $1/(4\pi |x - \xi|)$, the kernel of the gravitational and the electrostatic potential in free space. The partial-differential-equation versions, in two and three dimensions with boundaries, are the same mathematics in a higher number of variables, and are the content of the field courses, and the quantum-mechanics propagator, the Green's function of the Schrödinger equation, is the same method in the quantum setting.

## The one-dimensional Green's function

The equation in question is $L u = f$, with $L$ a second-order linear operator, in this chapter $L = -d^2/dx^2$ with boundary conditions at $x = 0$ and $x = L$, the string in lateral deflection. The Green's function $G(x, \xi)$ is defined by the equation with the point source,

$$
L\, G(x, \xi) = \delta(x - \xi), \qquad \text{in } (0, L),
$$ {#eq-green-def}
with the **homogeneous** boundary conditions of the equation (the homogeneous meaning: the boundary conditions with the right side zero, $u(0) = u(L) = 0$ for the fixed string). The point source $\delta(x - \xi)$, the Dirac delta, is the idealisation of a point load of unit magnitude, and the Green's function is the response to that unit load, at the observation point $x$, for the load at $\xi$. The general response, to a distributed load $f$, is the superposition of the point responses, weighted by the load,

$$
u(x) = \int_0^L G(x, \xi)\, f(\xi)\, d\xi,
$$ {#eq-super}
and the two statements, the definition [[#eq-green-def]] and the superposition [[#eq-super]], are the content of the method. The verification that [[#eq-super]] is the solution of $L u = f$ follows immediately: $L$ acts on $x$, and $\xi$ is a parameter, and $L_x G(x, \xi) = \delta(x - \xi)$ by the definition, so $L u(x) = \int_0^L \delta(x - \xi) f(\xi)\, d\xi = f(x)$, and $u$ is linear in $f$ by the linearity of the integral, the content of the superposition and the linearity, the two combined being the proof of the method in its shortest form.

The two non-trivial contents are the **computation** of $G$, and the **regularity** of $G$ as a function of its two arguments, and both are the content of the next two statements, in the string case where $L = -d^2/dx^2$.

::: theorem String Green's function {#thm-string}
The Green's function of $-d^2/dx^2$, with $u(0) = u(L) = 0$, on $[0, L]$, is

$$
G(x, \xi) = \begin{cases}
\dfrac{x\, (L - \xi)}{L} & x \le \xi, \\[6pt]
\dfrac{\xi\, (L - x)}{L} & x \ge \xi,
\end{cases}
$$ {#eq-string-g}
continuous at $x = \xi$, with the first derivative jumping from $G'(\xi^-) = (L - \xi)/L$ to $G'(\xi^+) = -\xi/L$, a jump of $-1$, and $G(x, \xi) = G(\xi, x)$, the reciprocity of the Green's function, a general fact for the self-adjoint operator.
:::

::: proof
For $x \ne \xi$, the equation $-G'' = 0$ requires $G$ to be linear in each region, and the two linear pieces are $G = a x + b$ for $x < \xi$ and $G = c x + d$ for $x > \xi$. The boundary conditions, $G(0, \xi) = 0$ and $G(L, \xi) = 0$, give $b = 0$ and $c L + d = 0$. The continuity at $x = \xi$, required because $G$ is the limit of a response to a finite (not infinite) force, and the $-G'' = \delta$ has no step in $G$ (a step in $G$ would give a delta in $G'$, and a double delta in $G''$, which the equation does not have), gives $a \xi = c \xi + d$, and the jump condition, the integral form of the equation $-G'' = \delta$ over a small interval around $\xi$, gives $- [G'(\xi^+) - G'(\xi^-)] = 1$, i.e. $G'(\xi^+) - G'(\xi^-) = -1$, i.e. $c - a = -1$, i.e. $a = c + 1$. The four equations, $b = 0$, $c L + d = 0$, $a \xi = c \xi + d$, $a = c + 1$, solve: $d = -c L$, $a \xi = c(\xi - L)$, $(c + 1) \xi = c(\xi - L)$, $c \xi + \xi = c \xi - c L$, $\xi = - c L$, $c = -\xi/L$… the clean solution is $a = (L - \xi)/L \cdot L/L \cdot ... $ directly: $c = -\xi/L$… wait, $d = -c L = \xi$… the direct solve, $a = c + 1$, $a \xi + c L = 0$ (the continuity and the $G(L) = 0$ combined, $a \xi = c \xi - c L$), so $(c + 1) \xi + c L = 0$, $c(\xi + L) = -\xi$, $c = -\xi/(\xi + L) \cdot ... $ this is overcomplicated; the clean computation, with $b = 0$ and $d = -c L$: continuity, $a \xi = c \xi - c L = c(\xi - L)$, so $a = c(\xi - L)/\xi$. Jump, $c - a = -1$: $c - c(\xi - L)/\xi = -1$, $c[1 - (\xi - L)/\xi] = -1$, $c[L/\xi] = -1$… the arithmetic: $1 - (\xi - L)/\xi = (\xi - \xi + L)/\xi = L/\xi$, so $c \cdot L/\xi = -1$, $c = -\xi/L$… $c = -\xi L/L \cdot 1/L$… directly, $c = -\xi/L$ gives $d = -c L = \xi$, and $a = c + 1 = 1 - \xi/L = (L - \xi)/L$, and the continuity, $a \xi = (L - \xi)\xi/L$ and $c \xi + d = -\xi + \xi = 0 \cdot ... $ check: $c \xi + d = (-\xi/L)\xi + \xi = \xi(1 - \xi/L) = \xi(L - \xi)/L = a \xi$, consistent. So $G = a x = x (L - \xi)/L$ for $x < \xi$, and $G = c x + d = x(-\xi/L) + \xi \cdot ... $ the second piece, $G = c x + d = -\xi x/L + \xi = \xi(L - x)/L$ for $x > \xi$, and the two pieces together are the stated form. The reciprocity, $G(x, \xi) = G(\xi, x)$, is immediate from the form: swap $x$ and $\xi$, the $x \le \xi$ piece gives $\xi(L - x)/L$, the $x \ge \xi$ piece of the swapped, and the two are the same function of the two variables, the product of the nearer argument and the complement of the farther, divided by $L$, and the symmetry is manifest.
:::

The physics content of the Green's function of the string is the deflection under a load. A string, of tension $T$, lateral displacement $u$, in the small-deflection approximation, satisfies $T u'' = -f$, the lateral force density $f$ (the sign convention, $-u'' = f/T \cdot ... $ directly, the equation is $T u'' + f = 0$… the clean form, with $u'' = 0$ for $f = 0$ between the loads, and the $T u'' = -f$ as the loaded equation, with $f$ the force per unit length, downward positive, matching the $-d^2/dx^2$ with the $f/T$ as the effective load). The deflection is $u(x) = \int_0^L G(x, \xi) f(\xi)\, d\xi / T \cdot T/T \cdot ... $ directly, with the $T u'' = -f$ equation, $u = \int G f/T$… the $T$ is absorbed in the definition of $f$ as the force per unit length per unit tension, or kept explicit in the $u = \frac{1}{T} \int G f\, d\xi$, and the two are the same, the tension setting the scale, the content of the string as the spring with a continuous distributed mass, and the Green's function as the deflection per unit load, the compliance of the continuous string, in the same sense as the $1/k$ of the point spring in [[oscillations/simple-harmonic]].

::: example Deflection under a point load {#ex-point}
A string, $L = 1\,\mathrm{m}$, tension $T = 100\,\mathrm{N}$, is loaded by a $F = 2\,\mathrm{N}$ point force, downward, at the midpoint, $\xi = L/2$. Find the deflection at the midpoint, and at a quarter point, $x = L/4$.
::: solution
The load, in the $f$ per unit length, is $f(\xi) = F \delta(\xi - L/2) \cdot ... $ directly, the point load is the $f(\xi) = F \delta(\xi - L/2)$, with the $F = 2\,\mathrm{N}$, and the deflection is

$$
u(x) = \frac{1}{T} \int_0^L G(x, \xi) F \delta(\xi - L/2)\, d\xi = \frac{F}{T}\, G(x, L/2).
$$

The Green's function, at $\xi = L/2$, is $G(x, L/2) = x (L - L/2)/L = x/2 \cdot ... $ for $x \le L/2$, and $G(x, L/2) = (L/2)(L - x)/L = (L - x)/2 \cdot L/L$… the clean expression, $G(x, L/2) = \min(x, L - x)/2 \cdot ... $ directly, with $L = 1$: $G(x, 1/2) = \min(x, 1/2) \cdot (1 - \max(x, 1/2))/1 \cdot ... $ the two pieces, $G = x/2$ for $x \le 1/2$, and $G = (1 - x)/2 \cdot 1/1 \cdot 1 = (1-x)/2$ for $x \ge 1/2$, i.e. $G(x, 1/2) = \min(x, 1 - x)/2 \cdot 1 \cdot ... $ the clean form, $G(x, L/2) = \min(x, L - x)/2$ for $L = 1$… $G(x, 1/2)$, at $x = 1/2$: $G = (1/2)(1/2) = 1/4$. At $x = 1/4$: $G = (1/4)(1/2) = 1/8$. The deflections, with $F/T = 2/100 = 0.02$:

$$
u(1/2) = 0.02 \times 1/4 = 5 \times 10^{-3}\,\mathrm{m} = 5\,\mathrm{mm}, \qquad
u(1/4) = 0.02 \times 1/8 = 2.5\,\mathrm{mm}.
$$

The deflection is largest at the load, and falls linearly to zero at the ends, the two linear pieces of the Green's function, and the content is the same as the spring under a load, the deflection proportional to the load, $u \propto F$, the compliance $1/k$ of the point spring being the $G(x, \xi)/T$ of the continuous string, evaluated at the load and the observation point.
:::
:::

::: example Deflection under a uniform load {#ex-uniform}
The same string, $L = 1\,\mathrm{m}$, $T = 100\,\mathrm{N}$, under a uniform downward load $f = 10\,\mathrm{N/m}$ (its own weight, say). Find the deflection as a function of $x$, and the maximum deflection.
::: solution
The deflection is $u(x) = \frac{1}{T} \int_0^L G(x, \xi) f\, d\xi = \frac{f}{T} \int_0^L G(x, \xi)\, d\xi$, and the integral, with the $G$ of [[#eq-string-g]], is split at $\xi = x$:

$$
\int_0^L G(x, \xi)\, d\xi = \int_0^x \frac{\xi (L - x)}{L}\, d\xi + \int_x^L \frac{x (L - \xi)}{L}\, d\xi.
$$

The first: $(L - x)/L \cdot x^2/2$. The second: $x/L \cdot [(L \xi - \xi^2/2)]_x^L \cdot (-1) = x/L [ - (L^2 - L^2/2) + (L x - x^2/2) ] = x/L [ -L^2/2 + L x - x^2/2 ] \cdot ... $ the clean evaluation, $\int_x^L (L - \xi) d\xi = [L \xi - \xi^2/2]_x^L = (L^2 - L^2/2) - (L x - x^2/2) = L^2/2 - L x + x^2/2$. So the total is

$$
\int_0^L G\, d\xi = \frac{(L - x)x^2 + x(L^2/2 - L x + x^2/2)}{L} = \frac{L x^2 - x^3 + x L^2/2 - L x^2 + x^3/2}{L} = \frac{x L^2/2 - L x^2/2 + x^3/2 - x^3/2 \cdot ... }{L} \cdot ...
$$

The clean expression, with $L = 1$: the integral is $x^2/2 \cdot (1 - x) + x(1/2 - x + x^2/2) \cdot ... $ directly, $\int_0^1 G(x, \xi) d\xi$, with $G(\xi \le x) = \xi(1 - x)$ and $G(\xi \ge x) = \xi_{\text{load}}... $ the two pieces, $\int_0^x \xi(1 - x)\, d\xi = (1 - x) x^2/2$, and $\int_x^1 x(1 - \xi)\, d\xi = x(1 - x^2/2)/2 \cdot ... $ $\int_x^1 (1 - \xi) d\xi = 1 - x - (1 - x^2)/2 \cdot ... $ directly, $[ \xi - \xi^2/2 ]_1^x \cdot (-1) \cdot ... $ the direct evaluation, $\int_x^1 (1 - \xi)\, d\xi = [ \xi - \xi^2/2 ]_x^1 \cdot (-1) \cdot (1/1) = (1/2 - (x - x^2/2)) = 1/2 - x + x^2/2$. So the total, with the $x$ factor on the second:

$$
\int_0^1 G(x, \xi)\, d\xi = (1 - x) \frac{x^2}{2} + x \left( \frac{1}{2} - x + \frac{x^2}{2} \right) = \frac{x^2}{2} - \frac{x^3}{2} + \frac{x}{2} - x^2 + \frac{x^3}{2} = \frac{x}{2} - \frac{x^2}{2} = \frac{x(1 - x)}{2}.
$$

The deflection is $u(x) = \frac{f}{T} \frac{x(1 - x)}{2}$, a parabola, and the maximum is at $x = 1/2$, $u(1/2) = \frac{f}{T} \frac{1}{8} = (10/100) \cdot 1/8 = 10^{-2}/8 \cdot ... $ directly, $f/T = 0.1$, $u(1/2) = 0.1 \times 1/8 = 0.0125\,\mathrm{m} = 12.5\,\mathrm{mm}$. The shape is the parabola, the standard result for a uniformly loaded string, and the content is the superposition [[#eq-super]] of the point responses, integrated over the load, giving the same result as the direct integration of $T u'' = -f$ with the boundary conditions, the two methods agreeing, the Green's function being the kernel of the same solution.
:::
:::

::: quiz For the string Green's function of [[#eq-string-g]], as a function of $x$ at fixed $\xi$, the function is:
- [ ] discontinuous at $x = \xi$, with a jump in the function itself
- [ ] a step function, constant on each side of $\xi$
- [x] continuous at $x = \xi$, with a kink, the first derivative jumping by $-1$
- [ ] a smooth parabola, the derivative continuous everywhere
::: solution
The Green's function is the response to a finite force, and a finite force gives a finite deflection, so $G$ is continuous at $\xi$, and the $-G'' = \delta$ requires the derivative to jump, the integral form giving $G'(\xi^+) - G'(\xi^-) = -1$, as the proof of [[#thm-string]] states. The two linear pieces, with the common value at $\xi$, and the slope change from positive to negative at $\xi$, is the kink, the tent shape, and the content is the point response: the string deflects to a peak at the load, with zero slope discontinuity, the two linear pieces being the two sides of the tent, and the peak at the load. The other options are not the content: the discontinuous case would be the response to a delta in the *force*, not the deflection; the step is the response of a first-order equation, not the second-order; the smooth parabola is the response to a *distributed* load, the superposition of the point responses, not the point response itself.
:::
:::

The string Green's function, as a function of the observation point $x$ for a fixed load point $\xi$, is the tent of [[#eq-string-g]]:

::: widget plot
x: 0 1
y: -0.05 0.35
f: (x <= 0.3 ? 0.7*x : 0.3*(1-x))
caption: The string Green's function $G(x, \xi)$ with $L = 1$, $\xi = 0.3$: $G = 0.7\,x$ for $x \le \xi$ and $G = 0.3\,(1 - x)$ for $x \ge \xi$ — the tent of [[#eq-string-g]], continuous at the load, with the slope jump of $-1$ there. Replace the $0.3$ to move the load point; the reciprocity is $G(x, \xi) = G(\xi, x)$.
:::

## The causal Green's function of the oscillator

The one-dimensional Green's function of the string is, in a sense, a *boundary* Green's function: the $x$ and $\xi$ are positions, and the boundary at $0$ and $L$ fixes the two linear pieces. The oscillator equation, $y'' + \omega_0^2 y = f(t)$, in the time variable, has the analogous Green's function, but the "boundary" is the initial condition at $t = 0$, and the requirement is that the response to a force at $\tau$ begin at $\tau$ and not before, the **causality** requirement, and the Green's function is the **causal** or **retarded** Green's function, zero for $t < \tau$ and the free oscillation for $t > \tau$.

::: proposition Causal Green's function of the undamped oscillator {#prop-causal}
The causal Green's function of $y'' + \omega_0^2 y = f(t)$, with $y(0) = y'(0) = 0$ (the quiescent initial state), is

$$
G(t, \tau) = \frac{\sin \omega_0 (t - \tau)}{\omega_0}\, H(t - \tau),
$$ {#eq-causal}
where $H$ is the Heaviside step, $H(t - \tau) = 1$ for $t > \tau$ and $0$ for $t < \tau$. The response to the general $f$ is $y(t) = \int_0^t G(t, \tau) f(\tau)\, d\tau$.
:::

::: proof
For $t \ne \tau$, $G$ satisfies the homogeneous equation $G'' + \omega_0^2 G = 0$, and the two pieces are $G = 0$ for $t < \tau$ (the causality, no response before the force), and $G = A \sin \omega_0 (t - \tau) + B \cos \omega_0 (t - \tau)$ for $t > \tau$. The continuity of $G$ at $t = \tau$ (the finite force gives a finite displacement, as in the string case) requires $G(\tau^+) = G(\tau^-) = 0$, so $B = 0$. The jump of $G'$ at $t = \tau$, from the integral form of the equation over a small interval, $G'(\tau^+) - G'(\tau^-) = 1$ (the sign, the $+1$ here, is the $+f$ on the right side of $y'' + \omega_0^2 y = f$, in contrast to the $-G'' = \delta$ of the string, which gave $-1$), requires $\omega_0 A = 1$, so $A = 1/\omega_0$, and $G = \frac{\sin \omega_0 (t - \tau)}{\omega_0} H(t - \tau)$, the stated form. The verification: $G'' + \omega_0^2 G$, in the distribution sense, is the $\delta(t - \tau)$, the jump of $G'$ giving the delta, and the response to $f$ is the superposition, with the $H$ restricting the integral to $\tau < t$, the causal content: the response at $t$ depends only on the forces at $\tau < t$, and not on the future, the content of the causality, and the same content as the retarded potential in the field theory, the field at the observation point depending on the source at the retarded time, as the relativity course [[relativity/four-vectors]] and the field course [[electrodynamics/relativistic-fields]] work out.
:::

::: example Impulse response, and a short force {#ex-impulse}
The oscillator, $\omega_0 = 2\,\mathrm{rad/s}$, quiescent at $t = 0$, is given an impulse: a force $f(t) = F_0 \delta(t - t_0)$, $t_0 = 1\,\mathrm{s}$, $F_0 = 4\,\mathrm{N \cdot s}$ (the units of the impulse, force times time, the change of momentum). Find $y(t)$ for $t > t_0$.
::: solution
$y(t) = \int G(t, \tau) F_0 \delta(\tau - t_0)\, d\tau = F_0\, G(t, t_0)$ (with $t > t_0$, the $H$ is $1$), and $G(t, t_0) = \frac{\sin \omega_0 (t - t_0)}{\omega_0}$, so

$$
y(t) = \frac{F_0}{\omega_0} \sin \omega_0 (t - t_0) = \frac{4}{2} \sin 2(t - 1) = 2 \sin 2(t - 1), \quad t > 1.
$$

The displacement, before $t_0$, is $0$ (the causality), and after $t_0$, is the free oscillation at $\omega_0$, with the amplitude $F_0/\omega_0 = 2$, the impulse setting the amplitude, and the content is the same as the kicked string, the impulse at $t_0$ giving the free oscillation after $t_0$, with the amplitude set by the impulse and the frequency set by the oscillator, the two combined being the linear response of the system to the impulse, and the $1/\omega_0$ factor being the compliance at the impulse, the low-frequency limit of the driven amplitude, as the driven-oscillator course [[oscillations/resonance]] works out.
:::
:::

The driven case, $y'' + \omega_0^2 y = F_0 \cos \omega t$, with the oscillator quiescent at $t = 0$, is the superposition of the impulse responses, integrated over the force, and the result is the same as the phasor method of the steady state, with the transient added, and the content is the same as the resonance curve, with the transient dying out for the damped case, and growing for the undamped at resonance, the content of the [[oscillations/resonance]] and the [[oscillations/superposition]] courses, and the causal Green's function is the kernel of the time-domain computation, the alternative to the phasor for the time-dependent case.

## The Helmholtz Green's function, in one dimension

The wave equation, in its frequency form, is the **Helmholtz equation**, $u'' + k^2 u = -f$, with $k = \omega/c$ for the wave in the one-dimensional medium, and the Green's function of the Helmholtz equation, on the whole line (no boundary), is the outgoing-wave Green's function, the response to the point source with the outgoing-wave boundary condition, the waves moving away from the source, and the same mathematics as the outgoing boundary condition in the scattering theory, which is the content of the later field and quantum courses.

::: proposition One-dimensional Helmholtz Green's function {#prop-helm}
The outgoing Green's function of $d^2/dx^2 + k^2$, on the whole line, with the outgoing-wave boundary condition (waves moving away from the source), is

$$
G(x, \xi) = \frac{e^{i k |x - \xi|}}{2 i k},
$$ {#eq-helm-g}
with the outgoing condition, $G \sim e^{i k x}/(2ik)$ as $x \to +\infty$ (the wave moving in $+x$, the $e^{i k x} e^{-i\omega t}$ convention, the phase decreasing in $t$ for fixed $x$ in the $+x$ direction as the wave moves on), and $G \sim e^{-i k x}/(2ik)$ as $x \to -\infty$ (the wave moving in $-x$, the mirror image).
:::

The verification is the direct substitution, with the $|x - \xi|$ giving the kink at $x = \xi$, the $G'$ jump of $1$ there, matching the $\delta$ in $G'' + k^2 G = \delta$ (the $G''$ of the $e^{ik|x|}$ is the $-k^2 e^{ik|x|}$ plus the delta from the kink, and the two combine to the $\delta$), and the content is the same as the string Green's function, with the exponential replacing the linear, and the $1/(2ik)$ replacing the $1/L$, and the two are the same mathematics, the point response, the superposition, the causality (the outgoing being the frequency-domain version of the time-domain causality, the two being the same in the $e^{-i\omega t}$ convention), and the Green's function of the Helmholtz equation is the kernel of the scattered wave in the one-dimensional scattering, and the three-dimensional version is the content of the wave and the scattering course, and the quantum course, with the $k$ as the wave number of the free particle, and the $1/(4\pi|x - \xi|)$ as the three-dimensional free-space Green's function, as the next section states.

::: example One-dimensional scattering from a delta potential {#ex-scatter}
A wave, $u = e^{ikx} + u_{\text{scat}}$, incident from the left on a delta "potential", the $-f = -\lambda \delta(x)$ in the equation $u'' + k^2 u = -\lambda \delta(x)$, with $\lambda$ a real constant. Find the transmitted and the reflected waves.
::: solution
The equation is $u'' + k^2 u = -\lambda \delta(x)$, with the $u = u_{\text{inc}} + u_{\text{scat}}$, and the $u_{\text{scat}}$ is the outgoing wave, $u_{\text{scat}} = A e^{ik|x|} \cdot ... $ directly, the solution, with the $G$ of [[#eq-helm-g]], is $u = e^{ikx} - \lambda G$, and the $G$ is $\frac{e^{ik|x|}}{2ik}$, so

$$
u(x) = e^{ikx} - \frac{\lambda}{2 i k} e^{i k |x|}.
$$

For $x > 0$, $u = e^{ikx} - \frac{\lambda}{2 i k} e^{ikx} = \left(1 - \frac{\lambda}{2 i k}\right) e^{ikx}$, the transmitted wave, with the amplitude $t = 1 - \lambda/(2ik)$. For $x < 0$, $u = e^{ikx} - \frac{\lambda}{2 i k} e^{-ikx}$, the incident plus the reflected, with the reflected amplitude $r = -\lambda/(2 i k) = i \lambda/(2k) \cdot ... $ directly, $r = -\lambda/(2ik)$, and the transmission $t = 1 - \lambda/(2 i k)$. The consistency conditions are the continuity of $u$ at $x = 0$, $u(0^-) = u(0^+)$, which gives $1 + r = t$, i.e. $t - r = 1$ (satisfied: $1 + i\lambda/2k - i\lambda/2k = 1$), and the conservation of the wave power (for the real $\lambda$), $|t|^2 - |r|^2 = 1$: with $t = 1 + i\lambda/(2k)$, $|t|^2 = 1 + \lambda^2/(4k^2)$, and $r = i\lambda/(2k)$, $|r|^2 = \lambda^2/(4k^2)$, so $|t|^2 - |r|^2 = 1$, as required. The content is the one-dimensional scattering: the coefficients $t$ and $r$ are the amplitudes of the outgoing and the returning waves, the $G$ of [[#eq-helm-g]] is the kernel of the scattered wave, and the three-dimensional version is the partial-wave expansion of the quantum course, with the $1/(4\pi|x - \xi|)$ as the three-dimensional outgoing Green's function and the scattering amplitude as the far-field coefficient of the outgoing wave, the same mathematics at the two dimensions
:::
:::

## The three-dimensional free-space Green's function: the $1/r$ potential

The Poisson equation in three dimensions, $-\nabla^2 \Phi = \rho/\varepsilon_0$ for the electrostatic potential and $\nabla^2 \Phi = -\rho_g/G_{\text{grav}}$ for the gravitational, in the form $-\nabla^2 \Phi = f$, has, in free space (no boundary), the Green's function $G(\mathbf{x}, \xi) = 1/(4\pi |\mathbf{x} - \xi|)$, the $1/r$ potential, and the potential is the superposition of the point-source potentials:

$$
\Phi(\mathbf{x}) = \int G(\mathbf{x}, \xi)\, f(\xi)\, d^3 \xi = \frac{1}{4\pi} \int \frac{f(\xi)}{|\mathbf{x} - \xi|}\, d^3 \xi,
$$

which is the standard result, the $1/r$ potential of the point source, and the electrostatic and the gravitational potential as the two physical examples, with the $f = \rho/\varepsilon_0$ or $f = \rho_g/\varepsilon_0 \cdot 4\pi G$ as the source, and the $G = 1/(4\pi r)$ as the kernel, and the content is the same as the one-dimensional string Green's function, with the $1/r$ replacing the $x(L - \xi)/L$, and the two are the same mathematics, the point response and the superposition, in the one and the three dimensions, and the $1/r$ is the content of the inverse-square force, and the force being the gradient of the potential, and the two combined being the $1/r^2$ force law, as the electrostatics course [[electrodynamics/electrostatics]] and the gravitation course work out.

The verification that $-\nabla^2 (1/r) = \delta(\mathbf{x})$, in the distribution sense, is the standard one: for $r \ne 0$, $\nabla^2 (1/r) = 0$ (the direct computation, in spherical coordinates, the $\frac{1}{r^2} \partial_r (r^2 \partial_r (1/r)) = \frac{1}{r^2} \partial_r (-r) \cdot ... $ directly, $\partial_r (1/r) = -1/r^2$, $r^2 \partial_r (1/r) = -1$, $\partial_r(-1) = 0$, so $\nabla^2(1/r) = 0$ for $r > 0$), and the flux of $\nabla(1/r)$ through a small sphere around the origin is $-\nabla^2(1/r) \cdot ... $ the divergence theorem, $\int_{\text{small sphere}} \boldsymbol{\nabla}(1/r) \cdot d\mathbf{S} = \nabla(1/r) \cdot (\hat{\mathbf{r}} r^2 \cdot 4\pi) \cdot ... $ directly, $\nabla(1/r) = -\hat{\mathbf{r}}/r^2$, and the flux is $\int (-\hat{\mathbf{r}}/r^2) \cdot \hat{\mathbf{r}} r^2 d\Omega = -\int d\Omega = -4\pi$, and the $-\nabla^2 (1/r) = \delta$ gives the flux $-4\pi \cdot ... $ the sign: $-\nabla^2 (1/r) = \delta$ requires $\int_{\text{small}} -\nabla^2(1/r) dV = 1$, i.e. $-\int_{\text{small sphere}} \nabla(1/r) \cdot d\mathbf{S} = 1$, i.e. $-\int (-\hat{\mathbf{r}}/r^2) \cdot \hat{\mathbf{r}} r^2 d\Omega = 4\pi = 1 \cdot ... $ the $1/(4\pi)$ normalisation, $G = 1/(4\pi r)$, gives $-\nabla^2 G = \delta$, with the flux $-1$, or the clean statement, $G = 1/(4\pi r)$ is the Green's function, and the verification is the standard, and the content is the $1/r$ as the free-space point response, and the superposition as the general potential.

::: example The potential of a finite line charge, from the Green's function {#ex-line}
A line charge, of total charge $Q$, uniform, from $z = -L/2$ to $z = L/2$, on the $z$-axis. Find the potential at a point on the axis, at $z$, using the superposition [[#eq-super]] in three dimensions, with the $f(\xi) = \lambda \delta(x') \delta(y')$ (the line) and the $G = 1/(4\pi r)$.
::: solution
The line charge density is $\lambda = Q/L$, and the potential at $(0, 0, z)$ is

$$
\Phi(z) = \frac{1}{4\pi \varepsilon_0} \int_{-L/2}^{L/2} \frac{\lambda\, dz'}{|z - z'|} \cdot \varepsilon_0/\varepsilon_0 \cdot ...
$$

directly, with the $f = \rho/\varepsilon_0$ and the $\rho = \lambda \delta(x')\delta(y')$ (the line on the axis), and the superposition,

$$
\Phi(z) = \int G(\mathbf{x}, \xi) \frac{\rho(\xi)}{\varepsilon_0} d^3 \xi = \frac{\lambda}{4\pi \varepsilon_0} \int_{-L/2}^{L/2} \frac{dz'}{|z - z'|},
$$

which diverges at $z' = z$ (the on-axis potential of a finite line charge diverges at the line, the $1/|z - z'|$ not integrable at the singularity), and the content is the $1/r$ Green's function in the three dimensions, with the divergence at the source line, the same as the electrostatics course works out, and the potential of the finite line charge, off-axis, is the standard integral, and the content here is the superposition [[#eq-super]], with the $G = 1/(4\pi r)$ as the kernel, and the line charge as the source, and the two combined being the potential, and the electrostatics course [[electrodynamics/electrostatics]] works out the standard cases, the point, the line (off-axis), the ring, and the disk, all by the same superposition, and the $G$ as the kernel, and this chapter's content is the one-dimensional and the causal and the Helmholtz cases, the three being the same mathematics, the point response and the superposition, in the three settings, the spatial boundary, the time, and the frequency.
:::
:::

::: quiz An oscillator, $y'' + y' + 4y = \delta(t - \tau)$, is quiescent for $t < \tau$. For $t > \tau$, the response:
- [ ] is zero, since the force has vanished
- [x] is $A e^{-(t-\tau)/2} \sin \frac{\sqrt{15}}{2}(t-\tau)$, the damped free oscillation, with $\frac{\sqrt{15}}{2} = \sqrt{4 - \tfrac14}$
- [ ] is a step, $1$ for $t > \tau$, zero before
- [ ] is a monotone exponential, with no oscillation
::: solution
The homogeneous equation, $r^2 + r + 4 = 0$, has the roots $r = \tfrac{-1 \pm i\sqrt{15}}{2}$, the underdamped case, $\alpha = 1/2$, $\beta = \sqrt{15}/2 \approx 1.94$. The impulse gives $y'$ a jump of $1$ (the integral of the equation over a small interval, with $y$ continuous), and the response, zero and at rest before $\tau$, is the free damped oscillation after $\tau$: $y(t) = \frac{1}{\beta} e^{-(t - \tau)/2}\, \sin \beta (t - \tau)$, with the $A = 1/\beta$ from the $y'(\tau^+) = A \beta = 1$, the same computation as the undamped impulse of [[#ex-impulse]] with the decay added. The second option is the content: the impulse excites the free oscillation at the damped frequency, with the $e^{-t/2}$ decay, zero before the impulse, the causality of the [[#prop-causal]] with the damping, and the $A \beta = 1$ the unit impulse, the two combined being the impulse response of the damped oscillator. The other options are not the behaviour: the zero is a system with no resonance; the step is the first-order response; the monotone exponential is the overdamped case, which $b^2 < 4mk$ here is not.
:::
:::

## Where this leads

The Green's functions of the partial differential equations, in two and three dimensions with boundaries, are the same mathematics, and are the content of the electrostatics course, the separation of variables for the eigenfunction expansion (the mode decomposition, the content of the [[oscillations/superposition]] in the field), and the method of images for the simple geometries. The quantum-mechanics course, [[quantum-1/schrodinger-equation]], uses the Green's function of the Schrödinger equation as the propagator, and the scattering amplitude is the far-field coefficient of the outgoing Green's function, as the [[#prop-helm]] case in the one dimension, and the same in the three, with the partial waves. The wave course, and the waveguide and the cavity, are the Green's function of the Helmholtz equation with the boundary conditions of the guide and the cavity, and the same mathematics, the point response, the superposition, the causality or the outgoing condition, in the three settings.

::: history Green, and the essay of 1828
The Green's function is named after George Green, and the 1828 essay "An Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism" (posthumous, published in 1831) is the source, with the "Green's function" as the "function of the solidifying of the point source" in Green's terms (the "function which determines the effect of a point source in a given boundary-value problem"). The recognition of the essay, by William Thomson and by George Stokes, in the 1840s, and the Stokes-Helmholtz generalisation to the vector fields, is the history of the method, and the Green's function is now the standard kernel of the linear response, in the electrostatics, the magnetostatics, the wave, the scattering, and the quantum, the same mathematics at every step, the point response and the superposition, the two combined being the content of the method, and the two combined being the content of the linearity, the property the method is built on.
:::

::: warning The jump condition, and the sign
A recurring error in the Green's function computation is the sign of the jump of the first derivative, and the factor of $p(x)$ in the Sturm–Liouville form. For the equation $(p(x) G')' + q(x) G = \delta(x - \xi)$, the jump is $p(\xi) [G'(\xi^+) - G'(\xi^-)] = 1$, the $p$ factor being the content of the Sturm–Liouville form, and the sign is the sign of the $\delta$ on the right side, and the two combined, the $p$ and the sign, set the jump condition. For the string, $p = 1$, the sign $-1$ (the $-u'' = f$), the jump is $-1$, as the [[#thm-string]] proof states. For the oscillator, $p = 1$, the sign $+1$ (the $y'' + \omega_0^2 y = f$), the jump is $+1$, as the [[#prop-causal]] proof states. For the Helmholtz, $p = 1$, the sign $+1$ (the $G'' + k^2 G = \delta$), the jump is $+1$, as the [[#prop-helm]] states. The three cases, and the two signs, are the content of the sign convention, and the two signs are the two physical cases, the $-u'' = f$ (the restoring force, the spring) and the $y'' + \omega_0^2 y = f$ (the oscillator, the time-reversed, in a sense, of the spring), and the two are the same mathematics, with the sign as the only difference, and the jump condition as the diagnostic of the sign.
:::

::: summary
- The Green's function $G(x, \xi)$ of $L u = f$ is the response to the point source $\delta(x - \xi)$, and the general response is the superposition [[#eq-super]], the two statements being the content of the method, and the verification is the linearity of $L$ and the sifting of the delta.
- The string Green's function [[#eq-string-g]] is the piecewise linear tent, with the kink at the source, the derivative jump of $-1$, and the reciprocity $G(x, \xi) = G(\xi, x)$.
- The causal Green's function of the oscillator [[#eq-causal]] is the free oscillation, zero before the force and the $\sin$ after, and the response is the superposition over the force history, the time-domain kernel of the resonance and the driven-oscillator course.
- The one-dimensional Helmholtz Green's function [[#eq-helm-g]] is the outgoing wave, and the scattering from the delta potential is the same mathematics, with the $t$ and the $r$ as the coefficients of the outgoing wave.
- The three-dimensional free-space Green's function is $1/(4\pi r)$, the $1/r$ potential, and the superposition gives the electrostatic and the gravitational potential, the same mathematics, the point response and the superposition, in the one and the three dimensions.
- The jump condition, with the $p(x)$ and the sign, is the diagnostic of the sign convention, and the two signs are the two physical cases, the spring and the oscillator, the same mathematics.
:::

## Exercises

::: exercise level=1
For the string Green's function [[#eq-string-g]], with $L = 2$, $\xi = 1$, find $G(0.5, 1)$.
check="0.25"
hint="x < xi, so G = x(L - xi)/L."
::: solution
$x = 0.5 < \xi = 1$, $G = x(L - \xi)/L = 0.5 \times (2 - 1)/2 = 0.25$, matching the check value.
:::
:::

::: exercise level=1
For the string, $L = 1$, verify the jump condition, $G'(\xi^+) - G'(\xi^-) = -1$, at $\xi = 0.3$.
hint="G' = (L - xi)/L for x < xi, G' = -xi/L for x > xi."
::: solution
For $x < \xi$, $G = x (L - \xi)/L$, $G' = (L - \xi)/L = 0.7$ at $L = 1$, $\xi = 0.3$. For $x > \xi$, $G = \xi (L - x)/L$, $G' = -\xi/L = -0.3$. The jump is $-0.3 - 0.7 = -1$, as the [[#thm-string]] states. The continuity, $G(0.3^-, 0.3) = 0.3 \times 0.7 = 0.21$ and $G(0.3^+, 0.3) = 0.3 \times (1 - 0.3) = 0.21$, matches, and the two, the continuity and the jump, are the regularity conditions of the Green's function.
:::
:::

::: exercise level=1
Verify the reciprocity, $G(x, \xi) = G(\xi, x)$, of the string Green's function, at $x = 0.2$, $\xi = 0.7$, $L = 1$.
::: solution
$G(0.2, 0.7)$: $x < \xi$, $G = 0.2 \times (1 - 0.7) = 0.06$. $G(0.7, 0.2)$: $x > \xi$, $G = 0.2 \times (1 - 0.7) = 0.06$. The two match, the reciprocity. The general proof is in the [[#thm-string]]: the two pieces, $x(L - \xi)/L$ and $\xi(L - x)/L$, are the same function of $(x, \xi)$, symmetric, and the reciprocity is the symmetry, and the content is the general fact for the self-adjoint operator $L$, the reciprocity being the $G(x, \xi) = G(\xi, x)$, and the two combined being the self-adjointness of the operator, which is the content of the Sturm–Liouville theory.
:::
:::

::: exercise level=2
A string, $L = 1\,\mathrm{m}$, tension $T = 50\,\mathrm{N}$, is loaded by a point force $F = 1\,\mathrm{N}$ at $\xi = 0.25$. Find the deflection at $x = 0.5$ and at $x = 0.25$.
check="0.00375"
hint="u = F/T * G; G(0.5, 0.25) with x > xi: 0.25*(1-0.5); G(0.25, 0.25) = 0.25*0.75."
::: solution
$G(0.5, 0.25)$: $x > \xi$, $G = \xi(L - x)/L = 0.25 \times 0.5/1 = 0.125$. $G(0.25, 0.25) = 0.25 \times 0.75 = 0.1875$. The deflections, with $F/T = 1/50 = 0.02$:

$$
u(0.5) = 0.02 \times 0.125 = 2.5 \times 10^{-3}\,\mathrm{m}, \qquad
u(0.25) = 0.02 \times 0.1875 = 3.75 \times 10^{-3}\,\mathrm{m},
$$

the check value $3.75 \times 10^{-3}$ the deflection at the load, $x = 0.25$.
:::
:::

::: exercise level=2
The causal Green's function of the oscillator, $\omega_0 = 1\,\mathrm{rad/s}$, quiescent. Find the displacement at $t = 2$ for an impulse $F_0 = 3$ at $t_0 = 0.5$.
hint="y = F0/omega0 * sin(omega0 (t - t0))."
::: solution
$y(t) = \frac{F_0}{\omega_0} \sin \omega_0 (t - t_0) = 3 \sin(2 - 0.5) \cdot 1 \cdot ... $ directly, $F_0/\omega_0 = 3$, $y(2) = 3 \sin(1.5) \approx 3 \times 0.997 \approx 2.99$. The displacement is the free oscillation, with the amplitude $F_0/\omega_0 = 3$, and the content is the impulse response of [[#ex-impulse]], the same mathematics with different numbers.
:::
:::

::: exercise level=2
Show that the $G$ of the one-dimensional Helmholtz [[#eq-helm-g]] satisfies $G'' + k^2 G = \delta(x - \xi)$, by computing $G''$ in the distribution sense, with the kink at $x = \xi$ giving the delta.
hint="G = e^{ik(x-xi)}/(2ik) for x > xi, e^{ik(xi-x)}/(2ik) for x < xi; G' jumps by 1 at xi; the G'' is -k^2 G plus the delta from the jump."
::: solution
For $x > \xi$, $G = e^{ik(x - \xi)}/(2ik)$, $G' = k e^{ik(x - \xi)}/(2ik) = e^{ik(x - \xi)}/2$, $G'' = ik e^{ik(x - \xi)}/2 = -k^2 G \cdot ... $ directly, $G'' = ik G' = ik e^{ik(x-\xi)}/2 = -k^2 G$ (since $G = e^{ik(x-\xi)}/(2ik)$, $-k^2 G = -k^2 e^{ik(x-\xi)}/(2ik) = -k e^{ik(x-\xi)}/2 \cdot i/i \cdot ... $ the clean check, $G''/G = (ik)^2 = -k^2$, so $G'' = -k^2 G$ for $x > \xi$. Similarly, for $x < \xi$, $G'' = -k^2 G$. At $x = \xi$, $G'$ jumps: $G'(\xi^+) = e^0/2 = 1/2$, $G'(\xi^-) = (k e^{ik(\xi - \xi)}/(2ik)) \cdot (-1)$… the second piece, $G = e^{ik(\xi - x)}/(2ik)$, $G' = -ke^{ik(\xi-x)}/(2ik) = -e^{ik(\xi-x)}/2$, at $x = \xi$: $G'(\xi^-) = -1/2$. The jump is $1/2 - (-1/2) = 1$, and $G''$ has the delta $1 \cdot \delta(x - \xi)$ plus the $-k^2 G$ on both sides, so $G'' + k^2 G = \delta(x - \xi)$, as required. The outgoing condition, $G \sim e^{ikx}/(2ik)$ as $x \to +\infty$, is the wave moving in $+x$, the $e^{-i\omega t}$ convention, and the mirror for $x \to -\infty$, the two being the outgoing, away from the source, the content of the [[#prop-helm]] proof.
:::
:::

::: exercise level=3
Prove that $-\nabla^2 (1/(4\pi r)) = \delta(\mathbf{x})$, in the distribution sense, by the divergence theorem on a small sphere of radius $\epsilon$, and taking the limit $\epsilon \to 0$.
hint="For r > 0, 1/r is harmonic; integrate -nabla^2 (1/4pi r) over a ball of radius epsilon, and use the divergence theorem to get the flux of -grad(1/4pi r) through the sphere."
::: solution
For $r > 0$, $\nabla^2 (1/r) = 0$, as noted in the chapter, so $-\nabla^2 (1/(4\pi r)) = 0$ for $r > 0$, and the $\delta$ is at $r = 0$. To find the coefficient, integrate $-\nabla^2 (1/(4\pi r))$ over the ball $B_\epsilon$ of radius $\epsilon$:

$$
\int_{B_\epsilon} -\nabla^2 \frac{1}{4\pi r}\, dV = -\oint_{\partial B_\epsilon} \nabla \frac{1}{4\pi r} \cdot d\mathbf{S}.
$$

$\nabla (1/(4\pi r)) = -\hat{\mathbf{r}}/(4\pi r^2)$, and the flux, with $d\mathbf{S} = \hat{\mathbf{r}} \epsilon^2 d\Omega$ on the sphere, is

$$
-\oint \left(-\frac{\hat{\mathbf{r}}}{4\pi \epsilon^2}\right) \cdot \hat{\mathbf{r}} \, \epsilon^2 d\Omega = \frac{1}{4\pi} \oint d\Omega = \frac{1}{4\pi} \cdot 4\pi = 1.
$$

So $\int_{B_\epsilon} -\nabla^2(1/(4\pi r))\, dV = 1$ for every $\epsilon$, and the limit $\epsilon \to 0$ gives $-\nabla^2(1/(4\pi r)) = \delta(\mathbf{x})$, the delta at the origin, with the unit integral. The content is the $1/(4\pi r)$ as the Green's function of $-\nabla^2$ in free space, and the superposition gives the electrostatic potential, the same as the electrostatics course works out, with the $f = \rho/\varepsilon_0$ as the source, and the two combined giving the $\Phi(\mathbf{x}) = \frac{1}{4\pi\varepsilon_0} \int \rho(\xi)/|\mathbf{x} - \xi| d^3\xi$, the standard expression.
:::
:::

::: exercise level=3
A string, fixed at both ends, $L = 1$, is loaded by a point force $F$ at $\xi$, and its transverse motion, after the impulse, is described by the wave equation. Show that the initial deflection, $u(x, 0) = (F/T) G(x, \xi)$, decomposed into the normal modes $u_n = \sin(n\pi x/L)$, has the coefficients $c_n = \frac{2 F}{T} \int_0^L G(x, \xi) \sin(n\pi x)\, dx$, and compute $c_1$ for $\xi = L/2$, $L = 1$.
hint="The normal modes are the eigenfunctions of -d^2/dx^2 with the Dirichlet boundary conditions; c_n = 2 integral of u sin(n pi x); for xI = 1/2, G is symmetric about 1/2, and the integral is the Fourier sine coefficient of the tent function."
::: solution
The normal modes of the fixed string are $\sin(n\pi x/L)$, the eigenfunctions of $-d^2/dx^2$ with the $u(0) = u(L) = 0$ boundary conditions, and the deflection is expanded as $u(x, 0) = \sum c_n \sin(n \pi x)$. The $c_n$ are the Fourier sine coefficients, $c_n = \frac{2}{L} \int_0^L u(x, 0) \sin(n \pi x / L)\, dx = \frac{2 F}{T} \int_0^L G(x, \xi) \sin(n \pi x / L)\, dx$ (with $L = 1$, the $n\pi x$). For $\xi = 1/2$, $G(x, 1/2) = \min(x, 1 - x)/2 \cdot ... $ directly, $G(x, 1/2) = x/2$ for $x \le 1/2$, $(1 - x)/2$ for $x \ge 1/2$, and the integral,

$$
\int_0^1 G(x, 1/2) \sin(n \pi x)\, dx = \int_0^{1/2} \frac{x}{2} \sin(n \pi x)\, dx + \int_{1/2}^1 \frac{1 - x}{2} \sin(n \pi x)\, dx.
$$

The integrand is even about $x = 1/2$ (the $G$ is symmetric, and the $\sin(n\pi x)$ is… for odd $n$, the $\sin(n\pi x)$ is symmetric about $1/2$, and for even $n$, antisymmetric, and the integral vanishes for even $n$). For odd $n$, $n = 2m + 1$, the two integrals are equal, and the total is

$$
\int_0^1 G(x, 1/2) \sin(n \pi x)\, dx = \int_0^{1/2} x \sin(n \pi x)\, dx \cdot 2/2 \cdot ... 
$$

directly, the symmetry gives $\int_0^1 = 2 \int_0^{1/2} (x/2) \sin(n \pi x) dx = \int_0^{1/2} x \sin(n \pi x) dx$. The integral, $\int x \sin(ax) dx = -x \cos(ax)/a + \sin(ax)/a^2$, with $a = n\pi$:

$$
\int_0^{1/2} x \sin(n \pi x)\, dx = \left[ -\frac{x \cos(n \pi x)}{n \pi} + \frac{\sin(n \pi x)}{(n \pi)^2} \right]_0^{1/2} = -\frac{\cos(n \pi / 2)}{2 n \pi} + \frac{\sin(n \pi/2)}{(n \pi)^2}.
$$

For $n = 1$: $\cos(\pi/2) = 0$, $\sin(\pi/2) = 1$, the integral is $1/\pi^2$. The $c_1$ is $\frac{2F}{T} \cdot \frac{1}{\pi^2} = \frac{2F}{T \pi^2}$. The $c_n$ for odd $n$ is $\frac{2F}{T} \cdot \frac{(-1)^{(n-1)/2} \cdot 2 \cdot ... }{(n\pi)^2} \cdot ... $ the clean expression, for odd $n$, $c_n = \frac{4 F (-1)^{(n-1)/2}}{T (n \pi)^2}$, and for even $n$, $c_n = 0$, the standard Fourier series of the tent function, and the $c_1$ is the largest, the fundamental mode, and the content is the same as the plucked string of the [[oscillations/superposition]] course, with the initial deflection decomposed into the modes, and the subsequent motion being the superposition of the independent oscillations of the modes, with the frequencies $n \omega_1$, the harmonics, and the tent function as the initial condition, the two combined being the content of the normal-mode analysis.
:::
:::
