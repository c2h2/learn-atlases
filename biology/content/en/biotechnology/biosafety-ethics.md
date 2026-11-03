In July 1974 eleven scientists, including several who had just invented recombinant DNA, published a letter in *Science* asking their colleagues to stop doing certain experiments. The following February about 140 researchers, lawyers and journalists met at Asilomar in California and agreed that the work should resume under containment matched to the risk each experiment was judged to carry. Nothing quite like it had happened in science before, and the episode still frames how this field is governed: the practitioners acted first, the regulators codified what they proposed, and the resulting system is one of graded containment and institutional review rather than prohibition.

Fifty years later the technical capabilities are vastly greater and the governance questions have multiplied. This chapter treats them in three parts, because they are genuinely different problems that are often conflated. **Biosafety** is about accidental harm: protecting workers, the public and the environment from unintended release. **Biosecurity** is about deliberate misuse, and raises the hardest problem in the field, that the same knowledge which enables defence can enable harm. **Ethics** is about what ought to be done even when it is safe and legal: who decides, who benefits, who bears the risk, what may be done to animals, to ecosystems and to the human germ line.

The treatment here is conceptual and institutional. It explains how risk is assessed and how containment is structured in principle, the quantitative reasoning that makes risk arguments checkable, and the treaties, policies and review bodies that apply. It contains no procedures. Where a technique raises dual-use concerns, this chapter describes the governance and says nothing about method; the restraint is itself part of the subject. Clinical applications are Medicine Atlas (/learn/medicine/); the ecological context of release is [[conservation-biology/people-and-policy]].

## Biosafety: assessing and containing risk

