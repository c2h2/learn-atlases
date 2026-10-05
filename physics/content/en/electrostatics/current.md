The electrostatic chapters treated charges that stay put. A conductor in equilibrium carries its excess charge on the surface, the field inside the material is zero, and no charge is moving. Connect that conductor into a circuit with a battery and the equilibrium is broken in a controlled way. A steady trickle of charge flows. The trickle is a **current**. The battery maintains a potential difference, the field inside the wire is small but not zero, and the moving charges collide with the lattice and hand their organised energy to it as heat.

This chapter defines current and current density, relates them to the slow drift of the carriers, and states the material law that many conductors obey: Ohm's law, both as $V = IR$ and as a local relation between $\mathbf{J}$ and $\mathbf{E}$. From that law the resistance of a uniform wire is $\rho L/A$. The field does work on the carriers at the rate $IV$, and in a resistor that work is dissipated. The signal that switches a lamp on is not the drift of any one electron down the wire. We use

$$
e = 1.602176634\times 10^{-19}\,\mathrm{C}, \qquad c = 2.99792458\times 10^{8}\,\mathrm{m/s},
$$

and, when a relaxation time is estimated, the electron mass $m_e = 9.109\times 10^{-31}\,\mathrm{kg}$. The potential that pushes the current is the electrostatic potential of [[electrostatics/potential]], valid here because a steady current produces a magnetic field that does not change with time, so the electric field remains conservative. Changing magnetic flux is a later correction, treated with Faraday's law.

## Current and current density

