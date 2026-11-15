An insurer cannot tell a careful driver from a reckless one, but it can offer two contracts: a cheap policy with a large deductible, and an expensive policy that covers everything. Drivers then sort themselves. The careful choose the deductible; the reckless choose full cover. The menu does the informing. That is **screening**: the uninformed party moves first, offering a contract or a menu, and the informed party reveals a type by the choice she makes.

Screening is the other side of the hidden-information problem. In [[information-economics/job-market-signalling]] the worker chose education and employers bid. Here the insurer, the telephone company or the software vendor posts the menu and the buyer picks. The mathematics is incentive compatibility plus a participation constraint, and the recurring results are three: no distortion at the top, a downward distortion at the bottom, and an information rent paid to the high type. Competitive screening, in the Rothschild–Stiglitz insurance market, adds a fourth: pooling cannot survive, and even the candidate separating equilibrium may fail to exist.

## Menus and self-selection

::: definition Screening {#def-screening}
A **screening** problem is a hidden-information problem in which the uninformed party offers a **menu** of contracts $\{C_\theta\}$ and the informed party, of privately known type $\theta$, chooses one. The menu is **incentive-compatible** if type $\theta$ prefers $C_\theta$ to $C_{\theta'}$ for every $\theta'$, and it satisfies **participation** if each type prefers her contract to the outside option. A **direct** menu has one contract per type; by the revelation principle of [[information-economics/mechanism-design]], it is enough to study direct incentive-compatible menus.
:::

The leading applications are insurance (Rothschild and Stiglitz 1976), monopoly nonlinear pricing and quality choice (Mussa and Rosen 1978; Maskin and Riley 1984), and second-degree price discrimination more generally ([[industrial-organisation/monopoly-pricing]]). The same template covers a regulator who does not know a firm’s cost and offers a menu of price–quantity pairs (Baron and Myerson 1982; Laffont and Tirole).

Two properties of preferences make screening possible. **Single crossing**, as in [[information-economics/job-market-signalling#def-single-crossing]], ranks the slopes of indifference curves by type, so that a steeper contract can be aimed at one type without being stolen by the other. **Monotonicity** of the allocation — more cover for higher-risk types, more quantity for higher-demand types — then follows from incentive compatibility. Without single crossing the designer cannot count on local constraints, and the problem is much harder.

## Competitive insurance: Rothschild–Stiglitz

A household has wealth $W$ and faces a loss $L < W$ with probability $p$. Utility $u$ is strictly increasing, strictly concave and twice differentiable. There are two types, $p_H > p_L$, in proportions $\lambda_H$ and $\lambda_L = 1 - \lambda_H$. Insurers are risk-neutral, competitive, and offer contracts $C = (W_n, W_a)$ that specify wealth in the no-loss and loss states. A contract’s premium and indemnity are recoverable from those two numbers: the endowment is $(W, W-L)$, so premium $\pi = W - W_n$ and indemnity $\beta = W_a - (W - L - \pi)$.

::: definition Rothschild–Stiglitz market {#def-rs}
A **Rothschild–Stiglitz insurance market** has free entry of risk-neutral insurers and two privately known risk types. A set of contracts is an **equilibrium** if (i) every contract that is offered makes non-negative expected profit, given the types who buy it, and (ii) there is no additional contract that, if offered, would attract a non-empty set of buyers and make a strictly positive expected profit. Households buy at most one contract and otherwise remain at the endowment.
:::

Zero-profit contracts for type $p$ lie on the line $(1-p)W_n + p W_a = W - pL$: expected wealth equals the expected endowment. Full insurance is the point on that line with $W_n = W_a$. Fair full insurance for type $p$ is $W_n = W_a = W - pL$. High-risk indifference curves are steeper than low-risk ones in $(W_n, W_a)$-space, because a high-risk type is more willing to give up no-loss wealth for loss-state wealth: that is single crossing.

::: proposition No pooling equilibrium {#prop-no-pooling}
If both types have strictly convex preferences, no pooling contract is an equilibrium in the Rothschild–Stiglitz market.
:::

::: proof
Suppose a pooling contract $C$ is bought by both types and makes non-negative profit. Zero profit on the pooled book means $C$ lies on or below the pooled zero-profit line, whose slope is minus $(1-\bar p)/\bar p$, with $\bar p = \lambda_H p_H + \lambda_L p_L$. Through $C$ the high-risk indifference curve is steeper than the low-risk one. There is therefore a nearby contract $C'$ — a little more $W_n$, a little less $W_a$ — that the low-risk type strictly prefers to $C$ and the high-risk type strictly prefers $C$ to. Offering $C'$ cream-skims the low-risk types. Because $C'$ is close to $C$ and $C$ was not above the pooled zero-profit line, $C'$ can be placed below the *low-risk* zero-profit line, so it makes a strictly positive profit when bought only by low-risk types. This contradicts equilibrium condition (ii).
:::

Cream-skimming is the competitive version of Akerlof’s withdrawal of peaches. The rival does not wait for the good risks to leave; it picks them off with a contract aimed at them. Compulsory pooling — a mandate that every contract be the same, or a public scheme that covers everyone — is a way of forbidding this deviation. Whether that is desirable depends on the welfare comparison below, and on a value judgement about redistribution between types that the positive model does not make.

::: example Cream-skimming a pooled premium {#ex-cream}
Households have $W = 100$, $L = 80$, $u(w) = \ln w$, $p_H = 1/2$, $p_L = 1/4$, in equal numbers. A single insurer offers full cover at the pooled fair premium of 30, so both types have wealth 70 for sure. Construct a partial-cover contract that the low-risk type prefers to $(70, 70)$ and the high-risk type does not, and verify that it makes a profit if only low-risk types buy it.
::: solution
The pooled contract gives both types $u = \ln 70 \approx 4.2485$. Consider a contract with premium 7 and indemnity 24: wealth is $W_n = 93$, $W_a = 37$. Expected wealth for a low-risk type is $0.75\times 93 + 0.25\times 37 = 79$, so expected profit per low-risk buyer is $80 - 79 = 1$.

Low-risk expected utility at $(93, 37)$:

$$
0.75 \ln 93 + 0.25 \ln 37 \approx 0.75\times 4.533 + 0.25\times 3.611 \approx 3.400 + 0.903 = 4.303,
$$

which exceeds $\ln 70 \approx 4.248$. High-risk expected utility:

$$
0.5 \ln 93 + 0.5 \ln 37 \approx 0.5\times 4.533 + 0.5\times 3.611 = 4.072,
$$

which is less than $\ln 70 \approx 4.248$. The low-risk type switches; the high-risk type stays. The new contract makes a profit of 1 per low-risk buyer, and the original pooled contract, now bought only by high-risk types, makes a loss (it was priced at 30, but high-risk fair is 40). Cream-skimming breaks the pool and bankrupts the pooled contract.
:::
:::

The candidate that remains is **separating**. High-risk types are offered their fair full-insurance contract; low-risk types are offered the best fair contract that high-risk types will not steal.

::: proposition Rothschild–Stiglitz separating pair {#prop-rs-sep}
If a competitive equilibrium exists, it is the pair $(C_H, C_L)$ in which $C_H$ is fair full insurance for the high-risk type, $C_L$ is on the low-risk zero-profit line, and the high-risk type is indifferent between $C_H$ and $C_L$. Low-risk types are strictly underinsured at $C_L$. This pair is an equilibrium if and only if no pooling contract (near $C_L$) can attract both types and make a non-negative profit, which fails when $\lambda_L$ is sufficiently large.
:::

::: proof
High-risk types must be fully insured: if $C_H$ were partial, a rival could offer a contract with a little more cover at a price still profitable given only high-risk buyers, and those buyers would take it. Competition then drives $C_H$ to the fair full-insurance point. Low-risk types cannot be offered any contract that high-risk types prefer to $C_H$, so $C_L$ cannot lie above the high-risk indifference curve through $C_H$. Competition among insurers for low-risk types pushes $C_L$ along that curve until it hits the low-risk zero-profit line. Single crossing puts that intersection to the north-west of $C_H$: more $W_n$, less $W_a$, hence underinsurance.

If $\lambda_L$ is large, the pooled zero-profit line passes close to the low-risk zero-profit line. A contract just below the pooled line, between the two types’ indifference curves through $(C_H, C_L)$, then attracts both types and makes a profit, breaking the separating pair. If $\lambda_L$ is small, the pooled line is close to the high-risk line and no such contract exists.
:::

Existence can therefore fail. The market does not settle on pooling (illegal as an equilibrium) and cannot defend separation (broken by a cross-subsidy). Wilson (1977), Miyazaki (1977) and Riley (1979) proposed alternative equilibrium concepts in which incumbents react to cream-skimming, and those concepts restore existence, typically at a pair in which high-risk types are cross-subsidised. The Rothschild–Stiglitz paper left the non-existence standing as a result: a competitive insurance market with hidden types may have no equilibrium in the ordinary sense.

::: example The separating pair with logarithmic utility {#ex-rs-numbers}
Take the households of [[#ex-cream]]: $W = 100$, $L = 80$, $u = \ln w$, $p_H = 1/2$, $p_L = 1/4$. Compute $C_H$. Then find the low-risk indemnity $\beta$ such that $C_L$ is zero-profit for low-risk types and the high-risk type is indifferent between $C_H$ and $C_L$. Report wealths to two decimals and confirm that the low-risk type prefers $C_L$ to $C_H$ and to remaining uninsured.
::: solution
High-risk fair full insurance: premium $p_H L = 40$, wealth $60$ in both states. $C_H = (60, 60)$, utility $\ln 60 \approx 4.0943$.

Low-risk zero profit: premium $\pi = (1/4)\beta$. Wealths $W_n = 100 - \beta/4$, $W_a = 20 + 3\beta/4$. High-risk indifference:

$$
\tfrac12 \ln\bigl(100 - \beta/4\bigr) + \tfrac12 \ln\bigl(20 + 3\beta/4\bigr) = \ln 60.
$$

Numerical solution gives $\beta \approx 24.46$, $\pi \approx 6.11$, so $C_L \approx (93.89, 38.34)$. High-risk utility at $C_L$ equals $\ln 60$ by construction. Low-risk utility at $C_L$ is

$$
\tfrac34 \ln 93.89 + \tfrac14 \ln 38.34 \approx 4.318,
$$

against $\ln 60 \approx 4.094$ at $C_H$ and against uninsured expected utility $\tfrac34 \ln 100 + \tfrac14 \ln 20 \approx 4.203$. The low-risk type strictly prefers $C_L$ to both alternatives. She is far from full insurance (which would be $(80, 80)$ at her fair odds): the high-risk incentive constraint is what rations her cover.
:::
:::

::: widget plot
f: 120-x; 320-3*x; x
x: 55, 100
y: 15, 80
labels: \text{H zero-profit}; \text{L zero-profit}; \text{full insurance}
points: 100,20; 60,60; 80,80; 93.89,38.34
caption: State-contingent wealth $(W_n, W_a)$. The endowment is $(100, 20)$; high-risk fair full insurance is $(60, 60)$; low-risk fair full insurance is $(80, 80)$. The Rothschild–Stiglitz $C_L \approx (93.89, 38.34)$ sits on the low-risk zero-profit line (slope $-3$) where a high-risk indifference curve through $(60, 60)$ would hit it. Drag along the horizontal axis to see how a move toward more $W_n$ (less cover) runs along that line.
:::

::: quiz
In a Rothschild–Stiglitz market, high-risk households in the candidate equilibrium
- [ ] are underinsured, so that low-risk households will not mimic them
- [x] are fully insured at fair odds, and it is the low-risk households who are underinsured
- [ ] buy the same contract as low-risk households, because competition forces pooling
- [ ] are refused cover, as in Akerlof’s unravelling
::: solution
Competition for high-risk types, who are willing to pay for cover, drives them to fair full insurance. The binding constraint is the high-risk type’s incentive not to steal the low-risk contract, so it is the low-risk type who is rationed. Pooling is not an equilibrium, and high-risk types are not driven out: they are the ones the market fully serves.
:::
:::

## Monopoly screening and information rents

A monopolist who faces hidden types does not have to worry about cream-skimming rivals, and that changes the menu. The textbook quality model of Mussa and Rosen (1978) is the cleanest computation. Buyers have type $\theta \in \{\theta_L, \theta_H\}$, with $\theta_H > \theta_L > 0$ and a share $\lambda$ of high types. A buyer of type $\theta$ who takes quality $q$ at price $P$ gets $\theta q - P$; the outside option is 0. The monopolist’s cost is $c(q) = q^2/2$. (Quantity, or the number of units, can replace quality: the mathematics is the same.)

Under complete information the monopolist would set $q_\theta = \theta$ (marginal cost $q$ equal to $\theta$) and extract the whole surplus with $P_\theta = \theta \cdot q_\theta = \theta^2$. Profits would be $\theta^2/2$ per type.

With hidden types the high type can pretend to be low. If the low type is offered $(q_L, P_L)$, the high type’s payoff from taking that pair is $\theta_H q_L - P_L$, and incentive compatibility requires that her own pair $(q_H, P_H)$ do at least as well. The extra payoff she can command is her **information rent**.

::: proposition No distortion at the top {#prop-ndat}
In the two-type monopoly screening problem with quasi-linear utility $\theta q - P$, cost $c(q)$ strictly convex, and single crossing, the profit-maximising incentive-compatible menu has:

1. **No distortion at the top**: $c'(q_H) = \theta_H$, the complete-information quality.
2. **Downward distortion at the bottom**: $c'(q_L) = \theta_L - \frac{\lambda}{1-\lambda}(\theta_H - \theta_L)$, hence $q_L$ below the complete-information level (and possibly $q_L = 0$, exclusion).
3. A binding participation constraint for the low type and a binding incentive constraint for the high type. The high type’s information rent is $(\theta_H - \theta_L) q_L$.
:::

::: proof
The low type’s participation constraint binds: there is no reason to leave her any surplus, because that surplus would have to be matched, one-for-one, in the high type’s incentive constraint. The high type’s incentive constraint binds: $P_H = \theta_H q_H - (\theta_H - \theta_L)q_L$, after substituting the low type’s binding IR $P_L = \theta_L q_L$. (The low type’s incentive constraint is slack under single crossing, at the solution we obtain.) The monopolist’s profit is then

$$
(1-\lambda)\bigl(\theta_L q_L - c(q_L)\bigr) + \lambda\bigl(\theta_H q_H - c(q_H) - (\theta_H - \theta_L)q_L\bigr).
$$

Pointwise maximisation in $q_H$ gives $c'(q_H) = \theta_H$. Pointwise maximisation in $q_L$ gives

$$
(1-\lambda)\bigl(\theta_L - c'(q_L)\bigr) - \lambda(\theta_H - \theta_L) = 0,
$$

which is the stated formula. The coefficient of $q_L$ is the low type’s **virtual valuation** $\theta_L - \frac{\lambda}{1-\lambda}(\theta_H - \theta_L)$: her contribution to profit, net of the rent she generates for the high type. If that virtual valuation is negative, $q_L = 0$ and the low type is excluded.
:::

The formula is worth reading slowly. Raising $q_L$ has a direct benefit — the low type is willing to pay for quality — and an indirect cost — every extra unit of $q_L$ raises the high type’s rent by $\theta_H - \theta_L$. When high types are common ($\lambda$ large), the indirect cost dominates and the monopolist may shut out the low type altogether, even though $c'(0) < \theta_L$ and gains from trade with her exist. That is a hidden-information inefficiency, the monopoly analogue of Akerlof’s lost peach trades.

::: example A quality menu {#ex-mussa}
Let $\theta_L = 2$, $\theta_H = 3$, $\lambda = 1/2$ and $c(q) = q^2/2$. Compute the complete-information qualities and prices, then the second-best menu of [[#prop-ndat]]. Report the high type’s rent and the monopolist’s profit in both regimes.
::: solution
Complete information: $q_L = 2$, $q_H = 3$, $P_L = 4$, $P_H = 9$. Cost is $2$ and $4.5$. Profit per consumer is $\tfrac12(4-2) + \tfrac12(9-4.5) = 1 + 2.25 = 3.25$. Rents are zero.

Second best: $q_H = 3$ still. The low type’s virtual valuation is $2 - \frac{1/2}{1/2}(1) = 1$, so $q_L = 1$. Prices: $P_L = \theta_L q_L = 2$, and

$$
P_H = 3\cdot 3 - (3-2)\cdot 1 = 9 - 1 = 8.
$$

The high type’s rent is $3\cdot 3 - 8 = 1$, which equals $(\theta_H - \theta_L)q_L$. Profit is

$$
\tfrac12\bigl(2 - \tfrac12\bigr) + \tfrac12\bigl(8 - \tfrac92\bigr) = \tfrac12\cdot 1.5 + \tfrac12\cdot 3.5 = 0.75 + 1.75 = 2.5.
$$

The missing $0.75$ is the sum of the rent left to the high type ($0.5$ in expectation) and the efficiency loss on the low type (quality 1 rather than 2, a surplus loss of $0.5$ per low type, hence $0.25$ in expectation).
:::
:::

::: widget plot
f: 2*x - 0.5*x*x; 3*x - 0.5*x*x; x - 0.5*x*x
x: 0, 4
y: -1, 5
labels: \text{low-type surplus}; \text{high-type surplus}; \text{low virtual surplus}
caption: Gross surplus $\theta q - q^2/2$ for $\theta = 2$ and $\theta = 3$, and the low type’s virtual surplus $q - q^2/2$. Complete information maximises the first two curves ($q = 2, 3$). The second-best $q_L$ maximises the virtual curve ($q = 1$). Raise $\lambda$ in your head: the virtual curve shifts down, and $q_L$ falls. When it crosses below zero at $q = 0$, the low type is excluded.
:::

::: warning The “top” is the high type, not the high quantity the firm likes best
“No distortion at the top” means that the *highest* type’s allocation is efficient. It does not mean that the most expensive product in the shop is efficiently designed in some marketing sense, and it does not apply to the low type. A common mistake in problems is to distort $q_H$ “a little, to extract more from everyone”. That cannot help: the high type’s incentive constraint is already binding, and a local change in $q_H$ has no first-order effect on rent, which depends only on $q_L$. Distorting $q_H$ therefore burns surplus without reducing rent.
:::

The same arithmetic generates quantity discounts, two-part tariffs and the versioning of software. A monopolist who can offer a two-part tariff $(A, p)$ — a lump-sum $A$ plus a unit price $p$ — to a continuum of types will set $p$ above marginal cost, because a lower $p$ raises every type’s participation surplus and that surplus cannot all be captured by $A$ when types are hidden. With two types, the efficient two-part tariff for the high type (price equal to marginal cost, lump-sum extracting her surplus) must be supplemented by a distorted package for the low type, exactly as in [[#prop-ndat]].

::: application Mobile-phone tariffs
A network operator offers a “light” plan with a small monthly allowance and a high overage price, and a “heavy” plan with a large allowance and a lower overage price. Heavy users, whose $\theta$ is high, self-select into the heavy plan; light users take the light plan and are rationed. The operator does not need to observe usage in advance. The information rent is the surplus a heavy user would get if she took the light plan: the heavy plan must beat that, so the operator cannot extract everything from her. Nonlinear tariffs of this kind are the everyday form of [[#prop-ndat]]. They are also used in electricity (increasing-block prices), in software (student versions, “pro” versions) and in airlines (the Saturday-night-stay restriction of the 1980s and 1990s, which screened tourists from business travellers). The chapter on monopoly pricing in industrial organisation takes the same menus to a setting with market power as the primary object.
:::

## Evidence

The Rothschild–Stiglitz prediction — a positive correlation, within a risk class, between cover and claims — is the same correlation that Chiappori and Salanié (2000) tested in French automobile insurance and did not find, and that Einav, Finkelstein and Cullen (2010) found, in a different form, in US employer health insurance. The difference is in part institutional: French auto insurance in 1990 was tightly classified by observables, so the residual hidden type was small; US employer health plans offered a menu inside a firm, which is closer to the screening model. Einav and Finkelstein (2011), in a *Journal of Economic Perspectives* survey, summarise a sequence of papers in which the cost curve of the insured pool slopes the “adverse-selection” way in health insurance and long-term care, and is flatter in some annuity and life-insurance markets.

On monopoly screening, the qualitative predictions — quality bunches, missing low-end products, and versioning — are visible in software and in airline fare structures, but structural estimates of virtual valuations are rarer. Miravete (2002) estimated a menu of optional calling plans at a US telephone company and found that consumers sorted in the direction the theory predicts, with a substantial share apparently choosing a dominated plan, a reminder that the frictionless incentive-compatibility of the model is an idealisation. The right use of [[#prop-ndat]] is as a template for the *direction* of the distortion (bottom, not top; rent to the high type), not as a calibrated tariff.

## Where this leads

Screening and signalling are two extensive forms for the same incentive-compatibility constraint. Mechanism design, two chapters on, will drop the extensive form and keep the constraint: a social choice function is implementable if and only if it is incentive-compatible as a direct menu. The monopoly problem of this chapter *is* a mechanism-design problem with a principal who maximises profit rather than a planner who maximises surplus.

Hidden information is only half of the course. The next chapter turns to hidden *action*: the agent’s type is known, but her effort is not, and the contract has to pay for output in order to buy effort. The same words — incentive compatibility, information rent, second best — reappear with a different timing.

::: example No distortion at the top {#ex-ndat}
A monopolist screens two types, $\theta_H > \theta_L$, with $u=\theta q - P$ and cost $c(q)=q^2/2$. At the optimum the high type's quality satisfies $\theta_H = c'(q_H)=q_H$, so $q_H=\theta_H$. The low type is distorted down. If $\theta_H=4$ and $\theta_L=2$, and the high type's IC binds with $q_L=1$, what is $P_H$?
::: solution
High type's IR is slack; IC binds: $\theta_H q_H - P_H = \theta_H q_L - P_L$. Efficient $q_H=4$. The low type is typically held to IR: $2\cdot 1 - P_L = 0$, so $P_L=2$. Then $4\cdot 4 - P_H = 4\cdot 1 - 2$, $16 - P_H = 2$, $P_H=14$. High-type surplus is $16-14=2$, which equals the information rent $(\theta_H-\theta_L)q_L=2$. No distortion at the top: $q_H$ is efficient; the rent is delivered by leaving $q_L$ positive. If the monopolist excluded the low type ($q_L=0$), the rent would vanish and $P_H=16$, but she would lose the low-type profit. Which is better is a comparison of those two profits; the example only illustrates the binding IC.
:::
:::

::: history
Michael Rothschild and Joseph Stiglitz published “Equilibrium in Competitive Insurance Markets: An Essay on the Economics of Imperfect Information” in the *Quarterly Journal of Economics* in 1976. The non-existence result was as influential as the separating pair: it showed that the competitive model, taken literally, can fail to predict anything. Michael Mussa and Sherwin Rosen’s 1978 *Journal of Economic Theory* paper, “Monopoly and Product Quality”, and Eric Maskin and John Riley’s 1984 *RAND* paper on monopoly with incomplete information, gave the profit-maximising menu its modern shape — virtual valuations, no distortion at the top, exclusion of the bottom. James Mirrlees’s 1971 optimal-income-tax paper had already solved the continuum version of the same problem for a planner; the monopoly papers imported his first-order approach into industrial organisation. Stiglitz shared the 2001 Nobel Prize with Akerlof and Spence; Maskin shared the 2007 Prize with Hurwicz and Myerson.
:::

::: summary
- Screening: the uninformed party offers a menu; the informed party self-selects. Incentive compatibility and participation are the constraints.
- In a Rothschild–Stiglitz insurance market, pooling is broken by cream-skimming. The candidate equilibrium is separating: high-risk types fully insured at fair odds, low-risk types underinsured on their zero-profit line. That pair itself fails to exist when low-risk types are common.
- A monopolist screening two types distorts the low type’s allocation down (or excludes her), leaves the high type’s allocation efficient, and pays the high type an information rent $(\theta_H - \theta_L)q_L$.
- Virtual valuation = true valuation minus the rent cost imposed on higher types. Negative virtual valuation means exclusion.
- Empirically, the coverage–claims correlation that RS predicts is found in some insurance markets and not in others; menus in telecommunications and airlines sort in the predicted direction, with noise.
:::

## Exercises

::: exercise Fair full insurance {level=1 check="40"}
A high-risk household with $p_H = 1/2$ and loss $L = 80$ is offered fair full insurance. What is the premium? (Enter the premium.)
::: solution
Fair full insurance charges $p_H L = 40$.
:::
:::

::: exercise Virtual valuation {level=1 check="1"}
In [[#ex-mussa]], $\theta_L = 2$, $\theta_H = 3$, $\lambda = 1/2$. What is the low type’s virtual valuation? (Enter it.)
::: solution
$\theta_L - \frac{\lambda}{1-\lambda}(\theta_H - \theta_L) = 2 - 1\cdot 1 = 1$.
:::
:::

::: exercise Information rent {level=1 check="1"}
In the second-best menu of [[#ex-mussa]], what is the high type’s information rent? (Enter it.)
::: solution
$(\theta_H - \theta_L)q_L = 1 \times 1 = 1$. Alternatively, $\theta_H q_H - P_H = 9 - 8 = 1$.
:::
:::

::: exercise Exclusion {level=2}
Keep $\theta_L = 2$, $\theta_H = 3$, $c(q) = q^2/2$, but raise $\lambda$ to $3/4$. Compute $q_L$, $q_H$ and say whether the low type is served.
::: solution
Virtual valuation of the low type: $2 - \frac{3/4}{1/4}(1) = 2 - 3 = -1 < 0$. So $q_L = 0$: the low type is excluded. $q_H = 3$ still. The monopolist sells only to high types, at the complete-information pair $(q_H, P_H) = (3, 9)$, and makes profit $(3/4)\times 4.5 = 3.375$ per consumer in the population (or $4.5$ per actual buyer). Serving the low type would cost too much rent.
:::
:::

::: exercise Low-risk utility in RS {level=2}
Using the numbers of [[#ex-rs-numbers]], compute (to two decimal places) the low-risk type’s expected utility at $C_L$, at $C_H$, and when uninsured. Which does she choose?
::: solution
From [[#ex-rs-numbers]]: $C_L$ gives about $4.32$, $C_H$ gives $\ln 60 \approx 4.09$, uninsured about $4.20$. She chooses $C_L$. The ranking $C_L \succ \text{uninsured} \succ C_H$ is typical: the low-risk type wants some insurance, but not the expensive full cover designed for high-risk types.
:::
:::

::: exercise A continuum hint {level=2}
Suppose types are uniform on $[1, 2]$, utility $\theta q - P$, cost $c(q) = q^2/2$. The virtual valuation of type $\theta$ in a continuum is $\theta - (1-F(\theta))/f(\theta)$. Compute it, and find the lowest type that is served and the quality offered to type $\theta = 2$.
::: hint
For $F(\theta) = \theta - 1$ on $[1, 2]$, one has $f = 1$ and $1-F(\theta) = 2-\theta$.
:::
::: solution
Virtual valuation: $\theta - (2-\theta)/1 = 2\theta - 2$. This is negative for $\theta < 1$, zero at $\theta = 1$, and positive above. The lowest type $\theta = 1$ has virtual valuation 0, so she is served with $q = 0$ (a knife-edge: any smaller support would exclude a positive mass). Type $\theta$ is offered $q(\theta) = 2\theta - 2$ (set $c'(q) = q$ equal to virtual valuation), so $q(2) = 2$, which is efficient (no distortion at the top: the complete-information $q$ is $\theta = 2$). Type $\theta = 1.5$ gets $q = 1$, against a complete-information $q = 1.5$.
:::
:::

::: exercise Why $C_H$ is fully insured {level=3}
In the Rothschild–Stiglitz model, suppose toward a contradiction that an equilibrium contract $C_H$ bought only by high-risk types has $W_n \ne W_a$. Using the high-risk type’s indifference curve and the high-risk zero-profit line, show that a rival can offer a profitable contract that those types prefer. Which property of $u$ is essential?
::: hint
Fair full insurance is the unique tangency of a high-risk indifference curve with the high-risk zero-profit line.
:::
::: solution
The high-risk zero-profit line has slope $-(1-p_H)/p_H$. Strict concavity of $u$ implies that high-risk indifference curves are strictly convex and that the unique tangency with that line is at full insurance $W_n = W_a$. If $C_H$ is not that point but still on or below the line (non-negative profit), it lies on a lower indifference curve than the tangency. A small move toward full insurance, staying below the zero-profit line, raises high-risk utility and still makes a profit. Rivals would offer that move. Hence $C_H$ must be fair full insurance. (If $u$ were linear, indifference “curves” would be parallel to the zero-profit line and the whole line would be equivalent; risk aversion is essential.)
:::
:::

::: exercise Distortion and rent, a derivation {level=3}
A monopolist faces two types, $\theta_L < \theta_H$, shares $1-\lambda$ and $\lambda$, utility $\theta q - P$, cost $c(q)$ with $c', c'' > 0$. Write profit as a function of $(q_L, q_H)$ after imposing a binding low-type IR and a binding high-type IC. Differentiate with respect to $q_L$ and interpret the two terms. Confirm that $q_H$ satisfies $c'(q_H) = \theta_H$.
::: solution
Binding low IR: $P_L = \theta_L q_L$. Binding high IC: $\theta_H q_H - P_H = \theta_H q_L - P_L = (\theta_H - \theta_L)q_L$, so $P_H = \theta_H q_H - (\theta_H - \theta_L)q_L$. Profit:

$$
\Pi = (1-\lambda)\bigl(\theta_L q_L - c(q_L)\bigr) + \lambda\bigl(\theta_H q_H - c(q_H) - (\theta_H - \theta_L)q_L\bigr).
$$

The derivative in $q_L$ is $(1-\lambda)\bigl(\theta_L - c'(q_L)\bigr) - \lambda(\theta_H - \theta_L)$. The first term is the social surplus of a marginal unit of $q_L$, weighted by the mass of low types; the second is the marginal rent paid to every high type. Setting the derivative to zero is the virtual-valuation first-order condition of [[#prop-ndat]]. The derivative in $q_H$ is $\lambda\bigl(\theta_H - c'(q_H)\bigr)$, which is zero at $c'(q_H) = \theta_H$: rent does not depend on $q_H$, so there is no reason to distort it.
:::
:::

::: exercise A two-part tariff {level=3}
A monopolist with zero marginal cost faces two buyers, a light user with demand $q = 4 - p$ and a heavy user with demand $q = 8 - p$, in equal proportions. It can offer a single two-part tariff $(A, p)$: a lump-sum $A$ and a unit price $p$. (Both types then take it or the light user is excluded.) Find the profit-maximising $(A, p)$ that serves both types, and the profit-maximising tariff that serves only the heavy user. Which is better for the monopolist? Compare with complete-information two-part tariffs.
::: hint
Consumer surplus at price $p$ is the triangle $\tfrac12 (q^{\text{int}} - p) q(p)$ for linear demand with intercept $q^{\text{int}}$. $A$ is set to the light user’s surplus if both are to be served.
:::
::: solution
Demand $q = a - p$ gives surplus $\tfrac12 (a-p)^2$ at unit price $p$. Light: $a = 4$; heavy: $a = 8$.

*Serve both.* $A = \tfrac12(4-p)^2$, and each type’s quantity is $4-p$ and $8-p$. Profit is

$$
\Pi = A + p\cdot\tfrac12\bigl((4-p)+(8-p)\bigr) = \tfrac12(4-p)^2 + p(6-p).
$$

(The $\tfrac12$ in the second term is because we are reporting profit per consumer, averaging the two types: $\tfrac12 p(4-p) + \tfrac12 p(8-p) = p(6-p)$. And $A$ is paid by both, so it enters fully.) Expanding: $\tfrac12(16 - 8p + p^2) + 6p - p^2 = 8 + 2p - \tfrac12 p^2$. Derivative: $2 - p = 0$, so $p = 2$. Then $A = \tfrac12(2)^2 = 2$. Quantities are 2 and 6; average quantity is 4. Profit per consumer is $A + p \times 4 = 2 + 8 = 10$, which matches $8 + 2\cdot 2 - \tfrac12 \cdot 4 = 10$.

*Exclude the light user.* Set $p = 0$ (efficient for the heavy user) and $A = \tfrac12(8)^2 = 32$, paid only by the heavy type, who is half the population: profit per consumer $16$. (If $p > 0$ were charged to the heavy user alone, profit would fall by the usual monopoly deadweight loss.)

Exclusion earns 16, serving both earns 10, so the monopolist excludes. Under complete information it would offer two tariffs: $(A_L, p) = (8, 0)$ and $(A_H, p) = (32, 0)$, profit per consumer $\tfrac12 \times 8 + \tfrac12 \times 32 = 20$. Hidden types cost the monopolist $20 - 16 = 4$ in this example, and cost the light user her entire surplus of 8 (with probability $1/2$).
:::
:::
