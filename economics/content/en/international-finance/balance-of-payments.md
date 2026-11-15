In 2025 the United States ran a current-account deficit of 3.6 per cent of GDP; China ran a surplus of 3.8 per cent, Germany 4.5 per cent, Japan 4.9 per cent, and India a deficit of 0.9 per cent (IMF *External Sector Report* 2026, Annex Table 1.1.2, using the April 2026 WEO). Those numbers are not scores. A current-account deficit means the country acquired fewer claims on the rest of the world than the rest of the world acquired on it — it was a net borrower, or it ran down net claims it already held. A surplus is the opposite. Whether that is a problem depends on *why* the country was borrowing: to build factories, to consume, to finance a government deficit, or because foreign savers were knocking at the door. This chapter builds the accounts that make that sentence precise. The numbers that follow are for education only; they are not investment or financial advice.

The closed-economy identity of [[macroeconomics/national-income]] is $Y = C + I + G$. Once the country trades, a fourth term appears: net exports. Once it trades *assets*, a further set of entries appears: the financial account and the stock of net foreign assets. The two are linked. Today's current account is (almost) the change in that stock. Almost, because exchange rates and asset prices revalue the stock even when no new transaction occurs.

## Open-economy national accounts

Start with production. **Gross domestic product** $Y$ is the value of final goods and services produced at home. Residents also receive income from assets they hold abroad, and they pay income on assets that foreigners hold at home. **Gross national product** (or gross national income) is GDP plus **net primary income** from abroad. In a closed economy the two coincide. In an open economy they differ by the net return on the **net international investment position**, defined below. For the identities that follow we work with GDP and keep net income in the current account, which is where the IMF puts it.

The expenditure identity of an open economy is

