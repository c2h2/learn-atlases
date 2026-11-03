Strike a tuning fork and a violin string at the same pitch, say $440\,\mathrm{Hz}$, and you hear the same note but two very different sounds. An oscilloscope shows why: the tuning fork produces an almost perfect sinusoid, while the violin's waveform is a jagged sawtooth-like shape that repeats $440$ times a second. Both are periodic with the same period, but the violin's waveform also contains components at $880$, $1320$, $1760\,\mathrm{Hz}$ and so on, the **harmonics**, and their relative strengths are the instrument's timbre. The same decomposition tells a power engineer how much a rectifier's current distorts the mains, a radio engineer which frequencies a clock signal will radiate, and a filter designer what a square wave will look like after passing through a low-pass filter.

The **Fourier series** writes a periodic signal as a sum of harmonically related complex exponentials. The mathematics, orthogonality, convergence and the Gibbs phenomenon, is developed in the Maths Atlas lesson [Fourier series](/learn/maths/lesson.php?c=pde&l=fourier-series); here we take the engineering view. We set up the series in the exponential form used throughout signals and systems, compute the spectra of the standard waveforms, derive the properties that save work, and above all use the eigenfunction property of [[signals-systems/convolution]] to find the response of any LTI system to any periodic input: one harmonic at a time. We finish with the discrete-time Fourier series, which is a finite sum and the starting point of the DFT.

## The exponential Fourier series {#sec-ctfs}

Let $x(t)$ be periodic with fundamental period $T_0$ and fundamental frequency $\omega_0 = 2\pi/T_0$. The harmonically related exponentials $e^{jk\omega_0 t}$, $k = 0, \pm1, \pm2, \dots$, all have period $T_0$, and so does any combination of them. The claim of Fourier analysis is that, conversely, essentially every periodic signal is such a combination.

