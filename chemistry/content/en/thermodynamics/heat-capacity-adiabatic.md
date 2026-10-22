Pump a flat tyre and the barrel of the pump grows warm in your hand — not mainly from friction, but because you compress the air so quickly that the heat it gains has no time to escape. Let compressed air out of a valve and the opposite happens: the metal chills, and a valve wet with moisture can freeze shut. Both effects are the same physics, and both are governed by one number per substance: its heat capacity. How much energy a degree of temperature costs decides how hot a reaction flask gets, how cold an expanding gas turns, whether a throttled gas cools or warms, and how much heat a reaction releases at $1000\ \mathrm{K}$ compared with $298\ \mathrm{K}$.

This chapter turns the first law, [[thermodynamics/first-law|established in the previous chapter]], into a working tool. Three ideas carry the whole chapter. First, enthalpy $H = U + pV$ is the heat of constant-pressure change, and heat capacities are the derivatives that tell us how $U$ and $H$ move with temperature. Second, because heat capacities of reactants and products differ, reaction enthalpies move with temperature — Kirchhoff's law. Third, when no heat flows at all, temperature changes become mechanical: expansion itself pays for the energy, and the bookkeeping yields adiabats, the work of engines, and the Joule–Thomson effect that liquefies air. The general-chemistry account of [[general-chemistry-1/thermochemistry|thermochemistry]] gave the vocabulary; here it becomes quantitative.

## Enthalpy: the heat of constant pressure

Most chemistry is done in open vessels, at the pressure of the atmosphere, not in rigid steel bombs. Under those conditions the system expands or contracts as it reacts, pushing the world aside or letting it push back, and the heat measured is not $\Delta U$. The right state function is already hidden inside the first law.

