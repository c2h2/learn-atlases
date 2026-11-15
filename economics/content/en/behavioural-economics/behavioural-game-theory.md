A newspaper invites readers to choose a number in $\{0, 1, \dots, 100\}$. The winner is the one closest to two-thirds of the average of all submitted numbers. If every reader is rational, knows that every reader is rational, and so on, the unique Nash equilibrium is $0$: the best response to any guess $g$ is $\tfrac23 g$, and iterating from any finite starting point goes to $0$. Newspaper contests, and the laboratory, do not produce $0$. Nagel (1995) found a first-round spike at $33$, a spike at $22$, a spike at $50$, and almost no mass at $0$. Bosch-Domènech, Montalvo, Nagel and Satorra (2002) found the same spikes in newspaper data from Germany, Spain and the United States. People are iterating the best-response map a small, finite number of times. That is **level-$k$ thinking**, and it is the opening exhibit of behavioural game theory.

The standard theory of [[game-theory/nash-equilibrium]] and [[game-theory/mixed-strategies]] assumes that $i$’s belief about $j$ is correct in equilibrium. Behavioural game theory keeps the payoffs and the best-response idea, and replaces equilibrium beliefs with a bound on the depth of reasoning, or with a noisy best response, or with a learning process that has not yet arrived at Nash. Level-$k$, cognitive hierarchy and quantal response equilibrium are the three workhorses. They nest Nash as a limit, they have been estimated on a wide range of games, and they fail in instructive ways.

## Level-$k$ and the $p$-beauty contest

Keynes (1936) described a newspaper beauty contest in which readers picked the six prettiest faces, and the prize went to those whose picks matched the average pick: the task is not to judge beauty, but to judge the average judgement of beauty. The modern $p$-beauty contest (Moulin; Nagel 1995) is the same idea with numbers.

