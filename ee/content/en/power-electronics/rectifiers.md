Almost every electronic device that plugs into a wall socket begins with a **rectifier**: four diodes and a capacitor that turn the $50$ or $60\,\mathrm{Hz}$ mains into a DC voltage for the converters that follow. Scale the same idea up and you have the six-pulse thyristor bridges that feed DC motors in steel mills, the twelve-pulse converters at each end of a high-voltage DC link, and the input stage of nearly every industrial motor drive. Rectifiers are the oldest power-electronic circuits, and they are simple to build — but they draw a current from the grid that is anything but sinusoidal, and the harmonics and poor power factor they create are one of the main reasons modern power electronics has grown more sophisticated.

This chapter analyses diode and thyristor rectifiers, single- and three-phase, with resistive, inductive and capacitive loads. We derive their output voltages, the effect of the supply's inductance on commutation, and the harmonic content of their input currents, and we define the power-factor quantities used to judge them. The circuits use the diodes and thyristors of [[power-electronics/power-switches]], and the three-phase analysis builds on [[circuits-2/three-phase-circuits]]. The capacitor-filtered rectifier first met in [[electronics-1/diode-circuits]] reappears here with its line current examined.

## Single-phase diode rectifiers

Let the supply be $v_s = V_m\sin\omega t$, with RMS value $V_s = V_m/\sqrt2$. A diode conducts when forward biased and blocks otherwise, so in a rectifier the diodes switch themselves at the instants dictated by the circuit's voltages. Analysis consists of finding which diodes conduct in each interval and writing the output as a piecewise function of time.

