If a basket of goods costs $100$ in Palmia and $\$50$ in the rest of the world, and the exchange rate is $2$ palms per dollar, the two baskets cost the same in a common currency. That is **purchasing power parity** (PPP): the nominal exchange rate equals the ratio of price levels. It is the open-economy version of the law of one price, applied to baskets. It fails, persistently, by tens of per cent. It also organises almost everything we know about the *long-run* exchange rate: inflation differentials, the Balassa–Samuelson effect, and the real-exchange-rate mean reversion that is too slow to be a comfort and too fast to be a random walk. This chapter is that long run. The asset market of [[international-finance/exchange-rates]] sets $E$ today given $E^e$; PPP is the leading theory of $E^e$ at a horizon of years. Illustrative prices below are invented; real series are sourced. None of this is investment advice or a forecast of a currency.

## The law of one price

::: definition Law of one price {#def-loop}
Let $P_i$ be the home-currency price of good $i$ and $P_i^*$ the foreign-currency price of the same good, same quality, at the same location in the chain (factory gate, or retail, but not mixed). The **law of one price** (LOOP) says

$$
P_i = E P_i^*,
$$

with $E$ as in [[international-finance/exchange-rates#def-nominal-e]] (home per foreign). If LOOP fails, a trader can buy the cheap location and sell the dear, subject to transport, tariffs, time and the fact that many goods are not tradable at all.
:::

LOOP is a no-arbitrage claim for a *good*. It is more plausible for gold, oil and a 40-foot container of a named electronic part than for a haircut, a housing unit or a restaurant meal. Even for tradables, retail prices include a nontradable distribution margin, so LOOP at the dock need not be LOOP on the shelf. Crucini, Telmer and Zachariadis (*American Economic Review*, 2005) find that LOOP deviations across European cities are large, good by good, and only partly explained by trade costs.

::: example A tradable and a haircut {#ex-loop}
A machine costs $12\,000$ palms in Palmia and $\$5\,000$ in the rest of the world. $E = 2$ palms per dollar. A haircut costs $20$ palms in Palmia and $\$15$ abroad. (a) Does LOOP hold for the machine? (b) For the haircut? (c) If shipping the machine costs $400$ palms each way, what band of Palmia prices is consistent with no goods arbitrage?
::: solution
(a) Foreign machine in palms: $2 \times 5\,000 = 10\,000$. Palmia's price is $12\,000$, so LOOP fails; the machine is $20$ per cent dearer in Palmia. (b) Foreign haircut in palms: $2 \times 15 = 30$, against $20$ at home. LOOP fails, as one expects: you cannot ship a haircut. (c) The no-arbitrage band is $10\,000 \pm 400$, i.e. Palmia prices in $[9\,600, 10\,400]$. The observed $12\,000$ still lies outside, so either further barriers exist or the two machines are not the same good. A LOOP deviation inside the band is not an arbitrage; a deviation outside is a puzzle or a measurement error.
:::
:::

## Absolute and relative PPP

::: definition Purchasing power parity {#def-ppp}
**Absolute PPP** is LOOP for a basket: $P = E P^*$, or $E = P/P^*$, or $Q = 1$ in the units of [[international-finance/exchange-rates#def-real-e]]. **Relative PPP** is the same claim in *changes*:

$$
\frac{\Delta E}{E} \approx \pi - \pi^*,
$$ {#eq-rel-ppp}

where $\pi = \Delta P/P$ is home inflation and $\pi^*$ is foreign inflation. Relative PPP says that the currency of the high-inflation country depreciates, one-for-one with the inflation gap. Absolute PPP implies relative PPP; the converse is false, because $Q$ can be constant at a level other than $1$.
:::

Relative PPP is the inflation analogue of the quantity theory: extra home money raises $P$ and, to keep $Q$ constant, raises $E$. It is the long-run monetary approach to the exchange rate, in one line.

::: proposition Relative PPP from a constant real rate {#prop-rel}
If $Q$ is constant, then $E = Q \cdot P/P^*$ with $Q$ fixed, and logarithmic differentiation gives

$$
\hat E = \pi - \pi^*,
$$

where hats are growth rates. This is [[#eq-rel-ppp]]. The assumption is a constant $Q$, not $Q=1$.
:::

::: proof
$E = Q P / P^*$. Take logs: $\ln E = \ln Q + \ln P - \ln P^*$. Differentiate with respect to time, or take first differences of logs. If $\ln Q$ is constant, its change is zero.
:::

::: example Inflation differentials {#ex-rel-ppp}
Palmia's inflation is $\pi = 8$ per cent, foreign inflation is $\pi^* = 2$ per cent, and $E = 2.00$ at the start of the year. If relative PPP holds, what is $E$ at the end of the year? If instead $E$ ends at $2.08$, what happened to $Q$?
::: solution
$\Delta E/E \approx 0.08 - 0.02 = 0.06$, so $E_1 \approx 2.00 \times 1.06 = 2.12$. (The exact ratio-of-levels statement is $E_1 = E_0 \times (1.08/1.02) \approx 2.118$.) If $E$ only reaches $2.08$, the palm depreciated $4$ per cent nominally against a $6$ per cent inflation gap, so $Q$ *fell* by about $2$ per cent: a real appreciation of Palmia during an inflation episode. That pattern — a peg or a slow float in the face of faster inflation — is a standard prelude to an eventual jump in $E$, discussed in [[international-finance/crises]].
:::
:::

::: widget plot
f: 2*(1+0.08*x)/(1+p*x); 2
sliders: p=0.02:0:0.10:0.005
x: 0, 10
y: 1.5, 4
labels: \text{PPP path of } E; \text{starting } E
caption: Illustrative relative PPP. Home inflation is $8$ per cent a year; drag foreign inflation $p$. The path is $E_t = 2(1.08t\text{-style product})$, drawn as the continuous analogue $2(1+0.08x)/(1+p x)$. It is a teaching curve, not a fitted series. Notice that $p=0.08$ holds $E$ flat: equal inflation, constant $E$.
:::

## Why absolute PPP fails

Four reasons, in increasing order of depth.

**Trade costs and barriers.** Shipping, tariffs, quotas and time put a band around LOOP, as in [[#ex-loop]]. Nontradables — housing, most services, government — are outside the band by construction. A CPI basket is 50–70 per cent nontradables in a typical high-income country, so $P = E P^*$ is the wrong target for that index.

**Different baskets.** Palmia's CPI weights food more than the US CPI if Palmia is poorer; the US CPI weights housing and medical care more. Comparing $P$ and $P^*$ then compares different goods. International Comparison Program (ICP) and Penn World Table prices try to hold the basket fixed; they still find large deviations of $Q$ from $1$.

**Market structure.** Pricing-to-market (Krugman 1986; Atkeson and Burstein, *AER*, 2008) lets a firm charge different mark-ups in different destinations. LOOP fails even for a named tradable, and exchange-rate pass-through into import prices is incomplete. That is a theory of *who* absorbs a depreciation, not a repair of PPP.

**The Balassa–Samuelson effect**, which is a theory of $Q$ rather than a friction.

::: definition Balassa–Samuelson {#def-bs}
Suppose each country produces a tradable $T$ and a nontradable $N$, labour is mobile between sectors inside a country but not between countries, LOOP holds for $T$, and wages equalise across sectors at home. If home has *higher productivity in $T$ relative to $N$* than foreign does, then home's nontradables are relatively expensive, home's overall price level is higher, and $Q = E P^*/P$ is *lower*: the home currency is strong in real terms. That is the **Balassa–Samuelson effect** (Balassa, *JPE*, 1964; Samuelson, *Review of Economics and Statistics*, 1964).
:::

::: proposition A one-sector-productivity formula {#prop-bs}
Let $a_T, a_N$ be home labour productivities in $T$ and $N$, and $a_T^*, a_N^*$ the foreign pair. Let $\alpha$ be the share of nontradables in the CPI, the same at home and abroad. Under the assumptions of [[#def-bs]] and competitive labour markets,

$$
\ln Q = -(1-\alpha)\cdot 0 - \alpha \bigl[(\ln a_T - \ln a_N) - (\ln a_T^* - \ln a_N^*)\bigr]
$$

up to a constant from units: a rise in home's relative $T$-productivity lowers $Q$ (real appreciation of home). The tradable price in common currency is equalised by LOOP, so it drops out.
:::

::: proof
LOOP for $T$: $P_T = E P_T^*$. Competitive wages: $w = a_T P_T = a_N P_N$, so $P_N / P_T = a_T / a_N$. Foreign analogue: $P_N^*/P_T^* = a_T^*/a_N^*$. The CPI is $P = P_T^{1-\alpha} P_N^{\alpha}$ (a Cobb–Douglas basket). Then

$$
\frac{E P^*}{P} = \frac{E P_T^{*\,1-\alpha} P_N^{*\,\alpha}}{P_T^{1-\alpha} P_N^{\alpha}} = \left(\frac{E P_T^*}{P_T}\right)^{1-\alpha} \left(\frac{E P_N^*}{P_N}\right)^{\alpha} = 1^{1-\alpha} \left(\frac{P_N^*/P_T^*}{P_N/P_T}\right)^{\alpha},
$$

using $E P_T^* = P_T$ and $E P_N^* / P_N = (P_N^*/P_T^*)/(P_N/P_T)$. Taking logs gives $\ln Q = \alpha \bigl[\ln(a_T^*/a_N^*) - \ln(a_T/a_N)\bigr]$, which is the stated formula.
:::

The Penn effect — richer countries have higher price levels — is the empirical cousin of [[#prop-bs]], because richer countries are more productive in tradables relative to haircuts. The International Comparison Program's 2021 round (World Bank, 2024 publication of ICP 2021) still shows a clear positive slope of the price level against GDP per capita. Balassa–Samuelson is not the only slope in that scatter (demand for nontradables, distribution margins, and measurement all contribute), but it is the leading supply-side theory.

::: example A productivity gap {#ex-bs}
Let $\alpha = 0.6$, $a_T/a_N = 2$ at home (a rich country) and $a_T^*/a_N^* = 1$ abroad. Using the formula in the proof of [[#prop-bs]], what is $Q$? If LOOP holds for $T$ and $E=1$ in convenient units, which country's CPI is higher?
::: solution
$\ln Q = 0.6 \bigl[\ln 1 - \ln 2\bigr] = 0.6 \times (-\ln 2) \approx 0.6 \times (-0.693) = -0.416$, so $Q \approx 0.66$. Home goods are dearer: $P > E P^*$. Home's CPI is higher because wages, set in the productive $T$ sector, inflate the price of $N$. A visitor from abroad finds home expensive, which is the Penn effect in one number. The figure $0.66$ is a model output, not a data point.
:::
:::

::: warning PPP is not a trading rule, and a "cheap" currency is not a buy
The Economist's Big Mac index is a pedagogical LOOP for one good. A Big Mac that is cheaper in Kuala Lumpur than in New York, once converted at the spot rate, does not imply that the ringgit is "too weak" in a sense that must correct next quarter. Nontradable inputs (rent, labour) dominate the sandwich; Balassa–Samuelson predicts exactly that poorer countries have cheaper Big Macs. Treating the index as a forecast of $E$ is a misuse of a cartoon, and it is not a recommendation to buy or sell any currency.
:::

## The PPP puzzle

If relative PPP held at business-cycle frequency, $Q$ would be roughly constant. It is not. Rogoff (*Journal of Economic Literature*, 1996) stated the **PPP puzzle**: deviations of $Q$ from PPP are large and last years, with a consensus half-life of three to five years in the papers he surveyed, which is both too long (if $Q$ is a real price, why so sticky?) and too short (if $Q$ is a random walk, why any mean reversion?). Later work with longer samples and nonlinear adjustment (Taylor and Taylor, *JEP*, 2004; Imbs, Mumtaz, Ravn and Rey, *QJE*, 2005, on aggregation bias) has not made the puzzle disappear. It has qualified the half-life: disaggregated prices mean-revert faster than the CPI real exchange rate, which is a weighted average of goods with different speeds.

::: intuition The real exchange rate is a relative price with two clocks
Tradable LOOP can correct in months for commodities and in a year or two for manufactures. Nontradable prices, and wages, correct in the time it takes labour markets and rents to move. A CPI-based $Q$ mixes the two clocks. Expecting $Q$ to be as jumpy as $E$ (the asset price) or as slow as the capital stock is expecting the wrong clock. Three to five years is an uncomfortable in-between, which is why it is a puzzle rather than a calibration target.
:::

::: quiz
Relative PPP holds. Home inflation is $5$ per cent, foreign inflation is $2$ per cent. What happens to $E$ (home per foreign) over the year?
- [ ] $E$ falls by $3$ per cent (home appreciates)
- [x] $E$ rises by about $3$ per cent (home depreciates)
- [ ] $E$ is unchanged, because PPP is about $Q$
- [ ] $E$ rises by $5$ per cent
::: solution
[[#eq-rel-ppp]] says $\Delta E/E \approx 5\% - 2\% = 3\%$. Home is the high-inflation country, so its currency depreciates. Absolute PPP would also require the *level* $E = P/P^*$, which this question does not give.
:::
:::

## The monetary approach in the long run

Combine relative PPP with money-market equilibrium $M/P = L(Y, i)$ and UIP. In the long run $Y$ is at potential, $i = i^* + \pi^e - \pi^{*e}$ by UIP plus Fisher, and $\pi^e = \mu$ the money-growth rate if velocity is stable. Then $P$ is proportional to $M/Y$ and $E$ is proportional to $(M/Y)/(M^*/Y^*)$. A permanent rise in home money growth raises home inflation and depreciates $E$ one-for-one in the long run. That is the **monetary approach to the exchange rate** (Frenkel 1976; Mussa 1976). It is a long-run theory. In the short run $P$ is sticky, UIP still holds, and $E$ can overshoot, which is Dornbusch's model in [[international-finance/mundell-fleming]].

::: example A doubling of $M$ {#ex-monetary}
In the long run, Palmia's $Y$ and $i$ return to their original values, foreign variables are unchanged, and absolute PPP holds. $M$ doubles. What happens to $P$ and $E$?
::: solution
$M/P = L(Y,i)$ is unchanged on the right, so $P$ doubles. Absolute PPP, $E = P/P^*$, then doubles $E$. The palm depreciates in proportion to the money stock. In the short run, before $P$ has moved, the same doubling of $M$ would cut $i$ and, by the asset approach, depreciate $E$ by *more* than this long-run factor if $E^e$ already incorporates the doubling — that extra is overshooting, saved for the next-but-one chapter.
:::
:::

## Evidence

**Hyperinflations.** Relative PPP is easiest to see when inflation differentials are enormous. Frenkel's 1976 study of the 1920s (Germany, Hungary, Poland, Austria) found that $E$ tracked $P/P^*$ closely at monthly frequency. The German mark's collapse in 1922–23 is the textbook picture. In Zimbabwe's 2007–08 hyperinflation, and in the Venezuelan bolívar in the 2010s, market (parallel) exchange rates moved with prices; official pegs did not, and $Q$ at the official rate became meaningless (Hanke and Krus, Cato working papers; IMF IFS parallel-rate notes). Relative PPP is a high-inflation fact.

**Moderate inflations.** Among OECD floats, relative PPP is a weak-to-moderate long-horizon relation. Engel (*Handbook*, 2014) summarises: inflation differentials help at five- to ten-year horizons and do little at a quarter. The real exchange rate is persistent. That is the PPP puzzle in a table.

**Penn effect.** ICP 2021 (World Bank, 2024) and the Penn World Table 10.01 (Feenstra, Inklaar and Timmer, *AER*, 2015, and updates) show price levels rising with GDP per capita. A country at one-fourth of US GDP per capita typically has a price level well below half of the US, not one-fourth — the slope is positive but less than one, which is what a Balassa–Samuelson model with $\alpha < 1$ produces.

**Big Macs and ICP.** The Economist has published the Big Mac index since 1986. It is LOOP for one processed good. It correlates with ICP price levels and with GDP per capita, as Balassa–Samuelson suggests. It is not a test of LOOP for tradables, because the sandwich is mostly nontradable inputs.

**Low- and middle-income floats.** The South African rand, the Mexican peso, the Turkish lira and the Indonesian rupiah have all had episodes in which a burst of inflation was matched, within a year or two, by a roughly one-for-one rise in $E$ against the dollar (IMF IFS, monthly, various episodes). The match is closer when inflation is high, consistent with the hyperinflation evidence, and looser when inflation is moderate and the central bank is targeting $E$ or $Q$.

::: application Real appreciation under a peg
Palmia pegs $E$ and inflates faster than the rest of the world. Relative PPP *cannot* hold unless the peg breaks. $Q$ falls: Palmia becomes expensive, $NX$ weakens, and reserves drain if the current account and capital flows do not accommodate. That is the first-generation crisis of [[international-finance/crises]] in a paragraph, and it is also the euro-area periphery in the 2000s in a different institutional skin: there was no national $E$ to move, so $Q$ had to move through $P$, which is slow. Spain and Greece saw unit-labour-cost real appreciation against Germany before 2008 (Eurostat, AMECO; ECB Harmonised Competitiveness Indicators).
:::

## Where this leads

The current account depends on $Q$ because $NX = NX(Q, Y, Y^*)$. Intertemporal choice given $Q$ is [[international-finance/current-account]]. Short-run $P$ stickiness plus UIP is [[international-finance/mundell-fleming]], where $E$ overshoots the PPP path. A peg that fights [[#eq-rel-ppp]] is a regime choice in [[international-finance/exchange-rate-regimes]] and a crisis risk in [[international-finance/crises]]. The gold standard made relative PPP a specie-flow mechanism; Bretton Woods made it an adjustable-peg problem: [[international-finance/international-monetary-system]].

::: history
Gustav Cassel's paper 'Abnormal Deviations in International Exchanges' (*Economic Journal*, 1918) and his book *Money and Foreign Exchange After 1914* (1922) made purchasing power parity the working theory of post-war rates. The doctrine is older: the Salamanca school and, in a quantity-theory form, the Bullionist controversy. Balassa's 1964 *JPE* article and Samuelson's 1964 *REStat* note independently explained why PPP should fail between rich and poor countries. Rogoff's 1996 *JEL* survey named the PPP puzzle and fixed the three-to-five-year half-life as the number a theory had to beat. The ICP, run by the World Bank with national statistical offices, is the measurement programme that makes $P$ and $P^*$ comparable at all.
:::

::: summary
- LOOP is $P_i = E P_i^*$ for a good; PPP is the same for a basket. Absolute PPP is $E = P/P^*$; relative PPP is $\Delta E/E \approx \pi - \pi^*$.
- Relative PPP follows from a constant $Q$. It is a strong fact in hyperinflations and a weak long-horizon fact among moderate inflations.
- Absolute PPP fails because of nontradables, trade costs, different baskets, pricing-to-market, and Balassa–Samuelson: rich countries are expensive, so $Q$ is low for the rich.
- The PPP puzzle is that CPI-based $Q$ mean-reverts with a half-life of years, too slow for tradable arbitrage and too fast for a random walk.
- In the long-run monetary approach, $E$ is proportional to relative money per unit of output. Short-run stickiness is later.
- A peg plus faster inflation is a real appreciation, not a PPP path.
:::

## Exercises

::: exercise LOOP band {level=1 check="10400"}
A foreign good costs $\$5\,000$, $E=2$, shipping is $400$ palms one way. Enter the upper end of the no-arbitrage Palmia price band.
::: solution
Foreign price in palms is $10\,000$; add shipping: $10\,400$, as in [[#ex-loop]].
:::
:::

::: exercise Relative PPP {level=1 check="2.12"}
$E_0 = 2.00$, $\pi = 8$ per cent, $\pi^* = 2$ per cent. Enter the approximate end-of-year $E$ under relative PPP (use $2.00\times 1.06$).
::: solution
$2.00 \times (1+0.06) = 2.12$, as in [[#ex-rel-ppp]].
:::
:::

::: exercise Real appreciation {level=1 check="2"}
$E$ rises $4$ per cent while the inflation differential $\pi-\pi^*$ is $6$ per cent. Enter the approximate percentage *fall* in $Q$ (a fall of $2$ per cent is entered as $2$).
::: solution
$\Delta Q/Q \approx \Delta E/E - (\pi-\pi^*) = 4\% - 6\% = -2\%$. $Q$ falls by $2$ per cent. That is a real appreciation of home.
:::
:::

::: exercise Exact relative PPP {level=2 check="2.118"}
$E_0 = 2$, $1+\pi = 1.08$, $1+\pi^* = 1.02$. Enter the exact $E_1 = E_0 (1+\pi)/(1+\pi^*)$ to three decimals.
::: solution
$E_1 = 2 \times 1.08/1.02 = 2.1176\ldots$, which rounds to $2.118$. The linear approximation $2.12$ in the previous exercise is the first-order cousin.
:::
:::

::: exercise Balassa–Samuelson $Q$ {level=2 check="0.66"}
In [[#ex-bs]], $\alpha = 0.6$ and the relative-productivity gap is $\ln 2$. Enter $Q \approx \exp(-0.6\ln 2)$ to two decimals.
::: solution
$Q = 2^{-0.6} \approx 0.660$. The rich home country is expensive; $Q < 1$ is a real appreciation of home relative to LOOP-for-the-CPI.
:::
:::

::: exercise Monetary doubling {level=2 check="2"}
In the long-run monetary approach of [[#ex-monetary]], $M$ doubles and $Y$, $i$, $P^*$ are unchanged. Enter the factor by which $E$ rises.
::: solution
$P$ doubles to keep $M/P$ equal to $L(Y,i)$; absolute PPP then doubles $E$. The factor is $2$.
:::
:::

::: exercise Half-life arithmetic {level=3}
A log real exchange rate follows $q_t = 0.86 q_{t-1}$ in annual data, a round number in the range Rogoff (1996) surveyed. (a) What is the half-life, the $h$ such that $0.86^h = 1/2$? (b) After five years, what fraction of an initial deviation remains? (c) Why is a half-life of this size called a puzzle rather than a confirmation of LOOP?
::: hint
Take logs: $h \ln 0.86 = \ln(1/2)$. Then $0.86^5$.
:::
::: solution
(a) $h = \ln(0.5)/\ln(0.86) \approx 0.693/0.151 \approx 4.6$ years. (b) $0.86^5 \approx 0.47$, so about $47$ per cent of the deviation remains after five years. (c) If LOOP for tradables were the whole story, $q$ should collapse in the time it takes to ship and reprice goods — months, not years. If $q$ were a random walk, $0.86$ would be $1$ and there would be no half-life. Four to five years is the uncomfortable middle that Rogoff named the PPP puzzle. The AR(1) coefficient is a stylised calibration, not a forecast of any particular $Q$.
:::
:::

::: exercise Derive the Balassa–Samuelson log $Q$ {level=3}
From $P_T = E P_T^*$, $P_N/P_T = a_T/a_N$, $P_N^*/P_T^* = a_T^*/a_N^*$, and $P = P_T^{1-\alpha} P_N^{\alpha}$ (same $\alpha$ abroad), derive $\ln Q = \alpha\bigl[\ln(a_T^*/a_N^*)-\ln(a_T/a_N)\bigr]$ as in [[#prop-bs]].
::: hint
Write $Q = EP^*/P$, substitute the Cobb–Douglas CPIs, and use LOOP to cancel $E P_T^*/P_T$.
:::
::: solution
$$
Q = \frac{E P_T^{*\,1-\alpha} P_N^{*\,\alpha}}{P_T^{1-\alpha} P_N^{\alpha}} = \left(\frac{E P_T^*}{P_T}\right)^{1-\alpha}\left(\frac{E P_N^*}{P_N}\right)^{\alpha} = \left(\frac{P_N^*/P_T^*}{P_N/P_T}\right)^{\alpha},
$$
because $E P_T^* = P_T$ and $E P_N^* / P_N = (P_N^*/P_T^*) / (P_N/P_T)$. Then $P_N/P_T = a_T/a_N$ and the foreign analogue give $Q = \bigl[(a_T^*/a_N^*)/(a_T/a_N)\bigr]^{\alpha}$, so $\ln Q = \alpha\bigl[\ln(a_T^*/a_N^*)-\ln(a_T/a_N)\bigr]$. A rise in home $a_T/a_N$ lowers $Q$: real appreciation of the more productive-in-tradables country.
:::
:::
