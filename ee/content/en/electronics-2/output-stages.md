A loudspeaker is a difficult load. A typical one has an impedance of about $8\,\Omega$, and to play loudly it needs tens of watts: $50\,\mathrm{W}$ into $8\,\Omega$ means a sinusoid of $28\,\mathrm{V}$ peak and $3.5\,\mathrm{A}$ peak. The op-amps of [[electronics-2/operational-amplifier-design]] have output resistances of tens of kilohms at their high-gain node and deliver milliamperes. Between the two sits the **output stage**: a circuit whose job is not voltage gain but **power** — to deliver large currents into a low-impedance load with low output resistance, little distortion, and as little wasted heat as possible.

Waste matters. Every watt the output transistors dissipate must be conducted away through a heat sink, and every watt drawn from a battery shortens its life. The stages we study differ chiefly in how long each transistor conducts during a signal cycle, which sets their **efficiency**, and in how they handle the instant at which conduction passes from one transistor to another, which sets their **distortion**. We analyse the class A emitter follower, the class B push–pull stage and its crossover distortion, the class AB stage that is the standard compromise, the thermal design that keeps the transistors alive, and briefly the switching class D amplifier. The BJT emitter follower of [[electronics-1/single-stage-amplifiers]] and the multistage ideas of [[electronics-1/multistage-amplifiers]] are the starting point.

## Classification and figures of merit

