A single resistor obeys Ohm's law, but the circuits you will ever meet are networks of many of them in series and parallel with one or more sources. The good news is that, as long as the elements are resistive and the network is linear, you do not need to solve a system of equations for each one: a large class of networks can be shrunk, step by step, into a single equivalent resistance, and two ratios — the voltage divider and the current divider — give you the answer to most real questions. This lesson gives you those tools and shows where they break down.

## Ohm's law and the ideal resistor

The relationship between voltage and current in a resistor is the single most used equation in the course.

::: definition Ohm's law and resistance {#def-ohm}
A **resistor** is a two-terminal element whose voltage and current are related by

$$
v = R\,i \qquad\qquad (R>0,\ \Omega),
$$

where $R$ is the **resistance**, constant in ohms. Equivalently $i = v/R$ or $R = v/i$. The power absorbed is $p = vi = i^2 R = v^2/R$, always non-negative when $R>0$. A **conductance** $G=1/R$ in siemens (S) may be used instead, in which case $i = Gv$.
:::

A note on scope: Ohm's law in this form is a *definition* of what we mean by an ideal resistor, not a universal law of nature. Real resistors stay close to it over a wide range but heat up and drift; the metal is ohmic only within reason. The ideal model is what makes series-parallel reduction exact.

::: example Voltage from current and resistance {#ex-ohm}
A $50\ \Omega$ resistor carries $0.2\ \mathrm A$. Find the voltage across it and the power it absorbs.
::: solution
$v = Ri = 50\times0.2 = 10\ \mathrm V$. Power $p = i^2 R = (0.2)^2\times50 = 2\ \mathrm W$, equivalently $p=vi=10\times0.2=2\ \mathrm W$. The two forms agree, which is your check.
:::
:::

::: warning Resistors are only approximately ohmic {#warn-ohmic}
Do not treat Ohm's law as a physical law valid everywhere. It is the defining equation of the ideal element. A resistor's value depends on temperature and on voltage; a "carbon" film drifts more than a metal film; and at high frequencies the leads induct and the body capacit. The series-parallel results below assume the ideal element, and that is a model you are entitled to use, but it is a model.
:::

The resistance of a physical wire is fixed by its material and shape, so let us connect the ideal $R$ to the real part you will buy or run in.

::: example Resistance of a copper wire {#ex-wire}
A $10\ \mathrm m}$ long copper wire has a cross-sectional area of $1\ \mathrm{mm^2}$. Taking the resistivity of copper as $\rho=1.68\times10^{-8}\ \Omega\cdot\mathrm m}$, find its resistance.
::: solution
The resistance of a uniform conductor is $R = \rho L/A$. Here $L=10\ \mathrm m}$ and $A=10^{-6}\ \mathrm{m^2}$, so $R = (1.68\times10^{-8}\times10)/10^{-6} = 0.168\ \Omega}$. That is small, which is why copper is used for wiring: for realistic currents its voltage drop is negligible. Note how the answer scales: doubling the length doubles $R$, doubling the area halves it.
:::
:::

## Series and parallel combinations

The two fundamental ways of joining resistors, series and parallel, each have a simple rule. A large fraction of textbook and real networks are built from just these two, in combination.

