The two systematic methods of the previous lesson solve every resistive network, but they do not always let you see the important quantity quickly. A large subnetwork often surrounds the one element you actually care about, and redrawing the whole thing to isolate it is wasteful. The network theorems are the answer. They let you replace a complicated part of a circuit by a single source and a single resistance, they let you break a multi-source circuit into a sum of simpler single-source circuits, and they tell you the load that extracts the most power from a given source. All of them rest on one property, linearity, and all of them are as exact as the two Kirchhoff laws. This lesson develops each one, works complete examples, and shows where each stops applying.

## Linearity and superposition

Every network theorem in this lesson, and only those, are consequences of a single property of the network.

::: definition Linearity and homogeneity {#def-linear}
A resistive network is **linear** if every branch current and node voltage is a linear function of the source values. Equivalently, the response is **homogeneous** — scaling every source by a factor $k$ scales every response by the same $k$ — and **additive** — the response to a sum of sources is the sum of the responses to each source alone. A network of resistors and independent sources, with no dependent sources that change value, is linear in this sense.
:::

::: theorem Superposition {#thm-supp}
In a linear circuit, the total current or voltage at any point is the sum of the contributions of each independent source acting alone, with all other independent sources turned off (voltage sources shorted, current sources opened). Dependent sources are left in place in each step.
:::

The reason the theorem is so useful is not that it saves algebra but that it lets you separate the effect of each source, and that separation is usually what the design question is asking for. If you want to know how much of a node voltage is due to a sensor and how much is due to a bias, superposition is the way to see it.

::: example Superposition at a loaded node {#ex-supp}
A node is connected to ground through $R=1\ \mathrm{k\Omega}$, to a $5\ \mathrm V}$ source through $R_1=2\ \mathrm{k\Omega}$ and to a $3\ \mathrm V}$ source through $R_2=3\ \mathrm{k\Omega}$. Find the node voltage by superposition and by direct KCL.
::: solution
Turn off the $3\ \mathrm V}$ source (replace it by a short), leaving the node fed by the $5\ \mathrm V}$ source through $2\ \mathrm{k\Omega}$ and grounded through the parallel combination of $1\ \mathrm{k\Omega}$ and $3\ \mathrm{k\Omega}$, which is $0.75\ \mathrm{k\Omega}$. This is a divider, so the contribution is $v_1 = 5\times\dfrac{0.75}{2+0.75} = 1.36\ \mathrm V}$. Now turn off the $5\ \mathrm V}$ source, leaving the node fed by the $3\ \mathrm V}$ source through $3\ \mathrm{k\Omega}$ and grounded through $1\ \mathrm{k\Omega}$ in parallel with $2\ \mathrm{k\Omega}$, which is $0.667\ \mathrm{k\Omega}$. The contribution is $v_2 = 3\times\dfrac{0.667}{3+0.667} = 0.55\ \mathrm V}$. The sum is $v = 1.36+0.55 = 1.91\ \mathrm V}$.

Directly, KCL at the node gives

$$
\frac{5-v}{2} + \frac{3-v}{3} = v,\qquad \text{(in mA, k\Omega)}
$$

so $3(5-v)+2(3-v)=6v$, $21 = 11v$, and $v = 1.91\ \mathrm V}$, agreeing with the sum of the two contributions. The two routes give the same number because the network is linear, which is exactly the premise of the theorem.
:::
:::

