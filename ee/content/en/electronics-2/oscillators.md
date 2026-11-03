Every digital system marches to a clock, every radio needs a local oscillator to shift signals between frequencies, and every quartz watch counts the vibrations of a sliver of crystal ringing at $32\,768\,\mathrm{Hz}$. An **oscillator** produces a periodic signal from a DC supply, with no input at all. In [[electronics-2/stability-compensation]] we worked hard to stop feedback amplifiers from oscillating; here we do the opposite and design circuits that oscillate deliberately, at a frequency we choose, with an amplitude we control and a purity and stability we can predict.

There are two broad families. **Linear** (harmonic) oscillators are feedback loops — an amplifier and a frequency-selective network — that sustain a nearly sinusoidal signal at the one frequency where the loop gain is exactly $1$; their analysis rests on the **Barkhausen criterion**. We study RC oscillators (Wien bridge and phase shift) for audio frequencies, LC oscillators (Colpitts and Hartley) for radio frequencies, and crystal oscillators for precision. Every linear oscillator also needs a non-linearity to fix its amplitude, and we see how it is provided. **Relaxation** oscillators, by contrast, switch between two states as a capacitor charges and discharges; they produce square and triangular waves and include the op-amp astable and the 555 timer.

## The Barkhausen criterion

Consider a feedback loop with amplifier $A(s)$ and feedback network $\beta(s)$ in which the feedback is added to the input rather than subtracted. Then

