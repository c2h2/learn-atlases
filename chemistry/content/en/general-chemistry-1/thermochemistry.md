A portable stove burns a few grams of methane and the pot boils. A cold pack, twisted, takes the same sort of pouch and turns it icy, because the salt dissolving inside absorbs heat rather than releasing it. Both events are chemical changes of the kind balanced in [[general-chemistry-1/stoichiometry]], and both move energy. Thermochemistry is the ledger for that movement: how much heat a reaction gives out or takes in, how that heat is split between the internal energy and the work of expansion, and how to obtain the number when the reaction you care about cannot be run in a calorimeter at all.

The ledger has one structural fact underneath it. Heat and work depend on the path; the internal energy does not. Everything else in the chapter — enthalpy, Hess's law, the tables of formation enthalpies — is that fact applied to the way chemists actually run reactions, which is usually in open vessels at constant pressure.

## Heat, work and the internal energy

::: definition System, heat and work {#def-heat-work}
The **system** is the sample under study; the **surroundings** are everything else. A system is **closed** if matter does not cross its boundary, **open** if matter does, and **isolated** if neither matter nor energy does. **Heat** $q$ is energy transferred because of a temperature difference. **Work** $w$ is energy transferred by any other organised means. In this course the work is almost always **expansion work**, $w = -p_\mathrm{ex}\Delta V$, where $p_\mathrm{ex}$ is the external pressure the system pushes against and $\Delta V = V_\mathrm{f} - V_\mathrm{i}$. The sign convention is the IUPAC one, used throughout this atlas: $q$ and $w$ are positive when energy enters the system.
:::

A gas heated in a cylinder with a piston does both things at once. Energy arrives as heat across a temperature gradient, and energy leaves as work because the piston moves. Neither quantity is a property the gas "has". Ask where the heat resides after the flame is removed and the question has no answer: the heat has become internal energy, or has left again as work. What the system does have is its **internal energy** $U$, the sum of the kinetic and potential energies of its molecules, measured from an arbitrary zero. Only changes $\Delta U$ are observable in chemistry.

::: proposition The first law {#prop-first-law}
For a closed system,
$$
\Delta U = q + w .
$$
The internal energy is a **state function**: $\Delta U$ between two states depends only on those states, not on the path. Heat and work are **path functions**. Along any cycle, $\oint \mathrm{d}U = 0$, while the net heat and the net work need not vanish separately.
:::

The ideal-gas special case is used constantly. For a fixed amount of ideal gas, $U$ depends on temperature alone — Joule's result, discussed from the molecular side in [[general-chemistry-1/gases]] — so an isothermal change has $\Delta U = 0$ and therefore $q = -w$. A free expansion against vacuum has $p_\mathrm{ex} = 0$, hence $w = 0$, hence $q = 0$ as well: the gas spreads, and nothing thermal has to happen.

::: example Expansion against a constant external pressure {#ex-work}
A closed sample absorbs $q = +1.50\ \mathrm{kJ}$ and expands from $2.00\ \mathrm{L}$ to $8.00\ \mathrm{L}$ against a constant $p_\mathrm{ex} = 1.50\ \mathrm{bar}$. Find $w$, $\Delta U$ and, looking ahead, the enthalpy change.
::: solution
The pressure is constant and only expansion work is done, so
$$
w = -p_\mathrm{ex}\Delta V = -(1.50\ \mathrm{bar})(6.00\ \mathrm{L}) = -9.00\ \mathrm{L\,bar}.
$$
The conversion $1\ \mathrm{L\,bar} = 100\ \mathrm{J}$ is exact, because $1\ \mathrm{bar} = 10^{5}\ \mathrm{Pa}$ and $1\ \mathrm{L} = 10^{-3}\ \mathrm{m^{3}}$. Thus $w = -0.900\ \mathrm{kJ}$: the system does work on the surroundings. The first law then gives
$$
\Delta U = q + w = 1.50 + (-0.900) = +0.600\ \mathrm{kJ}.
$$
At constant pressure the heat equals the enthalpy change derived in the next section, so $\Delta H = q = +1.50\ \mathrm{kJ}$. The check is $\Delta H = \Delta U + p\Delta V = 0.600 + 0.900 = 1.50\ \mathrm{kJ}$. Three different numbers describe one process, and only $\Delta U$ would be the same if the gas had travelled by another route.
:::
:::

::: warning Heat is not a property, and the sign is not optional {#warn-heat}
Two mistakes dominate this chapter. The first is to treat heat as a substance stored in a body — the eighteenth-century caloric picture. A system has internal energy, enthalpy, temperature and pressure. It does not have a heat content, and "the heat of the products" is not a phrase with a meaning. The second is to import a sign convention silently. Engineering texts often write $\Delta U = q - w$ with $w$ the work done *by* the system. Their $w$ is the negative of ours. Mixing the two conventions inside one calculation reverses every conclusion about whether a process stores energy or spends it. This atlas takes $w$ as work done *on* the system, so a compression has $w > 0$ and an expansion that drives a piston has $w < 0$.
:::

## Enthalpy

Most reactions are not run in a sealed bomb. They are run in beakers, flasks and furnaces open to the atmosphere, so the pressure is constant and the volume is whatever it needs to be. The heat measured in that arrangement is not $\Delta U$, because the system spends some energy pushing the atmosphere aside, or gains some if the atmosphere pushes in. The quantity that matches constant-pressure heat is the enthalpy.

::: definition Enthalpy {#def-enthalpy}
The **enthalpy** is the state function
$$
H \equiv U + pV .
$$
It is a state function because $U$, $p$ and $V$ are. Its absolute value is arbitrary, for the same reason $U$ is; chemistry uses $\Delta H$.
:::

::: proposition Heat at constant pressure {#prop-qp}
For a closed system at constant pressure, with no work other than expansion work,
$$
\Delta H = q_p .
$$
At constant volume, with no work of any kind, $\Delta U = q_V$. A reaction that produces gas in an open vessel therefore has $q_p \ne q_V$ whenever the amount of gas changes.
:::

::: proof
At constant pressure, $\Delta(pV) = p\Delta V$, so
$$
\Delta H = \Delta U + p\Delta V .
$$
The first law gives $\Delta U = q + w$, and the only work is $w = -p_\mathrm{ex}\Delta V$. Mechanical equilibrium with a constant external pressure means $p_\mathrm{ex} = p$, the pressure of the system, so $w = -p\Delta V$ and
$$
\Delta H = q_p - p\Delta V + p\Delta V = q_p .
$$
At constant volume, $\Delta V = 0$, so $w = 0$ and $\Delta U = q_V$. The argument fails as soon as another kind of work is done: in an electrochemical cell the electrical work is extra, and the heat at constant pressure is no longer $\Delta H$.
:::

The practical relation between the two calorimetric quantities follows at once for reactions in which the volume of every solid and liquid is negligible beside the volume of the gases, and the gases are ideal.

::: proposition Enthalpy and internal energy of a reaction {#prop-hu}
At constant temperature,
$$
\Delta_\mathrm{r} H = \Delta_\mathrm{r} U + \Delta n_\mathrm{g}\, RT ,
$$
where $\Delta n_\mathrm{g}$ is the change in the amount of gas, in moles of gas per mole of reaction as written (products minus reactants). Here $R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Condensed phases contribute nothing to $\Delta n_\mathrm{g}$.
:::

::: proof
$\Delta H = \Delta U + \Delta(pV)$. For ideal gases $pV = nRT$, and at constant temperature $\Delta(nRT) = \Delta n\, RT$. Dropping the $pV$ of solids and liquids against that of the gases leaves $\Delta(pV) = \Delta n_\mathrm{g}\, RT$.
:::

At $298.15\ \mathrm{K}$, $RT = 2.479\ \mathrm{kJ\,mol^{-1}}$. Each mole of gas created therefore makes $\Delta_\mathrm{r} H$ more positive than $\Delta_\mathrm{r} U$ by about $2.5\ \mathrm{kJ}$ — small beside a combustion of several hundred kilojoules, and decisive for a reaction whose enthalpy change is itself only a few kilojoules.

::: example Heating nitrogen at constant pressure {#ex-nitrogen}
Heat $2.00\ \mathrm{mol}$ of $\mathrm{N_2}$, treated as an ideal gas with the approximate molar heat capacity $C_{p,\mathrm{m}} = 29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$, from $300.0\ \mathrm{K}$ to $450.0\ \mathrm{K}$ at constant pressure. Find $q$, $w$, $\Delta H$ and $\Delta U$.
::: solution
The pressure is constant and only expansion work is done, so $q = q_p = \Delta H$:
$$
\Delta H = n\, C_{p,\mathrm{m}}\, \Delta T = (2.00\ \mathrm{mol})(29.1\ \mathrm{J\,K^{-1}\,mol^{-1}})(150.0\ \mathrm{K}) = 8.73\times 10^{3}\ \mathrm{J} = 8.73\ \mathrm{kJ}.
$$
For an ideal gas at constant pressure the work is fixed by the temperature change alone,
$$
w = -nR\Delta T = -(2.00)(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(150.0\ \mathrm{K}) = -2.49\times 10^{3}\ \mathrm{J} = -2.49\ \mathrm{kJ}.
$$
The first law then gives $\Delta U = q + w = 8.73 - 2.49 = 6.24\ \mathrm{kJ}$. Equivalently, $\Delta U = \Delta H - nR\Delta T$, which is [[#prop-hu]] applied to a physical change with $\Delta n_\mathrm{g} = 0$ in the reaction sense but $\Delta(nRT) = nR\Delta T$ because $T$ changed. The gas absorbed $8.73\ \mathrm{kJ}$ of heat, stored $6.24\ \mathrm{kJ}$ as internal energy, and spent $2.49\ \mathrm{kJ}$ pushing back the atmosphere. $C_{p,\mathrm{m}}$ is stated to one decimal place, so the answers are given to a hundredth of a kilojoule.
:::
:::

## Calorimetry

Measuring $q$ is an art of not losing heat to the room, but the accounting is plain.

::: definition Heat capacity and calorimetry {#def-heat-capacity}
The **heat capacity** $C$ of a sample is the heat required to raise its temperature by one kelvin along a stated path: $C_p = \mathrm{d}H/\mathrm{d}T$ at constant pressure and $C_V = \mathrm{d}U/\mathrm{d}T$ at constant volume. The **specific heat capacity** $c$ is the heat capacity per gram, and the **molar heat capacity** $C_\mathrm{m}$ is the heat capacity per mole. For a temperature change small enough that $c$ may be treated as constant,
$$
q = mc\,\Delta T = n C_\mathrm{m}\,\Delta T .
$$
A **calorimeter** is a vessel of known heat capacity in which that temperature change is measured. A coffee-cup calorimeter, open to the atmosphere, measures $q_p$. A bomb calorimeter, a sealed steel vessel of constant volume, measures $q_V$.
:::

The specific heat capacity of liquid water near room temperature is $4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$. Two consequences follow. Water is a blunt thermometer: a large energy change hides inside a small temperature rise, which is why biological systems and calorimeters both use it. And a numerical rise means nothing until the mass, and the heat capacity of the vessel itself, are known.

::: widget plot
f: 25 + 1000*x/(m*4.184)
x: 0, 8
y: 20, 70
sliders: m=100:50:200:10
labels: T/^\circ\mathrm{C}
caption: Temperature of $m$ grams of liquid water, specific heat capacity $4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$, after $x$ kilojoules have been added at constant pressure, starting from $25\,^\circ\mathrm{C}$. The slope is $1/(mc)$. A heavier sample rises less: calorimetry reads this line backwards, from a measured rise to the heat that caused it.
:::

In a real experiment the calorimeter, not only the solution, absorbs heat. If $C_\mathrm{cal}$ is the heat capacity of the hardware,
$$
q_\mathrm{rxn} + q_\mathrm{contents} + q_\mathrm{cal} = 0
$$
when the whole apparatus is insulated from the room, because the reaction, the contents and the hardware together are then an isolated system and their energy changes sum to zero. Neglecting $C_\mathrm{cal}$ makes $|q_\mathrm{rxn}|$ come out too small. Student coffee-cup results are systematically a little low for that reason, and the honest write-up says so.

::: example Neutralisation in a coffee cup {#ex-cup}
$50.0\ \mathrm{cm^{3}}$ of $1.00\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl(aq)}$ and $50.0\ \mathrm{cm^{3}}$ of $1.00\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH(aq)}$, both at $21.50\,^\circ\mathrm{C}$, are mixed in a coffee-cup calorimeter. The temperature rises to $28.20\,^\circ\mathrm{C}$. Take the solution's density as $1.00\ \mathrm{g\,cm^{-3}}$ and its specific heat capacity as that of water, $4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$, and neglect the cup. Find $\Delta H$ for
$$
\mathrm{H^{+}(aq)} + \mathrm{OH^{-}(aq)} \rightarrow \mathrm{H_2O(l)} .
$$
::: solution
The mass of solution is $100.0\ \mathrm{g}$ and $\Delta T = 6.70\ \mathrm{K}$. The heat gained by the solution is
$$
q_\mathrm{sol} = (100.0\ \mathrm{g})(4.184\ \mathrm{J\,g^{-1}\,K^{-1}})(6.70\ \mathrm{K}) = 2.803\times 10^{3}\ \mathrm{J} = 2.803\ \mathrm{kJ}.
$$
The reaction supplied that heat, so $q_\mathrm{rxn} = -2.803\ \mathrm{kJ}$. Each solution contains $0.0500\ \mathrm{mol}$ of reagent, and the stoichiometry is one to one, so $0.0500\ \mathrm{mol}$ of water is formed. The pressure is constant, and
$$
\Delta H = \frac{-2.803\ \mathrm{kJ}}{0.0500\ \mathrm{mol}} = -56.1\ \mathrm{kJ\,mol^{-1}}.
$$
The temperature rise $6.70$ has three significant figures, which limits the result. The accepted standard value is near $-55.8\ \mathrm{kJ\,mol^{-1}}$; the difference is the neglected heat capacity of the cup, the assumed properties of the solution, and ordinary thermometer error. The sign is the chemistry: neutralisation of a strong acid by a strong base is exothermic, and the beaker warms.
:::
:::

A bomb is the right tool when a reaction must be forced, as combustions are. The bomb reports $\Delta U$, and [[#prop-hu]] converts it to the enthalpy the tables quote. The combustion of methane,
$$
\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)} ,
$$
has $\Delta n_\mathrm{g} = 1 - 3 = -2$. Two moles of gas disappear per mole of reaction, so at $298.15\ \mathrm{K}$
$$
\Delta n_\mathrm{g}\, RT = -2(8.314)(298.15)\times 10^{-3}\ \mathrm{kJ\,mol^{-1}} = -4.958\ \mathrm{kJ\,mol^{-1}}.
$$
An enthalpy of combustion near $-890\ \mathrm{kJ\,mol^{-1}}$ corresponds to an internal-energy change about $5\ \mathrm{kJ\,mol^{-1}}$ less negative. The worked bomb calculation is an exercise at the end of the chapter; the formation-table route, which is how the $-890$ is usually obtained, comes next.

## Hess's law

Many enthalpies cannot be measured as written. Carbon burned in limited oxygen gives a mixture of $\mathrm{CO}$ and $\mathrm{CO_2}$, so the formation of carbon monoxide is not a clean calorimetric reaction. Diamond's conversion to graphite is too slow. The way through is that $H$ is a state function, so the enthalpy of a route depends only on the ends.

::: proposition Hess's law {#prop-hess}
The standard enthalpy change of a reaction is the sum of the standard enthalpy changes of any sequence of reactions that starts at the same reactants and ends at the same products. Reversing a step reverses the sign of its $\Delta H$. Multiplying a step by a factor multiplies $\Delta H$ by that factor. The law holds because $H$ is a state function, not because of a special property of heat.
:::

::: proof
Let reactants in a stated state $R$ become products in a stated state $P$. Along a direct path, $\Delta H = H_P - H_R$. Along a path $R \to I \to P$,
$$
\Delta H = (H_I - H_R) + (H_P - H_I) = H_P - H_R .
$$
The intermediate cancels. The same cancellation runs through any number of steps, so every path between the same end states has the same $\Delta H$. What fails, if one is careless, is the phrase "the same end states": the phase, the allotrope and the temperature are part of the state. Water liquid and water gas are not interchangeable, and graphite is not diamond.
:::

::: example The formation enthalpy of carbon monoxide {#ex-co}
At $298.15\ \mathrm{K}$ the approximate textbook values
$$
\begin{align*}
\mathrm{C(graphite)} + \mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -393.5\ \mathrm{kJ\,mol^{-1}} , \\
\mathrm{CO(g)} + \tfrac{1}{2}\,\mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -283.0\ \mathrm{kJ\,mol^{-1}}
\end{align*}
$$
are given. Find $\Delta H^\circ$ for $\mathrm{C(graphite)} + \tfrac{1}{2}\,\mathrm{O_2(g)} \rightarrow \mathrm{CO(g)}$.
::: solution
The target is the first reaction minus the second. Subtracting a reaction is adding its reverse:
$$
\Delta H^\circ = -393.5 - (-283.0) = -110.5\ \mathrm{kJ\,mol^{-1}}.
$$
Carbon monoxide lies downhill from the elements, but less far downhill than carbon dioxide. That is why $\mathrm{CO}$ burns, and why a stove starved of air produces a poisonous gas that is itself still a fuel. The value $-110.5\ \mathrm{kJ\,mol^{-1}}$ is the standard enthalpy of formation of $\mathrm{CO(g)}$, which the next section defines properly. The arithmetic is exact for the data as given; both inputs are quoted to one decimal place, and so is the result.
:::
:::

::: history From the ice calorimeter to the name enthalpy {#hist-thermo}
Lavoisier and Laplace, in the *Mémoire sur la chaleur* of 1783, measured heats of combustion with an ice calorimeter and argued that the heat of a decomposition is the heat of the corresponding formation with the opposite sign — Hess's law in a special case, half a century early. Germain Hess, in St Petersburg in 1840, stated the general law of constant heat summation from a body of thermochemical measurements. James Joule's paddle-wheel experiments of the 1840s showed that a measured quantity of work produces a measured quantity of heat, so the two belong in one conservation law; the first law is that demonstration, written as $\Delta U = q + w$. J. Willard Gibbs, in *On the Equilibrium of Heterogeneous Substances* (1876–1878), used the combination $U + pV$ systematically and called it the heat function at constant pressure. Heike Kamerlingh Onnes gave that function the name enthalpy in 1909. The tables used in this chapter are the descendants of the ice calorimeter, organised by Gibbs's state function.
:::

## Standard enthalpies of formation

Hess's law becomes a machine once every compound is assigned a single number: the enthalpy of making it from the elements.

::: definition Standard enthalpy of formation {#def-formation}
The **standard molar enthalpy of formation** $\Delta_\mathrm{f} H^\circ$ of a substance is the enthalpy change when one mole of it is formed from its elements in their standard states, at the temperature of interest (almost always $298.15\ \mathrm{K}$ in tables) and at the standard pressure $p^\circ = 1\ \mathrm{bar}$. By definition $\Delta_\mathrm{f} H^\circ = 0$ for an element in its standard state: graphite, not diamond, for carbon; $\mathrm{O_2(g)}$ and $\mathrm{H_2(g)}$; $\mathrm{Br_2(l)}$, not the vapour; orthorhombic sulfur, not monoclinic sulfur and not $\mathrm{S(g)}$. Formation enthalpies of aqueous ions are fixed by the additional convention $\Delta_\mathrm{f} H^\circ(\mathrm{H^{+}, aq}) = 0$.
:::

The values used in this lesson are approximate textbook values at $298.15\ \mathrm{K}$, in $\mathrm{kJ\,mol^{-1}}$, and every problem below uses this same set:

| substance | $\Delta_\mathrm{f} H^\circ$ |
|---|---|
| $\mathrm{CO_2(g)}$ | $-393.5$ |
| $\mathrm{H_2O(l)}$ | $-285.8$ |
| $\mathrm{H_2O(g)}$ | $-241.8$ |
| $\mathrm{CH_4(g)}$ | $-74.8$ |
| $\mathrm{CO(g)}$ | $-110.5$ |

The water pair is a check on the idea of a state. Vaporisation $\mathrm{H_2O(l)} \rightarrow \mathrm{H_2O(g)}$ has
$$
\Delta H^\circ = -241.8 - (-285.8) = +44.0\ \mathrm{kJ\,mol^{-1}}
$$
at $298.15\ \mathrm{K}$. Quoting "the enthalpy of water" without a phase is meaningless at the level of forty kilojoules per mole, which is larger than many reaction enthalpies one is asked to trust. The carbon monoxide entry is exactly the result of [[#ex-co]]: $-393.5 - (-283.0) = -110.5$. The three numbers are one fact written three ways, which is what a state function guarantees.

::: proposition Reaction enthalpies from formation enthalpies {#prop-from-formation}
For a reaction written with stoichiometric coefficients $\nu_i$ (positive for products, negative for reactants),
$$
\Delta_\mathrm{r} H^\circ = \sum_i \nu_i\, \Delta_\mathrm{f} H^\circ(i) .
$$
Equivalently, sum $\nu\,\Delta_\mathrm{f} H^\circ$ over products and subtract the same sum over reactants. The relation is Hess's law applied to a path that unbuilds the reactants into elements and builds the products out of those elements. Elements in their standard states contribute zero and may be omitted.
:::

::: example Combustion of methane {#ex-methane}
Using the table above, find $\Delta_\mathrm{r} H^\circ$ for the combustion of methane to liquid water, and the enthalpy change when $10.00\ \mathrm{g}$ of methane ($M = 16.04\ \mathrm{g\,mol^{-1}}$) burns in this way.
::: solution
$$
\begin{align*}
\Delta_\mathrm{r} H^\circ &= \Delta_\mathrm{f} H^\circ(\mathrm{CO_2}) + 2\,\Delta_\mathrm{f} H^\circ(\mathrm{H_2O, l}) - \Delta_\mathrm{f} H^\circ(\mathrm{CH_4}) \\
&= -393.5 + 2(-285.8) - (-74.8) \\
&= -393.5 - 571.6 + 74.8 = -890.3\ \mathrm{kJ\,mol^{-1}}.
\end{align*}
$$
The amount of methane is $n = 10.00/16.04 = 0.6234\ \mathrm{mol}$, so the enthalpy change of the system is
$$
\Delta H = (0.6234\ \mathrm{mol})(-890.3\ \mathrm{kJ\,mol^{-1}}) = -555.0\ \mathrm{kJ}.
$$
The surroundings receive $555.0\ \mathrm{kJ}$ of heat if the combustion is carried out at constant pressure. Oxygen's formation enthalpy is zero and does not appear. Had the water been produced as gas, each of the two moles would have contributed $-241.8$ instead of $-285.8$, and $\Delta_\mathrm{r} H^\circ$ would have been less negative by $2\times 44.0 = 88.0\ \mathrm{kJ\,mol^{-1}}$, namely $-802.3\ \mathrm{kJ\,mol^{-1}}$. A flue that sends steam up the chimney wastes that $88\ \mathrm{kJ}$ relative to a condenser that recovers liquid water. The molar mass and the $10.00\ \mathrm{g}$ both support four significant figures, and $-555.0$ uses them.
:::
:::

Two temperatures are easy to confuse. The $298.15\ \mathrm{K}$ in the table is the temperature at which the formation enthalpies were evaluated, not the temperature of the flame. The flame is far hotter; the enthalpy change computed here is the heat of the reaction as if reactants had been supplied at $298.15\ \mathrm{K}$ and products removed at $298.15\ \mathrm{K}$. Getting the products back down to $298.15\ \mathrm{K}$ is part of $\Delta_\mathrm{r} H^\circ$. Kirchhoff's law, which corrects $\Delta_\mathrm{r} H$ from one temperature to another when heat capacities are known, is the subject of an exercise; over a few tens of kelvin the correction is a kilojoule or two, not tens.

::: quiz
A reaction has $\Delta_\mathrm{r} H^\circ = -200\ \mathrm{kJ\,mol^{-1}}$ and $\Delta n_\mathrm{g} = 0$. Which statement is correct?
- [x] At constant pressure $q_p = -200\ \mathrm{kJ}$ per mole of reaction, and $\Delta_\mathrm{r} U^\circ$ is almost the same because no gas is created or consumed.
- [ ] The reaction releases $200\ \mathrm{kJ}$ of heat at constant volume and absorbs $200\ \mathrm{kJ}$ at constant pressure.
- [ ] $\Delta_\mathrm{r} H^\circ$ is the heat stored in the products, and it does not depend on writing the equation with a phase for each substance.
- [ ] The enthalpy change depends on whether the reaction is run in one step or two.
::: solution
With $\Delta n_\mathrm{g} = 0$, [[#prop-hu]] gives $\Delta_\mathrm{r} H \approx \Delta_\mathrm{r} U$, and at constant pressure $q_p = \Delta H$. Heat is not stored in the products: $\Delta H$ is a difference between states. Hess's law says the path does not matter. The phase does matter, which is why the third statement fails twice.
:::
:::

## Where this leads

Enthalpy is the heat ledger. It does not say whether a reaction runs. Dissolving ammonium nitrate is endothermic and spontaneous; the combustion of methane is exothermic and, once lit, spontaneous; diamond turning to graphite is exothermic and immeasurably slow. The missing factor is entropy, and the combination $\Delta H - T\Delta S$ is the Gibbs energy of [[general-chemistry-2/entropy-free-energy]]. The same formation enthalpies reappear there beside entropies, and they reappear again in the Born–Haber cycle of [[bonding-structure/ionic-bonding]], where a lattice enthalpy that cannot be measured directly is built out of measurable steps exactly by Hess's law. The stoichiometric coefficient that scales $-890.3\ \mathrm{kJ\,mol^{-1}}$ down to a mass of fuel is the mole ratio of [[general-chemistry-1/stoichiometry]]. The $pV$ work and the ideal-gas law underneath [[#prop-hu]] are [[general-chemistry-1/gases]].

::: summary
- $\Delta U = q + w$ with $w$ the work done on the system. $U$ is a state function; $q$ and $w$ are not.
- $H = U + pV$, and at constant pressure with only expansion work, $\Delta H = q_p$. At constant volume with no work, $\Delta U = q_V$.
- For ideal-gas reactions, $\Delta_\mathrm{r} H = \Delta_\mathrm{r} U + \Delta n_\mathrm{g}\, RT$. At $298.15\ \mathrm{K}$ each mole of gas produced adds about $2.5\ \mathrm{kJ\,mol^{-1}}$.
- A coffee-cup calorimeter measures $q_p$; a bomb measures $q_V$. Ignoring the vessel's heat capacity underestimates $|q|$.
- Hess's law is path-independence of $H$. Reversing a step reverses $\Delta H$; scaling a step scales $\Delta H$. Phases are part of the state.
- $\Delta_\mathrm{f} H^\circ = 0$ for elements in their standard states, and $\Delta_\mathrm{r} H^\circ$ is the stoichiometric sum of formation enthalpies. The values in this lesson are one consistent approximate textbook set.
- Water liquid and water gas differ by $44.0\ \mathrm{kJ\,mol^{-1}}$ on that set. An enthalpy without a phase is not yet a number.
:::

## Exercises

::: exercise Signs in an adiabatic compression {level=1}
A gas is compressed by a piston inside a well-insulated cylinder. The temperature of the gas rises. Give the sign of $q$, of $w$ and of $\Delta U$, and say which of the three would change if the insulation were removed and the compression were done slowly enough that the gas stayed at the temperature of the room.
::: solution
The cylinder is insulated, so $q = 0$ by the definition of an adiabatic wall. The piston compresses the gas, so the surroundings do work on the system and $w > 0$. The first law then forces $\Delta U = w > 0$, which is why the temperature rises (for an ideal gas $U$ depends only on $T$). If the wall conducts and the compression is isothermal, $\Delta U = 0$ for an ideal gas, $w$ is still positive, and therefore $q = -w < 0$: the heat of compression has to leave into the room, or the gas would warm. The sign that changes is the sign of $q$, and $\Delta U$ changes with it. The work remains positive in either arrangement.
:::
:::

::: exercise A smaller coffee cup {level=1 check="-43.5"}
A reaction is run in a solution of mass $80.0\ \mathrm{g}$ whose specific heat capacity is $4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$. The temperature rises by $5.20\ \mathrm{K}$. The extent of reaction is $0.0400\ \mathrm{mol}$, the pressure is constant, and the calorimeter's own heat capacity is neglected. Enter $\Delta H$ in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$$
q_\mathrm{sol} = (80.0)(4.184)(5.20) = 1.741\times 10^{3}\ \mathrm{J} = 1.741\ \mathrm{kJ},
$$
so $q_\mathrm{rxn} = -1.741\ \mathrm{kJ}$ and
$$
\Delta H = \frac{-1.741\ \mathrm{kJ}}{0.0400\ \mathrm{mol}} = -43.5\ \mathrm{kJ\,mol^{-1}}.
$$
Three significant figures: $5.20$ and $0.0400$ both have three, and $80.0$ does not justify a fourth. Neglecting the cup means the true $|\Delta H|$ is a little larger.
:::
:::

::: exercise Methane from the table {level=1 check="-890.3"}
Using $\Delta_\mathrm{f} H^\circ(\mathrm{CO_2, g}) = -393.5$, $\Delta_\mathrm{f} H^\circ(\mathrm{H_2O, l}) = -285.8$ and $\Delta_\mathrm{f} H^\circ(\mathrm{CH_4, g}) = -74.8\ \mathrm{kJ\,mol^{-1}}$, compute $\Delta_\mathrm{r} H^\circ$ for $\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$. Enter the value in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$$
\Delta_\mathrm{r} H^\circ = -393.5 + 2(-285.8) - (-74.8) = -890.3\ \mathrm{kJ\,mol^{-1}}.
$$
Oxygen is an element in its standard state and contributes nothing. The same number is [[#ex-methane]]; the exercise is the operation on its own, because this is the operation every later table lookup repeats.
:::
:::

::: exercise Carbon monoxide by difference {level=2 check="-110.5"}
You are given only
$$
\begin{align*}
\mathrm{C(graphite)} + \mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -393.5\ \mathrm{kJ\,mol^{-1}}, \\
\mathrm{CO(g)} + \tfrac12 \mathrm{O_2(g)} &\rightarrow \mathrm{CO_2(g)} & \Delta H^\circ &= -283.0\ \mathrm{kJ\,mol^{-1}}.
\end{align*}
$$
Enter $\Delta H^\circ$, in $\mathrm{kJ\,mol^{-1}}$, for the formation of one mole of $\mathrm{CO(g)}$ from graphite and oxygen.
::: solution
Formation of $\mathrm{CO}$ is the first reaction minus the second:
$$
\Delta H^\circ = -393.5 - (-283.0) = -110.5\ \mathrm{kJ\,mol^{-1}}.
$$
Reversing the second step flips the sign, which is the whole content of Hess's law once the target equation has been matched. The result is $\Delta_\mathrm{f} H^\circ(\mathrm{CO, g})$ on the textbook set used in this lesson.
:::
:::

::: exercise Heat from a weighed sample {level=2 check="-555.0"}
Methane burns to $\mathrm{CO_2(g)}$ and $\mathrm{H_2O(l)}$ with $\Delta_\mathrm{r} H^\circ = -890.3\ \mathrm{kJ\,mol^{-1}}$. A camping stove burns $10.00\ \mathrm{g}$ of $\mathrm{CH_4}$ ($M = 16.04\ \mathrm{g\,mol^{-1}}$) at constant pressure. Enter the enthalpy change of the system, in $\mathrm{kJ}$.
::: solution
$$
n = \frac{10.00}{16.04} = 0.6234\ \mathrm{mol}, \qquad \Delta H = (0.6234)(-890.3) = -555.0\ \mathrm{kJ}.
$$
The system loses $555.0\ \mathrm{kJ}$; the pot gains it, minus whatever the wind takes. Scaling by the amount of substance is ordinary stoichiometry applied to an enthalpy per mole.
:::
:::

::: exercise Specific heat capacity of aluminium {level=2 check="0.900"}
A $50.0\ \mathrm{g}$ piece of aluminium at $100.0\,^\circ\mathrm{C}$ is dropped into $100.0\ \mathrm{g}$ of water at $20.0\,^\circ\mathrm{C}$. The final temperature is $27.77\,^\circ\mathrm{C}$. Take $c(\mathrm{H_2O}) = 4.184\ \mathrm{J\,g^{-1}\,K^{-1}}$ and neglect the container. Enter the specific heat capacity of aluminium in $\mathrm{J\,g^{-1}\,K^{-1}}$.
::: solution
The water warms by $7.77\ \mathrm{K}$ and the metal cools by $72.23\ \mathrm{K}$. Heat gained by the water equals heat lost by the metal:
$$
q_\mathrm{w} = (100.0)(4.184)(7.77) = 3.251\times 10^{3}\ \mathrm{J}.
$$
$$
c(\mathrm{Al}) = \frac{3.251\times 10^{3}\ \mathrm{J}}{(50.0\ \mathrm{g})(72.23\ \mathrm{K})} = 0.900\ \mathrm{J\,g^{-1}\,K^{-1}}.
$$
Aluminium's specific heat capacity is several times smaller than water's, which is why a hot piece of metal of modest mass does not boil a beaker of water. The temperature $27.77\,^\circ\mathrm{C}$ was chosen so the arithmetic lands on $0.900$; a laboratory thermometer reading to $0.1\,^\circ\mathrm{C}$ would not justify the last digit.
:::
:::

::: exercise A bomb result for methane {level=3 check="-890.2"}
A $0.802\ \mathrm{g}$ sample of methane ($M = 16.04\ \mathrm{g\,mol^{-1}}$) is burned in a bomb calorimeter of heat capacity $12.50\ \mathrm{kJ\,K^{-1}}$. The temperature rises by $3.541\ \mathrm{K}$. The reaction is $\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$, and the thermal correction is to be made at $298.15\ \mathrm{K}$ with $R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Enter $\Delta_\mathrm{c} H$ in $\mathrm{kJ\,mol^{-1}}$.
::: solution
The amount burned is $0.802/16.04 = 0.05000\ \mathrm{mol}$. The bomb gains
$$
q_\mathrm{cal} = (12.50\ \mathrm{kJ\,K^{-1}})(3.541\ \mathrm{K}) = 44.2625\ \mathrm{kJ},
$$
so the reaction's constant-volume heat is $-44.2625\ \mathrm{kJ}$ and
$$
\Delta_\mathrm{c} U = \frac{-44.2625\ \mathrm{kJ}}{0.05000\ \mathrm{mol}} = -885.25\ \mathrm{kJ\,mol^{-1}},
$$
which is $-885.3\ \mathrm{kJ\,mol^{-1}}$ to one decimal place. Here $\Delta n_\mathrm{g} = 1 - 3 = -2$, and
$$
\Delta n_\mathrm{g}\, RT = -2(8.314)(298.15)\times 10^{-3} = -4.958\ \mathrm{kJ\,mol^{-1}}.
$$
[[#prop-hu]] then gives $\Delta_\mathrm{c} H = -885.25 + (-4.958) = -890.2\ \mathrm{kJ\,mol^{-1}}$. The formation-table value in [[#ex-methane]] is $-890.3\ \mathrm{kJ\,mol^{-1}}$. The two agree to the $0.1\ \mathrm{kJ\,mol^{-1}}$ set by rounding $3.541\ \mathrm{K}$. A bomb never reports the enthalpy directly; the $\Delta n_\mathrm{g}\, RT$ step is part of the measurement, not a correction one may skip when the answer looks "close enough".
:::
:::

::: exercise From the table enthalpy to $\Delta U$ {level=3 check="-885.3"}
Take $\Delta_\mathrm{r} H^\circ = -890.3\ \mathrm{kJ\,mol^{-1}}$ for methane combustion to liquid water at $298.15\ \mathrm{K}$. Derive $\Delta_\mathrm{r} U^\circ$ from [[#prop-hu]] and compute it. Enter $\Delta_\mathrm{r} U^\circ$ in $\mathrm{kJ\,mol^{-1}}$.
::: solution
The defining relation $H = U + pV$, restricted to ideal gases at constant temperature with condensed volumes neglected, is $\Delta_\mathrm{r} H = \Delta_\mathrm{r} U + \Delta n_\mathrm{g}\, RT$, so
$$
\Delta_\mathrm{r} U^\circ = \Delta_\mathrm{r} H^\circ - \Delta n_\mathrm{g}\, RT.
$$
With $\Delta n_\mathrm{g} = -2$ and $RT = (8.314)(298.15) = 2.479\ \mathrm{kJ\,mol^{-1}}$,
$$
\Delta_\mathrm{r} U^\circ = -890.3 - (-2)(2.479) = -890.3 + 4.958 = -885.3\ \mathrm{kJ\,mol^{-1}}.
$$
The enthalpy is the more negative of the two because the surroundings do work on the system as three moles of gas become one: that incoming work is part of $\Delta U$ and is not part of the constant-pressure heat. This is the same $-885.3\ \mathrm{kJ\,mol^{-1}}$ the bomb exercise measured.
:::
:::

::: exercise Kirchhoff's correction for forming water {level=3 check="-284.2"}
For $\mathrm{H_2(g)} + \tfrac12\mathrm{O_2(g)} \rightarrow \mathrm{H_2O(l)}$, $\Delta_\mathrm{r} H^\circ(298.15\ \mathrm{K}) = -285.8\ \mathrm{kJ\,mol^{-1}}$. Take the approximate constant molar heat capacities $C_{p,\mathrm{m}}(\mathrm{H_2}) = 28.8$, $C_{p,\mathrm{m}}(\mathrm{O_2}) = 29.4$ and $C_{p,\mathrm{m}}(\mathrm{H_2O, l}) = 75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Estimate $\Delta_\mathrm{r} H^\circ$ at $348.15\ \mathrm{K}$. Enter it in $\mathrm{kJ\,mol^{-1}}$.
::: hint
If $\Delta_\mathrm{r} C_p$ is constant, $\Delta_\mathrm{r} H(T_2) = \Delta_\mathrm{r} H(T_1) + \Delta_\mathrm{r} C_p\,(T_2 - T_1)$. Build $\Delta_\mathrm{r} C_p$ with the same stoichiometric signs as $\Delta_\mathrm{r} H$.
:::
::: solution
$$
\Delta_\mathrm{r} C_p = 75.3 - 28.8 - \tfrac12(29.4) = 75.3 - 28.8 - 14.7 = 31.8\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
Over $\Delta T = 50.00\ \mathrm{K}$,
$$
\Delta_\mathrm{r} C_p\,\Delta T = (31.8\times 10^{-3})(50.00) = 1.59\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{r} H^\circ(348.15\ \mathrm{K}) = -285.8 + 1.59 = -284.2\ \mathrm{kJ\,mol^{-1}}.
$$
The correction is real and, on this interval, small: heat capacities of products and reactants largely cancel, and what remains shifts a $286\ \mathrm{kJ}$ enthalpy by about half a percent across fifty degrees. That is why a $298.15\ \mathrm{K}$ table survives being used at a nearby temperature, and why the approximation dies when a reactant changes phase inside the interval — $C_p$ is then not even approximately constant, and the enthalpy of the phase change has to be inserted by hand.
:::
:::
