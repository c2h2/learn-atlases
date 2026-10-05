A spring that you can solve by hand is the right place to test a numerical method. The force is smooth, the period is known, and the energy is a number you can write down before any loop runs. If a method cannot hold that energy, and cannot put the mass where $\cos t$ says it should be, it will not be trustworthy for a planet, a pendulum released from a large angle, or a box of molecules.

This chapter is about stepping Newton's second law forward in time. The equation is an initial-value problem: a state now, and a rule for the rate of change, determine the state a moment later. Three rules are compared on one oscillator. Forward Euler follows the tangent and lets the energy grow. Velocity Verlet, the step used in molecular dynamics, keeps the energy in a thin band. The classical fourth-order Runge–Kutta method spends four force evaluations per step and, on this problem, leaves an error far below anything a plot can show.

The analytical oscillator is [[oscillations/simple-harmonic]]. The energy it conserves is the mechanical energy of [[mechanics/work-energy]]. Fitting, matrices and eigensystems are [[computation/linear-algebra]]. Nothing below depends on a black-box library. Every digit in the table was produced by the step written in the same section, with $m = 1$, $k = 1$, $x(0) = 1$, $v(0) = 0$, and a fixed step $h$.

## The initial-value problem {#ivp}

Newton's second law for one degree of freedom is a second-order equation, $\ddot x = a(x, v, t)$. Computers prefer a first-order system. Take the state to be the pair $(x, v)$ and write

$$
\dot x = v, \qquad \dot v = a(x, v, t).
$$

A solution is a curve in the $(x, v)$ plane. An initial condition is one point on that curve. The numerical task is to produce later points without being given the curve in closed form.

