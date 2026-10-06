Press a switch and charge begins to move along the wires of the device, energy is transferred, and some of it is given up as heat or light or sound. A **circuit** is the closed path that this charge travels, and the whole of electrical engineering begins with the question of what happens along it. Before any circuit can be analysed you need the four fundamental quantities — charge, current, voltage and power — and a single rule, the passive sign convention, that ties them together consistently. This lesson defines each quantity precisely, works real currents, voltages and energies from first principles, and ends with the two conservation laws, Kirchhoff's current and voltage laws, from which every result in the course follows.

## Charge, current, drift and scale

Charge is the property of matter that produces electric forces. It comes in two equal and opposite forms, and its unit is the **coulomb** (C). The elementary carrier in a metal is the electron, whose charge is

$$
q_e = -1.60217\times10^{-19}\ \mathrm{C},
$$

and in semiconductors there is also the positively charged **hole**, which behaves as though it carried $+q_e$ and moved in the opposite direction. A single coulomb is an enormous number of elementary charges: one coulomb corresponds to $1/(1.602\times10^{-19})\approx 6.242\times10^{18}$ electrons. When you see a "one ampere" rating, that is roughly six trillion trillion electrons crossing a line, every second.

::: definition Electric charge {#def-charge}
Charge $q$ is a conserved scalar quantity measured in coulombs. For a continuous distribution it is written as a density $\rho$ in coulombs per cubic metre, and the total charge in a region is $q=\int \rho\,\mathrm dv$. Charge can be transferred between bodies but never created or destroyed; the sum of all charge in an isolated system is constant.
:::

It is the *movement* of charge that carries signals and energy. Current is the rate at which charge passes a chosen cross-section.

::: definition Electric current {#def-current}
The **electric current** $i(t)$ through a surface is the rate at which charge crosses it,

$$
i(t)\;=\;\frac{\mathrm dq}{\mathrm dt}.
$$

Its unit is the **ampere** (A), one coulomb per second. The net charge crossing between times $t_0$ and $t_1$ is $\int_{t_0}^{t_1} i(t)\,\mathrm dt$. A steady value is a **direct current** (DC); a value that reverses sign periodically is an **alternating current** (AC).
:::

One subtlety is worth settling once and for all, because it causes more early sign errors than anything else. In a metal wire the charge actually carried is electrons moving one way; by long convention the *current* is taken to point the opposite way. This **conventional current** is what you will always compute and measure, and it is the direction the arrow on a wire must point. A negative result never means something has failed; it only means the flow is opposite to whatever reference direction you drew.

::: example Current from a time-varying charge {#ex-current}
A charge crossing a surface is given by $q(t) = 4t^2 + 2t$ coulombs with $t$ in seconds. Find the current at $t=1\ \mathrm s$ and the net charge that crosses between $t=0$ and $t=1$.
::: solution
The current is the derivative, $i(t) = \mathrm dq/\mathrm dt = 8t + 2$ amperes. At $t=1$ this gives $i = 8 + 2 = 10\ \mathrm A$. The net charge in the interval is $q(1)-q(0) = (4+2)-0 = 6\ \mathrm C$. As a check, integrating the current over the same interval, $\int_0^1 (8t+2)\,\mathrm dt = \left[4t^2+2t\right]_0^1 = 6\ \mathrm C$, agrees exactly. Differentiating and integrating are the same physical statement read in the two directions.
:::
:::

::: warning Reference direction and sign {#warn-conventional}
Pick the reference direction on a wire once, compute $i$ relative to it, and keep it fixed through the whole problem. A negative $i$ merely means charge flows opposite to the reference. Never "correct" a negative answer by flipping the sign of a voltage you also chose; the two are linked. Consistency of references, not the sign of any one number, is what the passive sign convention is for.
:::

The average current can be large while each electron moves at barely a millimetre per second, because the current is a *collective* effect: a vast number of slow carriers. The *signal*, by contrast, propagates at a large fraction of the speed of light through the dielectric. That is why you cannot tell, by watching electrons drift, how fast a lamp turns on.

::: quiz
A battery supplies $2\ \mathrm A$. How many coulombs pass through it in $30$ seconds, and about how many electrons is that?
- [x] $60\ \mathrm C$, roughly $3.7\times10^{20}$ electrons
- [ ] $60\ \mathrm C$, roughly $6.2\times10^{19}$ electrons
- [ ] $20\ \mathrm C$, roughly $3.7\times10^{19}$ electrons
- [ ] $1800\ \mathrm C$, roughly $1.1\times10^{22}$ electrons
::: solution
Charge is $q = i\,t = 2\times30 = 60\ \mathrm C$. Dividing by the elementary charge, $60/(1.602\times10^{-19})\approx 3.74\times10^{20}$ electrons. The first option is correct.
:::
:::

## Voltage, power, energy and the sign convention

Charge does not move by itself. It is pushed by an electric field, and the effort per unit charge is the **voltage**. Voltage is the driving quantity, current is the rate that results, and their product is the **power**, the rate of energy transfer. These three are the heart of this lesson and of everything that follows.

::: definition Voltage {#def-voltage}
The **voltage** (potential difference) $v_{AB}$ between two points $A$ and $B$ is the work done by the electric field in taking a unit positive charge from $A$ to $B$,

$$
v_{AB}\;=\;\frac{\text{energy transferred}}{\text{charge moved}}\;=\;\frac{\mathrm dW}{\mathrm dq}.
$$

Its unit is the **volt** (V), one joule per coulomb. Voltage always exists *between* two points; a single node has meaning only relative to a chosen reference point, the **ground** or **common**.
:::

::: definition Power and energy {#def-power}
The **power** delivered to a two-terminal element is the product of the voltage across it and the current through it,

$$
p = v\,i,
$$

watts (W) when volts and amperes are used. The **energy** transferred over an interval is $W = \int p\,\mathrm dt$, in joules. The sign of $p$ states the direction of transfer: with the passive sign convention, $p>0$ means the element is absorbing (consuming) power and $p<0$ means it is delivering (supplying) power.
:::

Here is the one convention you will use in everything you write in this course.

::: intuition The passive sign convention {#psc}
For any element you may draw the current arrow either way and mark the voltage polarity with $+$ and $-$. The **passive sign convention** says: place the current arrow *entering the terminal marked $+$*. Then the absorbed power is $p=v\,i$ and is positive when the element consumes energy. If instead the current enters the $-$ terminal, the absorbed power is $-v\,i$. The rule is not mere bookkeeping: it is what makes "positive" mean "absorbing" and keeps every energy balance in the network honest.
:::

A resistor is the everyday absorber, and a battery the everyday deliverer. Sizing and interrogating each of them is how you build a feel for realistic magnitudes.

::: example Power in a resistor {#ex-resistor}
A $4.7\ \mathrm{k\Omega}$ resistor has $5\ \mathrm V}$ across it. Find the current, the power it dissipates as heat, and the energy released in five minutes.
::: solution
By Ohm's law the current is $i = v/R = 5/4700 = 1.064\times10^{-3}\ \mathrm A = 1.064\ \mathrm{mA}$. The power is $p = v^2/R = 25/4700 = 5.32\ \mathrm{mW}$, equivalently $p=vi$. Energy over $t=300\ \mathrm s$ is $E = p\,t = 5.32\times10^{-3}\times300 = 1.595\ \mathrm J}. Notice that the power is positive, which is exactly what the passive convention predicts for an element that turns electrical energy into heat.
:::
:::

::: example Energy delivered by a battery {#ex-battery}
A $12\ \mathrm V}$ car battery is being drawn at $2\ \mathrm A}$ for $5$ hours. Find the power it delivers and the total energy it expends.
::: solution
Power is the product, $p = v\,i = 12\times2 = 24\ \mathrm W}$. Over $5\times3600 = 18000\ \mathrm s}$ the energy is $E = p\,t = 24\times18000 = 4.32\times10^{5}\ \mathrm J = 432\ \mathrm{kJ}$. In the common unit of ampere-hours the charge delivered is $2\ \mathrm A\times5\ \mathrm h = 10\ \mathrm{Ah}$, and since energy is charge times voltage, $E = 10\ \mathrm{Ah}\times12\ \mathrm V = 120\ \mathrm{Wh}$; and $432\ \mathrm{kJ}/3600 = 120\ \mathrm{Wh}$, so the two unit systems agree. These cross-checks are how you confirm an answer is right and not merely plausible.
:::
:::

::: widget plot
f: 8*t + 2
x: 0 1.5
y: 0 15
sliders: t
caption: The current $i(t)=8t+2\ \mathrm A}$ from the worked example. It rises linearly with time; the slope $8\ \mathrm{A/s}$ is the rate at which stored charge is changing. Move the slider to place a marker and read both the current and the time from the axes.
:::

Because $p=v\,i$, a design task is usually just an algebraic rearrangement. The trick is to identify which quantity is given and which is wanted, and to keep the reference directions straight.

::: example Choosing a resistance to meet a current {#ex-design}
You need $0.5\ \mathrm A}$ to flow from a $12\ \mathrm V}$ supply through a single resistor. Which resistance is required, and at what continuous power rating should the resistor be chosen?
::: solution
Rearrange the current law: $R = v/i = 12/0.5 = 24\ \Omega$. The continuous power that resistor must absorb is $p = v\,i = 12\times0.5 = 6\ \mathrm W}$. In practice you select a $24\ \Omega$ body with a rating *above* $6\ \mathrm W}$, say $10\ \mathrm W}$, because running a component at its limit pushes its temperature to the upper edge of the rated range and shortens life.
:::
:::

