A ten-thousand-per-cent inflation, of the kind Germany suffered in 1923 and Zimbabwe in 2008, does not happen because a harvest failed or because unions asked for too much. It happens because the quantity of money is growing at a similar rate. That claim — the **quantity theory of money** — is the oldest surviving theory in macroeconomics, and in the classical long-run model of the previous chapter it is also the right one: with $Y$ pinned down by $K$, $L$ and $A$, the price level $P$ is determined by the supply of money, and inflation $\pi$ is determined by the growth of that supply.

This chapter stays in that long run. It defines money, writes the quantity equation, derives the **neutrality of money** and the **Fisher relation** $i \approx r + \pi^e$, and uses both to study seigniorage, the costs of inflation, and hyperinflation. Competing views — Keynes’s liquidity preference, monetarism, new classical monetary neutrality, New Keynesian non-neutrality at a shorter horizon — are stated as claims about how fast $P$ adjusts and about how $\pi^e$ is formed, not as slogans. The chapter is for education only. It is not a forecast of inflation, not a ranking of currencies, and not advice to hold or to avoid any monetary asset.

Notation: $M$ is a named monetary aggregate, $P$ the price level, $Y$ real output, $V$ velocity, $\pi$ inflation, $i$ the **nominal** interest rate and $r$ the **real** interest rate. Profit is $\Pi$ if it appears. The previous chapter’s real rental rate $R$ is in the background as $R = r + \delta$ and is not needed here.

## What money is

