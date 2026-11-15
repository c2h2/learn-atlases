World GDP has grown for two centuries while the mix of energy has shifted from biomass to coal to oil and gas to a still-fossil-dominated mix with a rising renewable share. Carbon dioxide from energy is a flow that tracks fossil use; atmospheric $\mathrm{CO}_2$ is a stock that tracks cumulative use. **Green growth** is the claim that living standards can keep rising while that flow, and then that stock, fall. **Degrowth** is the claim that, in high-income countries, they cannot, or should not. Directed technical change is the economic mechanism that could make the first claim true: research can be steered toward clean inputs. The green paradox is a mechanism that can make a poorly timed policy raise emissions in the short run. This chapter sets out those mechanisms. It does not choose a side in the growth debate.

The climate and resource chapters already defined the SCC, Hotelling rents and renewable-resource yields. Here the objects are **energy transitions**, **innovation**, and the **decoupling** of GDP from emissions and from material use. Data come from the IEA, the World Bank, the Global Carbon Project and the IPCC. They are dated measurements, not forecasts.

Throughout, $Y$ is output, $E$ is a dirty input, $C$ is a clean input, and $A_E$, $A_C$ are their productivities. Profit is $\Pi$ when a firm appears.

## Energy and growth in the data

Two stylised facts, both sourced.

First, **primary energy use** has risen with GDP, but not one-for-one in every country and period. The IEA (*World Energy Outlook 2024*) and World Bank WDI show high-income countries with roughly stable or falling energy use per head in the 2010s–2020s while GDP per head rose — a **relative decoupling** of energy from GDP. Many middle-income countries still couple the two. Global primary energy was of the order of $600$ EJ in 2023 (IEA), still mostly fossil.

Second, **territorial $\mathrm{CO}_2$ from energy** in the EU and the UK has fallen while GDP has risen over the last two decades (Global Carbon Project / Friedlingstein et al., *Earth System Science Data*, 2024 updates; ONS and Eurostat territorial inventories). That is relative decoupling of *territorial* carbon from GDP. **Consumption-based** accounts, which add the carbon in imports and subtract exports, cut the decline but have not, in those two regions, reversed the sign in every recent year. China, India and much of Asia have rising territorial emissions with rising GDP. World $\mathrm{CO}_2$ from energy was $37.8$ Gt in 2024 (IEA, *Global Energy Review 2025*). Global GDP rose too. At the world level, carbon has not absolutely decoupled from GDP.

