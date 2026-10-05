A heat engine exists to turn heat into work. A fuel burns, a boiler holds a hot reservoir, and a cold reservoir receives the heat the engine does not use. The first law, $\Delta U = Q + W$ with $W$ the work done on the working substance, already constrains the books: over a cycle the substance returns to its starting state, so the net work output cannot exceed the net heat absorbed. The second law puts a ceiling on the fraction of the absorbed heat that can become work, and the ceiling depends only on the two temperatures.

This chapter calculates that ceiling. We define efficiency with the signs written out, build the Carnot cycle for an ideal gas and prove that its efficiency is $1 - T_c/T_h$, and then show why no engine running between the same two reservoirs can do better. Refrigerators are the same cycles run backwards. The absolute temperature is essential: the formula is false in degrees Celsius. The molecular picture of the working substance is not required here; [[thermodynamics/kinetic-theory]] explains why an ideal gas has $U = U(T)$, which we use, but the efficiency bound itself is not a statement about molecules.

The sign convention is the one fixed in [[thermodynamics/first-law]] and used throughout this course. Heat $Q$ absorbed by the system is positive. Work $W$ done on the system is positive, so a quasistatic expansion contributes $W = -\int P\,\dd V$, a negative number. The mechanical work–energy theorem $W_{\mathrm{net}} = \Delta K$ of [[mechanics/work-energy]] counts work done by the net force on a particle. It is not the $W$ in the first law. Whenever an engine "produces" work, that output is $-W$, and it will be given its own symbol.

## Cycles, reservoirs and efficiency

A **heat reservoir** is a body so large that the heat it exchanges during the process of interest does not change its temperature. An engine that we idealise as running between two reservoirs touches only those two: a hot one at absolute temperature $T_h$ and a cold one at $T_c < T_h$. The working substance — steam, a gas, whatever goes round inside — is the system. The reservoirs are the surroundings.

A **cycle** brings the working substance back to its initial thermodynamic state. Every state function returns to its initial value. In particular the internal energy does, so

