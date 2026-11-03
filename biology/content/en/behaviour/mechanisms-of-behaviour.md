Put a fruit-fly larva on a dish of yeast paste and watch it feed. Some larvae crawl long distances as they eat, ranging over the food; others stay in a small area. Marla Sokolowski, who described this difference in *Drosophila melanogaster* in 1980, called the two types **rovers** and **sitters**, and showed that much of the difference maps to a single gene, which she named *foraging* (*for*). The gene encodes a cGMP-dependent protein kinase (PKG); rovers have higher PKG activity in the nervous system than sitters. Twenty years later, the orthologous gene in the honeybee turned out to be expressed at higher levels in the brains of workers that forage outside the hive than in younger workers that nurse inside it — and feeding bees a drug that activates PKG made them start foraging early.

Results like these are exciting because they connect behaviour to molecules, and treacherous because they invite the phrase "a gene for foraging". This chapter is about the first two of Tinbergen's questions ([[behaviour/studying-behaviour#def-four-questions]]): the mechanisms that produce behaviour, and how behaviour develops. We look at genes — how their contributions are measured, and what single-gene effects do and do not mean — then at hormones, which link an animal's internal state and its environment to what it does, then at the neural circuits that detect stimuli and generate movements, using a few systems where the path from sense organ to action is understood. We end with development: why the old dichotomy of innate and learned behaviour failed, and what replaced it. Cellular neuroscience is treated in [[neuroscience/synapses]] and [[neuroscience/sensory-systems]]; endocrine physiology in [[animal-physiology/endocrine-control]].

## Genes and behaviour

No gene "codes for" a behaviour in the way it codes for a protein. Genes encode RNAs and proteins that build and run nervous systems, muscles and endocrine glands; behaviour is what those systems do in an environment. Nonetheless, differences between individuals in behaviour are often partly caused by differences in their genes, and that is what behavioural genetics measures.

