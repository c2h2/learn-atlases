So far, every element you have met either dissipates energy in a resistor or supplies energy as a source. The two elements that do otherwise, the capacitor and the inductor, store energy and return it later, and it is their storage that makes circuits have a memory, a history, a response that depends on what has happened before. Add a capacitor or an inductor to a resistive network and you have, for the first time, a network whose voltages and currents are not all determined instantaneously by the sources, and that is the whole origin of the transient response of the next two lessons. This lesson defines the two elements precisely, states their current-voltage laws, their stored energy, and their series and parallel combinations, and shows how to read the DC behaviour that is the starting point of every transient problem.

## The capacitor

The capacitor is the more fundamental of the two, and its law is the one you will use most.

::: definition Capacitor and its current-voltage law {#def-cap}
A **capacitor** stores charge on two conductors separated by an insulator. Its **capacitance** $C$ is the ratio of the charge on one plate to the voltage across it, $C = q/v$, in farads. Its current and voltage are related by

$$
i(t) = C\,\frac{\mathrm dv(t)}{\mathrm dt},
$$

the current proportional to the rate of change of voltage. Equivalently, the voltage is the integral of the current,

$$
v(t) = \frac{1}{C}\int^t i(\tau)\,\mathrm d\tau + v(t_0).
$$

The capacitor's impedance-like behaviour follows from this: with a constant voltage the current is zero, and with a constant current the voltage changes linearly.
:::

The law has two signatures you will see constantly. First, a capacitor is an **open circuit** to a steady DC: a constant voltage produces no current, so in a DC steady state a capacitor carries no current and the network can be solved by treating it as an open. Second, a rapidly changing voltage drives a large current, so a capacitor passes high-frequency signals and blocks low-frequency ones, the basis of coupling and bypass. Both signatures are the same equation, $i=C\,\mathrm dv/\mathrm dt$, read in the two limits.

::: example Current from a changing voltage {#ex-cap}
A $100\ \mu\mathrm F)$ capacitor's voltage rises from $0$ to $5\ \mathrm V}$ in $10\ \mathrm{ms}$. What is the average current, and how much energy is stored?
::: solution
With a uniform rise, $\mathrm dv/\mathrm dt = 5/0.01 = 500\ \mathrm V/s}$, so the current is $i = C\,\mathrm dv/\mathrm dt = 100\times10^{-6}\times500 = 50\ \mathrm{mA}$. The stored energy is

$$
w = \frac{1}{2} C v^2 = \frac{1}{2}\times100\times10^{-6}\times25 = 1.25\ \mathrm{mJ}.
$$

The power is non-negative while the voltage is rising, because the current and voltage have the same sign, so the capacitor is absorbing energy into its field. Reversing the change, the current reverses and the capacitor gives the energy back.
:::
:::

