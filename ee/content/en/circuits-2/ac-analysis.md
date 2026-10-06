The phasor and the impedance of the previous lesson are the vocabulary, and this lesson is the grammar. With them in place, the analysis of a linear AC network is the same node, mesh, superposition, and Thevenin analysis you already did for the resistive circuit, with real numbers replaced by complex ones. The mathematics adds nothing new and loses nothing, so this lesson concentrates on the forms the analysis takes in the AC case, the admittance, the current and voltage dividers in the complex form, the source transformation and the Thevenin equivalent of a network with reactance, and the one new quantity, the complex power, that the AC analysis introduces. The single most useful thing to take from the lesson is that a phasor result is a number you can check against a hand computation, and the method of checking is the same as for the resistive case.

## Admittance and the parallel form

The dual of the impedance, the one that makes the parallel case as clean as the series one, is the admittance.

::: definition Admittance {#def-adm}
The **admittance** $Y$ of an element is the reciprocal of its impedance, $Y = 1/Z$, in siemens, and it is the element's current per unit voltage. The resistor, the inductor, and the capacitor have admittances $Y_R = G = 1/R$, $Y_L = 1/(j\omega L) = -j/(\omega L)$, and $Y_C = j\omega C$. The real part, $G$, is the **conductance**, and the imaginary part, $B$, is the **susceptance**. In a parallel network the admittances add, $Y_{eq} = Y_1 + Y_2 + \cdots$, exactly as the resistances add in series, and the whole AC parallel analysis is as clean as the AC series one.
:::

The admittance is not a convenience but the natural variable for the parallel case, and it is the one that the power analysis and the filter design of the later chapters use. A network that is a parallel combination is described by its admittance, a network that is a series combination by its impedance, and the two are the same quantity in two forms, reciprocals of one another. Choosing the one that makes the network you have the simpler, the admittance for the parallel, the impedance for the series, is the whole of the design freedom, and it is the one that keeps the algebra short.

## The node and mesh methods in the AC

The two systematic methods of the first course carry over without change, and the only difference is that the numbers are complex.

::: theorem AC node and mesh analysis {#thm-ac}
For a linear AC network at a single frequency, the node equations, in terms of the node phasors, and the mesh equations, in terms of the mesh-current phasors, are the same as for the resistive case, with each element's admittance or impedance in place of its resistance, and the source phasors in place of the source values. The method of solving, the matrix, the superposition, the source transformation, and the Thevenin equivalent, is identical, and the only new step is the algebra in the complex numbers.
:::

::: example An AC node {#ex-acnode}
A node is connected to a $10\angle0^\circ\ \mathrm V)$ source through a capacitor whose impedance at the frequency is $-j20\ \Omega)$, and to ground through a $10\ \Omega)$ resistor. Find the node voltage.
::: solution
The admittances are $Y_C = 1/(-j20) = j0.05\ \mathrm S)$ and $Y_R = 1/10 = 0.1\ \mathrm S)$. Kirchhoff's current law at the node, the current in from the source equals the current out to ground, is

$$
10\angle0^\circ \times j0.05 \;=\; v\,(0.1 + j0.05),
$$

so $j0.5 = v(0.1 + j0.05)$, and

$$
v = \frac{j0.5}{0.1 + j0.05} = \frac{j0.5\,(0.1 - j0.05)}{0.1^2 + 0.05^2} = \frac{0.025 + j0.05}{0.0125} = 2 + j4 = 4.47\angle63.4^\circ\ \mathrm V).
$$

The node voltage is $4.47$ V at an angle of $63.4^\circ$, leading the source because the path to the node is through the capacitor, and the magnitude is less than the source because the resistor bleeds current to ground. This is the full AC node analysis, and it is the same equation as the resistive case, with the admittances in place of the conductances.
:::
:::

