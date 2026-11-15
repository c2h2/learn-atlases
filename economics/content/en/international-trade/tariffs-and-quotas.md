A tariff is a tax on imports. A quota is a quantity limit. An export subsidy is a payment on shipments abroad. These are the instruments whose welfare effects every later argument about protection, industrial policy or a trade war must pass through. This chapter computes those effects in partial equilibrium for a small country and a large one, compares tariffs with quotas and voluntary export restraints, and records the general-equilibrium links to Stolper–Samuelson and to the terms of trade. The diagrams are Marshallian: quantity on the horizontal axis, price on the vertical, inverse demand and supply as functions of quantity. The conclusions are standard, and they are not a recommendation. Whether a government *should* impose a tariff is a question of value judgements, of the political economy of the next chapter, and of the agreements of the last; this chapter says what the instrument *does*.

Two results will sit next to each other and should not be collapsed. For a **small country**, which cannot affect world prices, a tariff, a quota and an export subsidy each reduce national real income, with a deadweight-loss triangle that the figures will make visible. For a **large country**, which can, a tariff can improve the terms of trade enough to raise national income — the **optimal tariff** — while still redistributing from consumers to producers and still imposing a deadweight loss on the world. That possibility is the economic logic of trade wars, and of the GATT's attempt to contain them. It is a possibility, not a finding that any particular tariff in any particular year was optimal.

## Partial equilibrium: a small country

Home is small: the world price $p_w$ of the imported good is given. Inverse demand is $p = a - b q$ and inverse supply is $p = c + d q$, with $a > p_w > c$. Free-trade imports are the gap between quantity demanded and quantity supplied at $p_w$. A specific tariff $t$ raises the domestic price to $p_d = p_w + t$.

