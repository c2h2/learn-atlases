A single lamp on a single battery is Ohm's law in one line. A second lamp, a second battery, or a capacitor changes the problem. The current is then no longer one number read off a potential difference and a resistance. Charge does not accumulate at a junction while the currents are steady, and a walk around any closed path must bring the electrostatic potential back to the value it started from. Those two facts are Kirchhoff's rules. This chapter turns them into a method: resistor networks that can be collapsed, networks that cannot, a battery that heats its own interior, and the slow charging of a capacitor.

Current, resistance and Ohm's law are taken from [[electrostatics/current]]. Capacitance, and the energy stored on a capacitor, are taken from [[electrostatics/capacitance]]. Potential is the line integral of the electrostatic field, as in [[electrostatics/potential]]. Electrical power below is a rate of work on charges. It is not the mechanical work–energy theorem of [[mechanics/work-energy]], and the sign of a battery's contribution has to be read off the direction of the current, not guessed from the size of the emf.

Throughout, an ideal connecting wire has zero resistance. In the model there is no potential drop along it. Every drop that Ohm's law produces sits in a resistor, or inside a battery that has internal resistance.

## Resistors in series and in parallel

Two networks are equivalent, for everything outside them, when the same potential difference drives the same total current through either one. The outside circuit cannot tell them apart.

