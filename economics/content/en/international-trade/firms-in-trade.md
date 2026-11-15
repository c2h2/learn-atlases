In every country where the census of manufacturers has been matched to customs records, a handful of firms account for the bulk of exports. In the United States, Bernard, Jensen, Redding and Schott (2007, 2018) document that the top 1 per cent of trading firms account for the large majority of trade value; exporters are rarer than non-exporters, larger, more productive, more skill-intensive and better paying. The same exporter premia appear in France (Eaton, Kortum and Kramarz 2011), Chile, Colombia, China, India, South Africa and the World Bank's *Exporter Dynamics Database*. Krugman's firms, in the last chapter, were symmetric: every firm produced, and every firm exported if any did. The data are a selection story. Marc Melitz's 2003 paper, "The Impact of Trade on Intra-Industry Reallocations and Aggregate Industry Productivity", gave that story a model, and it is now the third pillar of trade theory, next to comparative advantage and increasing returns.

This chapter takes Melitz as the core, then opens it toward **multinational production** (the proximity–concentration trade-off) and **global value chains** (offshoring, contracts, and trade in value added). The gains-from-trade theorem will acquire a new channel — the exit of the least productive firms and the expansion of the most productive — without cancelling the variety and comparative-advantage channels already in hand. Distributional costs will acquire a new face: workers at the firms that exit, even inside an export industry.

## The exporter premium and selection

