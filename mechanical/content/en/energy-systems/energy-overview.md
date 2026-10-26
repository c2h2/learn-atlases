Every chapter of this course is about one conversion: chemical energy in a fuel into heat and then shaft work, heat into cold, sunlight into current, wind into rotation. Before analysing any machine we need the bookkeeping that ties them together — the units in which energy is counted, the difference between the energy that leaves the ground and the energy that reaches a radiator or a wheel, the limits that thermodynamics puts on each step, and the way demand varies over a day and a year. None of this is difficult, but almost every mistake in energy engineering, and most of the confusion in public debate about energy, comes from mixing up these quantities: comparing kilowatts with kilowatt-hours, lower with higher heating values, or fuel input with electricity output.

This chapter builds that bookkeeping. It starts with units and heating values, follows energy along a conversion chain from primary source to useful service, quantifies the losses of thermal conversion (the Carnot limit and the more realistic Curzon–Ahlborn efficiency at maximum power), introduces the heat rate that power engineers use instead of efficiency, and ends with how demand is described — load curves, load-duration curves and capacity factors — and how much land a given power demands. It assumes the first and second laws from [[thermodynamics/first-law-open]] and [[thermodynamics/second-law]] and the idea of exergy from [[thermodynamics/exergy]].

## Energy, power and their units {#sec-units}

Energy is an amount; power is a rate. A battery holds energy; an engine delivers power. A household's annual consumption is an energy, its peak demand on a cold evening is a power. The SI units are the joule and the watt, $1\,\mathrm{W} = 1\,\mathrm{J/s}$, but energy statistics use a zoo of other units because each industry grew its own.