::: definition Level-$k$ thinking {#def-levelk}
A **level-$0$** player chooses according to a specified non-strategic rule (typically, the uniform mixed strategy, or a salient pure strategy). A **level-$k$** player, $k \ge 1$, best-responds to the belief that the others are level-$(k-1)$. In a symmetric $p$-beauty contest on $[0, 100]$ with target $p$ times the mean, if level-$0$ plays $50$ (the mean of the uniform), level-$k$ plays $50\, p^k$.
:::

Nagel’s $p = 2/3$ then produces the sequence $50$, $33.3$, $22.2$, $14.8$, $9.9$, $\ldots \to 0$. The laboratory histogram’s spikes sit at the first few terms. Stahl and Wilson (1994, 1995) estimated a mixture of levels on matrix games; Costa-Gomes, Crawford and Broseta (2001) and Costa-Gomes and Crawford (2006) used information-search data to pin down $k$. A typical laboratory mix is a mass of level-$1$ and level-$2$, a smaller mass of level-$3$, some level-$0$, and very little of the Nash type in the first round of a $p$-beauty contest.

::: proposition Unique level-$k$ path in the $p$-beauty contest {#prop-pk}
In the symmetric $p$-beauty contest on $[0, 100]$ with $0 < p < 1$ and level-$0$ at $50$, the unique level-$k$ guess is $g_k = 50\, p^k$. The Nash equilibrium is $0$, and $g_k \to 0$ as $k \to \infty$. If instead level-$0$ is uniform on $[0, 100]$ and a level-$1$ player best-responds to that *distribution*, the level-$1$ guess is still $50p$.
:::
::: proof
Level-$1$ best-responds to $50$ by playing $p \cdot 50$. If every opponent of a level-$k$ player is level-$(k-1)$ at $g_{k-1}$, the mean is $g_{k-1}$ and the best response is $p\, g_{k-1}$. The unique solution of that recursion with $g_0 = 50$ is $g_k = 50 p^k$. Nash: a symmetric equilibrium $g$ satisfies $g = p g$, so $g(1-p) = 0$, hence $g = 0$. For the distributional claim: the mean of the uniform on $[0, 100]$ is $50$, and the best response to a mean (the target is $p$ times the mean) depends only on that mean, so level-$1$ still plays $50p$.
:::

::: example A classroom contest {#ex-beauty}
Thirty students play a $p = 2/3$ contest. Ten are level-$0$ at $50$, twelve are level-$1$, six are level-$2$, and two are Nash (play $0$). What is the mean guess, and who wins (closest to $\tfrac23$ of the mean)?
::: solution
Level-$1$ plays $50 \times 2/3 \approx 33.33$; level-$2$ plays $50 \times 4/9 \approx 22.22$. The mean is
$(10 \times 50 + 12 \times 33.33 + 6 \times 22.22 + 2 \times 0)/30 = (500 + 400 + 133.32 + 0)/30 = 1033.32/30 \approx 34.44$.
Two-thirds of the mean is $\approx 22.96$. Level-$2$, at $22.22$, is closest; Nash, at $0$, is far. In a population that is not itself Nash, playing Nash is a losing strategy. The winner is the player whose $k$ matches the *population’s* mixture, not the player with the largest $k$.
:::
:::

::: widget sequence
a: 50*(2/3)^n
N: 12
start: 0
limit: 0
y: 0, 55
caption: Level-$k$ guesses $g_k = 50 \cdot (2/3)^k$ in Nagel’s contest, plotted against $k$ (the sequence index $n$). The first few terms are $50$, $33.3$, $22.2$, $14.8$. Slide along the terms and notice how little mass a laboratory first round typically has beyond $k = 3$, and how far $k = 8$ already is from the spikes people actually play.
:::

The specification of level-$0$ is the model’s free psychological step. Uniform, or the midpoint of the strategy set, is the default in beauty contests. In a game with a labelled “fair” split, level-$0$ may play the fair split. In a game with a dominated but salient strategy, level-$0$ may play that. Level-$k$ predictions move when level-$0$ moves, and a paper that chooses level-$0$ after seeing the data is no longer testing the model. Crawford, Costa-Gomes and Iriberri (2013) is the survey that insists on this.

## Cognitive hierarchy

Camerer, Ho and Chong (2004) replaced the “everyone else is $k-1$” belief with a **cognitive hierarchy**: a level-$k$ player believes that the population is a mixture of levels $0, 1, \dots, k-1$, with frequencies proportional to a Poisson$(\tau)$ truncated at $k-1$. The Poisson is a one-parameter family; $\tau$ is the mean of the (untruncated) Poisson, and typical laboratory estimates sit around $\tau \in [1, 2]$.

::: definition Cognitive hierarchy {#def-ch}
Let $f(k) = e^{-\tau} \tau^k / k!$ be the Poisson$(\tau)$ frequency of level $k$. A **cognitive-hierarchy (CH)** player of level $k \ge 1$ best-responds to the normalised frequencies $f(0), \dots, f(k-1)$ of lower levels, and level-$0$ plays the specified non-strategic rule. Nash is approached as $\tau \to \infty$ in games where iterated best response converges to Nash.
:::

The difference from level-$k$ is that a CH level-$2$ player does not think everyone is level-$1$: she thinks some are level-$0$ and some are level-$1$, in Poisson proportions. In the $p = 2/3$ contest with $\tau = 1.5$ and level-$0$ at $50$, the CH guesses are $50$, $33.3$, about $26.7$, about $23.9$, and then they bunch in the low $20$s rather than marching down to $0$. That bunching is closer to newspaper data than a pure level-$k$ spike at $14.8$ would be. Camerer, Ho and Chong’s one-parameter $\tau$ also travels, imperfectly, across games: a $\tau$ fitted to a beauty contest is in the right neighbourhood for some matrix games, and not for others.

::: example Poisson frequencies {#ex-poisson}
For $\tau = 1.5$, compute $f(0), f(1), f(2), f(3)$. A CH level-$2$ player in a $p = 2/3$ contest, facing those relative frequencies on levels $0$ and $1$ only, with $g_0 = 50$ and $g_1 = 33.33$, plays what number?
::: solution
$f(0) = e^{-1.5} \approx 0.2231$, $f(1) = 1.5 e^{-1.5} \approx 0.3347$, $f(2) = (1.5)^2 e^{-1.5}/2 \approx 0.2510$, $f(3) = (1.5)^3 e^{-1.5}/6 \approx 0.1255$. Restricted to levels $0$ and $1$, the normalised weights are $0.2231/(0.2231+0.3347) \approx 0.400$ on level-$0$ and $0.600$ on level-$1$. The believed mean is $0.400 \times 50 + 0.600 \times 33.33 \approx 20 + 20.00 = 40.00$. Level-$2$ plays $(2/3) \times 40 \approx 26.67$. That is the CH number in the sequence quoted above, and it is not the level-$k$ number $22.22$.
:::
:::

::: quiz
In a $p = 2/3$ beauty contest, a player who best-responds to a uniform level-$0$ plays
- [ ] $0$
- [ ] $50$
- [x] $33.3$
- [ ] $66.7$
::: solution
Uniform on $[0, 100]$ has mean $50$; $p$ times the mean is $100/3 \approx 33.3$ ([[#prop-pk]]). Playing $0$ is Nash, playing $50$ is level-$0$, playing $66.7$ would be best-responding to a mean of $100$.
:::
:::

## Quantal response equilibrium

Level-$k$ and CH are non-equilibrium models: beliefs are wrong, except by accident. **Quantal response equilibrium** (McKelvey and Palfrey 1995) keeps equilibrium — beliefs are correct — and replaces exact best response with a noisy one. The logit form is the workhorse.

::: definition Logit quantal response equilibrium {#def-qre}
In a finite game, a **logit QRE** with precision $\lambda \ge 0$ is a mixed profile $\sigma$ such that for every player $i$ and every pure strategy $s_i$,

$$
\sigma_i(s_i) = \frac{\exp\bigl(\lambda\, u_i(s_i, \sigma_{-i})\bigr)}{\sum_{s_i'} \exp\bigl(\lambda\, u_i(s_i', \sigma_{-i})\bigr)}.
$$ {#eq-logit}

At $\lambda = 0$ play is uniform; as $\lambda \to \infty$, QRE approaches Nash (the set of Nash equilibria that can be approached depends on the game; see McKelvey and Palfrey). Payoffs $u_i(\cdot, \sigma_{-i})$ are expected payoffs given $\sigma_{-i}$.
:::

The logit rule is a stochastic best response: better strategies are played more often, not surely. Because $i$’s mixture is a continuous function of $j$’s mixture, a QRE is a fixed point of a continuous map on a compact convex set, and existence is free from Nash’s usual arguments. Goeree, Holt and Palfrey (2016) is the book-length treatment.

::: example Matching pennies {#ex-pennies}
Row wants to match, Column wants to mismatch: $u_R(H,H) = u_R(T,T) = 1$, $u_R(H,T) = u_R(T,H) = -1$, and Column’s payoffs are the negatives. Nash is $1/2$–$1/2$. Let $q$ be Column’s probability of $H$. Row’s expected payoff to $H$ is $2q-1$, to $T$ is $1-2q$. Write Row’s logit probability of $H$ as a function of $q$ and $\lambda$. At a symmetric QRE, $q$ equals that probability. Confirm that $q = 1/2$ is always a QRE. For $\lambda = 2$ and $q = 0.6$, is Row’s logit best response above or below $0.6$?
::: solution
Row’s logit probability of $H$ is
$$
p(q) = \frac{e^{\lambda(2q-1)}}{e^{\lambda(2q-1)} + e^{\lambda(1-2q)}} = \frac{1}{1 + e^{-2\lambda(2q-1)}} = \frac{1}{1 + e^{-4\lambda(q-1/2)}}.
$$
At $q = 1/2$, $p = 1/2$, so the symmetric Nash is always a QRE. At $\lambda = 2$, $q = 0.6$, $p = 1/(1+e^{-4\cdot 2\cdot 0.1}) = 1/(1+e^{-0.8}) \approx 1/(1+0.449) \approx 0.690$. Row’s noisy best response is $0.69 > 0.6$: she overweights $H$ relative to Column’s $0.6$, because $H$ is the better reply to $q > 1/2$. In a *symmetric* matching-pennies QRE that extra weight cannot survive, which is why the equilibrium stays at $1/2$. In an *asymmetric* payoff variant (a “mismatch” bonus), QRE predicts a characteristic displacement *away* from Nash, which is one of the model’s distinctive successes (Goeree, Holt, Palfrey).
:::
:::

::: widget plot
f: 1/(1 + exp(-4*l*(x - 0.5))); 0.5; x
sliders: l=2:0.1:8:0.1
x: 0, 1
y: 0, 1
labels: \text{logit BR }p(q); \text{Nash }1/2; q
caption: Row’s logit best response in matching pennies ([[#ex-pennies]]) as a function of Column’s $q$. Start at $\lambda = 2$. The $45$-degree line is $p = q$; intersections are symmetric QRE. Raise $\lambda$ and watch the best-response curve steepen toward a step at $1/2$, which is Nash. At $\lambda = 0$ the curve is the horizontal $1/2$.
:::

QRE’s strength is that it uses one parameter, on the payoff scale, to fit deviations from Nash in many games at once, including games where level-$k$ has no natural level-$0$. Its weakness is that $\lambda$ is not unit-free: doubling all payoffs is the same as doubling $\lambda$. A paper that rescales payoffs and keeps $\lambda$ has changed the model. Another weakness is that QRE, as an equilibrium, cannot speak to the first round of a beauty contest in which beliefs are *not* correct; level-$k$ can. The two models are complements: level-$k$ for initial play, QRE (or a learning model) for play that has had time to settle.

## Learning

Erev and Roth (1998) and Camerer and Ho (1999, experience-weighted attraction) fitted reinforcement and hybrid learning rules to repeated games. Fictitious play — best-respond to the historical frequency of the opponent’s play — is the oldest such rule, and it converges to Nash in some classes of games (zero-sum, potential games) and cycles in others. The empirical finding is that first-round play looks like level-$k$ or CH, and that a few rounds of a beauty contest, or of a matching-pennies game, move the histogram toward Nash, at a speed that a simple reinforcement or fictitious-play rule can match. Nagel’s subjects, by round $4$ of a repeated $p$-contest, were playing numbers that a level-$3$ or level-$4$ model of the *current* histogram would predict, which is both learning and a rising $k$.

A course that stopped at Nash would miss the first three rounds, which are often the rounds that a new market, a new auction or a new matching mechanism actually plays. A course that stopped at level-$k$ would miss the convergence. Behavioural game theory is the pair of statements together.

::: example The traveller’s dilemma {#ex-traveller}
Two players name an integer in $\{180, \dots, 300\}$. Both receive the minimum, and the player who named the minimum gets a bonus $R$, the other a penalty $R$. Nash, by iterated dominance, is $180$ for any $R > 0$. Capra, Goeree, Gomez and Holt (1999) found means near $300$ when $R$ was small and means near $180$ when $R$ was large. Which of QRE and a *fixed* level-$k$ mix predicts that comparative static, and why?
::: solution
A fixed level-$k$ mix, with level-$0$ at $300$ (the salient upper end), produces level-$1$ at $300 - R$ in a simplified best-response, and does move down as $R$ rises, but only one step per level; it does not, by itself, send play from the top of the range to the bottom as $R$ goes from $5$ to $80$. Logit QRE does: $R$ scales the payoff gap between adjacent claims, which is the same as scaling $\lambda$, and a small $R$ is a small $\lambda$ (play near uniform, hence high claims), a large $R$ a large $\lambda$ (play near Nash, hence $180$). The comparative static in $R$ is a QRE signature. Level-$k$ can be made to match it only by letting $k$ or level-$0$ depend on $R$, which is an extra degree of freedom.
:::
:::

::: remark Level-$k$ versus social preferences
A selfish level-$1$ player in the ultimatum game, believing the responder is level-$0$ (say, accepts anything, or accepts with a salient probability), may offer little; a Fehr–Schmidt level-$1$ player will offer more. The two deviations from $(10,0)$ — bounded reasoning and social preferences — are not identified from the offer alone. Designs that vary the feasible set ([[behavioural-economics/social-preferences#ex-intentions]]) or the information about the opponent’s type help. Crawford, Costa-Gomes and Iriberri (2013) review identification; it is not automatic.
:::

## Evidence

**Beauty contests.** Nagel (1995), Ho, Camerer and Weigelt (1998), Bosch-Domènech et al. (2002): spikes at $50p$ and $50p^2$, mean around $20$–$40$ depending on $p$ and the pool, almost no Nash in round $1$, movement toward $0$ over repetitions. Grand slam: a one-parameter CH $\tau \approx 1.5$ fits several of these histograms at once, not perfectly.

**Matrix games and information search.** Stahl and Wilson; Costa-Gomes, Crawford and Broseta; Costa-Gomes and Crawford: a mixture of $k = 1, 2, 3$ with look-up patterns that match the information a $k$-type would need. This is the strongest process evidence that $k$ is a depth of reasoning, not just a label on a mixed strategy.

**QRE.** McKelvey and Palfrey (1995) on matching pennies and on the traveller’s dilemma; Goeree, Holt and Palfrey on a range of asymmetric games where QRE predicts the *direction* of the Nash residual and level-$k$ needs a new level-$0$ each time. The traveller’s dilemma (a prize for the lower claim, a small reward/penalty for being the lower/higher) produces play far from Nash at small penalties, closer at large penalties, which is a $\lambda$-on-payoff-scale prediction.

**Field.** Levitt, List and Sadoff (2011) had chess players play dominance-solvable games; even they did not iterate all the way. A sports-and-penalty-kicks literature (Chiappori, Levitt and Groseclose 2002; Palacios-Huerta) is more supportive of mixed-strategy Nash, which is consistent with QRE at high $\lambda$ in a game professionals play thousands of times. Östling, Wang, Chou and Camerer (2011) on a LUPI (lowest unique positive integer) lottery is a field beauty-contest cousin, with CH and a Poisson-Nash both competing.

**What is contested.** The portability of $\tau$ and of $\lambda$ across games; the specification of level-$0$; whether CH’s Poisson is anything more than a convenient one-parameter mix; whether first-round laboratory play, with no stakes and a stranger opponent, is the right analogue of a market. Replication of the beauty-contest spikes is not in doubt. Identification of $k$ from a single number, without process data, is.

::: history
Keynes (1936, chapter 12) named the beauty contest. Moulin defined the guessing game; Nagel (1995, *American Economic Review*) ran it. Stahl and Wilson (1994, 1995) estimated levels on matrices. Camerer, Ho and Chong (2004, *Quarterly Journal of Economics*) is cognitive hierarchy. McKelvey and Palfrey (1995, *Games and Economic Behavior*) is QRE. Erev and Roth (1998) and Camerer and Ho (1999) are the learning papers. Crawford, Costa-Gomes and Iriberri (2013, *Journal of Economic Literature*) is the survey this chapter has followed on identification. Camerer’s *Behavioral Game Theory* (2003) remains the book.
:::

## Where this leads

Behavioural game theory is the last of the “positive” chapters. Policy ([[behavioural-economics/behavioural-policy]]) uses it whenever a mechanism — an auction, a matching market, a disclosure — will be played by people who are not Nash computers: a level-$k$ bid in a first-price auction is not the Nash bid, and a designer who assumes Nash will mis-predict revenue. Social preferences ([[behavioural-economics/social-preferences]]) change the *payoffs* of the same games; limited attention ([[behavioural-economics/limited-attention]]) changes which payoffs are seen. The standard theory of [[game-theory/nash-equilibrium]], [[game-theory/mixed-strategies]] and [[game-theory/extensive-form]] is the limit $\tau \to \infty$, $\lambda \to \infty$, $k \to \infty$, and it is the right model of a game that has been played long enough, by people who have had the time and the incentive to learn it.

::: summary
- Level-$k$ ([[#def-levelk]]) best-responds to level-$(k-1)$. In the $p$-beauty contest, $g_k = 50 p^k$ ([[#prop-pk]]). Nash is $0$, and first-round play is not Nash.
- Cognitive hierarchy ([[#def-ch]]) best-responds to a Poisson mixture of lower levels. A typical $\tau$ is $1$ to $2$. CH bunches where level-$k$ keeps iterating.
- Logit QRE ([[#def-qre]], [[#eq-logit]]) is an equilibrium of noisy best responses. $\lambda = 0$ is uniform; $\lambda \to \infty$ is Nash. $\lambda$ is not unit-free.
- First-round play looks like level-$k$/CH; repeated play moves toward Nash at a speed a learning model can fit. The two statements are the subject.
- Level-$0$ is a hypothesis. Social preferences and bounded reasoning both move ultimatum offers; they are not identified from the offer alone.
- Playing Nash in a non-Nash population loses ([[#ex-beauty]]). The winner’s $k$ matches the room, not the textbook.
:::

## Exercises

::: exercise A level-$2$ guess {level=1 check="22.22"}
In Nagel’s $p = 2/3$ contest with level-$0$ at $50$, enter the level-$2$ guess to two decimal places.
::: solution
$50 \times (2/3)^2 = 50 \times 4/9 \approx 22.22$.
:::
:::

::: exercise Nash of the contest {level=1 check="0"}
Enter the unique Nash guess of the $p = 2/3$ contest on $[0, 100]$.
::: solution
$g = (2/3) g$ implies $g = 0$.
:::
:::

::: exercise A $p = 0.7$ contest {level=1 check="24.5"}
Level-$0$ at $50$, $p = 0.7$. Enter the level-$2$ guess to one decimal place.
::: solution
$50 \times 0.49 = 24.5$.
:::
:::

::: exercise Classroom winner {level=2}
In [[#ex-beauty]], two-thirds of the mean was about $22.96$. A student who played $25$ and a student who played $0$ both claim they were “more rational”. Who was closer to the target, and what does “rational” mean here?
::: solution
$|25 - 22.96| = 2.04$, $|0 - 22.96| = 22.96$. The student at $25$ was closer. If “rational” means Nash, the student at $0$ played the equilibrium of a game that was not the game being played (the opponents were not Nash). If “rational” means best-responding to the actual population, the student at $25$ was closer to a best response. Behavioural game theory is the second usage; Nash is the first. The contest’s prize follows the second.
:::
:::

::: exercise Poisson $\tau = 1.5$ {level=2}
Using [[#ex-poisson]], a CH level-$1$ player plays $50p = 33.33$. Combined with the level-$2$ play of $26.67$ and a mass of level-$0$ at $50$ with frequencies $f(0), f(1), f(2)$ renormalised on $\{0,1,2\}$, sketch whether the mean guess sits nearer $30$ or nearer $20$. (A one-decimal-place estimate is enough.)
::: hint
Renormalise $0.223$, $0.335$, $0.251$ on those three levels.
:::
::: solution
Sum $0.223+0.335+0.251 = 0.809$. Weights $0.276$, $0.414$, $0.310$. Mean $0.276\times 50 + 0.414\times 33.33 + 0.310\times 26.67 \approx 13.8 + 13.8 + 8.3 \approx 35.9$. Nearer $30$ than $20$ — in fact a little above $33$, pulled up by the level-$0$ mass. Newspaper means in Bosch-Domènech et al. often sat in the high $20$s to mid $30$s, in this neighbourhood.
:::
:::

::: exercise Logit at $\lambda = 0$ {level=2}
Show from [[#eq-logit]] that $\lambda = 0$ implies uniform play, regardless of payoffs. What is Row’s $p(q)$ in [[#ex-pennies]] at $\lambda = 0$?
::: solution
$e^{0 \cdot u} = 1$ for every strategy, so $\sigma_i(s_i) = 1/|S_i|$. In matching pennies, $p(q) = 1/2$ for all $q$. The best-response curve is flat; the only QRE is $1/2$, which is also Nash, but the *reason* is noise, not indifference.
:::
:::

::: exercise An asymmetric matching pennies {level=3}
Modify [[#ex-pennies]] so that Row earns $2$ from $(H,H)$, $-1$ from $(H,T)$, $-1$ from $(T,H)$ and $1$ from $(T,T)$. Column’s payoffs remain $-1$ on matches and $+1$ on mismatches. Show that Column’s Nash probability $q$ of $H$ equals $2/5$. As $\lambda$ falls from $\infty$ toward $0$, in which direction does a symmetric-precision logit QRE typically move $q$?
::: hint
Row’s expected payoff to $H$ is $2q + (-1)(1-q) = 3q-1$; to $T$ is $-q + (1-q) = 1-2q$. Set them equal for Nash. At $\lambda = 0$, QRE is uniform.
:::
::: solution
Row is indifferent when $3q-1 = 1-2q$, i.e. $5q = 2$, so $q = 2/5$. (Column’s own indifference determines Row’s Nash mixture, which is not asked here.) As $\lambda \to 0$, logit QRE of any $2 \times 2$ game goes to $(1/2, 1/2)$. So $q$ rises from $0.4$ toward $0.5$ as precision falls. Put differently: noise pulls mixtures toward uniform, and $2/5$ is already on the same side of $1/2$ as that limit. (Goeree, Holt and Palfrey’s distinctive comparative static is richer in games where the two players’ payoff asymmetries disagree; the one-parameter pull toward $1/2$ is the part this calculation identifies.)
:::
:::

::: exercise Level-$0$ is a hypothesis {level=3}
A $p = 2/3$ contest is run on $\{0, 1, \dots, 100\}$, but now a round number, $100$, is uniquely salient (a prize is mentioned for “a perfect score”). A researcher assumes level-$0$ plays $100$ rather than $50$. What are the level-$1$ and level-$2$ guesses? How would a histogram with a spike at $67$ and a spike at $44$ distinguish this level-$0$ from Nagel’s?
::: hint
Level-$k$ still iterates $g_k = p\, g_{k-1}$.
:::
::: solution
Level-$1$ plays $(2/3)\times 100 \approx 66.67$; level-$2$ plays $(2/3)^2 \times 100 \approx 44.44$. A spike at $67$ and a spike at $44$ are the first two iterates of $100$, whereas Nagel’s spikes at $33$ and $22$ are the first two iterates of $50$. The histogram distinguishes the two level-$0$ hypotheses. It does *not* distinguish them from a CH model with a different $\tau$ and the original level-$0$, without more structure: that is why level-$0$ has to be specified before the data are seen, or pinned down by a salience argument that can be tested on a new game.
:::
:::

::: exercise Why $\lambda$ is not unit-free {level=2}
A matching-pennies QRE is estimated at $\lambda = 1.5$ with payoffs $\pm 1$. The same choices are re-estimated after the experimenter records payoffs as $\pm 100$ (cents instead of dollars). If the researcher holds $\lambda$ fixed at $1.5$, what has happened to the model? What $\lambda$ preserves the original QRE?
::: solution
Logit probabilities depend on $\lambda u$. Replacing $u$ by $100 u$ and keeping $\lambda = 1.5$ multiplies every exponent by $100$, which is the same as $\lambda = 150$ on the original payoffs — essentially Nash. The model has been changed, silently. The $\lambda$ that preserves the QRE is $\lambda' = 1.5 / 100 = 0.015$. Any comparison of $\lambda$ across games or papers has to be made on a common payoff scale, or reported as $\lambda$ times a unit of payoff.
:::
:::
