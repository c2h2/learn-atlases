In classical mechanics the state of a particle moving on a line is a pair of numbers, its position $x(t)$ and its momentum $p(t)$, and Newton's second law tells you how they change. The evidence of [[quantum-1/origins]] says that this picture fails for electrons: an electron sent through a crystal diffracts like a wave, yet each electron arrives at the detector as a single dot. Quantum mechanics keeps both halves of that observation. The state of the particle is a complex-valued **wavefunction** $\Psi(x,t)$ that spreads, interferes and diffracts like a wave; and the wavefunction tells you the *probability* of finding the particle at each place, not where it is.

This chapter sets up the theory in one dimension. We state the Schrödinger equation, which plays the role of Newton's second law, and the Born rule, which says how to read $\Psi$. We then show that probability is conserved and flows with a definite current, introduce operators and expectation values, and prove Ehrenfest's theorem, which is how Newton's laws re-emerge on average. The most useful single idea of the chapter is the stationary state: separating variables turns the time-dependent equation into an eigenvalue problem, the time-independent Schrödinger equation, which the next three chapters solve for one potential after another. We finish with the free particle and the spreading of a wave packet.

The mathematics needed is partial differentiation, complex numbers and the method of separation of variables, all in [[math-methods/odes]]. The wave equation of [[oscillations/travelling-waves]] is a useful comparison: it is second order in time, and the Schrödinger equation is not.

## The wavefunction and the Born rule {#born}