::: definition Equivalent resistance {#def-equivalent}
Suppose a network of resistors has two terminals, and a potential difference $V$ between those terminals drives a total current $I$ in at one terminal and out at the other. The **equivalent resistance** of the network between those terminals is

$$
R_{\mathrm{eq}} = \frac{V}{I},
$$ {#eq-equivalent}

provided $I \neq 0$. The network may then be replaced, in any larger circuit, by a single resistor $R_{\mathrm{eq}}$.
:::

The definition uses the steady current that actually enters the network. It says nothing yet about how the resistors are wired. Series and parallel are the two arrangements in which $R_{\mathrm{eq}}$ is immediate.

::: theorem Resistors in series {#thm-series}
If resistors $R_1, R_2, \ldots, R_n$ carry the same current $I$, and the potential difference $V$ across the chain is the sum of the potential differences across the individual resistors, then

$$
R_{\mathrm{eq}} = R_1 + R_2 + \cdots + R_n.
$$ {#eq-series}
:::

::: proof
Ohm's law on the $k$-th resistor gives $V_k = I R_k$. There is only one current because a series chain has no junction at which charge could leave. Adding the potential differences,

$$
V = V_1 + \cdots + V_n = I(R_1 + \cdots + R_n).
$$

[[#def-equivalent]] then gives $R_{\mathrm{eq}} = V/I = R_1 + \cdots + R_n$.
:::

Series addition is why a long thin wire resists more than a short thick one of the same metal: the wire is a chain of pieces, and the pieces add. It is also a voltage divider. The $k$-th resistor takes the fraction $R_k/R_{\mathrm{eq}}$ of the total potential difference, because $V_k/V = (IR_k)/(IR_{\mathrm{eq}})$.

::: theorem Resistors in parallel {#thm-parallel}
If resistors $R_1, R_2, \ldots, R_n$ are connected between the same two nodes, so that each feels the same potential difference $V$, then

$$
\frac{1}{R_{\mathrm{eq}}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots + \frac{1}{R_n}.
$$ {#eq-parallel}
:::

::: proof
The current in the $k$-th branch is $I_k = V/R_k$, by Ohm's law. At the node where the branches meet, the currents add: the total current arriving from the source is $I = I_1 + \cdots + I_n$, because in the steady state charge does not collect on the node. Therefore

$$
I = V\left(\frac{1}{R_1} + \cdots + \frac{1}{R_n}\right).
$$

[[#def-equivalent]] gives $1/R_{\mathrm{eq}} = I/V$, which is [[#eq-parallel]].
:::

For two resistors the formula is the product over the sum, $R_{\mathrm{eq}} = R_1 R_2/(R_1 + R_2)$. Parallel combination always lowers the resistance: a new path cannot make it harder for charge to cross. The smallest resistor carries the largest share of the current and dominates $R_{\mathrm{eq}}$.

::: example Two equal resistors in parallel {#ex-parallel}
Two resistors of $8.00\,\Omega$ are connected in parallel across an ideal battery of $12.0\,\mathrm{V}$. Find the equivalent resistance, the current in each resistor, and the power drawn from the battery.
::: solution
[[#eq-parallel]] with two equal resistances gives $1/R_{\mathrm{eq}} = 1/8.00 + 1/8.00 = 1/4.00$, so $R_{\mathrm{eq}} = 4.00\,\Omega$. The battery then supplies

$$
I = \frac{12.0}{4.00} = 3.00\,\mathrm{A}.
$$

Each resistor feels the full $12.0\,\mathrm{V}$, so each carries $12.0/8.00 = 1.50\,\mathrm{A}$. The two branch currents sum to the battery current. The power in one resistor is $(1.50)^2 \times 8.00 = 18.0\,\mathrm{W}$, and the pair dissipates $36.0\,\mathrm{W}$. The battery delivers $\mathcal{E} I = 12.0 \times 3.00 = 36.0\,\mathrm{W}$. The two accounts agree.
:::
:::

::: intuition Adding obstacles, or adding paths
Series wiring makes the charges pass through every resistor, so the obstacles add and the current is common. Parallel wiring offers alternative routes between the same two potentials, so the conductances $1/R_k$ add and the potential difference is common. If a network is drawn so that you cannot tell which of those two sentences applies, do not force it: that network needs the rules of the next section.
:::

A mixed network is reduced from the inside. Collapse every purely series chain and every purely parallel group, replace each by its equivalent, and repeat. The order does not matter; the final $R_{\mathrm{eq}}$ between two terminals is unique.

::: example A series resistor feeding a parallel pair {#ex-ladder}
An ideal battery of $10.0\,\mathrm{V}$ is connected to a $4.00\,\Omega$ resistor in series with a parallel combination of $6.00\,\Omega$ and $3.00\,\Omega$. Find the battery current and the current in each resistor.
::: solution
The parallel pair has

$$
R_{\parallel} = \frac{6.00 \times 3.00}{6.00 + 3.00} = 2.00\,\Omega.
$$

In series with $4.00\,\Omega$ the chain is $R_{\mathrm{eq}} = 6.00\,\Omega$, so the battery current is

$$
I = \frac{10.0}{6.00} = \frac{5}{3}\,\mathrm{A} = 1.67\,\mathrm{A}.
$$

The potential difference across the parallel pair is $I R_{\parallel} = (5/3)\times 2.00 = 3.33\,\mathrm{V}$. The $6.00\,\Omega$ branch then carries $0.556\,\mathrm{A}$, and the $3.00\,\Omega$ branch carries $1.11\,\mathrm{A}$. The branches sum to the battery current, and the three resistor powers sum to $\mathcal{E} I = 16.7\,\mathrm{W}$. 
:::
:::

The reduction stops when a resistor joins two loops and belongs neither to a pure series chain nor to a pure parallel group. A bridge cross-link is the usual case. The currents still exist, and the junction and loop rules find them.

## Kirchhoff's rules

The rules apply to a **lumped** circuit: the physical size of the network is small compared with the distance light travels during any time we care about, radiation is neglected, and any magnetic flux through a loop is either constant or confined to a component we are not yet using. Inside that model the electrostatic potential is a function of position only, and the current in a wire is one number, the same all along a branch.

::: definition Steady state and a branch {#def-steady}
A circuit is in a **steady state** when every current is constant in time and no charge is accumulating at any node. A **branch** is a single path connecting two nodes, along which the current has one value. A **node**, or junction, is a point where three or more branches meet. A **loop** is a closed path along branches.
:::

::: theorem Junction rule {#thm-junction}
In the steady state, the algebraic sum of the currents at any node is zero. With the sign convention that currents entering the node are positive and currents leaving it are negative,

$$
\sum_k I_k = 0.
$$ {#eq-junction}
:::

::: proof
Let $Q(t)$ be the charge sitting on the node. The current leaving the node is the rate at which that charge decreases, so $\mathrm{d}Q/\mathrm{d}t$ equals the algebraic sum of the currents entering. In the steady state $Q$ is constant, and the sum is zero. The same statement is the continuity equation integrated over a small surface around the node: if $\partial \rho/\partial t = 0$ inside that surface, the flux of current density through the surface vanishes.
:::

The equations are not independent: each current that leaves one node enters another, so the sum of every junction equation is $0 = 0$. For $N$ nodes, write $N - 1$ junction equations and no more.

::: theorem Loop rule {#thm-loop}
In the steady state, and in the lumped model with no changing magnetic flux, the sum of the changes in electric potential around any closed loop is zero:

$$
\sum \Delta V = 0.
$$ {#eq-loop}
:::

::: proof
The electrostatic field is conservative, so the potential difference between two points does not depend on the path, and the potential difference from a point back to itself is zero. Explicitly, if $V$ is the electrostatic potential, then along any closed curve $C$

$$
\oint_C \mathbf{E}\cdot\dd\mathbf{l} = 0,
$$

which is the statement that the sum of the potential drops around $C$ vanishes. In the lumped model every contribution to that sum is localised in a component. An ideal wire contributes nothing. A resistor contributes the Ohm drop. A battery contributes its emf, which is the work per unit charge done by the non-electrostatic agency inside the battery, accounted for as a jump in the potential bookkeeping. Adding those contributions gives [[#eq-loop]].
:::

The loop rule says that a closed walk returns to the same potential. For a planar circuit the meshes, the loops with no other loop inside them, are an independent set: any other loop equation is a sum of mesh equations.

The signs have to be fixed before the equations are written, and then left alone. A negative answer is information. It means the current flows against the arrow that was assumed.

::: proposition Sign rules for a loop {#prop-signs}
Traverse a loop in a chosen direction. Across a resistor, if the traversal is in the direction of the assumed current, the change in potential is $\Delta V = -IR$; if the traversal is against the current, $\Delta V = +IR$. Across an ideal battery, if the traversal goes from the negative terminal to the positive terminal, $\Delta V = +\mathcal{E}$; if it goes from the positive terminal to the negative terminal, $\Delta V = -\mathcal{E}$.
:::

::: proof
Ohm's law says that the current in a resistor flows from high potential to low potential, and that the difference has magnitude $IR$. Walking with the current is therefore a step down, and walking against it is a step up. Inside an ideal battery the chemical agency raises the potential of a positive charge as that charge is moved from the negative terminal to the positive terminal, by $\mathcal{E}$ joules per coulomb, whether or not a current is flowing. The potential change recorded by the loop rule is that rise, with a sign fixed by the direction in which the loop crosses the battery. Both clauses are the definition of potential difference applied to one component; [[#thm-loop]] then says that the signed changes add to zero.
:::

Draw the circuit and label every branch current with an arrow. Write $N - 1$ junction equations and enough loop equations, using [[#prop-signs]], to match the number of unknowns. A negative current means the charge flows against the arrow you drew. Check a solution by balancing battery power against resistor power.

::: example Two batteries sharing a middle resistor {#ex-twoloop}
Three branches join a top node to a bottom node. The left branch is an ideal battery $\mathcal{E}_1 = 12.0\,\mathrm{V}$, positive terminal at the top, in series with $R_1 = 2.00\,\Omega$. The middle branch is $R_2 = 8.00\,\Omega$ alone. The right branch is an ideal battery $\mathcal{E}_2 = 6.00\,\mathrm{V}$, positive terminal at the top, in series with $R_3 = 2.00\,\Omega$. Find the current in each branch, and check the powers.
::: solution
The batteries face each other: each would, by itself, push current out of its positive terminal at the top and down through the middle resistor. Let $I_1$ be the current upward in the left branch, $I_2$ the current downward in the right branch, and $I_{\mathrm{m}}$ the current downward in the middle. The top junction, [[#thm-junction]], says

$$
I_1 = I_{\mathrm{m}} + I_2.
$$ {#eq-node-ex}

Traverse the left loop clockwise, up the left branch and down the middle. [[#prop-signs]] gives $+\mathcal{E}_1$ on the battery, $-I_1 R_1$ on the left resistor, and $-I_{\mathrm{m}} R_2$ on the middle resistor:

$$
12.0 - 2.00\, I_1 - 8.00\, I_{\mathrm{m}} = 0.
$$ {#eq-left-ex}

Traverse the right loop clockwise, up the middle and down the right branch. Walking up the middle is against $I_{\mathrm{m}}$, so the middle resistor contributes $+I_{\mathrm{m}} R_2$. Walking down the right branch crosses $R_3$ with $I_2$ and crosses $\mathcal{E}_2$ from positive to negative:

$$
8.00\, I_{\mathrm{m}} - 2.00\, I_2 - 6.00 = 0.
$$ {#eq-right-ex}

Substitute $I_1 = I_{\mathrm{m}} + I_2$ into [[#eq-left-ex]]:

$$
12.0 - 2.00(I_{\mathrm{m}} + I_2) - 8.00\, I_{\mathrm{m}} = 0,
$$

which is $10.0\, I_{\mathrm{m}} + 2.00\, I_2 = 12.0$, or $5.00\, I_{\mathrm{m}} + I_2 = 6.00$. The right-hand equation is $4.00\, I_{\mathrm{m}} - I_2 = 3.00$. Adding these two reduced equations cancels $I_2$ and gives $9.00\, I_{\mathrm{m}} = 9.00$, so $I_{\mathrm{m}} = 1.00\,\mathrm{A}$. Then $I_2 = 6.00 - 5.00 \times 1.00 = 1.00\,\mathrm{A}$, and $I_1 = 2.00\,\mathrm{A}$.

All three came out positive, so every arrow was drawn in the true direction. Current leaves the positive terminal of the $12.0\,\mathrm{V}$ battery: that battery is discharging, and its chemical power is $\mathcal{E}_1 I_1 = 24.0\,\mathrm{W}$. Current enters the positive terminal of the $6.00\,\mathrm{V}$ battery: that battery is being charged, and it absorbs $\mathcal{E}_2 I_2 = 6.00\,\mathrm{W}$. The resistors dissipate

$$
I_1^2 R_1 + I_{\mathrm{m}}^2 R_2 + I_2^2 R_3 = (2.00)^2(2.00) + (1.00)^2(8.00) + (1.00)^2(2.00) = 18.0\,\mathrm{W}.
$$

Power out of the discharging battery equals power into the charging battery plus power into the resistors: $24.0 = 6.00 + 18.0$. Had $I_2$ come out negative, the right-hand battery would have been discharging as well, and the arrow on that branch would be reversed before the powers were given signs.
:::
:::

::: warning The loop rule and a changing magnetic flux
[[#thm-loop]] uses a conservative electric field. A changing magnetic flux through the loop produces a non-conservative electric field, and the sum of the electrostatic potential changes is then no longer the whole story. The induced emf of [[magnetism/faraday]] has to be added to the loop equation. The junction rule survives that generalisation, because it is charge conservation and does not care whether the field is conservative. Do not apply the loop rule, as stated in this chapter, to a loop whose flux is changing.
:::

The same warning covers a practical limit of the lumped model. If the currents vary so fast that the circuit is no longer small compared with a wavelength, or if a coil is present and its flux is not negligible, the circuit has left the hypotheses of [[#thm-loop]]. Inductors are treated in [[magnetism/inductance]], with the loop rule restored in an enlarged form.

## Terminal voltage and electrical power

A real battery is not an ideal jump of potential. Its electrodes and electrolyte have resistance, and that resistance carries the same current as the external circuit.

::: definition Internal resistance and terminal voltage {#def-terminal}
A real battery is modelled as an ideal emf $\mathcal{E}$ in series with an **internal resistance** $r$. The **terminal voltage** is the potential difference between the terminals of that combination. When the battery is discharging, with current $I$ leaving the positive terminal,

$$
V_{\mathrm{t}} = \mathcal{E} - Ir.
$$ {#eq-terminal}
:::

The drop $Ir$ is an Ohm drop inside the battery, written with [[#prop-signs]]. If the battery is being charged, the current enters the positive terminal, the traversal that goes from negative to positive inside the battery is against the current in $r$, and the terminal voltage is $V_{\mathrm{t}} = \mathcal{E} + Ir$. The terminal voltage of a discharging battery lies below the emf. The terminal voltage of a battery under charge lies above it. An open circuit has $I = 0$, so a voltmeter on an idle battery reads $\mathcal{E}$, not $V_{\mathrm{t}}$ under load.

::: proposition Power balance for a battery {#prop-power}
While a battery of emf $\mathcal{E}$ and internal resistance $r$ discharges through an external circuit, with current $I$ leaving the positive terminal, the chemical power, the internal heating and the power delivered at the terminals are related by

$$
\mathcal{E} I = I^2 r + I V_{\mathrm{t}}.
$$ {#eq-power-balance}

The chemical agency supplies $\mathcal{E} I$. Of that, $I^2 r$ heats the interior, and $I V_{\mathrm{t}}$ is handed to the external circuit.
:::

::: proof
Multiply [[#eq-terminal]] by the positive discharge current $I$. The left-hand side is $I V_{\mathrm{t}}$ and the right-hand side is $\mathcal{E} I - I^2 r$. Rearrangement is [[#eq-power-balance]]. Each term is a power. $\mathcal{E} I$ is the work per unit time done by the non-electrostatic agency on the charges that cross the battery, since each coulomb receives energy $\mathcal{E}$. The term $I^2 r$ is the Ohmic heating in the internal resistance, the same $I^2 R$ that a resistor produces. Their difference is what remains at the terminals.
:::

The external resistor $R$ in a single-loop circuit then satisfies $V_{\mathrm{t}} = IR$ and $I = \mathcal{E}/(R + r)$. The fraction of the chemical power that reaches the load is $R/(R + r)$. The rest is spent inside the battery.

::: example A battery with internal resistance {#ex-battery}
A battery of emf $12.0\,\mathrm{V}$ and internal resistance $0.50\,\Omega$ is connected to an external resistor of $5.50\,\Omega$. Find the current, the terminal voltage, and the three powers in the balance of [[#prop-power]].
::: solution
The resistors are in series, so

$$
I = \frac{12.0}{0.50 + 5.50} = \frac{12.0}{6.00} = 2.00\,\mathrm{A}.
$$

The terminal voltage is $V_{\mathrm{t}} = 12.0 - (2.00)(0.50) = 11.0\,\mathrm{V}$, which is also $I \times 5.50 = 11.0\,\mathrm{V}$. The chemical power is $\mathcal{E} I = 12.0 \times 2.00 = 24.0\,\mathrm{W}$. The internal resistance dissipates $I^2 r = (2.00)^2(0.50) = 2.0\,\mathrm{W}$. The external resistor dissipates $I^2 R = (2.00)^2(5.50) = 22.0\,\mathrm{W}$. Then $24.0 = 2.0 + 22.0$, in agreement with [[#eq-power-balance]]. The fraction of the chemical power that reaches the load is $22.0/24.0 = 11/12 = 0.917$.
:::
:::

The load that draws the most power is not the load that uses the battery most efficiently. Let the external resistance be a variable $R$, with $r$ and $\mathcal{E}$ fixed. The current is $I = \mathcal{E}/(R + r)$ and the external power is

$$
P(R) = I^2 R = \mathcal{E}^2 \frac{R}{(R + r)^2}.
$$ {#eq-pr}

Differentiate with respect to $R$. The numerator of $P'(R)$, up to the positive factor $\mathcal{E}^2$, is $(R + r)^2 - R \cdot 2(R + r) = (R + r)(r - R)$. So $P'(R)$ is positive for $R < r$, zero at $R = r$, and negative for $R > r$. The maximum lies at $R = r$, and its value is

$$
P_{\max} = \frac{\mathcal{E}^2}{4r}.
$$ {#eq-pmax}

At that point the efficiency $R/(R + r)$ is only one half: the load and the interior dissipate equally. For the battery of [[#ex-battery]], $P_{\max} = (12.0)^2/(4 \times 0.50) = 72.0\,\mathrm{W}$, at $R = 0.50\,\Omega$. The $5.50\,\Omega$ load draws only $22.0\,\mathrm{W}$, and it does so without heating the interior at the same rate. Matched-load transfer suits a weak signal. It is a poor way to run a battery.

## Charging and discharging a capacitor

A capacitor in series with a resistor and a battery draws no current once the capacitor voltage has risen to the emf. The interesting behaviour is the approach to that state. The current is not steady, so [[#def-steady]] does not apply to the capacitor plates: charge accumulates there on purpose. It does apply to every ordinary node of the connecting wires. Along a single series loop the wire current has one value, and that value equals the rate of change of the charge on the positive plate.

We keep [[#thm-loop]], which means we continue to neglect changing magnetic flux. A real charging pulse does produce a small magnetic field. The lumped $RC$ model is the approximation in which the induced electric field from that pulse is negligible beside the battery and the Ohm drops. The warning of this chapter is the boundary of that approximation.

::: definition Time constant {#def-tau}
The **time constant** of a series combination of a resistance $R$ and a capacitance $C$ is

$$
\tau = RC.
$$ {#eq-tau}

Its SI unit is the second: an ohm is a volt per ampere and a farad is a coulomb per volt, so $RC$ has the unit $\mathrm{C/A} = \mathrm{s}$.
:::

::: theorem Charging a capacitor {#thm-charge}
A series circuit contains an ideal battery of emf $\mathcal{E}$, a resistor $R$ and an uncharged capacitor $C$. The charge on the positive plate and the charging current are

$$
Q(t) = C\mathcal{E}\left(1 - e^{-t/(RC)}\right), \qquad I(t) = \frac{\mathcal{E}}{R}\, e^{-t/(RC)},
$$ {#eq-charge}

for $t \ge 0$, with the current in the direction that increases $Q$.
:::

::: proof
Traverse the loop from the negative terminal, through the battery, through the resistor, and onto the positive plate. [[#prop-signs]] and the capacitor relation $V_C = Q/C$ give

$$
\mathcal{E} - IR - \frac{Q}{C} = 0.
$$ {#eq-rc-loop}

In this series loop the current that passes through the resistor is the current that arrives at the positive plate, so $I = \mathrm{d}Q/\mathrm{d}t$. Substitute that into [[#eq-rc-loop]] and rearrange:

$$
R\frac{\mathrm{d}Q}{\mathrm{d}t} = \mathcal{E} - \frac{Q}{C} = \frac{C\mathcal{E} - Q}{C},
$$

hence

$$
\frac{\mathrm{d}Q}{C\mathcal{E} - Q} = \frac{\mathrm{d}t}{RC}.
$$

Integrate from charge $0$ at time $0$ to charge $Q$ at time $t$. The left-hand side is $-\ln(C\mathcal{E} - Q) + \ln(C\mathcal{E})$, so

$$
\ln\frac{C\mathcal{E}}{C\mathcal{E} - Q} = \frac{t}{RC}.
$$

Exponentiate and solve for $Q$:

$$
Q(t) = C\mathcal{E}\left(1 - e^{-t/(RC)}\right).
$$

Differentiate, using $I = \mathrm{d}Q/\mathrm{d}t$, to obtain the current in [[#eq-charge]]. At $t = 0$ the charge vanishes and $I = \mathcal{E}/R$. As $t \to \infty$ the charge tends to $C\mathcal{E}$ and the current tends to zero, which is the steady state the junction and loop rules would have given if the capacitor had been treated as an open circuit from the start.
:::

The time constant is the time the charge would need to reach $C\mathcal{E}$ if the initial current $\mathcal{E}/R$ never fell. It does fall, so at $t = \tau$ the charge has reached only the fraction $1 - e^{-1}$ of its final value. That fraction is about $0.632$. The remaining fraction of the gap is always $e^{-t/\tau}$, so each further interval of length $\tau$ multiplies the gap by $1/e$.

::: corollary Discharging a capacitor {#cor-discharge}
If the battery is removed and the capacitor, carrying charge $Q_0$ at $t = 0$, is closed through the resistor $R$ alone, then

$$
Q(t) = Q_0 e^{-t/(RC)}, \qquad I_{\mathrm{dis}}(t) = \frac{Q_0}{RC}\, e^{-t/(RC)},
$$ {#eq-discharge}

where $I_{\mathrm{dis}}$ is the positive current leaving the positive plate.
:::

::: proof
With the battery absent, [[#eq-rc-loop]] becomes $0 = I_{\mathrm{dis}} R - Q/C$ if $I_{\mathrm{dis}}$ is taken positive in the direction that reduces $Q$. Thus $I_{\mathrm{dis}} = Q/(RC)$ and $\mathrm{d}Q/\mathrm{d}t = -Q/(RC)$. Separate variables: $\mathrm{d}Q/Q = -\mathrm{d}t/(RC)$. Integrate from $Q_0$ at time $0$ to $Q$ at time $t$ to get $\ln(Q/Q_0) = -t/(RC)$, which is the charge in [[#eq-discharge]]. The current is $Q/(RC)$.
:::

The discharge is the same exponential as the charging current, up to a constant factor. The charge falls to $Q_0/e$ in one time constant, and to $Q_0/2$ in $t_{1/2} = \tau \ln 2$, which is about $0.693\,\tau$. Neither time depends on $Q_0$. A larger capacitor or a larger resistor slows both processes in proportion, which is what $\tau = RC$ says.

::: example One time constant of a slow charge {#ex-rc}
A resistor $R = 2.00 \times 10^{5}\,\Omega$ and a capacitor $C = 5.00\,\mu\mathrm{F}$ are connected in series with an ideal battery of emf $10.0\,\mathrm{V}$. The capacitor is uncharged at $t = 0$. Find the time constant, the charge and the current at $t = 1.00\,\mathrm{s}$, and the energy stored after a long time.
::: solution
The time constant is $\tau = RC = (2.00 \times 10^{5})(5.00 \times 10^{-6}) = 1.00\,\mathrm{s}$. The final charge is $Q_{\mathrm{f}} = C\mathcal{E} = (5.00 \times 10^{-6})(10.0) = 5.00 \times 10^{-5}\,\mathrm{C} = 50.0\,\mu\mathrm{C}$. At $t = \tau$,

$$
\frac{Q}{Q_{\mathrm{f}}} = 1 - e^{-1} = 0.63212\ldots = 0.632
$$

to three significant figures, so $Q(1.00\,\mathrm{s}) = 0.632 \times 50.0\,\mu\mathrm{C} = 31.6\,\mu\mathrm{C}$. The initial current is $\mathcal{E}/R = 10.0/(2.00 \times 10^{5}) = 5.00 \times 10^{-5}\,\mathrm{A} = 50.0\,\mu\mathrm{A}$. At $t = \tau$ the current has fallen by the factor $e^{-1} = 0.36788\ldots$, so $I = 18.4\,\mu\mathrm{A}$. The stored energy after a long time is

$$
U_{\mathrm{f}} = \tfrac12 C\mathcal{E}^2 = \tfrac12 (5.00 \times 10^{-6})(10.0)^2 = 2.50 \times 10^{-4}\,\mathrm{J}.
$$

At $t = \tau$ the energy is a fraction $(1 - e^{-1})^2 = 0.3996$ of $U_{\mathrm{f}}$, which is $9.99 \times 10^{-5}\,\mathrm{J}$. The charge is already past half its final value, but the energy, being quadratic in the charge, is still a little under two fifths of its final value.
:::
:::

During the whole charge the battery pushes a total charge $Q_{\mathrm{f}} = C\mathcal{E}$ through a potential difference $\mathcal{E}$, so it supplies energy $C\mathcal{E}^2$. Only half of that ends on the capacitor. The other half heats the resistor, and the split does not depend on $R$. A larger $R$ makes the charge slower and the current smaller, and those two changes cancel in the integrated heat.

::: proposition Energy split while charging {#prop-energy}
In the circuit of [[#thm-charge]], the energy supplied by the battery from $t = 0$ to $t = \infty$ is $C\mathcal{E}^2$. Half of it is stored on the capacitor and half is dissipated in the resistor. The split is independent of $R$.
:::

::: proof
Multiply the loop equation [[#eq-rc-loop]] by the current $I$:

$$
\mathcal{E} I = I^2 R + \frac{Q}{C} I.
$$

The left-hand side is the instantaneous power of the battery. The first term on the right is the instantaneous heating of the resistor. The second is the power into the capacitor, because $I = \mathrm{d}Q/\mathrm{d}t$ and the capacitor's stored energy $\tfrac12 Q^2/C$ has derivative $(Q/C)\,\mathrm{d}Q/\mathrm{d}t$. Integrate from $t = 0$ to $t = \infty$. The battery contributes $\mathcal{E}$ times the total charge that passes, which is $\mathcal{E} \cdot C\mathcal{E} = C\mathcal{E}^2$. The capacitor contributes

$$
\int_0^{Q_{\mathrm{f}}} \frac{Q}{C}\,\mathrm{d}Q = \frac{Q_{\mathrm{f}}^2}{2C} = \tfrac12 C\mathcal{E}^2.
$$

The resistor receives what is left, $\tfrac12 C\mathcal{E}^2$. The resistance cancelled when the loop equation was multiplied by $I$ and the limits were taken to completion, so the totals do not depend on $R$. The cancellation assumes that the charge does eventually reach $C\mathcal{E}$, which it does for every finite $R > 0$.
:::

On discharge the battery is gone. The energy $\tfrac12 Q_0^2/C$ leaves the capacitor and, by the same multiplication of the loop equation, all of it is dissipated in the resistor. There is no second place for it to go.

::: widget plot
f: exp(-x); 1-exp(-x)
x: 0, 5
labels: discharge; charge
caption: The horizontal axis is time in units of the time constant, $x = t/\tau$. The falling curve is both the discharge charge as a fraction of $Q_0$ and the charging current as a fraction of $\mathcal{E}/R$. The rising curve is the charging charge as a fraction of $C\mathcal{E}$. Their sum is $1$ at every $x$. At $x = 1$ the rising curve is at $1 - e^{-1} \approx 0.632$ and the falling curve is at $e^{-1} \approx 0.368$. Both curves move on the scale of the time constant: a different $R$ or $C$ stretches the clock, and it does not change this plot.
:::

::: quiz
A capacitor is charging from a battery through a resistor. A long time after the switch is closed, the current in the resistor is
- [ ] $\mathcal{E}/R$, because Ohm's law still applies to the resistor
- [ ] $\mathcal{E}/(2R)$, because half the energy is dissipated in the resistor
- [x] essentially zero, because the capacitor voltage has risen to the battery emf and the loop rule leaves no drop for the resistor
- [ ] reversed, because a charged capacitor always drives current backward through the battery
::: solution
[[#eq-charge]] sends $I(t)$ to zero as $t$ grows, since the exponential decays. The loop equation $\mathcal{E} - IR - Q/C = 0$ reaches $Q = C\mathcal{E}$ only if $I = 0$. Ohm's law still relates the current to the drop across the resistor; that drop itself has vanished. The factor of one half in [[#prop-energy]] is about the integrated energy, not about a steady current. The current does not reverse during a charge through a single resistor: $I(t)$ stays non-negative.
:::
:::

::: intuition What is left is what sets the rate
While charging, the current is proportional to the gap $C\mathcal{E} - Q$ still to be filled. While discharging, the current is proportional to the charge still present. Either way the rate of change is proportional to the distance from the equilibrium, with proportionality constant $1/\tau$. The exponential is the function with exactly that property. The plot against $t/\tau$ is therefore universal: every series $RC$ circuit is the same curve, read on a clock whose unit is its own time constant.
:::

## Where this leads

An inductor adds a potential difference $L\,\mathrm{d}I/\mathrm{d}t$ to the loop rule. The junction rule is unchanged, and the circuit becomes the $RL$ and $LC$ transients of [[magnetism/inductance]]. Driven by an oscillating source, the same two rules are the circuit laws of [[magnetism/ac-circuits]], now applied to amplitudes and phases rather than to constants. The moment a magnetic flux through a loop changes with time, [[#thm-loop]] as written here is incomplete, and the missing term is the induced emf of [[magnetism/faraday]].

::: history Kirchhoff's two rules
Gustav Kirchhoff published the junction and loop rules in 1845, while he was a student at the University of Königsberg, extending Ohm's law from a single conductor to a network. The junction rule is charge conservation at a node. The loop rule is the statement that the electrostatic potential is single-valued. Both are still the organising method of a direct-current circuit. The limitation recorded in the warning of this chapter, that a changing magnetic flux adds a non-conservative electric field, was not part of that 1845 theory; it belongs to Faraday's induction.
:::

::: summary
- The equivalent resistance of a series chain is the sum of the resistances. For resistors in parallel, the reciprocals add.
- A mixed network of pure series and parallel groups can be collapsed from the inside. A bridge cross-link cannot, and needs the junction and loop rules.
- In the steady state the algebraic sum of currents at a node is zero. One node equation is redundant.
- Around a closed loop the signed potential changes sum to zero, provided the electric field is conservative. Across a resistor with the current, $\Delta V = -IR$. Across an ideal battery from negative to positive, $\Delta V = +\mathcal{E}$.
- A negative solution means the current is opposite the assumed arrow. Power balance is the check.
- A discharging battery has terminal voltage $\mathcal{E} - Ir$. The chemical power $\mathcal{E} I$ splits into internal heating $I^2 r$ and power $IV_{\mathrm{t}}$ delivered outside. External power is greatest at $R = r$, where the efficiency is only one half.
- A series $RC$ circuit charges as $Q = C\mathcal{E}(1 - e^{-t/\tau})$ and discharges as $Q = Q_0 e^{-t/\tau}$, with $\tau = RC$. Half the energy supplied by the battery is stored and half is dissipated, independently of $R$.
:::

## Exercises

::: exercise A series chain {#exr-series level=1 check="1"}
Resistors of $4.00\,\Omega$, $5.00\,\Omega$ and $6.00\,\Omega$ are connected in series to an ideal battery of $15.0\,\mathrm{V}$. Find the current in the chain, in amperes.
::: solution
[[#thm-series]] gives $R_{\mathrm{eq}} = 4.00 + 5.00 + 6.00 = 15.0\,\Omega$. The current is $I = 15.0/15.0 = 1.00\,\mathrm{A}$. The potential differences across the three resistors are $4.00\,\mathrm{V}$, $5.00\,\mathrm{V}$ and $6.00\,\mathrm{V}$, and the powers are $4.00\,\mathrm{W}$, $5.00\,\mathrm{W}$ and $6.00\,\mathrm{W}$, summing to the battery power $15.0\,\mathrm{W}$.
:::
:::

::: exercise Three resistors in parallel {#exr-parallel level=1 check="2"}
Find the equivalent resistance, in ohms, of $4.00\,\Omega$, $6.00\,\Omega$ and $12.0\,\Omega$ connected in parallel.
::: solution
[[#eq-parallel]] gives

$$
\frac{1}{R_{\mathrm{eq}}} = \frac{1}{4.00} + \frac{1}{6.00} + \frac{1}{12.0} = 0.250 + 0.1667 + 0.0833 = 0.500\,\Omega^{-1}.
$$

Hence $R_{\mathrm{eq}} = 2.00\,\Omega$. The $4.00\,\Omega$ resistor, the smallest of the three, will carry half of whatever total current the combination draws, because its conductance is half of $0.500\,\Omega^{-1}$.
:::
:::

::: exercise Terminal voltage under load {#exr-terminal level=1 check="14"}
A battery of emf $18.0\,\mathrm{V}$ and internal resistance $2.00\,\Omega$ is connected to an external resistor of $7.00\,\Omega$. Find the terminal voltage, in volts.
::: solution
The current is $I = 18.0/(2.00 + 7.00) = 18.0/9.00 = 2.00\,\mathrm{A}$. [[#eq-terminal]] gives $V_{\mathrm{t}} = 18.0 - (2.00)(2.00) = 14.0\,\mathrm{V}$. The same number is $I \times 7.00 = 14.0\,\mathrm{V}$. The chemical power is $36.0\,\mathrm{W}$, the interior dissipates $8.00\,\mathrm{W}$, and the load receives $28.0\,\mathrm{W}$.
:::
:::

::: exercise Power in the series resistor {#exr-split level=2 check="24"}
An ideal $24.0\,\mathrm{V}$ battery is connected to a $6.00\,\Omega$ resistor in series with a parallel pair of $12.0\,\Omega$ resistors. Find the power dissipated in the $6.00\,\Omega$ resistor, in watts.
::: solution
The parallel pair has $R_{\parallel} = 12.0/2 = 6.00\,\Omega$. In series with the other $6.00\,\Omega$ the total is $12.0\,\Omega$, so the battery current is $I = 24.0/12.0 = 2.00\,\mathrm{A}$. That entire current passes through the series resistor, which dissipates $I^2 R = (2.00)^2(6.00) = 24.0\,\mathrm{W}$. Each parallel resistor feels $I R_{\parallel} = 12.0\,\mathrm{V}$ and carries $1.00\,\mathrm{A}$, dissipating $12.0\,\mathrm{W}$. The three powers sum to $48.0\,\mathrm{W}$, equal to $\mathcal{E} I$.
:::
:::

::: exercise A second two-loop circuit {#exr-twoloop level=2 check="1"}
Three branches join a top node to a bottom node. The left branch is an ideal $10.0\,\mathrm{V}$ battery, positive terminal at the top, in series with $2.00\,\Omega$. The middle branch is $6.00\,\Omega$. The right branch is an ideal $4.00\,\mathrm{V}$ battery, positive terminal at the top, in series with $2.00\,\Omega$. Take the left-branch current upward, the right-branch current downward, and the middle current downward. Find the middle current, in amperes.
::: hint
Write the top junction first, then one clockwise equation for each mesh, using [[#prop-signs]]. Add the two loop equations after the junction has been substituted, so that one unknown drops out.
:::
::: solution
Let the three currents be $I_1$ upward on the left, $I_2$ downward on the right, and $I_{\mathrm{m}}$ downward in the middle. The junction says $I_1 = I_{\mathrm{m}} + I_2$. The left loop, clockwise, gives $10.0 - 2.00\, I_1 - 6.00\, I_{\mathrm{m}} = 0$. The right loop, clockwise, gives $6.00\, I_{\mathrm{m}} - 2.00\, I_2 - 4.00 = 0$. Substitute the junction into the left equation: $10.0 - 2.00(I_{\mathrm{m}} + I_2) - 6.00\, I_{\mathrm{m}} = 0$, so $8.00\, I_{\mathrm{m}} + 2.00\, I_2 = 10.0$. The right equation is $6.00\, I_{\mathrm{m}} - 2.00\, I_2 = 4.00$. Add them: $14.0\, I_{\mathrm{m}} = 14.0$, hence $I_{\mathrm{m}} = 1.00\,\mathrm{A}$. Then $6.00 - 2.00\, I_2 = 4.00$, so $I_2 = 1.00\,\mathrm{A}$, and $I_1 = 2.00\,\mathrm{A}$.

The $10.0\,\mathrm{V}$ battery discharges and supplies $20.0\,\mathrm{W}$. The $4.00\,\mathrm{V}$ battery is charged and absorbs $4.00\,\mathrm{W}$. The resistors dissipate $(2.00)^2(2.00) + (1.00)^2(6.00) + (1.00)^2(2.00) = 16.0\,\mathrm{W}$. Then $20.0 = 4.00 + 16.0$.
:::
:::

::: exercise A capacitor as an open circuit {#exr-open level=2 check="8"}
An ideal battery of $12.0\,\mathrm{V}$ is connected to a $3.00\,\Omega$ resistor in series with a parallel combination of a $6.00\,\Omega$ resistor and a capacitor. The circuit has been closed for a long time. Find the potential difference across the capacitor, in volts.
::: solution
After a long time the charging current has vanished, by [[#thm-charge]] adapted to this network: the capacitor branch carries no steady current, so the capacitor behaves as an open circuit. The battery, the $3.00\,\Omega$ resistor and the $6.00\,\Omega$ resistor are then a single series loop. The current is $12.0/(3.00 + 6.00) = 1.333\ldots\,\mathrm{A}$. The potential difference across the $6.00\,\Omega$ resistor is $(12.0/9.00) \times 6.00 = 8.00\,\mathrm{V}$. The capacitor is in parallel with that resistor, so its potential difference is $8.00\,\mathrm{V}$, not the full battery emf. The $3.00\,\Omega$ resistor holds the other $4.00\,\mathrm{V}$.
:::
:::

::: exercise Where the charging energy goes {#exr-energy level=3}
A series $RC$ circuit with an ideal battery of emf $\mathcal{E}$ charges from $Q = 0$ to $Q = C\mathcal{E}$. Prove that the energy dissipated in the resistor equals the energy stored on the capacitor, and that both are independent of $R$.
::: hint
Start from the loop equation $\mathcal{E} - IR - Q/C = 0$, multiply through by $I$, and integrate from the start of the charge to its completion. Use $I\,\mathrm{d}t = \mathrm{d}Q$.
:::
::: solution
The loop rule gives $\mathcal{E} = IR + Q/C$ at every instant, with $I = \mathrm{d}Q/\mathrm{d}t$. Multiply by $I$:

$$
\mathcal{E} I = I^2 R + \frac{Q}{C}\frac{\mathrm{d}Q}{\mathrm{d}t}.
$$

Integrate in time from $0$ to $\infty$. The left-hand side is $\mathcal{E}$ times the total charge delivered, $\mathcal{E} \cdot C\mathcal{E} = C\mathcal{E}^2$. The second term on the right is

$$
\int_0^{C\mathcal{E}} \frac{Q}{C}\,\mathrm{d}Q = \tfrac12 C\mathcal{E}^2,
$$

which is the energy stored on the capacitor. The integral of $I^2 R$ is therefore the difference, $\tfrac12 C\mathcal{E}^2$. The value of $R$ does not appear in either total. It affects how long the process takes and how large the current is at each moment, but the completed integrals depend only on the end states. The hypothesis that the upper limit really is $t = \infty$ with $Q = C\mathcal{E}$ uses $R$ finite and positive, so that the exponential in [[#eq-charge]] does finish its decay.
:::
:::

::: exercise The load that draws the most power {#exr-pmax level=3 check="72"}
A battery has emf $\mathcal{E}$ and internal resistance $r$, and it drives a single external resistor $R$. Show that the power in $R$ is greatest when $R = r$, and find that greatest power, in watts, for $\mathcal{E} = 12.0\,\mathrm{V}$ and $r = 0.50\,\Omega$.
::: hint
Write $P(R) = \mathcal{E}^2 R/(R + r)^2$ and differentiate. The sign of $P'(R)$ on either side of $R = r$ decides whether the stationary point is a maximum.
:::
::: solution
The current is $I = \mathcal{E}/(R + r)$, so the external power is $P(R) = \mathcal{E}^2 R/(R + r)^2$, as in [[#eq-pr]]. Differentiate by the quotient rule. Up to the positive factor $\mathcal{E}^2$, the derivative has numerator $(R + r)^2 - 2R(R + r) = (R + r)(r - R)$ and a positive denominator. Thus $P'(R) > 0$ when $R < r$, $P'(R) = 0$ when $R = r$, and $P'(R) < 0$ when $R > r$. The stationary point is a maximum. Substituting $R = r$ gives $P_{\max} = \mathcal{E}^2/(4r)$. For the stated battery,

$$
P_{\max} = \frac{(12.0)^2}{4 \times 0.50} = \frac{144}{2.00} = 72.0\,\mathrm{W}.
$$

At that load the current is $\mathcal{E}/(2r) = 12.0\,\mathrm{A}$, and the internal heating $I^2 r$ is also $72.0\,\mathrm{W}$. Half the chemical power stays inside the battery.
:::
:::
