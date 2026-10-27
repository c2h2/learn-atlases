A pendulum with friction, pushed by a periodic torque, is about as simple as a mechanical system can be. Its equation of motion has three terms and a drive, every term is known exactly, and the solution is completely determined by the initial angle and angular velocity. Yet for some strengths of the drive its motion never settles into a repeating pattern, and two runs that start from angles differing by a hundred-millionth of a radian disagree completely after thirty swings. Nothing random has been added. The unpredictability is produced by the equation itself.

This is **deterministic chaos**: bounded, aperiodic motion with sensitive dependence on initial conditions, in a system with no noise. It is not a curiosity. It limits weather forecasting to about two weeks, it governs the long-term behaviour of the asteroid belt, it appears in lasers, chemical reactions, heart rhythms and dripping taps, and it was discovered in the oldest problem of analytical mechanics, the motion of three gravitating bodies.

The previous chapters were about systems that can be solved: by reduction to quadratures ([[analytical-mechanics/central-forces]]), by normal modes ([[analytical-mechanics/small-oscillations]]), or by action–angle variables ([[analytical-mechanics/hamiltonian]]). This chapter is about what typical nonlinear systems do instead. We start with the geometry of fixed points, explain why at least three phase-space dimensions are needed for chaos, follow the driven pendulum into chaos numerically, define and compute the **Lyapunov exponent**, and then study the simplest chaotic system of all, the logistic map, where the route to chaos has universal numbers attached to it. The [Maths Atlas chapter on nonlinear systems](/learn/maths/lesson.php?c=ode&l=nonlinear-systems) covers the phase-plane techniques used in the first section in more detail.

## Fixed points and the phase plane {#fixed-points}

Write a system of first-order equations as $\dot{\mathbf{x}} = \mathbf{F}(\mathbf{x})$, with $\mathbf{x}$ in an $N$-dimensional phase space. Hamilton's equations are one example, with $N = 2n$; a damped pendulum, $\dot\theta = \omega$, $\dot\omega = -\gamma\omega - \omega_0^2\sin\theta$, is another, with $N = 2$.

