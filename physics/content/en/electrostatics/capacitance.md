A conductor in electrostatic equilibrium is an equipotential. Any excess charge sits on its surface, and the field in the conducting material itself is zero. Place a charge $Q$ on an isolated conductor and the whole conductor rises to a single potential $V$, measured from whatever zero you chose. Double $Q$ and, because the electrostatic equations are linear, every potential doubles with it. The ratio of charge to potential is therefore a property of the shape, the surroundings and the material in the gap, not of how much charge you happened to add. That ratio is the **capacitance**.

The same idea applies to a pair of conductors carrying equal and opposite charges. The quantity that matters is then the potential *difference*, and a capacitor is a device built to make that ratio large, stable and useful. This chapter computes it for a sphere and for a parallel plate, combines capacitors, and finds the energy stored in the field. A linear dielectric changes the ratio by a constant factor. Throughout we work in vacuum unless a dielectric is named, with

$$
\varepsilon_0 = 8.854187817\times 10^{-12}\,\mathrm{F/m}, \qquad
\frac{1}{4\pi\varepsilon_0} = 8.9875517923\times 10^{9}\,\mathrm{N\cdot m^2/C^2}.
$$

The potential difference is the line integral from [[electrostatics/potential]],

$$
\Delta V = V(b) - V(a) = -\int_a^b \mathbf{E}\cdot\dd\mathbf{l},
$$

and the field of a highly symmetric charge distribution is the one Gauss's law supplies in [[electrostatics/gauss-law]]. We will restate the short arguments we need, so the algebra stands on its own.

## Capacitance