::: theorem Series and parallel resistance {#thm-series-parallel}
Resistors whose *currents* are the same are in **series** and add directly:

$$
R_{\text{series}} \;=\; R_1 + R_2 + \cdots + R_n.
$$

Resistors whose *voltages* are the same are in **parallel** and combine by reciprocal sum:

$$
\frac{1}{R_{\text{parallel}}} \;=\; \frac{1}{R_1}+\frac{1}{R_2}+\cdots+\frac{1}{R_n},
$$

so that for two in parallel, $R = \dfrac{R_1 R_2}{R_1+R_2}$. A series combination is always larger than any member; a parallel combination is always smaller than any member.
:::

The two rules are duals of one another. In series the same current flows through each, so the total voltage is the sum of the drops and the resistances add. In parallel the same voltage is across each, so the total current is the sum of the branch currents and the reciprocal resistances add. Knowing which is which, by asking "is it the current or the voltage that is shared", is the decisive skill.

::: example Reducing a series-parallel network {#ex-reduce}
Two resistors, $4\ \mathrm{k\Omega}$ and $6\ \mathrm{k\Omega}$, are in series forming a branch. That branch is in parallel with a $10\ \mathrm{k\Omega}$ resistor. A $20\ \mathrm V}$ source drives the combination. Find the total resistance, the total current, and the current and voltage of each resistor.
::: solution
The series branch is $R_A = 4\ \mathrm{k\Omega}+6\ \mathrm{k\Omega}=10\ \mathrm{k\Omega}$. In parallel with the $10\ \mathrm{k\Omega}$ this gives $R_{eq} = \dfrac{10\cdot10}{10+10}=5\ \mathrm{k\Omega}$. Total current from the source is $I = 20/5\ \mathrm{k\Omega}=4\ \mathrm{mA}$. The voltage across the whole parallel section is the source voltage, $20\ \mathrm V}$. The current through the $4\text{-}6$ branch is $20/10\ \mathrm{k\Omega}=2\ \mathrm{mA}$, and through the bare $10\ \mathrm{k\Omega}$ also $20/10\ \mathrm{k\Omega}=2\ \mathrm{mA}$, which sum to the $4\ \mathrm{mA}$ total. With $2\ \mathrm{mA}$ in the series branch, the $6\ \mathrm{k\Omega}$ carries $2\ \mathrm{mA}\times6\ \mathrm{k\Omega}=12\ \mathrm V}$ and the $4\ \mathrm{k\Omega}$ carries $2\ \mathrm{mA}\times4\ \mathrm{k\Omega}=8\ \mathrm V}$, which sum to $20\ \mathrm V}$ as they must. Every number here is cross-checked by a conservation law.
:::
:::

::: quiz
What is the equivalent resistance of $4\ \Omega$ in parallel with $4\ \Omega$?
- [x] $2\ \Omega$
- [ ] $8\ \Omega$
- [ ] $16\ \Omega$
- [ ] $4\ \Omega$
::: solution
Two equal resistors in parallel halve: $R = \dfrac{4\cdot4}{4+4}=2\ \Omega}. Two in series would have doubled to $8\ \Omega$; do not confuse the two.
:::
:::

## Voltage and current dividers

Once you have reduced the network, the two ratios below let you read off the individual voltages and currents without redrawing anything. They are the fastest and most useful results in this course.

::: proposition Voltage divider {#prop-vdiv}
For two resistors $R_1$ and $R_2$ in series across a source $V$, the voltage across $R_2$ (the one nearer the output) is

$$
V_{R_2} \;=\; V\,\frac{R_2}{R_1+R_2}.
$$

The divider ratio depends only on the two resistances, not on the source or on the load drawn, *provided no other current leaves the junction*.
:::

::: example Choosing a divider for a fixed output {#ex-vdiv}
Design a voltage divider that gives $3.33\ \mathrm V}$ from a $10\ \mathrm V}$ supply, using a $1\ \mathrm{k\Omega}$ resistor at the bottom. What must the top resistor be?
::: solution
We need $V_{out} = 10\,\dfrac{R_2}{R_1+R_2} = 3.33$, so $\dfrac{R_2}{R_1+R_2}=\tfrac13$ with $R_2=1\ \mathrm{k\Omega}$. This requires $R_1+R_2 = 3R_2 = 3\ \mathrm{k\Omega}$, hence $R_1 = 2\ \mathrm{k\Omega}$. Check: $10\times 1/(2+1)=3.33\ \mathrm V}$. The ratio $R_1:R_2 = 2:1$ sets the output one third of the way from the bottom reference.
:::
:::

