Agriculture has always been biotechnology. Every crop is a genetically modified organism in the plain sense: maize differs from its wild relative teosinte by a handful of genes of large effect, selected by farmers over thousands of years; wheat is a hybrid of three genomes; the seedless banana is a sterile triploid clone propagated by cuttings; thousands of modern varieties descend from seeds irradiated or treated with mutagens in the twentieth century, a practice that remains unregulated almost everywhere. What changed in the 1980s was not that crops began to be modified but that a specific gene could be chosen, and that the modification could cross a species boundary.

This chapter covers how plants are transformed, which traits have actually been deployed and how they work, the quantitative population biology of pest and weed resistance that determines whether a trait lasts, and the regulatory frameworks — which differ more between jurisdictions than the science does, and for reasons that are about process rather than product. It assumes plant biology ([[plant-biology/plant-cells-tissues]], [[plant-biology/plant-hormones]]) and the editing tools of [[biotechnology/genome-editing]]. Food safety assessment is discussed here as regulation; nutrition and health belong to Medicine Atlas (/learn/medicine/).

## Why plants are transformed differently

Three features of plants shape the methods.

**Totipotency.** Many plant somatic cells can be induced to regenerate a whole plant, with the balance of auxin and cytokinin in the medium determining whether a callus forms roots, shoots or somatic embryos ([[plant-biology/plant-hormones]]). This is what makes plant transformation possible at all: there is no germ line to target, so a single transformed somatic cell can become a whole plant whose seeds carry the change. It is also the main bottleneck. Delivering DNA is comparatively easy; regenerating a fertile plant from the cell that received it is not, and for decades the species that could be transformed were simply those that could be regenerated. Many important crops — most cereals, most legumes, and elite varieties of nearly everything — were long effectively untransformable for this reason.

**A cell wall.** Naked DNA cannot be delivered by the methods used for animal cells, so plants need either a biological vector that penetrates the wall or a physical method that breaches it.

**Two extra genomes.** Chloroplasts and mitochondria have their own genomes, and the chloroplast genome is present in thousands of copies per cell and is inherited maternally in most species. Transforming it therefore gives very high expression and a form of containment, since the trait is not carried in pollen.

### Agrobacterium: a natural genetic engineer

*Agrobacterium tumefaciens* (now often *Rhizobium radiobacter*) is a soil bacterium that causes crown gall disease by transferring a piece of its own DNA into a plant cell's nucleus, where it integrates and is expressed. The transferred segment, the **T-DNA**, is carried on the large **Ti plasmid** and is defined only by 25 bp **border repeats**; the machinery that excises, exports and integrates it is encoded by *vir* genes elsewhere on the plasmid and does not itself enter the plant. The natural T-DNA encodes enzymes for synthesising auxin and cytokinin (hence the tumour) and for making **opines**, unusual amino acid derivatives which the bacterium can catabolise and the plant cannot — the bacterium genetically engineers the plant to produce food for it.

