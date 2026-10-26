The combustor is where a gas turbine gets its energy. Between the compressor exit and the turbine entry, kerosene is sprayed into the air and burnt, raising the temperature from around $800\ \mathrm{K}$ to $1600\ \mathrm{K}$ or more in a space a few tens of centimetres long, with the gas moving through it in a few milliseconds. The combustor does no work and has no moving parts, yet it is one of the hardest components to design, because it must satisfy a list of requirements that pull against each other: complete combustion at every power setting from ground idle to take-off, relight after a flame-out at high altitude, a small pressure loss, a temperature profile at exit that the turbine can survive, a liner that lasts tens of thousands of hours in a radiating flame, and — increasingly the dominant constraint — low emissions of nitrogen oxides, carbon monoxide, unburnt hydrocarbons and soot.

This chapter treats the combustor as an engineer does at the preliminary design stage. We first find how much fuel is needed for a given temperature rise and see why the overall mixture is far too lean to burn on its own. That leads to the zoned combustor, in which only part of the air meets the fuel in a near-stoichiometric primary zone and the rest is added downstream. We then look at flame stabilisation and residence time, pressure loss and the flow through liner holes, the correlations that predict combustion efficiency, and finally the chemistry of pollutant formation and the lean-burn designs it has driven. Stagnation quantities carry the subscript $t$; station 3 is the combustor inlet (compressor delivery) and station 4 the combustor exit (turbine entry). Air is a perfect gas with $R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$; for the hot mixture we use a mean $c_p = 1150\ \mathrm{J\,kg^{-1}\,K^{-1}}$. Jet A kerosene has a lower heating value of $43\ \mathrm{MJ/kg}$. The thermochemistry is developed in [[thermodynamics/mixtures-combustion]].

## Requirements and the basic layout

A modern aero-engine combustor is almost always **annular**: a ring-shaped flame tube, or **liner**, sits inside an annular casing between compressor and turbine. Early engines used separate **can** combustors arranged around the shaft, and an intermediate **cannular** (tubo-annular) layout put separate liners inside a common annular casing; the annular design has won because it is shortest and lightest and has the least wetted area to cool. In every layout the same elements appear:

- a **diffuser** that slows the compressor delivery air from about $150\ \mathrm{m/s}$ to a few tens of metres per second with as little pressure loss as possible;
- a **dome** with fuel injectors and swirlers at the upstream end of the liner;
- the liner itself, perforated with rows of holes through which air enters in stages;
- annular passages outside the liner carrying the air not yet admitted.

The fuel injector atomises the liquid kerosene into droplets of the order of tens of micrometres, which evaporate and mix with air before they can burn. Older engines used **pressure-swirl** atomisers, in which the fuel pressure itself drives a swirling liquid sheet that breaks up; nearly all modern engines use **air-blast** atomisers, which use the high-velocity air through the swirler to shatter a thin fuel film, giving fine sprays that change little with fuel flow.

## Fuel–air ratio and equivalence ratio