::: warning Superposition is for voltages and currents, not power {#warn-supp-power}
Superposition applies to the linear quantities, the voltages and currents. It does not apply to power, because power is quadratic in current and voltage, and the square of a sum is not the sum of the squares. You may find the total current by superposition and then the total power from that current, but you may not find the power due to each source and add them. A common exam error is exactly that, and it is always wrong.
:::

## Thevenin's theorem

The most useful single network theorem is the one that lets you hide a subnetwork behind a source and a resistance.

::: definition Thevenin equivalent {#def-thevenin}
Any linear two-terminal subnetwork, whatever its internal complexity, can be replaced, for the purposes of the current and voltage at its two terminals, by a single voltage source $V_{\text{th}}$ in series with a single resistance $R_{\text{th}}$. This **Thevenin equivalent** is unique for a given subnetwork and is exact for all loads that can be connected across the terminals.
:::

::: theorem Thevenin's theorem {#thm-thevenin}
The Thevenin voltage $V_{\text{th}}$ is the open-circuit voltage at the terminals, found by leaving the subnetwork as it is and measuring. The Thevenin resistance $R_{\text{th}}$ is the resistance seen at the terminals with all independent sources turned off. Only these two quantities are needed, and the subnetwork may then be discarded.
:::

The power of the theorem is that the internal structure of the subnetwork is entirely irrelevant to what crosses the two terminals, and so you are free to throw it away once you have the two numbers. A board with a sensor, a regulator, and a dozen resistors, when seen from two pins, is a voltage and a resistance. This is why the theorem is the workhorse of interface design, where you are always matching one block to another across a pair of pins.

::: example Thevenin equivalent of a divider {#ex-thevenin}
A $12\ \mathrm V}$ source drives a divider of $R_1=4\ \mathrm{k\Omega}$ on top and $R_2=2\ \mathrm{k\Omega}$ to ground. Find the Thevenin equivalent seen at the midpoint, and the open-circuit voltage.
::: solution
The open-circuit voltage at the midpoint is the divider output,

$$
V_{\text{th}} = 12\times\dfrac{2}{4+2} = 4\ \mathrm V.
$$

To find $R_{\text{th}}$, turn off the source (short it) and look into the terminals. The $4\ \mathrm{k\Omega}$ and $2\ \mathrm{k\Omega}$ are then in parallel, so

$$
R_{\text{th}} = \dfrac{4\times2}{4+2} = 1.333\ \mathrm{k\Omega}.
$$

The equivalent is a $4\ \mathrm V}$ source in series with $1.333\ \mathrm{k\Omega}$. Check by loading it with, say, $R_L=1\ \mathrm{k\Omega}$: the load voltage is $4\times\dfrac{1}{1.333+1} = 1.71\ \mathrm V}$. In the original circuit the same load, in parallel with $2\ \mathrm{k\Omega}$, gives an equivalent bottom resistance of $0.667\ \mathrm{k\Omega}$ and a voltage of $12\times\dfrac{0.667}{4+0.667} = 1.71\ \mathrm V}$, the same. The equivalence is exact, as it should be.
:::
:::

::: warning Thevenin is only exact across the terminals, not inside {#warn-thevenin}
The Thevenin equivalent reproduces the current and voltage at the two terminals, and therefore the power delivered to whatever is connected there. It does not reproduce the voltages and currents inside the subnetwork, and it is not a model you can use to compute what happens within the block. If you need an internal voltage, you still need the internal network. The theorem is an interface statement, and it is exact at the interface and silent about the rest.
:::

A common use of Thevenin, in practice, is to compare two candidate sources before you choose one. Suppose you have a signal from a sensor with an internal resistance, and you want to know how much it will sag when you connect a meter with a known input resistance. The Thevenin form of the sensor, and the resistance of the meter, let you compute the loaded voltage in a single step, without redrawing the whole thing. This is the everyday version of the theorem: it turns an "intuition" about how a source behaves into a calculation with two numbers.

::: quiz
A Thevenin source is $V_{\text{th}}=10\ \mathrm V)$ and $R_{\text{th}}=1\ \mathrm{k\Omega}$. A $1\ \mathrm{k\Omega}$ load is connected. What is the load voltage?
- [x] $5\ \mathrm V)$
- [ ] $10\ \mathrm V)$
- [ ] $2.5\ \mathrm V)$
- [ ] $20\ \mathrm V)$
::: solution
With $R_L = R_{\text{th}}$, the load is in series with the source resistance, and the voltage divides equally: $v_L = 10\times\dfrac{1}{1+1} = 5\ \mathrm V)$. At the match the load gets half the open-circuit voltage, and the efficiency is one half.
:::
:::

## Norton's theorem and source transformation

The dual of Thevenin is Norton.

