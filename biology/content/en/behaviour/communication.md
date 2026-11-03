Vervet monkeys (*Chlorocebus pygerythrus*) in Amboseli, Kenya, are hunted by leopards, martial eagles and pythons, and each predator demands a different escape. Against a leopard, the safe place is high in a tree, out on thin branches; against an eagle, it is under a bush, since the treetops are where eagles strike; against a snake, the monkeys stand up and scan the grass around them. Thomas Struhsaker had noticed in the 1960s that vervets give acoustically different alarm calls to the three kinds of predator. In 1980 Robert Seyfarth, Dorothy Cheney and Peter Marler played recordings of the calls from hidden loudspeakers, with no predator present. Monkeys hearing a "leopard" alarm ran into trees, those hearing an "eagle" alarm looked up and ran into cover, and those hearing a "snake" alarm looked down. The calls alone carried enough information for listeners to choose the appropriate escape.

This chapter asks how and why animals communicate. We begin with definitions — what distinguishes a signal from a cue — and with the receiver's problem of extracting information from a noisy world. We then look at where signals come from and how their design fits the environment through which they travel. The core of the chapter is the problem of **honesty**: when signaller and receiver have conflicting interests, why should signals be believed? We examine costly signals and handicaps, indices that cannot be faked, shared interests, and social enforcement, and then deception and mimicry, which persist because honesty is common. We end with the honeybee dance, the most elaborate symbolic signal known outside our own species. The background on mate choice is in [[evolution/sexual-selection]].

## Signals, cues and information

::: definition Signal and cue {#def-signal}
A **signal** is an act or structure that alters the behaviour of another organism, which evolved because of that effect, and which is effective because the receiver's response has also evolved (John Maynard Smith and David Harper, 2003). A **cue** is any feature of the world, animate or inanimate, that an animal can use to guide its behaviour but that did not evolve for that purpose — the carbon dioxide breathed out by a mammal guides a mosquito, but the mammal has not evolved to attract mosquitoes. **Coercion** alters another's behaviour by force rather than through an evolved response (pushing a rival aside is not a signal).
:::

The definition is functional: what makes something a signal is the evolutionary history of both sides. The same act can be a cue in one context and a signal in another. The rustle of a mouse in the leaves is a cue to an owl; the squeak of a mouse pup that brings its mother to it is a signal.

Communication is often described as the transfer of **information** — the reduction of the receiver's uncertainty about some state of the world (the signaller's quality, its intentions, the presence of a predator). A signal is informative if the probability of the state, given the signal, differs from its probability without it. John Krebs and Richard Dawkins (1984) emphasised the other side: signals evolve because they change receivers' behaviour in ways that benefit signallers, which they called **manipulation**, while receivers evolve to resist manipulation and extract what truthful information they can (**mind-reading**). Both perspectives are needed. A signal persists only if responding to it pays the receiver on average, so signals carry information because receivers would otherwise stop responding.

### The receiver's problem

Every signal arrives against background noise — other sounds, varying light, other animals' signals — and the receiver must decide whether a signal is present and what it means. **Signal detection theory**, developed for radar and human psychophysics, describes the trade-off.