::: definition Continuous-time Fourier series {#def-ctfs}
The **Fourier series** of a periodic signal $x(t)$ with period $T_0 = 2\pi/\omega_0$ is

$$
x(t) = \sum_{k=-\infty}^{\infty} a_k\,e^{jk\omega_0 t}\qquad\text{(synthesis)},
$$ {#eq-synthesis}

with **Fourier coefficients**

$$
a_k = \frac{1}{T_0}\int_{T_0} x(t)\,e^{-jk\omega_0 t}\,\dd t\qquad\text{(analysis)},
$$ {#eq-analysis}

where $\int_{T_0}$ denotes an integral over any interval of length $T_0$. The term $k = 0$ is the **DC component** $a_0$, the average value of $x$; the terms $k = \pm1$ form the **fundamental**; the terms $k = \pm N$ form the **$N$th harmonic**. The set $\{a_k\}$ plotted against $k\omega_0$ is the **spectrum** of $x$.
:::

::: theorem Orthogonality and the coefficient formula {#thm-coefficients}
The harmonics are orthogonal over a period:

$$
\frac{1}{T_0}\int_{T_0}e^{jk\omega_0 t}\,e^{-jm\omega_0 t}\,\dd t = \begin{cases}1, & k = m,\\ 0, & k \ne m.\end{cases}
$$ {#eq-orthogonality}

Consequently, if $x(t)$ is given by [[#eq-synthesis]] (with a series that may be integrated term by term), its coefficients are given by [[#eq-analysis]].
:::

::: proof
For $k = m$ the integrand is $1$. For $k \ne m$ it is $e^{j(k-m)\omega_0 t}$, and $\int_0^{T_0}e^{j(k-m)\omega_0t}\,\dd t = \big[e^{j(k-m)\omega_0t}/(j(k-m)\omega_0)\big]_0^{T_0} = 0$, because $(k - m)\omega_0T_0 = 2\pi(k - m)$ and $e^{j2\pi(k-m)} = 1$. Now multiply [[#eq-synthesis]] by $e^{-jm\omega_0t}$, integrate over a period and divide by $T_0$: every term with $k \ne m$ vanishes and the term $k = m$ leaves $a_m$.
:::

Geometrically, [[#eq-analysis]] measures how much of the "direction" $e^{jk\omega_0t}$ is present in $x$, exactly as a dot product with a unit vector extracts a component. You can think of the integral as a correlator: multiply the signal by a reference rotating at $-k\omega_0$ and average. Only the component rotating at $+k\omega_0$ survives the averaging. Lock-in amplifiers and the receivers of [[communication-systems]] do precisely this in hardware.

### Real signals and the trigonometric form

If $x(t)$ is real, conjugating [[#eq-analysis]] shows that $a_{-k} = a_k^*$: the coefficients have **conjugate symmetry**, so $\lvert a_k\rvert$ is even in $k$ and $\angle a_k$ is odd. Pairing the terms $\pm k$ and writing $a_k = \lvert a_k\rvert e^{j\theta_k}$ gives the **amplitude–phase form**

$$
x(t) = a_0 + \sum_{k=1}^{\infty}2\lvert a_k\rvert\cos(k\omega_0t + \theta_k),
$$ {#eq-amp-phase}

so the $k$th harmonic is a sinusoid of amplitude $2\lvert a_k\rvert$ and phase $\theta_k$: the phasor of the $k$th harmonic is $2a_k$. Writing $a_k = \tfrac12(B_k - jC_k)$ gives instead the **trigonometric form** $x(t) = a_0 + \sum_{k\ge1}\big(B_k\cos k\omega_0t + C_k\sin k\omega_0t\big)$ used in many maths texts, with $B_k = \frac{2}{T_0}\int x\cos k\omega_0t\,\dd t$ and $C_k = \frac{2}{T_0}\int x\sin k\omega_0t\,\dd t$. An even signal has $C_k = 0$ (real $a_k$), an odd one has $B_k = 0$ and $a_0 = 0$ (purely imaginary $a_k$).

::: warning Two-sided and one-sided amplitudes
In the exponential form each real harmonic is split between $k$ and $-k$, so $\lvert a_k\rvert$ is *half* the amplitude of the $k$th harmonic: $A\cos(\omega_0t)$ has $a_{\pm1} = A/2$. A spectrum analyser displays one-sided amplitudes ($2\lvert a_k\rvert$) or, more often, RMS values ($\sqrt2\lvert a_k\rvert$) in $\mathrm{dBV}$ or $\mathrm{dBm}$. Before comparing a computed spectrum with a measured one, check which convention each uses.
:::

## Spectra of standard waveforms {#sec-standard}

::: example The square wave {#ex-square}
Find the Fourier series of the square wave with period $T_0$ that equals $+A$ for $0 < t < T_0/2$ and $-A$ for $-T_0/2 < t < 0$.
::: solution
The average is zero, so $a_0 = 0$. For $k \ne 0$, with $\omega_0T_0 = 2\pi$,

$$
a_k = \frac{A}{T_0}\left[\int_0^{T_0/2}e^{-jk\omega_0t}\,\dd t - \int_{-T_0/2}^{0}e^{-jk\omega_0t}\,\dd t\right] = \frac{A}{T_0}\cdot\frac{(1 - e^{-jk\pi}) - (e^{jk\pi} - 1)}{jk\omega_0} = \frac{A\,(1 - (-1)^k)}{jk\pi}.
$$

So $a_k = 0$ for even $k$ and $a_k = \dfrac{2A}{jk\pi}$ for odd $k$. Pairing $\pm k$ via [[#eq-amp-phase]] (or directly, $a_ke^{jk\omega_0t} + a_{-k}e^{-jk\omega_0t} = \frac{4A}{k\pi}\sin k\omega_0t$):

$$
x(t) = \frac{4A}{\pi}\left(\sin\omega_0t + \frac13\sin3\omega_0t + \frac15\sin5\omega_0t + \cdots\right).
$$

The fundamental has amplitude $4A/\pi \approx 1.27A$, larger than the square wave itself; only odd harmonics appear (a consequence of the half-wave symmetry $x(t + T_0/2) = -x(t)$); and the harmonic amplitudes fall as $1/k$, slowly, because the waveform has jumps.
:::
:::

The figure builds the square wave from its harmonics. Watch the overshoot near each jump.

::: widget fourier
wave: square
terms: 5
caption: Partial sums of the square-wave series. Increase the number of terms: the approximation improves everywhere except next to the jumps, where an overshoot of about $9\%$ of the jump height moves closer to the jump but never shrinks. This is the Gibbs phenomenon. The coefficient plot shows the $1/k$ decay of the odd harmonics.
:::

::: theorem Convergence of the Fourier series (Dirichlet conditions) {#thm-dirichlet}
Suppose that over one period $x(t)$ is absolutely integrable, has finitely many maxima and minima, and has finitely many discontinuities, each a finite jump. Then the Fourier series converges to $x(t)$ at every point where $x$ is continuous, and to the midpoint $\tfrac12[x(t^-) + x(t^+)]$ at each jump. If instead $x$ merely has finite energy over a period, the series converges in the mean-square sense: the energy of the error over a period tends to zero.
:::

The proof is a standard topic of analysis; see the Maths Atlas lesson cited above. Every signal produced by a physical generator satisfies the conditions. Near a jump, the partial sums $\sum_{\lvert k\rvert\le N}$ overshoot by about $8.95\%$ of the jump however large $N$ is; the overshoot region just gets narrower. For the square wave of amplitude $1$ (jump $2$), the partial sums peak near $1.179$. In engineering terms, a truncated spectrum, which is what any band-limited channel delivers, produces **ringing** at every edge.

::: example A rectangular pulse train {#ex-pulse-train}
A clock or radar transmitter produces a pulse train of height $1$, pulse width $2T_1$ and period $T_0$: $x(t) = 1$ for $\lvert t\rvert < T_1$ and $0$ for $T_1 < \lvert t\rvert < T_0/2$, repeated. Find its Fourier coefficients and describe the spectrum for a **duty cycle** $d = 2T_1/T_0 = 25\%$.
::: solution
$a_0 = \frac{1}{T_0}\int_{-T_1}^{T_1}\dd t = \frac{2T_1}{T_0} = d$. For $k \ne 0$,

$$
a_k = \frac{1}{T_0}\int_{-T_1}^{T_1}e^{-jk\omega_0t}\,\dd t = \frac{1}{T_0}\cdot\frac{e^{jk\omega_0T_1} - e^{-jk\omega_0T_1}}{jk\omega_0} = \frac{2\sin(k\omega_0T_1)}{k\omega_0T_0} = \frac{\sin(k\omega_0T_1)}{k\pi}.
$$

Since $\omega_0T_1 = \pi d$, this is $a_k = d\,\dfrac{\sin(\pi kd)}{\pi kd}$: samples, at the harmonic frequencies, of the **sinc envelope** $d\,\sin(\pi fd T_0)/(\pi fdT_0)$. The coefficients are real because the pulse train is even.

For $d = 0.25$: $a_0 = 0.25$, $a_{\pm1} = 0.225$, $a_{\pm2} = 0.159$, $a_{\pm3} = 0.075$, $a_{\pm4} = 0$, $a_{\pm5} = -0.045$, $a_{\pm6} = -0.053$, $a_{\pm7} = -0.032$, $a_{\pm8} = 0$. Every fourth harmonic is missing, where the envelope crosses zero at $f = 1/(2T_1)$, and the envelope's first lobe spans $\lvert f\rvert < 1/(2T_1)$. Narrower pulses push the first zero out: the spectrum gets wider as the pulse gets shorter. This reciprocal relation between duration and bandwidth recurs throughout [[signals-systems/fourier-transform]].
:::
:::

::: widget plot
f: if(abs(x) < 0.001, d, sin(pi*x*d)/(pi*x))
x: -20, 20
y: -0.15, 0.55
sliders: d=0.25:0.05:0.5:0.01
labels: a(k)
hlines: 0
caption: The sinc envelope $a(k) = \sin(\pi kd)/(\pi k)$ of the pulse-train coefficients, plotted against the harmonic number $k$; the actual coefficients are its values at the integers. Reduce the duty cycle $d$: the envelope flattens and widens, so the energy spreads over more harmonics, and the zeros fall at multiples of $k = 1/d$.
:::

## Properties {#sec-properties}

The coefficients of most periodic signals met in practice can be found from a few known series and the properties below, without integrating. We write $x(t) \leftrightarrow a_k$ and $y(t) \leftrightarrow b_k$ for two signals with the same period $T_0$.

::: theorem Properties of the continuous-time Fourier series {#thm-fs-props}
1. **Linearity:** $Ax(t) + By(t) \leftrightarrow Aa_k + Bb_k$.
2. **Time shift:** $x(t - t_0) \leftrightarrow e^{-jk\omega_0t_0}a_k$; the magnitudes are unchanged and the phase of the $k$th harmonic shifts by $-k\omega_0t_0$.
3. **Time reversal:** $x(-t) \leftrightarrow a_{-k}$.
4. **Differentiation:** $\dfrac{\dd x}{\dd t} \leftrightarrow jk\omega_0\,a_k$.
5. **Integration** (if $a_0 = 0$): $\displaystyle\int_{-\infty}^{t}x(\tau)\,\dd\tau \leftrightarrow \frac{a_k}{jk\omega_0}$ for $k \ne 0$.
6. **Parseval's relation:** $\displaystyle\frac{1}{T_0}\int_{T_0}\lvert x(t)\rvert^2\,\dd t = \sum_{k=-\infty}^{\infty}\lvert a_k\rvert^2$.
:::

::: proof
(2) $\frac{1}{T_0}\int x(t - t_0)e^{-jk\omega_0t}\,\dd t$; substitute $\tau = t - t_0$ to get $e^{-jk\omega_0t_0}\frac{1}{T_0}\int x(\tau)e^{-jk\omega_0\tau}\,\dd\tau$. (3) Similarly with $\tau = -t$. (4) Differentiate [[#eq-synthesis]] term by term. (5) is (4) read backwards; the condition $a_0 = 0$ keeps the integral periodic. (6) Write $\lvert x\rvert^2 = x\,x^* = \sum_k\sum_m a_ka_m^*e^{j(k-m)\omega_0t}$ and average over a period: by [[#eq-orthogonality]] only the terms $k = m$ survive.
:::

Parseval's relation says that **average power is the sum of the powers of the harmonics**: the harmonics are orthogonal, so their powers add without cross terms. The differentiation property explains the rates at which spectra decay: a signal with jumps has $a_k \sim 1/k$; a continuous signal with jumps in its slope, such as a triangle wave, has $a_k \sim 1/k^2$; each additional order of smoothness gains another factor of $k$.

::: example The triangle wave from the square wave {#ex-triangle}
Use the integration property to find the Fourier series of the triangle wave obtained by integrating the square wave of [[#ex-square]] (with $A = 1$) and removing its average.
::: solution
The square wave has $a_k = 2/(jk\pi)$ for odd $k$ and $a_0 = 0$. Its integral has coefficients $a_k/(jk\omega_0) = 2/(jk\pi\cdot jk\omega_0) = -2/(\pi\omega_0k^2)$ for odd $k$, and $0$ for even $k \ne 0$; the DC term is fixed separately and we remove it. So the zero-mean triangle wave is

$$
x_{\triangle}(t) = -\frac{4}{\pi\omega_0}\left(\cos\omega_0t + \frac{1}{9}\cos3\omega_0t + \frac{1}{25}\cos5\omega_0t + \cdots\right).
$$

It is even, so only cosines appear; it is continuous, so the coefficients fall as $1/k^2$. Its peak value, at $t = 0$, is $-\frac{4}{\pi\omega_0}\cdot\frac{\pi^2}{8} = -\frac{\pi}{2\omega_0} = -T_0/4$, which agrees with integrating $-1$ for a quarter period from the midpoint of a rising ramp. (The well-known sum $\sum_{k\text{ odd}}1/k^2 = \pi^2/8$ follows from Parseval applied to the square wave.)
:::
:::

::: example Total harmonic distortion of a square wave {#ex-thd}
An inverter produces a square-wave output voltage. Its **total harmonic distortion** is defined as $\mathrm{THD} = \sqrt{\sum_{k\ge2}V_k^2}\,/\,V_1$, the RMS of all harmonics relative to the RMS of the fundamental. Find it.
::: solution
By Parseval, the power of the square wave of amplitude $A$ is $A^2$, and the fundamental (amplitude $4A/\pi$) carries $\frac12(4A/\pi)^2 = 8A^2/\pi^2$. The harmonics therefore carry $A^2 - 8A^2/\pi^2$, and

$$
\mathrm{THD} = \sqrt{\frac{A^2 - 8A^2/\pi^2}{8A^2/\pi^2}} = \sqrt{\frac{\pi^2}{8} - 1} \approx 0.483 = 48.3\%.
$$

No infinite sum was needed. Such a waveform is unacceptable for driving most mains equipment, which is why inverters use pulse-width modulation and output filters to push THD below a few per cent ([[power-electronics]]).
:::
:::

::: quiz
A periodic signal has Fourier coefficients $a_0 = 2$, $a_{\pm1} = 1$, $a_{\pm3} = \pm j/2$ (that is $a_3 = j/2$, $a_{-3} = -j/2$), and all others zero. What is its average power?
- [ ] $3.5$
- [x] $6.5$
- [ ] $4.25$
- [ ] $9$
::: solution
By Parseval, $P = \sum\lvert a_k\rvert^2 = 4 + 1 + 1 + \tfrac14 + \tfrac14 = 6.5$. In real form the signal is $2 + 2\cos\omega_0t - \sin3\omega_0t$, with power $4 + \frac{2^2}{2} + \frac{1^2}{2} = 6.5$, as it must be.
:::
:::

## LTI systems with periodic inputs {#sec-lti}

Here is the payoff. By [[signals-systems/convolution#thm-eigen]], an LTI system with impulse response $h(t)$ responds to $e^{jk\omega_0t}$ with $H(jk\omega_0)\,e^{jk\omega_0t}$, where $H(j\omega) = \int h(t)e^{-j\omega t}\,\dd t$ is its **frequency response**. Linearity does the rest.

::: theorem Response of an LTI system to a periodic input {#thm-lti-periodic}
If $x(t) = \sum_k a_ke^{jk\omega_0t}$ is applied to a stable LTI system with frequency response $H(j\omega)$, the output is periodic with the same period and

$$
y(t) = \sum_{k=-\infty}^{\infty}a_k\,H(jk\omega_0)\,e^{jk\omega_0t},\qquad\text{i.e.}\qquad b_k = H(jk\omega_0)\,a_k.
$$ {#eq-lti-periodic}
:::

Each harmonic is multiplied by the frequency response at its own frequency: its amplitude is scaled by $\lvert H(jk\omega_0)\rvert$ and its phase shifted by $\angle H(jk\omega_0)$. No harmonic is created or moved; an LTI system can only reshape the spectrum it is given. (A nonlinear system, by contrast, creates new harmonics, as in the clipper of [[signals-systems/systems]].) This is the steady-state response; the transient that dies away after the input is switched on is the business of [[signals-systems/laplace-transform]]. For circuits, $H(j\omega)$ is the phasor transfer function of [[circuits-2/frequency-response]].

::: example A square wave through an RC low-pass filter {#ex-rc-square}
A $1\,\mathrm{kHz}$ square wave of amplitude $1\,\mathrm{V}$ drives an RC low-pass filter with $\tau_c = RC = 1\,\mathrm{ms}$, $H(j\omega) = 1/(1 + j\omega\tau_c)$. Find the amplitude and phase of the fundamental and of the third harmonic at the output.
::: solution
$\omega_0 = 2\pi\times10^3\,\mathrm{rad/s}$, so $\omega_0\tau_c = 2\pi \approx 6.283$. The input harmonics have amplitudes $4/(k\pi)\,\mathrm{V}$.

Fundamental: $\lvert H(j\omega_0)\rvert = 1/\sqrt{1 + (2\pi)^2} = 1/6.362 = 0.157$ and $\angle H = -\arctan(2\pi) = -81.0^\circ$. Output amplitude $1.273 \times 0.157 = 0.200\,\mathrm{V}$.

Third harmonic: $3\omega_0\tau_c = 6\pi = 18.85$, $\lvert H\rvert = 1/\sqrt{1 + 18.85^2} = 0.0530$, $\angle H = -87.0^\circ$. Input amplitude $4/(3\pi) = 0.424\,\mathrm{V}$, output $0.0225\,\mathrm{V}$.

Relative to the fundamental, the third harmonic is $1/3 = 33\%$ at the input and $0.0225/0.200 = 11.2\%$ at the output. The cut-off frequency $1/(2\pi\tau_c) = 159\,\mathrm{Hz}$ is far below $1\,\mathrm{kHz}$, so the filter acts nearly as an integrator ($H \approx 1/(j\omega\tau_c)$) and the output is a small triangle wave of peak $T_0/(4\tau_c) = 0.25\,\mathrm{V}$ (to this approximation), in agreement with [[#ex-triangle]].
:::
:::

::: widget plot
f: sum((4/(pi*(2*k + 1)))*(sin((2*k + 1)*x) - (2*k + 1)*w*cos((2*k + 1)*x))/(1 + ((2*k + 1)*w)^2), k, 0, 60); sum((4/(pi*(2*k + 1)))*sin((2*k + 1)*x), k, 0, 60)
x: 0, 4pi
y: -1.4, 1.4
sliders: w=0.3:0:5:0.02
piticks: true
labels: y(t); x(t)
caption: A square wave (orange, period $2\pi$) through an RC low-pass filter, computed harmonic by harmonic from $b_k = a_k/(1 + jk\omega_0\tau_c)$ with $61$ odd harmonics. The slider is $\omega_0\tau_c$. Near $0$ the filter passes everything and the output is the square wave (with Gibbs ripple from the truncation); around $1$ the familiar exponential charge and discharge appear; for large values the output is a small triangle wave, since every harmonic is integrated.
:::

::: quiz
A periodic signal containing harmonics at $1$, $3$ and $5\,\mathrm{kHz}$ is applied to a stable LTI system. Which frequencies can appear in the steady-state output?
- [ ] Any frequency, depending on the system
- [x] Only $1$, $3$ and $5\,\mathrm{kHz}$ (some possibly attenuated to zero)
- [ ] $1$, $3$, $5\,\mathrm{kHz}$ and their sums and differences
- [ ] Only $1\,\mathrm{kHz}$, the fundamental
::: solution
By [[#thm-lti-periodic]] each output coefficient is $b_k = H(jk\omega_0)a_k$, so an output harmonic can be non-zero only where the input has one. Sum and difference frequencies (intermodulation products) are the signature of a *nonlinear* system; finding them in a measured output is a standard test for nonlinearity.
:::
:::

There is a design lesson hidden in [[#eq-lti-periodic]]: to suppress a harmonic relative to the fundamental, the filter's gain must fall between the two frequencies, and how fast it can fall is set by its order.

::: example Designing a filter to clean a square wave {#ex-design-square}
A $1\,\mathrm{kHz}$, $\pm5\,\mathrm{V}$ square wave from a microcontroller is to be turned into a test tone with a single RC low-pass section. The specification is that, at the output, the third-harmonic amplitude must be at most $15\%$ of the fundamental. With $C = 10\,\mathrm{nF}$, choose $R$ from the E24 series and find the output fundamental. What is the best ratio any single RC stage can achieve?
::: solution
Let $r = \omega_0\tau_c$. The input ratio of third to first harmonic is $1/3$, so the output ratio is

$$
\rho(r) = \frac13\cdot\frac{\lvert H(j3\omega_0)\rvert}{\lvert H(j\omega_0)\rvert} = \frac13\sqrt{\frac{1 + r^2}{1 + 9r^2}}.
$$

This falls from $1/3$ at $r = 0$ towards $1/9 \approx 11.1\%$ as $r \to \infty$, so a $15\%$ specification is attainable, but not by much. Setting $\rho = 0.15$: $(1 + r^2) = 9(0.0225)(1 + 9r^2) = 0.2025 + 1.8225r^2$, so $r^2 = 0.7975/0.8225$ and $r = 0.985$. We need $r \ge 0.985$, i.e. $\tau_c \ge 0.985/(2\pi\times10^3) = 0.157\,\mathrm{ms}$ and $R \ge 0.157\,\mathrm{ms}/10\,\mathrm{nF} = 15.7\,\mathrm{k\Omega}$. Choose $R = 16\,\mathrm{k\Omega}$.

Then $\tau_c = 0.16\,\mathrm{ms}$, $r = 1.005$, $\rho = 14.9\%$, and the cut-off is $f_c = 1/(2\pi\tau_c) = 995\,\mathrm{Hz}$. The output fundamental has amplitude $\frac{4\times5}{\pi}\cdot\frac{1}{\sqrt{1 + r^2}} = 6.366/1.418 = 4.49\,\mathrm{V}$, lagging by $45.2^\circ$.

The limit $1/9$ is fundamental: a first-order filter's magnitude falls at most as $1/\omega$ ($-20\,\mathrm{dB/decade}$), so it can improve the $1/k$ decay of the square wave only to $1/k^2$. For a cleaner tone use a second-order or higher filter ([[circuits-2/filters]]), or better, start from a waveform with weaker harmonics.
:::
:::

## The discrete-time Fourier series {#sec-dtfs}

A periodic sequence with period $N$ is determined by $N$ numbers, so it should need only $N$ harmonics. Indeed, by [[signals-systems/signals#thm-dt-sinusoid]], the DT exponentials $e^{jk(2\pi/N)n}$ repeat in $k$ with period $N$: $e^{j(k+N)(2\pi/N)n} = e^{jk(2\pi/N)n}$. There are only $N$ distinct harmonics.

::: definition Discrete-time Fourier series {#def-dtfs}
A sequence $x[n]$ with period $N$ and $\omega_0 = 2\pi/N$ has the **discrete-time Fourier series**

$$
x[n] = \sum_{k=\langle N\rangle}a_k\,e^{jk\omega_0n},\qquad a_k = \frac{1}{N}\sum_{n=\langle N\rangle}x[n]\,e^{-jk\omega_0n},
$$ {#eq-dtfs}

where $\sum_{k=\langle N\rangle}$ means a sum over any $N$ consecutive integers. The coefficients are themselves periodic, $a_{k+N} = a_k$.
:::

Unlike the CT series, there is no question of convergence: both sums are finite, and the pair [[#eq-dtfs]] is an exact, invertible linear map between $N$ samples and $N$ coefficients. The proof is the discrete orthogonality $\frac1N\sum_{n=0}^{N-1}e^{j(k-m)\omega_0n} = 1$ if $k \equiv m \pmod N$ and $0$ otherwise, a finite geometric series. Up to the factor $1/N$, $a_k$ is the **discrete Fourier transform** that the FFT computes ([[dsp]]). Parseval's relation reads $\frac1N\sum_{n=\langle N\rangle}\lvert x[n]\rvert^2 = \sum_{k=\langle N\rangle}\lvert a_k\rvert^2$, and the response of a DT LTI system to a periodic input is, as in [[#thm-lti-periodic]], $b_k = H(e^{jk\omega_0})\,a_k$, with the DT frequency response $H(e^{j\omega}) = \sum_nh[n]e^{-j\omega n}$ of [[signals-systems/discrete-time-fourier]].

::: example DTFS of a short periodic pulse {#ex-dtfs}
Find the DTFS coefficients of the sequence with period $N = 4$ whose values over one period are $x[0] = 1$, $x[1] = 1$, $x[2] = 0$, $x[3] = 0$, and verify Parseval's relation.
::: solution
With $\omega_0 = \pi/2$, $e^{-jk\omega_0n} = (-j)^{kn}$, and only $n = 0, 1$ contribute: $a_k = \frac14\big(1 + (-j)^k\big)$.

- $a_0 = \frac14(1 + 1) = 0.5$ (the average).
- $a_1 = \frac14(1 - j) = 0.25 - 0.25j$.
- $a_2 = \frac14(1 - 1) = 0$.
- $a_3 = \frac14(1 + j) = 0.25 + 0.25j = a_1^*$, as conjugate symmetry ($a_{-1} = a_3$) requires for a real signal.

Parseval: $\sum\lvert a_k\rvert^2 = 0.25 + 0.125 + 0 + 0.125 = 0.5$, and $\frac14\sum\lvert x[n]\rvert^2 = \frac24 = 0.5$. Synthesis check at $n = 1$: $0.5 + (0.25 - 0.25j)j + 0 + (0.25 + 0.25j)(-j) = 0.5 + (0.25j + 0.25) + (-0.25j + 0.25) = 1$. Correct.
:::
:::

::: application Harmonics in power systems
Rectifiers, switch-mode supplies and LED drivers draw currents that are periodic at the mains frequency but far from sinusoidal. A single-phase diode bridge with a capacitor filter draws narrow current pulses near each voltage peak, rich in the 3rd, 5th, 7th … harmonics ($150$, $250$, $350\,\mathrm{Hz}$ on a $50\,\mathrm{Hz}$ system). By Parseval, these harmonics increase the RMS current, and hence conductor heating, without delivering any average power, which only the fundamental current does with a sinusoidal voltage. Standards such as IEC 61000-3-2 limit the harmonic current of each order for equipment connected to the public supply, and power analysers report the Fourier coefficients of the current up to about the 40th harmonic.
:::

## Where this leads

The Fourier series handles periodic signals. Letting the period grow without bound turns the line spectrum into a continuous one and the series into the Fourier integral of [[signals-systems/fourier-transform]]; the DT series likewise becomes the DTFT of [[signals-systems/discrete-time-fourier]], and its finite form is the DFT of [[dsp]]. [[#thm-lti-periodic]] is the reason filters are designed in the frequency domain ([[circuits-2/filters]]), and Parseval's relation reappears as the energy and power spectral densities of [[random-signals]].

::: history
Joseph Fourier presented his memoir on heat conduction, with its claim that arbitrary functions could be expanded in trigonometric series, to the Paris Academy in 1807; the claim was resisted by Lagrange and others, and the work appeared in full as *Théorie analytique de la chaleur* in 1822. Peter Gustav Lejeune Dirichlet gave the first rigorous convergence proof in 1829, under the conditions now named after him. In 1898 Albert Michelson and Samuel Stratton built a mechanical harmonic analyser that summed 80 harmonics and noticed persistent overshoot at discontinuities; J. Willard Gibbs explained it in letters to *Nature* in 1898–99, although Henry Wilbraham had described the effect in 1848.
:::

::: summary
- A periodic signal is $x(t) = \sum a_ke^{jk\omega_0t}$ with $a_k = \frac{1}{T_0}\int_{T_0}x(t)e^{-jk\omega_0t}\,\dd t$; orthogonality of the harmonics gives the coefficient formula.
- For real signals $a_{-k} = a_k^*$; the $k$th harmonic has amplitude $2\lvert a_k\rvert$ and phase $\angle a_k$.
- Square wave: odd harmonics $4A/(k\pi)$; pulse train: a sampled sinc envelope whose width is inversely proportional to the pulse width. Jumps give $1/k$ decay and Gibbs overshoot ($\approx9\%$); continuous signals with slope jumps decay as $1/k^2$.
- Shift, differentiation, integration and Parseval's relation (power is the sum of $\lvert a_k\rvert^2$) save most integrations; THD follows from Parseval.
- An LTI system multiplies each harmonic by $H(jk\omega_0)$: $b_k = H(jk\omega_0)a_k$. It cannot create new frequencies.
- A single first-order section can only steepen a spectrum by $1/k$; harmonic suppression beyond that needs higher-order filters.
- The DT Fourier series has exactly $N$ periodic coefficients, a finite exact transform pair; it is the DFT up to $1/N$.
:::

## Exercises

::: exercise Coefficients by inspection {level=1}
Write the Fourier coefficients of $x(t) = 3 + 4\cos(100\pi t) - 2\sin(300\pi t + \pi/4)$, and give $T_0$.
::: hint
Use Euler's formula for each term; $\omega_0 = 100\pi\,\mathrm{rad/s}$.
:::
::: solution
$T_0 = 20\,\mathrm{ms}$, $\omega_0 = 100\pi$. $a_0 = 3$; $a_{\pm1} = 2$; for the third harmonic, $-2\sin(3\omega_0t + \pi/4) = -\frac{2}{2j}\big(e^{j\pi/4}e^{j3\omega_0t} - e^{-j\pi/4}e^{-j3\omega_0t}\big)$, so $a_3 = je^{j\pi/4} = e^{j3\pi/4}$ and $a_{-3} = -je^{-j\pi/4} = e^{-j3\pi/4}$; all others are zero. Check: $2\lvert a_3\rvert = 2$, the amplitude of the sine.
:::
:::

::: exercise RMS from coefficients {level=1 check="sqrt(9 + 8 + 2)"}
Find the RMS value, in volts, of the signal of the previous exercise (taken as a voltage).
::: solution
By Parseval, $P = 3^2 + 2\cdot2^2 + 2\cdot1^2 = 9 + 8 + 2 = 19\,\mathrm{V^2}$, so $V_{\text{rms}} = \sqrt{19} \approx 4.36\,\mathrm{V}$.
:::
:::

::: exercise Missing harmonics {level=1 check="3"}
A pulse train has duty cycle $d = 1/3$. What is the lowest harmonic number $k > 0$ that is absent from its spectrum?
::: solution
$a_k = \sin(\pi kd)/(\pi k)$ vanishes when $kd$ is a non-zero integer, first at $k = 1/d = 3$. (Every third harmonic is missing.)
:::
:::

::: exercise A shifted square wave {level=2}
The square wave of [[#ex-square]] is delayed by a quarter period, $y(t) = x(t - T_0/4)$. Find its coefficients and show that $y$ is an even signal whose series contains only cosines.
::: solution
By the shift property, $b_k = e^{-jk\omega_0T_0/4}a_k = e^{-jk\pi/2}\cdot\frac{2A}{jk\pi}$ for odd $k$. With $e^{-jk\pi/2} = (-j)^k$, for $k = 1$: $b_1 = -j\cdot\frac{2A}{j\pi} = -\frac{2A}{\pi}$; for $k = 3$: $b_3 = j\cdot\frac{2A}{3j\pi} = \frac{2A}{3\pi}$. All $b_k$ are real, alternating in sign, so $y(t) = -\frac{4A}{\pi}\big(\cos\omega_0t - \frac13\cos3\omega_0t + \frac15\cos5\omega_0t - \cdots\big)$. Check at $t = 0$: $y(0) = x(-T_0/4) = -A$, and $-\frac{4A}{\pi}(1 - \frac13 + \frac15 - \cdots) = -\frac{4A}{\pi}\cdot\frac{\pi}{4} = -A$.
:::
:::

::: exercise Full-wave rectified sine {level=2 check="2/pi"}
Find the DC value $a_0$ and the general coefficient $a_k$ of $x(t) = \lvert\sin t\rvert$ (period $\pi$, $\omega_0 = 2$). Give $a_0$ as the answer.
::: hint
Integrate over $0 < t < \pi$, where $x = \sin t$, and write $\sin t = (e^{jt} - e^{-jt})/(2j)$.
:::
::: solution
$a_0 = \frac1\pi\int_0^\pi\sin t\,\dd t = 2/\pi \approx 0.637$. In general $a_k = \frac1\pi\int_0^\pi\sin t\,e^{-j2kt}\,\dd t = \frac{2}{\pi(1 - 4k^2)}$: real (the signal is even) and negative for $k \ne 0$, with $a_{\pm1} = -2/(3\pi)$. So $\lvert\sin t\rvert = \frac2\pi - \frac{4}{3\pi}\cos2t - \frac{4}{15\pi}\cos4t - \cdots$. The coefficients fall as $1/k^2$ because the waveform is continuous with corners. This is the output of a full-wave rectifier, with the DC component $2/\pi$ of the peak and a dominant ripple at twice the mains frequency.
:::
:::

::: exercise Ripple after an RC filter {level=2 check="(4/(3*pi))/sqrt(1 + (2*2*pi*50*0.1)^2)"}
The full-wave rectified $50\,\mathrm{Hz}$ sine of the previous exercise, with peak $1\,\mathrm{V}$, passes through an RC low-pass with $\tau_c = 0.1\,\mathrm{s}$ (ignore loading). Its fundamental is at $100\,\mathrm{Hz}$. Find the amplitude, in volts, of the $100\,\mathrm{Hz}$ ripple at the output.
::: solution
The $100\,\mathrm{Hz}$ term has amplitude $4/(3\pi) = 0.424\,\mathrm{V}$ at the input. At $\omega = 2\pi\cdot100\,\mathrm{rad/s}$, $\omega\tau_c = 62.8$ and $\lvert H\rvert = 1/\sqrt{1 + 62.8^2} = 0.0159$. The ripple amplitude is $0.424\times0.0159 = 6.75\,\mathrm{mV}$, on a DC level of $0.637\,\mathrm{V}$ (passed with gain $1$).
:::
:::

::: exercise A DT periodic signal {level=2}
Find the DTFS coefficients of $x[n] = 1 + \cos(\pi n/2) + \sin(\pi n)$ and its period.
::: solution
$\sin(\pi n) = 0$ for every integer $n$, so it contributes nothing. $\cos(\pi n/2)$ has period $4$, so $N = 4$, $\omega_0 = \pi/2$. Then $a_0 = 1$, $a_1 = a_{-1} = a_3 = \tfrac12$, $a_2 = 0$. Check: the samples are $x = \{3, 1, -1, 1\}$ for $n = 0, 1, 2, 3$, and $a_0 = (3 + 1 - 1 + 1)/4 = 1$.
:::
:::

::: exercise Ideal low-pass filtering of a square wave {level=3}
A square wave of amplitude $1$ and fundamental frequency $1\,\mathrm{kHz}$ passes through an ideal low-pass filter with gain $1$ for $\lvert f\rvert < 4\,\mathrm{kHz}$ and $0$ above. Write the output, find the fraction of the input power that is passed, and estimate the peak value of the output.
::: hint
Which harmonics lie below $4\,\mathrm{kHz}$? Use Parseval for the power; for the peak, evaluate the partial sum near $t = T_0/6$.
:::
::: solution
Only the 1st and 3rd harmonics pass: $y(t) = \frac4\pi\big(\sin\omega_0t + \frac13\sin3\omega_0t\big)$. Power passed: $\frac12\big(\frac4\pi\big)^2(1 + \frac19) = \frac{8}{\pi^2}\cdot\frac{10}{9} = 0.901$ of the input power $1$. The derivative $\frac{4}{\pi}\omega_0(\cos\omega_0t + \cos3\omega_0t)$ vanishes where $\cos3\theta = -\cos\theta$, first at $\theta = \pi/4$ ($t = T_0/8$): there $y = \frac4\pi\big(\frac{\sqrt2}{2} + \frac13\cdot\frac{\sqrt2}{2}\big) = \frac4\pi\cdot\frac{2\sqrt2}{3} = 1.200$. (At $\theta = \pi/2$ the value is $\frac4\pi\cdot\frac23 = 0.849$, a dip.) The output overshoots the square wave by $20\%$ with only two harmonics; as more pass, the overshoot settles to the Gibbs value of about $18\%$ of the amplitude ($9\%$ of the jump).
:::
:::

::: exercise Deriving the response of an RC filter to a square wave {level=3}
For the RC filter driven by the $\pm1$ square wave, the time-domain steady-state solution is a periodic sequence of exponential segments. Show that during $0 < t < T_0/2$ it is $y(t) = 1 - (1 + Y)e^{-t/\tau_c}$, where $Y = \tanh(T_0/(4\tau_c))$ is the peak of $y$, and check the value $Y \approx 0.25\cdot T_0/\tau_c$ for $\tau_c \gg T_0$ against [[#ex-rc-square]]. Why might one prefer the time-domain or the Fourier answer?
::: hint
By symmetry, $y(0) = -Y$ and $y(T_0/2) = +Y$. Solve $\tau_cy' + y = 1$ on the first half period.
:::
::: solution
On $0 < t < T_0/2$ the input is $+1$ and $y(t) = 1 + (y(0) - 1)e^{-t/\tau_c}$. Half-wave symmetry of the steady state gives $y(T_0/2) = -y(0) = Y$. So $Y = 1 - (1 + Y)e^{-T_0/(2\tau_c)}$; with $q = e^{-T_0/(2\tau_c)}$, $Y(1 + q) = 1 - q$ and $Y = (1 - q)/(1 + q) = \tanh(T_0/(4\tau_c))$. For $\tau_c \gg T_0$, $\tanh u \approx u$ gives $Y \approx T_0/(4\tau_c)$; with $T_0 = \tau_c = 1\,\mathrm{ms}$ the exact value is $\tanh(0.25) = 0.245$, close to the approximation $0.25$ used in [[#ex-rc-square]]. The time-domain answer is exact and closed-form here because the input is piecewise constant; the Fourier answer generalises to any periodic input and any filter and directly gives harmonic content, which is what distortion specifications ask for.
:::
:::