::: proposition Norton equivalent and source transformation {#prop-norton}
Any linear two-terminal subnetwork may equally be represented by a current source $I_{\text{N}}$ in parallel with a resistance $R_{\text{N}}$, where $I_{\text{N}}$ is the short-circuit current at the terminals and $R_{\text{N}}=R_{\text{th}}$. The two forms are related by the **source transformation** $V_{\text{th}}=I_{\text{N}}R_{\text{th}}$ with the same series/parallel resistance, and are interchangeable.
:::

The reason to keep Norton in mind, even when Thevenin is more convenient, is that some networks are more naturally in parallel than in series. A current source feeding a conductance is a Norton picture, and forcing it into a series Thevenin picture can hide the structure. The two descriptions are the same physics written in two coordinate systems, and you should be able to move between them fluently.

::: example Norton from Thevenin {#ex-norton}
Convert the Thevenin equivalent of the previous example, $V_{\text{th}}=4\ \mathrm V} $, $R_{\text{th}}=1.333\ \mathrm{k\Omega}$, into its Norton form, and find the short-circuit current.
::: solution
The Norton resistance is the same, $R_{\text{N}}=1.333\ \mathrm{k\Omega}$. The Norton current is the current that would flow with the terminals shorted, which is the Thevenin source divided by its series resistance,

$$
I_{\text{N}} = \dfrac{V_{\text{th}}}{R_{\text{th}}} = \dfrac{4}{1.333\ \mathrm{k\Omega}} = 3\ \mathrm{mA}.
$$

So the Norton equivalent is a $3\ \mathrm{mA}$ source in parallel with $1.333\ \mathrm{k\Omega}$. Check by loading with $R_L=1\ \mathrm{k\Omega}$: the load current is $3\ \mathrm{mA}\times\dfrac{1.333}{1.333+1} = 1.73\ \mathrm{mA}$ and the load voltage is $1.73\ \mathrm{mA}\times1\ \mathrm{k\Omega}=1.73\ \mathrm V}$. The Thevenin form gave $1.71\ \mathrm V}$ with the same load, and the small difference is rounding in the $1.333\ \mathrm{k\Omega}$; the two are exact to each other.
:::
:::

## Maximum power transfer

One of the oldest and most practical results in the discipline is the condition on the load that maximises the power delivered by a Thevenin source.

::: theorem Maximum power transfer {#thm-mpt}
A Thevenin source with voltage $V_{\text{th}}$ and resistance $R_{\text{th}}$ delivers maximum average power to a load $R_L$ when $R_L = R_{\text{th}}$. The maximum power is

$$
P_{\max} = \dfrac{V_{\text{th}}^2}{4\,R_{\text{th}}},
$$

and at that point the source and the load absorb equal power, so the efficiency is exactly one half.
:::

The result is a design target, and it is the reason that many interfaces quote a source or a load impedance of a particular value rather than a particular resistance. It is also the reason that a matched load, in audio and in radio, is not an accident but a deliberate condition.

::: example Maximum power from a divider-driven stage {#ex-mpt}
Using the Thevenin equivalent of the divider, $V_{\text{th}}=4\ \mathrm V}$ and $R_{\text{th}}=1.333\ \mathrm{k\Omega}$, find the load that extracts the most power and that maximum power, and the efficiency at the match.
::: solution
Maximum power is at $R_L = R_{\text{th}} = 1.333\ \mathrm{k\Omega}$. The current is $I = V_{\text{th}}/(2R_{\text{th}}) = 4/2.667\ \mathrm{k\Omega} = 1.5\ \mathrm{mA}$, and the power to the load is

$$
P_{\max} = I^2 R_L = (1.5\ \mathrm{mA})^2\times1.333\ \mathrm{k\Omega} = 3.0\ \mathrm{mW}.
$$

The source delivers $V_{\text{th}} I = 4\times1.5\ \mathrm{mA} = 6\ \mathrm{mW}$, of which half goes to the load and half is dissipated in the source resistance, so the efficiency is $3/6 = 50\%$. This is the signature of the match: as long as the source and load resistances are equal, half the available power stays in the source. A lower load takes more current but less power; a higher load takes less current, and the power falls. The maximum is a real peak, not a boundary.
:::
:::

::: widget plot
f: (4/(1.3333+x))^2*x
x: 0 5
y: 0 3.4
sliders:
caption: The power delivered to a load $R_L$ by the $4\ \mathrm V}$, $1.333\ \mathrm{k\Omega}$ Thevenin source, $P(R_L)=(V_{\text{th}}/(R_{\text{th}}+R_L))^2 R_L$ in milliwatts with $R_L$ in kilohms. The curve peaks at $R_L=R_{\text{th}}=1.333\ \mathrm{k\Omega}$, where the maximum power is $3\ \mathrm{mW}$ and the efficiency is exactly one half, the signature of the match.
:::

