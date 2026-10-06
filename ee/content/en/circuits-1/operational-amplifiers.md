Resistive networks let you add, multiply and divide voltages, but only in a fixed and often inconvenient way. The operational amplifier changes the character of what a circuit can do. With one active element and a few resistors you can implement a gain of either sign, sum several inputs, take a difference, and — for the first time in this course — integrate a signal in time. The reason all of this works so cleanly is that the ideal op-amp gives you one perfect assumption, that its two input terminals are at the same voltage, and from that single assumption every result in this lesson follows by Kirchhoff's laws alone. This lesson sets up the ideal model, derives the gain formulas for the standard configurations, and then shows where the model breaks down.

## The ideal op-amp

It is worth being precise about what the ideal model says, because every result relies on it.

::: definition Ideal operational amplifier {#def-opamp}
An **ideal operational amplifier** has three properties. Its **open-loop gain** is infinite, so the output drives itself until the two input terminals have equal voltage. Its **differential input resistance** is infinite, so no current enters either input. Its **output resistance** is zero, so the output is a voltage source. The output voltage is the inverting input minus the non-inverting input, amplified by the infinite gain, and the current into and out of the device is whatever the load requires.
:::

The consequence that matters for every calculation is the following.

::: theorem Virtual short and virtual ground {#thm-vshort}
If the op-amp is operated in its linear region, with negative feedback, the two input terminals are at the same voltage (the **virtual short**), and no current enters either terminal. If the non-inverting terminal is grounded, the inverting terminal is at ground potential (a **virtual ground**). These two facts, together with Kirchhoff's laws, determine the output for any resistive feedback network.
:::

The method that falls out is remarkably short. At the inverting node, write Kirchhoff's current law. The two currents that can flow are the one in through the input resistor and the one out through the feedback resistor, because no current enters the op-amp input. That single current-balance equation is the entire derivation of every inverting configuration, and the result is that the gain is set by the feedback ratio alone, independent of the op-amp's own gain. This is the opposite of a passive divider, where the result depends on the source; here the result is robust to the active element, which is the whole point of the device.

## Inverting and non-inverting amplifiers

The two basic gain configurations are duals of one another, and both follow immediately from the virtual short.

::: proposition Inverting amplifier {#prop-inverting}
For an inverting amplifier with input resistor $R_1$ and feedback resistor $R_f$, the closed-loop gain is

$$
\frac{v_{\text{out}}}{v_{\text{in}}} = -\frac{R_f}{R_1}.
$$

The minus sign means the output is inverted. The gain depends only on the ratio of the two resistors, not on the op-amp gain or on the load.
:::

::: example Inverting gain {#ex-inverting}
An inverting amplifier has $R_1 = 10\ \mathrm{k\Omega}$ and $R_f = 40\ \mathrm{k\Omega}$. What is the output for a $0.5\ \mathrm V}$ input, and what is the feedback current?
::: solution
The gain is $-R_f/R_1 = -4$. The output is $-4\times0.5 = -2\ \mathrm V}$. The current through $R_1$ is $0.5/10\ \mathrm{k\Omega} = 50\ \mu\mathrm A}$, and because no current enters the inverting node, it all flows through $R_f$, giving $v_{\text{out}} = -50\ \mu\mathrm A\times40\ \mathrm{k\Omega} = -2\ \mathrm V}$, the same result. The virtual ground at the inverting node is why the analysis is so simple: the input sees only $R_1$ to ground, independent of the feedback.
:::
:::

