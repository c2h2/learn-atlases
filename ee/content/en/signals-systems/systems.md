A guitar pedal, a telephone line, a car's suspension, a moving-average filter in a spreadsheet and a loudspeaker all do the same kind of thing: they take a signal in and produce a signal out. Engineers call each of them a **system**, and much of the craft of electrical engineering consists of describing systems in a way that predicts what they will do to signals they have never seen. A loudspeaker that is fed a pure tone at $1\,\mathrm{kHz}$ and a pure tone at $2\,\mathrm{kHz}$ and responds well to each will also respond well to the sum, *provided* it is linear; a measurement made today will still hold tomorrow *provided* the system is time-invariant. Properties like these are what make a system predictable from a few measurements.

Below we define the basic properties, memory, causality, invertibility, stability, linearity and time invariance, and shows how to test a system for each from its input–output description. It closes with the three ways systems are connected, in series, in parallel and in feedback, and with an example of why feedback is the most powerful of them. The two properties that matter most are linearity and time invariance: systems that have both are called LTI systems, and the rest of the course is about them.

## Describing a system {#sec-describe}

::: definition System {#def-system}
A **continuous-time system** is a rule $T$ that assigns to each input signal $x(t)$ an output signal $y(t)$; we write $y = T\{x\}$ or $x(t) \to y(t)$. A **discrete-time system** does the same for sequences, $x[n] \to y[n]$. A system may also have an internal **state** (for example capacitor voltages) whose initial value affects the output; unless stated otherwise we assume the system is **initially at rest**, meaning that if $x$ is zero up to some time then so is $y$.
:::

The rule can be given in many forms: an explicit formula, a differential or difference equation, a circuit, a block diagram or a program. Several systems recur in this course, and it is worth fixing them now.

| system | input–output relation | where it arises |
|---|---|---|
| ideal amplifier | $y(t) = Kx(t)$ | op-amp stage in its linear range |
| ideal delay | $y(t) = x(t - t_0)$, $y[n] = x[n - n_0]$ | cable, memory register |
| RC low-pass | $RC\,y'(t) + y(t) = x(t)$ | anti-aliasing filter, interconnect |
| differentiator | $y(t) = x'(t)$ | ideal inductor: $v = L\,\dd i/\dd t$ |
| integrator | $y(t) = \int_{-\infty}^{t} x(\tau)\,\dd\tau$ | ideal capacitor: $v = \frac1C\int i\,\dd t$ |
| accumulator | $y[n] = \sum_{k=-\infty}^{n} x[k]$ | running total, bank balance |
| moving average | $y[n] = \frac1M\sum_{k=0}^{M-1} x[n - k]$ | smoothing, sensor filtering |
| modulator | $y(t) = x(t)\cos(\omega_c t)$ | AM transmitter, mixer |
| squarer | $y(t) = x^2(t)$ | power meter, diode detector |
| clipper | $y(t) = \max(-V, \min(V, x(t)))$ | amplifier at its supply rails |

A **block diagram** draws a system as a box with an input arrow and an output arrow, so that large systems can be assembled from small ones. The boxes are connected by adders (circles with a $+$), gains (triangles) and, in discrete time, unit delays (boxes labelled $z^{-1}$ or $D$). The difference equation $y[n] = 0.5y[n-1] + x[n]$, for example, is an adder whose second input is the output delayed by one sample and multiplied by $0.5$.

## Memory, causality and invertibility {#sec-memory}

::: definition Memoryless, causal and invertible systems {#def-memory-causal}
A system is **memoryless** if $y$ at each time depends only on $x$ at the same time. It is **causal** if $y$ at each time depends only on $x$ at the same and earlier times; equivalently, if two inputs agree up to time $t_0$, the outputs also agree up to $t_0$. It is **invertible** if distinct inputs always give distinct outputs, so that a system $T^{-1}$ exists with $T^{-1}\{T\{x\}\} = x$ for every $x$.
:::

Every memoryless system is causal. The amplifier, squarer, clipper and modulator are memoryless; the delay, RC circuit, integrator, accumulator and moving average have memory. Physical systems operating in real time are causal: no circuit responds to an input before it arrives. But causality is not a law of nature for signal processing in general. An image filter can use pixels to the left and right, and a recording can be processed offline with a non-causal smoother such as the centred average $y[n] = \tfrac13(x[n-1] + x[n] + x[n+1])$, which uses one future sample.

A delay $y(t) = x(t - t_0)$ is causal if $t_0 \ge 0$; with $t_0 < 0$ it is a predictor and is not causal. A subtle case is $y(t) = x(-t)$: for $t < 0$ the output depends on the future input $x(-t)$ with $-t > t$, so time reversal is not causal, although for $t > 0$ it uses only the past.

Invertibility asks whether information is lost. The amplifier $y = Kx$ with $K \ne 0$ is inverted by $y/K$. The accumulator is inverted by the first difference, $x[n] = y[n] - y[n-1]$. The squarer is not invertible, since $x$ and $-x$ give the same output; nor is $y[n] = x[2n]$, which discards the odd samples. In communications the receiver must invert the channel (an **equaliser**), and the first question is whether the channel is invertible at all.

::: example Classifying four systems {#ex-classify}
Decide whether each system is memoryless, causal and invertible: (a) $y(t) = 3x(t) + 1$; (b) $y[n] = x[n] - x[n-1]$; (c) $y(t) = x(t + 1)$; (d) $y(t) = \cos(x(t))$.
::: solution
(a) Memoryless (only $x(t)$ appears), hence causal. Invertible: $x(t) = (y(t) - 1)/3$.

(b) Has memory (needs $x[n-1]$), causal (no future samples). Not invertible: adding a constant to $x$ does not change $y$, so $x[n] = 0$ and $x[n] = 1$ both give $y = 0$. (If we restrict to inputs that are initially at rest, the accumulator recovers $x$; the constant is the "constant of integration" lost by differencing.)

(c) Has memory and is not causal: $y(0) = x(1)$ depends on the future. Invertible by the delay $x(t) = y(t - 1)$.

(d) Memoryless and causal. Not invertible, since $x$ and $x + 2\pi$ give the same output.
:::
:::

## Stability {#sec-stability}

A system that is driven by a perfectly reasonable input should not produce an output that runs off to infinity. Loudspeakers that howl with feedback and amplifiers that oscillate violate this, and the first job of any designer is to avoid it.

::: definition BIBO stability {#def-bibo}
A signal is **bounded** if there is a finite $B$ with $\lvert x(t)\rvert \le B$ for all $t$. A system is **bounded-input bounded-output (BIBO) stable** if every bounded input produces a bounded output: for every $B_x$ there is a finite $B_y$ such that $\lvert x\rvert \le B_x$ implies $\lvert y\rvert \le B_y$.
:::

To prove stability you must bound $\lvert y\rvert$ for an arbitrary bounded input. To disprove it, one bounded input with an unbounded output suffices.

::: example Stable or not? {#ex-stability}
Test for BIBO stability: (a) the moving average $y[n] = \frac1M\sum_{k=0}^{M-1}x[n-k]$; (b) the accumulator; (c) $y(t) = e^{x(t)}$; (d) $y(t) = t\,x(t)$; (e) the RC low-pass $RC\,y' + y = x$ initially at rest.
::: solution
(a) If $\lvert x[n]\rvert \le B$ then $\lvert y[n]\rvert \le \frac1M\sum_{k=0}^{M-1}\lvert x[n-k]\rvert \le \frac1M\cdot MB = B$. Stable.

(b) The input $x[n] = u[n]$ is bounded by $1$, but $y[n] = \sum_{k=0}^{n}1 = n + 1$ for $n \ge 0$ grows without bound. Unstable. (An integrator is unstable for the same reason: a constant input produces a ramp.)

(c) $\lvert x\rvert \le B$ gives $e^{-B} \le y \le e^{B}$. Stable.

(d) The constant input $x(t) = 1$ gives $y(t) = t$, unbounded. Unstable, even though the system is memoryless.

(e) The solution initially at rest is $y(t) = \frac{1}{RC}\int_{-\infty}^{t} e^{-(t-\tau)/RC}x(\tau)\,\dd\tau$ (as you can check by substitution). If $\lvert x\rvert \le B$, then $\lvert y(t)\rvert \le \frac{B}{RC}\int_{-\infty}^{t}e^{-(t-\tau)/RC}\,\dd\tau = B$. Stable.
:::
:::

The RC result illustrates a theme of [[signals-systems/convolution]]: an LTI system is BIBO stable exactly when its impulse response, here $\frac{1}{RC}e^{-t/RC}u(t)$, is absolutely integrable. In [[signals-systems/laplace-transform]] the same condition becomes "all poles in the left half-plane".

## Linearity {#sec-linearity}

::: definition Linear system {#def-linear}
A system is **linear** if, for all inputs $x_1, x_2$ with outputs $y_1, y_2$ and all (real or complex) constants $a, b$,

$$
a\,x_1 + b\,x_2 \;\to\; a\,y_1 + b\,y_2 .
$$ {#eq-superposition}

This **superposition** property combines **additivity** ($x_1 + x_2 \to y_1 + y_2$) and **homogeneity** or scaling ($a\,x \to a\,y$).
:::

Superposition is what lets us break a hard input into easy pieces, find the response to each, and add. You used it in circuit analysis whenever you turned off all sources but one; it is the reason that [[signals-systems/fourier-series]] can treat a square wave as a sum of sinusoids and find the response of a filter one harmonic at a time.

::: proposition Zero in, zero out {#prop-zero}
A linear system maps the zero signal to the zero signal. Consequently a system whose output is non-zero for zero input is not linear.
:::

::: proof
Take any input $x$ with output $y$ and apply homogeneity with $a = 0$: the input $0\cdot x = 0$ produces $0\cdot y = 0$.
:::

So $y(t) = 3x(t) + 1$, whose graph of output against input is a straight line, is *not* linear in the system sense: zero input gives output $1$. Such a system is called **incrementally linear**: it is a linear system ($3x$) plus a response that does not depend on the input ($1$). The same structure appears in every circuit with initial conditions: the total response is the zero-state response, linear in the input, plus the zero-input response, set by the initial state. When we say that "the RC circuit is linear" we mean it with zero initial state.

::: warning A straight line is not a linear system
The test for linearity is superposition, [[#eq-superposition]], not the shape of a graph. Check additivity and homogeneity separately, and always try the zero input first: it disposes of offsets at once. Conversely, a system can be linear without being memoryless or simple, like the modulator $x(t)\cos\omega_c t$, whose output graph against $x$ is a line whose slope changes with time.
:::

::: example Testing for linearity {#ex-linear}
Which of these systems are linear? (a) $y(t) = t\,x(t)$; (b) $y(t) = x^2(t)$; (c) $y[n] = \operatorname{Re}\{x[n]\}$ for complex inputs; (d) $y(t) = x'(t) + 2x(t - 1)$.
::: solution
(a) For $x = ax_1 + bx_2$ the output is $t(ax_1 + bx_2) = a\,t x_1 + b\,t x_2 = ay_1 + by_2$. Linear (but, as we shall see, not time-invariant).

(b) $x = 2x_1$ gives $4x_1^2 = 4y_1 \ne 2y_1$. Homogeneity fails; not linear.

(c) Additivity holds: $\operatorname{Re}\{x_1 + x_2\} = \operatorname{Re}x_1 + \operatorname{Re}x_2$. Homogeneity fails for complex constants: with $x_1[n] = 1$ and $a = j$, the input $j$ gives $\operatorname{Re}\{j\} = 0$, while $a\,y_1 = j\cdot 1 = j$. So the system is not linear over complex signals, although it is linear if only real constants and signals are allowed. This is why the definition must state which constants are allowed.

(d) Differentiation and delay are both linear, and a sum of linear operations is linear: $(ax_1 + bx_2)' + 2(ax_1 + bx_2)(t - 1) = a\,y_1 + b\,y_2$. Linear.
:::
:::

::: quiz
An ideal integrator $y(t) = \int_{-\infty}^{t}x(\tau)\,\dd\tau$ is
- [ ] linear, time-invariant and BIBO stable
- [x] linear, time-invariant and not BIBO stable
- [ ] linear, time-varying and BIBO stable
- [ ] nonlinear and BIBO stable
::: solution
Integration is linear, and shifting the input shifts the integral by the same amount, so the integrator is LTI. The bounded input $u(t)$ produces the ramp $t\,u(t)$, which is unbounded, so it is not BIBO stable. This is why op-amp integrators always drift unless something (a reset switch or a large resistor across the capacitor) limits them.
:::
:::

No real system is linear for all inputs. An amplifier is linear only until its output reaches the supply rails, a loudspeaker only until its cone reaches the end of its travel. Linearity is a model, valid over a range of signal amplitudes; outside it the system **distorts**, and its response to a sinusoid contains harmonics that were not in the input. The figure shows a soft-clipping amplifier.

::: widget plot
f: tanh(2*A*sin(x)); 2*tanh(A*sin(x))
x: 0, 2pi
y: -2.2, 2.2
sliders: A=0.2:0.05:2:0.05
piticks: true
labels: T\{2x\}; 2\,T\{x\}
caption: A soft clipper $y = \tanh(x)$ driven by $x(t) = A\sin t$. The blue curve is the response to the doubled input $2x$, the orange curve is twice the response to $x$. For small $A$ they coincide and the clipper behaves linearly; increase $A$ and watch homogeneity fail as the blue curve flattens at $\pm1$. The flattened waveform is no longer a sinusoid: it contains odd harmonics, which is the audible distortion of an overdriven amplifier.
:::

## Time invariance {#sec-ti}

::: definition Time-invariant system {#def-ti}
A system is **time-invariant** if a time shift of the input causes the same time shift of the output: whenever $x(t) \to y(t)$, also $x(t - t_0) \to y(t - t_0)$ for every real $t_0$ (every integer $n_0$ in discrete time). A system that is not time-invariant is **time-varying**.
:::

Time invariance says that the system's behaviour does not depend on when you use it. The RC circuit with fixed $R$ and $C$ is time-invariant; the same circuit with a capacitor whose value drifts as it warms up is, strictly, time-varying.

To test it, compare two signals:

1. Apply the shifted input $x_2(t) = x(t - t_0)$ and compute its output $y_2(t)$ from the system rule.
2. Shift the original output: $y(t - t_0)$.

The system is time-invariant if $y_2(t) = y(t - t_0)$ for all inputs and shifts. The common error is in step 1: the system rule acts on the *input signal*, so every occurrence of $x$ in the rule is replaced by $x_2$, but explicit appearances of $t$ in the rule are left alone.

::: example Testing for time invariance {#ex-ti}
Which are time-invariant? (a) $y(t) = t\,x(t)$; (b) $y(t) = x(2t)$; (c) $y[n] = x[n] + x[n-1]$; (d) $y(t) = \sin(x(t))$; (e) $y(t) = x(t)\cos(\omega_c t)$.
::: solution
(a) The shifted input gives $y_2(t) = t\,x_2(t) = t\,x(t - t_0)$. The shifted output is $y(t - t_0) = (t - t_0)\,x(t - t_0)$. These differ, so the system is time-varying: the gain $t$ depends on when the input arrives.

(b) $y_2(t) = x_2(2t) = x(2t - t_0)$, while $y(t - t_0) = x(2(t - t_0)) = x(2t - 2t_0)$. They differ (for $t_0 \ne 0$): a delay of $t_0$ at the input becomes a delay of $t_0/2$ at the output. Time-varying.

(c) $y_2[n] = x[n - n_0] + x[n - 1 - n_0] = y[n - n_0]$. Time-invariant.

(d) $y_2(t) = \sin(x(t - t_0)) = y(t - t_0)$. Time-invariant (and memoryless, and nonlinear).

(e) $y_2(t) = x(t - t_0)\cos(\omega_c t)$, but $y(t - t_0) = x(t - t_0)\cos(\omega_c(t - t_0))$. Time-varying: the carrier does not shift with the message. Modulators are linear but time-varying, which is exactly why they can move a signal to a new frequency, something no LTI system can do.
:::
:::

::: widget plot
f: exp(-(2*x - c)^2); exp(-(2*(x - c))^2)
x: -3, 5
y: -0.1, 1.2
sliders: c=1:0:4:0.1
labels: T\{x(t-t_0)\}; y(t-t_0)
caption: The time-compressor $y(t) = x(2t)$ with $x(t) = e^{-t^2}$ and a delay $t_0$ set by the slider. Blue: the output when the *input* is delayed by $t_0$; it peaks at $t_0/2$. Orange: the original output delayed by $t_0$; it peaks at $t_0$. They coincide only for $t_0 = 0$, so the system is time-varying even though its rule contains no explicit $t$.
:::

::: quiz
The system $y[n] = x[-n]$ (time reversal) is
- [ ] linear and time-invariant
- [x] linear and time-varying
- [ ] nonlinear and time-invariant
- [ ] nonlinear and time-varying
::: solution
Linear: $a x_1[-n] + b x_2[-n]$ is the response to $a x_1 + b x_2$. Time-varying: the delayed input $x[n - n_0]$ gives $x[-n - n_0]$, while the delayed output is $y[n - n_0] = x[-(n - n_0)] = x[-n + n_0]$. A delay at the input becomes an *advance* at the output.
:::
:::

### LTI systems

::: definition LTI system {#def-lti}
A system that is both linear and time-invariant is a **linear time-invariant (LTI)** system.
:::

The idealised versions of the circuits of [[circuits-1]] and [[circuits-2]], with constant $R$, $L$, $C$, controlled sources and op-amps in their linear range, all start from rest and are LTI. So are the delay, differentiator, integrator, accumulator and moving average. The table collects the classification of the systems met so far.

| system | memoryless | causal | stable | linear | time-invariant |
|---|---|---|---|---|---|
| $Kx(t)$ | yes | yes | yes | yes | yes |
| $x(t - t_0)$, $t_0 > 0$ | no | yes | yes | yes | yes |
| $RC\,y' + y = x$ (at rest) | no | yes | yes | yes | yes |
| integrator / accumulator | no | yes | no | yes | yes |
| moving average | no | yes | yes | yes | yes |
| $x(t)\cos\omega_c t$ | yes | yes | yes | yes | no |
| $x^2(t)$ | yes | yes | yes | no | yes |
| $t\,x(t)$ | yes | yes | no | yes | no |
| $x(2t)$ | no | no | yes | yes | no |
| $3x(t) + 1$ | yes | yes | yes | no | yes |

The reason LTI systems deserve a whole course is the result of the next lesson: an LTI system is completely determined by one signal, its response to a unit impulse, and its response to any input is a convolution with that signal.

## Interconnections of systems {#sec-interconnection}

Large systems are built from small ones in three basic ways.

- **Series (cascade):** the output of $T_1$ is the input of $T_2$, so $y = T_2\{T_1\{x\}\}$. A receiver is a cascade of an amplifier, a mixer, a filter and a demodulator. For LTI systems the order of a cascade does not matter (proved in [[signals-systems/convolution]]); for nonlinear or time-varying ones it usually does.
- **Parallel:** the same input feeds $T_1$ and $T_2$ and the outputs are added, $y = T_1\{x\} + T_2\{x\}$. A loudspeaker crossover splits the signal into parallel bass and treble paths.
- **Feedback:** the output is fed back through $T_2$ and subtracted from the input, so that $T_1$ is driven by the **error** $e = x - T_2\{y\}$.

For memoryless gains the feedback connection can be solved at once. With forward gain $A$ and feedback gain $\beta$, $y = Ae$ and $e = x - \beta y$, so $y = A(x - \beta y)$ and

$$
\frac{y}{x} = \frac{A}{1 + A\beta}.
$$ {#eq-feedback}

The product $A\beta$ is the **loop gain**. When it is large, $y/x \approx 1/\beta$: the closed-loop gain hardly depends on $A$ at all. That is the whole secret of the op-amp circuits of [[circuits-1]]: an op-amp has an enormous but poorly controlled gain $A$, and two precision resistors set $\beta$.

::: example Designing a feedback amplifier {#ex-feedback-design}
An amplifier stage has open-loop gain $A = 10^5$, which may vary by $\pm50\%$ with temperature and between devices. Choose the feedback factor $\beta$ so that the nominal closed-loop gain is exactly $100$, and find the closed-loop gain at the extremes $A = 5\times10^4$ and $A = 1.5\times10^5$.
::: solution
From [[#eq-feedback]], $A/(1 + A\beta) = 100$ gives $1/A + \beta = 1/100$, so

$$
\beta = \frac{1}{100} - \frac{1}{10^5} = 0.01 - 0.00001 = 0.00999.
$$

The loop gain is $A\beta = 999$. At $A = 5\times10^4$: $5\times10^4/(1 + 5\times10^4\times0.00999) = 5\times10^4/500.5 = 99.90$. At $A = 1.5\times10^5$: $1.5\times10^5/(1 + 1498.5) = 100.03$.

A $\pm50\%$ change in $A$ produces a change of $-0.10\%$ to $+0.03\%$ in the closed-loop gain: feedback has reduced the sensitivity by roughly the factor $1 + A\beta \approx 1000$. In practice $\beta$ is a resistive divider; for a non-inverting op-amp stage $\beta = R_1/(R_1 + R_2)$, and $\beta = 0.00999$ is met with, for example, $R_1 = 1.00\,\mathrm{k\Omega}$ and $R_2 = 99.1\,\mathrm{k\Omega}$. The price is gain: we threw away a factor of $1000$ of the available $A$ to buy precision.
:::
:::

Feedback has a dark side. When $T_1$ and $T_2$ have memory, the fed-back signal arrives late, and if the delay is such that it adds to the input instead of subtracting, the loop can sustain or amplify a signal on its own. The howl of a public-address system is the feedback loop through the air between loudspeaker and microphone becoming unstable. Predicting when that happens, from the frequency response of the loop, is the subject of [[control-systems]].

::: example A first-order feedback loop in discrete time {#ex-dt-feedback}
A DT system has the feedback structure $y[n] = x[n] + a\,y[n-1]$: the output is delayed by one sample, scaled by $a$ and added to the input. Find the response to $x[n] = \delta[n]$ with the system initially at rest, and determine for which $a$ the system is BIBO stable.
::: solution
With $y[-1] = 0$: $y[0] = 1$, $y[1] = a$, $y[2] = a^2$, and by induction $y[n] = a^n$ for $n \ge 0$, i.e. $y[n] = a^n u[n]$.

If $\lvert a\rvert \ge 1$, the impulse response does not decay. To exhibit an unbounded output, take the bounded input $x[n] = (\operatorname{sgn}a)^n u[n]$; unrolling the recursion gives $y[n] = \sum_{k=0}^{n}a^k(\operatorname{sgn}a)^{n-k} = (\operatorname{sgn}a)^n\sum_{k=0}^{n}\lvert a\rvert^k$, whose magnitude is at least $n + 1$. (For $a = 1$ this is the accumulator of [[#ex-stability]].) If $\lvert a\rvert < 1$, the response to a general input is $y[n] = \sum_{k=0}^{\infty}a^k x[n-k]$ (unroll the recursion), and $\lvert x\rvert \le B$ gives $\lvert y[n]\rvert \le B\sum_{k=0}^{\infty}\lvert a\rvert^k = B/(1 - \lvert a\rvert)$. So the system is stable exactly when $\lvert a\rvert < 1$. With $a = 0.9$ the bound is $10B$: a constant input of $1$ settles to an output of $10$.
:::
:::

::: application Linearisation in electronics
Transistors are strongly nonlinear: the collector current of a BJT is exponential in $V_{BE}$. Amplifiers are nevertheless designed with linear theory by **small-signal linearisation**: the transistor is biased at a fixed operating point and driven by signals small enough that the curve is nearly straight over their range. The resulting small-signal model ($g_m$, $r_\pi$, $r_o$ in [[electronics-1]]) is an LTI system relating the *changes* about the operating point. Its validity is limited by amplitude: for a BJT the input swing must stay well below the thermal voltage $V_T \approx 26\,\mathrm{mV}$ for the distortion to be small.
:::

## Where this leads

The properties defined here are used in every later chapter. [[signals-systems/convolution]] shows that linearity plus time invariance reduce a system to its impulse response, and translates causality and stability into conditions on that response. The Fourier, Laplace and $z$-transforms of later lessons work only for LTI systems; nonlinear and time-varying systems, mixers, modulators, sampling switches, are treated by special methods in [[communication-systems]] and [[dsp]]. Feedback, met here with static gains, becomes the subject of [[control-systems]].

::: history
The idea that a linear system's response to a sum is the sum of the responses goes back to Daniel Bernoulli's superposition of vibrating-string modes (1753) and became a working tool of electrical engineering with Hermann von Helmholtz's superposition theorem for networks (1853) and Léon Charles Thévenin's equivalent circuit (1883). Feedback in its modern sense is due to Harold S. Black of Bell Telephone Laboratories, who conceived the negative-feedback amplifier in August 1927 as a way of making long-distance telephone repeaters insensitive to tube variations, and published it as "Stabilized feedback amplifiers" in 1934. The stability of such loops was analysed by Harry Nyquist in "Regeneration theory" (1932).
:::

::: summary
- A system maps input signals to output signals; we usually assume it is initially at rest.
- Memoryless: output depends only on the present input. Causal: only on present and past. Invertible: different inputs give different outputs.
- BIBO stable: every bounded input gives a bounded output. Disprove with one counterexample; prove with a bound valid for all bounded inputs.
- Linear means superposition, $ax_1 + bx_2 \to ay_1 + by_2$; a linear system maps zero to zero, so offsets make a system only incrementally linear.
- Time-invariant means a shifted input gives the same shifted output; to test, replace $x$ by $x(t - t_0)$ but leave explicit $t$'s alone.
- Linearity is an amplitude-limited model: real devices distort at large signals.
- Systems combine in series, parallel and feedback; negative feedback with loop gain $A\beta \gg 1$ gives gain $\approx 1/\beta$, insensitive to $A$.
:::

## Exercises

::: exercise Offsets and linearity {level=1}
Is $y[n] = 2x[n] - 5$ linear? Time-invariant? Memoryless? Explain each answer in one line.
::: solution
Not linear: $x = 0$ gives $y = -5 \ne 0$ (incrementally linear). Time-invariant: $2x[n - n_0] - 5 = y[n - n_0]$. Memoryless: only $x[n]$ is used.
:::
:::

::: exercise Causality of a running average {level=1}
Is $y[n] = \frac15\sum_{k=-2}^{2}x[n - k]$ causal? Stable? What delay makes it causal?
::: solution
It uses $x[n + 1]$ and $x[n + 2]$, so it is not causal. It is stable, with $\lvert y\rvert \le B$ when $\lvert x\rvert \le B$. Delaying the output by $2$ samples, $y'[n] = y[n - 2] = \frac15\sum_{k=0}^{4}x[n-k]$, gives a causal moving average; offline processing can use the centred version directly.
:::
:::

::: exercise Steady output of a feedback loop {level=1 check="4"}
For $y[n] = x[n] + 0.75\,y[n-1]$ with $x[n] = u[n]$ and the system initially at rest, find $\lim_{n\to\infty}y[n]$.
::: solution
In the steady state $y[n] = y[n-1] = y_\infty$, so $y_\infty = 1 + 0.75\,y_\infty$, giving $y_\infty = 1/0.25 = 4$. The limit exists because $\lvert 0.75\rvert < 1$ (see [[#ex-dt-feedback]]).
:::
:::

::: exercise Five systems {level=2}
Determine whether each system is linear, time-invariant, causal and stable: (a) $y(t) = x(t - 2) + x(2 - t)$; (b) $y(t) = \int_{t-1}^{t}x(\tau)\,\dd\tau$; (c) $y[n] = n\,x[n]$; (d) $y[n] = x[n]\,x[n-1]$; (e) $y(t) = \lvert x(t)\rvert$.
::: solution
(a) Linear. Time-varying: the second term reverses time. Not causal: $y(0) = x(-2) + x(2)$ uses the future. Stable: $\lvert y\rvert \le 2B$.

(b) Linear. Time-invariant: replacing $x$ by $x(\tau - t_0)$ and substituting gives $\int_{t-t_0-1}^{t-t_0}x = y(t - t_0)$. Causal: only $\tau \le t$ is used. Stable: $\lvert y\rvert \le B$, since the window has length $1$.

(c) Linear, time-varying, causal, unstable ($x = u$ gives $y = n$ for $n \ge 0$).

(d) Nonlinear ($2x \to 4y$), time-invariant, causal, stable ($\lvert y\rvert \le B^2$).

(e) Nonlinear ($-x$ gives $y$, not $-y$), time-invariant, causal, memoryless, stable.
:::
:::

::: exercise A system that is additive but not homogeneous {level=2}
Show that the system $y(t) = x^*(t)$ (complex conjugate) is additive and time-invariant, but is not linear when complex constants are allowed. Is it invertible?
::: solution
Additive: $(x_1 + x_2)^* = x_1^* + x_2^*$. Time-invariant: $x^*(t - t_0) = y(t - t_0)$. Homogeneity fails for $a = j$: input $jx$ gives $(jx)^* = -jx^*$, not $jx^*$. Invertible: conjugating again recovers $x$, so the system is its own inverse.
:::
:::

::: exercise Closed-loop gain error {level=2 check="0.999"}
An op-amp with open-loop gain $A = 2\times10^5$ is used in a non-inverting stage with $R_1 = 1\,\mathrm{k\Omega}$ and $R_2 = 199\,\mathrm{k\Omega}$, so $\beta = R_1/(R_1 + R_2)$. The ideal gain is $1/\beta = 200$. Find the ratio of the actual gain to the ideal gain.
::: solution
$\beta = 1/200 = 0.005$, $A\beta = 1000$. The actual gain is $A/(1 + A\beta) = (1/\beta)\cdot A\beta/(1 + A\beta)$, so the ratio is $1000/1001 = 0.999$: the gain is $199.8$, $0.1\%$ low.
:::
:::

::: exercise Cascades that do not commute {level=2}
Let $T_1$ be the squarer $y = x^2$ and $T_2$ the system $y(t) = x(t) + 1$. Compute the cascades $T_2\{T_1\{x\}\}$ and $T_1\{T_2\{x\}\}$ and show that they differ. Then show that the order does not matter if $T_1$ is replaced by the gain $y = 3x$ and $T_2$ by the delay $y(t) = x(t - 1)$.
::: solution
$T_2\{T_1\{x\}\} = x^2 + 1$, while $T_1\{T_2\{x\}\} = (x + 1)^2 = x^2 + 2x + 1$. Different. With the gain and delay, either order gives $3x(t - 1)$. Both are LTI, and LTI cascades always commute ([[signals-systems/convolution]]); the squarer and the offset are not linear.
:::
:::

::: exercise Stability of a feedback loop with gain {level=3}
In the DT loop $y[n] = x[n] + a\,y[n-1]$, the "gain" $a$ is produced by an amplifier whose gain drifts from $0.95$ to $1.02$ as it warms up. Describe the response to $x[n] = \delta[n]$ at both extremes and the response to $x[n] = u[n]$ at $a = 0.95$. Why might a designer put a limiter in the loop, and what property is then lost?
::: hint
Use $y[n] = a^n u[n]$ for the impulse response and sum a geometric series for the step response.
:::
::: solution
At $a = 0.95$ the impulse response $0.95^n$ decays, halving roughly every $13.5$ samples ($\ln2/\ln(1/0.95) \approx 13.5$). At $a = 1.02$ it grows, doubling about every $35$ samples ($\ln 2/\ln 1.02 \approx 35.0$): the loop has become unstable. The step response at $a = 0.95$ is $y[n] = \sum_{k=0}^{n}0.95^k = (1 - 0.95^{n+1})/0.05$, rising to $20$. A limiter (clipper) inside the loop keeps the output bounded even if $a$ exceeds $1$, but the system is then nonlinear, so superposition and all the transform methods of this course no longer apply; at $a > 1$ the loop would sit at the limit, which is how many oscillators are built.
:::
:::

::: exercise Proving time invariance of an LTI integral {level=3}
Show that a system of the form $y(t) = \int_{-\infty}^{\infty}h(t - \tau)\,x(\tau)\,\dd\tau$ is linear and time-invariant for any fixed function $h$, and that a system $y(t) = \int_{-\infty}^{\infty}k(t, \tau)\,x(\tau)\,\dd\tau$ is linear but in general time-varying. Give a condition on $k$ for it to be time-invariant.
::: hint
For the shifted input, substitute $\sigma = \tau - t_0$ in the integral.
:::
::: solution
Linearity of both follows from the linearity of the integral: $\int k(t,\tau)(ax_1 + bx_2)\,\dd\tau = a\int kx_1 + b\int kx_2$.

For the first system with input $x(\tau - t_0)$: $y_2(t) = \int h(t - \tau)x(\tau - t_0)\,\dd\tau$. Put $\sigma = \tau - t_0$: $y_2(t) = \int h(t - t_0 - \sigma)x(\sigma)\,\dd\sigma = y(t - t_0)$. Time-invariant.

For the second, the same substitution gives $y_2(t) = \int k(t, \sigma + t_0)x(\sigma)\,\dd\sigma$, while $y(t - t_0) = \int k(t - t_0, \sigma)x(\sigma)\,\dd\sigma$. These agree for all inputs exactly when $k(t, \sigma + t_0) = k(t - t_0, \sigma)$ for all $t, \sigma, t_0$, which says that $k(t, \tau)$ depends only on $t - \tau$: $k(t, \tau) = h(t - \tau)$. This is a preview of the next lesson: every LTI system has this convolution form.
:::
:::
