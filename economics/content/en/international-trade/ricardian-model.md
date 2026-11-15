England, wrote David Ricardo in 1817, might be so superior to Portugal in making cloth that Portuguese labour would be less productive even at wine — and yet both countries could gain if England specialised in cloth and Portugal in wine. The arithmetic was the first clean statement of **comparative advantage**: what matters for trade is not who is better at producing a good, but who is better *relative to other goods*. This chapter turns that arithmetic into a general-equilibrium model with labour as the only factor, derives the pattern of specialisation and the gains from trade, and asks how much of the inter-industry trade in [[international-trade/trade-facts]] the model can explain.

The model is deliberately stark. There is one factor, labour; two goods; constant unit labour requirements; and competitive markets. Technology differs across countries; tastes, in the basic version, do not. Those assumptions deliver a complete theory of *what is traded* and of *national* gains. They are silent on the distribution of those gains inside a country — that is the next chapter, [[international-trade/specific-factors]] — and they cannot generate the two-way trade in similar products that the Grubel–Lloyd index records. What they get right is worth getting right: the difference between absolute and comparative advantage, the role of relative prices, and the sense in which trade is a technology for transforming one good into another at better terms than the domestic production-possibility frontier allows.

## Technology, autarky and opportunity cost

Two countries, Home and Foreign (Foreign variables starred), produce cloth $C$ and wine $W$ with labour. Home has $L$ workers, Foreign $L^*$. Labour is mobile between sectors inside a country and immobile between countries. Markets are competitive; labour is paid its marginal product, which here is the inverse of the unit labour requirement.

