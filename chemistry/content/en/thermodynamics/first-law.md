Thermodynamics begins where molecular detail becomes hopeless. A litre of gas at room temperature contains about $4\times10^{22}$ molecules, each obeying Newton's laws; following them is impossible, and in any case useless, because what a chemist wants to know — how much heat a reaction gives off, how far it goes, whether a phase is stable — is a property of the collective, not of any molecule. The first law is the first of the two facts that make such predictions possible: energy is conserved. It is a statement about what every system must obey, whatever it is made of, and this chapter builds the vocabulary — systems, states, state functions, heat, work — that the rest of the course uses.

The vocabulary is worth taking slowly, because almost every student's difficulty with thermodynamics is a difficulty with these first few words. Heat is not a fluid and not a property of a body; work is not a property of a body either; and the internal energy, which *is* a property, changes by an amount that knows nothing about how the change was brought about. Once that asymmetry is secure, the rest of the course is bookkeeping and consequences.

## Systems, surroundings and internal energy

::: definition Systems, surroundings, closed and open {#def-system}
A **system** is the part of the universe under study; everything else is the **surroundings**. A system is **closed** if it exchanges energy but not matter with its surroundings, **open** if it exchanges both, and **isolated** if it exchanges neither. A closed system containing a single phase is **homogeneous**; two or more phases in equilibrium form a **heterogeneous** system. The **state** of a closed simple system of fixed composition is fixed by any two independent state variables — specifying $p$, $V$, $T$ and $n$ over-determines it, because they are tied together by an equation of state.
:::

The **internal energy** $U$ is the total energy stored within the system: translational, rotational, vibrational, electronic and nuclear kinetic energy, and the potential energy of all the interactions between particles. Its absolute value is not accessible in chemistry; what matters and what we measure is the **change** $\Delta U = U_\text{f} - U_\text{i}$. The word "internal" distinguishes it from the kinetic energy of the system as a whole and from its potential energy in external fields, which thermodynamics does not track.

::: proposition The first law {#prop-first-law}
For any process in a closed system, the change in internal energy equals the heat $q$ added to the system plus the work $w$ done **on** the system,
$$
\Delta U = q + w .
$$
Equivalently, the internal energy is a **state function**: $\Delta U$ between two equilibrium states is the same for every path connecting them, although $q$ and $w$ separately depend on the path. The sign convention used throughout this atlas is the IUPAC one: energy entering the system is positive.
:::

The claim that $\Delta U$ is a state function is not a mathematical trick; it is the experimental content of the first law, and it can be — and historically was — tested directly. Joule found that the same change of state of a sample of water (say, $1\ \mathrm{g}$ warmed from $14.5$ to $15.5\,^\circ\mathrm{C}$) could be produced by electrical work, by paddle-wheel work, by compression, or by heat from a flame, and that the quantity of *any* of these needed to produce the change was always the same once the others were excluded. Energy is conserved, and the ledger it is kept in is $U$.

Because $\Delta U$ depends only on the end states, its differential $\mathrm{d}U$ is *exact*: for any cycle, $\oint \mathrm{d}U = 0$. The differentials $\delta q$ and $\delta w$ are not exact — the inexact symbol $\delta$ is a permanent reminder that a finite amount of heat or work belongs to a *process*, never to a state. You will never be asked "how much heat does this gas have?", but you may be asked, and should be able to answer, "how much heat did this process absorb?".

::: example Work done in a compression {#ex-const-pressure}
A sample of $1.00\ \mathrm{mol}$ of an ideal gas at $300\ \mathrm{K}$ is compressed **irreversibly** from $V_\mathrm{i} = 10.0\ \mathrm{L}$ to $V_\mathrm{f} = 2.0\ \mathrm{L}$ against a constant external pressure of $5.00\ \mathrm{bar}$. Find the work.
::: solution
$$
w = -p_\text{ex}\,\Delta V = -5.00\ \mathrm{bar}\times(2.0 - 10.0)\ \mathrm{L} = +40\ \mathrm{L\,bar}.
$$
With $1\ \mathrm{L\,bar} = 100\ \mathrm{J}$ exactly, $w = +4.0\ \mathrm{kJ}$: work is done **on** the gas, so $w$ is positive. The gas warms as it is squeezed; if the vessel is thermally conducting, the extra energy will later leave as heat, but during the compression itself the energy has nowhere else to go.
:::
:::

::: warning The sign convention is a convention {#warn-signs}
Some textbooks, especially in physics and engineering, write $\mathrm{d}U = \delta Q - \delta W$ with $W$ the work done **by** the system. The physics convention and the IUPAC convention differ only by the sign of $w$; what matters is that you know which one your source uses and never mix them inside one calculation. This atlas uses $w = {}$ work done **on** the system throughout, so that compressing a gas gives $w \gt 0$ and a gas that drives a piston does work on the surroundings and has $w \lt 0$. Whichever convention you adopt, keep the *physics* straight first — energy in, energy out — and the signs will follow.
:::

## Work: energy transferred by a force

::: definition Work and heat {#def-work-heat}
**Work** is energy transferred by a force acting through a distance — in chemistry almost always expansion (or $pV$) work, for which $\delta w = -p_\text{ex}\,\mathrm{d}V$, where $p_\text{ex}$ is the pressure the system pushes *against*. **Heat** is energy transferred solely because of a temperature difference. Neither is a property of the system: a system *has* internal energy, but it does not *have* work or heat; work and heat are energy *in transit*, and their values depend on the path taken.
:::

::: proposition Work along a path {#prop-work-path}
For a closed simple system the work of a volume change is
$$
w = -\int_{V_\mathrm{i}}^{V_\mathrm{f}} p_\text{ex}\,\mathrm{d}V ,
$$
the (signed) area under the path on a $p$–$V$ diagram. For a **reversible** change the system is at mechanical equilibrium throughout, so $p_\text{ex} = p_\text{gas}$ at every instant (differing infinitesimally), and for an ideal gas at constant temperature
$$
w_\text{rev} = -\int_{V_\mathrm{i}}^{V_\mathrm{f}} \frac{nRT}{V}\,\mathrm{d}V = -nRT\ln\frac{V_\mathrm{f}}{V_\mathrm{i}}\qquad(\text{isothermal, ideal gas}).
$$
Because the gas can only push against what opposes it, an expansion does the most work when it is reversible, and the work of an irreversible expansion between the same states is smaller in magnitude. A **free expansion** against vacuum does no work at all.
:::

::: proof
Take the reversible isothermal expansion of $n\ \mathrm{mol}$ of ideal gas from $V_\mathrm{i}$ to $V_\mathrm{f}$ at temperature $T$. With $p_\text{ex} = nRT/V$,
$$
w_\text{rev} = -\int_{V_\mathrm{i}}^{V_\mathrm{f}} \frac{nRT}{V}\,\mathrm{d}V = -nRT\left[\ln V\right]_{V_\mathrm{i}}^{V_\mathrm{f}} = -nRT\ln\frac{V_\mathrm{f}}{V_\mathrm{i}} .
$$
For any other path between the same two states on the $p$–$V$ diagram, the opposing pressure never exceeds the gas pressure (otherwise the "expansion" would run backwards), so $p_\text{ex} \le p_\text{gas}$ at every point and $|w| \le |w_\text{rev}|$. The reversible path is the limit of infinitely many infinitesimal stages, each pushing against an opposing pressure only infinitesimally less than the gas's own: it extracts the maximum work, at the cost of running infinitely slowly.
:::

::: example Reversible, irreversible and free expansion {#ex-three-paths}
Take $1.00\ \mathrm{mol}$ of an ideal gas at $300\ \mathrm{K}$, so that $pV = nRT = 2494\ \mathrm{J} = 24.94\ \mathrm{L\,bar}$, and expand it isothermally from $10.0\ \mathrm{L}$ to $20.0\ \mathrm{L}$ by three paths. Find $w$ and $q$ for each.
::: solution
**(a) Free expansion** against vacuum: $p_\text{ex} = 0$, so $w = 0$. For an isothermal change of an ideal gas $\Delta U = 0$ (Joule's law, below), so $q = \Delta U - w = 0$ as well.

**(b) Irreversible expansion** against a constant $p_\text{ex} = p_\text{final} = 1.247\ \mathrm{bar}$:
$$
w = -1.247\ \mathrm{bar}\times 10.0\ \mathrm{L} = -12.5\ \mathrm{L\,bar} = -1.25\ \mathrm{kJ}.
$$

**(c) Reversible expansion**:
$$
w = -24.94\ \mathrm{L\,bar}\times\ln 2 = -17.28\ \mathrm{L\,bar} = -1.73\ \mathrm{kJ}.
$$
In every case $\Delta U = 0$ because the gas is ideal and the temperature is unchanged, so $q = -w$: $0$, $+1.25\ \mathrm{kJ}$ and $+1.73\ \mathrm{kJ}$ respectively. The reversible path delivers the most work and absorbs the most heat; the free expansion delivers neither. Three processes, the same $\Delta U$, three different pairs $(q, w)$ — the state-function/path-function distinction in a single example.
:::
:::

::: widget plot
f: 24.94/x ; 24.94/x^1.4
x: 2, 22
y: 0, 14
labels: \text{isotherm } pV = \text{const}; \text{adiabat } pV^{1.4} = \text{const}
caption: Pressure against volume for a fixed sample of gas: the isotherm (which keeps $T$ constant) and, steeper, an adiabat (a curve along which no heat flows). The area under each curve between two volumes is the magnitude of the work of expansion along that path. Because the adiabat falls faster than the isotherm, an adiabatic expansion does more work per unit volume change at first but the gas cools as it expands, while the isothermal expansion keeps its temperature by absorbing heat from the surroundings.
:::

::: widget plot
f: 24.94/x
x: 2, 22
y: 0, 14
shade: 10, 20
labels: \text{isotherm at } 300\ \mathrm{K}
caption: The work of the reversible isothermal expansion from $10.0\ \mathrm{L}$ to $20.0\ \mathrm{L}$ of the worked example is the shaded area under the isotherm, $\int p\,\mathrm{d}V = nRT\ln 2 = 17.3\ \mathrm{L\,bar}$. Drag nothing — the point is the geometry: work is area, and different paths between the same two volumes enclose different areas, which is exactly why $w$ is a path function.
:::

::: quiz
A gas expands from the same initial state to the same final volume by three paths: free expansion, expansion against a constant external pressure, and reversible expansion. Which path gives the largest magnitude of work, and why?
- [x] The reversible expansion, because the gas pushes against the largest possible opposing pressure at every step.
- [ ] The free expansion, because nothing resists the gas.
- [ ] They are all equal, because work is a state function.
- [ ] The constant-pressure expansion, because the pressure is constant.
::: solution
Work is the area $\int p_\text{ex}\,\mathrm{d}V$, and only the reversible path keeps $p_\text{ex}$ equal to the gas pressure throughout, which is the largest opposing pressure an expansion can have without running backwards. Work is *not* a state function — that is the whole point — and against vacuum the area is zero.
:::
:::

## Heat, constant volume, and calorimetry

::: proposition Energy change at constant volume {#prop-const-volume}
In a closed system at constant volume that does no other kind of work, $\delta w = -p_\text{ex}\,\mathrm{d}V = 0$, so the first law collapses to $\mathrm{d}U = \delta q_V$: **all heat absorbed changes the internal energy**. The heat capacity at constant volume, $C_V = \left(\partial U/\partial T\right)_V$, then gives
$$
\mathrm{d}U = C_V\,\mathrm{d}T \qquad (\text{constant volume}),
$$
and for an ideal gas, whose internal energy depends on temperature alone, $C_V\,\mathrm{d}T$ gives $\mathrm{d}U$ along *any* path, constant volume or not.
:::

This is why bomb-calorimeter measurements — a reaction in a sealed, rigid steel vessel immersed in a thermostatted water bath — measure $\Delta U$ directly: the bomb's walls do the $pV$ bookkeeping for you, the vessel does not move, and $q_V = \Delta U$. The heat released is computed from the temperature rise of the bath and the known heat capacity of the whole apparatus, exactly as in [[general-chemistry-1/thermochemistry|thermochemistry]].

::: example Heating a gas at constant volume {#ex-n2-heat}
Two moles of $\mathrm{N_2}$ gas are heated from $300\ \mathrm{K}$ to $400\ \mathrm{K}$ in a rigid container. Take $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (for a diatomic ideal gas, $C_{V,\text{m}} = \tfrac{5}{2}R$). Find $q$, $w$ and $\Delta U$.
::: solution
At constant volume no expansion work is done: $w = 0$. Hence
$$
q = \Delta U = nC_{V,\text{m}}\Delta T = 2\times 20.8\ \mathrm{J\,K^{-1}}\times 100\ \mathrm{K} = 4160\ \mathrm{J} = 4.16\ \mathrm{kJ}.
$$
Every joule goes into internal energy. Had the same heating been done at constant pressure, the gas would have expanded and done work, and the heat needed would have been $nC_{p,\text{m}}\Delta T = 5.82\ \mathrm{kJ}$ — the difference is the work of expansion, and it is the reason enthalpy, not internal energy, is the natural quantity for open-flask chemistry.
:::
:::

## Volume dependence and Joule's law

::: proposition Decomposition of the energy change {#prop-decomposition}
The change in internal energy between two equilibrium states can always be computed as the sum of two contributions,
$$
\Delta U = \Delta U_T + \Delta U_V ,
$$
where $\Delta U_T$ is the change due to the temperature change at constant volume and $\Delta U_V$ is the change due to the volume change at constant temperature. For an ideal gas $\Delta U_V = 0$ — the experimental content of **Joule's law**, $\left(\partial U/\partial V\right)_T = 0$ — so $\Delta U$ depends only on the temperatures of the end states. For a real gas $\Delta U_V \ne 0$ and is usually negative for expansion, because energy is needed to pull the molecules apart against their mutual attraction.
:::

The decomposition is not a new law but a strategy: because $U$ is a state function, you may compute $\Delta U$ along *any* convenient path, and the two-step path "heat at constant volume, then expand at constant temperature" is almost always the convenient one. Joule tried to measure $\left(\partial U/\partial V\right)_T$ directly by letting gas expand from one vessel into an identical evacuated one immersed in water; the temperature change was too small to detect with his apparatus, which is how he concluded — correctly, within the precision of his apparatus — that it vanishes for a dilute gas. Modern values for real gases are small but not zero, and the chapter [[thermodynamics/heat-capacity-adiabatic]] puts them to work.

::: example Energy change with temperature and volume {#ex-two-steps}
One mole of nitrogen gas goes from $(300\ \mathrm{K},\ 10\ \mathrm{L})$ to $(400\ \mathrm{K},\ 20\ \mathrm{L})$. Compute $\Delta U$ along the two-step path "heat at constant volume, then expand isothermally", using $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ and treating the gas as ideal.
::: solution
Step 1, heating at constant volume from $300\ \mathrm{K}$ to $400\ \mathrm{K}$: $\Delta U_1 = C_{V,\text{m}}\,\Delta T = 20.8\times 100 = 2.08\ \mathrm{kJ}$. Step 2, isothermal expansion at $400\ \mathrm{K}$: $\Delta U_2 = 0$ for an ideal gas (Joule's law). Hence $\Delta U = 2.08\ \mathrm{kJ}$, and the same number would be obtained along any other path — that is the content of the state-function property. The work and heat of the two steps individually depend on the path; their sum does not.
:::
:::

## Constant pressure and the enthalpy preview

::: proposition From internal energy to enthalpy {#prop-dh-du}
The **enthalpy** is $H = U + pV$. Because $U$, $p$ and $V$ are state functions, so is $H$, and at constant pressure
$$
\Delta H = \Delta U + p\,\Delta V = \Delta U - w = q_p :
$$
the heat absorbed at constant pressure (with no work other than expansion) is the enthalpy change. For a reaction in which $\Delta n_\text{gas}$ moles of gas are produced per mole of reaction, treating gases as ideal and neglecting the volumes of condensed phases,
$$
\Delta_\text{r}H = \Delta_\text{r}U + RT\,\Delta n_\text{gas} .
$$
:::

::: example Combustion in a bomb and in a flask {#ex-glucose}
At $298\ \mathrm{K}$ the complete oxidation $\mathrm{C_6H_{12}O_6(s)} + 6\,\mathrm{O_2(g)} \rightarrow 6\,\mathrm{CO_2(g)} + 6\,\mathrm{H_2O(l)}$ has $\Delta_\text{r}U = -2808\ \mathrm{kJ\,mol^{-1}}$ (a bomb-calorimeter value). Find $\Delta_\text{r}H$.
::: solution
Six moles of gas are consumed and six are produced, so $\Delta n_\text{gas} = 0$ and
$$
\Delta_\text{r}H = \Delta_\text{r}U + RT\,\Delta n_\text{gas} = -2808\ \mathrm{kJ\,mol^{-1}} + 0 = -2808\ \mathrm{kJ\,mol^{-1}} .
$$
The correction vanishes because the moles of gas are unchanged: the reaction volume hardly changes, so the atmosphere is neither pushed back nor allowed to push in. Where $\Delta n_\text{gas} \ne 0$ the correction is not small — at $300\ \mathrm{K}$, $RT\Delta n_\text{gas} = 2.5\ \mathrm{kJ\,mol^{-1}}$ per mole of net gas produced, comparable with the precision of most calorimetry.
:::
:::

::: warning Enthalpy is not internal energy {#warn-enthalpy}
The quantity measured by a coffee-cup calorimeter is not $\Delta U$ but $\Delta H = \Delta U + \Delta(pV)$, because the reaction pushes back the atmosphere as it changes volume; the quantity measured by a *bomb* is $\Delta U$. For reactions involving only condensed phases the correction $\Delta(pV)$ is tiny; for reactions involving gases it is $RT\,\Delta n_\text{gas}$, which at $300\ \mathrm{K}$ is $2.5\ \mathrm{kJ\,mol^{-1}}$ per mole of gas produced — not negligible. Mixing the two up is the most common single error in first-course thermodynamics. The chapter [[thermodynamics/heat-capacity-adiabatic]] takes up enthalpy in full.
:::

::: history
The first law was born from a dispute. The caloric theory, which treated heat as a weightless fluid, was respectable science until Count Rumford's cannon-boring experiments of 1798 showed that heat could be produced without limit by friction, and Humphry Davy melted ice by friction in 1799. James Prescott Joule then spent the 1840s measuring the mechanical equivalent of heat — his paddle-wheel apparatus, announced at Oxford in 1847, gave $8.19\ \mathrm{J\,cal^{-1}}$, within a few per cent of the modern $4.184\ \mathrm{J\,cal^{-1}}$ given the units of the day. Julius Robert Mayer reached the same conclusion in 1842 from the difference between the specific heats of gases. Hermann von Helmholtz gave the conservation statement its general form in 1847, and Rudolf Clausius in 1850 separated the two laws, keeping the conservation principle and the impossibility of a perfect engine while discarding the conservation of caloric.
:::

## Where this leads

The first law gives the bookkeeping; it does not tell us which processes actually happen, because it is satisfied by processes that never occur — heat flowing from a cold body to a hot one conserves energy perfectly and is never seen. The missing ingredient is entropy, developed in [[thermodynamics/second-law]]. The heat capacities and the enthalpy needed to evaluate $\Delta U_T$ and $q_p$ are the subject of [[thermodynamics/heat-capacity-adiabatic]]. The decomposition $\Delta U = \Delta U_T + \Delta U_V$ is used throughout [[thermodynamics/mixtures]] and [[thermodynamics/reaction-equilibrium]], and the condition $\left(\partial U/\partial V\right)_T = 0$ reappears as a test of non-ideality in [[statistical-thermodynamics/real-gases-liquids]].

::: summary
- The first law states that energy is conserved: $\Delta U = q + w$, with $w$ the work done **on** the system (IUPAC convention).
- Internal energy $U$ is a state function; heat $q$ and work $w$ are path functions, and only their sum is fixed by the end states.
- Expansion work is $w = -\int p_\text{ex}\,\mathrm{d}V$, the area under the path on a $p$–$V$ diagram; a reversible path does the most work, a free expansion does none.
- At constant volume all heat becomes internal energy ($q_V = \Delta U$), which is why bomb calorimeters measure $\Delta U$; at constant pressure the heat is $\Delta H$.
- For an ideal gas the internal energy is independent of volume (Joule's law), so $\Delta U$ depends only on the end temperatures; for real gases there is a small, usually negative, volume dependence.
- Any $\Delta U$ can be computed along a convenient two-step path, heating at constant volume then expanding at constant temperature.
- The first law constrains energy but not direction; it is satisfied even by impossible processes, so a second law is needed.
:::

## Exercises

::: exercise Work of compression {level=1 check="12.0"}
Two moles of an ideal gas are compressed at $300\ \mathrm{K}$ from $20.0\ \mathrm{L}$ to $5.0\ \mathrm{L}$ against a constant external pressure of $8.00\ \mathrm{bar}$. Calculate the work and state its sign. (Enter $w$ in $\mathrm{kJ}$.)
::: solution
$w = -p_\text{ex}\,\Delta V = -8.00\ \mathrm{bar}\times(5.0-20.0)\ \mathrm{L} = +120\ \mathrm{L\,bar}$. With $1\ \mathrm{L\,bar} = 100\ \mathrm{J}$, $w = +12.0\ \mathrm{kJ}$. The work is positive: the surroundings do work on the gas, and (the vessel warming as it does) that energy ends up in the gas and then in the bath.
:::
:::

::: exercise Heat at constant volume {level=1 check="4.16"}
Two moles of $\mathrm{N_2}$ gas are heated from $300\ \mathrm{K}$ to $400\ \mathrm{K}$ in a rigid container. Take $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$. How much heat is absorbed? (Enter $q$ in $\mathrm{kJ}$.)
::: solution
At constant volume no expansion work is done, so $q = \Delta U = nC_{V,\text{m}}\Delta T = 2\times20.8\times100 = 4160\ \mathrm{J} = 4.16\ \mathrm{kJ}$.
:::
:::

::: exercise Internal energy of vaporisation {level=1 check="37.6"}
One mole of liquid water vaporises at $373.15\ \mathrm{K}$ and $1\ \mathrm{bar}$, where $\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$. Find $\Delta_\text{vap}U$ for the process, treating the vapour as ideal. (Enter $\Delta_\text{vap}U$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\Delta U = \Delta H - \Delta(pV) \approx \Delta H - RT\,\Delta n_\text{gas} = 40.66 - \dfrac{8.314\times373.15}{1000} = 40.66 - 3.10 = 37.6\ \mathrm{kJ\,mol^{-1}}$. The correction $RT\,\Delta n_\text{gas} = 3.10\ \mathrm{kJ\,mol^{-1}}$ is the work the liquid does against the atmosphere as it becomes a mole of vapour: most of the heat of vaporisation stays in the liquid's successor as internal energy, and about eight per cent is spent pushing the world aside.
:::
:::

::: exercise A two-stage expansion {level=2 check="-1.46"}
One mole of an ideal gas at $300\ \mathrm{K}$ expands isothermally from $10.0\ \mathrm{L}$ to $20.0\ \mathrm{L}$ in two stages: against a constant $p_\text{ex} = 1.663\ \mathrm{bar}$ until $V = 15.0\ \mathrm{L}$, then against a constant $p_\text{ex} = 1.247\ \mathrm{bar}$ until $V = 20.0\ \mathrm{L}$. Compute the total work. (Enter $w$ in $\mathrm{kJ}$.)
::: solution
$w = -\left(1.663\ \mathrm{bar}\times 5.0\ \mathrm{L} + 1.247\ \mathrm{bar}\times 5.0\ \mathrm{L}\right) = -(8.32 + 6.24)\ \mathrm{L\,bar} = -14.6\ \mathrm{L\,bar} = -1.46\ \mathrm{kJ}$.
Compare the one-stage value of the worked example, $-1.25\ \mathrm{kJ}$, and the reversible limit, $-1.73\ \mathrm{kJ}$: splitting the expansion into more stages recovers more of the reversible work, and in the limit of infinitely many stages the sum becomes the integral. (Each stage's opposing pressure must not exceed the gas pressure at the *end* of that stage — here $1.663\ \mathrm{bar}$ is exactly the gas pressure at $15.0\ \mathrm{L}$ — or the stage would stall.)
:::
:::

::: exercise Hess's law {level=2 check="-283.0"}
Given $\Delta_\text{f}H^\circ[\mathrm{CO_2(g)}] = -393.5\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\text{f}H^\circ[\mathrm{CO(g)}] = -110.5\ \mathrm{kJ\,mol^{-1}}$, find $\Delta_\text{r}H^\circ$ for $\mathrm{CO(g)} + \tfrac{1}{2}\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta_\text{r}H^\circ = -393.5 - (-110.5) = -283.0\ \mathrm{kJ\,mol^{-1}}$. Hess's law — reaction enthalpies add like the steps of a path — is itself a consequence of $H$ being a state function: the oxidation of CO to $\mathrm{CO_2}$ can be reached directly or by going through the elements, and the two routes must balance.
:::
:::

::: exercise Work of a reaction {level=2 check="-2808"}
At $298\ \mathrm{K}$, the reaction $\mathrm{C_6H_{12}O_6(s)} + 6\,\mathrm{O_2(g)} \rightarrow 6\,\mathrm{CO_2(g)} + 6\,\mathrm{H_2O(l)}$ has $\Delta_\text{r}U = -2808\ \mathrm{kJ\,mol^{-1}}$. Find $\Delta_\text{r}H$. (Enter $\Delta_\text{r}H$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta n_\text{gas} = 6 - 6 = 0$, so $\Delta_\text{r}H = \Delta_\text{r}U + RT\,\Delta n_\text{gas} = -2808\ \mathrm{kJ\,mol^{-1}}$. The correction vanishes because the moles of gas are unchanged. Had the water been produced as vapour, $\Delta n_\text{gas}$ would be $+6$ and the two quantities would differ by $6RT = 14.8\ \mathrm{kJ\,mol^{-1}}$ — a reminder to state aggregation states, always.
:::
:::

::: exercise Derive the energy-pressure relation {level=3}
Using the cyclic rule $\left(\frac{\partial x}{\partial y}\right)_z\left(\frac{\partial y}{\partial z}\right)_x\left(\frac{\partial z}{\partial x}\right)_y = -1$ and the Maxwell relation $(\partial S/\partial V)_T = (\partial p/\partial T)_V$, show that
$$
\left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial p}{\partial T}\right)_V - p .
$$
Deduce Joule's law for an ideal gas, and evaluate the left-hand side for a van der Waals gas.
::: hint
Start from the fundamental equation $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$ (proved in [[thermodynamics/free-energy]]) and divide by $\mathrm{d}V$ at constant $T$.
:::
::: solution
Dividing $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$ by $\mathrm{d}V$ at constant $T$ gives $(\partial U/\partial V)_T = T(\partial S/\partial V)_T - p$, and the Maxwell relation converts the entropy derivative: $(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$. For an ideal gas $(\partial p/\partial T)_V = nR/V = p/T$, so the right-hand side is $p - p = 0$: Joule's law follows from the equation of state alone. For a van der Waals gas, $p = nRT/(V-nb) - a(n/V)^2$, so $T(\partial p/\partial T)_V - p = a(n/V)^2 \gt 0$: the internal energy of a real gas *increases* with volume at constant temperature, because expansion lets molecules escape one another's attractive well. Which is why the left free expansion of a real gas cools it slightly — and why the sign convention question in the text is a question about $w$, not about physics.
:::
:::

::: exercise A three-step cycle {level=3 check="-0.77"}
One mole of ideal gas starts at $(300\ \mathrm{K},\ 1.00\ \mathrm{bar})$. It is (i) heated at constant pressure to $600\ \mathrm{K}$, (ii) cooled at constant volume back to $300\ \mathrm{K}$, (iii) compressed isothermally to the initial state. Take $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Compute $\Delta U$, $q$ and $w$ for each step and for the full cycle. (Enter the total cycle work $w_\text{cycle}$ in $\mathrm{kJ}$.)
::: solution
Initial volume $V_1 = nRT/p = 24.94\ \mathrm{L}$; after (i), $V_2 = 49.88\ \mathrm{L}$.

**Step (i)**, constant $p = 1.00\ \mathrm{bar}$: $\Delta U_1 = C_{V,\text{m}}\Delta T = 20.8\times300 = +6.24\ \mathrm{kJ}$; $w_1 = -p\,\Delta V = -1.00\times24.94\ \mathrm{L\,bar} = -2.49\ \mathrm{kJ}$; $q_1 = \Delta U_1 - w_1 = +8.73\ \mathrm{kJ}$ (equal to $C_{p,\text{m}}\Delta T$, as it must be).

**Step (ii)**, constant $V$: $\Delta U_2 = -6.24\ \mathrm{kJ}$, $w_2 = 0$, $q_2 = -6.24\ \mathrm{kJ}$.

**Step (iii)**, isothermal at $300\ \mathrm{K}$ from $49.88\ \mathrm{L}$ to $24.94\ \mathrm{L}$: $\Delta U_3 = 0$; $w_3 = -RT\ln(V_3/V_2) = -2.494\ \mathrm{kJ}\times\ln\tfrac{1}{2} = +1.73\ \mathrm{kJ}$; $q_3 = -1.73\ \mathrm{kJ}$.

**Cycle**: $\Delta U_\text{cycle} = 0$ exactly — internal energy is a state function and the cycle has no end states to differ. Carrying the unrounded steps, $w_\text{cycle} = -2.494 + 0 + 1.728 = -0.77\ \mathrm{kJ}$ and $q_\text{cycle} = +0.77\ \mathrm{kJ}$: the device takes in $0.77\ \mathrm{kJ}$ of heat and delivers $0.77\ \mathrm{kJ}$ of work, a (very inefficient) engine. The first law balances the books; whether the cycle is *allowed* is a question for the second law.
:::
:::
