A household with a surplus and a firm with a project could, in principle, meet in a market and write a loan. Most of them do not. They meet a **financial intermediary**: a bank, a credit union, an insurance company, a pension fund, a mutual fund, a finance company. This chapter asks why. The answers are transaction costs and **asymmetric information** — one side of a deal knows something the other does not — which take the two textbook forms of **adverse selection** (hidden type, before the contract) and **moral hazard** (hidden action, after the contract).

The previous chapters priced claims as if the cash flows were given ([[money-banking/interest-rates]], [[money-banking/term-structure]]). Here the cash flows are the problem: the borrower knows more about the project's risk than the lender does, and the borrower can take actions that the lender cannot costlessly watch. Intermediaries exist, on this view, because they lower the cost of producing the missing information and of writing, monitoring and enforcing the contract. The chapter is positive: it describes a market failure and a private response. It is not advice about where to place funds.

## Direct and indirect finance

**Direct finance** is a claim issued by the borrower and held by the saver: a corporate bond in a household's account, a share, a government bill. **Indirect finance** is a claim on an intermediary, matched on the intermediary's other side by a claim on the borrower: a deposit that funds a loan, an insurance policy that funds a bond portfolio, a pension claim that funds a mix of securities. The economy uses both. In most countries, including middle-income ones, a large share of household assets is claims on intermediaries rather than claims on non-financial issuers. The BIS credit-to-non-financial-sector statistics record the *stock* of credit; they do not, by themselves, split it into bank and market, but national flow-of-funds accounts do. Bank credit dominates in much of Europe, Japan, China and the lower-income world; market credit is larger, relative to banks, in the United States. That is a description of structures, not a ranking.

