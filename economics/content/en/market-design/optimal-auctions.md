Revenue equivalence says that, among efficient auctions with a zero-surplus lowest type, the seller cannot squeeze more expected money out of a format change. She can squeeze more out of a change in *who wins*. A seller with value $0$ who always awards the object to the highest bidder is leaving money on the table: some types are so low that the information rent they force the seller to pay, through every higher type, exceeds the surplus they themselves create. The instrument that excludes them is a **reserve price**. The calculation that finds the right reserve — and, more generally, the right allocation rule — is Myerson’s, and the object it maximises is not a price. It is **virtual surplus**.

This chapter stays inside independent private values and risk neutrality, so the envelope of [[market-design/revenue-equivalence]] applies. The seller is allowed to choose any incentive-compatible mechanism, including ones that sometimes keep the object or treat bidders asymmetrically. The revelation principle ([[information-economics/mechanism-design]]) lets us look only at truthful direct mechanisms. Numbers are illustrative unless sourced. Nothing here is a recommendation to set a reserve in any particular sale.

## Virtual values

A mechanism is a pair $(x, t)$: $x_i(v) \in [0,1]$ is the probability that $i$ gets the object when the type profile is $v$, with $\sum_i x_i(v) \le 1$, and $t_i(v)$ is $i$’s payment. Incentive compatibility and individual rationality ($U_i(\underline{v}) \ge 0$; we take the outside option to be zero) plus the envelope give

$$
T_i(v_i) = v_i X_i(v_i) - \int_{\underline{v}}^{v_i} X_i(s)\,\mathrm{d}s
$$

for each $i$, where $X_i(v_i) = \E_{v_{-i}}[x_i(v_i, v_{-i})]$ is $i$’s interim winning probability. The seller’s expected revenue is $\sum_i \E[T_i(v_i)]$. Substituting the envelope and changing the order of integration produces a remarkable rewriting.

