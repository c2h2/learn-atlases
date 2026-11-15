A car maker does not sell to drivers. It sells to dealers, who sell to drivers. A book publisher sells to a retailer; a beer brewer sells to a bar. Whenever two mark-ups are stacked on the same product, the retail price is higher, and the quantity lower, than a single integrated monopolist would choose. That is **double marginalisation**, the oldest result in vertical industrial organisation, and it is the reason a manufacturer might want to *cap* the retail price, to charge a two-part wholesale tariff, or to own the retailer. The same instruments — resale-price maintenance, exclusive dealing, tying, vertical integration — can also be used to exclude a rival. This chapter treats both faces: the efficiency face (undoing successive mark-ups, preventing free-riding on retail service) and the foreclosure face (denying a rival a crucial input or a crucial outlet).

The Chicago school of the 1960s and 1970s (Director, Bork, Posner) argued that the efficiency face is the default and that a firm cannot, in general, earn two monopoly profits from one chain. Post-Chicago vertical IO (Ordover, Saloner and Salop 1990; Hart and Tirole 1990; Rey and Tirole 2007) mapped the exceptions: when contracts are unobservable, when commitment is imperfect, when a bottleneck input is sold to competing downstream firms. Competition-policy practice in the US, the EU and China now uses both vocabularies; the models are the way to keep them apart.

## Double marginalisation