::: definition Wavefunction and Born rule {#def-wavefunction}
The state of a particle moving on the $x$-axis at time $t$ is described by a complex function $\Psi(x,t)$, the **wavefunction**. The **Born rule** says that

$$
\Prob\bigl(a \le x \le b \text{ at time } t\bigr) = \int_a^b \abs{\Psi(x,t)}^2\,\dd x,
$$ {#eq-born}

so $\rho(x,t) = \abs{\Psi(x,t)}^2 = \Psi^*\Psi$ is a **probability density**. For this to make sense $\Psi$ must be **normalised**:

$$
\int_{-\infty}^{\infty} \abs{\Psi(x,t)}^2\,\dd x = 1.
$$ {#eq-norm}
:::

The units of $\Psi$ are $\mathrm{m^{-1/2}}$ in one dimension, so that $\abs{\Psi}^2\,\dd x$ is dimensionless. A wavefunction and the same wavefunction multiplied by a constant phase $e^{i\alpha}$ give the same density and, as we will see, the same predictions for every measurement. A global phase is not physical. A *relative* phase between two parts of a wavefunction is physical, because it changes where the parts interfere constructively.

If you are handed a function $\psi$ whose integral $\int\abs{\psi}^2\,\dd x$ is finite and non-zero, you can always normalise it by dividing by the square root of that integral. Functions for which the integral is finite are called **square-integrable**. A function such as $e^{ikx}$, whose modulus is $1$ everywhere, is not square-integrable, and on its own cannot represent a physical state. We return to this in [[#free]].

What does the probability refer to? Imagine a large number of identically prepared particles, each with wavefunction $\Psi$, and measure the position of each. The fraction found between $a$ and $b$ approaches [[#eq-born]]. A single measurement gives a single definite position. Immediately afterwards a second position measurement gives the same answer again, so the measurement must have changed the wavefunction to one sharply peaked at the result. This **collapse** is part of the measurement postulate, stated generally in [[quantum-1/formalism]]. Between measurements the wavefunction evolves smoothly by the Schrödinger equation.

::: example Normalising a trial wavefunction {#ex-normalise}
At $t = 0$ a particle confined to $0 \le x \le a$ has wavefunction $\psi(x) = A\,x(a - x)$ inside that interval and $\psi = 0$ outside. Find the positive real constant $A$, and the probability of finding the particle in $0 \le x \le a/4$.
::: solution
The normalisation integral is

$$
\int_0^a A^2 x^2(a-x)^2\,\dd x = A^2\int_0^a\bigl(a^2x^2 - 2ax^3 + x^4\bigr)\,\dd x = A^2\left(\frac{a^5}{3} - \frac{a^5}{2} + \frac{a^5}{5}\right) = \frac{A^2a^5}{30}.
$$

Setting this equal to $1$ gives $A = \sqrt{30/a^5}$. The probability in the left quarter is

$$
\frac{30}{a^5}\int_0^{a/4} \bigl(a^2x^2 - 2ax^3 + x^4\bigr)\,\dd x = 30\left(\frac{1}{3\cdot 64} - \frac{2}{4\cdot256} + \frac{1}{5\cdot1024}\right) = 30\cdot\frac{80 - 30 + 3}{15360} = \frac{53}{512}.
$$

So $P = 53/512 = 0.104$. By symmetry the right quarter has the same probability, and the middle half has $1 - 2(53/512) = 0.793$. A uniform density would have given $0.25$ for each quarter; this wavefunction is concentrated near the centre, where $\abs{\psi}^2$ is largest.
:::
:::

## The Schrödinger equation {#tdse}

We cannot derive the Schrödinger equation from classical physics, any more than Newton's second law can be derived from something earlier. We can make it plausible. A free particle of definite momentum $p$ and energy $E$ should, by de Broglie, be a wave with $k = p/\hbar$ and $\omega = E/\hbar$. Take the complex plane wave

$$
\Psi(x,t) = A\,e^{i(kx - \omega t)}.
$$

Differentiating, $-i\hbar\,\partial\Psi/\partial x = \hbar k\Psi = p\Psi$ and $i\hbar\,\partial\Psi/\partial t = \hbar\omega\Psi = E\Psi$. The non-relativistic energy of a free particle is $E = p^2/2m$, so the wave should satisfy

$$
i\hbar\pdv{\Psi}{t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2}.
$$

Here $\partial/\partial t$ plays the part of the energy and $-i\hbar\,\partial/\partial x$ the part of the momentum. In a potential the energy is $p^2/2m + V(x)$, and the natural generalisation adds $V\Psi$ to the right.

::: definition The Schrödinger equation {#def-tdse}
For a particle of mass $m$ in a potential $V(x,t)$, the wavefunction obeys the **time-dependent Schrödinger equation**

$$
i\hbar\pdv{\Psi}{t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + V(x,t)\,\Psi.
$$ {#eq-tdse}

The operator on the right, $\hat H = -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} + V$, is the **Hamiltonian**, and the equation is often written $i\hbar\,\partial_t\Psi = \hat H\Psi$.
:::

Three features distinguish it from the classical wave equation. It is **first order in time**, so the wavefunction at one instant determines it at all later times; you do not also need $\partial_t\Psi$. It contains $i$ explicitly, so its solutions are necessarily complex: a real $\Psi$ at $t = 0$ becomes complex immediately. And it is **linear**: if $\Psi_1$ and $\Psi_2$ are solutions, so is $c_1\Psi_1 + c_2\Psi_2$ for any complex constants. Linearity is the mathematical form of the superposition principle, and interference comes from it.

### Conservation of probability

The Born rule needs $\int\abs{\Psi}^2\,\dd x = 1$ at every time, but the Schrödinger equation determines $\Psi$ at later times by itself. If the normalisation drifted, the theory would be inconsistent. It does not, and the reason is local.

::: theorem Continuity equation {#thm-continuity}
Let $V$ be real. If $\Psi$ satisfies [[#eq-tdse]], then $\rho = \abs{\Psi}^2$ and the **probability current**

$$
j(x,t) = \frac{\hbar}{2mi}\left(\Psi^*\pdv{\Psi}{x} - \Psi\pdv{\Psi^*}{x}\right) = \frac{\hbar}{m}\operatorname{Im}\left(\Psi^*\pdv{\Psi}{x}\right)
$$ {#eq-current}

satisfy

$$
\pdv{\rho}{t} + \pdv{j}{x} = 0.
$$ {#eq-continuity}

Consequently, if $\Psi$ and $\partial\Psi/\partial x$ tend to zero as $\abs{x}\to\infty$, then $\int_{-\infty}^\infty\abs{\Psi}^2\,\dd x$ is independent of time.
:::

::: proof
By the product rule, $\partial_t\rho = \Psi^*\,\partial_t\Psi + \Psi\,\partial_t\Psi^*$. From [[#eq-tdse]] and its complex conjugate (which uses $V^* = V$),

$$
\pdv{\Psi}{t} = \frac{i\hbar}{2m}\frac{\partial^2\Psi}{\partial x^2} - \frac{i}{\hbar}V\Psi, \qquad \pdv{\Psi^*}{t} = -\frac{i\hbar}{2m}\frac{\partial^2\Psi^*}{\partial x^2} + \frac{i}{\hbar}V\Psi^*.
$$

Substituting, the potential terms cancel:

$$
\pdv{\rho}{t} = \frac{i\hbar}{2m}\left(\Psi^*\frac{\partial^2\Psi}{\partial x^2} - \Psi\frac{\partial^2\Psi^*}{\partial x^2}\right) = \frac{i\hbar}{2m}\pdv{}{x}\left(\Psi^*\pdv{\Psi}{x} - \Psi\pdv{\Psi^*}{x}\right),
$$

where the last step holds because differentiating the bracket gives two cross terms $\partial_x\Psi^*\,\partial_x\Psi$ that cancel. Since $i\hbar/2m = -\hbar/2mi$, the right-hand side is $-\partial_x j$, which is [[#eq-continuity]]. Integrating over all $x$,

$$
\deriv{}{t}\int_{-\infty}^\infty\rho\,\dd x = -\bigl[j\bigr]_{-\infty}^{\infty} = 0,
$$

because $j$ vanishes at both ends under the stated decay conditions. The second form of [[#eq-current]] holds because $\Psi\,\partial_x\Psi^*$ is the complex conjugate of $\Psi^*\partial_x\Psi$, and $z - z^* = 2i\operatorname{Im}z$.
:::

The equation has the same form as charge conservation in electromagnetism ([[electrostatics/current]]): the probability in an interval $[a,b]$ changes only by the current flowing through its ends, $\dd P_{ab}/\dd t = j(a,t) - j(b,t)$. Probability cannot vanish in one place and reappear somewhere else without flowing in between. A complex potential would break this; that is used deliberately in nuclear physics to model absorption, but in this course $V$ is real.

::: example Current of a plane wave {#ex-current}
Find the probability current of $\Psi = A e^{i(kx - \omega t)}$, and of the standing wave $\Psi = A\sin(kx)\,e^{-i\omega t}$.
::: solution
For the plane wave, $\partial_x\Psi = ik\Psi$, so $\Psi^*\partial_x\Psi = ik\abs{A}^2$ and

$$
j = \frac{\hbar}{m}\operatorname{Im}\bigl(ik\abs{A}^2\bigr) = \frac{\hbar k}{m}\abs{A}^2 = \frac{p}{m}\,\rho.
$$

This is the density times the classical velocity $p/m$, exactly as for a fluid of density $\rho$ moving at speed $v$. In scattering problems we will use $\abs{A}^2\hbar k/m$ as the "number of particles per second" in a beam.

For the standing wave, $\Psi^*\partial_x\Psi = \abs{A}^2 k\sin(kx)\cos(kx)$ is real, so $j = 0$. More generally, whenever the spatial part of $\Psi$ is real up to an overall phase, the current vanishes: a standing wave is equal parts of right- and left-moving waves, $\sin kx = (e^{ikx} - e^{-ikx})/2i$, and their currents cancel.
:::
:::

## Operators and expectation values {#operators}

A large number of position measurements on identically prepared particles has an average. That average is the **expectation value** $\langle x\rangle = \int x\abs{\Psi}^2\,\dd x$. It is not the most likely value and need not even be a possible value: for a density with two separated humps it may lie between them where the density is zero.

What is the average momentum? The density $\abs{\Psi}^2$ refers to position only. A clean way to find the answer is to ask how $\langle x\rangle$ changes in time. Differentiating under the integral and using the continuity equation,

$$
\deriv{\langle x\rangle}{t} = \int x\,\pdv{\rho}{t}\,\dd x = -\int x\,\pdv{j}{x}\,\dd x = \int j\,\dd x,
$$

integrating by parts with the boundary term vanishing. Substituting [[#eq-current]], integrating the term containing $\Psi\,\partial_x\Psi^*$ by parts once more, and collecting,

$$
m\deriv{\langle x\rangle}{t} = \int \Psi^*\left(-i\hbar\pdv{}{x}\right)\Psi\,\dd x.
$$

Classically, $m\,\dd x/\dd t$ is the momentum. This identifies the expectation value of momentum, and suggests that the momentum is represented by the operator $-i\hbar\,\partial/\partial x$ sandwiched between $\Psi^*$ and $\Psi$, the same operator that the plane-wave argument produced.

::: definition Operators and expectation values {#def-expectation}
Position and momentum are represented by the operators

$$
\hat x = x, \qquad \hat p = -i\hbar\pdv{}{x}.
$$ {#eq-p-op}

A classical quantity $Q(x,p)$ is represented by $\hat Q = Q(\hat x, \hat p)$ (with care over ordering when products of $x$ and $p$ appear). Its **expectation value** in the normalised state $\Psi$ is

$$
\langle Q\rangle = \int_{-\infty}^\infty \Psi^*\,\hat Q\,\Psi\,\dd x,
$$ {#eq-expectation}

and its **uncertainty** is the standard deviation $\Delta Q = \sqrt{\langle Q^2\rangle - \langle Q\rangle^2}$. In particular the kinetic energy is $\hat T = \hat p^2/2m = -(\hbar^2/2m)\,\partial^2/\partial x^2$, and the Hamiltonian is $\hat H = \hat T + V$.
:::

The order inside the integral matters: the operator acts on $\Psi$ first, then the result is multiplied by $\Psi^*$ and integrated. For $\hat x$ this is just $\int x\abs{\Psi}^2\,\dd x$, as it should be.

::: theorem Ehrenfest's theorem {#thm-ehrenfest}
For a particle in a real potential $V(x)$, with $\Psi$ and its derivatives decaying at infinity,

$$
\deriv{\langle x\rangle}{t} = \frac{\langle p\rangle}{m}, \qquad \deriv{\langle p\rangle}{t} = -\left\langle\deriv{V}{x}\right\rangle.
$$ {#eq-ehrenfest}
:::

::: proof
The first equation was derived above. For the second, differentiate $\langle p\rangle = -i\hbar\int\Psi^*\partial_x\Psi\,\dd x$ under the integral sign:

$$
\deriv{\langle p\rangle}{t} = -i\hbar\int\left(\pdv{\Psi^*}{t}\pdv{\Psi}{x} + \Psi^*\pdv{}{x}\pdv{\Psi}{t}\right)\dd x.
$$

Integrate the second term by parts (boundary terms vanish) to get $-\int \partial_x\Psi^*\,\partial_t\Psi\,\dd x$. Now substitute $\partial_t\Psi$ and $\partial_t\Psi^*$ from the proof of [[#thm-continuity]]. The kinetic parts give

$$
-i\hbar\cdot\frac{i\hbar}{2m}\int\left(-\Psi^*_{xx}\Psi_x - \Psi^*_x\Psi_{xx}\right)\dd x = -\frac{\hbar^2}{2m}\int\pdv{}{x}\bigl(\Psi^*_x\Psi_x\bigr)\,\dd x = 0,
$$

where subscripts denote derivatives. The potential parts give

$$
-i\hbar\cdot\frac{i}{\hbar}\int\Bigl(V\Psi^*\Psi_x + \Psi^*_x V\Psi\Bigr)\dd x = \int V\pdv{}{x}\bigl(\Psi^*\Psi\bigr)\,\dd x = -\int \deriv{V}{x}\abs{\Psi}^2\,\dd x,
$$

after one more integration by parts. That is $-\langle \dd V/\dd x\rangle$.
:::

Ehrenfest's theorem looks like Newton's second law, $\dd p/\dd t = -V'(x)$, but on the right stands the average of the force, not the force at the average position. The two agree when $V'$ is linear in $x$ over the region where $\abs{\Psi}^2$ is appreciable, so for a free particle, a uniform field and a harmonic oscillator the centre of a wave packet moves exactly on the classical trajectory. For any potential, a packet narrow compared with the scale on which the force varies moves approximately classically. That is the quantitative content of the correspondence principle.

::: example Expectation values and uncertainties {#ex-uncertainty}
For the normalised state $\psi(x) = \sqrt{30/a^5}\,x(a-x)$ on $0 \le x \le a$ of [[#ex-normalise]], find $\langle x\rangle$, $\Delta x$, $\langle p\rangle$, $\Delta p$ and the product $\Delta x\,\Delta p$.
::: solution
The density is symmetric about $a/2$, so $\langle x\rangle = a/2$. For $\langle x^2\rangle$,

$$
\langle x^2\rangle = \frac{30}{a^5}\int_0^a x^2\cdot x^2(a-x)^2\,\dd x = \frac{30}{a^5}\left(\frac{a^7}{5} - \frac{2a^7}{6} + \frac{a^7}{7}\right) = 30a^2\cdot\frac{1}{105} = \frac{2a^2}{7}.
$$

So $(\Delta x)^2 = \frac{2a^2}{7} - \frac{a^2}{4} = \frac{a^2}{28}$, and $\Delta x = a/\sqrt{28} = 0.189a$.

For momentum, $\psi$ is real, so $\langle p\rangle = -i\hbar\int\psi\psi'\,\dd x = -\frac{i\hbar}{2}\bigl[\psi^2\bigr]_0^a = 0$. A real wavefunction (with vanishing boundary values) always has $\langle p\rangle = 0$; otherwise $\langle p\rangle$ would be imaginary. Next, $\psi'' = -2\sqrt{30/a^5}$, so

$$
\langle p^2\rangle = -\hbar^2\int_0^a\psi\psi''\,\dd x = 2\hbar^2\frac{30}{a^5}\int_0^a x(a-x)\,\dd x = \frac{60\hbar^2}{a^5}\cdot\frac{a^3}{6} = \frac{10\hbar^2}{a^2}.
$$

Hence $\Delta p = \sqrt{10}\,\hbar/a$, and

$$
\Delta x\,\Delta p = \sqrt{\frac{10}{28}}\,\hbar = 0.598\,\hbar.
$$

This exceeds $\hbar/2$, as the uncertainty principle proved in [[quantum-1/formalism]] requires. As a bonus, $\langle H\rangle = \langle p^2\rangle/2m = 5\hbar^2/ma^2$ for a particle in an infinite well of width $a$. The true ground-state energy of that well is $\pi^2\hbar^2/2ma^2 = 4.935\,\hbar^2/ma^2$, just below; no trial state can do better than the ground state, which is the variational principle.
:::
:::

::: quiz
A particle has a real wavefunction $\psi(x)$ at $t = 0$, vanishing at $\pm\infty$. Which statements are true at $t = 0$?
- [x] $\langle p\rangle = 0$.
- [x] The probability current $j$ is zero everywhere.
- [ ] The particle is at rest, so $\langle p^2\rangle = 0$.
- [ ] $\psi$ stays real for all later times.
::: solution
For real $\psi$, $\psi^*\psi' = \psi\psi'$ is real, so $j = (\hbar/m)\operatorname{Im}(\psi\psi') = 0$, and $\langle p\rangle = -i\hbar\int\psi\psi'\,\dd x = -\frac{i\hbar}{2}[\psi^2] = 0$. But $\langle p^2\rangle = \hbar^2\int(\psi')^2\,\dd x > 0$ for any non-constant $\psi$: a localised particle always has a spread of momenta. And the Schrödinger equation contains $i$, so $\Psi$ becomes complex at once; a real initial state only means that the motion starts symmetrically, half "left" and half "right".
:::
:::

## Stationary states {#stationary}

Suppose the potential does not depend on time. Look for solutions of [[#eq-tdse]] of product form $\Psi(x,t) = \psi(x)\,\varphi(t)$. Substituting and dividing by $\psi\varphi$,

$$
i\hbar\,\frac{1}{\varphi}\deriv{\varphi}{t} = \frac{1}{\psi}\left(-\frac{\hbar^2}{2m}\deriv{^2\psi}{x^2} + V\psi\right).
$$

The left depends only on $t$ and the right only on $x$, so both equal the same constant, which we call $E$. The time equation integrates at once to $\varphi(t) = e^{-iEt/\hbar}$, and the space equation is the following eigenvalue problem.

::: definition Time-independent Schrödinger equation {#def-tise}
The **time-independent Schrödinger equation** for a potential $V(x)$ is

$$
-\frac{\hbar^2}{2m}\deriv{^2\psi}{x^2} + V(x)\,\psi = E\,\psi, \qquad\text{i.e.}\qquad \hat H\psi = E\psi.
$$ {#eq-tise}

A normalisable solution $\psi$ is an **energy eigenfunction** with **energy eigenvalue** $E$, and $\Psi(x,t) = \psi(x)\,e^{-iEt/\hbar}$ is a **stationary state**.
:::

The constant $E$ must be real for a normalisable solution: if $E = E_0 - i\Gamma/2$, then $\abs{\Psi}^2 = \abs{\psi}^2e^{-\Gamma t/\hbar}$, which would decay and contradict [[#thm-continuity]]. Also, since [[#eq-tise]] has real coefficients, the real and imaginary parts of any solution are themselves solutions, so energy eigenfunctions can always be chosen real.

::: theorem Properties of stationary states {#thm-stationary}
Let $V$ be independent of time.
1. In a stationary state $\Psi = \psi e^{-iEt/\hbar}$, the probability density and the expectation value of every operator not containing $t$ are independent of time.
2. A stationary state has definite energy: $\langle H\rangle = E$ and $\Delta H = 0$.
3. If $\psi_1, \psi_2, \ldots$ are energy eigenfunctions with energies $E_1, E_2, \ldots$, then
$$
\Psi(x,t) = \sum_n c_n\,\psi_n(x)\,e^{-iE_nt/\hbar}
$$ {#eq-general}
solves [[#eq-tdse]] for any constants $c_n$ (with the sum convergent).
:::

::: proof
(1) $\abs{\Psi}^2 = \abs{\psi}^2\abs{e^{-iEt/\hbar}}^2 = \abs{\psi}^2$, since $E$ is real. In $\langle Q\rangle = \int\Psi^*\hat Q\Psi\,\dd x$ the operator acts on $x$ only, so the phase factors $e^{+iEt/\hbar}$ from $\Psi^*$ and $e^{-iEt/\hbar}$ from $\Psi$ multiply to $1$.

(2) $\hat H\Psi = E\Psi$, so $\langle H\rangle = E\int\abs{\Psi}^2\,\dd x = E$, and $\hat H^2\Psi = \hat H(E\Psi) = E^2\Psi$, so $\langle H^2\rangle = E^2$ and $(\Delta H)^2 = E^2 - E^2 = 0$.

(3) Each term is a solution: $i\hbar\,\partial_t\bigl(\psi_ne^{-iE_nt/\hbar}\bigr) = E_n\psi_ne^{-iE_nt/\hbar} = \hat H\bigl(\psi_ne^{-iE_nt/\hbar}\bigr)$. The equation is linear, so a sum of solutions is a solution.
:::

Part 3 is how time-dependent problems are actually solved. In every case we meet, the energy eigenfunctions form a complete set, so any initial state can be expanded as $\Psi(x,0) = \sum_n c_n\psi_n(x)$. Then [[#eq-general]] is the state at every later time: each component simply rotates in the complex plane at its own angular frequency $E_n/\hbar$. In [[quantum-1/formalism]] we will see that $\abs{c_n}^2$ is the probability that a measurement of energy gives $E_n$.

### What a wavefunction must look like

The time-independent equation is a second-order ODE, so on its own it has solutions for every value of $E$. Quantisation comes from the extra conditions a physically acceptable $\psi$ must satisfy:

- $\psi$ must be normalisable (for a bound state), so it must decay at $\pm\infty$;
- $\psi$ must be continuous everywhere, since a jump would make $\psi'$ contain a delta function and $\hat p^2\psi$ contain its derivative, giving infinite kinetic energy;
- $\psi'$ must be continuous wherever $V$ is finite. Integrate [[#eq-tise]] from $x_0 - \eps$ to $x_0 + \eps$: $\psi'(x_0+\eps) - \psi'(x_0-\eps) = (2m/\hbar^2)\int(V - E)\psi\,\dd x$, which tends to zero when $V$ is bounded near $x_0$, even if $V$ jumps there.

At a point where $V$ is infinite, as at the wall of an infinite well, only the first two survive and $\psi$ must vanish there. These **matching conditions** are what the next chapter applies at every corner of a piecewise potential. For most values of $E$ the solution that decays on the left blows up on the right; only at special energies does one solution decay at both ends, and those are the eigenvalues.

::: example Energy probabilities for a trial state {#ex-expand}
The state $\psi(x) = \sqrt{30/a^5}\,x(a-x)$ of [[#ex-normalise]] is placed in an infinite well of width $a$, whose eigenfunctions are $\psi_n = \sqrt{2/a}\sin(n\pi x/a)$. Find the expansion coefficients $c_n = \int_0^a\psi_n\psi\,\dd x$, the probability that an energy measurement gives the ground-state energy, and check that $\sum\abs{c_n}^2E_n$ equals $\langle H\rangle = 5\hbar^2/ma^2$ from [[#ex-uncertainty]].
::: solution
With $u = \pi x/a$,

$$
c_n = \sqrt{\frac{60}{a^6}}\int_0^a x(a-x)\sin\frac{n\pi x}{a}\,\dd x = \sqrt{60}\,\frac{1}{\pi^3}\int_0^\pi u(\pi - u)\sin(nu)\,\dd u.
$$

Two integrations by parts give $\int_0^\pi u(\pi-u)\sin(nu)\,\dd u = 2\bigl(1 - (-1)^n\bigr)/n^3$, which is $4/n^3$ for odd $n$ and $0$ for even $n$. The even coefficients vanish because $\psi$ is symmetric about the centre and the even-$n$ sines are antisymmetric. Hence

$$
c_n = \frac{8\sqrt{15}}{n^3\pi^3}\ (n \text{ odd}), \qquad c_n = 0\ (n \text{ even}).
$$

The probability of the ground-state energy is $\abs{c_1}^2 = 960/\pi^6 = 0.99856$. The trial parabola is $99.86\%$ ground state, which is why its energy was so close to $E_1$. The next term is $\abs{c_3}^2 = 960/(729\pi^6) = 0.00137$. The probabilities sum to $1$ because $\sum_{n\ \mathrm{odd}}1/n^6 = \pi^6/960$. Finally, with $E_n = n^2\pi^2\hbar^2/2ma^2$,

$$
\sum_n\abs{c_n}^2E_n = \frac{960}{\pi^6}\cdot\frac{\pi^2\hbar^2}{2ma^2}\sum_{n\ \mathrm{odd}}\frac{1}{n^4} = \frac{480\hbar^2}{\pi^4ma^2}\cdot\frac{\pi^4}{96} = \frac{5\hbar^2}{ma^2},
$$

using $\sum_{n\ \mathrm{odd}}1/n^4 = \pi^4/96$. The two ways of computing the mean energy agree, as they must if $\abs{c_n}^2$ are the probabilities of the energies $E_n$.
:::
:::

::: warning Stationary does not mean "a particle at rest"
"Stationary" refers to the probability density, not to the particle: a stationary state can have $\langle p^2\rangle$ large. Conversely, a superposition of two different energies is *not* stationary, even though each part is. Its density contains cross terms $c_1^*c_2\psi_1\psi_2\,e^{-i(E_2-E_1)t/\hbar}$ plus their conjugate, which oscillate at the **Bohr frequency** $(E_2 - E_1)/h$. Everything that moves in quantum mechanics moves because of such interference between energy components. Note also that the time dependence of a stationary state, $e^{-iEt/\hbar}$, cannot be detected on its own; a constant shift of $V$ changes all $E_n$ by the same amount and changes nothing measurable.
:::

::: example A sloshing superposition {#ex-slosh}
In the infinite square well of width $a$ (solved in detail in [[quantum-1/piecewise-potentials]]), the two lowest energy eigenfunctions are $\psi_n = \sqrt{2/a}\,\sin(n\pi x/a)$ with $E_n = n^2\pi^2\hbar^2/2ma^2$. At $t = 0$ the particle is in the state $\Psi = (\psi_1 + \psi_2)/\sqrt2$. Find $\langle x\rangle(t)$, and its period for an electron in a well of width $1.00\,\mathrm{nm}$.
::: solution
By [[#eq-general]], $\Psi(x,t) = \frac{1}{\sqrt2}\bigl(\psi_1e^{-iE_1t/\hbar} + \psi_2e^{-iE_2t/\hbar}\bigr)$. With real $\psi_n$,

$$
\abs{\Psi}^2 = \frac12\left(\psi_1^2 + \psi_2^2 + 2\psi_1\psi_2\cos\omega t\right), \qquad \omega = \frac{E_2 - E_1}{\hbar} = \frac{3\pi^2\hbar}{2ma^2}.
$$

The state is normalised because $\int\psi_1^2 = \int\psi_2^2 = 1$ and $\int\psi_1\psi_2\,\dd x = 0$ (orthogonality of sines). For $\langle x\rangle$ we need three integrals. By symmetry $\int x\psi_n^2\,\dd x = a/2$ for each $n$. The cross term, with $u = \pi x/a$, is

$$
\int_0^a x\psi_1\psi_2\,\dd x = \frac{2a}{\pi^2}\int_0^\pi u\sin u\sin 2u\,\dd u = \frac{2a}{\pi^2}\cdot\left(-\frac{8}{9}\right) = -\frac{16a}{9\pi^2},
$$

using $\sin u\sin2u = \frac12(\cos u - \cos3u)$, $\int_0^\pi u\cos u\,\dd u = -2$ and $\int_0^\pi u\cos 3u\,\dd u = -2/9$. Therefore

$$
\langle x\rangle(t) = \frac{a}{2} - \frac{16a}{9\pi^2}\cos\omega t = \frac a2\left(1 - \frac{32}{9\pi^2}\cos\omega t\right).
$$

The particle sloshes from side to side with amplitude $16a/9\pi^2 = 0.180\,a$. For an electron with $a = 1.00\,\mathrm{nm}$, $E_1 = \pi^2\hbar^2/2m_ea^2 = 0.376\,\mathrm{eV}$, so $E_2 - E_1 = 3E_1 = 1.128\,\mathrm{eV}$ and the period is

$$
T = \frac{h}{E_2 - E_1} = \frac{4.1357\times10^{-15}\,\mathrm{eV\,s}}{1.128\,\mathrm{eV}} = 3.67\times10^{-15}\,\mathrm{s}.
$$

A charged particle whose $\langle x\rangle$ oscillates radiates at that frequency, which is the photon of energy $E_2 - E_1$ emitted in the transition. The stationary states themselves do not radiate, which is what Bohr had to postulate.
:::
:::

::: widget plot
f: sin(pi*x)^2 + sin(2*pi*x)^2 + 2*sin(pi*x)*sin(2*pi*x)*cos(1.5*pi^2*s)
x: 0, 1
y: 0, 4
sliders: s=0:0:0.43:0.005
caption: The density $\abs{\Psi}^2$ (in units $\hbar = m = a = 1$) of the superposition $(\psi_1+\psi_2)/\sqrt2$ in an infinite well, at time $s$. Drag $s$ from $0$ to $0.43$, one full period $4/3\pi$. The hump moves from the left half to the right half and back, while each stationary component alone would have a frozen density. At $s \approx 0.21$ the cross term has changed sign and the picture is mirrored.
:::

## The free particle and wave packets {#free}

For $V = 0$ the time-independent equation is $\psi'' = -k^2\psi$ with $k = \sqrt{2mE}/\hbar$, so the solutions are $e^{\pm ikx}$, and with time dependence

$$
\Psi_k(x,t) = e^{i(kx - \hbar k^2t/2m)}, \qquad k \in \R.
$$

These are the plane waves we began with, travelling right for $k > 0$ and left for $k < 0$. They are not normalisable, so no particle is ever exactly in one of them. Physical states are superpositions over a continuous range of $k$, the continuous analogue of [[#eq-general]]:

$$
\Psi(x,t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^\infty \phi(k)\,e^{i(kx - \hbar k^2t/2m)}\,\dd k, \qquad \phi(k) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^\infty\Psi(x,0)\,e^{-ikx}\,\dd x.
$$ {#eq-packet}

The function $\phi(k)$ is the Fourier transform of the initial state ([Maths Atlas: the Fourier transform](/learn/maths/lesson.php?c=pde&l=fourier-transform)), and Plancherel's theorem guarantees that $\int\abs{\phi}^2\,\dd k = \int\abs{\Psi}^2\,\dd x = 1$. Such a superposition is a **wave packet**. In [[quantum-1/formalism]] we will see that $\abs{\phi(k)}^2\,\dd k$ is the probability that the momentum lies between $\hbar k$ and $\hbar(k + \dd k)$.

Each plane wave travels at the **phase velocity** $\omega/k = \hbar k/2m$, which is half the classical speed $p/m$. The packet as a whole, peaked near some $k_0$, moves at the **group velocity**

$$
v_g = \deriv{\omega}{k}\bigg|_{k_0} = \frac{\hbar k_0}{m} = \frac{p_0}{m},
$$

the classical velocity, as Ehrenfest's theorem demands. The dispersion relation $\omega = \hbar k^2/2m$ is not linear, so different components travel at different speeds and the packet spreads.

For a Gaussian initial packet the integrals in [[#eq-packet]] can be done exactly by completing the square (Griffiths & Schroeter, §2.4). If the density at $t = 0$ is a Gaussian of standard deviation $\sigma_0$, then it stays Gaussian, its centre moves at $v_g$, and its standard deviation grows as

$$
\sigma(t) = \sigma_0\sqrt{1 + \left(\frac{t}{\tau}\right)^2}, \qquad \tau = \frac{2m\sigma_0^2}{\hbar}.
$$ {#eq-spread}

There is a simple reading. The initial momentum spread is $\Delta p = \hbar/2\sigma_0$, the minimum allowed. For $t \gg \tau$ the width is $\sigma \approx (\Delta p/m)\,t$: the packet spreads like a cloud of classical particles whose velocities differ by $\Delta p/m$. The narrower you make the packet initially, the faster it spreads.

::: example How fast do packets spread? {#ex-spread}
(a) An electron is localised at $t = 0$ in a Gaussian packet with $\sigma_0 = 0.100\,\mathrm{nm}$, about the size of an atom. Find $\tau$ and the width after $1.00\,\mathrm{fs}$ and after $1.00\,\mathrm{ps}$. (b) Repeat for a dust grain of mass $1.00\,\mu\mathrm{g}$ localised to $\sigma_0 = 1.00\,\mu\mathrm{m}$.
::: solution
(a) $\tau = 2m_e\sigma_0^2/\hbar = 2(9.109\times10^{-31})(1.00\times10^{-20})/(1.0546\times10^{-34}) = 1.73\times10^{-16}\,\mathrm{s}$. After $1.00\,\mathrm{fs}$, $t/\tau = 5.79$, so $\sigma = 0.100\sqrt{1 + 5.79^2}\,\mathrm{nm} = 0.587\,\mathrm{nm}$. After $1.00\,\mathrm{ps}$, $t/\tau = 5.79\times10^3$ and $\sigma = 579\,\mathrm{nm}$, more than half a micrometre. A free electron does not stay localised to atomic size for even a femtosecond.

(b) $\tau = 2(1.00\times10^{-9})(1.00\times10^{-12})/(1.0546\times10^{-34}) = 1.90\times10^{13}\,\mathrm{s}$, about $6\times10^5$ years. The mass enters linearly and the width squared, so a dust grain's packet is for all practical purposes frozen, and the grain has a trajectory.
:::
:::

::: widget plot
f: exp(-x^2/(2*(1 + T^2)))/sqrt(2*pi*(1 + T^2))
x: -8, 8
y: 0, 0.45
sliders: T=0:0:4:0.05
caption: The density of a free Gaussian packet at rest, with $\sigma_0 = 1$ and time $T = t/\tau$. At $T = 0$ the width is $\sigma_0$. Increase $T$ and watch the peak drop while the area stays exactly $1$, as conservation of probability requires. For $T \gg 1$ the width grows linearly in $T$, the classical spreading of a cloud with velocity spread $\Delta p/m$.
:::

::: history Schrödinger, Born and Ehrenfest
Erwin Schrödinger, then in Zürich, published his wave equation in four papers titled "Quantisierung als Eigenwertproblem" in *Annalen der Physik* in 1926. The first obtained the hydrogen spectrum from the time-independent equation, and the time-dependent equation appeared in the fourth. Later in 1926 he showed that his theory was equivalent to the matrix mechanics of Heisenberg, Born and Jordan. Schrödinger at first read $\abs{\Psi}^2$ as a density of charge. Max Born, analysing collisions in a paper of June 1926, proposed instead that it gives a probability; the squared modulus appears in a footnote added in proof. Born received the Nobel Prize for this interpretation only in 1954. Paul Ehrenfest proved the theorem that bears his name in 1927. The Gaussian packet and its spreading were worked out by Earle Kennard in 1927.
:::

## Where this leads {#leads}

The rest of the course is mostly about solving [[#eq-tise]]. [[quantum-1/piecewise-potentials]] does it for wells, steps and barriers, where boundary conditions produce quantised energies and tunnelling. [[quantum-1/harmonic-oscillator]] does it with the operator method. [[quantum-1/formalism]] explains why energy eigenfunctions form an orthonormal basis, why $\abs{c_n}^2$ are probabilities, and why $\Delta x\,\Delta p \ge \hbar/2$, of which [[#ex-uncertainty]] was an instance. In three dimensions $\partial^2/\partial x^2$ becomes the Laplacian and the hydrogen atom follows ([[quantum-1/hydrogen]]).

::: summary
- The state is a complex wavefunction $\Psi(x,t)$; $\abs{\Psi}^2$ is the probability density for position (Born rule), and $\Psi$ must be normalised.
- $\Psi$ obeys the linear, first-order-in-time Schrödinger equation $i\hbar\,\partial_t\Psi = -(\hbar^2/2m)\,\partial_x^2\Psi + V\Psi$.
- Probability obeys $\partial_t\rho + \partial_x j = 0$ with $j = (\hbar/m)\operatorname{Im}(\Psi^*\partial_x\Psi)$, so normalisation is preserved; a plane wave has $j = \rho\,p/m$.
- Observables are operators, $\hat p = -i\hbar\,\partial_x$, and $\langle Q\rangle = \int\Psi^*\hat Q\Psi\,\dd x$. Ehrenfest: $\dd\langle x\rangle/\dd t = \langle p\rangle/m$ and $\dd\langle p\rangle/\dd t = -\langle V'\rangle$.
- Separation of variables gives the time-independent equation $\hat H\psi = E\psi$; stationary states $\psi e^{-iEt/\hbar}$ have constant density and definite energy.
- The general solution is $\sum c_n\psi_ne^{-iE_nt/\hbar}$; motion comes from interference between energies at Bohr frequencies $(E_m - E_n)/h$.
- Free wave packets move at the group velocity $p_0/m$ and spread; a Gaussian has $\sigma(t) = \sigma_0\sqrt{1 + (t/\tau)^2}$ with $\tau = 2m\sigma_0^2/\hbar$.
:::

## Exercises {#exercises}

::: exercise A cusped wavefunction {level=1 check="1 - exp(-2)"}
A particle has wavefunction $\psi(x) = A\,e^{-\lambda\abs{x}}$ with $\lambda > 0$. Normalise it, and find the probability that a position measurement gives $\abs{x} \le 1/\lambda$.
::: solution
$\int_{-\infty}^\infty A^2e^{-2\lambda\abs{x}}\,\dd x = 2A^2\int_0^\infty e^{-2\lambda x}\,\dd x = A^2/\lambda$, so $A = \sqrt\lambda$. Then

$$
P = 2\lambda\int_0^{1/\lambda}e^{-2\lambda x}\,\dd x = \bigl[-e^{-2\lambda x}\bigr]_0^{1/\lambda} = 1 - e^{-2} = 0.865.
$$

The answer does not depend on $\lambda$, because $1/\lambda$ is the natural length of the state. This wavefunction is the bound state of an attractive delta-function potential.
:::
:::

::: exercise The sloshing period {level=1 check="3.67"}
An electron in an infinite well of width $1.00\,\mathrm{nm}$ is in the state $(\psi_1 + \psi_2)/\sqrt2$. Find the period of oscillation of $\langle x\rangle$, in femtoseconds. What is the period if the well is twice as wide?
::: solution
As in [[#ex-slosh]], $E_1 = \pi^2\hbar^2/2m_ea^2 = 0.376\,\mathrm{eV}$ and $T = h/(3E_1) = 4.1357\times10^{-15}/1.128\,\mathrm{s} = 3.67\,\mathrm{fs}$. All energies scale as $1/a^2$, so doubling the width quadruples the period, to $14.7\,\mathrm{fs}$.
:::
:::

::: exercise Counter-propagating waves {level=1}
Find the probability current of $\Psi = \bigl(Ae^{ikx} + Be^{-ikx}\bigr)e^{-i\omega t}$, with $A$, $B$ complex constants and $k$ real.
::: solution
$\partial_x\Psi = ik\bigl(Ae^{ikx} - Be^{-ikx}\bigr)e^{-i\omega t}$, so

$$
\Psi^*\partial_x\Psi = ik\left(\abs{A}^2 - \abs{B}^2 + A B^* e^{2ikx} - A^*Be^{-2ikx}\right).
$$

The last two terms are $z - z^*$ with $z = AB^*e^{2ikx}$, which is purely imaginary, so after multiplication by $ik$ they become real and drop out of the imaginary part. Hence

$$
j = \frac{\hbar k}{m}\bigl(\abs{A}^2 - \abs{B}^2\bigr).
$$

The incident and reflected waves carry their currents independently, with no interference term. This is the formula used to define reflection coefficients in [[quantum-1/piecewise-potentials]].
:::
:::

::: exercise Amplitude of the slosh {level=2 check="16/(9*pi^2)"}
For the state $\Psi(x,0) = (\psi_1 + \psi_2)/\sqrt2$ in an infinite well of width $a$, find the amplitude of the oscillation of $\langle x\rangle$ in units of $a$, and find $\langle p\rangle(t)$.
::: hint
Use Ehrenfest's theorem rather than computing $\langle p\rangle$ directly.
:::
::: solution
From [[#ex-slosh]], $\langle x\rangle = a/2 - (16a/9\pi^2)\cos\omega t$, so the amplitude is $16/9\pi^2 = 0.180$ in units of $a$. Inside the well $V = 0$, and the first Ehrenfest equation holds (the boundary terms vanish because $\Psi = 0$ at the walls), so

$$
\langle p\rangle = m\deriv{\langle x\rangle}{t} = \frac{16am\omega}{9\pi^2}\sin\omega t = \frac{16am}{9\pi^2}\cdot\frac{3\pi^2\hbar}{2ma^2}\sin\omega t = \frac{8\hbar}{3a}\sin\omega t.
$$
:::
:::

::: exercise Falling packets {level=2}
A particle of mass $m$ moves in the uniform gravitational potential $V = mgx$ ($x$ upward). Show that $\langle x\rangle(t) = \langle x\rangle_0 + (\langle p\rangle_0/m)\,t - \frac12gt^2$ exactly, whatever the shape of the wave packet.
::: solution
By [[#thm-ehrenfest]], $\dd\langle p\rangle/\dd t = -\langle\dd V/\dd x\rangle = -\langle mg\rangle = -mg$, because $\dd V/\dd x = mg$ is a constant and $\langle c\rangle = c$ for a normalised state. Hence $\langle p\rangle = \langle p\rangle_0 - mgt$. Then $\dd\langle x\rangle/\dd t = \langle p\rangle/m = \langle p\rangle_0/m - gt$, and integrating gives the result. The centre of any packet falls exactly like the stone of [[mechanics/motion-1d]], although the packet may spread as it falls.
:::
:::

::: exercise No energy below the potential minimum {level=2}
Suppose $V(x) \ge V_{\min}$ for all $x$. Show that the time-independent Schrödinger equation has no normalisable solution with $E < V_{\min}$.
::: hint
Multiply [[#eq-tise]] by $\psi^*$, integrate, and integrate the kinetic term by parts.
:::
::: solution
Multiplying $\hat H\psi = E\psi$ by $\psi^*$ and integrating over all $x$, with $\int\abs\psi^2 = 1$,

$$
E = -\frac{\hbar^2}{2m}\int\psi^*\psi''\,\dd x + \int V\abs{\psi}^2\,\dd x.
$$

For a normalisable solution $\psi$ and $\psi'$ vanish at infinity, so integrating by parts, $-\int\psi^*\psi''\,\dd x = \int\abs{\psi'}^2\,\dd x \ge 0$. The second term is at least $V_{\min}\int\abs\psi^2 = V_{\min}$. Hence $E \ge V_{\min}$, with equality only if $\psi' = 0$ everywhere, which is impossible for a normalisable $\psi \ne 0$. So $E > V_{\min}$ strictly. Equivalently, if $E < V_{\min}$ then $\psi''$ has the same sign as $\psi$ everywhere, so $\psi$ curves away from the axis and cannot be normalised.
:::
:::

::: exercise Overlaps are conserved {level=3}
Let $\Psi_1$ and $\Psi_2$ be two solutions of the Schrödinger equation with the same real potential, both decaying at infinity together with their derivatives. Prove that $\int\Psi_1^*\Psi_2\,\dd x$ is independent of time. Deduce that two energy eigenfunctions with different energies are orthogonal.
::: solution
Differentiate under the integral and use $\partial_t\Psi = (i\hbar/2m)\Psi_{xx} - (i/\hbar)V\Psi$ and its conjugate:

$$
\deriv{}{t}\int\Psi_1^*\Psi_2\,\dd x = \int\left[\left(-\frac{i\hbar}{2m}\Psi^*_{1,xx} + \frac{i}{\hbar}V\Psi_1^*\right)\Psi_2 + \Psi_1^*\left(\frac{i\hbar}{2m}\Psi_{2,xx} - \frac{i}{\hbar}V\Psi_2\right)\right]\dd x.
$$

The potential terms cancel because $V$ is real. What remains is

$$
\frac{i\hbar}{2m}\int\bigl(\Psi_1^*\Psi_{2,xx} - \Psi^*_{1,xx}\Psi_2\bigr)\,\dd x = \frac{i\hbar}{2m}\Bigl[\Psi_1^*\Psi_{2,x} - \Psi^*_{1,x}\Psi_2\Bigr]_{-\infty}^\infty = 0,
$$

since the integrand is the derivative of the bracket. For stationary states $\Psi_j = \psi_je^{-iE_jt/\hbar}$, the overlap is $e^{i(E_1 - E_2)t/\hbar}\int\psi_1^*\psi_2\,\dd x$. It can be constant with $E_1 \ne E_2$ only if $\int\psi_1^*\psi_2\,\dd x = 0$.
:::
:::

::: exercise The Gaussian is a minimum-uncertainty state {level=3 check="1/2"}
Let $\psi(x) = A\,e^{-x^2/4\sigma^2}$. Normalise it, compute $\Delta x$ and $\Delta p$, and give the product $\Delta x\,\Delta p$ in units of $\hbar$.
::: hint
$\int_{-\infty}^\infty e^{-x^2/2\sigma^2}\,\dd x = \sigma\sqrt{2\pi}$ and $\int_{-\infty}^\infty x^2e^{-x^2/2\sigma^2}\,\dd x = \sigma^3\sqrt{2\pi}$.
:::
::: solution
$\abs\psi^2 = A^2e^{-x^2/2\sigma^2}$, so normalisation gives $A^2 = 1/(\sigma\sqrt{2\pi})$. The density is a normal distribution with mean $0$ and standard deviation $\sigma$, so $\langle x\rangle = 0$ and $\Delta x = \sigma$.

$\psi$ is real and even, so $\langle p\rangle = 0$. For $\langle p^2\rangle = \hbar^2\int(\psi')^2\,\dd x$ use $\psi' = -(x/2\sigma^2)\psi$:

$$
\langle p^2\rangle = \frac{\hbar^2}{4\sigma^4}\int x^2\abs\psi^2\,\dd x = \frac{\hbar^2}{4\sigma^4}\,\sigma^2 = \frac{\hbar^2}{4\sigma^2}.
$$

So $\Delta p = \hbar/2\sigma$ and $\Delta x\,\Delta p = \hbar/2$: the product is $1/2$ in units of $\hbar$, the smallest value the uncertainty principle permits. Gaussians are the only wavefunctions that achieve it (up to a phase $e^{ip_0x/\hbar}$ and a shift), as the proof in [[quantum-1/formalism]] shows.
:::
:::

::: exercise Dust grain {level=2 check="1.90e13"}
Find the spreading time $\tau = 2m\sigma_0^2/\hbar$, in seconds, of a $1.00\,\mu\mathrm{g}$ dust grain localised to $\sigma_0 = 1.00\,\mu\mathrm{m}$, and say after how many years its width has doubled.
::: solution
$\tau = 2(1.00\times10^{-9}\,\mathrm{kg})(1.00\times10^{-6}\,\mathrm{m})^2/(1.0546\times10^{-34}\,\mathrm{J\,s}) = 1.90\times10^{13}\,\mathrm{s}$. The width doubles when $\sqrt{1 + (t/\tau)^2} = 2$, i.e. $t = \sqrt3\,\tau = 3.28\times10^{13}\,\mathrm{s}$, about $1.0\times10^6$ years. In practice collisions with air molecules and thermal photons localise the grain far faster than this, which is the subject of decoherence.
:::
:::