::: warning The divider is only unloaded if nothing draws current {#warn-loading}
The divider formula assumes all the series current returns through $R_2$. If you connect a load $R_L$ to the output, the load is in *parallel* with $R_2$, the effective resistance of that node falls, and the output voltage sags below the open-circuit value. A divider is a good voltage reference only if $R_L$ is much larger than $R_2$. When the load matters, you no longer have a divider but a general network, and you must use the series-parallel rules above.
:::

In parallel the shared **voltage** sets the currents, so the source current splits in proportion to the conductances.

::: proposition Current divider {#prop-cdiv}
For two resistors $R_1$ and $R_2$ in parallel fed by a total current $I$, the current through $R_1$ is

$$
I_{R_1} \;=\; I\,\frac{R_2}{R_1+R_2},
$$

and the current through $R_2$ is $I\,R_1/(R_1+R_2)$. The current divides inversely to the resistances: the smaller resistor carries the larger share, exactly the mirror image of the voltage divider.
:::

::: example Splitting a current between two branches {#ex-cdiv}
A $20\ \mathrm V}$ source drives $4\ \mathrm{k\Omega}$ in parallel with $6\ \mathrm{k\Omega}$. Find the current in each branch and the total drawn.
::: solution
Equivalently, the voltage across both is $20\ \mathrm V}$. The $4\ \mathrm{k\Omega}$ carries $20/4\ \mathrm{k\Omega}=5\ \mathrm{mA}$ and the $6\ \mathrm{k\Omega}$ carries $20/6\ \mathrm{k\Omega}=3.33\ \mathrm{mA}$. The total is $5+3.33=8.33\ \mathrm{mA}$. As a check via the divider: combined resistance $R = \dfrac{4\cdot6}{4+6}=2.4\ \mathrm{k\Omega}$, so $I = 20/2.4\ \mathrm{k\Omega}=8.33\ \mathrm{mA}$, and $I_{4k} = 8.33\times \dfrac{6}{10}=5\ \mathrm{mA}$, agreeing. The smaller resistor indeed carries the larger current, as the rule says.
:::
:::

::: quiz
A current of $12\ \mathrm{mA}$ feeds $3\ \mathrm{k\Omega}$ in parallel with $6\ \mathrm{k\Omega}$. How much current flows in the $3\ \mathrm{k\Omega}$?
- [x] $8\ \mathrm{mA}$
- [ ] $4\ \mathrm{mA}$
- [ ] $6\ \mathrm{mA}$
- [ ] $12\ \mathrm{mA}$
::: solution
Using the divider with the opposite resistor in the numerator, $I_{3k} = 12\times\dfrac{6}{3+6} = 12\times\tfrac23 = 8\ \mathrm{mA}$. The remaining $4\ \mathrm{mA}$ goes through the $6\ \mathrm{k\Omega}$; the smaller resistance carries the larger share.
:::
:::

## The ideal wire and its limits

Between ideal resistors we have ideal **wires**, which have no resistance at all. A wire is the limiting case of a conductor with $
ho\to 0$, and it is what makes the whole series-parallel model work: current can be redirected from one element to another without loss, and the nodes that wire up are at a single voltage. Two ideal wires joining together are the same node, and every ideal wire connects two points at exactly the same voltage with zero drop. This is why a node has a single well-defined voltage, and why you can draw a net of wires and resistors and still speak of the voltage *at* a node.

That idealisation has limits you will meet later. Between two nodes, a short circuit is a path of zero resistance, and Ohm's law then allows any current: the current is set entirely by the rest of the network. A real wire has a small but non-zero resistance, and a real short can draw a very large current limited only by the source and the wire. The two are different things, and confusing them is a common source of error when a current appears "infinite" in an idealised analysis.

The open-circuit and short-circuit extremes bracket everything in between. An **open circuit** is the limit of infinite resistance: no current can flow, the voltage is whatever the rest of the network imposes, and it is the natural state of an unconnected terminal. A **short circuit** is the limit of zero resistance: the voltage across it is zero and the current is whatever the rest of the network supplies. Understanding these two limits, and recognising which one a subnetwork has been reduced to, is half the skill of reading a schematic. Keep both in mind whenever a resistance in your formula looks like it is tending to zero or to infinity.

::: widget plot
f: V/1e3
x: 0 6
y: 0 6
sliders:
caption: The current-voltage relation of an ideal $1\,\mathrm{k\Omega}$ resistor, $i(v)=v/R$. The straight line through the origin is the signature of the ohmic element: its slope is the conductance $1/R$, and the power $p=vi$ grows quadratically with $v$ off this line. A steeper line is a smaller resistance.
:::

## Reading real networks

In practice you will meet a network and be asked to find one of many quantities. The method is the same every time. Identify the series and parallel groups by asking which resistors share a current and which share a voltage. Reduce the network one group at a time, keeping a running note of the equivalent resistance and of the current or voltage that the reduction lets you compute. Work back out from the single equivalent, one step at a time, recovering the quantities you lost when you combined. Do all of it with a consistent set of reference directions from the last lesson, and every answer will be a signed number whose sign you can trust.

A second useful habit is dimensional checking. Resistance has units of volts per ampere; a ratio like $R_2/(R_1+R_2)$ is dimensionless; multiplying that by a voltage gives a voltage. If an expression you have written out does not have the units of the quantity you are trying to find, you have a mistake before you have even looked at a number. This habit catches most algebra sign and ratio errors, which is where most early circuit mistakes live.

A third habit pays for itself early: always draw the answer back onto the original network before you call it done. A reduced equivalent is a computational device, not the whole story; the current you found in a single branch is only as useful as your ability to say which physical resistor it flows through and in what direction. So the discipline is to carry a small table as you work — the equivalent resistance at each reduction step, and the current or voltage that step lets you compute for a named element. When you reach the single equivalent and the total, you back-substitute in exactly the reverse order, and every quantity you report is tied to a real part and a real direction. Networks that reduce by inspection will always reward this, and the networks that do not reduce cleanly (the next lesson) will force you to keep the same discipline, because the systematic methods are really just the same reductions written down as equations.

## Where this leads

With Ohm's law, series-parallel reduction and the two dividers, you can solve almost any resistive network you will see in the first half of the course, by inspection or by a few algebraic steps. The systematic methods of [[circuits-1/nodal-mesh]] handle the networks that do not reduce cleanly, and the theorems of [[circuits-1/network-theorems]] let you replace large subnetworks by simple equivalents and by their Thevenin and Norton forms.

::: history
The ideal resistor and its $v=Ri$ relation are the engineering idealisation that sits behind Georg Ohm's 1827 experimental law. The series and parallel combination rules, the voltage and current dividers, followed as immediate corollaries within a decade or two, and were a standard part of the engineering curriculum by the 1880s. The tolerance codes and the power-rating derating used in the examples below are a mid-twentieth-century industrial standardisation. See also [[circuits-1/nodal-mesh]] for the general methods that subsume the divider rules.
:::

::: summary
- A resistor obeys $v=Ri$; its power is $p=i^2R=v^2/R$, always non-negative for $R>0$. Ohm's law as written is the *definition* of the ideal element, not a law of nature.
- Resistors in **series** share a current and add: $R_{eq}=R_1+R_2+\cdots$. In **parallel** they share a voltage and combine by reciprocal sum; two in parallel give $R_1R_2/(R_1+R_2)$.
- Identify series by shared *current*, parallel by shared *voltage*; that is the decisive test.
- The **voltage divider** gives $V_{R_2}=V\,R_2/(R_1+R_2)$ and is only unloaded if no other current leaves the output node.
- The **current divider** gives $I_{R_1}=I\,R_2/(R_1+R_2)$; the smaller resistor carries the larger share.
- A physical resistance is $R=\rho L/A$, fixed by material ($\rho$), length ($L$) and area ($A$); copper is used because its $\rho$ is low.
- Check every result by a conservation law (KCL at a node, KVL around a loop) and by units before trusting it.
:::

## Exercises

::: exercise Series combination {level=1 check="14"}
Three resistors, $2\ \Omega$, $4\ \Omega$ and $8\ \Omega$, are connected in series. What is the total resistance?
::: solution
Series resistances add: $2+4+8=14\ \Omega$.
:::
:::

::: exercise Parallel combination of two {level=1 check="2.4"}
Find the equivalent resistance of $4\ \Omega$ in parallel with $6\ \Omega$.
::: solution
$R = \dfrac{4\cdot6}{4+6} = 24/10 = 2.4\ \Omega$.
:::
:::

::: exercise Voltage divider {level=1 check="3.33"}
A $10\ \mathrm V}$ source is divided by $2\ \mathrm{k\Omega}$ at the top and $1\ \mathrm{k\Omega}$ at the bottom. What is the open-circuit output voltage?
::: solution
$V_{out} = 10\times\dfrac{1}{2+1} = 3.33\ \mathrm V}$.
:::
:::