::: theorem Myerson’s revenue formula {#thm-myerson}
In the symmetric or asymmetric IPV model with risk-neutral bidders, independent types $v_i \sim F_i$ on $[\underline{v}, \overline{v}]$, and $U_i(\underline{v}) = 0$, expected revenue equals expected **virtual surplus**

$$
\E\bigl[R\bigr] = \E\left[\sum_{i=1}^n \varphi_i(v_i)\, x_i(v)\right],
$$ {#eq-virtual-surplus}

where $i$’s **virtual value** (or virtual valuation) is

$$
\varphi_i(v_i) = v_i - \frac{1 - F_i(v_i)}{f_i(v_i)}.
$$ {#eq-virtual}
:::

::: proof
Take one bidder and drop the $i$. Expected payment is

$$
\E[T(v)] = \int_{\underline{v}}^{\overline{v}} \left(v X(v) - \int_{\underline{v}}^v X(s)\,\mathrm{d}s\right) f(v)\,\mathrm{d}v.
$$

The double integral is $\int_{\underline{v}}^{\overline{v}} X(s) \bigl(\int_s^{\overline{v}} f(v)\,\mathrm{d}v\bigr) \mathrm{d}s = \int_{\underline{v}}^{\overline{v}} X(s)\bigl(1-F(s)\bigr)\,\mathrm{d}s$. So

$$
\E[T] = \int_{\underline{v}}^{\overline{v}} X(v) \left(v - \frac{1-F(v)}{f(v)}\right) f(v)\,\mathrm{d}v = \E\bigl[\varphi(v) X(v)\bigr].
$$

Writing $X(v_i) = \E[x_i \mid v_i]$ and summing over bidders gives [[#eq-virtual-surplus]].
:::

Virtual value is *not* a value. It is the contribution of a type to expected revenue, once the information rent of every higher type has been netted out. The term $(1-F)/f$ is the inverse hazard rate; a type in a thin upper tail (small $1-F$ relative to $f$) has virtual value close to its true value, and a type in a thick tail is expensive to include because it forces rents on many types above it.

::: intuition Marginal revenue
Bulow and Roberts (1989, *Journal of Political Economy*) observed that $\varphi(v)$ is the **marginal revenue** of a monopolist who faces demand $q = 1 - F(p)$ and sells to a single buyer. Quantity $1-F(v)$ is the probability of a sale at price $v$; revenue is $v\bigl(1-F(v)\bigr)$; differentiating in $v$ and converting from price to quantity produces $v - (1-F)/f$. Myerson’s seller is a monopolist in probability-of-winning space, and virtual values are her marginal revenues.
:::

::: example Uniform and exponential virtual values {#ex-phi}
Compute $\varphi(v)$ for (i) $F(v) = v$ on $[0, 1]$; (ii) $F(v) = 1 - e^{-\lambda v}$ on $[0, \infty)$. For each, solve $\varphi(r) = 0$.
::: solution
(i) $f = 1$, $1-F = 1-v$, so $\varphi(v) = v - (1-v) = 2v - 1$. Then $\varphi(r) = 0$ at $r = 1/2$. (ii) $f = \lambda e^{-\lambda v}$, $1-F = e^{-\lambda v}$, so $(1-F)/f = 1/\lambda$ and $\varphi(v) = v - 1/\lambda$. Then $\varphi(r) = 0$ at $r = 1/\lambda$, the mean of the distribution. In both cases the root is *independent of $n$*.
:::
:::

::: widget plot
f: 2*x-1; x; 0
x: 0, 1
y: -1, 1
labels: \text{virtual value }2x-1; \text{value }x; \text{zero}
vlines: 0.5
caption: Uniform$[0,1]$ values. Virtual value $\varphi(v)=2v-1$ crosses zero at $v=1/2$. Types below $1/2$ have *negative* virtual value: including them costs the seller more in information rents than they contribute in surplus. The optimal reserve, derived below, is exactly that crossing.
:::

## Regularity and the optimal auction

The seller maximises [[#eq-virtual-surplus]] by choosing, for each realised profile $v$, an allocation $x(v)$ in the simplex $\sum x_i \le 1$, $x_i \ge 0$. If $\varphi_i$ is increasing (**regularity**), the pointwise maximum is simple: award the object to the bidder with the highest *virtual* value, provided that virtual value is positive; otherwise keep it.

::: definition Regularity {#def-regular}
A distribution $F_i$ is **regular** if $\varphi_i(v)$ is strictly increasing. Equivalently (where $f_i$ is log-concave, a sufficient condition), the inverse hazard rate $(1-F_i)/f_i$ does not rise too fast. Uniform, exponential, and normal truncated to a bounded interval are regular; some bimodal and some fat-tailed distributions are not.
:::

::: theorem Myerson’s optimal auction {#thm-optimal}
Suppose every $F_i$ is regular. The mechanism that maximises expected revenue among incentive-compatible, individually rational mechanisms awards the object to a bidder $i \in \arg\max_j \varphi_j(v_j)$ whenever $\max_j \varphi_j(v_j) \ge v_0$, and to the seller otherwise, breaking ties in any measurable way. Payments are then determined by the envelope (or, equivalently, by the critical virtual-value rivals that $i$ must beat). In the **symmetric** regular case this is a second-price (or English) auction with reserve $r^\star$ solving $\varphi(r^\star) = v_0$. If $v_0 = 0$, $\varphi(r^\star) = 0$.
:::

::: proof
Pointwise maximisation of $\sum \varphi_i(v_i) x_i(v)$ over the simplex yields the stated allocation, using regularity so that the implied $X_i$ is nondecreasing (hence implementable: Myerson’s lemma, that a nondecreasing $X_i$ is necessary and sufficient for implementability in one dimension, applies). The envelope then gives the unique payments with $U_i(\underline{v}) = 0$. In the symmetric case $\varphi_i = \varphi$ for all $i$, so $\arg\max \varphi(v_i) = \arg\max v_i$ and the positivity cutoff $\varphi(v) \ge v_0$ is a standard reserve $r^\star = \varphi^{-1}(v_0)$. A second-price auction with that reserve implements the allocation: the highest bidder wins if her bid is at least $r^\star$, and pays $\max(r^\star, \text{second bid})$.
:::

Three comments, before the calculations.

The optimal auction is typically **inefficient**. Types in $[\underline{v}, r^\star)$ are excluded even when they value the object more than the seller. That is the same inefficiency as monopoly: marginal revenue, not demand, is set to marginal cost.

The optimal auction in the symmetric regular case is **not a new format**. It is a familiar format with a well-chosen reserve. Format design and reserve design are not substitutes; once symmetry and regularity hold, format is a sideshow and the reserve is the instrument.

If bidders are **asymmetric**, $\varphi_i \neq \varphi_j$, and the highest virtual value need not belong to the highest value. The optimal auction then *favours the weak bidder*: a weak bidder with a middling value can have a higher virtual value than a strong bidder with a higher value, because including the strong bidder is more expensive in rents. This is the auction analogue of a monopolist charging less in the more elastic market. Efficiency and revenue part company.

::: example Optimal reserve, uniform, any $n$ {#ex-reserve-uniform}
Values uniform on $[0, 1]$, seller’s value $v_0 = 0$. Find $r^\star$. For $n = 2$, compute expected revenue at $r^\star$ and compare with $1/3$, the no-reserve figure.
::: solution
$\varphi(v) = 2v-1$, so $r^\star = 1/2$, independent of $n$. For $n = 2$, expected virtual surplus is

$$
\E[R] = 2 \int_{1/2}^1 (2v-1)\, v\,\mathrm{d}v = 2 \int_{1/2}^1 (2v^2 - v)\,\mathrm{d}v = 2\left[\tfrac23 v^3 - \tfrac12 v^2\right]_{1/2}^1
$$

$$
= 2\left(\bigl(\tfrac23-\tfrac12\bigr) - \bigl(\tfrac23\cdot\tfrac18 - \tfrac12\cdot\tfrac14\bigr)\right) = 2\left(\tfrac16 - \bigl(\tfrac1{12}-\tfrac18\bigr)\right) = 2\left(\tfrac16 + \tfrac1{24}\right) = 2\cdot\tfrac5{24} = \tfrac5{12}.
$$

The reserve raises expected revenue from $1/3 = 4/12$ to $5/12$. The extra $1/12$ is the value of sometimes keeping an object that would have sold at a price dragged down by a low second bid, net of the times both bids sit below $1/2$ and the sale is lost.
:::
:::

::: widget plot
f: (n-1)/(n+1) + x^n - (2*n/(n+1))*x^(n+1)
sliders: n=2:2:8:1
x: 0, 1
y: 0, 0.9
labels: \text{expected revenue}
hlines: 0.333; 0.417
caption: Uniform$[0,1]$ values, second-price (or first-price) with reserve $r$ on the horizontal axis. Expected revenue is $\frac{n-1}{n+1} + r^n - \frac{2n}{n+1} r^{n+1}$. For $n=2$ the peak is at $r=1/2$, height $5/12 \approx 0.417$; the no-reserve level is $1/3 \approx 0.333$. Raise $n$: the curve lifts, the peak stays at $1/2$, and the gain from the reserve shrinks. This is a theoretical expected-revenue function, not a forecast.
:::

The independence of $r^\star$ from $n$ is a uniform-and-exponential curiosity that is easy to misread. The *gain* from the reserve does depend on $n$: with many bidders the second-highest value is already high, and excluding the bottom of the support barely matters. In the figure, the $n = 8$ curve is almost flat near $r = 0$.

::: warning The reserve is not “half the highest possible bid”
For uniform$[0,1]$ the optimum happens to be $1/2$. That is $\varphi^{-1}(0)$, not a rule of thumb about “half the range”. For exponential values the optimum is the mean $1/\lambda$, which can sit anywhere. For $F(v) = v^a$ on $[0,1]$ one has $\varphi(v) = v - (1-v^a)/(a v^{a-1})$, and $r^\star$ solves that equal to zero; it is not $1/2$ unless $a = 1$. Setting a reserve at half the seller’s favourite estimate of the highest bid is a different, and typically suboptimal, policy.
:::

## Ironing, when regularity fails

If $\varphi$ is not increasing, pointwise maximisation of virtual surplus produces an $X$ that is not nondecreasing, hence not implementable. Myerson’s repair is **ironing**: replace $\varphi$ by its ironed version $\bar\varphi$, the derivative of the concavification of the cumulative virtual-surplus function, which is weakly increasing by construction. Where $\varphi$ wiggles, $\bar\varphi$ is flat, and the optimal mechanism randomises among the types in that interval. Ironing is the auction analogue of a monopolist who will not set two prices in a region of demand where marginal revenue is upward-sloping. We will not compute an ironed mechanism here; Krishna (2010, ch. 5) and Myerson’s original paper are the references. The applied moral is that without regularity the optimal “auction” may not look like an auction at all: it may pool types.

## Take-it-or-leave-it and the one-bidder case

With $n = 1$ the optimal mechanism is a posted price. Virtual surplus is $\varphi(v) x(v)$, maximised by selling if and only if $v \ge r^\star$. That is a take-it-or-leave-it offer at $r^\star$. For uniform$[0,1]$, $r^\star = 1/2$, the buyer accepts with probability $1/2$, and expected revenue is $1/4$. Adding a second bidder and keeping the same reserve raises expected revenue from $1/4$ to $5/12$; adding the second bidder *without* a reserve raises it from $1/4$ (if one naively posted $1/2$ to a single buyer) to $1/3$. Competition and a reserve are complements in this example, not substitutes: each is worth more when the other is present? Not quite — the reserve is worth $5/12-1/3 = 1/12$ with two bidders and $1/4-0 = 1/4$ with one bidder if the alternative is giving the object away, or $1/4 - 0$ versus a posted price. The clean comparison is: a second bidder is a powerful instrument, and a reserve remains strictly valuable even then.

::: example Posted price versus two-bidder auction {#ex-posted}
A seller with $v_0 = 0$ faces either one or two bidders with independent uniform$[0,1]$ values. Compute maximal expected revenue in each case, and the expected revenue of an efficient (no-reserve) two-bidder auction.
::: solution
One bidder: posted price $1/2$, expected revenue $1/4 = 0.250$. Two bidders, optimal (reserve $1/2$): $5/12 \approx 0.417$. Two bidders, no reserve: $1/3 \approx 0.333$. The second bidder, even without a reserve, is worth more than a reserve without a second bidder ($0.333-0.250 = 0.083$ versus the one-bidder posted-price revenue of $0.250$ compared with giving the object away). Combining both instruments reaches $0.417$.
:::
:::

::: example Two discrete types {#ex-two-types}
One bidder. Value is $v_L = 1$ with probability $2/3$ and $v_H = 2$ with probability $1/3$. The seller’s value is $0$. A posted price of $1$ sells always and raises $1$. A posted price of $2$ sells with probability $1/3$ and raises $2/3$. Which is better? Interpret in virtual values. (With one bidder a posted price is optimal among all mechanisms, by the same argument as above, so these two candidates exhaust the interesting options.)
::: solution
Price $1$ raises $1$; price $2$ raises $2/3$. The seller prefers to post $1$ and sell always. Virtual values: the low type has $\varphi_L = v_L - \frac{1-q_L}{q_L}(v_L - 0)$ in the discrete formula, or more carefully, the standard discrete virtual value of the high type is $\varphi_H = v_H - \frac{1-\pi}{\pi}(v_H - v_L)$ where $\pi = 1/3$ is the probability of high, so $\varphi_H = 2 - \frac{2/3}{1/3}(1) = 2 - 2 = 0$, and $\varphi_L = v_L = 1 > 0$. Both virtual values are non-negative, so both types are served and the price is $v_L = 1$. If the high type were rarer, $\varphi_H$ would go negative and the seller would exclude the low type (post $v_H$) in order not to leave a rent to the high type. Here the high type is common enough that exclusion is too costly.
:::
:::

::: widget montecarlo
mode: integral
f: 2*(2*x-1)*x
a: 0.5
b: 1
n: 2000
caption: Monte Carlo estimate of $2\int_{1/2}^1 (2x-1)x\,\mathrm{d}x = 5/12$, the expected revenue of the optimal auction with two uniform$[0,1]$ bidders. Increase the number of draws; the estimate settles near $0.417$, not near $1/3$. This is a numerical integral of virtual surplus, not a forecast of a sale.
:::

::: quiz
In the symmetric regular IPV model with seller value $0$, the revenue-maximising mechanism is
- [ ] a first-price auction with no reserve, because first-price “raises more”
- [x] a second-price (or first-price) auction with reserve $r^\star$ solving $\varphi(r^\star) = 0$
- [ ] a posted price equal to the expected highest value
- [ ] whichever format the bidders like least
::: solution
[[#thm-optimal]]: symmetry plus regularity reduce the optimal mechanism to a standard auction plus a reserve. Revenue equivalence then says first-price and second-price with that *same* reserve raise the same expected revenue. A posted price ignores competition when $n \ge 2$. “Bidders like least” is not the criterion.
:::
:::

## Asymmetric bidders and favouritism

When $F_A \neq F_B$, the ranking of virtual values can disagree with the ranking of values. A canonical illustration is a strong bidder (distribution $F_S$ that dominates $F_W$ in the hazard-rate order) and a weak bidder. At a common value $v$, $\varphi_W(v) > \varphi_S(v)$: the weak bidder’s inverse hazard is smaller, so she is cheaper to include. The optimal auction awards the object to the weak bidder in some profiles where the strong bidder has a higher value. One implementation is a second-price auction with a *bidder-specific* reserve, or with a bid subsidy for the weak bidder — the weak bidder wins if $b_W + \sigma \ge b_S$ and $b_W \ge r_W$. McAfee and McMillan (1989) and Myerson (1981, the original paper) develop this; the applied descendant is a procurement scoring rule that favours a domestic or small supplier. Whether a government *should* use that instrument is a separate, normative question involving efficiency, distribution and politics; the positive statement is that a revenue-maximising seller would.

## Evidence

Reserves in the field are common and rarely set by an estimate of $\varphi^{-1}(0)$. Auctioneers of art and wine often post a secret reserve around a low estimate; the mapping from $F$ to that number is not Myerson’s formula, and participation (which the IPV model with a known $n$ takes as given) may fall if the reserve is visible and high. Reiley (2006, *Economic Inquiry*) randomised public reserves in online auctions of collectible cards and found that higher reserves raised revenue per *sale* but reduced the chance of sale, with a net revenue effect that was positive at moderate reserves — the Myerson trade-off, qualitatively. Paarsch (1997, *Journal of Econometrics*) estimates structural models of timber auctions with reserves. Laboratory experiments (e.g. the induced-value sessions reported in Kagel and Levin’s handbook chapters) find that a theoretically optimal reserve raises revenue relative to no reserve, but by less than the risk-neutral prediction when bidders overbid in first-price.

A different empirical tradition estimates $F$ from observed bids and then computes the revenue of counterfactual reserves. Guerre, Perrigne and Vuong (2000, *Econometrica*) is the first-price estimator; applying it to timber, oil-lease and procurement data typically finds that observed reserves are below the Myerson benchmark — consistent with a seller who also values efficiency, or who fears deterring entry, or who does not maximise revenue in the Myerson sense.

Spectrum auctions ([[market-design/multi-unit-auctions]]) usually have reserve prices set by statute or by a consultant’s estimate of a downstream-market model, not by $\varphi^{-1}(0)$ from an IPV $F$. The 1994 FCC Auction 1 used a low opening bid rather than an aggressive Myerson reserve; participation and price discovery were the designers’ stated priorities (Cramton 1995, *Journal of Economics & Management Strategy*).

## Where this leads

Virtual values reappear as the seller’s objective in multi-unit and position auctions, and the same envelope produces the Myerson–Satterthwaite impossibility theorem when a buyer and a seller both have private values ([[information-economics/efficient-mechanisms]]). Common values ([[market-design/common-values]]) destroy the formula $\varphi = v - (1-F)/f$, because a bid now carries news about the object’s worth. Matching without money ([[market-design/stable-matching]]) has no virtual-value reserve: the designer’s constraint is stability and strategy-proofness, not revenue.

::: history
Roger Myerson’s “Optimal auction design” (*Mathematics of Operations Research*, 1981) is the source of virtual values, regularity, ironing and the optimal reserve. John Riley and William Samuelson, “Optimal auctions” (*American Economic Review*, 1981), derived the optimal reserve inside the smaller class of highest-bidder-wins auctions and showed that it solves a first-order condition equivalent to $\varphi(r) = v_0$ under symmetry. Jeremy Bulow and John Roberts, “The simple economics of optimal auctions” (*Journal of Political Economy*, 1989), translated virtual values into monopoly marginal revenue, which is how many applied economists now teach the result. Myerson shared the 2007 Nobel Memorial Prize with Leonid Hurwicz and Eric Maskin for the foundations of mechanism design.
:::

::: summary
- Expected revenue equals expected virtual surplus $\E[\sum \varphi_i(v_i) x_i(v)]$, with $\varphi_i(v) = v - (1-F_i(v))/f_i(v)$ ([[#thm-myerson]]).
- Under regularity, the optimal mechanism awards the object to the highest non-negative virtual value. In the symmetric case that is a standard auction with reserve $r^\star$ solving $\varphi(r^\star) = v_0$ ([[#thm-optimal]]).
- For uniform$[0,1]$ and $v_0 = 0$, $r^\star = 1/2$ for every $n$, and expected revenue with two bidders rises from $1/3$ to $5/12$. The *gain* from the reserve shrinks as $n$ grows.
- The optimal auction is typically inefficient: low types are excluded. With asymmetric bidders it also favours the weak bidder.
- If $\varphi$ is not increasing, ironing pools types. With one bidder the optimum is a posted price.
- Virtual value is marginal revenue, not a guess at “what the object is worth”. The reserve $1/2$ is not a general rule of thumb.
:::

## Exercises

::: exercise Uniform virtual value {level=1 check="0.6"}
Values uniform on $[0, 1]$. What is $\varphi(0.8)$? (Enter the virtual value as a decimal.)
::: solution
$\varphi(v) = 2v-1$, so $\varphi(0.8) = 0.6$.
:::
:::

::: exercise Exponential reserve {level=1 check="2"}
Values exponential with mean $2$ (so $\lambda = 1/2$), seller’s value $0$. What is the optimal reserve $r^\star$? (Enter the reserve.)
::: solution
$\varphi(v) = v - 1/\lambda = v - 2$, so $r^\star = 2$.
:::
:::

::: exercise One bidder, uniform {level=1 check="0.25"}
One bidder, uniform$[0, 1]$, seller’s value $0$. What is maximal expected revenue? (Enter it as a decimal.)
::: solution
Posted price $1/2$, accepted with probability $1/2$, revenue $\tfrac12 \cdot \tfrac12 = 0.25$.
:::
:::

::: exercise Revenue as a function of the reserve {level=2 check="5/12"}
Two bidders, uniform$[0, 1]$, second-price with reserve $r = 1/2$. Expected revenue equals $5/12$. Confirm this by enumerating the three regions (both below $1/2$; exactly one above; both above) rather than by integrating virtual surplus. (Enter $5/12$ as a fraction.)
::: hint
Probability both below $1/2$ is $1/4$, revenue $0$. Probability exactly one above is $1/2$, revenue $1/2$. If both are above $1/2$, values are like two independent uniform$[1/2, 1]$ draws and the seller receives the minimum.
:::
::: solution
$P(\text{both } < 1/2) = (1/2)^2 = 1/4$, revenue $0$. $P(\text{exactly one } \ge 1/2) = 2\cdot(1/2)\cdot(1/2) = 1/2$, and the winner pays the reserve $1/2$, contributing $(1/2)\cdot(1/2) = 1/4$ to expected revenue. $P(\text{both } \ge 1/2) = 1/4$. Conditional on that event the two values are i.i.d. uniform on $[1/2, 1]$, whose minimum $M$ has $\E[M \mid \text{both }\ge 1/2] = 1/2 + (1/2)\cdot(1/3) = 2/3$ (the minimum of two uniform$[0,1]$ is $1/3$, then affinely transformed). Contribution: $(1/4)\cdot(2/3) = 1/6$. Total: $0 + 1/4 + 1/6 = 3/12 + 2/12 = 5/12$.
:::
:::

::: exercise A power distribution {level=2}
Let $F(v) = v^2$ on $[0, 1]$ (density $f(v) = 2v$). Compute $\varphi(v)$ and the optimal reserve $r^\star$ for $v_0 = 0$. Is $r^\star$ larger or smaller than the uniform $1/2$?
::: hint
$(1-F)/f = (1-v^2)/(2v)$. Set $\varphi(r) = 0$ and solve a quadratic.
:::
::: solution
$\varphi(v) = v - (1-v^2)/(2v) = v - 1/(2v) + v/2 = (3/2)v - 1/(2v)$. Set $\varphi(r) = 0$: $(3/2)r = 1/(2r)$, so $3 r^2 = 1$, $r^\star = 1/\sqrt{3} \approx 0.577 > 1/2$. This $F$ puts more mass near $1$ than the uniform, so low types are relatively rarer and exclusion of a slightly larger bottom interval is worthwhile.
:::
:::

::: exercise Why the reserve does not fall with $n$ {level=2}
For uniform$[0, 1]$, $r^\star = 1/2$ for every $n$. Using the virtual-surplus objective, explain in two or three sentences why adding bidders does not change the cutoff, even though it changes expected revenue.
::: solution
The pointwise problem, given a realised profile, is: award to the highest $\varphi(v_i)$ if that number is positive. The positivity test $\varphi(v) \ge 0$ is a statement about a *single* bidder’s type and $F$, not about how many rivals she has. Adding bidders changes the distribution of the *highest* $\varphi$, and therefore expected revenue, but it does not change where $\varphi$ crosses zero. (What *does* change with $n$ is the cost of using a reserve that is *wrong*: with large $n$ a suboptimal reserve close to $0$ is almost costless.)
:::
:::

::: exercise An inefficient allocation {level=3}
Two bidders, uniform$[0, 1]$, optimal auction with reserve $1/2$. Compute the probability that the object is not sold. Compute the expected allocative loss relative to always awarding to the highest value, that is $\E[(Y_1 - 0)\mathbf{1}_{Y_1 < 1/2}]$.
::: hint
Not sold iff both values are below $1/2$. The loss is the highest value on that event.
:::
::: solution
$P(\text{not sold}) = (1/2)^2 = 1/4$. The highest of two uniforms, $Y_1$, has density $2y$ on $[0,1]$, so

$$
\E[Y_1 \mathbf{1}_{Y_1 < 1/2}] = \int_0^{1/2} y \cdot 2y\,\mathrm{d}y = 2\int_0^{1/2} y^2\,\mathrm{d}y = 2\cdot \frac{1}{3}\cdot\frac{1}{8} = \frac{1}{12}.
$$

With probability $1/4$ the seller keeps an object whose expected value to the higher bidder, *conditional on both being below $1/2$*, is $(1/12)/(1/4) = 1/3$. The unconditional expected efficiency loss is $1/12$. Expected revenue rises by $1/12$ relative to no reserve, which is a different $1/12$ (revenue, not surplus).
:::
:::

::: exercise Discrete virtual values and exclusion {level=3}
One bidder. Value $v_L = 1$ with probability $1-\pi$, $v_H = 3$ with probability $\pi$. Seller’s value $0$. For which $\pi$ is it optimal to post the price $3$ (exclude the low type)? Compute the discrete virtual value of the high type, $\varphi_H = v_H - \frac{1-\pi}{\pi}(v_H-v_L)$, and use the sign of $\varphi_L = v_L$ together with whether serving the low type is worth the rent it gives the high type.
::: hint
Posting $1$ raises $1$ always. Posting $3$ raises $3\pi$. Compare.
:::
::: solution
Posted price $1$ yields revenue $1$. Posted price $3$ yields $3\pi$. Exclusion of the low type is better iff $3\pi > 1$, i.e. $\pi > 1/3$. Equivalently: serving the low type yields extra surplus $v_L = 1$ with probability $1-\pi$, but forces a rent $v_H - v_L = 2$ on the high type (who would otherwise pay $3$ and now pays $1$). Net gain from inclusion: $(1-\pi)\cdot 1 - \pi\cdot 2 = 1-3\pi$. Include iff $1-3\pi \ge 0$, iff $\pi \le 1/3$. The cutoff $\pi = 1/3$ is where the high type becomes rare enough that the seller prefers to go after her full surplus and risk no sale. With two types, comparing the two posted prices *is* the optimal-mechanism calculation.
:::
:::

::: exercise Asymmetric virtual values {level=3}
Two bidders. Ava’s value is uniform on $[0, 1]$, so $\varphi_A(v) = 2v-1$. Ben’s value is uniform on $[0, 2]$, density $1/2$, $F_B(v) = v/2$ on $[0, 2]$, so $\varphi_B(v) = v - (2-v) = 2v-2$. (Check that formula.) At the profile $(v_A, v_B) = (0.8, 1.1)$, who has the higher value? Who has the higher virtual value? Whom does the optimal auction award the object to?
::: solution
$F_B(v) = v/2$, $f_B = 1/2$, $(1-F_B)/f_B = (1-v/2)/(1/2) = 2-v$, so $\varphi_B(v) = v - (2-v) = 2v-2$. Yes. At $(0.8, 1.1)$ Ben has the higher value ($1.1 > 0.8$). Virtual values: $\varphi_A(0.8) = 0.6$, $\varphi_B(1.1) = 2\cdot 1.1 - 2 = 0.2$. Ava has the higher virtual value, and it is positive, so the optimal auction awards the object to Ava. Ben is the strong bidder (his support reaches $2$); including him at $1.1$ is expensive in rents to his higher types, and the revenue-maximising seller favours Ava.
:::
:::

