The AC network you have just learned to analyse does not just carry current, it delivers power, and the power is the quantity the source, the load, and the interconnection are designed for. In the resistive case the power was a scalar, $p=vi$, and the whole of it was real, dissipated as heat. In the AC case with reactance, the power splits into two parts, the real part, the one that is dissipated, and the reactive part, the one that is exchanged between the source and the reactive element and returned, and the split is set by the phase between the voltage and the current. This lesson defines the three quantities, the average or real power, the reactive power, and the complex power, gives the power factor, and shows the maximum power transfer for the AC network, which is the conjugate match, the one that sets the matching of every AC interface in the course. The method, and the checks, are the same as for the resistive case, and the one new thing, the phase, is the one that decides the split.

## Instantaneous, average, and complex power

The power of the AC network is a function of time, and the quantity of interest, the one that is delivered and billed and dissipated, is the average over a cycle.

::: definition Instantaneous and average power {#def-pow}
The **instantaneous power** is $p(t) = v(t)\,i(t)$, and it is a function of time, positive or negative depending on the phase. The **average power** (also called the real or active power) is the mean of $p(t)$ over a period, and for a single-frequency sinusoid of voltage and current it is

$$
P = V_{\text{rms}} I_{\text{rms}} \cos\phi,
$$

watts, where $\phi$ is the phase by which the current lags the voltage. This is the real power, the one that is dissipated in the resistive part of the network and delivered to the load, and it is the one that is measured by the meter and billed by the utility.
:::

The reason the average power has the $\cos\phi$ is that the component of the current that is in phase with the voltage, the real part, is the one that does work, and the component that is a quarter cycle out, the reactive part, exchanges energy and returns it, and does no net work over a cycle. The cos of the phase, and the phase itself, are the two that decide how much of the current, and therefore how much of the power, is real.

::: definition Complex power and reactive power {#def-cp}
The **complex power** is $\mathbf S = \mathbf V\mathbf I^*$, where $\mathbf V$ and $\mathbf I$ are the rms phasors and the asterisk is the complex conjugate, and it is

$$
\mathbf S = P + jQ,
$$

with $P$ the real power in watts and $Q$ the **reactive power** in vars (volt-amperes reactive). The **apparent power** is the magnitude, $|\mathbf S| = V_{\text{rms}} I_{\text{rms}}$ in volt-amperes, and it is the size of the current and the voltage without regard to the phase. The three, $P$, $Q$, and $|\mathbf S|$, are a right triangle, $|\mathbf S|^2 = P^2 + Q^2$, and the **power factor** is

$$
\mathrm{pf} = \frac{P}{|\mathbf S|} = \cos\phi,
$$

the fraction of the current that is real, and it is the one the utility cares about, because a low power factor means a large current for a given real power, and a large current means a large loss in the interconnection.
:::

::: theorem Conservation of complex power {#thm-cp}
In a network of any complexity, the complex power delivered by the sources equals the complex power absorbed by the elements, $\sum \mathbf S_{\text{sources}} = \sum \mathbf S_{\text{elements}}$, and this holds for the real part and the reactive part separately. The real power is conserved, the energy delivered, and the reactive power is conserved, the energy exchanged, and both are the same statement as the conservation of energy and the conservation of the inductive and capacitive fields. This is the check that the analysis is right, and it is the one that the resistive case used, and in the AC it is the one that includes the reactive.
:::

## The power of the simple cases

The three quantities, for the simple elements, are the ones you will use, and they are the ones you should know by heart.

::: example The power of a resistive, inductive, and capacitive load {#ex-pow}
A $10\angle0^\circ$ V source, $1\ \mathrm A)$ rms current, and three cases, a $10\ \Omega$ resistor, an inductor with $X_L=10\ \Omega$, and a capacitor with $X_C=10\ \Omega$. For each, find $P$, $Q$, $\mathbf S$, and the power factor.
::: solution
Resistor, $Z=10\ \Omega)$, the current is in phase with the voltage, $\phi=0$, $P = V I\cos0 = 10\times1\times1 = 10\ \mathrm W)$, $Q = V I\sin0 = 0$, $\mathbf S = 10 + j0\ \mathrm{VA}$, power factor $1$. Inductor, $Z=j10\ \Omega)$, $\phi = +90^\circ$, $P = 10\times1\times\cos90^\circ = 0$, $Q = 10\times1\times\sin90^\circ = +10\ \mathrm{var}$, $\mathbf S = 0 + j10\ \mathrm{VA}$, power factor $0$, the current lags the voltage by $90^\circ$, and the inductor stores energy in its field and returns it each half-cycle, doing no net work. Capacitor, $Z=-j10\ \Omega)$, $\phi = -90^\circ$, $P = 0$, $Q = -10\ \mathrm{var}$, $\mathbf S = 0 - j10\ \mathrm{VA}$, power factor $0$, the current leads the voltage by $90^\circ$, and the capacitor stores energy in its field and returns it. The three are the three limits, all real, all inductive, all capacitive, and the one in between is the one with both the resistor and the reactance, and it is the one that the rest of the lesson is for.
:::
:::