::: definition Fixed point and its linearisation {#def-fixed-point}
A **fixed point** of $\dot{\mathbf{x}} = \mathbf{F}(\mathbf{x})$ is a point $\mathbf{x}^*$ with $\mathbf{F}(\mathbf{x}^*) = 0$. Its **Jacobian** is the matrix $A_{ab} = \partial F_a/\partial x_b$ evaluated at $\mathbf{x}^*$, and the **linearised system** is $\dot{\boldsymbol\xi} = A\boldsymbol\xi$ for the displacement $\boldsymbol\xi = \mathbf{x} - \mathbf{x}^*$.
:::

In two dimensions the linearised behaviour is classified by the eigenvalues $\lambda_{1,2}$ of $A$, the roots of $\lambda^2 - (\tr A)\lambda + \det A = 0$:

- $\det A < 0$: real eigenvalues of opposite sign, a **saddle**, unstable;
- $\det A > 0$ and $\tr A < 0$: both eigenvalues with negative real part, a stable **node** (real) or **spiral** (complex);
- $\det A > 0$ and $\tr A > 0$: an unstable node or spiral;
- $\det A > 0$ and $\tr A = 0$: purely imaginary eigenvalues, a **centre** of the linearisation.

The Hartman–Grobman theorem guarantees that the nonlinear flow near a fixed point looks like its linearisation whenever no eigenvalue has zero real part. Centres are the exception: a small nonlinearity can turn a linear centre into a slow spiral either way, unless something such as a conserved energy forbids it.

::: example Fixed points of the damped pendulum {#ex-damped-fixed}
Classify the fixed points of $\ddot\theta + \gamma\dot\theta + \omega_0^2\sin\theta = 0$ with $0 < \gamma < 2\omega_0$.
::: solution
As a first-order system, $\mathbf{x} = (\theta, \omega)$ and $\mathbf{F} = (\omega, -\gamma\omega - \omega_0^2\sin\theta)$. Fixed points need $\omega = 0$ and $\sin\theta = 0$: the hanging position $\theta = 0$ and the inverted position $\theta = \pi$ (and their copies shifted by $2\pi$). The Jacobian is

$$
A = \begin{pmatrix}0 & 1\\ -\omega_0^2\cos\theta & -\gamma\end{pmatrix}.
$$

At $\theta = 0$: $\tr A = -\gamma < 0$ and $\det A = \omega_0^2 > 0$. The eigenvalues are $\lambda = \frac12\bigl(-\gamma \pm \sqrt{\gamma^2 - 4\omega_0^2}\bigr)$, complex because $\gamma < 2\omega_0$, with negative real part: a stable spiral. Every nearby trajectory spirals in, the phase-space picture of a decaying swing.

At $\theta = \pi$: $\det A = -\omega_0^2 < 0$, a saddle, with eigenvalues $\frac12\bigl(-\gamma \pm \sqrt{\gamma^2 + 4\omega_0^2}\bigr)$, one positive and one negative. There is exactly one direction from which the pendulum can approach the inverted position, and any deviation from it grows.

Without friction, $\gamma = 0$, the hanging position is a centre of the linearisation, and the conserved energy of [[analytical-mechanics/hamiltonian#ex-pendulum-phase]] makes it a true centre, surrounded by closed orbits. With friction, the trace $-\gamma$ is the divergence of $\mathbf{F}$, and phase-space areas shrink at the rate $e^{-\gamma t}$, so closed orbits are impossible and everything with less than the separatrix energy ends at the bottom.
:::
:::

### Why two dimensions are not enough

In a two-dimensional autonomous system, trajectories cannot cross, because the solution through each point is unique. A trajectory confined to a bounded region of the plane is therefore severely restricted: it cannot wander forever in a complicated way without eventually crowding into itself.

::: theorem Poincaré–Bendixson theorem {#thm-pb}
Let $\dot{\mathbf{x}} = \mathbf{F}(\mathbf{x})$ be a continuously differentiable system in the plane, and let a trajectory remain for all $t \ge 0$ in a closed bounded region $D$ that contains no fixed point. Then the trajectory approaches a closed orbit (a periodic solution) as $t \to \infty$.
:::

::: proof {collapsed}
Sketch. Take a short segment transverse to the flow near a limit point of the trajectory. Successive crossings of the segment are ordered monotonically along it, because the trajectory and the segment together bound a region the trajectory cannot re-enter, by the Jordan curve theorem and uniqueness. A monotone sequence on a segment converges, and the limit is a point whose trajectory is closed. The full proof, and the version that allows fixed points in $D$, is in Strogatz, *Nonlinear Dynamics and Chaos*, §7.3, or Hirsch, Smale and Devaney, Chapter 10.
:::

So in the plane, bounded motion ends at fixed points, at closed orbits, or on chains of fixed points joined by trajectories. There is no room for chaos. An autonomous system needs at least three dimensions. A *driven* system with one degree of freedom has them: $(\theta, \omega)$ and the phase of the drive, $\psi = \omega_dt$ modulo $2\pi$, which can be treated as a third variable with $\dot\psi = \omega_d$. That is the driven pendulum.

## The driven damped pendulum {#driven}

We follow Taylor's *Classical Mechanics*, Chapter 12, and write the equation of motion as

$$
\ddot\phi + 2\beta\dot\phi + \omega_0^2\sin\phi = \gamma\,\omega_0^2\cos\omega t,
$$ {#eq-ddp}

where $\gamma$ is the drive strength measured relative to the weight: $\gamma = 1$ means a driving torque equal to the maximum gravitational torque. Choose units in which the drive period is $1$, so $\omega = 2\pi$, and take $\omega_0 = 1.5\omega$ and $\beta = \omega_0/4$. For small $\gamma$, $\sin\phi \approx \phi$ and [[#eq-ddp]] is the linear driven oscillator of [[oscillations/resonance]]: after a transient, the motion settles to a steady oscillation at the drive frequency, the same for every initial condition.

::: widget oscillator
m: 1
c: 0.6
k: 4
F: 1
omega: 1.5
x0: 1.5
v0: 0
caption: The linear driven oscillator, the small-amplitude limit of the pendulum. Play the motion and watch the transient from the release at $x_0 = 1.5$ die away into a steady oscillation at the drive frequency. Change $x_0$ or $v_0$ and run again: the steady state is the same, because a linear system has only one. Increasing $F$ only scales the steady amplitude. None of the behaviour in the rest of this section can occur in this figure.
:::

The pendulum is not linear once $\phi$ is no longer small. The question is what the steady state looks like as $\gamma$ is increased past $1$. The motion is computed numerically with the fourth-order Runge–Kutta method ([numerical ODEs in the Maths Atlas](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes)), with $1000$ steps per drive period, from $\phi(0) = -\pi/2$, $\dot\phi(0) = 0$.

### Poincaré sections

Watching $\phi(t)$ continuously, it is hard to see whether a motion repeats every one, two or four periods. It is much easier to look only once per drive period.

::: definition Poincaré section {#def-poincare}
For a system driven with period $T$, the **Poincaré section** (or stroboscopic map) is the sequence of states $\mathbf{x}(t_0 + kT)$, $k = 0, 1, 2, \dots$, recorded at the same phase of the drive. More generally, for an autonomous flow, a Poincaré section records the successive crossings of a chosen surface in phase space in one direction.
:::

A motion that repeats with the period of the drive appears in the section as a single point. A motion with period $2T$ appears as two points visited alternately, period $4T$ as four points. A chaotic motion fills out a complicated set that never repeats. The listing records $\phi$, reduced to $(-\pi, \pi]$, at the last eight integer times of a 300-period run, by which time transients have died. It then estimates the largest Lyapunov exponent, defined in the next section.

```python
import math
w = 2*math.pi; w0 = 1.5*w; beta = w0/4      # drive period 1, as in Taylor ch. 12

def f(t, y, g):
    phi, om = y
    return (om, -2*beta*om - w0*w0*math.sin(phi) + g*w0*w0*math.cos(w*t))

def rk4(t, y, h, g):
    k1 = f(t, y, g)
    k2 = f(t + h/2, (y[0] + h/2*k1[0], y[1] + h/2*k1[1]), g)
    k3 = f(t + h/2, (y[0] + h/2*k2[0], y[1] + h/2*k2[1]), g)
    k4 = f(t + h, (y[0] + h*k3[0], y[1] + h*k3[1]), g)
    return (y[0] + h/6*(k1[0] + 2*k2[0] + 2*k3[0] + k4[0]),
            y[1] + h/6*(k1[1] + 2*k2[1] + 2*k3[1] + k4[1]))

N = 1000                         # steps per drive period, h = 0.001
def wrap(x): return (x + math.pi) % (2*math.pi) - math.pi

def section(g, periods=300, keep=8):
    t, y, out = 0.0, (-math.pi/2, 0.0), []
    for n in range(periods):
        for _ in range(N):
            y = rk4(t, y, 1.0/N, g); t += 1.0/N
        if n >= periods - keep:
            out.append(round(wrap(y[0]), 4))
    return out

def lyapunov(g, periods=400, d0=1e-8):
    t, y = 0.0, (-math.pi/2, 0.0)
    for _ in range(100*N):           # discard 100 periods of transient
        y = rk4(t, y, 1.0/N, g); t += 1.0/N
    z = (y[0] + d0, y[1]); s = 0.0
    for n in range(periods):
        for _ in range(N):
            y = rk4(t, y, 1.0/N, g); z = rk4(t, z, 1.0/N, g); t += 1.0/N
        d = math.hypot(z[0] - y[0], (z[1] - y[1])/w0)
        s += math.log(d/d0)
        z = (y[0] + (z[0] - y[0])*d0/d, y[1] + (z[1] - y[1])*d0/d)   # renormalise
    return s/periods

for g in (0.2, 1.06, 1.07, 1.081, 1.0826, 1.105):
    print("gamma = %.4f  phi mod 2pi at t = 293..300:" % g, section(g))
for g in (1.06, 1.105):
    print("gamma = %.4f  Lyapunov exponent = %.3f per drive period" % (g, lyapunov(g)))
```

Output:

```
gamma = 0.2000  phi mod 2pi at t = 293..300: [0.2673, 0.2673, 0.2673, 0.2673, 0.2673, 0.2673, 0.2673, 0.2673]
gamma = 1.0600  phi mod 2pi at t = 293..300: [-0.2466, -0.2466, -0.2466, -0.2466, -0.2466, -0.2466, -0.2466, -0.2466]
gamma = 1.0700  phi mod 2pi at t = 293..300: [-0.1467, -0.3202, -0.1467, -0.3202, -0.1467, -0.3202, -0.1467, -0.3202]
gamma = 1.0810  phi mod 2pi at t = 293..300: [-0.3539, -0.0856, -0.505, -0.1091, -0.3539, -0.0856, -0.505, -0.1091]
gamma = 1.0826  phi mod 2pi at t = 293..300: [-0.3666, -0.0787, -0.5485, -0.1166, -0.3049, -0.0828, -0.5125, -0.1035]
gamma = 1.1050  phi mod 2pi at t = 293..300: [-3.0088, -1.152, -0.4771, -0.0335, -1.8418, -2.5391, -2.799, -2.0823]
gamma = 1.0600  Lyapunov exponent = -0.255 per drive period
gamma = 1.1050  Lyapunov exponent = 0.711 per drive period
```

::: example Reading the Poincaré sections {#ex-sections}
From the output, identify the period of the steady motion for each drive strength, and describe what happens between $\gamma = 1.06$ and $\gamma = 1.105$.
::: solution
At $\gamma = 0.2$ the section is a single repeated value: the motion has the drive period, a small nearly sinusoidal oscillation as in the linear figure. At $\gamma = 1.06$ it is still a single value, so the period is still $1$, though the oscillation is now large and far from sinusoidal.

At $\gamma = 1.07$ two values alternate, $-0.1467$ and $-0.3202$: the motion repeats only every *two* drive periods. Successive swings differ slightly, and the pattern takes two cycles to repeat. This is a **period-doubling bifurcation**, which has happened somewhere between $1.06$ and $1.07$.

At $\gamma = 1.081$ four values repeat, $-0.3539, -0.0856, -0.505, -0.1091$: period $4$. Each of the two values at $1.07$ has split in two. At $\gamma = 1.0826$ the eight values are all distinct; a longer run shows they then repeat, so the period is $8$. The intervals of $\gamma$ between successive doublings are shrinking fast, from more than $0.006$ to less than $0.002$.

At $\gamma = 1.105$ there is no repetition at all. The values are scattered across the whole circle, including $-3.0088$, close to the inverted position: the pendulum now sometimes goes over the top. The motion is bounded, and the equation is periodic, but the response is not. The positive Lyapunov exponent confirms that this is chaos, not a long period.
:::
:::

The sequence of period doublings $1 \to 2 \to 4 \to 8 \to \dots$, with ever shorter intervals between them, accumulating at a finite drive strength beyond which the motion is chaotic, is called the **period-doubling cascade**. It is one of the standard routes to chaos, and the same cascade, with the same ratios, appears in the logistic map below.

::: warning Chaos is not a numerical artefact, and not every irregular output is chaos
A non-repeating Poincaré section could in principle come from a long transient, an enormous period, or a badly converged integration. The tests are: run longer and discard more transient; halve the step size and check that the section, as a set, does not change; and compute the Lyapunov exponent. For the listing, rerunning with $2000$ steps per period changes the individual late values of $\phi$ at $\gamma = 1.105$ completely (sensitive dependence guarantees that), but not the scattered character of the set, and the exponent comes out as $0.712$ instead of $0.711$. At $\gamma = 1.07$ and $1.081$ the section values agree to all four printed digits.
:::

## Sensitive dependence and Lyapunov exponents {#lyapunov}

The defining feature of chaos is that nearby trajectories separate exponentially fast. Let $\mathbf{x}(t)$ be a trajectory and $\mathbf{x}(t) + \boldsymbol\delta(t)$ a neighbouring one, with $\abs{\boldsymbol\delta(0)} = \delta_0$ very small.

::: definition Lyapunov exponent {#def-lyapunov}
The **largest Lyapunov exponent** of a trajectory is

$$
\lambda = \lim_{t\to\infty}\lim_{\delta_0\to 0}\frac1t\ln\frac{\abs{\boldsymbol\delta(t)}}{\delta_0},
$$ {#eq-lyapunov}

when the limits exist. A bounded motion with $\lambda > 0$ is **chaotic**. If $\lambda < 0$, nearby trajectories converge and the motion is attracted to a stable fixed point or periodic orbit.
:::

The inner limit $\delta_0 \to 0$ means that $\boldsymbol\delta$ evolves by the linearised equations along the trajectory. In practice one cannot follow an exponentially growing separation for long, because it soon becomes as large as the attractor and stops growing. The listing therefore uses the standard renormalisation method due to Benettin and co-workers: start the second trajectory at distance $d_0 = 10^{-8}$, integrate both for one drive period, record $\ln(d/d_0)$, rescale the separation back to $d_0$ along its current direction, and repeat. The average of the logarithms is the exponent per period. The separation is measured as $\sqrt{\Delta\phi^2 + (\Delta\dot\phi/\omega_0)^2}$, so that both components are dimensionless; the exponent does not depend on that choice.

The result at $\gamma = 1.105$ is $\lambda = 0.711$ per drive period, a factor $e^{0.711} = 2.04$ per cycle. An initial uncertainty doubles every period. At $\gamma = 1.06$, $\lambda = -0.255$: perturbations shrink by $e^{-0.255} = 0.77$ per cycle and the motion returns to its periodic attractor.

::: proposition The predictability horizon {#prop-horizon}
If a chaotic motion has Lyapunov exponent $\lambda > 0$ and the initial state is known to accuracy $\delta_0$, then the prediction error reaches a tolerance $\Delta$ after a time of approximately

$$
t_{\mathrm{p}} = \frac{1}{\lambda}\ln\frac{\Delta}{\delta_0}.
$$ {#eq-horizon}
:::

::: proof
For $\delta_0$ small and as long as the separation is small compared with the size of the attractor, $\abs{\boldsymbol\delta(t)} \approx \delta_0e^{\lambda t}$ by [[#eq-lyapunov]]. Setting this equal to $\Delta$ and solving for $t$ gives the formula.
:::

The logarithm is the cruel part. For the pendulum at $\gamma = 1.105$, an initial angle known to $10^{-8}\,\mathrm{rad}$ gives a forecast good to $1\,\mathrm{rad}$ for $\ln(10^8)/0.711 \approx 26$ periods. Improving the measurement a millionfold, to $10^{-14}$, extends the forecast only to $45$ periods. Lorenz's estimate for the atmosphere, an error-doubling time of a few days, is why weather forecasts lose their skill after one or two weeks however good the observations become.

::: proposition Lyapunov exponents and dissipation {#prop-lyapunov-sum}
For a flow in an $N$-dimensional phase space, the $N$ Lyapunov exponents $\lambda_1 \ge \dots \ge \lambda_N$ of a trajectory satisfy $\sum_a\lambda_a = \langle\nabla\cdot\mathbf{F}\rangle$, the time average of the divergence along the trajectory. For a Hamiltonian system the sum is zero. For the driven pendulum [[#eq-ddp]], in the $(\phi, \dot\phi)$ plane of the stroboscopic map, the two exponents sum to $-2\beta$ per unit time.
:::

::: proof {collapsed}
Sketch. The exponents measure the average logarithmic growth rates of the principal axes of a small ball of initial conditions, so their sum is the average logarithmic growth rate of its volume. By the computation in the proof of [[analytical-mechanics/hamiltonian#thm-liouville]], a volume element evolves by $\dot J = (\nabla\cdot\mathbf{F})J$, so $\frac1t\ln J(t)$ is the time average of the divergence. For a Hamiltonian flow the divergence vanishes. For [[#eq-ddp]] in the variables $(\phi, \dot\phi)$, $\nabla\cdot\mathbf{F} = \partial_\phi\dot\phi + \partial_{\dot\phi}(-2\beta\dot\phi + \cdots) = -2\beta$, a constant. The precise definition of all $N$ exponents, and the theorem that they exist for almost every trajectory, is Oseledets' multiplicative ergodic theorem; see Ott, *Chaos in Dynamical Systems*, Chapter 4.
:::

So a dissipative chaotic system stretches in one direction and contracts more strongly in another. The set it is attracted to has zero area in the Poincaré section but is not a curve or a set of points: it is a **strange attractor**, a fractal, infinitely layered by repeated stretching and folding.

::: quiz
Two weather models differ only in the precision of the initial temperature field: one knows it to $0.1\,\mathrm{K}$, the other to $0.001\,\mathrm{K}$. If errors grow exponentially with a doubling time of two days, roughly how much longer is the second model's useful forecast?
- [ ] One hundred times longer.
- [ ] About twice as long.
- [x] About thirteen days longer, whatever the original length.
- [ ] No longer, because chaos makes every forecast useless immediately.
::: solution
By [[#eq-horizon]], the horizon is $(1/\lambda)\ln(\Delta/\delta_0)$. Reducing $\delta_0$ by a factor of $100$ adds $(1/\lambda)\ln 100$. With a doubling time of two days, $\lambda = \ln 2/(2\,\mathrm{days})$, so the gain is $2\ln 100/\ln 2 \approx 13.3$ days. A hundredfold improvement buys a fixed extra time, not a hundredfold longer forecast.
:::
:::

## The logistic map {#logistic}

The Poincaré section turned a continuous flow into a map: a rule $\mathbf{x}_{k+1} = \mathbf{G}(\mathbf{x}_k)$ for the state at the next drive period. Maps are far quicker to explore than flows, and a one-dimensional map already shows the whole period-doubling route to chaos.

::: definition The logistic map {#def-logistic}
For a parameter $0 \le r \le 4$, the **logistic map** is $x_{k+1} = f(x_k)$ with

$$
f(x) = rx(1 - x), \qquad 0 \le x \le 1.
$$ {#eq-logistic}
:::

It was popularised as a model of a population with limited resources: $rx$ is growth, $(1 - x)$ is the crowding that limits it. Its interest for physics is that it is the simplest smooth map with a single hump, and many of its properties are shared by every such map, including the Poincaré maps of strongly dissipative flows.

A **fixed point** of a map is a solution of $f(x^*) = x^*$. Its stability is decided by the derivative.

::: theorem Stability of a fixed point of a map {#thm-map-stability}
Let $f$ be continuously differentiable with fixed point $x^*$. If $\abs{f'(x^*)} < 1$, every orbit starting close enough to $x^*$ converges to it. If $\abs{f'(x^*)} > 1$, every orbit starting close to (but not at) $x^*$ eventually moves away from it.
:::

::: proof
Suppose $\abs{f'(x^*)} < 1$ and choose $c$ with $\abs{f'(x^*)} < c < 1$. By continuity of $f'$ there is an interval $I = [x^* - \eps, x^* + \eps]$ on which $\abs{f'} \le c$. For $x$ in $I$, the mean value theorem gives $\abs{f(x) - x^*} = \abs{f(x) - f(x^*)} \le c\abs{x - x^*}$. So $f(x)$ is again in $I$, and by induction $\abs{x_k - x^*} \le c^k\abs{x_0 - x^*} \to 0$. If instead $\abs{f'(x^*)} > 1$, choose $1 < c < \abs{f'(x^*)}$ and an interval on which $\abs{f'} \ge c$; while the orbit stays in that interval, $\abs{x_k - x^*} \ge c^k\abs{x_0 - x^*}$, which grows, so the orbit must leave.
:::

The logistic map has fixed points $x^* = 0$ and $x^* = 1 - 1/r$. Since $f'(x) = r(1 - 2x)$, $f'(0) = r$ and $f'(1 - 1/r) = 2 - r$. For $1 < r < 3$ the non-zero fixed point is stable, and every population in $(0, 1)$ settles to it. At $r = 3$, $f'(x^*) = -1$, and the fixed point loses stability by an oscillation of growing amplitude that settles into a cycle of period two.

::: example The period-2 cycle {#ex-two-cycle}
Find the period-2 cycle of the logistic map for $r > 3$, and evaluate its two points for $r = 3.2$.
::: solution
A period-2 point satisfies $f(f(x)) = x$ but is not a fixed point. The equation $f(f(x)) - x = 0$ is a quartic, and it must contain the fixed points as roots, so it is divisible by $x(x - 1 + 1/r)$, that is, by $f(x) - x = -rx(x - 1 + 1/r)$. Carrying out the division (or noting that a 2-cycle $p, q$ has $q = rp(1 - p)$ and $p = rq(1 - q)$, and subtracting these) leaves the quadratic

$$
r^2x^2 - r(r + 1)x + (r + 1) = 0, \qquad x = \frac{(r + 1) \pm\sqrt{(r + 1)(r - 3)}}{2r}.
$$

The roots are real only for $r \ge 3$: the 2-cycle is born exactly where the fixed point loses stability. At $r = 3.2$, $\sqrt{(4.2)(0.2)} = \sqrt{0.84} = 0.9165$, and

$$
p = \frac{4.2 + 0.9165}{6.4} = 0.7995, \qquad q = \frac{4.2 - 0.9165}{6.4} = 0.5130.
$$

Check: $3.2(0.7995)(0.2005) = 0.5130$ and $3.2(0.5130)(0.4870) = 0.7995$. A population iterated at $r = 3.2$ ends up alternating between these two values year after year. By [[#exr-two-cycle-stability]], the cycle is stable for $3 < r < 1 + \sqrt6 = 3.4495$, after which it doubles again.
:::
:::

::: widget plot
f: r*x*(1-x); r*(r*x*(1-x))*(1-r*x*(1-x)); x
x: 0, 1
y: 0, 1
sliders: r=2.8:2.5:4:0.01
labels: f(x); f(f(x)); y = x
caption: The logistic map $f$, its second iterate $f\circ f$, and the diagonal. Fixed points of $f$ are where the first curve crosses the diagonal; period-2 points are extra crossings of the second curve. At $r = 2.8$ the second iterate meets the diagonal only at the fixed points. Drag $r$ past $3$ and watch the slope of $f\circ f$ at the fixed point steepen past $1$, after which two new crossings appear on either side: the 2-cycle of the example. At $r = 3.2$ they sit near $0.513$ and $0.799$. At $r = 4$ the hump of $f$ reaches $1$ and the map is fully chaotic.
:::

Increasing $r$ further repeats the story. The 2-cycle loses stability at $r_2 = 1 + \sqrt6 = 3.449490$ and is replaced by a stable 4-cycle; that gives way to an 8-cycle at $r_3 = 3.544090$, then a 16-cycle at $r_4 = 3.564407$, a 32-cycle at $r_5 = 3.568759$, and so on. The bifurcation points accumulate at $r_\infty = 3.569946$, beyond which most values of $r$ give chaotic orbits, interspersed with periodic **windows**, the largest being a stable 3-cycle near $r = 3.83$.

::: theorem Feigenbaum's universality {#thm-feigenbaum}
For the logistic map, and for every smooth one-parameter family of maps of an interval with a single quadratic maximum that undergoes a period-doubling cascade, the parameter values $r_n$ of successive period doublings satisfy

$$
\lim_{n\to\infty}\frac{r_n - r_{n-1}}{r_{n+1} - r_n} = \delta = 4.669201609\ldots,
$$

the same constant for every such family. A second universal constant, $\alpha = 2.502907875\ldots$, gives the ratio of successive sizes of the cycle's spatial structure.
:::

::: proof {collapsed}
The statement is a theorem: Feigenbaum conjectured it in 1978 from numerical experiments and a renormalisation argument, and it was proved by Oscar Lanford in 1982, with a computer-assisted proof of the existence of the fixed point of the renormalisation operator. The idea is that the second iterate $f\circ f$, near its maximum and rescaled by $-\alpha$, looks like a new single-humped map with a larger parameter; repeating the operation converges to a universal function, and $\delta$ is the unstable eigenvalue of the operation. See Strogatz, §10.7, for an accessible account, and Collet and Eckmann, *Iterated Maps on the Interval as Dynamical Systems* (1980), for the mathematics.
:::

Universality is what makes the logistic map physically relevant. The bifurcation ratios of the driven pendulum's cascade, of a dripping tap, of convection in liquid helium in the experiments of Libchaber and Maurer (1980), all tend to the same $4.669$, because their Poincaré maps, after strong dissipation has flattened them onto nearly one-dimensional curves, are single-humped maps.

### The Lyapunov exponent of a map

For a one-dimensional map the separation of nearby orbits is multiplied by $\abs{f'(x_k)}$ at each step, so the Lyapunov exponent is the average

$$
\lambda = \lim_{n\to\infty}\frac1n\sum_{k=0}^{n-1}\ln\abs{f'(x_k)}.
$$ {#eq-lyapunov-map}

At $r = 4$ it can be computed exactly: the change of variable $x = \sin^2(\pi y/2)$ turns the logistic map into the **tent map**, $y \mapsto 1 - \abs{1 - 2y}$, which stretches every interval by a factor of $2$, and the result is $\lambda = \ln 2$ exactly ([[#exr-tent]]). A direct numerical average over a million iterates confirms it and shows how the exponent varies with $r$:

```python
import math
def lyap(r, n=10**6, x=0.3):
    s = 0.0
    for _ in range(1000): x = r*x*(1-x)
    for _ in range(n):
        x = r*x*(1-x); s += math.log(abs(r*(1-2*x)))
    return s/n
for r in (2.8, 3.2, 3.5, 3.83, 4.0):
    print(r, round(lyap(r), 4))
print(1+math.sqrt(6), math.log(2))
```

Output:

```
2.8 -0.2231
3.2 -0.9163
3.5 -0.8725
3.83 -0.3697
4.0 0.6931
3.449489742783178 0.6931471805599453
```

::: example Interpreting the logistic exponents {#ex-logistic-lyap}
Explain the sign and value of each exponent in the output, and check the value at $r = 2.8$ by hand.
::: solution
At $r = 2.8$ the orbit converges to the fixed point $x^* = 1 - 1/2.8 = 0.6429$, so every term of [[#eq-lyapunov-map]] eventually equals $\ln\abs{f'(x^*)} = \ln\abs{2 - 2.8} = \ln 0.8 = -0.2231$, exactly the printed value. At $r = 3.2$ the orbit is the 2-cycle of [[#ex-two-cycle]], and the exponent is half the logarithm of the cycle multiplier $\abs{f'(p)f'(q)} = \abs{-r^2 + 2r + 4} = 0.16$: $\frac12\ln 0.16 = -0.9163$, as printed. At $r = 3.5$ the attractor is a stable 4-cycle and $\lambda$ is again negative. At $r = 3.83$, beyond $r_\infty$, the exponent is negative too: this is the period-3 window, an island of order inside the chaotic range. At $r = 4$ the exponent is $0.6931 = \ln 2$ to four figures, positive: chaos. The second-last line confirms $r_2 = 1 + \sqrt 6$ numerically.
:::
:::

## Chaos in Hamiltonian systems {#hamiltonian-chaos}

The driven damped pendulum is dissipative. Hamiltonian systems cannot have attractors (by Liouville's theorem), but they can still be chaotic, and historically that is where chaos was found.

An integrable Hamiltonian system with $n$ degrees of freedom has $n$ independent conserved quantities in involution (mutual Poisson brackets zero), and its bounded motions wind around $n$-dimensional **invariant tori**, labelled by the action variables of [[analytical-mechanics/hamiltonian#ex-action-angle]]. For two degrees of freedom, a Poincaré section on an energy surface shows each torus as a smooth closed curve. Perturb the Hamiltonian slightly, by coupling two oscillators nonlinearly or adding a third gravitating body, and ask whether the tori survive.

::: theorem The KAM theorem {#thm-kam}
Let $H = H_0(J) + \eps H_1(J, \varphi)$ be a smooth perturbation of an integrable Hamiltonian whose frequencies $\partial H_0/\partial J$ depend non-degenerately on the actions. Then for sufficiently small $\eps$, most invariant tori of $H_0$, namely those whose frequency ratios are sufficiently far from rational, survive as slightly deformed invariant tori of $H$. The measure of the destroyed set tends to zero as $\eps \to 0$.
:::

The theorem, due to Kolmogorov (1954), Arnold (1963) and Moser (1962), is far beyond this course; Arnold's *Mathematical Methods of Classical Mechanics*, Appendix 8, gives an overview. Its message is twofold. Weakly perturbed systems are mostly regular, which is why the solar system has survived for billions of years. But the tori with nearly rational frequency ratios, the resonances, break up into chains of islands surrounded by thin **chaotic layers**, and as $\eps$ grows these layers widen and merge into a chaotic sea. The Poincaré section then shows smooth curves, island chains and scattered points side by side. Hénon and Heiles found exactly this picture in 1964 for a model of a star moving in a galaxy, and the Kirkwood gaps in the asteroid belt, at orbital periods in simple ratios with Jupiter's, are regions where chaotic motion has cleared out the asteroids.

::: history From the three-body problem to the butterfly
In 1887 King Oscar II of Sweden offered a prize for a convergent series solution of the $N$-body problem. Henri Poincaré won it, but while his memoir was being printed in *Acta Mathematica* he found an error, recalled the edition at his own expense, and in the corrected version (1890) showed that the three-body problem has orbits of a "tangled" complexity, the homoclinic tangle, and no analytic integrals beyond the classical ones. He wrote in 1908 that small differences in initial conditions can produce very great ones in the final phenomena, so that prediction becomes impossible. The subject then lay largely dormant in physics until Edward Lorenz, running a twelve-variable weather model on a Royal McBee computer at MIT, restarted a run from rounded printed values and found a completely different forecast; his paper "Deterministic Nonperiodic Flow" (*Journal of the Atmospheric Sciences*, 1963) reduced the effect to three equations. Robert May's review "Simple mathematical models with very complicated dynamics" (*Nature*, 1976) brought the logistic map to wide attention, Tien-Yien Li and James Yorke's "Period three implies chaos" (1975) gave the subject its name, and Mitchell Feigenbaum discovered the universal constant $\delta$ in 1975–78 with a programmable calculator at Los Alamos, publishing it in the *Journal of Statistical Physics* in 1978.
:::

## Where this leads {#leads}

The question of whether a chaotic Hamiltonian system explores its whole energy surface uniformly is the ergodic hypothesis on which [[statistical-mechanics/microcanonical]] rests. Computational methods for chaotic systems, including the time series and spectra used to diagnose chaos in experiments, are in [[computation/chaos-and-data]]. In the quantum mechanics of [[quantum-2]], the absence of trajectories removes exponential sensitivity, and "quantum chaos" studies instead how the energy levels of classically chaotic systems are distributed. Turbulence in fluids, [[continuum]], is chaos with infinitely many degrees of freedom and remains one of the great unsolved problems of classical physics.

::: summary
- A fixed point of $\dot{\mathbf{x}} = \mathbf{F}(\mathbf{x})$ is classified by the eigenvalues of the Jacobian: saddles, nodes, spirals, centres. The damped pendulum has a stable spiral at the bottom and a saddle at the top.
- By the Poincaré–Bendixson theorem, bounded motion of a planar autonomous system ends at fixed points or closed orbits; chaos needs three dimensions, which a driven one-degree-of-freedom system has.
- A Poincaré section samples the state once per drive period. For the driven damped pendulum it shows periods $1, 2, 4, 8$ in a cascade near $\gamma = 1.06$–$1.083$ and chaos at $\gamma = 1.105$.
- The largest Lyapunov exponent measures the average exponential rate of separation of nearby orbits; computed by renormalisation it is $0.71$ per drive period for the chaotic pendulum. Predictions fail after $(1/\lambda)\ln(\Delta/\delta_0)$.
- Lyapunov exponents sum to the average phase-space divergence: zero for Hamiltonian systems, $-2\beta$ for the pendulum.
- The logistic map $x \mapsto rx(1 - x)$ has a stable fixed point for $1 < r < 3$, a 2-cycle for $3 < r < 1 + \sqrt6$, a period-doubling cascade accumulating at $r_\infty = 3.5699$, and chaos with $\lambda = \ln 2$ at $r = 4$.
- Feigenbaum's $\delta = 4.6692$ is universal for single-humped maps. In Hamiltonian systems, the KAM theorem says most tori survive small perturbations, with chaos in thin layers near resonances.
:::

## Exercises {#exercises}

::: exercise A fixed point of the logistic map {level=1 check="0.6"}
For $r = 2.50$, find the non-zero fixed point of the logistic map and decide whether it is stable.
::: solution
$x^* = 1 - 1/r = 1 - 0.400 = 0.600$. The derivative there is $f'(x^*) = 2 - r = -0.500$, with $\abs{f'} < 1$, so by [[#thm-map-stability]] it is stable. The negative sign means nearby orbits approach it alternately from above and below, and each step reduces the distance by half.
:::
:::

::: exercise The doubling map {level=1 check="ln(2)"}
The doubling map is $x_{k+1} = 2x_k \bmod 1$ on $[0, 1)$. Find its Lyapunov exponent, and explain why the binary digits of $x_0$ make its sensitivity to initial conditions obvious.
::: solution
The derivative is $2$ everywhere except at the jump, so every term of [[#eq-lyapunov-map]] is $\ln 2$ and $\lambda = \ln 2 = 0.693$. In binary, doubling shifts the digits one place to the left and dropping the integer part discards the leading digit. So $x_k$ is given by the binary digits of $x_0$ from the $(k+1)$-th onwards. Two initial values that agree in their first $50$ binary digits, about $10^{-15}$ apart, give orbits that agree for $50$ steps and are unrelated after that.
:::
:::

::: exercise Forecasting the pendulum {level=1 check="ln(1e8)/0.711"}
For the driven pendulum at $\gamma = 1.105$, with $\lambda = 0.711$ per drive period, estimate how many drive periods it takes for an initial error of $10^{-8}\,\mathrm{rad}$ to grow to $1\,\mathrm{rad}$.
::: solution
By [[#eq-horizon]], $t_{\mathrm{p}} = \ln(1/10^{-8})/0.711 = 18.42/0.711 = 25.9$ periods. Since $\ln(10) = 2.30$, each extra decimal digit of initial precision buys only $2.30/0.711 = 3.2$ more periods.
:::
:::

::: exercise The saddle of the damped pendulum {level=2 check="(-0.5+sqrt(4.25))/2"}
For $\ddot\theta + 0.500\,\dot\theta + \sin\theta = 0$, find the eigenvalues of the Jacobian at the inverted position $\theta = \pi$, and give the positive one. What is its physical meaning?
::: solution
With $\gamma = 0.5$ and $\omega_0 = 1$, the Jacobian at $\theta = \pi$ is $\begin{pmatrix}0&1\\1&-0.5\end{pmatrix}$, with characteristic equation $\lambda^2 + 0.5\lambda - 1 = 0$. The roots are $\lambda = \frac12(-0.5 \pm\sqrt{0.25 + 4}) = \frac12(-0.5 \pm\sqrt{4.25})$, that is $0.781$ and $-1.281$. The positive eigenvalue is the rate at which a small displacement from the inverted position grows: the pendulum falls away from the top as $e^{0.781t}$. Its eigenvector, $(1, 0.781)$, is the direction of the unstable manifold; the negative eigenvalue's eigenvector is the single direction of approach, along which a pendulum launched with exactly the right speed creeps up to the top.
:::
:::

::: exercise Estimating Feigenbaum's constant {level=2 check="(3.544090-3.449490)/(3.564407-3.544090)"}
Using $r_2 = 3.449490$, $r_3 = 3.544090$ and $r_4 = 3.564407$, estimate $\delta$ from the ratio $(r_3 - r_2)/(r_4 - r_3)$. Then use $\delta = 4.6692$ to predict $r_5$, and compare with $r_5 = 3.568759$.
::: solution
$(r_3 - r_2)/(r_4 - r_3) = 0.094600/0.020317 = 4.656$, already within $0.3\%$ of $\delta = 4.6692$. Predicting the next interval as $(r_4 - r_3)/\delta = 0.020317/4.6692 = 0.004351$ gives $r_5 \approx 3.564407 + 0.004351 = 3.568758$, in agreement with the true value to six figures. Summing the geometric series of remaining intervals estimates the accumulation point: $r_\infty \approx r_4 + (r_4 - r_3)/(\delta - 1) = 3.564407 + 0.005537 = 3.569944$, against the true $3.569946$.
:::
:::

::: exercise Contraction in the chaotic pendulum {level=2 check="-3*pi/2"}
For the pendulum of [[#eq-ddp]] with $\omega_0 = 3\pi$ and $\beta = \omega_0/4$, find the sum of the two Lyapunov exponents of the stroboscopic map per drive period ($T = 1$). Given the largest exponent $0.711$ at $\gamma = 1.105$, find the other, and the factor by which a small area in the Poincaré section shrinks per period.
::: solution
By [[#prop-lyapunov-sum]], the sum is $-2\beta T = -2(3\pi/4)(1) = -3\pi/2 = -4.712$ per period. The second exponent is $-4.712 - 0.711 = -5.423$. Areas shrink by $e^{-4.712} = 0.0090$ per period: in one period a small patch of the section is stretched by $e^{0.711} = 2.0$ in one direction and compressed by $e^{-5.42} = 0.0044$ in the other. Repeated, this produces the fine layered structure of the strange attractor, of zero area but non-zero length at every magnification.
:::
:::

::: exercise Stability of the 2-cycle {level=3 #exr-two-cycle-stability}
Show that a 2-cycle $\{p, q\}$ of a map $f$ is stable if $\abs{f'(p)f'(q)} < 1$. For the logistic map, prove that $f'(p)f'(q) = -r^2 + 2r + 4$, and deduce that the 2-cycle is stable exactly for $3 < r < 1 + \sqrt6$.
::: hint
Apply [[#thm-map-stability]] to $g = f\circ f$, whose fixed points include $p$ and $q$. For the product, use $p + q$ and $pq$ from the quadratic in [[#ex-two-cycle]].
:::
::: solution
The points $p$ and $q$ are fixed points of $g = f\circ f$. By the chain rule, $g'(p) = f'(f(p))f'(p) = f'(q)f'(p)$, and the same at $q$. By [[#thm-map-stability]] applied to $g$, the cycle attracts nearby orbits if $\abs{f'(p)f'(q)} < 1$.

For the logistic map, $f'(x) = r(1 - 2x)$, so

$$
f'(p)f'(q) = r^2\bigl(1 - 2(p + q) + 4pq\bigr).
$$

From the quadratic $r^2x^2 - r(r + 1)x + (r + 1) = 0$, $p + q = (r + 1)/r$ and $pq = (r + 1)/r^2$. Hence

$$
f'(p)f'(q) = r^2 - 2r(r + 1) + 4(r + 1) = -r^2 + 2r + 4.
$$

At $r = 3$ this is $1$, where the cycle is born from the fixed point. It decreases as $r$ increases, since its derivative $-2r + 2 < 0$, and reaches $-1$ when $r^2 - 2r - 5 = 0$, that is $r = 1 + \sqrt6 = 3.449$. For $3 < r < 1 + \sqrt6$ the product lies strictly between $-1$ and $1$, and the cycle is stable; beyond, it is below $-1$ and the cycle is unstable, giving way to the 4-cycle. At $r = 3.2$, the product is $0.16$, as used in [[#ex-logistic-lyap]].
:::
:::

::: exercise The logistic map at r = 4 {level=3 #exr-tent}
Show that the substitution $x = \sin^2(\pi y/2)$, with $0 \le y \le 1$, conjugates the logistic map with $r = 4$ to the tent map $T(y) = 1 - \abs{1 - 2y}$. Deduce that the Lyapunov exponent of almost every orbit of the logistic map at $r = 4$ is $\ln 2$.
::: hint
Use $4\sin^2\theta\cos^2\theta = \sin^22\theta$. For the exponent, compare how the two maps stretch small intervals, and note that the change of variables multiplies lengths by a bounded factor except at the endpoints.
:::
::: solution
Let $x = h(y) = \sin^2(\pi y/2)$. Then $1 - x = \cos^2(\pi y/2)$ and

$$
4x(1 - x) = 4\sin^2\frac{\pi y}{2}\cos^2\frac{\pi y}{2} = \sin^2(\pi y).
$$

For $0 \le y \le \frac12$, $T(y) = 2y$ and $h(T(y)) = \sin^2(\pi y)$. For $\frac12 \le y \le 1$, $T(y) = 2 - 2y$ and $h(T(y)) = \sin^2(\pi - \pi y) = \sin^2(\pi y)$. In both cases $f(h(y)) = h(T(y))$: the logistic map at $r = 4$ is the tent map in disguise, $f = h\circ T\circ h^{-1}$.

The tent map has $\abs{T'} = 2$ everywhere except at $y = \frac12$, so its Lyapunov exponent is $\ln 2$ for every orbit that avoids that single point. For the logistic map, iterating the conjugacy gives $f^n = h\circ T^n\circ h^{-1}$, and the chain rule gives

$$
\ln\abs{(f^n)'(x_0)} = \ln\abs{h'(y_n)} + n\ln 2 - \ln\abs{h'(y_0)}.
$$

Dividing by $n$ and letting $n \to \infty$, the first and last terms contribute nothing provided $\ln\abs{h'(y_n)}$ does not grow linearly in $n$, which holds for almost every orbit because $h'(y) = \frac\pi2\sin(\pi y)$ vanishes only at the endpoints, and a typical tent-map orbit is uniformly distributed and visits their neighbourhoods only rarely. Hence $\lambda = \ln 2$, in agreement with the numerical value $0.6931$.
:::
:::
