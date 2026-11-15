A city wakes to a frost that has damaged the coffee harvest, and within days the price of a cup is higher. No mayor set that price. Millions of buyers, who would have paid the old price for the same cup, now cut back a little; thousands of sellers, facing a smaller crop, ask more for each kilogram that remains. The two sides meet at a new price and a new quantity. **Supply and demand** is the model that makes that meeting precise.

This chapter defines a demand curve and a supply curve, finds the **equilibrium** at which they are consistent, and traces how the equilibrium moves when something other than the price of the good itself changes. The next chapter measures *how much* quantities respond; this one is about direction. The diagrams put quantity on the horizontal axis and price on the vertical axis, following Marshall: we plot **inverse** demand and inverse supply, price as a function of quantity, even though in the algebra it is often the quantity that is a function of the price.

## Demand

The **quantity demanded** of a good is the amount buyers are willing and able to purchase at a stated price, in a stated period, other things equal. As the price of the good itself rises, that quantity typically falls: some buyers drop out, some buy less, and some switch to substitutes. That regular relationship is the **law of demand**. It is an empirical regularity, not a theorem; Giffen goods, discussed in [[microeconomics]], are the famous (and rare) exception.

::: definition Demand curve {#def-demand}
A **demand curve** for a good is the relationship between the price of the good and the quantity demanded, holding other determinants of demand fixed: incomes, prices of related goods, tastes, expectations and the number of buyers. A **movement along** the curve is the change in quantity demanded when the price of the good itself changes. A **shift** of the curve is the change in quantity demanded at every price when one of the other determinants changes.
:::

A linear example that we shall use throughout the chapter is

$$
Q^d = 120 - 4P, \qquad P = 30 - \frac{Q}{4}.
$$ {#eq-demand}

The first equation is demand as a function of price; the second is the inverse, the curve we draw. The intercept 30 is the highest price at which anyone buys; the slope $-1/4$ says that each extra unit sold requires the price to fall by $1/4$.

**Shifters of demand.** An increase in income shifts demand to the right if the good is **normal**, to the left if it is **inferior**. A rise in the price of a **substitute** (tea, for coffee) shifts demand right; a rise in the price of a **complement** (sugar, for coffee, in some uses) shifts it left. A change in tastes, a change in expected future prices, or a change in the number of buyers shifts the curve in the corresponding direction. In every case the price of the good itself is *not* a shifter: it is the variable on the axis.

::: example Reading a demand schedule {#ex-demand-schedule}
The following schedule gives quantity demanded of a weekly market vegetable, in kilograms, at prices in units of money per kilogram: $(P, Q^d) = (10, 80),\ (12, 72),\ (15, 60),\ (20, 40)$. Confirm that the four points lie on $Q^d = 120 - 4P$. What happens to quantity demanded when the price rises from 12 to 15? If, at every price, quantity demanded rises by 20 because a substitute has become more expensive, write the new demand equation.
::: solution
At $P = 10$, $120 - 40 = 80$; at $12$, $120 - 48 = 72$; at $15$, $120 - 60 = 60$; at $20$, $120 - 80 = 40$. The points fit. When the price rises from 12 to 15, quantity demanded falls from 72 to 60, a movement along the curve of 12 kilograms. The new demand is $Q^d = 140 - 4P$. At the old price of 12 the new quantity demanded is 92, not 72: that change is a shift, not a movement along the original curve.
:::
:::

::: warning A shift is not a movement along the curve
The most common diagrammatic mistake in economics is to treat a change in price as a shift of demand. If the price of coffee rises *because a frost cut the harvest*, the demand curve for coffee does not move. Quantity demanded falls as buyers slide up the existing demand curve. The supply curve is what shifted. Reserve the word “shift” for a change in a determinant other than the good’s own price, and the phrase “change in quantity demanded” for a movement along a given curve.
:::

## Supply

The **quantity supplied** is the amount sellers are willing and able to sell at a stated price, other things equal. As the price of the good itself rises, that quantity typically rises: existing sellers produce more, and new sellers may enter. That is the **law of supply**, again an empirical regularity for most goods in the short run, with exceptions when capacity is rigidly fixed.

::: definition Supply curve {#def-supply}
A **supply curve** for a good is the relationship between the price of the good and the quantity supplied, holding other determinants of supply fixed: input prices, technology, expected future prices, the number of sellers, and, for agricultural goods, the weather. A movement along the curve is the response to the good’s own price; a shift of the curve is the response to any other determinant.
:::

A linear partner for [[#eq-demand]] is

$$
Q^s = 2P - 12, \qquad P = 6 + \frac{Q}{2},
$$ {#eq-supply}

defined for $P \ge 6$ (below a price of 6, quantity supplied is zero). The intercept 6 is the lowest price at which anyone sells; each extra unit costs $1/2$ more in the price the marginal seller must receive.

**Shifters of supply.** A rise in an input price (wages, fuel, seed) shifts supply left — a higher $P$ for each $Q$, or a lower $Q$ at each $P$. Better technology shifts it right. A tax on sellers shifts it left by the amount of the tax, a case computed in [[principles/markets-and-welfare]]. A frost that destroys part of a crop is a leftward shift. The good’s own price is, again, not a shifter.

::: example A harvest loss {#ex-harvest}
Suppose a frost changes supply from $Q^s = 2P - 12$ to $Q^s = 2P - 24$. Write the new inverse supply. At the original equilibrium price of 22 (computed below), what is the new quantity supplied, and how does it compare with the original quantity supplied of 32?
::: solution
Invert: $Q = 2P - 24$ gives $P = 12 + Q/2$. At $P = 22$, new quantity supplied is $44 - 24 = 20$, against 32 before. That is not the new equilibrium: at price 22 there is now excess demand, and the price will rise. The calculation at the old price is a *shift* of supply, holding $P$ fixed; the next section finds the new crossing.
:::
:::

## Equilibrium

A market is in **equilibrium** when the price is such that quantity demanded equals quantity supplied. At that price there is no pressure for the price to change: every buyer who wants a unit at that price finds a seller, and every seller who wants to sell a unit finds a buyer. At a higher price there is a **surplus** (excess supply); at a lower price a **shortage** (excess demand).

::: definition Market equilibrium {#def-equilibrium}
A **competitive market equilibrium** is a pair $(Q^*, P^*)$ such that $Q^* = Q^d(P^*) = Q^s(P^*)$. Equivalently, it is the intersection of inverse demand and inverse supply. The equilibrium is **stable** in the Walrasian sense if a price above $P^*$ produces excess supply (putting downward pressure on the price) and a price below $P^*$ produces excess demand (putting upward pressure on it).
:::

For [[#eq-demand]] and [[#eq-supply]],

$$
120 - 4P = 2P - 12 \implies 132 = 6P \implies P^* = 22, \qquad Q^* = 120 - 88 = 32.
$$

Check: $Q^s(22) = 44 - 12 = 32$. Inverse form: $30 - Q/4 = 6 + Q/2$ gives $24 = (3/4)Q$, so $Q^* = 32$ and $P^* = 6 + 16 = 22$.

::: widget plot
f: a-x/4; b+x/2
sliders: a=30:20:40:1; b=6:0:14:1
x: 0, 80
y: 0, 42
labels: \text{demand}; \text{supply}
caption: Inverse demand $P = a - Q/4$ and inverse supply $P = b + Q/2$. At $a = 30$, $b = 6$ the crossing is $Q = 32$, $P = 22$. Raise $a$: demand shifts up, and both $P$ and $Q$ rise. Raise $b$: supply shifts up (costs higher), $P$ rises and $Q$ falls. The crossing is the equilibrium; a point sliding along a curve is a movement, not a shift.
:::

::: example A surplus and a shortage {#ex-surplus}
In the same market, compute excess demand $Q^d - Q^s$ at $P = 16$ and at $P = 28$. In which direction would the price be pushed if it started at each of those values and were free to move?
::: solution
At $P = 16$, $Q^d = 120 - 64 = 56$ and $Q^s = 32 - 12 = 20$, so excess demand is $36$: a shortage. Buyers who cannot obtain the good bid the price up. At $P = 28$, $Q^d = 120 - 112 = 8$ and $Q^s = 56 - 12 = 44$, so excess demand is $-36$: a surplus of 36. Unsold units lead sellers to cut the price. Both pressures point toward 22.
:::
:::

The story of price adjustment is a sketch, not a full dynamic model. It assumes that a shortage leads buyers to offer more and that a surplus leads sellers to accept less, and that no rule (a price control, a custom, a queue) prevents the price from moving. When those assumptions fail, the market need not clear; [[principles/markets-and-welfare]] studies price ceilings and floors.

::: quiz
The price of a bushel of wheat rises after a drought, and the quantity of wheat sold falls. Which curve shifted, and in which direction did the market move along the other curve?
- [ ] Demand shifted left; the market moved down the supply curve
- [x] Supply shifted left; the market moved up the demand curve
- [ ] Demand shifted right; the market moved up the supply curve
- [ ] Both curves shifted left by the same amount
::: solution
A drought is a shock to supply, not to the buyers’ willingness to pay. Supply shifts left. The new intersection has a higher price and a lower quantity, which is a movement *up* the unchanged demand curve. Quantity demanded falls because the price is higher, not because demand shifted.
:::
:::

## Comparative statics: shifting one curve

The use of the diagram is to predict the direction of change when a shifter moves. The method is always the same: decide which curve moves, decide the direction, and read the new intersection.

::: proposition Direction of equilibrium change {#prop-shifts}
In a market with a downward-sloping demand curve and an upward-sloping supply curve and a unique interior equilibrium:

1. A rightward shift of demand raises $P^*$ and raises $Q^*$.
2. A leftward shift of demand lowers $P^*$ and lowers $Q^*$.
3. A rightward shift of supply lowers $P^*$ and raises $Q^*$.
4. A leftward shift of supply raises $P^*$ and lowers $Q^*$.

If both curves shift, the effect on one of $P^*$ or $Q^*$ is determined and the effect on the other is ambiguous without magnitudes.
:::

::: proof
Let inverse demand be $P = a - bQ$ and inverse supply $P = c + dQ$ with $a > c$ and $b, d > 0$. Then

$$
Q^* = \frac{a - c}{b + d}, \qquad P^* = \frac{ad + bc}{b + d}.
$$ {#eq-linear-eq}

A rightward (upward) demand shift is an increase in $a$: $\partial Q^*/\partial a = 1/(b+d) > 0$ and $\partial P^*/\partial a = d/(b+d) > 0$. A rightward (downward) supply shift is a decrease in $c$: $\partial Q^*/\partial c = -1/(b+d) < 0$ and $\partial P^*/\partial c = b/(b+d) > 0$, so a fall in $c$ raises $Q^*$ and lowers $P^*$. The four cases follow. If $a$ and $c$ both rise, $P^*$ rises but $Q^*$ moves with $a - c$, whose sign is unknown.
:::

::: example A demand shift computed {#ex-demand-shift}
Income rises and demand becomes $Q^d = 150 - 4P$, supply unchanged at $Q^s = 2P - 12$. Find the new equilibrium. Confirm the direction in [[#prop-shifts]].
::: solution
$150 - 4P = 2P - 12$ gives $162 = 6P$, so $P^{**} = 27$ and $Q^{**} = 150 - 108 = 42$. Price rose from 22 to 27 and quantity from 32 to 42, as a rightward demand shift requires. Inverse demand is now $P = 37.5 - Q/4$; it crosses $P = 6 + Q/2$ at $37.5 - Q/4 = 6 + Q/2$, so $31.5 = (3/4)Q$ and $Q = 42$.
:::
:::

When both curves shift, draw both and admit the ambiguity. A booming economy that raises demand for construction *and* a wage increase that raises builders’ costs will raise the price of new housing; whether the quantity of housing rises or falls depends on which shift is larger. The diagram does not let you off that empirical question.

::: widget plot
f: 30-x/4; 6+x/2; 37.5-x/4
x: 0, 80
y: 0, 42
labels: \text{old demand}; \text{supply}; \text{new demand}
caption: The demand shift of [[#ex-demand-shift]]. The supply curve is fixed. The new crossing is up and to the right of the old one. Compare a movement along old demand (which would require a supply shift) with this parallel slide of the whole demand curve.
:::

## What the model is and is not

The supply-and-demand diagram describes a **competitive** market: many buyers, many sellers, a homogeneous good, and a price that none of them individually sets. A village with one miller is not that market; a patented drug is not; a labour market with a single employer may not be. Those cases are the subject of [[principles/market-power]] and of [[labour-economics]]. Using the diagram anyway is sometimes a useful approximation and sometimes a mistake; the test is whether the conclusions survive a little market power, not whether the assumptions are literally true.

The diagram is also a short-run picture. In the long run, entry and exit shift supply; incomes and the number of buyers shift demand. Marshall’s distinction between the short run and the long run, which [[principles/firms-and-costs]] takes up, is already implicit: the supply curve we drew takes the number of sellers as given.

Prices in the model are relative prices, even when we write them in units of money. If every nominal price in the economy doubled, including wages and the prices of substitutes, a well-specified demand curve in *real* terms would not shift. Confusing a nominal change with a relative-price change is a macroeconomic error; it will return in [[principles/macroeconomic-policy]].

This atlas is for education only — not investment or financial advice. The numbers in the examples are illustrative. They are not a forecast of any market.

::: intuition Why does a frost raise the price?
Not because sellers “need” to recoup a lost harvest, and not because buyers become more eager. The frost destroys units. At the old price there are now more willing buyers than remaining units, so the price is bid up until enough buyers have dropped out and enough remaining units have been coaxed onto the market (if any still can be) that the two sides match. The higher price is a rationing device. It is also a signal: it tells growers that planting more next season would be valuable, which is a movement along a longer-run supply curve.
:::

## Evidence

The qualitative predictions of [[#prop-shifts]] are among the best-documented regularities in economics. A well-identified supply shock — a freeze in Brazilian coffee regions, a hurricane that closes Gulf of Mexico oil platforms, a disease that kills livestock — raises the price of the affected good and reduces the quantity, with spillovers onto substitutes. Demand shocks identified from income changes, from demographic change, or from policy (a subsidy to buyers) move price and quantity in the same direction.

Magnitudes belong to the next chapter, but a few orders of size help. The Food and Agriculture Organization of the United Nations (FAO Food Price Index, annual series) recorded a sharp rise in international food prices in 2007–08 and again in 2011, associated with harvest shortfalls, demand growth in large middle-income countries, and, in some analyses, biofuel policy and financial conditions. The same index fell in 2014–15 as harvests recovered. These are movements in an index of many markets, not a single supply-and-demand diagram, but the direction matches a leftward then rightward shift of agricultural supply, combined with growing demand.

Retail markets also match the diagram when they are allowed to. During the 2020–21 pandemic, the prices of goods whose demand rose (household electronics, some foods) increased while the prices of goods whose demand collapsed (hotel nights, aviation fuel) fell, in many countries, before later supply-chain disruptions shifted supply as well (see, for a cross-country discussion, IMF *World Economic Outlook*, October 2021, chapter 1). Where prices were controlled, shortages and queues appeared instead — the prediction of a price ceiling in [[principles/markets-and-welfare]].

Estimating a demand curve from raw observations of price and quantity is not a matter of drawing a line through the points. The observed points are *equilibria*, so they mix demand and supply. That **identification** problem is the founding problem of econometrics (Working, 1927; Haavelmo, 1944) and is treated in [[econometrics]] and [[causal-inference]]. The diagrams in this chapter assume we already know the curves.

::: history
**1890, Alfred Marshall.** The *Principles of Economics* made the supply-and-demand diagram, with price on the vertical axis, the central figure of undergraduate economics. Marshall was careful about time: the supply curve is more elastic the longer the period in which firms can adjust, a distinction this course returns to in [[principles/firms-and-costs]]. He also introduced the language of elasticity, the subject of the next chapter. Cournot had drawn a demand curve in 1838; Fleeming Jenkin had used supply and demand in an 1870 essay. Marshall’s contribution was the apparatus as a working tool, with *ceteris paribus* as its discipline.
:::

## Where this leads

[[principles/elasticity]] puts a number on the slopes. [[principles/markets-and-welfare]] asks whether the equilibrium quantity is the efficient one, and what a tax or a price control does to surplus. [[principles/firms-and-costs]] derives the supply curve from cost minimisation and profit maximisation, so that we know when the upward slope is a marginal-cost curve. Macroeconomics uses the same comparative-statics method on **aggregate** demand and supply in [[principles/macroeconomic-policy]], with a different list of shifters and a different interpretation of the price axis.

::: summary
- Quantity demanded falls with the good’s own price, other things equal; quantity supplied typically rises. Those relationships are the demand and supply curves.
- A change in the good’s own price is a movement along a curve. A change in income, related prices, technology, input costs or another listed determinant is a shift of a curve.
- Competitive equilibrium is the intersection: $Q^d(P^*) = Q^s(P^*)$. A price above $P^*$ produces a surplus; a price below $P^*$ produces a shortage.
- Demand shifts move $P^*$ and $Q^*$ in the same direction; supply shifts move them in opposite directions. Two shifts at once leave one of the two changes ambiguous.
- The diagram describes a competitive market. Estimating the curves from observed equilibria requires more than plotting the points.
:::

## Exercises

::: exercise An equilibrium price {level=1 check="22"}
Demand is $Q^d = 120 - 4P$ and supply is $Q^s = 2P - 12$. Find the equilibrium price. (Enter the equilibrium price.)
::: solution
$120 - 4P = 2P - 12$ gives $132 = 6P$, so $P^* = 22$. Quantity is $Q^* = 32$, but the number to enter is the price, 22.
:::
:::

::: exercise A shortage {level=1}
At a price of 10 in the same market, compute quantity demanded, quantity supplied and the shortage.
::: solution
$Q^d = 120 - 40 = 80$, $Q^s = 20 - 12 = 8$. Shortage $= 80 - 8 = 72$.
:::
:::

::: exercise Name the shifter {level=1}
For each event, say whether demand or supply of *rice in a city* shifts, and in which direction: (a) a rise in the price of wheat, a substitute; (b) a flood that destroys rural stocks; (c) a fall in city incomes, rice being a normal good; (d) a new milling technique that reduces costs.
::: solution
(a) Demand right. (b) Supply left. (c) Demand left. (d) Supply right. In none of these does the price of rice itself shift a curve; the price will change as a *result* of the shift.
:::
:::

::: exercise A supply shock {level=2}
Supply becomes $Q^s = 2P - 24$, demand unchanged at $Q^d = 120 - 4P$. Find the new equilibrium price and quantity. Confirm that price rose and quantity fell relative to $(22, 32)$.
::: solution
$120 - 4P = 2P - 24$ gives $144 = 6P$, so $P = 24$ and $Q = 120 - 96 = 24$. Price 24 > 22, quantity 24 < 32.
:::
:::

::: exercise Two shifts {level=2}
Demand becomes $Q^d = 150 - 4P$ and supply becomes $Q^s = 2P - 24$. Compute the new equilibrium. Compared with $(22, 32)$, what happened to price and to quantity? Which of those two changes could you have predicted without magnitudes?
::: solution
$150 - 4P = 2P - 24$ gives $174 = 6P$, so $P = 29$ and $Q = 150 - 116 = 34$. Price rose (29 > 22) and quantity rose a little (34 > 32). Both curves shifted left-or-up for supply and right for demand, so a price increase was predicted by [[#prop-shifts]]; the quantity change was ambiguous and happened, in these numbers, to be positive.
:::
:::

::: exercise Inverse form {level=2}
Invert $Q^d = 90 - 3P$ and $Q^s = P - 10$ (for $P \ge 10$). Solve for equilibrium using the inverse curves, and check using the direct curves.
::: solution
Inverse demand: $P = 30 - Q/3$. Inverse supply: $P = 10 + Q$. Set $30 - Q/3 = 10 + Q$, so $20 = (4/3)Q$ and $Q^* = 15$. Then $P^* = 10 + 15 = 25$. Direct check: $Q^d = 90 - 75 = 15$, $Q^s = 25 - 10 = 15$.
:::
:::

::: exercise A price ceiling {level=3}
In the original market ($Q^d = 120 - 4P$, $Q^s = 2P - 12$), a price ceiling is imposed at $P = 16$. (a) Does it bind? (b) Compute quantity demanded, quantity supplied and the shortage. (c) Who obtains the scarce units is not determined by the ceiling; name two rationing mechanisms that might appear.
::: hint
A ceiling binds if it is below $P^*$. Quantity transacted is the short side, here quantity supplied.
:::
::: solution
(a) $16 < 22$, so the ceiling binds. (b) $Q^d = 56$, $Q^s = 20$, shortage $36$. Quantity transacted is 20. (c) Queues (time costs), seller favouritism, a parallel market at a price above 16, or official ration tickets. The ceiling does not, by itself, say which buyers receive the 20 units.
:::
:::

::: exercise Identifying a pair of observations {level=3}
In year 1 the market is at $(Q, P) = (32, 22)$. In year 2 it is at $(42, 27)$. (a) If only one curve shifted, which curve shifted, and in which direction? (b) Write a pair of linear demand and supply curves, of the family used in this chapter, that are consistent with the two observations under that interpretation. (c) Why can you not conclude, from the two points alone, that you have estimated a demand curve?
::: hint
Price and quantity both rose, so [[#prop-shifts]] points to a demand shift. The two points then lie on the *unshifted* supply curve.
:::
::: solution
(a) Demand shifted right: $P$ and $Q$ both rose. (b) The two points lie on the original supply $Q^s = 2P - 12$: $2\times 22 - 12 = 32$ and $2\times 27 - 12 = 42$. Year-1 demand $Q^d = 120 - 4P$ passes through $(32, 22)$; year-2 demand $Q^d = 150 - 4P$ passes through $(42, 27)$. (c) The two observed points are two equilibria. They identify the unshifted curve (supply) if we are willing to assume that only demand moved. They do not trace out demand: each point is on a *different* demand curve. Plotting them and calling the slope a demand slope would mix the two.
:::
:::
