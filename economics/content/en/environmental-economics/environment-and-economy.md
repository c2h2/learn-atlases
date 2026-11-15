A steel mill on a river sells rolled coil at a competitive price. Its private costs — ore, coke, labour, capital — are all on the invoice. What is not on the invoice is the load of sulphur and fine particles that falls on the town downwind, or the oxygen demand that kills fish downstream. Households and fishers bear those costs; the mill does not. The market that looks efficient in the mill's own accounts is then too large, and the river is too dirty, relative to the allocation that would maximise the sum of mill profit and the welfare of everyone else.

That gap between private and social cost is the organising idea of environmental economics. This chapter makes it precise. We first treat the environment as a source of materials and a sink for waste, using the **materials-balance** identity that every tonne of input must eventually become product or residual. We then write pollution as an **externality**, derive the efficiency condition that **marginal social cost** equal **marginal social benefit**, and compute the deadweight loss of leaving the externality unpriced. Property rights and the Coase argument are the private alternative to a tax or a standard; their limits — transaction costs, many victims, an open-access resource — explain why environmental policy exists. The last sections ask what it would mean for an economy to be **sustainable** and how far green accounting (genuine saving, inclusive wealth) can tell us whether we are.

The first welfare theorem of [[microeconomics/welfare-theorems]] is the right starting point: a competitive equilibrium is Pareto efficient *if* every good that matters is priced. Environmental economics is the study of what happens when that "if" fails.

## Materials balance and the two roles of the environment

Matter is conserved. Ayres and Kneese (1969) used that fact, elementary in physics, to rewrite the circular flow of the economy. Let $M$ be the mass of materials (including fossil fuels) extracted from the environment in a period, $Q$ the mass of goods produced, $R$ the mass of residuals discharged back to air, water and land, and $\Delta I$ the change in the mass of goods held as inventory or durable capital. Then, ignoring the small relativistic footnote,

