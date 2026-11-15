A twenty-pound note, a balance in a current account, a transfer on M-Pesa and a balance on a central-bank ledger are different objects. What they share is that a stranger will take them in settlement of a debt. That property — general acceptability in exchange — is what economics means by **money**. It is not a natural substance and it is not the same thing as wealth. It is a social arrangement that solves a matching problem: without a commonly accepted medium, every trade would require a double coincidence of wants.

This chapter starts from that matching problem, states the three textbook functions of money, and then classifies the objects that have performed them: commodity money, token coins, fiat paper, bank deposits (inside money) and the various digital claims of the last two decades. It then turns from objects to **payments**: the sequence of messages and entries that moves a claim from payer to payee and, when the two use different banks, through a clearing house and a settlement agent. The last sections look at how statisticians count money (the monetary aggregates) and at what the quantity identity $MV = PY$ does and does not say. Nothing here is a recommendation about which claim to hold. The numbers are either illustrative or dated official statistics.

The previous course ended with a first look at money and inflation ([[principles/macroeconomic-policy]]). Here the question is more primitive: what, exactly, is the thing whose quantity those chapters discussed, and how does a payment actually happen?

## The matching problem and the functions of money

Imagine an economy of specialists. A potter wants bread; a baker wants shoes; a cobbler wants a pot. Direct barter works only if two people meet who each want what the other has. Jevons (1875) called this the **double coincidence of wants**. With $n$ goods there are $n(n-1)/2$ bilateral markets, and most of them are empty on any given day. A generally accepted medium of exchange collapses those markets into $n$ markets against the medium.

