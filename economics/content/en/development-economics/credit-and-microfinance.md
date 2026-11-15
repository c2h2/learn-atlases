A farmer in eastern India, a trader in Accra, a seamstress in Dhaka: each has a project whose return, on average, exceeds the cost of funds at a bank. Each may still not get a loan. Development economics has spent forty years asking why. The answers — adverse selection, moral hazard, costly enforcement, missing collateral — are the same information problems as in [[information-economics/asymmetric-information]] and [[information-economics/moral-hazard]], specialised to poor countries, where formal banks are thin, land titles are incomplete, and a large share of lending is from shopkeepers, landlords, friends and rotating savings groups. Microfinance, from Grameen Bank onwards, was a proposed repair. The randomised evidence of the 2010s found modest, heterogeneous effects, not a transformation of poverty. That is a finding, not a verdict on every lender.

## Why the poor are rationed

A **credit contract** is a repayment promise, typically $R$ on a loan of size $B$, in stated states of the world. Limited liability means the borrower cannot pay more than she has. Collateral is an asset the lender can seize. In a textbook competitive market with full information and costless enforcement, the interest rate adjusts until the demand for funds equals the supply, and every positive-NPV project is financed. Drop any of those assumptions and **rationing** can appear: at the going rate, some borrowers would like a loan and would repay in expectation, and do not get one.

