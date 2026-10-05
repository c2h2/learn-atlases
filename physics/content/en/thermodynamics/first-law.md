Hold a finger over the outlet of a bicycle pump and push the plunger. The barrel warms. Leave a hot sealed flask on the bench and the air inside cools, though nobody moved a piston. In [[mechanics/work-energy]] the work of the net force on a particle equals $\Delta K$. A gas at rest in a cylinder has no bulk kinetic energy in that ledger, and it can still be warmed by a push or cooled by the room.

The quantity that keeps the account is the **internal energy** $U$. The **first law** says how $U$ changes. Heat $Q$ absorbed by the system and work $W$ done on the system both count, and they count with the same sign:

$$
\Delta U = Q + W.
$$

Work done on the system is positive, and this chapter does not switch. A compression, volume falling, does positive work on the gas. Many engineering texts write $\Delta U = Q - W$ with $W$ the work done *by* the system. Their $W$ is the negative of ours, and copying an adiabat formula across that minus sign reverses every compression.

$W_{\mathrm{net}} = \Delta K$ is still the work done *by* the net force on a particle. Here the energy that changes is $U$, not the kinetic energy of the centre of mass, and $W$ is the work done *on* the gas. A hand pushing a piston does positive first-law work on the gas. The gas, pushing back, does positive mechanical work on the piston. One force pair, two ends.

The states themselves are the equilibrium states of [[thermodynamics/temperature]]. For an ideal gas, $PV = nRT$ with $T$ in kelvin. What this chapter adds is the path between states: how much of $\Delta U$ arrived as heat, and how much as work.

## Work of a volume change

Draw the boundary so that every transfer you mean to count crosses it. For a gas in a cylinder the natural boundary is the inner face of the piston and the walls. A moving piston does work, a conducting wall passes heat, and a shaft that stirs the gas does work of its own. We start with the piston.

A process is **quasi-static** when the system passes through equilibrium states, so $P$ and $T$ exist at every stage. It is **reversible** when it is also free of friction and of every other dissipation, so that both system and surroundings can be restored. Quasi-static does not imply reversible: a piston creeping against friction can leave the gas with a single $P(t)$ while the return stroke fails to undo the surroundings. The adiabat $PV^{\gamma} = \text{constant}$ needs the reversible case. The first law does not. $\Delta U = Q + W$ still balances an irreversible process, once $Q$ and $W$ are the actual transfers at the boundary.

