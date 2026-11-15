The Ricardian model of [[international-trade/ricardian-model]] has one kind of labour and a single wage. Opening to trade makes the nation richer and no worker poorer. That is not what import-competing towns report, and it is not what the labour-market studies of the last twenty years have found. Commuting zones in the American South and Midwest that were more exposed to Chinese import competition after 1990 lost manufacturing jobs, saw lower labour-force participation and did not, on average, recover those losses by sending workers to other regions (Autor, Dorn and Hanson, *American Economic Review* 2013). Similar patterns have been documented after Brazil's early-1990s liberalisation, after Mexico's opening under NAFTA, and in parts of Europe and South Africa. The gains from trade and the losses of particular groups are both in the data. A model that is to speak to both needs more than one factor, and it needs some of those factors to be stuck.

The **specific-factors model** — Jones (1971) and Samuelson (1971), building on a nineteenth-century intuition of Viner and Haberler — is the simplest such model. Two goods are produced. Labour can move between them. Capital is usable only in manufactures; land is usable only in food. When the relative price of manufactures rises, labour walks from the farm to the factory, the rental on capital rises in real terms, the rental on land falls in real terms, and the real wage can go either way depending on the basket the worker buys. National income still rises. Compensation of the losers is possible in principle and is often incomplete in practice. That is the chapter's whole message, and it is the bridge from Ricardo's national gains to the political economy of [[international-trade/political-economy-of-trade]].

## The model

Home produces manufactures $M$ and food $F$. The factors are labour $L$ (mobile), capital $K$ (specific to manufactures) and land $T$ (specific to food). Foreign will be in the background: it is a source of a relative price at which Home can trade. For a small open economy that world price is given; for a large one it is endogenous, as in the last chapter. Technology has diminishing returns to the mobile factor.

