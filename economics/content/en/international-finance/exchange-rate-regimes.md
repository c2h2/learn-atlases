A country that wants a stable exchange rate, a monetary policy aimed at domestic goals, and open capital markets can pick two. That sentence is the **impossible trinity**, or **trilemma**, and it is the organising fact of this chapter. Mundell–Fleming already showed the two corners: a float keeps monetary policy and gives up the peg; a peg keeps the rate and gives up monetary policy. Capital controls, the third corner, break UIP and let the two coexist for a time. Between the corners sit the messy regimes the IMF records every year: crawling pegs, bands, managed floats, dollarisation. The choice is institutional, political and historical, not a theorem that one corner dominates. This chapter classifies the regimes, states the trilemma as a proposition, and looks at the evidence that the trade-off is real. It is not a recommendation to peg, to float, or to close the capital account.

## A menu of regimes

The IMF's *Annual Report on Exchange Arrangements and Exchange Restrictions* (AREAER) classifies *de facto* regimes, which often differ from the *de jure* announcement. As of 2023, of 190-odd members, a minority were free floaters; many more were "soft" pegs or managed arrangements (IMF AREAER 2023). The labels below follow that spirit.

::: definition Exchange-rate regimes {#def-regimes}
A **hard peg** is a regime in which the national currency is abandoned (**dollarisation**, **euroisation**) or a **currency board** issues domestic money only against foreign reserves, at a fixed rate, with little or no discretion. A **conventional peg** commits the central bank to a fixed $E$ against a single currency or a basket, with some residual discretion over domestic credit. A **crawling peg** or **band** lets $E$ move along a pre-announced path or inside a corridor. A **managed float** has no pre-announced path; the bank intervenes at discretion. A **free float** has intervention that is at most occasional. **Capital controls** are restrictions on $FA^{\mathrm{in}}$ — taxes, quantity limits, minimum-stay rules, dual rates — that make UIP fail as a market condition even when it holds for the unrestricted subset of agents.
:::

Hard pegs are rare and sticky: Ecuador dollarised in 2000; Hong Kong SAR's currency board against the US dollar dates from 1983; Bulgaria's currency board from 1997; the euro-area members have no national $E$ at all. Conventional pegs and crawls are common in small open economies and in the Gulf. Managed floats describe much of emerging Asia, including China after 2005 in the IMF's *de facto* reading (the *de jure* description has evolved). Free floats, in the AREAER sense, include the United States, the euro area as a bloc, Japan, the United Kingdom, and a handful of others.

The **bipolar** hypothesis of the late 1990s (Eichengreen 1994; Fischer 2001) claimed that intermediate regimes were disappearing, because open capital made a soft peg unviable. Intermediate regimes did not disappear. They remain the majority of AREAER entries. The trilemma does not say that the middle is empty; it says that the middle is a *compromise* among the three goals, not a way of having all three.

::: example A currency board's balance sheet {#ex-board}
A currency board holds foreign reserves $R$ and issues monetary base $H$ at a fixed $E$, with $H = E R$ in domestic currency (or $H \le E R$ if there is excess cover). Domestic credit $D$ is (near) zero. Palmia's board pegs at $E=2$ palms per dollar and has $R = 50$ dollars. (a) What is $H$? (b) If residents convert $10$ palms of base into dollars, what happens to $R$ and $H$? (c) Why cannot the board cut interest rates independently?
::: solution
(a) $H = 2 \times 50 = 100$ palms. (b) Converting $10$ palms takes $5$ dollars of reserves: $R'=45$, $H'=90$. The money supply shrinks one-for-one with the reserve loss. (c) A cut in $i$ below $i^*$ would provoke conversion of the kind in (b) until $i$ is back, or until $R$ is gone. The board has given up $i$ in order to keep $E$. That is one corner of the trilemma, written on a balance sheet.
:::
:::

## The trilemma as a proposition

::: definition The impossible trinity {#def-trilemma}
The **impossible trinity** (trilemma) is the claim that the three of a fixed exchange rate, an independent monetary policy (the ability to set $i$ away from $i^*$), and free capital mobility cannot hold at once. At most two can. The three corners are: (1) peg + open capital, $i=i^*$; (2) float + open capital, $i$ free, $E$ endogenous; (3) peg + closed capital, $i$ free, $E$ held by controls and intervention.
:::

::: proposition UIP makes the trilemma {#prop-trilemma}
Assume UIP, $i = i^* + (E^e-E)/E$, and a *credible* peg, so $E^e=E$. Then $i=i^*$. Any attempt to set $i \neq i^*$ contradicts the assumptions. Dropping UIP (capital controls, or a risk premium the bank cannot price through) restores a wedge between $i$ and $i^*$. Dropping the peg lets $E$ jump to restore UIP at the chosen $i$. Those are the three corners.
:::

::: proof
UIP is [[international-finance/exchange-rates#def-uip]]. A credible peg is $E^e=E$ by definition of credibility (the expected rate is the peg). Substitute: $i=i^*$. If the bank sets $i < i^*$, UIP requires $E^e > E$: expected depreciation. That is the expectation of a collapsed peg, not a credible peg. If capital controls break UIP, $i$ can differ from $i^*$ at $E^e=E$. If $E$ is freed, $E$ (and $E^e$) adjust and $i$ can differ from $i^*$. There is no fourth way inside the assumptions.
:::

The proof is an accounting of assumptions, not an empirical claim that every peg is immediately arbitraged. Pegs last, sometimes for decades, when $i$ is *chosen* to equal $i^*$, or when controls bind, or when a risk premium $\rho$ in $i = i^* + (E^e-E)/E + \rho$ happens to fill the gap. The trilemma says that the gap cannot be filled by wish.

::: widget plot
f: 4; a; 4+0.02*(x-800)
sliders: a=4:1:8
x: 400, 1200
y: 0, 12
labels: i^*; \text{policy } i; \text{BP, imperfect mobility}
caption: The horizontal line at $4$ is $i^*$. Drag the policy rate $a$. Under a peg and open capital the two horizontals must coincide; a gap is an incipient flow. The upward line is a BP schedule with imperfect mobility, along which a peg can survive a modest gap for a while. Invented slopes.
:::

::: example Three corners for Palmia {#ex-three}
Palmia wants $i=3$ per cent; $i^*=5$ per cent. Describe one consistent policy at each corner of [[#def-trilemma]].
::: solution
Corner (1), peg + open capital: Palmia *cannot* have $i=3$. It must accept $i=5$ or abandon this corner. Corner (2), float + open capital: Palmia sets $i=3$, $E$ depreciates as in [[international-finance/exchange-rates#ex-uip-jump]], and the peg is gone. Corner (3), peg + controls: Palmia holds $E$ by law and by intervention, forbids or taxes the carry that would enforce UIP, and sets $i=3$. The controls must actually bind; a leaky control is a leaky peg. China's pre-2015 regime was a managed relative of corner (3); Hong Kong SAR's currency board is corner (1); the US is corner (2).
:::
:::

::: warning A "managed float" is not a fourth corner
Intervening to smooth $E$ while also setting $i$ and allowing capital flows is an *attempt* to have three. It works until the intervention budget (reserves, or the tolerance for $E$ moving) is exhausted. The trilemma does not say the attempt is impossible for a week; it says it is impossible as a steady state once private capital is large relative to $R$. The 1992 ERM, the 1997 Thai peg, and the 2015 Swiss floor are case studies of that exhaustion, taken up as crises in [[international-finance/crises]].
:::

## Capital controls

Controls can be on inflows (unremunerated reserve requirements, as in Chile in the 1990s; taxes on portfolio inflows) or on outflows (the Malaysian 1998 package; Iceland after 2008; Cyprus 2013). The IMF's institutional view, revised in 2012, treats capital-flow management as a legitimate tool in a kit that also includes macroprudential policy and exchange-rate adjustment, rather than as a taboo (IMF, *The Liberalization and Management of Capital Flows: An Institutional View*, 2012, and the 2022 review). The evidence on effectiveness is mixed: inflow taxes can change the *composition* of flows more reliably than the *volume* (Forbes, Fratzscher and Straub, *Journal of International Economics*, 2015; Magud, Reinhart and Rogoff, *Journal of International Money and Finance*, 2018 survey). Outflow controls in a crisis can buy time; they also lock residents in and invite evasion.

Controls are a corner, not a free lunch. They segment markets, create a parallel rate, and are only as strong as enforcement. Dual exchange rates — an official $E$ for current-account transactions and a financial $E$ — are a form of control. They reappear whenever the official rate is defended far from the rate that would clear the financial account (Argentina's repeated dual-rate episodes; Nigeria's multiple windows in the 2010s–2020s, as described in IMF Article IV reports).

## Why peg, why float

The case for a peg: a nominal anchor when the central bank's inflation-fighting reputation is weak; lower transaction costs and exchange-rate risk for a very open, very small economy; a political commitment device. The case for a float: monetary policy for domestic stabilisation; absorption of real shocks through $E$ rather than through $Y$; no need to hold a large $R$. The case for the middle: a fear of floating (Calvo and Reinhart, *QJE*, 2002) among emerging markets, because $E$ moves pass through quickly into $P$ and into the domestic-currency value of dollar debt. None of these is a theorem that applies to every country.

::: example A managed float's week {#ex-managed}
Palmia announces a float but sells $\$4$ of reserves whenever $E$ rises above $2.05$ and buys whenever $E$ falls below $1.95$. $i$ is set at $4$ per cent, $i^*=5$ per cent, and capital is open. (a) Which two of the trilemma's three goals is Palmia trying to hold, and which is the residual? (b) If private outflows are $\$6$ in the week, what happens to $R$? (c) What happens in a week of $\$50$ of outflows if $R$ is $\$20$?
::: solution
(a) Palmia is trying to hold a (narrow) $E$ and an independent $i$. The residual is capital mobility — or, more honestly, the residual is $R$. With open capital the combination is inconsistent in a steady state; it is an intervention band. (b) To hold $E$ in the band the bank must sell $\$6$ of reserves (the private outflow, net of any private inflow). $R$ falls by $\$6$. (c) $\$20$ cannot meet $\$50$. Either $E$ leaves the band (the float becomes real), $i$ is raised toward $i^*$ (independence is given up), or controls are imposed. That week is the trilemma arriving as a discrete event. The numbers are invented; the ranking of which instrument breaks is the chapter.
:::
:::

::: application Fear of floating
Calvo and Reinhart (2002) showed that many *de jure* floats have very stable $E$ and very unstable $R$ and $i$ — they are *de facto* pegs or managed floats. The reasons they gave include pass-through, liability dollarisation, and shallow foreign-exchange markets. Brazil, Mexico, Korea and South Africa after their 1990s crises all floated more than before and still intervene (their own central-bank reports; AREAER). Fear of floating is a description of revealed preference, not a finding that they should float less or more.
:::

Klein and Shambaugh (*Exchange Rate Regimes in the Modern Era*, 2010) and Obstfeld, Shambaugh and Taylor (*QJE*, 2004; *AEJ: Macro*, 2010) took the trilemma to the data: pegs with open capital have interest rates that follow the base country's rate more closely than floats do. The "insulation" of a float is real, on average, and incomplete. Rey (2015, Jackson Hole) argued that a **global financial cycle** in capital flows and risk premia reduces the trilemma to a **dilemma**: with open capital, monetary policy is constrained even under a float. The competing account is that the float still buys a useful margin, even if $\rho$ in UIP is not zero (Obstfeld and Taylor; Klein and Shambaugh). Both can be read in the same interest-rate data; they disagree about how much of $i-i^*$ is usable policy.

::: quiz
A country pegs, has open capital, and a credible $E^e=E$. UIP holds. Its monetary policy
- [ ] can set any $i$, because the peg is a commitment
- [x] must set $i=i^*$
- [ ] can set $i$ below $i^*$ if it has large reserves
- [ ] is independent as long as the current account is in surplus
::: solution
[[#prop-trilemma]]: $i=i^*$. Reserves postpone an inconsistent policy; they do not make it consistent. The current account's sign is a different identity.
:::
:::

## Reserves

Countries hold **foreign-exchange reserves** for three textbook reasons: to run a peg or a managed float (the intervention budget); as self-insurance against a sudden stop; and, for some, as a by-product of an export-led strategy that accumulates claims. Global reserves were of the order of \$12 trillion in the early 2020s, with China the largest holder (IMF COFER and IFS, accessed 2026). The composition is still dollar-heavy: the US dollar's share of allocated reserves was about 58 per cent in 2024, the euro about 20 per cent, with smaller shares for the yen, sterling and the renminbi (IMF COFER, 2024–2025 releases). That composition is a fact about the international monetary system, developed in [[international-finance/international-monetary-system]].

How much $R$ is "enough" is not a theorem. Rules of thumb — three months of imports; 100 per cent of short-term external debt (the **Guidotti–Greenspan** rule) — are heuristics. Jeanne and Rancière (*IMF Economic Review*, 2011) and the IMF's reserve-adequacy template make the insurance problem explicit: $R$ has an opportunity cost (the interest differential between the reserve asset and domestic capital) and a benefit in a sudden-stop state. The formula is a model; countries' actual $R$ often exceeds the template, especially in East Asia after 1997.

::: example A Guidotti–Greenspan number {#ex-gg}
Palmia has short-term external debt of $40$ (residual maturity under one year) and three months of imports equal to $15$. Reserves are $50$. Does Palmia clear the two heuristics? What does clearing them not imply?
::: solution
$R=50$ exceeds $40$ and exceeds $15$, so both heuristics are met. They do not imply that a sudden stop of $50$ would be painless: residents' own flight, a fall in $E$ that revalues remaining debt, and a stop in *rollover* of longer debt can all exceed $R$. The heuristics are lower bounds used in surveillance, not a solvency certificate.
:::
:::

## Evidence

**The trilemma in interest rates.** Obstfeld, Shambaugh and Taylor (2004, 2010) estimate that the sensitivity of $i$ to $i^*$ is highest for pegs with open capital, lowest for floats, and intermediate with controls. Klein and Shambaugh (2015) find that even partial controls buy some monetary independence. Rey's dilemma is the claim that the VIX (or a global risk factor) moves emerging-market $i$ and $E$ regardless of the regime; the size of that factor is the live empirical question.

**Regime distribution.** AREAER *de facto* classifications, and the Reinhart–Rogoff (2004) natural classification, both show a thick middle. Hard pegs cluster in very small economies and in currency unions. Free floats cluster in large financial centres. That pattern is consistent with the OCA logic of the next chapter, not with a single best regime.

**Reserves after 1997.** Emerging Asia's reserve/GDP ratios rose sharply after the Asian crisis and remained high (IMF IFS). The competing accounts are self-insurance against a sudden stop (Aizenman and Lee, *Open Economies Review*, 2007) and a by-product of a development strategy that resisted real appreciation. Both can be true; the trilemma does not pick one.

**Africa and Latin America.** The CFA franc zone is a hard peg to the euro with a French (now European) guarantee, a colonial-origin arrangement that has persisted (IMF AREAER). Many Latin American countries moved from pegs to floats after the 1990s–2001 crises (Mexico 1994, Brazil 1999, Argentina 2001) and still display fear of floating. Ghana and Kenya have managed floats with occasional sharp $E$ moves (their central-bank reports; IMF Article IV). The menu is the same; the political economy of who is hurt by a depreciation differs.

## Where this leads

A monetary union is a hard peg that abolishes $E$ among members and creates a common $M$: [[international-finance/monetary-unions]]. A peg that is inconsistent with $i$ and with open capital ends as a crisis: [[international-finance/crises]]. The global pattern of who pegs to whom, and in what reserve currency, is the international monetary system: [[international-finance/international-monetary-system]]. Mundell–Fleming remains the comparative-static engine: [[international-finance/mundell-fleming]].

::: history
The trilemma is implicit in the Mundell–Fleming papers of 1962–63. Obstfeld and Taylor (*Global Capital Markets*, 2004) named and measured it as a history of the twentieth century: the gold standard as corner (1), Bretton Woods as corner (3) with controls, the 1980s–2000s as a move toward (2) in the core and a mix in the periphery. The AREAER classifications, the Reinhart–Rogoff natural classification (2004, *QJE*), and the Levy-Yeyati–Sturzenegger *de facto* algorithm are the empirical infrastructure. Rey's 2015 Jackson Hole lecture is the leading statement of the dilemma view. The IMF's 2012 institutional view on capital controls reversed a 1990s presumption that the capital account should always be opened.
:::

::: summary
- Regimes run from dollarisation and currency boards through conventional pegs and crawls to managed and free floats. *De facto* often differs from *de jure*.
- The trilemma: peg, independent $i$, and free capital — pick two. UIP plus a credible peg forces $i=i^*$.
- Capital controls are the third corner. They can change composition more reliably than volume; they are only as strong as enforcement.
- Fear of floating: many announced floats are quiet $E$ and noisy $R$. Liability dollarisation and pass-through are the usual reasons.
- Reserves are an intervention budget and an insurance fund. Guidotti–Greenspan is a heuristic, not a theorem.
- The middle of the menu is populated. The trilemma is a trade-off, not a prediction that the middle vanishes.
:::

## Exercises

::: exercise Currency-board base {level=1 check="100"}
$E=2$, $R=50$ dollars. Enter $H$ in palms under $H=ER$.
::: solution
$H=2\times 50=100$, as in [[#ex-board]].
:::
:::

::: exercise Conversion {level=1 check="45"}
From that board, residents convert $10$ palms. Enter the new $R$ in dollars.
::: solution
$10$ palms are $5$ dollars; $R'=50-5=45$.
:::
:::

::: exercise UIP peg {level=1 check="5"}
A credible peg, open capital, $i^*=5$ per cent. Enter the home $i$ in per cent.
::: solution
[[#prop-trilemma]]: $i=5$.
:::
:::

::: exercise Guidotti–Greenspan {level=2 check="40"}
Short-term external debt is $40$, three months of imports are $15$. Enter the Guidotti–Greenspan reserve heuristic (the debt figure).
::: solution
The rule is $R$ at least $100$ per cent of short-term external debt, so $40$. The import rule would have been $15$; the question asked for Guidotti–Greenspan.
:::
:::

::: exercise Three corners {level=2}
Palmia wants $i=3$, $i^*=5$, and a peg at $E=2$. (a) Which assumption of [[#prop-trilemma]] must be dropped? (b) Name a historical regime that dropped that assumption. (c) Name a risk of dropping it.
::: solution
(a) Free capital mobility (UIP) must be dropped, or the peg, or the $i=3$ goal. To keep the peg *and* $i=3$, drop UIP: impose controls. (b) Bretton Woods; China for much of 1994–2015; Malaysia 1998. (c) Evasion, a parallel rate, and a sudden need to tighten controls further if markets test the peg. Dropping the peg instead is corner (2); dropping the $i=3$ goal is corner (1).
:::
:::

::: exercise Interest-rate sensitivity {level=2}
Obstfeld, Shambaugh and Taylor find that $i$ tracks $i^*$ more closely under pegs with open capital than under floats. (a) Which corner of the trilemma is that? (b) If Rey's dilemma is right, what happens to the float's coefficient? (c) Why is a non-zero coefficient under a float not by itself a rejection of the trilemma?
::: solution
(a) Corner (1): peg + open capital, $i\approx i^*$. (b) The float's coefficient on $i^*$ (or on a global factor) would be closer to the peg's: less insulation. (c) UIP under a float is $i = i^* + (E^e-E)/E + \rho$. A correlation of $i$ with $i^*$ can come from common shocks to inflation or to $\rho$, even if $E$ is free to move and the bank is setting $i$ for domestic reasons. The trilemma's float corner says $i$ *can* differ, not that it *will* be uncorrelated.
:::
:::

::: exercise A leaky control {level=3}
Palmia pegs, sets $i=3$ per cent, $i^*=5$ per cent, and imposes a tax $\tau$ on capital outflows such that the after-tax foreign return is $(1+i^*)(1-\tau)-1$. (a) What $\tau$ makes Palmia residents indifferent at $E^e=E$? (b) If half of residents can evade the tax, what happens to $R$ over time at this $i$? (c) Connect the answer to "controls must bind".
::: hint
Indifference: $i = (1+i^*)(1-\tau)-1$.
:::
::: solution
(a) $0.03 = 1.05(1-\tau)-1$, so $1.03 = 1.05(1-\tau)$, $1-\tau = 1.03/1.05 \approx 0.981$, $\tau \approx 0.019$, about a $1.9$ per cent tax on the foreign principal-plus-interest, or roughly $2$ percentage points on the rate. (b) The evading half still earns $5$ per cent abroad and $3$ per cent at home, so they convert palms to foreign currency. $R$ drains at the speed of that half's stock of movable funds. (c) A control that half the market can walk around is not corner (3). It is a peg with an open capital account for the evasive half, which is corner (1) for them, and $i=3$ is then inconsistent. The trilemma applies to the *effective* capital account.
:::
:::

::: exercise Currency-board arithmetic and a shock {level=3}
A board has $H=ER$ with $E$ fixed. Money demand is $H = k Y - h i$, and $i=i^*$ by the trilemma. A fall in $Y$ (a real shock) occurs. (a) What happens to $H$ and $R$? (b) Why might this be contractionary relative to a float? (c) What OCA-style condition (preview of the next chapter) would make the contraction less costly?
::: hint
$i$ cannot fall. LM must clear on $H$ and $Y$.
:::
::: solution
(a) $i$ stuck at $i^*$, $Y$ down, so $H$ must fall, and therefore $R$ falls: residents convert domestic money into foreign, or the current account moves toward surplus as $Y$ falls. (b) Under a float, $i$ could fall and $E$ depreciate, both of which support $Y$ in Mundell–Fleming. Under the board, the money supply *reinforces* the fall in $Y$. That is the automatic contraction of a hard peg in a downturn. (c) If labour can leave for the rest of the currency's area, or if a fiscal transfer arrives, or if prices fall quickly, $Y$ need not absorb the whole shock. Those are optimum-currency-area criteria: [[international-finance/monetary-unions]].
:::
:::
