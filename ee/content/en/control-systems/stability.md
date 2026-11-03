Turn up the gain of a position servo and its step response overshoots more and rings longer. Keep turning, and at some point the ringing no longer dies away: the motor shaft oscillates on its own, with the amplifier swinging between its supply rails, and the only way to stop it is to reduce the gain or switch off. The same thing happens to a power supply whose output capacitor has been changed, to an op-amp driving a long cable and to a levitated ball whose controller has the wrong sign. Each loop has become **unstable**. Stability is the first requirement of every feedback design, because an unstable loop has no useful performance at all.

This chapter makes stability precise. We define bounded-input bounded-output stability, show that for the rational transfer functions of [[control-systems/modelling-dynamic-systems]] it is decided by the signs of the real parts of the poles, and see how feedback moves those poles — sometimes into the right half-plane, sometimes out of it. Finding the roots of a high-order polynomial by hand is hard, so we then develop the **Routh–Hurwitz criterion**, which counts the right-half-plane roots from the coefficients alone, and use it to find the range of gains for which a loop is stable and the frequency at which it oscillates at the limit. The graphical methods of the following chapters — root locus and Nyquist — answer the same question in ways that also guide design.

## Bounded-input bounded-output stability

::: definition BIBO stability {#def-bibo}
A system is **bounded-input bounded-output (BIBO) stable** if every bounded input produces a bounded output: whenever $\abs{u(t)} \le M$ for all $t$, there is a constant $B$ with $\abs{y(t)} \le B$ for all $t$.
:::

For an LTI system with impulse response $g(t)$ the output is the convolution $y(t) = \int_0^\infty g(\tau)u(t - \tau)\,\dd\tau$ ([[signals-systems/convolution]]), and BIBO stability becomes a condition on $g$ alone.

::: theorem BIBO stability of LTI systems {#thm-bibo}
A causal LTI system is BIBO stable if and only if its impulse response is absolutely integrable, $\int_0^\infty\abs{g(t)}\,\dd t < \infty$. If its transfer function $G(s)$ is rational and proper, this holds if and only if every pole of $G$ has a strictly negative real part.
:::

::: proof
*Sufficiency.* If $\abs{u} \le M$, then $\abs{y(t)} \le \int_0^\infty\abs{g(\tau)}\,\abs{u(t - \tau)}\,\dd\tau \le M\int_0^\infty\abs{g}\,\dd\tau$, which is a bound $B$.

*Necessity.* Suppose $\int_0^\infty\abs{g} = \infty$. Fix $t$ and choose the bounded input $u(t - \tau) = \operatorname{sgn}g(\tau)$ for $0 \le \tau \le t$. Then $y(t) = \int_0^t\abs{g(\tau)}\,\dd\tau$, which can be made as large as we like by taking $t$ large. So no single bound $B$ works.

*Rational case.* Partial fractions write a proper rational $G$ as a constant plus terms $c/(s - p)^k$, whose inverse transforms are $c\,t^{k-1}e^{pt}/(k-1)!$ (plus an impulse from the constant, which is harmless). If $\operatorname{Re}p < 0$, each term is absolutely integrable, because the exponential decay beats any power of $t$. If $\operatorname{Re}p \ge 0$, the term does not decay and its integral diverges; since terms belonging to different poles cannot cancel one another, $g$ is then not absolutely integrable.
:::

A pole on the imaginary axis is the borderline case. A single pole at $s = 0$, an integrator, produces a ramp from a step; a pair of poles at $\pm j\omega_0$ produces a growing response $t\sin\omega_0t$ from an input at $\omega_0$. Neither system is BIBO stable, although their impulse responses stay bounded.

::: definition Marginal stability {#def-marginal}
A system whose poles all have $\operatorname{Re}p \le 0$, with those on the imaginary axis all simple, is **marginally stable**: its natural response stays bounded but does not decay, and some bounded inputs produce unbounded outputs. A system with any pole in the right half-plane, or a repeated pole on the imaginary axis, is **unstable**.
:::

The integrator is marginally stable, which is perfectly acceptable for a *plant* (a motor's shaft angle is the integral of its speed) and a deliberate feature of many *controllers*. What must be stable is the closed loop.

::: warning Stability is a property of the system, not of a response
A step response that happens to stay bounded does not prove stability: an unstable mode may simply not have been excited, or its residue may be zero for that particular input. Conversely, the closed-loop transfer function from $r$ to $y$ is not the whole story. If a controller cancels an unstable plant pole with a zero — say $C(s) = (s - 44.3)/(s + 100)$ for the levitator of [[control-systems/modelling-dynamic-systems#ex-maglev]] — the transfer function from $r$ to $y$ may look stable, while the transfer function from a disturbance at the plant input to $y$ still contains $e^{44.3t}$. The smallest disturbance, or a cancellation that is not exact, makes the ball fall. A loop is **internally stable** only if every transfer function between any injected signal and any internal signal is stable; in practice, never cancel a right-half-plane pole or zero.
:::

## Closed-loop poles

For a loop with forward transfer function $C(s)G(s)$ and sensor $H(s)$, write the loop gain as a ratio of polynomials, $L(s) = C(s)G(s)H(s) = N(s)/D(s)$. Then

$$
\frac{Y(s)}{R(s)} = \frac{C(s)G(s)}{1 + L(s)},
$$

and, provided no factors cancel between $N$ and $D$, its poles are the roots of the **closed-loop characteristic polynomial**

$$
\Delta(s) = D(s) + N(s).
$$ {#eq-char-poly}

The open-loop poles are the roots of $D$, the closed-loop poles the roots of $D + N$. Feedback therefore moves poles, which means it can destabilise a stable plant (a high gain on a plant with three or more poles) or stabilise an unstable one.

::: example Stabilising the levitator {#ex-maglev-pd}
The linearised levitator of [[control-systems/modelling-dynamic-systems#ex-maglev]] has $\Delta Y/\Delta I = -19.62/(s^2 - 1962)$. (a) Show that a proportional controller $\delta i = K_p\,\delta y$ cannot make the loop stable. (b) A proportional-derivative controller $\delta i = K_p\,\delta y + K_d\,\dot{\delta y}$ is used instead. Find $K_p$ and $K_d$ that place the closed-loop poles at $\omega_n = 100\,\mathrm{rad/s}$ with $\zeta = 0.7$.
::: solution
The controller acts on the measured gap with a positive sign because the plant gain is negative: more current reduces the gap, so when the ball drops ($\delta y > 0$) the current must rise. The loop equation is $(s^2 - 1962)\Delta Y = -19.62\,\Delta I$ with $\Delta I = (K_p + K_ds)\Delta Y$ (plus any reference), so

$$
\Delta(s) = s^2 + 19.62K_d\,s + (19.62K_p - 1962).
$$

(a) With $K_d = 0$ the polynomial is $s^2 + (19.62K_p - 1962)$. For $K_p < 100\,\mathrm{A/m}$ it has a positive real root; for $K_p > 100\,\mathrm{A/m}$ its roots are $\pm j\sqrt{19.62K_p - 1962}$, on the imaginary axis. The best proportional control can do is make the ball oscillate for ever: a second-order polynomial needs *both* coefficients positive, and nothing in the loop supplies damping.

(b) Matching $\Delta(s) = s^2 + 2\zeta\omega_ns + \omega_n^2 = s^2 + 140s + 10\,000$:

$$
K_d = \frac{140}{19.62} = 7.14\,\mathrm{A\,s/m},\qquad K_p = \frac{10\,000 + 1962}{19.62} = 610\,\mathrm{A/m}.
$$

That is $0.61\,\mathrm{A}$ of current per millimetre of gap error, plus $7.1\,\mathrm{mA}$ per $\mathrm{mm/s}$ of velocity. The derivative term — in practice a lead network — provides the damping. Note that $K_p$ must exceed $100\,\mathrm{A/m}$ just to overcome the "negative spring" of the magnet.
:::
:::

::: widget phaseplane
f: y
g: x - p*x - d*y
x: -2, 2
y: -3, 3
sliders: p=0.5:0:3:0.05; d=0:0:2:0.05
caption: The levitator in normalised units: $x$ is the gap error and $y$ its rate of change, with time in units of $1/44.3\,\mathrm{s}$, so the open-loop plant is $\ddot x = x - u$. The controller is $u = px + d\dot x$. With $p < 1$ the origin is a saddle and trajectories run away; raise $p$ above $1$ with $d = 0$ and they become closed orbits — marginal stability; then add derivative gain $d$ and the orbits become inward spirals. Click to start trajectories.
:::

## The Routh–Hurwitz criterion

For a third- or higher-order loop the roots of $\Delta(s)$ have no convenient formula, and we usually care less about where they are than about whether any of them lie in the right half-plane — and for which values of a gain. In 1877 Edward Routh found a way to count them from the coefficients alone.

A quick necessary condition comes first.

::: proposition Positive coefficients are necessary {#prop-positive}
If all roots of $\Delta(s) = a_ns^n + a_{n-1}s^{n-1} + \dots + a_0$ (with $a_n > 0$) have negative real parts, then every coefficient $a_k$ is strictly positive. For $n \le 2$ the condition is also sufficient.
:::

::: proof
Factor $\Delta(s) = a_n\prod(s + \alpha_i)\prod(s^2 + 2\sigma_ks + \sigma_k^2 + \omega_k^2)$, a real factor $s + \alpha_i$ for each real root $-\alpha_i$ and a quadratic for each complex pair $-\sigma_k \pm j\omega_k$. If every root is in the left half-plane, all $\alpha_i$ and $\sigma_k$ are positive, so every factor has positive coefficients, and so does their product: no coefficient can vanish or become negative. For $n = 2$, $a_2s^2 + a_1s + a_0$ with all coefficients positive has roots with real part $-a_1/(2a_2) < 0$ if complex, and two negative roots if real (their sum $-a_1/a_2$ is negative and their product $a_0/a_2$ positive).
:::

So a missing or negative coefficient proves instability at once. Positive coefficients do not prove stability from third order upwards: $s^3 + 2s^2 + 3s + 10$ has all coefficients positive and two roots at $0.22 \pm 2.01j$.

::: algorithm Routh array {#alg-routh}
For $\Delta(s) = a_ns^n + a_{n-1}s^{n-1} + \dots + a_0$:

1. Write the coefficients in two rows: row $s^n$ holds $a_n, a_{n-2}, a_{n-4}, \dots$ and row $s^{n-1}$ holds $a_{n-1}, a_{n-3}, \dots$ (pad with zeros).
2. Compute each further row from the two rows above it. If those rows are $\alpha_1, \alpha_2, \alpha_3, \dots$ and $\beta_1, \beta_2, \beta_3, \dots$, the new row is
$$
\gamma_k = \frac{\beta_1\alpha_{k+1} - \alpha_1\beta_{k+1}}{\beta_1}, \qquad k = 1, 2, \dots
$$
3. Continue down to row $s^0$; the array has $n + 1$ rows. Any row may be multiplied by a positive constant to simplify the arithmetic.
:::

::: theorem Routh–Hurwitz criterion {#thm-routh}
If no element of the first column of the Routh array is zero, the number of roots of $\Delta(s)$ with positive real part equals the number of sign changes in the first column, and there are no roots on the imaginary axis. In particular, all roots lie in the open left half-plane if and only if every element of the first column has the same sign.
:::

::: proof
(Sketch.) Write $\Delta(s) = E(s) + O(s)$, the parts with even and odd powers, and note that the first two rows of the array are the coefficients of $E$ and $O$. One step of the array replaces the pair $(E, O)$ of degree $n$ by a pair $(O, E - (\alpha_1/\beta_1)sO)$ of degree $n - 1$ — the first step of a continued-fraction expansion of $E/O$. On the imaginary axis $E(j\omega)$ is real and $O(j\omega)$ imaginary, and a polynomial with all roots in the left half-plane has a phase that increases monotonically by $n\pi/2$ as $\omega$ runs from $0$ to $\infty$, which forces the real and imaginary parts to vanish alternately. One shows that this interlacing property is preserved by each step exactly when the leading coefficients keep their sign, and that each sign change in the first column corresponds to one root crossing into the right half-plane. Complete proofs, via the Cauchy index or the Hurwitz determinants, are in Gantmacher's *Theory of Matrices*, vol. 2, and in Franklin, Powell and Emami-Naeini.
:::

For the cubic $a_3s^3 + a_2s^2 + a_1s + a_0$ the array is

| row | | |
|---|---|---|
| $s^3$ | $a_3$ | $a_1$ |
| $s^2$ | $a_2$ | $a_0$ |
| $s^1$ | $\dfrac{a_2a_1 - a_3a_0}{a_2}$ | $0$ |
| $s^0$ | $a_0$ | |

so with $a_3 > 0$ the cubic is stable exactly when $a_2, a_1, a_0 > 0$ and $a_2a_1 > a_3a_0$. This one condition — "the product of the inner coefficients exceeds the product of the outer ones" — is worth remembering.

::: example Counting right-half-plane roots {#ex-routh-count}
How many roots of $\Delta(s) = s^4 + 2s^3 + 3s^2 + 4s + 5$ lie in the right half-plane?
::: solution
All coefficients are positive, so the necessary condition gives no verdict. The Routh array:

| row | | | |
|---|---|---|---|
| $s^4$ | $1$ | $3$ | $5$ |
| $s^3$ | $2$ | $4$ | $0$ |
| $s^2$ | $\frac{2\cdot3 - 1\cdot4}{2} = 1$ | $\frac{2\cdot5 - 1\cdot0}{2} = 5$ | |
| $s^1$ | $\frac{1\cdot4 - 2\cdot5}{1} = -6$ | $0$ | |
| $s^0$ | $5$ | | |

The first column $1, 2, 1, -6, 5$ changes sign twice ($1 \to -6$ and $-6 \to 5$), so two roots lie in the right half-plane. Numerically the roots are $-1.29 \pm 0.86j$ and $0.29 \pm 1.42j$.
:::
:::

### Special cases

Two things can interrupt the array.

**A zero in the first column, with the rest of its row not all zero.** Replace the zero by a small positive number $\varepsilon$, complete the array, and count the sign changes as $\varepsilon \to 0^+$. For $s^4 + s^3 + 2s^2 + 2s + 3$ the $s^2$ row is $(0, 3)$; with $\varepsilon$ in place of the zero, the $s^1$ entry is $(2\varepsilon - 3)/\varepsilon \to -\infty$, so the first column reads $1, 1, \varepsilon, -, 3$: two sign changes, two right-half-plane roots (they are $0.41 \pm 1.29j$).

**A whole row of zeros.** This happens when $\Delta(s)$ has a factor whose roots are symmetric about the origin — pairs $\pm a$, pairs $\pm j\omega$, or quadruples $\pm a \pm jb$. The row above the zero row holds the coefficients of this factor, the **auxiliary polynomial** $A(s)$, which contains only even powers. Replace the zero row by the coefficients of $\dd A/\dd s$ and continue. Sign changes below the auxiliary row count right-half-plane roots of $A$; roots of $A$ on the imaginary axis are found by solving $A(s) = 0$.

::: example A row of zeros and an oscillation {#ex-routh-zero-row}
Analyse $\Delta(s) = s^4 + 3s^3 + 6s^2 + 12s + 8$.
::: solution
The array starts

| row | | | |
|---|---|---|---|
| $s^4$ | $1$ | $6$ | $8$ |
| $s^3$ | $3$ | $12$ | |
| $s^2$ | $\frac{18 - 12}{3} = 2$ | $8$ | |
| $s^1$ | $\frac{24 - 24}{2} = 0$ | | |

The $s^1$ row is entirely zero, so the auxiliary polynomial is $A(s) = 2s^2 + 8$ from the $s^2$ row. Its derivative is $4s$; replacing the zero row by $4$ and continuing gives an $s^0$ row of $8$. The first column $1, 3, 2, 4, 8$ has no sign changes, so there are no right-half-plane roots, but $A(s) = 0$ gives two roots at $s = \pm2j$ on the imaginary axis. Dividing, $\Delta(s) = (s^2 + 4)(s^2 + 3s + 2) = (s^2 + 4)(s + 1)(s + 2)$. The system is marginally stable and would sustain an oscillation at $2\,\mathrm{rad/s}$.
:::
:::

## The range of stable gains

The most common use of the Routh array in design is to find the gains for which a loop is stable. At the edge of the stable range a pair of closed-loop poles sits on the imaginary axis, which shows up as a row of zeros; the auxiliary polynomial then gives the frequency at which the loop oscillates.

::: example A position servo with a slow power amplifier {#ex-servo-range}
The position servo of [[control-systems/time-response#ex-servo]] is driven by a power amplifier with gain $K_a$ and a bandwidth pole at $200\,\mathrm{rad/s}$, so that its loop gain is

$$
L(s) = K_a\,\frac{200}{s + 200}\cdot\frac{1250}{s(s + 63)} = \frac{250\,000\,K_a}{s(s + 63)(s + 200)},
$$

where $K_m/\tau = 19.84/0.01587 = 1250$ and $1/\tau = 63\,\mathrm{s^{-1}}$. Find the range of $K_a$ for stability and the frequency of oscillation at the limit. What happens to the design $K_a = 2.27\,\mathrm{V/rad}$, which gave $10\,\%$ overshoot without the amplifier pole?
::: solution
The characteristic polynomial is $s(s + 63)(s + 200) + 250\,000K_a = s^3 + 263s^2 + 12\,600s + 250\,000K_a$. By the cubic condition the loop is stable if and only if

$$
0 < 250\,000K_a < 263\times12\,600 = 3.314\times10^6, \qquad\text{that is}\qquad 0 < K_a < 13.3\,\mathrm{V/rad}.
$$

At $K_a = 13.3$ the $s^1$ row vanishes and the auxiliary polynomial is $263s^2 + 250\,000K_a = 263(s^2 + 12\,600)$, with roots $s = \pm j\sqrt{12\,600} = \pm112\,j$. The servo then oscillates at $112\,\mathrm{rad/s}$, about $18\,\mathrm{Hz}$.

The design gain $2.27$ is well inside the stable range (a **gain margin** of $13.3/2.27 = 5.8$, or $15\,\mathrm{dB}$). But the closed-loop poles are now $-217$ and $-23.0 \pm 45.7j$: the dominant pair has $\zeta = 23.0/51.1 = 0.45$ instead of $0.59$, and the simulated overshoot is $19.9\,\%$ instead of $10\,\%$. A pole ignored in the *plant model* is not harmless just because it is fast: it adds phase lag around the loop and reduces the damping.
:::
:::

::: widget complexmap
f: 1/(z^3 + 263*z^2 + 12600*z + 250000*K)
mode: domain
x: -280, 40
y: -160, 160
sliders: K=2.27:0.2:16:0.01
caption: Domain colouring of the closed-loop transfer function of [[#ex-servo-range]] over the $s$-plane, with the amplifier gain $K = K_a$ on the slider. The three closed-loop poles are the points where all the colours meet: one on the far left, near $-217$, and a complex pair. Raise $K$ and the pair moves towards the imaginary axis, crossing it at $\pm112\,j$ when $K$ passes $13.3$ — the limit found with the Routh array.
:::

::: quiz
For which values of $K$ is the polynomial $s^3 + 5s^2 + 4s + K$ stable?
- [ ] All $K > 0$
- [x] $0 < K < 20$
- [ ] $0 < K < 4$
- [ ] $K > 20$
::: solution
By the cubic condition, the coefficients must be positive ($K > 0$) and $5\times4 > 1\times K$, so $0 < K < 20$. At $K = 20$ the auxiliary polynomial $5s^2 + 20$ gives an oscillation at $2\,\mathrm{rad/s}$.
:::
:::

### Relative stability

A loop that is barely stable is useless: its poles are close to the imaginary axis, so it rings and settles slowly. A stronger requirement is that every closed-loop pole lies to the left of the line $\operatorname{Re}s = -\sigma_0$, which by [[control-systems/time-response]] bounds the settling time by roughly $4/\sigma_0$. The Routh test checks this too: substitute $s = p - \sigma_0$ and apply the array to the polynomial in $p$. Roots with $\operatorname{Re}p < 0$ are exactly roots with $\operatorname{Re}s < -\sigma_0$.

::: example Keeping the poles left of a line {#ex-relative}
For the servo of [[#ex-servo-range]], find the range of $K_a$ for which every closed-loop pole has real part less than $-10\,\mathrm{s^{-1}}$.
::: solution
Substitute $s = p - 10$ into $s^3 + 263s^2 + 12\,600s + 250\,000K_a$. Expanding, $s^3 = p^3 - 30p^2 + 300p - 1000$, $263s^2 = 263p^2 - 5260p + 26\,300$ and $12\,600s = 12\,600p - 126\,000$, so

$$
p^3 + 233p^2 + 7640p + (250\,000K_a - 100\,700).
$$

The cubic condition requires $250\,000K_a > 100\,700$ and $233\times7640 > 250\,000K_a - 100\,700$, that is

$$
0.403 < K_a < 7.52\,\mathrm{V/rad}.
$$

At the lower limit a real pole sits at $-10$ (the slow real pole of a lightly loaded loop); at the upper limit the complex pair has real part $-10$, at $-10 \pm 87.4j$. Within this range the settling time is below about $0.4\,\mathrm{s}$.
:::
:::

::: application Why an op-amp follower can oscillate
An op-amp with three poles behaves exactly like the servo above: the characteristic polynomial of the follower is a cubic whose constant term grows with the loop gain, and the Routh condition sets a maximum loop gain. For three equal poles, $(1 + s/\omega_p)^3 + A_0\beta = 0$ is stable only for $A_0\beta < 8$ ([[#exr-three-poles]]), which is why uncompensated multi-stage amplifiers oscillate when wrapped in heavy feedback and why integrated op-amps are compensated to behave like single-pole amplifiers ([[electronics-2/stability-compensation]]).
:::

::: history
James Clerk Maxwell, in "On governors" (1868), derived stability conditions for third-order characteristic equations and asked for a general criterion. Edward Routh answered in his Adams Prize essay *A Treatise on the Stability of a Given State of Motion* (1877), giving the tabular test used here. In 1895 the mathematician Adolf Hurwitz, asked by the engineer Aurel Stodola to analyse a turbine governor, independently derived the same conditions in the form of determinants, now called Hurwitz determinants. In 1892 Aleksandr Lyapunov published his thesis on the stability of motion, whose methods apply also to nonlinear systems and became central to control theory in the mid-twentieth century.
:::

## Where this leads

The Routh array tells us whether a loop is stable and for which gains, but not how the poles move in between or what to change if the answer is unsatisfactory. The [[control-systems/root-locus]] draws the whole path of the closed-loop poles as a gain varies, and its crossing of the imaginary axis is the Routh limit found above. [[control-systems/frequency-response-methods]] decides stability from the loop's frequency response instead, which works with measured data and with time delays, for which the characteristic equation is not a polynomial. State-space models in [[control-systems/state-space-models]] express the same condition as "all eigenvalues of $A$ in the left half-plane".

::: summary
- A system is BIBO stable if bounded inputs give bounded outputs; for a rational transfer function this means every pole has a negative real part.
- Simple poles on the imaginary axis give marginal stability: bounded natural response, but unbounded response to some bounded inputs.
- Closed-loop poles are the roots of $D(s) + N(s)$ for a loop gain $N/D$; feedback can stabilise unstable plants and destabilise stable ones.
- Never cancel a right-half-plane pole or zero: the loop must be internally stable.
- All coefficients of a stable polynomial are positive; this suffices only up to second order. A cubic $a_3s^3 + a_2s^2 + a_1s + a_0$ is stable iff all coefficients are positive and $a_2a_1 > a_3a_0$.
- The number of sign changes in the first column of the Routh array is the number of right-half-plane roots; a row of zeros signals roots symmetric about the origin, given by the auxiliary polynomial.
- At the limit of stable gain the auxiliary polynomial gives the oscillation frequency; substituting $s = p - \sigma_0$ tests relative stability.
:::

## Exercises

::: exercise Positive coefficients are not enough {level=1}
Use the Routh array to show that $s^3 + 2s^2 + 3s + 10$ is unstable, and say how many roots lie in the right half-plane.
::: solution
The array has first column $1, 2, (2\cdot3 - 1\cdot10)/2 = -2, 10$. Two sign changes: two roots in the right half-plane (they are $0.22 \pm 2.01j$; the third is $-2.45$). The cubic condition fails because $2\times3 < 10$.
:::
:::

::: exercise A missing sign {level=1}
Without computing any roots, decide whether $s^4 + 3s^3 - s^2 + 2s + 1$ is stable.
::: solution
It is not: a stable polynomial has all coefficients positive ([[#prop-positive]]), and this one has a negative coefficient. (Its roots include $0.40 \pm 0.79j$.)
:::
:::

::: exercise Maximum gain {level=1 check="60"}
A unity-feedback loop has $L(s) = K/[(s + 1)(s + 2)(s + 3)]$. Find the largest $K$ for which it is stable.
::: solution
$\Delta(s) = s^3 + 6s^2 + 11s + 6 + K$. The cubic condition requires $6\times11 > 6 + K$, so $K < 60$ (and $K > -6$). At $K = 60$ the auxiliary polynomial is $6s^2 + 66$, giving an oscillation at $\sqrt{11} = 3.32\,\mathrm{rad/s}$.
:::
:::

::: exercise A marginally stable polynomial {level=2}
Use the Routh array to find all roots of $s^4 + s^3 + 5s^2 + 4s + 4$ on the imaginary axis and decide whether any lie in the right half-plane.
::: solution
Rows: $s^4$: $1, 5, 4$; $s^3$: $1, 4$; $s^2$: $1, 4$; $s^1$: $0$ — a row of zeros. The auxiliary polynomial is $s^2 + 4$, with derivative $2s$; the completed first column $1, 1, 1, 2, 4$ has no sign changes. So there are no right-half-plane roots and two roots at $\pm2j$. Indeed $\Delta(s) = (s^2 + 4)(s^2 + s + 1)$.
:::
:::

::: exercise BIBO or not? {level=2}
Decide whether each system is BIBO stable, and if not, give a bounded input that produces an unbounded output: (a) $1/s$; (b) $s/(s^2 + 4)$; (c) $(s - 1)/(s^2 + 3s + 2)$; (d) $e^{-0.1s}/(s + 1)$.
::: solution
(a) Not stable: a unit step gives the ramp $t$. (b) Not stable: poles at $\pm2j$; the input $\cos2t$ gives $Y = s^2/(s^2 + 4)^2$, whose inverse transform contains $\tfrac12t\cos2t$, growing without bound. (c) Stable: poles at $-1$ and $-2$; the right-half-plane zero affects the shape of the response, not its boundedness. (d) Stable: a time delay shifts the impulse response $e^{-t}$ by $0.1\,\mathrm{s}$ without changing its integral.
:::
:::

::: exercise Levitator with a slow current amplifier {level=2}
In [[#ex-maglev-pd]] the current does not follow its command instantly: the amplifier has transfer function $200/(s + 200)$ from commanded to actual current. With the PD gains found there ($K_p = 610\,\mathrm{A/m}$, $K_d = 7.14\,\mathrm{A\,s/m}$), write the closed-loop characteristic polynomial and decide whether the loop is still stable.
::: solution
The loop is $(s^2 - 1962)(s + 200) + 200\times19.62\,(K_p + K_ds) = 0$. Expanding: $s^3 + 200s^2 - 1962s - 392\,400 + 3924K_ds + 3924K_p = s^3 + 200s^2 + 26\,056s + 2\,001\,240$. All coefficients are positive and $200\times26\,056 = 5.21\times10^6 > 2.00\times10^6$, so the loop is still stable. The roots are about $-121$ and $-39 \pm 122j$, so the damping ratio of the dominant pair has fallen from $0.7$ to about $0.31$: like the servo of [[#ex-servo-range]], a neglected amplifier pole costs damping.
:::
:::

::: exercise Relative stability of a cubic {level=2}
For $\Delta(s) = s^3 + 6s^2 + 11s + 6 + K$, find the range of $K$ for which all roots have real part less than $-1$.
::: solution
Substitute $s = p - 1$: $(p - 1)^3 + 6(p - 1)^2 + 11(p - 1) + 6 + K = p^3 + 3p^2 + 2p + K$. The cubic condition requires $K > 0$ and $3\times2 > K$: so $0 < K < 6$. At $K = 6$ the roots are $-4$ and $-1 \pm 1.41j$, on the boundary.
:::
:::

::: exercise Three identical poles {#exr-three-poles level=3 check="8"}
An amplifier with $A(s) = A_0/(1 + s/\omega_p)^3$ is used with resistive feedback $\beta$. Using the Routh criterion, find the largest loop gain $A_0\beta$ for which the closed loop is stable, and the frequency of oscillation at that limit in terms of $\omega_p$.
::: solution
With $x = s/\omega_p$, the characteristic equation $(1 + x)^3 + A_0\beta = 0$ is $x^3 + 3x^2 + 3x + 1 + A_0\beta = 0$. The cubic condition requires $3\times3 > 1 + A_0\beta$, so $A_0\beta < 8$. At the limit the auxiliary polynomial is $3x^2 + 9$, so $x = \pm j\sqrt3$: the amplifier oscillates at $\omega = \sqrt3\,\omega_p$. This agrees with the phase-crossover argument of [[electronics-2/stability-compensation]].
:::
:::

::: exercise The Hurwitz conditions for a quartic {level=3}
(a) Derive, from the Routh array, necessary and sufficient conditions for $s^4 + a_3s^3 + a_2s^2 + a_1s + a_0$ to have all roots in the left half-plane. (b) Apply them to find the range of $K$ for which a unity-feedback loop with $L(s) = K(s + 1)/[s(s - 1)(s + 6)]$ is stable — a loop around an unstable plant.
::: hint
In (a) the first column is $1$, $a_3$, $b_1 = (a_3a_2 - a_1)/a_3$, $c_1 = (b_1a_1 - a_3a_0)/b_1$ and $a_0$.
:::
::: solution
(a) The array has rows $(1, a_2, a_0)$, $(a_3, a_1)$, $(b_1, a_0)$ with $b_1 = (a_3a_2 - a_1)/a_3$, then $c_1 = a_1 - a_3^2a_0/(a_3a_2 - a_1)$ and $a_0$. All must be positive: $a_3 > 0$, $a_0 > 0$, $a_3a_2 > a_1$, and $a_1(a_3a_2 - a_1) > a_3^2a_0$. (The last implies $a_1 > 0$, and with $a_3a_2 > a_1$ also $a_2 > 0$.)

(b) This loop is third order: $\Delta(s) = s(s - 1)(s + 6) + K(s + 1) = s^3 + 5s^2 + (K - 6)s + K$. The cubic condition requires $K - 6 > 0$, $K > 0$ and $5(K - 6) > K$, so $K > 7.5$. Unlike the earlier examples, here there is a *minimum* gain: the unstable plant pole is pulled into the left half-plane only when the feedback is strong enough. At $K = 7.5$ the auxiliary polynomial $5s^2 + 7.5$ gives an oscillation at $1.22\,\mathrm{rad/s}$.
:::
:::
