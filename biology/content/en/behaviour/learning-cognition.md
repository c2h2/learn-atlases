Monarch butterflies (*Danaus plexippus*) that feed as caterpillars on certain milkweeds store cardiac glycosides, toxins that make vertebrates vomit. In the 1960s Lincoln Brower and colleagues offered such monarchs to captive blue jays (*Cyanocitta cristata*) that had never seen one. A jay would seize the butterfly, eat it, and some minutes later vomit violently. Afterwards it refused monarchs on sight, often after a single experience — and it also refused viceroys and other butterflies that resembled them. One unpleasant meal changed the jay's behaviour for a long time, and changed it in a precisely targeted way: the bird avoided orange-and-black butterflies, not the cage, the experimenter or the time of day.

This chapter is about how experience changes behaviour. We start with the simplest forms of learning — habituation and sensitisation — and with imprinting, then treat the two great forms of associative learning, classical and operant conditioning, with the Rescorla–Wagner model and the matching law as their quantitative core. The jay's selective aversion leads to the biological constraints on learning, and to the idea that learning abilities are adaptations to particular ecological problems, as in food-storing birds. We then turn to social learning and animal traditions, to the study of cognition — tool use, memory, self-recognition — and to the question of when selection should favour learning at all. The mechanisms of plasticity in neurons are in [[neuroscience/plasticity-learning]]; the developmental background is in [[behaviour/mechanisms-of-behaviour]].

## What learning is