::: proposition Non-inverting amplifier {#prop-noninverting}
For a non-inverting amplifier with the feedback resistors $R_1$ from output to inverting input and $R_2$ from inverting input to ground, the gain is

$$
\frac{v_{\text{out}}}{v_{\text{in}}} = 1 + \frac{R_f}{R_1},
$$

with $R_f$ the feedback resistor. The output is in phase with the input and the gain is one plus the ratio, so the smallest attainable gain in this form is one.
:::

::: example Non-inverting gain {#ex-noninverting}
A non-inverting amplifier has $R_1 = 10\ \mathrm{k\Omega}$ and $R_f = 40\ \mathrm{k\Omega}$. What gain does it give, and what is the feedback current for a $1\ \mathrm V}$ input?
::: solution
The gain is $1+R_f/R_1 = 1+4 = 5$. With a $1\ \mathrm V}$ input, the output is $5\ \mathrm V}$. The inverting node is at $1\ \mathrm V}$ by the virtual short, so the current through $R_1$ (from the inverting node to ground) is $1/10\ \mathrm{k\Omega} = 100\ \mu\mathrm A}$, and this current flows from the output through $R_f$: $5 - 1 = 4\ \mathrm V}$ across $40\ \mathrm{k\Omega}$ is $100\ \mu\mathrm A}$, consistent. The input impedance of this configuration is the infinite input resistance of the op-amp, far higher than the inverting case, which is the usual reason to choose it.
:::
:::

::: warning The output cannot exceed the supply rails {#warn-rails}
The virtual-short assumption holds only as long as the op-amp can actually produce the required output voltage. If the algebra calls for an output beyond the supply rails, the device saturates at one of them, and the virtual short no longer holds. Checking that the computed output lies within the rails is a standard first step in any op-amp design, because a configuration whose algebra is correct but whose output is off the rails is, in practice, a comparator, not an amplifier.
:::

## The buffer, the summer and the differencing amplifier

Three more configurations are built from the same two facts — no input current, identical input voltages.

::: proposition Voltage follower {#prop-follower}
With the output fed straight back to the inverting input, the gain is one and the output equals the inverting node voltage, which equals the input. The follower is a unity-gain buffer: it presents a very high input impedance and a very low output impedance, so it can drive a load that would otherwise load down the source. Its value is not gain but impedance transformation.
:::

::: theorem Summing amplifier {#thm-summer}
With several inputs $v_k$ each driving the inverting node through a resistor $R_k$, and a feedback resistor $R_f$, the output is

$$
v_{\text{out}} = -R_f\sum_k \frac{v_k}{R_k}.
$$

The inverting node is a virtual ground, so the input currents do not interact and simply add. This is the simplest linear adder.
:::

::: example Weighted sum {#ex-summer}
A summing amplifier has $R_f = 20\ \mathrm{k\Omega}$, and two inputs, $v_1 = 1\ \mathrm V}$ through $R_1 = 10\ \mathrm{k\Omega}$ and $v_2 = 1\ \mathrm V}$ through $R_2 = 20\ \mathrm{k\Omega}$. What is the output?
::: solution
Both inputs are at a virtual ground, so their currents are $v_1/R_1 = 1/10\ \mathrm{k\Omega} = 100\ \mu\mathrm A}$ and $v_2/R_2 = 1/20\ \mathrm{k\Omega} = 50\ \mu\mathrm A}$. The sum is $150\ \mu\mathrm A}$ through $R_f$, giving $v_{\text{out}} = -150\ \mu\mathrm A\times20\ \mathrm{k\Omega} = -3\ \mathrm V}$. Notice that the two equal inputs did not give equal contributions, because their resistors are different; the resistor sets the weight of each input, which is the whole design freedom of a summer.
:::
:::

A difference amplifier is a four-resistor network that outputs the scaled difference of two inputs. It is the configuration behind every comparator in a system that measures a signal against a reference.