::: definition Successive monopolies {#def-successive}
An **upstream** monopolist produces an input at constant marginal cost $c$ and sells it at a linear wholesale price $w$ to a **downstream** monopolist, who converts one unit of input into one unit of a final good at zero extra cost and faces inverse demand $p(q)$. The downstream firm takes $w$ as given. There is no other use for the input, no other supplier, and no two-part tariff. **Double marginalisation** is the gap between the resulting retail price and the price an integrated monopolist with cost $c$ would charge.
:::

::: proposition Linear double marginalisation {#prop-dm}
With $p = a - bq$ and $0 \le c < a$, the unique linear-tariff equilibrium is
$$
w = \frac{a+c}{2}, \qquad q = \frac{a-c}{4b}, \qquad p = \frac{3a+c}{4}.
$$ {#eq-dm}
Industry profit is $3(a-c)^2/(16b)$, which is strictly less than the integrated monopoly profit $(a-c)^2/(4b)$. The retail price exceeds the integrated monopoly price $(a+c)/2$, and deadweight loss is larger. A two-part tariff $w = c$ plus a fixed fee $F$ equal to the downstream monopoly profit restores the integrated outcome and lets the upstream firm capture the whole profit if its bargaining power is sufficient to set $F$.
:::

::: proof
Downstream: $\mathrm{MR} = a - 2bq = w$, so $q = (a-w)/(2b)$ and $p = (a+w)/2$. Inverse derived demand for the input is $w(q) = a - 2bq$. Upstream maximises $(w-c)q = (a-2bq-c)q$; the first-order condition $a-c-4bq = 0$ gives $q = (a-c)/(4b)$, $w = (a+c)/2$, $p = a - (a-c)/4 = (3a+c)/4$. Industry profit $(p-c)q = ((3a+c)/4 - c)(a-c)/(4b) = (3(a-c)/4)(a-c)/(4b) = 3(a-c)^2/(16b)$. Integrated profit is $(a-c)^2/(4b) = 4(a-c)^2/(16b)$.

A two-part tariff with $w=c$ makes the downstream firm an ordinary monopolist with cost $c$, so $q = (a-c)/(2b)$ and downstream profit $(a-c)^2/(4b)$. The upstream firm sets $F$ up to that amount and produces the efficient (integrated) quantity.
:::

::: widget plot
f: a - b*x; a - 2*b*x; c + 0*x; a - 4*b*x
x: 0, 12
y: 0, 14
sliders: a=12:8:16:0.5; b=1:0.5:2:0.1; c=2:0:5:0.5
labels: \text{final demand } p; \text{downstream MR, upstream demand}; \text{MC}=c; \text{upstream MR}
caption: Double marginalisation with linear demand. Downstream MR is the derived demand facing upstream; upstream MR crosses $c$ at half the already-monopoly quantity. Start at $a=12$, $b=1$, $c=2$: integrated monopoly is $q=5$, $p=7$; successive monopolies are $q=2.5$, $p=9.5$. The extra $2.5$ of price is the second mark-up. Raise $c$: both quantities shrink.
:::

::: example The water chain {#ex-dm}
$p = 12 - q$, $c = 2$. Compute $w$, $q$, $p$, both profits, and the integrated benchmark. How large is the extra deadweight loss of the second mark-up?
::: solution
$w = 7$, $q = 2.5$, $p = 9.5$. Downstream profit $(9.5-7)\cdot 2.5 = 6.25$; upstream $(7-2)\cdot 2.5 = 12.5$; total $18.75$. Integrated: $q=5$, $p=7$, profit $25$. Deadweight loss relative to competition ($q=10$): successive monopolies $\int_{2.5}^{10}(10-q)\,\mathrm{d}q = [10q-q^2/2]_{2.5}^{10} = 50 - (25 - 3.125) = 28.125$; integrated monopoly DWL $= 12.5$. The second mark-up more than doubles the DWL.
:::
:::

Spengler (1950, *Journal of Political Economy*) is the classic reference. The result is the reason a manufacturer of a unique product may *want* downstream competition, or a cap on the retail price: both push $p$ toward $(a+c)/2$. It is also the reason vertical *integration* of two monopolies can lower the price, which is the opposite of the horizontal-merger intuition of [[industrial-organisation/cournot-bertrand#prop-welfare-rank]].

::: quiz
An upstream monopolist and a downstream monopolist, linear demand, linear wholesale price. Compared with vertical integration, the retail price is
- [ ] lower, because there is more competition
- [x] higher, because two mark-ups are stacked
- [ ] the same, by the Chicago one-monopoly-profit argument
- [ ] higher if and only if demand is inelastic
::: solution
[[#prop-dm]] : $p = (3a+c)/4 > (a+c)/2$. The Chicago argument applies to a *single* bottleneck and a competitive complementary good, not to two successive monopolies each of which takes a linear price as given. Demand elasticity changes the *size* of the gap, not its sign, in the linear-constant-cost case.
:::
:::

## Vertical restraints that undo the second mark-up

A **vertical restraint** is a contract clause other than a linear wholesale price: a two-part tariff (franchise fee), a quantity floor or ceiling, a resale-price floor or ceiling, exclusive dealing, exclusive territories, tying.

::: proposition Instruments that replicate integration {#prop-instruments}
In the successive-monopoly environment of [[#def-successive]], any of the following restores the integrated quantity $q^m = (a-c)/(2b)$: (i) a two-part tariff with $w = c$ and $F$ up to $\pi^m$; (ii) a maximum resale price $p \le p^m$ together with $w$ high enough to extract the rent; (iii) a quantity requirement $q \ge q^m$ at a suitable $w$; (iv) vertical integration. Assumptions: one downstream firm, observable contracts, no uncertainty, no other products. If there are several downstream firms that compete in prices and the product is homogeneous, a linear $w = c$ already achieves $p = c$ (Bertrand) and the upstream firm needs a different instrument — a two-part tariff, or a resale-price *floor* — if it wants to protect a downstream margin for service.
:::

::: proof
(i) is in [[#prop-dm]]. (ii): if $p$ cannot exceed $p^m$, the downstream firm facing $w \le p^m$ will set $p = p^m$ provided $w$ is not so high as to make a lower $p$ better; setting $w = p^m$ and forcing $p \le p^m$ makes downstream profit zero and quantity $q^m$ if the constraint binds at the integrated point. (iii) is the dual of (ii). (iv) is the definition of integration. The many-retailer caveat: homogeneous Bertrand retailers facing $w$ set $p = w$, so the manufacturer who wants $p = p^m$ sets $w = p^m$ and does not need a further restraint for the *price*, but then retailers earn zero and will not provide costly service; a floor $p \ge p^m$ (RPM) or exclusive territories can restore a downstream rent. Telser (1960) is the service argument for RPM.
:::

Two efficiency rationales other than double marginalisation are standard.

- **Free-riding on service** (Telser 1960, *Journal of Law and Economics*). Pre-sale advice, showrooms, and quality certification are provided by one retailer and captured by another who discounts. A resale-price floor, or exclusive territories, reduces the incentive to free-ride. The argument requires that the service be a real input into demand, not just a transfer among retailers.
- **Hold-up of specific investment** (Klein, Crawford and Alchian 1978; Williamson). A franchisee who invests in local reputation, or a supplier who invests in a dedicated mould, is exposed to renegotiation. Exclusive dealing, long-term contracts, or integration can protect the investment. The argument requires an investment that is specific and a contract that is incomplete.

Both are efficiency theories of restraints that look, on the page, like exclusion. Distinguishing them from foreclosure is the empirical and legal task; the models say what evidence would help (was there a service that rivals were free-riding on? was there a specific investment?).

::: example A two-part tariff that extracts {#ex-two-part-v}
Upstream cost $c = 2$, downstream faces $p = 12 - q$. Design a two-part tariff that implements $q = 5$ and gives the upstream firm the whole integrated profit. What if downstream’s outside option is $4$, not $0$?
::: solution
Set $w = 2$. Downstream earns $\pi^m = 25$ and produces $q = 5$. Set $F = 25$. Upstream earns $F = 25$ and zero on the usage. If the outside option is $4$, participation requires $25 - F \ge 4$, so $F \le 21$. Upstream then earns $21$, downstream $4$, quantity still $5$. The usage price, not the fee, is what fixes efficiency; the fee distributes the surplus.
:::
:::

## Foreclosure

**Foreclosure** is a restriction on a rival’s access to an input or to customers. Vertical integration, exclusive dealing, tying, and a refusal to deal can all be foreclosure in this sense. They can also be the efficiency instruments of the previous section. The post-Chicago contribution was to write games in which foreclosure raises the incumbent’s profit *and* lowers welfare, without assuming that the incumbent can simply “leverage” a monopoly from one market into another.

::: definition Input foreclosure {#def-foreclose}
An upstream firm $U$ is a bottleneck (a monopolist, or one of a tight oligopoly) selling an input to downstream firms $D_1, D_2$ that compete in a final market. **Input foreclosure** is a decision by $U$ (or by an integrated $U$–$D_1$) that raises $D_2$’s input cost, or cuts $D_2$ off, in a way that is profitable for the foreclosing party because it softens downstream competition. **Customer foreclosure** is the symmetric restriction on a rival *upstream* firm’s access to downstream outlets.
:::

Three mechanisms are worth naming.

**Raising rivals’ costs** (Salop and Scheffman 1983, 1987). If $U$–$D_1$ refuses to supply $D_2$, and $D_2$ must turn to an inferior alternative, $D_2$’s cost rises, $D_2$ becomes a softer competitor, and $D_1$’s downstream profit can rise by more than $U$ loses in wholesale margin. The conditions are that the alternative input is inferior *enough*, and that downstream competition is not already so soft that the extra softening is worthless.

**Commitment and unobservable contracts** (Hart and Tirole 1990; O’Brien and Shaffer 1992; McAfee and Schwartz 1994). An upstream monopolist who sells to two downstream firms with *secret* bilateral contracts has a commitment problem: after contracting with $D_1$, the monopolist wants to offer $D_2$ a cheap input and free-ride on $D_1$’s margin. Downstream firms foresee this and will not pay for protection. Exclusive dealing, or public contracts, or integration, can restore commitment to restrict supply, which raises the manufacturer’s profit and the retail price. Here foreclosure (or exclusivity) is a substitute for a commitment technology.

**Naked exclusion** (Rasmusen, Ramseyer and Wiley 1991; Segal and Whinston 2000). An incumbent needs a critical mass of exclusive contracts with buyers to deprive an entrant of scale. If buyers are not coordinated, the incumbent can sign up enough of them cheaply — each buyer is pivotal only when the others have not signed, and the incumbent can discriminate. Exclusive dealing then deters efficient entry even though each buyer would prefer, *collectively*, to remain free.

The Chicago “one monopoly profit” argument is the useful special case in which none of these mechanisms is present: a bottleneck monopolist selling to a competitive complementary sector already extracts the monopoly rent with a linear (or two-part) price, and excluding a more efficient complement would *lower* the bottleneck’s profit. The argument fails when the complement is itself imperfectly competitive, when contracts are secret, or when scale economies make buyers’ exclusivity decisions interdependent.

::: example Raising a rival’s cost, arithmetic {#ex-rrc}
Downstream differentiated Bertrand: $q_i = 12 - 2p_i + p_j$, as in [[industrial-organisation/cournot-bertrand#ex-diff]]. Currently both downstream firms have input cost $c = 2$ and $p^* = 16/3$, $\pi_i = 200/9$. Suppose integration of $U$ with $D_1$ raises $D_2$’s input cost to $5$ (an inferior alternative) while $D_1$’s cost stays at $2$, and $U$ forgoes a wholesale margin of $1$ on $D_2$’s former quantity $20/3$. Using the differentiated-Bertrand best responses of [[industrial-organisation/cournot-bertrand#eq-diff-br]] with possibly unequal costs, $p_i = (\alpha + \gamma p_j + \beta c_i)/(2\beta)$, compute the new Nash prices (approximately is not needed: solve the two-linear system) and $D_1$’s new downstream profit. Is the foreclosure profitable ignoring $U$’s lost wholesale margin? With the lost margin?
::: solution
$\alpha=12$, $\beta=2$, $\gamma=1$, $c_1=2$, $c_2=5$. Best responses: $p_1 = (12 + p_2 + 4)/4 = 4 + p_2/4$, $p_2 = (12 + p_1 + 10)/4 = 5.5 + p_1/4$. Substitute: $p_1 = 4 + (5.5 + p_1/4)/4 = 4 + 1.375 + p_1/16$, so $(15/16)p_1 = 5.375$, $p_1 = 5.375 \cdot 16/15 = 86/15 \approx 5.733$. Then $p_2 = 5.5 + (86/15)/4 = 5.5 + 86/60 = 5.5 + 1.433 = 6.933 = 104/15$. Quantities: $q_1 = 12 - 2(86/15) + 104/15 = 12 + (-172+104)/15 = 12 - 68/15 = (180-68)/15 = 112/15 \approx 7.467$. $q_2 = 12 - 2(104/15) + 86/15 = 12 + (-208+86)/15 = 12 - 122/15 = (180-122)/15 = 58/15 \approx 3.867$. $D_1$’s downstream profit $(86/15 - 2)\cdot 112/15 = (56/15)\cdot(112/15) = 6272/225 \approx 27.876$. Pre-integration downstream profit was $200/9 \approx 22.222$. The downstream gain is about $5.65$. Lost wholesale margin $1 \times 20/3 \approx 6.67$. Net, in this arithmetic, foreclosure *loses* about $1$ — the rival’s-cost increase is not large enough to compensate the lost wholesale business. Raising $c_2$ further, or making products closer substitutes (which makes the softening more valuable), would flip the sign. The example is the method, and a warning that foreclosure is not automatically profitable.
:::
:::

::: warning Vertical integration is not a horizontal merger
A merger of two successive monopolists in [[#prop-dm]] *lowers* the price. A merger of two Cournot competitors *raises* it, absent synergies. Calling both “mergers” and applying a horizontal HHI screen to a vertical deal is a category error. Vertical merger guidelines (US DOJ/FTC 2020 Vertical Merger Guidelines, withdrawn in 2021 and succeeded by the 2023 Merger Guidelines’ vertical discussion; EU Non-Horizontal Merger Guidelines 2008) ask about the foreclosure mechanisms of this section, and about the double-marginalisation *efficiency*, not about $\Delta\mathrm{HHI}$ in a single relevant market.
:::

## Tying

A firm that sells two products can **tie**: the buyer of $A$ must also take $B$. Chicago (Director; Bowman 1957) asked why, if $A$ is already a monopoly, the firm would not rather sell $B$ separately and extract the monopoly rent on $A$ with its price. Two families of answers survive.

- **Price discrimination / metering** (Burstein 1960; later, the Adams–Yellen bundling of [[industrial-organisation/monopoly-pricing]]). A copier monopolist who ties paper, or a machine monopolist who ties a consumable, meters intensity of use. The tie is a two-part tariff in disguise.
- **Entry deterrence in the tied market** (Whinston 1990, *American Economic Review*). If $B$ has scale economies, tying can commit the monopolist in $A$ to be aggressive in $B$, deny a rival in $B$ the scale it needs, and protect $A$ if the rival in $B$ would otherwise have become a competitor in $A$ as well (Choi and Stefanadis 2001; Carlton and Waldman 2002). The argument needs the scale economy and a dynamic link; it is not a general licence to treat every tie as exclusion.

The welfare comparison is case-by-case. A metering tie can be a two-part tariff that *lowers* the usage price; an exclusionary tie can be a Dixit commitment in another market.

## Where this leads

Platforms in [[industrial-organisation/platforms-and-networks]] are vertical structures with two (or more) downstream sides and cross-group externalities; the two-part tariff of this chapter becomes a pair of prices, one of which may be negative. Competition policy treats vertical mergers, exclusive dealing, RPM and tying under abuse-of-dominance and merger control; the US, EU and Chinese texts are not identical, and they are dated in [[industrial-organisation/competition-policy]]. The modelling habit to take there is the one practised here: name the externality (double margin, free-riding, secret contracts, scale) before naming the clause.

::: history
**1950, Joseph J. Spengler.** “Vertical integration and antitrust policy”, *Journal of Political Economy* 58: double marginalisation as an argument *for* integration.

**1960, Lester G. Telser.** “Why should manufacturers want fair trade?”, *Journal of Law and Economics* 3: RPM as a response to free-riding on retail service.

**1978, Benjamin Klein, Robert G. Crawford and Armen A. Alchian.** “Vertical integration, appropriable rents, and the competitive contracting process”, *Journal of Law and Economics* 21: hold-up and specific investment.

**1990, Janusz A. Ordover, Garth Saloner and Steven C. Salop; Oliver Hart and Jean Tirole.** Raising rivals’ costs through integration (*American Economic Review* 80) and vertical integration with unobservable contracts (*Brookings Papers: Microeconomics* 1990).

**1990, Michael D. Whinston.** “Tying, foreclosure, and exclusion”, *American Economic Review* 80: tying as a commitment to be aggressive in the tied market.

**1991, Eric B. Rasmusen, J. Mark Ramseyer and John S. Wiley Jr.** “Naked exclusion”, *American Economic Review* 81: exclusive dealing that exploits uncoordinated buyers.
:::

::: summary
- **Double marginalisation**: two linear mark-ups yield $q = (a-c)/(4b)$ and $p = (3a+c)/4$, worse for buyers *and* for industry profit than integration. A two-part tariff with $w = c$ undoes it.
- Vertical restraints (two-part tariffs, maximum RPM, quantity floors, integration) can replicate the integrated outcome. Minimum RPM and exclusive territories can protect a service margin against free-riding (Telser) or a specific investment against hold-up.
- **Foreclosure** raises a rival’s cost or denies scale. It is profitable only under extra conditions (inferior alternative, secret contracts, uncoordinated buyers, scale economies). Chicago’s one-monopoly-profit argument is the benchmark when those conditions fail.
- A **vertical** merger can lower price (undropped double margin) or raise it (foreclosure). It is not a horizontal merger and is not screened by $\Delta\mathrm{HHI}$ in one market.
- **Tying** can meter (price discrimination) or deter entry in the tied market (Whinston). Neither use is a welfare theorem on its own.
:::

## Exercises

::: exercise Double-margin quantity {level=1 check="3"}
$p = 20 - q$, $c = 8$. Compute the successive-monopoly quantity. (Enter $q$.)
::: solution
$q = (20-8)/(4\cdot 1) = 3$. Then $w = (20+8)/2 = 14$, $p = (60+8)/4 = 17$. Integrated $q^m = 6$, $p^m = 14$.
:::
:::

::: exercise Integrated price {level=1 check="14"}
In the previous exercise, compute the integrated monopoly price. (Enter $p^m$.)
::: solution
$p^m = (20+8)/2 = 14$. The successive-monopoly price is $17$, three units of money higher.
:::
:::

::: exercise Two-part fee {level=1 check="36"}
$p = 18 - q$, $c = 6$. An upstream firm sets $w = 6$ and a fee $F$ that extracts the whole downstream profit, with outside option zero. Compute $F$. (Enter $F$.)
::: solution
Downstream is a monopolist with cost 6, $q^m = 6$, $\pi^m = 36$, so $F = 36$. Quantity is the integrated quantity; upstream earns 36.
:::
:::

::: exercise Extra DWL {level=2}
For $p = 12-q$, $c=2$, compute DWL under successive monopolies and under integration, relative to $p=c$. Confirm the extra DWL of the second mark-up.
::: solution
Competitive $q=10$. Integration: $q=5$, DWL $=12.5$. Successive: $q=2.5$, DWL $= \int_{2.5}^{10}(10-q)\,\mathrm{d}q = [10q-q^2/2]_{2.5}^{10} = 50 - (25-3.125) = 28.125$. Extra DWL $= 15.625$. Equivalently, between $q=2.5$ and $q=5$ the integrand is $10-q$, and $[10q-q^2/2]_{2.5}^{5} = (50-12.5) - (25-3.125) = 15.625$.
:::
:::

::: exercise Downstream competition kills the second margin {level=2}
Suppose the upstream monopolist sells, at a linear $w$, to *two* homogeneous Bertrand retailers who have no other cost. What retail price emerges, as a function of $w$? What $w$ does the upstream firm choose, and what is the retail price? Compare with [[#eq-dm]].
::: solution
Bertrand retailers set $p = w$. Inverse demand facing upstream is therefore the final demand, $w = a - bq$, and upstream is an ordinary monopolist: $w = (a+c)/2$, $q = (a-c)/(2b)$, $p = (a+c)/2$. Downstream competition *eliminates* double marginalisation for the price (and eliminates downstream profit). Compared with [[#eq-dm]], quantity doubles and the retail price falls from $(3a+c)/4$ to $(a+c)/2$. The manufacturer prefers this, on profit grounds, to a single downstream monopolist on a linear tariff; it does not prefer it if retailers must be given a margin to provide service.
:::
:::

::: exercise Raising-rivals’-cost system {level=2}
In the demand system $q_i = 12 - 2p_i + p_j$, costs $c_1 = 2$, $c_2 = 4$. Compute the differentiated-Bertrand Nash prices using $p_i = (12 + p_j + 2 c_i)/4$.
::: solution
$p_1 = (12 + p_2 + 4)/4 = 4 + p_2/4$, $p_2 = (12 + p_1 + 8)/4 = 5 + p_1/4$. Then $p_1 = 4 + (5 + p_1/4)/4 = 4 + 1.25 + p_1/16$, $(15/16)p_1 = 5.25$, $p_1 = 5.25 \cdot 16/15 = 84/15 = 5.6$. $p_2 = 5 + 5.6/4 = 5 + 1.4 = 6.4$. Check: $4 + 6.4/4 = 4+1.6 = 5.6$. Quantities $q_1 = 12 - 11.2 + 6.4 = 7.2$, $q_2 = 12 - 12.8 + 5.6 = 4.8$.
:::
:::

::: exercise When Chicago applies {level=3}
An upstream monopolist $U$ produces a widget at cost $c$ and sells to a *perfectly competitive* downstream industry that converts widgets one-for-one at extra cost $0$. Final demand is $p = a - bq$. (a) What linear $w$ does $U$ set, and what is $p$? (b) A more efficient downstream technology, cost $-\Delta$ (a complement that lowers downstream cost), appears. Would $U$ want to exclude it, or to supply it? (c) Which assumption, if dropped, re-opens a foreclosure incentive? Name one from this chapter.
::: hint
In (a) competitive downstream means $p = w$. In (b) a lower downstream cost *raises* residual demand for the widget.
:::
::: solution
(a) $p = w$, so $U$ faces final demand and sets $w = (a+c)/2 = p$. This is the one-monopoly-profit benchmark: $U$ already earns $\pi^m$.

(b) The new technology shifts residual demand for widgets *out* (or equivalently lowers the effective cost). $U$ wants the technology used, and will supply it, possibly at a different $w$. Exclusion would shrink the pie $U$ already fully extracts. This is Chicago.

(c) Drop downstream competition (successive monopoly, [[#prop-dm]]); or make contracts with two downstream oligopolists secret (Hart–Tirole); or give the complement scale economies that threaten $U$’s position in a future period (Whinston tying). Any one of these creates a profit from exclusion that the competitive-complement case does not have.
:::
:::

::: exercise Secret contracts and the commitment problem {level=3}
An upstream monopolist sells to two Cournot downstream firms by secret two-part tariffs. Explain, in the sequence of offers, why the monopolist cannot commit to the industry-profit-maximising input restriction, and how an exclusive contract with one downstream firm would restore commitment. Then state the welfare direction of that exclusivity in the linear model (does the retail price rise or fall relative to secret, non-exclusive contracts?).
::: hint
After $D_1$ has accepted a contract that assumes $D_2$ will be restricted, the monopolist wants to expand sales to $D_2$. $D_1$ foresees this. Exclusivity prevents the second sale. Secret non-exclusive contracts tend toward the Cournot outcome with input at cost; exclusivity tends toward monopoly.
:::
::: solution
Sequence: $U$ offers $(w_1, F_1)$ to $D_1$. If $D_1$ accepts, $U$ then offers $(w_2, F_2)$ to $D_2$. At that point $D_1$’s fee is sunk, and $U$ wants $w_2$ low (near cost) to expand the pie it splits with $D_2$, even though that pie expansion comes partly from $D_1$’s margin. $D_1$, foreseeing the opportunistic second deal, will not pay an $F_1$ that assumes a restricted $D_2$. The equilibrium of secret bilateral two-part tariffs tends to $w_i = c$ and Cournot downstream quantities — too much output relative to the integrated monopoly.

An exclusive contract with $D_1$ forbids the second deal. $U$ and $D_1$ then jointly set the monopoly quantity and split the monopoly profit by $F_1$. Commitment is restored.

Welfare: exclusivity *raises* the retail price, from the Cournot price toward the monopoly price. The same clause that is an efficiency instrument against double marginalisation in a *single* downstream monopolist is a collusion-like instrument against downstream competition when there are two. Observability of contracts, and the number of downstream firms, decide which face one is looking at.
:::
:::