::: definition Fuel–air ratio and equivalence ratio {#def-equivalence-ratio}
The **fuel–air ratio** is the ratio of fuel to air mass flow, $f = \dot m_f/\dot m_a$. The **stoichiometric** fuel–air ratio $f_{st}$ is the value at which the oxygen in the air exactly suffices to oxidise all the carbon to $\mathrm{CO_2}$ and all the hydrogen to $\mathrm{H_2O}$. The **equivalence ratio** is
$$
\Phi = \frac{f}{f_{st}},
$$
with $\Phi < 1$ for a **lean** mixture (excess air) and $\Phi > 1$ for a **rich** mixture (excess fuel). (We write $\Phi$ to keep $\phi$ for the flow coefficient of [[propulsion/compressors]].)
:::

Kerosene is a mixture of hundreds of hydrocarbons; for stoichiometry it is well represented by the surrogate formula $\mathrm{C_{12}H_{23}}$ (molar mass $167.3\ \mathrm{kg/kmol}$). Complete combustion needs $12 + 23/4 = 17.75$ moles of $\mathrm{O_2}$ per mole of fuel, and each mole of $\mathrm{O_2}$ comes with $1/0.2095 = 4.77$ moles of air (molar mass $28.97\ \mathrm{kg/kmol}$), so
$$
f_{st} = \frac{167.3}{17.75 \times 4.77 \times 28.97} = 0.068,
$$ {#eq-fst}
an air–fuel ratio of about $14.7$. This number is worth remembering: it is nearly the same for all hydrocarbon fuels with a hydrogen-to-carbon ratio near two.

::: proposition Fuel–air ratio from the energy balance {#prop-far}
For an adiabatic combustor with inlet air at $T_{t3}$, fuel supplied at about the reference temperature $T_{\mathrm{ref}} = 298\ \mathrm{K}$, a combustion efficiency $\eta_b$ and products leaving at $T_{t4}$, and with a single mean specific heat $\bar c_p$ for air and products over the temperature range,
$$
f = \frac{\bar c_p\,(T_{t4} - T_{t3})}{\eta_b Q_R - \bar c_p\,(T_{t4} - T_{\mathrm{ref}})},
$$ {#eq-far}
where $Q_R$ is the lower heating value of the fuel.
:::

::: proof
Apply the steady-flow energy equation to a control volume around the combustor: no shaft work, negligible heat loss through the casing, and changes of kinetic energy included in the stagnation enthalpies. Use enthalpies measured from $T_{\mathrm{ref}}$, at which the heating value is defined. The air brings $\dot m_a\bar c_p(T_{t3} - T_{\mathrm{ref}})$; the fuel brings, at $T_{\mathrm{ref}}$, no sensible enthalpy but releases chemical energy $\eta_b\dot m_f Q_R$, where $\eta_b < 1$ accounts for the fraction not released because combustion is incomplete. The products leave with $(\dot m_a + \dot m_f)\bar c_p(T_{t4} - T_{\mathrm{ref}})$. Hence
$$
\dot m_a\bar c_p(T_{t3} - T_{\mathrm{ref}}) + \eta_b\dot m_f Q_R = (\dot m_a + \dot m_f)\,\bar c_p(T_{t4} - T_{\mathrm{ref}}).
$$
Divide by $\dot m_a$, write $f = \dot m_f/\dot m_a$ and collect terms in $f$:
$$
f\left[\eta_b Q_R - \bar c_p(T_{t4} - T_{\mathrm{ref}})\right] = \bar c_p(T_{t4} - T_{t3}),
$$
which is [[#eq-far]]. The approximations are the single mean specific heat (real $c_p$ of products rises with temperature and with water content) and the neglect of dissociation; for accurate work, tabulated enthalpies of air and of combustion products, or charts of temperature rise against fuel–air ratio, replace $\bar c_p$.
:::

::: example Fuel flow for a given turbine entry temperature {#ex-far}
A combustor receives $50\ \mathrm{kg/s}$ of air at $T_{t3} = 800\ \mathrm{K}$ and must deliver $T_{t4} = 1600\ \mathrm{K}$ with combustion efficiency $0.99$. Find the fuel–air ratio, the fuel flow and the overall equivalence ratio.
::: solution
From [[#eq-far]],
$$
f = \frac{1150 \times 800}{0.99 \times 43\times10^{6} - 1150 \times 1302} = \frac{9.20\times10^{5}}{4.257\times10^{7} - 1.497\times10^{6}} = 0.0224.
$$
Fuel flow $\dot m_f = 0.0224 \times 50 = 1.12\ \mathrm{kg/s}$, about $4.0$ tonnes per hour. The equivalence ratio is $\Phi = 0.0224/0.068 = 0.33$.

**Sanity check.** Ignoring the denominator correction, $f \approx 1150 \times 800/43\times10^6 = 0.0214$ — within 5 %, as it should be since $T_{t4}$ is far below a flame temperature. A take-off fuel flow of about one kilogram per second for a core flow of $50\ \mathrm{kg/s}$ is consistent with a large modern turbofan.
:::
:::

The equivalence ratio of $0.33$ in [[#ex-far]] is the central fact of combustor design. Hydrocarbon–air mixtures will not sustain a flame much leaner than about $\Phi \approx 0.5$, and a flame at $\Phi = 0.33$ would be impossible to stabilise; even if it could be, combustion near the lean limit is slow and incomplete. On the other hand, the turbine cannot accept anything close to a stoichiometric flame temperature. The combustor solves both problems by **staging the air**.

::: widget plot
f: 1150*(x - T3)/(0.99*43e6 - 1150*(x - 298)); 0.068 + 0*x
x: 900, 3200
y: 0, 0.08
sliders: T3=800:500:950:10
labels: f\ \text{needed for}\ T_{t4}; f_{st} = 0.068
caption: Fuel–air ratio required by the energy balance [[#eq-far]] against the exit temperature $T_{t4}$ (horizontal axis, kelvin) for the compressor delivery temperature on the slider. Today's turbine entry temperatures (about $1600$–$2000\ \mathrm{K}$) need only a third to a half of the stoichiometric fuel. With a constant $\bar c_p$ the curve reaches $f_{st}$ near $3100\ \mathrm{K}$; the true stoichiometric flame temperature is several hundred kelvin lower, because $c_p$ rises with temperature and the products dissociate — see the warning below.
:::

::: warning Constant-$c_p$ flame temperatures are far too high
The single-$\bar c_p$ energy balance is accurate for the modest temperature rises of the overall combustor, but extrapolating it to a stoichiometric flame gives nonsense. From $800\ \mathrm{K}$, [[#eq-far]] with $\bar c_p = 1150\ \mathrm{J\,kg^{-1}\,K^{-1}}$ predicts a stoichiometric temperature over $3100\ \mathrm{K}$; an equilibrium calculation gives something of the order of $2600$–$2700\ \mathrm{K}$. Two effects are missing. The specific heat of $\mathrm{CO_2}$ and $\mathrm{H_2O}$ rises steeply at high temperature, so each kelvin costs more energy; and above about $2000\ \mathrm{K}$ the products **dissociate** — $\mathrm{CO_2} \rightleftharpoons \mathrm{CO} + \tfrac12\mathrm{O_2}$, $\mathrm{H_2O} \rightleftharpoons \mathrm{OH} + \tfrac12\mathrm{H_2}$ — absorbing energy. Use proper equilibrium thermochemistry (for instance NASA's CEA program or tabulated combustion charts) for any primary-zone or flame temperature, and expect the constant-$c_p$ estimate to overpredict by hundreds of kelvin.
:::

## Zones of a conventional combustor

A conventional (rich- or near-stoichiometric primary zone) combustor divides the liner into three regions along its length.

1. **Primary zone.** Behind the dome, swirling air from the injector swirler and from a first row of liner holes is mixed with fuel at an equivalence ratio near one. Here the flame is anchored, and the temperature is highest (above $2000\ \mathrm{K}$). Strong recirculation (described below) returns hot burnt gas to the injector to ignite the incoming mixture.
2. **Intermediate (secondary) zone.** Further air, admitted through a second row of holes, completes the oxidation of $\mathrm{CO}$ and hydrogen to $\mathrm{CO_2}$ and water while the temperature is still high enough for the reactions to proceed, and recovers some of the dissociation losses.
3. **Dilution zone.** The remaining air enters through large holes as jets that penetrate to the centre of the liner and mix the gas down to the turbine entry temperature, shaping the radial temperature profile so that the hottest gas meets the mid-span of the blades rather than the highly stressed root or the tip.

Part of the air does not enter through holes at all but flows along the inside of the liner wall as a **cooling film**, or passes through thousands of small effusion holes, keeping the metal at an acceptable temperature. Liner walls are typically nickel or cobalt alloy sheet with thermal-barrier coatings, and in some modern engines ceramic-matrix composite.

::: example Air distribution in a zoned combustor {#ex-air-split}
For the combustor of [[#ex-far]] (overall $f = 0.0224$), what fraction of the air should enter the primary zone if all the fuel burns there at $\Phi = 0.90$? What happens to the rest of the air?
::: solution
In the primary zone the fuel–air ratio is $0.90 \times 0.068 = 0.0612$. All of the fuel, $0.0224$ per kilogram of total air, must meet $0.0224/0.0612 = 0.366$ kg of air per kilogram of total air. So about $37\ \%$ of the air enters the primary zone (including the swirler air); the other $63\ \%$ divides between the intermediate zone, the dilution jets and liner cooling. If, for example, $20\ \%$ is used for wall cooling and $15\ \%$ for the intermediate zone, the dilution holes take the remaining $28\ \%$.

**Sanity check.** The primary-zone fraction equals $\Phi_{\text{overall}}/\Phi_{\text{pz}} = 0.33/0.90$, a result independent of temperatures. Published conventional designs admit roughly a quarter to a half of the air in the primary zone, consistent with this.
:::
:::

## Flame stabilisation and residence time

A flame in a premixed gas propagates into the unburnt mixture at the **turbulent flame speed**, a few metres per second at most — but even the slowed-down combustor air moves at tens of metres per second. A flame placed in such a stream would simply be blown out of the engine. The combustor holds the flame by making a region in which the local flow velocity is low and in which hot products continuously ignite fresh mixture: a **recirculation zone**.

In an aero-engine combustor the recirculation is created mainly by **swirl**. Air passing through the vanes of the swirler around each injector acquires strong tangential velocity; the swirling jet spreads out, its centre falls in pressure, and above a critical swirl number the axial flow on the centreline reverses — **vortex breakdown** — creating a toroidal recirculation bubble just downstream of the injector. Opposed jets from the first row of primary holes reinforce the bubble and close it at the downstream end. Hot gas trapped in the bubble has a residence time much longer than the mean, acting as a continuous ignition source, and the edge of the bubble — a shear layer where velocities are low — is where the flame anchors.

Whether combustion is completed depends on the time the gas spends in the liner compared with the time needed for evaporation, mixing and chemistry. The mean **residence time** is roughly the liner length divided by a mean gas velocity,
$$
\tau_{\text{res}} \approx \frac{L}{\bar V}, \qquad \bar V = \frac{\dot m}{\bar\rho A},
$$ {#eq-residence}
and in aero-engines it is of the order of a few milliseconds. At high power, with high pressure and temperature, the chemistry is fast and a few milliseconds is ample; at idle and at high altitude, where pressure is low, chemical rates fall and combustion efficiency drops.

::: definition Reference velocity and pressure-loss factor {#def-plf}
The **reference area** $A_{\mathrm{ref}}$ of a combustor is the maximum cross-sectional area of the casing. The **reference velocity** $V_{\mathrm{ref}} = \dot m_3/(\rho_3 A_{\mathrm{ref}})$ and **reference dynamic pressure** $q_{\mathrm{ref}} = \rho_3 V_{\mathrm{ref}}^2/2$ are formed with the inlet density $\rho_3 = p_3/(RT_3)$. The **pressure-loss factor** is
$$
\mathrm{PLF} = \frac{\Delta p_{t,3-4}}{q_{\mathrm{ref}}},
$$
a property of the geometry that stays nearly constant as the flow changes. The fractional loss $\Delta p_{t,3-4}/p_{t3}$, typically $3$–$6\ \%$ in aero-engines, is the figure that enters the cycle.
:::

The pressure drop across the liner wall is not just a loss: it drives the air jets through the liner holes, and the jets must penetrate and mix. The jet velocity follows from Bernoulli's equation.

::: proposition Velocity and flow through a liner hole {#prop-liner-jet}
Air of density $\rho_3$ flowing from the annulus outside the liner, where its static pressure is $p_{\mathrm{an}}$ and its velocity negligible, through a hole into the liner at static pressure $p_{\mathrm{L}}$ forms a jet with velocity and mass flow
$$
V_j = \sqrt{\frac{2\Delta p_L}{\rho_3}}, \qquad \dot m_h = C_d A_h\sqrt{2\rho_3\Delta p_L}, \qquad \Delta p_L = p_{\mathrm{an}} - p_{\mathrm{L}},
$$
where $A_h$ is the geometric hole area and $C_d$ (typically $0.6$–$0.8$) a discharge coefficient that accounts for the contraction of the jet.
:::

::: proof
Apply Bernoulli's equation along a streamline from the annulus to the vena contracta of the jet, assuming steady, inviscid, incompressible flow (valid because $\Delta p_L/p_3$ is only a few per cent, so the density changes by a few per cent at most) and negligible annulus velocity: $p_{\mathrm{an}} = p_{\mathrm{L}} + \tfrac12\rho_3V_j^2$, which gives $V_j$. The jet contracts after leaving the hole, so its effective area is $C_dA_h$, and $\dot m_h = \rho_3 C_d A_h V_j = C_dA_h\sqrt{2\rho_3\Delta p_L}$. If the annulus velocity is not negligible, the annulus *total* pressure replaces $p_{\mathrm{an}}$, and $C_d$ then depends on the ratio of annulus to jet velocity.
:::

::: example Reference velocity, residence time and jet velocity {#ex-residence}
An annular combustor passes $\dot m_3 = 50\ \mathrm{kg/s}$ at $p_3 = 3.0\ \mathrm{MPa}$, $T_3 = 800\ \mathrm{K}$ through a casing of reference area $A_{\mathrm{ref}} = 0.25\ \mathrm{m^2}$. The liner pressure drop is $3\ \%$ of $p_3$ and the liner, about $0.25\ \mathrm{m}$ long, has the same cross-sectional area as the casing (a crude upper bound). Find $V_{\mathrm{ref}}$, $q_{\mathrm{ref}}$, the PLF if the whole $3\ \%$ is the total-pressure loss, an estimate of the residence time with gas at a mean temperature of $1600\ \mathrm{K}$, and the jet velocity through the liner holes.
::: solution
**Reference values.** $\rho_3 = 3.0\times10^{6}/(287 \times 800) = 13.07\ \mathrm{kg/m^3}$, so
$$
V_{\mathrm{ref}} = \frac{50}{13.07 \times 0.25} = 15.3\ \mathrm{m/s},
\qquad
q_{\mathrm{ref}} = \tfrac12 \times 13.07 \times 15.3^2 = 1531\ \mathrm{Pa}.
$$
**PLF.** $\Delta p_t = 0.03 \times 3.0\ \mathrm{MPa} = 90\ \mathrm{kPa}$, so $\mathrm{PLF} = 90\,000/1531 = 59$.

**Residence time.** At $1600\ \mathrm{K}$ the density halves, $\bar\rho = 6.53\ \mathrm{kg/m^3}$; with $51\ \mathrm{kg/s}$ (air plus fuel), $\bar V = 51/(6.53 \times 0.25) = 31\ \mathrm{m/s}$ and $\tau_{\text{res}} \approx 0.25/31 = 8\ \mathrm{ms}$. The liner is smaller than the casing, so the true residence time is shorter — a few milliseconds.

**Jet velocity.** From [[#prop-liner-jet]], $V_j = \sqrt{2 \times 90\,000/13.07} = 117\ \mathrm{m/s}$.

**Sanity check.** The jets enter about eight times faster than the reference velocity; that velocity ratio, and the jet-to-crossflow momentum ratio it implies, is what lets dilution jets reach the liner centreline. The cost is the $3\ \%$ pressure loss, which reduces the turbine expansion ratio and, for a typical cycle, costs about a third of a per cent in specific fuel consumption per per cent of loss.
:::
:::

## Combustion efficiency and the loading parameter

**Combustion efficiency** $\eta_b$ is the fraction of the fuel's heating value actually released. At take-off it exceeds $99.9\ \%$; at ground idle, with low pressure, low inlet temperature and a lean overall mixture, it can fall to $99\ \%$ or below, and the unreleased energy leaves as carbon monoxide and unburnt hydrocarbons. Measured exhaust composition gives $\eta_b$ directly: if the **emission indices** — grams of pollutant per kilogram of fuel burnt — of $\mathrm{CO}$ and unburnt hydrocarbons are $\mathrm{EI_{CO}}$ and $\mathrm{EI_{HC}}$, then
$$
1 - \eta_b \approx \frac{10.1\,\mathrm{EI_{CO}} + Q_R\,\mathrm{EI_{HC}}}{1000\,Q_R}
$$ {#eq-comb-ineff}
with heating values in $\mathrm{MJ/kg}$: $10.1\ \mathrm{MJ/kg}$ is the heating value of $\mathrm{CO}$, and unburnt hydrocarbons are assigned the fuel's own heating value. This is the method of SAE ARP 1533.

For design, combustion efficiency at a given operating point is correlated with a **loading parameter**. In the approach developed by Lefebvre (see Lefebvre and Ballal, *Gas Turbine Combustion*, 3rd edition, 2010), the burning rate is assumed to be limited by chemical reaction rates in the primary zone, which leads to the parameter
$$
\theta = \frac{p_3^{1.75}A_{\mathrm{ref}}D_{\mathrm{ref}}^{0.75}\,\exp(T_3/300)}{\dot m_3},
$$ {#eq-theta}
with $p_3$ in $\mathrm{Pa}$, $A_{\mathrm{ref}}$ in $\mathrm{m^2}$, the reference height $D_{\mathrm{ref}}$ in $\mathrm{m}$, $T_3$ in $\mathrm{K}$ and $\dot m_3$ in $\mathrm{kg/s}$. Experimental combustion efficiencies of a given combustor collapse onto one curve against $\theta$, rising towards $100\ \%$ as $\theta$ increases. The exponents are empirical; the $1.75$ power of pressure reflects an effective reaction order and the exponential reflects the temperature dependence of the reaction rates. The parameter is most useful for *ratios*: scaling a combustor, or comparing operating points of one combustor.

::: example How altitude erodes combustion efficiency {#ex-theta}
The combustor of [[#ex-residence]] operates at take-off with $p_3 = 3.0\ \mathrm{MPa}$, $T_3 = 800\ \mathrm{K}$, $\dot m_3 = 50\ \mathrm{kg/s}$. At cruise the values are $1.2\ \mathrm{MPa}$, $650\ \mathrm{K}$ and $20\ \mathrm{kg/s}$; for an altitude relight after a flame-out, the windmilling engine delivers $40\ \mathrm{kPa}$, $250\ \mathrm{K}$ and $3\ \mathrm{kg/s}$. Compare $\theta$ at the three conditions.
::: solution
The geometry cancels in the ratio:
$$
\frac{\theta_{\text{cruise}}}{\theta_{\text{TO}}} = \left(\frac{1.2}{3.0}\right)^{1.75}\exp\!\left(\frac{650 - 800}{300}\right)\frac{50}{20} = 0.2014 \times 0.6065 \times 2.5 = 0.305.
$$
$$
\frac{\theta_{\text{relight}}}{\theta_{\text{TO}}} = \left(\frac{0.040}{3.0}\right)^{1.75}\exp\!\left(\frac{250 - 800}{300}\right)\frac{50}{3} = 5.23\times10^{-4} \times 0.160 \times 16.7 = 1.4\times10^{-3}.
$$
**Sanity check.** At cruise the loading parameter falls by a factor of three, still on the flat, high-efficiency part of the curve for a well-designed combustor. At altitude relight it falls by almost three orders of magnitude, and this — not take-off — is the condition that sizes the primary zone volume and fixes the relight altitude certified for the engine. The pressure term dominates: a low-pressure flame is a slow flame.
:::
:::

## Pollutant formation

Every hydrocarbon flame produces $\mathrm{CO_2}$ and water in proportion to the fuel burnt — about $3.16\ \mathrm{kg}$ of $\mathrm{CO_2}$ per kilogram of kerosene — and only burning less fuel reduces them. The regulated pollutants are different: they are products of *incomplete* or *side* reactions, and the combustor design controls them.

- **Carbon monoxide and unburnt hydrocarbons** come from incomplete combustion, mostly at low power: low primary-zone temperature, poor atomisation, quenching of reactions by cooling films. They fall steeply as power rises.
- **Smoke and soot** (non-volatile particulate matter) form in fuel-rich pockets of the primary zone, where hydrocarbon fragments grow into carbon particles; much of the soot is oxidised again downstream, and what survives is emitted.
- **Oxides of nitrogen** ($\mathrm{NO}$ and $\mathrm{NO_2}$, together $\mathrm{NO_x}$) form at high temperature from the nitrogen and oxygen of the air. They rise with power and with pressure ratio — the dominant combustor emission problem of modern high-pressure-ratio engines.

The main route to $\mathrm{NO}$ in a gas-turbine flame is the **thermal** or **Zeldovich** mechanism (Zeldovich, 1946):
$$
\mathrm{O + N_2 \rightarrow NO + N}, \qquad \mathrm{N + O_2 \rightarrow NO + O}, \qquad \mathrm{N + OH \rightarrow NO + H}.
$$
The first step, which must break the strong $\mathrm{N\equiv N}$ bond, is rate-limiting. Its rate constant has an activation temperature of about $38\,000\ \mathrm{K}$ — a commonly used value is $k = 1.8\times10^{14}\exp(-38\,370/T)\ \mathrm{cm^3\,mol^{-1}\,s^{-1}}$ — and the oxygen-atom concentration it multiplies also rises steeply with temperature. Thermal $\mathrm{NO_x}$ is therefore negligible below about $1800\ \mathrm{K}$ and rises roughly exponentially above it, and it grows with the time the gas spends at high temperature.

::: widget plot
f: exp(-38370/x)/exp(-38370/Tr)
x: 1600, 2600
y: 0, 12
sliders: Tr=2000:1800:2400:10
hlines: 1
caption: The rate constant of the rate-limiting Zeldovich step, $k \propto \exp(-38\,370/T)$, relative to its value at the reference temperature $T_r$ on the slider, against temperature (kelvin). A $200\ \mathrm{K}$ rise from $2000\ \mathrm{K}$ multiplies it by almost six — and that is before the increase in oxygen-atom concentration is counted. This steepness is why every low-$\mathrm{NO_x}$ strategy is first of all a strategy for avoiding hot spots near stoichiometric.
:::

The temperature dependence gives the two modern strategies.

**Rich–quench–lean (RQL).** The primary zone runs rich ($\Phi \approx 1.5$–$1.8$), where temperature is moderate and there is little free oxygen, so little $\mathrm{NO}$ forms; a very rapid **quench** by strong air jets then takes the mixture through stoichiometric as fast as possible, and the lean zone completes the burnout of $\mathrm{CO}$ and soot at temperatures too low for significant $\mathrm{NO}$. The quality of the quench mixing decides the result. Most current civil engines use refined RQL combustors.

**Lean burn (lean premixed or lean direct injection).** The fuel is mixed with a large fraction of the combustor air — sixty per cent or more — before it burns, at $\Phi \approx 0.5$–$0.7$, so that the flame never reaches stoichiometric temperatures anywhere. This gives the lowest $\mathrm{NO_x}$ but brings its own problems: a lean flame is close to blow-out, especially at low power, so lean-burn injectors are **staged**, with a richer pilot flame for idle and a lean main stage that is switched on as power rises; and lean premixed flames are prone to **combustion instabilities**, self-excited pressure oscillations that couple heat release to the combustor acoustics and can damage hardware. GE's TAPS (twin-annular premixing swirler) lean-burn combustor entered airline service on the GEnx in the early 2010s and is used on the CFM LEAP.

::: definition Emissions certification under ICAO Annex 16 {#def-icao-lto}
Engines for international civil aviation are certified under ICAO Annex 16, Volume II (first edition 1981; fifth edition 2023), on a **landing and take-off (LTO) cycle** of four thrust settings with times in mode: take-off at $100\ \%$ rated thrust $F_{00}$ for $0.7\ \mathrm{min}$, climb at $85\ \%$ for $2.2\ \mathrm{min}$, approach at $30\ \%$ for $4.0\ \mathrm{min}$, and taxi/ground idle at $7\ \%$ for $26.0\ \mathrm{min}$. For each of $\mathrm{NO_x}$, $\mathrm{CO}$ and $\mathrm{HC}$ the regulated quantity is the total mass emitted over the cycle, $D_p$, divided by rated thrust: $D_p/F_{00}$ in $\mathrm{g/kN}$. Limits, set by ICAO's Committee on Aviation Environmental Protection (CAEP), depend on pressure ratio and certification date; smoke and non-volatile particulate matter have their own standards.
:::

::: example An LTO-cycle $\mathrm{NO_x}$ figure {#ex-lto}
A hypothetical engine of rated thrust $F_{00} = 120\ \mathrm{kN}$ has, at the four LTO settings, fuel flows of $1.10$, $0.90$, $0.30$ and $0.10\ \mathrm{kg/s}$ and $\mathrm{NO_x}$ emission indices of $40.0$, $30.0$, $11.0$ and $4.5\ \mathrm{g/kg}$ (take-off, climb, approach, idle). Find $D_p/F_{00}$ for $\mathrm{NO_x}$.
::: solution
Fuel burnt in each mode is fuel flow × time: take-off $1.10 \times 42 = 46.2\ \mathrm{kg}$, climb $0.90 \times 132 = 118.8\ \mathrm{kg}$, approach $0.30 \times 240 = 72.0\ \mathrm{kg}$, idle $0.10 \times 1560 = 156.0\ \mathrm{kg}$. Multiplying by the emission indices:
$$
D_p = 46.2(40.0) + 118.8(30.0) + 72.0(11.0) + 156.0(4.5) = 1848 + 3564 + 792 + 702 = 6906\ \mathrm{g},
$$
so $D_p/F_{00} = 6906/120 = 57.6\ \mathrm{g/kN}$.

**Sanity check.** Climb, not take-off, contributes most, because of its longer time in mode; idle burns the most fuel but at a low emission index. Values of a few tens of grams per kilonewton are typical of modern large engines. Note how the regulation favours a combustor whose $\mathrm{NO_x}$ is low at high power — exactly where thermal $\mathrm{NO_x}$ peaks — while idle performance is judged mainly on $\mathrm{CO}$ and $\mathrm{HC}$, the products of *too cool* a flame. One combustor must satisfy both ends.
:::
:::

::: quiz
An engine manufacturer raises the overall pressure ratio of a new engine to improve fuel consumption, keeping a conventional combustor. Which emission is most likely to become harder to meet?
- [ ] Carbon monoxide at idle
- [x] Oxides of nitrogen at high power
- [ ] Unburnt hydrocarbons at idle
- [ ] $\mathrm{CO_2}$ per kilogram of fuel
::: solution
Higher pressure ratio raises the compressor delivery temperature $T_3$ and hence the flame temperature in a near-stoichiometric primary zone, and thermal $\mathrm{NO_x}$ rises roughly exponentially with flame temperature (and with pressure). Idle $\mathrm{CO}$ and $\mathrm{HC}$ tend to *improve* with hotter inlet air. $\mathrm{CO_2}$ per kilogram of fuel is fixed by the fuel's carbon content. This conflict between cycle efficiency and $\mathrm{NO_x}$ is what drove the development of lean-burn combustors.
:::
:::

::: history
Combustion was one of the hardest problems of the first jet engines. Frank **Whittle**'s experimental engine of 1937 ran with combustion that was difficult to stabilise and control, and a long series of combustion trials held up its development. In 1940 Isaac **Lubbock** and his team at the Shell laboratory at Fulham, working with Whittle's Power Jets, produced a combustion chamber with an atomising burner that gave the stable, intense combustion needed; Whittle credited the Shell system as the point at which combustion stopped being an obstacle, and the W.1 engine flew in the Gloster E.28/39 on 15 May 1941. The thermal mechanism of nitric-oxide formation was described by Yakov **Zeldovich** in 1946. International emissions certification of aircraft engines began with the first edition of ICAO Annex 16, Volume II, in 1981, and successive CAEP standards have tightened the $\mathrm{NO_x}$ limits since.
:::

::: summary
- The overall combustor mixture is very lean ($\Phi \approx 0.3$–$0.5$), because the turbine cannot accept stoichiometric temperatures; the fuel–air ratio follows from an energy balance, [[#eq-far]].
- Kerosene's stoichiometric fuel–air ratio is about $0.068$; constant-$c_p$ estimates of flame temperature are far too high because of dissociation and rising $c_p$.
- A conventional combustor **stages the air**: a near-stoichiometric primary zone stabilised by swirl-induced **recirculation**, an intermediate zone for burnout and a dilution zone that sets the exit temperature profile.
- Residence times are a few milliseconds; the pressure loss ($3$–$6\ \%$) drives the liner jets, $V_j = \sqrt{2\Delta p_L/\rho_3}$.
- Combustion efficiency is near $100\ \%$ at high power and falls at low pressure; Lefebvre's loading parameter $\theta \propto p_3^{1.75}\exp(T_3/300)/\dot m_3$ shows why altitude relight sizes the primary zone.
- Thermal $\mathrm{NO_x}$ (Zeldovich) is exponentially sensitive to temperature; **RQL** and **lean-burn** combustors avoid near-stoichiometric hot zones. Emissions are certified on the ICAO **LTO cycle** as $D_p/F_{00}$.
:::

## Exercises

::: exercise {level=1 check="0.294"}
A combustor runs at an overall fuel–air ratio of $0.020$ with kerosene ($f_{st} = 0.068$). What is the overall equivalence ratio? (Enter it rounded to three significant figures.)
::: solution
$\Phi = 0.020/0.068 = 0.294$ — about three times more air than needed to burn the fuel.
:::
:::

::: exercise {level=1 check="0.0223"}
Using [[#eq-far]] with $\bar c_p = 1150\ \mathrm{J\,kg^{-1}\,K^{-1}}$, $Q_R = 43\ \mathrm{MJ/kg}$, $\eta_b = 0.99$ and $T_{\mathrm{ref}} = 298\ \mathrm{K}$, find the fuel–air ratio that raises air from $700\ \mathrm{K}$ to $1500\ \mathrm{K}$. (Enter $f$ rounded to three significant figures.)
::: solution
$f = 1150 \times 800/(0.99 \times 43\times10^{6} - 1150 \times 1202) = 920\,000/(42.57\times10^{6} - 1.382\times10^{6}) = 920\,000/41.19\times10^{6} = 0.0223$.
:::
:::

::: exercise {level=1 check="10"}
Gas moves through a combustor liner $0.30\ \mathrm{m}$ long at a mean velocity of $30\ \mathrm{m/s}$. Estimate the mean residence time. (Enter it in milliseconds.)
::: solution
$\tau = L/\bar V = 0.30/30 = 0.010\ \mathrm{s} = 10\ \mathrm{ms}$.
:::
:::

::: exercise {level=2 check="0.988"}
At ground idle an engine's exhaust contains $\mathrm{EI_{CO}} = 30\ \mathrm{g/kg}$ and $\mathrm{EI_{HC}} = 5\ \mathrm{g/kg}$. Estimate the combustion efficiency with [[#eq-comb-ineff]], taking $Q_R = 43\ \mathrm{MJ/kg}$. (Enter $\eta_b$ rounded to three significant figures.)
::: solution
$1 - \eta_b = (10.1 \times 30 + 43 \times 5)/(1000 \times 43) = (303 + 215)/43\,000 = 0.0120$, so $\eta_b = 0.988$. More than one per cent of the fuel's energy leaves unburnt — small in fuel cost at idle, but significant in $\mathrm{CO}$ and hydrocarbon emissions around airports.
:::
:::

::: exercise {level=2 check="5.72"}
By what factor does the rate constant $k = A\exp(-38\,370/T)$ of the reaction $\mathrm{O + N_2 \rightarrow NO + N}$ increase when the flame temperature rises from $2000\ \mathrm{K}$ to $2200\ \mathrm{K}$? (Enter the factor rounded to three significant figures.)
::: solution
$k_{2200}/k_{2000} = \exp[38\,370(1/2000 - 1/2200)] = \exp(1.744) = 5.72$. The oxygen-atom concentration rises too, so the actual $\mathrm{NO}$ formation rate rises even faster.
:::
:::

::: exercise {level=2 check="131"}
Air at $p_3 = 2.5\ \mathrm{MPa}$ and $T_3 = 750\ \mathrm{K}$ flows through dilution holes across a liner pressure drop of $100\ \mathrm{kPa}$. Find the jet velocity, neglecting the annulus velocity. (Enter the velocity in m/s, rounded to three significant figures.)
::: solution
$\rho_3 = 2.5\times10^{6}/(287 \times 750) = 11.61\ \mathrm{kg/m^3}$; $V_j = \sqrt{2 \times 100\,000/11.61} = 131\ \mathrm{m/s}$.
:::
:::

::: exercise {level=2 check="0.48"}
A lean-burn combustor premixes $60\ \%$ of the combustor air with all of the fuel in its main stage at an overall fuel–air ratio of $0.0196$ (pilot off). What equivalence ratio does the main-stage flame burn at? (Use $f_{st} = 0.068$; enter $\Phi$ rounded to two significant figures.)
::: solution
The main stage has fuel–air ratio $0.0196/0.60 = 0.0327$, so $\Phi = 0.0327/0.068 = 0.48$. That is close to the lean blow-out limit, which is why lean-burn combustors keep a pilot stage burning and switch fuel between stages with power.
:::
:::

::: exercise {level=3}
Starting from the steady-flow energy equation, derive [[#eq-far]]. Then show that when $\bar c_p(T_{t4} - T_{\mathrm{ref}}) \ll \eta_bQ_R$ it reduces to $f \approx \bar c_p(T_{t4} - T_{t3})/(\eta_b Q_R)$, estimate the error of this approximation for the conditions of [[#ex-far]], and explain physically what the neglected term represents.
::: solution
The derivation is that of [[#prop-far]]. Expanding, $f = \dfrac{\bar c_p\Delta T}{\eta_bQ_R}\left[1 - \dfrac{\bar c_p(T_{t4} - T_{\mathrm{ref}})}{\eta_bQ_R}\right]^{-1} \approx \dfrac{\bar c_p\Delta T}{\eta_bQ_R}\left[1 + \dfrac{\bar c_p(T_{t4} - T_{\mathrm{ref}})}{\eta_bQ_R}\right]$. For [[#ex-far]], $\bar c_p(T_{t4} - T_{\mathrm{ref}})/(\eta_bQ_R) = 1.497\times10^{6}/4.257\times10^{7} = 0.035$, so the simple formula underestimates $f$ by about $3.5\ \%$ ($0.0216$ against $0.0224$). The neglected term is the energy needed to heat the *fuel's own mass*, once burnt, from the reference temperature to $T_{t4}$: the fuel adds mass to the stream as well as energy, and that extra mass must be heated too.
:::
:::

::: exercise {level=3}
**Design.** Make a preliminary sizing of an annular combustor for an engine with $\dot m_3 = 40\ \mathrm{kg/s}$, $p_3 = 2.8\ \mathrm{MPa}$, $T_3 = 820\ \mathrm{K}$, $T_{t4} = 1700\ \mathrm{K}$, mean diameter $0.60\ \mathrm{m}$, an allowed total-pressure loss of $4\ \%$ and a pressure-loss factor of $40$. Find the fuel flow, the reference area and annulus height, the reference velocity, and the primary-zone air fraction for $\Phi_{\text{pz}} = 1.0$. Discuss what else you would need to check before the design is credible.
::: solution
**Fuel.** $f = 1150 \times 880/(0.99 \times 43\times10^{6} - 1150 \times 1402) = 1.012\times10^{6}/4.096\times10^{7} = 0.0247$, so $\dot m_f = 0.99\ \mathrm{kg/s}$.

**Reference area.** $\Delta p_t = 0.04 \times 2.8 = 0.112\ \mathrm{MPa}$, so $q_{\mathrm{ref}} = 112\,000/40 = 2800\ \mathrm{Pa}$. $\rho_3 = 2.8\times10^{6}/(287 \times 820) = 11.90\ \mathrm{kg/m^3}$, $V_{\mathrm{ref}} = \sqrt{2q_{\mathrm{ref}}/\rho_3} = 21.7\ \mathrm{m/s}$, and $A_{\mathrm{ref}} = \dot m_3/(\rho_3V_{\mathrm{ref}}) = 40/(11.90 \times 21.7) = 0.155\ \mathrm{m^2}$. With mean diameter $0.60\ \mathrm{m}$ the casing height is $0.155/(\pi \times 0.60) = 0.082\ \mathrm{m}$.

**Primary zone.** $\Phi_{\text{overall}} = 0.0247/0.068 = 0.36$, so about $36\ \%$ of the air must enter the primary zone at $\Phi = 1$.

**What else.** Relight and lean blow-out at altitude ($\theta$ at the worst windmilling condition compared with a known combustor); residence time and combustion efficiency at idle; liner cooling-air requirement and wall temperatures; dilution-jet penetration and the radial exit temperature profile (pattern factor) required by the turbine; injector count and spacing (hot streaks); $\mathrm{NO_x}$ against the CAEP limits at this pressure ratio, which may require a lean-burn design instead; and combustion dynamics. Each is a further calculation or test, which is why combustor design remains strongly empirical.
:::
:::
