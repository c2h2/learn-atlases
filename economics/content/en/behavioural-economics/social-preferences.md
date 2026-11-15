A proposer is given $10$ units and offers a split to a responder. If the responder accepts, the split is paid; if she rejects, both get nothing. A self-interested responder accepts any positive amount. In the laboratory she often rejects offers below about two or three units, and proposers, anticipating that, often offer four or five. Güth, Schmittberger and Schwarze (1982) named the game the **ultimatum game**, and it is still the most famous exhibit in the social-preferences literature. The standard model of [[game-theory/nash-equilibrium]], with payoffs equal to own money, predicts $(10, 0)$ or a penny more. Something else is being maximised.

This chapter is about that something else: **social preferences**, in which $i$’s utility depends on $j$’s payoff as well as on $i$’s. Altruism, inequality aversion, reciprocity and guilt are the leading functional forms. The ultimatum game, the dictator game, the public-goods game and gift exchange are the leading environments. Fehr and Schmidt (1999) is the workhorse model, because it is tractable, it nests self-interest, and it organises a surprising range of results with a few fair-minded agents. The chapter also records the criticisms: stakes, culture, experimenter demand, and the fact that a preference estimated in a $10$-unit laboratory game need not be the preference that sets a wage.

## Own-payoff maximisation and its laboratory failures

Write $x_i$ for $i$’s material payoff. The standard assumption $u_i = x_i$ is a special case of a rational preference ([[behavioural-economics/rationality-and-anomalies]]): it is complete, transitive and selfish. It is also the assumption that delivers unique, sharp predictions in the games below.