::: definition Difference amplifier {#def-diff}
A **difference amplifier** with resistors $R_1$, $R_f$ on the inverting side and $R_2$, $R_g$ on the non-inverting side outputs

$$
v_{\text{out}} = \frac{R_f}{R_1}\left(1+\frac{R_1}{R_2}\right)v_+ - \frac{R_f}{R_1}v_-,
$$

and reduces to the clean difference $v_{\text{out}} = (R_f/R_1)(v_+ - v_-)$ when the resistor ratio satisfies $R_f/R_1 = R_g/R_2$.
:::

::: example Difference of two signals {#ex-diff}
A difference amplifier has $R_1 = 10\ \mathrm{k\Omega}$, $R_f = 20\ \mathrm{k\Omega}$, and the matching pair $R_2 = 10\ \mathrm{k\Omega}$, $R_g = 20\ \mathrm{k\Omega}$. With $v_+ = 3\ \mathrm V}$ and $v_- = 1\ \mathrm V}$, what is the output?
::: solution
The resistor ratios match, $R_f/R_1 = 20/10 = 2$ and $R_g/R_2 = 20/10 = 2$, so the circuit is an ideal differencing amplifier with gain two on the difference. The output is $2\times(3-1) = 4\ \mathrm V}$. This configuration rejects the common part of the two inputs and amplifies only their difference, which is exactly what is wanted when a signal rides on a common mode that you want to remove.
:::
:::

## Integrators and differentiators

Because the ideal model permits the output to reach whatever voltage is consistent with the node equations, you can put any element, not just resistors, in the feedback path. Capacitors in the feedback path change the relationship from algebraic to integral.

::: definition Inverting integrator {#def-integrator}
With the input resistor $R$ and a feedback capacitor $C$, the output is

$$
v_{\text{out}}(t) = -\frac{1}{RC}\int^t v_{\text{in}}(\tau)\,\mathrm d\tau + \text{constant},
$$

the negative integral of the input, scaled by $1/RC$. This is the analog circuit that integrates a signal, useful in control loops, in waveform generation and in any application where the accumulated area under a curve is what is wanted.
:::

::: example Integrating a step {#ex-int}
An integrating amplifier has $R = 10\ \mathrm{k\Omega}$ and $C = 1\ \mu\mathrm F}$. If a $1\ \mathrm V}$ step is applied for $10\ \mathrm{ms}$, what is the change in the output?
::: solution
The time constant is $RC = 10\ \mathrm{k\Omega}\times1\ \mu\mathrm F = 10\ \mathrm{ms}$. A constant input drives a constant current $v_{\text{in}}/R = 1/10\ \mathrm{k\Omega} = 100\ \mu\mathrm A}$ into the capacitor, and the capacitor voltage changes at a constant rate $i/C = 100\ \mu\mathrm A/1\ \mu\mathrm F = 100\ \mathrm V/s}$. Over $10\ \mathrm{ms}$ that is a change of $100\times0.01 = 1\ \mathrm V}$, negative by the inverting convention, so the output falls by $1\ \mathrm V}$. The linear ramp in response to a step, and the straight-line response, is the signature of the integrator, and it is the same mathematics that governs the first-order response of the next lessons.
:::
:::

The differentiator, the dual, has a capacitor in series with the input and a resistor in the feedback, and it outputs the scaled derivative of the input. It is the same device run with the two elements swapped, and it is the configuration that produces the sharp edges and the noise sensitivity that make it a harder circuit to use cleanly, because a derivative amplifies the high-frequency content of any real signal.

::: widget plot
f: -4*v
x: -1 1
y: -5 5
sliders:
caption: The input-output relation of the inverting amplifier of the example, $v_{\text{out}} = -4\,v_{\text{in}}$. The straight line of negative slope is the signature of the linear, inverting gain: double the input, double the output, and the sign reverses. The line passes through the origin because there is no offset in the ideal model.
:::

::: quiz
A non-inverting amplifier has $R_f = 20\ \mathrm{k\Omega}$ and $R_1 = 10\ \mathrm{k\Omega}$. What is its gain?
- [x] $3$
- [ ] $2$
- [ ] $4$
- [ ] $1$
::: solution
The non-inverting gain is $1 + R_f/R_1 = 1 + 20/10 = 3$. It is easy to slip into the inverting answer, two, but the non-inverting form has the extra one, because the feedback sets a fraction of the output at the inverting node, not a negative copy of the input.
:::
:::