::: definition Exporter premium {#def-premium}
The **exporter premium** is the percentage gap between exporters and non-exporters in productivity, employment, skill intensity or wages, inside an industry. A **selection** interpretation says that more productive firms *become* exporters (a fixed cost of exporting screens them). A **learning-by-exporting** interpretation says that exporting *makes* firms more productive. The two are not exclusive; they are identified by timing: selection shows up in premia *before* export entry, learning in premia *after*.
:::

Bernard and Jensen (1995, 1999), on US plant data, found that future exporters already look like exporters several years before they ship: the bulk of the premium is selection. Later work finds some post-entry productivity growth, especially in lower-income economies and in detailed product-level data (De Loecker 2007 on Slovenia; Atkin, Khandelwal and Osman 2017, a rare randomised experiment on Egyptian rugs, find quality and productivity gains from meeting foreign buyers). The Melitz model is built on selection. Learning is an extra mechanism, not a substitute.

A second fact organises multinational production. Helpman, Melitz and Yeaple (2004) document that, among US firms, the most productive tend to serve foreign markets by **horizontal FDI** (produce abroad), the next tier by exporting, and the least productive serve only the home market. Head and Ries (2003) on Japan, and many subsequent papers, find the same ranking. The ranking is the proximity–concentration trade-off: FDI saves iceberg costs (proximity to customers) at the price of duplicating the fixed cost of a plant (losing concentration). Only firms with a large enough variable-profit margin find the extra plant worth paying for.

## The Melitz model

Firms pay a sunk entry cost $f_E$, then draw a productivity $\varphi$ from a distribution $G$ (Pareto is the convenient special case). A firm that produces for the domestic market pays a fixed cost $f$ and a variable cost $1/\varphi$ in labour per unit. Serving a foreign market costs an extra fixed cost $f_x$ and iceberg $\tau$. CES demand, as in [[international-trade/new-trade-theory#def-krugman]], gives variable profit proportional to $\varphi^{\sigma-1}$.

::: definition Melitz cutoffs {#def-melitz}
In the Melitz (2003) model a firm produces domestically if and only if $\varphi \ge \varphi^*$, and exports if and only if $\varphi \ge \varphi_x^*$, where the **cutoffs** solve zero-profit conditions

$$
\pi_d(\varphi^*) = 0, \qquad \pi_x(\varphi_x^*) = 0,
$$

with $\pi_d$ domestic profit and $\pi_x$ the additional profit from exporting. Under the usual parameter restriction $f_x / f > \tau^{1-\sigma}$ one has $\varphi_x^* > \varphi^*$, so there is a non-empty set of firms that sell only at home. Aggregate productivity is an average of $\varphi$ over active firms, weighted by their output shares.
:::

::: proposition Selection and reallocation {#prop-selection}
Assume [[#def-melitz]], CES demand, a fixed export cost, and a reduction in iceberg $\tau$ (or in $f_x$, or the opening of a new market). Then:

1. The domestic cutoff $\varphi^*$ *rises*: the least productive active firms exit.
2. The export cutoff $\varphi_x^*$ *falls*: more firms export.
3. Market shares reallocate from less to more productive firms, and measured aggregate productivity rises.
4. Survivors that already exported expand; firms that neither exported nor were near the cutoff shrink or exit.

Assumptions: a continuum of firms, Pareto or more general $G$ with a finite mean of $\varphi^{\sigma-1}$, free entry that pins expected profit to $f_E$, and labour-market clearing that determines the wage (or the CES demand level).
:::

::: proof
A fall in $\tau$ raises variable export profit at every $\varphi$, which by free entry bids up the demand for labour (or, equivalently, raises the real wage / lowers the CES demand shifter facing a domestic sale). Domestic profit therefore falls at any given $\varphi$, so the $\varphi$ that just broke even no longer does: $\varphi^*$ rises. The same rise in export profitability lowers $\varphi_x^*$. Firms with $\varphi \in [\varphi^*_{\mathrm{old}}, \varphi^*_{\mathrm{new}})$ exit; firms with $\varphi \ge \varphi_x^{*\mathrm{new}}$ export, some of them for the first time. Output shares, which under CES rise with $\varphi^{\sigma-1}$, shift toward the upper tail. The average $\varphi$ of active firms, output-weighted, rises. Melitz (2003), section 4, is the full algebra; Pavcnik (2002) is the corresponding empirical decomposition for Chile.
:::

The welfare implication is a new gains-from-trade channel. Consumers still gain varieties (foreign varieties in, some domestic varieties out). They also gain because the *composition* of domestic production improves. Arkolakis, Costinot and Rodríguez-Clare (2012) showed that, for CES-Melitz with Pareto, this extra channel is already inside the sufficient statistic $1-\lambda^{1/\varepsilon}$: selection shows up as a higher trade elasticity $\varepsilon$, not as a term the formula missed. That is a useful accounting result. It does not make selection uninteresting; it says that a researcher who measures $\lambda$ and $\varepsilon$ well has already counted it.

::: example Three firms {#ex-three-firms}
Three firms in a Home industry have productivities $\varphi = 1, 2, 4$. Domestic fixed cost $f$ is such that $\varphi^* = 1.5$; export fixed cost and iceberg are such that $\varphi_x^* = 3$. (a) Who produces, who exports? (b) After a fall in $\tau$, the cutoffs move to $\varphi^* = 1.8$ and $\varphi_x^* = 2.5$. What happens to each firm? (c) In one sentence, what happens to the industry's average productivity?
::: solution
(a) Firm 1 ($\varphi=1 < 1.5$) is inactive; firm 2 produces only for Home; firm 4 produces and exports.

(b) Firm 1 remains inactive. Firm 2 ($\varphi=2$), still above $1.8$ but now above $2.5$, *starts exporting*. Firm 4 continues to export and, by [[#prop-selection]], expands. If a fourth firm had sat at $\varphi=1.6$, it would have exited.

(c) The inactive tail is unchanged in this three-firm example, but the output share of firm 4 rises and firm 2 now also serves the foreign market with a higher $\varphi$ than a domestic-only allocation would have used on the margin; the output-weighted average $\varphi$ rises.
:::
:::

::: widget plot
f: 0.4*x^(s-1) - fd; 0.15*x^(s-1) - fx
sliders: s=3:2.2:5; fd=2:0.5:4; fx=3:1:6
x: 1, 6
y: -6, 12
hlines: 0
labels: \text{domestic profit}; \text{export profit}
caption: Profits as functions of productivity $x=\varphi$, of the form $B\varphi^{\sigma-1}-f$. The domestic curve cuts zero at $\varphi^*$; the export curve (additional profit) cuts zero at $\varphi_x^*$. Raise $f_x$ (the slider $fx$) and the export cutoff moves right: fewer exporters. Raise $\sigma$ (slider $s$) and both curves steepen: productivity differences are magnified by CES. The picture is [[#def-melitz]].
:::

::: example A Pareto tail {#ex-pareto}
Productivities are Pareto: $\mathrm{Prob}(\varphi > \varphi_0) = (\varphi_{\min}/\varphi_0)^k$ for $\varphi_0 \ge \varphi_{\min}$, with $\varphi_{\min} = 1$ and $k = 3$. If the export cutoff is $\varphi_x^* = 2$ and the domestic cutoff is $\varphi^* = 1$, what fraction of *active* firms export? (Active firms are those with $\varphi \ge 1$.)
::: solution
Among active firms the distribution is still Pareto with the same $k$ and new minimum $1$. The fraction with $\varphi \ge 2$ is $(1/2)^3 = 1/8 = 0.125$. One in eight active firms exports; seven in eight sell only at home. A fall in $\tau$ that lowers $\varphi_x^*$ to $1.5$ raises the export fraction to $(1/1.5)^3 \approx 0.296$. That is [[#prop-selection]] on a Pareto tail, which is why a small cutoff move can change export participation a lot at the thin edge and a little in the bulk.
:::
:::

::: warning Opening does not raise every firm's profit
A common misreading of "gains from trade" in Melitz is that every active firm is better off. The opposite is part of the mechanism: domestic demand per firm is squeezed by foreign rivals and by a higher real wage, which is why $\varphi^*$ rises and why some previously active firms exit. Those firms' owners and workers lose, in the same sense that specific-factor owners lost in [[international-trade/specific-factors]]. The industry's *average* productivity and the nation's CES welfare rise; the lower tail of the firm distribution does not. Pavcnik (2002) on Chile and Trefler (2004) on the Canada–US Free Trade Agreement are the classic empirical decompositions: a large share of the measured productivity gain is reallocation and exit, not a within-plant miracle.
:::

::: quiz
In Melitz (2003), a fall in iceberg costs causes
- [ ] every firm to export, because exporting has become cheaper
- [x] the least productive firms to exit and a larger set of more productive firms to export
- [ ] mark-ups to fall, because CES demand becomes more elastic
- [ ] the domestic cutoff $\varphi^*$ to fall, so more firms produce at home
::: solution
[[#prop-selection]]: $\varphi^*$ rises (exit at the bottom), $\varphi_x^*$ falls (entry into export at the middle). Not every firm exports — the fixed cost $f_x$ still screens. CES mark-ups are constant, as in Krugman; Melitz and Ottaviano (2008) is the variable-mark-up cousin.
:::
:::

## Multinationals: proximity versus concentration

A firm that wants to sell in Foreign can ship (pay $\tau$ and $f_x$) or build a plant in Foreign (pay a plant-level fixed cost $f_I > f_x$, and then produce at Foreign's wage with no iceberg). That is **horizontal FDI**, market-seeking. **Vertical FDI**, by contrast, splits the production chain to use Foreign as a low-cost stage, then ships the output on — offshoring, in the language of the next section.

::: proposition Proximity–concentration ranking {#prop-fdi}
Assume Helpman, Melitz and Yeaple (2004): CES demand, a productivity draw $\varphi$, a fixed cost of exporting $f_x$, a higher fixed cost of a foreign plant $f_I$, and iceberg $\tau$. Then there are two cutoffs $\varphi_x^* < \varphi_I^*$ such that the least productive active firms sell only at home, an intermediate band exports, and the most productive firms serve Foreign by FDI. A fall in $\tau$ expands the export band at the expense of FDI (more "concentration", less "proximity"); a fall in $f_I$ does the reverse.
:::

::: proof
Variable profit in Foreign is proportional to $\varphi^{\sigma-1}$ times a term that is larger under FDI (no $\tau$) than under exporting. Fixed costs rank $f_I > f_x$. The two zero-profit conditions therefore cross the $\varphi^{\sigma-1}$ line at two points, with FDI requiring the higher $\varphi$. A fall in $\tau$ raises export variable profit and shifts $\varphi_x^*$ down and $\varphi_I^*$ up: some firms switch from FDI to exporting. The algebra is in Helpman, Melitz and Yeaple (2004), section II.
:::

The ranking matches the size-productivity ordering in US, Japanese, French and Chinese multinational data. It is a theory of *horizontal* FDI. A good deal of measured FDI is vertical or mixed (Swedish multinationals in the Baltics, US multinationals in Mexico, Japanese multinationals in Thailand and Vietnam), and that is a GVC fact.

## Offshoring and global value chains

Once a production process can be split, trade theory is no longer only about exchanging final cars for final wine. It is about engines, wiring harnesses, software and logos crossing borders, sometimes more than once. Hummels, Ishii and Yi (2001) measured **vertical specialisation** as the imported-input content of exports; Johnson and Noguera (2012) and Koopman, Wang and Wei (2014) built **trade-in-value-added** accounts that strip the double-counting. The OECD–WTO TiVA database is the public version. On a value-added basis, China's surplus with the United States is smaller than on a gross basis, because a "Chinese" electronic export contains Japanese, Korean, German and American parts. Gross flows remain the right object for customs and for gravity; value-added flows are the right object for asking who earned the income.

Two families of models organise the split.

**Factor-content offshoring.** Feenstra and Hanson (1996, 1997) let a continuum of intermediate tasks be ranked by skill intensity. Offshoring the least skill-intensive tasks from Home to Foreign *raises* average skill intensity in both countries' manufacturing — Home has shed its least-skilled tasks, Foreign has taken on tasks that are skill-intensive *by Foreign's standards*. Relative demand for skill, and the skill premium, can rise in both places, which is not a Stolper–Samuelson prediction and which matched parts of the 1980s–90s data. Grossman and Rossi-Hansberg (2008) recast the same idea as trade in *tasks*, with a productivity effect (offshoring is like technical progress in the offshored task) that can raise the real wage of the factor whose tasks are being offshored.

**Contractual offshoring.** Antràs (2003, 2005) and Antràs and Helpman (2004) apply the Grossman–Hart–Moore property-rights approach: when relationship-specific investments cannot be contracted, the allocation of residual rights (integration versus outsourcing, at home or abroad) is chosen to protect the party whose investment is more important. Headquarter-intensive processes tend to be integrated; routine, supplier-intensive processes tend to be outsourced. Antràs (2015), *Global Production*, is the monograph. The models generate the observed pattern that intra-firm trade is a large share of trade (about one-third of US merchandise imports, according to US Census related-party data in recent years) and is concentrated in capital- and R&D-intensive products.

::: example Gross versus value-added bilateral balances {#ex-tiva}
A gadget assembled in Vietnam uses 40 of imported components (Japan 20, Korea 10, the United States 10) and 60 of Vietnamese value added, and sells in the United States for 100. (a) What does US customs record as imports from Vietnam? (b) What is Vietnam's value-added content of that sale? (c) If the United States levies a 10 per cent tariff on the gadget, on how much value does the tariff fall, and whose?
::: solution
(a) 100. (b) 60. (c) The tariff is levied on 100 of customs value: 60 Vietnamese, 20 Japanese, 10 Korean, and 10 already American. A tariff aimed at "Vietnam" hits a chain. This is the arithmetic behind the political appeal, and the practical leakage, of tariffs on GVC-intensive goods; [[international-trade/tariffs-and-quotas]] will put the same arithmetic into a welfare diagram that, in its basic form, still treats the good as if it were wholly foreign.
:::
:::

::: example Proximity–concentration arithmetic {#ex-hmy}
Variable export profit in Foreign is $0.4\,\varphi^{\sigma-1}$ after iceberg costs; variable FDI profit (no iceberg) is $0.8\,\varphi^{\sigma-1}$. Fixed costs are $f_x = 4$ and $f_I = 12$. Take $\sigma = 3$ so $\varphi^{\sigma-1} = \varphi^2$. Find the export cutoff and the FDI cutoff (the $\varphi$ at which extra profit from that mode is zero, and at which FDI overtakes exporting).
::: solution
Exporting breaks even when $0.4\,\varphi^2 = 4$, so $\varphi_x^* = \sqrt{10} \approx 3.16$.

FDI profit $0.8\,\varphi^2 - 12$ versus export profit $0.4\,\varphi^2 - 4$: FDI is better when $0.4\,\varphi^2 > 8$, i.e. $\varphi_I^* = \sqrt{20} \approx 4.47$. (FDI's own zero-profit point $0.8\,\varphi^2=12$ is $\varphi=\sqrt{15}\approx 3.87$, but a firm in $(3.87, 4.47)$ would still prefer exporting because the extra fixed cost is not yet covered by the extra variable profit.) Ranking: $\varphi < 3.16$ skip Foreign; $3.16 \le \varphi < 4.47$ export; $\varphi \ge 4.47$ FDI. That is [[#prop-fdi]].
:::
:::

::: application Apparel, electronics and automobiles
Bangladesh and Ethiopia export garments in which the local value added is mostly cut-make-trim labour; fabric and design often come from China, India, Turkey or East Asia (World Bank WDR 2020). Vietnam and Malaysia export electronics whose local content has risen but whose high-value chips and equipment remain Japanese, Korean, Taiwanese or American. Mexico and Central Europe export automobiles and parts inside USMCA and EU value chains, with engines, electronics and design still concentrated in the United States, Germany and Japan. In each case Melitz predicts that the *local* firms that make it into the chain are the more productive ones, Helpman–Melitz–Yeaple predicts that the lead firms are multinationals at the top of the productivity distribution, and Antràs predicts that the contract form (captive plant versus independent supplier) follows the hold-up problem. HO still predicts that the labour-intensive *stages* sit in labour-abundant places. The theories stack; they do not replace one another.
:::

::: history
**1995–99, Andrew Bernard and J. Bradford Jensen** document US exporter premia and selection. **2003, Marc Melitz**, the heterogeneous-firm model. **2004, Elhanan Helpman, Marc Melitz and Stephen Yeaple**, the FDI ranking. **2003–05, Pol Antràs**, incomplete contracts and the organisation of offshoring. **2008, Gene Grossman and Esteban Rossi-Hansberg**, trade in tasks. **2012, Robert Johnson and Guillermo Noguera**, value-added trade. The World Bank's *World Development Report 2020* took GVCs to a development audience.
:::

## Where this leads

Firm-level selection is the last of the positive theories of *why trade looks the way it does*. The rest of the course is policy. A tariff, in the next chapter, is still a wedge between prices; in a Melitz world it also changes cutoffs, so the deadweight-loss triangle of a representative-firm diagram is an incomplete picture of the welfare cost (or, for a large country, of the terms-of-trade gain). The workers at exiting firms are a political-economy constituency alongside HO's scarce factor and the specific-factors model's trapped capital. Global value chains change the *incidence* of a tariff: the gadget example is the warning. None of this retracts the national gains from trade under standard assumptions. It names more of the people and firms among whom those gains are divided.

::: summary
- Exporter premia are large and mostly selection: more productive firms enter export markets ([[#def-premium]]). Learning-by-exporting exists in some settings and is additional.
- Melitz (2003): a productivity draw, a domestic cutoff $\varphi^*$ and a higher export cutoff $\varphi_x^*$. Opening raises $\varphi^*$, lowers $\varphi_x^*$, reallocates output toward more productive firms and raises aggregate productivity ([[#def-melitz]], [[#prop-selection]]).
- Not every firm gains; exit at the bottom is part of the mechanism. Measured productivity gains in Chile (Pavcnik 2002) and Canada (Trefler 2004) are in large part reallocation.
- Horizontal FDI versus exporting is a proximity–concentration ranking by productivity ([[#prop-fdi]]). Vertical FDI and offshoring split the chain (Feenstra–Hanson, Grossman–Rossi-Hansberg, Antràs).
- Trade in value added, not gross flows, measures who earned the income along a GVC. Tariffs still apply to gross flows.
:::

## Exercises

::: exercise Who exports {level=1}
Cutoffs are $\varphi^* = 2$ and $\varphi_x^* = 5$. Firms have $\varphi = 1, 3, 6$. Who is inactive, who sells only at home, who exports?
::: solution
$\varphi=1$ inactive; $\varphi=3$ domestic only; $\varphi=6$ exports (and sells at home).
:::
:::

::: exercise A cutoff move {level=1}
After a fall in $\tau$, $\varphi^*$ rises from 2 to 2.5 and $\varphi_x^*$ falls from 5 to 4. A firm with $\varphi = 2.2$ and a firm with $\varphi = 4.5$: what happens to each?
::: solution
The $\varphi=2.2$ firm exits (it is now below $\varphi^*$). The $\varphi=4.5$ firm, previously domestic-only, starts exporting.
:::
:::

::: exercise Mark-up in Melitz {level=1 check="1.5"}
Melitz inherits CES mill-pricing. If $\sigma = 3$, what is $p/MC$?
::: solution
$\sigma/(\sigma-1) = 3/2 = 1.5$.
:::
:::

::: exercise Selection versus learning {level=2}
A panel of firms shows that plants which will start exporting in year $t+3$ are already 20 per cent more productive in year $t$ than plants which will not, and that they are 24 per cent more productive in year $t+4$. Which interpretation — selection, learning, or both — does this support, and what would you need to see to isolate learning?
::: solution
The 20 per cent gap *before* entry is selection. The extra 4 per cent after entry is consistent with learning but also with ongoing selection (the new exporters who survive are the better tail) and with demand shocks. Isolating learning wants a design that makes export access quasi-random, as in Atkin, Khandelwal and Osman (2017), or a careful event study with a control group of similar non-entrants. Bernard and Jensen's original reading — mostly selection — is the default; it is not a claim that learning is zero.
:::
:::

::: exercise Proximity–concentration {level=2}
Firm A is more productive than firm B; both sell in Foreign. A has a plant in Foreign; B exports from Home. Using [[#prop-fdi]], which firm is predicted to be which, and what happens to B's mode if iceberg $\tau$ falls substantially?
::: solution
A, the more productive, is the FDI firm; B exports. A fall in $\tau$ makes exporting more attractive relative to FDI, so B remains an exporter (or some firms near $\varphi_I^*$ *switch* from FDI to export). B does not, in this ranking, jump to FDI when $\tau$ falls; it is the opposite comparative static.
:::
:::

::: exercise Gross and value added {level=2 check="60"}
A good with customs value 100 contains 60 of assembling-country value added and 40 of imported parts. What is the domestic value added in the export?
::: solution
60.
:::
:::

::: exercise Why $\varphi^*$ rises {level=3}
In words, and using free entry, explain why a fall in $\tau$ *raises* the domestic cutoff in Melitz (2003). Why is this the opposite of the naive intuition "trade makes it easier to survive"?
::: hint
Foreign profit opportunities attract entry; entry and labour-market clearing squeeze domestic residual demand.
:::
::: solution
Cheaper trade raises expected profit at the entry stage, so more firms sink $f_E$ and draw $\varphi$. The extra competition, and the extra demand for labour by expanding exporters, raises the real wage (or lowers the CES demand shifter). Domestic variable profit falls at any given $\varphi$, so the marginal domestic firm is pushed into the red and $\varphi^*$ rises. Naive intuition looks at $\tau$ as a cost on *this* firm's export, which would make survival easier; it misses the general-equilibrium tightening of the domestic market. Exit of the least productive is a *result* of opening, not a failure of it.
:::
:::

::: exercise Tasks and the skill premium {level=3}
Feenstra and Hanson (1996) rank tasks by skill intensity and move the least skill-intensive Home tasks to Foreign. Why can the skill premium rise in *both* countries? Contrast this with Stolper–Samuelson in the 2 × 2 HO model when Home is skill-abundant.
::: solution
Home has offshored its *least* skilled manufacturing tasks, so the remaining Home manufacturing is more skill-intensive: relative demand for skill rises at Home. Foreign has received tasks that are more skill-intensive than Foreign's previous manufacturing average: relative demand for skill rises at Foreign too. Stolper–Samuelson, by contrast, predicts that opening raises the real return to Home's *abundant* factor (skill) and lowers it to Home's scarce factor, while doing the opposite in Foreign — so Foreign's skill premium should *fall*. The two-country two-final-good HO model has no room for a common rise. Offshoring of a continuum of tasks does. Goldberg and Pavcnik (2007) document that several developing-country liberalisations were not accompanied by a fall in the skill premium; Feenstra–Hanson is one candidate explanation, skill-biased technical change another. The chapter does not pick a single cause.
:::
:::

::: exercise Intra-firm trade {level=2}
About one-third of US merchandise imports are related-party (intra-firm) transactions in recent Census data. Which of Antràs's contractual predictions does this fact, together with the concentration of intra-firm trade in capital- and R&D-intensive products, support? What would be a naive alternative explanation that the property-rights model is designed to improve on?
::: solution
Headquarter-intensive, hold-up-prone processes are integrated, so intra-firm trade should be large in capital- and R&D-intensive products — which is the pattern. A naive alternative is that intra-firm trade is just "large firms shipping to themselves" without a contractual content, or that integration is about tax or tariff shifting only. Those motives exist (transfer pricing is real); Antràs's prediction is about *which products* are integrated, given hold-up, and that cross-product pattern is the model's extra content.
:::
:::

::: exercise National gains and exiting firms {level=3}
A commentator says: "Melitz shows that trade is gains for superstar firms and losses for everyone else, so the gains-from-trade theorems of chapters 2–4 are obsolete." Identify what is right in the comment and what is wrong, citing [[#prop-selection]] and the Arkolakis–Costinot–Rodríguez-Clare sufficient statistic.
::: solution
Right: opening reallocates toward the upper tail and can exit firms at the bottom; those firms' owners and workers can lose, so the *distribution* of gains is more uneven than a representative-firm model says. Wrong: national CES welfare still rises under the standard assumptions, and the selection channel is *inside* $1-\lambda^{1/\varepsilon}$, not a replacement for it. The gains-from-trade theorems are about the consumption set of a nation (or of a representative agent); Melitz changes the industrial organisation underneath and the identity of the losers, not the existence of a national gain. Compensation remains a possibility theorem, as in [[international-trade/specific-factors#thm-sf-gains]].
:::
:::