::: definition Small-country tariff {#def-small-tariff}
A country is **small** in a good if its import demand does not affect the world price $p_w$. A **specific tariff** $t$ then raises the domestic price to $p_w + t$. **Consumer surplus** is the area under inverse demand and above the price paid; **producer surplus** is the area above inverse supply and below the price received; **government revenue** is $t$ times the remaining import volume. The **deadweight loss** (DWL) is the sum of two triangles: a production-efficiency loss (too much domestic output) and a consumption-efficiency loss (too little consumption).
:::

::: proposition Small-country tariff welfare {#prop-small-tariff}
Assume a competitive small-country market, no other distortions, and a specific tariff $t > 0$ on an imported good. Then, relative to free trade:

1. Domestic price rises by $t$; domestic output rises; domestic consumption falls; imports fall.
2. Consumer surplus falls by more than the sum of the producer-surplus gain and government revenue.
3. The net national-income loss equals the DWL triangles and is of second order in $t$ (approximately $\tfrac12 (m_1 + m_2) t^2$, where $m_1$ and $m_2$ are the slopes of supply and demand in quantity-per-price units).

Assumptions: perfect competition, a given $p_w$, no retorsion, no domestic externality or infant-industry dynamic, lump-sum rebate of revenue.
:::

::: proof
The domestic price must be $p_w + t$, else arbitrage into or out of the world market would continue. Output and consumption then move along supply and demand. The loss of consumer surplus is a trapezoid that decomposes into a rectangle transferred to producers (higher price on still-produced units), a rectangle transferred to the government (the tariff on remaining imports), and two triangles that go to no one. Those triangles are the DWL. Differentiating national income $CS+PS+R$ with respect to $t$ at $t=0$ gives zero (the first-order envelope); the second derivative is negative, hence the quadratic approximation.
:::

::: example A numerical tariff {#ex-tariff}
Inverse demand is $p = 12 - 0.8 q$ and inverse supply is $p = 2 + 0.4 q$. The world price is $p_w = 4$. A specific tariff $t = 1$ is imposed. Compute free-trade and tariff quantities, the changes in consumer surplus, producer surplus and revenue, and the DWL.
::: solution
Free trade: quantity demanded $q_d = (12-4)/0.8 = 10$, quantity supplied $q_s = (4-2)/0.4 = 5$, imports $= 5$.

With $t=1$, $p_d = 5$: $q_d = (12-5)/0.8 = 8.75$, $q_s = (5-2)/0.4 = 7.5$, imports $= 1.25$.

Consumer surplus at a price $p$ is $\int_0^{q_d(p)} \bigl((12-0.8q) - p\bigr)\, dq$. At $p_w=4$: $\int_0^{10}(8-0.8q)\,dq = 80-40 = 40$. At $p_d=5$: $\int_0^{8.75}(7-0.8q)\,dq = 61.25 - 30.625 = 30.625$. $\Delta CS = -9.375$.

Producer surplus: at $p=4$, $\int_0^{5}(4-(2+0.4q))\,dq = \int_0^{5}(2-0.4q)\,dq = 10-5 = 5$. At $p=5$: $\int_0^{7.5}(3-0.4q)\,dq = 22.5-11.25 = 11.25$. $\Delta PS = +6.25$.

Revenue $= 1 \times 1.25 = 1.25$.

Net: $\Delta CS+\Delta PS+R = -9.375+6.25+1.25 = -1.875$.

Production triangle: $\tfrac12 \times (7.5-5) \times 1 = 1.25$. Consumption triangle: $\tfrac12 \times (10-8.75) \times 1 = 0.625$. Sum $= 1.875$.
:::
:::

::: widget plot
f: 12-0.8*x; 2+0.4*x
x: 0, 16
y: 0, 13
hlines: 4; 5
labels: \text{demand}; \text{supply}
caption: Inverse demand $p=12-0.8q$ and inverse supply $p=2+0.4q$. The lower horizontal line is the free-trade world price $p_w=4$; the upper is the tariff-inclusive domestic price $5$. Read off $q_s$ and $q_d$ at each price. The gap between the two quantities is imports; the tariff shrinks that gap from $5$ to $1.25$, as in [[#ex-tariff]].
:::

::: widget riemann
f: 8-0.8*x
a: 0
b: 10
n: 8
method: mid
x: 0, 11
y: 0, 9
caption: Free-trade consumer surplus is $\int_0^{10}(8-0.8x)\,dx = 40$, the area under residual demand $p(q)-p_w$. Raise $n$ to see the integral settle on 40. With a tariff the corresponding integral runs only to $8.75$ at a higher price and is $30.625$; the missing $9.375$ is the consumer loss in [[#ex-tariff]].
:::

::: widget riemann
f: 0.4*x-2
a: 5
b: 7.5
n: 6
method: mid
x: 4.5, 8
y: 0, 1.5
caption: The production DWL triangle: domestic supply sits above $p_w$ from $q=5$ to $q=7.5$. The integrand is $p_s(q)-p_w = 0.4q-2$; the area is $1.25$. The consumption triangle (not drawn here) is $0.625$. Together they are the $1.875$ national loss.
:::

::: warning Who is small is a property of the market, not of the country
The United States is large in aircraft and in soybeans; it is closer to small in a narrowly defined variety of apparel. New Zealand is small in cars and large in dairy. A tariff's terms-of-trade effect, below, exists only in the markets where the country is large. Applying the small-country DWL formula to a large country's tariff *understates* the national gain (or overstates the loss) and *understates* the foreign loss. Applying the optimal-tariff formula to a small country's tariff invents a terms-of-trade gain that is not there.
:::

## Quotas, VERs and export subsidies

A **quota** that restricts imports to the tariff-ridden volume $M'$ produces the same domestic price, output and consumption as the tariff, *if* the market is competitive. The difference is who receives the rectangle that was tariff revenue. If quota licences are auctioned, or if they are held by domestic importers, the rectangle stays at home and the quota is equivalent to the tariff. If the licences are given to foreign exporters — a **voluntary export restraint** (VER) — the rectangle is a transfer abroad, and the national loss is the DWL *plus* the rectangle.

::: proposition Tariff–quota equivalence and VERs {#prop-quota}
Assume a competitive small-country market and a quota set at the import volume that a tariff $t$ would produce. Then domestic price, quantities and DWL match the tariff, and:

1. if quota rents accrue at home, national welfare matches the tariff;
2. if rents accrue abroad (a VER), national welfare is worse than the tariff by the amount of the rent rectangle.

Equivalence **fails** under monopoly (Bhagwati 1965: a quota can create market power for a domestic monopolist that a tariff does not) and under rent-seeking for the licences (Krueger 1974).
:::

::: proof
Competitive arbitrage pushes the domestic price to the level at which import demand equals the quota. That is the same $p_d$ as under the equivalent tariff, hence the same $q_s$, $q_d$ and triangles. The rectangle $(p_d-p_w) M'$ is revenue under a tariff, domestic rent under a home-allocated quota, and a foreign transfer under a VER. A domestic monopolist facing a tariff still competes with an elastic residual import supply at $p_w+t$; facing a quota, residual demand is the domestic demand curve minus a constant, so the monopolist has more power and the welfare ranking can reverse.
:::

An **export subsidy** $s$ on a small country's export good *lowers* the domestic price of that good (producers receive $p_w+s$ from exporting, so they will not sell at home for less) if the good is also consumed at home, or, more transparently in the usual diagram, it raises the price producers receive above $p_w$ and draws extra output into export. Consumers lose, producers gain by more, the treasury pays $s$ times the export volume, and the net is a DWL. For a large country the subsidy *worsens* the terms of trade (the world price of the export is driven down), so the national loss is larger. The large-country export subsidy is, on these assumptions, a beggar-thy-neighbour policy that beggars oneself more — which is why the WTO Agreement on Subsidies disciplines export subsidies more tightly than import tariffs.

::: example Quota rents {#ex-quota}
In [[#ex-tariff]], replace the tariff $t=1$ by a quota of $1.25$ units, the tariff-ridden import volume. Compute national welfare relative to free trade if (i) licences are auctioned at home and (ii) the quota is implemented as a VER.
::: solution
Quantities and DWL triangles are the same: DWL $= 1.875$. The rectangle is $1 \times 1.25 = 1.25$.

(i) Auctioned quota: the rectangle stays at home, net loss $= 1.875$, as with the tariff.

(ii) VER: the rectangle goes abroad, net loss $= 1.875 + 1.25 = 3.125$. The VER is strictly worse for Home, better for Foreign exporters, and still worse for world efficiency than free trade.
:::
:::

::: quiz
A small country replaces a tariff with a VER that holds imports at the same volume. National welfare
- [ ] is unchanged, by tariff–quota equivalence
- [x] falls, because the rent rectangle is transferred abroad
- [ ] rises, because there is no government revenue to waste
- [ ] is unchanged for Home but higher for the world
::: solution
[[#prop-quota]]: equivalence requires that rents stay at home. A VER sends them abroad. World efficiency is still worse than free trade (the triangles are still there); Foreign exporters now *receive* the rectangle, so Foreign may gain even as Home and the world lose.
:::
:::

## Large countries and the optimal tariff

If Home's import demand is a non-negligible share of the world market, a tariff that cuts Home's imports *lowers* $p_w$. Domestic consumers then face $p_d = p_w(t) + t$, which rises by *less* than $t$. Part of the tariff is paid by foreign exporters. National welfare can rise.

::: theorem Optimal tariff {#thm-opt-tariff}
Assume a large country, competitive markets, no other distortions, and a foreign export-supply elasticity $\varepsilon^* > 0$. The tariff that maximises national welfare is

$$
t^* = \frac{1}{\varepsilon^*},
$$ {#eq-opt-t}

as a proportion of the post-tariff world price (or $t^*/(1+t^*) = 1/\varepsilon^*$ depending on the exact elasticity definition; the inverse-elasticity form is the content). The formula is the monopoly mark-up of a single buyer of the import. Assumptions: no foreign retaliation, lump-sum rebate, no domestic externality. The world as a whole still loses: Home's terms-of-trade gain is Foreign's terms-of-trade loss, and the DWL triangles remain.
:::

::: proof
National welfare as a function of $t$ includes consumer surplus, producer surplus, revenue, *and* the terms-of-trade gain on inframarginal imports. Differentiating and setting the derivative to zero, the marginal DWL on a further cut in imports is set equal to the marginal terms-of-trade gain $M \cdot \mathrm{d}p_w$. The latter is $M / (\mathrm{d}M/\mathrm{d}p_w)$ times $\mathrm{d}M$, which is $p_w / \varepsilon^*$ per unit, hence $t^* = 1/\varepsilon^*$. Retaliation would add Foreign's tariff as a further term and typically shrink or reverse the national gain (Johnson 1953–54; the Nash tariff war).
:::

The formula is the same inverse-elasticity mark-up as a monopolist's, because a large country's tariff *is* an exercise of monopsony power in the world market. Broda, Limão and Weinstein (2008) estimate that, where WTO bindings are absent, tariffs are higher on goods with lower foreign export-supply elasticities, a pattern consistent with terms-of-trade motives. Ossa (2014) and related quantitative work find that a global tariff war, with retaliation, would be costly relative to WTO-bound rates, even though a unilateral optimal tariff for a large country is positive. The next two chapters return to that prisoner's dilemma.

::: example Inverse elasticity {#ex-opt-t}
Foreign export supply to Home has elasticity $\varepsilon^* = 4$ at the relevant point. What is the optimal ad valorem tariff on the inverse-elasticity rule [[#eq-opt-t]]? If instead $\varepsilon^* = 1$, what happens to $t^*$, and why is that case economically extreme?
::: solution
$t^* = 1/4 = 0.25$, a 25 per cent tariff. If $\varepsilon^* = 1$, $t^* = 1$, a 100 per cent tariff. An elasticity of 1 means that a 1 per cent fall in $p_w$ cuts foreign export supply by only 1 per cent — a very inelastic foreign supply, which gives Home a great deal of monopsony power. Estimates of export-supply elasticities in Broda, Limão and Weinstein (2008) vary widely across goods and are not clustered at 1. The formula is a benchmark, not a recommended schedule.
:::
:::

## Effective protection and general equilibrium

A tariff on a *finished* good protects the domestic value added in that good by more than the nominal rate if inputs are imported duty-free, and by less if inputs are also tariffed.

::: definition Effective rate of protection {#def-erp}
Let $t_f$ be the ad valorem tariff on a finished good, $t_i$ the tariff on an imported input, and $a$ the share of the input in the free-trade price of the finished good. The **effective rate of protection** on domestic value added is

$$
\mathrm{ERP} = \frac{t_f - a t_i}{1-a}.
$$ {#eq-erp}

If $t_i = 0$, $\mathrm{ERP} = t_f/(1-a) > t_f$: nominal protection understates the protection of value added. If $t_i > t_f/a$, ERP can be negative: input tariffs *tax* the using industry.
:::

Cascading tariff structures — higher rates on finished goods than on inputs — have been common, including in several East Asian and Latin American industrialisations. They raise ERP on assembly and lower it (sometimes below zero) on the input-producing stages. In a GVC world the same arithmetic is why a tariff on a gadget assembled in Vietnam, as in [[international-trade/firms-in-trade#ex-tiva]], hits imported parts as well as local value added.

In general equilibrium a tariff on Home's imported good raises that good's domestic relative price (small country) and therefore, by Stolper–Samuelson, raises the real return to the factor used intensively in import-competing production and lowers the real return to the other factor. The scarce factor's demand for protection, in [[international-trade/heckscher-ohlin]], passes through this chapter's price wedge. The **Metzler paradox** (Metzler 1949) is the possibility that a large country's tariff improves the terms of trade so much that the *domestic* relative price of the import good *falls*; it requires a very inelastic foreign offer curve and is a theoretical curiosity more than a typical case.

::: example Effective protection, worked {#ex-erp}
A finished shirt has a free-trade price of 100, of which 40 is an imported fabric. The tariff on shirts is 20 per cent; the tariff on fabric is 5 per cent. Compute the ERP on domestic value added. What happens to the ERP if the fabric tariff is raised to 25 per cent with the shirt tariff unchanged?
::: solution
Here $t_f = 0.20$, $t_i = 0.05$, $a = 0.40$. [[#eq-erp]] gives $\mathrm{ERP} = (0.20 - 0.40\times 0.05)/0.60 = 0.18/0.60 = 0.30$, or 30 per cent: nominal 20 per cent understates the protection of the 60 of value added.

If $t_i = 0.25$, $\mathrm{ERP} = (0.20 - 0.40\times 0.25)/0.60 = (0.20-0.10)/0.60 \approx 0.167$. The fabric tariff eats part of the shirt tariff. If $t_i$ rose far enough that $a t_i > t_f$, ERP would be negative and the shirt industry would be taxed on its value added.
:::
:::

::: application India's 1991 tariff cuts and Brazil's
India's 1991 liberalisation and Brazil's early-1990s cuts reduced average applied tariffs from levels often above 50 per cent toward the teens and below, with remaining peaks in some agricultural and consumer goods (WTO Tariff Profiles, various years; national notifications). The partial-equilibrium diagrams of this chapter say: consumer surplus up, import-competing producer surplus down, DWL down, and a terms-of-trade effect that for a large developing country is not zero but is not the whole story. Topalova (2010) and Dix-Carneiro and Kovak (2017), cited in [[international-trade/specific-factors]], study the *local* labour-market side of those cuts. The diagrams and the labour-market studies are two measurements of the same relative-price change. They do not contradict; they answer different questions (national surplus in a competitive PE diagram; regional earnings with immobile factors).
:::

::: history
**1846, repeal of the Corn Laws** in Britain is the classic small-country (or large-but-unilateral) move toward free trade in grain. **1870s–1930s**, tariff-revenue and infant-industry arguments dominate in the United States, Germany, Russia and Japan; the Smoot–Hawley Tariff Act of 1930 is the emblematic large-country escalation. **1953–54, Harry G. Johnson** analyses the optimum tariff and tariff wars. **1965, Jagdish Bhagwati** shows that a quota and a tariff are not equivalent under monopoly. **1974, Anne Krueger**, the rent-seeking cost of licences. The GATT (1947) and the WTO (1995) are the institutional response to the large-country prisoner's dilemma; they are the last chapter.
:::

## Where this leads

The instruments are now on the table. Why they are used, despite the small-country DWL and despite the availability of more efficient redistributive tools, is [[international-trade/political-economy-of-trade]]: concentrated producer gains, diffuse consumer losses, infant-industry and strategic-trade arguments, and the terms-of-trade motive itself. How countries commit not to use them against each other is [[international-trade/trade-agreements]]. A Melitz world adds cutoff effects to the triangles; a GVC world adds the incidence warning of [[#def-erp]] and of trade in value added. The small-country DWL remains the right starting point whenever the terms-of-trade effect is second-order.

::: summary
- A small-country tariff raises the domestic price by the full amount of the tariff, transfers surplus from consumers to producers and the government, and destroys two DWL triangles ([[#def-small-tariff]], [[#prop-small-tariff]]).
- A quota equivalent in volume matches the tariff if rents stay at home, and is worse if they go abroad as a VER ([[#prop-quota]]). Equivalence fails under monopoly and rent-seeking.
- A large-country tariff can raise national welfare through the terms of trade; the optimal tariff is the inverse of the foreign export-supply elasticity ([[#thm-opt-tariff]]). The world still loses; retaliation can reverse the national gain.
- An export subsidy creates DWL and, if the country is large, a terms-of-trade *loss*.
- Effective protection of value added can exceed or fall short of the nominal tariff ([[#def-erp]]). In general equilibrium the tariff's relative-price change is the input to Stolper–Samuelson.
:::

## Exercises

::: exercise Free-trade imports {level=1 check="5"}
In [[#ex-tariff]], world price $p_w=4$, demand $p=12-0.8q$, supply $p=2+0.4q$. What is free-trade import volume?
::: solution
$q_d=10$, $q_s=5$, imports $=5$.
:::
:::

::: exercise Tariff-ridden imports {level=1 check="1.25"}
With $t=1$ in the same example, what is the remaining import volume?
::: solution
$p_d=5$, $q_d=8.75$, $q_s=7.5$, imports $=1.25$.
:::
:::

::: exercise Production DWL {level=1 check="1.25"}
In [[#ex-tariff]], compute the production-efficiency triangle.
::: solution
$\tfrac12 \times (7.5-5) \times 1 = 1.25$.
:::
:::

::: exercise A VER versus a tariff {level=2 check="3.125"}
Using [[#ex-quota]], what is the small country's national loss relative to free trade under a VER of $1.25$ units? (The tariff's DWL is $1.875$ and the rent rectangle is $1.25$.)
::: solution
$1.875+1.25=3.125$.
:::
:::

::: exercise Optimal tariff {level=2 check="0.2"}
Foreign export-supply elasticity $\varepsilon^*=5$. What is $t^*$ on the rule $t^*=1/\varepsilon^*$?
::: solution
$1/5=0.2$.
:::
:::

::: exercise Effective protection {level=2 check="0.3"}
A finished good has $t_f=0.20$, the imported input has $t_i=0.05$, and $a=0.4$. Compute the ERP in [[#eq-erp]].
::: solution
$(0.20-0.4\times 0.05)/(1-0.4)=(0.20-0.02)/0.6=0.18/0.6=0.3$.
:::
:::

::: exercise Negative ERP {level=3}
Suppose $t_f=0.10$, $t_i=0.20$ and $a=0.6$. Compute the ERP and interpret it: is the using industry being protected or taxed?
::: hint
Plug into [[#eq-erp]]. A negative ERP is a tax on value added.
:::
::: solution
$(0.10-0.6\times 0.20)/(1-0.6)=(0.10-0.12)/0.4=-0.05$. Effective protection is $-5$ per cent: input tariffs more than eat the output tariff, and the using industry is taxed on its value added. Cascading structures that protect assembly can, if inverted, protect the input and tax the assembler.
:::
:::

::: exercise Why the first-order loss is zero {level=3}
At $t=0$, a small additional tariff has a first-order-zero effect on national welfare in the small-country model. Explain using the envelope idea in the proof of [[#prop-small-tariff]], and why the loss is then approximately quadratic in $t$.
::: solution
At free trade, the last unit imported is worth exactly $p_w$ to consumers and costs exactly $p_w$ to buy; the last unit of domestic output costs exactly $p_w$ to produce. A small wedge creates a transfer (first-order) and an efficiency loss only on the *induced* change in quantities (second-order). Hence $dW/dt$ at $0$ is zero and $W(t) \approx W(0) - \tfrac12 \kappa t^2$. Large tariffs are not "small wedges"; the quadratic approximation is local.
:::
:::

::: exercise Large versus small {level=2}
Country A accounts for 30 per cent of world imports of cocoa; country B accounts for 0.2 per cent. Both contemplate a 10 per cent tariff. Which country's tariff is more likely to generate a terms-of-trade gain, and which formula — small-country DWL or [[#eq-opt-t]] — is the right *starting* point for each? What further fact would you need before concluding that A's tariff raises A's welfare?
::: solution
A is large in cocoa; B is small. Start with [[#thm-opt-tariff]] for A and [[#prop-small-tariff]] for B. For A's welfare to rise one still needs: the tariff not already above $t^*$, no (or weak) retaliation, and no domestic distortion that the tariff worsens. A 10 per cent tariff is optimal only if $\varepsilon^* \approx 10$; otherwise it may be too high. The formula is a starting point, not a conclusion about any particular cocoa tariff.
:::
:::

::: exercise Export subsidy, large country {level=3}
A large country subsidises an export. Using the terms-of-trade logic of [[#thm-opt-tariff]] *in reverse*, explain why the subsidy is a national loss even before DWL triangles, and name the WTO agreement that disciplines export subsidies. Why might a government still use one?
::: solution
The subsidy expands export supply, *lowers* $p_w$ of the export, and worsens the terms of trade: Home now receives less per inframarginal unit shipped. That ToT loss is a first-order national cost, on top of the usual triangles. The WTO Agreement on Subsidies and Countervailing Measures prohibits (with listed exceptions) export subsidies for non-agricultural goods and disciplines agricultural ones. Governments still use subsidies because producers gain ([[#prop-small-tariff]]'s producer-surplus logic), because of infant-industry or strategic-trade arguments (next chapter), or because the ToT loss is not internalised politically. The positive explanation is not a welfare ranking.
:::
:::