::: definition Decoupling {#def-decoupling}
**Relative decoupling** of an environmental pressure $P$ from GDP holds when $P/Y$ falls. **Absolute decoupling** holds when $P$ itself falls while $Y$ rises. The pressure must be named (territorial $\mathrm{CO}_2$, consumption-based $\mathrm{CO}_2$, material extraction, biodiversity) and the region and dates named. A national territorial decoupling is compatible with a rising global $P$.
:::

::: example A growth-and-intensity identity {#ex-kaya}
The Kaya identity writes
$$
\mathrm{CO}_2 = \mathrm{population} \times \frac{\mathrm{GDP}}{\mathrm{pop}} \times \frac{\mathrm{energy}}{\mathrm{GDP}} \times \frac{\mathrm{CO}_2}{\mathrm{energy}}.
$$ {#eq-kaya}
Suppose GDP per head grows at $2\%$, population at $0.8\%$, energy intensity falls at $1.5\%$, and the carbon intensity of energy falls at $1\%$. What is the growth rate of $\mathrm{CO}_2$?
::: solution
$0.8 + 2 - 1.5 - 1 = 0.3\%$. Carbon still rises. Absolute decoupling of $\mathrm{CO}_2$ from GDP would require the two intensity declines to add to more than $2.8\%$ in this example. The identity is accounting, not a model of why the intensities change.
:::
:::

Jevons (1865, *The Coal Question*) observed that a more efficient steam engine *raised* British coal use by making coal more useful. The **Jevons paradox** is the case of a rebound greater than 100 per cent: efficiency raises use. Empirical rebound estimates for household energy efficiency are typically well below 100 per cent (a common range is 10–30 per cent in high-income studies; see Gillingham, Rapson and Wagner 2016, *Review of Environmental Economics and Policy*). A rebound below 100 per cent means efficiency still cuts use; it cuts it by less than engineering arithmetic. Jevons is a possibility, not the default measurement.

## Directed technical change

Acemoglu, Aghion, Bursztyn and Hemous (2012, *American Economic Review*) modelled an economy with a dirty input and a clean input, each with its own knowledge stock. Research can be directed toward either. The market directs research toward the input that is already ahead (a **path dependence** / building-on-the-shoulders channel) and toward the input that is used more (a **market-size** channel). A dirty sector that is ahead and large attracts research, even if a carbon tax would, statically, cut its use.

::: proposition Directed research and a temporary push {#prop-aabh}
In the AABH (2012) framework, a carbon tax alone may not redirect research if the dirty technology is far ahead. A **temporary research subsidy** to the clean sector, combined with a carbon tax, can redirect innovation; once the clean knowledge stock has caught up, the subsidy can be withdrawn and the carbon tax (or a smaller one) holds the mix. Assumptions: two sectors, scientists allocate one unit of research, knowledge spillovers within each sector, a representative consumer, no international leakage of knowledge.
:::

The proposition is a mechanism for **green growth**: living standards keep growing because knowledge grows, and the mix of knowledge becomes clean. It is not a forecast that any particular subsidy will pay. It is the opposite of a degrowth mechanism, in which the only way to cut $E$ is to cut $Y$.

::: widget plot
f: 0.02*x; 0.02*x - 0.01*x
x: 0, 50
y: -0.2, 1.2
labels: \text{GDP growing at }2\%; \text{CO}_2\text{ if intensity falls }1\%\text{/yr extra}
caption: A cartoon of [[#eq-kaya]] with population held flat: GDP at $2\%$ (upper line is $0.02x$ as a log-deviation sketch — here drawn as a linear drift). The lower line subtracts an extra $1\%$ per year intensity decline. Absolute decoupling needs the intensity line to overtake GDP growth. The figure is an identity, not an IAM.
:::

::: example A two-sector research split {#ex-research-split}
One hundred scientists. The dirty sector is twice as productive in research (an existing knowledge lead). Without policy, $70$ scientists go dirty and $30$ clean. A subsidy that equalises the private return sends $50$–$50$. If each dirty scientist raises dirty productivity by $1$ unit and each clean scientist raises clean productivity by $1$ unit, what happens to the two knowledge stocks over one period, with and without the subsidy? (Normalise starting stocks at $D=200$, $C=100$.)
::: solution
Without: $\Delta D = 70$, $\Delta C = 30$, new stocks $270$ and $130$. The ratio $D/C$ goes from $2$ to $2.08$ — the lead widens. With subsidy: $\Delta D = 50$, $\Delta C = 50$, new stocks $250$ and $150$, ratio $1.67$ — the lead narrows. The temporary subsidy is a closing-the-gap policy. It is not a GDP forecast.
:::
:::

## Transitions and the green paradox

An **energy transition** is a shift in the mix of primary energy: wood to coal in the nineteenth century, coal to oil in the twentieth, and a partial shift toward gas, nuclear, hydro, wind and solar in the late twentieth and early twenty-first. Transitions historically have been *additions* more than substitutions at the global level (York and Bell 2019, *Energy Research & Social Science*; IEA historical series): coal did not vanish when oil arrived. Absolute decline of a fossil fuel has happened nationally (UK coal) under a combination of prices, policy and geology.

Sinn (2008, 2012, *The Green Paradox*) observed that a *future* carbon tax, announced today, can *raise* current fossil extraction: Hotelling owners, facing a lower future net price, move extraction forward. That is a **green paradox**. A carbon tax that starts low and rises faster than the Hotelling rate can, in some models, do the same. A tax that is already in force on current extraction, or a well-designed path, need not.

::: definition Green paradox {#def-paradox}
A **green paradox** is an increase in near-term fossil extraction (or emissions) caused by a climate policy that tightens in the future. It is a Hotelling-supply response ([[environmental-economics/non-renewable-resources#prop-hotelling]]). It is not a claim that every climate policy raises emissions, and it is not a claim that leaving fossil fuels unregulated is better.
:::

::: example Moving extraction forward {#ex-paradox}
A resource owner is indifferent between extracting today at rent $\lambda$ and extracting next year at $\lambda(1+r)$. A tax of $0$ today and $T$ next year cuts next year's rent. What happens to current extraction in a two-period Hotelling model with no extraction cost?
::: solution
The owner equates $p_1 = (p_2 - T)/(1+r)$ in present value, versus $p_1 = p_2/(1+r)$ without the tax. For a given demand, a lower future net price requires a *lower* $p_1$ to restore indifference, which means *more* period-1 extraction. That is the paradox. A tax $T$ in *both* periods, or a tax only in period 1, does not produce this particular shift. The example is Sinn's mechanism in two periods.
:::
:::

## Growth versus the environment

The **environmental Kuznets curve** (Grossman and Krueger 1995, *QJE*) is an inverted-U: some local pollutants have fallen with income after a point in some countries. It is an empirical description for some $P$, not a law, and it has not described world $\mathrm{CO}_2$. Stern (2004, *World Development*) and others documented how fragile the original EKC estimates were.

**Green-growth** policy, in the directed-technical-change sense, is a carbon price plus clean research support, plus the infrastructure that makes clean energy a substitute rather than an add-on. **Degrowth** arguments (Hickel, Kallis and others) hold that high-income material throughput cannot fall fast enough, given rebound and leakage, without a planned decline in $Y$. The IPCC AR6 WGIII (2022) assessed demand-side and supply-side mitigation; it did not adopt degrowth as a scenario family. The Integrated Assessment Models of [[environmental-economics/climate-economics]] typically have growing $Y$ and falling $E$ under a carbon price — that is an assumption of those models, visible in their production functions, not a measurement of the world.

This lesson's job is to keep those claims in their boxes. Decoupling is a measurement that must name $P$, the region and the dates. Directed technical change is a mechanism. The green paradox is a Hotelling response to a future tax. Degrowth and green growth are competing programmes that use those objects differently.

::: example UK coal as a national transition {#ex-uk-coal}
UK coal production peaked in the 1910s–1920s and has fallen to a residual (BEIS / DESNZ historical statistics; IEA). UK GDP is far above its 1920 level (ONS, Maddison). Territorial $\mathrm{CO}_2$ has fallen since the 1970s (Global Carbon Project). Name two facts this does *not* establish.
::: solution
It does not establish world decoupling: UK territorial cuts coincided with imported manufactures and with world $\mathrm{CO}_2$ rising. It does not establish that the fall was caused by a carbon price (North Sea gas, dash for gas in the 1990s, deindustrialisation, and later renewables and carbon pricing all appear in the narrative). It is a national territorial series, which is [[#def-decoupling]] with the region and the $P$ named.
:::
:::

A carbon price that is already in force, a clean-research subsidy that is temporary in the AABH sense, and infrastructure that makes wind and solar substitutes rather than add-ons are three different instruments. They can be combined. They can fail for reasons the models name: leakage, the green paradox if only the future is taxed, path dependence if the dirty knowledge stock is far ahead, rebound if efficiency is the only tool. Combining instruments is a modelling conclusion about *signs and channels*, not a policy recommendation for a named country.

::: quiz
World energy $\mathrm{CO}_2$ in 2024 was about $38$ Gt (IEA) and world GDP was higher than in 2000. This is evidence that
- [ ] green growth is impossible
- [x] absolute decoupling of *world* energy $\mathrm{CO}_2$ from world GDP had not occurred by 2024
- [ ] the environmental Kuznets curve has failed for every pollutant
::: solution
It is a measurement of world $P$ and world $Y$ over a dated period. It does not prove impossibility (intensities can still fall faster later) and it does not speak to local air pollutants, which are a different $P$.
:::
:::

::: history
**1865, William Stanley Jevons.** *The Coal Question* — efficiency and coal use.

**1995, Grossman and Krueger.** The environmental Kuznets curve paper in the *Quarterly Journal of Economics*.

**2008, Hans-Werner Sinn.** The green paradox: future climate policy and current extraction.

**2012, Acemoglu, Aghion, Bursztyn and Hemous.** Directed technical change and a temporary clean-research subsidy, *American Economic Review*.
:::

::: summary
- Relative decoupling of territorial $\mathrm{CO}_2$ from GDP is documented in some high-income regions; absolute decoupling of *world* $\mathrm{CO}_2$ from world GDP has not occurred (IEA, Global Carbon Project, dated). Consumption-based accounts narrow national territorial declines.
- The Kaya identity is accounting. Absolute decoupling requires intensity declines faster than GDP (plus population) growth.
- Directed technical change (AABH 2012) is a mechanism by which a carbon tax plus a temporary clean-research subsidy can shift the mix of knowledge. It is a model of green growth, not a forecast of a subsidy.
- The green paradox is a Hotelling response to a *future* tightening. A current tax on extraction is a different instrument.
- Jevons rebound, the EKC, green growth and degrowth are distinct claims. Measure $P$, name the model, and do not treat an IAM path as a measurement.
:::

## Exercises

::: exercise Kaya arithmetic {level=1 check="0.5"}
Population $+1\%$, GDP per head $+2\%$, energy/GDP $-1.5\%$, $\mathrm{CO}_2$/energy $-1\%$. Report the growth rate of $\mathrm{CO}_2$ in per cent.
::: solution
$1+2-1.5-1 = 0.5$.
:::
:::

::: exercise Absolute decoupling {level=1}
In [[#ex-kaya]], how large must the annual fall in carbon intensity of energy be, holding the other three rates fixed, for $\mathrm{CO}_2$ to be flat?
::: solution
$0.8+2-1.5 - x = 0 \Rightarrow x = 1.3\%$. Carbon intensity of energy must fall at $1.3\%$ a year, not $1\%$.
:::
:::

::: exercise Rebound {level=1 check="80"}
An engineering estimate says a more efficient boiler cuts gas use by $10$ units. Rebound is $20\%$. Report the actual cut.
::: solution
$10 \times (1-0.20) = 8$.
:::
:::

::: exercise Path dependence {level=2}
Dirty knowledge $A_E = 4$, clean $A_C = 1$. Research returns are proportional to the existing stock (a shoulders-of-giants specification). If $80$ scientists go where the return is higher and $20$ are stuck in the other sector, which sector gets the $80$, and what happens to $A_E/A_C$?
::: solution
The dirty sector pays four times the research return, so it gets the $80$. Additive research ($A \leftarrow A + S$): $A_E$ goes from $4$ to $84$, $A_C$ from $1$ to $21$, and $84/21 = 4$ — the ratio is unchanged. Multiplicative research ($\dot A = \eta S A$): $A_E$ grows at a rate four times $A_C$'s, and the ratio *widens*. AABH use a version of the multiplicative spillover. Path dependence is the widening, not the additive cartoon.
:::
:::

::: exercise Green paradox sign {level=2}
A carbon tax starts today at a constant $T$ forever. In a two-period Hotelling model with no cost, does current extraction rise or fall? Contrast with a tax of $0$ today and $T$ tomorrow.
::: solution
A constant $T$ in both periods cuts both periods' rents by $T$. With no extraction cost, $p_t - T$ plays the role of rent; the Hotelling rule is on $p_t - T$. Demand in both periods faces a higher consumer price if $T$ is passed through, so *total* extraction over the two periods falls (or is unchanged if demand is inelastic and the resource is exhausted either way). The *timing* need not shift toward today. A tax only tomorrow *does* shift extraction toward today. The paradox is about the *path* of the tax, not about the existence of a tax.
:::
:::

::: exercise Territorial versus consumption {level=2}
A country offshores its steel mills. Territorial $\mathrm{CO}_2$ falls by $10$ Mt. The steel is now imported, and the foreign mills emit $12$ Mt for that output. What happens to consumption-based $\mathrm{CO}_2$? To world $\mathrm{CO}_2$?
::: solution
Consumption-based $\mathrm{CO}_2$ *rises* by $2$ Mt (the $10$ territorial cut is replaced by $12$ of imported carbon). World $\mathrm{CO}_2$ rises by $2$ Mt if the foreign mills are dirtier, or is unchanged if they emit $10$. National territorial decoupling can coincide with a worse world total. That is leakage in another hat ([[environmental-economics/international-agreements#def-leakage]]).
:::
:::

::: exercise Temporary subsidy {level=3}
In AABH, the clean-research subsidy is temporary. Why does the model not need the subsidy forever? What real-world friction would make a permanent subsidy necessary?
::: hint
Once $A_C$ has caught up, market-size and shoulders-of-giants work *for* clean.
:::
::: solution
After the clean knowledge stock has crossed a threshold, the market-size and building-on-shoulders channels reinforce clean research: more clean production, more clean scientists, a self-sustaining switch. The subsidy can then be withdrawn, leaving a carbon tax to handle residual dirty use. Permanent subsidy would be needed if spillovers leak abroad (home pays, foreign copies), if dirty incumbents keep a political or network advantage that the knowledge stock does not capture, or if clean knowledge depreciates. Those are extra frictions, not in the 2012 baseline.
:::
:::

::: exercise A debate, not a theorem {level=3}
A commentator says "the EKC shows that growth solves pollution" and another says "Kaya shows that growth makes climate policy impossible". Write two sentences that put each claim in contact with this chapter's definitions, without declaring a winner.
::: solution
The EKC is an inverted-U estimated for *some* local pollutants in *some* countries; it is not a law for world $\mathrm{CO}_2$, which has risen with world GDP. Kaya is an identity: growth of $Y$ raises $\mathrm{CO}_2$ *given* intensities, and does not make intensity decline impossible — it names how fast intensity must fall for absolute decoupling. One commentator over-generalises a local empirical curve; the other treats an identity as a constraint on technology. Directed technical change and measured decoupling (territorial and consumption-based, named and dated) are the objects that can settle pieces of the dispute; neither slogan is a result.
:::
:::
