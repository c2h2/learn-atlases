A 10 per cent rise in the price of salt hardly changes the quantity households buy. A 10 per cent rise in the price of a particular restaurant meal sends many diners elsewhere. Both goods have downward-sloping demand; they differ in **how much** quantity responds. **Elasticity** is the dimensionless measure of that response: the percentage change in one variable divided by the percentage change in another.

This chapter defines the price elasticity of demand, shows how to compute it from a schedule and from a differentiable curve, and links it to expenditure and to the revenue of sellers. It then introduces the income and cross-price elasticities and the price elasticity of supply. Those numbers are the magnitudes that the comparative statics of [[principles/supply-and-demand]] left open, and they determine how a tax is split between buyers and sellers in [[principles/markets-and-welfare]].

## Price elasticity of demand

::: definition Price elasticity of demand {#def-ped}
The **price elasticity of demand** at a point is

$$
\varepsilon = \frac{\mathrm{d}Q^d/Q^d}{\mathrm{d}P/P} = \frac{\mathrm{d}Q^d}{\mathrm{d}P}\cdot\frac{P}{Q^d}.
$$ {#eq-ped}

It is the percentage change in quantity demanded induced by a 1 per cent change in the good’s own price, other things equal. Demand is **elastic** when $\lvert\varepsilon\rvert > 1$, **inelastic** when $\lvert\varepsilon\rvert < 1$, and **unit-elastic** when $\lvert\varepsilon\rvert = 1$. Along a downward-sloping demand curve, $\varepsilon < 0$; the phrase “an elasticity of 2” in applied work often means $\lvert\varepsilon\rvert = 2$.
:::

Because $\varepsilon$ is a ratio of percentages, it has no units. A slope $\mathrm{d}Q/\mathrm{d}P$ does have units, and it changes if we measure quantity in tonnes rather than kilograms. Elasticity does not. That is why elasticities can be compared across goods, countries and dates.

Along a *linear* demand curve the slope is constant but elasticity is not. For $Q = a - bP$,

$$
\varepsilon = -b\cdot\frac{P}{a-bP}.
$$

At a high price, $Q$ is small and $\lvert\varepsilon\rvert$ is large; at a low price, $\lvert\varepsilon\rvert$ is small. A linear demand curve is elastic at the top, unit-elastic at the midpoint $P = a/(2b)$, and inelastic at the bottom.

For a discrete change, the percentage depends on the base. The **midpoint** (arc) formula uses the average of the two prices and the average of the two quantities:

$$
\varepsilon_{\mathrm{arc}} = \frac{(Q_2 - Q_1)/\bigl((Q_1+Q_2)/2\bigr)}{(P_2 - P_1)/\bigl((P_1+P_2)/2\bigr)} = \frac{Q_2 - Q_1}{P_2 - P_1}\cdot\frac{P_1 + P_2}{Q_1 + Q_2}.
$$ {#eq-arc}

The midpoint formula is symmetric: the elasticity from A to B equals the elasticity from B to A.

::: example A midpoint calculation {#ex-midpoint}
When the price of a weekly market good rises from 10 to 12, quantity demanded falls from 100 to 80. Compute the arc elasticity. Is demand elastic over this range?
::: solution
$$
\varepsilon_{\mathrm{arc}} = \frac{80 - 100}{12 - 10}\cdot\frac{10 + 12}{100 + 80} = \frac{-20}{2}\cdot\frac{22}{180} = -10\cdot\frac{11}{90} = -\frac{11}{9} \approx -1.22.
$$

$\lvert\varepsilon\rvert > 1$, so demand is elastic over the range. Using the start point as the base would have given $(-20/100)/(2/10) = -1$; using the end point, $(-20/80)/(2/12) = -1.5$. The midpoint sits between them and does not depend on direction.
:::
:::

::: example Point elasticity on a linear curve {#ex-point}
For the demand curve $Q^d = 120 - 4P$ of [[principles/supply-and-demand]], compute $\varepsilon$ at the equilibrium $P = 22$, $Q = 32$, and at $P = 15$, $Q = 60$. Where is demand unit-elastic?
::: solution
$\mathrm{d}Q/\mathrm{d}P = -4$, so $\varepsilon = -4P/Q$. At $(32, 22)$, $\varepsilon = -4\times 22/32 = -88/32 = -2.75$. At $(60, 15)$, $\varepsilon = -4\times 15/60 = -1$. The second point is the midpoint of the demand curve: the quantity intercept is 120, half of that is 60, and $P = (120-60)/4 = 15$. Unit-elasticity on a linear demand curve is always at the midpoint.
:::
:::

::: widget plot
f: 30-x/4; 30-x/8
x: 0, 130
y: 0, 32
labels: \text{steeper inverse demand}; \text{flatter inverse demand}
caption: Two inverse demand curves through $(Q,P)=(40,20)$. The flatter curve (shallower slope in the $(Q,P)$ plane) is more elastic at that point: a given fall in price raises quantity more. Elasticity is not the slope — move along either curve toward the price intercept and $\lvert\varepsilon\rvert$ rises, toward the quantity intercept and $\lvert\varepsilon\rvert$ falls.
:::

**What makes demand more elastic?** Close substitutes (a particular brand of rice, versus rice as a whole); a longer time for buyers to adjust (petrol in a week versus petrol over several years); a larger share of the budget (housing versus matches); and, for a firm, a more competitive market, which is the same fact under another name. Necessities with few substitutes tend to have inelastic demand; luxuries with many substitutes tend to have elastic demand. “Necessity” here is an empirical claim about $\lvert\varepsilon\rvert$, not a moral one.

::: warning Slope is not elasticity
A steeper-looking demand curve on a diagram need not be less elastic: the picture depends on how the axes are scaled, and elasticity varies along the curve. Always compute $\varepsilon = (\mathrm{d}Q/\mathrm{d}P)(P/Q)$, or the arc formula, at the point or range of interest. Comparing the slope of bread demand in loaves per penny with the slope of car demand in vehicles per thousand units of money is meaningless; comparing their elasticities is not.
:::

## Elasticity and revenue

Sellers care about elasticity because it tells them what happens to **expenditure** on the good — which is also the sellers’ **revenue** — when the price changes. Expenditure is $R = P\,Q(P)$. Differentiating,

$$
\frac{\mathrm{d}R}{\mathrm{d}P} = Q + P\frac{\mathrm{d}Q}{\mathrm{d}P} = Q\bigl(1 + \varepsilon\bigr).
$$ {#eq-revenue}

::: proposition Elasticity and revenue {#prop-revenue}
If $\varepsilon < -1$ (elastic demand), a small increase in price *reduces* revenue. If $-1 < \varepsilon < 0$ (inelastic demand), a small increase in price *raises* revenue. If $\varepsilon = -1$, revenue is stationary. Along a linear demand curve, revenue is maximised at the unit-elastic midpoint.
:::

::: proof
The sign of $\mathrm{d}R/\mathrm{d}P$ is the sign of $1+\varepsilon$ by [[#eq-revenue]], since $Q > 0$. For $Q = a - bP$, $R = aP - bP^2$, which is a concave quadratic maximised at $P = a/(2b)$, where $Q = a/2$ and $\varepsilon = -1$.
:::

The proposition is a statement about a movement *along* a demand curve. It is the right tool for a monopolist choosing a price, or for a tax that moves the market along demand. It is the wrong tool for a harvest failure, which shifts supply and moves the market *along* demand — in that case the proposition does apply to the demand side, and it explains why a smaller crop can raise farmers’ total receipts when demand is inelastic. That last observation is old: agricultural producers have often faced the combination of inelastic demand and a bumper crop, and a fall in revenue as a result.

::: example Revenue along the linear demand {#ex-revenue}
For $Q = 120 - 4P$, compute revenue at $P = 10$, $P = 15$ and $P = 22$. Confirm that revenue is higher at the unit-elastic price than at the other two.
::: solution
$Q(10) = 80$, $R = 800$. $Q(15) = 60$, $R = 900$. $Q(22) = 32$, $R = 704$. The peak is at $P = 15$, $R = 900$. From $P = 10$ (inelastic region: $\varepsilon = -4\times 10/80 = -0.5$) a price rise raises revenue; from $P = 15$ to $P = 22$ (elastic region: $\varepsilon = -2.75$) a price rise cuts revenue.
:::
:::

::: widget plot
f: x*(120-4*x)
x: 0, 30
y: 0, 1000
labels: \text{revenue } P(120-4P)
caption: Revenue $R(P) = P(120-4P)$ along the linear demand curve. The parabola peaks at $P = 15$, where $\varepsilon = -1$. To the left of the peak, demand is inelastic and raising the price raises revenue; to the right, demand is elastic and raising the price cuts revenue. This is a movement along demand, not a shift of it.
:::

::: quiz
A transit authority raises fares by 10 per cent and ridership falls by 4 per cent. What happens to fare revenue, and what is the implied arc elasticity?
- [ ] Revenue falls; $\lvert\varepsilon\rvert = 2.5$
- [x] Revenue rises; $\lvert\varepsilon\rvert = 0.4$
- [ ] Revenue is unchanged; $\lvert\varepsilon\rvert = 1$
- [ ] Revenue rises; $\lvert\varepsilon\rvert = 2.5$
::: solution
Quantity falls by less than the price rises, in percentage terms, so $\lvert\varepsilon\rvert = 4/10 = 0.4 < 1$ and demand is inelastic. Revenue therefore rises. (A 10 per cent price rise and a 4 per cent quantity fall raise $P Q$ by about 6 per cent, to a first-order approximation $\%\Delta R \approx \%\Delta P + \%\Delta Q$.)
:::
:::

## Income and cross-price elasticities

Demand also depends on income $m$ and on the prices of other goods.

::: definition Income and cross-price elasticities {#def-other-e}
The **income elasticity of demand** is $\eta = (\mathrm{d}Q/Q)/(\mathrm{d}m/m)$. The good is **normal** if $\eta > 0$ and **inferior** if $\eta < 0$; it is often called a luxury if $\eta > 1$ and a necessity if $0 < \eta < 1$. The **cross-price elasticity** of good $i$ with respect to the price of good $j$ is $\varepsilon_{ij} = (\mathrm{d}Q_i/Q_i)/(\mathrm{d}P_j/P_j)$. Goods are **substitutes** if $\varepsilon_{ij} > 0$ and **complements** if $\varepsilon_{ij} < 0$.
:::

A midpoint calculation works here too. If income rises from 20{,}000 to 24{,}000 and quantity demanded from 50 to 56,

$$
\eta_{\mathrm{arc}} = \frac{56-50}{24{,}000-20{,}000}\cdot\frac{20{,}000+24{,}000}{50+56} = \frac{6}{4{,}000}\cdot\frac{44{,}000}{106} \approx 0.62.
$$

The good is normal and, on this range, a necessity in the elasticity sense.

Cross-price signs are the quantitative version of the substitute/complement language of the previous chapter. Tea and coffee typically have $\varepsilon_{ij} > 0$; cars and petrol typically have $\varepsilon_{ij} < 0$. The sign can depend on the time horizon and on the group of buyers.

## Elasticity of supply and tax incidence

The **price elasticity of supply** is $\varepsilon^s = (\mathrm{d}Q^s/\mathrm{d}P)(P/Q^s) > 0$ when the supply curve slopes up. It is small when firms cannot adjust (very short run, fixed capacity) and larger when they can plant more, hire more, or enter. Marshall’s long-run supply of a constant-cost industry is perfectly elastic: $\varepsilon^s = \infty$ at the long-run price.

A specific tax of $t$ per unit, levied on sellers, shifts inverse supply up by $t$. The split of the tax between the price buyers pay and the price sellers receive — **tax incidence** — depends on the two elasticities.

::: proposition Incidence formula {#prop-incidence}
Let demand and supply be locally linear with elasticities $\varepsilon^d < 0$ and $\varepsilon^s > 0$ at the pre-tax equilibrium. For a small specific tax $t$, the increase in the price buyers pay is

$$
\frac{\mathrm{d}P_b}{\mathrm{d}t} = \frac{\varepsilon^s}{\varepsilon^s - \varepsilon^d} \in (0,1),
$$ {#eq-incidence}

and the fall in the price sellers receive is $\mathrm{d}P_s/\mathrm{d}t = \mathrm{d}P_b/\mathrm{d}t - 1$. The side of the market with the *less elastic* curve (smaller $\lvert\varepsilon\rvert$) bears more of the tax.
:::

::: proof
Differentiate the equilibrium conditions $Q^d(P_b) = Q^s(P_s)$ and $P_b = P_s + t$ at $t = 0$. Then $\frac{\mathrm{d}Q^d}{\mathrm{d}P} \mathrm{d}P_b = \frac{\mathrm{d}Q^s}{\mathrm{d}P}\mathrm{d}P_s$ and $\mathrm{d}P_b = \mathrm{d}P_s + \mathrm{d}t$. Substitute $\mathrm{d}Q/\mathrm{d}P = \varepsilon\, Q/P$ (the same $Q$ and $P$ at $t = 0$) to obtain $\varepsilon^d\,\mathrm{d}P_b = \varepsilon^s(\mathrm{d}P_b - \mathrm{d}t)$. Rearrange: $\mathrm{d}P_b(\varepsilon^s - \varepsilon^d) = \varepsilon^s\,\mathrm{d}t$, which is [[#eq-incidence]]. If $\lvert\varepsilon^d\rvert$ is large, $\mathrm{d}P_b/\mathrm{d}t$ is small: buyers escape the tax by cutting quantity, and sellers receive a lower net price. If $\varepsilon^s$ is large, $\mathrm{d}P_b/\mathrm{d}t$ is close to 1: sellers escape, and buyers pay almost the whole tax.
:::

The formula is local and linear; [[principles/markets-and-welfare]] computes the exact split for linear curves and a finite tax, and shows that the lost surplus (deadweight loss) is larger the more elastic are demand and supply.

::: example Sharing a small tax {#ex-incidence}
At the current equilibrium, $\varepsilon^d = -2$ and $\varepsilon^s = 1$. A small tax of 6 units is levied on sellers. Approximately how much does the buyer price rise, and how much does the seller price fall?
::: solution
$\mathrm{d}P_b/\mathrm{d}t = 1/(1 - (-2)) = 1/3$. The buyer price rises by about $6/3 = 2$; the seller price falls by about $4$. Buyers bear one third of the tax, sellers two thirds, matching the fact that demand is more elastic than supply ($\lvert\varepsilon^d\rvert = 2 > 1 = \varepsilon^s$).
:::
:::

## Evidence

Estimated price elasticities of demand vary by good, place, date and horizon; they are not constants of nature. A few well-cited ranges, each from a survey or a canonical study, give a sense of scale.

- **Food as a whole** is typically price-inelastic in high-income countries, with $\lvert\varepsilon\rvert$ often between 0.2 and 0.6; staple grains in low-income countries can be more inelastic still, while particular meats and produce are more elastic (see the estimates compiled by Muhammad, Seale, Meade and Regmi, USDA Economic Research Service, 2011).
- **Petrol (gasoline).** Short-run price elasticities around $-0.2$ to $-0.3$ and long-run elasticities around $-0.6$ to $-0.8$ are common in surveys of high-income countries (Havranek, Irsova and Janda, 2012, *Energy Economics*, a meta-analysis). Drivers can take fewer trips in a week; they can buy a more efficient vehicle only over years.
- **Cigarettes.** A widely used range for adult price elasticity is about $-0.3$ to $-0.5$ in high-income countries, with larger (more elastic) estimates for young buyers (International Agency for Research on Cancer, *IARC Handbooks of Cancer Prevention*, vol. 14, 2011). Inelastic demand is one reason specific taxes on tobacco raise revenue as well as reducing quantity.
- **Giffen behaviour.** Jensen and Miller (2008, *American Economic Review*) found Giffen-like behaviour for rice among the poorest urban households in a Hunan experiment: a subsidy that lowered the rice price led those households to *reduce* rice consumption, consistent with a strong income effect on a staple. The finding is famous because it is rare; it does not overturn the law of demand for most goods at most incomes.

Income elasticities of food typically fall as income rises (Engel’s law): the budget share of food declines with income, which is consistent with $\eta < 1$ for food as a whole. Cross-country demand systems estimated on World Bank and national accounts data recover that pattern repeatedly.

Every elasticity in this list is an estimate, with a sample, a horizon and a standard error. Using “the” elasticity of petrol as if it were a physical constant is a mistake; using a published range, with the horizon named, is what the next calculation needs.

::: history
**1890, Alfred Marshall.** Marshall introduced the term “elasticity of demand” in the *Principles of Economics* (Book III, chapter IV) and defined it as the ratio of a relative change in quantity to a relative change in price. He already distinguished the elasticity at a point from the slope of the curve, and he noted that elasticity is typically greater the longer the period allowed for adjustment. The midpoint formula and the income and cross-price elasticities are later standardisations of the same idea.
:::

## Where this leads

[[principles/markets-and-welfare]] uses elasticities to split a tax and to size a deadweight-loss triangle. [[principles/market-power]] uses [[#prop-revenue]] from the other side: a firm with a downward-sloping demand curve never chooses a price in the inelastic region, because raising the price would raise revenue and cut costs. [[microeconomics]] derives elasticities from utility maximisation (the Slutsky equation), which is why income and substitution effects belong in the same formula. Empirical elasticities are estimated, with identification, in [[econometrics]].

::: summary
- The price elasticity of demand is the percentage change in quantity demanded for a 1 per cent change in price; it is unit-free and varies along a linear curve.
- Demand is elastic, inelastic or unit-elastic as $\lvert\varepsilon\rvert$ is greater than, less than, or equal to 1. Close substitutes, time to adjust and a large budget share make demand more elastic.
- When demand is elastic, a price rise cuts revenue; when it is inelastic, a price rise raises revenue. Revenue along a linear demand curve peaks at the unit-elastic midpoint.
- Income elasticity distinguishes normal from inferior goods; cross-price elasticity distinguishes substitutes from complements.
- The less elastic side of a market bears more of a tax. Short-run and long-run elasticities differ, and published estimates always come with a horizon.
:::

## Exercises

::: exercise An arc elasticity {level=1 check="-1.5"}
Price falls from 10 to 8 and quantity demanded rises from 40 to 56. Compute the midpoint elasticity. (Enter the elasticity, including the minus sign, to one decimal place.)
::: solution
$$
\varepsilon_{\mathrm{arc}} = \frac{56-40}{8-10}\cdot\frac{10+8}{40+56} = \frac{16}{-2}\cdot\frac{18}{96} = -8\cdot\frac{3}{16} = -1.5.
$$
Demand is elastic over the range. (Enter $-1.5$.)
:::
:::

::: exercise Point elasticity {level=1}
Demand is $Q = 80 - 2P$. Compute $\varepsilon$ at $P = 10$ and at $P = 30$. Classify each point as elastic or inelastic.
::: solution
$Q(10) = 60$, $\varepsilon = -2\times 10/60 = -1/3$, inelastic. $Q(30) = 20$, $\varepsilon = -2\times 30/20 = -3$, elastic. The midpoint is $P = 20$, $Q = 40$, where $\varepsilon = -1$.
:::
:::

::: exercise Revenue {level=1}
Along $Q = 80 - 2P$, compute revenue at $P = 10$, $P = 20$ and $P = 30$. Which price maximises revenue, and why?
::: solution
$R(10) = 10\times 60 = 600$, $R(20) = 20\times 40 = 800$, $R(30) = 30\times 20 = 600$. Revenue is maximised at $P = 20$, the unit-elastic midpoint, as [[#prop-revenue]] requires.
:::
:::

::: exercise Income elasticity {level=2}
Income rises from 12{,}000 to 18{,}000 and quantity demanded of a good rises from 24 to 30. Compute the midpoint income elasticity and classify the good.
::: solution
$$
\eta = \frac{30-24}{18{,}000-12{,}000}\cdot\frac{12{,}000+18{,}000}{24+30} = \frac{6}{6{,}000}\cdot\frac{30{,}000}{54} = \frac{30{,}000}{54{,}000} = \frac{5}{9} \approx 0.56.
$$
The good is normal and, on this range, a necessity in the elasticity sense ($0 < \eta < 1$).
:::
:::

::: exercise Cross-price sign {level=2}
When the price of good $j$ rises from 4 to 6, quantity demanded of good $i$ falls from 50 to 44. Compute the midpoint cross-price elasticity. Are the goods substitutes or complements?
::: solution
$$
\varepsilon_{ij} = \frac{44-50}{6-4}\cdot\frac{4+6}{50+44} = \frac{-6}{2}\cdot\frac{10}{94} = -3\cdot\frac{5}{47} = -\frac{15}{47} \approx -0.32.
$$
The cross-price elasticity is negative, so the goods are complements.
:::
:::

::: exercise Incidence numbers {level=2 check="4"}
At the current equilibrium $\varepsilon^d = -1$ and $\varepsilon^s = 1$. A small tax of 8 units is levied on sellers. By approximately how much does the price sellers receive fall? (Enter that fall as a positive number.)
::: solution
$\mathrm{d}P_b/\mathrm{d}t = 1/(1-(-1)) = 1/2$. The buyer price rises by about $8\times 1/2 = 4$. The seller price falls by about $8-4 = 4$. The two sides share the tax equally because $\lvert\varepsilon^d\rvert = \varepsilon^s$. (Enter 4.)
:::
:::

::: exercise A perfectly inelastic side {level=3}
Demand is $Q^d = 40$ (perfectly inelastic) and supply is $Q^s = 2P - 12$. (a) Find the equilibrium without a tax. (b) A tax of 6 is levied on sellers, so inverse supply becomes $P = 12 + Q/2$. Find the new buyer price, seller price and quantity. (c) Who bears the tax, and why does [[#prop-incidence]] predict that?
::: hint
Perfectly inelastic demand means $\varepsilon^d = 0$. Quantity cannot fall.
:::
::: solution
(a) $40 = 2P - 12$ gives $P = 26$, $Q = 40$. (b) Inverse demand is the vertical line $Q = 40$. New inverse supply $P = 12 + Q/2$ at $Q = 40$ gives $P_b = 12 + 20 = 32$. Then $P_s = 32 - 6 = 26$. Quantity is still 40. (c) Buyers pay 32 instead of 26, a rise of 6; sellers still receive 26. Buyers bear the whole tax. [[#prop-incidence]] gives $\mathrm{d}P_b/\mathrm{d}t = \varepsilon^s/(\varepsilon^s - 0) = 1$: when demand is perfectly inelastic, the buyer-price share is 1.
:::
:::

::: exercise Linear demand and the forbidden region {level=3}
A firm faces $Q = 120 - 4P$ and has a positive marginal cost. Show that any price at which $\lvert\varepsilon\rvert < 1$ cannot maximise profit, using [[#prop-revenue]] and the fact that a lower quantity reduces total cost.
::: hint
In the inelastic region, raising the price raises revenue and reduces output.
:::
::: solution
On this curve $\lvert\varepsilon\rvert < 1$ when $P < 15$. Suppose the firm charged such a $P$. Raising the price a little would raise revenue, by [[#prop-revenue]], and would cut quantity, which cannot raise total cost when marginal cost is positive. Profit, revenue minus cost, would therefore rise. A profit-maximising firm with this demand and positive MC must choose $P \ge 15$, the elastic region (including the unit-elastic point only if MC is zero). This is why monopoly in [[principles/market-power]] is never observed, in the model, on the inelastic part of demand.
:::
:::
