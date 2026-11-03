In the autumn rut on the Isle of Rum, off the west coast of Scotland, a red deer stag (*Cervus elaphus*) holding a group of hinds is challenged by another. What usually follows is not a fight. The two stags roar at each other, often for several minutes, the challenger approaching; then, if neither withdraws, they walk side by side, parallel, a few metres apart, sizing each other up; only if this too fails to settle matters do they lock antlers and push. Most challenges end at the roaring or walking stage, with one stag retreating. Tim Clutton-Brock and Steve Albon, who studied the Rum deer from the 1970s, found that stags that roared at higher rates also tended to win fights, and that challengers usually withdrew from stags that out-roared them. Fights do happen, and they are dangerous — stags are injured, sometimes permanently — but they are the exception.

Why are so many animal contests settled by display rather than by escalated fighting? Until the 1970s a common answer was that restraint prevents injury and so benefits the species. John Maynard Smith and George Price showed in 1973 that the answer lies instead in the logic of strategic interaction: when the payoff of a behaviour depends on what others do, selection favours strategies that do well against the population they create. This chapter develops their framework — evolutionary game theory and the **evolutionarily stable strategy** — through the Hawk–Dove game, the dynamics of strategy frequencies, asymmetric contests such as those between owners and intruders, the assessment of fighting ability, and the war of attrition. The methods will be used again for communication, mating tactics and cooperation.

## Strategies and stability

In the optimality models of [[behaviour/foraging]], the payoff of a decision depended only on the environment. In a contest, it depends on what the opponent does. A behavioural rule in this setting is a **strategy**, and the appropriate notion of "optimal" changes.

