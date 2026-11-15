A bank that offers a demand deposit against illiquid loans is doing something useful: it is insuring households against idiosyncratic liquidity needs. The same contract can be ruinous if everyone demands liquidity at once. Douglas Diamond and Philip Dybvig (1983) made that statement into a model with two equilibria — a good one in which only those who need to consume early withdraw, and a **run** in which everyone withdraws because everyone else is expected to. This chapter develops that model with its assumptions in view, then steps from the model to **contagion**, **shadow banking** and the anatomy of historical crises.

The model is not a narrative of 1931 or of 2008. It is a mechanism: sequential service plus maturity transformation can produce a self-fulfilling run. Historical crises mix that mechanism with insolvency, with panics in markets that are not called banks, and with international transmission. The chapter keeps the mix visible. It does not recommend a deposit, a fund, or a policy.

## Why a run is even possible

From [[money-banking/banking]], a stylised bank holds long, illiquid assets and issues short, liquid deposits. If depositors withdraw in a hurry, the bank must liquidate assets at a discount (or borrow against them in a stressed market). Early withdrawers can be paid in full; late ones cannot. That **sequential service** — first come, first served — is what turns a fear of a queue into a reason to join it.

::: definition Sequential service and a bank run {#def-run}
A deposit contract satisfies **sequential service** if withdrawers are paid in the order they arrive, at a posted rate, until the bank's liquid resources (and the liquidation value of other assets) are exhausted. A **bank run** is an episode in which depositors withdraw because they expect others to withdraw, so that arriving late means being paid less (or nothing), which rationalises the rush. A run can occur against a bank that would have been able to pay every depositor who truly needed to consume early, had the others stayed.
:::

Sequential service is not a minor operational detail. If the bank could suspend convertibility and pay everyone a pro-rata share of the liquidation value, the incentive to be first would vanish. Suspension, deposit insurance, and a lender of last resort are, in this light, devices that replace sequential service with something closer to a sharing rule. They have costs, taken up in [[money-banking/regulation]].

## The Diamond–Dybvig model

The original paper is Diamond and Dybvig, "Bank Runs, Deposit Insurance, and Liquidity", *Journal of Political Economy* 91(3), 1983, pp. 401–419. The version below is a two-depositor, two-period classroom reduction. It is a model. Its conclusions hold under its assumptions.

::: definition Diamond–Dybvig environment {#def-dd}
There are three dates, $t=0,1,2$, and a single consumption good. A continuum (in the original) or, here, **two** ex ante identical agents each have an endowment 1 at $t=0$ and nothing later. Each agent privately learns at $t=1$ whether they are **early** (they value only date-1 consumption) or **late** (they value only date-2 consumption), independently, with probability $\lambda$ of being early. Types are not publicly observable. A **storage** technology moves one unit of the good from $t=0$ to $t=1$ one-for-one, and from $t=1$ to $t=2$ one-for-one. An **illiquid** technology, invested at $t=0$, yields $R>1$ at $t=2$ per unit invested, but only $r < 1$ if it is interrupted at $t=1$. Agents cannot write insurance contracts with each other that condition on type, because type is private. There is no aggregate uncertainty in the baseline: the law of large numbers (or, in the two-agent version, the known probabilities) fixes the share of early types.
:::

Autarky is grim for early types if they invested in the illiquid technology, and grim for late types if they stored. A social planner who could see types would invest $1-\lambda$ in the illiquid technology (per capita) and $\lambda$ in storage, pay early types $c_1$ and late types $c_2$ with $\lambda c_1 + (1-\lambda)c_2/R = 1$ in resource terms, choosing $(c_1,c_2)$ to share liquidity risk. Typically the optimum has $1 < c_1 < c_2 < R$: early types get some of the long-run return, late types insure them.

A **demand-deposit contract** tries to implement that insurance without observing types. The bank takes the endowments at $t=0$, invests, and promises $c_1$ to anyone who withdraws at $t=1$, on a sequential-service basis, and $c_2$ to those who wait, if the bank still has assets. Late types will wait if they expect other late types to wait, because $c_2 > c_1$. They will withdraw at $t=1$ if they expect a run, because sequential service then pays $c_1$ to those at the front and little to those at the back.

::: proposition Two equilibria of the deposit contract {#prop-dd}
In the two-agent Diamond–Dybvig environment of [[#def-dd]], with a demand-deposit contract that pays $c_1 \in (1,R)$ to the first withdrawer at $t=1$ and the residual (after liquidation if needed) to anyone who waits or arrives second, there are two symmetric pure-strategy Nash equilibria of the date-1 withdrawal game among late types, provided $c_1$ is large enough that a single late withdrawer, when the other late type also withdraws, is worse off waiting:

1. **No run.** Late types wait. Early types withdraw. The bank liquidates only what it must for the early types, and late types receive $c_2 > c_1$.
2. **Run.** Late types withdraw at $t=1$. The bank liquidates the long technology. Sequential service pays $c_1$ until resources run out; the expected payoff to a late type who waits is then less than $c_1$ (often zero in the two-agent liquidation).

The run equilibrium is worse for late types (and no better for early types) than the no-run equilibrium. It is nonetheless an equilibrium: given that the other late type runs, running is a best response.
:::

::: proof
Label the two agents $i$ and $j$, and condition on both being late (the interesting information set; if an agent is early they withdraw in any case). Payoffs:

- If both wait, the long technology pays $R$ at $t=2$, split according to the contract, and each gets $c_2 > c_1$ by construction of the insurance contract.
- If $i$ waits and $j$ withdraws, the bank must pay $c_1$ to $j$ at $t=1$, which requires liquidating $c_1/r$ of the long technology if storage is insufficient. The residual at $t=2$ is $R\bigl(2 - c_1/r\bigr)$ in the two-unit economy if everything was in the long technology and $r$ is the liquidation return; for $c_1 > r$ this residual can be small. In the original continuum model it is zero for those who wait in a run, because the queue exhausts the assets at $t=1$.
- If both withdraw, sequential service randomises (or orders) who is first. Each has a chance of receiving $c_1$ and a chance of receiving the leftover, whose value is $2r - c_1$ if one $c_1$ is paid and the rest is liquidated, which is less than $c_1$ when $c_1 > r$.

Waiting is then a best response to waiting, and withdrawing is a best response to withdrawing, once $c_1$ is set in the usual Diamond–Dybvig region $c_1 > 1 \ge r$. Those are the two equilibria. The argument uses: private types, sequential service, costly liquidation ($r<1<R$), and a contract that insures early types ($c_1 > 1$). Drop sequential service in favour of a pro-rata halt, and the run equilibrium disappears.
:::

The model has no aggregate shock. The run is a coordination failure, not a revelation of bad assets. That is the feature that made the paper famous, and it is the feature that is most often misread. Real crises usually mix coordination with deteriorating assets: a run can be self-fulfilling *and* fundamental. Subsequent theory (Allen and Gale, Goldstein and Pauzner, Rochet and Vives) puts a noisy signal of fundamentals into the game so that the run becomes a unique equilibrium in some region of bad news and no-run in a region of good news — a global-game refinement. The classroom model does not take that step, and it should not be sold as if it had.

::: example Autarky versus a planner {#ex-dd-autarky}
Keep $R = 1.5$, $r = 0.8$, $\lambda = 1/2$. An autarkic early type who put everything in the long technology gets 0.8 at date 1; a late type who stored gets 1 at date 2. A planner who sees types invests half the endowment in storage and half in the long technology, and sets $c_1 = 1$, $c_2 = 1.5$. Check resource feasibility and compare with autarky.
::: solution
Per two agents, expected one early and one late. Storage of 1 pays the early type $c_1 = 1$; the long unit pays the late type $c_2 = 1.5$. Resource identity: $\lambda c_1 = 0.5 \times 1$ from storage, $(1-\lambda)c_2/R = 0.5 \times 1.5/1.5 = 0.5$ from the long technology, summing to 1 of endowment per capita. Early types are better than autarky liquidation (1 versus 0.8); late types who would have stored are better (1.5 versus 1); late types who would have invested long get the same 1.5. The contract $c_1=1$ is not sequential-service insurance above autarky storage, so it does not, by itself, create a run incentive relative to storage — which is why the interesting Diamond–Dybvig contract pushes $c_1$ *above* 1, sharing some of $R$ with the early types.
:::
:::

::: example A two-depositor run {#ex-dd-numbers}
Two depositors, one unit each. $R = 1.5$, $r = 0.8$, $\lambda = 1/2$. The bank promises $c_1 = 1.1$ to a date-1 withdrawer. Suppose, as a worst-case liquidation, both depositors invest through the bank in the long technology. (a) If one is early and one is late and the late depositor waits, what does each get? (b) If both withdraw at date 1, and sequential service pays 1.1 to the first in line, what is left for the second?
::: solution
(a) The bank needs 1.1 at date 1 and has no storage, so it liquidates $1.1/0.8 = 1.375$ of the long technology. Remaining long investment: $2-1.375=0.625$, which yields $0.625\times 1.5 = 0.9375$ at date 2. The early type gets 1.1; the late type gets 0.9375, which is *less* than $c_1$. This particular $(c_1, r, R)$ does not implement first-best insurance (the late type is worse than autarky storage of 1). It still illustrates sequential service. (A contract with some storage, or a lower $c_1$, can improve the late type's payoff; the original paper chooses $c_1$ from a planner's problem.) (b) Liquidating both units at date 1 yields $1.6$. First in line takes 1.1; second gets $0.5$. The second is worse off than in autarky (0.8 if they had invested long and liquidated themselves, or 1 if they had stored). The rush to be first is rational if the other is rushing.
:::
:::

::: warning Diamond–Dybvig is a model, not a documentary
The two-equilibrium result uses sequential service, private liquidity types, an illiquid long technology, and a demand-deposit contract. It does not use bad loans, fraud, a housing bust, or a particular year. Applying it to 1907, 1933, 1997 or 2008 requires an extra argument that those episodes involved a runnable claim and a liquidation discount. Many did. Many also involved insolvency that the baseline model shuts down by assumption. Saying "it was Diamond–Dybvig" of a crisis is a hypothesis, not a translation.
:::

::: widget markov
matrix: 0.92,0.08; 0.15,0.85
states: Patient; Run
start: 0
steps: 25
caption: A toy two-state chain for "patient" versus "run" in a fictional banking system. The run state is persistent but not absorbing: with probability 0.15 the system returns to patient. This is *not* Diamond–Dybvig (which is a static coordination game) and not a fitted crisis process. It is a picture of persistence: once a run language takes hold, it can last.
:::

::: quiz
In the Diamond–Dybvig model, a run equilibrium exists because
- [ ] the bank has made bad loans, so it is insolvent
- [x] sequential service makes it privately optimal to withdraw if others withdraw, even if the bank would have been sound in the no-run equilibrium
- [ ] deposit insurance causes moral hazard, which causes a run
- [ ] the long technology has $R<1$
::: solution
The mechanism is sequential service plus costly liquidation, which makes "withdraw if others withdraw" a best response. The baseline model has sound long assets ($R>1$). Deposit insurance is a *solution* the paper studies, not the cause of the run. Bad loans are a different (complementary) story.
:::
:::

## Contagion, wholesale runs and shadow banking

A run need not start at a household's current account. **Wholesale runs** are withdrawals by funds, other banks, and corporate treasurers of uninsured, unsecured, or imperfectly collateralised short-term claims: commercial paper, repo, interbank deposits. Northern Rock (2007) had a retail queue, but its fatal run was in wholesale markets. Lehman Brothers (2008) was not a commercial bank; its runnable claims were short-term wholesale and prime-brokerage balances. The Diamond–Dybvig logic — a short claim, a longer asset, sequential or first-mover disadvantage — does not require a high-street branch.

::: example Interbank contagion on a tiny network {#ex-contagion-tiny}
Bank A owes 10 to Bank B; Bank B owes 10 to Bank C; there are no other interbank claims. A's retail depositors run and A fails, recovering 40 per cent on its interbank payable. What does B lose, and can that loss, if B's equity is 5, knock B into insolvency even if B's other assets are sound?
::: solution
B's claim of 10 on A recovers 4, a loss of 6. Equity of 5 is wiped out; B is insolvent on this hit alone. C then has a claim on an insolvent B. Whether C is damaged depends on B's recovery in resolution. The chain A→B→C is the simplest contagion network: a loss that would have been containable in a larger-equity B is not. The example has no fire sale and no information channel; it is only the exposure channel.
:::
:::

**Contagion** is the spread of a run from one name to another. Channels include: (i) common asset holdings, so that a fire sale at A lowers the mark of B's book; (ii) interbank exposures, so that A's default is B's credit loss; (iii) information, so that A's trouble is a signal about a common shock; (iv) liquidity, so that A's drawing on a credit line or selling an asset tightens B's funding. Network pictures of interbank exposures (upper-triangular matrices of who lent to whom) make (ii) precise; they are only one channel.

**Shadow banking** is a moving label for maturity transformation and runnable claims outside the regulated commercial-bank perimeter: structured investment vehicles, some money-market funds, some broker-dealer matched books, some special-purpose vehicles. Gorton and Metrick, among others, described 2007–09 as a run on repo and on asset-backed commercial paper — a run on the shadow system. The label is not a moral judgement; it is a perimeter. When a claim is short, information-insensitive in good times, and backed by a longer or riskier asset, the Diamond–Dybvig mechanism is a candidate, whatever the letterhead.

::: example A wholesale queue {#ex-wholesale}
A fictional dealer funds 100 of long securities with 80 of overnight repo and 20 of equity. Haircuts on the repo are 0 today. If haircuts jump to 20 per cent, how much cash must the dealer raise overnight to roll the book, and what if the securities' price has also fallen 10 per cent?
::: solution
With haircuts of 20 per cent, 80 of securities support only $0.8\times 80 = 64$ of repo against the same 80 of collateral, or, equivalently, to fund 100 of securities the dealer can borrow only 80. Overnight the dealer must replace 20 of funding with cash it does not have — a fire sale of about 20 of securities, more if sales move the price. If the securities have already fallen 10 per cent, assets are 90, repo counterparties who still offer a 0 per cent haircut would lend 90, which still covers 80 of repo; but with a 20 per cent haircut they lend $0.8\times 90 = 72$, so the dealer must find $80-72=8$ plus the 10 of asset loss already in equity. Equity of 20 becomes 10 from the price fall, then is eaten further by fire-sale discounts. A haircut run is a run without a retail queue.
:::
:::

## Anatomy of crises: a few dated episodes

No two crises are the same, and the professional literature on 1929–33 and on 2008 remains contested. A short, sourced list is a map, not a verdict.

- **1907, United States.** A panic centred on New York trust companies, which were less regulated than national banks, ended with a private-liquidity operation organised by J. P. Morgan. The episode was an argument for a central bank, and the Federal Reserve Act followed in 1913.
- **1930–33, United States.** Waves of bank failures, a collapse of the deposit stock, and deflation. Friedman and Schwartz (1963) emphasised the monetary contraction and the absence of sufficient last-resort lending; a later literature has emphasised bank insolvency from agricultural and industrial debt, the gold standard, and international transmission. The Banking Act of 1933 created federal deposit insurance.
- **1997–98, East Asia.** Thailand, Indonesia, Korea and others saw currency and banking crises together: short-term foreign-currency borrowing, exchange-rate pegs that broke, and runs on banks and on the currency. Corsetti, Pesenti and Roubini, and a large IMF-programme literature, disagree on the weight of fundamentals versus panic. Both were present.
- **1998, Russia and LTCM.** A sovereign default and a hedge-fund failure, with contagion through market liquidity rather than through a retail run.
- **2007–09, North Atlantic.** US housing, securitisation, a run on shadow-banking vehicles, Lehman Brothers in September 2008, and a collapse of trade and of industrial output in late 2008–09. Competing accounts emphasise lax regulation, global imbalances, too-low policy rates, and runnable short-term debt (Gorton 2012 is in the course references). They are not mutually exclusive.
- **2010–12, euro area.** Sovereign and banking stress in Greece, Ireland, Portugal, Spain and Italy, with a bank–sovereign loop (banks hold home-sovereign debt; a sovereign's distress hits the banks; the banks' distress hits the sovereign). The ECB's later backstops changed the run incentive.
- **2023, Silicon Valley Bank and others.** A duration-gap loss on securities ([[money-banking/banking]]) plus a very fast run of uninsured deposits, including via digital channels. The mechanism was textbook; the speed was new.

::: history
**June 1983, Diamond and Dybvig.** The *Journal of Political Economy* paper showed that a demand-deposit contract which provides useful liquidity insurance can have a bank run as a second Nash equilibrium, and that deposit insurance can eliminate the run equilibrium. The paper is a theory of a contract, not a history of a country. It is the reference for almost every later run model.
:::

## Evidence

Runs leave a statistical trace: deposit outflows, haircut increases, commercial-paper quantities, and, in older crises, the number of suspensions. Calomiris and Gorton's historical work on US panics before deposit insurance, and Schnabel's work on Germany in the early 1930s, document clustering of failures beyond what independent insolvency would produce — evidence of contagion or of a common shock, which those papers try to separate. Iyer and Puri (2012), using a run on an Indian cooperative bank, show that social networks and uninsured status predict who queues, a micro illustration of sequential service.

Cross-country crisis catalogues (Reinhart and Rogoff's *This Time Is Different*, 2009; Laeven and Valencia's IMF crisis database, updates through the 2010s) find that banking crises are associated with deep and lasting output losses relative to trend, larger on average than those associated with stock-market crashes that do not take the banking system with them. That is a correlation with a plausible mechanism (credit and payment disruption). It is not a forecast of the next one.

## Where this leads

If runs are an equilibrium of a useful contract, the public response is to change the contract or the payoffs: deposit insurance, a lender of last resort, capital and liquidity rules, resolution regimes ([[money-banking/regulation]]). Central banks are the institutions that can lend the settlement asset in a panic ([[money-banking/central-banking]], [[money-banking/monetary-policy-implementation]]). Macro courses treat the output costs ([[business-cycles]]). The Diamond–Dybvig assumptions should travel with the Diamond–Dybvig conclusion whenever it is invoked.

::: summary
- Sequential service on a demand deposit against illiquid assets creates a first-mover advantage. That is the seed of a run.
- Diamond–Dybvig (1983) is a model: private liquidity types, an illiquid long technology, a deposit contract, no aggregate shock in the baseline. It has a no-run equilibrium and a run equilibrium.
- The run is a coordination failure among late types. Real crises usually mix coordination with bad assets; saying which dominates is an empirical claim.
- Wholesale funding and shadow-banking claims can be as runnable as retail deposits. A haircut increase is a run by another name.
- Contagion travels through fire sales, exposures, information and liquidity. Historical episodes (1907, 1930s, 1997, 2008, 2023) instantiate different mixes.
:::

## Exercises

::: exercise Sequential service {level=1}
A bank has 100 of assets that fetch 70 in a fire sale. Deposits are 100, sequential service, promised par. How many deposits get par if a run liquidates everything today, and what does the remainder get?
::: solution
70 of deposits are paid in full; 30 get nothing. (If partial payment on the last depositor in the 70 is allowed, 70 at par and 30 at 0 is the same total.) The first 70 have a reason to queue; the last 30 are why the queue exists.
:::
:::

::: exercise Autarky {level=1}
In [[#def-dd]], an early type who invested autarkically in the long technology gets $r$ at date 1. A late type who stored gets 1 at date 2. Why does a bank that offers $c_1 > r$ and $c_2 > 1$ look attractive *ex ante*, before types are known?
::: solution
With probability $\lambda$ the agent is early and prefers $c_1$ to $r$; with probability $1-\lambda$ they are late and prefer $c_2$ to 1 (or to $R$ if they would have invested long — the contract also shares the long return). Expected utility is higher if the insurance is well priced. That is why a run-prone contract can still be offered: it is useful when the good equilibrium is played.
:::
:::

::: exercise Two equilibria {level=1}
Why is "everyone waits" (among late types) an equilibrium in Diamond–Dybvig, and why is "everyone runs" also an equilibrium? One sentence each.
::: solution
If others wait, a late type gets $c_2 > c_1$ by waiting, so waiting is best. If others run, sequential service plus liquidation makes waiting pay less than $c_1$, so running is best.
:::
:::

::: exercise Liquidation arithmetic {level=2 check="0.5"}
Two units in the long technology, $r = 0.8$, $c_1 = 1.1$. Both withdraw. Sequential service pays 1.1 to the first. What does the second get? (Enter the second's payoff.)
::: solution
Fire-sale value $1.6$. Remainder $1.6-1.1=0.5$.
:::
:::

::: exercise Haircut run {level=2}
A dealer has 200 of securities funded by 180 of repo (10 per cent haircut) and 20 of equity. Haircuts jump to 25 per cent and security prices are unchanged. How much extra cash is needed to roll the repo against the same 200 of collateral?
::: solution
New borrowing capacity $0.75 \times 200 = 150$. Existing repo 180. Gap $30$. The dealer must post 30 of cash or sell securities. Equity of 20 cannot cover 30 without a sale.
:::
:::

::: exercise Pro-rata versus sequential {level=2}
Show, in the two-depositor liquidation of [[#ex-dd-numbers]] part (b), that a pro-rata halt (split the 1.6 equally, pay at date 1) removes the strict incentive to be first. What incentive, if any, remains for a late type to withdraw?
::: solution
Pro-rata pays 0.8 each. Being first no longer pays 1.1. A late type who *can* wait for $R$ would still rather wait if the other waits (the no-run equilibrium). If the other withdraws and the bank pro-rata liquidates everything, both get 0.8 at date 1, which for a late type is worse than waiting in the no-run world but is not improved by "being first". The run equilibrium *as a rush to the queue* disappears; a remaining question is whether the bank is forced to liquidate at all. Suspension of convertibility is the institutional name of a pro-rata halt.
:::
:::

::: exercise Coordination and fundamentals {level=3}
Modify Diamond–Dybvig by letting $R$ be random, observed noisily by depositors at date 1. In a region of very high $R$, waiting is dominant; in a region of very low $R$, running is dominant; in an intermediate region the baseline two equilibria survive. Explain how a global-game (noisy-signal) refinement can pick a unique threshold in that intermediate region, and what that does to the statement "runs are sunspots".
::: hint
Each depositor's signal of $R$ is a noisy observation; they infer others' signals and play a cutoff strategy.
:::
::: solution
When $R$ is so high that even a late type who expects everyone else to run still prefers to wait (liquidation is not that costly, or $c_2$ is huge), waiting is dominant. When $R$ is so low that the bank is insolvent even without a run, running is dominant. In between, both equilibria exist under common knowledge. A global game gives each depositor a slightly different signal of $R$. A depositor with a middling signal is no longer sure what others will do, and can compute a unique best response if others use a cutoff (run iff signal $<$ some $x^*$). The cutoff is pinned down by indifference at $x^*$, and uniqueness follows under standard noise assumptions (Carlsson and van Damme; Morris and Shin; Goldstein and Pauzner 2005 in a Diamond–Dybvig setting). Runs then occur when fundamentals are bad *enough*, not as pure sunspots, but they still occur at fundamentals that would have been consistent with no run under patient coordination. Policy that changes payoffs (insurance, last-resort lending) shifts the threshold.
:::
:::

::: exercise Shadow perimeter {level=3}
A money-market fund offers claims that are withdrawable on demand at a one-unit net asset value, and holds commercial paper that trades in a thin market. Map the Diamond–Dybvig ingredients onto this fund. Which ingredient did US "breaking the buck" rules and gates after 2008 try to change?
::: hint
Identify the deposit, the long asset, sequential service, and $c_1$.
:::
::: solution
The demand claim at a stable NAV is the deposit; $c_1 = 1$. The commercial paper is the illiquid (or at least not perfectly liquid) long asset. First-come redemption at a stale NAV is sequential service: early redeemers get 1 while the remaining holders absorb the loss if paper is marked down later. A run is then the same best-response logic. Post-2008 money-market reform in the United States imposed floating NAVs on some funds, liquidity fees and redemption gates — all ways of replacing a sequential par claim with something closer to pro-rata pricing or a halt. They change $c_1$ or sequential service, the ingredients [[#prop-dd]] identified. They do not make commercial paper liquid.
:::
:::
