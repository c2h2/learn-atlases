A converter designed in [[power-electronics/dc-dc-converters]] produces the right output voltage at one input voltage, one load and one set of component values. In service none of these stays put: a battery discharges, the mains sags, a processor's current jumps by a hundred amperes in a microsecond, and capacitors age. A **feedback loop** measures the output, compares it with a reference and adjusts the duty cycle, typically hundreds of thousands of times a second. Designing that loop requires a model of how the output responds to the duty cycle — and a switching converter, which changes its circuit topology every few microseconds, is not obviously a linear time-invariant system at all.

The resolution is **averaging**. Over a switching period the ripple is small and the switching action can be replaced by its average, yielding a continuous, nonlinear model; linearising it about the operating point gives transfer functions that the methods of [[control-systems/frequency-response-methods]] and [[control-systems/compensator-design]] can handle. This chapter derives the averaged and small-signal models of the basic converters, finds their characteristic dynamics — including the troublesome right-half-plane zero of the boost converter — and designs voltage-mode and current-mode controllers. The PI and cascade ideas of [[control-systems/pid-control]] reappear throughout.

## Averaged models

::: definition Switching-period average {#def-average}
The **switching-period average** (or moving average) of a waveform $x(t)$ is

$$
\langle x\rangle_{T_s}(t) = \frac1{T_s}\int_{t - T_s}^{t}x(\tau)\,\dd\tau .
$$

It removes the switching ripple while following variations that are slow compared with $f_s$. The duty cycle $d(t)$ is allowed to vary from period to period.
:::

Averaging commutes with the element laws. Integrating $v_L = L\,\dd i_L/\dd t$ over the window gives $\langle v_L\rangle_{T_s}(t) = \frac{L}{T_s}[i_L(t) - i_L(t - T_s)]$, and the right-hand side is exactly $L$ times the derivative of $\langle i_L\rangle_{T_s}$; so $L\,\frac{\dd}{\dd t}\langle i_L\rangle_{T_s} = \langle v_L\rangle_{T_s}$, and likewise $C\,\frac{\dd}{\dd t}\langle v_C\rangle_{T_s} = \langle i_C\rangle_{T_s}$. The averaged inductor currents and capacitor voltages therefore obey the circuit equations with each element's voltage or current replaced by its average.

::: theorem State-space averaging {#thm-ssa}
Suppose that in continuous conduction a converter with state vector $\mathbf x$ (inductor currents and capacitor voltages) and input $\mathbf u$ obeys $\dot{\mathbf x} = \mathbf A_1\mathbf x + \mathbf B_1\mathbf u$ while the switch is on and $\dot{\mathbf x} = \mathbf A_2\mathbf x + \mathbf B_2\mathbf u$ while it is off. If the natural frequencies of the converter and the frequencies of variation of $d$ and $\mathbf u$ are much lower than $f_s$, the averaged state obeys approximately

$$
\frac{\dd\langle\mathbf x\rangle}{\dd t} = \left[d\mathbf A_1 + d'\mathbf A_2\right]\langle\mathbf x\rangle + \left[d\mathbf B_1 + d'\mathbf B_2\right]\langle\mathbf u\rangle ,
$$ {#eq-ssa}

with $d' = 1 - d$. In steady state ($\dd/\dd t = 0$, $d = D$) this reduces to volt-second and charge balance.
:::

::: proof
Over one period starting at $t_0$, the state changes by $\int\dot{\mathbf x}\,\dd t = \int_{on}(\mathbf A_1\mathbf x + \mathbf B_1\mathbf u)\,\dd t + \int_{off}(\mathbf A_2\mathbf x + \mathbf B_2\mathbf u)\,\dd t$. If $\mathbf x$ and $\mathbf u$ change little within a period (the small-ripple approximation of [[power-electronics/dc-dc-converters#def-small-ripple]], applied now to slowly varying quantities), they may be replaced by their averages inside each integral, giving $T_s\{[d\mathbf A_1 + d'\mathbf A_2]\langle\mathbf x\rangle + [d\mathbf B_1 + d'\mathbf B_2]\langle\mathbf u\rangle\}$. Dividing by $T_s$ and identifying the per-period change divided by $T_s$ with the derivative of the average gives [[#eq-ssa]]. The approximation error is of the order of the ripple, and it grows as the frequencies of interest approach $f_s/2$, where averaging ceases to be valid (sampled-data models are then needed). Middlebrook and Ćuk's 1976 paper gives the full development.
:::

For the **buck converter** with input $v_g$, the averaged equations (dropping the brackets) are

$$
L\frac{\dd i}{\dd t} = d\,v_g - v,\qquad C\frac{\dd v}{\dd t} = i - \frac vR ,
$$

and for the **boost converter**

$$
L\frac{\dd i}{\dd t} = v_g - d'v,\qquad C\frac{\dd v}{\dd t} = d'i - \frac vR .
$$ {#eq-boost-avg}

The buck equations are linear in the state (the product $dv_g$ involves only inputs). The boost equations contain the products $d'v$ and $d'i$ of a control input and a state: the boost converter is a **nonlinear** system even after averaging. That nonlinearity is where its difficult dynamics come from.

## Small-signal transfer functions

Write every averaged quantity as a DC operating value plus a small perturbation, $d = D + \hat d$, $v_g = V_g + \hat v_g$, $i = I + \hat i$, $v = V + \hat v$, substitute into the averaged equations, cancel the DC terms (which satisfy the steady-state relations) and discard the second-order products such as $\hat d\hat v$. The result is a linear model whose transfer functions describe how the output responds to small changes of duty cycle and input voltage.

::: proposition Buck small-signal model {#prop-buck-ss}
The buck converter's **control-to-output** and **line-to-output** transfer functions are

$$
G_{vd}(s) = \frac{\hat v}{\hat d} = \frac{V_g}{1 + s\dfrac LR + s^2LC},\qquad G_{vg}(s) = \frac{\hat v}{\hat v_g} = \frac{D}{1 + s\dfrac LR + s^2LC} .
$$ {#eq-buck-gvd}

Both have a pair of poles at the filter's resonance $\omega_0 = 1/\sqrt{LC}$ with quality factor $Q = R\sqrt{C/L}$.
:::

::: proof
Perturbing $L\,\dd i/\dd t = dv_g - v$: $L\,\dd\hat i/\dd t = D\hat v_g + V_g\hat d + \hat d\hat v_g - \hat v$, and dropping $\hat d\hat v_g$, $sL\hat I = D\hat V_g + V_g\hat D - \hat V$ in the Laplace domain. The capacitor equation is already linear: $sC\hat V = \hat I - \hat V/R$, so $\hat I = \hat V(sC + 1/R)$. Substituting: $\hat V(s^2LC + sL/R + 1) = D\hat V_g + V_g\hat D$, which gives both transfer functions. Comparing $1 + sL/R + s^2LC$ with $1 + s/(Q\omega_0) + s^2/\omega_0^2$ gives $\omega_0$ and $1/(Q\omega_0) = L/R$, i.e. $Q = R\sqrt{C/L}$.
:::

The buck converter's dynamics are therefore those of its output LC filter loaded by $R$ — a second-order low-pass with a resonant peak that is sharp at light load (large $R$, large $Q$) — scaled by $V_g$. Real capacitors add an **ESR zero** at $\omega_{esr} = 1/(R_{esr}C)$, which lifts the high-frequency response and is a significant part of many designs with electrolytic capacitors.

::: theorem Boost control-to-output transfer function and its right-half-plane zero {#thm-boost-rhpz}
For the boost converter in CCM,

$$
G_{vd}(s) = \frac{V}{D'}\cdot\frac{1 - s\dfrac{L}{D'^2R}}{1 + s\dfrac{L}{D'^2R} + s^2\dfrac{LC}{D'^2}},
$$ {#eq-boost-gvd}

with poles at $\omega_0 = D'/\sqrt{LC}$, $Q = D'R\sqrt{C/L}$, and a **right-half-plane zero** at

$$
\omega_z = \frac{D'^2R}{L} .
$$ {#eq-rhpz}
:::

::: proof
Perturb [[#eq-boost-avg]] with $d' = D' - \hat d$, keeping first-order terms. Inductor: $sL\hat I = \hat V_g - D'\hat V + V\hat D$. Capacitor: $sC\hat V = D'\hat I - I\hat D - \hat V/R$, with $I = V/(D'R)$. Set $\hat V_g = 0$; from the first, $\hat I = (V\hat D - D'\hat V)/(sL)$. Substituting into the second and multiplying by $sL$:

$$
s^2LC\hat V = D'V\hat D - D'^2\hat V - sLI\hat D - \frac{sL}{R}\hat V .
$$

Collecting, $\hat V\left(s^2LC + \frac{sL}{R} + D'^2\right) = \hat D\left(D'V - sL\frac{V}{D'R}\right)$, so

$$
G_{vd} = \frac{D'V\left(1 - \dfrac{sL}{D'^2R}\right)}{D'^2\left(1 + \dfrac{sL}{D'^2R} + \dfrac{s^2LC}{D'^2}\right)} ,
$$

which is [[#eq-boost-gvd]]. The zero of the numerator is at $s = +D'^2R/L$, in the right half-plane.
:::

The RHP zero has a clear physical origin. A boost converter delivers energy to the output only during the off-time $d'T_s$. If the controller increases $d$ to raise the output, the *immediate* effect is to shorten the off-time, so less current reaches the output and the voltage first *falls*; only as the inductor current builds up over many periods does the output rise. A zero in the right half-plane gives a step response that starts in the wrong direction and contributes phase *lag* (up to $-90^\circ$) while its magnitude rises, the worst combination for a feedback loop. Because the zero moves to lower frequencies as $D'$ falls and $R$ falls, it is worst at low input voltage and full load. The practical consequence is a hard limit: the crossover frequency of a voltage loop around a boost (or buck–boost, or flyback) converter must stay well below $\omega_z$, typically below a fifth of it.

::: widget plot
f: 20*log10(12/(1 - d)^2*sqrt(1 + (10^x/((1 - d)^2*76394))^2)/sqrt((1 - (10^x/((1 - d)*2250.8))^2)^2 + (10^x/((1 - d)^2*33.94*2250.8))^2)); -atan(10^x/((1 - d)^2*76394))*180/pi - atan2(10^x/((1 - d)^2*33.94*2250.8), 1 - (10^x/((1 - d)*2250.8))^2)*180/pi
x: 1, 5.5
y: -280, 80
sliders: d=0.5:0:0.75:0.01
hlines: 0; -180
labels: 20\log_{10}\lvert G_{vd}\rvert\ (\mathrm{dB}); \angle G_{vd}\ (\text{degrees})
caption: Bode plot of the control-to-output transfer function of a boost converter from $12\,\mathrm{V}$ with $L = 50\,\mathrm{\mu H}$, $C = 100\,\mathrm{\mu F}$ and $R = 24\,\Omega$, against $\log_{10}f$ (Hz), with the duty cycle $d$ on the slider. At $d = 0.5$ the LC resonance is at $1.1\,\mathrm{kHz}$ (with a tall peak, since this ideal model has no losses) and the RHP zero at $19\,\mathrm{kHz}$; beyond the resonance the phase falls to $-180^\circ$, and the RHP zero then drags it on towards $-270^\circ$ while the magnitude levels off instead of falling. Raise $d$ — a lower input voltage for the same output — and watch the DC gain $V/D'$ rise while both the resonance and the RHP zero move down, the zero fastest (as $D'^2$).
:::

::: example Where is the RHP zero? {#ex-rhpz}
The boost converter of the figure runs at $D = 0.5$ ($12\,\mathrm{V}$ to $24\,\mathrm{V}$, $1\,\mathrm{A}$). Find $f_0$, $Q$ and $f_z$, and the largest sensible voltage-loop crossover frequency. What happens to $f_z$ if the input sags to $8\,\mathrm{V}$ with the same output and load?
::: solution
$D' = 0.5$. $f_0 = D'/(2\pi\sqrt{LC}) = 0.5/(2\pi\sqrt{5\times10^{-9}}) = 1.13\,\mathrm{kHz}$; $Q = D'R\sqrt{C/L} = 0.5\times24\times\sqrt2 = 17$ (very high, because this model has no resistance; real converters have $Q$ of $2$–$5$); $f_z = D'^2R/(2\pi L) = 0.25\times24/(2\pi\times5\times10^{-5}) = 19.1\,\mathrm{kHz}$. With crossover below about $f_z/5$, the loop bandwidth is limited to about $4\,\mathrm{kHz}$ — although the converter switches at, say, $200\,\mathrm{kHz}$.

At $8\,\mathrm{V}$ in, $D' = 1/3$ and $f_z = (1/9)\times24/(2\pi\times5\times10^{-5}) = 8.5\,\mathrm{kHz}$: the zero has fallen by more than half, so the loop must be designed at the minimum input voltage and maximum load. This is why boost PFC stages, whose effective duty cycle sweeps over the whole mains cycle, use voltage loops of only $10$–$20\,\mathrm{Hz}$ bandwidth, inside which a fast current loop does the real work.
:::
:::

## Voltage-mode control

In **voltage-mode control** the output voltage is sensed through a divider of gain $H$, compared with a reference, and the error is processed by a compensator $G_c(s)$ whose output $v_c$ is compared with a sawtooth ramp of amplitude $V_M$ to set the duty cycle.

::: definition PWM modulator gain and loop gain {#def-loop-gain}
A pulse-width modulator comparing a control voltage $v_c$ with a sawtooth ramp of peak-to-peak amplitude $V_M$ produces $d = v_c/V_M$, a **modulator gain** $\hat d/\hat v_c = 1/V_M$. The **loop gain** of a voltage-mode converter is

$$
T(s) = G_c(s)\,\frac1{V_M}\,G_{vd}(s)\,H ,
$$ {#eq-loop-gain}

and the closed loop attenuates line and load disturbances by $1/(1 + T)$: the closed-loop line-to-output transfer function is $G_{vg}/(1 + T)$ and the closed-loop output impedance is $Z_{out}/(1 + T)$, where $Z_{out}$ is the open-loop output impedance.
:::

The design aims are those of any feedback loop: a large loop gain at low frequencies (an integrator, for zero steady-state error), a crossover frequency $f_c$ as high as practical (typically $f_s/10$ to $f_s/5$ for a buck, and below the RHP zero for a boost), and a phase margin of $45^\circ$–$60^\circ$ ([[control-systems/frequency-response-methods#def-margins]]). For the buck converter the difficulty is the double pole: above $f_0$ the plant's phase approaches $-180^\circ$, so a compensator crossing over above $f_0$ must supply phase lead. The standard answer is a **PID-type** (often called Type III) compensator:

$$
G_c(s) = G_{cm}\left(1 + \frac{\omega_L}{s}\right)\frac{1 + s/\omega_z}{1 + s/\omega_p} ,
$$ {#eq-pid-comp}

an integral term with corner $\omega_L$ well below crossover, and a lead term with its zero below and pole above crossover, at the geometric means that maximise the lead at $f_c$ ([[control-systems/compensator-design#thm-max-lead]]).

::: algorithm Voltage-mode compensator design {#alg-vm-design}
1. Compute the uncompensated loop gain $T_u = G_{vd}H/V_M$ and choose the crossover $f_c$.
2. Evaluate $\angle T_u(j2\pi f_c)$; the lead needed is $\theta = \mathrm{PM} - 180^\circ - \angle T_u$, plus the few degrees the integral term will cost ($\arctan(f_L/f_c)$).
3. Place the lead zero and pole at $f_z = f_c\sqrt{(1 - \sin\theta)/(1 + \sin\theta)}$ and $f_p = f_c\sqrt{(1 + \sin\theta)/(1 - \sin\theta)}$.
4. Place the integral corner $f_L$ about a decade below $f_c$.
5. Choose $G_{cm}$ so that $\lvert T(j2\pi f_c)\rvert = 1$.
6. Check the loop gain over all operating points (light load raises $Q$; input voltage changes the gain) and simulate a load step.
:::

::: example A voltage-mode loop for the 3.3 V buck {#ex-vm-buck}
Design a voltage-mode compensator for the buck converter of [[power-electronics/dc-dc-converters#ex-buck-design]]: $V_g = 12\,\mathrm{V}$, $V = 3.3\,\mathrm{V}$, $L = 3.3\,\mathrm{\mu H}$, $C = 66\,\mathrm{\mu F}$ (ceramic, ESR negligible), full load $R = 0.66\,\Omega$, $f_s = 500\,\mathrm{kHz}$. The reference is $0.8\,\mathrm{V}$ ($H = 0.8/3.3$) and the ramp $V_M = 1\,\mathrm{V}$. Aim for $f_c = 50\,\mathrm{kHz}$ and a phase margin of $52^\circ$.
::: solution
The plant: $f_0 = 1/(2\pi\sqrt{LC}) = 10.8\,\mathrm{kHz}$ and $Q = R\sqrt{C/L} = 2.95$. At $50\,\mathrm{kHz}$, [[#eq-buck-gvd]] gives $\lvert G_{vd}\rvert = 0.584$, so $\lvert T_u\rvert = 0.584\times0.2424 = 0.142$ ($-17\,\mathrm{dB}$) and $\angle T_u = -175.6^\circ$.

Step 2: the lead needed is $52 - 180 + 175.6 = 47.6^\circ$; adding $\arctan(0.1) = 5.7^\circ$ for an integral corner at $f_c/10$ gives $\theta = 53.3^\circ$. Step 3: $\sqrt{(1 - \sin\theta)/(1 + \sin\theta)} = 0.331$, so $f_z = 16.6\,\mathrm{kHz}$ and $f_p = 151\,\mathrm{kHz}$. Step 4: $f_L = 5\,\mathrm{kHz}$. Step 5: at $f_c$ the integral factor has magnitude $1.005$ and the lead factor $\sqrt{f_p/f_z} = 3.02$, so $G_{cm} = 1/(0.142\times1.005\times3.02) = 2.33$ ($7.3\,\mathrm{dB}$).

A numerical check of the complete loop gain confirms a single crossover at $50.0\,\mathrm{kHz}$ with a phase margin of $52.0^\circ$. The closed-loop output impedance peaks at $61\,\mathrm{m\Omega}$ near $38\,\mathrm{kHz}$, against $0.66\,\Omega$ open loop; a simulated load step of $2.5\,\mathrm{A}$ on the averaged model dips the output by $94\,\mathrm{mV}$ ($2.8\,\%$), and it recovers to within $10\,\%$ of that deviation in about $47\,\mathrm{\mu s}$. The compensator is realised with one op-amp (the error amplifier), three capacitors and three resistors.
:::
:::

::: warning Averaged models stop at half the switching frequency
A loop gain computed from an averaged model can be made to cross over at any frequency on paper. The real converter cannot: the modulator samples the control voltage once per period, which adds delay and makes the model meaningless near $f_s/2$, and any switching ripple fed back through the compensator modulates the duty cycle. Keep $f_c$ below about $f_s/5$, make sure the compensator's high-frequency pole attenuates the ripple at $f_s$, and remember that a digital controller adds a further delay of one to two sampling periods ([[control-systems/digital-control]]).
:::

## Current-mode control

Voltage-mode control treats the inductor current as an internal state it does not see. **Current-mode control** adds an inner loop around it. In **peak current-mode control**, the most common form, the switch is turned on by a clock at the start of each period and turned off when the sensed inductor (switch) current reaches a control level $i_c$ set by the outer voltage compensator. The inner loop acts within a single switching period — it is as fast as a loop can be — and it makes the inductor behave, from the outer loop's point of view, almost like a current source.

The benefits are substantial: the double pole of the LC filter splits into one low-frequency pole set by the output capacitor and load and one high-frequency pole that the outer loop can usually ignore, so a simple PI (Type II) compensator suffices; the input-voltage feedforward is inherent, since a change in $v_g$ changes the current slope and is corrected within the same period; every period's peak current is limited, which gives free overcurrent protection; and parallel converters share current naturally. The price is a stability problem of the inner loop itself.

::: theorem Subharmonic instability of peak current control {#thm-subharmonic}
In a converter under peak current-mode control with inductor-current slopes $m_1$ (rising, switch on) and $-m_2$ (falling, switch off), and an artificial compensating ramp of slope $-m_a$ subtracted from the control level, a small perturbation $\hat i_n$ of the inductor current at the start of period $n$ propagates as

$$
\hat i_{n+1} = \alpha\,\hat i_n,\qquad \alpha = -\frac{m_2 - m_a}{m_1 + m_a} .
$$ {#eq-alpha}

The current loop is stable if and only if $\lvert\alpha\rvert < 1$. Without compensation ($m_a = 0$) this requires $m_2 < m_1$, which for the buck, boost and buck–boost converters means $D < 0.5$. The choice $m_a \ge m_2/2$ guarantees stability at every duty cycle, and $m_a = m_2$ gives $\alpha = 0$, the **deadbeat** response.
:::

::: proof
In steady state the current rises at $m_1$ from $I_0$ until it meets the falling control level $i_c - m_at$ at $t = DT_s$, so $I_0 + m_1DT_s = i_c - m_aDT_s$, and then falls at $m_2$ until the end of the period. Perturb the starting current by $\hat i_n$, and let the turn-off instant become $DT_s - \delta$. The perturbed current meets the control level when $I_0 + \hat i_n + m_1(DT_s - \delta) = i_c - m_a(DT_s - \delta)$; subtracting the nominal equation gives $\hat i_n - m_1\delta = m_a\delta$, so $\delta = \hat i_n/(m_1 + m_a)$. Because the control level is falling, turning off $\delta$ earlier means turning off at a current higher than nominal by $m_a\delta$. The current then falls at $m_2$ for a time longer than nominal by $\delta$, so at the end of the period it differs from nominal by $m_a\delta - m_2\delta = -\dfrac{m_2 - m_a}{m_1 + m_a}\hat i_n$, which is [[#eq-alpha]]. A geometric sequence $\alpha^n$ decays iff $\lvert\alpha\rvert < 1$. With $m_a = 0$: $m_2/m_1 < 1$. For the buck, $m_1 = (V_g - V)/L$ and $m_2 = V/L$, so $m_2/m_1 = D/D'$, less than $1$ iff $D < 0.5$; the boost and buck–boost give the same ratio $D/D'$ from volt-second balance ($m_1D = m_2D'$ for every converter in CCM). With $m_a = m_2/2$: $\lvert\alpha\rvert = (m_2/2)/(m_1 + m_2/2) < 1$ for all positive $m_1$. With $m_a = m_2$, $\alpha = 0$.
:::

::: widget plot
f: (-(v/(1 - v) - c)/(1 + c))^floor(x); 0
x: 0, 12
y: -3, 3
sliders: v=0.4:0.05:0.8:0.01; c=0:0:1.5:0.05
labels: \hat i_n/\hat i_0; \text{zero}
caption: The inductor-current perturbation of a peak-current-controlled converter at the start of each switching period $n$ (horizontal axis, in periods), relative to its initial value. The duty cycle $D$ is the slider $v$, and $c = m_a/m_1$ is the compensating ramp relative to the rising slope. With $c = 0$ and $D < 0.5$ the perturbation alternates in sign and decays; above $D = 0.5$ it alternates and *grows* — the current settles into a pattern repeating every two periods, the classic subharmonic oscillation. Add ramp: at $c$ equal to half of $m_2/m_1 = D/(1 - D)$ the decay is guaranteed at any $D$, and at $c = D/(1 - D)$ the perturbation vanishes in one period.
:::

Even below $D = 0.5$, a current loop with little ramp has a lightly damped pair of poles at half the switching frequency, which shows up as peaking in the control-to-output response. Ridley's model represents this as a double pole at $f_s/2$ with $Q = 1/[\pi(m_c D' - 0.5)]$, where $m_c = 1 + m_a/m_1$; ramp near $m_a \approx m_2$ makes $Q \approx 0.6$, a good compromise between damping and the loss of current-mode behaviour that too much ramp causes (with an enormous ramp the converter reverts to voltage mode).

::: example Slope compensation for a boost converter {#ex-slope-comp}
A peak-current-mode boost converter steps $12\,\mathrm{V}$ to $36\,\mathrm{V}$ with $L = 22\,\mathrm{\mu H}$ at $200\,\mathrm{kHz}$; the switch current is sensed with a $50\,\mathrm{m\Omega}$ resistor. Is compensation needed? Choose the ramp for $m_a = m_2/2$ and give it as a voltage per switching period at the current-sense comparator. What is $\alpha$?
::: solution
$D = 1 - 12/36 = 0.667 > 0.5$: without compensation the current loop is unstable. The slopes: $m_1 = V_g/L = 12/22\,\mathrm{\mu H} = 0.545\,\mathrm{A/\mu s}$, $m_2 = (V - V_g)/L = 24/22\,\mathrm{\mu H} = 1.09\,\mathrm{A/\mu s}$ (ratio $2 = D/D'$, as expected). Choose $m_a = m_2/2 = 0.545\,\mathrm{A/\mu s}$. Through the sense resistor this is $0.545\times0.05 = 27.3\,\mathrm{mV/\mu s}$, i.e. a ramp of $27.3\times5 = 136\,\mathrm{mV}$ over each $5\,\mathrm{\mu s}$ period. Then $\alpha = -(1.09 - 0.545)/(0.545 + 0.545) = -0.5$: each perturbation is halved and reversed each period. For deadbeat behaviour at this operating point, $m_a = m_2$ gives $\alpha = 0$ but more ramp than needed at lower duty cycles.
:::
:::

With the inner loop closed and adequately compensated, the outer voltage loop sees, to a first approximation, a current source $\hat i_c$ feeding the output capacitor and load. For the buck converter the control-to-output transfer function becomes

$$
\frac{\hat v}{\hat i_c} \approx \frac{R}{1 + sRC} ,
$$

a single pole at $1/(2\pi RC)$ (plus the ESR zero), and a PI compensator with a high-frequency pole — a **Type II** network — gives a well-behaved loop with crossover at a tenth of $f_s$ or so. For the boost converter the same simplification yields $\frac{\hat v}{\hat i_c} \approx \frac{RD'}{2}\cdot\frac{1 - s/\omega_z}{1 + sRC/2}$: current-mode control removes the double pole, but the RHP zero remains, because it is a property of the power stage's energy flow and no control law can remove it.

::: example The outer loop of a current-mode buck {#ex-cm-buck}
The $3.3\,\mathrm{V}$ buck of [[#ex-vm-buck]] is converted to peak current-mode control with adequate slope compensation, so that the outer loop sees $\hat v/\hat i_c \approx R/(1 + sRC)$. The voltage compensator produces the current command directly (in amperes per volt of error), $G_c(s) = K(1 + \omega_z/s)/(1 + s/\omega_p)$. Place $\omega_z$ to cancel the load pole and $\omega_p$ at $250\,\mathrm{kHz}$, and find $K$ for a $50\,\mathrm{kHz}$ crossover at full load. What is the phase margin, and what changes at light load?
::: solution
The load pole is at $1/(2\pi RC) = 1/(2\pi\times0.66\times66\times10^{-6}) = 3.65\,\mathrm{kHz}$; put the compensator zero there. Then $(1 + \omega_z/s)\cdot R/(1 + sRC) = R\omega_z/s = 1/(sC)$, and the loop gain is

$$
T(s) = \frac{KH}{sC}\cdot\frac1{1 + s/\omega_p} .
$$

At $50\,\mathrm{kHz}$: $\lvert T\rvert = 1$ requires $K = 2\pi f_cC\sqrt{1 + (f_c/f_p)^2}/H = 2\pi\times5\times10^4\times66\times10^{-6}\times1.020/0.2424 = 87.2\,\mathrm{A/V}$. The phase is $-90^\circ - \arctan(50/250) = -101.3^\circ$, a phase margin of $78.7^\circ$ before the half-switching-frequency poles of the current loop (Ridley's model) take a few degrees more.

At light load $R$ rises and the load pole moves down, so the cancellation is no longer exact; but the loop gain above the pole is $KH/(sC)$ regardless of $R$, so the crossover and margin hardly change. Compare the voltage-mode design, which needed a lead network tuned to an LC resonance whose $Q$ varies with load: the inner current loop has turned a second-order plant into a first-order one.
:::
:::

::: quiz
A designer moves a boost converter from voltage-mode to peak current-mode control, hoping to push the voltage-loop crossover above the RHP zero. Will it work?
- [ ] Yes: the inner current loop removes the RHP zero.
- [ ] Yes, provided slope compensation of $m_a = m_2$ is used.
- [x] No: current-mode control simplifies the double pole to a single pole, but the RHP zero is still in the control-to-output transfer function and still limits the crossover.
- [ ] No, because current-mode control cannot be used above $D = 0.5$.
::: solution
The RHP zero comes from the fact that energy reaches the boost output only during the off-time; raising the current command shortens that interval before the larger current arrives. That is true whatever controls the switch, so the zero appears in $\hat v/\hat i_c$ as well. Current mode works above $D = 0.5$ with slope compensation, and is widely used in boost converters for its other benefits.
:::
:::

::: application Average current control in power-factor correction
A boost PFC stage must draw a current proportional to the rectified mains voltage. It uses **average current-mode control**: an inner loop with a PI compensator regulates the *average* inductor current (not the peak) to a reference $i^\ast = k\,v_g(t)\,v_{c}$, the product of the rectified input voltage waveform and the output of a slow outer voltage loop. The current loop crosses over at $5$–$20\,\mathrm{kHz}$, fast enough to follow a $100\,\mathrm{Hz}$ rectified sine. The voltage loop is deliberately slowed to $10$–$20\,\mathrm{Hz}$ so that it ignores the $100\,\mathrm{Hz}$ ripple on the bulk capacitor; otherwise that ripple would modulate the current reference and distort the input current. The structure is the cascade of [[control-systems/pid-control#def-cascade]].
:::

::: history
The averaged and small-signal models of switching converters were systematised at Caltech, where R. D. Middlebrook and Slobodan Ćuk presented state-space averaging at the 1976 Power Electronics Specialists Conference; their group also developed the extra-element theorem and input-filter design rules. Cecil Deisch described current-programmed (peak current-mode) control in 1978, and integrated current-mode controllers made it ubiquitous during the 1980s. Dean Venable's K-factor method (1983) gave designers a simple compensator recipe, and Raymond Ridley's sampled-data model of current-mode control (1991) explained the half-switching-frequency poles and the role of the compensating ramp. Digital control of converters has become common since the 2000s.
:::

## Where this leads

The same averaged models describe the inverter legs of [[power-electronics/inverters]], whose current loops are designed exactly as the inner loops here, with the PI controllers and synchronous-frame transformations of motor drives and grid-tied converters developed in [[power-electronics/power-electronics-applications]]. Digital implementation — sampling, computational delay, discretised compensators — follows [[control-systems/digital-control]]. Input filters, required for electromagnetic compatibility, interact with converter control through the converter's negative incremental input resistance, a topic covered in Erickson and Maksimović's text.

::: summary
- Averaging over a switching period replaces the switching circuit by a continuous model ([[#thm-ssa]]), valid well below $f_s/2$; the boost and buck–boost averaged models are nonlinear.
- Linearising about the operating point gives the buck's $G_{vd} = V_g/(1 + sL/R + s^2LC)$: a double pole at $1/\sqrt{LC}$ with $Q = R\sqrt{C/L}$.
- The boost's $G_{vd}$ has poles at $D'/\sqrt{LC}$ and a right-half-plane zero at $D'^2R/L$, worst at low input and full load, which limits the loop crossover.
- Voltage-mode loop gain is $T = G_cG_{vd}H/V_M$; a PID-type compensator with integral action and lead at crossover is standard for the buck.
- Peak current-mode control adds a fast inner loop that turns the LC double pole into a single pole and limits current, but is unstable for $D > 0.5$ without slope compensation; $m_a \ge m_2/2$ guarantees stability.
- The closed loop divides line and load disturbances by $1 + T$; crossover is kept below about $f_s/5$, and below a fifth of the RHP zero where one exists.
:::

## Exercises

::: exercise DC gain of the control-to-output response {level=1 check="24/2"}
A buck converter runs from $24\,\mathrm{V}$ with a PWM ramp of $V_M = 2\,\mathrm{V}$. What is the DC gain from control voltage $v_c$ to output voltage, in volts per volt?
::: solution
$\hat v/\hat v_c = G_{vd}(0)/V_M = V_g/V_M = 24/2 = 12$.
:::
:::

::: exercise Buck resonance {level=1 check="1/(2*pi*sqrt(10e-6*100e-6))"}
A buck converter has $L = 10\,\mathrm{\mu H}$ and $C = 100\,\mathrm{\mu F}$ and a load of $1\,\Omega$. Find the frequency of its control-to-output double pole in hertz, and its $Q$.
::: solution
$f_0 = 1/(2\pi\sqrt{LC}) = 1/(2\pi\times3.162\times10^{-5}) = 5.03\,\mathrm{kHz}$; $Q = R\sqrt{C/L} = 1\times\sqrt{10} = 3.16$, a peak of $10\,\mathrm{dB}$.
:::
:::

::: exercise A boost RHP zero {level=1 check="0.16*10/(2*pi*20e-6)"}
A boost converter runs at $D = 0.6$ with $L = 20\,\mathrm{\mu H}$ and a $10\,\Omega$ load. Find the frequency of its right-half-plane zero in hertz.
::: solution
$f_z = D'^2R/(2\pi L) = 0.16\times10/(2\pi\times2\times10^{-5}) = 12.7\,\mathrm{kHz}$.
:::
:::

::: exercise Minimum slope compensation {level=2 check="(7-3)/(2*4.7e-6)"}
A peak-current-mode buck converter from $10\,\mathrm{V}$ to $7\,\mathrm{V}$ uses $L = 4.7\,\mathrm{\mu H}$. Find the smallest compensating ramp slope $m_a$ (in amperes per second, referred to the inductor current) for which the current loop is stable at this operating point.
::: solution
$m_1 = (10 - 7)/L = 0.638\,\mathrm{A/\mu s}$, $m_2 = 7/L = 1.489\,\mathrm{A/\mu s}$. Stability requires $(m_2 - m_a)/(m_1 + m_a) < 1$, i.e. $m_a > (m_2 - m_1)/2 = (7 - 3)/(2\times4.7\times10^{-6}) = 4.26\times10^5\,\mathrm{A/s}$ ($0.426\,\mathrm{A/\mu s}$). The general-purpose choice $m_a = m_2/2 = 0.745\,\mathrm{A/\mu s}$ gives margin.
:::
:::

::: exercise Lead placement {level=2 check="20e3*sqrt((1-sin(50*pi/180))/(1+sin(50*pi/180)))"}
A compensator must provide $50^\circ$ of lead at a crossover of $20\,\mathrm{kHz}$. Where should the lead zero and pole be placed (in hertz)?
::: solution
$f_z = f_c\sqrt{(1 - \sin50^\circ)/(1 + \sin50^\circ)} = 20\times0.364 = 7.28\,\mathrm{kHz}$ and $f_p = 20/0.364 = 55.0\,\mathrm{kHz}$; the ratio $f_p/f_z = 7.55$.
:::
:::

::: exercise Audio susceptibility {level=2}
For the buck converter of [[#ex-vm-buck]] at $10\,\mathrm{kHz}$ — near its resonance — compare the open-loop and closed-loop transmission of an input ripple from $v_g$ to $v$, given that the loop gain there is $\lvert T\rvert = 25.7$ ($28\,\mathrm{dB}$). Express the results in dB.
::: solution
$G_{vg} = D/(1 + sL/R + s^2LC)$. At $10\,\mathrm{kHz}$, $s^2LC = -(10/10.78)^2 = -0.860$ and $sL/R = j2\pi\times10^4\times3.3\times10^{-6}/0.66 = j0.314$, so $\lvert1 + sL/R + s^2LC\rvert = \lvert0.140 + j0.314\rvert = 0.344$ and $\lvert G_{vg}\rvert = 0.275/0.344 = 0.80$ ($-1.9\,\mathrm{dB}$): open loop, an input ripple passes nearly unattenuated near resonance. Closed loop it is divided by $\lvert1 + T\rvert$; computing with the complex loop gain of the design, $\lvert1 + T\rvert = 26.1$, the transmission falls to $0.031$ ($-30\,\mathrm{dB}$), an improvement of $28\,\mathrm{dB}$ — essentially the loop gain itself, as expected where $\lvert T\rvert \gg 1$.
:::
:::

::: exercise Averaged boost model {level=2}
Starting from [[#eq-boost-avg]], find the steady state, and derive the small-signal transfer function from duty cycle to inductor current, $G_{id}(s) = \hat i/\hat d$. Show that it has a left-half-plane zero at $\omega = 2/(RC)$.
::: solution
Steady state: $V = V_g/D'$, $I = V/(D'R)$. Linearised: $sL\hat I = -D'\hat V + V\hat D$ and $sC\hat V = D'\hat I - I\hat D - \hat V/R$. From the second, $\hat V = (D'\hat I - I\hat D)/(sC + 1/R)$. Substituting, $\hat I\left[sL + \frac{D'^2}{sC + 1/R}\right] = \hat D\left[V + \frac{D'I}{sC + 1/R}\right]$. Multiply by $(sC + 1/R)$: $\hat I[s^2LC + sL/R + D'^2] = \hat D[V(sC + 1/R) + D'I]$. With $D'I = V/R$: numerator $V(sC + 2/R)$. So $G_{id} = \dfrac{2V}{D'^2R}\cdot\dfrac{1 + sRC/2}{1 + sL/(D'^2R) + s^2LC/D'^2}$, with a left-half-plane zero at $\omega = 2/(RC)$. Because the current's response has no RHP zero, an inner current loop is easy to design — the motivation for current-mode control of boost converters.
:::
:::

::: exercise The buck–boost converter's small-signal model {level=3}
Derive the control-to-output transfer function of the inverting buck–boost converter, whose averaged equations (with $i$ the inductor current and $v < 0$ the output) are $L\,\dd i/\dd t = dv_g + d'v$ and $C\,\dd v/\dd t = -d'i - v/R$. Show that

$$
G_{vd}(s) = -\frac{V_g}{D'^2}\cdot\frac{1 - s\dfrac{DL}{D'^2R}}{1 + s\dfrac{L}{D'^2R} + s^2\dfrac{LC}{D'^2}} ,
$$

and locate its RHP zero.
::: hint
The steady state is $V = -DV_g/D'$ and $I = -V/(D'R)$. Perturb with $d' = D' - \hat d$.
:::
::: solution
Linearised with $\hat v_g = 0$: $sL\hat I = V_g\hat D + D'\hat V - V\hat D = (V_g - V)\hat D + D'\hat V$, and $sC\hat V = -D'\hat I + I\hat D - \hat V/R$. From the first, $\hat I = [(V_g - V)\hat D + D'\hat V]/(sL)$. Substituting and multiplying by $sL$: $\hat V(s^2LC + sL/R + D'^2) = \hat D[sLI - D'(V_g - V)]$. Now $V_g - V = V_g(1 + D/D') = V_g/D'$ and $I = DV_g/(D'^2R)$, so the numerator is $-V_g + sLDV_g/(D'^2R) = -V_g(1 - sDL/(D'^2R))$. Dividing numerator and denominator by $D'^2$ gives the result. The RHP zero is at $\omega_z = D'^2R/(DL)$ — lower than the boost's by the factor $D$, for the same physical reason.
:::
:::

::: exercise Delay in a digital loop {level=3 check="360*1.5*10/100"}
A digitally controlled converter switching at $100\,\mathrm{kHz}$ samples once per period; the computation and the PWM update together delay the duty cycle by $1.5$ switching periods. How much phase (in degrees) does this delay subtract at a crossover of $10\,\mathrm{kHz}$? If the analog design had $55^\circ$ of phase margin, what remains, and what crossover would keep the delay's cost to $20^\circ$?
::: solution
A delay $t_d$ subtracts $360^\circ f t_d$: $t_d = 15\,\mathrm{\mu s}$, so at $10\,\mathrm{kHz}$ the cost is $360\times10^4\times1.5\times10^{-5} = 54^\circ$, leaving a phase margin of just $1^\circ$ — a loop on the edge of instability. To limit the cost to $20^\circ$: $f_c = 20/(360\times1.5\times10^{-5}) = 3.7\,\mathrm{kHz}$. Alternatively, reduce the delay (sample in the middle of the on-time, update the PWM in the same period, or sample twice per period), which is how high-performance digital controllers reach $f_s/10$.
:::
:::
