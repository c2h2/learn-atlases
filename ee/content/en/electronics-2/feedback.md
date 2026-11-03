In the 1920s a long-distance telephone call in the United States passed through dozens of valve amplifiers, called repeaters, each restoring the signal lost along a stretch of cable. Every repeater distorted the signal a little and drifted a little as its valves aged and its supply voltage wandered, and the errors of fifty repeaters added up to an unintelligible line. Harold Black's solution, sketched in 1927, was paradoxical: build an amplifier with far *more* gain than needed, then deliberately throw most of it away by feeding a fraction of the output back to the input in opposition to the signal. The result had less gain but that gain was set by a few passive resistors, almost independent of the valves, and its distortion fell by the same factor as its gain.

That trade — surplus gain exchanged for precision — is the most important idea in analog electronics. Every op-amp circuit of [[circuits-1/operational-amplifiers]] relies on it; voltage regulators, phase-locked loops, servo motors and the class AB power stages of [[electronics-2/output-stages]] all do too. In this chapter we develop the general theory of **negative feedback**: the loop gain and the fundamental feedback equation, the benefits feedback brings and what each costs, and the four ways of connecting the loop to an amplifier, which decide whether the input and output impedances rise or fall. The question of whether a feedback loop stays stable is serious enough to have the next chapter, [[electronics-2/stability-compensation]], to itself.

We assume the small-signal models of [[electronics-1/small-signal-amplifiers]] and the single-pole frequency response of [[electronics-1/amplifier-frequency-response]].

## The ideal feedback structure

Strip a feedback amplifier to its essentials and four blocks remain. A **source** supplies the input signal $x_s$. A **mixer** (or comparator) subtracts the feedback signal $x_f$ from it to form the **error signal** $x_e = x_s - x_f$. The **basic amplifier** of gain $A$ amplifies the error to produce the output $x_o = Ax_e$. A **feedback network**, usually built from resistors and therefore accurate and stable, **samples** the output and returns $x_f = \beta x_o$. The signals $x$ may be voltages or currents; we leave them general for now.