::: definition Genetic variation in behaviour {#def-behgen}
A behaviour shows **genetic variation** in a population when individuals' genotypes predict their behaviour, in a given range of environments. Its extent is measured by the **heritability** $h^2 = V_A/V_P$, the proportion of phenotypic variance due to additive genetic variance ([[population-genetics/quantitative-traits]]), estimated from resemblance among relatives or from response to selection. Genes of large effect are identified by **crosses** and **mapping** (quantitative trait loci, association studies) and tested by **manipulation**: mutation, knockout, knock-down by RNA interference, transgenic expression or gene editing.
:::

Behaviours are typically heritable to a modest degree. Estimates for behavioural and personality traits in wild animals (boldness, exploration, aggression, migratory restlessness) often fall around 0.1–0.4, lower on average than for morphological traits — partly because behaviour is measured with more error and varies more with circumstances. Heritability is a property of a population in an environment, not of a trait: it says nothing about how much a behaviour is "determined by genes" in an individual.

Selection experiments show the same genetic variation in action. When the most and least active, aggressive or exploratory individuals are bred separately for a few generations, the lines usually diverge.

::: proposition The breeder's equation {#prop-breeder}
If a population is selected by choosing as parents individuals whose mean phenotype exceeds the population mean by $S$ (the **selection differential**), the expected change in the mean in the next generation (the **response**) is

$$
R = h^2 S.
$$ {#eq-breeder}

Assumptions: additive genetic effects (no dominance or epistasis contributing to the parent–offspring resemblance), a constant environment between generations, no genotype–environment correlation, and selection on the phenotype itself rather than on a correlated trait. The derivation is in [[population-genetics/response-to-selection]].
:::

::: example Selecting for exploratory behaviour {#ex-selection}
In a captive population of great tits, the time to visit the artificial trees in a novel room has mean 120 s and standard deviation 40 s (illustrative numbers). The fastest explorers, with mean time 70 s, are bred together. If the heritability of exploration speed is 0.3, what mean exploration time is expected in their offspring? How many generations of such selection would roughly halve the mean, if $h^2$ and $S$ stayed the same?
::: solution
The selection differential is $S = 70 - 120 = -50$ s, so $R = 0.3\times(-50) = -15$ s and the offspring are expected to average $120 - 15 = 105$ s. Halving the mean (to 60 s) needs a change of 60 s, or $60/15 = 4$ generations at this rate. In practice $S$ in seconds would shrink as the mean falls and the variance changes, and $h^2$ may decline as genetic variance is used up, so the response usually slows. (Real selection lines for exploratory behaviour in great tits, established by Piet Drent and colleagues in the Netherlands, diverged within a few generations, consistent with a heritability in this range.)
:::
:::

### Genes of large effect

Most behavioural variation is polygenic, but a few genes with large effects have been identified, and they are valuable because they give a molecular handle on a behaviour.

The *foraging* gene is the classic case. Crosses between rover and sitter strains show that the difference behaves largely as a single Mendelian locus, with the rover allele (*for*^R^) dominant over the sitter allele (*for*^s^). Kevin Osborne and colleagues (1997) showed that the locus encodes PKG, that sitters have lower PKG activity, and that adding an extra copy of the rover form of the gene to sitter flies made them behave like rovers. The two alleles coexist in natural populations, and rovers do better at high larval density, sitters at low — a case of frequency- or density-dependent selection maintaining a behavioural polymorphism.

::: example A rover–sitter cross {#ex-rover}
A rover strain is crossed with a sitter strain; all F1 larvae are rovers. In the F2, 290 larvae are scored as rovers and 110 as sitters (illustrative counts). Are these data consistent with a single locus with complete dominance?
::: solution
A single locus with *for*^R^ dominant predicts a 3 : 1 ratio, that is 300 rovers and 100 sitters among 400. The χ² statistic is

$$
\chi^2 = \frac{(290 - 300)^2}{300} + \frac{(110 - 100)^2}{100} = 0.333 + 1.000 = 1.33,
$$

with $2 - 1 = 1$ degree of freedom, giving $p = 0.25$ ([[biostatistics/categorical-data]]). The data are consistent with the 3 : 1 hypothesis. Consistency is not proof: a ratio near 3 : 1 could also arise from a major locus plus modifiers, and larvae near the boundary between the categories will be misclassified. The molecular work, not the ratio, is what established *for* as the gene.
:::
:::

In social insects, the same gene family appears again. Yehuda Ben-Shahar, Gene Robinson and colleagues (2002) found that honeybee (*Apis mellifera*) foragers have higher brain expression of the *for* orthologue (*Amfor*) than nurses of the same age, and that treating young bees with a cGMP analogue, which activates PKG, caused them to start foraging precociously. Here the gene's role is in **regulating the timing** of a change in behaviour that all workers go through, not in making a fixed difference between individuals.

In mammals, the best-known case concerns pair bonding in voles. Prairie voles (*Microtus ochrogaster*) form lasting pair bonds; the closely related meadow vole (*M. pennsylvanicus*) is promiscuous. The two species differ in the distribution of receptors for the neuropeptides vasopressin and oxytocin in the brain. Miranda Lim, Larry Young and colleagues (2004) used a viral vector to increase expression of the vasopressin V1a receptor gene in the ventral pallidum of male meadow voles, and these males developed a preference for a familiar female partner — a component of pair bonding. One gene's expression, in one brain region, changed a social behaviour.

::: warning "A gene for pair bonding"
Results like the vole experiment are often reported as the discovery of "the gene for" monogamy. What they show is that changing the expression of one gene in one place can change a behaviour, given everything else about the vole's brain and environment. The same receptor is involved in many behaviours; variation in vasopressin receptor distribution does not predict mating system across all vole or rodent species; and later work found that prairie voles lacking a functional oxytocin receptor gene, made by gene editing, could still form pair bonds (Hephzibah Berendzen and colleagues, 2023). A gene can be *necessary* for a behaviour in a given genetic background (knocking it out abolishes the behaviour) without being *sufficient* for it, and without being the gene responsible for natural variation in it. The analogy is a car: removing the spark plugs stops it, but the spark plugs are not "the gene for driving".
:::

::: quiz
A knockout mouse lacking gene *X* shows no aggression towards intruders. Which conclusion is justified?
- [ ] Gene *X* is the gene for aggression
- [ ] Natural variation in aggression among mice is caused by variation in gene *X*
- [x] In this genetic background and test, the product of gene *X* is needed for normal aggressive behaviour
- [ ] Aggression is innate
::: solution
A knockout shows necessity in a given background and test. It does not show that *X* is specific to aggression (the mice might be ill, unable to smell intruders, or generally inactive — controls must check), nor that natural variation in aggression involves *X*, nor anything about "innateness". Further work would test other behaviours, other backgrounds, and natural alleles.
:::
:::

## Hormones and behaviour

Hormones link the animal's physiology and environment to behaviour on time scales from minutes to seasons. The first experiment in endocrinology was a behavioural one: in 1849 Arnold Berthold castrated cockerels, which then failed to develop combs, crowing and fighting; when a testis was transplanted into the abdomen of a castrated bird, the male characteristics and behaviour developed. Since the transplanted testis had no nerve supply, something it secreted into the blood must have been responsible.

Hormones act on behaviour in two broadly different ways.

::: definition Organisational and activational effects {#def-orgact}
An **organisational** effect of a hormone is a permanent change in the structure of the nervous system produced during a sensitive period of development, which determines how the adult will respond to hormones and stimuli later. An **activational** effect is a transient change in the probability of a behaviour in an adult, which lasts roughly as long as the hormone is present. The distinction was proposed by Charles Phoenix, Robert Goy, Arnold Gerall and William Young in 1959, from experiments in which female guinea pigs exposed to testosterone before birth showed, as adults, less female-typical and more male-typical sexual behaviour in response to adult hormone treatment.
:::

The distinction is a useful first approximation; the boundary is blurred by hormonal effects at puberty that are partly organisational, and by structural changes in the adult brain, such as the seasonal growth of song-control nuclei in songbirds under testosterone.

Hormone action on a target cell depends on the binding of hormone to receptor, which is a saturating function of concentration. A common description of dose–response relationships is the Hill function.

::: proposition A saturating dose–response {#prop-hill}
If a response is proportional to the fraction of receptors bound, and binding is cooperative with Hill coefficient $n$, then the response to hormone concentration $H$ is

$$
\frac{\text{response}}{\text{maximum response}} = \frac{H^n}{K^n + H^n},
$$ {#eq-hill}

where $K$ is the concentration giving half the maximal response. With $n = 1$ (simple binding) the curve is hyperbolic; with $n > 1$ it is sigmoid and switch-like. This is an empirical description: real behavioural dose–response curves can also be non-monotonic (an inverted U), because high doses activate other receptors or feedback loops.
:::

::: widget plot
f: x^n/(k^n + x^n)
x: 0, 10
y: 0, 1.05
sliders: k=2:0.5:8:0.1; n=1:1:6:0.5
labels: \text{fraction of maximal response}
hlines: 0.5
caption: The Hill dose–response function [[#eq-hill]] against hormone concentration (arbitrary units). Move $k$ to shift the threshold; raise $n$ to make the response switch-like. With $n=1$ doubling concentration from $k$ to $2k$ raises the response from 0.5 to 0.67; with $n=4$ the same doubling raises it to 0.94. Steep curves mean that small changes in circulating hormone near threshold produce large changes in behaviour, while above saturation further hormone does little.
:::

The saturation matters for a classic finding. Castration abolishes most male sexual behaviour in rodents, and testosterone replacement restores it — but individual differences in the sexual behaviour of intact males are not predicted by their testosterone levels, because almost all intact males have levels on the saturated part of the curve. A hormone can be necessary for a behaviour without its natural variation explaining variation in the behaviour.

::: example Saturation and individual differences {#ex-saturation}
Suppose the probability that a male rat mounts a receptive female in a test is $H^2/(1 + H^2)$, with $H$ the circulating testosterone level in units of the half-maximal concentration. Intact males range from $H = 3$ to $H = 6$; castrated males have $H \approx 0.2$. Compare the predicted behaviour of the two groups and of the extremes of the intact range.
::: solution
At $H = 0.2$: $0.04/1.04 = 0.04$. At $H = 3$: $9/10 = 0.90$. At $H = 6$: $36/37 = 0.97$. Castration reduces the probability from about 0.9–0.97 to 0.04, a dramatic effect; within the intact range, a twofold difference in testosterone changes behaviour by only 7 percentage points, easily swamped by other sources of variation. Correlational studies of intact males would wrongly conclude that testosterone "has little to do with" sexual behaviour; the manipulation shows it is necessary.
:::
:::

### Hormones, behaviour and the social environment

Hormones do not only cause behaviour; behaviour and social experience change hormones. Daniel Lehrman's studies of ring doves (*Streptopelia risoria*) in the 1950s and 1960s showed a chain of reciprocal effects: a male's courtship stimulates the female's ovaries to secrete oestrogen, which makes her build nests; nest-building and incubation stimulate the secretion of progesterone and then prolactin, which makes both parents produce crop milk for the squabs. Each stage of behaviour sets up the hormonal conditions for the next.

In many birds, testosterone in males rises sharply when territories are established or challenged, and falls when males are feeding young. John Wingfield and colleagues (1990) formalised this as the **challenge hypothesis**: testosterone is elevated above a breeding baseline in response to social challenges, especially in species where males provide parental care, because high testosterone promotes aggression but interferes with care. Experimental implants of testosterone in males of biparental species, such as the dark-eyed junco (*Junco hyemalis*), increased singing and territorial behaviour and reduced feeding of nestlings, consistent with a trade-off.

Social status can reorganise the brain within days. In the African cichlid fish *Astatotilapia burtoni*, only a minority of males hold territories; they are brightly coloured and reproductively active, while subordinate males are drab with regressed testes. Russell Fernald's group showed that when a subordinate male is given the opportunity to take over a territory, neurons in the hypothalamus that produce gonadotropin-releasing hormone (GnRH) enlarge, and immediate early gene expression in those neurons rises within minutes of the change in status. Social opportunity drives the endocrine change, which then supports the behaviour.

::: application Endocrine disruptors and behaviour
Because hormones organise behaviour during sensitive periods, chemicals in the environment that mimic or block hormones can alter it. Exposure of fish, amphibians and birds to oestrogenic compounds — from sewage effluent containing synthetic oestrogens used in contraceptive pills, or from industrial chemicals — has been linked to altered courtship and reproductive behaviour in laboratory and field studies, and in some cases to population declines. The mechanisms are the organisational and activational effects described above, which is why behavioural tests are increasingly included in the assessment of chemicals (the toxicology itself is outside this course).
:::

## Neural mechanisms

**Neuroethology** studies the neural basis of natural behaviour. Its successes come from choosing animals whose nervous systems are accessible and whose behaviour is clearly adapted to a specific problem. Three questions recur: how does the nervous system pick out the relevant stimulus, how does it decide, and how does it generate the movement?

### Filtering the world

Every animal perceives only a slice of its physical environment — what Jakob von Uexküll in 1909 called its *Umwelt*. Bees see ultraviolet; pit vipers detect infrared; many fish sense electric fields; bats and moths live in a world of ultrasound. Within its *Umwelt*, an animal's nervous system extracts the features that matter.

A classic case of feature extraction is prey-catching in the common toad (*Bufo bufo*). Jörg-Peter Ewert showed in the 1970s and 1980s that toads turn towards and snap at a dark bar moving along its long axis ("worm" configuration), but ignore or avoid the same bar moving perpendicular to its long axis ("anti-worm"). Recording from the brain, he found neurons in the optic tectum whose responses matched the behavioural preference, and neurons in the thalamus/pretectum that responded best to anti-worm stimuli and inhibited the tectum. The behavioural sign stimulus of classical ethology ([[behaviour/studying-behaviour#def-fap]]) corresponds to the tuning of particular neural populations.

### Moths and bats

The most complete account of a predator–prey interaction at the level of neurons is Kenneth Roeder's work on noctuid moths in the 1960s. Insectivorous bats locate prey by echolocation, emitting intense ultrasonic calls. Many moths have simple ears, one on each side of the thorax, each with only two auditory receptor cells, A1 and A2. A1 is sensitive and responds to faint ultrasound; A2 responds only to intense sound. Roeder found that moths turn away from faint ultrasound — a distant bat — and, when the sound is intense, as from a bat close by, perform erratic loops, spirals or power dives. Because each ear's response depends on the direction of the source, the moth can steer away from a distant bat.

::: example Who hears whom first? {#ex-moth}
A bat emits calls with a sound pressure level of 110 dB measured 0.1 m from its mouth (an illustrative but realistic value). Sound spreading spherically loses 6 dB per doubling of distance, that is $20\log_{10}(r/r_0)$ dB between distances $r_0$ and $r$. Suppose a moth's A1 cell responds above 50 dB (an illustrative threshold). (a) Ignoring absorption by air, how far away can the moth first hear the bat? (b) Ultrasound around 40 kHz is also absorbed by air at roughly 1 dB per metre, depending on humidity. How does that change the answer? (c) Why does the bat detect the moth much later?
::: solution
(a) We need $110 - 20\log_{10}(r/0.1) = 50$, so $\log_{10}(r/0.1) = 3$ and $r = 100$ m.

(b) With absorption the level is $110 - 20\log_{10}(r/0.1) - 1\times(r - 0.1)$. Solving numerically gives $r \approx 16$ m: absorption dominates at long range, which is why bats use such intense calls.

(c) The bat hears an *echo*, which has travelled the distance twice, been attenuated twice, and lost most of its energy on reflection from a target only a centimetre or two across. Its detection range for a moth is therefore a few metres at most. A moth hearing the bat at tens of metres has time to turn away before it is detected — Roeder's explanation of why the simple ear is so effective. The arms race continues: some bats call at frequencies or intensities to which moth ears are less sensitive, and some tiger moths produce clicks that jam or warn bats ([[behaviour/communication]]).
:::
:::

::: widget plot
f: 110 - 20*log10(x/0.1) - a*x; 110 - 40*log10(x/0.1) - 2*a*x - 30
x: 0.1, 40
y: 0, 120
sliders: a=1:0:2:0.1
labels: \text{call level at moth (dB)}; \text{echo level at bat (illustrative, dB)}
hlines: 50
caption: Sound level against distance in metres for the bat call reaching the moth (spherical spreading plus absorption of $a$ dB per metre) and, as an illustrative comparison, the echo returning to the bat (spreading and absorption over both legs, with 30 dB lost on reflection). The horizontal line is the illustrative 50 dB threshold of [[#ex-moth]]. With $a=1$ the call stays above threshold out to about 16 m, while the echo falls below the same level within about half a metre (bats hear fainter sounds than this threshold, which gives them detection ranges of a few metres). Set $a=0$ to see the much longer range without absorption.
:::

### Generating movement

Many rhythmic behaviours — walking, swimming, flying, breathing, chewing — are produced by **central pattern generators**: networks of neurons in the spinal cord or ganglia that generate a patterned rhythm without rhythmic input, though sensory feedback adjusts it. Donald Wilson showed in 1961 that the locust flight motor pattern persists after the sensory nerves from the wings are cut, though at a lower frequency. The stomatogastric ganglion of crabs and lobsters, with about 30 neurons, became a model for how such networks work and how neuromodulators reconfigure them to produce different rhythms.

At the other extreme are escape responses mediated by a few large neurons. In fish, the paired **Mauthner cells** in the hindbrain receive sensory input from the ear and lateral line and, when they fire, trigger a powerful contraction of the muscles on the opposite side of the body, bending the fish into a C-shape and launching it away from the stimulus within milliseconds. Crayfish tail-flip escapes are driven by giant fibres in the same way. These systems are the closest approximation to the **command neuron** concept of Irving Kupfermann and Klaudiusz Weiss (1978): a neuron whose activity is both necessary and sufficient for a behaviour. Most behaviour is not organised so simply; decisions are distributed across populations of neurons, and the same circuit can produce different behaviour depending on neuromodulatory state ([[neuroscience/motor-systems]]).

### Clocks

Much behaviour is timed by internal clocks. Animals kept in constant conditions continue to show daily rhythms of activity, with a period close to, but not exactly, 24 hours — a **free-running** rhythm, which in nature is **entrained** to 24 hours by light and other cues (zeitgebers).

::: example A free-running rhythm {#ex-freerun}
A mouse kept in constant darkness begins its nightly bout of wheel running about 30 minutes earlier each day. What is its free-running period $\tau$, and after 10 days by how much has its activity onset shifted relative to the outside day?
::: solution
Starting 30 minutes earlier each cycle means each cycle is 30 minutes shorter than 24 h: $\tau = 23.5$ h. After 10 days the onset has drifted $10\times0.5 = 5$ h earlier. The rhythm is generated internally (otherwise it would stay locked to the outside day or disappear), and its period is not exactly 24 h, which is why light is needed to reset it daily. Nocturnal rodents typically have $\tau$ slightly less than 24 h in constant darkness.
:::
:::

The molecular clock was first opened up by genetics. Ronald Konopka and Seymour Benzer (1971) screened mutagenised *Drosophila* for altered eclosion and activity rhythms and found three alleles of one X-linked gene, *period* (*per*): one gave a period of about 19 h, one about 28 h, and one abolished rhythmicity. The *per* gene and its partners, which form a transcription–translation feedback loop, were cloned in the 1980s and 1990s; Jeffrey Hall, Michael Rosbash and Michael Young shared the 2017 Nobel Prize in Physiology or Medicine for this work. Related clock genes run the rhythms of mammals, in a master clock in the hypothalamic suprachiasmatic nucleus and in clocks in most tissues. Clocks also allow animals to compensate for the movement of the sun when using it as a compass ([[behaviour/migration-navigation]]), and annual clocks time migration and breeding.

## How behaviour develops

Classical ethologists distinguished **innate** behaviour, which appears without opportunity to learn, from **learned** behaviour. Daniel Lehrman's 1953 critique of Lorenz, and Patrick Bateson's later work, showed why the distinction cannot bear the weight put on it. Every behaviour develops from the interaction of genes and environment, including the environment inside the egg or womb. "Deprivation" experiments, which raise animals without some kind of experience, show only that *that* experience is unnecessary, not that the behaviour is independent of experience in general. Bird embryos hear sounds before hatching; mammals experience the mother's hormones and diet in the womb.

::: definition Developmental plasticity and reaction norms {#def-plasticity}
**Developmental plasticity** is the capacity of one genotype to develop different phenotypes in different environments. The **reaction norm** of a genotype is the function relating its phenotype to an environmental variable. Genetic variation in behaviour then corresponds to differences in reaction norms; a **genotype–environment interaction** exists when reaction norms are not parallel, so that which genotype behaves "more" depends on the environment. A **sensitive period** is a phase of development during which a particular experience has an unusually large or lasting effect.
:::

The question "how much of this behaviour is due to genes, and how much to environment?" has a meaningful answer only for *differences* in a population ([[#def-behgen]]), never for the behaviour of an individual. A useful analogy, due to Bateson, is baking: it is meaningless to ask what fraction of a cake's taste comes from the flour and what from the oven.

### Two examples of plasticity

The desert locust (*Schistocerca gregaria*) occurs in two forms. Solitarious locusts, at low density, are cryptic and avoid one another; gregarious locusts, which form swarms, are active, attracted to one another, and differently coloured. Crowding transforms solitarious into gregarious behaviour within a few hours. Michael Anstey, Stephen Rogers, Malcolm Burrows and colleagues (2009) showed that crowding — specifically the mechanical stimulation of the hind legs by other locusts, and the sight and smell of them — triggers a surge of serotonin in the thoracic ganglia, and that blocking serotonin prevents behavioural gregarisation while applying it induces it. A single genotype switches between two strikingly different behavioural phenotypes in response to density.

Maternal behaviour also shapes the offspring's development. In laboratory rats, mothers differ consistently in how much they lick and groom their pups. Michael Meaney's group found that adult offspring of high-licking mothers had lower stress responses and, as mothers, themselves licked their pups more. Because the difference could be genetic, the decisive experiment was **cross-fostering**: pups born to low-licking mothers but raised by high-licking ones developed like the offspring of high-licking mothers. Ian Weaver and colleagues (2004) linked the effect to reduced DNA methylation of the promoter of the glucocorticoid receptor gene in the hippocampus of well-licked pups — an epigenetic mechanism by which experience can be transmitted across generations without genetic change.

::: example Interpreting a cross-fostering experiment {#ex-crossfoster}
Pups from bold and shy strains of mice are cross-fostered at birth, so that each pup is raised by a mother of one strain. As adults, they are scored for latency to enter a novel arena (shorter = bolder). The mean latencies (illustrative, in seconds) are:

| pup's strain (rows), mother (columns) | bold mother | shy mother |
|---|---|---|
| bold | 40 | 70 |
| shy | 100 | 130 |

What do the results show? What further control would you want?
::: solution
Within each rearing environment, bold-strain pups are 60 s faster than shy-strain pups: there is a genetic (or prenatal) effect of 60 s. Within each strain, being raised by a shy mother adds 30 s: a postnatal maternal effect of 30 s. The effects add (the differences are the same in both rows and both columns), so there is no genotype–environment interaction in this range. The pup's strain still includes the uterine environment, so the "genetic" effect may be partly prenatal; embryo transfer (implanting embryos into mothers of the other strain) would separate genetic from prenatal maternal effects. A control group of in-fostered pups — moved to another mother of their own strain — checks that the act of fostering does not itself alter behaviour.
:::
:::

Developmental plasticity is not a failure of genetic control but often an adaptation in itself. Where environments vary unpredictably among generations and the cues available early in life predict the conditions an animal will face, selection favours reaction norms that match the phenotype to the cue. Learning ([[behaviour/learning-cognition]]) is the most flexible form of such plasticity: it continues through life and adjusts behaviour to conditions that genes could not anticipate.

::: history
Berthold's castration experiments (1849) founded endocrinology. Ethologists of the 1930s–1950s argued that much behaviour was innate, a position challenged by Lehrman in 1953. Phoenix, Goy, Gerall and Young proposed the organisational–activational distinction in 1959. Roeder's *Nerve Cells and Insect Behavior* (1963) helped found neuroethology, and Konopka and Benzer's *period* mutants (1971) opened the genetics of behaviour in *Drosophila*, as did Sokolowski's rover–sitter work (1980). Molecular and genomic methods — knockouts in mice from the 1990s, viral gene transfer in voles (2004), optogenetics from the mid-2000s, gene editing in non-model species in the 2010s — have since made it possible to manipulate specific genes and neurons in behaving animals.
:::

::: summary
- Genes affect behaviour through the nervous, endocrine and muscular systems they build and run; behaviours show heritable variation (often $h^2 \approx 0.1$–$0.4$) and respond to selection as $R = h^2 S$.
- Genes of large effect — *foraging* in flies and bees, the vasopressin V1a receptor in voles — give molecular handles on behaviour, but knockouts and transgenes show necessity in a context, not that a gene is "for" a behaviour.
- Hormones have organisational effects during sensitive periods and activational effects in adults; dose–response curves saturate, so a hormone can be necessary without explaining individual differences.
- Behaviour and social context feed back on hormones (ring doves, the challenge hypothesis, status in cichlids).
- Neuroethology links behaviour to circuits: feature detectors in toads, two-neuron ears in moths, central pattern generators, Mauthner-cell escapes, and the molecular circadian clock.
- The innate–learned dichotomy fails: every behaviour develops through gene–environment interaction. Reaction norms, sensitive periods, locust phase change and maternal effects (cross-fostering) show how.
:::

## Exercises

::: exercise Organisational or activational? {level=1}
Classify each effect: (a) female mice that developed between two male siblings in the uterus are more aggressive as adults; (b) a castrated male canary stops singing and resumes when given testosterone; (c) seasonal growth of the song-control nucleus HVC in spring.
::: solution
(a) Organisational: prenatal exposure to testosterone from neighbouring male foetuses permanently alters later behaviour. (b) Activational: the behaviour tracks the presence of the hormone in the adult. (c) A blurred case — a structural change in the adult brain driven by testosterone, which is reversed when hormone levels fall in autumn; usually classed as activational but involving organisational-type remodelling.
:::
:::

::: exercise A χ² for a behavioural cross {level=1 check="1.333"}
An F2 of 400 flies contains 290 rovers and 110 sitters. Compute the χ² statistic for a 3 : 1 hypothesis (three decimal places).
::: solution
Expected 300 and 100: $\chi^2 = 100/300 + 100/100 = 1.333$, with 1 degree of freedom ($p \approx 0.25$).
:::
:::

::: exercise Drift of a clock {level=1 check="9"}
A nocturnal animal in constant darkness has a free-running period of 24.6 h. By how many hours has its activity onset drifted relative to clock time after 15 days?
::: solution
Each cycle is 0.6 h longer than 24 h, so after 15 days the onset is $15\times0.6 = 9$ h later.
:::
:::

::: exercise Response to selection {level=2 check="0.6"}
A behaviour has heritability 0.3. Parents are selected with a mean 2 units above the population mean. What response is expected in one generation?
::: solution
$R = h^2 S = 0.3\times2 = 0.6$ units.
:::
:::

::: exercise A switch-like response {level=2 check="0.2"}
With the Hill function [[#eq-hill]], $n = 2$ and hormone at half the half-maximal concentration ($H = K/2$), what fraction of maximal response is expected? What is it at $H = 2K$?
::: solution
At $H = K/2$: $(1/4)/(1 + 1/4) = 0.2$. At $H = 2K$: $4/(1 + 4) = 0.8$. A fourfold change in concentration takes the response from 20 % to 80 %.
:::
:::

::: exercise Necessary but not responsible {level=2}
Knocking out gene *Y* in mice abolishes nest building. In a wild population, mice differ greatly in nest size, but sequencing finds no variation at *Y*. Is there a contradiction? What kinds of genes or factors might explain natural variation in nest building?
::: solution
No contradiction. The knockout shows that *Y* is necessary for nest building; the population data show that *Y* does not vary and so cannot explain differences. Natural variation could come from other loci of small effect (Lynch's selection lines for nest building in house mice responded steadily, suggesting polygenic variation), from regulatory variation affecting *Y*'s expression rather than its sequence, from environment (temperature, materials, experience) or from maternal effects. The genes that are needed for a behaviour and the genes that make individuals differ in it are often different sets.
:::
:::

::: exercise Reading a reaction-norm table {level=2}
Two strains of fish are raised at low and high density and scored for aggression (bites per 10 min): strain A 5 (low), 15 (high); strain B 10 (low), 8 (high). Describe the reaction norms. Is it meaningful to say that strain B is "genetically more aggressive"?
::: solution
Strain A's aggression rises steeply with density; strain B's is nearly flat and slightly declines. The reaction norms cross: B is more aggressive at low density and A at high density. This is a genotype–environment interaction, so the statement that one strain is genetically more aggressive is meaningful only for a specified environment. Heritability estimated in one environment would not predict the other.
:::
:::

::: exercise Hearing distance {level=3 check="31.6"}
In [[#ex-moth]], ignoring absorption, suppose a quieter bat calls at 90 dB at 0.1 m, and a moth's threshold is 40 dB. At what distance (in metres, three significant figures) does the moth first hear it? How much farther would it hear a bat calling at 110 dB? What does this imply for an arms race in call intensity?
::: solution
We need $90 - 20\log_{10}(r/0.1) = 40$, so $\log_{10}(r/0.1) = 2.5$ and $r = 0.1\times10^{2.5} = 31.6$ m. A 110 dB call gives $r = 0.1\times10^{3.5} = 316$ m without absorption — ten times farther, since every 20 dB multiplies the range by ten. (Absorption shortens both ranges greatly, as in [[#ex-moth]].) A louder call lets a bat detect prey farther away, but it also warns eared moths earlier, so selection on call intensity depends on the balance between the two. Some bats that hunt eared moths call unusually quietly, as the barbastelle (*Barbastella barbastellus*) does (Holger Goerlitz and colleagues, 2010), reducing the distance at which moths hear them to about that at which they detect the moths.
:::
:::

::: exercise Designing a hormone experiment {level=3}
Female zebra finches do not sing. You want to know whether this is because female brains are organised differently during development or because adult females lack testosterone. Design experiments to distinguish the two, and say what results each hypothesis predicts.
::: solution
**Activational hypothesis**: give adult females testosterone (with sham-implanted controls). If song appears and resembles male song, the difference is activational. **Organisational hypothesis**: treat females with oestradiol (or testosterone, which brain aromatase converts to oestradiol) shortly after hatching, during the sensitive period when the song system develops, then test as adults with and without testosterone. If only females treated early develop song nuclei of male size and sing when given testosterone as adults, the difference is organisational. Classic experiments of this kind (Mark Gurney and Masakazu Konishi, 1980) found that early oestradiol masculinises the female song system and adult testosterone then elicits song, while adult testosterone alone in untreated females produces little song — evidence for an organisational effect, with activation needed in addition. (Later work showed that not all of the sex difference can be produced by hormones, implicating direct effects of sex-chromosome genes in the brain.)
:::
:::
