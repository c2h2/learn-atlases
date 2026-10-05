A heat engine, treated in [[thermodynamics/heat-engines]], absorbs heat from a hot place and rejects heat to a cold one. The first law, [[thermodynamics/first-law]], does not forbid an engine that turns every joule it absorbs into work. Energy would still balance under the convention used in this course,

$$
\Delta U = Q + W,
$$

with $W$ the work done *on* the system. What fails is not the ledger of energy. It is the assumption that every joule of heat is as available as work. The second law is that restriction, and entropy is the state function that expresses it.

Clausius's working definition is the rule of this chapter. Along a reversible path between neighbouring equilibrium states,

$$
\dd S = \frac{\text{đ}Q_{\mathrm{rev}}}{T}.
$$

The stroke on $\text{đ}Q$ is a reminder that heat is not the differential of a state function. Dividing by the absolute temperature produces one. We will prove that $S$ depends only on the state, derive its change for an ideal gas from the identity $\dd U = T\,\dd S - P\,\dd V$, and apply the result to a free expansion, where the actual heat is zero and $\Delta S$ is not. The Clausius inequality then covers irreversible processes: the entropy of an isolated system does not decrease.

Temperatures in these formulae are absolute temperatures, in kelvin, as in [[thermodynamics/temperature]]. Heat capacities need a consistent notation. In the first-law chapter $C_V$ is the extensive heat capacity, so that $Q = C_V\,\Delta T$ at constant volume for an ideal gas with constant $C_V$. The molar heat capacity is $C_{V,m} = C_V/n$, and the entropy formula below is written with $C_{V,m}$. The two conventions describe the same gas: $C_V = n C_{V,m}$.

## Reversible heat

Entropy is defined on a reversible path because that is where heat and temperature fix a difference of a state function. A reversible process passes through equilibrium states: one temperature, matched to the source of the heat, and one pressure, matched to the external pressure on the piston. We can stop it and reverse it by an infinitesimal change of the surroundings. Real processes only approximate that ideal, just as a frictionless surface is the setting in which mechanical energy is conserved exactly.

Heat is a transfer, not a property. Two routes from $(T_1, V_1)$ to $(T_2, V_2)$ generally exchange different amounts of heat. The first law makes $Q$ and $W$ trade off so that $\Delta U$ agrees. Entropy is a second such compensation: $\text{đ}Q/T$ on reversible routes does not depend on the route.

