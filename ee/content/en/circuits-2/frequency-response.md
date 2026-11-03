Turn the tuning dial of an analogue radio and you hear one station rise out of the noise while the others fade: a resonant circuit is responding strongly at one frequency and weakly at its neighbours. Turn up the bass on a hi-fi and the low notes grow while the high ones stay the same. Both are statements about how a circuit's response depends on **frequency**. Up to now the phasor analysis of [[circuits-2/ac-analysis]] has answered a question at one frequency at a time. In this lesson we keep the frequency as a variable and study the whole function.

The central object is the **transfer function** $H(j\omega)$, the ratio of an output phasor to an input phasor, which is a complex-valued function of $\omega$. We learn to read it, to plot it on logarithmic axes as a **Bode plot** that can be sketched by hand from straight-line asymptotes, and to use it to analyse the most important frequency-selective circuit of all, the **resonant** $RLC$ circuit, with its bandwidth and quality factor. These ideas are the foundation of [[circuits-2/filters]], of the Laplace-domain analysis in [[circuits-2/laplace-circuit-analysis]], and of most of signal processing and control.

## The transfer function

Because a linear circuit driven by a sinusoid responds in the steady state with a sinusoid of the same frequency, the relation between any input and any output at frequency $\omega$ is a single complex number: the output phasor divided by the input phasor.

