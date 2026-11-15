A driver buys petrol and does not notice that a sales tax of several per cent has been added at the pump. When the same tax is posted on the price sign, demand falls by about the amount a standard price elasticity would predict. Chetty, Looney and Kroft (2009), using a field experiment in a grocery store and a state-level change in alcohol taxes, estimated that consumers under-react to taxes that are not included on the shelf label: the attention weight on the tax was around $0.35$, not $1$. The standard consumer of [[microeconomics/consumer-choice]] maximises $u(x)$ on $p \cdot x \le m$, and $p$ is the full price. An inattentive consumer maximises as if the price were $p$ plus only a piece of the tax. The difference is not a preference. It is a constraint on what enters the maximand.

This chapter is about that constraint: **limited attention**, **salience**, **framing** and **mental accounting**. The four names overlap, and the literature has not settled on one model. The working distinction used here is that framing and mental accounting are about *which evaluation* is applied to a given object (a gain, a loss, a budget), while salience and inattention are about *which attributes* of the object are seen. Choice overload — the claim that more options make people less likely to choose — sits in between, and its evidence is among the most contested in the course.

## Inattention as a weight on an attribute

Let a good have a posted price $q$ and an add-on $t$ (a tax, a shipping fee, a shrouded attribute). The full price is $q + t$. A fully attentive consumer’s demand is $x(q+t)$. An inattentive consumer’s demand is $x(q + \theta t)$, with **attention weight** $\theta \in [0, 1]$. Chetty, Looney and Kroft’s estimate is a number in that interval. Gabaix (2014) derived $\theta$ from a sparsity-based cost of paying attention; Sims’s rational inattention derived a related weight from a Shannon-capacity constraint. For this chapter the reduced form $x(q + \theta t)$ is enough, and it is already enough to change incidence, pass-through and the welfare cost of a tax.

