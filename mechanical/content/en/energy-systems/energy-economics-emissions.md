The earlier chapters of this course compared energy systems by efficiency. Efficiency matters, but nobody builds a power station because it is efficient: they build it because it supplies energy at an acceptable cost, and — increasingly — at an acceptable emission of greenhouse gases. A wind farm converts a "free" fuel at an aerodynamic efficiency below 50 %, while a combined-cycle gas plant converts an expensive fuel at 60 %; which is cheaper depends on how much capital each needs, how many hours a year it runs, what the gas costs, what the money borrowed to build it costs, and what society charges for the carbon dioxide it emits.

This chapter supplies the tools for that comparison. It starts with the time value of money and the capital recovery factor, builds the levelised cost of energy (LCOE) from its definition, and shows why capital-heavy technologies are sensitive to the discount rate and to the capacity factor while fuel-heavy ones are sensitive to fuel and carbon prices. It then derives the emission intensity of fossil generation from fuel chemistry and efficiency, finds the carbon price at which gas displaces coal, and introduces life-cycle assessment, energy payback time and the social cost of carbon. Throughout, keep in mind the warning that runs through all of energy economics: the numbers are only as good as the assumptions, and the assumptions — discount rate, fuel price, lifetime, carbon price — must always be stated.

All cost figures below are in US dollars. Unless a source is named and dated, the costs are **illustrative round numbers** chosen to show the method, not current market data.

## The time value of money {#sec-discounting}

A dollar today is worth more than a dollar in ten years: it could be invested and earn a return in the meantime, and whoever lends it to a project expects to be paid for waiting and for the risk of not being repaid. Energy projects are dominated by this effect because they spend most of their money at the start (building the plant) and earn it back over twenty to forty years.