::: warning Power is a rate, and ratings are limits {#warn-power}
Power is a rate of energy transfer, not an amount, and a component's power rating is a *maximum continuous* rate, not something it stores. Exceed the rating and the part heats, and most resistors fail by thermal escape long before the current itself is dangerous. Derate deliberately: for a continuous application use a rating at least $1.5$ to $2$ times the computed power.
:::

::: quiz
An element is drawn with the current entering the $+$ terminal, $v=4\ \mathrm V}$ and $i=3\ \mathrm A}$. Is it absorbing or delivering power, and how much?
- [x] Absorbing $12\ \mathrm W}$
- [ ] Delivering $12\ \mathrm W}$
- [ ] Absorbing $7\ \mathrm W}$
- [ ] Delivering $7\ \mathrm W}$
::: solution
Under the passive sign convention (current entering the $+$ terminal) the absorbed power is $p=vi=4\times3=12\ \mathrm W}$. Positive means absorbing, so the first option is correct. Had the current entered the $-$ terminal instead, the same numbers would mean it is delivering.
:::
:::

## Sources and the laws every network obeys

The final ingredient is a grasp of the ideal **sources** that supply energy and the ideal **elements** that shape it. A source maintains a specified voltage or current regardless of what else is connected.

::: definition Voltage source and current source {#def-source}
An **independent voltage source** maintains a fixed voltage $v_s(t)$ across its terminals for any current drawn. An **independent current source** maintains a fixed current $i_s(t)$ through it for any terminal voltage. A **dependent (controlled) source** has a value proportional to some voltage or current *elsewhere* in the circuit; it is a modelling device rather than a physical battery and is drawn with a diamond symbol carrying a gain $r$, $\mu$, $\beta$ or $g$.
:::

Once sources and elements are combined into a network, two laws, direct consequences of conservation, govern the whole thing no matter how complicated it is.

$$
\text{At every node: }\ \sum_{k} i_k \;=\; 0 \qquad;\qquad \text{Around every loop: }\ \sum_{k} v_k \;=\; 0.
$$

The first is conservation of charge (a node cannot accumulate charge) and the second is conservation of energy (a charge brought once around a closed path returns to its original potential). These are **Kirchhoff's current law (KCL)** and **Kirchhoff's voltage law (KVL)**. They are not approximations and they do not require the elements to be linear; they hold for any lumped network. With Ohm's law, $v= Ri$ for a resistor, and the two Kirchhoff laws, you have everything needed to solve resistive circuits exactly, which is precisely the next lesson.

## Units, prefixes and reading a schematic

Electrical quantities span an enormous range, so the SI prefixes are not a convenience but a necessity. A nanofarad is $10^{-9}$ F, a microamp is $10^{-6}$ A, a kilohm is $10^{3}\ \Omega$ and a megohm is $10^{6}\ \Omega$. When you read a schematic, each reference direction, every $+$ and $-$ mark and each current arrow is a choice made by the designer; the passive sign convention tells you how to interpret the power of each element from those choices. Two elements in a closed path with nothing else in it is the whole of the first example a student should be able to solve: a source forcing a current through a resistor, with KVL fixing the voltage and $p=vi$ fixing the power in both. If you can do that cleanly, with the sign conventions explicit, the rest of the course is a matter of scale.

## Where this leads

With charge, current, voltage and power defined and the passive sign convention in place, you can read every label on a schematic and assign a sign to every quantity. In [[circuits-1/resistive-circuits]] these definitions become a method: reducing a network to a single equivalent element, dividing voltages and currents, and handling real parts with confidence. Keep the passive sign convention in mind always; return to it whenever a sign looks wrong, because the sign is almost never the problem — the reference is.

::: history
The language of this lesson was assembled in the early nineteenth century and then refined into the idealised models of the twentieth. Alessandro Volta's pile of 1800 provided the first reliable source of continuous current. Georg Ohm, after many years of careful measurement, published the quantitative current–voltage–resistance relation in 1827. Gustav Kirchhoff stated the two conservation laws in 1845. The ideal source and the passive sign convention, as used in modern analysis, were consolidated in the engineering texts of the 1880s–1920s. Continue in [[circuits-1/resistive-circuits]] to see these laws applied to real networks, and in [[circuits-1/nodal-mesh]] for the systematic solution methods.
:::

::: summary
- Charge $q$ (C) is conserved; current $i=\mathrm dq/\mathrm dt$ (A) is its rate of flow. One coulomb is about $6.242\times10^{18}$ elementary charges.
- Voltage $v$ (V = J/C) is energy per unit charge and drives the current; it is always measured between two points relative to a reference.
- Power $p=vi$ (W) is the rate of energy transfer; energy is $W=\int p\,\mathrm dt$ (J).
- Under the passive sign convention (current arrow into the $+$ terminal) a positive $p$ means the element absorbs power and a negative $p$ means it delivers power.
- Independent sources force a voltage or a current; dependent sources are controlled modelling elements carrying a gain.
- Kirchhoff's current law $\sum i_k=0$ at a node and Kirchhoff's voltage law $\sum v_k=0$ around a loop follow directly from conservation and are the workhorses of the next lessons.
- SI prefixes (n, $\mu$, m, k, M) are required, not optional; always check the order of magnitude of your answer against the prefix.
:::

## Exercises

::: exercise Charge from a steady current {level=1 check="45"}
A conductor carries a steady $3\ \mathrm A$. How many coulombs cross a section in $15\ \mathrm s$?
::: solution
$q = i\,t = 3\times15 = 45\ \mathrm C}$.
:::
:::

