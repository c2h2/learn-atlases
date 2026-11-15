In 2023 the world shipped about \$24 trillion of merchandise and another \$7.5 trillion of commercial services across borders (WTO, *Global Trade Outlook and Statistics*, April 2024). Vietnam's exports of telephones and electronic components rival its exports of footwear and rice; Germany and France sell cars to each other in both directions; Nigeria's crude oil leaves Bonny and Forcados while refined petrol comes back through Lagos; Singapore's recorded trade is several times its GDP. These are not curiosities. They are the facts a theory of trade has to speak to: who trades with whom, in what, and how those patterns have changed as the cost of moving goods and the cost of coordinating production have fallen.

This chapter is an organised look at those facts. It does not yet explain them. The models of later chapters — comparative advantage, factor endowments, increasing returns, heterogeneous firms — are built to match the regularities collected here. The chapter also introduces the **gravity equation**, the single most reliable empirical relationship in international economics, and the distinction between **inter-industry** and **intra-industry** trade, which will split the classical theories from the new trade theory of [[international-trade/new-trade-theory]].

A word on measurement before any number. Trade statistics are compiled by customs authorities and statistical offices, then assembled by the WTO, UN Comtrade, the IMF's *Direction of Trade Statistics* and the World Bank's World Development Indicators. Merchandise is valued f.o.b. (free on board) on the export side and usually c.i.f. (cost, insurance, freight) on the import side, so the world's recorded imports exceed recorded exports by a transport-and-insurance margin. Services are measured on a balance-of-payments basis and are harder to observe. Re-exports through hubs such as Singapore, Hong Kong SAR and the Netherlands inflate those economies' headline trade-to-GDP ratios. When a later paragraph cites a figure, it names the source and the year.

## Openness and the composition of trade

The simplest summary of a country's engagement with world markets is its **trade-to-GDP ratio**: the sum of exports and imports of goods and services, divided by GDP. Because exports and imports are both in the numerator, the ratio can exceed 100 per cent — and does, for many small open economies. It is a measure of *exposure*, not of welfare. A country can be open and poor, or relatively closed and rich; the United States in 2023 had a trade-to-GDP ratio near 25 per cent and a high real income, while several low-income economies have ratios above 50 per cent (World Bank WDI, indicator NE.TRD.GNFS.ZS, accessed 2026).