::: definition Learning {#def-learning}
**Learning** is a relatively lasting change in behaviour (or in the capacity for behaviour) that results from specific experience, excluding changes due to maturation, injury, fatigue or sensory adaptation. **Non-associative** learning changes the response to a single kind of stimulus with repeated exposure: **habituation** is a decline in response to a repeated stimulus that has no significant consequence; **sensitisation** is an increase in response after a strong or noxious stimulus. **Associative** learning links events: in **classical (Pavlovian) conditioning** a neutral stimulus comes to predict a biologically significant one; in **operant (instrumental) conditioning** a behaviour becomes more or less frequent according to its consequences.
:::

Habituation is the most widespread form of learning, found in every animal tested, and it is adaptive in an obvious way: an animal that kept fleeing from waving grass would never feed. It is distinguished from fatigue or sensory adaptation by two tests. The decline is **stimulus-specific** (a prairie dog habituated to people walking past still responds to a dog), and it shows **dishabituation**: a novel or strong stimulus restores the response to the original stimulus, which would not happen if the receptors or muscles were simply exhausted. In the sea hare *Aplysia californica*, Eric Kandel and colleagues traced habituation and sensitisation of the gill-withdrawal reflex to changes in transmitter release at identified synapses between sensory and motor neurons — work for which Kandel shared the 2000 Nobel Prize in Physiology or Medicine.

::: application Habituation in conservation and tourism
Animals in protected areas habituate to vehicles, boats and tourists, which allows observation but can also make them vulnerable to poachers or to collisions, and can mask chronic stress. Conversely, attempts to scare animals away from crops, airports or wind turbines with repeated noises usually fail after a few days because the animals habituate; deterrents work longer when they are varied, unpredictable, or paired with a real consequence (turning a neutral stimulus into a conditioned one).
:::

### Imprinting

Konrad Lorenz's goslings, which followed him as if he were their mother, made imprinting famous. In **filial imprinting** a young animal of a species with precocial young (geese, ducks, chickens) learns the features of an object it encounters shortly after hatching and thereafter follows it and seeks to stay near it. In **sexual imprinting**, experience early in life influences the kind of individual an animal later prefers as a mate.

Lorenz described imprinting (1935) as occurring during a sharply bounded **critical period** and as irreversible. Later work softened both claims. The **sensitive period** for filial imprinting in mallard ducklings (*Anas platyrhynchos*) peaks within the first day or so after hatching, but its end is set partly by the imprinting process itself: once a chick has formed an attachment, it avoids novel objects, which limits further imprinting. Isolated chicks can imprint later than socially reared ones. Klaus Immelmann (1972) cross-fostered zebra finch (*Taeniopygia guttata*) males to Bengalese finch foster parents; as adults they courted Bengalese finch females in preference to their own species, even after a period with conspecifics — sexual imprinting can be very stable.

Imprinting is learning with a strong predisposition: the young bird is prepared to learn about one category of thing at one time of life, and a natural mother is a far more effective stimulus than a box or a biologist. Patrick Bateson argued that sexual imprinting allows animals to choose mates that are similar to, but not identical with, their parents and siblings — an optimal outbreeding that avoids both inbreeding and mating with too different a partner. Japanese quail given the choice preferred first cousins to siblings or unrelated birds (Bateson, 1982).

## Classical conditioning

Ivan Pavlov, studying salivary secretion in dogs at the beginning of the twentieth century, found that dogs began to salivate in response to stimuli that regularly preceded food. In his terminology, an **unconditioned stimulus** (US, food) elicits an **unconditioned response** (UR, salivation); after pairings, a previously neutral **conditioned stimulus** (CS, a sound) comes to elicit a **conditioned response** (CR). If the CS is then presented repeatedly without the US, the CR declines — **extinction** — but extinction is not forgetting: the response can return after a rest (spontaneous recovery) or in a new context.

Conditioning is not mere pairing. Leon Kamin (1969) trained rats with a noise (CS A) followed by a mild shock, until the noise suppressed their lever-pressing. He then presented the noise together with a light (CS X) followed by the same shock. Tested alone, the light produced almost no conditioned response, although it had been paired with shock many times. Control rats that had experienced only the compound trials responded to the light strongly. Prior learning about the noise **blocked** learning about the light. Animals learn, it seems, only when the US is *surprising* — when it is not already predicted.

Robert Rescorla and Allan Wagner (1972) turned this insight into a model.

::: proposition The Rescorla–Wagner model {#prop-rw}
Let $V_i$ be the associative strength of conditioned stimulus $i$, and let $\lambda$ be the maximum associative strength the US can support ($\lambda = 0$ if the US is absent). On each trial, the strength of every CS present changes by

$$
\Delta V_i = \alpha_i\beta\,\Bigl(\lambda - \sum_{j\ \text{present}} V_j\Bigr),
$$ {#eq-rw}

where $\alpha_i$ and $\beta$ (between 0 and 1) are learning-rate parameters for the CS and the US. The term in brackets is the **prediction error**: the difference between what happened and what was predicted by all the stimuli present. For a single CS starting at $V_0 = 0$ with constant $\alpha\beta = c$, the strength after $n$ trials is

$$
V_n = \lambda\bigl(1 - (1 - c)^n\bigr).
$$ {#eq-rw-curve}
:::

::: proof
With one CS, [[#eq-rw]] gives $V_{n+1} = V_n + c(\lambda - V_n)$, so $\lambda - V_{n+1} = (1 - c)(\lambda - V_n)$. The distance from the asymptote shrinks by the factor $1-c$ each trial; starting from $\lambda - V_0 = \lambda$, after $n$ trials it is $\lambda(1-c)^n$, which gives [[#eq-rw-curve]]. During extinction, with $\lambda = 0$, the same argument gives $V_n = V_0(1 - c)^n$.
:::

The model is a rule for learning from prediction errors — the same principle as the "delta rule" in machine learning and the temporal-difference learning signalled by dopamine neurons in the mammalian brain (Wolfram Schultz and colleagues, 1997). It explains blocking directly: once $V_A \approx \lambda$, the prediction error on compound trials is near zero, so X gains almost nothing.

::: example Acquisition and blocking {#ex-rw}
Let $\lambda = 1$ and $c = \alpha\beta = 0.3$ for every CS. (a) What is $V$ after three pairings of a single CS with the US? How many pairings are needed before $V$ exceeds 0.9? (b) In a blocking design, CS A is first trained to $V_A = 0.95$; then A and X are presented together with the US. How much does X gain on the first compound trial, and what is its final strength? Compare with a control group given only compound trials from the start.
::: solution
(a) By [[#eq-rw-curve]], $V_3 = 1 - 0.7^3 = 1 - 0.343 = 0.657$. We need $0.7^n < 0.1$, that is $n > \ln 0.1/\ln 0.7 = 6.46$, so 7 pairings.

(b) On the first compound trial the prediction error is $1 - (0.95 + 0) = 0.05$, so $\Delta V_X = 0.3\times0.05 = 0.015$. A and X gain equally on every subsequent trial, and learning stops when $V_A + V_X = 1$; X ends with half of the remaining 0.05, that is $V_X = 0.025$. In the control group both start at zero, gain equally and end at $V_A = V_X = 0.5$. The light is blocked: its final strength is one-twentieth of the control.
:::
:::

::: widget plot
f: 1 - (1 - c)^x; v*(1 - c)^x
x: 0, 20
y: 0, 1.05
sliders: c=0.3:0.05:0.9:0.05; v=1:0:1:0.05
labels: \text{acquisition } V_n; \text{extinction from } V_0 = v
caption: Rescorla–Wagner learning curves [[#eq-rw-curve]] against trial number. The rising curve is acquisition with $\lambda = 1$; the falling curve is extinction with $\lambda = 0$ from a starting strength $v$. Increase $c = \alpha\beta$ (a salient CS, an intense US) to see learning saturate within a few trials — as in the jays' one-trial aversion — or decrease it to see slow, gradual learning. Each curve is negatively accelerated: the largest change comes on the first trial, when the surprise is greatest.
:::

The Rescorla–Wagner model is not the whole story — it does not predict, for example, that pre-exposure to a CS without consequences slows later conditioning to it (**latent inhibition**), and it treats extinction as unlearning, which spontaneous recovery contradicts — but it remains the reference point for models of associative learning.

## Operant conditioning

Edward Thorndike (1898) put hungry cats in puzzle boxes from which they could escape to food by pulling a loop or pressing a lever. Their escape times fell gradually over trials, which Thorndike summarised as the **law of effect**: responses followed by satisfying consequences become more likely. B. F. Skinner later studied operant behaviour in rats and pigeons pressing levers or pecking keys, with rewards (reinforcers) delivered according to **schedules** — after a fixed or variable number of responses (ratio schedules) or after a fixed or variable time (interval schedules). Variable schedules produce steady responding that is very resistant to extinction, because the absence of a reward is less surprising.

When an animal can choose between two alternatives, each rewarded on its own variable-interval schedule, a striking regularity appears.

::: proposition The matching law {#prop-matching}
Richard Herrnstein (1961) found that pigeons choosing between two keys distributed their pecks so that the proportion of responses to each matched the proportion of reinforcers obtained from it:

$$
\frac{B_1}{B_1 + B_2} = \frac{R_1}{R_1 + R_2},
$$ {#eq-matching}

where $B_i$ is the rate of responding and $R_i$ the rate of reinforcement on alternative $i$. This is an empirical regularity, not a derived result. Real data often deviate systematically (**undermatching**, preferences less extreme than predicted, is common), which the generalised form $B_1/B_2 = b\,(R_1/R_2)^s$ describes with a bias $b$ and a sensitivity $s$.
:::

::: example Matching on two schedules {#ex-matching}
A pigeon pecks about 1500 times an hour. One key delivers food on average 40 times an hour, the other 20 times an hour, each on a variable-interval schedule (food becomes available at random times, and waits until the next peck). How should the pigeon distribute its pecks according to the matching law? Why is matching close to optimal on such schedules?
::: solution
Matching predicts a proportion $40/(40 + 20) = 2/3$ of pecks to the richer key, about 1000 pecks per hour on it and 500 on the other. On variable-interval schedules, food on the leaner key accumulates while the bird is pecking the richer one, so occasional visits to the lean key are rewarded with high probability; spending all its time on the rich key would forgo those rewards. Over a broad range of allocations the total food obtained hardly changes, and matching lies close to the maximum. Matching on concurrent schedules was one starting point for the idea that learning rules can approximate optimal foraging ([[behaviour/foraging]]).
:::
:::

## Biological constraints and adaptive specialisations

Early learning theory assumed that any detectable stimulus could be associated equally well with any consequence, and any response reinforced by any reward. The blue jays and monarchs suggest otherwise, and an experiment published in 1966 made the point decisively.

John Garcia and Robert Koelling gave thirsty rats water that was both flavoured and accompanied by flashes of light and clicks ("bright, noisy, tasty water"). For some rats, drinking was followed by illness (induced by X-irradiation or a toxin); for others, by an electric shock to the feet. In later tests, rats made ill avoided the *taste* but not the light and sound; rats shocked avoided the *light and sound* but not the taste. Taste is readily associated with illness, and audiovisual cues with pain, but not the other way round. Taste aversions also form with delays of hours between food and illness, which classical conditioning theory had thought impossible.

::: warning "Learning is general-purpose"
The idea that animals are equally capable of learning anything — so that a rat's learning in a lever box tells us about learning in general — was abandoned in the 1960s and 1970s. Learning is constrained by what the animal is **prepared** to associate, and these predispositions fit its ecology. Rats, which eat many foods and cannot vomit, learn taste aversions very readily; quail, which choose food by sight, learn aversions to coloured water readily. Keller and Marian Breland, who trained animals commercially, described in 1961 how raccoons trained to drop coins into a box began "washing" the coins instead, and pigs began rooting them — instinctive food-handling behaviour intruding on the trained response ("The misbehavior of organisms"). Learning operates within an evolved architecture.
:::

### Spatial memory in food-storing birds

If learning abilities are adaptations, species facing harder learning problems should be better at them. Food-storing birds provide the clearest test. A Clark's nutcracker (*Nucifraga columbiana*) may cache tens of thousands of pine seeds in an autumn, in thousands of separate caches, and recover many of them months later, under snow, using landmarks. Marsh tits and black-capped chickadees store seeds for days to weeks. In laboratory tests of spatial memory, nutcrackers outperform related corvids that store less (Alan Kamil, Russell Balda and colleagues). And John Krebs, David Sherry and colleagues (1989) found that, across passerine families, food-storing species have a larger hippocampus — a brain region involved in spatial memory — relative to brain and body size than non-storing species, a comparison made with phylogenetic controls ([[behaviour/studying-behaviour#def-nonindep]]).

## Social learning and traditions

Animals also learn from one another, and this can spread new behaviour through a population far faster than genetic change.

::: definition Mechanisms of social learning {#def-social}
**Social learning** is learning influenced by observation of, or interaction with, another animal or its products. Its main mechanisms, in rough order of cognitive demand:
- **local enhancement** — the presence of others draws an animal to a place, where it learns for itself;
- **stimulus enhancement** — others draw its attention to an object;
- **observational conditioning** — it learns an association (for example, that a predator is dangerous) from another's reaction;
- **emulation** — it learns the result an action achieves and reproduces the result by its own means;
- **imitation** — it copies the form of the action itself.

**Teaching** occurs when an individual modifies its behaviour in the presence of a naive one, at some cost to itself, in a way that helps the naive individual learn (Tim Caro and Marc Hauser's 1992 definition).
:::

A famous case of spreading behaviour is the opening of milk bottles by blue tits (*Cyanistes caeruleus*) in Britain, first reported in Southampton in 1921 and documented across the country by James Fisher and Robert Hinde in 1949. The pattern of spread — new local outbreaks far apart, then local diffusion — suggested independent invention and social spread, probably through local or stimulus enhancement rather than imitation.

The decisive experiment on social learning in the wild came much later. Lucy Aplin, Ben Sheldon and colleagues (2015) trained a few great tits in each of several sub-populations in Wytham Woods to open a puzzle box by sliding a door either to the left or to the right. The trained technique spread through each sub-population along its social network, and birds conformed to the locally common technique even though both worked equally well; the local traditions persisted into the following year, after many of the original birds had died. In mammals, Alex Thornton and Katherine McAuliffe (2006) showed that meerkat (*Suricata suricatta*) helpers teach pups to handle scorpions: they give young pups dead or disabled scorpions, and intact ones to older pups, and pups given disabled scorpions experimentally improved their handling faster.

Social and individual learning leave different signatures as a new behaviour spreads.

::: proposition Diffusion curves {#prop-diffusion}
In a group of $T$ individuals, let $N(t)$ be the number that have acquired a behaviour. If each naive individual learns it independently at a constant rate $a$ (asocial learning),

$$
N(t) = T\bigl(1 - e^{-at}\bigr),
$$

which rises fastest at the start. If naive individuals learn only from those who know it, at a rate proportional to the fraction informed, $\dfrac{dN}{dt} = s\,N\,\dfrac{T - N}{T}$, giving the logistic

$$
N(t) = \frac{T}{1 + \bigl(T/N_0 - 1\bigr)e^{-st}},
$$ {#eq-logistic-diffusion}

an S-shaped curve with a slow start. Assumptions: a well-mixed group, constant rates, no forgetting. Real diffusions mix the two, and modern **network-based diffusion analysis** tests whether acquisition follows social network connections, which is more reliable than judging the curve's shape.
:::

::: widget plot
f: 100*(1 - exp(-a*x)); 100/(1 + 99*exp(-s*x))
x: 0, 30
y: 0, 105
sliders: a=0.07:0.01:0.3:0.01; s=0.5:0.1:1.5:0.05
labels: \text{asocial learning}; \text{social learning from } N_0 = 1
caption: Number of a group of 100 animals that have acquired a new behaviour against time in days. Asocial learning at rate $a$ gives a decelerating curve; social transmission from a single innovator at rate $s$ gives an S-shaped curve. With the starting values both reach 50 at about 9–10 days, yet their shapes differ sharply. Vary $a$ and $s$ to see that the time to reach half the group does not distinguish the mechanisms — the shape does, if the assumptions hold.
:::

::: example Time to half the group {#ex-diffusion}
In a group of 100, one animal invents a behaviour. (a) If it spreads only socially with $s = 0.5$ per day, when have 50 animals acquired it? (b) If instead every animal learns asocially at rate $a = 0.07$ per day, when have 50 acquired it?
::: solution
(a) From [[#eq-logistic-diffusion]] with $N_0 = 1$, $N = 50$ when $99e^{-0.5t} = 1$, so $t = \ln 99/0.5 = 9.19$ days. (b) $1 - e^{-0.07t} = 0.5$ gives $t = \ln 2/0.07 = 9.90$ days. The two mechanisms reach the halfway point at almost the same time, so that alone cannot tell them apart; the shape of the curve and, better, whether acquisition follows social connections can.
:::
:::

Some animal populations differ in many behaviours in ways that are not explained by genes or ecology. Andrew Whiten and colleagues (1999) compiled observations from seven long-term chimpanzee (*Pan troglodytes*) study sites and identified 39 behaviour patterns — nut-cracking with stones, termite fishing, leaf-clipping displays — that were customary at some sites and absent at others where the ecology would allow them. Such **traditions** are the basis of claims of animal culture. Whether they involve the high-fidelity imitation that allows human culture to accumulate improvements over generations is debated; most evidence suggests that cumulative culture is rare or weak in other animals.

## Animal cognition

**Cognition** refers to the mechanisms by which animals acquire, process, store and act on information — perception, learning, memory and decision-making. The study of animal cognition asks what animals can represent and compute, and how it evolved. It has a methodological rule older than any of its findings.

::: definition Morgan's canon {#def-morgan}
"In no case may we interpret an action as the outcome of the exercise of a higher psychical faculty, if it can be interpreted as the outcome of the exercise of one which stands lower in the psychological scale" (C. Lloyd Morgan, *An Introduction to Comparative Psychology*, 1894). In modern terms: prefer the simplest mechanism that accounts for the data, and design experiments that distinguish simple from complex explanations.
:::

Three lines of research illustrate the method.

**Tool use and problem solving.** New Caledonian crows (*Corvus moneduloides*) make and use tools from twigs and leaves to extract insects from crevices (Gavin Hunt, 1996). In a laboratory study by Alex Weir, Jackie Chappell and Alex Kacelnik (2002), a female crow named Betty, given a straight piece of wire and a bucket of food in a tube, bent the wire into a hook and used it to lift the bucket. The result is famous, but its interpretation is cautious: later observations suggested that these crows bend and shape plant material in the wild, so the behaviour may draw on an existing repertoire rather than insight from scratch.

**Episodic-like memory.** Humans remember specific past events — what happened, where and when. Nicola Clayton and Anthony Dickinson (1998) let western scrub jays (*Aphelocoma californica*) cache wax-moth larvae, which they prefer but which decay, and peanuts, which keep. When allowed to recover their caches after 4 hours, the jays searched first where they had cached larvae; after 124 hours, when larvae had (in training) become inedible, they searched for peanuts instead. The jays' behaviour required information about what was cached where and how long ago. Because we cannot know whether a jay consciously "re-experiences" the past, the authors called it episodic-*like* memory, a careful use of Morgan's canon.

**Self-recognition.** Gordon Gallup (1970) let chimpanzees become familiar with a mirror, then, under anaesthesia, marked their brow with odourless dye visible only in the mirror. On waking, they touched the mark while looking in the mirror; monkeys did not. Mirror self-recognition has since been reported in great apes, possibly elephants, dolphins and magpies, and, controversially, in a fish, the cleaner wrasse (*Labroides dimidiatus*; Masanori Kohda and colleagues, 2019). The fish result divided researchers: either the mark test is less demanding than believed, or the capacities it reveals are more widespread. Either way, what the test measures is a matter of debate.

::: warning Anthropomorphism and its opposite
Attributing human thoughts to animals on the basis of superficial similarity (anthropomorphism) has misled many observers — Clever Hans "counted" ([[behaviour/studying-behaviour]]). But refusing to consider that animals might share cognitive capacities with us, when the evidence supports it, is also an error (Frans de Waal called it "anthropodenial"). A related mistake is to arrange species on a single ladder of intelligence with humans at the top. Cognitive abilities are specialised: a nutcracker's spatial memory exceeds a human's in its domain, and bees navigate by a polarised-light compass we lack. The productive question is not "how clever is this species?" but "what information does this animal use, and how, to solve the problems its ecology poses?"
:::

::: quiz
A dog is shown food hidden under one of two cups. When a person then points at the correct cup, the dog chooses it more often than chance. Which of the following, if found, would most undermine the claim that the dog understands the person's intention to inform it?
- [ ] Puppies with little contact with people also follow pointing
- [x] The dog chooses the correct cup just as often when the person points at it while looking away and not attending to the dog
- [ ] Wolves raised by people also follow pointing to some extent
- [ ] The dog chooses the correct cup above chance on the first trial
::: solution
If the dog follows the arm regardless of the person's attention, a simpler mechanism — stimulus enhancement by the moving arm, or a learned association between the arm and food — explains the result without attributing an understanding of intention. The other findings bear on how the ability develops (puppies, hand-reared wolves) or rule out trial-by-trial learning within the test, but do not distinguish the simple from the complex interpretation. This is Morgan's canon applied.
:::
:::

## When should learning evolve?

Learning is costly: it needs neural tissue, takes time, and involves mistakes while the animal learns. A fixed response, specified by genes, is cheaper and immediately correct — if the world is predictable. David Stephens (1991) analysed when learning pays, and the answer depends on two kinds of predictability. If the environment is the same across generations, a fixed response encoded in the genome is best. If it changes so fast within a lifetime that past experience is useless, learning is useless too. Learning is favoured at an intermediate state: the best behaviour varies between generations (so genes cannot track it) but is stable enough within a lifetime that experience predicts the future.

A learning animal faces a statistical problem: how to estimate the state of the world from limited experience. Bayesian updating is the normative solution, and many learning rules approximate it.

::: example Learning the quality of a patch {#ex-bayes}
A bird starts with no information about the probability $\theta$ that a search in a new patch finds food: its prior is uniform, a beta distribution $\mathrm{Beta}(1, 1)$. It searches 10 times and finds food 6 times. What is its posterior distribution for $\theta$, and the posterior mean?
::: solution
With a beta prior $\mathrm{Beta}(a, b)$ and $k$ successes in $n$ trials, the posterior is $\mathrm{Beta}(a + k, b + n - k)$ (the beta is conjugate to the binomial). Here the posterior is $\mathrm{Beta}(7, 5)$, with mean $7/12 = 0.583$. The estimate is pulled slightly from the raw frequency $0.6$ towards the prior mean $0.5$, and it remains uncertain after only ten searches. A forager deciding whether to stay should weigh not only the estimate but its uncertainty — it may pay to sample a little longer before leaving, or to sample other patches occasionally (the trade-off between exploitation and exploration).
:::
:::

::: widget bayes
mode: beta
a: 1
b: 1
successes: 6
trials: 10
caption: Bayesian learning of patch quality, as in [[#ex-bayes]]: the uniform prior for the success probability is updated to the $\mathrm{Beta}(7,5)$ posterior after 6 finds in 10 searches. Increase the number of trials at the same success rate to see the posterior narrow; start from an informative prior (larger $a$ and $b$) to see how experience overcomes prior expectation more slowly.
:::

::: history
Darwin's student George Romanes collected anecdotes of animal intelligence (1882); Lloyd Morgan's canon (1894) was a reaction against them. Thorndike's puzzle boxes (1898) and Pavlov's conditioning studies began experimental work on learning, and Skinner's operant methods dominated psychology in the mid-twentieth century. Ethologists meanwhile studied imprinting (Lorenz, 1935) and song learning (William Thorpe and Peter Marler in the 1950s–1970s). The two traditions met in the 1960s and 1970s, when Garcia and Koelling (1966) and others showed that learning is biologically constrained, and Kamin (1969) and Rescorla and Wagner (1972) reframed conditioning as learning from prediction errors. The modern field of comparative cognition grew from the 1980s onwards, combining laboratory experiments with field studies and phylogenetic comparison.
:::

::: summary
- Learning is a lasting change in behaviour due to experience. Habituation is stimulus-specific and shows dishabituation; sensitisation increases responses.
- Imprinting is learning with a strong predisposition, during a sensitive period whose end depends partly on the learning itself; sexual imprinting shapes later mate choice.
- In classical conditioning a CS comes to predict a US. The Rescorla–Wagner rule $\Delta V = \alpha\beta(\lambda - \sum V)$ learns from prediction errors, gives negatively accelerated curves $V_n = \lambda(1 - (1 - c)^n)$, and explains blocking.
- In operant conditioning consequences change response rates; with concurrent schedules, response proportions approximately match reinforcement proportions (the matching law).
- Learning is constrained and specialised: taste–illness associations (Garcia and Koelling), instinctive drift, spatial memory and hippocampal size in food-storing birds.
- Social learning ranges from local enhancement to imitation and teaching; traditions spread along social networks (great tits) and differ among populations (chimpanzees).
- Claims about cognition are tested by designing experiments that rule out simpler explanations (Morgan's canon): tool making, episodic-like memory, mirror self-recognition.
- Learning evolves when the best behaviour varies between generations but is predictable within a lifetime; Bayesian updating describes optimal learning from limited experience.
:::

## Exercises

::: exercise Habituation or fatigue? {level=1}
A snail withdraws into its shell when tapped. After 20 taps at one-minute intervals it no longer withdraws. Describe two tests that would show whether this is habituation rather than muscular fatigue or sensory adaptation.
::: solution
(1) Stimulus specificity: apply a different stimulus (for example, a touch at another site or a drop of water). If the snail withdraws, the effector is not fatigued. (2) Dishabituation: give a strong novel stimulus, then the original tap. If withdrawal to the tap is restored, the decline was not due to exhausted receptors or muscles. Spontaneous recovery after a rest is consistent with both habituation and fatigue, so it is less diagnostic.
:::
:::

::: exercise A Rescorla–Wagner curve {level=1 check="0.672"}
With $\lambda = 1$ and $c = 0.2$, what is the associative strength after five conditioning trials, starting from zero (three decimal places)?
::: solution
$V_5 = 1 - 0.8^5 = 1 - 0.328 = 0.672$.
:::
:::

::: exercise Matching {level=1 check="0.25"}
A rat receives 15 reinforcers an hour from lever 1 and 45 from lever 2, on concurrent variable-interval schedules. What proportion of its presses should go to lever 1 under strict matching?
::: solution
$15/(15 + 45) = 0.25$.
:::
:::

::: exercise Extinction {level=2 check="0.343"}
A CS with $V = 1$ is presented repeatedly without the US, with $c = 0.3$. What is its strength after three extinction trials according to the Rescorla–Wagner model? Name one finding that shows extinction is not simply the reverse of acquisition.
::: solution
With $\lambda = 0$, $V_3 = (1 - 0.3)^3 = 0.343$. But after extinction, the CR can return after a delay (spontaneous recovery), when the animal is tested in a different context (renewal), or after an unsignalled US (reinstatement). These show that extinction involves new learning that suppresses the response rather than erasure of the original association, which the model does not capture.
:::
:::

::: exercise Overshadowing {level=2}
Two stimuli, a loud tone A ($\alpha_A = 0.5$) and a dim light X ($\alpha_X = 0.1$), are always presented together followed by the US, with $\beta = 1$ and $\lambda = 1$. Using [[#eq-rw]], find the final strengths of A and X. What does the model predict happens to a weak CS conditioned in compound with a strong one?
::: solution
Each trial both change by $\alpha_i(1 - V_A - V_X)$, so $\Delta V_A/\Delta V_X = 0.5/0.1 = 5$ throughout, and $V_A = 5V_X$. Learning stops when $V_A + V_X = 1$, so $V_X = 1/6 \approx 0.17$ and $V_A = 5/6 \approx 0.83$. The salient stimulus overshadows the weak one, which would have reached 1 if conditioned alone. Overshadowing is observed experimentally, as the model predicts.
:::
:::

::: exercise Posterior after experience {level=2 check="5/7"}
A forager with a $\mathrm{Beta}(2, 2)$ prior for the success rate of a patch finds food in 8 of 10 searches. What is its posterior mean?
::: solution
The posterior is $\mathrm{Beta}(2 + 8, 2 + 2) = \mathrm{Beta}(10, 4)$, with mean $10/14 = 5/7 \approx 0.714$, a little below the raw frequency 0.8 because the prior pulls towards 0.5.
:::
:::

::: exercise Interpreting a taste-aversion experiment {level=2}
Quail and rats are given blue, sour water and then made mildly ill. Afterwards, quail avoid blue water more strongly than sour water; rats avoid sour water more strongly than blue water. What does this show, and how might it relate to the ecology of the two species?
::: solution
The cue that is most readily associated with illness differs between species: colour for quail, taste for rats. Learning is prepared by the species' ecology — quail, as diurnal birds, identify food largely by sight, whereas rats, nocturnal foragers, rely more on taste and smell (Hardy Wilcoxon and colleagues reported this contrast in 1971). It argues against general-purpose learning and for adaptive specialisation of what is associated with what.
:::
:::

::: exercise A diffusion experiment {level=3}
A novel foraging technique is seeded in one bird in each of two populations. In population A, birds that acquire it are, on average, more closely connected in the association network to earlier acquirers than expected by chance; in population B, the order of acquisition is unrelated to network position, and the cumulative number of acquirers rises steeply from the start. Interpret the two patterns, and explain why the shape of the diffusion curve alone is weak evidence.
::: solution
Population A shows network-based transmission: acquisition follows social connections, the signature of social learning. Population B suggests asocial learning (birds discovering the technique independently) — the decelerating curve and the lack of network effect agree. Curve shape alone is weak evidence because an S-shape can arise without social learning (if individuals differ in their asocial learning rates, or if the opportunity to learn increases over time, for instance as birds discover the feeder), and social learning in a heterogeneous network need not give a clear S-shape. Network-based diffusion analysis tests the specific prediction of social transmission — that it follows the network — which is why it is preferred.
:::
:::

::: exercise When to learn {level=3}
Consider three species: (a) a parasitoid wasp whose single host species occurs on the same plant in every generation; (b) a bird whose best food changes from year to year but stays the same for months; (c) a nectar-feeding insect in a habitat where the most rewarding flower species changes every few minutes, unpredictably. Predict, for each, whether a fixed preference or learning should be favoured, and justify your answers with Stephens's argument.
::: solution
(a) Fixed preference: the right answer is the same in every generation, so a genetically specified response is cheaper and immediately correct. (b) Learning: the best food differs between generations, so genes cannot track it, but it is stable within the bird's life, so experience predicts the near future. (c) Neither strong learning nor a fixed preference for a particular flower; if rewards are unpredictable on the time scale of learning, past experience is of little use, and a generalist strategy (visiting flowers in proportion to availability, or a very short memory) should be favoured. Real parasitoids, incidentally, often do learn host-associated odours, which suggests that their hosts' plants vary more than case (a) assumes.
:::
:::