$$
Y = C + I + G + NX,
$$ {#eq-open-y}

where **net exports** $NX$ are exports of goods and services minus imports. Rearrangement gives $NX = Y - C - I - G$: the trade balance is the gap between what the country produces and what it absorbs. Absorption $C+I+G$ can exceed production only if the country imports the difference.

::: definition Current account {#def-ca}
The **current account** $CA$ is net exports of goods and services plus **net primary income** (investment income and compensation of employees) plus **net secondary income** (current transfers such as remittances and official aid):

$$
CA = NX + NFIA + NUT.
$$

A **current-account surplus** ($CA > 0$) means the country is a net lender to the rest of the world in that period. A **deficit** means it is a net borrower. The current account is a *flow*. The corresponding *stock* is the net international investment position in [[#def-niip]].
:::

When net income and transfers are small, $CA \approx NX$, and journalists speak of the "trade balance" as if it were the current account. For the United States in 2025 the two were close in sign but not in magnitude: the goods deficit was larger than the current-account deficit because services and primary income ran a surplus (BEA International Transactions Accounts, 2025). For a country with a large net foreign asset position — Japan, Germany, Singapore — net primary income is a first-order piece of $CA$, not a rounding error.

The most useful identity in the chapter is not $CA \approx NX$. It is the link from the current account to saving and investment.

::: proposition The current account equals saving minus investment {#prop-s-i}
Let **national saving** be $S = Y + NFIA + NUT - C - G$, the part of national income not consumed by households or the government. Then, with [[#eq-open-y]] and [[#def-ca]],

$$
CA = S - I.
$$ {#eq-s-i}

Equivalently, splitting saving into private and public, $S = S_p + S_g$ with $S_p = Y + NFIA + NUT - T - C$ and $S_g = T - G$,

$$
CA = (S_p - I) - (G - T).
$$ {#eq-twin}

A government budget deficit $G-T$ is associated with a current-account deficit if private saving minus investment does not rise one-for-one to offset it. That association is an identity, not a behavioural claim; it is the **twin-deficits** arithmetic.
:::

::: proof
From [[#eq-open-y]], $NX = Y - C - I - G$. Add $NFIA + NUT$ to both sides:

$$
CA = NX + NFIA + NUT = (Y + NFIA + NUT - C - G) - I = S - I.
$$

The split $S = S_p + S_g$ is just the definition of the two saving streams. Then $CA = S_p + (T-G) - I = (S_p - I) - (G-T)$.
:::

The identity does not say that a budget deficit *causes* a current-account deficit. If the government borrows to fund a tax cut and households save the entire cut — the Ricardian case of [[macroeconomics/consumption-and-saving]] — then $S_p$ rises with $G-T$ and $CA$ is unchanged. If households do not save the cut, or if the extra government spending crowds in investment, $CA$ moves. The identity is the budget constraint; the model of behaviour comes in [[international-finance/current-account]].

::: example Palmia's national accounts {#ex-palmia-na}
The invented island of Palmia produces $Y = 1000$ of output. Consumption is $C = 650$, investment $I = 200$, government purchases $G = 180$, and net exports $NX = -30$. Taxes net of transfers are $T = 150$. Net primary income and net transfers are zero. Check [[#eq-open-y]], compute private, public and national saving, and verify [[#eq-s-i]] and [[#eq-twin]].
::: solution
Expenditure sums to $650 + 200 + 180 + (-30) = 1000 = Y$, so [[#eq-open-y]] holds. Private saving is $S_p = Y - T - C = 1000 - 150 - 650 = 200$. Public saving is $S_g = T - G = 150 - 180 = -30$. National saving is $S = 200 - 30 = 170$. Then $S - I = 170 - 200 = -30 = NX = CA$. The budget deficit is $G - T = 30$, and $S_p - I = 0$, so [[#eq-twin]] reads $CA = 0 - 30 = -30$. Palmia's current-account deficit is, in this period, exactly its public deficit: private saving covers private investment and no more.
:::
:::

::: widget plot
f: (x-80)/12; (200-x)/10
sliders: a=80:40:120
x: 40, 220
y: 0, 16
labels: \text{saving}; \text{investment}
caption: The vertical axis is the real interest rate (per cent) and the horizontal axis is the quantity of loanable funds. The saving schedule is $r=(S-a)/12$; drag $a$ to shift saving. Investment is $r=(200-I)/10$. The gap $S-I$ at a given $r$ is the current account. Raise $a$ (more autonomous saving) and watch the surplus appear at each $r$. The schedules are invented.
:::

The widget is the small-open-economy picture of [[#prop-s-i]]. In a small country the real interest rate is set abroad; saving and investment need not be equal, and the gap is the current account. In a closed economy $r$ would adjust until $S=I$. That is the whole difference, at this level of aggregation, between Palmia and a closed island.

::: warning The current account is not the government budget
$CA$ and $G-T$ are different objects. A country can run a current-account deficit with a budget surplus — Australia has done so for long stretches, funding private investment with foreign saving — and a current-account surplus with a budget deficit, if private saving is large enough (Germany in several years of the 2010s, Japan for much of the 1990s and 2000s). [[#eq-twin]] says only that the two deficits move together *if* $S_p-I$ is held fixed. Holding $S_p-I$ fixed is an assumption, not an identity.
:::

## The balance of payments accounts

The **balance of payments** is the statistical record of transactions between residents and non-residents during a period. It is compiled, in almost every country, according to the IMF's BPM6. Every transaction is entered twice, as a credit and a debit, because every exchange has two sides. A Palmia resident who buys a machine from abroad records an import (a current-account debit) and a payment (a financial-account credit, if the payment runs down a bank claim or runs up a liability). In a world with perfect measurement the accounts would sum to zero. They do not, and the gap is **net errors and omissions**.

::: definition Balance-of-payments identity {#def-bop}
Write $KA$ for the **capital account** in the BPM6 sense (capital transfers and the acquisition of non-produced non-financial assets — typically tiny) and $FA^{\mathrm{in}}$ for **net capital inflows**: the net incurrence of liabilities to non-residents minus the net acquisition of claims on non-residents, excluding reserve assets. Let $OR$ be the increase in official reserve assets, and $EO$ net errors and omissions. Then

$$
CA + KA + FA^{\mathrm{in}} - OR + EO = 0.
$$ {#eq-bop}

In textbook shorthand, ignoring $KA$, $OR$ and $EO$,

$$
CA + FA^{\mathrm{in}} = 0:
$$

a current-account surplus is matched by a net capital *outflow*. The IMF's own financial-account aggregate in BPM6 is signed the other way: a positive BPM6 financial account means net *acquisition* of claims (a capital outflow). This course uses the textbook sign $FA^{\mathrm{in}}$ unless a table is labelled BPM6.
:::

The split of $FA^{\mathrm{in}}$ is economically more interesting than the total. **Direct investment** is a lasting interest in an enterprise (the BPM6 threshold is 10 per cent of voting power). **Portfolio investment** is debt and equity securities below that threshold. **Other investment** is bank loans, deposits and trade credit. **Financial derivatives** are recorded separately. **Reserve assets** — foreign-exchange reserves, SDR holdings, the reserve position in the IMF, gold — are the central bank's claims, and they are the residual that clears a peg, as [[international-finance/exchange-rate-regimes]] will use.

::: example Double-entry for four transactions {#ex-double}
Palmia's currency is the palm. Under [[#def-bop]], a current-account credit is $+CA$ and a capital *inflow* is $+FA^{\mathrm{in}}$, so the two must sum to zero when reserves and errors are unchanged. Record each transaction. (a) Palmia imports a machine worth $10$ and pays by drawing down a deposit at a foreign bank. (b) A foreign resident buys $5$ of Palmia government bonds and pays by drawing down a Palmia-bank deposit she already held. (c) Palmia exports fruit worth $8$ and is paid with a deposit at a *foreign* bank. (d) Palmia's government receives $2$ of official aid in foreign exchange, which the central bank adds to reserves. What are $CA$, $FA^{\mathrm{in}}$ and $OR$ for the four together?
::: solution
A rise in Palmia's foreign *assets* is a capital *outflow* ($FA^{\mathrm{in}} < 0$). A rise in Palmia's *liabilities* to non-residents is a capital *inflow* ($FA^{\mathrm{in}} > 0$). A rise in official reserve assets is $+OR$.

(a) Import: $CA = -10$. Drawing down a foreign-bank deposit reduces Palmia's assets, which is an inflow: $FA^{\mathrm{in}} = +10$.

(b) The bond sale raises Palmia's liabilities, $FA^{\mathrm{in}} = +5$. The payment draws down a Palmia-bank deposit held by a non-resident, which *reduces* Palmia's liabilities, $FA^{\mathrm{in}} = -5$. Net $FA^{\mathrm{in}} = 0$. Palmia has swapped one liability (deposits) for another (bonds). The current account is untouched.

(c) Export: $CA = +8$. The payment is a new Palmia claim on a foreign bank, so Palmia's assets rise: $FA^{\mathrm{in}} = -8$.

(d) Aid is secondary income: $CA = +2$. The foreign exchange is held as reserves: $OR = +2$. No private financial-account entry.

Totals: $CA = -10 + 8 + 2 = 0$, $FA^{\mathrm{in}} = +10 - 8 = +2$, $OR = +2$. Then $CA + FA^{\mathrm{in}} - OR = 0 + 2 - 2 = 0$, which is [[#eq-bop]] with $KA = EO = 0$. The four transactions wash. If (c) had been paid into a Palmia bank instead, Palmia's liabilities would have risen ($FA^{\mathrm{in}} = +8$) and the identity would have required a further matching outflow elsewhere on the consolidated books — which is why the statement specified a *foreign* bank.
:::
:::

The long solution of [[#ex-double]] is the reason BPM6 publishes a sign convention and a companion *International Reserves and Foreign Currency Liquidity* template, and the reason every empirical paper states whether a positive financial account is an inflow. When you read a table, read the footnote.

::: intuition Two sides of one loan
A current-account deficit is not a pile of unpaid bills sitting in a cupboard. It is a loan, or a sale of equity, or a rundown of reserves, recorded on the other side of the accounts. Someone in the rest of the world is acquiring a Palmia asset. Asking "how will the deficit be financed?" as if financing were an extra decision is asking the same question twice. The financing *is* the deficit, seen from the other desk.
:::

::: quiz
Palmia runs $CA = -30$ and has no capital-account or error-and-omission entry. Official reserves are unchanged. What is $FA^{\mathrm{in}}$ under [[#def-bop]]?
- [ ] $-30$, a capital outflow
- [x] $+30$, a net capital inflow
- [ ] $0$, because reserves did not move
- [ ] $+30$ only if the government is the borrower
::: solution
[[#eq-bop]] with $KA=OR=EO=0$ is $CA + FA^{\mathrm{in}} = 0$, so $FA^{\mathrm{in}} = +30$. The private sector, the government, or both, sold claims to non-residents (or ran down foreign assets). The identity does not name the borrower; [[#eq-twin]] is the split that names the public sector.
:::
:::

## The net international investment position

Flows accumulate into stocks. The **net international investment position** (NIIP), also called **net foreign assets** $B$, is the difference between residents' claims on non-residents and non-residents' claims on residents, valued at a date. A negative NIIP is a net debtor position. The United States' NIIP was about $-88$ per cent of GDP at the end of 2025; Germany's was about $+85$ per cent, Japan's $+85$ per cent, China's $+21$ per cent, Brazil's $-49$ per cent (IMF *External Sector Report* 2026, Annex Table 1.1.2). The US number is large, and it has been large for decades, which is a puzzle we will meet again: the United States has run current-account deficits for a generation without its NIIP exploding at the same pace, because of valuation.

::: definition Net international investment position {#def-niip}
Let $B_t$ be the NIIP at the end of period $t$, $CA_t$ the current account during $t$, and $\mathit{VAL}_t$ the **valuation change** on the existing stock (exchange-rate moves, asset-price moves, and other volume changes other than transactions). Then

$$
B_t = B_{t-1} + CA_t + \mathit{VAL}_t.
$$ {#eq-niip}

Valuation is not a residual of convenience. For the United States it has often been the same order of magnitude as the current account, and of the opposite sign: US residents hold a larger share of their foreign claims as equity, which has tended to appreciate relative to the Treasury securities that dominate US liabilities (Gourinchas and Rey, "From World Banker to World Venture Capitalist", NBER, 2007; updated in subsequent *External Sector Reports*). That pattern is sometimes called the **exorbitant privilege**. It is an empirical regularity about past returns, not a guarantee.
:::

::: proposition A constant NIIP-to-output ratio requires a current-account ratio {#prop-stable-b}
Ignore valuation. Let output grow at rate $g$, so $Y_t = (1+g)Y_{t-1}$, and let $b_t = B_t/Y_t$. Then

$$
b_t = \frac{1}{1+g} b_{t-1} + \frac{CA_t}{Y_t}.
$$

A constant ratio $b$ therefore requires

$$
\frac{CA}{Y} = \frac{g}{1+g}\, b.
$$ {#eq-stable-ca}

If $b < 0$ (net debtor) and $g > 0$, a *deficit* of that size is consistent with a stable ratio. A larger deficit sends $b$ toward $-\infty$. The formula is an accounting restriction, not a test of optimality.
:::

::: proof
From [[#eq-niip]] with $\mathit{VAL}=0$, $B_t = B_{t-1} + CA_t$. Divide by $Y_t$:

$$
b_t = \frac{B_{t-1}}{Y_t} + \frac{CA_t}{Y_t} = \frac{B_{t-1}}{(1+g)Y_{t-1}} + \frac{CA_t}{Y_t} = \frac{b_{t-1}}{1+g} + \frac{CA_t}{Y_t}.
$$

Set $b_t = b_{t-1} = b$ and rearrange.
:::

For the United States, $b \approx -0.88$ and $g \approx 0.04$ (a round long-run nominal-dollar growth rate, not a forecast) would give $CA/Y \approx (0.04/1.04)\times(-0.88) \approx -3.4$ per cent. The 2025 deficit of $3.6$ per cent of GDP is in that neighbourhood *if* valuation is ignored and *if* $4$ per cent is the right $g$. Neither "if" is free, and [[#eq-stable-ca]] does not say that $-3.6$ per cent is desirable. It says that a ratio of $-88$ per cent of GDP can persist at that deficit without trending. Sustainability in the intertemporal sense — whether the present value of future trade surpluses covers $-B$ — is [[international-finance/current-account]].

::: example Valuation and the NIIP {#ex-val}
Palmia starts the year with $B_0 = -400$. During the year $CA = -46$. Palmia's foreign equity claims, worth $200$ at the start of the year, rise $10$ per cent in palm value; Palmia's liabilities, worth $600$, are unchanged in palm value. Compute $B_1$ and the share of the change due to the current account.
::: solution
Valuation on assets is $0.10 \times 200 = 20$. Valuation on liabilities is $0$. So $\mathit{VAL} = 20$ and

$$
B_1 = -400 + (-46) + 20 = -426.
$$

The NIIP deteriorated by $26$, of which $46$ was the current-account deficit and $-20$ was a valuation gain. Reporting only $CA$ would have overstated the deterioration. Reporting only $B_1 - B_0$ would have understated the amount Palmia borrowed. Both numbers are required.
:::
:::

::: example Net primary income {#ex-nfia}
Palmia's $B_0 = -400$. The average return on the stock, paid during the year, is $4$ per cent. Net exports are $NX = -30$ and net transfers are zero. Compute net primary income and the current account. (Treat the return as applying to the opening stock, and ignore intra-year accumulation.)
::: solution
$NFIA = 0.04 \times (-400) = -16$. Then $CA = -30 + (-16) + 0 = -46$, the figure used in [[#ex-val]]. A net debtor pays income abroad, so the current-account deficit is *larger* than the trade deficit. Japan, with $b > 0$, has often run a current-account surplus larger than its trade surplus for the same reason with the opposite sign (Cabinet Office of Japan, National Accounts; IMF IFS, various years).
:::
:::

## Reading a surplus or a deficit

Three confusions recur. The first is mercantilist: a surplus is "winning". [[#prop-s-i]] says a surplus is an excess of saving over investment. That can be virtue (thrift, a good investment climate abroad) or a symptom (weak investment at home, a depressed economy, an undervalued real exchange rate). China's surplus peaked near $10$ per cent of GDP in 2007 and was $3.8$ per cent in 2025; Germany's surplus has been large relative to euro-area partners since the mid-2000s (IMF WEO database, accessed 2026). Whether those surpluses were "too big" is a question about real exchange rates and demand, taken up in [[international-finance/ppp]] and [[international-finance/mundell-fleming]], not a question the identity can settle.

The second confusion is moral: a deficit is "living beyond one's means". If the means include the ability to borrow against future output, and if the borrowing funds $I$ rather than $C$, the phrase is misleading. Palmia in [[#ex-palmia-na]] had $S_p = I$ and a public deficit; a different Palmia with $S_g = 0$ and $I$ large would look like Australia or Canada in many years — a current-account deficit alongside household and firm accumulation of capital. The third confusion is to treat the current account as a policy instrument. Governments set taxes, spending, the policy rate and, sometimes, the peg. The current account is an *outcome*. Under a float it is whatever $S-I$ turns out to be at the world interest rate and home income; under a peg it is whatever is consistent with the loss or gain of reserves. Policy can aim at it only by aiming at saving, investment, or the real exchange rate.

::: application Global imbalances, 2000s and after
In the mid-2000s the United States ran current-account deficits of 5–6 per cent of GDP, matched by surpluses in China, Japan, Germany and oil exporters (IMF WEO, historical series). Bernanke (2005, "The Global Saving Glut" speech) emphasised an exogenous rise in foreign saving; others emphasised US fiscal policy and easy US credit. The identity [[#eq-s-i]] is true in both stories. The 2008 crisis and the 2010s reduced some of those gaps and opened others: Germany's surplus stayed large; China's fell as a share of GDP; oil balances moved with the oil price. The IMF's annual *External Sector Report*, since 2012, classifies current accounts as "stronger" or "weaker" than a staff norm. Those norms are models, not facts, and they are contested. This course uses the *Report* as a source of *data* (the 2025 ratios above) and treats the staff "gaps" as one assessment among others.
:::

## Evidence

Several regularities are well documented and are not theorems.

**Stylised fact 1 (Feldstein–Horioka).** Across countries, national saving and domestic investment are highly correlated, as if capital were not mobile. Feldstein and Horioka (1980, *Economic Journal*) reported a cross-section coefficient near $0.9$ for OECD countries in 1960–1974. Later samples find a smaller but still positive coefficient (Obstfeld and Rogoff, "The Six Major Puzzles", NBER Macroeconomics Annual, 2000). In [[#prop-s-i]] that correlation is a small $CA$. The fact is a puzzle for a world of perfect capital mobility and a commonplace for a world of home bias, nontraded goods and current-account targeting.

**Stylised fact 2 (home bias in portfolios).** Residents hold a much larger share of home equity than a world CAPM would predict (French and Poterba, 1991, *AER Papers and Proceedings*). The NIIP is the *net* of two large gross stocks. Gross stocks have grown faster than nets: financial globalisation is mostly gross two-way holding, not net one-way lending (Lane and Milesi-Ferretti, "The External Wealth of Nations Mark II", *Journal of International Economics*, 2007, and updates at the IMF).

**Stylised fact 3 (valuation matters).** For the United States, the gap between the cumulative current account and the change in the NIIP is persistent and, over 1980–2020, of the same order as the cumulative deficit itself (BEA IIP tables; Gourinchas and Rey, various). For emerging markets, valuation often goes the other way: foreign-currency liabilities revalue against the borrower when the currency depreciates. That is a crisis mechanism in [[international-finance/crises]].

Country coverage should not stop at the North Atlantic. Nigeria and Saudi Arabia run current accounts that follow the oil price; Bangladesh's surplus, when it has one, is often remittances in $NUT$; Chile's balance moves with copper; Kenya has typically run a current-account deficit financed by a mix of FDI and official flows (IMF IFS and WEO, accessed 2026). The identities are the same. The composition of $CA$ and of $FA^{\mathrm{in}}$ is not.

::: widget plot
f: 40-0.05*x; a-0.05*x
sliders: a=40:10:70
x: 0, 900
y: -20, 50
labels: \text{NX at high foreign demand}; \text{NX}
hlines: 0
caption: Keynesian net exports as a function of home output $Y$, $NX = a - 0.05 Y$. Raise $a$ (foreign demand or a real depreciation, previewing later chapters). The intercept with the axis is the output at which the trade balance is zero. The lines are invented; the slope is a marginal propensity to import.
:::

## Where this leads

Exchange rates are the prices that, in a floating regime, help $NX$ and $CA$ to adjust, and that, in a pegged regime, the central bank defends with $OR$. That is [[international-finance/exchange-rates]]. The long-run behaviour of the real exchange rate is [[international-finance/ppp]]. The question whether Palmia *should* have borrowed, and whether $-426$ is a sustainable $B$, is [[international-finance/current-account]]. Short-run output, the interest rate and the exchange rate together are [[international-finance/mundell-fleming]]. When $FA^{\mathrm{in}}$ reverses in a few weeks, the accounts still add up and the economy may not: [[international-finance/crises]].

::: history
David Hume's 1752 essay 'Of the Balance of Trade', collected in *Political Discourses*, is the ancestor of this chapter's identities and of the gold-standard adjustment mechanism. Hume argued that a trade surplus draws specie into the country, raises prices, and so chokes off the surplus; a deficit does the reverse. The mechanism is the **price–specie-flow**. It assumes a metallic standard, flexible prices, and no sterilisation of specie flows. Hume was writing against mercantilists who treated a surplus of bullion as an end. The identity $CA = S - I$ is later — it is national-accounting, twentieth century — but Hume's point that a surplus is a *flow that changes a stock and thereby changes prices* is already the NIIP logic of [[#eq-niip]], without the financial assets. Meade's *The Balance of Payments* (1951) is the first systematic modern treatment; the IMF's first *Balance of Payments Manual* appeared in 1948, and BPM6 in 2009.
:::

::: summary
- In an open economy $Y = C+I+G+NX$. The current account is $CA = NX + NFIA + NUT$, a flow of net lending to the rest of the world.
- $CA = S - I = (S_p - I) - (G - T)$. The twin-deficits relation is an identity at given $S_p-I$, not a causal law.
- The balance of payments records every resident/non-resident transaction twice. Textbook shorthand is $CA + FA^{\mathrm{in}} = 0$; BPM6 signs the financial account the other way. Official reserves are the central bank's residual.
- The NIIP obeys $B_t = B_{t-1} + CA_t + \mathit{VAL}_t$. Valuation is first-order for the United States and for countries with foreign-currency debt.
- A stable $B/Y$ requires $CA/Y = \frac{g}{1+g} b$. For $b = -0.88$ and $g = 0.04$ that is about $-3.4$ per cent of GDP, an accounting benchmark, not a target.
- A surplus is not a victory and a deficit is not a vice. Both are outcomes of saving, investment and relative prices.
:::

## Exercises

::: exercise Palmia's absorption {level=1 check="-30"}
In [[#ex-palmia-na]], $Y = 1000$ and absorption is $C+I+G$. Enter the current account $CA$ (which equals $NX$).
::: solution
Absorption is $650+200+180 = 1030$. Then $NX = Y - \text{absorption} = 1000-1030 = -30 = CA$.
:::
:::

::: exercise Private saving {level=1 check="200"}
Using the same Palmia numbers, $T = 150$ and $C = 650$. Enter private saving $S_p$.
::: solution
$S_p = Y - T - C = 1000 - 150 - 650 = 200$. National saving is $170$ after subtracting the public deficit of $30$; the question asked for private saving.
:::
:::

::: exercise Twin-deficits arithmetic {level=1 check="-50"}
Keep Palmia's $S_p = 200$ and $I = 200$, but raise the public deficit $G-T$ from $30$ to $50$. Enter the new $CA$.
::: solution
[[#eq-twin]] with $S_p-I = 0$ gives $CA = -(G-T) = -50$. The identity holds because we held $S_p$ and $I$ fixed. If households had saved the extra deficit, $CA$ would not have moved.
:::
:::

::: exercise Stable-ratio current account {level=2 check="-3.2"}
A country has $b = B/Y = -0.80$ and output growth $g = 0.04$. Ignoring valuation, enter the current-account ratio $CA/Y$ in *per cent* that stabilises $b$ (so enter $-3.2$ for $-3.2$ per cent).
::: solution
[[#eq-stable-ca]] gives $CA/Y = \frac{0.04}{1.04}\times(-0.80) = -0.032$, which is $-3.2$ per cent of GDP. A more negative ratio would send $b$ down; a less negative ratio would raise $b$ toward zero.
:::
:::

::: exercise NIIP update {level=2 check="-426"}
Repeat [[#ex-val]]: $B_0 = -400$, $CA = -46$, valuation $+20$. Enter $B_1$.
::: solution
$B_1 = -400 - 46 + 20 = -426$ by [[#eq-niip]].
:::
:::

::: exercise Income account {level=2 check="-46"}
Opening NIIP $-400$, return $4$ per cent on the opening stock, $NX = -30$, net transfers $0$. Enter $CA$.
::: solution
$NFIA = -16$, $CA = -30-16 = -46$, as in [[#ex-nfia]].
:::
:::

::: exercise Who is borrowing? {level=3}
A country has $CA = -4$ per cent of GDP, $G-T = 2$ per cent of GDP, and $I = 22$ per cent of GDP. (a) What is $S_p$ as a per cent of GDP? (b) What is national saving? (c) Interpret which sector is the net borrower from the rest of the world. Use [[#eq-twin]].
::: hint
From $CA = (S_p - I) - (G-T)$, solve for $S_p$. National saving is $S_p + S_g = S_p - (G-T)$.
:::
::: solution
(a) $-4 = (S_p - 22) - 2$, so $S_p - 22 = -2$, hence $S_p = 20$ per cent of GDP. (b) $S_g = -2$, so $S = 18$ per cent of GDP, and $S-I = 18-22 = -4 = CA$. (c) The public sector is in deficit by $2$ per cent of GDP. Private investment exceeds private saving by $2$ per cent of GDP. Each sector is a net borrower of $2$ per cent of GDP; together they borrow $4$ per cent of GDP from abroad. The rest of the world is the counterpart. The split is accounting; it does not say which sector "caused" the current-account deficit.
:::
:::

::: exercise Valuation versus transactions {level=3}
Country A has $B_0 = 0$, runs $CA = -10$ each year for five years, and has no valuation changes. Country B has $B_0 = 0$, runs $CA = 0$ each year, but suffers a valuation loss of $10$ in year 3 only. (a) Compute each NIIP at the end of year 5. (b) Which country borrowed from the rest of the world, in the sense of the current account? (c) Why might a crisis in B still be described as an "external" crisis?
::: hint
Apply [[#eq-niip]] year by year. Then ask what $CA$ measures that $B$ does not.
:::
::: solution
(a) Country A: $B_5 = 0 + 5\times(-10) = -50$. Country B: $B_5 = 0 + 0 + (-10) = -10$. (b) Only A borrowed in the current-account sense: A imported more goods, services and income-debits than it exported, and issued claims to pay for them. B did not. (c) B's net liabilities still rose, because existing claims were revalued — for example a depreciation of B's currency against foreign-currency debt, or a fall in the local-currency price of B's foreign assets. Residents of B may face a rollover problem on the revalued stock even though they did not run a flow deficit. That is why [[#def-niip]] keeps $CA$ and $\mathit{VAL}$ separate, and why crisis chapters look at both the flow and the currency composition of the stock.
:::
:::
