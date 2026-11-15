In the last chapter a first-price auction and a second-price auction, fed the same independent private values, produced different bids and different prices in any one realisation — and the same expected revenue $1/3$ when two bidders drew uniformly from $[0, 1]$. That coincidence is not an artefact of the uniform distribution, and it is not restricted to those two formats. It is an **envelope** identity: once you know who wins as a function of the values, and how much the lowest type is asked to pay, you know every type’s expected payment, and therefore the seller’s expected revenue, without looking at the rest of the rules. This chapter states that identity as a theorem, checks it on the four classical auctions and on two less classical ones (all-pay, war of attrition), and then breaks it, assumption by assumption.

The result is the designer’s first tool, not the last. It says that, within a large class, *format does not matter for expected revenue*. Choosing a format to “raise more money” is then a waste of time — unless one of the assumptions fails, or unless the seller is allowed to change who wins, which is the subject of [[market-design/optimal-auctions]]. Most of the applied arguments in later chapters (risk-averse bidders prefer first-price, affiliated signals favour English, multi-unit uniform-price invites demand reduction) are arguments that a particular assumption of revenue equivalence is false.

Numbers are illustrative unless a source and date are attached. Nothing here is a recommendation to choose, run, or bid in any auction.

## The envelope of equilibrium payoffs