::: exercise Current from a charge pulse {level=1 check="5"}
A charge of $10\ \mathrm C}$ passes a surface in $2\ \mathrm s}$ at a constant rate. What is the current?
::: solution
$i = q/t = 10/2 = 5\ \mathrm A}$.
:::
:::

::: exercise Power from voltage and current {level=1 check="9"}
An element has $9\ \mathrm V}$ across it and carries $1\ \mathrm A}$ into the $+$ terminal. What power does it absorb?
::: solution
By the passive sign convention $p = vi = 9\times1 = 9\ \mathrm W}$.
:::
:::

::: exercise Signs in electron flow {level=2}
A wire is labelled with a reference current to the right, but measurement shows the electrons actually drifting to the left. What is the sign of the labelled conventional current, and what does that sign mean?
::: hint
Conventional current is opposite to electron flow.
:::
::: solution
The labelled conventional current is negative. That only tells you the charge flows opposite to the reference direction; it says nothing about magnitude. Keep the reference and report the signed value rather than silently flipping it.
:::
:::

::: exercise Energy of a small load {level=2 check="1080"}
A device draws a constant $100\ \mathrm{mA}$ at $3\ \mathrm V}$ for one hour. How many joules does it consume?
::: hint
Find the power first, then multiply by the time in whole seconds.
:::
::: solution
Power $p = vi = 3\times0.1 = 0.3\ \mathrm W}$. One hour is $3600\ \mathrm s}$. Energy $= 0.3\times3600 = 1080\ \mathrm J}$. If you obtain $108\ \mathrm J}$ you have used minutes; always convert to seconds.
:::
:::