::: definition Money {#def-money}
**Money** is any object, or any transferable electronic record, that is generally accepted as a **medium of exchange** in a given community. The same object typically also serves as a **unit of account** (prices and debts are quoted in it) and as a **store of value** (it can be carried from one date to another). The three functions can come apart: a unit of account need not be what people actually hand over, and a store of value need not be liquid.
:::

The medium-of-exchange function is the one that distinguishes money from other assets. A house is a store of value; it is not money. A supermarket coupon is accepted in one chain; it is not generally accepted. A government bond is a store of value and is quoted in the unit of account; it is not used to buy lunch. Liquidity — the ability to sell quickly near the prevailing price — is a matter of degree. Money sits at the liquid end of that spectrum.

The unit-of-account function is easy to overlook because, in a single-currency economy, it is almost invisible. In a bimetallic system, or in a country that quotes rents in US dollars while paying wages in the local currency, the split is obvious. During high inflation the unit of account often migrates to a foreign currency or to a real unit (a basket of goods, a unit of gold) even while the old notes still circulate as a medium of exchange. That is one way the three functions come apart.

As a store of value, money is dominated by interest-bearing assets whenever the nominal interest rate is positive. People hold it anyway because it is the thing that settles. The opportunity cost of holding non-interest-bearing money is the interest forgone, which is why money demand, in the next section, slopes down in the nominal rate. Interest-bearing deposits blur the line: they are money by the medium-of-exchange test and they pay a rate, so the opportunity cost is the spread against a less liquid rate rather than the whole rate.

::: proposition Double coincidence and the medium of exchange {#prop-double}
In an economy with $n \ge 3$ goods and no medium of exchange, a mutually desired pairwise trade between the owner of good $i$ and the owner of good $j$ occurs only if each wants the other's good. Introducing a generally accepted medium $m$ replaces that requirement with the weaker condition that the owner of $i$ will accept $m$ and the owner of $j$ will accept $m$. The set of feasible pairwise trades expands, and the number of markets that must be organised falls from $n(n-1)/2$ to $n$ (each good against $m$), plus whatever market exists among varieties of $m$.
:::

::: proof
Without $m$, a meeting of $i$ and $j$ is a trade if and only if $i$ wants $j$ and $j$ wants $i$. With $m$ accepted by both, $i$ can sell for $m$ and later buy $j$ from someone who wants $m$, even if that someone is not the original owner of $j$. Counting markets: each unordered pair of goods is a potential barter market, hence $n(n-1)/2$ of them; with a medium, only the $n$ markets of goods against $m$ need to be open for goods to be priced and traded. (Markets among different monies — notes against deposits, one currency against another — are extra, and they are the subject of the payments section below.)
:::

The proposition is a statement about feasibility, not about welfare. A medium of exchange can be socially useful and still be a poor store of value (high inflation) or a poor unit of account (a dual-currency regime). It can also be supplied by a private network that extracts rents, or by a public issuer that extracts seigniorage. Those are later questions.

::: intuition Why the unit of account matters
Once prices are posted in a common unit, comparison shopping becomes arithmetic rather than a search over exchange rates between pairs of goods. That is a cognitive saving, distinct from the saving in matching. An economy can, and some have, used one object as the unit of account and another as the medium of exchange. The textbook coincidence of the two is a convenience, not a theorem.
:::

::: example Three specialists {#ex-specialists}
A, B and C produce apples, bread and cloth. A wants bread, B wants cloth, C wants apples. No pair has a double coincidence. Show that a generally accepted token, of which each holds some, permits all three desired trades, and count the barter markets against the markets with a medium.
::: solution
There are three goods, so $n(n-1)/2 = 3$ barter markets (apples–bread, bread–cloth, cloth–apples), and none of them clears in a pairwise meeting of producer with producer. With a token $m$, A sells apples to C for tokens and buys bread from B; B, now holding tokens from A, buys cloth from C; C uses tokens to buy apples. Each of the three goods has a market against $m$, so three money markets replace three empty barter markets. The tokens need not have use value; they need only be accepted. The example is the smallest illustration of [[#prop-double]].
:::
:::

## Commodity, fiat and inside money

Historically the medium has often been a commodity with a use value: cattle, cowries, salt, copper, silver, gold. A **commodity money** is a medium whose value in exchange is anchored, at least in part, by its value in other uses and by the cost of producing it. A gold coin is melted when the metal is worth more as bullion than as coin (Gresham's law, below, is the cousin of that arithmetic). The classical gold standard of the late nineteenth century was a commodity-money system in which national notes and deposits were promises to pay gold at a fixed price.

A **token** or **fiat** money is a medium whose material cost is far below its exchange value, and whose acceptability rests on convention, on legal tender laws, or on the issuer's undertaking to take it back in payment of taxes. Modern notes and the balances that commercial banks hold at the central bank (reserves) are fiat. The state's ability to demand the medium in payment of taxes is a powerful, though not the only, reason people accept it (the chartalist observation, restated in many forms since Knapp 1905). Acceptability is still a social fact: a note that the state will take can fail in a hyperinflation if prices are being posted in something else.

::: definition Outside and inside money {#def-inside}
**Outside money** is a net asset of the private sector: gold, or a claim on the public sector (notes, coin, and the deposit that a commercial bank holds at the central bank). **Inside money** is a claim of one private agent on another — above all, the transferable deposits that households and firms hold at commercial banks. Inside money nets to zero in the consolidated private-sector balance sheet; it is still money to its holder because it is accepted in exchange.
:::

Most of what people in high-income countries call money is inside money. In the United States, seasonally adjusted M1 was USD 18,998 billion in November 2025, of which currency in circulation was only about USD 2,423 billion; the rest was largely transferable deposits (Board of Governors of the Federal Reserve System, H.6 Money Stock Measures, November 2025, via FRED). The notes are outside money. The deposits are banks' liabilities, matched on the other side of the banks' books by loans, securities and reserves. Destroying a deposit by repaying a bank loan shrinks inside money; printing a note expands outside money. The two are linked through the banking system, which is the subject of [[money-banking/central-banking]].

Digital claims have multiplied the forms without changing the classification. A balance in a licensed e-money wallet is typically a claim on the issuer, fully matched by funds at a bank or at the central bank — inside money, or a narrow pass-through of outside money, depending on the statute. A cryptocurrency that is not a claim on anyone is closer to a privately supplied commodity (or fiat) money, with an equilibrium value that can be zero. Central-bank digital currency, where it exists, is outside money in a new technological dress. None of these sentences is a ranking of which form to use.

::: warning Money is not the same as wealth
A household that holds a house, shares and a deposit is wealthy. Only the deposit (and any notes) is money. Inflating the money stock does not, by itself, make the community wealthier: the extra units bid up the unit-of-account prices of goods. Confusing the two is the simplest way to misread a monetary aggregate, and it is the mistake behind the claim that "printing money" is a way to print output.
:::

::: example Gresham's law on a bimetallic mint {#ex-gresham}
A mint coins gold and silver at a legal ratio of 15 ounces of silver per ounce of gold. On the bullion market the ratio is 15.5. Which metal circulates as coin, and which is melted or exported? (Illustrative ratios; the arithmetic is the point.)
::: solution
One ounce of gold buys 15 ounces of silver at the mint and 15.5 ounces on the market. A person who has gold therefore prefers to sell it as bullion (or export it) and to make payments in silver coin. Silver, the metal that the mint overvalues relative to the market, remains in circulation; gold disappears from the till. This is **Gresham's law**: money the law overvalues drives out money the law undervalues, when both are legal tender at a fixed rate and when melting and export are feasible. The law is an arbitrage statement, not a historical universal — it fails when the disfavoured coin is the only one people will take, or when the two monies are not perfect substitutes.
:::
:::

Mobile money shows that a medium of exchange need not be a bank deposit or a central-bank note. M-Pesa, launched in Kenya in 2007, had 42.3 million one-month active customers in Kenya in the first half of Safaricom's 2026/27 financial year (Safaricom PLC results, November 2026). The Communications Authority of Kenya counted 54.0 million active mobile-money subscriptions in the country on 30 June 2026, more than one per inhabitant. India's Unified Payments Interface processed about 228 billion transactions in calendar year 2025, with a value of roughly INR 300 lakh crore (National Payments Corporation of India). Those systems move claims that are, at the end of the chain, balances at banks or at the central bank. They have changed the cost of being a medium of exchange, not the definition.

## Monetary aggregates

Statisticians count money by drawing a line through the spectrum of liquid claims and adding up the items on the liquid side. The line is conventional, it differs across countries, and it has moved when regulation has moved.

::: definition Monetary base and the M-aggregates {#def-aggregates}
The **monetary base** (or high-powered money) $B$ is currency in circulation plus reserve balances of banks at the central bank. **M1** is currency in the hands of the public plus transferable (checkable, current-account) deposits. **M2** is M1 plus close substitutes: savings deposits, small time deposits and retail money-market funds, with the exact list set by the statistical agency. Broader aggregates (M3, M4, "broad money") add large time deposits, wholesale money-market funds and some marketable instruments. Each aggregate is a sum of stocks, not a theory of what money does.
:::

In the United States, the Board's H.6 release for November 2025 put seasonally adjusted M2 at USD 22,253.2 billion and M1 at USD 18,998.1 billion. The not-seasonally-adjusted monetary base in the same month was USD 5,302.1 billion, of which currency in circulation was USD 2,422.6 billion and reserve balances USD 2,879.4 billion (Board of Governors, H.6 and H.4.1, via FRED). By August 2026, seasonally adjusted M2 had reached USD 23,342.8 billion (H.6). These are stocks on a date, not recommendations, and they are revised.

Two features of the US numbers since 2020 are institutional rather than economic. In April 2020 the Federal Reserve reduced reserve requirements to zero, and in May 2020 a regulatory change caused savings deposits to be reclassified into M1, so M1 jumped toward M2. Comparing M1 before and after that break as if the definition were constant is a mistake. Other countries draw the line differently: the euro area's M3, the Bank of England's M4ex, the PBOC's M2. Always read the statistical note.

The **quantity identity** writes

$$
MV = PY
$$ {#eq-quantity}

where $M$ is a chosen aggregate, $V$ is **velocity** (nominal expenditure per unit of money), $P$ is a price index and $Y$ is real output. As an identity it is true by construction once $V$ is defined as $PY/M$. It becomes a theory only with a restriction on $V$ (or on $M$). The classical quantity theory treats $V$ as sticky in the short run and $Y$ as determined on the real side, so that a change in $M$ shows up in $P$. That restriction is an empirical claim, not a definition, and it is more nearly true in high inflations than in quiet periods. Hyperinflations — Germany 1922–23, Zimbabwe in the 2000s, the Venezuelan episode of the 2010s — are the laboratories in which the claim is hardest to deny: the money stock and the price level move together by orders of magnitude. In ordinary business-cycle time, $V$ moves around, $Y$ is not fixed, and the identity is an accounting frame rather than a map from $M$ to $P$.

::: widget plot
f: 8/x
x: 0.5, 8
y: 0, 12
labels: \text{real money demand}
hlines: 4
caption: The curve is the illustrative demand $L = 8/i$ for real balances, with $i$ (the nominal interest rate, in per cent) on the horizontal axis. Raise the interest rate along the curve and desired real balances fall. The horizontal line at 4 is one possible real supply $M/P$. Their intersection is an equilibrium $i$, not a forecast and not a policy recommendation. The numbers are invented.
:::

The figure is the liquidity-preference diagram of money demand. At a higher nominal rate the opportunity cost of holding non-interest-bearing (or low-interest) money is higher, so the public economises on balances: velocity rises. Income, payments technology and financial innovation shift the curve. The spread of retail real-time payments, from M-Pesa to UPI to Faster Payments in the United Kingdom, is a technology shock to money demand, and it is one reason velocity is not a constant.

::: example Velocity from dated aggregates {#ex-velocity}
Take US M2 of USD 22,253 billion in November 2025 (FRED, M2SL, H.6) and a hypothetical nominal GDP of USD 30,000 billion for the same quarter (illustrative; official GDP is published on a different schedule). What is M2 velocity? If instead M2 is USD 23,343 billion (August 2026, H.6) and nominal GDP is unchanged, what happens to $V$?
::: solution
$V = PY/M = 30000/22253 \approx 1.348$. With the larger M2 and the same $PY$, $V = 30000/23343 \approx 1.285$. A rise in the stock, holding nominal expenditure fixed, is a fall in velocity by definition. The calculation does not say whether $PY$ would in fact have been unchanged; it shows what the identity attributes to $V$ when one treats $M$ and $PY$ as the inputs. Official GDP for those months should be read from the national accounts, not from this example.
:::
:::

::: quiz
Which of the following is outside money in a modern fiat system?
- [ ] A household's transferable deposit at a commercial bank
- [x] A commercial bank's reserve balance at the central bank
- [ ] A repurchase agreement between two dealer banks
- [ ] A corporate bond held by a money-market fund
::: solution
Reserves are a claim on the central bank, hence a net asset of the private sector (including banks) and outside money. A household deposit is a claim on a bank, matched by the bank's assets — inside money. A repo is a collateralised loan between private agents; a corporate bond is not generally accepted in exchange.
:::
:::

## Payments: clearing and settlement

A **payment** is the transfer of a monetary claim from payer to payee. When both use the same bank, the bank debits one account and credits the other: the payment is internal, and the bank's balance sheet merely reallocates a liability. When they use different banks, two further steps appear.

::: definition Clearing and settlement {#def-clearing}
**Clearing** is the exchange of payment information and the calculation of obligations: who owes whom, and how much, possibly after netting. **Settlement** is the final transfer of a settlement asset that discharges those obligations. In most economies the settlement asset for banks is a reserve balance at the central bank. A payment is **final** when the settlement transfer is irrevocable.
:::

**Net settlement** computes, over a batch of payments, each bank's net position against the rest and transfers only those nets. Twenty payments of 10 from Bank A to Bank B and nineteen of 10 the other way produce a net of 10, not 390 of gross transfers. Netting economises on the settlement asset; it also creates **exposures** during the batch, because a bank that has sent payment messages is relying on others to complete. **Gross settlement**, and in particular **real-time gross settlement (RTGS)**, settles each payment separately, in real time, in central-bank money. RTGS eliminates the intra-batch credit risk at the cost of requiring more settlement balances (or an intraday credit facility from the central bank).

The large-value systems are RTGS: Fedwire in the United States, TARGET2 (and its successor) in the euro area, CHAPS in the United Kingdom, CNAPS in China, and the corresponding systems at other central banks. Retail systems — cheque clearing, deferred net settlement of card payments, faster-payment schemes — often net, with settlement of the net in the RTGS at designated times. The BIS Committee on Payments and Market Infrastructures publishes comparative statistics on these systems; the institutional detail changes, the distinction between clearing and settlement does not.

A payment system is a network. A bank that is not a direct member of the RTGS settles through a correspondent that is. Cross-border payments typically chain correspondents, which is why they are slower and more expensive than domestic ones. The network can be drawn as a graph of banks and a central settlement node; the next widget is a toy version of that graph, not a map of any live system.

::: widget graph
nodes: CB@0,2; A@-2,0; B@2,0; C@0,-2
edges: CB-A; CB-B; CB-C; A-B
caption: A toy payment network. CB is the settlement agent (the central bank). A, B and C are commercial banks; A and B also have a bilateral correspondent link. A payment from a customer of A to a customer of C goes A → CB → C in RTGS. Drag the nodes; the picture is a classification of links, not a live exposure map and not a forecast.
:::

Intraday, an RTGS bank that has to pay before it is paid needs **liquidity**: either a stock of reserves, or collateralised intraday credit from the central bank, or a well-timed inflow. Liquidity-saving devices in modern RTGS systems queue payments and offset them when possible, a hybrid of gross and net. The central bank's standing facilities, discussed in [[money-banking/monetary-policy-implementation]], are the overnight backstop to that intraday problem.

::: example Gross versus net {#ex-netting}
In one batch, Bank A sends 40 to B, 10 to C; Bank B sends 25 to A, 15 to C; Bank C sends 5 to A, 20 to B. Compute each bank's net position and the total of gross transfers. How much settlement-asset is needed under pure gross settlement versus multilateral net settlement?
::: solution
Gross transfers sum to $40+10+25+15+5+20 = 115$.

Bank A's receipts are $25+5 = 30$, so A's net is $30 - 50 = -20$ (A pays 20). Bank B's receipts are $40+20 = 60$, payments $25+15 = 40$, net $+20$. Bank C's receipts are $10+15 = 25$, payments $5+20 = 25$, net $0$. Under multilateral net settlement the settlement agent moves 20 from A to B; C is square. Gross settlement would have required 115 of settlement-asset to pass through, though not all at once if payments are sequenced. Netting here cuts the settlement need from 115 to 20. The saving is why netting is attractive; the 20 that A owes is an exposure of B (and of the system) until settlement occurs.
:::
:::

Finality matters because a payment that can be unwound is not yet money from the payee's point of view. RTGS in central-bank money is designed so that a settled payment is final. A deposit transfer that has been credited to the payee but not yet settled between banks is still subject to the paying bank's failure. That is one reason large-value systems settled in commercial-bank money have been pushed, over the last thirty years, onto central-bank settlement.

## Seigniorage, legal tender and the state's role

The issuer of a token money spends it into circulation at face value and produces it at near-zero marginal cost. The difference is **seigniorage**. For notes, a convenient measure is the interest saved by issuing a non-interest-bearing liability instead of an interest-bearing one: if the public holds $C$ of notes and the relevant government rate is $i$, seigniorage is about $iC$ per period (more careful measures use the real resources transferred). For deposits at the central bank that pay interest, seigniorage is the spread between what the central bank earns on its assets and what it pays on its liabilities, remitted to the treasury after costs. These are public-finance facts, not an argument for issuing more.

Legal tender laws require that a specified claim be accepted in discharge of a money debt. They do not, by themselves, make people post prices in that claim or hold it as a store of value. In a hyperinflation, legal-tender notes continue to settle old debts while new contracts migrate to another unit. Tax acceptability — the state quotes tax liabilities in the unit and takes the medium in payment — is a stronger anchor, and it is still not sufficient if inflation is high enough.

Private media coexist with public ones when the private claim is more convenient (a deposit, a mobile-money balance, a card scheme) and is trusted to convert, at par or at a small fee, into the public medium. The history of money is in large part the history of those conversion promises and of their occasional failure. When the promise fails, the private claim stops being money in the sense of [[#def-money]]: it is no longer generally accepted. That is a bank run in another vocabulary, and it is the subject of [[money-banking/bank-runs-and-crises]].

::: history
**1694, Bank of England.** A corporation was chartered to lend £1.2 million to the Crown in return for the right to issue notes. The notes became the core of London's payment system over the following century. The Bank's private origin and public functions — issuer, banker to the government, and eventually lender of last resort — are the ancestor of the modern central-bank bundle, later imitated and adapted from Tokyo to Pretoria.
:::

## Evidence

Three kinds of observation discipline the definitions.

First, the composition of the aggregates. In the US H.6 numbers cited above, transferable deposits dwarf currency. The same pattern holds in the euro area and in the United Kingdom: inside money is the medium of exchange of daily life, outside money is the settlement asset of banks. In lower-income economies the currency share is often higher, and mobile money has taken a larger role relative to bank deposits — Kenya is the textbook case, with the Communications Authority's 54 million active mobile-money subscriptions (30 June 2026) sitting beside a still-developing banked population.

Second, payment volumes. UPI's 228 billion transactions in 2025 (NPCI) and M-Pesa's tens of billions of transactions a year (Safaricom annual reports) are not increases in $M$; they are increases in the number of times a given stock of balances turns over — velocity, or a shift off cash onto recorded media. The BIS CPMI Red Book statistics document a long-run rise in electronic credit transfers and a fall in cheque use across member countries. The medium-of-exchange function has migrated; the function is the same.

Third, inflationary extremes. Cagan's studies of the European hyperinflations after the First World War, and the later episodes in Latin America, Africa and the former Soviet Union, show money stocks and price levels moving together once velocity has adjusted. That is the quantity identity with a $V$ that is not constant but is still an increasing function of expected inflation. It is evidence about the store-of-value function failing, not a reason to treat $MV=PY$ as a short-run policy rule in a low-inflation floor-system economy.

Country examples should not be read as a ranking of systems. Brazil's Pix, China's former dual system of WeChat Pay and Alipay (now under tighter payment regulation), the euro area's TARGET, and the Federal Reserve's FedNow are all answers to the same clearing-and-settlement problem, under different legal and historical constraints.

## Where this leads

Interest rates, in the next chapter, are the prices of future money ([[money-banking/interest-rates]]). Once a unit of account is fixed, a bond is a schedule of money payments, and its price is a present value. Banks, later, are firms whose liabilities are the inside money of this chapter and whose assets are those bonds and loans ([[money-banking/banking]]). The central bank is the issuer of the settlement asset and the operator of the RTGS ([[money-banking/central-banking]], [[money-banking/monetary-policy-implementation]]). Macro courses will put $MV=PY$ and money demand back into a model of inflation and output ([[macroeconomics/money-and-inflation]], [[business-cycles]]). The definitions do not change when they are embedded; the extra structure does.

::: summary
- Money is a generally accepted medium of exchange; it usually also serves as unit of account and store of value, but the three functions can separate.
- Outside money is a net asset of the private sector (notes, reserves); inside money is a private claim, principally bank deposits, that still functions as money for its holder.
- Monetary aggregates (base, M1, M2, broader measures) are conventional sums of liquid claims; definitions break when regulation changes, as US M1 did in 2020.
- $MV = PY$ is an identity. It becomes a quantity theory only with a restriction on velocity and output, more nearly applicable in high inflations than in ordinary times.
- A payment is cleared when obligations are computed and settled when a settlement asset is transferred with finality. RTGS in central-bank money is the standard for large-value finality; retail systems often net.
- Digital wallets and mobile money change the technology of the medium; they do not, by themselves, change the classification into inside and outside claims.
:::

## Exercises

::: exercise Barter pairs {level=1}
An island has 6 goods and no money. How many bilateral barter markets are there? How many markets against a single medium of exchange?
::: solution
Barter markets: $n(n-1)/2 = 6\times5/2 = 15$. Markets against a medium: $6$. The saving is 9 markets that need not be organised.
:::
:::

::: exercise Classify the claim {level=1}
Classify each as outside money, inside money, or not money: (a) a £10 note; (b) a current-account balance at a commercial bank; (c) a government bond; (d) a commercial bank's reserve account at the Bank of England; (e) equity in a listed firm.
::: solution
(a) Outside money (a claim on the public sector, or a token issued by it). (b) Inside money. (c) Not money: a store of value and a unit-of-account instrument, not a medium of exchange. (d) Outside money. (e) Not money.
:::
:::

::: exercise Simple velocity {level=1 check="1.5"}
Nominal GDP is 1,800 units of account and the money stock is 1,200. What is velocity? (Enter the value of $V$.)
::: solution
$V = PY/M = 1800/1200 = 1.5$.
:::
:::

::: exercise Net positions {level=2}
Banks X, Y and Z send, in one batch, the following gross payments: X→Y 30, X→Z 10, Y→X 12, Y→Z 8, Z→X 20, Z→Y 5. Compute each bank's multilateral net position and the sum of absolute nets (the settlement volume under netting). Compare with total gross payments.
::: solution
X: receipts $12+20=32$, payments $30+10=40$, net $-8$. Y: receipts $30+5=35$, payments $12+8=20$, net $+15$. Z: receipts $10+8=18$, payments $20+5=25$, net $-7$. Check: $-8+15-7=0$. Sum of absolute nets is $|-8|+|15|+|-7|=30$, but settlement volume is half of that if we count each transfer once: 15 (Y receives 8 from X and 7 from Z). Total gross is $30+10+12+8+20+5=85$. Netting replaces 85 of gross with 15 of settlement.
:::
:::

::: exercise Gresham arithmetic {level=2}
The mint coins gold and silver at 16:1. The market ratio is 15.5:1. Which metal is overvalued at the mint, and which circulates?
::: solution
At the mint, 1 ounce of gold exchanges for 16 ounces of silver; in the market, for 15.5. Gold is overvalued by the mint relative to the market (an ounce of gold buys more silver at the legal ratio than as bullion). People therefore bring gold to the mint to be coined and melt or export silver. Circulating coin tends to be the mint-overvalued metal — gold in this case — and the undervalued metal (silver) disappears from the till. Payments that can be made in either legal tender are made in the overvalued coin. This is Gresham's law as in [[#ex-gresham]], with the legal ratio now on the other side of the market ratio.
:::
:::

::: exercise Inside money destroyed {level=2}
A firm repays a 50-unit loan by debiting its deposit at the same bank. Show the bank's balance-sheet change and the change in inside money. Currency is unchanged.
::: solution
Assets: loans $-50$. Liabilities: deposits $-50$. Inside money (deposits) falls by 50. Outside money is unchanged. The transaction is the reverse of loan creation. This is why inside money is endogenous to the banking system: it is created when banks lend and destroyed when loans are repaid, given a demand for deposits.
:::
:::

::: exercise Quantity identity as a restriction {level=3}
Suppose $Y$ is fixed at 100, $V$ is fixed at 2, and $M$ rises from 50 to 60. What happens to $P$? Now drop the restriction on $V$ and suppose $V$ falls from 2 to $5/3$ as $M$ rises. What happens to $P$? What does each case say about treating [[#eq-quantity]] as a theory of the price level?
::: hint
Compute $P = MV/Y$ in each case.
:::
::: solution
First case: initially $P = 50\times 2 / 100 = 1$; after the rise $P = 60\times 2 / 100 = 1.2$. A 20 per cent rise in $M$ produces a 20 per cent rise in $P$. Second case: $P = 60 \times (5/3) / 100 = 1$, so the price level is unchanged. The identity always holds; the quantity *theory* is the extra claim that $V$ (and $Y$) do not offset the movement in $M$. Without that claim, $M$ and $P$ need not move together.
:::
:::

::: exercise Design a settlement rule {level=3}
A four-bank system runs a deferred net-settlement batch at 17:00, with settlement in central-bank reserves. One bank fails at 16:50 with a large net debit. Explain, in a paragraph, the difference between (i) unwinding that bank's payments and rerunning the net among the survivors, and (ii) a loss-sharing rule that settles the original net and allocates the failed bank's debit to the survivors. Which risk does RTGS remove, and which does it not?
::: hint
Distinguish replacement cost (or liquidity) risk among survivors from the credit risk of the failed net debit.
:::
::: solution
(i) Unwinding cancels the failed bank's sent and received payments and recomputes nets. Survivors who had been counting on inflows from the failed bank now have a liquidity shortfall; some of their outgoing payments may also fail, a cascade. Credit losses on the failed debit are avoided because those payments never settle, but the payees of the failed bank do not receive funds. (ii) Loss-sharing settles the original batch, so payees are paid, and the survivors jointly absorb the failed debit (by a formula: pro rata, by bilateral exposure, etc.). Credit risk is mutualised; liquidity in the batch is preserved. RTGS removes the intra-batch credit exposure because each payment settles immediately in central-bank money, so a failure does not leave a pile of unsettled nets. It does not remove the risk that a bank fails *between* payments, nor the liquidity risk of having to pay in real time before being paid, nor the credit risk on the loans that banks make to each other outside the system.
:::
:::