::: definition Classes of output stage {#def-classes}
An output stage is classified by the fraction of each signal cycle during which each output device conducts, the **conduction angle**:

- **class A**: each device conducts for the whole cycle ($360^\circ$);
- **class B**: two devices each conduct for half the cycle ($180^\circ$), one for each polarity;
- **class AB**: each device conducts for slightly more than half the cycle, so that both conduct near zero output;
- **class C**: a device conducts for less than half the cycle (used with tuned loads in radio transmitters);
- **class D**: the devices act as switches, driven by a pulse-width-modulated signal, and the load is fed through a low-pass filter.
:::

::: definition Power-conversion efficiency {#def-efficiency}
The **power-conversion efficiency** of an output stage is

$$
\eta = \frac{P_L}{P_S},
$$ {#eq-efficiency}

the average power delivered to the load divided by the average power drawn from the supplies. The difference $P_D = P_S - P_L$ is dissipated, almost all of it in the output transistors.
:::

For a sinusoidal output of peak $V_p$ into a resistive load $R_L$, the load power is $P_L = V_p^2/(2R_L) = V_{\mathrm{rms}}^2/R_L$. Distortion is measured by the **total harmonic distortion**,

$$
\mathrm{THD} = \frac{\sqrt{V_2^2 + V_3^2 + V_4^2 + \cdots}}{V_1},
$$ {#eq-thd}

where $V_k$ is the amplitude of the $k$-th harmonic in the output when the input is a pure sinusoid. A good audio amplifier has THD well below $0.1\,\%$ (often below $0.01\,\%$, or $-80\,\mathrm{dB}$).

::: warning Peak, RMS and "music" power
The power delivered by a sinusoid of peak $V_p$ is $V_p^2/(2R_L)$, not $V_p^2/R_L$. A "$100\,\mathrm{W}$ peak" rating, computed from $V_p^2/R_L$, is the same amplifier as a "$50\,\mathrm{W}$" (continuous, RMS-voltage) one. Some marketing figures go further and quote short-burst "music power" or multiply by the number of channels. Always ask: which waveform, which load, at what distortion, for how long?
:::

## Class A: the emitter follower

The simplest output stage is an npn emitter follower $Q_1$ whose emitter is biased by a constant current source $I$ to the negative supply, with the load $R_L$ from the emitter to ground and supplies $\pm V_{CC}$.

The output follows the input one $V_{BE}$ lower, $v_O = v_I - v_{BE1}$, with a small-signal gain $R_L/(R_L + r_{e1})$, close to $1$. The positive swing is limited when $Q_1$ saturates, $v_O \le V_{CC} - V_{CE,\mathrm{sat}}$. The negative swing is limited differently: the load current flowing *out* of ground into the emitter node cannot exceed the bias current, because $Q_1$ can only source current. With $Q_1$ cut off, the output is $-IR_L$, so $v_O \ge -IR_L$ (or $-V_{CC}$ plus the current source's saturation voltage, whichever is less negative). For a symmetrical swing the bias must satisfy $I \ge V_p/R_L$.

::: theorem Efficiency of the class A follower {#thm-class-a}
For a class A emitter follower biased by a current source $I$ from supplies $\pm V_{CC}$, delivering a sinusoid of peak $V_p$ into $R_L$,

$$
\eta = \frac{1}{4}\,\frac{V_p}{IR_L}\,\frac{V_p}{V_{CC}} \le 25\,\%,
$$ {#eq-class-a}

with the maximum reached only when $V_p = IR_L = V_{CC}$. The dissipation is largest with no signal, $P_D = 2V_{CC}I$.
:::

::: proof
Each supply delivers a constant current $I$ on average (the signal current through $Q_1$ averages to zero), so $P_S = V_{CC}I + V_{CC}I = 2V_{CC}I$, independent of the signal. With $P_L = V_p^2/(2R_L)$,

$$
\eta = \frac{V_p^2}{4V_{CC}IR_L} = \frac14\,\frac{V_p}{IR_L}\,\frac{V_p}{V_{CC}}.
$$

Each fraction is at most $1$ (the swing limits above), giving $\eta \le \tfrac14$. Since $P_S$ is constant, the dissipation $P_S - P_L$ is largest when $P_L = 0$.
:::

::: example A class A output stage {#ex-class-a}
A class A follower with $V_{CC} = 10\,\mathrm{V}$ drives $R_L = 100\,\Omega$ and is biased at $I = 100\,\mathrm{mA}$. Find the maximum output power (taking $V_{CE,\mathrm{sat}} = 0.2\,\mathrm{V}$), the efficiency, and the dissipation in $Q_1$ at rest.
::: solution
The negative limit is $-IR_L = -10\,\mathrm{V}$ and the positive limit $9.8\,\mathrm{V}$, so $V_p = 9.8\,\mathrm{V}$. Then $P_L = 9.8^2/200 = 0.48\,\mathrm{W}$, $P_S = 2\times10\times0.1 = 2\,\mathrm{W}$, and $\eta = 24\,\%$. At rest $Q_1$ has $V_{CE} = 10\,\mathrm{V}$ and $I_C = 100\,\mathrm{mA}$, dissipating $1\,\mathrm{W}$; the current source dissipates another $1\,\mathrm{W}$. To deliver half a watt the stage burns $2\,\mathrm{W}$ continuously, whether music is playing or not.
:::
:::

Class A has one great virtue: the transistor never turns off and the stage is as linear as an emitter follower can be. Its poor efficiency confines it to low-power stages (op-amp output stages at milliwatts, headphone drivers) and to audio amplifiers whose owners value its sound over their electricity bill. A class A stage that feeds its load through a transformer or an inductor can reach $50\,\%$, because the inductor lets the collector swing to twice the supply ([[#exr-inductor-fed]]).

## Class B: the push–pull stage

The efficiency of class A is poor because the bias current flows whether or not there is a signal. The **class B** stage removes it. An npn transistor $Q_N$ and a pnp transistor $Q_P$ have their bases joined (the input) and their emitters joined (the output, driving $R_L$ to ground); $Q_N$'s collector goes to $+V_{CC}$ and $Q_P$'s to $-V_{CC}$. With zero input both transistors are off and no current flows. For positive inputs above about $0.5\,\mathrm{V}$, $Q_N$ conducts as an emitter follower and *pushes* current into the load; for negative inputs below $-0.5\,\mathrm{V}$, $Q_P$ conducts and *pulls* current out. Each transistor carries one half-cycle.

::: theorem Efficiency and dissipation of the class B stage {#thm-class-b}
For a class B stage delivering a sinusoid of peak $V_p$ into $R_L$ from $\pm V_{CC}$ (ignoring the dead zone),

$$
P_S = \frac{2V_{CC}V_p}{\pi R_L}, \qquad \eta = \frac{\pi}{4}\,\frac{V_p}{V_{CC}} \le \frac{\pi}{4} = 78.5\,\%.
$$ {#eq-class-b}

The total dissipation $P_D = 2V_{CC}V_p/(\pi R_L) - V_p^2/(2R_L)$ is greatest at $V_p = 2V_{CC}/\pi$, where

$$
P_{D,\max} = \frac{2V_{CC}^2}{\pi^2R_L},
$$ {#eq-class-b-dissipation}

shared equally between the two transistors.
:::

::: proof
Each supply delivers current only during its half-cycle: a half-sine pulse of peak $V_p/R_L$, whose average over a full cycle is $(1/2\pi)\int_0^\pi(V_p/R_L)\sin\theta\,\mathrm{d}\theta = V_p/(\pi R_L)$. Each supply therefore delivers $V_{CC}V_p/(\pi R_L)$, giving $P_S$ as stated. Dividing $P_L = V_p^2/(2R_L)$ by $P_S$:

$$
\eta = \frac{V_p^2/(2R_L)}{2V_{CC}V_p/(\pi R_L)} = \frac{\pi V_p}{4V_{CC}},
$$

maximal at $V_p = V_{CC}$ (ignoring saturation voltages). For the dissipation, $\mathrm{d}P_D/\mathrm{d}V_p = 2V_{CC}/(\pi R_L) - V_p/R_L = 0$ at $V_p = 2V_{CC}/\pi$; substituting gives $4V_{CC}^2/(\pi^2R_L) - 2V_{CC}^2/(\pi^2R_L) = 2V_{CC}^2/(\pi^2R_L)$. By symmetry each transistor dissipates half.
:::

The efficiency is now proportional to the output amplitude rather than its square, and at rest the stage draws nothing. Note the counter-intuitive dissipation result: the transistors run hottest not at full power but at $V_p = 0.64\,V_{CC}$, when the output is about $4\,\mathrm{dB}$ below full power and the efficiency is $50\,\%$.

::: widget plot
f: x^2/4; pi*x/4; 2*x/pi - x^2/2
x: 0, 1
y: 0, 0.9
vlines: 0.6366
labels: \eta \text{ class A}; \eta \text{ class B}; P_D R_L/V_{CC}^2 \text{ class B}
caption: Efficiency against normalised output amplitude $V_p/V_{CC}$ for a class A follower (biased at $IR_L = V_{CC}$) and a class B push–pull stage, together with the class B dissipation normalised to $V_{CC}^2/R_L$. Hover along the curves: at full output class B reaches $78.5\,\%$ against $25\,\%$ for class A, and at one-tenth of full amplitude the figures are $7.9\,\%$ and $0.25\,\%$. The class B dissipation peaks at $V_p = 2V_{CC}/\pi$ (vertical line).
:::

::: example Designing a class B audio stage {#ex-class-b}
A class B stage must deliver $20\,\mathrm{W}$ of sinusoidal power into $8\,\Omega$. Allowing $2\,\mathrm{V}$ of headroom for the drivers and saturation, choose $V_{CC}$, then find the efficiency and dissipation at full power, and the worst-case dissipation per transistor.
::: solution
$V_p = \sqrt{2P_LR_L} = \sqrt{2\times20\times8} = 17.9\,\mathrm{V}$, peak current $2.24\,\mathrm{A}$. With $2\,\mathrm{V}$ headroom, $V_{CC} = 20\,\mathrm{V}$.

At full power, by [[#eq-class-b]], $P_S = 2\times20\times17.9/(\pi\times8) = 28.5\,\mathrm{W}$, so $\eta = 20/28.5 = 70.2\,\%$ (check: $\pi\times17.9/80 = 0.702$) and $P_D = 8.5\,\mathrm{W}$ in total.

The worst case is at $V_p = 2\times20/\pi = 12.7\,\mathrm{V}$, where by [[#eq-class-b-dissipation]] $P_{D,\max} = 2\times400/(\pi^2\times8) = 10.1\,\mathrm{W}$, that is $5.07\,\mathrm{W}$ per transistor. The heat sink must be sized for this figure, not for the $4.2\,\mathrm{W}$ per transistor at full power. Each transistor must also withstand $V_{CE} = 2V_{CC} = 40\,\mathrm{V}$ when the other is conducting at the peak, plus margin.
:::
:::

### Crossover distortion

A silicon BJT conducts appreciable current only when $v_{BE}$ exceeds about $0.5$–$0.6\,\mathrm{V}$. With the bases tied together, both transistors are therefore off for $\abs{v_I} < 0.6\,\mathrm{V}$, and the transfer characteristic has a **dead zone**: $v_O \approx 0$ there and $v_O \approx v_I \mp 0.6\,\mathrm{V}$ outside it. A sinusoid passing through the stage acquires a flat step at every zero crossing, called **crossover distortion**. Because the dead zone has a fixed width, its relative effect grows as the signal shrinks — the opposite of most non-linearities, and particularly audible on quiet passages.

::: widget plot
f: if(abs(a*sin(x)) < 0.6, 0, a*sin(x) - 0.6*sign(sin(x)))/a; sin(x)
x: 0, 2pi
y: -1.1, 1.1
piticks: true
sliders: a=10:0.7:20:0.1
labels: v_O/V_p \text{ (class B)}; v_I/V_p
caption: The output of a class B stage with a $\pm0.6\,\mathrm{V}$ dead zone, normalised to the input peak $V_p = a$ volts (slider). At $10\,\mathrm{V}$ peak the notch is a thin step and the THD is $3.7\,\%$; reduce the amplitude to $2\,\mathrm{V}$ and the THD rises to $20\,\%$; at $1\,\mathrm{V}$ less than a third of each half-cycle survives.
:::

::: example Crossover distortion {#ex-crossover}
Model a class B stage by the ideal dead zone $v_O = 0$ for $\abs{v_I} < 0.6\,\mathrm{V}$ and $v_O = v_I \mp 0.6\,\mathrm{V}$ otherwise. Find the THD for input sinusoids of $10\,\mathrm{V}$ and $2\,\mathrm{V}$ peak. How much negative feedback is needed to bring the $10\,\mathrm{V}$ figure below $0.1\,\%$?
::: solution
The output is an odd, half-wave-symmetric waveform, so it contains only odd harmonics. Computing its Fourier coefficients numerically (with a few thousand samples per period): at $10\,\mathrm{V}$ peak the fundamental is $9.24\,\mathrm{V}$ and the harmonics give $\mathrm{THD} = 3.7\,\%$; at $2\,\mathrm{V}$ peak the fundamental is $1.25\,\mathrm{V}$ and $\mathrm{THD} = 19.9\,\%$.

By [[electronics-2/feedback#thm-disturbance]], at constant output, distortion generated inside the loop is reduced by about $1 + T$. Reducing $3.7\,\%$ to $0.1\,\%$ needs $1 + T \ge 37$, about $31\,\mathrm{dB}$ of loop gain at the harmonic frequencies — up to, say, $20\,\mathrm{kHz}$ times the order of the significant harmonics. This is easy at $1\,\mathrm{kHz}$ but hard at $20\,\mathrm{kHz}$, which is why pure class B is not used for high-quality audio, even with feedback: the residual distortion consists of high-order harmonics where the loop gain is lowest.
:::
:::

::: quiz
A class B stage operates from $\pm15\,\mathrm{V}$ into $8\,\Omega$. At which output amplitude are the transistors hottest?
- [ ] At full output, $V_p \approx 15\,\mathrm{V}$
- [x] At $V_p = 2V_{CC}/\pi \approx 9.5\,\mathrm{V}$
- [ ] At zero output, when the quiescent current is largest
- [ ] At $V_p = V_{CC}/2 = 7.5\,\mathrm{V}$
::: solution
By [[#thm-class-b]] the dissipation $2V_{CC}V_p/(\pi R_L) - V_p^2/(2R_L)$ is maximal at $V_p = 2V_{CC}/\pi = 9.55\,\mathrm{V}$, where it is $2\times225/(\pi^2\times8) = 5.7\,\mathrm{W}$ in total. At zero output a class B stage draws no current and dissipates nothing.
:::
:::

## Class AB

The cure for crossover distortion is to bias both transistors slightly *on* at zero signal. Insert a bias voltage $V_{BB}$ between the bases: the input drives the midpoint, the base of $Q_N$ sits $V_{BB}/2$ above it and the base of $Q_P$ $V_{BB}/2$ below. With $V_{BB} \approx 2V_{BE}$, both transistors carry a small **quiescent current** $I_Q$ at zero output.

::: proposition Class AB operation {#prop-class-ab}
With bias $V_{BB}$ between the bases of matched complementary transistors of saturation current $I_S$, the quiescent current is

$$
I_Q = I_S\,e^{V_{BB}/(2V_T)}.
$$ {#eq-iq}

For any output current $i_L = v_O/R_L$, the two collector currents satisfy

$$
i_N\,i_P = I_Q^2, \qquad i_N - i_P = i_L.
$$ {#eq-ab-currents}

Near zero output both transistors conduct and the output resistance of the stage is $r_{eN}\parallel r_{eP} = V_T/(i_N + i_P)$, equal to $V_T/(2I_Q)$ at rest; for large currents one transistor carries almost all the current and the stage behaves as class B without a dead zone.
:::

::: proof
With equal bias on both sides, $v_{BEN} = v_{BEP} = V_{BB}/2$ at zero output, so $I_Q = I_Se^{V_{BB}/(2V_T)}$. In general $v_{BEN} + v_{EBP} = V_{BB}$ (KVL around the loop of the two base–emitter junctions and the bias source), so $i_Ni_P = I_S^2e^{(v_{BEN} + v_{EBP})/V_T} = I_S^2e^{V_{BB}/V_T} = I_Q^2$. KCL at the output gives $i_N - i_P = i_L$. The small-signal resistances of the two emitters are $V_T/i_N$ and $V_T/i_P$, in parallel for a signal at the output, giving $V_T/(i_N + i_P)$.
:::

The product law [[#eq-ab-currents]] explains the smooth hand-over: as $i_L$ grows, $i_N$ rises and $i_P$ falls as $I_Q^2/i_N$, never quite reaching zero. Each transistor conducts for slightly more than half the cycle. The incremental gain still varies a little with output current — from $R_L/(R_L + V_T/2I_Q)$ at the crossover to nearly $1$ at the peaks — and this residual distortion is what the overall feedback loop must remove.

::: example Quiescent current and output resistance {#ex-class-ab}
A class AB stage drives $8\,\Omega$ with $I_Q = 20\,\mathrm{mA}$. Find the small-signal output resistance at the crossover, the incremental gain there, and the quiescent dissipation from $\pm20\,\mathrm{V}$. What happens to the output resistance when the output delivers $1\,\mathrm{A}$?
::: solution
At rest, $r_{eN} = r_{eP} = 25\,\mathrm{mV}/20\,\mathrm{mA} = 1.25\,\Omega$, in parallel $0.625\,\Omega$. The gain at the crossover is $8/(8 + 0.625) = 0.928$. The quiescent dissipation is $2\times20\,\mathrm{V}\times20\,\mathrm{mA} = 0.8\,\mathrm{W}$, small compared with the $10\,\mathrm{W}$ class B worst case.

At $i_L = 1\,\mathrm{A}$, [[#eq-ab-currents]] gives $i_N \approx 1.0004\,\mathrm{A}$ and $i_P = I_Q^2/i_N = 0.4\,\mathrm{mA}$; the output resistance is $25\,\mathrm{mV}/1.0008\,\mathrm{A} = 25\,\mathrm{m\Omega}$ and the gain $0.997$. The gain varies by about $7\,\%$ over the cycle — far smoother than the dead zone of class B, and a non-linearity that feedback suppresses effectively. In real power transistors the emitter resistors and the ohmic resistances of the devices, typically $0.1$–$0.5\,\Omega$, add in series and reduce this variation further.
:::
:::

### Biasing with a $V_{BE}$ multiplier

The bias voltage $V_{BB}$ must track the output transistors' $V_{BE}$ as they warm, and be adjustable. Two diodes carrying the driver current provide a crude $2V_{BE}$. The standard circuit is the **$V_{BE}$ multiplier**: a transistor $Q_B$ with a resistor $R_1$ from collector to base and $R_2$ from base to emitter, connected between the two output bases and fed by the driver's current source.

::: proposition The $V_{BE}$ multiplier {#prop-vbe-multiplier}
If the current through $R_1$ and $R_2$ is large compared with the base current of $Q_B$, the voltage across the $V_{BE}$ multiplier is

$$
V_{BB} = V_{BE,B}\left(1 + \frac{R_1}{R_2}\right).
$$ {#eq-vbe-multiplier}
:::

::: proof
$R_2$ is connected across the base–emitter junction of $Q_B$, so it carries $V_{BE,B}/R_2$. Neglecting base current, the same current flows through $R_1$, so the total voltage is $V_{BE,B} + R_1V_{BE,B}/R_2$. $Q_B$ absorbs whatever part of the bias current is not needed by the resistors, and its $V_{BE}$ changes only logarithmically with that current, so $V_{BB}$ is nearly independent of the bias current.
:::

Mounting $Q_B$ on the heat sink of the output transistors makes $V_{BB}$ fall with temperature at roughly the same rate, $(1 + R_1/R_2)\times(-2\,\mathrm{mV/^\circ C})$, as the output transistors' combined $V_{BE}$.

::: warning Thermal runaway
At a fixed base–emitter voltage, a BJT's collector current rises by roughly $7$–$9\,\%$ per kelvin, because $V_{BE}$ at constant current falls by about $2\,\mathrm{mV/K}$. In a class AB stage with a fixed $V_{BB}$, more current means more heat, a hotter junction, and still more current — **thermal runaway**, which can destroy the transistors within seconds. The defences are thermal tracking (the $V_{BE}$ multiplier on the heat sink), small emitter resistors ($0.1$–$0.47\,\Omega$) that provide local negative feedback, and a generous heat sink. MOSFET output stages are less prone to runaway above a certain current, where the negative temperature coefficient of mobility dominates.
:::

::: quiz
The $V_{BE}$ multiplier of a class AB stage is mounted on the circuit board, away from the heat sink of the output transistors. What happens as the amplifier warms up while playing loudly?
- [ ] The quiescent current falls, and crossover distortion appears.
- [x] The output transistors' $V_{BE}$ falls while $V_{BB}$ stays nearly constant, so the quiescent current rises, possibly into thermal runaway.
- [ ] Nothing, because the multiplier's voltage is set by the resistor ratio alone.
- [ ] The multiplier transistor overheats.
::: solution
$V_{BB} = V_{BE,B}(1 + R_1/R_2)$ tracks the temperature of $Q_B$, not of the output devices. As the output transistors heat up, the $V_{BE}$ they need for a given current falls by about $2\,\mathrm{mV/K}$ each, but the bias they receive does not, so $I_Q$ grows by several percent per kelvin. Thermal coupling between $Q_B$ and the output devices is essential.
:::
:::

### Practical refinements

Real output stages add several features to the basic complementary pair.

- **Darlington or compound pairs** raise the current gain so that the driver need not supply amperes of base current; the **Sziklai** (complementary feedback) pair has only one $V_{BE}$ in its input path.
- **Quasi-complementary** stages, from the days when good power pnp transistors were unavailable, use two npn power transistors with a pnp driver on the lower side.
- **Short-circuit protection**: a sense resistor in each emitter turns on a small transistor that diverts base drive when the output current exceeds a limit, as in the 741's output stage.
- **Safe operating area**: a power BJT can fail by **second breakdown** — current crowding into a hot spot — at high $V_{CE}$ even below its rated dissipation; data sheets give a safe-operating-area plot that the load line must respect, especially for reactive loudspeaker loads.
- **Class G and H** stages switch or track the supply rails with the signal, cutting dissipation at moderate output levels.

## Thermal design

Every watt dissipated in a transistor's junction must flow to the ambient air through a chain of thermal resistances. Heat flow is analogous to current: temperature difference plays the role of voltage, power the role of current, and **thermal resistance** $\theta$, in $\mathrm{^\circ C/W}$ (equivalently $\mathrm{K/W}$), the role of resistance.

::: theorem Junction temperature {#thm-thermal}
In steady state, a device dissipating $P_D$ through junction-to-case, case-to-sink and sink-to-ambient thermal resistances in series has junction temperature

$$
T_J = T_A + P_D\,(\theta_{JC} + \theta_{CS} + \theta_{SA}).
$$ {#eq-thermal}

The maximum allowed dissipation at ambient temperature $T_A$ is therefore $P_{D,\max} = (T_{J,\max} - T_A)/\theta_{JA}$ with $\theta_{JA} = \theta_{JC} + \theta_{CS} + \theta_{SA}$, which is the **derating** line of a data sheet.
:::

::: proof
In steady state the heat flow through each element of the series path is the same, $P_D$, and the temperature drop across each is $P_D\theta$ by the definition of thermal resistance. Adding the drops from junction to ambient gives [[#eq-thermal]].
:::

The junction-to-case resistance is fixed by the package (about $1$–$2\,\mathrm{^\circ C/W}$ for a TO-247 power transistor, $60$–$100\,\mathrm{^\circ C/W}$ junction-to-ambient for a small TO-92 package with no heat sink). The case-to-sink resistance depends on the mounting: $0.1$–$1\,\mathrm{^\circ C/W}$ with thermal compound and an insulating pad. The heat sink is chosen to provide the remaining $\theta_{SA}$. Thermal capacitances make the junction temperature respond to the average dissipation over milliseconds to seconds, so short peaks matter less than the sustained worst case.

::: example Choosing a heat sink {#ex-heatsink}
Each output transistor of [[#ex-class-b]] dissipates up to $5.07\,\mathrm{W}$. The transistors have $T_{J,\max} = 150\,^\circ\mathrm{C}$ and $\theta_{JC} = 1.5\,\mathrm{^\circ C/W}$; each is mounted with $\theta_{CS} = 0.5\,\mathrm{^\circ C/W}$ on a separate heat sink. The amplifier must work at ambient temperatures up to $50\,^\circ\mathrm{C}$. What heat-sink thermal resistance is needed? What if both transistors share one heat sink?
::: solution
By [[#thm-thermal]], $\theta_{JA} \le (150 - 50)/5.07 = 19.7\,\mathrm{^\circ C/W}$, so $\theta_{SA} \le 19.7 - 1.5 - 0.5 = 17.7\,\mathrm{^\circ C/W}$ for each heat sink. A common design rule keeps $T_J$ well below the maximum, say $T_J \le 125\,^\circ\mathrm{C}$, which would give $\theta_{SA} \le 12.8\,\mathrm{^\circ C/W}$.

With a shared heat sink, $10.1\,\mathrm{W}$ flows through $\theta_{SA}$ while each transistor's own $5.07\,\mathrm{W}$ flows through its $\theta_{JC} + \theta_{CS} = 2\,\mathrm{^\circ C/W}$: $T_J = 50 + 10.1\theta_{SA} + 5.07\times2 \le 150$, so $\theta_{SA} \le 8.9\,\mathrm{^\circ C/W}$. A shared sink must be about twice as good, as one would expect, but it also keeps the two transistors and the bias transistor at the same temperature.
:::
:::

## Class D

Linear output stages waste power because their transistors carry current while a large voltage is across them. A **class D** amplifier avoids this by using the output transistors as switches. A comparator compares the audio signal with a triangle wave at a carrier frequency of a few hundred kilohertz, producing a **pulse-width-modulated** (PWM) square wave whose duty cycle follows the signal. A half-bridge or full bridge of power MOSFETs switches the load between the supply rails, and an $LC$ low-pass filter removes the carrier, leaving the average, which is the amplified audio. Since each MOSFET is either fully on (small voltage, $I_D^2R_{DS(on)}$ loss) or fully off (no current), efficiencies of $90\,\%$ and more are routine, even at moderate output levels where class B would manage $50\,\%$.

The price is complexity: dead time between switching the two transistors to avoid shoot-through, electromagnetic interference from fast edges, and an output filter whose response depends on the loudspeaker impedance. Class D now dominates portable, automotive and television audio and is spreading into high-fidelity equipment; its circuit techniques are those of the switching converters in [[power-electronics/dc-dc-converters]].

::: application Where each class is used
Class A survives in op-amp output stages biased at a few hundred microamperes and in some high-end audio. Class AB is the workhorse of linear audio power amplifiers and of the output stages of most op-amps and audio codecs. Class B and C, with tuned loads that restore a sinusoid, appear in radio-frequency power amplifiers ([[rf-microwave/rf-amplifiers]]). Class D drives phone and laptop loudspeakers, car audio and subwoofers, and the switching classes E and F push efficiency further at radio frequencies.
:::

::: history
Push–pull valve amplifiers were in use by the 1920s, and the classification into classes A, B and C dates from valve-era radio engineering. In 1947 D. T. N. Williamson published in *Wireless World* a push–pull valve amplifier with about $20\,\mathrm{dB}$ of overall negative feedback and distortion near $0.1\,\%$, which set the standard for high-fidelity design for a decade. When transistor power amplifiers appeared in the 1950s, good power pnp devices were not available; H. C. Lin's quasi-complementary output stage (1956) used two npn output transistors instead. The $V_{BE}$ multiplier and the emitter-follower class AB stage became standard in the 1960s, as did the integrated audio power amplifier. Class D, analysed as early as the 1950s, became practical with fast power MOSFETs in the 1980s and 1990s.
:::

## Where this leads

Output stages close the loop of a power amplifier: their distortion is suppressed by the feedback of [[electronics-2/feedback]], and their extra poles must be included in the stability analysis of [[electronics-2/stability-compensation]]. Switching output stages lead into [[power-electronics]], where the same efficiency arguments drive converters and motor drives, and radio-frequency power amplifiers are treated in [[rf-microwave/rf-amplifiers]].

::: summary
- Output stages deliver power into low-impedance loads; their figures of merit are efficiency $\eta = P_L/P_S$, distortion (THD) and output resistance.
- The class A emitter follower biased by a current source has $\eta = V_p^2/(4V_{CC}IR_L) \le 25\,\%$, and dissipates most at rest.
- The class B push–pull stage has $\eta = \pi V_p/(4V_{CC}) \le 78.5\,\%$; its dissipation peaks at $V_p = 2V_{CC}/\pi$, with $P_{D,\max} = 2V_{CC}^2/(\pi^2R_L)$ in total.
- Class B suffers crossover distortion from a $\pm0.6\,\mathrm{V}$ dead zone, relatively worse at low amplitudes.
- Class AB biases both transistors at a small $I_Q$, with $i_Ni_P = I_Q^2$; a $V_{BE}$ multiplier, $V_{BB} = V_{BE}(1 + R_1/R_2)$, sets and thermally tracks the bias.
- Thermal design follows $T_J = T_A + P_D\theta_{JA}$; thermal runaway is prevented by tracking, emitter resistors and adequate heat sinking.
- Class D switches the output devices with PWM and filters the result, reaching efficiencies above $90\,\%$.
:::

## Exercises

::: exercise Load power {level=1 check="12^2/(2*4)"}
An amplifier delivers a sinusoid of $12\,\mathrm{V}$ peak into a $4\,\Omega$ loudspeaker. What is the average load power in watts?
::: solution
$P_L = V_p^2/(2R_L) = 144/8 = 18\,\mathrm{W}$.
:::
:::

::: exercise Class B efficiency {level=1 check="pi/4*10/15"}
A class B stage with $\pm15\,\mathrm{V}$ supplies delivers a $10\,\mathrm{V}$ peak sinusoid. What is its efficiency (as a fraction)?
::: solution
$\eta = \pi V_p/(4V_{CC}) = \pi\times10/60 = 0.524$, that is $52.4\,\%$.
:::
:::

::: exercise $V_{BE}$ multiplier {level=1 check="0.65*(1+3.3/2.7)"}
A $V_{BE}$ multiplier has $R_1 = 3.3\,\mathrm{k\Omega}$ and $R_2 = 2.7\,\mathrm{k\Omega}$, and its transistor has $V_{BE} = 0.65\,\mathrm{V}$. What bias voltage, in volts, does it provide?
::: solution
$V_{BB} = 0.65(1 + 3.3/2.7) = 0.65\times2.222 = 1.44\,\mathrm{V}$.
:::
:::

::: exercise Heat sink {level=2 check="(125-40)/15-1-0.4"}
A transistor dissipating $15\,\mathrm{W}$ has $\theta_{JC} = 1\,\mathrm{^\circ C/W}$ and is mounted with $\theta_{CS} = 0.4\,\mathrm{^\circ C/W}$. For $T_J \le 125\,^\circ\mathrm{C}$ at $T_A = 40\,^\circ\mathrm{C}$, what is the largest allowed $\theta_{SA}$ in $\mathrm{^\circ C/W}$?
::: solution
$\theta_{JA} \le (125 - 40)/15 = 5.67\,\mathrm{^\circ C/W}$, so $\theta_{SA} \le 5.67 - 1.4 = 4.27\,\mathrm{^\circ C/W}$ — a sizeable finned heat sink, or a small one with a fan.
:::
:::

::: exercise Choosing the supply {level=2}
A class B amplifier must deliver $50\,\mathrm{W}$ into $4\,\Omega$, with $2.5\,\mathrm{V}$ of headroom. Find $V_{CC}$, the peak output current, the full-power efficiency and the worst-case dissipation per transistor.
::: solution
$V_p = \sqrt{2\times50\times4} = 20\,\mathrm{V}$, peak current $5\,\mathrm{A}$, $V_{CC} = 22.5\,\mathrm{V}$. $\eta = \pi\times20/(4\times22.5) = 69.8\,\%$ ($P_S = 71.6\,\mathrm{W}$). The worst-case total dissipation is $2\times22.5^2/(\pi^2\times4) = 25.6\,\mathrm{W}$, $12.8\,\mathrm{W}$ per transistor.
:::
:::

::: exercise The product law {level=2}
A class AB stage has $I_Q = 10\,\mathrm{mA}$. Find the collector currents of both transistors when the load current is (a) $10\,\mathrm{mA}$ and (b) $-200\,\mathrm{mA}$ (flowing out of the load into the stage).
::: solution
Solve $i_N - i_P = i_L$ and $i_Ni_P = I_Q^2 = 10^{-4}\,\mathrm{A^2}$: $i_N = i_L/2 + \sqrt{i_L^2/4 + I_Q^2}$. (a) $i_N = 5 + \sqrt{25 + 100} = 16.2\,\mathrm{mA}$, $i_P = 6.2\,\mathrm{mA}$. (b) $i_N = -100 + \sqrt{10^4 + 100} = 0.50\,\mathrm{mA}$, $i_P = 200.5\,\mathrm{mA}$. The non-conducting side never turns off completely.
:::
:::

::: exercise An inductor-fed class A stage {#exr-inductor-fed level=3}
A class A common-emitter stage feeds a resistive load $R_L$ from a single supply $V_{CC}$ through an ideal inductor (DC current flows through the inductor; the load is AC-coupled through a large capacitor). The transistor is biased at $I_C = V_{CC}/R_L$. (a) Show that the collector voltage can swing between $0$ and $2V_{CC}$. (b) Show that the maximum efficiency is $50\,\%$. (c) What is the transistor dissipation at full output and at rest?
::: solution
(a) The inductor has no DC voltage across it, so the quiescent collector voltage is $V_{CC}$. The inductor forces a constant current $I_C$; a signal current $i_c$ in the transistor diverts $-i_c$ through the capacitor into $R_L$, so $v_C = V_{CC} - i_cR_L$, which can swing from $0$ (at $i_c = I_C$) to $2V_{CC}$ (at $i_c = -I_C$, transistor off).

(b) $P_S = V_{CC}I_C = V_{CC}^2/R_L$ and the maximum $P_L = V_{CC}^2/(2R_L)$ ($V_p = V_{CC}$), so $\eta_{\max} = 50\,\%$.

(c) The transistor dissipates $P_S - P_L$: $V_{CC}^2/(2R_L)$ at full output and $V_{CC}^2/R_L$ at rest. As for every class A stage, the transistor runs coolest when delivering the most power.
:::
:::

::: exercise A complete stage design {level=3}
Design a class AB output stage for $10\,\mathrm{W}$ into $8\,\Omega$ with $2\,\mathrm{V}$ headroom and $I_Q = 30\,\mathrm{mA}$. The output transistors have $\beta \ge 40$ at the peak current; the bias is a $V_{BE}$ multiplier fed by a $5\,\mathrm{mA}$ current source, its transistor having $V_{BE} = 0.62\,\mathrm{V}$, and the output transistors need $V_{BE} = 0.66\,\mathrm{V}$ each at $30\,\mathrm{mA}$. (a) Choose $V_{CC}$. (b) Find the peak base current and comment on the $5\,\mathrm{mA}$ source. (c) Design the multiplier with $1\,\mathrm{mA}$ in its resistors. (d) Find the worst-case dissipation per output transistor.
::: hint
At the positive peak, the current source must supply the base current of $Q_N$ as well as keep the multiplier running.
:::
::: solution
(a) $V_p = \sqrt{2\times10\times8} = 12.6\,\mathrm{V}$, peak current $1.58\,\mathrm{A}$; $V_{CC} = 14.6\,\mathrm{V}$, say $15\,\mathrm{V}$.

(b) The peak base current is $1.58/41 = 38.6\,\mathrm{mA}$, far more than $5\,\mathrm{mA}$. On positive peaks the source cannot drive $Q_N$, and the output clips. Either raise the source to about $50\,\mathrm{mA}$ (wasteful) or, as is usual, replace each output transistor by a Darlington or Sziklai pair, so that the driver current is divided by a second factor of $\beta$; then $V_{BB}$ must cover four $V_{BE}$ drops (about $2.6\,\mathrm{V}$).

(c) For single transistors, $V_{BB} = 2\times0.66 = 1.32\,\mathrm{V}$. $R_2 = 0.62\,\mathrm{V}/1\,\mathrm{mA} = 620\,\Omega$, and $R_1 = (1.32 - 0.62)/1\,\mathrm{mA} = 700\,\Omega$ (make it a $560\,\Omega$ resistor plus a $250\,\Omega$ trimmer to set $I_Q$). The multiplier transistor then carries the remaining $4\,\mathrm{mA}$ at rest.

(d) With $V_{CC} = 15\,\mathrm{V}$, $P_{D,\max} = 2\times225/(\pi^2\times8) = 5.70\,\mathrm{W}$ in total, $2.85\,\mathrm{W}$ per transistor, plus the quiescent $15\,\mathrm{V}\times30\,\mathrm{mA} = 0.45\,\mathrm{W}$ each, about $3.3\,\mathrm{W}$ per transistor.
:::
:::