::: definition Credit rationing {#def-rationing}
There is **credit rationing** if, among observationally identical borrowers, some receive a loan and others do not, and the unsuccessful cannot bid the rate up to obtain one; or if borrowers would like a larger loan at the going contract and cannot obtain it. The definition is Stiglitz and Weiss (1981). It is a statement about equilibrium, not about a queue at a window.
:::

::: proposition Adverse selection can produce rationing {#prop-stiglitz-weiss}
Suppose borrowers have projects with the same mean return but different risk (a mean-preserving spread), the lender cannot observe type, and liability is limited. Then the pool of applicants becomes *riskier* as the gross interest factor $R$ rises, because safe types drop out first. The lender's expected receipts can then *fall* in $R$ over some range, so demand may exceed supply at every $R$ the lender is willing to post. Rationing is an equilibrium.
:::
::: proof
(Sketch, two types.) Safe projects return $y_s$ with probability $p_s$ and 0 otherwise; risky projects return $y_r > y_s$ with probability $p_r < p_s$, with $p_s y_s = p_r y_r = \bar y$. Limited-liability payoff to a borrower who owes $R$ is $p_i \max(y_i - R, 0)$. The safe type's expected payoff falls faster in $R$, so there is a threshold above which only risky types apply. The lender's expected receipt is $p(R) \min(R, y)$ minus the cost of funds, where $p(R)$ is the share of safe types in the pool. That receipt is not monotone in $R$. If at the $R$ that maximises it there is still excess demand, the lender will not raise $R$, and rationing follows. Moral hazard — a hidden choice of risk after the contract — produces a similar non-monotonicity (Stiglitz–Weiss; see also [[information-economics/moral-hazard]]).
:::

Collateral restores monotonicity if it is large enough: a borrower with skin in the game does not walk away from a safe project. The poor are those whose **pledgeable** assets are small — untitled land, a hut, livestock that is already their insurance ([[development-economics/risk-and-insurance]]). That is why rationing, if it exists, hits them first.

::: example A profitable project, no loan {#ex-npv}
A trader can turn 100 of inventory over in a month at a 15 percent expected return, with limited liability and no collateral. A bank's cost of funds is 2 percent a month. Why might the bank still refuse the loan if it cannot see whether this trader is the 15 percent type or a 50-percent-default type whose project is a gamble?
::: solution
The mean return of 15 percent is a mixture. If the bank posts a rate that covers a 50 percent default, the good type's surplus may go negative and she drops out, leaving the bank with the gamble — whose expected receipt may not cover 2 percent. If the bank posts a low rate, both types apply and the mixed default rate may still not cover costs. Either way the 15 percent project can go unfunded. That is [[#prop-stiglitz-weiss]] in a shop, not a theorem about this particular trader.
:::
:::

::: example Two types {#ex-two-types}
A bank has cost of funds 1.1 per dollar lent. Safe borrowers succeed with probability $0.9$ and return 2; risky borrowers succeed with probability $0.6$ and return 3. Both have limited liability and no collateral, and a project costs 1. Half of applicants are safe. What expected receipt does the bank get if it posts $R = 1.4$, and if it posts $R = 1.8$? Who applies at each rate, if a borrower's reservation payoff is 0.3?
::: solution
A type-$i$ borrower applies if $p_i (y_i - R) \ge 0.3$. At $R = 1.4$: safe gets $0.9 \times 0.6 = 0.54 \ge 0.3$; risky gets $0.6 \times 1.6 = 0.96 \ge 0.3$. Both apply. The bank's expected receipt per loan is $0.5 \times 0.9 \times 1.4 + 0.5 \times 0.6 \times 1.4 = 1.05$, which is *below* 1.1. At $R = 1.8$: safe gets $0.9 \times 0.2 = 0.18 < 0.3$ (drops out); risky gets $0.6 \times 1.2 = 0.72 \ge 0.3$. Only the risky apply, and the bank's receipt is $0.6 \times 1.8 = 1.08$, still below 1.1. Raising $R$ lost the safe types and did not make the loan profitable. If the bank cannot tell types apart, it may prefer not to lend, or to lend to a subset at a lower $R$ with some other screening device (collateral, a group, a waiting cost).
:::
:::

::: warning A high village interest rate is not a high profit
Annualised rates of 5 percent a *month* from a moneylender are common in survey data (Udry on northern Nigeria; various Indian ICRISAT and later datasets). Those rates include a default premium, the cost of monitoring a small loan, the opportunity cost of funds that are themselves lumpy, and monopoly power where it exists. They are not a 60 percent real profit margin. Inferring "the poor are a gold mine for banks" from the headline rate is the mistake that launched some of the more unfortunate microfinance IPOs, and also the mistake that launched some of the more optimistic NGO pitch-decks.
:::

## Informal lenders, ROSCAs and trade credit

Before Grameen there was the landlord, the shopkeeper, the friend, and the **rotating savings and credit association (ROSCA)**. A ROSCA of $n$ people who each contribute $c$ per meeting pays $nc$ to one member per meeting, in a rotating order. It is a commitment device for saving and a way to buy an indivisible good (a tin roof, a sewing machine) sooner than autarkic saving would allow (Besley, Coate and Loury 1993). It does not intermediate between strangers, and it does not fund a project whose risk the group cannot see.

Trade credit — the input supplier who is paid after harvest — uses a relationship the bank does not have: the supplier sees the crop, can threaten to cut off next season's seed, and often lives in the same place. Interlinked contracts (credit plus land, credit plus marketing) are a theme of [[development-economics/land-and-agriculture]]. Udry (1990, 1994), on northern Nigeria, found that informal loans between relatives and neighbours had state-contingent repayment — a bad harvest reduced what was paid — which is insurance as much as credit. Formal banks, by contrast, write relatively rigid contracts, because they cannot see the harvest as well and because a state-contingent contract is harder to enforce in court.

The informational *advantage* of informal finance is also its limit: the pool of people you can monitor is small, so the capital they can mobilise is small. A technology that needs a truck, not a sewing machine, may be too large for the ROSCA and too opaque for the bank. That gap is the niche microfinance tried to occupy.

## Group lending

Muhammad Yunus's Grameen Bank, from experimental lending in Jobra in 1976 to a bank in 1983, made **joint liability** famous: a group of five women, no physical collateral, sequential loans, and a threat that default by one puts the others' future credit at risk. Variants spread across Bangladesh, then across the world. The theoretical case was built in the 1990s.

::: proposition Joint liability and peer selection {#prop-joint}
Suppose borrowers know each other's types and the lender does not. A contract that makes each borrower liable for a partner's repayment can induce **assortative matching** (safe with safe, risky with risky) and can make the safe group's contract profitable for the lender at a lower rate than a pooling individual contract. (Ghatak 1999; related arguments in Stiglitz 1990, Besley and Coate 1995, and Ghatak and Guinnane 1999.)
:::
::: proof
(Sketch.) A safe type, offered a joint-liability contract, prefers a safe partner, because the expected transfer to cover the partner is smaller. In a competitive matching market that preference produces homogeneous groups. The lender can then offer a contract that the safe groups take and the risky groups find expensive (they expect to pay the joint-liability clause more often). Screening is delegated to the borrowers. Moral-hazard variants work through peer *monitoring* rather than peer *selection*: the partner has an incentive to watch, and to punish, hidden risk-taking.
:::

Joint liability has costs. It imposes risk on people who are already poorly insured. It can induce too little risk-taking (a safe partner vetoes a good but risky project). It can collapse under correlated shocks (a flood that hits the whole group). And it can be harsh: Besley and Coate (1995) note that social sanctions, the mechanism that makes peer enforcement work, can be ugly. In the 2000s several leading microlenders, including Grameen II and BancoSol, *relaxed* joint liability toward individual liability plus a group *meeting*, suggesting that the meeting (information, repayment habit, a public promise) may have been doing as much work as the legal clause.

::: example Sequential loans as a carrot {#ex-dynamic}
A lender offers $B = 1$ today at $R = 1.2$, and a larger loan $B' = 2$ next period only if today's loan is repaid. The borrower has a safe project each period (success probability 0.9, return 2 per unit invested) and discounts the future by $\beta = 0.8$. Compare the incentive to repay today with a one-shot loan.
::: solution
One-shot: on success the borrower can abscond with 2 instead of paying 1.2, gaining 0.8, and the lender has only social sanctions or a legal threat. With the carrot: repaying costs 1.2 but preserves $\beta$ times next period's expected surplus. Next period's expected surplus if she gets $B' = 2$ is $0.9 \times (4 - 2.4) = 1.44$ if $R$ stays 1.2 per unit; discounted, $0.8 \times 1.44 = 1.152 > 0.8$. The dynamic rent outweighs the one-shot gain from absconding. Dynamic incentives are a substitute for collateral and for joint liability; they need a borrower who expects to want another loan, which is why "graduation" out of microfinance is a mixed blessing for the lender.
:::
:::

::: example A two-person group {#ex-group}
Two safe borrowers each succeed with probability $0.9$, independently, and owe 1.2 each. Under joint liability, if one fails and the other succeeds, the successful one pays an extra 0.4 (capped by her return of 2). What is each borrower's expected payment to the lender? Compare with individual liability, where a failure pays 0.
::: solution
Outcomes: both succeed (probability $0.81$), each pays 1.2; one succeeds (probability $2 \times 0.9 \times 0.1 = 0.18$), the successful one pays $1.2+0.4 = 1.6$ and the failed one pays 0; both fail (probability $0.01$), both pay 0. Expected payment per borrower: $0.81 \times 1.2 + 0.09 \times 1.6 + 0.09 \times 0 + 0.01 \times 0 = 0.972 + 0.144 = 1.116$. Under individual liability the expected payment is $0.9 \times 1.2 = 1.08$. Joint liability raises the lender's expected receipt (here from 1.08 to 1.116 per person) by taxing the state in which exactly one succeeds. That is the screening/monitoring wedge. It also raises the borrower's expected burden, which is why a joint-liability contract must typically offer a lower headline $R$ to attract safe types.
:::
:::

::: widget plot
f: 0.9*min(x,2); 0.6*min(x,3); q*0.9*min(x,2)+(1-q)*0.6*min(x,3)
sliders: q=0.5:0:1:0.05
x: 0, 3.2
y: 0, 2.2
labels: \text{safe pool}; \text{risky pool}; \text{mixed pool}
hlines: 1.1
caption: A Stiglitz–Weiss picture: the lender's expected receipt as a function of the posted repayment $R$ (horizontal axis), for a safe pool, a risky pool, and a mixed pool with safe share $q$, against a cost of funds of 1.1. Slide $q$ down and watch the mixed curve fall toward the risky curve. The drop-out of safe types as $R$ rises is the next step of the argument; here it is mimicked by lowering $q$.
:::

## The evidence on microfinance

A first generation of studies used the roll-out of Grameen and BRAC, and the eligibility rule of landholdings below 0.5 acres, as quasi-experiments (Pitt and Khandker 1998, and a long subsequent debate with Morduch, Roodman and others). The estimates of impacts on consumption and on women's empowerment were sensitive to the design.

A second generation randomised access. Banerjee, Duflo, Glennerster and Kinnan (2015, *AEJ: Applied*), in Hyderabad, found that microcredit increased durable purchases and new business creation among a subset of households already inclined to business, and did *not* transform consumption, health, education or female decision-making on average, over 15–18 months. A collection of six RCTs in Bosnia, Ethiopia, India, Mexico, Mongolia and Morocco (Banerjee, Karlan and Zinman, 2015, same journal) is the cleanest summary we have: demand for the product was real; effects on business activity were positive, modest and heterogeneous; effects on consumption and on "transformation" outcomes were close to zero on average in the horizon of the trials (typically 1–3 years). Some households were worse off, having taken on repayment stress. Subsequent longer-run follow-ups have not overturned the average-null on poverty, though they have found persistent effects on some business outcomes for some subgroups.

That is not a finding that "credit does not matter". It is a finding that *this product*, at *this* interest rate, with *this* repayment schedule (often weekly, starting immediately), sold to *this* population (not only high-return entrepreneurs), does not, on average, do what the most ambitious claims said. Households that already had a business and a high return used the loans; households that did not, did not become entrepreneurs by being offered one. The constraint that binds for the first group is credit; the constraint that binds for the second may be something else — skills, demand, risk, a missing insurance market.

::: quiz
The six-RCT summary on microfinance found modest effects on business activity and near-zero average effects on consumption. Which interpretation is consistent with the evidence?
- [ ] Credit markets are complete; the poor did not need loans.
- [x] The average borrower was not sitting on a high-return, credit-constrained project of the kind the early theory emphasised; some subgroups were.
- [ ] Joint liability was shown to be the essential ingredient, because all six trials used it.
- [ ] The trials were too short to matter, so we should ignore them.
::: solution
Heterogeneity is the point: some households expanded businesses, most did not change consumption. That pattern matches a world in which a minority is credit-constrained in the classical sense and a majority is not, or is constrained in some other way. Several of the trials used individual rather than joint liability. Short horizons are a real limit — they are a reason to want longer follow-ups, not a reason to discard the average-null that those horizons do identify.
:::
:::

::: application Interest-rate caps
Several countries, including a well-known episode in Nicaragua and later debates in India after the 2010 Andhra Pradesh crisis, have capped microlending rates. A cap can cut monopoly rents; it can also, in a Stiglitz–Weiss world, *worsen* rationing, because it stops the lender posting the $R$ that maximises expected receipts, or stops the lender covering costs on small loans. The Andhra Pradesh ordinance of 2010, which froze collections, was followed by a collapse of lending and by evidence of reduced economic activity among erstwhile borrowers (see the discussion in Banerjee, Duflo and others). The episode does not say that "any regulation is bad". It says that a cap is a blunt instrument in a market defined by information problems, and that a crisis of over-lending is not the same object as the classical under-lending of the 1980s theory.
:::

::: history
The moneylender as a figure in Indian and colonial debate is older than development economics; Darling's *The Punjab Peasant in Prosperity and Debt* (1925) is a period piece with data. The modern theory begins with Stiglitz and Weiss (1981) and with the agricultural-household models of the 1980s (Bell, Srinivasan, Udry). Yunus's Jobra experiments date to 1976; Grameen Bank was authorised in 1983; the Microcredit Summit of 1997 announced a global campaign; Yunus and Grameen received the Nobel Peace Prize in 2006. The randomised evaluations that cooled the most sweeping claims were designed in the late 2000s and published around 2015. Theory and evidence did not move in lockstep: the theory of why credit fails the poor remains in good health; the claim that a particular group-lending product closes the gap does not.
:::

## Where this leads

Insurance, which is the other half of the missing-finance problem and which informal loans partly provide, is [[development-economics/risk-and-insurance]]. Land as collateral, and as the thing the poor most often have but cannot pledge, is [[development-economics/land-and-agriculture]]. The use of RCTs as a method, including their limits, returns in [[development-economics/aid-and-policy]].

::: summary
- Credit rationing is an equilibrium in which the interest rate does not clear the market, because of adverse selection or moral hazard under limited liability ([[#def-rationing]], [[#prop-stiglitz-weiss]]).
- The poor lack pledgeable collateral. Informal lenders and ROSCAs have information the bank does not, and cannot mobilise much capital.
- Joint liability can delegate screening and monitoring to peers ([[#prop-joint]]), at the cost of extra risk and of possible social sanctions. Many lenders have since softened the clause.
- Randomised evaluations of microcredit find real demand, modest and heterogeneous business effects, and no average transformation of poverty over the horizons studied (Banerjee, Karlan, Zinman 2015 and the companion trials).
- A high village interest rate mixes default, monitoring costs and possible market power; it is not a measure of bankable profit.
:::

## Exercises

::: exercise Who drops out? {level=1}
In [[#ex-two-types]], at $R = 1.8$, which type applies? Explain in one sentence why.
::: solution
Only the risky type. The safe type's expected surplus $0.9 \times (2-1.8) = 0.18$ is below the reservation payoff 0.3; the risky type's $0.6 \times (3-1.8) = 0.72$ is not. Limited liability makes the risky type care less about the high $R$.
:::
:::

::: exercise A bank's receipt {level=1 check="1.08"}
If only risky borrowers (success probability 0.6, limited liability) take a loan with $R = 1.8$, what is the bank's expected receipt per unit lent? (Enter that number.)
::: solution
$0.6 \times 1.8 = 1.08$.
:::
:::

::: exercise Individual liability {level=1 check="1.08"}
A safe borrower succeeds with probability 0.9 and owes 1.2. Expected payment under individual liability? (Enter it.)
::: solution
$0.9 \times 1.2 = 1.08$.
:::
:::

::: exercise Joint-liability wedge {level=2}
In [[#ex-group]], joint liability raised expected payment from 1.08 to 1.116. Where does the extra 0.036 per person come from, in which state of the world?
::: solution
The extra is collected in the mixed-success state, probability 0.09 from the point of view of a given borrower as the successful partner, who then pays an extra 0.4. Check: $0.09 \times 0.4 = 0.036$. Both-succeed and both-fail states are unchanged relative to a world where the extra clause does not fire.
:::
:::

::: exercise ROSCA arithmetic {level=2 check="600"}
A ROSCA of 12 people meets monthly; each pays 50. What is the pot each meeting? (Enter the pot.)
::: solution
The pot is $12 \times 50 = 600$.
:::
:::

::: exercise A Stiglitz–Weiss sketch {level=2}
Explain, without algebra, why raising the interest rate can *lower* a lender's expected receipts when types are hidden and liability is limited.
::: solution
A higher rate bites the safe type, who expects to repay, more than the risky type, who often defaults. Safe types quit the pool; the remaining borrowers default more often. The extra dollars collected in success states can be smaller than the dollars lost to a worse mix. The lender's receipt is then not increasing in the rate, and excess demand need not bid the rate up.
:::
:::

::: exercise Why not just collateral? {level=3}
A policymaker proposes "give everyone a title so they can pledge land". Using de Soto's idea and its critics (Field; Galiani and Schargrodsky; the Indian and African titling experiments), state one reason titles might raise credit, and one reason they might not.
::: solution
Might: a title makes land seizable in court, so it becomes collateral, which restores the lender's monotonicity in $R$ and relaxes rationing (de Soto's *Mystery of Capital*). Might not: courts may still not seize the land of the poor, lenders may not want to, land is already pledged informally, the poor may not *demand* credit (risk, low returns), and titling can create conflict over who is the owner. Field (Peru) and Galiani–Schargrodsky (Buenos Aires) found effects of titling more on investment and labour supply than on a surge of bank loans. Titles are not a sufficient statistic for pledgeability.
:::
:::

::: exercise Interpreting an RCT {level=3}
A microcredit RCT finds a large increase in durable purchases, no change in average consumption, and a fall in "temptation" goods among borrowers. Is this consistent with a pure income effect of a cheap loan, with a constrained lumpy investment, or with both? What extra fact would distinguish them?
::: hint
An income effect would raise consumption of normal goods, including food.
:::
::: solution
A pure income effect of a cheaper loan (a transfer-like surplus) should raise consumption of normal goods, including food and temptation goods, unless those are inferior. The pattern — durables up, average consumption flat, temptation down — fits households *rearranging* spending to buy an indivisible asset (a loom, a fridge for a shop) that they could not save for, possibly with a commitment benefit of the repayment schedule. It is also consistent with some households investing and others cutting back. Distinguishing: look at *heterogeneity* by prior business ownership (Banerjee et al. 2015 found the investment effects concentrated there), and at longer-run consumption once the durable is in place. A lump-sum grant RCT (no repayment) is another contrast: if durables rise without a repayment commitment, commitment is not essential.
:::
:::