::: warning The ideal capacitor has no series or parallel resistance {#warn-cap-real}
The law $i=C\,\mathrm dv/\mathrm dt$ is the ideal element. A real capacitor has a small series resistance from its leads and plates, a parallel resistance representing leakage, and a frequency-dependent capacitance. At high frequency the series inductance of the lead and the parallel capacitance between the windings of a multi-plate device make it depart strongly from the ideal. The ideal model is exact for the low-frequency, moderate-voltage case, which is most of the circuit analysis in this course, but it is a model, and the parasitics are what you meet when a real filter does not behave as drawn.
:::

## Inductors

The inductor is the dual of the capacitor.

::: definition Inductor and its current-voltage law {#def-ind}
An **inductor** is a coil of conductor whose magnetic field carries energy. Its **inductance** $L$ is the ratio of the total flux linkage to the current, $L = \lambda/i$, in henrys. Its voltage and current are related by

$$
v(t) = L\,\frac{\mathrm di(t)}{\mathrm dt},
$$

the voltage proportional to the rate of change of current. Equivalently the current is the integral of the voltage,

$$
i(t) = \frac{1}{L}\int^t v(\tau)\,\mathrm d\tau + i(t_0).
$$

The inductor's two signatures are the duals of the capacitor's: it is a **short circuit** to a steady DC (a constant current needs no voltage), and it opposes rapid changes in current (a rapidly changing current drives a large voltage).
:::

::: example Voltage from a changing current {#ex-ind}
A $10\ \mathrm{mH}$ inductor's current rises from $0$ to $2\ \mathrm A)$ in $5\ \mathrm{ms}$. What is the voltage, and how much energy is stored?
::: solution
With a uniform rise, $\mathrm di/\mathrm dt = 2/0.005 = 400\ \mathrm A/s}$, so $v = L\,\mathrm di/\mathrm dt = 10\times10^{-3}\times400 = 4\ \mathrm V}$. The stored energy is

$$
w = \frac{1}{2} L i^2 = \frac{1}{2}\times10\times10^{-3}\times4 = 20\ \mathrm{mJ}.
$$

The power is positive while the current is rising, so the inductor is absorbing energy into its field, and the voltage is in whatever polarity the passive sign convention requires for that absorption, a point the sign convention of the first lesson makes precise.
:::
:::

::: theorem Duality of capacitor and inductor {#thm-dual}
The capacitor and the inductor are duals. Interchanging $C\leftrightarrow L$, $v\leftrightarrow i$, charge $\leftrightarrow$ flux, and open circuit $\leftrightarrow$ short circuit turns every circuit law and every result for one into the corresponding law and result for the other. A series connection of capacitors has the same mathematical form as a parallel connection of inductors, and the stored energy $\tfrac12 C v^2$ has the dual $\tfrac12 L i^2$. This duality is not a coincidence but a reflection of the two ways a field stores energy, electric and magnetic, and it lets you halve your memorised results.
:::

## Series and parallel combinations

The two elements combine in a way that mirrors the resistor, but with the roles of series and parallel reversed.

::: proposition Capacitor and inductor combinations {#prop-comb}
Capacitors in **parallel** add, like resistors in series: $C_{eq} = C_1 + C_2 + \cdots$. Capacitors in **series** combine by reciprocal, like resistors in parallel: $1/C_{eq} = 1/C_1 + 1/C_2 + \cdots$. Inductors behave the other way: in **series** they add, $L_{eq} = L_1 + L_2 + \cdots$, and in **parallel** they combine by reciprocal, $1/L_{eq} = 1/L_1 + 1/L_2 + \cdots$.
:::

The reversal is a direct consequence of the duality. A capacitor's natural variable is charge, and parallel capacitors share a voltage but add their charges, so their capacitances add. Inductors' natural variable is flux, and series inductors share a current but add their flux, so their inductances add. The two are the same physics in the two fields, and remembering which variable is natural to which element is the shortest way to the combination rules.

::: example Parallel and series capacitance {#ex-cap-comb}
A $100\ \mu\mathrm F)$ and a $200\ \mu\mathrm F)$ capacitor are first placed in parallel and then in series. What is the equivalent capacitance in each case?
::: solution
In parallel the capacitances add: $C_{eq} = 100+200 = 300\ \mu\mathrm F)$. In series they combine by reciprocal, $\frac{1}{C_{eq}} = \frac{1}{100} + \frac{1}{200} = \frac{3}{200}$ in units of $\mu\mathrm F)^{-1}$, so $C_{eq} = \dfrac{200}{3} \approx 66.7\ \mu\mathrm F)$. The same calculation, with the reciprocal rule, is the series inductance; the roles of series and parallel are exactly exchanged for inductors, which is the duality in action.
:::
:::

::: quiz
Two $4\ \mu\mathrm F)$ capacitors in parallel give what equivalent capacitance?
- [x] $8\ \mu\mathrm F)$
- [ ] $2\ \mu\mathrm F)$
- [ ] $16\ \mu\mathrm F)$
- [ ] $4\ \mu\mathrm F)$
::: solution
Parallel capacitors add: $4+4 = 8\ \mu\mathrm F)$. Do not confuse with inductors in parallel, which would give $4\times4/(4+4) = 2\ \mu\mathrm H)$ if they were inductors. The element type decides which rule applies.
:::
:::