::: definition Hazard, exposure and risk {#def-risk}
A **hazard** is the intrinsic capacity of an agent or activity to cause harm. **Exposure** is the opportunity for that capacity to be realised. **Risk** combines the two — informally, risk is a function of the probability of an adverse event and the magnitude of its consequences — and the practical significance of the distinction is that hazard is a property of the agent while exposure is a property of the work, so **risk is reduced by changing the work**.

Formal risk assessment in biosafety has four steps, imported from toxicology and adapted: identify the hazard; characterise the relationship between dose or exposure and effect; assess the exposure the activity actually creates; and characterise the resulting risk, including the uncertainty in each of the preceding steps. The last clause matters more here than in most fields, because the quantities are often unknown to within orders of magnitude and a risk assessment that conceals that is worse than none.
:::

::: definition Risk groups and containment levels {#def-containment}
The World Health Organization and national authorities classify biological agents into four **risk groups**, by four criteria: pathogenicity for humans or animals, the mode and ease of transmission, host range, and the availability of effective preventive or therapeutic countermeasures. Risk Group 1 agents are unlikely to cause disease; Group 2 can cause disease but are unlikely to be a serious hazard and effective countermeasures exist; Group 3 cause serious disease and may spread but countermeasures usually exist; Group 4 cause serious disease, spread readily and lack established countermeasures.

**Biosafety levels** (BSL-1 to BSL-4) are the corresponding combinations of practice, equipment and facility design. They are built from three kinds of barrier:

- **primary containment**, which separates the material from the worker — the equipment and the handling practices immediately around the work;
- **secondary containment**, which separates the facility from everything outside it — directional airflow, filtration of exhaust air, sealed surfaces, controlled access, and validated inactivation of waste;
- **administrative controls** — training, documented procedures, medical surveillance where appropriate, incident reporting, and institutional review of what work may be done at all.

The assignment of an activity to a level is not read off from the agent alone. A risk assessment considers what is being done with it, in what quantity, by whom, and with what equipment; the same agent may warrant different handling in a diagnostic laboratory and in a production plant. For engineered organisms the assessment asks additionally what the modification does to each of the four criteria, and whether the host strain is a disabled laboratory derivative — which is why most recombinant work with *E. coli* K-12 sits at the lowest level ([[biotechnology/recombinant-dna]]).
:::

Within a modified organism, two further ideas carry much of the weight. **Biological containment** builds the limitation into the organism: a laboratory strain unable to survive outside defined conditions, an auxotroph dependent on a nutrient supplied only in the laboratory, a plasmid that cannot replicate in other hosts, a trait placed in a maternally inherited genome ([[biotechnology/agricultural-biotechnology]]). **Synthetic auxotrophy** and **codon recoding** ([[biotechnology/synthetic-biology]]) are engineered versions of the same idea whose escape frequencies can be measured, which is their chief virtue: a safeguard with a number attached can be argued about.

::: example What an escape frequency has to be {#ex-escape}
An engineered strain carries a synthetic auxotrophy whose measured escape frequency — the proportion of cells that acquire the ability to grow without the supplied nutrient — is $10^{-11}$ per cell per generation. A production vessel of 100 m³ holds about $10^{11}$ cells per litre. (a) How many cells are in the vessel, and how many escapers does the measured frequency imply? (b) What escape frequency would leave fewer than ten? (c) What does this say about the role of genetic containment? (d) Why is a measured escape frequency still worth much more than a mechanistic argument?
::: solution
(a) $100\ \mathrm{m^{3}} = 10^{5}$ L, so about $10^{16}$ cells, and $10^{16}\times10^{-11} = 10^{5}$ escapers — a hundred thousand cells in the vessel that are no longer contained by the genetic safeguard.

(b) $10/10^{16} = 10^{-15}$, four orders of magnitude better than the measured figure, and at or beyond the limit of what can be *verified*: demonstrating a frequency of $10^{-15}$ requires observing more than $10^{15}$ cells without an escape.

(c) That genetic containment is a supplement to physical containment and to validated inactivation of waste, never a substitute. The quantity that matters is the escape frequency multiplied by the number of cells and generations, exactly as in [[#ex-aggregate]], and industrial cell numbers are so large that no achievable frequency reduces the expected number of escapers to zero. Genetic containment earns its place by covering the failure modes physical containment does not — spillage, aerosol, a mistake in waste handling — not by making those failures harmless.

(d) Because it is falsifiable and comparable. A mechanistic argument ("this strain cannot survive outside the fermenter") cannot be wrong by a specific amount, so it cannot be improved, compared with an alternative, or used in a risk calculation. A number can be remeasured by someone else, combined with an exposure estimate, and shown to be insufficient — which is why regulators and reviewers ask for frequencies and why the engineered containment strategies of [[biotechnology/synthetic-biology]] represented a real advance over the disabled laboratory strains that preceded them.
:::
:::

### Barriers multiply — until they do not

::: proposition Independent and correlated barriers {#prop-barriers}
If $n$ barriers must all fail for a release to occur, and each fails independently with probability $p_i$, the probability of release per activity is

$$
P = \prod_{i=1}^{n} p_i ,
$$ {#eq-barriers}

which for identical barriers is $p^{n}$ and falls very fast with $n$ — three barriers at $p = 0.01$ give $10^{-6}$. This multiplication is the entire logic of layered containment.

The assumption of independence is where such calculations go wrong. A **common-cause failure** disables several barriers at once: a power loss stops the airflow and the alarms together; a procedural shortcut adopted because it saves time defeats the practice-based barriers simultaneously; a single untrained worker is upstream of every barrier that depends on being used correctly; a misidentified sample means the whole assessment was for the wrong agent. If barriers share a cause that occurs with probability $p_c$, then

$$
P \approx \prod_i p_i + p_c ,
$$ {#eq-common-cause}

and for small independent terms the second term dominates completely. The practical consequence is that beyond a handful of barriers, adding another one changes almost nothing, while reducing the common-cause rate — training, culture, independent review, designing systems that fail safe — changes everything. Documented laboratory releases have overwhelmingly involved failures of this correlated kind rather than the simultaneous independent failure of well-designed barriers.
:::

::: example Aggregating a small risk over a large enterprise {#ex-aggregate}
Suppose a particular class of work carries a release probability of $10^{-4}$ per laboratory per year. (a) What is the probability of at least one release if 100 laboratories do this work for ten years? (b) For $10^{-5}$ per year? (c) What does this imply about how a per-experiment risk should be reported? (d) Why is the arithmetic insufficient for a decision?
::: solution
(a) The number of laboratory-years is $100\times10 = 1000$, so $P(\text{at least one}) = 1-(1-10^{-4})^{1000} = 0.095$, about one chance in ten.

(b) $1-(1-10^{-5})^{1000} = 0.010$, one chance in a hundred.

(c) That a per-experiment or per-laboratory-year figure is close to meaningless on its own. The quantity relevant to a policy decision is the expected number of events across the whole enterprise and its intended lifetime, which is the per-unit rate multiplied by the exposure; and since the exposure grows as a capability spreads, a rate that was acceptable for three specialist laboratories may not be acceptable for three hundred. Risk assessments that quote a per-experiment probability without the exposure it will be multiplied by are, for this reason, routinely misleading.

(d) Because the consequence term is missing, and for the events in question it is not a number anyone can supply with confidence: the harm from a release ranges over many orders of magnitude depending on the agent, and the distribution's tail — not its mean — is what the decision is about. Expected-value reasoning, which multiplies a small probability by a best-guess consequence, is reasonable for repeated decisions with bounded losses and is contested for one-off decisions with unbounded ones. This is the formal core of the disagreement between those who argue from expected value and those who argue from precaution, and it is a disagreement about decision theory rather than about biology.
:::
:::

::: widget plot
f: 1-(1-0.001)^(10^x); 1-(1-0.0001)^(10^x); 1-(1-0.00001)^(10^x)
x: 0, 5
y: 0, 1.05
labels: p = 10^{-3}; p = 10^{-4}; p = 10^{-5}
hlines: 0.5
caption: The probability of at least one adverse event against the number of exposures on a logarithmic scale ($x = \log_{10}n$), for three per-exposure probabilities. The three curves are the same shape shifted sideways: each factor of ten in $p$ buys one decade of exposure and nothing more. A per-experiment risk of $10^{-5}$ is reassuring for a hundred experiments and not for a hundred thousand, which is the whole argument of [[#ex-aggregate]] in one picture — and the reason safety arguments must state the exposure they assume.
:::

::: warning Biosafety levels are not a property of an organism
It is common to hear that an agent "is BSL-3", as though the level were a label attached to the species. It is not: risk groups classify agents, biosafety levels describe the containment of an *activity*, and the mapping between them is the output of a risk assessment that considers what is being done, at what scale, with what equipment, by people with what training. The same agent may be handled at different levels for different procedures, and an engineered organism derived from a harmless host may warrant more containment than its parent if the modification changes any of the four classification criteria. Conversely, containment chosen by reference to a label rather than to an assessment tends to be simultaneously excessive in the ways that are visible and inadequate in the ways that are not.
:::

## Biosecurity and dual-use research

::: definition Dual-use research and dual-use research of concern {#def-durc}
**Dual-use research** is legitimate research that could be misapplied to cause harm. The category is enormous and mostly unremarkable: almost all of microbiology, immunology and pharmacology is dual-use in this broad sense. **Dual-use research of concern** (DURC) is the much smaller subset that, by current policy definitions, could be *directly* misapplied to pose a significant threat to public health, agriculture, the environment or security, and therefore warrants review and risk management beyond ordinary biosafety.

Policy definitions turn on categories of *outcome* rather than on technique: broadly, research that would be expected to enhance the harmful consequences of an agent, render an effective countermeasure ineffective, confer resistance to therapeutics, increase transmissibility or alter host range, or otherwise make an agent substantially more dangerous. The 2004 report of the US National Research Council committee chaired by Gerald Fink — *Biotechnology Research in an Age of Terrorism* — first set out such a list and recommended that experiments falling into it be reviewed before being undertaken, by the researcher's own institution in the first instance. The United States adopted institutional and funding-agency DURC policies in 2012 and 2014, created a separate review framework for research on potential pandemic pathogens in 2017, and consolidated both into a single policy issued in 2024 that took effect in 2025. Other countries, and the WHO through its 2022 global guidance framework for responsible use of the life sciences, have developed parallel arrangements.
:::

Three episodes shaped these arrangements and are worth knowing as governance history. In 2001 Australian researchers reported, as an incidental finding of work on rodent fertility control, that inserting an immune-signalling gene into a mouse poxvirus made it lethal to vaccinated mice — the first widely discussed case in which a published result bore obviously on the effectiveness of a countermeasure. In 2005 the 1918 influenza virus was reconstructed from sequence recovered from preserved tissue, which prompted debate about whether the sequence and the organism should have been published and distributed at all. In 2011 and 2012 two groups submitted papers on the transmissibility of an avian influenza virus in mammals; a US advisory board initially recommended against full publication, the researchers adopted a voluntary moratorium, the papers were eventually published after review, and the controversy led to a pause in US funding for certain experiments between 2014 and 2017 and then to the framework mentioned above. In each case the substance of the dispute was not whether the science was interesting but whether publishing it, or doing it, created more risk than benefit — and in each case reasonable people reached opposite conclusions from the same facts.

::: intuition Why the information problem has no clean solution
Physical materials can be locked up; knowledge cannot. Four asymmetries make biosecurity structurally harder than, say, the control of fissile material. The knowledge is overwhelmingly general: the same understanding of how a pathogen causes disease underpins the vaccine and the threat. It is distributed: tens of thousands of competent laboratories exist, in every country, and most of the relevant techniques are taught to graduate students. It is cumulative and published: science works by disclosure, and the benefits of openness — reproducibility, criticism, cumulative progress, equitable access — are not incidental to it but constitutive. And the defensive and offensive applications are often indistinguishable in intent at the bench, so the distinguishing feature is purpose, which is not visible in a protocol.

The consequence is that governance cannot rest on secrecy. It rests instead on a layered and admittedly imperfect set of measures: norms internalised through training, institutional review before work begins, funder conditions, publication-stage review for a very small number of cases, screening at material and information chokepoints such as the suppliers of synthetic DNA, export controls on specified equipment and agents, and the international legal prohibition. Each layer is porous; the argument for them is cumulative and probabilistic, like the barrier argument of [[#prop-barriers]], and subject to the same warning about correlated failure.
:::

### Chokepoints and screening

One place where a technical measure has real purchase is the commercial supply of synthetic nucleic acids. Providers that join the International Gene Synthesis Consortium (founded 2009) screen both the sequences ordered and the customers ordering them against reference lists, and successive US guidance documents (2010, revised 2023) and a 2023 Executive Order have made such screening a condition of federally funded purchasing. The same logic has been extended, as of 2026, to benchtop synthesis devices and — with much more argument about feasibility — to biological design tools, where developers and policymakers have begun to require evaluation of models for the risk that they lower barriers to harm.

::: example The statistics of screening a rare target {#ex-screening}
Suppose one order in $10^{5}$ is one a screening system should flag, the system detects 95 % of those it should, and it wrongly flags 1 order in 1000 of the rest. (a) Of the orders flagged, what fraction genuinely warrant concern? (b) What would specificity have to be for that fraction to reach a half? (c) What does this imply for how screening should be designed?
::: solution
(a) By Bayes' theorem, with prevalence $10^{-5}$, sensitivity 0.95 and false-positive rate $10^{-3}$:

$$
P(\text{true}\mid\text{flagged}) = \frac{10^{-5}\times0.95}{10^{-5}\times0.95 + (1-10^{-5})\times10^{-3}} = 0.0094 ,
$$

about **1 in 106**. Ninety-nine of every hundred flags are false.

(b) Setting the posterior to 0.5 requires the false-positive rate to fall to about $10^{-5}$ — a hundred-fold improvement in specificity, with sensitivity unchanged.

(c) Three things. First, a screening system's value cannot be judged by its sensitivity alone: at a low prevalence, the workload and the credibility of the system are governed by its specificity, which is exactly the lesson of diagnostic screening ([[biostatistics/categorical-data]]). Second, flags must feed into expert human review rather than automatic refusal, because at 1 % precision automatic action would be mostly wrong and would quickly be circumvented or abandoned. Third, the system should be understood as raising the cost and the detection probability of misuse rather than as a barrier: like every other layer here, it shifts a rate and does not close a door.
:::
:::

::: widget bayes
mode: test
prevalence: 0.00001
sensitivity: 0.95
specificity: 0.999
caption: The screening calculation of [[#ex-screening]] drawn as natural frequencies: out of a large number of orders, how many are truly of concern, how many of those are flagged, and how many flags come from the vastly larger population of ordinary orders. Move the specificity slider upward and watch the proportion of true positives among flags climb — and note how far the specificity must go before flags are more often right than wrong. This is the generic behaviour of any test for a rare condition, and it applies unchanged to screening sequences, screening customers and screening for anomalies in laboratory records.
:::

### The international framework

The **Biological Weapons Convention** (opened for signature 1972, in force 1975) prohibits the development, production, stockpiling and acquisition of biological and toxin weapons, and was the first treaty to ban an entire class of weapons. It has over 185 states parties as of 2026 and, uniquely among the major arms-control treaties, **no verification mechanism**: negotiations on a verification protocol ran through the 1990s and collapsed in 2001, and the Convention operates through review conferences, confidence-building measures and an Implementation Support Unit of a handful of staff. UN Security Council Resolution 1540 (2004) obliges states to adopt domestic controls against non-state acquisition, and the Australia Group coordinates export controls on specified agents and equipment. National implementation varies widely, and strengthening the Convention — through verification, through greater capacity in developing countries, or through science advice mechanisms — is a standing item that successive review conferences have not resolved.

## Releasing engineered organisms: the case of gene drives

Deliberate release of an organism designed to spread through a wild population is the hardest case in the field, because it combines ecological irreversibility with a genuine prospect of large public-health benefit, and because the affected population spans jurisdictions that no single regulator covers.

::: proposition How fast a homing drive spreads {#prop-drive}
A **gene drive** is a genetic element that is inherited by more than half of an individual's offspring. A homing drive carries a nuclease that cuts the homologous chromosome at the corresponding site and is copied into it by homology-directed repair ([[biotechnology/genome-editing]]), so a heterozygote transmits the drive allele to a fraction $(1+c)/2$ of its gametes, where $c$ is the **conversion efficiency**.

For a drive with no fitness cost in a randomly mating population, the drive allele frequency $q$ evolves as

$$
q' = q^{2} + q(1-q)(1+c) ,
$$ {#eq-drive}

since homozygotes transmit $q^2$ worth of drive alleles and heterozygotes, of frequency $2q(1-q)$, transmit them at rate $(1+c)/2$. At $c = 0$ this reduces to $q' = q$, Mendelian inheritance, as it must. At $c = 0.9$ and $q = 0.01$, $q' = 0.019$: the drive almost doubles in frequency each generation while rare, and reaches near-fixation from 1 % in about ten generations.

The contrast with the refuge model of [[biotechnology/agricultural-biotechnology]] is instructive: there, selection acting on a recessive allele produced a quadratic creep lasting hundreds of generations, while here a drive produces exponential increase from the first generation. The practical implications follow directly. A drive is **threshold-independent** if it spreads from arbitrarily low frequency, so that a small number of released individuals — or a few migrants — can transform a whole interbreeding population; adding a fitness cost $s$ introduces a frequency **threshold** below which the drive is lost, converting it into a local, confinable intervention. The engineered confinement strategies — split drives in which the nuclease and the guide are separated so that spread stops when they segregate, daisy-chain drives in which each element drives the next and the chain exhausts itself, and drives designed with high thresholds — are all ways of buying back the reversibility that an efficient drive removes. Resistance arises from the same mechanism as in [[#prop-drive]]'s premise: an end-joining repair that destroys the target site without copying the drive creates an allele the drive cannot convert, and such alleles are strongly favoured if the drive imposes a cost.
:::

::: widget cobweb
g: x^2 + x*(1-x)*(1+c)
sliders: c=0.9:0:0.99:0.01
x0: 0.01
caption: The homing-drive recursion [[#eq-drive]] as a cobweb: the curve is $q' = g(q)$, the diagonal is $q' = q$, and the staircase is the drive allele's frequency starting from a 1 % release. At $c = 0.9$ the orbit climbs to fixation within about ten steps. Now move the conversion efficiency $c$ down to zero: the curve settles onto the diagonal and the frequency stops changing at all, because a drive with no conversion is just an ordinary allele. The model has no fitness cost and no resistance, both of which are essential to any real assessment — this figure shows the upper bound on the speed, not a prediction.
:::

::: example Designing the monitoring {#ex-monitoring}
After a confined release, you must be able to detect the drive allele in a neighbouring population before it becomes common. Assume you can genotype sampled insects reliably and that the population is large. (a) How many alleles must you sample for a 95 % chance of detecting an allele present at 1 %? (b) At 0.1 %? (c) How many diploid insects is that? (d) What practical considerations make the real requirement larger?
::: solution
(a) The chance of missing an allele at frequency $q$ in $n$ sampled alleles is $(1-q)^{n}$, so $n = \ln(0.05)/\ln(1-q)$. At $q = 0.01$, $n = 298$.

(b) At $q = 0.001$, $n = 2994$ — ten times as many for one more order of magnitude of sensitivity, which is the generic $1/q$ behaviour.

(c) About 150 and 1500 insects respectively, since each contributes two alleles at the locus.

(d) Several. Sampling is not random over space: insects are collected at traps, which sample some habitats and age classes much more than others, so the effective sample is smaller than the count. The drive may be spatially clustered near the release area, in which case a design that spreads effort uniformly wastes most of it, while one concentrated near the source detects early spread and says little about distant populations — the two objectives need different designs. Assay errors matter at these frequencies: at $q = 0.001$ a false-positive rate of $10^{-3}$ per allele produces as many spurious detections as real ones, which is [[#ex-screening]] again. And detection has to be fast enough to act on: by the time a drive at $c = 0.9$ reaches 1 % it is roughly five generations from being common ([[#prop-drive]]), so a monitoring programme whose results arrive a season late provides a record rather than a safeguard.
:::
:::

The governance that has grown up around this is unusually deliberate. The WHO's guidance framework for testing genetically modified mosquitoes (2014, revised 2021) sets out a phased pathway from laboratory to contained field trials to staged open release, with defined decision points. The Convention on Biological Diversity has adopted decisions calling for case-by-case risk assessment and for the prior and informed consent or approval of potentially affected indigenous peoples and local communities. The IUCN undertook a multi-year assessment of synthetic biology in conservation. Underlying all of it is a problem no technical measure resolves: a drive released in one country spreads into others, so consent must be obtained from communities and states that did not propose the release, through institutions that were not designed for the purpose.

## Ethics

The ethical questions divide into a few recurring families, and the useful skill is recognising which one an argument belongs to.

**Consequences and precaution.** A consequentialist assessment weighs expected benefits against expected harms, which requires both to be estimated — and, as [[#ex-aggregate]] showed, the estimates are often unavailable where they matter most. The **precautionary principle**, in the form adopted in the Rio Declaration (1992) and the Cartagena Protocol, holds that a lack of full scientific certainty should not be a reason to postpone measures where there is a threat of serious or irreversible harm. Its strong versions attract the objection that they are asymmetrical — inaction also has consequences, and a principle that attends only to the risks of acting would have blocked many interventions now regarded as obviously beneficial — and that, applied consistently, they can be paralysing. Its defenders answer that the asymmetry is appropriate precisely where harms are irreversible and the burden of proof should lie with the party proposing the change. Both positions are coherent; what is not coherent is applying one to a technology one dislikes and the other to one that one favours.

**Who decides, and who bears the risk.** The benefits of a biotechnology often accrue to those who can pay for it, while the risks of release fall on those who live where it is released; the populations affected by a vector-control programme, a field trial or a production plant are rarely the ones who proposed it. This is a question of justice rather than of safety, and it is why consultation, consent and benefit-sharing have become central to governance rather than peripheral. Public engagement conducted as a **deficit model** — in which the public is assumed to object because it is uninformed, and the remedy is explanation — has a consistent record of failure; engagement that treats values and priorities as legitimate inputs, and that is able to change what is done, does better.

**Access and ownership.** The Nagoya Protocol (in force 2014) requires that benefits from the use of genetic resources be shared with the countries providing them, in response to a long history of uncompensated collection; whether and how this extends to **digital sequence information**, which can be used without physically moving any material, has been among the most contested questions in the Convention on Biological Diversity. In parallel, the patent system has had to decide what in biology is an invention: *Diamond v. Chakrabarty* (US Supreme Court, 1980) held that a living engineered bacterium was patentable subject matter, and *Association for Molecular Pathology v. Myriad Genetics* (2013) held that isolated natural DNA sequences were not, while cDNA was. The protracted disputes over CRISPR patents, and the restrictions that intellectual property places on research and on access in low-income countries, have driven a substantial open-source and patent-pooling movement.

**Animals.** Research with animals is governed by the **3Rs** framework of William Russell and Rex Burch (1959) — replacement of animal use where possible, reduction of the numbers used, refinement to reduce suffering — implemented through licensing and ethical review in most jurisdictions. Engineering animals raises additional questions: welfare consequences of the modification itself, the large numbers of animals generated and discarded in producing a line, the status of animals engineered to carry human genes or tissues, and, for engineered food animals, consumer acceptance and environmental release. Approvals have been granted sparingly — a fast-growing salmon in 2015 and a pig engineered to lack a particular surface sugar in 2020, in the United States — and each took many years.

**The human germ line.** A broad international consensus distinguishes **somatic** editing, which affects only the treated person and is assessed like other interventions, from **heritable** editing of embryos or gametes, which affects descendants who cannot consent. International summits in 2015 and 2018, the 2020 report of the international commission convened by the US National Academies and the UK's Royal Society, and the WHO's 2021 governance framework all concluded that heritable human genome editing should not proceed at present; the 2020 report set out the narrow circumstances and the evidentiary standards that would have to be met before it could be considered, and emphasised that they are not currently met. The birth in 2018 of twins from edited embryos, carried out without adequate justification, consent or oversight, was condemned internationally and resulted in a criminal conviction. The arguments in play are not only about safety: they concern the significance of consent across generations, the line between treatment and enhancement, equity of access to a technology that would act on inheritance, and the objection — pressed most forcefully by disability-rights scholars — that framing certain human variations as defects to be edited out carries a judgement about the people who have them. Clinical aspects belong to Medicine Atlas.

::: quiz
A research group proposes a field release of a threshold-independent gene drive to suppress a disease vector in one country. Which objection is the most specific to the threshold-independent design, as distinct from objections to engineered release in general?
- [ ] The organism might have unintended effects on non-target species.
- [x] The drive will not stay within the territory of the consenting state, so consent cannot be obtained from everyone affected.
- [ ] The modification might impose a welfare cost on the modified animals.
- [ ] The programme's benefits may not reach the poorest communities.
::: solution
All four are real objections, but three of them apply to any engineered release, and indeed to many conventional interventions. What is distinctive about threshold independence is that spread from arbitrarily low frequency means a handful of migrating individuals suffices to establish the drive in a neighbouring population: the intervention's footprint is the species' interbreeding range, not the released area, and it cannot be recalled. That is what makes the consent problem structural rather than administrative, and it is why confinable designs — split drives, daisy chains, high-threshold drives — are treated as a precondition for early field work rather than as an optional refinement.
:::
:::

::: application What a researcher actually encounters
In practice the framework reaches a working scientist as a series of concrete requirements. Work with recombinant organisms is registered with an institutional biosafety committee, which assigns a containment level after a written risk assessment; in the United States this follows the NIH Guidelines, in the European Union the contained-use Directive 2009/41/EC, and elsewhere comparable national instruments. Specified agents and toxins are subject to registration, personnel screening and inventory control. Any deliberate release — a field trial, a clinical application, an environmental study — needs a separate authorisation under a release regime such as Directive 2001/18/EC, with transboundary movements governed by the Cartagena Protocol. Animal work requires a licence and ethical review under the 3Rs. Work with human subjects or human material requires research ethics committee approval and informed consent. Grant applications ask whether the work falls within dual-use policies, and institutions are expected to review those that do. Commercial synthesis providers screen orders. Export of certain organisms and equipment is controlled. None of this is onerous for routine work, and the common failure mode is not refusal but delay: the assessments must be done before the work starts, and a project planned without them loses months.
:::

::: history
The governance of this field has been built in response to events. The Biological Weapons Convention opened for signature in 1972 and entered into force in 1975. The letter of Paul Berg and colleagues calling for a voluntary moratorium on certain recombinant DNA experiments appeared in 1974; the Asilomar conference met in February 1975 and produced the graded-containment approach that the US National Institutes of Health codified in 1976 and that spread internationally. Russell and Burch had set out the 3Rs for animal research in 1959. The 1978 escape of smallpox virus from a laboratory in Birmingham, which caused one death, and the 2007 release of foot-and-mouth disease virus from a site at Pirbright, traced to drainage infrastructure, each prompted national reviews and lasting changes to facility requirements. The Cartagena Protocol on Biosafety was adopted in 2000 and entered into force in 2003. The Fink report on dual-use research appeared in 2004, and UN Security Council Resolution 1540 the same year. Negotiations on a verification protocol for the Biological Weapons Convention collapsed in 2001. The influenza transmissibility controversy of 2011–2012 led to a US funding pause from 2014 to 2017 and then to a dedicated review framework. The Nagoya Protocol entered into force in 2014. International summits on human genome editing met in 2015, 2018 and 2023; the 2018 case of edited human embryos led to condemnation, a criminal conviction, the 2020 international commission report and the WHO's 2021 governance framework. US guidance on screening orders for synthetic nucleic acids was issued in 2010 and substantially revised in 2023, and attention turned in the mid-2020s to benchtop synthesis and to the governance of biological design tools.
:::

::: summary
- Biosafety (accidental harm), biosecurity (deliberate misuse) and ethics (what ought to be done) are distinct problems with distinct instruments; conflating them produces bad arguments in all three.
- Risk combines hazard and exposure. Hazard belongs to the agent, exposure to the activity, so risk is managed by changing the work. Risk groups classify agents on pathogenicity, transmissibility, host range and countermeasures; biosafety levels describe the containment of activities, assigned by assessment rather than by label.
- Independent barriers multiply ([[#eq-barriers]]), but common-cause failures dominate once there are a few ([[#eq-common-cause]]): beyond a handful of layers, reducing correlated failure — training, culture, independent review, fail-safe design — matters more than adding another layer.
- A per-experiment risk is meaningless without the exposure it will be multiplied by: $10^{-4}$ per laboratory-year is a 9.5 % chance of an event across a thousand laboratory-years. Expected-value reasoning and precaution disagree about tail risks, which is a disagreement in decision theory, not in biology.
- Dual-use governance is defined by categories of outcome, not technique, and rests on layered, porous measures: norms, institutional and funder review, limited publication-stage review, screening at supply chokepoints, export controls, and the Biological Weapons Convention — which has no verification mechanism.
- Screening for rare targets is dominated by specificity: at a prevalence of $10^{-5}$, 95 % sensitivity and a $10^{-3}$ false-positive rate give about 1 % precision, so flags must feed expert review rather than automatic action.
- A homing drive follows $q' = q^{2}+q(1-q)(1+c)$ ([[#eq-drive]]): exponential increase from the first generation, near-fixation from 1 % in about ten generations at $c = 0.9$. Threshold independence makes the footprint the species' range, which is why confinable designs and international consent mechanisms are preconditions for field work.
- Recurring ethical families: consequences against precaution; who decides and who bears the risk; access, benefit-sharing and ownership; animal welfare under the 3Rs; and the somatic–germline distinction, where the international consensus is that heritable human genome editing should not proceed at present.
:::

## Exercises

::: exercise Three barriers {level=1 check="1e-6"}
Three independent containment barriers each fail with probability 0.01 per activity. What is the probability that all three fail?
::: solution
$0.01^{3} = 10^{-6}$.
:::
:::

::: exercise Aggregate exposure {level=1 check="0.095"}
With a release probability of $10^{-4}$ per laboratory-year, what is the probability of at least one release over 1000 laboratory-years? Three decimal places.
::: solution
$1-(1-10^{-4})^{1000} = 1 - e^{-0.1}$ to good approximation $= 0.095$.
:::
:::

::: exercise Drive transmission {level=1 check="0.95"}
A homing drive has conversion efficiency $c = 0.9$. What fraction of a heterozygote's gametes carry the drive allele?
::: solution
$(1+c)/2 = 1.9/2 = 0.95$.
:::
:::

::: exercise Where to spend the safety budget {level=2}
A facility has four independent barriers failing at $10^{-2}$ each, and an estimated common-cause failure rate of $10^{-4}$ per year. You can either add a fifth barrier at $10^{-2}$ or halve the common-cause rate, at equal cost. (a) Compute the release probability in each case. (b) Which do you choose? (c) Under what circumstances would the other choice be right?
::: solution
(a) Currently $P \approx 10^{-8} + 10^{-4} = 1.0001\times10^{-4}$. Adding a barrier: $10^{-10} + 10^{-4} = 1.0000\times10^{-4}$ — no measurable change. Halving the common cause: $10^{-8} + 5\times10^{-5} = 5.001\times10^{-5}$ — a halving of the total.

(b) Halve the common-cause rate. The independent term is already four orders of magnitude below the correlated one and contributes nothing.

(c) If the common-cause estimate were wrong by orders of magnitude in the optimistic direction — say the true rate were $10^{-9}$ — the independent term would dominate and the extra barrier would matter. That is an argument for improving the *estimate* before spending on either, and in general for treating the common-cause rate as the quantity whose uncertainty drives the decision. A second circumstance: if a regulator or an insurer requires a specified number of barriers, the fifth barrier buys compliance rather than safety, and the two should not be confused in the justification.
:::
:::

::: exercise Reading a drive trajectory {level=2 check="0.0665"}
Iterate [[#eq-drive]] with $c = 0.9$ from $q = 0.01$ for three generations. Give $q$ after the third generation to four decimal places.
::: solution
$q_1 = 0.0001 + 0.01\times0.99\times1.9 = 0.0189$; $q_2 = 0.000357 + 0.0189\times0.9811\times1.9 = 0.0356$; $q_3 = 0.001268 + 0.0356\times0.9644\times1.9 = 0.0665$. The frequency is multiplying by about 1.9 per generation while rare, which is the exponential regime; the growth slows only as $q$ approaches 1 and heterozygotes become scarce.
:::
:::

::: exercise Screening precision {level=2 check="0.087"}
A screening system has sensitivity 0.99 and a false-positive rate of $10^{-4}$, and the prevalence of orders that should be flagged is $10^{-5}$. What fraction of flagged orders is a true positive? Three decimal places.
::: solution
$P = (10^{-5}\times0.99)/(10^{-5}\times0.99 + (1-10^{-5})\times10^{-4}) = 9.9\times10^{-6}/1.0899\times10^{-4} = 0.0908$, about 9 %. A ten-fold improvement in specificity over [[#ex-screening]] has raised precision from 1 % to 9 %: the relation is close to linear in the false-positive rate while that term dominates, which tells you how much specificity improvement is needed to reach any given precision.
:::
:::

::: exercise Classifying an argument {level=2}
For each statement, say which ethical family it belongs to and what evidence or argument would bear on it. (a) "This release should not proceed until we can be sure it is reversible." (b) "The communities affected were not consulted." (c) "The sequence came from plants collected in another country without agreement." (d) "The modification causes the animals chronic discomfort."
::: solution
(a) Precaution — specifically a strong version placing the burden of proof on the proposer and attaching special weight to irreversibility. What bears on it: evidence about reversibility (confinable designs, thresholds, removal strategies), the magnitude and probability of the harms avoided by acting, and the harms of delay, which a consistent application must also count.

(b) Procedural justice and consent. What bears on it: who is within the affected population, what consultation occurred, whether it could have changed the decision, and whether the institutions used have standing with those communities. Note that this objection is not answered by showing the release is safe.

(c) Access and benefit-sharing, under the Nagoya Protocol and the Convention on Biological Diversity — with the live question of whether sequence information alone falls within those instruments. What bears on it: the provenance of the material, the agreements in place, and the terms on which benefits are shared.

(d) Animal welfare, assessed under the 3Rs and the applicable licensing regime. What bears on it: welfare assessment of the modified animals, whether the scientific aim could be met by replacement or refinement, and the numbers of animals involved including those generated in establishing the line.
:::
:::

::: exercise Designing a confinable field trial {level=3}
You must test a drive intended to suppress an insect vector. Propose a phased plan from laboratory to field, say what each phase is meant to establish, and identify the point at which the decision stops being technical.
::: solution
A plan consistent with the WHO phased framework: (1) **contained laboratory** work on a non-driving or split construct, establishing conversion efficiency, fitness cost, the rate at which resistant alleles arise, and the stability of the construct over many generations; (2) **large laboratory or indoor cage** populations, which test whether the drive behaves as modelled in a population rather than in single crosses, and in particular whether resistance emerges and halts suppression — the commonest failure in published cage trials; (3) **contained outdoor cages** in the receiving region, using local insect genotypes, since conversion efficiency and fitness cost both depend on genetic background; (4) **small open release of a confinable construct** — a split drive, a daisy chain or a high-threshold drive — designed so that the element is expected to disappear if release stops, which tests ecology and monitoring methods while retaining reversibility; (5) **staged open release**, with pre-agreed monitoring, decision points and stopping rules; (6) **post-release surveillance** over years, including of non-target species and of the ecological role the vector played.

Running alongside, and not after: ecological assessment of what suppressing the species would do to its predators, competitors and the pathogens it carries; regulatory authorisation in each jurisdiction; and the consent process with affected communities, which must begin before the trial is designed, because its outcome may change the design.

The decision stops being technical at the transition to phase 4, and arguably earlier. Everything up to contained outdoor cages is a question about whether the drive works, which evidence can settle. Open release asks whether a change to a shared environment should be made, which depends on how the affected people weigh the disease burden against an irreversible ecological intervention — and no amount of laboratory data determines that weighing. Presenting phase 4 as a technical milestone, to be approved once the data are good enough, is the characteristic error.
:::
:::

::: exercise Evaluating a publication-stage dilemma {level=3}
A manuscript reports a finding that would materially help the design of countermeasures against a pathogen and that also bears directly on how the pathogen's harmfulness could be increased. (a) What options exist between full publication and suppression? (b) What considerations would you weigh? (c) Why do reasonable people reach opposite conclusions, and what does that imply about where the decision should be made?
::: solution
(a) Options include: full publication; publication of the conclusions with specified details withheld and made available to qualified researchers on request; publication after a delay during which countermeasures are developed or defences strengthened; referral to a national or international advisory body for review; redesign of the work so that the result can be obtained without the sensitive element; and — the option that is easy to forget and often the best — review *before* the work is done, so that the dilemma does not arise at the publication stage, where every available choice is bad.

(b) The magnitude and specificity of the uplift the publication would give to someone seeking harm, against the magnitude and breadth of the benefit; whether the information is already available or readily rederived, which usually makes withholding futile; whether withholding is technically possible, given that methods sections are only part of how knowledge spreads; the precedent set for the norms of open publication, including for researchers in countries without access to restricted channels; and the credibility cost of a decision that looks arbitrary.

(c) Because the two sides weigh incommensurable quantities under deep uncertainty: nobody can estimate the probability of misuse, and nobody can estimate the benefit forgone. Disagreement is therefore not a sign that one party has misunderstood the science. The institutional implication is that such decisions should not rest with a single actor — not the author, not one journal editor, not one funder — but with a process that is specified in advance, involves people with relevant expertise and relevant disagreements, is applied consistently across cases, and is accountable and reviewable afterwards. The strongest practical conclusion from the episodes of 2001, 2005 and 2011–2012 is that the review has to happen at the design stage, and that governance which only engages at publication has already failed.
:::
:::
