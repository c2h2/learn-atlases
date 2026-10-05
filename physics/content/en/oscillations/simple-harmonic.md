A mass on a spring, pulled aside and released, does not creep back and stop. It passes the unstretched position at speed, goes almost as far on the other side, and returns. A pendulum bob does the same, and so does a twisting wheel on a wire. In each case the restoring agent is stronger the farther the system is from a stable equilibrium, and, for a small disturbance, it is proportional to the displacement. Newton's second law, as in [[mechanics/newton-laws]], then forces the coordinate to satisfy

$$
\deriv{^2 x}{t^2} = -\omega^{2} x.
$$ {#eq-shm}

That equation is **simple harmonic motion**. Its solutions are sinusoids. The constant $\omega$ is fixed by the hardware — the stiffness and the inertia — and not by how far you pulled. The period is therefore independent of the amplitude, which is why a pendulum clock can keep time and why a mass on a spring can be a reference oscillator.

The kinematic formulae of constant acceleration do not apply. The acceleration here changes sign every time the mass passes equilibrium, and its magnitude grows with $\abs{x}$. What replaces those formulae is the general solution of [[#eq-shm]], together with an energy account from [[mechanics/work-energy]]: kinetic energy and a quadratic potential trade off, and their sum does not change. Throughout this chapter $g = 9.80\,\mathrm{m/s^{2}}$ when a weight is involved. Real oscillators lose a little energy each cycle; that loss is postponed to [[oscillations/damping]]. Here the restoring force is conservative and the drag is left out.

## The harmonic equation

::: definition Simple harmonic motion {#def-shm}
Let $\omega$ be a positive constant. A twice differentiable coordinate $x(t)$ executes **simple harmonic motion** with **angular frequency** $\omega$ when

$$
\deriv{^2 x}{t^2} + \omega^{2} x = 0
$$

at every instant under consideration. The **period** is $T = 2\pi/\omega$ and the **frequency** is $f = 1/T = \omega/(2\pi)$. The frequency counts cycles per unit time. The angular frequency counts radians of phase per unit time. They differ by the factor $2\pi$, and substituting one for the other is a different motion.
:::

The equation is linear and homogeneous. If $x_1$ and $x_2$ are solutions, so is $c_1 x_1 + c_2 x_2$. It is also autonomous: nothing on the right-hand side depends on $t$ explicitly, so the same experiment started a minute later has the same shape, only shifted in time. The constant $\omega$ has the dimension of inverse time. In SI units one reports it in $\mathrm{rad/s}$, the radian being the dimensionless measure of angle in which the calculus of sine and cosine was derived. A frequency in hertz is a different number.

::: intuition The shadow of uniform circular motion
Picture a point moving at constant speed around a circle of radius $C$, with angular speed $\omega$. If the centre is the origin and the point starts at angle $-\varphi$ from the $x$-axis, its horizontal coordinate is $x = C\cos(\omega t - \varphi)$. Differentiating twice brings down $-\omega^{2}$, so this shadow satisfies [[#eq-shm]]. The phase $\varphi$ is literally an angle on that circle. The velocity of the shadow vanishes when the point is at the right or left extremity, which is when the oscillating coordinate is at its greatest distance from the origin. This picture does not derive the equation from a force. It explains why the solutions look trigonometric, and why a phase shift is the natural second constant once the amplitude has been chosen.
:::

Two constants are expected. [[#eq-shm]] is a second-order equation, and Newton's second law, which produced it, determines the acceleration once the position is known, not the position itself. Position and velocity at one instant are the data. The next lemma says those data pick out at most one solution. The theorem after it writes that solution down.

::: lemma Zero initial data {#lem-unique}
Suppose $x$ satisfies [[#eq-shm]] and $x(0) = 0$, $\deriv{x}{t}(0) = 0$. Then $x(t) = 0$ for every $t$.
:::

::: proof
Define the non-negative quantity

$$
E_{*}(t) = \tfrac12 \left(\deriv{x}{t}\right)^{2} + \tfrac12 \omega^{2} x^{2}.
$$

Differentiating with the chain rule,

$$
\deriv{E_{*}}{t} = \deriv{x}{t}\,\deriv{^2 x}{t^2} + \omega^{2} x\,\deriv{x}{t} = \deriv{x}{t}\left(\deriv{^2 x}{t^2} + \omega^{2} x\right) = 0,
$$

where the last step is [[#eq-shm]]. Thus $E_{*}$ is constant. The initial data make $E_{*}(0) = 0$, so $E_{*}(t) = 0$ for every $t$. Both terms are non-negative, so each vanishes: $\deriv{x}{t} = 0$ and $x = 0$.
:::

The same argument shows that two solutions with the same position and the same velocity at $t = 0$ are the same solution. Their difference has zero initial data.

::: theorem General solution {#thm-solution}
Every solution of [[#eq-shm]] can be written

$$
x(t) = A\cos(\omega t) + B\sin(\omega t),
$$ {#eq-general}

with constants $A = x(0)$ and $B = \omega^{-1}\deriv{x}{t}(0)$. Equivalently, if $C = \sqrt{A^{2} + B^{2}}$, there is a phase $\varphi$ such that

$$
x(t) = C\cos(\omega t - \varphi).
$$ {#eq-phase}

When $C > 0$ the phase is fixed by $\cos\varphi = A/C$ and $\sin\varphi = B/C$. When $C = 0$ the motion is the rest solution and $\varphi$ is arbitrary. The velocity and the acceleration are

$$
\deriv{x}{t} = -C\omega\sin(\omega t - \varphi), \qquad \deriv{^2 x}{t^2} = -\omega^{2} x.
$$ {#eq-va}

In particular $\abs{x} \le C$ for all $t$, so $C$ is the **amplitude**: the greatest distance from the origin that the coordinate reaches. The greatest speed is $C\omega$, attained at each passage through $x = 0$.
:::

::: proof
Differentiate $A\cos(\omega t)$ twice: the first derivative is $-A\omega\sin(\omega t)$, the second is $-A\omega^{2}\cos(\omega t)$. The same calculation with $B\sin(\omega t)$ produces $-B\omega^{2}\sin(\omega t)$. Each function satisfies [[#eq-shm]], and therefore so does every linear combination [[#eq-general]].

The cosine subtraction formula gives

$$
C\cos(\omega t - \varphi) = C\cos\varphi\,\cos(\omega t) + C\sin\varphi\,\sin(\omega t).
$$

Choosing $A = C\cos\varphi$ and $B = C\sin\varphi$ puts [[#eq-phase]] into the family [[#eq-general]]. Conversely, given $A$ and $B$, the choice $C = \sqrt{A^{2} + B^{2}}$ and the two trigonometric conditions on $\varphi$ are solvable whenever $C > 0$, because those two numbers are a point on the unit circle. Both forms therefore describe the same family.

Now let $y$ be an arbitrary solution, and set $A = y(0)$, $B = \omega^{-1} y'(0)$. The combination $x$ in [[#eq-general]] is a solution, and $y - x$ is a solution with zero value and zero derivative at $t = 0$. [[#lem-unique]] forces $y - x = 0$.

Differentiating [[#eq-phase]] once produces the velocity in [[#eq-va]]. Differentiating again produces $-C\omega^{2}\cos(\omega t - \varphi)$, which is $-\omega^{2} x$. The speed is $C\omega\abs{\sin(\omega t - \varphi)}$, whose maximum is $C\omega$, and that maximum occurs when the cosine vanishes, that is when $x = 0$. The bound $\abs{x} \le C$ is the bound on the cosine.
:::

The constants are read at $t = 0$ because that instant is convenient. Data at another time $t_{1}$ are handled by shifting the clock, or by solving the two-by-two system that [[#eq-general]] and its derivative impose at $t_{1}$. [[#lem-unique]] says that system has one solution.

Release from rest means $B = 0$, so $\varphi = 0$ if $A > 0$ and $x(t) = A\cos(\omega t)$. A shove from the origin is the other extreme: $A = 0$ and $x(t) = B\sin(\omega t)$, with amplitude $\abs{v(0)}/\omega$. One period later $\omega(t + T) = \omega t + 2\pi$, so both $x$ and $v$ repeat. A quarter period after a positive turning point the speed is greatest and $x = 0$.

::: example Reading amplitude and phase {#ex-read}
A coordinate, in metres, is $x(t) = 0.050\cos(8t) + 0.020\sin(8t)$ with $t$ in seconds. Find $\omega$, the amplitude, a phase $\varphi$ in [[#eq-phase]], and the greatest speed.
::: solution
The expression is already [[#eq-general]] with $\omega = 8\,\mathrm{rad/s}$, $A = 0.050\,\mathrm{m}$ and $B = 0.020\,\mathrm{m}$. [[#thm-solution]] gives

$$
C = \sqrt{A^{2} + B^{2}} = \sqrt{0.050^{2} + 0.020^{2}} = \sqrt{0.00290} = 0.05385\,\mathrm{m}.
$$

Both $A$ and $B$ are positive, so $\varphi$ lies in $(0, \pi/2)$, with

$$
\cos\varphi = \frac{A}{C} = 0.9283, \qquad \sin\varphi = \frac{B}{C} = 0.3714, \qquad \varphi = 0.3805\,\mathrm{rad} = 21.8^{\circ}.
$$

Thus $x(t) = 0.05385\cos(8t - 0.3805)$, in metres. The greatest speed is

$$
C\omega = 0.05385 \times 8 = 0.4308\,\mathrm{m/s},
$$

which rounds to $0.431\,\mathrm{m/s}$ at three significant figures. It is attained whenever $x = 0$, not when $x$ is largest. At a turning point the speed is zero, by the same theorem.
:::
:::

::: quiz
A mass oscillates in the form [[#eq-phase]] with amplitude $C > 0$. Which statement is correct?
- [ ] Doubling $C$, while staying inside the linear law that produced [[#eq-shm]], doubles the period.
- [x] The acceleration equals $-\omega^{2} x$ at every position, including the equilibrium position, where both sides are zero.
- [ ] The symbols $\omega$ and $f$ are two names for one number.
- [ ] The greatest speed is $C/\omega$, attained at a turning point.
::: solution
[[#thm-solution]] gives the acceleration as $-\omega^{2} x$ everywhere, and the greatest speed as $C\omega$ at $x = 0$. The period $2\pi/\omega$ does not contain $C$. The frequency and the angular frequency differ by $2\pi$: $f = \omega/(2\pi)$.
:::
:::

## Energy

The kinematic solution already determines the speed at each position, because $C$ is fixed and [[#eq-va]] ties $v$ to $x$. Squaring and adding is the short way to see it, and it is the conservation law for this system.

::: theorem Energy of the oscillator {#thm-energy}
Let $x$ satisfy [[#eq-shm]], and let $m > 0$ be a constant mass associated with the coordinate in the sense that the kinetic energy is $\tfrac12 m v^{2}$ with $v = \deriv{x}{t}$. Define

$$
E = \tfrac12 m v^{2} + \tfrac12 m\omega^{2} x^{2}.
$$ {#eq-energy}

Then $E$ is constant. In the phase form [[#eq-phase]] its value is

$$
E = \tfrac12 m\omega^{2} C^{2}.
$$ {#eq-energy-c}

Equivalently, $E = \tfrac12 m\bigl(v(0)^{2} + \omega^{2} x(0)^{2}\bigr)$.
:::

::: proof
Differentiate [[#eq-energy]] along the motion:

$$
\deriv{E}{t} = m v\,\deriv{v}{t} + m\omega^{2} x\, v = m v\left(\deriv{^2 x}{t^2} + \omega^{2} x\right).
$$

The bracket vanishes by [[#eq-shm]], so $\deriv{E}{t} = 0$ and $E$ is constant. This is the argument the syllabus asks for: the time derivative of the proposed energy is identically zero on every solution, not merely small.

To evaluate the constant, substitute [[#eq-va]]:

$$
v^{2} + \omega^{2} x^{2} = C^{2}\omega^{2}\sin^{2}(\omega t - \varphi) + \omega^{2} C^{2}\cos^{2}(\omega t - \varphi) = C^{2}\omega^{2}.
$$

Hence $E = \tfrac12 m\omega^{2} C^{2}$. The same identity at $t = 0$, using $A = C\cos\varphi$ and $v(0) = C\omega\sin\varphi$, gives $A^{2} + B^{2} = C^{2}$ and therefore $E = \tfrac12 m\bigl(v(0)^{2} + \omega^{2} x(0)^{2}\bigr)$.
:::

The first term in [[#eq-energy]] is kinetic energy. The second depends only on position. For a spring it is the elastic potential of [[mechanics/work-energy]]. At a turning point $v = 0$ and $\abs{x} = C$, so the whole of $E$ sits in the second term. At equilibrium $x = 0$ and $\abs{v} = C\omega$, so the whole of $E$ sits in the kinetic energy. Halfway out, at $\abs{x} = C/\sqrt{2}$, the two terms are equal.

The differentiation did not assume a spring. Whenever a coordinate satisfies [[#eq-shm]] and the kinetic energy really is $\tfrac12 m \dot x^{2}$, [[#thm-energy]] applies. If the coordinate is an angle, $\tfrac12 m\dot\theta^{2}$ is not the kinetic energy unless $m$ has been replaced by a moment of inertia. The pendulum section is careful about this. The time average of each term, over a period, is half of $E$; that calculation is an exercise at the end of the chapter.

## The mass on a spring

Hooke's law supplies the force that turns [[#eq-shm]] into a prediction for $\omega$.

::: proposition Mass on a fixed spring {#prop-spring}
A particle of constant mass $m$ moves on a frictionless straight line. A spring of stiffness $k > 0$ exerts the force $F = -kx$, with $x$ measured from the unstretched position. Then the motion is simple harmonic with

$$
\omega = \sqrt{\frac{k}{m}}, \qquad T = 2\pi\sqrt{\frac{m}{k}}, \qquad f = \frac{1}{2\pi}\sqrt{\frac{k}{m}}.
$$ {#eq-spring}

The energy [[#eq-energy]] is the mechanical energy $\tfrac12 mv^{2} + \tfrac12 kx^{2}$, and $E = \tfrac12 k C^{2}$.
:::

::: proof
Newton's second law along the line is $m\,\deriv{^2 x}{t^2} = -kx$. Since $m > 0$,

$$
\deriv{^2 x}{t^2} + \frac{k}{m}\, x = 0.
$$

This is [[#eq-shm]] with $\omega^{2} = k/m$. The positive square root is the angular frequency in [[#def-shm]], and $T = 2\pi/\omega$ gives the period. Because $\omega^{2} = k/m$, the positional term in [[#eq-energy]] is $\tfrac12 m\omega^{2} x^{2} = \tfrac12 kx^{2}$, which is the elastic potential fixed in [[mechanics/work-energy]] by choosing the zero at the unstretched position. [[#eq-energy-c]] then reads $E = \tfrac12 m\omega^{2} C^{2} = \tfrac12 k C^{2}$.
:::

The period grows with the square root of the mass and falls with the square root of the stiffness. Doubling the mass, at fixed $k$, multiplies $T$ by $\sqrt{2}$, not by $2$. Doubling the amplitude does nothing to $T$, provided the spring is still in its linear range. That proviso is the content of Hooke's law as used here. A spring pulled far enough to yield, or a rubber band, does not obey $F = -kx$, and [[#eq-spring]] does not apply to it.

The stiffness $k$ is a property of the spring, in newtons per metre. The ratio $k/m$ is $\omega^{2}$, in $\mathrm{s^{-2}}$. A measured period is often the practical route to $k$: from [[#eq-spring]], $k = m(2\pi/T)^{2}$.

::: example Released from rest {#ex-spring}
A spring has $k = 40\,\mathrm{N/m}$. A mass $m = 0.250\,\mathrm{kg}$ is attached, displaced to $x = 0.080\,\mathrm{m}$ from the unstretched position, and released from rest on a frictionless horizontal line. Find $\omega$, $T$, the energy, and the greatest speed, and write $x(t)$.
::: solution
[[#prop-spring]] gives

$$
\omega = \sqrt{\frac{40}{0.250}} = \sqrt{160} = 12.649\,\mathrm{rad/s},
$$

recorded as $12.65\,\mathrm{rad/s}$. The period is

$$
T = \frac{2\pi}{\omega} = \frac{2\pi}{\sqrt{160}} = 0.4967\,\mathrm{s},
$$

recorded as $0.497\,\mathrm{s}$. Release from rest at a positive displacement means $A = 0.080\,\mathrm{m}$, $B = 0$ and $C = 0.080\,\mathrm{m}$, so

$$
x(t) = 0.080\cos(\omega t),
$$

in metres, with the $\omega$ just computed. The energy can be evaluated as elastic potential at release, where the kinetic energy is zero:

$$
E = \tfrac12 k C^{2} = \tfrac12 \times 40 \times (0.080)^{2} = 20 \times 0.00640 = 0.128\,\mathrm{J}.
$$

[[#thm-energy]] gives the same number as $\tfrac12 m\omega^{2} C^{2} = \tfrac12 \times 0.250 \times 160 \times 0.00640 = 0.128\,\mathrm{J}$. The greatest speed is

$$
v_{\max} = C\omega = 0.080 \times \sqrt{160} = 1.0119\,\mathrm{m/s},
$$

recorded as $1.012\,\mathrm{m/s}$. It occurs at $t = T/4 = 0.124\,\mathrm{s}$, when $x = 0$.

As a check on the initial acceleration, Hooke's law gives $F(0) = -kx(0) = -40 \times 0.080 = -3.20\,\mathrm{N}$, so $a(0) = F/m = -3.20/0.250 = -12.8\,\mathrm{m/s^{2}}$. The harmonic equation gives $a(0) = -\omega^{2} x(0) = -160 \times 0.080 = -12.8\,\mathrm{m/s^{2}}$. The two routes agree, as they must: the second is the first divided by $m$.
:::
:::

::: widget oscillator
m: 0.25
c: 0
k: 40
F: 0
x0: 0.08
v0: 0
caption: These are the mass, stiffness and initial data of the worked spring. Leave c at 0 and play the motion. With c = 0 the motion does not decay: every peak returns to the release height. Raising c makes the peaks fall, which is the next chapter. Changing x0 changes the amplitude and not the period.
:::

The figure integrates $m x'' + c x' + k x = 0$. With the damping coefficient $c$ set to zero this is the spring of [[#prop-spring]]. The trace of $x$ against $t$ is the cosine we just wrote, and the phase portrait, if you read speed against position, is the ellipse implied by [[#eq-energy]] at $E = 0.128\,\mathrm{J}$.

A constant extra force does not change $\omega$. Gravity on a vertical spring is the case one meets in the laboratory: the mass hangs, the spring is already stretched at equilibrium, and oscillations are measured from that hanging position rather than from the unstretched length.

::: proposition Shifted equilibrium {#prop-shift}
Suppose the force is $F = -kx + F_{0}$ with $k > 0$ and $F_{0}$ constant, on a particle of constant mass $m$. Let $x_{\mathrm{eq}} = F_{0}/k$ and $z = x - x_{\mathrm{eq}}$. Then $z$ executes simple harmonic motion with $\omega = \sqrt{k/m}$, the same angular frequency as the unforced spring.
:::

::: proof
Newton's second law reads $m\,\deriv{^2 x}{t^2} = -kx + F_{0}$. Substitute $x = z + x_{\mathrm{eq}}$:

$$
m\,\deriv{^2 z}{t^2} = -k(z + x_{\mathrm{eq}}) + F_{0} = -kz - kx_{\mathrm{eq}} + F_{0}.
$$

The constant terms cancel because $x_{\mathrm{eq}}$ was defined by $kx_{\mathrm{eq}} = F_{0}$. Dividing by $m$ leaves $z'' + (k/m) z = 0$.
:::

For a vertical spring take the positive sense downward from the unstretched position, so that the weight is the positive constant $F_{0} = mg$. The equilibrium extension is $\delta = mg/k$. Oscillations about that hanging position have the period [[#eq-spring]]. Measuring $x$ from the unstretched position and then forgetting to shift the origin is the usual way to produce a spurious constant in the solution. The general solution for $z$ is still a pure sinusoid; the general solution for the unstretched coordinate $x$ is that sinusoid plus $\delta$.

The same shift explains why a spring held vertically and a spring laid on a frictionless table, with the same $k$ and $m$, beat together. Gravity has moved the centre of the oscillation. It has not changed the curvature of the potential. Explicitly, the potential energy of spring plus gravity, with $y$ upward from the unstretched position, is $\tfrac12 ky^{2} + mgy$ plus a constant. Completing the square,

$$
\tfrac12 ky^{2} + mgy = \tfrac12 k\left(y + \frac{mg}{k}\right)^{2} - \frac{(mg)^{2}}{2k},
$$

shows a well of the same stiffness centred on the hanging position $y = -mg/k$. [[mechanics/work-energy]] already guarantees that the total mechanical energy is conserved. [[#thm-energy]] evaluates it.

::: example A shove as well as a displacement {#ex-shove}
The spring and mass of [[#ex-spring]] are again started at $x(0) = 0.080\,\mathrm{m}$, but now with $v(0) = 0.500\,\mathrm{m/s}$ in the positive direction. Find the energy, the amplitude, and a phase in [[#eq-phase]].
::: solution
The angular frequency is unchanged, because [[#prop-spring]] does not consult the initial data: $\omega = \sqrt{160} = 12.649\,\mathrm{rad/s}$. The energy is the sum of the two contributions at $t = 0$,

$$
E = \tfrac12 mv(0)^{2} + \tfrac12 kx(0)^{2} = \tfrac12(0.250)(0.500)^{2} + \tfrac12(40)(0.080)^{2}.
$$

The kinetic piece is $0.03125\,\mathrm{J}$ and the potential piece is the $0.128\,\mathrm{J}$ of [[#ex-spring]], so $E = 0.15925\,\mathrm{J}$, or $0.159\,\mathrm{J}$ to three significant figures. [[#eq-energy-c]] then fixes the amplitude without another integration:

$$
C = \sqrt{\frac{2E}{m\omega^{2}}} = \sqrt{\frac{2E}{k}} = \sqrt{\frac{0.3185}{40}} = \sqrt{0.0079625} = 0.08923\,\mathrm{m}.
$$

From [[#thm-solution]], $A = x(0) = 0.080\,\mathrm{m}$ and $B = v(0)/\omega = 0.500/\sqrt{160} = 0.03953\,\mathrm{m}$. These rebuild $C = \sqrt{A^{2} + B^{2}} = 0.08923\,\mathrm{m}$. Both are positive, so

$$
\varphi = \arctan\left(\frac{B}{A}\right) = \arctan(0.4941) = 0.4589\,\mathrm{rad} = 26.3^{\circ},
$$

and $x(t) = 0.08923\cos(\omega t - 0.4589)$. The greatest speed is $C\omega = 1.129\,\mathrm{m/s}$, larger than in [[#ex-spring]] because the shove added energy. The period is still $0.497\,\mathrm{s}$.
:::
:::

## The simple pendulum

A simple pendulum is a point mass $m$ on a light rod, or a light inextensible string, of length $L$, swinging in a plane about a fixed pivot. The coordinate is the angle $\theta$ from the downward vertical, positive in a chosen sense, and measured in radians. The forces on the bob are its weight and the tension, or the force along the rod. The tension is radial. It changes the direction of the velocity and does no work, but the tangential equation does not contain it.

The arc length from the bottom is $s = L\theta$, so the tangential acceleration is $L\,\deriv{^2\theta}{t^2}$. The tangential component of the weight is $-mg\sin\theta$: at positive $\theta$ the bob is to one side and the weight pulls it back toward $\theta = 0$. Newton's second law along the tangent is therefore

$$
m L\,\deriv{^2\theta}{t^2} = -mg\sin\theta,
$$

or, after cancelling $m$ (the mass does not appear in the motion, as long as the string stays taut),

$$
\deriv{^2\theta}{t^2} + \frac{g}{L}\sin\theta = 0.
$$ {#eq-pendulum-exact}

This is exact within the idealisations just stated, and it is not [[#eq-shm]]. The restoring acceleration is proportional to $\sin\theta$, not to $\theta$.

::: proposition Small oscillations of a simple pendulum {#prop-pendulum}
Assume [[#eq-pendulum-exact]], and assume $\theta$ is small enough, in radians, that replacing $\sin\theta$ by $\theta$ is acceptable for the accuracy required. Then $\theta$ executes simple harmonic motion with

$$
\omega = \sqrt{\frac{g}{L}}, \qquad T = 2\pi\sqrt{\frac{L}{g}}.
$$ {#eq-pendulum}
:::

::: proof
The Taylor expansion about $\theta = 0$, with $\theta$ in radians, is $\sin\theta = \theta - \theta^{3}/6 + \cdots$. The hypothesis drops every term after the first, so [[#eq-pendulum-exact]] collapses to $\theta'' + (g/L)\theta = 0$. [[#def-shm]] and [[#thm-solution]], applied to the coordinate $\theta$, give the stated $\omega$ and $T$.
:::

The hypothesis is about the angle, and it needs radians: $\sin 10^{\circ} \approx 0.174$ is not close to the number $10$. Even in radians the cubic term grows with amplitude. The relative size of the first neglected term in the restoring acceleration is about $\theta^{2}/6$, near $0.005$ at $10^{\circ}$ and near $0.046$ at $30^{\circ}$. The period is a property of the whole orbit, so it does not shift by that same percentage. The exact period of [[#eq-pendulum-exact]] at amplitude $\theta_{m}$ is an elliptic integral,

$$
T = 4\sqrt{\frac{L}{g}}\int_{0}^{\pi/2}\frac{\dd\varphi}{\sqrt{1 - \sin^{2}(\theta_{m}/2)\,\sin^{2}\varphi}}.
$$

Its expansion for moderate amplitudes begins

$$
\frac{T}{T_{0}} = 1 + \tfrac14\sin^{2}\!\left(\frac{\theta_{m}}{2}\right) + \tfrac{9}{64}\sin^{4}\!\left(\frac{\theta_{m}}{2}\right) + \cdots,
$$

where $T_{0} = 2\pi\sqrt{L/g}$ is [[#eq-pendulum]]. At $\theta_{m} = 30^{\circ}$, $\sin 15^{\circ} = 0.2588$ and $\sin^{2} 15^{\circ} = 0.06699$. The first correction is $\tfrac14 \times 0.06699 = 0.01675$, and the second is $\tfrac{9}{64}\times(0.06699)^{2} = 0.00063$. Their sum gives $T/T_{0} = 1.0174$. The period is longer than the small-angle formula by $1.74\%$. That digit comes from the series, not from a guess. At $10^{\circ}$ the first correction is under two parts in a thousand.

::: warning Small angles, and radians
[[#eq-pendulum]] is the small-angle period. It is not a theorem about arbitrary swings. At an amplitude of $30^{\circ}$ the period of [[#eq-pendulum-exact]] is longer than $T_{0}$; the elliptic expansion just evaluated puts the difference at $1.74\%$. Quoting some other percentage, without that integral or its series, is not a calculation. Separately, $\sin\theta \approx \theta$ is a radian statement. An angle entered in degrees must be converted before it is compared with its sine, and before it is used as the coordinate in [[#eq-shm]].
:::

The energy check uses the arc speed. With $v = L\,\deriv{\theta}{t}$, the kinetic energy is $\tfrac12 m L^{2}\dot\theta^{2}$. The gravitational potential, zero at the bottom, is $mgL(1 - \cos\theta)$. For small $\theta$, $1 - \cos\theta \approx \theta^{2}/2$, so

$$
E \approx \tfrac12 m L^{2}\dot\theta^{2} + \tfrac12 m g L\,\theta^{2} = \tfrac12 m \dot s^{2} + \tfrac12 m\omega^{2} s^{2},
$$

with $s = L\theta$ and $\omega^{2} = g/L$. This is [[#eq-energy]] for the arc coordinate. The mass cancels in the motion but not in the energy: a heavier bob at the same angle stores more potential energy, and it also has more inertia, in exactly the proportion that leaves $\omega$ alone.

::: example A pendulum one metre long {#ex-pendulum}
A simple pendulum has length $L = 1.00\,\mathrm{m}$. Estimate the small-angle period and the angular frequency. If the amplitude is $5.00^{\circ}$, estimate the greatest speed of the bob.
::: solution
[[#eq-pendulum]] with $g = 9.80\,\mathrm{m/s^{2}}$ gives

$$
T = 2\pi\sqrt{\frac{1.00}{9.80}} = 2\pi\sqrt{0.10204} = 2.007\,\mathrm{s},
$$

and $\omega = \sqrt{g/L} = \sqrt{9.80} = 3.130\,\mathrm{rad/s}$. Five degrees is $5\pi/180 = 0.08727\,\mathrm{rad}$. At that amplitude the first correction in the series above is $\tfrac14\sin^{2}(2.5^{\circ}) \approx 0.0005$, so the small-angle period is ample. The greatest angular speed in the harmonic approximation is $\omega\theta_{m}$, and the greatest bob speed is

$$
v_{\max} = L\omega\theta_{m} = 1.00 \times \sqrt{9.80} \times 0.08727 = 0.273\,\mathrm{m/s}.
$$

The exact energy route, without the small-angle replacement in the potential, gives $v = \sqrt{2gL(1 - \cos\theta_{m})} = 0.273\,\mathrm{m/s}$ as well at this amplitude: the two agree to three figures. They would separate at $30^{\circ}$.
:::
:::

A measured period solves for $g$, or for $L$. From [[#eq-pendulum]], $g = 4\pi^{2} L/T^{2}$. Timing a long pendulum was historically a practical measurement of $g$, and it is still a good laboratory problem, provided the amplitude really is small and the string length is measured to the centre of the bob rather than to the knot. The mass of the bob does not enter.

::: application The seconds pendulum
A simple pendulum whose period is two seconds, one second each way, is a **seconds pendulum**. [[#eq-pendulum]] puts its length at $L = g T^{2}/(4\pi^{2}) = g/\pi^{2}$. With $g = 9.80\,\mathrm{m/s^{2}}$ that length is $0.993\,\mathrm{m}$. A clock regulated by such a pendulum is using [[#prop-pendulum]] as a machine for counting equal times. The regulation is only as good as the small-angle hypothesis and the constancy of $L$ and $g$.
:::

## The physical pendulum

A real pendulum is a rigid body, not a point mass on a string. The body swings about a fixed horizontal axis. Let $I$ be its moment of inertia about that axis, $m$ its mass, and $d$ the distance from the axis to the centre of mass. The angle $\theta$ is again measured from the hanging equilibrium, in which the centre of mass lies a distance $d$ directly below the pivot.

::: theorem Physical pendulum {#thm-physical}
Under the small-angle hypothesis $\sin\theta \approx \theta$, with $\theta$ in radians, the body oscillates with

$$
T = 2\pi\sqrt{\frac{I}{mgd}}, \qquad \omega = \sqrt{\frac{mgd}{I}}.
$$ {#eq-physical}

The length of the equivalent simple pendulum is $\ell = I/(md)$: a point mass on a string of that length has the same small-angle period.
:::

::: proof
The weight $mg$ acts at the centre of mass. Its moment about the pivot is $-mgd\sin\theta$, the minus sign because a positive $\theta$ produces a restoring moment. The rotational equation about the fixed axis, from [[mechanics/rotation]], is $I\,\deriv{^2\theta}{t^2} = -mgd\sin\theta$, so

$$
\deriv{^2\theta}{t^2} + \frac{mgd}{I}\sin\theta = 0.
$$

The small-angle hypothesis replaces $\sin\theta$ by $\theta$ and produces [[#eq-shm]] with $\omega^{2} = mgd/I$. The period $2\pi/\omega$ is [[#eq-physical]]. Comparing with [[#eq-pendulum]] shows that the simple pendulum of length $\ell = I/(md)$ has the same $\omega$, because $g/\ell = mgd/I$.
:::

The simple pendulum is the special case $I = mL^{2}$ and $d = L$, which returns $\ell = L$. Spreading the mass changes $I$ and $d$ differently, so the period changes. The parallel-axis theorem in [[mechanics/rotation]] is the usual tool for $I$ when the moment about the centre of mass is known. For a uniform rod the integral is short enough to do on the spot.

::: corollary Uniform rod about one end {#cor-rod}
A uniform rod of mass $M$ and length $L$ swings in a plane about a fixed perpendicular axis through one end. For small angles,

$$
T = 2\pi\sqrt{\frac{2L}{3g}}.
$$ {#eq-rod}

The equivalent length is $2L/3$.
:::

::: proof
Place the rod along $0 \le r \le L$ with the pivot at $r = 0$. The linear density is $\lambda = M/L$, and the moment of inertia about the pivot is

$$
I = \int_{0}^{L} r^{2}\,\lambda\,\dd r = \lambda\frac{L^{3}}{3} = \frac{ML^{2}}{3}.
$$

The centre of mass of a uniform rod is at its midpoint, so $d = L/2$. [[#eq-physical]] gives

$$
T = 2\pi\sqrt{\frac{ML^{2}/3}{Mg\cdot L/2}} = 2\pi\sqrt{\frac{L^{2}}{3}\cdot\frac{2}{gL}} = 2\pi\sqrt{\frac{2L}{3g}}.
$$

The mass cancels. The equivalent length is $I/(Md) = (L^{2}/3)/(L/2) = 2L/3$.
:::

A rod of length $L$ therefore beats faster than a simple pendulum of length $L$, by the factor $\sqrt{2/3} \approx 0.816$, and slower than one of length $L/2$. The equivalent length $2L/3$ sits between those two.

::: example Rod and string of the same length {#ex-rod}
Compare a uniform rod of length $L = 1.00\,\mathrm{m}$, pivoted at one end, with the simple pendulum of [[#ex-pendulum]].
::: solution
[[#eq-rod]] gives

$$
T_{\mathrm{rod}} = 2\pi\sqrt{\frac{2\times 1.00}{3\times 9.80}} = 2\pi\sqrt{\frac{2}{29.4}} = 2\pi\sqrt{0.068027} = 1.639\,\mathrm{s}.
$$

The simple pendulum of the same length had period $2.007\,\mathrm{s}$. The ratio is $1.639/2.007 = 0.8166$, matching $\sqrt{2/3} = 0.8165$. The equivalent length is $2L/3 = 0.667\,\mathrm{m}$. A simple pendulum of that length has period

$$
T = 2\pi\sqrt{\frac{0.6667}{9.80}} = 1.639\,\mathrm{s},
$$

which is the last sentence of [[#thm-physical]]. The mass of the rod was never needed. Hanging equilibrium requires the centre of mass below the pivot. If instead the rod is pivoted at its centre, then $d = 0$ and there is no first-order restoring moment.
:::
:::

## A torsional oscillator

A pendulum uses a weight. A wire under twist does not. If a rigid body hangs from a wire, or is mounted on a shaft, and the restoring torque is proportional to the angle of twist, the motion is harmonic for a reason that never mentions $g$.

::: proposition Torsional oscillator {#prop-torsion}
Suppose a rigid body has moment of inertia $I$ about a fixed axis, and the only torque about that axis is $\tau = -\kappa\theta$ with torsion constant $\kappa > 0$ and $\theta$ in radians. Then

$$
\omega = \sqrt{\frac{\kappa}{I}}, \qquad T = 2\pi\sqrt{\frac{I}{\kappa}}.
$$ {#eq-torsion}

Within this linear law the period does not depend on the amplitude, and it does not depend on $g$.
:::

::: proof
The rotational equation is $I\,\deriv{^2\theta}{t^2} = -\kappa\theta$, so $\theta'' + (\kappa/I)\theta = 0$. This is [[#eq-shm]] with $\omega^{2} = \kappa/I$, and the period is $2\pi/\omega$. Gravity does not appear in the torque hypothesis, so it does not appear in $\omega$.
:::

The law $\tau = -\kappa\theta$ is the angular analogue of Hooke's law, and it fails when the wire yields. The stored energy is $\tfrac12\kappa\theta^{2}$ and the kinetic energy is $\tfrac12 I\dot\theta^{2}$, so [[#thm-energy]] applies with $m$ replaced by $I$. A torsional oscillator still oscillates in free fall. A pendulum does not: without an apparent weight the restoring moment disappears.

::: example A disc on a wire {#ex-torsion}
A body with $I = 2.00\times 10^{-3}\,\mathrm{kg\,m^{2}}$ is suspended from a wire with $\kappa = 5.00\times 10^{-2}\,\mathrm{N\,m/rad}$. Find the period. If it is released from rest at $\theta = 0.200\,\mathrm{rad}$, find the energy and the greatest angular speed.
::: solution
[[#eq-torsion]] gives $\omega = \sqrt{\kappa/I} = \sqrt{0.0500/0.00200} = \sqrt{25.0} = 5.00\,\mathrm{rad/s}$, and

$$
T = \frac{2\pi}{5.00} = 1.257\,\mathrm{s},
$$

which rounds to $1.26\,\mathrm{s}$. Release from rest means the angular amplitude is $0.200\,\mathrm{rad}$. The energy is entirely potential at release,

$$
E = \tfrac12\kappa C^{2} = \tfrac12\times 0.0500\times(0.200)^{2} = 0.00100\,\mathrm{J}.
$$

The greatest angular speed is $C\omega = 0.200\times 5.00 = 1.00\,\mathrm{rad/s}$. As a check, $\tfrac12 I\omega_{\mathrm{ang}}^{2} = \tfrac12\times 2.00\times 10^{-3}\times 1.00 = 0.00100\,\mathrm{J}$ at the untwisted position, where the potential vanishes. The two stores match.
:::
:::

The four formulae sit in one table. In each row the motion is [[#eq-shm]] for a named coordinate, and the period is independent of amplitude inside the linear law that was assumed.

| System | Coordinate | $\omega^{2}$ | Period |
|---|---|---|---|
| Spring | displacement $x$ | $k/m$ | $2\pi\sqrt{m/k}$ |
| Simple pendulum, small angle | angle $\theta$ | $g/L$ | $2\pi\sqrt{L/g}$ |
| Physical pendulum, small angle | angle $\theta$ | $mgd/I$ | $2\pi\sqrt{I/(mgd)}$ |
| Torsional oscillator | angle $\theta$ | $\kappa/I$ | $2\pi\sqrt{I/\kappa}$ |

::: history Pendulums, cycloids and Hooke's law
In November 1602 Galileo wrote to Guidobaldo del Monte that a pendulum returns in the same time on a large swing as on a small one. The letter is the earliest surviving statement of that claim. It is nearly true for small swings, which is [[#prop-pendulum]], and it is not exact for arbitrary swings, which is the elliptic integral above. Galileo did not have the small-angle equation. He had a careful observation and an over-strong conclusion.

Christiaan Huygens, in *Horologium oscillatorium* (1673), separated the two facts. He proved that a particle constrained to a cycloid oscillates in a time independent of amplitude, and he arranged the suspension of a pendulum clock so that the bob would follow a cycloid. He also obtained the small-arc period of an ordinary circular pendulum, the formula [[#eq-pendulum]], and with it the length of a seconds pendulum. The cycloidal correction is what the circular pendulum lacks: isochronism at every amplitude, not only in the limit $\theta \to 0$.

Robert Hooke published the linear law for a spring in 1678, in *De potentia restitutiva*: the extension is proportional to the load. He had asserted the idea earlier as the anagram of *ut tensio, sic vis*. That proportionality is the force hypothesis of [[#prop-spring]]. The sinusoidal motion is not an extra experimental claim. It is Newton's second law applied to Hooke's force.
:::

## Where this leads

Every system in the table is an idealisation with a conservative restoring agent and no drag. A damper, a hand on a pendulum, or air on a bob removes energy. The equation gains a term in the velocity, the motion is no longer periodic in the strict sense, and the three regimes — ringing decay, a borderline return, and a slow creep — are the subject of [[oscillations/damping]]. Drive the same system periodically and the steady response depends sharply on how close the drive sits to $\omega$. That is resonance, treated after damping because the steady state is what remains once the free motion has died.

Couple many such oscillators to their neighbours and the same local equation lets a disturbance travel, which is the start of the wave chapters. The energy [[#thm-energy]] then moves through the medium instead of staying on one mass.

::: summary
- Simple harmonic motion is the equation $x'' = -\omega^{2} x$. The general solution is $x = A\cos(\omega t) + B\sin(\omega t) = C\cos(\omega t - \varphi)$, with $C = \sqrt{A^{2} + B^{2}}$.
- The velocity is $-C\omega\sin(\omega t - \varphi)$ and the acceleration is $-\omega^{2} x$ at every instant. The greatest speed is $C\omega$, at $x = 0$.
- The quantity $E = \tfrac12 mv^{2} + \tfrac12 m\omega^{2} x^{2}$ is constant and equals $\tfrac12 m\omega^{2} C^{2}$. Its time derivative vanishes because $x'' + \omega^{2} x = 0$.
- A spring gives $\omega = \sqrt{k/m}$ and $T = 2\pi\sqrt{m/k}$. A constant extra force, such as weight on a vertical spring, shifts the equilibrium and leaves $\omega$ unchanged.
- A simple pendulum has $\theta'' + (g/L)\sin\theta = 0$. Only the small-angle replacement $\sin\theta \approx \theta$, in radians, produces $T = 2\pi\sqrt{L/g}$. At $30^{\circ}$ the true period is longer by $1.74\%$.
- A physical pendulum has $T = 2\pi\sqrt{I/(mgd)}$. A uniform rod about one end has $I = ML^{2}/3$, $d = L/2$ and $T = 2\pi\sqrt{2L/(3g)}$.
- A torsional oscillator with torque $-\kappa\theta$ has $T = 2\pi\sqrt{I/\kappa}$, independent of $g$. In every linear case the period does not depend on the amplitude.
:::

## Exercises

::: exercise Period of a stiffer spring {#exr-spring-period level=1 check="2*pi*sqrt(0.4/100)"}
A mass $m = 0.400\,\mathrm{kg}$ is attached to a spring of stiffness $k = 100\,\mathrm{N/m}$ and moves on a frictionless horizontal line. Find the period of oscillation.
::: solution
[[#eq-spring]] does not depend on the amplitude. With the given mass and stiffness,

$$
T = 2\pi\sqrt{\frac{m}{k}} = 2\pi\sqrt{\frac{0.400}{100}} = 2\pi\sqrt{0.00400} = 0.397\,\mathrm{s}.
$$

The angular frequency is $\omega = \sqrt{k/m} = \sqrt{250} = 15.8\,\mathrm{rad/s}$, and $T = 2\pi/\omega$ recovers the same period. Doubling $k$ at this mass would divide $T$ by $\sqrt{2}$, not by $2$.
:::
:::

::: exercise A short pendulum {#exr-short-pendulum level=1 check="2*pi*sqrt(0.25/9.80)"}
A simple pendulum has length $L = 0.250\,\mathrm{m}$. Find its period for small oscillations. Take $g = 9.80\,\mathrm{m/s^{2}}$.
::: solution
[[#eq-pendulum]] gives

$$
T = 2\pi\sqrt{\frac{L}{g}} = 2\pi\sqrt{\frac{0.250}{9.80}} = 2\pi\sqrt{0.02551} = 1.004\,\mathrm{s}.
$$

The mass of the bob is not in the formula. The result is the small-angle period only: a swing to a large angle is longer, as the warning under [[#prop-pendulum]] records.
:::
:::

::: exercise Greatest speed from the phase form {#exr-vmax level=1 check="0.5"}
A particle's coordinate, in metres, is $x(t) = 0.050\cos(10 t)$ with $t$ in seconds. Find its greatest speed.
::: solution
This is [[#eq-phase]] with $C = 0.050\,\mathrm{m}$, $\omega = 10\,\mathrm{rad/s}$ and $\varphi = 0$. [[#thm-solution]] says the greatest speed is

$$
C\omega = 0.050 \times 10 = 0.50\,\mathrm{m/s},
$$

attained at each instant when $x = 0$. The greatest acceleration is $\omega^{2} C = 5.0\,\mathrm{m/s^{2}}$, attained at the turning points, where the speed is zero. The period $2\pi/10$ is not required for the speed.
:::
:::

::: exercise Energy after a shove {#exr-shove-energy level=2 check="0.5*0.25*0.5^2+0.5*40*0.08^2"}
The spring of [[#ex-spring]] has $k = 40\,\mathrm{N/m}$ and $m = 0.250\,\mathrm{kg}$. At $t = 0$ the mass is at $x = 0.080\,\mathrm{m}$ with $v = 0.500\,\mathrm{m/s}$. Find the total energy in joules.
::: solution
Use [[#thm-energy]], or the spring form $\tfrac12 mv^{2} + \tfrac12 kx^{2}$ from [[#prop-spring]]. The two pieces at the initial instant are

$$
\tfrac12(0.250)(0.500)^{2} = 0.03125\,\mathrm{J}, \qquad \tfrac12(40)(0.080)^{2} = 0.128\,\mathrm{J}.
$$

The sum is $E = 0.15925\,\mathrm{J}$. The same value is $\tfrac12 k C^{2}$ once the amplitude $C = 0.08923\,\mathrm{m}$ has been found, as in [[#ex-shove]]. The period does not enter the energy.
:::
:::

::: exercise A rod three quarters of a metre long {#exr-rod-length level=2 check="2*pi*sqrt(2*0.9/(3*9.80))"}
A uniform rod of length $L = 0.900\,\mathrm{m}$ swings about a fixed perpendicular axis through one end. Find the period of small oscillations. Take $g = 9.80\,\mathrm{m/s^{2}}$.
::: solution
[[#cor-rod]] applies directly. The mass is not required.

$$
T = 2\pi\sqrt{\frac{2L}{3g}} = 2\pi\sqrt{\frac{2\times 0.900}{3\times 9.80}} = 2\pi\sqrt{\frac{1.80}{29.4}} = 2\pi\sqrt{0.061224} = 1.555\,\mathrm{s}.
$$

The equivalent simple-pendulum length is $2L/3 = 0.600\,\mathrm{m}$, and $2\pi\sqrt{0.600/9.80}$ returns the same $1.555\,\mathrm{s}$. A simple pendulum of length $0.900\,\mathrm{m}$ would be slower: $2\pi\sqrt{0.900/9.80} = 1.905\,\mathrm{s}$.
:::
:::

::: exercise Length of a seconds pendulum {#exr-seconds level=2 check="9.80/pi^2"}
Find the length, in metres, of a simple pendulum whose small-angle period is $T = 2.00\,\mathrm{s}$. Take $g = 9.80\,\mathrm{m/s^{2}}$.
::: solution
Solve [[#eq-pendulum]] for the length:

$$
T = 2\pi\sqrt{\frac{L}{g}} \implies L = g\left(\frac{T}{2\pi}\right)^{2} = \frac{g T^{2}}{4\pi^{2}}.
$$

With $T = 2.00\,\mathrm{s}$ the factor $T^{2}/4$ equals $1$, so $L = g/\pi^{2} = 9.80/\pi^{2} = 0.993\,\mathrm{m}$. This is the seconds pendulum of the application above. The result is a small-angle length: a clock that swings to a large angle is not described by this $L$ at this period.
:::
:::

::: exercise Equal average kinetic and potential energy {#exr-averages level=3}
For $x(t) = C\cos(\omega t - \varphi)$ with constant $C$, $\omega$ and $\varphi$, let $K = \tfrac12 m v^{2}$ and $U = \tfrac12 m\omega^{2} x^{2}$. Prove that the average of $K$ over any interval of length $T = 2\pi/\omega$ equals the average of $U$, and that each average equals half of the total energy $E = \tfrac12 m\omega^{2} C^{2}$.
::: hint
Write $v$ from [[#eq-va]]. The average of $\sin^{2}$ over a whole number of its periods equals the average of $\cos^{2}$, and those two averages sum to $1$.
:::
::: solution
[[#eq-va]] gives $v = -C\omega\sin(\omega t - \varphi)$. Then

$$
K = \tfrac12 m C^{2}\omega^{2}\sin^{2}(\omega t - \varphi), \qquad U = \tfrac12 m\omega^{2} C^{2}\cos^{2}(\omega t - \varphi).
$$

Let $\psi = \omega t - \varphi$. As $t$ runs over an interval of length $T$, the phase $\psi$ runs over an interval of length $2\pi$. For any such interval,

$$
\frac{1}{2\pi}\int_{0}^{2\pi}\sin^{2}\psi\,\dd\psi = \frac{1}{2\pi}\int_{0}^{2\pi}\frac{1 - \cos 2\psi}{2}\,\dd\psi = \tfrac12,
$$

and the same calculation with $\cos^{2}\psi = (1 + \cos 2\psi)/2$ also gives $\tfrac12$. Therefore

$$
\langle K\rangle = \tfrac12 m C^{2}\omega^{2}\cdot\tfrac12 = \tfrac14 m\omega^{2} C^{2}, \qquad \langle U\rangle = \tfrac14 m\omega^{2} C^{2}.
$$

[[#thm-energy]] says $E = \tfrac12 m\omega^{2} C^{2}$, so each average is $E/2$, and $\langle K\rangle = \langle U\rangle$. The equality is about averages. At a turning point $K = 0$ and $U = E$; at equilibrium the values are reversed. Adding the two averages recovers $\langle K + U\rangle = E$, which is consistent with $E$ being constant, but the separate halves are the new content.
:::
:::

::: exercise A disc pivoted at the rim {#exr-disc level=3 check="2*pi*sqrt(3*0.2/(2*9.80))"}
A uniform disc of radius $R = 0.200\,\mathrm{m}$ oscillates in its own plane about a fixed perpendicular axis through a point on its rim. Derive the period for small angles, and evaluate it numerically. Take $g = 9.80\,\mathrm{m/s^{2}}$. The moment of inertia of a uniform disc about its centre, for this axis, is $\tfrac12 MR^{2}$.
::: hint
Use the parallel-axis theorem to move the moment from the centre to the rim, then apply [[#thm-physical]]. The distance $d$ from the pivot to the centre of mass is $R$.
:::
::: solution
The centre of mass is the geometric centre, so $d = R$. Shifting the axis from the centre to a point on the rim, a distance $R$ away, adds $M R^{2}$ to the central moment:

$$
I = \tfrac12 MR^{2} + MR^{2} = \tfrac32 MR^{2}.
$$

[[#eq-physical]] then gives

$$
T = 2\pi\sqrt{\frac{I}{Mgd}} = 2\pi\sqrt{\frac{\tfrac32 MR^{2}}{MgR}} = 2\pi\sqrt{\frac{3R}{2g}}.
$$

The mass cancels. The equivalent length is $I/(Md) = 3R/2 = 0.300\,\mathrm{m}$. With $R = 0.200\,\mathrm{m}$,

$$
T = 2\pi\sqrt{\frac{3\times 0.200}{2\times 9.80}} = 2\pi\sqrt{\frac{0.600}{19.6}} = 2\pi\sqrt{0.03061} = 1.099\,\mathrm{s}.
$$

The small-angle hypothesis is still required: [[#thm-physical]] replaced $\sin\theta$ by $\theta$.
:::
:::