::: definition Attention weight {#def-theta}
An agent has **attention weight** $\theta \in [0, 1]$ on an add-on $t$ if her demand is $x(q + \theta t)$ rather than $x(q+t)$. Full attention is $\theta = 1$; complete neglect is $\theta = 0$. The **perceived price** is $\hat p = q + \theta t$; the **paid price** is $p = q + t$.
:::

::: proposition Under-reaction to a shrouded tax {#prop-tax}
Suppose Marshallian demand $x(\cdot)$ is differentiable and strictly decreasing. If a tax $t$ is introduced as an add-on and attention is $\theta < 1$, then $\bigl\lvert \mathrm{d}x/\mathrm{d}t \bigr\rvert = \theta \bigl\lvert x'(q+\theta t) \bigr\rvert < \bigl\lvert x'(q+t) \bigr\rvert$ evaluated at a small $t$ near $0$ (to first order, the response is $\theta$ times the full-attention response). The agent pays $q+t$ on every unit she buys.
:::
::: proof
Chain rule: $\mathrm{d}x/\mathrm{d}t = x'(q+\theta t) \cdot \theta$. Strictly decreasing $x$ gives the inequality of absolute values for $\theta < 1$, at $t = 0$ compared with $\theta = 1$. The budget is charged $q+t$ per unit regardless of $\theta$: inattention changes what is maximised, not what is paid.
:::

The welfare economics is uncomfortable. The agent would have preferred, at the true prices, a different bundle; she does not commit a “preference reversal” in the Allais sense, she commits a **perception error**. Chetty, Looney and Kroft compute a deadweight-loss triangle using the *perceived* slope and then note that the true resource cost is the full-price triangle. Behavioural welfare, in [[behavioural-economics/behavioural-policy]], has to take a stand on whether $\theta < 1$ is a mistake to be corrected or a rational response to the cost of attending. Both stands are in the literature.

::: example A linear demand and a $10\%$ add-on {#ex-tax}
Inverse demand is $p = 12 - x$ (so $x = 12 - p$), the posted price is $q = 4$, and an add-on tax $t = 0.8$ is either posted or not. Compute the full-attention quantity, the $\theta = 0.35$ quantity, and the extra units bought under inattention. What is paid in total tax in each case?
::: solution
Full attention: $p = 4.8$, $x = 12 - 4.8 = 7.2$. Inattentive: perceived price $4 + 0.35 \times 0.8 = 4.28$, $x = 12 - 4.28 = 7.72$. Extra units: $0.52$. Tax paid: $0.8 \times 7.2 = 5.76$ when attentive, $0.8 \times 7.72 = 6.176$ when inattentive. Inattention *raises* tax revenue here, because it flattens the response of $x$ to $t$ ([[#prop-tax]]). Incidence between buyer and seller, in a model with an upward-sloping supply, would also shift: the statutory add-on is less salient, so more of it sticks where the label does not show it.
:::
:::

::: widget plot
f: 12 - x; 4; 4.8; 4.28
x: 0, 12
y: 0, 13
labels: \text{inverse demand}; \text{posted }q; \text{full price }q+t; \text{perceived }q+\theta t
caption: Linear demand $p = 12 - x$ as in [[#ex-tax]]. The three horizontals are the posted price $4$, the full price $4.8$, and the perceived price $4.28$ at $\theta = 0.35$. Quantity is read off the demand curve at the price the agent *sees*. The tax she *pays* is on the full-price line.
:::

Gabaix and Laibson (2006) applied the same logic to **shrouded attributes**: a base price that is seen and an add-on (shipping, ink, a hotel minibar, a bank fee) that is not. In equilibrium, firms may shroud the add-on and compete the base price down, with sophisticated consumers substituting away from the add-on and naive consumers funding the discount. The naive consumers are not “irrational” in the Allais sense; they are $\theta = 0$ on the add-on. Education that raises $\theta$ can *hurt* the remaining naifs, because it reduces the cross-subsidy. That is a political-economy warning, not a recommendation about any particular fee.

## Salience and left-digit cutoffs

Bordalo, Gennaioli and Shleifer (2012, 2013, 2020) proposed that attributes which *differ more than usual* across the menu are **salient**, and that salient attributes are overweighted. A wine that is cheaper than the other wines on the list has a salient price; the same wine on a list of still cheaper wines does not. Salience is context-dependent attention: $\theta$ is a function of the menu, not a fixed weight on a named add-on. The model delivers decoy effects, context-dependent willingness to pay, and a form of the endowment effect, from one overweighting mechanism.

A cruder, and very well documented, cousin is **left-digit bias**. Prices of $7.99$ are more common than $8.00$ for a reason: the leading digit is the salient attribute of the price, and $7.99$ is seen as closer to $7$ than to $8$. Lacetera, Pope and Sydnor (2012) found that used-car prices in US wholesale auctions dropped discontinuously as the odometer rolled over a $10\,000$-mile threshold, by more than the smooth depreciation around it would justify — a left-digit effect on mileage, not on the price. The same logic appears in $99$-cent pricing, in 1.99 versus 2.00, and in the bunching of reported numbers.

::: example A shrouded shipping fee {#ex-ship}
A good has posted price $q = 20$ and a shipping fee $t = 5$ that is revealed only at checkout. Inverse demand is $p = 40 - x$. Compare quantity if $\theta = 1$ on shipping with quantity if $\theta = 0$. How much extra shipping revenue does inattention generate, and who pays it?
::: solution
Full attention: $p = 25$, $x = 15$. Neglect: perceived price $20$, $x = 20$. Extra units $5$; extra shipping revenue $5 \times 5 = 25$, all paid by the inattentive buyers (including on the $15$ units they would have bought anyway, $75$ of shipping, plus $25$ on the extra units). The seller who can set $q$ in a competitive market may cut $q$ and recoup on $t$, as in Gabaix and Laibson; the arithmetic of extra units is the same. This is a model of a posted fee, not a recommendation about shipping.
:::
:::

::: definition Left-digit bias {#def-leftdigit}
An agent has **left-digit bias** of degree $\lambda \in [0, 1]$ on a posted number $z$ (a price, a mileage) if she evaluates $z$ as $(1-\lambda) z + \lambda \lfloor z \rfloor_{\text{base}}$, where $\lfloor z \rfloor_{\text{base}}$ is $z$ rounded down to the leading-digit threshold (tens, hundreds, thousands). Full left-digit neglect of the remainder is $\lambda = 1$; none is $\lambda = 0$.
:::

::: example Ninety-nine cents {#ex-99}
A good’s true value is $8$ to a consumer, and she buys if perceived price $\le 8$. With $\lambda = 0.4$ on a base of $1$ (so $\lfloor 7.99 \rfloor = 7$), does she buy at $7.99$? At $8.00$? What $\lambda$ is needed to make $7.99$ look like $7.60$ or less?
::: solution
Perceived $7.99$: $(1-0.4)\times 7.99 + 0.4 \times 7 = 4.794 + 2.8 = 7.594 \le 8$, so yes. Perceived $8.00$: $(1-0.4)\times 8 + 0.4 \times 8 = 8$, a knife-edge buy. The drop in perceived price at the threshold is $\lambda$ times the remainder $0.99$, here $0.396$. To make $7.99$ look like $7.60$: $(1-\lambda)7.99 + \lambda \cdot 7 = 7.60$, $7.99 - 0.99\lambda = 7.60$, $0.99\lambda = 0.39$, $\lambda \approx 0.394$. A moderate left-digit weight already produces a $40$-cent perceived gap between $7.99$ and $8.00$.
:::
:::

## Framing and mental accounting

Tversky and Kahneman (1981) distinguished **frames**: two descriptions of the same consequence that produce two choices. The Asian-disease problem in [[behavioural-economics/rationality-and-anomalies]] is the textbook case; prospect theory ([[behavioural-economics/prospect-theory]]) is the model, with the frame selecting the reference point. **Mental accounting** (Thaler 1980, 1985, 1999) is a related but broader hypothesis: people assign activities to psychological accounts (a food account, a holiday account, a windfall account) and apply prospect-theory $v$ *inside* the account, with limited fungibility *across* accounts.

Three regularities organise the idea.

**Fungibility fails.** A windfall of $100$ labelled “entertainment” is spent on entertainment at a higher rate than $100$ of wages, even though money is money. Hastings and Shapiro (2013) found that when petrol prices fall, households buy more premium petrol — as if the petrol account had a surplus — rather than spreading the saving across the budget as a fungible-money model predicts. The income effect of a petrol-price fall is small; the *account* effect is not.

**Integration versus segregation.** Prospect theory’s $v$ is concave on gains and convex on losses, so $v(a) + v(b)$ and $v(a+b)$ are not equal. Two gains are savoured separately (segregation); two losses are preferred as a lump (integration); a loss that can be absorbed in a larger gain is preferred integrated (“silver lining” when a small gain is segregated from a large loss). Thaler’s hedonic-editing hypothesis is that people *choose* the frame that maximises $v$. The evidence for spontaneous hedonic editing is mixed; the evidence that *presented* frames of this kind change choices is not.

**Payment decoupling and sunk costs.** Prepaying a holiday, or a theatre season, moves the loss of payment away from the consumption, which $v$ likes (the consumption is then a gain without a simultaneous loss). Combined with the sunk-cost coding of [[behavioural-economics/rationality-and-anomalies]], it also produces over-consumption of already-paid goods: the account will not close in the red. Whether that is a welfare mistake depends on whether the agent’s date-$0$ self wanted the date-$1$ self to be locked in, a present-bias question, or whether the agent is simply applying $v$ to the wrong account.

::: definition Mental account {#def-account}
A **mental account** is a grouping of outcomes to which a value function $v$ is applied, with a reference point and a budget that are local to the group. **Fungibility** across accounts fails when a re-labelling of a transfer, holding total wealth fixed, changes choice.
:::

::: example Hedonic editing of two outcomes {#ex-hedonic}
Using $v(\Delta) = \Delta^{0.88}$ on gains and $v(\Delta) = -2.25(-\Delta)^{0.88}$ on losses, compare $v(100)+v(50)$ with $v(150)$, and compare $v(-100)+v(-50)$ with $v(-150)$. Which pairs does diminishing sensitivity prefer to segregate, and which to integrate?
::: solution
$v(100) \approx 57.54$, $v(50) \approx 31.27$, sum $88.81$; $v(150) \approx 82.22$. Two gains: $88.81 > 82.22$, so **segregate**. $v(-100) \approx -129.47$, $v(-50) \approx -70.35$, sum $-199.82$; $v(-150) \approx -185.00$. Two losses: $-185 > -200$, so **integrate**. Diminishing sensitivity ($0 < \alpha < 1$) makes $v$ concave on gains, hence $v(a)+v(b) > v(a+b)$ for $a, b > 0$, and convex on losses, hence $v(-a)+v(-b) < v(-(a+b))$. The sign pattern is a property of [[behavioural-economics/prospect-theory#eq-value]], not an extra axiom.
:::
:::

::: warning A frame is not a preference
Reporting that “$72\%$ chose A in the gain frame and $78\%$ chose B in the loss frame” is a fact about descriptions. It is not a preference relation on outcomes, and it cannot be fed into a welfare theorem without a rule that says which frame is the right one. Kahneman, Knetsch and Thaler’s (1991) commentary, and the behavioural-welfare literature of [[behavioural-economics/behavioural-policy]], treat this as the central problem, not as a detail. A planner who picks the frame that produces the choice she likes is not implementing the agent’s preference; she is choosing it.
:::

## Choice overload

Iyengar and Lepper (2000) set up a tasting booth of jams in a grocery: $6$ flavours in one treatment, $24$ in another. About $30\%$ of those who stopped at the small assortment bought a jam; about $3\%$ of those who stopped at the large assortment did. The paper is widely cited as “more choice reduces choice”. The subsequent literature is a warning about this course’s method.

Scheibehenne, Greifeneder and Todd (2010), in a meta-analysis of $50$ experiments, found a mean effect of essentially zero, with large heterogeneity. Chernev, Böckenholt and Goodman (2015), in a later meta-analysis, found a negative effect of larger assortments on choice *when* the chooser is uncertain, has no well-defined preference, or faces a complex option, and a positive or null effect otherwise. Reutskaja, Nagel, Camerer and Rangel (2011), with eye-tracking, found that people search a large menu with a stopping rule, which is Simon’s satisficing ([[behavioural-economics/rationality-and-anomalies]]) rather than a paralysis. Iyengar, Jiang and Huberman’s related finding that more funds in a $401(\mathrm{k})$ menu reduced participation has also been re-examined; the administrative-data picture is mixed and is entangled with the quality of the funds, not only their number.

The honest summary is not “choice overload is false” and not “choice overload is a law”. It is that a large menu can raise the cost of attending ([[#def-theta]]), raise the chance of a regret-salient option, or raise the chance of a dominated decoy, and that those mechanisms sometimes reduce take-up and sometimes do not. A planner who cuts a menu in the name of overload needs an estimate for *that* menu, not a citation to the jam aisle.

::: quiz
Chetty, Looney and Kroft’s attention weight $\theta \approx 0.35$ on a not-posted sales tax means that
- [ ] consumers pay only $35\%$ of the tax
- [x] demand responds about $35\%$ as much as it would if the tax were posted, while the tax paid per unit is the full amount
- [ ] the tax is illegal
- [ ] $\theta$ is a preference parameter like $\beta$ in $\beta$–$\delta$ discounting
::: solution
[[#def-theta]] and [[#prop-tax]]: $\theta$ scales the *derivative* of demand, not the statutory tax. The till charges $q+t$. And $\theta$ is a perception parameter, not a discount factor; it can be a chosen attention under a cost of thinking (Gabaix, Sims), but it is not $\beta$.
:::
:::

## Evidence

**Taxes and shrouded prices.** Chetty, Looney and Kroft (2009) is the required citation for tax salience; Finkelstein (2009) found that electronic toll collection, which makes the toll less salient, raised tolls. Busse, Silva-Risso and Zettelmeyer (2006) on car sales, and a subsequent literature on add-on insurance and airline baggage fees, document shrouded attributes in the Gabaix–Laibson mould. Hossain and Morgan (2006) found that eBay bidders under-react to shipping charges relative to the opening price.

**Left digits and round numbers.** Lacetera, Pope and Sydnor (2012) on odometers; a long industrial-organisation literature on $99$-cent pricing; Kleven and Waseem (2013) on notches in the Pakistani income tax, where bunching is a (rational) response to a true discontinuity, the comparison case in which the threshold is *not* a perception error.

**Mental accounting in the field.** Hastings and Shapiro (2013) on petrol grade; Milkman and Beshears (2009) on a shopping-card windfall; a household-finance literature on “pockets” of saving earmarked for particular goals. These studies describe how money is labelled. They are not advice about how to label it.

**What is contested.** Choice overload, as above. The welfare interpretation of $\theta < 1$: a cost of attention that the agent has already optimised, or a mistake. The two interpretations disagree about whether posting the tax is a Pareto improvement (it is, if $\theta$ is a mistake and posting is cheap; it need not be, if $\theta$ was an optimal inattention and posting forces a costly re-optimisation, or if shrouding was cross-subsidising). Koszegi and Szeidl (2013), and Bordalo, Gennaioli and Shleifer’s salience papers, are competing structural models; reduced-form $\theta$ does not distinguish them.

::: history
Tversky and Kahneman (1981) is the framing paper; Thaler (1980, 1985, 1999) named mental accounting and wrote it into consumer theory. Simon’s 1955 satisficing is the ancestor of choice-overload mechanisms. Chetty, Looney and Kroft (2009) and Gabaix and Laibson (2006) are the two papers that made inattention an equilibrium object in public finance and in industrial organisation. Gabaix (2014) and Sims (2003, rational inattention) are the leading microfoundations of $\theta$. Bordalo, Gennaioli and Shleifer (2012, 2013) made salience menu-dependent. Iyengar and Lepper (2000) is the jam study; Scheibehenne, Greifeneder and Todd (2010) and Chernev, Böckenholt and Goodman (2015) are the meta-analyses that qualified it.
:::

## Where this leads

Inattention is one of the two leading explanations of default effects, the other being present bias ([[behavioural-economics/present-bias]]). They have different welfare implications, which [[behavioural-economics/behavioural-policy]] has to face. Salience and framing are the mechanisms by which a planner, a firm or a newspaper selects a reference point for prospect theory ([[behavioural-economics/prospect-theory]]). Mental accounts interact with social preferences when an account is labelled “fair share” ([[behavioural-economics/social-preferences]]). Behavioural game theory ([[behavioural-economics/behavioural-game-theory]]) is, in one reading, a theory of limited attention to the other player’s reasoning. The standard consumer of [[microeconomics/consumer-choice]] is the special case $\theta = 1$, one account, and a frame that does not move.

::: summary
- An attention weight $\theta$ ([[#def-theta]]) scales the response of demand to an add-on; it does not scale the add-on that is paid ([[#prop-tax]]).
- Salience makes $\theta$ menu-dependent. Left-digit bias ([[#def-leftdigit]]) is a documented, quantitatively large special case.
- Framing selects a reference point; mental accounting ([[#def-account]]) groups outcomes into non-fungible budgets and applies $v$ inside the group. Hedonic editing is a comparative-static of $v$, not an extra model.
- Choice overload is heterogeneous: real in some menus, absent in others, and not a licence to cut every list.
- Whether $\theta < 1$ is a mistake or an optimal inattention decides whether posting a tax, or unshrouding a fee, raises welfare. That is a behavioural-welfare question, not a revealed-preference identity.
- $\theta = 1$ and a single account recover the standard consumer.
:::

## Exercises

::: exercise Perceived price {level=1 check="4.28"}
In [[#ex-tax]], enter the perceived price $q + \theta t$ at $\theta = 0.35$.
::: solution
$4 + 0.35 \times 0.8 = 4.28$.
:::
:::

::: exercise Extra units {level=1 check="0.52"}
In [[#ex-tax]], enter the extra units bought under inattention.
::: solution
$7.72 - 7.2 = 0.52$.
:::
:::

::: exercise Left digit {level=1}
With $\lambda = 0.5$ and base $1$, what is the perceived price of $5.99$? Of $6.00$?
::: solution
$0.5 \times 5.99 + 0.5 \times 5 = 2.995 + 2.5 = 5.495$. For $6.00$: $6$. The perceived gap is $0.505$, against a true gap of $0.01$.
:::
:::

::: exercise Incidence of $\theta$ {level=2}
A linear inverse demand $p = a - b x$ and a perfectly elastic supply at cost $c$. A specific tax $t$ is levied as an add-on, with attention $\theta$. What is the equilibrium quantity as a function of $\theta$? How does $\mathrm{d}x/\mathrm{d}t$ depend on $\theta$?
::: hint
Consumers perceive $c + \theta t$; supply is horizontal at $c$ before tax, and the statutory tax is paid on top of $c$.
:::
::: solution
Perceived price $c + \theta t$, so $c + \theta t = a - b x$, $x = (a - c - \theta t)/b$. Then $\mathrm{d}x/\mathrm{d}t = -\theta/b$, which is $\theta$ times the full-attention slope $-1/b$. Quantity falls less, when $\theta < 1$, and the resource cost of the tax (the wedge $t$ on each unit) is still $t$. Revenue is $t x = t(a-c-\theta t)/b$, which can rise or fall in $\theta$ depending on the side of the Laffer comparison; at small $t$, revenue is decreasing in $\theta$ (more attention, more avoidance).
:::
:::

::: exercise Two gains {level=2 check="88.81"}
Using $v(\Delta) = \Delta^{0.88}$, enter $v(100)+v(50)$ to two decimal places. Compare with $v(150) \approx 82.22$ and say whether to segregate or integrate.
::: solution
$57.54 + 31.27 = 88.81 > 82.22$, so segregate ([[#ex-hedonic]]).
:::
:::

::: exercise A mental-account re-labelling {level=2}
A household has a “petrol” account and a “food” account, and a windfall of $20$ that can be labelled as either. Under fungible money, the label cannot change the bundle. Under a strict mental-accounting rule that extra petrol-account money must be spent on petrol, what happens to the grade of petrol purchased, and which paper in this chapter is the field analogue?
::: solution
The petrol account’s budget rises by $20$, the food account does not; petrol expenditure rises by (up to) $20$, including a possible move to a higher grade, which a fungible model would not produce from a $20$ income effect. Hastings and Shapiro (2013) is the analogue, with the “windfall” generated by a fall in the petrol price rather than by a labelled transfer.
:::
:::

::: exercise Shrouding and cross-subsidy {level=3}
A firm sells a base good at price $q$ and an add-on at price $t$. Fraction $\mu$ of consumers are naive ($\theta = 0$ on the add-on) and $1-\mu$ are sophisticated ($\theta = 1$); sophisticates can avoid the add-on at a cost of $0$ (they simply do not buy it). Marginal cost of the base is $c$, of the add-on is $0$. Competition forces expected profits to zero. Explain why $q$ can fall below $c$, who pays for that discount, and why a policy that converts naifs into sophisticates can hurt the remaining naifs.
::: hint
Zero-profit means $q - c + \mu t = 0$ if only naifs buy the add-on.
:::
::: solution
Sophisticates buy only the base, naifs buy base plus add-on. Zero profit: $(q-c) + \mu t = 0$, so $q = c - \mu t < c$ if $t > 0$. The discount on the base is funded by add-on payments from naifs. A policy that reduces $\mu$ (education, a disclosure that raises $\theta$) shrinks the cross-subsidy: $q$ rises toward $c$, and the remaining naifs pay a higher $q$ plus the same $t$. They can be worse off. This is the Gabaix–Laibson (2006) comparative static. It is an argument about incidence, not an argument that shrouding is desirable: the remaining-naif harm has to be weighed against the newly sophisticated consumers’ gain and against any resource cost of the add-on.
:::
:::

::: exercise Choice overload, two meta-analyses {level=3}
Scheibehenne, Greifeneder and Todd (2010) report a mean effect near zero; Chernev, Böckenholt and Goodman (2015) report a negative effect in a subset of designs. Write four sentences a student could use as a referee report on a paper that cites only Iyengar and Lepper (2000) to justify cutting a menu of twenty options to five.
::: solution
The jam-aisle result is a single experiment with a particular product, a particular display, and a particular outcome (purchase of a jam after tasting). Two meta-analyses of the subsequent literature do not support a general law that “more options reduce choice”: one finds a mean near zero, the other finds a negative effect only when preference uncertainty or complexity is high. Cutting twenty options to five may help, hurt, or do nothing, depending on whether the twenty contain dominated decoys, whether the chooser has a well-formed preference, and whether search costs are actually high in this menu. A justification for the cut needs an estimate — or at least a mechanism — for this menu, not a citation to 2000. (If the paper also cites Chernev et al. and argues that this chooser is uncertain, the referee’s tone changes; the complaint is the *only*-citing-2000, not the cut.)
:::
:::

::: exercise Frame-invariance as an axiom {level=2}
State, in one sentence, the invariance that Tversky and Kahneman (1981) showed fails, and name the prospect-theory object that replaces it. Why can revealed preference not settle which of two frames is the welfare-relevant one?
::: solution
**Description invariance**: the ranking of two consequences should not depend on which of two equivalent descriptions is used. Prospect theory replaces it with a reference point $r$ that the description selects. Revealed preference cannot settle the welfare question because the two frames produce two revealed rankings of the same outcomes; there is no third, frame-free choice that could adjudicate. A welfare criterion has to come from outside the choice data — a “true” $r$, a long-run preference, or an opportunity criterion — which is the subject of [[behavioural-economics/behavioural-policy]].
:::
:::
