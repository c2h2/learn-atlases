An electricity grid must balance supply and demand every second, yet the cheapest new sources — wind and sunshine — arrive when the weather decides, and demand peaks when people come home in the evening. Storage decouples the two. It also does jobs that have nothing to do with renewables: it lets a car carry its energy, keeps a data centre running for the seconds before a generator starts, and lets a solar-thermal plant generate after sunset. Every storage technology does the same three things — takes energy in, holds it, gives it back — and each loses some at every step.

This chapter treats storage as an energy-systems engineer must: first by the numbers that characterise any store (energy, power, duration, round-trip efficiency, life), then by the physics of each family — gravitational (pumped hydro), pressure (compressed air), kinetic (flywheels), thermal, electrochemical (batteries) and chemical (hydrogen). For each we derive the energy content from first principles, because the derivation shows what limits it: the head of a reservoir, the temperature rise of compressed air, the strength of a rotor, the cell voltage and the mass of the reactants. The comparison at the end is about matching the store to the duty, not about a winner.

## Describing a store {#sec-metrics}

::: definition Storage metrics {#def-metrics}
For a storage system:
- **energy capacity** $E$ (kWh, MWh) — the energy that can be delivered from full to empty under rated conditions;
- **power capacity** $P$ (kW, MW) — the maximum rate of delivery (and, separately, of charging);
- **duration** $t_d = E/P$ — how long it can deliver rated power;
- **round-trip efficiency** $\eta_{rt} = E_\text{out}/E_\text{in}$ — energy delivered per unit of energy taken in over a full cycle, measured at the grid connection;
- **depth of discharge** (DoD) — the fraction of nominal capacity used in a cycle; **state of charge** (SoC) — the fraction remaining;
- **cycle life** — the number of cycles to a defined end of life (often $80\,\%$ of initial capacity) at a stated DoD;
- **specific energy** (Wh/kg) and **energy density** (Wh/L), which matter for vehicles and portable equipment, and much less for grid stores;
- **self-discharge** — the fractional loss per unit time while idle.
:::

Power and energy are independent design choices for most technologies. A pumped-hydro plant's power is set by its turbines and its energy by its reservoirs; a battery's power by its inverters and cell chemistry and its energy by the number of cells. "A 100 MW battery" says nothing about whether it lasts ten minutes or ten hours: always quote both, as in $100\,\mathrm{MW}/400\,\mathrm{MWh}$.

::: proposition Round-trip efficiency of a store with internal resistance {#prop-rte}
If charging and discharging have efficiencies $\eta_c$ and $\eta_d$ and the store loses no energy while idle, $\eta_{rt} = \eta_c\eta_d$. For an electrochemical cell modelled as an ideal source of open-circuit voltage $V_0$ in series with a resistance $R$, charged and discharged at the same current $I$ for the same charge,
$$
\eta_{rt} = \frac{V_0 - IR}{V_0 + IR},
$$ {#eq-rte-r}
which falls as the current rises. Self-discharge at a fractional rate $1/\tau$ multiplies the stored energy by $e^{-t/\tau}$ over an idle time $t$.
:::

::: proof
The energy entering the store is $E_\text{in}$; a fraction $\eta_c$ is stored; a fraction $\eta_d$ of that is delivered, so $E_\text{out} = \eta_d\eta_c E_\text{in}$. For the cell: during charging the terminal voltage must exceed the open-circuit voltage by the resistive drop, $V_\text{ch} = V_0 + IR$; during discharge it is $V_\text{dis} = V_0 - IR$. Moving the same charge $q = It$ in and out, $E_\text{in} = (V_0 + IR)q$ and $E_\text{out} = (V_0 - IR)q$, giving [[#eq-rte-r]]. (We assume $V_0$ constant over the cycle and the same charge returned, i.e. a coulombic efficiency of one.) For self-discharge, $dE/dt = -E/\tau$ integrates to $E(t) = E(0)e^{-t/\tau}$. Limiting case: $I \to 0$ gives $\eta_{rt} \to 1$ — a slow cycle wastes nothing in the resistance, the electrochemical analogue of a quasi-static process.
:::

::: widget plot
f: (V0 - x*R/1000)/(V0 + x*R/1000)
x: 0, 300
y: 0.7, 1
sliders: V0=3.3:2:4.2:0.05; R=1:0.2:5:0.1
labels: \eta_{rt}
caption: Round-trip efficiency of a cell with open-circuit voltage $V_0$ (V) and internal resistance $R$ (mΩ) against the current $x$ (A), from [[#eq-rte-r]]. For a $100\,\mathrm{Ah}$ cell the horizontal axis runs from rest to a $3C$ rate. Halve the resistance and watch the curve flatten: low resistance is why power-rated cells are built with thin electrodes. Note that a battery operated gently (well below $1C$) loses only a few per cent in its cells; the rest of a grid battery's $10$–$15\,\%$ round-trip loss is in the inverter, transformer and auxiliary cooling.
:::

## Pumped hydro {#sec-pumped-hydro}

Pumped-storage hydropower pumps water from a lower to an upper reservoir when electricity is cheap or plentiful and runs it back through turbines when it is needed. The same reversible pump-turbine usually does both. It is mature, lasts for many decades and has historically supplied the great majority of the world's grid storage capacity.

::: proposition Energy stored in an upper reservoir {#prop-pumped}
A volume $V$ of water of density $\rho$ lifted to an upper reservoir whose centre of mass is a mean net head $\bar H$ above the turbine releases, on discharge with generating efficiency $\eta_d$ (turbine, generator and waterway losses),
$$
E = \eta_d\,\rho g V \bar H .
$$ {#eq-pumped}
Charging it requires $\rho gV\bar H/\eta_c$, so $\eta_{rt} = \eta_c\eta_d$. Per cubic metre of water and per metre of head the stored energy is $\rho g = 9.81\,\mathrm{kJ/(m^3\,m)} = 2.73\,\mathrm{Wh/(m^3\,m)}$.
:::

::: proof
The potential energy of a fluid element of mass $dm$ at height $z$ above the turbine is $g z\,dm$; integrating over the stored water gives $gM z_G = \rho g V z_G$, where $z_G$ is the height of its centre of mass. The water does not all fall from the same height — the top layer falls furthest — so the *mean* head $\bar H = z_G$ (less the mean tailwater level and waterway losses, which are folded into the net head) is the correct multiplier. Steady-flow energy conservation through the turbine ([[energy-systems/wind-hydro]]) then gives the shaft work, and the efficiencies convert between hydraulic and electrical energy. With $\rho = 1000\,\mathrm{kg/m^3}$, $\rho g = 9810\,\mathrm{J/(m^3\,m)}$, i.e. $2.725\,\mathrm{Wh}$.
:::

The low energy density — $0.82\,\mathrm{kWh}$ per cubic metre at $300\,\mathrm{m}$ head — is why pumped storage needs mountains: a high head makes the reservoirs small.

::: example Sizing a pumped-storage scheme {#ex-pumped}
A pumped-storage plant is to deliver $1.0\,\mathrm{GWh}$ (for example $250\,\mathrm{MW}$ for $4\,\mathrm{h}$) with a mean net head of $300\,\mathrm{m}$. Generating efficiency is $0.90$ and pumping efficiency $0.88$. Find (a) the volume of water cycled; (b) the area of an upper reservoir with a $20\,\mathrm{m}$ drawdown; (c) the energy needed to recharge and the round-trip efficiency; (d) the flow in generating mode at $250\,\mathrm{MW}$.
::: solution
(a) From [[#eq-pumped]],
$$
V = \frac{E}{\eta_d\rho g\bar H} = \frac{1.0\times10^{9}\times3600\,\mathrm{J}}{0.90 \times 1000 \times 9.81 \times 300} = 1.36\times10^{6}\,\mathrm{m^3}.
$$
(b) Area $= 1.36\times10^{6}/20 = 6.8\times10^{4}\,\mathrm{m^2} = 6.8\,\mathrm{ha}$ — a reservoir roughly $260\,\mathrm{m}$ square.

(c) Lifting the water needs $\rho gV\bar H/\eta_c = (1.0/0.90)/0.88 = 1.26\,\mathrm{GWh}$. Round trip: $\eta_{rt} = 0.90 \times 0.88 = 0.79$.

(d) $Q = P/(\eta_d\rho g\bar H) = 250\times10^{6}/(0.90 \times 9810 \times 300) = 94\,\mathrm{m^3/s}$.

Sanity check: the volume equals $94\,\mathrm{m^3/s}$ for $4\,\mathrm{h}$ ($14\,400\,\mathrm{s}$) — $1.36\times10^{6}\,\mathrm{m^3}$, as in (a). At $30\,\mathrm{m}$ head the same scheme would need ten times the water and ten times the reservoir area, which is why low-head pumped storage is rarely economic.
:::
:::

## Compressed air {#sec-caes}

Compressed-air energy storage (CAES) compresses air into an underground cavern — usually one leached out of a salt dome — and later expands it through a turbine. The central difficulty is heat. Compressing air heats it, and the heat is lost if the air is cooled before storage; expanding cools it, and cold air does little work. The thermodynamics of the compression decides the efficiency.

::: proposition Isothermal and adiabatic compression work {#prop-compression}
The minimum (reversible) work to compress unit mass of an ideal gas with gas constant $R$ from $p_1, T_1$ to pressure $p_2$ in a steady-flow compressor is
$$
w_\text{iso} = RT_1\ln\frac{p_2}{p_1} \quad \text{(isothermal)}, \qquad
w_\text{ad} = c_pT_1\left[\left(\frac{p_2}{p_1}\right)^{(k-1)/k} - 1\right] \quad \text{(reversible adiabatic)},
$$ {#eq-compression}
with outlet temperature $T_2 = T_1(p_2/p_1)^{(k-1)/k}$ in the adiabatic case. For any pressure ratio above one, $w_\text{ad} > w_\text{iso}$; the difference leaves the compressor as sensible heat in the hot air.
:::

::: proof
For reversible steady flow with negligible kinetic and potential energy changes, the work input per unit mass is $w = \int_1^2 v\,dp$ (from the first law $dh = \delta q + v\,dp$ and, for a reversible process, $\delta q = T\,ds$ with $dh = T\,ds + v\,dp$). Isothermal ideal gas: $v = RT_1/p$, so $w = RT_1\int dp/p = RT_1\ln(p_2/p_1)$; the heat $RT_1\ln(p_2/p_1)$ is rejected to the surroundings, and the enthalpy of the outlet air equals that of the inlet. Reversible adiabatic: $pv^k$ is constant, the work equals the enthalpy rise $c_p(T_2 - T_1)$, and $T_2/T_1 = (p_2/p_1)^{(k-1)/k}$, giving the second form. To show $w_\text{ad} > w_\text{iso}$, set $x = \ln(p_2/p_1) > 0$ and $c_p = Rk/(k-1)$: then $w_\text{ad}/(RT_1) = \tfrac{k}{k-1}\bigl(e^{x(k-1)/k} - 1\bigr) > \tfrac{k}{k-1}\cdot x\tfrac{k-1}{k} = x$, using $e^y - 1 > y$ for $y > 0$.
:::

::: widget plot
f: 0.287*T1*ln(x); 0.287*T1*(k/(k-1))*(x^((k-1)/k) - 1)
x: 1, 100
y: 0, 900
sliders: T1=293:250:320:1; k=1.4:1.3:1.67:0.01
labels: w_{\mathrm{iso}}\ (\mathrm{kJ/kg}); w_{\mathrm{ad}}\ (\mathrm{kJ/kg})
caption: Reversible compression work per kilogram of air against pressure ratio $p_2/p_1$, isothermal and adiabatic, from [[#eq-compression]]. At the $50$–$70$ bar of a salt cavern the adiabatic work is about double the isothermal work: that extra energy is heat at several hundred degrees. A diabatic plant throws it away and burns gas to reheat the air on expansion; an adiabatic plant stores the heat and gives it back. Raise $k$ to $1.67$ (a monatomic gas) and the gap widens.
:::

::: example Compression to cavern pressure {#ex-caes}
Air at $1.0\,\mathrm{bar}$ and $20\,^\circ\mathrm{C}$ is compressed to $70\,\mathrm{bar}$. With $R = 0.287\,\mathrm{kJ/(kg\,K)}$, $c_p = 1.005\,\mathrm{kJ/(kg\,K)}$ and $k = 1.4$, compute (a) the isothermal work; (b) the single-stage reversible adiabatic work and outlet temperature. (c) Interpret the difference for a CAES plant.
::: solution
(a) $w_\text{iso} = 0.287 \times 293.15 \times \ln 70 = 84.13 \times 4.248 = 357\,\mathrm{kJ/kg}$.

(b) $(70)^{0.2857} = 3.366$, so $T_2 = 293.15 \times 3.366 = 987\,\mathrm{K}$ ($714\,^\circ\mathrm{C}$) and $w_\text{ad} = 1.005 \times 293.15 \times 2.366 = 697\,\mathrm{kJ/kg}$.

(c) No real compressor delivers air at $714\,^\circ\mathrm{C}$; the machines are built in stages with intercoolers, approaching isothermal compression. In a **diabatic** plant the intercooler heat is rejected, the air is stored near ambient temperature and, on discharge, natural gas is burnt to reheat it before the expansion turbine; the plant is part store, part gas turbine whose compressor has been run in advance. The two commercial plants, Huntorf in Germany (1978) and McIntosh in Alabama (1991, which adds an exhaust-heat recuperator), work this way. An **adiabatic** CAES plant instead stores the heat of compression in a thermal store and returns it to the air before expansion, removing the need for fuel; its round-trip efficiency is limited by the heat store and machine losses.

Sanity check: in the adiabatic case all the work stays in the air as enthalpy, $c_p(T_2 - T_1) = 1.005 \times 694 = 697\,\mathrm{kJ/kg}$; in the isothermal case the outlet enthalpy equals the inlet enthalpy and all $357\,\mathrm{kJ/kg}$ leaves as heat at ambient temperature. Storing the air hot keeps the extra $340\,\mathrm{kJ/kg}$ available for expansion — if the cavern could hold it.
:::
:::

## Flywheels {#sec-flywheels}

A flywheel stores kinetic energy $E = \tfrac12 I\omega^2$ in a spinning rotor. It can charge and discharge in seconds, survives millions of cycles and is used for power quality, uninterruptible power supplies and frequency response — duties where power and cycle life matter more than duration. What limits its energy is the strength of the rotor: centrifugal stress rises with the square of rim speed.

::: proposition Specific energy of a flywheel {#prop-flywheel}
A thin rim (a ring whose radial thickness is small compared with its radius) of density $\rho$ rotating with rim speed $v$ carries a hoop stress $\sigma = \rho v^2$. Its kinetic energy per unit mass is therefore
$$
e = \frac{E}{m} = \tfrac12 v^2 = \frac{\sigma}{2\rho},
$$ {#eq-flywheel}
so the maximum specific energy is set by the ratio of allowable stress to density. For other rotor shapes $e = K\sigma/\rho$ with a shape factor $K$ ($K = 1/2$ for a thin rim, about $0.6$ for a flat disc of constant thickness, $1$ for an ideal constant-stress disc).
:::

::: proof
Take a thin ring of radius $r$, cross-sectional area $A$, rotating at $\omega$, so $v = \omega r$. Cut it along a diameter and consider one half. Each element of length $r\,d\theta$ has mass $\rho Ar\,d\theta$ and needs a centripetal force $\rho Ar\,d\theta\,\omega^2 r$ directed towards the centre; the component of this along the axis of symmetry of the half-ring, integrated from $0$ to $\pi$, is $\rho A\omega^2r^2\int_0^\pi \sin\theta\,d\theta = 2\rho A v^2$. This must be supplied by the tension $\sigma A$ at the two cut faces, $2\sigma A$. Hence $\sigma = \rho v^2$. All the mass moves at speed $v$, so $E = \tfrac12 mv^2$ and $e = \tfrac12 v^2 = \sigma/(2\rho)$. Mass and radius have cancelled: at the strength limit, a flywheel's specific energy depends only on the material, not on its size.
:::

The result explains why high-performance flywheels use carbon-fibre composites. High-strength steel ($\sigma \approx 1\,\mathrm{GPa}$, $\rho = 7850\,\mathrm{kg/m^3}$) gives at most $\sigma/2\rho = 64\,\mathrm{kJ/kg}$ ($18\,\mathrm{Wh/kg}$) in a thin rim; a carbon-fibre rim ($\sigma \approx 1.5\,\mathrm{GPa}$ in the fibre direction, $\rho \approx 1600\,\mathrm{kg/m^3}$) gives $470\,\mathrm{kJ/kg}$ ($130\,\mathrm{Wh/kg}$) before any safety factor. Practical systems are far below these values once safety factors, the hub, bearings, vacuum housing and containment are included. A burst rotor releases its energy almost instantly, so containment is the dominant safety requirement; work on rotating machinery is done only with proper guarding and training.

::: example A steel flywheel for a UPS {#ex-flywheel}
A thin steel rim of mass $500\,\mathrm{kg}$ and mean radius $0.50\,\mathrm{m}$ is designed for a working hoop stress of $600\,\mathrm{MPa}$ ($\rho = 7850\,\mathrm{kg/m^3}$). Find the maximum rim speed, the rotational speed in rpm, and the stored energy. For how long could it supply $200\,\mathrm{kW}$ if it may be slowed to half speed?
::: solution
Rim speed: $v = \sqrt{\sigma/\rho} = \sqrt{600\times10^{6}/7850} = 276\,\mathrm{m/s}$. Rotational speed: $\omega = v/r = 553\,\mathrm{rad/s}$, i.e. $553 \times 60/2\pi = 5280\,\mathrm{rpm}$.

Energy at full speed: $E = \tfrac12 mv^2 = 0.5 \times 500 \times 276.5^2 = 1.91\times10^{7}\,\mathrm{J} = 5.3\,\mathrm{kWh}$.

Slowing to half speed releases $1 - (1/2)^2 = 3/4$ of it: $1.43\times10^{7}\,\mathrm{J}$, enough for $1.43\times10^{7}/2\times10^{5} = 72\,\mathrm{s}$ at $200\,\mathrm{kW}$ (before conversion losses).

Sanity check: about a minute of ride-through at a few hundred kilowatts is exactly the role of flywheel UPS units — bridging until a standby diesel starts. The specific energy, $5.3\,\mathrm{kWh}/500\,\mathrm{kg} = 10.6\,\mathrm{Wh/kg}$, is far below a battery's, but the flywheel will do this hundreds of thousands of times.
:::
:::

## Thermal storage {#sec-thermal}

Storing heat is cheap when heat is what is wanted, or when the heat will drive a power cycle. **Sensible** stores raise the temperature of a material: water (up to $100\,^\circ\mathrm{C}$ unpressurised), rock, concrete or molten salt; the stored energy is $Q = mc\Delta T$. **Latent** stores melt a phase-change material — ice for building cooling ($334\,\mathrm{kJ/kg}$, about $93\,\mathrm{kWh}$ of cooling per tonne), salts and paraffins at higher temperatures — and give a large capacity over a narrow temperature range.

Concentrating solar power plants use a mixture of about $60\,\%$ sodium nitrate and $40\,\%$ potassium nitrate by mass ("solar salt"), held between about $290\,^\circ\mathrm{C}$ in a cold tank and $565\,^\circ\mathrm{C}$ in a hot tank, with specific heat near $1.5\,\mathrm{kJ/(kg\,K)}$. The lower limit is set by the salt's freezing point (about $220$–$240\,^\circ\mathrm{C}$, with a margin), the upper by thermal decomposition of the nitrate.

::: example Molten-salt storage for a solar tower {#ex-salt}
A $100\,\mathrm{MW_e}$ solar tower plant is to run for $8\,\mathrm{h}$ after sunset from storage. Its steam cycle is $40\,\%$ efficient. Using $c_p = 1.5\,\mathrm{kJ/(kg\,K)}$ and tanks at $290$ and $565\,^\circ\mathrm{C}$, find the mass of salt.
::: solution
Electrical energy: $100\,\mathrm{MW} \times 8\,\mathrm{h} = 800\,\mathrm{MWh_e}$; heat required $= 800/0.40 = 2000\,\mathrm{MWh_{th}} = 7.2\times10^{12}\,\mathrm{J}$.

Heat stored per kilogram: $c_p\Delta T = 1.5 \times 275 = 412.5\,\mathrm{kJ/kg}$. Mass:
$$
m = \frac{7.2\times10^{12}\,\mathrm{J}}{412.5\times10^{3}\,\mathrm{J/kg}} = 1.75\times10^{7}\,\mathrm{kg} \approx 17\,500\,\mathrm{t}.
$$
Sanity check: with a density near $1800\,\mathrm{kg/m^3}$ this is about $9700\,\mathrm{m^3}$ — a tank about $35\,\mathrm{m}$ across and $10\,\mathrm{m}$ deep, which is the scale of real CSP salt tanks. Thermal storage is round-trip efficient as heat (losses of a few per cent a day through insulation) but stores heat, not electricity: the $40\,\%$ cycle efficiency applies to the stored heat just as it would to heat from the receiver.
:::
:::

## Batteries {#sec-batteries}

A battery stores energy as chemical potential: the cell reaction's Gibbs free energy appears as a voltage between two electrodes, and the electrolyte lets ions — but not electrons — pass between them, so the electrons must take the external circuit.

::: proposition Cell voltage and theoretical specific energy {#prop-cell}
For a cell reaction that transfers $n$ moles of electrons per mole of reaction with Gibbs free energy change $\Delta G$, the reversible cell voltage is
$$
E = -\frac{\Delta G}{nF},
$$ {#eq-cell}
with $F = 96\,485\,\mathrm{C/mol}$. The **theoretical specific energy** of the couple, counting only the masses $\sum M_i$ (per mole of reaction) of the reactants, is
$$
e_\text{th} = \frac{nFE}{\sum M_i}.
$$
A cell's charge capacity in ampere-hours times its average voltage is its energy: $E_\text{cell}\,[\mathrm{Wh}] = C\,[\mathrm{Ah}] \times \bar V\,[\mathrm{V}]$.
:::

::: proof
For a reversible process at constant temperature and pressure, the maximum non-expansion work obtainable from a reaction equals $-\Delta G$. In a cell this work is electrical: moving charge $nF$ (coulombs per mole of reaction) through potential difference $E$ does work $nFE$. Equating gives [[#eq-cell]]. Dividing $nFE$ by the mass of the reactants consumed per mole of reaction gives the energy per unit reactant mass, an upper bound because a real cell also contains electrolyte, separator, current collectors, casing and excess active material. Finally, energy is $\int V\,dq$; with $q$ in ampere-hours ($3600\,\mathrm{C}$) and $V$ averaged, $E = C\bar V$ in watt-hours.
:::

::: example The theoretical limit of the lead–acid battery {#ex-lead-acid}
The lead–acid cell reaction is $\mathrm{Pb + PbO_2 + 2\,H_2SO_4 \rightarrow 2\,PbSO_4 + 2\,H_2O}$, with $n = 2$ and $E = 2.04\,\mathrm{V}$. Using molar masses $207.2$ (Pb), $239.2$ ($\mathrm{PbO_2}$) and $98.08\,\mathrm{g/mol}$ ($\mathrm{H_2SO_4}$), find the theoretical specific energy, and compare it with practical lead–acid batteries at $30$–$40\,\mathrm{Wh/kg}$.
::: solution
Reactant mass per mole of reaction: $207.2 + 239.2 + 2 \times 98.08 = 642.6\,\mathrm{g}$. Energy per mole: $nFE = 2 \times 96\,485 \times 2.04 = 3.937\times10^{5}\,\mathrm{J}$. So
$$
e_\text{th} = \frac{3.937\times10^{5}\,\mathrm{J}}{0.6426\,\mathrm{kg}} = 6.13\times10^{5}\,\mathrm{J/kg} = 170\,\mathrm{Wh/kg}.
$$
Practical batteries achieve about a fifth of this: the sulphuric acid is dilute (most of the electrolyte mass is water), not all the active material can be used without damaging the plates, and the lead grids, case and terminals add mass but no energy.

Sanity check: lithium-ion chemistries have higher voltages (about $3.2$–$3.7\,\mathrm{V}$) and light reactants, giving theoretical values of several hundred Wh/kg and practical cells of $150$–$300\,\mathrm{Wh/kg}$ — consistent with the same ratio of practical to theoretical.
:::
:::

The **C-rate** expresses current relative to capacity: a $100\,\mathrm{Ah}$ cell discharged at $1C$ delivers $100\,\mathrm{A}$ for about an hour, at $0.25C$ $25\,\mathrm{A}$ for about four hours. Grid batteries are mostly designed for $0.25$–$1C$ (one- to four-hour duration), power-tool and racing batteries for $10C$ or more. The table gives indicative cell-level figures for the main chemistries; they change quickly with technology and should be checked against current data sheets.

| chemistry | cell voltage (V) | specific energy, cell (Wh/kg) | cycle life (to 80 %) | notes |
|---|---|---|---|---|
| lead–acid | 2.0 | 30–40 | several hundred to about 1500, depending on DoD | cheap, recyclable, heavy; standby and starter batteries |
| Li-ion NMC (nickel–manganese–cobalt oxide cathode) | about 3.6–3.7 | about 200–300 | about 1000–3000 | highest energy; most electric cars |
| Li-ion LFP (lithium iron phosphate cathode) | about 3.2–3.3 | about 150–200 | several thousand | safer, cheaper, no cobalt or nickel; most new grid storage |

Cost has fallen faster than anything else in energy: BloombergNEF's annual survey reported an average lithium-ion pack price of $\$108$ per kWh in 2025, $8\,\%$ lower than in 2024. Grid systems cost more per kWh than packs because of inverters, enclosures, fire protection and grid connection.

::: warning Energy, power, and the wrong efficiency
Three errors recur in storage calculations. (1) Confusing power and energy: a $50\,\mathrm{MW}$ battery with $1\,\mathrm{h}$ duration cannot cover a $10\,\mathrm{MW}$ load for ten hours if it is $50\,\mathrm{MWh}$ *nominal* but only $90\,\%$ usable and $88\,\%$ round-trip efficient — the usable energy delivered is less than the nameplate. (2) Applying the round-trip efficiency twice, or applying it to the delivered energy rather than the energy taken in: $E_\text{out} = \eta_{rt}E_\text{in}$. (3) Comparing a "round-trip efficiency" that stops at the DC terminals with one measured at the grid connection, or a hydrogen efficiency on LHV with one on HHV. State the boundary and the basis.
:::

## Hydrogen and other chemical storage {#sec-hydrogen}

Electricity can be stored as a fuel: electrolysis splits water into hydrogen and oxygen, the hydrogen is compressed or liquefied and stored, and later a fuel cell or a turbine turns it back into electricity. The energy content is large — $39.4\,\mathrm{kWh/kg}$ (HHV) or $33.3\,\mathrm{kWh/kg}$ (LHV) — and hydrogen can be stored for months in salt caverns, so it is a candidate for the *seasonal* storage that batteries cannot economically provide. The price is a low round-trip efficiency, because every conversion loses energy.

::: example Round trip through hydrogen {#ex-hydrogen}
An electrolyser uses $52\,\mathrm{kWh}$ of electricity per kilogram of hydrogen; compression to storage pressure takes a further $3\,\mathrm{kWh/kg}$; a fuel cell converts the hydrogen at $55\,\%$ of its LHV. Find the electrolyser efficiency on HHV and the round-trip efficiency.
::: solution
Electrolyser: $39.4/52 = 0.758$, i.e. $76\,\%$ on HHV ($64\,\%$ on LHV). Electricity out per kilogram: $0.55 \times 33.3 = 18.3\,\mathrm{kWh}$. Electricity in: $52 + 3 = 55\,\mathrm{kWh}$. Round trip:
$$
\eta_{rt} = \frac{18.3}{55} = 0.333.
$$
Sanity check: one third is typical of power-to-hydrogen-to-power chains, against $0.8$–$0.9$ for batteries and pumped hydro. Two thirds of the input becomes heat; if that heat can be used (district heating near the electrolyser, or a combined-cycle plant burning the hydrogen), the system efficiency improves. Hydrogen makes sense for storage only where its cheap long-duration storage matters more than its losses.
:::
:::

## Choosing a store {#sec-choosing}

The technologies separate most clearly by duration, i.e. by the ratio of energy to power at which each is cheapest:

| duration | duty | technologies |
|---|---|---|
| seconds to minutes | frequency response, power quality, ride-through | flywheels, supercapacitors, batteries |
| about 1–4 hours | daily shifting of solar to evening, peak capacity | lithium-ion batteries, pumped hydro |
| about 4–24 hours | daily cycles with high energy, overnight wind | pumped hydro, CAES, thermal storage with CSP, flow batteries |
| days to seasons | windless weeks, winter heating | hydrogen and other fuels, large thermal stores, hydro reservoirs |

Cost per kWh of capacity dominates long-duration storage (a store that cycles a few times a year must have very cheap energy capacity); cost per kW and efficiency dominate short, frequent cycling. Efficiency matters most where cycles are frequent; cycle life matters most where cycles are deep and daily. The economic comparison — levelised cost of storage, the value of arbitrage and of capacity — uses the tools of [[energy-systems/energy-economics-emissions]].

::: quiz
A grid battery rated $100\,\mathrm{MW}/400\,\mathrm{MWh}$ has $88\,\%$ round-trip efficiency measured at the grid connection. It is charged from empty to full. Which statement is correct?
- [ ] It can deliver $400\,\mathrm{MWh}$ and needs $400\,\mathrm{MWh}$ to recharge.
- [ ] It can deliver $100\,\mathrm{MW}$ for $4.4\,\mathrm{h}$.
- [x] It delivers $400\,\mathrm{MWh}$ (if the rating is usable energy) and takes about $455\,\mathrm{MWh}$ from the grid to recharge.
- [ ] It delivers $352\,\mathrm{MWh}$ and takes $400\,\mathrm{MWh}$ to recharge, because the efficiency applies to the output.
::: solution
With the rating defined as deliverable energy, $E_\text{in} = E_\text{out}/\eta_{rt} = 400/0.88 = 455\,\mathrm{MWh}$. The duration at rated power is $400/100 = 4\,\mathrm{h}$. The last option applies the efficiency to the wrong quantity unless the rating is defined as charge energy — which is why the rating basis must be stated.
:::
:::

::: history
Alessandro **Volta** described his pile of zinc and copper discs separated by brine-soaked cloth in a letter to the Royal Society in 1800 — the first electrochemical cell. Gaston **Planté** demonstrated the rechargeable lead–acid cell in 1859–60, and its descendants still start most cars. Pumped-storage hydropower came into use in Switzerland and Italy around the turn of the twentieth century and spread widely once reversible pump-turbines appeared in the 1930s. The first compressed-air storage plant, at Huntorf in Germany, entered service in 1978 with about $290\,\mathrm{MW}$ and two salt caverns, followed in 1991 by the $110\,\mathrm{MW}$ McIntosh plant in Alabama, which can generate for about 26 hours. Sony brought the first commercial lithium-ion cell to market in 1991, building on the intercalation cathodes and carbon anodes developed by M. Stanley **Whittingham**, John B. **Goodenough** and Akira **Yoshino**, who shared the 2019 Nobel Prize in Chemistry for the lithium-ion battery.
:::

::: summary
- Characterise a store by energy (MWh), power (MW), duration $E/P$, round-trip efficiency, depth of discharge, cycle life and, for mobile uses, specific energy.
- $\eta_{rt} = \eta_c\eta_d$; for a cell with resistance $R$, $\eta_{rt} = (V_0 - IR)/(V_0 + IR)$, so fast cycling costs efficiency.
- Pumped hydro stores $\rho gV\bar H$ ($2.73\,\mathrm{Wh}$ per m³ per metre of head) with $\eta_{rt}$ of about $0.75$–$0.8$; high head keeps reservoirs small.
- Compression heats air: isothermal work $RT\ln(p_2/p_1)$ is about half the adiabatic work at cavern pressures; diabatic CAES burns fuel to replace the lost heat, adiabatic CAES stores it.
- A flywheel's specific energy is $K\sigma/\rho$, independent of size — strength-to-density ratio is everything.
- Sensible heat $mc\Delta T$ and latent heat stores are cheap for heat and for CSP plants.
- Cell energy comes from $\Delta G = -nFE$; practical batteries reach a fraction of the theoretical specific energy. Lithium-ion pack prices averaged $\$108$/kWh in 2025 (BNEF).
- Hydrogen offers cheap, long-duration energy capacity at a round-trip efficiency near one third.
- Match technology to duration: seconds (flywheels), hours (batteries, pumped hydro), days and seasons (hydrogen, thermal, reservoirs).
:::

## Exercises {#sec-exercises}

::: exercise Duration of a grid battery {#exr-duration level=1 check="4"}
A battery is rated $100\,\mathrm{MW}$ and $400\,\mathrm{MWh}$. How long can it deliver rated power? (Enter the duration in hours.)
::: solution
$t_d = E/P = 400\,\mathrm{MWh}/100\,\mathrm{MW} = 4\,\mathrm{h}$.
:::
:::

::: exercise Ampere-hours of an electric-car pack {#exr-ah level=1 check="187.5"}
An electric car has a $75\,\mathrm{kWh}$ battery pack with a nominal voltage of $400\,\mathrm{V}$. What is its charge capacity? (Enter the capacity in Ah.)
::: solution
By [[#prop-cell]], $C = E/\bar V = 75\,000\,\mathrm{Wh}/400\,\mathrm{V} = 187.5\,\mathrm{Ah}$. Charging at $150\,\mathrm{kW}$ means about $375\,\mathrm{A}$, a rate of $2C$.
:::
:::

::: exercise Energy in an upper reservoir {#exr-reservoir level=1 check="1960"}
An upper reservoir holds $2.0\times10^{6}\,\mathrm{m^3}$ of usable water at a mean net head of $400\,\mathrm{m}$. The generating efficiency is $0.90$. Take $\rho = 1000\,\mathrm{kg/m^3}$ and $g = 9.81\,\mathrm{m/s^2}$. How much electricity can it deliver? (Enter the energy in MWh to three significant figures.)
::: solution
By [[#eq-pumped]], $E = 0.90 \times 1000 \times 9.81 \times 2.0\times10^{6} \times 400 = 7.063\times10^{12}\,\mathrm{J}$. Dividing by $3.6\times10^{9}\,\mathrm{J/MWh}$ gives $1962\,\mathrm{MWh}$, i.e. $1960\,\mathrm{MWh}$ to three significant figures — about $2\,\mathrm{GWh}$.
:::
:::

::: exercise Resistive loss in a cell {#exr-resistance level=2 check="94.1"}
A lithium-iron-phosphate cell has an open-circuit voltage of $3.3\,\mathrm{V}$ and an internal resistance of $1.0\,\mathrm{m\Omega}$. Using [[#eq-rte-r]], find its round-trip efficiency when cycled at $100\,\mathrm{A}$. (Enter the efficiency in per cent to one decimal place.)
::: solution
$IR = 100 \times 0.001 = 0.10\,\mathrm{V}$. $\eta_{rt} = (3.3 - 0.1)/(3.3 + 0.1) = 3.2/3.4 = 0.9412$, i.e. $94.1\,\%$. At $50\,\mathrm{A}$ it would be $97.0\,\%$: halving the current roughly halves the resistive loss.
:::
:::

::: exercise Steel flywheel specific energy {#exr-flywheel level=2 check="10.6"}
A thin steel rim ($\rho = 7850\,\mathrm{kg/m^3}$) is designed for a working hoop stress of $600\,\mathrm{MPa}$. Using [[#eq-flywheel]], find its specific energy. (Enter the specific energy in Wh/kg to three significant figures.)
::: solution
$e = \sigma/(2\rho) = 600\times10^{6}/(2 \times 7850) = 3.822\times10^{4}\,\mathrm{J/kg}$; dividing by $3600\,\mathrm{J/Wh}$ gives $10.6\,\mathrm{Wh/kg}$ — consistent with [[#ex-flywheel]].
:::
:::

::: exercise Salt for a smaller tower {#exr-salt level=2 check="6550"}
A $50\,\mathrm{MW_e}$ solar tower needs $6\,\mathrm{h}$ of storage. The power cycle is $40\,\%$ efficient; the salt has $c_p = 1.5\,\mathrm{kJ/(kg\,K)}$ and cycles between $290$ and $565\,^\circ\mathrm{C}$. What mass of salt is needed? (Enter the mass in tonnes to three significant figures.)
::: solution
Heat: $50 \times 6/0.40 = 750\,\mathrm{MWh_{th}} = 2.70\times10^{12}\,\mathrm{J}$. Per kilogram: $1.5 \times 275 = 412.5\,\mathrm{kJ}$. Mass: $2.70\times10^{12}/4.125\times10^{5} = 6.545\times10^{6}\,\mathrm{kg}$, i.e. $6550\,\mathrm{t}$.
:::
:::

::: exercise Isothermal compression work {#exr-iso level=2 check="329"}
Air ($R = 0.287\,\mathrm{kJ/(kg\,K)}$) at $1.0\,\mathrm{bar}$ and $20\,^\circ\mathrm{C}$ is compressed isothermally and reversibly to $50\,\mathrm{bar}$. Find the work per kilogram. (Enter the work in kJ/kg to three significant figures.)
::: solution
$w = RT\ln(p_2/p_1) = 0.287 \times 293.15 \times \ln 50 = 84.13 \times 3.912 = 329\,\mathrm{kJ/kg}$. The same compression done adiabatically in one stage would need $1.005 \times 293.15 \times (50^{0.2857} - 1) = 606\,\mathrm{kJ/kg}$.
:::
:::

::: exercise Derivation: the exergy of a compressed-air cavern {#exr-exergy level=3 check="1.90"}
(a) A rigid cavern of volume $V$ holds air (ideal gas) at pressure $p$ and ambient temperature $T_0$; the surroundings are at $p_0, T_0$. Show that the maximum work obtainable by letting the air reach equilibrium with the surroundings (its exergy, [[thermodynamics/exergy]]) is
$$
X = pV\left[\ln\frac{p}{p_0} - 1 + \frac{p_0}{p}\right].
$$
(b) Evaluate it for $V = 3.0\times10^{5}\,\mathrm{m^3}$, $p = 70\,\mathrm{bar}$, $p_0 = 1.0\,\mathrm{bar}$. (Enter $X$ in GWh to three significant figures.)
::: solution
(a) The closed-system exergy is $X = (U - U_0) + p_0(V_\text{gas} - V_0) - T_0(S - S_0)$, where the subscript 0 denotes the same mass $m$ at $p_0, T_0$. For an ideal gas at the same temperature $U = U_0$; $S - S_0 = -mR\ln(p/p_0)$; and the volume the gas would occupy at ambient conditions is $V_0 = Vp/p_0$. So
$$
X = p_0\left(V - \frac{pV}{p_0}\right) + T_0 mR\ln\frac{p}{p_0} = pV\ln\frac{p}{p_0} - (p - p_0)V,
$$
using $mRT_0 = pV$. Factoring $pV$ gives the result. It is the isothermal expansion work $pV\ln(p/p_0)$ less the work $p_0(V_0 - V) = (p - p_0)V$ that the expanding gas must spend pushing back the atmosphere.

(b) $pV = 7.0\times10^{6} \times 3.0\times10^{5} = 2.1\times10^{12}\,\mathrm{J}$; bracket $= \ln 70 - 1 + 1/70 = 4.2485 - 1 + 0.0143 = 3.2628$. $X = 6.852\times10^{12}\,\mathrm{J} = 1.90\,\mathrm{GWh}$. A real plant cycles the cavern between two pressures (to keep it stable and the turbine inlet pressure workable) and uses only part of this.
:::
:::

::: exercise Hydrogen round trip with a turbine {#exr-h2 level=3 check="27.2"}
Repeat [[#ex-hydrogen]] but convert the hydrogen back to electricity in a combined-cycle gas turbine with an efficiency of $45\,\%$ on LHV, and assume the electrolyser needs $55\,\mathrm{kWh/kg}$ (including compression). Find the round-trip efficiency. (Enter it in per cent to one decimal place.)
::: solution
Electricity out per kilogram: $0.45 \times 33.3 = 14.985\,\mathrm{kWh}$. Round trip: $14.985/55 = 0.2725$, i.e. $27.2\,\%$. Large hydrogen turbines would typically be used for rare, long, low-wind periods, where efficiency matters less than the very low cost of storing the hydrogen in caverns for months.
:::
:::

::: exercise Design: firming a solar farm {#exr-design level=3}
A $50\,\mathrm{MW}$ solar farm produces, on a clear summer day, roughly a half-sine of output from 06:00 to 20:00 peaking at $45\,\mathrm{MW}$. The grid operator wants a firm $20\,\mathrm{MW}$ from 18:00 to 23:00 every day. Specify a storage system: technology, power, energy, depth of discharge and expected cycle life; estimate how much solar energy must be diverted to charge it; and say what happens on a cloudy winter day. Use numbers throughout. There is no single answer.
::: solution
One reasoned answer. Energy required from storage: from 18:00 to 20:00 the solar output itself is falling (a half-sine of 14 h gives $45\sin(\pi \times 12/14) = 19.5\,\mathrm{MW}$ at 18:00 and $0$ at 20:00), so storage must top up during 18–20 and supply all $20\,\mathrm{MW}$ from 20 to 23. A careful estimate: about $20 \times 3 = 60\,\mathrm{MWh}$ after 20:00 plus roughly $20$ during 18–20, so about $80\,\mathrm{MWh}$ delivered. With $90\,\%$ usable depth of discharge, specify about $90\,\mathrm{MWh}$ nominal and $20$–$25\,\mathrm{MW}$ of inverter power: a four-hour LFP battery suits ($20\,\mathrm{MW}/90\,\mathrm{MWh}$ at the grid connection). Charging energy at $88\,\%$ round trip: $80/0.88 = 91\,\mathrm{MWh}$ of solar, about a fifth of the day's output of $\int 45\sin(\pi t/14)\,dt = 45 \times 28/\pi = 401\,\mathrm{MWh}$. One cycle a day for 15 years is about $5500$ cycles — within the range of LFP at this depth, but a replacement or augmentation of cells after 10–15 years should be budgeted. On a cloudy winter day the farm might produce $100\,\mathrm{MWh}$ or less; charging the battery would leave little for daytime export, and the firm evening product might not be deliverable without grid charging or a backup plant. Pumped hydro would suit only if a site with head existed nearby; hydrogen would be far too inefficient for daily cycling.
:::
:::
