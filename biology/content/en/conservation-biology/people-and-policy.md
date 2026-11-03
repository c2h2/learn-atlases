At independence in 1990, wildlife in Namibia's communal lands — the farming and herding areas where most rural people live — had been devastated by war, drought and poaching. Under the colonial system, wild animals belonged to the state; for the farmers whose crops elephants trampled and whose livestock lions killed, they were a cost with no benefit. In 1996 Namibia changed the law so that communities could register **conservancies**, with defined boundaries and elected committees, and gain rights to manage and benefit from the wildlife on their land — through tourism partnerships, regulated trophy hunting and the use of meat. Over the following decades more than 80 conservancies were registered, covering about a fifth of the country. In the north-west, populations of desert-adapted elephants, black rhinos, lions and mountain zebras recovered substantially, and income from conservation reached communities that had previously gained nothing from wildlife. The programme has had serious difficulties — dependence on hunting and tourism income that collapsed during the COVID-19 pandemic, unequal sharing of benefits, conflicts with predators, and population crashes during the severe drought of 2019 — but it changed the question from "how do we keep people out?" to "how do we make wildlife worth keeping for the people who live with it?"

Every earlier chapter has assumed that someone will act on its science: set aside the reserve, stop the harvest, fund the translocation, pass the law. This chapter is about those actions. We begin with the ecology and economics of **sustainable use** — how much of a population can be harvested, and why harvests so often collapse; turn to the **economic value** of nature and the instruments that try to make conservation pay; review the **international agreements** and national laws within which conservation operates; and end with the relationship between conservation and the people who live with biodiversity. The population models come from [[ecology/population-growth]], and the threats from [[conservation-biology/extinction]].

## Sustainable use

### Maximum sustainable yield

A population that is held below its carrying capacity grows, and the growth can be harvested indefinitely without reducing the population. How much can be taken?

