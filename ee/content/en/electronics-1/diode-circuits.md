Open the plastic case of an old mains adapter and you find a transformer, four small black cylinders with a silver band at one end, a large electrolytic capacitor and perhaps a three-legged regulator. The four cylinders are diodes, and they do the essential job: they let current through in one direction only, so that the alternating voltage from the transformer can charge the capacitor but the capacitor cannot discharge back into the transformer. The same one-way property, used in different arrangements, detects radio signals, protects the inputs of integrated circuits from static discharge, shifts the level of a waveform, doubles a voltage and holds a reference voltage constant while the supply wanders.

The physics of the pn junction — why the current grows exponentially with forward voltage and is tiny in reverse — is the subject of [[semiconductor-devices/pn-junction]]. In this chapter we take that result as given and ask a circuit designer's question: *how simple a model of the diode can I use and still get the right answer?* We build a ladder of models, from the ideal switch to the full exponential, learn how to solve circuits with each, and then use them to analyse and design rectifiers, peak detectors, clippers, clampers and Zener regulators. The circuit tools are those of [[circuits-1/resistive-circuits]] and [[circuits-1/network-theorems]]: KVL, KCL and Thévenin equivalents, applied one piece of a piecewise model at a time.

## A ladder of diode models

A diode has two terminals, the **anode** and the **cathode** (the end marked with a band). We write $v_D$ for the voltage from anode to cathode and $i_D$ for the current flowing into the anode, so that forward conduction means $v_D > 0$ and $i_D > 0$.

### The exponential model

For a silicon junction diode the measured characteristic is described over many decades of current by the **Shockley diode equation** derived in [[semiconductor-devices/pn-junction]]:

$$
i_D = I_S\left(e^{v_D/(nV_T)} - 1\right).
$$ {#eq-shockley}

Here $I_S$ is the **saturation current**, proportional to the junction area and strongly dependent on temperature; for a small-signal silicon diode it is of order $10^{-15}$ to $10^{-13}\,\mathrm{A}$ at room temperature. The **thermal voltage** is $V_T = kT/q$, which is $25.9\,\mathrm{mV}$ at $300\,\mathrm{K}$; in hand calculations we round it to $26\,\mathrm{mV}$. The **ideality factor** $n$ lies between $1$ and $2$; for integrated junctions and in the transistor equations of later chapters it is very close to $1$, and we take $n = 1$ unless stated otherwise.

For $v_D$ more than about $4V_T \approx 0.1\,\mathrm{V}$ the $-1$ is negligible and $i_D \approx I_S e^{v_D/V_T}$. Inverting,

$$
v_D = V_T \ln\frac{i_D}{I_S}, \qquad v_{D2} - v_{D1} = V_T\ln\frac{I_2}{I_1}.
$$ {#eq-log}

The second form is the useful one: it involves only a ratio of currents. A factor of $10$ in current changes the forward voltage by $V_T\ln 10 = 59.9\,\mathrm{mV}$ — "$60\,\mathrm{mV}$ per decade". Over the three decades from $10\,\mathrm{\mu A}$ to $10\,\mathrm{mA}$ the voltage of a typical small diode changes only from about $0.5$ to $0.7\,\mathrm{V}$. That is why, seen on a linear scale, a diode appears to "turn on" sharply near $0.6$–$0.7\,\mathrm{V}$, although mathematically there is no threshold at all.

Two temperature facts matter in practice. At constant current, the forward voltage of a silicon diode *falls* by about $2\,\mathrm{mV}$ per kelvin, because $I_S$ roughly doubles every $5\,\mathrm{K}$; and in reverse bias the leakage current, ideally $-I_S$, is in real diodes dominated by generation in the depletion region and is larger, though still in the nanoampere range for small silicon devices. Beyond a reverse voltage $V_{ZK}$ the junction **breaks down** and conducts heavily in reverse; ordinary rectifier diodes must be kept out of breakdown, while Zener diodes are designed to work there (see the last section).

### The ideal diode and the constant-voltage-drop model

::: definition Ideal diode {#def-ideal-diode}
An **ideal diode** is a two-terminal element that is a short circuit ($v_D = 0$, any $i_D \ge 0$) when forward biased and an open circuit ($i_D = 0$, any $v_D \le 0$) when reverse biased. Its characteristic is the two half-axes $\{v_D = 0, i_D \ge 0\}$ and $\{i_D = 0, v_D \le 0\}$.
:::

The ideal diode is a perfect one-way valve. It is the right model when the voltages in the circuit are large compared with $0.7\,\mathrm{V}$ — a rectifier fed from $325\,\mathrm{V}$ peak mains, for example — and it captures the *logic* of every diode circuit: which diodes conduct, and when.

::: definition Constant-voltage-drop and piecewise-linear models {#def-cvd}
The **constant-voltage-drop** (CVD) model replaces a conducting diode by a battery of voltage $V_{D0}$ (typically $0.7\,\mathrm{V}$ for silicon, $0.3\,\mathrm{V}$ for a Schottky diode, $1.8$–$3.3\,\mathrm{V}$ for an LED) and a non-conducting diode by an open circuit. The **piecewise-linear** model adds a series resistance $r_D$: for $v_D > V_{D0}$, $i_D = (v_D - V_{D0})/r_D$, and $i_D = 0$ otherwise.
:::

Each model is a straight-line approximation to [[#eq-shockley]] over some range of current. The CVD model is accurate to a few tens of millivolts over two decades of current, which is good enough for nearly all bias calculations.

### Solving a circuit with a diode

Whatever the model, the method for a piecewise model is the same.

::: algorithm Assumed-state analysis {#alg-assumed-state}
1. **Guess** the state of each diode (on or off).
2. Replace each "on" diode by its on-model (short, battery, or battery plus $r_D$) and each "off" diode by an open circuit, and solve the resulting linear circuit.
3. **Check** every guess: an "on" diode must carry $i_D > 0$ (in its forward direction); an "off" diode must have $v_D$ below its turn-on voltage.
4. If any check fails, change that guess and repeat. With $k$ diodes there are at most $2^k$ combinations, and physical reasoning usually picks the right one first.
:::

For the exponential model the circuit equations are nonlinear and we solve them graphically or by iteration. Reduce everything except the diode to its Thévenin equivalent $V_{TH}$ in series with $R_{TH}$. KVL gives the **load line**

$$
i_D = \frac{V_{TH} - v_D}{R_{TH}},
$$ {#eq-loadline}

a straight line through $(V_{TH}, 0)$ and $(0, V_{TH}/R_{TH})$. The **operating point**, or **quiescent point** (Q-point), is its intersection with the diode characteristic.

::: widget plot
f: 1e-11*(exp(x/0.026) - 1); (VDD - x)/R
x: 0, 1
y: 0, 10
sliders: VDD=5:1:10:0.1; R=1:0.2:5:0.1
labels: i_D\ (\mathrm{mA}); \text{load line}
caption: Diode characteristic with $I_S = 10^{-14}\,\mathrm{A}$ (current in mA, voltage in volts) and the load line of a source $V_{DD}$ (V) in series with $R$ (kΩ). Change $V_{DD}$ and $R$: the current at the intersection changes a great deal, but the diode voltage barely moves from about $0.7\,\mathrm{V}$. That is the justification for the constant-voltage-drop model.
:::

Rather than read the intersection off a graph, we can iterate: guess $v_D$, compute $i_D$ from the load line, update $v_D = V_T\ln(i_D/I_S)$, and repeat. Because the diode voltage depends only logarithmically on the current, this converges in two or three steps.

::: example One circuit, three models {#ex-three-models}
A $5\,\mathrm{V}$ source drives a diode through $R = 1\,\mathrm{k\Omega}$. The diode has $I_S = 10^{-14}\,\mathrm{A}$ and $n = 1$; take $V_T = 26\,\mathrm{mV}$. Find $I_D$ and $V_D$ with the ideal model, the CVD model with $V_{D0} = 0.7\,\mathrm{V}$, and the exponential model.
::: solution
**Ideal.** The diode is on (the source pushes current in its forward direction), $V_D = 0$ and $I_D = 5\,\mathrm{V}/1\,\mathrm{k\Omega} = 5\,\mathrm{mA}$.

**CVD.** $V_D = 0.7\,\mathrm{V}$ and $I_D = (5 - 0.7)/1000 = 4.30\,\mathrm{mA}$. The check $I_D > 0$ is satisfied.

**Exponential.** Start from the CVD answer. With $I_D = 4.30\,\mathrm{mA}$,

$$
V_D = V_T\ln\frac{I_D}{I_S} = 0.026\ln\frac{4.30\times10^{-3}}{10^{-14}} = 0.026 \times 26.79 = 0.6965\,\mathrm{V}.
$$

The load line then gives $I_D = (5 - 0.6965)/1000 = 4.3035\,\mathrm{mA}$, and one more step changes $V_D$ by less than $0.1\,\mathrm{\mu V}$. So $V_D = 0.696\,\mathrm{V}$ and $I_D = 4.30\,\mathrm{mA}$.

The CVD model is within $0.1\,\%$ of the exponential answer for the current; the ideal model is $16\,\%$ high. The error of the ideal model is $V_{D0}/V_{DD}$, which is why it is used only when the circuit voltages are much larger than a diode drop.
:::
:::

### Small-signal resistance

Often a diode carries a DC current $I_D$ with a small variation $i_d$ superimposed. Expanding [[#eq-shockley]] to first order about the operating point, the variation in current is proportional to the variation in voltage, $i_d = v_d/r_d$, with

$$
r_d = \left(\frac{\mathrm{d}i_D}{\mathrm{d}v_D}\right)^{-1}_{Q} = \frac{nV_T}{I_D}.
$$ {#eq-rd}

At $1\,\mathrm{mA}$ the **small-signal resistance** is $26\,\Omega$; at $10\,\mathrm{\mu A}$ it is $2.6\,\mathrm{k\Omega}$. The approximation is good when $\abs{v_d} \ll V_T$, say below $5\,\mathrm{mV}$ for $10\,\%$ accuracy. Small-signal models are the main theme of [[electronics-1/small-signal-amplifiers]]; this is their simplest instance.

::: warning $r_d$ is not $V_D/I_D$
The ratio $V_D/I_D$ of the bias values — $0.7\,\mathrm{V}/1\,\mathrm{mA} = 700\,\Omega$ — is the slope of a line from the origin to the Q-point and describes nothing useful. The small-signal resistance is the *slope of the tangent*, $V_T/I_D = 26\,\Omega$, and it is the one that tells you how the voltage responds to a change of current. Confusing the two is the commonest error in the first weeks of electronics.
:::

## Rectifiers

A **rectifier** converts an alternating voltage into one of a single polarity. It is the first stage of almost every power supply connected to the mains.

### Half-wave and full-wave rectifiers

In the **half-wave rectifier** a diode connects a sinusoidal source $v_S = V_s\sin\omega t$ to a load resistor $R$. While $v_S > V_{D0}$ the diode conducts and $v_O = v_S - V_{D0}$; during the negative half-cycle it is reverse biased and $v_O = 0$. The output is a train of positive half-sines of peak $V_s - V_{D0}$, with average value

$$
V_{O,\text{avg}} \approx \frac{1}{2\pi}\int_0^\pi (V_s - V_{D0})\sin\theta\,\mathrm{d}\theta = \frac{V_s - V_{D0}}{\pi}
$$

(slightly less, because the diode conducts only once $v_S$ exceeds $V_{D0}$).

A **full-wave rectifier** uses both half-cycles. The **bridge rectifier** has four diodes: $D_1$ and $D_2$ conduct when the upper terminal of the source is positive, $D_3$ and $D_4$ when it is negative, and in both cases the current flows through the load in the same direction. The output is $\abs{v_S}$ minus *two* diode drops, with average $2(V_s - 2V_{D0})/\pi$ and a fundamental ripple frequency of $2f$. The older **centre-tapped** arrangement uses a transformer with a centre-tapped secondary and two diodes, so each conduction path contains only one diode, at the price of a transformer winding of twice the voltage.

A diode must also survive the reverse voltage it sees when off. The **peak inverse voltage** (PIV) of each diode is $V_s$ for a half-wave rectifier with a resistive load, $V_s - V_{D0}$ for a bridge, and $2V_s - V_{D0}$ for the centre-tapped circuit. Adding a filter capacitor changes these values, as we shall see. Diodes are chosen with a reverse-voltage rating comfortably — typically $50$–$100\,\%$ — above the PIV to survive mains transients.

### The capacitor-input filter

A half-sine train is not yet DC. Place a capacitor $C$ across the load $R$. During the first quarter-cycle the diode conducts and charges $C$ to the peak $V_p = V_s - V_{D0}$. As $v_S$ falls, the diode becomes reverse biased (its anode is below its cathode, which is held up by the capacitor), and $C$ discharges through $R$ with time constant $RC$ ([[circuits-1/first-order-circuits]]). The output decays until $v_S$ rises again past it, the diode turns on briefly, and the capacitor is topped up to $V_p$. The output is DC with a sawtooth-like **ripple** of peak-to-peak value $V_r$.

::: proposition Ripple of a capacitor-input filter {#prop-ripple}
Let a rectifier with output peak $V_p$ feed a capacitor $C$ in parallel with a load drawing current $I_L \approx V_p/R$, and assume $RC \gg T = 1/f$. Then the peak-to-peak ripple is

$$
V_r \approx \frac{I_L}{f C} = \frac{V_p}{fRC}\ \ \text{(half-wave)}, \qquad V_r \approx \frac{I_L}{2fC} = \frac{V_p}{2fRC}\ \ \text{(full-wave)},
$$ {#eq-ripple}

the average output is about $V_p - V_r/2$, and the diode conducts during an interval $\Delta t$ before each peak with

$$
\omega\,\Delta t \approx \sqrt{2V_r/V_p}.
$$ {#eq-conduction}
:::

::: proof
Between peaks the diode is off and $v_O(t) = V_p e^{-t/RC}$, measured from the peak. Because conduction is short, the discharge lasts almost a full period $T$ (half-wave) or half a period $T/2$ (full-wave). With $RC \gg T$, $e^{-x} \approx 1 - x$, so for the half-wave case

$$
V_r = V_p - V_p e^{-T/RC} \approx V_p\frac{T}{RC} = \frac{V_p}{fRC},
$$

and with $T/2$ instead of $T$ for the full-wave case. Equivalently, the capacitor supplies an almost constant current $I_L$ and loses charge $I_L T = CV_r$. Since the decay is nearly linear, the average is midway between $V_p$ and $V_p - V_r$.

Conduction starts when the rising input $V_p\cos(\omega\Delta t)$, measured from the peak, equals the decayed output $V_p - V_r$. For small $\omega\Delta t$, $\cos\theta \approx 1 - \theta^2/2$, so $V_p\theta^2/2 = V_r$ and $\theta = \omega\Delta t = \sqrt{2V_r/V_p}$.
:::

The conduction interval is short, and that has a consequence that surprises everyone the first time. All the charge the load uses in a whole period must be delivered through the diode during $\Delta t$, so the diode current comes in tall, narrow pulses. For the full-wave case, charge balance over a half-period, $I_{D,\text{avg}}\Delta t = I_L(T/2 + \Delta t)$, gives an average diode current during conduction of $I_L\bigl(1 + \pi\sqrt{V_p/(2V_r)}\bigr)$, and the peak (at the start of conduction, where $C\,\mathrm{d}v/\mathrm{d}t$ is largest) is about

$$
I_{D,\max} \approx I_L\left(1 + \pi\sqrt{2V_p/V_r}\right) \quad\text{(full-wave)},
$$ {#eq-idmax}

with $2\pi$ in place of $\pi$ for the half-wave circuit. With $V_p/V_r = 10$ the peak is about $15$ times the load current.

::: widget plot
f: 17*abs(sin(0.1*pi*x)); max(17*abs(sin(0.1*pi*x)), 17*exp(-mod(x + 5, 10)/(R*C/1000)))
x: 0, 60
y: 0, 18
sliders: C=1000:100:4700:100; R=100:20:1000:10
labels: \lvert v_S\rvert\ (\mathrm{V}); v_O\ (\mathrm{V})
caption: Full-wave rectifier with ideal diodes on $50\,\mathrm{Hz}$ (time in ms) and $17\,\mathrm{V}$ peak, filter capacitor $C$ (μF) and load $R$ (Ω). Reduce $C$ or $R$ and watch the ripple grow roughly in proportion to $1/(RC)$. Notice how short the interval is during which $v_O$ follows $\lvert v_S\rvert$ upward: that is the only time the diodes conduct.
:::

::: example A half-wave supply {#ex-halfwave}
A transformer delivers $12\,\mathrm{V}$ rms at $50\,\mathrm{Hz}$ to a half-wave rectifier with a $1000\,\mathrm{\mu F}$ capacitor and a $500\,\Omega$ load. Using the CVD model with $0.7\,\mathrm{V}$, find the peak output, the ripple, the average output and the diode PIV.
::: solution
The secondary peak is $V_s = 12\sqrt2 = 16.97\,\mathrm{V}$, so $V_p = 16.97 - 0.7 = 16.27\,\mathrm{V}$. Check the assumption: $RC = 500 \times 10^{-3} = 0.5\,\mathrm{s} \gg T = 20\,\mathrm{ms}$. By [[#eq-ripple]],

$$
V_r = \frac{V_p}{fRC} = \frac{16.27}{50 \times 500 \times 10^{-3}} = 0.651\,\mathrm{V},
$$

and the average output is $16.27 - 0.33 = 15.95\,\mathrm{V}$. When the source is at its negative peak, the cathode of the diode is held at about $V_p$ by the capacitor and the anode is at $-V_s$, so the PIV is $V_s + V_p \approx 2V_s = 33.2\,\mathrm{V}$. A $50\,\mathrm{V}$ diode is the minimum; the ubiquitous $1\,\mathrm{A}$, $400\,\mathrm{V}$ type gives ample margin.
:::
:::

::: example Designing a 12 V bridge supply {#ex-bridge-design}
Design an unregulated supply that delivers $0.5\,\mathrm{A}$ at about $12\,\mathrm{V}$ with at most $1\,\mathrm{V}$ peak-to-peak ripple from $50\,\mathrm{Hz}$ mains, using a bridge rectifier ($0.7\,\mathrm{V}$ per diode) and a standard transformer. Find the capacitor, the conduction interval and the peak diode current.
::: solution
**Transformer.** We need $V_p - V_r/2 \gtrsim 12\,\mathrm{V}$, so $V_p \approx 12.5\,\mathrm{V}$ and the secondary peak must be $12.5 + 1.4 = 13.9\,\mathrm{V}$, or $9.8\,\mathrm{V}$ rms. The nearest standard secondary is $10\,\mathrm{V}$ rms, giving $V_s = 14.14\,\mathrm{V}$ and $V_p = 14.14 - 1.4 = 12.74\,\mathrm{V}$.

**Capacitor.** From [[#eq-ripple]] for full-wave, $C = I_L/(2fV_r) = 0.5/(2\times 50\times 1) = 5000\,\mathrm{\mu F}$. Take the next standard value up, $6800\,\mathrm{\mu F}$ (electrolytic capacitors have tolerances of $\pm20\,\%$), rated at $25\,\mathrm{V}$. Then $V_r = 0.5/(100 \times 6.8\times10^{-3}) = 0.735\,\mathrm{V}$ and the average output is $12.74 - 0.37 = 12.37\,\mathrm{V}$.

**Conduction.** By [[#eq-conduction]], $\omega\Delta t = \sqrt{2 \times 0.735/12.74} = 0.340\,\mathrm{rad}$, so $\Delta t = 0.340/(2\pi\times 50) = 1.08\,\mathrm{ms}$ out of each $10\,\mathrm{ms}$ half-period.

**Diode current.** By [[#eq-idmax]] the peak is $0.5\bigl(1 + \pi\sqrt{2\times12.74/0.735}\bigr) = 0.5(1 + 18.5) = 9.8\,\mathrm{A}$. The diodes need a repetitive surge rating of about $10\,\mathrm{A}$ — a $3\,\mathrm{A}$ bridge rectifier is a typical choice — and the transformer must be rated for the high RMS current these pulses imply, well above $0.5\,\mathrm{A}$. Making the ripple smaller with a larger capacitor makes the pulses narrower and taller still.
:::
:::

::: application Why chargers have power-factor correction
The narrow current pulses of a capacitor-input rectifier are rich in harmonics and give a poor power factor ([[circuits-2/ac-power]]): a typical value is $0.5$–$0.7$. One such load does little harm, but millions of them distort the mains waveform. Standards such as IEC 61000-3-2 therefore limit the harmonic currents of equipment above $75\,\mathrm{W}$, and larger power supplies place an active boost converter after the bridge that shapes the input current into a sinusoid ([[power-electronics]]).
:::

::: quiz
In a full-wave rectifier with a filter capacitor, you double the load current while keeping $C$ and the transformer unchanged. What happens to the ripple and to the peak diode current?
- [ ] The ripple halves and the peak diode current is unchanged.
- [ ] The ripple doubles and the peak diode current doubles exactly.
- [x] The ripple doubles and the peak diode current rises, but by less than a factor of two.
- [ ] Neither changes, because the capacitor is recharged to $V_p$ every half-cycle.
::: solution
By [[#eq-ripple]] the ripple $I_L/(2fC)$ is proportional to $I_L$, so it doubles. The peak diode current is $I_L(1 + \pi\sqrt{2V_p/V_r})$: the factor $I_L$ doubles, but $V_r$ doubles too, so the square root falls by $\sqrt2$. The net effect is an increase by roughly $\sqrt2$ — the conduction interval widens, so the pulse can be lower than twice as tall.
:::
:::

## Peak detectors, clippers and clampers

The same few components — a diode, a capacitor, perhaps a resistor and a reference voltage — process signals as well as power.

### Peak detectors and envelope detectors

The half-wave rectifier with capacitor is a **peak detector**: with no load, $C$ charges to the highest value the input has reached (less $V_{D0}$) and holds it. With a resistor across $C$, the output follows the *envelope* of a modulated signal, provided the time constant is long compared with the carrier period and short compared with the period of the modulation:

$$
\frac{1}{f_c} \ll RC \ll \frac{1}{f_m}.
$$

This is the **envelope detector** of an AM radio receiver ([[communication-systems]]). For a $1\,\mathrm{MHz}$ carrier with audio up to $5\,\mathrm{kHz}$, $RC = 20\,\mathrm{\mu s}$ — twenty carrier periods, and a tenth of the shortest audio period of $200\,\mathrm{\mu s}$ — is a reasonable compromise.

### Clippers

A **clipper** or **limiter** prevents a signal from exceeding a set level. A series resistor $R$ feeds the output node, and a diode in series with a battery $V_B$ connects the output to ground. While $v_I < V_B + V_{D0}$ the diode is off, no current flows in $R$ and $v_O = v_I$. Above that level the diode conducts and clamps the output at $V_B + V_{D0}$, the excess voltage appearing across $R$. A second diode and battery in the opposite direction limits the negative excursion as well. The **transfer characteristic** $v_O(v_I)$ has unity slope between the limits and is flat (slope $r_D/(R + r_D)$, in the piecewise-linear model) beyond them.

::: widget plot
f: x; max(min(x, VB + 0.7), -(VB + 0.7))
x: -10, 10
y: -10, 10
sliders: VB=2:0:6:0.1
labels: v_I; v_O
caption: Transfer characteristic of a symmetrical clipper: a series resistor and two diode–battery branches to ground, each with battery $V_B$ (slider, volts) and a $0.7\,\mathrm{V}$ diode drop. Set $V_B = 0$: the output is limited to $\pm 0.7\,\mathrm{V}$, the anti-parallel diode protection used at amplifier and ADC inputs. A sinusoid of peak $10\,\mathrm{V}$ applied to this circuit comes out with its tops flattened.
:::

::: example Input protection with two diodes {#ex-protection}
The input of an amplifier is protected by a $1\,\mathrm{k\Omega}$ series resistor followed by two anti-parallel silicon diodes to ground. A fault applies $v_I = 5\sin\omega t\,\mathrm{V}$. Using the CVD model, sketch $v_O$ and find the peak diode current and the peak power in the resistor.
::: solution
For $\abs{v_I} < 0.7\,\mathrm{V}$ both diodes are off and $v_O = v_I$. When $v_I > 0.7\,\mathrm{V}$ the diode pointing from the output to ground conducts and $v_O = 0.7\,\mathrm{V}$; when $v_I < -0.7\,\mathrm{V}$ the other conducts and $v_O = -0.7\,\mathrm{V}$. The output is a sinusoid with its tops cut flat at $\pm0.7\,\mathrm{V}$.

At the input peak the resistor carries $(5 - 0.7)/1000 = 4.3\,\mathrm{mA}$, which is the peak diode current, and dissipates $(4.3)^2 \times 10^{-6} \times 1000 = 18.5\,\mathrm{mW}$ at that instant. A real amplifier input, with internal ESD diodes rated for perhaps $10\,\mathrm{mA}$, survives this fault; without the resistor it would not. (With the exponential model and $I_S = 10^{-14}\,\mathrm{A}$ the clamp level at $4.3\,\mathrm{mA}$ is $0.70\,\mathrm{V}$, as in [[#ex-three-models]], so the CVD answer stands.)
:::
:::

### Clampers and voltage doublers

A **clamper** shifts a waveform up or down without changing its shape. A capacitor $C$ is in series between input and output, and a diode connects the output to ground with its anode at ground. On the first negative peak of $v_I = V_s\sin\omega t$, the diode conducts and charges $C$ to $V_s$ (ideal diode), with the polarity that makes the output end positive relative to the input end. Afterwards the diode never conducts again (if there is no load), and the output is

$$
v_O = v_I + V_s = V_s(1 + \sin\omega t),
$$

a sinusoid swinging between $0$ and $2V_s$: its negative peaks have been **clamped** to zero. This is also called DC restoration, and was used in television receivers to fix the black level of the video signal. With a load resistor the capacitor discharges a little each cycle and the diode tops it up, as in the rectifier; the requirement is $RC \gg T$.

Follow a clamper by a peak detector and the second capacitor charges to $2V_s$: this is the **voltage doubler**. Cascading such stages gives the Cockcroft–Walton multiplier, used to generate tens or hundreds of kilovolts for X-ray tubes and particle accelerators, and, at small scale, the charge pumps that power the flash memory in your phone.

::: warning Which way round is the diode?
In a clamper, reversing the diode clamps the *positive* peaks to zero instead, giving $v_O$ between $-2V_s$ and $0$. In a rectifier, reversing it gives a negative supply. Always find the conducting interval by asking which way the source pushes current, and then the polarity of the capacitor voltage follows. Drawing the capacitor's charge with $+$ and $-$ signs on the schematic avoids nearly all sign errors.
:::

## Zener diodes and voltage regulators

The reverse breakdown of a pn junction is abrupt: beyond the **breakdown voltage** the current rises steeply while the voltage hardly changes. A **Zener diode** is a junction made to break down at a well-defined voltage $V_Z$, between about $2.4$ and $200\,\mathrm{V}$, and to survive operating there indefinitely as long as its power rating is respected. Below about $5\,\mathrm{V}$ the mechanism is quantum-mechanical tunnelling (the Zener effect), above about $7\,\mathrm{V}$ it is avalanche multiplication; between the two both contribute, and their opposite temperature coefficients nearly cancel, which is why $5.6$–$6.2\,\mathrm{V}$ Zeners are the most temperature-stable ([[semiconductor-devices/pn-junction]]).

::: definition Zener diode model {#def-zener}
In breakdown, with the current $I_Z$ flowing from cathode to anode, a Zener diode is modelled by a battery $V_{Z0}$ in series with its **dynamic resistance** $r_z$:

$$
V_Z = V_{Z0} + r_z I_Z, \qquad I_Z \ge I_{ZK},
$$ {#eq-zener}

where the **knee current** $I_{ZK}$ is the smallest current at which the model holds. Data sheets give $V_Z$ at a test current $I_{ZT}$, the dynamic resistance $r_z$ (a few ohms to tens of ohms) and the maximum power $P_{Z,\max}$.
:::

### The shunt regulator

The simplest regulator places a resistor $R$ between an unregulated supply $V_S$ and the output node, with the Zener from output to ground (cathode at the output) and the load $R_L$ in parallel with it. The resistor current $I_R = (V_S - V_O)/R$ splits between the Zener and the load: $I_R = I_Z + I_L$. When the load takes more current, the Zener takes less, and the output stays near $V_Z$ — as long as $I_Z$ stays above the knee.

::: theorem Line and load regulation of the Zener shunt regulator {#thm-zener-regulation}
With the Zener in breakdown and modelled by [[#eq-zener]], the output of the shunt regulator is

$$
V_O = \frac{r_z}{R + r_z}V_S + \frac{R}{R + r_z}V_{Z0} - (R\parallel r_z)\,I_L.
$$ {#eq-zener-out}

The **line regulation** is $\Delta V_O/\Delta V_S = r_z/(R + r_z)$ and the **load regulation** is $\Delta V_O/\Delta I_L = -(R\parallel r_z)$.
:::

::: proof
KCL at the output node, with $I_Z = (V_O - V_{Z0})/r_z$:

$$
\frac{V_S - V_O}{R} = \frac{V_O - V_{Z0}}{r_z} + I_L.
$$

Multiply by $R r_z$ and collect terms: $V_O(R + r_z) = r_zV_S + RV_{Z0} - R r_z I_L$. Dividing by $R + r_z$ gives [[#eq-zener-out]]; the two regulation figures are its partial derivatives. Equivalently, by Thévenin's theorem, the regulator seen from the load is a source of open-circuit voltage $(r_zV_S + RV_{Z0})/(R + r_z)$ and output resistance $R\parallel r_z$.
:::

Because $r_z \ll R$, the line regulation is small and the output resistance is about $r_z$. The design problem is to choose $R$: small enough that the Zener stays in breakdown at the lowest supply and highest load, large enough that it does not overheat at the highest supply and lowest load.

::: algorithm Design of a Zener shunt regulator {#alg-zener-design}
1. From the worst case for *regulation* — minimum supply $V_{S,\min}$, maximum load $I_{L,\max}$ — require $I_Z \ge I_{Z,\min}$ (above the knee, usually a few milliamperes):
   $$
   R \le \frac{V_{S,\min} - V_Z}{I_{L,\max} + I_{Z,\min}}.
   $$
2. Choose the next standard resistor value *below* this limit.
3. From the worst case for *dissipation* — maximum supply, minimum load (often zero) — compute $I_{Z,\max} = (V_{S,\max} - V_Z)/R - I_{L,\min}$ and check $V_Z I_{Z,\max} \le P_{Z,\max}$ with margin. Check the resistor's power $(V_{S,\max} - V_Z)^2/R$ too.
4. Estimate line and load regulation from [[#thm-zener-regulation]].
:::

::: example A 6.8 V regulator {#ex-zener-design}
Design a shunt regulator for a $6.8\,\mathrm{V}$ output from a supply between $13.5$ and $16.5\,\mathrm{V}$ ($15\,\mathrm{V} \pm 10\,\%$), for loads from $0$ to $50\,\mathrm{mA}$. The Zener has $r_z = 5\,\Omega$ and needs at least $5\,\mathrm{mA}$. Ignore $r_z$ when sizing $R$.
::: solution
**Step 1.** $R \le (13.5 - 6.8)/(50 + 5)\,\mathrm{mA} = 6.7/0.055 = 121.8\,\Omega$.

**Step 2.** Choose $R = 120\,\Omega$ (E12 series). At the worst case, $I_R = 6.7/120 = 55.8\,\mathrm{mA}$ and $I_Z = 5.8\,\mathrm{mA}$, which is enough. If the resistor has a $5\,\%$ tolerance, $126\,\Omega$ would give $I_Z = 3.2\,\mathrm{mA}$; for a robust design use a $1\,\%$ resistor or the next value down, $100\,\Omega$, at the cost of more dissipation.

**Step 3.** At $V_S = 16.5\,\mathrm{V}$ with no load, all of $I_R = 9.7/120 = 80.8\,\mathrm{mA}$ flows in the Zener, which dissipates $6.8 \times 0.0808 = 0.55\,\mathrm{W}$. A $0.5\,\mathrm{W}$ Zener is not enough; use a $1\,\mathrm{W}$ part (for example one of the common 1N47xx series). The resistor dissipates $9.7^2/120 = 0.78\,\mathrm{W}$, so it needs at least a $1\,\mathrm{W}$ rating, preferably $2\,\mathrm{W}$.

**Step 4.** Line regulation: $r_z/(R + r_z) = 5/125 = 0.040$, that is $40\,\mathrm{mV}$ of output change per volt of input. A $\pm1.5\,\mathrm{V}$ supply variation moves the output by $\pm60\,\mathrm{mV}$. Load regulation: $-(120\parallel5) = -4.8\,\Omega$, so the full $50\,\mathrm{mA}$ step in load lowers the output by $0.24\,\mathrm{V}$. The ripple of a rectifier supply is attenuated by the same factor of $0.04$ (about $28\,\mathrm{dB}$).
:::
:::

The example shows the weakness of the shunt regulator: it wastes power. With no load, the full worst-case current still flows, and its output resistance of a few ohms is mediocre. In real supplies the Zener (or a more precise bandgap reference) only sets a reference voltage at a small current, and a transistor follower ([[electronics-1/single-stage-amplifiers]]) or an integrated linear regulator delivers the load current.

::: quiz
In the regulator of [[#ex-zener-design]], the load is accidentally short-circuited. What current flows and is anything damaged?
- [ ] No current flows, because the Zener protects the circuit.
- [x] About $V_S/R \approx 138\,\mathrm{mA}$ at the highest supply flows through $R$; the Zener is safe but $R$ dissipates about $2.3\,\mathrm{W}$.
- [ ] The Zener carries the short-circuit current and burns out.
- [ ] The current is limited to $50\,\mathrm{mA}$ by the design.
::: solution
With the output shorted, $V_O = 0$, the Zener is not in breakdown and carries nothing. The resistor current is $V_S/R = 16.5/120 = 0.1375\,\mathrm{A}$ and its dissipation $16.5^2/120 = 2.27\,\mathrm{W}$, three times what it sees in normal use. The series resistor is a crude current limit, which is one of the few virtues of this circuit; but a $1\,\mathrm{W}$ resistor will overheat.
:::
:::

::: history
The rectifying property of metal–semiconductor contacts was discovered by Ferdinand Braun in 1874, using metal sulphide crystals, and crystal detectors ("cat's whiskers") were used in radio receivers from about 1906. In 1904 John Ambrose Fleming patented the thermionic two-electrode valve as a radio detector — the first diode in the modern sense. The four-diode bridge was proposed by Karol Pollak in 1895–1896 and independently by Leo Graetz in 1897, after whom it is often named; it was built with electrolytic rectifier cells long before semiconductor diodes existed. Clarence Zener published his theory of breakdown by tunnelling in solid dielectrics in 1934, and the voltage-reference diodes developed at Bell Labs in the 1950s were named after him, although most of them break down by avalanche multiplication. The silicon junction rectifier replaced selenium and valve rectifiers through the late 1950s and 1960s.
:::

## Where this leads

The diode circuits of this chapter recur throughout electronics. The exponential law [[#eq-shockley]] is also the law of the base–emitter junction, so the load-line method and the small-signal resistance [[#eq-rd]] reappear in [[electronics-1/bjt-circuits]] and [[electronics-1/small-signal-amplifiers]]. Diode-connected transistors are the heart of [[electronics-1/current-mirrors]]. The rectifier with a capacitor filter is the input stage of [[power-electronics]], where controlled rectifiers and switching converters take over, and the envelope detector is the AM demodulator of [[communication-systems]].

::: summary
- The Shockley equation $i_D = I_S(e^{v_D/nV_T} - 1)$ gives about $60\,\mathrm{mV}$ more forward voltage per decade of current, so for circuit work a conducting silicon diode is well modelled by a constant $0.7\,\mathrm{V}$ drop.
- Solve piecewise models by assuming each diode's state and checking it; solve the exponential model by a load line or by iteration, which converges in a few steps.
- The small-signal resistance at a bias current $I_D$ is $r_d = nV_T/I_D$ ($26\,\Omega$ at $1\,\mathrm{mA}$), the slope of the tangent, not $V_D/I_D$.
- A capacitor-input rectifier has ripple $V_r \approx I_L/(fC)$ (half-wave) or $I_L/(2fC)$ (full-wave); the diodes conduct only briefly and carry peak currents many times the load current.
- The peak inverse voltage is about $2V_s$ for a half-wave rectifier with a capacitor, $V_s$ for a bridge; choose diodes with ample margin.
- Peak detectors, envelope detectors, clippers, clampers and voltage multipliers are diode–capacitor circuits analysed by asking when each diode conducts.
- A Zener shunt regulator has line regulation $r_z/(R + r_z)$ and output resistance $R\parallel r_z$; size $R$ for minimum supply and maximum load, then check Zener dissipation at maximum supply and no load.
:::

## Exercises

::: exercise An ideal diode {level=1 check="0.005"}
A $10\,\mathrm{V}$ source is connected through a $2\,\mathrm{k\Omega}$ resistor to an ideal diode, which is forward biased. Find the current, in amperes.
::: solution
An ideal forward-biased diode is a short circuit, so $I = 10/2000 = 5\,\mathrm{mA}$.
:::
:::

::: exercise An LED current-limiting resistor {level=1 check="1/220"}
A red LED with a forward drop of $2.0\,\mathrm{V}$ (CVD model) is driven from a $3.0\,\mathrm{V}$ supply through $220\,\Omega$. Find the LED current, in amperes.
::: solution
$I = (3.0 - 2.0)/220 = 4.55\,\mathrm{mA}$. A typical indicator LED is bright enough at a few milliamperes. Note how sensitive the current is to the supply: with $V_{DD} = 3.3\,\mathrm{V}$ it would be $5.9\,\mathrm{mA}$.
:::
:::

::: exercise Half-wave ripple {level=1 check="10/(60*1000*100e-6)"}
A half-wave rectifier with output peak $10\,\mathrm{V}$ on a $60\,\mathrm{Hz}$ supply feeds $100\,\mathrm{\mu F}$ in parallel with $1\,\mathrm{k\Omega}$. Estimate the peak-to-peak ripple, in volts.
::: solution
$RC = 0.1\,\mathrm{s}$ is six periods, long enough for [[#prop-ripple]]: $V_r = V_p/(fRC) = 10/(60 \times 1000 \times 10^{-4}) = 1.67\,\mathrm{V}$. (The exact exponential gives $10(1 - e^{-1/6}) = 1.54\,\mathrm{V}$, minus a little because the discharge is slightly shorter than $T$; the linear estimate is pessimistic, which is the safe side.)
:::
:::

::: exercise Forward voltage over a current range {level=2 check="0.026*ln(50)"}
A diode with $n = 1$ carries $0.1\,\mathrm{mA}$ and then $5\,\mathrm{mA}$. By how much, in volts, does its forward voltage change? Take $V_T = 26\,\mathrm{mV}$.
::: solution
By [[#eq-log]], $\Delta V = V_T\ln(5/0.1) = 0.026\ln 50 = 0.026 \times 3.912 = 0.102\,\mathrm{V}$. Fifty times the current costs only $0.1\,\mathrm{V}$.
:::
:::

::: exercise Filter capacitor for a full-wave supply {level=2 check="0.2/(2*60*0.5)"}
A bridge rectifier on a $60\,\mathrm{Hz}$ supply must deliver $200\,\mathrm{mA}$ with at most $0.5\,\mathrm{V}$ peak-to-peak ripple. What minimum filter capacitance, in farads, is needed?
::: solution
$C = I_L/(2fV_r) = 0.2/(2\times60\times0.5) = 3.33\,\mathrm{mF}$; choose $3300\,\mathrm{\mu F}$ only if the ripple specification has some slack, otherwise $4700\,\mathrm{\mu F}$.
:::
:::

::: exercise Zener currents {level=2 check="0.0243"}
A $12\,\mathrm{V}$ supply feeds an ideal $5.1\,\mathrm{V}$ Zener ($r_z = 0$) through $200\,\Omega$, and a $500\,\Omega$ load is connected across the Zener. Find the Zener current, in amperes.
::: solution
The Zener holds $V_O = 5.1\,\mathrm{V}$ (check afterwards that $I_Z > 0$). Then $I_R = (12 - 5.1)/200 = 34.5\,\mathrm{mA}$, $I_L = 5.1/500 = 10.2\,\mathrm{mA}$, and $I_Z = 34.5 - 10.2 = 24.3\,\mathrm{mA}$. It is positive, so the Zener is indeed in breakdown. (Without the Zener, the divider would give $12 \times 500/700 = 8.6\,\mathrm{V} > 5.1\,\mathrm{V}$, confirming that breakdown occurs.)
:::
:::

::: exercise A clamper {level=2 check="10"}
The input $v_I = 5\sin\omega t\,\mathrm{V}$ is applied to a series capacitor followed by an ideal diode from output to ground with its anode at ground, and no load. Find the maximum value of $v_O$ in steady state, in volts, and its average.
::: solution
On the first negative peak the diode conducts and charges the capacitor to $5\,\mathrm{V}$, output end positive. Thereafter $v_O = v_I + 5 = 5(1 + \sin\omega t)$, which ranges from $0$ to $10\,\mathrm{V}$ with average $5\,\mathrm{V}$. The maximum is $10\,\mathrm{V}$.
:::
:::

::: exercise Two diodes in series {level=3 check="0.6717"}
Two identical diodes with $I_S = 10^{-14}\,\mathrm{A}$, $n = 1$, are in series with $1\,\mathrm{k\Omega}$ across a $3\,\mathrm{V}$ source, both forward biased. Take $V_T = 26\,\mathrm{mV}$ and find the voltage across each diode, in volts, by iteration.
::: hint
Start with $V_D = 0.7\,\mathrm{V}$ per diode, so $I = (3 - 1.4)/1000$, and update $V_D = V_T\ln(I/I_S)$.
:::
::: solution
Iteration 1: $I = 1.6\,\mathrm{mA}$, $V_D = 0.026\ln(1.6\times10^{11}) = 0.6707\,\mathrm{V}$. Iteration 2: $I = (3 - 1.3414)/1000 = 1.6586\,\mathrm{mA}$, $V_D = 0.6716\,\mathrm{V}$. Iteration 3: $I = 1.6567\,\mathrm{mA}$, $V_D = 0.6717\,\mathrm{V}$, which no longer changes in the fourth digit. Each diode drops $0.672\,\mathrm{V}$ and the current is $1.66\,\mathrm{mA}$. Each iteration reduces the error by roughly the factor $2r_d/R \approx 0.03$, which is why convergence is so fast.
:::
:::

::: exercise Peak diode current in a half-wave rectifier {level=3}
Show that in a half-wave rectifier with a capacitor filter the peak diode current is approximately $I_L\bigl(1 + 2\pi\sqrt{2V_p/V_r}\bigr)$ and the average diode current during conduction is $I_L\bigl(1 + \pi\sqrt{2V_p/V_r}\bigr)$, under the assumptions of [[#prop-ripple]].
::: hint
During conduction $v_O = V_p\cos\omega t$ (time measured from the peak, $-\Delta t \le t \le 0$), the diode current is $i_C + I_L$, and $C = I_L/(fV_r)$.
:::
::: solution
**Average.** All the charge the load uses in a period, $I_L T$, plus the load charge during conduction, $I_L\Delta t$ (which the diode supplies directly), must pass through the diode during $\Delta t$: $I_{D,\text{avg}}\Delta t = I_L(T + \Delta t)$, so $I_{D,\text{avg}} = I_L(1 + T/\Delta t)$. With $\Delta t = \sqrt{2V_r/V_p}/\omega$ and $T = 2\pi/\omega$, $T/\Delta t = 2\pi/\sqrt{2V_r/V_p} = \pi\sqrt{2V_p/V_r}$.

**Peak.** The capacitor current $C\,\mathrm{d}v_O/\mathrm{d}t = -C\omega V_p\sin\omega t$ is largest at the start of conduction, $t = -\Delta t$, where it equals $C\omega V_p\sin(\omega\Delta t) \approx C\omega V_p\sqrt{2V_r/V_p}$. Substituting $C = I_L/(fV_r) = 2\pi I_L/(\omega V_r)$ gives $i_{C,\max} = 2\pi I_L\sqrt{2V_p/V_r}$, and adding $I_L$ gives the result. The full-wave results follow with $T/2$ in place of $T$, halving the coefficients of the square roots.
:::
:::

::: exercise Designing a 5.1 V regulator {level=3 check="(8-5.1)/0.025"}
A $5.1\,\mathrm{V}$ Zener regulator must supply $0$ to $20\,\mathrm{mA}$ from a supply that varies between $8$ and $10\,\mathrm{V}$, with at least $5\,\mathrm{mA}$ in the Zener. Find the largest permissible series resistance, in ohms, choose a standard value, and find the Zener and resistor power ratings needed. Ignore $r_z$.
::: solution
By [[#alg-zener-design]], $R \le (8 - 5.1)/(0.020 + 0.005) = 116\,\Omega$; choose $100\,\Omega$. At $V_S = 10\,\mathrm{V}$ and no load, $I_Z = 4.9/100 = 49\,\mathrm{mA}$ and $P_Z = 5.1\times0.049 = 0.25\,\mathrm{W}$; a $0.5\,\mathrm{W}$ Zener is adequate. The resistor dissipates $4.9^2/100 = 0.24\,\mathrm{W}$, so use a $0.5\,\mathrm{W}$ resistor. At the minimum supply and full load, $I_R = 29\,\mathrm{mA}$ and $I_Z = 9\,\mathrm{mA}$, comfortably above the knee.
:::
:::