Fix the IPV environment of [[market-design/auction-formats#def-ipv]]: $n$ risk-neutral bidders, values drawn independently from a common $F$ on $[\underline{v}, \overline{v}]$ with density $f > 0$, payoffs $v_i - p_i$ for the winner and $-p_i$ more generally (payments may be asked of losers). A (direct) **mechanism** asks each bidder to report a value and then maps the report profile into a probability $x_i(v)$ that $i$ receives the object and a payment $t_i(v)$. By the revelation principle ([[information-economics/mechanism-design]]) it is enough to study incentive-compatible direct mechanisms. For the four classical auctions the “report” is encoded in the bid, and we work with bid functions rather than reports; the algebra is the same.

Write $X_i(z)$ for $i$’s **probability of winning** when she reports (or bids as if she had) $z$ and the others report truthfully, and $T_i(z)$ for her **expected payment** in that event. Her expected payoff at true value $v$ from reporting $z$ is

$$
u_i(z; v) = v\, X_i(z) - T_i(z).
$$ {#eq-u}

Incentive compatibility requires that $z = v$ maximise this, so the **equilibrium payoff** of type $v$ is $U_i(v) := u_i(v; v)$.

::: proposition Envelope formula for auction payoffs {#prop-envelope}
Suppose $X_i$ is nondecreasing and $U_i$ is absolutely continuous. Then incentive compatibility implies

$$
U_i(v) = U_i(\underline{v}) + \int_{\underline{v}}^{v} X_i(t)\,\mathrm{d}t
$$ {#eq-envelope}

and the expected payment of type $v$ is

$$
T_i(v) = v\, X_i(v) - U_i(\underline{v}) - \int_{\underline{v}}^{v} X_i(t)\,\mathrm{d}t.
$$ {#eq-payment-from-envelope}
:::

::: proof
A standard envelope argument: at an interior maximum, $\partial u_i/\partial z = 0$ when $z = v$, and $U_i'(v) = \partial u_i/\partial v$ evaluated at $z = v$ by the envelope theorem (only the direct effect through the coefficient of $X_i$ survives). That direct effect is $X_i(v)$, so $U_i'(v) = X_i(v)$. Integrating from $\underline{v}$ to $v$ gives [[#eq-envelope]]. Rearranging $U_i(v) = v X_i(v) - T_i(v)$ gives [[#eq-payment-from-envelope]].

(If one does not want to invoke the envelope theorem by name: incentive compatibility says $U_i(v) \ge v X_i(z) - T_i(z) = U_i(z) + (v-z)X_i(z)$ and symmetrically $U_i(z) \ge U_i(v) + (z-v)X_i(v)$. Rearranging, $(v-z)X_i(z) \le U_i(v) - U_i(z) \le (v-z)X_i(v)$. For $v > z$ this is $X_i(z) \le \frac{U_i(v)-U_i(z)}{v-z} \le X_i(v)$. Sending $v \downarrow z$ shows that $U_i$ is differentiable almost everywhere with $U_i' = X_i$ wherever $X_i$ is continuous, and the integral identity follows.)
:::

The formula has a blunt reading. A slightly higher type wins slightly more often, and that extra probability of winning is worth the extra value. Adding up those increments from the bottom of the support produces the whole information rent. The payment $T_i(v)$ is then whatever is left after the bidder has been given that rent. Two mechanisms that give the same $X_i(\cdot)$ and the same $U_i(\underline{v})$ *must* give the same $T_i(\cdot)$. That is revenue equivalence.

::: intuition Rents, not prices
The seller does not choose a price. She chooses an allocation rule $X$ (who wins, how often) and a lump-sum $U(\underline{v})$ (usually zero). Payments are then pinned down by incentive compatibility. Trying to “charge more” without changing who wins or how the lowest type is treated is like trying to tax a rent that the envelope has already assigned to the bidder.
:::

## The theorem

::: definition Standard auction {#def-standard}
A **standard auction** (in the sense of this chapter) is a mechanism that always awards the object to a bidder with the highest value, in a symmetric equilibrium, and gives a bidder of type $\underline{v}$ expected payoff zero. First-price, second-price, Dutch, English, all-pay and the war of attrition are standard in their symmetric IPV equilibria. A reserve price, an entry fee paid by the lowest type, or an inefficient tie-breaking rule takes a mechanism out of the class.
:::

::: theorem Revenue equivalence {#thm-ret}
Consider the IPV environment of [[market-design/auction-formats#def-ipv]], with risk-neutral bidders, independent values drawn from a common $F$, and a single object. Let two auctions (or two mechanisms) each have a symmetric equilibrium in which
1. the bidder with the highest value always wins (the allocation is efficient among the bidders);
2. a bidder with value $\underline{v}$ expects payoff $U(\underline{v}) = 0$.

Then the two auctions yield the same expected payment $T(v)$ for every type $v$, the same expected payoff $U(v)$, and the same expected revenue for the seller. Explicitly, with $X(v) = F(v)^{n-1}$,

$$
T(v) = v F(v)^{n-1} - \int_{\underline{v}}^{v} F(t)^{n-1}\,\mathrm{d}t
$$ {#eq-T}

and expected revenue is $n \int_{\underline{v}}^{\overline{v}} T(v)\, f(v)\,\mathrm{d}v$, equivalently $\E[Y_2^{(n)}]$ where $Y_2^{(n)}$ is the second-highest value.
:::

::: proof
In any symmetric efficient equilibrium the probability that type $v$ wins is the probability that every rival is below $v$, namely $X(v) = F(v)^{n-1}$. Combined with $U(\underline{v}) = 0$, [[#prop-envelope]] delivers [[#eq-T]] and therefore the same $T(\cdot)$ in every such auction. Expected revenue is $n \E[T(v_i)]$. For the second-price auction this quantity equals $\E[Y_2^{(n)}]$ by direct computation (the seller receives the second-highest value), so every other auction in the class has expected revenue $\E[Y_2^{(n)}]$ as well.
:::

Four assumptions are doing the work, and it is worth naming them so that the rest of the chapter can break them one at a time.

- **Risk neutrality.** Payoffs enter as $vX - T$, so the envelope differentiates through a linear objective. Risk aversion changes the objective.
- **Independent private values, identically distributed.** Symmetry makes $X(v) = F(v)^{n-1}$ the same function in every efficient auction. Asymmetries make the winning probabilities of a given type format-dependent.
- **Efficiency among bidders.** The highest value wins. A reserve price, or any other exclusion, changes $X$ and therefore $T$.
- **Zero surplus for the lowest type.** $U(\underline{v}) = 0$. An entry fee that the lowest type still pays, or a subsidy, would shift $T$ by a constant.

Independence is used to write $X(v) = F(v)^{n-1}$ without conditioning on $v$ in a more complicated way; affiliation is a later chapter. Privacy of values is used to make $v$ the coefficient of $X$ in the payoff.

::: example Uniform, any $n$ {#ex-ret-uniform}
Under $F(v) = v$ on $[0, 1]$, compute $T(v)$ from [[#eq-T]] and recover expected revenue $(n-1)/(n+1)$.
::: solution
$X(v) = v^{n-1}$, so

$$
T(v) = v \cdot v^{n-1} - \int_0^v t^{n-1}\,\mathrm{d}t = v^n - \frac{v^n}{n} = \frac{n-1}{n}\, v^n,
$$

which is [[market-design/auction-formats#eq-payment-uniform]]. Then

$$
\E[R] = n \int_0^1 T(v)\,\mathrm{d}v = n \cdot \frac{n-1}{n} \int_0^1 v^n\,\mathrm{d}v = (n-1) \cdot \frac{1}{n+1} = \frac{n-1}{n+1}.
$$

The same number was obtained in the last chapter by computing $\E[Y_2^{(n)}]$ and $\E[b(Y_1^{(n)})]$ separately. The envelope produces it once.
:::
:::

::: widget plot
f: ((n-1)/n)*x^n; x^n
sliders: n=2:2:8:1
x: 0, 1
y: 0, 1
labels: \text{expected payment }T(v); \text{win probability }X(v)
caption: Uniform$[0,1]$ values. $X(v) = v^{n-1}$ is the chance of winning in any efficient symmetric auction; $T(v) = ((n-1)/n) v^n$ is the expected payment the envelope then requires. Raise $n$: both curves lift, and $T$ tracks $X$ more closely — more competition, less information rent per unit of winning probability.
:::

## Four formats, two more, one identity

We already know that first-price, second-price, Dutch and English satisfy the hypotheses of [[#thm-ret]] in the symmetric IPV model: each awards the object to the highest value (in the equilibria of [[market-design/auction-formats]]) and each gives the lowest type nothing. Revenue equivalence is then a corollary, not a new computation.

Two further formats illustrate that the identity is not about “looking like a first-price or a second-price”.

**All-pay.** Every bidder pays her bid, winner or not; the highest bid still wins. Contests, lobbying, and some crowded entry games look like this. The payoff of a bidder who bids as type $z$ is $v F(z)^{n-1} - b(z)$ — she pays $b(z)$ with probability one. The envelope still applies, with the same $X(v) = F(v)^{n-1}$ and $U(\underline{v}) = 0$, so $T(v)$ is still [[#eq-T]], and therefore the equilibrium bid *is* $T(v)$: she pays her bid for sure. For uniform$[0,1]$,

$$
b_{\text{all-pay}}(v) = \frac{n-1}{n}\, v^n.
$$

With two bidders that is $b(v) = v^2/2$. A bidder with $v = 0.80$ bids $0.32$ — the same number as her *expected* payment in first-price or second-price, now paid with certainty.

**War of attrition.** Two bidders; each pays the *lower* bid, and the higher bidder wins. (Think of two animals displaying until one leaves; both have paid the time of the first exit.) The winner’s payment equals the loser’s bid, and the loser pays her own bid, so the seller receives twice the lower bid. Equilibrium bids are more aggressive than in all-pay, in just such a way that expected payments remain $T(v)$. For two bidders and uniform$[0,1]$, $b(v) = v^2/(1-v)$ on $[0,1)$ — unbounded as $v \to 1$, which is admissible because the probability of actually paying a huge bid is tiny.

::: example All-pay bids, two bidders {#ex-allpay}
Two bidders, uniform$[0, 1]$, all-pay auction. Compute the symmetric equilibrium bid of a bidder with $v = 0.50$ and with $v = 1$. What is expected revenue? Compare the realised payment of a $v = 1$ bidder with her payment in a first-price auction in which her rival draws $0.40$.
::: solution
$b(v) = v^2/2$, so $b(0.50) = 0.125$ and $b(1) = 0.50$. Expected revenue is still $1/3$. In a first-price auction the $v = 1$ bidder bids $0.50$ and, facing a rival at $0.40$ who bids $0.20$, wins and pays $0.50$. In the all-pay auction she bids $0.50$ and pays $0.50$ *whether or not she wins*; against a rival at $0.40$ who bids $0.08$ she wins and still pays $0.50$. Same payment in this particular comparison, but if she had lost she would still have paid $0.50$ in all-pay and $0$ in first-price. The identity is in expectation, averaging over the rival’s type and over winning and losing.
:::
:::

::: quiz
In the symmetric IPV model, which of the following is *not* implied by revenue equivalence?
- [ ] First-price and second-price have the same expected revenue
- [ ] A type-$v$ bidder has the same expected payment in first-price, second-price and all-pay
- [x] First-price and second-price have the same *realised* revenue in every draw of values
- [ ] The lowest type expects payoff zero in each of those auctions, in the equilibria we have been using
::: solution
[[#thm-ret]] equates expected payments type by type, hence expected revenue. Realised prices differ: first-price revenue is $b(Y_1)$, second-price revenue is $Y_2$, all-pay revenue is $b(v_1)+\cdots+b(v_n)$. The zero-surplus condition is an assumption of the theorem, and it holds in these equilibria.
:::
:::

::: widget montecarlo
mode: integral
f: x^2
a: 0
b: 1
n: 2000
caption: Monte Carlo estimate of $\int_0^1 x^2\,\mathrm{d}x = 1/3$. For two bidders with uniform$[0,1]$ values this integral *is* expected revenue in every efficient auction with $U(\underline{v})=0$: it equals $2\int T(v)\,\mathrm{d}v$ with $T(v)=v^2/2$, and it equals $\E[\min(v_1,v_2)]$. The simulation is a numerical integral, not a forecast of a sale.
:::

## What the theorem does not say

Revenue equivalence is narrower than the slogan “all auctions raise the same money”.

It is about **expectations**, not realisations. The variance of revenue differs across formats. In a second-price auction with two uniform$[0,1]$ bidders, revenue is $Y_2$ with $\Var(Y_2) = 1/18$; in a first-price auction revenue is $Y_1/2$ with $\Var(Y_1/2) = (1/4)\Var(Y_1) = (1/4)(1/18) = 1/72$. First-price revenue is less noisy, because bids already average over the rival. A risk-averse *seller* may therefore prefer first-price even when expected revenues coincide. (A risk-averse *bidder* is a different failure of the theorem, taken up next.)

It is about a **fixed allocation rule**. The seller who sets a reserve, or who favours one bidder, or who sometimes keeps the object, has changed $X$ and left the class. That is not a failure of the theorem; it is a different mechanism, and [[market-design/optimal-auctions]] asks which $X$ the seller would like.

It is about **symmetric independent** types. If Ava’s distribution first-order stochastically dominates Ben’s, the first-price equilibrium is no longer efficient, so hypothesis 1 fails for first-price while it still holds for second-price. The two formats then raise different expected revenue, and they rank the bidders differently.

It does not say that bidders are indifferent among formats *ex post*, nor that a bidder with a given value is indifferent *before* she knows her rivals’ bids. She is indifferent in expectation, given her value. Once the envelopes are opened, she generally prefers whichever format happened to charge her less.

::: warning Equivalence is not identity of prices
A well-worn confusion is to take a single sale, observe that the first-price price was $40$ and the second-price price would have been $50$, and declare the theorem false. The theorem never claimed those two numbers were equal. It claimed that, averaging over the draw of values, the means coincide — and that a bidder with a given $v$, averaging over rivals, expects to pay the same. Checking the theorem in the field requires many sales, or a model, not one anecdote.
:::

## Breaking the theorem

Each assumption can fail in a way that matters for design.

### Risk aversion

Suppose bidders share a concave von Neumann–Morgenstern utility $u$, with $u(0) = 0$, and evaluate $u(v - p)$ when they win and pay $p$. Second-price (and English) still have the dominant strategy $b = v$: Vickrey’s argument never used risk neutrality. First-price changes. A risk-averse bidder dislikes the gamble of shading — win and pay little, or lose and get nothing — and shades *less* than a risk-neutral bidder of the same value. Bids rise, expected revenue rises, and first-price raises more expected revenue than second-price.

Riley and Samuelson (1981, *American Economic Review*) and Maskin and Riley (1984, *Econometrica*) give the precise comparison: with symmetric IPV and identical concave $u$, the unique symmetric first-price equilibrium bid lies above the risk-neutral bid [[market-design/auction-formats#eq-fpa-bid]], and expected revenue strictly exceeds that of second-price. Dutch, being strategically equivalent to first-price, inherits the ranking. English, having the same dominant strategy as second-price, does not.

::: example A two-point illustration of risk aversion {#ex-risk}
Two bidders. Each has value $1$ for sure (so there is no private-information problem, only risk). They bid in a first-price auction, mixed-strategy equilibrium. Contrast with second-price. Then comment on what changes if they are risk-averse.
::: solution
With values known and equal, second-price: both bid $1$, one wins at random, price is $1$, payoffs are $0$. First-price: bidding $1$ yields $0$; the mixed equilibrium (the Bertrand mixed strategy of a first-price auction with equal known values) has atoms or a density on $[0,1]$ with expected payoff $0$. Expected revenue is $1$ in second-price and strictly less than $1$ in first-price, because mixed bids sometimes come in below $1$. Risk aversion is irrelevant to second-price (dominant strategies, no residual risk once $m$ is known — actually the winner still faces no risk, payment is $1$). In first-price, risk-averse bidders dislike the mixed-strategy gamble and put more weight on higher bids, raising expected revenue toward the second-price level. The example is degenerate as IPV (values are not random), but it shows the force: first-price exposes the bidder to price risk that second-price does not, and risk aversion compresses that exposure by pushing bids up.
:::
:::

The applied reading is directional, not a licence to “choose first-price because bidders are risk-averse”. How much revenue moves depends on the curvature of $u$, which is not typically known, and risk aversion of bidders can be entangled with budget constraints and with the value of a later resale.

### Asymmetries

Suppose Ava draws from $F_A$ and Ben from $F_B$, not the same $F$. Second-price is still efficient: each bids her value, the highest value wins. First-price is not. The weaker bidder (the one whose distribution is worse in the sense of hazard-rate or reverse-hazard-rate dominance) bids more aggressively relative to her value, and sometimes beats a stronger rival who shaded more. Maskin and Riley (2000, *Review of Economic Studies*) show that the ranking of expected revenue is then ambiguous in general, but that first-price tends to raise more than second-price when the strong bidder is *strong in a first-order-stochastic-dominance sense and the weak bidder is not too weak* — because first-price forces the strong bidder to bid against a weak rival who is shading less than a symmetric rival would. The designer who cares about efficiency prefers second-price; the designer who cares about revenue has a calculation to do, and it is no longer given by [[#thm-ret]].

::: example A discrete asymmetry {#ex-asymmetric}
Ava’s value is $10$ for sure. Ben’s value is $6$ or $12$ with equal probability, known to Ben. Second-price: each bids value. Compute expected revenue. Then argue, without solving the first-price equilibrium in full, that first-price cannot always award the object to the highest value, so the two formats are not revenue-equivalent.
::: solution
Second-price: if Ben has $6$, Ava wins and pays $6$; if Ben has $12$, Ben wins and pays $10$. Expected revenue is $\tfrac12 \cdot 6 + \tfrac12 \cdot 10 = 8$. The object always goes to the higher value. In first-price, efficiency would require Ava to bid strictly between Ben’s low bid and Ben’s high bid, winning only against the low type. Ben with value $6$ will not bid above $6$. If Ava bids $a \in (0, 6]$, Ben with value $12$ will bid just above $a$ and win; Ava’s expected payoff is $\tfrac12(10-a)$, which she can raise by cutting $a$, so no such separating bid is a best response except at the lower boundary, where ties and jump deviations reappear. The object is not always efficiently assigned, hypothesis 1 of [[#thm-ret]] fails for first-price, and expected revenues need not coincide. (They do not: first-price expected revenue in the mixed equilibrium of this game is less than $8$, because some probability is wasted on inefficient allocations and on bids below $6$.)
:::
:::

### Budget constraints

If a bidder cannot pay more than $w_i$, the second-price strategy “bid $v_i$” may be infeasible, and “bid $\min(v_i, w_i)$” is no longer dominant: a budget-constrained bidder may want to bid *below* her budget to avoid winning at a price she cannot finance, or may be forced out of an English auction that a first-price envelope would have let her contest. Che and Gale (1998, *Review of Economic Studies*) show that first-price can then raise *more* expected revenue than second-price, because it lets a high-value, tight-budget bidder win with a bid she can pay, whereas English and second-price may have her drop against a lower-value rival with a looser budget. The ranking can reverse if budgets are public. The theorem’s linear payoff $v - p$ assumed that $p$ was feasible.

### Entry fees, reserves, and changing $X$

An entry fee $\phi$ paid by every participant, including the lowest type, sets $U(\underline{v}) = -\phi$ (if the lowest type still enters) and shifts $T$ by $\phi$. A **reserve price** $r$, below which the object is not sold, is a change in $X$: types in $[\underline{v}, r)$ now win with probability zero. Both instruments take the designer out of the class of [[#thm-ret]], and both are used in [[market-design/optimal-auctions]] precisely because they change expected revenue. Among auctions that share the *same* reserve and the same entry fee, revenue equivalence is restored.

::: quiz
A seller of a single object faces $n$ symmetric IPV risk-neutral bidders and is choosing between first-price and second-price, with no reserve. Expected revenue is
- [ ] higher in first-price, because bids are “real money”
- [ ] higher in second-price, because the winner has bid more
- [x] the same in the two formats
- [ ] higher in whichever format the bidders dislike
::: solution
This is the setting of [[#thm-ret]]. The winner’s bid is higher in second-price, but she does not pay it; she pays the second bid. The first-price winner pays a shaded bid. The envelope equates the expectations. “Bidders dislike” is not a criterion in the risk-neutral model; with risk aversion, first-price would raise more, which is a different answer to a different question.
:::
:::

## Evidence

The theorem is an identity inside a model, so the empirical question is whether the model’s assumptions hold closely enough for the identity to be a good approximation.

Laboratory. Coppinger, Smith and Titus (1980) and Cox, Roberson and Smith (1982), already cited in the previous chapter, found first-price revenue above the risk-neutral Nash benchmark and above second-price revenue — the risk-aversion ranking, or a noisy-best-response ranking that looks like it. Kagel and Levin’s surveys (e.g. 2016, *Handbook of Experimental Economics* vol. 2) treat overbidding in first-price as one of the most robust laboratory findings in auction theory, and treat second-price overbidding as smaller and more fragile. Revenue equivalence is therefore a better approximation in some subject pools than in others, and it is not a good description of inexperienced first-price bidders.

Field. Direct tests need a setting where the same objects can be sold under two formats, or a structural model of $F$. Lucking-Reiley (1999, *American Economic Review*) sold collectible cards in online English and first-price auctions and found higher prices in English — opposite to the risk-aversion ranking, and consistent with a common-value or affiliated component (the next chapter) or with a difference in participation. Hortaçsu and McAdams (2010, *Journal of Political Economy*) estimate a structural model of Turkish treasury auctions and compare discriminatory and uniform-price formats; the revenue gap they recover is small, which is what revenue equivalence (in its multi-unit version) would suggest when bidders are close to symmetric and close to risk-neutral. The honest summary is that the theorem is a benchmark: when revenue differs across formats, the difference is a clue to *which* assumption failed, not a reason to discard the envelope.

## Where this leads

The envelope [[#eq-envelope]] is the workhorse of [[market-design/optimal-auctions]]: the seller maximises expected virtual surplus, not expected “prices”, because prices are pinned down by $X$ and $U(\underline{v})$. Affiliation breaks independence and ranks English above sealed-bid ([[market-design/common-values]]). Several units break “the highest value wins a single object” and produce demand reduction ([[market-design/multi-unit-auctions]]). Matching markets do not have prices at all, but they have an analogue of strategy-proofness ([[market-design/stable-matching]], [[market-design/school-choice]]), which is the dominant-strategy cousin of the incentive compatibility used here.

::: history
Vickrey (1961) already compared first-price and second-price expected revenue in an independent-private-value example. The general theorem was proved independently by Roger Myerson, “Optimal auction design”, *Mathematics of Operations Research* (1981), and by John Riley and William Samuelson, “Optimal auctions”, *American Economic Review* (1981). Myerson’s paper also characterised the revenue-maximising mechanism; Riley and Samuelson restricted attention to auctions that award the object to the highest bidder and varied reserves and entry fees. The envelope argument used here is the one that mechanism design later made standard (Milgrom and Segal, “Envelope theorems for arbitrary choice sets”, *Econometrica*, 2002, is the modern reference). Paul Klemperer’s 1999 *Journal of Economic Surveys* article, “Auction theory: a guide to the literature”, is the place many applied economists first met the list of assumptions that break the theorem.
:::

::: summary
- Incentive compatibility plus an envelope argument pins down expected payoffs, and therefore expected payments, from the allocation rule $X$ and the lowest type’s payoff $U(\underline{v})$ ([[#prop-envelope]]).
- Revenue equivalence: in symmetric IPV with risk-neutral bidders, any two auctions that always award to the highest value and give the lowest type nothing yield the same $T(v)$ and the same expected revenue $\E[Y_2^{(n)}]$ ([[#thm-ret]]).
- The four classical formats, the all-pay auction and the war of attrition all sit in that class (in their symmetric equilibria). Realised prices, and the variance of revenue, still differ.
- Risk aversion raises first-price (and Dutch) bids relative to second-price (and English). Asymmetries make first-price inefficient and break the ranking. Budget constraints can reverse it. Reserves and entry fees leave the class by changing $X$ or $U(\underline{v})$.
- The theorem is a benchmark. When two formats raise different expected revenue in the lab or in the field, the question is which assumption failed.
:::

## Exercises

::: exercise Payment from the envelope {level=1 check="0.32"}
Two bidders, uniform$[0, 1]$, $U(0) = 0$, efficient symmetric equilibrium. Use [[#eq-T]] to compute $T(0.80)$. (Enter the expected payment.)
::: solution
$T(v) = v\cdot v - \int_0^v t\,\mathrm{d}t = v^2 - v^2/2 = v^2/2$, so $T(0.80) = 0.32$.
:::
:::

::: exercise All-pay bid {level=1 check="0.5"}
Two bidders, uniform$[0, 1]$, all-pay auction, symmetric equilibrium. What does a bidder with $v = 1$ bid? (Enter the bid.)
::: solution
The all-pay bid equals $T(v) = v^2/2$, so $b(1) = 1/2$.
:::
:::

::: exercise More bidders, same identity {level=1 check="0.5"}
Three bidders, uniform$[0, 1]$. What is expected revenue in *any* auction satisfying the hypotheses of [[#thm-ret]]? (Enter the expected revenue as a decimal.)
::: solution
$(n-1)/(n+1) = 2/4 = 1/2$.
:::
:::

::: exercise An entry fee {level=2}
Two bidders, uniform$[0, 1]$. The seller charges an entry fee $\phi = 0.05$, paid before values are drawn, and then runs a second-price auction among those who enter. In the symmetric equilibrium both enter (check that $U$ at the lowest participating type covers $\phi$ — here the fee is paid *before* seeing $v$, so the relevant comparison is expected surplus $\int U(v) f(v)\,\mathrm{d}v \ge \phi$). Compute expected revenue including the fees. How does it compare with $\phi = 0$?
::: hint
With both entering, the auction part still raises $\E[Y_2] = 1/3$, and the seller also collects $2\phi$.
:::
::: solution
Each bidder’s expected surplus in the second-price auction with no fee is $\int_0^1 U(v)\,\mathrm{d}v$ with $U(v) = \int_0^v X(t)\,\mathrm{d}t = \int_0^v t\,\mathrm{d}t = v^2/2$, so $\E[U] = \int_0^1 v^2/2\,\mathrm{d}v = 1/6 \approx 0.167 > 0.05$. Both enter. Auction revenue is still $1/3$, plus fees $0.10$, total expected revenue $0.10 + 1/3 \approx 0.433$, which is more than $1/3$. The fee does not contradict [[#thm-ret]]: it changes $U$ at the point of entry (or, in the ex-ante version, extracts surplus before types are drawn). A large enough fee would deter entry and then *lower* revenue; $0.05$ is not that large.
:::
:::

::: exercise Variance of revenue {level=2}
Two bidders, uniform$[0, 1]$. Second-price revenue is $Y_2 = \min(v_1, v_2)$, which has density $2(1-y)$ on $[0,1]$. First-price revenue is $Y_1/2$, and $Y_1 = \max(v_1,v_2)$ has density $2y$ on $[0,1]$. Compute $\Var(Y_2)$ and $\Var(Y_1/2)$. Which format is noisier for the seller?
::: solution
$\E[Y_2] = \int_0^1 y \cdot 2(1-y)\,\mathrm{d}y = 1/3$, $\E[Y_2^2] = \int_0^1 y^2 \cdot 2(1-y)\,\mathrm{d}y = 2\int (y^2 - y^3) = 2(1/3 - 1/4) = 1/6$, so $\Var(Y_2) = 1/6 - (1/3)^2 = 1/6 - 1/9 = 1/18$.

$\E[Y_1] = \int_0^1 y \cdot 2y\,\mathrm{d}y = 2/3$, $\E[Y_1^2] = \int_0^1 y^2 \cdot 2y\,\mathrm{d}y = 2/4 = 1/2$, $\Var(Y_1) = 1/2 - (2/3)^2 = 1/2 - 4/9 = 1/18$, hence $\Var(Y_1/2) = (1/4)(1/18) = 1/72$.

Second-price revenue is four times as variable. Both means equal $1/3$.
:::
:::

::: exercise Risk aversion, direction {level=2}
Explain in two or three sentences why a risk-averse bidder in a first-price auction shades *less* than a risk-neutral bidder of the same value, while a risk-averse bidder in a second-price auction still bids her value. Which format then raises more expected revenue?
::: solution
Vickrey’s dominance argument does not use the shape of $u$: bidding $v$ in second-price remains dominant, so bids and expected revenue in second-price are unchanged. In first-price the bidder faces a gamble (shade more, win less often, pay less when she wins). Concavity of $u$ makes the extra risk of a deeper shade unattractive, so the optimum moves toward a higher bid. First-price expected revenue therefore exceeds second-price.
:::
:::

::: exercise A mechanism not in the class {level=3}
A seller of one object, two bidders, uniform$[0, 1]$ values, offers the following mechanism: the object is awarded to the highest bidder, who pays her bid, *unless both bids are below $1/2$*, in which case the seller keeps the object and nobody pays. Is expected revenue equal to $1/3$? If not, is the comparison with $1/3$ a failure of [[#thm-ret]], or an application of it?
::: hint
The allocation rule $X$ is no longer $X(v) = v$. Types below $1/2$ win with probability zero.
:::
::: solution
This is a first-price auction with reserve $1/2$. Types $v < 1/2$ have $X(v) = 0$, so hypothesis 1 of [[#thm-ret]] (highest value always wins) fails whenever both values lie below $1/2$, and also the winning probability of a type $v > 1/2$ is the probability the rival is in $[1/2, v]$, not $[0, v]$. Expected revenue is not $1/3$; it is $5/12$, as computed in the next chapter. This is an *application* of the envelope, not a failure: the envelope still gives $T$ from the *new* $X$, and that $T$ is not the $T$ of [[#eq-T]].
:::
:::

::: exercise Prove $T$ for second-price directly {level=3}
Two bidders, general $F$ on $[\underline{v}, \overline{v}]$. In the dominant-strategy equilibrium of second-price, type $v$ pays the rival’s value if the rival is below $v$, and $0$ otherwise. Write $T(v)$ as an integral against $f$, integrate by parts, and recover [[#eq-T]] with $n = 2$.
::: hint
$T(v) = \int_{\underline{v}}^v t f(t)\,\mathrm{d}t$. Integrate by parts with $u = t$, $\mathrm{d}w = f(t)\,\mathrm{d}t$.
:::
::: solution
$T(v) = \int_{\underline{v}}^v t f(t)\,\mathrm{d}t$. Integrate by parts: let $u = t$, $\mathrm{d}w = f\,\mathrm{d}t$, so $\mathrm{d}u = \mathrm{d}t$, $w = F(t)$. Then

$$
T(v) = \bigl[t F(t)\bigr]_{\underline{v}}^v - \int_{\underline{v}}^v F(t)\,\mathrm{d}t = v F(v) - \underline{v} F(\underline{v}) - \int_{\underline{v}}^v F(t)\,\mathrm{d}t.
$$

$F(\underline{v}) = 0$, and $X(v) = F(v)$, so this is $T(v) = v X(v) - \int_{\underline{v}}^v X(t)\,\mathrm{d}t$, which is [[#eq-T]] for $n = 2$.
:::
:::

::: exercise War of attrition, expected payments {level=3}
Two bidders, uniform$[0, 1]$. In the war of attrition each pays the lower bid, and the higher bidder wins. Suppose the symmetric equilibrium bid function is $b(v) = v^2/(1-v)$ for $v \in [0, 1)$. Using $X(v) = v$ and $U(0) = 0$, compute $T(v)$ from the envelope and verify that it equals $v^2/2$. Then give a one-line account of how such an aggressive $b$ can produce so modest a $T$.
::: solution
The envelope does not care about the format: $X(v) = v$ and $U(0) = 0$ give $T(v) = v^2/2$ immediately. As for the bid function, a type-$v$ bidder pays $b(v)$ only when she *loses* (the rival’s value exceeds $v$, probability $1-v$), and pays the rival’s bid $b(v_j)$ when she wins. The huge bids near $v = 1$ are paid with tiny probability, and when the rival is near $1$ you have lost. Averaging produces $T(v) = v^2/2$. (Checking that $b(v) = v^2/(1-v)$ is in fact an equilibrium is a first-order-condition exercise: the marginal cost of staying a moment longer is $1$, in units of the bid’s derivative, and the marginal benefit is the density of the rival times the prize $v - b$; the stated $b$ equates them.)
:::
:::