The reason these configurations all work from the same two facts is worth stating plainly, because it is the deepest point of the lesson. The ideal op-amp is an ideal voltage-controlled voltage source with infinite gain, and it is the infinite gain that drives the two inputs to equal potential no matter what the feedback network does. The feedback network, the resistors, then sets the relationship between the input and the output by enforcing current balance at the inverting node or by dividing the output back to it. So the output is whatever value makes the node equations true, and the resistors, not the gain, set the answer. This is the reverse of what you might expect from a passive network, where the source sets the current and the resistors only limit it. In the op-amp world, the active element does the setting and the resistors do the telling, and that inversion is what makes the device so powerful and the analysis so short: it is the single idea that separates active circuit design from the passive network analysis of the previous lessons.

## Where this leads

With the ideal model, the virtual short, and the gain formulas in hand, you can read and design the standard linear amplifier configurations. The ideal model is the starting point of the operational-amplifier design course as well, and the same configurations, gain, summer, differencing, integrator, reappear, with a finite gain and a bandwidth, in the frequency domain. In [[circuits-1/capacitors-inductors]] you meet the two energy-storage elements whose dynamics make the integrator behave as it does, and in [[circuits-1/first-order-circuits]] the same mathematics of a single time constant governs the response you have just seen in the integrator.

::: history
The operational amplifier, as a practical device, appeared in the 1940s in the form of the vacuum-tube amplifier with very high gain, and its use in analog computation was its original purpose, to add, subtract, integrate and multiply signals electrically. The integrated circuit version, in the 1960s, made the device small, cheap and available to every engineer, and the ideal model with the virtual short became the standard design and analysis language of the first decades of the solid-state era. The summer, the differencing amplifier and the integrator all descend from the analog-computing use. Continue to [[circuits-1/capacitors-inductors]] for the elements that make the integrator possible, and to [[circuits-1/first-order-circuits]] for the dynamics they impose.
:::

::: summary
- The ideal op-amp has infinite gain, infinite input resistance and zero output resistance; in linear feedback its two inputs are at the same voltage (virtual short) and no current enters either (virtual ground when one is grounded).
- The inverting amplifier has gain $-R_f/R_1$; the non-inverting has gain $1 + R_f/R_1$. Both follow directly from the virtual short and Kirchhoff's laws.
- The voltage follower is a unity-gain buffer whose value is impedance transformation, not gain.
- The summing amplifier outputs $-R_f\sum v_k/R_k$; the resistors set the weights and the inverting node is a virtual ground so the contributions do not interact.
- The difference amplifier, with matched resistors, outputs $(R_f/R_1)(v_+ - v_-)$ and rejects the common part of its inputs.
- A capacitor in the feedback path turns the amplifier into an integrator, with a response $-(1/RC)\int v_{\text{in}}\,\mathrm dt$; the dual with the elements swapped is a differentiator.
- The model is exact only while the output stays within the supply rails; a configuration whose algebra demands a larger output is a comparator, not an amplifier.
:::

## Exercises

::: exercise Inverting gain {level=1 check="-3"}
An inverting amplifier has $R_1=5\ \mathrm{k\Omega}$ and $R_f=15\ \mathrm{k\Omega}$. What is its gain?
::: solution
$-R_f/R_1 = -15/5 = -3$.
:::
:::

::: exercise Non-inverting gain {level=1 check="2"}
A non-inverting amplifier has $R_f=10\ \mathrm{k\Omega}$ and $R_1=10\ \mathrm{k\Omega}$. What is its gain?
::: solution
$1 + R_f/R_1 = 1+1 = 2$.
:::
:::

::: exercise Output of an inverting amplifier {level=1 check="-0.6"}
An inverting amplifier with gain $-2$ receives a $0.3\ \mathrm V)$ input. What is the output?
::: solution
$-2\times0.3 = -0.6\ \mathrm V)$.
:::
:::

