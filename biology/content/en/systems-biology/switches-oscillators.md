A cell often has to make a decision and stick to it. A *Xenopus* oocyte exposed briefly to progesterone matures and never goes back; a bacterium that has switched on the machinery for using lactose keeps it on even as the inducer falls; a developing cell that has chosen a fate does not wander back to the alternative. Other processes must repeat: the cell cycle, the daily rhythm of the circadian clock, the pulses of signalling proteins such as p53 and NF-κB. Switches and oscillators are the two great classes of dynamical behaviour beyond simple approach to a steady state, and they arise from feedback: **positive feedback** makes switches, **negative feedback with delay** makes oscillators.

This chapter analyses both with the tools of nonlinear dynamics: nullclines, linear stability of fixed points via the Jacobian matrix, bifurcations and limit cycles. These are developed in [nonlinear systems](/learn/maths/lesson.php?c=ode&l=nonlinear-systems) and [linear systems](/learn/maths/lesson.php?c=ode&l=linear-systems) in Maths Atlas; here we use them on biological models and explain what each result means for a cell. We build on the Hill functions, autoregulation and feedback loops of [[systems-biology/gene-expression-dynamics]] and [[systems-biology/network-motifs]], and meet the two synthetic circuits that launched synthetic biology in 2000, the **toggle switch** and the **repressilator**, before turning to natural oscillators — glycolytic oscillations and the circadian clock.

## Bistability

