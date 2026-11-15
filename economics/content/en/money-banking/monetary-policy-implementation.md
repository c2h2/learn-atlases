A central bank that can create the settlement asset can also set its price. That price is the **policy rate**: an overnight rate in the market for reserves, or a rate the central bank pays or charges on a standing facility, around which other short rates cluster. This chapter is about *how* that price is implemented — **corridor** and **floor** systems, **open-market operations**, **quantitative easing** — and about the institution that is allowed to set it, **central-bank independence**.

The previous chapter derived the monetary base and the multiplier, and said why the multiplier is not the operating map of a floor system ([[money-banking/central-banking]]). Here the map is a rate. Dated policy rates (the FOMC target range, the ECB's three key rates) are observations, not recommendations. Nothing in the chapter is advice about a bond, a mortgage, or a currency.

## The policy rate and the market for reserves

Banks hold reserves to settle payments, to meet any requirement, and, when the central bank pays interest on them, as an asset that yields that interest. The **overnight interbank rate** is the rate at which a bank with a surplus of reserves lends them until the next day to a bank with a deficit. In a system of scarce reserves, that rate is determined by the intersection of a relatively inelastic demand (settlement needs) with a supply the central bank controls. In a system of abundant reserves, every bank is satiated and the interbank rate sits on the rate the central bank pays on reserves.

::: definition Policy rate {#def-policy-rate}
The **policy rate** is the short-term interest rate that the central bank targets or administers as its operational instrument. It may be a target for a market rate (the federal funds rate in the United States), an administered rate on a standing facility (the ECB's deposit-facility rate, which is the de facto policy rate in the euro area's floor), or a corridor of such rates. Other money-market rates — repo, commercial paper, bills — price off it, with spreads that vary with risk and with the abundance of the settlement asset.
:::

As of 14 November 2026 the FOMC's target range for the federal funds rate was 3.75–4.00 per cent (FOMC statement of 28 October 2026; FRED DFEDTARU). The ECB's deposit-facility rate was 2.50 per cent, its main-refinancing rate 2.65 per cent and its marginal-lending rate 2.90 per cent (ECB, key interest rates, as of 14 November 2026). Those are two operating systems: a US target range in a floor of abundant reserves, and a euro-area corridor of standing facilities that has, since the asset-purchase years, also functioned as a floor at the deposit rate.

## Corridor and floor

::: definition Corridor system {#def-corridor}
A **corridor** (or channel) system places the overnight market rate between two standing-facility rates: a **floor**, the rate paid on excess reserves or on a deposit facility, and a **ceiling**, the rate charged on a lending facility (discount window, marginal lending). The central bank supplies, by open-market operations, a quantity of reserves near the estimated demand, so that the market rate sits inside the corridor, often near the middle. Banks with a residual shortage borrow at the ceiling; banks with a residual surplus deposit at the floor. The width of the corridor is a policy choice: a narrow corridor pins the market rate more tightly and is used more.
:::

::: definition Floor system {#def-floor}
A **floor system** supplies reserves in such quantity that the market is satiated: the demand curve is flat at the rate paid on reserves (the floor), and the overnight rate sits on that floor. Open-market operations that add or drain a moderate amount of reserves do not change the overnight rate; the rate is administered by changing the interest paid on reserves. A **target range**, as in the United States, is a floor system with a small administered spread (interest on reserve balances, and an overnight reverse-repo facility that extends the floor to non-banks).
:::

::: proposition Rate determination in the two systems {#prop-systems}
Let $i^d$ be the deposit-facility (floor) rate, $i^\ell$ the lending-facility (ceiling) rate, and $i$ the overnight market rate. In a corridor with scarce reserves, $i^d \le i \le i^\ell$, and $i$ is determined by the intersection of reserve demand with a supply $R$ chosen by the central bank. In a floor with abundant reserves, $i = i^d$ (up to a small spread), and $R$ is not the instrument for $i$. Changing $i$ then requires changing $i^d$, not $R$.
:::

::: proof
No bank lends in the market below $i^d$, because the deposit facility pays $i^d$ without credit risk; no bank borrows in the market above $i^\ell$, because the lending facility supplies funds at $i^\ell$ (against eligible collateral). Hence $i \in [i^d, i^\ell]$. If $R$ is scarce, demand is downward-sloping in $i$ (higher $i$ makes it worth economising on reserves), and supply $R$ picks a point inside the corridor. If $R$ is to the right of the satiation point, demand is horizontal at $i^d$, and extra $R$ is absorbed as excess reserves at that rate. The instrument for $i$ is then $i^d$.
:::

::: widget plot
f: 4 - 0.5*x
x: 0, 10
y: 1.5, 4.5
hlines: 2.5; 2.9
labels: \text{reserve demand}
caption: An invented reserve-demand curve with a corridor between 2.5 (floor) and 2.9 (ceiling). Quantity of reserves is on the horizontal axis, the overnight rate on the vertical. In a corridor, the central bank supplies a quantity that hits the sloping part. In a floor, it supplies a quantity out on the right, where demand is sitting on the lower horizontal line. The numbers match the ECB's November 2026 *shape* (a 40 basis-point corridor), not its scale, and are not a forecast.
:::

The United States before 2008 ran a scarce-reserves corridor (with a discount-window ceiling and, for most of the period, a zero floor). From 2008 it paid interest on reserves and flooded the system with QE, becoming a floor. The ECB's pre-2008 corridor sat around the main-refinancing operations (MRO) rate; after QE, overnight rates (EONIA, then €STR) sat on the deposit facility. Returning to a scarce-reserves corridor is a possible future, and several central banks have discussed it; it is a design choice, not a necessity.

::: example Hitting the middle of a corridor {#ex-hit-middle}
Reserve demand is $R^d = 50 + 10/(i - 1)$ for $i$ in $(1, 2)$, with a floor of 1 per cent and a ceiling of 2 per cent. What $R$ puts $i$ at 1.5 per cent?
::: solution
$50 + 10/(1.5-1) = 50 + 20 = 70$. An OMO that leaves $R=70$ hits the midpoint. If the central bank instead supplies 200, $i$ falls to the floor of 1 per cent: that is the floor-system configuration of the same demand curve.
:::
:::

::: example A 40 basis-point corridor {#ex-corridor}
The ceiling is 2.90 per cent, the floor 2.50 per cent, the MRO 2.65 per cent. A bank can borrow overnight in the market at 2.70 per cent or at the ceiling, and can lend at 2.55 per cent or at the floor. Which does it do, and why might a cautious bank still use the facilities?
::: solution
Borrowing: 2.70 is cheaper than 2.90, so the market is preferred on price. Lending: 2.55 is better than 2.50, so the market is preferred on price. A cautious bank may still use the deposit facility to avoid counterparty risk in the interbank market, and may still use the lending facility if it lacks eligible counterparties or if the market has dried up — which is why, in a stress, the market rate can jump to the ceiling even when the corridor is well defined. The 40 basis-point width (ECB, November 2026) is the band inside which those choices sit.
:::
:::

## Open-market operations and standing facilities

**Open-market operations** (OMOs) are purchases or sales of securities (or repos of securities) by the central bank, with banks or with the wider market, that change the supply of reserves. In a corridor, a daily OMO is the instrument that hits the reserve-demand curve at the desired $i$. In a floor, OMOs still change $R$, and they still matter for the *stock* of reserves (too small a stock and the system falls off the floor; too large a stock is a large sheet), but they are not the day-to-day rate tool.

**Standing facilities** are available on demand, at a posted rate, against eligible collateral: a lending facility (ceiling) and a deposit facility (floor). Their use is a signal. Heavy use of the lending facility means reserves are short or the market is impaired; heavy use of the deposit facility is the normal state of a floor.

**Interest on reserves** (IOR, or IORB in US jargon) is the floor rate. It is an administered price. Raising it raises the opportunity cost of lending overnight to anyone who is not the central bank, and so raises the market rate. That is the transmission of a floor-system hike: not a drain of $R$, but a higher $i^d$.

::: warning Draining reserves is not the same as raising the rate
In a floor system, selling a modest quantity of securities (or letting them mature) reduces $R$ and does not, by itself, raise $i$, as long as $R$ remains abundant. Raising $i^d$ raises $i$ and does not, by itself, reduce $R$. Confusing a quantitative tightening of the sheet with a rate hike, or treating every H.4.1 decline in reserve balances as a tightening of the stance, is the corridor intuition applied to a floor. The stance, in a floor, is the administered rate (and the path of that rate that the central bank communicates).
:::

::: quiz
In a floor system with abundant reserves, the overnight rate is set by
- [ ] the daily open-market operation that hits a scarce-reserve demand curve
- [x] the administered rate paid on reserves (the floor)
- [ ] the required-reserve ratio
- [ ] the money multiplier
::: solution
[[#prop-systems]]: abundant $R$ puts the market on $i^d$. OMOs that do not take the system off the floor do not set $i$. The required-reserve ratio is zero in some floor systems (the US since 2020) and is not the rate instrument. The multiplier is not an operating tool.
:::
:::

## Quantitative easing and the long end

::: definition Quantitative easing {#def-qe}
**Quantitative easing** (QE) is a large-scale purchase of longer-term securities (government bonds, and in some programmes agency or corporate bonds) that expands the central-bank balance sheet beyond the quantity of reserves needed to sit on the floor. The intended channels are a lower **term premium** on the purchased assets ([[money-banking/term-structure]]), portfolio rebalancing into substitutes, and a signal that the short rate will stay low. QE is a balance-sheet policy, not a multiplier policy. **Quantitative tightening** (QT) is the reverse: runoff or sales that shrink the sheet.
:::

QE was used by the Bank of Japan from 2001, by the Federal Reserve, the Bank of England and the ECB after 2008, and again in 2020. The empirical literature (Gagnon, Rudebusch, Swanson, Krishnamurthy and Vissing-Jorgensen, and many central-bank studies) typically finds that *announcements* of purchases lower long yields by a few to several tens of basis points per trillion of expected purchases, with estimates that vary by episode and by identification. The effect on term premia is more consistently found than a large effect on expected short rates, though the two are hard to separate. Whether QE "worked" as stimulus is a broader question, involving the output and inflation effects of those yield changes, and it is not settled in a way this course will pretend to settle.

::: example A duration extraction {#ex-duration-extraction}
A central bank buys 100 of a 10-year bond with modified duration 8 from private holders, at a yield of 4 per cent. Using only the first-order duration formula, what private-market price change would match a 10 basis-point decline in the yield, on a 100 face position? This is an arithmetic illustration of the term-premium channel's *units*, not an estimate of QE's effect.
::: solution
$\Delta P \approx - D_{\mathrm{Mod}} P \Delta y = -8 \times 100 \times (-0.001) = 0.8$. A 10 basis-point yield decline is about 0.8 of price on 100 of face, or 80 basis points of price. Whether QE of 100 *causes* a 10 basis-point decline is the empirical question the event studies ask; the duration formula only converts a yield change into a price change. The chapter does not treat 10 basis points as a forecast of any programme.
:::
:::

What QE *is*, operationally, is [[money-banking/central-banking]]'s security purchase at a large scale: the central bank holds duration and credit (or duration) risk, banks hold the matching reserves, and the overnight rate is kept on the floor by IOR. Unwinding raises the question of how small $R$ can become before the system falls off the floor into a corridor — a quantity the Fed and others have been estimating through the 2020s, not a number this chapter will guess.

::: example A QE purchase and the overnight rate {#ex-qe-floor}
A floor-system central bank buys 100 of long government bonds from pension funds. Reserves rise by 100. The floor rate $i^d$ is unchanged. What happens to the overnight rate, and what is supposed to happen to the ten-year yield?
::: solution
Overnight rate: unchanged, if reserves were already abundant ([[#prop-systems]]). Ten-year yield: the intended effect is a decline, through a smaller term premium (less duration in private hands) and through any signal about future $i^d$. The size of that decline is an empirical magnitude, not an identity. The example separates the operating instrument ($i^d$) from the balance-sheet instrument (the stock of long bonds). Mixing them is the standard confusion about "printing money" during QE: the base rose; the overnight rate was still the administered floor.
:::
:::

## Independence, mandates and the fiscal link

::: definition Central-bank independence {#def-independence}
**Central-bank independence** is an institutional arrangement in which the central bank has an instrument (typically the policy rate, and in some statutes the balance sheet) that the government cannot dictate day to day, in the service of a mandate the government (or the constitution) has set — most often price stability, sometimes alongside employment or financial stability. **Goal independence** is the power to define the target; **instrument independence** is the power to choose the tool given the target. Most modern statutes grant instrument independence and a politically set goal (a 2 per cent inflation target is the common numerical form).
:::

The economic case, associated with Kydland and Prescott (1977) and Barro and Gordon (1983) and with Rogoff's conservative-central-banker proposal (1985), is time inconsistency: a government that can print money to raise output today will be expected to do so, and that expectation raises inflation without a lasting output gain. An independent central bank with a price-stability mandate is a commitment device. The political case is the opposite worry: an unelected body setting a rate that affects mortgages, jobs and the exchange rate. Different statutes strike different balances (the ECB's primary price-stability mandate in the Treaty; the Federal Reserve's dual mandate; the Bank of England's target set by the Treasury; many emerging-market inflation-targeting laws of the 1990s and 2000s).

Independence is not autarky. The central bank's remittances to the treasury, the treasury's account at the central bank, and the risk that a large sheet produces losses (when IOR exceeds the yield on assets bought in a low-rate period) are fiscal links. **Monetary financing** — the central bank buying government debt *in order to fund the budget* — is prohibited in some statutes (the EU Treaty) and is the engine of some inflations. QE that happens to hold government bonds is not, by itself, monetary financing, if the government does not dictate the purchase and if the purpose is the term-premium channel. The legal and the economic lines can still blur, which is why the distinction is a live dispute rather than a theorem.

::: application Forward guidance
A statement about the *future path* of the policy rate is **forward guidance**. Under the expectations hypothesis ([[money-banking/term-structure]]), expected future shorts are already in the long rate; a credible statement that shorts will stay low longer than previously thought lowers the long rate without a current change in $i^d$. Guidance can be qualitative ("for an extended period") or date-based or threshold-based (unemployment, inflation). Its power is the credibility of the statement, which is why it is cheaper to say than to have believed. It is a communications tool, not a fourth instrument of the same kind as IOR, OMOs and QE.
:::

::: history
**1997, Bank of England independence.** Operational independence to set the policy rate in pursuit of an inflation target set by the Treasury was granted in 1997. The arrangement became a template for several later inflation-targeting statutes: a politically chosen number, an independent instrument, and a published forecast. The 2 per cent target itself had earlier origins (New Zealand 1990, Canada, then a spreading club).
:::

## Evidence

Implementation can be checked daily. In a working floor, the effective federal funds rate sits inside the FOMC's target range, near IORB; €STR sits near the ECB's deposit facility. When the floor has slipped — the US overnight reverse-repo facility was created in part to stop non-banks from trading *below* IOR — the central bank has added a supplementary floor rather than abandoned the system. The September 2019 US repo spike was a reminder that "abundant" is a finite stock: a tax date plus a Treasury settlement drained reserves enough to push the market off the floor for a day, and the Fed responded with OMOs. That is [[#prop-systems]] with the satiation point unexpectedly reached.

QE event studies around 2008–09, 2010–12 (Europe and the US), 2013's "taper tantrum", 2014–15, and 2020 are the empirical core of the term-premium channel. Magnitudes differ; the sign on long yields at announcement is predominantly negative. Transmission to output and inflation is estimated in the same DSGE and VAR literature that estimates any other monetary shock, with the usual identification fights ([[business-cycles]], [[time-series]]).

Independence correlates, in cross-country samples from the 1980s–2000s, with lower inflation (Alesina and Summers 1993 is the classic, much-criticised, small-sample paper; later work with more countries and more careful indices is more cautious). Correlation is not a proof of the time-inconsistency mechanism, and several high-inflation episodes have involved fiscal dominance that no statute could have blocked.

## Where this leads

This chapter closes the money-and-banking course's operational block. Business-cycle courses take the policy rate as the instrument in an IS–LM or New Keynesian model ([[business-cycles]]). International-finance courses add the exchange rate, uncovered interest parity, and the impossible trinity ([[international-finance]]). Asset-pricing courses take the short rate as the first factor of the yield curve ([[asset-pricing/fixed-income]]). The corridor and the floor remain the two diagrams to keep: a scarce $R$ that hits a downward-sloping demand, or an abundant $R$ that sits on $i^d$.

::: summary
- The policy rate is the operational instrument: a target for a market overnight rate, or an administered standing-facility rate.
- A corridor pins the overnight rate between a deposit floor and a lending ceiling, with OMOs supplying scarce reserves. A floor satiates reserve demand and sets the overnight rate by the interest paid on reserves.
- In a floor, changing $R$ modestly does not change $i$; changing $i^d$ does. Draining reserves is not, by itself, a rate hike.
- QE is a large-scale purchase aimed at term premia and signals, not at the money multiplier. QT is the reverse.
- Independence is a commitment device for a politically set mandate, usually price stability. It is not the absence of a fiscal link, and it is not a theorem that inflation will be low.
:::

## Exercises

::: exercise Corridor bounds {level=1}
Floor 1.00 per cent, ceiling 1.50 per cent. Why will a creditworthy bank not lend overnight in the market at 0.80 per cent, and not borrow at 1.70 per cent?
::: solution
It can deposit at the central bank at 1.00, which dominates 0.80. It can borrow at the central bank at 1.50, which dominates 1.70 (collateral permitting). Those two inequalities are the corridor.
:::
:::

::: exercise Floor arithmetic {level=1 check="2.5"}
The deposit-facility rate is 2.50 per cent and reserves are abundant. What overnight rate does [[#prop-systems]] predict, in per cent? (Enter the number.)
::: solution
$i = i^d = 2.5$.
:::
:::

::: exercise Width {level=1}
The ECB's November 2026 rates were deposit 2.50, MRO 2.65, marginal lending 2.90. What is the width of the standing-facility corridor, in basis points?
::: solution
$2.90-2.50=0.40$ percentage points, or 40 basis points. The MRO sits 15 basis points above the floor, not in the middle of the 40.
:::
:::

::: exercise OMO in a floor {level=2}
A floor-system central bank sells 10 of bills, draining 10 of reserves. $i^d$ is unchanged and reserves remain abundant. What happens to the overnight rate? What would have happened in a scarce-reserves corridor?
::: solution
Floor: overnight rate unchanged ([[#prop-systems]]). Corridor: supply of $R$ shifts left, $i$ rises toward the ceiling. The same sale is a rate tightening in one system and a balance-sheet shrinkage without a rate change in the other.
:::
:::

::: exercise QE channels {level=2}
Name three intended channels of QE and state which one is *not* the money-multiplier channel of [[money-banking/central-banking#eq-mult]].
::: solution
Term-premium (duration) channel; portfolio rebalancing into substitutes; signalling about the path of the short rate. None of these is the multiplier $M = \frac{1+c}{rr+e+c}B$. QE raises $B$, but in a floor $e$ absorbs the rise. The intended work is on long yields, not on a multiple of $M$.
:::
:::

::: exercise Independence types {level=2}
A statute says: the inflation target is 2 per cent, set by the finance ministry; the central bank chooses the policy rate. Is this goal independence, instrument independence, both, or neither?
::: solution
Instrument independence, not goal independence. The ministry sets the goal; the bank sets the instrument. That is the Bank of England's 1997 pattern.
:::
:::

::: exercise Falling off the floor {level=3}
Reserve demand is $R^d = 80 + 20/(i - i^d)$ for $i > i^d$, and any $R \ge 200$ at $i = i^d$ (satiation). The lending rate is $i^\ell = i^d + 0.5$. If the central bank supplies $R=250$, where is $i$? If a tax date drains 80 of reserves, where is $i$? What OMO would restore the floor?
::: hint
Satiation needs $R\ge 200$. After the drain, $R=170$, which is on the sloping part.
:::
::: solution
At $R=250>200$, $i=i^d$ (floor). After a drain of 80, $R=170<200$, so $i$ is on the sloping part: $170 = 80 + 20/(i-i^d)$ implies $90 = 20/(i-i^d)$ so $i-i^d = 20/90 \approx 0.222$ percentage points (22 basis points above the floor). The ceiling is 50 basis points above, so $i$ is still inside the corridor. An OMO *purchase* of at least 30 would restore $R\ge 200$ and put $i$ back on the floor. (The September 2019 US episode was this diagram with a real tax date.)
:::
:::

::: exercise Time inconsistency in one paragraph {level=3}
A government maximises $U = y - \tfrac12 \pi^2$ with $y = y_n + (\pi - \pi^e)$. It chooses $\pi$ after $\pi^e$ is set. Show that the discretionary (time-consistent) inflation is $\pi=1$, that expected inflation is then also 1, and that output is $y_n$, whereas a commitment to $\pi=0$ would deliver the same output with less inflation. What institutional arrangement in this chapter is meant to implement the commitment?
::: hint
Substitute $y$ into $U$, take the derivative in $\pi$, then impose $\pi^e=\pi$.
:::
::: solution
$U = y_n + (\pi-\pi^e) - \tfrac12\pi^2$. Given $\pi^e$, $\partial U/\partial\pi = 1 - \pi$, so $\pi=1$. Rational expectations: $\pi^e=1$, hence $y=y_n$ and $U = y_n - \tfrac12$. Commitment to $\pi=0$ gives $\pi^e=0$, $y=y_n$, $U=y_n$, which is better. Discretion inflates without a lasting output gain. Central-bank independence with a price-stability mandate is the institutional attempt to implement $\pi=0$ (or $\pi=2$ per cent, a number, not a zero) by taking the $\pi$ choice away from the government that has the output temptation. The model is Barro–Gordon in miniature; it assumes the Phillips relation $y = y_n + (\pi-\pi^e)$ and a quadratic cost of inflation, both of which later courses qualify.
:::
:::
