A monetary union is a hard peg that has gone all the way: member countries share a currency, a central bank and a short-term interest rate, and they have no national exchange rate to devalue. The euro, introduced as a unit of account on 1 January 1999 and as notes and coins on 1 January 2002, is the large modern case. Smaller unions include the CFA franc zones in West and Central Africa, the East Caribbean dollar, and, in a one-sided form, the dollarised economies of Ecuador, El Salvador and Panama. The economic question is older than the euro: **when is a collection of regions an optimum currency area?** The political question is why countries give up $E$ anyway. The crisis of 2010–2012 in the euro area is the test that any account of the union has to pass, and it has competing accounts. This chapter states the OCA criteria, applies them, and treats the euro-area crisis even-handedly. It is not a verdict on the euro.

## Optimum currency areas

::: definition Optimum currency area {#def-oca}
An **optimum currency area** (OCA) is a group of regions for which the gain from a common money (lower transaction costs, more transparent prices, deeper financial markets, a saved inflation bias) outweighs the loss of a national exchange rate and of a national $i$ as shock absorbers. The classical criteria, due to Mundell (1961), McKinnon (1963) and Kenen (1969), are **labour mobility** (and capital mobility) across regions, **openness** to trade within the group, **diversification** of production so that shocks are not industry-specific, and — in later lists — **similar shock structure**, **fiscal transfers**, and **flexible prices and wages**.
:::

Mundell's original criterion was factor mobility as a *substitute* for $E$. If labour moves from a depressed region to a booming one, the real exchange rate that would have depreciated in the depressed region is not needed. McKinnon added that a very open region cannot use $E$ anyway: a devaluation passes through into $P$ too fast. Kenen added diversification: a region that produces many goods is less likely to be hit by a single industry shock that would have wanted a national $E$.

::: proposition A two-region loss comparison {#prop-oca-loss}
Let two regions face a real demand shock of size $\varepsilon$ that hits only region A. Under a float, $E$ depreciates in A and absorbs part of $\varepsilon$; output in A falls by $\lambda_{\text{float}}\lvert\varepsilon\rvert$. Under a union, $E$ cannot move and the common $i$ cannot be set for A alone; output in A falls by $\lambda_{\text{union}}\lvert\varepsilon\rvert$, with $\lambda_{\text{union}} > \lambda_{\text{float}}$ unless labour mobility, fiscal transfers or price flexibility make up the difference. The union is preferred for this shock if the transaction-cost and credibility gains exceed $\bigl(\lambda_{\text{union}}-\lambda_{\text{float}}\bigr)\lvert\varepsilon\rvert$ in welfare units. The criterion is shock-specific: a *common* shock, hitting A and B together, does not cost the union the same way, because the common $i$ can respond.
:::

::: proof
In Mundell–Fleming, a negative IS shock under a float depreciates $E$ and crowds *in* $NX$, so $dY$ is smaller in absolute value than under a peg (the ranking of [[international-finance/mundell-fleming#prop-float]] and [[international-finance/mundell-fleming#prop-peg]], flipped to a demand fall). A union is a peg vis-à-vis the partner, with the extra constraint that $i$ is common. If the shock is asymmetric, $i$ will not fall as far as A would have wanted. Labour mobility reduces the remaining output gap by moving $L$ rather than $Y$ per worker. A transfer of $T$ from B to A shifts IS back. Flexible $P$ in A produces a real depreciation at a fixed $E$. Each of those flattens $\lambda_{\text{union}}$ toward $\lambda_{\text{float}}$. A common shock is, for the union, just a closed-economy shock to the bloc, for which a common $i$ is the right instrument.
:::

::: definition Sovereign–bank loop {#def-doom}
The **sovereign–bank loop** (doom loop) is the two-way exposure in which domestic banks hold a large share of their own sovereign's debt, so a fall in the price of that debt reduces bank capital, which raises the likelihood of a public recapitalisation, which raises sovereign spreads, which lowers the debt's price further. A monetary union without a common bank backstop and without a common fiscal backstop is particularly exposed: there is no national $E$ to inflate the debt away, and no union-wide recapitalisation by default.
:::

The list of criteria is not a score that a region either passes or fails. The United States is the usual comparison: labour mobility is higher than in the euro area (Blanchard and Katz, *Brookings*, 1992; Decressin and Fatás, *European Economic Review*, 1995; later OECD evidence still finds US mobility higher), and a federal budget provides transfers that no EU budget of 1 per cent of GDP can match. The euro area is more open internally than Mundell's 1961 Canada–US example, which cuts the other way. Whether the euro area is an OCA is a weighted judgment, not a theorem.

::: example An asymmetric shock, two absorbers {#ex-asymm}
Region A and region B share a currency. Demand for A's goods falls by $20$ (IS units). Under a hypothetical national float, $E$ would have depreciated enough to raise A's $NX$ by $12$, so $Y_A$ would have fallen by $8$. Under the union, $NX$ cannot be raised by a national $E$. (a) If $8$ of labour leaves A for B, and each worker produced $1$ of the lost output, what happens to unemployment in A? (b) If instead a transfer of $12$ arrives from B, what happens to $Y_A$? (c) If neither happens and prices in A do not fall, what happens to $Y_A$?
::: solution
(a) Output in A still falls by $20$ in goods-market units if $NX$ and $G$ do not move, but unemployment need not rise one-for-one if the workers have left. (The population of A has fallen; GDP per remaining resident is a different object.) (b) The transfer is a fiscal IS shift of $12$ for A, so $Y_A$ falls by $8$, matching the float. B's IS shifts left by $12$; the union as a whole is a wash if the shock was a shift of demand from A to B, and a net loss if the demand vanished. (c) $Y_A$ falls by the full $20$. That is the cost of the union for this shock when the OCA substitutes are missing. The numbers are invented; the ranking is the model's.
:::
:::

::: widget plot
f: 100-0.8*x; 40+0.4*x; 40+0.4*x+t
sliders: t=0:0:40
x: 0, 80
y: 0, 120
labels: \text{demand in A}; \text{union supply}; \text{demand plus transfer}
caption: A toy goods market in region A. A negative demand shock has already shifted demand down to $100-0.8x$. Drag the transfer $t$ to shift demand back. The union cannot depreciate; the transfer is a substitute. Invented lines, not euro-area calibration.
:::

## Endogeneity

The OCA criteria may be *endogenous* to the union. Frankel and Rose (*Economic Journal*, 1998) argued that a common money raises trade, and that more trade raises the correlation of shocks, so a union that fails the criteria *ex ante* may pass them *ex post*. Krugman (1993, in the Commission of the EC's *Adjustment and Growth*) argued the opposite: a common money deepens specialisation, which *lowers* shock correlation. Both channels exist. Euro-area intra-trade is high; specialisation in tradables (German capital goods, Spanish construction before 2008) is also real. The endogeneity argument is not a promise that any union becomes optimal by being created.

A second endogeneity is financial. Innocenzo and others' "endogenous OCA" via financial integration can share risk — or, as 2008–2012 showed, *concentrate* risk when banks hold the sovereign debt of their own state (the **sovereign–bank loop**). Risk sharing through cross-border equity is an OCA plus; risk sharing through debt that runs back to the same sovereign is not.

## The euro: design

The Maastricht Treaty (signed 1992, in force 1993) set **convergence criteria** for inflation, interest rates, the exchange rate (ERM membership) and fiscal ratios (deficit below 3 per cent of GDP, debt below 60 per cent or approaching that). The Stability and Growth Pact was meant to keep the fiscal criteria after entry. There was no common bank supervisor until the Single Supervisory Mechanism of 2014, no common deposit insurance, and no common fiscal capacity beyond the small EU budget. The ECB's mandate, in the Treaty on the Functioning of the EU, is price stability first. Lender-of-last-resort support to *sovereigns* was not in the original design; the Outright Monetary Transactions (OMT) announcement of 2012 and the later Transmission Protection Instrument are later inventions, born of the crisis.

Eleven members entered in 1999; Greece in 2001; notes and coins in 2002; later joiners include Slovenia, Cyprus, Malta, Slovakia, Estonia, Latvia, Lithuania, Croatia. Denmark has an opt-out; Sweden has a *de facto* opt-out. The United Kingdom was never a member and left the EU in 2020.

::: example Maastricht arithmetic {#ex-maastricht}
A candidate country has inflation of $3.2$ per cent, a budget deficit of $2.5$ per cent of GDP, and public debt of $72$ per cent of GDP, falling from $76$ per cent the previous year. The three best-performing EU members have inflation averaging $1.5$ per cent. The Treaty's inflation criterion is "not more than $1.5$ percentage points above the three lowest". (a) Does the country meet the inflation criterion? (b) The deficit criterion? (c) The debt criterion as written (below $60$ per cent *or approaching*)?
::: solution
(a) The ceiling is $1.5+1.5=3.0$ per cent; $3.2$ exceeds it, so no. (b) $2.5 < 3$, so yes. (c) $72>60$, but the ratio is falling; a legal reading of "approaching" can pass it, a strict reading cannot. The 1990s entry decisions used the approaching clause. The example is the letter of the Treaty, not a named country in a named year.
:::
:::

::: example A common shock versus an asymmetric one {#ex-common}
The union's common IS falls by $10$ in every member. The ECB cuts $i$ enough to raise demand by $10$ in the union as a whole. Separately, a shock of $10$ hits only member A. (a) Why can the first shock be absorbed without a national $E$? (b) Why can the second not, unless an OCA substitute moves?
::: solution
(a) The common $i$ is the right instrument for a common IS shock, just as in closed-economy IS–LM for a single country. The union's $E$ against the rest of the world can also depreciate. No member needs a *relative* depreciation against another member. (b) A's relative IS has fallen; B's has not. A common cut in $i$ would overheat B if it were sized for A. A's missing tool is a relative $E$ against B. Labour mobility, a transfer, or a fall in A's $P$ are the substitutes in [[#def-oca]].
:::
:::

::: application The CFA franc
The West African Economic and Monetary Union (UEMOA) and the Central African Economic and Monetary Community (CEMAC) peg the CFA franc to the euro, with convertibility historically guaranteed by the French Treasury. The arrangement is a hard peg plus a limited fiscal-backing rule, in a region where labour mobility, intra-trade and fiscal transfers are not at US levels (IMF Article IV reports on UEMOA and CEMAC). It is an OCA laboratory as well as a colonial legacy. Whether the peg has delivered a useful nominal anchor or a constraint on adjustment is a live, even-handed debate in the region; this course records the arrangement and the criteria, not a verdict.
:::

## The euro-area crisis, 2010–2012

From 2010, Greece, then Ireland, Portugal, Spain and Cyprus lost market access or paid spreads that made debt dynamics explosive. Greece and Portugal were mostly sovereign-debt stories at the start; Ireland and Spain were bank-and-housing stories that became sovereign stories through bail-outs; Cyprus was a bank-and-Greek-exposure story. The ECB's OMT, announced by Mario Draghi's 26 July 2012 "whatever it takes" speech in London and formalised that autumn, marked a turning point in spreads. Competing accounts of *why* the crisis happened, and of what OMT did, should be kept distinct.

**Account A, fundamentals.** Greece entered with a deficit much larger than reported (Eurostat revisions of 2009–2010). Competitiveness had drifted: unit labour costs in Greece, Spain, Ireland and Portugal rose relative to Germany in the 2000s (Eurostat; ECB Harmonised Competitiveness Indicators). Current-account deficits in the periphery reached high single digits of GDP (IMF WEO). In this account the union allowed cheap borrowing without the discipline of a national $E$ or of a no-bail-out rule that markets believed, and the crisis was a solvency event. Fiscal consolidation and internal devaluation (falling $P$ and wages) were the implied adjustment.

**Account B, sudden stops and multiple equilibria.** The same current-account deficits were, in Blanchard and Giavazzi's 2002 reading, catching-up. When global funding dried up after 2008, a union without a lender of last resort to sovereigns turned illiquid members into insolvent ones (De Grauwe, *The Economics of Monetary Union*, successive editions; Krugman, 2012 lectures). Spreads jumped in countries whose debt/GDP was not, in Ireland and Spain, extreme by Japanese or UK standards. In this account OMT worked by killing the bad equilibrium, not by changing the present value of primary surpluses overnight. The "doom loop" between banks and sovereigns is a complement: banks' holdings of own-sovereign debt made a rise in spreads a bank-capital event, which made a bail-out more likely, which raised spreads.

Both accounts have evidence. Greece's revised deficit and the competitiveness drift are facts. The speed of the spread jump in 2010–2012, and the speed of its compression after OMT, are also facts, and they are hard to tell as a story only about the present value of Greek primary surpluses changing in a week. A course that kept only Account A would miss the self-fulfilling layer; a course that kept only Account B would miss why Greece, not Germany, was the country in the bad equilibrium. [[international-finance/crises]] develops the two layers as first- and second-generation models.

::: example A stylised doom loop {#ex-doom}
A periphery sovereign has debt of $100$. Domestic banks hold $40$ of it, which is $20$ per cent of their assets. A rise in the spread that cuts the mark-to-market value of the debt by $25$ per cent inflicts a loss of $10$ on the banks, wiping out a capital buffer of $10$. The sovereign then guarantees the banks, adding $10$ to public debt. What is the new debt stock, and why might the spread rise further?
::: solution
Public debt becomes $110$ plus whatever recapitalisation costs follow. The banks' solvency now depends even more on the sovereign, and the sovereign's debt ratio is worse. If markets price a higher default probability into the remaining $100+$, the mark-to-market loss deepens. That feedback is the loop. It is not a claim that the sovereign was solvent at $100$ and only the loop did the damage, nor the reverse. It is a mechanism that *amplifies* whichever shock — a revised deficit, a housing bust, a stop in capital flows — started the move.
:::
:::

::: warning Internal devaluation is not a free devaluation
A national depreciation under a float lowers $W/E$ in foreign units at given domestic wages $W$. An **internal devaluation** lowers $W$ (or $P$) at a given $E=1$ inside the union. The two are not equivalent if wages are sticky downward, if private debt is fixed in nominal units, or if the deflation raises the real value of public debt (the Fisher effect). Spain's post-2010 internal devaluation did improve the measured real exchange rate and the current account (Eurostat; IMF WEO); it did so alongside high unemployment. Recording both is the even-handed description. Treating internal devaluation as "just like floating" is a mistake the OCA literature has warned about since Mundell.
:::

::: quiz
An asymmetric demand slump hits only member A of a monetary union. Which OCA substitute can replace A's missing national depreciation?
- [ ] A rise in the common policy rate
- [x] Labour mobility out of A, or a fiscal transfer into A, or a fall in A's prices
- [ ] A devaluation of the common currency against the rest of the world, which is always enough for A
- [ ] Capital controls between A and the rest of the union
::: solution
[[#prop-oca-loss]]. A common-currency depreciation against the rest of the world may help the union as a whole; it does not raise A's *relative* $E$ against B. Capital controls inside the union would undermine the union. The common $i$ cannot be set for A alone, and raising it would make A worse.
:::
:::

## Evidence

**Labour mobility.** European Commission and OECD data continue to show lower inter-country mobility in the euro area than interstate mobility in the United States, even after the crisis (OECD *International Migration Outlook*, various years). Intra-EU mobility rose with the 2004 enlargement, which is a different corridor (Poland to the UK and Ireland, not Spain to Germany at the scale of US state-to-state flows).

**Fiscal transfers.** The US federal budget offsets a substantial fraction of a state-level income shock (Sala-i-Martin and Sachs 1991; Asdrubali, Sørensen and Yosha, *QJE*, 1996, on US risk sharing). The EU budget does not. National fiscal policy remains the shock absorber, and in 2010–2012 it was constrained by market access and by the Pact. The Next Generation EU programme (2020) is a one-off common borrowing, not a standing fiscal union.

**Current accounts.** The euro-area periphery ran large deficits before 2008 and large adjustments after, through a fall in $I$ and in $C$ more than through an immediate boom in $NX$ (IMF WEO; European Commission *Ameco*). That is consistent with a sudden-stop adjustment at a fixed $E$.

**Spreads and OMT.** Greek, Irish, Portuguese and Spanish 10-year spreads over Germany compressed sharply after July 2012 (ECB Statistical Data Warehouse; national treasury data). Altavilla, Giannone and Lenza (*IMF Economic Review*, 2016) and subsequent event studies attribute a large part of the compression to OMT *announcement*, before large purchases. That is evidence for Account B's multiple-equilibrium layer; it is not evidence that fundamentals were irrelevant.

**Non-European unions.** The ECCU (East Caribbean) has a long-standing currency board-like arrangement vis-à-vis the US dollar. UEMOA's inflation has typically been closer to the euro area's than that of neighbouring floats (IMF IFS). Those facts speak to the *anchor* benefit of a union or hard peg; they do not speak, by themselves, to the OCA cost of asymmetric shocks (commodity prices for CEMAC oil members; tourism for the Caribbean).

## Where this leads

A union that cannot absorb an asymmetric shock through $E$, $i$, labour or transfers will absorb it through $Y$, or through a crisis of sovereign funding: [[international-finance/crises]]. The euro is also a chapter in the international monetary system, a second reserve currency after the dollar: [[international-finance/international-monetary-system]]. The trilemma is solved inside the union by giving up $E$ and national $i$; vis-à-vis the rest of the world the euro area floats: [[international-finance/exchange-rate-regimes]].

::: history
Mundell's 'A Theory of Optimum Currency Areas' (*AER*, 1961) asked the question for Canada and the United States, not for Europe. McKinnon (*AER*, 1963) and Kenen (in Mundell and Swoboda, eds, 1969) completed the classical list. The Werner Report (1970) and the Delors Report (1989) are the European political documents; the Maastricht Treaty (1992) is the legal one. The euro started on 1 January 1999. The crisis documents are the Greek programme of May 2010, the Irish programme of November 2010, and Draghi's 26 July 2012 speech. De Grauwe's textbook and the Blanchard–Giavazzi 2002 paper are the two poles of the pre-crisis academic debate on euro-area current accounts.
:::

::: summary
- An OCA is a region where the gains of a common money outweigh the loss of a national $E$ and $i$. Criteria: labour mobility, openness, diversification, similar shocks, fiscal transfers, flexible prices.
- Asymmetric shocks are the cost; common shocks are not, in the same way. Endogeneity of the criteria can cut either way (Frankel–Rose versus Krugman).
- The euro's original design had a common money, fiscal rules, and no common bank supervisor, deposit insurance, or fiscal capacity. SSM (2014) and OMT (2012) came later.
- The 2010–2012 crisis has a fundamentals account (deficits, competitiveness, solvency) and a multiple-equilibrium account (sudden stop, no LOLR, doom loop). Both have evidence; OMT's effect on spreads is especially awkward for a pure-fundamentals story.
- Internal devaluation is not a frictionless substitute for a nominal depreciation when wages and debts are sticky in nominal units.
:::

## Exercises

::: exercise Float versus union, invented shock {level=1 check="8"}
In [[#ex-asymm]], the float would have cut $Y_A$ by how much?
::: solution
The float absorbs $12$ of the $20$ through $NX$, so $Y_A$ falls by $8$.
:::
:::

::: exercise Union without substitutes {level=1 check="20"}
In the same example, with no mobility, no transfer and sticky prices, enter the fall in $Y_A$.
::: solution
The full $20$.
:::
:::

::: exercise Transfer substitute {level=1 check="8"}
A transfer of $12$ arrives. Enter the fall in $Y_A$.
::: solution
$20-12=8$, matching the float in this arithmetic.
:::
:::

::: exercise Doom-loop loss {level=2 check="10"}
Banks hold $40$ of sovereign debt; a $25$ per cent mark-to-market fall. Enter the loss.
::: solution
$0.25\times 40=10$, as in [[#ex-doom]].
:::
:::

::: exercise Maastricht deficit {level=2 check="3"}
Enter the Maastricht deficit ceiling as a per cent of GDP.
::: solution
$3$ per cent of GDP, in the Treaty protocol on the excessive deficit procedure. The debt reference is $60$ per cent.
:::
:::

::: exercise Common versus asymmetric shocks {level=2}
Explain in a few sentences why a *common* fall in demand across the union is less of an OCA problem than an asymmetric fall in A only. Use [[#prop-oca-loss]].
::: solution
A common fall is a shock to the union's IS. The common central bank can cut $i$, and the common $E$ against the rest of the world can depreciate if the union floats vis-à-vis outsiders. No member needs a *relative* $E$ against another member. An asymmetric fall in A needs a relative depreciation of A against B, which a common money cannot deliver. That is why the classical criteria are about *asymmetric* shocks and the substitutes for a relative $E$.
:::
:::

::: exercise Two accounts of OMT {level=3}
After 26 July 2012, periphery spreads fell sharply. (a) How would Account A (fundamentals) explain a fall in spreads? (b) How would Account B (multiple equilibria) explain the same fall? (c) What evidence would help you tell them apart, and why is the *speed* of the fall relevant?
::: hint
Account A needs the present value of primary surpluses or expected official support to change. Account B needs the bad equilibrium to become unattractive.
:::
::: solution
(a) Account A: OMT changed expected official support, which is a fundamental of the *investor's* payoff even if the primary surplus path is unchanged; or it bought time for fiscal adjustment to raise that present value. A pure Account A that forbids any role for expected official liquidity has trouble with an announcement that was not, on the day, a change in Greek tax law. (b) Account B: OMT capped the bad-equilibrium price by offering an unlimited (conditional) bid. Once the bad price is off the table, spreads jump to the good-equilibrium price without a contemporaneous change in primary surpluses. (c) If primary-surplus forecasts and debt/GDP did not move in the week of the speech, and spreads did, that is awkward for a story in which only those forecasts price the bond. Speed is relevant because fundamentals of the real economy do not jump in a day; coordination on an equilibrium can. The even-handed conclusion is that OMT had a multiple-equilibrium effect *on top of* whatever fundamentals Greece and Spain already had. Neither account, alone, is the whole record.
:::
:::

::: exercise Derive $\lambda_{\text{union}} > \lambda_{\text{float}}$ in IS {level=3}
Take the linear IS $Y = A - b i + \nu E + G$ for country A, with $i=i^*$ under a peg/union vis-à-vis B and $i=i^*$, $E$ free under a float (perfect mobility). A fall $dA<0$ hits A. Under the float, $E$ adjusts to keep $i=i^*$ and LM's $Y$ (assume monetary policy holds $Y$ via $E$ — or, simpler, assume $i$ stuck at $i^*$ in both regimes and only $E$ differs). Show that $\lvert dY\rvert$ is smaller under the float if $dE>0$ is allowed to offset $dA$. State the extra assumption you used on $i$.
::: hint
Float: $dY = dA + \nu dE$, and $dE$ is chosen (by the market) to clear UIP and LM. Peg: $dE=0$, so $dY=dA$ at given $i$.
:::
::: solution
At given $i$, $dY = dA + \nu dE + dG$. Set $dG=0$. Peg/union vis-à-vis the partner: $dE=0$, so $dY=dA$. Float: a negative $dA$ depreciates $E$ ($dE>0$) in Mundell–Fleming, so $dY=dA+\nu dE$ is algebraically larger (a smaller fall) than $dA$. The extra assumption is that $i$ is the same in the two experiments (both at $i^*$), so the whole difference is $\nu dE$. If the union also cannot cut $i$ because B is not in slump, the gap $\lambda_{\text{union}}-\lambda_{\text{float}}$ is larger still. If labour mobility or a transfer supplies a $dG>0$ or a smaller effective $dA$, the union's $dY$ moves back toward the float's. That is [[#prop-oca-loss]] in the linear IS of [[international-finance/mundell-fleming]].
:::
:::
