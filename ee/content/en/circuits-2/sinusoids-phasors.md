The socket in the wall does not supply a constant voltage. In Europe it delivers a voltage that swings smoothly between about $+325\,\mathrm{V}$ and $-325\,\mathrm{V}$ fifty times a second; in North America, between about $\pm 170\,\mathrm{V}$ sixty times a second. The waveform is a **sinusoid**, and it is no accident. A coil turning at constant speed in a uniform magnetic field produces a sinusoidal voltage, so that is what generators make. A linear circuit driven by a sinusoid responds, once the transients have died away, with sinusoids of the same frequency, so the shape survives every resistor, capacitor, inductor and transformer between the power station and the load. And by the Fourier theory of [[signals-systems]], almost any signal, a voice, a radio transmission, a digital pulse train, can be built out of sinusoids. Learn how circuits respond to one sinusoid and you have the key to how they respond to almost everything.

In [[circuits-1/first-order-circuits]] and [[circuits-1/second-order-circuits]] you solved circuits by writing and solving differential equations. That approach works for a sinusoidal source too, but the algebra quickly becomes heavy: even a single resistor and inductor need a page of trigonometry. This lesson introduces the **phasor**, a complex number that holds the amplitude and phase of a sinusoid, and shows that with phasors the derivative becomes multiplication by $j\omega$. Each element then obeys a complex version of Ohm's law, $\mathbf V = Z\mathbf I$, with an **impedance** $Z$ that depends on frequency, and Kirchhoff's laws hold for the phasors unchanged. Every DC technique of the first course then applies with complex numbers in place of real ones. Here we build the tools; in [[circuits-2/ac-analysis]] we use them on whole networks.

You will need complex numbers in rectangular and polar form, Euler's formula $e^{j\theta} = \cos\theta + j\sin\theta$, and the conversion between the two forms. If they are rusty, revise them in [Complex numbers](/learn/maths/lesson.php?c=complex-analysis&l=complex-numbers) in Maths Atlas. Engineers write the imaginary unit as $j$, because $i$ is reserved for current.

## Sinusoids and their parameters