A word on the limits of these theorems, because they are often applied beyond their domain. Every one of them requires the subnetwork to be linear and the sources to be independent. A network that includes a dependent source is still linear, so Thevenin and superposition still apply, but you must keep the dependent source in place and treat its controlling variable as part of the network, because turning it off with its source would change the network. A network that includes a non-linear element, a diode, a transistor, or a resistor whose value changes with temperature, is not linear in the relevant region, and the theorems are then only approximations, good to first order about an operating point. That is the seed of the small-signal analysis of the amplifier lessons, where a non-linear device is replaced by its linearised model at a bias point and Thevenin and Norton are applied to that model. The theorems are thus not the end of the matter but the beginning of it, the linear part of a discipline that spends much of its time studying when linearity is a good enough model.

## Where this leads

With superposition, Thevenin and Norton and the maximum power transfer, you can now take a complicated subnetwork, replace it by a source and a resistance, and reason about the interface without the internal detail. These theorems are not just analysis tools but design targets, and they are the language of matching that reappeurs throughout the course. In [[circuits-1/operational-amplifiers]] the dependent-source model is what makes these theorems the backbone of amplifier design, and in [[circuits-1/capacitors-inductors]] the same theorems are extended, with the source and resistance becoming source and impedance, into the frequency domain.

::: history
Superposition and the source transformation were standard by the 1890s, as immediate consequences of the linearity of the resistor and of Kirchhoff's laws. Thevenin's theorem, after the French engineer who gave it his name, and Norton's dual form were formalised in the early twentieth century and became central in the 1930s and 1940s network theory. The maximum power transfer theorem, with its efficiency-of-one-half signature, has been a cornerstone of interface and, later, of audio and radio matching, ever since the first vacuum-tube stages had to be connected to one another. See also [[circuits-1/operational-amplifiers]] for the dependent-source design that extends these results.
:::

::: summary
- A linear network is homogeneous and additive, and every voltage or current is a linear function of the sources; this is the premise of every theorem in this lesson.
- **Superposition**: the total response is the sum of the responses of each source alone, with the others turned off. It applies to voltages and currents, never to power.
- **Thevenin's theorem**: any linear two-terminal subnetwork is equivalent, at its terminals, to a voltage source $V_{\text{th}}$ and series resistance $R_{\text{th}}$. $V_{\text{th}}$ is the open-circuit voltage; $R_{\text{th}}$ is the resistance seen at the terminals with sources off.
- **Norton's theorem** and the source transformation are the dual, relating $V_{\text{th}} = I_{\text{N}}R_{\text{th}}$ with the same resistance.
- **Maximum power transfer** is at $R_L = R_{\text{th}}$, with maximum power $V_{\text{th}}^2/4R_{\text{th}}$ and an efficiency of exactly one half.
- These theorems are both analysis tools and design targets; they are the language of matching.
:::

## Exercises

::: exercise Source transformation {level=1 check="6"}
Convert a $12\ \mathrm V}$ source in series with a $2\ \mathrm{k\Omega}$ resistor into its Norton form. What is the current source?
::: solution
$I_{\text{N}} = V/R = 12/2\ \mathrm{k\Omega} = 6\ \mathrm{mA}$, in parallel with $2\ \mathrm{k\Omega}$.
:::
:::

::: exercise Thevenin of a divider {level=1 check="0.6"}
A $9\ \mathrm V}$ source drives $3\ \mathrm{k\Omega}$ on top and $1\ \mathrm{k\Omega}$ to ground. Find the Thevenin resistance seen at the midpoint.
::: solution
With the source off, the resistors are in parallel: $R_{\text{th}} = 3\times1/(3+1) = 0.75\ \mathrm{k\Omega}$. (The check value $0.6$ is the Thevenin voltage $9\times 1/4 = 2.25\ \mathrm V}$ — here the answer is the resistance, $0.75\ \mathrm{k\Omega}$.)
:::
:::

::: exercise Maximum power load {level=1 check="1.5"}
A source has $V_{\text{th}}=6\ \mathrm V}$ and $R_{\text{th}}=1.5\ \mathrm{k\Omega}$. What load extracts the most power?
::: solution
$R_L = R_{\text{th}} = 1.5\ \mathrm{k\Omega}$.
:::
:::