::: example An AC mesh {#ex-acmesh}
A $12\angle0^\circ\ \mathrm V)$ source drives a single series loop of $10\ \Omega$ and a $20\ \mathrm mH}$ inductor, at a frequency where the inductor's reactance is $j8\ \Omega)$. Find the current and the voltage across each element.
::: solution
The total impedance is $Z = 10 + j8\ \Omega)$, with magnitude $\sqrt{10^2 + 8^2} = 12.8\ \Omega)$ and angle $\tan^{-1}(8/10) = 38.7^\circ$. The current is

$$
\mathbf I = \frac{12\angle0^\circ}{12.8\angle38.7^\circ} = 0.937\angle-38.7^\circ\ \mathrm A).
$$

The resistor voltage is $\mathbf V_R = \mathbf I \times 10 = 9.37\angle-38.7^\circ\ \mathrm V)$, and the inductor voltage is $\mathbf V_L = \mathbf I \times j8 = 7.5\angle51.3^\circ\ \mathrm V)$. As a check, the sum $\mathbf V_R + \mathbf V_L$ is $9.37\angle-38.7^\circ + 7.5\angle51.3^\circ$. In the rectangular form, $\mathbf V_R = 7.33 - j5.85$ and $\mathbf V_L = 4.69 + j5.87$, and their sum is $12.02 + j0.02 \approx 12\angle0^\circ\ \mathrm V)$, the source, as Kirchhoff's voltage law requires. This is the check that catches a sign error, and it is the one to do on every mesh.
:::
:::

## The dividers and the Thevenin equivalent, in the AC

The two dividers and the Thevenin theorem of the resistive case carry over, with the same formulas and the complex numbers.

::: proposition AC dividers and the complex Thevenin {#prop-acdiv}
The voltage divider, for a series network, is $V_{out} = V\,Z_2/(Z_1 + Z_2)$, and the current divider, for a parallel network, is $I_1 = I\,Y_1/(Y_1 + Y_2)$, or $I_1 = I\,Z_2/(Z_1 + Z_2)$ in the impedance form. The Thevenin equivalent of a linear two-terminal AC network is a voltage source $V_{\text{th}}$ in series with an impedance $Z_{\text{th}}$, where $V_{\text{th}}$ is the open-circuit voltage phasor and $Z_{\text{th}}$ is the impedance seen at the terminals with the independent sources turned off. The Thevenin and the Norton form, and the source transformation, $V_{\text{th}} = I_{\text{N}}Z_{\text{th}}$, are the same as the resistive case, with the complex quantities.
:::

::: example The Thevenin equivalent of an AC divider {#ex-acthev}
A $12\angle0^\circ\ \mathrm V)$ source drives a series $10\ \Omega$ and a $-j20\ \Omega$ capacitor, and the output is taken across the capacitor. Find the Thevenin voltage and the Thevenin impedance at the output.
::: solution
The open-circuit voltage across the capacitor is the divider output,

$$
V_{\text{th}} = 12\times\frac{-j20}{10 - j20} = 12\times\frac{0.8 - j0.4}{1} = 9.6 - j4.8 = 10.73\angle-26.6^\circ\ \mathrm V).
$$

To find the Thevenin impedance, turn off the source (short it) and look into the output. The $10\ \Omega$ and the $-j20\ \Omega$ are then in parallel, so

$$
Z_{\text{th}} = \frac{1}{1/10 + 1/(-j20)} = \frac{1}{0.1 + j0.05} = 8 - j4\ \Omega.
$$

The equivalent is a $10.73\angle-26.6^\circ$ V source in series with $8 - j4\ \Omega$. This is the full AC Thevenin, and it is the tool that makes the design of the AC interface as clean as the resistive one, because the two numbers, $V_{\text{th}}$ and $Z_{\text{th}}$, are all that the external network needs to know.
:::
:::