::: exercise Resistor current and power {level=2}
A $2\ \mathrm{k\Omega}$ resistor has $4\ \mathrm V}$ across it. Find the current in milliamperes and the power in milliwatts.
::: hint
Use $i=v/R$, then $p=v i$ or $p=v^2/R$.
:::
::: solution
$i = 4/2000 = 2.0\ \mathrm{mA}$. Power $p = v^2/R = 16/2000 = 8\ \mathrm{mW}$.
:::
:::

::: exercise A two-element loop {level=2}
A source and a resistor form a single loop. The source is $10\ \mathrm V}$ with its upper terminal marked $+$, and the current is $2\ \mathrm A}$ clockwise. Assign the power of each element and state which absorbs and which delivers.
::: hint
Apply the passive sign convention to each element; the two powers must sum to zero.
:::
::: solution
The source drives current out of its $+$ terminal, so its absorbed power under the passive convention is $p = -v i = -20\ \mathrm W}$, i.e. it delivers $20\ \mathrm W}$. The resistor absorbs $+20\ \mathrm W}$. Delivered equals absorbed, as conservation requires.
:::
:::

::: exercise Estimating drift velocity {level=3}
Copper has a free-electron density $n=8.5\times10^{28}\ \mathrm{m}^{-3}$ and a wire cross-section $A=10^{-6}\ \mathrm{m^2}$. If it carries $1\ \mathrm A}$, estimate the electron drift speed.
::: hint
Use $i = n q A v_d$ with $q$ the magnitude of the electron charge.
:::
::: solution
Re-arrange to $v_d = i/(n q A) = 1/(8.5\times10^{28}\times1.602\times10^{-19}\times10^{-6}) = 7.34\times10^{-5}\ \mathrm{m/s}\approx0.07\ \mathrm{mm/s}$. The electrons creep along at a fraction of a millimetre per second while the signal itself travels near the speed of light in the dielectric. This is an order-of-magnitude estimate, not a value to check against.
:::
:::

::: exercise Delivering or absorbing, with a negative voltage {level=3 check="-4"}
An element has $v=-2\ \mathrm V}$ with $i=2\ \mathrm A}$ entering the $+$ terminal. Using the passive sign convention, what is the absorbed power, and is the element absorbing or delivering?
::: hint
Compute $p=vi$ directly, keeping both signs.
:::
::: solution
$p = vi = (-2)(2) = -4\ \mathrm W}$. A negative absorbed power means the element is in fact delivering $4\ \mathrm W}$. The check value $-4$ records the signed absorbed power.
:::
:::