::: definition Specific-factors economy {#def-sf}
A **specific factor** is a factor of production that cannot move between sectors in the period under study. In the standard two-good model, manufactures are produced with capital and labour, $Q_M = F_M(K, L_M)$, and food with land and labour, $Q_F = F_F(T, L_F)$, where $L_M + L_F = L$. $F_M$ and $F_F$ are increasing, concave, and exhibit diminishing marginal returns to labour given the specific factor. Labour markets are competitive, so the wage equals the value of labour's marginal product in every active sector:

$$
w = p_M \cdot \mathrm{MPL}_M(K, L_M) = p_F \cdot \mathrm{MPL}_F(T, L_F).
$$ {#eq-vmpl}

Capital's rental is $r_K = p_M \cdot \mathrm{MPK}_M$ and land's rental is $r_T = p_F \cdot \mathrm{MPT}_F$. All factors are paid, and Euler's theorem for constant returns gives $p_M Q_M = w L_M + r_K K$ and $p_F Q_F = w L_F + r_T T$.
:::

The PPF is now *bowed out*. Moving a worker from food to manufactures raises $Q_M$ by $\mathrm{MPL}_M$ and cuts $Q_F$ by $\mathrm{MPL}_F$; the opportunity cost of manufactures in terms of food, $\mathrm{MPL}_F/\mathrm{MPL}_M$, *rises* as $L_M$ rises, because $\mathrm{MPL}_M$ falls and $\mathrm{MPL}_F$ rises. That is diminishing returns to the specific factors. In Ricardo the PPF was a straight line; here it is strictly concave, and the economy produces both goods at any finite relative price.

::: widget plot
f: a/sqrt(x); b/sqrt(20-x)
sliders: a=4:1:8; b=4:1:8
x: 0.8, 19.2
y: 0, 6
labels: \text{VMPL}_M; \text{VMPL}_F
caption: Labour in manufactures on the horizontal axis; the remainder $20-x$ is in food. Each curve is a value marginal product of labour, $p \times \mathrm{MPL}$. Raise $a$ (a rise in $p_M$, or more capital) and the intersection — the equilibrium allocation of labour — moves right: factories pull in workers, the wage rises, and land's remaining workers have a higher marginal product. That is the mechanism behind [[#prop-sf-dist]].
:::

The figure is the labour-market picture of [[#eq-vmpl]]. The area under $\mathrm{VMPL}_M$ from $0$ to $L_M$ is $p_M Q_M$ (because $\mathrm{MPL}_M$ integrates to output, given $K$). The wage bill is $w L_M$; the residual is capital's rental income. A rise in $p_M$ shifts $\mathrm{VMPL}_M$ up, pulls in labour, and *increases* capital's residual both because output prices are higher and because each machine now works with more labour.

::: example A Cobb–Douglas allocation {#ex-sf-autarky}
Let $Q_M = K^{1/2} L_M^{1/2}$ and $Q_F = T^{1/2} L_F^{1/2}$, with $K = T = 9$ and $L = 18$. In autarky $p_M = p_F = 1$. Find $L_M$, $L_F$, the wage, and the two rentals.
::: solution
$\mathrm{MPL}_M = \tfrac12 K^{1/2} L_M^{-1/2} = 1.5/\sqrt{L_M}$, and likewise $\mathrm{MPL}_F = 1.5/\sqrt{L_F}$. Equal prices and equal specific factors give a symmetric allocation: $L_M = L_F = 9$. Then $w = 1.5/\sqrt{9} = 0.5$. The marginal product of capital is $\tfrac12 L_M^{1/2} K^{-1/2} = 0.5$, so $r_K = 0.5$; similarly $r_T = 0.5$. Output is $Q_M = 3\cdot 3 = 9$ in each sector. Factor payments: $wL + r_K K + r_T T = 0.5\cdot 18 + 0.5\cdot 9 + 0.5\cdot 9 = 18$, which equals $p_M Q_M + p_F Q_F = 18$.
:::
:::

## Trade and the distribution of income

Suppose Home has a comparative advantage in manufactures, so that opening to trade *raises* $p_M/p_F$. (Why it has that advantage can be left to Ricardo or to Heckscher–Ohlin; the specific-factors model takes the price change as given and asks who is helped.) Labour moves into manufactures. Diminishing returns then govern the three real returns.

::: proposition Specific-factors distributional effects {#prop-sf-dist}
Assume [[#def-sf]] with diminishing $\mathrm{MPL}$ in each sector and a given rise in $p_M/p_F$ (Home is small, or the rest of the world has a lower relative autarky price of manufactures). Then, compared with autarky:

1. Labour moves from food to manufactures: $L_M$ rises, $L_F$ falls.
2. The real rental of capital, $r_K/p_M$ and $r_K/p_F$, both rise. The specific factor in the *export* sector gains in terms of both goods.
3. The real rental of land, $r_T/p_M$ and $r_T/p_F$, both fall. The specific factor in the *import-competing* sector loses in terms of both goods.
4. The real wage is *ambiguous*: $w/p_F$ rises and $w/p_M$ falls. Workers gain as consumers of food and lose as consumers of manufactures. The net effect depends on the consumption basket.

Assumptions: competitive factor markets, full employment of all three factors, no factor-price equalisation with Foreign (the specific factors cannot move abroad).
:::

::: proof
From [[#eq-vmpl]], a rise in $p_M$ at given $L_M$ would raise $w$ in manufactures above $w$ in food, so labour moves until equality is restored. That is (1). For (2): $r_K = p_M \cdot \mathrm{MPK}_M(K, L_M)$. Both $p_M$ and $L_M$ rise, and $\mathrm{MPK}_M$ is increasing in $L_M$ (more labour per machine), so $r_K$ rises by more than $p_M$. Hence $r_K/p_M$ rises; $r_K/p_F$ rises a fortiori. For (3): $r_T = p_F \cdot \mathrm{MPT}_F(T, L_F)$ with $p_F$ given (or rising less) and $L_F$ falling, so $\mathrm{MPT}_F$ falls and $r_T$ falls in terms of both goods. For (4): the wage equals $p_F \cdot \mathrm{MPL}_F$ and $L_F$ has fallen, so $\mathrm{MPL}_F$ has risen and $w/p_F$ rises. Equally $w = p_M \cdot \mathrm{MPL}_M$ with $L_M$ up, so $\mathrm{MPL}_M$ has fallen and $w/p_M$ falls.
:::

The proposition is the specific-factors version of a theme that Stolper and Samuelson (1941) made famous for the mobile-factor Heckscher–Ohlin model in [[international-trade/heckscher-ohlin]]: a relative-price change is a relative-factor-return change, and it is *magnified*. Owners of the factor trapped in the losing sector cannot escape. Workers can escape only by changing industry, and even then their real wage is pulled in two directions.

::: example A rise in the relative price of manufactures {#ex-sf-trade}
Continue [[#ex-sf-autarky]]. Let $p_M$ rise to $2$ with $p_F$ still $1$. Find the new labour allocation, the new wage, and the two rentals. Confirm [[#prop-sf-dist]] by comparing real returns in units of each good.
::: solution
The wage-equalisation condition is $2 \cdot 1.5/\sqrt{L_M} = 1.5/\sqrt{18-L_M}$, or $2/\sqrt{L_M} = 1/\sqrt{18-L_M}$. Squaring, $4(18-L_M) = L_M$, so $72 = 5 L_M$ and $L_M = 14.4$, $L_F = 3.6$.

Then $w = 2 \cdot 1.5/\sqrt{14.4} = 3/\sqrt{14.4} \approx 3/3.795 = 0.790$.

$r_K = p_M \cdot \tfrac12 \sqrt{L_M/K} = 2 \cdot \tfrac12 \sqrt{14.4/9} = \sqrt{1.6} \approx 1.265$.

$r_T = p_F \cdot \tfrac12 \sqrt{L_F/T} = \tfrac12 \sqrt{3.6/9} = \tfrac12 \sqrt{0.4} \approx 0.316$.

Real returns, autarky $\to$ trade:

- $w/p_M$: $0.5 \to 0.395$ (down); $w/p_F$: $0.5 \to 0.790$ (up). Ambiguous.
- $r_K/p_M$: $0.5 \to 0.632$ (up); $r_K/p_F$: $0.5 \to 1.265$ (up). Capital wins.
- $r_T/p_M$: $0.5 \to 0.158$ (down); $r_T/p_F$: $0.5 \to 0.316$ (down). Land loses.
:::
:::

The numbers are worth sitting with. A worker whose consumption is mostly food is better off; a worker whose consumption is mostly manufactures is worse off. A landowner is worse off whichever basket she buys. A factory owner is better off whichever basket he buys. Politics follows the factor, not the nation — a prediction that [[international-trade/political-economy-of-trade]] will take as its starting point.

::: example A worker's basket {#ex-basket}
Take the trade equilibrium of [[#ex-sf-trade]], with $w \approx 0.790$, $p_M = 2$, $p_F = 1$. Worker A spends 80 per cent of income on food and 20 per cent on manufactures; worker B does the reverse. Approximate the percentage change in each worker's real wage relative to autarky ($w=0.5$, $p_M=p_F=1$) by the negative of the expenditure-share-weighted price change plus the wage change. (This is a log-linear Laspeyres approximation.)
::: solution
The wage rises from $0.5$ to $0.790$, a 58 per cent rise. Manufactures' price doubles (a 100 per cent rise); food's price is unchanged.

Worker A: $\widehat{w} - 0.8\,\widehat{p}_F - 0.2\,\widehat{p}_M \approx 0.58 - 0 - 0.2\cdot 1.00 = 0.38$, about a 38 per cent real-wage *gain*.

Worker B: $0.58 - 0.2\cdot 0 - 0.8\cdot 1.00 = -0.22$, about a 22 per cent real-wage *loss*.

Same wage, same prices, opposite signs: the real-wage ambiguity of [[#prop-sf-dist]] is a statement about baskets. A more careful calculation would use a true cost-of-living index; the direction is the content.
:::
:::

::: example National income still rises {#ex-sf-pie}
In [[#ex-sf-autarky]] and [[#ex-sf-trade]], compute the value of national output at the *new* prices $(p_M, p_F) = (2, 1)$, first at the autarky allocation $(L_M, L_F) = (9, 9)$ and then at the trade allocation $(14.4, 3.6)$. Confirm that reallocation raises the value of output at trade prices, which is the production side of [[#thm-sf-gains]].
::: solution
Outputs: $Q_M = \sqrt{K L_M} = 3\sqrt{L_M}$, $Q_F = 3\sqrt{L_F}$.

Autarky allocation at trade prices: $Q_M = Q_F = 9$, value $2\cdot 9 + 1\cdot 9 = 27$.

Trade allocation: $Q_M = 3\sqrt{14.4} \approx 11.384$, $Q_F = 3\sqrt{3.6} \approx 5.692$, value $2\cdot 11.384 + 5.692 \approx 28.46$.

The value of output at trade prices is higher after labour moves. That extra value is the national production gain; how it is split among $w$, $r_K$ and $r_T$ is [[#prop-sf-dist]].
:::
:::

::: warning The real wage is not the national gain
A common confusion is to read a fall in $w/p_M$ as "workers lose from trade" and stop. The model says something more precise: the real wage in terms of the export good falls, the real wage in terms of the import good rises, and national income — the area under the two VMPL curves — rises. Whether *this worker* gains depends on her consumption share of the two goods and on whether she can move. A related confusion is to treat the landowner's loss as a national loss. It is a transfer *plus* a deadweight loss only if labour cannot move; with mobile labour the national pie still grows, as the next theorem records.
:::

## National gains, compensation and the short run

The specific-factors PPF is the set of $(Q_M, Q_F)$ obtainable with full employment of $K$, $T$ and $L$. Opening to trade at a price different from autarky moves production along that PPF toward the export good and lets consumption leave the PPF along the world price line, exactly as in Ricardo. The geometry of the gains from trade does not require a linear PPF.

::: theorem Gains from trade with specific factors {#thm-sf-gains}
Assume [[#def-sf]] and locally non-satiated preferences. If the free-trade relative price differs from autarky, there exists a consumption bundle, affordable out of national income at free-trade prices, that is strictly preferred to the autarky bundle. Equivalently: the losers *can* be compensated so that every factor owner is at least as well off and some are strictly better off. The theorem does not assert that compensation occurs.
:::

::: proof
At the free-trade production point, national income at free-trade prices is $p_M Q_M^{\mathrm{tr}} + p_F Q_F^{\mathrm{tr}}$. This is at least as large as $p_M Q_M^{\mathrm{aut}} + p_F Q_F^{\mathrm{aut}}$, because the autarky point was feasible and competitive firms maximise the value of output at prevailing prices (revealed-profit, or: the PPF is concave and production is at the point of tangency with the price line). The autarky bundle is therefore affordable at trade prices, and because prices have changed it is not the cost-minimising way to achieve autarky utility, so a cheaper bundle yielding that utility exists; the residual income buys extra goods. Local non-satiation gives a strict national gain. Lump-sum transfers that redistribute the extra income can, in principle, share it.
:::

Two limits of the theorem matter for evidence and for policy, and they should not be papered over.

First, compensation is a *possibility*, not a description. Trade Adjustment Assistance in the United States, the European Globalisation Adjustment Fund, and analogous programmes in Canada and Australia exist because the theorem's hypothesis (lump-sum transfers, identified losers) is not met in practice. Targeting is imperfect; many of the people who lose are not in the official import-competing sector (they are downstream, or in the same town in non-tradables); and the political process that would pay the transfers is the same process that chose the trade policy. Dixit and Norman (1980) showed that a more realistic instrument — a combination of commodity taxes and a poll subsidy — can still deliver a Pareto improvement under standard assumptions. That is a possibility theorem too.

Second, the model is a **short-run** model in the precise sense that $K$ and $T$ cannot move. In the long run, factories can be sold, land can be rezoned, and skills can be retrained. The Heckscher–Ohlin model of the next chapter is that long run: both factors mobile, distributional effects that run by *factor intensity* rather than by *sector of employment*. Which time horizon is relevant is an empirical question. Autor, Dorn and Hanson (2021), looking back at the China shock two decades on, find that the most exposed US commuting zones had still not fully adjusted; David, Dorn and Hanson (2013) already emphasised that labour mobility across US regions is slower than a textbook long run. In other settings — for example, the reallocation after Korea's and Chinese Taipei's opening in the 1960s–80s, or Vietnam's after the 2000s — labour moved faster. The model does not pick a horizon; it names the assumption.

::: intuition Why landowners lose even if the nation gains
A rise in $p_M/p_F$ is a fall in the relative price of food. Land is useful *only* for food. The value of what land produces has fallen, and some of the labour that used to work the land has left, so land's marginal product has fallen too. Both blows hit $r_T$. The nation gains because the labour that left is more valuable in manufactures at the new prices — that is the movement along the PPF toward the good that the world pays more for. Land does not share in that gain; it is not in manufactures. National gains and a specific-factor loss are the same event, seen from two accounts.
:::

::: quiz
In the specific-factors model, a rise in the relative price of manufactures (the capital-specific sector) causes
- [ ] the real wage to rise in terms of both goods
- [ ] the real rental of land to rise, because labour leaving food raises land's marginal product
- [x] the real rental of capital to rise in terms of both goods, and the real wage to rise in terms of food but fall in terms of manufactures
- [ ] national income to fall, because landowners are worse off
::: solution
[[#prop-sf-dist]]: capital, the specific factor in the expanding sector, gains in both goods; land loses in both; labour is pulled both ways; national income rises ([[#thm-sf-gains]]). Labour *leaving* food *lowers* land's marginal product, which is one reason landowners lose — the opposite of the second option.
:::
:::

## Evidence on winners and losers

The specific-factors model predicts that people attached to import-competing activities lose when trade opening lowers those activities' relative price, and that the loss is geographically concentrated if the specific factors (including industry-specific skills and housing) are local. A body of labour-market research has taken that prediction to the data.

**The China shock.** Autor, Dorn and Hanson (2013) measure US commuting zones' exposure to Chinese import growth, 1990–2007, by the pre-existing industrial mix of each zone, using other high-income countries' imports from China as an instrument for the supply shock. They find that a zone at the 75th percentile of exposure, relative to one at the 25th, lost manufacturing employment, saw lower earnings, and had higher unemployment and disability take-up. Transfers offset only a fraction of the earnings loss. Subsequent work (Acemoglu, Autor, Dorn, Hanson and Price 2016) finds employment losses outside manufacturing in the same zones, consistent with local demand spillovers. The national consumer gain from cheaper goods is not in dispute in this literature; what is in dispute is the *size* of the local labour-market loss and how long it lasts. Autor, Dorn and Hanson (2021) report substantial persistence. Other studies, using different designs, find more reallocation and smaller net employment effects (for a survey of the range, see Feenstra and Sasahara 2018 on job *gains* in US exporting, and the discussion in Caliendo, Dvorkin and Parro 2019, whose quantitative spatial model finds aggregate welfare gains alongside concentrated losses).

**Other countries.** Dix-Carneiro and Kovak (2017) study Brazil's early-1990s tariff cuts and find that regions specialised in industries that lost protection had declining formal employment and wages relative to other regions, with effects that *grew* over time rather than fading — a finding even less friendly to a short-run-only interpretation. Topalova (2010) finds that rural Indian districts more exposed to the 1991 liberalisation had slower poverty reduction. For Mexico, Hanson (2003) and later work on NAFTA document regional divergence tied to export-oriented assembly in the north. In Germany, Dauth, Findeisen and Suedekum (2014) find that exposure to Chinese and Eastern European imports hurt, but exposure to *export* opportunities toward those same markets helped, with a net positive in many local markets — a reminder that the specific-factors model has an export-sector specific factor too.

**Consumers.** The other side of [[#prop-sf-dist]] is the real-wage gain in terms of the import good. Fajgelbaum and Khandelwal (2016) estimate that the gains from trade as a share of income are larger for poorer consumers, because poorer consumers spend a larger share on traded goods. That is a distributional effect *among consumers*, running the opposite way from the factor-owner effect in import-competing industries. Both can be true at once: a low-income worker in a clothing mill can lose as a producer and gain as a consumer, with a net that depends on the numbers.

These studies do not "prove" the specific-factors model. They document that adjustment is slow, that losses are concentrated, and that national gains coexist with local losses — which is what the model, taken as a medium-run description, says. They also document that export-side gains are real, that consumers gain, and that the magnitude of local losses is estimated with a range. Presenting only the losses or only the national gains is a choice; the chapter's job is to keep both in view.

::: application Copper, fruit and a mobile labour force: Chile
Chile's export boom since the 1970s–90s has been a mix of copper (a specific factor if ever there was one: the ore in the ground, plus the mines and smelters) and later fruit, wine and salmon (land, climate, coastal waters). Labour moved toward those activities and toward Santiago's non-tradable services. The specific-factors lens says copper-capital and fruit-land gained when world prices were high; import-competing manufactures lost; labour's real wage depended on the CPI basket (food and imported manufactures). The lens does not say that copper is Chile's only comparative advantage, nor that the boom was caused by trade policy alone — copper is also a Heckscher–Ohlin endowment and a Ricardian geology. It does say that a fall in the world copper price, as in 2014–16, hits a specific factor hard and hits the regions where that factor lives.
:::

::: history
**1930s–1950s.** Haberler, Viner and others discuss "specific" factors as a short-run qualification to Heckscher–Ohlin. **1971, Ronald Jones**, "A three-factor model in theory, trade, and history", and **1971, Paul Samuelson**, "Ohlin was right", write down the modern specific-factors (Ricardo–Viner) model and derive the distributional results of [[#prop-sf-dist]]. **2013, David Autor, David Dorn and Gordon Hanson** give the China-shock paper that became the empirical reference for concentrated local losses alongside national consumer gains. The political-economy literature of the 1980s–90s, taken up in [[international-trade/political-economy-of-trade]], had already treated specific-factor owners as the natural lobbyists for protection.
:::

## Where this leads

If time is long enough for capital and land to be reshaped into each other — more precisely, for both factors to move between sectors — the specific-factors model becomes the Heckscher–Ohlin model of [[international-trade/heckscher-ohlin]], and the distributional effects attach to *factor type* (skilled versus unskilled labour, capital versus labour) rather than to *industry of employment*. The Stolper–Samuelson theorem is that long-run cousin of [[#prop-sf-dist]]. If firms differ and only some export, the losers can be import-competing *firms* and their workers, even inside an industry; that is [[international-trade/firms-in-trade]]. The politics of who demands a tariff, given these stakes, is [[international-trade/political-economy-of-trade]]. None of those later chapters retracts [[#thm-sf-gains]]. They change who the losers are and how long they stay losers.

::: summary
- A specific factor cannot move between sectors in the period of analysis. In the standard model, capital is trapped in manufactures and land in food; labour is mobile ([[#def-sf]]).
- A rise in the relative price of manufactures pulls labour into that sector, raises the real return to capital in terms of both goods, and lowers the real return to land in terms of both goods. The real wage rises in terms of food and falls in terms of manufactures ([[#prop-sf-dist]]).
- National income rises; the autarky bundle remains affordable. Compensation of losers is possible and is not guaranteed ([[#thm-sf-gains]]).
- The model is a short-to-medium-run description. How long factors stay specific is an empirical question; several labour-market studies find adjustment measured in decades, not years.
- Evidence from the China shock, Brazil, India, Mexico and Germany is consistent with concentrated local losses, consumer gains, and export-side gains. The sizes are estimated with a range; both tails of the distribution are part of the record.
:::

## Exercises

::: exercise Reading VMPL {level=1}
In the labour-market diagram, $\mathrm{VMPL}_M$ is drawn against $L_M$ and $\mathrm{VMPL}_F$ against $L_F = L - L_M$. What quantity is measured by the intersection, and what area measures capital's rental income?
::: solution
The intersection is the equilibrium wage and the allocation $(L_M, L_F)$. Capital's rental income is the area under $\mathrm{VMPL}_M$ and above the wage, from $0$ to $L_M$: output value $p_M Q_M$ minus the wage bill $w L_M$. (Land's rental is the analogous area under $\mathrm{VMPL}_F$.)
:::
:::

::: exercise Direction of labour flow {level=1}
Home opens to trade and the relative price of food rises. Which sector pulls in labour? Which specific factor gains in real terms?
::: solution
Food pulls in labour. Land, specific to food, gains in terms of both goods ([[#prop-sf-dist]] applied to a rise in $p_F/p_M$). Capital, specific to manufactures, loses in terms of both goods. The real wage rises in terms of manufactures and falls in terms of food.
:::
:::

::: exercise A wage calculation {level=1 check="0.5"}
In [[#ex-sf-autarky]], with $p_M = p_F = 1$, $K = T = 9$, $L = 18$ and square-root technologies, what is the autarky wage?
::: solution
$L_M = 9$, $\mathrm{MPL}_M = 1.5/\sqrt{9} = 0.5$, so $w = 0.5$.
:::
:::

::: exercise Labour after a price rise {level=2 check="14.4"}
In [[#ex-sf-trade]], $p_M$ rises to $2$ with $p_F = 1$. How many units of labour work in manufactures in the new equilibrium?
::: solution
$2 \cdot 1.5/\sqrt{L_M} = 1.5/\sqrt{18-L_M}$ simplifies to $4(18-L_M) = L_M$, hence $L_M = 72/5 = 14.4$.
:::
:::

::: exercise Real wage in manufactures {level=2 check="0.395"}
Using $w \approx 0.790$ from [[#ex-sf-trade]] and $p_M = 2$, compute $w/p_M$ to three decimal places. Does this real wage rise or fall relative to autarky?
::: solution
$0.790/2 = 0.395$, which is below the autarky real wage of $0.5$. The real wage in terms of the export good falls, as [[#prop-sf-dist]] requires.
:::
:::

::: exercise Why land loses twice {level=2}
Give the two distinct reasons, in the proof of [[#prop-sf-dist]], that $r_T$ falls in terms of both goods when $p_M/p_F$ rises. Which of the two would still operate if labour could *not* move?
::: solution
Land's rental is $r_T = p_F \cdot \mathrm{MPT}_F(T, L_F)$. First, $p_F$ falls relative to $p_M$, so even at a given $\mathrm{MPT}_F$ the rental buys fewer manufactures. Second, $L_F$ falls as labour leaves, and diminishing returns mean $\mathrm{MPT}_F$ itself falls, so $r_T$ falls in terms of food as well. If labour could not move, the second blow would be absent: $r_T/p_F$ would be unchanged and $r_T/p_M$ would still fall. Mobility of labour *worsens* the specific factor's loss in the shrinking sector — the opposite of a cushion.
:::
:::

::: exercise Compensation {level=3}
State [[#thm-sf-gains]] in one sentence. Then give two reasons, drawn from the discussion in the chapter, that a real-world government might fail to implement the compensation the theorem contemplates. Does that failure invalidate the national-gains result?
::: hint
The theorem is a possibility result about the consumption set and lump-sum (or Dixit–Norman) instruments.
:::
::: solution
If trade prices differ from autarky, national income at trade prices can buy a bundle strictly preferred to autarky, so losers can in principle be compensated. Reasons compensation fails: losers are hard to identify (industry, region, downstream non-tradables); the political process that would pay is the one that chose the policy; lump-sum instruments are not available and even Dixit–Norman commodity-tax packages are not how Trade Adjustment Assistance is built. The failure does not invalidate the national-gains result; it says the gain is there as a *potential* Pareto improvement and is not automatically a *actual* Pareto improvement. Confusing the two is a category error the chapter warns against.
:::
:::

::: exercise China shock and the model {level=3}
Autor, Dorn and Hanson (2013) find that US commuting zones more exposed to Chinese import growth had larger declines in manufacturing employment and earnings. Map this finding onto [[#prop-sf-dist]]: what is the "specific factor", what is the price change, and what does the model *not* say about consumers in those zones? Why is a local employment decline compatible with a national welfare gain?
::: solution
The price change is a fall in the relative price of import-competing manufactures. The specific factors are industry-specific capital, skills and, at the commuting-zone level, housing and local amenities that make labour imperfectly mobile across space — land in the model's language. The model predicts those factors lose and that labour attached to them loses in terms of manufactures. It also predicts that the same people gain as consumers of cheaper goods, an effect the 2013 paper does not claim to offset locally against the earnings loss; Fajgelbaum and Khandelwal (2016) estimate consumer gains that are larger for the poor. A national gain is the sum of consumer surplus, export-sector specific-factor gains, and import-competing losses; a negative local labour-market effect is one term. Caliendo, Dvorkin and Parro (2019) and Feenstra and Sasahara (2018) are examples of work that keeps the other terms in the sum. Compatibility is not a claim that the local losses are small.
:::
:::

::: exercise Bowed-out PPF {level=2}
Explain why the specific-factors PPF is strictly concave (bowed out) while the Ricardian PPF is a straight line. In a sentence, connect the concavity to diminishing $\mathrm{MPL}$.
::: solution
In Ricardo, labour is the only factor and unit labour requirements are constant, so opportunity cost is constant and the PPF is linear. Here, moving a worker from food to manufactures raises $Q_M$ by $\mathrm{MPL}_M$ and cuts $Q_F$ by $\mathrm{MPL}_F$; as $L_M$ rises, $\mathrm{MPL}_M$ falls and $\mathrm{MPL}_F$ rises, so the opportunity cost $\mathrm{MPL}_F/\mathrm{MPL}_M$ of manufactures rises. That increasing opportunity cost *is* concavity of the PPF.
:::
:::

::: exercise Export-sector workers {level=3}
A copper-mining region in Zambia, a cut-flower region in Kenya, and an auto-parts region in northern Mexico all expand when the relative price of their export rises. Using [[#prop-sf-dist]], what happens to (a) owners of the mine, the flower land, and the parts factory, (b) workers who can move into those activities, (c) landowners or factory owners in the *import-competing* activity of the same country? Why might the real-wage effect still be ambiguous for the mobile workers?
::: solution
(a) The specific factors in the export activities gain in terms of both goods. (b) Mobile labour is pulled in; $w$ rises in terms of the import good and falls in terms of the export good. (c) Specific factors in import-competing activities lose in terms of both goods. The real-wage ambiguity is the same as in the theorem: workers buy some of the export good (food, or housing whose price tracks the boom) and some of the import good. A flower worker in Kenya who spends heavily on imported fuel and medicines is more likely to gain as a consumer than one whose basket is locally produced food that has become dearer because labour left the farms. The model names the two effects; it does not add them without a basket.
:::
:::