::: definition Bistability and hysteresis {#def-bistability}
A dynamical system is **bistable** if, for the same parameter values, it has two stable steady states. Each has a **basin of attraction** — the set of initial conditions that converge to it — and the basins are separated by a boundary (in one dimension an unstable steady state, the **threshold**; in two dimensions the stable manifold of a saddle point, the **separatrix**). A bistable system shows **hysteresis** if, as a parameter (such as an input signal) is slowly increased and then decreased, the system switches between states at different parameter values in the two directions, so that its state depends on its history.
:::

Bistability is the basis of cellular **memory**. If a transient signal pushes the system across the threshold, it remains in the new state after the signal has gone, with no further input. Each state is self-sustaining: positive feedback maintains it.

### Positive autoregulation and hysteresis

The simplest bistable gene activates itself cooperatively, as we saw in [[systems-biology/gene-expression-dynamics#ex-par]]. Add an external signal $S$ that also drives production:

$$
\frac{dX}{dt} = S + \frac{X^n}{1 + X^n} - aX ,
$$ {#eq-par-signal}

in dimensionless units ($X$ measured in units of its activation threshold, time in units of the response time, $a$ the removal rate relative to the maximal feedback-driven production). Steady states satisfy $S = aX - X^n/(1 + X^n)$. Instead of solving for $X$ as a function of $S$, it is easier to plot this relation the other way round: the signal needed to hold the system at each value of $X$.

::: widget plot
f: a*x - x^n/(1 + x^n)
x: 0, 2.5
y: -0.3, 0.6
sliders: a=0.6:0.3:1:0.01; n=4:1:6:0.5
hlines: 0
labels: S(X) = aX - \frac{X^n}{1+X^n}
caption: The steady states of positive autoregulation with an external signal ([[#eq-par-signal]]). The curve gives the signal $S$ (vertical axis) at which each level $X$ (horizontal axis) is a steady state. Read it sideways: for any signal between the local minimum and the local maximum of the curve, a horizontal line meets it three times — two stable states and an unstable one on the descending middle branch. With the defaults ($a = 0.6$, $n = 4$) the window runs from about $S = 0.04$ to $0.25$. Raise $a$ and the window closes; with $n = 1$ there is no window at all. If the local minimum drops below zero, the switch becomes irreversible: once on, the gene stays on even with no signal.
:::

::: example Switching thresholds {#ex-hysteresis}
For [[#eq-par-signal]] with $a = 0.6$ and $n = 4$, the curve $S(X) = 0.6X - X^4/(1 + X^4)$ has a local maximum at $X = 0.567$, $S = 0.247$, and a local minimum at $X = 1.293$, $S = 0.039$ (found numerically by setting $dS/dX = 0$). Describe what happens as $S$ is raised slowly from 0 to 0.4 and lowered back to 0.
::: solution
At $S = 0$ the cell starts in the low state ($X = 0$). As $S$ increases, $X$ follows the lower stable branch, rising slowly to about 0.57. When $S$ exceeds 0.247 that branch disappears — the low stable state collides with the unstable threshold and both vanish in a **saddle-node bifurcation** — and $X$ jumps to the upper branch (about 2.0 at that signal). Raising $S$ further moves $X$ smoothly upwards. On the way back, the system stays on the upper branch until $S$ falls below 0.039, the other saddle-node point, and only then drops back to the low state. Between $S = 0.039$ and $0.247$ the state depends on history: this is hysteresis. A brief pulse of signal above 0.247 switches the cell on, and it stays on as long as $S$ remains above 0.039. With $a = 0.4$ and $n = 2$ the local minimum is at $S = -0.11 < 0$, so the switch is irreversible: removing the signal completely does not turn it off.
:::
:::

Hysteresis has been observed directly. In 1957 Aaron Novick and Milton Weiner found that *Escherichia coli* cells exposed to intermediate concentrations of a non-metabolisable inducer of the *lac* operon (TMG) were either fully induced or uninduced, and that the fraction induced depended on the history of the culture — the inducer is imported by the permease LacY, which the operon itself encodes, closing a positive feedback loop. Ertugrul Ozbudak, Mukund Thattai, Alexander van Oudenaarden and colleagues mapped the bistable region of this system in single cells with fluorescent reporters in 2004 and found it bounded by two saddle-node bifurcations in the plane of TMG and glucose concentrations, as the model predicts. James Ferrell and colleagues showed in 1998 that the maturation decision of *Xenopus* oocytes in response to progesterone is all-or-none and irreversible, driven by positive feedback in the MAPK cascade.

### The genetic toggle switch

Two genes that repress each other form a double-negative loop — positive feedback overall. Timothy Gardner, Charles Cantor and James Collins built such a **toggle switch** in *E. coli* in 2000, using the repressors LacI and a temperature-sensitive λ cI, and modelled it as

$$
\frac{du}{dt} = \frac{\alpha_1}{1 + v^n} - u, \qquad \frac{dv}{dt} = \frac{\alpha_2}{1 + u^m} - v,
$$ {#eq-toggle}

where $u$ and $v$ are the two repressor concentrations in units of their repression thresholds, time is in units of the removal time, $\alpha_1$ and $\alpha_2$ are the dimensionless maximal synthesis rates and $n$, $m$ the Hill coefficients.

The nullclines are $u = \alpha_1/(1 + v^n)$ (where $du/dt = 0$) and $v = \alpha_2/(1 + u^m)$. Both are decreasing curves; if they are steep enough they cross three times, giving two stable states — "$u$ high, $v$ low" and "$u$ low, $v$ high" — and a saddle between them.

::: proposition Bistability of the symmetric toggle {#prop-toggle}
For the symmetric toggle switch $\alpha_1 = \alpha_2 = \alpha$, $n = m$, there is always a symmetric steady state $u = v = s$ with $s(1 + s^n) = \alpha$. It is stable if $n s^n/(1 + s^n) < 1$ and becomes a saddle, with two new stable asymmetric states, when

$$
\frac{n s^n}{1 + s^n} > 1 .
$$ {#eq-toggle-condition}

For $n = 1$ this never happens: **mutual repression without cooperativity cannot make a switch**. For $n = 2$ it happens when $s > 1$, that is, when $\alpha > 2$.
:::

::: proof
The symmetric steady state solves $s = \alpha/(1 + s^n)$, which has exactly one positive root since the left side increases and the right side decreases. The Jacobian of [[#eq-toggle]] there is

$$
J = \begin{pmatrix} -1 & -c \\ -c & -1 \end{pmatrix}, \qquad c = \frac{\alpha n s^{n-1}}{(1 + s^n)^2} = \frac{n s^n}{1 + s^n},
$$

using $\alpha = s(1 + s^n)$. Its eigenvalues are $-1 \pm c$, with eigenvectors $(1, 1)$ and $(1, -1)$. Both are negative if $c < 1$ (stable node); if $c > 1$ the eigenvalue $-1 + c$ is positive along $(1, -1)$ — the direction in which one repressor rises as the other falls — and the state is a saddle. Since all trajectories enter the bounded region $0 \le u \le \alpha$, $0 \le v \le \alpha$, the unstable direction must lead to two other steady states, which are stable (a pitchfork bifurcation). For $n = 1$, $c = s/(1 + s) < 1$ always. For $n = 2$, $c = 2s^2/(1 + s^2) > 1$ iff $s^2 > 1$, and $s = 1$ corresponds to $\alpha = 1\cdot(1 + 1) = 2$.
:::

::: widget phaseplane
f: a1/(1 + y^n) - x
g: a2/(1 + x^n) - y
x: 0, 6
y: 0, 6
sliders: a1=3:1:6:0.1; a2=3:1:6:0.1; n=2:1:4:0.1
caption: Phase plane of the genetic toggle switch ([[#eq-toggle]]) with repressor $u$ on the horizontal axis and $v$ on the vertical, both in units of their repression thresholds. With the defaults ($\alpha_1 = \alpha_2 = 3$, $n = 2$) the two nullclines cross three times: stable states at about $(2.62, 0.38)$ and $(0.38, 2.62)$ and a saddle at $(1.21, 1.21)$ whose stable manifold (the diagonal) separates the two basins. Click on either side of the diagonal to see trajectories fall into opposite states. Lower both $\alpha$ below 2, or $n$ towards 1, and the switch disappears; make $\alpha_1$ much larger than $\alpha_2$ and only the "$u$ high" state survives — this is how an inducer flips the switch.
:::

::: example Flipping the toggle {#ex-toggle}
For the symmetric toggle with $n = 2$ and $\alpha = 3$, find the steady states. The cell is in the state with $v$ high. An inducer is added that inactivates repressor $v$ — in the model, it reduces the effective repression of gene $u$, raising its effective synthesis $\alpha_1$. Explain why a transient induction can leave the cell permanently in the other state.
::: solution
The symmetric state satisfies $s(1 + s^2) = 3$; by trial, $s = 1.21$ ($1.21\times2.465 = 2.98$). The asymmetric states solve $u = 3/(1 + v^2)$, $v = 3/(1 + u^2)$; numerically $u = 2.62$, $v = 0.38$ and the mirror image (check: $3/(1 + 0.382^2) = 3/1.146 = 2.62$ and $3/(1 + 2.618^2) = 3/7.85 = 0.382$). Inducing gene $u$ strongly raises $\alpha_1$; once it is large enough, the nullclines cross only once, near "$u$ high", and the cell moves there. When the inducer is removed and $\alpha_1$ returns to 3, the system is again bistable — but now it is in the basin of "$u$ high", so it stays there. Gardner and colleagues flipped their switch with pulses of IPTG (inactivating LacI) or of heat (inactivating the temperature-sensitive cI), and the state persisted for many generations after the pulse.
:::
:::

::: warning "Positive feedback always produces bistability"
Positive feedback is necessary for bistability but not sufficient. The feedback must be **nonlinear** (cooperative, Hill coefficient effectively above 1, or ultrasensitive by some other mechanism) and **strong** enough relative to removal — and even then only in a window of parameters ([[#prop-toggle]], [[#ex-hysteresis]]). Many positive feedback loops in cells merely amplify or prolong a response without creating two stable states. Bistability must be shown experimentally — by bimodal distributions in single cells, hysteresis, or persistence of a state after the signal is gone — not inferred from a wiring diagram.
:::

## Oscillations

A steady state is not the only possible long-term behaviour of a system of two or more variables. Trajectories may instead settle onto a closed orbit — a sustained oscillation.

::: definition Limit cycle {#def-limit-cycle}
A **limit cycle** is an isolated closed trajectory in phase space. It is **stable** if nearby trajectories spiral onto it. A stable limit cycle represents a self-sustained oscillation with a characteristic **period** and **amplitude** that are set by the system's parameters, not by its initial conditions — in contrast to the neutral cycles of a frictionless pendulum or the Lotka–Volterra predator–prey model, whose amplitude depends on where they start.
:::

Biological oscillators are limit cycles: a circadian clock returns to the same rhythm after a perturbation. Two ingredients are needed. **Negative feedback** pushes the system back when it deviates; **delay** (or several intermediate steps) makes the correction arrive late, so that the system overshoots. With insufficient delay or weak feedback, oscillations die away into a stable spiral; beyond a critical point, the steady state loses stability and a limit cycle appears — typically through a **Hopf bifurcation**, where a pair of complex-conjugate eigenvalues of the Jacobian crosses into the right half-plane.

### Cyclic negative feedback and the secant condition

Consider a chain of $N$ species, each produced in response to the previous one and the last repressing the first — a **cyclic negative feedback loop**. Brian Goodwin's 1965 model of a repressible gene (mRNA → enzyme → product that represses transcription) is the case $N = 3$, and the repressilator, with three repressors, is another.

::: proposition The secant condition {#prop-secant}
Consider a cyclic loop of $N$ variables with equal removal rate constants (scaled to 1), linearised about its steady state, in which the overall **loop gain** — the product of the magnitudes of the $N$ local sensitivities around the loop, one of which is a repression — is $g > 0$. The steady state is unstable, and oscillations arise, if

$$
g > \sec^N\!\left(\frac{\pi}{N}\right).
$$ {#eq-secant}

For $N = 2$ the threshold is infinite (a two-variable negative feedback loop of this kind never oscillates); for $N = 3$ it is $\sec^3(60°) = 8$; for $N = 4$ it is 4; and it approaches 1 as $N \to \infty$. **Assumptions:** equal time constants (unequal ones make the threshold *lower*: equal rates are the worst case), monotone interactions, and stability judged by linearisation.
:::

::: proof
Linearising about the steady state with all removal rates equal to 1, the Jacobian has $-1$ on the diagonal and nonzero entries $k_1, \dots, k_N$ around the cycle, with product $k_1k_2\cdots k_N = -g$ (negative, since the loop is negative). Its characteristic equation is $(\lambda + 1)^N = -g$, whose roots are

$$
\lambda = -1 + g^{1/N}e^{i\pi(2j + 1)/N}, \qquad j = 0, 1, \dots, N - 1.
$$

The largest real part comes from $j = 0$: $\operatorname{Re}\lambda = -1 + g^{1/N}\cos(\pi/N)$. This is positive exactly when $g^{1/N} > 1/\cos(\pi/N)$, which is [[#eq-secant]]. For $N = 2$, $\cos(\pi/2) = 0$ and the real part is always $-1$.
:::

The loop gain is the product of the local logarithmic sensitivities, and for a Hill repression step it can be at most the Hill coefficient $n$ (other steps contributing at most 1 each if they are linear). So the three-variable Goodwin loop needs a Hill coefficient greater than 8 to oscillate when its three steps have equal time constants — a famously unrealistic requirement. Real oscillators escape it by having more steps (longer loops), explicit time delays (transcription, translation, nuclear transport), unequal time scales, or additional positive feedback. The secant condition was derived by John Tyson and Hans Othmer in 1978 and by Christoph Thron in 1991.

::: example Oscillation thresholds {#ex-secant}
(a) A negative feedback loop has four steps of comparable lifetime, and the repression step has Hill coefficient 3; the other steps are linear. Can the loop oscillate? (b) With three steps, what Hill coefficient would be needed?
::: solution
(a) The maximal gain is $g = 3$ (achieved when the repressor is well above its threshold, since the logarithmic sensitivity of $1/(1 + x^n)$ is $nx^n/(1 + x^n)$, approaching $n$). The threshold for $N = 4$ is $\sec^4(45°) = (\sqrt2)^4 = 4$. Since $3 < 4$, the steady state is stable for equal time constants. (b) For $N = 3$, $g > 8$ is needed, so $n > 8$. Adding more steps to the loop, or making the time constants unequal, lowers the requirement; for example, with $N = 6$, $\sec^6(30°) = (2/\sqrt3)^6 = 64/27 = 2.37$, which a Hill coefficient of 3 can exceed.
:::
:::

### The repressilator

Michael Elowitz and Stanislas Leibler built the **repressilator** in *E. coli* in 2000: three repressors, LacI, TetR and λ cI, each repressing the next in a ring, on a plasmid, with a second plasmid carrying a TetR-repressed GFP reporter. Including mRNA explicitly, the loop has six steps, which makes oscillation achievable with modest cooperativity. Their dimensionless model is

$$
\frac{dm_i}{dt} = -m_i + \frac{\alpha}{1 + p_j^n} + \alpha_0, \qquad \frac{dp_i}{dt} = -\beta(p_i - m_i),
$$ {#eq-repressilator}

for $(i, j) = $ (lacI, cI), (tetR, lacI), (cI, tetR), where $m_i$ and $p_i$ are mRNA and protein concentrations, time is in units of the mRNA lifetime, $\alpha$ and $\alpha_0$ are the repressed and leaky transcription rates, and $\beta$ is the ratio of protein to mRNA removal rates. They found that oscillations are favoured by strong promoters, tight repression (small $\alpha_0$), cooperativity and comparable mRNA and protein lifetimes — and so used repressor proteins tagged for rapid degradation.

```python
# Repressilator (Elowitz & Leibler 2000 model), dimensionless, RK4 in plain Python
alpha, alpha0, beta, n = 216.0, 0.216, 5.0, 2.0   # illustrative parameters

def rhs(s):
    m, p = s[:3], s[3:]
    dm = [-m[i] + alpha / (1 + p[(i - 1) % 3]**n) + alpha0 for i in range(3)]
    dp = [-beta * (p[i] - m[i]) for i in range(3)]
    return dm + dp

def rk4(s, h):
    k1 = rhs(s)
    k2 = rhs([x + h/2*k for x, k in zip(s, k1)])
    k3 = rhs([x + h/2*k for x, k in zip(s, k2)])
    k4 = rhs([x + h*k for x, k in zip(s, k3)])
    return [x + h/6*(a + 2*b + 2*c + d) for x, a, b, c, d in zip(s, k1, k2, k3, k4)]

s = [1.0, 0.0, 0.0, 2.0, 1.0, 3.0]   # m1, m2, m3, p1, p2, p3
h, t = 0.01, 0.0
peaks, prev, rising = [], s[3], False
while t < 200:
    s = rk4(s, h); t += h
    if s[3] < prev and rising and t > 50:   # p1 just passed a maximum
        peaks.append((t, prev))
    rising = s[3] > prev
    prev = s[3]
periods = [b[0] - a[0] for a, b in zip(peaks, peaks[1:])]
print(f"period = {sum(periods)/len(periods):.2f} (units of mRNA lifetime)")
print(f"p1 peak height = {peaks[-1][1]:.1f}")
# period = 8.69 (units of mRNA lifetime)
# p1 peak height = 59.2
```

The simulated oscillation settles to a period of about 8.7 mRNA lifetimes whatever the initial condition — a limit cycle — with the three proteins peaking in turn, a third of a period apart. In the experiment, individual cells oscillated with periods of about 150 min, several times the cell-division time, so the oscillation state was passed on through divisions; but the oscillations were noisy, and only some cells oscillated at any time. In 2016 Laurent Potvin-Trottier, Johan Paulsson and colleagues rebuilt the repressilator with changes guided by stochastic models — removing the degradation tags, adding a "sponge" of binding sites to sharpen repression, and moving the reporter onto the same plasmid — and obtained remarkably regular oscillations that stayed synchronised across a population for hundreds of generations.

### A two-variable oscillator: glycolysis

A loop of two variables can oscillate if it contains positive feedback as well as negative. Yeast extracts and suspensions of yeast cells supplied with sugar show sustained oscillations in NADH fluorescence with periods of the order of a minute, driven by the allosteric enzyme phosphofructokinase, which is activated by its own product ADP. Evgenii Sel'kov's 1968 model, in the dimensionless form popularised by Steven Strogatz, is

$$
\frac{dx}{dt} = -x + ay + x^2y, \qquad \frac{dy}{dt} = b - ay - x^2y,
$$ {#eq-selkov}

where $x$ is ADP and $y$ the substrate F6P (fructose 6-phosphate), $b$ is the substrate supply and $a$ a low basal rate of conversion. The term $x^2y$ is the autocatalytic step: product $x$ accelerates its own production from $y$.

::: proposition Hopf bifurcation in the Sel'kov model {#prop-selkov}
The unique steady state of [[#eq-selkov]] is $x^* = b$, $y^* = b/(a + b^2)$. Its Jacobian has determinant $\Delta = a + b^2 > 0$ and trace

$$
\tau = -\frac{b^4 + (2a - 1)b^2 + a + a^2}{a + b^2}.
$$

The steady state is unstable, and trajectories approach a stable limit cycle, when $\tau > 0$, which for $a < 1/8$ happens in the window

$$
\frac{1 - 2a - \sqrt{1 - 8a}}{2} < b^2 < \frac{1 - 2a + \sqrt{1 - 8a}}{2}.
$$
:::

::: proof
Setting $dx/dt + dy/dt = b - x = 0$ gives $x^* = b$, and then $dy/dt = 0$ gives $y^* = b/(a + b^2)$. The Jacobian is

$$
J = \begin{pmatrix} -1 + 2x^*y^* & a + x^{*2} \\ -2x^*y^* & -(a + x^{*2}) \end{pmatrix},
$$

with $\Delta = (-1 + 2x^*y^*)(-(a + x^{*2})) + 2x^*y^*(a + x^{*2}) = a + b^2 > 0$ and $\tau = -1 + 2b^2/(a + b^2) - (a + b^2)$, which simplifies to the expression given. With $\Delta > 0$ the steady state is stable if $\tau < 0$ and unstable (a source) if $\tau > 0$. The numerator of $\tau$ is negative between the two roots of $b^4 + (2a - 1)b^2 + a + a^2 = 0$ in $b^2$, which are the stated bounds. When the fixed point is a source, the Poincaré–Bendixson theorem — applied to a trapping region that can be constructed for this system (see Strogatz, *Nonlinear Dynamics and Chaos*) — guarantees a closed orbit.
:::

::: widget phaseplane
f: -x + a*y + x^2*y
g: b - a*y - x^2*y
x: 0, 3
y: 0, 3
sliders: a=0.08:0.01:0.15:0.005; b=0.6:0.1:1.2:0.01
points: 0.2, 0.2; 2.5, 2.5; 0.6, 1.0
caption: The Sel'kov model of glycolytic oscillations, with ADP ($x$) on the horizontal axis and fructose 6-phosphate ($y$) on the vertical, both dimensionless. With $a = 0.08$, $b = 0.6$ the steady state at $(0.6, 1.36)$ is an unstable spiral and every trajectory — from inside or outside — winds onto the same closed orbit, a stable limit cycle. Increase the supply $b$ past about 0.85 and the oscillation shrinks to nothing as the steady state becomes stable (a Hopf bifurcation); lower it below about 0.35 and the same happens at the other end of the window.
:::

::: example The oscillatory window {#ex-selkov}
For $a = 0.08$, find the range of substrate supply $b$ for which the Sel'kov model oscillates, and the steady state at $b = 0.6$.
::: solution
$\sqrt{1 - 8a} = \sqrt{0.36} = 0.6$, so $b^2$ lies between $(1 - 0.16 - 0.6)/2 = 0.12$ and $(1 - 0.16 + 0.6)/2 = 0.72$, giving $0.346 < b < 0.849$. At $b = 0.6$, $x^* = 0.6$ and $y^* = 0.6/(0.08 + 0.36) = 1.364$; the trace is $-1 + 2(0.36)/0.44 - 0.44 = 0.196 > 0$, so the steady state is unstable and the system oscillates. Numerical integration confirms oscillations of $x$ between about 0.25 and 1.5 at $b = 0.6$, and none at $b = 0.3$ or $0.9$. Biologically: glycolytic oscillations appear only at intermediate rates of sugar supply, which is what experiments on yeast extracts found.
:::
:::

::: quiz
Which change would most reliably convert a stable two-gene negative feedback loop (X activates Y, Y represses X, linear removal, no delay) into an oscillator?
- [ ] Increasing the Hill coefficient of repression
- [ ] Making both proteins more stable
- [x] Inserting additional intermediate steps or an explicit delay into the loop
- [ ] Increasing the synthesis rate of X
::: solution
By the secant condition ([[#prop-secant]]), a two-variable negative feedback loop with monotone interactions and first-order removal cannot lose stability however large its gain: the eigenvalues of its Jacobian always have negative real part (it can show damped oscillations, but not sustained ones). Extra steps or an explicit delay make the threshold finite. Positive feedback is the other route, as in the Sel'kov model.
:::
:::

::: intuition Why delay makes oscillations
A thermostat that switches the heating off the moment the room reaches the set temperature keeps the room steady. Now imagine the thermometer reads the temperature of ten minutes ago. When the reading reaches the set point, the room is already far too warm; the heating goes off, the room cools, but the thermometer keeps reporting warmth for ten more minutes, by which time the room is too cold. The loop chases its own tail. A transcriptional negative feedback loop is a delayed thermostat: transcription, processing, export, translation and maturation all take time, and each extra stage behaves like part of a delay.
:::

## Circadian clocks

Almost all organisms that live under the day–night cycle have an internal **circadian clock** — an oscillator with a free-running period close to 24 h that persists in constant conditions and is **entrained** (reset) by light or temperature. A circadian oscillator has three defining properties: it free-runs with a period near, but not exactly, 24 h; it can be entrained by environmental cycles; and its period is **temperature-compensated**, changing little over a physiological range of temperatures, unlike most biochemical rates.

The molecular core in animals is a transcription–translation negative feedback loop. In *Drosophila melanogaster*, Ronald Konopka and Seymour Benzer isolated mutants of the *period* (*per*) gene in 1971 with short (19 h), long (28 h) or no rhythms. Paul Hardin, Jeffrey Hall and Michael Rosbash showed in 1990 that the PER protein feeds back to repress the transcription of its own gene, and later work identified the partner TIMELESS (TIM, from Michael Young's laboratory) and the activators CLOCK and CYCLE, which drive *per* and *tim* transcription; PER–TIM complexes enter the nucleus after a delay and inhibit CLOCK–CYCLE. Phosphorylation of PER by the kinase DOUBLETIME controls its stability and adds delay. Hall, Rosbash and Young shared the 2017 Nobel Prize in Physiology or Medicine for this work. Mammals have a homologous loop in which CLOCK–BMAL1 activates the *Period* and *Cryptochrome* genes, whose products repress CLOCK–BMAL1, with additional interlocked loops through the nuclear receptors REV-ERB and ROR that stabilise the rhythm.

The long period of the clock — much longer than the lifetimes of the mRNAs and proteins involved — comes from the accumulated delays of transcription, translation, sequential phosphorylation and nuclear entry, and from the cooperativity of repression, exactly the ingredients that the secant condition and its relatives require.

A striking exception to the transcriptional paradigm comes from cyanobacteria. In 2005 Masato Nakajima, Takao Kondo and colleagues showed that three proteins of *Synechococcus elongatus*, KaiA, KaiB and KaiC, mixed in a test tube with ATP, generate a temperature-compensated 24-hour rhythm in the phosphorylation of KaiC — a circadian oscillator made purely of protein interactions, with no transcription at all. In the cell it is coupled to a transcriptional loop, but the protein oscillator alone keeps time.

::: application Clocks, switches and engineered cells
Synthetic biologists now build switches and oscillators routinely, and these devices are used as memory elements that record a transient exposure (to a chemical, or to conditions in the gut) for later read-out, and as timers. Bistable switches are also being exploited in the opposite direction: cell-fate decisions in development and in the transition of cells between drug-sensitive and drug-tolerant states can be modelled as switching between basins of attraction, which suggests strategies of pushing cells across thresholds rather than simply inhibiting a pathway. Circadian timing affects metabolism, sleep and the effects of medicines in humans; that clinical side is covered in Medicine Atlas.
:::

::: history
Ideas about biochemical oscillation are older than molecular biology. Alfred Lotka described sustained chemical oscillations in a hypothetical autocatalytic system in 1910, and Boris Belousov discovered an oscillating chemical reaction (later the Belousov–Zhabotinsky reaction) in the 1950s, which chemists at first refused to believe. Jacob and Monod suggested in 1961 that combinations of regulatory genes could produce both stable alternative states and oscillations, and Brian Goodwin's analyses of repressible genes in the 1960s formalised the latter. Glycolytic oscillations in yeast were measured by Britton Chance and colleagues in the 1960s. The two synthetic circuits that founded modern synthetic biology — Gardner, Cantor and Collins's toggle switch and Elowitz and Leibler's repressilator — were published side by side in *Nature* in January 2000, and showed that a mathematical design could be built from well-characterised parts and behave as predicted, at least on average.
:::

::: summary
- Positive feedback with sufficient nonlinearity creates bistability: two stable states separated by a threshold or separatrix, providing memory. Switching occurs at saddle-node bifurcations, and the gap between the switch-on and switch-off thresholds is hysteresis.
- The symmetric toggle switch is bistable when $ns^n/(1 + s^n) > 1$ at its symmetric state; for $n = 2$ this means $\alpha > 2$, and with $n = 1$ it never happens.
- Sustained oscillations are stable limit cycles, usually born in Hopf bifurcations; they need negative feedback plus delay (or added positive feedback).
- A cyclic negative feedback loop of $N$ equal steps oscillates only if its loop gain exceeds $\sec^N(\pi/N)$: never for $N = 2$, 8 for $N = 3$, approaching 1 for long loops.
- The repressilator (three repressors in a ring) and the Sel'kov glycolysis model ($0.346 < b < 0.849$ for $a = 0.08$) illustrate the two routes to oscillation.
- Circadian clocks are temperature-compensated, entrainable oscillators built from delayed transcriptional negative feedback (PER/TIM in *Drosophila*, PER/CRY in mammals) or, in cyanobacteria, a protein-only KaiABC oscillator.
:::

## Exercises

::: exercise Toggle threshold {level=1 check="2"}
For the symmetric toggle switch with Hill coefficient $n = 2$, what is the smallest value of $\alpha$ above which the system is bistable?
::: solution
By [[#prop-toggle]], bistability needs $s > 1$, where $s(1 + s^2) = \alpha$; at $s = 1$, $\alpha = 2$. So $\alpha > 2$.
:::
:::

::: exercise Secant thresholds {level=1 check="4"}
What is the minimum loop gain for oscillation in a cyclic negative feedback loop of four equal steps?
::: solution
$\sec^4(\pi/4) = (\sqrt2)^4 = 4$.
:::
:::

::: exercise Reading a bifurcation diagram {level=1}
A bistable system switches on when an input exceeds 5 μM and off when it falls below 2 μM. A cell starts off, the input is raised to 4 μM, then 6 μM, then lowered to 3 μM, then to 1 μM. In which state is the cell at each stage?
::: solution
At 4 μM: off (below the switch-on threshold). At 6 μM: on (above 5). At 3 μM: still on (above the switch-off threshold of 2 — hysteresis). At 1 μM: off.
:::
:::

::: exercise The oscillatory window for another a {level=2}
For $a = 0.1$, find the range of $b$ for which the Sel'kov model oscillates, and determine whether $b = 0.4$ gives sustained oscillations.
::: solution
$\sqrt{1 - 8a} = \sqrt{0.2} = 0.447$, so by [[#prop-selkov]] the bounds on $b^2$ are $(1 - 0.2 \mp 0.447)/2$, that is $0.176$ and $0.624$, and the window is $0.420 < b < 0.790$ — narrower than for $a = 0.08$. At $b = 0.4$, $b^2 = 0.16$ lies below the window: the trace is $-1 + 2(0.16)/0.26 - 0.26 = -0.029 < 0$, so the steady state is (just) stable and oscillations die away.
:::
:::

::: exercise Is the steady state a saddle? {level=2}
For the toggle switch [[#eq-toggle]] with $\alpha_1 = \alpha_2 = 3$ and $n = m = 2$, verify that the symmetric steady state $s \approx 1.213$ is a saddle by computing the Jacobian eigenvalues.
::: solution
$c = ns^n/(1 + s^n) = 2(1.471)/(2.471) = 1.19$. The eigenvalues are $-1 \pm 1.19$, i.e. $0.19$ and $-2.19$: one positive, one negative, so a saddle. The unstable direction is $(1, -1)$ — one repressor up, the other down.
:::
:::

::: exercise Why tag the repressors? {level=2}
Elowitz and Leibler fused degradation tags to their repressors so that protein lifetimes became comparable to mRNA lifetimes. Use the secant condition to explain why this helps oscillation.
::: solution
The secant condition's threshold is lowest when all steps around the loop have equal time constants. If proteins are much more stable than mRNAs, the protein steps dominate the dynamics and the effective loop is closer to three slow steps with three fast ones that respond almost instantly; the fast steps contribute little phase lag, so the loop behaves like $N = 3$ with a threshold of 8. Making protein and mRNA lifetimes comparable turns the loop into six steps of similar speed, each contributing phase lag, with a threshold of $\sec^6(30°) = 2.37$, achievable with modest cooperativity.
:::
:::

::: exercise An irreversible switch {level=2}
For [[#eq-par-signal]] with $n = 2$, show that the switch is irreversible (the high state survives at $S = 0$) whenever $a < 1/2$.
::: solution
At $S = 0$, the nonzero steady states satisfy $aX = X^2/(1 + X^2)$, i.e. $X/(1 + X^2) = a$, which has two positive solutions when $a < 1/2$ (the maximum of $X/(1 + X^2)$ is $1/2$ at $X = 1$), the larger of which is stable ([[systems-biology/gene-expression-dynamics]], exercise on the bistable window). So a cell that has been switched on remains on after the signal is removed entirely. Biologically, irreversible switches implement commitments such as oocyte maturation or cell-fate determination.
:::
:::

::: exercise Interpreting single-cell data {level=3}
Cells carrying a fluorescent reporter of a positively autoregulated gene are grown at a fixed intermediate inducer concentration. One culture was started from fully induced cells and the other from uninduced cells. After 20 generations, the first culture is 85 % bright and the second 10 % bright, and each distribution is bimodal. (a) What does this show? (b) Why are the fractions not 100 % and 0 %? (c) Predict what happens over much longer times.
::: solution
(a) Bimodality and dependence on history are the signatures of bistability with hysteresis: at the same inducer concentration, both "on" and "off" states are stable, and each culture largely retains the state it started in. (b) Molecular noise ([[systems-biology/noise]]) occasionally kicks individual cells across the threshold — and cells near the edges of the bistable window have small basins. So some cells switch spontaneously in each direction. (c) In the long run the fractions converge to a stationary distribution set by the two switching rates, independent of history; the time to reach it can be very long if switching is rare (many generations), which is why history dependence is seen on experimental time scales.
:::
:::

::: exercise Delay and the period {level=3}
A transcriptional negative feedback loop is modelled by the delay equation $dx/dt = \beta/(1 + (x(t - T)/K)^n) - \alpha x$. Explain qualitatively why the oscillation period, when oscillations occur, is at least $2T$, and why circadian clocks with protein lifetimes of a few hours can have periods of 24 h.
::: solution
In each half-cycle the system must notice that it has overshot and reverse. A rise in $x$ only starts to suppress production after a delay $T$, during which $x$ keeps rising; then the suppression persists for at least $T$ after $x$ has fallen, during which $x$ keeps falling. So each half of the cycle lasts at least $T$, and the period is at least $2T$ (in fact typically about $2T$ to $4T$ depending on the removal rate). In circadian clocks the loop includes transcription, splicing, export, translation, a sequence of phosphorylations and regulated nuclear entry — each adding hours of delay — so the total delay is many hours even though each molecule turns over in a few hours, giving a 24-h period.
:::
:::