## The power factor and its correction

The power factor is the one that the practical design is for, and a low one, the one that comes from the reactive load, is the one that costs, and the one that the utility charges for.

::: proposition Power factor and its correction {#prop-pf}
The power factor, $\cos\phi$, is the fraction of the current that is real, and a load with a low power factor draws a large current for a given real power. The correction is to add a reactive element in parallel with the load, the capacitor for the inductive load, the inductor for the capacitive one, so that the net reactive power is reduced, and the current for the same real power is reduced, and the loss in the interconnection is reduced. The correction does not change the real power of the load, it changes the reactive that the load draws, and the net current.
:::

::: example Correcting a power factor {#ex-pf}
A load draws $10\ \mathrm kVA)$ of apparent power at a power factor of $0.6$ lagging. Find the real and the reactive power, and the capacitor that corrects the power factor to $1$.
::: solution
The real power is $P = 10\ cos0.6 = 10\times0.6 = 6\ \mathrm{kW})$. The apparent is $10\ \mathrm{kVA})$, so the reactive is $Q = \sqrt{S^2 - P^2} = \sqrt{10^2 - 6^2} = 8\ \mathrm{kvar})$, lagging, and it is the one that the capacitor must cancel. The capacitor that supplies $8\ \mathrm{kvar}$ at the given voltage brings the net reactive to zero, and the power factor to $1$, and the current is reduced from that that drew the $8\ \mathrm{kvar}$ to that that draws only the real power. The real power of the load is unchanged, still $6\ \mathrm{kW})$, and the one that changes is the current, and the loss, and that is the one that the correction is for.
:::
:::

::: warning The correction changes the current, not the load {#warn-pf}
A power-factor correction changes the reactive power that the load draws from the source, and therefore the current, and the loss in the line, but it does not change the real power of the load, and it does not change the load. A capacitor placed in parallel with an inductive load does not make the inductor less inductive, it supplies the reactive that the inductor wants, so that the source does not have to, and the net current is reduced. This is the point that is lost if you treat the correction as a change to the load, and it is the one that the design is for, the reduction of the current and the loss, not the change of the load.
:::

::: example The power of a general load {#ex-pow2}
A $10\angle0^\circ$ V source drives a $4 - j3\ \Omega)$ load. Find the real and the reactive power, the current, and the power factor.
::: solution
The load impedance is $Z = 4 - j3\ \Omega)$, so $|Z| = \sqrt{4^2 + 3^2} = 5\ \Omega)$, and the current is $\mathbf I = 10/5 = 2\ \mathrm A)$, with a phase of $+30^\circ)$, because the load is capacitive and the current leads. The real power is $P = |\mathbf I|^2 R = 4\times4 = 16\ \mathrm W)$, and the reactive power is $Q = |\mathbf I|^2 X = 4\times(-3) = -12\ \mathrm{var})$, capacitive. The complex power is $16 - j12\ \mathrm{VA}$, with an apparent $|\mathbf S| = \sqrt{16^2 + 12^2} = 20\ \mathrm{VA})$, and the power factor is $P/|\mathbf S| = 16/20 = 0.8$, the one that the correction of the later lesson targets. This is the full power analysis of a general load, and it is the same as the resistive case, with the reactive added, and the check, the real and the reactive, is the one that the conservation of complex power requires the source to supply.
:::
:::

## Maximum power transfer, the conjugate match

The maximum power transfer of the resistive case, the match of the load to the source resistance, has an AC extension, and it is the one that sets the matching of every AC interface.