$$
A_f(s) = \frac{A(s)}{1 - A(s)\beta(s)},
$$ {#eq-positive-feedback}

and the closed-loop poles are the roots of $1 - A(s)\beta(s) = 0$. (With the sign convention of [[electronics-2/feedback]] the same condition reads $1 + T = 0$ with $T = -A\beta$; only the bookkeeping differs.) A pair of poles on the $j\omega$ axis at $\pm j\omega_0$ gives a response $\cos(\omega_0t + \phi)$ that neither grows nor decays, needing no input to sustain it.

::: theorem Barkhausen criterion {#thm-barkhausen}
A linear feedback loop with loop gain $L(s) = A(s)\beta(s)$ (feedback added at the input) sustains a sinusoidal oscillation of frequency $\omega_0$ when

$$
L(j\omega_0) = A(j\omega_0)\beta(j\omega_0) = 1,
$$ {#eq-barkhausen}

that is, when $\abs{L(j\omega_0)} = 1$ and $\angle L(j\omega_0) = 0$ (or a multiple of $360^\circ$). The frequency of oscillation is set by the phase condition, and the magnitude condition fixes the gain the amplifier must provide.
:::

::: proof
Suppose a sinusoid $x(t) = \mathrm{Re}\{\mathbf Xe^{j\omega_0t}\}$ circulates in the loop with no external input. Passing once around the loop multiplies its phasor by $L(j\omega_0)$; for the signal to reproduce itself, $L(j\omega_0)\mathbf X = \mathbf X$ with $\mathbf X \ne 0$, which is [[#eq-barkhausen]]. Equivalently, $s = j\omega_0$ is a root of $1 - L(s) = 0$, so the closed-loop transfer function has a pole on the imaginary axis at $j\omega_0$ (and at $-j\omega_0$, since the coefficients are real).
:::

::: remark Barkhausen is a condition for steady state, not for start-up
The criterion describes a loop on the edge: exactly unit gain. A real oscillator must *start* from noise, so it is designed with $\abs{L} > 1$ at $\omega_0$ — typically $5$–$20\,\%$ more — which puts the poles slightly in the right half-plane, so that any disturbance grows. The growth is stopped by a non-linearity that reduces the effective gain as the amplitude rises, until the average loop gain is exactly $1$. The Barkhausen criterion is also necessary but not sufficient: a loop can meet it and yet be unstable at another frequency, or settle into a different mode.
:::

The **sharpness** of the phase response of $\beta$ near $\omega_0$ decides how stable the frequency is. If some disturbance adds a small phase error $\Delta\phi$ to the amplifier, the oscillation shifts to the frequency at which the network supplies $-\Delta\phi$; the steeper $\mathrm{d}\phi/\mathrm{d}\omega$, the smaller the shift. For a resonator of quality factor $Q$, $\mathrm{d}\phi/\mathrm{d}\omega = 2Q/\omega_0$ at resonance, so $\Delta\omega/\omega_0 = \Delta\phi/(2Q)$. This is why high-$Q$ LC tanks and, above all, crystals make stable oscillators, and why RC oscillators drift.

## RC oscillators

### The Wien-bridge oscillator

The **Wien network** is a series $RC$ branch from the amplifier output to a node $P$, and a parallel $RC$ branch from $P$ to ground. A non-inverting amplifier of gain $K = 1 + R_2/R_1$ takes its input from $P$.

::: theorem Wien-bridge oscillator {#thm-wien}
The Wien network with equal resistors $R$ and equal capacitors $C$ has transfer function

$$
\beta(s) = \frac{V_P}{V_o} = \frac{sRC}{s^2R^2C^2 + 3sRC + 1},
$$ {#eq-wien}

which is real and equal to $\tfrac13$ at $\omega_0 = 1/(RC)$. With a non-inverting amplifier of gain $K$, the closed-loop poles are the roots of $s^2R^2C^2 + (3 - K)sRC + 1 = 0$, so oscillation at $\omega_0 = 1/(RC)$ requires $K = 3$, that is $R_2 = 2R_1$.
:::

::: proof
The series branch has impedance $Z_s = R + 1/(sC) = (1 + sRC)/(sC)$ and the parallel branch $Z_p = R/(1 + sRC)$. The divider gives $\beta = Z_p/(Z_s + Z_p)$; multiplying numerator and denominator by $sC(1 + sRC)$,

$$
\beta = \frac{sRC}{(1 + sRC)^2 + sRC} = \frac{sRC}{s^2R^2C^2 + 3sRC + 1}.
$$

At $s = j/(RC)$ the denominator is $-1 + 3j + 1 = 3j$ and the numerator $j$, so $\beta = 1/3$ with zero phase. The loop condition $1 - K\beta = 0$ becomes $s^2R^2C^2 + 3sRC + 1 - KsRC = 0$. For $K < 3$ the poles have negative real parts and any oscillation dies away; for $K = 3$ they lie at $\pm j/(RC)$; for $K > 3$ they move into the right half-plane and the oscillation grows.
:::

The Wien network is a band-pass filter of $Q = 1/3$, a very flat phase characteristic: the frequency of a Wien-bridge oscillator is only as stable as $R$, $C$ and the amplifier's phase shift. Its strength is that $\omega_0$ can be tuned over a decade with a dual potentiometer or a dual variable capacitor while the gain condition stays $K = 3$.

::: example A 1 kHz Wien-bridge oscillator {#ex-wien}
Design a Wien-bridge oscillator for $1\,\mathrm{kHz}$ with $C = 10\,\mathrm{nF}$, and choose the gain resistors so that it starts reliably.
::: solution
$R = 1/(2\pi f_0C) = 1/(2\pi\times10^3\times10^{-8}) = 15.9\,\mathrm{k\Omega}$ (E96: $15.8\,\mathrm{k\Omega}$, giving $1.007\,\mathrm{kHz}$). For $K = 3$, $R_2 = 2R_1$; with $R_1 = 10\,\mathrm{k\Omega}$, $R_2 = 20\,\mathrm{k\Omega}$. To guarantee start-up, make the small-signal gain slightly higher, for example $R_2 = 22\,\mathrm{k\Omega}$ ($K = 3.2$), and provide amplitude control (next section) that reduces the gain to exactly $3$ at the desired amplitude. Without it the oscillation grows until the op-amp clips, and the output becomes a distorted, flat-topped sinusoid.
:::
:::

### The phase-shift oscillator

The **RC phase-shift oscillator** uses an inverting amplifier of gain $-K$ and a ladder of three $CR$ high-pass sections — series capacitor, shunt resistor, three times — from the amplifier output back to its input. The inverting amplifier supplies $180^\circ$; the ladder must supply the other $180^\circ$, which one section cannot ($90^\circ$ at most) but three can.

::: theorem Phase-shift oscillator {#thm-phase-shift}
The three-section $CR$ ladder, driven by a voltage source and unloaded at its output, has

$$
\beta(s) = \frac{(sRC)^3}{(sRC)^3 + 6(sRC)^2 + 5sRC + 1}.
$$ {#eq-ladder}

Its phase is $180^\circ$ at $\omega_0 = 1/(\sqrt6\,RC)$, where $\beta = -1/29$. The oscillator therefore runs at $f_0 = 1/(2\pi\sqrt6\,RC)$ and needs an inverting gain of at least $29$.
:::

::: proof
Nodal analysis of the ladder (nodes $a$, $b$, $c$, with $c$ the output) gives the stated function; it can be checked by multiplying out the chain of $ABCD$ matrices of [[circuits-2/two-port-networks]]. With $x = \omega RC$, the denominator at $s = j\omega$ is $(1 - 6x^2) + j(5x - x^3)$ and the numerator is $-jx^3$. The ratio is real when the real part of the denominator vanishes: $x^2 = 1/6$. Then the denominator is $jx(5 - 1/6) = jx\cdot29/6$, and $\beta = -jx^3/(jx\cdot29/6) = -6x^2/29 = -1/29$. The loop gain $(-K)\beta = K/29$ equals $1$ when $K = 29$.
:::

In the op-amp version the third shunt resistor is the input resistor $R$ of an inverting amplifier, whose virtual ground acts as ground, and the feedback resistor is $R_f \ge 29R$.

::: widget plot
f: 10^x/sqrt((1 - 10^(2*x))^2 + 9*10^(2*x)); 10^(3*x)/sqrt((1 - 6*10^(2*x))^2 + (5*10^x - 10^(3*x))^2)
x: -1.5, 1.5
y: 0, 0.4
vlines: 0; -0.389
hlines: 0.3333; 0.0345
labels: \lvert\beta\rvert \text{ Wien}; \lvert\beta\rvert \text{ three-section } CR \text{ ladder}
caption: Magnitude of the feedback factor against $x = \log_{10}(\omega RC)$. The Wien network peaks at $\tfrac13$ at $\omega RC = 1$, where its phase is zero; the ladder has $\abs{\beta} = 1/29$ at $\omega RC = 1/\sqrt6$ ($x = -0.389$), where its phase is $180^\circ$. Hover to compare: the Wien peak is broad, which is why its frequency depends on the amplifier's phase as well as on $R$ and $C$.
:::

::: quiz
In a Wien-bridge oscillator the amplifier gain is set to $K = 2.9$. What happens?
- [ ] It oscillates at a slightly lower frequency.
- [ ] It oscillates with a smaller amplitude.
- [x] It does not oscillate: any oscillation decays, because the poles are in the left half-plane.
- [ ] It oscillates at $\omega_0$ with a square-wave output.
::: solution
The characteristic polynomial is $s^2R^2C^2 + (3 - K)sRC + 1$; with $K = 2.9$ the middle coefficient is positive and the poles are a lightly damped pair with $Q = 1/(3 - K) = 10$. The circuit rings briefly after a disturbance and falls silent. Reliable start-up needs $K$ slightly *above* $3$ at small amplitudes.
:::
:::

## Amplitude stabilisation

A linear loop with $\abs{L} = 1$ exactly would oscillate at whatever amplitude it happened to start with, and any drift in gain would make it die or grow. Every practical oscillator therefore contains a **non-linearity** that makes the effective loop gain fall as the amplitude rises. The amplitude settles where the effective gain is exactly $1$.

- **Thermal gain control.** Hewlett's original Wien-bridge oscillator used a small incandescent lamp as $R_1$. Its filament resistance rises with the RMS current through it, which raises $R_1$ and lowers $K = 1 + R_2/R_1$. Because the filament's thermal time constant is long compared with the period, the gain changes with the *average* amplitude, not within each cycle, and the distortion is very low (below $0.01\,\%$ is achievable). A negative-temperature-coefficient thermistor in the $R_2$ position does the same job.
- **Diode limiting.** Two anti-parallel diodes, possibly with a series resistor, across part of $R_2$ conduct on the peaks and reduce the gain there. This is cheap and fast but distorts each peak, giving THD of about $1\,\%$.
- **Automatic gain control (AGC).** A peak or RMS detector measures the amplitude and adjusts a voltage-controlled resistance (a JFET in its ohmic region, or a multiplier) in the gain network. This gives a precise, adjustable amplitude and low distortion.

::: intuition The van der Pol oscillator
Replace the Wien-bridge amplifier's constant gain by one that falls with amplitude, $K(v) \approx K_0 - kv^2$. The characteristic equation $\tau^2\ddot v + (3 - K)\tau\dot v + v = 0$ becomes a damping term whose sign depends on the amplitude: negative (energy fed in) for small $v$, positive (energy removed) for large $v$. In normalised form this is the **van der Pol equation**, $\ddot x - \mu(1 - x^2)\dot x + x = 0$, where $\mu$ measures the excess gain. Every trajectory, from large or small amplitudes, spirals onto one closed orbit, a **limit cycle**: the oscillator "forgets" its initial conditions and settles at an amplitude set by the non-linearity.
:::

::: widget phaseplane
f: y
g: -x + mu*(1 - x^2)*y
x: -4, 4
y: -6, 6
sliders: mu=0.2:0.05:3:0.05
points: 0.1, 0; 3.5, 3
caption: The van der Pol oscillator $\ddot x - \mu(1 - x^2)\dot x + x = 0$ in the phase plane ($y = \dot x$). Trajectories started near the origin spiral out and those started far away spiral in; both reach the same limit cycle of amplitude about $2$. Click to add more starting points. With small $\mu$ (little excess gain) the cycle is nearly a circle — a clean sinusoid; raise $\mu$ towards $3$ and it distorts into the jerky shape of a relaxation oscillator.
:::

## LC oscillators

Above a megahertz or so, RC oscillators need impractically small components and fast amplifiers, and their poor frequency stability becomes unacceptable. An $LC$ tank, with $Q$ of $20$–$200$, is used instead. The two classic topologies differ in how they tap the tank to obtain the feedback: the **Colpitts** oscillator uses a capacitive divider, the **Hartley** an inductive one (a tapped coil).

::: theorem Colpitts oscillator {#thm-colpitts}
A common-source amplifier (transconductance $g_m$, with total resistance $R$ at its drain, including $r_o$ and the load) has a capacitor $C_2$ from drain to ground, an inductor $L$ from drain to gate, and a capacitor $C_1$ from gate to ground. Neglecting the transistor's internal capacitances and gate current, it oscillates at

$$
\omega_0 = \frac{1}{\sqrt{L\,\dfrac{C_1C_2}{C_1 + C_2}}},
$$ {#eq-colpitts}

the resonant frequency of $L$ with $C_1$ and $C_2$ in series, provided

$$
g_mR \ge \frac{C_1}{C_2}.
$$ {#eq-colpitts-gain}
:::

::: proof
Let $V_g$ be the gate voltage. The current through $L$ into $C_1$ is $sC_1V_g$, so the drain voltage is $V_d = V_g + sL\cdot sC_1V_g = V_g(1 + s^2LC_1)$. KCL at the drain, where the transistor sinks $g_mV_g$:

$$
g_mV_g + V_d\Bigl(\frac1R + sC_2\Bigr) + sC_1V_g = 0.
$$

Substituting $V_d$ and dividing by $V_g \ne 0$ gives the characteristic equation

$$
s^3LC_1C_2 + s^2\frac{LC_1}{R} + s(C_1 + C_2) + \Bigl(g_m + \frac1R\Bigr) = 0.
$$

At $s = j\omega$ the imaginary part, $-\omega^3LC_1C_2 + \omega(C_1 + C_2)$, vanishes at $\omega_0^2 = (C_1 + C_2)/(LC_1C_2)$, which is [[#eq-colpitts]]. The real part, $-\omega^2LC_1/R + g_m + 1/R$, vanishes when $g_mR = \omega_0^2LC_1 - 1 = (C_1 + C_2)/C_2 - 1 = C_1/C_2$. For start-up $g_mR$ must exceed this value.
:::

The capacitive divider $C_1$, $C_2$ returns the fraction $C_2/C_1$ of the drain voltage, inverted, to the gate, and the amplifier must make up the loss: hence $g_mR \ge C_1/C_2$. The **Hartley** oscillator is the dual, with capacitors and inductors exchanged: $\omega_0 = 1/\sqrt{(L_1 + L_2)C}$ for uncoupled inductors, with gain condition $g_mR \ge L_2/L_1$ in the corresponding labelling. In practice the transistor's capacitances add to $C_1$ and $C_2$, the tank's own loss resistance appears in $R$, and the bias network must not load the tank.

::: example Designing a Colpitts oscillator {#ex-colpitts}
A Colpitts oscillator uses $L = 10\,\mu\mathrm{H}$ and $C_1 = C_2 = 1\,\mathrm{nF}$. The drain resistance, including the tank loss and the load, is $R = 2\,\mathrm{k\Omega}$. Find the frequency of oscillation and the minimum $g_m$. If the MOSFET has $g_m/I_D = 10\,\mathrm{V^{-1}}$ and we want a start-up margin of $3$, what bias current is needed?
::: solution
The series capacitance is $C_1C_2/(C_1 + C_2) = 0.5\,\mathrm{nF}$, so

$$
f_0 = \frac{1}{2\pi\sqrt{10^{-5}\times5\times10^{-10}}} = 2.25\,\mathrm{MHz}.
$$

With $C_1 = C_2$, [[#eq-colpitts-gain]] requires $g_mR \ge 1$, that is $g_m \ge 0.5\,\mathrm{mS}$. A start-up margin of $3$ means $g_m = 1.5\,\mathrm{mS}$, so $I_D = 1.5\,\mathrm{mS}/10\,\mathrm{V^{-1}} = 150\,\mu\mathrm{A}$. As the amplitude grows, the transistor's large-signal transconductance averaged over a cycle falls (the device is driven towards cut-off on one half-cycle), until the effective $g_mR$ equals $1$: the transistor's own non-linearity stabilises the amplitude.
:::
:::

## Crystal oscillators

A quartz crystal is a thin plate of quartz with electrodes on its faces. Quartz is **piezoelectric**: an electric field deforms it and a deformation generates a field, so the plate's mechanical resonance appears electrically as an extraordinarily sharp electrical resonance. Near its resonance the crystal is modelled by the **Butterworth–Van Dyke** equivalent circuit: a **motional** series branch $L$, $C$, $R$ (representing the mass, compliance and loss of the vibrating plate) in parallel with the electrode capacitance $C_0$.

::: proposition Resonances of a quartz crystal {#prop-crystal}
Neglecting $R$, the crystal's impedance is

$$
Z(j\omega) = \frac{1}{j\omega C_0}\cdot\frac{\omega^2 - \omega_s^2}{\omega^2 - \omega_p^2},
$$

with a **series resonance** (zero of impedance) and a **parallel resonance** (pole) at

$$
\omega_s = \frac{1}{\sqrt{LC}}, \qquad \omega_p = \omega_s\sqrt{1 + \frac{C}{C_0}} \approx \omega_s\Bigl(1 + \frac{C}{2C_0}\Bigr).
$$ {#eq-crystal}

Between $\omega_s$ and $\omega_p$ the crystal is inductive, and elsewhere capacitive.
:::

::: proof
The motional branch has impedance $j\omega L + 1/(j\omega C) = (1 - \omega^2LC)/(j\omega C)$, which vanishes at $\omega_s$. In parallel with $C_0$, the admittance is $j\omega C_0 + j\omega C/(1 - \omega^2LC)$, which can be written $j\omega(C_0 + C - \omega^2LCC_0)/(1 - \omega^2LC)$. It vanishes (infinite impedance) when $\omega^2 = (C_0 + C)/(LCC_0) = \omega_s^2(1 + C/C_0)$. Inverting the admittance and rearranging gives the stated $Z$. Since $C \ll C_0$, the square root is well approximated by $1 + C/(2C_0)$. For $\omega_s < \omega < \omega_p$, the sign of $Z/j$ is positive: inductive.
:::

::: example A 10 MHz crystal {#ex-crystal}
A $10\,\mathrm{MHz}$ AT-cut crystal has motional capacitance $C = 20\,\mathrm{fF}$, motional resistance $R = 10\,\Omega$ and electrode capacitance $C_0 = 5\,\mathrm{pF}$. Find $L$, the quality factor and the separation of the series and parallel resonances.
::: solution
$L = 1/(\omega_s^2C) = 1/\bigl((2\pi\times10^7)^2\times2\times10^{-14}\bigr) = 12.7\,\mathrm{mH}$ — an enormous inductance for a component the size of a fingernail, which is what the mechanical resonance provides. $Q = \omega_sL/R = 2\pi\times10^7\times0.0127/10 = 7.96\times10^4$. By [[#eq-crystal]], $f_p - f_s \approx f_sC/(2C_0) = 10^7\times0.002 = 20\,\mathrm{kHz}$, a fractional separation of $0.2\,\%$. Within this narrow band the crystal's reactance sweeps from zero to infinity, so an oscillator that uses the crystal as its inductor is pinned to a frequency between $f_s$ and $f_p$; the external capacitance (the **load capacitance** specified by the manufacturer) fixes where.
:::
:::

The most common circuit is the **Pierce oscillator**: an inverting amplifier (in digital ICs, simply a CMOS inverter biased into its linear region by a large feedback resistor) with the crystal from output to input and a capacitor from each end to ground. It is a Colpitts oscillator in which the crystal, operated just above $\omega_s$ where it is inductive, replaces $L$. Because the crystal's reactance changes so steeply, the frequency hardly depends on the amplifier: a phase error $\Delta\phi$ shifts the frequency by $\Delta\phi/(2Q)$, parts per million or less.

::: application Frequency references as of 2026
Ordinary crystal oscillators are accurate to $10$–$50$ parts per million (ppm) over temperature; a $20\,\mathrm{ppm}$ error in a watch is about $1.7\,\mathrm{s}$ per day. The $32.768\,\mathrm{kHz}$ watch crystal is a tuning-fork resonator chosen because $2^{15}$ cycles make one second. **Temperature-compensated** crystal oscillators (TCXOs) in phones and GNSS receivers reach about $0.5$–$2\,\mathrm{ppm}$, and **oven-controlled** oscillators (OCXOs) in base stations and instruments reach parts per billion. MEMS resonators compete with quartz in many consumer products, and atomic clocks — rubidium cells and caesium beams, and chip-scale atomic clocks — provide the references against which the others are calibrated.
:::

::: warning Oscillators that fail to start
Many oscillators that work on the bench fail in production or at low temperature because the start-up margin is too small: the loop gain at $\omega_0$ must exceed $1$ with the worst-case transistor, supply, crystal resistance and temperature. Crystal manufacturers recommend a **negative-resistance** margin of $3$–$5$ times the crystal's maximum motional resistance. The opposite error — far too much gain — overdrives the crystal, raises its ageing rate and can make it jump to an overtone or a spurious mode.
:::

## Relaxation oscillators

A relaxation oscillator alternates between two states. In each state a capacitor charges towards a target, and when its voltage crosses a threshold the circuit switches state and the capacitor heads back. The output is a square wave, and the capacitor voltage a sequence of exponential (or, with current-source charging, linear) ramps.

### The op-amp astable multivibrator

An op-amp is wired as a **Schmitt trigger**: positive feedback from the output to the non-inverting input through the divider $R_2$ (output to input) and $R_1$ (input to ground), so the non-inverting input sits at $\pm\beta V_{sat}$ with $\beta = R_1/(R_1 + R_2)$, depending on whether the output is at $+V_{sat}$ or $-V_{sat}$. A resistor $R$ from the output to the inverting input and a capacitor $C$ from the inverting input to ground form the timing network.

::: theorem Period of the op-amp astable {#thm-astable}
The op-amp astable with saturated output levels $\pm V_{sat}$ and threshold fraction $\beta = R_1/(R_1 + R_2)$ produces a square wave of period

$$
T = 2RC\ln\frac{1 + \beta}{1 - \beta}.
$$ {#eq-astable}

For $R_1 = R_2$ ($\beta = \tfrac12$), $T = 2RC\ln3 = 2.20\,RC$.
:::

::: proof
Suppose the output has just switched to $+V_{sat}$ because $v_C$ fell to $-\beta V_{sat}$. The capacitor now charges through $R$ towards $+V_{sat}$:

$$
v_C(t) = V_{sat} - (V_{sat} + \beta V_{sat})\,e^{-t/RC}.
$$

The output switches back when $v_C$ reaches $+\beta V_{sat}$, at time $t_1$ given by $\beta = 1 - (1 + \beta)e^{-t_1/RC}$, so $t_1 = RC\ln\bigl((1 + \beta)/(1 - \beta)\bigr)$. By symmetry the negative half-cycle lasts the same time, and $T = 2t_1$.
:::

::: widget plot
f: if(mod(x, 2*ln((1 + b)/(1 - b))) < ln((1 + b)/(1 - b)), 1 - (1 + b)*exp(-mod(x, 2*ln((1 + b)/(1 - b)))), -1 + (1 + b)*exp(-(mod(x, 2*ln((1 + b)/(1 - b))) - ln((1 + b)/(1 - b))))); if(mod(x, 2*ln((1 + b)/(1 - b))) < ln((1 + b)/(1 - b)), 1, -1)
x: 0, 12
y: -1.2, 1.2
sliders: b=0.5:0.1:0.9:0.01
labels: v_C/V_{sat}; v_O/V_{sat}
caption: Capacitor voltage and output of the op-amp astable against $t/RC$, for threshold fraction $\beta$ (slider). The capacitor charges exponentially towards the output level and the output flips each time $v_C$ reaches $\pm\beta V_{sat}$. With $\beta = 0.5$ the period is $2.2\,RC$. Raise $\beta$: the thresholds move towards the rails, where the exponential is flattening out, so the period grows rapidly — to $5.9\,RC$ at $\beta = 0.9$.
:::

::: example Designing an astable {#ex-astable}
Design an op-amp astable for $1\,\mathrm{kHz}$ with $R_1 = R_2 = 10\,\mathrm{k\Omega}$ and $C = 10\,\mathrm{nF}$. What limits its accuracy?
::: solution
With $\beta = \tfrac12$, $T = 2RC\ln3 = 1\,\mathrm{ms}$ gives $RC = 10^{-3}/(2\times1.0986) = 0.455\,\mathrm{ms}$ and $R = 45.5\,\mathrm{k\Omega}$ (E96: $45.3\,\mathrm{k\Omega}$, giving $1.005\,\mathrm{kHz}$). The period depends on $R$, $C$ and the ratio $R_1/R_2$, and also on the symmetry of $\pm V_{sat}$, which drift with supply and temperature, and on the op-amp's slew rate, which rounds the edges and adds delay at each transition. Accuracy of $1$–$2\,\%$ is typical; for better, use a crystal.
:::
:::

### The 555 timer

The **555 timer**, introduced in 1972 and still made by the hundreds of millions, packages a relaxation oscillator: two comparators referenced to $\tfrac13V_{CC}$ and $\tfrac23V_{CC}$ by an internal divider of three equal resistors, a flip-flop, and a discharge transistor. In the astable connection, the timing capacitor $C$ charges through $R_A + R_B$ from $\tfrac13V_{CC}$ to $\tfrac23V_{CC}$, then discharges through $R_B$ alone back to $\tfrac13V_{CC}$. Each phase is an exponential approach in which the voltage covers half of the remaining distance to its target, which takes $\ln2$ time constants:

$$
t_H = (R_A + R_B)C\ln2, \qquad t_L = R_BC\ln2, \qquad f = \frac{1}{(R_A + 2R_B)C\ln2} = \frac{1.44}{(R_A + 2R_B)C}.
$$ {#eq-555}

The frequency is independent of $V_{CC}$ because the thresholds are fixed fractions of it.

::: quiz
A 555 astable has $R_A = 1\,\mathrm{k\Omega}$, $R_B = 10\,\mathrm{k\Omega}$ and $C = 100\,\mathrm{nF}$. What are its frequency and duty cycle?
- [ ] $1.44\,\mathrm{kHz}$, $50\,\%$
- [x] $687\,\mathrm{Hz}$, $52\,\%$
- [ ] $687\,\mathrm{Hz}$, $91\,\%$
- [ ] $131\,\mathrm{Hz}$, $48\,\%$
::: solution
By [[#eq-555]], $f = 1.44/(21\,\mathrm{k\Omega}\times100\,\mathrm{nF}) = 687\,\mathrm{Hz}$. The duty cycle is $t_H/(t_H + t_L) = (R_A + R_B)/(R_A + 2R_B) = 11/21 = 52\,\%$. The 555 astable's duty cycle is always above $50\,\%$; a diode across $R_B$ allows lower values.
:::
:::

Other relaxation oscillators include the **ring oscillator** — an odd number of inverters in a loop, oscillating with a period of twice the total propagation delay, used on every chip to measure process speed — and **voltage-controlled oscillators** (VCOs), in which a control voltage sets the charging current. VCOs inside **phase-locked loops** generate the clocks of processors and the local oscillators of radios, locked in phase to a crystal reference.

::: history
Alexander Meissner in Germany and Edwin Armstrong in the United States independently built valve oscillators using regenerative (positive) feedback in 1913. Ralph Hartley patented his tapped-inductor oscillator in 1915, and Edwin Colpitts filed his capacitive-divider version in 1918. Walter Cady demonstrated the quartz crystal oscillator in 1921; Warren Marrison and J. W. Horton built the first quartz clock at Bell Laboratories in 1927. The Dutch engineer Balthasar van der Pol analysed relaxation oscillations in valve circuits in 1926, and Heinrich Barkhausen formulated the oscillation condition that bears his name in the 1920s. William Hewlett's 1939 Wien-bridge oscillator with lamp stabilisation became the HP 200A, the first product of Hewlett-Packard. The 555 timer was designed by Hans Camenzind and introduced by Signetics in 1972.
:::

## Where this leads

Oscillators are the heartbeat of digital systems ([[digital-logic/latches-flip-flops]] depend on clean clocks), of communication systems, where the **phase noise** of the local oscillator limits a receiver's selectivity ([[communication-systems]]), and of instruments. The voltage-controlled oscillator and the phase-locked loop combine the oscillator with the feedback ideas of [[electronics-2/feedback]] and [[control-systems]]. Relaxation oscillators and PWM generators drive the switching converters of [[power-electronics/dc-dc-converters]], and microwave oscillators using transistors and resonant cavities appear in [[rf-microwave]].

::: summary
- A linear oscillator is a loop satisfying the Barkhausen criterion $A(j\omega_0)\beta(j\omega_0) = 1$: the phase condition sets the frequency, the magnitude condition the required gain.
- Practical oscillators start with loop gain slightly above $1$ and rely on a non-linearity (lamp, thermistor, diodes, AGC or the transistor itself) to settle at unit average loop gain; the result is a limit cycle.
- The Wien-bridge oscillator runs at $\omega_0 = 1/(RC)$ with gain $3$; the three-section RC phase-shift oscillator at $1/(\sqrt6RC)$ with gain $29$.
- The Colpitts oscillator runs at the resonance of $L$ with $C_1$ and $C_2$ in series and needs $g_mR \ge C_1/C_2$; the Hartley is its inductive dual.
- Frequency stability improves with the resonator's $Q$: $\Delta\omega/\omega_0 = \Delta\phi/(2Q)$. Quartz crystals, with $Q$ of $10^4$–$10^6$, have series and parallel resonances $0.1$–$1\,\%$ apart and give ppm accuracy.
- Relaxation oscillators switch a capacitor between thresholds: the op-amp astable has $T = 2RC\ln\bigl((1 + \beta)/(1 - \beta)\bigr)$; the 555 has $f = 1.44/((R_A + 2R_B)C)$.
:::

## Exercises

::: exercise Wien-bridge frequency {level=1 check="1/(2*pi*10e3*16e-9)"}
A Wien-bridge oscillator uses $R = 10\,\mathrm{k\Omega}$ and $C = 16\,\mathrm{nF}$. Find its frequency in hertz.
::: solution
$f_0 = 1/(2\pi RC) = 1/(2\pi\times10^4\times1.6\times10^{-8}) = 995\,\mathrm{Hz}$.
:::
:::

::: exercise Phase-shift oscillator {level=1 check="1/(2*pi*sqrt(6)*10e3*10e-9)"}
An RC phase-shift oscillator uses $R = 10\,\mathrm{k\Omega}$ and $C = 10\,\mathrm{nF}$ in its three-section ladder. Find the frequency in hertz and the minimum feedback resistor of the inverting amplifier.
::: solution
$f_0 = 1/(2\pi\sqrt6RC) = 1/(2\pi\times2.449\times10^{-4}) = 650\,\mathrm{Hz}$. The gain must be at least $29$, so $R_f \ge 29\times10\,\mathrm{k\Omega} = 290\,\mathrm{k\Omega}$; use $330\,\mathrm{k\Omega}$ for a start-up margin.
:::
:::

::: exercise 555 frequency {level=1 check="1/((2e3+2*47e3)*10e-9*ln(2))"}
A 555 astable has $R_A = 2\,\mathrm{k\Omega}$, $R_B = 47\,\mathrm{k\Omega}$ and $C = 10\,\mathrm{nF}$. Find its frequency in hertz.
::: solution
$f = 1/\bigl((R_A + 2R_B)C\ln2\bigr) = 1/(96\times10^3\times10^{-8}\times0.6931) = 1.50\,\mathrm{kHz}$.
:::
:::

::: exercise Colpitts design {level=2}
Design a Colpitts oscillator for $10\,\mathrm{MHz}$ with $L = 1\,\mu\mathrm{H}$ and $C_1 = 2C_2$. Find $C_1$, $C_2$ and the minimum $g_mR$.
::: solution
The series capacitance must be $1/(\omega_0^2L) = 1/\bigl((2\pi\times10^7)^2\times10^{-6}\bigr) = 253\,\mathrm{pF}$. With $C_1 = 2C_2$, $C_1C_2/(C_1 + C_2) = 2C_2/3 = 253\,\mathrm{pF}$, so $C_2 = 380\,\mathrm{pF}$ and $C_1 = 760\,\mathrm{pF}$. By [[#eq-colpitts-gain]], $g_mR \ge C_1/C_2 = 2$.
:::
:::

::: exercise Crystal pulling {level=2 check="10e6*20e-15/(2*(5e-12+15e-12))"}
The crystal of [[#ex-crystal]] operates in a Pierce oscillator with an effective load capacitance $C_L = 15\,\mathrm{pF}$ in series with it, which raises the oscillation frequency above $f_s$ by approximately $f_sC/\bigl(2(C_0 + C_L)\bigr)$. Find this shift in hertz, and its change if $C_L$ changes by $1\,\mathrm{pF}$.
::: solution
$\Delta f = 10^7\times2\times10^{-14}/\bigl(2\times2\times10^{-11}\bigr) = 5.0\,\mathrm{kHz}$ ($500\,\mathrm{ppm}$). With $C_L = 16\,\mathrm{pF}$, $\Delta f = 10^7\times2\times10^{-14}/(4.2\times10^{-11}) = 4.76\,\mathrm{kHz}$, a change of $238\,\mathrm{Hz}$, about $24\,\mathrm{ppm}/\mathrm{pF}$. This "pulling" sensitivity is how a VCXO is tuned with a varactor — and why stray capacitance must be controlled.
:::
:::

::: exercise Astable duty and frequency {level=2}
An op-amp astable has $R = 22\,\mathrm{k\Omega}$, $C = 47\,\mathrm{nF}$, $R_1 = 10\,\mathrm{k\Omega}$ and $R_2 = 47\,\mathrm{k\Omega}$. Find $\beta$, the period and the frequency. If the op-amp saturates at $+13\,\mathrm{V}$ and $-12\,\mathrm{V}$, what happens to the waveform?
::: solution
$\beta = 10/57 = 0.175$; $T = 2RC\ln(1.175/0.825) = 2\times1.034\times10^{-3}\times0.354 = 0.732\,\mathrm{ms}$, $f = 1.37\,\mathrm{kHz}$. With unequal saturation levels the thresholds become $+2.28\,\mathrm{V}$ and $-2.11\,\mathrm{V}$, and the two half-periods differ: the duty cycle is no longer $50\,\%$ and the frequency shifts slightly. Clamping the output with back-to-back Zener diodes restores symmetry.
:::
:::

::: exercise Frequency stability and Q {level=2}
An amplifier's phase shift drifts by $2^\circ$ over temperature. Estimate the fractional frequency drift of an oscillator using (a) a Wien network ($Q = 1/3$, for which you may take $\mathrm{d}\phi/\mathrm{d}\omega = 2Q/\omega_0$ as for a resonator), (b) an LC tank with $Q = 50$, (c) the crystal of [[#ex-crystal]].
::: solution
$\Delta\phi = 2^\circ = 0.0349\,\mathrm{rad}$, and $\Delta\omega/\omega_0 = \Delta\phi/(2Q)$. (a) $0.0349/(2/3) = 5.2\,\%$. (b) $0.0349/100 = 3.5\times10^{-4}$, $350\,\mathrm{ppm}$. (c) $0.0349/(1.59\times10^5) = 2.2\times10^{-7}$, $0.22\,\mathrm{ppm}$. The crystal improves on the RC network by more than five orders of magnitude.
:::
:::

::: exercise Hartley oscillator {level=3}
Derive the oscillation frequency and gain condition of a Hartley oscillator: a common-source amplifier ($g_m$, drain resistance $R$) with an inductor $L_2$ from drain to ground, a capacitor $C$ from drain to gate, and an inductor $L_1$ from gate to ground (no mutual coupling). Compare with [[#thm-colpitts]].
::: hint
Follow the proof of [[#thm-colpitts]] with $sC_1 \to 1/(sL_1)$, $sC_2 \to 1/(sL_2)$ and $sL \to 1/(sC)$.
:::
::: solution
The current through $C$ into $L_1$ is $V_g/(sL_1)$, so $V_d = V_g\bigl(1 + 1/(s^2L_1C)\bigr)$. Substitute $s = j\omega$ directly. With $V_d = V_g(1 - 1/(\omega^2L_1C))$, KCL gives

$$
g_m + \Bigl(1 - \frac{1}{\omega^2L_1C}\Bigr)\Bigl(\frac1R - \frac{j}{\omega L_2}\Bigr) - \frac{j}{\omega L_1} = 0.
$$

Imaginary part: $-(1 - 1/(\omega^2L_1C))/(\omega L_2) - 1/(\omega L_1) = 0$, so $1 - 1/(\omega^2L_1C) = -L_2/L_1$, giving $\omega_0^2 = 1/\bigl((L_1 + L_2)C\bigr)$. Real part: $g_m + (1 - 1/(\omega_0^2L_1C))/R = g_m - L_2/(L_1R) = 0$ at the threshold, so $g_mR \ge L_2/L_1$. This is the dual of the Colpitts result: the tank resonates with the series inductance $L_1 + L_2$, and the inductive divider returns the fraction $L_1/L_2$ (inverted) to the gate.
:::
:::

::: exercise Amplitude of a diode-stabilised oscillator {level=3}
A Wien-bridge oscillator has $R_1 = 10\,\mathrm{k\Omega}$ and $R_2 = R_{2a} + R_{2b}$ with $R_{2a} = 15\,\mathrm{k\Omega}$ and $R_{2b} = 10\,\mathrm{k\Omega}$; two anti-parallel diodes are connected across $R_{2b}$. (a) Find the small-signal gain and show that the circuit starts. (b) Model the diodes as open below $0.6\,\mathrm{V}$ and as short circuits above. Show that the gain on the peaks falls to $2.5$, and argue that the amplitude settles where the voltage across $R_{2b}$ peaks a little above $0.6\,\mathrm{V}$. (c) Estimate the output amplitude.
::: solution
(a) With the diodes off, $K = 1 + 25/10 = 3.5 > 3$: the poles are in the right half-plane and the oscillation grows.

(b) With the diodes shorting $R_{2b}$, $K = 1 + 15/10 = 2.5 < 3$. The effective gain, averaged over a cycle, falls from $3.5$ towards $2.5$ as the fraction of each cycle spent with the diodes conducting grows; the amplitude stops growing when this average equals $3$. This needs the diodes to conduct for a substantial part of each peak, so the voltage across $R_{2b}$ must exceed $0.6\,\mathrm{V}$ by a margin.

(c) At $\omega_0$ the inverting input follows $v^+ = v_o/3$, so the feedback chain carries $i = v^-/R_1$, which is close to sinusoidal, $i = I\sin\omega_0t$. The output is $v_o = v^- + iR_{2a} + v_b$, where $v_b$ is $iR_{2b}$ clipped at $\pm0.6\,\mathrm{V}$. Diode conduction starts when $IR_{2b} = 0.6\,\mathrm{V}$, at an output of $3\times0.6 = 1.8\,\mathrm{V}$ peak, but the amplitude keeps growing beyond this. It settles where the *fundamental* of $v_o$ equals $3v^-$, i.e. where the fundamental of $v_b$ is $(30 - 25)\,\mathrm{k\Omega}\times I$, half of the unclipped $10\,\mathrm{k\Omega}\times I$. The fundamental of a sinusoid of amplitude $A$ clipped at $\pm a$ is $A\cdot\tfrac{2}{\pi}\bigl(\arcsin r + r\sqrt{1 - r^2}\bigr)$ with $r = a/A$; setting this factor to $\tfrac12$ gives $r = 0.404$, so $A = IR_{2b} = 0.6/0.404 = 1.49\,\mathrm{V}$, and the output amplitude is $3IR_1 = 3A = 4.5\,\mathrm{V}$ peak. Real diodes conduct gradually, which changes the figure somewhat, and the clipped feedback adds a few percent of distortion. To set a larger amplitude, increase $R_{2b}$ relative to $R_1$ or use Zener diodes.
:::
:::
