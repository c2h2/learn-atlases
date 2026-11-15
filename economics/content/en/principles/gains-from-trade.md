Two neighbouring farms grow the same two crops. One farm is better at both: more maize per hectare *and* more beans. Should the weaker farm grow anything for sale, or would both be better off if the stronger farm produced everything? The answer, which surprised readers when David Ricardo stated it in 1817, is that both can gain from specialisation and trade so long as their *opportunity costs* differ. Being worse at everything is not a reason to be self-sufficient. Being better at everything is not a reason to produce everything.

This chapter takes the production possibility frontier of [[principles/thinking-like-an-economist]] and puts two of them side by side. We distinguish **absolute advantage** from **comparative advantage**, compute the range of prices at which both sides gain, and draw the consumption possibilities that trade opens up. The same arithmetic describes two people, two firms or two countries. It does not say that every person inside a trading country gains, and it does not say that trade should be free of all restriction; those are separate questions, taken up at the end with the evidence.

## Absolute and comparative advantage

Consider two countries, A and B, each with one worker and one working day. The worker can produce either cloth or wine (or a mix). Productivities, in units per day, are:

|  | Cloth | Wine |
|---|---|---|
| Country A | 10 | 5 |
| Country B | 8 | 8 |

Country A produces more cloth per day than B. Country B produces more wine per day than A. Each therefore has an **absolute advantage** in one good.