::: proposition Maximum power transfer, conjugate match {#prop-mpt}
A Thevenin source with voltage $\mathbf V_{\text{th}}$ and complex impedance $Z_{\text{th}} = R + jX$ delivers maximum real power to a load $Z_L$ when $Z_L = R - jX$, the complex conjugate of the source impedance. The maximum power is

$$
P_{\max} \;=\; \frac{|\mathbf V_{\text{th}}|^2}{4R},
$$

and at the match the source and the load exchange reactive power, and the real power is set by the resistive part alone. The reactive part of the source impedance is not matched, it is cancelled, by the reactive part of the load, and the one that is matched is the resistance.
:::

::: example The conjugate match {#ex-mpt}
A source has $\mathbf V_{\text{th}} = 10\angle0^\circ\ \mathrm V)$ and $Z_{\text{th}} = 4 + j3\ \Omega)$. Find the load that extracts the most real power, and that maximum power.
::: solution
The conjugate match is $Z_L = 4 - j3\ \Omega)$. The total impedance is $Z_{\text{th}} + Z_L = 8\ \Omega)$, purely real, so the current is $\mathbf I = 10/8 = 1.25\ \mathrm A)$, and the power to the load is

$$
P_{\max} = |\mathbf I|^2 R = 1.25^2 \times 4 = 6.25\ \mathrm W),
$$

which is the $|\mathbf V_{\text{th}}|^2/4R = 100/16 = 6.25\ \mathrm W)$ of the theorem. The match cancels the reactive of the source, the $+j3$ and the $-j3$, so that the current is at its maximum and in phase with the real part of the voltage, and the real power is at its maximum. This is the conjugate match, and it is the one that the audio interface, the radio interface, and every AC transfer is designed for, and it is the AC extension of the match you already met.
:::
:::

::: widget plot
f: 10*(cos(0)) 
x: 0 1.57
y: 0 1
sliders:
caption: The real power, the average, as a fraction of the voltage times the current, against the phase by which the current lags the voltage, in radians, from zero to a quarter cycle. The cosine is the one that decides the real power, and the maximum, at zero phase, is the one that the power factor of one, the pure real, reaches, and the fall, with the phase, is the one that the reactive, the one that the inductive and the capacitive load, causes, and the one that the correction is for.
:::

::: quiz
A load draws $8\ \mathrm{kW}$ of real power and $6\ \mathrm{kvar)$ of reactive power. What is the apparent power, and the power factor?
- [x] $10\ \mathrm{kVA}$, $0.8$
- [ ] $14\ \mathrm{kVA}$, $1.0$
- [ ] $2\ \mathrm{kVA}$, $0.5$
- [ ] $10\ \mathrm{kVA}$, $1.4$
::: solution
$S = \sqrt{P^2 + Q^2} = \sqrt{8^2 + 6^2} = 10\ \mathrm{kVA}$, and the power factor is $P/S = 8/10 = 0.8$. The three form a $8$-$6$-$10$ right triangle, and the power factor is the adjacent over the hypotenuse, the real over the apparent.
:::
:::

## Where this leads

With the real, the reactive, and the complex power, and the power factor, and the conjugate match, in hand, you have the full power analysis of the linear AC network, and the one that the load, and the source, and the interconnection, are designed for. In [[circuits-2/three-phase-circuits]] the single-phase power you have just done is applied three times, with the $120^\circ$ offset, to the three-phase system, and the power of the three-phase, the one that the utility delivers, is the one that the single-phase analysis is the building block of. The method never changes, and the one that is new in each chapter is the quantity, and the same algebra, and the phase, and the check, are the ones you already have.

::: history
The real, the reactive, and the apparent power, and the power factor, were the standard of the AC power system from the beginning, and they were the quantities that the engineers who designed and installed the system used, and the power-factor correction, the one that the utility charges for, is the one that followed from the design of the distribution. The complex power, the one that ties the three together, and the conjugate match, the one that sets the AC interface, were the standard of the design, and they built on the work of the engineers of the power system and the radio. The method you have just learned, the analysis of the power by the real, the reactive, and the complex, is the same one that the three-phase and the coupling chapters apply, and it is the one that the filter design of the later courses builds on, with the same algebra and the phase as the variable.
:::

::: summary
- The instantaneous power is $p(t)=v(t)i(t)$; the average, or real, power is $P=VI\cos\phi$, the one that is delivered and dissipated.
- The complex power is $\mathbf S = \mathbf V\mathbf I^* = P + jQ$, with $Q$ the reactive power in vars, and the apparent power is $|\mathbf S| = VI$, and the three form a right triangle, $|\mathbf S|^2=P^2+Q^2$.
- The power factor, $\cos\phi$, is the fraction of the current that is real, and a low one means a large current for the real power, and the one that the correction is for.
- The conservation of complex power, the sources equal the elements, for the real and the reactive separately, is the check that the analysis is right.
- A purely resistive load has all real power and no reactive; a purely inductive or capacitive load has no real power and all reactive, and the one in between is the one that the correction and the match are for.
- The maximum power transfer of the AC is the conjugate match, $Z_L = Z_{\text{th}}^*$, and the maximum power is $|\mathbf V_{\text{th}}|^2/4R$, and it is the one that every AC interface is designed for.
:::