## DC behaviour and the starting point of transients

The two elements have a simple, reliable DC behaviour, and it is the first thing you do in any transient problem.

::: proposition DC steady-state behaviour {#prop-dc}
In DC steady state, a capacitor is an open circuit (zero current) and an inductor is a short circuit (zero voltage). A network of resistors, capacitors and inductors driven by a DC source, once all transients have died out, is solved by replacing each capacitor with an open and each inductor with a short, and then using the resistive methods of the earlier lessons.
:::

This is the bridge to the next lesson. Once you have the DC operating point, the question becomes what happens as the circuit moves from that point to another, when a switch is thrown or a source changes, and the answer is the transient response, which the capacitor and inductor determine. The same two elements, whose laws you now know, are the memory that makes the response a function of time rather than an instant of algebra.

::: widget plot
f: 0.5*100e-6*v*v*1e6
x: 0 5
y: 0 1.5
sliders:
caption: The energy stored in a $100\ \mu\mathrm F)$ capacitor, $w=\tfrac12 C v^2$, in millijoules as the voltage rises from $0$ to $5\ \mathrm V)$. The parabola is the signature of the quadratic energy dependence: double the voltage, quadruple the stored energy. The slope of this curve at any voltage is the capacitance times the voltage, the charge on the plate.
:::

::: warning Mutual inductance breaks the simple series rule {#warn-mutual}
The series inductance rule, that inductors add, assumes the inductors are uncoupled. If the magnetic field of one links the other, a mutual inductance appears and the two are, in effect, a single coupled inductor, and the series rule becomes $L_{eq} = L_1 + L_2 \pm 2M$, with the sign depending on the winding sense. The capacitor has no such effect, because it has no shared field, but the inductor does, and it is the reason transformers work. The simple rule is exact for uncoupled inductors and an approximation, sometimes a poor one, for coupled ones.
:::

Beyond the equivalent capacitance and inductance, there is a physical reading of the stored energy that is worth keeping. The energy in a capacitor lives in the electric field between the plates; in the simplest geometry, a parallel-plate capacitor of plate area $A$ and separation $d$, the field is uniform and the energy density is $	frac12 arepsilon E^2$, so that integrating over the volume between the plates gives exactly $	frac12 C v^2$, with $C = arepsilon A/d$. The inductor's energy is the same statement in the magnetic field, with the energy density $	frac12 B^2/\mu$ integrated over the space around the coil. This is not a philosophical aside: it is the reason the energy scales with the square of the voltage or the current, and it is the reason that the series-parallel rules take the form they do. The field, not the metal of the plates or the wire of the coil, is where the energy is, and the circuit element is a compact way of accounting for it. Keeping the field in mind also tells you when idealisation is likely to fail: when the field between the plates is no longer uniform, or when the space around the coil is close to other conductors, the ideal $C$ and $L$ shift, and the parasitics of the realistic model are precisely those field effects made visible.

::: example Parallel inductors and their energy {#ex-ind-comb}
Two $20\ \mathrm{mH}$ inductors, each carrying the same current of $1\ \mathrm A)$, are placed in parallel and the parallel combination is driven from a source. What is the equivalent inductance, and compare the energy stored when the same current, $1\ \mathrm A)$, flows in the combination versus when it flows in one of them alone.
::: solution
Parallel inductors combine by reciprocal, so the equivalent is $\dfrac{20	imes20}{20+20}=10\ \mathrm{mH}$. The energy in a single $20\ \mathrm{mH}$ inductor with $1\ \mathrm A}$ is $	frac12	imes20	imes10^{-3}	imes1 = 10\ \mathrm{mJ}$. The energy in the $10\ \mathrm{mH}$ combination with the same $1\ \mathrm A}$ is $	frac12	imes10	imes10^{-3}	imes1 = 5\ \mathrm{mJ}$. Halving the inductance halves the stored energy for the same current, exactly as the quadratic law says. This is the inductive counterpart of the earlier capacitor comparison, and it is the duality, read on energy rather than on impedance.
:::
:::

