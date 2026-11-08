An **inverter** turns DC into AC. In a variable-speed motor drive it takes the DC bus produced by a rectifier and synthesises three-phase voltages of whatever amplitude and frequency the motor needs, from a fraction of a hertz to several hundred. In a solar installation it turns the panels' DC into a current synchronised with the grid. In an electric car it drives the traction motor from a $400$ or $800\,\mathrm{V}$ battery, and runs in reverse during regenerative braking. In an uninterruptible power supply it recreates the mains from a battery when the grid fails. Most of the electrical energy used by industrial motors now passes through an inverter, and an increasing share of the energy generated passes through one on its way to the grid.

The building block is the **half-bridge leg** of [[power-electronics/power-switches]] — two switches in series across the DC bus — which is a synchronous buck converter whose duty cycle we are free to vary. Vary the duty cycle sinusoidally, slowly compared with the switching frequency, and the leg's average output voltage is a sinusoid: this is **pulse-width modulation** (PWM). This chapter develops single-phase and three-phase voltage-source inverters, sinusoidal PWM, third-harmonic injection, space-vector modulation, and the practical effects of dead time and output filtering. It relies on the averaging ideas of [[power-electronics/dc-dc-converters]] and on the three-phase circuits of [[circuits-2/three-phase-circuits]].

## The inverter leg

Consider a leg connected across a DC bus of voltage $V_{dc}$, with the bus split by two equal capacitors into a fictitious midpoint $0$. The leg output $a$ is connected either to the positive rail (upper switch on) or to the negative rail (lower switch on); the two switches are always driven complementarily, apart from a short dead time. Each switch is a transistor with an anti-parallel diode, so the leg is current-bidirectional and can carry the load current in either direction whatever the switch state.

