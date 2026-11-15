A demand deposit against illiquid loans is a useful contract with a run equilibrium ([[money-banking/bank-runs-and-crises]]). Public policy has, for a century and more, tried to delete that equilibrium without deleting the contract. The tools are **deposit insurance**, a **lender of last resort**, **capital and liquidity requirements**, resolution regimes, and, since the 2000s, **macroprudential** instruments that look at the system rather than at one bank. Each tool has an incentive cost: insurance reduces the incentive to run and the incentive to watch; capital is expensive to those who hold the option of a public backstop; a last-resort loan can keep an insolvent bank open.

This chapter is a map of those tools and of those costs. It is not a scorecard of which country is well regulated, and it is not advice to a supervisor. Basel numbers (risk-weighted ratios, LCR, NSFR) are dated from the BIS monitoring exercise when they appear.

## Deposit insurance and the lender of last resort

::: definition Deposit insurance {#def-di}
**Deposit insurance** is a guarantee, typically public, that a deposit up to a stated coverage limit will be paid even if the bank fails. The guarantee may be pre-funded by premiums, backed by the treasury, or both. Covered depositors have no reason to run; uncovered depositors and other creditors still might. The guarantee transfers credit risk from the depositor to the insurer, and it reduces the depositor's incentive to monitor the bank — a **moral-hazard** cost ([[money-banking/financial-intermediation]]).
:::

Federal deposit insurance in the United States dates from the Banking Act of 1933 (the FDIC). Many countries followed after later crises; explicit systems are now the norm, with coverage limits, coinsurance in some older schemes, and a funding mix that the IMF and the IADI (International Association of Deposit Insurers) catalogue. Coverage that is too low leaves a run incentive for the uninsured tail; coverage that is too high, or that is extended in a panic to all liabilities, is a fiscal contingent claim. The 2008 extensions of guarantees, and the 2023 US decision to cover uninsured deposits at two failed banks, are illustrations of the second horn.

::: definition Lender of last resort {#def-lolr}
A **lender of last resort** (LOLR) is an institution, almost always the central bank, that can create the settlement asset and lend it to solvent but illiquid banks (or, in some doctrines, to the market) in a panic. Bagehot's rule, in *Lombard Street* (1873), is to lend **freely**, at a **penalty rate**, against **good collateral** valued at a realistic price in a panic. The rule aims to stop a Diamond–Dybvig run without subsidising insolvent banks. Identifying solvency in real time, and valuing collateral in a fire sale, are the practical difficulties.
:::

Bagehot wrote about the Bank of England and the London money market. The doctrine has been adapted to discount windows, to broad-collateral facilities, to market-maker-of-last-resort operations in securities, and to international swap lines. Critics (from Thornton in 1802 through Goodfriend and King to the post-2008 literature) worry that a generous LOLR is insurance by another name, and that penalty rates are rarely penal in a crisis. Supporters argue that a run on a solvent book is a preventable public bad. The chapter records the trade-off; it does not close it.

::: example Penalty rate {#ex-penalty}
The market overnight rate is 4 per cent in normal times. A Bagehot facility charges 5 per cent against good collateral. In a panic the market is closed and a solvent bank's alternative is a fire sale that realises 90 on assets worth 100. Does the bank use the facility? Why might the 5 per cent still fail to be "penal" *ex post*?
::: solution
A 1 percentage-point overnight penalty is trivial next to a 10 per cent fire-sale loss, so a solvent bank uses the facility — which is the point of "lend freely". The 5 per cent is penal relative to the *normal* 4 per cent, so the facility is not cheap funding in peacetime. In the panic it is cheap relative to the fire sale, so it is used. *Ex post*, if the panic lasts and the 5 per cent is rolled for months, the penalty may look small compared with a market rate that would have been 10 per cent had the market been open; that is the Goodfriend–King worry that crisis LOLR is a subsidy. The example does not settle the worry; it names the two comparison rates.
:::
:::

A **resolution** regime — special bankruptcy for banks — tries to impose losses on equity and on uninsured creditors in a pre-set order (a **bail-in**) while keeping the payment system running. The post-2008 fashion for "no more bail-outs" produced bail-in statutes in the United States (Orderly Liquidation Authority under Dodd–Frank, 2010) and in the European Union (BRRD). Using them at speed, on a bank that is also a run, remains a live operational problem, as 2023 showed when authorities mixed insurance, sale and equity wipe-out.

::: proposition Insurance deletes the run equilibrium among the insured {#prop-insurance}
In the Diamond–Dybvig environment of [[money-banking/bank-runs-and-crises#def-dd]], if an insurer credibly guarantees the date-1 payoff $c_1$ to every depositor who withdraws, a late type no longer strictly prefers to withdraw when others withdraw: sequential service does not threaten their $c_1$. The run equilibrium among *insured* depositors disappears. The assumptions are credibility of the insurer (including fiscal backing), coverage of the relevant claim, and no other reason to run (a currency conversion, a rumour of delayed payout). Uninsured claimants are a different game.
:::

::: proof
A late type's payoff from withdrawing in a run, under sequential service without insurance, was a lottery over $c_1$ and a leftover less than $c_1$. With a credible guarantee of $c_1$ (or of the contracted $c_2$ if they wait), waiting still pays $c_2 > c_1$ if the bank is not liquidated, and pays the guaranteed amount if it is. The strict first-mover advantage is gone. Hence "withdraw because others withdraw" is no longer a best response for a covered depositor. Credibility is doing the work: an insurer who may not pay, or who may impose a haircut, restores a first-mover advantage.
:::

::: example Coverage limits {#ex-coverage}
A fictional bank has 100 of deposits: 60 are fully insured, 40 are uninsured. Assets would fetch 70 in a fire sale. Insured depositors stay. If the uninsured run and are paid in the sequential queue *ahead of* a later insurance payout, who is left with the 70 of liquidation value, and does the insurance fund take a loss?
::: solution
Institutional details matter. In a typical deposit-insurance *receivership*, insured deposits are paid (or transferred) by the insurer, who then stands in their place as a creditor. If liquidation yields 70 and the insurer has paid 60, the 70 is split among the insurer (60 of claims) and the uninsured (40 of claims) by the creditor hierarchy — often *pari passu* among deposits, with the insurer subrogated. Then the insurer recovers $70 \times 60/100 = 42$ and loses 18; uninsured recover 28 on 40. If instead uninsured can grab 40 of cash on the way out before the receiver arrives, they take 40, the remaining 30 pays 30 of the insurer's 60, and the fund's loss is 30. The example is why *who can run, and in what order* is a legal design, not a footnote. The 60 of insured deposits do not run in either case, which is [[#prop-insurance]].
:::
:::

## Capital and liquidity: the Basel accords

::: definition Risk-weighted capital ratio {#def-rwcr}
A **risk-weighted capital ratio** is regulatory capital divided by **risk-weighted assets** (RWA): a weighted sum of exposures in which safer assets (cash, some government bonds) carry smaller weights than riskier loans. Basel I (1988) set an 8 per cent minimum of capital to RWA for internationally active banks, with a simple bucket of weights. Basel II (2004) allowed internal models for some banks. Basel III (agreed 2010, with later revisions) raised the quality of capital (more common equity), added buffers, a **leverage ratio** (capital over an unweighted exposure measure), and two liquidity standards.
:::

The **Liquidity Coverage Ratio** (LCR) requires a stock of unencumbered high-quality liquid assets (HQLA) sufficient to cover projected net cash outflows over a 30-day stress:

$$
\mathrm{LCR} = \frac{\text{HQLA}}{\text{net cash outflows in a 30-day stress}} \ge 1.
$$ {#eq-lcr}

The **Net Stable Funding Ratio** (NSFR) requires available stable funding (capital, long-term debt, stable deposits) to cover required stable funding (a weighted sum of assets and off-balance-sheet items) over a one-year horizon, also at a minimum of 1. The LCR is a short-stress buffer; the NSFR is a structural funding constraint. National implementation varies in scope and in the weights.

::: example A toy LCR {#ex-lcr}
A fictional bank holds 120 of HQLA. In the 30-day stress it would see 150 of outflows and 40 of contractual inflows. Inflows that can offset outflows are capped at 75 per cent of outflows. Compute net outflows and the LCR.
::: solution
Inflow cap: $0.75 \times 150 = 112.5$; actual inflows 40 are below the cap, so they count in full. Net outflows $150-40=110$. $\mathrm{LCR} = 120/110 \approx 1.091$, or 109 per cent, above the 100 per cent minimum. If inflows had been 130, only 112.5 would count, net outflows would be $150-112.5=37.5$, and the LCR would be $120/37.5=3.2$. The cap is there so that a bank cannot assume it will be paid in a stress that is also its counterparties' stress.
:::
:::

::: widget plot
f: 120/(150-min(x,0.75*150))
x: 0, 140
y: 0.5, 4
labels: \text{LCR}
hlines: 1
caption: Toy LCR of [[#ex-lcr]] as a function of contractual inflows $x$, with HQLA $=120$ and outflows $=150$. The horizontal line is the 100 per cent minimum. Notice the kink at the 75 per cent inflow cap ($x=112.5$). Invented numbers, not a bank's filing.
:::

The BIS Basel III monitoring report based on 31 December 2025 data put the weighted-average LCR of Group 1 banks at 136.6 per cent and the NSFR at 123.3 per cent (BCBS, 23 September 2026). Averages sit comfortably above the minima; the interesting objects are the left tail and the national differences in what counts as HQLA.

::: example A toy NSFR {#ex-nsfr}
A fictional bank has available stable funding of 200 (capital 20, long-term debt 40, stable deposits weighted at 140) and required stable funding of 180 (loans weighted at 150, securities at 30). Compute the NSFR. If 50 of stable deposits become less stable and their ASF weight falls by 20, does the ratio still clear 100 per cent?
::: solution
$\mathrm{NSFR} = 200/180 \approx 1.111$, or 111 per cent, above 100. After the weight change, ASF $= 200-20=180$, NSFR $= 180/180=1$. It still clears, with no slack. A further 1 of flight would put it below the minimum without a matching cut in RSF (selling loans, or replacing them with HQLA that carry a lower RSF weight).
:::
:::

Capital regulation has a **procyclicality** problem: RWA rise in a downturn as measured risks rise, which forces banks to cut lending or to raise equity in the worst market, which deepens the downturn. Basel III's **countercyclical capital buffer** and some countries' dynamic provisioning (Spain before 2008, in an earlier form) are attempts to build the requirement in the boom. How much those buffers have changed the cycle is an empirical question still being asked.

::: warning Risk weights are a model
An 8 per cent ratio of capital to RWA is only as tight as the weights. A portfolio of claims that the formula calls 20 per cent risky needs a fifth of the capital of a portfolio the formula calls 100 per cent risky. Internal models, sovereign weights of zero in some jurisdictions, and off-balance-sheet items have all, at times, made a high reported ratio coexist with a thin true equity cushion. The unweighted leverage ratio was added in Basel III for that reason. Treating a reported CET1 ratio as a sufficient statistic for soundness is a category error.
:::

## Macroprudential policy and the cycle in credit

**Microprudential** regulation looks at one bank's probability of failure. **Macroprudential** regulation looks at the system's. The two coincide if failures are independent; they diverge when they are not — fire sales, runs, correlated books ([[money-banking/bank-runs-and-crises]], [[money-banking/banking]]).

::: definition Macroprudential policy {#def-macropru}
**Macroprudential policy** is the use of regulatory instruments to limit **systemic risk**: the risk of disruption to the provision of credit and payments from the impairment of all or part of the financial system. Instruments include countercyclical capital buffers, sectoral risk weights (for example, on mortgages), loan-to-value and debt-service-to-income caps on borrowers, liquidity tools, and restrictions on foreign-currency lending. The borrower-based tools act on the *demand* for credit as well as on the banks.
:::

The intellectual case is the financial accelerator plus fire-sale externalities: a bank does not internalise the effect of its leverage on asset prices in a downturn, nor the effect of its dollar lending on a future devaluation. Emerging-market economies used LTV caps and FX-lending limits earlier and more heavily than the United States or the euro area (Korea, Hong Kong SAR, Israel, several Latin American central banks). Advanced economies expanded the toolkit after 2009. Evidence on the *credit* effects of LTV and DSTI caps is relatively strong (they slow household credit growth); evidence on the *output-stabilisation* benefits is thinner, because the tools are rarely randomised and because they interact with monetary policy.

A live dispute, which this course does not settle, is the assignment of instruments: should the countercyclical buffer be set by the central bank, by a separate committee, or by a finance ministry? The trade-off is between using the information in the monetary-policy room and protecting the inflation mandate from a credit-cycle mandate. Different countries have chosen different assignments (the Bank of England's FPC, the US FSOC, the ESRB in the EU, national authorities in many middle-income countries).

::: application Too big to fail
A bank whose failure would freeze the payment system or the wholesale market is **systemically important**. If creditors believe it will be saved, they fund it more cheaply, which is a subsidy to size and to interconnectedness, and a moral-hazard problem. Post-2008 policy added extra capital surcharges for global systemically important banks (G-SIBs), living wills, and bail-in debt. Whether the subsidy has gone is an empirical question (funding-spread studies give mixed answers). The label is a policy problem, not a compliment.
:::

::: quiz
Bagehot's rule tells the last-resort lender to
- [ ] lend only to insolvent banks, so as to recapitalise them
- [x] lend freely, at a penalty rate, against good collateral
- [ ] guarantee all liabilities of all banks
- [ ] suspend convertibility of the currency
::: solution
Freely, penalty rate, good collateral: [[#def-lolr]]. Recapitalising insolvent banks is a fiscal (or resolution) task, not the classical LOLR. A blanket guarantee is deposit insurance taken to the limit. Suspension is a different nineteenth-century tool.
:::
:::

::: history
**December 2010, Basel III.** The Basel Committee published a package that raised the quality and quantity of capital, added a leverage ratio, and introduced the LCR and (later finalised) the NSFR. Implementation was phased through the 2010s, with the final 2017 revisions ("Basel III endgame") still being timed in by jurisdictions in the mid-2020s. The package is the regulatory counterpart of the 2008 crisis, as Basel I was of the 1980s Latin American debt and of competitive inequality among G10 banks.
:::

## Evidence

Deposit-insurance coverage and the incidence of retail runs are negatively associated in the post-1933 US record and in cross-country samples (Demirgüç-Kunt and Detragiache, and later IADI studies), with the moral-hazard caveat that more generous insurance correlates, in some samples, with riskier bank books. Causal identification is hard: countries adopt insurance after crises.

On capital, a large literature (BCBS assessments, Admati and Hellwig's *The Bankers' New Clothes*, 2013, on one side; banking-industry cost-of-capital studies on the other) disagrees on how costly equity is for banks and on how much of that cost is private rather than social. The positive fact is that higher equity, holding the asset book fixed, raises the loss that can be absorbed before creditors and the insurer are hit. The disputed fact is the effect on the price and quantity of credit.

On liquidity, the December 2025 BIS monitoring averages (LCR 136.6 per cent, NSFR 123.3 per cent for Group 1) show compliance at the mean. The March 2023 US regional-bank episode showed that a bank can have a comfortable regulatory liquidity ratio and still lose uninsured deposits in hours if the duration hole is visible and the claimants are concentrated and online. Ratios are not the run.

## Where this leads

The institution that lends last-resort funds and that holds the reserve accounts is the central bank ([[money-banking/central-banking]]). How it sets the overnight rate, in a corridor or on a floor, is [[money-banking/monetary-policy-implementation]]. Macroprudential tools interact with that rate, which is why later macro courses treat them together ([[business-cycles]]). Information-economics courses return to the moral hazard of insurance ([[information-economics]]). The definitions of LCR, NSFR and RWA travel; the numbers in a filing expire.

::: summary
- Deposit insurance removes the run incentive for covered depositors and creates a monitoring (moral-hazard) problem. Coverage design is a trade-off.
- Bagehot's LOLR rule is: lend freely, at a penalty rate, against good collateral. Solvency is assumed; measuring it in a panic is the difficulty.
- Basel I–III are international capital (and, since III, liquidity) minima. The LCR is a 30-day stress buffer; the NSFR is a one-year funding constraint; the leverage ratio is a backstop to risk weights.
- Risk weights are a model. A high ratio to RWA can coexist with thin unweighted equity.
- Macroprudential policy targets systemic risk with buffers, sectoral weights and borrower-based caps. It is a complement to, not a replacement for, microprudential rules and monetary policy.
:::

## Exercises

::: exercise Bagehot {level=1}
State Bagehot's three adjectives (or phrases) for last-resort lending, and one sentence on why a *penalty* rate is in the list.
::: solution
Freely; at a penalty rate; against good collateral. A penalty rate is meant to make the facility unattractive in normal times, so that banks do not use the central bank as cheap funding, and to compensate the central bank for the risk it takes even on "good" collateral in a panic.
:::
:::

::: exercise LCR minimum {level=1 check="1"}
What is the Basel minimum LCR, as a ratio (enter 1 for 100 per cent)?
::: solution
1.
:::
:::

::: exercise Insurance and sequential service {level=1}
Why does a credible 100 per cent guarantee of par to every depositor eliminate the Diamond–Dybvig run among those depositors, in one sentence?
::: solution
Because a covered depositor is paid $c_1$ (or par) whether they are first or last, so there is no first-mover advantage.
:::
:::

::: exercise Toy LCR {level=2 check="1.2"}
HQLA 180, stress outflows 200, stress inflows 50, inflow cap at 75 per cent of outflows. What is the LCR (enter as a decimal to one place, e.g. 1.2)?
::: solution
Inflow cap $0.75\times 200=150$; inflows 50 count in full. Net outflows $200-50=150$. LCR $180/150=1.2$.
:::
:::

::: exercise Risk weights {level=2}
A bank has 50 of cash (weight 0), 100 of loans (weight 100 per cent), and 50 of assets weighted at 50 per cent. Capital is 16. Compute RWA and the capital/RWA ratio. Compare with the unweighted leverage ratio $E/A$.
::: solution
RWA $= 0\times 50 + 1\times 100 + 0.5\times 50 = 125$. Capital/RWA $= 16/125 = 12.8$ per cent. Assets $A=200$, $E/A=8$ per cent. The risk-weighted ratio looks healthier than the unweighted one because half the book is cash or half-weighted. Whether that is warranted depends on whether cash is really riskless and whether the 50 per cent bucket is well measured.
:::
:::

::: exercise Moral hazard of a guarantee {level=2}
A fictional bank can choose a safe book with a low return or a risky book that pays a private bonus in the good state and wipes out equity in the bad state. Depositors are fully insured and do not demand a spread for risk. Who bears the downside of the risky book, and what instrument in this chapter is aimed at that choice?
::: solution
The insurer (and behind it, the fund's other members or the taxpayer) bears the downside once equity is gone. Depositors do not. Capital requirements (and risk-sensitive premiums, covenants, supervision) are the instruments that put residual loss back on equity and constrain the risky book. Insurance without those is a put option written by the public.
:::
:::

::: exercise LOLR versus recapitalisation {level=3}
A bank has a hole in its equity (insolvent on a mark-to-market of the loan book) and a retail run. Explain why a Bagehot loan against the loans at a non-distressed valuation can keep the bank open, why that is not a recapitalisation, and what goes wrong if the mark is wrong.
::: hint
A loan adds an asset (cash) and a liability (the LOLR loan); it does not add equity.
:::
::: solution
The LOLR swaps cash for a claim on the bank, collateralised. The book still has $A-L = E < 0$ if it was insolvent; the loan does not fill $E$. It fills a *liquidity* hole, so the run can be paid. If the collateral was overvalued, the central bank has taken a credit loss that is a transfer to the bank's other creditors — a stealth recapitalisation, which is a fiscal act without a fiscal vote. If the bank is solvent and the mark is fair, the loan is repaid when the run stops and the LOLR has done Bagehot's job. The difficulty is that the two cases are hard to tell apart at the moment of the run, which is why modern doctrine pairs LOLR with a resolution authority that can write down equity.
:::
:::

::: exercise Countercyclical buffer {level=3}
In a boom, measured PDs are low, RWA are low, and a risk-weighted ratio is easy to meet with thin equity. In a bust the reverse happens. How does a countercyclical capital buffer, raised in the boom and released in the bust, change that arithmetic? What would you need to see in the data to conclude it had worked?
::: hint
Compare required capital in the boom with and without the buffer, and lending in the bust with and without a release.
:::
::: solution
Raising the buffer in the boom means the bank must hold more capital (or shrink assets) while PDs look low, so the boom is less levered than the unweighted cycle of RWA would produce. Releasing the buffer in the bust lowers the *requirement* just as measured RWA are rising, so the bank is less forced to cut loans or to issue equity in a bad market. Evidence that it "worked" would be: (i) a smaller rise in bank leverage in the boom in jurisdictions that raised the buffer, other things equal; (ii) a smaller contraction of credit in the bust when the buffer was released, compared with otherwise similar busts; (iii) no fully offsetting move into unregulated credit. Identification is hard because buffers are raised when authorities already think the boom is hot. Cross-jurisdiction timing (BIS surveys of CCyB rates) is the usual laboratory.
:::
:::