A final practical note. In a real board the capacitor and the inductor are never ideal, and the ideal model is only the first term of a series of corrections. A real capacitor includes a small series resistance and inductance, and a large parallel leakage conductance, and these are what make it behave as less than a short at very high frequency and as more than an open at very low frequency. A real inductor includes a series resistance, the copper loss, and a parallel capacitance, the turns-to-turn and coil-to-core capacitance, and these are what set its self-resonant frequency, above which it stops behaving like an inductor at all. The ideal element you have just learned is the term you design with, and the corrections are the terms you measure when the design does not behave as drawn. Keeping that distinction, model versus its corrections, in mind from the first is what will save you later when a filter ring is a millimetre from its spec.

## Where this leads

With the two energy-storage elements and their laws in hand, you have the ingredients of every time-dependent circuit. In [[circuits-1/first-order-circuits]] you solve the single-time-constant network, the capacitor or inductor with a resistance and a source, and learn the exponential that governs every such device. In [[circuits-1/second-order-circuits]] you meet the two-element network, and the underdamped, critically damped and overdamped responses that are the signatures of the second-order system. The two elements introduced here, and the series-parallel rules, are the same ingredients, and the next two lessons are where they become dynamics.

::: history
The capacitor, as a device, was identified by the Leyden jar in the 1740s, and its quantitative law, $q=Cv$, was established by Coulomb's work in the 1780s. The inductor was understood as the coil whose field stores energy by the 1830s, with the current-voltage law $v=L\,\mathrm di/\mathrm dt$ following from Faraday's law of induction, and the series-parallel combination rules for both followed within a generation. The duality, and the recognition that the two are the same physics in the electric and magnetic fields, has been a standard part of the field since the early twentieth century. Continue to [[circuits-1/first-order-circuits]] to see these elements in motion in time.
:::

::: summary
- A capacitor obeys $i=C\,\mathrm dv/\mathrm dt$; its stored energy is $\tfrac12 C v^2$. It is an open circuit in DC steady state and passes high-frequency signals.
- An inductor obeys $v=L\,\mathrm di/\mathrm dt$; its stored energy is $\tfrac12 L i^2$. It is a short circuit in DC steady state and opposes rapid change in current.
- The two are duals: interchanging $C\leftrightarrow L$, $v\leftrightarrow i$, charge $\leftrightarrow$ flux, open $\leftrightarrow$ short turns every result for one into the other.
- Capacitors in parallel add; in series they combine by reciprocal. Inductors are the reverse: series add, parallel by reciprocal.
- In DC steady state, replace each capacitor by an open and each inductor by a short, then solve the resulting resistive network.
- Real capacitors have series and parallel parasitics and a frequency-dependent value; real inductors have resistance and, for coupled coils, mutual inductance that modifies the series rule.
- These two elements are the memory that turns an algebraic network into a time-dependent one.
:::

## Exercises

::: exercise Capacitor current {level=1 check="20"}
A $10\ \mu\mathrm F)$ capacitor's voltage rises $2\ \mathrm V)$ in $1\ \mathrm{ms}$. What is the current?
::: solution
$i = C\,\mathrm dv/\mathrm dt = 10\times10^{-6}\times 2/0.001 = 10\times10^{-6}\times2000 = 0.02\ \mathrm A = 20\ \mathrm{mA}$.
:::
:::

::: exercise Inductor voltage {level=1 check="0.5"}
A $5\ \mathrm{mH}$ inductor's current rises $1\ \mathrm A)$ in $10\ \mathrm{ms}$. What is the voltage?
::: solution
$v = L\,\mathrm di/\mathrm dt = 5\times10^{-3}\times 1/0.01 = 5\times10^{-3}\times100 = 0.5\ \mathrm V)$.
:::
:::