::: definition Trade-to-GDP ratio {#def-openness}
A country's **trade-to-GDP ratio** in a given year is $(X + M)/Y$, where $X$ is exports of goods and services, $M$ is imports of goods and services, and $Y$ is GDP, all in current prices and a common currency. The **export-to-GDP ratio** is $X/Y$. Neither ratio is a welfare index: they scale with country size, with the share of tradables in production, and with the prevalence of processing trade and re-exports.
:::

World trade relative to world GDP rose from about 26 per cent in 1970 to a little over 60 per cent in 2008, then flattened. In 2023 the world ratio was about 58 per cent (World Bank WDI, accessed 2026). The plateau after 2008 — sometimes called the **slowbalisation** of merchandise trade — coincided with the financial crisis, the maturing of China's processing-trade boom, and a later rise in trade-policy uncertainty. Services trade, especially digitally delivered services, continued to grow as a share of the total: commercial services were about 25 per cent of world trade in goods and services in 2023, up from 22 per cent in 2022 (WTO, 2024).

Size matters. Large economies trade a smaller fraction of GDP because more of their demand can be met at home; this is one reason the United States, Japan and Brazil look "closed" next to Belgium, Vietnam or Lesotho. Geography matters too: landlocked countries in sub-Saharan Africa and Central Asia face higher transport costs and, other things equal, lower trade ratios. Natural-resource endowments shape the *composition* of trade even when they do not dominate the *volume*: crude oil and gas still account for the bulk of exports from Nigeria, Angola, Qatar and Norway; copper and lithium from Chile; soybeans, iron ore and crude from Brazil; iron ore and coal from Australia (UN Comtrade and national statistical offices, recent years).

::: example Three trade-to-GDP ratios {#ex-openness}
In a given year, country A's GDP is 2 000 billion units of money, its exports of goods and services are 400 billion and its imports are 350 billion. Country B, a smaller processing hub, has GDP of 400 billion, exports of 520 billion and imports of 500 billion. Country C, a large continental economy, has GDP of 8 000 billion, exports of 1 000 billion and imports of 1 200 billion. Compute each country's trade-to-GDP ratio. Which country is the most "open" by this measure, and what does the ranking *not* tell you?
::: solution
Country A: $(400 + 350)/2000 = 0.375$, or 37.5 per cent.

Country B: $(520 + 500)/400 = 2.55$, or 255 per cent.

Country C: $(1000 + 1200)/8000 = 0.275$, or 27.5 per cent.

B is the most open on this definition, then A, then C. The ranking does not say that B's residents are better off, that B has lower tariffs, or that B has larger *gains from trade*. B's ratio is inflated by the double-counting of goods that arrive and leave again; C's low ratio is the arithmetic of a large home market. Welfare comparisons require real income, not a trade ratio — a point that [[principles/gains-from-trade]] already stressed and that the Ricardian model in [[international-trade/ricardian-model]] will make precise.
:::
:::

The commodity composition of merchandise trade has shifted over decades. In 1960 primary products (food, fuels, ores) were a large share of world exports; by the 2010s manufactures dominated, with machinery, electronics and transport equipment at the centre, though fuels still spike in value when oil prices jump (WTO *World Trade Statistical Review*, various years). The **extensive margin** of trade — new products and new partner pairs — has been an important part of growth, alongside the **intensive margin** of more trade in existing pairs (Kehoe and Ruhl 2013 document the extensive margin in several liberalisations). Services — transport, travel, financial, professional, telecommunications — have become more tradable as communication costs have fallen, a theme Richard Baldwin organises as a "second unbundling" of production (*The Great Convergence*, 2016).

A second cut is by partner. Intra-regional trade is high in Europe, where the European Union's single market and a dense web of supply chains make Germany, France, Italy and the Netherlands each other's largest partners. It is also high in North America under the USMCA (formerly NAFTA). East and South-East Asia have become a manufacturing circuit of their own: parts cross borders in China, Japan, Korea, Chinese Taipei, Vietnam, Thailand and Malaysia several times before a finished good is shipped to a final consumer. Intra-African merchandise trade remains a smaller share of Africa's total trade than the corresponding shares in Europe or Asia, which is one of the stated motivations of the African Continental Free Trade Area (AfCFTA), whose legal instruments entered into force in 2019. Latin America's intra-regional share lies between Africa's and Europe's; Brazil and Argentina trade a good deal with each other and with China, the United States and the European Union.

::: example Gravity with a common language {#ex-language}
A gravity regression in logs, with $\theta = 1$, finds that a common official language is associated with 0.5 extra log points of trade, other things equal — a multiplier of $e^{0.5} \approx 1.65$. Two otherwise identical pairs, one sharing a language and one not, have predicted trade of 10 billion and of how much? Treat the 0.5 as a partial correlation (Head and Mayer 2014 survey such coefficients), not as the causal effect of adopting a language.
::: solution
The language pair's predicted trade is $10 \times e^{0.5} \approx 10 \times 1.649 = 16.49$ billion. Distance, GDP and the residual are being held fixed by construction. A government that made a language official would not, on this coefficient alone, be guaranteed a 65 per cent rise in trade: language dummies pick up colonial history, legal origin and unobserved taste correlation as well as the cost of translation. The number is a *ceteris paribus* association in a gravity fit.
:::
:::

::: warning A trade ratio is not a welfare ranking
A common slip is to treat $(X+M)/Y$ as a score, as if more trade were always better and less always worse. The ratio moves for reasons that have nothing to do with efficiency: a recession that cuts GDP faster than trade *raises* the ratio; a commodity boom that raises both the value of exports and GDP can move it either way; re-exports through a hub inflate it. The gains-from-trade theorems of later chapters are statements about real income and consumption possibilities, not about this ratio. Singapore's ratio above 300 per cent (World Bank WDI, recent years) and the United States' ratio near 25 per cent are facts about size, entrepôt activity and geography. They are not a ranking of economic success.
:::

## Who trades with whom: the gravity equation

The most striking regularity in the data is almost physical. Large economies trade more with each other than small ones do; neighbours trade more than distant pairs; a common language, a former colonial link, a shared border and a trade agreement each raise bilateral trade, other things equal. Jan Tinbergen wrote down the analogy with Newton's law of gravitation in *Shaping the World Economy* (1962): the "masses" are GDPs, the "distance" is geographic distance, and the "force" is the value of bilateral trade. The analogy is a metaphor. The empirical relationship is not.

::: definition Gravity equation {#def-gravity}
A **gravity equation** for the value of trade $T_{ij}$ from exporter $i$ to importer $j$ takes the form

$$
T_{ij} = G \cdot \frac{Y_i^{\alpha}\, Y_j^{\beta}}{D_{ij}^{\theta}} \cdot \varepsilon_{ij},
$$ {#eq-gravity}

where $Y_i$ and $Y_j$ are economic sizes (usually GDP), $D_{ij}$ is a measure of bilateral resistance (usually great-circle distance, sometimes augmented by tariffs, language and borders), $G$ is a factor common to all pairs in a given year, $\varepsilon_{ij}$ is a residual, and $\alpha$, $\beta$, $\theta > 0$ are elasticities. In logarithms,

$$
\ln T_{ij} = \ln G + \alpha \ln Y_i + \beta \ln Y_j - \theta \ln D_{ij} + \ln \varepsilon_{ij}.
$$

A **structural gravity** equation, in the sense of Anderson and van Wincoop (2003), replaces the single $G$ with exporter and importer **multilateral-resistance** terms that depend on *every* country's barriers to *every* other country.
:::

The naive form [[#eq-gravity]] already fits bilateral trade remarkably well. Head and Mayer's handbook chapter (2014) surveys decades of estimates: the elasticity of trade with respect to distance is typically near $-1$ once the specification is careful, though published numbers range from about $-0.7$ to $-1.5$ depending on the sample, the year and whether zero-trade pairs are included. The elasticities on GDP are close to one. A shared language, a colonial history and a free-trade agreement enter as shifters of $D_{ij}$ (or as separate dummy variables) and are associated with higher trade. These are partial correlations in an accounting identity dressed as a regression; they are not, by themselves, causal effects of building a road or signing a treaty. The warning below returns to that point.

Why should gravity hold? Three families of models deliver it, and they will appear in later chapters. An **Armington** demand system, in which each country produces a distinct variety and consumers have constant-elasticity-of-substitution (CES) preferences, yields a gravity equation with multilateral resistance (Anderson 1979; Anderson and van Wincoop 2003). **Monopolistic competition** with increasing returns, as in Krugman (1980) and the new trade theory of [[international-trade/new-trade-theory]], yields a similar form. **Heterogeneous-firm** models in the line of Melitz (2003), studied in [[international-trade/firms-in-trade]], yield gravity for aggregate bilateral trade even though only a subset of firms export to each destination. In all three, the distance elasticity $\theta$ is tied to the elasticity of substitution across varieties: more substitutable goods mean that a small cost disadvantage destroys more trade.

::: proposition Gravity from CES demand {#prop-ces-gravity}
Suppose every country $i$ produces a unique variety, consumers in $j$ have CES preferences over varieties with elasticity $\sigma > 1$, and iceberg trade costs from $i$ to $j$ are $\tau_{ij} \ge 1$ (a share $\tau_{ij}-1$ of the good "melts" in transit). Then the value of $i$'s sales to $j$ is

$$
T_{ij} = \frac{Y_i\, Y_j}{Y^W} \left(\frac{\tau_{ij}}{P_i\,\Pi_j}\right)^{1-\sigma},
$$

where $Y^W$ is world GDP and $P_i$, $\Pi_j$ are price indices — the multilateral-resistance terms — that depend on all trade costs in the world. Assumptions: CES demand, one variety per country (or a continuum of symmetric firms), iceberg costs, and market clearing. This is a theoretical relationship, not an estimated elasticity.
:::

::: proof
CES demand implies that $j$'s expenditure on $i$'s variety is $T_{ij} = \bigl(p_{ij}/P_j\bigr)^{1-\sigma} Y_j$, where $p_{ij} = p_i \tau_{ij}$ is the delivered price and $P_j$ is the CES price index in $j$. Market clearing for $i$'s output requires $Y_i = \sum_k T_{ik}$. Substituting and rearranging produces a term $P_i^{1-\sigma}$ that depends on $i$'s access to all markets. Defining the inward and outward multilateral-resistance indices $P_j$ and $\Pi_i$ as in Anderson and van Wincoop (2003) yields the displayed gravity equation. The distance elasticity is $1-\sigma$ times the elasticity of $\tau_{ij}$ with respect to distance: if $\tau_{ij} = D_{ij}^{\rho}$, then $\theta = (\sigma-1)\rho$.
:::

The multilateral-resistance terms are the deep point. Trade between France and Germany depends not only on French and German GDP and the distance from Paris to Berlin, but on how resistant each is to trade with *everyone else*. If the rest of the world becomes cheaper to trade with, Franco-German trade falls even if nothing changes between them — a substitution effect. Anderson and van Wincoop (2003) showed that omitting these terms biases the estimated effect of borders; their famous "border puzzle" calculation, using Canada–US data for 1993, found that national borders reduced trade between US and Canadian provinces far more than distance alone would suggest, but by less than McCallum's (1995) earlier estimate that ignored multilateral resistance.

::: example A gravity comparison {#ex-gravity-numbers}
Two importers, $B$ and $C$, have the same GDP. Exporter $A$'s GDP is also given. The distance $D_{AC}$ is four times $D_{AB}$. Using [[#eq-gravity]] with $\alpha = \beta = 1$ and ignoring the residual, compute the ratio $T_{AB}/T_{AC}$ when the distance elasticity is $\theta = 1$ and when it is $\theta = 1.5$. (Enter the ratio for $\theta = 1.5$ in the exercise of the same form below.)
::: solution
With equal GDPs of the two importers and a common exporter size,

$$
\frac{T_{AB}}{T_{AC}} = \left(\frac{D_{AC}}{D_{AB}}\right)^{\theta} = 4^{\theta}.
$$

For $\theta = 1$ the ratio is $4$. For $\theta = 1.5$ it is $4^{3/2} = 8$. A 50 per cent larger distance elasticity doubles the implied penalty of the fourfold distance. That is the sense in which $\theta$ is a *trade-cost* elasticity, not a purely geographic fact: the same kilometres destroy more trade when goods are more substitutable or when transport is more expensive per kilometre.
:::
:::

::: widget plot
f: G*Ya*Yb/(x^t)
sliders: G=1:0.2:3; Ya=10:2:20; Yb=8:2:20; t=1:0.4:2
x: 1, 20
y: 0, 120
labels: \text{predicted bilateral trade}
caption: Raise the distance elasticity $t$ and watch predicted trade fall, especially at long distances. Raise either GDP and the whole curve shifts up in proportion. The $x$-axis is distance; the figure is [[#eq-gravity]] with a residual of one.
:::

::: quiz
In the naive gravity equation $T_{ij} \propto Y_i Y_j / D_{ij}^{\theta}$, what happens to predicted trade between $i$ and $j$ if both GDPs double and distance is unchanged?
- [ ] It is unchanged, because gravity depends only on distance
- [x] It quadruples
- [ ] It doubles
- [ ] It falls, because larger countries are more self-sufficient
::: solution
With $\alpha = \beta = 1$, $T_{ij}$ is proportional to the *product* of the two GDPs. Doubling both multiplies the product by four. (Large countries do trade a smaller *share of GDP*, which is a statement about $T_{ij}/Y_i$, not about $T_{ij}$ itself. Gravity for the *level* of bilateral trade and the size pattern of *openness* are consistent: a country twice as large trades more in absolute terms and less as a share of its own GDP, because more of its partners are, in effect, its own regions.)
:::
:::

::: widget graph
nodes: USA; CHN; DEU; JPN; MEX; BRA; IND; NGA
edges: USA-CHN; USA-MEX; USA-DEU; USA-JPN; USA-BRA; USA-IND; CHN-DEU; CHN-JPN; CHN-BRA; CHN-IND; CHN-NGA; DEU-JPN; BRA-NGA; IND-NGA
algorithm: none
caption: A schematic of large bilateral links among eight economies in the Americas, Europe, East and South Asia and Africa. Drag the nodes. Gravity says the thickest real-world links run between large, nearby pairs (USA–MEX, USA–CHN, DEU with its European neighbours — the last not drawn). The figure is a cartoon of topology, not a map of values.
:::

Distance in gravity is a stand-in for a bundle of costs: freight, time, information, contract enforcement, taste differences, and policy. Hummels (2007) documents the fall in air-freight and the slower fall in ocean shipping since the 1950s; the container, introduced on a commercial voyage by Malcolm McLean's *Ideal X* in 1956, cut handling costs and damage and made door-to-door intermodal shipping routine. Communication costs have fallen faster than freight. Baldwin (2016) argues that cheap coordination, not just cheap shipping, is what allowed factories to split across borders — the global value chains of [[international-trade/firms-in-trade]]. Policy is part of $D_{ij}$ as well: a 10 per cent tariff is a 10 per cent iceberg cost in the simplest models, and a non-tariff barrier can be larger.

::: warning Gravity coefficients are not automatically causal
A regression of $\ln T_{ij}$ on $\ln D_{ij}$ and $\ln Y_i$, $\ln Y_j$ describes the data. It does not, by itself, say what would happen if a government built a railway, joined a trade agreement, or imposed a tariff. Distance is not randomly assigned; countries that are close often share language, legal origin and unobserved tastes. GDP is endogenous to trade. The empirical literature addresses these problems with structural gravity, with pair fixed effects, and with quasi-experimental variation (the opening of the Suez Canal, the closing of the Suez in 1967, air-traffic liberalisations, the fall of the Iron Curtain). When this course cites a gravity elasticity, it is citing a *partial correlation* or a *structurally interpreted* elasticity, and the distinction is stated. Do not read a distance coefficient of $-1$ as "build a port and trade will double."
:::

## Inter-industry and intra-industry trade

Classical trade theory, from Ricardo through Heckscher–Ohlin, is a theory of **inter-industry** trade: Portugal exports wine and imports cloth; a land-abundant country exports food and imports manufactures; a skill-abundant country exports aircraft and imports garments. A large share of world trade looks like that. Chile's copper, Zambia's copper, Australia's iron ore, Saudi Arabia's crude, Ethiopia's coffee, Bangladesh's garments, and Germany's machine tools are all specialisations that factor endowments and technology help to explain.

A large share does *not* look like that. Germany exports cars to France and imports cars from France. The United States exports pharmaceuticals to the European Union and imports pharmaceuticals from the European Union. Korea, Japan, China, Mexico and the United States ship electronic components back and forth. Grubel and Lloyd (1975) proposed a simple index of this two-way trade in similar products.

::: definition Intra-industry trade and the Grubel–Lloyd index {#def-gl}
Trade in a product category $k$ between two countries is **intra-industry** to the extent that it flows in both directions. The **Grubel–Lloyd index** for category $k$ is

$$
\mathrm{GL}_k = 1 - \frac{\lvert X_k - M_k \rvert}{X_k + M_k},
$$ {#eq-gl}

where $X_k$ and $M_k$ are exports and imports in that category. The index equals $1$ when $X_k = M_k$ (pure two-way trade) and equals $0$ when trade is one-way. An aggregate GL index is a trade-weighted average of the $\mathrm{GL}_k$. The index depends on the fineness of the classification: finer categories produce lower measured intra-industry trade.
:::

Intra-industry trade is highest among high-income economies at similar factor endowments, in differentiated manufactures, and inside regional blocs. It is lower in homogeneous primary products. That pattern is a stylised fact, not a theorem: it is the fact that pushed Krugman (1979, 1980) and Helpman and Krugman (1985) to build models of trade under increasing returns and monopolistic competition, the subject of [[international-trade/new-trade-theory]]. Those models generate two-way trade in similar goods between similar countries, something the Ricardian and Heckscher–Ohlin models in their 2-by-2 form cannot do.

::: example Computing a Grubel–Lloyd index {#ex-gl}
In a year, a country's trade with a partner in "motor cars" is exports of 40 billion units and imports of 30 billion. In "crude petroleum" the same pair has exports of 2 billion and imports of 50 billion. Compute $\mathrm{GL}$ in each category. What does the comparison suggest about the likely explanation of each flow?
::: solution
Cars: $\mathrm{GL} = 1 - \lvert 40-30 \rvert/(40+30) = 1 - 10/70 = 4/7 \approx 0.57$.

Crude: $\mathrm{GL} = 1 - \lvert 2-50 \rvert/(2+50) = 1 - 48/52 = 4/52 \approx 0.077$.

Car trade is substantially two-way; crude is almost one-way. The crude flow is the kind of inter-industry specialisation that factor endowments (oil reserves) explain. The car flow is the kind that product differentiation, brand, increasing returns and cross-border production networks explain — not a story in which one country "has cars" and the other does not. (A GL of 0.57 is well below 1: there is still a net export of cars, which a Heckscher–Ohlin or Ricardian force can sit underneath.)
:::
:::

Vertical specialisation blurs the distinction. When Mexico imports engines from the United States, assembles cars, and exports the cars back, customs data record two-way trade in "vehicles and parts" even though the underlying production chain is a sequence of inter-industry steps. Hummels, Ishii and Yi (2001) and later OECD and WTO **trade-in-value-added** (TiVA) statistics try to strip out the double-counting. On a value-added basis, China's surplus with the United States is smaller than on a gross basis, because a Chinese export often contains Japanese, Korean, German and American parts (Johnson and Noguera 2012; Koopman, Wang and Wei 2014). Gross flows remain the right object for gravity (they are what crosses the border and what tariffs apply to); value-added flows are the right object for asking who *earned* the income.

## Transport, communication and the changing cost of distance

The gravity elasticity of distance has not vanished as ships became larger and air freight cheaper. Disdier and Head (2008), in a meta-analysis of 1 467 estimates, found that the estimated distance effect *rose* over the second half of the twentieth century in many specifications, a result that is less paradoxical than it sounds: as policy barriers fell, the remaining friction — geography, time, information — accounted for a larger share of the variation that was left. What *has* changed is the composition of what is traded and how production is organised.

Three cost declines are worth separating.

**Ocean shipping and the container.** Bulk commodities (iron ore from Australia and Brazil to China, crude from the Persian Gulf to East Asia and Europe) move on specialised ships whose real freight rates fell over the twentieth century, with spikes when oil prices or port congestion jump (as in 2021–22). For manufactures, the container standardised handling. The first voyage of the *Ideal X* from Newark to Houston in April 1956 carried 58 containers; by the 2010s, ships holding more than 20 000 twenty-foot equivalent units (TEU) were calling at Shanghai, Singapore, Rotterdam and Los Angeles. Freight as a share of the value of manufactures is now often in the low single digits on long-haul routes, though it remains a serious barrier for bulky, low-value goods and for landlocked exporters in Africa and Central Asia, who pay the inland leg as well (UNCTAD *Review of Maritime Transport*, various years).

**Air freight and just-in-time.** Air's share of world trade is small by *weight* and much larger by *value*. Cut flowers from Kenya and Colombia, semiconductors, fashion samples and spare parts travel by air because time is expensive. Hummels and Schaur (2013) estimate that each day in transit is worth a tariff-equivalent of the order of 0.6 to 2 per cent of the value of the good, a number that makes air competitive for high-value-to-weight products even when the freight bill looks large.

**Communication and coordination.** The cost of a transatlantic telephone call, then of a data packet, has fallen by orders of magnitude since 1970. That decline did not merely increase trade in *services* (software, back-office processing, engineering, entertainment). It changed the organisation of *goods* production. A firm in Japan or Germany can now specify a component, monitor quality, and revise a design with a supplier in Vietnam, Mexico or Poland in hours rather than months. Baldwin's "second unbundling" is this: the first unbundling, in the nineteenth century, separated production from consumption geographically; the second, from the 1990s, separated stages of production from each other. The result is **global value chains** (GVCs), measured in the data as a high imported-input share of exports, especially in electronics, automobiles and textiles.

The GVC boom was geographically concentrated. East Asia, North America and Europe formed three "factory" regions; sub-Saharan Africa and much of South America remained, with important exceptions (Chile's copper chain, Morocco's automobiles, Ethiopia's and Bangladesh's garments), more specialised in commodities and final assembly of simpler goods (World Bank, *World Development Report 2020: Trading for Development in the Age of Global Value Chains*). Participation in GVCs is associated in the cross-section with faster productivity growth, but the association is not a theorem and the distribution of value added along the chain is uneven — a theme of [[international-trade/firms-in-trade]].

::: application From coffee cherries to a roasted bag
Ethiopia and Brazil are among the world's largest coffee growers; Germany, Italy and the United States are among the largest roasters and retailers. A kilogram of cherries in Oromia or Minas Gerais and a kilogram of branded capsules on a supermarket shelf differ by processing, branding, logistics and retail margins. Gross export data record Ethiopia's green-coffee shipments and Germany's roasted-coffee shipments as different products; a value-added view asks how much of the final retail price accrued to growers, to transporters, to roasters and to retailers. Neither view is the "correct" one: they answer different questions. The classical models of this course speak to why Ethiopia exports coffee and imports machinery (endowments and climate as technology). They do not, by themselves, speak to how the value chain is organised. That is a firm-level and contractual question.
:::

## Stylised facts

The models that follow are built to match a short list of regularities. Empirical regularities are not theorems; each is a description of data, with a source, and each has exceptions.

1. **Size and distance.** Bilateral trade rises with the GDP of both partners and falls with distance, approximately as gravity predicts (Tinbergen 1962; Head and Mayer 2014). The relationship holds for goods and, with a different distance elasticity, for many services.

2. **Openness declines with country size.** Trade-to-GDP ratios are higher for small economies than for large ones (World Bank WDI, many years). This is consistent with gravity: a large country has a large home market.

3. **Both inter-industry and intra-industry trade are large.** Homogeneous primary products and some manufactures trade one way, along endowment and technology lines. Differentiated manufactures trade two ways, especially among similar high-income economies (Grubel and Lloyd 1975; OECD STAN and UN Comtrade).

4. **A few firms account for most exports.** In the United States, France, China, Chile, South Africa and many other countries where micro-data exist, the top few per cent of firms by export value account for the bulk of exports, and exporters are larger and more productive than non-exporters (Bernard and Jensen 1995, 1999; Mayer and Ottaviano 2008; the World Bank's *Exporter Dynamics Database*). This is the fact that Melitz (2003) organised, and it is the subject of [[international-trade/firms-in-trade]].

5. **Trade has grown faster than GDP for most of the last half-century, then paused.** World $(X+M)/Y$ rose from the 1970s to 2008 and has not resumed a strong upward trend since (World Bank WDI). Digitally delivered services are the main exception (WTO 2024).

6. **Policy still matters.** Average applied MFN tariffs on manufactures in high-income economies are low, often in the low single digits, but tariffs on agriculture and on some labour-intensive manufactures remain higher, and **non-tariff measures** (standards, licences, rules of origin, anti-dumping) are a large part of residual protection (WTO–ITC–UNCTAD *World Tariff Profiles*, various years). Preferential agreements cover a growing share of trade. The instruments and the politics are the subject of [[international-trade/tariffs-and-quotas]] and [[international-trade/trade-agreements]].

7. **The distribution of the gains is uneven.** Opening to trade raises national real income under the assumptions of the classical models, but it does not raise every factor's real income. Local labour-market studies — including Autor, Dorn and Hanson (2013) on the "China shock" in the United States, and related work on Brazil, Mexico, Norway and Germany — find concentrated losses in import-competing regions alongside gains for consumers and for workers in exporting activities. Gains *and* distributional costs are both part of the record; later chapters give them a theory.

::: quiz
Which of the following is a *stylised fact* rather than a theorem of a trade model?
- [ ] In the Ricardian model both countries gain from trade
- [x] The top few per cent of firms account for most of a country's exports
- [ ] A tariff imposed by a small country lowers its welfare in the standard partial-equilibrium diagram
- [ ] Stolper–Samuelson: the scarce factor loses from trade
::: solution
The firm-level concentration of exports is an empirical regularity documented in micro-data for many countries. It is not implied by the classical 2-by-2 models, which have no firms, and it is a *result* of Melitz-type models only once those models' assumptions are imposed. The other three statements are theorems (or standard welfare results) inside named models, derived from assumptions, not from a census of firms.
:::
:::

::: history
**1817, David Ricardo.** *On the Principles of Political Economy and Taxation* gives the first clear statement of comparative advantage. **1919, Eli Heckscher**, and **1933, Bertil Ohlin**, shift the explanation of trade from labour productivity to factor endowments. **1962, Jan Tinbergen**, in *Shaping the World Economy*, fits the first gravity regressions to bilateral trade. **1975, Herbert Grubel and Peter Lloyd** publish *Intra-Industry Trade*, forcing theory to confront two-way trade in similar products. **1979–80, Paul Krugman** shows that increasing returns and monopolistic competition can generate that trade. **2003, Marc Melitz** brings firm heterogeneity into the same framework. The facts in this chapter are the targets those theories were aimed at.
:::

## Where this leads

The rest of the course takes the facts in turn. [[international-trade/ricardian-model]] asks how far differences in labour productivity go in explaining inter-industry specialisation and the gains from trade. [[international-trade/specific-factors]] and [[international-trade/heckscher-ohlin]] bring in land, capital and skills, and with them a theory of who gains and who loses. [[international-trade/new-trade-theory]] and [[international-trade/firms-in-trade]] take up intra-industry trade, increasing returns, the exporter premium and global value chains. [[international-trade/tariffs-and-quotas]] through [[international-trade/trade-agreements]] treat policy: the instruments, the politics, and the GATT/WTO and regional agreements that constrain them. International *finance* — exchange rates, the current account, capital flows — is a sibling course, [[international-finance]], not a substitute: the trade models of this course are real models, with relative prices and real incomes, and they are silent on currencies until one adds money.

::: summary
- World trade in goods and services is large (about \$24 trillion of merchandise and \$7.5 trillion of commercial services in 2023, WTO) and is concentrated among large, nearby economies.
- The trade-to-GDP ratio measures exposure, not welfare; it is higher for small economies and for processing hubs, and the world ratio rose until 2008 then flattened ([[#def-openness]]).
- The gravity equation $T_{ij} \propto Y_i Y_j / D_{ij}^{\theta}$ organises who trades with whom; structural gravity adds multilateral resistance ([[#def-gravity]], [[#prop-ces-gravity]]). Distance elasticities near $-1$ are a robust partial correlation, not by themselves a causal effect of infrastructure.
- Inter-industry trade follows endowments and technology; intra-industry trade, measured by the Grubel–Lloyd index, is large in differentiated manufactures among similar economies ([[#def-gl]]).
- Falls in shipping, air-freight and especially communication costs have changed *how* goods are produced (global value chains) as well as *how much* is traded.
- A few firms account for most exports; the gains from trade and the losses of particular groups of workers and regions are both in the data. Later chapters supply the theories.
:::

## Exercises

::: exercise A trade ratio {level=1 check="0.9"}
A country's GDP is 500 billion units, exports of goods and services are 200 billion and imports are 250 billion. What is its trade-to-GDP ratio? (Enter the ratio, not the percentage: e.g. 0.5 for 50 per cent.)
::: solution
$(200+250)/500 = 450/500 = 0.9$.
:::
:::

::: exercise Grubel–Lloyd arithmetic {level=1 check="0.6"}
Exports in a category are 70 and imports are 30. Compute the Grubel–Lloyd index [[#eq-gl]].
::: solution
$\mathrm{GL} = 1 - \lvert 70-30 \rvert/(70+30) = 1 - 40/100 = 0.6$.
:::
:::

::: exercise Gravity with $\theta = 1$ {level=1 check="4"}
In [[#eq-gravity]] with $\alpha=\beta=1$ and no residual, two importers have equal GDP and the farther one is four times as distant. If $\theta = 1$, what is the ratio of predicted trade with the nearer importer to predicted trade with the farther one?
::: solution
$T_{\text{near}}/T_{\text{far}} = (D_{\text{far}}/D_{\text{near}})^{\theta} = 4^{1} = 4$.
:::
:::

::: exercise Gravity with $\theta = 1.5$ {level=2 check="8"}
Same setting as the previous exercise, but $\theta = 1.5$. What is the ratio of predicted near trade to predicted far trade?
::: solution
$4^{1.5} = (4^{1/2})^3 = 2^3 = 8$, or $4^{3/2} = (4^3)^{1/2} = 64^{1/2} = 8$.
:::
:::

::: exercise Openness and size {level=2}
Explain, using gravity, why a country with twice the GDP of another would be expected to have a *lower* trade-to-GDP ratio, even though its *level* of trade is higher. Assume a world of many countries, $\alpha=\beta=1$, and that the larger country's extra GDP is not its partners' GDP.
::: hint
Write $X_i \approx \sum_j T_{ij} \propto Y_i \sum_j Y_j / D_{ij}^{\theta}$. Divide by $Y_i$.
:::
::: solution
Exports of $i$ satisfy $X_i = \sum_{j \neq i} T_{ij} \propto Y_i \sum_{j \neq i} Y_j / D_{ij}^{\theta}$. The trade-to-GDP ratio's export half is $X_i/Y_i \propto \sum_{j \neq i} Y_j / D_{ij}^{\theta}$, which does *not* rise with $Y_i$. It *falls* with $Y_i$ once one notes that a larger $Y_i$ means a larger share of world demand is domestic (in a more complete gravity model, multilateral resistance and the home share both rise with country size). Absolute trade $X_i$ still rises with $Y_i$. The United States therefore trades more than Belgium in dollars and less as a share of GDP. The same algebra is why entrepôt economies, whose $Y_i$ is small relative to the trade passing through, post ratios above 100 per cent.
:::
:::

::: exercise Intra-industry versus endowments {level=2}
A landlocked Sahelian economy exports raw cotton and live animals and imports fuel, medicines and cement. A pair of neighbouring EU members exchange automobiles, pharmaceuticals and machine tools in both directions. Which trade pattern is primarily inter-industry, which is primarily intra-industry, and which chapter of this course is designed to explain each? Why is the Grubel–Lloyd index sensitive to how finely products are classified?
::: solution
The Sahelian pattern is inter-industry: different goods flow in different directions, along lines of land abundance, climate and the absence of a domestic refining or pharmaceutical industry. It is the territory of the Ricardian and Heckscher–Ohlin chapters. The EU pattern is intra-industry: similar goods flow both ways, the territory of new trade theory (and of heterogeneous firms). If "vehicles" is one category, two-way trade in cars and parts produces a high GL; if each 8-digit tariff line is its own category, a country that exports compact cars and imports lorries will show a lower GL. The index is a description of a classification, not a physical constant.
:::
:::

::: exercise Multilateral resistance {level=3}
France and Germany trade less with each other, in a gravity regression that *omits* multilateral resistance, after several East Asian economies grow rapidly and become cheaper partners for both. Explain in words, using [[#prop-ces-gravity]], why this can happen even if Franco-German trade costs $\tau_{FG}$ are unchanged. What bias does Anderson and van Wincoop (2003) associate with omitting $P_i$ and $\Pi_j$?
::: hint
A fall in $\tau$ to third countries changes the price indices $P$ and $\Pi$.
:::
::: solution
In the CES gravity formula, $T_{FG} \propto Y_F Y_G (\tau_{FG}/(P_F \Pi_G))^{1-\sigma}$. Rapid growth and falling trade costs in East Asia raise each European country's access to other markets and raise the CES price index's foreign component in a way that increases multilateral resistance between France and Germany *relative to* the rest of the world: more of French and German demand is spent on Asian varieties, so $T_{FG}$ falls even at constant $\tau_{FG}$. (Equivalently: the *share* of French expenditure on German goods falls when the Asian option improves.) Omitting $P_i$ and $\Pi_j$ dumps that substitution into the error or into the estimated border and distance coefficients. Anderson and van Wincoop showed that McCallum's Canada–US border effect was inflated by this omission; the structurally estimated border effect was still large, but smaller.
:::
:::

::: exercise A value-added correction {level=3}
A country exports a gadget whose factory-gate price is 100. Imported components account for 40 of that 100; domestic labour, capital and locally produced intermediates account for 60. The gadget is sold abroad for 100. (a) What is the gross export? (b) What is the domestic value added in that export? (c) If the importing country records 100 of imports from this exporter, by what percentage does it overstate the exporter's value added in this transaction? Why might a government that looks only at gross bilateral balances misread the effect of a tariff on such a good?
::: hint
Gross flows count the 40 twice if the component-exporting country is also in the data; the importing country's *bilateral* figure of 100 still overstates the assembling country's value added.
:::
::: solution
(a) 100. (b) 60. (c) The importer's bilateral statistic attributes 100 of content to the assembler; only 60 was added there, so the overstatement is $40/60 \approx 67$ per cent of the true value added, or 40 per cent of the gross flow. A tariff levied on the 100 hits the assembler's 60 *and* the component suppliers' 40, who may reside in the importing country itself or in third countries. Gross bilateral deficits are a poor guide to who would bear a tariff and to how much domestic value a "re-shoring" would recapture. OECD–WTO TiVA tables exist precisely to make this correction; they do not make gross flows irrelevant for customs or for gravity.
:::
:::

::: exercise Reading a slowbalisation chart {level=2}
World trade/GDP rose from about 26 per cent in 1970 to about 60 per cent in 2008 and was about 58 per cent in 2023 (World Bank WDI). Give two reasons the ratio can stop rising even if the *volume* of trade is not collapsing, and one reason a services-trade series can keep rising while merchandise flattens.
::: solution
The ratio is a value share. It flattens if GDP grows as fast as trade, which happened in the 2010s as China and other large emerging economies grew quickly and as the processing-trade boom matured. It also flattens if the *price* of traded goods falls relative to non-traded services (a terms-of-trade or a Balassa–Samuelson effect), so that the same containers contribute less to the numerator relative to GDP. Merchandise volumes can even rise while the ratio falls. Services, especially digitally delivered professional, financial and entertainment services, have a different cost structure: their "distance" elasticity is often lower and their marginal transport cost is near zero, so they can keep growing as a share of trade after goods trade has levelled off (WTO 2024 on the rising services share).
:::
:::

::: exercise Distance as a bundle {level=3}
List four distinct costs that the $D_{ij}$ in a gravity regression may be picking up, one of which is policy. For each, give a real-world illustration from a different region (Europe, East Asia, Africa, the Americas). Why is it a mistake to treat a fall in one of those costs as a movement along a stable gravity curve with fixed $\theta$?
::: solution
(i) *Ocean freight*: iron ore from Western Australia to Chinese ports, or copper from Chile to East Asia — bulky commodities where dollars per tonne still matter. (ii) *Time and air freight*: cut flowers from Naivasha, Kenya, to Amsterdam, or semiconductors from East Asia to the United States; Hummels and Schaur's time-as-tariff estimates apply. (iii) *Information and coordination*: a German automaker specifying parts from a Czech or Polish supplier, or a Japanese firm monitoring a Vietnamese plant — Baldwin's second unbundling. (iv) *Policy*: USMCA rules of origin on North American autos; EU tariffs and standards on agricultural imports from North Africa; AfCFTA's unfinished internal liberalisation. A fall in one cost changes $\tau_{ij}$ and may change the *composition* of what is traded (more time-sensitive goods, more GVC slices), which can change the effective $\theta$. Gravity with a single, stable $\theta$ is an average description, not a structural invariant of geography.
:::
:::