::: definition Capacitance of an isolated conductor {#def-isolated}
Let an isolated conductor carry a charge $Q$, and let $V$ be its potential relative to a chosen zero, usually infinity when the conductor is alone in space. The **capacitance** of the conductor is

$$
C = \frac{Q}{V}.
$$ {#eq-cap-isolated}

The SI unit is the farad: $1\,\mathrm{F} = 1\,\mathrm{C/V}$.
:::

A farad is an enormous capacitance. The capacitors on a laboratory bench are picofarads to millifarads. The ratio in [[#eq-cap-isolated]] does not depend on $Q$ for a linear medium: the field is proportional to the charge, and the potential, being an integral of the field, is proportional to the charge as well. Positive $Q$ produces positive $V$ when the zero is at infinity, so $C$ is positive.

An isolated conductor is an idealisation. It means that every other conductor is far enough away that we may ignore the charges it would acquire by influence. A real capacitor is a pair, and the definition is restated for that pair.

::: definition Capacitance of a pair {#def-pair}
Let two conductors carry charges $+Q$ and $-Q$, and let $V$ be the potential of the positive conductor minus the potential of the negative one. The capacitance of the pair is

$$
C = \frac{Q}{V}.
$$ {#eq-cap-pair}

$Q$ is the charge on one conductor, not the sum of the two charges. The sum is zero.
:::

Several conductors near one another are described by a matrix of coefficients, not by a single $C$. This chapter treats one conductor, or one pair. The symbol $V$ in [[#eq-cap-pair]] is a difference. Only a difference of potential is fixed until a zero is chosen, which is why a pair needs no appeal to infinity.

::: proposition Capacitance of an isolated conducting sphere {#prop-sphere}
An isolated conducting sphere of radius $R$ in vacuum has capacitance

$$
C = 4\pi\varepsilon_0 R.
$$ {#eq-sphere}
:::

::: proof
The excess charge resides on the surface. By Gauss's law the field outside is the point-charge field and the field in the conducting material is zero. For $r \ge R$,

$$
E(r) = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2},
$$

directed outward when $Q > 0$. The potential is constant throughout the conductor, so the potential of the sphere equals the potential of its surface. With the zero at infinity,

$$
\begin{aligned}
V(R) - V(\infty)
&= -\int_{\infty}^{R} E\,\dd r
= \int_{R}^{\infty} \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}\,\dd r
= \frac{1}{4\pi\varepsilon_0}\frac{Q}{R}.
\end{aligned}
$$

The path from infinity inward makes the minus sign in the definition of $\Delta V$ into an ordinary integral of a positive $E$ against a positive $\dd r$ written outward. Then

$$
C = \frac{Q}{V} = 4\pi\varepsilon_0 R = \frac{R}{k},
$$

where $k = 1/(4\pi\varepsilon_0)$. The radius is the only geometrical length available, and $C$ grows in proportion to it.
:::

::: example A sphere of radius ten centimetres {#ex-sphere}
Find the capacitance of an isolated conducting sphere of radius $R = 0.100\,\mathrm{m}$. If the sphere is raised to $1.00\times 10^{3}\,\mathrm{V}$ relative to infinity, find the charge on it.
::: solution
[[#eq-sphere]] gives

$$
C = 4\pi\varepsilon_0 R = \frac{R}{k} = \frac{0.100}{8.9875517923\times 10^{9}} = 1.11265\times 10^{-11}\,\mathrm{F},
$$

which is $11.1\,\mathrm{pF}$ to three significant figures. At $V = 1.00\times 10^{3}\,\mathrm{V}$,

$$
Q = CV = (1.11265\times 10^{-11})(1.00\times 10^{3}) = 1.11265\times 10^{-8}\,\mathrm{C} = 11.1\,\mathrm{nC}.
$$

A sphere the size of a small melon, charged to a kilovolt, holds only about ten nanocoulombs. Capacitance on a human scale is small unless the conductors are large or the gap between them is narrow. That is the reason for the parallel plate.
:::
:::

::: intuition Capacitance as a size
$C = Q/V$ asks how much charge is needed to produce one volt. A large conductor, or two conductors pressed close together, spreads the same charge over a geometry whose field is weaker along the path that defines $V$, so more charge is required for the same volt. The sphere makes the counting literal: $C$ is $4\pi\varepsilon_0$ times a length.
:::

## The parallel-plate capacitor

Two parallel conducting plates, each of area $A$, separated by a distance $d$, form the standard capacitor. One plate carries $+Q$ and the other $-Q$. We assume $d$ is much smaller than the lateral dimensions of the plates, so the field in the gap is uniform and the fringing field at the rim is a small part of the whole.

The surface charge density on the positive plate has magnitude $\sigma = Q/A$. Inside the metal the field is zero. A Gaussian pillbox with one face inside the metal and one face in the gap encloses charge $\sigma A_{\mathrm{box}}$ and has flux only through the face in the gap, so the field in the gap has magnitude

$$
E = \frac{\sigma}{\varepsilon_0} = \frac{Q}{\varepsilon_0 A},
$$ {#eq-gap-field}

directed from the positive plate toward the negative plate. This is twice the field of a single infinite sheet, which is $\sigma/(2\varepsilon_0)$ on each side. The second plate supplies the other half, and outside the pair the two contributions cancel. We neglect the fringing that a finite plate adds near its edge.

The potential difference from the positive plate to the negative plate is the integral of a uniform field across the gap,

$$
V = Ed = \frac{Q d}{\varepsilon_0 A}.
$$

::: theorem Parallel-plate capacitance {#thm-parallel-plate}
For a parallel-plate capacitor in vacuum, with plate area $A$ and separation $d$, neglecting fringing,

$$
C = \frac{\varepsilon_0 A}{d}.
$$ {#eq-plate}
:::

::: proof
By [[#def-pair]] and the potential just computed,

$$
\begin{aligned}
C &= \frac{Q}{V} = \frac{Q}{Ed} = \frac{Q}{(Q/(\varepsilon_0 A))\, d} = \frac{\varepsilon_0 A}{d}.
\end{aligned}
$$

Equivalently, $V = \sigma d/\varepsilon_0$ and $Q = \sigma A$, so the charge density cancels and $C$ depends only on the geometry and on $\varepsilon_0$. The hypotheses are vacuum between the plates, conductors thick enough that the field in the metal is zero, and a separation small enough that fringing may be omitted. Under those hypotheses $E$ is perpendicular to the plates and constant, which is what lets $V = Ed$.
:::

The formula says that a large area and a small gap make a large capacitance. The permittivity $\varepsilon_0$ has units $\mathrm{F/m}$, which is exactly what [[#eq-plate]] requires. Because $V = Qd/(\varepsilon_0 A)$ at fixed charge, the voltage is proportional to the separation. Capacitance, being $Q/V$, therefore falls as $1/d$.

One point is easy to misread. At fixed charge, [[#eq-gap-field]] does not contain $d$. Separating the plates of an ideal capacitor does not weaken the field. It lengthens the path, so the potential difference grows, and the energy grows with it. The weakening people expect is a fringing effect, or the effect of connecting a battery that holds $V$ fixed and lets $Q$ fall as $d$ grows.

::: widget plot
f: 1/x
x: 0.5, 5
caption: For a fixed charge the voltage of a parallel plate is proportional to the separation, so C falls as 1/d. The curve is 1/x in units where the constant of proportionality is 1. Doubling the value on the horizontal axis halves the height.
:::

::: example A plate of area 0.0200 square metres {#ex-plate}
A parallel-plate capacitor has area $A = 0.0200\,\mathrm{m^2}$ and separation $d = 1.00\,\mathrm{mm} = 1.00\times 10^{-3}\,\mathrm{m}$. Neglect fringing. Find $C$. Then charge it to $V = 100\,\mathrm{V}$ and find $Q$ and the stored energy $U = \tfrac12 CV^2$.
::: solution
[[#eq-plate]] with the stated value of $\varepsilon_0$ gives

$$
\begin{aligned}
C &= \frac{\varepsilon_0 A}{d} = \frac{(8.854187817\times 10^{-12})(0.0200)}{1.00\times 10^{-3}} \\
&= 1.7708375634\times 10^{-10}\,\mathrm{F} = 177.08375634\,\mathrm{pF}.
\end{aligned}
$$

The data $A$ and $d$ are given to three significant figures, so

$$
C = 177\,\mathrm{pF}.
$$

At $100\,\mathrm{V}$, using the unrounded capacitance,

$$
Q = CV = (1.7708375634\times 10^{-10})(100) = 1.7708375634\times 10^{-8}\,\mathrm{C} = 17.708\,\mathrm{nC},
$$

which is $17.7\,\mathrm{nC}$ to three significant figures. The stored energy, derived in [[#thm-energy]] below, is

$$
U = \tfrac12 C V^2 = \tfrac12 (1.7708375634\times 10^{-10})(100)^2 = 8.854187817\times 10^{-7}\,\mathrm{J}.
$$

To three significant figures, $U = 8.85\times 10^{-7}\,\mathrm{J}$. The same number is $\tfrac12 QV$ and $Q^2/(2C)$. Using the rounded $177\,\mathrm{pF}$ in place of the full product reproduces $Q = 17.7\,\mathrm{nC}$ and $U = 8.85\times 10^{-7}\,\mathrm{J}$ directly, because $177\times 10^{-12}\times 100 = 1.77\times 10^{-8}$ and $\tfrac12\times 177\times 10^{-12}\times 10^{4} = 8.85\times 10^{-7}$.

If the plates were square, the side would be $\sqrt{0.0200} = 0.141\,\mathrm{m}$, about $141$ times the gap. Fringing, which occupies a border whose width is of order $d$, is then a small fraction of the area, and [[#eq-plate]] is a good approximation.
:::
:::

::: quiz
At fixed charge, the separation of an ideal parallel-plate capacitor is doubled and fringing is still neglected. What happens?
- [ ] The field in the gap halves, and the voltage stays the same
- [ ] The capacitance doubles, because the plates are farther from the fringing region
- [x] The field in the gap is unchanged, the voltage doubles, and the capacitance halves
- [ ] The charge on each plate halves, because the capacitance halved
::: solution
[[#eq-gap-field]] depends on $\sigma = Q/A$ and not on $d$, so $E$ is unchanged when $Q$ and $A$ are fixed. The potential difference is $V = Ed$, so it doubles. [[#eq-plate]] says $C$ halves. The charge cannot change: the plates were isolated at fixed $Q$. The option that halves the field describes a single point charge, or a plate whose charge was allowed to leave.
:::
:::

## Capacitors in combination

Two capacitors are in **parallel** when their positive plates are tied together and their negative plates are tied together, so both feel the same potential difference. They are in **series** when the negative plate of one is connected only to the positive plate of the other, and the free ends are the terminals of the combination. In a steady state no charge accumulates at the junction between them.

::: proposition Capacitors in series {#prop-series}
Two capacitors $C_1$ and $C_2$ in series are equivalent to a single capacitance $C$ with

$$
\frac{1}{C} = \frac{1}{C_1} + \frac{1}{C_2}.
$$ {#eq-series}

The equivalent capacitance is smaller than either capacitor alone.
:::

::: proof
Connect the free end of $C_1$ to a source that places charge $+Q$ on the outer plate. The junction between the two capacitors is isolated from the source. The charge $+Q$ on the outer plate of $C_1$ induces $-Q$ on its inner plate, and that $-Q$ can arrive only by leaving the inner plate of $C_2$. The outer plate of $C_2$ is therefore left with $+Q$. Both capacitors carry the same charge $Q$. Their potential differences add, because the path from one free terminal to the other crosses both gaps:

$$
V = V_1 + V_2 = \frac{Q}{C_1} + \frac{Q}{C_2} = Q\left(\frac{1}{C_1} + \frac{1}{C_2}\right).
$$

By [[#def-pair]], $C = Q/V$, so $1/C = 1/C_1 + 1/C_2$. Since $1/C_1 > 0$ and $1/C_2 > 0$, one has $1/C > 1/C_1$ and $1/C > 1/C_2$, hence $C < C_1$ and $C < C_2$. Adding a second capacitor in series does not increase the capacitance. The same addition of reciprocals extends to any number of capacitors in series, by grouping them two at a time.
:::

The larger capacitor in a series pair takes the smaller share of the voltage. Because $Q$ is common, $V_1/V_2 = C_2/C_1$.

::: proposition Capacitors in parallel {#prop-parallel}
Two capacitors $C_1$ and $C_2$ in parallel are equivalent to

$$
C = C_1 + C_2.
$$ {#eq-parallel}
:::

::: proof
Both capacitors are connected between the same two nodes, so they have the same potential difference $V$. The source must supply both charges:

$$
Q = Q_1 + Q_2 = C_1 V + C_2 V = (C_1 + C_2)V.
$$

Then $C = Q/V = C_1 + C_2$. The charges are in proportion to the capacitances, $Q_1/Q_2 = C_1/C_2$. The result extends to any number of capacitors in parallel by the same addition.
:::

Parallel combination increases the area available for charge at a given voltage, which is why the capacitances add. Series combination increases the effective separation, which is why the capacitance falls. The reciprocal rule for series is the same algebra as resistors in parallel, but the physics is the geometry of $C = \varepsilon_0 A/d$, not an identification of a capacitor with a resistor.

::: example Two plates in series {#ex-series}
Take two capacitors, each identical to the capacitor of [[#ex-plate]], so each has $C_1 = 1.7708375634\times 10^{-10}\,\mathrm{F}$. Find the equivalent capacitance in series and in parallel.
::: solution
In series, [[#eq-series]] with $C_1 = C_2$ gives $C = C_1/2$:

$$
C_{\mathrm{series}} = 8.854187817\times 10^{-11}\,\mathrm{F} = 88.54187817\,\mathrm{pF},
$$

or $88.5\,\mathrm{pF}$ to three significant figures. This is smaller than either capacitor, as [[#prop-series]] requires. In parallel, [[#eq-parallel]] gives

$$
C_{\mathrm{parallel}} = 2C_1 = 3.5416751268\times 10^{-10}\,\mathrm{F} = 354.167513\,\mathrm{pF},
$$

or $354\,\mathrm{pF}$ to three significant figures.

If the series pair is connected across $100\,\mathrm{V}$, the charge on each capacitor is

$$
Q = C_{\mathrm{series}}\times 100 = 8.854187817\times 10^{-9}\,\mathrm{C} = 8.854\,\mathrm{nC},
$$

and each capacitor has $50.0\,\mathrm{V}$ across it, because the two are equal. The voltage to use in an energy formula for one of them is $50.0\,\mathrm{V}$, not the $100\,\mathrm{V}$ of the source. That distinction is the subject of the warning below.
:::
:::

::: warning Series reciprocals, and which voltage
The series rule adds reciprocals. It does not add the capacitances. Two equal capacitors in series have half the capacitance of one of them, not twice. A second, related, mistake appears after charges have moved. The energy $\tfrac12 C V^2$ uses the potential difference across that particular capacitor. Once a series pair, or a pair that has shared charge, has settled, that difference is not the reading of whatever battery was used to charge the system, and it is not the original voltage of a capacitor that has since been connected to another one.
:::

## Energy stored in a capacitor

Charging a capacitor moves charge from one plate to the other against the field that the charge already present has built. The work done by the agent who moves it is stored. We take the process to be quasistatic: the charge is moved so slowly that magnetic effects and radiation are negligible, and the kinetic energy of the carriers is not what we are storing. This work is not the $W_{\mathrm{net}} = \Delta K$ of [[mechanics/work-energy]], and it is not the thermodynamic work of a heat engine. It is the electrostatic energy of the finished arrangement.

::: theorem Energy of a capacitor {#thm-energy}
The electrostatic energy stored in a capacitor of capacitance $C$ carrying charge $Q$ at potential difference $V = Q/C$ is

$$
U = \frac{Q^2}{2C} = \tfrac12 C V^2 = \tfrac12 Q V.
$$ {#eq-energy}
:::

::: proof
Start from $q = 0$ and move a further charge $\dd q$ from the negative plate to the positive plate. At that stage the potential difference is $v = q/C$, by [[#def-pair]], and $C$ is constant for a linear capacitor. The agent applies a force that just balances the electric force, so the work the agent does on $\dd q$ is

$$
\dd W_{\mathrm{agent}} = v\,\dd q = \frac{q}{C}\,\dd q.
$$

Integrate from an uncharged state to a final charge $Q$:

$$
\begin{aligned}
U &= \int_0^{Q} \frac{q}{C}\,\dd q = \frac{1}{C}\left[\tfrac12 q^2\right]_0^{Q} = \frac{Q^2}{2C}.
\end{aligned}
$$

Substitute $Q = CV$ to obtain $\tfrac12 C V^2$. Substitute $C = Q/V$ to obtain $\tfrac12 QV$. The three expressions are equal only when $V$ and $Q$ belong to the same capacitor at the same moment. The factor $\tfrac12$ is the average of $v$, which rises linearly from $0$ to $V$: the agent moves the whole charge $Q$ through an average potential difference $V/2$.
:::

::: corollary Energy density between parallel plates {#cor-energy-density}
Neglecting fringing, the energy stored in a vacuum parallel-plate capacitor is spread through the gap with uniform density

$$
u = \tfrac12 \varepsilon_0 E^2.
$$ {#eq-energy-density}
:::

::: proof
From [[#thm-energy]] and [[#eq-plate]], with $V = Ed$,

$$
\begin{aligned}
U &= \tfrac12 C V^2 = \tfrac12\left(\frac{\varepsilon_0 A}{d}\right)(Ed)^2 = \tfrac12 \varepsilon_0 E^2\,(Ad).
\end{aligned}
$$

The volume of the gap is $Ad$. Dividing gives [[#eq-energy-density]]. The derivation uses a uniform field confined to that volume, so it is the parallel-plate statement. The same density is the local vacuum expression in a general electrostatic field; the general argument integrates $\tfrac12\varepsilon_0 E^2$ over all space and is not needed here.
:::

In [[#ex-plate]], $E = V/d = 100/(1.00\times 10^{-3}) = 1.00\times 10^{5}\,\mathrm{V/m}$ and

$$
u = \tfrac12\varepsilon_0 E^2 = \tfrac12(8.854187817\times 10^{-12})(1.00\times 10^{10}) = 4.4270939085\times 10^{-2}\,\mathrm{J/m^3}.
$$

Times the volume $Ad = 0.0200\times 1.00\times 10^{-3} = 2.00\times 10^{-5}\,\mathrm{m^3}$, this returns $U = 8.854187817\times 10^{-7}\,\mathrm{J}$, the energy already found.

If the charge is held fixed and the plates of that capacitor are separated to $d = 2.00\,\mathrm{mm}$, then $C$ halves, $E$ is unchanged, and $V$ doubles to $200\,\mathrm{V}$. The stored energy doubles to $1.7708375634\times 10^{-6}\,\mathrm{J}$. The extra energy is the work you do when you pull the plates apart against their attraction. Holding $V$ fixed with a battery is a different operation: $Q$ then falls as $d$ grows, and $U = \tfrac12 C V^2$ falls.

A battery that charges a capacitor through a resistor does more work than the capacitor stores.

::: proposition Energy split while charging from a constant battery {#prop-battery}
A capacitor $C$, initially uncharged, is charged from a battery of constant potential difference $\mathcal{E}$ through a resistor. When the current has fallen to zero, the capacitor stores $\tfrac12 C\mathcal{E}^2$. The battery has supplied $C\mathcal{E}^2$. The difference, another $\tfrac12 C\mathcal{E}^2$, has been dissipated in the resistor.
:::

::: proof
At each instant the potential difference on the capacitor is $v = q/C$ and the loop rule, valid while the electric field is still conservative, reads $\mathcal{E} = v + iR$. Multiply by $\dd q = i\,\dd t$:

$$
\mathcal{E}\,\dd q = v\,\dd q + i^2 R\,\dd t.
$$

Integrate from $q = 0$ to the final charge $q = C\mathcal{E}$, when $i = 0$. The left-hand side is $\mathcal{E}(C\mathcal{E}) = C\mathcal{E}^2$. The first term on the right is the integral in the proof of [[#thm-energy]], equal to $Q^2/(2C) = \tfrac12 C\mathcal{E}^2$. The remainder $\int i^2 R\,\dd t$ is the energy dissipated in the resistor, and it equals $\tfrac12 C\mathcal{E}^2$. The result does not depend on the value of $R$, provided $R > 0$ so that a final steady state exists. The time dependence of $i$ is the subject of [[electrostatics/dc-circuits]]; only the integrated split is used here.
:::

::: example Sharing charge between two capacitors {#ex-sharing}
A capacitor $C_1 = 2.00\,\mu\mathrm{F}$ is charged to $100\,\mathrm{V}$ and disconnected. It is then connected in parallel with an uncharged capacitor $C_2 = 3.00\,\mu\mathrm{F}$. Find the common final potential difference, the final stored energy, and the energy that has left the electric field.
::: solution
The initial charge and energy are

$$
\begin{aligned}
Q &= C_1 V_i = (2.00\times 10^{-6})(100) = 2.00\times 10^{-4}\,\mathrm{C}, \\
U_i &= \tfrac12 C_1 V_i^2 = \tfrac12(2.00\times 10^{-6})(100)^2 = 1.00\times 10^{-2}\,\mathrm{J}.
\end{aligned}
$$

After the connection the two capacitors are in parallel, so the equivalent capacitance is $C_1 + C_2 = 5.00\,\mu\mathrm{F}$ by [[#eq-parallel]]. The connecting wires are isolated from any battery, so the charge $Q$ is conserved. The common potential difference is

$$
V_f = \frac{Q}{C_1 + C_2} = \frac{2.00\times 10^{-4}}{5.00\times 10^{-6}} = 40.0\,\mathrm{V}.
$$

The final stored energy is

$$
U_f = \tfrac12 (C_1 + C_2) V_f^2 = \tfrac12(5.00\times 10^{-6})(40.0)^2 = 4.00\times 10^{-3}\,\mathrm{J}.
$$

The field has lost

$$
U_i - U_f = 6.00\times 10^{-3}\,\mathrm{J}.
$$

That energy is dissipated as heat and radiation in the spark or the resistance of the connecting path. It is the same kind of loss as in [[#prop-battery]], not a failure of the energy theorem. Using $\tfrac12 C_1 (100)^2$ after the connection, or $\tfrac12(C_1+C_2)(100)^2$, would apply [[#eq-energy]] to a voltage that no longer exists across those plates.
:::
:::

A cylindrical capacitor is the same idea with a different symmetry, and it is the geometry of a coaxial cable.

::: proposition Coaxial capacitor {#prop-coax}
Two concentric conducting cylinders, of radii $a < b$ and length $L$, with vacuum between them, have capacitance

$$
C = \frac{2\pi\varepsilon_0 L}{\ln(b/a)},
$$ {#eq-coax}

when end effects are neglected.
:::

::: proof
Let the inner cylinder carry charge $+Q$ and the outer carry $-Q$, and write $\lambda = Q/L$. Consider a Gaussian surface that is a cylinder of radius $r$, with $a < r < b$, and of length $L$. The field is radial by symmetry. The flux is $E\cdot 2\pi r L$, and the enclosed charge is $\lambda L$, so Gauss's law gives

$$
E(r) = \frac{\lambda}{2\pi\varepsilon_0 r}.
$$

The potential of the inner cylinder relative to the outer is

$$
\begin{aligned}
V &= -\int_b^{a} E\,\dd r = \int_a^{b} \frac{\lambda}{2\pi\varepsilon_0 r}\,\dd r = \frac{\lambda}{2\pi\varepsilon_0}\ln\frac{b}{a}.
\end{aligned}
$$

Then

$$
C = \frac{Q}{V} = \frac{\lambda L}{(\lambda/(2\pi\varepsilon_0))\ln(b/a)} = \frac{2\pi\varepsilon_0 L}{\ln(b/a)}.
$$

The hypothesis $L \gg b$ is what lets us ignore the ends and treat $E$ as purely radial. If the charge distribution extended without end, the zero of potential could not be placed at infinity; here the outer cylinder is a finite reference and no such problem arises.
:::

::: example A short coaxial pair {#ex-coax}
Take $a = 1.00\,\mathrm{mm}$, $b = 2.00\,\mathrm{mm}$ and $L = 0.200\,\mathrm{m}$. Find $C$. If the inner conductor carries $Q = 5.00\,\mathrm{nC}$, find $V$ and $U$.
::: solution
Here $b/a = 2$ and $\ln 2 = 0.693147$. [[#eq-coax]] gives

$$
\begin{aligned}
C &= \frac{2\pi(8.854187817\times 10^{-12})(0.200)}{\ln 2} \\
&= 1.605214718\times 10^{-11}\,\mathrm{F} = 16.052\,\mathrm{pF},
\end{aligned}
$$

or $16.1\,\mathrm{pF}$ to three significant figures. At $Q = 5.00\times 10^{-9}\,\mathrm{C}$,

$$
\begin{aligned}
V &= \frac{Q}{C} = \frac{5.00\times 10^{-9}}{1.605214718\times 10^{-11}} = 311.485\,\mathrm{V}, \\
U &= \frac{Q^2}{2C} = \frac{(5.00\times 10^{-9})^2}{2\times 1.605214718\times 10^{-11}} = 7.787\times 10^{-7}\,\mathrm{J}.
\end{aligned}
$$

To three significant figures, $V = 311\,\mathrm{V}$ and $U = 7.79\times 10^{-7}\,\mathrm{J}$. The narrow gap of [[#ex-plate]] stored a similar energy at only $100\,\mathrm{V}$, because its capacitance was about ten times larger. Geometry, not a different law, is the difference.
:::
:::

## A linear dielectric

Faraday found that an insulating material between the plates increases the capacitance. The factor is a property of the material.

::: definition Linear dielectric {#def-dielectric}
A **linear dielectric** is a material in which the polarisation is proportional to the macroscopic electric field. The dimensionless factor $\kappa$ (also written $\varepsilon_r$), the dielectric constant or relative permittivity, is defined so that a slab which completely fills the gap of a capacitor multiplies the vacuum capacitance by $\kappa$. For vacuum, $\kappa = 1$. We take $\kappa$ independent of the field strength.
:::

Polarisation means a slight shift of the bound charges inside the material. On the faces of a slab that fills the gap, that shift leaves a bound surface charge of density $\sigma_b$. We take the linear relation in the form $\sigma_b = \varepsilon_0(\kappa - 1)E$, where $E$ is the net field in the dielectric. This is the content of the definition above, written so that a Gauss argument can find $E$.

::: proposition Dielectric filling a parallel-plate gap {#prop-dielectric}
Suppose a linear dielectric of dielectric constant $\kappa$ completely fills the gap of a parallel-plate capacitor, fringing still neglected. If the free charge density on the plates is $\sigma_f$, the field in the dielectric is

$$
E = \frac{\sigma_f}{\kappa\varepsilon_0},
$$ {#eq-diel-field}

and the capacitance is

$$
C = \kappa\frac{\varepsilon_0 A}{d} = \kappa C_0,
$$ {#eq-kappa}

where $C_0 = \varepsilon_0 A/d$ is the vacuum capacitance. For a given free charge, $E$ and $V$ are smaller than their vacuum values by the factor $\kappa$.
:::

::: proof
The net field in the gap is the field of the free charge minus the opposing field of the bound charge. Each is a sheet field of the conductor type, because the geometry is still a parallel slab:

$$
E = \frac{\sigma_f}{\varepsilon_0} - \frac{\sigma_b}{\varepsilon_0}.
$$

Insert $\sigma_b = \varepsilon_0(\kappa - 1)E$:

$$
E = \frac{\sigma_f}{\varepsilon_0} - (\kappa - 1)E.
$$

Collect the terms in $E$:

$$
E + (\kappa - 1)E = \kappa E = \frac{\sigma_f}{\varepsilon_0}, \qquad E = \frac{\sigma_f}{\kappa\varepsilon_0}.
$$

The potential difference is $V = Ed = \sigma_f d/(\kappa\varepsilon_0) = Qd/(\kappa\varepsilon_0 A)$. Therefore

$$
C = \frac{Q}{V} = \kappa\frac{\varepsilon_0 A}{d}.
$$

At fixed free charge, both $E$ and $V$ are the vacuum results divided by $\kappa$, and $U = Q^2/(2C)$ is the vacuum energy divided by $\kappa$. The bound charge is not available to a wire; $Q$ in [[#eq-cap-pair]] is the free charge on the plate.
:::

Two ways of inserting the dielectric must be kept apart, because they hold different quantities fixed.

If the capacitor is charged and then disconnected, $Q$ is fixed. Inserting the dielectric multiplies $C$ by $\kappa$, divides $V$ by $\kappa$, divides $E$ by $\kappa$, and divides $U$ by $\kappa$.

If the capacitor remains connected to a battery, $V$ is fixed. The free charge rises by the factor $\kappa$, because $Q = CV$ and $C$ has grown. The field $E = V/d$ does not fall: the drop that the dielectric would have produced is offset by the extra free charge the battery supplies. The stored energy $U = \tfrac12 C V^2$ rises by the factor $\kappa$. The battery is the source of that extra energy.

The syllabus remark on the force is only this. A dielectric slab that is free to slide into the gap is drawn in, whether $Q$ or $V$ is held fixed. At fixed $Q$ the stored energy falls as the slab enters, and that fall is consistent with the field doing mechanical work on the slab. At fixed $V$ the stored energy rises, and the battery supplies both the extra field energy and the mechanical work. The force law itself is a later calculation; we do not derive it.

::: example A dielectric of constant 4 {#ex-dielectric}
The capacitor of [[#ex-plate]] is charged to $100\,\mathrm{V}$ in vacuum. A linear dielectric with $\kappa = 4.00$ then fills the gap. Find the new capacitance, charge, voltage and stored energy if (a) the battery remains connected, and (b) the battery is disconnected before the dielectric is inserted.
::: solution
The vacuum values from [[#ex-plate]] are $C_0 = 1.7708375634\times 10^{-10}\,\mathrm{F}$, $Q_0 = 1.7708375634\times 10^{-8}\,\mathrm{C}$ and $U_0 = 8.854187817\times 10^{-7}\,\mathrm{J}$. [[#eq-kappa]] multiplies the capacitance by $4$ in both cases:

$$
C = 4C_0 = 7.0833502536\times 10^{-10}\,\mathrm{F} = 708.335\,\mathrm{pF}.
$$

(a) The battery holds $V = 100\,\mathrm{V}$. Then

$$
\begin{aligned}
Q &= CV = 4Q_0 = 7.0833502536\times 10^{-8}\,\mathrm{C} = 70.8335\,\mathrm{nC}, \\
U &= \tfrac12 C V^2 = 4U_0 = 3.5416751268\times 10^{-6}\,\mathrm{J}.
\end{aligned}
$$

The field stays $E = V/d = 1.00\times 10^{5}\,\mathrm{V/m}$. The free charge has increased by $4$, and the bound charge cancels three quarters of the field that this new free charge would have produced alone, leaving the original field.

(b) The free charge stays at $Q_0$. Then

$$
\begin{aligned}
V &= \frac{Q_0}{C} = \frac{100}{4.00} = 25.0\,\mathrm{V}, \\
U &= \frac{Q_0^2}{2C} = \frac{U_0}{4} = 2.213546954\times 10^{-7}\,\mathrm{J},
\end{aligned}
$$

and $E = V/d = 2.50\times 10^{4}\,\mathrm{V/m}$, which is the vacuum field divided by $\kappa$, in agreement with [[#eq-diel-field]]. Quoting $100\,\mathrm{V}$ in $\tfrac12 CV^2$ after the battery has been disconnected is the mistake named in the warning.
:::
:::

::: quiz
A capacitor is charged by a battery and left connected to it. A dielectric slab with $\kappa > 1$ is inserted so that it fills the gap. Which statement is correct?
- [x] The free charge increases by the factor $\kappa$, and the stored energy increases by the factor $\kappa$
- [ ] The free charge stays the same, and the stored energy falls by the factor $\kappa$
- [ ] The potential difference increases by the factor $\kappa$, because the dielectric is polarised
- [ ] The capacitance is unchanged, because the plate separation is unchanged
::: solution
The battery holds the potential difference fixed, so the third statement is wrong and the second statement describes the disconnected capacitor instead. [[#eq-kappa]] says the capacitance becomes $\kappa C_0$. At fixed $V$, the free charge $Q = CV$ and the energy $\tfrac12 CV^2$ both rise by $\kappa$. The separation is unchanged, but the material in the gap is not, so $C$ changes.
:::
:::

::: application A capacitor as a short store of energy
A capacitor of $100\,\mu\mathrm{F}$ charged to $300\,\mathrm{V}$ stores

$$
U = \tfrac12 C V^2 = \tfrac12(1.00\times 10^{-4})(300)^2 = 4.50\,\mathrm{J}.
$$

That is a modest energy, but it can be released in a very short time through a lamp or a flash tube, which is why a camera flash uses a capacitor rather than drawing the whole pulse straight from a small cell. The power for a release in $1.00\,\mathrm{ms}$ would be $4.50\times 10^{3}\,\mathrm{W}$ if the discharge were uniform in time. The cell recharges the capacitor slowly between flashes. The calculation uses [[#eq-energy]] and nothing about the chemistry of the cell.
:::

::: remark What this chapter does not do
The force on a partially inserted slab, the capacitance matrix of several conductors, and the energy of a dielectric that is not linear are all left aside. So is the transient current during charging, apart from the integrated energy split in [[#prop-battery]]. Edge corrections to [[#eq-plate]] are a boundary-value problem, not a change in the definition of $C$.
:::

## Where this leads

The energy in [[#eq-energy]] and the density in [[#eq-energy-density]] are the electrostatic part of the field energy. Moving charges, the current of the next chapter, dissipate energy in resistors at the rate treated in [[electrostatics/current]]. A circuit that both stores charge and lets it flow is the RC circuit of [[electrostatics/dc-circuits]], where the time constant is the product $RC$ and the charging curve approaches the energy split proved here. The dielectric constant reappears when electromagnetic waves travel in matter, because the speed depends on $\varepsilon$ and $\mu$. Nothing in that later development changes [[#eq-plate]] or [[#eq-series]].

::: history Faraday and the farad
In 1837 Michael Faraday, in the eleventh series of *Experimental Researches in Electricity*, showed that an insulating substance placed between two conductors increases the charge they hold at a given potential difference. He called the factor the specific inductive capacity of the substance. The number $\kappa$ of [[#def-dielectric]] is that factor. The SI unit of capacitance, the farad, was named for him long afterwards. One farad is far larger than anything Faraday measured: the parallel-plate capacitor of [[#ex-plate]] is $177\,\mathrm{pF}$, eleven orders of magnitude below a farad.
:::

::: summary
- The capacitance of an isolated conductor is $C = Q/V$, and of a pair is $Q$ on one conductor divided by the potential difference. In a linear medium $C$ does not depend on $Q$. The unit is the farad.
- An isolated conducting sphere of radius $R$ has $C = 4\pi\varepsilon_0 R$. A sphere of radius $0.100\,\mathrm{m}$ has $C = 11.1\,\mathrm{pF}$.
- Neglecting fringing, a parallel-plate capacitor in vacuum has $C = \varepsilon_0 A/d$, because $E = \sigma/\varepsilon_0$ and $V = Ed$. At fixed charge, $E$ does not depend on $d$.
- In series, $1/C = 1/C_1 + 1/C_2$, and the equivalent capacitance is smaller than either one. In parallel, $C = C_1 + C_2$. Two capacitors of $177\,\mathrm{pF}$ in series give $88.5\,\mathrm{pF}$.
- The stored energy is $U = Q^2/(2C) = \tfrac12 CV^2 = \tfrac12 QV$, obtained by integrating $v\,\dd q$ while the capacitor is charged. Between parallel plates in vacuum the density is $\tfrac12\varepsilon_0 E^2$.
- A constant battery supplies $C\mathcal{E}^2$ while charging a capacitor from zero, and half of that is dissipated in the resistance of the path. After charges redistribute, $\tfrac12 CV^2$ must use the new voltage.
- A linear dielectric that fills the gap multiplies $C$ by $\kappa$. For a given free charge, $E$ falls by $\kappa$. If instead a battery holds $V$ fixed, the free charge and the stored energy rise by $\kappa$.
- A coaxial pair has $C = 2\pi\varepsilon_0 L/\ln(b/a)$ when end effects are neglected. The force on a dielectric slab is left for a later treatment; the slab is drawn into the gap.
:::

## Exercises

::: exercise Capacitance from charge and voltage {#exr-ratio level=1 check="40"}
A conductor carries $Q = 6.00\,\mu\mathrm{C}$ when its potential difference from a chosen zero is $150\,\mathrm{V}$. Find its capacitance in nanofarads.
::: solution
[[#eq-cap-isolated]] gives

$$
C = \frac{Q}{V} = \frac{6.00\times 10^{-6}}{150} = 4.00\times 10^{-8}\,\mathrm{F} = 40.0\,\mathrm{nF}.
$$

The answer is $40.0\,\mathrm{nF}$. The zero of potential must be the one used to quote $V$; a different zero would change the number and is not what the measurement states.
:::
:::

::: exercise Energy of a two-microfarad capacitor {#exr-stored level=1 check="0.0025"}
A capacitor of capacitance $2.00\,\mu\mathrm{F}$ is charged to $50.0\,\mathrm{V}$. Find the stored energy in joules.
::: solution
Use the middle form of [[#eq-energy]]:

$$
U = \tfrac12 C V^2 = \tfrac12(2.00\times 10^{-6})(50.0)^2 = (1.00\times 10^{-6})(2500) = 2.50\times 10^{-3}\,\mathrm{J}.
$$

The charge is $Q = CV = 1.00\times 10^{-4}\,\mathrm{C}$, and $\tfrac12 QV = \tfrac12(1.00\times 10^{-4})(50.0) = 2.50\times 10^{-3}\,\mathrm{J}$ agrees. The answer is $2.50\times 10^{-3}\,\mathrm{J}$.
:::
:::

::: exercise Two capacitors in parallel {#exr-parallel-uf level=1 check="16"}
Capacitors of $4.00\,\mu\mathrm{F}$ and $12.0\,\mu\mathrm{F}$ are connected in parallel. Find the equivalent capacitance in microfarads.
::: solution
[[#eq-parallel]] adds the capacitances:

$$
C = 4.00 + 12.0 = 16.0\,\mu\mathrm{F}.
$$

The answer is $16.0\,\mu\mathrm{F}$. The same two capacitors in series would not give this sum; that is the next exercise.
:::
:::

::: exercise Two capacitors in series {#exr-series-uf level=2 check="3"}
The capacitors of the previous exercise, $4.00\,\mu\mathrm{F}$ and $12.0\,\mu\mathrm{F}$, are connected in series instead. Find the equivalent capacitance in microfarads.
::: solution
[[#eq-series]] gives

$$
\frac{1}{C} = \frac{1}{4.00} + \frac{1}{12.0} = 0.250 + 0.08333 = 0.33333\,\mu\mathrm{F}^{-1},
$$

so $C = 3.00\,\mu\mathrm{F}$. Exactly,

$$
\frac{1}{C} = \frac{1}{4} + \frac{1}{12} = \frac{3}{12} + \frac{1}{12} = \frac{1}{3},
$$

and $C = 3$, in microfarads. The result is smaller than $4.00\,\mu\mathrm{F}$, the lesser of the two, which is the inequality in [[#prop-series]].
:::
:::

::: exercise A mixed network {#exr-network level=2 check="18"}
A capacitor of $2.00\,\mu\mathrm{F}$ is connected in series with the parallel combination of a $3.00\,\mu\mathrm{F}$ capacitor and a $6.00\,\mu\mathrm{F}$ capacitor. The whole network is placed across an $11.0\,\mathrm{V}$ battery. Find the charge supplied by the battery, in microcoulombs.
::: hint
First replace the parallel pair by a single capacitance. Then use the series rule. The charge you want is the charge on the equivalent capacitor, which is also the charge on the $2.00\,\mu\mathrm{F}$ capacitor.
:::
::: solution
The parallel pair is $3.00 + 6.00 = 9.00\,\mu\mathrm{F}$ by [[#eq-parallel]]. In series with $2.00\,\mu\mathrm{F}$,

$$
\frac{1}{C} = \frac{1}{2.00} + \frac{1}{9.00} = \frac{9}{18} + \frac{2}{18} = \frac{11}{18},
$$

so $C = 18/11\,\mu\mathrm{F} = 1.63636\,\mu\mathrm{F}$. Across $11.0\,\mathrm{V}$,

$$
Q = CV = \left(\frac{18}{11}\times 10^{-6}\right)(11.0) = 18.0\times 10^{-6}\,\mathrm{C} = 18.0\,\mu\mathrm{C}.
$$

The answer is $18.0\,\mu\mathrm{C}$. As a check, this charge on the $2.00\,\mu\mathrm{F}$ capacitor produces a drop of $18.0/2.00 = 9.00\,\mathrm{V}$, and on the $9.00\,\mu\mathrm{F}$ pair a drop of $18.0/9.00 = 2.00\,\mathrm{V}$. The drops add to $11.0\,\mathrm{V}$.
:::
:::

::: exercise Inserting a dielectric at fixed charge {#exr-kappa-v level=2 check="200/7"}
The parallel-plate capacitor of [[#ex-plate]], with $C_0 = 1.7708375634\times 10^{-10}\,\mathrm{F}$, is charged to $100\,\mathrm{V}$ and disconnected. A linear dielectric with $\kappa = 3.50$ then fills the gap completely. Find the new potential difference, in volts.
::: solution
Disconnection fixes the free charge. [[#prop-dielectric]] says $C = \kappa C_0$ and the potential difference falls by $\kappa$:

$$
V = \frac{100}{3.50} = \frac{200}{7} = 28.5714\,\mathrm{V}.
$$

The answer is $28.6\,\mathrm{V}$ to three significant figures, and exactly $200/7$ volts for $\kappa = 3.50$ as given. The stored energy falls by the same factor. It would be wrong to keep $V = 100\,\mathrm{V}$, which is the connected-battery case.
:::
:::

::: exercise Building the energy integral {#exr-energy-proof level=3}
A capacitor of constant capacitance $C$ is carried from charge $0$ to charge $Q$ by a quasistatic external agent. Prove that the work done by the agent is $Q^2/(2C)$. State the hypotheses. Then show that the same work equals $\tfrac12 QV$ with $V = Q/C$, and explain in one sentence why a constant battery of voltage $V$ does not do this amount of work.
::: hint
Write the potential difference when the charge is $q$, multiply by $\dd q$, and integrate. The battery remark is [[#prop-battery]].
:::
::: solution
The hypotheses are: $C$ is constant, so the capacitor is linear and its geometry is fixed; the charging is quasistatic, so the kinetic energy of the carriers is not part of the stored energy and magnetic radiation is neglected; the potential difference at charge $q$ is $v = q/C$, which is [[#def-pair]].

The work done by the agent on a further charge $\dd q$ is $v\,\dd q = (q/C)\,\dd q$. Therefore

$$
W = \int_0^{Q} \frac{q}{C}\,\dd q = \frac{Q^2}{2C}.
$$

With $V = Q/C$ one has $Q = CV$, so

$$
\frac{Q^2}{2C} = \frac{(CV)^2}{2C} = \tfrac12 C V^2 = \tfrac12 Q V.
$$

A constant battery of potential difference $V$ pushes the whole charge $Q$ through the fixed difference $V$, so it supplies $QV$, twice the stored energy. The other half is dissipated in the resistance of the charging path, as proved in [[#prop-battery]].
:::
:::

::: exercise Energy lost when equal capacitors share charge {#exr-share level=3 check="0.0025"}
A capacitor of $4.00\,\mu\mathrm{F}$ is charged to $50.0\,\mathrm{V}$ and disconnected from the source. It is then connected in parallel with a second capacitor of $4.00\,\mu\mathrm{F}$ that was uncharged. Find the energy dissipated in the connection, in joules.
::: hint
Conserve the charge. The final capacitance is the sum. Compute $U$ before and after with the voltage that each stage actually has.
:::
::: solution
The initial charge and energy are

$$
\begin{aligned}
Q &= (4.00\times 10^{-6})(50.0) = 2.00\times 10^{-4}\,\mathrm{C}, \\
U_i &= \tfrac12(4.00\times 10^{-6})(50.0)^2 = 5.00\times 10^{-3}\,\mathrm{J}.
\end{aligned}
$$

Charge is conserved and the final capacitance is $8.00\,\mu\mathrm{F}$, so

$$
V_f = \frac{2.00\times 10^{-4}}{8.00\times 10^{-6}} = 25.0\,\mathrm{V}.
$$

The final stored energy is

$$
U_f = \tfrac12(8.00\times 10^{-6})(25.0)^2 = 2.50\times 10^{-3}\,\mathrm{J}.
$$

The dissipated energy is

$$
U_i - U_f = 2.50\times 10^{-3}\,\mathrm{J}.
$$

Half the field energy has left the capacitors. Using $50.0\,\mathrm{V}$ in the final energy would invent a battery that is no longer connected. The equal capacitors end at half the original voltage because they share the charge equally; the energy does not fall by half for a general second capacitance, as [[#ex-sharing]] showed.
:::
:::