::: definition Average, RMS and ripple of a rectified waveform {#def-rectified}
For a periodic output voltage $v_d(t)$ of period $T$, the **DC (average) output** is $V_d = \frac1T\int_0^Tv_d\,\dd t$, the RMS value is $V_{d,rms} = \sqrt{\frac1T\int_0^Tv_d^2\,\dd t}$, and the **ripple** is the AC part $v_d - V_d$, of RMS value $\sqrt{V_{d,rms}^2 - V_d^2}$. The **pulse number** $p$ is the number of ripple periods per supply period.
:::

The **half-wave rectifier** (one diode, resistive load) passes only the positive half-cycles: $V_d = \frac1{2\pi}\int_0^\pi V_m\sin\theta\,\dd\theta = V_m/\pi = 0.45V_s$, with $p = 1$. Its input current has a DC component, which saturates supply transformers, so it is used only at very low power. The **full-wave bridge** — four diodes, two of which conduct in each half-cycle — applies $\lvert v_s\rvert$ to the load:

$$
V_{d0} = \frac1\pi\int_0^\pi V_m\sin\theta\,\dd\theta = \frac{2V_m}{\pi} = \frac{2\sqrt2}{\pi}V_s \approx 0.9V_s,\qquad p = 2.
$$ {#eq-vd0-1ph}

With a resistive load the input current is a sinusoid in phase with the voltage, so the bridge looks like a resistor to the grid. Real loads are not resistors. Two idealisations bracket practice: a **highly inductive load**, in which a large DC-side inductor keeps the load current at a nearly constant $I_d$, and a **capacitive load**, in which a large capacitor holds the output near the peak of the supply.

### Inductive load: square-wave line current

With a constant DC current $I_d$, each pair of diodes carries $I_d$ for half a cycle and the supply current is a square wave of amplitude $I_d$ in phase with the voltage. A square wave of amplitude $I_d$ has the Fourier series

$$
i_s(\theta) = \frac{4I_d}{\pi}\left(\sin\theta + \frac13\sin3\theta + \frac15\sin5\theta + \cdots\right),
$$ {#eq-square-series}

so its harmonic of order $h$ (odd $h$ only) has RMS value $I_{sh} = \dfrac{2\sqrt2}{\pi}\dfrac{I_d}{h} = \dfrac{0.9I_d}{h}$, while the total RMS current is $I_s = I_d$.

::: widget fourier
wave: square
terms: 3
caption: The supply current of a single-phase bridge with a constant DC current is a square wave (here over one supply cycle, $\theta$ from $-\pi$ to $\pi$). Add terms and watch the partial sums converge; the spectrum below shows the odd harmonics falling as $1/h$. The fundamental alone carries all the real power — the harmonics carry none, because the supply voltage has no component at their frequencies — yet they add to the RMS current, the losses and the voltage distortion in the grid.
:::

### Measuring how badly a load draws current

::: definition Power factor, displacement factor and THD {#def-pf}
For a sinusoidal supply voltage of RMS value $V_s$ and a periodic current of RMS value $I_s$ whose fundamental has RMS value $I_{s1}$ and phase angle $\phi_1$ behind the voltage:

- the **power factor** is $\mathrm{PF} = P/S = P/(V_sI_s)$, real power over apparent power;
- the **displacement power factor** is $\mathrm{DPF} = \cos\phi_1$;
- the **distortion factor** is $I_{s1}/I_s$;
- the **total harmonic distortion** of the current is $\mathrm{THD} = \sqrt{I_s^2 - I_{s1}^2}\,/\,I_{s1} = \sqrt{\sum_{h\ge2}I_{sh}^2}\,/\,I_{s1}$.
:::

::: theorem Power factor with a sinusoidal voltage {#thm-pf}
If the supply voltage is sinusoidal, the real power is carried by the fundamental current alone, $P = V_sI_{s1}\cos\phi_1$, and

$$
\mathrm{PF} = \frac{I_{s1}}{I_s}\cos\phi_1 = \frac{\cos\phi_1}{\sqrt{1 + \mathrm{THD}^2}}.
$$ {#eq-pf}
:::

::: proof
Write $i_s = \sum_h\sqrt2I_{sh}\sin(h\omega t - \phi_h)$ and $v_s = \sqrt2V_s\sin\omega t$. The average of $v_si_s$ over a period is a sum of averages of $\sin\omega t\sin(h\omega t - \phi_h)$, and by the orthogonality of sinusoids of different frequencies (see [[signals-systems/fourier-series]]) every term with $h \ne 1$ averages to zero. The $h = 1$ term gives $2V_sI_{s1}\cdot\frac12\cos\phi_1$. Dividing by $V_sI_s$ gives the first form; the second follows from $I_s^2 = I_{s1}^2 + \sum_{h\ge2}I_{sh}^2 = I_{s1}^2(1 + \mathrm{THD}^2)$.
:::

The theorem says that a load can have a poor power factor for two independent reasons: its fundamental current can be phase-shifted (reactive power, the familiar case of [[circuits-2/ac-power]]), or its current can be distorted. Capacitors can correct the first but not the second.

::: example A bridge with an inductive load {#ex-bridge-inductive}
A single-phase diode bridge on a $230\,\mathrm{V}$, $50\,\mathrm{Hz}$ supply feeds a load with a large series inductor; the DC current is a steady $10\,\mathrm{A}$. Find the DC voltage and power, the RMS supply current and its fundamental, the THD and the power factor. How large are the third and fifth harmonics?
::: solution
By [[#eq-vd0-1ph]], $V_{d0} = 0.9\times230 = 207\,\mathrm{V}$ (the inductor has no average voltage, so this is also the average voltage across the resistive part of the load), and $P = 207\times10 = 2.07\,\mathrm{kW}$.

The supply current is a $\pm10\,\mathrm{A}$ square wave, so $I_s = 10\,\mathrm{A}$ and $I_{s1} = 0.9\times10 = 9.0\,\mathrm{A}$, in phase with the voltage ($\cos\phi_1 = 1$). The THD is $\sqrt{10^2 - 9^2}/9 = 48.4\,\%$, and the power factor is $9/10 = 0.90$. Check: $P = 230\times9\times1 = 2.07\,\mathrm{kW}$, as on the DC side.

The harmonics are $I_{s3} = 9/3 = 3.0\,\mathrm{A}$ and $I_{s5} = 9/5 = 1.8\,\mathrm{A}$.
:::
:::

### Capacitive load: peaky line current

With a large smoothing capacitor, the diodes conduct only near the peaks of the supply voltage, when $\lvert v_s\rvert$ exceeds the capacitor voltage; for the rest of the cycle the capacitor alone feeds the load and discharges slightly. The ripple was derived in [[electronics-1/diode-circuits#prop-ripple]]: approximately $\Delta V \approx I_d/(2fC)$ peak to peak for a full-wave bridge. Here the interest is the supply side. The capacitor must be recharged in a short conduction interval, so the line current consists of narrow, tall pulses — an extreme case of distortion.

::: example The line current of a capacitor-input rectifier {#ex-cap-input}
A single-phase bridge on $230\,\mathrm{V}$, $50\,\mathrm{Hz}$ feeds a $470\,\mathrm{\mu F}$ capacitor and a $320\,\Omega$ load. The supply has an inductance of $1\,\mathrm{mH}$ and a resistance of $0.5\,\Omega$. A numerical simulation (the differential equations $L\,\dd i/\dd t = \lvert v_s\rvert - v_C - Ri$ while $i > 0$, and $C\,\dd v_C/\dd t = i - v_C/R_L$) gives the steady-state results below. Interpret them.

| quantity | value |
|---|---|
| DC voltage, ripple | $318\,\mathrm{V}$, $17\,\mathrm{V}$ peak to peak |
| power drawn | $320\,\mathrm{W}$ |
| peak line current | $8.5\,\mathrm{A}$ |
| RMS line current | $2.55\,\mathrm{A}$ |
| fundamental line current | $1.40\,\mathrm{A}$ |
| third, fifth, seventh harmonics (relative to fundamental) | $93\,\%$, $81\,\%$, $65\,\%$ |
::: solution
The DC voltage is close to the peak $230\sqrt2 = 325\,\mathrm{V}$, less the drop in the source impedance. The ripple agrees with the estimate $I_d/(2fC) = (318/320)/(2\times50\times470\times10^{-6}) = 21\,\mathrm{V}$ to the accuracy of the approximation (the capacitor is recharged for part of each half-cycle, which shortens the discharge).

The supply delivers $320\,\mathrm{W}$ with a fundamental of $1.40\,\mathrm{A}$, i.e. $230\times1.40 = 322\,\mathrm{VA}$ of fundamental apparent power: the fundamental is almost in phase ($\mathrm{DPF} \approx 0.997$). But the RMS current is $2.55\,\mathrm{A}$, so the power factor is $320/(230\times2.55) = 0.55$, and the THD is $\sqrt{2.55^2 - 1.40^2}/1.40 = 152\,\%$. Per [[#thm-pf]], $0.997/\sqrt{1 + 1.52^2} = 0.55$, as it should. The peak current is $8.5/1.40 \approx 6$ times the RMS fundamental.

Nearly half the RMS current does no useful work. Multiply by the millions of power supplies on a distribution feeder and the third harmonics — which add rather than cancel in the neutral of a three-phase four-wire system — overheat neutral conductors and distort the voltage everyone else receives. This is why standards such as IEC 61000-3-2 limit the harmonic currents of equipment above $75\,\mathrm{W}$, and why most such equipment now contains a power-factor-correction stage.
:::
:::

::: warning Peak, RMS and average are three different numbers
A rectifier problem uses all three, and confusing them is the commonest error. The mains "230 V" is an RMS value (peak $325\,\mathrm{V}$); a capacitor-input rectifier's DC output is near the *peak*; an inductive-load bridge's is $0.9$ times the *RMS*; the diode current rating needed for conduction loss is the *average* (and the *RMS* for the resistive part); and the fuse and wiring see the *RMS* line current, which for a capacitor input is nearly twice the fundamental. State which one you mean every time.
:::

## Phase-controlled rectifiers

Replace the diodes of the bridge by thyristors and the output becomes adjustable. A thyristor that is forward biased does not conduct until its gate is fired; delaying the firing by an angle $\alpha$ after the instant at which a diode would have started to conduct (the natural commutation instant, $\theta = 0$ for the positive half-cycle) delays the transfer of current from one pair to the other.

::: theorem Output of a phase-controlled single-phase bridge {#thm-alpha-1ph}
With continuous, ripple-free DC current $I_d$ and an ideal supply, a fully controlled single-phase thyristor bridge fired at delay angle $\alpha$ produces

$$
V_d = \frac{2V_m}{\pi}\cos\alpha = 0.9V_s\cos\alpha,
$$ {#eq-vd-alpha}

and its supply current is a square wave of amplitude $I_d$ lagging the voltage by $\alpha$, so $\mathrm{DPF} = \cos\alpha$ and $\mathrm{PF} = 0.9\cos\alpha$.
:::

::: proof
Thyristors $T_1, T_2$ are fired at $\theta = \alpha$ and conduct until $T_3, T_4$ are fired at $\theta = \pi + \alpha$; because the inductive load keeps $I_d$ flowing, they keep conducting even after $v_s$ turns negative at $\theta = \pi$. So $v_d = v_s$ for $\alpha < \theta < \pi + \alpha$, and the pattern repeats with period $\pi$:

$$
V_d = \frac1\pi\int_\alpha^{\pi + \alpha}V_m\sin\theta\,\dd\theta = \frac{V_m}{\pi}\left[\cos\alpha - \cos(\pi + \alpha)\right] = \frac{2V_m}{\pi}\cos\alpha .
$$

The supply current is $+I_d$ while $T_1, T_2$ conduct and $-I_d$ while $T_3, T_4$ conduct: the square wave of [[#eq-square-series]] shifted by $\alpha$. Its fundamental, of RMS value $0.9I_d$, lags by $\alpha$, so by [[#thm-pf]] $\mathrm{PF} = 0.9\cos\alpha$. As a check on the energy balance, $V_sI_{s1}\cos\alpha = 0.9V_sI_d\cos\alpha = V_dI_d$.
:::

::: widget plot
f: if(mod(x - a, 2*pi) < pi, sin(x), -sin(x)); 2/pi*cos(a); sin(x)
x: 0, 4*pi
y: -1.1, 1.1
sliders: a=0.5:0:3.1:0.02
piticks: true
labels: v_d/V_m; V_d/V_m; v_s/V_m
caption: Output voltage of a fully controlled single-phase bridge with continuous DC current, normalised to the supply peak, over two supply cycles; the slider is the delay angle $\alpha$ in radians. At $\alpha = 0$ the output is $\lvert v_s\rvert$ and the average (orange) is $2/\pi$. As $\alpha$ grows, the output includes more and more of the negative half-cycle and its average falls as $\cos\alpha$, passing through zero at $\alpha = \pi/2$ and becoming negative beyond: the converter now returns power from the DC side to the grid, provided the DC source can sustain the current.
:::

For $\alpha > 90^\circ$ the average DC voltage is negative while the current, which thyristors allow in one direction only, stays positive: power flows from the DC side to the AC side, and the converter is an **inverter**. A DC machine being braked, or the receiving end of an HVDC link, can supply that power. This **line-commutated inversion** works only because the AC grid supplies the voltage that turns each thyristor off; the delay cannot reach $180^\circ$, because the outgoing thyristor needs a margin of reverse voltage (the **extinction angle**) to recover.

The reactive power drawn is $Q_1 = V_sI_{s1}\sin\alpha$, which is large for a converter delivering a low DC voltage at full current — a phase-controlled rectifier at $\alpha = 60^\circ$ draws as much fundamental reactive power as $\sqrt3$ times its real power. This is the main reason controlled rectifiers have been displaced by diode rectifiers followed by DC–DC converters or by active front ends in all but the largest applications.

::: quiz
A fully controlled single-phase bridge with a highly inductive load is fired at $\alpha = 120^\circ$. Which statement is right?
- [ ] The DC current reverses and the load is driven backwards.
- [x] The average DC voltage is $-0.45V_s$; if the DC side contains a source that can maintain the current, the converter returns power to the grid.
- [ ] The output is zero, because the thyristors cannot conduct when the supply is negative.
- [ ] The converter short-circuits the supply.
::: solution
$V_d = 0.9V_s\cos120^\circ = -0.45V_s$, while the thyristors keep the current positive. The product $V_dI_d$ is negative: power flows from DC to AC. Without a DC-side source (a plain resistor and inductor), the stored energy would soon be exhausted and the current would become discontinuous and die away.
:::
:::

## Commutation and the supply inductance

So far the current has been assumed to jump instantaneously from one pair of devices to the next. A real supply has inductance $L_s$ (the transformer's leakage inductance and the line), and current cannot jump in an inductor. During the transfer, called **commutation**, both the outgoing and incoming devices conduct for an **overlap angle** $u$, short-circuiting the supply through $L_s$, and the DC output voltage during the overlap is zero (single-phase) or the mean of two phase voltages (three-phase).

::: theorem Commutation overlap in the single-phase bridge {#thm-overlap-1ph}
With supply inductance $L_s$ and constant DC current $I_d$, the overlap angle $u$ satisfies

$$
\cos\alpha - \cos(\alpha + u) = \frac{2\omega L_sI_d}{V_m},
$$

and the average DC voltage is reduced to

$$
V_d = 0.9V_s\cos\alpha - \frac{2\omega L_sI_d}{\pi}.
$$ {#eq-overlap-1ph}
:::

::: proof
During overlap all four devices conduct, so $v_d = 0$, and the supply voltage appears entirely across $L_s$: $v_s = L_s\,\dd i_s/\dd t$, i.e. $V_m\sin\theta = \omega L_s\,\dd i_s/\dd\theta$. The supply current must reverse from $-I_d$ to $+I_d$ (a change of $2I_d$) between $\theta = \alpha$ and $\alpha + u$:

$$
\int_\alpha^{\alpha + u}V_m\sin\theta\,\dd\theta = \omega L_s\cdot2I_d \implies V_m\left[\cos\alpha - \cos(\alpha + u)\right] = 2\omega L_sI_d .
$$

Without overlap the output in that interval would have been $V_m\sin\theta$; the lost area per half-cycle is therefore $2\omega L_sI_d$ volt-radians, and averaging over the half-period $\pi$ gives the reduction $2\omega L_sI_d/\pi$.
:::

The voltage drop is proportional to the current, so the supply inductance appears at the DC terminals as an equivalent resistance $R_c = 2\omega L_s/\pi$ — but a *lossless* one: the "lost" volt-seconds become reactive power, not heat. Overlap also notches the supply voltage at the converter's terminals, which disturbs other loads on the same bus.

## Three-phase rectifiers

Above a few kilowatts the three-phase **six-pulse bridge** is used: three upper devices whose cathodes join at the positive DC rail and three lower devices whose anodes join at the negative rail. With diodes, at each instant the upper rail follows the most positive phase and the lower rail the most negative, so the output is the largest of the six line-to-line voltages, $v_d = \max(\lvert v_{ab}\rvert, \lvert v_{bc}\rvert, \lvert v_{ca}\rvert)$, a waveform with six pulses per cycle.

::: theorem Output of the six-pulse bridge {#thm-six-pulse}
For a supply of line-to-line RMS voltage $V_{LL}$, constant DC current and delay angle $\alpha$ (with $\alpha = 0$ for diodes),

$$
V_d = \frac{3\sqrt2}{\pi}V_{LL}\cos\alpha - \frac{3\omega L_s}{\pi}I_d \approx 1.35V_{LL}\cos\alpha - \frac{3\omega L_s}{\pi}I_d,
$$ {#eq-six-pulse}

where $L_s$ is the inductance per phase; the overlap angle satisfies $\cos\alpha - \cos(\alpha + u) = 2\omega L_sI_d/(\sqrt2V_{LL})$.
:::

::: proof
Each of the six line-to-line voltages, of peak $\sqrt2V_{LL}$, is the output for one sixth of a cycle. Measure the angle $\theta'$ from the peak of the line voltage that is currently connected; with diodes it is connected for $-\pi/6 < \theta' < \pi/6$, and a delay $\alpha$ shifts the interval to $-\pi/6 + \alpha < \theta' < \pi/6 + \alpha$. Hence

$$
V_d = \frac{3}{\pi}\int_{-\pi/6 + \alpha}^{\pi/6 + \alpha}\sqrt2V_{LL}\cos\theta'\,\dd\theta' = \frac{3\sqrt2V_{LL}}{\pi}\cdot2\sin\frac\pi6\cos\alpha = \frac{3\sqrt2}{\pi}V_{LL}\cos\alpha .
$$

During a commutation from phase $a$ to phase $b$ in the upper group, both conduct and the upper rail sits at $\frac12(v_a + v_b)$, while the loop through $L_s$ in each phase carries the transfer: $v_b - v_a = 2L_s\,\dd i_b/\dd t$ as $i_b$ rises from $0$ to $I_d$. Integrating, $\int(v_b - v_a)\,\dd\theta = 2\omega L_sI_d$, which with $v_b - v_a$ of peak $\sqrt2V_{LL}$ gives the overlap equation. The output loses half of this area, $\omega L_sI_d$ volt-radians, at each of the six commutations per cycle, so the average falls by $6\omega L_sI_d/(2\pi) = 3\omega L_sI_d/\pi$.
:::

::: widget plot
f: cos(mod(x, pi/3) - pi/6 + a); 3/pi*cos(a)
x: 0, 4*pi
y: -1.1, 1.1
sliders: a=0:0:3.1:0.02
piticks: true
labels: v_d/(\sqrt2V_{LL}); V_d/(\sqrt2V_{LL})
caption: Output of the six-pulse bridge, normalised to the peak line-to-line voltage, over two supply cycles, with the delay angle $\alpha$ in radians on the slider. With diodes ($\alpha = 0$) the ripple is small — the output never falls below $\cos30^\circ = 0.87$ of the peak — and the average is $3/\pi = 0.955$ of the peak, i.e. $1.35V_{LL}$. Increasing $\alpha$ cuts each segment later, the ripple grows, and the average falls as $\cos\alpha$, reversing beyond $\pi/2$ for inversion.
:::

### Line current and harmonics

Each phase current consists of a positive block of $I_d$ lasting $120^\circ$ and a negative block of $120^\circ$, separated by $60^\circ$ gaps. Its RMS value is $I_s = \sqrt{2/3}\,I_d = 0.816I_d$. The Fourier series of this waveform contains only the harmonics $h = 6k \pm 1$ (the $120^\circ$ block width removes the triplen harmonics, and the half-wave symmetry the even ones), with

$$
I_{s1} = \frac{\sqrt6}{\pi}I_d = 0.780I_d,\qquad I_{sh} = \frac{I_{s1}}{h},\quad h = 5, 7, 11, 13, \ldots
$$ {#eq-six-pulse-harmonics}

The distortion factor is $I_{s1}/I_s = 3/\pi = 0.955$, the THD is $31\,\%$, and the power factor of a diode bridge is $0.955$ (with overlap, slightly higher distortion factor and slightly lower DPF). In general a $p$-pulse converter has characteristic harmonics $h = kp \pm 1$: a **twelve-pulse** converter, two six-pulse bridges fed from transformer windings $30^\circ$ apart (one star, one delta), cancels the $5$th, $7$th, $17$th and $19$th harmonics, which is why HVDC terminals use it.

::: example A thyristor DC motor drive {#ex-dc-drive}
A DC motor is to be run at $300\,\mathrm{V}$ and $50\,\mathrm{A}$ from a three-phase, $400\,\mathrm{V}$, $50\,\mathrm{Hz}$ supply through a six-pulse thyristor bridge; the supply inductance is $2\,\mathrm{mH}$ per phase, and the armature inductance keeps the current continuous. Choose the delay angle, find the overlap angle and estimate the supply power factor.
::: solution
The diode output would be $V_{d0} = 1.35\times400 = 540.2\,\mathrm{V}$. The commutation drop is $3\omega L_sI_d/\pi = 3\times314.2\times0.002\times50/\pi = 30.0\,\mathrm{V}$. By [[#eq-six-pulse]] we need $540.2\cos\alpha = 300 + 30 = 330\,\mathrm{V}$, so $\cos\alpha = 0.611$ and $\alpha = 52.3^\circ$. (Ignoring overlap would have given $56.3^\circ$ and a motor voltage $30\,\mathrm{V}$ short.)

The overlap: $\cos52.3^\circ - \cos(52.3^\circ + u) = 2\times314.2\times0.002\times50/(\sqrt2\times400) = 0.111$, so $\cos(\alpha + u) = 0.500$, $\alpha + u = 60.0^\circ$ and $u = 7.7^\circ$.

The motor takes $P = 300\times50 = 15\,\mathrm{kW}$ (the commutation drop is reactive, not a loss). Ignoring the small rounding of the current blocks by overlap, the RMS line current is $\sqrt{2/3}\times50 = 40.8\,\mathrm{A}$, so $S = \sqrt3\times400\times40.8 = 28.3\,\mathrm{kVA}$ and $\mathrm{PF} = 15/28.3 = 0.53$. A useful approximation is $\mathrm{PF} \approx 0.955\cos(\alpha + u/2) = 0.955\cos56.2^\circ = 0.53$: the displacement angle is about the delay plus half the overlap. A drive running at low speed and full torque would be worse still — a heavy reactive burden that the supply must provide.
:::
:::

::: example Regenerative braking through the bridge {#ex-inversion}
The motor of [[#ex-dc-drive]] carries an overhauling load (a crane lowering its hook), and its back-EMF drives the armature current. Neglect overlap. What DC voltage, and what power returned to the grid, does the bridge produce at $\alpha = 150^\circ$ with $I_d = 50\,\mathrm{A}$? Why must the motor's connection be reversed first?
::: solution
$V_d = 540.2\cos150^\circ = -467.8\,\mathrm{V}$, so the bridge absorbs $V_dI_d = -467.8\times50 = -23.4\,\mathrm{kW}$, i.e. returns $23.4\,\mathrm{kW}$ (less losses) to the supply. The thyristors conduct current only one way, so to regenerate with the motor turning in the *same* direction as when motoring (back-EMF of the same sign), either the armature or field connection must be reversed, so that the back-EMF presents the negative voltage the bridge needs while the current keeps its direction; drives that must regenerate in both directions use two anti-parallel bridges (a **dual converter**). In practice $\alpha$ is limited to about $150^\circ$–$160^\circ$ to leave the extinction margin for the outgoing thyristor.
:::
:::

## Power-factor correction

A capacitor-input rectifier's power factor of about $0.55$–$0.65$, and a six-pulse bridge's of $0.95$ at best, are inadequate for many applications: they waste the capacity of wiring and transformers, distort the supply voltage and violate harmonic standards. Three remedies are used.

- **Passive filtering**: an inductor on the AC or DC side widens the conduction interval and lowers the current peaks; tuned LC filters shunt individual harmonics; multi-pulse transformers cancel harmonics in large installations.
- **Active power-factor correction** (PFC): after the diode bridge, a boost converter ([[power-electronics/dc-dc-converters]]) controlled so that its input current follows the rectified voltage waveform. The rectifier then draws a nearly sinusoidal, in-phase current with $\mathrm{PF} > 0.99$, and the boost stage regulates the DC bus (typically $\approx 400\,\mathrm{V}$). Every laptop adapter above $75\,\mathrm{W}$ and every server supply contains one.
- **Active front ends**: a three-phase inverter ([[power-electronics/inverters]]) operated in reverse as a PWM rectifier, which draws sinusoidal currents at any chosen power factor and can return power. These are standard in regenerative drives, EV chargers and grid-tied storage.

::: application High-voltage DC transmission
The largest rectifiers ever built are the converter stations of line-commutated HVDC links, each a stack of thyristor valves rated hundreds of kilovolts and several kiloamperes, arranged as twelve-pulse bridges. The sending end operates as a rectifier at $\alpha \approx 15^\circ$ and the receiving end as an inverter at an extinction angle of about $18^\circ$; the DC current, and hence the power, is controlled by the difference between the two DC voltages. The converters absorb reactive power of the order of half their real power and generate characteristic harmonics, so each station needs shunt capacitors and harmonic filters of comparable size to the converter itself. Newer voltage-source HVDC links use IGBT-based modular multilevel converters instead ([[power-electronics/power-electronics-applications]]).
:::

::: history
Peter Cooper Hewitt's mercury-arc rectifier of 1902 made large-scale AC-to-DC conversion practical, and grid-controlled mercury-arc valves — phase-controlled in exactly the manner of [[#thm-alpha-1ph]] — powered electric railways and electrochemical plants for decades. Uno Lamm's work at ASEA led to the first commercial HVDC link, between mainland Sweden and the island of Gotland, which entered service in 1954 with mercury-arc valves. Thyristors, introduced by General Electric in 1957, replaced mercury-arc valves during the 1960s and 1970s; the Eel River link in Canada (1972) was the first HVDC scheme to use thyristor valves throughout.
:::

## Where this leads

The DC bus produced by a rectifier feeds the DC–DC converters of [[power-electronics/dc-dc-converters]] and [[power-electronics/isolated-converters]], and the inverters of [[power-electronics/inverters]]; the boost PFC stage is designed in those chapters and controlled with the methods of [[power-electronics/converter-control]]. Harmonics generated by rectifiers, and the line-commutated HVDC links built from them, return in [[power-systems/power-system-structure]] and [[power-electronics/power-electronics-applications]].

::: summary
- A diode bridge gives $V_{d0} = 0.9V_s$ (single-phase, inductive load) or $1.35V_{LL}$ (three-phase six-pulse); a capacitor-input bridge gives nearly the peak, $\sqrt2V_s$.
- With a sinusoidal supply, $\mathrm{PF} = (I_{s1}/I_s)\cos\phi_1 = \cos\phi_1/\sqrt{1 + \mathrm{THD}^2}$: distortion and displacement both reduce power factor.
- A single-phase bridge with constant DC current draws a square wave (PF $0.9$, THD $48\,\%$); a six-pulse bridge draws $120^\circ$ blocks with harmonics $6k \pm 1$ (PF $0.955$, THD $31\,\%$); a capacitor-input bridge draws narrow pulses (PF $\approx 0.55$–$0.65$).
- Delaying thyristor firing by $\alpha$ scales the DC voltage by $\cos\alpha$ and makes the displacement factor $\cos\alpha$; for $\alpha > 90^\circ$ the converter inverts.
- Supply inductance causes commutation overlap, a lossless DC voltage drop $2\omega L_sI_d/\pi$ (single-phase) or $3\omega L_sI_d/\pi$ (six-pulse), and notches in the supply voltage.
- Harmonic standards and efficient use of the grid require PFC: passive filters, multi-pulse transformers, boost PFC stages or active front ends.
:::

## Exercises

::: exercise Bridge output on a 120 V supply {level=1 check="2*sqrt(2)/pi*120"}
A single-phase diode bridge with a highly inductive load is supplied at $120\,\mathrm{V}$ RMS. Find the average DC voltage in volts.
::: solution
$V_{d0} = 2\sqrt2V_s/\pi = 0.9003\times120 = 108.0\,\mathrm{V}$.
:::
:::

::: exercise Six-pulse diode bridge {level=1 check="3*sqrt(2)/pi*480"}
Find the no-load average output voltage, in volts, of a three-phase diode bridge on a $480\,\mathrm{V}$ (line-to-line RMS) supply. What is the minimum instantaneous output voltage?
::: solution
$V_{d0} = 1.3505\times480 = 648.2\,\mathrm{V}$. The output never falls below $\sqrt2\times480\times\cos30^\circ = 587.9\,\mathrm{V}$ (its peak is $678.8\,\mathrm{V}$).
:::
:::

::: exercise Half-wave rectifier {level=1 check="sqrt(2)*230/pi"}
A half-wave diode rectifier with a resistive load is fed from $230\,\mathrm{V}$ RMS. Find the average load voltage in volts, and explain why the circuit is unsuitable for a transformer-fed supply.
::: solution
$V_d = V_m/\pi = 325.3/\pi = 103.5\,\mathrm{V}$. The supply current flows only in positive half-cycles, so it has a DC component $V_d/R$; through a transformer this produces a DC magnetising offset that drives the core towards saturation.
:::
:::

::: exercise A controlled single-phase bridge {level=2 check="0.9*230*0.5"}
A fully controlled single-phase bridge on $230\,\mathrm{V}$ RMS supplies a constant $20\,\mathrm{A}$ at $\alpha = 60^\circ$. Neglecting overlap, find the DC voltage (in volts), the DC power, the RMS fundamental supply current and the power factor.
::: solution
$V_d = 0.9\times230\times\cos60^\circ = 103.5\,\mathrm{V}$ and $P = 2.07\,\mathrm{kW}$. $I_{s1} = 0.9\times20 = 18\,\mathrm{A}$ lagging by $60^\circ$; $I_s = 20\,\mathrm{A}$; $\mathrm{PF} = 0.9\cos60^\circ = 0.45$. Check: $230\times18\times0.5 = 2.07\,\mathrm{kW}$. The converter also draws $Q_1 = 230\times18\times\sin60^\circ = 3.59\,\mathrm{kvar}$.
:::
:::

::: exercise Fifth harmonic of a six-pulse bridge {level=2 check="sqrt(6)/pi*200/5"}
A six-pulse diode bridge carries a constant DC current of $200\,\mathrm{A}$. Find the RMS fifth-harmonic line current in amperes, and the THD.
::: solution
$I_{s1} = (\sqrt6/\pi)\times200 = 155.9\,\mathrm{A}$ and $I_{s5} = 155.9/5 = 31.2\,\mathrm{A}$. $I_s = \sqrt{2/3}\times200 = 163.3\,\mathrm{A}$, so $\mathrm{THD} = \sqrt{163.3^2 - 155.9^2}/155.9 = \sqrt{\pi^2/9 - 1} = 31.1\,\%$.
:::
:::

::: exercise Overlap in a three-phase bridge {level=2 check="3*sqrt(2)/pi*415*cos(pi/6) - 3/pi*2*pi*50*0.5e-3*100"}
A six-pulse thyristor bridge on $415\,\mathrm{V}$, $50\,\mathrm{Hz}$ with $L_s = 0.5\,\mathrm{mH}$ per phase supplies $100\,\mathrm{A}$ at $\alpha = 30^\circ$. Find the DC output voltage in volts and the overlap angle.
::: solution
$V_d = 1.3505\times415\times\cos30^\circ - 3\times314.16\times0.0005\times100/\pi = 485.4 - 15.0 = 470.4\,\mathrm{V}$. Overlap: $\cos(30^\circ + u) = \cos30^\circ - 2\times314.16\times0.0005\times100/(\sqrt2\times415) = 0.8660 - 0.0535 = 0.8125$, so $30^\circ + u = 35.65^\circ$ and $u = 5.65^\circ$.
:::
:::

::: exercise Hold-up capacitor design {level=3 check="2*150*0.02/(320^2 - 250^2)"}
A $150\,\mathrm{W}$ power supply runs from a capacitor-input rectifier whose DC bus normally sits at $320\,\mathrm{V}$. The DC–DC stage that follows keeps working down to $250\,\mathrm{V}$, and the supply must ride through the loss of one full $50\,\mathrm{Hz}$ cycle ($20\,\mathrm{ms}$) of mains. Find the minimum bus capacitance in farads, and comment on what this does to the line current.
::: hint
The DC–DC stage draws constant *power*, so equate the energy released by the capacitor to $Pt$.
:::
::: solution
$\frac12C(V_1^2 - V_2^2) = Pt$ gives $C = 2Pt/(V_1^2 - V_2^2) = 2\times150\times0.02/(320^2 - 250^2) = 6/39\,900 = 150\,\mathrm{\mu F}$; with $20\,\%$ tolerance and ageing, a $180\,\mathrm{\mu F}$ or $220\,\mathrm{\mu F}$ part. A large capacitor makes the conduction interval at each peak shorter and the current pulses taller, lowering the power factor — one more reason to add a PFC stage, which also lets the bus be held near $400\,\mathrm{V}$ and so stores more energy in the same capacitor.
:::
:::

::: exercise Power factor of the controlled bridge {level=3}
For the fully controlled single-phase bridge with constant DC current $I_d$ and delay $\alpha$ (no overlap), (a) derive the RMS fundamental supply current and its phase from the Fourier series, (b) show that the fundamental reactive power is $Q_1 = 0.9V_sI_d\sin\alpha$, and (c) show that $P^2 + Q_1^2 = (0.9V_sI_d)^2$, so that the operating points lie on a semicircle as $\alpha$ varies.
::: solution
(a) The supply current is the square wave of [[#eq-square-series]] delayed by $\alpha$: $i_s(\theta) = \frac{4I_d}{\pi}\sum_{h\,odd}\frac1h\sin h(\theta - \alpha)$. Its fundamental $\frac{4I_d}{\pi}\sin(\theta - \alpha)$ has RMS value $\frac{4I_d}{\pi\sqrt2} = 0.9I_d$ and lags the voltage $V_m\sin\theta$ by $\alpha$. (b) $Q_1 = V_sI_{s1}\sin\phi_1 = 0.9V_sI_d\sin\alpha$. (c) $P = 0.9V_sI_d\cos\alpha$, so $P^2 + Q_1^2 = (0.9V_sI_d)^2(\cos^2\alpha + \sin^2\alpha)$. At constant current the converter moves around a semicircle of radius $0.9V_sI_d$ in the $P$–$Q$ plane, always absorbing reactive power — from full rectification ($\alpha = 0$) through pure reactive load ($\alpha = 90^\circ$) to full inversion.
:::
:::

::: exercise Twelve-pulse cancellation {level=3}
Two six-pulse bridges carrying the same DC current are fed from transformer secondaries, one star-connected and one delta-connected, so that the second bridge's supply voltages lead the first's by $30^\circ$; the delta winding has $\sqrt3$ times the turns so that both have the same line voltage. Referred to the primary, the second bridge's $h$-th harmonic current is shifted by $h\times30^\circ$ through the bridge and back by $\mp30^\circ$ through the transformer, the sign depending on whether the harmonic is of positive sequence ($h = 6k + 1$) or negative sequence ($h = 6k - 1$). Show that the $5$th and $7$th harmonics cancel in the primary while the $11$th and $13$th add.
::: solution
The second bridge's currents are the first's with $\theta$ replaced by $\theta + 30^\circ$, so its $h$-th harmonic is advanced by $h\times30^\circ$. A star–delta transformer shifts positive-sequence quantities by $-30^\circ$ and negative-sequence quantities by $+30^\circ$ on the way back to the primary. For $h = 5$ (negative sequence) the net shift is $150^\circ + 30^\circ = 180^\circ$; for $h = 7$ (positive) it is $210^\circ - 30^\circ = 180^\circ$: both arrive in antiphase with the first bridge's and cancel. For $h = 11$ (negative): $330^\circ + 30^\circ = 360^\circ$; for $h = 13$ (positive): $390^\circ - 30^\circ = 360^\circ$: in phase, so they add. Generally $h = 12k \pm 1$ survive — the characteristic harmonics of a twelve-pulse converter — and the line current's THD falls from $31\,\%$ to about $15\,\%$.
:::
:::