::: definition Entropy {#def-entropy}
Let $A$ and $B$ be two equilibrium states of a closed system. The **entropy difference** is

$$
S(B) - S(A) = \int_{A}^{B} \frac{\text{đ}Q_{\mathrm{rev}}}{T},
$$ {#eq-delta-s}

where the integral is taken along *any* reversible path from $A$ to $B$, and $T$ is the absolute temperature of the system on that path. For a reversible step between neighbouring equilibrium states,

$$
\dd S = \frac{\text{đ}Q_{\mathrm{rev}}}{T}.
$$ {#eq-ds}

The SI unit is the joule per kelvin. An arbitrary constant may be added to $S$ without changing [[#eq-delta-s]]. This chapter computes differences only.
:::

The definition is usable only after we know that the integral does not depend on which reversible path is chosen. That is the next theorem. Until it is proved, [[#eq-delta-s]] is a description of a path. After it is proved, $S$ is a property of the state, on the same footing as $U$. Entropy is additive over parts of a composite, $S = S_1 + S_2$, up to a constant. This chapter never needs an absolute value.

::: quiz
An ideal gas expands into vacuum inside an insulated rigid outer box. For the gas,
- [ ] $\Delta S = 0$, because $Q = 0$ and $\Delta S = Q/T$
- [ ] $\Delta S < 0$, because the gas occupies more volume and is more spread out in a way that lowers every state function
- [x] $\Delta S = n R \ln(V_2/V_1) > 0$, computed on a reversible isotherm between the same two states
- [ ] $\Delta S = n C_{V,m}\ln(T_2/T_1)$ with $T_2 > T_1$, because expansion warms an ideal gas
::: solution
The actual process has $Q = 0$ and $W = 0$, so $\Delta U = 0$ and, for an ideal gas, $\Delta T = 0$. Entropy is a state function, so $\Delta S$ equals the integral of $\text{đ}Q_{\mathrm{rev}}/T$ on a *reversible* path with the same endpoints, not $Q/T$ on the actual path. That replacement path is a reversible isotherm, and it gives $\Delta S = n R \ln(V_2/V_1)$. The actual heat is the wrong heat to insert into [[#eq-ds]]. The gas is not warmer at the end.
:::
:::

::: intuition Entropy tracks reversible heat, weighted by temperature
A joule of heat entering a cold system changes the entropy more than a joule entering a hot one, because $T$ is in the denominator. Heat flowing of itself from hot to cold therefore raises the entropy of the pair: the cold body gains more than the hot body loses. The quantity is the line integral in [[#eq-delta-s]], not a stuff stored in the gas.
:::

## Entropy is a state function

The proof uses the Carnot cycle from [[thermodynamics/heat-engines]]. A Carnot cycle is reversible: two isotherms, at $T_h$ and $T_c$, and two adiabats. On the adiabats $\text{đ}Q_{\mathrm{rev}} = 0$. On the hot isotherm the engine absorbs $Q_h > 0$. On the cold isotherm it absorbs $Q_c < 0$, which is the same statement as rejecting $\abs{Q_c}$. The Carnot ratio is $\abs{Q_c}/Q_h = T_c/T_h$, so

$$
\frac{Q_h}{T_h} + \frac{Q_c}{T_c} = 0.
$$

The closed integral of $\text{đ}Q_{\mathrm{rev}}/T$ around one Carnot cycle therefore vanishes.

::: theorem Entropy is a state function {#thm-state-function}
For a closed hydrostatic system, the integral of $\text{đ}Q_{\mathrm{rev}}/T$ between two equilibrium states is the same for every reversible path joining them. Equivalently, around every reversible cycle

$$
\oint \frac{\text{đ}Q_{\mathrm{rev}}}{T} = 0.
$$ {#eq-cycle-s}

Hence [[#eq-delta-s]] defines a state function $S$.
:::

::: proof
First consider a single Carnot cycle. The adiabats contribute nothing. The isotherms contribute $Q_h/T_h + Q_c/T_c$, and the Carnot efficiency relation, derived in [[thermodynamics/heat-engines]] from the ideal-gas isotherm and the matching volume ratios on the adiabats, sets that sum to zero. The same conclusion holds for a Carnot refrigerator, which is the cycle reversed: both heats change sign and the sum is still zero.

Now take an arbitrary reversible cycle on the indicator diagram. Draw a family of neighbouring adiabats that slice the cycle into thin strips, and close each strip with short isotherms at the edge of the cycle. Each strip is a thin Carnot cycle, up to an error that vanishes as the adiabats are drawn closer, because a reversible path is a continuous succession of equilibrium states and a short piece of it is nearly an isotherm or can be replaced by one at the local temperature. The integral of $\text{đ}Q_{\mathrm{rev}}/T$ around the original cycle equals the sum of the integrals around the strips: every internal adiabat is traversed once in each direction and cancels, and the outer isotherms reconstruct the original path. Each strip contributes zero, so the whole cycle contributes zero.

Path independence is the same statement. Let $C_1$ and $C_2$ be two reversible paths from $A$ to $B$. Travel out along $C_1$ and return along the reverse of $C_2$. The loop integral vanishes, and the return contributes the negative of the integral along $C_2$, so the two forward integrals agree. Therefore $S(B) - S(A)$ is unambiguous, and $S$ is a state function.
:::

The Carnot ratio is what makes $\text{đ}Q/T$ a perfect differential on the reversible paths. The ideal-gas cycle is enough for the systems in this course. On a reversible adiabat, $\text{đ}Q_{\mathrm{rev}} = 0$, so $\dd S = 0$: a reversible adiabat is an isentrope. An irreversible adiabat, including a free expansion, also has $Q = 0$, but [[#eq-ds]] does not apply to that actual heat, and $\Delta S$ need not vanish.

::: warning Not every adiabat is isentropic, and $Q/T$ is not always $\Delta S$
$\Delta S = Q/T$ holds for a reversible isothermal process, and only if $Q$ is the heat of that reversible process. Dividing the actual heat of an irreversible process by a temperature is a standard error: free expansion has $Q = 0$ and $\Delta S > 0$. Equally, $Q = 0$ does not imply $\Delta S = 0$ unless the adiabat is reversible. Entropy is not "disorder" unless a multiplicity has been defined and related to $S$. That counting is in [[statistical-mechanics]]. Nothing in this chapter requires it.
:::

## The thermodynamic identity

Between neighbouring equilibrium states the first law and the definition of $S$ can be combined. For a quasistatic volume change the work done *on* the system is

$$
\text{đ}W = -\int P\,\dd V,
$$

in the convention $\Delta U = Q + W$. On a reversible path the system's pressure is the pressure in that integral, and $\text{đ}Q_{\mathrm{rev}} = T\,\dd S$.

::: theorem Thermodynamic identity {#thm-identity}
For a closed hydrostatic system whose only work mode is expansion work, the internal energy $U(S, V)$ of an equilibrium state satisfies

$$
\dd U = T\,\dd S - P\,\dd V.
$$ {#eq-du}
:::

::: proof
Consider two neighbouring equilibrium states. Because $U$ and $S$ are state functions, the differences $\dd U$ and $\dd S$ may be computed along any path, and we choose a reversible path. The first law along that path reads $\dd U = \text{đ}Q_{\mathrm{rev}} + \text{đ}W_{\mathrm{rev}}$. The definition [[#eq-ds]] replaces the heat by $T\,\dd S$. The work done on the system in a reversible expansion is $\text{đ}W_{\mathrm{rev}} = -P\,\dd V$. Adding these gives [[#eq-du]].

The coefficients are partial derivatives of the state function $U$:

$$
T = \left(\pdv{U}{S}\right)_{V}, \qquad P = -\left(\pdv{U}{V}\right)_{S}.
$$ {#eq-partials-u}

The identity is a relation among state variables. It does not say that the actual heat of an irreversible process equals $T\,\dd S$, nor that the actual work equals $-P\,\dd V$. Those equalities hold on a reversible path. On an irreversible path, $\dd U$ is still $T\,\dd S - P\,\dd V$ when both sides are computed from the equilibrium states at the two ends, while $Q + W$ equals the same $\dd U$ with the actual $Q$ and $W$.
:::

[[#eq-du]] is the form used for the rest of the course, and the starting point of [[thermodynamics/potentials]]. The natural variables of $U$ are $S$ and $V$. Experiments more often control $T$ and $P$, which is why the later chapter changes variables.

Solving [[#eq-du]] for the entropy differential,

$$
\dd S = \frac{1}{T}\,\dd U + \frac{P}{T}\,\dd V,
$$ {#eq-ds-from-du}

expresses $\dd S$ in quantities the first law already knows. For any substance with a known equation of state and a known $U$, [[#eq-ds-from-du]] is an instruction for computing $\Delta S$. The ideal gas is the case we can finish in closed form.

## Entropy of an ideal gas

An ideal gas, as defined in [[thermodynamics/temperature]] and [[thermodynamics/first-law]], obeys $PV = nRT$ and has an internal energy that depends only on temperature. Joule's free-expansion experiment is the empirical content of the second statement: a gas expanding into vacuum, with $Q = 0$ and $W = 0$, does not change its temperature, so $U$ did not depend on $V$. With a constant molar heat capacity,

$$
\dd U = n C_{V,m}\,\dd T.
$$

A monatomic gas has $C_{V,m} = \tfrac{3}{2} R$. A diatomic gas at room temperature, rotation excited and vibration not, has $C_{V,m} = \tfrac{5}{2} R$. The derivation below needs only that $C_{V,m}$ is constant on the interval and that $U = U(T)$.

::: theorem Entropy change of an ideal gas {#thm-ideal-s}
For $n$ moles of ideal gas with constant molar heat capacity $C_{V,m}$,

$$
\Delta S = n C_{V,m}\ln\frac{T_2}{T_1} + n R\ln\frac{V_2}{V_1}.
$$ {#eq-delta-s-ideal}

Equivalently, in temperature and pressure,

$$
\Delta S = n C_{P,m}\ln\frac{T_2}{T_1} - n R\ln\frac{P_2}{P_1},
$$ {#eq-delta-s-pressure}

where $C_{P,m} = C_{V,m} + R$.
:::

::: proof
Start from [[#eq-ds-from-du]], insert $\dd U = n C_{V,m}\,\dd T$ and $P/T = nR/V$:

$$
\dd S = n C_{V,m}\,\frac{\dd T}{T} + n R\,\frac{\dd V}{V}.
$$

Integrate from state 1 to state 2. The coefficients are constant, so each term is a logarithm:

$$
\begin{aligned}
\Delta S
&= n C_{V,m}\int_{T_1}^{T_2}\frac{\dd T}{T} + n R\int_{V_1}^{V_2}\frac{\dd V}{V} \\
&= n C_{V,m}\ln\frac{T_2}{T_1} + n R\ln\frac{V_2}{V_1}.
\end{aligned}
$$

That is [[#eq-delta-s-ideal]]. The hypotheses used are: ideal-gas law, $U$ a function of $T$ alone, and $C_{V,m}$ constant. If $C_{V,m}$ varies with temperature the first term remains an integral, $\int n C_{V,m}(T)\,\dd T/T$, and the volume term is unchanged.

For the pressure form, write $V = nRT/P$, so

$$
\ln\frac{V_2}{V_1} = \ln\frac{T_2}{T_1} - \ln\frac{P_2}{P_1}.
$$

Substitute into [[#eq-delta-s-ideal]]:

$$
\begin{aligned}
\Delta S
&= n C_{V,m}\ln\frac{T_2}{T_1} + n R\ln\frac{T_2}{T_1} - n R\ln\frac{P_2}{P_1} \\
&= n(C_{V,m} + R)\ln\frac{T_2}{T_1} - n R\ln\frac{P_2}{P_1}.
\end{aligned}
$$

The identity $C_{P,m} - C_{V,m} = R$ for an ideal gas, proved from the first law by comparing isobaric and isochoric paths, replaces $C_{V,m} + R$ by $C_{P,m}$.
:::

Each logarithm is a ratio, so a change of unit cancels, and the arbitrary constant in $S$ has already cancelled in $\Delta S$. At constant temperature only the volume term survives, $\Delta S = n R\ln(V_2/V_1) = -n R\ln(P_2/P_1)$. At constant volume only the temperature term of [[#eq-delta-s-ideal]] survives, and at constant pressure only the temperature term of [[#eq-delta-s-pressure]]. On a reversible adiabat, $T V^{\gamma - 1}$ is constant with $\gamma = C_{P,m}/C_{V,m}$, and the two terms cancel. The next sections compute these cases, and the irreversible cousin of the isotherm.

## Free expansion

Consider $n$ moles of ideal gas in an insulated container. A partition separates the gas, at volume $V_1$, from a vacuum. The outer walls are rigid. The partition is removed, or broken, and the gas fills the whole volume $V_2$.

No heat crosses the insulation on the timescale of the expansion: $Q = 0$. No part of the outer boundary moves, and the gas pushes on nothing that pushes back, so the work done on the gas is $W = 0$. The first law gives $\Delta U = Q + W = 0$. For an ideal gas $U$ depends only on $T$, so $\Delta T = 0$. The initial equilibrium state is $(T, V_1)$ and the final equilibrium state is $(T, V_2)$. During the rush the pressure and temperature are not uniform. There is no single $P$ to put into $\text{đ}W = -P\,\dd V$, and the actual path is not a curve on the equilibrium indicator diagram.

Entropy does not care. $S$ is a state function, so $\Delta S$ depends on the endpoints alone. We are free to compute it on a reversible replacement path that never happens in the apparatus. The convenient choice is a reversible isothermal expansion at the same temperature $T$, from $V_1$ to $V_2$. Along that path $\Delta U = 0$, so $Q_{\mathrm{rev}} = -W_{\mathrm{rev}}$. The work done on the gas is $W_{\mathrm{rev}} = -nRT\ln(V_2/V_1)$, and therefore $Q_{\mathrm{rev}} = nRT\ln(V_2/V_1)$. Because the path is reversible and isothermal,

$$
\Delta S = \frac{Q_{\mathrm{rev}}}{T} = n R\ln\frac{V_2}{V_1}.
$$

[[#eq-delta-s-ideal]] gives the same answer at once, because the temperature term is zero. If $V_2 > V_1$ the entropy of the gas rises. The gas was isolated: rigid outer walls, no heat, no work exchanged with the surroundings. An isolated system's entropy has increased, which is allowed. It would not be allowed to decrease.

The replacement path is a calculating device. On it the gas absorbs heat and does work; in the real expansion neither transfer occurs. Using the actual $Q = 0$ in $\Delta S = Q/T$ gives zero, which is the wrong value.

::: example Free expansion to twice the volume {#ex-free}
One mole of ideal monatomic gas expands freely into vacuum, and the volume doubles. Find $\Delta S$. The initial temperature does not need a value.
::: solution
The gas is ideal, so $\Delta T = 0$ and $\Delta U = 0$, as above, whether or not it is monatomic. Monatomic enters only if we were asked for $C_{V,m}$; the temperature term in [[#eq-delta-s-ideal]] is zero anyway. With $n = 1.00\,\mathrm{mol}$ and $V_2/V_1 = 2$,

$$
\Delta S = R\ln 2.
$$

Using $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$ and $\ln 2 = 0.693147180560$,

$$
\Delta S = 8.314462618\times 0.693147180560 = 5.763146\ldots\,\mathrm{J/K}.
$$

To three decimal places, $\Delta S = 5.763\,\mathrm{J/K}$. The positive sign says the isolated gas has moved to a state of higher entropy. A reversible isothermal compression would be required to put it back, and that compression dumps heat $T\Delta S = RT\ln 2$ into a reservoir. Restoring the gas lowers the gas's entropy and raises the reservoir's by the same amount. The isolated composite does not return to its original entropy without a further intervention.
:::
:::

The temperature cancelled, so the same $5.763\,\mathrm{J/K}$ is the entropy change at any $T$. The replacement isotherm's heat does depend on $T$: at $300\,\mathrm{K}$, $Q_{\mathrm{rev}} = RT\ln 2 = 1729\,\mathrm{J}$, which reappears as a free-energy change in [[thermodynamics/potentials]].

## Three reversible calculations

The ideal-gas formula is most convincing when the same state is reached by routes whose heats differ and whose entropy changes do not. The next three examples are reversible, so $\text{đ}Q_{\mathrm{rev}}$ is the actual heat, and a direct integration of $\text{đ}Q/T$ must reproduce [[#eq-delta-s-ideal]].

::: example Warming at constant volume {#ex-isochoric}
Two moles of ideal monatomic gas are warmed reversibly from $300\,\mathrm{K}$ to $400\,\mathrm{K}$ at constant volume. Find $\Delta S$ for the gas.
::: solution
The volume term in [[#eq-delta-s-ideal]] is zero. For a monatomic gas $C_{V,m} = \tfrac{3}{2} R$, so

$$
\Delta S = n C_{V,m}\ln\frac{400}{300} = 2.00\times\tfrac{3}{2}\times R\times\ln\frac{4}{3}.
$$

First, $n C_{V,m} = 3 R = 3\times 8.314462618 = 24.943387854\,\mathrm{J/K}$. Next, $\ln(4/3) = 0.287682072452$. The product is

$$
\Delta S = 24.943387854\times 0.287682072452 = 7.1757655\ldots\,\mathrm{J/K},
$$

which rounds to $7.176\,\mathrm{J/K}$. The same integral is the definition: at constant volume $W = 0$, so $\text{đ}Q_{\mathrm{rev}} = n C_{V,m}\,\dd T$ and $\Delta S = \int n C_{V,m}\,\dd T/T$. A single reservoir at $400\,\mathrm{K}$ reaches the same endpoints for the gas, so the gas's $\Delta S$ is unchanged, but the universe produces entropy. That contrast is [[#ex-irreversible-warm]].
:::
:::

::: example A reversible isotherm and its reservoir {#ex-isotherm}
One mole of ideal gas expands reversibly and isothermally at $300\,\mathrm{K}$ from $0.0100\,\mathrm{m^3}$ to $0.0250\,\mathrm{m^3}$. Find $\Delta S$ of the gas, of the reservoir that supplies the heat, and of the universe.
::: solution
The temperature is constant and the gas is ideal, so $\Delta U = 0$ and $\Delta S$ of the gas reduces to the volume term:

$$
\frac{V_2}{V_1} = \frac{0.0250}{0.0100} = 2.50, \qquad \ln 2.50 = 0.916290731874.
$$

$$
\Delta S_{\mathrm{gas}} = n R\ln 2.50 = 8.314462618\times 0.916290731874 = 7.618465\,\mathrm{J/K},
$$

or $7.618\,\mathrm{J/K}$ to three decimal places. The heat absorbed by the gas equals $T\Delta S_{\mathrm{gas}}$, since $\Delta U = 0$ and the path is reversible:

$$
Q = T\Delta S_{\mathrm{gas}} = 300\times 7.618465 = 2285.54\,\mathrm{J}.
$$

The work done on the gas is $W = -Q = -2285.54\,\mathrm{J}$. The reservoir loses heat $Q$ at the same temperature $300\,\mathrm{K}$. A reservoir is, by definition, large enough that this transfer is reversible for the reservoir and does not change its temperature, so

$$
\Delta S_{\mathrm{res}} = -\frac{Q}{T} = -\Delta S_{\mathrm{gas}} = -7.618\,\mathrm{J/K}.
$$

The entropy of the universe, gas plus reservoir, changes by zero. That is the signature of a reversible process: the system's entropy increase is paid for by the surroundings. Energy balances whether or not the path is reversible. Entropy balances only because this one was.
:::
:::

::: example A reversible adiabat has zero entropy change {#ex-adiabat}
One mole of ideal diatomic gas, with $C_{V,m} = \tfrac{5}{2} R$ and $\gamma = 7/5$, is compressed reversibly and adiabatically from $V_1$ to $V_1/2$. Take $T_1 = 300\,\mathrm{K}$. Show from [[#eq-delta-s-ideal]] that $\Delta S = 0$, and compute the two terms separately.
::: solution
A reversible adiabat has $\text{đ}Q_{\mathrm{rev}} = 0$, so the definition [[#eq-ds]] already says $\Delta S = 0$. The ideal-gas formula must agree, and the agreement is a check that the adiabat relation $T V^{\gamma - 1} = \mathrm{constant}$ is the same statement as $\dd S = 0$.

Here $\gamma - 1 = 2/5 = 0.4$ and $V_2/V_1 = 1/2$, so

$$
T_2 = T_1\left(\frac{V_1}{V_2}\right)^{\gamma - 1} = 300\times 2^{0.4}.
$$

Now $2^{0.4} = 1.319507910773$ and $T_2 = 395.852\,\mathrm{K}$. We do not need $T_2$ as a decimal to see the cancellation. From $T_2/T_1 = (V_1/V_2)^{\gamma - 1}$,

$$
\ln\frac{T_2}{T_1} = (\gamma - 1)\ln\frac{V_1}{V_2} = 0.4\ln 2.
$$

The heat-capacity term in [[#eq-delta-s-ideal]] is

$$
n C_{V,m}\ln\frac{T_2}{T_1} = \tfrac{5}{2} R\times 0.4\ln 2 = R\ln 2,
$$

because $\tfrac{5}{2}\times 0.4 = 1$ and $n = 1$. The volume term is

$$
n R\ln\frac{V_2}{V_1} = R\ln\tfrac{1}{2} = -R\ln 2.
$$

The sum is zero exactly. Numerically each term has magnitude $R\ln 2 = 5.763\,\mathrm{J/K}$. The compression warms the gas, and $Q = 0$ so the work done on the gas is $W = \Delta U = n C_{V,m}(T_2 - T_1) > 0$. An irreversible adiabatic compression between the same volumes would have $\Delta S > 0$ and a higher final temperature.
:::
:::

## The Clausius inequality

[[#eq-delta-s]] computes $\Delta S$ only on reversible paths. Irreversible paths have a different heat. The second law constrains that heat: a cycle cannot produce entropy for free, and it cannot destroy entropy either if it is reversible. The precise statement is an inequality for $\oint \text{đ}Q/T$.

The temperature in the denominator, for an irreversible process, needs a careful reading. We take $T$ to be the temperature of the reservoir that supplies the heat element $\text{đ}Q$, not a temperature assigned to a system that may not have one while the process is under way. When the process is reversible the two temperatures agree and the inequality becomes [[#eq-cycle-s]].

::: theorem Clausius inequality {#thm-clausius}
For any cycle of a closed system that exchanges heat with reservoirs,

$$
\oint \frac{\text{đ}Q}{T} \le 0,
$$ {#eq-clausius-cycle}

where $\text{đ}Q$ is the heat absorbed by the system and $T$ is the absolute temperature of the reservoir that supplies it. Equality holds if and only if the cycle is reversible. For a process from an equilibrium state $A$ to an equilibrium state $B$,

$$
\Delta S = S(B) - S(A) \ge \int_{A}^{B}\frac{\text{đ}Q}{T},
$$ {#eq-clausius}

with equality on a reversible path.
:::

::: proof
Let the system execute a cycle, absorbing heat $Q_i$ from a reservoir at temperature $T_i$. Some of the $Q_i$ may be negative. Introduce one auxiliary reservoir at a fixed temperature $T_0$, and for each $i$ a Carnot cycle operating between $T_0$ and $T_i$. Choose the Carnot cycle so that it restores reservoir $i$: the Carnot working substance absorbs heat $-Q_i$ from reservoir $i$, returning to reservoir $i$ the heat that the original system took. For that Carnot cycle

$$
\frac{Q_{0,i}}{T_0} + \frac{-Q_i}{T_i} = 0,
$$

so the heat it absorbs from the auxiliary reservoir is $Q_{0,i} = T_0\, Q_i/T_i$. Sum over every reservoir. Every intermediate reservoir is back as it started, and the original system has completed a cycle, so its internal energy is unchanged. The only remaining effect is that the auxiliary reservoir has given up heat

$$
Q_0 = \sum_i Q_{0,i} = T_0\oint\frac{\text{đ}Q}{T},
$$

and, by the first law applied to the collection of cycles, that heat has been converted entirely into work. The Kelvin–Planck statement of the second law, from [[thermodynamics/heat-engines]], says that a cycle cannot have as its only effect the complete conversion of heat from a single reservoir into work. Therefore $Q_0$ cannot be positive: $Q_0 \le 0$. Since $T_0 > 0$, [[#eq-clausius-cycle]] follows.

If the original cycle is reversible, it may be run backwards. The reversed cycle exchanges $-\text{đ}Q$ at the same temperatures, and the inequality applied to the reversal gives $-\oint\text{đ}Q/T \le 0$. Combined with [[#eq-clausius-cycle]] this forces equality.

For the second claim, take the system from $A$ to $B$ by the process of interest, and return from $B$ to $A$ by any reversible path. The composite is a cycle, so

$$
\int_{A}^{B}\frac{\text{đ}Q}{T} + \int_{B}^{A}\frac{\text{đ}Q_{\mathrm{rev}}}{T} \le 0.
$$

The return integral is $S(A) - S(B) = -\Delta S$. Rearrangement gives [[#eq-clausius]]. Equality holds when the whole cycle is reversible, hence when the outward path is reversible.
:::

[[#eq-clausius]] is the operational form. Compute $\Delta S$ from a reversible replacement, as in the free expansion. Compute $\int\text{đ}Q/T$ from what the apparatus actually does. The first number is at least as large as the second. Their difference is entropy produced, and it is zero only for a reversible path.

::: corollary Entropy of an isolated system {#cor-isolated}
The entropy of an isolated system does not decrease. If the system passes from one equilibrium state to another and exchanges no heat with its surroundings,

$$
\Delta S \ge 0,
$$

with equality when the process is reversible.
:::

::: proof
An isolated system has $\text{đ}Q = 0$ at its boundary, so the integral in [[#eq-clausius]] vanishes. The inequality collapses to $\Delta S \ge 0$. Equality holds on a reversible path. A reversible process in an isolated system is a reversible adiabat, already seen to be isentropic, so equality is $\Delta S = 0$ and not a new constraint.
:::

Free expansion sits inside this corollary. The insulated rigid box is isolated, $V_2 > V_1$, and $\Delta S = n R\ln(V_2/V_1) > 0$. The reversed gathering of the gas would have $\Delta S < 0$ and does not occur, although $Q$, $W$ and $\Delta U$ would still vanish. The corollary applies to the isolated whole, not to every subsystem: the gas in [[#ex-isotherm]] gains entropy, and the reservoir loses the same amount. A system that exports heat can have $\Delta S < 0$.

Heat flowing from a hot reservoir to a cold one is the standard illustration, and it does not require an ideal gas.

::: example Heat flowing between two reservoirs {#ex-heat-flow}
A quantity of heat $Q = 500\,\mathrm{J}$ leaves a reservoir at $400\,\mathrm{K}$ and enters a reservoir at $300\,\mathrm{K}$. There is no engine between them. Find the entropy change of each reservoir and of the pair.
::: solution
Each reservoir exchanges heat reversibly at its own fixed temperature. The hot reservoir absorbs $-500\,\mathrm{J}$, so

$$
\Delta S_h = \frac{-500}{400} = -1.25\,\mathrm{J/K}.
$$

The cold reservoir absorbs $+500\,\mathrm{J}$, so

$$
\Delta S_c = \frac{500}{300} = \frac{5}{3} = 1.6667\,\mathrm{J/K}.
$$

The pair, which is isolated if these are the only two bodies involved, changes by

$$
\Delta S = -\frac{5}{4} + \frac{5}{3} = \frac{-15 + 20}{12} = \frac{5}{12} = 0.4167\,\mathrm{J/K}.
$$

The result is positive because $300 < 400$: the same heat is divided by a smaller temperature when it arrives. Running the transfer backwards, heat leaving the cold reservoir and entering the hot one, would give $\Delta S = -5/12\,\mathrm{J/K}$ and is forbidden by [[#cor-isolated]]. That forbidden process is the Clausius statement of the second law: heat does not pass of itself from a colder body to a hotter one. An engine can move heat the other way, but only by doing work and rejecting still more heat, and the entropy books of a reversible Carnot refrigerator balance rather than go negative.
:::
:::

The same arithmetic is the Clausius statement in numbers: heat does not pass of itself from cold to hot, because that would make the composite entropy fall. A Kelvin–Planck violation, a cycle that turns heat from a single reservoir entirely into work, drops the reservoir's entropy and leaves the working substance unchanged over the cycle, so the composite entropy falls as well. The equivalence of those two verbal statements is set out in [[thermodynamics/heat-engines]]. The entropy integral is the form we calculate with.

One more process is worth doing with numbers, because it is the irreversible version of [[#ex-isochoric]] and the contrast is the point of the inequality.

::: example The same warming, done irreversibly {#ex-irreversible-warm}
One mole of ideal monatomic gas is warmed at constant volume from $300\,\mathrm{K}$ to $400\,\mathrm{K}$ by contact with a single reservoir at $400\,\mathrm{K}$. Find $\Delta S$ of the gas, of the reservoir, and of the universe.
::: solution
The endpoints of the gas are equilibrium states at the same volume, so [[#eq-delta-s-ideal]] still gives the gas's entropy change. It does not matter that the gas was not uniform in temperature while it warmed:

$$
\Delta S_{\mathrm{gas}} = n C_{V,m}\ln\frac{400}{300} = \tfrac{3}{2} R\ln\frac{4}{3}.
$$

With $\tfrac{3}{2} R = 12.471693927\,\mathrm{J/(mol\cdot K)}$ and $\ln(4/3) = 0.287682072452$,

$$
\Delta S_{\mathrm{gas}} = 12.471693927\times 0.287682072452 = 3.587883\,\mathrm{J/K},
$$

or $3.588\,\mathrm{J/K}$ to three decimals. This is half of the $7.176\,\mathrm{J/K}$ in [[#ex-isochoric]], because that example used two moles.

The actual heat absorbed by the gas equals $\Delta U$, since $W = 0$ at constant volume:

$$
Q = n C_{V,m}(400 - 300) = \tfrac{3}{2} R\times 100 = 1247.169\,\mathrm{J}.
$$

The reservoir supplies this heat at the fixed temperature $400\,\mathrm{K}$, so

$$
\Delta S_{\mathrm{res}} = -\frac{Q}{400} = -\frac{1247.169}{400} = -3.117923\,\mathrm{J/K}.
$$

The universe gains

$$
\Delta S_{\mathrm{univ}} = 3.587883 - 3.117923 = 0.46996\,\mathrm{J/K},
$$

about $0.470\,\mathrm{J/K}$. Check the inequality rather than the third digit. The integral of $\text{đ}Q/T$ for the gas, using the reservoir temperature, is $Q/400 = 3.118\,\mathrm{J/K}$, and $\Delta S_{\mathrm{gas}} = 3.588\,\mathrm{J/K}$ is larger, as [[#eq-clausius]] requires. The difference is the entropy produced by letting heat cross a finite temperature gap. A ladder of reservoirs, as in the reversible warming, would push that difference to zero while leaving $\Delta S_{\mathrm{gas}}$ unchanged.
:::
:::

## What the logarithm is doing

At fixed temperature, [[#eq-delta-s-ideal]] says that $\Delta S$ is proportional to $\ln(V_2/V_1)$. Doubling is worth $R\ln 2$ per mole, whatever the starting volume, and a further doubling is worth the same again. That is forced by $P/T = nR/V$: each extra $\dd V$ contributes $\text{đ}Q_{\mathrm{rev}}/T = nR\,\dd V/V$.

::: widget plot
f: ln(x)
x: 0.5, 4
caption: The horizontal axis is a volume ratio V2/V1 and the curve is ln of that ratio. For an ideal gas at fixed temperature, ΔS per mole, in units of R, is the height of the curve. At a ratio of 2 the height is ln 2, about 0.693, so one mole gains 5.763 J/K. At a ratio of 0.5 the height is the negative of that. The curve is steep near the left edge and flatter near a ratio of 4, so a given fractional expansion changes the entropy less once the gas is already dilute.
:::

Temperature cancels out of $\Delta S$ on an isotherm and remains in the heat, $Q_{\mathrm{rev}} = T\Delta S$. Read as $\ln(P_1/P_2)$, the same curve is the pressure form of the isothermal entropy change. Multiplied by $T$ rather than by $nR$, it is the change in the Gibbs function derived in [[thermodynamics/potentials]].

::: history Clausius names the quantity
In 1865 Rudolf Clausius, writing in the *Annalen der Physik*, gave the name entropy to the state function whose reversible differential is $\text{đ}Q_{\mathrm{rev}}/T$. The ratio itself is older in his work: the 1854 papers already isolate $\text{đ}Q/T$ as the combination that vanishes around a reversible cycle. He chose a noun close to energy, drawn from the Greek for a transformation. In that 1865 paper he set the two laws side by side: the energy of the world is constant, and its entropy tends towards a maximum, which is [[#cor-isolated]] applied to an isolated universe. The reading of $S$ as $k_B$ times a logarithm of multiplicity comes later, in [[statistical-mechanics]], and it is not required for any calculation here.
:::

Holding $S$ fixed is natural in [[#eq-du]] and awkward in the laboratory. The potentials in [[thermodynamics/potentials]] trade $S$ for $T$, and $V$ for $P$, and turn [[#eq-clausius]] into $\Delta F \le 0$ at fixed $T$ and $V$ and $\Delta G \le 0$ at fixed $T$ and $P$.

::: summary
- Entropy is defined by $\dd S = \text{đ}Q_{\mathrm{rev}}/T$. The integral of $\text{đ}Q_{\mathrm{rev}}/T$ around a reversible cycle vanishes, so $S$ is a state function. Differences of $S$ do not depend on the path used to compute them.
- For a closed hydrostatic system with expansion work only, $\dd U = T\,\dd S - P\,\dd V$. This relates equilibrium states. It does not identify $T\,\dd S$ with the actual heat of an irreversible process.
- For an ideal gas with constant $C_{V,m}$, $\Delta S = n C_{V,m}\ln(T_2/T_1) + n R\ln(V_2/V_1)$. The pressure form is $\Delta S = n C_{P,m}\ln(T_2/T_1) - n R\ln(P_2/P_1)$.
- Free expansion of an ideal gas into vacuum has $Q = 0$, $W = 0$, $\Delta U = 0$ and $\Delta T = 0$, but $\Delta S = n R\ln(V_2/V_1) > 0$. The logarithm is evaluated on a reversible replacement isotherm.
- The Clausius inequality says $\Delta S \ge \int\text{đ}Q/T$, with equality only on a reversible path. An isolated system has $\Delta S \ge 0$.
- Heat $Q$ flowing from $T_h$ to a colder $T_c$ produces entropy $Q(1/T_c - 1/T_h) > 0$. A reversible engine or refrigerator between the same temperatures produces none.
- $\Delta S = Q/T$ is legitimate only for reversible isothermal heat $Q$. A reversible adiabat is isentropic; an irreversible adiabat need not be. Entropy in this chapter is not a synonym for disorder.
:::

## Exercises

::: exercise Free expansion to three times the volume {#exr-triple level=1 check="8.314462618*ln(3)"}
One mole of ideal gas expands freely into vacuum, and the final volume is three times the initial volume. Find $\Delta S$.
::: solution
The process is isolated, so $Q = 0$ and $W = 0$, hence $\Delta U = 0$ and $\Delta T = 0$. Entropy is computed on a reversible isotherm between the same volumes. By [[#eq-delta-s-ideal]],

$$
\Delta S = n R\ln\frac{V_2}{V_1} = R\ln 3.
$$

With $\ln 3 = 1.098612288668$,

$$
\Delta S = 8.314462618\times 1.098612288668 = 9.13437\,\mathrm{J/K},
$$

which is $9.134\,\mathrm{J/K}$ to three decimal places. The temperature is not required. Using $\Delta S = Q/T = 0$ would apply the reversible isothermal formula to the wrong heat.
:::
:::

::: exercise Reversible isothermal doubling {#exr-isotherm-double level=1 check="8.314462618*ln(2)"}
One mole of ideal gas expands reversibly and isothermally until its volume doubles. Find the entropy change of the gas.
::: solution
Temperature is constant, so [[#eq-delta-s-ideal]] keeps only the volume term:

$$
\Delta S = n R\ln 2 = R\ln 2 = 5.76315\,\mathrm{J/K},
$$

or $5.763\,\mathrm{J/K}$. The same number was the free-expansion result in [[#ex-free]]. The gas does not know whether a piston or a broken partition joined the endpoints. What differs is the entropy of the surroundings: here a reservoir loses $5.763\,\mathrm{J/K}$, and the universe breaks even; in free expansion the surroundings exchange nothing, and the universe gains $5.763\,\mathrm{J/K}$.
:::
:::

::: exercise Isochoric doubling of temperature {#exr-isochoric-double level=1 check="1.5*8.314462618*ln(2)"}
One mole of ideal monatomic gas is heated reversibly at constant volume from $300\,\mathrm{K}$ to $600\,\mathrm{K}$. Find $\Delta S$.
::: solution
At constant volume,

$$
\Delta S = n C_{V,m}\ln\frac{T_2}{T_1} = \tfrac{3}{2} R\ln\frac{600}{300} = \tfrac{3}{2} R\ln 2.
$$

Numerically $\tfrac{3}{2} R\ln 2 = 1.5\times 5.76314632 = 8.64472\,\mathrm{J/K}$, so $\Delta S = 8.645\,\mathrm{J/K}$ to three decimals. The volume ratio is $1$ and contributes nothing. The factor $600/300 = 2$ is why the answer is a multiple of $R\ln 2$ rather than of $\ln(4/3)$ as in [[#ex-isochoric]].
:::
:::

::: exercise Temperature and volume both change {#exr-both level=2 check="1.5*8.314462618*ln(450/300)+8.314462618*ln(2.5)"}
One mole of ideal monatomic gas passes from $T_1 = 300\,\mathrm{K}$, $V_1 = 0.0100\,\mathrm{m^3}$ to $T_2 = 450\,\mathrm{K}$, $V_2 = 0.0250\,\mathrm{m^3}$. Find $\Delta S$.
::: hint
Use [[#eq-delta-s-ideal]] directly. The path is irrelevant once the endpoints are fixed. The volume ratio is $2.50$ and the temperature ratio is $1.50$.
:::
::: solution
Both terms contribute. With $n = 1$, $C_{V,m} = \tfrac{3}{2} R$, $T_2/T_1 = 1.50$ and $V_2/V_1 = 2.50$,

$$
\Delta S = \tfrac{3}{2} R\ln 1.50 + R\ln 2.50.
$$

The logarithms are $\ln 1.50 = 0.405465108108$ and $\ln 2.50 = 0.916290731874$. Then

$$
\tfrac{3}{2} R\ln 1.50 = 5.056837\,\mathrm{J/K}, \qquad R\ln 2.50 = 7.618465\,\mathrm{J/K},
$$

and

$$
\Delta S = 5.056837 + 7.618465 = 12.6753\,\mathrm{J/K}.
$$

To three decimal places, $\Delta S = 12.675\,\mathrm{J/K}$. Do not add a third term from the pressure form: that expression replaces the volume form, it does not supplement it.
:::
:::

::: exercise Two reversible steps {#exr-two-steps level=2 check="1.5*8.314462618*ln(4/3)+8.314462618*ln(2)"}
One mole of ideal monatomic gas is warmed reversibly at constant volume from $300\,\mathrm{K}$ to $400\,\mathrm{K}$, then expanded reversibly and isothermally until the volume has doubled relative to the volume during the warming. Find $\Delta S$ for the two steps together.
::: hint
Entropy is a state function, so add the two contributions. The isothermal step has no temperature term. The isochoric step has no volume term.
:::
::: solution
Step by step from [[#eq-delta-s-ideal]].

On the isochoric warming, $V$ is fixed and

$$
\Delta S_1 = \tfrac{3}{2} R\ln\frac{400}{300} = \tfrac{3}{2} R\ln\frac{4}{3} = 3.587883\,\mathrm{J/K}.
$$

On the isothermal expansion, $T$ is fixed at $400\,\mathrm{K}$ and $V_2/V_1 = 2$, so

$$
\Delta S_2 = R\ln 2 = 5.763146\,\mathrm{J/K}.
$$

The temperature of the isotherm does not appear in $\Delta S_2$. It would appear in $Q$ and $W$. Adding,

$$
\Delta S = 3.587883 + 5.763146 = 9.35103\,\mathrm{J/K},
$$

or $9.351\,\mathrm{J/K}$. The same total follows from the endpoints alone: temperature ratio $4/3$, volume ratio $2$, which is the expression in the check.
:::
:::

::: exercise Heat conducted across a gap {#exr-heat-gap level=2 check="2"}
Heat in the amount $1200\,\mathrm{J}$ flows directly from a reservoir at $600\,\mathrm{K}$ to a reservoir at $300\,\mathrm{K}$, with no engine in between. Find the entropy change of the two reservoirs together.
::: solution
The hot reservoir absorbs $-1200\,\mathrm{J}$ at $600\,\mathrm{K}$, and the cold reservoir absorbs $+1200\,\mathrm{J}$ at $300\,\mathrm{K}$:

$$
\Delta S = -\frac{1200}{600} + \frac{1200}{300} = -2 + 4 = 2\,\mathrm{J/K}.
$$

The positive result is required by [[#cor-isolated]]. In general the produced entropy is $Q(1/T_c - 1/T_h)$. Here that factor is $1/600$, and $1200/600 = 2\,\mathrm{J/K}$.
:::
:::

::: exercise Irreversible warming of one mole {#exr-single-reservoir level=3 check="1.5*8.314462618*ln(4/3)-1.5*8.314462618*100/400"}
One mole of ideal monatomic gas is taken at constant volume from $300\,\mathrm{K}$ to $400\,\mathrm{K}$ by contact with a single reservoir at $400\,\mathrm{K}$. Find the entropy change of the universe (gas plus reservoir).
::: hint
The gas's entropy change depends only on its endpoints. The reservoir's entropy change uses the actual heat and the reservoir temperature $400\,\mathrm{K}$. Their sum is what the question asks for. It must come out positive.
:::
::: solution
As in [[#ex-irreversible-warm]],

$$
\Delta S_{\mathrm{gas}} = \tfrac{3}{2} R\ln\frac{4}{3} = 3.587883\,\mathrm{J/K}.
$$

The heat leaving the reservoir is the heat entering the gas. At constant volume

$$
Q = \tfrac{3}{2} R\times 100 = 1247.169\,\mathrm{J}, \qquad \Delta S_{\mathrm{res}} = -\frac{Q}{400} = -3.117923\,\mathrm{J/K}.
$$

The universe therefore changes by

$$
\Delta S_{\mathrm{univ}} = 3.587883 - 3.117923 = 0.46996\,\mathrm{J/K},
$$

or $0.470\,\mathrm{J/K}$ to three decimals. Equality in [[#eq-clausius]] is not reached, because a finite temperature difference drives the heat. A ladder of reservoirs from just above $300\,\mathrm{K}$ up to $400\,\mathrm{K}$ would push the sum to zero while leaving $\Delta S_{\mathrm{gas}}$ unchanged.
:::
:::

::: exercise Two blocks in contact {#exr-blocks level=3 check="200*ln(350/400)+200*ln(350/300)"}
Two blocks have the same constant heat capacity $C = 200\,\mathrm{J/K}$. One is at $400\,\mathrm{K}$ and the other at $300\,\mathrm{K}$. They are placed in contact inside an insulated enclosure and left to reach equilibrium. Find the entropy change of the pair. Treat the heat capacity as constant, and treat each block's entropy change by $\int C\,\dd T/T$, which is the constant-volume formula for a body whose volume does not matter.
::: hint
Energy conservation fixes the final temperature before entropy is mentioned. The hotter block loses what the colder block gains. Then compute each $\Delta S$ from the integral of $C\,\dd T/T$.
:::
::: solution
Let the final common temperature be $T_f$. No heat leaves the enclosure, and no work is done on the pair, so the internal energy lost by the hot block equals the internal energy gained by the cold one. With equal heat capacities,

$$
C(400 - T_f) = C(T_f - 300).
$$

Cancel $C$, which is not zero: $400 - T_f = T_f - 300$, so $2T_f = 700$ and $T_f = 350\,\mathrm{K}$. The arithmetic mean is the equilibrium temperature only because $C$ is the same constant for both blocks. Unequal heat capacities would weight the average.

Each block changes its entropy along a reversible replacement at the same heat capacity, because entropy is a state function of the block:

$$
\Delta S_h = \int_{400}^{350}\frac{C\,\dd T}{T} = C\ln\frac{350}{400}, \qquad \Delta S_c = C\ln\frac{350}{300}.
$$

The logarithms are $\ln(350/400) = \ln 0.875 = -0.133531392624$ and $\ln(350/300) = \ln(7/6) = 0.154150679827$. Therefore

$$
\Delta S_h = 200\times(-0.133531392624) = -26.7063\,\mathrm{J/K},
$$

$$
\Delta S_c = 200\times 0.154150679827 = 30.8301\,\mathrm{J/K},
$$

and

$$
\Delta S = -26.7063 + 30.8301 = 4.1239\,\mathrm{J/K}.
$$

To three decimal places, $\Delta S = 4.124\,\mathrm{J/K}$. The sum is positive, as [[#cor-isolated]] requires, because $T_f^2 > T_h T_c$ whenever the two initial temperatures differ. Equal initial temperatures would give $\Delta S = 0$.
:::
:::