::: definition Transfer function {#def-transfer}
The **transfer function** (or **network function**) of a linear circuit from an input $\mathbf X$ to an output $\mathbf Y$ is

$$
H(j\omega) = \frac{\mathbf Y(\omega)}{\mathbf X(\omega)},
$$

the ratio of the output phasor to the input phasor when the circuit is driven by a sinusoid of angular frequency $\omega$ with all other independent sources set to zero. Its magnitude $\abs{H(j\omega)}$ is the **gain** and its angle $\angle H(j\omega)$ the **phase shift**; their graphs against $\omega$ are the **magnitude response** and **phase response**. Depending on the choice of input and output, $H$ is a voltage gain ($\mathbf V_o/\mathbf V_i$), a current gain, a transfer impedance ($\mathbf V_o/\mathbf I_i$), or a transfer admittance.
:::

If the input is $x(t) = X_m\cos(\omega t + \phi)$, the steady-state output is

$$
y(t) = \abs{H(j\omega)}\,X_m\cos\bigl(\omega t + \phi + \angle H(j\omega)\bigr).
$$ {#eq-ss-response}

The circuit scales the amplitude by the gain and shifts the phase by the phase shift.

For a circuit made of $R$, $L$, $C$ and controlled sources, the impedances are $R$, $j\omega L$ and $1/(j\omega C)$, so nodal or mesh analysis always produces $H$ as a ratio of two polynomials in $j\omega$ with real coefficients. Writing $s = j\omega$, as we shall justify in [[circuits-2/laplace-circuit-analysis]],

$$
H(s) = K\frac{(s - z_1)(s - z_2)\cdots(s - z_m)}{(s - p_1)(s - p_2)\cdots(s - p_n)}.
$$

The roots $z_i$ of the numerator are the **zeros** and the roots $p_i$ of the denominator the **poles**. Complex poles and zeros occur in conjugate pairs. The whole frequency response is set by these numbers and the constant $K$.

::: example An RC low-pass circuit {#ex-rc}
A resistor $R = 1\,\mathrm{k\Omega}$ is in series with a capacitor $C = 0.1\,\mathrm{\mu F}$, the input voltage is applied across the pair and the output is taken across the capacitor. Find $H(j\omega) = \mathbf V_o/\mathbf V_i$ and evaluate it at $100\,\mathrm{Hz}$, $1.59\,\mathrm{kHz}$ and $10\,\mathrm{kHz}$.
::: solution
By the voltage divider,

$$
H(j\omega) = \frac{1/(j\omega C)}{R + 1/(j\omega C)} = \frac{1}{1 + j\omega RC} = \frac{1}{1 + j\omega/\omega_c}, \qquad \omega_c = \frac{1}{RC} = 10^4\,\mathrm{rad/s}.
$$

So $f_c = \omega_c/2\pi = 1.59\,\mathrm{kHz}$, the gain is $\abs{H} = 1/\sqrt{1 + (\omega/\omega_c)^2}$ and the phase $-\arctan(\omega/\omega_c)$:

| $f$ | $\omega/\omega_c$ | $\abs{H}$ | $20\log_{10}\abs{H}$ | $\angle H$ |
|---|---|---|---|---|
| $100\,\mathrm{Hz}$ | $0.0628$ | $0.998$ | $-0.02\,\mathrm{dB}$ | $-3.6^\circ$ |
| $1.59\,\mathrm{kHz}$ | $1$ | $0.707$ | $-3.01\,\mathrm{dB}$ | $-45^\circ$ |
| $10\,\mathrm{kHz}$ | $6.28$ | $0.157$ | $-16.1\,\mathrm{dB}$ | $-81.0^\circ$ |

Low frequencies pass almost unchanged; high frequencies are attenuated and delayed. At $\omega_c$ the output power into a fixed load is half its low-frequency value, so $\omega_c$ is called the **half-power** or **$-3\,\mathrm{dB}$ frequency**. The circuit has one pole at $s = -\omega_c$ and no finite zeros.
:::
:::

## Decibels

Gains in electronics range over many orders of magnitude, and the gains of cascaded stages multiply. Both facts favour a logarithmic measure.

::: definition Decibel {#def-db}
The gain of a power ratio in **decibels** is $10\log_{10}(P_2/P_1)$. For a voltage or current ratio, assuming equal impedances, the power ratio is the square of the amplitude ratio, so

$$
\abs{H}_{\mathrm{dB}} = 20\log_{10}\abs{H(j\omega)}.
$$ {#eq-db}
:::

Useful values to remember: a factor of $10$ in voltage is $20\,\mathrm{dB}$; a factor of $2$ is $6.02\,\mathrm{dB}$; $\sqrt2$ is $3.01\,\mathrm{dB}$; $1/\sqrt2$ is $-3.01\,\mathrm{dB}$; a gain of $1$ is $0\,\mathrm{dB}$. When stages are cascaded without loading one another, their gains in decibels **add**, because the logarithm of a product is the sum of the logarithms. This is the property that makes Bode plots work.

::: warning 10 log or 20 log?
Use $10\log_{10}$ for ratios of **power** and $20\log_{10}$ for ratios of **amplitude** (voltage, current, field strength). Both give the same number of decibels for the same physical situation: doubling the voltage across a resistor quadruples its power, and $20\log_{10}2 = 10\log_{10}4 = 6.02\,\mathrm{dB}$. Applying $10\log$ to a voltage ratio halves every decibel figure. Absolute levels add a suffix that names the reference: $\mathrm{dBm}$ is relative to $1\,\mathrm{mW}$, $\mathrm{dBV}$ to $1\,\mathrm{V}$ RMS.
:::

::: quiz
An amplifier has a voltage gain of $200$, followed by a cable with a voltage attenuation of $0.5$. What is the overall gain in decibels?
- [x] $40\,\mathrm{dB}$
- [ ] $46\,\mathrm{dB}$
- [ ] $43\,\mathrm{dB}$
- [ ] $20\,\mathrm{dB}$
::: solution
The overall voltage gain is $200\times0.5 = 100$, which is $20\log_{10}100 = 40\,\mathrm{dB}$. In decibels: $20\log_{10}200 = 46.02\,\mathrm{dB}$ plus $20\log_{10}0.5 = -6.02\,\mathrm{dB}$, again $40\,\mathrm{dB}$. The answer $43\,\mathrm{dB}$ comes from mistakenly using $10\log_{10}$ for the cable, and $46\,\mathrm{dB}$ from ignoring it.
:::
:::

## Bode plots

A **Bode plot** is a pair of graphs: the magnitude in decibels and the phase in degrees, both against frequency on a **logarithmic** axis. A factor of $10$ in frequency is a **decade**, a factor of $2$ an **octave**. On these axes every factor of $H$ contributes a curve that is almost a straight line, and the contributions of the factors add.

Write $H$ in **Bode (standard) form**, with each real pole or zero as $(1 + j\omega/\omega_k)$ so that it equals $1$ at low frequency:

$$
H(j\omega) = K\,(j\omega)^{\pm N}\,\frac{\prod_i(1 + j\omega/\omega_{zi})\cdots}{\prod_k(1 + j\omega/\omega_{pk})\cdots}.
$$

Then $\abs{H}_{\mathrm{dB}}$ is the sum of $20\log_{10}\abs{K}$, $\pm20N\log_{10}\omega$, $+20\log_{10}\abs{1 + j\omega/\omega_{zi}}$ for each zero and $-20\log_{10}\abs{1 + j\omega/\omega_{pk}}$ for each pole, and the phase is the sum of the angles.

::: theorem Bode asymptotes of a first-order factor {#thm-first-order}
For a simple real pole $1/(1 + j\omega/\omega_c)$ with $\omega_c > 0$:

- for $\omega \ll \omega_c$ the magnitude approaches $0\,\mathrm{dB}$ and the phase $0^\circ$;
- for $\omega \gg \omega_c$ the magnitude approaches the line $-20\log_{10}(\omega/\omega_c)$, a slope of $-20\,\mathrm{dB/decade}$ ($-6\,\mathrm{dB/octave}$), and the phase $-90^\circ$;
- at the **corner** (or **break**) frequency $\omega = \omega_c$ the exact magnitude is $-3.01\,\mathrm{dB}$, the largest error of the two-line asymptote, and the phase is $-45^\circ$;
- the phase is approximated by a straight line from $0^\circ$ at $0.1\,\omega_c$ to $-90^\circ$ at $10\,\omega_c$, with maximum error $5.7^\circ$.

A simple zero $1 + j\omega/\omega_c$ gives the mirror image: $+20\,\mathrm{dB/decade}$ and $+90^\circ$. A pole at the origin $1/(j\omega)$ is a straight line of slope $-20\,\mathrm{dB/decade}$ through $0\,\mathrm{dB}$ at $\omega = 1$, with constant phase $-90^\circ$.
:::

::: proof
The magnitude in decibels is $-10\log_{10}\bigl(1 + u^2\bigr)$ with $u = \omega/\omega_c$. For $u \ll 1$, $1 + u^2 \approx 1$ and the logarithm is near $0$. For $u \gg 1$, $1 + u^2 \approx u^2$ and the magnitude is $-20\log_{10}u$, which falls by $20\,\mathrm{dB}$ for every factor $10$ in $u$. At $u = 1$ it is $-10\log_{10}2 = -3.01\,\mathrm{dB}$. The error of the two asymptotes, $-10\log_{10}(1 + u^2)$ minus $\min(0, -20\log_{10}u)$, is even in $\log u$ and largest at $u = 1$; at $u = 2$ or $u = 1/2$ it is $10\log_{10}1.25 = 0.97\,\mathrm{dB}$. The phase is $-\arctan u$, which is $-45^\circ$ at $u = 1$, $-5.7^\circ$ at $u = 0.1$ and $-84.3^\circ$ at $u = 10$, hence the stated error of the straight-line phase approximation at its ends.
:::

::: algorithm Sketching a Bode magnitude plot {#alg-bode}
1. Write $H(j\omega)$ in Bode form and list the corner frequencies in increasing order.
2. Find the low-frequency asymptote: $20\log_{10}\abs{K}$ plus $\pm20N\log_{10}\omega$ for $N$ poles or zeros at the origin.
3. Move from left to right. At each zero's corner add $+20\,\mathrm{dB/decade}$ to the slope; at each pole's corner add $-20\,\mathrm{dB/decade}$ (twice that for a double factor).
4. Round the corners: $\pm3\,\mathrm{dB}$ at each simple corner, $\pm1\,\mathrm{dB}$ an octave either side.
5. For the phase, add $\pm45^\circ$/decade ramps spanning $0.1\,\omega_k$ to $10\,\omega_k$ around each corner.
:::

::: example A Bode plot from its factors {#ex-bode}
Sketch the Bode magnitude of

$$
H(j\omega) = \frac{10\,(1 + j\omega/100)}{(1 + j\omega/10)(1 + j\omega/1000)},
$$

and compare the asymptotes with the exact values at $\omega = 1$, $10$, $100$, $1000$ and $10^4\,\mathrm{rad/s}$.
::: solution
The function is already in Bode form, with $K = 10$ ($20\,\mathrm{dB}$), poles at $10$ and $1000\,\mathrm{rad/s}$ and a zero at $100\,\mathrm{rad/s}$. Following [[#alg-bode]]: the asymptote is flat at $20\,\mathrm{dB}$ up to $10\,\mathrm{rad/s}$; it falls at $-20\,\mathrm{dB/decade}$ from $10$ to $100$, reaching $0\,\mathrm{dB}$; the zero cancels the slope, so it is flat at $0\,\mathrm{dB}$ from $100$ to $1000$; and the second pole makes it fall at $-20\,\mathrm{dB/decade}$ beyond $1000$, reaching $-20\,\mathrm{dB}$ at $10^4$.

| $\omega$ (rad/s) | $1$ | $10$ | $100$ | $1000$ | $10^4$ |
|---|---|---|---|---|---|
| asymptote (dB) | $20$ | $20$ | $0$ | $0$ | $-20$ |
| exact (dB) | $19.96$ | $17.03$ | $2.92$ | $-2.97$ | $-20.04$ |
| exact phase | $-5.2^\circ$ | $-39.9^\circ$ | $-45.0^\circ$ | $-50.1^\circ$ | $-84.8^\circ$ |

The errors are close to $3\,\mathrm{dB}$ at each corner, with the sign of that corner's factor, as [[#thm-first-order]] predicts. The phase never quite reaches $-90^\circ$ in the middle band because the zero's $+90^\circ$ partly cancels the poles' $-180^\circ$.
:::
:::

::: widget plot
f: 20 + 10*log10(1 + (10^x/100)^2) - 10*log10(1 + (10^x/10)^2) - 10*log10(1 + (10^x/1000)^2); 20 + max(0, 20*(x - 2)) - max(0, 20*(x - 1)) - max(0, 20*(x - 3))
x: -1, 5
y: -45, 25
labels: \lvert H\rvert_{\mathrm{dB}}; \text{asymptotes}
vlines: 1; 2; 3
caption: Bode magnitude of the example against $x = \log_{10}\omega$ (so $x = 2$ is $100\,\mathrm{rad/s}$). The exact curve (first) and the straight-line asymptotes (second) differ by at most about $3\,\mathrm{dB}$, at the three corners marked by the vertical lines. Hover over $x = 1$, $2$ and $3$ to read the differences, then a decade away from each corner to see how quickly the error vanishes.
:::

### Quadratic factors

A pair of complex-conjugate poles is written as one quadratic factor,

$$
\frac{1}{1 + 2\zeta(j\omega/\omega_n) + (j\omega/\omega_n)^2},
$$

with **natural frequency** $\omega_n$ and **damping ratio** $\zeta$ (the same $\zeta$ as in [[circuits-1/second-order-circuits]]; complex poles need $\zeta < 1$). Its asymptotes are $0\,\mathrm{dB}$ below $\omega_n$ and $-40\,\mathrm{dB/decade}$ above it, and the phase goes from $0^\circ$ to $-180^\circ$, passing $-90^\circ$ at $\omega_n$. But the error near the corner now depends on $\zeta$: at $\omega = \omega_n$ the exact magnitude is $1/(2\zeta)$, which is $+6\,\mathrm{dB}$ for $\zeta = 0.25$ and $+20\,\mathrm{dB}$ for $\zeta = 0.05$. For $\zeta < 1/\sqrt2$ the magnitude has a **resonant peak** above the asymptotes, and the smaller $\zeta$, the higher and narrower the peak and the more abrupt the phase change.

::: widget plot
f: -10*log10((1 - 10^(2x))^2 + (2*z*10^x)^2); -max(0, 40*x)
x: -1.5, 1.5
y: -50, 25
sliders: z=0.2:0.02:1.5:0.01
labels: \lvert H\rvert_{\mathrm{dB}}; \text{asymptote}
caption: A quadratic pole pair against $x = \log_{10}(\omega/\omega_n)$, with the damping ratio $\zeta$ on the slider. For $\zeta = 1$ (two equal real poles) the curve lies $6\,\mathrm{dB}$ below the corner of the asymptote. Lower $\zeta$: a resonant peak grows at $\omega \approx \omega_n$, reaching $1/(2\zeta)$, about $+28\,\mathrm{dB}$ at $\zeta = 0.02$. Above $\zeta \approx 0.71$ there is no peak at all.
:::

## Series resonance

The series $RLC$ circuit driven by a voltage source has impedance

$$
Z(j\omega) = R + j\left(\omega L - \frac{1}{\omega C}\right).
$$

The reactance is negative (capacitive) at low frequency, positive (inductive) at high frequency, and zero at one frequency in between.

::: definition Resonance, quality factor and bandwidth {#def-resonance}
A circuit is at **resonance** when its input impedance (or admittance) is purely real. For the series $RLC$ circuit this occurs at the **resonant frequency**

$$
\omega_0 = \frac{1}{\sqrt{LC}}.
$$

The **quality factor** is $Q = \omega_0L/R = 1/(\omega_0CR)$, and the **bandwidth** $B = \omega_2 - \omega_1$ is the width of the band between the two **half-power frequencies** $\omega_1 < \omega_0 < \omega_2$, at which the current is $1/\sqrt2$ of its maximum and the power is half its maximum.
:::

The physical meaning of $Q$ is energy storage: $Q = 2\pi\times(\text{peak energy stored})/(\text{energy dissipated per cycle})$ at resonance. A circuit with a high $Q$ stores much energy compared with what it loses each cycle, rings for many cycles when struck, and responds to a narrow range of frequencies.

::: theorem Bandwidth of the series RLC circuit {#thm-bandwidth}
For the series $RLC$ circuit driven by a voltage $\mathbf V_s$, the current is maximal at $\omega_0$, where $\mathbf I = \mathbf V_s/R$. The half-power frequencies are

$$
\omega_{1,2} = \mp\frac{R}{2L} + \sqrt{\left(\frac{R}{2L}\right)^2 + \frac{1}{LC}},
$$ {#eq-half-power}

so that

$$
B = \omega_2 - \omega_1 = \frac{R}{L} = \frac{\omega_0}{Q}, \qquad \omega_1\omega_2 = \omega_0^2.
$$ {#eq-bw}

The resonant frequency is the **geometric** mean of the half-power frequencies. For $Q \gg 1$, $\omega_{1,2} \approx \omega_0 \mp B/2$.
:::

::: proof
The current magnitude is $\abs{\mathbf V_s}/\abs{Z}$, with $\abs{Z}^2 = R^2 + (\omega L - 1/(\omega C))^2 \ge R^2$, equality exactly at $\omega_0$. The power $\abs{\mathbf I}^2R$ is halved when $\abs{Z}^2 = 2R^2$, that is when $\omega L - 1/(\omega C) = \pm R$. Multiplying by $\omega/L$: $\omega^2 \mp (R/L)\omega - 1/(LC) = 0$. Each quadratic has one positive root; they are $\omega = \pm R/(2L) + \sqrt{(R/2L)^2 + 1/LC}$, which is [[#eq-half-power]]. Their difference is $R/L$ and their product is $(R/2L)^2 + 1/(LC) - (R/2L)^2 = 1/(LC) = \omega_0^2$. Finally $R/L = \omega_0\cdot R/(\omega_0L) = \omega_0/Q$.
:::

In normalised form, with $u = \omega/\omega_0$, the current relative to its maximum is

$$
\frac{\abs{\mathbf I}}{\abs{\mathbf I}_{\max}} = \frac{1}{\sqrt{1 + Q^2\left(u - 1/u\right)^2}},
$$ {#eq-normalised}

so the shape of every series resonance is set by $Q$ alone.

::: widget plot
f: 1/sqrt(1 + q^2*(x - 1/x)^2); 1/sqrt(2)
x: 0.2, 3
y: 0, 1.05
sliders: q=5:0.5:50:0.5
labels: \lvert I\rvert / I_{\max}; 1/\sqrt{2}
caption: Normalised current of a series resonant circuit against $u = \omega/\omega_0$ for quality factor $Q$ (slider). The curve crosses the horizontal line $1/\sqrt2$ at the half-power frequencies, which are $1/Q$ apart in $u$. Raise $Q$ from $1$ to $50$ and watch the peak sharpen; notice that the curve is not symmetric on this linear axis, because $u_1u_2 = 1$.
:::

### Voltage magnification

At resonance the current is $\mathbf V_s/R$, and the voltage across the inductor is $j\omega_0L\,\mathbf V_s/R = jQ\,\mathbf V_s$. The capacitor voltage is $-jQ\,\mathbf V_s$. The two cancel each other, which is why the source sees only $R$, but **each is $Q$ times the source voltage**. In a high-$Q$ circuit a small source can drive dangerously large voltages across the reactive elements.

::: example A series resonant circuit {#ex-series}
A series circuit has $R = 2\,\Omega$, $L = 1\,\mathrm{mH}$ and $C = 0.4\,\mathrm{\mu F}$, driven by a $1\,\mathrm{V}$ (rms) source of variable frequency. Find $\omega_0$, $Q$, $B$, the half-power frequencies, and the capacitor voltage at resonance.
::: solution
$\omega_0 = 1/\sqrt{(10^{-3})(0.4\times10^{-6})} = 1/\sqrt{4\times10^{-10}} = 50\,000\,\mathrm{rad/s}$, that is $f_0 = 7.96\,\mathrm{kHz}$. Then

$$
Q = \frac{\omega_0L}{R} = \frac{50\,000\times10^{-3}}{2} = 25, \qquad B = \frac{R}{L} = 2000\,\mathrm{rad/s}\ (318\,\mathrm{Hz}).
$$

By [[#eq-half-power]], with $R/2L = 1000\,\mathrm{rad/s}$: $\omega_{1,2} = \mp1000 + \sqrt{10^6 + 2.5\times10^9} = \mp1000 + 50\,010$, so $\omega_1 = 49\,010\,\mathrm{rad/s}$ and $\omega_2 = 51\,010\,\mathrm{rad/s}$. Check: $\sqrt{\omega_1\omega_2} = 50\,000$. The approximation $\omega_0 \mp B/2$ gives $49\,000$ and $51\,000$, within $0.02\,\%$.

At resonance $I = 1/2 = 0.5\,\mathrm{A}$ and $\abs{\mathbf V_C} = I/(\omega_0C) = 0.5/(0.02) = 25\,\mathrm{V} = Q\times1\,\mathrm{V}$. The capacitor must be rated for at least $25\sqrt2 = 35\,\mathrm{V}$ peak although the source is only $1\,\mathrm{V}$.
:::
:::

## Parallel resonance

The dual circuit is a resistor, inductor and capacitor in parallel, driven by a current source. Its admittance is

$$
Y(j\omega) = \frac1R + j\left(\omega C - \frac{1}{\omega L}\right),
$$

which is real at the same $\omega_0 = 1/\sqrt{LC}$. At resonance the admittance is minimal, so the **voltage** is maximal, $\mathbf V = R\,\mathbf I_s$; the inductor and capacitor currents are $Q$ times the source current and circulate between them. Every result for the series circuit carries over by duality ($R \leftrightarrow 1/R$, $L \leftrightarrow C$, $\mathbf V \leftrightarrow \mathbf I$):

$$
Q = \omega_0RC = \frac{R}{\omega_0L}, \qquad B = \frac{1}{RC}, \qquad \omega_{1,2} = \mp\frac{1}{2RC} + \sqrt{\left(\frac{1}{2RC}\right)^2 + \frac{1}{LC}}.
$$

Note the inversion: in a parallel circuit a **larger** $R$ gives a higher $Q$, since less current is diverted from the tank. The parallel tuned circuit, sometimes called a **tank circuit**, is the frequency-selective load of radio-frequency amplifiers and the frequency-determining element of $LC$ oscillators.

::: quiz
The resistance of a parallel $RLC$ circuit is doubled while $L$ and $C$ stay the same. What happens?
- [ ] $\omega_0$ doubles
- [ ] The bandwidth doubles
- [x] $Q$ doubles and the bandwidth halves
- [ ] $Q$ halves
::: solution
$\omega_0 = 1/\sqrt{LC}$ is unchanged. $Q = \omega_0RC$ doubles and $B = 1/(RC) = \omega_0/Q$ halves. In the **series** circuit the opposite happens: doubling $R$ halves $Q$.
:::
:::

::: example Designing a tuned circuit {#ex-design}
A receiver needs a tuned circuit centred on $1\,\mathrm{MHz}$ with a bandwidth of $10\,\mathrm{kHz}$, using an available $100\,\mathrm{\mu H}$ inductor. Design (a) a series circuit and (b) a parallel circuit. Comment on the result.
::: solution
The required quality factor is $Q = f_0/B = 10^6/10^4 = 100$, and $\omega_0 = 2\pi\times10^6 = 6.283\times10^6\,\mathrm{rad/s}$. In both cases

$$
C = \frac{1}{\omega_0^2L} = \frac{1}{(6.283\times10^6)^2\times10^{-4}} = 253\,\mathrm{pF}.
$$

(a) Series: $R = \omega_0L/Q = 628.3/100 = 6.28\,\Omega$. This total includes the inductor's own winding resistance and the source resistance, so the source must have well under $6\,\Omega$ of internal resistance.

(b) Parallel: $R = Q\,\omega_0L = 100\times628.3 = 62.8\,\mathrm{k\Omega}$, the parallel combination of an added resistor, the source resistance and the loss of the inductor.

A real $100\,\mathrm{\mu H}$ coil at $1\,\mathrm{MHz}$ may have a $Q$ of about $100$ to $200$ on its own, so the coil's loss is a large part of the design: a specified bandwidth can only be achieved if the components' own $Q$ is higher than the circuit's. A variable capacitor of about $30$–$365\,\mathrm{pF}$ with this coil tunes the medium-wave band, since $f \propto 1/\sqrt C$.
:::
:::

::: remark Resonance in power systems
Resonance is not always welcome. Power-factor correction capacitors ([[circuits-2/ac-power]]) together with the inductance of the supply transformer form a resonant circuit, often tuned near the fifth or seventh harmonic of the mains. If loads inject harmonic currents near that frequency, the parallel resonance magnifies the harmonic voltage and can destroy the capacitors. Engineers deliberately detune such banks with series reactors.
:::

::: application The quartz crystal
A quartz crystal resonator behaves electrically like a series $RLC$ circuit (in parallel with a small capacitance) with a quality factor of $10^4$ to $10^6$, thousands of times higher than any coil and capacitor. Its resonant frequency is set by the mechanical dimensions of the quartz and changes by only parts per million with temperature. That is why the clock of every computer, phone and watch is a crystal oscillator, usually at $32.768\,\mathrm{kHz}$ in watches ($2^{15}$ cycles per second) or tens of megahertz in processors.
:::

::: history
The resonance of electrical circuits was demonstrated by Heinrich Hertz in his radio-wave experiments of 1886–1888, and Oliver Lodge patented "syntonic" tuning of transmitter and receiver in 1897, the basis of selecting one station among many. The symbol $Q$ for the quality factor of a coil is attributed to K. S. Johnson of the Western Electric engineering department, around 1914. The decibel grew out of the "transmission unit" used by the Bell System to measure losses in telephone lines; it was renamed in 1928, the bel honouring Alexander Graham Bell. Hendrik Bode, at Bell Telephone Laboratories, developed the asymptotic logarithmic plots and the relations between gain and phase for feedback amplifier design in papers of 1940 and his book *Network Analysis and Feedback Amplifier Design* (1945).
:::

## Where this leads

The transfer function is the language of the next three lessons and of much of the curriculum. [[circuits-2/filters]] shapes $\abs{H(j\omega)}$ deliberately, with passive and op-amp circuits, and uses the series and parallel resonance of this lesson as band-pass and band-stop filters. [[circuits-2/laplace-circuit-analysis]] replaces $j\omega$ by a general complex frequency $s$, explains why the poles determine the transient response as well as the frequency response, and connects the damping ratio $\zeta$ to the location of the poles. In [[signals-systems]] the frequency response becomes the Fourier transform of the impulse response; in [[control-systems]] Bode plots of the loop gain measure stability margins; and in [[electronics-1]] they describe the bandwidth of amplifiers.

::: summary
- The transfer function $H(j\omega) = \mathbf Y/\mathbf X$ is the ratio of output to input phasors; the steady-state output is the input scaled by $\abs{H}$ and shifted by $\angle H$.
- For $RLC$ circuits $H$ is a ratio of polynomials in $s = j\omega$, fixed by its poles, zeros and a constant.
- Decibels: $20\log_{10}$ for amplitude ratios, $10\log_{10}$ for power ratios; gains of cascaded stages add in dB.
- A Bode plot is built by adding straight-line asymptotes: $\pm20\,\mathrm{dB/decade}$ per real pole or zero beyond its corner, with $\pm3\,\mathrm{dB}$ and $\pm45^\circ$ at the corner; a complex pair gives $-40\,\mathrm{dB/decade}$ and a peak of $1/(2\zeta)$ when lightly damped.
- Series $RLC$: $\omega_0 = 1/\sqrt{LC}$, $Q = \omega_0L/R$, $B = R/L = \omega_0/Q$, $\omega_1\omega_2 = \omega_0^2$; the reactive voltages are $Q$ times the source voltage at resonance.
- Parallel $RLC$: same $\omega_0$, $Q = \omega_0RC$, $B = 1/(RC)$; larger $R$ means higher $Q$.
:::

## Exercises

::: exercise A gain in decibels {level=1 check="40"}
An amplifier's output voltage is $100$ times its input voltage. What is its gain in dB?
::: solution
$20\log_{10}100 = 40\,\mathrm{dB}$.
:::
:::

::: exercise Corner frequency {level=1 check="1/(2*pi*1000*1e-6)"}
An $RC$ low-pass circuit has $R = 1\,\mathrm{k\Omega}$ and $C = 1\,\mathrm{\mu F}$. What is its $-3\,\mathrm{dB}$ frequency, in hertz?
::: solution
$f_c = 1/(2\pi RC) = 1/(2\pi\times10^{-3}) = 159.2\,\mathrm{Hz}$.
:::
:::

::: exercise Resonant frequency {level=1 check="1/(2*pi*sqrt(1e-2*1e-6))"}
What is the resonant frequency, in hertz, of a series circuit with $L = 10\,\mathrm{mH}$ and $C = 1\,\mathrm{\mu F}$?
::: solution
$\omega_0 = 1/\sqrt{10^{-8}} = 10^4\,\mathrm{rad/s}$, so $f_0 = 10^4/2\pi = 1.59\,\mathrm{kHz}$.
:::
:::

::: exercise Q and bandwidth {level=2 check="500"}
A series $RLC$ circuit has $R = 5\,\Omega$, $L = 10\,\mathrm{mH}$ and $C = 1\,\mathrm{\mu F}$. Find $Q$ and the bandwidth in rad/s (the answer to enter), and the half-power frequencies.
::: solution
$\omega_0 = 10^4\,\mathrm{rad/s}$, $Q = \omega_0L/R = 100/5 = 20$, $B = R/L = 500\,\mathrm{rad/s}$. By [[#eq-half-power]], $\omega_{1,2} = \mp250 + \sqrt{250^2 + 10^8} = \mp250 + 10\,003.1$, so $\omega_1 = 9753\,\mathrm{rad/s}$ and $\omega_2 = 10\,253\,\mathrm{rad/s}$.
:::
:::

::: exercise A double pole {level=2 check="20*log10(100/101)"}
Find $\abs{H}_{\mathrm{dB}}$ at $\omega = 100\,\mathrm{rad/s}$ for $H(j\omega) = 100/(1 + j\omega/10)^2$. Compare with the asymptote.
::: solution
$\abs{1 + j10}^2 = 1 + 100 = 101$, so $\abs{H} = 100/101$ and $\abs{H}_{\mathrm{dB}} = -0.086\,\mathrm{dB}$. The asymptote: $40\,\mathrm{dB}$ up to $10\,\mathrm{rad/s}$, then $-40\,\mathrm{dB/decade}$, giving $0\,\mathrm{dB}$ at $100\,\mathrm{rad/s}$. A decade above the corner the asymptote is already accurate to $0.09\,\mathrm{dB}$.
:::
:::

::: exercise A parallel tank {level=2 check="1e4"}
A parallel $RLC$ circuit has $R = 10\,\mathrm{k\Omega}$, $L = 1\,\mathrm{mH}$ and $C = 10\,\mathrm{nF}$. Find $\omega_0$, $Q$ and the bandwidth in rad/s (the answer to enter).
::: solution
$\omega_0 = 1/\sqrt{10^{-3}\times10^{-8}} = 316\,228\,\mathrm{rad/s}$ ($50.3\,\mathrm{kHz}$). $Q = \omega_0RC = 316\,228\times10^4\times10^{-8} = 31.6$. $B = 1/(RC) = 1/10^{-4} = 10^4\,\mathrm{rad/s}$, and indeed $\omega_0/Q = 10^4$.
:::
:::

::: exercise Errors of the asymptotes {level=2 check="10*log10(1.25)"}
For a simple pole, find the error (in dB, as a positive number) between the exact magnitude and the asymptotes one octave from the corner, at $\omega = 2\omega_c$.
::: solution
At $u = 2$ the exact magnitude is $-10\log_{10}5 = -6.99\,\mathrm{dB}$ and the asymptote is $-20\log_{10}2 = -6.02\,\mathrm{dB}$; the difference is $10\log_{10}5 - 20\log_{10}2 = 10\log_{10}1.25 = 0.97\,\mathrm{dB}$. At $u = 1/2$ the exact value is $-10\log_{10}1.25$ and the asymptote $0$: the same error, as the symmetry argument in [[#thm-first-order]] predicts.
:::
:::

::: exercise A band-pass design {level=3}
Design a series $RLC$ circuit with $f_0 = 10\,\mathrm{kHz}$ and a bandwidth of $1\,\mathrm{kHz}$, using a $10\,\mathrm{mH}$ inductor. Give $C$ and the total series resistance $R$, then find the half-power frequencies in hertz and check that their geometric mean is $f_0$.
::: hint
$B$ in rad/s is $R/L$; remember the factor $2\pi$ between hertz and rad/s.
:::
::: solution
$\omega_0 = 2\pi\times10^4 = 62\,832\,\mathrm{rad/s}$. $C = 1/(\omega_0^2L) = 1/(3.948\times10^9\times10^{-2}) = 25.3\,\mathrm{nF}$. The bandwidth in rad/s is $2\pi\times1000 = 6283\,\mathrm{rad/s}$, so $R = BL = 6283\times0.01 = 62.8\,\Omega$, and $Q = 10$. The half-power frequencies in hertz follow from [[#eq-half-power]] divided by $2\pi$: $f_{1,2} = \mp B_{\mathrm{Hz}}/2 + \sqrt{(B_{\mathrm{Hz}}/2)^2 + f_0^2} = \mp500 + \sqrt{250\,000 + 10^8} = \mp500 + 10\,012.5$, so $f_1 = 9512\,\mathrm{Hz}$ and $f_2 = 10\,512\,\mathrm{Hz}$. Their product is $10\,012.5^2 - 500^2 = 10^8$, so the geometric mean is exactly $10\,\mathrm{kHz}$, while the arithmetic mean is $10\,012\,\mathrm{Hz}$.
:::
:::

::: exercise Q as stored energy {level=3}
For the series $RLC$ circuit at resonance with current $i(t) = I_m\cos\omega_0t$, show that the total stored energy is constant, equal to $\tfrac12LI_m^2$, and that $Q = 2\pi\times(\text{stored energy})/(\text{energy dissipated per period})$.
::: hint
The capacitor voltage lags the current by $90^\circ$ and has amplitude $I_m/(\omega_0C)$.
:::
::: solution
The inductor stores $w_L = \tfrac12LI_m^2\cos^2\omega_0t$. The capacitor voltage is $v_C = (I_m/\omega_0C)\sin\omega_0t$, so $w_C = \tfrac12C(I_m/\omega_0C)^2\sin^2\omega_0t = \tfrac12(I_m^2/(\omega_0^2C))\sin^2\omega_0t = \tfrac12LI_m^2\sin^2\omega_0t$, using $1/(\omega_0^2C) = L$. The sum is $\tfrac12LI_m^2$ at every instant: energy passes back and forth between the inductor and capacitor without returning to the source. The energy dissipated per period is $\tfrac12I_m^2R\cdot T = \tfrac12I_m^2R\cdot2\pi/\omega_0$. Then $2\pi\cdot\tfrac12LI_m^2/(\pi I_m^2R/\omega_0) = \omega_0L/R = Q$.
:::
:::

::: exercise The resonant peak of a quadratic factor {level=3}
For $\abs{H(ju)}^2 = 1/[(1 - u^2)^2 + (2\zeta u)^2]$ with $u = \omega/\omega_n$, show that the magnitude has a maximum at $u_p = \sqrt{1 - 2\zeta^2}$ when $\zeta < 1/\sqrt2$, with peak value $1/(2\zeta\sqrt{1 - \zeta^2})$. Evaluate the peak in decibels for $\zeta = 0.1$.
::: solution
Minimise $D(v) = (1 - v)^2 + 4\zeta^2v$ with $v = u^2 \ge 0$: $D'(v) = -2(1 - v) + 4\zeta^2 = 0$ gives $v = 1 - 2\zeta^2$, positive only if $\zeta < 1/\sqrt2$ (otherwise the minimum over $v \ge 0$ is at $v = 0$, with no peak). Then $D = 4\zeta^4 + 4\zeta^2(1 - 2\zeta^2) = 4\zeta^2(1 - \zeta^2)$, so $\abs{H}_{\max} = 1/(2\zeta\sqrt{1 - \zeta^2})$. For $\zeta = 0.1$: $1/(0.2\times0.995) = 5.03$, that is $14.0\,\mathrm{dB}$, at $u_p = \sqrt{0.98} = 0.990$.
:::
:::
