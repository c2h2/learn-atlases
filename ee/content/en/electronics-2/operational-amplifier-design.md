From the outside an operational amplifier is a triangle with two inputs, one output and a gain so large that we treat it as infinite ([[circuits-1/operational-amplifiers]]). Inside it is a small, carefully balanced analog system: a differential input stage that rejects common-mode signals, a high-gain stage, a compensation capacitor that keeps the whole thing stable, bias circuits that set every current, and often an output stage that can drive a load. The classic μA741 uses about twenty transistors; a modern CMOS op-amp inside a sensor interface or a data converter may use a dozen. Their designers face the same questions: how much gain, how fast, how much power, how accurate, over what range of voltages.

This chapter opens the triangle. We start with the specifications that describe a real op-amp, then analyse the **two-stage CMOS op-amp**, the most widely taught and widely used integrated topology: its gain, its frequency response (using the Miller compensation of [[electronics-2/stability-compensation]]), its **slew rate**, its **offset**, and its input and output voltage ranges. We work through a complete design to a specification, and finish by reading the bipolar μA741 with the same eyes. The building blocks — the differential pair with current-mirror load, current mirrors and gain stages — come from [[electronics-1/differential-amplifiers]], [[electronics-1/current-mirrors]] and [[electronics-1/single-stage-amplifiers]].

## Op-amp specifications

A data sheet describes an op-amp with dozens of numbers. They fall into three groups: small-signal (gain and bandwidth), large-signal (how fast and how far the output can swing), and DC precision (how far the output is from the ideal when the input is zero).