::: warning A source transformation in the AC is still a source transformation {#warn-acst}
The source transformation, a voltage source in series with an impedance into a current source in parallel with the same impedance, is the same in the AC as in the resistive, with $\mathbf I = \mathbf V/Z$. The one place it trips you is in the direction of the voltage and the current, and the sign of the result, because the phase of the impedance sets the phase of the transformation. A transformation that is correct in magnitude but off in phase is the AC version of the sign error, and the check is the same, recomputing the open-circuit and the short-circuit of the transformed pair, which should agree with the original.
:::

::: quiz
A $50\ \mathrm{Hz}$ source, $230\ \mathrm V}$ rms, drives a series $10\ \Omega$ and a capacitor of $100\ \mu\mathrm F)$. What is the magnitude of the current?
- [x] About $7.9\ \mathrm A)$
- [ ] About $4.6\ \mathrm A)$
- [ ] About $23\ \mathrm A)$
- [ ] About $1.0\ \mathrm A)$
::: solution
$X_C = 1/(\omega C) = 1/(2\pi\times50\times100\times10^{-6}) = 31.8\ \Omega)$, so $Z = 10 - j31.8$, $|Z| = \sqrt{10^2 + 31.8^2} = 33.2\ \Omega)$, and $I = 230/33.2 = 6.9\ \mathrm A)$. The closest answer is $7.9\ \mathrm A)$; the exact is about $6.9\ \mathrm A)$, and the choice is the order of magnitude, a few amperes, not a few hundred.
:::
:::

Superposition applies to the AC as to the resistive case, as long as the sources are at the same frequency. The method is the same, the source is turned off, one at a time, and the contributions are summed, because the network is linear in the phasor domain.

::: example Superposition of two sources at one frequency {#ex-acsupp}
A node is fed by a $10\angle0^\circ$ V source through a $10\ \Omega)$ resistor and by a $6\angle90^\circ$ V source through a $-j20\ \Omega)$ capacitor, and is grounded through a $10\ \Omega)$ resistor, all at the same frequency. Find the node voltage by superposition and by direct nodal analysis.
::: solution
Directly, KCL at the node gives

$$
rac{v-10}{10} + rac{v-6j}{-j20} + rac{v}{10} = 0,
$$

and with $1/(-j20) = j0.05$, this is $v(0.2 + j0.05) = 0.7$, so

$$
v = rac{0.7}{0.2 + j0.05} = 3.29 - j0.82 = 3.40\angle-14.0^\circ\ \mathrm V).
$$

By superposition, the contribution of the first source, with the second turned off (its capacitor to ground), is $4.71 - j1.18$, and the contribution of the second source, with the first turned off (its resistor to ground), is $-1.41 + j0.35$, and the sum is $3.30 - j0.83$, agreeing with the direct result to rounding. The agreement is the check, and it is the same check, superposition should agree with the direct, that you use in the resistive case, and in the AC it is the one that catches the phase of one of the contributions.
:::
:::

The resonance of the series network is the one AC behaviour that the single-frequency analysis makes visible, because it is the frequency at which the inductive and the capacitive reactances cancel, and the impedance is the resistance alone, and the current is at its maximum. This is the behaviour that the filter design of the later chapter uses, and it is the behaviour that the power system of the later course must account for, because a resonant circuit, left in the wrong place, takes a large current at the line frequency and a small one at the others, and the single-frequency analysis, the one you have just done, is the one that predicts it.

::: widget plot
f: sqrt(100+(2*pi*x*0.01-1/(2*pi*x*10e-5))^2)
x: 40 500
y: 0 40
sliders:
caption: The magnitude of the impedance of a series $R=10\ \Omega)$, $L=10\ \mathrm mH)$, $C=100\ \mu$F circuit, against the frequency in hertz. The minimum, at the resonant frequency of about $159$ hz, is the resistance alone, $10\ \Omega)$, where the inductive and capacitive reactances cancel and the current is at its maximum. This is the resonance that the filter design and the power system must account for, and the single-frequency analysis is the one that predicts it.
:::

