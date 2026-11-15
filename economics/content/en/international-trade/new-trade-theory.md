Germany exports cars to France and imports cars from France. Korea, Japan, China and the United States ship semiconductors in both directions. The Grubel–Lloyd indices of [[international-trade/trade-facts]] are high for differentiated manufactures among similar high-income economies, and they are not a prediction of Ricardo or of Heckscher–Ohlin. Those models generate *inter*-industry specialisation: different goods, different countries. Explaining *intra*-industry trade required a different engine — **increasing returns** at the firm or plant, **product differentiation**, and **imperfect competition**. Paul Krugman's 1979 and 1980 papers, and Helpman and Krugman's 1985 monograph, made that engine the second pillar of trade theory. This chapter builds it, derives the home-market effect and a sketch of economic geography, and separates the **gains from variety** from the comparative-advantage gains of the last three chapters.

The chapter is about an industry of many firms, each too small to behave like a monopolist toward the whole market but large enough to face a downward-sloping demand for its own variety. It is not yet about which *particular* firms export; that selection is [[international-trade/firms-in-trade]]. It is also not a claim that endowments have been retired. Helpman (1981, 1987) and Helpman and Krugman (1985) nested the two: inter-industry trade still follows factor abundance, while intra-industry trade fills in between similar countries. The data, at a coarse grain, look like that nest.

## Monopolistic competition and increasing returns

The workhorse preferences are Dixit–Stiglitz (1977). Consumers love variety: utility is CES over a continuum of differentiated goods, with elasticity of substitution $\sigma > 1$. A larger set of varieties raises utility even if total quantity is unchanged. Each variety is produced by a single firm with a fixed cost $F$ (in labour) and a constant marginal cost $c$ (in labour). Labour is the only factor; there is an iceberg trade cost $\tau \ge 1$ between countries. Firms enter until profits are zero.

