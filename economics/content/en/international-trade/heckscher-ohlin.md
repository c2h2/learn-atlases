Ricardo's countries differed in *technology*. The specific-factors model added immobile capital and land, but it still took comparative advantage as given. The Heckscher–Ohlin model asks a prior question: if two countries have access to the *same* techniques, why would they specialise at all? Eli Heckscher's 1919 answer, developed by Bertil Ohlin in 1933 and given its modern theorems by Samuelson, Rybczynski, Vanek and Jones, is that they differ in *endowments*. A country with a lot of labour relative to capital will produce, and export, goods that use labour intensively. Trade in goods becomes a substitute for trade in factors. Under conditions that this chapter will state, it can even equalise wages and rentals without anyone moving.

The model is the long-run counterpart of [[international-trade/specific-factors]]: both factors are mobile between sectors, so distributional effects attach to *factor type* — labour versus capital, or skilled versus unskilled labour — rather than to the industry a factor happens to be employed in this year. That is why Stolper–Samuelson, not Jones's specific-factor ranking, is the theorem that labour economists reach for when they discuss trade and inequality. It is also a theorem with a mixed empirical record, and the chapter will say so.

## The 2 × 2 × 2 model

Two countries, Home and Foreign; two goods, cloth $C$ and food $F$; two factors, labour $L$ and capital $K$, both mobile between sectors and immobile between countries. Technologies are identical, constant-returns, and have no factor-intensity reversal: cloth is labour-intensive at every wage–rental ratio.