::: lemma Work on a gas by a slow piston {#lem-piston}
Let a gas be confined by a piston of area $A$. Let the pressure at the inner face be uniform and equal to $P$, and let the external agent move the piston so slowly that this $P$ is the equilibrium pressure of the gas. If the volume of the gas changes by $\dd V$, the work done **on** the gas is

$$
\delta W = -P\,\dd V.
$$

::: proof
The force exerted *on the gas* by the piston has magnitude $PA$ and is directed into the cylinder. Take the inward normal as the positive direction for this force. An outward displacement of the piston increases the volume of the gas. If the piston moves outward by a distance $\dd x > 0$, then $\dd V = A\,\dd x > 0$, and the point of application of the inward force moves *against* the force. The work done on the gas by that force is

$$
\delta W = -(PA)\,\dd x = -P\,(A\,\dd x) = -P\,\dd V.
$$

If the piston moves inward, $\dd x < 0$ in the outward coordinate, so $\dd V < 0$. Then $-P\,\dd V > 0$: the inward force and the inward displacement agree, and the work on the gas is positive. Integrating over a finite quasi-static path gives $W = -\int P\,\dd V$. The pressure inside the integral is the gas pressure only because the process was slow enough for mechanical equilibrium at the piston. A finite pressure difference would accelerate the piston, and the work on the gas would be computed from the external pressure at the boundary instead.
:::
:::

::: definition Work of a volume change {#def-work}
If the only work crossing the boundary is the work of an external pressure $P_{\mathrm{ext}}$ pushing on a moving face, the work done on the system is

$$
W = -\int P_{\mathrm{ext}}\,\dd V.
$$ {#eq-work-ext}

When the process is quasi-static, $P_{\mathrm{ext}} = P$ at each stage, and

$$
W = -\int P\,\dd V,
$$ {#eq-work}

with $P$ the pressure of the system. The integral follows the path. It is not a difference of a function of the endpoints alone: two paths from the same initial state to the same final state can enclose different areas under $P$ against $V$, and they do different work.
:::

The minus sign is the convention. [[#lem-piston]] is that choice written in $P$ and $V$. In a free expansion into vacuum, either $P_{\mathrm{ext}} = 0$ or the outer boundary of the whole apparatus does not move, and either way $W = 0$. Do not insert the initial gas pressure into [[#eq-work]]: the expansion is not quasi-static, and there is no single $P$ along the way.

Shaft work and electrical work are allowed by the first law and are not given by [[#eq-work]]. In every case $W$ is the sum at the boundary. The standard processes below use expansion work only.

## Internal energy and the first law

Heat, like work, is a transfer, not a state. [[thermodynamics/temperature]] already wrote $\delta Q$ for heat absorbed by the system and defined a heat capacity only along a path. The experimental fact that turns these transfers into a state function is an observation about adiabatic processes, in which $Q = 0$ by insulation or by the speed of the process.

Join two equilibrium states by several adiabatic paths: a piston, a paddle, a falling weight. For a closed system the work done on the system depends on the endpoints and not on which adiabatic path was used. That experimental fact, which Joule's measurements of the 1840s established, licenses the definition of $U$.

::: definition Internal energy {#def-internal}
Fix an equilibrium reference state $0$ and set $U(0)$ to any convenient constant, often zero. For any other equilibrium state $1$, let $U(1) - U(0)$ be the work done on the system along any adiabatic process from $0$ to $1$. The agreement of those adiabatic works is what makes $U(1)$ a property of the state alone. $U$ is the **internal energy**. Its SI unit is the joule. Differences $\Delta U$ are what the laws determine; the additive constant never appears in a first-law balance.
:::

If the process from $1$ to $2$ is not adiabatic, the work $W$ no longer equals $U(2) - U(1)$. The difference is filled by heat.

::: theorem First law {#thm-first}
There is a state function $U$, the internal energy, such that for any process joining two equilibrium states of a closed system,

$$
\Delta U = Q + W,
$$ {#eq-first}

where $Q$ is the heat absorbed by the system and $W$ is the work done on the system. For a quasi-static process whose only work is expansion work,

$$
\dd U = \delta Q - P\,\dd V.
$$ {#eq-first-diff}

::: proof
Define $U$ by adiabatic work, as in [[#def-internal]]. The experimental premise is that this work is path-independent among adiabatic paths, so $U$ is well defined on equilibrium states up to the single constant $U(0)$.

Now let the process from state $1$ to state $2$ be arbitrary, with measured work $W$ done on the system. Define

$$
Q = \bigl(U(2) - U(1)\bigr) - W = \Delta U - W.
$$

Rearrangement is [[#eq-first]]. This step is the definition of $Q$ once $U$ exists. The physical content beyond the definition is twofold. First, adiabatic work really is path-independent, so there is a $U$ to subtract. Second, the $Q$ so defined matches the heat measured by calorimetry: the same rise of temperature of a water bath corresponds to the same energy, whether the bath was warmed by a paddle wheel or by a hotter body. That is the mechanical equivalent of heat. Without it, $Q$ would be only a remainder on a balance sheet.

For the differential form, restrict to a quasi-static process with expansion work only, so [[#eq-work]] gives $\delta W = -P\,\dd V$. Substitute into $\dd U = \delta Q + \delta W$. Paths that are not quasi-static still obey $\Delta U = Q + W$ between equilibrium endpoints. They do not entitle you to write $P$ for the system under the integral while the system has no single pressure.
:::
:::

$Q$ and $W$ are not state functions. Their sum is. A cycle has $\Delta U = 0$, so $Q = -W$: the heat absorbed equals the work done by the system. One step of a cycle does not have $\Delta U = 0$, and $Q = -W$ is then false. [[thermodynamics/heat-engines]] starts from the cycle, not from the step.

::: intuition Two doors, one room
Internal energy is the room. Heat and work are two doors. Two paths with the same endpoints have the same $\Delta U$ and need not have the same $Q$ or the same $W$. A running total of "heat inside the gas" is not a state function. The books balance only when the total is $U$.
:::

::: quiz
A gas is compressed by a piston. In the sign convention of [[#eq-first]], the work done on the gas is
- [ ] negative, because every textbook minus sign in $W = -\int P\,\dd V$ makes the whole integral negative
- [x] positive, because $\dd V < 0$ and $W = -\int P\,\dd V$
- [ ] zero, because the force on the piston is balanced by the force on the gas
- [ ] equal to $\Delta K$ of the gas, by the work–energy theorem
::: solution
During a compression $\dd V < 0$, so $-P\,\dd V > 0$. The minus sign in [[#eq-work]] converts an inward displacement into positive work on the gas. Equal-and-opposite forces do not make that work zero. [[mechanics/work-energy]] tracks bulk kinetic energy. The gas as a whole is barely moving; the energy that rises is $U$.
:::
:::

## Ideal gas: $U$ depends only on $T$

For a general substance $U$ may depend on $T$ and $V$ together. An ideal gas does not. Joule's test, descended from Gay-Lussac's expansion into vacuum, puts the gas and an evacuated vessel in one bath, with rigid outer walls. Opening the stopcock fills both vessels. For a dilute gas the bath temperature does not change, within the precision of the experiment.

Read that result with [[#eq-first]]. Draw the boundary around both vessels. The outer walls do not move, so $W = 0$. The arrangement is insulated from any heat flow you did not already include in the bath, and the bath itself does not change temperature, so $Q = 0$. Therefore $\Delta U = 0$. The gas has changed its volume and has not changed its temperature. A change of $V$ at fixed $T$ produced no change of $U$.

::: theorem Joule's law for the ideal gas {#thm-joule}
For a fixed amount of ideal gas the internal energy is a function of temperature alone,

$$
U = U(T), \qquad \left(\frac{\partial U}{\partial V}\right)_T = 0.
$$ {#eq-joule}

In any process, not only an isochoric one,

$$
\dd U = C_V\,\dd T,
$$

where $C_V = \dd U/\dd T$, provided $U$ depends on $T$ only. If $C_V$ is itself constant, then $\Delta U = C_V\,\Delta T$ between any two states, whatever the path.

::: proof
The free-expansion experiment gives a pair of states with $\Delta U = 0$ and $\Delta T = 0$ and $\Delta V \neq 0$. The ideal-gas model promotes that observation to the statement that $U$ is insensitive to $V$ at every temperature in the range of the model: $U(T, V) = U(T)$. Differentiating with respect to $V$ at fixed $T$ gives $(\partial U/\partial V)_T = 0$.

The heat capacity at constant volume was defined in [[thermodynamics/temperature]] by $C_V = (\delta Q/\dd T)_V$. On an isochore, $\dd V = 0$, so [[#eq-first-diff]] collapses to $\dd U = \delta Q$, and therefore $C_V = (\partial U/\partial T)_V$. Once $U = U(T)$, the partial derivative is an ordinary derivative, and $\dd U = C_V\,\dd T$ holds for a step in which $V$ changes as well as for a step in which it does not. Integrating with $C_V$ constant gives $\Delta U = C_V\,\Delta T$ on every path.

The experimental step is an idealisation of a null result. Real gases have a small Joule coefficient $(\partial T/\partial V)_U$, invisible in Joule's bath and visible in later work. It vanishes in the ideal-gas limit, which is the model used for the rest of this chapter. A free expansion is also irreversible. You may not replace $W = 0$ by $-\int P\,\dd V$ computed from the initial pressure: [[#eq-work]] requires a quasi-static path, and this process does not have one.
:::
:::

Equipartition, proved from the molecular model in [[thermodynamics/kinetic-theory]], supplies the function $U(T)$ when the gas is dilute and classical. Each quadratic term in the energy of a molecule contributes $\tfrac12 k_B T$ per molecule, or $\tfrac12 RT$ per mole. With $f$ such terms,

$$
U = \frac{f}{2} nRT, \qquad C_V = \frac{f}{2} nR,
$$ {#eq-equipart}

up to an additive constant in $U$ that we set to zero. A monatomic gas has three translational terms, so $f = 3$ and $C_V = \tfrac32 nR$. A diatomic gas at ordinary temperature adds two rotational terms, so $f = 5$ and $C_V = \tfrac52 nR$. The vibrational terms are not appreciably excited for the common diatomic gases at room temperature, and we do not include them. The ratio that will appear on adiabats is

$$
\gamma = \frac{C_P}{C_V}.
$$

We still need $C_P$ in terms of $C_V$.

## Mayer's relation

Heat at constant pressure and heat at constant volume differ by the work of expansion. For an ideal gas that difference is exactly $nR\,\Delta T$.

::: proposition Mayer's relation {#prop-mayer}
For a fixed amount of ideal gas, with $U = U(T)$,

$$
C_P - C_V = nR, \qquad c_P - c_V = R,
$$ {#eq-mayer}

where $c_P = C_P/n$ and $c_V = C_V/n$ are the molar heat capacities. If equipartition gives $C_V = (f/2)\,nR$, then

$$
C_P = \left(\frac{f}{2} + 1\right) nR, \qquad \gamma = 1 + \frac{2}{f}.
$$ {#eq-gamma-f}

In particular, a monatomic gas has $\gamma = 5/3$ and a diatomic gas at room temperature has $\gamma = 7/5 = 1.40$.

::: proof
Consider a quasi-static isobaric process. Then $\delta W = -P\,\dd V$ by [[#eq-work]]. For an ideal gas, $PV = nRT$ with $n$ fixed, so $P\,\dd V + V\,\dd P = nR\,\dd T$. On the isobar $\dd P = 0$, and $P\,\dd V = nR\,\dd T$. The work on the gas in an infinitesimal step is therefore $\delta W = -nR\,\dd T$.

[[#thm-joule]] gives $\dd U = C_V\,\dd T$ even though the volume is changing. The first law rearranges to $\delta Q = \dd U - \delta W$, so

$$
\delta Q = C_V\,\dd T - (-nR\,\dd T) = (C_V + nR)\,\dd T.
$$

By definition, along this same isobar, $\delta Q = C_P\,\dd T$. Compare the two expressions for $\delta Q$. They agree for every $\dd T$ only if $C_P = C_V + nR$. Divide by $n$ for the molar form.

Now impose [[#eq-equipart]]. Then $C_P = (f/2)\,nR + nR = (f/2 + 1)\,nR$, and

$$
\gamma = \frac{C_P}{C_V} = \frac{f/2 + 1}{f/2} = 1 + \frac{2}{f}.
$$

For $f = 3$, $\gamma = 1 + 2/3 = 5/3$. For $f = 5$, $\gamma = 1 + 2/5 = 7/5 = 1.40$. The identity $C_P - C_V = nR$ did not need equipartition. It needed $U = U(T)$ and $PV = nRT$. Equipartition is what assigns the integer $f$.
:::
:::

Two consequences are used constantly. First, $C_V = nR/(\gamma - 1)$ and $C_P = \gamma nR/(\gamma - 1)$, because $\gamma - 1 = nR/C_V$. Second, $\Delta U = C_V\,\Delta T$ on every path for an ideal gas with constant $C_V$, whereas $Q = C_V\,\Delta T$ only on an isochore and $Q = C_P\,\Delta T$ only on an isobar. Swapping those is the standard error, and the adiabat is where it hurts: there $Q = 0$ while $\Delta T$ is not.

The combination $U + PV$ will be called enthalpy in [[thermodynamics/potentials]]. We do not need the name. We do need the isobaric arithmetic that motivates it: $Q_P = \Delta U + P\,\Delta V$ when $P$ is constant, because $W = -P\,\Delta V$ and $Q = \Delta U - W$.

## Three paths with a simple integral

::: theorem Isochoric, isobaric and isothermal processes {#thm-three}
Let an ideal gas with constant $C_V$ pass quasi-statically between two equilibrium states, and let the only work be expansion work.

1. **Isochoric** ($\dd V = 0$). Then $W = 0$, $Q = \Delta U = C_V\,\Delta T$, and the pressure follows $P/T = \text{constant}$.
2. **Isobaric** ($\dd P = 0$). Then $W = -P\,\Delta V = -nR\,\Delta T$, $Q = C_P\,\Delta T$, and $\Delta U = C_V\,\Delta T$.
3. **Isothermal** ($\dd T = 0$). Then $\Delta U = 0$, and

$$
W = -nRT\ln\frac{V_2}{V_1}, \qquad Q = -W = nRT\ln\frac{V_2}{V_1}.
$$ {#eq-isothermal}

::: proof
On an isochore the boundary does not move, so [[#eq-work]] gives $W = 0$ whether or not you imagine a force on a locked piston. A locked piston exerts a force through zero displacement. [[#eq-first]] then says $Q = \Delta U$, and [[#thm-joule]] says $\Delta U = C_V\,\Delta T$. The pressure ratio is the isochore of [[thermodynamics/temperature]].

On an isobar, $P$ comes out of the integral: $W = -P(V_2 - V_1) = -P\,\Delta V$. For the ideal gas $P\,\Delta V = nR\,\Delta T$ because $PV = nRT$ at both ends and $P$ is the same, so $P(V_2 - V_1) = nR(T_2 - T_1)$. Thus $W = -nR\,\Delta T$. The heat along this path is $Q = C_P\,\Delta T$ by the definition of $C_P$. The internal energy does not care that the path was an isobar: $\Delta U = C_V\,\Delta T$ by [[#thm-joule]]. [[#prop-mayer]] is the check that these three statements agree, $C_P\,\Delta T + (-nR\,\Delta T) = C_V\,\Delta T$.

On an isotherm, $\Delta T = 0$, so $\Delta U = 0$ and $Q = -W$. The work integral uses $P = nRT/V$ with $T$ constant:

$$
W = -\int_{V_1}^{V_2} \frac{nRT}{V}\,\dd V = -nRT\ln\frac{V_2}{V_1}.
$$

Hence $Q = nRT\ln(V_2/V_1)$. If the gas expands, $V_2 > V_1$, the logarithm is positive, $Q > 0$ and $W < 0$: the gas absorbs heat and the work done on it is negative. If the gas is compressed, $V_2 < V_1$, the logarithm is negative, $W > 0$ and $Q < 0$: work is done on the gas and heat leaves it. In either case $\Delta U = 0$. An isothermal ideal gas stores none of the work as internal energy. It passes the energy straight through as heat.
:::
:::

The ratio $V_2/V_1$ is dimensionless, so any volume unit will do if both volumes use it. On an isotherm it equals $P_1/P_2$, and the labels $1$ and $2$ are initial and final.

## The reversible adiabat

An **adiabatic** process here has $Q = 0$. Fast does not mean reversible. The law $PV^{\gamma} = \text{constant}$ needs $Q = 0$ and a reversible path, so that $W = -\int P\,\dd V$ with the gas pressure. A free expansion is adiabatic and is not that path: $Q = 0$ and $W = 0$, so an ideal gas does not change its temperature, which is nothing like $TV^{\gamma - 1} = \text{constant}$.

::: theorem Reversible adiabat of an ideal gas {#thm-adiabat}
Let a fixed amount of ideal gas, with constant heat capacities and $\gamma = C_P/C_V$, undergo a reversible adiabatic process. Then

$$
PV^{\gamma} = \text{constant}, \qquad TV^{\gamma - 1} = \text{constant},
$$ {#eq-adiabat}

and the work done on the gas is

$$
W = \Delta U = C_V(T_2 - T_1) = \frac{P_2 V_2 - P_1 V_1}{\gamma - 1}.
$$ {#eq-adiabat-w}

In particular $Q = 0$. A compression, with $T_2 > T_1$, has $W > 0$.

::: proof
Reversible and adiabatic means $\delta Q = 0$ and $\delta W = -P\,\dd V$, so [[#eq-first-diff]] reduces to $\dd U = -P\,\dd V$. [[#thm-joule]] replaces the left side by $C_V\,\dd T$:

$$
C_V\,\dd T = -P\,\dd V = -\frac{nRT}{V}\,\dd V.
$$

The second equality is the ideal-gas law. Assume $T \neq 0$ and rearrange:

$$
C_V\frac{\dd T}{T} + nR\frac{\dd V}{V} = 0.
$$

$C_V$ and $nR$ are constant by hypothesis, so both terms integrate at once. Between the endpoints,

$$
C_V\ln\frac{T_2}{T_1} + nR\ln\frac{V_2}{V_1} = 0,
$$

which is

$$
\frac{T_2}{T_1} = \left(\frac{V_1}{V_2}\right)^{nR/C_V}.
$$

[[#prop-mayer]] gives $nR/C_V = (C_P - C_V)/C_V = \gamma - 1$, so

$$
T_2 V_2^{\gamma - 1} = T_1 V_1^{\gamma - 1}.
$$

That is the second half of [[#eq-adiabat]]. For the pressure, write $P = nRT/V$ at each end:

$$
\frac{P_2}{P_1} = \frac{T_2}{T_1}\frac{V_1}{V_2} = \left(\frac{V_1}{V_2}\right)^{\gamma - 1}\frac{V_1}{V_2} = \left(\frac{V_1}{V_2}\right)^{\gamma}.
$$

Hence $P_1 V_1^{\gamma} = P_2 V_2^{\gamma}$.

Now the work. Because $Q = 0$, [[#eq-first]] says $W = \Delta U$. Because $C_V$ is constant, $\Delta U = C_V(T_2 - T_1)$. This is positive when the gas warms, which a reversible adiabatic compression makes it do: $V_2 < V_1$ implies $T_2 > T_1$ from [[#eq-adiabat]]. The formula $C_V(T_1 - T_2)$ is the work done *by* the gas in the opposite sign convention. It is the negative of the work done on the gas. We do not use it for $W$.

To see the same work as an area, integrate $W = -\int_{V_1}^{V_2} P\,\dd V$ with $P = K V^{-\gamma}$ and $K = P_1 V_1^{\gamma}$:

$$
\begin{aligned}
W &= -\int_{V_1}^{V_2} K V^{-\gamma}\,\dd V = -K\left[\frac{V^{1 - \gamma}}{1 - \gamma}\right]_{V_1}^{V_2} \\
&= \frac{K}{\gamma - 1}\left(V_2^{1 - \gamma} - V_1^{1 - \gamma}\right) = \frac{P_2 V_2 - P_1 V_1}{\gamma - 1}.
\end{aligned}
$$

The last step uses $K V^{1 - \gamma} = PV$. And $(P_2 V_2 - P_1 V_1)/(\gamma - 1) = nR(T_2 - T_1)/(\gamma - 1) = C_V(T_2 - T_1)$, which closes the circle.
:::
:::

If $C_V$ depends on temperature, $\dd U = C_V(T)\,\dd T$ is still true for an ideal gas, but the integration no longer produces a constant $\gamma$ and no longer produces $PV^{\gamma} = \text{constant}$. The power law is the constant-heat-capacity case. Room-temperature diatomic problems in this chapter use that case, with $\gamma = 1.40$ and $C_V = \tfrac52 nR$.

On a diagram of $P$ against $V$, an isotherm of the ideal gas is $P \propto 1/V$. A reversible adiabat is $P \propto 1/V^{\gamma}$ with $\gamma > 1$, so it is steeper. From a common point, a small compression raises the pressure more on the adiabat than on the isotherm, because the adiabat also raises the temperature, and both effects increase $P$. The figure below draws the comparison in units where the common point is $(1, 1)$.

::: widget plot
f: 1/x; x^(-1.4)
x: 0.4, 3
y: 0, 4
labels: isotherm; adiabat
caption: The adiabat is steeper than the isotherm. Both curves pass through (1, 1) in these units. As x grows, the adiabat falls faster; a horizontal or vertical jump between the curves is not a process the gas can follow in one step.
:::

::: example Isothermal expansion {#ex-isothermal}
One mole of ideal gas expands reversibly and isothermally at $T = 300\,\mathrm{K}$ from $V_1 = 0.0100\,\mathrm{m^3}$ to $V_2 = 0.0200\,\mathrm{m^3}$. Find $\Delta U$, the work done on the gas, and the heat absorbed.
::: solution
The path is isothermal and the gas is ideal, so [[#thm-three]] gives $\Delta U = 0$ before any logarithm is computed. The volume doubles, and $\ln(V_2/V_1) = \ln 2 = 0.693147$. With $R = 8.314462618\,\mathrm{J\,mol^{-1}\,K^{-1}}$,

$$
nRT\ln 2 = (1.00)\times 8.314462618\times 300\times \ln 2 = 1728.94\,\mathrm{J}.
$$

Therefore

$$
Q = 1.729\times 10^{3}\,\mathrm{J}, \qquad W = -1.729\times 10^{3}\,\mathrm{J}.
$$

To the nearest joule, $Q = 1729\,\mathrm{J}$ and $W = -1729\,\mathrm{J}$. The gas absorbs heat and does work on the surroundings; the work done *on* the gas is negative. Their sum is zero, which is $\Delta U$. Using $T = 27$ because the day feels like room temperature would repeat the Celsius error of [[thermodynamics/temperature]] and would cut every energy by a factor $27/300$.
:::
:::

::: example Isobaric warming of a diatomic gas {#ex-isobaric}
One mole of diatomic ideal gas, with $f = 5$ and constant heat capacities, is warmed from $300\,\mathrm{K}$ to $400\,\mathrm{K}$ at constant pressure. Find $W$, $Q$ and $\Delta U$, and check the first law numerically.
::: solution
[[#eq-equipart]] and [[#eq-mayer]] give, for $n = 1$,

$$
C_V = \frac{5}{2}R = 20.786\,\mathrm{J\,K^{-1}}, \qquad C_P = \frac{7}{2}R = 29.101\,\mathrm{J\,K^{-1}}.
$$

The unrounded values are $C_V = \tfrac52\times 8.314462618 = 20.7862\,\mathrm{J\,K^{-1}}$ and $C_P = 29.1006\,\mathrm{J\,K^{-1}}$. With $\Delta T = 100\,\mathrm{K}$,

$$
\begin{aligned}
\Delta U &= C_V\,\Delta T = 2078.6\,\mathrm{J}, \\
W &= -nR\,\Delta T = -831.45\,\mathrm{J}, \\
Q &= C_P\,\Delta T = 2910.1\,\mathrm{J}.
\end{aligned}
$$

Add the transfers: $Q + W = 2910.06 + (-831.45) = 2078.6\,\mathrm{J}$, which matches $\Delta U$. The expansion does negative work on the gas. The heat absorbed is larger than $\Delta U$ by exactly that amount, $nR\,\Delta T$. Reporting $Q = C_V\,\Delta T = 2078.6\,\mathrm{J}$ would be the isochoric answer, and it would fail the check $Q + W = \Delta U$ once the work of the moving piston is included.
:::
:::

::: example Reversible adiabatic compression {#ex-adiabat}
One mole of diatomic ideal gas, $\gamma = 1.40$, starts at $T_1 = 300\,\mathrm{K}$ and $V_1 = 0.0200\,\mathrm{m^3}$ and is compressed reversibly and adiabatically to $V_2 = 0.0100\,\mathrm{m^3}$. Find $T_2$, the work done on the gas, and the two pressures.
::: solution
The volume is halved, so $V_1/V_2 = 2$. [[#eq-adiabat]] with $\gamma - 1 = 0.40$ gives

$$
T_2 = T_1\left(\frac{V_1}{V_2}\right)^{\gamma - 1} = 300\times 2^{0.4} = 395.85\,\mathrm{K}.
$$

The unrounded value is $395.852\,\mathrm{K}$, so $T_2 = 395.85\,\mathrm{K}$ to two decimal places and $\Delta T = 95.85\,\mathrm{K}$. For one mole of diatomic gas,

$$
C_V = \frac{5}{2}R = \frac{5}{2}\times 8.314462618 = 20.786\,\mathrm{J\,K^{-1}}.
$$

Since $Q = 0$, the work done on the gas equals the rise in internal energy, not the fall:

$$
W = \Delta U = C_V(T_2 - T_1) = 20.786\times 95.85 = 1.992\times 10^{3}\,\mathrm{J}.
$$

The product of the unrounded factors is $1992.4\,\mathrm{J}$, which is $1992\,\mathrm{J}$ to the nearest joule and $1.99\times 10^{3}\,\mathrm{J}$ to three significant figures. The sign is positive because the gas was compressed and warmed. The quantity $C_V(T_1 - T_2) = -1992\,\mathrm{J}$ is the work done *by* the gas. It is not $W$ in [[#eq-first]].

The initial pressure follows from the equation of state:

$$
P_1 = \frac{nRT_1}{V_1} = \frac{8.314462618\times 300}{0.0200} = 1.247\times 10^{5}\,\mathrm{Pa}.
$$

Along the adiabat $P_2 = P_1 (V_1/V_2)^{\gamma} = P_1 \times 2^{1.4}$, and $2^{1.4} = 2.6390$, so

$$
P_2 = 1.247\times 10^{5}\times 2.6390 = 3.291\times 10^{5}\,\mathrm{Pa}.
$$

As a check, use the area formula in [[#eq-adiabat-w]]:

$$
\frac{P_2 V_2 - P_1 V_1}{\gamma - 1} = \frac{(3.29130\times 10^{5})(0.0100) - (1.24717\times 10^{5})(0.0200)}{0.400} = \frac{796.96}{0.400} = 1.992\times 10^{3}\,\mathrm{J}.
$$

The two expressions for the work agree. An isothermal compression between the same volumes would have kept $T = 300\,\mathrm{K}$ and would have given $W = +1729\,\mathrm{J}$ by [[#ex-isothermal]] with the sign reversed. The adiabatic compression does more work on the gas, because the pressure rises faster, as the figure of the two curves suggests, and the extra work remains in $U$.
:::
:::

::: example Free expansion against a reversible isotherm {#ex-free}
The same mole of ideal gas doubles its volume from $0.0100\,\mathrm{m^3}$ to $0.0200\,\mathrm{m^3}$, starting at $300\,\mathrm{K}$, but by expanding into vacuum through a stopcock. The whole apparatus is rigid and insulated. Find $Q$, $W$ and $\Delta U$, and contrast them with [[#ex-isothermal]].
::: solution
Draw the boundary around both vessels. The outer walls do not move, so $W = 0$. They do not pass heat, so $Q = 0$. [[#eq-first]] gives $\Delta U = 0$. For an ideal gas [[#thm-joule]] then gives $\Delta T = 0$, and the final temperature is still $300\,\mathrm{K}$. The final pressure is half the initial pressure, by Boyle's law at the endpoints, but that fact is not needed to evaluate $Q$ and $W$.

The reversible isotherm of [[#ex-isothermal]] joins the same endpoints with $\Delta U = 0$, but with $Q = 1729\,\mathrm{J}$ and $W = -1729\,\mathrm{J}$. Same $\Delta U$, different door. The free expansion does not obey $TV^{\gamma - 1} = \text{constant}$: here $T$ is constant while $V$ changes.
:::
:::

::: warning Three substitutions that do not survive a change of path
$C_V\,\Delta T$ equals $Q$ only on a constant-volume path. On a reversible adiabat, $Q = 0$ and $\Delta T$ is not zero; $C_V\,\Delta T$ equals $W$, the work done on the gas, and also equals $\Delta U$. The product $P\,\Delta V$ equals $-W$ only when $P$ is constant. On an isotherm or an adiabat the pressure moves, and the work is an integral, not a rectangle. Finally, $W$ in $\Delta U = Q + W$ is work done on the system. The mechanics identity $W_{\mathrm{net}} = \Delta K$ uses the opposite orientation of the sentence, work done by the net force, and a different energy.
:::

::: quiz
A reversible adiabatic compression of an ideal gas has $Q = 0$. Which other statement is true?
- [ ] $\Delta T = 0$, because there is no heat
- [ ] $\Delta U = 0$, because $Q = 0$
- [x] $\Delta U = W > 0$, and the gas warms
- [ ] $W = -P\,\Delta V$ with the initial pressure, because the formula is printed that way
::: solution
$Q = 0$ reduces [[#eq-first]] to $\Delta U = W$. It does not constrain $\Delta T$ until an equation of state is added. For the ideal gas, $\Delta U = C_V\,\Delta T$, and [[#thm-adiabat]] says a compression raises $T$, so both $\Delta U$ and $W$ are positive. Setting $\Delta T = 0$ whenever $Q = 0$ confuses the adiabat with the isotherm, and it also confuses the adiabat with the free expansion, where $Q$, $W$ and $\Delta T$ all vanish together. The rectangle $-P\,\Delta V$ needs a constant $P$. The pressure on this path is not constant; the integral is [[#eq-adiabat-w]].
:::
:::

## Where this leads

The four ideal-gas paths, with this sign convention, are collected in the summary. Paths that share their endpoints share $\Delta U$ and need not share $Q$ or $W$. A negative $W$ on a compression means $T_1$ and $T_2$ were exchanged in [[#eq-adiabat-w]], or the integral was pointed the wrong way.

Over a cycle $\Delta U = 0$, so $W = -Q$. Nothing in that sentence limits how much of an absorbed heat can return as work. The limit is the second law, in [[thermodynamics/heat-engines]]. What this chapter supplies is the pair of isotherms and the pair of adiabats a Carnot cycle is built from, and the fact that $U$ returns to itself when the gas does.

::: history Joule’s paddle wheel and the conservation of energy
James Joule’s paddle-wheel experiments of the 1840s compared mechanical work, delivered by falling weights, with the temperature rise of water in the can. He described the apparatus to the British Association at Cambridge in June 1845, in the report *On the Mechanical Equivalent of Heat*, as a check on results he had already drawn from magneto-electric currents and from the compression and rarefaction of air. The careful determination published in the *Philosophical Transactions* for 1850 is the later, fuller account of the same kind of experiment. The first law as a general conservation statement was assembled from several directions: Julius Robert Mayer’s paper of 1842 on the forces of inorganic nature, Joule’s measurements, Hermann von Helmholtz’s *Über die Erhaltung der Kraft* (1847), and Rudolf Clausius’s formulation of 1850. The free-expansion evidence that $U$ is insensitive to volume, for a dilute gas, goes back to Gay-Lussac and to Joule’s own rarefaction experiments; it is a null result within the precision of those baths, not a claim about every real gas at every density.
:::

::: summary
- The first law is $\Delta U = Q + W$, with $Q$ the heat absorbed by the system and $W$ the work done on the system. This is not the mechanical convention $W_{\mathrm{net}} = \Delta K$.
- For a quasi-static volume change, $W = -\int P\,\dd V$. A compression has $\dd V < 0$ and $W > 0$. If the process is not quasi-static, the pressure under the integral is $P_{\mathrm{ext}}$, and a free expansion has $W = 0$.
- $U$ is a state function because adiabatic work between two states is path-independent. $Q$ and $W$ separately are not.
- For an ideal gas, $U = U(T)$ and $\Delta U = C_V\,\Delta T$ on every path when $C_V$ is constant. Equipartition gives $C_V = (f/2)\,nR$, with $f = 3$ for a monatomic gas and $f = 5$ for a diatomic gas at room temperature.
- Mayer's relation is $C_P - C_V = nR$. It follows from $\dd U = C_V\,\dd T$ and $W = -P\,\dd V$ on an isobar. Then $\gamma = C_P/C_V = 1 + 2/f$.
- On an isochore, $W = 0$ and $Q = C_V\,\Delta T$. On an isobar, $W = -nR\,\Delta T$ and $Q = C_P\,\Delta T$. On a reversible isotherm, $\Delta U = 0$ and $Q = -W = nRT\ln(V_2/V_1)$.
- On a reversible adiabat, $Q = 0$, $PV^{\gamma}$ and $TV^{\gamma - 1}$ are constant, and $W = C_V(T_2 - T_1) = (P_2 V_2 - P_1 V_1)/(\gamma - 1)$. The adiabat is steeper than the isotherm.
- $C_V\,\Delta T$ is not $Q$ except at constant volume, and $-P\,\Delta V$ is not $W$ except at constant pressure.
:::

## Exercises

::: exercise Heat on an isochore {#exr-isochoric level=1 check="300"}
A sample with constant $C_V = 25.0\,\mathrm{J\,K^{-1}}$ is warmed by $\Delta T = 12.0\,\mathrm{K}$ at constant volume. Expansion work is the only work available, and the boundary does not move. Find the heat absorbed by the sample.
::: solution
[[#thm-three]] gives $W = 0$ on an isochore, so $Q = \Delta U = C_V\,\Delta T$:

$$
Q = 25.0\times 12.0 = 300\,\mathrm{J}.
$$

The amount of gas and the ideal-gas law are not required once $C_V$ and $\Delta T$ are given. The same temperature rise at constant pressure would absorb $C_P\,\Delta T$, which is larger by $nR\,\Delta T$, and this problem is not that path.
:::
:::

::: exercise Work of a slow compression at constant pressure {#exr-isobaric-w level=1 check="800"}
A gas is compressed quasi-statically at constant pressure $P = 2.00\times 10^{5}\,\mathrm{Pa}$. The volume change is $\Delta V = -4.00\times 10^{-3}\,\mathrm{m^3}$. Find the work done on the gas.
::: solution
Pressure is constant, so [[#eq-work]] collapses to $W = -P\,\Delta V$:

$$
W = -(2.00\times 10^{5})\times (-4.00\times 10^{-3}) = 800\,\mathrm{J}.
$$

The compression makes $\Delta V$ negative and $W$ positive. Dropping the minus sign in [[#eq-work]] would give $-800\,\mathrm{J}$ and would be the work done *by* the gas. The first law has not yet been asked for $\Delta U$, and it cannot be found from these data alone: heat and the heat capacity are both missing.
:::
:::

::: exercise Internal energy on an isotherm {#exr-delta-u level=1 check="0"}
A fixed amount of ideal gas is taken reversibly from volume $V$ to volume $3V$ at constant temperature. Find $\Delta U$.
::: solution
[[#thm-joule]] says $U$ depends only on $T$ for a fixed amount of ideal gas. The temperature does not change, so

$$
\Delta U = 0.
$$

The volume ratio would matter for $Q$ and for $W$. By [[#eq-isothermal]], $Q = nRT\ln 3$ and $W = -nRT\ln 3$, and those are not zero. Their sum is. The question asked only for $\Delta U$.
:::
:::

::: exercise Closing the ledger {#exr-ledger level=2 check="300"}
In a certain process a system absorbs $Q = 500\,\mathrm{J}$ of heat, and the work done on the system is $W = -200\,\mathrm{J}$. Find $\Delta U$.
::: solution
[[#eq-first]] is an addition, not a difference, in our convention:

$$
\Delta U = Q + W = 500 + (-200) = 300\,\mathrm{J}.
$$

The negative work means the system did $200\,\mathrm{J}$ of work on the surroundings. Someone using $\Delta U = Q - W_{\mathrm{by}}$ with $W_{\mathrm{by}} = 200\,\mathrm{J}$ obtains the same $300\,\mathrm{J}$. Someone who subtracts our $W$ a second time, $500 - (-200)$, obtains $700\,\mathrm{J}$ and has applied the other convention to a number that was already "on the system". The data do not say whether the system is an ideal gas. They do not need to. The first law is not restricted to ideal gases.
:::
:::

::: exercise A monatomic adiabat with a volume ratio of eight {#exr-mono level=2 check="1200"}
A monatomic ideal gas, $\gamma = 5/3$, is compressed reversibly and adiabatically so that $V_1/V_2 = 8$. The initial temperature is $T_1 = 300\,\mathrm{K}$. Find $T_2$.
::: solution
[[#eq-adiabat]] gives $T_2 = T_1 (V_1/V_2)^{\gamma - 1}$. For a monatomic gas $\gamma - 1 = 2/3$, and

$$
8^{2/3} = (8^{1/3})^2 = 2^2 = 4.
$$

Hence $T_2 = 300\times 4 = 1200\,\mathrm{K}$. The gas warms because it is compressed with no heat allowed to leave. The factor $4$ is exact; it does not depend on $R$ or on the amount. The work on the gas would be $C_V(T_2 - T_1)$ with $C_V = \tfrac32 nR$, which needs $n$ and was not asked for.
:::
:::

::: exercise Work from a pressure and two volumes {#exr-rectangle level=2 check="-1800"}
An ideal gas expands quasi-statically at constant pressure $P = 1.00\times 10^{5}\,\mathrm{Pa}$ from $V_1 = 0.0120\,\mathrm{m^3}$ to $V_2 = 0.0300\,\mathrm{m^3}$. Find the work done on the gas.
::: solution
The path is an isobar, so the integral is a rectangle:

$$
W = -P(V_2 - V_1) = -(1.00\times 10^{5})(0.0300 - 0.0120) = -(1.00\times 10^{5})(0.0180) = -1800\,\mathrm{J}.
$$

The work on the gas is negative because the gas expands. The work done *by* the gas is $+1800\,\mathrm{J}$. Finding $\Delta U$ would require the temperatures or $n$ and $\Delta T$, through $\Delta U = C_V\,\Delta T$. The problem does not give them, and $W$ does not need them when $P$ is constant.
:::
:::

::: exercise From the differential to the work formula {#exr-derive level=3}
An ideal gas with constant $C_V$ and $\gamma = C_P/C_V$ undergoes a reversible adiabatic process from $(P_1, V_1, T_1)$ to $(P_2, V_2, T_2)$. Starting from $\dd U = -P\,\dd V$ and $PV = nRT$, derive $TV^{\gamma - 1} = \text{constant}$, and show that the work done on the gas equals both $C_V(T_2 - T_1)$ and $(P_2 V_2 - P_1 V_1)/(\gamma - 1)$.
::: hint
Use $\dd U = C_V\,\dd T$ and $C_P - C_V = nR$ to replace $nR/C_V$ by $\gamma - 1$. For the area integral, write $P = K V^{-\gamma}$ with $K = P_1 V_1^{\gamma}$.
:::
::: solution
Reversible and adiabatic means $Q = 0$, so [[#eq-first-diff]] is $\dd U = -P\,\dd V$. [[#thm-joule]] gives $\dd U = C_V\,\dd T$ with $C_V$ constant, and the ideal-gas law replaces $P$:

$$
C_V\,\dd T = -\frac{nRT}{V}\,\dd V, \qquad C_V\frac{\dd T}{T} + nR\frac{\dd V}{V} = 0.
$$

Integrate from the initial state to the final state:

$$
C_V\ln\frac{T_2}{T_1} + nR\ln\frac{V_2}{V_1} = 0.
$$

[[#prop-mayer]] says $nR/C_V = \gamma - 1$, so $T_2/T_1 = (V_1/V_2)^{\gamma - 1}$, which is $T_1 V_1^{\gamma - 1} = T_2 V_2^{\gamma - 1}$.

Because $Q = 0$, $W = \Delta U = C_V(T_2 - T_1)$. That is the first expression, and it is already the work done on the gas. For the second, use $P V^{\gamma} = K$ with $K = P_1 V_1^{\gamma}$, which follows from the temperature relation together with $PV = nRT$ as in [[#thm-adiabat]]. Then

$$
\begin{aligned}
W &= -\int_{V_1}^{V_2} K V^{-\gamma}\,\dd V = \frac{K}{\gamma - 1}\left(V_2^{1 - \gamma} - V_1^{1 - \gamma}\right) \\
&= \frac{P_2 V_2 - P_1 V_1}{\gamma - 1}.
\end{aligned}
$$

These are equal because $P_2 V_2 - P_1 V_1 = nR(T_2 - T_1)$ and $nR/(\gamma - 1) = C_V$. The hypotheses used were: ideal gas, constant $C_V$, reversible so that $P$ is the pressure under the integral, and adiabatic so that $Q = 0$. Drop reversibility and the power law goes with it, even if the vessel is insulated.
:::
:::

::: exercise The diatomic compression, with the sign kept {#exr-diatomic level=3 check="1992"}
One mole of diatomic ideal gas ($\gamma = 1.40$, $C_V = \tfrac52 R$ with $R = 8.314462618\,\mathrm{J\,mol^{-1}\,K^{-1}}$) is compressed reversibly and adiabatically from $T_1 = 300\,\mathrm{K}$ and $V_1 = 0.0200\,\mathrm{m^3}$ to $V_2 = 0.0100\,\mathrm{m^3}$. Find the work done on the gas, to the nearest joule.
::: hint
First find $T_2 = 300\times 2^{0.4}$. Then $W = C_V(T_2 - T_1)$, not $C_V(T_1 - T_2)$. The compression warms the gas, and the work on the gas is positive.
:::
::: solution
The volume ratio is $2$, and $\gamma - 1 = 0.4$, so

$$
T_2 = 300\times 2^{0.4} = 395.852\,\mathrm{K}.
$$

The temperature rise is $95.852\,\mathrm{K}$. The heat capacity of one mole is

$$
C_V = \frac{5}{2}\times 8.314462618 = 20.786156545\,\mathrm{J\,K^{-1}}.
$$

Heat does not cross the boundary, so $W = \Delta U$:

$$
W = C_V(T_2 - T_1) = 20.786156545\times 95.852 = 1992.4\,\mathrm{J}.
$$

To the nearest joule, $W = 1992\,\mathrm{J}$. The positive sign is the content of the question. Exchanging $T_1$ and $T_2$ produces $-1992\,\mathrm{J}$, which is the work done by the gas on the piston in the mechanical sense, and it is the wrong sign for $W$ in [[#eq-first]]. The same number is recovered from $(P_2 V_2 - P_1 V_1)/(\gamma - 1)$, as in [[#ex-adiabat]].
:::
:::