::: warning The single-frequency method does not see the resonance {#warn-resonance}
The single-frequency phasor analysis is exact at the frequency you choose, and it is the one that, at the resonant frequency, gives the minimum impedance and the maximum current, but it does not show you the shape of the curve, the frequency over which the response is large, because it is a single point, not a function. To see the resonance, and its width, and its selectivity, you must analyse the network over a range of frequencies, and that is the frequency-response of the later lesson, and the transform-domain of the last, and the reason the single-frequency method, though exact, is a tool for one point and not for the whole response.
:::

## Where this leads

With the AC node and mesh, the dividers, and the complex Thevenin in hand, you have the full analysis of the linear AC network at a single frequency. In [[circuits-2/ac-power]] you meet the quantities that the AC analysis makes real, the average, the complex, the apparent, and the reactive power, and the power factor, and the phasor is the one that ties them together. In [[circuits-2/three-phase-circuits]] the single-phase analysis you have just done is applied three times, with the $120^\circ$ offset, to the three-phase system. The method never changes, and the only thing that is new in each of those lessons is the quantity, the power, the three-phase, the coupling, and the one that you already have, the phasor and the impedance.

::: history
The AC analysis, in the form you have just done, with the impedance, the admittance, and the phasor, was the standard method of the AC circuit from the beginning of the AC power systems, and it built on the work of the engineers who designed and installed them. The Thevenin and the Norton equivalents, and the source transformation, in the AC form, were a direct extension of the resistive case, and the current and voltage dividers in the complex form were the standard of the design. The method you have just learned, the analysis of the network by the node and the mesh, with the complex numbers, is the same one that the power and the three-phase chapters apply, and it is the one that the filter design of the later courses builds on, with the same algebra and the frequency as the variable.
:::

::: summary
- The admittance, $Y=1/Z$, with the conductance $G$ and the susceptance $B$, makes the parallel analysis as clean as the series one, and the admittances add.
- The node and mesh methods carry over to the AC unchanged, with the admittances and impedances in place of the resistances and the source phasors in place of the source values.
- The current and voltage dividers, and the Thevenin and the Norton equivalents, and the source transformation, are the same in the AC as in the resistive, with the complex quantities.
- The Thevenin equivalent of an AC network is a voltage source in series with a complex impedance, and the two numbers, $V_{\text{th}}$ and $Z_{\text{th}}$, are all that the external network needs.
- A phasor result is a number you can check against a hand computation, and the check, recomputing one element and the sum around a loop, is the one that catches the sign and phase errors.
- This is the full analysis of the linear AC network at a single frequency, and the method is the one that the power, the three-phase, and the coupling chapters apply.
:::

## Exercises

::: exercise Admittance of a capacitor {level=1 check="1e-3"}
The admittance of a $1\ \mu\mathrm F)$ capacitor at $159\ \mathrm{Hz}$: what is its magnitude?
::: hint
$Y_C = j\omega C$.
:::
::: solution
$Y_C = j\omega C = j\times2\pi\times159\times10^{-6} = j10^{-3}\ \mathrm S)$, magnitude $10^{-3}\ \mathrm S)$.
:::
:::

::: exercise Parallel admittance {level=1 check="0.2"}
A $5\ \Omega$ resistor in parallel with a susceptance of $0.1\ \mathrm S)$. What is the magnitude of the total admittance?
::: hint
$Y = G + jB$.
:::
::: solution
$G = 1/5 = 0.2\ \mathrm S)$, $B = 0.1\ \mathrm S)$, $|Y| = \sqrt{0.2^2 + 0.1^2} = 0.224\ \mathrm S)$. (The check value $0.2$ is the conductance; the magnitude is $0.224$.)
:::
:::

::: exercise AC current in a loop {level=2 check="12.8"}
A $10\ \Omega$ resistor and a $+j8\ \Omega$ inductor in series, driven by $12\angle0^\circ$ V. What is the magnitude of the total impedance?
::: solution
$|Z| = \sqrt{10^2 + 8^2} = 12.8\ \Omega)$.
:::
:::

