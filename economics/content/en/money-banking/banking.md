A commercial bank is a firm whose product is the transformation described in [[money-banking/financial-intermediation]]: liquid, small, safe-looking claims on one side of the balance sheet, and larger, longer, riskier claims on the other. This chapter reads that balance sheet, names the risks it creates — **liquidity risk**, **credit risk**, **interest-rate risk** — and introduces **bank capital** as the residual that absorbs losses. The arithmetic of duration, from [[money-banking/interest-rates]], comes back as a **duration gap**. The arithmetic of inside money, from [[money-banking/money-and-payments]], comes back as loan creation.

Illustrative banks in the examples are fictional. When a real aggregate appears (US bank reserves, a Basel ratio from the BIS monitoring exercise), it is sourced and dated. Nothing here is a recommendation to hold a bank's equity or deposits, or to run a bank.

## The bank balance sheet

::: definition Commercial-bank balance sheet {#def-bs}
A **commercial bank** holds **assets** (reserves at the central bank and vault cash, marketable securities, loans, and other assets) equal to **liabilities** (deposits of various types, wholesale funding, other debt) plus **capital** (equity, and other loss-absorbing items that the accounting and the regulator count as such). The accounting identity is $A = L + E$. **Reserves** are outside money on the bank's book; **deposits** are inside money of the public.
:::

A stylised picture, in units of money:

| Assets | | Liabilities and capital | |
|---|---|---|---|
| Reserves | 10 | Retail deposits | 70 |
| Government securities | 20 | Wholesale funding | 20 |
| Loans | 70 | Capital | 10 |
| **Total** | **100** | **Total** | **100** |

The composition varies enormously by country and by type of bank: a mortgage specialist in Denmark does not look like a development bank in India or a money-centre bank in New York. The identity does not vary. Three ratios are read off the book constantly. The **reserve ratio** is reserves over deposits (here $10/70 \approx 14$ per cent). The **loan-to-deposit ratio** is $70/70 = 1$. The **leverage ratio** of assets to capital is $100/10 = 10$ (an equity-to-assets ratio of 10 per cent). Regulatory capital ratios, in [[money-banking/regulation]], risk-weight the assets and apply a more careful definition of capital; they are cousins of $E/A$, not the same number.

Deposits are the bank's cheap, relationship-based funding when they are stable, and they are the bank's runnable funding when they are not. Wholesale funding — certificates of deposit sold to funds, repurchase agreements, interbank loans, commercial paper — is typically shorter, more rate-sensitive and quicker to disappear in a scare. The 2007–09 crisis was, among other things, a crisis of wholesale funding; so was the March 2023 episode at some US regional banks, which mixed a duration loss on securities with a flight of uninsured deposits.

::: example Reading a fictional book {#ex-read-bs}
Bank Fictional has reserves 15, securities 25, loans 160, deposits 150, wholesale funding 30, other liabilities 5. Compute capital, the equity-to-assets ratio, the reserve ratio (reserves over deposits) and leverage $A/E$.
::: solution
Assets $15+25+160=200$. Liabilities excluding capital $150+30+5=185$. Capital $E = 200-185 = 15$. Equity-to-assets $15/200 = 7.5$ per cent. Reserve ratio $15/150 = 10$ per cent. Leverage $200/15 \approx 13.33$. The bank is more levered than the stylised 10-to-1 book above, and it holds a thick loan book relative to deposits (loan-to-deposit $160/150 \approx 1.07$), so some loans are funded wholesale.
:::
:::

## Liquidity risk and credit risk

**Liquidity risk** is the risk of not being able to meet cash outflows as they come due without damaging fire sales. A bank that funds 10-year loans with deposits that can be withdrawn tomorrow is, as a matter of arithmetic, illiquid even if it is solvent (assets exceed liabilities at a going-concern valuation). The next chapter's Diamond–Dybvig model is a theory of why that contract is nonetheless useful, and why it is fragile. Practical liquidity management is a **maturity ladder**: projected inflows and outflows by bucket (overnight, one week, one month, one year), a stock of unencumbered high-quality liquid assets, and access to the central bank's standing facilities. Basel's Liquidity Coverage Ratio and Net Stable Funding Ratio, in [[money-banking/regulation]], are standardised versions of that ladder.

**Credit risk** is the risk that a borrower does not pay. It is the bread and butter of [[money-banking/financial-intermediation]]: screening, covenants, collateral, diversification across names, sectors and regions, and provisions for expected loss. Unexpected loss is what capital is for. Concentration — one large name, one city, one crop, one export commodity — is how well-capitalised banks still fail. The 1980s US savings-and-loan crisis mixed credit risk (property) with interest-rate risk (below); several African and Latin American banking crises have mixed credit risk with currency mismatch (lending in dollars to borrowers who earn local currency).

A simple expected-loss formula is

$$
\mathrm{EL} = \mathrm{PD} \times \mathrm{LGD} \times \mathrm{EAD},
$$ {#eq-el}

probability of default times loss given default times exposure at default. Provisions (allowances) should cover EL; capital should cover unexpected loss, at some confidence level. The formula is an accounting identity for the mean, not a model of the tail.

::: proposition Diversification of independent defaults {#prop-div}
Suppose $n$ loans of size $1/n$, each defaulting independently with probability $p$ and loss given default 1. Then the portfolio loss rate has mean $p$ and variance $p(1-p)/n$, which tends to 0 as $n\to\infty$. In the limit, a diversified book of independent loans behaves like a sure loss of $p$, which can be priced into the spread; it does not require capital for unexpected loss. The assumptions — independence, identical $p$, no residual common factor — are the ones actual loan books violate.
:::

::: proof
Each loan's loss is a Bernoulli($p$) random variable $X_i$. The portfolio loss rate is $\bar X = n^{-1}\sum X_i$. $\E\bar X = p$ and $\Var(\bar X) = n^{-1}p(1-p)$ by independence. Chebyshev's inequality: $\Prob\bigl(|\bar X - p| \ge \varepsilon\bigr) \le p(1-p)/(n\varepsilon^2) \to 0$. The limit statement is a law of large numbers. A common factor (a recession that lifts every $p$) reintroduces a variance that does not vanish with $n$, which is why sector and cycle concentrations eat capital.
:::

::: warning Solvency is not liquidity
A bank can have $A>L$ at mark-to-market prices and still be unable to pay a deposit outflow today, if the assets cannot be sold or pledged in time. It can also be liquid (a pile of reserves) and insolvent (assets worth less than liabilities). Treating a liquidity-support operation as a verdict on solvency, or a capital injection as a cure for a run, is a confusion of the two risks. They interact — fire sales turn a liquidity problem into a solvency one — but they are not the same.
:::

## Interest-rate risk and the duration gap

A bank that holds a five-year fixed-rate loan funded by a one-year deposit gains when yields fall and loses when they rise: the asset revalues more than the liability. That is **interest-rate risk**, and duration is its first-order measure.

::: definition Duration gap {#def-dgap}
Let $D_A$ be the Macaulay duration of assets, $D_L$ that of liabilities, $A$ the market value of assets and $L$ of liabilities. The **duration gap** is

$$
\mathrm{DG} = D_A - \frac{L}{A} D_L.
$$ {#eq-dgap}

For a parallel shift $\Delta y$ in the yield curve, the change in the market value of equity satisfies, to first order,

$$
\Delta E \approx -\,\mathrm{DG}\cdot A \cdot \frac{\Delta y}{1+y}.
$$ {#eq-dE}

Assumptions: a single parallel shift of a flat curve, Macaulay durations computed at that $y$, no optionality in the cash flows (prepayments, draws, non-maturity deposits), and no change in credit spreads. Each assumption fails in practice; the formula is a first look.
:::

::: proof
$\Delta A \approx - D_A A \Delta y/(1+y)$ and $\Delta L \approx - D_L L \Delta y/(1+y)$, from [[money-banking/interest-rates#def-duration]]. Then $\Delta E = \Delta A - \Delta L \approx -\bigl(D_A A - D_L L\bigr)\Delta y/(1+y) = -\mathrm{DG}\cdot A\cdot \Delta y/(1+y)$.
:::

A positive duration gap (the usual commercial-bank case: longer assets than liabilities) means equity falls when yields rise. Non-maturity deposits — current accounts that in practice stick around — have an *effective* duration that is a modelling choice, and a controversial one: treat them as overnight and the gap looks large; treat them as five-year money and it looks small. The 2023 US regional-bank losses on securities portfolios were duration-gap losses on assets that had been stuffed with long bonds in 2020–21, combined with a run of uninsured deposits that refused to be modelled as sticky.

::: example A duration-gap shock {#ex-dgap}
A fictional bank has assets 100 with $D_A = 4$ years, liabilities 90 with $D_L = 1$ year, $y = 5$ per cent. Compute DG and the first-order change in equity if yields rise by 100 basis points.
::: solution
$\mathrm{DG} = 4 - (90/100)\times 1 = 3.1$ years. $\Delta E \approx -3.1 \times 100 \times 0.01/1.05 = -2.952$. Equity was $10$; it is about $7.05$ after the shock, a 30 per cent decline. Leverage amplified a 3 per cent-ish asset-price move into a 30 per cent equity move. The approximation ignores convexity and spread changes.
:::
:::

::: widget plot
f: 10-3.1*100*(x-0.05)/1.05
x: 0.02, 0.09
y: 0, 20
labels: \text{equity (duration-gap approx)}
caption: First-order equity of the fictional bank in [[#ex-dgap]] against the level of $y$. The line is the duration-gap formula, not a market and not a forecast. A 100 basis-point rise from 5 per cent cuts equity by about 3. The bank is invented.
:::

Hedging the gap — matching durations, using swaps, holding floating-rate assets — is a risk-management choice with a cost: a matched book earns a thinner transformation spread. The chapter does not recommend a hedge ratio.

::: example A matched book {#ex-matched}
The bank of [[#ex-dgap]] replaces 40 of its 4-year assets with 40 of one-year bills, so $D_A$ falls. Approximate the new $D_A$ as a value-weighted average, recompute DG, and the first-order $\Delta E$ for a 100 basis-point rise in $y$.
::: solution
New $D_A = (60/100)\times 4 + (40/100)\times 1 = 2.8$. $\mathrm{DG} = 2.8 - 0.9\times 1 = 1.9$. $\Delta E \approx -1.9 \times 100 \times 0.01/1.05 = -1.810$, compared with $-2.952$ before. Matching has cut the interest-rate hit to equity by about 40 per cent in this arithmetic. The cost, not shown in the duration formula, is the spread given up on the 40 that is no longer lent long.
:::
:::

## Capital, leverage and ROE

Capital is the residual $E = A - L$ at a given valuation, and it is also a regulatory quantity that does not coincide with that residual. For this chapter, take $E$ as equity.

::: definition Leverage and the ROE identity {#def-roe}
**Leverage** is $A/E$. If the return on assets is $\mathrm{ROA} = \mathrm{profit}/A$, the **return on equity** satisfies

$$
\mathrm{ROE} = \mathrm{ROA} \times \frac{A}{E}
$$ {#eq-roe}

in the absence of net non-operating items. A thin equity margin on a large book produces a high ROE when the margin is positive, and a fast wipe-out when it is negative. The identity is accounting, not a recommendation to lever.
:::

A 1 per cent ROA at 12.5-to-1 leverage is a 12.5 per cent ROE. A 1 per cent *loss* on assets is a 12.5 per cent loss of equity; eight such years, or one 8 per cent asset loss, and the equity is gone. That is why capital regulation exists, and why banks (and their shareholders) have an incentive to economise on equity if someone else bears the tail — a moral-hazard theme that [[money-banking/regulation]] takes up.

Loan-loss provisions reduce profit, hence ROA, when they are taken. Mark-to-market losses on securities reduce equity directly if they flow through comprehensive income, or sit in an accounting bucket (held-to-maturity) that hides them from the equity line until they are realised. The held-to-maturity choice does not hide them from a depositor who can see an unrealised loss and run, which is a 2023 lesson.

::: example ROE arithmetic {#ex-roe}
Bank Fictional has assets 200, capital 16, and earns a profit of 2 in a year. Compute ROA, leverage and ROE. If next year the profit is $-2$, what is the percentage change in capital, ignoring dividends and new issuance?
::: solution
$\mathrm{ROA} = 2/200 = 1$ per cent. Leverage $200/16 = 12.5$. $\mathrm{ROE} = 0.01 \times 12.5 = 12.5$ per cent. A profit of $-2$ is an ROA of $-1$ per cent and an ROE of $-12.5$ per cent: capital falls from 16 to 14, a 12.5 per cent decline. The same asset shock with capital of 40 (leverage 5) would have been a 5 per cent decline in capital. Leverage scales both the good year and the bad year.
:::
:::

## Creating deposits

A loan on a bank's book is typically matched, at origination, by a deposit: the bank credits the borrower's account. Inside money rises. When the borrower pays a customer of another bank, reserves move, and the originating bank must fund the reserve drain with other liabilities or asset sales. In a system of many banks, one bank's drain is another's inflow. In the aggregate, loans create deposits, subject to the public's willingness to hold them and to the banks' ability to obtain the reserves the central bank chooses to supply (or to pay the price of the standing facility). That last clause is why the old textbook story of a mechanical money multiplier, taken up in [[money-banking/central-banking]], is not a description of a floor-system economy with abundant reserves.

::: widget sequence
a: 100*(0.9)^(n-1)
N: 12
mode: terms
start: 1
caption: An invented simple-deposit-expansion tale: each round, 10 per cent of new deposits is held as reserves and 90 per cent is lent, becoming deposits at the next bank. The term is $100\times 0.9^{n-1}$. The series sums toward $1000 = 100/0.1$. Treat this as arithmetic, not as a map of how loans are made in a floor system with a 0 per cent reserve requirement.
:::

The sequence is the classical multiple-expansion picture. It assumes a binding reserve ratio, no excess reserves, and a demand for loans and deposits at the going rates. After 2008, and in the euro area after 2015, banks held large excess reserves by construction of the central bank's asset purchases. US reserve requirements were set to zero in March 2020. The sequence widget is a model, and its assumptions are currently false in several large systems. What remains true is the balance-sheet identity: a new loan, while it sits with a deposit at the same bank, enlarges both sides of that bank's book.

::: quiz
A bank with a positive duration gap, in the sense of [[#def-dgap]], sees a parallel rise in yields. To first order, its equity
- [ ] rises
- [x] falls
- [ ] is unchanged, because assets and liabilities revalue by the same percentage
- [ ] is unchanged, because duration is a bond statistic, not a bank statistic
::: solution
[[#eq-dE]] has a minus sign in front of a positive DG: equity falls when $y$ rises. Assets and liabilities do *not* revalue by the same percentage unless $D_A = D_L$, and even then the *amounts* differ because $A \neq L$. Duration is defined for any fixed-income stream, including a bank book.
:::
:::

::: history
**1984, Continental Illinois.** The then-seventh-largest US bank failed after losses on energy loans and a wholesale-funding run. The FDIC's resolution treated some creditors as protected, a step on the road to the "too big to fail" debate. The episode is a textbook mix of credit risk (the oil patch) and liquidity risk (reliance on purchased funds), with capital too thin for the combination.
:::

## Evidence

US commercial-bank aggregates are published in the Federal Reserve's H.8 release. Reserve balances of depository institutions at the Fed were about USD 2.97 trillion on 11 November 2026 (H.4.1 Wednesday level), on a Federal Reserve balance sheet of about USD 6.76 trillion of assets — a floor-system configuration, not a scarce-reserves one. Those reserves are an asset of the banking system and a liability of the central bank; they are not a measure of how much the banks can "still lend" in a mechanical-multiplier sense.

The BIS Basel III monitoring exercise, with data as of 31 December 2025, reported a weighted-average Liquidity Coverage Ratio of 136.6 per cent and a Net Stable Funding Ratio of 123.3 per cent for large internationally active (Group 1) banks, both above the 100 per cent minima (BCBS, September 2026 monitoring report). Averages conceal tails; they also conceal national differences in how the ratios are implemented.

Return on equity in banking is cyclical: negative in crisis years in the hardest-hit countries, high in the years after when loan-loss provisions reverse. Cross-country comparisons have to hold accounting and inflation constant. Thin-margin, high-volume retail banking in some high-income countries and high-spread, high-cost banking in some lower-income countries can produce similar ROEs from different ROAs and leverages — [[#eq-roe]] again.

## Where this leads

The useful, fragile contract on the liability side is the subject of [[money-banking/bank-runs-and-crises]]. The public overlay of insurance, capital rules and liquidity rules is [[money-banking/regulation]]. The central bank's balance sheet, which is where the reserve asset comes from, is [[money-banking/central-banking]]. Corporate-finance courses treat capital structure for non-financial firms ([[corporate-finance]]); a bank's capital structure is the same identity with a different bankruptcy and a different regulator.

::: summary
- A bank's book is $A = L + E$: reserves, securities and loans funded by deposits, wholesale debt and capital.
- Liquidity risk is about cash today; credit risk is about borrowers paying; interest-rate risk is about a duration mismatch. They interact but they are not the same.
- The duration gap $\mathrm{DG} = D_A - (L/A)D_L$ maps a parallel yield shift into a first-order change in equity.
- $\mathrm{ROE} = \mathrm{ROA} \times A/E$: leverage scales both profit and loss.
- Loans can create deposits at origination; whether the system as a whole expands depends on reserve supply, deposit demand and the operating system of the central bank, not on a mechanical multiplier alone.
:::

## Exercises

::: exercise Identity {level=1 check="12"}
Assets 120, deposits 90, wholesale funding 18. What is capital? (Enter the capital.)
::: solution
$E = 120 - 90 - 18 = 12$.
:::
:::

::: exercise Leverage {level=1 check="10"}
Assets 200, capital 20. What is leverage $A/E$? (Enter the ratio.)
::: solution
$200/20 = 10$.
:::
:::

::: exercise Expected loss {level=1}
A loan of 100 has PD $2$ per cent and LGD $40$ per cent. What is expected loss?
::: solution
$\mathrm{EL} = 0.02 \times 0.40 \times 100 = 0.80$.
:::
:::

::: exercise Duration gap {level=2}
$D_A = 5$, $D_L = 2$, $A = 200$, $L = 180$, $y = 4$ per cent. Compute DG and $\Delta E$ for a 50 basis-point parallel rise in yields.
::: solution
$\mathrm{DG} = 5 - (180/200)\times 2 = 5 - 1.8 = 3.2$. $\Delta E \approx -3.2 \times 200 \times 0.005/1.04 = -3.077$.
:::
:::

::: exercise ROE identity {level=2 check="15"}
ROA is 1.2 per cent, leverage is 12.5. What is ROE in per cent? (Enter the number as a percentage, without the per-cent sign: 15 for 15 per cent.)
::: solution
$1.2 \times 12.5 = 15$.
:::
:::

::: exercise Reserve drain {level=2}
Bank A makes a loan of 50, crediting a deposit at itself. The borrower pays a customer of Bank B. Show Bank A's and Bank B's balance-sheet changes, assuming the payment settles in reserves and neither bank changes securities.
::: solution
At origination, Bank A: loans $+50$, deposits $+50$. On settlement, Bank A: reserves $-50$, deposits $-50$. Net at A: loans $+50$, reserves $-50$ (asset mix changes; size back to the start). Bank B: reserves $+50$, deposits $+50$. Inside money in the *system* is still $+50$ (the deposit now sits at B). A's liquidity position has tightened; B's has loosened. This is why a loan-creating bank needs a funding plan for the reserve drain.
:::
:::

::: exercise Independence and a common factor {level=3}
One hundred loans, each of size 1, default independently with $p = 0.05$ in a boom. In a bust, a common factor lifts every default probability to $0.20$ and the defaults remain independent *conditional on the bust*. Compare the standard deviation of the portfolio loss rate in the boom with the standard deviation *conditional on the bust*. Then explain, in a few sentences, why an unconditional variance (if busts occur with probability $1/5$) is larger than either conditional variance.
::: hint
Conditional on the regime, $\mathrm{sd} = \sqrt{p(1-p)/n}$. Unconditionally there is extra variance from the random mean.
:::
::: solution
Boom: $\mathrm{sd} = \sqrt{0.05\times 0.95/100} = \sqrt{0.000475} \approx 0.0218$. Bust: $\sqrt{0.20\times 0.80/100} = \sqrt{0.0016} = 0.04$. Unconditionally, the loss rate is a mixture: with probability $4/5$ it is centred at 0.05, with probability $1/5$ at 0.20. The law of total variance adds $\Var(\E[\text{loss}\mid\text{regime}]) = (4/5)(1/5)(0.20-0.05)^2 = 0.0036$, whose square root is 0.06, already larger than either conditional sd, *plus* the expected conditional variance. A common cycle factor is a first-order capital issue; idiosyncratic default is, in a book of 100, already small.
:::
:::

::: exercise Non-maturity deposits {level=3}
A bank reports $D_A = 4$ years on assets of 100. It has 80 of current-account deposits and 10 of one-year wholesale funds, plus 10 of equity. Compute DG if deposits are assigned duration 0, and again if they are assigned duration 4. What $\Delta E$ does a 100 basis-point rise in $y$ (with $y=5$ per cent) produce in each case? Why might a run make the first calculation the relevant one overnight?
::: hint
$D_L$ is a weighted average of the two liability durations.
:::
::: solution
Liabilities $L = 90$. If deposits have duration 0 and wholesale has duration 1, $D_L = (80/90)\cdot 0 + (10/90)\cdot 1 = 0.111$, $\mathrm{DG} = 4 - (90/100)\times 0.111 = 3.90$. $\Delta E \approx -3.90 \times 100 \times 0.01/1.05 = -3.71$. If deposits have duration 4, $D_L = (80/90)\cdot 4 + (10/90)\cdot 1 = 3.667$, $\mathrm{DG} = 4 - 0.9\times 3.667 = 0.70$, $\Delta E \approx -0.67$. The same book looks almost matched or badly mismatched depending on the deposit-duration assumption. In a run, deposits behave like overnight claims, and the first DG is the one that is being realised — together with a liquidity problem that the duration formula does not capture.
:::
:::