::: definition Energy and power units {#def-units}
The SI unit of energy is the **joule** (J); of power, the **watt** ($1\,\mathrm{W} = 1\,\mathrm{J\,s^{-1}}$). Units in common use in energy engineering:

| unit | value in joules | where it is used |
|---|---|---|
| watt-hour, $\mathrm{Wh}$ | $3600\,\mathrm{J}$ | batteries ($\mathrm{Wh}$, $\mathrm{kWh}$) |
| kilowatt-hour, $\mathrm{kWh}$ | $3.6\times10^{6}\,\mathrm{J} = 3.6\,\mathrm{MJ}$ | electricity and gas bills |
| terawatt-hour, $\mathrm{TWh}$ | $3.6\times10^{15}\,\mathrm{J} = 3.6\,\mathrm{PJ}$ | national electricity statistics |
| tonne of oil equivalent, $\mathrm{toe}$ | $41.868\times10^{9}\,\mathrm{J}$ (by definition) | IEA and national energy balances |
| exajoule, $\mathrm{EJ}$ | $10^{18}\,\mathrm{J}$ | world energy statistics |
| British thermal unit, $\mathrm{Btu}$ | $1055.06\,\mathrm{J}$ (international table) | US fuel and heat-rate data |

A **power** multiplied by a time is an energy: a $2\,\mathrm{kW}$ heater running for $3\,\mathrm{h}$ uses $6\,\mathrm{kWh} = 21.6\,\mathrm{MJ}$. An energy divided by a time is an **average power**: $8760\,\mathrm{kWh}$ consumed in a year ($8760\,\mathrm{h}$) is an average of $1\,\mathrm{kW}$.
:::

The kilowatt-hour is a perfectly good SI-compatible unit of energy (it is $3.6\,\mathrm{MJ}$), and it is often the most convenient. The trouble starts with units that look like powers but are energies ("kWh per year" is a power: $1\,\mathrm{kWh/yr} = 0.114\,\mathrm{W}$), or with "kW" written where "kWh" is meant. The cure is to carry units through every line.

A useful mental scale: a person eating $2000\,\mathrm{kcal}$ a day ($8.4\,\mathrm{MJ}$) has an average metabolic power of about $97\,\mathrm{W}$. The average primary energy supply per person in the world in 2025 was about $73\,\mathrm{GJ}$ a year — $600\,\mathrm{EJ}$ (Energy Institute, *Statistical Review of World Energy* 2026) shared among about $8.2$ billion people — an average of $2.3\,\mathrm{kW}$, some twenty-four times the food we eat.

### Heating values

Fuels are rated by the heat released when they burn completely and the products are cooled back to the reference temperature, usually $25\,^\circ\mathrm{C}$ (see [[thermodynamics/mixtures-combustion]]). Fuels containing hydrogen produce water, and whether that water ends up as liquid or vapour makes a difference of 5–10 %.

::: definition Higher and lower heating value {#def-heating-value}
The **higher heating value** (HHV, gross calorific value) of a fuel is the heat released per unit mass (or volume) of fuel burnt completely with the water in the products **condensed to liquid**. The **lower heating value** (LHV, net calorific value) is the same with the water left as **vapour**. If $m_w$ is the mass of water formed per unit mass of fuel and $h_{fg}$ its enthalpy of vaporisation at the reference temperature,
$$
\mathrm{HHV} - \mathrm{LHV} = m_w\, h_{fg}.
$$ {#eq-hhv-lhv}
For methane, $\mathrm{HHV} \approx 55.5\,\mathrm{MJ/kg}$ and $\mathrm{LHV} \approx 50.0\,\mathrm{MJ/kg}$; for coal the difference is smaller because coal contains less hydrogen.
:::

An efficiency is the useful output divided by the fuel energy input, and it changes with the heating value used. European practice and most gas-turbine data quote LHV efficiencies; US utilities and the US Energy Information Administration use HHV. A combined-cycle plant that is $60\,\%$ efficient on LHV is $60 \times 50.0/55.5 = 54\,\%$ efficient on HHV — the same plant, the same fuel bill. Condensing boilers are sometimes advertised as "over 100 % efficient" on an LHV basis precisely because they recover part of the latent heat that LHV leaves out.

::: example A household's energy in consistent units {#ex-household}
A household uses $3500\,\mathrm{kWh}$ of electricity and $12\,000\,\mathrm{kWh}$ of natural gas (on the HHV basis used by gas meters and bills) in a year. Express both in gigajoules, find the average electrical power, and estimate the volume of gas burnt if its HHV is $39\,\mathrm{MJ/m^3}$ at metering conditions.
::: solution
Energies: $3500\,\mathrm{kWh} \times 3.6\,\mathrm{MJ/kWh} = 12\,600\,\mathrm{MJ} = 12.6\,\mathrm{GJ}$ of electricity, and $12\,000 \times 3.6 = 43\,200\,\mathrm{MJ} = 43.2\,\mathrm{GJ}$ of gas.

Average electrical power:
$$
\bar P = \frac{3500\,\mathrm{kWh}}{8760\,\mathrm{h}} = 0.400\,\mathrm{kW} = 400\,\mathrm{W}.
$$
Gas volume: $V = 43\,200\,\mathrm{MJ} / 39\,\mathrm{MJ/m^3} = 1.11\times10^{3}\,\mathrm{m^3}$ a year.

Sanity check: $400\,\mathrm{W}$ is a fridge, some lighting, electronics and occasional cooking — plausible. The gas is three and a half times the electricity in energy, typical of a house heated by a gas boiler in a temperate climate; most of the household's energy is heat, not electricity. Together the two are $55.8\,\mathrm{GJ}$, about $1.8\,\mathrm{kW}$ on average.
:::
:::

## Primary, final and useful energy {#sec-chain}

Energy statistics distinguish three points along every supply chain. Coal in the ground, crude oil at the wellhead, wind in the air and sunlight on a panel are **primary** energy. Electricity at the socket, petrol at the pump and gas at the meter are **final** (or delivered) energy. Heat in the room, motion of the vehicle and light from the lamp are **useful** energy (sometimes called energy services). Between them are conversion steps — refineries, power stations, transmission lines, boilers, engines — each with its efficiency.

::: definition Primary, final and useful energy; conversion efficiency {#def-primary-final}
**Primary energy** is energy in the form first extracted from nature, before any human conversion. **Final energy** is energy delivered to the end user. **Useful energy** is the energy actually delivered as the service wanted (heat, work, light). The **efficiency** of a conversion step $i$ is
$$
\eta_i = \frac{E_{\text{out},i}}{E_{\text{in},i}},
$$
where $E_{\text{out},i}$ is the energy in the form wanted and the rest, $E_{\text{in},i} - E_{\text{out},i}$, is the **loss** of that step (heat rejected, friction, resistive heating). For devices that move heat rather than convert it — heat pumps — the ratio of useful heat to work input exceeds one and is called a **coefficient of performance**, not an efficiency.
:::

::: proposition Efficiency of a conversion chain {#prop-chain}
If energy passes in series through $n$ conversion steps with efficiencies $\eta_1, \dots, \eta_n$, and the whole useful output of each step is the input of the next, the overall efficiency is the product
$$
\eta_{\text{overall}} = \prod_{i=1}^{n} \eta_i ,
$$ {#eq-chain}
and the loss in step $k$, as a fraction of the primary input, is $(1-\eta_k)\prod_{i<k}\eta_i$. The fractional losses and the overall efficiency sum to one.
:::

::: proof
Let $E_0$ be the primary input and $E_k$ the output of step $k$, which is the input of step $k+1$. By definition $E_k = \eta_k E_{k-1}$, so by induction $E_k = E_0 \prod_{i=1}^{k}\eta_i$, and for $k=n$ we get [[#eq-chain]]. The loss in step $k$ is $E_{k-1} - E_k = (1-\eta_k)E_{k-1} = (1-\eta_k)E_0\prod_{i<k}\eta_i$. The sum of the losses telescopes: $\sum_k (E_{k-1} - E_k) = E_0 - E_n$, so losses plus output equal $E_0$ — the first law. The assumptions are that there are no side inputs or outputs (no extra fuel added part-way, no useful by-product such as heat from a cogeneration plant) and that every efficiency is defined on the same energy basis (all LHV or all HHV).
:::

The product rule has a sobering consequence: a chain of five steps each $90\,\%$ efficient is only $0.9^5 = 59\,\%$ efficient overall, and one poor step (a $35\,\%$ heat engine) dominates everything else. That is why the largest single loss in most energy systems is the heat rejected by thermal power stations and engines, and why the chapters on [[energy-systems/steam-power-plants]], [[energy-systems/gas-turbines-combined-cycles]] and [[energy-systems/internal-combustion-engines]] are about raising one number.

A **Sankey diagram** draws the chain as arrows whose widths are proportional to energy flow: a wide arrow of primary energy enters on the left, splits into conversion paths, sheds losses downwards at each step, and emerges as useful energy on the right. National Sankey diagrams (published, for example, by Lawrence Livermore National Laboratory for the United States) typically show that only about a third of primary energy ends up as energy service; the remainder is "rejected energy", most of it low-temperature heat from power stations and vehicle engines.

::: example Well-to-wheel: electric versus petrol car {#ex-ev-chain}
A car needs $0.45\,\mathrm{MJ}$ of work at the wheels per kilometre on a mixed cycle. Compare the primary energy per kilometre of
(a) a battery-electric car charged from a gas-fired combined-cycle plant: plant $\eta = 0.55$ (LHV), transmission and distribution $0.93$, charger $0.90$, battery-inverter-motor-gearbox $0.85$;
(b) a petrol car: crude to fuel in the tank $0.85$ (extraction, refining and distribution), tank to wheel $0.22$ (engine and transmission over the cycle).
Also find the petrol consumption in litres per $100\,\mathrm{km}$, with petrol LHV $32\,\mathrm{MJ/L}$.
::: solution
(a) By [[#prop-chain]],
$$
\eta_{\text{EV}} = 0.55 \times 0.93 \times 0.90 \times 0.85 = 0.391,
$$
so the primary energy per kilometre is $0.45/0.391 = 1.15\,\mathrm{MJ/km}$ of natural gas.

(b) $\eta_{\text{petrol}} = 0.85 \times 0.22 = 0.187$, so $0.45/0.187 = 2.41\,\mathrm{MJ/km}$ of crude oil.

The electric car uses about half as much primary energy even when its electricity comes from fossil gas. The fuel in the petrol car's tank per kilometre is $0.45/0.22 = 2.05\,\mathrm{MJ}$, which is $2.05/32 = 0.0639\,\mathrm{L/km}$, or $6.4\,\mathrm{L/100\,km}$.

Sanity checks: $6.4\,\mathrm{L/100\,km}$ is a typical figure for a mid-sized petrol car, and the electric car's battery energy per kilometre, $0.45/0.85 = 0.53\,\mathrm{MJ} = 0.147\,\mathrm{kWh}$, i.e. about $15\,\mathrm{kWh/100\,km}$, is typical of a mid-sized electric car. The comparison changes with the generation mix: with a $35\,\%$ coal plant instead of the CCGT the chain efficiency falls to $0.249$, still above the petrol car's but with roughly double the carbon per unit of primary energy (see [[energy-systems/energy-economics-emissions]]).
:::
:::

### How much primary energy is a kilowatt-hour of wind?

For fuels, primary energy is the heating value. For electricity generated without fuel — wind, solar, hydro — there is no heating value, and statisticians must choose a convention. Three are in use:

- the **direct-equivalent** method counts $1\,\mathrm{kWh}$ of wind or solar electricity as $1\,\mathrm{kWh}$ ($3.6\,\mathrm{MJ}$) of primary energy;
- the **physical-energy-content** method (IEA, and the Energy Institute's total energy supply from its 2025 edition) does the same for wind, solar and hydro but counts nuclear and geothermal electricity by the heat produced in the reactor or drawn from the ground, about three times the electricity for nuclear (an assumed $33\,\%$ efficiency);
- the **substitution** method counts non-fossil electricity by the fuel a typical thermal plant would have burnt to make it, roughly $2.5$ times the electricity.

::: warning Primary-energy shares depend on the accounting method
"Solar provides X % of world energy" means nothing until the accounting method is stated. Under direct-equivalent or physical-content accounting a kilowatt-hour from a thermal plant counts about $2.5$–$3$ times as much primary energy as a kilowatt-hour from a wind turbine, simply because the thermal plant's rejected heat is counted. Electrifying a service with renewables therefore *reduces* recorded primary energy even if the service is unchanged, and shares of primary energy understate the contribution of wind and solar to electricity. Always compare like with like: electricity with electricity, or primary with primary on one stated method. The same care applies to HHV and LHV: a fuel input on HHV and an efficiency on LHV in one calculation give a wrong answer by 5–10 %.
:::

::: example Reading world energy statistics {#ex-statistics}
The *Statistical Review of World Energy* 2026 (Energy Institute, data for 2025, physical-content method) reports total energy supply of $600\,\mathrm{EJ}$, of which solar is $10.12\,\mathrm{EJ}$ and nuclear $5.2\,\%$; solar provided $8.7\,\%$ and nuclear $8.8\,\%$ of world electricity generation. (a) Deduce the world electricity generation in $\mathrm{TWh}$. (b) Find nuclear electricity in $\mathrm{EJ}$ and compare it with nuclear's primary-energy entry. (c) What would solar's primary-energy entry be under substitution accounting with an assumed thermal efficiency of $40\,\%$?
::: solution
(a) Under the physical-content method solar primary energy equals solar electricity: $10.12\,\mathrm{EJ} / (3.6\times10^{15}\,\mathrm{J/TWh}) = 2811\,\mathrm{TWh}$. This is $8.7\,\%$ of generation, so
$$
E_{\text{el}} = \frac{2811\,\mathrm{TWh}}{0.087} = 3.23\times10^{4}\,\mathrm{TWh}.
$$
(Wind gives the same total: $9.77\,\mathrm{EJ} = 2714\,\mathrm{TWh}$ at $8.4\,\%$ is $3.23\times10^{4}\,\mathrm{TWh}$ — the published shares are consistent.)

(b) Nuclear electricity is $0.088 \times 3.23\times10^{4} = 2843\,\mathrm{TWh} = 10.2\,\mathrm{EJ}$. Its primary-energy entry is $0.052 \times 600 = 31.2\,\mathrm{EJ}$. The ratio, $10.2/31.2 = 0.33$, is the reactor-heat-to-electricity efficiency assumed by the method.

(c) Substitution would count solar as $10.12/0.40 = 25.3\,\mathrm{EJ}$, $4.2\,\%$ of a correspondingly larger total instead of $1.7\,\%$.

Sanity check: nuclear and solar produced nearly the same electricity in 2025 but appear in primary energy as $31.2$ and $10.1\,\mathrm{EJ}$ — exactly the factor of three the warning describes.
:::
:::

## Thermal conversion and its limits {#sec-limits}

Roughly four-fifths of the world's primary energy is still fuel, and most of it is burnt to make heat — some used directly, much converted to work in power stations and engines. The second law sets the ceiling on that conversion. A heat engine receiving heat at absolute temperature $T_H$ and rejecting it at $T_C$ has at most the Carnot efficiency
$$
\eta_{\text{C}} = 1 - \frac{T_C}{T_H}
$$ {#eq-carnot}
([[thermodynamics/second-law]]). For a steam plant with steam at $600\,^\circ\mathrm{C}$ and a condenser at $35\,^\circ\mathrm{C}$, $\eta_\text{C} = 1 - 308/873 = 0.65$; real plants of this kind achieve $0.40$–$0.47$. The gap is not mainly bad engineering. Heat is added over a range of temperatures, not all at the top one; the furnace gases are at $1500\,^\circ\mathrm{C}$ or more and heat flows irreversibly across a large temperature difference into the steam; and a reversible engine produces no power, because reversible heat transfer needs zero temperature difference and therefore infinite area or infinite time.

### Efficiency at maximum power

The last point can be made quantitative. Real engines are designed for power as well as efficiency, so their heat exchangers run with finite temperature differences. The simplest model that captures this is the **endoreversible engine**: a reversible engine whose only irreversibilities are in the heat transfer to and from the reservoirs.

::: proposition Curzon–Ahlborn efficiency at maximum power {#prop-curzon-ahlborn}
A heat engine exchanges heat with a hot reservoir at $T_H$ and a cold reservoir at $T_C$ through thermal conductances $K_H$ and $K_C$ (in $\mathrm{W/K}$), so that $\dot Q_H = K_H (T_H - T_1)$ and $\dot Q_C = K_C (T_2 - T_C)$, where $T_1$ and $T_2$ are the working-fluid temperatures. If the engine is internally reversible, its power output is maximised when
$$
\eta = 1 - \sqrt{\frac{T_C}{T_H}},
$$ {#eq-ca}
independently of $K_H$ and $K_C$, and the maximum power is
$$
\dot W_{\max} = \frac{K_H K_C}{K_H + K_C}\left(\sqrt{T_H} - \sqrt{T_C}\right)^{2}.
$$ {#eq-ca-power}
:::

::: proof
Assume steady operation, linear (Newtonian) heat transfer with constant conductances, and an internally reversible engine between $T_1$ and $T_2$, so the entropy balance of the working fluid gives $\dot Q_H/T_1 = \dot Q_C/T_2$. Write $x = T_2/T_1$; then $\dot Q_C = x\,\dot Q_H$ and the efficiency is $\eta = 1 - x$.

Substituting $T_2 = xT_1$ into the two heat-transfer laws and equating $\dot Q_C = x\dot Q_H$:
$$
K_C (x T_1 - T_C) = x K_H (T_H - T_1)
\quad\Longrightarrow\quad
T_1 = \frac{x K_H T_H + K_C T_C}{x (K_H + K_C)} .
$$
Then
$$
\dot Q_H = K_H (T_H - T_1) = \frac{K_H K_C}{K_H + K_C}\,\frac{x T_H - T_C}{x},
$$
and with $K = K_H K_C/(K_H + K_C)$ the power is
$$
\dot W = (1-x)\dot Q_H = K\,(1 - x)\left(T_H - \frac{T_C}{x}\right) = K\left(T_H + T_C - x T_H - \frac{T_C}{x}\right).
$$
Setting $d\dot W/dx = K\,(-T_H + T_C/x^2) = 0$ gives $x = \sqrt{T_C/T_H}$, and $d^2\dot W/dx^2 = -2KT_C/x^3 < 0$ confirms a maximum. Hence $\eta = 1 - \sqrt{T_C/T_H}$, and substituting back, $\dot W_{\max} = K(T_H + T_C - 2\sqrt{T_H T_C}) = K(\sqrt{T_H} - \sqrt{T_C})^2$.

Limiting cases: $x \to T_C/T_H$ (the Carnot value) makes $\dot W \to 0$ because $T_1 \to T_H$ and $T_2 \to T_C$ and no heat flows; $x \to 1$ makes $\dot W \to 0$ because the engine converts nothing. The optimum lies between, and since $\sqrt{T_C/T_H} > T_C/T_H$, the efficiency at maximum power is always below Carnot.
:::

The result was published by F. L. Curzon and B. Ahlborn in 1975 (it had been found earlier, in 1957, by I. I. Novikov and by P. Chambadal in the context of nuclear power plants). It is a model, not a law: real plants are not endoreversible and are not operated at maximum power, but [[#eq-ca]] lands remarkably close to the efficiencies of many real thermal plants, which suggests why they sit well below Carnot.

::: widget plot
f: 1 - Tc/x; 1 - sqrt(Tc/x)
x: 350, 1900
y: 0, 1
sliders: Tc=300:270:340:5
labels: \eta_{\mathrm{Carnot}}; \eta_{\mathrm{CA}} = 1-\sqrt{T_C/T_H}
caption: Carnot efficiency and the Curzon–Ahlborn efficiency at maximum power against the hot-side temperature $T_H$ (K), for a cold-side temperature $T_C$ set by the slider. Read off $T_H = 873\,\mathrm{K}$ (steam at $600\,^\circ\mathrm{C}$): Carnot gives about $0.65$ and Curzon–Ahlborn about $0.41$, close to a real subcritical steam plant. Then try $T_H = 1700\,\mathrm{K}$ (a gas-turbine inlet): the Curzon–Ahlborn value of about $0.58$ is near what combined cycles achieve. Raise $T_C$ to see why hot summers cost thermal plants output: the loss is larger, in proportion, for low-temperature plants.
:::

::: example How close to Carnot can a coal plant be? {#ex-curzon}
A coal-fired steam plant raises steam at $565\,^\circ\mathrm{C}$ and rejects heat at $25\,^\circ\mathrm{C}$. Compute the Carnot and Curzon–Ahlborn efficiencies and compare them with a typical net efficiency of $36$–$38\,\%$ for subcritical units of this steam temperature.
::: solution
In kelvin, $T_H = 838.15\,\mathrm{K}$ and $T_C = 298.15\,\mathrm{K}$, so $T_C/T_H = 0.3557$.
$$
\eta_\text{C} = 1 - 0.3557 = 0.644, \qquad \eta_\text{CA} = 1 - \sqrt{0.3557} = 1 - 0.5964 = 0.404.
$$
The Curzon–Ahlborn value, $40\,\%$, is within a few points of the observed $36$–$38\,\%$, whereas Carnot overestimates by more than $25$ points. The remaining gap is the boiler loss (flue gas carries away 8–12 % of the fuel energy), turbine inefficiency and the plant's own electricity use.

Sanity check: using degrees Celsius in [[#eq-carnot]] would give $1 - 25/565 = 0.96$ — an absurd answer that is a common mistake; temperatures in thermodynamic formulas must be absolute.
:::
:::

### Heat rate

Power engineers seldom quote efficiency. They quote **heat rate**: the fuel energy needed per unit of electricity, because it multiplies directly into fuel cost and emissions.

::: proposition Heat rate, fuel flow and annual fuel use {#prop-heat-rate}
For a plant of net electrical output $\dot W$ and efficiency $\eta$ (fuel heating value to net electricity), the **heat rate** is
$$
\mathrm{HR} = \frac{\dot Q_\text{fuel}}{\dot W} = \frac{1}{\eta}
\quad\Longrightarrow\quad
\mathrm{HR}\ [\mathrm{kJ/kWh}] = \frac{3600}{\eta},
$$ {#eq-heat-rate}
and the fuel mass flow for a fuel of heating value $\mathrm{HV}$ is $\dot m_f = \dot W\,\mathrm{HR}/\mathrm{HV}$. Over a year at capacity factor $\mathrm{CF}$ the fuel used is $m_f = \dot m_f \times 8760\,\mathrm{h} \times \mathrm{CF}$.
:::

::: proof
By definition $\eta = \dot W/\dot Q_\text{fuel}$, so $\dot Q_\text{fuel}/\dot W = 1/\eta$, a dimensionless ratio. Expressing the electricity in kWh and the heat in kJ multiplies the ratio by $3600\,\mathrm{kJ/kWh}$. The fuel energy rate is $\dot Q_\text{fuel} = \dot m_f\,\mathrm{HV}$, giving $\dot m_f = \dot W\,\mathrm{HR}/\mathrm{HV}$. Annual energy produced is $\dot W \times 8760\,\mathrm{h} \times \mathrm{CF}$ (definition of capacity factor, [[#def-capacity-factor]]), and since heat rate is assumed constant, fuel scales in the same way. In reality heat rate rises at part load, so annual fuel computed with full-load heat rate is an underestimate for a plant that cycles.
:::

In US practice heat rate is in $\mathrm{Btu/kWh}$: $\mathrm{HR} = 3412.14/\eta$, so a $33\,\%$ plant has a heat rate of about $10\,300\,\mathrm{Btu/kWh}$.

::: example Fuel train for a coal-fired unit {#ex-heat-rate}
A $400\,\mathrm{MW}$ (net) coal-fired unit has a net efficiency of $40\,\%$ on LHV and burns coal with $\mathrm{LHV} = 25\,\mathrm{MJ/kg}$. Find the heat rate, the coal flow at full load, and the annual coal consumption at a capacity factor of $0.60$.
::: solution
Heat rate from [[#eq-heat-rate]]: $\mathrm{HR} = 3600/0.40 = 9000\,\mathrm{kJ/kWh}$.

Fuel energy rate: $\dot Q = 400\,\mathrm{MW}/0.40 = 1000\,\mathrm{MW}$. Coal flow:
$$
\dot m_f = \frac{1000\times10^{3}\,\mathrm{kJ/s}}{25\times10^{3}\,\mathrm{kJ/kg}} = 40\,\mathrm{kg/s} = 144\,\mathrm{t/h}.
$$
Annual consumption: $40\,\mathrm{kg/s} \times 3600\,\mathrm{s/h} \times 8760\,\mathrm{h} \times 0.60 = 7.57\times10^{8}\,\mathrm{kg} = 0.76\,\mathrm{Mt}$.

Sanity check: at around $100\,\mathrm{t}$ per rail wagon, $144\,\mathrm{t/h}$ is a wagon every 40 minutes, around the clock — the reason coal plants are sited on railways, rivers or at mines. The rejected heat, $1000 - 400 = 600\,\mathrm{MW}$, is the scale of the cooling problem treated in [[energy-systems/steam-power-plants]].
:::
:::

## Demand: load curves and capacity factor {#sec-demand}

Electricity cannot be stored cheaply in large amounts (that is the subject of [[energy-systems/energy-storage]]), so supply must follow demand second by second. Demand varies over the day (low at night, peaks in the morning and evening), over the week and over the year (heating in winter, air conditioning in summer). Plotted against time it is the **load curve**. Rearranged in decreasing order of magnitude — the highest hour first — the same 8760 hourly values form the **load-duration curve**, which says for how many hours a year the load exceeds any given level.

::: definition Capacity factor, load factor and the load-duration curve {#def-capacity-factor}
The **capacity factor** of a generating unit of rated power $P_r$ that produces energy $E$ in a period $T$ is
$$
\mathrm{CF} = \frac{E}{P_r T}.
$$
The **load factor** of a system is its average load divided by its peak load. The **load-duration curve** $L(t)$, $0 \le t \le T$, is the load sorted in decreasing order, so that $L(t)$ is the level exceeded for a total time $t$ in the period. Typical capacity factors (they vary strongly by site and market): nuclear 0.8–0.9, onshore wind 0.25–0.40, solar PV 0.10–0.25, peaking gas turbines below 0.1.
:::

::: proposition Energy served by a band of the load-duration curve {#prop-ldc}
Let the load-duration curve $L(t)$ be served by plants stacked in bands, a plant serving the band between load levels $a$ and $b$ ($a < b$) whenever the load exceeds $a$. The energy it supplies in the period is the area of that band under the curve,
$$
E_{ab} = \int_0^T \min\bigl(b - a,\ \max(0,\ L(t) - a)\bigr)\,dt ,
$$
and its capacity factor is $\mathrm{CF}_{ab} = E_{ab}/[(b-a)T]$. Bands low on the curve (base load) have capacity factors near one; bands near the peak have capacity factors near zero.
:::

::: proof
At any instant the load $L$ is shared so that the plant in band $[a, b]$ supplies nothing if $L \le a$, all of $L - a$ if $a < L < b$, and its full $b - a$ if $L \ge b$; that is $\min(b-a, \max(0, L-a))$. Energy is the time integral of power, and because the integrand depends on time only through the value of $L$, the integral is unchanged by sorting the hours, so it may be taken over the load-duration curve rather than the chronological load curve. The capacity factor follows from [[#def-capacity-factor]] with $P_r = b - a$. Since $L(t)$ is non-increasing, the band is fully loaded for $t < t_b$ (where $L = b$) and partly loaded up to $t_a$ (where $L = a$), so $\mathrm{CF}_{ab}$ lies between $t_b/T$ and $t_a/T$: high for low bands, low for high bands.
:::

This is the economic logic of a generating fleet: plants with high capital cost and low running cost (nuclear, large coal, and in practice wind and solar, which run whenever their resource allows) belong at the bottom of the curve where their capital is used most hours; plants with low capital cost and high fuel cost (open-cycle gas turbines, engines) belong at the top, where they run a few hundred hours a year. The chapter on [[energy-systems/energy-economics-emissions]] puts numbers on this trade-off.

::: widget plot
f: m + (1-m)*(1-x)^n; min(b, m + (1-m)*(1-x)^n)
x: 0, 1
y: 0, 1.05
sliders: m=0.4:0.1:0.9:0.05; n=2:0.5:6:0.5; b=0.5:0.05:1:0.05
labels: L(t)/L_{\mathrm{peak}}; \text{base band } 0 \le L \le b
caption: A model load-duration curve $L/L_\text{peak} = m + (1-m)(1-t/T)^n$ against the fraction of the year $t/T$; $m$ is the minimum load and $n$ sets how "peaky" demand is. The second curve is the part served by base-load plant of capacity $b$ (in units of the peak). The area under the first curve is the system load factor, $m + (1-m)/(n+1)$. Set $b$ just above $m$: the base plant is flat-out all year (capacity factor near one). Raise $b$ towards $1$ and watch the band above $b \approx 0.8$ become a thin sliver used for a few per cent of the year — the market for peaking plant. Increase $n$ to make the peak sharper and see how little energy the top 20 % of capacity supplies.
:::

::: example Base and peak plant on a model load-duration curve {#ex-ldc}
A system's load-duration curve is modelled as $L(t)/L_\text{peak} = 0.4 + 0.6(1 - t/T)^2$ with $L_\text{peak} = 10\,\mathrm{GW}$. Find (a) the system load factor and annual energy; (b) the capacity factor of the plant serving the band from $0$ to $5\,\mathrm{GW}$; (c) the capacity factor of peaking plant serving $8$ to $10\,\mathrm{GW}$.
::: solution
Write $s = t/T$ and $\ell(s) = 0.4 + 0.6(1-s)^2$.

(a) Load factor $= \int_0^1 \ell\,ds = 0.4 + 0.6/3 = 0.600$. Annual energy $= 0.600 \times 10\,\mathrm{GW} \times 8760\,\mathrm{h} = 52.6\,\mathrm{TWh}$.

(b) Band $[0, 0.5]$ (per unit). The load exceeds $0.5$ while $0.6(1-s)^2 > 0.1$, i.e. for $s < s_b = 1 - \sqrt{1/6} = 0.592$. After that the band carries all of $\ell$. So
$$
\int_0^1 \min(0.5, \ell)\,ds = 0.5\,s_b + \int_{s_b}^{1}\left[0.4 + 0.6(1-s)^2\right] ds = 0.5(0.592) + 0.4(0.408) + 0.2(0.408)^3 = 0.473,
$$
and $\mathrm{CF} = 0.473/0.5 = 0.946$.

(c) Band $[0.8, 1]$: the load exceeds $0.8$ while $(1-s)^2 > 2/3$, i.e. $s < 1 - \sqrt{2/3} = 0.1835$. The energy is $\int_0^{0.1835}[0.6(1-s)^2 - 0.4]\,ds = 0.2[1 - (0.8165)^3] - 0.4(0.1835) = 0.0177$, so $\mathrm{CF} = 0.0177/0.2 = 0.089$.

Sanity check: the base half of capacity delivers $0.473/0.600 = 79\,\%$ of the energy, while the top fifth of capacity delivers $3\,\%$ of it and runs at full output for only about $780$ hours a year — typical of real systems.
:::
:::

## Power density and the scale of renewable supply {#sec-density}

Fuels concentrate energy: a $1\,\mathrm{GW}$ coal plant and its stockyard occupy a square kilometre or two. Renewable flows are diffuse, and the useful measure is **power per unit land area**, averaged over the year. Solar radiation at the ground averages roughly $100$–$250\,\mathrm{W/m^2}$ depending on latitude and climate ([[energy-systems/solar-energy]]); after conversion efficiency and spacing between panel rows, a solar farm delivers of order $5$–$15\,\mathrm{W}$ of average electrical power per square metre of land. MacKay (2009) estimated, for British conditions, about $2\,\mathrm{W/m^2}$ for wind farms, $5\,\mathrm{W/m^2}$ for solar farms and $0.5\,\mathrm{W/m^2}$ for energy crops. Wind farms are sparse because turbines must be spaced several rotor diameters apart to avoid each other's wakes, but the land between them remains usable.

::: example Land for a solar-powered city {#ex-land}
A city of one million people uses electricity at an average rate of $0.5\,\mathrm{kW}$ per person. If it were supplied on average by solar farms delivering $10\,\mathrm{W}$ of average electrical power per square metre of land (a sunny site), how much land is needed? Compare with the city's own area, taking a population density of $4000$ people per square kilometre.
::: solution
Average demand $\bar P = 10^6 \times 0.5\,\mathrm{kW} = 500\,\mathrm{MW}$. Land:
$$
A = \frac{500\times10^{6}\,\mathrm{W}}{10\,\mathrm{W/m^2}} = 5.0\times10^{7}\,\mathrm{m^2} = 50\,\mathrm{km^2}.
$$
City area: $10^6/4000 = 250\,\mathrm{km^2}$. The solar farms would need land equal to a fifth of the city's own area.

Sanity check and caveat: this matches only the *average*; solar output is zero at night and low in winter, so the system also needs storage or other generation ([[energy-systems/energy-storage]]). At $2\,\mathrm{W/m^2}$ (wind in Britain) the area would be $250\,\mathrm{km^2}$, the size of the city.
:::
:::

::: quiz
A $1.0\,\mathrm{GW}$ nuclear plant runs at a capacity factor of $0.90$ with a thermal efficiency of $33\,\%$. Which statement is correct?
- [ ] It generates $0.90\,\mathrm{GW}$ of energy per year.
- [x] It generates about $7.9\,\mathrm{TWh}$ of electricity per year and, on physical-content accounting, about $24\,\mathrm{TWh}$ of primary energy.
- [ ] Its heat rate is $3600 \times 0.33 = 1188\,\mathrm{kJ/kWh}$.
- [ ] Its primary energy is $7.9\,\mathrm{TWh}$ on every accounting method.
::: solution
Energy $= 1.0\,\mathrm{GW} \times 8760\,\mathrm{h} \times 0.90 = 7884\,\mathrm{GWh} \approx 7.9\,\mathrm{TWh}$; primary energy (reactor heat) is $7.9/0.33 \approx 24\,\mathrm{TWh}$. "GW per year" mixes a power with a time and is not an energy. Heat rate is $3600/\eta = 10\,900\,\mathrm{kJ/kWh}$, not $3600\eta$. The direct-equivalent method would count $7.9\,\mathrm{TWh}$, the physical-content method about $24\,\mathrm{TWh}$ — methods differ.
:::
:::

::: history
The units of this chapter are younger than the machines they measure. James Watt rated his engines in horsepower; the **watt** as a unit of power was proposed by William Siemens in his presidential address to the British Association in August 1882, and the **joule** was adopted alongside it by the second International Electrical Congress in Paris in 1889. In 1865 the economist William Stanley **Jevons** published *The Coal Question*, arguing that Britain's coal would not last and — the observation now called the Jevons paradox — that more efficient steam engines had *increased* coal consumption by making coal-powered work cheaper. Efficiency at maximum power was analysed by I. I. **Novikov** and by P. **Chambadal** in 1957 for nuclear power stations, and rediscovered by F. L. **Curzon** and B. **Ahlborn** in their 1975 paper "Efficiency of a Carnot engine at maximum power output" in the *American Journal of Physics*, which started the field now called finite-time thermodynamics.
:::

::: summary
- Energy (J, kWh, toe, EJ) is an amount; power (W) is a rate. $1\,\mathrm{kWh} = 3.6\,\mathrm{MJ}$, $1\,\mathrm{toe} = 41.868\,\mathrm{GJ}$; average power is energy divided by time.
- HHV includes the latent heat of the water in the products, LHV does not; state which one every efficiency uses (methane $55.5$ versus $50.0\,\mathrm{MJ/kg}$).
- Primary → final → useful energy: the overall efficiency of a chain is the product of the step efficiencies, so the worst step — usually a heat engine — dominates.
- Primary-energy accounting for non-fuel electricity is a convention (direct-equivalent, physical-content, substitution); shares depend on it.
- Carnot $1 - T_C/T_H$ bounds thermal conversion; the Curzon–Ahlborn efficiency at maximum power, $1 - \sqrt{T_C/T_H}$, is a closer guide to real plants.
- Heat rate $= 3600/\eta$ kJ/kWh converts efficiency into fuel per unit of electricity; fuel flow is $\dot W\,\mathrm{HR}/\mathrm{HV}$.
- Capacity factor $= E/(P_r T)$; the load-duration curve shows why base-load bands run nearly all year and peak bands a few hundred hours.
- Renewable flows have low power density (a few W/m² of land), so land area and variability, not resource size, are their constraints.
:::

## Exercises {#sec-exercises}

::: exercise The tonne of oil equivalent {#exr-toe level=1 check="11630"}
Express $1\,\mathrm{toe}$ in kilowatt-hours. (Enter the value in kWh as a whole number.)
::: solution
$1\,\mathrm{toe} = 41.868\times10^{9}\,\mathrm{J}$ and $1\,\mathrm{kWh} = 3.6\times10^{6}\,\mathrm{J}$, so
$$
1\,\mathrm{toe} = \frac{41.868\times10^{9}}{3.6\times10^{6}}\,\mathrm{kWh} = 11\,630\,\mathrm{kWh}.
$$
Burnt in a power station at $40\,\%$ efficiency, a tonne of oil equivalent gives only about $4650\,\mathrm{kWh}$ of electricity.
:::
:::

::: exercise Heat rate of a combined cycle {#exr-heat-rate level=1 check="6207"}
A combined-cycle plant has a net efficiency of $58\,\%$ (LHV). What is its heat rate? (Enter the heat rate in kJ/kWh, rounded to the nearest whole number.)
::: solution
By [[#eq-heat-rate]], $\mathrm{HR} = 3600/0.58 = 6206.9\,\mathrm{kJ/kWh}$, which rounds to $6207\,\mathrm{kJ/kWh}$. In US units, $3412.14/0.58 = 5883\,\mathrm{Btu/kWh}$ on the same LHV basis (US data would normally be on HHV and so about $11\,\%$ higher).
:::
:::

::: exercise Capacity factor of a wind turbine {#exr-cf level=1 check="30"}
A $2.0\,\mathrm{MW}$ wind turbine delivers $5256\,\mathrm{MWh}$ in a (non-leap) year. What is its capacity factor? (Enter the capacity factor in per cent.)
::: solution
$$
\mathrm{CF} = \frac{5256\,\mathrm{MWh}}{2.0\,\mathrm{MW} \times 8760\,\mathrm{h}} = \frac{5256}{17\,520} = 0.300 = 30\,\%.
$$
This does not mean the turbine runs 30 % of the time; it runs most of the time at part output (see [[energy-systems/wind-hydro]]).
:::
:::

::: exercise Heat pump or gas boiler? {#exr-heat-pump level=2 check="1.64"}
A house can be heated either by a gas boiler of efficiency $0.90$, or by an electric heat pump with a seasonal coefficient of performance of $3.2$ supplied from a combined-cycle plant of efficiency $0.55$ through a grid with $7\,\%$ losses. Using [[#prop-chain]], how much heat reaches the house per unit of gas energy burnt in the heat-pump route? (Enter the ratio of heat delivered to gas energy, to two decimal places.)
::: solution
The chain is gas → electricity ($0.55$) → delivered electricity ($0.93$) → heat ($\mathrm{COP} = 3.2$):
$$
\frac{Q_\text{house}}{E_\text{gas}} = 0.55 \times 0.93 \times 3.2 = 1.6368 \approx 1.64.
$$
The boiler delivers $0.90$, so the heat-pump route gives $1.64/0.90 = 1.82$ times as much heat from the same gas. The COP is not an efficiency — it exceeds one because the heat pump moves ambient heat — which is why [[#prop-chain]] still applies but the "efficiency" of the chain exceeds one ([[energy-systems/refrigeration-hvac]]).
:::
:::

::: exercise HHV minus LHV for methane {#exr-hhv level=2 check="5.5"}
Methane burns as $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$. Using $M_{\mathrm{CH_4}} = 16.04\,\mathrm{kg/kmol}$, $M_{\mathrm{H_2O}} = 18.02\,\mathrm{kg/kmol}$ and $h_{fg} = 2442\,\mathrm{kJ/kg}$ for water at $25\,^\circ\mathrm{C}$, find the difference between the higher and lower heating values. (Enter $\mathrm{HHV} - \mathrm{LHV}$ in MJ/kg to one decimal place.)
::: solution
Water formed per kilogram of methane: $m_w = 2 \times 18.02/16.04 = 2.247\,\mathrm{kg/kg}$. By [[#eq-hhv-lhv]],
$$
\mathrm{HHV} - \mathrm{LHV} = 2.247 \times 2442\,\mathrm{kJ/kg} = 5487\,\mathrm{kJ/kg} \approx 5.5\,\mathrm{MJ/kg}.
$$
Check: $55.5 - 50.0 = 5.5\,\mathrm{MJ/kg}$, in agreement with tabulated heating values. The difference is about $10\,\%$ of the HHV for methane, the most hydrogen-rich hydrocarbon.
:::
:::

::: exercise Base-load band on a load-duration curve {#exr-ldc level=2 check="95"}
For the load-duration curve of [[#ex-ldc]], $\ell(s) = 0.4 + 0.6(1-s)^2$, find the capacity factor of the plant serving the band from $0$ to $0.5$ of the peak, using [[#prop-ldc]]. Then explain, without calculation, why the band from $0$ to $0.4$ has a capacity factor of exactly one. (Enter the capacity factor of the $0$–$0.5$ band in per cent, rounded to the nearest whole number.)
::: solution
From [[#ex-ldc]](b), the band energy is $0.5 s_b + 0.4(1 - s_b) + 0.2(1 - s_b)^3$ with $s_b = 1 - \sqrt{1/6} = 0.5918$: $0.2959 + 0.1633 + 0.0136 = 0.4728$. The capacity factor is $0.4728/0.5 = 0.946$, i.e. $95\,\%$.

The band from $0$ to $0.4$ lies entirely below the minimum load $\ell(1) = 0.4$, so it is fully loaded at every instant and $\mathrm{CF} = 1$ (in practice, outages for maintenance lower it to $0.85$–$0.95$).
:::
:::

::: exercise Efficiency at maximum power of a geothermal plant {#exr-geo level=2 check="18.2"}
A geothermal plant draws heat from brine at $180\,^\circ\mathrm{C}$ and rejects it at $30\,^\circ\mathrm{C}$. Find its Curzon–Ahlborn efficiency at maximum power. (Enter the efficiency in per cent to one decimal place.)
::: solution
$T_H = 453.15\,\mathrm{K}$, $T_C = 303.15\,\mathrm{K}$, $T_C/T_H = 0.6690$. By [[#eq-ca]],
$$
\eta_\text{CA} = 1 - \sqrt{0.6690} = 1 - 0.8179 = 0.182 = 18.2\,\%.
$$
Carnot would give $33.1\,\%$. Binary geothermal plants of this temperature typically achieve around 10–15 % net — low-temperature heat is poor-quality energy, as its exergy shows ([[thermodynamics/exergy]]).
:::
:::

::: exercise Carbon intensity of the world's fossil energy {#exr-world-co2 level=3 check="69.4"}
In 2025 energy-related CO₂ emissions were $35\,806\,\mathrm{Mt}$, total energy supply was $600\,\mathrm{EJ}$, and fossil fuels were $86\,\%$ of it (Energy Institute, 2026). (a) Find the average emission per gigajoule of fossil energy supplied. (b) Typical combustion emission factors are about $56\,\mathrm{kg/GJ}$ for natural gas, $73\,\mathrm{kg/GJ}$ for oil products and $95\,\mathrm{kg/GJ}$ for coal (IPCC 2006 defaults, LHV basis). What does your answer say about the fossil mix? (Enter the result of (a) in kg CO₂ per GJ, to three significant figures.)
::: solution
(a) Fossil supply $= 0.86 \times 600\,\mathrm{EJ} = 516\,\mathrm{EJ} = 5.16\times10^{11}\,\mathrm{GJ}$. Emissions $= 35\,806\times10^{9}\,\mathrm{kg}$. Average:
$$
\frac{3.5806\times10^{13}\,\mathrm{kg}}{5.16\times10^{11}\,\mathrm{GJ}} = 69.4\,\mathrm{kg/GJ}.
$$
(b) $69.4\,\mathrm{kg/GJ}$ lies between gas and oil and well below coal, consistent with a mix of oil, coal and gas in comparable proportions, once one allows for fossil fuel used as chemical feedstock (which is counted in supply but not all emitted) and for the statistical basis. Dividing by the whole supply instead gives $59.7\,\mathrm{kg/GJ}$ — the carbon-free part dilutes the average.
:::
:::

::: exercise Derivation: maximum power of an endoreversible engine {#exr-ca-derive level=3}
(a) Starting from the model of [[#prop-curzon-ahlborn]], show that the working-fluid temperatures at maximum power are $T_1 = \sqrt{T_H}\,\bigl(\sqrt{T_H}K_H + \sqrt{T_C}K_C\bigr)/(K_H + K_C)$ and $T_2 = \sqrt{T_C/T_H}\,T_1$.
(b) For a fixed total conductance $K_H + K_C = K_\text{tot}$ (a fixed budget of heat-exchanger area), show that the maximum power is greatest when $K_H = K_C$, and find that power for $T_H = 900\,\mathrm{K}$, $T_C = 300\,\mathrm{K}$ and $K_\text{tot} = 20\,\mathrm{MW/K}$.
::: solution
(a) From the proof, $T_1 = (xK_HT_H + K_CT_C)/[x(K_H+K_C)]$ with $x = \sqrt{T_C/T_H}$. Then $K_CT_C/x = K_C\sqrt{T_CT_H}$, so
$$
T_1 = \frac{K_H T_H + K_C\sqrt{T_C T_H}}{K_H + K_C} = \sqrt{T_H}\,\frac{K_H\sqrt{T_H} + K_C\sqrt{T_C}}{K_H + K_C},
$$
and $T_2 = xT_1$ by definition of $x$.

(b) $\dot W_{\max} = K(\sqrt{T_H} - \sqrt{T_C})^2$ with $K = K_HK_C/(K_H+K_C)$. With $K_H + K_C = K_\text{tot}$ fixed, $K_HK_C = K_H(K_\text{tot} - K_H)$ is largest at $K_H = K_\text{tot}/2$, where $K = K_\text{tot}/4$. Numbers: $\sqrt{900} - \sqrt{300} = 30 - 17.32 = 12.68\,\mathrm{K^{1/2}}$, squared $160.8\,\mathrm{K}$, so
$$
\dot W_{\max} = \frac{20\,\mathrm{MW/K}}{4} \times 160.8\,\mathrm{K} = 804\,\mathrm{MW},
$$
at efficiency $1 - \sqrt{1/3} = 42.3\,\%$. The equal split is a property of this symmetric model; real plants spend more area where heat-transfer coefficients are low.
:::
:::

::: exercise Design: energy supply for an island {#exr-island level=3}
An island of $20\,000$ people currently burns diesel in engine-generators for all its electricity: average demand $8\,\mathrm{MW}$, peak $14\,\mathrm{MW}$, generator efficiency $40\,\%$, diesel LHV $43\,\mathrm{MJ/kg}$. Estimate the present annual diesel consumption. Then sketch a supply system that halves diesel use, choosing among wind (capacity factor about $0.35$), solar PV (about $0.18$) and batteries, and state the capacities, the land or sea area (use the power densities of [[#sec-density]]) and the main risks. There is no single answer; justify your choices with numbers.
::: solution
Present fuel: annual electricity $8\,\mathrm{MW} \times 8760\,\mathrm{h} = 70.1\,\mathrm{GWh}$; fuel energy $70.1/0.40 = 175\,\mathrm{GWh} = 631\,\mathrm{TJ}$; diesel $631\times10^{12}/43\times10^{6} = 1.47\times10^{7}\,\mathrm{kg} \approx 14.7\,\mathrm{kt}$ a year, roughly $17\,\mathrm{ML}$.

To halve it, renewables must supply about $35\,\mathrm{GWh}$ of *useful* electricity a year. One possible design: $8\,\mathrm{MW}$ of wind ($8 \times 8760 \times 0.35 = 24.5\,\mathrm{GWh}$) plus $8\,\mathrm{MW}$ of PV ($12.6\,\mathrm{GWh}$), total $37\,\mathrm{GWh}$ before curtailment. Because the wind and sun sometimes exceed demand, part would be curtailed unless stored; a battery of around $10\,\mathrm{MW}$ / $20$–$40\,\mathrm{MWh}$ shifts midday solar into the evening peak and gives the diesel sets time to start ([[energy-systems/energy-storage]]). Land: at $2\,\mathrm{W/m^2}$ average, the wind farm's $2.8\,\mathrm{MW}$ average needs about $1.4\,\mathrm{km^2}$ of spaced turbines (mostly still farmable); PV at about $7\,\mathrm{W/m^2}$ average needs about $0.2\,\mathrm{km^2}$.

Risks to discuss: calm, cloudy weeks (the diesel fleet must still cover the full $14\,\mathrm{MW}$ peak, so diesel *capacity* is not reduced, only its energy); grid stability with low inertia; salt corrosion and cyclone loads; diesel engines running more at part load with a higher heat rate, which erodes the saving. A good answer checks the energy balance month by month rather than annually.
:::
:::
