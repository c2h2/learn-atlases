A car is for sale at a price that looks like a bargain. The seller has driven it for three years and knows whether the gearbox is sound. You, the buyer, can kick the tyres and take it for a short drive, but you cannot know what the seller knows. If you offer a price that would be fair for an average car, the owner of a good car will keep it and the owner of a bad one will sell. The cars that remain on the market are worse than average, so the fair price is lower, so still more good cars are withdrawn. George Akerlof named this logic the **market for lemons**, and showed that a market in which quality is hidden can shrink until only the worst goods trade — or until nothing trades at all.

The same pattern appears wherever one side of a transaction is better informed than the other before the contract is signed. People who expect large medical bills buy more insurance; borrowers who know their project is fragile are the ones most willing to accept a high interest rate; workers who know they are unproductive are the ones most willing to take a job at the going wage. In each case the uninformed side’s terms, set for the average applicant, attract a worse-than-average pool, and the market that would have existed under symmetric information is distorted or destroyed. This chapter makes that mechanism precise, computes a used-car market with numbers, and then takes the same apparatus to insurance and credit.

## Hidden information and hidden action

Uncertainty itself is not the problem. In [[microeconomics/uncertainty]] both parties may face a lottery — a harvest that depends on the weather, a portfolio whose return is random — and still trade efficiently, because they share the same description of the lottery. The difficulty begins when the description is not shared.

