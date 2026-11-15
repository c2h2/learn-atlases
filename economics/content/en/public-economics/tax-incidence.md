A legislature writes a 10 per cent payroll tax "on employers". Workers protest that they will be poorer; employers protest that they will be poorer; both can be right in part, and the statute does not decide which. **Statutory incidence** is who writes the cheque. **Economic incidence** is who is worse off once prices have adjusted. This chapter is the positive theory of that adjustment, in partial equilibrium and then in a glimpse of general equilibrium. Efficiency costs — the surplus that nobody gets — wait for [[public-economics/efficiency-costs-of-taxation]]. Nothing here is tax advice; examples use illustrative rates unless a dated statutory rate is cited.

The main theorem of partial-equilibrium incidence is that the split of a small tax between buyers and sellers is determined by elasticities of demand and supply, not by the side of the market the law names. Perfectly elastic supply puts the tax on buyers; perfectly inelastic supply puts it on sellers. The same logic is why a tax on "land" and a tax on "landlords" are closer than the words suggest, and why a corporate income tax is not, as a matter of theory, a tax on shareholders only.

## Statutory versus economic incidence

::: definition Statutory and economic incidence {#def-incidence}
The **statutory incidence** of a tax is the identity of the person or firm on whom the law imposes the legal liability to pay. The **economic incidence** is the change in real income of each agent after all prices (including wages and returns) have adjusted. Economic incidence is a positive object: it does not say whether the resulting distribution is desirable.
:::

::: proposition Invariance of a unit tax to statutory side {#prop-invariance}
In a competitive market with a well-defined equilibrium, a unit (specific) tax of $t$ per unit levied on buyers produces the same quantity, the same price received by sellers, and the same price paid by buyers as the same tax levied on sellers. Assumptions: price-taking, a private good, no other distortions, and the tax defined on the same quantity.
:::
::: proof
Let inverse demand be $P_b = D(q)$ and inverse supply $P_s = S(q)$. A tax $t$ on sellers is the wedge $D(q)=S(q)+t$. A tax $t$ on buyers is $D(q)-t=S(q)$. These are the same equation. The buyer's price is $D(q)$ and the seller's is $S(q)$ in both cases, with $D(q)-S(q)=t$.
:::

Ad valorem (percentage) taxes have a slightly different invariance: a tax at rate $\tau$ on the *buyer's* price is not algebraically identical to a tax at rate $\tau$ on the *seller's* price, because $\tau P_b$ and $\tau P_s$ differ by a second-order term. For small $\tau$ the difference vanishes. Legislatures sometimes care about the distinction when rates are large (VAT versus retail sales tax is a related administrative issue, not an incidence theorem).

::: warning The cheque-writer is not the bearer
A payroll tax split "half on the employer, half on the employee" is a statutory sentence. If labour supply is inelastic and labour demand is elastic, economic incidence is mostly on workers either way, in the standard competitive model. Empirically the split can matter in the short run because of nominal wage rigidity, and it can matter for people outside the model (unemployment, minimum wages, bargaining). The invariance proposition is a benchmark, not a finding that the statute is always irrelevant.
:::

## Partial equilibrium: elasticities do the work

Consider a small specific tax $t$ in a competitive market. Let $\varepsilon_d < 0$ be the price elasticity of demand and $\varepsilon_s > 0$ the price elasticity of supply, both evaluated at the no-tax equilibrium. Let $dp_b$ be the change in the buyer price and $dp_s=dp_b-t$ the change in the seller price.

::: theorem Partial-equilibrium incidence formula {#thm-pe-incidence}
For a small specific tax $t$ in a competitive market,

$$
\frac{dp_b}{t} = \frac{\varepsilon_s}{\varepsilon_s - \varepsilon_d}, \qquad \frac{dp_s}{t} = \frac{\varepsilon_d}{\varepsilon_s - \varepsilon_d}.
$$ {#eq-incidence}

Buyers' share of the tax is $\varepsilon_s/(\varepsilon_s-\varepsilon_d)$; sellers' share is $-\varepsilon_d/(\varepsilon_s-\varepsilon_d)$. Assumptions: differentiable supply and demand, initial $t=0$, price-taking, no income effects in the market under study (or a Marshallian approximation), a closed market (no trade).
:::
::: proof
Differentiating $q^d(p_b)=q^s(p_s)$ and $p_b=p_s+t$ at $t=0$:

$$
\frac{\mathrm{d}q^d}{\mathrm{d}p}\, dp_b = \frac{\mathrm{d}q^s}{\mathrm{d}p}\, dp_s, \qquad dp_b = dp_s + t.
$$

Dividing by $q$ and writing elasticities, $\varepsilon_d\, dp_b = \varepsilon_s\, dp_s$. Substitute $dp_s=dp_b-t$: $\varepsilon_d dp_b = \varepsilon_s(dp_b-t)$. Then $dp_b(\varepsilon_s-\varepsilon_d)=\varepsilon_s t$, which is [[#eq-incidence]]. (Recall $\varepsilon_d<0$ so $\varepsilon_s-\varepsilon_d>0$.)
:::

Limits: $\varepsilon_s\to\infty$ (perfectly elastic supply, the long-run constant-cost industry) gives $dp_b/t=1$: buyers pay all. $\varepsilon_s=0$ (fixed supply, undeveloped land in a simple model) gives $dp_b=0$: sellers pay all. $\varepsilon_d\to-\infty$ (perfectly elastic demand) gives $dp_b=0$: sellers pay all. $|\varepsilon_d|\to 0$ (inelastic demand, addictive goods in the short run) gives $dp_b/t=1$.

::: widget plot
f: 12-0.8*x; 2+0.4*x; 2+0.4*x+t
sliders: t=1.2:0:3
x: 0, 16
y: 0, 14
labels: \text{demand}; \text{supply}; \text{supply plus tax}
caption: Inverse demand $P=12-0.8q$ and inverse supply $P=2+0.4q$. Raise the tax slider: the wedge is $t$, quantity falls, the buyer price rises by less than $t$ and the seller price falls by the rest. At $t=1.2$ the split is $0.8$ on buyers and $0.4$ on sellers — the $2:1$ ratio of the supply and demand slopes (equivalently of $|\varepsilon_s|$ and $|\varepsilon_d|$ at the original equilibrium).
:::

::: example Linear curves, a number {#ex-linear-tax}
Demand $P=12-0.8q$, supply $P=2+0.4q$. A specific tax $t=1.2$ is levied on sellers. Compute the no-tax equilibrium, the after-tax quantity and prices, and each side's share of $t$.
::: solution
No tax: $12-0.8q=2+0.4q$ so $10=1.2q$, $q=25/3\approx 8.333$, $P=16/3\approx 5.333$. After tax: $12-0.8q=2+0.4q+1.2$ so $8.8=1.2q$, $q=22/3\approx 7.333$. Buyer price $P_b=12-0.8\times 22/3=92/15\approx 6.133$. Seller price $P_s=92/15-6/5=74/15\approx 4.933$. Buyers pay $92/15-16/3=0.8$ more; sellers receive $0.4$ less. Shares $2/3$ and $1/3$. Check via elasticities at the original point: $q=(12-P)/0.8$ so $dq/dP=-1.25$, $\varepsilon_d=-1.25\times (16/3)/(25/3)=-0.8$; supply $dq/dP=2.5$, $\varepsilon_s=1.6$. Then $dp_b/t=1.6/(1.6+0.8)=2/3$, $dp_s/t=-0.8/2.4=-1/3$.
:::
:::

::: quiz
A competitive market has perfectly inelastic supply (a vertical supply curve) and downward-sloping demand. A unit tax is levied on buyers. Who bears the tax, and does quantity change?
- [ ] Buyers bear it, and quantity falls
- [x] Sellers bear it (the price they receive falls by $t$), and quantity is unchanged
- [ ] Buyers bear it, quantity unchanged
- [ ] The tax is evaded because it was levied on the wrong side
::: solution
Invariance ([[#prop-invariance]]) says the statutory side does not matter. With $\varepsilon_s=0$, [[#eq-incidence]] gives $dp_b=0$ and $dp_s=-t$: the buyer price is unchanged, the seller price falls by $t$, quantity is fixed by supply. Land in a pure Ricardian model is the classic application; the empirical claim that *actual* land supply is fixed is a different, and disputed, statement.
:::
:::

## Monopoly, subsidies and the rest of partial equilibrium

Incidence is not only a competitive-market formula.

**Monopoly.** A tax on a monopolist's output is shared between the monopolist and buyers according to the shapes of demand and marginal cost, not according to [[#eq-incidence]]. With constant MC and linear demand, a specific tax of $t$ raises the consumer price by $t/2$: the monopolist absorbs half. With constant-elasticity demand $P=A q^{-1/|\varepsilon|}$ and constant MC, $P=\frac{|\varepsilon|}{|\varepsilon|-1}\mathrm{MC}$, so $dP/d\mathrm{MC}=|\varepsilon|/(|\varepsilon|-1)>1$: the price rises by more than $t$ (overshifting). Overshifting is a positive possibility, not a paradox.

**Subsidies.** A subsidy is a negative tax. Incidence of a subsidy on, say, staple food is the same elasticity formula with a sign change: the more inelastic side captures the subsidy. A subsidy "for farmers" with elastic supply of farm products and inelastic consumer demand is, in the model, largely a subsidy to buyers.

**Taxing a factor.** A tax on one factor (a payroll tax on labour) in a competitive factor market is [[#eq-incidence]] with labour demand and labour supply. If labour supply is inelastic, workers bear a payroll tax. That is the textbook first pass at "who pays social security". The second pass is general equilibrium: the tax can change the capital–labour ratio, product prices, and the return to capital (Harberger 1962).

::: example Overshifting under monopoly {#ex-overshift}
A monopolist faces $P=12q^{-1/2}$ (so $\varepsilon_d=-2$) and $\mathrm{MC}=4$. Compute the un-taxed price and the price after a specific tax of $1$ on the monopolist. By how much does $P$ rise?
::: solution
With constant MC and constant elasticity, $P=\frac{\varepsilon}{\varepsilon-1}\mathrm{MC}$ in absolute value: $|\varepsilon|=2$, $P=2\times\mathrm{MC}$. Untaxed: $P=8$. After tax, effective MC $=5$, $P=10$. The price rises by $2>1$: overshifting. Quantity: $12 q^{-1/2}=P$ so $q=(12/P)^2$. Untaxed $q=(12/8)^2=2.25$; taxed $q=(12/10)^2=1.44$.
:::
:::

## General equilibrium: Harberger and beyond

Arnold Harberger's 1962 model of the corporation tax is the canonical general-equilibrium incidence exercise. Two sectors, corporate and non-corporate; two factors, capital and labour, mobile between sectors; a tax on capital used in the corporate sector. The tax drives capital out of the corporate sector, lowering the return to capital *everywhere* (including in the untaxed sector) and changing relative product prices. Who bears the tax depends on elasticities of substitution in production, factor intensities, and demand elasticities between the two goods.

::: proposition Harberger's qualitative messages {#prop-harberger}
In a closed two-sector competitive economy with mobile factors: (i) the statutory assignment of a partial factor tax to "capital in sector $C$" does not confine economic incidence to owners of capital in $C$; (ii) if capital is inelastically supplied to the economy and the substitution possibilities are rich enough, capital as a whole can bear more or less than 100 per cent of a tax on capital in $C$; (iii) labour can bear part of a "capital" tax through a lower real wage. Assumptions: full employment, closed economy, competitive factor markets, no other distortions.
:::

Open-economy public finance changes (iii). If capital is perfectly mobile internationally and labour is not, a small open country that taxes capital sees capital leave until the *net* return equals the world return; incidence then falls on the immobile factors (land, labour) and on any sector-specific rents (Gordon 1986; Auerbach 2006 surveys). That is a model, not a finding that Ireland's corporation tax is borne by Irish workers; the empirical literature on corporation-tax incidence is unsettled (Gruber's text and Auerbach's handbook chapter review estimates that range from substantial shifting onto labour to substantial remaining burden on capital). We report the range, not a winner.

Spatial incidence is another general-equilibrium channel. A tax on housing in one city is borne, in the long run, by the inelastic factor — land — if people and capital can move (the Tiebout–Oates world of [[public-economics/public-choice]]). A tax on a city-specific amenity that cannot move is borne by the owners of that amenity.

::: example A subsidy to sellers {#ex-subsidy}
Demand $P=20-q$, supply $P=2+q$. A subsidy of $4$ per unit is paid to sellers. Find the new quantity, the price buyers pay, and the price sellers receive. Who captures the subsidy?
::: solution
$20-q=2+q-4$, so $22=2q$, $q=11$. Buyers pay $P_b=9$; sellers receive $P_s=13$. Relative to the no-subsidy equilibrium $(q,P)=(9,11)$, buyers pay $2$ less and sellers receive $2$ more: the $\$4$ is split equally. At the original point the two slopes are equal in absolute value, so $|\varepsilon_d|=\varepsilon_s$ and [[#eq-incidence]] gives an equal split. The statutory phrase "paid to sellers" did not matter.
:::
:::

::: example Payroll tax, inelastic labour supply {#ex-payroll}
Labour supply is vertical at $N=10$; labour demand is $w=24-N$. A payroll tax of $4$ is levied on employers. Find the wage workers receive and the wage firms pay.
::: solution
Employment stays $10$. Demand price (wage firms pay) is $w_b=24-10=14$, unchanged. Workers receive $w_s=14-4=10$. The entire tax is on workers, matching $\varepsilon_s=0$ in [[#thm-pe-incidence]]. Statutory incidence on employers was irrelevant.
:::
:::

::: intuition Follow the inelastic factor
A reliable mnemonic, not a substitute for the formula: taxes stick to the side of the market, or the factor, that cannot escape. Land cannot escape (in the pure model). Capital can escape a small open economy. Consumers can escape a single-brand tax more easily than a broad VAT. The mnemonic fails when there is market power (overshifting), when there are rents, and when the short run differs from the long run (capital is sunk, then mobile).
:::

## Evidence

Incidence is hard to see because the counterfactual price is not observed. The empirical literature uses reforms, borders and tax holidays.

- **Retail sales taxes and VAT.** Poterba (1996) and Besley and Rosen (1999) found that US city and state sales taxes on some goods were fully, and sometimes more than fully, shifted to consumer prices. VAT pass-through in European reforms is typically high for broad bases (Benedek, De Mooij, Keen and Wingender, IMF working papers; Benzarti, Carloni, Harju and Kosonen 2020, *American Economic Review*, find asymmetric pass-through of VAT cuts and hikes in Finnish restaurants). High pass-through is what [[#thm-pe-incidence]] predicts when supply is elastic in the long run.
- **Excises on tobacco and fuel.** A large body of work finds high pass-through of cigarette and petrol excises to consumer prices, consistent with inelastic demand (Harding, Leibtag and Lovenheim 2012 on US cigarettes; Marion and Muehlegger 2011 on US diesel). That is why these taxes raise revenue and why their distributional incidence, on a relative-to-expenditure basis, is often regressive — a statement about *who consumes the good*, not a statement that the tax is a good or bad idea.
- **Payroll taxes.** Standard competitive estimates, and several reform studies, attribute most of a payroll tax to workers in the long run (Gruber 1994, 1997 on Chile and on employer-mandated benefits; Saez, Matsaganis and Tsakloglou 2012 on a Greek reform found less short-run shifting). Nominal rigidities and minimum wages break invariance in the short run.
- **Corporation tax.** Suárez Serrato and Zidar (2016, *American Economic Review*) estimate that US state corporate taxes are borne in part by workers and landowners as well as by firm owners. Fuest, Peichl and Siegloch (2018, *American Economic Review*) find substantial shifting onto wages from German local business-tax variation. Both papers are part of an active literature; estimates of labour's share of the burden range widely.

::: application Who pays a petrol tax in Kenya and in France?
Petrol (gasoline) taxes are a large share of the pump price in France and a smaller, more variable share in Kenya (IEA and national revenue authorities; rates change, so any number must be dated). Demand is inelastic in the short run in both places; supply of *refined petrol at the pump* is relatively elastic once the world oil price is taken as given. Partial-equilibrium incidence then puts most of a national excise on buyers. Distributional incidence differs: in France car use is broad; in Kenya it is concentrated in higher-income urban households, so a petrol tax can be progressive in incidence even if it is a commodity tax (World Bank and national household surveys have documented this pattern in several African countries). The environmental Pigouvian case is a different, normative, argument ([[public-economics/externalities]]).
:::

::: history
David Ricardo's *Principles* (1817) already argued that a tax on rent falls on landlords. Harry Gunnison Brown and, later, the formal partial-equilibrium apparatus of public finance made elasticities the organising idea. Arnold Harberger, "The Incidence of the Corporation Income Tax" (*Journal of Political Economy*, 1962), opened general-equilibrium incidence. Richard Musgrave's *The Theory of Public Finance* (1959) distinguished statutory and economic incidence for a generation of students. The empirical pass-through literature is much more recent: identification from borders, from staggered reforms, and from administrative price data.
:::

## Where this leads

Deadweight loss ([[public-economics/efficiency-costs-of-taxation]]) is the surplus lost because $q$ changes; incidence is about the remaining surplus. Optimal commodity taxes ([[public-economics/optimal-taxation]]) *use* incidence: a tax on an inelastic base has a small efficiency cost and a concentrated economic incidence. Redistribution ([[public-economics/redistribution]]) needs incidence to know whether a "tax on capital" or a "tax on consumption" is progressive. Environmental levies inherit the same formulae.

::: summary
- Statutory incidence is the cheque; economic incidence is the change in real incomes ([[#def-incidence]]). In competitive partial equilibrium the statutory side does not matter ([[#prop-invariance]]).
- The split of a small tax is $\varepsilon_s:|\varepsilon_d|$ ([[#thm-pe-incidence]]). Inelastic sides bear taxes; elastic sides escape.
- Monopoly can overshift. Subsidies are negative taxes. Factor taxes follow factor elasticities in partial equilibrium and leak across factors and sectors in general equilibrium ([[#prop-harberger]]).
- Open-economy models push taxes off internationally mobile capital onto immobile factors. That is a benchmark, and the corporation-tax evidence is mixed.
- Empirically, broad commodity taxes often show high pass-through to consumer prices; payroll-tax incidence is mostly on workers in long-run competitive estimates, with short-run exceptions.
:::

## Exercises

::: exercise Read the statute {level=1}
A city levies a \$2 per night tax "on hotel operators". Using [[#prop-invariance]], what extra information do you need to say who is poorer, and what information is *not* relevant in the competitive model?
::: solution
You need the elasticities of demand for hotel nights and of supply of hotel rooms (and, beyond the model, market power, the time horizon, and whether the tax applies to close substitutes). The statute's phrase "on hotel operators" is not relevant in the competitive invariance result.
:::
:::

::: exercise Perfectly elastic supply {level=1 check="1"}
$\varepsilon_s=\infty$, $\varepsilon_d=-2$, a small specific tax $t$. What is $dp_b/t$? (Enter the buyers' share.)
::: solution
[[#eq-incidence]]: $dp_b/t = \infty/(\infty+2)=1$. Buyers pay all.
:::
:::

::: exercise Compute the split {level=1 check="0.6"}
$\varepsilon_s=1.5$, $\varepsilon_d=-1$, small $t$. What is the buyers' share $dp_b/t$? (Enter the share as a decimal.)
::: solution
$1.5/(1.5-(-1))=1.5/2.5=0.6$.
:::
:::

::: exercise Linear market {level=2 check="2"}
Demand $P=20-q$, supply $P=2+q$. A tax $t=4$ on sellers. Find the fall in the seller price relative to the no-tax price. (Enter the fall as a positive number.)
::: solution
No tax: $20-q=2+q$, $q=9$, $P=11$. After tax: $20-q=2+q+4$, $q=7$, $P_b=13$, $P_s=9$. Seller price falls by $2$.
:::
:::

::: exercise Ad valorem versus specific {level=2}
In a competitive market, compare a specific tax $t$ with an ad valorem tax $\tau$ that raises the same revenue at the same $q$. Why might a monopolist not be indifferent between them?
::: solution
In competition, any wedge $P_b-P_s$ that is constant at that $q$ is equivalent, so a pair $(t,\tau)$ with $t=\tau P_s$ (or $\tau P_b$, depending on the base) that implements the same wedge is equivalent at that point. Under monopoly, a specific tax shifts MC up in parallel; an ad valorem tax rotates MR and MC (it is a percentage of the consumer price). The profit-maximising $q$ generally differs, and the literature (Suits and Musgrave 1953; later papers) shows that an ad valorem tax can raise more revenue for a given $q$ under monopoly, or equivalently distort $q$ less for given revenue. Incidence formulae differ accordingly.
:::
:::

::: exercise Land {level=2}
In a model where land is in fixed supply and is the only input to a good with perfectly elastic demand (the city is small and the good is traded), who bears a tax on land rent? Who would bear a tax on the *structure* sitting on the land, in the long run, if structures are elastically supplied?
::: solution
Tax on land rent: $\varepsilon_s=0$ for land, so landowners bear all of it; the traded good's price is set on the world market so cannot rise. Tax on structures: elastic long-run supply of structures puts the tax on demanders of structures — occupiers — or, if occupancy demand is also elastic because people can move, onto the remaining inelastic factor, land, via a lower residual bid for sites. This is the standard urban-public-finance conclusion that a pure land tax does not distort building, while a property tax on land-plus-structure does (unless it is equivalent to a land tax plus a tax that is shifted).
:::
:::

::: exercise Payroll tax and a minimum wage {level=3}
Labour demand $w=20-N$, labour supply $w=2+N$, a payroll tax $t=2$ on employers, and a minimum wage of $11$ that binds after the tax. Compare incidence with and without the minimum wage, in this competitive diagram.
::: hint
Without the minimum wage, use the linear method of [[#ex-linear-tax]]. With it, the statutory minimum applies to the wage received by workers, so firms pay that minimum plus the tax.
:::
::: solution
No tax, no minimum: $20-N=2+N$, $N=9$, $w=11$. Tax $t=2$ on employers, no minimum: $20-N=2+N+2$, $N=8$, $w_b=12$ (firm cost), $w_s=10$ (worker). Incidence split equally. Now a minimum wage of $11$ received by workers: firms pay $11+2=13$, demand $N=20-13=7$, supply at $w=11$ is $N=9$, so $N=7$ jobs, $2$ units of unemployment. Workers who remain employed receive $11$ rather than $10$ (they bear less of the tax) and some lose jobs (they bear a lot). Invariance fails because the minimum wage is a constraint on the worker's wage. The competitive incidence formula is not the right tool once the wage is regulated.
:::
:::

::: exercise Harberger in words {level=3}
A closed economy taxes capital in the corporate sector only. Using [[#prop-harberger]], explain how labour can bear part of the tax even though labour is not the statutory base, and how the story changes if capital can flee to the rest of the world.
::: solution
The tax lowers the net return in the corporate sector; capital migrates to the non-corporate sector, raising the capital–labour ratio there and lowering it in the corporate sector. Wages (the marginal product of labour) fall in the corporate sector and may rise or fall on net depending on factor intensities and demand; product prices change. Labour therefore shares the burden through real-wage and price effects. If capital is perfectly mobile internationally, domestic net-of-tax returns cannot fall below the world return: capital leaves the country, the domestic capital–labour ratio falls, and immobile labour (and land) bear more of the tax. The open-economy limit is a theorem about mobility, not a measurement of any particular country's corporation tax.
:::
:::

::: exercise Cigarette pass-through {level=2}
Demand for cigarettes is estimated to be inelastic; supply of a given brand in a state, in the short run, is relatively elastic. A state raises its cigarette excise. What does [[#thm-pe-incidence]] predict for the retail price, and why might a public-health planner *want* that prediction to be true?
::: solution
Inelastic demand means *small* $|\varepsilon_d|$, so $dp_b/t \approx 1$: retail prices rise by about the tax. The public-health (Pigouvian) case wants the buyer price to rise, because that is the price that reduces smoking. Incidence on buyers is then both the efficiency channel and a distributional fact (smokers, who are poorer on average in many high-income countries, bear it). The two evaluations — health and distribution — need a $W$ and are not settled by the pass-through number.
:::
:::

::: exercise Overshifting check {level=3 check="10"}
In [[#ex-overshift]], what is the consumer price after the tax of $1$? (Enter the price.)
::: solution
$P=2\times 5=10$.
:::
:::