$$
M = Q + R - \Delta I.
$$ {#eq-materials}

In a steady state with $\Delta I = 0$, residuals equal extractions: *everything taken from nature returns as waste*, either promptly (smoke, effluent) or after the good is discarded. Recycling delays the return; it does not repeal the identity. The environment therefore has two economic roles that the circular-flow diagram of principles textbooks omits.

::: definition Source and sink {#def-source-sink}
The environment is a **source** when it supplies flows of materials and energy (ores, timber, fish, fossil fuels, wind, sunlight) and a **sink** when it receives residuals (carbon dioxide, sulphur, plastic, heat, nutrients). **Environmental quality** is the third, amenity and life-support, role: clean air, a stable climate, biodiversity and landscape. Source and sink services are rival; amenity is often non-rival.
:::

A tonne of coal burned in a power station is a source flow; the carbon dioxide and fly ash are sink flows; the reduced visibility and the contribution to climate change are losses of amenity. Because the three roles compete for the same physical systems — a forest is timber, a carbon sink and a habitat — using the environment in one role has an opportunity cost in the others.

::: example A materials-balance check {#ex-materials}
A small economy extracts $M = 80$ million tonnes of materials in a year, produces $Q = 55$ million tonnes of goods, and adds $\Delta I = 5$ million tonnes to the stock of buildings and durables. What mass of residuals must it discharge? If recycling recovers $12$ million tonnes of scrap that would otherwise have been extracted, what happens to $M$ and to $R$?
::: solution
From [[#eq-materials]], $R = M - Q + \Delta I = 80 - 55 + 5 = 30$ million tonnes. Recycling of $12$ million tonnes, used as an input in place of virgin material, can reduce extractions to $M' = 68$ million tonnes. If output and inventory accumulation are unchanged, residuals fall to $R' = 68 - 55 + 5 = 18$ million tonnes. Recycling lowers both the source draw and the sink load; it does not make $R$ zero, because the $55$ million tonnes of goods will themselves become residuals when they depreciate.
:::
:::

The identity is an accounting constraint, not a behavioural model. It says that "more output with less waste" has a physical limit unless the composition of output changes (towards services and long-lived durables) or the energy system stops using the atmosphere as a free carbon sink. That is the right background for the later debate on green growth ([[environmental-economics/green-growth]]).

## Pollution as an externality

::: definition Externality {#def-externality}
An **externality** is an unpriced effect of one agent's production or consumption on another agent's production or consumption. It is **negative** when the effect is a cost (smoke, congestion, over-fishing of a shared stock) and **positive** when it is a benefit (a beekeeper's bees pollinating an orchard). An externality is **pecuniary** when it operates only through prices (a new café bidding up local rents); pecuniary externalities do not by themselves disturb the efficiency of a complete competitive market. Environmental economics is concerned with **technological** (non-pecuniary) externalities.
:::

Write the steel mill's output as $q$ and let $p(q)$ be the inverse demand for steel — the marginal private benefit $\mathrm{MPB}(q)$, which here is also the marginal social benefit if steel consumers capture the whole of their willingness to pay. Let $C(q)$ be the mill's private cost, so marginal private cost is $\mathrm{MPC}(q) = C'(q)$. Let $D(q)$ be the money value of downstream and downwind damage, with $D' > 0$ and $D'' \ge 0$. **Marginal damage** is $\mathrm{MD}(q) = D'(q)$.

::: definition Marginal social cost and benefit {#def-msc-msb}
**Marginal social cost** is $\mathrm{MSC}(q) = \mathrm{MPC}(q) + \mathrm{MD}(q)$. **Marginal social benefit** is $\mathrm{MSB}(q) = \mathrm{MPB}(q)$ when the only externality is on the cost side. (If consumption itself is dirty, $\mathrm{MSB} = \mathrm{MPB} - \mathrm{MD}$.) An allocation $q$ is **efficient** when it maximises social surplus $\displaystyle\int_0^{q} \bigl(\mathrm{MSB}(x) - \mathrm{MSC}(x)\bigr)\,\dd x$, which for interior $q$ requires $\mathrm{MSB}(q) = \mathrm{MSC}(q)$.
:::

::: proposition Efficiency at MSC $=$ MSB {#prop-msc-msb}
Assume $\mathrm{MSB}$ is continuous and strictly decreasing, $\mathrm{MSC}$ is continuous and strictly increasing, and $\mathrm{MSB}(0) > \mathrm{MSC}(0)$. Then there is a unique efficient output $q^*$ defined by

$$
\mathrm{MSB}(q^*) = \mathrm{MSC}(q^*).
$$ {#eq-efficient}

A competitive mill that ignores $D$ supplies $q^m$ defined by $\mathrm{MPB}(q^m) = \mathrm{MPC}(q^m)$. If $\mathrm{MD}(q) > 0$ on the relevant range, $q^m > q^*$ and the deadweight loss is

$$
\mathrm{DWL} = \int_{q^*}^{q^m} \bigl(\mathrm{MSC}(q) - \mathrm{MSB}(q)\bigr)\,\dd q > 0.
$$ {#eq-dwl}

Assumptions: a single mill (or a competitive industry whose $\mathrm{MPC}$ is the horizontal sum of firm costs), well-defined money damages, no other distortions, and interior solutions.
:::

::: proof
Social surplus $W(q) = \int_0^q \mathrm{MSB} - \int_0^q \mathrm{MSC}$ has $W'(q) = \mathrm{MSB}(q) - \mathrm{MSC}(q)$ and $W''(q) < 0$ by the slope assumptions, so $W'(q^*) = 0$ is necessary and sufficient for a unique maximum. The mill maximises profit $p(q)q - C(q)$ (or, equivalently, competitive firms set $p = \mathrm{MPC}$), which yields $q^m$. Because $\mathrm{MSC}(q) - \mathrm{MPC}(q) = \mathrm{MD}(q) > 0$, the $\mathrm{MSC}$ schedule lies above $\mathrm{MPC}$, so it intersects the falling $\mathrm{MSB}$ schedule at a smaller quantity. For $q \in (q^*, q^m)$ we have $\mathrm{MSC}(q) > \mathrm{MSB}(q)$, and [[#eq-dwl]] is the area of that gap.
:::

The first welfare theorem fails because a relevant good — clean air, or the absence of damage — is not priced. That is a missing market, not a failure of competition as such. A monopolist mill would already restrict $q$, and might even overshoot $q^*$ from the other side; market structure and externalities are separate problems.

::: widget plot
f: 4+(1+d)*x; 24-2*x; 4+x
sliders: d=2:0:4:0.1
x: 0, 12
y: 0, 36
labels: \text{MSC}; \text{MSB}; \text{MPC}
caption: Quantity of the dirty good is on the horizontal axis, price (marginal value) on the vertical. Drag $d$, the slope of marginal damage. At $d=0$ the three curves collapse to a single competitive equilibrium. As $d$ rises, $\mathrm{MSC}$ pivots up, the efficient quantity shrinks, and the unregulated market (where $\mathrm{MPC}=\mathrm{MSB}$) stays put. The vertical gap between $\mathrm{MSC}$ and $\mathrm{MSB}$ to the right of the efficient point is marginal deadweight loss.
:::

::: example A mill, a river and a tax {#ex-mill}
Inverse demand for the mill's output is $p = 24 - 2q$. Private marginal cost is $\mathrm{MPC} = 4 + q$ and marginal damage is $\mathrm{MD} = 2q$, with $q$ in thousands of tonnes and prices in units of money per tonne. Find the competitive output and price, the efficient output, the Pigouvian tax that supports it, and the deadweight loss of laissez-faire. (Enter the efficient quantity.)
::: solution
Market equilibrium: $24 - 2q = 4 + q$, so $20 = 3q$ and $q^m = 20/3 \approx 6.67$, at price $p^m = 24 - 40/3 = 32/3 \approx 10.67$. Efficiency: $\mathrm{MSC} = 4 + q + 2q = 4 + 3q$, so $24 - 2q = 4 + 3q$ gives $20 = 5q$ and $q^* = 4$. The supporting tax is $t^* = \mathrm{MD}(q^*) = 8$, levied per tonne of output (or of the associated effluent, if effluent is proportional to $q$). At $q^*$ the mill's private cost plus tax is $4 + 4 + 8 = 16$, which equals both $\mathrm{MSB}(4) = 16$ and $\mathrm{MSC}(4) = 16$. Deadweight loss is the triangle of height $\mathrm{MSC}(q^m) - \mathrm{MSB}(q^m) = 24 - 32/3 = 40/3$ and base $20/3 - 4 = 8/3$:

$$
\mathrm{DWL} = \tfrac12 \cdot \tfrac83 \cdot \tfrac{40}{3} = \tfrac{160}{9} \approx 17.78.
$$

A uniform tax of $8$ on output restores $q^*$ only because damage is tied one-for-one to output. If the mill can abate (scrubbers, fuel switching), the tax should sit on the *residual*, not on $q$; that is the next chapter.
:::
:::

::: quiz
In [[#ex-mill]], a journalist reports that "the mill is making a profit, so it cannot be producing too much." What is wrong with the claim?
- [ ] Profits are always a sign of efficiency, by the first welfare theorem
- [x] Private profit ignores downstream damage; efficiency is about social surplus, not the mill's accounts
- [ ] The mill must be a monopolist if it makes a profit
- [ ] Damage is a pecuniary externality and does not affect efficiency
::: solution
Profit is revenue minus *private* cost. Social surplus subtracts damage as well. A competitive mill can earn positive producer surplus at $q^m$ and still be too large. The first welfare theorem requires complete markets, which are missing here. Damage in the example is technological, not pecuniary.
:::
:::

The Pigouvian tax $t^* = \mathrm{MD}(q^*)$ is one way to install the missing price. It is not the only way, and under uncertainty it is not always the best way ([[environmental-economics/policy-instruments]]). Two remarks are worth making at once.

::: remark Output taxes, residual taxes and the second best
If damage depends on emissions $e$ rather than on output $q$, and if $e = e(q, a)$ can be reduced by abatement $a$, then the efficient tax is on $e$, at $t = \mathrm{MD}(e^*)$. Taxing $q$ would give no incentive to fit a scrubber. If other markets are already distorted (a labour tax, a tariff), the first-best Pigouvian formula is a benchmark, not a plug-in policy; the second-best tax can be smaller or larger than $\mathrm{MD}$ (Bovenberg and de Mooij 1994). This course uses the first-best formula unless a second-best constraint is stated.
:::

::: warning Shifts versus movements, private versus social
A common diagram error is to shift *demand* when the externality is on the production side. Downstream damage raises $\mathrm{MSC}$ above $\mathrm{MPC}$; it does not change buyers' willingness to pay. Another is to read the market price at $q^m$ as a social valuation of the last unit. That price equals $\mathrm{MPC}$, not $\mathrm{MSC}$. The social cost of the last unregulated unit is the height of $\mathrm{MSC}$, which in [[#ex-mill]] is $24$, not $10.67$.
:::

## Property rights, Coase and open access

Pigou's remedy assumes that the state can measure $\mathrm{MD}$ and collect a tax. Coase (1960) asked a different question: if the mill and the fishers can bargain, do we need a tax?

::: proposition Coase theorem (costless bargaining) {#prop-coase}
Suppose property rights over the river are well defined and tradable, bargaining is costless, information is complete and there are no income effects (quasi-linear utility). Then the mill and the victims reach $q^*$, and the initial assignment of rights affects the distribution of surplus but not the allocation. If the mill has the right to pollute, victims pay it to cut back to $q^*$; if victims have a right to a clean river, the mill pays them for the residual damage at $q^*$.
:::

::: proof
With quasi-linear payoffs the joint surplus is exactly $W(q)$ from the proof of [[#prop-msc-msb]], independent of transfers. Costless bargaining with complete information attains the joint maximum. Transfers implement whichever distribution the initial rights imply. Uniqueness of $q^*$ then gives invariance of the allocation.
:::

The theorem is a benchmark, not a description of the Ganges, the Niger Delta or a city of eight million breathing $\mathrm{PM}_{2.5}$. Transaction costs rise with the number of parties; rights over the atmosphere are not well defined; victims may not know the dose–response; and bargaining with a mill that can exit to another jurisdiction is not costless. Coase's own conclusion was that the law should assign rights so as to minimise the cost of the remaining transactions — a comparative-institution argument, not a claim that "the market will sort it out".

::: example Bargaining over a river {#ex-coase}
A mill facing a competitive price of $12$ has cost $C(q) = q^2$, so profit is $12q - q^2$. A single fishery has payoff $40 - q^2$ (damage $D(q) = q^2$). Bargaining is costless and preferences are quasi-linear. What output do they agree on? If the mill holds the right to pollute, what is the range of transfers from the fishery to the mill that both will accept?
::: solution
Marginal private cost is $2q$ and marginal damage is $2q$, so $\mathrm{MSC} = 4q$. Efficiency sets $12 = 4q$, hence $q^* = 3$. Unregulated, the mill sets $2q = 12$ and produces $q^m = 6$. Mill profit falls from $12\cdot 6 - 36 = 36$ at $q^m$ to $12\cdot 3 - 9 = 27$ at $q^*$, a loss of $9$. The fishery's payoff rises from $40 - 36 = 4$ to $40 - 9 = 31$, a gain of $27$. Any transfer $T$ with $9 \le T \le 27$ makes both parties at least as well off as at $q^m$ and implements $q^*$. Joint surplus rises by $27 - 9 = 18$, which is also the deadweight-loss triangle $\tfrac12 \cdot (6-3) \cdot (24-12) = 18$ (at $q=6$, $\mathrm{MSC}=24$ and $\mathrm{MSB}=12$).
:::
:::

Open access is the polar case in which *no one* holds the relevant right.

::: definition Open access and the commons {#def-open-access}
A resource is **open access** when anyone may use it without a use right that excludes others. Hardin's (1968) "tragedy of the commons" is the prediction that open access dissipates rent: users enter until the average return equals the outside opportunity cost, and the stock is over-worked relative to the rent-maximising level. A **common-property** regime, by contrast, is a set of rules among a defined group — Ostrom (1990) documented many that do not collapse — and is not the same as open access.
:::

The fishery of [[environmental-economics/renewable-resources]] is the canonical model. Climate change is an open-access *sink*: any country may discharge carbon dioxide into a shared atmosphere. Local irrigation systems, inshore fisheries and alpine pastures often look more like Ostrom's governed commons than like Hardin's pasture. The right first question is therefore "what is the property-rights regime?", not "is this a commons, hence doomed?".

::: intuition Missing prices, not missing ethics
Nothing in [[#prop-msc-msb]] requires the mill owner to be malicious. Faced with a zero price of the river, a cost-minimising mill uses a lot of river. Faced with a tax or a permit price equal to $\mathrm{MD}(q^*)$, the same mill cuts back. The economic diagnosis of pollution is a missing price, which is why the next chapter is about instruments that install one. Ethics enters when we ask *whose* damage counts and at what discount rate ([[environmental-economics/cost-benefit-analysis]]); it does not replace the missing-price diagnosis.
:::

## Weak and strong sustainability

Brundtland's *Our Common Future* (World Commission on Environment and Development, 1987) defined sustainable development as development that "meets the needs of the present without compromising the ability of future generations to meet their own needs". Economists translated that sentence into statements about capital stocks.

::: definition Weak and strong sustainability {#def-sustainability}
**Weak sustainability** requires that *aggregate* capital — manufactured, human and natural, valued at accounting prices — not fall. Natural and other forms of capital are substitutes at the margin. **Strong sustainability** requires that specified natural stocks (or the services they provide) be maintained on their own: a stable climate, critical ecosystems, a non-declining fish biomass. Substitution is limited, and some forms of natural capital are **critical**.
:::

The weak criterion is Solow's (1974) and Hartwick's (1977). In a closed economy that lives off an exhaustible resource and manufactured capital, constant consumption is feasible if resource rents are invested in capital — the **Hartwick rule** — and if substitution in production is easy enough (Cobb–Douglas is the textbook case). Dasgupta and Heal (1979) showed how badly things go if the elasticity of substitution between the resource and capital is below one: depletion then drives consumption to zero even under a utilitarianism that cares about the future.

::: proposition Hartwick's rule (Cobb–Douglas sketch) {#prop-hartwick}
Consider a closed economy with production $F(K, R) = K^\alpha R^{1-\alpha}$, $0 < \alpha < 1$, an exhaustible resource $\dot S = -R$, capital $\dot K = F - C$, and no depreciation or population growth. A competitive path that invests Hotelling rents $\partial F/\partial R \cdot R$ in capital, and consumes the rest, keeps $C$ constant. Assumptions: interior extraction, perfect foresight, the Hotelling rule for the resource price, and substitutability of the Cobb–Douglas form.
:::

::: proof
Let $F_R = \partial F/\partial R = (1-\alpha) K^\alpha R^{-\alpha}$ and $F_K = \alpha K^{\alpha-1} R^{1-\alpha}$. The Hartwick policy is $\dot K = F_R R = (1-\alpha) F$, so $C = F - \dot K = \alpha F$. Along a Hotelling path $F_R$ rises at the interest rate $F_K$. Differentiating $C = \alpha K^\alpha R^{1-\alpha}$ with respect to time and substituting $\dot K = (1-\alpha)F$ and $\dot R$ from the Hotelling condition $\dot F_R = F_K F_R$ yields $\dot C = 0$. (The algebra is the statement that the fall in $R$ is exactly offset, in Cobb–Douglas, by the rise in $K$ financed by the rent.)
:::

::: quiz
A country reports positive GDP growth, negative genuine saving, and a shrinking fish stock that its biologists call critical. Which statement is consistent with the definitions in this chapter?
- [ ] Weak sustainability is satisfied because GDP is growing
- [ ] Strong sustainability is satisfied because genuine saving is the right indicator
- [x] Weak sustainability fails this year, and strong sustainability fails if the fish stock is critical natural capital
- [ ] Both criteria are satisfied as long as a Hartwick fund exists on paper
::: solution
Genuine saving is the operational check for weak sustainability; it is negative, so the weak criterion fails this year. GDP growth is neither necessary nor sufficient. Strong sustainability additionally requires the critical stock itself not to fall. A fund that is not actually receiving the resource rent does not implement Hartwick.
:::
:::

Strong sustainability rejects the substitution that makes this proof go through. Daly (1991) and other ecological economists treat the economy as a subsystem of the biosphere, with a scale that can exceed ecological carrying capacity even if genuine saving is positive. Climate, biodiversity and the ozone layer are offered as candidates for critical natural capital: no amount of extra factories compensates for a collapsed West Antarctic ice sheet. The two views are not reconciled by a single first-order condition. Weak sustainability is a useful *necessary* check — an economy that is running down *all* of its capital is not sustainable on any definition — but it is not sufficient if some stocks are critical.

::: example Investing a resource rent {#ex-hartwick}
A small oil exporter earns rent of $30$ units this year on extracted barrels (price minus marginal extraction cost, times quantity). Manufactured investment is $18$ and depreciation of the capital stock is $10$. Human-capital expenditure (education) is $7$. Pollution damage, valued at accounting prices, is $4$. Under the World Bank's genuine-saving logic, is weak sustainability satisfied this year?
::: solution
Genuine (adjusted net) saving starts from net saving, subtracts resource depletion and damage, and adds education:

$$
\mathrm{GS} = \underbrace{(18 - 10)}_{\text{net saving}} - 30 - 4 + 7 = -19.
$$

The country is consuming its oil wealth rather than replacing it. Weak sustainability fails this year. Norway's approach — routing petroleum rent into a sovereign fund that holds financial claims on *other* countries' capital — is an open-economy version of Hartwick: the fund is the $K$ that is supposed to replace $S$. The arithmetic above is the closed-economy analogue, and it is a warning, not a forecast of collapse; one year of negative genuine saving can be offset later.
:::
:::

## Green national income

GDP is a measure of produced output, not of welfare and not of sustainability. It counts the mill's steel and does not subtract the fishers' losses; it counts expenditure on dialysis that air pollution made necessary as a *gain*. Hicks (1939) defined income as the maximum one can consume while keeping capital intact. **Green net national product** tries to be that number.

::: definition Green NNP and genuine saving {#def-green-nnp}
**Green net national product** is consumption plus the value of net investment in *all* capital stocks, using accounting prices:

$$
\mathrm{NNP}^G = C + p_K \dot K + p_S \dot S - p_D \cdot \text{(damage flow)},
$$

where $p_S < 0$ for a shrinking exhaustible stock ($\dot S < 0$ then contributes a negative term) and $p_D$ values pollution. **Genuine saving** (adjusted net saving) is the value of net investment, $\mathrm{NNP}^G - C$. A theorem of Weitzman (1976) and subsequent work by Hamilton and Clemens (1999) says that, in a theoretically complete account, welfare is rising if and only if genuine saving is positive — *under the weak-sustainability, perfect-foresight, complete-price hypotheses of the model*.
:::

The World Bank publishes Adjusted Net Savings in the World Development Indicators, subtracting energy, mineral and net forest depletion and particulate-damage estimates from net national saving and adding education expenditure (World Bank WDI, series on adjusted net savings, accessed 2026). Coverage and valuation are incomplete: climate damages, biodiversity and many groundwater stocks are missing or crude, so a positive published figure is not a certificate of sustainability. It is still more informative than GDP growth alone. Inclusive-wealth accounts (UNEP, *Inclusive Wealth Report*) try to price the stocks rather than the flows; they remain experimental and sensitive to discount rates and shadow prices.

::: application GDP, storms and the broken-window fallacy
A hurricane destroys houses and a coastal wetland. Reconstruction raises measured GDP. Green NNP subtracts the destruction of manufactured and natural capital when it happens, and counts reconstruction as replacing what was lost, not as a windfall. The example is the environmental version of Bastiat's broken window: activity that restores a stock is not the same as activity that raises one. Disaster accounting in national statistics has improved since the 1990s, but satellite environmental accounts (SEEA) are still incomplete in most countries.
:::

## Evidence

Several magnitudes fix the scale of the missing prices.

The World Health Organization estimates that ambient (outdoor) air pollution caused $4.2$ million premature deaths in 2019, and that ambient and household air pollution together were associated with $6.7$ million premature deaths — about one in eight deaths that year (WHO fact sheet on ambient air quality and health, 2019 estimates; WHO 2024 update of SDG indicator 3.9.1). Some $89\%$ of the ambient-pollution deaths were in low- and middle-income countries, with the largest totals in the WHO South-East Asia and Western Pacific regions. These figures are burden-of-disease estimates, not laboratory counts; they combine exposure maps with concentration–response functions and are revised as those functions change.

Energy-related carbon dioxide emissions reached $37.8$ Gt $\mathrm{CO}_2$ in 2024, a new high, up $0.8\%$ on 2023 (IEA, *Global Energy Review 2025*). Atmospheric $\mathrm{CO}_2$ averaged about $422.5$ ppm in 2024, roughly half as high again as the pre-industrial level (IEA, same report). Fossil fuels still supplied about $80\%$ of global primary energy demand in 2023, while renewables supplied about $30\%$ of *electricity* (IEA, *World Energy Outlook 2024*). Per-person territorial emissions remain uneven: of the order of $14$–$15$ tonnes $\mathrm{CO}_2$ in the United States, around $8$ tonnes in China, around $2$ tonnes in India, with oil-exporting Gulf states higher still (Global Carbon Project / territorial inventories, early 2020s). Historical *cumulative* emissions, which are what a stock pollutant cares about, are a different ranking: the United States and Europe still dominate the stock; China dominates the current flow.

Adjusted net savings vary sharply among resource exporters. Countries that invest rents (the textbook citation is Norway's petroleum fund) can post positive genuine saving while extracting oil; countries that consume rents can post negative genuine saving despite GDP growth (World Bank, *The Changing Wealth of Nations* and the Adjusted Net Savings database). The numbers are only as good as the shadow prices of oil, minerals and pollution, which is why [[#def-green-nnp]] is a framework for measurement rather than a single trusted decimal.

None of these observations by itself tells us the efficient $q^*$. Deaths and tonnes are not units of money; converting them is the subject of [[environmental-economics/valuing-the-environment]]. They do tell us that the unpriced sink and amenity roles of the environment are large relative to ordinary market activity, which is why the efficiency gap in [[#eq-dwl]] is a first-order fact rather than a curiosity.

## Where this leads

Once $\mathrm{MSC} = \mathrm{MSB}$ is the target, the question is how to hit it. [[environmental-economics/policy-instruments]] compares standards, taxes and tradable permits and shows, following Weitzman (1974), that the two price-and-quantity instruments that coincide under certainty part company when marginal costs are uncertain. Putting a number on $\mathrm{MD}$ requires valuation methods and, for long-lived damages, a discount rate ([[environmental-economics/valuing-the-environment]], [[environmental-economics/cost-benefit-analysis]]). Resources that are stocks rather than flows — oil, fish, forests — need the dynamic apparatus of Hotelling and Faustmann. Climate change puts all of these pieces on a global open-access sink.

::: history
**1920, A. C. Pigou.** *The Economics of Welfare* distinguished the private and social net product of an activity and proposed taxes and bounties to close the gap. The word "externality" came later; the diagram of [[#prop-msc-msb]] is Pigou's.

**1960, Ronald Coase.** "The Problem of Social Cost" (*Journal of Law and Economics*) recast the same gap as a bargaining problem over rights, and directed attention to transaction costs.

**1968–1969.** Garrett Hardin's "The Tragedy of the Commons" (*Science*, 1968) and Ayres and Kneese's "Production, Consumption, and Externalities" (*American Economic Review*, 1969) gave the open-access and materials-balance languages that environmental economics still uses. Elinor Ostrom's later case studies (*Governing the Commons*, 1990) qualified Hardin without restoring the first welfare theorem: governed commons are institutions, not missing prices supplied by nature.
:::

::: summary
- The materials-balance identity says that extractions from the environment return as residuals; the environment is a source, a sink and an amenity ([[#def-source-sink]], [[#eq-materials]]).
- A technological externality is an unpriced physical effect. Efficiency requires $\mathrm{MSC}(q^*)=\mathrm{MSB}(q^*)$; an unregulated competitive market sets $\mathrm{MPC}=\mathrm{MPB}$ and over-produces a dirty good ([[#prop-msc-msb]]).
- A Pigouvian tax $t^*=\mathrm{MD}(q^*)$ on the damaging residual supports $q^*$. An output tax does so only if emissions are proportional to output.
- The Coase theorem is an invariance result under costless bargaining and well-defined rights; it does not erase transaction costs, open access or the atmosphere ([[#prop-coase]], [[#def-open-access]]).
- Weak sustainability keeps aggregate capital intact (Hartwick's rule is the exhaustible-resource case); strong sustainability protects critical natural stocks on their own ([[#def-sustainability]], [[#prop-hartwick]]).
- Green NNP and genuine saving are Hicksian attempts to measure the weak criterion; published World Bank figures are incomplete and are not a substitute for a climate or biodiversity constraint ([[#def-green-nnp]]).
:::

## Exercises

::: exercise Market versus social cost {level=1 check="8"}
Inverse demand is $p = 30 - q$, $\mathrm{MPC} = 6 + q$ and $\mathrm{MD} = q$. Find the efficient quantity $q^*$. (Enter $q^*$.)
::: solution
$\mathrm{MSC} = 6 + 2q$. Set $30 - q = 6 + 2q$, so $24 = 3q$ and $q^* = 8$. The unregulated market solves $30 - q = 6 + q$, or $q^m = 12$. The supporting tax is $\mathrm{MD}(8) = 8$.
:::
:::

::: exercise Deadweight loss {level=1 check="24"}
In the previous exercise, compute the deadweight loss of the unregulated market as the area of the triangle between $\mathrm{MSC}$ and $\mathrm{MSB}$ from $q^*$ to $q^m$. (Enter the DWL.)
::: hint
The gap $\mathrm{MSC}-\mathrm{MSB}$ at $q^m$ is the height of a triangle of base $q^m - q^*$.
:::
::: solution
At $q^m = 12$, $\mathrm{MSB} = 18$ and $\mathrm{MSC} = 6 + 2\cdot 12 = 30$, so the height is $12$. The base is $12 - 8 = 4$. $\mathrm{DWL} = \tfrac12 \cdot 4 \cdot 12 = 24$.
:::
:::

::: exercise Residuals from the identity {level=1 check="19"}
A region extracts $M = 50$ million tonnes of materials, produces $Q = 36$ million tonnes of goods and adds $\Delta I = 5$ million tonnes to inventories and durables. Using [[#eq-materials]], what is the mass of residuals $R$ in million tonnes? (Enter $R$.)
::: solution
$M = Q + R - \Delta I$ rearranges to $R = M - Q + \Delta I = 50 - 36 + 5 = 19$.
:::
:::

::: exercise Unregulated output with constant MD {level=2 check="9"}
Inverse demand is $p = 40 - 2q$, $\mathrm{MPC} = 4 + 2q$ and $\mathrm{MD} = 4$ (constant). Find the unregulated competitive quantity $q^m$. (Enter $q^m$.)
::: solution
The mill equates $\mathrm{MPB}$ to $\mathrm{MPC}$: $40 - 2q = 4 + 2q$, so $36 = 4q$ and $q^m = 9$. Efficiency would set $40 - 2q = 8 + 2q$, hence $q^* = 8$ and $t^* = 4$. Because marginal damage is a constant, the Pigouvian tax does not depend on $q$.
:::
:::

::: exercise Genuine saving {level=2 check="-9"}
Gross investment is $20$, depreciation of produced capital is $8$, resource depletion (rent on extracted oil) is $15$, pollution damage is $3$ and education expenditure is $7$. Compute genuine saving. (Enter the signed number.)
::: solution
Genuine saving $= (20 - 8) - 15 - 3 + 7 = 12 - 15 - 3 + 7 = -9$. Weak sustainability fails in this year: the country is not replacing the oil wealth it is consuming.
:::
:::

::: exercise Coase transfers {level=2 check="9"}
In [[#ex-coase]] the mill holds the right to pollute. What is the *smallest* transfer from the fishery to the mill that the mill will accept in a bargain that implements $q^*$? (Enter that transfer.)
::: solution
The mill's profit falls by $9$ when output is cut from $6$ to $3$. The mill therefore requires at least $9$. (The fishery will pay up to $27$.)
:::
:::

::: exercise Consumption externality {level=3}
A competitive market has inverse demand $p = 20 - q$ and inverse supply $\mathrm{MPC} = 2 + q$. Each unit consumed imposes marginal damage $\mathrm{MD} = 3$ on bystanders (second-hand smoke, congestion). Find $q^m$, $q^*$ and the efficient unit tax on *consumption*. Sketch which curve shifts.
::: hint
A consumption externality lowers $\mathrm{MSB}$ below inverse demand; supply is the $\mathrm{MSC}$ of production if production is clean.
:::
::: solution
The unregulated market ignores damage: $20 - q = 2 + q$ gives $q^m = 9$, $p^m = 11$. Social benefit is $\mathrm{MSB} = 20 - q - 3 = 17 - q$. Efficiency: $17 - q = 2 + q$ so $15 = 2q$ and $q^* = 7.5$. The tax $t^* = 3$ on consumption, paid by buyers, shifts the demand curve they present to the market down by $3$ and implements $q^*$. Production $\mathrm{MPC}$ is not shifted. Deadweight loss is $\tfrac12 \cdot (9 - 7.5) \cdot 3 = 2.25$.
:::
:::

::: exercise Deriving the Hartwick consumption level {level=3}
In the Cobb–Douglas economy of [[#prop-hartwick]], $F = K^{\alpha} R^{1-\alpha}$ and the Hartwick policy is $\dot K = F_R R$. Show that $C = \alpha F$. Then, using Euler's theorem, interpret $\alpha F$ as the competitive payment to capital.
::: hint
$F_R R = (1-\alpha)F$ for this technology.
:::
::: solution
$F_R = (1-\alpha) K^{\alpha} R^{-\alpha}$, so $F_R R = (1-\alpha) K^{\alpha} R^{1-\alpha} = (1-\alpha)F$. Then $C = F - \dot K = F - (1-\alpha)F = \alpha F$. Euler's theorem for a linearly homogeneous $F$ says $F = F_K K + F_R R$; the competitive payment to capital is $F_K K = \alpha F$, which is exactly consumption under Hartwick. The resource rent $F_R R$ is the part of output that must be saved if capital is to replace the shrinking resource.
:::
:::

::: exercise A missing market, formally {level=3}
There are two consumers with quasi-linear utility $u_i = x_i + v_i(q) - D_i(e)$, $i=1,2$, a numeraire $x_i$, a consumption good $q$ produced at cost $C(q)$, and emissions $e = q$ (no abatement). Consumer 1 buys $q$; both suffer $D_i$. Write the first-order conditions of the competitive equilibrium and of the social planner, and exhibit the Pigouvian tax that aligns them.
::: hint
The planner maximises $v_1(q) + v_2(0) - C(q) - D_1(q) - D_2(q)$ if only consumer 1 values the good; more generally replace $v_2(0)$ by whatever the second consumer's valuation of $q$ is. Here take $v_2$ independent of $q$.
:::
::: solution
Competitive buyers set $v_1'(q^m) = p$ and the firm sets $C'(q^m) = p$, so $v_1'(q^m) = C'(q^m)$. Damages do not appear. The planner maximises $v_1(q) - C(q) - D_1(q) - D_2(q)$, hence $v_1'(q^*) = C'(q^*) + D_1'(q^*) + D_2'(q^*)$. A tax $t^* = D_1'(q^*) + D_2'(q^*)$ on the firm's emissions (here on $q$) makes the firm set $C'(q) + t^* = p = v_1'(q)$, which is the planner's condition. Each victim's $D_i'$ must be *added*; charging only one of them would under-correct. This is why a public bad with many victims is not a Coase setting.
:::
:::

::: exercise Open access versus a right {level=2}
Ten identical firms dump effluent into a lake. Firm $i$'s private marginal benefit is $12 - e_i$. Total effluent $E = \sum_j e_j$ imposes a cost $0.5 E$ on *each* of the ten firms. Find the symmetric Nash dump $e^N$ and the joint-profit-maximising dump $e^*$. Why does asking each firm to "be public-spirited" not scale when $n$ is large?
::: solution
An extra unit dumped by $i$ costs $i$ itself $0.5$ and costs the other nine firms $0.5$ each. Nash internalises only $0.5$: $12 - e_i = 0.5$, so $e^N = 11.5$ and $E^N = 115$. Joint maximisation internalises the full $0.5 \times 10 = 5$: $12 - e_i = 5$, so $e^* = 7$ and $E^* = 70$. Open access over-uses the lake because each firm counts $1/n$ of social damage. Public spirit would require every firm to put equal weight on every other firm's loss; that extra-rational demand grows with $n$. A price $t = 4.5$ (the uninternalised damage) or a cap on $E$ installs the missing price instead.
:::
:::