::: definition Initial-value problem {#def-ivp}
An **initial-value problem** on a time interval asks for a function $y(t)$ satisfying $\dot y = f(t, y)$ together with a prescribed value $y(t_0) = y_0$. For a particle on a line, $y$ is the column $(x, v)$ and $f$ is the column $(v, a(x, v, t))$.
:::

The harmonic oscillator used throughout this chapter is

$$
m = 1,\qquad k = 1,\qquad \dot x = v,\qquad \dot v = -x,
$$

with $x(0) = 1$ and $v(0) = 0$. The exact solution is $x(t) = \cos t$ and $v(t) = -\sin t$. At $t = 20$ that is

$$
x(20) = \cos 20 = 0.408082, \qquad v(20) = -\sin 20 = -0.912945,
$$

to six decimals. The period is $2\pi$, so $t = 20$ is a little more than three periods. A method can look acceptable for a tenth of a period and still be useless at $t = 20$.

::: theorem Energy of this oscillator {#thm-energy}
Along the exact solution, the mechanical energy

$$
E = \frac12 v^2 + \frac12 x^2
$$

is constant. With the initial data above, $E = \frac12$ at every $t$.
::: proof
Differentiate the proposed energy along a solution. The chain rule gives

$$
\frac{\mathrm{d}E}{\mathrm{d}t} = v\,\dot v + x\,\dot x = v(-x) + x\,v = 0.
$$

The initial value is $\frac12 (0)^2 + \frac12 (1)^2 = \frac12$. A derivative that vanishes identically leaves that value unchanged.
:::
:::

The constant $\frac12$ is the diagnostic. A numerical method manufactures its own sequence $(x_n, v_n)$, and that sequence has its own energy $E_n = \frac12 v_n^2 + \frac12 x_n^2$. If $E_n$ marches away from $\frac12$, the discrete trajectory is not a small perturbation of the true one. If $E_n$ stays near $\frac12$ while $x_n$ is still far from $\cos t_n$, the method is conserving the wrong thing, or it is conserving energy on a phase error. Both numbers belong in the report: the energy error, and the error in $x$.

::: example Reading the exact energy {#ex-energy}
The same mass is released from rest at $x = 2$. What is $E$, and what is the greatest speed?
::: solution
The energy is $\frac12 (0)^2 + \frac12 (2)^2 = 2$. At the greatest speed the mass is at $x = 0$, so $\frac12 v^2 = 2$ and $\abs{v} = 2$. The initial data of the chapter, $x(0) = 1$, are the special case $E = \frac12$ and a greatest speed of $1$. Changing the amplitude changes the energy and does not change the period, which is why this oscillator is a clean test: the frequency the method must resolve does not depend on how large the error in energy has become.
:::
:::

## Forward Euler {#euler}

The oldest step replaces the derivative by a chord that uses only information at the beginning of the step. On a single equation $\dot y = f(t, y)$,

$$
y_{n+1} = y_n + h\, f(t_n, y_n).
$$

For the oscillator that is two lines. The acceleration is evaluated at the old position, then both position and velocity are updated with the old velocity and that acceleration:

$$
a_n = -x_n, \qquad x_{n+1} = x_n + h\, v_n, \qquad v_{n+1} = v_n + h\, a_n.
$$

::: algorithm Forward Euler for $\ddot x = -x$ {#alg-euler}
Given $x_n$, $v_n$ and a step $h > 0$, set $a_n = -x_n$, then

$$
x_{n+1} = x_n + h v_n, \qquad v_{n+1} = v_n + h a_n.
$$

One evaluation of the force is required. The new acceleration is not used in the step that produced it.
:::

The geometric picture is a tangent. On the graph of a solution, Euler draws the tangent at $t_n$ and follows it for a time $h$, then draws a new tangent and repeats. Each step is exact for a function whose second derivative vanishes. The oscillator's second derivative is $-x$, which is not small, so each step commits an error.

::: proposition Local error of one Euler step {#prop-local}
Suppose the true solution is smooth and the method is started from the true state at $t_n$. The difference between the true state at $t_n + h$ and the Euler state is proportional to $h^2$ as $h \to 0$. Over a fixed time $T$, with $T/h$ steps, the accumulated error is then proportional to $h$.
::: proof
Taylor's theorem with remainder, applied to a component $y$ of the state, gives

$$
y(t_n + h) = y(t_n) + h\,\dot y(t_n) + \frac12 h^2 \ddot y(\tau)
$$

for some $\tau$ between $t_n$ and $t_n + h$. Euler keeps the first two terms and drops the remainder. One step, started from the truth, is therefore wrong by an amount of order $h^2$. That is the **local truncation error**. There are $T/h$ such steps on the way to a fixed time $T$. If the errors were simply added, the total would be of order $h$. The equation can amplify or shrink an earlier error before the next step, so the constant in that statement depends on $f$, but the power of $h$ for this one-step method remains $1$. Euler is a **first-order** method: halving $h$, in the regime where the theory applies, halves the error at time $T$.
:::
:::

"First order" is not a compliment. It says how the error scales once $h$ is already small. It does not say the error is small. On the oscillator, $h$ has to be small compared with the period $2\pi$ before the scaling is visible, and even then the energy may be drifting.

::: example One Euler step by hand {#ex-euler-hand}
Start from $(x, v) = (1, 0)$ with $h = 0.2$. Compute the Euler state and its energy.
::: solution
The acceleration at the start is $a = -1$. The updates are

$$
x_1 = 1 + 0.2 \times 0 = 1, \qquad v_1 = 0 + 0.2 \times (-1) = -0.2.
$$

The numerical energy is

$$
E_1 = \frac12 (-0.2)^2 + \frac12 (1)^2 = 0.52.
$$

The exact energy is $\frac12$, so this single step has already raised it by $0.02$, which is $h^2/2$. The exact state at $t = 0.2$ is $(\cos 0.2,\, -\sin 0.2) \approx (0.9801,\, -0.1987)$. Euler has not moved $x$ at all. The velocity is only slightly too large in magnitude. The position error is the expensive one, and it arrives on the next step, when that wrong velocity is multiplied by $h$.
:::
:::

The energy rise in that example is not a rounding accident. From rest at $x = 1$, the first Euler step always produces $x = 1$ and $v = -h$, hence

$$
E = \frac12 + \frac12 h^2.
$$

Every later step of this particular problem continues to feed a slightly wrong velocity into the next position. Over many periods the discrete orbit spirals outward.

## Velocity Verlet {#verlet}

Molecular dynamics rarely uses forward Euler. The step that replaced it for smooth forces, written here in the velocity form, uses the acceleration at both ends of the interval.

::: algorithm Velocity Verlet for $\ddot x = -x$ {#alg-verlet}
Given $x_n$, $v_n$ and $a_n = -x_n$,

$$
x_{n+1} = x_n + h v_n + \frac12 h^2 a_n,
$$

then $a_{n+1} = -x_{n+1}$ and

$$
v_{n+1} = v_n + \frac12 h\,(a_n + a_{n+1}).
$$

The force is evaluated once per step, at the new position. The half-step average of the old and new accelerations is what updates the velocity.
:::

The position update is the Taylor polynomial of degree $2$, with $\ddot x$ replaced by the acceleration we actually know. The velocity update is the trapezium rule for $\dot v = a$. For a force that depends only on position, the pair is time-reversible: changing the sign of $h$ and of $v$ retraces the steps. Forward Euler is not reversible in that sense. The stored state of Euler does not contain the acceleration that was used, and running the same formulae backwards is a different method.

::: example One Verlet step by hand {#ex-verlet-hand}
Start from $(x, v) = (1, 0)$ with $h = 0.2$ and $a = -1$. Compute the Verlet state and its energy.
::: solution
The new position is

$$
x_1 = 1 + 0.2 \times 0 + \frac12 (0.2)^2 (-1) = 1 - 0.02 = 0.98.
$$

The new acceleration is $-0.98$. The new velocity is

$$
v_1 = 0 + \frac12 (0.2)\bigl(-1 + (-0.98)\bigr) = 0.1 \times (-1.98) = -0.198.
$$

The energy is

$$
E_1 = \frac12 (-0.198)^2 + \frac12 (0.98)^2 = 0.019602 + 0.4802 = 0.499802.
$$

The exact state is about $(0.9801,\, -0.1987)$, and the exact energy is $\frac12$. One Verlet step has moved $x$ by almost the right amount and has changed the energy by $-2.0 \times 10^{-4}$. The Euler step of the same size, in [[#ex-euler-hand]], left $x$ unmoved and raised the energy by $0.02$.
:::
:::

Loup Verlet's 1967 paper used the closely related position recurrence, $x_{n+1} = 2x_n - x_{n-1} + h^2 a_n$, which needs two previous positions and does not store $v$ at all. The velocity form above is the same family for a position-dependent force. Either form is second order: the local error is of order $h^3$, and the error at a fixed time $T$ is of order $h^2$. Halving a sufficiently small step divides that global error by four.

Verlet does not keep $E_n$ exactly equal to $\frac12$. On this oscillator it keeps $E_n$ oscillating inside a band whose width shrinks as $h^2$. That is a stronger practical property than "the error is of order $h^2$", because a method can be second order and still let a slow drift carry the energy out of the band over thousands of periods. The run in the next section shows the band for a few periods. It is not a proof for every force.

## The classical Runge–Kutta step {#rk4}

Runge–Kutta methods build one step out of several Euler-like probes. The classical fourth-order method uses four.

::: algorithm Classical RK4 for the state $(x, v)$ {#alg-rk4}
Write $f(x, v) = (v,\, -x)$. Given the state at step $n$ and a step $h$,

$$
\begin{aligned}
k_1 &= f(x, v), \\
k_2 &= f\bigl(x + \tfrac12 h k_{1x},\; v + \tfrac12 h k_{1v}\bigr), \\
k_3 &= f\bigl(x + \tfrac12 h k_{2x},\; v + \tfrac12 h k_{2v}\bigr), \\
k_4 &= f\bigl(x + h k_{3x},\; v + h k_{3v}\bigr),
\end{aligned}
$$

and advance by the weighted average

$$
(x, v)_{n+1} = (x, v)_n + \frac{h}{6}\bigl(k_1 + 2k_2 + 2k_3 + k_4\bigr).
$$

Each $k_i$ is a pair. The force is evaluated four times.
:::

The weights $\frac16$, $\frac26$, $\frac26$, $\frac16$ are the Simpson weights. They are chosen so that the Taylor expansion of one step matches the Taylor expansion of the true solution through the term in $h^4$. The first unmatched term is of order $h^5$. That is a local error. Over a fixed time the global error is of order $h^4$. Halving $h$ divides a small global error by sixteen, which is why a modest decrease in step size changes an RK4 result from "useful" to "limited by rounding" on a problem as smooth as this one.

RK4 does not know that the system came from a mechanical energy. It treats $(x, v)$ as an arbitrary pair of differential equations. That is its advantage on a problem with friction, a driven pendulum, or a recorded function $a(t)$, and it is why the energy is no longer a structural invariant of the step. On a short integration the fourth-order accuracy makes the energy error tiny anyway. On an integration of millions of periods, a slow drift can still appear, and Verlet, or another symplectic step, is the tool that was built to prevent it.

::: example Counting the force evaluations {#ex-cost}
A run to $t = 20$ uses $h = 0.05$. How many times is the acceleration evaluated by Euler, by Verlet, and by RK4?
::: solution
The number of steps is $20/0.05 = 400$. Euler and Verlet evaluate the force once per step, so each does $400$ evaluations. RK4 evaluates it four times per step, so it does $1600$ evaluations. The extra factor of four is the price of the order. On this oscillator the force is a multiplication by $-1$, and the price is invisible. When the force is a sum over thousands of neighbours, as in [[computation/many-particles]], the factor of four is the whole cost, and a second-order method that needs one evaluation can be the better engineering choice.
:::
:::

## A run to twenty seconds {#run}

The three algorithms were run from $(x, v) = (1, 0)$ to $t = 20$ with the constant step $h = 0.05$, hence $400$ steps. No adaptivity, no rounding beyond ordinary double-precision arithmetic, and no other force. The exact position is $\cos 20 = 0.408082$. The exact energy is $\frac12$.

| Method | $x(20)$ | $E(20)$ | $E - \tfrac12$ | error in $x$ |
| --- | --- | --- | --- | --- |
| Forward Euler | $0.697333$ | $1.357446$ | $+0.857446$ | $+0.289251$ |
| Velocity Verlet | $0.406179$ | $0.499739$ | $-2.609 \times 10^{-4}$ | $-1.903 \times 10^{-3}$ |
| Classical RK4 | $0.408083$ | $0.500000$ | $-4.34 \times 10^{-8}$ | $+9.32 \times 10^{-7}$ |

Read the energy column before the position column. Euler has not merely drifted. The energy at $t = 20$ is $1.357$, nearly three times the true value, and in this run that final value was the largest energy attained. The numerical mass is swinging past $x = \pm 1$ to an amplitude $\sqrt{2E} \approx 1.65$. The position error of $0.29$ is then inevitable: the discrete orbit is a different orbit.

Verlet ends at $E = 0.499739$. During the run the energy stayed between $0.499688$ and $0.500000$. The deficit is a few parts in ten thousand. The position is wrong by about $0.002$, two millimetres on a metre-long amplitude, after three periods. For drawing the motion, that is already a success. For a phase that must stay accurate over thousands of periods, $h = 0.05$ is only a start, because a small phase error accumulates linearly in time even when the amplitude is right.

RK4's position error is about $10^{-6}$, and its energy error is about $4 \times 10^{-8}$. On a graph of $x(t)$ this run is indistinguishable from $\cos t$. The method used four times as many force evaluations as Verlet to get there.

The same three codes at $h = 0.1$, everything else fixed, give position errors

$$
+0.8568 \text{ (Euler)}, \qquad -7.631 \times 10^{-3} \text{ (Verlet)}, \qquad +1.460 \times 10^{-5} \text{ (RK4)}.
$$

Compare with the $h = 0.05$ position errors. Verlet's error dropped by a factor of $4.01$ when $h$ was halved, which is the factor $2^2$ promised by a second-order method. RK4's error dropped by a factor of $15.7$, close to $2^4 = 16$. Euler's error dropped by a factor of about $3$, from $0.857$ to $0.289$, and the energy at $h = 0.1$ finished at $3.66$ rather than $1.36$. The first-order scaling is not clean because the numerical solution has left the neighbourhood in which the local-error argument was made. Euler at $h = 0.1$ is not a small perturbation of $\cos t$. It is a growing spiral. Halving the step improves it, and the theory of order describes the improvement only after the spiral has been tamed.

::: widget oscillator
m: 1
c: 0
k: 1
F: 0
omega: 1
x0: 1
v0: 0
caption: The continuous oscillator m = 1, k = 1, released from rest at x = 1. This figure integrates the differential equation as the analytical spring, not as Euler, Verlet or RK4. Use it to see the motion the table is trying to match: amplitude 1 and period 2π.
:::

::: widget plot
f: cos(x)
x: 0, 20
y: -1.5, 1.5
caption: The exact position x = cos t for the test problem, plotted against t. Euler at h = 0.05 ends near 0.70 rather than at cos 20 ≈ 0.41. Verlet and RK4 end on this curve at the scale of the drawing.
:::

## What the energy is telling you {#diagnostic}

Energy is a diagnostic here because we know the exact constant. In a problem without a closed form, the same idea survives whenever the continuous system has a conserved quantity. Compute that quantity on the numerical state after every step, or after every few dozen steps, and plot it. Three patterns are worth recognising.

A steady climb, as in the Euler column, means the discrete dynamics has a different long-term behaviour from the differential equation. Taking a smaller step reduces the climb per unit time. It does not change the fact that the method is the wrong default for a conservative mechanical system integrated over many periods.

A small oscillation of the energy about the true value, with an amplitude that shrinks when $h$ shrinks, is what Verlet does on this force. The orbit can still have a phase error. Conserved energy plus a wrong angle is a mass going around the correct circle at the wrong angular speed. Report the phase, or the error in $x$ at a stated time, beside the energy.

A very small energy error that nevertheless drifts in one direction, slowly, is the typical RK4 behaviour on a very long run. Over $t = 20$ the drift is invisible next to Verlet's band. Over $t = 10^5$ it need not be. The order of the method and the structural properties of the method are different facts.

There is a fourth pattern that energy will not catch. A bug that replaces $\dot v = -x$ by $\dot v = -v$ dissipates energy, and a decaying plot looks "stable" in the sense that nothing explodes. The exact solution of $\dot v = -v$, $\dot x = v$ is not the oscillator. The diagnostic has to be the right conserved quantity, or a comparison against a known solution, or both. The oscillator earns its place as a test because both are available: $E = \frac12$ and $x = \cos t$.

::: example A lying energy plot {#ex-lying}
A program for this chapter's oscillator prints an energy that stays at $0.50$ to two decimals for a hundred periods, and a position at $t = 2\pi$ equal to $0.2$ instead of $1$. What may you conclude?
::: solution
The amplitude is roughly right, because the energy is right, so the mass is not on Euler's outward spiral. The phase is wrong: after one period the exact position is $1$, and the program says $0.2$, which is $\cos \phi$ for a phase error of about $1.37$ radians. An energy plot alone would have passed the code. The comparison with $\cos t$ fails it. Both columns of the table exist for that reason.
:::
:::

## Step size, order and cost {#step}

The step $h = 0.05$ was a choice, not a law. The period is $2\pi \approx 6.28$, so this $h$ puts about $126$ steps in each period. A common rough aim for a second-order mechanical step is several dozen steps per period; $126$ is comfortable, and the Verlet position error of $2 \times 10^{-3}$ after three periods is the sort of accuracy that aim produces. RK4 can take longer steps for the same accuracy. It was given the same $h$ on purpose, so that the table compares methods rather than comparing a careful user of one method with a careless user of another.

Order is a statement about smooth solutions and small $h$. The force $-x$ is as smooth as a force can be. A collision, a piecewise contact force, or a recorded acceleration with a jump will cut the order down to the smoothness that is actually present. RK4 cannot manufacture four powers of $h$ out of a force that is not four times differentiable.

Rounding eventually stops the gain from a smaller step. RK4 at $h = 0.05$ already has a position error near $10^{-6}$. Another factor of sixteen, from halving $h$ again, would ask for an error near $6 \times 10^{-8}$. Double precision can represent that, but a still smaller step means more operations, and each operation rounds. Past a point that depends on the machine and the formula, a shorter step makes the answer worse. If you need more accuracy than a stable second-order or fourth-order run is giving, the next tools are a higher-order method, a symplectic method with a corrected step, or a change of variables that makes the period cheaper to resolve. They are not a step of $10^{-12}$ in ordinary double precision.

Adaptive steps take a different route. They estimate the local error, often by comparing two methods, and they shorten $h$ where the estimate is large. Nothing in this chapter's table is adaptive. An adaptive code is free to take long steps on the oscillator, because the force is smooth and the time scale never changes. It earns its keep on a comet that moves quickly at perihelion and slowly at aphelion, or on a chemical rate equation with two very different time scales. The conservation question remains. An adaptive method that is not designed around the energy can still drift. Check the diagnostic after the adaptivity has done its work, not only on a constant-step test.

::: example Predicting a smaller Verlet error {#ex-predict}
At $h = 0.05$ the Verlet error in $x(20)$ has magnitude $1.903 \times 10^{-3}$. Estimate the magnitude at $h = 0.025$, assuming the second-order scaling has set in.
::: solution
Halving the step divides a second-order global error by $4$. The estimate is

$$
1.903 \times 10^{-3} / 4 = 4.76 \times 10^{-4}.
$$

The assumption is the content of the comparison already made between $h = 0.1$ and $h = 0.05$, where the factor was $4.01$. It is an estimate, not a measurement. The honest report of a new run is the new run. The estimate is what you use to decide whether that run is worth paying for.
:::
:::

## When the acceleration depends on velocity {#velocity}

The Verlet formulae in [[#alg-verlet]] used $a = -x$, a function of position alone. Friction, a magnetic force, and the Coriolis acceleration all depend on velocity. The position update then needs an acceleration that itself depends on the velocity you are in the middle of computing. One clean remedy is to keep RK4, which never assumed otherwise: $f(x, v)$ may depend on both arguments, and the four probes remain well defined. The cost is the loss of the exact time-reversal property that made the energy band so tight.

A second remedy is a staggered step that treats the velocity-dependent part explicitly or solves a small linear equation inside the step. For linear drag, $\dot v = -x - \gamma v$, the trapezium rule for the drag term produces a linear equation for $v_{n+1}$ that can be solved by hand. The details belong with the force you actually have. The moral is narrower. Do not paste the position-only Verlet formulae onto a velocity-dependent force and hope the algebra still closes. Write $a(x, v)$ honestly, and choose a step that evaluates it at arguments you have already computed, or that you can solve for.

The widget in this chapter has a damping coefficient $c$. With $c = 0$ it is the test problem. With $c > 0$ the exact energy is no longer constant: the drag does negative work. An energy plot that falls is then the truth, not a sick method. The diagnostic has to change with the equation. For linear drag the quantity to watch might be a comparison against the exact damped solution, which is still elementary, rather than a comparison against $\frac12$.

::: warning A growing energy is the method
Forward Euler on this oscillator raises the energy even when every line of the program is the line in [[#alg-euler]] and every operation is exact. The growth is not a sign that you have mistyped $-x$ as $+x$. A mistyped sign oscillates or explodes differently. Check the sign, and also recognise the outward spiral of Euler as the behaviour of a correct implementation. The repair is a different step, or a much smaller $h$, not a search for a bug that is not there.
:::

::: example Damped, and no longer a test of conservation {#ex-damped}
The force is changed to $\dot v = -x - 0.1 v$, released from rest at $x = 1$. After a long time, what should a correct numerical energy do?
::: solution
The drag force $-0.1 v$ opposes the velocity, so its power $-0.1 v^2$ is never positive. The mechanical energy $\frac12 v^2 + \frac12 x^2$ decreases until the mass sits at the origin, where the energy is zero. A numerical energy that falls toward zero is consistent with the equation. A numerical energy that falls and then grows again, or that settles at a nonzero value, is not. The undamped table is the wrong picture for this force, and Verlet's band around $\frac12$ is the wrong target.
:::
:::

## Where the same steps are used {#uses}

The oscillator is a test, not the application. The same three ideas move, with more bookkeeping, to any system you can write as $\dot y = f(t, y)$.

A planet in a fixed inverse-square field is two or three second-order equations. The force depends only on position, the angular momentum and the energy of the exact problem are conserved, and a Verlet-type step is a respectable default. The diagnostic is those two conserved quantities, plus a comparison against the conic section when the orbit is bound. [[mechanics/gravitation]] has the continuous problem.

A rigid body, written with Euler's equations in the body frame, has a state made of angular velocities. The kinetic energy and the squared angular momentum are diagnostics when the torque vanishes. The force evaluation is cheap. Order and reversibility still matter because a simulation of free rotation may run for a long time.

A recorded laboratory acceleration, stored as a table $a(t)$, is not a conservative force. There is no energy to conserve. RK4, or any standard one-step method, is appropriate. The step must not be larger than the time on which the table actually varies, regardless of the formal order.

The many-particle case, with a force summed over neighbours, is [[computation/many-particles]]. The grid case, in which "time" is not the variable being stepped and the unknown is a field, is [[computation/fields-on-grids]]. The habit transfers: know the order, know the cost per step, and monitor a quantity the continuous problem conserves, if it conserves one.

::: history Euler, Runge, Kutta, Verlet
The tangent-line step is Euler's, written up in the first volume of his *Institutionum calculi integralis* (1768). Carl Runge, in 1895, set out a systematic way to raise the order of a one-step method by evaluating the derivative at several interior points. Wilhelm Kutta, in 1901, completed the classical four-evaluation method used in [[#alg-rk4]]. Loup Verlet, in "Computer experiments on classical fluids" (*Physical Review*, 1967), integrated the motion of particles interacting by a short-range force with the second-order recurrence that carries his name. He needed a step that was cheap per particle and that did not slowly heat the fluid. The energy column of the table is that requirement, demonstrated on a problem small enough to solve by hand.
:::

::: summary
- The oscillator $\ddot x = -x$, with $x(0) = 1$ and $v(0) = 0$, has the exact solution $x = \cos t$ and the exact energy $\frac12$. Both are diagnostics.
- Forward Euler uses one force evaluation, is first order, and on this problem raises the energy. At $h = 0.05$ the energy at $t = 20$ is $1.357$ rather than $0.500$.
- Velocity Verlet uses one force evaluation, is second order for a position-dependent force, and keeps the energy in a band a few parts in $10^{4}$ wide at the same step.
- Classical RK4 uses four force evaluations, is fourth order, and at $h = 0.05$ leaves a position error near $10^{-6}$ at $t = 20$.
- Halving $h$ divides a small global error by $2$, $4$ or $16$ for orders $1$, $2$ and $4$. The factor appears in the data only when the numerical solution is still close to the true one.
- A conserved energy does not certify the phase. Compare $x(T)$ with the exact value when you have one.
- A velocity-dependent force is outside the position-only Verlet formulae. RK4 still applies. An energy that falls under drag can be the correct physics.
:::

## Exercises

::: exercise One Euler step {level=1 check="0.52"}
The oscillator $\ddot x = -x$ starts at $(x, v) = (1, 0)$. Take one forward-Euler step of size $h = 0.2$. What is the numerical energy afterwards?
::: hint
Update $v$ with $a = -x$ before you recompute $x$. At this first step, $x$ does not move.
:::
::: solution
$a = -1$, so $x_1 = 1$ and $v_1 = -0.2$. Then $E = \frac12 (0.04) + \frac12 (1) = 0.52$.
:::
:::

::: exercise One Verlet step {level=1 check="0.98"}
The same initial state and the same $h = 0.2$, now with velocity Verlet. What is $x$ after one step?
::: hint
The position update uses $\frac12 h^2 a$ with $a = -1$.
:::
::: solution
$x_1 = 1 + 0 + \frac12 (0.04)(-1) = 0.98$. The velocity update is not required for this question. It gives $v_1 = -0.198$, and the energy $0.499802$, if you want the comparison with [[#ex-verlet-hand]].
:::
:::

::: exercise How many steps {level=1 check="400"}
A constant-step run from $t = 0$ to $t = 20$ uses $h = 0.05$. How many steps is that?
::: solution
$20/0.05 = 400$. Euler and Verlet evaluate the force $400$ times. RK4 evaluates it $1600$ times.
:::
:::

::: exercise Exact checkpoint {level=1 check="0.5"}
Without running a numerical method, state the exact energy of the chapter's initial-value problem, and the exact position at $t = 2\pi$.
::: solution
$E = \frac12$ for all $t$, from [[#thm-energy]]. At $t = 2\pi$ one period has elapsed, $\cos 2\pi = 1$ and $\sin 2\pi = 0$, so $(x, v) = (1, 0)$ again.
:::
:::

::: exercise Order from the table {level=2}
The Verlet position error at $t = 20$ has magnitude $7.631 \times 10^{-3}$ when $h = 0.1$ and $1.903 \times 10^{-3}$ when $h = 0.05$. Which order is consistent with that ratio, and what magnitude do you expect at $h = 0.025$?
::: hint
Divide the two errors. Compare the quotient with $2$, $4$ and $16$.
:::
::: solution
The ratio is $7.631 \times 10^{-3} / 1.903 \times 10^{-3} = 4.01$, which is $2^2$ and not $2^1$ or $2^4$. The observed order is $2$. Another halving should divide the error by about $4$ again, giving a magnitude near $4.76 \times 10^{-4}$.
:::
:::

::: exercise Euler is not a small perturbation {level=2}
At $h = 0.1$ the forward-Euler energy at $t = 20$ is $3.658$. What amplitude of a true oscillator has that energy, and why does the first-order scaling not describe this run well?
::: solution
A true oscillator with energy $E$ and $k = m = 1$ has amplitude $\sqrt{2E}$. Here $\sqrt{2 \times 3.658} = \sqrt{7.316} \approx 2.70$, against a true amplitude of $1$. The numerical trajectory is a different orbit, several times more energetic. The Taylor argument that produces "global error proportional to $h$" expands about the true solution. Once the numerical state has left a neighbourhood of that solution, halving $h$ still helps, but the factor need not be exactly $2$ until $h$ is small enough that the energy stops running away. In the chapter's comparison, $h = 0.1 \to 0.05$ reduced Euler's position error by a factor of about $3$, not $2$.
:::
:::

::: exercise Phase versus amplitude {level=2}
A Verlet integration reports $E = 0.500$ to three decimals at every output time, and reports $x(2\pi) = 0$. The exact position is $1$. Describe the error in physical language. Is the amplitude acceptable?
::: solution
Energy $0.500$ means amplitude $1$, so the amplitude is acceptable. Position $0$ instead of $1$ at the end of a period means the numerical phase is wrong by about a quarter of a period: the mass is at the origin when it should be at the release point. Energy conservation did not detect a timing error. This is the situation in [[#ex-lying]], with a cleaner wrong number.
:::
:::

::: exercise A velocity-dependent force {level=3}
The acceleration is changed to $a = -x - v$. Explain why the position-only recipe "compute $a_{n+1} = -x_{n+1}$ and average the accelerations" is no longer a closed step, and name a method from this chapter that still applies without a change in its formula.
::: solution
After the position update, $x_{n+1}$ is known, but $a_{n+1} = -x_{n+1} - v_{n+1}$ still contains the unknown new velocity. Averaging $a_n$ and $a_{n+1}$ to obtain $v_{n+1}$ is then an equation for $v_{n+1}$, not a direct substitution. The chapter's position-only Verlet listing does not solve that equation. Classical RK4 never divides the acceleration into "known from $x$" and "known from $v$". Its four evaluations of $f(x, v) = (v,\, -x - v)$ are defined as soon as a probe state is proposed, so the same [[#alg-rk4]] applies with the new $f$.
:::
:::

::: exercise Cost of a neighbour sum {level=3}
A molecular-dynamics force takes $200$ times as long to evaluate as the rest of a Verlet or RK4 step. You need a position error of about $10^{-3}$ at a fixed time, and a pilot run shows that Verlet reaches it at some $h$, while RK4 reaches it at $4h$. Which method does fewer force evaluations, and by what factor?
::: hint
Global error scales as $h^2$ for Verlet and as $h^4$ for RK4. The pilot has already converted that scaling into a step size. Count evaluations per unit time.
:::
::: solution
Per unit time, Verlet takes $1/h$ force evaluations and RK4 takes $4/(4h) = 1/h$ as well, if RK4's step really is four times longer. The two methods then use the same number of force evaluations. The factor is $1$. The usual slogan "RK4 costs four times as much" assumes the same $h$. Here the order has been spent on a longer step, and the four probes are paid for by taking one quarter as many steps. If the pilot had said that RK4 could only stretch the step by a factor of $2$, RK4 would use $4/(2h) = 2/h$ evaluations per unit time and Verlet would be twice as cheap. The pilot numbers are part of the answer. Order alone does not decide the cost.
:::
:::

::: quiz
A correct forward-Euler integration of $\ddot x = -x$, started from rest at $x = 1$ with a moderate step such as $h = 0.05$, is watched through the energy $E = \frac12 v^2 + \frac12 x^2$. What does the energy do?
- [ ] It stays at $\frac12$ up to rounding error, because the force is $-x$ and every line of the method matches the listing in the chapter.
- [ ] It falls steadily toward $0$, because any numerical method dissipates energy.
- [x] It grows, and the numerical oscillation becomes larger than amplitude $1$. The growth is the method, not a mistyped sign.
- [ ] It oscillates in a band of width proportional to $h^2$ about $\frac12$, which is the Verlet behaviour, not the Euler behaviour.
::: solution
The table at $h = 0.05$ ends with Euler's energy at $1.357$, and that was the maximum during the run. The amplitude of a true oscillator with that energy is greater than $1$. A falling energy would describe drag, which this force does not have. A tight band about $\frac12$ is what velocity Verlet did in the same table. Matching the printed Euler formulae does not cancel the truncation error that pushes the discrete orbit outward.
:::
:::