::: proposition Hits and false alarms {#prop-sdt}
Suppose a receiver's sensory system produces an internal response $X$ that is normally distributed with mean 0 and standard deviation 1 when only noise is present, and with mean $d'$ and the same standard deviation when a signal is present. If the receiver responds whenever $X$ exceeds a threshold $t$, then

$$
P(\text{hit}) = P(X > t \mid \text{signal}) = 1 - \Phi(t - d'), \qquad P(\text{false alarm}) = P(X > t \mid \text{noise}) = 1 - \Phi(t),
$$ {#eq-sdt}

where $\Phi$ is the standard normal distribution function. Lowering the threshold increases both hits and false alarms; only a larger separation $d'$ (a more conspicuous signal, or a better sense organ) improves both together. The best threshold depends on how common signals are and on the costs of missed signals and false alarms.
:::

::: example A threshold for responding {#ex-sdt}
A female frog listens for male calls against the chorus of other species. Her internal response to noise has mean 0 and to a conspecific call mean $d' = 2$, both with standard deviation 1. (a) If she approaches whenever the response exceeds $t = 1$, what are her hit and false-alarm rates? (b) What happens if she raises the threshold to $t = 1.5$? (c) Why might females in dense, noisy choruses be expected to have higher thresholds?
::: solution
(a) By [[#eq-sdt]], $P(\text{hit}) = 1 - \Phi(-1) = 0.841$ and $P(\text{false alarm}) = 1 - \Phi(1) = 0.159$.

(b) At $t = 1.5$, $P(\text{hit}) = 1 - \Phi(-0.5) = 0.691$ and $P(\text{false alarm}) = 1 - \Phi(1.5) = 0.067$. False alarms more than halve, at the price of missing almost a third of real calls.

(c) If heterospecific sounds are much more frequent than conspecific calls, most responses at a low threshold would be false alarms, each costing time and exposure to predators; a higher threshold then pays. Conversely, where mates are scarce, missing a male is costly and a low threshold pays. The optimal threshold changes with the base rate and the costs — the same logic as Bayes' theorem ([[behaviour/learning-cognition#ex-bayes]]).
:::
:::

::: widget plot
f: exp(-x^2/2)/sqrt(2*pi); exp(-(x - d)^2/2)/sqrt(2*pi)
x: -4, 6
y: 0, 0.45
sliders: d=2:0:4:0.1
labels: \text{noise only}; \text{signal present}
vlines: 1
caption: Signal detection. The two curves are the distributions of the receiver's internal response to noise alone and to a signal, separated by $d'$; the vertical line is a response threshold at $t = 1$. The area of the right-hand curve beyond the line is the hit rate (0.84 at $d' = 2$), the area of the left-hand curve beyond it the false-alarm rate (0.16). Increase $d$ — a louder or more distinctive signal — and the overlap shrinks, so both error rates can fall together.
:::

## Where signals come from

Signals evolve from behaviour or structures that were already informative. Niko Tinbergen and Julian Huxley called the process **ritualisation**: a movement that originally served another function — preparing to fly, attacking, preening, feeding — becomes exaggerated, stereotyped and often coupled with conspicuous colours, because receivers responded to it as a cue and selection on the actor then enhanced its effect. Many threat displays are recognisable intention movements of attack; many courtship displays incorporate movements from feeding or nest building. The comparative method shows the steps: in ducks, Konrad Lorenz traced displays across species from simple preening movements to elaborate, stereotyped ones.

Signals can also exploit pre-existing **sensory biases** of receivers — preferences that evolved in another context, such as finding food — as described for túngara frogs and swordtails in [[evolution/sexual-selection]]. In the water mite *Neumania papillator*, Heather Proctor (1991) found that males court by vibrating their legs at the frequency produced by the copepods on which females prey; hungry females were more likely to respond.

### Design for the environment

Signals must travel from sender to receiver, and the environment shapes their design. In forests, high frequencies are scattered by leaves and rapid repetitions are blurred by echoes; Eugene Morton (1975) found that birds of tropical forest tend to sing at lower frequencies and with purer, more tonal notes than birds of open habitats, a pattern known as the **acoustic adaptation hypothesis** (supported in many, but not all, later comparative studies). Urban noise, which is mostly low in frequency, is associated with higher-pitched song in some urban bird populations, such as great tits (Hans Slabbekoorn and Margriet Peet, 2003).

John Endler's **sensory drive** hypothesis (1992) links signals, sense organs and habitat in a single framework: the light or sound environment shapes the receivers' senses, which shape the signals that are most effective, which in turn shape mate choice and possibly speciation. In Lake Victoria cichlids of the genus *Pundamilia*, Ole Seehausen and colleagues (2008) found that males are blue in clear shallow water and red in deeper, red-shifted water, that the visual pigment gene *LWS* differs correspondingly between populations, and that females prefer the male colour that is most conspicuous in their light environment.

## The problem of honesty

When signaller and receiver share an interest — a bee recruiting nestmates to a food source, a parent warning its offspring — honest signalling poses no puzzle. But many signals pass between parties whose interests conflict. A male wants to be chosen whether or not he is a good mate; a rival wants to be believed strong whether or not he is; a chick wants more food than its parent would give. Why should receivers believe signals at all, and why should signallers not exaggerate? If they did, receivers would evolve to ignore them, and the signals would disappear. The persistence of signalling between parties with conflicting interests therefore requires that, on average, signals be reliable. There are several ways this can be achieved.

### Costly signals and handicaps

Amotz Zahavi's **handicap principle** (1975) proposed that signals are reliable because they are costly: only high-quality individuals can afford to produce them in full. The idea was long resisted, partly because verbal versions seemed to imply that any costly trait would do. Alan Grafen (1990) showed with a formal model that honest costly signalling can be evolutionarily stable, provided the cost of a given signal is higher for low-quality individuals — more precisely, that the *marginal* cost of signalling more, relative to the marginal benefit, is greater for them. Then each signaller does best by signalling at a level that reveals its quality.

::: proposition A simple model of honest costly signalling {#prop-handicap}
Signallers are of high or low quality. If a receiver treats a signaller as high quality, the signaller gains benefit $b$; otherwise it gains nothing. Producing the signal costs $c_H$ to a high-quality individual and $c_L$ to a low-quality one. If

$$
c_H < b < c_L,
$$ {#eq-separating}

then there is a stable **separating equilibrium**: high-quality individuals signal and low-quality ones do not, so the signal is honest and receivers do best to believe it. If $b > c_L$, low-quality individuals also gain by signalling, and the signal ceases to be informative. The key assumption is that the cost differs with quality; honesty is maintained by the difference in costs, not by the cost itself.
:::

::: example When does it pay to cheat? {#ex-handicap}
Male birds of high quality can grow a long tail at an energetic cost equivalent to 4 offspring; low-quality males would pay a cost of 12 offspring for the same tail. Females mate preferentially with long-tailed males, which gives a long-tailed male an extra 10 offspring on average. (a) Is the tail an honest signal? (b) What would happen if a change in the environment — more food, say — reduced the cost to low-quality males to 8?
::: solution
(a) For high-quality males, growing the tail yields $10 - 4 = 6 > 0$; for low-quality males, $10 - 12 = -2 < 0$. Condition [[#eq-separating]] holds: only high-quality males grow long tails, so tail length reliably indicates quality and females gain by preferring it.

(b) With $c_L = 8$, low-quality males gain $10 - 8 = 2$ by growing the tail too. All males now have long tails, the signal no longer distinguishes quality, and the benefit to females of the preference disappears. Over time we would expect either the preference to weaken (reducing $b$) or the signal to escalate to a level that is again too costly for low-quality males — a longer tail. This is one way in which honest signalling systems can drift towards greater exaggeration.
:::
:::

The same logic works when signals vary continuously. If the benefit of a signal of intensity $s$ is proportional to $s$ (receivers respond more to stronger signals) and the cost rises more steeply for lower-quality signallers, each signaller's optimal intensity increases with its quality, and the signal reveals quality.

::: widget plot
f: b*x - x^2; b*x - x^2/2
x: 0, 8
y: -2, 12
sliders: b=4:1:8:0.5
labels: \text{net benefit, low quality } (q=1); \text{net benefit, high quality } (q=2)
caption: Net payoff $bs - s^2/q$ of signalling at intensity $s$ for a low-quality ($q = 1$) and a high-quality ($q = 2$) signaller, when receivers' response is proportional to $s$ and the cost $s^2/q$ is steeper for low quality. Each curve peaks at $s^* = bq/2$: with $b = 4$ at $s = 2$ for low and $s = 4$ for high quality. A low-quality individual that mimicked the high-quality signal ($s = 4$) would earn 0 instead of 4. Change $b$ and both optima shift, but the high-quality optimum stays twice the low one — the signal remains honest.
:::

Evidence that signal costs differ with condition comes from experiments in which condition is manipulated. In many birds, carotenoid-based red and yellow plumage depends on diet and parasite load: Geoffrey Hill (1991) found that house finch males (*Haemorhous mexicanus*) with redder plumage were preferred by females and were better at feeding nestlings, and that the redness of moulted feathers depended on the carotenoids in the diet. Begging chicks offer a less obvious case: begging is energetically cheap, but loud begging attracts predators to the nest, a cost that may be large enough to keep begging honest about need.

### Indices

Some signals are reliable because they are physically impossible to fake. These **indices** are tied to the quality they reveal by the mechanics of their production, not by a cost. The deep croak of a large toad ([[behaviour/conflict-game-theory]]) is an index of body size, because larger males have larger vocal folds. In red deer, the spacing of formants (the resonant frequencies of the vocal tract) in a stag's roar depends on the length of the tract, which is related to body size; David Reby and Karen McComb (2003) showed that formant spacing predicts stag size and that stags respond to playbacks with lower formant spacing as if to larger rivals. Stags lower their larynx while roaring, lengthening the tract, which exaggerates apparent size — but only up to an anatomical limit, so the index remains reliable at the top of the range.

### Shared interests and relatedness

When signaller and receiver are related, or otherwise share interests, signals can be honest without being costly. John Maynard Smith's **Sir Philip Sidney game** (1991) models a needy individual who may signal its need to a relative holding a resource. With sufficient relatedness, cost-free or low-cost honest signalling can be stable because a signaller loses inclusive fitness ([[behaviour/cooperation]]) by extracting resources a relative needs more. The honeybee dance, alarm calls given in groups of relatives, and the recruitment signals of social insects are examples where shared interest underlies honesty.

### Social enforcement

Signals of dominance status — **badges of status** — can be cheap to produce and yet honest if cheaters are punished. In the paper wasp *Polistes dominula*, females have variable black facial markings that predict dominance. Elizabeth Tibbetts and James Dale (2004) painted the faces of some wasps to change their apparent status: wasps whose badges signalled higher status than their real fighting ability received more aggression from others than controls. The cost of the signal lies not in its production but in the challenges it invites, which only genuinely strong individuals can withstand.

::: warning "Animals signal to share information" and "signalling implies intention"
Signals do not evolve to inform others for their own or the group's good; they evolve because they benefit the signaller, and they persist because responding pays the receiver. Where interests diverge, signals are expected to be exactly as honest as costs, constraints or enforcement make them — and no more. It is also unnecessary to assume that signallers intend to inform or deceive, or that receivers understand meaning: a vervet's leopard alarm can be functionally referential (it reliably predicts a class of predator and elicits a fitting response) without the caller having a concept of "leopard" or intending to warn. Whether some animals do signal intentionally is an empirical question, studied with careful experiments on great apes and some birds.
:::

::: quiz
In a species of bird, males with larger black bibs win more contests. Bib size costs almost nothing to produce. Which observation would best support the idea that bibs are kept honest by social enforcement?
- [ ] Bib size is heritable
- [ ] Females prefer males with large bibs
- [x] Males whose bibs are experimentally enlarged receive more attacks from dominant males and lose more fights than controls
- [ ] Bib size increases with age
::: solution
Social enforcement predicts that a signal exaggerating status provokes challenges that cheaters cannot win. Experimentally enlarged bibs that attract more aggression, and fail to deliver victories, demonstrate the cost that keeps bibs honest. Heritability, female preference and age-dependence are consistent with many hypotheses and do not test enforcement. (House sparrow bibs are a classic study system, though results from bib manipulations have been mixed.)
:::
:::

## Deception

Honesty need not be perfect. Because receivers respond to signals that are usually reliable, occasional deception can pay — as long as it remains rare enough that responding still pays on average.

**Batesian mimicry**, named after Henry Walter Bates (1862), who described it in Amazonian butterflies, occurs when a palatable species resembles a toxic or dangerous model. Predators that have learned to avoid the model ([[behaviour/learning-cognition]]) avoid the mimic too. The protection is frequency-dependent: the more common the mimic relative to the model, the more often predators experience the colour pattern as edible, and the weaker their avoidance. **Müllerian mimicry** (Fritz Müller, 1878), in contrast, is resemblance between two defended species, which share the cost of educating predators — an honest signal shared across species.

::: example When should a predator attack a warning pattern? {#ex-mimic}
A bird encounters an insect with a warning pattern. A fraction $m$ of such insects are palatable mimics, worth $B = 1$ unit of energy; the rest are toxic models, whose consumption costs $C = 4$ units (the effects of the toxin). If the bird cannot distinguish them, when does attacking pay?
::: solution
The expected payoff of attacking is $mB - (1 - m)C = m - 4(1 - m) = 5m - 4$, positive when $m > 0.8$. As long as mimics form less than 80 % of insects with the pattern, the bird should avoid all of them, and the mimics are protected. If mimics become more common, attacking pays and the protection collapses. In general the threshold is $m > C/(B + C)$: mimics are protected at higher frequencies when the model is more toxic. This frequency dependence explains why Batesian mimics are often rarer than their models, and why some mimetic butterflies are polymorphic, with different morphs mimicking different models.
:::
:::

Deception also occurs within species and between predators and prey. Female fireflies of the genus *Photuris* respond to the courtship flashes of male *Photinus* fireflies with the flash pattern of a *Photinus* female, and eat the males that approach — **aggressive mimicry** described by James Lloyd in 1965. In the Kalahari, fork-tailed drongos (*Dicrurus adsimilis*) follow meerkats and other foragers and give genuine alarm calls when predators approach; but they also give false alarm calls when a meerkat has caught food, and take the food when the meerkat flees. Tom Flower and colleagues (2014) showed that drongos mimic the alarm calls of other species, including meerkats, and switch between call types when their targets stop responding to a repeated false alarm — exploiting the targets' habituation. The system is stable because drongos' alarms are usually genuine, so responding still pays the meerkats on average.

::: application Signals in pest control and conservation
Understanding signals has practical uses. Synthetic sex pheromones of moth pests are deployed to disrupt mating (flooding orchards so that males cannot find females) or to monitor populations with baited traps, an approach used against codling moth in apple orchards and many other crop pests. Bird-scaring with playback of distress calls exploits alarm signals, though habituation limits its effect. Conversely, anthropogenic noise and light pollution interfere with signals — masking song, disrupting firefly displays and moth sex-pheromone tracking — and are now part of conservation assessments.
:::

## The dance of the honeybee

The most remarkable signal known in a non-human animal is the honeybee waggle dance, decoded by Karl von Frisch in the 1940s. A forager returning from a rich food source to the hive performs a dance on the vertical comb in the dark: she runs straight ahead while waggling her abdomen, circles back to the start, and repeats, alternately to the left and right, producing a figure of eight. Other bees follow her, in contact with her body.

Von Frisch showed that the dance encodes the location of the food. The **direction** of the waggle run relative to vertically upward corresponds to the direction of the food relative to the sun's azimuth: a waggle run straight up means "fly towards the sun", one 60° to the right of vertical means "fly 60° to the right of the sun". The **duration** of the waggle run increases with the distance to the food, roughly linearly; the exact calibration differs among honeybee races and depends on the visual flow the bee experiences in flight. Bees following the dance then search near the indicated location, using the odour of the food carried by the dancer to identify it.

::: example Reading a dance {#ex-dance}
At a time of day when the sun's azimuth is 150° (south-south-east), a forager's waggle runs point 40° clockwise from vertically upward on the comb. In what compass direction is the food? An hour later the sun's azimuth has moved to 165°; how should a dancer reporting the same food source orient her runs?
::: solution
The angle of the waggle run from vertical equals the angle of the food's direction from the sun's azimuth, measured in the same sense. The food lies $150° + 40° = 190°$, a little west of south. An hour later, the food still lies at 190°, now $190° - 165° = 25°$ to the right of the sun: the dancer should orient her runs 25° clockwise from vertical. Dancing bees shift their angle as the sun moves, compensating with their internal clock ([[behaviour/mechanisms-of-behaviour]]) — the same time-compensated sun compass used in navigation ([[behaviour/migration-navigation]]).
:::
:::

Whether recruits really use the dance information was debated in the 1960s, when Adrian Wenner argued that odour alone could explain recruitment. James Gould (1975) resolved the issue elegantly by making dancers indicate a false location — he exploited the fact that bees dance by the direction of a bright light when one is present, and covered the dancers' ocelli so that they did not respond to the light while the followers did — and found that recruits flew to the place the dance indicated, not to where the dancer had fed. Joe Riley and colleagues (2005) later tracked recruits with harmonic radar and confirmed that they fly in the direction and to roughly the distance indicated, then search for the food by odour and sight.

The dance is honest because dancer and recruits share an interest: workers in a colony are sisters, and they gain inclusive fitness from the colony's success ([[behaviour/cooperation]]). The dance is also used in house hunting: when a swarm seeks a new nest cavity, scouts dance for the sites they have found, more vigorously for better sites, and the swarm reaches a decision when enough scouts are dancing for one site — a collective decision described by Thomas Seeley and colleagues.

::: history
Darwin's *The Expression of the Emotions in Man and Animals* (1872) treated displays as evolved characters, and Julian Huxley's study of great crested grebes (1914) introduced ritualisation. Von Frisch's decoding of the honeybee dance, from the 1940s, culminated in *Tanzsprache und Orientierung der Bienen* (1965; in English, 1967). Bates described mimicry in 1862 and Müller in 1878. The modern theory of signalling began with Zahavi's handicap principle (1975), Krebs and Dawkins's essay on manipulation and mind-reading (1984) and Grafen's formal models of honest signalling (1990); Maynard Smith and Harper's *Animal Signals* (2003) synthesised it. The vervet alarm-call playbacks of Seyfarth, Cheney and Marler (1980) opened the study of referential signals.
:::

::: summary
- A signal evolved because of its effect on receivers, whose response also evolved; a cue is information that did not evolve to inform.
- Receivers face a trade-off between hits and false alarms (signal detection theory); only more conspicuous signals or better senses improve both.
- Signals originate by ritualisation of informative movements and by exploitation of sensory biases; their design fits the transmission environment (acoustic adaptation, sensory drive).
- Between parties with conflicting interests, signals are reliable on average through costs that differ with quality (handicaps; honest when $c_H < b < c_L$), indices that cannot be faked, shared interest and relatedness, or social enforcement (badges of status).
- Deception persists at low frequency: Batesian mimics are protected while rare enough that predators still gain by avoidance ($m < C/(B + C)$); aggressive mimicry and false alarm calls exploit receivers' responses.
- The honeybee waggle dance encodes direction relative to the sun's azimuth and distance by waggle duration; experiments with misdirected dances and radar tracking confirm that recruits use it.
:::

## Exercises

::: exercise Signal or cue? {level=1}
Classify each: (a) the smell of a decaying carcass that attracts vultures; (b) the red belly of a breeding male stickleback; (c) the footsteps of a fox heard by a rabbit; (d) the bright warning colours of a poison frog.
::: solution
(a) Cue: the carcass has not evolved to attract vultures. (b) Signal: the colour evolved because of its effects on females and rival males. (c) Cue. (d) Signal: warning colours evolved because predators learn to avoid them, and predators' avoidance learning is an evolved response.
:::
:::

::: exercise Hits and false alarms {level=1 check="0.933"}
With $d' = 2$ in [[#prop-sdt]] and a threshold of $t = 0.5$, what is the hit rate (three decimal places)?
::: solution
$1 - \Phi(0.5 - 2) = 1 - \Phi(-1.5) = 0.933$. The false-alarm rate is $1 - \Phi(0.5) = 0.309$.
:::
:::

::: exercise Mimic threshold {level=1 check="0.75"}
In [[#ex-mimic]], if eating a model costs 3 units and a mimic is worth 1, above what fraction of mimics should a predator attack?
::: solution
$m > C/(B + C) = 3/4 = 0.75$.
:::
:::

::: exercise Reading a dance {level=2 check="290"}
The sun's azimuth is 230°. A forager's waggle runs point 60° clockwise from vertically upward. In what compass direction (degrees) is the food? Where would it be if the runs pointed 60° anticlockwise instead?
::: solution
A run to the right of vertical indicates food to the right of (clockwise from) the sun's azimuth: $230° + 60° = 290°$, roughly west-north-west. A run 60° anticlockwise would indicate $230° - 60° = 170°$.
:::
:::

::: exercise Honest or not? {level=2}
In a population, high-quality males pay a cost of 3 to produce a display, low-quality males a cost of 5, and a displaying male gains 4 through female preference. (a) Is the display honest? (b) Females evolve a stronger preference, raising the benefit to 6. What happens, and what might evolve next?
::: solution
(a) $c_H = 3 < b = 4 < c_L = 5$: only high-quality males display, so the display is honest. (b) With $b = 6 > c_L$, low-quality males also display, and the signal no longer distinguishes quality. Female preference for it no longer brings benefits, so selection on the preference weakens; alternatively, males may escalate the display until its cost to low-quality males again exceeds the benefit. Honest signalling requires that the benefit lie between the costs of the two types.
:::
:::

::: exercise Interpreting a playback {level=2}
Researchers play the recorded alarm calls of an individual vervet to its group. When the call is played, monkeys respond strongly. When the same individual's call has been played repeatedly with no predator present over the preceding days, the group's response to that individual's call declines, but its response to another individual's call of the same type does not. What does this show?
::: solution
The monkeys track the reliability of individual callers: they habituate to a particular caller's alarms when these prove unreliable, but do not generalise to other callers. This implies that they recognise individuals by voice and adjust their response to each according to experience, a form of the "receiver resistance" to manipulation expected when signals may be unreliable. Cheney and Seyfarth reported results of this kind for vervets in 1988.
:::
:::

::: exercise Badges of status {level=2}
Explain why a badge of status that costs nothing to produce could still be an honest signal. What experimental result would refute the social-enforcement explanation?
::: solution
The cost lies in the response of others: individuals whose badges signal higher status than their fighting ability are challenged more and lose, paying costs in injury or lost resources. Only individuals that can back up their badge benefit from displaying it. The explanation would be refuted if individuals with experimentally exaggerated badges were *not* challenged more often (or were challenged but not penalised), and gained the benefits of high status without being able to defend them; then nothing would stop cheating, and the badge would be expected to lose its information over evolutionary time.
:::
:::

::: exercise A detection threshold under different base rates {level=3}
A predator scans a field where prey are present in a fraction $\pi$ of scans. Its internal response follows [[#prop-sdt]] with $d' = 2$. Attacking a real prey gains 10, attacking when no prey is present costs 2 (wasted energy and exposure). For thresholds $t = 0.5$, $1$ and $1.5$, compute the expected gain per scan when $\pi = 0.1$ and when $\pi = 0.5$. Which threshold is best in each case?
::: solution
Expected gain per scan is $\pi\cdot10\cdot P(\text{hit}) - (1 - \pi)\cdot2\cdot P(\text{FA})$, using hit and false-alarm rates $0.933, 0.309$ ($t = 0.5$), $0.841, 0.159$ ($t = 1$) and $0.691, 0.067$ ($t = 1.5$).

$\pi = 0.1$: $t = 0.5$: $0.933 - 1.8\times0.309 = 0.377$; $t = 1$: $0.841 - 1.8\times0.159 = 0.555$; $t = 1.5$: $0.691 - 1.8\times0.067 = 0.571$. The highest threshold is best.

$\pi = 0.5$: $t = 0.5$: $5\times0.933 - 0.309 = 4.36$; $t = 1$: $4.21 - 0.16 = 4.05$; $t = 1.5$: $3.46 - 0.07 = 3.39$. The lowest threshold is best.

When prey are rare, most responses at a low threshold are false alarms, so a conservative threshold pays; when prey are common, missing them costs more than occasional false alarms. Receivers' thresholds should therefore track base rates — and signallers that are rare (such as Batesian mimics) gain from receivers' conservatism.
:::
:::

::: exercise Mimicry and frequency {level=3}
A Batesian mimic is protected as long as it is less than 80 % of the insects bearing the warning pattern ([[#ex-mimic]]). Explain why selection on mimics might nonetheless keep them much rarer than that threshold, and why some mimetic species are polymorphic, each morph resembling a different model.
::: solution
The threshold assumes a predator with perfect knowledge of frequencies and a single decision; real predators learn from experience, and their avoidance weakens gradually as they encounter more palatable insects with the pattern. Each additional mimic therefore slightly reduces the protection of all mimics (and models) — frequency-dependent selection against common mimics, long before the threshold. A mimic that resembles a different, less exploited model escapes this cost, so rare morphs mimicking other models are favoured; this negative frequency dependence can maintain a polymorphism, as in the African mocker swallowtail *Papilio dardanus*, whose females mimic several different distasteful species.
:::
:::
