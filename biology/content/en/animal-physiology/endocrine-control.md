In 1849 Arnold Berthold, in Göttingen, castrated young cockerels. As expected, they grew up without the red comb, the crowing and the fighting of normal roosters. But in some birds he transplanted a testis into the body cavity, far from its nerves, and these birds developed normally into roosters. Something released by the testis into the blood, Berthold concluded, must act on the comb and the brain. Half a century later William Bayliss and Ernest Starling found that acid in the small intestine of a dog, even with its nerves cut, made the pancreas secrete, because the intestine released a chemical messenger into the blood, which they named secretin (1902). Starling introduced the word **hormone**, from the Greek for "to set in motion", in 1905.

Hormones coordinate processes that are slow, widespread and long-lasting: growth, moulting and metamorphosis, reproduction, the use and storage of fuels, and the balance of salt and water. This chapter introduces the chemical classes of hormones and their receptors, the principles that govern hormone concentrations and their control, and the endocrine systems of vertebrates and insects that control metabolism, growth, moulting and reproduction. The intracellular signalling that follows hormone binding — G proteins, second messengers, kinase cascades — is in [[cell-biology/cell-signalling]], and the feedback logic in [[animal-physiology/homeostasis]].

## Hormones and their receptors

::: definition Hormone and neurohormone {#def-hormone}
A **hormone** is a chemical messenger secreted by cells into the blood or haemolymph, by which it reaches target cells elsewhere in the body and acts on them through specific receptors at low concentrations (typically 10⁻¹² to 10⁻⁷ mol L⁻¹). A **neurohormone** is a hormone secreted by a neuron (a **neurosecretory cell**), usually from axon endings in a **neurohaemal organ** where it enters the circulation. **Endocrine** glands secrete hormones into the blood; **paracrine** and **autocrine** signals act locally on neighbouring cells or on the secreting cell itself ([[cell-biology/cell-signalling#def-signal-modes]]).
:::

Hormones fall into a few chemical classes, and the class largely determines how a hormone is made, how it travels and how it acts.

| class | examples | solubility and transport | receptor |
|---|---|---|---|
| peptides and proteins | insulin, glucagon, growth hormone, vasopressin, oxytocin; insect insulin-like peptides, adipokinetic hormone, prothoracicotropic hormone | water-soluble; free in plasma; half-lives of minutes | cell-surface (GPCRs, receptor tyrosine kinases, cytokine receptors) |
| amines derived from tyrosine | adrenaline, noradrenaline | water-soluble; half-lives of a minute or two | cell-surface GPCRs (adrenergic receptors) |
| | thyroid hormones (thyroxine, T₄; triiodothyronine, T₃) | lipid-soluble; bound to plasma proteins; half-lives of days | nuclear receptors |
| steroids | cortisol, aldosterone, testosterone, oestradiol, progesterone; insect ecdysteroids (ecdysone, 20-hydroxyecdysone) | lipid-soluble; carried by binding proteins; half-lives of tens of minutes to hours | mostly nuclear receptors (some membrane receptors) |
| terpenoids and others | insect juvenile hormone (a sesquiterpenoid); eicosanoids such as prostaglandins (mostly local) | lipid-soluble | various, including nuclear receptors |

::: definition Cell-surface and nuclear receptors {#def-receptor}
**Cell-surface receptors** bind water-soluble hormones that cannot cross the plasma membrane and act through second messengers or kinase cascades; their effects begin within seconds to minutes and often modify existing proteins. **Nuclear receptors** bind lipid-soluble hormones that diffuse into the cell; the hormone–receptor complex binds to specific DNA sequences (hormone response elements) and activates or represses transcription, so that effects take hours and involve the synthesis of new proteins. Nuclear receptors form a large family, including receptors for steroids, thyroid hormone, retinoic acid and vitamin D in vertebrates and the ecdysone receptor (a heterodimer of EcR and Ultraspiracle) in insects.
:::

The distinction is a guide rather than a rule: steroids also have rapid effects through membrane receptors, and peptide hormones change gene expression through their signalling cascades. But it explains much of the difference in tempo between, say, adrenaline, which raises heart rate within seconds, and thyroid hormone, which raises metabolic rate over days.

### How much hormone? Secretion, clearance and half-life

The concentration of a hormone in the blood is set by the balance between its secretion and its removal, by degradation in the liver and kidney, uptake by target tissues and excretion.

::: proposition One-compartment hormone kinetics {#prop-kinetics}
Let a hormone be secreted at a rate $S$ (amount per unit time) into a distribution volume $V$ and removed by first-order processes with rate constant $k$. Its concentration $C$ obeys

$$
V\,\deriv{C}{t} = S - kVC.
$$ {#eq-kinetics}

At steady state

$$
C_\infty = \frac{S}{kV} = \frac{S}{\mathrm{MCR}},
$$ {#eq-steady-state}

where $\mathrm{MCR} = kV$ is the **metabolic clearance rate** (volume of plasma cleared per unit time). After a step change in secretion, $C$ approaches its new steady state exponentially, with **half-life** $t_{1/2} = \ln 2 / k$; it covers 90 % of the change in $\log_2 10 \approx 3.3$ half-lives. Assumptions: a single, well-mixed compartment, first-order removal (no saturation of clearance), and constant $V$ and $k$. Hormones bound to plasma proteins clear more slowly, and their free, active fraction may be small.
:::

::: proof
Divide [[#eq-kinetics]] by $V$: $\deriv{C}{t} = S/V - kC$. Its equilibrium is $C_\infty = S/kV$, and $u = C - C_\infty$ satisfies $\deriv{u}{t} = -ku$, so $u(t) = u(0)\,\mathrm{e}^{-kt}$. The deviation halves every $\ln 2/k$, and falls to a tenth after $\ln 10/k = (\ln 10/\ln 2)\,t_{1/2} = 3.32\,t_{1/2}$.
:::

::: example Fast and slow hormones {#ex-kinetics}
(a) A peptide hormone is secreted at 2.0 µg h⁻¹ and has a metabolic clearance rate of 20 L h⁻¹. What is its steady-state plasma concentration? (b) Insulin has a plasma half-life of about 5 min in mammals, and thyroxine (T₄) about 7 days in humans. How long does each take to complete 90 % of the change to a new steady state after its secretion rate changes? (c) What does this imply about the kind of information each hormone can carry?
::: solution
(a) $C_\infty = 2.0/20 = 0.10$ µg L⁻¹.

(b) 90 % of the change takes $3.3$ half-lives: insulin $3.3 \times 5 = 17$ min; thyroxine $3.3 \times 7 = 23$ days.

(c) Insulin concentration can track minute-to-minute changes in blood glucose after a meal; it carries fast information. Thyroxine concentration integrates secretion over weeks; it sets a slowly changing background level, such as overall metabolic rate, and a single day's change in secretion has little effect. Short half-lives are expensive (the hormone must be made continuously) but are the price of rapid control.
:::
:::

::: widget plot
f: 1 + (0.25 - 1)*2^(-x/h)
x: 0, 60
y: 0, 1.1
sliders: h=5:0.5:30:0.5
hlines: 0.25; 1
labels: \text{plasma concentration (fraction of new steady state)}
caption: Plasma concentration of a hormone (vertical axis, as a fraction of the new steady state) after its secretion rate is quadrupled at time 0 (horizontal axis, in any unit of time), from [[#prop-kinetics]] with the half-life $h$ set by the slider in the same unit. The concentration starts at the old steady state (0.25) and rises exponentially towards the new one (1). With a half-life of 5 units it is 90 % of the way there by about 17; with 30 units it has hardly covered 75 % by the end of the plot. The time to adjust is set entirely by the half-life, not by how much the secretion changes.
:::

### Pulses and patterns

Many hormones are secreted in **pulses** rather than continuously. Gonadotropin-releasing hormone (GnRH) is released by the hypothalamus in bursts about once an hour in many mammals, and the pituitary responds to the pattern. Ernst Knobil and colleagues showed in rhesus monkeys whose own GnRH secretion had been abolished that hourly pulses of GnRH restored the secretion of the pituitary gonadotropins, whereas a continuous infusion of the same hormone suppressed it (P. E. Belchetz and colleagues, 1978): the receptors desensitise under constant stimulation. A pulsatile signal can only be transmitted if the hormone is cleared quickly between pulses, as the next example shows.

::: example Can a hormone carry a pulse? {#ex-pulses}
A hormone is secreted in brief pulses every 60 min. Compare the ratio of trough to peak concentration for a hormone with a half-life of (a) 10 min and (b) 240 min.
::: solution
Between pulses the concentration decays by a factor $2^{-60/t_{1/2}}$. (a) $2^{-6} = 1/64 = 0.016$: the concentration falls almost to zero between pulses, so the target sees distinct pulses. (b) $2^{-0.25} = 0.84$: the concentration falls only 16 % before the next pulse, and successive pulses pile up to a nearly steady level about six times that of a single pulse ($1/(1 - 0.84) = 6.3$). A long-lived hormone cannot carry pulse information; GnRH, with a half-life of minutes, can.
:::
:::

::: widget plot
f: 2^(-(x - 60*floor(x/60))/h)/(1 - 2^(-60/h))
x: 0, 300
y: 0, 8
sliders: h=10:2:240:2
labels: \text{concentration (multiples of one pulse)}
caption: Steady-state plasma concentration of a hormone secreted in instantaneous pulses every 60 min (horizontal axis, minutes), in units of the rise caused by a single pulse, for the half-life $h$ (minutes) set by the slider; the curve is the sum of the decaying contributions of all earlier pulses, as in [[#ex-pulses]]. With $h = 10$ min each pulse decays almost to zero before the next and the target sees a clear rhythm. Increase $h$ towards 240 min and the trace smooths into a nearly constant level, about six times higher, in which the pulses can no longer be distinguished.
:::

## Neuroendocrine axes

In vertebrates the endocrine system is commanded largely by the brain, through the **hypothalamus** and the **pituitary gland** beneath it.

::: definition The hypothalamus–pituitary axes {#def-axis}
The **posterior pituitary** (neurohypophysis) is a neurohaemal organ: axons of hypothalamic neurosecretory cells end there and release **vasopressin** (antidiuretic hormone; arginine vasotocin in non-mammalian vertebrates) and **oxytocin** into the blood. The **anterior pituitary** (adenohypophysis) is a gland controlled by **releasing** and **inhibiting hormones** secreted by hypothalamic neurons into a portal system of blood vessels that runs directly to it. It secretes **tropic hormones**: thyroid-stimulating hormone (TSH), adrenocorticotropic hormone (ACTH), the gonadotropins luteinising hormone (LH) and follicle-stimulating hormone (FSH), which act on further endocrine glands, and growth hormone (GH) and prolactin, which act more widely. Each **axis** — hypothalamus → pituitary → target gland (thyroid, adrenal cortex, gonads) — is regulated by **negative feedback** of the final hormone on the hypothalamus and pituitary.
:::

The axes add amplification and control at each level. A few nanograms of a releasing hormone in the portal blood cause the release of micrograms of a tropic hormone, which cause the release of milligrams of a steroid or thyroid hormone. And negative feedback at two levels holds the final hormone near a set point, which the brain can move — raising cortisol in stress, gonadal steroids at puberty, thyroid hormone in cold.

Insects have a strikingly similar organisation, which evolved independently. Neurosecretory cells in the brain send axons to the **corpora cardiaca**, neurohaemal organs behind the brain, from which they release neurohormones, among them **prothoracicotropic hormone** (PTTH), which stimulates the **prothoracic glands** to make the steroid moulting hormone. The **corpora allata**, a pair of glands near the corpora cardiaca, secrete **juvenile hormone**. The parallel — brain, neurohaemal organ, tropic hormone, peripheral gland making a steroid — is a striking convergence.

::: quiz
A mammal's thyroid gland is damaged so that it makes less thyroxine. What happens to the plasma concentrations of TSH and of thyroxine, and why?
- [ ] Both fall, because the axis is a chain of activation.
- [x] Thyroxine falls and TSH rises, because the negative feedback of thyroxine on the hypothalamus and pituitary is reduced.
- [ ] Thyroxine falls and TSH is unchanged, because the pituitary does not sense thyroxine.
- [ ] Both rise.
::: solution
Thyroxine normally inhibits the release of TSH-releasing hormone and TSH. When thyroxine falls, this inhibition weakens, and TSH rises — an attempt by the loop to restore thyroxine by stimulating the remaining thyroid tissue (which may enlarge, forming a goitre, if iodine is lacking). Measuring both hormones locates the fault in an endocrine loop: a high stimulating hormone with a low target hormone points to the target gland.
:::
:::

## Metabolism and fuel

The hormones that regulate fuel use are among the oldest. In vertebrates, **insulin**, secreted by β cells of the pancreatic islets when blood glucose rises, promotes uptake of glucose into muscle and adipose tissue and the storage of fuel as glycogen, fat and protein; **glucagon**, from α cells, promotes the release of glucose from the liver when glucose falls. Together they form a push–pull control of blood glucose ([[animal-physiology/homeostasis]]), whose biochemistry is set out in [[biochemistry/metabolic-integration]]. **Adrenaline** from the adrenal medulla mobilises glucose and fatty acids for emergency action, the "fight or flight" response analysed by Walter Cannon; **cortisol** from the adrenal cortex promotes gluconeogenesis and protein breakdown during stress and fasting; and **thyroid hormones** raise metabolic rate and heat production in endotherms, which is why they are part of the response to cold and of seasonal changes in metabolism.

Insects have functional counterparts. **Insulin-like peptides**, made by neurosecretory cells in the brain, promote growth and fuel storage; ablating these cells in the fruit fly *Drosophila melanogaster* produced small flies with raised haemolymph sugar, a diabetes-like state (Eric Rulifson, Seung Kim and Roel Nusse, 2002). **Adipokinetic hormone** from the corpora cardiaca mobilises lipids and the sugar trehalose from the fat body during flight, playing the role of glucagon. The insulin signalling pathway is shared by nematodes, insects and mammals, and reducing its activity extends lifespan in all three, one of the clearest examples of a conserved endocrine system.

## Growth

In vertebrates, **growth hormone** from the anterior pituitary acts largely by stimulating the liver and other tissues to make **insulin-like growth factor 1** (IGF-1), which promotes the growth of bone, muscle and other tissues. The axis is a major determinant of body size within species. In dogs, which vary in size more than any other mammal, a single haplotype of the *IGF1* gene associated with lower IGF-1 levels is shared by nearly all small breeds and is rare in large ones (Nathan Sutter and colleagues, 2007).

Insects grow differently. Their exoskeleton cannot expand, so they grow in steps, shedding and replacing the cuticle at each **moult**, and their growth ends when they metamorphose into adults, which do not moult. Final size is therefore set by when the larva stops feeding and initiates metamorphosis. In the tobacco hornworm *Manduca sexta*, H. Frederik Nijhout and colleagues showed that this decision depends on the larva reaching a **critical weight** in its last larval stage, after which the hormonal events of metamorphosis proceed even if the larva is starved.

## Moulting and metamorphosis

### Insects: ecdysone and juvenile hormone

Vincent Wigglesworth's experiments in the 1930s on the blood-sucking bug *Rhodnius prolixus* established the hormonal control of insect development. A *Rhodnius* nymph moults once after each large blood meal. Wigglesworth found that nymphs decapitated soon after feeding did not moult, whereas those decapitated later did, and that joining a decapitated nymph to one that was about to moult (by a capillary tube, so that their haemolymph mixed) made both moult: a factor from the head, released at a critical time after feeding, induced moulting. He also found that a factor from the corpora allata kept the insect juvenile: removing them made a nymph metamorphose prematurely into a miniature adult, and implanting extra ones into a final-stage nymph produced a giant extra nymphal stage.

::: definition The hormonal control of insect moulting {#def-moult}
Moulting is triggered by **ecdysteroids**: ecdysone, made by the prothoracic glands in response to PTTH, is converted in the tissues to the active form **20-hydroxyecdysone**, which acts through the nuclear ecdysone receptor to start the moulting programme of gene expression. The kind of moult is determined by **juvenile hormone** (JH), present at the time of the ecdysteroid pulse: high JH gives a larval (or nymphal) moult, so the insect stays juvenile; low JH in the final larval stage of holometabolous insects gives a pupal moult; and no JH gives the adult moult. JH is therefore called a "status quo" hormone: it does not cause moulting but keeps each moult the same kind as the last.
:::

Ecdysone was isolated by Adolf Butenandt and Peter Karlson in 1954: 25 mg of crystals from 500 kg of silkworm pupae. Juvenile hormone was extracted by Carroll Williams in the 1950s from the abdomens of male cecropia silk moths, an unusually rich source, and its structure determined in 1967. Because JH analogues prevent insects from completing metamorphosis, they are used as insecticides with little toxicity to vertebrates.

::: example Predicting a moult {#ex-moult}
Predict the outcome of each experiment on a holometabolous insect such as a moth, and give your reasons. (a) The corpora allata are removed from a third-instar larva (out of five). (b) A JH analogue is applied to a final (fifth) instar larva before its last ecdysteroid pulse. (c) The prothoracic glands are removed from a fourth-instar larva at the start of the instar. (d) In a final-instar larva, the JH titre falls to zero, and two ecdysteroid pulses follow: a small one, then a large one.
::: solution
(a) Without JH, the next ecdysteroid pulse triggers metamorphosis: the larva pupates prematurely and gives rise to a small but otherwise normal adult. (b) With JH present at the ecdysteroid pulse, the moult is larval: the insect becomes a giant supernumerary sixth-instar larva. (c) Without ecdysteroids the larva cannot moult; it stays a fourth-instar larva until it dies (unless given ecdysone). (d) This is the normal sequence of metamorphosis in *Manduca*: the small "commitment" pulse in the absence of JH reprogrammes the tissues to make pupal rather than larval cuticle and triggers wandering behaviour, and the large pulse then causes the pupal moult. Timing and the presence or absence of JH at each pulse, not just the amount of ecdysteroid, determine the outcome.
:::
:::

### Crustaceans and amphibians

Crustaceans also moult under ecdysteroid control, made in the **Y-organs**; moulting is held back by a **moult-inhibiting hormone** from the X-organ–sinus gland complex in the eyestalks. Removing the eyestalks therefore induces moulting and, through the loss of a gonad-inhibiting hormone, ovarian maturation; eyestalk ablation of female shrimp has been widely used in aquaculture to induce spawning, a practice now questioned on welfare grounds and increasingly replaced by other methods.

Amphibian metamorphosis is controlled by **thyroid hormone**. J. F. Gudernatsch showed in 1912 that tadpoles fed horse thyroid tissue metamorphosed precociously into tiny frogs, and tadpoles whose thyroids are removed never metamorphose but continue to grow. Thyroid hormone acts through nuclear receptors on every tissue, but with different effects — resorption of the tail and gills, growth of limbs, remodelling of the gut from a herbivore's long tube to a carnivore's short one, a switch from ammonia to urea excretion ([[animal-physiology/water-salt-balance]]) and from larval to adult haemoglobins — so that one hormone coordinates the transformation of the whole body. Corticosteroids accelerate the response, and stress (such as a drying pond) can speed metamorphosis through this route. Thyroid hormone also controls metamorphosis in flatfish and other fishes, and in lampreys, low rather than high thyroid hormone is associated with metamorphosis, a reminder that the same hormone can be used in different ways.

## Reproduction

Reproduction in vertebrates is controlled by the hypothalamus–pituitary–gonadal axis. GnRH from the hypothalamus stimulates release of LH and FSH, which stimulate the gonads to make gametes and sex steroids (testosterone, oestradiol, progesterone), which in turn act on the reproductive tract, secondary sexual characteristics and behaviour, and feed back on the hypothalamus and pituitary. Most of the time the feedback is negative. In the female mammalian cycle, however, a sustained high level of oestradiol from a maturing follicle switches to **positive feedback**, triggering a surge of LH that causes ovulation ([[animal-physiology/homeostasis]]).

Many animals breed only in a particular season, timed by day length. In mammals, the pineal gland secretes **melatonin** during the night, so the duration of the nightly melatonin signal encodes night length. Sheep are **short-day breeders**: their reproductive axis is activated by the long nights of autumn, so lambs are born in spring after a five-month gestation; Syrian hamsters are **long-day breeders** whose gonads regress in short days. In birds, the photoperiodic signal acts through the eyes and directly through photoreceptors in the brain; in Japanese quail, Takashi Yoshimura and colleagues (2003) found that long days induce local conversion of thyroxine to the more active T₃ in the hypothalamus, which triggers GnRH release, and a similar thyroid-hormone switch has since been found in mammals.

Hormones also shape the sexual phenotype during development. In many turtles and in all crocodilians studied, sex is determined by the temperature at which the eggs incubate, not by sex chromosomes, and temperature acts in part by regulating the enzyme aromatase, which converts testosterone to oestradiol; applying oestradiol to eggs incubated at a male-producing temperature produces females ([[developmental-biology/principles-of-development]]).

::: warning "Hormones have one function each" and "the same hormone does the same thing in every animal"
A hormone is a signal, and its effect depends on the receptor and the target cell. Prolactin stimulates milk production in mammals, but it is also the hormone that adapts fishes to fresh water: hypophysectomised killifish (*Fundulus heteroclitus*) die in fresh water unless they are given prolactin (Grace Pickford and James Phillips, 1959), and in pigeons it stimulates the crop to produce "crop milk". Thyroid hormone triggers metamorphosis in frogs and regulates metabolic rate in mammals. Oxytocin-related peptides regulate egg-laying, water balance and social behaviour in different animals. The chemistry of a hormone is often ancient; its uses have been repeatedly reassigned during evolution.
:::

## The evolution of endocrine systems

Many hormone and receptor families are older than the animals that now use them. Insulin-like peptides, oxytocin–vasopressin-like peptides, steroid receptors and the GnRH family are found across bilaterian animals, and some of their receptors are older still. Joseph Thornton and colleagues inferred the sequences of ancestral steroid receptors from those of living species and resurrected them in the laboratory. The ancestral steroid receptor appears to have been oestrogen-sensitive (Thornton, 2001), and the vertebrate receptors for aldosterone and cortisol evolved their specificity through a few substitutions, some of which changed specificity only in the presence of earlier, apparently neutral substitutions (J. T. Bridgham, S. M. Carroll and Thornton, 2006). Hormone–receptor systems thus evolve by **molecular exploitation**: a receptor that once bound one ligand is recruited to respond to a new hormone that happened to fit it, and the system is then refined.

::: example Receptor occupancy and hormone concentration {#ex-occupancy}
A target cell has receptors with a dissociation constant $K_\mathrm{d} = 1.0$ nmol L⁻¹ for a hormone. Using the occupancy relation $\theta = C/(C + K_\mathrm{d})$ of [[cell-biology/cell-signalling#prop-occupancy]], calculate the fraction of receptors occupied at (a) a resting concentration of 0.10 nmol L⁻¹ and (b) a stimulated concentration of 1.0 nmol L⁻¹. (c) If the response requires only 10 % occupancy because of spare receptors and amplification, what concentration produces a half-maximal response?
::: solution
(a) $\theta = 0.10/1.10 = 0.091$. (b) $\theta = 1.0/2.0 = 0.50$. A tenfold rise in hormone concentration raises occupancy fivefold. (c) If a 10 % occupancy produces the full response, a half-maximal response needs about 5 % occupancy (assuming response proportional to occupancy up to the maximum): $C/(C + 1.0) = 0.05$, so $C = 0.053$ nmol L⁻¹, nearly twenty times below $K_\mathrm{d}$. Amplification downstream of the receptor lets cells respond to hormone concentrations well below the receptor's $K_\mathrm{d}$ — but it also means that the "resting" concentration in (a) would already give a substantial response, so the resting level of a hormone must be judged together with the receptor number and amplification of its targets.
:::
:::

::: application Endocrine disruption
Many synthetic chemicals mimic or block hormones. In the 1980s Peter Gibbs and Geoffrey Bryan traced the development of male sex organs in female dogwhelks (*Nucella lapillus*) on the coasts of south-west England, a condition called **imposex** that sterilised severely affected females and caused local populations to disappear, to tributyltin (TBT) leaching from antifouling paints on boats; restrictions on TBT from the late 1980s, culminating in a global ban under the International Maritime Organization convention that came into force in 2008, were followed by recovery of dogwhelk populations. Alligators in Lake Apopka, Florida, contaminated by an agricultural pesticide spill, showed abnormal gonads and hormone levels (Louis Guillette and colleagues, 1994). Oestrogenic compounds from sewage effluent feminise male fish in rivers. These cases made endocrine disruption a central concern of ecotoxicology and regulation ([[conservation-biology/invasions-climate]]); its human aspects are discussed in [Medicine Atlas: endocrine](/learn/medicine/course.php?c=endocrine).
:::

::: history
Arnold Berthold's testis transplants in cockerels (1849) were the first endocrine experiment. Charles-Édouard Brown-Séquard drew attention to "internal secretions" in the 1880s, and George Oliver and Edward Schäfer found the pressor effect of adrenal extracts in 1894. Bayliss and Starling discovered secretin in 1902, and Starling named hormones in 1905. Gudernatsch showed thyroid control of amphibian metamorphosis in 1912; Frederick Banting and Charles Best isolated insulin in 1921–22, working with dogs, with J. J. R. Macleod and James Collip. Stefan Kopeć showed in 1917–22, with gypsy-moth caterpillars, that the brain controls insect metamorphosis by a blood-borne factor — the first demonstration of a neurohormone — and Wigglesworth analysed moulting and juvenile hormone in *Rhodnius* in the 1930s. Geoffrey Harris established in the 1940s and 1950s that the hypothalamus controls the anterior pituitary through portal blood vessels, and Roger Guillemin and Andrew Schally isolated the first hypothalamic releasing hormones (1969–71), sharing a Nobel Prize with Rosalyn Yalow, whose radioimmunoassay (with Solomon Berson, 1959–60) first made it possible to measure hormones at physiological concentrations.
:::

## Where this leads

Hormones work together with the nervous system, which also controls the hypothalamus and pituitary; the neural side is the subject of [[neuroscience]]. Developmental actions of hormones are taken further in [[developmental-biology/principles-of-development]], and the role of hormones in behaviour — courtship, aggression, parental care and migration — in [[behaviour/mechanisms-of-behaviour]].

::: summary
- Hormones are blood-borne messengers acting at nano- to picomolar concentrations through specific receptors; neurohormones are secreted by neurons into neurohaemal organs.
- Peptides and catecholamines act through cell-surface receptors within seconds to minutes; steroids, thyroid hormones and juvenile hormone act mainly through nuclear receptors on transcription over hours.
- Plasma concentration is secretion divided by metabolic clearance rate; after a change it moves to the new steady state in about 3.3 half-lives for 90 % ([[#prop-kinetics]]). Pulsatile signals require short half-lives.
- Vertebrate endocrine axes run from hypothalamus to pituitary to target gland, with amplification and negative feedback at each level; insects have a convergent brain–corpora cardiaca–prothoracic gland system plus the corpora allata.
- Insulin and glucagon (and in insects insulin-like peptides and adipokinetic hormone) control fuel; thyroid hormones set metabolic rate; growth hormone acts largely through IGF-1.
- Insect moults are triggered by 20-hydroxyecdysone and their type is set by juvenile hormone (high: larval; low: pupal; none: adult); crustaceans add a moult-inhibiting hormone; thyroid hormone drives amphibian metamorphosis.
- Reproduction is controlled by the hypothalamus–pituitary–gonad axis, with a positive-feedback LH surge at ovulation; melatonin and hypothalamic thyroid-hormone conversion time seasonal breeding.
- Hormones and receptors are ancient and have been repeatedly redeployed; synthetic endocrine disruptors such as TBT have had population-level effects.
:::

## Exercises

::: exercise Steady-state concentration {level=1 check="5"}
A steroid hormone is secreted at 100 µg per day and has a metabolic clearance rate of 20 L per day. What is its steady-state plasma concentration in µg L⁻¹?
::: solution
$C_\infty = S/\mathrm{MCR} = 100/20 = 5$ µg L⁻¹.
:::
:::

::: exercise Half-life {level=1 check="6.93"}
A hormone is removed from plasma with a first-order rate constant of 0.10 min⁻¹. What is its half-life in minutes (three significant figures)?
::: solution
$t_{1/2} = \ln 2/k = 0.693/0.10 = 6.93$ min.
:::
:::

::: exercise Classifying hormones {level=1}
For each hormone, state its chemical class and predict whether its receptor is on the cell surface or in the nucleus: (a) glucagon; (b) 20-hydroxyecdysone; (c) adrenaline; (d) thyroxine; (e) juvenile hormone; (f) oxytocin.
::: solution
(a) Peptide: cell-surface GPCR. (b) Steroid: nuclear receptor (EcR–Ultraspiracle). (c) Catecholamine: cell-surface GPCRs (α- and β-adrenergic). (d) Iodinated tyrosine derivative, lipid-soluble: nuclear thyroid hormone receptor (after conversion to T₃ in target cells). (e) Sesquiterpenoid, lipid-soluble: an intracellular receptor (Methoprene-tolerant, a transcription factor of the bHLH–PAS family, rather than a classical nuclear receptor), acting on transcription. (f) Peptide (nonapeptide): cell-surface GPCR.
:::
:::

::: exercise Time to adjust {level=2 check="3.9"}
Cortisol in a mammal has a plasma half-life of about 70 min. How many hours does it take for cortisol to complete 90 % of the change to a new steady state after a step change in secretion (two significant figures)?
::: solution
$3.32 \times 70 = 233$ min, which is 3.9 hours. Cortisol can therefore follow changes over hours, such as the daily rhythm and the response to a stressor, but not minute-to-minute fluctuations.
:::
:::

::: exercise Locating the fault {level=2}
For each case give the most likely site of the fault in the hypothalamus–pituitary–adrenal axis, and explain using negative feedback: (a) low cortisol, high ACTH; (b) low cortisol, low ACTH; (c) high cortisol, low ACTH; (d) high cortisol, high ACTH.
::: solution
(a) The adrenal cortex fails to make cortisol; feedback inhibition is lost, so ACTH rises. (b) The pituitary (or hypothalamus) fails to make ACTH (or its releasing hormone), so the adrenal is not stimulated. (c) The adrenal makes cortisol autonomously (for example a tumour) or cortisol is given as a drug; high cortisol suppresses ACTH. (d) Excess ACTH (from a pituitary tumour or another source) drives the adrenal; feedback fails to suppress it. These patterns are the logic of endocrine diagnosis in medicine ([Medicine Atlas: endocrine](/learn/medicine/course.php?c=endocrine)); here they illustrate how a two-level negative feedback loop behaves when one component is changed.
:::
:::

::: exercise Interpreting a parabiosis experiment {level=2}
Wigglesworth joined pairs of *Rhodnius* nymphs so that their haemolymph mixed. Predict and explain the outcome in each case: (a) a nymph decapitated one hour after feeding, joined to one decapitated eight days after feeding (after its critical period); (b) two nymphs both decapitated one hour after feeding; (c) a final-stage (fifth-instar) nymph joined to a young first-instar nymph shortly before both moult. What do the experiments show?
::: solution
(a) Both moult: the nymph decapitated late has already released the head factor (PTTH), whose action on the prothoracic glands produces moulting hormone that circulates into its partner. (b) Neither moults: neither has received the head factor. (c) The fifth-instar nymph, which would normally moult into an adult, moults into a giant sixth-instar nymph with nymphal characteristics, because juvenile hormone from the young nymph's active corpora allata circulates into it. Together these show that a blood-borne factor released from the head at a particular time after feeding triggers moulting, and that a separate blood-borne factor from the young insect prevents metamorphosis.
:::
:::

::: exercise A hormone in two environments {level=2}
A euryhaline fish is hypophysectomised (pituitary removed). It survives in sea water but dies within days in fresh water, unless it is injected with prolactin. (a) Explain what prolactin does in a freshwater fish, linking to the osmoregulatory problems of fresh water. (b) Why does the hypophysectomised fish survive in sea water? (c) What hormone would you expect to be important for the transfer to sea water?
::: solution
(a) In fresh water the fish must limit the loss of ions and the entry of water and take up ions actively ([[animal-physiology/water-salt-balance]]); prolactin reduces the permeability of the gills and other epithelia to water and ions, promotes the freshwater type of ionocyte, and increases the kidney's output of dilute urine with ion reabsorption. Without it, the fish loses Na⁺ and Cl⁻ faster than it can replace them, and plasma ion concentrations fall to lethal levels. (b) In sea water, prolactin's actions are not needed, and the seawater mode of osmoregulation can run with lower hormonal support (although cortisol, from the interrenal tissue, helps; cortisol secretion becomes low without ACTH, which is why survival in sea water may still be impaired). (c) Cortisol, together with growth hormone and IGF-1, which promote the seawater type of gill ionocyte and the Na⁺/K⁺-ATPase.
:::
:::

::: exercise Designing a test of photoperiodism {level=3}
You suspect that a species of small mammal is a long-day breeder whose reproduction is controlled by melatonin. Design experiments to test (a) that day length controls gonadal growth, (b) that the pineal gland is required, and (c) that the duration of the nightly melatonin signal, rather than its amplitude, is the cue. State the predicted results.
::: solution
(a) House animals under long days (e.g. 16 h light : 8 h dark) and short days (8 : 16) at the same temperature and food; long-day breeders should have large, active gonads in long days and regressed gonads in short days. (b) Remove the pineal gland (with sham-operated controls) in animals kept on short days; if melatonin from the pineal mediates the short-day signal, pinealectomised animals should fail to regress their gonads. (c) In pinealectomised animals, infuse melatonin each day in patterns that differ in duration (e.g. 8 h versus 16 h) at the same peak concentration, and in amplitude at the same duration: if duration is the cue, long-duration infusions should mimic short days (gonadal regression) regardless of amplitude. Experiments of this design were done in Siberian and Syrian hamsters by Bruce Goldman and colleagues in the 1980s, and showed that duration is the critical feature.
:::
:::

::: exercise Interpreting a dose–response to an endocrine disruptor {level=3}
Female dogwhelks were exposed in the laboratory to TBT at concentrations of 0, 1, 3, 10 and 30 ng L⁻¹ (as tin) for a year, and imposex was scored as the mean length of the penis that develops in females (the relative penis size index). The index rose from 0 to values similar to those of males over this range, with clear effects at the lowest concentration. (a) Why are such low effective concentrations surprising for a pollutant and unsurprising for an endocrine disruptor? (b) Field surveys found the highest imposex near marinas and harbours. What other evidence would establish that TBT causes imposex in the field? (c) After TBT was restricted, imposex declined in surveyed populations over the following decade or so. Why might recovery take years?
::: solution
(a) Most toxicants act by non-specific damage and require high concentrations; endocrine disruptors act through receptors and signalling pathways that are designed to respond to nano- to picomolar hormone concentrations, so they can have effects at concentrations of nanograms per litre. (TBT is thought to act partly through the retinoid X receptor, a nuclear receptor, and possibly by altering steroid metabolism; the mechanism has been debated.) (b) A dose–response relation between measured TBT in water, sediment or tissues and imposex across sites; induction of imposex in transplanted or caged animals at contaminated sites and in the laboratory at field concentrations; absence of imposex at clean sites; and, most persuasively, recovery after TBT was removed — a natural experiment. (c) TBT persists in sediments for years and continues to leach; imposex that has already developed in adult females is irreversible, so recovery depends on new generations growing up in cleaner water; and dogwhelks have direct development without a dispersing larval stage, so populations that had disappeared are recolonised only slowly from neighbouring ones.
:::
:::