::: definition Principal op-amp specifications {#def-specs}
- **Open-loop gain** $A_0$ (DC differential voltage gain), usually in dB or V/mV.
- **Unity-gain frequency** $f_t$ or **gain–bandwidth product** GBW: the frequency at which $\abs{A} = 1$, equal to $A_0f_{p1}$ for a dominant-pole amplifier; and the **phase margin** as a follower.
- **Slew rate** SR: the maximum rate of change of the output voltage, in $\mathrm{V/\mu s}$.
- **Input offset voltage** $V_{OS}$: the differential input voltage needed to bring the output to zero (or mid-supply); its temperature drift in $\mathrm{\mu V/^\circ C}$.
- **Input bias current** $I_B$ and **input offset current** $I_{OS}$: the average of, and difference between, the DC currents into the two inputs.
- **Common-mode rejection ratio** CMRR $= \abs{A_d/A_{cm}}$ and **power-supply rejection ratio** PSRR $= \abs{A_d/A_{\text{supply}}}$, both in dB.
- **Input common-mode range** (ICMR): the range of common-mode input voltage over which all transistors stay in their intended operating regions; **output swing**: the range of output voltage with gain maintained.
- **Input noise** (voltage and current densities), **supply current** and **output current**.
:::

To give a sense of scale (typical data-sheet values as of 2026): a general-purpose CMOS op-amp has $A_0 \approx 100$–$120\,\mathrm{dB}$, $f_t$ of $1$–$10\,\mathrm{MHz}$, slew rate of a few $\mathrm{V/\mu s}$, $V_{OS}$ of $0.1$–$5\,\mathrm{mV}$ and $I_B$ of a few picoamperes. High-speed parts reach $f_t$ of several gigahertz and slew rates of thousands of $\mathrm{V/\mu s}$; precision **zero-drift** (chopper or auto-zero) parts have $V_{OS}$ below $10\,\mathrm{\mu V}$ with drift of a few $\mathrm{nV/^\circ C}$. Op-amps inside integrated circuits often have much less gain — $60$–$80\,\mathrm{dB}$ — because short-channel transistors have low intrinsic gain and the circuit around them can tolerate it.

## The two-stage CMOS op-amp

The circuit has seven transistors and one capacitor. Take a single supply $V_{DD}$ with $V_{SS} = 0$.

- **First stage**: an n-channel differential pair $M_1$ and $M_2$, with their sources joined and biased by a tail current source $M_5$ carrying $I_{SS}$; a p-channel current-mirror load $M_3$ (diode-connected, on the $M_1$ side) and $M_4$ (on the $M_2$ side). The first-stage output is the drain of $M_2$ and $M_4$, node 1.
- **Second stage**: a p-channel common-source amplifier $M_6$, with its gate at node 1 and its source at $V_{DD}$, loaded by an n-channel current source $M_7$ carrying $I_6$. The output is the drain of $M_6$ and $M_7$.
- **Compensation**: a capacitor $C_c$ (often with a series resistor $R_z$) from the output back to node 1.
- **Bias**: a reference current mirrored into $M_5$ and $M_7$, whose gates share a bias line.

The second stage inverts. A rise of the gate of $M_1$ pulls more current through $M_1$ and $M_3$, which the mirror copies into $M_4$, raising node 1; node 1 rising turns $M_6$ off and lowers the output. So the gate of $M_1$ is the **inverting** input and the gate of $M_2$ the **non-inverting** input.

We use the square-law model of [[electronics-1/mosfet-circuits]] with channel-length modulation: in saturation $I_D = \tfrac12\mu C_{ox}(W/L)V_{ov}^2(1 + \lambda V_{DS})$, where $V_{ov} = V_{GS} - V_{th}$ is the **overdrive voltage**, and the small-signal parameters

$$
g_m = \frac{2I_D}{V_{ov}} = \sqrt{2\mu C_{ox}(W/L)I_D}, \qquad r_o = \frac{1}{\lambda I_D}.
$$ {#eq-gm-ro}

### Gain

::: theorem Gain of the two-stage op-amp {#thm-two-stage-gain}
The low-frequency differential gain of the two-stage op-amp is the product of the stage gains,

$$
A_0 = A_1A_2 = g_{m1}\,(r_{o2}\parallel r_{o4}) \cdot g_{m6}\,(r_{o6}\parallel r_{o7}).
$$ {#eq-two-stage-gain}

With equal $\lambda$ for both device types, each stage gain is $2/\bigl(\lambda V_{ov}\bigr)\cdot\tfrac12 = 1/(\lambda V_{ov})$, where $V_{ov}$ is the overdrive of the stage's input transistor, so

$$
A_0 = \frac{1}{\lambda^2\,V_{ov1}V_{ov6}}.
$$ {#eq-gain-vov}
:::

::: proof
The first stage is a differential pair with current-mirror load. A differential input $v_{id}$ produces drain currents $\pm g_{m1}v_{id}/2$ in $M_1$ and $M_2$; the mirror copies $M_1$'s change into $M_4$, so the two changes add at node 1 and the short-circuit output current is $g_{m1}v_{id}$ ([[electronics-1/differential-amplifiers]]). The output resistance at node 1 is $r_{o2}\parallel r_{o4}$, giving $A_1 = g_{m1}(r_{o2}\parallel r_{o4})$. The second stage is a common-source amplifier with a current-source load, of gain $-g_{m6}(r_{o6}\parallel r_{o7})$; the sign is accounted for by labelling the inputs. Substituting [[#eq-gm-ro]] with $I_{D1} = I_{D2} = I_{D4} = I_{SS}/2$: $g_{m1} = I_{SS}/V_{ov1}$ and $r_{o2}\parallel r_{o4} = 1/(\lambda I_{SS})$, so $A_1 = 1/(\lambda V_{ov1})$. Similarly $A_2 = (2I_6/V_{ov6})\cdot1/(2\lambda I_6) = 1/(\lambda V_{ov6})$.
:::

Equation [[#eq-gain-vov]] shows the levers. Low overdrive (transistors operating close to weak inversion) gives high gain per stage; so does a small $\lambda$, obtained by using long channels. Remarkably the gain does not depend on the bias currents — but the speed does, through $g_m$, so the designer chooses $V_{ov}$ for gain and current for bandwidth.

::: example Gain of a two-stage op-amp {#ex-gain}
A two-stage op-amp has $I_{SS} = 20\,\mu\mathrm{A}$, $I_6 = 100\,\mu\mathrm{A}$, $V_{ov1} = 0.21\,\mathrm{V}$, $V_{ov6} = 0.2\,\mathrm{V}$ and $\lambda = 0.05\,\mathrm{V^{-1}}$ for all devices. Find $g_{m1}$, $g_{m6}$, the stage gains and $A_0$ in dB.
::: solution
$g_{m1} = 2(10\,\mu\mathrm{A})/0.21\,\mathrm{V} = 94\,\mu\mathrm{S}$ (we will use $94.2\,\mu\mathrm{S}$, the value that the design below requires) and $g_{m6} = 2(100\,\mu\mathrm{A})/0.2\,\mathrm{V} = 1.0\,\mathrm{mS}$. The output resistances are

$$
r_{o2} = r_{o4} = \frac{1}{0.05\times10\,\mu\mathrm{A}} = 2\,\mathrm{M\Omega}, \qquad r_{o6} = r_{o7} = \frac{1}{0.05\times100\,\mu\mathrm{A}} = 200\,\mathrm{k\Omega},
$$

so $R_1 = 1\,\mathrm{M\Omega}$ and $R_2 = 100\,\mathrm{k\Omega}$. Then $A_1 = 94.2\,\mu\mathrm{S}\times1\,\mathrm{M\Omega} = 94.2$, $A_2 = 1\,\mathrm{mS}\times100\,\mathrm{k\Omega} = 100$, and $A_0 = 9420$, which is $79.5\,\mathrm{dB}$. As a check, [[#eq-gain-vov]] gives $1/(0.05^2\times0.212\times0.2) = 9430$.
:::
:::

### Frequency response and compensation

The op-amp has two high-impedance nodes, node 1 and the output, and so two poles; the other nodes (the sources of $M_1$ and $M_2$, the gate of $M_3$ and $M_4$) have resistances near $1/g_m$ and give poles and a zero far above the unity-gain frequency. The two-stage amplifier is exactly the circuit of [[electronics-2/stability-compensation#thm-pole-splitting]], with $g_{m2} \to g_{m6}$, $R_1 = r_{o2}\parallel r_{o4}$, $R_2 = r_{o6}\parallel r_{o7}$, $C_1$ the capacitance at node 1 (mainly the gate capacitance of $M_6$) and $C_2$ the load. So

$$
\omega_t \approx \frac{g_{m1}}{C_c}, \qquad \omega_{p2} \approx \frac{g_{m6}}{C_2}, \qquad \omega_z = \frac{g_{m6}}{C_c},
$$

and the design rules of [[electronics-2/stability-compensation#alg-miller]] apply: $g_{m6} \ge 10\,g_{m1}$ and $C_c \ge 0.22\,C_2$ for about $60^\circ$ of phase margin.

::: widget plot
f: 20*log10(9425) + 10*log10(1 + (2*pi*10^x*c*1e-9)^2) - 10*log10((1 - (5e-14 + c*5.1e-13)*(2*pi*10^x)^2)^2 + ((6e-7 + c*1.011e-4)*2*pi*10^x)^2); (-atan(2*pi*10^x*c*1e-9) - atan2((6e-7 + c*1.011e-4)*2*pi*10^x, 1 - (5e-14 + c*5.1e-13)*(2*pi*10^x)^2))*180/pi
x: 2, 9.5
y: -200, 100
sliders: c=1.5:0.1:5:0.05
hlines: 0; -180
labels: \lvert A\rvert\ (\mathrm{dB}); \angle A\ (\text{degrees})
caption: Open-loop gain (dB) and phase (degrees) of the two-stage op-amp of [[#ex-design]] against $x = \log_{10}(f/\mathrm{Hz})$, for compensation capacitor $C_c = c\,\mathrm{pF}$ (slider), with $C_2 = 5\,\mathrm{pF}$. Read the phase where the magnitude crosses $0\,\mathrm{dB}$ and add $180^\circ$: about $67^\circ$ at $c = 1.5$. Shrink $C_c$: the crossover rises and the phase margin collapses; near $c = 0.2$ it is under $20^\circ$. Note that the RHP zero makes the magnitude level off at high frequency while the phase keeps falling.
:::

## Slew rate

Small-signal analysis assumes that the input stage stays linear. A large, fast input step violates this: the differential input exceeds the range over which the pair shares the tail current, and all of $I_{SS}$ is switched to one side. The current available to charge the compensation capacitor is then limited to $I_{SS}$, and the output can change no faster than a fixed rate.

::: theorem Slew rate of a Miller-compensated op-amp {#thm-slew}
If the first stage limits, the slew rate of a two-stage op-amp is

$$
\mathrm{SR} = \frac{I_{SS}}{C_c}.
$$ {#eq-slew}

In terms of the unity-gain frequency, $\mathrm{SR} = \omega_t\,I_{SS}/g_{m1}$; for a MOSFET input pair this is $\mathrm{SR} = \omega_tV_{ov1}$, and for a bipolar pair without degeneration $\mathrm{SR} = 2V_T\,\omega_t$. The second stage must also be able to supply the current $\mathrm{SR}\,(C_c + C_2)$ into the output node, which requires $I_6 \gtrsim \mathrm{SR}\,(C_c + C_2)$.
:::

::: proof
Node 1 sits at a nearly fixed voltage while the output moves, because the second stage, with $C_c$ around it, acts as an integrator (Miller) with a virtual ground at its input. The capacitor current is therefore $C_c\,\mathrm{d}v_o/\mathrm{d}t$, and it must be supplied by the first stage, whose output current cannot exceed $\pm I_{SS}$ (all the tail current steered through $M_1$ and mirrored, or all through $M_2$). Hence $\abs{\mathrm{d}v_o/\mathrm{d}t} \le I_{SS}/C_c$. Substituting $C_c = g_{m1}/\omega_t$ gives $\mathrm{SR} = \omega_tI_{SS}/g_{m1}$. For a MOSFET pair, $g_{m1} = 2(I_{SS}/2)/V_{ov1} = I_{SS}/V_{ov1}$, so $I_{SS}/g_{m1} = V_{ov1}$; for a bipolar pair, $g_{m1} = (I_{SS}/2)/V_T$, so $I_{SS}/g_{m1} = 2V_T$. At the output node, the second stage must supply both the load current $C_2\,\mathrm{d}v_o/\mathrm{d}t$ and the capacitor current $C_c\,\mathrm{d}v_o/\mathrm{d}t$. When the output falls, $M_6$ turns off and only the fixed current $I_6$ of $M_7$ is available, which gives the second condition.
:::

Slew rate is a **large-signal** limit; bandwidth is a small-signal one. A step of $\Delta V$ at a follower's input produces an exponential response of time constant $1/\omega_t$ only if its initial slope, $\Delta V\,\omega_t$, is below SR, that is if $\Delta V < I_{SS}/g_{m1} = V_{ov1}$ for a MOSFET input. Larger steps first ramp linearly at SR, then settle exponentially. This is why wide-overdrive (or degenerated) input stages are used in fast op-amps: for a given $\omega_t$, SR grows with $I_{SS}/g_{m1}$.

For a sinusoidal output $V_p\sin\omega t$, the maximum slope is $\omega V_p$. The **full-power bandwidth** is the highest frequency at which the op-amp can deliver its full output swing $V_{p,\max}$ without slew-rate distortion:

$$
f_{FP} = \frac{\mathrm{SR}}{2\pi V_{p,\max}}.
$$ {#eq-full-power}

::: widget plot
f: min(10, s*1e6/(2*pi*10^x)); min(10, 0.5e6/(2*pi*10^x))
x: 2, 7
y: 0, 11
sliders: s=13:0.5:100:0.5
labels: \text{op-amp with SR} = s\ \mathrm{V/\mu s}; \text{SR} = 0.5\ \mathrm{V/\mu s}\ (\mu\text{A741})
caption: The largest undistorted output amplitude (peak volts) against $x = \log_{10}(f/\mathrm{Hz})$, for an output that saturates at $10\,\mathrm{V}$ peak. Above the full-power bandwidth the amplitude must fall as $\mathrm{SR}/(2\pi f)$. The 741 runs out of slew rate at about $8\,\mathrm{kHz}$ — within the audio band. Move the slider to see how much slew rate is needed for full swing at $1\,\mathrm{MHz}$.
:::

::: warning Slew rate is not bandwidth
An op-amp with $f_t = 10\,\mathrm{MHz}$ will amplify a $100\,\mathrm{mV}$ sinusoid at $1\,\mathrm{MHz}$ in a follower without trouble, yet it may turn a $10\,\mathrm{V}$ sinusoid at only $100\,\mathrm{kHz}$ into a triangle wave. Check both limits: the small-signal closed-loop bandwidth $\approx f_t\beta$ and the full-power bandwidth $\mathrm{SR}/(2\pi V_p)$. Slewing also distorts the response to steps and is a common cause of slow settling in sample-and-hold and DAC output buffers ([[electronics-2/data-converters]]).
:::

::: quiz
A Miller-compensated MOSFET op-amp has $f_t = 20\,\mathrm{MHz}$ and an input-pair overdrive of $0.15\,\mathrm{V}$. What is its slew rate (first stage limiting)?
- [ ] $3\,\mathrm{V/\mu s}$
- [x] $18.8\,\mathrm{V/\mu s}$
- [ ] $0.15\,\mathrm{V/\mu s}$
- [ ] It cannot be found without $I_{SS}$ and $C_c$.
::: solution
By [[#thm-slew]], $\mathrm{SR} = \omega_tV_{ov1} = 2\pi\times2\times10^7\times0.15 = 1.88\times10^7\,\mathrm{V/s} = 18.8\,\mathrm{V/\mu s}$. The individual values of $I_{SS}$ and $C_c$ do not matter, only their ratio, and that ratio is fixed by $\omega_t$ and $V_{ov1}$ together.
:::
:::

## Offset

With both inputs grounded, an ideal op-amp's output would sit exactly in the middle of its range. A real one does not. The input voltage needed to correct it is the **input offset voltage** $V_{OS}$, and it has two sources.

### Systematic offset

Even with perfectly matched transistors, the op-amp has an offset unless the bias currents are consistent. With zero differential input, the diode-connected $M_3$ and the mirror device $M_4$ carry the same current $I_{SS}/2$ and, if the mirror is ideal, have the same $V_{SG}$, so node 1 sits at $V_{DD} - V_{SG3}$. That voltage is the gate–source voltage of $M_6$. If $M_6$ at this $V_{SG}$ wants to carry a current different from the $I_6$ that $M_7$ forces, the output moves towards a rail, and an input offset is needed to correct it.

::: proposition Condition for zero systematic offset {#prop-systematic}
The two-stage op-amp has no systematic offset when $M_6$ and $M_4$ have equal current densities, which, with $I_6$ set by mirroring $M_7$ from $M_5$, is

$$
\frac{(W/L)_6}{(W/L)_4} = 2\,\frac{(W/L)_7}{(W/L)_5}.
$$ {#eq-systematic}
:::

::: proof
$V_{SG6} = V_{SG4}$ holds for transistors of the same type exactly when $I_{D6}/(W/L)_6 = I_{D4}/(W/L)_4$ (same overdrive). Here $I_{D4} = I_{SS}/2 = I_{D5}/2$, and since $M_7$ and $M_5$ share the same gate–source voltage, $I_{D6} = I_{D7} = I_{D5}(W/L)_7/(W/L)_5$. Substituting: $(W/L)_7/[(W/L)_5(W/L)_6] = 1/[2(W/L)_4]$, which rearranges to [[#eq-systematic]].
:::

### Random offset and mismatch

Two transistors drawn identically on the same chip are never identical. Random fluctuations in the number of dopant atoms in the channel, in oxide thickness and in edge roughness give each device a slightly different threshold voltage and current factor. The standard empirical law, due to Marcel Pelgrom (1989), says that the standard deviation of the threshold difference between two adjacent devices falls with the square root of their gate area:

$$
\sigma(\Delta V_{th}) = \frac{A_{VT}}{\sqrt{WL}},
$$ {#eq-pelgrom}

with a **matching coefficient** $A_{VT}$ of a few $\mathrm{mV\cdot\mu m}$ — roughly $3$–$5\,\mathrm{mV\cdot\mu m}$ in typical bulk CMOS processes as of 2026, and smaller in processes with thin oxides and undoped channels. A similar law applies to the relative mismatch of the current factor $\mu C_{ox}W/L$.

Referred to the input of the op-amp, a threshold mismatch $\Delta V_{th12}$ of the input pair appears directly, while a mismatch $\Delta V_{th34}$ of the mirror devices produces a current error $g_{m3}\Delta V_{th34}$, which an input voltage $g_{m3}\Delta V_{th34}/g_{m1}$ must cancel. Since the errors are independent, their variances add:

$$
\sigma^2(V_{OS}) \approx \sigma^2(\Delta V_{th12}) + \left(\frac{g_{m3}}{g_{m1}}\right)^2\sigma^2(\Delta V_{th34}).
$$ {#eq-offset-variance}

Because $g_{m3}/g_{m1} = V_{ov1}/V_{ov3}$ at equal currents, the mirror's contribution is reduced by giving the load devices a *larger* overdrive than the input pair.

::: example Random offset {#ex-offset}
The input pair and the mirror load of a two-stage op-amp each have $WL = 10\,\mathrm{\mu m^2}$, with $A_{VT} = 4\,\mathrm{mV\cdot\mu m}$ for both device types. The overdrives are $V_{ov1} = 0.212\,\mathrm{V}$ and $V_{ov3} = 0.2\,\mathrm{V}$. Estimate $\sigma(V_{OS})$, the offset that $99.7\,\%$ of parts will meet, and the area needed to bring $\sigma$ down to $0.5\,\mathrm{mV}$.
::: solution
Each pair has $\sigma(\Delta V_{th}) = 4/\sqrt{10} = 1.26\,\mathrm{mV}$. With $g_{m3}/g_{m1} = 0.212/0.2 = 1.06$, [[#eq-offset-variance]] gives

$$
\sigma(V_{OS}) = \sqrt{1.26^2 + (1.06\times1.26)^2}\,\mathrm{mV} = 1.84\,\mathrm{mV}.
$$

The $\pm3\sigma$ range, which contains $99.7\,\%$ of a normal distribution, is $\pm5.5\,\mathrm{mV}$. Since $\sigma \propto 1/\sqrt{WL}$, reducing it by the factor $1.84/0.5 = 3.7$ needs $3.7^2 = 13.6$ times the area, about $136\,\mathrm{\mu m^2}$ per device. Larger devices bring more capacitance, which lowers the non-dominant poles: matching costs speed. For offsets below about $0.1\,\mathrm{mV}$ designers use trimming or the chopping and auto-zero techniques of zero-drift op-amps.
:::
:::

In bipolar op-amps the dominant mismatch is in the saturation currents $I_S$, and the offset is $V_T\,\Delta I_S/I_S$, typically well under a millivolt: bipolar pairs match better than MOSFET pairs of the same area. Bipolar inputs, however, draw base current, giving input bias currents of nanoamperes where CMOS inputs draw picoamperes.

## Input and output voltage ranges

Every transistor must stay in saturation for the gains above to hold. This limits both the common-mode input voltage and the output.

::: proposition Voltage ranges of the two-stage op-amp {#prop-ranges}
With $V_{SS} = 0$, thresholds $V_{thn}$ and $\abs{V_{thp}}$, and overdrives $V_{ov}$ as before:

$$
V_{thn} + V_{ov1} + V_{ov5} \;\le\; V_{IC} \;\le\; V_{DD} - \abs{V_{thp}} - V_{ov3} + V_{thn},
$$ {#eq-icmr}

$$
V_{ov7} \;\le\; v_O \;\le\; V_{DD} - V_{ov6}.
$$ {#eq-swing}
:::

::: proof
The lower limit of the common-mode input: the tail transistor $M_5$ needs $V_{DS5} \ge V_{ov5}$, and its drain is at $V_{IC} - V_{GS1} = V_{IC} - V_{thn} - V_{ov1}$. The upper limit: $M_1$ must stay in saturation, $V_{DS1} \ge V_{GS1} - V_{thn}$, i.e. its drain voltage $V_{DD} - V_{SG3}$ must be at least $V_{IC} - V_{thn}$, giving $V_{IC} \le V_{DD} - \abs{V_{thp}} - V_{ov3} + V_{thn}$. The output swing is limited by the saturation of $M_7$ ($v_O \ge V_{ov7}$) and of $M_6$ ($V_{DD} - v_O \ge V_{ov6}$).
:::

The output swings to within one overdrive of each rail — "rail-to-rail output" in the loose sense of data sheets — but the input cannot reach either rail. A **rail-to-rail input** op-amp places an n-channel and a p-channel pair in parallel, so that one or the other is active at every common-mode voltage; its gain and offset change as the input crosses from one pair to the other.

::: quiz
In the two-stage op-amp, why does the common-mode input range not extend down to the negative rail?
- [ ] Because the second stage saturates.
- [x] Because the input pair's sources sit one $V_{GS1}$ below the inputs, and the tail current source needs at least $V_{ov5}$ across it.
- [ ] Because the current mirror $M_3$–$M_4$ leaves saturation.
- [ ] Because of the compensation capacitor.
::: solution
The tail node follows the inputs at $V_{IC} - V_{GS1}$. Once this falls below $V_{ov5}$, $M_5$ enters triode, the tail current drops and the stage loses gain and common-mode rejection. For [[#ex-design]] the lower limit is $0.45 + 0.21 + 0.2 = 0.86\,\mathrm{V}$ above ground.
:::
:::

## A design to specification

::: example Designing a two-stage CMOS op-amp {#ex-design}
Design a two-stage op-amp for a $1.8\,\mathrm{V}$ process with $\mu_nC_{ox} = 300\,\mu\mathrm{A/V^2}$, $\mu_pC_{ox} = 100\,\mu\mathrm{A/V^2}$, $V_{thn} = \abs{V_{thp}} = 0.45\,\mathrm{V}$ and $\lambda = 0.05\,\mathrm{V^{-1}}$ (for the chosen channel lengths). Specification: $A_0 \ge 74\,\mathrm{dB}$; $f_t = 10\,\mathrm{MHz}$ with $C_2 = 5\,\mathrm{pF}$; phase margin about $60^\circ$; $\mathrm{SR} \ge 10\,\mathrm{V/\mu s}$.
::: solution
**Compensation capacitor.** $C_c \ge 0.22\,C_2 = 1.1\,\mathrm{pF}$; take $C_c = 1.5\,\mathrm{pF}$ to allow for the capacitance at node 1.

**Tail current.** $I_{SS} \ge \mathrm{SR}\cdot C_c = 10\,\mathrm{V/\mu s}\times1.5\,\mathrm{pF} = 15\,\mu\mathrm{A}$; take $I_{SS} = 20\,\mu\mathrm{A}$, giving $\mathrm{SR} = 13.3\,\mathrm{V/\mu s}$.

**Input pair.** $g_{m1} = \omega_tC_c = 2\pi\times10^7\times1.5\times10^{-12} = 94.2\,\mu\mathrm{S}$. With $I_{D1} = 10\,\mu\mathrm{A}$, $V_{ov1} = 2I_D/g_m = 0.212\,\mathrm{V}$, and $(W/L)_1 = 2I_D/(\mu_nC_{ox}V_{ov}^2) = 2\times10^{-5}/(3\times10^{-4}\times0.045) = 1.48$.

**Second stage.** $g_{m6} \ge 10\,g_{m1} = 0.94\,\mathrm{mS}$. With $V_{ov6} = 0.2\,\mathrm{V}$, $I_6 = g_{m6}V_{ov6}/2 = 94\,\mu\mathrm{A}$; take $I_6 = 100\,\mu\mathrm{A}$, $g_{m6} = 1\,\mathrm{mS}$, $(W/L)_6 = 2\times10^{-4}/(10^{-4}\times0.04) = 50$. Output slewing needs $I_6 \ge 13.3\,\mathrm{V/\mu s}\times6.5\,\mathrm{pF} = 87\,\mu\mathrm{A}$: satisfied.

**Mirror and current sources.** With $V_{ov3} = 0.2\,\mathrm{V}$: $(W/L)_3 = (W/L)_4 = 2\times10^{-5}/(10^{-4}\times0.04) = 5$. With $V_{ov5} = V_{ov7} = 0.2\,\mathrm{V}$: $(W/L)_5 = 4\times10^{-5}/(3\times10^{-4}\times0.04) = 3.33$, $(W/L)_7 = 2\times10^{-4}/(1.2\times10^{-5}) = 16.7$. Check [[#eq-systematic]]: $(W/L)_6/(W/L)_4 = 10$ and $2(W/L)_7/(W/L)_5 = 10$. No systematic offset.

**Gain.** As in [[#ex-gain]], $A_0 = 94.2\times100 = 9420$, or $79.5\,\mathrm{dB}$: the specification is met.

**Ranges and power.** By [[#prop-ranges]] the input common-mode range is $0.86$ to $1.60\,\mathrm{V}$ and the output swing $0.2$ to $1.6\,\mathrm{V}$. The supply current is $120\,\mu\mathrm{A}$ (plus the bias reference), $216\,\mu\mathrm{W}$ at $1.8\,\mathrm{V}$.

**Verification.** With a node-1 capacitance of $0.1\,\mathrm{pF}$, the exact transfer function [[electronics-2/stability-compensation#eq-miller-tf]] gives a follower crossover at $9.4\,\mathrm{MHz}$ and a phase margin of $67^\circ$, as the figure above shows. A simulation with full device models would now refine the sizes; the hand design has put every transistor in the right neighbourhood.
:::
:::

::: remark Why not more stages?
Three gain stages would give far more gain, but each adds a high-impedance node and a pole, and the nested compensation needed to keep a three-stage loop stable costs bandwidth and power. Integrated designers more often raise the gain of each stage by **cascoding** ([[electronics-1/multistage-amplifiers]]): a **telescopic** or **folded-cascode** single-stage op-amp has gain $(g_mr_o)^2$ in one stage, only one high-impedance node, and needs no Miller capacitor (the load capacitance itself is the dominant pole). Its drawback is reduced output swing, since every cascode device needs an overdrive's worth of headroom.
:::

## The bipolar μA741

The 741 has the same two-stage structure, with refinements that suit a bipolar process with poor lateral pnp transistors and $\pm15\,\mathrm{V}$ supplies.

- **Input stage.** Each input drives an npn emitter follower ($Q_1$, $Q_2$) into a lateral pnp common-base transistor ($Q_3$, $Q_4$). The pnp devices withstand large reverse differential voltages and shift the signal level down; a mirror ($Q_5$–$Q_7$) with emitter resistors converts the differential current to single-ended. Each side carries about $9.5\,\mu\mathrm{A}$.
- **Second stage.** A Darlington common-emitter stage ($Q_{16}$, $Q_{17}$) with a current-source load provides most of the gain, with the $30\,\mathrm{pF}$ Miller capacitor connected around it.
- **Output stage.** A class AB complementary emitter follower ($Q_{14}$, $Q_{20}$) biased by a $V_{BE}$ multiplier, with short-circuit protection ([[electronics-2/output-stages]]).

::: example The 741's bandwidth and slew rate {#ex-741}
In the 741 input stage each side carries $I = 9.5\,\mu\mathrm{A}$, and the npn–pnp cascade of each side presents a total emitter resistance of $2r_e$, so that the stage transconductance is $G_{m1} = 1/(2r_e)$. With $C_c = 30\,\mathrm{pF}$ and $V_T = 25\,\mathrm{mV}$, estimate the unity-gain frequency and the slew rate.
::: solution
$r_e = V_T/I = 25\,\mathrm{mV}/9.5\,\mu\mathrm{A} = 2.63\,\mathrm{k\Omega}$, so $G_{m1} = 1/5.26\,\mathrm{k\Omega} = 0.19\,\mathrm{mA/V}$. Then

$$
f_t = \frac{G_{m1}}{2\pi C_c} = \frac{1.9\times10^{-4}}{2\pi\times3\times10^{-11}} = 1.0\,\mathrm{MHz}.
$$

During slewing the first stage can deliver at most $2I = 19\,\mu\mathrm{A}$ into $C_c$, so $\mathrm{SR} = 19\,\mu\mathrm{A}/30\,\mathrm{pF} = 0.63\,\mathrm{V/\mu s}$, close to the data-sheet value of $0.5\,\mathrm{V/\mu s}$. In the form of [[#thm-slew]], $I_{SS}/G_{m1} = 4V_T$, twice the value for a plain bipolar pair, because the cascade halves the transconductance per unit current. Both numbers are tiny by modern standards, but the 741 was unity-gain stable with no external parts — the reason it sold by the hundreds of millions.
:::
:::

::: application Op-amps inside other circuits
Most op-amps never appear as a separate package. Inside a switched-capacitor filter or a pipelined ADC an op-amp must settle to a fraction of a least significant bit in a few nanoseconds, so designers optimise $f_t$, phase margin and slew rate against power; inside a bandgap reference or a regulator the priorities are offset and PSRR; in a sensor front end they are noise and $1/f$ noise ([[electronics-2/electronic-noise]]). The same seven-transistor circuit, re-sized, serves all of them.
:::

::: history
The term "operational amplifier" was introduced in 1947 by John Ragazzini, Robert Randall and Frederick Russell in a paper on analogue computers, where the amplifiers performed mathematical operations. George A. Philbrick's company sold the K2-W, a plug-in two-valve op-amp, from 1952. Integrated op-amps arrived with Robert Widlar's μA702 (1963) and μA709 (1965) at Fairchild; the 709 needed external compensation and could latch up. David Fullagar's μA741 (1968) added internal compensation and short-circuit protection and became the archetype. The first CMOS op-amps appeared in the 1970s for switched-capacitor filters, and the two-stage Miller topology analysed here was popularised in tutorial papers by Paul Gray and Robert Meyer in the early 1980s. Pelgrom's mismatch law was published by Marcel Pelgrom, Aad Duinmaijer and Anton Welbers in 1989.
:::

## Where this leads

The output stages that let an op-amp drive heavy loads are designed in [[electronics-2/output-stages]]. The op-amp's finite $f_t$ limits active filters ([[electronics-2/active-filters]]) and its slew rate and settling limit the sample-and-hold circuits and DACs of [[electronics-2/data-converters]]. Its input-referred noise is analysed in [[electronics-2/electronic-noise]]. In [[instrumentation/instrumentation-amplifiers]] op-amps are combined into precision differential amplifiers, and the transistor-level design of CMOS analog and digital circuits continues in [[digital-ic]].

::: summary
- Op-amp specifications fall into small-signal (gain, $f_t$, phase margin), large-signal (slew rate, swing) and precision (offset, bias current, CMRR, PSRR) groups.
- The two-stage CMOS op-amp — mirror-loaded differential pair, common-source second stage, Miller capacitor — has $A_0 = g_{m1}(r_{o2}\parallel r_{o4})\,g_{m6}(r_{o6}\parallel r_{o7}) \approx 1/(\lambda^2V_{ov1}V_{ov6})$.
- Its frequency response is that of pole splitting: $\omega_t \approx g_{m1}/C_c$, $\omega_{p2} \approx g_{m6}/C_2$, RHP zero $g_{m6}/C_c$.
- The slew rate is $I_{SS}/C_c = \omega_tV_{ov1}$ for a MOSFET input; the full-power bandwidth is $\mathrm{SR}/(2\pi V_p)$. Slew rate and bandwidth are different limits.
- Systematic offset vanishes when $(W/L)_6/(W/L)_4 = 2(W/L)_7/(W/L)_5$; random offset follows Pelgrom's law $\sigma = A_{VT}/\sqrt{WL}$.
- The common-mode input range is bounded by the tail source and the input pair's saturation; the output swings to within an overdrive of each rail.
- The 741 is a bipolar version of the same architecture with $f_t \approx 1\,\mathrm{MHz}$ and $\mathrm{SR} \approx 0.5\,\mathrm{V/\mu s}$.
:::

## Exercises

::: exercise Stage gain {level=1 check="1/(0.1*0.15)"}
A differential pair with current-mirror load uses transistors with $\lambda = 0.1\,\mathrm{V^{-1}}$ and an input overdrive of $0.15\,\mathrm{V}$. What is its voltage gain?
::: solution
By [[#thm-two-stage-gain]], $A_1 = 1/(\lambda V_{ov1}) = 1/(0.1\times0.15) = 66.7$, or $36.5\,\mathrm{dB}$.
:::
:::

::: exercise Slew rate {level=1 check="50e-6/2e-12"}
A two-stage op-amp has $I_{SS} = 50\,\mu\mathrm{A}$ and $C_c = 2\,\mathrm{pF}$. Find its slew rate in V/s.
::: solution
$\mathrm{SR} = I_{SS}/C_c = 5\times10^{-5}/2\times10^{-12} = 2.5\times10^7\,\mathrm{V/s} = 25\,\mathrm{V/\mu s}$.
:::
:::

::: exercise Full-power bandwidth {level=1 check="20e6/(2*pi*5)"}
An op-amp with a slew rate of $20\,\mathrm{V/\mu s}$ must deliver a $5\,\mathrm{V}$ peak sinusoid. What is the highest frequency, in hertz, at which it can do so without slew-rate distortion?
::: solution
$f_{FP} = \mathrm{SR}/(2\pi V_p) = 2\times10^7/(2\pi\times5) = 637\,\mathrm{kHz}$.
:::
:::

::: exercise Common-mode range {level=2}
For the op-amp of [[#ex-design]], the supply is lowered to $1.2\,\mathrm{V}$ with all overdrives unchanged. Find the new input common-mode range and output swing. What do you conclude?
::: solution
By [[#prop-ranges]], the lower limit is unchanged at $0.45 + 0.212 + 0.2 = 0.862\,\mathrm{V}$; the upper limit becomes $1.2 - 0.45 - 0.2 + 0.45 = 1.0\,\mathrm{V}$. The input range shrinks to $0.14\,\mathrm{V}$, barely usable. The output swing is $0.2$ to $1.0\,\mathrm{V}$. Low-voltage designs therefore lower the overdrives (operating near weak inversion), use low-threshold devices, or switch to p-channel input pairs or rail-to-rail input stages.
:::
:::

::: exercise Systematic offset {level=2}
In a two-stage op-amp, $(W/L)_3 = (W/L)_4 = 10$, $(W/L)_5 = 5$ and $(W/L)_7 = 20$. What must $(W/L)_6$ be for zero systematic offset? If $I_{SS} = 40\,\mu\mathrm{A}$, what is $I_6$?
::: solution
By [[#eq-systematic]], $(W/L)_6 = 2\times10\times20/5 = 80$. $I_6 = I_{SS}(W/L)_7/(W/L)_5 = 40\times4 = 160\,\mu\mathrm{A}$. Check: $M_6$ carries $160\,\mu\mathrm{A}$ with $W/L = 80$, $2\,\mu\mathrm{A}$ per square, and $M_4$ carries $20\,\mu\mathrm{A}$ with $W/L = 10$, also $2\,\mu\mathrm{A}$ per square.
:::
:::

::: exercise Offset yield {level=2 check="(4/0.5)^2"}
An input pair dominates the offset of an op-amp, with $A_{VT} = 4\,\mathrm{mV\cdot\mu m}$. What gate area $WL$ in $\mathrm{\mu m^2}$ is needed per device so that $3\sigma(V_{OS}) = 1.5\,\mathrm{mV}$?
::: solution
$\sigma = 0.5\,\mathrm{mV} = A_{VT}/\sqrt{WL}$, so $WL = (4/0.5)^2 = 64\,\mathrm{\mu m^2}$, for example $W = 16\,\mathrm{\mu m}$ and $L = 4\,\mathrm{\mu m}$.
:::
:::

::: exercise Slew-limited settling {level=2}
A unity-gain follower uses an op-amp with $f_t = 10\,\mathrm{MHz}$ and $\mathrm{SR} = 13.3\,\mathrm{V/\mu s}$ (the design of [[#ex-design]]). (a) Up to what input step size is the response a pure exponential? (b) Estimate the time for a $1\,\mathrm{V}$ step to settle to within $1\,\mathrm{mV}$, treating the closed loop as single-pole.
::: solution
(a) Linear settling needs an initial slope $\Delta V\omega_t \le \mathrm{SR}$: $\Delta V \le 1.33\times10^7/(6.28\times10^7) = 0.212\,\mathrm{V}$, which is $V_{ov1}$, as [[#thm-slew]] predicts.

(b) The output first slews until the remaining error is $0.212\,\mathrm{V}$, where the linear slope equals SR: this takes $(1 - 0.212)/13.3\,\mathrm{V/\mu s} = 59\,\mathrm{ns}$. Then it settles exponentially with $\tau = 1/\omega_t = 15.9\,\mathrm{ns}$ from $0.212\,\mathrm{V}$ to $1\,\mathrm{mV}$: $\tau\ln(212) = 15.9\times5.36 = 85\,\mathrm{ns}$. Total about $145\,\mathrm{ns}$. (Phase margin of $67^\circ$ adds a little ringing; a simulation would refine this.)
:::
:::

::: exercise A bipolar input stage {level=3}
An op-amp uses a plain bipolar differential pair (no degeneration) with $I_{SS} = 20\,\mu\mathrm{A}$ and Miller compensation for $f_t = 1\,\mathrm{MHz}$. (a) Find $C_c$ and the slew rate. (b) Emitter resistors $R_E$ are added to each side; show that the effective transconductance becomes $g_m/(1 + g_mR_E)$ and choose $R_E$ to raise the slew rate to $2\,\mathrm{V/\mu s}$ at the same $f_t$. (c) What does degeneration cost?
::: solution
(a) $g_{m1} = (10\,\mu\mathrm{A})/25\,\mathrm{mV} = 0.4\,\mathrm{mS}$, $C_c = g_{m1}/\omega_t = 4\times10^{-4}/6.28\times10^6 = 63.7\,\mathrm{pF}$, and $\mathrm{SR} = 20\,\mu\mathrm{A}/63.7\,\mathrm{pF} = 0.31\,\mathrm{V/\mu s}$ ($= 2V_T\omega_t$).

(b) With $R_E$ in each emitter, a differential input $v_{id}$ divides across $2(r_e + R_E)$, so each collector current changes by $\pm v_{id}/[2(r_e + R_E)]$; the mirror adds the two changes at the output, giving $G_{m1} = 1/(r_e + R_E) = g_m/(1 + g_mR_E)$ with $g_m = 1/r_e$. This is the series–series feedback result of [[electronics-2/feedback#ex-degeneration]]. Then $\mathrm{SR} = \omega_tI_{SS}/G_{m1} = \omega_tI_{SS}(1 + g_mR_E)/g_m$. For $2\,\mathrm{V/\mu s}$: $1 + g_mR_E = 2\times10^6/(0.31\times10^6) = 6.4$, so $g_mR_E = 5.4$ and $R_E = 5.4/0.4\,\mathrm{mS} = 13.5\,\mathrm{k\Omega}$. $C_c$ falls in proportion to $G_{m1}$, to $10\,\mathrm{pF}$.

(c) The resistors add thermal noise and offset (their mismatch, multiplied by the tail current), and reduce the first-stage gain by $1 + g_mR_E$, so the open-loop gain drops by about $16\,\mathrm{dB}$.
:::
:::

::: exercise Designing for a larger load {level=3}
Redesign the op-amp of [[#ex-design]] for a load of $C_2 = 20\,\mathrm{pF}$, keeping $f_t = 10\,\mathrm{MHz}$, phase margin about $60^\circ$, $\mathrm{SR} \ge 10\,\mathrm{V/\mu s}$ and all overdrives. Find $C_c$, $I_{SS}$, $g_{m1}$, $I_6$ and the total supply current, and comment on how power scales with load capacitance.
::: hint
Follow the steps of the example: $C_c$ first, then $I_{SS}$ from slew rate and $g_{m1}$ from $f_t$, then $g_{m6}$ from the zero and pole conditions; check the output slewing current.
:::
::: solution
$C_c \ge 0.22\times20 = 4.4\,\mathrm{pF}$; take $C_c = 5\,\mathrm{pF}$. $g_{m1} = 2\pi\times10^7\times5\times10^{-12} = 0.314\,\mathrm{mS}$; with $V_{ov1} = 0.212\,\mathrm{V}$, $I_{SS} = g_{m1}V_{ov1} = 66.7\,\mu\mathrm{A}$, which gives $\mathrm{SR} = 66.7\,\mu\mathrm{A}/5\,\mathrm{pF} = 13.3\,\mathrm{V/\mu s}$ (the slew rate is fixed by $\omega_tV_{ov1}$). The second stage needs $g_{m6} \ge 10\,g_{m1} = 3.14\,\mathrm{mS}$ and also $g_{m6}/C_2 \ge 2.2\,\omega_t$, i.e. $g_{m6} \ge 2.2\times6.28\times10^7\times2\times10^{-11} = 2.76\,\mathrm{mS}$; so $g_{m6} = 3.14\,\mathrm{mS}$ and $I_6 = g_{m6}V_{ov6}/2 = 314\,\mu\mathrm{A}$. Output slewing needs $13.3\,\mathrm{V/\mu s}\times25\,\mathrm{pF} = 333\,\mu\mathrm{A}$, slightly more, so take $I_6 = 340\,\mu\mathrm{A}$. The total current is about $410\,\mu\mathrm{A}$, $3.4$ times the original for four times the load: at fixed speed and phase margin, power grows roughly in proportion to the load capacitance.
:::
:::