::: definition Standard experimental games {#def-games}
In the **ultimatum game**, a proposer offers a split of a pie $\pi$; the responder accepts (proposer keeps $\pi-s$, responder gets $s$) or rejects (payoffs $(0,0)$). In the **dictator game**, the responder has no move and the proposer’s offer is paid. In a **linear public-goods game** of $n$ players, each has endowment $e$ and contributes $c_i \in [0, e]$; payoffs are $x_i = e - c_i + m \sum_j c_j$ with **marginal per capita return** $m \in (1/n, 1)$. In a **trust** (or investment) **game**, a sender may pass $k$ of her endowment to a receiver, the pass is multiplied by $q > 1$, and the receiver may return any amount.
:::

Own-payoff Nash predictions: ultimatum offers the smallest unit and is accepted; dictator offers zero; public-goods contributions are zero (a prisoner’s dilemma); the trust-game receiver returns nothing and the sender sends nothing. The laboratory, in hundreds of sessions, disagrees in a structured way.

**Ultimatum.** Offers of $40$–$50\%$ of the pie are common; offers below $20\%$ are frequently rejected. The pattern holds, with quantitative variation, in Roth, Prasnikar, Okuno-Fujiwara and Zamir (1991) across four countries, in Cameron (1999) at high stakes in Indonesia, and in Andersen, Ertaç, Gneezy, Hoffman and List (2011) at very high stakes in India, where rejection rates fall but do not vanish. Henrich, Boyd, Bowles, Camerer, Fehr, Gintis and McElreath (2001, 2005) ran ultimatum games in small-scale societies and found mean offers from about $25\%$ to over $50\%$, correlated with market integration and with the payoffs to cooperation in the local economy. The WEIRD (Western, educated, industrialised, rich, democratic) classroom is not the world, and it is not a self-interested classroom either.

**Dictator.** Forsythe, Horowitz, Savin and Sefton (1994) found that dictators still give, but less than ultimatum proposers: a comparison that isolates the *strategic* part of ultimatum generosity (fear of rejection) from the *distributive* part. Engel’s (2011) meta-analysis of more than a hundred dictator experiments puts the mean share given around $28\%$, with a mass at $0$ and a mass at $50\%$. List (2007) and Bardsley (2008) showed that when the dictator can also *take*, giving collapses: much of “altruism” was an artefact of a choice set that made giving the only interesting action. Experimenter demand is a real confound, not a rumour.

**Public goods.** Contributions typically start around $40$–$60\%$ of the endowment and decay toward the Nash prediction over ten rounds, without reaching it. A one-shot opportunity to punish a low contributor, even at a cost to the punisher, raises and sustains contributions (Fehr and Gächter 2000, 2002). Punishment of free-riders is the fact; whether it is inequality aversion, reciprocity, or a taste for revenge is the modelling question.

**Gift exchange.** Fehr, Kirchsteiger and Riedl (1993) had “firms” offer wages and “workers” choose costly effort. Effort rose with the wage, contrary to the own-payoff prediction of minimum effort after any wage. The laboratory pattern is a cousin of Akerlof’s (1982) gift-exchange view of efficiency wages. Field replications are mixed: Gneezy and List (2006) found a transient effort response to a surprise pay rise in a one-day job; some subsequent field studies find a response, some do not. The laboratory is not a factory.

::: example A public-goods round {#ex-pg}
Four players, $e = 20$, $m = 0.5$. If all contribute $20$, what is each $x_i$? If three contribute $20$ and one contributes $0$, what does the free-rider get, and what does a contributor get? Why is contributing strictly dominated for an own-payoff maximiser, and why might a Fehr–Schmidt player with large $\alpha$ still contribute in a second round after seeing a free-rider, once a punishment technology is added?
::: solution
All contribute: $x_i = 0 + 0.5 \times 80 = 40$. Three contribute, one free-rides: the free-rider gets $20 + 0.5 \times 60 = 50$; each contributor gets $0 + 0.5 \times 60 = 30$. Contributing a unit costs $1$ and returns $m = 0.5$, so the private return is $-0.5$ and contributing is strictly dominated for $u_i = x_i$. A Fehr–Schmidt player who can spend $1$ to reduce the free-rider’s payoff by $3$, as in Fehr and Gächter, may punish because the envy term $\alpha(x_{\mathrm{FR}} - x_i)$ falls by more than the $1$ costs, which is the calculation of the punishment exercise below. The contribution itself is still privately costly; punishment is the instrument that makes free-riding costly too.
:::
:::

::: example A trust game {#ex-trust}
A sender has $10$ and may send $k \in \{0, 10\}$; the receiver gets $3k$ and returns $r \in [0, 3k]$. Own-payoff Nash: $r = 0$, hence $k = 0$. A Fehr–Schmidt receiver with $\beta = 0.6$ and $\alpha = 1$ who is sent $k = 10$ (so $3k = 30$) chooses $r$ to maximise $U_R = (30-r) - \beta\bigl((30-r) - r\bigr)$ if $r \le 15$, and the analogous envy formula if $r > 15$. What $r$ does she choose? Does the sender, if selfish, send $10$?
::: solution
For $r \le 15$ the receiver is ahead: $U = (30-r) - \beta(30-2r) = 30 - \beta\cdot 30 - r(1-2\beta)$. At $\beta = 0.6 > 1/2$ the coefficient of $r$ is $-(1-1.2) = +0.2 > 0$, so she raises $r$ to $15$. For $r > 15$ she is behind and envy makes $U$ decrease in $r$. She returns $15$, an equal split of the $30$. The selfish sender then gets $15$ from sending $10$, against $10$ from sending $0$, so she sends. A receiver with $\beta < 1/2$ would return $0$, and the selfish sender would not send. Trust and back-transfers, in this model, require a guilt parameter above one half — the same threshold that produces interior dictator giving.
:::
:::

::: quiz
A responder rejects $2$ of a pie of $10$. Which statement is correct?
- [ ] Nash equilibrium has been refuted
- [x] Own-payoff maximisation, combined with subgame perfection, is inconsistent with the rejection; Nash with a social $U_i$ need not be
- [ ] The proposer must have Fehr–Schmidt preferences
- [ ] The pie was too small for the result to count
::: solution
The standard prediction of rejection-proof zero offers is Nash *plus* $u_i = x_i$ *plus* subgame perfection. Changing $u_i$ to Fehr–Schmidt gives a different subgame-perfect offer ([[#prop-fs-ult]]). The proposer’s type is not identified from a single rejection. Stakes matter quantitatively (Andersen et al. 2011) but do not make the observation vanish.
:::
:::

::: warning $u_i = x_i$ is not “the Nash prediction”
Nash equilibrium is a solution concept, not a payoff assumption. There is a Nash equilibrium of the ultimatum game under Fehr–Schmidt preferences, and it is not $(10,0)$. Saying “Nash predicts zero” is shorthand for “Nash with own-payoff utilities predicts zero”. The shorthand is harmless only when the payoff assumption is explicit. This chapter is about changing $u_i$, then applying the same solution concepts you already have from [[game-theory/nash-equilibrium]] and [[game-theory/extensive-form]].
:::

## Inequality aversion: Fehr–Schmidt

Fehr and Schmidt (1999) proposed a utility that is linear in own payoff and in payoff *differences*, with a kink: disadvantageous inequality (envy) hurts more than advantageous inequality (guilt).

::: definition Fehr–Schmidt preferences {#def-fs}
For a payoff vector $(x_1, \dots, x_n)$, player $i$ has **Fehr–Schmidt utility**

$$
U_i(x) = x_i - \frac{\alpha_i}{n-1}\sum_{j \ne i} \max(x_j - x_i, 0) - \frac{\beta_i}{n-1}\sum_{j \ne i} \max(x_i - x_j, 0),
$$ {#eq-fs}

with $\alpha_i \ge \beta_i$ and $0 \le \beta_i < 1$. The parameter $\alpha_i$ is envy (disadvantageous inequality); $\beta_i$ is guilt (advantageous inequality). Self-interest is $\alpha_i = \beta_i = 0$.
:::

The restriction $\beta_i < 1$ says that $i$ will not burn her own payoff just to reduce an advantage; $\alpha_i \ge \beta_i$ says that being behind hurts at least as much as being ahead. Two-player ultimatum is the calculation to do by hand.

::: proposition Ultimatum rejection under Fehr–Schmidt {#prop-fs-ult}
In a two-player ultimatum game with pie $1$, a Fehr–Schmidt responder with envy $\alpha$ accepts an offer $s \le 1/2$ if and only if $s \ge \alpha/(1+2\alpha)$, and accepts every $s \ge 1/2$. A selfish proposer who knows $\alpha$ offers $s^* = \alpha/(1+2\alpha)$ (or the nearest feasible amount above).
:::
::: proof
If the responder rejects, $U = 0$. If she accepts $s \le 1/2$, her payoff is $s$ and the proposer’s is $1-s \ge s$, so $U = s - \alpha\bigl((1-s) - s\bigr) = s - \alpha(1-2s) = (1+2\alpha)s - \alpha$. This is at least $0$ if and only if $s \ge \alpha/(1+2\alpha)$. If $s \ge 1/2$ she is ahead, $U = s - \beta(2s-1) \ge 0$ because $\beta < 1$ and $s \ge 1/2$ imply $s - \beta(2s-1) = (1-2\beta)s + \beta \ge (1-2\beta)(1/2) + \beta = 1/2 > 0$ when $\beta < 1$ (and is positive at $\beta$ near $1$ as well: $s - \beta(2s-1) = (1-\beta)s + \beta(1-s) > 0$). A selfish proposer, facing a known threshold $s^*$, offers $s^*$: any less is rejected and yields $0$; any more is accepted and yields less than $1-s^*$.
:::

At $\alpha = 1/2$, the threshold is $0.25$; at $\alpha = 1$, it is $1/3$; at $\alpha = 2$, it is $0.4$. A population with some selfish proposers and some responders with $\alpha$ around $1$ produces a scatter of offers in the $25$–$40\%$ range, rejections of the rest, and almost no offers of zero — the laboratory histogram. Bolton and Ockenfels (2000) wrote a close cousin (ERC, “equity, reciprocity and competition”) in which $i$ cares about her *share* $x_i/\sum x_j$. The two models agree on ultimatum and part company on some three-player distributions.

::: widget plot
f: if(x < 0.5, (1+2*a)*x - a, x - b*(2*x - 1))
sliders: a=1:0:4:0.1; b=0.3:0:0.95:0.05
x: 0, 1
y: -2, 1.2
labels: U_{\text{responder}}(s)
hlines: 0
caption: Fehr–Schmidt utility of an ultimatum responder as a function of the offer $s$, pie $1$. Start at $\alpha = 1$, $\beta = 0.3$: $U$ crosses zero near $s = 1/3$, matching [[#prop-fs-ult]]. Raise $\alpha$ and watch the rejection threshold climb toward $1/2$. The $\beta$ slider matters only for $s > 1/2$, where $U$ stays positive.
:::

::: example A three-way split {#ex-three-way}
Three Fehr–Schmidt agents, each with $\alpha = 1$, $\beta = 0.4$, split a pie of $12$. Compare $U_1$ at the allocation $(4,4,4)$ with $U_1$ at $(6,6,0)$. Does $1$ prefer to equalise with $2$ and $3$, or to share $12$ with $2$ and leave $3$ with nothing?
::: solution
At $(4,4,4)$, all differences are zero, $U_1 = 4$. At $(6,6,0)$, $x_1 = 6$; the envy term against player $3$ is $0$ (player $3$ is behind); the envy term against player $2$ is $0$ (tied); the guilt term against player $3$ is $\max(6-0,0) = 6$, and against player $2$ is $0$. With $n-1 = 2$, $U_1 = 6 - (\beta/2)\cdot 6 - (\beta/2)\cdot 0 = 6 - 0.4 \cdot 3 = 6 - 1.2 = 4.8$. So $U_1(6,6,0) = 4.8 > 4 = U_1(4,4,4)$: player $1$ prefers to freeze out player $3$ rather than equalise, because the extra $2$ units of own payoff outweigh the guilt, at this $\beta$. A larger $\beta$ (say $\beta = 0.8$) would reverse the comparison: $U_1(6,6,0) = 6 - 0.8 \cdot 3 = 3.6 < 4$. Inequality aversion does *not* imply a preference for the equal split of the whole group; it implies a preference that trades off own payoff against gaps, and the trade-off can ratify exclusion.
:::
:::

Charness and Rabin (2002) estimated a utility that also cares about the *minimum* payoff (Rawlsian social welfare) and about surplus, and found that many choices labelled “inequality averse” are better described as social-welfare preferences plus reciprocity. Fehr–Schmidt remains the model one computes with in a first pass, because [[#eq-fs]] has two parameters and a closed-form ultimatum threshold. It is not the last word on why the threshold is there.

## Reciprocity, guilt and warm glow

Inequality aversion is a preference over *outcomes*. Reciprocity is a preference over *intentions*: $i$ wants to be kind to those who were kind to her, and unkind to those who were unkind. Rabin (1993) formalised this in normal-form games with a kindness function and a fairness equilibrium; Dufwenberg and Kirchsteiger (2004) and Falk and Fischbacher (2006) extended it to extensive forms. The machinery is heavier than Fehr–Schmidt, and it is needed for patterns that inequality aversion misses — for example, a responder who accepts a small offer when the proposer *could not* have offered more, and rejects the same offer when the proposer could.

Guilt aversion (Battigalli and Dufwenberg) makes $i$ dislike falling short of what $j$ expected to receive. Warm-glow giving (Andreoni 1990) makes $i$ like the act of contributing, not the public good it produces: $u_i = u(x_i, c_i)$, with $c_i$ the contribution itself. Warm glow rationalises giving that is independent of others’ giving (and of crowding-out by government), which a pure public-goods altruist would not display.

These models are not competitors in the sense that one of them is true. They are different extra arguments in $u_i$. A paper that wants to talk about punishment of unkind acts needs reciprocity; a paper that wants a closed-form rejection threshold needs Fehr–Schmidt; a paper that wants crowding-out of charity needs to take a stand on warm glow. The discipline is to name the extra argument and to nest $\alpha = \beta = 0$.

::: example Kindness depends on the feasible set {#ex-intentions}
A proposer must offer $s \in \{2, 5\}$ in one treatment, and $s \in \{2, 5, 8\}$ in another, pie $10$. A responder with inequality aversion and $\alpha = 1$ has the same threshold in both treatments, $s^* = 1/3 \approx 3.33$, so she rejects $2$ and accepts $5$ in both. A reciprocal responder, in the Rabin sense, treats an offer of $5$ as kinder when $8$ was feasible than when $5$ was the maximum. In which treatment is she more likely to accept $5$? In which is she more likely to reject $2$?
::: solution
When $8$ is feasible, $5$ is a middling offer and $2$ is a stingy one; when $5$ is the maximum, $5$ is the kindest feasible offer and $2$ is the stingiest. Reciprocity therefore predicts *more* acceptance of $5$ in the restricted set $\{2, 5\}$, and *more* rejection of $2$ in the larger set $\{2, 5, 8\}$, where $2$ looks like a deliberate slight. Inequality aversion, which looks only at $(x_i, x_j)$, predicts the same behaviour in both treatments. Falk, Fehr and Fischbacher (2003) and related designs have found intention effects of this kind: the feasible set changes responses to the same $(x_i, x_j)$. That is evidence for reciprocity on top of, or instead of, pure inequality aversion.
:::
:::

## Evidence, culture and criticisms

**Stakes.** Rejecting $2$ of $10$ is cheap; rejecting $200$ of $1\,000$ is less so. Cameron (1999) and Andersen et al. (2011) find that rejection rates fall as the pie grows, which Fehr–Schmidt can produce if $\alpha$ is not huge, and that they do not fall to zero. Social preferences are not only a phenomenon of pocket-money experiments. They are also not independent of the price of fairness.

**Culture and WEIRD samples.** Henrich et al. (2001, 2005, 2010) are the required reading. Mean ultimatum offers in some groups sat near the Nash prediction; in others, above $50\%$, with rejections of “too generous” offers (a pattern inequality aversion does not predict, and that a competitive-sharing norm does). Market integration and the importance of cooperation in the livelihood correlated with offers. The right conclusion is not “social preferences are a Western curiosity” — the WEIRD classroom gives and rejects too — nor “they are a human universal of $\alpha = 1$”. It is that the *parameters* of [[#eq-fs]], and perhaps the functional form, are culturally variable, and that a calibration on undergraduates is a calibration on undergraduates.

**Experimenter demand and the action set.** List (2007), Bardsley (2008) and the “taking” dictator game cut giving sharply. Dana, Cain and Dawes (2006) found that many dictators prefer to exit, at a cost, rather than share: they pay to avoid the giving situation. Social image (being seen to be fair) and self-image (not having to decide) are mechanisms that look like $\beta > 0$ in a one-shot dictator game and behave differently when the audience or the exit option changes. Andreoni and Bernheim (2009) is a model of the audience; it nests Fehr–Schmidt as the no-audience case.

**Markets.** Fehr and Schmidt (1999) emphasised that a *few* fair-minded agents can change the outcome of a competitive market, or fail to, depending on the extensive form. In a double auction with many traders, inequality-averse agents cannot do much: the price is pinned down by the marginal selfish traders. In a bilateral gift-exchange labour market, they can do a lot. The same $\alpha, \beta$ are consistent with “markets are selfish” and “wages contain a gift”, once the game is specified. That is a feature of the model, and it is a warning against transporting a dictator-game $\beta$ into a posted-offer market without further argument.

**Replication.** Ultimatum rejections, non-zero dictator giving in the standard action set, and public-goods contribution-and-decay are among the most replicated findings in experimental economics (Camerer et al. 2016 included related games). The taking-game qualification of dictator giving is also replicated. Gift exchange is the fragile one in the field.

::: history
Güth, Schmittberger and Schwarze (1982) is the ultimatum experiment; Forsythe et al. (1994) the dictator comparison; Kahneman, Knetsch and Thaler (1986) had already run a close cousin. Isaac, Walker and Thomas, and the subsequent public-goods literature, documented voluntary contributions. Fehr, Kirchsteiger and Riedl (1993) is laboratory gift exchange; Akerlof (1982) is the efficiency-wage ancestor. Rabin (1993) is intention-based fairness in normal form; Fehr and Schmidt (1999) and Bolton and Ockenfels (2000) are the outcome-based models. Henrich et al. (2001) took the games out of the university. Alvin Roth’s methodological writing, and Levitt and List (2007), are the standard cautions about generalising from the laboratory.
:::

## Where this leads

Social preferences change what a Nash equilibrium looks like, but they still assume that $i$ computes one. Behavioural game theory ([[behavioural-economics/behavioural-game-theory]]) drops that too, and lets $i$ think only $k$ steps. The two departures interact: a level-$1$ player who is inequality averse is not the same object as a level-$1$ player who is selfish. Limited attention ([[behavioural-economics/limited-attention]]) can look like selfishness (I did not notice your payoff) or like fairness (I noticed the equal split because it was salient). Policy ([[behavioural-economics/behavioural-policy]]) uses social preferences when it talks about tax morale, about contributions to public goods, and about the ethics of a planner who exploits fairness norms. The standard own-payoff model remains the right null, and the right model in environments where Fehr and Schmidt said it would be: competitive markets with many selfish traders at the margin.

::: summary
- Own-payoff Nash predictions fail in a structured way in the ultimatum, dictator, public-goods and trust games ([[#def-games]]). They fail less, or not at all, in some competitive markets and in some taking frames.
- Fehr–Schmidt inequality aversion ([[#def-fs]], [[#eq-fs]]) nests self-interest at $\alpha = \beta = 0$. The ultimatum rejection threshold is $s^* = \alpha/(1+2\alpha)$ ([[#prop-fs-ult]]).
- Reciprocity (Rabin) is about intentions, not only outcomes; the feasible set changes the kindness of a given split. Warm glow and guilt aversion are different extra arguments in $u_i$.
- Stakes, culture (Henrich et al.), experimenter demand (List, Bardsley) and audience effects are first-order qualifications, not footnotes.
- A few fair-minded agents can matter a lot or a little, depending on the extensive form. Transporting $\beta$ from a dictator game into a market requires an argument.
- Nash equilibrium with a social $U_i$ is still Nash. The next chapter drops the equilibrium computation.
:::

## Exercises

::: exercise A rejection threshold {level=1 check="0.3333"}
A Fehr–Schmidt responder has $\alpha = 1$. Enter the smallest offer $s$ of a pie of $1$ that she will accept, to four decimal places.
::: solution
$s^* = \alpha/(1+2\alpha) = 1/3 \approx 0.3333$ ([[#prop-fs-ult]]).
:::
:::

::: exercise Dictator giving {level=1}
A Fehr–Schmidt dictator with $\beta = 0.4$ and $\alpha = 1$ splits a pie of $1$. She maximises $U = (1-s) - \beta\bigl((1-s)-s\bigr)$ over $s \in [0, 1/2]$ (she will not give herself less than half, because $\alpha \ge \beta$ and $\beta < 1$). What does she offer?
::: solution
$U = (1-s) - \beta(1-2s) = 1 - \beta - s(1-2\beta)$. The coefficient on $s$ is $-(1-2\beta)$. If $\beta < 1/2$, this is negative, so she sets $s = 0$. If $\beta > 1/2$, it is positive, so she sets $s = 1/2$. If $\beta = 1/2$, she is indifferent. At $\beta = 0.4 < 1/2$ she offers $0$. Fehr–Schmidt dictators give zero unless guilt is high ($\beta > 1/2$). The laboratory’s interior giving is *not* a Fehr–Schmidt dictator prediction at typical $\beta$; it is a reason to add warm glow, an audience, or a discrete type who has $\beta > 1/2$.
:::
:::

::: exercise Public-goods free-riding {level=1}
Four players, $e = 20$, $m = 0.4$. What is the private return to contributing one more unit, and what is the social return? What is the own-payoff Nash contribution?
::: solution
Private return $m - 1 = -0.6 < 0$; social return $n m - 1 = 1.6 - 1 = 0.6 > 0$. Own-payoff Nash: $c_i = 0$ for all $i$. (If $m > 1$ contributing would be dominant; the interesting case is $1/n < m < 1$.)
:::
:::

::: exercise Threshold at $\alpha = 2$ {level=2 check="0.4"}
Enter $s^*$ for $\alpha = 2$, pie $1$.
::: solution
$2/(1+4) = 2/5 = 0.4$.
:::
:::

::: exercise Freeze-out {level=2}
In [[#ex-three-way]], at what $\beta$ is player $1$ indifferent between $(4,4,4)$ and $(6,6,0)$? Is that $\beta$ inside the Fehr–Schmidt range $\beta < 1$?
::: solution
$U_1(4,4,4) = 4$ and $U_1(6,6,0) = 6 - 3\beta$. Indifference: $4 = 6 - 3\beta$, $3\beta = 2$, $\beta = 2/3 < 1$. Yes. For $\beta < 2/3$ she prefers to freeze out player $3$; for $\beta > 2/3$ she prefers the equal split.
:::
:::

::: exercise Intentions {level=2}
A responder rejects $s = 2$ of $10$ when the proposer chose from $\{2, 8\}$, and accepts $s = 2$ when the proposer was forced to offer $2$. Which model in this chapter predicts the pair of responses, and which does not?
::: solution
Reciprocity (intentions) predicts it: forced $2$ is not unkind, chosen $2$ when $8$ was available is unkind. Fehr–Schmidt, which depends only on $(x_i, x_j) = (2, 8)$ in both cases, does not. (Guilt aversion can go either way, depending on what the responder thinks the proposer expected.)
:::
:::

::: exercise A mixed population {level=3}
Half of responders have $\alpha = 0$ (selfish) and half have $\alpha = 2$, all with $\beta = 0.3$. A selfish proposer does not observe the type. The pie is $1$, offers are continuous. What offer maximises the proposer’s expected material payoff? (If rejected, she gets $0$.)
::: hint
Selfish responders accept any $s > 0$; $\alpha = 2$ responders accept $s \ge 0.4$. Consider offering just above $0$ and offering $0.4$.
:::
::: solution
Offering $s \in (0, 0.4)$ is accepted with probability $1/2$ (only the selfish type) and yields expected payoff $(1/2)(1-s) \approx 1/2$. Offering $s \ge 0.4$ is accepted by both types and yields $1-s \le 0.6$. The best in the second class is $s = 0.4$, yielding $0.6$. This beats $0.5$, so the proposer offers $0.4$. (Offering $0$ is accepted only by the selfish type if we assume a selfish responder accepts $0$, which is a knife-edge; expected payoff at most $1/2$.) A little inequality aversion in the population, plus a proposer who maximises money, already produces a substantial offer. This is Fehr and Schmidt’s “a few fair-minded agents go a long way” in the ultimatum game.
:::
:::

::: exercise Punishment {level=3}
In a two-player public-goods game with $e = 10$, $m = 0.7$, both players contributed $c_1 = 10$, $c_2 = 0$. Payoffs before punishment: $x_1 = 0 + 0.7 \times 10 = 7$, $x_2 = 10 + 0.7 \times 10 = 17$. Player $1$ may spend $p$ to reduce player $2$’s payoff by $3p$. Using Fehr–Schmidt with $\alpha = 2$, $\beta = 0.3$, does player $1$ choose $p > 0$? Ignore integer constraints and require $x_2 - 3p \ge 0$.
::: hint
After punishment, $x_1' = 7 - p$, $x_2' = 17 - 3p$. Player $1$ is behind as long as $7-p \le 17-3p$, i.e. $2p \le 10$, $p \le 5$.
:::
::: solution
For $p \in [0, 5]$, $U_1 = (7-p) - \alpha\bigl((17-3p) - (7-p)\bigr) = 7-p - 2(10-2p) = 7-p-20+4p = 3p - 13$. This *increases* in $p$, so she punishes up to $p = 5$, where payoffs are $(2, 2)$ and $U_1 = 2$. At $p = 0$, $U_1 = 7 - 2 \times 10 = -13$. Punishment is worth it. At $p > 5$ she would be ahead and guilt would start to bite; she stops at equality. Costly punishment of a free-rider is a Fehr–Schmidt prediction at this $\alpha$, not an extra “taste for punishment”. (It is also a reciprocity prediction. Distinguishing the two needs a design like [[#ex-intentions]].)
:::
:::

::: exercise Taking versus giving {level=2}
A dictator has endowment $10$ and can give any $g \in [0, 10]$ to the other player. In a taking treatment she can instead take any $t \in [0, 10]$ from the other player’s $10$. Under Fehr–Schmidt with $\beta = 0.4$, what does she do in each treatment? What did List (2007) find, and why is it a problem for a naive reading of dictator giving as $\beta$?
::: solution
Giving treatment: as in the dictator exercise, $\beta < 1/2$ implies $g = 0$. Taking treatment: starting from $(10, 10)$, taking $t$ yields $(10+t, 10-t)$; she is then ahead, $U = 10+t - \beta\bigl((10+t)-(10-t)\bigr) = 10+t - \beta(2t) = 10 + t(1-2\beta)$. At $\beta = 0.4$ the coefficient of $t$ is $0.2 > 0$, so she takes the maximum $t = 10$. Fehr–Schmidt at this $\beta$ predicts give-nothing *and* take-everything. List found that taking options reduced *giving* (people who gave in the giving-only frame did not give once taking was allowed, and many took). That is a problem for reading laboratory giving as a stable $\beta$: the same people do not display the $\beta$ once the action set includes taking. An audience or a demand-effect model predicts that pattern; a stable Fehr–Schmidt $\beta$ does not (except at the corner $\beta > 1/2$, which then also predicts interior giving in the giving-only frame, contrary to the mass of zeros).
:::
:::