::: definition Asymmetric information {#def-asymmetric}
Information is **asymmetric** when, at the moment a contract is offered or a trade is contemplated, one party knows something payoff-relevant that the other does not. The informed party’s private knowledge is her **type** $\theta$, drawn from a commonly known distribution; the uninformed party holds a belief $\mu$ over types. A **hidden-information** (or **adverse-selection**) problem is one in which $\theta$ is realised before the contract is signed. A **hidden-action** (or **moral-hazard**) problem is one in which a payoff-relevant action is chosen after the contract is signed and is not observed by the other party.
:::

The two problems are often present together — an employee may be of unknown talent *and* choose unobservable effort — but they yield different models and they are treated separately in this course. Hidden information is this chapter and the next two ([[information-economics/job-market-signalling]], [[information-economics/screening]]); hidden action is [[information-economics/moral-hazard]] and [[information-economics/incentives-in-organisations]]. The distinction is about *timing relative to the contract*, not about the labels “buyer” and “seller”. A regulator who does not know a firm’s cost is in a hidden-information problem; a regulator who cannot observe the firm’s abatement effort is in a hidden-action problem.

::: warning Adverse selection is not moral hazard
Everyday English uses “adverse selection” and “moral hazard” loosely, and sometimes interchangeably, for any situation in which insurance seems to make things worse. In the models they are different. **Adverse selection** is about *who* buys: the composition of the pool, determined before the contract. **Moral hazard** is about *what they do* after they have bought: care, effort, risk-taking. A health-insurance market in which the sick enrol more is adverse selection; a market in which the insured visit the doctor more often because visits are cheap is (ex post) moral hazard. Empirical work has to separate the two, because the contracts that mitigate them are not the same.
:::

A useful third term is **symmetric uncertainty**: both sides are equally uninformed. Competitive markets handle that case well — they price the average — and the first welfare theorem of [[microeconomics/welfare-theorems]] can still apply. Asymmetric information is what breaks the theorem: the price, which would have been a sufficient statistic under symmetry, now changes the composition of what is traded, and the composition changes the price.

## Akerlof’s market for lemons

Consider a market for used cars. Each car has a quality $\theta$, which is also the seller’s valuation of the car (the utility of keeping it). Buyers are willing to pay $k\theta$ with $k > 1$, so there are gains from trade for every car: a car of quality $\theta$ is worth more to a buyer than to its current owner. If quality were public, every car would sell at some price in $[\theta, k\theta]$ and the gains $(k-1)\theta$ would be realised. The question is what happens when only the seller sees $\theta$.

There are many identical risk-neutral buyers, who compete in prices, and a large number of sellers, each with one car. Buyers observe the market price but not individual quality. Sellers sell if and only if the price is at least their valuation.

::: definition Lemons market {#def-lemons}
A **lemons market** has a unit mass of sellers, each owning one good of quality $\theta \in [\underline{\theta}, \overline{\theta}]$, drawn from a commonly known distribution $F$ with density $f > 0$. The seller of type $\theta$ values the good at $\theta$ and sells if and only if $p \ge \theta$. Buyers are risk-neutral, value a good of quality $\theta$ at $k\theta$ with $k > 1$, and observe only the price. A competitive price $p$ is an **equilibrium** if it equals buyers’ willingness to pay for a good drawn from the pool of goods offered at that price:

$$
p = k\,\E[\theta \mid \theta \le p],
$$ {#eq-lemons-p}

whenever the set $\{\theta : \theta \le p\}$ has positive probability; $p$ below $\underline{\theta}$ (no trade) is always an equilibrium.
:::

The right-hand side of [[#eq-lemons-p]] is well defined because the offer set is an interval $(-\infty, p] \cap [\underline{\theta}, \overline{\theta}]$. Average quality in that interval is a function of $p$, written $\mu(p) = \E[\theta \mid \theta \le p]$. Buyers will pay $k\mu(p)$ and no more. Equilibrium requires that this willingness to pay coincide with the price that induced the pool.

::: proposition Unravelling with uniform quality {#prop-unravel}
Suppose $\theta$ is uniform on $[0, 2]$ and $k = 3/2$. Then the unique equilibrium is $p = 0$: the market unravels completely and no car is traded. Under symmetric information every car would be traded and expected gains from trade would be $\E[(k-1)\theta] = 1/2$.
:::

::: proof
If a candidate price $p \in (0, 2]$ is posted, every seller with $\theta \le p$ offers her car and the others do not. Average quality in the pool is $\mu(p) = p/2$. Buyers’ willingness to pay is $k\mu(p) = (3/2)(p/2) = 3p/4$, which is strictly less than $p$. So $p$ cannot equal willingness to pay. The only remaining candidate is $p = 0$, at which the pool is empty (or, in the limit, contains only $\theta = 0$) and there is nothing to trade. Under symmetric information a car of quality $\theta$ sells at some price in $[\theta, (3/2)\theta]$, and expected gains are $\E[\theta/2] = 1/2$.
:::

The arithmetic is brutal because the average of a uniform $[0, p]$ is half the price, and $k = 3/2$ is not large enough to close the gap. Buyers would need $k \ge 2$ for the average car offered at $p$ to be worth $p$. When $k > 2$ and quality is uniform on $[0, 2]$, the equilibrium jumps to the other corner: all cars trade at $p = k \cdot 1 = k$, which exceeds every seller’s reservation value.

::: widget plot
f: x; (k/2)*x; 0.5*x
sliders: k=1.5:1:3:0.1
x: 0, 2
y: 0, 3
labels: p; k\mu(p); \mu(p)
caption: Horizontal axis is the candidate price $p$. The line $y=p$ is what sellers require; $y = k\mu(p) = (k/2)p$ is what buyers will pay when quality is uniform on $[0, 2]$. Drag $k$. For $k < 2$ the buyers’ line lies below $y=p$ except at the origin, so the market unravels; at $k=2$ the two lines coincide; for $k>2$ buyers will pay more than $p$ at every positive price and all cars trade.
:::

Akerlof’s original 1970 illustration used roughly this arithmetic (valuations $q$ and $(3/2)q$, quality uniform on $[0, 2]$) and drew the conclusion that “it is quite possible to have the bad driving out the not-so-bad driving out the medium driving out the not-so-good driving out the good in such a sequence of events that no market exists at all.”

The continuous uniform case with $k < 2$ is extreme. A discrete market with two qualities — the example Akerlof named — shows that the same logic can destroy some trades without destroying all of them, and it is the right place to compute gains from trade by hand.

::: example A hundred cars, two qualities {#ex-hundred}
A town has 100 used cars. Sixty are **lemons**, each worth 10 to its owner and 15 to a buyer. Forty are **peaches**, each worth 30 to its owner and 45 to a buyer. All agents are risk-neutral. Buyers cannot tell the cars apart and compete in prices. Sellers know their own car’s quality and sell if and only if the price covers their valuation.

(a) If quality were public, which cars would trade and what would be the total gains from trade?

(b) If quality is private and buyers believe that both types are offered, what is the most they will pay? Do the peach owners sell at that price?

(c) What is the equilibrium, and how large are the gains from trade?
::: solution
(a) Under public quality every car trades: a lemon at some price in $[10, 15]$, a peach at some price in $[30, 45]$. Gains are $5$ per lemon and $15$ per peach, so $60 \times 5 + 40 \times 15 = 300 + 600 = 900$.

(b) If both types are offered, a random car is a lemon with probability $0.6$ and a peach with probability $0.4$. Buyers’ willingness to pay is

$$
0.6 \times 15 + 0.4 \times 45 = 9 + 18 = 27.
$$

Peach owners require 30. Because $27 < 30$, they withdraw.

(c) With peaches gone, only lemons remain. Buyers will pay at most 15 for a lemon, and lemon owners require 10, so the competitive price lies in $[10, 15]$ (with many buyers it is 15). All 60 lemons trade; none of the 40 peaches do. Gains from trade are $60 \times 5 = 300$. Asymmetric information has destroyed $600$ of the $900$ that public quality would have realised — the entire peach surplus.
:::
:::

The number 27 is the key. It is the average *buyer* valuation, not the average quality, and it has to clear the *seller* reservation of the good type. Whenever the share of peaches is too small, the average is dragged below 30 and the peaches leave. The threshold is easy to compute.

::: example When peaches are plentiful {#ex-peaches-plenty}
Keep the valuations of [[#ex-hundred]], but now 80 of the 100 cars are peaches and 20 are lemons. Show that a pooling equilibrium exists, compute a competitive pooling price, and compare gains from trade with the public-quality benchmark.
::: solution
If both types sell, willingness to pay is

$$
0.2 \times 15 + 0.8 \times 45 = 3 + 36 = 39.
$$

Peach owners require 30, and $39 \ge 30$, so they are willing to sell. Lemon owners require only 10, so they sell as well. A competitive price with many buyers is $p = 39$; any $p \in [30, 39]$ is consistent with both types selling and with buyers not paying more than they expect the car to be worth. (With free entry of buyers the price is bid up to 39.) All 100 cars trade. Gains are again $20 \times 5 + 80 \times 15 = 100 + 1{,}200 = 1{,}300$, the same as under public quality. Adverse selection is present — buyers of a peach pay 39 for a car worth 45 to them and sellers of a peach receive 39 for a car they value at 30, while lemon trades are a bargain for sellers — but it does not destroy any trade, because the pool is good enough to keep the peaches in.
:::
:::

The critical share of peaches, $\lambda$, solves $15(1-\lambda) + 45\lambda = 30$, or $15 + 30\lambda = 30$, hence $\lambda = 1/2$. At $\lambda = 1/2$ buyers will pay exactly 30, peach owners are indifferent, and both a pooling outcome and a lemons-only outcome can be supported (the latter if peach owners, indifferent, stay out). Below one half the market for peaches collapses; above it, pooling survives.

::: quiz
In the hundred-car market of [[#ex-hundred]], 60 lemons and 40 peaches, a well-meaning town council posts a price floor of 32 so that peach owners will be willing to sell. What happens?
- [ ] All 100 cars trade at 32, and the gains from trade rise to 900.
- [x] Peach owners are willing to sell, but buyers are not willing to pay 32 for a random car, so the floor price attracts no buyers.
- [ ] Only peaches trade, because lemons are worth less than 32 to buyers.
- [ ] The floor converts private quality into public quality.
::: solution
Buyers’ willingness to pay for a random car from the full pool is 27, computed in [[#ex-hundred]]. A posted price of 32 exceeds 27, so buyers refuse. The floor does not reveal quality; it merely prevents the market from finding the lemons-only price in $[10, 15]$. A price *ceiling* of, say, 14 would allow lemons to trade and still keep peaches out — the same allocation as the unregulated equilibrium, at a different division of the lemon surplus.
:::
:::

## Average quality as a function of price

The two-type market jumps from “all trade” to “only lemons” as $\lambda$ crosses $1/2$. With many qualities the same force produces a sequence of withdrawals — Akerlof’s “bad driving out the not-so-bad”. A transparent discrete illustration is a line of cars with qualities $1, 2, \dots, 100$, one of each, seller valuation $\theta$, buyer valuation $(3/2)\theta$.

::: example Qualities one to a hundred {#ex-one-to-hundred}
There are 100 cars, of qualities $\theta = 1, 2, \dots, 100$, one of each. Seller valuation is $\theta$, buyer valuation is $(3/2)\theta$. Buyers observe only the price. For a candidate integer price $p$, the cars offered are those with $\theta \le p$, with average quality $(1+p)/2$ if $p$ of them are offered. Show that $p = 3$ is an equilibrium, that $p = 50$ is not, and that the public-quality gains from trade are $2{,}525/2$ while equilibrium gains are $3$.
::: solution
At price $p$ (assume $p$ integer between 1 and 100) the offered cars are $1, \dots, p$, with average quality $(1+p)/2$. Buyers will pay

$$
\frac{3}{2} \cdot \frac{1+p}{2} = \frac{3(1+p)}{4}.
$$

Equilibrium requires $p = 3(1+p)/4$, which rearranges to $4p = 3 + 3p$, or $p = 3$. At $p = 3$ the offered cars are qualities 1, 2 and 3, average 2, and willingness to pay is $(3/2)\times 2 = 3$. It checks. At $p = 50$ the average of 1 through 50 is $25.5$, willingness to pay is $38.25 < 50$, so buyers will not pay 50.

Gains from trade on a car of quality $\theta$ are $(1/2)\theta$. Under public quality all 100 cars trade and total gains are $\frac12 \sum_{\theta=1}^{100} \theta = \frac12 \cdot 100 \cdot 101 / 2 = 2{,}525$. In the $p = 3$ equilibrium only three cars trade, with gains $\frac12(1+2+3) = 3$. Almost all of the surplus is lost.

(Other prices can be equilibria if one is careful about who is indifferent. At $p = 2$, average quality is $1.5$ and willingness to pay is $2.25 > 2$, so buyers would bid the price up. At $p = 4$, average quality is $2.5$ and willingness to pay is $3.75 < 4$, so the price is too high. The competitive equilibrium with free entry of buyers is $p = 3$.)
:::
:::

The calculation is the discrete analogue of [[#prop-unravel]]. Starting from a high price, owners of the best cars withdraw, the average falls, willingness to pay falls, the next-best owners withdraw, and the process stops only when the remaining average, scaled by $k$, matches the price — here, at the very bottom of the quality ladder.

::: proposition A sufficient condition for complete unravelling {#prop-sufficient}
In the market of [[#def-lemons]], suppose $\underline{\theta} = 0$, $F$ has a positive density on $[0, \overline{\theta}]$, and $k \mu(p) < p$ for every $p \in (0, \overline{\theta}]$, where $\mu(p) = \E[\theta \mid \theta \le p]$. Then the unique equilibrium is no trade. A sufficient condition is that $\mu(p)/p$ be non-increasing (as it is for any $F$ with decreasing reverse hazard rate, and in particular for the uniform) and $k \mu(\overline{\theta}) < \overline{\theta}$.
:::

::: proof
The argument is the same as in [[#prop-unravel]]: any $p > 0$ attracts the pool $[0, p]$, worth $k\mu(p) < p$ to buyers, and cannot be an equilibrium. For the sufficient condition, $\mu(p)/p \le \mu(\overline{\theta})/\overline{\theta}$ for all $p$, so $k \mu(p) \le k \mu(\overline{\theta}) \cdot (p/\overline{\theta}) < p$.
:::

When the support of quality is bounded away from zero the conclusion can change. If $\theta$ is uniform on $[1, 2]$ and $k = 3/2$, then if all cars are offered the average is $1.5$ and willingness to pay is $2.25$, which exceeds every seller’s reservation. Full trade at $p = 2.25$ is then an equilibrium: the lower bound on quality is a floor under the pool, and $k$ is large enough relative to that floor. Institutions that impose a minimum quality — a roadworthiness test, a professional licence, a credit-rating cutoff — are trying to create exactly such a floor.

::: intuition Price as a statistic that changes the sample
In a symmetric market the price rations a fixed supply. In a lemons market the price also *selects the sample*. A higher price brings in better goods, which is why demand, defined as willingness to pay for the offered pool, can slope the “wrong” way: as $p$ rises, $\mu(p)$ rises, so $k\mu(p)$ can rise faster or slower than $p$. Equilibrium is the fixed point of that map, not the crossing of two independent curves. That is the whole of adverse selection in one sentence.
:::

::: widget plot
f: 2*x; k*x
sliders: k=1.5:1:3:0.1
x: 0, 1
y: 0, 3
labels: \text{inverse supply}; \text{buyer WTP}
caption: Quantity $x \in [0, 1]$ is the share of cars offered, the worst $x$ of a uniform $[0, 2]$ quality distribution. Inverse supply is the marginal seller’s quality, $p = 2x$. Buyers’ willingness to pay for that pool is $k$ times average quality $x$, hence $p = kx$. For $k < 2$ the curves meet only at the origin (no trade); for $k > 2$ buyers outbid every seller and all cars trade. There is no interior crossing.
:::

## Insurance and credit

Used cars are the teaching example because quality is one-dimensional and the arithmetic is short. The same fixed-point lives in two markets that occupy a much larger share of national accounts: insurance and credit.

### Health and other insurance

A household with wealth $W$ faces a loss $L$ with probability $p$, and has a strictly concave von Neumann–Morgenstern utility $u$, as in [[microeconomics/uncertainty]]. An insurer, assumed risk-neutral and competitive, offers cover of the loss at a premium $\pi$. If $p$ is public, competition drives $\pi$ to $pL$ (fair odds) and a risk-averse household buys full insurance. If $p$ is private — the household knows whether it is a high-risk or a low-risk type — the insurer who prices for the average $p$ attracts a pool with an above-average $p$, loses money, and must raise $\pi$. Low-risk households then drop out, and the spiral is Akerlof’s.

::: example A two-type insurance pool {#ex-insurance-pool}
There are equal numbers of high-risk and low-risk households. Each has wealth $W = 100$ and faces a loss $L = 80$. High-risk types have $p_H = 1/2$, low-risk types $p_L = 1/4$. Utility is $u(w) = \ln w$. A competitive insurer cannot tell the types apart and must charge a single premium for full cover of the loss. The insurer’s opportunity cost of funds is zero.

(a) What premium breaks even on the pooled population? Compute each type’s expected utility of buying full cover at that premium, and of remaining uninsured.

(b) Does the low-risk type buy? What happens to the insurer’s pool?
::: solution
(a) The pooled probability of loss is $(1/2)(1/2) + (1/2)(1/4) = 3/8$. The break-even premium for full cover is $\pi = (3/8)\times 80 = 30$. Wealth if insured is $70$ in both states, so $u = \ln 70 \approx 4.248$. Uninsured, the high-risk type gets

$$
\tfrac12 \ln 100 + \tfrac12 \ln 20 \approx 3.800,
$$

and the low-risk type gets

$$
\tfrac34 \ln 100 + \tfrac14 \ln 20 \approx 4.203.
$$

Both types prefer $\ln 70 \approx 4.248$ to remaining uninsured, so *both would buy* at $\pi = 30$. (The high-risk type is getting a bargain: her fair premium would have been 40. The low-risk type is overpaying relative to her fair premium of 20, but risk aversion is strong enough that she still prefers cover.)

(b) In this parametrisation the pooling contract survives the participation test of both types. That is not a theorem. If low-risk types were less risk-averse, or the loss smaller, $\ln 70$ would fall below their uninsured expected utility and they would leave; the insurer, now facing only high-risk types, would have to raise the premium to 40, which is fair for them. The next chapter but one ([[information-economics/screening]]) shows a sharper result, due to Rothschild and Stiglitz: even when both types would *buy* a pooling contract, a rival insurer can cream-skim the low-risk types with a partial-cover contract, so competitive pooling still fails. Adverse selection does not always mean that the good types leave of their own accord; it can mean that they are picked off.
:::
:::

Akerlof pointed to health insurance for the elderly as a market in which the lemons logic was already institutionalised: in the United States before Medicare, private insurers either refused to cover the old or charged premiums that only the sick were willing to pay. Medicare, introduced in 1965, is a compulsory public pool — a way of stopping the withdrawal spiral by forcing the good risks to stay. Whether compulsion is the right response is a separate, normative question; the positive point is that a voluntary pool priced at the average need not be a pool of average risks.

### Credit

A lender who cannot observe a borrower’s project has the same problem with a different sign. Raise the interest rate to compensate for default, and the remaining applicants are those whose projects are riskiest — they are the ones for whom a high promised repayment is not a deterrent, because they repay only in the good state. Stiglitz and Weiss (1981) showed that the resulting adverse-selection (and moral-hazard) effect can make a bank’s expected return *non-monotone* in the interest rate, so that credit is rationed: some observationally identical borrowers are denied loans even though they would pay a higher rate.

::: application A numerical credit market
Two types of borrower, in equal numbers, each want a loan of 1 to fund a project. Safe types return $1.4$ for sure. Risky types return $2.2$ with probability $1/2$ and $0$ otherwise, so their expected return is $1.1$. Limited liability: the borrower pays $\min(D, \text{return})$, where $D$ is the contractual repayment. The bank’s cost of funds is $1.2$ per unit lent. All agents are risk-neutral.

The socially efficient allocation funds only safe projects, which return $1.4 > 1.2$; risky projects return $1.1 < 1.2$ and should not be funded. If the bank cannot tell types apart and charges a common $D$, safe types accept only if $D \le 1.4$. Break-even on a pooled book would require $\tfrac12 D + \tfrac12 \cdot \tfrac12 D = 1.2$, hence $D = 1.6$. But $1.6 > 1.4$, so safe types refuse. The remaining book is all risky; those projects repay $D$ only half the time, and even at the maximum feasible $D = 2.2$ expected repayment is $1.1 < 1.2$. The bank will not lend. A market that would have funded the safe half of the population under public types funds no one.

Collateral, credit history and relationship lending are all devices for breaking this pooling. They belong to the screening chapter and to [[money-banking]], but the information problem is the one just computed.
:::

The same arithmetic has been used to think about credit in low- and middle-income countries, where formal credit histories are thin and collateral is hard to seize. Akerlof’s original paper already pointed to credit markets in India in the 1960s, in which local moneylenders had information that urban banks did not, and in which the urban rate did not drain the local market because the urban bank could not select the good risks. Microfinance, group lending and mobile-money credit scores are later institutional responses to the same gap.

## Evidence

The lemons model is a theoretical mechanism, not a claim that every used-car lot is a market failure. Testing it requires a window onto quality that the economist can see and the uninformed side of the market, at the time of trade, could not.

Bond (1982), in a paper that remains the first port of call, compared maintenance records of pickup trucks bought used with those bought new, in a US sample. After age and mileage, he found little evidence that used trucks needed more maintenance — a negative result for a strong lemons effect in that market, which he attributed to warranties, dealer reputations and the fact that some sellers (fleets, rental companies) have reasons to sell that are not quality. Genesove (1993) looked at wholesale used-car auctions in the United States, where dealers trade with one another and quality is still in part private; he found that auction prices did respond to observable quality and that dealer-sellers with a reputation for good cars received a premium. The institutions that the theory says should mitigate adverse selection — warranties, reputation, certification — are present in the data, and they do some of the work.

Insurance has a cleaner test because the “quality” is the subsequent claim, which the researcher eventually observes. Chiappori and Salanié (2000), using French automobile insurance in 1989–1990, tested the prediction that, within a risk class, coverage and claims should be positively correlated if adverse selection (or moral hazard) is present. They found no such correlation in their sample of young drivers, a result they read as evidence that the French regulatory classification already captured most of the private information. Einav, Finkelstein and Cullen (2010), by contrast, used variation in employer-provided health-insurance prices in the United States to estimate the demand and cost curves of an insured pool, and found a downward-sloping average-cost curve: the marginal enrollees at a higher premium were cheaper, which is the adverse-selection prediction. The welfare cost of adverse selection in their setting was positive but modest relative to the mechanical cost of the subsidies being studied. Hendren (2013) showed that people who are rejected by US long-term-care, disability and life insurers have, in later data, substantially higher costs — private information that the market responds to by shutting down, which is Akerlof’s corner solution rather than a mildly distorted interior.

The empirical literature, then, does not say that adverse selection is everywhere or that it is nowhere. It says that the mechanism is identifiable when the researcher can see the hidden type *ex post*, that institutions (classification, mandates, reputation) move the outcome a long way, and that the welfare numbers vary by market. Those are the right conclusions to carry into the models of the next chapters, which take adverse selection as given and ask how signalling, screening and public mandates reshape it.

## Where this leads

If the uninformed side cannot tell types apart, the informed side sometimes can *make* itself told. Education, warranties, deductibles and debt–equity ratios are all potential **signals**: actions that are cheaper for good types and that therefore convey information in equilibrium. That is [[information-economics/job-market-signalling]], Spence’s 1973 model, and it is a game of incomplete information in the sense of [[game-theory/signalling]]. Alternatively the uninformed side can offer a **menu** of contracts and let types reveal themselves by their choice — insurance contracts with different deductibles, mobile-phone tariffs, second-degree price discrimination. That is [[information-economics/screening]], and the competitive version is Rothschild and Stiglitz (1976).

When the information problem is an action taken after signing, not a type possessed before, the apparatus changes again: the contract has to provide incentives, and risk sharing is sacrificed to do it. That is [[information-economics/moral-hazard]]. And when the designer can choose the whole mapping from reports to allocations, rather than a single price or a single insurance contract, we are in [[information-economics/mechanism-design]] and, for the possibility of efficient trade, [[information-economics/efficient-mechanisms]].

::: history
George Akerlof wrote “The Market for Lemons: Quality Uncertainty and the Market Mechanism” as a graduate student in the late 1960s; it was rejected by several journals (including, on one account, for being “trivial”) before the *Quarterly Journal of Economics* published it in 1970. The applications he listed — used cars, health insurance for the elderly, employment of minority workers, credit in developing countries — were chosen to show that the mechanism was not a curiosity of automobile markets. Michael Rothschild and Joseph Stiglitz’s 1976 insurance paper, and Stiglitz and Andrew Weiss’s 1981 credit-rationing paper, made the same mechanism the organising idea of two large applied literatures. Akerlof, Spence and Stiglitz shared the 2001 Nobel Prize “for their analyses of markets with asymmetric information”.
:::

::: summary
- Asymmetric information is a gap in knowledge between the parties at the time of trade. Hidden information (adverse selection) is about types; hidden action (moral hazard) is about subsequent choices.
- In Akerlof’s lemons market the price determines the pool, the pool determines willingness to pay, and the two must coincide. With uniform quality on $[0, 2]$ and $k = 3/2$ they coincide only at zero: complete unravelling.
- A two-type used-car market unravels the good cars if and only if their share is below a threshold (one half, in [[#ex-hundred]]). Gains from trade on the withdrawn cars are lost.
- A floor on quality, a warranty, a reputation or a mandate can restore trade by truncating the pool from below or by forcing good types to stay in.
- The same fixed point governs insurance (the sick enrol, premiums rise, the healthy leave) and credit (higher interest rates attract riskier borrowers). Empirical work finds the mechanism in some markets and not in others; institutions matter.
:::

## Exercises

::: exercise Two-type threshold {level=1 check="1/3"}
Sellers value lemons at 1 and peaches at 2; buyers value lemons at $3/2$ and peaches at 3. A share $\lambda$ of cars are peaches. What is the smallest $\lambda$ at which a pooling equilibrium (both types selling) exists? (Enter the threshold as a fraction.)
::: solution
Pooling willingness to pay is $(1-\lambda)(3/2) + 3\lambda = 3/2 + (3/2)\lambda$. Peach owners sell only if this is at least 2:

$$
\frac32 + \frac32\lambda \ge 2 \quad\Rightarrow\quad \frac32\lambda \ge \frac12 \quad\Rightarrow\quad \lambda \ge \frac13.
$$

At $\lambda = 1/3$ buyers pay exactly 2 and peach owners are indifferent.
:::
:::

::: exercise Gains from trade {level=1 check="600"}
In the market of [[#ex-hundred]], 60 lemons and 40 peaches, compute the gains from trade lost because of asymmetric information. (Enter the lost surplus.)
::: solution
Public-quality surplus is $60\times 5 + 40\times 15 = 900$. Equilibrium surplus is $60\times 5 = 300$. The loss is $900 - 300 = 600$, the entire peach surplus.
:::
:::

::: exercise Uniform with a quality floor {level=1 check="2.25"}
Quality is uniform on $[1, 2]$, seller valuation $\theta$, buyer valuation $(3/2)\theta$. If all cars are offered, what is buyers’ willingness to pay? (Enter that number.)
::: solution
The average of a uniform $[1, 2]$ is $1.5$. Willingness to pay is $(3/2)\times 1.5 = 2.25$. Because $2.25 \ge 2 \ge \theta$ for every seller, all cars are indeed offered, and $p = 2.25$ is an equilibrium.
:::
:::

::: exercise A three-quality market {level=2}
There are three cars, of qualities 1, 2 and 3, one of each. Seller valuation is $\theta$, buyer valuation is $2\theta$. Buyers observe only the price and compete. Find the competitive equilibrium price and which cars trade. Compute gains from trade in equilibrium and under public quality.
::: hint
At a candidate price $p$, the cars with $\theta \le p$ are offered. Check $p$ just above 1, just above 2, and just above 3.
:::
::: solution
Buyer valuation is $2\theta$, so $k = 2$.

If all three cars are offered, average quality is 2 and willingness to pay is 4. The best seller requires 3, and $4 > 3$, so all three will sell at a competitive price of 4. Gains from trade are $(2-1)\times(1+2+3) = 6$, the same as under public quality (where each car $\theta$ generates surplus $\theta$).

Because $k = 2$ is large enough relative to the quality spread, there is no unravelling. (If instead $k$ were $5/4$, all-trade willingness to pay would be $(5/4)\times 2 = 2.5 < 3$, the quality-3 car would withdraw, and one would then check the two-car pool.)
:::
:::

::: exercise Insurance participation {level=2}
A household has $u(w) = \sqrt{w}$, wealth 100 and a possible loss of 64. The probability of loss is $p = 1/4$, known to both sides. An insurer offers full cover at the fair premium. Compute the household’s expected utility with and without the insurance, and confirm that it buys.
::: solution
Fair premium is $(1/4)\times 64 = 16$. Insured wealth is 84 for sure, utility $\sqrt{84} \approx 9.165$. Uninsured expected utility is

$$
\frac34 \sqrt{100} + \frac14 \sqrt{36} = \frac34 \times 10 + \frac14 \times 6 = 7.5 + 1.5 = 9.
$$

Because $9.165 > 9$, the household buys. The difference is the value of eliminating the risk at fair odds, a consequence of concavity of $u$ (Jensen’s inequality), as in [[microeconomics/uncertainty]].
:::
:::

::: exercise Credit break-even {level=2 check="1.6"}
In the credit-market application, safe and risky borrowers are equal in number, safe projects return 1.4 for sure, risky projects return 2.2 with probability $1/2$ (else 0), and the bank’s cost of funds is 1.2. If both types borrowed, what common repayment $D$ would let the bank break even? (Enter $D$.)
::: solution
Expected repayment on a pooled book is $\tfrac12 D + \tfrac12 \cdot \tfrac12 D = \tfrac34 D$. Set $\tfrac34 D = 1.2$ to obtain $D = 1.6$. This exceeds the safe type’s return of 1.4, so the pooled book cannot actually form.
:::
:::

::: exercise Interior unravelling {level=3}
Quality $\theta$ is uniform on $[0, 1]$, seller valuation is $\theta$, buyer valuation is $k\theta$ with $1 < k < 2$. Show that the unique equilibrium is no trade. Then suppose a public inspection, at cost $c$ paid by the seller, reveals $\theta$ and lets the seller trade at $k\theta$. For which $c$ will the owner of a car of quality $\theta$ choose to inspect? Is there a quality level that inspects and a level that does not? Comment on whether inspection restores efficiency.
::: hint
The uninspected pool, if it exists, is still a lemons market with some upper bound $\hat\theta$.
:::
::: solution
Without inspection, $\mu(p) = p/2$ for $p \in (0, 1]$, and $k\mu(p) = (k/2)p < p$ because $k < 2$. So no $p > 0$ is an equilibrium, as in [[#prop-unravel]].

With inspection, a type-$\theta$ seller who inspects receives $k\theta - c$ (buyers compete, so the price is the buyer valuation) and will inspect if $k\theta - c \ge \theta$, i.e. if $\theta \ge c/(k-1)$. Types below $c/(k-1)$ do not inspect. If those types then try to sell uninspected, they are in a lemons market with support $[0, c/(k-1)]$, which unravels for the same reason as the original market. So they do not sell.

Inspection therefore restores trade only for $\theta \ge c/(k-1)$, and only at the cost $c$ per such car. Gains from trade on those cars are $(k-1)\theta - c \ge 0$, so the inspection decision is privately and socially correct *conditional on inspection being the only way to trade*. But types just below the cutoff, for whom $(k-1)\theta$ is positive but smaller than $c$, are shut out even though gains from trade exist. A cheaper inspection, a warranty, or a compulsory disclosure rule would recover some of that surplus. This is a first look at signalling: inspection is a costly action that good types take to reveal themselves. The next chapter studies the same idea when the “inspection” is a year of education.
:::
:::

::: exercise Deadweight loss as a function of $\lambda$ {level=3}
In a two-type lemons market, lemons have seller value $s_L$ and buyer value $b_L$, peaches $s_H$ and $b_H$, with $b_L > s_L$, $b_H > s_H$, and $b_L < s_H$ (so a buyer of unknown quality will not pay a peach owner’s reservation unless the pool is good enough). A share $\lambda$ are peaches. Write the equilibrium gains from trade as a function of $\lambda$, and the public-quality gains. For the numbers of [[#ex-hundred]] ($s_L = 10$, $b_L = 15$, $s_H = 30$, $b_H = 45$), sketch the deadweight loss as a function of $\lambda \in [0, 1]$.
::: hint
Find the threshold $\lambda^*$ at which pooling begins, as in the first exercise.
:::
::: solution
Public-quality gains, per car, are $(1-\lambda)(b_L - s_L) + \lambda(b_H - s_H)$.

Pooling is an equilibrium when $(1-\lambda)b_L + \lambda b_H \ge s_H$, i.e. $\lambda \ge \lambda^* = (s_H - b_L)/(b_H - b_L)$. For $\lambda \ge \lambda^*$ all cars trade and equilibrium gains equal public-quality gains. For $\lambda < \lambda^*$ only lemons trade and equilibrium gains are $(1-\lambda)(b_L - s_L)$. Deadweight loss is then $\lambda(b_H - s_H)$: the entire peach surplus.

For [[#ex-hundred]], $\lambda^* = (30-15)/(45-15) = 15/30 = 1/2$. Deadweight loss is $15\lambda$ per car (or $15$ times the number of peaches) when $\lambda < 1/2$, and $0$ when $\lambda \ge 1/2$. It jumps discontinuously to zero at $\lambda = 1/2$. That jump is the discrete-type analogue of Akerlof’s unravelling: a small increase in the share of peaches, once it crosses the threshold, brings all the peaches back into the market at once.
:::
:::

::: exercise Expected quality and the reverse hazard {level=3}
Let $\theta$ have distribution $F$ on $[0, \overline{\theta}]$ with density $f$, and let $\mu(p) = \E[\theta \mid \theta \le p]$. Show that

$$
\mu'(p) = \frac{f(p)}{F(p)}\bigl(p - \mu(p)\bigr).
$$

Hence $\mu(p) < p$ whenever $F(p) \in (0, 1)$. Using this, show that if $k \le 1$ there is never trade in the lemons market of [[#def-lemons]] (even though, if $k < 1$, there would also be no trade under public quality). Give an interpretation of $f(p)/F(p)$.
::: solution
By definition $\mu(p) = \bigl(\int_0^p t f(t)\,dt\bigr)/F(p)$. Differentiating the quotient,

$$
\mu'(p) = \frac{p f(p) F(p) - f(p) \int_0^p t f(t)\,dt}{F(p)^2} = \frac{f(p)}{F(p)}\bigl(p - \mu(p)\bigr).
$$

The factor $p - \mu(p)$ is positive for $p$ in the interior of the support because $\mu(p)$ is an average of numbers $\le p$, not all equal to $p$. Thus $\mu(p) < p$. Buyers pay $k\mu(p) \le \mu(p) < p$ if $k \le 1$, so no $p > 0$ can be an equilibrium. (If $k < 1$, public quality would not produce trade either, because $k\theta < \theta$ for every $\theta$; the interesting case in this chapter is $k > 1$, in which public quality *would* produce trade.)

The ratio $f(p)/F(p)$ is the **reverse hazard rate**. It is the density of quality at the marginal seller, relative to the mass already in the pool, and it governs how fast average quality improves as the price brings in the next seller. Distributions with a decreasing reverse hazard rate (the uniform, the exponential, many others) have $\mu(p)/p$ decreasing, which is the condition used in [[#prop-sufficient]].
:::
:::