::: proposition Maximum sustainable yield of the logistic model {#prop-msy}
Suppose a population grows logistically, $dN/dt = rN(1 - N/K)$, and is harvested at a constant rate $H$ (individuals or biomass per unit time). A sustainable harvest keeps the population at an equilibrium where $H = rN(1 - N/K)$, the **surplus production**. The largest such harvest, the **maximum sustainable yield**, is

$$
\mathrm{MSY} = \frac{rK}{4}, \qquad\text{taken from a population held at } N_\mathrm{MSY} = \frac{K}{2}.
$$ {#eq-msy}

With a constant quota $H < \mathrm{MSY}$ there are two equilibria; the upper is stable and the lower unstable, so a population pushed below the lower equilibrium by a bad year collapses to extinction if the quota is not reduced. With a constant **harvest rate** (a fixed proportion $F$ of the population taken per unit time, $H = FN$) the single equilibrium $N^* = K(1 - F/r)$ is stable for any $F < r$.
:::

::: proof
Surplus production $P(N) = rN - rN^2/K$ is a downward parabola with maximum where $dP/dN = r - 2rN/K = 0$, at $N = K/2$, giving $P(K/2) = rK/4$. For a quota $H < rK/4$, the line $P = H$ cuts the parabola twice, at $N_1 < K/2 < N_2$. Above $N_2$ and below $N_1$, $P(N) < H$ and the population decreases; between them it increases. So $N_2$ attracts and $N_1$ repels: starting below $N_1$, the population declines to zero. For a proportional harvest, $dN/dt = rN(1 - N/K) - FN = (r - F)N - rN^2/K$, a logistic equation with intrinsic rate $r - F$ and positive, stable equilibrium $K(1 - F/r)$ when $F < r$.
:::

::: widget plot
f: r*x*(1 - x/K); H
x: 0, 10000
y: 0, 1500
sliders: r=0.4:0.1:1:0.05; K=10000:5000:10000:500; H=800:0:1500:10
labels: \text{surplus production } rN(1 - N/K); \text{quota } H
caption: Surplus production of a logistically growing stock (tonnes per year, vertical) against stock size $N$ in tonnes (horizontal), with a constant quota $H$. Where the line cuts the parabola there are two equilibria: the right one is stable, the left one a tipping point below which the stock collapses. Raise $H$ towards $rK/4$ (1000 t with the defaults) and watch the two equilibria close in on $K/2$ — the closer a quota is set to MSY, the smaller the margin for error.
:::

::: example Setting a quota {#ex-msy}
A fish stock has $r = 0.4$ per year and $K = 10\,000$ tonnes. (a) What is its MSY, and at what stock size? (b) A quota of 960 tonnes per year is set. Find the two equilibria. (c) After a recruitment failure, the stock is estimated at 3500 tonnes. What happens if the quota is kept, and what if it is converted to a harvest rate of 0.192 per year (the rate that gives 960 tonnes at the upper equilibrium)?
::: solution
(a) $\mathrm{MSY} = 0.4\times10\,000/4 = 1000$ tonnes per year, at $N = 5000$ tonnes.

(b) Solve $0.4N(1 - N/10\,000) = 960$: $N^2 - 10\,000N + 24\,000\,000 = 0$, so $N = 5000 \pm \sqrt{25\,000\,000 - 24\,000\,000} = 5000 \pm 1000$: $N_1 = 4000$ (unstable) and $N_2 = 6000$ tonnes (stable).

(c) At 3500 tonnes, surplus production is $0.4\times3500\times0.65 = 910$ tonnes, less than the quota of 960: the stock shrinks, production falls further, and the stock is driven to collapse unless the quota is cut. With a harvest rate of 0.192, the catch at 3500 tonnes would be $0.192\times3500 = 672$ tonnes, below production; the stock recovers towards $K(1 - 0.192/0.4) = 5200$ tonnes. Fixed quotas are dangerous when stocks fluctuate; harvest-rate or **harvest control rules**, which cut catches as the stock declines, are much safer.
:::
:::

::: warning "MSY is a safe target"
MSY is calculated from a model whose parameters are uncertain, for a stock whose productivity varies from year to year, and it sits exactly at the point where the margin between the two equilibria vanishes. Aiming at it means often exceeding it. The collapse of the northern cod off Newfoundland, where catches were set from optimistic stock assessments until the fishery was closed by a moratorium in 1992 with the loss of tens of thousands of jobs, is the classic case; the stock had still not recovered decades later. The United Nations Fish Stocks Agreement (1995) adopted the **precautionary approach**, treating the fishing mortality that gives MSY as a limit to stay below, not a target. Harvest strategies also need to allow for multi-species interactions, the selective removal of large individuals, and evolutionary responses such as earlier maturation in heavily fished stocks.
:::

### Open access and the tragedy of the commons

Biology sets the limits of sustainable use; economics determines whether those limits are respected. H. Scott Gordon (1954) analysed a fishery in which anyone may fish — **open access** — using the surplus-production model.

::: proposition The Gordon–Schaefer model {#prop-gordon}
Let fishing effort $E$ (boats, or boat-days) catch $qEN$ per unit time, where $q$ is the **catchability**, so that the stock obeys $dN/dt = rN(1 - N/K) - qEN$. At equilibrium $N = K(1 - qE/r)$, and the sustainable catch is

$$
Y(E) = qEK\left(1 - \frac{qE}{r}\right),
$$ {#eq-schaefer}

which is maximal at $E_\mathrm{MSY} = r/2q$. If fish sell at price $p$ and effort costs $c$ per unit, sustainable profit is $\pi(E) = pY(E) - cE$.

- Under **open access**, boats enter as long as there is any profit, so effort rises until $\pi = 0$: the **bionomic equilibrium**, at which the stock is $N_\infty = c/(pq)$.
- A **sole owner** maximising profit would choose the effort of **maximum economic yield**, $E_\mathrm{MEY} = \dfrac{r}{2q}\left(1 - \dfrac{c}{pqK}\right) < E_\mathrm{MSY}$, leaving a larger stock and a positive profit (the **resource rent**).
:::

::: proof
At equilibrium $rN(1 - N/K) = qEN$, so $N = K(1 - qE/r)$ and the catch is $qEN = qEK(1 - qE/r)$; differentiating, $dY/dE = qK(1 - 2qE/r) = 0$ at $E = r/2q$. Profit is zero when $pqEN = cE$, that is $N = c/(pq)$. Maximising $\pi(E) = pqKE(1 - qE/r) - cE$ gives $pqK(1 - 2qE/r) = c$, whence $E_\mathrm{MEY}$. Since $c > 0$, $E_\mathrm{MEY} < r/2q$.
:::

::: example Open access versus ownership {#ex-gordon}
A fishery has $r = 0.4$ per year, $K = 10\,000$ tonnes and catchability $q = 0.0005$ per vessel-year. Fish sell for 2000 dollars per tonne, and a vessel costs 3000 dollars a year to run. Compare the stock, catch and profit at open access, at MSY and at MEY.
::: solution
**Open access**: $N_\infty = c/(pq) = 3000/(2000\times0.0005) = 3000$ tonnes; effort $E = (r/q)(1 - N/K) = 800\times0.7 = 560$ vessels; catch $= qEN = 0.0005\times560\times3000 = 840$ tonnes; profit $= 0$.

**MSY**: $E = r/2q = 400$ vessels, $N = 5000$ tonnes, catch 1000 tonnes, profit $= 2000\times1000 - 3000\times400 = 800\,000$ dollars per year.

**MEY**: $E = 400(1 - 3000/(2000\times0.0005\times10\,000)) = 400\times0.7 = 280$ vessels; $N = 10\,000(1 - 0.35) = 6500$ tonnes; catch $= 0.0005\times280\times6500 = 910$ tonnes; profit $= 1\,820\,000 - 840\,000 = 980\,000$ dollars per year.

Open access uses twice as many boats as MEY to catch less fish from a stock less than half as large, and dissipates all the profit. MEY catches slightly less than MSY but at much lower cost, with a larger, safer stock. If the price rose or costs fell (subsidies, better technology), $N_\infty = c/(pq)$ would fall further — possibly below levels from which the stock can recover. Subsidies to fishing fleets, which reduce $c$, therefore drive overexploitation; reducing harmful subsidies is Target 18 of the Kunming–Montreal framework.
:::
:::

::: widget plot
f: p*5*x*(1 - x/800)/1000000; cc*x/1000000
x: 0, 800
y: 0, 4
sliders: p=2000:500:4000:50; cc=3000:500:8000:100
labels: \text{sustainable revenue}; \text{cost of effort}
caption: The Gordon–Schaefer fishery of [[#ex-gordon]]: sustainable revenue $pY(E)$ and cost $cE$, in millions of dollars per year, against fishing effort $E$ in vessels. Profit is the vertical gap between them; open access drives effort to where the lines cross (560 vessels with the defaults), and the sole owner chooses the effort where the gap is widest (280 vessels). Lower the cost, as a fuel subsidy would, and watch the open-access effort move to the right, beyond the maximum of the revenue curve — overfishing in both the biological and the economic sense.
:::

Garrett Hardin's essay "The tragedy of the commons" (1968) generalised the argument: when many users share a resource that none owns, each gains the full benefit of taking more but bears only a fraction of the cost of depletion, so the resource is overused. Elinor Ostrom, in *Governing the Commons* (1990), showed that the tragedy is not inevitable. Studying fisheries, forests, pastures and irrigation systems from Switzerland and Japan to Nepal and Spain, she found many communities that had sustained common resources for centuries through institutions they designed themselves, and identified **design principles** of successful commons: clearly defined boundaries and membership; rules matched to local conditions; participation of users in making the rules; monitoring by people accountable to the users; graduated sanctions; accessible means of resolving conflicts; recognition of the community's rights by higher authorities; and, for large systems, nested layers of governance. Ostrom shared the Nobel Memorial Prize in Economic Sciences in 2009. Hardin's tragedy is a tragedy of *open access*, not of common property — and Namibia's conservancies are an attempt to turn the first into the second.

### Discounting and the economics of extinction

::: proposition Clark's argument: when depletion pays {#prop-clark}
Let a renewable resource worth $p$ per unit grow at intrinsic rate $r$ at low density, and let money earn a real return (discount rate) $\delta$. Harvesting a unit now and investing the proceeds earns $\delta p$ per year; leaving it in the population yields, at best, about $rp$ per year in additional growth. If $\delta > r$, a profit-maximising owner who does not value the resource for its own sake does better by liquidating the stock than by harvesting it sustainably, unless harvesting costs rise steeply as the stock declines (Colin Clark, 1973).
:::

This is a heuristic rather than a full optimal-control solution — Clark's analysis includes harvesting costs that rise as the stock falls, which can make it unprofitable to take the last individuals — but it explains a great deal. Slow-growing species such as whales (with $r$ of a few per cent per year), old-growth trees, sharks and deep-sea fishes have growth rates below typical commercial discount rates, so their economic incentive points towards depletion. Sustainable use is most likely to pay for fast-growing species and when the users have secure, long-term rights and low discount rates.

::: example Should the whales be saved? {#ex-clark}
A whale population has $r = 0.04$ per year and $K = 100\,000$ animals. (a) What is its MSY, and what is the ratio of the annual sustainable catch to the value of the stock held at $K/2$? (b) Compare the present value of harvesting MSY forever with that of killing the whole stock of $K/2$ at once, at a discount rate of 5 % per year. (c) What does the comparison leave out?
::: solution
(a) $\mathrm{MSY} = 0.04\times100\,000/4 = 1000$ whales per year from a stock of 50 000: a return of 2 % per year on the stock.

(b) The present value of a perpetual annual catch of 1000 whales worth $p$ each is $1000p/0.05 = 20\,000p$ ([[#eq-pv]] below, with a constant benefit for ever). Killing the 50 000 whales at once is worth $50\,000p$ now — two and a half times as much. On these assumptions, an owner maximising present value would liquidate the stock, as the commercial whaling industry in effect did, species by species, in the twentieth century.

(c) The comparison ignores the cost of finding the last whales (which rises steeply), the effect of a flood of whale products on their price, the value of whales other than as products (tourism, existence value, their role in marine ecosystems) and the interests of future generations, whose welfare a market discount rate counts very little. The International Whaling Commission's moratorium on commercial whaling, adopted in 1982 and in effect from the 1985–1986 season, reflects a decision that these other values outweigh the commercial calculation; several whale populations, such as humpbacks in many ocean basins, have since recovered substantially.
:::
:::

## The value of nature

The language of **ecosystem services** ([[conservation-biology/biodiversity#def-values]]) is partly an attempt to bring the instrumental values of nature into decisions dominated by markets. When a forest is cleared, the timber and the farmland are sold; the flood control, carbon storage, pollination and recreation it provided are lost without appearing in anyone's accounts. Economists call these **externalities**. Valuing them makes the trade-off visible.

Several methods are used. **Market prices** apply where services are traded (fish, timber, tourism). **Avoided-cost** and **replacement-cost** methods ask what it would cost to provide the service artificially (a water-treatment plant, a sea wall). **Revealed-preference** methods infer value from behaviour, as in the travel costs people pay to visit a park or the premium on house prices near green space. **Stated-preference** methods (contingent valuation) ask people what they would pay for a change — the only way to estimate non-use values such as the existence of a species, and the most contested. Benefits arriving at different times are compared by discounting.

::: definition Present value and discounting {#def-pv}
The **present value** of a stream of benefits $B_t$ received in years $t = 0, 1, 2, \dots, T$ at a discount rate $\delta$ is

$$
\mathrm{PV} = \sum_{t=0}^{T}\frac{B_t}{(1 + \delta)^t},
$$ {#eq-pv}

and a constant benefit $B$ received every year for ever, starting in a year's time, has present value $B/\delta$. The choice of $\delta$ is partly an ethical judgement about how much the welfare of future people should count: the Stern Review on the economics of climate change (2006) used a low rate (about 1.4 % per year), while many governments use 3–7 %.
:::

::: example New York's water {#ex-water}
In the 1990s New York City faced a choice. Its drinking water came from the Catskill and Delaware watersheds, and federal rules would require it to build a filtration plant unless it could show that the watershed was protected well enough to keep the water clean. Use illustrative round figures of the order commonly cited: a plant costing 6 billion dollars to build plus 0.3 billion dollars a year to operate, or a watershed programme costing 1.5 billion dollars up front (land purchase, upgraded sewage and farm management) plus 0.1 billion dollars a year. Compare the present values at a discount rate of 4 % per year, treating annual costs as perpetuities.
::: solution
Filtration: $6 + 0.3/0.04 = 6 + 7.5 = 13.5$ billion dollars. Watershed protection: $1.5 + 0.1/0.04 = 1.5 + 2.5 = 4.0$ billion dollars. Protecting the watershed is cheaper by about 9.5 billion dollars in present value, and it brings co-benefits (habitat, recreation, flood regulation) that the plant does not.

New York chose the watershed programme in a 1997 agreement with upstate communities, and has kept its exemption from filtration since. The case is often cited as proof that ecosystem services can pay for conservation. It is a strong case because the service had a clear beneficiary able to pay, a clear engineered alternative and a clear price; most ecosystem services lack one or more of these, which is why valuation alone rarely decides conservation questions.
:::
:::

Estimates of the global value of ecosystem services, such as Robert Costanza and colleagues' figure of about 33 trillion dollars per year (1997), later revised upwards, show the scale of dependence but are not prices at which nature could be bought — most services have no substitutes at any price. More useful are the specific estimates on which decisions turn: IPBES (2016) estimated that more than three-quarters of the leading global food crop types benefit from animal pollination, and that the annual global crop output at risk from pollinator loss was worth 235–577 billion US dollars (in 2015 dollars). The *Dasgupta Review* for the UK Treasury (2021) argued that natural capital should be treated as an asset in national accounts like produced and human capital, and estimated that the stock of natural capital per person had declined by nearly 40 % between 1992 and 2014 while produced capital per person had doubled.

::: warning "Valuing nature in money captures everything that matters"
Monetary valuation captures instrumental values, imperfectly, and is useful when decisions are made in money. It does not capture intrinsic values by definition, it handles relational and cultural values poorly, and it depends on the income of those whose willingness to pay is measured — a poor community's dependence on a forest can appear small in dollars. The IPBES *Values Assessment* (2022) concluded that decisions based on a narrow set of market values are a major underlying cause of biodiversity loss, and recommended considering several kinds of value explicitly. Valuation is a tool for exposing hidden trade-offs, not an algorithm that settles them.
:::

### Instruments that make conservation pay

- **Payments for ecosystem services** (PES) pay landholders to manage land in ways that provide services. Costa Rica's national programme, started in 1997 and funded largely by a fuel tax and water fees, pays landowners to protect forest and to plant trees. Forest cover in Costa Rica rose markedly over the following decades; how much of the rise the payments caused is debated, since many enrolled forests were not under threat, and counterfactual studies have found modest additional effects ([[conservation-biology/protected-areas#def-matching]]).
- **REDD+** (reducing emissions from deforestation and forest degradation) channels payments for avoided forest carbon emissions, under the UN climate convention and in voluntary carbon markets, whose credits have repeatedly been found to overstate avoided deforestation when baselines are inflated.
- **Biodiversity offsets** compensate for unavoidable damage from development by creating or restoring equivalent habitat elsewhere, as the last step of the **mitigation hierarchy**: avoid, minimise, restore on site, and only then offset. England's **biodiversity net gain** rule, mandatory for most new developments since February 2024 under the Environment Act 2021, requires developers to deliver at least a 10 % gain in habitat value, measured with a statutory metric.
- **Certification** (of sustainable timber, fish or palm oil) and **disclosure** requirements for businesses (Target 15 of the Kunming–Montreal framework) use markets and investors to reward better practice.

::: example How big must an offset be? {#ex-offset}
A road will destroy 10 ha of species-rich grassland. The developer proposes to restore grassland on former arable land. Restored grassland is expected, on average, to reach half the ecological value of the original after 20 years, and only 70 % of such restorations succeed. (a) How many hectares must be restored to compensate, on average, for the loss, ignoring the delay? (b) If future gains are discounted at 4 % per year to reflect the 20-year delay, how large must the offset be? (c) What should be considered before an offset is accepted at all?
::: solution
(a) Each restored hectare delivers an expected $0.5\times0.7 = 0.35$ hectare-equivalents, so $10/0.35 = 28.6$ ha are needed — a multiplier of about 2.9.

(b) Discounting the delayed gain by $1.04^{20} = 2.19$ raises the multiplier to $2.86\times2.19 = 6.3$, so about 63 ha.

(c) Whether the loss could be **avoided** or **minimised** (rerouting the road), which comes first in the mitigation hierarchy; whether the original grassland is irreplaceable — ancient species-rich grassland can take centuries to form and may not be restorable at all, in which case no offset is adequate; whether the offset site would otherwise have been restored anyway (additionality); and how the offset will be secured, managed and monitored in perpetuity.
:::
:::

## International agreements and national law

Biodiversity crosses borders and markets, and conservation is governed by a web of treaties.

| agreement | year | what it does |
|---|---|---|
| Ramsar Convention on Wetlands | 1971 | designation and wise use of wetlands of international importance |
| World Heritage Convention | 1972 | protection of sites of outstanding universal value, natural and cultural |
| CITES | 1973 (in force 1975) | regulation of international trade in listed species |
| Convention on Migratory Species (Bonn) | 1979 | conservation of migratory species across their ranges |
| Convention on Biological Diversity | 1992 (in force 1993) | conservation, sustainable use and benefit sharing; national strategies; the global biodiversity frameworks |
| Cartagena (2000) and Nagoya (2010) Protocols | | biosafety of living modified organisms; access to genetic resources and benefit sharing |
| UN Fish Stocks Agreement | 1995 | precautionary management of straddling and migratory fish stocks |
| Agreement on Biodiversity Beyond National Jurisdiction | 2023 (in force 2026) | marine protected areas and environmental assessment on the high seas |

**CITES** lists species in three appendices. **Appendix I** covers species threatened with extinction, in which international commercial trade is essentially prohibited; **Appendix II** species in which trade is allowed under permits only if an export is not detrimental to the species' survival; and **Appendix III** species listed by a single country seeking cooperation in controlling trade. The listing of the African elephant in Appendix I in 1989, banning the international ivory trade from 1990, was followed by recovery in many populations; but poaching surged again in the late 2000s, and the Great Elephant Census (2016) counted about 352 000 savanna elephants in 18 countries and estimated a decline of about 30 % between 2007 and 2014. In 2021 the IUCN, recognising African forest and savanna elephants as separate species, listed the forest elephant as Critically Endangered and the savanna elephant as Endangered. Whether controlled legal trade (for example, one-off sales of stockpiled ivory, as in 1999 and 2008) reduces or stimulates poaching remains contested.

The **Convention on Biological Diversity** works through ten-year frameworks. Its Strategic Plan for 2011–2020 set 20 **Aichi Biodiversity Targets**; the fifth *Global Biodiversity Outlook* (2020) concluded that none had been fully achieved by 2020 and only six partially. Its successor, the **Kunming–Montreal Global Biodiversity Framework**, adopted at the fifteenth Conference of the Parties in Montreal in December 2022, has four goals for 2050 and 23 targets for 2030, including:

- Target 2: at least 30 % of degraded ecosystems under effective restoration ([[conservation-biology/restoration]]);
- Target 3: at least 30 % of land and inland waters and of coastal and marine areas effectively conserved ("30 by 30", [[conservation-biology/protected-areas]]), with respect for the rights of Indigenous peoples and local communities;
- Target 4: halt human-induced extinction of known threatened species and maintain genetic diversity ([[conservation-biology/conservation-genetics]]);
- Target 6: reduce the rates of introduction and establishment of invasive alien species by at least 50 % ([[conservation-biology/invasions-climate]]);
- Target 7: reduce excess nutrients lost to the environment and the overall risk from pesticides by at least half;
- Target 18: reduce incentives harmful to biodiversity, including subsidies, by at least 500 billion US dollars a year;
- Target 19: mobilise at least 200 billion US dollars a year for biodiversity from all sources, with international finance to developing countries of at least 20 billion dollars a year by 2025 and 30 billion by 2030.

Countries are to translate the targets into national biodiversity strategies and report on progress, with the first global review of collective progress set for the seventeenth Conference of the Parties (COP17), hosted by Armenia in 2026. At COP16 (Cali, 2024) parties also established the "Cali Fund" for sharing benefits from the use of digital sequence information on genetic resources and a permanent subsidiary body for Indigenous peoples and local communities. As of 2026, assessments of whether the 2030 targets are on track are only beginning; the experience of the Aichi Targets is a reminder that targets are easier to adopt than to meet.

**National laws** do much of the real work. The United States Endangered Species Act (1973) prohibits the "take" of listed species, requires federal agencies to ensure that their actions do not jeopardise them, and provides for the designation of critical habitat and recovery plans; the bald eagle, delisted in 2007, is among its successes, though most listed species have not yet recovered enough to be delisted. The European Union's Birds Directive (1979) and Habitats Directive (1992) established the **Natura 2000** network, covering about 18 % of the EU's land area, and its Nature Restoration Regulation (2024) added binding restoration targets.

::: quiz
A trade in live specimens of a tortoise threatens wild populations. The species is not yet threatened with extinction, but scientists fear that it will be if exports continue at current levels. Under CITES, what listing is most appropriate?
- [ ] Appendix I: all commercial international trade prohibited
- [x] Appendix II: trade allowed only with permits based on a finding that exports are not detrimental to the species
- [ ] Appendix III: listing by one country to obtain help in controlling its exports
- [ ] No listing, because CITES applies only to endangered species
::: solution
Appendix II is intended for species not necessarily now threatened with extinction but that may become so unless trade is strictly controlled. The exporting country must make a scientific "non-detriment finding" before issuing permits. If the species became threatened with extinction, the parties could move it to Appendix I.
:::
:::

## People and conservation

For much of its history, conservation in many countries followed what critics call the **fortress** model: protected areas were created by excluding the people who lived in and used them, sometimes by forced eviction. This caused great injustice, alienated the people whose support conservation most needed, and often failed on its own terms, since excluded communities had no stake in the reserve's survival. Since the 1980s, approaches have shifted towards **community-based conservation** — integrated conservation and development projects, community-based natural resource management such as Zimbabwe's CAMPFIRE programme (from 1989) and Namibia's conservancies (from 1996) — and towards **rights-based** approaches, which recognise the land rights of Indigenous peoples and local communities and require their **free, prior and informed consent** for actions on their lands. The scale is large: Garnett and colleagues (2018) found that Indigenous peoples manage or have tenure rights over at least 38 million km² of land in 87 countries, about a quarter of the land surface, much of it in relatively good ecological condition.

These approaches are not a panacea. Community programmes can fail when benefits are small, captured by elites or slow to arrive; wildlife can cost rural people dearly through crop raiding and attacks on livestock and people (**human–wildlife conflict**); and the interests of local people, national governments and distant conservationists genuinely differ. Successful programmes tend to share features that echo Ostrom's design principles: secure rights, real benefits, local participation in rules, effective monitoring and accountability.

::: intuition Who pays, and who benefits?
Much of the world's biodiversity is in low-income tropical countries and on land managed by rural people, while many of the benefits of conserving it — a stable climate, the existence of species, genetic resources for medicine and agriculture — accrue globally. If the costs of conservation fall locally and its benefits are diffuse, conservation will be underfunded and resisted where it matters most. Much of conservation policy — international finance targets, payments for ecosystem services, benefit-sharing for genetic resources, tourism and hunting revenues shared with communities — is an attempt to realign who pays with who benefits.
:::

### Evidence and decisions

Conservation decisions are made with limited money and incomplete information. Two ideas help. **Evidence-based conservation** (William Sutherland and colleagues, 2004) argues that interventions should be chosen on the basis of systematic evidence of what works, as in medicine, rather than on experience and anecdote; the *Conservation Evidence* project summarises tests of thousands of interventions, from bat boxes to predator fences. **Decision science** frames choices explicitly: define objectives, list the actions, predict the outcomes and their uncertainties, and choose the actions that achieve most for the money — including, controversially, **triage**, accepting that some species cannot be saved with the resources available, so that resources go where they will make most difference. **Adaptive management** treats each action as an experiment, monitoring its results and adjusting.

Finally, the direct drivers of biodiversity loss ([[conservation-biology/extinction]]) rest on indirect drivers — consumption, trade, population, technology, governance and values. The IPBES *Transformative Change Assessment* (2024) argued that halting biodiversity loss would require fundamental changes in these: in how food is produced and consumed, in subsidies and finance, and in the values that guide decisions. Conservation biology supplies the evidence of what is being lost and what works to save it. What societies do with that evidence is a political choice.

::: application A conservation success, analysed
The recovery of the humpback whale illustrates how the pieces of this chapter fit together. Overexploitation, driven by open access and by economics of the kind in [[#prop-clark]], reduced many populations to a few per cent of their former size. International agreement — protection of humpbacks from 1966 and the IWC moratorium from 1985–1986 — removed the threat; CITES Appendix I listing prevented international trade; national laws and marine protected areas protected breeding and feeding grounds; and the new value of whales for tourism turned former whaling communities into whale-watching ones. With a modest $r$ of perhaps 5–10 % per year at low density, many populations have recovered over five decades, and in 2008 the IUCN moved the species to Least Concern. The same tools have not been enough for species whose threats are diffuse (bycatch, ship strikes, climate change), such as the North Atlantic right whale.
:::

::: history
Gifford Pinchot, first chief of the United States Forest Service (1905), championed the "wise use" of resources for "the greatest good of the greatest number for the longest time", while John Muir argued for the preservation of nature for its own sake — a tension between use and protection that runs through conservation still. Maximum sustainable yield was developed by fisheries scientists in the 1930s–1950s (Michael Graham, Milner Schaefer), Gordon (1954) explained the economics of open access, Hardin (1968) generalised it as the tragedy of the commons, Clark (1973) showed how discounting could make extinction profitable, and Ostrom (1990) showed how communities avoid the tragedy. International conservation law grew from the Ramsar, World Heritage and CITES conventions of the early 1970s through the Convention on Biological Diversity (1992) to the Kunming–Montreal framework (2022). The Millennium Ecosystem Assessment (2005), the TEEB studies (2010), the creation of IPBES (2012) and the Dasgupta Review (2021) brought the value of nature into mainstream policy, and the recognition of Indigenous and community rights reshaped the practice of conservation from the 1990s onwards.
:::

## Where this leads

This course has moved from what biodiversity is and how it is being lost, through the population biology of rarity and fragmentation, to protection, invasions, climate, restoration and finally to the people and institutions on which all of these depend. The quantitative foundations are in [[ecology]], [[evolution]] and [[population-genetics]]; the statistical methods for evaluating conservation actions are developed in [[biostatistics]].

::: summary
- Under the logistic model, **MSY** $= rK/4$ at $N = K/2$ ([[#prop-msy]]); constant quotas near MSY are unstable, while harvest-rate rules are stable. The precautionary approach treats MSY as a limit, not a target.
- The **Gordon–Schaefer** model ([[#prop-gordon]]) shows that open access drives effort to the **bionomic equilibrium** $N_\infty = c/(pq)$, dissipating rent; **MEY** uses less effort and leaves a larger stock. Subsidies lower $c$ and worsen overfishing.
- **Ostrom**'s design principles show how commons can be managed; the tragedy is one of open access. **Clark**'s argument ([[#prop-clark]]): if the discount rate exceeds $r$, liquidating a slow-growing resource pays.
- **Ecosystem services** are valued by market, avoided-cost, revealed- and stated-preference methods, with **discounting** ([[#def-pv]]); valuation exposes trade-offs but cannot capture all values. Instruments include PES, REDD+, offsets under the **mitigation hierarchy** (with multipliers for uncertainty and delay, [[#ex-offset]]), net gain and disclosure.
- **CITES** (Appendices I–III), the **CBD** and the **Kunming–Montreal framework** (23 targets for 2030, including 30 × 30, restoration, invasive species, harmful subsidies and finance) frame international action; national laws such as the US Endangered Species Act and the EU nature directives do much of the enforcement.
- Conservation succeeds when the people who bear its costs share its benefits and its decisions: **community-based** and **rights-based** approaches, evidence-based and adaptive management, and attention to the indirect drivers of loss.
:::

## Exercises

::: exercise MSY {level=1 check="0.6*50000/4"}
A deer population has $r = 0.6$ per year and $K = 50\,000$. What is its maximum sustainable yield per year?
::: solution
$\mathrm{MSY} = rK/4 = 0.6\times50\,000/4 = 7500$ deer per year, from a population held at 25 000.
:::
:::

::: exercise Present value {level=1 check="2/0.05"}
A protected wetland is estimated to provide flood protection worth 2 million dollars per year indefinitely. What is the present value of this service, in millions of dollars, at a discount rate of 5 %?
::: solution
$\mathrm{PV} = B/\delta = 2/0.05 = 40$ million dollars.
:::
:::

::: exercise Open-access stock {level=1 check="4000/(5000*0.0002)"}
In a Gordon–Schaefer fishery, the catchability is $q = 0.0002$ per vessel-year, fish sell for 5000 dollars per tonne and a vessel costs 4000 dollars a year. What stock size, in tonnes, results at the open-access equilibrium?
::: solution
$N_\infty = c/(pq) = 4000/(5000\times0.0002) = 4000/1 = 4000$ tonnes.
:::
:::

::: exercise Harvest rules {level=2}
For the stock of [[#ex-msy]] ($r = 0.4$, $K = 10\,000$ t), compare (a) a constant quota of 800 t per year and (b) a harvest rate of $F = 0.2$ per year, in terms of their equilibria and their response to an environmental shock that reduces the stock to 2500 t.
::: solution
(a) Equilibria: $0.4N(1 - N/10\,000) = 800$ gives $N^2 - 10\,000N + 20\,000\,000 = 0$, $N = 5000 \pm 2236$: 2764 t (unstable) and 7236 t (stable). At 2500 t, surplus production is $0.4\times2500\times0.75 = 750 < 800$: the stock declines to collapse unless the quota is cut.

(b) Equilibrium $K(1 - F/r) = 5000$ t, with yield $0.2\times5000 = 1000$ t (the MSY). At 2500 t, the catch is 500 t and production 750 t: the stock recovers. The harvest-rate rule takes the same long-run yield as MSY (here more than the 800 t quota) and is robust to shocks, because the catch falls automatically with the stock.
:::
:::

::: exercise Interpreting an evaluation {level=2}
A study of a payments-for-ecosystem-services scheme reports that enrolled forests lost 1 % of their cover in a decade, against 8 % for all non-enrolled forest. A matched analysis finds 2 % loss in comparable non-enrolled forest. (a) Estimate the effect of the payments naively and with matching. (b) What does the difference suggest about which forests were enrolled? (c) Suggest one change in the design of the scheme that would increase its effect per dollar.
::: solution
(a) Naive: $8 - 1 = 7$ percentage points; matched: $2 - 1 = 1$ percentage point.

(b) Enrolled forests were mostly those at low risk of clearance — steep, remote or legally protected land whose owners were happy to accept payments for doing what they would have done anyway (low **additionality**).

(c) Target payments at forest under high threat — near roads and agricultural frontiers — by varying payment rates with deforestation risk or by auctions in which landholders bid and the scheme buys the most threatened forest per dollar. Linking payments to verified outcomes also helps.
:::
:::

::: exercise A fishery subsidy {level=2}
In the fishery of [[#ex-gordon]], a government fuel subsidy reduces the cost of running a vessel from 3000 to 1500 dollars a year. (a) Find the new open-access stock, effort and catch. (b) Is the fishery now biologically overfished (stock below $N_\mathrm{MSY}$)? (c) Explain why removing such subsidies is a conservation target.
::: solution
(a) $N_\infty = 1500/(2000\times0.0005) = 1500$ tonnes; $E = (r/q)(1 - N/K) = 800\times0.85 = 680$ vessels; catch $= 0.0005\times680\times1500 = 510$ tonnes.

(b) Yes: 1500 t is far below $N_\mathrm{MSY} = 5000$ t, and the catch (510 t) is about half that at open access before the subsidy (840 t). The subsidy has increased effort, reduced the stock and *reduced* the catch.

(c) Subsidies that lower the cost of exploitation push open-access equilibria to lower stock sizes, sometimes to collapse, while costing taxpayers money; they make overexploitation profitable that would otherwise not be. Removing or redirecting them (to monitoring, enforcement or support for fishers to leave the industry) benefits both the stock and public finances — hence Target 18 of the Kunming–Montreal framework and the World Trade Organization's 2022 agreement on fisheries subsidies.
:::
:::

::: exercise Maximum economic yield {level=3}
Show that in the Gordon–Schaefer model the stock at maximum economic yield is

$$
N_\mathrm{MEY} = \frac{K + N_\infty}{2},
$$

halfway between the unfished stock $K$ and the open-access stock $N_\infty = c/(pq)$. Check the result with the numbers of [[#ex-gordon]], and show that $N_\mathrm{MEY} > N_\mathrm{MSY}$ whenever fishing has a cost.
::: solution
From [[#prop-gordon]], $E_\mathrm{MEY} = (r/2q)(1 - c/(pqK))$, and $N = K(1 - qE/r)$, so

$$
N_\mathrm{MEY} = K\left[1 - \frac12\left(1 - \frac{c}{pqK}\right)\right] = \frac{K}{2} + \frac{c}{2pq} = \frac{K + N_\infty}{2}.
$$

The stock at MEY lies halfway between the unfished stock and the open-access stock. With $K = 10\,000$ and $N_\infty = 3000$ t, $N_\mathrm{MEY} = 6500$ t, as found in the example. Because $N_\infty > 0$ whenever fishing has a cost, $N_\mathrm{MEY} > K/2 = N_\mathrm{MSY}$: the economically optimal stock is larger than the MSY stock.
:::
:::

::: exercise Who should pay? {level=3}
A tropical country contains a forest that holds 40 endemic vertebrate species and stores 200 million tonnes of carbon. It covers 1 million hectares, and clearing it for cattle ranching would earn local landowners a net present value of 500 dollars per hectare. (a) Write the opportunity cost of protection. (b) If carbon is valued at 10 dollars per tonne of CO₂, and the forest carbon would be released as CO₂ (multiply carbon by 44/12), what is the climate value of keeping it? (c) Discuss who bears the costs and who receives the benefits of protection, and outline a mechanism that could align them.
::: solution
(a) The opportunity cost — the value forgone by not clearing — is $500\times10^6 = 5\times10^8$ dollars, half a billion dollars, borne mainly by local landowners and the national economy.

(b) $200\times10^6$ t of carbon is $200\times10^6\times44/12 = 7.33\times10^8$ t of CO₂; at 10 dollars per tonne, $7.3\times10^9$ dollars — more than fourteen times the opportunity cost, before counting the endemic species, water regulation or local uses.

(c) The benefits of protection are largely global (climate, existence of the endemics) while the costs are local and national. Without transfers, clearing is rational for the landowners even though it is a loss for the world. Mechanisms include international payments for avoided emissions (REDD+) and for biodiversity (Target 19 finance), channelled to landholders and communities as payments for ecosystem services, combined with recognition of the land rights of Indigenous and local communities who may already be protecting the forest. For such payments to work, they must be additional (pay for forest actually at risk), reach the people bearing the costs, and be secure over the long term — and the real carbon price used for the calculation matters greatly.
:::
:::