::: definition Absolute advantage {#def-absolute}
A producer has an **absolute advantage** in a good if, with a given bundle of resources, it can produce more of that good than another producer can. Absolute advantage is a statement about productivities, not about opportunity costs.
:::

Now compute opportunity costs. In A, a day spent on one more unit of cloth forgoes $5/10 = 1/2$ unit of wine, so the opportunity cost of a unit of cloth is $1/2$ unit of wine, and the opportunity cost of a unit of wine is $2$ units of cloth. In B both costs are 1: a unit of cloth costs 1 unit of wine, and a unit of wine costs 1 unit of cloth.

Cloth is cheaper, in wine forgone, in A. Wine is cheaper, in cloth forgone, in B. Each country has a **comparative advantage** in the good it produces at lower opportunity cost.

::: definition Comparative advantage {#def-comparative}
A producer has a **comparative advantage** in a good if it has a lower opportunity cost of producing that good than another producer has. Opportunity cost is measured in units of the other good (or, with many goods, in the value of the next-best alternative).
:::

Comparative advantage is about *relative* productivities. A can be worse at both goods and still have a comparative advantage in one of them. Change the table so that A produces 10 cloth or 5 wine and B produces only 3 cloth or 4 wine. A is more productive in both (absolute advantage in both). Opportunity costs: in A, cloth still costs $1/2$ wine; in B, cloth costs $4/3$ wine. A has the comparative advantage in cloth, B in wine, because $4/3 > 1/2$. B’s wine costs $3/4$ cloth; A’s wine costs 2 cloth; B has the comparative advantage in wine.

::: warning Absolute advantage is not the reason to trade
A common mistake is to think that a country (or a person) should produce the goods in which it is *best*, meaning most productive. If one country is more productive in every good, that rule would say it should produce everything and the other country nothing. Comparative advantage says the opposite: the less productive country still has a lower opportunity cost in *something*, and world output rises when it specialises in that something. Trade is driven by differences in opportunity cost, not by differences in absolute productivity.
:::

::: example Who should specialise in what? {#ex-who}
Two people, Kim and Lee, can prepare meals and draft documents. In an hour Kim can cook 4 meals or draft 2 documents; Lee can cook 1 meal or draft 1 document. Who has the absolute advantage in each task? Who has the comparative advantage? If they have 2 hours each and, under autarky, each splits time evenly, what do they produce? What if Kim cooks for 2 hours and Lee drafts for 2 hours?
::: solution
Kim produces more meals per hour and more documents per hour, so Kim has an absolute advantage in both. Opportunity cost of a meal: Kim forgoes $2/4 = 1/2$ document; Lee forgoes $1/1 = 1$ document. Kim has the comparative advantage in meals. Opportunity cost of a document: Kim forgoes 2 meals; Lee forgoes 1 meal. Lee has the comparative advantage in documents.

Autarky, even split: Kim produces 4 meals and 2 documents (one hour each); Lee produces 1 meal and 1 document. Totals: 5 meals, 3 documents. Specialisation: Kim produces 8 meals, Lee produces 2 documents. Totals: 8 meals, 2 documents. Meals rise by 3; documents fall by 1. Whether both people gain depends on the rate at which they exchange meals for documents — the next section. World *value* rises if they trade at a price between the two opportunity costs, because each unit of time has been moved toward the lower-cost producer of the good it now produces.
:::
:::

The last sentence is the engine of the chapter. We now make it precise.

## The gains from specialisation

Return to the cloth-and-wine table. Under **autarky** each country consumes only what it produces. Suppose A spends 60 per cent of the day on cloth and 40 per cent on wine: 6 units of cloth and 2 of wine. Suppose B splits the day evenly: 4 cloth and 4 wine. World output is 10 cloth and 6 wine.

If instead A specialises in cloth and B in wine, world output is 10 cloth and 8 wine. The same labour and the same technology produce 2 extra units of wine and no less cloth. That extra output is the **gain from specialisation**. It exists because labour has been moved out of the activity in which its opportunity cost is high and into the activity in which its opportunity cost is low.

::: proposition Gains from specialisation {#prop-gains}
Suppose two producers each have a linear production possibility frontier and different opportunity costs of good 1 in terms of good 2. Then there is a reallocation of production, with at least one producer specialising according to comparative advantage, that raises world output of at least one good without lowering world output of the other. The set of consumption bundles the two can jointly achieve is therefore larger than the sum of their autarky consumption sets.
:::

::: proof
Let producer $i$ have opportunity cost $c_i$ of good 1 in units of good 2, with $c_A < c_B$. Move one unit of good-1 production from B to A. A must give up $c_A$ of good 2 to make that unit; B, producing one less unit of good 1, releases $c_B$ of good 2. Net world change: good 1 unchanged, good 2 rises by $c_B - c_A > 0$. Repeat until A is specialised in good 1 or B in good 2. Linear PPFs make the opportunity costs constant, so every such move is an improvement. The world PPF therefore lies outside the sum of the autarky bundles along the comparative-advantage direction.
:::

The argument does not need two countries. Two people on a team, two plants in a firm, two regions in a nation: whenever opportunity costs differ, specialisation raises the total. The argument *does* need the possibility of exchange. If A produces only cloth, A must obtain wine from B, or A’s consumption of wine falls. Trade is what converts a gain in world output into a gain in consumption for each side.

::: widget plot
f: 5-0.5*x; 8-x
x: 0, 12
y: 0, 10
labels: \text{country A PPF}; \text{country B PPF}
caption: Linear PPFs for the cloth–wine example. Country A’s frontier runs from 10 cloth to 5 wine, slope $-1/2$. Country B’s runs from 8 cloth to 8 wine, slope $-1$. A is the lower-cost producer of cloth; B of wine. Autarky consumption sits on each frontier. After specialisation A sits at $(10,0)$ and B at $(0,8)$; trade then moves each country *off* its PPF into a consumption point its own labour could not have reached.
:::

## Terms of trade and the consumption gain

The **terms of trade** are the relative price at which the two goods exchange: units of wine per unit of cloth, or the inverse.

::: definition Terms of trade {#def-terms}
The **terms of trade** for a seller of good 1 are the units of good 2 obtained per unit of good 1 exported. Both sides gain from trade only if the terms of trade lie strictly between the two opportunity costs.
:::

In the example, A’s opportunity cost of cloth is $1/2$ wine and B’s is 1 wine. If cloth trades at $p$ units of wine per unit of cloth, A gains from exporting cloth if $p > 1/2$ (more wine per cloth than A would get by making wine itself) and B gains from importing cloth if $p < 1$ (less wine given up than B would give up by making cloth itself). Any $p$ with

$$
\frac12 < p < 1
$$ {#eq-range}

is mutually beneficial. At $p = 1/2$ A is indifferent; at $p = 1$ B is indifferent. Endpoints allocate the whole gain to one side; interior prices share it.

::: example A trade at three for four {#ex-trade}
A specialises in cloth (10 units) and B in wine (8 units). They trade 4 units of cloth for 3 units of wine, so $p = 3/4$ wine per cloth, which lies in $(1/2, 1)$. Compute each country’s consumption and compare with the autarky bundles $(6,2)$ and $(4,4)$.
::: solution
A exports 4 cloth and keeps $10 - 4 = 6$, and imports 3 wine. Consumption: $(6, 3)$. Autarky was $(6, 2)$. A has the same cloth and more wine.

B exports 3 wine and keeps $8 - 3 = 5$, and imports 4 cloth. Consumption: $(4, 5)$. Autarky was $(4, 4)$. B has the same cloth and more wine.

Both consume a bundle that lies *outside* their own PPF. That is the geometric meaning of a gain from trade: trade is a technology for turning cloth into wine (or wine into cloth) at a rate the domestic PPF does not offer.
:::
:::

::: widget plot
f: 5-0.5*x; 3+0.75*(10-x)
x: 0, 12
y: 0, 10
labels: \text{A's PPF}; \text{A's consumption line}
caption: Country A produces at $(10,0)$ and trades along a line of slope $-3/4$ (the terms of trade): each cloth exported brings 0.75 wine. The consumption line lies above the PPF except at the production point. Drag nothing — compare the intercepts. At 6 cloth, the PPF offers 2 wine; the trade line offers 3. Move along the trade line in your head: any point with more than 5 wine would require A to export at a price B will not pay.
:::

How is $p$ determined when there are many traders? By demand and supply in the world market, the subject of [[principles/supply-and-demand]]. With two countries and linear PPFs the equilibrium $p$ must still lie in the interval [[#eq-range]]; otherwise one country would refuse to trade. With increasing opportunity cost (bowed-out PPFs) specialisation is typically incomplete: each country produces both goods, exporting the one in which it has comparative advantage, and $p$ equals the domestic opportunity cost at the production point. That is the Heckscher–Ohlin world of [[international-trade]]; the linear model is the transparent special case.

::: quiz
Country A’s opportunity cost of a car is 20 computers; country B’s is 8 computers. In which good does B have a comparative advantage, and which relative prices of cars (in computers per car) make trade mutually beneficial?
- [ ] B in computers; prices between 8 and 20
- [x] B in cars; prices between 8 and 20 computers per car
- [ ] B in cars; any price above 20
- [ ] B in both, because 8 is smaller than 20
::: solution
B’s opportunity cost of a car is lower (8 < 20), so B has the comparative advantage in cars and A in computers. Mutually beneficial prices of a car lie strictly between 8 and 20 computers. Below 8, B would rather make computers; above 20, A would rather make cars.
:::
:::

::: example Better at both, still a reason to trade {#ex-both}
Country A produces 12 wheat or 6 cloth per day; country C produces 2 wheat or 4 cloth. Who has the absolute advantage in each good? Who has the comparative advantage? Starting from an autarky bundle in which A produces 6 wheat and 3 cloth and C produces 1 wheat and 2 cloth, move one unit of wheat production from C to A. What happens to world output?
::: solution
A produces more wheat per day and more cloth per day, so A has an absolute advantage in both. Opportunity cost of wheat: $6/12 = 1/2$ cloth in A, $4/2 = 2$ cloth in C. A has the comparative advantage in wheat. Opportunity cost of cloth: 2 wheat in A, $1/2$ wheat in C. C has the comparative advantage in cloth.

Autarky world output is 7 wheat and 5 cloth. Moving one wheat from C to A: C frees half a day and produces 2 extra cloth; A takes $1/12$ of a day from cloth and loses $6/12 = 1/2$ cloth. World wheat is unchanged at 7; world cloth rises by $2 - 1/2 = 1.5$ to 6.5. The less productive country still contributes: it should specialise toward cloth, not shut down.
:::
:::

::: example When opportunity costs are equal {#ex-no-gain}
Suppose A produces 10 cloth or 5 wine and D produces 4 cloth or 2 wine. Compute opportunity costs. Does [[#prop-gains]] promise a gain from specialisation?
::: solution
In both countries a unit of cloth costs $1/2$ unit of wine. Opportunity costs are equal, so neither has a comparative advantage. Moving one cloth from D to A releases 0.5 wine in D and uses 0.5 wine in A; world output is unchanged. The proposition’s hypothesis (different opportunity costs) fails, and the conclusion fails with it. Differences in *absolute* productivity alone do not create gains from specialisation of this kind; D is a scaled-down copy of A.
:::
:::

## Many people, many goods, and the division of labour

Ricardo wrote about England and Portugal. The same logic organises a household and a workshop. Adam Smith’s pin factory, in the first chapter of the *Wealth of Nations* (1776), is a story of **division of labour**: breaking a task into steps, assigning steps to people who then become quicker at them, and saving the time that would have been lost in switching. Specialisation creates skill; skill widens the productivity gap and deepens comparative advantage. Trade and specialisation are then jointly determined, not sequenced.

With many goods the rule is unchanged: rank goods by opportunity cost and assign each producer the goods for which that cost is relatively low. With many people, a market is what finds the assignment. A carpenter does not need to know who has a comparative advantage in software; relative wages and relative prices convey the information. That is the coordinating role of prices, which the next chapter isolates in a single market.

Increasing opportunity cost limits how far specialisation goes. The first hectare moved from beans to maize is the hectare that is almost as good at maize as at beans; further hectares are worse and worse for maize, so the opportunity cost of maize rises. A country then produces both goods even when it trades, and a large demand shock can move it along the frontier rather than off a corner. The linear model’s complete specialisation is a useful polar case, not a prediction about every industry.

## Winners, losers and the limits of the model

[[#prop-gains]] is a claim about *joint* consumption possibilities. It is not a claim that every person in A and every person in B is better off. Opening trade changes relative prices. In A, the relative price of cloth rises toward the world price; people who produce cloth gain and people who produce wine lose, unless they are compensated. The **compensation principle** says that the winners *could* compensate the losers and still be better off, because the pie is larger. Whether they *do* compensate the losers is a political choice, not a theorem. In practice, compensation is partial and slow. The “China shock” studies of Autor, Dorn and Hanson (2013, *American Economic Review*) found that US local labour markets more exposed to import competition from China after 2000 had larger falls in manufacturing employment and in labour-force participation, with effects that persisted for years. Those findings are about the distribution of the gains and losses, not about the existence of a world-output gain.

Other limits of the model are worth stating rather than burying.

- **Adjustment costs.** Labour and capital do not move instantly from wine to cloth. Unemployment and idle machines during the transition are real costs, even if they are temporary.
- **Externalities and infant activities.** If production generates knowledge that other firms capture, or if a new industry would have low costs only after a period of learning, the autarky opportunity cost is not the social opportunity cost. That is an argument for a targeted, temporary intervention in some models; it is also an argument that is easy to capture by incumbents. [[international-trade]] and [[development-economics]] treat the evidence, which is mixed.
- **Market power and terms-of-trade manipulation.** A large country can push $p$ in its favour with a tariff, at the expense of its trading partners and, typically, of world efficiency. Small countries cannot.
- **Non-economic goals.** A society may wish to produce its own food or its own vaccines for reasons that are not in the PPF. Those reasons should be named and weighed against the consumption cost, not smuggled in as a denial of comparative advantage.

None of these limits reverses [[#prop-gains]] inside the model. They say when the model’s conclusion should be qualified before it is used as a guide to policy. The positive statement “voluntary trade at a price between the opportunity costs raises consumption possibilities for both sides” remains true. The normative statement “therefore this particular tariff should be removed tomorrow” does not follow without the extra steps.

::: remark Trade is not a zero-sum match
Sports metaphors — winning export markets, being beaten by imports — suggest that one side’s gain is the other’s loss. In the arithmetic of this chapter both sides can consume more of *both* goods, or more of one and no less of the other. Competition for a given export order can be zero-sum for the two firms bidding; the trade that then takes place is still a positive-sum exchange between buyer and seller. Mixing the two is a source of persistent confusion in public debate.
:::

## Evidence

Measured trade has grown, unevenly, with transport costs, trade policy and global production chains. World Bank World Development Indicators (accessed 2026) report that trade in goods and services as a share of GDP in 2022 was about 27 per cent in the United States, about 38 per cent in China, about 50 per cent in India, about 39 per cent in Brazil, about 60 per cent in South Africa, about 67 per cent in Nigeria and several hundred per cent in Singapore. Small economies trade a larger share of GDP because more of what they consume lies outside their border; the figure is a measure of integration, not of virtue.

Productivity differences of the Ricardo kind are large. The Penn World Table (version 10.01, Feenstra, Inklaar and Timmer) shows that GDP per worker in 2019, at purchasing-power parity, differed by a factor of twenty or more between the highest- and lowest-income countries. That is an absolute-advantage gap. Comparative advantage depends on the *pattern* of those gaps across industries. Countries with lower overall productivity still export — garments, agricultural products, tourism, business-process services — in the activities where their productivity gap is relatively smaller.

Estimates of the gains from trade for a whole economy, relative to autarky, are typically a few per cent of GDP for a large country and much more for a small one (see, among many, Arkolakis, Costinot and Rodríguez-Clare, 2012, *American Economic Review*, and the gravity-based literature that followed). The number is modest for the United States because the United States is large and already produces a wide range of goods; it is not a measure of the cost of a small tariff, which is smaller still, nor of the cost of a complete embargo, which would be larger. The distributional effects can be concentrated even when the aggregate gain is small, which is why the politics of trade are louder than the aggregate arithmetic.

::: application Two people in a workshop
A bicycle workshop has a frame-builder and a wheel-builder. The frame-builder is faster at both tasks. If they each build whole bicycles, output is the autarky total. If the frame-builder makes only frames and the wheel-builder only wheels, and they assemble together, output of complete bicycles rises whenever the opportunity costs differ. The “terms of trade” inside the firm are the implicit prices used to split the surplus — piece rates, salaries, or a partnership share. The same diagram, smaller labels.
:::

::: history
**1817, David Ricardo.** In chapter 7 of *On the Principles of Political Economy and Taxation*, Ricardo set out the theory of comparative advantage with an example of English cloth and Portuguese wine. Portugal was assumed more productive in both goods; England still had a lower opportunity cost of cloth. The argument was aimed at the Corn Laws as well as at the theory of value, and it remains the starting point of every first course in trade. Later work — Heckscher and Ohlin on factor endowments, Krugman on increasing returns, Melitz on heterogeneous firms — changes the source of comparative advantage and the pattern of trade, not the existence of a gain from specialisation.
:::

## Where this leads

[[principles/supply-and-demand]] replaces the two-person bargain with a price that equates the quantity demanded to the quantity supplied. The terms of trade become an equilibrium relative price. [[principles/markets-and-welfare]] measures the gain from trade inside a single market as consumer and producer surplus, and shows how a tax or a quota shrinks it. The full theory of international trade — who exports what, how factor prices move, how offshoring splits a production process — is the subject of [[international-trade]]. Development and the political economy of protection are taken up in [[development-economics]] and [[economic-history]].

::: summary
- Absolute advantage is about who produces more per unit of resources; comparative advantage is about who produces at lower opportunity cost.
- When opportunity costs differ, specialisation according to comparative advantage raises world output of at least one good without reducing the other.
- Both sides gain from trade if and only if the terms of trade lie strictly between the two opportunity costs; each then consumes a bundle outside its own PPF.
- A larger pie does not imply that every person gains. Winners could compensate losers; whether they do is a separate, political question.
- Adjustment costs, externalities, market power and non-economic goals qualify the use of the model as a policy rule without cancelling the arithmetic of [[#prop-gains]].
:::

## Exercises

::: exercise Reading a table {level=1}
Two islands, North and South, have the following productivities in units per worker-day: North, 6 fish or 3 coconuts; South, 2 fish or 4 coconuts. (a) Who has the absolute advantage in each good? (b) Compute both opportunity costs of fish. (c) Who should specialise in fish?
::: solution
(a) North in fish ($6 > 2$), South in coconuts ($4 > 3$). (b) North: 1 fish costs $3/6 = 1/2$ coconut. South: 1 fish costs $4/2 = 2$ coconuts. (c) North, whose opportunity cost of fish is lower.
:::
:::

::: exercise A mutually beneficial price {level=1 check="1"}
In the previous exercise, let $p$ be the price of a coconut in units of fish. Find the open interval of $p$ in which both islands gain (South exporting coconuts). Then state the unique integer that lies in that interval. (Enter that integer.)
::: solution
South’s opportunity cost of a coconut is $2/4 = 1/2$ fish; North’s is $6/3 = 2$ fish. Mutually beneficial prices of a coconut therefore satisfy $1/2 < p < 2$. The unique integer in the interval is 1. At $p = 1$, South obtains 1 fish per coconut, which is more than the $1/2$ fish it would get by fishing; North pays 1 fish per coconut, which is less than the 2 fish it would give up by making the coconut itself.
:::
:::

::: exercise Autarky and specialisation {level=1}
Using the cloth–wine table in the text (A: 10 cloth or 5 wine; B: 8 cloth or 8 wine) and the autarky bundles $(6,2)$ and $(4,4)$, compute world output under autarky and under complete specialisation according to comparative advantage. What extra output appears, and of which good?
::: solution
Autarky world output is $6+4=10$ cloth and $2+4=6$ wine. Specialisation: A produces 10 cloth, B produces 8 wine. World output is 10 cloth and 8 wine. Extra output: 2 wine, with cloth unchanged. This is the comparison [[#prop-gains]] describes.
:::
:::

::: exercise Consumption after trade {level=2}
After the specialisation in the previous exercise, A and B trade 4 cloth for 3 wine. Write each country’s consumption bundle and confirm that each bundle lies outside that country’s PPF.
::: solution
A produces $(10,0)$, exports 4 cloth, imports 3 wine, consumes $(6,3)$. On A’s PPF, 6 cloth leave $1-6/10=0.4$ of a day for wine, which yields $0.4\times 5=2$ wine, so $(6,2)$ is on the PPF and $(6,3)$ is above it.

B produces $(0,8)$, exports 3 wine, imports 4 cloth, consumes $(4,5)$. On B’s PPF, 4 cloth leave $1-4/8=0.5$ of a day for wine, which yields 4 wine, so $(4,4)$ is on the PPF and $(4,5)$ is above it.
:::
:::

::: exercise A third country {level=2}
Keep A as in the text (10 cloth or 5 wine). A new country E produces 6 cloth or 2 wine per day. (a) Compute opportunity costs of cloth in A and in E. (b) Who has the comparative advantage in cloth? (c) Find the open interval of wine-per-cloth prices at which A and E both gain from trade.
::: solution
(a) A: $5/10=1/2$. E: $2/6=1/3$. (b) E, whose opportunity cost of cloth is lower. (A now has the comparative advantage in wine relative to E.) (c) Cloth should trade at between $1/3$ and $1/2$ units of wine per unit of cloth. A would export wine (or import cloth) in this pairing; E would export cloth.
:::
:::

::: exercise Equal costs, no trade {level=2}
Show that if two countries have the same opportunity cost of cloth in terms of wine, any reallocation that raises one country’s cloth output by one unit, holding its labour fixed, leaves world wine output unchanged. Use productivities (10, 5) and (4, 2).
::: solution
Opportunity cost of cloth is $1/2$ wine in both. Raising cloth by 1 in the first country uses $1/10$ of a day and forgoes $5/10=1/2$ wine. Cutting cloth by 1 in the second country frees $1/4$ of a day and yields $2/4=1/2$ wine. World cloth is unchanged by construction of the pair of moves; world wine changes by $-1/2+1/2=0$. There is no surplus to share.
:::
:::

::: exercise The world PPF {level=3}
For the cloth–wine example (A: 10 cloth or 5 wine; B: 8 cloth or 8 wine), the world PPF is the set of efficient world bundles. (a) What is the maximum world cloth? Maximum world wine? (b) Explain why the efficient world bundle with 10 cloth has 8 wine, not 6. (c) Write the two linear pieces of the world PPF, with cloth $x$ on the horizontal axis.
::: hint
Start from all wine and move labour into cloth, cheapest opportunity cost first.
:::
::: solution
(a) Maximum cloth is $10+8=18$ (both make cloth). Maximum wine is $5+8=13$ (both make wine). (b) The cheapest 10 units of cloth come from A, at $1/2$ wine each, so they cost 5 wine. Starting from 13 wine, the world then has $13-5=8$ wine, all produced by B. The bundle $(10,6)$ would mean B was also making some cloth, which is wasteful while A still has wine to convert at a lower cost. (c) For $0 \le x \le 10$, only A makes cloth: $w = 13 - \tfrac12 x$. For $10 \le x \le 18$, A is specialised in cloth and B makes the rest: $w = 8 - (x-10) = 18 - x$.
:::
:::

::: exercise Winners and a compensating transfer {level=3}
In country A, a cloth worker produces the national cloth output and a wine worker produces the national wine output (one worker each, productivities as in the text: 10 cloth or 5 wine if either worker did that task — here treat the two workers as specialised already). Opening trade raises the relative price of cloth from the autarky price $1/2$ wine per cloth to the world price $3/4$. (a) Who gains and who loses from the price change, before any transfer? (b) Exhibit a transfer, in wine, from the cloth worker to the wine worker that leaves the wine worker no worse off than at autarky while leaving the cloth worker strictly better off. Assume autarky consumption was 3 cloth and 1 wine for each worker, and that after trade the cloth worker produces 10 cloth, sells 4 cloth for 3 wine, and the wine worker is idle in wine (so the story is really the two-country one: treat “wine worker” as the group that consumed wine’s autarky bundle). Use the two-country consumption numbers instead if that is cleaner: show that A’s aggregate consumption $(6,3)$ can be split so that two groups which used to share $(6,2)$ can both be at least as well off, with at least one strictly better off.
::: hint
The extra wine is 1 unit. Any split of that extra that gives the losing group at least its autarky wine works.
:::
::: solution
Use the clean aggregate version. Autarky consumption in A is $(6,2)$. After trade it is $(6,3)$. Split the post-trade bundle as $(3,1.5)$ and $(3,1.5)$, and compare with an autarky split $(3,1)$ and $(3,1)$. Both groups have the same cloth and more wine, so both can be made strictly better off. If instead one group was the “wine interest” that must be kept at $(3,1)$, give it $(3,1)$ and give the remainder $(3,2)$ to the other group: the first is no worse off, the second is strictly better off. The extra wine of 1 unit is the surplus that makes compensation possible. Nothing in the model forces the transfer to occur.
:::
:::
