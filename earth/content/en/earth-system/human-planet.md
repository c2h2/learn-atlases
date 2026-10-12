In 1864 George Perkins Marsh (Marsh), a US diplomat in Florence, published *Man and Nature*, a book of astonishing range whose argument was that human action was converting a healthy planet into a ruin — deforestation, soil erosion, the silting of Mediterranean ports, the desiccation of landscapes — and that "the earth is fast becoming an unfit home for its noblest inhabitant". The book went out of print within a decade. A hundred and thirty-six years later Paul Crutzen (Crutzen) gave the same argument a name that stuck: the Anthropocene.

What has changed since Marsh is not the quality of the observation but the scale of the operation, and the fact that we can now measure it. This chapter is the accounting: how much matter and energy a civilisation of eight billion moves, how that compares with the planet's own fluxes, which of the planet's cycles have been rerouted, and what the arithmetic of the remaining decades looks like.

## The scale of the human operation

::: definition The Great Acceleration {#def-acceleration}
Of twenty-four socio-economic and biophysical time series running from 1750 to 2010 — population, urban population, GDP, foreign investment, telephone lines, inland and fertiliser use, hydropower, dams, cars, cities over one million people, paper, television sets, international tourists, fish catch, mammal species threatened, atmospheric $\mathrm{CO_2}$, $\mathrm{N_2O}$, methane, ozone-depleting substances, coastal nitrogen discharge, global surface temperature, tropical forest area — twenty-four show a statistically significant change of regime beginning around 1950, and most are close to exponential thereafter (Steffen and others, 2015). Between 1950 and 2010 world population quadrupled, atmospheric $\mathrm{CO_2}$ quadrupled, car ownership rose by a factor of about 375, and paper by 430.
:::

::: definition IPAT and the Kaya identity {#def-ipat}
Impact is written $I = P \times A \times T$: population, per-capita affluence, and the technology term that converts consumption into environmental load. For carbon the identity is exact and is called the **Kaya identity**:
$$
\mathrm{CO_2} = P \times \frac{\mathrm{GDP}}{P} \times \frac{E}{\mathrm{GDP}} \times \frac{c}{E},
$$
the product of population, income per head, primary energy per unit income ($5.7\ \mathrm{MJ}$ per 2017 dollar in 2023) and carbon per unit energy (about $70\ \mathrm{kg\,CO_2\,GJ^{-1}}$ for the world's primary energy mix).
:::

::: definition Planetary boundaries {#def-boundaries}
The **planetary boundaries** framework defines, for nine Earth-system processes, a control variable, a reference state (usually Holocene), and a threshold beyond which the state is judged to be qualitatively different. The 2023 assessment placed six of nine outside the safe space: climate change, biosphere integrity, land-system change, freshwater change, biogeochemical flows of nitrogen and phosphorus, and novel entities (chemicals, plastics, radionuclides).
:::

| Human flux | $\mathrm{Gt\,yr^{-1}}$ or $\mathrm{Tg\,yr^{-1}}$ | Comparable natural flux |
|---|---|---|
| Fossil carbon as $\mathrm{CO_2}$ | $10$ Gt C | volcanic $\mathrm{CO_2}$ $0.3$–$0.4$ |
| Sediment moved by agriculture | $19$ (cropland, US: $1.7$) | river sediment to sea $15$–$20$ |
| Nitrogen fixed industrially | $120$ Tg N | biological fixation $100$–$200$ Tg N |
| Phosphorus mined | $17$ Tg P | natural weathering $0.2$ Tg P |
| Cement produced | $4.3$ | — |
| Plastics produced | $0.4$ | — |
| Total material extraction | $95$ | — |

The two rows that decide the argument are nitrogen and phosphorus. Industry now fixes as much reactive nitrogen as all the world's biology, and mines eighty times the phosphorus that natural weathering releases.

::: example Waste heat is not the problem {#ex-heat}
World primary energy use is $600\ \mathrm{EJ\,yr^{-1}}$. Nearly all of it ends as heat. Compare the resulting global mean energy flux with the enhanced greenhouse forcing of $2.72\ \mathrm{W\,m^{-2}}$ (IPCC AR6, 2021, 2019 level).
::: solution
$$
\frac{600\times10^{18}\ \mathrm{J\,yr^{-1}}}{3.156\times10^{7}\ \mathrm{s\,yr^{-1}}\times5.10\times10^{14}\ \mathrm{m^2}} = 0.037\ \mathrm{W\,m^{-2}},
$$
against $2.72\ \mathrm{W\,m^{-2}}$ of radiative forcing — a factor of seventy-four. In power terms, civilisation runs on $19\ \mathrm{TW}$ while the greenhouse imbalance it has created is $14\ \mathrm{TW}$, and the imbalance is not dissipated but accumulated, mostly as ocean heat.

Two conclusions follow. The first is defensive: the argument that "our power stations' waste heat would be worse without the greenhouse effect" is wrong by two orders of magnitude. The second is uncomfortable: the greenhouse forcing is now comparable in magnitude to the entire rate at which our species uses energy, which is a way of saying that the atmosphere is being used as a disposal site for a by-product of energy use, and that the disposal is nearly free while the damage is not.
:::
:::

## Rerouted cycles

::: proposition The nitrogen cycle is doubled {#prop-nitrogen}
Industrial ammonia synthesis fixes about $120\ \mathrm{Tg\,N\,yr^{-1}}$, against $100$–$200\ \mathrm{Tg\,N\,yr^{-1}}$ from all terrestrial biological fixation and $5$–$10\ \mathrm{Tg\,N\,yr^{-1}}$ from lightning. Fertiliser nitrogen use efficiency is $20$–$40\%$: the rest leaves the field as nitrate in ground water, as nitrous oxide, and as ammonia to the air. About half the nitrogen in the body of a typical person alive today was fixed industrially (Erisman and others, 2008).
:::

::: proof
The mass balance is not subtle. Global fertiliser use is $\sim110\ \mathrm{Tg\,N\,yr^{-1}}$, crop removal is $\sim40$, so $\sim70\ \mathrm{Tg\,N\,yr^{-1}}$ is lost to the environment each year, on top of the losses from manure and from fixation in legume crops. The consequences are linked by that single number: eutrophication of coastal seas and the expansion of oxygen-minimum zones, nitrate in drinking water, acidification, the loss of nitrophilous grassland species in Europe, and a fifth of the warming, since nitrous oxide is a long-lived greenhouse gas with 273 times the per-molecule forcing of $\mathrm{CO_2}$ and is now the dominant remaining ozone-depleting substance.
:::

::: example Feeding eight billion people twice over, badly {#ex-nitrogen}
Cereal yields in the most intensively fertilised systems reach $12\ \mathrm{t\,ha^{-1}}$ of wheat with $250\ \mathrm{kg\,N\,ha^{-1}}$ applied. Find the nitrogen use efficiency and the surplus, and estimate the surplus over the world's $2.4\times10^{8}\ \mathrm{ha}$ of cropland at the global mean application of $110\ \mathrm{kg\,N\,ha^{-1}}$ and use efficiency of $30\%$.
::: solution
Wheat at $12\ \mathrm{t\,ha^{-1}}$ with $1.8\%$ protein contains about $1.2\ \mathrm{t\,N\,ha^{-1}}$ in grain, so $\mathrm{NUE} = 120/250 = 48\%$ and the surplus is $130\ \mathrm{kg\,N\,ha^{-1}}$. At the global mean,
$$
0.7\times110\ \mathrm{kg\,ha^{-1}}\times2.4\times10^{8}\ \mathrm{ha} = 18\ \mathrm{Tg\,N\,yr^{-1}}
$$
from cropland alone, before manure, drainage of wetlands, and the fixation in legumes.

The efficiency number is the most useful single figure in agricultural policy: the same yield can often be held with a third less fertiliser, applied at the right time and place, which is a direct reduction in nitrate, nitrous oxide and cost. It is also the reason the "organic farming could feed everyone" and "we must industrialise the tropics" arguments are both partly right and both incomplete: nitrogen is not the binding constraint everywhere, and land area, not yield, is the binding constraint on biodiversity.
:::
:::

::: proposition Phosphorus has no sky {#prop-phosphorus}
The phosphorus cycle has no significant gas phase. Mining concentrates $17\ \mathrm{Tg\,P\,yr^{-1}}$ from a few ore bodies, roughly a third of it is eaten, and the rest goes to landfill, sewage and, eventually, the sea, where it buries in sediment. There is no return flux on human timescales: the flow is one-way from mine to abyss, and the resource is geologically finite and geographically concentrated (Western Sahara and China hold most of the reserves).
:::

The contrast with carbon and nitrogen is instructive. Those cycles were perturbed by *adding* flux; phosphorus is perturbed by *concentrating* and *dispersing*. Its environmental effects — eutrophication, cyanobacterial blooms in lakes and reservoirs — occur at the far end of the flow, and its scarcity effects — depleted soils in sub-Saharan Africa, fertiliser price shocks — at the near end. Both are managed by the same lever, which is recovery: struvite precipitation from sewage, ash from incinerated waste, and the 30–40% of P that is currently lost between mine and field.

::: example The technosphere's mass {#ex-technosphere}
Produced durables and infrastructure ("the technosphere") total about $1.1\ \mathrm{Tt}$ dry, against $0.55\ \mathrm{Tt}$ of living biomass. Annual production of concrete is $30\ \mathrm{Gt}$, of aggregates $50\ \mathrm{Gt}$, of steel $1.9\ \mathrm{Gt}$, of plastics $0.4\ \mathrm{Gt}$, of which $79\%$ of the $6.3\ \mathrm{Tt}$ of plastic ever made has become waste and most of that is in landfill or the environment (Geyer and others, 2017). Estimate the annual mass flow of the technosphere and compare it with the sediment load of all the world's rivers.
::: solution
Concrete plus aggregates plus steel plus plastics is $30 + 50 + 1.9 + 0.4 \approx 82\ \mathrm{Gt\,yr^{-1}}$, of which aggregates dominate. All rivers carry $15$–$20\ \mathrm{Gt}$ of sediment to the sea each year, and agriculture alone moves $19\ \mathrm{Gt}$ of soil on cropland. So the solid materials we move each year are four to five times the entire sediment flux of the continents, and our annual construction is comparable in mass to the erosion of every farm field on Earth.

This is what "planetary force" means in a physical sense: not that we emit gases, but that we have become a geological agent of the first rank, moving rock, sorting it chemically, and building a new stratum whose signature — plastics, aluminium, concrete, radionuclides, fly ash — will be unmistakable in the sedimentary record long after the last copy of this sentence.
:::
:::

## The arithmetic of what is left

::: example Decline rates and budgets {#ex-decline}
Emissions are $40\ \mathrm{GtCO_2\,yr^{-1}}$. Under a constant fractional decline $k$, the total future emission is $E_0/k$. Compute this for $k = 0.01$, $0.03$, $0.07$, and compare with the remaining carbon budgets for $1.5\ ^\circ\mathrm{C}$ ($250\ \mathrm{GtCO_2}$) and $2\ ^\circ\mathrm{C}$ ($1150\ \mathrm{GtCO_2}$) from 2020 (IPCC AR6, 2021, Table TS.3, 50% probability).
::: solution
$E_0/k$ gives $4000$, $1330$ and $570\ \mathrm{GtCO_2}$ respectively. The $2\ ^\circ\mathrm{C}$ budget is exhausted under the first two decline rates (in $34$ and $66$ years) and is never exhausted under the third. The $1.5\ ^\circ\mathrm{C}$ budget is exhausted in $7$–$10$ years under *all* of them, because $250\ \mathrm{GtCO_2}$ is only six years of current emissions and no realistic decline curve can avoid six years.

Three things are worth taking from this. First, the $1.5\ ^\circ\mathrm{C}$ target is, on the assessed budget, already a matter of the early 2030s, and the honest description is that exceeding it and then coming back down is now the likely path. Second, the $2\ ^\circ\mathrm{C}$ target is still reachable, but only with a decline rate of order $7\%\ \mathrm{yr^{-1}}$ sustained for decades — the fastest sustained energy-system transition in history was the switch from wood to coal to oil and gas, which took about a century and achieved about $1\%\ \mathrm{yr^{-1}}$ of share shift. Third, the sensitivity is to the *rate*, not the target year: the difference between $3\%$ and $7\%$ annual decline is $760\ \mathrm{GtCO_2}$ of cumulative emission, which is most of the difference between a $2\ ^\circ\mathrm{C}$ world and a $1.8\ ^\circ\mathrm{C}$ one.
:::
:::

::: widget plot
f: 1333*(1-exp(-0.03*x))
x: 0, 100
y: 0, 1400
hlines: 250, 1150
caption: Cumulative emissions from now under a $3\%\ \mathrm{yr^{-1}}$ decline from $40\ \mathrm{GtCO_2\,yr^{-1}}$: the curve is $E_0(1 - e^{-kt})/k$ and it asymptotes to $E_0/k = 1333\ \mathrm{GtCO_2}$. The two horizontal lines are the remaining $1.5\ ^\circ\mathrm{C}$ and $2\ ^\circ\mathrm{C}$ budgets. The lower line is crossed in seven years and the upper in sixty-six. Halving the decline rate to $1.5\%$ moves the asymptote to $2670$ and the $2\ ^\circ\mathrm{C}$ crossing to about thirty-six years; raising it to $7\%$ puts the asymptote below the $2\ ^\circ\mathrm{C}$ line, so that budget is never spent. This is the whole physics of mitigation in one plot: cumulative emissions, not the date of net zero, is what sets the temperature.
:::

::: definition The Anthropocene {#def-anthropocene}
The **Anthropocene** is proposed as a geological epoch in which human activity is the dominant influence on the Earth system. The working group's candidate global boundary stratotype ("golden spike") was the sediments of Crawford Lake, Ontario, whose annual layers carry a plutonium peak from nuclear testing, a sharp rise in spherical carbonaceous particles from fossil-fuel combustion, fly ash, and a nitrogen and phosphorus signal, all in $1950$–$1954$. In March 2024 the International Union of Geological Sciences rejected the proposal, so the Anthropocene remains an informal term for the present condition rather than a formal unit of the geological time-scale.
:::

::: warning Two things this chapter's arithmetic does not license
First, it does not license the claim that population is the primary driver. Global fertility has fallen from five children per woman in 1960 to 2.3 today, and the UN's medium projection peaks world population near $10.3$ billion in the 2080s. Over the period when emissions matter, the Kaya terms of affluence and technology dominate: the richest ten per cent of households accounted for about half of cumulative consumption-based $\mathrm{CO_2}$ since 1990, and the poorest half for about ten per cent (Lan and others, 2020). Population is a real and growing term in the identity in the regions where fertility is high, and it is the wrong lever to reach for in the regions where emissions are.
Second, it does not license the opposite complacency — that growth will solve the problem on its own. The observed absolute decoupling of GDP from carbon in a few dozen countries is real, but the global rate of decline of $\mathrm{CO_2}$ per unit GDP, about $1.5\%\ \mathrm{yr^{-1}}$, is being overtaken by growth in GDP of about $3\%\ \mathrm{yr^{-1}}$, so global emissions are still rising. Decoupling at the speed required has never been achieved by any country for any large aggregate.
:::

::: quiz
Why is the "waste heat from energy use" argument for climate inaction wrong?
- [ ] Because power stations are efficient.
- [x] Because the direct heat flux is $0.037\ \mathrm{W\,m^{-2}}$, about seventy times smaller than the $2.72\ \mathrm{W\,m^{-2}}$ greenhouse forcing.
- [ ] Because waste heat is radiated to space immediately.
- [ ] Because most energy is renewable.
::: solution
The first law guarantees that essentially all energy use ends as heat, so the argument is at least physically literate — but the number is two orders of magnitude too small. The interesting comparison runs the other way: the greenhouse forcing we have created is now comparable to the total rate of energy use, which is a measure of how cheaply the atmosphere has been used as a sink.
:::
:::

::: quiz
A country reaches "net zero in 2050" with emissions falling $2\%\ \mathrm{yr^{-1}}$ until then. What does the arithmetic say?
- [ ] The temperature target is guaranteed.
- [x] Cumulative emissions will be about $E_0/k$, roughly $20$ times current annual emissions, which may or may not fit the budget.
- [ ] Only the endpoint matters.
- [ ] Nothing can be said without a model.
::: solution
Warming tracks cumulative emissions, and cumulative emissions under exponential decline are $E_0/k$: at $2\%$ from $40\ \mathrm{GtCO_2\,yr^{-1}}$ that is $2000\ \mathrm{GtCO_2}$, which exceeds the $2\ ^\circ\mathrm{C}$ budget. A net-zero date with a slow slope buys very little; the slope is the thing. This is why "net zero by 2050" and "halve by 2030" are not the same pledge, and why the second is the more informative.
:::
:::

::: history
Marsh (Marsh)'s *Man and Nature* (1864) founded the idea of human-induced environmental change, and was followed by a century of local and regional studies: geologists found the "post-Pleistocene" mammal extinctions in the 1960s, and Martin (Martin)'s overkill hypothesis of 1966 made human hunting a geological agent. Vernadsky (Vernadsky)'s noosphere, popularised in 1945, made the same claim in a cosmic register. The modern argument begins with three books: Ehrlich (Ehrlich)'s *The Population Bomb* (1968), Meadows (Meadows) and others' *The Limits to Growth* (1972), which ran world-system models to 2100 and got the timing of several constraints roughly right, and Commoner (Commoner)'s *The Closing Circle* (1971), which introduced the IPAT form. Ehrlich and Holdren (Holdren) formalised IPAT in 1971. McNeill (McNeill)'s *Something New Under the Sun* (2000) gave the century its environmental history. Crutzen and Stoermer (Stoermer) named the Anthropocene in 2000, Vitousek and others (Vitousek) in 1997 quantified how much of the land's net production humans were already appropriating, and Steffen and others (Steffen) supplied the Great Acceleration data and, in 2009, the "planetary boundaries" framework. The Anthropocene Working Group, convened in 2009, resolved in 2016 to seek formal recognition and in 2019 selected Crawford Lake as its candidate section; the proposal was defeated by a large majority of the union's executive in March 2024, an episode that will be studied for a long time as a case of science's inability to name its own present.
:::

## Where this leads

The human planet is the sum of the previous eight chapters with the human term switched on: the carbon cycle of [[earth-system/carbon-cycle]] with a $10\ \mathrm{GtC\,yr^{-1}}$ injection, the water cycle of [[earth-system/water-cycle]] with a third of accessible runoff abstracted, the nitrogen and phosphorus cycles of [[biogeochemistry/nitrogen]] and [[biogeochemistry/phosphorus-sulfur]] doubled and concentrated, the ice of [[glaciology/ice-sheets]] committed to metres, the biota of [[earth-system/life-and-planet]] at extinction rates hundreds of times background. What to do about it is a question of values, institutions and technology, and it is taken up in [[climate-change/responses]], [[earth-resources/resources-reserves]] and [[earth-resources/extraction-impacts]].

::: summary
- Human beings move $95\ \mathrm{Gt}$ of material and $600\ \mathrm{EJ}$ of energy a year; the technosphere's mass is twice that of all living things.
- Industry fixes as much nitrogen as all the world's biology and mines eighty times the natural phosphorus flux; the first is a doubling, the second a one-way pump to the sea.
- Direct waste heat is $0.037\ \mathrm{W\,m^{-2}}$, seventy times smaller than the greenhouse forcing — the danger is the by-product, not the heat.
- The Great Acceleration is a measured, synchronous regime shift beginning around 1950 in every socio-economic and biophysical series examined.
- Cumulative emissions under exponential decline are $E_0/k$: the slope of the decline, not the net-zero date, sets the temperature.
- Six of nine planetary boundaries are assessed as transgressed; the framework is a heuristic, not a set of cliffs.
- The Anthropocene is a real condition and not, as of 2024, a formal epoch.
:::

## Exercises

::: exercise Energy per dollar {level=1 check="5.7"}
World GDP is $\$105$ trillion (2017 PPP) and primary energy $600\ \mathrm{EJ}$. Find the energy intensity in $\mathrm{MJ\,\$^{-1}}$.
::: solution
$600\times10^{18}/1.05\times10^{14} = 5.7\times10^{6}\ \mathrm{J}$ per dollar, i.e. $5.7\ \mathrm{MJ\,\$^{-1}}$. In 1990 the figure was about $11\ \mathrm{MJ\,\$^{-1}}$: efficiency has improved by about $1.5\%\ \mathrm{yr^{-1}}$, which is the "technology" term of the Kaya identity and the one term moving reliably in the right direction.
:::
:::

::: exercise Carbon intensity {level=1 check="62"}
Primary energy is $600\ \mathrm{EJ}$ and energy-related $\mathrm{CO_2}$ is $37\ \mathrm{Gt}$. Find the carbon intensity in $\mathrm{kg\,CO_2\,GJ^{-1}}$.
::: solution
$37\times10^{15}\ \mathrm{kg}/6\times10^{8}\ \mathrm{GJ} = 62\ \mathrm{kg\,CO_2\,GJ^{-1}}$ for total primary energy including non-combustion sources; against combustion-only energy of about $550\ \mathrm{EJ}$ the figure is $67\ \mathrm{kg\,GJ^{-1}}$. The pure coal value is $95$, oil $73$, gas $56$: decarbonising the *supply* means driving this number below $10$.
:::
:::

::: exercise Rule of seventy {level=1 check="35"}
Find the doubling time for $2\%$ annual growth.
::: solution
$\ln 2/0.02 = 35\ \mathrm{yr}$ (the rule of 70 gives $35$). Over 140 years — four doublings — $2\%$ growth multiplies by sixteen. This is the arithmetic that makes "sustainable exponential growth" a contradiction in terms for any material throughput, and that makes the compounding of a $3\%$ economy and a $7\%$ emissions decline the central contest of the century.
:::
:::

::: exercise Nitrogen efficiency {level=2 check="0.56"}
A wheat crop yields $8\ \mathrm{t\,ha^{-1}}$ with a grain nitrogen concentration of $1.75\%$ of dry matter, after $250\ \mathrm{kg\,N\,ha^{-1}}$ of fertiliser is applied. Find the grain-level nitrogen use efficiency and the surplus.
::: solution
Grain nitrogen removed $= 8000\times0.0175 = 140\ \mathrm{kg\,N\,ha^{-1}}$, so
$$
\mathrm{NUE} = \frac{140}{250} = 0.56, \qquad \text{surplus} = 110\ \mathrm{kg\,N\,ha^{-1}} .
$$
That surplus does not disappear: it leaves as nitrate leaching to ground water, nitrous oxide, ammonia volatilisation and nitric oxide. Note also that $0.56$ is the efficiency at the *crop* gate; the efficiency of the whole food system — fertiliser to the plate, counting the feed given to livestock — is $20$–$40\%$, which is why diet is a nitrogen policy instrument as much as fertiliser practice is.
:::
:::

::: exercise Sediment against technosphere {level=2 check="4.6"}
Human construction moves $82\ \mathrm{Gt\,yr^{-1}}$ of solid material; all rivers carry $18\ \mathrm{Gt\,yr^{-1}}$ of sediment to the sea. Find the ratio.
::: solution
$82/18 = 4.6$. Add agricultural soil movement ($19\ \mathrm{Gt\,yr^{-1}}$ on cropland) and the human solid-earth flux is about five and a half times the natural fluvial one — which is why the sediment load of large rivers has been *falling* since the 1980s, both because dams trap it and because soil is being mined faster than it is delivered to the channels ([[geomorphology/landscape-evolution]], [[earth-resources/extraction-impacts]]).
:::
:::

::: exercise Cumulative emissions {level=2 check="2000"}
Emissions of $40\ \mathrm{GtCO_2\,yr^{-1}}$ decline at $2\%\ \mathrm{yr^{-1}}$ forever. Find the total future emission.
::: solution
$E_0/k = 40/0.02 = 2000\ \mathrm{GtCO_2}$, which is $1.7$ times the $2\ ^\circ\mathrm{C}$ budget from 2020. A pledge expressed only as an endpoint date is therefore almost meaningless without its slope.
:::
:::

::: exercise Land {level=3}
Agriculture uses $39\times10^{6}\ \mathrm{km^2}$ of the $103\times10^{6}\ \mathrm{km^2}$ ice-free land, of which $12\times10^{6}\ \mathrm{km^2}$ is cropland. If all cropland were abandoned and the population fed by vertical farming powered by renewables, what fraction of the ice-free land would be released, and what is the catch?
::: solution
$12/103 = 12\%$ of ice-free land, an area larger than South America. The catch is threefold. Cropland is where the yields are, and yields fall sharply on the marginal land that would be farmed first if the best land were given up. Ruminant meat cannot be produced from vertical farms, and the grazing land ($34\times10^{6}\ \mathrm{km^2}$) is mostly not croppable at all. And the biodiversity value of abandoned land depends on what was there before: on land that was forest, rewilding is a large carbon and biodiversity gain; on ancient grassland, ploughing it up to grow food and then abandoning it is neither.
:::
:::

::: exercise The Kaya identity {level=3}
Population grows $0.7\%\ \mathrm{yr^{-1}}$, GDP per head $1.8\%\ \mathrm{yr^{-1}}$, and energy intensity improves $1.5\%\ \mathrm{yr^{-1}}$. What rate of decarbonisation of energy supply is needed to hold emissions flat, and what rate to cut them $3\%\ \mathrm{yr^{-1}}$?
::: solution
Emissions grow at $0.7 + 1.8 - 1.5 - x$ where $x$ is the decarbonisation rate. Flat emissions need $x = 1.0\%\ \mathrm{yr^{-1}}$; a $3\%$ cut needs $x = 5.0\%\ \mathrm{yr^{-1}}$. For context, the observed decarbonisation of primary energy over 1990–2020 was about $1\%\ \mathrm{yr^{-1}}$, which is why global emissions went on rising while every individual term in the identity improved. The identity is not a theory of human behaviour; it is a book-keeping identity that makes the required rates unavoidable and forces the argument onto which term moves fastest.
:::
:::

::: exercise Emissions inequality {level=3}
The richest ten per cent of the world's households are estimated to be responsible for about half of consumption-based $\mathrm{CO_2}$ emissions since 1990; the poorest fifty per cent for about ten per cent. If global emissions must fall $45\%$ by 2030 from 2010 levels, compute the implied annual rate for each group under two allocations: (a) equal percentage contraction for everyone, (b) the richest decile cutting $95\%$ by 2040, the poorest half doubling its emissions over the same thirty years, and the middle four deciles holding constant.
::: solution
(a) Equal percentage contraction is $45\%$ in twenty years, i.e. $1 - 0.55^{1/20} = 3.0\%\ \mathrm{yr^{-1}}$ for everyone. (b) The rich cut $95\%$ in thirty years, $1 - 0.05^{1/30} = 9.5\%\ \mathrm{yr^{-1}}$; the poor double, $2^{1/30} - 1 = +2.3\%\ \mathrm{yr^{-1}}$. Taking the shares as $0.5$, $0.4$ and $0.1$, the 2040 total is $0.5\times0.05 + 0.4 + 0.2 = 0.625$ of the 2010 total, a fall of $37.5\%$ in thirty years or $1.6\%\ \mathrm{yr^{-1}}$ globally.

The point of the arithmetic is in the last number. Even a distributionally very aggressive path, in which the richest decile essentially stops emitting, delivers only $1.6\%\ \mathrm{yr^{-1}}$ globally if the middle four deciles do nothing — an order of magnitude short of what is required. The same global target contains wildly different obligations, and every honest climate strategy carries an implicit answer to the distribution question. The literature on carbon budgets by country, on "common but differentiated responsibilities", and on the $44\ \mathrm{GtCO_2}$ of annual emissions as a shared commons is the practical content of this chapter ([[climate-change/emissions-budgets]], [[climate-change/responses]]).
:::
:::

::: exercise Boundaries as heuristics {level=3}
Six of nine planetary boundaries are assessed as transgressed. Explain why the framework cannot be falsified by a single measurement, and give one boundary whose threshold is well constrained and one whose threshold is not.
::: solution
The thresholds are defined relative to a reference state (usually the Holocene) and to a modelled non-linearity, and for most of the nine the location of the threshold is inferred from a handful of palaeo-examples rather than measured. Ozone-depleting substances is the well-constrained case: the threshold is set by a known chemical mechanism and the boundary was quantified before the Montreal Protocol worked. Biodiversity is the weak case: the control variable (genetic, functional and structural diversity) is a composite index, the "safe" level is chosen from a target for extinction rates relative to a poorly known background rate, and the resulting boundary is a statement of values dressed as a measurement.

The right use of the framework is as a dashboard that makes the scale of human appropriation visible and comparable, and as a prompt to ask which thresholds are near and which are speculative. Its wrong use is to argue that because some boundaries are soft, all of them are.
:::
:::