::: definition Ricardian technologies {#def-ricardo}
A **unit labour requirement** $a_{LC}$ is the hours of labour needed to produce one unit of cloth at Home; $a_{LW}$, $a_{LC}^*$ and $a_{LW}^*$ are defined analogously. Home's **production-possibility frontier** (PPF) is the line

$$
a_{LC}\, Q_C + a_{LW}\, Q_W = L, \qquad Q_C \ge 0,\; Q_W \ge 0.
$$ {#eq-ppf}

The **opportunity cost** of cloth in terms of wine at Home is $a_{LC}/a_{LW}$: the wine forgone when one more unit of cloth is produced. Foreign's opportunity cost is $a_{LC}^*/a_{LW}^*$. Labour coefficients are constant (constant returns, no other factors), so the PPF is a straight line and the opportunity cost is constant.
:::

Home has an **absolute advantage** in cloth if $a_{LC} < a_{LC}^*$ (fewer hours per unit) and a **comparative advantage** in cloth if its opportunity cost is lower:

$$
\frac{a_{LC}}{a_{LW}} < \frac{a_{LC}^*}{a_{LW}^*}.
$$ {#eq-ca}

Comparative advantage is a ranking of *ratios*. A country can have an absolute disadvantage in both goods and still have a comparative advantage in one of them. That is the whole of Ricardo's point, and it is the point that is most often missed.

In autarky each country must consume what it produces. Competitive labour markets and a linear PPF imply that if both goods are produced and demanded, the autarky relative price equals opportunity cost:

$$
\left(\frac{p_C}{p_W}\right)^{\mathrm{aut}} = \frac{a_{LC}}{a_{LW}}, \qquad \left(\frac{p_C}{p_W}\right)^{*\mathrm{aut}} = \frac{a_{LC}^*}{a_{LW}^*}.
$$

The real wage in units of cloth is $w/p_C = 1/a_{LC}$; in units of wine, $w/p_W = 1/a_{LW}$. A more productive country (smaller $a$) has higher real wages in autarky. Absolute advantage governs living standards in autarky; comparative advantage will govern the pattern of trade.

::: example Absolute disadvantage, comparative advantage {#ex-both-better}
Home's unit labour requirements are $a_{LC} = 1$, $a_{LW} = 2$; Foreign's are $a_{LC}^* = 6$, $a_{LW}^* = 3$. Home labour is $L = 120$. (a) Who has an absolute advantage in each good? (b) Who has a comparative advantage in each good? (c) Write Home's PPF and the opportunity cost of cloth.
::: solution
(a) Home has an absolute advantage in both: $1 < 6$ in cloth and $2 < 3$ in wine. Foreign is worse at everything.

(b) Home's opportunity cost of cloth is $1/2$ units of wine; Foreign's is $6/3 = 2$ units of wine. Home has a comparative advantage in cloth ($1/2 < 2$), Foreign in wine. Equivalently, Home's productivity advantage is sixfold in cloth and only 1.5-fold in wine; the *narrower* absolute advantage is Foreign's comparative advantage.

(c) $1\cdot Q_C + 2\cdot Q_W = 120$, or $Q_W = 60 - \tfrac12 Q_C$. The opportunity cost of one cloth is $1/2$ wine.
:::
:::

::: widget plot
f: 60-a*x; 40-(2/3)*x
sliders: a=0.5:0.2:2
x: 0, 130
y: 0, 70
labels: \text{Home PPF}; \text{Foreign PPF}
caption: Home's PPF is $Q_W = 60 - a\, Q_C$; the slider $a$ is Home's opportunity cost of cloth in wine (default $1/2$). Foreign's PPF in the example with $L^*=120$, $a_{LC}^*=6$, $a_{LW}^*=3$ is $Q_W = 40 - \tfrac23 Q_C$, a steeper line: cloth is more expensive in wine at Foreign. Flatten Home's line (smaller $a$) and Home's comparative advantage in cloth widens. Trade will let each country consume *outside* its own PPF.
:::

The widget's Foreign line uses $L^* = 120$, $a_{LC}^* = 6$, $a_{LW}^* = 3$: $6 Q_C + 3 Q_W = 120$ gives $Q_W = 40 - 2 Q_C/3$. Home's line is flatter, which is the geometric picture of comparative advantage in cloth.

::: warning Absolute advantage does not decide the pattern of trade
The most common mistake in this chapter is to predict that the country which is "better at everything" will export everything. In [[#ex-both-better]] Home is better at everything and will *import* wine. Trade is determined by opportunity cost, not by output per worker. A high-productivity country has high wages; those wages price it out of the goods in which its productivity advantage is relatively small. The next section makes the wage part precise.
:::

## Relative supply, relative demand and the pattern of trade

Once goods can be traded, a single relative price $p = p_C / p_W$ clears the world market. Producers in each country compare $p$ with their opportunity cost and specialise accordingly.

::: proposition Specialisation in the Ricardian model {#prop-specialise}
Assume [[#def-ricardo]], competitive labour markets, and $a_{LC}/a_{LW} < a_{LC}^*/a_{LW}^*$. Let $p = p_C/p_W$. Then:

- if $p < a_{LC}/a_{LW}$, both countries produce only wine;
- if $p = a_{LC}/a_{LW}$, Foreign produces only wine and Home produces both goods (or either);
- if $a_{LC}/a_{LW} < p < a_{LC}^*/a_{LW}^*$, Home produces only cloth and Foreign only wine;
- if $p = a_{LC}^*/a_{LW}^*$, Home produces only cloth and Foreign produces both;
- if $p > a_{LC}^*/a_{LW}^*$, both produce only cloth.

World **relative supply** of cloth to wine is therefore a step function: zero below Home's opportunity cost, a vertical segment at complete specialisation, and infinite above Foreign's opportunity cost.
:::

::: proof
A competitive firm at Home produces cloth if and only if $p_C / a_{LC} \ge p_W / a_{LW}$, that is $p \ge a_{LC}/a_{LW}$ (the wage $w$ equals the value of the marginal product in the sector that is active, and no firm produces a good that cannot meet that wage). The Foreign comparison is $p \ge a_{LC}^*/a_{LW}^*$. Combining the two inequalities gives the five cases. At complete specialisation Home's cloth output is $L/a_{LC}$ and Foreign's wine output is $L^*/a_{LW}^*$, so relative supply is the finite number $(L/a_{LC})/(L^*/a_{LW}^*)$.
:::

Demand closes the model. A convenient special case is Cobb–Douglas preferences with equal expenditure shares, so that consumers in both countries spend half their income on each good. World relative demand then satisfies $p_C Q_C^D = p_W Q_W^D$, or

$$
\frac{Q_C^D}{Q_W^D} = \frac{1}{p}.
$$ {#eq-rd}

Relative demand is a rectangular hyperbola. Equilibrium is where it crosses relative supply. If that crossing lies on the vertical step of complete specialisation, $p$ lies *strictly between* the two autarky prices and each country specialises in its comparative-advantage good. If one country is very large, the crossing can occur on a horizontal step: the large country produces both goods, the small country specialises, and the world price equals the large country's autarky price. The small country then captures *all* the gains from trade; the large country neither gains nor loses on the production side (it still has the same prices) but does not lose either.

::: widget plot
f: 1/x
x: 0.15, 4
y: 0, 3
hlines: 0.5; 2
vlines: 1
labels: \text{relative demand } (p = 1/x)
caption: Relative price of cloth $p = p_C/p_W$ on the vertical axis, relative quantity $Q_C/Q_W$ on the horizontal. The horizontal lines are the two autarky prices (opportunity costs $1/2$ and $2$). The vertical line is world relative supply under complete specialisation in the worked example below, where that supply equals $1$. Relative demand $p = 1/x$ crosses the vertical segment at $p = 1$, inside $(1/2, 2)$. Drag along the demand curve to see why a more cloth-loving world (a shift of demand to the right) would raise $p$ and, if it pushed $p$ up to $2$, force Foreign to produce some cloth.
:::

::: example A complete specialisation equilibrium {#ex-trade-eq}
Home: $a_{LC} = 1$, $a_{LW} = 2$, $L = 100$. Foreign: $a_{LC}^* = 2$, $a_{LW}^* = 1$, $L^* = 100$. Preferences are Cobb–Douglas with equal shares in both countries. Find the autarky prices, the trading relative price, the pattern of production, and consumption in each country in autarky and under trade.
::: solution
Autarky prices equal opportunity costs: $p^{\mathrm{aut}} = 1/2$ at Home, $p^{*\mathrm{aut}} = 2$ at Foreign.

In autarky, half of Home's labour goes to each good (equal shares and a linear technology), so $Q_C = 50$, $Q_W = 25$. Foreign: $Q_C^* = 25$, $Q_W^* = 50$.

Under trade, the complete-specialisation relative supply is $(L/a_{LC})/(L^*/a_{LW}^*) = 100/100 = 1$. Relative demand $1/p$ equals $1$ at $p = 1$, which lies in $(1/2, 2)$. So Home produces only cloth ($Q_C = 100$), Foreign only wine ($Q_W^* = 100$).

Income at Home is $p_C \cdot 100$. With $p = 1$ we may set $p_C = p_W = 1$. Equal shares give Home consumption $(C, W) = (50, 50)$. Foreign consumption is also $(50, 50)$. Home consumes the same cloth as in autarky and twice the wine; Foreign consumes the same wine and twice the cloth.
:::
:::

The same numbers show the **trade triangle**. Home exports 50 cloth and imports 50 wine; Foreign does the reverse. Balanced trade holds because we have a real model with two goods and no capital flows: $p_C \cdot 50 = p_W \cdot 50$.

::: quiz
Home has a comparative advantage in cloth. In a free-trade equilibrium with complete specialisation, the world relative price of cloth $p_C/p_W$
- [ ] equals Home's autarky price
- [ ] equals Foreign's autarky price
- [x] lies strictly between the two autarky prices
- [ ] equals 1, regardless of technologies
::: solution
Complete specialisation occurs only when relative demand cuts the vertical step of relative supply, and that step exists only between the two opportunity costs. The world price must therefore lie strictly between the autarky prices. (It equals 1 in [[#ex-trade-eq]] because of a symmetric example, not because the model says so in general.)
:::
:::

## Gains from trade

The consumption numbers in [[#ex-trade-eq]] already show that both countries consume a bundle that was infeasible in autarky. The general argument does not depend on Cobb–Douglas tastes.

::: theorem Gains from trade in the Ricardian model {#thm-gains}
Assume [[#def-ricardo]] and [[#prop-specialise]], and that consumers have locally non-satiated preferences. Then, compared with autarky:

1. If the free-trade relative price differs from a country's autarky price, that country can attain a consumption bundle it strictly prefers to autarky, using the same labour.
2. If the free-trade price equals a country's autarky price (the large-country case of incomplete specialisation), that country is neither better nor worse off; the other country still gains if it specialises.

Trade is equivalent to a technological expansion of each country's consumption possibility set: the world market lets a country transform its export good into its import good at a rate more favourable than domestic opportunity cost.
:::

::: proof
Take Home, and suppose $p > a_{LC}/a_{LW}$. Home specialises in cloth and earns wage $w = p_C / a_{LC}$ in cloth units. The budget line in $(C, W)$-space has slope $-p$ (in wine per cloth) and passes through the specialisation point $(L/a_{LC},\, 0)$. The autarky budget line has slope $-a_{LC}/a_{LW}$ and passes through every autarky production point on the PPF. Because $p > a_{LC}/a_{LW}$, the trade budget line lies strictly outside the PPF except at the cloth intercept. Any autarky bundle is therefore strictly affordable, and a little more of the imported good can be bought; local non-satiation gives a strict preference. The symmetric argument applies to Foreign when $p$ is below Foreign's opportunity cost. If $p$ equals Home's opportunity cost, Home's budget line coincides with its PPF and welfare is unchanged.
:::

Two comments. First, the theorem is about *national* consumption possibilities. It does not say that every worker gains, because in this model there is only one type of worker and full employment at a single wage; distribution across factors is a question for [[international-trade/specific-factors]] and [[international-trade/heckscher-ohlin]]. Second, the theorem assumes that labour can move between sectors without cost. If it cannot, the short-run picture is different, and some workers attached to the import-competing sector lose. The gains-from-trade result is not a claim that opening is painless.

The real wage tells the same story from the worker's point of view. Under complete specialisation Home's wage buys $1/a_{LC}$ units of cloth, as in autarky, and $p \cdot (1/a_{LC})$ units of wine, which is *more* than the autarky $1/a_{LW}$ because $p > a_{LC}/a_{LW}$. Workers gain as consumers of the imported good; they do not lose as consumers of the exported good. Foreign workers gain on cloth and are no worse off on wine.

::: example Real wages in the worked example {#ex-real-wages}
Using the technologies and the free-trade price of [[#ex-trade-eq]], compute Home and Foreign real wages in units of each good, in autarky and under trade. Confirm that each country's workers can buy at least as much of both goods, and strictly more of the imported good.
::: solution
Home autarky: $w/p_C = 1/a_{LC} = 1$, $w/p_W = 1/a_{LW} = 1/2$.

Home trade ($p = 1$): $w/p_C = 1$, $w/p_W = (w/p_C)\, p = 1$. Wine wages double; cloth wages are unchanged.

Foreign autarky: $w^*/p_C^* = 1/a_{LC}^* = 1/2$, $w^*/p_W^* = 1$.

Foreign trade: $w^*/p_W = 1$, $w^*/p_C = 1$. Cloth wages double; wine wages are unchanged.

Each worker can buy the autarky bundle and have income left over for the import good, which is the labour-market version of [[#thm-gains]].
:::
:::

::: intuition Trade as a technology
Home's workers are paid in cloth. The world market offers $p$ units of wine per unit of cloth. Home's factories offer only $a_{LC}/a_{LW}$ units of wine per unit of cloth. Whenever $p$ exceeds that factory rate, shipping cloth abroad *is* a more productive wine technology than making wine at home. Ricardo's Portugal, importing English cloth, is not conceding inferiority; it is using English labour as a machine for making cloth at a better rate than Portuguese labour can.
:::

## Wages, the chain of comparative advantage and many goods

With many goods the same logic produces a **chain of comparative advantage**. Rank goods by Home's relative productivity $a_j^*/a_j$, from highest to lowest. There is a cutoff: Home produces the goods in which its relative productivity exceeds the wage ratio $w/w^*$, and Foreign produces the rest.

A useful special case is the continuum of goods in Dornbusch, Fischer and Samuelson (1977). Goods are indexed by $z \in [0,1]$, unit labour requirements are $a(z)$ and $a^*(z)$, and $A(z) \equiv a^*(z)/a(z)$ is decreasing in $z$. Home produces all $z$ below a cutoff $\bar z$ defined by

$$
A(\bar z) = \frac{w}{w^*}.
$$ {#eq-dfs}

Relative demand (or a trade-balance condition) then determines $w/w^*$ jointly with $\bar z$. An improvement in Home's productivity in some range of $z$, or an increase in $L$, shifts the cutoff and the relative wage. The continuum makes comparative advantage a *margin* rather than a binary specialisation, and it is the bridge from Ricardo to modern quantitative Ricardian models (Eaton and Kortum 2002; Costinot, Donaldson and Komunjer 2012).

The relative wage has a further implication that returns to the warning about absolute advantage. In the two-good complete-specialisation case,

$$
\frac{w}{w^*} = \frac{p_C / a_{LC}}{p_W / a_{LW}^*} = p \cdot \frac{a_{LW}^*}{a_{LC}}.
$$

High Home productivity (low $a_{LC}$) is matched by a high Home wage. Foreign can still sell its comparative-advantage good because *its* wage is lower in proportion to *its* productivity in that good. "Cheap labour" in the model is not an independent explanation of trade; it is the market's translation of low productivity into a low real wage. A country does not capture markets by being poor. It captures the markets in which it is relatively less poor at producing.

::: example A relative wage {#ex-relative-wage}
In [[#ex-trade-eq]] the free-trade price is $p = 1$. Compute $w/w^*$. Now suppose Home's labour force doubles to $L = 200$, everything else unchanged, and demand remains Cobb–Douglas with equal shares. What happens to the pattern of specialisation and to $p$? (A full computation of the new $p$ is asked in the exercises.)
::: solution
With $p = 1$, $a_{LC} = 1$, $a_{LW}^* = 1$, we have $w/w^* = 1$. Wages are equal in a common unit because the example is symmetric.

If $L$ doubles, complete-specialisation relative supply of cloth becomes $200/100 = 2$. Relative demand $1/p$ equals $2$ at $p = 1/2$. But $p = 1/2$ is exactly Home's opportunity cost, so the equilibrium is no longer in the interior of the specialisation interval: Home produces both goods, Foreign remains specialised in wine, and $p$ is pinned at $1/2$. Home has become "large" relative to Foreign. By [[#thm-gains]], Foreign still gains (it trades at Home's autarky price, which is better for Foreign than Foreign's autarky price of $2$) and Home's gains shrink to zero on the margin. Doubling Home's size, in this knife-edge calculation, hands the terms-of-trade gain to Foreign.
:::
:::

::: quiz
A country has lower labour productivity than its trading partner in *every* industry. In the Ricardian model it will
- [ ] export nothing, because it has no absolute advantage
- [x] export the goods in which its productivity disadvantage is smallest, at a lower wage
- [ ] need a tariff in order to export at all
- [ ] export only if it has more workers
::: solution
Comparative advantage is about ratios. The less productive country has a lower wage, which more than offsets its disadvantage in the goods where that disadvantage is relatively small, and does not offset it in the goods where the disadvantage is large. No tariff is required for this mechanism; country size affects the terms of trade, not the *existence* of a comparative-advantage export.
:::
:::

## Evidence

The Ricardian model makes a sharp, testable claim: countries tend to export goods in which their relative labour productivity is high. MacDougall (1951, 1952) compared United States and United Kingdom exports to third markets in the 1930s with output per worker in each industry. US labour productivity was higher in almost every industry (absolute advantage), but the *ratio* of US to UK exports was higher in industries where the US productivity *lead* was larger. The correlation is the comparative-advantage prediction. The study is old, the sample is two countries, and labour productivity is endogenous to trade, but the qualitative pattern has survived better data.

Costinot, Donaldson and Komunjer (*American Economic Review*, 2012) take the many-good Ricardian model to a sample of OECD and other economies, using producer-price and trade data to infer relative productivity by industry. They find that relative productivity predicts relative exports in the direction the model says, with an economically large elasticity. Eaton and Kortum (2002) embed Ricardian technology draws in a gravity structure; their model fits bilateral trade and converts into a tool for counterfactuals (what happens to welfare if a tariff rises, if a country's technology improves). Quantitative Ricardian models of this kind are now a workhorse; they are still Ricardian in the sense that trade is driven by technology differences, not by factor endowments or increasing returns.

What the classical 2-by-2 model does *not* fit is the intra-industry trade of [[international-trade/trade-facts]] and the exporter premium of [[international-trade/firms-in-trade]]. It also says nothing about capital, land or skills as separate factors, so it cannot speak to the distributional facts that Autor, Dorn and Hanson (2013) and others document. Those are not failures of Ricardo's logic; they are limits of his assumptions. The right response is to add factors and firms, not to discard comparative advantage.

Country illustrations of the Ricardian force, used cautiously, are easy to find. Bangladesh's garments and Ethiopia's cut flowers are labour-intensive activities in which those countries' opportunity cost is low relative to Germany or Japan, even where German or Japanese labour is more productive in the same physical task. New Zealand's dairy and Chile's copper mix a Ricardian-looking technology (climate, ore grade) with an endowment (land, mineral deposits) that the next two chapters will name as such. Software exports from India and medical-tourism exports from Thailand look Ricardian on the surface — a productivity pattern in a tradable service — and sit equally well in a specific-factors story once one calls the factor "engineers" or "clinics". The model is a lens, not a census.

::: history
**1817, David Ricardo.** Chapter 7 of *On the Principles of Political Economy and Taxation* gives the England–Portugal arithmetic. **1890s–1930s.** Haberler's opportunity-cost restatement and the PPF diagram make the geometry standard. **1951–52, G. D. A. MacDougall** publishes the first systematic productivity–export tests. **1977, Rudiger Dornbusch, Stanley Fischer and Paul Samuelson** introduce the continuum of goods. **2002, Jonathan Eaton and Samuel Kortum** give the Ricardian model a gravity form with extreme-value productivity draws. **2012, Arnaud Costinot, Dave Donaldson and Ivana Komunjer** estimate the many-good model's prediction on modern industry data.
:::

## Where this leads

Comparative advantage is the first, not the last, word. [[international-trade/specific-factors]] keeps Ricardo's technological flavour but makes capital (or land) immobile between sectors, so that opening to trade creates winners and losers among factors. [[international-trade/heckscher-ohlin]] replaces technology differences with endowment differences as the driver of comparative advantage. [[international-trade/new-trade-theory]] generates trade without either, from increasing returns. The gains-from-trade logic of [[#thm-gains]] will reappear, in different clothing, in all of those chapters: trade expands the consumption set; the division of the expansion is a separate question. Tariffs, in [[international-trade/tariffs-and-quotas]], shrink that set for a small country and may not for a large one.

::: summary
- Unit labour requirements define a linear PPF; the slope is the opportunity cost of one good in terms of the other ([[#def-ricardo]]).
- Comparative advantage is a ranking of opportunity costs, not of productivities. A country can be worse at everything and still have a comparative-advantage export ([[#eq-ca]]).
- The free-trade relative price lies between the autarky prices under complete specialisation; each country produces the good in which it has a comparative advantage ([[#prop-specialise]]).
- Both countries gain from trade whenever the world price differs from their autarky price: trade is a technology that transforms exports into imports at a better rate than the domestic PPF ([[#thm-gains]]).
- Absolute advantage sets autarky real wages; relative wages adjust so that the less productive country can sell its comparative-advantage goods.
- Many-good and continuum Ricardian models (Dornbusch–Fischer–Samuelson, Eaton–Kortum) preserve the logic and fit a gravity equation; they still do not explain intra-industry trade or the internal distribution of gains.
:::

## Exercises

::: exercise Opportunity cost {level=1 check="2"}
Home's unit labour requirements are $a_{LC} = 4$ and $a_{LW} = 2$. What is the opportunity cost of one unit of cloth in terms of wine?
::: solution
One unit of cloth takes 4 hours, which could have produced $4/2 = 2$ units of wine. Equivalently $a_{LC}/a_{LW} = 2$.
:::
:::

::: exercise Who exports what {level=1}
Home: $a_{LC} = 1$, $a_{LW} = 1$. Foreign: $a_{LC}^* = 2$, $a_{LW}^* = 4$. Which country has a comparative advantage in cloth? In wine?
::: solution
Home's opportunity cost of cloth is $1/1 = 1$ wine; Foreign's is $2/4 = 1/2$ wine. Foreign has a comparative advantage in cloth ($1/2 < 1$), Home in wine. (Home has an absolute advantage in both goods: $1 < 2$ and $1 < 4$. Absolute advantage does not decide the pattern of trade.)
:::
:::

::: exercise Autarky output {level=1 check="40"}
Home has $L = 80$, $a_{LC} = 2$, $a_{LW} = 1$, and Cobb–Douglas preferences with equal expenditure shares. In autarky, how many units of wine does Home produce?
::: solution
Autarky $p_C/p_W = a_{LC}/a_{LW} = 2$. Set $w = 1$, so $p_C = 2$, $p_W = 1$. Income is $wL = 80$. Equal shares put 40 on wine, hence $Q_W = 40/1 = 40$. (Cloth is $40/2 = 20$. Check: $2\cdot 20 + 1\cdot 40 = 80$, which exhausts the labour force.)
:::
:::

::: exercise The trading price {level=2 check="1"}
Use the technologies of [[#ex-trade-eq]] ($a_{LC}=1$, $a_{LW}=2$, $a_{LC}^*=2$, $a_{LW}^*=1$, $L=L^*=100$) and equal-share Cobb–Douglas demand. Confirm that the free-trade relative price of cloth is $1$. What is $p_C/p_W$?
::: solution
Complete-specialisation relative supply is $100/100 = 1$. Relative demand is $1/p$. Setting $1/p = 1$ gives $p = 1$, which lies in $(1/2, 2)$, so the specialisation pattern is consistent.
:::
:::

::: exercise Consumption gains {level=2}
In [[#ex-trade-eq]], Home's autarky bundle is $(50, 25)$ and its trade bundle is $(50, 50)$. Compute the percentage increase in Home's wine consumption. Does Home's cloth consumption fall? How does this illustrate [[#thm-gains]]?
::: solution
Wine consumption doubles (a 100 per cent increase); cloth consumption is unchanged. The trade bundle $(50, 50)$ lies outside the PPF $Q_C + 2 Q_W = 100$, because $50 + 2\cdot 50 = 150 > 100$. Home could not have produced it. That is the content of the gains-from-trade theorem: the world market expands the consumption set, here along the imported good, without sacrificing the exported good's consumption in this symmetric example.
:::
:::

::: exercise A large Home {level=2}
Suppose, starting from [[#ex-trade-eq]], Home's labour doubles to $L = 200$. Show that the free-trade price equals Home's autarky price, state which country specialises, and say which country captures the gains from trade.
::: hint
Compute the candidate complete-specialisation relative supply and check whether the implied $p$ still lies strictly between the two opportunity costs.
:::
::: solution
If both still specialised, relative supply of cloth would be $200/100 = 2$, so $1/p = 2$ and $p = 1/2$. That $p$ is *not* strictly inside $(1/2, 2)$; it sits on Home's opportunity cost. Equilibrium is therefore the incomplete-specialisation case of [[#prop-specialise]]: Home produces both goods, Foreign produces only wine, and $p = a_{LC}/a_{LW} = 1/2$. Foreign trades at a price far better than its autarky price of $2$ and gains; Home faces autarky prices and, by [[#thm-gains]], does not gain. Size shifted the terms of trade against the country that grew.
:::
:::

::: exercise Comparative advantage with many goods {level=3}
Three goods, $A$, $B$, $C$, have unit labour requirements $(a_A, a_B, a_C) = (1, 2, 3)$ at Home and $(a_A^*, a_B^*, a_C^*) = (2, 2, 2)$ at Foreign. The wage ratio is $w/w^* = 1$. Which goods does Home produce? Which does Foreign produce? What if $w/w^*$ rises to $1.5$?
::: hint
Home produces good $j$ when $w a_j \le w^* a_j^*$, i.e. when $a_j^*/a_j \ge w/w^*$.
:::
::: solution
Relative productivities $a_j^*/a_j$ are $2/1 = 2$ for $A$, $2/2 = 1$ for $B$, $2/3 \approx 0.67$ for $C$. Home produces $j$ iff $a_j^*/a_j \ge w/w^*$. At $w/w^* = 1$, Home produces $A$ (and is indifferent on $B$); Foreign produces $C$ (and is indifferent on $B$). At $w/w^* = 1.5$, Home produces only $A$ ($2 \ge 1.5$, $1 < 1.5$, $0.67 < 1.5$); Foreign produces $B$ and $C$. A higher Home wage prices Home out of the marginal good. This is the discrete version of the Dornbusch–Fischer–Samuelson cutoff [[#eq-dfs]].
:::
:::

::: exercise Proving a real-wage gain {level=3}
Home specialises in cloth at a free-trade relative price $p > a_{LC}/a_{LW}$. Show that Home's real wage in units of wine rises relative to autarky, while the real wage in units of cloth is unchanged. Then argue, without Cobb–Douglas, that a worker who consumed both goods in autarky is strictly better off.
::: hint
Autarky real wages are $1/a_{LC}$ and $1/a_{LW}$. Under trade the cloth wage is still $1/a_{LC}$; convert it into wine at price $p$.
:::
::: solution
Autarky: $w/p_C = 1/a_{LC}$ and $w/p_W = 1/a_{LW}$. Trade, specialising in cloth: $w = p_C/a_{LC}$, so $w/p_C = 1/a_{LC}$ (unchanged) and $w/p_W = (w/p_C)\, p = p/a_{LC}$. The inequality $p > a_{LC}/a_{LW}$ is exactly $p/a_{LC} > 1/a_{LW}$, so the wine wage rises. A worker who bought both goods can still afford the autarky cloth quantity and can buy strictly more wine with the remaining income (or can buy more of both by trimming cloth a little). Local non-satiation gives a strict welfare gain, which is the labour-market restatement of [[#thm-gains]].
:::
:::

::: exercise MacDougall's test {level=2}
MacDougall (1951) found that, although US output per worker exceeded UK output per worker in almost every industry, the ratio of US to UK exports to third markets was higher in industries where the US productivity *lead* was larger. Explain why this pattern is what the Ricardian model predicts and why it is *not* a prediction of absolute advantage alone. Name one reason the test is not a clean causal estimate of technology on trade.
::: solution
Comparative advantage ranks *relative* productivities. US wages exceed UK wages, so the US exports where its productivity advantage more than covers the wage gap — that is, where $a_{\mathrm{UK}}/a_{\mathrm{US}}$ is largest. Absolute advantage alone would (mistakenly) predict US exports in every industry, or would have nothing to say about the *ranking* of export ratios. The test is not causal because labour productivity is endogenous to trade (exporting industries may have already expanded onto better techniques), because third-market exports mix trade costs and demand, and because capital and skills vary by industry, violating the one-factor assumption. Costinot, Donaldson and Komunjer (2012) address some of these problems; they do not make them disappear.
:::
:::

::: exercise Trade as a technology {level=3}
Home's opportunity cost of cloth is $1/2$ wine. The free-trade relative price is $p_C/p_W = 1$. In a sentence, interpret Home's export of cloth as the use of a foreign technology for producing wine. Then compute how many units of wine Home obtains per hour of labour through trade, and compare that with the $1/a_{LW}$ it would obtain by producing wine at home, using $a_{LC} = 1$ and $a_{LW} = 2$.
::: solution
One Home hour produces $1/a_{LC} = 1$ unit of cloth, which trades for $p = 1$ unit of wine. Producing wine at home, one hour yields $1/a_{LW} = 1/2$ unit of wine. Trade doubles Home labour's wine productivity. Equivalently, the world market is a wine factory with unit labour requirement $a_{LC}/p = 1$, better than the domestic $a_{LW} = 2$. That is [[#thm-gains]] as a technological comparison, which is Ricardo's original framing.
:::
:::