::: definition T-DNA, disarmed and binary vectors {#def-tdna}
The **T-DNA** is the segment of the Ti plasmid transferred to the plant, delimited by two 25 bp imperfect direct repeats called the left and right **borders**. The proteins that nick the borders, coat the single-stranded T-strand, export it through the bacterial and plant membranes and guide it to the nucleus are encoded by the *vir* operons, which are *not* within the T-DNA and act **in trans**. A **disarmed** vector is one from which the oncogenes and opine-synthesis genes have been deleted, leaving the borders and the transfer machinery intact. A **binary vector** system separates the two functions onto two plasmids in the same *Agrobacterium* cell: a small, high-copy plasmid carrying the engineered T-DNA between its borders, which can be built and verified in *E. coli* ([[biotechnology/recombinant-dna]]), and a resident helper plasmid supplying the *vir* functions. Integration into the plant genome then occurs at essentially random positions by non-homologous end joining ([[molecular-biology/dna-repair-recombination]]), which is why each transformation gives a different **event**.
:::

The engineering consequence was recognised at once: because the T-DNA is defined by its borders and its mobilisation machinery is separate, **anything placed between the borders is transferred instead**. Disarmed vectors remove the tumour and opine genes, and **binary vectors** split the system into a small plasmid carrying the engineered T-DNA, easy to manipulate in *E. coli*, and a helper plasmid in the *Agrobacterium* supplying the *vir* functions. The first transgenic plants were made this way in 1983 by three groups independently, and *Agrobacterium* remains the dominant method.

### Other delivery methods

- **Biolistics** ("the gene gun", John Sanford and colleagues, 1987) accelerates DNA-coated microparticles into tissue. It works in species *Agrobacterium* infects poorly — which historically meant the cereals — and is the standard route for chloroplast transformation. It tends to produce complex, multi-copy insertions.
- **Protoplast transformation.** Removing the wall enzymatically gives protoplasts that take up DNA with polyethylene glycol or electroporation. Regenerating a plant from a protoplast is difficult in most species, but the method is important for genome editing, because the editing reagents can be delivered as protein and RNA that leave no DNA behind.
- **Floral dip**, in which *Arabidopsis* inflorescences are immersed in an *Agrobacterium* suspension and transformed seed is recovered directly, bypasses tissue culture entirely and is one reason *Arabidopsis* became the model plant.
- **Haploid induction and other breeding routes** can move an edit or a transgene into elite varieties without transforming them, and developmental regulators co-delivered with the construct can greatly extend the range of transformable genotypes.

### Markers, copy number and event selection

Transformation produces **events**: independent insertions differing in copy number, integration site, expression level, and whether they disrupt an endogenous gene. Hundreds of events are generated and screened to find one that expresses the trait stably, carries a single insertion, segregates as a single Mendelian locus, and shows no agronomic penalty. That selected event is then introgressed into many varieties by conventional crossing — so the commercial product of a transformation programme is a *single* event, bred into dozens of backgrounds over years.

::: definition Event, introgression and stacking {#def-event}
An **event** is one independent integration, identified by the exact junction sequences between insert and plant genome; it is the unit that is characterised, named and regulated, and a regulatory approval is an approval of an event, not of a trait or a construct. **Introgression** is the transfer of an approved event from the line in which it arose into other varieties by repeated backcrossing and selection. **Stacking** combines several events in one variety, either by crossing already-approved events together or by inserting several genes in one T-DNA; most commercial maize varieties now carry a stack of insect-resistance and herbicide-tolerance events. Because events are regulated individually, a stack of approved events may still require its own authorisation in some jurisdictions, on the ground that interactions between events have to be assessed.
:::

Selectable markers (kanamycin resistance from *nptII*, herbicide tolerance from *bar*, hygromycin resistance from *hpt*) are needed to recover the rare transformed cell. Because a marker in a food crop attracts objection and contributes nothing after selection, marker-free strategies are used: co-transformation with the marker on a separate, unlinked T-DNA so that it segregates away in the progeny; or excision of the marker by a site-specific recombinase.

::: example Introgression and segregation arithmetic {#ex-introgression}
(a) A transformation event is recovered in an easily transformed but agronomically poor line and must be moved into an elite variety by backcrossing. What fraction of the genome is the elite (recurrent) parent's after each backcross, and how many are needed to exceed 99 %? (b) Marker and trait genes are co-transformed on unlinked T-DNAs, giving a plant hemizygous for both. If it is self-fertilised, what fraction of progeny carries the trait and lacks the marker? (c) Why might the actual fraction be much lower?
::: solution
(a) Each backcross halves the donor contribution, so after $n$ backcrosses the recurrent fraction is $1 - (1/2)^{n+1}$: 75 % after one, 87.5 %, 93.8 %, 96.9 %, 98.4 %, and 99.2 % after six. Six backcrosses, plus selfing to fix the transgene in homozygous form and the generations needed for testing, is why a decade from transformation to a commercial variety is normal. Marker-assisted selection shortens the process by letting the breeder choose, at each generation, the individual whose donor segments are smallest.

(b) For unlinked loci the trait is present in 3/4 of progeny and the marker absent in 1/4, independently, so $3/4\times1/4 = 3/16 = 19$ % carry the trait without the marker. Screening a few dozen progeny is therefore ample.

(c) Because the two T-DNAs are not reliably unlinked. Co-transformation often inserts both at the same genomic location, since the integration events are not independent — a cell competent to integrate one T-DNA frequently integrates several at one site. The two then co-segregate completely and no marker-free progeny appear at all, which is why events must be screened for genuine segregation rather than assumed to show it.
:::
:::

::: example Chloroplast expression and the limits of maternal containment {#ex-plastid}
A plastid-encoded transgene sits in a genome present at roughly 10,000 copies per leaf cell, against two copies for a nuclear gene, and plastid-expressed proteins have been reported at tens of per cent of total soluble leaf protein. (a) Why does copy number not translate straightforwardly into that much protein? (b) In a species where paternal plastid transmission occurs at a frequency of about $10^{-5}$, a transgenic field pollinates a wild relative population that sets $10^{5}$ outcrossed seeds a year. How many carry the transgene? (c) Over 20 years? (d) What does this say about describing plastid transformation as "containment"?
::: solution
(a) Because transcription and translation capacity, not template number, limit expression once templates are abundant — the same shared-resource argument as in [[biotechnology/synthetic-biology]]. Plastid expression is high because the plastid has its own strong promoters, no introns or nuclear export to negotiate, and a protease environment that tolerates accumulation, not because 10,000 is 5000 times 2. The practical ceiling is set by how much foreign protein the plastid can accumulate before photosynthesis suffers.

(b) $10^{5}\times10^{-5} = 1$ seed per year.

(c) About 20 seeds, assuming the rate is constant — and if the trait carries no fitness cost in the wild, each is an independent opportunity for establishment, so the relevant number is not the frequency per pollination but the total over the deployment's lifetime across the whole planted area. Scaling to a thousand hectares and twenty years turns "one in a hundred thousand" into tens of thousands of events.

(d) That containment of this kind is a rate reduction, not a barrier, and should be quoted as a rate with the exposure it will be multiplied by. A reduction of four or five orders of magnitude is genuinely valuable — it may turn a near-certainty into a rare event — but a statement that a trait "cannot" escape through pollen is wrong, and the arithmetic above is the reason regulators ask for leakage frequencies rather than mechanisms.
:::
:::

## Traits, and how they work

### Insect resistance

*Bacillus thuringiensis* is a soil bacterium that makes crystalline protein toxins (**Cry** proteins) during sporulation. Preparations of its spores have been used as a sprayed insecticide since the 1920s, including in organic agriculture. The mechanism explains the specificity on which the whole approach rests: the protein is ingested, solubilised in the alkaline midgut of a susceptible insect, cleaved by midgut proteases to an active form, and then binds specific receptor proteins on the midgut epithelium, where it oligomerises and forms pores that destroy the gut lining. All four steps are required, and the receptor-binding step is highly taxon-specific — different Cry proteins act on Lepidoptera, Coleoptera or Diptera, and an insect lacking the receptor is unaffected. Mammalian digestion is acidic and mammalian gut cells carry no such receptor.

Expressing a *cry* gene in the plant puts the toxin where the pest feeds, including inside stems and roots that a spray cannot reach, and removes it from everything that does not eat the crop. The agronomic record, reviewed at length by the US National Academies in 2016, is that insect-resistant maize and cotton reduced insecticide applications and raised yields where the target pests were a significant constraint, with smaller or no benefit where they were not.

### Herbicide tolerance

The largest deployed trait by area is tolerance to a broad-spectrum herbicide, allowing weeds to be controlled after the crop has emerged. Glyphosate inhibits EPSP synthase in the shikimate pathway, which plants and many microbes need to make aromatic amino acids and which animals lack; tolerance is conferred by expressing a bacterial EPSP synthase variant that the herbicide does not inhibit. Glufosinate inhibits glutamine synthetase, and tolerance comes from an enzyme that acetylates and inactivates it. Herbicide tolerance does not raise yield potential — it changes weed management, and its documented effects are on labour, on the mix of herbicides used, and on the adoption of reduced tillage, with consequences for soil erosion that are generally favourable and for herbicide resistance in weeds that are not.

### Virus resistance, quality traits and edited crops

Virus resistance was among the first successes: expressing a viral coat protein, or an RNA that triggers RNA interference against the virus, gives strong protection. Papaya resistant to papaya ringspot virus, developed in the public sector and released in Hawaii in 1998, saved the industry there and remains one of the clearest cases of a transgenic crop solving a problem that had no other solution.

Quality traits use the same tools to switch *off* a plant gene: antisense or RNAi suppression of polygalacturonase for slower softening (the Flavr Savr tomato of 1994), of polyphenol oxidase for non-browning apples, of an asparagine-forming enzyme to lower the acrylamide formed when potatoes are fried. Nutritional engineering is harder because it requires a pathway rather than a knockdown: Golden Rice, in which two genes complete the β-carotene pathway in the endosperm (Xudong Ye, Ingo Potrykus, Peter Beyer and colleagues, 2000), took two decades from proof of concept to biosafety approval for commercial propagation in the Philippines in 2021, and its deployment has since been subject to legal challenge.

Genome editing has added traits with no foreign DNA in the final plant: waxy maize with a starch-synthesis gene knocked out, tomatoes with raised γ-aminobutyric acid, non-browning mushrooms, and disease-resistance traits made by removing susceptibility genes. These are the crops whose regulatory status differs most between countries.

## Will the trait last? The population biology of resistance

A trait that kills a pest imposes selection on it, and the pest's response is the main determinant of how long the trait remains useful. This is applied evolutionary biology ([[population-genetics/selection-models]]) and it is where the quantitative reasoning of this chapter lies.

::: proposition The high-dose/refuge strategy {#prop-refuge}
Suppose resistance to a Bt toxin is conferred by a single recessive allele at frequency $q$, and the crop expresses enough toxin that heterozygotes die ("high dose"). Let a proportion $r$ of the planted area be a **refuge** of non-toxic host plants, in which all genotypes survive, and suppose adults mate at random across the whole area.

Before selection, genotype frequencies are Hardy–Weinberg. In the Bt area only the $RR$ homozygotes survive, a proportion $q^{2}$; in the refuge all survive. Weighting the survivors by area and counting resistance alleles, the allele frequency in the next generation is

$$
q' = \frac{(1-r)\,q^{2} + r\,q}{(1-r)\,q^{2} + r} .
$$ {#eq-refuge}

While $q$ is small, the numerator and denominator are dominated by the refuge terms and $q' \approx q\,[1 + (1-r)q/r]$: the per-generation increase is proportional to $q$ itself, so resistance spreads *quadratically slowly* while it is rare. The strategy works because of the conjunction of three conditions — resistance recessive, a dose high enough to kill heterozygotes, and a refuge large enough to supply susceptible mates — and it fails if any one of them does not hold. If resistance is not fully recessive, surviving heterozygotes in the Bt area make the increase proportional to $q$ rather than $q^{2}$, and the delay collapses.

Pyramiding two toxins with different receptors multiplies the requirement: an insect must carry resistance alleles at both loci, and if each is at frequency $10^{-3}$ the double homozygote has frequency $10^{-12}$ under random mating. This is the same argument as for combination therapy against a pathogen, and it has the same failure mode — if one toxin is deployed alone anywhere, resistance to it rises and the pyramid is reduced to a single toxin.
:::

::: example How long does a refuge buy? {#ex-refuge}
Take $q_0 = 10^{-3}$ and iterate [[#eq-refuge]]. (a) With $r = 0.20$, how many generations until $q$ reaches 0.01, 0.1 and 0.5? (b) With $r = 0.05$? (c) Interpret the shape of the trajectory. (d) What does the model omit that matters in the field?
::: solution
(a) Iterating numerically: $q$ reaches 0.01 after 228 generations, 0.1 after 254, and 0.5 after 258.

(b) With a 5 % refuge: 50, 57 and 59 generations respectively — about four times faster.

(c) Nearly all the time is spent in the first factor of ten. At $q = 10^{-3}$ and $r = 0.2$ the per-generation increase is a factor of 1.004, so almost nothing happens for two hundred generations; once $q$ reaches a few per cent the increase accelerates and the last two orders of magnitude take thirty generations. Resistance is therefore invisible until shortly before it is catastrophic, which is exactly why monitoring programmes measure *allele frequency* in sentinel populations rather than waiting for field failures.

(d) A great deal: non-random mating (if resistant adults emerge later, or disperse less far than the refuge spacing, assortative mating removes the refuge's benefit); fitness costs of resistance in the absence of toxin, which slow its spread; incomplete dose, so that heterozygotes partly survive; multiple pest species with different susceptibilities; migration between regions with different practices; and compliance — a refuge that farmers do not plant does not exist. Documented cases of field resistance to Bt crops have generally followed from failures of these conditions rather than from a flaw in the principle.
:::
:::

::: widget cobweb
g: ((1-r)*x^2 + r*x)/((1-r)*x^2 + r)
sliders: r=0.2:0.02:0.6:0.02
x0: 0.001
steps: 400
caption: The resistance recursion [[#eq-refuge]] over 400 generations. On the left, the cobweb: the curve is $q' = g(q)$, the diagonal is $q' = q$, and the staircase is the orbit starting from an allele frequency of $10^{-3}$. On the right, the same orbit against generation number, which shows the shape that matters — the frequency lies on the floor for about 250 generations and then rises almost vertically to fixation at $q = 1$, the only stable state. A refuge delays resistance; it does not prevent it, and it gives almost no warning. Reduce the refuge fraction $r$ with the slider and the curve lifts away from the diagonal, moving the cliff sharply to the left.
:::

The same logic applies to weeds under herbicide tolerance, with two differences that make the outcome worse. Herbicide resistance in weeds is often dominant or semi-dominant, so the quadratic protection of recessiveness does not apply; and the selection is applied to an enormous, genetically variable population with a long-lived seed bank. The consequence was predictable and was predicted: widespread adoption of a single herbicide across tens of millions of hectares selected resistant weed populations within a decade or two, and the response — stacking tolerance to several herbicides with different modes of action — buys time on the same combination principle, with the same vulnerability.

::: warning "Resistance proves the technology failed" and "resistance can be engineered away" are both wrong
Resistance evolution is the expected consequence of applying strong selection to a large population; it happened with every chemical insecticide and every fungicide long before transgenes, and it will happen with whatever replaces them. The useful questions are quantitative: how long does the trait last, what does the delay cost in refuge area or in stacked genes, and what is the value of the years bought? Equally, resistance cannot be engineered away permanently, because each new toxin or herbicide is a new selection pressure. Durability is managed — by dose, refuges, pyramids, rotation and monitoring — or it is lost; and management requires that most growers in a region comply, which makes it a problem of institutions as much as of biology.
:::

## Gene flow and coexistence

Transgenes move in pollen and in seed. Whether this matters depends on the crop's biology and on what threshold has been set.

::: example Pollen-mediated gene flow and a labelling threshold {#ex-geneflow}
Outcrossing from a transgenic maize field to a neighbouring conventional one declines steeply with distance; take, as an illustrative fit to the published pattern, an outcrossing frequency $p(d) = 0.08\,e^{-d/25}$ with $d$ in metres. (a) What is the frequency at the field edge, at 50 m and at 100 m? (b) The grain must contain less than 0.9 % transgenic material to be sold as conventional. What isolation distance does the model require at the edge, and why is the field-average figure much lower? (c) Which crops pose least and most difficulty, and why?
::: solution
(a) $p(0) = 8$ %, $p(50) = 0.08e^{-2} = 1.1$ %, $p(100) = 0.08e^{-4} = 0.15$ %.

(b) Setting $0.08e^{-d/25} = 0.009$ gives $d = 25\ln(0.08/0.009) = 25\times2.19 = 55$ m for the *edge* rows. But the threshold applies to the harvested lot, which averages over the whole field: with the frequency falling by a factor of $e$ every 25 m, almost all of the transgenic content is in the first few tens of metres, so a field 500 m across has an average far below the edge value — of the order of a tenth of it. Isolation distances in regulation are set from field-average models of this kind, which is why they are tens rather than hundreds of metres for most crops, and why the shape of the field matters as much as its distance from the neighbour.

(c) Least difficulty: self-pollinating crops with no wild relatives in the region, and crops harvested before flowering (potato, most vegetatively propagated crops). Most difficulty: wind-pollinated outcrossers with large pollen dispersal (maize, oilseed rape), crops with sexually compatible wild relatives nearby (oilseed rape and wild *Brassica*, rice and weedy rice, sorghum and *Sorghum halepense*), and perennials. Chloroplast transformation helps because plastids are maternally inherited in most species and so are not carried in pollen — though at a leakage rate of order $10^{-5}$, which over millions of plants is not zero.
:::
:::

Seed-mediated flow — volunteer plants from spilled seed, admixture in shared harvesting and storage equipment — is in practice the larger source of adventitious presence, and is managed by procedure rather than by distance.

::: quiz
A trait is to be deployed in oilseed rape, which is partly outcrossing and has sexually compatible wild relatives in the region. Which design choice most reduces the chance of the trait establishing in wild populations?
- [ ] Use a weaker promoter so the trait is expressed at a lower level.
- [x] Put the trait in the chloroplast genome, so that it is not transmitted through pollen.
- [ ] Increase the isolation distance from 50 m to 200 m.
- [ ] Use a marker-free construct.
::: solution
Establishment in a wild relative requires transmission by pollen to that relative, and plastid transformation removes almost all of that route, since plastids are maternally inherited in this family. It is not perfect — paternal leakage occurs at low frequency — but it changes the rate by orders of magnitude, which is what "most reduces" asks for. Expression level and marker status do not affect transmission at all. Greater isolation distance reduces flow to neighbouring *crops* but does very little about wild relatives, which grow at road verges and field margins everywhere and are not confined to a measured distance. The remaining consideration, which no construct design settles, is whether the trait would confer any advantage in the wild: a trait with a fitness cost outside cultivation will not spread even if it is transmitted.
:::
:::

## Regulation

The deepest division in the field is not scientific but legal: whether to regulate the **product** or the **process**.

- The **United States** operates a product-based Coordinated Framework (1986), under which existing agencies assess the plant, the food and any pesticidal trait by their properties, and a plant whose modification could have been achieved by conventional breeding may be exempt from pre-market review. The 2020 SECURE rule made that exemption explicit for certain genome-edited plants.
- The **European Union** regulates by process: Directive 2001/18/EC covers any organism in which genetic material has been altered in a way that does not occur naturally, requires authorisation with a full dossier, and imposes traceability and labelling above 0.9 % adventitious presence. In 2018 the Court of Justice confirmed that organisms produced by directed mutagenesis — including genome editing — fall within the Directive, while organisms from older chemical and radiation mutagenesis remain exempt; a legislative proposal to treat certain "new genomic techniques" differently has been under negotiation since 2023.
- **Canada** regulates novelty: a plant with a novel trait is assessed whatever technique produced it, which is the most logically consistent of the three and the least imitated.
- Others have moved case by case: **Argentina** was first, in 2015, to set out a procedure for deciding whether an edited plant counts as a GMO; **Japan** allows notification rather than authorisation for edits with no foreign DNA, under which a high-GABA tomato was marketed in 2021; the **United Kingdom**'s Genetic Technology (Precision Breeding) Act 2023 creates a separate, lighter regime for organisms whose changes could have arisen from traditional breeding.
- Internationally, the **Cartagena Protocol on Biosafety** (in force 2003) governs transboundary movement of living modified organisms and enshrines a precautionary approach, with advance informed agreement for intentional releases.

The assessment itself is broadly common across jurisdictions. It asks what was inserted and where; whether the insert is stable over generations; what the new protein is, whether it resembles known toxins or allergens in sequence, how it behaves on digestion and heating; whether the plant's composition is altered beyond the natural range of the crop (**substantial equivalence**, which is a comparator-based framework and not a claim of identity); and what the environmental consequences are for non-target organisms, gene flow and resistance management. The cost of assembling such a dossier — tens of millions of US dollars and several years for a transgenic event — has a structural effect that is often overlooked: it restricts development to crops with large markets and to organisations that can finance it, which is one reason there are engineered traits in maize, soya, cotton and oilseed rape and almost none in the crops grown mainly by poor farmers.

::: application Who decides, and who benefits
Three debates run alongside the technical one and are not resolved by it. **Ownership.** Transgenic events and the techniques for making them are patented, and seed may be sold under agreements restricting replanting; the US Supreme Court upheld such restrictions in *Bowman v. Monsanto* (2013). Patents on varieties sit uneasily with the older plant variety protection system, which preserved a farmer's privilege to save seed, and with the customary rights recognised in the International Treaty on Plant Genetic Resources. **Concentration.** The cost of regulatory approval and of the intellectual property together favour a small number of large firms, and the resulting concentration of the seed industry is a legitimate concern about the political economy of agriculture, logically distinct from any question about the safety of the plants. **Choice and labelling.** Where consumers wish to avoid these products, the machinery of identity preservation, thresholds and testing has real costs, and whether labelling conveys information about risk or about process is contested; the US "bioengineered food" disclosure (from 2022) and the EU's 0.9 % labelling threshold answer the question differently.

Public-sector and humanitarian projects exist and are instructive about what the constraints really are: virus-resistant papaya in Hawaii, Bt brinjal (aubergine) released in Bangladesh from 2013, virus-resistant cassava and banana, and Golden Rice. Their histories show that the binding constraint is rarely the biology and usually the cost of approval, the strength of the opposition, and the availability of a delivery system that reaches smallholders. Broader questions about land use, biodiversity and agricultural policy are taken up in [[conservation-biology/people-and-policy]].
:::

::: widget plot
f: 0.08*exp(-x/25); 0.02*exp(-x/10)
x: 0, 150
y: 0, 0.09
labels: \text{maize (illustrative)}; \text{a less dispersive crop (illustrative)}
hlines: 0.009
caption: Illustrative models of pollen-mediated outcrossing frequency against distance from the source field, in metres, with the 0.9 % labelling threshold marked. Both curves are exponential fits chosen to show the shape of the published pattern and are not measurements: real dispersal has a long tail that decays more slowly than an exponential, so these curves underestimate flow at large distances. Read off where each crosses the threshold, and note that the crossing distance changes by a factor of two between the two curves while the edge frequency changes by a factor of four — isolation distance is far less sensitive to the parameters than the edge frequency is.
:::

::: history
Plant genetic engineering followed quickly from the discovery of how *Agrobacterium* works. The Ti plasmid was identified as the agent of crown gall by Jeff Schell and Marc Van Montagu's group in Ghent and by Mary-Dell Chilton's group in 1974–1977, and the transfer of bacterial DNA into the plant genome was established soon after. In 1983 three laboratories independently reported transgenic plants: Luis Herrera-Estrella with Van Montagu and Schell, Robert Fraley and colleagues at Monsanto, and Michael Bevan with Richard Flavell and Chilton, all using disarmed T-DNA to put a selectable marker into tobacco. John Sanford's particle gun followed in 1987, extending the method to cereals. The first commercial genetically engineered whole food was Calgene's Flavr Savr tomato, cleared in the United States in 1994; herbicide-tolerant soya and insect-resistant cotton and maize were planted commercially from 1996, and the global area rose over two decades to about 190 million hectares by 2019, the last year for which the ISAAA global survey was published. Dennis Gonsalves's virus-resistant papaya was released in Hawaii in 1998. Xudong Ye, Ingo Potrykus and Peter Beyer published Golden Rice in 2000. The Cartagena Protocol on Biosafety entered into force in 2003. Genome-edited crops began to reach markets in the 2010s and 2020s — waxy maize, the high-GABA tomato in Japan in 2021 — under regulatory regimes that are still diverging.
:::

::: summary
- Plant transformation exploits totipotency: a single transformed somatic cell can regenerate a whole plant. Regeneration, not DNA delivery, has historically been the limiting step.
- *Agrobacterium* transfers T-DNA defined only by border repeats, with mobilisation functions supplied in trans — hence disarmed and binary vectors. Biolistics, protoplasts and floral dip cover what *Agrobacterium* does not; chloroplast transformation gives high expression and maternal inheritance.
- Transformation yields many **events**; one is selected for single-copy, stable, Mendelian behaviour and then introgressed by backcrossing, which leaves $1-(1/2)^{n+1}$ of the elite genome after $n$ backcrosses.
- Deployed traits: Bt insect resistance (whose specificity rests on alkaline activation and taxon-specific receptor binding), herbicide tolerance (an insensitive or detoxifying enzyme; it changes weed management rather than yield potential), virus resistance by coat protein or RNAi, quality traits by gene suppression, and nutritional traits requiring whole pathways.
- Resistance evolution governs durability. Under high-dose/refuge with recessive resistance, $q' = [(1-r)q^2+rq]/[(1-r)q^2+r]$ ([[#eq-refuge]]): resistance creeps while rare and then rises fast, so monitoring must measure allele frequencies. The strategy fails if resistance is not recessive, the dose is not high, or the refuge is not planted; pyramiding multiplies the requirement.
- Gene flow falls steeply with distance; thresholds apply to harvested lots, so field-average flow, crop mating system and the presence of compatible wild relatives decide the difficulty.
- Regulation divides into product-based (United States), process-based (European Union) and novelty-based (Canada) frameworks, with genome-edited crops the main point of divergence. The cost of approval shapes which crops and which traits get developed, which is a political rather than a scientific constraint.
:::

## Exercises

::: exercise Backcrossing {level=1 check="0.9844"}
What fraction of the genome derives from the recurrent parent after five backcrosses? Four decimal places.
::: solution
$1-(1/2)^{6} = 1 - 0.015625 = 0.9844$.
:::
:::

::: exercise Marker segregation {level=1 check="0.1875"}
A plant is hemizygous for a trait gene and, at an unlinked locus, for a selectable marker. On self-fertilisation, what fraction of progeny carries the trait and lacks the marker?
::: solution
$3/4\times1/4 = 3/16 = 0.1875$.
:::
:::

::: exercise Why Bt is selective {level=1}
List the four steps required for a Cry protein to kill an insect, and say which one accounts for its narrow host range.
::: solution
Ingestion; solubilisation in an alkaline midgut; proteolytic activation by midgut proteases; and binding to a specific receptor on the midgut epithelium, followed by pore formation. The receptor-binding step accounts for the narrow range: related insects lacking the receptor are unaffected, and the specificity of different Cry proteins for Lepidoptera, Coleoptera or Diptera is a specificity of binding. (The alkaline requirement also matters, and is why acidic mammalian digestion does not activate the protein.)
:::
:::

::: exercise One generation of resistance {level=2 check="1.009"}
With $q = 0.001$ and a refuge fraction $r = 0.1$, compute the per-generation multiplication factor $q'/q$ from [[#eq-refuge]], to three decimal places. Then repeat for a non-recessive case in which heterozygotes also survive in the Bt area, and comment.
::: solution
Recessive case. Numerator: $0.9\times10^{-6} + 0.1\times10^{-3} = 1.009\times10^{-4}$. Denominator: $0.9\times10^{-6} + 0.1 = 0.1000009$. So $q' = 1.00899\times10^{-3}$ and the factor is $q'/q = 1.009$ — a 0.9 % increase per generation.

Non-recessive case. Now the survivors in the Bt area are $q^{2}+2pq = 0.001999$ of the insects, and because almost all of them are heterozygotes, half of their alleles are $R$: the allele frequency among Bt-area survivors is $(q^{2}+pq)/(q^{2}+2pq) = 0.500$. Weighting by area,

$$
q' = \frac{0.9\times0.001999\times0.500 + 0.1\times0.001}{0.9\times0.001999 + 0.1} = \frac{0.001000}{0.1018} = 0.0098 ,
$$

a factor of **9.8 per generation** instead of 1.009. One generation of non-recessive selection accomplishes what a thousand generations of recessive selection would, because the toxic area kills nearly everything and what survives there is half resistance alleles. This contrast — three orders of magnitude in rate from a single genetic detail — is the central quantitative point of the section, and it is why the "high dose" half of high-dose/refuge is not optional.
:::
:::

::: exercise Pyramiding {level=2 check="1e-12"}
Two Bt toxins with independent receptors are expressed in the same plant, and resistance to each is recessive at a single locus with allele frequency $10^{-3}$. Under random mating and linkage equilibrium, what is the frequency of insects resistant to both?
::: solution
Resistance to one toxin requires homozygosity, frequency $(10^{-3})^{2} = 10^{-6}$; resistance to both requires both, $10^{-6}\times10^{-6} = 10^{-12}$. The practical warning is that this number is only as good as its assumptions: a single locus conferring resistance to both toxins (cross-resistance through a shared receptor or a shared protease), or linkage disequilibrium between the two loci, or prior selection that has already raised one allele's frequency, each destroys the calculation. Cross-resistance is checked experimentally before two toxins are called a pyramid.
:::
:::

::: exercise Isolation distance {level=2 check="55"}
Using $p(d) = 0.08e^{-d/25}$, find the distance in metres at which edge outcrossing falls to 0.9 %. Round to the nearest metre.
::: solution
$d = 25\ln(0.08/0.009) = 25\times\ln 8.889 = 25\times2.185 = 55$ m.
:::
:::

::: exercise Reading a regulatory divergence {level=2}
A tomato is made by editing out a susceptibility gene; no foreign DNA remains, and the same loss-of-function allele exists in a wild relative. Describe how it would be treated in a product-based, a process-based and a novelty-based system, and state which treatment you find most defensible and why.
::: solution
Product-based (United States): the change could plausibly have been obtained by conventional breeding or by crossing in the wild allele, so the plant is likely exempt from pre-market review, and the food is assessed as any other tomato. Process-based (European Union): the plant was produced by a technique within the Directive's scope, so it is a GMO regardless of the outcome, requiring full authorisation, traceability and labelling — whereas the identical allele introduced by chemical mutagenesis or by crossing would be exempt. Novelty-based (Canada): the question is whether the trait is novel for this crop; since the allele exists in a relative and the trait is loss of a susceptibility function, it may well not be, and assessment would be proportionate to the novelty.

A defensible answer argues for the novelty- or product-based treatment on the ground that risk is a property of what an organism is and does, not of the laboratory technique that produced it — the strongest evidence for which is that the process-based system exempts the far less precise and much more extensively mutagenic older techniques. The counter-argument, which must be acknowledged, is that process-based regulation is also doing work that is not about risk: it provides a traceable basis for consumer choice and a clear trigger for review, and a purely product-based system has to decide, somehow, which products deserve a look.
:::
:::

::: exercise A durability plan {level=3}
You are deploying a single-toxin Bt crop in a region where the target pest has two generations a year, resistance is partially dominant, and no second toxin is available. Design a durability strategy, estimate the delay it buys, and state what you would monitor.
::: solution
Partial dominance is the critical fact: heterozygotes survive in the toxic crop, so the increase in $q$ is first-order rather than second-order and the refuge's protection is greatly weakened. The strategy must therefore attack dominance directly and accept a shorter life for the trait.

Measures: (i) raise the dose as far as the plant permits — if expression can be increased, or the toxin targeted to the tissue the larvae feed on, until heterozygotes die, the quadratic protection of [[#prop-refuge]] is restored, and this is worth more than any other single change; (ii) a large refuge, 20–50 % rather than 5–20 %, since with dominance the refuge's job is to dilute resistant alleles in a much larger susceptible population; (iii) refuge placement close enough to ensure random mating between refuge and crop adults, which the dispersal distance of the species dictates; (iv) rotation in space and time with non-Bt crops and with chemical control using an unrelated mode of action, so that selection is not applied every generation; (v) regional compliance, since a refuge strategy is a commons and defectors capture its benefit while imposing the cost.

Delay: with full recessiveness and a 20 % refuge, [[#ex-refuge]] gives of order 250 generations, about 125 years at two generations a year. With partial dominance and the same refuge, the per-generation increase at $q = 10^{-3}$ becomes of order 1 % to tens of per cent rather than 0.4 %, so the delay falls to decades or less — any number quoted should be presented as an order of magnitude from an explicit model, not as a prediction.

Monitor: baseline and annual resistance allele frequency in field-collected insects, by bioassay of offspring (an $F_2$ screen detects recessive alleles far more sensitively than assaying field-caught adults); toxin expression in the crop across the season and across tissues, since dose declines as plants age; refuge compliance by survey; and reports of unexpected damage, which are a late and unreliable indicator and should never be the primary signal.
:::
:::

::: exercise Evaluating an evidence claim {level=3}
A review states that "insect-resistant maize reduced insecticide use and raised yields, while herbicide-tolerant soya did not raise yields". (a) Explain mechanistically why both halves can be true. (b) What confounders make such comparisons hard? (c) What study design would you want?
::: solution
(a) Insect resistance protects yield that was previously lost to the pest, so where pest pressure is high the trait converts potential yield into realised yield, and the toxin replaces sprays. Herbicide tolerance does not alter the plant's yield potential or protect it from a yield-reducing agent; it makes weed control cheaper, simpler and better timed. Where weeds were already controlled adequately, there is no yield to recover — so the benefit appears as labour, fuel, tillage and flexibility rather than as yield.

(b) Confounders: adoption is not random — farmers who adopt differ in capital, skill and region; the transgenic trait arrives in the newest and best germplasm, so the comparison is between an elite variety plus the trait and an older variety without it, confounding trait and background; pest and weed pressure vary enormously between years and sites, and the benefit of insect resistance exists only when the pest is present; and management changes alongside the trait, so the intervention being measured is a package.

(c) The near-isogenic comparison: the same variety with and without the event, grown in paired plots across many sites and several years, with pest and weed pressure measured rather than assumed, and with management held constant where that is meaningful and recorded where it is not. Field-scale and farm-survey data are then needed in addition, since plot trials cannot capture labour, tillage or regional effects such as the suppression of a pest population across a whole landscape — an effect which, where it has been documented, benefits non-adopting neighbours and is invisible in any paired comparison.
:::
:::