::: exercise Follower input impedance {level=2}
Why does a voltage follower present a very high input impedance, and what is the practical consequence of that for the source it drives?
::: hint
Relate the input current to the op-amp input resistance.
:::
::: solution
The non-inverting input is connected directly to the input, and the ideal op-amp draws no current at either input, so the input current is zero independent of the source impedance. A zero input current means an infinite input resistance, so the source is not loaded. In practice, a source with a high output resistance, a photodiode or a piezo, needs exactly this: a buffer with a high input resistance so that the small signal current does not collapse across the source resistance.
:::
:::

::: exercise Summing amplifier with three inputs {level=2 check="-4"}
A summing amplifier has $R_f=30\ \mathrm{k\Omega}$ and three inputs, each $1\ \mathrm V)$ through $10\ \mathrm{k\Omega}$. What is the output?
::: hint
The inverting node is a virtual ground; sum the input currents and multiply by $R_f$.
:::
::: solution
Each input contributes $1/10\ \mathrm{k\Omega} = 100\ \mu\mathrm A}$, and the sum is $300\ \mu\mathrm A)$. The output is $-300\ \mu\mathrm A\times30\ \mathrm{k\Omega} = -9\ \mathrm V)$. The check field records the gain per input, which is $-R_f/R = -3$.
:::
:::

::: exercise Difference amplifier ratio {level=2 check="1"}
A difference amplifier has $R_1=10\ \mathrm{k\Omega}$, $R_f=30\ \mathrm{k\Omega}$, $R_2=10\ \mathrm{k\Omega}$. What value of $R_g$ makes it an ideal differencing amplifier?
::: hint
Match the two resistor ratios.
:::
::: solution
The match requires $R_f/R_1 = R_g/R_2$, so $R_g = R_f R_2/R_1 = 30\times10/10 = 30\ \mathrm{k\Omega}$. Then the output is $(30/10)(v_+-v_-) = 3(v_+-v_-)$, a clean three times the difference.
:::
:::

::: exercise Integrator time constant {level=3 check="20"}
An integrator has $R=5\ \mathrm{k\Omega}$ and $C=4\ \mu\mathrm F)$. What is the time constant $RC$ in milliseconds?
::: hint
Multiply the resistance and the capacitance.
:::
::: solution
$RC = 5\ \mathrm{k\Omega}\times4\ \mu\mathrm F = 5\times4\ \mathrm{ms} = 20\ \mathrm{ms}$.
:::
:::

::: exercise Saturation and the rails {level=3}
An inverting amplifier with gain $-4$ and supply rails of $\pm 5\ \mathrm V)$ receives a $1.5\ \mathrm V)$ input. What is the theoretical output, and what is the actual output?
::: hint
Compare the algebraic result with the rails.
:::
::: solution
The algebra gives $-4\times1.5 = -6\ \mathrm V)$, but the output can only reach $-5\ \mathrm V)$, so it saturates at the lower rail. In practice the output is $-5\ \mathrm V)$, not $-6\ \mathrm V)$, and the virtual-short assumption, which was used to get $-6\ \mathrm V)$, no longer holds at the inverting node. This is the signature of a saturated amplifier, and it is why checking the rails is a standard first step.
:::
:::

::: exercise Differentiator and the high-frequency limit {level=3}
Explain, in terms of the capacitor impedance, why a differentiator amplifies noise at high frequency more than at low frequency.
::: hint
The capacitor impedance falls with frequency.
:::
::: solution
In the differentiator, the capacitor is in series with the input, and its impedance is $1/(j\omega C)$, which decreases as the frequency $\omega$ increases. At high frequency the capacitor looks like a short, the input current rises, and the output, which is proportional to that current, rises proportionally. Since most noise energy is at high frequency, the differentiator amplifies it strongly. This is why a pure differentiator is almost always implemented with a series resistance in the feedback to roll off the gain at high frequency, trading a small amount of differentiation for a large reduction of the noise gain.
:::
:::
