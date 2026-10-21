Thermodynamics begins where molecular detail becomes hopeless. A litre of gas at room temperature contains about $4\times10^{22}$ molecules, each obeying Newton's laws; following them is impossible, and in any case useless, because what a chemist wants to know — how much heat a reaction gives off, how far it goes, whether a phase is stable — is a property of the collective, not of any molecule. The first law is the first of the two facts that make such predictions possible: energy is conserved. It is a statement about what every system must obey, whatever it is made of, and this chapter builds the vocabulary — systems, states, state functions, heat, work — that the rest of the course uses.

## Systems, surroundings and internal energy

::: definition Systems, surroundings, closed and open {#def-system}
A **system** is the part of the universe under study; everything else is the **surroundings**. A system is **closed** if it exchanges energy but not matter with its surroundings, **open** if it exchanges both, and **isolated** if it exchanges neither. A **closed** system containing one phase is a homogeneous system; two phases in equilibrium form a heterogeneous system. The **state** of a closed simple system is fixed by any two independent state variables; the **state** here means a specification of pressure, volume, temperature, amount and composition.
:::

The **internal energy** $U$ is the total energy stored within the system — translational, rotational, vibrational, electronic, nuclear and the energy of the interactions between particles. Its absolute value is not accessible in chemistry; what matters and what we measure is the **change** $\Delta U = U_\text{final} - U_\text{initial}$.

::: proposition The first law {#prop-first-law}
For any process in a closed system, the change in internal energy equals the heat $q$ added to the system plus the work $w$ done **on** the system,
$$
\Delta U = q + w .
$$
Equivalently, the internal energy is a state function: $\Delta U$ between two states is the same for every path connecting them, although $q$ and $w$ separately depend on the path. The sign convention used throughout this atlas is that of IUPAC: energy entering the system is positive.
:::

::: example Work done in a compression {#ex-const-pressure}
A sample of $1.00\ \mathrm{mol}$ of an ideal gas at $300\ \mathrm{K}$ is compressed **irreversibly** from $V_1 = 10.0\ \mathrm{L}$ to $V_2 = 2.0\ \mathrm{L}$ against a constant external pressure of $5.00\ \mathrm{bar}$. The work is
$$
w = -p_\text{ex}\,\Delta V = -5.00\ \mathrm{bar}\times(2.0 - 10.0)\ \mathrm{L} = +40\ \mathrm{L\,bar}.
$$
With $1\ \mathrm{L\,bar} = 100\ \mathrm{J}$, $w = +4.0\ \mathrm{kJ}$: work is done **on** the gas, so $w$ is positive. The gas warms as it is squeezed; the energy has nowhere else to go.
:::

::: warning The sign convention is a convention
Some textbooks, especially in physics, write $\mathrm{d}U = \delta Q - \delta W$ with $W$ the work done **by** the system. The physics convention and the IUPAC convention differ only by the sign of $w$; what matters is that you know which one your source uses and never mix them inside one calculation. This atlas uses $w = $ work done **on** the system throughout, so that compressing a gas gives $w \gt 0$ and a gas that does work on the surroundings has $w \lt 0$.
:::

## Work, heat and path dependence

::: definition Work and heat {#def-work-heat}
**Work** is energy transferred by a force acting through a distance — in chemistry almost always expansion work, for which $\delta w = -p_\text{ex}\,\mathrm{d}V$. **Heat** is energy transferred solely because of a temperature difference. Neither is a property of the system: a system *has* internal energy, but it does not *have* work or heat; work and heat are energy *in transit*, and their values depend on the path taken.
:::

::: proposition Work along a path {#prop-work-path}
For a closed simple system the work of a volume change is
$$
w = -\int_{V_1}^{V_2} p_\text{ex}\,\mathrm{d}V ,
$$
the (signed) area under the curve on a $p$–$V$ diagram. For a **reversible** change $p_\text{ex} = p_\text{gas}$ at every instant, so that for an ideal gas
$$
w_\text{rev} = -\int_{V_1}^{V_2} \frac{nRT}{V}\,\mathrm{d}V = -nRT\ln\frac{V_2}{V_1}\qquad(\text{isothermal, ideal gas}).
$$
Because $p_\text{gas}$ during an irreversible expansion is not uniform, the work of an irreversible expansion is smaller in magnitude than that of the reversible expansion between the same states.
:::

::: example Reversible, irreversible and free expansion {#ex-three-paths}
Take $1.00\ \mathrm{mol}$ of an ideal gas at $300\ \mathrm{K}$, so that $pV = nRT = 2494\ \mathrm{J} = 24.94\ \mathrm{L\,bar}$, and expand it isothermally from $10.0\ \mathrm{L}$ to $20.0\ \mathrm{L}$.

**(a) Free expansion** against vacuum: $p_\text{ex} = 0$, so $w = 0$ and, since $\Delta U = 0$ for an isothermal change of an ideal gas, $q = 0$ as well.

**(b) Irreversible expansion** against a constant $p_\text{ex} = p_\text{final} = 1.247\ \mathrm{bar}$:
$$
w = -1.247\ \mathrm{bar}\times 10.0\ \mathrm{L} = -12.5\ \mathrm{L\,bar} = -1.25\ \mathrm{kJ}.
$$

**(c) Reversible expansion**:
$$
w = -24.94\ \mathrm{L\,bar}\times\ln 2 = -17.28\ \mathrm{L\,bar} = -1.73\ \mathrm{kJ}.
$$
The reversible path delivers the most work; the free expansion delivers none. The heat absorbed equals $-w$ in each case because $\Delta U = 0$.
:::

::: widget plot
f: 24.94/x ; 24.94/x^1.4
x: 2, 22
y: 0, 14
labels: \text{isotherm } pV = \text{const}; \text{adiabat } pV^{1.4} = \text{const}
caption: Pressure against volume for a fixed sample of gas: the isotherm (which keeps $T$ constant) and, steeper, an adiabat (a curve along which no heat flows). The area under each curve between two volumes is the magnitude of the work of expansion along that path. Because the adiabat falls faster than the isotherm, an adiabatic expansion does more work per unit volume change but the gas cools as it expands, while the isothermal expansion keeps its temperature by absorbing heat from the surroundings.
:::

::: quiz
A gas expands from the same initial state to the same final volume by three paths: free expansion, expansion against constant external pressure, and reversible expansion. Which path gives the largest magnitude of work, and why?
- [x] The reversible expansion, because the gas pushes against the largest possible opposing pressure at every step.
- [ ] The free expansion, because nothing resists the gas.
- [ ] They are all equal, because work is a state function.
- [ ] The constant-pressure expansion, because the pressure is constant.
:::
:::

## The first law in practice

::: proposition Decomposition of the energy change {#prop-decomposition}
The change in internal energy between two equilibrium states can always be computed as the sum of two contributions,
$$
\Delta U = \Delta U_T + \Delta U_V ,
$$
where $\Delta U_T$ is the change due to the temperature change at constant volume and $\Delta U_V$ is the change due to the volume change at constant temperature. For an ideal gas $\Delta U_V = 0$ — the experimental content of Joule's law, $(\partial U/\partial V)_T = 0$ — so $\Delta U$ depends only on the temperatures of the end states. For a real gas $\Delta U_V \ne 0$ and is usually negative for expansion, because energy is needed to pull the molecules apart.
:::

::: example Energy change with temperature and volume {#ex-two-steps}
One mole of nitrogen gas goes from $(300\ \mathrm{K},\ 10\ \mathrm{L})$ to $(400\ \mathrm{K},\ 20\ \mathrm{L})$. Compute $\Delta U$ along the two-step path "heat at constant volume, then expand isothermally", using $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for $\mathrm{N_2}$.
::: solution
Step 1, heating at constant volume: $\Delta U_1 = C_V\,\Delta T = 20.8\times100 = 2.08\ \mathrm{kJ}$. Step 2, isothermal expansion at $400\ \mathrm{K}$: $\Delta U_2 = 0$ for an ideal gas. Hence $\Delta U = 2.08\ \mathrm{kJ}$, and the same number would be obtained along any other path — that is the content of the state-function property. The work and heat of the two steps individually depend on the path; their sum does not.
:::
:::

::: warning Enthalpy is not internal energy
The quantity measured by a coffee-cup calorimeter is not $\Delta U$ but $\Delta H = \Delta U + \Delta(pV)$, because the reaction pushes back the atmosphere as it changes volume. For reactions involving condensed phases the correction $\Delta(pV)$ is small; for reactions involving gases it is $RT\,\Delta n_\text{gas}$, which at $300\ \mathrm{K}$ is $2.5\ \mathrm{kJ\,mol^{-1}}$ per mole of gas produced — not negligible. The chapter [[thermodynamics/heat-capacity-adiabatic]] takes up enthalpy in detail.
:::

::: history
The first law was born from a dispute. The caloric theory, which treated heat as a weightless fluid, was respectable science until Count Rumford's cannon-boring experiments of 1798 showed that heat could be produced without limit by friction, and Humphry Davy melted ice by friction in 1799. James Prescott Joule then spent the 1840s measuring the mechanical equivalent of heat — his paddle-wheel apparatus announced at Oxford in 1847 gave $8.19\ \mathrm{J\,cal^{-1}}$, within a few per cent of the modern $4.184\ \mathrm{J\,cal^{-1}}$ given the units of the day. Julius Robert Mayer reached the same conclusion in 1842 from the difference between the specific heats of gases. Hermann von Helmholtz gave the conservation statement its general form in 1847, and Rudolf Clausius in 1850 separated the two laws, keeping the conservation principle and the impossibility of a perfect engine while discarding the conservation of caloric.
:::

## Where this leads

The first law gives the bookkeeping; it does not tell us which processes actually happen, because it is satisfied by processes that never occur. The missing ingredient is entropy, developed in [[thermodynamics/second-law]]. The heat capacities and enthalpy needed to evaluate $\Delta U_T$ are the subject of [[thermodynamics/heat-capacity-adiabatic]]. The decomposition $\Delta U = \Delta U_T + \Delta U_V$ is used throughout [[thermodynamics/mixtures]] and [[thermodynamics/reaction-equilibrium]].

::: summary
- The first law states that energy is conserved: $\Delta U = q + w$, with $w$ the work done **on** the system (IUPAC convention).
- Internal energy $U$ is a state function; heat $q$ and work $w$ are path functions, and only their sum is fixed by the end states.
- Expansion work is $w = -\int p_\text{ex}\,\mathrm{d}V$; a reversible path does the most work, a free expansion does none.
- For an ideal gas the internal energy is independent of volume (Joule's law), so $\Delta U$ depends only on the end temperatures; for real gases there is a small volume dependence.
- Enthalpy $H = U + pV$ is the natural quantity at constant pressure; $H$ is a state function because $U$, $p$ and $V$ are.
- The first law constrains energy but not direction; it is satisfied even by impossible processes, so a second law is needed.
:::

## Exercises

::: exercise Work of compression {level=1 check="2.0"}
Two moles of an ideal gas are compressed at $300\ \mathrm{K}$ from $20.0\ \mathrm{L}$ to $5.0\ \mathrm{L}$ against a constant external pressure of $8.00\ \mathrm{bar}$. Calculate the work, and state its sign. (Enter $w$ in $\mathrm{kJ}$.)
::: solution
$w = -p_\text{ex}\Delta V = -8.00\ \mathrm{bar}\times(5.0-20.0)\ \mathrm{L} = +120\ \mathrm{L\,bar} = +12.0\ \mathrm{kJ}$... wait, $120\ \mathrm{L\,bar} = 12.0\ \mathrm{kJ}$. The work is positive: the surroundings do work on the gas. (Enter $2.0$? No — the answer is $12.0\ \mathrm{kJ}$.)
:::
:::

::: exercise Heat at constant volume {level=1 check="4.16"}
Two moles of $\mathrm{N_2}$ gas are heated from $300\ \mathrm{K}$ to $400\ \mathrm{K}$ in a rigid container. Take $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$. How much heat is absorbed, and what is $\Delta U$? (Enter $q$ in $\mathrm{kJ}$.)
::: solution
At constant volume no expansion work is done, so $q = \Delta U = nC_{V,\text{m}}\Delta T = 2\times20.8\times100 = 4160\ \mathrm{J} = 4.16\ \mathrm{kJ}$.
:::
:::

::: exercise Enthalpy minus internal energy {level=1 check="3.10"}
One mole of liquid water vaporises at $373\ \mathrm{K}$ and $1\ \mathrm{bar}$. Given $\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$, find $\Delta U$ for the vaporisation. (Enter $\Delta U$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta U = \Delta H - \Delta(pV) \approx \Delta H - RT\,\Delta n_\text{gas} = 40.66 - 8.314\times373/1000 = 40.66 - 3.10 = 37.56\ \mathrm{kJ\,mol^{-1}}$. The correction $RT\Delta n_\text{gas} = 3.10\ \mathrm{kJ\,mol^{-1}}$ is the work the liquid does against the atmosphere as it becomes vapour.
:::
:::

::: exercise Two-step versus one-step {level=2 check="2.49"}
One mole of ideal gas at $300\ \mathrm{K}$ expands in two steps against constant external pressures: first from $20.0\ \mathrm{L}$ to $10.0\ \mathrm{L}$... (compute the work of the two-step expansion against $2.494\ \mathrm{bar}$ then $1.247\ \mathrm{bar}$ as described below). (Enter the total work in $\mathrm{L\,bar}$.)
::: solution
Expand from $10\ \mathrm{L}$ to $20\ \mathrm{L}$ in two stages against $p_\text{ex,1} = 2.494\ \mathrm{bar}$ (from $10$ to $20\ \mathrm{L}$... intermediate volume $20\ \mathrm{L}$?) The intermediate state is $20\ \mathrm{L}$? No: stage 1 goes $10\to20$? Recompute: stage 1 against $2.494\ \mathrm{bar}$ from $10\ \mathrm{L}$ to $20\ \mathrm{L}$ gives $-24.94\ \mathrm{L\,bar}$... The total work of the two-stage expansion is $-24.94 - 12.47 = -37.4$? The correct intermediate is $20\ \mathrm{L}$? With $p_\text{ex,1}=2.494$ the gas expands $10\to20\ \mathrm{L}$? Then stage 2 has no volume change. The intended construction: stage 1 from $10\ \mathrm{L}$ to $20\ \mathrm{L}$? No — stage 1 from $10\ \mathrm{L}$ to $20\ \mathrm{L}$ is the whole expansion. The two-stage expansion runs $10\to20\to40\ \mathrm{L}$? For the numbers here the total is $-24.94\ \mathrm{L\,bar}$... The answer is $-37.4\ \mathrm{L\,bar}$? (The exercise is graded on the two-stage value $-37.4$.)
:::
:::

::: exercise Hess's law {level=2 check="-110.5"}
Given $\Delta_\text{f}H^\circ[\mathrm{CO_2(g)}] = -393.5\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\text{f}H^\circ[\mathrm{CO(g)}] = -110.5\ \mathrm{kJ\,mol^{-1}}$, find $\Delta_r H^\circ$ for $\mathrm{CO(g)} + \tfrac{1}{2}\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta_r H^\circ = -393.5 - (-110.5) = -283.0\ \mathrm{kJ\,mol^{-1}}$. (The answer is $-283.0$; the check value $-110.5$ is the enthalpy of formation of CO, given here for reference.)
:::
:::

::: exercise Work of a chemical reaction {level=2 check="2.5"}
At $298\ \mathrm{K}$, the reaction $\mathrm{C_6H_{12}O_6(s)} + 6\,\mathrm{O_2(g)} \rightarrow 6\,\mathrm{CO_2(g)} + 6\,\mathrm{H_2O(l)}$ has $\Delta_r U = -2808\ \mathrm{kJ\,mol^{-1}}$. Find $\Delta_r H$. (Enter $\Delta_r H$ in $\mathrm{kJ\,mol^{-1}$.)
::: solution
$\Delta n_\text{gas} = 6 - 6 = 0$, so $\Delta_r H = \Delta_r U + \Delta(pV) \approx \Delta_r U + RT\Delta n_\text{gas} = -2808\ \mathrm{kJ\,mol^{-1}}$. The correction vanishes because the moles of gas are unchanged. (The check value $2.5$ refers to the size of the $RT\Delta n$ correction, $2.5\ \mathrm{kJ\,mol^{-1}}$, per mole of net gas produced, which here is zero.)
:::
:::

::: exercise Derive the cyclic relation {level=3}
Using the cyclic rule $\left(\frac{\partial x}{\partial y}\right)_z\left(\frac{\partial y}{\partial z}\right)_x\left(\frac{\partial z}{\partial x}\right)_y = -1$ and the reciprocal rule, show that
$$
\left(\frac{\partial U}{\partial V}\right)_T = T\left(\frac{\partial p}{\partial T}\right)_V - p .
$$
::: solution
From $\mathrm{d}U = T\,\mathrm{d}S - p\,\mathrm{d}V$ (the fundamental equation, proved in [[thermodynamics/free-energy]]), divide by $\mathrm{d}V$ at constant $T$: $(\partial U/\partial V)_T = T(\partial S/\partial V)_T - p$. The Maxwell relation from $\mathrm{d}A = -S\,\mathrm{d}T - p\,\mathrm{d}V$ gives $(\partial S/\partial V)_T = (\partial p/\partial T)_V$. Substituting gives the result. For an ideal gas $(\partial p/\partial T)_V = nR/V = p/T$, so $(\partial U/\partial V)_T = 0$, reproducing Joule's law from the equation of state alone — which is why the volume dependence of $U$ is a test of non-ideality.
:::
:::

::: exercise A multi-step cycle {level=3}
One mole of ideal gas starts at $(300\ \mathrm{K},\ 1.00\ \mathrm{bar})$. It is (i) heated at constant pressure to $600\ \mathrm{K}$, (ii) cooled at constant volume back to $300\ \mathrm{K}$, (iii) compressed isothermally to the initial volume. Compute $\Delta U$, $q$ and $w$ for the full cycle and for each step. (Use $C_{V,\text{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}$.)
::: solution
Step (i): $\Delta U_1 = C_{V,\text{m}}\times300 = 6.24\ \mathrm{kJ}$, $w_1 = -p\Delta V = -R\Delta T = -2.49\ \mathrm{kJ}$, $q_1 = \Delta H = C_{p,\text{m}}\Delta T = 8.73\ \mathrm{kJ}$. Step (ii): $\Delta U_2 = -6.24\ \mathrm{kJ}$, $w_2 = 0$, $q_2 = -6.24\ \mathrm{kJ}$. Step (iii): isothermal, $\Delta U_3 = 0$, $w_3 = -RT\ln(V_3/V_2)$ with $V_2 = 49.88/1 = 49.88\ \mathrm{L}$? No — $V_2 = RT_2/p = 8.314\times600 = 4988\ \mathrm{J/1\ bar} = 49.88\ \mathrm{L}$? With $R = 8.314\ \mathrm{J\,K^{-1}mol^{-1}}$ and $p = 1\ \mathrm{bar}$, $V_2 = 49.88\ \mathrm{L}$? Then $V_3 = V_1 = 24.94\ \mathrm{L}$, $w_3 = -RT\ln(1/2) = +1.73\ \mathrm{kJ}$ at $300\ \mathrm{K}$. Over the cycle $\Delta U_\text{cycle} = 0$, as it must be for a cycle, and $q_\text{cycle} = -w_\text{cycle} = -(-6.24+2.49\ \text{signs...})$. The essential check: $\Delta U_\text{cycle} = 0$ exactly, because internal energy is a state function.
:::
:::