::: definition Loop gain and amount of feedback {#def-loop-gain}
In the ideal feedback structure, $A$ is the **open-loop gain**, $\beta$ the **feedback factor**, and

$$
T = A\beta
$$

the **loop gain**: the gain experienced by a signal that travels once around the loop, from the mixer through the amplifier and back through the feedback network. The quantity $1 + A\beta$ is the **amount of feedback**, often quoted in decibels as $20\log_{10}(1 + A\beta)$. The feedback is **negative** when $A\beta > 0$, so that the fed-back signal opposes the source, and **positive** when $A\beta < 0$.
:::

The loop gain is dimensionless whatever the types of signal: if $A$ is in volts per ampere (a transresistance), then $\beta$ is in amperes per volt.

::: theorem The feedback equation {#thm-feedback-equation}
If the basic amplifier and the feedback network are unilateral (signals pass only in the directions shown) and the feedback network does not load the amplifier, the **closed-loop gain** is

$$
A_f = \frac{x_o}{x_s} = \frac{A}{1 + A\beta}.
$$ {#eq-feedback}

When the loop gain is large, $A\beta \gg 1$, the closed-loop gain approaches $1/\beta$, independent of $A$.
:::

::: proof
From the three block equations, $x_o = Ax_e = A(x_s - x_f) = A(x_s - \beta x_o)$. Collecting terms, $x_o(1 + A\beta) = Ax_s$, which is [[#eq-feedback]]. For the limit, divide numerator and denominator by $A\beta$: $A_f = (1/\beta)\cdot 1/(1 + 1/(A\beta)) \to 1/\beta$.
:::

Two related results follow at once. The error signal is $x_e = x_o/A = x_s/(1 + A\beta)$: large loop gain drives the error towards zero, which is exactly the "virtual short" between op-amp inputs. And the feedback signal is $x_f = \beta x_o = x_s\,A\beta/(1 + A\beta)$, so $x_f \approx x_s$: **the loop works by making the fed-back signal a replica of the input.** Since $x_f = \beta x_o$ and $\beta$ is set by passive components, the output becomes $x_s/\beta$, whatever the amplifier inside does.

It is useful to write the closed-loop gain as the ideal value times an error factor,

$$
A_f = \frac{1}{\beta}\cdot\frac{T}{1 + T}.
$$ {#eq-gain-error}

The relative **gain error** is $1/(1 + T) \approx 1/T$: a loop gain of $1000$ gives an error of $0.1\,\%$.

::: intuition The thermostat
A room heater with a thermostat is a feedback loop. The heater (the amplifier) may be oversized, and its output may vary with the gas pressure, yet the room settles near the set temperature because the thermostat compares the actual temperature with the set point and acts on the difference. The accuracy depends on the thermometer (the feedback network), not on the heater. Feedback amplifiers obey the same logic: put your precision into $\beta$ and your brute force into $A$.
:::

::: quiz
An amplifier with $A = 1000$ is placed in a negative-feedback loop with $\beta = 0.099$. What is the closed-loop gain?
- [ ] $99$
- [x] $10$
- [ ] $1000/0.099$
- [ ] $9.9$
::: solution
$A\beta = 99$, so $A_f = 1000/(1 + 99) = 10$. Note that $1/\beta = 10.1$; the closed-loop gain is $1\,\%$ below the ideal value because the loop gain, $99$, is finite.
:::
:::

## What feedback buys

The price of feedback is gain: the closed-loop gain is smaller than $A$ by the factor $1 + A\beta$. In exchange, a whole list of properties improves by the same factor. We take them in turn.

### Gain desensitivity

::: theorem Gain desensitivity {#thm-desensitivity}
For small changes of the open-loop gain, the relative change of the closed-loop gain is

$$
\frac{\mathrm{d}A_f}{A_f} = \frac{1}{1 + A\beta}\,\frac{\mathrm{d}A}{A}.
$$ {#eq-desensitivity}

The factor $1 + A\beta$ is therefore also called the **desensitivity factor**. For a finite change from $A$ to $A'$ the exact result is $(A_f' - A_f)/A_f = \bigl((A' - A)/A\bigr)\big/(1 + A'\beta)$.
:::

::: proof
Differentiate [[#eq-feedback]] with respect to $A$:

$$
\frac{\mathrm{d}A_f}{\mathrm{d}A} = \frac{(1 + A\beta) - A\beta}{(1 + A\beta)^2} = \frac{1}{(1 + A\beta)^2}.
$$

Dividing by $A_f = A/(1 + A\beta)$ gives $\mathrm{d}A_f/A_f = \mathrm{d}A/[A(1 + A\beta)]$. For the finite change, $A_f'/A_f = A'(1 + A\beta)/[A(1 + A'\beta)]$, and subtracting $1$ gives $(A' - A)/[A(1 + A'\beta)]$.
:::

The sensitivity to $\beta$ is quite different: $\mathrm{d}A_f/A_f = -\bigl(A\beta/(1 + A\beta)\bigr)\,\mathrm{d}\beta/\beta \approx -\mathrm{d}\beta/\beta$. Feedback does nothing to reduce errors in the feedback network itself — another reason to build $\beta$ from precision resistors.

::: example A drifting amplifier {#ex-drift}
An amplifier has $A = 10^4$ and is used with $\beta = 0.01$. Its gain then falls by $20\,\%$ as it warms up. By what percentage does the closed-loop gain change?
::: solution
Initially $A\beta = 100$ and $A_f = 10^4/101 = 99.01$. After warming, $A' = 8000$, $A'\beta = 80$ and $A_f' = 8000/81 = 98.77$. The relative change is

$$
\frac{98.77 - 99.01}{99.01} = -0.247\,\%,
$$

which agrees with the exact formula of [[#thm-desensitivity]], $-20\,\%/81 = -0.247\,\%$. The differential formula [[#eq-desensitivity]], $-20\,\%/101 = -0.198\,\%$, is a little optimistic because a $20\,\%$ change is not small. Either way, a $20\,\%$ drift has been reduced to about a quarter of a percent.
:::
:::

### Bandwidth extension

Most amplifiers have a gain that falls with frequency. Suppose the basic amplifier has a single dominant pole,

$$
A(s) = \frac{A_0}{1 + s/\omega_H},
$$

with mid-band gain $A_0$ and $3\,\mathrm{dB}$ frequency $\omega_H$, and that $\beta$ is independent of frequency.

::: theorem Bandwidth extension for a single-pole amplifier {#thm-bandwidth}
Closing the loop around a single-pole amplifier gives another single-pole response,

$$
A_f(s) = \frac{A_0/(1 + A_0\beta)}{1 + s/\bigl(\omega_H(1 + A_0\beta)\bigr)},
$$ {#eq-closed-loop-pole}

with mid-band gain reduced by $1 + A_0\beta$ and $3\,\mathrm{dB}$ frequency increased by the same factor. The **gain–bandwidth product** $A_{f0}\,\omega_{Hf} = A_0\omega_H$ is unchanged.
:::

::: proof
Substitute $A(s)$ in [[#eq-feedback]] and multiply numerator and denominator by $1 + s/\omega_H$:

$$
A_f(s) = \frac{A_0}{1 + s/\omega_H + A_0\beta} = \frac{A_0}{(1 + A_0\beta)\bigl[1 + s/(\omega_H(1 + A_0\beta))\bigr]}.
$$

This is [[#eq-closed-loop-pole]]. Multiplying its mid-band gain by its pole frequency gives $A_0\omega_H$.
:::

In the $s$-plane, feedback has moved the pole from $-\omega_H$ to $-\omega_H(1 + A_0\beta)$, further from the origin. With two or more poles, the poles move in more complicated ways and may become complex; that is where instability begins, and it is the subject of [[electronics-2/stability-compensation]].

::: example Bandwidth of an op-amp amplifier {#ex-bandwidth}
A general-purpose op-amp has $A_0 = 10^5$ and an open-loop pole at $f_H = 10\,\mathrm{Hz}$. It is used as a non-inverting amplifier with $\beta = 0.01$. Find the closed-loop gain and bandwidth.
::: solution
$A_0\beta = 1000$, so $A_{f0} = 10^5/1001 = 99.9$ and $f_{Hf} = 10\,\mathrm{Hz}\times1001 = 10.01\,\mathrm{kHz}$. The product $99.9\times10.01\,\mathrm{kHz} = 1.00\,\mathrm{MHz}$ equals $A_0f_H$, the op-amp's **gain–bandwidth product** or unity-gain frequency $f_t$. With $\beta = 1$ (a voltage follower) the same op-amp would give unit gain up to $1\,\mathrm{MHz}$.
:::
:::

::: widget plot
f: 100 - 10*log10(1 + 10^(2*x - 2)); 20*log10(1e5/(1 + 1e5*10^(-n))) - 10*log10(1 + (10^x/(10*(1 + 1e5*10^(-n))))^2)
x: 0, 7
y: -20, 110
sliders: n=2:0:4:0.1
labels: \lvert A\rvert \text{ (open loop)}; \lvert A_f\rvert \text{ (closed loop)}
caption: Gain in dB against $x = \log_{10}(f/\mathrm{Hz})$ for an op-amp with $A_0 = 10^5$ and $f_H = 10\,\mathrm{Hz}$, with feedback factor $\beta = 10^{-n}$ (slider $n$). The closed-loop curve is flat at about $20n\,\mathrm{dB}$ until it meets the open-loop curve, then follows it down. Move the slider: lowering the gain by $20\,\mathrm{dB}$ raises the bandwidth tenfold, because the gain–bandwidth product is fixed. At $n = 0$ (a follower) the bandwidth reaches $1\,\mathrm{MHz}$.
:::

### Reduction of distortion and disturbances

Feedback also suppresses unwanted signals that arise *inside* the loop. Model the basic amplifier as an ideal gain $A$ followed by an added disturbance $d$ at its output, which may stand for hum from the power supply, a drift, or the harmonic distortion of a non-linear output stage.

::: theorem Suppression of output disturbances {#thm-disturbance}
If a disturbance $d$ adds to the output of the basic amplifier, the closed-loop output is

$$
x_o = \frac{A}{1 + A\beta}\,x_s + \frac{1}{1 + A\beta}\,d.
$$ {#eq-disturbance}

The disturbance is reduced by the amount of feedback. Relative to the wanted output, which feedback has also reduced, nothing has yet been gained; but if the input is raised by $1 + A\beta$ to restore the original output level, the ratio of disturbance to signal at the output falls by $1 + A\beta$.
:::

::: proof
The output is $x_o = Ax_e + d = A(x_s - \beta x_o) + d$. Collecting $x_o$: $x_o(1 + A\beta) = Ax_s + d$, which is [[#eq-disturbance]].
:::

For harmonic distortion the conclusion is the same: at a given output amplitude, the harmonics produced by a weakly non-linear amplifier are reduced roughly by $1 + A\beta$ evaluated at the harmonic frequency. A power stage with $5\,\%$ distortion, inside a loop with $A\beta = 100$, gives about $5\,\%/101 \approx 0.05\,\%$.

::: warning Feedback does not remove noise at the input
[[#thm-disturbance]] applies to disturbances entering *after* gain. A disturbance $n$ that enters at the amplifier input adds to $x_s$ and is amplified exactly as the signal is: the output becomes $A_f(x_s + n)$, and the signal-to-noise ratio is unchanged. This is why the input stage of a low-noise amplifier must itself be quiet ([[electronics-2/electronic-noise]]); feedback cannot rescue it.
:::

A particularly instructive non-linearity is a **dead zone**, the flat region around zero in the transfer curve of a class B output stage in which neither transistor conducts ([[electronics-2/output-stages]]). Suppose the output stage is a follower that gives no output while its input lies within $\pm0.6\,\mathrm{V}$ and follows it with that $0.6\,\mathrm{V}$ offset otherwise. Driven directly, a $10\,\mathrm{V}$ sinusoid comes out with a visible notch at every zero crossing. Now precede it with a driver of gain $A_1$ and close a loop with $\beta = 0.1$. While the output stage is cut off the error signal is not opposed, so the driver output races across the dead zone; referred to the input, the dead zone shrinks from $0.6\,\mathrm{V}$ to $0.6/A_1\,\mathrm{V}$.

::: widget plot
f: 10*sin(x); if(abs(10*sin(x)) < 0.6, 0, 10*sin(x) - 0.6*sign(sin(x))); if(abs(A*sin(x)) < 0.6, 0, (A*sin(x) - 0.6*sign(sin(x)))/(1 + 0.1*A))
x: 0, 2pi
y: -11, 11
piticks: true
sliders: A=1000:2:10000:1
labels: \text{ideal}; \text{no feedback}; \text{with feedback}
caption: One period of the output of a follower output stage with a $\pm0.6\,\mathrm{V}$ dead zone. Without feedback (driven by $10\sin\omega t$) the output has a flat notch at each zero crossing. With feedback ($\beta = 0.1$, input $\sin\omega t$, driver gain $A$ on the slider) the notch narrows in proportion to $1/A$; reduce $A$ to $2$ and watch the crossover distortion return, together with a gain error.
:::

### The other effects

Feedback changes two further things, both depending on how the loop is connected. **Input and output impedances** are multiplied or divided by $1 + A\beta$, which is the subject of the next section. And the loop **can become unstable**: if at some frequency the phase shift around the loop reaches $180^\circ$ while $\abs{A\beta} \ge 1$, the feedback becomes positive and the circuit may oscillate.

## The four feedback topologies

An amplifier's input and output are each either a voltage or a current, giving four kinds of amplifier. To make an accurate voltage amplifier, feedback must sense the output **voltage** and return a **voltage** to be compared with the source voltage; to make an accurate transconductance amplifier, it must sense the output **current** and return a voltage; and so on. Each choice is named after how the feedback network connects at the input (the **mixing**) and at the output (the **sampling**).

- **Series mixing**: the feedback network is in series with the source, in the input loop, and returns a voltage. Kirchhoff's voltage law does the subtraction.
- **Shunt mixing**: the feedback network is in parallel with the source at the input node, and returns a current. Kirchhoff's current law does the subtraction.
- **Shunt sampling**: the feedback network is connected across the output terminals and senses the output voltage.
- **Series sampling**: the feedback network is in series with the load and senses the output current.

::: definition Feedback topologies {#def-topologies}
The four feedback topologies, named mixing–sampling, are:

| topology | senses | returns | stabilised gain | units of $A$ | units of $\beta$ |
|---|---|---|---|---|---|
| series–shunt | $v_o$ | $v_f$ | voltage gain $v_o/v_s$ | V/V | V/V |
| shunt–series | $i_o$ | $i_f$ | current gain $i_o/i_s$ | A/A | A/A |
| series–series | $i_o$ | $v_f$ | transconductance $i_o/v_s$ | A/V | V/A |
| shunt–shunt | $v_o$ | $i_f$ | transresistance $v_o/i_s$ | V/A | A/V |

Some books call series–shunt "voltage-series feedback", naming the sampled quantity first; the circuits are the same.
:::

Familiar examples: the non-inverting op-amp amplifier is series–shunt; the inverting amplifier and the transimpedance amplifier for a photodiode are shunt–shunt; a common-emitter stage with an unbypassed emitter resistor is series–series ([[electronics-1/single-stage-amplifiers]]); and a current mirror with feedback, or an op-amp driving a load in the feedback path, can be shunt–series.

### Effect on impedances

::: theorem Impedances with feedback {#thm-impedances}
In the ideal structure with loop gain $A\beta$, let $R_i$ and $R_o$ be the input and output resistances of the basic amplifier. Then

1. **series mixing** raises the input resistance: $R_{if} = R_i(1 + A\beta)$;
2. **shunt mixing** lowers it: $R_{if} = R_i/(1 + A\beta)$;
3. **shunt sampling** lowers the output resistance: $R_{of} = R_o/(1 + A\beta)$;
4. **series sampling** raises it: $R_{of} = R_o(1 + A\beta)$.

Here $A$ means the gain with the output short-circuited (for shunt sampling) or open-circuited (for series sampling) as appropriate when the output resistance is calculated; see the proof.
:::

::: proof
We prove parts 1 and 3 for the series–shunt amplifier; the others follow the same pattern with voltages and currents exchanged.

(1) With series mixing the source voltage $v_s$ drives the series combination of the amplifier input resistance and the feedback voltage source $v_f$. The current entering is $i_i = v_e/R_i$, where $v_e = v_s - v_f$. But $v_e = v_s/(1 + A\beta)$ by the error relation of [[#thm-feedback-equation]], so

$$
R_{if} = \frac{v_s}{i_i} = \frac{v_s R_i}{v_e} = R_i(1 + A\beta).
$$

The feedback voltage rises almost to $v_s$ and "bootstraps" the input, so very little current flows.

(3) Model the amplifier output as a voltage source $Av_e$ behind $R_o$. Set $v_s = 0$ and apply a test voltage $v_x$ at the output. The feedback network senses $v_x$ and returns $v_f = \beta v_x$, so $v_e = -\beta v_x$ and the internal source becomes $-A\beta v_x$. The test current is

$$
i_x = \frac{v_x - (-A\beta v_x)}{R_o} = \frac{v_x(1 + A\beta)}{R_o}, \qquad R_{of} = \frac{v_x}{i_x} = \frac{R_o}{1 + A\beta}.
$$

The loop fights any attempt to change the output voltage, which is what a low output resistance means. Here $A$ is the open-circuit voltage gain of the internal source, as used above. Parts 2 and 4 are proved in [[#exr-dual-impedances]].
:::

The rule is easy to remember: **series connections multiply by $1 + A\beta$, shunt connections divide**, at the input and at the output alike. Each choice moves the impedance in the direction an ideal amplifier of that type wants: an ideal voltage amplifier has infinite input and zero output resistance, an ideal transconductance amplifier has infinite input and infinite output resistance, and so on.

::: example A non-inverting op-amp amplifier {#ex-noninverting}
An op-amp with open-loop gain $A = 2\times10^5$, differential input resistance $r_i = 2\,\mathrm{M\Omega}$ and output resistance $r_o = 75\,\Omega$ is connected as a non-inverting amplifier with $R_2 = 9\,\mathrm{k\Omega}$ from output to inverting input and $R_1 = 1\,\mathrm{k\Omega}$ from inverting input to ground. Find the closed-loop gain, its error, and the input and output resistances, neglecting the loading of the resistors on the op-amp.
::: solution
This is series–shunt: $R_1$ and $R_2$ sense the output voltage, and the feedback voltage across $R_1$ appears in series with the source in the loop through the op-amp inputs. The feedback factor is

$$
\beta = \frac{R_1}{R_1 + R_2} = \frac{1\,\mathrm{k\Omega}}{10\,\mathrm{k\Omega}} = 0.1, \qquad A\beta = 2\times10^4.
$$

By [[#eq-feedback]], $A_f = 2\times10^5/(1 + 2\times10^4) = 9.9995$, an error of $-0.005\,\%$ from the ideal $1/\beta = 10$. By [[#thm-impedances]],

$$
R_{if} = 2\,\mathrm{M\Omega}\times(2\times10^4) \approx 40\,\mathrm{G\Omega}, \qquad R_{of} = \frac{75\,\Omega}{2\times10^4} = 3.75\,\mathrm{m\Omega}.
$$

In practice the input resistance is limited long before $40\,\mathrm{G\Omega}$ by the common-mode input resistance and leakage, which lie outside the loop, and the output resistance rises with frequency as $A$ falls. Neglecting the loading was justified because $R_1 + R_2 = 10\,\mathrm{k\Omega} \gg r_o$ and $r_i \gg R_1\parallel R_2$.
:::
:::

::: warning Only impedances inside the loop are changed
The factor $1 + A\beta$ applies to the impedance seen at the point where the loop is connected. A bias resistor from the input terminal to ground, outside the loop, appears in parallel with $R_{if}$ and is not multiplied. A $100\,\mathrm{k\Omega}$ bias resistor in parallel with the $40\,\mathrm{G\Omega}$ of [[#ex-noninverting]] gives an input resistance of $100\,\mathrm{k\Omega}$. Draw the loop before applying the rule.
:::

::: quiz
A photodiode transimpedance amplifier returns a current through a feedback resistor to the op-amp's inverting input, and senses the output voltage. Which statement is correct?
- [ ] It is series–shunt, and its input resistance is very high.
- [x] It is shunt–shunt, and its input resistance is very low.
- [ ] It is series–series, and its output resistance is very high.
- [ ] It is shunt–series, and its output resistance is very low.
::: solution
The feedback current and the photocurrent meet at a node (shunt mixing), and the feedback resistor is connected across the output (shunt sampling). Shunt mixing divides the input resistance by $1 + A\beta$: the inverting input is a virtual ground, which is exactly what a photodiode needs to keep its voltage constant.
:::
:::

## Real feedback circuits: loading and the return ratio

The ideal structure assumes that the feedback network neither loads the amplifier nor passes signals backwards, and that the amplifier passes nothing forwards through the feedback network. Real feedback networks are resistor networks connected to the same nodes as the amplifier, so these assumptions are only approximate. Two systematic methods handle the general case.

The **two-port method** (used by Sedra and Smith and by Gray and Meyer) represents the feedback network by the two-port parameters appropriate to the topology — $h$-parameters for series–shunt, $y$-parameters for shunt–shunt, $z$-parameters for series–series, $g$-parameters for shunt–series ([[circuits-2/two-port-networks]]). The forward transmission of the feedback network is neglected, its input and output port impedances are absorbed into the basic amplifier as loading, and its reverse transmission parameter becomes $\beta$. Then [[#thm-feedback-equation]] and [[#thm-impedances]] apply to the "loaded" amplifier. The approximation is excellent whenever $A$ is much larger than the direct feedthrough of the network.

The **return-ratio method**, due to Bode, works for any circuit without first identifying a topology. Choose one controlled source in the circuit, of gain $k$ (for a transistor, $g_m$). Set the independent sources to zero, replace the controlled source by an independent source of value $1$, and compute the value that its controlling variable then takes, $-T$. The quantity $T$ is the **return ratio** of that source, the loop gain seen by it. It is what a designer measures in a simulator by breaking the loop at a point where the impedance level is preserved.

::: theorem Blackman's impedance formula {#thm-blackman}
The impedance seen at any port of a linear feedback circuit is

$$
Z_{\text{port}} = Z_{\text{port}}^{(0)}\,\frac{1 + T_{sc}}{1 + T_{oc}},
$$ {#eq-blackman}

where $Z_{\text{port}}^{(0)}$ is the port impedance with the chosen controlled source set to zero, and $T_{sc}$ and $T_{oc}$ are the return ratios of that source with the port short-circuited and open-circuited.
:::

::: proof
(Sketch.) With a test current $i_x$ at the port and the controlled source $k\,u$ treated as a second independent input, superposition gives the port voltage and the controlling variable as linear functions of $i_x$ and $k$: $v_x = a\,i_x + b\,ku$ and $u = c\,i_x + d\,ku$. Eliminating $u$ gives $v_x/i_x = a + bck/(1 - dk)$. With $k = 0$ this is $a = Z^{(0)}$; the open-circuit return ratio is $T_{oc} = -dk$, and with the port shorted ($v_x = 0$) the return ratio becomes $T_{sc} = -dk + bck/a$. Substituting shows $v_x/i_x = a(1 + T_{sc})/(1 + T_{oc})$. A full derivation is in Gray, Hurst, Lewis and Meyer, chapter 8.
:::

For a port at which the loop is connected in shunt, shorting the port kills the feedback signal, so $T_{sc} = 0$ and the impedance falls by $1 + T_{oc}$. For a series connection, opening the port breaks the loop, $T_{oc} = 0$, and the impedance rises by $1 + T_{sc}$. Blackman's formula therefore contains the four cases of [[#thm-impedances]] and handles mixed cases that fit none of them.

::: example The inverting amplifier with finite gain {#ex-inverting}
An op-amp with gain $A = 10^4$, infinite input resistance and zero output resistance is used as an inverting amplifier with $R_1 = 10\,\mathrm{k\Omega}$ and $R_2 = 100\,\mathrm{k\Omega}$. Find the closed-loop gain and the resistance seen looking into the inverting input node.
::: solution
Write $v^-$ for the inverting-input voltage. KCL at the inverting input with $v_o = -Av^-$:

$$
\frac{v_s - v^-}{R_1} = \frac{v^- - v_o}{R_2}, \qquad v^- = -\frac{v_o}{A}.
$$

Eliminating $v^-$ gives

$$
\frac{v_o}{v_s} = -\frac{R_2}{R_1}\,\frac{1}{1 + (1 + R_2/R_1)/A} = -\frac{10}{1 + 11/10^4} = -9.989.
$$

The loop gain is $T = AR_1/(R_1 + R_2) = 10^4/11 = 909$, and the error $1/(1 + T) = 0.11\,\%$. Note that $1 + R_2/R_1 = 1/\beta = 11$ — the **noise gain** — not the signal gain $10$, governs the loop gain.

For the input-node resistance use [[#thm-blackman]] with the op-amp as the controlled source. With $A = 0$ the output is at ground and $Z^{(0)} = R_1\parallel R_2 = 9.09\,\mathrm{k\Omega}$. Shorting the node to ground gives $T_{sc} = 0$; with the node open, $T_{oc} = T = 909$. So

$$
Z_{\text{node}} = \frac{9.09\,\mathrm{k\Omega}}{1 + 909} = 9.99\,\Omega,
$$

the "virtual ground". The same result follows from the Miller effect: $R_2$ connected across a gain of $-A$ looks like $R_2/(1 + A) = 10.0\,\Omega$ to ground, in parallel with $R_1$.
:::
:::

::: example Emitter degeneration as series–series feedback {#ex-degeneration}
A BJT is biased at $I_C = 1\,\mathrm{mA}$ ($V_T = 25\,\mathrm{mV}$) with an unbypassed emitter resistor $R_E = 1\,\mathrm{k\Omega}$. Treat the emitter resistor as a feedback network and find the effective transconductance $i_c/v_b$. Neglect $r_o$ and base current.
::: solution
The collector current flows through $R_E$ (series sampling of the output current) and develops $v_f = i_cR_E$ in series with the base–emitter loop (series mixing). The basic amplifier is the transistor, $A = g_m = I_C/V_T = 40\,\mathrm{mA/V}$, and $\beta = R_E = 1\,\mathrm{k\Omega}$, so $A\beta = g_mR_E = 40$. Then

$$
G_m = \frac{g_m}{1 + g_mR_E} = \frac{40\,\mathrm{mS}}{41} = 0.976\,\mathrm{mS} \approx \frac{1}{R_E}.
$$

The gain of the stage is now set by $R_E$, not by $g_m$, which varies with temperature and bias; the stage handles $41$ times larger input signals for the same distortion; and, by [[#thm-impedances]], the resistance looking into the collector rises to about $r_o(1 + g_mR_E)$, which is why degeneration is used in high-impedance current sources ([[electronics-1/current-mirrors]]).
:::
:::

## Design with feedback

A feedback design begins with the specification of the closed-loop gain and its accuracy, chooses $\beta$, and then asks how much open-loop gain is needed.

::: algorithm Sizing a feedback amplifier {#alg-sizing}
1. Choose the topology from the kind of input and output signals (voltage or current).
2. Set $\beta \approx 1/A_f$ from the required closed-loop gain.
3. From the allowed gain error $\epsilon$, require $T = A\beta \ge 1/\epsilon$ at the lowest open-loop gain and at the highest signal frequency of interest.
4. Check bandwidth: for a single-pole amplifier, $f_{Hf} \approx f_t\beta$.
5. Check the impedances with [[#thm-impedances]] or [[#thm-blackman]], and choose resistor values large enough not to load the amplifier, small enough to keep noise and the effect of stray capacitance low.
6. Check stability ([[electronics-2/stability-compensation]]).
:::

::: example Designing for gain accuracy {#ex-design}
Design a non-inverting amplifier with a gain of $50$ and an error below $0.1\,\%$, using an op-amp whose open-loop gain lies anywhere between $5\times10^4$ and $2\times10^5$ (production spread over temperature). The signal bandwidth is $1\,\mathrm{kHz}$ and the op-amp has $f_t = 10\,\mathrm{MHz}$. Choose the resistors.
::: solution
Take $\beta = 1/50 = 0.02$, that is $R_2/R_1 = 49$. At the lowest gain the loop gain is $T = 5\times10^4\times0.02 = 1000$, giving an error of $-1/(1 + 1000) = -0.0999\,\%$: just inside the specification. At the highest gain the error is $-0.025\,\%$.

At $1\,\mathrm{kHz}$ the op-amp still has its full gain only if its open-loop corner is above $1\,\mathrm{kHz}$. With $f_t = 10\,\mathrm{MHz}$ and $A_0 = 5\times10^4$, the corner is at $f_H = f_t/A_0 = 200\,\mathrm{Hz}$, so at $1\,\mathrm{kHz}$ the open-loop gain is $\abs{A} = 9.81\times10^3$ at a phase of $-78.7^\circ$, and the loop gain is $T = 196\angle{-78.7^\circ}$. The complex error factor $1/(1 + T)$ now has magnitude $0.51\,\%$. Because $T$ is nearly imaginary, most of this error is a phase shift of $-0.29^\circ$; the error in the *magnitude* of the gain is only $0.10\,\%$, just at the limit. If the specification is on magnitude alone the design passes; if phase accuracy also matters (as in a measurement bridge or a multi-channel system), we need $\abs{T} \ge 1000$ at $1\,\mathrm{kHz}$, that is $f_t \ge 1000\times50\times1\,\mathrm{kHz} = 50\,\mathrm{MHz}$.

For the resistors, $R_1 = 1.00\,\mathrm{k\Omega}$ and $R_2 = 49.0\,\mathrm{k\Omega}$ (for example $47.5\,\mathrm{k\Omega} + 1.50\,\mathrm{k\Omega}$ in series, both E96 values) keep the feedback network's $50\,\mathrm{k\Omega}$ well above the op-amp's output resistance. Since $\beta$ enters $A_f$ directly, the resistors must be $0.05\,\%$ parts, or matched, for the overall error to stay below $0.1\,\%$.
:::
:::

::: application Feedback everywhere
A low-dropout voltage regulator is a series–shunt feedback amplifier whose input is a reference voltage and whose output is the supply rail; its output resistance, divided by the loop gain, is what keeps the rail steady when a processor's load current jumps. A precision current source for an LED or a sensor is series–series. A hearing aid, a loudspeaker amplifier and a fibre-optic receiver all rely on feedback for linearity, and a phase-locked loop uses feedback on phase rather than voltage.
:::

::: history
Harold Stephen Black (1898–1983), an engineer at Western Electric and Bell Telephone Laboratories, conceived the negative-feedback amplifier on 2 August 1927 while crossing the Hudson on the Lackawanna ferry, and noted it on a page of the *New York Times*. His patent application, filed in 1928, met scepticism (the Patent Office compared it to perpetual motion) and was granted only in 1937; his paper "Stabilized feedback amplifiers" appeared in 1934. Black's amplifiers sometimes oscillated, and the understanding of when a feedback loop is stable came from his colleagues Harry Nyquist ("Regeneration theory", 1932) and Hendrik Bode, whose 1945 book *Network Analysis and Feedback Amplifier Design* introduced the return ratio and the gain–phase relations still used today. R. B. Blackman published his impedance formula in 1943.
:::

## Where this leads

Every closed-loop formula in this chapter assumed that the loop is stable. [[electronics-2/stability-compensation]] examines what happens when $A(s)$ has several poles and shows how to shape it so that the loop stays stable with a safe margin. [[electronics-2/operational-amplifier-design]] designs the high-gain amplifier that feedback needs, and [[electronics-2/output-stages]] uses feedback to clean up crossover distortion. Positive feedback, deliberately made unstable, is the basis of [[electronics-2/oscillators]]. Feedback as a general principle of dynamic systems is the subject of [[control-systems]].

::: summary
- A feedback amplifier compares the input with a fraction $\beta$ of the output; with open-loop gain $A$ the closed-loop gain is $A_f = A/(1 + A\beta)$, which tends to $1/\beta$ when the loop gain $T = A\beta$ is large.
- The gain error is $1/(1 + T)$; changes in $A$ are divided by the desensitivity factor $1 + A\beta$, but errors in $\beta$ pass straight through.
- For a single-pole amplifier, feedback divides the gain and multiplies the bandwidth by $1 + A_0\beta$, keeping the gain–bandwidth product constant.
- Disturbances and distortion produced inside the loop are reduced by $1 + A\beta$; noise added at the input is not.
- The four topologies — series–shunt, shunt–series, series–series, shunt–shunt — stabilise voltage gain, current gain, transconductance and transresistance respectively.
- Series connections multiply impedance by $1 + A\beta$ and shunt connections divide it, at input and output; Blackman's formula handles any port.
- Real feedback networks load the amplifier; the two-port method and the return ratio give the loop gain of real circuits.
:::

## Exercises

::: exercise Closed-loop gain {level=1 check="500/(1+500*0.05)"}
An amplifier with $A = 500$ is used with $\beta = 0.05$. Find the closed-loop gain.
::: solution
$A\beta = 25$, so $A_f = 500/26 = 19.23$. The ideal value $1/\beta = 20$ is missed by $3.8\,\%$ because the loop gain is only $25$.
:::
:::

::: exercise Amount of feedback in dB {level=1 check="20*log10(1+1e5*0.01)"}
An op-amp with $A_0 = 10^5$ is used with $\beta = 0.01$. What is the amount of feedback in decibels?
::: solution
$1 + A_0\beta = 1001$, and $20\log_{10}1001 = 60.0\,\mathrm{dB}$. The closed-loop gain is $60\,\mathrm{dB}$ below the open-loop gain of $100\,\mathrm{dB}$, leaving $40\,\mathrm{dB}$.
:::
:::

::: exercise Closed-loop bandwidth {level=1 check="1e6/20"}
An op-amp has a gain–bandwidth product of $1\,\mathrm{MHz}$ and a single dominant pole. What is the $3\,\mathrm{dB}$ bandwidth, in hertz, of a non-inverting amplifier with gain $20$?
::: solution
By [[#thm-bandwidth]] the gain–bandwidth product is conserved, so $f_{Hf} = 1\,\mathrm{MHz}/20 = 50\,\mathrm{kHz}$.
:::
:::

::: exercise Required open-loop gain {level=2 check="(1/0.0001-1)/0.01"}
A feedback amplifier must have a closed-loop gain close to $100$ with a gain error not exceeding $0.01\,\%$. What is the minimum open-loop gain $A$?
::: solution
$\beta = 0.01$, and the error $1/(1 + A\beta) \le 10^{-4}$ requires $1 + A\beta \ge 10^4$, so $A \ge 9999/0.01 = 9.999\times10^5$, about $120\,\mathrm{dB}$. (The closed-loop gain is then $99.99$.)
:::
:::

::: exercise Sensitivity {level=2}
The closed-loop gain of a feedback amplifier must change by no more than $0.5\,\%$ when the open-loop gain changes by $\pm25\,\%$ about its nominal value of $2000$. Find the largest closed-loop gain that can be achieved.
::: hint
Use the exact formula of [[#thm-desensitivity]] with the worst case, the decrease to $A' = 1500$.
:::
::: solution
For a decrease to $A' = 1500$ the exact change is $-0.25/(1 + 1500\beta)$; requiring its magnitude to be at most $0.005$ gives $1 + 1500\beta \ge 50$, so $\beta \ge 0.0327$. (The increase to $2500$ gives $0.25/(1 + 2500\beta)$, a smaller change.) With $\beta = 0.0327$ the nominal closed-loop gain is $2000/(1 + 2000\times0.0327) = 2000/66.3 = 30.2$. The largest closed-loop gain is about $30$.
:::
:::

::: exercise Hum reduction {level=2 check="0.5/(1+1000*0.1)"}
A power amplifier's output stage injects $0.5\,\mathrm{V}$ of $100\,\mathrm{Hz}$ ripple at its output. The amplifier has forward gain $A = 1000$ and is used with $\beta = 0.1$. How much ripple, in volts, appears at the closed-loop output? What happens to the ratio of ripple to signal if the input is adjusted to keep the same output signal as without feedback?
::: solution
By [[#thm-disturbance]] the ripple is $0.5/(1 + 100) = 4.95\,\mathrm{mV}$. Without feedback an input $v_s$ gives $1000v_s$; with feedback the gain is $9.90$, so the input must be raised by $101$ to give the same output. The signal is then unchanged and the ripple is $101$ times smaller: the ripple-to-signal ratio improves by $40.1\,\mathrm{dB}$.
:::
:::

::: exercise A transimpedance amplifier {level=2}
A photodiode delivering up to $10\,\mu\mathrm{A}$ drives the inverting input of an op-amp with $A = 10^5$, whose non-inverting input is grounded; a resistor $R_f = 100\,\mathrm{k\Omega}$ connects the output to the inverting input. Find the transresistance, the full-scale output voltage, and the input resistance seen by the photodiode.
::: solution
This is shunt–shunt with $\beta = -1/R_f$ (a current returned per volt of output; the sign is absorbed by the inversion of the op-amp). Since $v^- = -v_o/A$, KCL at the inverting input gives $i_s = (v^- - v_o)/R_f$, so

$$
\frac{v_o}{i_s} = -\frac{R_f}{1 + 1/A} \approx -100\,\mathrm{k\Omega},
$$

that is $-0.1\,\mathrm{V}/\mu\mathrm{A}$, and $10\,\mu\mathrm{A}$ gives $-1.00\,\mathrm{V}$. The input resistance is $R_f/(1 + A) = 10^5/(1.00001\times10^5) \approx 1.0\,\Omega$, so the photodiode sees almost a short circuit and its voltage stays near zero, which keeps its response linear and its capacitance from slowing the circuit.
:::
:::

::: exercise The dual impedance results {#exr-dual-impedances level=3}
Prove parts 2 and 4 of [[#thm-impedances]]: (a) shunt mixing divides the input resistance by $1 + A\beta$; (b) series sampling multiplies the output resistance by $1 + A\beta$, where for series sampling the basic amplifier is modelled as a Norton current source $Ai_e$ (or $Av_e$) in parallel with $R_o$.
::: hint
For (a), drive the input with a test current and use $i_e = i_s/(1 + A\beta)$. For (b), set the source to zero, force a test current $i_x$ through the output loop, and note that the feedback network senses $i_x$.
:::
::: solution
(a) With shunt mixing the source current $i_s$ divides between the feedback current $i_f$ and the error current $i_e$ that flows into the amplifier input resistance, so the input voltage is $v_i = i_eR_i$. Since $i_e = i_s/(1 + A\beta)$, $R_{if} = v_i/i_s = R_i/(1 + A\beta)$.

(b) Set $x_s = 0$ and drive a test current $i_x$ into the output port, which with series sampling is also the current through the feedback network's sensing port. The feedback signal is $x_f = \beta i_x$, so $x_e = -\beta i_x$ and the Norton source delivers $-A\beta i_x$ in the direction of $i_x$. The current through $R_o$ is the difference $i_x - (-A\beta i_x) = i_x(1 + A\beta)$, so the voltage across the port is $v_x = R_oi_x(1 + A\beta)$ and $R_{of} = R_o(1 + A\beta)$. Here $A$ is the short-circuit gain of the Norton model.
:::
:::

::: exercise Two-pole closed loop {level=3}
An amplifier has $A(s) = A_0/\bigl[(1 + s/\omega_1)(1 + s/\omega_2)\bigr]$ with $A_0 = 1000$, $\omega_1 = 10^4\,\mathrm{rad/s}$ and $\omega_2 = 10^6\,\mathrm{rad/s}$, and is used with frequency-independent $\beta$. (a) Find the closed-loop poles as functions of $\beta$. (b) Find the value of $\beta$ at which the poles become coincident, and the value that gives $Q = 1/\sqrt2$. (c) What happens to the poles as $\beta$ increases further?
::: hint
The closed-loop denominator is $(1 + s/\omega_1)(1 + s/\omega_2) + A_0\beta$. Write it as $s^2 + (\omega_1 + \omega_2)s + \omega_1\omega_2(1 + A_0\beta)$.
:::
::: solution
(a) Multiplying out, the closed-loop poles are the roots of $s^2 + (\omega_1 + \omega_2)s + \omega_1\omega_2(1 + A_0\beta) = 0$:

$$
s = -\frac{\omega_1 + \omega_2}{2} \pm \sqrt{\left(\frac{\omega_1 + \omega_2}{2}\right)^2 - \omega_1\omega_2(1 + A_0\beta)}.
$$

(b) Coincident poles need $(\omega_1 + \omega_2)^2 = 4\omega_1\omega_2(1 + A_0\beta)$: $(1.01\times10^6)^2/(4\times10^{10}) = 25.50 = 1 + A_0\beta$, so $\beta = 0.0245$. For a second-order denominator $s^2 + (\omega_0/Q)s + \omega_0^2$, $\omega_0^2 = \omega_1\omega_2(1 + A_0\beta)$ and $\omega_0/Q = \omega_1 + \omega_2$, so $Q^2 = \omega_1\omega_2(1 + A_0\beta)/(\omega_1 + \omega_2)^2$. Setting $Q^2 = 1/2$: $1 + A_0\beta = 0.5\times1.0201\times10^{12}/10^{10} = 51.0$, so $\beta = 0.0500$.

(c) For larger $\beta$ the poles become complex with fixed real part $-(\omega_1 + \omega_2)/2 = -5.05\times10^5\,\mathrm{rad/s}$ and growing imaginary part: $Q$ rises, the frequency response peaks and the step response rings. A two-pole loop never becomes unstable, but its margin shrinks; this is the root locus of [[control-systems/root-locus]] and the starting point of [[electronics-2/stability-compensation]].
:::
:::

::: exercise A feedback design {level=3}
Design a series–series feedback circuit — an op-amp driving the gate of an n-channel MOSFET, with a sense resistor $R_S$ from the source to ground and the source voltage fed back to the inverting input — that sinks a current of $10\,\mathrm{mA}$ per volt of input through a load in the drain. The op-amp has $A = 10^5$; the MOSFET has $g_m = 50\,\mathrm{mS}$ at the operating point. (a) Choose $R_S$. (b) Find the loop gain and the transconductance error. (c) If the MOSFET alone has $r_o = 20\,\mathrm{k\Omega}$, estimate the output resistance at the drain.
::: solution
(a) The feedback forces $v_{RS} \approx v_s$, so $i_o = v_s/R_S$; $10\,\mathrm{mA/V}$ requires $R_S = 100\,\Omega$.

(b) The basic amplifier from $v_e$ to $i_o$ is the op-amp followed by the MOSFET degenerated by $R_S$: its transconductance is $A\cdot g_m/(1 + g_mR_S)$. With $g_mR_S = 5$ this is $10^5\times0.05/6 = 833\,\mathrm{A/V}$, and $\beta = R_S = 100\,\Omega$, so $T = 8.33\times10^4$. The transconductance error is $1/(1 + T) = 1.2\times10^{-5}$, negligible against the resistor tolerance.

(c) Series sampling multiplies the output resistance. The MOSFET with source resistance $R_S$ alone has $R_o \approx r_o(1 + g_mR_S) = 20\,\mathrm{k\Omega}\times6 = 120\,\mathrm{k\Omega}$; the op-amp multiplies the effective $g_m$ by $A$, so $R_{of} \approx r_o(1 + Ag_mR_S) = 20\,\mathrm{k\Omega}\times(1 + 5\times10^5) \approx 10\,\mathrm{G\Omega}$ at low frequency. In practice leakage and the op-amp's falling gain at higher frequencies limit it far below this.
:::
:::
