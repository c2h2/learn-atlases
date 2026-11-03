On the beaches of Mandarte Island in British Columbia, northwestern crows (*Corvus caurinus*) feed on whelks at low tide. A crow picks up a whelk, flies almost straight up, drops it onto the rocks, and repeats until the shell breaks. Reto Zach, who studied them in the 1970s, noticed that the crows were selective — they took only the largest whelks — and that they dropped them from a fairly consistent height of about 5 metres. Dropping whelks himself from a ladder, he found that large whelks broke more readily than small ones, and that the number of drops needed fell with height, steeply at first and then only slowly. Flying higher costs energy; dropping from lower down means more drops. The height the crows used was close to the one that minimised the total height they had to climb to break a whelk.

The crows illustrate the approach of this chapter. Foraging is a set of decisions — what to eat, where to search, how long to stay, how much risk to take — whose consequences can be modelled. **Optimal foraging theory** asks what decisions would maximise some currency related to fitness, under stated constraints, and compares the predictions with what animals do ([[behaviour/studying-behaviour#def-optimality]]). We develop its two classic models, the prey (diet) model and the patch model with Charnov's marginal value theorem, then treat risk-sensitive foraging, the trade-off between feeding and avoiding predators, and foraging in groups, ending with the ideal free distribution. The functional response from [[ecology/predation-parasitism]] is the starting point.

## Currencies and constraints

::: example Whelk-dropping crows {#ex-crows}
Suppose the mean number of drops needed to break a large whelk dropped from height $h$ metres (for $h > 1$) is $N(h) = 1 + 16/(h - 1)$ — an illustrative curve with the shape Zach measured. If the cost of breaking a whelk is proportional to the total height climbed, $H(h) = h\,N(h)$, which height should a crow use?
::: solution
$H(h) = h + \dfrac{16h}{h - 1}$. Differentiating, $\dfrac{dH}{dh} = 1 + 16\,\dfrac{(h-1) - h}{(h-1)^2} = 1 - \dfrac{16}{(h - 1)^2}$, which is zero when $(h - 1)^2 = 16$, that is $h^* = 5$ m. At $h^* = 5$, $N = 5$ drops and $H = 25$ m; from 3 m a crow would need 9 drops (27 m), and from 12 m about 2.5 drops (29 m). The cost curve is shallow near its minimum, so the precise height matters little — but very low and very high drops are clearly worse. Zach's crows used heights close to the minimum of his measured cost curve.
:::
:::

The example shows the ingredients of every foraging model: a **decision variable** (height), a **currency** (total height climbed, a proxy for energy spent per whelk), and **constraints** (the breaking curve of whelks, set by physics). The most common currency is the **long-term average rate of net energy intake**, on the grounds that, other things being equal, an animal that gains energy faster has more time and energy for other activities, such as avoiding predators or reproducing. Other currencies — efficiency (energy gained per energy spent), the probability of surviving a night, or nutrient balance — are appropriate in other circumstances, and choosing the right one is part of the science.

The rate currency rests on a basic equation for foragers that alternate between searching and handling.

::: proposition Holling's disc equation {#prop-holling}
A forager searches for prey that it encounters at rate $\lambda$ per unit search time; each prey item yields net energy $e$ and takes handling time $h$ (pursuing, subduing, eating). Over a total time $T = T_s + T_h$ spent searching and handling, it encounters $\lambda T_s$ prey, and $T_h = \lambda T_s h$. Its average rate of energy intake is therefore

$$
R = \frac{\lambda T_s e}{T_s + \lambda T_s h} = \frac{\lambda e}{1 + \lambda h}.
$$ {#eq-holling}

This is Holling's type II functional response (C. S. Holling, 1959), expressed per forager. Assumptions: encounters are a Poisson process during search, search and handling are mutually exclusive, and $e$, $h$ and $\lambda$ are constant.
:::

## What to eat: the prey model

A forager encounters several kinds of prey. Should it eat everything it meets, or ignore some kinds in order to spend more time searching for better ones? Let prey type $i$ yield energy $e_i$, take handling time $h_i$, and be encountered at rate $\lambda_i$.

::: definition Profitability {#def-profitability}
The **profitability** of a prey type is $e_i/h_i$, the energy gained per unit of handling time. Prey are **ranked** by profitability, $e_1/h_1 > e_2/h_2 > \dots$.
:::

::: proposition The optimal diet {#prop-diet}
To maximise the long-term rate of energy intake, a forager should always take the highest-ranked prey, and should add prey types in order of rank. It should include type $j$ in its diet if and only if its profitability exceeds the rate of intake obtained from the higher-ranked types alone:

$$
\frac{e_j}{h_j} > \frac{\sum_{i<j}\lambda_i e_i}{1 + \sum_{i<j}\lambda_i h_i}.
$$ {#eq-diet}

Three consequences follow: (1) each prey type is either always taken or always ignored on encounter (the **zero–one rule**); (2) whether a type is included depends on the abundances of the *higher-ranked* types, not on its own abundance; (3) as better prey become more abundant, the diet narrows.
:::

::: proof
With a diet consisting of a set $D$ of prey types, the multi-prey version of [[#eq-holling]] gives the rate $R_D = \sum_{i\in D}\lambda_i e_i / (1 + \sum_{i\in D}\lambda_i h_i)$. Write $A = \sum_{i<j}\lambda_i e_i$ and $B = 1 + \sum_{i<j}\lambda_i h_i$, so the rate without type $j$ is $A/B$. Adding $j$ gives $(A + \lambda_j e_j)/(B + \lambda_j h_j)$. This exceeds $A/B$ if and only if $B(A + \lambda_j e_j) > A(B + \lambda_j h_j)$, that is $B\lambda_j e_j > A\lambda_j h_j$, or $e_j/h_j > A/B$. The common factor $\lambda_j$ cancels, which is why type $j$'s own abundance does not appear. Moreover, the rate with the first $j$ types is an average of profitabilities weighted by time spent handling, so if a type fails the test, every lower-ranked type, with smaller $e/h$, also fails it.
:::

The intuition is opportunity cost. When you meet a poor item, eating it costs its handling time, during which you could have been searching for something better. Whether that is worth it depends on how quickly you would meet something better — on the abundance of better prey — not on how common the poor item is.

::: example Should a shorebird eat small worms? {#ex-diet}
A shorebird encounters large worms (20 J each, handling time 10 s) at rate $\lambda_1$ per second of search, and small worms (5 J, 5 s) at rate $\lambda_2 = 0.02$ s⁻¹. (a) Rank the prey. (b) If $\lambda_1 = 0.01$ s⁻¹, should the bird eat small worms, and what is its intake rate? (c) Above what encounter rate with large worms should it ignore small ones?
::: solution
(a) Profitabilities: large $20/10 = 2$ J s⁻¹, small $5/5 = 1$ J s⁻¹; large worms rank first.

(b) Eating only large worms gives $R_1 = \lambda_1 e_1/(1 + \lambda_1 h_1) = 0.2/1.1 = 0.182$ J s⁻¹. Small worms' profitability, 1 J s⁻¹, exceeds this, so they should be included. The rate with both is $(0.2 + 0.1)/(1 + 0.1 + 0.1) = 0.25$ J s⁻¹.

(c) Specialise when $R_1 > 1$, that is $20\lambda_1/(1 + 10\lambda_1) > 1$, or $10\lambda_1 > 1$: $\lambda_1 > 0.1$ s⁻¹, one large worm per 10 s of search. The threshold does not depend on $\lambda_2$.
:::
:::

::: widget plot
f: 20*x/(1 + 10*x); (20*x + 5*l)/(1 + 10*x + 5*l)
x: 0, 0.4
y: 0, 1.6
sliders: l=0.02:0:0.2:0.01
labels: \text{rate eating large worms only}; \text{rate eating both}
hlines: 1
caption: Intake rate (J s⁻¹) of the shorebird in [[#ex-diet]] against the encounter rate with large worms $\lambda_1$ (per second). The horizontal line is the profitability of small worms. Where the specialist curve is below it, eating both gives the higher rate; where it is above, ignoring small worms is better. The curves cross at $\lambda_1 = 0.1$ whatever the encounter rate $l$ with small worms — move $l$ to check that their own abundance does not change the switching point.
:::

The model was tested by John Krebs, Jan Erichsen, Michael Webber and Eric Charnov (1977) with great tits (*Parus major*) in an aviary, offered large and small pieces of mealworm on a moving conveyor belt that passed a window, so that the experimenters controlled encounter rates exactly. When large pieces were rare, birds took both; when large pieces were common enough that the model predicted specialisation, birds became selective, and as predicted this happened whatever the density of small pieces. But the switch was not all-or-none: birds continued to take some small pieces when they "should" have ignored them all. Such **partial preferences** are found in most tests. They are usually attributed to the costs of discrimination and to sampling: a forager that never tried the poorer prey would not detect a change in its value. Shore crabs (*Carcinus maenas*) choosing mussels of different sizes (Roger Elner and Roger Hughes, 1978) preferred the most profitable sizes and broadened their diet when these were scarce, again with partial preferences.

## Where and how long: the patch model

Food is usually patchy, and a patch depletes as the forager exploits it: a bee drains the flowers in a cluster, a tit finds fewer insects the longer it searches a branch. The forager must decide when to leave for a new patch, accepting a travel time during which it gains nothing.

::: definition Gain function and travel time {#def-gain}
The **gain function** $g(t)$ is the cumulative energy obtained after time $t$ in a patch. For a depleting patch it is increasing and concave: $g(0) = 0$, $g'(t) > 0$ and $g''(t) < 0$, so the instantaneous rate of gain $g'(t)$ — the **marginal rate** — declines with time in the patch. The **travel time** $\tau$ is the average time to move between patches.
:::

::: theorem The marginal value theorem {#thm-mvt}
In an environment of identical patches with gain function $g$ and travel time $\tau$, the residence time $t^*$ that maximises the long-term rate of gain

$$
R(t) = \frac{g(t)}{\tau + t}
$$

satisfies

$$
g'(t^*) = \frac{g(t^*)}{\tau + t^*} = R^*.
$$ {#eq-mvt}

The forager should leave a patch when the marginal rate of gain in the patch falls to the best average rate for the environment as a whole. Consequently, residence time increases with travel time, and (with several patch types) every patch is left at the same marginal rate. (Eric Charnov, 1976.)
:::

::: proof
$R$ is differentiable for $t > 0$, with $R'(t) = \dfrac{g'(t)(\tau + t) - g(t)}{(\tau + t)^2}$. At an interior maximum $R'(t^*) = 0$, giving [[#eq-mvt]]. To see that the solution is a maximum and unique, write $\phi(t) = g'(t)(\tau + t) - g(t)$. Then $\phi(0) = g'(0)\tau > 0$ and $\phi'(t) = g''(t)(\tau + t) < 0$, so $\phi$ decreases; if $\phi$ becomes negative (as it does when $g'$ falls towards zero), it crosses zero exactly once, and $R$ increases before that point and decreases after it.

For the dependence on $\tau$: differentiate $\phi(t^*; \tau) = 0$ implicitly. $\partial\phi/\partial\tau = g'(t^*) > 0$ and $\partial\phi/\partial t = g''(t^*)(\tau + t^*) < 0$, so $dt^*/d\tau = -(\partial\phi/\partial\tau)/(\partial\phi/\partial t) > 0$. Longer travel means longer stays.
:::

The theorem has a famous graphical form. Plot $g(t)$ to the right of the origin and mark the travel time $\tau$ to the left. The rate obtained with residence time $t$ is the slope of the line from $(-\tau, 0)$ to the point $(t, g(t))$ on the curve. The steepest such line is the one tangent to the curve; its point of contact is $t^*$, and its slope is $R^*$.

::: widget plot
f: if(x >= 0, 10*(1 - exp(-0.2*x)), 0); m*(x + T)
x: -15, 25
y: 0, 12
sliders: T=5:1:15:0.5; m=0.5:0.1:1.2:0.01
labels: \text{gain } g(t) = 10(1 - e^{-0.2t}); \text{rate line from } (-T, 0)
caption: The marginal value theorem. The curve is the cumulative gain in a patch against time in minutes; the line starts at minus the travel time $T$ with slope $m$, the overall rate of gain. Lower $m$ until the line just touches the curve: with $T = 5$ this happens at $m \approx 0.64$, touching at $t^* \approx 5.7$ min. Then increase $T$ to 10 and repeat — the line must be shallower ($m \approx 0.44$) and touches later, at $t^* \approx 7.5$ min. Longer travel, longer stay.
:::

::: example Residence time in a depleting patch {#ex-mvt}
A forager's gain in a patch is $g(t) = 10(1 - e^{-0.2t})$ (in units of food, with $t$ in minutes), and travel between patches takes $\tau = 5$ min. Find the optimal residence time and the resulting rate of gain. How do they change if $\tau = 10$ min?
::: solution
Here $g'(t) = 2e^{-0.2t}$, and [[#eq-mvt]] becomes $2e^{-0.2t}(t + 5) = 10(1 - e^{-0.2t})$. This has no closed-form solution; solving numerically (bisection) gives $t^* = 5.73$ min. The gain is then $g(5.73) = 6.82$ units, and the rate $R^* = 6.82/10.73 = 0.636$ units per min, equal to $g'(t^*) = 2e^{-1.146} = 0.636$, as the theorem requires.

With $\tau = 10$, the same procedure gives $t^* = 7.53$ min, gain 7.78 and $R^* = 0.444$. Doubling travel time lengthens the stay by about 30 % and lowers the overall rate. Note what the forager does *not* do: it does not stay until the patch is empty, nor leave as soon as intake starts to fall.
:::
:::

The qualitative prediction — longer travel, longer stays — has been confirmed in many species. Richard Cowie (1977) let great tits forage in an aviary for mealworm pieces hidden in sawdust-filled cups on artificial trees; he manipulated travel time by covering the cups with lids that were hard or easy to remove. Birds stayed longer in each patch when travel was harder, close to the quantitative predictions once the energetic cost of travel was included. Alex Kacelnik (1984) studied starlings (*Sturnus vulgaris*) bringing leatherjackets to their nestlings; each trip from the nest to a feeding site is a "patch" that yields diminishing returns, because a bird with a beakful of prey finds it harder to catch more. Using a feeder that delivered mealworms at increasing intervals, he showed that starlings collected larger loads when the feeder was farther from the nest, as the **central place** version of the theorem predicts. In general, quantitative fits are good but imperfect: animals often stay a little longer than predicted, which may reflect currencies other than rate, uncertainty about patch quality, or discounting of delayed rewards.

::: warning "Optimal" does not mean perfect, and models are not claims that animals calculate
An optimality model predicts what selection would favour under its assumptions. Animals are not expected to solve equations; they use mechanisms — rules of thumb such as "leave after a fixed time without a capture" or "leave when the interval between captures exceeds a threshold" — that approximate the optimum in their normal environment. Deviations from a prediction are not "mistakes by the animal" but evidence that the model's currency or constraints are incomplete, or that the mechanism does not fully implement the optimal policy. The value of the model is that it makes such deviations visible and interpretable.
:::

::: quiz
According to the marginal value theorem, what happens to the time a bee spends in each flower patch if all the patches in its environment become richer (each gain curve multiplied by the same factor greater than 1), with travel time unchanged?
- [ ] It increases, because each patch has more to offer
- [ ] It decreases, because the bee can afford to be choosy
- [x] It does not change
- [ ] It depends on the encounter rate with predators
::: solution
If $g(t)$ is replaced by $k\,g(t)$, condition [[#eq-mvt]] becomes $k g'(t^*) = k g(t^*)/(\tau + t^*)$, and $k$ cancels: the optimal residence time is unchanged, and only the rate rises by the factor $k$. The prediction changes if patches become richer in a way that changes the *shape* of the gain curve — for example, if they deplete more slowly — or if only some patches change: a richer environment overall raises $R^*$, so the forager should leave poorer patches earlier.
:::
:::

## Risk-sensitive foraging

So far the currency has been an average. But averages hide variance, and for some animals variance is a matter of life and death. A small bird in winter must gain enough energy by dusk to survive a long, cold night. Suppose it can choose between a feeding site with a fixed, certain yield and one with the same mean but variable yield.

::: example A night to survive {#ex-risk}
A bird needs to gain at least 10 units of energy before nightfall to survive. A constant site gives exactly $\mu$ units; a variable site gives an amount that is normally distributed with mean $\mu$ and standard deviation 2. Which site maximises its probability of survival when (a) $\mu = 11$ and (b) $\mu = 9$?
::: solution
(a) With $\mu = 11$, the constant site guarantees survival (probability 1). At the variable site, survival requires the gain $X$ to exceed 10: $P(X > 10) = P(Z > (10 - 11)/2) = P(Z > -0.5) = 0.69$. The bird should be **risk-averse** and choose the constant site.

(b) With $\mu = 9$, the constant site guarantees death. The variable site gives $P(X > 10) = P(Z > 0.5) = 0.31$. The bird should be **risk-prone** and gamble on the variable site.

This is the **energy-budget rule**: be risk-averse when the expected gain exceeds requirements (a positive budget) and risk-prone when it falls short (a negative budget). (Under a normal approximation, the probability of exceeding the requirement $R$ is maximised by maximising $(\mu - R)/\sigma$ when $\mu > R$, which favours small $\sigma$, and by large $\sigma$ when $\mu < R$; David Stephens, 1981.)
:::
:::

::: widget distribution
dist: normal
params: mu=9, sigma=2
a: 10
b: 20
caption: The energy gained at the variable site in [[#ex-risk]] when the mean is 9 units and the requirement 10. The shaded area, about 0.31, is the probability of surviving the night — compared with zero at a constant site giving exactly 9. Increase $\sigma$ to see the gamble become better; set the mean to 11 to see that variance now lowers the shaded area below the certain survival offered by a constant site.
:::

Thomas Caraco, Steven Martindale and Thomas Whittam (1980) gave yellow-eyed juncos (*Junco phaeonotus*) a choice between a tray with a fixed number of seeds and one with a variable number of the same mean. Birds with a positive energy budget preferred the fixed option; when the experimenters lowered the birds' budget (by reducing the temperature or depriving them of food), they switched to the variable option. Later tests gave mixed results across species, and an important pattern emerged. When the variable option differs in *amount*, animals are usually risk-averse; when it differs in *delay* to reward, they are usually risk-prone (Alex Kacelnik and Melissa Bateson, 1996). That pattern is better explained by how animals perceive and remember amounts and intervals — with errors proportional to the magnitude — than by the energy budget, a reminder that mechanisms shape choices.

## Food or safety

A forager that maximises its intake rate while ignoring predators is unlikely to leave many descendants. Real foraging decisions trade energy against the risk of being eaten, and that trade-off shapes where animals feed, how vigilant they are, and when they stop.

### Vigilance and groups

Animals feeding in groups spend less time scanning for predators per individual, yet are often safer. Two effects contribute. In the **many-eyes** effect (Harry Pulliam, 1973), the group detects a predator if any member does; in the **dilution** effect, a predator that attacks a group takes one individual, so each member's risk falls with group size.

::: example Many eyes {#ex-vigilance}
Each animal in a group is head-up and vigilant at a random moment with probability 0.3, independently of the others. What is the probability that at least one member of a group of five is vigilant when a predator appears? How low could each individual's vigilance fall while keeping the group's detection probability equal to that of a solitary animal vigilant 50 % of the time?
::: solution
The probability that nobody is vigilant is $0.7^5 = 0.168$, so at least one is vigilant with probability $1 - 0.168 = 0.832$. For a group of five to match a solitary animal ($0.5$), we need $1 - (1 - p)^5 = 0.5$, so $(1 - p)^5 = 0.5$ and $p = 1 - 0.5^{1/5} = 0.129$. Each animal could cut its vigilance from 50 % to about 13 % and the group would detect predators as often — leaving far more time for feeding. Whether individuals actually benefit depends on whether information spreads from the detector to the others quickly, which it does not always.
:::
:::

The model predicts that individual vigilance falls with group size, which is one of the most consistently observed patterns in birds and mammals. But it raises a problem: if others are watching, why should any individual watch at all? Vigilance is a public good, and each individual is tempted to free-ride; game-theoretic models ([[behaviour/conflict-game-theory]]) predict an evolutionarily stable level of vigilance that is lower than would be best for the group.

### The cost of predation risk

A foraging animal should leave a patch when the benefit of staying no longer exceeds its costs — and the costs include predation risk. Joel Brown (1988) turned this into a field method. If an animal leaves a food patch when its harvest rate falls to the sum of its metabolic cost, its predation cost and its missed-opportunity cost, then the density of food left behind — the **giving-up density** (GUD) — measures these costs. Trays of seeds mixed into sand are set out in different places; the seeds left the next morning are counted. Higher GUDs under open sky than under cover, or on moonlit nights than on dark ones, quantify how dangerous animals perceive each situation to be — what has been called the **landscape of fear**.

For animals that grow before they reproduce, such as juvenile fish, a general rule emerges. James Gilliam's analysis (published with Earl Werner in 1984) shows that, under some conditions, an animal maximising its chance of surviving to a given size should choose the habitat that minimises the ratio of mortality rate to growth rate, $\mu/g$. Werner and colleagues found that small bluegill sunfish (*Lepomis macrochirus*) in the presence of largemouth bass stayed in vegetation, where food was poorer but predation lower, and moved to the richer open water only when they had grown too large for the bass to eat.

::: application Foraging theory in conservation and management
Optimal foraging models help predict how animals respond to environmental change. Models of shorebirds feeding on estuarine mudflats, built on the prey and patch models together with the birds' energy requirements, have been used in Britain and France to predict how many birds would starve if mudflats were lost to development or if shellfisheries removed prey — predictions that have been tested against observed mortality. Giving-up densities are used to measure the effectiveness of cover for prey animals and to evaluate how reintroduced predators change the behaviour of their prey.
:::

## Foraging in groups

When many foragers exploit the same patches, the value of a patch to one individual depends on how many others are there. The simplest model of the resulting distribution was given by Stephen Fretwell and Henry Lucas in 1970.

::: proposition The ideal free distribution {#prop-ifd}
Suppose foragers are **ideal** (each knows the value of every patch) and **free** (each can move to any patch at no cost), that resources arrive in patch $i$ at a constant rate $Q_i$ and are shared equally among the $n_i$ foragers there, so that each gains $Q_i/n_i$. Then at equilibrium no individual can increase its intake by moving, which requires equal intake in all occupied patches:

$$
\frac{Q_1}{n_1} = \frac{Q_2}{n_2} = \dots, \qquad\text{so}\qquad \frac{n_i}{N} = \frac{Q_i}{\sum_j Q_j}.
$$ {#eq-ifd}

The numbers of foragers in patches are proportional to the rates of resource input — **input matching**. The equilibrium is an evolutionarily stable state in the sense of [[behaviour/conflict-game-theory]].
:::

::: example Sticklebacks at two feeders {#ex-ifd}
Thirty sticklebacks are in a tank with food (water fleas) dropped at one end at twice the rate of the other end. What does the ideal free distribution predict? What happens if the rates are reversed?
::: solution
By [[#eq-ifd]], the fish should distribute themselves in proportion to input: $30\times\tfrac23 = 20$ at the rich end and $10$ at the poor end. Each fish then gains the same, since $2Q/20 = Q/10$. If the rates are reversed, the prediction reverses. Manfred Milinski (1979) did this experiment with six three-spined sticklebacks and found that the fish distributed themselves in close to the predicted 2 : 1 ratio within a few minutes, and redistributed when the inputs were switched.
:::
:::

Departures from the ideal free distribution are informative. If individuals differ in competitive ability, the distribution matches input in total competitive weight rather than in numbers. If animals are not "ideal" — they take time to learn patch values — or not "free" — dominant individuals exclude others — patches tend to be **undermatched**: the poorer patches hold more individuals than predicted, a pattern found in many experiments. Group foragers also face a further choice between finding food themselves (**producing**) and exploiting food found by others (**scrounging**); the stable frequency of each tactic depends on how common the other is, a frequency-dependent problem treated in the next chapter.

::: history
Robert MacArthur and Eric Pianka ("On optimal use of a patchy environment") and John Emlen ("The role of time and energy in food preference") both published in *The American Naturalist* in 1966, founding optimal foraging theory. Holling's disc equation dates from 1959. Charnov's marginal value theorem (1976) and the formal prey model (Charnov, 1976, and others) gave the theory its canonical form; experimental tests with great tits by Krebs, Charnov, Cowie and colleagues followed in 1977. Caraco's juncos (1980) and Stephens's energy-budget rule (1981) introduced risk, and Stephens and Krebs's *Foraging Theory* (1986) summarised the first two decades. Since then the theory has been extended to include predation risk, information and learning, and its predictions have been tested in animals as different as bumblebees, shore crabs, bats and baboons.
:::

::: summary
- Optimal foraging models specify a decision, a currency (often the long-term net rate of energy intake) and constraints; Holling's disc equation gives the rate $\lambda e/(1 + \lambda h)$.
- The prey model ranks prey by profitability $e/h$; a type is included only if its profitability exceeds the rate obtainable from better types. Inclusion is independent of its own abundance, and diets narrow when good prey are common. Tests show partial preferences.
- The marginal value theorem: leave a depleting patch when the marginal rate of gain falls to the best average rate for the environment, $g'(t^*) = g(t^*)/(\tau + t^*)$. Longer travel times mean longer stays and larger loads at a central place.
- Risk-sensitive foraging: be risk-averse with a positive energy budget and risk-prone with a negative one. Animals are usually risk-averse for variable amounts and risk-prone for variable delays.
- Foraging trades food against predation: group vigilance and dilution, giving-up densities and the landscape of fear, and the $\mu/g$ rule for growing animals.
- The ideal free distribution predicts input matching, $n_i/N = Q_i/\sum Q_j$, confirmed in sticklebacks; unequal competitors and imperfect information cause undermatching.
:::

## Exercises

::: exercise Profitability {level=1 check="1.5"}
A prey item yields 30 J and takes 20 s to handle. What is its profitability in J s⁻¹?
::: solution
$30/20 = 1.5$ J s⁻¹.
:::
:::

::: exercise A single prey type {level=1 check="0.5"}
A predator encounters prey at a rate of 0.05 s⁻¹ of search; each yields 20 J and takes 20 s to handle. What is its rate of energy intake in J s⁻¹?
::: solution
By [[#eq-holling]], $R = 0.05\times20/(1 + 0.05\times20) = 1/2 = 0.5$ J s⁻¹.
:::
:::

::: exercise Input matching {level=1 check="12"}
Forty ducks feed at two ponds where bread is thrown at rates of 3 and 7 pieces per minute. How many ducks does the ideal free distribution predict at the poorer pond?
::: solution
$40\times3/10 = 12$ ducks at the poorer pond and 28 at the richer.
:::
:::

::: exercise Specialise or generalise? {level=2 check="0.025"}
A predator meets prey A (60 J, 20 s) and prey B (10 J, 10 s). Above what encounter rate with prey A (per second of search) should it ignore B?
::: solution
A's profitability is 3 J s⁻¹ and B's is 1 J s⁻¹, so A ranks first. Ignore B when $60\lambda_A/(1 + 20\lambda_A) > 1$, i.e. $40\lambda_A > 1$, so $\lambda_A > 0.025$ s⁻¹ — one A per 40 s of search. At exactly this rate, A alone gives $1.5/1.5 = 1$ J s⁻¹, equal to B's profitability.
:::
:::

::: exercise Vigilance in a group {level=2 check="0.159"}
In a group of four, each animal is vigilant with probability $p$ independently. What value of $p$ (three significant figures) gives a 50 % chance that at least one is vigilant?
::: solution
$1 - (1 - p)^4 = 0.5$ gives $(1 - p)^4 = 0.5$, $p = 1 - 0.5^{1/4} = 1 - 0.8409 = 0.159$.
:::
:::

::: exercise Interpreting a patch experiment {level=2}
Great tits are trained to forage in an aviary where each patch yields prey at a declining rate. In treatment 1 the travel time between patches is 5 s; in treatment 2 it is 20 s. Mean residence times are 15 s and 31 s. The predicted values from the marginal value theorem (with rate maximisation) are 12 s and 24 s. (a) Do the results support the theorem qualitatively? (b) Suggest three reasons why birds might stay longer than predicted.
::: solution
(a) Yes: residence time increases with travel time, as the theorem predicts, and by a similar proportion. (b) Possible reasons: (1) the currency is not net rate — if travel is energetically expensive relative to searching, net rate maximisation predicts longer stays than gross rate; (2) the birds do not know the gain function exactly and use a rule of thumb (such as a giving-up time) that is calibrated for a typical patch; (3) birds discount the future, valuing immediate gains over delayed ones, which favours staying in the patch they are in; (4) the risk of predation while travelling makes travel costlier than its duration suggests.
:::
:::

::: exercise Residence time with a different gain curve {level=2 check="sqrt(20)"}
In a patch the cumulative gain is $g(t) = 10t/(t + 4)$ and the travel time is $\tau = 5$. Using [[#eq-mvt]], find $t^*$ exactly.
::: hint
Compute $g'(t) = 40/(t+4)^2$ and solve $g'(t)(t + 5) = g(t)$.
:::
::: solution
$\dfrac{40(t + 5)}{(t + 4)^2} = \dfrac{10t}{t + 4}$ gives $40(t + 5) = 10t(t + 4)$, i.e. $4t + 20 = t^2 + 4t$, so $t^2 = 20$ and $t^* = \sqrt{20} = 2\sqrt5 \approx 4.47$. The rate is then $g(t^*)/(t^* + 5) = (44.7/8.47)/9.47 \approx 0.557$.
:::
:::

::: exercise A risky choice {level=3}
A shrew must gain 40 units of energy over the next hour or it will starve. Site A yields an amount normally distributed with mean 36 and standard deviation 3; site B with mean 34 and standard deviation 8. (a) Which site gives the better chance of survival? (b) Which would a rate maximiser choose? (c) What does this show about the choice of currency?
::: solution
(a) Survival needs $X > 40$. At A, $P(Z > (40 - 36)/3) = P(Z > 1.33) = 0.091$. At B, $P(Z > (40 - 34)/8) = P(Z > 0.75) = 0.227$. B is better: with a negative budget, the variable site is the better gamble even though its mean is lower. (b) A rate maximiser would choose A, with the higher mean. (c) When survival depends on reaching a threshold within a limited time, maximising the mean is not the same as maximising fitness; the appropriate currency is the probability of meeting the requirement, and it can favour lower-mean, higher-variance options.
:::
:::

::: exercise Is the diet model refuted? {level=3}
In a test of the prey model, a predicted switch from "take both prey" to "take only large prey" occurs over a range of encounter rates rather than at a single threshold, and above the threshold birds still take 15 % of the small prey they meet. A critic says the zero–one rule is refuted and optimal foraging theory should be abandoned. Evaluate this argument.
::: solution
The zero–one rule is a prediction of a model with specific assumptions: perfect recognition of prey, complete knowledge of encounter rates, no cost of sampling, and a constant environment. The data refute that version; they do not refute the hypothesis that selection has shaped diet choice to increase intake rate. Partial preferences are predicted by modified models that include errors in recognising prey, the need to sample to track changes in prey value, or variation in the threshold among individuals (if individuals switch at different encounter rates, the population average changes gradually). The useful response is to test these modified models against each other — for instance, by measuring discrimination errors, or by testing whether partial preferences decline when the environment is made more stable. The qualitative predictions of the prey model (diet narrowing with abundance of good prey, independence from abundance of poor prey) were supported, which is substantial evidence that the model captures the main trade-off.
:::
:::