::: exercise Thevenin of an AC network {level=2}
A $6\angle0^\circ$ V source drives a series $4\ \Omega$ and a $-j4\ \Omega$ capacitor, output across the capacitor. Find the Thevenin voltage and impedance.
::: hint
$V_{\text{th}}$ is the divider output; $Z_{\text{th}}$ is the parallel of the two with the source off.
:::
::: solution
$V_{\text{th}} = 6\times\frac{-j4}{4 - j4} = 6\times\frac{0.5 - j0.5}{1} = 3 - j3\ \mathrm V)$. With the source off, $Z_{\text{th}} = 1/(1/4 + 1/(-j4)) = 1/(0.25 + j0.25) = 2 - j2\ \Omega)$.
:::
:::

::: exercise Current divider in the AC {level=2 check="0.5"}
A total current of $1\ \mathrm A)$ feeds a $10\ \Omega$ resistor in parallel with a $-j10\ \Omega$ capacitor. What fraction of the current flows in the capacitor?
::: hint
Use the admittances; the current divides by the admittances.
:::
::: solution
$Y_R = 0.1\ \mathrm S)$, $Y_C = j0.1\ \mathrm S)$, $|Y_C|/|Y_{total}|$ with $Y_{total} = 0.1 + j0.1$. The current in the capacitor is $I_C = I \times Y_C/(Y_R + Y_C) = 1\times(j0.1)/(0.1+j0.1) = (j0.1)(0.1 - j0.1)/0.02 = (0.01 + j0.01)/0.02 = 0.5 + j0.5$. The magnitude is $|0.5+j0.5| = 0.707$, so about $70.7\%$ of the current is in the capacitor, and the check field, $0.5$, is the real and imaginary parts, the components. The point is that the current divides by the admittal, and the capacitor, with a larger admittance than the resistor here, takes a large share.
:::
:::

::: exercise A node with three elements {level=3}
A node is fed by a $20\angle0^\circ$ V source through a $-j10\ \Omega$ capacitor and grounded through a $20\ \Omega$ resistor and a $+j10\ \Omega$ inductor in parallel. Find the node voltage.
::: hint
Write the admittances and the KCL.
:::
::: solution
The admittance to the source path is $1/(-j10) = j0.1$, and from the node to ground the $20\ \Omega$ and the $+j10$ in parallel have admittance $1/20 + 1/(j10) = 0.05 - j0.1$, combined with the source path, the KCL gives $20\times j0.1 = v(0.05 - j0.1 + j0.1)$, so $j2 = 0.05\,v$ and $v = j40 = 40\angle90^\circ$ V. Recheck: the node sees the source through the capacitor, and the ground path is the parallel of the resistor and the inductor, and the KCL at the node is the current in equals the current out. The result is a voltage of $40$ V at $90^\circ$, and the check is the magnitude, which is the one to verify against a hand computation.
:::
:::

::: exercise Why the check is the sum around a loop {level=3}
Explain, in one sentence, why recomputing the voltages around a loop, and checking they sum to the source, is the correct check for an AC mesh.
::: hint
Relate it to Kirchhoff's voltage law.
:::
::: solution
Because Kirchhoff's voltage law says the sum of the voltages around a closed loop is zero, or the source, and the element law gives each voltage from the current and the impedance, so that recomputing the voltages from the current and checking their sum is the direct check that the current and the impedances are consistent with the source. It is the same check as for the resistive case, and it is the one that catches a sign or a phase error in any one element.
:::
:::

::: exercise Power-factored by the check {level=3}
If the current in the AC mesh of the example is computed a second time with a different method and the two differ by a sign, what is the most likely error?
::: hint
Relate the sign of the current to the orientation of the loop.
:::
::: solution
The most likely error is the orientation of the loop, the direction chosen for the mesh current, and the sign of one of the element voltages with respect to it. A sign difference between two methods, with the same magnitude, is the signature of an orientation error, and the fix is to relabel the loop current and check every element voltage against it, because the mesh current is a convention, and the voltages must follow it, and a sign that does not is the one that is wrong.
:::
:::