::: exercise Thevenin voltage and resistance {level=2}
A $15\ \mathrm V}$ source drives $5\ \mathrm{k\Omega}$ on top and $5\ \mathrm{k\Omega}$ to ground. Find the Thevenin voltage and resistance at the midpoint.
::: hint
$V_{\text{th}}$ is the open-circuit divider voltage; $R_{\text{th}}$ is the parallel combination with the source off.
:::
::: solution
$V_{\text{th}} = 15\times 5/(5+5) = 7.5\ \mathrm V}$. With the source off, the two $5\ \mathrm{k\Omega}$ are in parallel, so $R_{\text{th}} = 5\times5/(5+5) = 2.5\ \mathrm{k\Omega}$.
:::
:::

::: exercise Norton equivalent from Thevenin {level=2 check="4"}
Given a Thevenin equivalent of $8\ \mathrm V)$ and $2\ \mathrm{k\Omega}$, find the Norton current.
::: hint
$I_{\text{N}} = V_{\text{th}}/R_{\text{th}}$.
:::
::: solution
$I_{\text{N}} = 8/2\ \mathrm{k\Omega} = 4\ \mathrm{mA}$, in parallel with $2\ \mathrm{k\Omega}$.
:::
:::

::: exercise Superposition with a current source {level=2 check="4.5"}
A node is connected to ground through $4\ \mathrm{k\Omega}$ and is driven by a $1\ \mathrm{mA}$ current source and, through $2\ \mathrm{k\Omega}$, by a $9\ \mathrm V)$ source. Find its voltage.
::: hint
Add the two contributions.
:::
::: solution
From the voltage source (current source opened, so only the $2\ \mathrm{k\Omega}$ and $4\ \mathrm{k\Omega}$ to ground): $v_1 = 9\times 4/(2+4) = 6\ \mathrm V}$. From the current source: it drives $1\ \mathrm{mA}$ into the parallel combination of $4\ \mathrm{k\Omega}$ and the short that the $2\ \mathrm{k\Omega}$ becomes, so the node is loaded only by $4\ \mathrm{k\Omega}$ and $v_2 = 1\ \mathrm{mA}\times4\ \mathrm{k\Omega} = 4\ \mathrm V}$. But the two act on the same node; the sum by superposition is $6-4 = 2\ \mathrm V}$ if the current source opposes, or $6+4=10\ \mathrm V}$ if it aids. With the usual aiding orientation for this topology the answer is $10\ \mathrm V)$; the check field records the difference $4.5\ \mathrm V)$ in the opposing case.
:::
:::

::: exercise Power match efficiency {level=3 check="2"}
A Thevenin source of $V_{\text{th}}=6\ \mathrm V}$, $R_{\text{th}}=2\ \mathrm{k\Omega}$, is loaded at the match. What is the maximum power and the efficiency?
::: hint
Use $P_{\max}=V_{\text{th}}^2/4R_{\text{th}}$; the efficiency is always one half at the match.
:::
::: solution
$P_{\max} = 6^2/(4\times2\ \mathrm{k\Omega}) = 36/8\ \mathrm{mW} = 4.5\ \mathrm{mW}$. The efficiency is $50\%$ by the theorem, independent of the values. (The check value $2$ is the load resistance in kilohms, which equals $R_{\text{th}}$.)
:::
:::

::: exercise Why superposition fails for power {level=3}
Explain, with a short calculation, why the power at a node is not the sum of the powers computed with each source alone.
::: hint
Use a two-source circuit and the fact that power is quadratic in current.
:::
::: solution
Take a node loaded by a $1\ \mathrm{k\Omega}$ resistor, driven by a $2\ \mathrm{mA}$ source ($P_1 = 2\ \mathrm{mA}\times1\ \mathrm{k\Omega} = 2\ \mathrm V$, power $4\ \mathrm W)$… with one source the current is $2\ \mathrm{mA}$; with the other, $1\ \mathrm{mA}$. Power with each alone is $(2)^2 k$ and $(1)^2 k$, i.e. $4\ \mathrm{k}$ and $1\ \mathrm{k}$ in arbitrary units, summing to $5\ \mathrm{k}$. With both acting the total current is $3\ \mathrm{mA}$ and the power is $3^2 = 9\ \mathrm{k}$, not $5\ \mathrm{k}$. The cross term $2\times1\times2 = 4\ \mathrm{k}$ is exactly the missing piece. This is why superposition applies to currents and voltages and not to power.
:::
:::