$$
\Delta U = 0 \qquad\text{over a cycle}.
$$ {#eq-cycle-u}

The first law on that same loop reads $0 = Q_{\mathrm{net}} + W_{\mathrm{on}}$, where $Q_{\mathrm{net}}$ is the total heat absorbed by the substance and $W_{\mathrm{on}}$ is the total work done on it.

It is easy to lose the signs once two reservoirs are involved, so the symbols are fixed here and kept.

::: definition Heat engine {#def-engine}
A **heat engine** between two reservoirs absorbs heat $Q_h > 0$ from the hot reservoir and heat $Q_c$ from the cold reservoir, and returns its working substance to the initial state. For an engine, heat leaves into the cold reservoir, so $Q_c < 0$. Write $|Q_c| = -Q_c$ for the heat rejected.

The work done on the working substance over the cycle is $W_{\mathrm{on}}$. The work done by the engine on the surroundings is

$$
W_{\mathrm{by}} = -W_{\mathrm{on}}.
$$ {#eq-wby}

The **efficiency** is the work output divided by the heat paid for at the hot reservoir,

$$
\eta = \frac{W_{\mathrm{by}}}{Q_h}.
$$ {#eq-eta-def}
:::

::: proposition Efficiency and the two heats {#prop-eta}
For any heat engine in the sense of [[#def-engine]],

$$
W_{\mathrm{on}} = -(Q_h + Q_c), \qquad W_{\mathrm{by}} = Q_h - |Q_c|, \qquad \eta = 1 - \frac{|Q_c|}{Q_h}.
$$ {#eq-eta}
:::

::: proof
Over the cycle $\Delta U = 0$, so the first law gives $Q_h + Q_c + W_{\mathrm{on}} = 0$, which is the first identity. Then $W_{\mathrm{by}} = -W_{\mathrm{on}} = Q_h + Q_c$. Because $Q_c = -|Q_c|$, this is $W_{\mathrm{by}} = Q_h - |Q_c|$. Divide by $Q_h > 0$:

$$
\eta = \frac{Q_h - |Q_c|}{Q_h} = 1 - \frac{|Q_c|}{Q_h}.
$$

No property of the working substance was used, and the path between the two end states of each leg was not used. The result is bookkeeping.
:::

Efficiency is at most $1$, and it equals $1$ only if $|Q_c| = 0$: nothing rejected to the cold reservoir. The first law permits that. An engine that swallowed heat $Q_h$ and emitted work $Q_h$, with $\Delta U = 0$, would balance. The second law, later in the chapter, forbids it when the heat comes from a single reservoir. Until that statement is in place, $\eta = 1 - |Q_c|/Q_h$ is a definition plus the first law, not a limit.

The heat $Q_h$ is the cost, because that is the heat you supplied by burning fuel or by maintaining the hot reservoir. The rejected heat $|Q_c|$ is not a second credit. Counting $Q_h + |Q_c|$ as the input double-counts nothing useful and produces a number that is not the efficiency. Counting $W_{\mathrm{by}}/|Q_c|$ is a different ratio, sometimes used for a heat pump, and it is not $\eta$.

::: intuition You pay for the heat that enters
Over a cycle the energy books close. Whatever does not leave as work leaves as heat into the cold reservoir. A larger $|Q_c|$ is a smaller $W_{\mathrm{by}}$, at fixed $Q_h$. The cold reservoir is not an optional extra: without somewhere to reject heat, a cyclic engine between a single temperature cannot produce work. That last sentence is the second law, still ahead; the algebra that makes $|Q_c|$ subtract from the output is only the first law.
:::

## Quasistatic legs of an ideal gas

The Carnot cycle is four legs: two isotherms and two adiabats. Each one is standard, but the signs have to match [[#def-engine]], so we record them before assembling the cycle. The working substance is an ideal gas with constant molar heat capacity $C_{V,m}$, hence constant $\gamma = C_{P,m}/C_{V,m}$ and $C_{P,m} - C_{V,m} = R$. For such a gas $U$ depends only on $T$, and $\Delta U = n C_{V,m}\,\Delta T$.

On a quasistatic path the pressure of the gas is defined at each step and the work done on the gas is $W = -\int P\,\dd V$.

On an isotherm, $\Delta T = 0$, so $\Delta U = 0$ and $Q = -W$. With $P = n R T/V$,

$$
W_{\mathrm{on}} = -\int_{V_i}^{V_f} \frac{n R T}{V}\,\dd V = -n R T \ln\frac{V_f}{V_i},
$$ {#eq-wisotherm}

and the heat absorbed by the gas is

$$
Q = n R T \ln\frac{V_f}{V_i}.
$$ {#eq-qisotherm}

Expansion ($V_f > V_i$) makes $Q$ positive: the gas absorbs heat and does work on the surroundings. Compression makes $Q$ negative: the gas rejects heat.

An adiabat has $Q = 0$ along the leg. Quasistatic and free of friction, it is reversible, and the first law collapses to $\dd U = -P\,\dd V$.

::: proposition Ideal-gas adiabat {#prop-adiabat}
For a quasistatic adiabatic process in an ideal gas with constant $C_{V,m}$,

$$
T V^{\gamma - 1} = \text{constant}, \qquad P V^{\gamma} = \text{constant},
$$ {#eq-adiabat}

where $\gamma = C_{P,m}/C_{V,m}$. The work done on the gas between two temperatures is

$$
W_{\mathrm{on}} = n C_{V,m}(T_f - T_i) = \Delta U,
$$ {#eq-wadiabat}

since $Q = 0$.
:::

::: proof
The hypotheses give $\dd U = n C_{V,m}\,\dd T$ and $\dd U = -P\,\dd V$, with $P = n R T/V$. Therefore

$$
n C_{V,m}\,\dd T = -\frac{n R T}{V}\,\dd V.
$$

Cancel $n \neq 0$ and separate the variables, for $T > 0$ and $V > 0$:

$$
C_{V,m}\,\frac{\dd T}{T} = -R\,\frac{\dd V}{V}.
$$

Integrate from an initial state to a final state:

$$
C_{V,m}\ln\frac{T_f}{T_i} = -R\ln\frac{V_f}{V_i} = R\ln\frac{V_i}{V_f}.
$$

Divide by $C_{V,m}$. Because $C_{P,m} - C_{V,m} = R$, the ratio $R/C_{V,m}$ equals $\gamma - 1$, and

$$
\frac{T_f}{T_i} = \left(\frac{V_i}{V_f}\right)^{\gamma - 1}.
$$

Hence $T_f V_f^{\gamma - 1} = T_i V_i^{\gamma - 1}$. Substitute $T = P V/(n R)$ and clear the constants to obtain $P V^{\gamma} = \text{constant}$. On the whole leg $Q = 0$, so $W_{\mathrm{on}} = \Delta U = n C_{V,m}(T_f - T_i)$.
:::

The derivation is the one used in [[thermodynamics/first-law]]; it is repeated because the Carnot argument needs the exponent $\gamma - 1$ in plain view. Compression on an adiabat raises the temperature, so $T_f > T_i$ and $W_{\mathrm{on}} > 0$: work is done on the gas, and that work stays in the gas as internal energy because no heat leaves. Expansion does the opposite. Neither leg exchanges heat, so neither leg contributes to $Q_h$ or to $Q_c$.

## The Carnot cycle

A **Carnot cycle** is a reversible cycle made of two isotherms and two adiabats. Reversible, here, means three things at once. The substance passes through equilibrium states, so the path can be drawn on a $PV$ diagram. On the hot isotherm the gas is at $T_h$, the same temperature as the hot reservoir, not a finite step below it. On the cold isotherm the gas is at $T_c$. The adiabats exchange no heat. There is no friction. Any one of those failures makes the cycle not a Carnot cycle, and the efficiency derived below is then only an upper bound, not the value attained.

Run as an engine, the four legs for an ideal gas are these.

1. **Hot isotherm.** The gas expands at $T_h$ from volume $V_a$ to volume $V_b > V_a$. It absorbs heat from the hot reservoir. By [[#eq-qisotherm]],

$$
Q_h = n R T_h \ln\frac{V_b}{V_a} > 0.
$$ {#eq-qh}

2. **Adiabatic expansion.** The gas is insulated and expands from $V_b$ to $V_c$. The temperature falls from $T_h$ to $T_c$. No heat is exchanged. [[#eq-adiabat]] gives $T_h V_b^{\gamma - 1} = T_c V_c^{\gamma - 1}$.

3. **Cold isotherm.** The gas is compressed at $T_c$ from $V_c$ to $V_d < V_c$. It rejects heat to the cold reservoir. The heat absorbed by the gas is negative:

$$
Q_c = n R T_c \ln\frac{V_d}{V_c} < 0, \qquad |Q_c| = n R T_c \ln\frac{V_c}{V_d}.
$$ {#eq-qc}

4. **Adiabatic compression.** Insulated, the gas is compressed from $V_d$ back to $V_a$. The temperature rises from $T_c$ to $T_h$, and $T_c V_d^{\gamma - 1} = T_h V_a^{\gamma - 1}$. Again no heat is exchanged.

On the $PV$ diagram the isotherms are the hyperbolas $P V = \text{constant}$. The adiabats are steeper, because $P V^{\gamma} = \text{constant}$ with $\gamma > 1$, so $| \dd P/\dd V |$ is larger at a given point than on the isotherm through that point. The cycle is a closed loop, traversed clockwise for an engine: expansion at the higher pressure, compression at the lower pressure, and the enclosed area equals $W_{\mathrm{by}}$.

::: theorem Carnot efficiency of an ideal gas {#thm-carnot}
A Carnot engine using an ideal gas of constant heat capacity, operating between absolute temperatures $T_h$ and $T_c$, has efficiency

$$
\eta = 1 - \frac{T_c}{T_h}.
$$ {#eq-carnot}

Equivalently, $|Q_c|/Q_h = T_c/T_h$. The ratio does not depend on $n$, on $\gamma$, or on the size of the volume change.
:::

::: proof
The heats are [[#eq-qh]] and [[#eq-qc]]. Their ratio is

$$
\frac{|Q_c|}{Q_h} = \frac{T_c}{T_h}\cdot\frac{\ln(V_c/V_d)}{\ln(V_b/V_a)},
$$

so it is enough to show that the two volume ratios are equal. The adiabats supply

$$
T_h V_b^{\gamma - 1} = T_c V_c^{\gamma - 1}, \qquad T_h V_a^{\gamma - 1} = T_c V_d^{\gamma - 1}.
$$

Divide the first by the second. Since $T_h$ and $T_c$ are positive,

$$
\left(\frac{V_b}{V_a}\right)^{\gamma - 1} = \left(\frac{V_c}{V_d}\right)^{\gamma - 1}.
$$

Here $\gamma - 1 = R/C_{V,m} > 0$, so the function $x \mapsto x^{\gamma - 1}$ is one-to-one on positive reals, and $V_b/V_a = V_c/V_d$. The logarithms agree. Therefore $|Q_c|/Q_h = T_c/T_h$, and [[#eq-eta]] gives $\eta = 1 - T_c/T_h$.

The exponent $\gamma - 1$ cancelled when the ratios were identified. A monatomic gas and a diatomic gas, with different $\gamma$, trace different adiabats and reach different intermediate volumes, but the efficiency between the same two temperatures is the same.
:::

One cancellation is worth seeing on the work rather than on the heats. The two adiabats run between the same two temperatures, one downward and one upward, so their works on the gas are $n C_{V,m}(T_c - T_h)$ and $n C_{V,m}(T_h - T_c)$. They sum to zero. All of the net work comes from the isotherms:

$$
\begin{aligned}
W_{\mathrm{on}}
&= -n R T_h \ln\frac{V_b}{V_a} - n R T_c \ln\frac{V_d}{V_c} \\
&= -n R (T_h - T_c)\ln\frac{V_b}{V_a},
\end{aligned}
$$

where the second line uses $V_c/V_d = V_b/V_a$. Hence $W_{\mathrm{by}} = n R (T_h - T_c)\ln(V_b/V_a)$, and dividing by $Q_h = n R T_h \ln(V_b/V_a)$ again yields $1 - T_c/T_h$. If a calculation of a Carnot cycle produces a net adiabatic work that is not zero, a temperature or a sign has been assigned to the wrong leg.

The temperatures in [[#eq-carnot]] are absolute. A shift of zero changes the ratio, so Celsius readings do not belong in it. The warning below works a specimen.

::: widget plot
f: 1-300/x
x: 300, 1200
caption: Carnot efficiency against hot-reservoir temperature for $T_c = 300\,\mathrm{K}$. The curve is $1 - 300/T_h$. It is zero when $T_h = T_c$ and it reaches $1$ only as $T_h$ grows without bound. No choice of the volume ratio on the isotherms moves the curve.
:::

The figure is [[#eq-carnot]] at $T_c = 300\,\mathrm{K}$: one half at $600\,\mathrm{K}$, three quarters at $1200\,\mathrm{K}$, and $1$ only as $T_h$ grows without bound.

::: example A Carnot engine and a less efficient one {#ex-500-300}
A Carnot engine runs between $T_h = 500\,\mathrm{K}$ and $T_c = 300\,\mathrm{K}$ and absorbs $Q_h = 1000\,\mathrm{J}$ from the hot reservoir. Find $\eta$, $W_{\mathrm{by}}$, $W_{\mathrm{on}}$, $Q_c$ and $|Q_c|$. A real engine between the same reservoirs, with the same $Q_h$, has $\eta = 0.25$. Find its work output and the heat it rejects.
::: solution
[[#eq-carnot]] gives

$$
\eta = 1 - \frac{300}{500} = 1 - 0.600 = 0.400.
$$

The definition [[#eq-eta-def]] then fixes the output: $W_{\mathrm{by}} = \eta Q_h = 0.400\times 1000 = 400\,\mathrm{J}$. The work done on the working substance is the opposite, $W_{\mathrm{on}} = -400\,\mathrm{J}$. From [[#eq-eta]], $|Q_c| = Q_h - W_{\mathrm{by}} = 600\,\mathrm{J}$, so the heat absorbed from the cold reservoir is $Q_c = -600\,\mathrm{J}$. The first law closes: $\Delta U = Q_h + Q_c + W_{\mathrm{on}} = 1000 + (-600) + (-400) = 0$.

The real engine is not claimed to be reversible. Its efficiency is given as a measured fraction, not as $1 - T_c/T_h$. With $\eta = 0.25$ and the same $Q_h$,

$$
W_{\mathrm{by}} = 0.25\times 1000 = 250\,\mathrm{J}, \qquad |Q_c| = 1000 - 250 = 750\,\mathrm{J}.
$$

So $W_{\mathrm{on}} = -250\,\mathrm{J}$ and $Q_c = -750\,\mathrm{J}$. Again $\Delta U = 1000 - 750 - 250 = 0$. The real engine produces $150\,\mathrm{J}$ less work per cycle and dumps an extra $150\,\mathrm{J}$ into the cold reservoir. Nothing in the first law is offended. The second law, in [[#thm-limit]], is what says that $0.25$ had to lie at or below $0.400$, and that $0.400$ itself is attained only by a reversible engine.
:::
:::

::: example Volumes on an ideal-gas Carnot cycle {#ex-volumes}
One mole of diatomic ideal gas, $\gamma = 1.40$, executes a Carnot cycle between $500\,\mathrm{K}$ and $300\,\mathrm{K}$. The hot isotherm runs from $V_a = 0.0100\,\mathrm{m^3}$ to $V_b = 0.0200\,\mathrm{m^3}$. Find the other two volumes, the two heats, and $W_{\mathrm{by}}$. Use $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$.
::: solution
The isotherm ratio is $V_b/V_a = 2$. [[#eq-qh]] gives the heat absorbed from the hot reservoir,

$$
Q_h = (1.00)\, R\, (500)\, \ln 2 = 2881.57\,\mathrm{J}.
$$

[[#thm-carnot]] already fixes $|Q_c| = Q_h \cdot (300/500) = 1728.94\,\mathrm{J}$ and

$$
W_{\mathrm{by}} = Q_h - |Q_c| = 1152.63\,\mathrm{J},
$$

so $W_{\mathrm{on}} = -1152.63\,\mathrm{J}$ and $Q_c = -1728.94\,\mathrm{J}$. The volumes confirm where the adiabats land. From $T V^{\gamma - 1} = \text{constant}$ with $\gamma - 1 = 0.40$,

$$
\frac{V_c}{V_b} = \left(\frac{T_h}{T_c}\right)^{1/(\gamma - 1)} = \left(\frac{500}{300}\right)^{2.5} = \left(\frac{5}{3}\right)^{2.5} = 3.586.
$$

Thus $V_c = 0.0200\times 3.586 = 0.0717\,\mathrm{m^3}$ and, because $V_c/V_d = V_b/V_a = 2$, the volume $V_d = 0.0359\,\mathrm{m^3}$. The cold isotherm really does reject

$$
|Q_c| = R \cdot 300 \cdot \ln 2 = 1728.94\,\mathrm{J},
$$

the same number, because the volume ratio matched. With $C_{V,m} = \tfrac52 R$ each adiabat carries $\tfrac52 R\cdot 200 = 4157.23\,\mathrm{J}$, opposite in sign, so those two works cancel and the net $W_{\mathrm{on}}$ is $-1152.63\,\mathrm{J}$. Changing $\gamma$ would move $V_c$ and $V_d$ without changing the heats or $W_{\mathrm{by}}$.
:::
:::

## Two statements of the second law

The first law did not forbid an engine with $|Q_c| = 0$, and it did not forbid a device that moves heat from a cold body to a hot one without any work. Both are forbidden. The prohibitions are the second law, stated here in the two forms we need, and then shown to be the same prohibition.

**Kelvin–Planck statement.** No cyclic process is possible whose only effect is to absorb heat from a single reservoir and convert it entirely into work.

**Clausius statement.** No process is possible whose only effect is the transfer of heat from a colder body to a hotter body.

The words "only effect" carry both sentences. A refrigerator moves heat from cold to hot, but only while work is supplied and a still larger heat is delivered to the hot side. An isothermal expansion of an ideal gas turns absorbed heat into work, but the gas does not return to its initial volume. Restoring it on a cycle puts the energy back.

The two statements are equivalent, by a pair of constructions.

Suppose a device violates the Clausius statement, moving heat $Q > 0$ from cold to hot and doing nothing else. Run beside it an ordinary engine that rejects heat $Q$ to the cold reservoir, absorbs $Q_h > Q$ from the hot one, and produces $W_{\mathrm{by}} = Q_h - Q$. A Carnot engine of suitable size will do. In the combined box the cold reservoir is untouched. The hot reservoir loses $Q_h - Q$, and that amount leaves as work. The only effect is the complete conversion of heat taken from a single reservoir into work, which the Kelvin–Planck statement forbids.

Suppose instead a device violates the Kelvin–Planck statement, turning heat $Q_h$ from the hot reservoir entirely into work and ignoring the cold reservoir. Use that work to drive an ordinary refrigerator, which takes heat $Q_c > 0$ from the cold reservoir and delivers $Q_c + Q_h$ to the hot one. The work cancels inside the box. The cold reservoir loses $Q_c$ and the hot reservoir gains $Q_c$. The only effect is a transfer of heat from cold to hot, which the Clausius statement forbids.

Each statement therefore implies the other. The efficiency bound below is the Clausius form applied to an engine that is too good: wire it to a reversed Carnot cycle and heat flows the wrong way.

## No engine beats Carnot

[[#thm-carnot]] is an ideal-gas calculation. The bound is wider than that. The argument uses only the second law and the existence of one reversible engine, the Carnot engine, whose ratio $|Q_c|/Q_h$ we already know.

::: theorem Carnot limit {#thm-limit}
No heat engine operating between two reservoirs at $T_h$ and $T_c$ can have an efficiency greater than a Carnot engine between those reservoirs. Every reversible engine between those two reservoirs has the same efficiency. On the absolute temperature scale fixed by the ideal gas, that efficiency is $1 - T_c/T_h$.
:::

::: proof
Let $R$ be a Carnot engine, reversible by construction, and let $E$ be any engine, both between the same two reservoirs. Run $E$ forwards and run $R$ backwards, as a refrigerator, and scale the two so that the work output of $E$ equals the work input of the reversed $R$. Call that common positive amount $W$.

As an engine, $R$ would have absorbed heat $Q_h^{R} = W/\eta_R$ from the hot reservoir and rejected $|Q_c^{R}| = Q_h^{R} - W$. Run backwards, it absorbs $|Q_c^{R}|$ from the cold reservoir and delivers $Q_h^{R}$ to the hot reservoir, while consuming work $W$. The engine $E$ absorbs $Q_h^{E} = W/\eta_E$ from the hot reservoir and rejects $|Q_c^{E}| = Q_h^{E} - W$ to the cold one.

Suppose, for a contradiction, that $\eta_E > \eta_R$. Then $Q_h^{E} < Q_h^{R}$, because both equal $W$ divided by the efficiency. Consider the two devices as one. The net work is zero. The hot reservoir gains $Q_h^{R}$ from the reversed Carnot engine and loses $Q_h^{E}$ to $E$, so it gains the positive amount $Q_h^{R} - Q_h^{E}$. The cold reservoir loses that same amount, because the combined internal energy and the combined work are unchanged and the first law still holds for the pair. The only effect is a transfer of heat from the cold reservoir to the hot one. The Clausius statement forbids it. Therefore the supposition is false, and $\eta_E \le \eta_R$.

If $E$ is itself reversible, the same argument with the names exchanged gives $\eta_R \le \eta_E$. The two efficiencies agree. [[#thm-carnot]] says that the ideal-gas Carnot engine attains $1 - T_c/T_h$. Every reversible engine between the same temperatures attains it too, whether or not the working substance is an ideal gas. Every irreversible engine lies strictly below it, or at best touches it only in the reversible limit.
:::

The ideal-gas cycle pins $1 - T_c/T_h$ to the gas scale; [[#thm-limit]] spreads that number to every reversible engine. A cycle that touches more than two temperatures is not covered by the two-reservoir statement. [[#ex-rectangle]] is such a cycle, and the general bound is the entropy inequality in [[thermodynamics/entropy]].

::: quiz
The formula $\eta = 1 - T_c/T_h$ is
- [ ] the efficiency of every engine that operates between $T_c$ and $T_h$, reversible or not
- [x] the efficiency of every reversible engine between those two reservoirs, and an upper bound on the others
- [ ] valid when $T_c$ and $T_h$ are replaced by the corresponding Celsius temperatures
- [ ] equal to $1$ whenever $T_h = 2 T_c$
::: solution
[[#thm-limit]] is the second option. An irreversible engine between the same reservoirs has a lower efficiency; the real engine in [[#ex-500-300]] is an example, $0.25$ against a Carnot value of $0.400$. Celsius temperatures do not belong in the ratio: the zero of the scale matters. And $T_h = 2 T_c$ gives $\eta = 1 - 1/2 = 1/2$, not $1$. The efficiency reaches $1$ only in the limit $T_c/T_h \to 0$.
:::
:::

::: example A cycle that is not Carnot {#ex-rectangle}
One mole of monatomic ideal gas executes the following cycle. Start at $V_1 = 0.0200\,\mathrm{m^3}$ and $T_A = 300\,\mathrm{K}$. Heat at constant volume to $600\,\mathrm{K}$. Expand at constant pressure until $T = 1200\,\mathrm{K}$. Cool at constant volume to $600\,\mathrm{K}$. Compress at constant pressure back to the start. Find the heat absorbed, the work output and the efficiency. Explain why the answer is not $1 - 300/1200$.
::: solution
Label the corners $A(300\,\mathrm{K}, V_1)$, $B(600\,\mathrm{K}, V_1)$, $C(1200\,\mathrm{K}, 2V_1)$ and $D(600\,\mathrm{K}, 2V_1)$. The isobaric expansion doubles the volume and therefore doubles the absolute temperature, and the return isobar runs from $600\,\mathrm{K}$ to $300\,\mathrm{K}$ because the pressure there is half the upper pressure. For a monatomic gas $C_{V,m} = \tfrac32 R$ and $C_{P,m} = \tfrac52 R$.

Heat is absorbed on $A\to B$ and on $B\to C$, where the temperature rises:

$$
\begin{aligned}
Q_{AB} &= \tfrac32 R \cdot (600 - 300) = 450\, R = 3741.51\,\mathrm{J}, \\
Q_{BC} &= \tfrac52 R \cdot (1200 - 600) = 1500\, R = 12471.69\,\mathrm{J}.
\end{aligned}
$$

The total heat absorbed is $Q_{\mathrm{in}} = 1950\, R = 16213.20\,\mathrm{J}$. Heat is rejected on the other two legs,

$$
\begin{aligned}
Q_{CD} &= \tfrac32 R \cdot (600 - 1200) = -900\, R = -7483.02\,\mathrm{J}, \\
Q_{DA} &= \tfrac52 R \cdot (300 - 600) = -750\, R = -6235.85\,\mathrm{J},
\end{aligned}
$$

so $Q_{\mathrm{out}} = -1650\, R = -13718.86\,\mathrm{J}$. Over the cycle $\Delta U = 0$, and

$$
W_{\mathrm{by}} = Q_{\mathrm{in}} + Q_{\mathrm{out}} = 300\, R = 2494.34\,\mathrm{J}.
$$

The efficiency, with $Q_{\mathrm{in}}$ in the role of the heat we had to supply, is

$$
\eta = \frac{300\, R}{1950\, R} = \frac{2}{13} = 0.1538.
$$

The work can be checked from the isobars alone, since the isochoric legs have $\dd V = 0$ and contribute $W_{\mathrm{on}} = 0$. On $B\to C$, $W_{\mathrm{on}} = -P\,\Delta V = -n R \Delta T = -600\, R$. On $D\to A$, $W_{\mathrm{on}} = -n R (300 - 600) = +300\, R$. The net $W_{\mathrm{on}} = -300\, R$, and $W_{\mathrm{by}} = 300\, R$.

The value $1 - 300/1200 = 0.750$ is not this efficiency. Heat enters at every temperature from $300\,\mathrm{K}$ to $1200\,\mathrm{K}$, not from one reservoir at $1200\,\mathrm{K}$, so [[#thm-limit]] does not apply. The efficiency of the loop is the ratio just computed, $2/13$.
:::
:::

## Refrigerators

Run a Carnot cycle backwards. The working substance absorbs heat from the cold reservoir, rejects heat to the hot reservoir, and has positive work done on it. That is a refrigerator if the purpose is to remove heat from the cold body, and a heat pump if the purpose is to deliver heat to the hot body. The first-law symbols of [[#def-engine]] still apply, with the signs reversed: now $Q_c > 0$, $Q_h < 0$ and $W_{\mathrm{on}} > 0$.

::: definition Coefficient of performance {#def-cop}
For a refrigerator, let $|Q_c|$ be the heat removed from the cold reservoir in one cycle, and let $W_{\mathrm{by}}$ be the positive work that must be supplied to the working substance, so $W_{\mathrm{by}} = W_{\mathrm{on}}$ in the sign convention of this course. The **coefficient of performance** is

$$
\mathrm{COP} = \frac{|Q_c|}{W_{\mathrm{by}}}.
$$ {#eq-cop}

The heat delivered to the hot reservoir has magnitude $|Q_h| = |Q_c| + W_{\mathrm{by}}$.
:::

The symbol $W_{\mathrm{by}}$ was the work output of an engine. In [[#eq-cop]] it is the work input of the refrigerator, still a positive quantity, equal to the work done on the substance. The sentence in the definition is the whole of the distinction. Using $W_{\mathrm{on}}$ for both, with its algebraic sign, avoids the ambiguity: for an engine $W_{\mathrm{on}} < 0$ and $\eta = -W_{\mathrm{on}}/Q_h$; for a refrigerator $W_{\mathrm{on}} > 0$ and $\mathrm{COP} = Q_c/W_{\mathrm{on}}$.

::: corollary Carnot refrigerator {#cor-cop}
A reversed Carnot cycle between $T_h$ and $T_c$ has

$$
\mathrm{COP} = \frac{T_c}{T_h - T_c}.
$$ {#eq-cop-carnot}

If the same cycle is used as a heat pump, the heat delivered to the hot side per unit work input is $T_h/(T_h - T_c) = \mathrm{COP} + 1$.
:::

::: proof
Reversing the engine swaps the signs of $Q_h$, $Q_c$ and $W_{\mathrm{on}}$ and leaves the ratios of their magnitudes unchanged. From [[#thm-carnot]], $|Q_c|/|Q_h| = T_c/T_h$ still holds, with $|Q_c|$ now the heat removed from the cold reservoir. The first law gives $W_{\mathrm{by}} = |Q_h| - |Q_c|$. Therefore

$$
\mathrm{COP} = \frac{|Q_c|}{|Q_h| - |Q_c|} = \frac{T_c}{T_h - T_c}.
$$

The heat-pump ratio is $|Q_h|/W_{\mathrm{by}} = |Q_h|/(|Q_h| - |Q_c|) = T_h/(T_h - T_c)$. Subtracting the two displayed results gives $1$, so the heat-pump ratio equals $\mathrm{COP} + 1$. The same identity is $|Q_h| = |Q_c| + W_{\mathrm{by}}$ divided by $W_{\mathrm{by}}$.
:::

A coefficient of performance may exceed $1$. That means the heat removed from the cold body is larger than the work supplied, which the first law permits because the hot reservoir receives both contributions. It is not a machine that produces energy. For the temperatures of [[#ex-500-300]] the Carnot refrigerator would have $\mathrm{COP} = 300/(500 - 300) = 1.5$, and the corresponding engine efficiency is $0.400$. In general the two numbers are related by $\mathrm{COP} = (1 - \eta)/\eta$ when $\eta = 1 - T_c/T_h$.

::: example A domestic Carnot refrigerator {#ex-fridge}
A reversible refrigerator holds its interior at $270\,\mathrm{K}$ and rejects heat to a kitchen at $300\,\mathrm{K}$. In one cycle it removes $900\,\mathrm{J}$ from the interior. Find the COP, the work that must be supplied, and the heat delivered to the kitchen.
::: solution
[[#eq-cop-carnot]] gives

$$
\mathrm{COP} = \frac{270}{300 - 270} = \frac{270}{30} = 9.
$$

This is greater than $1$, as a refrigerator's coefficient is allowed to be. The work input follows from the definition:

$$
W_{\mathrm{by}} = \frac{|Q_c|}{\mathrm{COP}} = \frac{900}{9} = 100\,\mathrm{J}.
$$

In the engine sign convention this work is done on the working substance, so $W_{\mathrm{on}} = +100\,\mathrm{J}$. The kitchen receives

$$
|Q_h| = |Q_c| + W_{\mathrm{by}} = 900 + 100 = 1000\,\mathrm{J}.
$$

Energy balances: $900\,\mathrm{J}$ from the interior plus $100\,\mathrm{J}$ of work become $1000\,\mathrm{J}$ in the kitchen. The engine efficiency between the same temperatures is $0.100$, and $(1 - \eta)/\eta = 9$. A real refrigerator, with temperature gaps and compressor friction, lies below this Carnot coefficient.
:::
:::

::: warning Carnot's ratio is not a universal formula for every loop
The expression $1 - T_c/T_h$ is the efficiency of a reversible engine operating between two reservoirs at those absolute temperatures. It is not the efficiency of an arbitrary cycle that happens to reach a maximum temperature $T_h$ and a minimum temperature $T_c$. The four-leg loop in [[#ex-rectangle]] has $\eta = 2/13$, not $1 - 300/1200$. Temperatures in the ratio must be kelvin. Fed with the Celsius readings $227^{\circ}\mathrm{C}$ and $27^{\circ}\mathrm{C}$, which are the same two reservoirs as $500\,\mathrm{K}$ and $300\,\mathrm{K}$, the expression $1 - 27/227$ returns $0.881$ instead of $0.400$. A refrigerator's COP may exceed $1$; [[#ex-fridge]] has $\mathrm{COP} = 9$. That does not violate the first law, because the heat delivered to the hot side is $|Q_c| + W_{\mathrm{by}}$, larger than the work alone.
:::

## Where this leads

Clausius's entropy, defined in [[thermodynamics/entropy]] by $\dd S = \dd Q_{\mathrm{rev}}/T$, turns [[#thm-limit]] into $\Delta S \ge 0$ for an isolated system. The adiabats of this chapter are the curves of constant entropy. The potentials in [[thermodynamics/potentials]] convert the same inequality into a test at fixed $T$ and $P$.

::: history A water-wheel of heat, rewritten after the first law
Sadi Carnot published *Réflexions sur la puissance motrice du feu* in 1824, before the first law existed in any settled form. He argued from the caloric theory, in which heat was a conserved fluid. On that picture an engine does not consume heat: the same caloric enters from the hot body and leaves into the cold one, and the work comes from its fall, as the work of a water-wheel comes from the fall of water that is not consumed. The remarkable conclusion, which survived the abandonment of caloric, was that a reversible engine's motive power depends only on the two temperatures, and that no engine between those temperatures can do better. Émile Clapeyron, in 1834, put the cycle on a $PV$ diagram and made the argument analytical. Rudolf Clausius in 1850, and William Thomson shortly after, rebuilt it on the first law. Heat is not conserved through the engine. The difference $Q_h - |Q_c|$ is the work, and the ratio $|Q_c|/Q_h$ for a reversible engine is $T_c/T_h$ on the absolute scale. The formula $\eta = 1 - T_c/T_h$ is that rebuilt statement, not a sentence from 1824.
:::

::: summary
- Over a cycle $\Delta U = 0$, so $W_{\mathrm{on}} = -(Q_h + Q_c)$. For an engine $Q_h > 0$, $Q_c = -|Q_c|$ and the work output is $W_{\mathrm{by}} = -W_{\mathrm{on}} = Q_h - |Q_c|$.
- The efficiency is $\eta = W_{\mathrm{by}}/Q_h = 1 - |Q_c|/Q_h$. This identity is the first law. It does not by itself limit $|Q_c|$.
- A Carnot cycle is two reversible isotherms and two reversible adiabats. For an ideal gas the adiabat relation forces the isothermal volume ratios to agree, so $|Q_c|/Q_h = T_c/T_h$ and $\eta = 1 - T_c/T_h$. The ratio $\gamma$ cancels.
- The works on the two adiabats cancel. The net work is $W_{\mathrm{by}} = n R (T_h - T_c)\ln(V_b/V_a)$.
- The Kelvin–Planck and Clausius statements of the second law are equivalent: a machine that breaks one can be coupled to an ordinary engine or refrigerator to break the other.
- No engine between two reservoirs beats a Carnot engine between them. Every reversible engine between those reservoirs has efficiency $1 - T_c/T_h$ on the absolute scale. Temperatures in Celsius do not belong in the formula.
- For a refrigerator, $\mathrm{COP} = |Q_c|/W_{\mathrm{by}}$ with $W_{\mathrm{by}}$ the work you must supply. A Carnot refrigerator has $\mathrm{COP} = T_c/(T_h - T_c)$, which may exceed $1$ without offending the first law.
- Between $500\,\mathrm{K}$ and $300\,\mathrm{K}$ the Carnot efficiency is $0.400$. Absorbing $1000\,\mathrm{J}$ yields $W_{\mathrm{by}} = 400\,\mathrm{J}$ and $|Q_c| = 600\,\mathrm{J}$. A real engine at $\eta = 0.25$ yields $250\,\mathrm{J}$ from the same heat.
:::

## Exercises

::: exercise Efficiency at a doubled temperature {#exr-eta-600 level=1 check="1/2"}
A Carnot engine operates between $T_h = 600\,\mathrm{K}$ and $T_c = 300\,\mathrm{K}$. Find its efficiency.
::: solution
[[#eq-carnot]] uses absolute temperatures:

$$
\eta = 1 - \frac{T_c}{T_h} = 1 - \frac{300}{600} = \frac{1}{2}.
$$

The volume ratio of the isotherms is not needed. The same pair of temperatures on the Celsius scale would be $327^{\circ}\mathrm{C}$ and $27^{\circ}\mathrm{C}$, and those numbers must not be substituted for $T_h$ and $T_c$.
:::
:::

::: exercise Work from a known efficiency {#exr-work-800 level=1 check="800"}
An engine absorbs $Q_h = 2000\,\mathrm{J}$ from its hot reservoir and has efficiency $0.400$. Find the work done by the engine, in joules.
::: solution
By [[#eq-eta-def]], $W_{\mathrm{by}} = \eta Q_h = 0.400\times 2000 = 800\,\mathrm{J}$. The heat rejected is the remainder, $|Q_c| = 2000 - 800 = 1200\,\mathrm{J}$, and the work done on the working substance is $W_{\mathrm{on}} = -800\,\mathrm{J}$. The problem did not say the engine was reversible. The efficiency was given, so [[#eq-carnot]] is not required, and it must not be used to replace $0.400$ by a temperature ratio that was not supplied.
:::
:::

::: exercise Carnot coefficient of performance {#exr-cop level=1 check="9"}
A Carnot refrigerator operates between an interior at $270\,\mathrm{K}$ and a room at $300\,\mathrm{K}$. Find its coefficient of performance.
::: solution
[[#eq-cop-carnot]] gives

$$
\mathrm{COP} = \frac{T_c}{T_h - T_c} = \frac{270}{300 - 270} = \frac{270}{30} = 9.
$$

The value is greater than $1$. For each joule of work supplied, nine joules are removed from the interior, and ten joules are delivered to the room. The corresponding engine efficiency between these temperatures is $1 - 270/300 = 1/10$, and $(1 - \eta)/\eta = 9$.
:::
:::

::: exercise Heat rejected by a Carnot engine {#exr-qc level=2 check="1500"}
A Carnot engine between $500\,\mathrm{K}$ and $300\,\mathrm{K}$ absorbs $2500\,\mathrm{J}$ from the hot reservoir in each cycle. Find $|Q_c|$ in joules.
::: solution
The efficiency is $1 - 300/500 = 2/5$, so $|Q_c|/Q_h = 3/5$ by [[#eq-carnot]]. Therefore

$$
|Q_c| = \frac{3}{5}\times 2500 = 1500\,\mathrm{J}.
$$

The work output is $W_{\mathrm{by}} = 2500 - 1500 = 1000\,\mathrm{J}$, and $W_{\mathrm{on}} = -1000\,\mathrm{J}$. The ratio $1500/2500 = 0.600$ equals $T_c/T_h$, which is the relation the adiabats enforced in the proof of [[#thm-carnot]].
:::
:::

::: exercise Heat intake of a two-kilowatt engine {#exr-power level=2 check="3200"}
A Carnot engine produces a mechanical power of $2.00\,\mathrm{kW}$ while running between $800\,\mathrm{K}$ and $300\,\mathrm{K}$. Find the rate, in watts, at which it absorbs heat from the hot reservoir.
::: solution
The efficiency is

$$
\eta = 1 - \frac{300}{800} = \frac{5}{8}.
$$

Power is work per unit time, so $\eta$ relates the heat-absorption rate $\dot Q_h$ to the output power by $P_{\mathrm{by}} = \eta \dot Q_h$. Hence

$$
\dot Q_h = \frac{2000}{5/8} = 2000\times\frac{8}{5} = 3200\,\mathrm{W}.
$$

The cold reservoir receives the difference, $3200 - 2000 = 1200\,\mathrm{W}$. The same arithmetic as [[#eq-eta]], applied to rates rather than to one cycle, is legitimate because every cycle is identical and the reservoirs' temperatures are steady.
:::
:::

::: exercise How much work is lost {#exr-real-gap level=2 check="150"}
Compare the Carnot engine of [[#ex-500-300]] with the real engine in that example, both absorbing $1000\,\mathrm{J}$ per cycle from the reservoir at $500\,\mathrm{K}$. How many joules less work does the real engine deliver in one cycle?
::: solution
The Carnot engine delivers $W_{\mathrm{by}} = 400\,\mathrm{J}$. The real engine, at $\eta = 0.25$, delivers $250\,\mathrm{J}$. The difference is

$$
400 - 250 = 150\,\mathrm{J}.
$$

The real engine also rejects $750\,\mathrm{J}$ rather than $600\,\mathrm{J}$, and $750 - 600 = 150\,\mathrm{J}$ is the same gap: every joule not delivered as work is an extra joule rejected, because both engines obey $\Delta U = 0$. The first law accounts for the equality of the two gaps. The second law accounts for the gap being non-negative.
:::
:::

::: exercise Why the adiabats contribute no net work {#exr-adiabat-work level=3}
An ideal gas with constant $C_{V,m}$ executes a Carnot cycle between $T_h$ and $T_c$. The hot isotherm runs from volume $V_a$ to volume $V_b$. Prove that the works done on the gas on the two adiabats sum to zero, and that

$$
W_{\mathrm{by}} = n R (T_h - T_c)\ln\frac{V_b}{V_a}.
$$

State where reversibility, or at least the quasistatic ideal-gas adiabat, is used.
::: hint
On an adiabat $Q = 0$, so $W_{\mathrm{on}} = \Delta U = n C_{V,m}\,\Delta T$. The two adiabats connect the same pair of temperatures in opposite directions. For the isotherms use [[#eq-wisotherm]], and use [[#thm-carnot]] only for the equality of the volume ratios, or re-derive that equality from [[#eq-adiabat]].
:::
::: solution
On the adiabatic expansion the temperature goes from $T_h$ to $T_c$, and $Q = 0$, so

$$
W_{\mathrm{exp}} = n C_{V,m}(T_c - T_h).
$$

On the adiabatic compression the temperature goes from $T_c$ to $T_h$, and

$$
W_{\mathrm{comp}} = n C_{V,m}(T_h - T_c) = -W_{\mathrm{exp}}.
$$

The sum is zero. This step uses $Q = 0$ and $\Delta U = n C_{V,m}\,\Delta T$, hence an ideal gas with $U$ a function of $T$ alone and a constant heat capacity. It uses the quasistatic condition only in so far as the end states of each adiabat are the ends of the isotherms already named; the value of the work on a $Q = 0$ leg depends only on $\Delta U$.

The hot isotherm contributes $W_{\mathrm{hot}} = -n R T_h \ln(V_b/V_a)$, by [[#eq-wisotherm]]. The cold isotherm runs from $V_c$ to $V_d$ and contributes $W_{\mathrm{cold}} = -n R T_c \ln(V_d/V_c) = n R T_c \ln(V_c/V_d)$. The adiabat relation [[#eq-adiabat]], which needs a quasistatic adiabat, forces $V_c/V_d = V_b/V_a$, as in the proof of [[#thm-carnot]]. Therefore

$$
W_{\mathrm{on}} = W_{\mathrm{hot}} + W_{\mathrm{cold}} = -n R (T_h - T_c)\ln\frac{V_b}{V_a},
$$

and $W_{\mathrm{by}} = -W_{\mathrm{on}}$ is the required expression. Reversibility entered when the gas temperature on each isotherm was set equal to the reservoir temperature, so that a single $T$ stands in [[#eq-wisotherm]], and when the adiabats were taken to obey [[#eq-adiabat]]. A frictional adiabat does not obey that relation and does not have $W_{\mathrm{on}} = \Delta U$ in a way that cancels between the two legs, because friction dumps energy outside the $\int P\,\dd V$ account used here.
:::
:::

::: exercise Wiring an engine that claims too much {#exr-too-good level=3 check="250"}
A claimed engine between $500\,\mathrm{K}$ and $300\,\mathrm{K}$ has $\eta = 0.50$ and absorbs $1000\,\mathrm{J}$ from the hot reservoir each cycle. It is coupled to a Carnot refrigerator between the same reservoirs that consumes the claimed work output. Find the net heat, in joules, transferred from the cold reservoir to the hot reservoir in one cycle of the pair.
::: hint
Compute $W_{\mathrm{by}}$ from the claimed efficiency, then the heat the Carnot refrigerator removes from the cold side when it is given that work. The Carnot COP between these temperatures is $1.5$. Subtract the heat the claimed engine rejects to the cold side.
:::
::: solution
The claimed engine produces $W_{\mathrm{by}} = 0.50\times 1000 = 500\,\mathrm{J}$ and rejects $500\,\mathrm{J}$ to the cold reservoir. The Carnot COP is $T_c/(T_h - T_c) = 300/200 = 1.5$, so the refrigerator, consuming $500\,\mathrm{J}$, removes $1.5\times 500 = 750\,\mathrm{J}$ from the cold reservoir and delivers $750 + 500 = 1250\,\mathrm{J}$ to the hot one.

Net work is zero. The cold reservoir receives $500\,\mathrm{J}$ from the engine and gives up $750\,\mathrm{J}$ to the refrigerator, so $250\,\mathrm{J}$ leaves it. The hot reservoir gives up $1000\,\mathrm{J}$ to the engine and receives $1250\,\mathrm{J}$ from the refrigerator, so $250\,\mathrm{J}$ arrives there. The net transfer from cold to hot is $250\,\mathrm{J}$. The first law is intact for the pair; the Clausius statement is not. That is why $\eta = 0.50$ is impossible between these temperatures, whose Carnot value is $0.400$.
:::
:::
