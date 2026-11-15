A supplier is asked to tool a factory for one buyer’s part. The tool has no use elsewhere. Once the tool is built, the buyer and the supplier will bargain over the price of the parts. The supplier, looking ahead, knows that she will not capture the whole of the value her tool creates — the buyer can hold her up — and so she installs a cheaper tool than the joint surplus would justify. That is the **hold-up problem**. If the parties could write a complete contract before the tool is built, specifying the price and the specification for every future contingency, hold-up would not arise. They cannot, because the relevant contingencies are too many, too vague, or not verifiable in court. The contract is **incomplete**, and the instrument that remains is **ownership**: who has residual control of the tool when the contract is silent.

This chapter makes that argument precise. It is the Grossman–Hart–Moore property-rights theory of the firm, and it is the leading incomplete-contract answer to Coase’s question: why are some transactions inside firms and some in markets? The previous chapters assumed that anything observable could be contracted on. Here the constraint is the opposite: some things that the parties can see they cannot write down, and control rights have to fill the gap.

## Hold-up

::: definition Specific investment and hold-up {#def-holdup}
An investment is **relationship-specific** if its value inside the relationship exceeds its value outside (its **quasi-rent** is positive). **Hold-up** is the ex post appropriation of that quasi-rent by the other party, once the investment is sunk. Looking ahead, the investor, capturing only a share of the quasi-rent, invests less than the joint-surplus-maximising amount.
:::

A canonical numerical form is as follows. At date 0 the supplier chooses an investment $i \ge 0$ at cost $i$. At date 1 the relationship is worth $v(i)$ to the buyer and 0 to anyone else (the investment is fully specific). If the parties bargain at date 1, they split $v(i)$ by the Nash bargaining solution, fifty-fifty. The supplier’s private return is $\tfrac12 v(i) - i$; the social return is $v(i) - i$.

::: proposition Underinvestment under Nash bargaining {#prop-underinvestment}
Let $v$ be strictly increasing, strictly concave, differentiable, with $v(0) \ge 0$ and $v'(0) > 1 > \lim_{i\to\infty} v'(i)$. Under a fifty-fifty split of $v(i)$ at date 1, the supplier’s investment $i^N$ satisfies $\tfrac12 v'(i^N) = 1$. The first-best $i^*$ satisfies $v'(i^*) = 1$. Hence $i^N < i^*$: the supplier underinvests. The deadweight loss is $v(i^*) - i^* - \bigl(v(i^N) - i^N\bigr)$.
:::

::: proof
The supplier maximises $\tfrac12 v(i) - i$. The first-order condition is $\tfrac12 v'(i^N) = 1$. The first-best maximises $v(i) - i$, so $v'(i^*) = 1$. Because $v'$ is strictly decreasing, $i^N < i^*$. The loss is the usual gap between the social and private first-order conditions, the same shape as a quantity tax of 50 per cent on the marginal product of investment.
:::

::: example Square-root value {#ex-sqrt-holdup}
Let $v(i) = 4\sqrt{i}$. Compute first-best investment, value and net surplus. Compute the Nash-bargaining investment, value, net surplus, and the supplier’s private payoff. What share $\alpha$ of $v(i)$ would the supplier need in order to invest efficiently?
::: solution
First-best: $v'(i) = 2/\sqrt{i} = 1$, so $\sqrt{i} = 2$, $i^* = 4$, $v = 8$, net surplus $4$.

Nash: $\tfrac12 \cdot 2/\sqrt{i} = 1$, so $1/\sqrt{i} = 1$, $i^N = 1$, $v = 4$, net surplus $3$. The supplier’s private payoff is $\tfrac12 \cdot 4 - 1 = 1$. Deadweight loss is $4 - 3 = 1$.

If the supplier captures a share $\alpha$, she maximises $\alpha \cdot 4\sqrt{i} - i$, so $2\alpha / \sqrt{i} = 1$, $\sqrt{i} = 2\alpha$, $i = 4\alpha^2$. This equals $i^* = 4$ if and only if $\alpha = 1$. Efficient investment requires that the investor be the residual claimant of the whole quasi-rent. Any $\alpha < 1$ produces underinvestment.
:::
:::

::: widget plot
f: 4*sqrt(x) - x; 2*sqrt(x) - x
x: 0.05, 8
y: -2, 5
labels: \text{social surplus }v(i)-i; \text{private return }v(i)/2-i
points: 4,4; 1,1
caption: Social surplus $4\sqrt{i} - i$ peaks at $i = 4$. The supplier’s private return $\tfrac12 v(i) - i$ peaks at $i = 1$. The private peak is at $i = 1$, where social surplus is 3 rather than 4. That gap of 1 is the hold-up loss.
:::

::: widget plot
f: 8*a - 4*a*a
x: 0, 1
y: 0, 4.2
labels: \text{social surplus}
caption: Social surplus $v(i(\alpha)) - i(\alpha) = 8\alpha - 4\alpha^2$ when the supplier’s bargaining share is $\alpha$ and $v(i) = 4\sqrt{i}$. Surplus is maximised at $\alpha = 1$ (the supplier owns) and is only 3 at $\alpha = 1/2$. Ownership is a way of moving $\alpha$.
:::

## Why the contract is incomplete

If the parties could, at date 0, write a contract that specifies the date-1 price as a function of $i$, or that specifies the specification of the part in every state, the supplier could be made the residual claimant and $i^*$ would be chosen. Three reasons, in the literature, why they cannot.

**Non-verifiability.** A court can see that a part was delivered; it cannot see, at reasonable cost, whether the part is the one the buyer’s new engine actually needs. The quality that makes the investment valuable is observed by the parties (so they can bargain) but not by a third party (so they cannot contract on it). This is the Grossman–Hart–Moore primitive.

**Indescribability.** The relevant states — which engine, which regulation, which rival technology — are too many to list, or are not known at date 0. A contract that tried to list them would be silent on the state that actually arrives.

**Cost of writing and enforcing.** Even a verifiable and describable contingency is left out if the probability is small relative to the lawyers’ fees. The resulting document is incomplete by choice, and residual control fills the silence.

These are modelling choices, not empirical claims that firms never write detailed contracts. They do; the theory is about the *residual* that no contract covers, and about who decides in that residual.

::: definition Incomplete contract and residual control {#def-incomplete}
A contract is **incomplete** if it does not specify the use of an asset, or the split of a surplus, in every state that may arise. **Residual control rights** over an asset are the rights to decide its use in states the contract does not cover. **Ownership**, in the Grossman–Hart–Moore sense, is the possession of those residual control rights.
:::

Coase (1937) asked why a firm, as a command structure, exists at all if markets allocate resources by prices. Williamson (1975, 1985) answered with transaction costs, specificity and opportunism, and made hold-up the central vertical-integration hypothesis. Grossman and Hart (1986) and Hart and Moore (1990) asked the next question: if integration is the answer, *who* should own the asset? Integration is not the suppression of opportunism; it is a reallocation of residual control, and it has costs as well as benefits.

## Property rights

There are two parties, $A$ and $B$, and one physical asset. Each makes a specific investment, $a$ and $b$, at cost $a$ and $b$. After investments are sunk, the parties bargain over the use of the asset. Bargaining is Nash, with equal power, but *disagreement payoffs* depend on who owns the asset, because the owner can walk away and use it with her own investment only.

- **Non-integration** (say, $A$ owns): on disagreement, $A$ gets her stand-alone payoff $u_A(a)$ and $B$ gets $u_B(b)$, typically smaller than the joint payoff $v(a,b)$ inside the relationship.
- **Integration by $A$**: $A$ owns, and on disagreement $A$ can use the asset *and* exclude $B$, so $A$’s disagreement payoff is higher (she has more control) and $B$’s is lower (he has less).

The Nash split gives each party her disagreement payoff plus half of the quasi-rent $v - u_A - u_B$. A party’s private incentive to invest is then a blend of the effect on her disagreement payoff and the effect on the quasi-rent. Ownership, by shifting disagreement payoffs, shifts those incentives.

::: proposition Grossman–Hart–Moore ownership criterion {#prop-ghm}
Suppose complementary specific investments, with $v$ supermodular in $(a, b)$. Transferring ownership of the asset to $A$:

1. raises $A$’s marginal return to $a$ (because $A$’s disagreement payoff becomes more sensitive to $a$) and so raises $a$;
2. lowers $B$’s marginal return to $b$ and so lowers $b$.

The optimal owner is the party whose investment is more important, in the sense that the social return to raising that party’s investment (and lowering the other’s) is larger. If investments are complementary enough and both are essential, *joint* ownership or a carefully chosen outside owner may dominate either extreme; if only $A$’s investment matters, $A$ should own.
:::

::: proof
Sketch. Write $A$’s ex post payoff as $u_A^{\text{own}}(a) + \tfrac12 \bigl(v(a,b) - u_A^{\text{own}}(a) - u_B^{\text{own}}(b)\bigr) = \tfrac12 v + \tfrac12 u_A^{\text{own}} - \tfrac12 u_B^{\text{own}}$. Differentiating in $a$, $A$’s marginal private return is $\tfrac12 v_a + \tfrac12 \partial u_A^{\text{own}} / \partial a$. Ownership by $A$ raises $\partial u_A^{\text{own}} / \partial a$ relative to non-ownership (the asset is more productive in $A$’s hands when $A$ has invested), and does not raise — typically lowers — $B$’s corresponding term. Hence $a$ rises and $b$ falls. The firm’s boundary is chosen at date 0 to maximise $v(a,b) - a - b$ given these induced investments. Completeness of the argument, including the bargaining protocol and the definition of access, is in Hart (1995).
:::

The criterion is a marginal one, and it cuts both ways. Giving the supplier the tool protects the supplier’s investment and *un*protects the buyer’s (the buyer’s engine-design investment, say, which is less valuable if the supplier can walk). There is no ownership structure that protects everyone. That is why the theory does not predict universal integration, and why it does not predict universal non-integration. The boundary of the firm is the ownership allocation that distorts the more important investment less.

::: example Who should own the tool? {#ex-who-owns}
The supplier’s investment $i$ has $v_S(i) = 4\sqrt{i}$ as in [[#ex-sqrt-holdup]], and the buyer makes no investment. The tool can be owned by the supplier or by the buyer. If the supplier owns, she is the residual claimant of $v$ (she can refuse access) and invests $i = 4$. If the buyer owns, the supplier’s disagreement payoff is 0 and Nash bargaining gives her $\tfrac12 v(i)$, so she invests $i = 1$. Which ownership maximises surplus? Now suppose the buyer also invests, in a complementary engine, and that engine is worthless without the supplier’s tool. What does [[#prop-ghm]] say?
::: solution
With only the supplier investing, supplier ownership yields surplus 4 and buyer ownership yields surplus 3. The supplier should own the tool. This is the case “only $A$’s investment matters”.

If the buyer’s engine is also essential and complementary, moving ownership to the supplier *lowers* the buyer’s incentive to design the engine, because on disagreement the supplier can withhold the tool. Whether supplier ownership still dominates depends on the relative curvatures. If the engine investment is the more important one (a more concave, more productive $v_B$), the buyer should own the tool — that is, the buyer should vertically integrate backward — even though that re-creates the supplier’s hold-up. The theory’s prediction is not “integrate to avoid hold-up”; it is “give residual control to the party whose investment is more important”.
:::
:::

::: application Make or buy
A car-maker can buy a component on the market or make it in a division. Under non-integration the component-maker owns her machines and bargains over the price; she invests in the machines, the car-maker invests in the model. Under integration the car-maker owns the machines, employs the component-maker’s staff, and decides their use. Integration protects the car-maker’s model-specific investment (it cannot be held up by a supplier who withholds the part) and weakens the component-maker’s incentive to invest in the machines (she is no longer the residual claimant). The prediction: parts that are highly specific to the model, and for which the car-maker’s design effort is the important one, are more likely to be made in-house. Parts that are generic, or for which the supplier’s engineering is the important investment, are more likely to be bought. That is a testable comparative static, and it is the one the empirical literature has taken to plant-level data.
:::

::: quiz
In the Grossman–Hart–Moore theory, vertical integration
- [ ] eliminates opportunism, because employees do as they are told
- [x] reallocates residual control, protecting one party’s investment and weakening the other’s
- [ ] is always better when investments are relationship-specific
- [ ] is equivalent to writing a complete contract on those investments
::: solution
Integration is a shift of ownership, not a suppression of bargaining. The acquired party’s incentives typically get worse; the acquirer’s get better. Specificity is what *creates* the quasi-rent, but it does not by itself say who should own. And if a complete contract on the investments were feasible, ownership would not matter: that is the complete-contract benchmark of the previous chapters.
:::
:::

## Evidence, history and disputes

The most famous illustration, General Motors’ 1926 acquisition of Fisher Body, was told by Klein, Crawford and Alchian (1978) and by Klein (1988) as a hold-up: Fisher, having invested in GM-specific stamping, refused to add capacity and charged a high price, and GM integrated to protect itself. Coase (2000) and Freeland (2000), reading the correspondence and the contracts, argued that the acquisition had other motives (including GM’s wish to lock in body supply in a growing market) and that Fisher was not in fact holding GM up in the way the parable describes. Casadesus-Masanell and Spulber (2000) reached a similar conclusion. The parable remains a useful teaching story; it is not a settled historical finding, and it should not be cited as one.

Plant-level and industry-level tests have been more systematic. Monteverde and Teece (1982) found that GM and Ford were more likely to make, rather than buy, components that required more engineering effort (a proxy for specificity and for the assembler-side investment). Masten (1984), on aerospace, found the same for highly specialised inputs. Joskow (1985, 1987), on US coal mines and power plants, found that mine-mouth plants — where the coal is specific to the plant because it is costly to ship — signed much longer contracts, a *contractual* response to specificity, and that vertical integration was more common when the specificity was greatest. Baker and Hubbard (2004), on US trucking, used the arrival of on-board computers as a change in *monitorability* (a complete-contract variable) and found a shift toward company drivers and away from owner-operators, which they read as a property-rights response to a change in what could be contracted on.

Acemoglu, Aghion, Griffith and Zilibotti (2010), using UK plant data, found that backward integration is more likely when the *producer’s* (downstream) investment is more important, which is the GHM comparative static. The evidence is not uniform across industries or countries, and alternative theories — agency costs of integration (outside investors lose control), knowledge-based views of the firm, and the relational-contracts view of Baker, Gibbons and Murphy (2002) — also have empirical support. The right conclusion is that residual control is one of the instruments firms actually use, not that it is the only one.

::: warning Integration is not a free lunch
A common slide from “there is hold-up” to “therefore integrate” skips the cost of integration. Inside the firm the acquired manager is no longer the residual claimant of her asset, and her incentive to invest in it, to maintain it, and to innovate on it, falls. That is [[#prop-ghm]](2). Empirically, acquired plants often lose productivity on dimensions that belonged to the target’s specific knowledge. The property-rights theory exists to *weigh* that cost against the benefit of protecting the acquirer’s investment, not to recommend integration whenever quasi-rents are positive.
:::

## Where this leads

Incomplete contracts are the reason ownership matters. They are also the reason that the first-best of [[information-economics/moral-hazard]] — a wage for every output — is sometimes the wrong template: if the output that matters cannot be described, there is nothing to attach the wage to, and control rights have to do the work. Relational contracts, from the previous chapter, are a third instrument, used when the parties can see what happened and will meet again, but a court cannot help.

The next two chapters step back from the firm and ask a more abstract question. If we can choose any mapping from reports to allocations — a **mechanism** — what can we implement, and when is efficient trade possible? The revelation principle will recast signalling, screening and the principal–agent problem as special cases. The Myerson–Satterthwaite theorem will then say that, in a bilateral trade with incomplete information and voluntary participation, even the best mechanism cannot be efficient. Hold-up is one reason markets fail to realise gains from trade; hidden information, in a complete mechanism, is another.

::: example A hold-up in two numbers {#ex-holdup-num}
A supplier can invest $I \in \{0, 10\}$. Investment $10$ raises the buyer's value from $12$ to $24$ and has no outside use. After investment they Nash-bargain, splitting the surplus equally. The supplier's outside option is $0$. Will she invest?
::: solution
If she invests, surplus is $24$, she gets $12$, net of $I$ that is $2$. If she does not, surplus is $12$, she gets $6$. She does *not* invest: $2 < 6$. Hold-up: she captures only half of the $12$ value increase, which is $6$, less than $I=10$. Joint surplus would be $24-10=14 > 12$, so the investment is efficient and is not made. Ownership of the tool that assigned her the residual would change the split; a complete contract on $I$ would too.
:::
:::

::: example Integration versus non-integration {#ex-gh-own}
In the Grossman–Hart–Moore 2-by-2, whoever owns the asset bargains with a stronger outside option. If only the supplier's investment matters, who should own the asset?
::: solution
The party whose investment is more important should own: ownership protects that party's residual return and so encourages the investment. If only the supplier invests, the supplier should own. If both invest, ownership is a trade-off — one party's incentive rises, the other's falls — and the model compares those two second-bests. That is the GHM answer to Coase: the firm is a bundle of residual control rights, allocated to protect the more important investment.
:::
:::

::: history
Ronald Coase’s “The Nature of the Firm” (1937) asked why firms exist; Oliver Williamson’s *Markets and Hierarchies* (1975) and *The Economic Institutions of Capitalism* (1985) made specificity and opportunism the working answer. Benjamin Klein, Robert Crawford and Armen Alchian (1978) put hold-up at the centre of vertical integration, with Fisher Body as the illustration. Sanford Grossman and Oliver Hart, “The Costs and Benefits of Ownership” (*Journal of Political Economy*, 1986), and Hart and John Moore (1990), shifted the question from “integrate or not” to “who should own the residual rights”, which is the theory of this chapter. Hart’s 1995 book *Firms, Contracts, and Financial Structure* is the canonical exposition. Hart shared the 2016 Nobel Prize with Bengt Holmström.
:::

::: summary
- Relationship-specific investment creates a quasi-rent. Under ex post bargaining the investor captures only a share and underinvests (hold-up).
- A complete contract would restore efficiency; non-verifiability, indescribability and writing costs make the contract incomplete.
- Ownership is residual control: the right to decide when the contract is silent. Reallocating ownership raises one party’s investment incentive and lowers the other’s.
- The GHM criterion: the asset should be owned by the party whose specific investment is more important. Integration is not always better.
- Evidence from components, coal and trucking is consistent with specificity and residual control mattering; the Fisher Body story is a parable with a disputed history.
:::

## Exercises

::: exercise First-best investment {level=1 check="4"}
For $v(i) = 4\sqrt{i}$, what is the first-best investment $i^*$? (Enter it.)
::: solution
$2/\sqrt{i} = 1$ gives $i^* = 4$.
:::
:::

::: exercise Nash investment {level=1 check="1"}
In the same example, under a fifty-fifty split, what investment does the supplier choose? (Enter it.)
::: solution
$1/\sqrt{i} = 1$ gives $i^N = 1$.
:::
:::

::: exercise Deadweight loss {level=1 check="1"}
What is the hold-up deadweight loss in [[#ex-sqrt-holdup]]? (Enter it.)
::: solution
First-best surplus 4, Nash surplus 3, loss 1.
:::
:::

::: exercise A different split {level=2}
Let $v(i) = 4\sqrt{i}$ and suppose the supplier’s bargaining share is $\alpha = 3/4$, not $1/2$. Compute $i$, $v(i)$, social surplus and the supplier’s payoff.
::: solution
$2\alpha / \sqrt{i} = 1$ gives $\sqrt{i} = 2\alpha = 3/2$, $i = 9/4 = 2.25$. Then $v = 4 \times 1.5 = 6$. Social surplus $6 - 2.25 = 3.75$. Supplier’s payoff $\tfrac34 \times 6 - 2.25 = 4.5 - 2.25 = 2.25$. The loss relative to first-best is $4 - 3.75 = 0.25$, smaller than the fifty-fifty loss of 1, because $\alpha$ is closer to 1.
:::
:::

::: exercise Two complementary investments {level=2}
Parties $A$ and $B$ invest $a, b \in \{0, 1\}$ at cost $1$ each if they invest. Joint surplus $v$ is $0$ if neither invests, $3$ if only one invests, and $8$ if both invest. Disagreement payoffs are $0$ for a non-owner and, for an owner, $2$ if she invested and $0$ if she did not. Under Nash bargaining, each gets her disagreement payoff plus half the quasi-rent. Compute $A$’s private return to investing when $A$ owns, assuming $B$ invests, and when $B$ owns, assuming $B$ invests. Who should own, if only one can?
::: hint
Quasi-rent is $v$ minus the two disagreement payoffs. Compare $A$’s payoff when she invests with her payoff when she does not, in each ownership regime.
:::
::: solution
*A owns, B invests.* If $A$ invests: $v = 8$, disagreement $(u_A, u_B) = (2, 0)$, quasi-rent $6$, $A$’s payoff $2 + 3 - 1 = 4$ (including her cost). If $A$ does not: $v = 3$, disagreement $(0, 0)$, quasi-rent $3$, $A$’s payoff $1.5$. So $A$ invests (4 > 1.5).

*B owns, B invests.* If $A$ invests: $v = 8$, disagreement $(0, 2)$, quasi-rent $6$, $A$’s payoff $0 + 3 - 1 = 2$. If $A$ does not: $v = 3$, disagreement $(0, 2)$ if $B$ invested… $B$ as owner has disagreement 2, $A$ has 0, quasi-rent $1$, $A$’s payoff $0.5$. So $A$ still invests (2 > 0.5), but her *gain* from investing is $2 - 0.5 = 1.5$, against $4 - 1.5 = 2.5$ when she owns. Ownership by $A$ gives $A$ a stronger incentive. By symmetry, if the two investments are equally important, either ownership structure can be efficient provided both still invest; if $A$’s investment were a knife-edge, $A$ should own.
:::
:::

::: exercise A linear-quadratic hold-up {level=2}
Let $v(i) = 10 i - i^2/2$, with $i \in [0, 10]$. Find $i^*$ and $i^N$ under fifty-fifty Nash. Compute the two surpluses and the loss.
::: solution
$v'(i) = 10 - i$. First-best: $10 - i = 1$, $i^* = 9$, $v = 90 - 81/2 = 49.5$, surplus $49.5 - 9 = 40.5$. Nash: $\tfrac12(10 - i) = 1$, $10 - i = 2$, $i^N = 8$, $v = 80 - 32 = 48$, surplus $48 - 8 = 40$. Loss $0.5$. (When $v$ is not very concave, the underinvestment is small: the two first-order conditions $v' = 1$ and $v' = 2$ are close in $i$.)
:::
:::

::: exercise Why a price contract may fail {level=3}
Suppose the parties try to avoid hold-up by agreeing, at date 0, on a price $p$ at which the part will be sold at date 1. The part’s value to the buyer is $v(i, \theta)$ and its cost to the supplier (beyond $i$) is $c(\theta)$, where $\theta$ is a state realised at date 1 and observed by both parties but not by a court. Trade is efficient if and only if $v(i, \theta) \ge c(\theta)$. Show that a single posted $p$ cannot implement efficient trade in every state if the supports of $v$ and $c$ overlap in the sense that $v > p > c$ and $v < p < c$ both occur with positive probability. What would a complete contract need to specify?
::: hint
Trade occurs, under a posted $p$, iff the buyer wants to buy at $p$ and the supplier wants to sell at $p$.
:::
::: solution
Under a posted $p$, the buyer buys if $v(i, \theta) \ge p$ and the supplier sells if $p \ge c(\theta)$. Trade therefore occurs only when $v \ge p \ge c$. Efficient trade requires only $v \ge c$. The two events differ whenever $v \ge c$ but $p$ does not lie between them: if $c \le v < p$ the buyer refuses a trade that should happen; if $p < c \le v$ the supplier refuses a trade that should happen. A single $p$ cannot lie in every realised $[c(\theta), v(i,\theta)]$ unless that interval is the same in every state. A complete contract would specify $p(\theta)$ for each $\theta$, or would specify “trade iff $v \ge c$ and split the surplus”, both of which require $\theta$ (or $v$ and $c$) to be verifiable. That is exactly the incompleteness.
:::
:::

::: exercise An outside option and the threat point {#exr-outside level=3}
Modify [[#ex-sqrt-holdup]] so that the supplier, after investing $i$, has an outside option worth $\phi i$ with $\phi \in (0, 1)$: the tool is partially specific. Nash bargaining now gives the supplier $\phi i + \tfrac12 \bigl(v(i) - \phi i\bigr) = \tfrac12 v(i) + \tfrac12 \phi i$, and she pays the cost $i$ at date 0. Compute her first-order condition and show that $i$ is increasing in $\phi$. At $\phi = 0$ recover $i^N = 1$; as $\phi \to 1$, what happens to $i$ if $v(i) = 4\sqrt{i}$? Interpret.
::: solution
Payoff: $\tfrac12 \cdot 4\sqrt{i} + \tfrac12 \phi i - i = 2\sqrt{i} - \bigl(1 - \phi/2\bigr) i$. First-order condition: $1/\sqrt{i} = 1 - \phi/2$, so $\sqrt{i} = 1/(1 - \phi/2)$, $i = 1/(1 - \phi/2)^2$. At $\phi = 0$, $i = 1$. The derivative in $\phi$ is positive. As $\phi \to 1$, $i \to 1/(1/2)^2 = 4$, which is first-best. A less specific investment (a better outside option) is less held up, and at $\phi = 1$ the tool is generic, bargaining does not distort, and $i = i^*$. This is Williamson’s comparative static: more specificity, more underinvestment, more reason to reallocate ownership.
:::
:::

::: exercise Integration and both investments {level=3}
Two parties invest continuously, $a, b \ge 0$, with $v(a,b) = 2\sqrt{a} + 2\sqrt{b} + 2\sqrt{ab}$, costs $a$ and $b$. Under non-integration, disagreement payoffs are $\sqrt{a}$ and $\sqrt{b}$. Under $A$-integration, disagreement payoffs are $2\sqrt{a}$ and $0$. (These are illustrative, not derived from a production function.) Assuming Nash bargaining and interior first-order conditions, compare $A$’s incentive to invest under the two regimes. Which regime would you expect to induce more $a$ and less $b$?
::: hint
$A$’s payoff is $\tfrac12 v + \tfrac12 u_A - \tfrac12 u_B$ minus $a$. Differentiate in $a$.
:::
::: solution
$A$’s payoff: $\tfrac12 v(a,b) + \tfrac12 u_A - \tfrac12 u_B - a$. Marginal return: $\tfrac12 v_a + \tfrac12 \partial u_A/\partial a$.

Here $v_a = 1/\sqrt{a} + \sqrt{b}/\sqrt{a} = (1 + \sqrt{b})/\sqrt{a}$. Under non-integration, $\partial u_A/\partial a = 1/(2\sqrt{a})$. Under $A$-integration, $\partial u_A/\partial a = 1/\sqrt{a}$, which is larger, and $u_B = 0$ so that term does not depend on $a$. Hence $A$’s marginal return is higher under $A$-integration, so $a$ is higher. $B$’s corresponding calculation gives a lower marginal return under $A$-integration (her disagreement payoff is 0, insensitive to $b$, whereas under non-integration it is $\sqrt{b}$). So $A$-integration induces more $a$ and less $b$, which is [[#prop-ghm]]. Choosing the regime is then a comparison of the two induced $(a,b)$ pairs in the welfare function $v - a - b$.
:::
:::
