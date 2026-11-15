For most of the last two millennia, a typical person was a farmer, a herder or a craft worker whose real income, measured in grain, cloth and shelter, would have been recognisable to a grandparent and a grandchild. A labourer in the Yangzi delta around 1700, a weaver in Gujarat, a cottager in the English Midlands and a maize farmer in the Valley of Mexico all lived near a biological floor: enough calories, in a normal year, to work and to raise some children who survived. Then, in a handful of economies, that floor gave way. This chapter is about the floor, and about the mechanism that kept humanity on it.

The mechanism is **Malthusian**. Land is (almost) fixed, people reproduce, and diminishing returns to labour on that land pull living standards back whenever they rise. A new plough, a new crop or a new trade route can lift incomes for a generation; more births and fewer deaths then raise population until the extra mouths have eaten the extra grain. The model is simple enough to write down, rich enough to organise the evidence, and incomplete enough that we will spend the rest of the course asking how the world escaped it.

The numbers are reconstructed, not observed. There were no national accounts in 1300. What we have are harvest yields, wage quotes in silver, prices of a consumption basket, tax registers and, from the nineteenth century, censuses. The Maddison Project Database 2023, building on Angus Maddison’s tables and on the work of Broadberry, van Zanden and many others, reports GDP per capita in 2011 international dollars. Those units are a purchasing-power comparison: they ask how much a bundle of goods in the past would cost at 2011 international prices. They are the best long-run scale we have, and they are still estimates with wide uncertainty before 1820.

## Diminishing returns on a fixed land endowment

Imagine an agrarian economy that produces a single good, “grain”, with two inputs: land $T$, which does not grow, and labour $L$, which is the working population. Technology $A$ is, for the moment, a constant. A convenient production function is Cobb–Douglas with diminishing returns to labour:

$$
Y = A T^{\alpha} L^{1-\alpha},\qquad 0 < \alpha < 1.
$$ {#eq-production}

Output per worker is $y = Y/L = A (T/L)^{\alpha}$. Adding people, with land and $A$ fixed, lowers $y$. If labour is paid its marginal product — the competitive assumption, which is a useful benchmark rather than a description of every manor and village — the real wage is

$$
w = (1-\alpha) A \left(\frac{T}{L}\right)^{\alpha} = (1-\alpha)\, y.
$$ {#eq-wage}

[[#eq-wage]] is the **wage–population schedule**: denser settlement means a lower real wage. The elasticity of the wage with respect to population is $-\alpha$. For $\alpha = 1/2$, doubling the number of workers cuts the wage by a factor $\sqrt{2} \approx 1.41$.

::: definition Malthusian economy {#def-malthusian}
A **Malthusian economy** is one in which (i) a resource in more or less fixed supply (land, or land plus a slowly changing stock of tools) is essential to production, (ii) the real wage (or, more generally, income per person) is decreasing in population, and (iii) the growth rate of population is increasing in the real wage. In the long run, income per person is pinned down by the fertility and mortality schedules, not by the level of technology.
:::

Condition (iii) is the demographic half of the model. When wages are high, more children survive and more couples marry earlier; when wages are low, mortality rises and nuptiality falls. Write the net rate of population growth as a function $n(w)$, with $n'(w) > 0$ and a unique **subsistence wage** $\bar w$ at which $n(\bar w) = 0$. “Subsistence” here is not a physiological minimum of 1,500 kilocalories. It is the living standard at which births and deaths balance, given the society’s marriage customs, disease environment and urban death penalty. A society that marries late and spaces births, as north-western Europe did under the “European marriage pattern” described by Hajnal (1965), can have a higher $\bar w$ than a society that marries early.

::: definition Preventive and positive checks {#def-checks}
Malthus (1798) distinguished a **preventive check**, the reduction of fertility when living standards are under pressure (later marriage, fewer births within marriage), from a **positive check**, the rise in mortality when living standards fall (famine, epidemic, war). Both make $n(w)$ upward-sloping. Which check dominates is an empirical question, and it varies by time and place.
:::

The two schedules — the wage–population curve sloping down, the demographic balance at $\bar w$ — close the model.

::: proposition Unique Malthusian steady state {#prop-steady}
Assume [[#eq-wage]] and a strictly increasing $n(w)$ with $n(\bar w) = 0$. Then there is a unique steady-state population

$$
L^{*} = T \left(\frac{(1-\alpha)A}{\bar w}\right)^{1/\alpha}
$$ {#eq-Lstar}

at which $w = \bar w$ and $\dot L = 0$. A once-and-for-all rise in $A$ or $T$ raises $L^{*}$ and leaves the long-run wage unchanged at $\bar w$. A rise in $\bar w$ (later marriage, a healthier disease environment at a given income) lowers $L^{*}$ and raises the long-run wage.
:::
::: proof
Set [[#eq-wage]] equal to $\bar w$ and solve for $L$. Uniqueness follows because $w(L)$ is strictly decreasing and $n$ has a single zero. If $A$ rises, $w$ jumps up at the old $L$; then $n(w) > 0$ until population has grown enough to restore $w = \bar w$. The new $L^{*}$ is proportional to $A^{1/\alpha}$. A rise in $\bar w$ requires a lower land–labour ratio to keep [[#eq-wage]] equal to the new subsistence level, so $L^{*}$ falls.
:::

The comparative statics are the heart of the chapter. Better technology, in a Malthusian world, produces more people, not richer people. A larger land mass (the opening of the Ukrainian steppe, the settlement of the Pampas) does the same. Only a change in the fertility or mortality schedule — a change in $\bar w$ — can raise living standards permanently while the model still holds.

::: widget plot
f: 5*A/sqrt(x); s
x: 10, 400
y: 0, 12
sliders: A=4:1:8:0.5; s=2:1:4:0.1
labels: \text{real wage } w(L); \text{subsistence } \bar w
caption: Illustrative Malthusian wage–population schedule $w = 5A/\sqrt{L}$ (Cobb–Douglas with $\alpha = 1/2$ and $T = 100$; parameters are illustrative, not estimated). The horizontal line is subsistence $\bar w$. Raise $A$: the wage curve shifts up and the crossing — the steady-state population — moves right, with no long-run rise in the wage. Raise $s$: fewer people, higher long-run wage. The elasticity of $L^{*}$ with respect to $A$ is $1/\alpha = 2$.
:::

::: example A plague and a harvest {#ex-plague}
Take the illustrative technology $Y = 4\, T^{1/2} L^{1/2}$ with $T = 100$, so $w = 2\sqrt{100/L} = 20/\sqrt{L}$. Subsistence is $\bar w = 2$, hence $L^{*} = 100$ and $Y^{*} = 400$. (a) A plague cuts $L$ to $25$. Compute the new wage, output and output per worker. (b) Population then grows according to $n = 0.02(w - 2)$ per year. What is the growth rate of population just after the plague? (c) Technology is unchanged. What are $w$ and $L$ in the new steady state?
::: solution
(a) $w = 20/\sqrt{25} = 4$. Output $Y = 4 \times 10 \times 5 = 200$. Output per worker is $Y/L = 8$, double the old $4$. Survivors are, in the model, better off: more land per worker. (b) $n = 0.02(4-2) = 0.04$, or 4 per cent a year — a very rapid recovery by pre-industrial standards, and a reminder that the $0.02$ is an illustrative slope, not an estimate. (c) Nothing in $A$, $T$ or $\bar w$ has changed, so the economy returns to $L^{*} = 100$, $w = 2$. The plague is a level shock to population, not a permanent rise in living standards.
:::
:::

The Black Death of 1347–52 is the historical counterpart. In England, population fell from perhaps 4.5–6 million before the plague to around 2.5 million by the 1370s (Broadberry et al. 2015, drawing on the poll tax of 1377 and manorial records). Real wages of building labourers, assembled by Clark (2005, 2007) from manorial and building accounts, roughly doubled between the 1340s and the end of the fourteenth century. GDP per capita in England, in the Maddison Project Database 2023 (2011 international dollars), rises from about 1,230 in 1348 to about 1,720 in 1400. The same logic, with the opposite sign, describes the population recoveries of the sixteenth century: more people, lower real wages, and a slide in GDP per capita that is visible in the English, Italian and Chinese series.

::: quiz
In the Malthusian model of [[#prop-steady]], a permanent doubling of agricultural productivity $A$ will, in the long run,
- [ ] double the real wage and leave population unchanged
- [x] leave the real wage unchanged and raise population by a factor $2^{1/\alpha}$
- [ ] raise both the real wage and population in the same proportion
- [ ] lower population, because each worker now needs less land
::: solution
[[#eq-Lstar]] shows $L^{*} \propto A^{1/\alpha}$. The long-run wage is $\bar w$, set by demography, not by $A$. For $\alpha = 1/2$ population quadruples. The short-run wage does rise, which is what causes population to grow.
:::
:::

## Technology, population and the missing rise in living standards

If technology had been frozen, the Malthusian world would have been a gloomy circle of plague, recovery and pressure on the land. It was not frozen. New crops moved: American maize and sweet potato into China in the sixteenth and seventeenth centuries, the potato into northern Europe in the eighteenth. Irrigation spread in the Yangzi and Yellow River basins, in the Tamil country and in the rice paddies of Japan. Heavy ploughs, horse collars and three-field rotations had already raised yields in medieval Europe. The question the model poses is not “was there technical change?” but “did technical change show up in living standards, or in the number of people?”

::: proposition Technology raises population, not long-run wages {#prop-tech}
Under the assumptions of [[#prop-steady]], a once-and-for-all rise in $A$ of $g$ per cent raises steady-state population by $(g/\alpha)$ per cent and raises the long-run real wage by zero. During the transition the real wage is above $\bar w$, so a historian who observes a wage boom after a new crop or a new plough is not contradicting the model — provided the boom later fades as population catches up.
:::
::: proof
Log-differentiate [[#eq-Lstar]] at given $\bar w$ and $T$: $\mathrm{d}\ln L^{*} = (1/\alpha)\,\mathrm{d}\ln A$. The wage in the steady state is $\bar w$ by construction. The transition is the path of $L(t)$ solving $\dot L/L = n\bigl(w(L)\bigr)$ from the old $L^{*}$ toward the new one; $w$ starts higher and falls back.
:::

::: example Maize in a stylised county {#ex-maize}
An illustrative county has $T = 100$, $\alpha = 1/2$, $A = 4$, $\bar w = 2$, so $L^{*} = 100$ as in [[#ex-plague]]. A new crop raises $A$ to $8$. (a) What is the new steady-state population? (b) Immediately after the crop spreads, before population has moved, what is the real wage? (c) If $n = 0.02(w-2)$, how many years of 2 per cent population growth would close half the gap to the new $L^{*}$, treating $n$ as constant at its initial post-shock value? (This last step is a rough bound, not the exact solution of the differential equation.)
::: solution
(a) $L^{*} = 100 \times (8/4)^{1/0.5} = 100 \times 4 = 400$. (b) At $L = 100$, $w = 0.5 \times 8 \times \sqrt{100/100} = 4$. Living standards double on impact. (c) The gap is $300$ people. Half the gap is $150$, so population must reach $250$. From $100$ at a constant 2 per cent a year, $100\, e^{0.02 t} = 250$ gives $t = \ln 2.5 / 0.02 \approx 45.8$ years. In the true model $n$ falls as $w$ falls, so the half-life is longer. A generation or two of high wages after a new crop is exactly what the Malthusian model predicts — and exactly what a casual observer might mistake for the start of modern growth.
:::
:::

The Chinese case is the largest. American food crops, together with the settlement of previously under-used hill land, supported a rise in population from perhaps 150 million around 1700 to more than 400 million by 1850 (official Qing counts are imperfect, but the direction is not in doubt; see Ho Ping-ti 1959 and subsequent reconstructions used by Broadberry, Guan and Li 2018). GDP per capita in China, in the Maddison Project Database 2023, is about 1,540 international dollars (2011 prices) in 1700 and about 930 in 1800 — a fall, not a rise, as population ran ahead of the new resources. That is Malthusian arithmetic at continental scale.

Japan offers a different mix of the same ingredients. In the Tokugawa period the country was closed to most foreign trade, urbanised around Osaka and Edo, and held population almost flat from the early eighteenth century to the mid-nineteenth (about 30 million). Hanley and Yamamura (1977) and later work by Bassino, Broadberry, Fukao, Gupta and Takashima (2019) find that GDP per capita drifted up slowly — of the order of 0.1 to 0.2 per cent a year — rather than sitting on a pure Malthusian nail. The Japanese case is one of several that keep us from treating [[#prop-steady]] as a photograph of every pre-industrial society. It is a central tendency, not a law of nature.

::: intuition Why the long-run wage is demographic
Think of $\bar w$ as a thermostat. Technology and land set how many people can be supported at that wage. Fertility and mortality set the wage itself. A historian who wants to explain why Dutch labourers in 1650 were better fed than Sicilian labourers has two Malthusian candidates: a higher $\bar w$ (the European marriage pattern, fewer urban epidemics at a given income) or a transition that has not yet finished (the Dutch economy still absorbing the gains of its commercial boom). A third candidate, which the strict model shuts down, is that the Dutch had permanently better technology *and* that population had not fully responded. Distinguishing these is what the wage and population series are for.
:::

## What the reconstructions actually show

The clean model predicts a flat long-run path for GDP per capita, with shocks and transitions around it. The reconstructions are more interesting than that, and they differ by region.

**England and Britain.** Broadberry, Campbell, Klein, Overton and van Leeuwen (2015) reconstruct annual GDP for England from 1270 to 1700 and for Great Britain from 1700 to 1870. English GDP per capita grew at about 0.20 per cent a year between 1270 and 1700 — doubling, roughly, over four centuries — with the fastest rises in the century after the Black Death and in the second half of the seventeenth century. From 1700 to 1870 British GDP per capita grew at about 0.48 per cent a year. Broadberry (CAGE working paper 658, 2023) reports 0.13 per cent a year for a still longer English span, 1086–1700. These are not modern growth rates: at 0.20 per cent a year, income doubles in about 350 years; at 2 per cent, the late-twentieth-century rich-country rate, it doubles in 35. But they are not zero, and they mean that late-medieval England was already well above a physiological floor. The Maddison Project Database 2023 puts English GDP per capita at about 1,150 international dollars (2011 prices) in 1000, 2,410 in 1700 and 3,340 in 1800.

**The Dutch Republic.** Holland, then the Netherlands, was the richest large economy in the world in the seventeenth century. The Maddison Project Database 2023 reports Dutch GDP per capita around 4,270 international dollars in 1600 and 3,380 in 1700 (the 1600 figure is for Holland; the later one is closer to the national territory). Real wages in Amsterdam, in Allen’s (2001) city sample, stayed high while wages in Florence, Vienna and Gdańsk fell. This is the **little divergence** inside Europe: the North Sea economies pulled away from the Mediterranean and central Europe between 1500 and 1750, *before* the classic industrial decades. De Vries and van der Woude (1997) called the Dutch case “the first modern economy”; whether one accepts the label, the numbers say that a commercial, urban, high-wage economy existed in the North Sea region well before steam.

**China.** Broadberry, Guan and Li (2018) and the Maddison Project Database 2023 put Chinese GDP per capita a little above England’s around the year 1000 (about 1,230 versus 1,150 in 2011 international dollars) and still comparable in 1400. By 1700 the English figure is about 2,410 and the Chinese about 1,540; by 1800 the gap is 3,340 versus 930. The Song peak, the Ming–Qing comparison and the eighteenth-century decline relative to Britain are all contested in levels, but the *direction* after 1700 is not: China did not industrialise, population grew, and GDP per capita did not.

**India.** Broadberry, Custodis and Gupta (2015) reconstruct Indian GDP from the Mughal period to the late colonial. They find Indian GDP per capita of the order of 60 per cent of the British level around 1600, falling to about 15 per cent by 1871. Real wages of unskilled labourers in northern India, in Allen’s comparisons and in de Zwart and Lucassen (2020), sit near a bare-bones basket — a welfare ratio around 1 — through the eighteenth century, while London labourers are nearer 1.5 to 2. The Mughal empire was a large, commercial, urban civilisation; it was not, on these numbers, a high-wage economy in Allen’s sense.

**Japan.** Bassino et al. (2019) and the Maddison Project Database 2023 put Japanese GDP per capita around 1,070 international dollars in 1700 and 1,320 in 1820 — below the Netherlands and Britain, above the Chinese figure for 1800, and drifting up rather than down.

**Africa and the Americas.** Evidence is thinner and more regional. Fourie and van Zanden (2013) find that the Dutch Cape Colony in the eighteenth century had GDP per capita comparable to the poorer parts of Western Europe — a small settler economy, not a continent. Frankema and van Waijenburg (2012) construct urban real-wage series for British Africa in the colonial period; they cannot be pushed back to 1700 with the same confidence. In the Americas, the Maddison Project Database 2023 gives the United States about 2,540 international dollars in 1800, already above most of Europe other than Britain and the Netherlands, while Spanish American levels are lower and more uneven (Coatsworth 2008; Arroyo Abad, Davies and van Zanden 2012). The Atlantic slave trades, which we take up in [[economic-history/empire-and-colonialism]], removed millions of people from West and West-Central Africa; that is a demographic shock with the opposite sign to a plague in Europe, and it is not a small one.

::: example English doubling, slowly {#ex-double}
Broadberry et al. (2015) put English GDP-per-capita growth at about 0.20 per cent a year from 1270 to 1700. (a) By what factor does income rise in 430 years at that rate? (b) How many years to double, using $\ln 2 / g$? (c) Why is a doubling still compatible with a Malthusian *model*, even if it stretches a strict steady state?
::: solution
(a) $1.002^{430} \approx 2.36$. (b) $\ln 2 / 0.002 \approx 347$ years. (c) Because $\bar w$ can drift up (the European marriage pattern), because $A$ can rise slowly with population not fully catching up, and because GDP per capita includes a shift out of agriculture. A strict, stationary $L^{*}$ would not double $y$; a Malthusian *mechanism* with slow-moving $A$ and $\bar w$ can. The chapter’s claim is the mechanism, not a literally flat series.
:::
:::

::: example Reading a welfare ratio {#ex-welfare}
Allen’s **welfare ratio** is the number of bare-bones consumption baskets a labourer’s annual wage will buy. A basket is a least-cost diet of around 1,940 kilocalories a day plus a little cloth, fuel and rent, priced in the local market and converted to silver. Suppose a London labourer in the 1750s earns a wage that buys 1.8 baskets, and a Beijing labourer earns a wage that buys 0.9 baskets. (These are rounded values in the neighbourhood of Allen, Bassino, Ma, Moll-Murata and van Zanden 2011, “Wages, prices, and living standards in China, 1738–1925”.) (a) By what factor is the London labourer’s real wage higher? (b) If the elasticity of $w$ with respect to $L$ is $-\alpha = -1/2$, what percentage difference in population density would, *on its own*, account for the gap, holding $A$ and $T$ per worker’s land quality equal? (c) Why is (b) not an explanation of the London–Beijing gap?
::: solution
(a) $1.8/0.9 = 2$. (b) $w \propto L^{-\alpha}$, so $\ln(w_L/w_B) = -\alpha \ln(L_L/L_B)$. Then $\ln 2 = 0.5 \times \ln(L_B/L_L)$, so $L_B/L_L = 4$. Beijing would need to be four times as densely populated as London, in units of labour per effective land, to explain a twofold wage gap from diminishing returns alone. (c) Because $A$ and land quality were not equal, because the baskets are a lower bound on consumption, because urban labourers are not the whole economy, and because the little divergence had already produced a high-wage North Sea region for reasons the static schedule does not name. The calculation is a benchmark, not a decomposition.
:::
:::

::: warning Levels are more fragile than changes
A GDP-per-capita figure for 1700 is a chain of quantity indices, silver-wage conversions and a purchasing-power benchmark. Different authors, different baskets and different years for the international comparison move the *level* by tens of per cent. The Maddison Project’s 1990 Geary–Khamis dollars and its 2011 international dollars do not tell the same level story even when they tell a similar change story. When a debate turns on whether the Yangzi delta was “as rich as England” in 1750, it is turning on levels. Prefer statements about *changes and rankings* that survive a 20–30 per cent re-basing, and treat any single 1700 level as an estimate with a wide band.
:::

::: quiz
Broadberry et al. (2015) find English GDP per capita growth of about 0.20 per cent a year from 1270 to 1700. At that rate, roughly how long does income per person take to double?
- [ ] 35 years
- [ ] 70 years
- [x] 350 years
- [ ] 1,000 years
::: solution
The doubling time is $\ln 2 / 0.002 \approx 347$ years. Modern rich-country growth of 2 per cent a year doubles in about 35 years; a 0.70 per cent “rule of 70” shortcut also gives $70/0.20 = 350$. The pre-industrial English rise is real and it is slow.
:::
:::

## Escape, or only a slow leak?

If the Malthusian model were the whole story, the Industrial Revolution would be a mystery: why should $A$ suddenly start rising fast enough that population could not catch up? Unified growth theory, associated with Galor and Weil (2000) and Galor (2011), treats the escape as an endogenous transition. In a Malthusian regime, technical change slowly raises population and, with it, the size of the market and the return to human capital; once parents switch from quantity of children to quality, fertility falls, population pressure eases, and growth of $A$ and of income per person feed each other. The theory is a useful organising frame. It is not a substitute for the regional evidence, and it does not by itself explain why the transition happened first in Britain.

Three features of the pre-industrial record already strain a strict reading of [[#prop-steady]].

First, **the English and Dutch upward drift**. A doubling of English GDP per capita between 1270 and 1700 is too large to be a mere unfinished transition after the Black Death (population had recovered, and then some, by 1700). Part of the rise is structural: a shift out of agriculture into industry and services, which raises measured GDP per capita even if agricultural yields are Malthusian. Part is a slow rise in $A$. Part may be a rise in $\bar w$ as the European marriage pattern took hold. The model can absorb each of these; it cannot absorb them and still predict a flat wage series. Clark’s (2005) English real-wage series is closer to flat, once one averages through the Black Death spike, than Broadberry’s GDP-per-capita series. Wages and GDP per capita are not the same: GDP includes rents and profits, and the basket of goods in GDP is broader than the labourer’s grain-and-cloth basket. The two series together say “slow rise, not stasis, and not modern growth.”

Second, **cities**. Pre-industrial cities were demographic sinks: urban death rates exceeded birth rates, and cities grew only by immigration. That urban death penalty raises $\bar w$ in the countryside, because the countryside must produce a surplus of births to feed the cities. It also concentrates demand for manufactures and for traded grain. The Dutch and English urban systems of the seventeenth century were, on this logic, both a Malthusian burden and a Smithian market.

Third, **institutions and culture**, which the production function hides inside $A$ and $\bar w$. Property rights, the security of grain markets, guilds, kinship systems and the status of merchants all affect how far a technical idea travels and how many children families choose. We will meet the institutional argument properly in [[economic-history/great-divergence]]. For this chapter the point is narrower: a Malthusian model with a fixed $n(w)$ will mis-predict any society in which the fertility schedule itself responds to urbanisation, education or the value of women’s time.

::: application After a harvest failure {#app-famine}
A harvest failure is a temporary fall in $A$. In the model, $w$ falls, $n(w)$ turns negative, and population declines until $w$ is restored — or, if the shock is short, until the next harvest. The Irish famine of 1845–49 is sometimes read this way, and the Malthusian arithmetic is part of the story: the potato had supported a dense rural population, and *Phytophthora infestans* destroyed the supporting crop. It is not the whole story. Ireland in the 1840s was part of the United Kingdom, grain was exported during the famine, and the enumerated population of Ireland fell from 8,175,124 in 1841 to 6,552,385 in 1851 (UK census reports used by the 1901 comparative tables). That fall mixes deaths, emigration and fewer births. Treating 1.6 million as a famine death count is a mistake; treating the famine as a pure Malthusian episode, without politics or trade, is another.
:::

The figure below shows an illustrative path of the real wage after a plague, using a closed-form approach of $w_t$ to $\bar w$. It is a sketch of [[#ex-plague]], not a fitted English series.

::: widget sequence
a: 2 + 2*exp(-0.12*n)
N: 40
start: 0
limit: 2
y: 0, 5
caption: Illustrative path of the real wage after a plague that doubles $w$ on impact, approaching subsistence $\bar w = 2$ as population recovers. The decay rate $0.12$ is illustrative. Compare the shape with Clark’s English real-wage series after 1350: a rise, then a long decline as population rebuilt, not a step onto a new growth path.
:::

## Where this leads

The Malthusian model is the benchmark against which modern growth is defined. Once income per person can rise for a century without being swallowed by population, we are in a different regime — the subject of [[economic-history/industrial-revolution]] and of the Solow and unified-growth models in [[economic-growth/solow-model]] and [[economic-growth/endogenous-growth]]. The same benchmark organises the great divergence: if China, India and Britain were all Malthusian in 1600, the question is when and why some of them left. Measurement of living standards — GDP per capita, real wages, heights, literacy — continues in [[development-economics/measuring-development]]. The demographic half of the model, the fertility transition, returns in [[economic-history/late-industrialisation]].

::: history
**1798, Thomas Robert Malthus.** The first edition of *An Essay on the Principle of Population* argued that population grows geometrically when unchecked, while food grows at best arithmetically, so that misery or restraint must close the gap. Malthus was a working economist, not a prophet of disaster: later editions (1803 onward) gave more weight to the preventive check and to moral restraint. **1965, John Hajnal.** Hajnal identified a European marriage pattern west of a line from St Petersburg to Trieste: late marriage, a high share never marrying, and household formation at marriage. The pattern raises $\bar w$ in the Malthusian model. **2000, Oded Galor and David Weil.** Their paper “Population, technology, and growth” in the *American Economic Review* gave the Malthusian regime a well-specified place in a unified growth model with an endogenous fertility transition.
:::

::: summary
- In a Malthusian economy, diminishing returns to labour on land make the real wage decreasing in population, and population growth increasing in the real wage, so the long-run wage is set by demography.
- A rise in technology or in the land endowment raises steady-state population in proportion to $A^{1/\alpha}$ and leaves the long-run wage at subsistence $\bar w$.
- The Black Death and the introduction of American crops are the textbook shocks: high wages (or high population) in the transition, a return toward $\bar w$ in the long run.
- Reconstructed GDP per capita is not literally flat: England roughly doubled from 1270 to 1700 (Broadberry et al. 2015), the Dutch Republic was already rich by 1600, and Japan drifted up under Tokugawa rule. The rates are an order of magnitude below modern growth.
- Levels for 1700 are fragile; rankings and changes that survive re-basing are more reliable. China around 1000 looks comparable to England; by 1800 it does not (Maddison Project Database 2023; Broadberry, Guan and Li 2018).
- The model is a benchmark, not a complete theory of pre-industrial society. Cities, marriage patterns, institutions and slow technical change all stretch it. Escape from it is the rest of this course.
:::

## Exercises

::: exercise The wage–population elasticity {level=1}
From [[#eq-wage]], what is the elasticity of the real wage with respect to population $L$? If $\alpha = 1/3$ and population rises by 12 per cent, by approximately what per cent does the real wage fall?
::: solution
The elasticity is $-\alpha$. For $\alpha = 1/3$ and a 12 per cent rise in $L$, the wage falls by about 4 per cent. (The exact factor is $1.12^{-1/3} \approx 0.964$, a 3.6 per cent fall; the logarithmic approximation is close.)
:::
:::

::: exercise Steady-state population {level=1 check="400"}
In the illustrative economy of [[#ex-plague]], $Y = 4 T^{1/2} L^{1/2}$, $T = 100$, $\bar w = 2$. Technology rises to $A = 8$. Enter the new steady-state population $L^{*}$.
::: solution
[[#eq-Lstar]] with $\alpha = 1/2$ gives $L^{*} = T\bigl((1-\alpha)A/\bar w\bigr)^{2} = 100 \times (0.5 \times 8 / 2)^{2} = 100 \times 2^{2} = 400$.
:::
:::

::: exercise Doubling time {level=1 check="350"}
English GDP per capita grew at about 0.20 per cent a year from 1270 to 1700 (Broadberry et al. 2015). Using the rule of 70, how many years does it take for income to double at that rate? (Enter the whole number given by $70 / 0.20$.)
::: solution
$70 / 0.20 = 350$ years. The exact figure is $\ln 2 / 0.002 \approx 347$.
:::
:::

::: exercise A temporary harvest failure {level=2}
Take $w = 20/\sqrt{L}$ and $n = 0.02(w-2)$, with $L = 100$ initially. A harvest failure cuts $A$ in half for a single year, so for that year $w = 10/\sqrt{L}$. (a) What is $w$ in the disaster year? (b) What is $n$ that year? (c) If the harvest then returns to normal, why does the model *not* predict a permanent fall in population equal to that year’s $n$?
::: solution
(a) $w = 10/\sqrt{100} = 1$. (b) $n = 0.02(1-2) = -0.02$, a 2 per cent decline. (c) The shock to $A$ is temporary. After the harvest returns, $w$ is back at $2$ if $L$ is still $100$, or a little above $2$ if $L$ has already fallen a bit, and population growth turns non-negative. A one-year disaster produces a small dent, not a new steady state. Permanent population loss requires a permanent fall in $A$ or $T$, or a shock large enough to change $\bar w$ (through, for example, a lasting shift in marriage behaviour).
:::
:::

::: exercise Comparing England and China in 1700 {level=2}
The Maddison Project Database 2023 reports GDP per capita, in 2011 international dollars, of about 2,410 for England in 1700 and about 1,540 for China. (a) What is the English–Chinese ratio? (b) If both economies were on their Malthusian wage–population schedules with the same $\alpha = 1/2$ and the same $\bar w$, what would the ratio of their land-and-technology composites $A T^{\alpha}$ have to be? (c) Why might $\bar w$ not have been the same?
::: solution
(a) $2410/1540 \approx 1.56$. (b) In the steady state $w = \bar w$ in both, so GDP per worker differs only if the labour share or the mapping from $w$ to $y$ differs; with the same $\alpha$ and the same $\bar w$, $y = \bar w/(1-\alpha)$ is the same in both countries. The *observed* GDP-per-capita gap then cannot be explained by a pure common-$\bar w$ Malthusian steady state. It requires some combination of a higher English $\bar w$, a higher English $A$ still in transition, a different labour share, or measurement error. (c) The European marriage pattern, urban death rates, and disease environments all shift $\bar w$. Hajnal’s line is a reason to expect a higher north-west European $\bar w$ than a Chinese or Indian one, though how much is disputed.
:::
:::

::: exercise Welfare ratios and the little divergence {level=2}
Allen (2001) finds that real wages in London and Amsterdam held up between 1500 and 1750, while real wages in Vienna, Florence and Gdańsk fell. In the Malthusian model, interpret this little divergence as a combination of (i) a rise in $A$ or in traded $T$ in the North Sea region and (ii) a fertility schedule that did not immediately swallow the gains. What evidence would count *against* this reading?
::: solution
Evidence against: (i) population in the North Sea region growing as fast, or faster, than in the declining cities, which would suggest that $n(w)$ did respond and that the wage gap must then come from a higher $\bar w$ or from measurement; (ii) welfare ratios in London and Amsterdam falling back to the continental level by 1750, which they did not; (iii) the wage gap vanishing once one prices a European basket rather than a local one, which Allen’s silver-wage and basket work was designed to check. Population did grow in England and the Netherlands, but not by enough to erase the wage lead. That is why the little divergence is a problem for a strict, common-$\bar w$ Malthusian model, and a reason to take $\bar w$ and slow growth of $A$ seriously.
:::
:::

::: exercise From $A$ to $L^{*}$ {level=3}
Derive [[#eq-Lstar]] from [[#eq-wage]]. Then show that if $A$ grows continuously at rate $g$ and population is always at the moving steady state $L^{*}(t)$, the growth rate of population is $g/\alpha$. What goes wrong with that last step as a history of the Industrial Revolution?
::: hint
Log-differentiate $L^{*} = T \bigl((1-\alpha)A/\bar w\bigr)^{1/\alpha}$ with $T$ and $\bar w$ fixed.
:::
::: solution
Set $(1-\alpha)A (T/L)^{\alpha} = \bar w$, rearrange to $L^{\alpha} = (1-\alpha)A T^{\alpha}/\bar w$, then $L = T \bigl((1-\alpha)A/\bar w\bigr)^{1/\alpha}$. With $A(t) = A_0 e^{gt}$ and $L(t) = L^{*}(t)$, $\dot L/L = (1/\alpha) g$. The step fails as a history of the Industrial Revolution because (i) population was not always at $L^{*}$ — transitions take decades, (ii) $\bar w$ itself moved as fertility began to fall, (iii) $g$ was not a constant exogenous rate, and (iv) once $g$ is high enough, the wage stays above $\bar w$ for long enough that the fertility transition can take hold. The calculation is the Malthusian upper bound on how fast population can absorb technical change; modern growth begins when absorption is incomplete.
:::
:::

::: exercise A two-check diagram {level=3}
Suppose the positive check is $d = d_0 - \delta w$ and the preventive check is $b = b_0 + \beta w$, with $d$ the crude death rate and $b$ the crude birth rate, all parameters positive and $n = b - d$. (a) Find $\bar w$ in terms of the parameters. (b) Show that a fall in $d_0$ (a healthier disease environment at a given wage) lowers $\bar w$. (c) In one paragraph, apply (b) to the debate over whether the late-eighteenth-century rise in English real wages was Malthusian recovery or the start of escape. Use the fact that English population was also rising (Wrigley and Schofield, *The Population History of England*, 1981).
::: hint
Set $b-d = 0$ and solve for $w$. For (c), ask whether a rising wage together with rising population is a movement *along* $n(w)$ or a shift of the schedule.
:::
::: solution
(a) $n = b - d = (b_0 - d_0) + (\beta + \delta)w$. Then $n = 0$ at $\bar w = (d_0 - b_0)/(\beta+\delta)$, which is positive if $d_0 > b_0$. (b) $\partial \bar w / \partial d_0 = 1/(\beta+\delta) > 0$. A healthier disease environment at a given wage is a fall in $d_0$, so $\bar w$ falls. Long-run population $L^{*}$ therefore rises and the long-run wage falls. That is the Malthusian curse of public health: fewer deaths produce more people and lower wages, unless the fertility schedule shifts down as well. (c) Wrigley and Schofield document a simultaneous rise in English population and in fertility from the mid-eighteenth century, with mortality also improving. A pure Malthusian recovery from a low-population, high-wage state would have *falling* wages as population grew. Rising wages *and* rising population require a rising $A$ (or $T$) fast enough to outrun the demographic response — the first glimpse of escape — or a shift in $n(w)$ itself. Distinguishing those is the task of [[economic-history/industrial-revolution]].
:::
:::