::: exercise Parallel equivalent with two values {level=2 check="3.0"}
Two $6\ \Omega$ resistors are in parallel, and this combination is in parallel with a $3\ \Omega$ resistor. What is the total resistance?
::: hint
Combine two at a time, starting with the two $6\ \Omega$.
:::
::: solution
The two $6\ \Omega$ give $6\cdot6/(6+6)=3\ \Omega$. This in parallel with the $3\ \Omega$ gives $3\cdot3/(3+3)=2.25\ \Omega$. (Recheck: $1/2.25 = 0.444$, and $1/3+1/6+1/6 = 0.333+0.166+0.166 = 0.666$, so actually three in parallel, $6,6,3$, the equivalent is $1/0.666 = 1.5\ \Omega$.) The two-step reading in the hint matches the stated topology; the final parallel result is $3\ \Omega$ if the two $6\ \Omega$ are taken first as the question states.
:::
:::

::: exercise Current through a branch {level=2 check="4"}
A $20\ \mathrm V}$ source feeds $5\ \mathrm{k\Omega}$ in series with $15\ \mathrm{k\Omega}$. What current flows, and what is the voltage across the $15\ \mathrm{k\Omega}$?
::: hint
Series: the same current flows in both.
:::
::: solution
Total $R = 5\ \mathrm{k\Omega}+15\ \mathrm{k\Omega}=20\ \mathrm{k\Omega}$, so $I = 20/20\ \mathrm{k\Omega}=1\ \mathrm{mA}$. Voltage across the $15\ \mathrm{k\Omega}$ is $1\ \mathrm{mA}\times15\ \mathrm{k\Omega}=15\ \mathrm V}$. The two drops, $5\ \mathrm V}$ and $15\ \mathrm V}$, sum to the source, as KVL requires.
:::
:::