::: definition Heckscher–Ohlin economy {#def-ho}
A **Heckscher–Ohlin (HO) economy** has identical technologies across countries, identical homothetic preferences, competitive markets, and two factors that are mobile between sectors. Good $C$ is **labour-intensive** if, at any common factor prices, its cost-minimising capital–labour ratio is below that of good $F$:

$$
\frac{a_{KC}(w,r)}{a_{LC}(w,r)} < \frac{a_{KF}(w,r)}{a_{LF}(w,r)}.
$$

Home is **labour-abundant** relative to Foreign if $L/K > L^*/K^*$. Unit factor requirements $a_{ij}$ may depend on $(w,r)$ (substitution) or be fixed (Leontief). The **diversification cone** is the range of endowment ratios $K/L$ between the two goods' factor intensities, inside which a country produces both goods.
:::

A worked example with fixed coefficients will carry the theorems. Cloth requires 2 labour and 1 capital per unit; food requires 1 labour and 2 capital per unit. Cloth is labour-intensive ($K/L = 1/2$ versus $2$). Home has $(L, K) = (100, 80)$, so $K/L = 0.8$; Foreign has $(80, 100)$, so $K/L = 1.25$. Both ratios lie between $1/2$ and $2$, so both countries are inside the cone.

Full employment at Home is the linear system

$$
2 Q_C + Q_F = 100, \qquad Q_C + 2 Q_F = 80,
$$ {#eq-full-emp}

which solves at $(Q_C, Q_F) = (40, 20)$. Foreign solves at $(20, 40)$. Labour-abundant Home produces a bundle skewed toward labour-intensive cloth *before any trade is mentioned*. That is already Rybczynski's geometry, and it is the production side of the HO theorem.

::: example Full employment in the Leontief HO model {#ex-full-emp}
Solve [[#eq-full-emp]] for Home. Then recompute Home's outputs if $K$ rises to $100$ with $L$ still $100$ and techniques unchanged. Which good expands, and which contracts?
::: solution
From $Q_C = 80 - 2 Q_F$ and $2(80-2Q_F) + Q_F = 100$: $160 - 4Q_F + Q_F = 100$, so $3Q_F = 60$ and $Q_F = 20$, $Q_C = 40$.

After the capital increase: $2Q_C + Q_F = 100$ and $Q_C + 2Q_F = 100$. Then $Q_C = 100 - 2Q_F$ and $2(100-2Q_F)+Q_F = 100$, so $200 - 3Q_F = 100$, $Q_F = 100/3 \approx 33.33$, $Q_C \approx 33.33$. Capital-intensive food expands (20 to 33.3); labour-intensive cloth *contracts* (40 to 33.3). That is [[#thm-ryb]] in numbers.
:::
:::

::: widget plot
f: min(100-2*x, (K-x)/2)
sliders: K=80:50:130
x: 0, 55
y: 0, 55
labels: \text{Home PPF (Leontief)}
caption: Cloth on the horizontal axis, food on the vertical. The PPF is the frontier of $2Q_C+Q_F \le 100$ (labour) and $Q_C+2Q_F \le K$ (capital). At $K=80$ the kink is $(40, 20)$. Raise $K$: the capital constraint lifts, the kink slides *up and left* — more food, less cloth — which is Rybczynski at constant techniques. The slope of each facet is a factor-price ratio in disguise.
:::

## Four theorems

The four classical theorems are comparative-static properties of this economy. Each has assumptions that are easy to forget and that the evidence will strain.

::: theorem Heckscher–Ohlin theorem {#thm-ho}
Assume [[#def-ho]], no factor-intensity reversal, both countries in the diversification cone, and identical homothetic tastes. Then each country exports the good that uses its abundant factor intensively. In the 2 × 2 case: the labour-abundant country exports the labour-intensive good.
:::

::: proof
Identical homothetic tastes and free trade imply that both countries consume the two goods in the same ratio (the world ratio). Factor-price equalisation ([[#thm-fpe]] below) implies that they produce with the same techniques. Full employment then implies that the labour-abundant country *produces* a higher ratio of the labour-intensive good to the capital-intensive good than the world (this is Rybczynski applied to a comparison of two endowments). Producing a higher ratio than it consumes, it exports that good.
:::

::: theorem Stolper–Samuelson theorem {#thm-ss}
Assume two goods, two mobile factors, constant returns, and no factor-intensity reversal. An increase in the relative price of a good raises the real return to the factor used intensively in that good and lowers the real return to the other factor, in terms of *both* goods. The factor-price change is *magnified* relative to the goods-price change.
:::

::: proof
Zero profit in both sectors gives $a_{LC} w + a_{KC} r = p_C$ and $a_{LF} w + a_{KF} r = p_F$. Differentiating, using cost-minimisation (the envelope theorem: terms in $da_{ij}$ vanish), and writing hats for relative changes,

$$
\theta_{LC}\, \hat w + \theta_{KC}\, \hat r = \hat p_C, \qquad \theta_{LF}\, \hat w + \theta_{KF}\, \hat r = \hat p_F,
$$

where $\theta_{LC} = a_{LC} w / p_C$ is labour's cost share in cloth, and so on. If cloth is labour-intensive, $\theta_{LC} > \theta_{LF}$. Solving the two-by-two system, $\hat w$ is a *positive* weighted combination of $\hat p_C$ with a coefficient larger than one, and $\hat r$ moves the other way. Thus if $\hat p_C > \hat p_F = 0$, then $\hat w > \hat p_C > 0 > \hat r$, which is magnification: $w/p_C$ and $w/p_F$ both rise, $r/p_C$ and $r/p_F$ both fall.
:::

::: theorem Rybczynski theorem {#thm-ryb}
At constant goods prices (hence constant factor prices and techniques), an increase in the endowment of a factor raises the output of the good that uses that factor intensively, and lowers the output of the other good.
:::

::: proof
Full employment is $a_{LC} Q_C + a_{LF} Q_F = L$ and $a_{KC} Q_C + a_{KF} Q_F = K$, with $a_{ij}$ fixed at constant prices. Differentiating and using labour-intensity of cloth, the Jacobian has the sign pattern that sends $\mathrm{d}L > 0$ to $\mathrm{d}Q_C > 0$ and $\mathrm{d}Q_F < 0$ (Cramer's rule; the same linear algebra as [[#ex-full-emp]]). Intuition: to absorb extra labour at a *fixed* $K/L$ in each industry, the economy must expand the labour-intensive sector and shrink the other, releasing the extra capital the expanding sector needs.
:::

::: theorem Factor-price equalisation {#thm-fpe}
Assume [[#def-ho]], free trade in goods (so goods prices are equalised), both countries produce both goods, and no factor-intensity reversal. Then $(w, r) = (w^*, r^*)$. Trade in goods is a perfect substitute for trade in factors.
:::

::: proof
Zero-profit conditions map $(w, r)$ to $(p_C, p_F)$ by a function that is locally invertible when factor intensities differ (the Jacobian is the share matrix of [[#thm-ss]], with non-zero determinant). Equal $(p_C, p_F)$ therefore imply equal $(w, r)$. The countries need not have equal *endowments*; they need only to be in the same diversification cone, so that the same $(w, r)$ is consistent with full employment of each endowment.
:::

::: example Stolper–Samuelson in the Leontief numbers {#ex-ss}
Cloth costs $2w + r = p_C$; food costs $w + 2r = p_F$. At $(p_C, p_F) = (1, 1)$, find $(w, r)$. Then raise $p_C$ to $1.2$ with $p_F$ fixed. Compute the new factor prices and the real returns in units of each good. Confirm magnification: labour's return rises by more than 20 per cent.
::: solution
At prices $(1,1)$: $2w+r = 1$, $w+2r = 1$. Subtracting twice the second from... easier: from the second, $w = 1-2r$; then $2(1-2r)+r = 1$, so $2-4r+r=1$, $1=3r$, $r=1/3$, $w=1/3$.

At $p_C = 1.2$: $2w+r = 1.2$, $w+2r = 1$. Then $w = 1-2r$ and $2-4r+r = 1.2$, so $2-1.2 = 3r$, $r = 0.8/3 \approx 0.2667$, $w = 1 - 1.6/3 \approx 0.4667$.

Labour: $w$ rises from $0.333$ to $0.467$, a 40 per cent rise, against a 20 per cent rise in $p_C$. Real wage in cloth: $w/p_C$ from $1/3$ to $0.467/1.2 \approx 0.389$ (up); in food, from $1/3$ to $0.467$ (up). Capital: $r/p_C$ from $1/3$ to $0.222$ (down); $r/p_F$ from $1/3$ to $0.267$ (down). Labour, intensive in the good whose price rose, gains in both goods; capital loses in both. Magnification: $\hat w = 40\% > \hat p_C = 20\% > 0 > \hat r \approx -20\%$.
:::
:::

::: example Factor-price equalisation in the numbers {#ex-fpe}
Home's endowment is $(L,K)=(100,80)$ and Foreign's is $(80,100)$. Both produce both goods with the Leontief techniques of [[#ex-ss]], and free trade equalises goods prices at $(1,1)$. Compute $(w,r)$ in each country. What would happen to Foreign factor prices if Foreign's capital rose so far that $K^*/L^*$ exceeded $2$, pushing Foreign out of the diversification cone?
::: solution
Zero-profit conditions at $(p_C,p_F)=(1,1)$ give $(w,r)=(1/3,1/3)$ in *both* countries, because the mapping from goods prices to factor prices does not use the endowment ([[#thm-fpe]]). Endowments determine *outputs* (Rybczynski), not factor prices, inside the cone.

If Foreign's $K^*/L^* > 2$, Foreign can no longer fully employ capital at these techniques while producing both goods: it specialises in food (the capital-intensive good), the zero-profit condition for cloth ceases to bind, and $r^*$ is no longer tied to $w^*$ by two equations. Factor prices then generally *differ* across countries; FPE has left the building with diversification.
:::
:::

::: warning Factor-price equalisation is not a claim about the real world on its own
[[#thm-fpe]] requires identical technologies, both goods produced in both countries, and free trade in goods without transport costs. None of these is a description of the world. Wages in Germany and in Malawi are not equal, and the theorem does not say they should be: Malawi is not in the same diversification cone as Germany on the same technology set, and technologies are not the same. Trefler's (1993, 1995) "productivity-adjusted" factor-price equalisation — measuring labour in *effective* units — is a much weaker, and more successful, claim. Do not cite FPE as a naive prediction that trade equalises living standards.
:::

::: quiz
In the 2 × 2 Heckscher–Ohlin model, a rise in the relative price of the labour-intensive good
- [ ] raises both $w$ and $r$ in proportion to the price
- [x] raises the real wage in terms of both goods and lowers the real rental in terms of both goods
- [ ] raises the real wage in terms of food but lowers it in terms of cloth, as in the specific-factors model
- [ ] has no effect on factor prices, by factor-price equalisation
::: solution
Stolper–Samuelson, [[#thm-ss]], is a statement about *magnified* real returns, in terms of both goods. The specific-factors ambiguity for the mobile factor ([[international-trade/specific-factors#prop-sf-dist]]) is a different model, with a trapped factor. FPE says factor prices are determined by *goods* prices; it does not say goods prices cannot change.
:::
:::

## Trade equilibrium in the numbers

World endowments are $L^W = 180$, $K^W = 180$. With the same techniques, world outputs satisfy $2Q_C^W + Q_F^W = 180$ and $Q_C^W + 2Q_F^W = 180$, so $Q_C^W = Q_F^W = 60$. Identical homothetic tastes and $p_C = p_F$ (which will be the equilibrium, by symmetry of the world) imply that consumption of the two goods is equal in every country. Home's income at $(w,r) = (1/3, 1/3)$ is $(1/3)(100+80) = 60$; Foreign's is also $60$. Each consumes $(30, 30)$. Home produces $(40, 20)$ and therefore *exports 10 cloth and imports 10 food*. Foreign does the reverse. The labour-abundant country exports the labour-intensive good: [[#thm-ho]] in a table.

Gains from trade are the same geometry as in the last two chapters. Home's autarky prices would have been different, because Home's endowment is skewed; trade equalises goods prices with Foreign, moving Home along its PPF toward cloth and letting it consume off the PPF. Both countries gain as nations. By Stolper–Samuelson, Home *labour* gains (the abundant factor) and Home *capital* loses (the scarce factor). Foreign capital gains and Foreign labour loses. The scarce factor in each country is the constituency for protection. That is a positive prediction, not a verdict on whether protection should be granted; the political-economy chapter takes it up.

::: example Factor content of Home's trade {#ex-factor-content}
Home exports 10 cloth and imports 10 food. Using the unit factor requirements of the Leontief example, compute the labour and capital *embodied* in exports, in imports, and in net trade. Compare net factor exports with Home's endowment minus its share of the world endowment (Vanek's HOV prediction). Home's share of world income is $1/2$.
::: solution
Exports of 10 cloth embody $2\cdot 10 = 20$ labour and $1\cdot 10 = 10$ capital. Imports of 10 food embody $1\cdot 10 = 10$ labour and $2\cdot 10 = 20$ capital. Net factor exports: labour $20-10 = +10$, capital $10-20 = -10$.

HOV: a country exports its abundant factor. Home's labour endowment minus its consumption of labour services should equal net labour exports. World labour is 180; Home's income share is $1/2$, so Home consumes $90$ units of labour services. Endowment minus consumption is $100-90 = 10$, which matches net labour exports. Capital: endowment $80$ minus consumption $90$ equals $-10$, matching net capital exports. In this frictionless Leontief world, HOV holds exactly.
:::
:::

The **Heckscher–Ohlin–Vanek** equations extend the 2 × 2 theorem to many goods and factors: the factor content of net trade equals the endowment minus the country's income-share of the world endowment. They are what empirical work actually tests.

## Evidence: Leontief, missing trade, and later tests

Wassily Leontief (1953), using the 1947 US input–output table, computed the capital and labour embodied in a million dollars of US exports and in a million dollars of US import-competing production. The United States was, by any measure, capital-abundant. HO therefore predicted capital-intensive exports. Leontief found the opposite: US exports were more *labour*-intensive than import-competing production. The **Leontief paradox** launched a literature.

Several observations, none of which "dissolve" the paradox on their own, have qualified it. Leamer (1980) showed that Leontief's comparison — factor intensity of exports versus import-competing production — is not the HOV comparison unless trade is balanced and there are two factors; the right object is the factor content of *net* trade versus the endowment. Natural resources, a third factor, account for a large share of trade and were omitted. Technology is not identical: US labour in 1947 was far more productive than labour elsewhere, so in *effective* units the United States may have been labour-abundant (Leontief's own preferred resolution). And goods are differentiated by quality and skill, so "textiles" in Germany and "textiles" in Bangladesh are not the same good (Schott 2004; Romalis 2004).

Bowen, Leamer and Sveikauskas (1987) tested HOV on many countries and factors and found that the sign of net factor trade matched the sign of excess endowments little more often than a coin flip. Trefler (1995), in "The case of the missing trade", documented two regularities: the factor content of trade is an order of magnitude *smaller* than HOV predicts, and poor countries' endowments look as if they were smaller once productivity is allowed to differ (the "endowment paradox"). Allowing Hicks-neutral productivity differences across countries, in the spirit of Ricardo, cuts missing trade dramatically. Davis and Weinstein (2001) add trade costs and a gravity structure; HOV then fits much better. Costinot and Rodríguez-Clare (2014), in the *Handbook of International Economics*, summarise the modern view: pure HO, with identical technologies and no trade costs, is rejected; HO-plus-Ricardo (productivity differences) plus gravity is a useful quantitative framework.

On Stolper–Samuelson and inequality, the record is also mixed and should be reported as such. The 1980s–90s rise in the skill premium in the United States, the United Kingdom and several Latin American economies coincided with trade opening and with skill-biased technical change. Feenstra and Hanson (1996, 1997, 1999) showed that *offshoring* of intermediate stages can raise the relative demand for skill in *both* countries, a HO-inconsistent pattern that a specific-factors or a fragmenting-production model can deliver. Goldberg and Pavcnik (2007) survey developing-country liberalisations and find no uniform Stolper–Samuelson fall in inequality; in several cases the skill premium *rose* after opening. Autor, Dorn and Hanson (2013), discussed in the previous chapter, find local labour-market losses that look more specific-factor than HO (industry and place, not just skill type). The honest summary is that endowments and factor intensities are part of the pattern of trade, especially in commodities and in broadly defined skill groups (Romalis 2004), and that they are not the whole pattern. Intra-industry trade, firms and offshoring need the next two chapters.

::: application Oil, land and skills: three abundances
Saudi Arabia and Nigeria are oil-abundant; their merchandise exports are dominated by crude, a HO prediction once "capital" is allowed to include subsoil assets. Argentina, Ukraine and the Canadian Prairies are land-abundant; they export grains and oilseeds. Germany, Japan and Korea are (physical- and human-) capital abundant relative to Bangladesh, Ethiopia and Cambodia, and they export machinery, vehicles and chemicals against garments, cut flowers and simple assembly. The HO lens is informative at this coarse grain. It is less informative about why Germany and France trade cars with each other, why only a few German firms export, or why a Chinese iPhone export contains Japanese, Korean and American parts. Those facts are increasing returns, heterogeneous firms and global value chains.
:::

::: intuition Trade as a substitute for migration
Factor-price equalisation, when it holds, says that a worker does not have to move to a capital-rich country to be paid a capital-rich wage: she can stay put and *export* the labour-intensive good. Trade and migration are substitutes in the model. In the world they are also complements — migrants carry skills, networks and capital, and they trade more with their origin (Gould 1994; Rauch 2001) — because the model's assumptions (identical technology, no trade costs, diversification) fail. The intuition remains useful as a benchmark: some of the wage gap that would drive migration can be arbitraged by goods trade, and some cannot.
:::

::: history
**1919, Eli Heckscher**, "The Effect of Foreign Trade on the Distribution of Income". **1933, Bertil Ohlin**, *Interregional and International Trade*. **1941, Wolfgang Stolper and Paul Samuelson**, the real-return theorem. **1953, Wassily Leontief**, the paradox. **1955, T. M. Rybczynski**, the endowment–output theorem. **1968, Jaroslav Vanek**, the many-factor generalisation. **1995, Daniel Trefler**, missing trade. Heckscher and Ohlin received (Ohlin with James Meade) the 1977 Nobel Prize in Economic Sciences; Samuelson had received it in 1970, Leontief in 1973.
:::

## Where this leads

HO is the long-run, mobile-factor distributional theory. It does not generate intra-industry trade between similar countries, and it does not give a role to firms. [[international-trade/new-trade-theory]] supplies increasing returns and love of variety; [[international-trade/firms-in-trade]] supplies heterogeneous firms, offshoring and value chains. The Stolper–Samuelson mapping from goods prices to factor prices remains the benchmark that those models modify, and it remains the mapping that a tariff, in [[international-trade/tariffs-and-quotas]], uses when it changes relative prices. When the evidence rejects pure HO, it is usually rejecting identical technologies and zero trade costs, not the idea that endowments move production.

::: summary
- The HO model generates trade from endowment differences given identical technologies. Cloth is labour-intensive if its cost-minimising $K/L$ is lower; a country is labour-abundant if its $L/K$ is higher ([[#def-ho]]).
- Heckscher–Ohlin: the labour-abundant country exports the labour-intensive good ([[#thm-ho]]). Stolper–Samuelson: a rise in a good's relative price raises the intensive factor's *real* return in both goods, with magnification ([[#thm-ss]]).
- Rybczynski: at constant prices, more of a factor expands the intensive good and shrinks the other ([[#thm-ryb]]). Factor-price equalisation: with free trade, identical technologies and diversification, $(w,r)$ is equalised ([[#thm-fpe]]).
- HOV writes the same idea as a factor-content identity. It holds exactly in the frictionless example and fails badly in naive tests (Leontief 1953; Bowen, Leamer and Sveikauskas 1987; Trefler 1995). Productivity differences and trade costs repair much of the failure.
- Gains from trade remain national; the scarce factor loses. That distributional claim is the long-run analogue of the specific-factors result, and the evidence on inequality is mixed.
:::

## Exercises

::: exercise Intensity and abundance {level=1}
Cloth uses 2 labour and 1 capital per unit; food uses 1 labour and 2 capital. Home has $L=100$, $K=80$. Which good is labour-intensive? Is Home labour-abundant relative to a Foreign with $L^*=80$, $K^*=100$?
::: solution
Cloth's $K/L = 1/2 < 2 =$ food's $K/L$, so cloth is labour-intensive. Home's $L/K = 100/80 = 1.25 > 80/100 = 0.8 =$ Foreign's $L/K$, so Home is labour-abundant.
:::
:::

::: exercise Home outputs {level=1 check="40"}
In the Leontief example of [[#eq-full-emp]], what is Home's output of cloth?
::: solution
Solving $2Q_C+Q_F=100$ and $Q_C+2Q_F=80$ gives $Q_C=40$, $Q_F=20$.
:::
:::

::: exercise Autarky factor prices {level=1 check="1/3"}
At goods prices $(p_C,p_F)=(1,1)$ and the Leontief unit costs of [[#ex-ss]], what is the wage $w$?
::: solution
$2w+r=1$, $w+2r=1$ imply $w=r=1/3$.
:::
:::

::: exercise A Stolper–Samuelson wage {level=2 check="0.467"}
As in [[#ex-ss]], $p_C$ rises to $1.2$ with $p_F=1$. Compute the new wage to three decimal places.
::: solution
$w=1-2r$ and $2(1-2r)+r=1.2$ give $r=0.8/3$ and $w=1-1.6/3 = (3-1.6)/3 = 1.4/3 \approx 0.4667$, which to three decimal places is $0.467$.
:::
:::

::: exercise Rybczynski direction {level=2}
Home's capital rises, goods prices held constant. Using [[#thm-ryb]] and the intensities of the Leontief example, which output rises and which falls? Confirm with the numbers of [[#ex-full-emp]].
::: solution
Capital-intensive food rises; labour-intensive cloth falls. Numbers: from $(40,20)$ to about $(33.3, 33.3)$. The extra capital is absorbed by expanding food, which releases labour only if cloth shrinks.
:::
:::

::: exercise HOV arithmetic {level=2 check="10"}
Home exports 10 cloth (2 labour per unit) and imports 10 food (1 labour per unit). What is Home's net labour export?
::: solution
Labour in exports $20$, in imports $10$, net $+10$.
:::
:::

::: exercise Why FPE can fail {level=3}
List three assumptions of [[#thm-fpe]] and, for each, a real-world feature that violates it. Then explain Trefler's productivity adjustment in one sentence: what is being measured in "effective" labour units, and why that makes equalisation less of a non-starter.
::: hint
Technologies, the cone, trade costs.
:::
::: solution
Identical technologies: US, German and Bangladeshi techniques in the same nominal industry differ (management, TFP, quality). Diversification cone: a landlocked Sahelian endowment ratio need not lie between German industry intensities on the German technique set. Free trade without costs: tariffs, freight, and non-tariff measures break goods-price equalisation, so the map from $p$ to $(w,r)$ is not common. Trefler measures labour in units of *productivity-adjusted* (effective) workers, so a US worker counts as several Bangladeshi workers; FPE is then a claim about wages per *effective* unit, which can hold approximately even when wages per person do not.
:::
:::

::: exercise Magnification {level=3}
In the share-form equations of the proof of [[#thm-ss]], suppose $\theta_{LC}=0.8$, $\theta_{KC}=0.2$, $\theta_{LF}=0.4$, $\theta_{KF}=0.6$, $\hat p_C = 0.10$ and $\hat p_F = 0$. Solve for $\hat w$ and $\hat r$. Confirm $\hat w > \hat p_C > 0 > \hat r$.
::: hint
$0.8\hat w + 0.2\hat r = 0.10$ and $0.4\hat w + 0.6\hat r = 0$.
:::
::: solution
From the second equation, $0.4\hat w + 0.6\hat r = 0$ so $\hat r = -\tfrac23 \hat w$. Substitute: $0.8\hat w + 0.2(-\tfrac23\hat w) = 0.10$, i.e. $0.8\hat w - \tfrac{2}{15}\hat w = 0.10$. Now $0.8 = 12/15$, so $(12/15 - 2/15)\hat w = 0.10$, $(10/15)\hat w = 0.10$, $\hat w = 0.15$. Then $\hat r = -0.10$. Indeed $0.15 > 0.10 > 0 > -0.10$. A 10 per cent rise in the cloth price raises the wage 15 per cent and cuts the rental 10 per cent.
:::
:::

::: exercise Leontief and Leamer {level=2}
State the Leontief paradox. Why, according to Leamer (1980), is comparing the factor intensity of exports with that of import-*competing production* not in general a test of HOV?
::: solution
Leontief found that US exports in 1947 were more labour-intensive than US import-competing production, against the HO prediction for a capital-abundant country. HOV compares the factor content of *net* trade with excess endowments. Export intensity versus import-competing intensity coincides with that comparison only in special cases (balanced trade, two factors). A capital-abundant country can have labour-intensive *gross* exports if it also has even more labour-intensive consumption, or if a third factor (resources) dominates; Leamer's correction, and later HOV tests, are the appropriate objects.
:::
:::

::: exercise Scarce-factor politics {level=3}
Home is labour-abundant and opens to trade. Using [[#thm-ho]] and [[#thm-ss]], which Home factor gains, which loses, and why might owners of the losing factor demand a tariff even though [[international-trade/ricardian-model#thm-gains]] (and its HO analogue) says the nation gains? Contrast the *identity* of the losers with those in the specific-factors model.
::: solution
Home exports cloth, the labour-intensive good; $p_C/p_F$ rises; labour's real return rises and capital's falls. Capitalists lose as factor owners, even as they share in cheaper import goods as consumers; Stolper–Samuelson says the real-return loss is in terms of *both* goods, so the consumer gain does not offset. They demand a tariff to push $p_C/p_F$ back. The nation gains because labour's gain exceeds capital's loss (the compensation principle). In specific-factors, the losers are owners of the factor trapped in the *import-competing sector* (and possibly labour, depending on the basket), not all capitalists as a class. The time horizon decides which prediction is the relevant political-economy input; [[international-trade/political-economy-of-trade]] takes both.
:::
:::
