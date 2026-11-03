Plug a microphone into an oscilloscope and say "ah". The trace is a voltage that rises and falls a few hundred times a second, a little ragged, never exactly repeating. Connect the same microphone to a sound card and the computer stores not the trace but a list of numbers, 48 000 of them every second, each one the voltage at one instant. Both are **signals**: functions that carry information about how something varies. The first is defined at every instant of time, the second only at a sequence of instants. Almost everything in electrical engineering, from a power-line current to a radar echo to the bits on a fibre, is a signal of one of these two kinds, and the systems that process them, amplifiers, filters, modulators, control loops and digital filters, are described in the same language.

This first lesson builds the vocabulary. We define continuous-time and discrete-time signals, learn to shift, reverse and rescale them without errors, classify them as even or odd and periodic or not, meet the two families of building blocks, the complex exponentials and the unit impulses and steps, that the rest of the course is built on, and measure the size of a signal by its energy or power. None of the ideas is hard, but every later chapter uses them constantly, and the small traps here (the order of a shift and a scaling, the periodicity of a discrete-time sinusoid, the scaling of an impulse) are the source of many later mistakes.

## Continuous-time and discrete-time signals {#sec-ct-dt}

::: definition Continuous-time and discrete-time signals {#def-signal}
A **continuous-time (CT) signal** is a function $x(t)$ of a real variable $t$, usually time, defined for every $t$ in an interval (often all of $\R$). A **discrete-time (DT) signal** is a sequence $x[n]$ defined only for integer $n$. We write the independent variable in parentheses for CT signals and in square brackets for DT signals. The values themselves may be real or complex.
:::

A DT signal often comes from sampling a CT one, $x[n] = x_c(nT)$ with **sampling period** $T$, but it need not: the closing price of a share each day, the population of a species each year and the state of a counter at each clock edge are naturally discrete. Note that $x[n]$ is simply *not defined* for non-integer $n$; $x[2.5]$ is not zero, it is meaningless. When we draw a DT signal we use a stem plot, a vertical line with a dot for each sample, to make that point visually.

Two further distinctions are worth keeping apart from the CT/DT one.

- **Analog versus digital** refers to the *values*. A digital signal takes values from a finite set (for example the $2^{16}$ levels of a 16-bit converter). In this course we ignore quantisation and let DT signals take any real or complex value; quantisation noise is treated in [[dsp]].
- **Deterministic versus random** refers to how we describe the signal. Here every signal is a definite function; signals described by probabilities are the subject of [[random-signals]].

The independent variable need not be time. An image is a signal of two spatial variables, $x(u, v)$, and a digital image is a DT signal $x[m, n]$. Almost all of the theory extends to several variables, but we stay with one.

## Transformations of the independent variable {#sec-transform}

Many systems do nothing more than move a signal in time: a cable delays it, a tape played backwards reverses it, a recording played at double speed compresses it. These three operations, and their combinations, are worth mastering before anything else.

::: definition Shift, reversal and scaling {#def-transformations}
Let $x(t)$ be a CT signal, $t_0$ a real number and $a > 0$.

- **Time shift:** $y(t) = x(t - t_0)$ is $x$ *delayed* by $t_0$ (moved right) if $t_0 > 0$ and *advanced* (moved left) if $t_0 < 0$.
- **Time reversal:** $y(t) = x(-t)$ is the mirror image of $x$ about $t = 0$.
- **Time scaling:** $y(t) = x(at)$ is $x$ *compressed* by the factor $a$ if $a > 1$ and *stretched* if $0 < a < 1$.

For DT signals the shift $x[n - n_0]$ and the reversal $x[-n]$ are defined in the same way with integer $n_0$. Scaling is different: $x[2n]$ keeps only the even-indexed samples (**decimation** or **downsampling**), so information is lost, and $x[n/2]$ is defined only for even $n$.
:::

The rule that makes every combination easy is to ask *where the argument takes a value you know*. The signal $y(t) = x(at - b)$ takes the value $x(\tau)$ at the time $t$ for which $at - b = \tau$, that is at

$$
t = \frac{\tau + b}{a}.
$$ {#eq-argument}

So the feature of $x$ at $\tau = 0$ appears in $y$ at $t = b/a$, not at $t = b$. Writing $x(at - b) = x\big(a(t - b/a)\big)$ shows the same thing: scale by $a$ first, then shift by $b/a$; or shift by $b$ first, then scale by $a$. Both orders give the same answer if you are careful about what each step does to the variable.

::: warning The shift in x(at − b) is b/a, not b
The most common slip in this chapter is to read $x(2t - 4)$ as "$x(2t)$ delayed by $4$". It is $x(2t)$ delayed by $2$, because $x(2t-4) = x(2(t-2))$. Always test a definite point: the origin of $x$ sits where the argument is zero, at $2t - 4 = 0$, so at $t = 2$.
:::

::: example Reversal, scaling and shift together {#ex-transform}
Let $x(t)$ be the ramp segment $x(t) = t$ for $0 \le t \le 2$ and $x(t) = 0$ otherwise. Find and sketch $y(t) = x(4 - 2t)$.
::: solution
The signal $x(\tau)$ is non-zero only for $0 \le \tau \le 2$, where it equals $\tau$. Put $\tau = 4 - 2t$. The condition $0 \le 4 - 2t \le 2$ becomes, after subtracting $4$ and dividing by $-2$ (which reverses the inequalities), $1 \le t \le 2$. On that interval $y(t) = x(4 - 2t) = 4 - 2t$. So

$$
y(t) = \begin{cases} 4 - 2t, & 1 \le t \le 2,\\ 0, & \text{otherwise.}\end{cases}
$$

Check the end points: at $t = 1$, $y = 2$, which is the value of $x$ at its right end $\tau = 2$; at $t = 2$, $y = 0$, the value of $x$ at $\tau = 0$. The ramp has been reversed (it now falls), compressed from width $2$ to width $1$, and placed on $[1, 2]$. Doing it in steps: reverse to get $x(-t)$ on $[-2, 0]$; compress by $2$ to get $x(-2t)$ on $[-1, 0]$; finally $x(4 - 2t) = x(-2(t - 2))$ is $x(-2t)$ delayed by $2$, which lands on $[1, 2]$.
:::
:::

Use the figure to build the same intuition for a smooth pulse.

::: widget plot
f: exp(-x^2); exp(-(a*x - b)^2)
x: -6, 6
y: -0.1, 1.2
sliders: a=1:-3:3:0.1; b=0:-4:4:0.1
labels: x(t); x(at-b)
caption: The orange curve is $x(at - b)$ for the Gaussian pulse $x(t) = e^{-t^2}$. Move $b$ with $a = 1$ to see a pure shift; then set $a = 2$ and notice that the peak moves only to $t = b/2$. A negative $a$ reverses the pulse (invisible for this even pulse, but the peak then sits at $b/a < 0$ for $b > 0$).
:::

## Even, odd and periodic signals {#sec-symmetry}

::: definition Even and odd signals {#def-even-odd}
A signal is **even** if $x(-t) = x(t)$ for all $t$ and **odd** if $x(-t) = -x(t)$ for all $t$ (with $n$ in place of $t$ in discrete time). Every signal is the sum of an even and an odd part,

$$
x(t) = x_e(t) + x_o(t),\qquad x_e(t) = \tfrac12\big[x(t) + x(-t)\big],\quad x_o(t) = \tfrac12\big[x(t) - x(-t)\big].
$$ {#eq-even-odd}
:::

That $x_e$ is even and $x_o$ is odd follows by replacing $t$ with $-t$ in the formulas, and adding them gives back $x$. An odd signal must vanish at $t = 0$, since $x(0) = -x(0)$. The decomposition matters later because the Fourier transform of a real even signal is real and that of a real odd signal is imaginary, which halves the work of many calculations.

::: example Even and odd parts of a decaying exponential {#ex-even-odd}
Find the even and odd parts of $x(t) = e^{-t}u(t)$, where $u(t)$ is $1$ for $t > 0$ and $0$ for $t < 0$.
::: solution
For $t > 0$, $x(t) = e^{-t}$ and $x(-t) = 0$; for $t < 0$, $x(t) = 0$ and $x(-t) = e^{t}$. Hence

$$
x_e(t) = \tfrac12 e^{-\lvert t\rvert},\qquad x_o(t) = \tfrac12\operatorname{sgn}(t)\,e^{-\lvert t\rvert},
$$

where $\operatorname{sgn}(t)$ is $+1$ for $t > 0$ and $-1$ for $t < 0$. For $t > 0$ the sum is $\tfrac12 e^{-t} + \tfrac12 e^{-t} = e^{-t}$, and for $t < 0$ it is $\tfrac12 e^{t} - \tfrac12 e^{t} = 0$, as it should be.
:::
:::

::: definition Periodic signals {#def-periodic}
A CT signal is **periodic** with period $T > 0$ if $x(t + T) = x(t)$ for all $t$. The smallest such $T$ is the **fundamental period** $T_0$, and $\omega_0 = 2\pi/T_0$ is the **fundamental angular frequency** in $\mathrm{rad/s}$ ($f_0 = 1/T_0$ in $\mathrm{Hz}$). A DT signal is periodic with period $N$, a *positive integer*, if $x[n + N] = x[n]$ for all $n$; the smallest such $N$ is the fundamental period $N_0$.
:::

A constant is periodic with every period and has no fundamental period; we treat it as the zero-frequency case. A sum of two periodic CT signals with periods $T_1$ and $T_2$ is periodic if and only if $T_1/T_2$ is a rational number $p/q$ in lowest terms, and then $qT_1 = pT_2$ is a period (usually the fundamental one). So $\cos t + \cos(\sqrt2\,t)$ is not periodic at all, even though both parts are.

### Discrete-time sinusoids are different

In continuous time, $\cos(\omega_0 t)$ is periodic for every $\omega_0 \ne 0$, and larger $\omega_0$ always means faster oscillation. Neither statement survives in discrete time.

::: theorem Periodicity and uniqueness of discrete-time sinusoids {#thm-dt-sinusoid}
Let $x[n] = e^{j\omega_0 n}$ (or $\cos(\omega_0 n + \phi)$).

1. $x[n]$ is periodic if and only if $\omega_0/2\pi$ is a rational number. If $\omega_0/2\pi = m/N$ in lowest terms with $N > 0$, the fundamental period is $N$.
2. Frequencies that differ by a multiple of $2\pi$ give identical signals: $e^{j(\omega_0 + 2\pi k)n} = e^{j\omega_0 n}$ for every integer $k$. All distinct DT complex exponentials therefore have frequencies in an interval of length $2\pi$, such as $-\pi < \omega_0 \le \pi$, and the fastest real oscillation is $\cos(\pi n) = (-1)^n$.
:::

::: proof
(1) Periodicity with period $N$ requires $e^{j\omega_0(n+N)} = e^{j\omega_0 n}$, that is $e^{j\omega_0 N} = 1$, that is $\omega_0 N = 2\pi m$ for some integer $m$. This has a solution with $N$ a positive integer exactly when $\omega_0/2\pi = m/N$ is rational. The smallest such $N$ is the denominator of the fraction in lowest terms. The same argument applies to the cosine, which is the real part.

(2) $e^{j(\omega_0 + 2\pi k)n} = e^{j\omega_0 n}e^{j2\pi kn} = e^{j\omega_0 n}$, because $kn$ is an integer and $e^{j2\pi\cdot\text{integer}} = 1$.
:::

Part 2 is the seed of **aliasing**, the central fact of [[signals-systems/sampling]]: once a CT sinusoid has been sampled, frequencies $2\pi$ apart in radians per sample can no longer be told apart. Note the units: the DT frequency $\omega_0$ is in **radians per sample**, not radians per second. If $x[n] = \cos(\Omega n T)$ comes from sampling $\cos(\Omega t)$ at period $T$, then $\omega_0 = \Omega T$.

::: example Fundamental periods {#ex-periods}
Find the fundamental period, if any, of (a) $x(t) = \cos(4t) + \sin(6t)$, (b) $x[n] = \cos(2\pi n/12) + \sin(2\pi n/18)$, (c) $x[n] = \cos(n/4)$, (d) $x[n] = \cos(8\pi n/31)$.
::: solution
(a) The periods are $2\pi/4 = \pi/2$ and $2\pi/6 = \pi/3$; their ratio is $3/2$, rational. The fundamental angular frequency is the greatest common divisor of $4$ and $6$, namely $\omega_0 = 2\,\mathrm{rad/s}$, so $T_0 = \pi\,\mathrm{s} \approx 3.14\,\mathrm{s}$. Check: $\pi = 2\cdot(\pi/2) = 3\cdot(\pi/3)$.

(b) The periods are $12$ and $18$ samples, so $N_0 = \operatorname{lcm}(12, 18) = 36$.

(c) $\omega_0/2\pi = 1/(8\pi)$ is irrational, so the sequence is **not periodic**, although its envelope looks like a cosine of period $8\pi \approx 25.1$ samples. No integer number of samples ever brings it back exactly.

(d) $\omega_0/2\pi = 4/31$ in lowest terms, so $N_0 = 31$. In $31$ samples the sequence completes $4$ cycles of the underlying cosine: the samples of one DT period are spread over several CT periods.
:::
:::

::: example Sampling a mains tone {#ex-mains}
An audio interface samples at $f_s = 44.1\,\mathrm{kHz}$. A recording contains $60\,\mathrm{Hz}$ hum. Find the DT frequency of the hum in radians per sample and the fundamental period of the sampled hum. Repeat for $50\,\mathrm{Hz}$ hum sampled at $48\,\mathrm{kHz}$, and suggest a block length for an averaging hum canceller in each case.
::: solution
Sampling $\cos(2\pi f t)$ at $t = n/f_s$ gives $\cos(2\pi (f/f_s) n)$, so $\omega_0 = 2\pi f/f_s$ and $\omega_0/2\pi = f/f_s$.

For $60\,\mathrm{Hz}$ at $44.1\,\mathrm{kHz}$: $f/f_s = 60/44100 = 1/735$, so $\omega_0 = 2\pi/735 \approx 8.55\times10^{-3}\,\mathrm{rad/sample}$ and $N_0 = 735$ samples, exactly one hum cycle ($735/44100\,\mathrm{s} = 16.67\,\mathrm{ms}$).

For $50\,\mathrm{Hz}$ at $48\,\mathrm{kHz}$: $50/48000 = 1/960$, so $N_0 = 960$ samples ($20\,\mathrm{ms}$).

A canceller that averages the signal over blocks of exactly $N_0$ samples (or a multiple) sees each hum period sampled at identical phases, so the block length should be $735$ samples in the first case and $960$ in the second. Had the ratio been something like $60/44000 = 3/2200$, the period would be $2200$ samples, containing $3$ hum cycles.
:::
:::

::: quiz
Which of these discrete-time signals is periodic?
- [ ] $\cos(0.3n)$
- [x] $\cos(0.3\pi n)$
- [ ] $\cos(\sqrt2\,\pi n)$
- [ ] $e^{j n/5}$
::: solution
A DT sinusoid $\cos(\omega_0 n)$ is periodic exactly when $\omega_0/2\pi$ is rational. For $0.3\pi$ the ratio is $0.15 = 3/20$, so the period is $20$ samples. For $0.3$, $1/5$ and $\sqrt2\,\pi$ the ratios $0.3/2\pi$, $1/(10\pi)$ and $\sqrt2/2$ are irrational.
:::
:::

## Exponential and sinusoidal signals {#sec-exponentials}

The single most important family of signals in this course is the complex exponential. The reason, which we prove in [[signals-systems/convolution]], is that an exponential passes through any linear time-invariant system unchanged in shape: only its amplitude and phase change. Here we collect its forms.

::: definition Complex exponential signals {#def-exponential}
A **CT complex exponential** is $x(t) = C e^{st}$ with complex constants $C = \lvert C\rvert e^{j\theta}$ and $s = \sigma + j\omega$. A **DT complex exponential** is $x[n] = C z^n$ with complex $C$ and $z = r e^{j\omega}$. Writing them out,

$$
C e^{st} = \lvert C\rvert e^{\sigma t}\big[\cos(\omega t + \theta) + j\sin(\omega t + \theta)\big],\qquad C z^n = \lvert C\rvert r^n\big[\cos(\omega n + \theta) + j\sin(\omega n + \theta)\big].
$$ {#eq-exponential}
:::

Special cases, all of which you have met in circuit analysis:

- **Real exponentials** ($s = \sigma$ real, $C$ real): growth for $\sigma > 0$, decay for $\sigma < 0$. The capacitor voltage of a discharging RC circuit, $V_0 e^{-t/RC}$, has $\sigma = -1/RC$ and time constant $\tau = RC$. In DT, $C\alpha^n$ with real $\alpha$ decays if $\lvert\alpha\rvert < 1$ and alternates in sign if $\alpha < 0$.
- **Periodic complex exponentials** ($\sigma = 0$): $e^{j\omega_0 t}$ moves round the unit circle at $\omega_0\,\mathrm{rad/s}$. Its real part is a sinusoid, and by Euler's formula every real sinusoid is a sum of two of them,

$$
A\cos(\omega_0 t + \phi) = \frac{A}{2}e^{j\phi}e^{j\omega_0 t} + \frac{A}{2}e^{-j\phi}e^{-j\omega_0 t}.
$$ {#eq-euler}

  This is the phasor idea of [[circuits-2/sinusoids-phasors]]: the phasor $A\angle\phi$ is the coefficient of $e^{j\omega_0 t}$, and the second term is its complex conjugate.
- **Harmonically related exponentials** $e^{jk\omega_0 t}$, $k = 0, \pm1, \pm2, \dots$, all share the period $T_0 = 2\pi/\omega_0$. They are the building blocks of [[signals-systems/fourier-series]].
- **Damped sinusoids** ($\sigma < 0$, $\omega \ne 0$): $e^{\sigma t}\cos(\omega t)$ is the natural response of an underdamped RLC circuit, with $\sigma = -R/2L$.

::: widget plot
f: exp(s*x)*cos(w*x); exp(s*x); -exp(s*x)
x: 0, 10
y: -3, 3
sliders: s=-0.3:-1:0.3:0.01; w=3:0:10:0.1
labels: e^{\sigma t}\cos\omega t; e^{\sigma t}; -e^{\sigma t}
caption: The real part of $e^{st}$ with $s = \sigma + j\omega$. The envelope $\pm e^{\sigma t}$ is set by $\sigma$ alone and the oscillation by $\omega$ alone. Drag $\sigma$ through zero to pass from a decaying to a growing oscillation; this is the boundary between stable and unstable systems that reappears as the imaginary axis of the s-plane in [[signals-systems/laplace-transform]].
:::

In discrete time the picture is the same with $r^n$ in place of $e^{\sigma t}$: the sequence $z^n$ decays if $\lvert z\rvert < 1$, grows if $\lvert z\rvert > 1$ and has constant magnitude on the unit circle $\lvert z\rvert = 1$. The unit circle of the $z$-plane plays the role of the imaginary axis of the $s$-plane, a correspondence made precise in [[signals-systems/z-transform]]. If $x[n] = x_c(nT)$ samples $e^{st}$, then $z = e^{sT}$.

## The unit impulse and unit step {#sec-impulse}

The second family of building blocks consists of the simplest signals of all. They look trivial, but they turn out to be the key to describing linear systems.

### Discrete time

::: definition Discrete-time unit impulse and unit step {#def-dt-impulse}
The **unit impulse** (or unit sample) and the **unit step** are

$$
\delta[n] = \begin{cases}1, & n = 0,\\ 0, & n \ne 0,\end{cases}\qquad u[n] = \begin{cases}1, & n \ge 0,\\ 0, & n < 0.\end{cases}
$$

They are related by the first difference and the running sum:

$$
\delta[n] = u[n] - u[n-1],\qquad u[n] = \sum_{m=-\infty}^{n}\delta[m] = \sum_{k=0}^{\infty}\delta[n - k].
$$ {#eq-dt-step}
:::

Multiplying any sequence by a shifted impulse picks out one sample, $x[n]\,\delta[n - n_0] = x[n_0]\,\delta[n - n_0]$. Summing over all shifts rebuilds the sequence from its samples:

$$
x[n] = \sum_{k=-\infty}^{\infty} x[k]\,\delta[n - k].
$$ {#eq-dt-sifting}

This innocent identity, which says no more than "a sequence is the list of its values", is the starting point of the convolution sum.

### Continuous time

The CT unit step is $u(t) = 1$ for $t > 0$ and $u(t) = 0$ for $t < 0$; its value at $t = 0$ does not matter for anything we do (some authors take $\tfrac12$). It models a switch closing at $t = 0$. The CT impulse is subtler, because no ordinary function has the properties we want.

Consider the rectangular pulse $\delta_\Delta(t)$ of width $\Delta$ and height $1/\Delta$ on $0 \le t < \Delta$. Its area is $1$ for every $\Delta$, and its running integral rises linearly from $0$ to $1$ over $[0, \Delta]$: a step with a ramped edge. As $\Delta \to 0$, the running integral becomes $u(t)$, while the pulse becomes infinitely tall and thin with area still $1$. The **unit impulse** $\delta(t)$ is the idealisation of this limit: a unit of area concentrated at one instant. It is a model of a very short, very strong event, a hammer blow, a lightning strike, a capacitor charged by a current spike, whose duration is too short to matter compared with the time scales of the system it acts on.

::: definition Continuous-time unit impulse {#def-ct-impulse}
The **unit impulse** (Dirac delta) $\delta(t)$ is defined by what it does inside an integral: for every function $x(t)$ continuous at $t_0$,

$$
\int_{-\infty}^{\infty} x(t)\,\delta(t - t_0)\,\dd t = x(t_0).
$$ {#eq-sifting}

In particular $\int_{-\infty}^{\infty}\delta(t)\,\dd t = 1$, $\delta(t) = 0$ for $t \ne 0$ in the sense that any integral not containing $t = 0$ vanishes, and $u(t) = \int_{-\infty}^{t}\delta(\tau)\,\dd\tau$, so that $\delta(t) = \dd u/\dd t$.
:::

Equation [[#eq-sifting]] is the **sifting property**. Like [[#eq-dt-sifting]] it can be read as a decomposition: $x(t) = \int x(\tau)\,\delta(t - \tau)\,\dd\tau$ expresses a signal as a continuum of weighted impulses. The impulse is not a function but a *generalised function* or distribution; the rigorous theory is beyond this course (see the history note), but all the rules we need follow from the sifting property.

::: theorem Properties of the unit impulse {#thm-impulse-props}
For a real constant $a \ne 0$ and a function $x(t)$ continuous at $t_0$:

1. $x(t)\,\delta(t - t_0) = x(t_0)\,\delta(t - t_0)$.
2. $\delta(at) = \dfrac{1}{\lvert a\rvert}\,\delta(t)$; in particular $\delta(-t) = \delta(t)$.
3. $\dfrac{\dd}{\dd t}\big[x(t)u(t)\big] = x'(t)u(t) + x(0)\,\delta(t)$ for $x$ differentiable.
:::

::: proof
Each identity means that both sides give the same integral against every continuous test function $\phi(t)$.

(1) $\int \phi(t)x(t)\delta(t - t_0)\,\dd t = \phi(t_0)x(t_0) = \int \phi(t)x(t_0)\delta(t - t_0)\,\dd t$.

(2) Substitute $\tau = at$. If $a > 0$, $\int\phi(t)\delta(at)\,\dd t = \int\phi(\tau/a)\delta(\tau)\,\dd\tau/a = \phi(0)/a$. If $a < 0$ the limits swap, which introduces a minus sign, and the result is $\phi(0)/(-a)$. In both cases we get $\phi(0)/\lvert a\rvert$, the action of $\delta(t)/\lvert a\rvert$.

(3) The product rule with $u' = \delta$ gives $x'(t)u(t) + x(t)\delta(t)$, and property 1 turns $x(t)\delta(t)$ into $x(0)\delta(t)$.
:::

Property 2 makes sense from the pulse picture: compressing the unit-area pulse by $a$ divides its area by $\lvert a\rvert$. Property 3 is how impulses arise in circuits: the current $C\,\dd v/\dd t$ into a capacitor whose voltage jumps from $0$ to $V$ at $t = 0$ contains the impulse $CV\delta(t)$, a charge $CV$ delivered in no time.

::: example Evaluating impulse integrals {#ex-impulse}
Evaluate (a) $\int_{-\infty}^{\infty}\cos(t)\,\delta(t - \pi/3)\,\dd t$, (b) $\int_{-\infty}^{\infty}(t^2 + 1)\,\delta(2t - 4)\,\dd t$, (c) $\int_{0}^{5} e^{-t}\,\delta(t + 1)\,\dd t$, and (d) the derivative of $x(t) = 3e^{-2t}u(t)$.
::: solution
(a) Sifting at $t_0 = \pi/3$: $\cos(\pi/3) = 0.5$.

(b) First write $\delta(2t - 4) = \delta(2(t - 2)) = \tfrac12\delta(t - 2)$ by property 2. Then the integral is $\tfrac12(2^2 + 1) = 2.5$. Forgetting the factor $\tfrac12$ would give $5$, which is wrong.

(c) The impulse sits at $t = -1$, outside the interval $[0, 5]$, so the integral is $0$.

(d) By property 3 with $x(t) = 3e^{-2t}$: $x'(t) = -6e^{-2t}u(t) + 3\,\delta(t)$. The jump of height $3$ at $t = 0$ produces an impulse of area $3$; elsewhere the derivative is the ordinary one.
:::
:::

::: warning An impulse has area, not height
Do not write "$\delta(0) = \infty$" and calculate with it, and do not treat the "strength" of $\delta(at)$ as $1$. The only meaningful number attached to an impulse is its area, which is what the sifting property returns. When you draw $A\,\delta(t - t_0)$, draw an arrow at $t_0$ and write its area $A$ beside it. In discrete time there is no such subtlety: $\delta[n]$ is an ordinary sequence with $\delta[0] = 1$, and $\delta[2n] = \delta[n]$ (not $\tfrac12\delta[n]$).
:::

## Energy and power {#sec-energy}

How big is a signal? If $x(t)$ is the voltage across a $1\,\Omega$ resistor, the instantaneous power is $x^2(t)$ and the energy delivered over all time is $\int x^2\,\dd t$. We borrow this language for any signal, real or complex, whatever its physical units.

::: definition Energy and power of a signal {#def-energy-power}
The **energy** and the **average power** of a CT signal are

$$
E_\infty = \int_{-\infty}^{\infty}\lvert x(t)\rvert^2\,\dd t,\qquad P_\infty = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}\lvert x(t)\rvert^2\,\dd t,
$$ {#eq-energy}

and for a DT signal $E_\infty = \sum_{n=-\infty}^{\infty}\lvert x[n]\rvert^2$ and $P_\infty = \lim_{N\to\infty}\frac{1}{2N+1}\sum_{n=-N}^{N}\lvert x[n]\rvert^2$. An **energy signal** has $0 < E_\infty < \infty$ (and then $P_\infty = 0$); a **power signal** has $0 < P_\infty < \infty$ (and then $E_\infty = \infty$). For a periodic signal $P_\infty$ equals the average of $\lvert x\rvert^2$ over one period.
:::

Pulses, transients and anything that dies away are energy signals; sinusoids, periodic waveforms and the steady output of a running system are power signals. Some signals are neither: $x(t) = t$ has infinite power. The square root of the average power is the **RMS value** of [[circuits-2/ac-power]]. If $x$ is a voltage across a real resistance $R$, the physical power is $P_\infty/R$, so energy and power in this abstract sense are physical energy and power only up to the factor $1/R$.

::: example Energy and power {#ex-energy}
Classify and find the energy or power of (a) $x(t) = 3e^{-2t}u(t)$, (b) $x(t) = 5\cos(100\pi t + \pi/3)$, (c) $x[n] = (0.5)^n u[n]$, (d) $x(t) = 4e^{j\omega_0 t}$.
::: solution
(a) $E_\infty = \int_0^\infty 9e^{-4t}\,\dd t = 9/4 = 2.25$. Finite, so it is an energy signal with $P_\infty = 0$.

(b) Periodic with $T_0 = 2\pi/(100\pi) = 20\,\mathrm{ms}$. Over one period $\cos^2$ averages to $\tfrac12$, so $P_\infty = 25/2 = 12.5$ and the RMS value is $5/\sqrt2 \approx 3.54$. The phase $\pi/3$ makes no difference.

(c) $E_\infty = \sum_{n=0}^\infty 0.25^n = 1/(1 - 0.25) = 4/3 \approx 1.33$, a geometric series. Energy signal.

(d) $\lvert x(t)\rvert^2 = 16$ for all $t$, so $P_\infty = 16$ and $E_\infty = \infty$. Note that this is twice the power of the real sinusoid $4\cos(\omega_0 t)$: the complex exponential has the same magnitude all the time, while the cosine spends time near zero.
:::
:::

::: quiz
What is the average power of $x(t) = 2 + 3\cos(\omega_0 t)$?
- [ ] $5$
- [ ] $6.5$
- [x] $8.5$
- [ ] $13$
::: solution
$x^2 = 4 + 12\cos(\omega_0 t) + 9\cos^2(\omega_0 t)$. Over a period the middle term averages to $0$ and the last to $9/2$, so $P_\infty = 4 + 4.5 = 8.5$. The DC and AC parts add in power, not in amplitude, because their cross term averages to zero; this is the first instance of Parseval's relation of [[signals-systems/fourier-series]].
:::
:::

::: application Signals in instruments
An oscilloscope displays a CT signal; a digital oscilloscope actually stores a DT signal and draws straight lines (or sinc interpolation) between samples. A true-RMS multimeter measures $\sqrt{P_\infty}$ by squaring and averaging over a window of a few cycles, whereas a cheap averaging meter rectifies and scales by $\pi/(2\sqrt2) \approx 1.11$, which is correct only for a pure sinusoid. A square wave of amplitude $1$ has RMS value $1$, but the averaging meter reads $1.11$; for the narrow pulses of a switching converter it can be wrong by a factor of two or more.
:::

## Where this leads

With signals classified and the building blocks in place, the next step is to look at what systems do to them. [[signals-systems/systems]] defines the properties, linearity and time invariance above all, that make a system tractable. [[signals-systems/convolution]] then combines the sifting identities [[#eq-dt-sifting]] and [[#eq-sifting]] with linearity and time invariance to show that an LTI system is completely described by its response to $\delta$. The complex exponentials of [[#def-exponential]] return as the eigenfunctions of LTI systems and the basis of all the transforms: Fourier for $s = j\omega$ and $z = e^{j\omega}$, Laplace and $z$ for general $s$ and $z$.

::: history
Oliver Heaviside used the unit step (and, implicitly, its derivative) in his operational treatment of telegraph and circuit equations in the 1880s and 1890s, which is why $u(t)$ is still called the Heaviside step function. Paul Dirac introduced the notation $\delta(x)$ in quantum mechanics in 1927 and popularised it in *The Principles of Quantum Mechanics* (1930), openly admitting that it was not a proper function. The rigorous foundation came from Laurent Schwartz's theory of distributions, published in 1950–51, which defines $\delta$ exactly as we did, by its action on test functions. Euler's formula $e^{j\theta} = \cos\theta + j\sin\theta$, which links exponentials and sinusoids, dates from Leonhard Euler's *Introductio in analysin infinitorum* of 1748.
:::

::: summary
- CT signals $x(t)$ are defined for all real $t$; DT signals $x[n]$ only for integer $n$. Quantisation (analog versus digital) is a separate issue.
- $x(at - b)$ places the feature of $x$ at $\tau$ at time $t = (\tau + b)/a$: the shift is $b/a$. DT scaling $x[Mn]$ discards samples.
- Every signal splits into even and odd parts. A DT sinusoid $e^{j\omega_0 n}$ is periodic only if $\omega_0/2\pi$ is rational, and frequencies $2\pi$ apart are indistinguishable.
- The complex exponential $Ce^{st}$ (or $Cz^n$) covers constants, real exponentials, sinusoids and damped sinusoids; $\operatorname{Re}s$ (or $\lvert z\rvert$) sets growth and decay.
- $\delta[n]$ and $u[n]$ are ordinary sequences; $\delta(t)$ is defined by the sifting property $\int x(t)\delta(t - t_0)\,\dd t = x(t_0)$, with $\delta(at) = \delta(t)/\lvert a\rvert$ and $\delta = u'$.
- Every signal is a superposition of shifted impulses, [[#eq-dt-sifting]] and [[#eq-sifting]]; this is the root of convolution.
- Energy signals have finite $\int\lvert x\rvert^2$; power signals have finite non-zero average power, which for periodic signals is the mean of $\lvert x\rvert^2$ over a period.
:::

## Exercises

::: exercise Reading a transformation {level=1 check="1.5"}
A pulse $x(t)$ has its peak at $t = 0$. At what time, in seconds, is the peak of $y(t) = x(2t - 3)$?
::: solution
The peak is where the argument is zero: $2t - 3 = 0$, so $t = 1.5\,\mathrm{s}$. (Not $3\,\mathrm{s}$: $x(2t - 3) = x(2(t - 1.5))$.)
:::
:::

::: exercise A fundamental period {level=1 check="2*pi"}
Find the fundamental period, in seconds, of $x(t) = \sin(3t) + \cos(5t)$.
::: solution
The angular frequencies $3$ and $5\,\mathrm{rad/s}$ have greatest common divisor $1\,\mathrm{rad/s}$, so $\omega_0 = 1\,\mathrm{rad/s}$ and $T_0 = 2\pi \approx 6.28\,\mathrm{s}$. Check: $2\pi$ contains $3$ periods of $\sin 3t$ and $5$ of $\cos 5t$.
:::
:::

::: exercise Energy of a DT signal {level=1 check="16/7"}
Find the energy $E_\infty$ of $x[n] = (0.75)^n u[n]$.
::: solution
$\lvert x[n]\rvert^2 = 0.5625^n$ for $n \ge 0$, so $E_\infty = 1/(1 - 0.5625) = 1/0.4375 = 16/7 \approx 2.29$.
:::
:::

::: exercise Impulse algebra {level=2 check="-0.5"}
Evaluate $\displaystyle I = \int_{-\infty}^{\infty}\sin(\pi t)\,\delta(1 - 2t)\,\dd t + \int_{-\infty}^{\infty} t\,\delta(t + 1)\,\dd t$.
::: hint
$\delta(1 - 2t) = \delta(-2(t - \tfrac12))$.
:::
::: solution
$\delta(1 - 2t) = \delta(-2(t - \tfrac12)) = \tfrac12\delta(t - \tfrac12)$, so the first integral is $\tfrac12\sin(\pi/2) = 0.5$. The second is $-1$. The sum is $-0.5$.
:::
:::

::: exercise Even and odd parts of a DT signal {level=2}
Let $x[n] = \{\,\underline{1}, 2, 3\,\}$, meaning $x[0] = 1$, $x[1] = 2$, $x[2] = 3$ and $x[n] = 0$ otherwise. Find $x_e[n]$ and $x_o[n]$ and check that they add up to $x[n]$.
::: solution
$x[-n]$ has $x[0] = 1$, $x[-1] = 2$, $x[-2] = 3$. Then $x_e[n] = \tfrac12(x[n] + x[-n])$: $x_e[0] = 1$, $x_e[\pm1] = 1$, $x_e[\pm2] = 1.5$. And $x_o[n] = \tfrac12(x[n] - x[-n])$: $x_o[0] = 0$, $x_o[1] = 1$, $x_o[-1] = -1$, $x_o[2] = 1.5$, $x_o[-2] = -1.5$. Sum at $n = 2$: $1.5 + 1.5 = 3$; at $n = -2$: $1.5 - 1.5 = 0$; at $n = 1$: $1 + 1 = 2$; at $n = -1$: $1 - 1 = 0$; at $n = 0$: $1$. Correct.
:::
:::

::: exercise Power of a rectified sine {level=2 check="sqrt(2)*170/2"}
A full-wave rectifier produces $x(t) = 170\lvert\sin(2\pi\cdot 60\,t)\rvert$ volts. Find its RMS value in volts.
::: solution
$x^2 = 170^2\sin^2(2\pi\cdot60\,t)$, the same as for the unrectified sine, since squaring removes the sign. The average of $\sin^2$ is $\tfrac12$, so $P_\infty = 170^2/2$ and $V_{\text{rms}} = 170/\sqrt2 \approx 120.2\,\mathrm{V}$. Rectification changes the average value (to $2\cdot170/\pi \approx 108.2\,\mathrm{V}$) but not the RMS value.
:::
:::

::: exercise Sampled sinusoids {level=2 check="200"}
A $440\,\mathrm{Hz}$ tone is sampled at $f_s = 8\,\mathrm{kHz}$. Find the DT frequency $\omega_0$ and the fundamental period $N_0$ (in samples) of the sampled tone; give $N_0$ as the answer. How many cycles of the tone does one DT period contain?
::: solution
$\omega_0/2\pi = 440/8000$. Since $\gcd(440, 8000) = 40$, this is $11/200$ in lowest terms, so $N_0 = 200$ samples, containing $11$ cycles of the tone. Check the durations: $200/8000\,\mathrm{s} = 25\,\mathrm{ms}$ and $11/440\,\mathrm{s} = 25\,\mathrm{ms}$. The DT frequency is $\omega_0 = 2\pi\cdot 11/200 = 0.11\pi \approx 0.346\,\mathrm{rad/sample}$.
:::
:::

::: exercise A charging capacitor {level=3}
A capacitor $C$ is connected at $t = 0$ to a source whose voltage is $v(t) = V_0(1 - e^{-t/\tau})u(t) + V_1u(t)$. Find the capacitor current $i(t) = C\,\dd v/\dd t$, including any impulse, and interpret it physically. What happens to the impulse as the source resistance (ignored here) is restored?
::: hint
Use [[#thm-impulse-props]], part 3, with the jump of $v$ at $t = 0$.
:::
::: solution
The voltage jumps from $0$ to $v(0^+) = V_1$ at $t = 0$. By property 3, $\dd v/\dd t = (V_0/\tau)e^{-t/\tau}u(t) + V_1\delta(t)$, so

$$
i(t) = \frac{CV_0}{\tau}e^{-t/\tau}u(t) + CV_1\,\delta(t).
$$

The impulse of area $CV_1$ is the charge needed to raise the capacitor voltage instantly by $V_1$; an ideal source can deliver it in zero time. With a source resistance $R_s$ the voltage cannot jump: the charge $CV_1$ flows as a current pulse of height about $V_1/R_s$ and duration about $R_sC$, whose area tends to $CV_1$ as $R_s \to 0$. The impulse is the model of that fast pulse, valid when $R_sC$ is much shorter than every other time scale of interest.
:::
:::

::: exercise Periodicity of a sum in discrete time {level=3}
Show that $x[n] = e^{j(2\pi/3)n} + e^{j(3\pi/4)n}$ is periodic and find $N_0$. Then show that, unlike in continuous time, a DT signal $\cos(\omega_1 n) + \cos(\omega_2 n)$ with *both* parts periodic is always periodic.
::: solution
The first term has $\omega/2\pi = 1/3$, period $3$; the second $3/8$, period $8$. The sum repeats after $\operatorname{lcm}(3, 8) = 24$ samples, and no smaller $N$ works for both, so $N_0 = 24$.

In general, if $\cos(\omega_1 n)$ has integer period $N_1$ and $\cos(\omega_2 n)$ has integer period $N_2$, then $N_1N_2$ (or their least common multiple) is a period of both, so the sum is periodic. In continuous time the periods $T_1, T_2$ are real numbers and need not have a common multiple; in discrete time they are integers and always do.
:::
:::

::: exercise Designing a test signal {level=3 check="0.25"}
You need a DT test signal $x[n] = A\cos(\omega_0 n)$ with fundamental period exactly $N_0 = 16$ samples, containing $3$ complete cycles of the cosine per period, and with average power $\tfrac{1}{32}$. Find $\omega_0$ in radians per sample and $A$ (give $A$ as the answer). What CT frequency does it represent at $f_s = 48\,\mathrm{kHz}$? Why could you not ask for $4$ cycles in a fundamental period of $16$ samples?
::: hint
Use [[#thm-dt-sinusoid]]: the period is the denominator of $\omega_0/2\pi$ in lowest terms.
:::
::: solution
Three cycles in $16$ samples means $\omega_0/2\pi = 3/16$, already in lowest terms, so $N_0 = 16$ and $\omega_0 = 3\pi/8 \approx 1.178\,\mathrm{rad/sample}$. The average power of a DT sinusoid with $0 < \omega_0 < \pi$ is $A^2/2$ (the average of $\cos^2$ over a whole period is $\tfrac12$), so $A^2/2 = 1/32$ gives $A = 0.25$. At $f_s = 48\,\mathrm{kHz}$ it represents $f = (3/16)\cdot48\,\mathrm{kHz} = 9\,\mathrm{kHz}$.

Four cycles in $16$ samples would mean $\omega_0/2\pi = 4/16 = 1/4$, whose lowest-terms denominator is $4$: the sequence would repeat every $4$ samples, so its fundamental period could not be $16$. The number of cycles $m$ and the period $N_0$ must be coprime.
:::
:::