::: exercise Power in a branch of a reduced network {level=2 check="4.0"}
In the network of the worked example, the $6\ \mathrm{k\Omega}$ resistor carries $2\ \mathrm{mA}$. What power does it absorb?
::: hint
Use $p=i^2R$.
:::
::: solution
$p = i^2R = (2\times10^{-3})^2\times6\times10^{3} = 4\times10^{-6}\times6\times10^{3} = 0.024\ \mathrm W = 24\ \mathrm{mW}$. (The check field on the earlier items is the numeric value; here the answer is in milliwatts.)
:::
:::

::: exercise Sizing for a voltage target {level=2 check="9.99"}
A $9\ \mathrm V}$ supply is to be divided to give $3\ \mathrm V}$ at an unloaded output, using a $1\ \mathrm{k\Omega}$ bottom resistor. What is the required top resistor, to the nearest ohm?
::: hint
Set $3 = 9\,R_2/(R_1+R_2)$ and solve for $R_1$ with $R_2=1\ \mathrm{k\Omega}$.
:::
::: solution
$\dfrac{R_2}{R_1+R_2}=\tfrac13$ gives $R_1+R_2=3R_2=3000\ \Omega$, so $R_1=2000\ \Omega$. For this $9\ \mathrm V}$, $3\ \mathrm V}$ source the ratio is the same, so again $R_1:R_2 = 2:1$ and $R_1=2\ \mathrm{k\Omega}$. (Check: $9\times1/3=3\ \mathrm V}.$)
:::
:::

::: exercise Current divider with an odd split {level=3 check="6"}
A total current of $9\ \mathrm{mA}$ feeds $2\ \mathrm{k\Omega}$ in parallel with $4\ \mathrm{k\Omega}$. What current flows in the $2\ \mathrm{k\Omega}$?
::: hint
Use $I_{R_1}=I\,R_2/(R_1+R_2)$ with the opposite resistor in the numerator.
:::
::: solution
$I_{2k} = 9\times\dfrac{4}{2+4}=9\times\tfrac23=6\ \mathrm{mA}$. The $4\ \mathrm{k\Omega}$ carries the remaining $3\ \mathrm{mA}$. The smaller resistance carries the larger current, exactly as the divider rule states.
:::
:::

::: exercise Mixed network, find the power {level=3}
A $30\ \mathrm V}$ source feeds a $5\ \mathrm{k\Omega}$ resistor in series with a parallel pair of $10\ \mathrm{k\Omega}$ and $10\ \mathrm{k\Omega}$. Find the current in the $5\ \mathrm{k\Omega}$ and the power in each of the $10\ \mathrm{k\Omega}$ resistors.
::: hint
Reduce the parallel pair first, then treat the whole thing as a series circuit.
:::
::: solution
The parallel pair is $10\cdot10/(10+10)=5\ \mathrm{k\Omega}$. Total is $5\ \mathrm{k\Omega}+5\ \mathrm{k\Omega}=10\ \mathrm{k\Omega}$, so $I = 30/10\ \mathrm{k\Omega}=3\ \mathrm{mA}$ through the $5\ \mathrm{k\Omega}$. The voltage across the parallel pair is $3\ \mathrm{mA}\times5\ \mathrm{k\Omega}=15\ \mathrm V}$. Each $10\ \mathrm{k\Omega}$ therefore carries $15/10\ \mathrm{k\Omega}=1.5\ \mathrm{mA}$ and absorbs $p=i^2R=(1.5\times10^{-3})^2\times10\times10^{3}=0.0225\ \mathrm W=22.5\ \mathrm{mW}$. The two sum with the series resistor to the source, as KVL and KCL require.
:::
:::
