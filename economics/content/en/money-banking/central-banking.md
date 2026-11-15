The settlement asset of [[money-banking/money-and-payments]] is a liability of the **central bank**. So are the notes in wallets. The matching assets — government securities, loans to banks, foreign-exchange reserves, and, after 2008 in several countries, large holdings of longer bonds — sit on the other side of a balance sheet that looks like a bank's and is not a bank's. This chapter reads that balance sheet, defines the **monetary base**, derives the textbook **money multiplier**, and then says why the multiplier is a poor map of policy in a floor system with abundant reserves.

The previous chapter's lender of last resort is this chapter's institution. The next chapter, [[money-banking/monetary-policy-implementation]], is how the institution sets an overnight rate. Dated figures are from the Federal Reserve's H.4.1, the ECB, and the People's Bank of China, as of the dates given. They are not forecasts.

## The central-bank balance sheet

::: definition Central-bank balance sheet {#def-cbbs}
A **central bank** is the public institution that issues the economy's primary settlement asset (reserve accounts of banks) and, in most countries, the notes. Its **assets** typically include government securities, loans to banks (standing facilities, auctions, emergency credit), foreign-exchange reserves, and sometimes private or public bonds bought in quantity. Its **liabilities** include notes, reserve balances, the government's deposit (a treasury account), reverse-repo or other absorption instruments, and capital. The identity is still $A = L + E$.
:::

A stylised picture:

| Assets | | Liabilities and capital | |
|---|---|---|---|
| Government securities | 80 | Notes | 40 |
| Loans to banks | 5 | Reserve balances | 30 |
| Foreign-exchange reserves | 15 | Government deposit | 20 |
| | | Capital | 10 |
| **Total** | **100** | **Total** | **100** |

On 11 November 2026 the Federal Reserve's H.4.1 Wednesday level put total assets at USD 6,759 billion, securities held outright at about USD 6,472 billion, reserve balances at USD 2,970 billion, and Federal Reserve notes (net) at USD 2,444 billion. The US Treasury's general account was USD 912 billion. Those are one country's numbers on one Wednesday; the ECB, the Bank of Japan, the PBOC, the Bank of England and others publish analogous weekly or monthly sheets with different asset mixes (more FX at many emerging-market central banks; more bonds at the Fed, the ECB and the Bank of Japan after their quantitative-easing programmes).

Every item has a counterpart in the rest of the economy. A note is outside money of the public. A reserve balance is outside money of the banks. A government deposit at the central bank is *not* money of the public: when a taxpayer pays the treasury and the funds sit in the treasury account, bank reserves fall. That drain is a routine liquidity fact, and it is why treasuries and central banks coordinate the account.

::: example Notes versus reserves {#ex-notes-reserves}
The public withdraws 5 of notes from ATMs. Show the commercial-bank and central-bank changes, starting from vault cash of zero (the bank orders notes from the central bank against reserves). What happens to $B$, to $C$ and to $R$?
::: solution
Commercial bank: reserves $-5$, deposits $-5$ (the customer swapped a deposit for notes). Central bank: reserve liabilities $-5$, notes $+5$. The base $B = C+R$ is unchanged: 5 of $R$ became 5 of $C$. $M$ is also unchanged if $M$ includes both notes and deposits; the *composition* of the base and of $M$ has shifted toward currency. A Christmas currency drain in a scarce-reserves system is an OMO-offsetting event; in a floor it is a reshuffle inside an abundant $B$.
:::
:::

::: example A security purchase {#ex-purchase}
The central bank buys 10 of government securities from a pension fund, paying through the pension fund's bank. Show the central bank's and the commercial bank's balance-sheet changes.
::: solution
Central bank: securities $+10$, reserve liabilities $+10$. Commercial bank: reserves $+10$, deposits of the pension fund $+10$. The monetary base (notes plus reserves) rises by 10; inside money (deposits) rises by 10. The pension fund has swapped a bond for a deposit. If the seller had been a bank, the bank's securities would have fallen and its reserves risen, with no immediate deposit created. Who the central bank buys *from* changes the commercial-bank book; it does not change the fact that the central bank has created reserve liabilities.
:::
:::

## The monetary base

::: definition Monetary base {#def-base}
The **monetary base** (high-powered money) $B$ is currency in circulation $C$ plus reserve balances $R$:

$$
B = C + R.
$$ {#eq-base}

Reserves may be required or excess; after a required-reserve ratio of zero, as in the United States since March 2020, the distinction is only a label. The base is a liability of the central bank (plus any coin issued by the treasury, a small item in most countries). It is not M1 or M2.
:::

In November 2025 the US not-seasonally-adjusted monetary base was USD 5,302 billion, of which currency in circulation was USD 2,423 billion and reserve balances USD 2,879 billion (Board of Governors, H.6 / H.4.1, via FRED). By November 2026 reserve balances were about USD 2.97 trillion (H.4.1, 11 November 2026). The base is larger than currency because of the reserve mountain built by asset purchases after 2008 and 2020, and then partly reduced by subsequent runoff.

The central bank can change $B$ by buying or selling assets (open-market operations), by lending at the standing facility, by taking term deposits or reverse repos (which replace reserves with another liability), and, in some countries, by changing FX reserves. It cannot, by those operations, directly set M2. The link, in the old textbook, is the multiplier.

## The money multiplier, and its limits

Write $C = c D$ for a currency-to-deposit ratio $c$, and $R = (rr + e) D$ for a required-reserve ratio $rr$ and an excess-reserve ratio $e$, with $D$ deposits. Then $B = (c + rr + e) D$, and if a broad aggregate is $M = C + D = (1+c)D$,

$$
M = \frac{1+c}{rr + e + c}\, B.
$$ {#eq-mult}

The coefficient is the **money multiplier**.

::: proposition The multiplier formula {#prop-mult}
Under the assumptions that (i) the public's currency-to-deposit ratio $c$ is a constant, (ii) banks' desired excess-reserve ratio $e$ is a constant, (iii) a required-reserve ratio $rr$ is imposed and is binding in the sense that banks do not wish to hold less, and (iv) $M$ is defined as currency plus deposits, the money stock satisfies [[#eq-mult]]. A change in $B$ then scales $M$ by the multiplier, *given* $c$, $e$ and $rr$. If $e$ adjusts one-for-one with $B/D$, the formula does not pin down $M$ from $B$.
:::

::: proof
$B = C + R = cD + (rr+e)D = (c+rr+e)D$, so $D = B/(c+rr+e)$. Then $M = C+D = (1+c)D = \frac{1+c}{c+rr+e} B$. If $e$ is not a structural constant but a residual — banks hold whatever reserves the central bank has supplied, once the overnight rate is at the floor — then $e = R/D - rr$ moves with $R$, and the same identity becomes $M = (1+c)D$ with $D$ determined by loan demand and the public's deposit demand, not by $B$.
:::

::: widget plot
f: (1+0.4)/(x+0.05+0.4)
x: 0, 0.25
y: 1, 4
labels: \text{multiplier}
caption: The textbook multiplier $(1+c)/(rr+e+c)$ against $rr$, with $c=0.4$ and $e=0.05$ held fixed. At $rr=0$ the multiplier is still finite because of $c$ and $e$. If $e$ itself rises when $rr$ falls, the curve overstates the expansion. Illustrative parameters, not a fitted US or euro-area multiplier.
:::

::: widget sequence
a: 100*(1-(0.9)^n)/0.1
N: 20
mode: terms
start: 1
limit: 1000
caption: Partial sums of a simple deposit-expansion series: an injection of 100 of reserves, $rr=0.1$, $c=0$, $e=0$, each round lending on 90 per cent. The sum tends to $100/0.1=1000$. The limit is the multiplier identity under those knife-edge assumptions. It is not a description of a floor system.
:::

The formula is an identity given $c$, $e$ and $rr$. It was a usable policy map when $rr$ was positive and binding and $e$ was small, as in many mid-twentieth-century systems. It is not a usable map when the central bank supplies a stock of reserves large enough that $e$ is a residual and the overnight rate is set by interest on those reserves. That is the **floor system** of the next chapter, in place at the Federal Reserve since 2008 (and explicitly after the 2020 reserve-requirement cut), at the ECB after its asset purchases, and at several other central banks.

::: warning The multiplier is not a lending machine
A common reading of [[#eq-mult]] is that banks "lend out" excess reserves, multiplying them into M2. Banks lend to creditworthy borrowers who will pay a spread, and they need reserves to settle, not (in a floor system) to meet a binding $rr$. An injection of reserves that does not change the demand for loans or the demand for deposits sits as excess reserves: $e$ rises, $M$ does not scale. Treating every increase in the base as a forecast of $M$ or of inflation is the multiplier identity with the constants treated as constants when they are not.
:::

::: example Multiplier arithmetic {#ex-mult}
$c = 0.4$, $rr = 0.10$, $e = 0.05$, $B = 110$. Compute $D$, $C$ and $M$. If instead $rr = 0$ and $e$ rises to $0.15$, with $c$ and $B$ unchanged, what is $M$?
::: solution
Multiplier $(1.4)/(0.10+0.05+0.4) = 1.4/0.55 = 2.545$. $D = 110/0.55 = 200$, $C = 0.4\times 200 = 80$, $M = 280$ (or $2.545\times 110 = 280$). With $rr=0$ and $e=0.15$, denominator $0.15+0.4=0.55$, same $D$ and $M$. The required-reserve cut did nothing *because* excess rose by the same amount. That is the floor-system arithmetic: $rr$ and $e$ trade places inside $R$.
:::
:::

The PBOC still uses a required-reserve ratio as a visible policy tool. The ratio for large banks was reported at 7.5 per cent as of 1 November 2026 (People's Bank of China, via CEIC). That is a different operating tradition from a floor system with $rr=0$; it does not make [[#eq-mult]] a complete description of Chinese monetary transmission either, because the PBOC also sets policy rates, uses medium-term lending facilities, and manages the exchange rate with a different toolkit.

::: example A binding reserve-ratio cut {#ex-rrr-cut}
Deposits are 1000, $c=0$, $e=0$, $rr$ falls from 0.10 to 0.08, and $B$ is held fixed at 100. If the ratios remain behavioural constants, what happens to $M$? Why is this not the US 2020 experiment?
::: solution
Before: $M = B/rr = 100/0.10 = 1000$. After: $M = 100/0.08 = 1250$, a 25 per cent rise. The extra 20 of freed reserves is lent, and deposits expand until $0.08 D = 100$. The US 2020 cut of $rr$ to zero did *not* produce this, because $e$ was already large: the freed required reserves became excess, $B$ was not the constraint, and $M$ did not scale with $1/rr$. The example is the binding-$rr$ branch of [[#prop-mult]]; 2020 was the endogenous-$e$ branch.
:::
:::

## Tools, in outline

The classical list is: open-market operations, standing facilities (discount window / marginal lending, and a deposit facility), reserve requirements, and, in some countries, FX intervention. After 2008 the list lengthened: large-scale asset purchases (quantitative easing), forward guidance, and, at the effective lower bound, negative deposit rates in the euro area, Japan, Switzerland, Denmark and Sweden for a time.

This chapter's point is the *balance-sheet* effect of those tools. An open-market purchase raises $B$. A rise in $rr$, if it binds, raises the demand for $B$ at a given $D$ and, in a scarce-reserves system, tightens. Interest on reserves, the instrument that makes a floor work, is a rate paid on a liability of the central bank; it is not a change in $B$. Quantitative easing is a large purchase, hence a large rise in $B$, undertaken not to multiply $M$ via [[#eq-mult]] but to lower long-term yields and spreads (next chapter). Emergency lending raises $B$ while the loan is outstanding, which is the LOLR of [[money-banking/regulation]] as a balance-sheet entry.

::: quiz
The monetary base is
- [ ] M2
- [x] currency in circulation plus reserve balances
- [ ] the central bank's holdings of government securities
- [ ] bank capital
::: solution
[[#eq-base]]: $B = C + R$. M2 is a broader aggregate. Securities are an *asset* of the central bank. Bank capital is on commercial-bank books.
:::
:::

::: history
**1913, Federal Reserve Act.** The United States created a system of Reserve Banks and a Board, with the power to issue an elastic currency and to hold the reserve accounts of member banks. The Fed's balance sheet was, for decades, a small securities portfolio and a discount window. The post-2008 sheet, with trillions of securities and trillions of reserve liabilities, is the same legal entity with a different operating system.
:::

## Evidence

Two observations discipline the multiplier.

First, the US and euro-area experience after 2008: the base rose by a factor of several as the central banks bought assets; M2 rose far less than a pre-2008 multiplier would have predicted; excess reserves absorbed the difference. Velocity of the base collapsed. That is [[#prop-mult]] with $e$ endogenous. It is not a proof that the purchases had no effect — they were aimed at yields, not at $M$ — but it is a proof that $B\mapsto M$ was not a stable map.

Second, high-inflation episodes still show a co-movement of money and prices, usually with a broad aggregate rather than with the base (the quantity identity of [[money-banking/money-and-payments]]). Hyperinflations are financed by the *flow* of seigniorage, a fiscal fact that shows up as a growing central-bank claim on the government. A floor-system central bank in a low-inflation economy can have a large sheet without that fiscal engine; the two large sheets should not be given the same name.

Reserve ratios as a tool remain important where they are still used in size. The PBOC's large-bank RRR, 7.5 per cent in November 2026, is one such case; so have been, at times, ratios in Brazil, India and Türkiye. A cut in $rr$ is then a liquidity event, closer to the textbook multiplier, though still interacting with other facilities.

## Where this leads

The next chapter is the *rate* operating system: corridor and floor, the role of interest on reserves, open-market operations in a scarce-reserves world versus a plentiful one, quantitative easing, and independence ([[money-banking/monetary-policy-implementation]]). Macro courses put money back into inflation and output ([[macroeconomics/money-and-inflation]], [[business-cycles]]). International finance adds FX reserves and the impossible trinity. The identity $B = C + R$ does not change when it is exported; the multiplier map does.

::: summary
- The central bank's liabilities include notes and bank reserves; its assets include securities, loans to banks and, often, FX. The sheet is public, and every item has a counterpart elsewhere.
- The monetary base is $B = C + R$. It is not M1 or M2.
- The money-multiplier formula $M = \frac{1+c}{rr+e+c}B$ is an identity given $c$, $e$ and $rr$. It is a policy map only if those ratios are stable.
- In a floor system with abundant reserves, $e$ is a residual, $rr$ may be zero, and $B$ does not pin down $M$. Banks do not "lend out" those reserves in the textbook sequence.
- Open-market operations, standing facilities, reserve requirements and large-scale purchases all change the sheet; interest on reserves changes a *price* on a liability without changing $B$.
:::

## Exercises

::: exercise Base {level=1 check="70"}
Currency 40, reserve balances 30, deposits 200. What is the monetary base? (Enter $B$.)
::: solution
$B = 40+30 = 70$. Deposits are not in the base.
:::
:::

::: exercise Multiplier {level=1 check="2.5"}
$c=0.5$, $rr=0.1$, $e=0$. What is the multiplier $(1+c)/(rr+e+c)$? (Enter the value.)
::: solution
Denominator $0.1+0+0.5=0.6$. Multiplier $1.5/0.6=2.5$.
:::
:::

::: exercise Currency drain {level=1}
If $B=100$, $c=0.25$, $rr=0.1$, $e=0$, compute $D$, $C$ and $M$.
::: solution
Multiplier $(1.25)/(0.1+0.25)=1.25/0.35\approx 3.571$. $D=100/0.35\approx 285.71$, $C=0.25\times 285.71\approx 71.43$, $M\approx 357.14$. Directly: $M=3.571\times 100\approx 357.1$.
:::
:::

::: exercise Open-market purchase {level=2}
The central bank buys 20 of securities from a commercial bank. Show both balance sheets. What happens to $B$ and, immediately, to $M$?
::: solution
Central bank: securities $+20$, reserves $+20$, so $B$ rises by 20. Commercial bank: securities $-20$, reserves $+20$. No public deposit is created, so $M$ is unchanged at the instant of the purchase. (If the bank then lends, deposits may rise later — that is a separate decision, not the purchase itself.)
:::
:::

::: exercise Endogenous excess {level=2}
$B=500$, $c=0.2$, $rr=0$. Banks hold all residual reserves as excess, and the public holds $D=1000$ of deposits (determined by loan demand). Compute $e$, $C$, $R$ and $M$. What would a mechanical multiplier that assumed $e=0$ have predicted for $M$?
::: solution
$C=0.2\times 1000=200$, so $R=B-C=300$, $e=R/D=0.30$. $M=C+D=1200$. A mechanical $e=0$ multiplier would be $(1.2)/(0+0.2)=6$, predicting $M=3000$. The gap is exactly the extra $e$. This is the floor-system arithmetic of [[#prop-mult]].
:::
:::

::: exercise Treasury account {level=2}
Taxpayers pay 15 of taxes from bank deposits; the funds are credited to the government's account at the central bank. Show the commercial-bank and central-bank changes. What happens to reserves and to $B$?
::: solution
Commercial banks: deposits $-15$, reserves $-15$. Central bank: reserve liabilities $-15$, government deposit $+15$. $B=C+R$ falls by 15 (unless notes somehow change). Inside money falls by 15. A large tax date is a reserve drain; treasuries usually time spending or bill issuance, or the central bank offsets, to avoid a rate spike in a scarce-reserves system. In a floor system the drain may still leave $R$ abundant.
:::
:::

::: exercise Multiplier as identity {level=3}
Start from $C=cD$ and $R=(rr+e)D$ and derive [[#eq-mult]]. Then show that if $e = B/D - rr - c$ is treated as a residual (so it is defined by the equation rather than as a behavioural constant), the formula no longer determines $M$ from $B$. What additional equation is needed?
::: hint
Count equations and unknowns.
:::
::: solution
$B=C+R=cD+(rr+e)D=(c+rr+e)D$, hence $D=B/(c+rr+e)$ and $M=(1+c)D=\frac{1+c}{c+rr+e}B$. If $e$ is defined as $e=R/D-rr$ with $R=B-C=B-cD$, then $e=(B-cD)/D - rr = B/D - c - rr$, which is an identity, not a restriction. Substituting it back into the multiplier recovers $M=(1+c)D$ with $D$ free. One extra behavioural equation is needed: a deposit-demand (or loan-demand) equation that pins down $D$ (or $M$) from rates and income, *or* a behavioural $e(\cdot)$ that is not just the residual. In a floor system that extra equation is on the *rate* (interest on reserves) and on loan demand, not on $B$.
:::
:::

::: exercise Seigniorage and a large sheet {level=3}
A central bank holds 100 of government securities yielding 4 per cent and pays 3 per cent on 80 of reserve balances; notes of 20 pay zero. Ignore operating costs and other items. Compute the flow of seigniorage remitted (interest received minus interest paid). How does this differ from the seigniorage of a hyperinflationary central bank that holds claims on the government that grow with the budget deficit?
::: hint
Seigniorage here is a flow of net interest, not a flow of new base.
:::
::: solution
Interest received $0.04\times 100=4$. Interest paid $0.03\times 80=2.4$. Net $1.6$, plus the implicit saving of not paying interest on notes. This is a *stock* of base earning a spread. A hyperinflationary central bank finances a *flow* of government spending by issuing new base each period; the real resources transferred are the real value of that new issue, which is large when inflation is high and the demand for real base is still positive. A large floor-system sheet with a small spread is not the same fiscal engine. If the interest paid on reserves exceeds interest received (a possible configuration when policy rates rise after a QE-built sheet), remittances can go to zero or the central bank can show an accounting loss — a political fact, not by itself an inflation.
:::
:::