::: definition Evolutionarily stable strategy {#def-ess}
Let $E(I, J)$ be the expected payoff (in units of fitness) to an individual playing strategy $I$ against an opponent playing $J$. A strategy $I$ is an **evolutionarily stable strategy (ESS)** if, when almost all members of a population play $I$, no rare mutant strategy $J$ can invade. In a large population with random pairwise contests this requires, for every $J \neq I$, either

$$
E(I, I) > E(J, I),
$$

or

$$
E(I, I) = E(J, I) \quad\text{and}\quad E(I, J) > E(J, J).
$$ {#eq-ess}

The first condition says that $I$ does better against itself than the mutant does against $I$; the second, needed when the mutant does equally well against $I$, says that $I$ does better against the rare mutants than they do against each other. (Maynard Smith and Price, 1973.)
:::

The reasoning behind the conditions is that a rare mutant almost always meets residents. Its fitness is therefore essentially $E(J, I)$, compared with the residents' $E(I, I)$. Only if these are equal do the rare encounters between mutant and resident and mutant and mutant decide the outcome.

An ESS is a refinement of a **Nash equilibrium** from economic game theory — a strategy that is a best reply to itself — with an extra stability condition. But the interpretation differs. Economists' players reason; in evolutionary games, strategies are inherited, payoffs are fitness, and the "choice" of strategy is made by selection. The phenotypic gambit of [[behaviour/studying-behaviour#def-optimality]] is assumed: strategies breed true.

## The Hawk–Dove game

Maynard Smith and Price imagined contests over a resource of value $V$ (in fitness units) between two strategies. A **Hawk** escalates and fights until injured or until the opponent retreats. A **Dove** displays, but retreats at once if the opponent escalates. When two Hawks meet, each is equally likely to win; the loser pays the cost of injury $C$. When two Doves meet, they display, and each is equally likely to get the resource (any cost of display is ignored here).

::: definition Hawk–Dove payoffs {#def-hawkdove}
The payoffs to the row strategy against the column strategy are

| | Hawk | Dove |
|---|---|---|
| **Hawk** | $\tfrac12(V - C)$ | $V$ |
| **Dove** | $0$ | $\tfrac12 V$ |
:::

::: proposition The ESS of the Hawk–Dove game {#prop-hawkdove}
1. If $V \ge C$, Hawk is the ESS: a population of Hawks cannot be invaded by Doves.
2. Dove is never an ESS: a Hawk mutant in a population of Doves gets $V > V/2$.
3. If $V < C$, the ESS is a **mixed strategy**: play Hawk with probability

$$
p^* = \frac{V}{C},
$$ {#eq-pstar}

or, equivalently, a stable polymorphism with a fraction $V/C$ of Hawks.
:::

::: proof
(1) $E(H, H) = (V - C)/2$ and $E(D, H) = 0$. If $V > C$, $E(H, H) > E(D, H)$ and the first condition of [[#eq-ess]] holds. If $V = C$, both equal 0, and the second condition holds because $E(H, D) = V > V/2 = E(D, D)$.

(2) $E(D, D) = V/2 < V = E(H, D)$, so the first condition fails, and the second does not apply.

(3) In a population in which a fraction $p$ of contests are with Hawks, the expected payoffs are

$$
W_H(p) = p\,\frac{V - C}{2} + (1 - p)V, \qquad W_D(p) = (1 - p)\,\frac{V}{2}.
$$

Their difference is $W_H - W_D = \tfrac12(V - pC)$, which is positive for $p < V/C$ and negative for $p > V/C$. So when Hawks are rarer than $V/C$ they do better and increase, and when commoner they do worse and decrease: $p^* = V/C$ is the only frequency at which both strategies do equally well. For the mixed strategy $I$ (Hawk with probability $p^*$), every alternative $J$ does equally well against $I$, so stability depends on the second condition of [[#eq-ess]]; one can check that $E(I, J) - E(J, J) = \tfrac{C}{2}(p^* - q)^2 > 0$ for a mutant playing Hawk with probability $q \neq p^*$. Hence $I$ is an ESS.
:::

::: example A contest for a nest site {#ex-hawkdove}
A nest site is worth $V = 50$ units of fitness, and losing an escalated fight costs $C = 100$. (a) What is the ESS? (b) What is the average payoff per contest in a population at the ESS, and how does it compare with a population of Doves? (c) Why can the population not stay at the higher payoff?
::: solution
(a) $V < C$, so the ESS is to play Hawk with probability $p^* = 50/100 = 0.5$.

(b) At $p^* = 0.5$, both strategies earn the same: $W_D = (1 - 0.5)\times 25 = 12.5$, and $W_H = 0.5\times(-25) + 0.5\times50 = 12.5$. A population of Doves would earn $V/2 = 25$ per contest, twice as much.

(c) A population of Doves is not stable: a Hawk mutant earns $V = 50$ against Doves, so Hawks invade and spread until $p = 0.5$. The ESS is not the strategy that maximises the population's welfare; it is the strategy that cannot be beaten by a rare alternative. This is the central lesson of evolutionary game theory, and it is the reason "for the good of the species" explanations of restraint fail.
:::
:::

::: widget plot
f: x*(v - c)/2 + (1 - x)*v; (1 - x)*v/2
x: 0, 1
y: -30, 55
sliders: v=50:10:100:5; c=100:10:200:5
labels: W_H(p)\ \text{(Hawk)}; W_D(p)\ \text{(Dove)}
vlines: 0.5
caption: Expected payoffs to Hawk and Dove against the frequency $p$ of Hawks in the population (horizontal axis). The lines cross at $p^* = V/C$, marked for the starting values $V=50$, $C=100$: to the left Hawks do better and increase, to the right Doves do. Raise the cost $c$ and the crossing moves left — dangerous weapons favour restraint. Make $v \ge c$ and the Hawk line stays above the Dove line everywhere: pure Hawk is the ESS.
:::

### From payoffs to dynamics

The ESS is a static condition. What happens to a population that starts away from it? If each strategy's frequency grows at a rate proportional to its payoff relative to the population average, the frequency $p$ of Hawks changes according to the **replicator equation**:

$$
\frac{dp}{dt} = p(1 - p)\,\bigl(W_H(p) - W_D(p)\bigr) = \tfrac12\,p(1 - p)(V - pC).
$$ {#eq-replicator}

This has equilibria at $p = 0$, $p = 1$ and $p = V/C$; for $V < C$ the interior equilibrium is stable and the other two unstable. Whatever the starting mixture (other than pure Doves or pure Hawks), the population converges to the ESS frequency. For two-strategy games like this, the ESS and the stable equilibrium of the replicator dynamics coincide; with more strategies, they can come apart, and dynamics can cycle.

::: widget slopefield
f: y*(1 - y)*(v - c*y)/200
x: 0, 40
y: 0, 1
points: 0, 0.05; 0, 0.95; 0, 0.3
sliders: v=50:10:100:5; c=100:10:200:5
caption: Replicator dynamics [[#eq-replicator]] for the Hawk–Dove game (with time rescaled by a factor of 100), showing the frequency of Hawks $y$ against time $x$. Trajectories starting with 5 %, 30 % or 95 % Hawks all converge on $y = V/C$, here 0.5. Click to start new trajectories; change $c$ to move the stable equilibrium.
:::

### Mixed strategies and polymorphisms

A mixed ESS can be realised in two ways: every individual plays Hawk with probability $V/C$, or a fraction $V/C$ of individuals always play Hawk. In the simplest models the two are equivalent, but they predict different things — individual consistency versus individual randomness — and can be distinguished by observation. **Alternative reproductive tactics** are a well-studied case. In the bluegill sunfish (*Lepomis macrochirus*), some males grow large, build nests and court females, while others mature early and small and dart into nests to fertilise eggs ("sneakers"). Mart Gross showed that the two life histories coexist and argued that their lifetime success is similar, as frequency dependence predicts. In the side-blotched lizard (*Uta stansburiana*), Barry Sinervo and Curtis Lively (1996) described three throat-colour morphs of males with different mating strategies — aggressive orange males that hold large territories, blue males that guard single females, and yellow "sneaker" males — whose frequencies cycled over several years, each morph beating one other and losing to the third, like the game rock–paper–scissors.

::: warning The ESS is not what is best for the population
An ESS need not maximise mean fitness, and frequently does not. In the Hawk–Dove game with $V < C$, every individual at the ESS earns less than in an all-Dove population ([[#ex-hawkdove]]). Selection acts on strategies relative to one another, and a strategy that exploits others spreads even if the population as a whole suffers. Conversely, observing restraint in contests does not mean that it evolved to protect the species; it means that escalation, in that population, does not pay for the individual.
:::

## Asymmetric contests

Real opponents are rarely identical. They differ in size, in how much they value the resource, and in role — one is often already in possession. Asymmetries can be **correlated** with payoffs (a larger animal is likelier to win; a resident may value its territory more because it knows it) or **uncorrelated** — a mere difference in role, unrelated to fighting ability or value. Maynard Smith showed that even an uncorrelated asymmetry can settle contests.

::: proposition The Bourgeois strategy {#prop-bourgeois}
Suppose each contest is between an owner and an intruder, with each individual equally often in each role, and the payoffs are those of the Hawk–Dove game regardless of role. The strategy **Bourgeois** — play Hawk when owner, Dove when intruder — is an ESS whenever $V < C$. Its payoff against itself is $E(B, B) = V/2$, while $E(H, B) = (3V - C)/4$ and $E(D, B) = V/4$.
:::

::: proof
Against a Bourgeois opponent, a Bourgeois individual is owner in half its contests (opponent retreats, gain $V$) and intruder in half (it retreats, gain 0): $E(B, B) = V/2$. A Hawk, as owner, meets a Bourgeois intruder who retreats (gain $V$); as intruder, it meets a Bourgeois owner who fights (expected gain $(V - C)/2$). So $E(H, B) = \tfrac12 V + \tfrac14(V - C) = (3V - C)/4$. A Dove as owner meets a Bourgeois intruder who also plays Dove (gain $V/2$); as intruder it retreats from a Bourgeois owner (gain 0): $E(D, B) = V/4$. Now $E(B, B) > E(H, B)$ if and only if $2V > 3V - C$, that is $C > V$, and $E(B, B) = V/2 > V/4 = E(D, B)$ always. So Bourgeois satisfies the first condition of [[#eq-ess]] against both pure strategies when $V < C$.
:::

::: example Owners and intruders {#ex-bourgeois}
Take the nest-site contest of [[#ex-hawkdove]], with $V = 50$ and $C = 100$, and suppose every contest is between an owner and an intruder. Compare the payoffs of Bourgeois, Hawk and Dove in a Bourgeois population, and the average payoff in a Bourgeois population with that at the mixed Hawk–Dove ESS.
::: solution
By [[#prop-bourgeois]], $E(B, B) = 25$, $E(H, B) = (150 - 100)/4 = 12.5$ and $E(D, B) = 12.5$. Both pure strategies do worse than Bourgeois, so it is stable. A Bourgeois population earns 25 per contest — the same as an all-Dove population, and twice the 12.5 earned at the mixed ESS — because no fight is ever escalated and no contest wastes time in a symmetric display. An arbitrary rule that both contestants can observe has turned a costly game into a costless one.
:::
:::

Bourgeois does better than the mixed Hawk–Dove ESS, because no escalated fights occur: every contest is settled by the convention that owners win, and the cost $C$ is never paid. Logically, the reverse convention — intruders win — is also stable, but it is self-defeating in practice, because ownership would change at every encounter; it has been suggested, rarely, for a few species.

The convention "owner wins" is widespread in nature, but testing whether it is truly arbitrary is difficult. Nick Davies (1978) studied male speckled wood butterflies (*Pararge aegeria*), which hold sunspots on the woodland floor where they meet females. When an intruder arrived, a brief spiral flight followed and the resident always kept the sunspot. When Davies arranged for two males to occupy the same sunspot without noticing each other, so that each "believed" itself the owner, the subsequent spiral flights lasted much longer. Later studies (Darrell Kemp and Christer Wiklund and others) suggested that residents may also be warmer, more motivated, or of higher quality, so that the asymmetry is not purely conventional. The general lesson stands: ownership is a powerful cue, but whether it is an arbitrary convention or a correlate of value and fighting ability must be tested in each case.

::: quiz
Male A owns a territory; male B, slightly larger, intrudes. Under which conditions would you most expect B to escalate rather than retreat?
- [ ] When the territory is of little value and fighting is dangerous
- [x] When the territory is very valuable relative to the cost of fighting, and B's size advantage gives him a good chance of winning
- [ ] Whenever B is larger, regardless of value and cost
- [ ] Never, because the owner always wins
::: solution
Escalation pays when the expected gain — the value $V$ times the probability of winning — exceeds the expected cost. A high $V/C$ ratio and a good chance of winning both favour escalation. The Bourgeois convention is stable only when $V < C$; when resources are very valuable relative to costs (for example, the last breeding opportunity of an old male), conventions break down. Size alone does not decide it, and owners do not always win.
:::
:::

::: example When should the weaker contestant fight? {#ex-escalate}
An intruder estimates that it would win an escalated fight with probability $w$. Winning gains the territory, worth $V$; losing costs $C$ in injury; retreating gains and costs nothing. (a) For what values of $w$ should it escalate? (b) With $V = 50$ and $C = 100$, what is the threshold? (c) What if this is the animal's last chance to breed, so that $V = 300$?
::: solution
(a) Escalating has expected payoff $wV - (1 - w)C$, which exceeds 0 (the payoff of retreating) when $w > C/(V + C)$.

(b) $w > 100/150 = 0.67$: the intruder should fight only if it is fairly confident of winning.

(c) $w > 100/400 = 0.25$: when the resource is worth much more than the risk, even a probable loser should fight. This is the logic of "desperado" escalation by old or starving animals with little future to lose — their residual reproductive value, which the cost $C$ ultimately represents, is small. The calculation also shows why accurate assessment of $w$ is valuable: it lets both contestants avoid fights they would lose.
:::
:::

### Assessment and fighting ability

Geoff Parker (1974) introduced **resource-holding potential** (RHP): an individual's ability to win an escalated fight, determined by size, weapons, condition and skill. If contestants can assess each other's RHP, the weaker should retreat without fighting, and contests should be settled quickly when the difference is large and escalate when it is small. Magnus Enquist and Olof Leimar's **sequential assessment model** (1983) formalised this: contests proceed through stages of increasing cost and accuracy of information, and each contestant persists while the evidence that it is the stronger remains inconclusive. The model predicts that contests between closely matched opponents last longest and escalate furthest — a pattern found in many species, from cichlid fish to spiders.

What makes a display informative? A display reveals RHP reliably only if it cannot be faked: the roar of a red deer stag requires the same muscles and stamina as fighting, and Clutton-Brock and Albon found that roaring rate declined in stags that were tired or in poor condition. In common toads (*Bufo bufo*), males try to dislodge rivals from females' backs during mating. Nick Davies and Tim Halliday (1978) found that the pitch of a male's croak is lower in larger toads, because larger males have larger vocal cords; when they played deep or high croaks to attacking males from a speaker beside a silenced male, attackers were deterred more by deep croaks. These are examples of **indices**, signals whose form is physically tied to the quality they advertise, which are treated more fully in [[behaviour/communication]].

## The war of attrition

Many contests involve no physical fighting at all: the two opponents simply display until one gives up. The winner is the one who persists longer, and both pay a cost proportional to the duration of the contest. Maynard Smith (1974) called this the **war of attrition**. It has a remarkable solution.

::: proposition The war of attrition {#prop-attrition}
Two contestants compete for a resource of value $V$. Each chooses how long to persist, at a cost $k$ per unit time; the one who persists longer wins $V$, and both pay $k$ times the duration of the contest (the shorter of the two persistence times). No pure strategy is an ESS. The ESS is a mixed strategy in which persistence time $x$ is drawn from the exponential distribution

$$
f(x) = \frac{k}{V}\,e^{-kx/V}, \qquad x \ge 0,
$$ {#eq-attrition}

with mean $V/k$: individuals should be prepared to pay, on average, a cost equal to the value of the resource. At the ESS, every persistence time earns the same expected payoff, which is zero.
:::

::: proof
No pure persistence time $m$ is stable: against a population that always quits at $m$, a mutant that persists slightly longer wins every contest at little extra cost, and a mutant that quits immediately avoids the cost $km$ (which, if $km > V/2$, beats the residents' $V/2 - km$). For the mixed strategy, take opponents' persistence $Y$ with density $f$ and survival function $S(x) = P(Y > x) = e^{-kx/V}$. A focal individual that persists for time $x$ wins if $Y < x$, gaining $V - kY$, and loses if $Y > x$, paying $kx$. Its expected payoff is

$$
E(x) = \int_0^x (V - ky)f(y)\,dy - kx\,S(x).
$$

Differentiating, $E'(x) = (V - kx)f(x) - kS(x) + kxf(x) = Vf(x) - kS(x)$, which is zero for every $x$ when $f(x) = (k/V)S(x)$ — exactly the exponential distribution [[#eq-attrition]]. So $E(x)$ is constant, and since $E(0) = 0$ it is zero everywhere. Every strategy does equally well against the ESS; showing that the ESS does better against any rare alternative than the alternative does against itself (the second condition of [[#eq-ess]]) completes the proof (Bishop and Cannings, 1978).
:::

The result is striking: in a symmetric war of attrition, the whole value of the resource is, on average, dissipated in display costs. It also makes a prediction that seems strange at first: an individual's persistence should be unpredictable — if an opponent could predict exactly when you would quit, it would stay just a little longer.

::: example Waiting at a cowpat {#ex-attrition}
In a war of attrition over a resource worth $V = 10$ units, displaying costs $k = 1$ unit per minute. (a) What is the mean persistence time at the ESS? (b) What fraction of individuals persist for more than 10 minutes, and more than 20 minutes? (c) What is the expected payoff of an individual who persists for exactly 5 minutes, in a population playing the ESS?
::: solution
(a) The mean is $V/k = 10$ min.

(b) $P(X > x) = e^{-kx/V} = e^{-x/10}$, so $P(X > 10) = e^{-1} = 0.37$ and $P(X > 20) = e^{-2} = 0.14$.

(c) Zero, as for every persistence time at the ESS. Against opponents who quit within 5 minutes (probability $1 - e^{-0.5} = 0.39$) it wins 10 minus the cost of their persistence; against the rest, it loses 5 units of display. The gains and losses balance exactly — which a simulation of 200 000 random contests confirms to within sampling error. (The cowpat is a nod to Geoff Parker's studies of male dung flies, *Scathophaga stercoraria*, waiting for females on cowpats, where the decision when to leave yields equal mating success across stay times — the same "equal payoffs" signature of a mixed ESS, though in a game against the field rather than a pairwise contest.)
:::
:::

::: widget distribution
dist: exponential
params: lambda=0.1
a: 10
b: 60
caption: The ESS distribution of persistence times in the war of attrition of [[#ex-attrition]], with $V/k = 10$ minutes (rate 0.1 per minute). The shaded region beyond 10 minutes holds $e^{-1} \approx 0.37$ of individuals. Doubling the value of the resource halves the rate: try 0.05 to see the distribution stretch, with persistence times averaging 20 minutes.
:::

Asymmetries change the war of attrition too. If one contestant values the resource more, or pays lower costs, it should persist longer, and in the asymmetric war of attrition the ESS is often for the individual with the more favourable position to persist indefinitely and the other to quit at once — another route to quick settlements without fighting.

::: application Game theory beyond behaviour
Evolutionary game theory has spread far beyond animal contests. The same logic — payoffs that depend on the frequencies of strategies, and stability against invasion — explains the coexistence of antibiotic-producing and resistant strains of bacteria, cooperation and cheating in microbial populations that secrete shared enzymes, the dynamics of cancer cell populations competing within a tumour, and the virulence of pathogens. In fisheries and wildlife management, it helps predict how harvesting that removes the largest, most aggressive individuals changes the frequencies of behavioural types in the remaining population.
:::

::: history
R. A. Fisher's sex-ratio argument (1930) and W. D. Hamilton's analysis of unbeatable sex ratios (1967) used game-theoretic reasoning before the term was applied in biology. Maynard Smith and Price's "The logic of animal conflict" (*Nature*, 1973) introduced the evolutionarily stable strategy, using contests between "Hawk" and "Mouse" strategies; the Hawk–Dove name became standard soon after. Maynard Smith's 1974 paper in the *Journal of Theoretical Biology* analysed the war of attrition, Parker introduced resource-holding potential the same year, and Maynard Smith and Parker treated asymmetric contests in 1976. Peter Taylor and Leo Jonker formulated the replicator dynamics in 1978. Maynard Smith's *Evolution and the Theory of Games* (1982) summarised the theory.
:::

::: summary
- When payoffs depend on what others do, selection favours an evolutionarily stable strategy: one that, when common, cannot be invaded by a rare mutant ($E(I, I) > E(J, I)$, or equality with $E(I, J) > E(J, J)$).
- In the Hawk–Dove game, Hawk is the ESS if $V \ge C$; if $V < C$ the ESS is to play Hawk with probability $V/C$. The population at the ESS earns less than an all-Dove population would.
- Replicator dynamics $\dot p = \tfrac12 p(1 - p)(V - pC)$ carry populations to the ESS frequency.
- Mixed ESSs can be realised as polymorphisms: alternative reproductive tactics in sunfish, cycling morphs in side-blotched lizards.
- Asymmetries settle contests: Bourgeois (owner fights, intruder retreats) is an ESS when $V < C$ and avoids escalation altogether. Whether ownership is an arbitrary convention or a correlate of value must be tested.
- Contestants assess resource-holding potential through displays that cannot be faked (roaring in red deer, croak pitch in toads); closely matched contests last longest.
- In the war of attrition, persistence times are exponentially distributed with mean $V/k$, every persistence time earns the same payoff, and the resource's value is dissipated in display.
:::

## Exercises

::: exercise Hawk frequency {level=1 check="0.2"}
In a Hawk–Dove game with $V = 2$ and $C = 10$, what fraction of contests are played as Hawk at the ESS?
::: solution
$p^* = V/C = 2/10 = 0.2$.
:::
:::

::: exercise Pure Hawk {level=1}
Show that if $V = 10$ and $C = 6$, Hawk is the ESS. What is the payoff per contest in a population of Hawks?
::: solution
$E(H, H) = (10 - 6)/2 = 2 > E(D, H) = 0$, so Doves cannot invade. Each Hawk earns 2 per contest on average — winning half its fights (gain 10) and losing half (cost 6).
:::
:::

::: exercise Payoff at the ESS {level=1 check="4"}
With $V = 10$ and $C = 50$, what is the average payoff per contest to an individual in a population at the Hawk–Dove ESS?
::: solution
$p^* = 0.2$, and both strategies earn $W_D = (1 - 0.2)\times10/2 = 4$. (An all-Dove population would earn 5.)
:::
:::

::: exercise Persistence in a war of attrition {level=2 check="exp(-1.5)"}
In a war of attrition with $V = 20$ and cost $k = 2$ per minute, what fraction of individuals at the ESS persist for longer than 15 minutes?
::: solution
The mean persistence is $V/k = 10$ min, and $P(X > 15) = e^{-15/10} = e^{-1.5} \approx 0.223$.
:::
:::

::: exercise Bourgeois against Hawk {level=2}
Take $V = 4$ and $C = 6$. Calculate $E(B, B)$, $E(H, B)$ and $E(D, B)$, and show that Bourgeois is an ESS against both pure strategies. Then calculate $E(H, H)$ and $E(B, H)$; can Bourgeois invade a population of Hawks?
::: solution
$E(B, B) = V/2 = 2$; $E(H, B) = (3V - C)/4 = 6/4 = 1.5$; $E(D, B) = V/4 = 1$. Both are below 2, so Bourgeois resists invasion. In a Hawk population, $E(H, H) = (4 - 6)/2 = -1$. A Bourgeois mutant meets only Hawks: as owner it fights, gaining $-1$ on average, and as intruder it retreats, gaining 0, so $E(B, H) = -0.5 > -1$. Bourgeois invades Hawks. (Doves also invade Hawks here, since $E(D, H) = 0 > -1$.)
:::
:::

::: exercise A replicator equilibrium {level=2 check="0.4"}
For the replicator equation [[#eq-replicator]] with $V = 4$ and $C = 10$, find the interior equilibrium and show that it is stable.
::: solution
$dp/dt = \tfrac12 p(1-p)(4 - 10p) = 0$ at $p = 0.4$. For $p$ slightly below 0.4, $4 - 10p > 0$ and $p$ increases; slightly above, $p$ decreases. The equilibrium attracts nearby trajectories, so it is stable.
:::
:::

::: exercise Interpreting contest data {level=2}
In a study of a territorial fish, residents win 85 % of contests against intruders. Residents are on average 5 % larger than intruders. Contests between fish of very different sizes last a few seconds; those between fish of similar size last several minutes and more often involve biting. (a) Does the 85 % figure show that residents win by an arbitrary convention? (b) What do the durations suggest about assessment? (c) Design an experiment to separate the effects of residency and size.
::: solution
(a) No. Residents are larger, and may value the territory more (they know its resources) or be more motivated, so the asymmetry is confounded with RHP and value. (b) The pattern — short contests when RHP differs a lot, long and escalated contests when it is similar — is predicted by assessment models such as the sequential assessment game: contestants persist while uncertain who is stronger. (c) Size-match pairs, and randomly assign which member becomes resident (by letting it settle in the tank first); or use pairs in which the intruder is larger by varying amounts, and test whether the probability that the resident wins declines with the intruder's size advantage. If residents win among size-matched pairs, residency itself (or something it confers, such as knowledge of the site) matters.
:::
:::

::: exercise Mixed strategy or polymorphism? {level=3}
A species has a stable 30 % frequency of "aggressive" contests. Explain how you could tell whether this reflects every individual escalating in 30 % of its contests or 30 % of individuals always escalating. Why might the distinction matter evolutionarily?
::: solution
Follow marked individuals over many contests. Under a mixed strategy, each individual's frequency of escalation should be close to 0.3 with binomial variation around it, and past behaviour should not predict future behaviour. Under a polymorphism, individuals should be consistent — some escalating almost always, others almost never — giving a bimodal distribution of individual frequencies, high repeatability, and (if the polymorphism is genetic) resemblance between parents and offspring. The distinction matters because a genetic polymorphism is maintained by frequency-dependent selection on alleles, and its frequency changes over generations by the replicator dynamics, whereas a mixed strategy can respond within a lifetime; a conditional strategy (escalate when larger, or when hungry) is a third possibility, in which individuals differ in behaviour because they differ in state, not genotype.
:::
:::

::: exercise A costly display {level=3}
Modify the Hawk–Dove game so that when two Doves meet they each pay a display cost $D$ before one (at random) wins. Write the payoff matrix and find the ESS frequency of Hawks when $V < C$. What happens as $D$ increases?
::: solution
$E(D, D) = V/2 - D$; the other payoffs are unchanged. With frequency $p$ of Hawks, $W_H = p(V - C)/2 + (1 - p)V$ and $W_D = (1 - p)(V/2 - D)$. Setting them equal:

$$
p\,\frac{V - C}{2} + (1 - p)V = (1 - p)\Bigl(\frac{V}{2} - D\Bigr) \quad\Longrightarrow\quad p\,\frac{V - C}{2} + (1 - p)\Bigl(\frac{V}{2} + D\Bigr) = 0,
$$

so $p^* = \dfrac{V + 2D}{C + 2D}$. With $D = 0$ this is $V/C$; as $D$ increases, $p^*$ rises towards 1. Costly displays make Dove less attractive, so more contests escalate — a reason why selection may favour cheap ways of settling contests, such as conventions or reliable indices of RHP.
:::
:::