::: definition Money {#def-money}
**Money** is the generally accepted medium of exchange in an economy, and by extension the unit of account in which prices are quoted and the standard of deferred payment in which debts are denominated. A **monetary aggregate** $M$ is a statistical sum of instruments that serve those functions to a stated degree: currency in circulation; **M1**, typically currency plus transferable deposits; **M2**, adding savings and small time deposits. The **monetary base** (high-powered money) is currency plus reserves at the central bank.
:::

Three remarks keep the definition from collapsing into tautology. First, “generally accepted” is a social fact, not a physical one: cigarettes were money in prisoner-of-war camps; a central-bank note is money because people expect other people to take it. Second, the boundary of $M$ is conventional. In the United States the Federal Reserve’s M2 averaged about USD 21 trillion in 2024 (FRED, M2SL, annual, accessed 2026); in the euro area the ECB’s M3 is the analogous broad aggregate. Third, money is not the same thing as wealth, and it is not the same thing as credit. A house is wealth; a credit card limit is a line of credit; neither is in $M$ until a payment is made in a monetary instrument.

In a **commodity-money** system the medium of exchange has an intrinsic use (gold, salt, cigarettes). In a **fiat-money** system it does not: a modern banknote is a claim on nothing in particular, backed by the expectation that it will buy goods tomorrow. Almost every economy this course discusses is a fiat system, possibly with a commodity memory (a gold-exchange standard, a currency board). How the central bank supplies the base, and how banks multiply it, is the subject of [[money-banking/central-banking]]. Here $M$ is treated as a policy variable, or as growing at a constant rate $\mu$.

The opportunity cost of holding money rather than a nominal bond is the nominal interest rate $i$. That is why money demand, once we write it, will slope down in $i$.

## The quantity equation and the quantity theory

::: definition Quantity equation {#def-quantity}
The **quantity equation** (equation of exchange) is the identity

$$
M V = P Y,
$$ {#eq-mvpy}

where $V \equiv PY/M$ is the **income velocity of money**: the number of times a unit of $M$ is spent on final output in the period. The **Cambridge** form is $M = k P Y$ with $k \equiv 1/V$.
:::

[[#eq-mvpy]] is an identity because $V$ is defined to make it true. It becomes a **quantity theory** when something is said about $V$ (or $k$) and about $Y$. The classical quantity theory of Fisher’s *Purchasing Power of Money* (1911) takes $Y$ as determined on the real side (the previous chapter) and $V$ as determined by payments technology and habits, slow-moving in the long run. Then $P$ is proportional to $M$, and inflation is money growth minus output growth.

::: proposition The quantity theory of inflation {#prop-qtm}
Assume $Y$ grows at a given rate $g_Y$ and $V$ grows at a given rate $g_V$. Then inflation satisfies

$$
\pi = \mu + g_V - g_Y,
$$ {#eq-pi}

where $\mu \equiv \dot M/M$ is the growth rate of money. If $V$ is constant, $\pi = \mu - g_Y$.
:::

::: proof
Take logarithmic derivatives of [[#eq-mvpy]]: $\dot M/M + \dot V/V = \dot P/P + \dot Y/Y$, which is $\mu + g_V = \pi + g_Y$. Rearrangement is [[#eq-pi]]. (In discrete time the same relation holds for logarithmic growth rates, and holds approximately for percentage changes when those changes are small.)
:::

The proposition is the long-run monetarist claim in one line. It does not say that money is the only thing that *ever* moves $P$: a jump in $V$ (a flight from the currency) or a collapse in $Y$ (a war, a pandemic) will do it too. It says that a *sustained* high $\pi$ requires a sustained high $\mu$, because $g_Y$ is a few per cent a year in the data and $g_V$ is not a free parameter that can offset arbitrarily large $\mu$.

::: example A quantity-theory calculation {#ex-qtm}
In a closed economy $M = 600$, $V = 4$ and $Y = 200$. Find $P$. If money then grows at 10 per cent a year, output at 3 per cent and velocity is constant, what is inflation? What happens to $P$ over a year?
::: solution
$P = MV/Y = 2400/200 = 12$. With constant $V$, [[#eq-pi]] gives $\pi = 0.10 - 0.03 = 0.07$, or 7 per cent. After a year, $M' = 660$, $Y' = 206$, $P' = 660\times 4 / 206 \approx 12.816$, and $12.816/12 - 1 = 0.068$, about 6.8 per cent: the discrete-time percentage change is a shade below the continuous-time $\pi$ of 7 per cent, as a first-order approximation would lead one to expect.
:::
:::

::: widget plot
f: (0.2*y - x)/h
x: 0, 400
y: 0, 0.25
sliders: y=1000:600:1400:20; h=2000:1000:4000:100
vlines: 160
labels: \text{money demand }i=(kY-M/P)/h
caption: Real balances $M/P$ on the horizontal axis, the nominal interest rate $i$ on the vertical. The downward-sloping line is a linear money-demand schedule $M/P = kY - h i$ with $k=0.2$; the vertical line is real supply, drawn at $160$. Raise $y$: demand shifts right and, with $M$ fixed, $i$ must rise (or $P$ must rise, moving the vertical line left) to clear the market. Raise $h$: demand becomes more interest-elastic and the same shift in $Y$ moves $i$ less. In the classical long run $i$ is pinned by Fisher, $Y$ is pinned by supply, and $P$ does the clearing.
:::

The figure is Keynes’s liquidity-preference diagram, and it is not in conflict with the quantity theory once the horizon is named. In the long run $i$ is determined by $r+\pi^e$ (below), $Y$ is determined by supply, and $M/P = L(Y,i)$ determines $P$. In the short run of [[macroeconomics/is-lm]], $P$ is sticky, $Y$ and $i$ both adjust, and the same diagram becomes the LM curve.

::: quiz
If real output is given, velocity is constant, and the money stock doubles, the quantity theory predicts that
- [ ] real balances $M/P$ double
- [x] the price level doubles and real balances are unchanged
- [ ] velocity must fall by half to keep $PY$ unchanged
- [ ] the real interest rate doubles
::: solution
$M V = P Y$ with $V$ and $Y$ given implies $P$ doubles with $M$. Real balances $M/P$ are therefore unchanged, and so is $r$, which is determined in the market for loanable funds of the previous chapter. Velocity is constant by assumption, not a residual that offsets the doubling.
:::
:::

## Neutrality, the classical dichotomy and the Fisher effect

::: definition Neutrality and the classical dichotomy {#def-neutrality}
Money is **neutral** if a once-and-for-all change in $M$ changes $P$ in the same proportion and leaves all real variables ($Y$, $C$, $I$, $w$, $r$, $L$) unchanged. The **classical dichotomy** is the stronger modelling strategy of determining the real variables first, from real supply and demand, and only then determining $P$ from the money market.
:::

Neutrality is a property of an equilibrium comparison; the dichotomy is a method. The classical model of this and the previous chapter has both. Doubling $M$ doubles $P$; real balances, relative prices and $r$ are unchanged. The dichotomy fails in any model where some nominal price is sticky, or where the demand for real balances feeds back into goods demand before $P$ has moved — which is why IS–LM and New Keynesian models drop it at a short horizon, while keeping it as a long-run restriction.

The nominal and real interest rates are linked by arbitrage between money, bonds and goods.

::: proposition The Fisher relation {#prop-fisher}
Let $i$ be the one-period nominal interest rate, $r$ the ex post real rate, and $\pi$ the realised inflation rate. Then

$$
1 + r = \frac{1+i}{1+\pi}, \qquad r \approx i - \pi
$$ {#eq-fisher-expost}

when $\pi$ is small. The **ex ante Fisher relation** replaces $\pi$ by expected inflation $\pi^e$:

$$
i = r + \pi^e
$$ {#eq-fisher}

in the same approximation, where $r$ on the right is now the ex ante real rate that clears the goods market. The **Fisher effect** is the comparative-static claim that a rise in $\pi^e$ raises $i$ one-for-one, with $r$ unchanged.
:::

::: proof
A nominally risk-free bond pays $1+i$ units of money next period. In goods, that is $(1+i) P_t / P_{t+1} = (1+i)/(1+\pi)$ units, which is the definition of $1+r$. Taking logs, $r = i - \pi$ up to terms of order $\pi i$. If the bond is priced before $\pi$ is observed, the same arithmetic with $\E_t P_{t+1}$ defines the ex ante real rate and produces [[#eq-fisher]]. In the classical model $r$ is determined by saving and investment, independently of money; a rise in $\pi^e$ that is not a real shock must therefore show up in $i$.
:::

::: example A Fisher calculation {#ex-fisher}
The real interest rate determined in the loanable-funds market is 3 per cent. Expected inflation is 5 per cent. What nominal interest rate does [[#eq-fisher]] predict? If expected inflation rises to 9 per cent and $r$ is unchanged, what happens to $i$? Using the exact formula [[#eq-fisher-expost]], what $i$ delivers an ex ante real rate of 3 per cent when $\pi^e = 5$ per cent?
::: solution
The linear Fisher equation gives $i = 0.03 + 0.05 = 0.08$, or 8 per cent. A four-point rise in $\pi^e$ raises $i$ to 12 per cent. The exact formula is $1+i = (1+r)(1+\pi^e) = 1.03 \times 1.05 = 1.0815$, so $i = 8.15$ per cent — a fifteenth of a point above the linear approximation, which is the cross-term $r\pi^e = 0.0015$.
:::
:::

The Fisher effect is one of the better-attested long-run regularities in the monetary data: countries with persistently high inflation have persistently high nominal interest rates. It is not a claim about the next month. A surprise rise in $M$ can lower $i$ in the short run (the liquidity effect of [[macroeconomics/is-lm]]) before $\pi^e$ and $i$ rise together. Mishkin (1992, *Journal of Monetary Economics*) found the Fisher effect in U.S. data at long horizons and not at short ones, which is what the two-horizon story predicts.

::: warning Nominal rates, real rates and inflation
A common confusion is to treat a high $i$ as “tight money”. In the Fisher equation a high $i$ is, in the long run, *loose* money: it is the symptom of high $\pi^e$, hence of high $\mu$. Brazil’s Selic rate in the 1990s and Argentina’s deposit rates in repeated high-inflation episodes were high because inflation was high, not because money was scarce in real terms. The real rate $r = i - \pi^e$ is the price that belongs in saving and investment decisions; $i$ by itself is not. A related trap is to compute $r$ as $i - \pi$ with *past* inflation when the relevant concept is ex ante, $i - \pi^e$. When $\pi$ is falling, past $\pi$ overstates $\pi^e$ and understates the ex ante real rate — a mistake that was costly in the early 1980s, when the Volcker disinflation produced high ex ante $r$ while backward-looking arithmetic still looked milder.
:::

## Seigniorage and the inflation tax

The issuer of fiat money can buy goods with newly printed currency. The real value of that command is **seigniorage**.

::: definition Seigniorage {#def-seigniorage}
**Seigniorage** in a period is the real resources the issuer obtains by increasing the nominal money stock,

$$
S_t = \frac{M_t - M_{t-1}}{P_t}.
$$

If real balances $m = M/P$ are constant and inflation is $\pi$, this equals

$$
S = \frac{\pi}{1+\pi}\, m
$$ {#eq-seign}

in discrete time, and $S = \pi m$ in continuous time. The same quantity is called the **inflation tax**: inflation erodes the real value of outstanding money, and seigniorage is the corresponding transfer from holders of money to the issuer.
:::

In a long-run steady state with constant $m$ and $Y$, money growth equals inflation and [[#eq-seign]] is the government’s inflation-tax revenue. Two immediate consequences follow. First, seigniorage as a share of GDP is $\pi m / Y$ (continuous time): it is large only if both inflation and real balances are substantial. High inflation, however, drives $m/Y$ down, because people economise on money, so the product $\pi m$ can be non-monotone — an inflation-tax Laffer curve. Second, seigniorage is a real resource for the government, but it is not a free lunch for the economy: it is a transfer, and the costs in the next section are the deadweight loss of the tax.

::: example Inflation-tax arithmetic {#ex-seign}
Real balances are 10 per cent of GDP and inflation is 25 per cent a year, with $m$ constant. Compute seigniorage as a share of GDP using [[#eq-seign]]. If inflation rises to 100 per cent and real balances fall to 4 per cent of GDP, does the government collect more?
::: solution
At 25 per cent inflation, $S/Y = (0.25/1.25)\times 0.10 = 0.02$, or 2 per cent of GDP. At 100 per cent inflation, $S/Y = (1/2)\times 0.04 = 0.02$, also 2 per cent of GDP. Revenue is unchanged; the tax rate has risen and the base has shrunk in offsetting proportion. Whether a further rise in $\pi$ would raise or lower revenue depends on the elasticity of $m$ with respect to $\pi$, which is the Cagan question below. The numbers are illustrative, not a description of any particular treasury.
:::
:::

Cagan’s 1956 study of seven hyperinflations modelled real money demand as $\ln m = -\eta \pi^e$ (interest rates being dominated by inflation at those rates). Steady-state seigniorage $\pi e^{-\eta \pi}$ is maximised at $\pi = 1/\eta$. Estimated $\eta$ in Cagan’s episodes implied revenue-maximising inflations of tens of per cent *per month*, and the actual inflations were often higher still: the governments were on the wrong side of the Laffer curve, printing faster as the base collapsed. Sargent (1982, “The Ends of Four Big Inflations”) documented that the hyperinflations of the 1920s ended when fiscal reform — a credible end to money-financed deficits — shifted $\pi^e$, not when the quantity of money was first reduced. Real balances recovered as soon as people believed the reform, which is what a forward-looking money-demand function predicts.

::: example Velocity and a pandemic {#ex-velocity}
In 2019 a country’s $M=1000$, $P=2$, $Y=2000$, so $V=4$. In 2020, $M$ jumps to $1300$ (a deposit surge) and $Y$ falls to $1800$. Measured inflation is zero, so $P$ is still $2$. What is 2020 velocity? What inflation would the 2019 velocity, applied to 2020 $M$ and $Y$, have predicted?
::: solution
$V_{2020} = PY/M = 3600/1300 \approx 2.77$. Velocity has fallen by about 30 per cent. Had $V$ stayed at $4$, $P$ would have been $MV/Y = 5200/1800 \approx 2.89$, an inflation of about 44 per cent. The quantity equation is an identity in both years; the quantity *theory* with frozen $V$ is a bad one-year forecast when $V$ moves this much. The same identity, applied to a decade in which $\mu$ is 20 per cent a year and $V$ is trendless, would still be a good theory of $\pi$.
:::
:::

## The costs of inflation

A fully anticipated inflation, with $i$ moving one-for-one with $\pi$ and with all contracts indexed, is not costless, but its costs are specific and mostly small at moderate rates. An unanticipated inflation, or a highly variable one, is a different object.

**Shoe-leather costs.** Higher $i$ raises the opportunity cost of money and causes people to hold less $m$, making more trips to the bank or its modern equivalent. Bailey (1956) measured the welfare loss as the area under the money-demand curve, analogous to the deadweight loss of a tax. At the inflation rates of the United States, the euro area or Japan in the 2010s — a couple of per cent a year — the area is a fraction of a per cent of GDP. At the rates of Argentina or Turkey in years when $\pi$ ran to several tens of per cent, it is no longer negligible, and in a hyperinflation it becomes a dominant use of time.

**Menu costs.** Prices have to be reset. The physical menu is a metaphor: the cost is the time, the customer confusion, and the relative-price noise of staggered resets. Mankiw (1985) showed that small menu costs can have large allocative effects when they interact with monopoly power; that paper is a foundation of the New Keynesian model in [[business-cycles/nominal-rigidities]], not a claim that reprinting menus is itself a large social cost.

**Unanticipated inflation and redistribution.** A surprise rise in $P$ transfers wealth from nominal creditors to nominal debtors. A government with a large stock of long-term nominal debt is a debtor: surprise inflation is a capital levy. A pensioner on a nominally fixed income is a creditor. Indexation undoes the transfer; incomplete indexation, which is the historical norm, does not. The transfer is not a social cost in the efficiency sense — one agent’s loss is another’s gain — but it is a political-economy fact, and the risk of it is a cost: people spend resources avoiding a lottery they would prefer not to face.

**Inflation variability and relative-price noise.** When $\pi$ is high it is usually volatile (Okun 1971; Taylor 1981). Relative prices then become harder to read, and long-term nominal contracting becomes harder to sustain. This is probably the most important cost at high inflation, and the hardest to put a number on. It is also the cost that a **hyperinflation** maximises: during the German inflation of 1923, prices could double in a few days, and the mark ceased to be a unit of account well before the November reform.

**Deflation.** A falling $P$ is not a symmetric blessing. Unanticipated deflation transfers wealth from debtors to creditors and can raise the real value of debt to the point of default (Fisher’s 1933 debt-deflation). If $i$ cannot fall below zero (or a slightly negative effective lower bound), a fall in $\pi^e$ raises $r$ and can choke off demand — the liquidity-trap logic of [[macroeconomics/is-lm]] and of [[business-cycles/zero-lower-bound]]. Japan’s consumer-price inflation averaged close to zero, and in several years was negative, from the late 1990s through the 2010s (IMF International Financial Statistics / WEO historical series, accessed 2026); whether that deflation was a cause or a symptom of weak demand is still disputed, which is a reason not to treat “low inflation is always good” as a theorem.

::: intuition Why moderate inflation is a policy choice, not a theorem
The quantity theory says that a central bank that can control $\mu$ can control $\pi$ in the long run. It does not say which $\pi$ to choose. A two-per-cent inflation target, of the kind the Federal Reserve, the ECB, the Bank of England and the Bank of Japan have announced (as of 2026), is a value judgement plus a practical argument: some buffer above zero reduces the risk of hitting the lower bound on $i$, and some inflation greases relative-price adjustment when nominal wages are downward-sticky. Those arguments are New Keynesian, not classical. A classical quantity theorist who thought prices were fully flexible and $i$ unbounded below would be close to indifferent among small constant inflation rates, and would care mainly about making the chosen rate predictable. The atlas sets out the trade-off; it does not choose the target.
:::

## Hyperinflation

::: definition Hyperinflation {#def-hyper}
Cagan (1956) defined a **hyperinflation** as a period in which the monthly inflation rate exceeds 50 per cent. At 50 per cent a month, the price level rises by a factor of about $1.5^{12} \approx 130$ in a year.
:::

The 50-per-cent threshold is conventional — Argentina in 1989 and Venezuela in 2018 would qualify as catastrophes on any definition — but it is useful because at those rates money demand collapses in the Cagan way and the fiscal motive for printing becomes transparent. The standard episodes remain the European inflations after the First World War (Austria, Hungary, Germany, Poland, Russia), Hungary in 1946 (the most extreme on record), several Latin American inflations of the 1980s and early 1990s, Zimbabwe in 2007–09, and Venezuela in the late 2010s. Hanke and Krus (2013) catalogue more than fifty cases meeting a related criterion.

The mechanism is a feedback, not a single shock. A government that cannot raise taxes or sell bonds on a scale that covers its deficit prints money. Inflation rises; the real money base shrinks; the same deficit now requires faster printing; $\pi^e$ rises; money demand shrinks further. The loop is broken by a fiscal reform that makes the future path of $M$ consistent with a stable $P$, typically together with a monetary reform that replaces the old unit of account. The quantity of money at the moment of reform need not drop: what drops is expected future growth of $M$. That is Sargent’s 1982 conclusion, and it is the reason a hyperinflation is classified in this chapter as a fiscal-and-expectational event as much as a monetary one.

::: application Zimbabwe, 2007–09
Zimbabwe’s consumer-price inflation, already high in the mid-2000s, passed Cagan’s monthly 50-per-cent mark in 2007 and reached hundreds of millions of per cent year-on-year in 2008 (Reserve Bank of Zimbabwe statistical releases of the time; Hanke and Kwok 2009 give a reconstruction from dollar exchange rates). Real seigniorage did not rise in proportion: the tax base evaporated as the population dollarised. The episode ended, in practice, when the U.S. dollar and the South African rand displaced the Zimbabwe dollar in 2009, which is a particularly blunt form of monetary reform. The real output collapse of those years had many causes — land reform, agricultural disruption, capital flight — and the hyperinflation was one of them, not the only one. A quantity-theory account explains the price level; it does not pretend to be a complete political history.
:::

## Evidence

**Money growth and inflation in the long run.** McCandless and Weber (1995, Federal Reserve Bank of Minneapolis *Quarterly Review*) reported correlations close to one between average money growth and average inflation across more than a hundred countries over three decades, and correlations near zero between money growth and real output growth. That pattern is the quantity theory’s visiting card. It is a statement about averages over decades, not about quarter-to-quarter forecasting: in the short run $V$ moves, $Y$ moves, and $M$ as measured by M2 is not a policy instrument under interest-rate control. The IMF’s October 2025 *World Economic Outlook* put global consumer-price inflation at 5.8 per cent in 2024, and projected 4.2 per cent in 2025 and 3.7 per cent in 2026 — a disinflation from the 2021–23 shock, not a new monetary regime. Those figures are projections, not facts, and they are not a forecast this chapter is making for any later year.

**Velocity is not a constant.** U.S. M2 velocity fell sharply in 2020 as deposits surged and spending did not, and then recovered only in part (FRED, M2V, accessed 2026). A quantity equation with a frozen $V$ would have predicted more inflation in 2020–21 from the M2 spike than occurred, and would have missed some of the inflation of 2021–23 that came with the rebound in velocity and with supply shocks. Monetarists read 2021–23 as delayed quantity-theory inflation; New Keynesians read it as a mix of demand, reopening, and energy and food shocks. Both readings can cite parts of the same data. What the long-run evidence still supports is [[#eq-pi]] as a constraint on *sustained* inflation, not as a one-year forecasting tool.

**The Fisher effect.** Across countries, average $i$ tracks average $\pi$. Within countries, the relationship is cleaner at low frequencies. During the Volcker disinflation in the United States, the federal funds rate peaked above 19 per cent in 1981 (FRED, FEDFUNDS) while CPI inflation was already falling from its 1980 peak of 13.5 per cent (BLS, CPI-U, annual); ex ante real rates were high, which is the liquidity-and-disinflation mix of the next-but-one chapter rather than a failure of Fisher.

**Seigniorage.** In high-income countries with established tax systems, seigniorage is typically a fraction of a per cent of GDP — a rounding error on the budget. In countries that have relied on the inflation tax, it has been several per cent of GDP for a time, then less as $m$ collapsed. Easterly, Mauro and Schmidt-Hebbel (1995, *World Bank Economic Review*) estimated money-demand elasticities implying a seigniorage-maximising inflation well below the rates many of their sample countries actually ran.

## Competing views

**Quantity theorists and monetarists** (Fisher; Friedman and Schwartz, *A Monetary History of the United States*, 1963; Lucas 1972) treat [[#eq-pi]] as the theory of inflation and neutrality as the theory of money in the long run. Friedman’s 1968 address added that monetary policy cannot peg $r$ or $u$ beyond a transition, which is why this chapter and the previous one determine those variables on the real side.

**Keynes** (*General Theory*, Ch. 13–15) treated the interest rate as the price that equilibrates the demand for money with a given $M$, and played down the quantity-theory determination of $P$. In a depression with idle resources and a possibly unbounded $k$, that is a coherent short-run position; it is the position IS–LM will formalise. It is not a theory of the German price level in 1923.

**New classicals** made neutrality a property of the equilibrium even in the short run, except for surprise money (Lucas 1972; Sargent and Wallace 1975). **New Keynesians** accept long-run neutrality and deny short-run neutrality, on the grounds of sticky prices. **Fiscal theories of the price level** (Sargent and Wallace 1981, “Unpleasant Monetarist Arithmetic”; Leeper 1991; Cochrane’s later expositions) argue that $P$ is the real value of nominal government liabilities, so that a fiscal imbalance not matched by future primary surpluses must inflate. Those theories do not contradict [[#eq-mvpy]]; they give a reason why $\mu$ may not be independently choosable.

The disagreements are about horizon, about expectations, and about which policy variable is exogenous. They are not about whether a hundred-fold increase in $M$, with $Y$ given, will raise $P$.

## Where this leads

[[macroeconomics/is-lm]] takes $P$ as given in the short run and lets $Y$ and $i$ clear the goods and money markets; the LM curve is the money-market diagram of this chapter, redrawn in $(Y, i)$ space. [[macroeconomics/aggregate-supply]] puts $\pi$ and $\pi^e$ into a Phillips curve and asks how a disinflation is achieved. [[money-banking/central-banking]] describes the institutions that supply $M$ and set $i$. [[business-cycles/monetary-policy-rules]] studies interest-rate rules that implement an inflation target. Open-economy inflation and exchange rates are [[international-finance/ppp]] and [[international-finance/mundell-fleming]].

::: history
**1911, Irving Fisher.** *The Purchasing Power of Money* wrote $MV=PT$ (with $T$ a transactions aggregate) and argued that $V$ and $T$ are determined independently of $M$ in the long run, so that $P$ is proportional to $M$. **1930, Fisher** again: *The Theory of Interest* stated the decomposition of $i$ into a real rate and expected inflation, the relation that now bears his name. **1956, Phillip Cagan.** “The Monetary Dynamics of Hyperinflation”, in Friedman’s edited volume *Studies in the Quantity Theory of Money*, estimated exponential money-demand functions on seven hyperinflations and defined the 50-per-cent-a-month threshold still in use. **1963, Milton Friedman and Anna Schwartz.** *A Monetary History of the United States, 1867–1960* documented the association of money with prices and with the cycle in U.S. history, and attributed the Great Depression’s depth to a collapse of $M$ that the Federal Reserve did not offset.
:::

::: summary
- Money is a medium of exchange; $M$ is a conventional aggregate. The quantity equation $MV=PY$ is an identity; it becomes a theory when $V$ and $Y$ are determined independently of $M$.
- In the classical long run, $\pi = \mu + g_V - g_Y$. Sustained inflation is a monetary phenomenon in that precise sense.
- Money is neutral: a change in $M$ scales $P$ and leaves real variables unchanged. The Fisher relation is $i \approx r + \pi^e$; the Fisher effect is the one-for-one movement of $i$ with $\pi^e$.
- Seigniorage $S = \pi m/(1+\pi)$ is the inflation tax. High $\pi$ shrinks $m$, so revenue need not rise with the tax rate.
- The costs of inflation are shoe-leather, menu, redistribution, and relative-price noise; they are small at low stable $\pi$ and dominant in a hyperinflation. Deflation has costs of its own.
- Keynesian, monetarist, new classical and fiscal-theory views disagree about horizon and about which variable is exogenous; they do not disagree that a large, sustained $\mu$ produces a large, sustained $\pi$.
:::

## Exercises

::: exercise A price-level calculation {level=1 check="5"}
$M = 400$, $V = 5$, $Y = 400$. Compute the price level $P$. (Enter $P$.)
::: solution
$P = MV/Y = 2000/400 = 5$.
:::
:::

::: exercise Inflation from money growth {level=1 check="6"}
Money grows at 8 per cent a year, real output at 2 per cent, velocity is constant. What is inflation, in per cent per year? (Enter the percentage, without the per cent sign.)
::: solution
$\pi = \mu - g_Y = 8-2 = 6$ per cent a year.
:::
:::

::: exercise An exact Fisher rate {level=1}
The ex ante real rate is 4 per cent and expected inflation is 3 per cent. Compute the nominal rate from the linear Fisher equation and from the exact formula $1+i=(1+r)(1+\pi^e)$.
::: solution
Linear: $i = 0.04+0.03 = 0.07$, or 7 per cent. Exact: $1+i = 1.04\times 1.03 = 1.0712$, so $i = 7.12$ per cent. The cross-term is $r\pi^e = 0.0012$.
:::
:::

::: exercise Real balances after a monetary expansion {level=2}
In the economy of the first exercise, $M$ doubles to $800$ and $Y$ and $V$ are unchanged. What happens to $P$ and to $M/P$? If instead $Y$ also doubles, what happens to $P$ and to $M/P$?
::: solution
With $Y$ and $V$ fixed, $P$ doubles to $10$ and $M/P$ is unchanged at $80$. If $Y$ also doubles, $P = 800\times 5 / 800 = 5$ is unchanged and $M/P$ doubles to $160$. Neutrality is a statement about $M$ changing *alone*; a simultaneous real expansion is a different experiment.
:::
:::

::: exercise Seigniorage {level=2 check="3"}
Real balances are 12 per cent of GDP, inflation is 33.3 per cent a year, $m$ is constant. Using [[#eq-seign]], seigniorage is what per cent of GDP? (Enter the percentage, without the per cent sign; it is an integer.)
::: solution
$\pi = 1/3$, so $\pi/(1+\pi) = (1/3)/(4/3) = 1/4$. Then $S/Y = 0.25 \times 0.12 = 0.03$, or 3 per cent of GDP.
:::
:::

::: exercise A Cagan money demand {level=2}
Suppose $\ln(m/Y) = -2\pi$ with $\pi$ measured as a decimal (so $\pi=0.10$ is 10 per cent inflation), in continuous time, and seigniorage as a share of GDP is $\pi m/Y$. At what inflation rate is seigniorage maximised? What is the maximum, as a share of GDP?
::: solution
Let $s(\pi) = \pi e^{-2\pi}$. Then $s'(\pi) = e^{-2\pi}(1-2\pi)=0$ at $\pi = 1/2$. Seigniorage is maximised at 50 per cent inflation (continuous time). The maximum is $(1/2) e^{-1} \approx 0.184$, about 18.4 per cent of GDP. (Cagan’s empirical $\eta$ was typically larger, which brings the maximising $\pi$ down; the algebra is the same.)
:::
:::

::: exercise Neutrality and a consumption function {level=3}
In the classical model, $Y=F(\bar K,\bar L)$, $C=C(Y-T)$, $I=I(r)$, and $M/P = kY$ with $k$ constant. Show that a doubling of $M$ leaves $r$, $C$ and $I$ unchanged and doubles $P$. What would have to be true of $k$ for neutrality to fail even with flexible prices?
::: hint
Determine the real equilibrium first, then $P=M/(kY)$. Neutrality fails if $k$ depends on a nominal variable that does not scale with $P$.
:::
::: solution
The goods-market condition $I(r)=Y-C(Y-T)-G$ does not involve $M$ or $P$, so $r$ is unchanged; hence so are $C$ and $I$. Then $P=M/(kY)$ doubles with $M$. If $k$ depended on $i$ (as it does once money demand is $L(Y,i)$), neutrality would still hold, because $i=r+\pi^e$ and a once-and-for-all jump in $M$ does not change $\pi^e$ in a new steady state with the same $\mu$. Neutrality would fail if, for example, some prices were set in leftover nominal units (a sticky-price model), or if a non-indexed tax system made $T$ a function of $P$ (the inflation-tax distortion of the tax code). The quantity equation alone does not force those failures; extra nominal rigidities or extra nominal frictions do.
:::
:::

::: exercise Unpleasant arithmetic {level=3}
A government must finance a real primary deficit of 2 per cent of GDP by seigniorage. Real money demand is $m/Y = 0.20 - 0.5\pi$ for $\pi \le 0.40$ and $0$ thereafter, with $\pi$ a decimal. Using the continuous-time formula $S/Y = \pi m/Y$, find the two inflation rates that finance the deficit, if any, and say which one is on the wrong side of the Laffer curve.
::: hint
Solve $\pi(0.20-0.5\pi)=0.02$ and inspect the quadratic.
:::
::: solution
$\pi(0.20-0.5\pi)=0.02$ becomes $0.5\pi^2 - 0.20\pi + 0.02 = 0$, or $\pi^2 - 0.40\pi + 0.04 = 0$. The discriminant is $0.16 - 0.16 = 0$, so there is a double root at $\pi = 0.20$. The deficit of 2 per cent of GDP is exactly the maximum of the seigniorage curve $s(\pi)=\pi(0.20-0.5\pi)$, which has its peak at $\pi=0.20$ with $s=0.02$. Any larger primary deficit cannot be financed by seigniorage with this money demand; any smaller deficit can be financed at two rates, one below 20 per cent (the “good” equilibrium) and one above (the “bad” one, where $m$ has already shrunk). Sargent and Wallace’s unpleasant arithmetic is the dynamic version of this picture: if the deficit is too large, tighter money today implies even faster money growth later.
:::
:::