::: definition Switching function and leg voltage {#def-switching-function}
The **switching function** $s_a(t)$ of a leg is $1$ when the upper switch is on and $0$ when the lower switch is on. The leg's voltage relative to the bus midpoint is $v_{a0} = (s_a - \frac12)V_{dc}$, which takes the values $\pm V_{dc}/2$. If $s_a$ has duty cycle $d_a$ over a switching period, the **local average** of the leg voltage over that period is

$$
\langle v_{a0}\rangle = \left(d_a - \tfrac12\right)V_{dc} .
$$ {#eq-leg-average}
:::

If $d_a$ is varied as $d_a(t) = \frac12[1 + m_a\sin(\omega_1t)]$, slowly compared with the switching frequency, the local average is a sinusoid, $\langle v_{a0}\rangle = m_a\frac{V_{dc}}{2}\sin\omega_1t$. The inductance of the load (a motor winding, or a filter inductor) responds mainly to this average, while the switching-frequency components produce a small ripple current.

### Sinusoidal PWM

The simplest way to produce the duty cycle is to compare a sinusoidal **reference** (or **modulating**) signal with a triangular **carrier** at the switching frequency $f_s$: the upper switch is on whenever the reference exceeds the carrier.

::: definition Modulation indices {#def-mod-index}
In carrier-based PWM with a triangular carrier of peak $\hat v_{tri}$ and frequency $f_s$, and a sinusoidal reference of peak $\hat v_{ref}$ and frequency $f_1$, the **amplitude modulation index** is $m_a = \hat v_{ref}/\hat v_{tri}$ and the **frequency modulation ratio** is $m_f = f_s/f_1$.
:::

::: theorem Fundamental output of sinusoidal PWM {#thm-spwm}
For $m_a \le 1$ (**linear modulation**) and $m_f \gg 1$, the leg voltage $v_{a0}$ produced by sine–triangle comparison has a fundamental component of amplitude

$$
\hat V_{a0,1} = m_a\frac{V_{dc}}{2},
$$ {#eq-spwm}

and its harmonics are clustered in sidebands around $m_f$, $2m_f$, $3m_f$, …, i.e. around multiples of the switching frequency. For $m_a > 1$ (**overmodulation**) the fundamental grows less than proportionally, reaching at most $\frac4\pi\frac{V_{dc}}{2}$ in **square-wave** operation, and low-order harmonics appear.
:::

::: proof
Over one carrier period the triangle sweeps linearly from $-\hat v_{tri}$ to $\hat v_{tri}$ and back; if the reference is constant at $v_{ref}$ during that period, the fraction of time it exceeds the carrier is $d = \frac12(1 + v_{ref}/\hat v_{tri})$. With $v_{ref} = \hat v_{ref}\sin\omega_1t$ and $m_f$ large, the reference is almost constant over each carrier period, so $d(t) = \frac12(1 + m_a\sin\omega_1t)$, and by [[#eq-leg-average]] the local average is $m_a\frac{V_{dc}}2\sin\omega_1t$. The difference between $v_{a0}$ and its local average is a train of pulses that repeats, apart from slow modulation, at the carrier period, so its spectrum lies near multiples of $f_s$; an exact double-Fourier-series analysis (Holmes and Lipo, chapter 3) gives the sideband amplitudes as Bessel functions of $m_a$ and confirms that, for $m_a \le 1$, the fundamental is exactly $m_aV_{dc}/2$ and no low-order harmonics are present. When $m_a > 1$ the reference exceeds the carrier peak for part of the cycle, the leg stays at one rail and the duty cycle saturates; in the limit the output is a square wave of amplitude $V_{dc}/2$ whose fundamental is $\frac4\pi\frac{V_{dc}}{2}$ by [[power-electronics/rectifiers#eq-square-series]].
:::

::: widget plot
f: m*sin(x); 2/pi*asin(sin(k*x)); if(m*sin(x) > 2/pi*asin(sin(k*x)), 1, -1)*0.15 - 1.4
x: 0, 2*pi
y: -1.7, 1.3
sliders: m=0.8:0:1.3:0.01; k=15:3:45:2
piticks: true
labels: \text{reference }m_a\sin\theta; \text{carrier}; \text{leg output (offset)}
caption: Sine–triangle PWM over one fundamental cycle, with $m = m_a$ and the carrier ratio $k = m_f$ on the sliders; the leg output, at the bottom, switches between $+V_{dc}/2$ and $-V_{dc}/2$ (drawn shrunk and offset). Watch the pulses widen where the reference is high and narrow where it is low: their local average follows the reference. Raise $m$ above $1$ and the reference escapes the carrier near its peaks — pulses are dropped, the output sticks to a rail, and low-order distortion appears. Raise $k$ and the pulses get finer, pushing the harmonics to higher frequencies where the load's inductance filters them better.
:::

The carrier ratio $m_f$ is chosen as large as switching losses allow. In drives $f_s$ is typically $2$–$20\,\mathrm{kHz}$ (above the audible range where possible); in grid inverters, $10$–$50\,\mathrm{kHz}$ with silicon IGBTs and higher with SiC. An odd integer $m_f$ synchronised with the reference keeps the waveform's half-wave symmetry (no even harmonics), which matters when $m_f$ is small; for $m_f \gtrsim 21$ asynchronous carriers are normal.

## Single-phase inverters

A single-phase **full-bridge** (H-bridge) inverter has two legs, $a$ and $b$, with the load between them, so $v_o = v_{a0} - v_{b0}$, which can take the values $+V_{dc}$, $0$ and $-V_{dc}$. Two PWM strategies are common.

- **Bipolar PWM**: leg $b$ is the complement of leg $a$ ($d_b = 1 - d_a$). Then $v_o = \pm V_{dc}$ only, with fundamental amplitude $m_aV_{dc}$ and harmonics around $f_s$.
- **Unipolar PWM**: leg $a$ is modulated by $+m_a\sin\omega_1t$ and leg $b$ by $-m_a\sin\omega_1t$, both against the same carrier. The fundamental is again $m_aV_{dc}$ (each leg contributes $m_aV_{dc}/2$, in antiphase), but the output switches between $0$ and $\pm V_{dc}$, and the harmonics at $f_s$ cancel between the legs: the first significant harmonics are near $2f_s$.

::: example Sizing a grid inverter's filter inductor {#ex-grid-inductor}
A single-phase inverter supplies $230\,\mathrm{V}$ RMS to the grid from a $400\,\mathrm{V}$ DC bus at $20\,\mathrm{kHz}$, through an inductor $L$. (a) What modulation index is required? (b) Find the inductance that limits the peak-to-peak ripple current to $2\,\mathrm{A}$ with bipolar and with unipolar PWM.
::: solution
(a) The grid peak is $230\sqrt2 = 325\,\mathrm{V}$, and the full bridge gives $\hat V_1 = m_aV_{dc}$, so $m_a = 325/400 = 0.81$ (slightly more in practice, to drive current through $L$).

(b) Over one switching period the grid voltage $v$ is nearly constant. With **bipolar** PWM the bridge output alternates between $+V_{dc}$ and $-V_{dc}$ with duty cycle $d = \frac12(1 + v/V_{dc})$; during the $+V_{dc}$ interval the inductor current rises by $\Delta i = (V_{dc} - v)dT_s/L$. Substituting $d$, $\Delta i = (V_{dc}^2 - v^2)T_s/(2V_{dc}L)$, which is greatest at $v = 0$: $\Delta i_{max} = V_{dc}/(2f_sL)$. For $2\,\mathrm{A}$: $L = 400/(2\times2\times10^4\times2) = 5\,\mathrm{mH}$.

With **unipolar** PWM the output switches between $0$ and $V_{dc}$ (for $v > 0$) at twice the switching frequency, with duty cycle $v/V_{dc}$ over each half-period $T_s/2$: $\Delta i = (V_{dc} - v)(v/V_{dc})(T_s/2)/L$, greatest at $v = V_{dc}/2$: $\Delta i_{max} = V_{dc}/(8f_sL)$. For $2\,\mathrm{A}$: $L = 400/(8\times2\times10^4\times2) = 1.25\,\mathrm{mH}$ — a quarter of the bipolar value, because the voltage step is halved and the ripple frequency doubled. The smaller, cheaper inductor is why unipolar PWM (or a related three-level scheme) is the norm in single-phase grid inverters.
:::
:::

## Three-phase voltage-source inverters

The three-phase **voltage-source inverter** (VSI) has three legs, $a$, $b$, $c$, one per phase, and six switches. The load — a motor or a grid filter — is usually star-connected with an isolated neutral $n$. Each leg is modulated by its own reference, displaced by $120^\circ$:

$$
d_k(t) = \tfrac12\left[1 + m_a\sin\left(\omega_1t - \tfrac{2\pi}{3}k\right)\right],\quad k = 0, 1, 2 .
$$

The line-to-line voltage is the difference of two leg voltages, $v_{ab} = v_{a0} - v_{b0}$, and its fundamental is the difference of two sinusoids of amplitude $m_aV_{dc}/2$ separated by $120^\circ$, i.e. $\sqrt3$ times larger:

$$
\hat V_{LL,1} = \frac{\sqrt3}{2}m_aV_{dc},\qquad V_{LL,1,rms} = \frac{\sqrt3}{2\sqrt2}m_aV_{dc} = 0.612\,m_aV_{dc}\quad(m_a \le 1).
$$ {#eq-three-phase-spwm}

A key property of the three-phase inverter is that **common-mode** components — anything added equally to all three leg voltages — do not appear in the line-to-line voltages, nor in the phase voltages of a load with an isolated neutral, because they simply shift the neutral point. The load phase voltage is

$$
v_{an} = v_{a0} - v_{n0},\qquad v_{n0} = \tfrac13(v_{a0} + v_{b0} + v_{c0}),
$$

and only the differential part of the leg voltages reaches the load. This freedom is used to increase the output.

::: theorem Third-harmonic injection {#thm-thi}
Adding a common-mode third harmonic to each reference, $d_k(t) = \frac12\left[1 + m_a\left(\sin\theta_k + \frac16\sin3\theta_k\right)\right]$ with $\theta_k = \omega_1t - 2\pi k/3$, leaves the line and load phase voltages purely sinusoidal and lowers the peak of each reference by the factor $\sqrt3/2$. Linear modulation therefore extends to $m_a = 2/\sqrt3 = 1.155$, and the maximum fundamental line-to-line RMS voltage rises from $0.612V_{dc}$ to

$$
V_{LL,1,rms,max} = \frac{V_{dc}}{\sqrt2} = 0.707\,V_{dc} .
$$
:::

::: proof
The three third harmonics $\sin3\theta_k = \sin(3\omega_1t - 2\pi k)$ are identical, so the term is common mode and cancels in every line-to-line voltage and in $v_{an}$. The reference $g(\theta) = \sin\theta + \frac16\sin3\theta$ has $g'(\theta) = \cos\theta + \frac12\cos3\theta$. Using $\cos3\theta = 4\cos^3\theta - 3\cos\theta$, $g' = 2\cos^3\theta - \frac12\cos\theta = \cos\theta\,(2\cos^2\theta - \frac12)$, which vanishes at $\cos^2\theta = \frac14$, i.e. $\theta = 60^\circ$, where $g = \sin60^\circ + \frac16\sin180^\circ = \sqrt3/2$. (At $\theta = 90^\circ$, $g = 1 - \frac16 = \frac56 < \sqrt3/2$, a local minimum.) So the peak of the reference is $m_a\sqrt3/2$, which stays within the carrier for $m_a \le 2/\sqrt3$. Substituting into [[#eq-three-phase-spwm]], $0.612\times1.155 = 0.707$, i.e. $V_{dc}/\sqrt2$. That $\frac16$ is the coefficient that minimises the peak is shown in the exercises.
:::

::: widget plot
f: m*sin(x); m*(sin(x) + sin(3*x)/6); m*(sin(x) - sin(x - 2*pi/3))/sqrt(3)
x: 0, 2*pi
y: -1.4, 1.4
sliders: m=1:0:1.155:0.005
hlines: 1; -1
piticks: true
labels: \text{plain sinusoidal reference}; \text{with }\tfrac16\text{ third harmonic}; v_{ab}\text{ fundamental}/\sqrt3
caption: Phase references of a three-phase inverter, normalised to the carrier peak (the lines at $\pm1$), with the amplitude modulation index $m = m_a$ on the slider. The plain sinusoid (blue) leaves the carrier range as soon as $m > 1$. The flat-topped reference with one-sixth third harmonic (orange) has peaks at $\pm\frac{\sqrt3}{2}m$, at $60^\circ$ and $120^\circ$, so it stays inside the carrier up to $m = 1.155$. The line-to-line fundamental (green, divided by $\sqrt3$) is the same sinusoid either way: the third harmonic is common mode and never reaches the load.
:::

At the extreme, **six-step** (square-wave) operation runs each leg at $50\,\%$ duty cycle for half the fundamental period and gives $V_{LL,1,rms} = \frac{\sqrt6}{\pi}V_{dc} = 0.780V_{dc}$, the largest fundamental any VSI can produce, at the cost of harmonics of order $6k \pm 1$ — the mirror image of the six-pulse rectifier's line current in [[power-electronics/rectifiers]].

::: example Can the drive reach the motor's rated voltage? {#ex-drive-voltage}
A $400\,\mathrm{V}$ (line-to-line RMS), $50\,\mathrm{Hz}$ induction motor is fed by an inverter whose DC bus comes from a six-pulse diode rectifier on the $400\,\mathrm{V}$ grid, giving $V_{dc} \approx 540\,\mathrm{V}$. Find the maximum fundamental line voltage with sinusoidal PWM, with third-harmonic injection, and in six-step operation.
::: solution
Sinusoidal PWM at $m_a = 1$: $0.612\times540 = 331\,\mathrm{V}$ — only $83\,\%$ of rated. Third-harmonic injection (or space-vector PWM, below): $540/\sqrt2 = 382\,\mathrm{V}$, $95\,\%$ of rated. Six-step: $0.780\times540 = 421\,\mathrm{V}$. Without injection the drive could not supply rated flux at rated speed; with it the motor reaches rated voltage only with some overmodulation, and in practice drives either accept about $5\,\%$ less voltage (and slightly more current for the same torque) near base speed or move into overmodulation smoothly towards six-step. This is why every industrial drive uses third-harmonic injection or space-vector modulation.
:::
:::

## Space-vector modulation

The three leg switching functions $(s_a, s_b, s_c)$ give the inverter $2^3 = 8$ states. Two of them, $(0,0,0)$ and $(1,1,1)$, connect all three phases to the same rail and give zero line voltages: the **zero vectors**. The other six are **active**. Space-vector modulation describes each state by a single complex number and chooses, in each switching period, a combination of states whose average equals the desired output.

::: definition Space vector {#def-space-vector}
The **space vector** of three phase quantities $x_a, x_b, x_c$ is

$$
\vec x = \frac23\left(x_a + a\,x_b + a^2x_c\right),\qquad a = e^{j2\pi/3}.
$$

For a balanced sinusoidal set $x_k = \hat X\cos(\omega t - 2\pi k/3)$ it is $\vec x = \hat Xe^{j\omega t}$: a vector of constant length equal to the phase amplitude, rotating at $\omega$. Common-mode components ($x_a = x_b = x_c$) have zero space vector, since $1 + a + a^2 = 0$.
:::

Applying the definition to the leg voltages $v_{k0} = (s_k - \frac12)V_{dc}$, the six active states give vectors of length $\frac23V_{dc}$ at angles $0^\circ, 60^\circ, \ldots, 300^\circ$ — the corners of a hexagon — and the two zero states give the origin. For example, state $(1,0,0)$ gives $\frac23V_{dc}(\frac12 - \frac12a - \frac12a^2) = \frac23V_{dc}\cdot\frac12(1 - (a + a^2)) = \frac23V_{dc}$.

::: theorem Dwell times of space-vector modulation {#thm-svm}
Let the reference vector $\vec v^\ast = V^\ast e^{j\theta}$ lie in the first sector, $0 \le \theta < 60^\circ$, between the active vectors $\vec V_1 = \frac23V_{dc}$ and $\vec V_2 = \frac23V_{dc}e^{j60^\circ}$. Applying $\vec V_1$ for $T_1$, $\vec V_2$ for $T_2$ and a zero vector for $T_0 = T_s - T_1 - T_2$ gives an average equal to $\vec v^\ast$ when

$$
T_1 = \frac{\sqrt3\,V^\ast}{V_{dc}}T_s\sin(60^\circ - \theta),\qquad T_2 = \frac{\sqrt3\,V^\ast}{V_{dc}}T_s\sin\theta .
$$ {#eq-svm}

The largest reference that can be synthesised at every angle — the circle inscribed in the hexagon — has $V^\ast_{max} = V_{dc}/\sqrt3$, i.e. a line-to-line RMS voltage of $V_{dc}/\sqrt2$, the same limit as third-harmonic injection.
:::

::: proof
We need $T_1\vec V_1 + T_2\vec V_2 = T_s\vec v^\ast$. Writing $\vec V_1 = \frac23V_{dc}$, $\vec V_2 = \frac23V_{dc}(\frac12 + j\frac{\sqrt3}{2})$ and equating real and imaginary parts:

$$
\frac23V_{dc}\left(T_1 + \frac12T_2\right) = T_sV^\ast\cos\theta,\qquad \frac23V_{dc}\cdot\frac{\sqrt3}{2}T_2 = T_sV^\ast\sin\theta .
$$

The second gives $T_2 = \sqrt3V^\ast T_s\sin\theta/V_{dc}$. The first gives $T_1 = \frac{3V^\ast T_s}{2V_{dc}}\cos\theta - \frac12T_2 = \frac{\sqrt3V^\ast T_s}{V_{dc}}\left(\frac{\sqrt3}{2}\cos\theta - \frac12\sin\theta\right) = \frac{\sqrt3V^\ast T_s}{V_{dc}}\sin(60^\circ - \theta)$. The constraint $T_1 + T_2 \le T_s$ is hardest at $\theta = 30^\circ$, where $T_1 + T_2 = \frac{\sqrt3V^\ast T_s}{V_{dc}}\cdot2\sin30^\circ = \sqrt3V^\ast T_s/V_{dc}$; it holds for all $\theta$ iff $V^\ast \le V_{dc}/\sqrt3$. A phase amplitude of $V_{dc}/\sqrt3$ is a line-to-line amplitude of $V_{dc}$ and an RMS of $V_{dc}/\sqrt2$.
:::

In the usual **symmetric** sequence the zero time is split equally between $(0,0,0)$ and $(1,1,1)$ and the period is arranged as $0\,1\,2\,7\,7\,2\,1\,0$, so that each transition changes only one leg. The resulting leg duty cycles turn out to be the sinusoidal references plus a triangular common-mode signal — closely related to third-harmonic injection, and essentially identical in performance. The value of the space-vector view lies elsewhere: it is the natural language of field-oriented motor control ([[power-electronics/power-electronics-applications]]), where the controller computes a voltage vector directly, and it makes **discontinuous PWM** (using only one zero vector in each sector, so that one leg does not switch for $120^\circ$ of the cycle, cutting switching loss by about a third) easy to describe.

::: example Dwell times {#ex-svm}
An inverter on a $600\,\mathrm{V}$ bus switching at $10\,\mathrm{kHz}$ must produce a phase-voltage space vector of magnitude $300\,\mathrm{V}$ at $\theta = 20^\circ$. Find the dwell times. Is the reference within the linear range?
::: solution
$T_s = 100\,\mathrm{\mu s}$ and $\sqrt3V^\ast/V_{dc} = \sqrt3\times300/600 = 0.866$. By [[#eq-svm]], $T_1 = 0.866\times100\times\sin40^\circ = 55.7\,\mathrm{\mu s}$ and $T_2 = 0.866\times100\times\sin20^\circ = 29.6\,\mathrm{\mu s}$, so $T_0 = 14.7\,\mathrm{\mu s}$, split as $7.4\,\mathrm{\mu s}$ in each zero state. The linear limit is $600/\sqrt3 = 346\,\mathrm{V}$, so $300\,\mathrm{V}$ is inside it; it corresponds to a line-to-line RMS of $300\sqrt3/\sqrt2 = 367\,\mathrm{V}$.
:::
:::

::: quiz
A three-phase inverter's three leg voltages all contain the same component $v_{cm}(t)$. What happens to it?
- [ ] It appears in each motor phase voltage.
- [ ] It doubles the line-to-line voltage.
- [x] It cancels in the line-to-line voltages and, with an isolated neutral, in the phase voltages too: it appears only as the voltage of the motor's neutral point relative to the DC bus.
- [ ] It is short-circuited by the DC-bus capacitors.
::: solution
$v_{ab} = v_{a0} - v_{b0}$ removes any common term, and $v_{an} = v_{a0} - \frac13(v_{a0} + v_{b0} + v_{c0})$ removes it as well. It is not harmless, though: the common-mode voltage drives currents through the motor's stray capacitance to its frame and bearings, a well-known cause of bearing damage and electromagnetic interference in PWM drives.
:::
:::

## Non-idealities: dead time, ripple and filters

### Dead time

Each leg needs a dead time $t_d$ at every transition ([[power-electronics/power-switches]]). During it both switches are off and the load current flows through a diode, so the leg voltage is decided by the current's direction: if the current flows out of the leg ($i > 0$), the lower diode conducts and the leg sits at the negative rail; if it flows in, the upper diode conducts. A dead time inserted before every turn-on thus loses, for positive current, a slice $t_d$ of each positive pulse, and gains one for negative current.

::: proposition Dead-time voltage error {#prop-dead-time}
With dead time $t_d$ at switching frequency $f_s$, the local average leg voltage differs from its commanded value by

$$
\Delta v = -\operatorname{sign}(i)\,V_{dc}\,t_df_s ,
$$

so for a sinusoidal load current the error is a square wave of amplitude $V_{dc}t_df_s$ in phase with the current, which reduces the fundamental and adds low-order harmonics ($5$th, $7$th, …).
:::

::: proof
In each switching period there is one rising and one falling transition. Suppose $i > 0$. At the falling transition (upper switch off, lower on) the current immediately commutates to the lower diode, so the leg falls at the commanded instant: no error. At the rising transition the upper switch's turn-on is delayed by $t_d$, during which the lower diode still conducts and the leg stays low: the positive pulse is shortened by $t_d$. The average over the period is therefore lower by $V_{dc}t_d/T_s = V_{dc}t_df_s$. For $i < 0$ the mirror argument lengthens the pulse by $t_d$. The error depends only on $\operatorname{sign}(i)$, a square wave in phase with the current, whose Fourier series contains the fundamental and odd harmonics.
:::

::: example Dead time at low speed {#ex-dead-time}
A drive on a $600\,\mathrm{V}$ bus switches its IGBTs at $10\,\mathrm{kHz}$ with a dead time of $2\,\mathrm{\mu s}$. It runs a $400\,\mathrm{V}$, $50\,\mathrm{Hz}$ motor with constant volts per hertz. Find the dead-time error, and compare its fundamental with the commanded phase voltage at $50\,\mathrm{Hz}$ and at $5\,\mathrm{Hz}$. What should the drive do?
::: solution
By [[#prop-dead-time]] the error is a square wave of amplitude $V_{dc}t_df_s = 600\times2\times10^{-6}\times10^4 = 12\,\mathrm{V}$, in phase with the current. Its fundamental has peak $\frac4\pi\times12 = 15.3\,\mathrm{V}$.

At $50\,\mathrm{Hz}$ the phase-voltage peak is $400\sqrt2/\sqrt3 = 327\,\mathrm{V}$, so the error is under $5\,\%$ — noticeable but tolerable. At $5\,\mathrm{Hz}$ the commanded peak is a tenth of that, $32.7\,\mathrm{V}$, and the error's fundamental is nearly half of it; worse, the motor's resistive drop is relatively large at low frequency, so flux and torque fall, and the square-wave error's $5$th and $7$th harmonics distort the current and cause torque ripple at six times the stator frequency. The drive should add the compensation $+\operatorname{sign}(i)\times12\,\mathrm{V}$ to its voltage command (with a smooth transition through the current's zero crossings), and use a shorter dead time if the devices allow.
:::
:::

::: warning Phase voltage, line voltage, peak and RMS
Inverter formulas mix four voltages. For sinusoidal PWM, the leg-to-midpoint fundamental *peak* is $m_aV_{dc}/2$; the load phase-voltage fundamental peak is the same (with an isolated neutral); the line-to-line peak is $\sqrt3$ times larger; and the line-to-line RMS is $\sqrt3/(2\sqrt2) = 0.612$ times $m_aV_{dc}$. Motor nameplates give line-to-line RMS; space vectors have the length of the phase peak. Before comparing a computed voltage with a requirement, check that both are the same kind.
:::

### Output filters and multilevel inverters

A motor's leakage inductance filters the PWM ripple well enough on its own, although long cables cause voltage reflections that double the switching edges at the motor terminals ([[electromagnetics/transmission-lines]]). A grid-connected inverter must meet strict limits on the harmonic currents it injects (typically each harmonic below a fraction of a percent of rated current), so it uses an **LCL filter**: an inverter-side inductor, a shunt capacitor and a grid-side inductor, giving $-60\,\mathrm{dB/dec}$ attenuation above its resonance. The resonance must be damped, passively with a resistor or actively in the control.

Another way to reduce the ripple is to give the inverter more voltage levels. A **three-level neutral-point-clamped** (NPC) inverter connects each phase to the positive rail, the midpoint or the negative rail, halving the voltage step and the switch stress; it is standard in $1500\,\mathrm{V}$ solar inverters and medium-voltage drives. The **modular multilevel converter** (MMC) stacks hundreds of half-bridge submodules, each with its own capacitor, and builds a nearly sinusoidal staircase; it is the converter of modern voltage-source HVDC links. A **current-source inverter**, fed from a DC inductor instead of a capacitor, switches a constant current between phases; it survives in some very large drives.

::: application Inverters in a solar plant
A residential PV string inverter typically has a boost stage that tracks the panels' maximum-power point and raises their $200$–$600\,\mathrm{V}$ to a stable DC link, followed by a full-bridge or three-level inverter switching at $16$–$50\,\mathrm{kHz}$ with an LCL filter. The inverter is current-controlled: it injects a current in phase with the grid voltage, synchronised by a phase-locked loop, and grid codes require it to ride through voltage dips and to supply or absorb reactive power on command. Utility-scale plants use central inverters of several megawatts on $1500\,\mathrm{V}$ DC buses, almost always three-level. [[power-electronics/power-electronics-applications]] returns to these systems.
:::

::: history
Early inverters used thyristors with auxiliary commutation circuits, since a thyristor cannot be turned off from its gate. In 1964 Arnold Schönung and Herbert Stemmler of Brown Boveri described sinusoidal (subharmonic) PWM for variable-frequency drives, and the transistor and later IGBT made forced commutation simple, so that by the late 1980s PWM voltage-source inverters dominated AC drives. Akira Nabae, Isao Takahashi and Hirofumi Akagi introduced the neutral-point-clamped inverter in 1981. Space-vector modulation was analysed by Heinz Willi van der Broeck, Hans-Christoph Skudelny and Georg Stanke in 1988, building on earlier work on "voltage vector" control in Japan and Germany. Rainer Marquardt and Anton Lesnicar presented the modular multilevel converter in 2003.
:::

## Where this leads

The PWM inverter leg is controlled in a current loop in almost every application; the averaged models and loop design of [[power-electronics/converter-control]] apply to it directly, and the cascade structure of [[control-systems/pid-control]] is how drives are built. The inverter's role in induction and synchronous motor drives, PV and wind converters, EV traction and the grid is developed in [[power-electronics/power-electronics-applications]], with the machine models of [[electric-machines/induction-machines]] and [[electric-machines/synchronous-machines]].

::: summary
- A half-bridge leg with duty cycle $d$ produces a local-average voltage $(d - \frac12)V_{dc}$; modulating $d$ sinusoidally synthesises AC.
- Sine–triangle PWM gives a fundamental $m_aV_{dc}/2$ per leg for $m_a \le 1$, with harmonics near multiples of the switching frequency; overmodulation tends to square wave ($\frac4\pi\frac{V_{dc}}2$).
- A full bridge with unipolar PWM doubles the effective ripple frequency and quarters the filter inductance compared with bipolar PWM.
- A three-phase VSI gives $V_{LL,rms} = 0.612m_aV_{dc}$ with sinusoidal PWM; common-mode signals do not reach the load, so a $\frac16$ third harmonic extends the linear range to $V_{dc}/\sqrt2$ (six-step: $0.78V_{dc}$).
- Space-vector modulation synthesises the reference from the two adjacent active vectors and a zero vector, with dwell times proportional to $\sin(60^\circ - \theta)$ and $\sin\theta$; its linear limit equals third-harmonic injection's.
- Dead time causes an error $V_{dc}t_df_s$ opposing the current; filters (L, LCL) and multilevel topologies reduce output ripple.
:::

## Exercises

::: exercise Modulation index of a single-phase bridge {level=1 check="120*sqrt(2)/200"}
A full-bridge inverter on a $200\,\mathrm{V}$ bus must produce $120\,\mathrm{V}$ RMS at its fundamental. Find the modulation index.
::: solution
$m_a = \hat V_1/V_{dc} = 120\sqrt2/200 = 0.849$.
:::
:::

::: exercise Three-phase line voltage {level=1 check="0.612*0.9*700"}
A three-phase inverter on a $700\,\mathrm{V}$ bus uses sinusoidal PWM at $m_a = 0.9$. Find the fundamental line-to-line RMS voltage in volts.
::: solution
$V_{LL} = \frac{\sqrt3}{2\sqrt2}m_aV_{dc} = 0.6124\times0.9\times700 = 385.8\,\mathrm{V}$. (The check uses $0.612$.)
:::
:::

::: exercise Six-step voltage {level=1 check="sqrt(6)/pi*48"}
A $48\,\mathrm{V}$ e-bike motor drive runs in six-step mode at top speed. What fundamental line-to-line RMS voltage does it apply?
::: solution
$V_{LL} = (\sqrt6/\pi)V_{dc} = 0.7797\times48 = 37.4\,\mathrm{V}$.
:::
:::

::: exercise Dead-time error {level=2 check="800*1.5e-6*16e3"}
An $800\,\mathrm{V}$ SiC traction inverter switches at $16\,\mathrm{kHz}$ with a dead time of $1.5\,\mathrm{\mu s}$ (conservative for SiC). Find the dead-time voltage error in volts, and compare it with a silicon IGBT design at $8\,\mathrm{kHz}$ with $3\,\mathrm{\mu s}$.
::: solution
$\Delta v = V_{dc}t_df_s = 800\times1.5\times10^{-6}\times1.6\times10^4 = 19.2\,\mathrm{V}$. The IGBT design gives the same $800\times3\times10^{-6}\times8\times10^3 = 19.2\,\mathrm{V}$; SiC's benefit appears when its faster switching allows a shorter dead time ($200$–$500\,\mathrm{ns}$ is typical), cutting the error to $3$–$6\,\mathrm{V}$.
:::
:::

::: exercise Space-vector dwell times in another sector {level=2 check="sqrt(3)*200/540*125e-6*sin(pi/6)"}
An inverter on a $540\,\mathrm{V}$ bus with $f_s = 8\,\mathrm{kHz}$ must produce a reference of $200\,\mathrm{V}$ at $\theta = 90^\circ$. Find the sector, and the dwell times (in seconds) of the two adjacent active vectors.
::: solution
$90^\circ$ lies in the second sector, between $60^\circ$ and $120^\circ$; within it the angle is $\theta' = 30^\circ$. With $T_s = 125\,\mathrm{\mu s}$ and $\sqrt3V^\ast/V_{dc} = 0.6415$: $T_1 = 0.6415\times125\times\sin30^\circ = 40.1\,\mathrm{\mu s}$ and $T_2 = 40.1\,\mathrm{\mu s}$ too (the reference is midway between the two vectors), leaving $T_0 = 44.8\,\mathrm{\mu s}$.
:::
:::

::: exercise The line voltage of a single leg pair {level=2}
Show from the definition of the space vector that the six active states of a three-phase inverter give vectors of length $\frac23V_{dc}$, and that the line-to-line voltage of state $(1,0,0)$ is $v_{ab} = V_{dc}$, $v_{bc} = 0$, $v_{ca} = -V_{dc}$. What are the phase voltages of a star load in that state?
::: solution
For $(1,0,0)$: $v_{a0} = V_{dc}/2$, $v_{b0} = v_{c0} = -V_{dc}/2$. Then $\vec v = \frac23\cdot\frac{V_{dc}}{2}(1 - a - a^2) = \frac{V_{dc}}{3}(1 - (a + a^2)) = \frac{V_{dc}}{3}\cdot2 = \frac23V_{dc}$, since $a + a^2 = -1$. The other active states are rotations by multiples of $60^\circ$ (permuting the phases multiplies by $a$; complementing all switches negates the vector). Line voltages: $v_{ab} = V_{dc}/2 - (-V_{dc}/2) = V_{dc}$, $v_{bc} = 0$, $v_{ca} = -V_{dc}$. With $v_{n0} = \frac13(\frac12 - \frac12 - \frac12)V_{dc} = -V_{dc}/6$, the phase voltages are $v_{an} = \frac23V_{dc}$, $v_{bn} = v_{cn} = -\frac13V_{dc}$.
:::
:::

::: exercise Ripple in a three-phase leg {level=2 check="600/(4*10e3*3e-3)"}
A three-phase grid inverter on a $600\,\mathrm{V}$ bus switches at $10\,\mathrm{kHz}$ with $3\,\mathrm{mH}$ per phase. Treat each leg as a half-bridge feeding an inductor whose other end is at a voltage $v$ relative to the bus midpoint that is constant over a switching period (that is, ignore the movement of the neutral within a period). Show that the peak-to-peak ripple current is greatest at $v = 0$, where it equals $V_{dc}/(4f_sL)$, and evaluate it in amperes.
::: solution
The leg alternates between $\pm V_{dc}/2$ with duty cycle $d = \frac12 + v/V_{dc}$. During the high interval the inductor sees $V_{dc}/2 - v$ for $dT_s$, so $\Delta i = (V_{dc}/2 - v)(\frac12 + v/V_{dc})T_s/L = \dfrac{(V_{dc}^2/4 - v^2)T_s}{V_{dc}L}$, greatest at $v = 0$: $\Delta i_{max} = V_{dc}/(4f_sL) = 600/(4\times10^4\times3\times10^{-3}) = 5\,\mathrm{A}$. In a real three-phase system the neutral moves within the period and the ripple is somewhat smaller, so this estimate is conservative.
:::
:::

::: exercise Optimum third harmonic {level=3}
Consider references $g(\theta) = \sin\theta + k\sin3\theta$ with $0 \le k \le \frac13$. (a) Find the stationary points of $g$ on $0 < \theta < \pi$. (b) Show that the peak of $g$ is minimised at $k = \frac16$, with value $\sqrt3/2$. (c) What limit on $m_a$ follows?
::: hint
$g'(\theta) = \cos\theta + 3k\cos3\theta = \cos\theta\,(1 - 9k + 12k\cos^2\theta)$.
:::
::: solution
(a) With $\cos3\theta = 4\cos^3\theta - 3\cos\theta$, $g' = \cos\theta(1 - 9k + 12k\cos^2\theta)$. Stationary points are $\theta = 90^\circ$, where $g = 1 - k$, and, if $k \ge \frac19$, the pair of angles with $\cos^2\theta = (9k - 1)/(12k)$.

(b) For $k < \frac19$ the only maximum is at $90^\circ$, with peak $1 - k > \frac89$. For $k \ge \frac19$, at the off-axis points $\sin^2\theta = (3k + 1)/(12k)$, and since $\sin3\theta = 3\sin\theta - 4\sin^3\theta$,

$$
g = \sin\theta\,(1 + 3k - 4k\sin^2\theta) = \frac{2(3k + 1)}{3}\sqrt{\frac{3k + 1}{12k}} = h(k),
$$

which exceeds $1 - k$ (they are equal at $k = \frac19$, where both are $\frac89$), so it is the peak. Then $\frac{\dd}{\dd k}\ln h = \frac{9/2}{3k + 1} - \frac1{2k}$, which vanishes at $9k = 3k + 1$, i.e. $k = \frac16$, and is negative below and positive above: $h$ is minimised there, with $h(\frac16) = \frac{2\times1.5}{3}\sqrt{\frac{1.5}{2}} = \frac{\sqrt3}{2}$, at $\cos^2\theta = \frac14$, $\theta = 60^\circ$.

(c) The reference stays within the carrier if $m_a\sqrt3/2 \le 1$, i.e. $m_a \le 2/\sqrt3 = 1.155$.
:::
:::

::: exercise Designing a three-phase drive's modulation {level=3}
A traction drive has an $800\,\mathrm{V}$ battery and a permanent-magnet motor that needs $520\,\mathrm{V}$ line-to-line RMS fundamental at its maximum speed. (a) Can it be supplied in the linear range with SVPWM? (b) What is the margin if the battery sags to $650\,\mathrm{V}$ at low state of charge? (c) Suggest what the control does when even six-step operation is insufficient.
::: solution
(a) The SVPWM linear limit is $V_{dc}/\sqrt2 = 566\,\mathrm{V}$ at $800\,\mathrm{V}$: yes, with a modulation margin of $520/566 = 92\,\%$. (b) At $650\,\mathrm{V}$ the limit is $460\,\mathrm{V}$ and six-step gives $0.78\times650 = 507\,\mathrm{V}$, both below $520\,\mathrm{V}$. (c) The controller enters **field weakening**: it injects a negative direct-axis current that opposes the magnets' flux and lowers the back-EMF, so the motor can run at the required speed with the available voltage, at reduced torque. Traction drives are designed to operate in field weakening over much of their speed range, and to accept reduced performance at low battery voltage.
:::
:::