::: definition Enthalpy {#def-enthalpy}
The **enthalpy** of a system is
$$
H \equiv U + pV .
$$
Because $U$, $p$ and $V$ are state functions, so is $H$. For a closed system that does no work other than expansion, at constant external pressure,
$$
\Delta H = q_\mathrm{p} :
$$
the enthalpy change of a constant-pressure process equals the heat absorbed.
:::

::: proof
At constant pressure with only $pV$-work, the first law gives $\Delta U = q_\mathrm{p} - p\,\Delta V$. Rearranging and adding $p\,\Delta V$ to both sides,
$$
q_\mathrm{p} = \Delta U + p\,\Delta V = \Delta U + \Delta(pV) = \Delta(U + pV) = \Delta H ,
$$
where the middle step uses constant $p$. The definition of $H$ is not a trick of notation: $H$ is the energy the system would have if the $pV$ it must always carry around — the energy of holding its volume against the atmosphere — were counted as part of its stored energy. It is, and that is why coffee-cup calorimetry measures $\Delta H$ while bomb calorimetry measures $\Delta U$.
:::

Reactions change volume mainly through the gases in them, and for an ideal gas $pV = nRT$ at constant temperature. So the two calorimetric quantities differ by a term you can always compute.

::: proposition Relation between $\Delta_\mathrm{r}H$ and $\Delta_\mathrm{r}U$ {#prop-dh-du}
For a reaction at temperature $T$,
$$
\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + \Delta(pV) ,
$$
where $\Delta(pV)$ is evaluated over the reaction as written. Treating all gases as ideal and neglecting the molar volumes of liquids and solids,
$$
\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + RT\,\Delta n_\mathrm{gas} ,
$$
with $\Delta n_\mathrm{gas}$ the moles of gas produced minus the moles of gas consumed per mole of reaction.
:::

::: proof
$H - U = pV$ for every substance, so $\Delta_\mathrm{r}H - \Delta_\mathrm{r}U = \Delta(pV)$ summed over products minus reactants. For a condensed phase at ordinary pressures $pV_\mathrm{m} \approx 10^{-2}\ \mathrm{kJ\,mol^{-1}}$, negligible against reaction energies; for an ideal gas $pV_\mathrm{m} = RT$. Only the gaseous species therefore contribute, each carrying $RT$ per mole, and the sum is $RT\,\Delta n_\mathrm{gas}$.
:::

::: example Combustion of methane: $\Delta_\mathrm{c}H$ versus $\Delta_\mathrm{c}U$ {#ex-methane-du}
At $298.15\ \mathrm{K}$ the standard combustion $\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$ has $\Delta_\mathrm{c}H^\circ = -890.4\ \mathrm{kJ\,mol^{-1}}$ (CRC/NIST-JANAF value). Find $\Delta_\mathrm{c}U^\circ$, and state where the difference goes.
::: solution
Three moles of gas disappear ($1 + 2$ consumed, $1$ produced), so $\Delta n_\mathrm{gas} = -2$ and
$$
\Delta_\mathrm{c}U^\circ = \Delta_\mathrm{c}H^\circ - RT\,\Delta n_\mathrm{gas}
= -890.4 + 2 \times \frac{8.314 \times 298.15}{1000}\ \mathrm{kJ\,mol^{-1}}
= -890.4 + 4.96 = -885.4\ \mathrm{kJ\,mol^{-1}} .
$$
The internal energy drops by *less* than the enthalpy because the products occupy less volume than the reactants: the atmosphere collapses inward and does $+4.96\ \mathrm{kJ\,mol^{-1}}$ of work on the system, energy that offsets part of the energy lost as heat. Had the water left as vapour, $\Delta n_\mathrm{gas} = 0$ and the two quantities would coincide ($\Delta_\mathrm{c}H^\circ = -802.3\ \mathrm{kJ\,mol^{-1}}$ for gaseous water). Always state the aggregation state: it changes both numbers.
:::
:::

## Heat capacity: what a degree costs

::: definition Heat capacity, $C_V$ and $C_p$ {#def-heat-capacity}
The **heat capacity** $C$ of a body is the heat required to raise its temperature by one kelvin, $C = \lim_{\Delta T \to 0} \delta q/\Delta T$; it depends on the process, because heat is a path function. Two paths are so fundamental that each earns a name and a subscript:
$$
C_V \equiv \left(\frac{\partial U}{\partial T}\right)_V , \qquad
C_p \equiv \left(\frac{\partial H}{\partial T}\right)_p ,
$$
the **heat capacity at constant volume** and at **constant pressure**; molar values are written $C_{V,\mathrm{m}}$ and $C_{p,\mathrm{m}}$, in $\mathrm{J\,K^{-1}\,mol^{-1}}$. The equalities follow at once from $\mathrm{d}U = \delta q - p\,\mathrm{d}V$ at constant volume and $\mathrm{d}H = \delta q + V\,\mathrm{d}p$ at constant pressure. Heat capacities are themselves temperature-dependent; tabulated values (NIST-JANAF, CRC) are quoted at $298.15\ \mathrm{K}$ unless otherwise stated.
:::

Representative values at $298.15\ \mathrm{K}$, from NIST-JANAF: $C_{p,\mathrm{m}} = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for argon, $29.12$ for $\mathrm{N_2}$, $29.38$ for $\mathrm{O_2}$, $28.84$ for $\mathrm{H_2}$, $37.13$ for $\mathrm{CO_2}$, $33.58$ for water vapour, $75.3$ for liquid water, $24.44$ for copper. Two patterns stand out. All the gases sit near $3R$ or $\tfrac{5}{2}R$ — the equipartition values, which classical statistical mechanics assigns $\tfrac{1}{2}R$ per quadratic energy term: three translational terms give $\tfrac{3}{2}R$ to $C_{V,\mathrm{m}}$ for every gas, two more rotational terms give diatomics $\tfrac{5}{2}R$, and vibrational terms switch on only at high temperature because their energy spacing exceeds $k_\mathrm{B}T$ at room temperature ([[statistical-thermodynamics/boltzmann-distribution]], [[statistical-thermodynamics/partition-function]]). And the condensed phases follow their own rules: copper's $24.44$ is essentially the Dulong–Petit value $3R$ that solids approach at high temperature, while liquid water's $75.3$ is anomalously large because heating it must also stretch and break hydrogen bonds — which is why water makes such an effective coolant ([[general-chemistry-2/liquids-solutions]]).

::: proposition Mayer's relation {#prop-mayer}
For a closed fixed amount of an **ideal gas**, whatever the path,
$$
C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R , \qquad \gamma \equiv \frac{C_{p,\mathrm{m}}}{C_{V,\mathrm{m}}} > 1 .
$$
For a monatomic ideal gas $C_{V,\mathrm{m}} = \tfrac{3}{2}R$, $C_{p,\mathrm{m}} = \tfrac{5}{2}R$, $\gamma = 5/3$; for a diatomic gas with frozen vibrations $C_{V,\mathrm{m}} = \tfrac{5}{2}R$, $C_{p,\mathrm{m}} = \tfrac{7}{2}R$, $\gamma = 7/5$.
:::

::: proof
For an ideal gas $H_\mathrm{m} = U_\mathrm{m} + pV_\mathrm{m} = U_\mathrm{m} + RT$. Joule's law, $(\partial U/\partial V)_T = 0$, says $U_\mathrm{m}$ depends on temperature alone, so differentiating with respect to $T$ gives $\mathrm{d}H_\mathrm{m}/\mathrm{d}T = \mathrm{d}U_\mathrm{m}/\mathrm{d}T + R$. But for an ideal gas $C_{p,\mathrm{m}} = \mathrm{d}H_\mathrm{m}/\mathrm{d}T$ and $C_{V,\mathrm{m}} = \mathrm{d}U_\mathrm{m}/\mathrm{d}T$ along *any* path, because $H$ and $U$ are functions of $T$ alone. Hence $C_{p,\mathrm{m}} = C_{V,\mathrm{m}} + R$. The relation was found by Julius Robert Mayer in 1842 from the specific heats of gases, before the first law was generally accepted — one of the most remarkable pieces of thermodynamic bookkeeping ever done.
:::

Mayer's relation is an ideal-gas result. For real substances the difference between $C_p$ and $C_V$ is a beautiful general formula that shows why $C_p$ is *always* the larger.

::: proposition General relation between $C_p$ and $C_V$ {#prop-cp-cv-general}
For any closed simple system in equilibrium,
$$
C_p - C_V = T V \frac{\alpha^2}{\kappa_T} ,
$$
where $\alpha = (1/V)(\partial V/\partial T)_p$ is the thermal expansion coefficient and $\kappa_T = -(1/V)(\partial V/\partial p)_T$ the isothermal compressibility. Both phases of the right-hand side are non-negative for any stable substance ($\kappa_T > 0$ is mechanical stability), so $C_p \ge C_V$ always, with equality only where $\alpha = 0$ — as for water near $4\,^\circ\mathrm{C}$, where it reaches its density maximum.
:::

::: proof
Write $C_p - C_V = (\partial H/\partial T)_p - (\partial U/\partial T)_V$ and expand $(\partial H/\partial T)_p = (\partial U/\partial T)_p + p(\partial V/\partial T)_p$, since $H = U + pV$ at constant pressure. The derivative $(\partial U/\partial T)_p$ differs from $(\partial U/\partial T)_V$ because heating at constant pressure also changes the volume, and $U$ responds to volume through intermolecular forces: $(\partial U/\partial T)_p = (\partial U/\partial T)_V + (\partial U/\partial V)_T (\partial V/\partial T)_p$. Therefore
$$
C_p - C_V = \left[\left(\frac{\partial U}{\partial V}\right)_T + p\right]\left(\frac{\partial V}{\partial T}\right)_p .
$$
The energy-pressure relation $(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$ (a Maxwell-relation exercise of [[thermodynamics/first-law]]) cancels the $p$, leaving $C_p - C_V = T(\partial p/\partial T)_V (\partial V/\partial T)_p$. Finally $(\partial V/\partial T)_p = V\alpha$ and the cyclic rule turns $(\partial p/\partial T)_V$ into $\alpha/\kappa_T$, giving the result. For an ideal gas $\alpha = 1/T$ and $\kappa_T = 1/p$, so $TV\alpha^2/\kappa_T = pV/T = nR$: Mayer's relation is the ideal-gas shadow of the general formula.
:::

For condensed phases the difference is small: with $\alpha = 49.2\times10^{-6}\ \mathrm{K^{-1}}$, $\kappa_T = 7.3\times10^{-7}\ \mathrm{bar^{-1}}$ and $V_\mathrm{m} = 7.11\ \mathrm{cm^3\,mol^{-1}}$, copper at $298\ \mathrm{K}$ gives $C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = 0.70\ \mathrm{J\,K^{-1}\,mol^{-1}}$, and liquid water about $0.5$ — against $R = 8.314$ for the gases. Liquids and solids can barely expand, so heating them at constant pressure costs almost no extra work; gases spend a full $R$ per mole on it.

::: example Heating nitrogen at constant pressure and at constant volume {#ex-n2-heating}
A $2.00\ \mathrm{mol}$ sample of $\mathrm{N_2}$ is heated from $300\ \mathrm{K}$ to $400\ \mathrm{K}$, (a) in a rigid vessel and (b) under a frictionless piston at constant pressure. Take $C_{p,\mathrm{m}} = 29.1$ and $C_{V,\mathrm{m}} = 20.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Find $q$, $\Delta U$ and $\Delta H$ for each path.
::: solution
**(a) Constant volume.** $q = \Delta U = nC_{V,\mathrm{m}}\Delta T = 2.00 \times 20.8 \times 100 = 4.16\ \mathrm{kJ}$, with $w = 0$. $\Delta H = \Delta U + \Delta(pV) = \Delta U + nR\,\Delta T = 4.16 + 1.66 = 5.82\ \mathrm{kJ}$ — enthalpy changes by the *same* amount as in (b), even though no heat was added at constant pressure, because $H$ is a state function and both paths end at $400\ \mathrm{K}$.

**(b) Constant pressure.** $q = \Delta H = nC_{p,\mathrm{m}}\Delta T = 2.00 \times 29.1 \times 100 = 5.82\ \mathrm{kJ}$, and $\Delta U = q + w = 5.82 - 1.66 = 4.16\ \mathrm{kJ}$, the same $\Delta U$ as in (a) — the gas is ideal and both paths end at $400\ \mathrm{K}$. The extra $1.66\ \mathrm{kJ}$ of heat in (b) is exactly the expansion work $nR\,\Delta T = 2.00 \times 8.314 \times 100 = 1.66\ \mathrm{kJ}$ the gas spends pushing the piston up. Mayer's relation, paid in cash.
:::
:::

::: quiz
One mole of an ideal gas is heated from $300\ \mathrm{K}$ to $330\ \mathrm{K}$, once at constant volume and once at constant pressure. The extra heat absorbed in the constant-pressure run, compared with the constant-volume run, is
- [x] $R\,\Delta T \approx 250\ \mathrm{J}$, the expansion work $p\,\Delta V = nR\,\Delta T$ the gas performs.
- [ ] zero, because both runs have the same $\Delta T$.
- [ ] negative, because $C_{V,\mathrm{m}} > C_{p,\mathrm{m}}$.
- [ ] equal to $C_{p,\mathrm{m}}\Delta T$, the whole heat of the constant-pressure run.
::: solution
The constant-volume run takes $C_{V,\mathrm{m}}\Delta T$ and the constant-pressure run $C_{p,\mathrm{m}}\Delta T$; the difference is $(C_{p,\mathrm{m}} - C_{V,\mathrm{m}})\Delta T = R\,\Delta T = 8.314 \times 30 = 249\ \mathrm{J}$. Physically, both runs raise $U$ by the same amount (ideal gas, same $\Delta T$), and the constant-pressure run must additionally supply the work of expansion.
:::
:::

## Kirchhoff's law: reaction enthalpies move with temperature

Tabulated reaction enthalpies are quoted at $298.15\ \mathrm{K}$, but furnaces, engines and catalytic converters run hot. The correction is not a mystery: it is just the different heat capacities of reactants and products.

::: proposition Kirchhoff's law {#prop-kirchhoff}
For a reaction at fixed standard state,
$$
\frac{\mathrm{d}\,\Delta_\mathrm{r}H^\circ}{\mathrm{d}T} = \Delta_\mathrm{r}C_p^\circ , \qquad
\Delta_\mathrm{r}C_p^\circ = \sum_\text{products} \nu_i C_{p,\mathrm{m},i} - \sum_\text{reactants} \nu_i C_{p,\mathrm{m},i} ,
$$
and therefore, over a range where $\Delta_\mathrm{r}C_p^\circ$ is roughly constant,
$$
\Delta_\mathrm{r}H^\circ(T_2) = \Delta_\mathrm{r}H^\circ(T_1) + \Delta_\mathrm{r}C_p^\circ\,(T_2 - T_1) .
$$
:::

::: proof
$\Delta_\mathrm{r}H^\circ(T) = \sum_i \nu_i H_{\mathrm{m},i}^\circ(T)$ is a sum of state functions, so differentiate term by term: $\mathrm{d}\Delta_\mathrm{r}H^\circ/\mathrm{d}T = \sum_i \nu_i\, \mathrm{d}H_{\mathrm{m},i}^\circ/\mathrm{d}T = \sum_i \nu_i C_{p,\mathrm{m},i}^\circ$, which is the definition of $\Delta_\mathrm{r}C_p^\circ$. Integrating gives the shift. The picture: heat the reactants from $T_1$ to $T_2$, react them at $T_2$, and cool the products back to $T_1$; the energy imbalance between "heating the reactants up" and "cooling the products down" is exactly $\Delta_\mathrm{r}C_p^\circ(T_2 - T_1)$.
:::

::: example Carbon monoxide combustion at $500\ \mathrm{K}$ {#ex-kirchhoff-co}
For $\mathrm{CO(g)} + \tfrac{1}{2}\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$, $\Delta_\mathrm{r}H^\circ(298.15\ \mathrm{K}) = -283.0\ \mathrm{kJ\,mol^{-1}}$ (from $\Delta_\mathrm{f}H^\circ$: $-393.5 + 110.5$). Using $C_{p,\mathrm{m}}$ values $37.13$ ($\mathrm{CO_2}$), $29.14$ ($\mathrm{CO}$), $29.38\ \mathrm{J\,K^{-1}\,mol^{-1}}$ ($\mathrm{O_2}$; NIST-JANAF at $298.15\ \mathrm{K}$), estimate $\Delta_\mathrm{r}H^\circ$ at $500\ \mathrm{K}$.
::: solution
$$
\Delta_\mathrm{r}C_p^\circ = 37.13 - 29.14 - \tfrac{1}{2}(29.38) = -6.70\ \mathrm{J\,K^{-1}\,mol^{-1}} ,
$$
$$
\Delta_\mathrm{r}H^\circ(500) = -283.0 + \frac{(-6.70)(500 - 298.15)}{1000}
= -283.0 - 1.35 = -284.4\ \mathrm{kJ\,mol^{-1}} .
$$
The product carbon dioxide has a larger heat capacity than the reactants, so heating it costs more than heating what it came from, and the reaction gives out slightly *more* heat at $500\ \mathrm{K}$ than at $298\ \mathrm{K}$. Carrying the temperature dependence of each $C_{p,\mathrm{m}}$ (NIST-JANAF tables) instead of holding it constant gives $-284.1\ \mathrm{kJ\,mol^{-1}}$ — the constant-$\Delta_\mathrm{r}C_p$ shortcut is good to a few tenths of a percent over a few hundred kelvin, and fails only near phase transitions of a participant, where a heat capacity effectively jumps.
:::
:::

::: widget plot
f: -283 + dCp*(x-298.15)/1000
x: 200, 800
y: -300, -260
sliders: dCp=-7:-60:60:1
labels: \Delta_r H^\circ \text{ / } \mathrm{kJ\,mol^{-1}}
vlines: 500
caption: Kirchhoff's law in one line: $\Delta_r H^\circ(T) = \Delta_r H^\circ(298.15\ \mathrm{K}) + \Delta_r C_p^\circ (T - 298.15)$ for the carbon monoxide combustion of the worked example, with $\Delta_r C_p^\circ$ as the slider (in $\mathrm{J\,K^{-1}\,mol^{-1}}$). The slope *is* the heat-capacity difference: positive $\Delta_r C_p$ makes an exothermic reaction less exothermic with rising temperature, negative $\Delta_r C_p$ more so. Slide $\Delta_r C_p$ to large positive values and watch the line cross zero — a reaction can change sign of its heat output between room temperature and flame temperature.
:::

## Reversible adiabatic expansion

::: definition Adiabatic process {#def-adiabatic}
A process is **adiabatic** if no heat passes through the wall, $q = 0$; then the first law collapses to $\Delta U = w$. Adiabatic does *not* mean isothermal: with no heat available, any work the system does must come out of its own energy, so temperature changes become mechanical. A process is adiabatic either by insulation or by speed — the compression in a pump, the expansion of exhaust gases in an engine cylinder, the rise of an air parcel in the atmosphere (which cools at the dry adiabatic lapse rate for exactly the reason developed below) — all are adiabatic to a good approximation because they happen faster than heat can flow.
:::

::: proposition Reversible adiabats of an ideal gas {#prop-adiabat}
For a reversible adiabatic expansion or compression of a fixed amount of ideal gas with constant heat capacities,
$$
pV^{\gamma} = \text{const}, \qquad
TV^{\gamma-1} = \text{const}, \qquad
p^{1-\gamma}T^{\gamma} = \text{const},
$$
with $\gamma = C_{p,\mathrm{m}}/C_{V,\mathrm{m}}$, and the work is
$$
w = \Delta U = nC_{V,\mathrm{m}}\,(T_\mathrm{f} - T_\mathrm{i}) .
$$
:::

::: proof
For a reversible change $\delta w = -p\,\mathrm{d}V$ and, adiabatically, $\mathrm{d}U = -p\,\mathrm{d}V$. For an ideal gas $\mathrm{d}U = nC_{V,\mathrm{m}}\,\mathrm{d}T$ along any path, so
$$
nC_{V,\mathrm{m}}\,\mathrm{d}T = -\frac{nRT}{V}\,\mathrm{d}V
\quad\Longrightarrow\quad
C_{V,\mathrm{m}}\frac{\mathrm{d}T}{T} = -R\,\frac{\mathrm{d}V}{V}.
$$
Integrate from initial to final state, treat $C_{V,\mathrm{m}}$ as constant, and use $R = C_{p,\mathrm{m}} - C_{V,\mathrm{m}}$: $\ln(T_\mathrm{f}/T_\mathrm{i}) = -(R/C_{V,\mathrm{m}})\ln(V_\mathrm{f}/V_\mathrm{i}) = (1-\gamma)\ln(V_\mathrm{f}/V_\mathrm{i})$, which is $TV^{\gamma-1} = \text{const}$. Replacing $T$ by $pV/nR$ gives $pV^\gamma = \text{const}$, and eliminating $V$ gives $p^{1-\gamma}T^\gamma = \text{const}$. The work follows from $\Delta U = q + w$ with $q = 0$.
:::

Because $\gamma > 1$, the adiabat $pV^\gamma = \text{const}$ falls more steeply than the isotherm $pV = \text{const}$ on a $pV$-diagram: an adiabatic expansion both does work and loses temperature, so its pressure collapses faster. The consequence is the comparison every exam asks for.

::: example Reversible adiabatic expansion of a diatomic gas {#ex-adiabatic-expansion}
One mole of an ideal diatomic gas ($C_{V,\mathrm{m}} = \tfrac{5}{2}R = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$, $\gamma = 7/5$) at $300\ \mathrm{K}$ and $V_\mathrm{i} = 10.0\ \mathrm{L}$ expands reversibly and adiabatically to $V_\mathrm{f} = 20.0\ \mathrm{L}$. Find $T_\mathrm{f}$, $p_\mathrm{f}$ and $w$, and compare with the reversible *isothermal* expansion between the same volumes.
::: solution
$$
T_\mathrm{f} = 300 \times \left(\frac{10.0}{20.0}\right)^{2/7} = 300 \times 0.7579 = 227.4\ \mathrm{K},
$$
$$
p_\mathrm{f} = \frac{nRT_\mathrm{f}}{V_\mathrm{f}} = \frac{8.314 \times 227.4}{20.0\ \mathrm{L}} = 94.6\ \mathrm{kPa} = 0.946\ \mathrm{bar},
$$
against $1.25\ \mathrm{bar}$ for the isothermal expansion to the same volume — the adiabat is steeper, as the figure shows. The work is
$$
w = \Delta U = 20.79 \times (227.4 - 300)\ \mathrm{J} = -1.51\ \mathrm{kJ},
$$
less in magnitude than the isothermal $-nRT\ln 2 = -1.73\ \mathrm{kJ}$: the cooling gas cannot push as hard as the gas kept at $300\ \mathrm{K}$ by a heat bath. Every joule of that $1.51\ \mathrm{kJ}$ came out of the gas's own internal energy — which is why the air parcel rising in a thunderstorm, the steam leaving a turbine, and the gas in your pump's barrel all change temperature when nothing heats or cools them.
:::
:::

::: widget plot
f: 24.94/x ; 24.94*10^g/x^g
x: 2, 22
y: 0, 14
sliders: g=1.4:1.1:1.7:0.05
labels: \text{isotherm } pV = \text{const}; \text{adiabat } pV^{\gamma} = \text{const}
caption: The $pV$-diagram of one mole of ideal gas at $300\ \mathrm{K}$ starting from $10.0\ \mathrm{L}$: the isotherm (flat) and the reversible adiabat through the same point (steep), for $\gamma$ set by the slider. Slide $\gamma$ up and the adiabat plunges faster — a steeper adiabat means a gas that cools more for a given expansion, because more of its heat capacity is locked in the $pV$ term. The area under each curve between two volumes is the work of that path; the adiabat always encloses less area on expansion, because it is falling as it goes.
:::

::: widget plot
f: 300*10^(g-1)/x^(g-1)
x: 2, 22
y: 100, 320
sliders: g=1.4:1.1:1.7:0.05
labels: T \text{ / K}
caption: Temperature against volume for the reversible adiabatic expansion of one mole of ideal gas from $300\ \mathrm{K}$ at $10.0\ \mathrm{L}$: $T = T_\mathrm{i}(V_\mathrm{i}/V)^{\gamma-1}$, with $\gamma$ on the slider. At $\gamma = 7/5$ and a doubling of volume the gas lands at $227\ \mathrm{K}$, as in the worked example; a monatomic gas ($\gamma = 5/3$, exponent $2/3$) cools further, to $189\ \mathrm{K}$, because the same expansion work is subtracted from a smaller heat capacity; and the limit $\gamma \to 1$ is the isothermal line $T = 300\ \mathrm{K}$ — no cooling at all.
:::

::: warning $pV^\gamma = \text{const}$ is not the law of adiabatics {#warn-adiabat}
The three adiabat equations hold only for a **reversible** adiabatic change of a **fixed amount of ideal gas** with **constant heat capacities**. Three failures to keep straight: (i) a **free expansion** into vacuum is adiabatic *and* does no work, so $\Delta U = 0$ and an ideal gas keeps its temperature exactly — $pV^\gamma$ would predict otherwise, and is simply inapplicable; (ii) an **irreversible** adiabatic expansion between the same end pressures ends at a *different, hotter* final state (the next example); (iii) for real gases and for large temperature ranges, $\gamma$ itself moves with temperature. Use the equations where they were derived, and the first law $\Delta U = w$ everywhere else.
:::

## Irreversible adiabatic change: the gas that cannot be careful

An irreversible adiabatic expansion against a constant external pressure still obeys $\Delta U = w$, but $pV^\gamma$ no longer describes the path. The final state comes from solving the first law directly: with $w = -p_\mathrm{ex}(V_\mathrm{f} - V_\mathrm{i})$ and $V_\mathrm{f} = nRT_\mathrm{f}/p_\mathrm{ex}$, one mole of ideal gas satisfies
$$
C_{V,\mathrm{m}}(T_\mathrm{f} - T_\mathrm{i}) = -R T_\mathrm{f} + R T_\mathrm{i}\,\frac{p_\mathrm{ex}}{p_\mathrm{i}} ,
$$
a linear equation for $T_\mathrm{f}$ — no exponentials anywhere.

::: example Irreversible versus reversible adiabatic expansion {#ex-irreversible-adiabatic}
One mole of ideal diatomic gas ($C_{V,\mathrm{m}} = \tfrac{5}{2}R$) at $300\ \mathrm{K}$ and $10.0\ \mathrm{bar}$ expands adiabatically against a constant $p_\mathrm{ex} = 1.00\ \mathrm{bar}$ until it stops. Find $T_\mathrm{f}$ and $w$, and compare with a reversible adiabatic expansion to the same final pressure.
::: solution
The initial volume is $V_\mathrm{i} = RT_\mathrm{i}/p_\mathrm{i} = 2.494\ \mathrm{L}$. With $p_\mathrm{ex}V_\mathrm{f} = RT_\mathrm{f}$ (in $\mathrm{L\,bar}$: $R = 0.08314$),
$$
20.79\,(T_\mathrm{f} - 300) = -\left(8.314\,T_\mathrm{f} - 249.4\right)
\quad\Longrightarrow\quad
29.10\,T_\mathrm{f} = 6485
\quad\Longrightarrow\quad
T_\mathrm{f} = 222.9\ \mathrm{K},
$$
so $w = \Delta U = 20.79 \times (222.9 - 300) = -1.60\ \mathrm{kJ}$. The reversible expansion to $1.00\ \mathrm{bar}$ reaches $T_\mathrm{f} = 300 \times (1.00/10.0)^{2/7} = 155.4\ \mathrm{K}$ and does $w = -3.01\ \mathrm{kJ}$ — nearly twice the work, and ending $67\ \mathrm{K}$ colder. The irreversible gas spends part of its potential to do work simply in *fighting its own turbulence*: the work lost to irreversibility reappears as internal energy, keeping the gas hot. Same first law, same end pressure, very different end temperature — path functions and state functions, again, in one calculation.
:::
:::

::: quiz
One mole of ideal gas expands adiabatically from the same initial state to the same final pressure $p_\mathrm{ex}$, once reversibly and once against the constant $p_\mathrm{ex}$. Which ends hotter, and why?
- [x] The irreversible expansion: work lost to irreversibility stays in the gas as internal energy.
- [ ] The reversible expansion: it does more work, and work heats a gas.
- [ ] Both end at the same temperature: adiabatic fixes $T_\mathrm{f}$ through $pV^\gamma$.
- [ ] Impossible to say without knowing $\gamma$.
::: solution
Both do $w = \Delta U = C_V\Delta T < 0$, but the reversible path does *more* work (larger $|w|$), so it loses more internal energy and ends colder. $pV^\gamma$ applies only to the reversible run — option three is the trap the warning above sets. $\gamma$ fixes the numbers but not the ordering.
:::
:::

## Throttling: the Joule–Thomson effect

There is one more way to change a gas's temperature without heat or useful work: force it through a porous plug or a half-open valve, from a high-pressure side to a low-pressure side, with the whole assembly insulated. This is **throttling**, and it is neither a free expansion nor an engine — it is something with a name and a coefficient of its own.

::: proposition Throttling is isenthalpic {#prop-throttling}
When a fluid flows steadily through an insulating restriction, with negligible changes of kinetic and potential energy, the enthalpy is unchanged: $H_\mathrm{f} = H_\mathrm{i}$, or $H_\mathrm{m}$ equal on both sides.
:::

::: proof
Push a mole of fluid in at pressure $p_\mathrm{i}$: the upstream fluid does work $+p_\mathrm{i}V_\mathrm{m,i}$ on it. Push a mole out downstream against $p_\mathrm{f}$: the fluid does work $p_\mathrm{f}V_\mathrm{m,f}$, i.e. $w = p_\mathrm{i}V_\mathrm{m,i} - p_\mathrm{f}V_\mathrm{m,f}$ is done *on* the stream. With $q = 0$ the first law for the mole gives $U_\mathrm{m,f} - U_\mathrm{m,i} = p_\mathrm{i}V_\mathrm{m,i} - p_\mathrm{f}V_\mathrm{m,f}$, which rearranges to $U_\mathrm{m,f} + p_\mathrm{f}V_\mathrm{m,f} = U_\mathrm{m,i} + p_\mathrm{i}V_\mathrm{m,i}$ — that is, $H_\mathrm{m,f} = H_\mathrm{m,i}$. Throttling is the natural home of enthalpy: the $pV$ terms are exactly the pushing-on and pushing-off work.
:::

::: definition Joule–Thomson coefficient {#def-jt-coefficient}
The **Joule–Thomson coefficient** is the temperature change per pressure drop along an isenthalp,
$$
\mu_\mathrm{JT} \equiv \left(\frac{\partial T}{\partial p}\right)_H .
$$
Since throttling lowers $p$, a gas with $\mu_\mathrm{JT} > 0$ **cools** on throttling and one with $\mu_\mathrm{JT} < 0$ **warms**. The coefficient is measured in $\mathrm{K\,bar^{-1}}$ or $\mathrm{K\,atm^{-1}}$.
:::

::: proposition The Joule–Thomson coefficient {#prop-mu-formula}
For any single-phase fluid,
$$
\mu_\mathrm{JT} = \frac{T\left(\partial V_\mathrm{m}/\partial T\right)_p - V_\mathrm{m}}{C_{p,\mathrm{m}}}
= \frac{V_\mathrm{m}\left(\alpha T - 1\right)}{C_{p,\mathrm{m}}} .
$$
For an ideal gas $\mu_\mathrm{JT} = 0$ exactly: throttling changes nothing but the pressure. A real gas cools when $\alpha T > 1$ and warms when $\alpha T < 1$; the boundary $\alpha T = 1$ is the **inversion condition**, and the locus of $(p, T)$ points satisfying it is the inversion curve, whose maximum temperature is the maximum inversion temperature $T_\mathrm{i}$.
:::

::: proof
Take $H_\mathrm{m}$ as a function of $T$ and $p$: $\mathrm{d}H_\mathrm{m} = C_{p,\mathrm{m}}\,\mathrm{d}T + (\partial H_\mathrm{m}/\partial p)_T\,\mathrm{d}p$. The enthalpy-pressure coefficient is $(\partial H_\mathrm{m}/\partial p)_T = V_\mathrm{m} - T(\partial V_\mathrm{m}/\partial T)_p$ (from $\mathrm{d}H = T\,\mathrm{d}S + V\,\mathrm{d}p$ and the Maxwell relation $(\partial S/\partial p)_T = -(\partial V/\partial T)_p$). Setting $\mathrm{d}H_\mathrm{m} = 0$ and solving $\mathrm{d}T/\mathrm{d}p$ gives the formula. For an ideal gas $V_\mathrm{m} = RT/p$ so $(\partial V_\mathrm{m}/\partial T)_p = R/p = V_\mathrm{m}/T$ and the numerator vanishes — Joule's observation, in enthalpy form: a throttled ideal gas has no way to cool, because its energy does not depend on how far apart the molecules are.
:::

For a dilute real gas the van der Waals equation gives the low-pressure estimate $\mu_\mathrm{JT} \approx \left(2a/RT - b\right)/C_{p,\mathrm{m}}$, positive when $T < 2a/Rb$, so the model predicts a maximum inversion temperature $T_\mathrm{i} = 2a/Rb$. The numbers are right in order of magnitude and wrong in detail — van der Waals overestimates $T_\mathrm{i}$ by tens of percent — but the qualitative map is robust and it is the map that engineering is built on: $T_\mathrm{i} \approx 200\ \mathrm{K}$ for hydrogen and $\approx 40\ \mathrm{K}$ for helium (measured), against several hundred kelvin for nitrogen, oxygen and carbon dioxide. Room temperature sits *below* the inversion curve of ordinary gases and *above* those of $\mathrm{H_2}$ and He: throttle nitrogen at $298\ \mathrm{K}$ and it cools; throttle hydrogen or helium at $298\ \mathrm{K}$ and they **warm**, because their molecules' finite size (the $b$ term, which heats on expansion) beats their mutual attraction (the $a$ term, which cools) at that temperature.

::: example Estimating the Joule–Thomson coefficient of nitrogen {#ex-jt-n2}
Estimate $\mu_\mathrm{JT}$ for $\mathrm{N_2}$ at $298\ \mathrm{K}$ and $1\ \mathrm{bar}$ from the van der Waals estimate with $a = 1.39\ \mathrm{L^2\,bar\,mol^{-2}}$, $b = 0.0391\ \mathrm{L\,mol^{-1}}$, $C_{p,\mathrm{m}} = 29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
::: solution
$$
\frac{2a}{RT} = \frac{2 \times 1.39}{0.08314 \times 298.15} = 0.112\ \mathrm{L\,mol^{-1}},
\qquad
\frac{2a}{RT} - b = 0.112 - 0.039 = 0.073\ \mathrm{L\,mol^{-1}},
$$
$$
\mu_\mathrm{JT} \approx \frac{0.073\ \mathrm{L\,mol^{-1}}}{29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}}
= \frac{7.3 \times 10^{-5}\ \mathrm{m^3\,mol^{-1}}}{29.1\ \mathrm{J\,K^{-1}\,mol^{-1}}}
= 2.5 \times 10^{-6}\ \mathrm{K\,Pa^{-1}} = 0.25\ \mathrm{K\,bar^{-1}} .
$$
Positive, so nitrogen at room temperature cools on throttling, by roughly a quarter of a degree per bar on this (low-pressure) estimate; measured values near $1\ \mathrm{bar}$ are of order $1\ \mathrm{K\,bar^{-1}}$ and grow with pressure, which is exactly what a Linde liquefier feeds on. The unit conversion is the whole trick: $\mathrm{L\,bar} = 100\ \mathrm{J}$, so a molar volume divided by a molar heat capacity is a pressure-slope of temperature.
:::
:::

::: warning Throttling is not expansion doing work, and it does not always cool {#warn-jt}
Two misconceptions in one block. First, $\mu_\mathrm{JT} > 0$ is *not* a property of gases in general: hydrogen and helium at room temperature warm on throttling, and any gas warms above its inversion temperature — the reason hydrogen liquefaction first pre-cools the gas in liquid air. Second, throttling is *not* a reversible adiabatic expansion: no work is extracted, entropy increases, and the process is isenthalpic, not isentropic. The same pressure drop run through a turbine (work out, roughly isentropic) cools a gas far more than the same drop through a valve (work nowhere, isenthalpic) — which is why modern gas liquefiers mix turbines and valves, and why "adiabatic" in the first law never tells you *which* adiabatic path you are on.
:::

::: history From Mayer's ratio to liquid air {#hist-heat-capacity}
Julius Robert Mayer (Mayer) inferred in 1842, from the specific heats of gases alone and years before the first law was accepted, that the excess of $C_p$ over $C_V$ measures the work of expansion — the relation bearing his name. James Prescott Joule (Joule) spent the 1840s establishing the mechanical equivalent of heat and, with his free-expansion experiments, the near-vanishing of $(\partial U/\partial V)_T$ for dilute gases. Rudolf Clausius (Clausius) put the heat-capacity relations on their modern thermodynamic footing in the 1850s and 1860s. In 1852 Joule and William Thomson (Thomson, later Lord Kelvin) proposed forcing gas through a restriction to test whether real gases cool or warm at constant enthalpy; a decade of stubborn apparatus followed, and the effect was reported only in 1859 — the Joule–Thomson effect, the experimental foundation of low-temperature physics. Carl von Linde (Linde) turned it into industry in 1895 with the regenerative counter-current heat exchanger that bears his name, liquefying air by throttling it again and again while the outgoing cold gas pre-chills the incoming; the Linde cycle still makes most of the world's oxygen, nitrogen and argon, and hydrogen and helium still demand pre-cooling below their inversion temperatures, exactly as the coefficient predicts.
:::

## Where this leads

Heat capacities are the temperature-derivative half of every later chapter. Kirchhoff's law is the twin of the van 't Hoff equation of [[general-chemistry-2/chemical-equilibrium|equilibrium]] — differentiate $\Delta_\mathrm{r}G^\circ = -RT\ln K$ and use Kirchhoff to get how $K$ moves with $T$ — and both are re-derived from partition functions in [[statistical-thermodynamics/thermodynamic-functions]]. The reversible adiabat $TV^{\gamma-1} = \text{const}$ becomes, in [[thermodynamics/second-law]], the statement that a reversible adiabatic change is *isentropic*, which is the definition the second law gives it. Enthalpy and $\mu_\mathrm{JT}$ return in [[thermodynamics/phase-equilibria]] (vapour-pressure curves, refrigeration cycles), in [[thermodynamics/mixtures]] (excess heat capacities probe intermolecular forces), and in [[thermodynamics/reaction-equilibrium]] where $\Delta_\mathrm{r}C_p$ of dissolved species controls biochemistry near room temperature. The molecular reading of it all — why $C_V$ is what it is, why $\alpha T$ crosses one — lives in [[statistical-thermodynamics/boltzmann-distribution]] and [[statistical-thermodynamics/real-gases-liquids]]. Even the cell voltages of [[electrochemistry/cell-thermodynamics]] inherit their temperature dependence from these same heat capacities.

::: summary
- Enthalpy $H = U + pV$ is the constant-pressure heat: $\Delta H = q_\mathrm{p}$ for closed systems with only expansion work; $\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + RT\,\Delta n_\mathrm{gas}$ for ideal-gas reactions.
- $C_{V,\mathrm{m}} = (\partial U/\partial T)_V$ and $C_{p,\mathrm{m}} = (\partial H/\partial T)_p$; for ideal gases $C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R$ (Mayer), and in general $C_p - C_V = TV\alpha^2/\kappa_T \ge 0$.
- Equipartition explains the gas values ($\tfrac{3}{2}R$, $\tfrac{5}{2}R$ for $C_{V,\mathrm{m}}$); vibrations switch on at high temperature.
- Kirchhoff's law: $\mathrm{d}\Delta_\mathrm{r}H^\circ/\mathrm{d}T = \Delta_\mathrm{r}C_p^\circ$; reaction enthalpies drift linearly with temperature when $\Delta_\mathrm{r}C_p$ is constant.
- Reversible adiabats of an ideal gas obey $pV^\gamma$, $TV^{\gamma-1}$, $p^{1-\gamma}T^\gamma$ = const, with $w = \Delta U = C_V\Delta T$; adiabats are steeper than isotherms and irreversible adiabatic expansion ends hotter than reversible.
- Throttling is isenthalpic; $\mu_\mathrm{JT} = (T\alpha - 1)V_\mathrm{m}/C_{p,\mathrm{m}}$ vanishes for ideal gases, is positive below the inversion temperature and negative above it.
- Hydrogen and helium warm at room-temperature throttling because $298\ \mathrm{K}$ exceeds their inversion temperatures; Linde liquefaction exploits the opposite sign of ordinary gases.
:::

## Exercises

::: exercise Heating argon at constant pressure {level=1 check="6.24"}
Three moles of argon, treated as an ideal monatomic gas, are heated from $300\ \mathrm{K}$ to $400\ \mathrm{K}$ at constant pressure. Take $C_{V,\mathrm{m}} = \tfrac{3}{2}R$. How much heat is absorbed? (Enter $q$ in $\mathrm{kJ}$.)
::: solution
At constant pressure $q = nC_{p,\mathrm{m}}\Delta T$ with $C_{p,\mathrm{m}} = C_{V,\mathrm{m}} + R = \tfrac{5}{2}R = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$:
$$
q = 3.00 \times 20.79 \times 100 = 6236\ \mathrm{J} = 6.24\ \mathrm{kJ}.
$$
Of this, $nC_{V,\mathrm{m}}\Delta T = 3.74\ \mathrm{kJ}$ raises the temperature and $nR\Delta T = 2.49\ \mathrm{kJ}$ is the expansion work.
:::
:::

::: exercise From bomb to flask {level=1 check="-101.4"}
For $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightarrow 2\,\mathrm{NH_3(g)}$ at $500\ \mathrm{K}$ a bomb calorimeter gives $\Delta_\mathrm{r}U = -93.1\ \mathrm{kJ\,mol^{-1}}$. Find $\Delta_\mathrm{r}H$ at the same temperature. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta n_\mathrm{gas} = 2 - 4 = -2$, so
$$
\Delta_\mathrm{r}H = \Delta_\mathrm{r}U + RT\,\Delta n_\mathrm{gas}
= -93.1 + \frac{8.314 \times 500 \times (-2)}{1000}
= -93.1 - 8.3 = -101.4\ \mathrm{kJ\,mol^{-1}} .
$$
Four moles of gas become two: the atmosphere does work on the system, and the constant-pressure heat exceeds the constant-volume heat in magnitude.
:::
:::

::: exercise Adiabatic compression of a monatomic gas {level=1 check="871"}
One mole of argon ($\gamma = 5/3$) at $298\ \mathrm{K}$ is compressed reversibly and adiabatically to one fifth of its initial volume. What is the final temperature? (Enter $T_\mathrm{f}$ in $\mathrm{K}$.)
::: solution
$TV^{\gamma-1} = \text{const}$ with $\gamma - 1 = 2/3$:
$$
T_\mathrm{f} = 298 \times 5^{2/3} = 298 \times 2.924 = 871\ \mathrm{K}.
$$
Compressing to a fifth of the volume without letting heat escape raises the temperature by a factor $5^{2/3} \approx 2.9$ — the same arithmetic that makes diesel engines hot enough to ignite their fuel without a spark plug.
:::
:::

::: exercise Kirchhoff shift for carbon monoxide {level=2 check="-284.4"}
For $\mathrm{CO(g)} + \tfrac{1}{2}\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$, $\Delta_\mathrm{r}H^\circ(298.15\ \mathrm{K}) = -283.0\ \mathrm{kJ\,mol^{-1}}$ and, from NIST-JANAF values at $298.15\ \mathrm{K}$, $C_{p,\mathrm{m}}$: $\mathrm{CO_2}\ 37.13$, $\mathrm{CO}\ 29.14$, $\mathrm{O_2}\ 29.38\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Estimate $\Delta_\mathrm{r}H^\circ$ at $500\ \mathrm{K}$, assuming constant heat capacities. (Enter the value in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta_\mathrm{r}C_p^\circ = 37.13 - 29.14 - 14.69 = -6.70\ \mathrm{J\,K^{-1}\,mol^{-1}}$, so
$$
\Delta_\mathrm{r}H^\circ(500) = -283.0 + (-6.70 \times 10^{-3})(500 - 298.15) = -283.0 - 1.35 = -284.4\ \mathrm{kJ\,mol^{-1}} .
$$
:::
:::

::: exercise Irreversible adiabatic expansion {level=2 check="223"}
One mole of an ideal diatomic gas ($C_{V,\mathrm{m}} = \tfrac{5}{2}R$) at $300\ \mathrm{K}$ and $10.0\ \mathrm{bar}$ expands adiabatically against a constant external pressure of $1.00\ \mathrm{bar}$ until mechanical equilibrium. Find the final temperature. (Enter $T_\mathrm{f}$ in $\mathrm{K}$, to three significant figures.)
::: solution
With $q = 0$: $C_{V,\mathrm{m}}(T_\mathrm{f} - T_\mathrm{i}) = -p_\mathrm{ex}(V_\mathrm{f} - V_\mathrm{i})$, and $p_\mathrm{ex}V = RT$ at the final state gives the linear equation
$$
20.79\,(T_\mathrm{f} - 300) = -\left(8.314\,T_\mathrm{f} - 8.314 \times 300/10.0\right),
$$
$$
29.10\,T_\mathrm{f} = 6236 + 249.4 = 6485
\quad\Longrightarrow\quad
T_\mathrm{f} = 223\ \mathrm{K}.
$$
The reversible expansion to the same pressure would reach $155\ \mathrm{K}$; the difference, $67\ \mathrm{K}$, is the temperature equivalent of the work destroyed by turbulence.
:::
:::

::: exercise Work of a reversible adiabat {level=2 check="-1.51"}
One mole of ideal diatomic gas at $300\ \mathrm{K}$ and $10.0\ \mathrm{L}$ expands reversibly and adiabatically to $20.0\ \mathrm{L}$. Take $C_{V,\mathrm{m}} = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Compute the work. (Enter $w$ in $\mathrm{kJ}$.)
::: solution
$T_\mathrm{f} = 300(10.0/20.0)^{2/7} = 227.4\ \mathrm{K}$, and with $q = 0$,
$$
w = \Delta U = 20.79 \times (227.4 - 300) = -1510\ \mathrm{J} = -1.51\ \mathrm{kJ}.
$$
The gas does $1.51\ \mathrm{kJ}$ on the surroundings and pays for it entirely out of its own internal energy.
:::
:::

::: exercise Derive the general $C_p - C_V$ relation {level=3}
Starting from the definitions of $C_p$ and $C_V$ and the energy-pressure relation $(\partial U/\partial V)_T = T(\partial p/\partial T)_V - p$, derive $C_p - C_V = TV\alpha^2/\kappa_T$. Evaluate it for copper at $298\ \mathrm{K}$ with $\alpha = 49.2\times10^{-6}\ \mathrm{K^{-1}}$, $\kappa_T = 7.3\times10^{-7}\ \mathrm{bar^{-1}}$, $V_\mathrm{m} = 7.11\ \mathrm{cm^3\,mol^{-1}}$, and explain why the result is so much smaller than $R$.
::: solution
$C_p - C_V = (\partial H/\partial T)_p - (\partial U/\partial T)_V$. With $H = U + pV$, $(\partial H/\partial T)_p = (\partial U/\partial T)_p + p(\partial V/\partial T)_p$, and expanding $(\partial U/\partial T)_p = (\partial U/\partial T)_V + (\partial U/\partial V)_T(\partial V/\partial T)_p$,
$$
C_p - C_V = \left[\left(\frac{\partial U}{\partial V}\right)_T + p\right]\left(\frac{\partial V}{\partial T}\right)_p
= T\left(\frac{\partial p}{\partial T}\right)_V\left(\frac{\partial V}{\partial T}\right)_p ,
$$
where the energy-pressure relation cancelled the $p$. Now $(\partial V/\partial T)_p = V\alpha$, and the cyclic rule gives $(\partial p/\partial T)_V = -(\partial V/\partial T)_p / (\partial V/\partial p)_T = \alpha/\kappa_T$. Hence $C_p - C_V = TV\alpha^2/\kappa_T$. For copper:
$$
C_{p,\mathrm{m}} - C_{V,\mathrm{m}}
= \frac{298 \times 7.11\times10^{-6}\ \mathrm{m^3} \times (49.2\times10^{-6})^2}{7.3\times10^{-12}\ \mathrm{Pa^{-1}}}
= 0.70\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
Small because a solid barely expands ($\alpha$ tiny) and is hard to compress ($\kappa_T$ tiny, but $\alpha^2$ wins the ratio): heating a solid at constant pressure costs almost no extra work, unlike a gas, which spends the full $R$.
:::
:::

::: exercise Hydrogen's inversion temperature {level=3 check="226"}
The van der Waals equation predicts a maximum Joule–Thomson inversion temperature $T_\mathrm{i} = 2a/Rb$. Using $a = 0.250\ \mathrm{L^2\,bar\,mol^{-2}}$ and $b = 0.0266\ \mathrm{L\,mol^{-1}}$ for hydrogen, compute $T_\mathrm{i}$ and explain why throttling hydrogen at $298\ \mathrm{K}$ warms it, and what a liquefier must do about it. (Enter $T_\mathrm{i}$ in $\mathrm{K}$.)
::: solution
$$
T_\mathrm{i} = \frac{2a}{Rb}
= \frac{2 \times 0.250\ \mathrm{L^2\,bar\,mol^{-2}}}{0.08314\ \mathrm{L\,bar\,K^{-1}\,mol^{-1}} \times 0.0266\ \mathrm{L\,mol^{-1}}}
= \frac{0.500}{0.002212}\ \mathrm{K} = 226\ \mathrm{K}.
$$
(The measured value is about $200\ \mathrm{K}$; van der Waals overestimates, but the conclusion is untouched.) Since $298\ \mathrm{K} > T_\mathrm{i}$, hydrogen sits above its inversion curve: the repulsive-size term dominates and $\mu_\mathrm{JT} < 0$, so throttling *warms* it. A hydrogen liquefier must therefore pre-cool the gas below $T_\mathrm{i}$ — with a liquid-nitrogen bath at $77\ \mathrm{K}$, or a cascade of expansions through Joule–Thomson engines — before throttling can begin to liquefy it. Helium, with $T_\mathrm{i} \approx 40\ \mathrm{K}$, needs liquid-hydrogen or closed-cycle pre-cooling; this single inequality is why the two lightest gases are also the hardest to bottle as liquids.
:::
:::