::: definition Financial intermediary {#def-intermediary}
A **financial intermediary** is an institution that borrows from one set of agents with one contract and lends to (or buys the claims of) another set with a different contract, holding both sides on its own balance sheet. It transforms **size** (many small deposits, fewer large loans), **maturity** (short liabilities, longer assets), **risk** (diversified assets, a promised or targeted return on liabilities) and **liquidity** (liquid claims issued against less liquid assets). A broker who merely matches two sides, without putting the claims on the book, is not an intermediary in this balance-sheet sense.
:::

Transformation is the product. A deposit is small, short and (with insurance) safe; a business loan is large, longer and risky. The intermediary's equity is the buffer that makes that transformation possible, and it is the subject of [[money-banking/banking]] and [[money-banking/regulation]]. Mutual funds transform size and diversification but typically not credit risk in the same way: the holder of a fund share bears the asset risk. Insurance companies transform risk across states of the world. The variety is the point: "the intermediary" is a family, not a single contract.

Transaction costs alone would already produce intermediaries. Screening a borrower, writing a contract, collecting payments and enforcing in default have a large fixed-cost component. A specialist who does this many times amortises the cost. A household making one loan a decade does not. Economies of scale in record-keeping and in running a payment system (the inside money of [[money-banking/money-and-payments]]) push in the same direction. Information problems, next, are why the specialist is not just a cheaper clerk but a different kind of contract.

## Adverse selection in credit: lemons

George Akerlof's 1970 market for lemons was about used cars. The same logic applies to borrowers.

::: definition Adverse selection {#def-adverse}
**Adverse selection** is a hidden-*type* problem: one party to a potential contract has private information about a payoff-relevant characteristic that is fixed (for the purpose of the model) before the contract is signed. In a credit market the characteristic is the borrower's quality — the distribution of project returns. If the lender cannot tell types apart and must post a single rate, higher rates can drive safer borrowers out and leave a worse pool, which can justify still higher rates, or no trade.
:::

::: proposition A lemons credit market {#prop-lemons}
There are two types of fictional borrower, good and bad, in equal numbers. Each wants a loan of 1 to run a project. Good projects repay $R_G$ with certainty; bad projects repay $R_B$ with probability $p$ and 0 otherwise, with $p R_B < R_G$ and $p R_B < 1+r$, where $r$ is the lender's opportunity cost. Borrowers know their type; lenders know only the proportions. Limited liability: the borrower pays $\min(\text{promised}, \text{project payoff})$. Then there is no pooling interest rate at which lenders break even and both types borrow, if the average project has negative net present value at $r$. If the average has positive NPV but the bad type is worse, a pooling rate that prices the average may still be unattractive to the good type, so only bad types apply — and the market can unravel to no trade.
:::

::: proof
A sketch. A pooling promised gross rate $R$ is paid in full by good types and paid with probability $p$ by bad types. The lender's expected receipt per loan, if both types apply, is $\tfrac12 R + \tfrac12 p R = R(1+p)/2$. Break-even requires $R(1+p)/2 \ge 1+r$, so $R \ge 2(1+r)/(1+p)$. The good type's surplus is $R_G - R$, which is negative if $R_G < 2(1+r)/(1+p)$. In that region good types drop out, the pool is only bad types, and break-even requires $p R \ge 1+r$. If also $p R_B < 1+r$, no such $R \le R_B$ exists, and the market closes. The assumptions are the two types, equal weights, limited liability, a single posted rate, and no other screening. Relax any of them and trade may return — which is what intermediaries do.
:::

The proposition is a model, not a photograph of a banking market. Its punchline is the one Akerlof emphasised: asymmetric information does not merely widen a spread; it can destroy the market for good types. Collateral, net worth, relationship history, audited accounts and the intermediary's screening technology are all ways of splitting the pool. Stiglitz and Weiss (1981) showed a related result: a lender who cannot observe type may prefer to ration credit at a lower rate rather than raise the rate and worsen the pool. Rationing, in that model, is an equilibrium, not a disequilibrium shortage.

::: example Akerlof numbers on a loan of 1 {#ex-akerlof-tiny}
Two types, equal numbers. Good projects repay 1.20 for sure; bad projects repay 1.60 with probability $1/2$. Lenders need 1.10 in expectation. Limited liability. Compute the pooling break-even promised repayment if both types apply, and say whether good types apply.
::: solution
Pooling expected receipt $0.5 R + 0.5 \times 0.5 R = 0.75 R$. Set $0.75 R = 1.10$, so $R = 1.10/0.75 \approx 1.467$. Good types then repay 1.467 from a project that yields 1.20, a loss, and refuse. The pool collapses to bad types, whose expected repayment is at most $0.5 \times 1.60 = 0.80 < 1.10$. No trade.
:::
:::

::: widget plot
f: 12-0.8*x; 2+0.4*x; 8-0.3*x
x: 0, 16
y: 0, 14
labels: \text{demand for loans}; \text{supply if quality fixed}; \text{supply if quality worsens with the rate}
caption: An illustrative credit-market diagram. Quantity of loans is on the horizontal axis, the loan rate on the vertical (inverse demand and supply). The third curve bends back: at high rates the pool is worse, so lenders offer *less* at a higher rate. A rationing outcome can sit off the notional demand curve. Invented lines, not a fitted market.
:::

::: example Two types, one rate {#ex-lemons-numbers}
Good and bad firms, equally many, each want a loan of 100. The safe rate is 5 per cent, so lenders need 105 in expectation. Good firms repay 120 for sure. Bad firms repay 140 with probability $1/2$ and 0 otherwise. Limited liability. (a) If types were observable, what rate would each type be offered, and would both projects run? (b) If types are pooled, what break-even promised repayment $R$ do lenders need, and do good firms accept it?
::: solution
(a) Good: promised repayment 105, surplus $120-105=15>0$, the project runs. Bad: expected repayment $0.5 R$; break-even $0.5 R = 105$ so $R = 210$, but the firm can pay at most 140, so the loan is not made. Observable types fund the good project and reject the bad. (b) Pool: expected receipt $0.5 R + 0.5 \times 0.5 R = 0.75 R$ if both apply. Set $0.75 R = 105$, $R = 140$. Good firms then get $120-140<0$ and refuse. Only bad firms apply, expected receipt $0.5 \times 140 = 70 < 105$, so lenders refuse too. The pooling market unravels. The good project, which would have run under observable types, is not funded.
:::
:::

## Moral hazard and costly monitoring

Once the loan is made, the borrower chooses an action: effort, risk, diversion of funds. If the action is not contractible, **moral hazard** appears.

::: definition Moral hazard {#def-moral}
**Moral hazard** is a hidden-*action* problem: after the contract is signed, one party chooses an effort or a risk that the other cannot costlessly observe or enforce, and that party does not bear the full consequence of the choice. In lending, limited liability plus a promised repayment tilts the borrower toward riskier projects (the lender bears the downside; the borrower keeps the upside).
:::

A firm with equity of 10 and a loan of 90, choosing between a safe project that returns 100 for sure and a risky project that returns 200 or 0 with equal probability, will prefer the gamble if it maximises equity's option-like payoff, even if the gamble has a lower expected total return. Covenants, collateral, short maturity, and the lender's right to inspect are contractual answers. They are costly. An intermediary that specialises in **delegated monitoring** (Diamond 1984) can inspect on behalf of many small savers, avoiding the duplication of monitoring and the free-rider problem that would arise if each depositor tried to inspect. Diversification across independent loans makes the intermediary's own promise to depositors credible: the law of large numbers turns a pile of risky loans into a comparatively stable claim, backed by equity for the residual risk.

Holmström and Tirole (1997) put the same idea in terms of **skin in the game**: a borrower (or an intermediary) with more to lose behaves better, so net worth is not just a buffer but an incentive. Capital requirements in [[money-banking/regulation]] will lean on that logic, and so will the moral-hazard critique of deposit insurance.

::: example Risk-shifting with limited liability {#ex-risk-shift}
A fictional firm has 20 of its own funds and borrows 80 at a promised repayment of 88. It can choose project S, which returns 110 for sure, or project R, which returns 200 with probability $1/2$ and 0 otherwise. Which project maximises the firm's expected payoff? Which maximises total expected value? The safe rate outside is 5 per cent; take that as the opportunity cost of the 100 invested.
::: solution
Total expected value: S returns 110, NPV $110-100=10$. R returns 100 in expectation, NPV $0$. Social (total-value) ranking: S. The firm's payoff: under S, $110-88=22$. Under R, $\tfrac12(200-88) + \tfrac12 \cdot 0 = 56$. The firm chooses R. Expected payoff to the lender: under S, 88; under R, $\tfrac12 \cdot 88 = 44$. The firm's private gain of $56-22=34$ is more than offset by the lender's loss of $88-44=44$. Limited liability plus a fixed promised repayment creates a wedge. Covenants that forbid R, or equity that replaces some of the 80, shrink the wedge.
:::
:::

::: intuition Why the middleman can be the product
Savers do not want to screen, write covenants and sit in bankruptcy court. Borrowers do not want to explain themselves to a thousand households. The intermediary's balance sheet is a technology for producing a small number of monitored, covenanted loans on one side and a large number of simple, liquid claims on the other. When that technology fails — a run, a capital shortfall, a fraud — the matching problem of the first chapter returns, this time in the credit market.
:::

## Skin in the game, collateral and rationing

Three further instruments appear in almost every credit market.

**Collateral** is an asset the lender can seize in default. It has two roles: it raises recovery (a risk-structure effect from the previous chapter) and it deters bad types and bad actions (an incentive effect). A borrower who pledges an asset they value highly is less likely to be a lemon and less likely to risk-shift. Collateral is scarce, which is why credit still depends on net worth.

**Net worth** (inside equity) is the borrower's own stake. In [[#ex-risk-shift]], replacing 20 of the loan with extra equity would change the firm's ranking of S and R. Recessions that destroy net worth therefore destroy capacity to borrow even if *projects* are unchanged — the financial accelerator of Bernanke and Gertler, taken up in [[business-cycles]].

**Rationing**, in the Stiglitz–Weiss sense, is a posted rate at which some observationally identical borrowers receive a loan and others do not, and raising the rate would not help the lender. It is not a usury ceiling and it is not a temporary shortage. The empirical literature on whether commercial-bank credit is rationed in this strict sense is mixed; the theoretical point is that price does not always clear a market with hidden types.

::: application Relationship lending
A bank that has seen a firm's deposit account, payroll and past loans has a signal of type that an arm's-length bond buyer does not. That is **relationship lending**, important for small firms in most countries and for household credit. The cost is hold-up: the informed bank has an information monopoly, and switching is hard. Bond markets, by contrast, work well for large, well-audited issuers — which is one reason the US mix of bank and market finance looks different from the mix in economies where few firms have a public track record.
:::

::: example Collateral as a sorting device {#ex-collateral-sort}
In [[#ex-lemons-numbers]], suppose good firms have collateral worth 40 to them and 40 to the lender, and bad firms have none. Lenders offer two contracts: an unsecured loan with a high promised repayment, and a secured loan with a lower one. Explain, without computing a full menu, why good firms may prefer to post the collateral even if they do not expect to default.
::: solution
Posting collateral is cheap for a good firm (they do not expect to lose it) and expensive, or impossible, for a bad firm. A lower promised repayment on the secured contract can then be priced off the good type alone, as in the observable-types branch of [[#ex-lemons-numbers]] (repayment 105 on a loan of 100). The unsecured contract, if offered, would have to be priced for the bad type and would not be taken by the good type. Collateral here is a *signal* and a recovery device at once. The argument needs the collateral to be scarce for bad types; if everyone had 40 of pledgeable wealth, the sorting would vanish and the pooling problem would return at the level of the collateralised market.
:::
:::

::: history
**1970, George Akerlof.** "The Market for 'Lemons'" in the *Quarterly Journal of Economics* showed that hidden quality can destroy a market, using used cars. The same logic is the adverse-selection half of this chapter; Akerlof, Spence and Stiglitz shared the 2001 Nobel prize for the broader programme. Diamond's 1984 delegated-monitoring paper, and Holmström and Tirole (1997) on skin in the game, are the moral-hazard half's standard references.
:::

::: quiz
Adverse selection in a credit market is best described as
- [ ] the borrower working less hard after the loan is made
- [x] safer borrowers dropping out when the lender raises a pooling rate
- [ ] the lender failing to diversify
- [ ] a usury ceiling
::: solution
Safer types dropping out as the pooling rate rises is the hidden-type (adverse-selection) mechanism. Working less hard after the loan is moral hazard. Diversification and usury are different problems.
:::
:::

## Evidence

Direct tests of lemons in credit use settings where quality is later observed: loan performance by origination channel, the effect of requiring collateral, and the performance of securitised versus retained loans. Keys, Mukherjee, Seru and Vig (2010) documented that US mortgage originations just above a securitisation-friendly credit-score cutoff were more likely to default than those just below, a discontinuity consistent with weaker screening when the loan was expected to leave the originator's book — a moral-hazard (and adverse-selection) fact about the 2000s housing market, not a verdict on securitisation as such.

Credit-registry studies in Europe and Latin America (a large literature associated with, among others, the Banco de Portugal, the Banco de España, and Chile's Superintendencia) find that firms with longer bank relationships pay lower spreads and post less collateral, consistent with information being produced over time. Banerjee and Duflo's work on directed lending in India, and a parallel literature on African and East Asian credit-guarantee schemes, shows that public interventions in credit markets have to confront the same hidden-type problems: a guarantee that does not keep skin in the game can shift the pool toward worse risks.

The BIS "credit to the non-financial sector" data put the *scale* of the claims in view. Private non-financial credit is a multiple of GDP in high-income countries and in China, and a much smaller ratio in many lower-income countries (BIS credit statistics, tables by country; the ratio for China has been in the region of 200 per cent of GDP in recent years, for Argentina a small fraction of that — different financial depths, not a league table). Thin credit can mean tight information constraints as well as a lack of saving.

## Where this leads

Banks are the intermediaries that issue the economy's inside money, and their balance sheets, risks and capital are the next chapter ([[money-banking/banking]]). Because their liabilities are runnable, the useful contract of this chapter is also a fragile one ([[money-banking/bank-runs-and-crises]]). Regulation tries to protect the transformation without destroying the incentive to screen ([[money-banking/regulation]]). Information economics treats adverse selection and moral hazard as general tools, of which credit is one application ([[information-economics]]). Nothing in those later chapters replaces the two definitions of this one: hidden type before the contract, hidden action after it.

::: summary
- Direct finance is a claim on the borrower held by the saver; indirect finance puts an intermediary's balance sheet in between.
- Intermediaries transform size, maturity, risk and liquidity. They exist because those transformations, and the information they require, have large fixed costs.
- Adverse selection is hidden type. A pooling loan rate can drive good borrowers out and close the market (a lemons credit market).
- Moral hazard is hidden action. Limited liability plus a fixed repayment encourages risk-shifting; monitoring, covenants, collateral and equity are the responses.
- Delegated monitoring and diversification are why a bank can issue a simple claim to many savers against a portfolio of messy loans.
- Credit rationing, collateral and relationship lending are equilibrium responses to information problems, not necessarily signs of a rate that is "wrong".
:::

## Exercises

::: exercise Classify the institution {level=1}
Which of the following are financial intermediaries in the balance-sheet sense of [[#def-intermediary]]? (a) a commercial bank; (b) a stock exchange; (c) a life insurer; (d) a broker that matches buyers and sellers of existing bonds; (e) a finance company that funds car loans by issuing notes.
::: solution
(a) Yes. (b) No: a market, not a balance-sheet transformer. (c) Yes: premia in, claims and securities out. (d) No: a broker. (e) Yes: notes (liabilities) fund car loans (assets).
:::
:::

::: exercise Hidden type or hidden action {level=1}
Label each as adverse selection or moral hazard: (a) a borrower who has received a loan switches to a riskier project; (b) at a high pooling rate, only the worst firms apply; (c) an insured depositor does not watch the bank; (d) a used-car seller knows the car is a lemon.
::: solution
(a) Moral hazard (hidden action after the contract). (b) Adverse selection. (c) Moral hazard (the depositor's hidden action is not monitoring — and the bank's hidden action is the usual concern; both are post-contract). (d) Adverse selection (hidden type).
:::
:::

::: exercise Observable types {level=1 check="105"}
In [[#ex-lemons-numbers]], what promised repayment do lenders require from a *good* firm if types are observable? (Enter the repayment on a loan of 100.)
::: solution
The safe gross return is 105.
:::
:::

::: exercise Pooling arithmetic {level=2}
Three types, equally likely, each want a loan of 1. Safe gross rate 1.10. Type A repays 1.30 for sure; type B repays 1.50 with probability $0.8$; type C repays 2.00 with probability $0.4$. Limited liability, maximum repayment equal to the project's success payoff. Can a pooling contract that attracts all three types break even?
::: solution
If all three apply at promised $R$, expected receipt is $\tfrac13\bigl(R + 0.8 R + 0.4 R\bigr) = 0.733 R$ provided $R$ does not exceed each type's success payoff (1.30, 1.50, 2.00). The tightest cap is $R \le 1.30$. Then expected receipt $\le 0.733 \times 1.30 = 0.953 < 1.10$. Pooling all three cannot break even. (A contract that prices A and B only, or that uses collateral to sort, is a different design.)
:::
:::

::: exercise Risk-shifting numbers {level=2}
A firm has equity 10, debt 90 with promised repayment 99. Project Safe returns 120. Project Risky returns 250 or 0 with equal probability. Compute the firm's expected payoff under each project and the total expected return of each project. Which does the firm choose?
::: solution
Total: Safe 120; Risky 125. Risky is better for total value in this variant. Firm: Safe $120-99=21$; Risky $\tfrac12(250-99)=75.5$. The firm prefers Risky, which here also has the higher total return, so there is no social conflict. (Change Risky to 180 or 0 and the conflict returns: total 90 < 120, firm payoff $\tfrac12(180-99)=40.5 > 21$.) The exercise is a reminder that limited liability *can* misalign; it does not always.
:::
:::

::: exercise Skin in the game {level=2}
In the variant of the previous exercise where Risky returns 180 or 0 with equal probability, how much extra equity (replacing debt, promised repayment scaled at 10 per cent) is needed so that the firm prefers Safe? Take extra equity $e$, debt $90-e$, promised repayment $1.1(90-e)$.
::: solution
Firm's Safe payoff: $120 - 1.1(90-e) = 120 - 99 + 1.1 e = 21 + 1.1 e$. Risky: $\tfrac12\bigl(180 - 1.1(90-e)\bigr) = \tfrac12(180-99+1.1 e) = 40.5 + 0.55 e$. Prefer Safe when $21 + 1.1 e \ge 40.5 + 0.55 e$ iff $0.55 e \ge 19.5$ iff $e \ge 35.45$. So about 35.5 of extra equity, taking the firm's stake to about 45.5 on a project of 100. Incentive alignment can require a lot of skin.
:::
:::

::: exercise Why delegated monitoring {level=3}
There are $n$ identical savers and one borrower. Monitoring costs $c$ and, if done by at least one saver, raises the expected repayment enough to make the loan profitable. If no one monitors, the loan is a negative-NPV lemon. Explain why, in the absence of an intermediary, monitoring may fail even though it is socially cheap when $c$ is small relative to $n$, and how a bank that issues deposits and holds the loan as a monopolist monitor repairs this.
::: hint
Free-riding: each saver wants another to pay $c$.
:::
::: solution
If any one saver monitors, all benefit through a higher expected repayment, but the monitor pays $c$ alone. Each saver prefers to shirk if they think another will monitor; if all think that, none monitors and the loan is not made (or is made and fails). An intermediary that holds the whole loan internalises the return to monitoring, pays $c$ once, and finances itself with deposits. Depositors do not need to monitor the *borrower*; they need to trust the intermediary (or be protected by capital, disclosure and insurance — later chapters). Diamond (1984) adds diversification so that the intermediary's own moral hazard with respect to depositors is contained by the law of large numbers plus a bankruptcy penalty.
:::
:::

::: exercise Rationing versus a shortage {level=3}
A lender posts a rate $r^*$ at which demand for loans exceeds the amount the lender is willing to supply, and raising the rate would lower the lender's expected profit because of adverse selection. Contrast this Stiglitz–Weiss equilibrium with a market in which a usury ceiling holds the rate below the market-clearing rate for a pool of *observable* identical-quality borrowers. What observation would distinguish them?
::: hint
In one case the lender does not *wish* to raise the rate; in the other the lender is forbidden to.
:::
::: solution
Under Stiglitz–Weiss, $r^*$ maximises the lender's expected profit; a slightly higher posted rate would worsen the pool enough to cut profit. Unsatisfied borrowers at $r^*$ cannot bid the rate up in a way the lender will accept. Under a usury ceiling, the lender *would* like to raise the rate (quality is observed, so there is no lemons penalty) and is not allowed to; excess demand is a disequilibrium relative to the unconstrained market. Distinction: if the ceiling is lifted and the rate does not rise (or rises little) while rationing persists, that is consistent with an interior adverse-selection optimum; if the rate jumps and the queue vanishes, the ceiling was the constraint. Direct evidence on the quality–rate schedule (default rates by offered rate, as in some consumer-credit studies) can also separate a deteriorating pool from a simple excess-demand queue.
:::
:::