::: definition Krugman monopolistic-competition trade model {#def-krugman}
Consumers have CES preferences over varieties with elasticity $\sigma > 1$. A firm that produces a variety has cost $w(F + c\, q)$ in a country with wage $w$, and charges a constant mark-up over marginal cost

$$
p = \frac{\sigma}{\sigma-1}\, w c.
$$ {#eq-markup}

Iceberg costs $\tau$ raise the delivered price to $\tau p$. Free entry drives expected profit to zero and pins down output per firm at a constant $q = (\sigma-1)F/c$ in the basic one-factor version. **Intra-industry trade** is two-way trade in the differentiated good. Assumptions: a continuum of firms (no strategic interaction), CES demand, constant marginal cost, a fixed cost, and, in the basic Krugman (1980) model, a single factor and identical technologies.
:::

The constant mark-up is the CES gift: perceived demand elasticity is $\sigma$, so $p/MC = \sigma/(\sigma-1)$. A fall in $c$, or a fall in $w$, is passed through one-for-one in *percentage* terms; a tariff, depending on how it is modelled, may be too. Output per firm is pinned by free entry and does not depend on country size in the simplest version: larger markets are served by *more firms*, not by larger firms. (Melitz 2003, next chapter, will break that knife-edge and let opening reallocate output toward more productive firms.)

Why is there trade between two identical countries? Because each variety is produced in only one place (the fixed cost is paid once) and is demanded everywhere (love of variety). Home consumers want Foreign varieties, Foreign consumers want Home varieties, and two-way trade in similar products appears without any difference in technology or endowments. Gravity falls out as well: CES plus iceberg costs is one of the three families that deliver [[international-trade/trade-facts#prop-ces-gravity]].

::: proposition Intra-industry trade between identical countries {#prop-iit}
In the Krugman (1980) model with two identical countries, iceberg costs $\tau \ge 1$, and a differentiated good produced under [[#def-krugman]], there is two-way trade in that good whenever $\tau$ is finite. The volume of trade falls as $\tau$ rises and vanishes as $\tau \to \infty$. Comparative advantage is not required.
:::

::: proof
Each country produces $n$ varieties, determined by labour-market clearing and free entry. A Home consumer spends a CES share of income on Foreign varieties, and that share is positive at any finite $\tau$ because delivered prices $\tau p^*$ are finite. The corresponding Foreign expenditure on Home varieties is, by symmetry, equal. Balanced two-way trade follows. As $\tau \to \infty$, the foreign share goes to zero (the goods become infinitely expensive to import), which is autarky.
:::

::: example A mark-up and a CES demand {#ex-markup}
Let $\sigma = 5$, $w = 1$, $c = 2$, $F = 10$. Compute the mill price, the mark-up $p/(wc)$, and free-entry output per firm $q = (\sigma-1)F/c$. If a Foreign iceberg cost $\tau = 1.2$ is applied, what is the delivered price abroad?
::: solution
$p = \frac{5}{4} \cdot 2 = 2.5$. The mark-up over marginal cost is $2.5/2 = 1.25 = \sigma/(\sigma-1)$. Free-entry output is $q = 4\cdot 10 / 2 = 20$. Delivered price is $1.2 \times 2.5 = 3$. Foreign consumers pay the iceberg; the firm's mill price, in this CES case with mill pricing, is unchanged.
:::
:::

::: widget plot
f: A*x^(-1/s); c; A*(1-1/s)*x^(-1/s)
sliders: A=12:6:20; s=4:2.5:8; c=2:1:4
x: 0.5, 12
y: 0, 10
labels: \text{inverse demand}; \text{MC}; \text{MR}
caption: A CES inverse demand $p = A q^{-1/\sigma}$, marginal cost $c$, and marginal revenue. The firm produces where MR $= $ MC; free entry will shift $A$ (the demand intercept, which absorbs the number of rivals) until price equals average cost. Raise $\sigma$ (the slider $s$): demand flattens, the mark-up shrinks, and the MR–demand gap narrows. That is more substitutable varieties.
:::

::: example A CES price index {#ex-ces-index}
A CES price index over $n$ symmetric varieties each priced at $p$ is $P = n^{1/(1-\sigma)} p$. Let $\sigma = 5$ and $p = 1$. Compute $P$ at $n = 16$ and at $n = 81$, and the implied rise in real income $m/P$ for a consumer with income $m$ if $n$ rises from 16 to 81 at constant $p$.
::: solution
$1/(1-\sigma) = -1/4$, so $P = n^{-1/4} p$. At $n=16$, $P = 16^{-1/4} = (2^4)^{-1/4} = 1/2$. At $n=81$, $P = 81^{-1/4} = (3^4)^{-1/4} = 1/3$. Real income rises by a factor $(m/(1/3))/(m/(1/2)) = 3/2$, a 50 per cent gain, with *no* change in any mill price. That is the variety channel of Broda and Weinstein (2006) in a symmetric example.
:::
:::

::: warning Mark-ups are not a tariff
A CES mark-up of 25 per cent on marginal cost is a feature of preferences and market structure, not a policy instrument. It is a *private* distortion relative to the first-best (price should equal marginal cost), but with free entry it is also what pays for the fixed cost of the variety. A tariff is a *public* wedge between domestic and foreign prices. Treating the two as interchangeable — "protection to offset foreign mark-ups" — is the starting slip of some strategic-trade arguments, which [[international-trade/political-economy-of-trade]] will treat with their assumptions and their critics. In this chapter the mark-up is an equilibrium object, not a lever.
:::

## Gains from variety and the home-market effect

Opening to trade in the Krugman model has three effects, which later quantitative work has tried to separate.

1. **More varieties.** Consumers gain access to foreign varieties. Broda and Weinstein (2006) estimate that the expansion of imported varieties into the United States, 1972–2001, was worth the equivalent of a 1.2 per cent of GDP fall in the US import price index — a *gains-from-variety* number, not a complete welfare account. Feenstra (1994) had developed the exact CES price index that makes such a calculation possible.

2. **Pro-competitive effects.** In versions with a finite elasticity that depends on the number of firms, or with non-CES demand (Ottaviano, Tabuchi and Thisse 2002; Melitz and Ottaviano 2008), opening flattens residual demand, cuts mark-ups, and raises output per firm. CES mill-pricing shuts this channel down by construction.

3. **Scale.** A larger integrated market can support more firms, or the same firms at lower average cost, depending on the free-entry condition. In the one-factor Krugman (1980) model, output per firm is fixed and the gain is in $n$, not in $q$.

These gains do *not* replace the comparative-advantage gains of [[international-trade/ricardian-model#thm-gains]]. They add a source of gains that can operate between identical economies, where Ricardo and HO predict no trade and no gain. Arkolakis, Costinot and Rodríguez-Clare (2012) later showed that in a large class of models (including Krugman and Melitz), the welfare gain from trade has a sufficient-statistic form $1-\lambda^{1/\varepsilon}$, where $\lambda$ is the home expenditure share and $\varepsilon$ is a trade elasticity. Variety, scale and selection are then three stories about what $\varepsilon$ and $\lambda$ contain, not three extra terms in the formula.

::: theorem Home-market effect {#thm-hme}
In the Krugman (1980) two-country model with a differentiated increasing-returns good and a constant-returns "outside" good (or with labour as the numeraire and wages that can differ), the country with the larger demand for the differentiated good produces a *more than proportional* share of that good and is a net exporter of it. Assumptions: iceberg costs, CES monopolistic competition, mobile labour between sectors (or an outside good that equalises wages), and a demand difference that is not fully offset by a wage difference.
:::

::: proof Sketch.
Iceberg costs make it cheaper to serve a market from inside that market. Free entry and CES imply that the number of firms in a country is increasing in that country's expenditure on the good. Because firms prefer the large market as a production site (they save $\tau$ on a larger share of sales), the share of firms in the large country exceeds its share of demand. The large country therefore net-exports the increasing-returns good. Krugman (1980) and Helpman and Krugman (1985, ch. 10) give the algebra; the outside good (or a second sector) is needed to pin down relative wages so that the whole adjustment does not fall on $w$.
:::

The home-market effect is a reason a large, rich economy might export aircraft, software or entertainment — goods with large fixed costs — even if it has no Ricardian or HO advantage in them. It is also a reason that **market access** (EU membership, a coastal location, a language) can look like a productivity advantage in the data. Davis (1998) showed that the effect can disappear if both goods have similar transport costs and there is no outside good; like FPE, it is a theorem, not a universal fact. Hanson and Xiang (2004) find evidence for it in a panel of industries and countries; the later economic-geography literature (Head and Mayer 2004, 2014) treats it as a robust but quantitatively moderate force.

::: example A miniature home market {#ex-hme}
Two countries, Home with 80 per cent of world expenditure on a differentiated good and Foreign with 20 per cent. Iceberg costs are such that firms in the large market have a cost advantage on 80 per cent of world sales. Explain why the equilibrium share of firms at Home exceeds 80 per cent, and what that implies for net trade. (A numerical Krugman equilibrium is asked in the exercises.)
::: solution
A firm located at Home pays no iceberg on 80 per cent of world sales and pays $\tau$ on 20 per cent; a firm at Foreign does the reverse. At equal wages, Home is the more profitable site, so firms enter there until wages (or a crowding of varieties) restore zero profit. The adjustment that restores equilibrium still leaves Home with *more than* 80 per cent of firms, because that is the only way to make the two locations equally profitable given Home's intrinsic advantage. Home therefore produces more than 80 per cent of varieties and, with 80 per cent of demand, is a net exporter. That is [[#thm-hme]] in words.
:::
:::

::: example Helpman–Krugman nest, in numbers {#ex-hk-nest}
Country A is capital-abundant and produces 70 of a homogeneous capital-intensive good (food) and 40 varieties of a manufacture; country B produces 30 of food and 40 varieties of the same manufacture. Tastes are identical and homothetic; each country consumes food and manufactures in proportion to income, and each variety is demanded everywhere. Describe the inter-industry and intra-industry flows, assuming the two countries have equal income.
::: solution
Equal income and identical homothetic tastes: each consumes half of world food ($50$) and half of each variety. A produces 70 food and consumes 50, so A *exports 20 food* (inter-industry). B exports 20 of manufactures in net, but *both* export varieties to each other: A's 40 varieties go partly to B and B's 40 partly to A (intra-industry). Net trade follows HO; two-way trade in manufactures is Krugman. The Grubel–Lloyd index in manufactures is high; in food it is low.
:::
:::

::: quiz
Two identical countries open to trade in a Krugman (1980) differentiated good. Which statement is correct?
- [ ] There is no trade, because there is no comparative advantage
- [x] There is two-way intra-industry trade, and consumers gain from extra varieties
- [ ] Each country specialises completely, as in Ricardo
- [ ] Mark-ups fall to zero, because competition becomes perfect
::: solution
[[#prop-iit]]: identical countries trade varieties. CES mill-pricing keeps mark-ups at $\sigma/(\sigma-1)$; they do not fall to zero. Complete specialisation is a Ricardian (or HO, outside the cone) outcome, not a Krugman one: here both countries produce the differentiated good.
:::
:::

## Economic geography, in brief

Krugman (1991), "Increasing Returns and Economic Geography", asked what happens if labour *can* move between regions, so that market size is endogenous. Two regions, a differentiated increasing-returns good and a constant-returns agricultural good, iceberg costs, and mobile manufacturing workers produce a circularity: firms want to be where the market is, workers want to be where the firms are. At high transport costs, production stays spread out (to serve local agricultural demand). At low transport costs, it can agglomerate in one region — a **core–periphery** pattern. The same circularity, at the scale of countries, is a force behind the concentration of manufacturing in coastal China, in the European "blue banana", and in the US manufacturing belt, alongside endowments, policy and history.

The 1991 model is a cousin of this chapter, not a substitute for urban economics or for development. It has been criticised for knife-edge assumptions (a single manufacturing good, no intermediate inputs, CES) and has been generalised (Fujita, Krugman and Venables 1999; Ottaviano, Tabuchi and Thisse 2002). Redding and Rossi-Hansberg (2017) survey the quantitative spatial models that grew out of it. For this course, one lesson travels: **market size is not a primitive** once people and firms can move, and trade costs then have effects on *where* production sits, not just on how much is traded. That is a home-market effect with a moving market.

::: application Aircraft, films and financial services
Wide-body aircraft (Boeing in the United States, Airbus in the EU), live-action films (southern California, and a smaller cluster in India), and wholesale financial services (London, New York, Hong Kong SAR, Singapore) are activities with large fixed costs, differentiated products and a tendency to sit in large, rich, accessible markets. A HO story (skilled labour, capital) is part of each. A home-market-and-agglomeration story is the rest: the customers are in those markets, the specialised labour is there because the firms are there, and iceberg-like costs of delivering the service (time zones, regulation, face-to-face contact) keep a second, smaller cluster from replicating the first. The model does not pick a winner between Seattle and Toulouse; it says why there are two clusters rather than twenty.
:::

## Evidence on intra-industry trade

Grubel and Lloyd (1975) is the fact. Helpman (1987) showed that the share of intra-industry trade in bilateral trade is higher when two countries are more similar in GDP per capita and in endowments, which is the Helpman–Krugman nest: similar countries trade varieties, dissimilar countries trade factors. The relationship is in the data and is not perfect; Hummels and Levinsohn (1995) found that it also holds for countries that should, on endowment grounds, be dissimilar, a result that pushed the literature toward gravity and toward firm-level data.

At the industry level, intra-industry trade is higher in differentiated manufactures than in homogeneous commodities (chemicals and machinery versus crude oil and wheat). Vertical intra-industry trade — two-way trade in different *qualities* of the same category — is a large share of North–South two-way trade (Fontagné, Freudenberg and Gaulier 2006). That fact sits between this chapter (differentiation) and HO (quality as a skill-intensive attribute, Schott 2004).

The gains-from-variety estimates of Broda and Weinstein (2006) for the United States, and subsequent work for other countries, are the closest the literature has to a number on this chapter's distinctive welfare channel. They are CES-index calculations, not randomised trials; they depend on the estimated elasticities of substitution. They are still the right kind of evidence for a variety model, and they are not small.

::: history
**1933, Edward Chamberlin** and **1933, Joan Robinson** invent monopolistic competition, without trade. **1977, Avinash Dixit and Joseph Stiglitz** give it a CES workhorse. **1979 and 1980, Paul Krugman** put that workhorse into trade, generating intra-industry trade and the home-market effect. **1985, Elhanan Helpman and Paul Krugman**, *Market Structure and Foreign Trade*, nest HO and monopolistic competition. **1991, Krugman**, the core–periphery geography paper. **2006, Christian Broda and David Weinstein** estimate US gains from imported varieties. Krugman received the 2008 Nobel Prize in Economic Sciences in part for this work.
:::

## Where this leads

The firms in this chapter are symmetric. In the data they are not: a few firms account for most exports, exporters are larger and more productive than non-exporters, and many firms sell only at home. [[international-trade/firms-in-trade]] gives them a productivity draw and a fixed cost of exporting, and with those it generates selection, reallocation, offshoring and global value chains. The CES-plus-iceberg structure is inherited; the new facts are firm-level. Tariffs, in [[international-trade/tariffs-and-quotas]], will interact with mark-ups and with variety as well as with comparative advantage. Industrial policy that tries to "create" a home-market advantage is a live dispute; its assumptions and its critics belong in [[international-trade/political-economy-of-trade]], not here.

::: summary
- Intra-industry trade between similar countries is a fact that Ricardo and HO, in 2 × 2 form, cannot generate. Monopolistic competition with increasing returns can ([[#def-krugman]], [[#prop-iit]]).
- CES demand plus a fixed cost delivers a constant mark-up $p = \frac{\sigma}{\sigma-1} MC$ and, in the basic model, a constant output per firm. Larger markets support more varieties.
- Gains from trade then include gains from variety (Broda and Weinstein 2006), and in non-CES versions pro-competitive mark-up cuts, on top of comparative-advantage gains.
- The home-market effect: the larger demand country produces more than proportionally and net-exports the increasing-returns good ([[#thm-hme]]). Economic geography endogenises the location of that demand.
- Helpman–Krugman nesting: inter-industry trade follows endowments; intra-industry trade fills in between similar countries. Firm heterogeneity is the next chapter.
:::

## Exercises

::: exercise A CES mark-up {level=1 check="1.25"}
If $\sigma = 5$, what is the mill-price mark-up $p/MC = \sigma/(\sigma-1)$?
::: solution
$5/4 = 1.25$.
:::
:::

::: exercise Free-entry output {level=1 check="20"}
With $\sigma = 5$, $F = 10$, $c = 2$, compute free-entry output per firm $q = (\sigma-1)F/c$.
::: solution
$4\cdot 10 / 2 = 20$.
:::
:::

::: exercise Delivered price {level=1 check="3"}
A mill price of $2.5$ meets an iceberg $\tau = 1.2$. What is the delivered price?
::: solution
$1.2 \times 2.5 = 3$.
:::
:::

::: exercise Why identical countries trade {level=2}
In two sentences, explain why two countries with identical tastes, technologies and endowments trade in the Krugman model, and why they do not in the 2 × 2 HO model.
::: solution
Each Krugman variety is produced in one place (a fixed cost) and demanded everywhere (love of variety), so Home and Foreign exchange different varieties of the same good. In 2 × 2 HO, identical endowments imply identical production mixes and, with identical tastes, no trade; there is no variety margin and no fixed cost to concentrate production of a given good in one country.
:::
:::

::: exercise Variety and a price index {level=2}
A CES price index over $n$ symmetric varieties each priced at $p$ is $P = n^{1/(1-\sigma)} p$. If $n$ doubles at constant $p$ and $\sigma = 5$, by what factor does $P$ fall? Interpret the fall as a welfare gain for a consumer with income $m$ (indirect utility $m/P$).
::: hint
$n^{1/(1-\sigma)} = n^{-1/4}$ when $\sigma = 5$.
:::
::: solution
$P' / P = 2^{1/(1-5)} = 2^{-1/4} \approx 0.841$. The price index falls by about 16 per cent; real income $m/P$ rises by a factor $2^{1/4} \approx 1.189$, an 19 per cent gain, *even though each mill price is unchanged*. That is the gains-from-variety channel. Broda and Weinstein (2006) implement a version of this index on US import data.
:::
:::

::: exercise Home-market logic {level=2}
A small country and a large country have the same per-capita demand for aircraft, which are produced with a large fixed cost. Using [[#thm-hme]], which country is predicted to net-export aircraft, and why is "same per-capita demand" not a reason to predict no trade?
::: solution
The large country has the larger *aggregate* demand. Firms prefer to locate there to save iceberg costs on the larger share of sales; the large country ends up with a more than proportional share of production and net-exports. Per-capita demand governs tastes; agglomeration and market size govern *where the fixed cost is paid*. Identical tastes with different sizes are the home-market case, not the no-trade case.
:::
:::

::: exercise CES versus pro-competitive gains {level=3}
Explain why the basic Krugman (1980) CES model with mill pricing does *not* deliver a fall in mark-ups when trade opens, and name one modelling change (Melitz–Ottaviano, or a variable elasticity) that would deliver it. Why might a competition authority still care about trade opening in the CES case?
::: solution
CES demand has a constant perceived elasticity $\sigma$, so $p/MC$ is constant. Opening adds varieties and can change $n$ and welfare via the price *index*, but not via $p/MC$. A linear-demand monopolistic-competition model (Ottaviano, Tabuchi and Thisse 2002; Melitz and Ottaviano 2008) makes the elasticity rise with $n$, so mark-ups fall — a pro-competitive gain. In CES, a competition authority still cares because more varieties raise $n^{1/(1-\sigma)}$ and because trade can discipline firms that are *not* in the monopolistic-competition limit (oligopoly, the next chapter's large exporters). The sufficient statistic of Arkolakis, Costinot and Rodríguez-Clare (2012) folds these stories into $\lambda$ and $\varepsilon$.
:::
:::

::: exercise Helpman–Krugman nest {level=3}
Country A is capital-abundant relative to country B; both produce a capital-intensive homogeneous good (food) and a labour-using differentiated manufacture. Sketch, using Helpman and Krugman (1985), the pattern of *inter*-industry and *intra*-industry trade between them. Which chapter's theorem governs the inter-industry part?
::: hint
Net trade in food versus manufactures follows HO; two-way trade in manufactures is Krugman.
:::
::: solution
A net-exports food and net-imports manufactures (HO, [[international-trade/heckscher-ohlin#thm-ho]]). Inside manufactures, A and B exchange varieties (Krugman, [[#prop-iit]]). The share of intra-industry trade in their bilateral total is higher the more similar they are in endowments; the net inter-industry surplus is higher the more different they are. Helpman (1987) is the empirical counterpart; Hummels and Levinsohn (1995) is the qualification.
:::
:::

::: exercise Geography at high and low trade costs {level=2}
In Krugman's (1991) core–periphery sketch, manufacturing is spread across two regions when transport costs are high and can agglomerate when they are low. Give the two opposing forces, and an illustration from East Asia or Europe.
::: solution
**Dispersion:** serving local agricultural (or, more generally, immobile) demand is cheaper when $\tau$ is high, so firms spread out. **Agglomeration:** saving $\tau$ on the larger market, plus the desire of mobile workers to live where varieties are cheap, pulls firms together when $\tau$ is low. Illustration: manufacturing concentration on China's coast and in the Pearl River and Yangtze deltas as internal and external trade costs fell after 1978; or the EU's manufacturing belt from the English Midlands through the Rhine to northern Italy, against a more agricultural periphery, as intra-European trade costs fell.
:::
:::

::: exercise Sufficient statistics {level=3}
Arkolakis, Costinot and Rodríguez-Clare (2012) write the welfare gain from trade, in a class of models that includes Krugman (1980) and Melitz (2003), as $1 - \lambda^{1/\varepsilon}$, where $\lambda$ is the share of spending on domestic goods. If $\lambda = 0.81$ and $\varepsilon = 4$, compute the implied equivalent variation as a share of income. What does the formula *not* tell you?
::: solution
$1 - 0.81^{1/4}$. Now $0.81 = 0.9^2$ so $0.81^{1/2} = 0.9$ and $0.81^{1/4} = \sqrt{0.9} \approx 0.949$. Then $1-0.949 = 0.051$, about 5.1 per cent of income. The formula does not decompose the gain into variety, scale and selection, does not identify winners and losers inside the country, and does not say whether $\lambda$ changed because of a tariff, a transport improvement or a foreign productivity shock. It is a *sufficient statistic* for the national CES-like gain, given $\lambda$ and $\varepsilon$, not a complete political economy.
:::
:::