::: definition Sinusoid {#def-sin}
A **sinusoid** is a signal of the form

$$
v(t) = V_m\cos(\omega t + \phi),
$$ {#eq-sinusoid}

where $V_m > 0$ is the **amplitude** (peak value), $\omega$ the **angular frequency** in radians per second, and $\phi$ the **phase** in radians or degrees. The **period** is $T = 2\pi/\omega$ seconds and the **frequency** is $f = 1/T = \omega/(2\pi)$ hertz. The quantity $\omega t + \phi$ is the **argument** of the sinusoid.
:::

The amplitude sets how large the swing is, the frequency how fast it repeats, and the phase where in its cycle the sinusoid is at $t = 0$. A positive phase shifts the waveform to the **left** in time: $\cos(\omega t + \phi)$ reaches its peak at $t = -\phi/\omega$, earlier than $\cos\omega t$.

We use the cosine as the reference function throughout this course. A sine is a cosine delayed by a quarter cycle, and the identities

$$
\sin\theta = \cos(\theta - 90^\circ), \qquad -\sin\theta = \cos(\theta + 90^\circ), \qquad -\cos\theta = \cos(\theta \pm 180^\circ)
$$ {#eq-sin-cos}

convert any sinusoid to the standard form [[#eq-sinusoid]] with a positive amplitude.

Consider two sinusoids of the **same** frequency, $v_1 = V_1\cos(\omega t + \phi_1)$ and $v_2 = V_2\cos(\omega t + \phi_2)$. Their **phase difference** is $\phi_1 - \phi_2$. If it is positive, $v_1$ reaches each peak before $v_2$, and we say $v_1$ **leads** $v_2$ by $\phi_1 - \phi_2$, or equivalently $v_2$ **lags** $v_1$. If the phase difference is zero the two are **in phase**; if it is $\pm 180^\circ$ they are in **antiphase**. A phase difference is only defined modulo $360^\circ$, and by convention we quote it between $-180^\circ$ and $180^\circ$.

::: example Reading a sinusoid {#ex-param}
A source voltage is $v(t) = 15\cos(100\pi t - 20^\circ)\,\mathrm{V}$. Find its amplitude, angular frequency, frequency, period and the first time after $t = 0$ at which it reaches its positive peak.
::: solution
The amplitude is $V_m = 15\,\mathrm{V}$ and the angular frequency is $\omega = 100\pi = 314.2\,\mathrm{rad/s}$. The frequency is $f = \omega/(2\pi) = 50\,\mathrm{Hz}$ and the period $T = 1/f = 20\,\mathrm{ms}$.

The peak occurs when the argument is a multiple of $360^\circ$, here first when $100\pi t = 20^\circ = \pi/9\,\mathrm{rad}$, so $t = 1/900\,\mathrm{s} = 1.11\,\mathrm{ms}$. A phase of $-20^\circ$ is $20/360$ of a period late: $20\,\mathrm{ms}\times 20/360 = 1.11\,\mathrm{ms}$, the same answer.
:::
:::

::: example Which one leads? {#ex-lead}
Find the phase difference between $v_1(t) = 10\cos(\omega t + 50^\circ)\,\mathrm{V}$ and $v_2(t) = -12\sin(\omega t - 10^\circ)\,\mathrm{V}$, and say which leads.
::: solution
First put $v_2$ in standard form. By [[#eq-sin-cos]], $-\sin\theta = \cos(\theta + 90^\circ)$, so

$$
v_2(t) = 12\cos(\omega t - 10^\circ + 90^\circ) = 12\cos(\omega t + 80^\circ)\,\mathrm{V}.
$$

The phase difference is $\phi_2 - \phi_1 = 80^\circ - 50^\circ = 30^\circ$: $v_2$ leads $v_1$ by $30^\circ$. The amplitudes play no part in the comparison. Comparing the raw angles $-10^\circ$ and $50^\circ$ would have given the wrong answer, because one waveform was written as a negative sine.
:::
:::

::: warning Before you compare phases
A phase comparison is meaningful only when both signals (1) have the same frequency, (2) are written with the same function, cosine or sine, (3) have positive amplitudes, and (4) have their phases in the same unit. Mixing degrees in the phase with radians in $\omega t$, as in $\cos(377t + 30^\circ)$, is standard notation, but when you evaluate it on a calculator convert the $30^\circ$ to $\pi/6$ first.
:::

::: widget plot
f: cos(x); 0.7*cos(x + ph)
x: 0, 4pi
y: -1.2, 1.2
piticks: true
sliders: ph=0.5:-3.1416:3.1416:0.01
labels: v_1 = \cos(\omega t); v_2 = 0.7\cos(\omega t + \phi)
caption: Two sinusoids of the same frequency plotted against $\omega t$. The slider sets the phase $\phi$ of $v_2$ in radians. For $\phi > 0$ the peaks of $v_2$ come before those of $v_1$: $v_2$ leads. Set $\phi = \pi/2 \approx 1.57$ and notice that $v_2$ is then a negative sine; at $\phi = \pm\pi$ the two are in antiphase, and leading by $\pi$ is the same as lagging by $\pi$.
:::

### The RMS value

A sinusoid has zero average, so its average is useless as a measure of size. What matters for heating, lighting and most power calculations is the average of its square.

::: definition Root-mean-square value {#def-rms}
The **root-mean-square** (RMS) or **effective** value of a periodic voltage $v(t)$ of period $T$ is

$$
V_{\text{rms}} = \sqrt{\frac1T\int_0^T v^2(t)\,\mathrm{d}t}.
$$

It is the value of the DC voltage that would deliver the same average power to a resistor. For a sinusoid $v(t) = V_m\cos(\omega t + \phi)$,

$$
V_{\text{rms}} = \frac{V_m}{\sqrt2} \approx 0.707\,V_m,
$$ {#eq-rms}

whatever the phase and frequency. The same definition and result apply to currents.
:::

The calculation behind [[#eq-rms]] uses $\cos^2\theta = \tfrac12(1 + \cos 2\theta)$:

$$
\frac1T\int_0^T V_m^2\cos^2(\omega t + \phi)\,\mathrm{d}t = \frac{V_m^2}{2T}\int_0^T\bigl[1 + \cos(2\omega t + 2\phi)\bigr]\,\mathrm{d}t = \frac{V_m^2}{2},
$$

because the cosine at $2\omega$ completes exactly two cycles in $T$ and integrates to zero. The power delivered to a resistor $R$ averages to $V_m^2/(2R) = V_{\text{rms}}^2/R$, the same formula as for DC. That is why the mains is specified by its RMS value: the "$230\,\mathrm{V}$" supply has a peak of $230\sqrt2 = 325\,\mathrm{V}$, and the "$120\,\mathrm{V}$" supply a peak of $170\,\mathrm{V}$. Meter readings on the AC range are RMS; oscilloscope readings and insulation ratings are usually peak. Power is the subject of [[circuits-2/ac-power]]; in this lesson and the next we mostly work with amplitudes, and say so whenever a number is RMS.

## The sinusoidal steady state

Why should sinusoids be special? Let us solve a circuit the hard way first. A sinusoidal source $v_s(t) = V_m\cos\omega t$ drives a resistor $R$ in series with an inductor $L$. KVL gives the differential equation

$$
L\frac{\mathrm{d}i}{\mathrm{d}t} + Ri = V_m\cos\omega t.
$$

From [[circuits-1/first-order-circuits]] the complete solution is the natural response $Ae^{-Rt/L}$, which dies away, plus a particular solution that persists. Try $i_p = A_1\cos\omega t + A_2\sin\omega t$. Substituting and matching the coefficients of $\cos\omega t$ and $\sin\omega t$:

$$
RA_1 + \omega LA_2 = V_m, \qquad -\omega LA_1 + RA_2 = 0,
$$

so $A_1 = RV_m/(R^2 + \omega^2L^2)$ and $A_2 = \omega LV_m/(R^2 + \omega^2L^2)$. Combining the cosine and sine into a single sinusoid,

$$
i_p(t) = \frac{V_m}{\sqrt{R^2 + \omega^2L^2}}\cos\Bigl(\omega t - \tan^{-1}\frac{\omega L}{R}\Bigr).
$$ {#eq-rl-ode}

Two things stand out. The steady current is a sinusoid at the **same frequency** as the source, only scaled and shifted. And the result, though correct, cost a system of equations and a trigonometric identity for the simplest circuit with an energy-storing element. A circuit with five elements would be miserable this way.

The trick that removes the labour is to replace the real source by a complex exponential. By Euler's formula, $V_m\cos\omega t = \mathrm{Re}\bigl[V_me^{j\omega t}\bigr]$. Because the circuit equation is linear with real coefficients, the real part of a solution for the complex input $V_me^{j\omega t}$ is a solution for the real input. And the exponential is an eigenfunction of differentiation: $\frac{\mathrm d}{\mathrm dt}e^{j\omega t} = j\omega e^{j\omega t}$. Try $i = \mathbf Ie^{j\omega t}$ with a complex constant $\mathbf I$:

$$
j\omega L\,\mathbf Ie^{j\omega t} + R\,\mathbf Ie^{j\omega t} = V_me^{j\omega t} \quad\Longrightarrow\quad \mathbf I = \frac{V_m}{R + j\omega L}.
$$

One line of complex algebra. The magnitude of $\mathbf I$ is $V_m/\sqrt{R^2 + \omega^2L^2}$ and its angle $-\tan^{-1}(\omega L/R)$, exactly the amplitude and phase in [[#eq-rl-ode]], and $i_p(t) = \mathrm{Re}[\mathbf Ie^{j\omega t}]$. The general statement is the following.

::: theorem Sinusoidal steady state {#thm-steady}
Let a circuit made of linear resistors, capacitors, inductors and linear dependent sources be driven by independent sources that are all sinusoids of one angular frequency $\omega$. If the natural response of the circuit decays to zero (the circuit is **stable**), then after the transients have died away every voltage and current in the circuit is a sinusoid of the same frequency $\omega$. This final condition is the **sinusoidal steady state**.
:::

::: proof
Any response $y$ of such a circuit satisfies a linear differential equation with real constant coefficients, $a_ny^{(n)} + \cdots + a_1y' + a_0y = b_mx^{(m)} + \cdots + b_0x$, obtained by eliminating the other variables from the node or mesh equations. For a single input $x = \mathrm{Re}[\mathbf Xe^{j\omega t}]$, try $y = \mathrm{Re}[\mathbf Ye^{j\omega t}]$. Since $\frac{\mathrm d^k}{\mathrm dt^k}e^{j\omega t} = (j\omega)^ke^{j\omega t}$ and taking the real part commutes with real-coefficient derivatives, the equation is satisfied when

$$
\mathbf Y\sum_k a_k(j\omega)^k = \mathbf X\sum_k b_k(j\omega)^k, \qquad\text{that is}\qquad \mathbf Y = \frac{B(j\omega)}{A(j\omega)}\,\mathbf X,
$$

provided $A(j\omega) \ne 0$. This is a particular solution and a sinusoid of frequency $\omega$. The complete solution is this particular solution plus the natural response, a combination of terms $e^{s_it}$ where the $s_i$ are the roots of $A(s) = 0$. Stability means every $s_i$ has negative real part, so the natural response decays to zero, and only the sinusoid remains. (A stable circuit has no root on the imaginary axis, so $A(j\omega) \ne 0$ automatically.) With several sources of the same frequency, superposition adds sinusoids of frequency $\omega$, which is again a sinusoid of frequency $\omega$.
:::

The theorem has two practical limits. It says nothing about the transient, which you still find by the methods of [[circuits-1/second-order-circuits]] or the Laplace transform of [[circuits-2/laplace-circuit-analysis]]. And it needs linearity: a diode or a saturating iron core generates harmonics, frequencies that were not in the source.

## Phasors

Every steady-state quantity is $\mathrm{Re}[\mathbf Xe^{j\omega t}]$ with the **same** factor $e^{j\omega t}$. All the information that distinguishes one voltage or current from another is in the complex constant $\mathbf X$. That constant is the phasor.

::: definition Phasor {#def-phasor}
The **phasor** of the sinusoid $v(t) = V_m\cos(\omega t + \phi)$ is the complex number

$$
\mathbf V = V_me^{j\phi} = V_m\angle\phi = V_m\cos\phi + jV_m\sin\phi,
$$ {#eq-phasor}

so that $v(t) = \mathrm{Re}\bigl[\mathbf Ve^{j\omega t}\bigr]$. The map $v(t) \mapsto \mathbf V$ is the **phasor transform**; going back is the **inverse phasor transform**. The time function $v(t)$ is the **time-domain** representation and $\mathbf V$ the **phasor-domain** or **frequency-domain** representation.
:::

Geometrically, $\mathbf Ve^{j\omega t}$ is a vector of length $V_m$ rotating anticlockwise in the complex plane at $\omega$ radians per second, starting at angle $\phi$. The sinusoid $v(t)$ is its shadow on the real axis. The phasor is a snapshot of the rotating vector at $t = 0$. Because every quantity in the circuit rotates at the same rate, the snapshot loses nothing: the relative angles of all the vectors stay fixed forever.

To find a phasor, write the sinusoid as a cosine with positive amplitude, then read off the amplitude and phase. For example $i(t) = 4\sin(\omega t + 30^\circ) = 4\cos(\omega t - 60^\circ)$ has phasor $\mathbf I = 4\angle-60^\circ = 2 - j3.46$. To go back, find the polar form and write the cosine: $\mathbf V = -3 + j4 = 5\angle126.87^\circ$ is $v(t) = 5\cos(\omega t + 126.87^\circ)$. Watch the quadrant: $\tan^{-1}(4/(-3))$ on a calculator returns $-53.13^\circ$, which is the angle of $3 - j4$, not of $-3 + j4$. Use the two-argument arctangent, or sketch the point.

::: warning A phasor is not the sinusoid
The phasor $\mathbf V$ is a complex constant; $v(t)$ is a real function of time. Writing $v(t) = 15\angle-20^\circ$ is a category error, like writing that a person equals their address. The frequency $\omega$ is not stored in the phasor at all: you must remember it separately, and every phasor in a calculation must belong to the same $\omega$.
:::

The phasor transform turns the operations that occur in circuit equations into complex arithmetic.

::: proposition Properties of the phasor transform {#prop-phasor-ops}
Let $x(t)$ and $y(t)$ be sinusoids of angular frequency $\omega$ with phasors $\mathbf X$ and $\mathbf Y$, and let $a$, $b$ be real constants. Then

1. **Linearity:** $ax(t) + by(t)$ has phasor $a\mathbf X + b\mathbf Y$.
2. **Differentiation:** $\dfrac{\mathrm dx}{\mathrm dt}$ has phasor $j\omega\mathbf X$.
3. **Integration:** the sinusoidal (zero-average) antiderivative $\displaystyle\int x\,\mathrm dt$ has phasor $\dfrac{\mathbf X}{j\omega}$.
4. **Uniqueness:** $\mathrm{Re}[\mathbf Xe^{j\omega t}] = \mathrm{Re}[\mathbf Ye^{j\omega t}]$ for all $t$ if and only if $\mathbf X = \mathbf Y$.
:::

::: proof
(1) $\mathrm{Re}$ is real-linear: $a\,\mathrm{Re}[\mathbf Xe^{j\omega t}] + b\,\mathrm{Re}[\mathbf Ye^{j\omega t}] = \mathrm{Re}[(a\mathbf X + b\mathbf Y)e^{j\omega t}]$. (2) $\frac{\mathrm d}{\mathrm dt}\mathrm{Re}[\mathbf Xe^{j\omega t}] = \mathrm{Re}[j\omega\mathbf Xe^{j\omega t}]$, since differentiation with respect to the real variable $t$ commutes with taking the real part. (3) Apply (2) to $\mathrm{Re}[(\mathbf X/j\omega)e^{j\omega t}]$. (4) Let $\mathbf D = \mathbf X - \mathbf Y$ and suppose $\mathrm{Re}[\mathbf De^{j\omega t}] = 0$ for all $t$. At $t = 0$ this gives $\mathrm{Re}\,\mathbf D = 0$; at $\omega t = \pi/2$ it gives $\mathrm{Re}[j\mathbf D] = -\mathrm{Im}\,\mathbf D = 0$. So $\mathbf D = 0$.
:::

Property 2 is the heart of the method. Multiplying by $j = 1\angle90^\circ$ rotates a phasor by $90^\circ$, so differentiation scales the amplitude by $\omega$ and **advances** the phase by a quarter cycle: the derivative of $\cos\omega t$ is $-\omega\sin\omega t = \omega\cos(\omega t + 90^\circ)$. Integration divides by $\omega$ and delays by a quarter cycle.

::: example Adding sinusoids {#ex-sum}
Express $v(t) = 10\cos(\omega t + 30^\circ) + 5\sin(\omega t - 20^\circ)\,\mathrm{V}$ as a single sinusoid.
::: solution
Write the second term as a cosine: $5\sin(\omega t - 20^\circ) = 5\cos(\omega t - 110^\circ)$. Transform both and add in rectangular form, by property 1:

$$
\begin{aligned}
10\angle30^\circ &= 8.660 + j5.000,\\
5\angle-110^\circ &= -1.710 - j4.698,\\
\mathbf V &= 6.950 + j0.302 = 6.957\angle2.48^\circ\,\mathrm{V}.
\end{aligned}
$$

So $v(t) = 6.96\cos(\omega t + 2.48^\circ)\,\mathrm{V}$. The amplitude of the sum, $6.96\,\mathrm V$, is much less than $10 + 5 = 15\,\mathrm V$ because the two components are $140^\circ$ apart and largely cancel. Phasors add like vectors, never by their magnitudes, unless they happen to be in phase.
:::
:::

::: widget complexplane
mode: product
z: 1, 0.5
w: 0.5, 1
caption: Multiplying phasors. Take $z$ as a current phasor $\mathbf I$ and $w$ as an impedance $Z$: the product is the voltage $\mathbf V = Z\mathbf I$. The magnitudes multiply and the angles add. Drag $w$ onto the positive imaginary axis (a pure inductance, $Z = jX$) and see the product turn exactly $90^\circ$ ahead of $z$; drag it onto the negative imaginary axis (a capacitance) and the voltage falls $90^\circ$ behind. Switch the mode to "sum" to add phasors as vectors.
:::

## The element laws in phasor form

Now apply the phasor transform to the three passive elements, each in the passive sign convention of [[circuits-1/basic-concepts]], with $v(t) = \mathrm{Re}[\mathbf Ve^{j\omega t}]$ and $i(t) = \mathrm{Re}[\mathbf Ie^{j\omega t}]$.

- **Resistor.** $v = Ri$, so by linearity $\mathbf V = R\mathbf I$. Voltage and current are in phase.
- **Inductor.** $v = L\,\mathrm di/\mathrm dt$, so by the differentiation property $\mathbf V = j\omega L\,\mathbf I$. The voltage leads the current by $90^\circ$; equivalently, the current lags the voltage by $90^\circ$.
- **Capacitor.** $i = C\,\mathrm dv/\mathrm dt$, so $\mathbf I = j\omega C\,\mathbf V$, that is $\mathbf V = \mathbf I/(j\omega C)$. The current leads the voltage by $90^\circ$.

::: theorem Phasor element laws {#thm-imp}
In the sinusoidal steady state at angular frequency $\omega$, the voltage and current phasors of a resistor, an inductor and a capacitor satisfy $\mathbf V = Z\mathbf I$ with

$$
Z_R = R, \qquad Z_L = j\omega L, \qquad Z_C = \frac{1}{j\omega C} = -\frac{j}{\omega C}.
$$ {#eq-element-z}

$Z$ is measured in ohms. For the inductor the current lags the voltage by $90^\circ$; for the capacitor the current leads the voltage by $90^\circ$.
:::

The time-domain laws were relations between a function and its derivative; the phasor laws are all of the Ohm's-law form. The frequency dependence tells a familiar story from [[circuits-1/capacitors-inductors]]. At $\omega = 0$ (DC) the inductor has $Z_L = 0$, a short circuit, and the capacitor has $\abs{Z_C} \to \infty$, an open circuit. As the frequency rises the inductor opposes the current more and more, and the capacitor less and less. At very high frequency an inductor behaves like an open circuit and a capacitor like a short.

::: warning Leading and lagging
The one fact that students confuse most often: in an **inductor** the current **lags** the voltage, in a **capacitor** the current **leads**. A mnemonic is **ELI the ICE man**: in $L$, voltage ($E$) comes before current ($I$); in $C$, current ($I$) comes before voltage ($E$). Algebraically, a positive imaginary part of $Z$ (inductive) makes the angle of $\mathbf I = \mathbf V/Z$ smaller than that of $\mathbf V$, and a negative imaginary part (capacitive) makes it larger. If an answer says the current in an $RC$ circuit lags, look for a sign error in $Z_C$.
:::

::: example Voltage across an inductor and current in a capacitor {#ex-elements}
(a) A $50\,\mathrm{mH}$ inductor carries $i(t) = 2\cos(1000t + 10^\circ)\,\mathrm{A}$. Find its voltage. (b) A $40\,\mathrm{\mu F}$ capacitor has $v(t) = 20\cos(500t - 30^\circ)\,\mathrm{V}$ across it. Find its current.
::: solution
(a) $Z_L = j\omega L = j(1000)(0.05) = j50\,\Omega = 50\angle90^\circ\,\Omega$, and $\mathbf I = 2\angle10^\circ\,\mathrm A$. Then

$$
\mathbf V = Z_L\mathbf I = (50\angle90^\circ)(2\angle10^\circ) = 100\angle100^\circ\,\mathrm V,
$$

so $v(t) = 100\cos(1000t + 100^\circ)\,\mathrm V$, leading the current by $90^\circ$. Directly: $L\,\mathrm di/\mathrm dt = 0.05\times(-2000)\sin(1000t + 10^\circ) = -100\sin(1000t + 10^\circ) = 100\cos(1000t + 100^\circ)$. The phasor answer agrees.

(b) $\mathbf I = j\omega C\mathbf V = j(500)(40\times10^{-6})(20\angle-30^\circ) = (0.02\angle90^\circ)(20\angle-30^\circ) = 0.4\angle60^\circ\,\mathrm A$, so $i(t) = 0.4\cos(500t + 60^\circ)\,\mathrm A$, leading the voltage by $90^\circ$.
:::
:::

::: quiz
A pure inductor of $100\,\mathrm{mH}$ carries a $50\,\mathrm{Hz}$ current of $0.2\,\mathrm A$ (RMS). What is the RMS voltage across it?
- [x] $6.28\,\mathrm V$
- [ ] $31.4\,\mathrm V$
- [ ] $0.0064\,\mathrm V$
- [ ] $628\,\mathrm V$
::: solution
The reactance is $\omega L = 2\pi(50)(0.1) = 31.4\,\Omega$, so $V = \omega L\,I = 31.4\times0.2 = 6.28\,\mathrm V$ (RMS, since the current is RMS). $31.4$ is the reactance in ohms, not a voltage; $0.0064\,\mathrm V$ comes from dividing by the reactance instead of multiplying; $628\,\mathrm V$ uses $L = 100\,\mathrm H$.
:::
:::

## Impedance and admittance

The element laws suggest a definition that applies to any two-terminal network of linear elements.

::: definition Impedance {#def-impedance}
The **impedance** of a two-terminal network in the sinusoidal steady state is the ratio of its voltage phasor to its current phasor, in the passive sign convention:

$$
Z = \frac{\mathbf V}{\mathbf I} = R + jX = \abs{Z}\angle\theta_Z.
$$

$R = \mathrm{Re}\,Z$ is the **resistance** and $X = \mathrm{Im}\,Z$ the **reactance**, both in ohms. The network is **inductive** if $X > 0$ and **capacitive** if $X < 0$. The magnitude $\abs{Z} = V_m/I_m$ is the ratio of the amplitudes, and $\theta_Z = \theta_v - \theta_i$ is the angle by which the voltage leads the current.
:::

The reactance of an inductor is $X_L = \omega L$ and that of a capacitor $X_C = -1/(\omega C)$. (Some books define $X_C = 1/(\omega C)$, positive, and write $Z_C = -jX_C$; read the convention before using a formula.) An impedance is a complex number but **not a phasor**: it does not represent a sinusoid, and $\mathrm{Re}[Ze^{j\omega t}]$ has no meaning. It is a ratio of two phasors, and it depends on $\omega$.

::: definition Admittance {#def-adm}
The **admittance** of a two-terminal network is the reciprocal of its impedance,

$$
Y = \frac1Z = \frac{\mathbf I}{\mathbf V} = G + jB,
$$

measured in siemens (S). $G = \mathrm{Re}\,Y$ is the **conductance** and $B = \mathrm{Im}\,Y$ the **susceptance**. For the elements, $Y_R = 1/R$, $Y_L = 1/(j\omega L) = -j/(\omega L)$ and $Y_C = j\omega C$.
:::

The conversion between $Z$ and $Y$ needs care. From $Y = 1/(R + jX) = (R - jX)/(R^2 + X^2)$,

$$
G = \frac{R}{R^2 + X^2}, \qquad B = \frac{-X}{R^2 + X^2}.
$$ {#eq-z-to-y}

So $G = 1/R$ only when $X = 0$. For $Z = 3 + j4\,\Omega$, $Y = (3 - j4)/25 = 0.12 - j0.16\,\mathrm S$: the conductance is $0.12\,\mathrm S$, not $1/3\,\mathrm S$. An inductive impedance has a negative susceptance.

### Kirchhoff's laws and combinations

::: theorem Kirchhoff's laws for phasors {#thm-kirchhoff}
In the sinusoidal steady state at a single frequency, the current phasors entering any node sum to zero, $\sum_k \mathbf I_k = 0$, and the voltage phasors around any closed loop sum to zero, $\sum_k \mathbf V_k = 0$.
:::

::: proof
For KVL around a loop, $\sum_k v_k(t) = 0$ for all $t$. With $v_k = \mathrm{Re}[\mathbf V_ke^{j\omega t}]$, linearity gives $\mathrm{Re}\bigl[(\sum_k\mathbf V_k)e^{j\omega t}\bigr] = 0$ for all $t$, and the uniqueness property of [[#prop-phasor-ops]] gives $\sum_k\mathbf V_k = 0$. KCL is identical with currents.
:::

Kirchhoff's laws hold for the phasors, but **not for their magnitudes**: the amplitudes of the voltages around a loop do not in general sum to the source amplitude, as the examples below show. With KCL, KVL and $\mathbf V = Z\mathbf I$ we have exactly the structure of DC resistive circuit theory, and the combination rules follow by the same proofs as in [[circuits-1/resistive-circuits]].

::: proposition Series and parallel combinations {#prop-combine}
Impedances in series add, $Z_{\text{eq}} = Z_1 + Z_2 + \cdots + Z_n$. Admittances in parallel add, $Y_{\text{eq}} = Y_1 + Y_2 + \cdots + Y_n$; for two impedances in parallel, $Z_{\text{eq}} = Z_1Z_2/(Z_1 + Z_2)$.
:::

::: proof
In series, the same current phasor $\mathbf I$ flows in every element, and by KVL $\mathbf V = \sum_k Z_k\mathbf I = (\sum_k Z_k)\mathbf I$. In parallel, the same voltage $\mathbf V$ is across every element, and by KCL $\mathbf I = \sum_k Y_k\mathbf V$.
:::

::: example An RC series circuit {#ex-rc}
A $10\,\Omega$ resistor in series with a $100\,\mathrm{\mu F}$ capacitor is driven by $v_s(t) = 10\cos(377t)\,\mathrm V$, a $60\,\mathrm{Hz}$ source. Find the current $i(t)$.
::: solution
At $\omega = 377\,\mathrm{rad/s}$ the capacitor has $Z_C = 1/(j\omega C) = 1/(j\times377\times10^{-4}) = -j26.53\,\Omega$. The series impedance is

$$
Z = 10 - j26.53\,\Omega = 28.35\angle-69.34^\circ\,\Omega.
$$

With $\mathbf V_s = 10\angle0^\circ\,\mathrm V$,

$$
\mathbf I = \frac{\mathbf V_s}{Z} = \frac{10\angle0^\circ}{28.35\angle-69.34^\circ} = 0.353\angle69.34^\circ\,\mathrm A,
$$

so $i(t) = 0.353\cos(377t + 69.34^\circ)\,\mathrm A$. The circuit is capacitive and the current leads the source voltage by $69.3^\circ$, between the $0^\circ$ of a pure resistor and the $90^\circ$ of a pure capacitor. Had the source been given as $10\,\mathrm V$ RMS, the current would be $0.353\,\mathrm A$ RMS with the same angle: the method is indifferent to whether all phasors are peak or all are RMS, as long as they are not mixed.
:::
:::

::: example A series RLC circuit {#ex-rlc}
Add a $10\,\mathrm{mH}$ inductor in series with the circuit of the previous example, with the same source. Find the current and the phasor voltage across each element, and check KVL.
::: solution
Now $Z_L = j\omega L = j(377)(0.01) = j3.77\,\Omega$, so

$$
Z = 10 + j3.77 - j26.53 = 10 - j22.76\,\Omega = 24.86\angle-66.28^\circ\,\Omega,
$$

$$
\mathbf I = \frac{10\angle0^\circ}{24.86\angle-66.28^\circ} = 0.402\angle66.28^\circ\,\mathrm A.
$$

The element voltages are

$$
\begin{aligned}
\mathbf V_R &= 10\,\mathbf I = 4.02\angle66.28^\circ = 1.62 + j3.68\,\mathrm V,\\
\mathbf V_L &= j3.77\,\mathbf I = 1.52\angle156.28^\circ = -1.39 + j0.61\,\mathrm V,\\
\mathbf V_C &= -j26.53\,\mathbf I = 10.67\angle-23.72^\circ = 9.77 - j4.29\,\mathrm V.
\end{aligned}
$$

Adding the rectangular forms gives $10.00 + j0.00\,\mathrm V$, the source, as KVL requires. Notice that $\abs{\mathbf V_C} = 10.67\,\mathrm V$ **exceeds** the source amplitude of $10\,\mathrm V$, and that the magnitudes $4.02 + 1.52 + 10.67 = 16.2\,\mathrm V$ do not sum to $10\,\mathrm V$. That is not a contradiction: the inductor voltage is opposite in phase to the capacitor voltage and partly cancels it. Near resonance, studied in [[circuits-2/frequency-response]], the voltages across $L$ and $C$ can be many times the source voltage.
:::
:::

::: widget plot
f: 2*pi*x*Lm*1e-3; 1/(2*pi*x*Cu*1e-6)
x: 0, 2000
y: 0, 200
sliders: Lm=10:1:50:1; Cu=2:0.5:20:0.5
labels: \omega L; 1/(\omega C)
caption: Reactance magnitudes, in ohms, of an inductor ($L$ in mH, slider Lm) and a capacitor ($C$ in μF, slider Cu) against the frequency $f$ in hertz. The inductor's reactance is a straight line through the origin; the capacitor's is a hyperbola, infinite at DC. Where the curves cross, $\omega L = 1/(\omega C)$ and a series $LC$ pair has zero total reactance: this is resonance, at $f_0 = 1/(2\pi\sqrt{LC})$. Increase either $L$ or $C$ and watch the crossing move to lower frequency.
:::

::: example Parallel RC: impedance from admittance {#ex-parallel}
A $100\,\Omega$ resistor is in parallel with a $10\,\mathrm{\mu F}$ capacitor. Find the impedance of the combination at $1\,\mathrm{kHz}$, and the equivalent series $RC$ circuit at that frequency.
::: solution
At $\omega = 2\pi\times1000 = 6283\,\mathrm{rad/s}$ the admittances are $Y_R = 0.01\,\mathrm S$ and $Y_C = j\omega C = j0.0628\,\mathrm S$. By [[#prop-combine]] they add:

$$
Y = 0.01 + j0.0628\,\mathrm S, \qquad Z = \frac1Y = \frac{0.01 - j0.0628}{0.01^2 + 0.0628^2} = 2.47 - j15.52\,\Omega = 15.72\angle-80.96^\circ\,\Omega.
$$

At $1\,\mathrm{kHz}$ the parallel pair behaves exactly like a $2.47\,\Omega$ resistor in series with a capacitive reactance of $-15.52\,\Omega$, that is a capacitor $C_s = 1/(\omega\times15.52) = 10.25\,\mathrm{\mu F}$. The equivalence holds at this one frequency only: at another frequency the series values would be different. This is one reason to keep the frequency attached to every impedance.
:::
:::

::: quiz
A load has impedance $Z = 20 - j15\,\Omega$. Which statement is correct?
- [ ] It is inductive, and its current lags the voltage by $36.87^\circ$.
- [x] It is capacitive, and its current leads the voltage by $36.87^\circ$.
- [ ] It is capacitive, and its current leads the voltage by $53.13^\circ$.
- [ ] Its admittance is $0.05 - j0.0667\,\mathrm S$.
::: solution
The reactance is negative, so the load is capacitive. $\theta_Z = \tan^{-1}(-15/20) = -36.87^\circ$, and since $\theta_i = \theta_v - \theta_Z$ the current leads the voltage by $36.87^\circ$. The admittance is $Y = (20 + j15)/625 = 0.032 + j0.024\,\mathrm S$; taking the reciprocals of $R$ and $X$ separately is the mistake behind the last option.
:::
:::

## Phasor analysis step by step

Everything is now in place for a systematic method.

::: algorithm Phasor analysis of a circuit in the sinusoidal steady state {#alg-phasor}
1. Check that all independent sources have the same angular frequency $\omega$. (If not, see the warning below.)
2. Write every source as a cosine with positive amplitude and convert it to a phasor. Decide whether you work with peak or RMS phasors, and use one choice throughout.
3. Replace every $R$, $L$ and $C$ by its impedance [[#eq-element-z]] at $\omega$. The result is the **phasor-domain circuit**.
4. Solve the phasor-domain circuit with any DC method: series and parallel combination, dividers, nodal or mesh analysis, Thévenin equivalents. All arithmetic is complex.
5. Convert each phasor answer back to a time function, $\mathbf X = X_m\angle\theta \mapsto X_m\cos(\omega t + \theta)$.
6. Check one result against an element law or KVL/KCL.
:::

::: example A source with an LC tank {#ex-tank}
A source $v_s(t) = 10\cos(1000t)\,\mathrm V$ drives a $50\,\Omega$ resistor in series with a parallel combination of a $40\,\mathrm{mH}$ inductor and a $10\,\mathrm{\mu F}$ capacitor. Find the source current and the currents in the inductor and the capacitor as functions of time.
::: solution
Steps 2 and 3: $\mathbf V_s = 10\angle0^\circ\,\mathrm V$, $Z_L = j(1000)(0.04) = j40\,\Omega$, $Z_C = 1/(j\times1000\times10^{-5}) = -j100\,\Omega$.

Step 4: the parallel pair has

$$
Z_p = \frac{(j40)(-j100)}{j40 - j100} = \frac{4000}{-j60} = j66.67\,\Omega.
$$

The total impedance is $Z = 50 + j66.67 = 83.33\angle53.13^\circ\,\Omega$, so

$$
\mathbf I = \frac{10\angle0^\circ}{83.33\angle53.13^\circ} = 0.12\angle-53.13^\circ\,\mathrm A.
$$

The voltage across the tank is $\mathbf V_p = Z_p\mathbf I = (66.67\angle90^\circ)(0.12\angle-53.13^\circ) = 8\angle36.87^\circ\,\mathrm V$, and

$$
\mathbf I_L = \frac{\mathbf V_p}{j40} = 0.2\angle-53.13^\circ\,\mathrm A, \qquad \mathbf I_C = \frac{\mathbf V_p}{-j100} = 0.08\angle126.87^\circ\,\mathrm A.
$$

Step 5: $i(t) = 0.12\cos(1000t - 53.13^\circ)\,\mathrm A$, $i_L(t) = 0.2\cos(1000t - 53.13^\circ)\,\mathrm A$ and $i_C(t) = 0.08\cos(1000t + 126.87^\circ)\,\mathrm A$.

Step 6: KCL at the top of the tank requires $\mathbf I_L + \mathbf I_C = \mathbf I$. In rectangular form, $(0.12 - j0.16) + (-0.048 + j0.064) = 0.072 - j0.096 = 0.12\angle-53.13^\circ$. Correct. The inductor current, $0.2\,\mathrm A$, is larger than the source current, $0.12\,\mathrm A$: the inductor and capacitor currents are in antiphase, and part of the current simply circulates around the tank. At this frequency the inductor's admittance is the larger one, so the tank as a whole is inductive.
:::
:::

::: warning Phasors belong to one frequency
Phasors and impedances are defined at a single $\omega$. If a circuit has sources at different frequencies, for example a DC bias and a $1\,\mathrm{kHz}$ signal, you may **not** add their phasors or use one impedance for both. Solve the circuit once for each frequency, with the impedances evaluated at that frequency, convert each answer to a time function, and add the **time functions** by superposition. [[circuits-2/ac-analysis]] works an example.
:::

::: example Design: a capacitive dropper {#ex-dropper}
A small indicator circuit, modelled as a $100\,\Omega$ resistance, must draw $20\,\mathrm{mA}$ RMS from the $230\,\mathrm V$ RMS, $50\,\mathrm{Hz}$ mains. A series resistor would dissipate about $4.6\,\mathrm W$. Choose instead a series capacitor, and find the power it dissipates.
::: solution
The total impedance magnitude must be $\abs{Z} = 230/0.02 = 11\,500\,\Omega$. With $Z = 100 - jX$ (capacitive), $X = \sqrt{11\,500^2 - 100^2} = 11\,499.6\,\Omega$, so

$$
C = \frac{1}{\omega X} = \frac{1}{(100\pi)(11\,499.6)} = 0.277\,\mathrm{\mu F}.
$$

The nearest standard value is $0.27\,\mathrm{\mu F}$, which gives $\abs{Z} = \abs{100 - j11\,789} = 11\,790\,\Omega$ and $I = 19.5\,\mathrm{mA}$, close enough. An ideal capacitor absorbs no average power, since its voltage and current are $90^\circ$ apart; only the load dissipates, $I^2R = 0.038\,\mathrm W$. The capacitor drops almost the entire supply voltage, $230\,\mathrm V$ RMS, at almost no power cost. In a real design the capacitor must be a mains-rated (class X2) type, a resistor is added in parallel with it to discharge it when unplugged, and the whole circuit is live, so it must be fully insulated: a capacitive dropper provides no isolation from the mains.
:::
:::

::: application Phasors at work
Mains distribution, motor drives and audio crossovers are analysed with exactly the method above. A loudspeaker crossover, for instance, uses an inductor in series with the woofer (its impedance rises with frequency and blocks the treble) and a capacitor in series with the tweeter (its impedance falls with frequency and blocks the bass). A circuit simulator's "AC analysis" ([[circuits-1/circuit-simulation]]) does the same: it replaces every element by its impedance at each frequency of a sweep, solves the complex nodal equations, and reports magnitudes and phases.
:::

::: history
The mathematics is old: Leonhard Euler published the formula $e^{j\theta} = \cos\theta + j\sin\theta$ in his *Introductio in analysin infinitorum* of 1748. Its use for alternating currents came with the AC power industry. Oliver Heaviside introduced the words **impedance** (1886) and **admittance** (1887) while developing the operational methods he used for telegraph and telephone lines. In 1893 Arthur Kennelly published a paper titled "Impedance" in the *Transactions* of the American Institute of Electrical Engineers, treating impedance as a complex quantity, and in the same year Charles Proteus Steinmetz presented "Complex quantities and their use in electrical engineering" to the International Electrical Congress in Chicago. Steinmetz's book *Theory and Calculation of Alternating Current Phenomena* (1897, with Ernst Berg) spread the symbolic method, with $j$ for the imaginary unit, to a generation of engineers, who until then had solved AC circuits with trigonometric identities and graphical constructions, much as we did with the $RL$ circuit above.
:::

## Where this leads

With phasors, impedance and Kirchhoff's laws in the phasor domain you can analyse any single-frequency circuit. [[circuits-2/ac-analysis]] applies nodal and mesh analysis, superposition, source transformation and Thévenin's theorem in the phasor domain. [[circuits-2/ac-power]] shows that average power depends on the phase between voltage and current, and gives the RMS value its full meaning. In [[circuits-2/frequency-response]] the frequency $\omega$ becomes a variable and the ratio of two phasors becomes the transfer function $H(j\omega)$. Finally, [[circuits-2/laplace-circuit-analysis]] replaces $j\omega$ by a general complex frequency $s$, which handles transients and steady state together; the phasor turns out to be the Laplace transform evaluated on the imaginary axis.

::: summary
- A sinusoid $V_m\cos(\omega t + \phi)$ has amplitude $V_m$, angular frequency $\omega = 2\pi f$ and phase $\phi$. Compare phases only at the same frequency, after writing both as cosines with positive amplitudes.
- The RMS value of a sinusoid is $V_m/\sqrt2$; mains voltages and meter readings are RMS.
- In a stable linear circuit driven at one frequency, every steady-state quantity is a sinusoid at that frequency, $\mathrm{Re}[\mathbf Xe^{j\omega t}]$, described completely by its phasor $\mathbf X = X_m\angle\theta$.
- The phasor transform is linear and turns $\mathrm d/\mathrm dt$ into multiplication by $j\omega$, so element laws become $\mathbf V = Z\mathbf I$ with $Z_R = R$, $Z_L = j\omega L$, $Z_C = 1/(j\omega C)$.
- In an inductor the current lags the voltage by $90^\circ$; in a capacitor it leads by $90^\circ$.
- Impedance $Z = R + jX$ and admittance $Y = G + jB = 1/Z$ combine like resistance and conductance; $G = 1/R$ only when $X = 0$.
- KCL and KVL hold for phasors (not for their magnitudes), so every DC method applies with complex arithmetic, at one frequency at a time.
:::

## Exercises

::: exercise Frequency from the angular frequency {level=1 check="50"}
A voltage is $v(t) = 12\cos(100\pi t)\,\mathrm V$. What is its frequency, in hertz? What is its period?
::: solution
$f = \omega/(2\pi) = 100\pi/(2\pi) = 50\,\mathrm{Hz}$, and $T = 1/f = 20\,\mathrm{ms}$.
:::
:::

::: exercise Peak and RMS {level=1 check="10/sqrt(2)"}
A sinusoidal voltage has an amplitude of $10\,\mathrm V$. What is its RMS value, in volts?
::: solution
$V_{\text{rms}} = V_m/\sqrt2 = 10/\sqrt2 = 7.07\,\mathrm V$.
:::
:::

::: exercise Angle of an inductor's impedance {level=1 check="90"}
Find the impedance of a $10\,\mathrm{mH}$ inductor at $50\,\mathrm{Hz}$ in rectangular and polar form. Enter its angle in degrees.
::: solution
$Z_L = j\omega L = j(2\pi\times50)(0.01) = j3.14\,\Omega = 3.14\angle90^\circ\,\Omega$. The angle is $+90^\circ$: the voltage leads the current by a quarter cycle. (A capacitor's impedance has angle $-90^\circ$.)
:::
:::

::: exercise Reactance of a capacitor {level=1 check="1/(2*pi*60*100e-6)"}
What is the magnitude of the impedance of a $100\,\mathrm{\mu F}$ capacitor at $60\,\mathrm{Hz}$, in ohms?
::: solution
$\abs{Z_C} = 1/(\omega C) = 1/(2\pi\times60\times100\times10^{-6}) = 1/0.0377 = 26.5\,\Omega$.
:::
:::

::: exercise Phase difference {level=2 check="155"}
Let $v_1(t) = 8\cos(\omega t - 25^\circ)\,\mathrm V$ and $v_2(t) = -6\sin(\omega t + 40^\circ)\,\mathrm V$. By how many degrees does $v_2$ lead $v_1$? Give the answer between $-180^\circ$ and $180^\circ$.
::: solution
$-\sin\theta = \cos(\theta + 90^\circ)$, so $v_2 = 6\cos(\omega t + 130^\circ)$. The phase difference is $130^\circ - (-25^\circ) = 155^\circ$: $v_2$ leads $v_1$ by $155^\circ$ (equivalently, lags by $205^\circ$, which lies outside the conventional range).
:::
:::

::: exercise Adding a sine and a cosine {level=2 check="-30"}
Write $v(t) = 5\cos(\omega t + 30^\circ) + 5\sin\omega t$ as a single sinusoid $V_m\cos(\omega t + \phi)$. Enter $\phi$ in degrees.
::: hint
$\sin\omega t = \cos(\omega t - 90^\circ)$.
:::
::: solution
The phasors are $5\angle30^\circ = 4.330 + j2.5$ and $5\angle-90^\circ = -j5$. Their sum is $4.330 - j2.5 = 5\angle-30^\circ$, so $v(t) = 5\cos(\omega t - 30^\circ)$. Two equal phasors $120^\circ$ apart add to a phasor of the same length on their bisector.
:::
:::

::: exercise Conductance of an impedance {level=2 check="0.12"}
Find the admittance of $Z = 3 + j4\,\Omega$. Enter its conductance in siemens.
::: solution
$Y = 1/(3 + j4) = (3 - j4)/(3^2 + 4^2) = 0.12 - j0.16\,\mathrm S$. The conductance is $G = 0.12\,\mathrm S$ and the susceptance $B = -0.16\,\mathrm S$ (negative, as for any inductive impedance). It is not $1/3\,\mathrm S$.
:::
:::

::: exercise Setting a phase lag {level=2 check="100*tan(pi/6)/(2*pi*1000)"}
A $100\,\Omega$ resistor is in series with an inductor and driven at $1\,\mathrm{kHz}$. What inductance, in henries, makes the current lag the source voltage by $30^\circ$?
::: solution
$\theta_Z = \tan^{-1}(\omega L/R) = 30^\circ$, so $\omega L = R\tan30^\circ = 57.7\,\Omega$ and $L = 57.7/(2\pi\times1000) = 9.19\,\mathrm{mH}$.
:::
:::

::: exercise Measuring an inductor {level=2 check="16/(100*pi)"}
An inductor coil has a winding resistance of $12\,\Omega$, measured with an ohmmeter. Connected to a $24\,\mathrm V$ RMS, $50\,\mathrm{Hz}$ supply it draws $1.2\,\mathrm A$ RMS. Model it as a resistance in series with an ideal inductance and find the inductance, in henries.
::: solution
$\abs{Z} = 24/1.2 = 20\,\Omega$. With $R = 12\,\Omega$, $X = \sqrt{20^2 - 12^2} = 16\,\Omega$, so $L = X/\omega = 16/(100\pi) = 50.9\,\mathrm{mH}$. The current lags the voltage by $\tan^{-1}(16/12) = 53.1^\circ$.
:::
:::

::: exercise The RC circuit by the differential equation {level=3}
A source $V_m\cos\omega t$ drives a resistor $R$ in series with a capacitor $C$; let $v$ be the capacitor voltage. (a) Write the differential equation for $v$. (b) Find its steady-state solution by trying $v = A_1\cos\omega t + A_2\sin\omega t$. (c) Show that your answer agrees with the phasor voltage divider $\mathbf V = V_m\,Z_C/(R + Z_C)$.
::: hint
KVL gives $RC\,\mathrm dv/\mathrm dt + v = V_m\cos\omega t$. Write $\tau = RC$.
:::
::: solution
(a) The current is $C\,\mathrm dv/\mathrm dt$, so KVL gives $\tau\,\mathrm dv/\mathrm dt + v = V_m\cos\omega t$ with $\tau = RC$.

(b) Substituting, $\tau\omega(-A_1\sin\omega t + A_2\cos\omega t) + A_1\cos\omega t + A_2\sin\omega t = V_m\cos\omega t$. Matching coefficients: $A_1 + \omega\tau A_2 = V_m$ and $A_2 - \omega\tau A_1 = 0$. Hence $A_1 = V_m/(1 + \omega^2\tau^2)$ and $A_2 = \omega\tau V_m/(1 + \omega^2\tau^2)$, and

$$
v(t) = \frac{V_m}{\sqrt{1 + \omega^2\tau^2}}\cos\bigl(\omega t - \tan^{-1}\omega\tau\bigr).
$$

(c) The divider gives $\mathbf V = V_m\dfrac{1/(j\omega C)}{R + 1/(j\omega C)} = \dfrac{V_m}{1 + j\omega\tau}$, whose magnitude is $V_m/\sqrt{1 + \omega^2\tau^2}$ and angle $-\tan^{-1}\omega\tau$: the same result in one line. The natural response $Ae^{-t/\tau}$ has been ignored in both, as it decays.
:::
:::

::: exercise Design: a 45° phase shifter {level=3 check="1/(2*pi*1000*10e3)"}
A signal at $1\,\mathrm{kHz}$ is applied to a $10\,\mathrm{k\Omega}$ resistor in series with a capacitor, and the output is taken across the capacitor. (a) Choose $C$ (in farads, the answer to enter) so that the output lags the input by $45^\circ$. (b) What is the output amplitude as a fraction of the input? (c) If the nearest standard capacitor, $15\,\mathrm{nF}$, is used, what are the phase and the amplitude ratio?
::: hint
Use the divider $1/(1 + j\omega RC)$ from the previous exercise.
:::
::: solution
(a) The output phasor is $\mathbf V_{\text{in}}/(1 + j\omega RC)$, with angle $-\tan^{-1}(\omega RC)$. For $45^\circ$ we need $\omega RC = 1$, so $C = 1/(2\pi\times1000\times10^4) = 15.9\,\mathrm{nF}$.

(b) $\abs{1/(1 + j)} = 1/\sqrt2 = 0.707$.

(c) With $C = 15\,\mathrm{nF}$, $\omega RC = 2\pi\times1000\times10^4\times1.5\times10^{-8} = 0.942$, so the phase is $-\tan^{-1}0.942 = -43.3^\circ$ and the ratio $1/\sqrt{1 + 0.942^2} = 0.728$. A $5\,\%$ tolerance capacitor would move the phase by about another $\pm1.4^\circ$; if the $45^\circ$ must be accurate, trim the resistor.
:::
:::

::: exercise Why Kirchhoff's laws fail for magnitudes {level=3}
In the series $RLC$ example the element-voltage amplitudes were $4.02$, $1.52$ and $10.67\,\mathrm V$ while the source amplitude was $10\,\mathrm V$. (a) Explain why the triangle inequality guarantees $\abs{\mathbf V_s} \le \abs{\mathbf V_R} + \abs{\mathbf V_L} + \abs{\mathbf V_C}$. (b) Under what condition on the phasors does equality hold? (c) Can a single element voltage exceed the source amplitude in a series circuit of resistors only? Explain.
::: solution
(a) KVL gives $\mathbf V_s = \mathbf V_R + \mathbf V_L + \mathbf V_C$ as complex numbers, and for complex numbers $\abs{a + b + c} \le \abs a + \abs b + \abs c$.

(b) Equality holds only when all the non-zero phasors have the same angle, that is when all the element voltages are in phase. In a series circuit they share one current, so this needs all the impedances to have the same angle: for example, all resistors, or all inductors.

(c) No. With resistors only, every element voltage is $R_k\mathbf I$, all in phase, so the magnitudes do add to the source magnitude and each one is smaller. Overshoot of the source amplitude needs reactances of opposite sign, an inductor and a capacitor, whose voltages are in antiphase and cancel partly in the sum.
:::
:::