::: definition Electric current {#def-current}
Choose an oriented surface. Let $\Delta Q$ be the charge that crosses the surface in the sense of the orientation during a time $\Delta t$. The **average current** through the surface is $\Delta Q/\Delta t$. The **current** at an instant is

$$
I = \frac{\dd Q}{\dd t}.
$$ {#eq-current}

The SI unit is the ampere: $1\,\mathrm{A} = 1\,\mathrm{C/s}$.
:::

The sign is a choice of orientation. A positive current means positive charge crossing in the direction you called positive, or negative charge crossing the other way. In a metal the carriers are electrons, with charge $-e$, and they drift against the conventional current. Circuit diagrams are drawn with the conventional current, from the positive terminal of a battery, around the loop, and into the negative terminal. Both descriptions move the same charge per unit time through a given surface.

In a steady state the charge density at each point of the wire is constant. Charge cannot be piling up at a junction or at a bend. The current into one end of a single wire is then the current out of the other end, and $I$ is a property of the wire, not of which cross-section you picked. That statement, applied to a junction of several wires, is Kirchhoff's junction rule in [[electrostatics/dc-circuits]]. Here we use only the single-wire form.

Current is a scalar attached to a surface. To say how the flow is distributed across the surface, and in which direction, we need a vector.

::: definition Current density {#def-current-density}
The **current density** $\mathbf{J}$ is the vector field such that the current through an oriented surface $S$ is

$$
I = \int_S \mathbf{J}\cdot\dd\mathbf{A}.
$$ {#eq-current-integral}

If the flow is uniform and perpendicular to a flat cross-section of area $A$, then $J = I/A$ and $\mathbf{J}$ points in the direction of the conventional current. The unit is $\mathrm{A/m^2}$.
:::

The flux of $\mathbf{J}$ through a closed surface is the charge leaving the enclosed volume per unit time. In a steady state that flux is zero for every volume, which is the local form of "what flows in, flows out". Nothing in the definition requires the material to obey Ohm's law. A beam of electrons in a vacuum has a current density too.

::: quiz
A metal wire carries a conventional current toward the right. The electrons in the wire drift
- [ ] toward the right, because the current is a flow of electrons
- [x] toward the left, because the carriers are negative and the conventional current is to the right
- [ ] not at all, because the wire is neutral
- [ ] in a direction that cannot be known without the resistance
::: solution
Conventional current is the direction of positive-charge flow. Electrons have charge $-e$, so they drift against $\mathbf{J}$. The wire is very nearly neutral: the drifting electrons are balanced by the positive ions of the lattice, which is why a current-carrying wire does not have a large net charge. Neutrality does not stop the two species from having different velocities. The resistance fixes the size of the drift, not its direction relative to $\mathbf{J}$.
:::
:::

## Drift speed

The carriers are not streaming down the wire at a large speed. Each carrier has a large random velocity, continually redirected by collisions. Superimposed on that random motion is a small average velocity, the **drift velocity** $\mathbf{v}_d$.

::: proposition Drift speed and current density {#prop-drift}
Suppose a wire contains $n$ carriers per unit volume, each of charge $q$ (a signed quantity), and that their drift velocity is $\mathbf{v}_d$. Then

$$
\mathbf{J} = n q \mathbf{v}_d.
$$ {#eq-drift}

If $q$ is negative, $\mathbf{v}_d$ is opposite to $\mathbf{J}$. The drift speed quoted for a metal is the magnitude $v_d = J/(n e)$.
:::

::: proof
Take a cross-section of area $A$ perpendicular to $\mathbf{v}_d$, and take $\mathbf{v}_d$ uniform. In a time $\dd t$ the carriers that cross the surface are those that started within a distance $v_d\,\dd t$ of it, on the upstream side. That slab has volume $A v_d\,\dd t$ and contains $n A v_d\,\dd t$ carriers. The charge they carry across is

$$
\dd Q = n q A v_d\,\dd t.
$$

Divide by $\dd t$ and use [[#def-current]]:

$$
I = n q A v_d, \qquad J = \frac{I}{A} = n q v_d.
$$

The vector form [[#eq-drift]] records the direction: the flux of $n q \mathbf{v}_d$ recovers $I$ for any orientation. Solving for the speed when $q = -e$ replaces $q$ by $-e$ and reverses $\mathbf{v}_d$, so the positive quantity $v_d = J/(ne)$ is the speed. The hypotheses are a single species of carrier, a number density $n$ that is constant on the scale of the slab, and a drift that is the same throughout the cross-section. A second species would add its own $n q \mathbf{v}_d$.
:::

The random speed never appears in [[#eq-drift]]. Collisions make the random velocities cancel in the average. Pressure in a gas depends on the mean square speed; current depends on the mean velocity. The two averages answer different questions, and replacing one by the other is meaningless.

::: example Drift in a copper wire {#ex-drift}
Copper has conduction-electron density $n = 8.5\times 10^{28}\,\mathrm{m^{-3}}$. A wire of radius $0.50\,\mathrm{mm}$ carries $I = 2.00\,\mathrm{A}$. Find the cross-sectional area, the current density, and the drift speed.
::: solution
The radius is $r = 0.50\times 10^{-3}\,\mathrm{m} = 5.0\times 10^{-4}\,\mathrm{m}$. The area is

$$
A = \pi r^2 = \pi(5.0\times 10^{-4})^2 = 7.853981634\times 10^{-7}\,\mathrm{m^2}.
$$

To three significant figures, $A = 7.85\times 10^{-7}\,\mathrm{m^2}$. The current is uniform over this area to the accuracy we need, so

$$
J = \frac{I}{A} = \frac{2.00}{7.853981634\times 10^{-7}} = 2.546479089\times 10^{6}\,\mathrm{A/m^2},
$$

or $J = 2.55\times 10^{6}\,\mathrm{A/m^2}$ to three significant figures. [[#eq-drift]] with $|q| = e$ gives

$$
\begin{aligned}
v_d &= \frac{J}{ne} = \frac{2.546479089\times 10^{6}}{(8.5\times 10^{28})(1.602176634\times 10^{-19})} \\
&= 1.869867335\times 10^{-4}\,\mathrm{m/s}.
\end{aligned}
$$

To three significant figures, $v_d = 1.87\times 10^{-4}\,\mathrm{m/s}$, about two tenths of a millimetre per second. The electrons that pass a given point in one second are the charge $I$ divided by $e$,

$$
\frac{I}{e} = \frac{2.00}{1.602176634\times 10^{-19}} = 1.24830181\times 10^{19}\,\mathrm{s^{-1}},
$$

a huge number of carriers moving very slowly. The time for a drift of the full $2.0\,\mathrm{m}$ of a typical connecting lead of this wire would be

$$
t = \frac{2.0}{1.869867335\times 10^{-4}} = 1.069595\times 10^{4}\,\mathrm{s},
$$

about $2.97$ hours. A lamp on that lead lights at once. The drift speed is not the speed of the signal.

Compared with the speed of light,

$$
\frac{v_d}{c} = \frac{1.869867335\times 10^{-4}}{2.99792458\times 10^{8}} = 6.24\times 10^{-13}.
$$

The number density $8.5\times 10^{28}\,\mathrm{m^{-3}}$ is about one conduction electron per copper atom. We take it as given for this metal. The radius $0.50\,\mathrm{mm}$ is quoted to two figures after the leading digit; the three-figure values above match the products before rounding, and the last figure moves if $0.50$ is read more coarsely.
:::
:::

::: intuition A dense crowd, not a fast stream
Picture the wire as a dense crowd of electrons, one per atom, shuffling. A gentle drift of a tenth of a millimetre per second, shared by $10^{28}$ of them in each cubic metre, already amounts to an ampere through a square millimetre. The shuffle you cannot see, the random motion, is far faster. Only the drift survives in $\mathbf{J}$.
:::

::: warning Drift speed and the speed of the signal
The drift speed is not the speed at which the circuit responds. Closing a switch sets up an electric field along the wire, and that field propagates at a sizable fraction of $c$, fixed by the capacitance and inductance of the line rather than by $v_d$. The electrons already in the filament start to drift as soon as the field reaches them. They do not have to travel from the battery to the lamp. Quoting $v_d$ as "how fast electricity flows" confuses the material speed of the carriers with the speed of the electromagnetic signal. A second, separate warning belongs to Ohm's law itself and is stated after the power calculation: the law is not universal, and $V = IR$ does not by itself fix the sign of the power.
:::

## Ohm's law and resistance

Many materials, metals in particular, show a simple relation between the current density and the electric field, provided the temperature is held fixed.

::: definition Resistivity and conductivity {#def-resistivity}
A material obeys the local form of **Ohm's law** when there is a constant conductivity $\sigma$ such that

$$
\mathbf{J} = \sigma\mathbf{E}.
$$ {#eq-ohm-local}

The **resistivity** is $\rho = 1/\sigma$, so $\mathbf{E} = \rho\mathbf{J}$. Both $\sigma$ and $\rho$ are properties of the material and its temperature, not of the shape of the specimen. The unit of $\rho$ is the $\Omega\cdot\mathrm{m}$; the unit of $\sigma$ is $(\Omega\cdot\mathrm{m})^{-1}$, or $\mathrm{S/m}$.
:::

This is a material relation, in the same sense that Hooke's law is a material relation for a spring. It is not a new field equation. Maxwell's equations do not require $\mathbf{J} = \sigma\mathbf{E}$. A discharge tube, a diode, and a filament whose temperature races upward as it glows all violate it. Where it holds, it is remarkably accurate, and it is the reason a metal wire has a definite resistance.

::: theorem Resistance of a uniform wire {#thm-resistance}
Consider a straight wire of length $L$, uniform cross-sectional area $A$, and resistivity $\rho$, with a steady current $I$ distributed uniformly over the cross-section. The potential drop $V$ along the wire in the direction of the current is

$$
V = IR, \qquad R = \frac{\rho L}{A}.
$$ {#eq-resistance}

$R$ is the **resistance**. The unit is the ohm: $1\,\Omega = 1\,\mathrm{V/A}$.
:::

::: proof
Local Ohm's law gives $E = \rho J$. Uniformity of $J$ over the cross-section means $J = I/A$, so $E = \rho I/A$ is the same at every point along the wire and is parallel to the wire. The potential drop in the direction of $\mathbf{E}$, which is the direction of $\mathbf{J}$, is the integral of $E$ along the length:

$$
V = EL = \frac{\rho I}{A}L = I\left(\frac{\rho L}{A}\right).
$$

The quantity in parentheses depends on the material and the shape, not on $I$. It is $R$. Then $V = IR$. The hypotheses are a uniform $\rho$, a uniform cross-section, a current perpendicular to that cross-section, and a temperature steady enough that $\rho$ may be treated as constant. A wire that tapers needs $\int \rho\,\dd\ell/A(\ell)$ instead of $\rho L/A$.
:::

[[#eq-resistance]] is the macroscopic Ohm's law for a single resistor. Doubling the length doubles $R$, as if two equal wires had been placed in series. Doubling the area halves $R$, as if two equal wires had been placed side by side.

::: proposition Resistors in series and in parallel {#prop-resistors}
If two resistors carry the same current and the potential drops add, the equivalent resistance is $R = R_1 + R_2$. If two resistors have the same potential drop and the currents add, the equivalent resistance satisfies $1/R = 1/R_1 + 1/R_2$.
:::

::: proof
In the first arrangement $V = V_1 + V_2 = I R_1 + I R_2 = I(R_1 + R_2)$, so the single $R$ that reproduces $V = IR$ is the sum. This is how [[#eq-resistance]] behaves when two uniform wires of the same area are joined end to end: the lengths add and $\rho$ and $A$ do not change. In the second arrangement $I = I_1 + I_2 = V/R_1 + V/R_2 = V(1/R_1 + 1/R_2)$, so $1/R = 1/R_1 + 1/R_2$. This is how [[#eq-resistance]] behaves when two wires of the same length and material are placed side by side: the areas add. Networks with more than one loop, and the sign rules around a loop, are Kirchhoff's rules in [[electrostatics/dc-circuits]].
:::

For copper at ordinary temperature we take

$$
\rho_{\mathrm{Cu}} = 1.68\times 10^{-8}\,\Omega\cdot\mathrm{m},
$$

so $\sigma_{\mathrm{Cu}} = 1/\rho_{\mathrm{Cu}} = 5.952381\times 10^{7}\,\mathrm{S/m}$. The value drifts with temperature; the figure is the constant we shall use, not a claim that every copper sample has been measured to three digits.

::: example Resistance and heating of the copper wire {#ex-copper}
The wire of [[#ex-drift]] has length $L = 2.0\,\mathrm{m}$ and $\rho = 1.68\times 10^{-8}\,\Omega\cdot\mathrm{m}$, and it still carries $2.00\,\mathrm{A}$. Find $R$, the potential drop, and the power dissipated.
::: solution
The area was $A = 7.853981634\times 10^{-7}\,\mathrm{m^2}$. [[#eq-resistance]] gives

$$
\begin{aligned}
R &= \frac{\rho L}{A} = \frac{(1.68\times 10^{-8})(2.0)}{7.853981634\times 10^{-7}} \\
&= 4.27808487\times 10^{-2}\,\Omega.
\end{aligned}
$$

To three significant figures, $R = 0.0428\,\Omega$. The potential drop in the direction of the current is

$$
V = IR = (2.00)(0.0427808487) = 0.085561697\,\mathrm{V},
$$

or $0.0856\,\mathrm{V}$ to three significant figures. The power delivered to the wire, from [[#thm-joule]] below, is

$$
P = I^2 R = (2.00)^2(0.0427808487) = 0.171123395\,\mathrm{W},
$$

or $P = 0.171\,\mathrm{W}$ to three significant figures. The other two forms agree: $IV = (2.00)(0.085561697) = 0.171123395\,\mathrm{W}$ and $V^2/R$ is the same number. A two-metre length of this wire, carrying two amperes, drops less than a tenth of a volt and dissipates a sixth of a watt. The field inside the copper is

$$
E = \frac{V}{L} = \rho J = 0.0427808487\,\mathrm{V/m},
$$

small beside the $10^{5}\,\mathrm{V/m}$ of a typical laboratory capacitor, and quite enough to keep $10^{19}$ electrons per second drifting.
:::
:::

::: widget plot
f: x
x: 0, 5
caption: Ohm's law is a straight line through the origin. A real filament is not, because its resistance rises with temperature. The graph draws current proportional to voltage in units where the resistance is 1. A filament would bend as it heats, and a diode would not be a straight line at all.
:::

::: example A one-kilowatt heater on a 230 volt supply {#ex-heater}
An electric heater is rated $1.00\times 10^{3}\,\mathrm{W}$ at $230\,\mathrm{V}$, and it may be treated as an ohmic resistor at its working temperature. Find the resistance and the current.
::: solution
The rating means $P = 1.00\times 10^{3}\,\mathrm{W}$ when the potential drop is $V = 230\,\mathrm{V}$. From $P = V^2/R$ in [[#eq-power-forms]],

$$
R = \frac{V^2}{P} = \frac{(230)^2}{1.00\times 10^{3}} = \frac{52900}{1000} = 52.9\,\Omega.
$$

The current is

$$
I = \frac{P}{V} = \frac{1.00\times 10^{3}}{230} = 4.347826\,\mathrm{A},
$$

or $I = 4.35\,\mathrm{A}$ to three significant figures. As a check, $I^2 R = (4.347826)^2(52.9) = 1.00\times 10^{3}\,\mathrm{W}$. The cold resistance of the same element is lower, because $\rho$ for a metal rises with temperature. The straight line of the figure above is the working law at one temperature, not a promise that $R$ survives a large change of temperature. The $230\,\mathrm{V}$ is the potential drop across the heater, not an arbitrary point in the house wiring.
:::
:::

::: example Line loss and the reason for a high voltage {#ex-line}
A load takes $P = 1.00\times 10^{3}\,\mathrm{W}$. The lines that feed it have total resistance $R_{\mathrm{line}} = 0.500\,\Omega$. Compare the power dissipated in the lines when the load is supplied at $100\,\mathrm{V}$ with the loss when it is supplied at $1.00\times 10^{3}\,\mathrm{V}$. Assume the line resistance is ohmic and that $P$ is the power in the load.
::: solution
The current in the lines is $I = P/V_{\mathrm{load}}$, so the loss is $I^2 R_{\mathrm{line}} = P^2 R_{\mathrm{line}}/V_{\mathrm{load}}^2$. At $100\,\mathrm{V}$,

$$
I = \frac{1.00\times 10^{3}}{100} = 10.0\,\mathrm{A}, \qquad P_{\mathrm{loss}} = (10.0)^2(0.500) = 50.0\,\mathrm{W}.
$$

At $1.00\times 10^{3}\,\mathrm{V}$,

$$
I = \frac{1.00\times 10^{3}}{1.00\times 10^{3}} = 1.00\,\mathrm{A}, \qquad P_{\mathrm{loss}} = (1.00)^2(0.500) = 0.500\,\mathrm{W}.
$$

Raising the voltage by ten divides the current by ten and the line loss by a hundred, for the same power delivered to the load. The formula $P = I^2 R$ is what makes the high voltage useful. The load itself, at the higher voltage, must have a larger resistance if it is still to take only $1.00\times 10^{3}\,\mathrm{W}$: $R_{\mathrm{load}} = V^2/P$ is $10.0\,\Omega$ in the first case and $1.00\times 10^{3}\,\Omega$ in the second. Transformers, which make the change of voltage practical for alternating current, are not part of this chapter. The loss comparison uses only [[#thm-joule]].
:::
:::

## Power dissipated in a resistor

A charge $q$ that moves through a potential drop $V$ loses potential energy $qV$. In a resistor the carriers keep a steady drift, so that lost potential energy does not accumulate as kinetic energy of the drift. Collisions pass it to the lattice.

::: theorem Joule heating {#thm-joule}
Let a resistor carry a conventional current $I$, and let $V$ be the potential drop along the resistor in the direction of that current. The electric field delivers energy to the charge at the rate

$$
P = IV.
$$ {#eq-power}

If the resistor also obeys $V = IR$, the same power is

$$
P = I^2 R = \frac{V^2}{R}.
$$ {#eq-power-forms}

In the steady state this power is dissipated as heat.
:::

::: proof
In a time $\dd t$ the charge that passes any cross-section is $\dd q = I\,\dd t$. Follow that charge from the high-potential end to the low-potential end. Its electric potential energy falls by $V\,\dd q$, so the field does work $V\,\dd q$ on it. The power, work per unit time, is

$$
P = V\frac{\dd q}{\dd t} = VI.
$$

This half of the argument uses the definition of potential and of current. It does not use Ohm's law. It does use the sign convention: $V$ is the drop in the direction of $I$, so $P = IV$ is positive for a passive resistor. The work is done by the electric field, which is maintained by the battery or other source. The source is what replenishes the energy the field hands to the charges.

In a steady state the drift speed is not increasing, so the organised kinetic energy of the carriers is constant. The work done by the field cannot be staying in that store. Collisions transfer it to the thermal motion of the lattice. The resistor heats up. The identification of $P$ with a heating rate is this steady-state statement.

If in addition $V = IR$, substitution gives $P = I(IR) = I^2 R$ and $P = (V/R)V = V^2/R$. The three expressions agree only when Ohm's law holds and $V$ is the drop across the same resistor that has resistance $R$.
:::

A battery is the opposite case. Inside an ideal battery the conventional current flows from the negative terminal toward the positive terminal, against the electrostatic field, driven by the chemical agent. The power $IV$ computed with the terminal voltage is then the power the chemical agent delivers, not heat in an internal resistor. The sign is fixed only after you say which way the current enters the element. An ideal battery does not obey $V = IR$ at all.

::: quiz
The formula $P = V^2/R$ gives the power dissipated in a resistor. It applies when
- [ ] $V$ is the emf of any battery in the same circuit, whether or not the resistor is across it
- [x] $V$ is the potential drop across that resistor in the direction of the current, and the resistor obeys Ohm's law
- [ ] the current is alternating; the formula is false for direct current
- [ ] $R$ is the resistance of some other element in series with the one you care about
::: solution
[[#eq-power-forms]] is $P = V^2/R$ only after $V = IR$ has been used, and $V$ in that relation is the drop across the resistor whose resistance is $R$. A battery elsewhere in the circuit has its own terminal voltage. Direct current is the case proved in [[#thm-joule]]; nothing in the proof asks the current to change sign. Using a neighbour's resistance invents a different $I^2 R$.
:::
:::

## A microscopic picture

Ohm's law was introduced as a fact about materials. A simple classical picture shows how a constant $\sigma$ can emerge from collisions, and where the picture stops being fundamental.

Between collisions an electron in a field $\mathbf{E}$ feels a force of magnitude $eE$ and an acceleration $eE/m_e$. A collision, in this model, scrambles the velocity so that the drift starts again from zero. If the mean time between collisions is $\tau$, the average drift speed is

$$
v_d = \frac{eE\tau}{m_e}.
$$ {#eq-drift-tau}

The factor is the standard one for a constant relaxation time: the speed grows linearly from $0$ to $eE\tau/m_e$ and the time average is half the peak only if every electron collides on a fixed schedule. Drude's model averages an exponential distribution of free times and the factor $\tfrac12$ does not appear; [[#eq-drift-tau]] is the result of that average. We take it as the model equation and do not re-derive the exponential weight.

::: proposition Drude conductivity {#prop-drude}
In the Drude model, a metal with conduction-electron density $n$, electron mass $m_e$ and mean collision time $\tau$ has conductivity

$$
\sigma = \frac{n e^2 \tau}{m_e},
$$ {#eq-drude}

and therefore obeys $\mathbf{J} = \sigma\mathbf{E}$.
:::

::: proof
[[#eq-drift]] for electrons reads $J = n e v_d$, with $v_d$ the speed against the field. Substitute [[#eq-drift-tau]]:

$$
J = ne\left(\frac{eE\tau}{m_e}\right) = \left(\frac{n e^2 \tau}{m_e}\right) E.
$$

The coefficient of $E$ is $\sigma$. It is constant when $n$ and $\tau$ are constant, which is the content of local Ohm's law. The hypotheses are classical point electrons, a single relaxation time, isotropic scattering that removes the drift, and a field weak enough that it does not change $\tau$. None of these is a law of electrodynamics. The model explains why a linear law is plausible. It does not forbid a diode.
:::

::: example Collision time in the copper wire {#ex-tau}
Using the field and the drift speed of [[#ex-copper]] and [[#ex-drift]], estimate $\tau$ from [[#eq-drift-tau]].
::: solution
From those examples, $v_d = 1.869867335\times 10^{-4}\,\mathrm{m/s}$ and $E = 0.0427808487\,\mathrm{V/m}$. Solve [[#eq-drift-tau]] for the time:

$$
\begin{aligned}
\tau &= \frac{m_e v_d}{e E} \\
&= \frac{(9.109\times 10^{-31})(1.869867335\times 10^{-4})}{(1.602176634\times 10^{-19})(0.0427808487)} \\
&= 2.48497\times 10^{-14}\,\mathrm{s}.
\end{aligned}
$$

The mean time between collisions is about $2.48\times 10^{-14}\,\mathrm{s}$. As a check, [[#eq-drude]] with this $\tau$ returns

$$
\sigma = \frac{n e^2 \tau}{m_e} = 5.9524\times 10^{7}\,\mathrm{S/m},
$$

which is $1/\rho$ for the resistivity we started from. The agreement is arithmetic, not a new measurement: $\tau$ was computed from $v_d$ and $E$, and $v_d$ was computed from $J = \sigma E$. The model has one free time, and the wire has fixed it.

The random speed that belongs in a mean free path is not $v_d$. It is the large speed of the electrons between collisions, set by the quantum statistics of the metal, of order $10^{6}\,\mathrm{m/s}$ rather than by $\tfrac12 m v^2 = \tfrac32 kT$. We do not convert $\tau$ into a mean free path without that speed, and we do not quote a thermal speed as if the conduction electrons were a classical gas.
:::
:::

The temperature dependence sits inside $\tau$ and, to a smaller extent, inside $n$. For a pure metal, raising the temperature shortens $\tau$, because the lattice vibrates more strongly, so $\rho$ rises. A filament on a rising voltage therefore does not stay on the straight line of the figure: as it heats, $R$ grows and the current falls below the value a cold resistance would have predicted. Carbon and some semiconductors move the other way. The linear law $R = R_0(1 + \alpha\Delta T)$ is an empirical fit over a limited range. We do not adopt a numerical $\alpha$ here; the existence of the rise is enough to read the figure, and a measured $\rho$ must name its temperature.

::: application Why a fuse opens
A fuse is a short length of conductor chosen so that $I^2 R$ melts it when the current exceeds a design value. The heating is [[#thm-joule]], concentrated by a small $A$ in [[#eq-resistance]]: a thin section has a large resistance per unit length and a small mass to absorb the heat. The fuse does not "know" about the appliance downstream except through the current that [[#def-current]] defines. A diode used as a one-way element is a different object. It does not obey [[#eq-ohm-local]], and replacing it by an $R$ in a power formula is a mistake.
:::

::: remark Steady current and the electrostatic field
We used $V = -\int\mathbf{E}\cdot\dd\mathbf{l}$ along the wire as if $\mathbf{E}$ were an electrostatic field. That is legitimate while the currents are steady, so $\mathbf{B}$ is constant and Faraday's law contributes no extra electric field. A changing current in an inductor, or a changing flux through a loop, adds an induced electric field that is not conservative. Kirchhoff's loop rule then needs an extra term. The junction rule, which is charge conservation, survives. Both rules are stated properly in [[electrostatics/dc-circuits]], with the limitation recorded there.

Inside the copper the field is not zero. The electrostatic claim that $\mathbf{E} = 0$ inside a conductor is the equilibrium claim, when $I = 0$. [[#eq-ohm-local]] says a finite $\mathbf{J}$ requires a finite $\mathbf{E}$. The field is small because $\sigma$ is large, which is what [[#ex-copper]] showed numerically, and that smallness is why a wire is still close to an equipotential when the currents are modest.
:::

## Where this leads

A network of resistors and sources is solved by the junction rule and the loop rule in [[electrostatics/dc-circuits]]. The capacitance of [[electrostatics/capacitance]] enters when a capacitor is charged through a resistor: the current is then not steady, $I = \dd Q/\dd t$ still holds, and the power $I^2 R$ integrated over the transient is the half of the battery's energy that never reaches the capacitor. Magnetic forces on a current-carrying wire use the same $I$ defined here, but the force is perpendicular to the drift and does not replace Joule heating. The conductivity $\sigma$ becomes a tensor in some crystals and a complex number in a time-varying field; both extensions reduce to [[#eq-ohm-local]] in the steady isotropic case.

::: history Ohm's book of 1827
Georg Simon Ohm published *Die galvanische Kette, mathematisch bearbeitet* in 1827. He compared lengths of metal wire and found that the current was proportional to the potential difference across the wire, with a constant fixed by the length, the cross-section and the metal. That proportionality is [[#eq-resistance]]. The local form $\mathbf{J} = \sigma\mathbf{E}$ is the same statement written with the field, in language Ohm did not have. The ohm, the SI unit of resistance, is named for him. The collision picture of [[#prop-drude]] is much later: Paul Drude's classical electron theory of metals dates from 1900, and it is a model of $\sigma$, not a replacement of Ohm's measurements.
:::

::: summary
- Current is $I = \dd Q/\dd t$, the charge per unit time through a chosen surface. The ampere is a coulomb per second. Conventional current is the direction of positive-charge flow; electrons drift the other way.
- Current density satisfies $I = \int\mathbf{J}\cdot\dd\mathbf{A}$. For a single carrier species, $\mathbf{J} = n q\mathbf{v}_d$. In the copper example, $v_d = 1.87\times 10^{-4}\,\mathrm{m/s}$.
- The drift speed is not the signal speed. The signal is the field, propagating at a sizable fraction of $c$. In the example, $v_d/c$ is $6.24\times 10^{-13}$, and a drift along $2.0\,\mathrm{m}$ would take about three hours.
- Local Ohm's law is $\mathbf{J} = \sigma\mathbf{E}$, a material relation at a stated temperature. It is not a field equation, and a diode or a discharge tube need not obey it.
- A uniform wire has $R = \rho L/A$ and $V = IR$, where $V$ is the potential drop in the direction of $I$. For the copper wire, $R = 0.0428\,\Omega$.
- Series resistors add. Parallel resistors add as reciprocals. Both rules are the geometry of $\rho L/A$ on a single path or on paths that share a potential drop.
- The field delivers power $P = IV$ to a resistor. When Ohm's law holds, $P = I^2 R = V^2/R$, and in the steady state that power heats the resistor. For the copper wire, $P = 0.171\,\mathrm{W}$. The sign of the power is fixed only by saying which way the current enters.
- The Drude model gives $\sigma = n e^2\tau/m_e$. For the copper wire the implied collision time is $\tau = 2.48\times 10^{-14}\,\mathrm{s}$. The model produces Ohm's law; it does not make Ohm's law universal.
:::

## Exercises

::: exercise Charge and current {#exr-charge-time level=1 check="5"}
A charge of $15.0\,\mathrm{C}$ passes a cross-section of a wire in $3.00\,\mathrm{s}$, uniformly in time. Find the current.
::: solution
[[#eq-current]] for a constant rate is $I = \Delta Q/\Delta t$:

$$
I = \frac{15.0}{3.00} = 5.00\,\mathrm{A}.
$$

The answer is $5.00\,\mathrm{A}$. The direction is the direction you assigned to the surface; the number $5.00$ is the magnitude of that oriented current.
:::
:::

::: exercise Current from voltage and resistance {#exr-ohm-number level=1 check="0.5"}
A potential drop of $12.0\,\mathrm{V}$ is maintained across a resistor of $24.0\,\Omega$. The resistor obeys Ohm's law. Find the current.
::: solution
[[#eq-resistance]] solved for the current is $I = V/R$:

$$
I = \frac{12.0}{24.0} = 0.500\,\mathrm{A}.
$$

The answer is $0.500\,\mathrm{A}$. The power dissipated is $IV = 6.00\,\mathrm{W}$, or $V^2/R = 144/24.0 = 6.00\,\mathrm{W}$, which agrees but was not required.
:::
:::

::: exercise Power from current and resistance {#exr-power level=1 check="36"}
A resistor of $4.00\,\Omega$ carries $3.00\,\mathrm{A}$ in the direction of a potential drop that obeys Ohm's law. Find the power dissipated.
::: solution
[[#eq-power-forms]] gives

$$
P = I^2 R = (3.00)^2(4.00) = 36.0\,\mathrm{W}.
$$

The potential drop is $V = IR = 12.0\,\mathrm{V}$, and $IV = 36.0\,\mathrm{W}$ as well. The answer is $36.0\,\mathrm{W}$. The formula uses the drop across this resistor, not the emf of a battery that happens to sit elsewhere.
:::
:::

::: exercise Resistivity of a specimen {#exr-rho level=2 check="1/30000000"}
A wire of length $L = 1.50\,\mathrm{m}$ and cross-sectional area $A = 2.00\times 10^{-6}\,\mathrm{m^2}$ has resistance $R = 0.0250\,\Omega$ at the temperature of the measurement. Find the resistivity.
::: solution
Solve [[#eq-resistance]] for $\rho$:

$$
\rho = \frac{RA}{L} = \frac{(0.0250)(2.00\times 10^{-6})}{1.50} = 3.3333\times 10^{-8}\,\Omega\cdot\mathrm{m}.
$$

Exactly, $0.025\times 2\times 10^{-6}/1.5 = 5\times 10^{-8}/1.5 = \tfrac13\times 10^{-7} = 1/30000000$, in $\Omega\cdot\mathrm{m}$. The answer is $3.33\times 10^{-8}\,\Omega\cdot\mathrm{m}$ to three significant figures. The number is about twice the copper value used in [[#ex-copper]], so the specimen is not that copper at the temperature quoted there, or the area has been mismeasured. The formula itself does not mind which.
:::
:::

::: exercise A longer, thicker copper wire {#exr-thick level=2}
A copper wire of diameter $2.00\,\mathrm{mm}$ and length $5.00\,\mathrm{m}$ has $\rho = 1.68\times 10^{-8}\,\Omega\cdot\mathrm{m}$ and $n = 8.5\times 10^{28}\,\mathrm{m^{-3}}$. Find the resistance, and find the drift speed when the current is $10.0\,\mathrm{A}$.
::: hint
The radius is half the diameter. Use $R = \rho L/A$ and $v_d = I/(n e A)$.
:::
::: solution
The radius is $1.00\times 10^{-3}\,\mathrm{m}$. The area is

$$
A = \pi(1.00\times 10^{-3})^2 = 3.141592654\times 10^{-6}\,\mathrm{m^2}.
$$

The resistance is

$$
R = \frac{(1.68\times 10^{-8})(5.00)}{3.141592654\times 10^{-6}} = 2.67380304\times 10^{-2}\,\Omega,
$$

or $R = 0.0267\,\Omega$ to three significant figures. The drift speed at $10.0\,\mathrm{A}$ is

$$
\begin{aligned}
v_d &= \frac{I}{n e A} = \frac{10.0}{(8.5\times 10^{28})(1.602176634\times 10^{-19})(3.141592654\times 10^{-6})} \\
&= 2.33733417\times 10^{-4}\,\mathrm{m/s}.
\end{aligned}
$$

To three significant figures, $v_d = 2.34\times 10^{-4}\,\mathrm{m/s}$. The wire is longer than the wire of [[#ex-drift]], but it is also four times the area of a $0.50\,\mathrm{mm}$ radius wire, and the current is five times larger. The drift speed stays a fraction of a millimetre per second. The power at this current is $I^2 R = 2.6738\,\mathrm{W}$.
:::
:::

::: exercise Joining two lengths {#exr-join level=2}
The copper wire of [[#ex-copper]], with $R = 0.0427808487\,\Omega$ for $L = 2.0\,\mathrm{m}$, is joined end to end to a $3.0\,\mathrm{m}$ length of the same wire, same radius, same resistivity. Find the resistance of the combination, and the potential drop when $2.00\,\mathrm{A}$ flows through it.
::: solution
Resistance is proportional to length at fixed $\rho$ and $A$, by [[#eq-resistance]]. The $3.0\,\mathrm{m}$ piece has

$$
R_3 = 0.0427808487\times\frac{3.0}{2.0} = 0.064171273\,\Omega.
$$

[[#prop-resistors]] adds them, since the same current passes through both and the drops add:

$$
R = 0.0427808487 + 0.064171273 = 0.106952122\,\Omega,
$$

or $0.107\,\Omega$ to three significant figures. The same result is $\rho(5.0)/A$ with the area of [[#ex-drift]]. The potential drop at $2.00\,\mathrm{A}$ is

$$
V = IR = (2.00)(0.106952122) = 0.213904\,\mathrm{V},
$$

or $0.214\,\mathrm{V}$ to three significant figures. The drift speed is unchanged from [[#ex-drift]], because $I$, $n$ and $A$ are unchanged. Lengthening the wire raises $V$ and $R$, not the speed of the carriers at a given current.
:::
:::

::: exercise From the field's work to I squared R {#exr-joule-proof level=3}
A resistor obeys $V = IR$, with $V$ the potential drop in the direction of the conventional current $I$. Starting from the work done by the electric field on the charge that passes in a time $\dd t$, prove that the power delivered to the resistor is $I^2 R$. State where Ohm's law is used, and state why this power heats the resistor rather than increasing the kinetic energy of the drift. Then explain why the same algebra does not assign a heating rate $I^2 R$ to an ideal battery.
::: hint
The charge in time $\dd t$ is $I\,\dd t$. The potential energy it loses is $V$ times that charge. An ideal battery is not a resistor.
:::
::: solution
In a time $\dd t$ the charge passing a cross-section is $\dd q = I\,\dd t$. Moving from the high-potential end to the low-potential end, that charge loses potential energy $V\,\dd q$, and the electric field does that amount of work on it. The power is

$$
P = \frac{V\,\dd q}{\dd t} = VI.
$$

Ohm's law has not been used yet. It enters when $V$ is replaced by $IR$:

$$
P = (IR)I = I^2 R.
$$

The alternative form $V^2/R$ is the same substitution written as $I = V/R$.

In the steady state, $v_d$ is constant, so the kinetic energy associated with the drift is not growing. The work done by the field is transferred by collisions to the random motion of the lattice. That is the heating.

An ideal battery has a terminal voltage and a current, but the conventional current inside the battery is driven from the negative terminal toward the positive terminal by a chemical agent, against the electrostatic field. The element does not obey $V = IR$. The product of terminal voltage and current is the power delivered by the chemical agent, not $I^2 R$ for a resistance the battery does not have. Assigning a sign to $IV$ requires a statement of which way the current enters the element.
:::
:::

::: exercise Charge and energy in ten minutes {#exr-ten-minutes level=3}
The copper wire of [[#ex-copper]] carries $2.00\,\mathrm{A}$ steadily for $10.0$ minutes. Find the charge that passes a cross-section, and the energy dissipated as heat. Comment on whether an electron that starts at one end of the $2.0\,\mathrm{m}$ wire reaches the other end during this interval.
::: hint
The charge is $I$ times the duration. The energy is $I^2 R$ times the duration, with $R$ from [[#ex-copper]]. Compare the duration with the drift time computed in [[#ex-drift]].
:::
::: solution
The duration is $10.0\times 60 = 600\,\mathrm{s}$. The charge is

$$
Q = It = (2.00)(600) = 1.20\times 10^{3}\,\mathrm{C}.
$$

With $R = 0.0427808487\,\Omega$ from [[#ex-copper]], the power is $0.171123395\,\mathrm{W}$ and the energy is

$$
E_{\mathrm{heat}} = I^2 R t = (0.171123395)(600) = 102.674\,\mathrm{J}.
$$

To three significant figures, $Q = 1.20\times 10^{3}\,\mathrm{C}$ and the heat is $103\,\mathrm{J}$. The drift time for $2.0\,\mathrm{m}$ at $v_d = 1.869867335\times 10^{-4}\,\mathrm{m/s}$ was $1.07\times 10^{4}\,\mathrm{s}$, about three hours. Ten minutes is $600\,\mathrm{s}$, so a typical electron drifts a distance

$$
v_d t = (1.869867335\times 10^{-4})(600) = 0.112\,\mathrm{m},
$$

about $11\,\mathrm{cm}$, and does not reach the other end. The charge $1.20\times 10^{3}\,\mathrm{C}$ is carried by the electrons that were already distributed along the wire, each moving a short distance. The signal that established the current was not waiting on this drift.
:::
:::