::: definition Discount rate and present value {#def-present-value}
With a **discount rate** $i$ per year, a cash flow $C_t$ occurring $t$ years from now has a **present value**
$$
\mathrm{PV} = \frac{C_t}{(1+i)^t} = C_t\,v^t, \qquad v = \frac{1}{1+i},
$$ {#eq-pv}
where $v$ is the one-year **discount factor**. The **net present value** of a project is the sum of the present values of all its cash flows, costs negative and revenues positive. The discount rate a utility uses is usually its **weighted average cost of capital** (WACC): the average return demanded by its lenders and shareholders. A **real** discount rate $i_r$ excludes inflation; a **nominal** rate $i_n$ includes it, with $1 + i_n = (1 + i_r)(1 + \text{inflation})$.
:::

At $i = 7\,\%$, a dollar received in 10 years is worth $1/1.07^{10} = \$0.51$ today, and one received in 30 years only $\$0.13$. Revenue late in a plant's life barely counts; that is why cheap finance favours long-lived, capital-intensive assets.

::: proposition Capital recovery factor {#prop-crf}
A capital sum $P$ invested now is exactly repaid, at discount rate $i > 0$, by $n$ equal end-of-year payments
$$
A = P\cdot\mathrm{CRF}(i, n), \qquad \mathrm{CRF}(i, n) = \frac{i(1+i)^n}{(1+i)^n - 1}.
$$ {#eq-crf}
$\mathrm{CRF} \to 1/n$ as $i \to 0$ (simple repayment) and $\mathrm{CRF} \to i$ as $n \to \infty$ (the payment is just the interest).
:::

::: proof
The payments $A$ at the end of years $1, \dots, n$ must have a present value equal to $P$:
$$
P = A\sum_{t=1}^{n} v^t = A\,v\,\frac{1 - v^n}{1 - v},
$$
summing the geometric series. With $v = 1/(1+i)$, $1 - v = i/(1+i)$, so $v/(1-v) = 1/i$ and
$$
P = A\,\frac{1 - (1+i)^{-n}}{i} \quad\Longrightarrow\quad A = P\,\frac{i}{1 - (1+i)^{-n}} = P\,\frac{i(1+i)^n}{(1+i)^n - 1}.
$$
For the limits: as $n \to \infty$, $(1+i)^{-n} \to 0$ and $\mathrm{CRF} \to i$. As $i \to 0$, $1 - (1+i)^{-n} \approx ni$, so $\mathrm{CRF} \to i/(ni) = 1/n$. The assumptions are a constant discount rate, payments at year ends, and no taxes; with these, $1/\mathrm{CRF}$ is the **annuity factor**, the present value of one dollar a year for $n$ years.
:::

::: example Annualising the cost of a power plant {#ex-crf}
A plant costs $\$1000$ per kilowatt of capacity, built instantly (the "overnight" cost), and has a 25-year life. Find its annual capital charge per kilowatt at real discount rates of $7\,\%$ and $3\,\%$, and compare with straight-line repayment.
::: solution
At $7\,\%$: $(1.07)^{25} = 5.427$, so
$$
\mathrm{CRF} = \frac{0.07 \times 5.427}{5.427 - 1} = \frac{0.3799}{4.427} = 0.0858,
$$
and the annual charge is $\$85.8$ per kW-year. At $3\,\%$, $\mathrm{CRF} = 0.0574$, giving $\$57.4$ per kW-year. Straight-line repayment without interest would be $1000/25 = \$40$ per kW-year.

Sanity check: CRF must exceed both $i$ and $1/n$ — at $7\,\%$, $0.0858 > 0.07$ and $> 0.04$. Moving from $3\,\%$ to $7\,\%$ raises the capital charge by half, a large effect for any technology whose cost is mostly capital.
:::
:::

## The levelised cost of energy {#sec-lcoe}

Different plants have different patterns of cost over time: a solar farm is nearly all up-front capital; a gas turbine is cheap to build and expensive to fuel. To compare them we want one number, a price per megawatt-hour that, if received for every megawatt-hour produced, would exactly pay all the costs including the return on capital.

::: definition Levelised cost of energy {#def-lcoe}
For a plant with costs $C_t$ (capital, operation and maintenance, fuel, carbon) and energy output $E_t$ in year $t = 0, 1, \dots, n$, the **levelised cost of energy** at discount rate $i$ is
$$
\mathrm{LCOE} = \frac{\displaystyle\sum_{t=0}^{n} \frac{C_t}{(1+i)^t}}{\displaystyle\sum_{t=0}^{n} \frac{E_t}{(1+i)^t}} .
$$ {#eq-lcoe}
It is the constant price $p$ that makes the present value of revenue $\sum pE_t v^t$ equal to the present value of cost — the break-even tariff. Discounting the *energy* in the denominator is not a trick: it is what this break-even condition requires, since revenue arrives with the energy.
:::

In practice one usually assumes constant annual costs and output, which collapses [[#eq-lcoe]] to a formula that can be evaluated by hand.

::: proposition LCOE in annuity form {#prop-lcoe-annuity}
Assume the plant is built at $t = 0$ for an overnight capital cost $I$ per kW, then runs for $n$ years with constant capacity factor $\mathrm{CF}$, fixed operation and maintenance cost $F$ per kW-year, variable O&M cost $V$ per MWh, fuel price $p_f$ per GJ, heat rate $\mathrm{HR}$ in GJ/MWh, carbon price $p_c$ per tonne of CO₂ and emission intensity $\mathrm{EI}$ in t/MWh, all constant in real terms. Then the LCOE in $\$/\mathrm{MWh}$ is
$$
\mathrm{LCOE} = \frac{\mathrm{CRF}(i,n)\,I + F}{8.76\,\mathrm{CF}} + V + p_f\,\mathrm{HR} + p_c\,\mathrm{EI},
$$ {#eq-lcoe-annuity}
with $I$ in $\$/\mathrm{kW}$, $F$ in $\$/(\mathrm{kW\,yr})$; the factor $8.76$ converts kilowatt-years to megawatt-hours ($1\,\mathrm{kW} \times 8760\,\mathrm{h} = 8.76\,\mathrm{MWh}$).
:::

::: proof
Per kilowatt of capacity, the annual energy is $E = 8.76\,\mathrm{CF}$ MWh in each year $t = 1, \dots, n$, and the annual running cost is $R = F + (V + p_f\mathrm{HR} + p_c\mathrm{EI})E$. In [[#eq-lcoe]] the numerator is $I + R\sum_{t=1}^n v^t = I + R/\mathrm{CRF}$ and the denominator is $E\sum_{t=1}^n v^t = E/\mathrm{CRF}$, using the annuity sum from the proof of [[#prop-crf]]. Dividing,
$$
\mathrm{LCOE} = \frac{I + R/\mathrm{CRF}}{E/\mathrm{CRF}} = \frac{\mathrm{CRF}\cdot I + R}{E} = \frac{\mathrm{CRF}\cdot I + F}{8.76\,\mathrm{CF}} + V + p_f\mathrm{HR} + p_c\mathrm{EI}.
$$
The result is exact under the stated assumptions. It is approximate when they fail: construction spread over several years (add interest during construction to $I$), output that degrades or costs that escalate in real terms (see [[#exr-escalation]]), taxes and depreciation, and decommissioning costs at the end of life.
:::

The formula separates cleanly into a **capital term** that falls as $1/\mathrm{CF}$ and **running terms** that do not depend on how much the plant runs. That single fact organises most of power-system economics.

::: algorithm Estimating an LCOE {#alg-lcoe}
1. Fix the basis: real or nominal dollars of a stated year, the discount rate (WACC), the economic life, and the heating-value basis of the heat rate.
2. Collect overnight capital $I$ (plus interest during construction for long builds), fixed O&M $F$, variable O&M $V$, heat rate, fuel price, emission intensity and carbon price.
3. Choose a realistic capacity factor for the plant's role — not its technical maximum ([[energy-systems/energy-overview]]).
4. Compute $\mathrm{CRF}(i, n)$ from [[#eq-crf]] and evaluate [[#eq-lcoe-annuity]] term by term.
5. Report the terms separately (capital, O&M, fuel, carbon), and test the sensitivity to the two or three most uncertain inputs.
:::

::: example LCOE of an onshore wind farm {#ex-lcoe-wind}
Illustrative data: overnight cost $\$1400/\mathrm{kW}$, fixed O&M $\$40/(\mathrm{kW\,yr})$, no fuel and negligible variable O&M, capacity factor $0.35$, life 25 years, real discount rate $7\,\%$. Find the LCOE and its sensitivity to the discount rate.
::: solution
$\mathrm{CRF}(0.07, 25) = 0.0858$ (from [[#ex-crf]]). Annual energy per kW: $8.76 \times 0.35 = 3.066\,\mathrm{MWh}$. By [[#eq-lcoe-annuity]]:
$$
\mathrm{LCOE} = \frac{0.0858 \times 1400 + 40}{3.066} = \frac{120.1 + 40}{3.066} = 39.2 + 13.0 = 52.2\,\$/\mathrm{MWh}.
$$
Three-quarters of the cost is capital. Repeating at other discount rates: $3\,\%$ gives $39.3$, $5\,\%$ gives $45.4$ and $10\,\%$ gives $63.4\,\$/\mathrm{MWh}$ — a 60 % spread from finance alone.

Sanity check: IRENA's *Renewable Power Generation Costs in 2024* (published July 2025) gives a global weighted-average LCOE for new onshore wind of $\$0.034/\mathrm{kWh}$, with an average installed cost of $\$1041/\mathrm{kW}$; the illustrative case is dearer because its capital cost and discount rate are higher than the global average, which is weighted towards low-cost Chinese projects. The order of magnitude is right.
:::
:::

::: example LCOE of a combined-cycle gas plant {#ex-lcoe-ccgt}
Illustrative data: overnight cost $\$1000/\mathrm{kW}$, fixed O&M $\$25/(\mathrm{kW\,yr})$, variable O&M $\$3/\mathrm{MWh}$, efficiency $55\,\%$ (LHV), gas at $\$8/\mathrm{GJ}$ (LHV), capacity factor $0.55$, life 30 years, discount rate $7\,\%$. Find the LCOE with no carbon price and with $\$80$ per tonne of CO₂, taking the emission intensity as $0.367\,\mathrm{t/MWh}$ (derived in [[#ex-emissions]]).
::: solution
Heat rate: $\mathrm{HR} = 3.6\,\mathrm{GJ/MWh}/0.55 = 6.545\,\mathrm{GJ/MWh}$. $\mathrm{CRF}(0.07, 30) = 0.0806$. Terms:
$$
\text{capital and fixed O\&M} = \frac{0.0806 \times 1000 + 25}{8.76 \times 0.55} = \frac{105.6}{4.818} = 21.9\,\$/\mathrm{MWh},
$$
fuel $= 8 \times 6.545 = 52.4\,\$/\mathrm{MWh}$, variable O&M $3.0\,\$/\mathrm{MWh}$. Total $\mathrm{LCOE} = 77.3\,\$/\mathrm{MWh}$. With carbon at $\$80/\mathrm{t}$: $+80 \times 0.367 = 29.4$, giving $106.7\,\$/\mathrm{MWh}$.

Here fuel is two-thirds of the cost. The discount rate matters little: $3\,\%$ gives $71.1$ and $10\,\%$ gives $82.6\,\$/\mathrm{MWh}$, a spread of 16 % against 60 % for the wind farm.

Sanity check: the fuel term is simply price times heat rate — at $\$8/\mathrm{GJ}$ every percentage point of efficiency is worth about $\$1/\mathrm{MWh}$, which is why the gains described in [[energy-systems/gas-turbines-combined-cycles]] matter so much.
:::
:::

::: widget plot
f: (r/100*(1+r/100)^25/((1+r/100)^25-1)*1400 + 40)/(8.76*x); (r/100*(1+r/100)^30/((1+r/100)^30-1)*1000 + 25)/(8.76*x) + 3 + pg*6.545 + pc*0.367
x: 0.05, 0.95
y: 0, 250
sliders: r=7:2:12:0.5; pg=8:2:20:0.5; pc=0:0:200:5
labels: \text{wind}; \text{CCGT}
caption: LCOE in \$/MWh against capacity factor for the illustrative wind farm and combined-cycle plant of [[#ex-lcoe-wind]] and [[#ex-lcoe-ccgt]], with the discount rate $r$ (%), gas price $p_g$ (\$/GJ) and carbon price $p_c$ (\$/t CO₂) on sliders. The wind curve is a pure hyperbola: double the capacity factor and you halve the cost. The gas curve flattens onto a floor set by fuel and carbon. Raise $r$ and only the wind curve moves much; raise $p_g$ or $p_c$ and only the gas floor moves. Note that the gas plant can choose its capacity factor while the wind farm's is fixed by the site — the figure compares costs, not the value of the electricity.
:::

### What LCOE does not tell you

LCOE is a cost per unit of energy averaged over a plant's life. It says nothing about *when* the energy arrives, and electricity's value varies strongly with time. A megawatt-hour from a gas turbine delivered at the evening peak is worth more than a megawatt-hour of midday solar in a system already saturated with solar. Three further costs fall outside a plant's own LCOE: **firming** (capacity that must be available when wind and sun are not), **balancing** (reserves to cover forecast errors) and **network** costs (transmission to remote sites). These integration costs are small when variable renewables are a small share of a system and grow as their share rises. A full comparison uses system models that dispatch the whole fleet hour by hour, of the kind sketched with the load-duration curve in [[energy-systems/energy-overview]], and adds storage where needed ([[energy-systems/energy-storage]]).

::: warning Common errors in cost comparisons
**Mixing real and nominal rates.** A $7\,\%$ nominal rate with $2\,\%$ inflation is a real rate of $1.07/1.02 - 1 = 4.9\,\%$; using a nominal rate on costs quoted in constant dollars overstates capital-heavy LCOEs. **Using the technical capacity factor** instead of the expected one: a gas plant that will run as mid-merit at $0.35$ does not have the LCOE it would have at $0.85$. **Mixing heating-value bases:** a heat rate on HHV with a fuel price on LHV is wrong by about $10\,\%$ for gas. **Comparing LCOEs of plants with different roles** as if a megawatt-hour were a megawatt-hour regardless of when it is produced. **Forgetting the units:** capital in $\$/\mathrm{kW}$ divided by energy in $\mathrm{MWh}$ needs the factor of 1000 hidden in $8.76$.
:::

## Emissions from fossil generation {#sec-emissions}

Burning a fuel turns essentially all its carbon into CO₂: each kilogram of carbon becomes $44/12 = 3.67\,\mathrm{kg}$ of CO₂. The emission per unit of *fuel energy* depends on the fuel's carbon-to-energy ratio — high for coal, which is mostly carbon, and low for natural gas, whose methane molecule carries four hydrogen atoms that release energy without making CO₂. The emission per unit of *electricity* then depends on the plant efficiency.

::: proposition Emission intensity of thermal generation {#prop-emission-intensity}
A plant burning a fuel with CO₂ emission factor $\mathrm{EF}$ (in $\mathrm{kg/GJ}$ of fuel heating value) at net efficiency $\eta$ on the same heating-value basis emits
$$
\mathrm{EI} = \frac{\mathrm{EF}}{\eta} \times 0.0036\,\mathrm{GJ/kWh} \quad [\mathrm{kg\,CO_2/kWh}],
$$ {#eq-ei}
i.e. $\mathrm{EI} = \mathrm{EF} \times \mathrm{HR}$. For a fuel of carbon mass fraction $w_C$ and heating value $\mathrm{HV}$ (MJ/kg), complete combustion gives $\mathrm{EF} = (44/12)\,w_C/\mathrm{HV} \times 1000\,\mathrm{kg/GJ}$ per kg-fuel basis.
:::

::: proof
Per kWh of electricity the plant burns $3.6\,\mathrm{MJ}/\eta = 0.0036/\eta\,\mathrm{GJ}$ of fuel energy (the heat rate, [[energy-systems/energy-overview]]); each GJ releases $\mathrm{EF}$ kg of CO₂, which gives [[#eq-ei]]. For the emission factor, one kilogram of fuel contains $w_C$ kg of carbon, which forms $w_C \times 44/12$ kg of CO₂ (molar masses of CO₂ and C), while releasing $\mathrm{HV}$ MJ $= \mathrm{HV}/1000$ GJ. Dividing gives the formula. Assumptions: all carbon is oxidised to CO₂ (unburnt carbon and CO are small in large boilers), no capture of CO₂, and $\eta$ and $\mathrm{EF}$ on the same heating-value basis.
:::

For pure methane ($w_C = 12/16 = 0.75$, $\mathrm{LHV} = 50.0\,\mathrm{MJ/kg}$) the formula gives $3.667 \times 0.75/0.050 = 55.0\,\mathrm{kg/GJ}$. The IPCC 2006 Guidelines for National Greenhouse Gas Inventories (Volume 2, Table 1.4) use default factors on a net (LHV) basis of $56.1\,\mathrm{kg/GJ}$ for natural gas, which contains some ethane, propane and CO₂, and $94.6\,\mathrm{kg/GJ}$ for other bituminous coal. Coal emits about $1.7$ times as much CO₂ per unit of heat as gas.

::: example Emission intensity of coal and gas plants {#ex-emissions}
Find the emission intensity of (a) a combined-cycle plant at $55\,\%$ (LHV) burning natural gas, and (b) a subcritical coal plant at $40\,\%$ (LHV) burning bituminous coal, using the IPCC default factors. (c) A utility replaces $1\,\mathrm{TWh}$ a year of coal generation by gas generation. How much CO₂ does it avoid?
::: solution
(a) $\mathrm{EI} = 56.1 \times 0.0036/0.55 = 0.367\,\mathrm{kg/kWh}$.

(b) $\mathrm{EI} = 94.6 \times 0.0036/0.40 = 0.851\,\mathrm{kg/kWh}$.

(c) Saving per kWh $= 0.851 - 0.367 = 0.484\,\mathrm{kg}$; for $10^9\,\mathrm{kWh}$, $4.84\times10^{8}\,\mathrm{kg} = 0.48\,\mathrm{Mt}$ of CO₂ a year.

Sanity check: gas plants are commonly quoted at about $0.35$–$0.40\,\mathrm{kg/kWh}$ and coal plants at $0.8$–$1.0$; the switch more than halves emissions per kWh because both the emission factor and the efficiency favour gas. The methane that leaks upstream from gas production is not included here; it is one of the reasons life-cycle figures are higher (next section).
:::
:::

### Carbon prices and fuel switching

A carbon price — from a tax or an emissions-trading scheme — adds $p_c\,\mathrm{EI}$ to the cost of each megawatt-hour. In the short run, the plants already built are dispatched in order of their **short-run marginal cost** (fuel plus variable O&M plus carbon), since their capital is already spent. Coal, with cheap fuel but high emissions, and gas, with dearer fuel but low emissions, swap places in that merit order at a definite carbon price.

::: proposition Coal-to-gas switching price {#prop-switching}
Let a coal plant and a gas plant have short-run costs excluding carbon $m_c$ and $m_g$ (in $\$/\mathrm{MWh}$) with $m_g > m_c$, and emission intensities $\mathrm{EI}_c > \mathrm{EI}_g$ (in $\mathrm{t/MWh}$). The gas plant becomes the cheaper to run when the carbon price exceeds
$$
p_c^{*} = \frac{m_g - m_c}{\mathrm{EI}_c - \mathrm{EI}_g}.
$$ {#eq-switch}
:::

::: proof
The short-run costs with carbon are $m_c + p_c\mathrm{EI}_c$ and $m_g + p_c\mathrm{EI}_g$, both linear in $p_c$. They are equal when $p_c(\mathrm{EI}_c - \mathrm{EI}_g) = m_g - m_c$, which gives $p_c^{*}$; since $\mathrm{EI}_c > \mathrm{EI}_g$, the coal line is steeper and lies above the gas line for all $p_c > p_c^{*}$. The result assumes both plants are available and that their heat rates do not change with dispatch, and it compares short-run costs only; whether to *build* new plant is decided by full LCOEs.
:::

::: example The switching price {#ex-switch}
Coal costs $\$3/\mathrm{GJ}$ and the coal plant has a heat rate of $9.0\,\mathrm{GJ/MWh}$ ($40\,\%$) and variable O&M of $\$5/\mathrm{MWh}$; gas costs $\$8/\mathrm{GJ}$ in a $55\,\%$ CCGT ($6.545\,\mathrm{GJ/MWh}$) with variable O&M of $\$3/\mathrm{MWh}$. Use the emission intensities of [[#ex-emissions]]. Find the switching carbon price.
::: solution
$m_c = 3 \times 9.0 + 5 = 32.0\,\$/\mathrm{MWh}$; $m_g = 8 \times 6.545 + 3 = 55.4\,\$/\mathrm{MWh}$. By [[#eq-switch]]:
$$
p_c^{*} = \frac{55.4 - 32.0}{0.851 - 0.367} = \frac{23.4}{0.484} = 48.3\,\$/\mathrm{t\,CO_2}.
$$
Sanity check: the gas–coal fuel-cost gap is about $\$23/\mathrm{MWh}$ and each megawatt-hour switched saves about half a tonne, so the price must be about $\$46$–$50$ per tonne. If gas fell to $\$5/\mathrm{GJ}$ the switch would occur at about $\$8/\mathrm{t}$ — which is why cheap gas, not carbon policy alone, drove much of the decline in coal generation in some markets.
:::
:::

::: widget plot
f: 5 + fc*9.0 + 0.851*x; 3 + pg*6.545 + 0.367*x
x: 0, 150
y: 0, 250
sliders: fc=3:1:8:0.25; pg=8:2:20:0.5
labels: \text{coal (40\%)}; \text{CCGT (55\%)}
caption: Short-run marginal cost (\$/MWh) of a coal plant and a combined-cycle gas plant against the carbon price (\$/t CO₂), with the coal price $f_c$ and gas price $p_g$ (both \$/GJ) on sliders. The lines cross at the switching price of [[#prop-switching]]; to the right of the crossing, gas runs first. The coal line is more than twice as steep because coal emits $0.85$ against $0.37\,\mathrm{t/MWh}$. Push $p_g$ up to $\$15/\mathrm{GJ}$ and watch the crossing move beyond $\$100/\mathrm{t}$; drop it to $\$4/\mathrm{GJ}$ and gas is cheaper even with no carbon price.
:::

## Life-cycle assessment {#sec-lca}

Wind turbines and solar panels emit nothing while they run, but steel, concrete, glass, silicon and copper must be mined, refined, made into components, transported, installed and eventually dismantled, and all of that uses energy and emits greenhouse gases. Fossil plants, too, have emissions outside the chimney — mining, gas processing and pipeline leakage. Comparing technologies fairly means counting everything from cradle to grave.

::: definition Life-cycle assessment {#def-lca}
A **life-cycle assessment** (LCA), as standardised in ISO 14040:2006 (principles and framework) and ISO 14044:2006 (requirements and guidelines), evaluates the environmental impacts of a product system over its whole life, in four phases:
1. **Goal and scope definition** — the purpose, the system boundary (which processes are included), and the **functional unit**, the quantified service to which all flows are referred; for electricity generation it is normally $1\,\mathrm{kWh}$ delivered (or generated).
2. **Life-cycle inventory** (LCI) — the inputs (energy, materials) and outputs (emissions, wastes) of every process inside the boundary, scaled to the functional unit.
3. **Life-cycle impact assessment** (LCIA) — classification of inventory flows into impact categories (climate change, acidification, toxicity, land use…) and characterisation into common units, e.g. global-warming potential in $\mathrm{kg\,CO_2\text{-}eq}$.
4. **Interpretation** — conclusions, sensitivity and uncertainty, and the limitations of the study, checked for consistency with the goal.
:::

Methane and nitrous oxide are converted to **CO₂-equivalent** by multiplying by their global-warming potential over a stated time horizon (usually 100 years). The choice of horizon matters for methane, which is far more potent than CO₂ but short-lived.

The most widely quoted comparison is the review of published LCAs in Annex III of the IPCC Fifth Assessment Report, Working Group III (2014). Its median life-cycle emissions, in $\mathrm{g\,CO_2\text{-}eq/kWh}$, are:

| technology | median (g CO₂-eq/kWh) |
|---|---|
| coal, pulverised | 820 |
| natural gas, combined cycle | 490 |
| solar PV, utility-scale | 48 |
| hydropower | 24 |
| nuclear | 12 |
| wind, onshore | 11 |

The ranges behind these medians are wide (hydropower ranges over three orders of magnitude, depending on the methane from flooded vegetation), and the figures for PV have fallen since the underlying studies as module efficiency improved and manufacturing energy fell. The pattern is robust: fossil generation is dominated by combustion emissions (compare $820$ with the $851$ direct-combustion figure of [[#ex-emissions]] for a somewhat more efficient fleet), while renewables and nuclear emit one to two orders of magnitude less, almost all of it during manufacture and construction.

::: definition Energy payback time and EROI {#def-epbt}
The **energy payback time** (EPBT) of a generating system is the time it must operate for its output to equal the primary energy used to make, install and decommission it:
$$
\mathrm{EPBT} = \frac{E_\text{embodied}}{E_\text{annual,primary-eq}},
$$
where $E_\text{annual,primary-eq}$ is the annual electricity output converted to the primary energy it displaces (divided by the efficiency of the grid it replaces). The **energy return on investment** over a lifetime $L$ is $\mathrm{EROI} = L\,E_\text{annual}/E_\text{embodied}$; it must be stated whether output is counted as electricity or as primary-equivalent, because the two differ by a factor of 2.5–3.
:::

::: example Payback of a rooftop PV system {#ex-epbt}
Illustrative data: a PV system needs $7.0\,\mathrm{GJ}$ of primary energy per kWp to manufacture, transport and install, produces $1200\,\mathrm{kWh}$ per kWp per year, and displaces grid electricity with a primary-energy factor of $2.5$ (i.e. $40\,\%$ average conversion efficiency). Its embodied emissions are $1000\,\mathrm{kg\,CO_2\text{-}eq}$ per kWp. Find the EPBT, the primary-equivalent EROI over 25 years, and the life-cycle emission intensity, ignoring degradation.
::: solution
Primary energy displaced per year: $1200 \times 3.6\,\mathrm{MJ} \times 2.5 = 10\,800\,\mathrm{MJ} = 10.8\,\mathrm{GJ}$. Hence
$$
\mathrm{EPBT} = \frac{7.0}{10.8} = 0.65\,\mathrm{yr} \approx 8\ \text{months}.
$$
EROI (primary-equivalent) $= 25 \times 10.8/7.0 = 38.6$; counted as electricity it is $38.6/2.5 = 15$.

Life-cycle intensity: lifetime output $25 \times 1200 = 30\,000\,\mathrm{kWh}$, so $1\,000\,000\,\mathrm{g}/30\,000\,\mathrm{kWh} = 33\,\mathrm{g\,CO_2\text{-}eq/kWh}$.

Sanity check: $33\,\mathrm{g/kWh}$ is below the IPCC 2014 median of $48$ for utility PV, consistent with newer, more efficient modules; in a cloudier climate with $900\,\mathrm{kWh/kWp}$ it would be $44\,\mathrm{g/kWh}$. The intensity scales inversely with the solar resource, the same way the LCOE does ([[energy-systems/solar-energy]]).
:::
:::

## The social cost of carbon {#sec-scc}

A carbon price in an LCOE raises a further question: what *should* it be? One answer is the **social cost of carbon** (SCC), the present value of the future damages caused by emitting one more tonne of CO₂ today. Estimating it chains together an emissions-to-concentration model, a climate model, damage functions that turn warming into economic losses (agriculture, health, sea-level rise, labour productivity), and finally a discount rate to bring damages occurring over centuries back to today. The last step dominates the answer, by the arithmetic of [[#eq-pv]]: a damage of $\$1000$ occurring in 100 years is worth $\$138$ today at $2\,\%$, $\$52$ at $3\,\%$ and $\$7.6$ at $5\,\%$.

In December 2023 the US Environmental Protection Agency published updated estimates centred on about $\$190$ per tonne of CO₂ (for emissions in 2020, in 2020 dollars, at a $2\,\%$ near-term discount rate), several times the interim federal value of $\$51$ per tonne used before. In 2025 the federal government withdrew the use of these estimates: Executive Order 14154 disbanded the interagency working group responsible for them, and a White House memorandum of May 2025 directed agencies to stop monetising climate damages except where a statute requires it. The episode illustrates that the SCC is a value judgement as much as a calculation — the choice of discount rate is an ethical choice about the weight given to future generations — and that published figures must be quoted with their date, source and discount rate.

::: widget plot
f: 1/(1+r/100)^x; 1/1.02^x
x: 0, 200
y: 0, 1
sliders: r=5:0.5:8:0.5
labels: (1+r)^{-t}; (1.02)^{-t}
caption: The present value of $\$1$ of damage occurring $t$ years from now, at a discount rate $r$ (%) set by the slider and at a fixed $2\,\%$ for comparison. At $5\,\%$ a damage 100 years away is worth less than one cent on the dollar today; at $2\,\%$ it keeps 14 cents. Slide $r$ down to $2\,\%$ to make the curves coincide, and notice how the area under the curve — roughly what a stream of future damages is worth today — grows several-fold. This single parameter explains most of the disagreement between published social costs of carbon.
:::

::: quiz
A wind farm and a gas plant have the same LCOE of $\$60/\mathrm{MWh}$ at a $5\,\%$ discount rate. The cost of capital rises to $9\,\%$. What happens?
- [ ] Both LCOEs rise by the same amount, since both plants borrow money.
- [x] The wind farm's LCOE rises much more, because most of its cost is capital, so it becomes the dearer option.
- [ ] The gas plant's LCOE rises more because its fuel is bought over the plant's life.
- [ ] Neither changes, because LCOE is defined at a fixed discount rate.
::: solution
In [[#eq-lcoe-annuity]] the discount rate enters only through $\mathrm{CRF}\cdot I$. For a wind farm that term is about three-quarters of the LCOE; for a CCGT it is a quarter or less, the rest being fuel, which is paid as it is used and is not discounted away. A higher cost of capital therefore penalises capital-intensive technologies — a central reason why interest rates and project risk matter for the energy transition.
:::
:::

::: history
Charles David **Keeling** began continuous measurements of atmospheric CO₂ at the Mauna Loa Observatory in Hawaii in 1958; the rising, seasonally oscillating "Keeling curve" made the accumulation of fossil carbon visible. The World Meteorological Organization and the UN Environment Programme set up the **Intergovernmental Panel on Climate Change** in 1988. The **Kyoto Protocol**, adopted in December 1997 and in force from February 2005, set binding emission targets for industrialised countries, and the **EU Emissions Trading System** began trading allowances on 1 January 2005, the first large cap-and-trade market for CO₂ and the source of the carbon prices that European plant operators now enter into their dispatch decisions. On the accounting side, ISO 14040 on life-cycle assessment was first published in 1997 and revised, together with the new ISO 14044, in 2006. William **Nordhaus**, whose integrated assessment models put a price on climate damages and underlie most estimates of the social cost of carbon, shared the 2018 Nobel memorial prize in economics with Paul **Romer**.
:::

::: summary
- Money has a time value: a cash flow $C_t$ in year $t$ is worth $C_t/(1+i)^t$ today. The capital recovery factor $i(1+i)^n/((1+i)^n-1)$ turns an investment into an equal annual charge.
- LCOE is discounted lifetime cost divided by discounted lifetime energy — the break-even price. With constant annual values it reduces to $(\mathrm{CRF}\,I + F)/(8.76\,\mathrm{CF}) + V + p_f\mathrm{HR} + p_c\mathrm{EI}$.
- Capital-heavy plants (wind, solar, nuclear) are sensitive to the discount rate and capacity factor; fuel-heavy plants (gas) to fuel and carbon prices.
- LCOE ignores when energy is delivered; firming, balancing and network costs must be added at system level.
- Emission intensity $= \mathrm{EF}/\eta$: about $0.37\,\mathrm{kg/kWh}$ for a CCGT and $0.85$ for a $40\,\%$ coal plant with IPCC default factors.
- Gas displaces coal in dispatch above the carbon price $(m_g - m_c)/(\mathrm{EI}_c - \mathrm{EI}_g)$.
- Life-cycle assessment (ISO 14040/14044) counts emissions from cradle to grave per functional unit; IPCC (2014) medians are about 820 g/kWh for coal, 490 for gas, and 11–48 for wind, nuclear, hydro and PV.
- The social cost of carbon depends above all on the discount rate and on policy; quote it with date, source and rate.
:::

## Exercises {#sec-exercises}

::: exercise Present value {#exr-pv level=1 check="377"}
What is the present value of $\$1000$ received in 20 years at a discount rate of $5\,\%$? (Enter the value in dollars, rounded to the nearest dollar.)
::: solution
$\mathrm{PV} = 1000/1.05^{20} = 1000/2.6533 = \$376.89$, i.e. $\$377$.
:::
:::

::: exercise Capital recovery factor {#exr-crf level=1 check="0.1019"}
Compute $\mathrm{CRF}(i, n)$ for $i = 8\,\%$ and $n = 20$ years. (Enter the CRF to four decimal places.)
::: solution
$(1.08)^{20} = 4.6610$, so $\mathrm{CRF} = 0.08 \times 4.6610/3.6610 = 0.37288/3.6610 = 0.10185$, i.e. $0.1019$. A $\$1000$ loan is repaid by $\$101.85$ a year for 20 years.
:::
:::

::: exercise Emission intensity of a gas engine {#exr-engine level=1 check="0.481"}
A gas-engine power plant has a net efficiency of $42\,\%$ (LHV). Using the IPCC default emission factor of $56.1\,\mathrm{kg/GJ}$ for natural gas, find its emission intensity. (Enter the intensity in kg CO₂ per kWh to three decimal places.)
::: solution
By [[#eq-ei]], $\mathrm{EI} = 56.1 \times 0.0036/0.42 = 0.2020/0.42 = 0.481\,\mathrm{kg/kWh}$ — about 30 % more than a combined cycle burning the same gas.
:::
:::

::: exercise LCOE of a solar farm {#exr-solar-lcoe level=2 check="44.3"}
A utility-scale solar farm costs $\$800/\mathrm{kW}$ (overnight), has fixed O&M of $\$15/(\mathrm{kW\,yr})$, a capacity factor of $0.20$ and a life of 25 years. Using [[#eq-lcoe-annuity]] at a real discount rate of $6\,\%$, find its LCOE. (Enter the LCOE in \$/MWh to three significant figures.)
::: solution
$\mathrm{CRF}(0.06, 25) = 0.06 \times 4.2919/3.2919 = 0.07823$. Annual energy per kW $= 8.76 \times 0.20 = 1.752\,\mathrm{MWh}$. 
$$
\mathrm{LCOE} = \frac{0.07823 \times 800 + 15}{1.752} = \frac{62.58 + 15}{1.752} = 44.3\,\$/\mathrm{MWh}.
$$
Compare IRENA's global weighted average for new PV in 2024, $\$43/\mathrm{MWh}$ at an average installed cost of $\$691/\mathrm{kW}$.
:::
:::

::: exercise Switching price with cheaper fuels {#exr-switch level=2 check="34.6"}
Coal costs $\$2.5/\mathrm{GJ}$ in a plant with heat rate $9.0\,\mathrm{GJ/MWh}$; gas costs $\$6/\mathrm{GJ}$ in a $55\,\%$ CCGT. Ignore variable O&M. Using emission intensities of $0.8514$ and $0.3672\,\mathrm{t/MWh}$, find the carbon price at which gas becomes cheaper to run. (Enter the price in \$/t CO₂ to three significant figures.)
::: solution
$m_c = 2.5 \times 9.0 = 22.5\,\$/\mathrm{MWh}$; $m_g = 6 \times 3.6/0.55 = 39.27\,\$/\mathrm{MWh}$. By [[#eq-switch]],
$$
p_c^{*} = \frac{39.27 - 22.5}{0.8514 - 0.3672} = \frac{16.77}{0.4842} = 34.6\,\$/\mathrm{t}.
$$
:::
:::

::: exercise Life-cycle intensity of a wind turbine {#exr-wind-lca level=2 check="11.4"}
A $3.0\,\mathrm{MW}$ wind turbine has embodied emissions (materials, manufacture, transport, installation and decommissioning) of $2400\,\mathrm{t\,CO_2\text{-}eq}$. It runs at a capacity factor of $0.32$ for 25 years. Find its life-cycle emission intensity. (Enter the intensity in g CO₂-eq per kWh to three significant figures.)
::: solution
Lifetime output: $3000\,\mathrm{kW} \times 8760\,\mathrm{h} \times 0.32 \times 25 = 2.102\times10^{8}\,\mathrm{kWh}$. Intensity: $2.4\times10^{9}\,\mathrm{g}/2.102\times10^{8}\,\mathrm{kWh} = 11.4\,\mathrm{g/kWh}$, close to the IPCC median of 11 for onshore wind and about $1/75$ of a coal plant's.
:::
:::

::: exercise The cost of capital for wind {#exr-wind-rate level=2 check="63.4"}
Recompute the LCOE of the wind farm in [[#ex-lcoe-wind]] at a real discount rate of $10\,\%$. By what percentage has it risen from the $7\,\%$ case? (Enter the LCOE at 10 % in \$/MWh to three significant figures.)
::: solution
$(1.10)^{25} = 10.835$, $\mathrm{CRF} = 0.10 \times 10.835/9.835 = 0.11017$. $\mathrm{LCOE} = (0.11017 \times 1400 + 40)/3.066 = (154.2 + 40)/3.066 = 63.4\,\$/\mathrm{MWh}$, up $21\,\%$ from $52.2$ — with the turbines, wind and site unchanged.
:::
:::

::: exercise Derivation: levelising an escalating fuel price {#exr-escalation level=3 check="9.83"}
(a) A fuel price starts at $p_0$ in year 1 and escalates at a real rate $g$ per year, so $p_t = p_0(1+g)^{t-1}$. Show that the **levelised fuel price** — the constant price with the same present value over $n$ years at discount rate $i$ — is
$$
\bar p = p_0\,\mathrm{CRF}(i,n)\,\frac{1}{1+i}\,\frac{1 - k^n}{1 - k}, \qquad k = \frac{1+g}{1+i}.
$$
(b) Evaluate it for $p_0 = \$8/\mathrm{GJ}$, $g = 2\,\%$, $i = 7\,\%$, $n = 30$. (c) How much does the escalation add to the CCGT LCOE of [[#ex-lcoe-ccgt]]? (Enter $\bar p$ in \$/GJ to three significant figures.)
::: solution
(a) Present value of the fuel payments per unit of fuel used each year:
$$
\sum_{t=1}^{n} \frac{p_0(1+g)^{t-1}}{(1+i)^t} = \frac{p_0}{1+i}\sum_{t=1}^{n} k^{t-1} = \frac{p_0}{1+i}\,\frac{1-k^n}{1-k}.
$$
A constant price $\bar p$ has present value $\bar p/\mathrm{CRF}$ (the annuity factor). Equating gives the formula. Check: $g = 0$ gives $k = v$ and $\frac{1}{1+i}\frac{1-v^n}{1-v} = 1/\mathrm{CRF}$, so $\bar p = p_0$.

(b) $k = 1.02/1.07 = 0.95327$, $k^{30} = 0.2378$, $(1 - k^{30})/(1 - k) = 0.7622/0.04673 = 16.31$. With $\mathrm{CRF}(0.07, 30) = 0.08059$: $\bar p = 8 \times 0.08059 \times 16.31/1.07 = 9.83\,\$/\mathrm{GJ}$, a levelisation factor of $1.23$.

(c) The fuel term rises from $8 \times 6.545 = 52.4$ to $9.83 \times 6.545 = 64.3\,\$/\mathrm{MWh}$, adding $\$11.9/\mathrm{MWh}$; the LCOE becomes about $89\,\$/\mathrm{MWh}$. Real escalation of only $2\,\%$ a year matters because the plant's life is long.
:::
:::

::: exercise Discounting distant damages {#exr-scc level=3 check="138"}
A tonne of CO₂ emitted today is assumed to cause $\$1000$ of damage concentrated in a single year, 100 years from now. (a) Find its present value at discount rates of $2\,\%$, $3\,\%$ and $5\,\%$. (b) If instead the damage were spread evenly as $\$10$ a year over years 1 to 100, what would the present value be at $3\,\%$? (c) Comment on what this implies for the SCC debate. (Enter the present value at $2\,\%$ from (a), in dollars rounded to the nearest dollar.)
::: solution
(a) $1000/1.02^{100} = \$138$; $1000/1.03^{100} = \$52.0$; $1000/1.05^{100} = \$7.6$. Moving from 2 % to 5 % divides the value by 18.

(b) $10/\mathrm{CRF}(0.03, 100)$: $(1.03)^{100} = 19.22$, $\mathrm{CRF} = 0.03 \times 19.22/18.22 = 0.03165$, so $\mathrm{PV} = 10/0.03165 = \$316$. Damages that start soon are discounted much less.

(c) Because climate damages extend over centuries, the SCC is dominated by the discount rate and by the timing assumed for damages; disagreements about the SCC are largely disagreements about these, which is why published values range over an order of magnitude and must always be quoted with their rate. The answer to enter is $138$.
:::
:::

::: exercise Design: a new supply for an industrial site {#exr-design level=3}
A chemical plant needs $50\,\mathrm{MW}$ of electricity continuously and is choosing among (i) grid supply at $\$90/\mathrm{MWh}$ with an average grid intensity of $0.30\,\mathrm{kg/kWh}$, (ii) an on-site gas engine or CCGT, (iii) a contract for wind and solar from a remote farm plus grid top-up. Using [[#eq-lcoe-annuity]] with stated, illustrative assumptions, estimate the annual cost and annual CO₂ of each option at carbon prices of $\$0$, $\$50$ and $\$150/\mathrm{t}$, decide which you would recommend, and identify the two assumptions that would change your decision most. There is no single answer; show your numbers.
::: solution
A sketch of one answer. Annual energy $= 50 \times 8760 = 438\,\mathrm{GWh}$. (i) Grid: $438\,\mathrm{GWh} \times \$90 = \$39.4\,\mathrm{M}$; CO₂ $= 438\times10^{6} \times 0.30 = 131\,\mathrm{kt}$ (carbon is assumed already in the tariff). (ii) A CCGT run at $\mathrm{CF} = 0.90$ needs about $56\,\mathrm{MW}$; at $\$1100/\mathrm{kW}$, $\$25/(\mathrm{kW\,yr})$, $\$8/\mathrm{GJ}$ and $52\,\%$ (smaller plants are less efficient), the LCOE is roughly $(0.0806 \times 1100 + 25)/7.884 + 3 + 8 \times 6.92 = 14.4 + 3 + 55.4 = 72.8\,\$/\mathrm{MWh}$ before carbon; emissions $0.388\,\mathrm{t/MWh}$, i.e. $170\,\mathrm{kt/yr}$; carbon adds $\$19$ and $\$58/\mathrm{MWh}$ at $\$50$ and $\$150$. With heat recovery for process steam (cogeneration, [[energy-systems/gas-turbines-combined-cycles]]) the effective cost falls considerably. (iii) A wind–solar contract at $\$50$–$60/\mathrm{MWh}$ covers perhaps $60$–$70\,\%$ of hours; the rest is bought from the grid, so the blended cost is near $\$65$–$70/\mathrm{MWh}$ and emissions fall to about $40$–$50\,\mathrm{kt}$. Recommendation depends on gas price and carbon price — the two inputs a good answer tests — and on whether the site needs steam, which strongly favours cogeneration at low carbon prices and the renewable contract at high ones.
:::
:::