## Exercises

::: exercise Real power of a resistor {level=1 check="10"}
A $10\ \Omega$ resistor has $10\ \mathrm V$ rms across it. What is the real power?
::: solution
$P = V^2/R = 100/10 = 10\ \mathrm W)$. A pure resistor has all real power, no reactive.
:::
:::

::: exercise Reactive power of an inductor {level=1 check="10"}
An inductor with $X_L=10\ \Omega$ has $10\ \mathrm V$ rms across it. What is the reactive power?
::: solution
$Q = V^2/X_L = 100/10 = 10\ \mathrm{var})$, inductive. A pure inductor has no real power, all reactive.
:::
:::

::: exercise Power factor from P and S {level=1 check="0.8"}
A load has $P=8\ \mathrm{kW}$ and $S=10\ \mathrm{kVA}$. What is the power factor?
::: solution
$\mathrm{pf} = P/S = 8/10 = 0.8$.
:::
:::

::: exercise Complex power {level=2}
A $12\angle0^\circ$ V rms source drives a $3 + j4$ ohm load. Find the real and the reactive power.
::: hint
$\mathbf S = \mathbf V^2 / Z^*$, or $P = |\mathbf V|^2 R/|Z|^2$, $Q = |\mathbf V|^2 X/|Z|^2$.
:::
::: solution
$|Z| = 5\ \Omega)$, $|\mathbf V|^2 = 144$. $P = 144\times3/25 = 17.28\ \mathrm W)$, $Q = 144\times4/25 = 23.04\ \mathrm{var})$, inductive. The complex power is $17.28 + j23.04$, and the apparent is $\sqrt{17.28^2 + 23.04^2} = 28.8\ \mathrm{VA})$, and the power factor is $17.28/28.8 = 0.6$.
:::
:::

::: exercise Conjugate match {level=2 check="6.25"}
A source of $10$ V rms and $4 + j3$ ohm is loaded for maximum power. What is the maximum power?
::: solution
$P_{\max} = |\mathbf V|^2/4R = 100/16 = 6.25\ \mathrm W)$, with the load $4 - j3\ \Omega)$.
:::
:::

::: exercise Correcting to unity {level=2 check="8"}
A load draws $6\ \mathrm{kW}$ at a power factor of $0.6$ lagging. What is the reactive power, and the capacitor that cancels it?
::: hint
$Q = P\tan\phi$ with $\cos\phi=0.6$.
:::
::: solution
$\cos\phi=0.6$, $\tan\phi = \sqrt{1-0.36}/0.6 = 0.8/0.6 = 1.333$. $Q = 6\times1.333 = 8\ \mathrm{kvar})$, lagging, and the capacitor must supply $8\ \mathrm{kvar}$ to bring the power factor to $1$. The real power is unchanged, and the one that changes is the current and the loss.
:::
:::

::: exercise Why the conservation is two equations {level=3}
Explain why the conservation of complex power is two independent statements, one for the real and one for the reactive.
::: hint
Relate each to a physical conservation.
:::
::: solution
The real power, the energy delivered over a cycle, is conserved by the conservation of energy, the work done by the source equals the work done by the elements, and the reactive power, the energy exchanged between the source and the reactive elements and returned, is conserved by the conservation of the inductive and capacitive fields, the energy stored in one half-cycle is returned in the next. The two are independent, because the real is the net work and the reactive is the exchanged, and neither can be derived from the other, and the two together are the full statement that the source and the elements agree.
:::
:::

::: exercise The apparent is the size, not the power {level=3}
Explain the difference between the apparent power and the real power, and why a utility cares about both.
::: hint
Relate the apparent to the current, and the real to the work.
:::
::: solution
The apparent power is the product of the rms voltage and the rms current, the size of the current, and it is the one that sets the loss in the line, $I^2R$, and the size of the equipment, the wire, the breaker, the transformer. The real power is the work delivered, the one that is dissipated. A low power factor means a large apparent for a small real, and a large current, and a large loss, and a large equipment, and the utility cares about the apparent, because it is the one that the loss and the capacity are for, and it charges for the reactive, or reduces the rate, when the power factor is low. The two are the two, the size and the work, and the utility cares about the size, because the size is the one that costs, and the work, because the work is the one that is delivered.
:::
:::