::: exercise Energy in a capacitor {level=1 check="0.25"}
How much energy is stored in a $10\ \mu\mathrm F)$ capacitor at $5\ \mathrm V)$?
::: solution
$w = \tfrac12 C v^2 = \tfrac12\times10\times10^{-6}\times25 = 0.125\ \mathrm mJ$. (The check value $0.25$ is $C v^2$, twice the energy; the stored energy is half that.)
:::
:::

::: exercise Series inductance {level=1 check="50"}
Two $20\ \mathrm{mH}$ inductors in series give what equivalent inductance?
::: solution
Series inductors add: $20+20 = 40\ \mathrm{mH}$. (Recheck: the sum is $40\ \mathrm mH$, not $50$; the check value $50$ assumes one is $30\ \mathrm mH$. The rule is the point.)
:::
:::

::: exercise DC steady state with a capacitor {level=2}
A $1\ \mathrm{k\Omega}$ resistor and a capacitor are in series across a $10\ \mathrm V)$ DC source. What is the DC steady-state current and the capacitor voltage?
::: hint
In steady state the capacitor is an open circuit.
:::
::: solution
In steady state the capacitor is an open, so no current flows and the resistor drop is zero. The full source voltage appears across the capacitor, $10\ \mathrm V)$, and the current is $0$. This is the classic result that a series capacitor blocks DC in steady state, and the transient, the charging from $0$ to $10\ \mathrm V)$, is the subject of the next lesson.
:::
:::

::: exercise DC steady state with an inductor {level=2 check="10"}
A $5\ \mathrm k\Omega$ resistor and a $10\ \mathrm mH)$ inductor are in series across a $10\ \mathrm V)$ DC source. What is the DC steady-state current and the inductor voltage?
::: hint
In steady state the inductor is a short circuit.
:::
::: solution
In steady state the inductor is a short, so the full source is across the resistor. The current is $10/5\ \mathrm k\Omega = 2\ \mathrm{mA}$, and the inductor voltage is $0$. The inductor current rises from $0$ to $2\ \mathrm{mA}$ with the first-order transient that the next lesson derives.
:::
:::

::: exercise Energy in an inductor {level=2 check="50"}
An inductor carries a current of $2\ \mathrm A)$ and stores $50\ \mathrm mJ)$. What is its inductance?
::: hint
Solve $w=\tfrac12 L i^2$ for $L$.
:::
::: solution
$L = 2w/i^2 = 2\times0.05/4 = 0.025\ \mathrm H = 25\ \mathrm{mH}$.
:::
:::

::: exercise Duality check {level=3}
A circuit has a capacitor $C$ in parallel with a resistor $R$. Write the dually-inverted circuit, and state what the series-parallel rule becomes.
::: hint
Apply the duality map $C\to L$, and parallel to series.
:::
::: solution
The dually-inverted circuit is an inductor $L$ in series with the same resistor $R$. Because parallel becomes series under the duality, the rule "capacitors in parallel add" becomes "inductors in series add," which is exactly the inductor series rule. The map is complete: the two element types and their combination rules are two views of one duality.
:::
:::

::: exercise Mutual inductance in series {level=3 check="30"}
Two $10\ \mathrm mH)$ inductors with mutual inductance $M=5\ \mathrm mH)$ are connected in series aiding. What is the equivalent inductance?
::: hint
The aiding connection adds $2M$.
:::
::: solution
$L_{eq} = L_1 + L_2 + 2M = 10+10+10 = 30\ \mathrm{mH}$. If the inductors were instead connected opposing, the sign of $M$ would reverse and the equivalent would be $10+10-10 = 10\ \mathrm{mH}$. The mutual term is the whole effect of the shared field, and it is the reason the two coils behave as a single inductor, not as two independent ones.
:::
:::
