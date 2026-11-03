A teaspoon of garden soil holds more bacterial cells than there are people on Earth, and a millilitre of sea water from near the surface holds about a million bacteria and ten times as many viruses. None of them can be seen with the naked eye. For almost all of human history this invisible majority of life was unknown, and its effects — fermentation, decay, fertile soil, infectious disease — were explained by vital forces, bad air or the will of the gods. Microbiology began when lenses became good enough to see microbes, and became a science when people learned to grow them one kind at a time and to prove what each kind does.

This chapter introduces the organisms that microbiologists study, the experiments by which they were discovered and their activities established, and the methods used to observe, count, culture and identify them today. Its quantitative theme is counting: almost every measurement in microbiology starts from a count of cells or colonies, and the Poisson distribution tells us how far such counts can be trusted. The cell biology of microbes is the subject of [[microbiology/microbial-cells]], their growth of [[microbiology/microbial-growth]], and the survey of prokaryotic lineages is in [[diversity-of-life/bacteria-archaea]].

## What is a microbe?

"Microbe" and "microorganism" are not taxonomic terms. They group organisms by a single property — being too small to be seen individually without a microscope — and so cut across the tree of life.

::: definition Microorganism {#def-microbe}
A **microorganism** (microbe) is an organism, or an infectious agent, that is studied individually only with a microscope, usually because it is smaller than about 0.1 mm. The term covers all **Bacteria** and **Archaea**; among eukaryotes, the unicellular and simple multicellular **fungi** (yeasts and moulds), **protists** (protozoa and unicellular algae) and microscopic algae; and the acellular **viruses** and other subviral agents, which are not cells and are treated separately ([[microbiology/viruses]]). Microbiology is defined as much by its methods — microscopy, pure culture, counting by dilution, and increasingly DNA sequencing — as by its organisms.
:::

The range of sizes is wide even within the microbial world:

| microbe | typical size | notes |
|---|---|---|
| poliovirus | 30 nm diameter | one of the smallest animal viruses |
| bacteriophage T4 | head about 90 nm × 120 nm, tail about 100 nm | infects *Escherichia coli* |
| '*Candidatus* Pelagibacter ubique' (SAR11 clade) | about 0.2 µm × 0.6 µm | among the most abundant cells in the ocean |
| *E. coli* | about 1 µm × 2 µm | the laboratory workhorse |
| Mimivirus | particle about 0.75 µm including its fibres | a "giant virus" of amoebae, large enough to be seen in a light microscope (Bernard La Scola and colleagues, 2003) |
| *Saccharomyces cerevisiae* (baker's yeast) | 5–10 µm | a unicellular fungus |
| *Paramecium* | about 100–300 µm long | a ciliate protist, at the limit of naked-eye visibility |

The lower bound of cellular size is set by the room needed for a genome, ribosomes and the machinery of metabolism, and the upper bound by diffusion and the ratio of surface to volume ([[cell-biology/cells-and-microscopy#prop-sv]]). Most bacteria and archaea are close to the lower bound.

::: warning "Microbes" are not a natural group
Because the word groups organisms by size, it includes members of all three domains, and a yeast is far more closely related to you than to *E. coli*. Saying that something is "a microbe" tells you how to study it, not what it is related to or what it does. In the same way, "germ" is a word for a microbe that causes disease, and the overwhelming majority of microbes are not germs: they are free-living, or harmless or beneficial partners of plants and animals ([[microbiology/microbes-and-hosts]]).
:::

## Seeing the invisible: Leeuwenhoek

Robert Hooke's *Micrographia* (1665) already contained an illustration of a microscopic fungus, a blue mould growing on leather, seen with his compound microscope. But the first person to see bacteria and protists, and to describe them in a way that we can still recognise, was the Delft cloth merchant Antonie van Leeuwenhoek. He ground tiny, nearly spherical lenses and mounted each between two metal plates; held close to the eye, they magnified up to about 270 times, better than any compound microscope of the period, whose lenses suffered from strong chromatic and spherical aberration.

From 1673 Leeuwenhoek sent letters, in Dutch, to the Royal Society in London. In 1674 he described "animalcules" in lake water, and his letter of 9 October 1676 described the creatures that appeared in water in which he had steeped peppercorns: many were protists, but the smallest, which he estimated to be a thousand times smaller than the eye of a louse, were bacteria. His estimate of their numbers — several million in a drop — was the first quantitative statement in microbiology. In 1683 he drew rods, cocci and a spiral form from the plaque between his teeth. The Royal Society was sceptical until Hooke reproduced the observations in 1677.

For almost two centuries after Leeuwenhoek, microbes remained curiosities. Three questions had to be settled before microbiology could become an experimental science: do microbes arise spontaneously from non-living matter, do they cause the chemical changes found with them (fermentation, putrefaction), and do particular microbes cause particular diseases?

## Spontaneous generation and its refutation

The idea that life arises continually from non-living matter — mice from grain, maggots from meat — was ancient. Francesco Redi showed in 1668 that maggots do not appear on meat in jars covered with gauze, which kept flies out but let air in. But microbes appeared in boiled broths whatever one did, and seemed the perfect example of spontaneous generation. John Needham (1748) boiled mutton broth briefly in corked flasks and found them teeming with microbes days later; Lazzaro Spallanzani (in the 1760s) boiled broths for longer in flasks sealed by melting the glass, and found them sterile — but Needham replied that prolonged boiling had destroyed a "vital force" in the broth and in the air above it.

Louis Pasteur's experiments of 1859–1861 removed that objection. He drew the necks of flasks of broth out into long S-shaped curves, boiled the broth, and left the flasks open to the air. Dust and the microbes on it settled in the bend of the neck; air reached the broth freely, yet the broth stayed clear for months. When he broke off the neck, or tipped the flask so that the broth touched the dust in the bend, it was teeming with microbes within days. The experiment is a model of good design: the air, which Needham's hypothesis required, is present in both treatments, and only access of particles differs.

One puzzle remained: broths made from hay were often not sterilised even by thorough boiling. In 1876–1877 Ferdinand Cohn discovered that *Bacillus* forms heat-resistant **endospores** ([[microbiology/microbial-cells]]), and John Tyndall showed that such infusions could be sterilised by boiling repeatedly on successive days, killing in each round the spores that had germinated since the last. Heat resistance of spores is why laboratory sterilisation uses steam under pressure ([[microbiology/antimicrobials]]).

::: intuition What a control is for
Every famous experiment in this history is an answer to a specific objection. Spallanzani's sealed flasks answered "the microbes came from the air", and Needham objected "you destroyed the air's vital force"; Pasteur's swan-necked flasks kept the air but removed the particles. When you design or read an experiment, ask what alternative explanation each control rules out — and which explanation it leaves standing.
:::

## Microbes as agents of change: fermentation and disease

Pasteur had come to microbes through chemistry. Studying fermentations in the 1850s, he showed that the lactic acid fermentation is accompanied by a specific microbe (1857), that alcoholic fermentation depends on living yeast, and that the souring of wine and beer is caused by contaminating microbes, which could be killed by gentle heating — **pasteurisation**. He also discovered that some microbes live without oxygen (he called them "anaerobic"), and that yeast consumes more sugar per gram of growth without air than with it, the observation later called the **Pasteur effect**. Each kind of fermentation, it seemed, had its own kind of microbe — a principle of specificity that he soon carried over to disease. (Eduard Buchner showed in 1897 that a cell-free extract of yeast ferments sugar, so the fermentation itself is the work of enzymes, not of life as such; see [[biochemistry/glycolysis-tca]].)

The idea that infectious diseases are caused by living agents had been suggested by Girolamo Fracastoro in 1546, and it gained practical support in the 1840s–1860s. Ignaz Semmelweis showed in 1847 that washing hands in chlorinated lime solution greatly reduced deaths from puerperal fever on a Vienna maternity ward, and Joseph Lister, inspired by Pasteur, introduced antiseptic surgery with carbolic acid (phenol) in 1867. Neither proved what caused the diseases. That required a method of isolating a single kind of microbe.

### Pure culture

A sample from nature contains many kinds of microbes, and in a liquid medium they grow mixed together. Robert Koch, a country doctor working in Wollstein in Prussia, developed the techniques that made it possible to separate them.

::: definition Pure culture and colony {#def-pure-culture}
A **pure culture** (axenic culture) contains cells of a single kind, all descended from one cell. On a solid medium a single cell grows into a visible mass of descendants, a **colony**, which is a clone (barring mutation). Picking material from a well-separated colony and growing it in fresh medium gives a pure culture. A **strain** is a pure culture derived from a single isolation, designated by a code (*E. coli* K-12, *Bacillus subtilis* 168).
:::

Koch first grew bacteria on slices of boiled potato and then on nutrient broth solidified with gelatin (1881). Gelatin melts at body temperature and is digested by many bacteria; agar, a polysaccharide from red algae that melts near 85 °C, sets near 40 °C and is broken down by few bacteria, was suggested by Fanny Angelina Hesse, who knew it from cooking, to her husband Walther Hesse, one of Koch's assistants (about 1881). Julius Petri, another assistant, described the shallow covered glass dish that bears his name in 1887. The streak plate — spreading a sample thinly over the surface of agar so that, somewhere along the streak, single cells are deposited far enough apart to form separate colonies — remains the standard way to obtain a pure culture.

Koch used these methods in his study of anthrax in 1876, in which he followed the life cycle of *Bacillus anthracis*, including its spores, and showed that bacteria grown outside an animal for many transfers still caused the disease in mice. In 1882 he identified the bacterium that causes tuberculosis, *Mycobacterium tuberculosis*. The logic of these studies was summarised in criteria now known as Koch's postulates.

::: definition Koch's postulates {#def-koch}
A microbe is accepted as the cause of a disease if (1) it is found in every case of the disease and not in healthy hosts; (2) it can be isolated from a diseased host and grown in pure culture; (3) the pure culture causes the disease when introduced into a healthy, susceptible host; and (4) the same microbe can be re-isolated from the experimentally infected host. The criteria were stated in this form by Friedrich Loeffler (1884) and Koch (1884, 1890).
:::

::: warning The postulates are a sufficient test, not a definition of causation
Koch himself knew that the postulates cannot always be met. Many hosts carry a pathogen without disease (the first postulate fails for cholera, polio and many others); some pathogens cannot be grown in pure culture (*Treponema pallidum*, the agent of syphilis, and all viruses outside host cells); some diseases have no animal model; and some are caused by communities rather than single species. Molecular versions of the postulates, which ask whether a particular gene is associated with disease, whether inactivating it reduces virulence and whether restoring it restores virulence, were proposed by Stanley Falkow (1988), and sequence-based versions by David Fredricks and David Relman (1996). Causation in biology is established by converging lines of evidence, not by a fixed checklist.
:::

Between 1876 and about 1900 — the "golden age" of bacteriology — the bacteria causing most of the great bacterial diseases were identified, mainly by Koch's and Pasteur's schools. Clinical aspects belong to Medicine Atlas ([Medicine Atlas: Microbiology](/learn/medicine/course.php?c=microbiology)); what matters for us is that pure culture turned microbes from a collective "cause of decay" into individual organisms with stable, heritable properties.

## The ecological tradition: enrichment

A second tradition, in the Netherlands and Russia, asked a different question: what do microbes do in nature? Its central tool was the **enrichment culture**.

::: definition Enrichment culture {#def-enrichment}
An **enrichment culture** is a medium and set of conditions designed so that only organisms with a particular capability can grow, inoculated with a natural sample in which such organisms are expected to be rare. The conditions select the organisms: repeated transfer enriches them until they dominate, and they can then be isolated in pure culture. Martinus Beijerinck summarised the principle: "everything is everywhere; the environment selects" (the phrase in this form is Lourens Baas Becking's, 1934).
:::

Sergei Winogradsky discovered **chemolithotrophy** in 1887 by watching the filamentous sulfur bacterium *Beggiatoa* oxidise hydrogen sulfide and store granules of sulfur, and in 1890 he isolated the nitrifying bacteria, which grow on ammonia and CO₂ alone and could not be grown on the organic media of medical bacteriology at all — he used plates solidified with silica gel instead. Beijerinck isolated the nitrogen-fixing root-nodule bacteria in 1888 and, in 1901, free-living *Azotobacter* by enrichment on a medium with no fixed nitrogen, so that only nitrogen fixers could grow. The **Winogradsky column**, a tube of mud supplemented with cellulose and sulfate and left in the light, develops over weeks into layers of different microbes along gradients of oxygen and sulfide, a living demonstration of the redox chemistry discussed in [[microbiology/microbial-metabolism]] and [[microbiology/microbial-ecology]].

From this "Delft school" came the generalisation by Albert Jan Kluyver and Hendrick Jean Louis Donker (1926) of the **unity of biochemistry**: beneath the bewildering diversity of microbial metabolism lie the same few kinds of reactions, above all the transfer of hydrogen (electrons) between molecules.

::: example Designing an enrichment {#ex-enrichment}
You want to isolate, from a pond sediment, a bacterium that (a) fixes N₂ and uses light for energy under anoxic conditions; (b) oxidises ammonia to nitrite and fixes CO₂. Specify the medium and conditions, and explain what each choice selects for and against.
::: solution
(a) A mineral medium with no fixed nitrogen (no ammonium, nitrate or amino acids), an organic acid such as malate as carbon source, sealed without air and incubated in the light. The absence of fixed nitrogen selects nitrogen fixers; the absence of oxygen excludes aerobes; light in the absence of oxygen selects anoxygenic phototrophs such as purple non-sulfur bacteria, which can then outgrow anaerobic heterotrophs that must ferment malate for energy. Incubating some flasks in the dark is a useful control.

(b) A mineral medium with ammonium as the sole energy source, bicarbonate as the sole carbon source and no organic carbon, incubated in air in the dark, with the pH kept near neutrality (nitrification releases acid). Only chemolithoautotrophs that oxidise ammonia can grow. Progress is followed by the appearance of nitrite. Ammonia oxidisers grow slowly (doubling times of a day or more), so the enrichment takes weeks, and contaminants that live on traces of organic matter must be removed by repeated transfer and dilution.
:::
:::

## Counting microbes

Microbiologists count cells constantly: to measure growth, to prepare a standard inoculum, to measure the killing power of a disinfectant, or to estimate how many bacteria live in a gram of soil. There are two families of methods, which measure different things.

**Total counts** count all cells, alive or dead. Cells can be counted in a chamber of known depth under a microscope (a Petroff–Hausser or haemocytometer chamber); or stained with a fluorescent DNA stain such as DAPI or SYBR Green, collected on a black membrane filter and counted by **epifluorescence microscopy** (John Hobbie, Rutger Daley and Sigvard Jasper, 1977); or counted one by one as they flow past a laser in a **flow cytometer**, which can also measure size and fluorescence of each cell. Optical density, the scattering of light by a suspension, is a fast indirect measure of biomass ([[microbiology/microbial-growth]]).

**Viable counts** count only cells that can divide under the conditions offered, by letting each grow into a colony or a turbid culture. They are expressed as **colony-forming units** (CFU), since a colony can come from a clump or chain of cells as well as a single cell.

::: example A direct count in a chamber {#ex-chamber}
A Petroff–Hausser chamber has squares 0.05 mm on a side and a depth of 0.02 mm. Counting cells in a diluted bacterial suspension gives an average of 12 cells per square. The suspension had been diluted 10-fold before loading. What is the concentration of cells in the original culture, in cells per mL?
::: solution
The volume over one square is $0.05 \times 0.05 \times 0.02 = 5\times10^{-5}$ mm³. One mL is 1 cm³ = $10^3$ mm³, so the volume is $5\times10^{-8}$ mL. The diluted suspension holds $12/(5\times10^{-8}) = 2.4\times10^{8}$ cells per mL, and the original culture ten times as many, $2.4\times10^{9}$ cells per mL. Chamber counts are quick but imprecise for bacteria, which are small, move and are hard to tell from debris; they also cannot distinguish living from dead cells.
:::
:::

### Viable counts by dilution and plating

A culture of $10^9$ cells per mL gives far too many colonies to count, so it is first diluted in a series of tenfold steps — 1 mL into 9 mL of sterile diluent, mixed, then 1 mL of that into another 9 mL, and so on — and a measured volume of each dilution is spread on an agar plate.

::: proposition Concentration from a plate count {#prop-plate-count}
If $C$ colonies grow on a plate that received a volume $v$ of a suspension diluted by a factor $d$ (for example $d = 10^{-6}$), and each colony arose from one colony-forming unit, the concentration in the original sample is

$$
N = \frac{C}{v\,d} \quad \text{CFU per unit volume.}
$$ {#eq-plate-count}

If cells are distributed at random in the suspension, the number of CFU delivered to a plate is a Poisson random variable with mean $\lambda = N v d$, so $C$ has variance $\lambda$ and the relative standard error of the count is about $1/\sqrt{C}$.
:::

The Poisson assumption deserves a word of justification. A plate receives a tiny fraction of the cells in a well-mixed suspension, each cell independently of the others; the number of "successes" in a very large number of trials, each with a very small probability, follows a Poisson distribution (see [[biostatistics/probability-distributions]]). It fails if cells clump, or if they are not mixed well — which is why suspensions are vortexed before each transfer.

::: example From colonies to CFU per mL {#ex-plate-count}
A culture is diluted serially in tenfold steps, and 0.1 mL of the $10^{-6}$ dilution is spread on each of several plates. One plate has 156 colonies. Estimate the concentration of the culture and an approximate 95 % confidence interval from Poisson error alone.
::: solution
By [[#eq-plate-count]], $N = 156/(0.1 \times 10^{-6}) = 1.56\times10^{9}$ CFU per mL. The standard deviation of a Poisson count with mean near 156 is $\sqrt{156} = 12.5$, so an approximate 95 % interval for the count is $156 \pm 2\times12.5$, roughly 131 to 181 colonies, which corresponds to $1.3$ to $1.8 \times 10^{9}$ CFU per mL. In practice replicate plates and pipetting errors at each dilution step usually add more variation than the Poisson term, so a careful estimate uses several plates and dilutions.
:::
:::

Why do microbiology manuals recommend counting plates with roughly 30–300 colonies? The lower limit comes from the Poisson error: at 30 colonies the relative standard error is $1/\sqrt{30} \approx 18\,\%$, at 300 it is under 6 %. The upper limit comes from crowding: on a plate with many hundreds of colonies, neighbours merge and compete for nutrients, so the count underestimates the number of cells.

::: widget distribution
dist: poisson
params: lambda=4
a: 0
b: 0
caption: The number of colonies on a plate is Poisson-distributed when cells are randomly dispersed. Start with a mean of 4 colonies: the bar at 0 (shaded) is the probability $e^{-4} \approx 0.018$ that a plate is empty. Raise the mean to 30 (the slider's maximum) and watch the distribution become narrow relative to its mean: its standard deviation is the square root of the mean, so the relative spread falls from 50 % at a mean of 4 to 18 % at 30, and to under 6 % at 300 colonies. That is why counts of a few tens to a few hundred are reliable and counts of a few are not.
:::

### Most probable number and dilution to extinction

Some microbes do not form colonies on plates but will grow in liquid. They can be counted by inoculating many tubes or wells with a small volume of a dilution and scoring each as positive (growth) or negative after incubation. A well is negative only if it received no viable cell.

::: proposition Counting by the fraction of negatives {#prop-mpn}
If each of $n$ wells receives a volume $v$ of a suspension in which viable cells are randomly distributed with concentration $c$, the number of cells per well is Poisson with mean $\lambda = cv$, and the probability that a well receives none is $p_0 = e^{-\lambda}$. If $n_0$ of the $n$ wells remain negative, the maximum-likelihood estimate is

$$
\hat\lambda = -\ln\frac{n_0}{n}, \qquad \hat c = \frac{\hat\lambda}{v},
$$ {#eq-mpn}

and, by the delta method, the standard error of $\hat\lambda$ is approximately $\sqrt{(1 - p_0)/(n p_0)}$. Using several dilutions in the classical **most-probable-number** (MPN) method combines this reasoning across dilutions.
:::

::: proof
Each well is independently negative with probability $p_0 = e^{-\lambda}$, so $n_0$ is binomial $(n, p_0)$ and the maximum-likelihood estimate of $p_0$ is $n_0/n$. Since $\lambda = -\ln p_0$ is a one-to-one function of $p_0$, its maximum-likelihood estimate is $-\ln(n_0/n)$. The variance of $\hat p_0$ is $p_0(1 - p_0)/n$, and $d\lambda/dp_0 = -1/p_0$, so to first order $\operatorname{Var}\hat\lambda \approx p_0(1 - p_0)/(n p_0^2) = (1 - p_0)/(n p_0)$.
:::

::: example A 96-well count {#ex-mpn}
A sea-water sample is diluted $10^{-5}$, and 0.1 mL is put into each of the 96 wells of a microtitre plate of medium. After incubation 58 wells show growth. Estimate the concentration of culturable cells in the sample, with an approximate 95 % confidence interval.
::: solution
Negatives: $n_0 = 38$, so $\hat p_0 = 38/96 = 0.396$ and $\hat\lambda = -\ln 0.396 = 0.927$ cells per well. The standard error is $\sqrt{(1 - 0.396)/(96\times0.396)} = 0.126$, giving a 95 % interval for $\lambda$ of $0.927 \pm 1.96\times0.126$, that is $0.68$ to $1.17$ cells per well. Each well received $0.1 \times 10^{-5} = 10^{-6}$ mL of the original sample, so $\hat c = 0.927/10^{-6} = 9.3\times10^5$ culturable cells per mL (interval about $6.8\times10^{5}$ to $1.2\times10^{6}$).

Notice that the naive estimate "58 positive wells means 58 cells" would be badly wrong: many positive wells received two or more cells.
:::
:::

The same idea, run at a high dilution, isolates organisms that will not grow on plates: if wells receive on average less than one cell, most positive wells were seeded by a single cell. This **dilution-to-extinction** approach, combined with very dilute, natural sea-water media, was how Michael Rappé, Stephen Giovannoni and colleagues (2002) first cultivated a member of the SAR11 clade, '*Candidatus* Pelagibacter ubique', one of the most abundant organisms in the ocean, which grows poorly or not at all on rich agar.

::: example How clonal is a positive well? {#ex-clonal}
If wells are inoculated at a mean of $\lambda = 0.5$ cells per well, what fraction of wells are positive, and what fraction of positive wells were seeded by more than one cell?
::: solution
$P(0) = e^{-0.5} = 0.607$, so $39.3\,\%$ of wells are positive. $P(1) = 0.5e^{-0.5} = 0.303$, so $P(\ge2) = 1 - 0.607 - 0.303 = 0.090$. Among positive wells, $0.090/0.393 = 23\,\%$ received two or more cells. To make mixed cultures rarer you must dilute further, at the cost of more empty wells; at $\lambda = 0.1$ the fraction of mixed positives falls to about 5 %.
:::
:::

::: widget plot
f: exp(-x); 1 - exp(-x); (1 - exp(-x) - x*exp(-x))/(1 - exp(-x))
x: 0.01, 4
y: 0, 1
labels: \text{negative wells } e^{-\lambda}; \text{positive wells}; \text{mixed among positives}
caption: Dilution to extinction. As the mean number of cells per well $\lambda$ rises, negative wells ($e^{-\lambda}$) give way to positive ones, but the fraction of positive wells seeded by two or more cells (third curve) rises too. Hover at $\lambda = 0.5$: 39 % of wells are positive and 23 % of these are mixed. Counting is most precise where the fraction of negatives is moderate (around $\lambda \approx 1.6$, about 20 % negative), whereas isolation needs $\lambda$ well below 1.
:::

## Most microbes have never been cultured

When cells in natural samples are counted both directly and on plates, the two numbers disagree enormously. In sea water, epifluorescence counts are typically about $10^5$–$10^6$ cells per mL, while plates of marine agar yield colonies from well under 1 % of them; in soils the gap is similar. James Staley and Allan Konopka (1985) called this the **great plate count anomaly**. Some of the uncounted cells are dead or dormant, but most belong to lineages that simply do not grow under the conditions offered: their nutrients are wrong or too concentrated, they need partners, or they grow too slowly to form colonies in days.

Since the 1980s, microbiologists have studied organisms without culturing them, by reading their genes. Norman Pace and colleagues amplified and sequenced **16S ribosomal RNA genes** directly from environmental DNA and found that most sequences belonged to unknown lineages; Edward DeLong, Gene Wickham and Pace (1989) introduced fluorescent rRNA-targeted probes ("phylogenetic stains", now **fluorescence *in situ* hybridisation**, FISH) to identify single cells under the microscope. **Metagenomics**, sequencing all the DNA in a sample and assembling it into genomes, followed in the 2000s, and **single-cell genomics** sequences the genome of one sorted cell. These methods, and what they have revealed about the tree of life, are the subject of [[microbiology/microbial-diversity]]. Culture has not been abandoned — only a cultured organism can be studied physiologically and genetically in full — and new methods such as "culturomics" (thousands of conditions in parallel) and diffusion chambers incubated in the natural environment have brought many previously uncultured lineages into the laboratory.

::: quiz
A soil suspension gives $4\times10^9$ cells per gram by epifluorescence microscopy and $2\times10^7$ CFU per gram on rich agar. Which conclusion is best supported?
- [ ] 99.5 % of the cells in the soil are dead.
- [x] At most about 0.5 % of the cells formed colonies under these conditions; the rest are dead, dormant or unable to grow on this medium.
- [ ] The plate count is wrong because of Poisson error.
- [ ] Fluorescence microscopy counts each cell about 200 times.
::: solution
The ratio is $2\times10^7/4\times10^9 = 0.5\,\%$. The data alone cannot separate dead cells from living ones that do not grow on the medium; staining for membrane integrity or activity, and sequencing, are needed to decide. Poisson error on a count of tens to hundreds of colonies is a few per cent, far too small to explain a 200-fold difference.
:::
:::

## Identifying microbes

Most bacteria look alike — rods, cocci, curved rods and spirals a micrometre or two across — so microscopy alone rarely identifies them. Classical identification combined **morphology** (shape, arrangement, motility, spores), **staining** (the Gram reaction, the acid-fast stain for mycobacteria; [[diversity-of-life/bacteria-archaea#def-envelope]]) and **physiology**: which sugars a strain ferments, whether it grows without oxygen, what enzymes it has (catalase, oxidase) and which media it grows on. **Selective media** contain agents that suppress some organisms (bile salts and dyes against most Gram-positive bacteria, high salt for staphylococci), and **differential media** contain indicators that make colonies of different organisms look different (a pH indicator that shows which colonies ferment lactose).

Today identification is mostly molecular. The sequence of the 16S rRNA gene places a bacterium or archaeon in a genus with reasonable confidence; whole-genome sequencing and the **average nucleotide identity** (ANI) between two genomes are used to delimit species, with about 95–96 % ANI as a commonly used threshold (Konstantinos Konstantinidis and James Tiedje, 2005; Chirag Jain and colleagues, 2018). Mass spectrometry of whole-cell proteins (MALDI-TOF) is widely used for rapid identification in clinical and food laboratories. Species concepts and nomenclature for prokaryotes are discussed in [[diversity-of-life/classifying-life]] and [[microbiology/microbial-diversity]].

## Model microbes and working safely

A handful of microbes are studied far more than any others because they grow fast on simple media, are genetically tractable and have large research communities:

- *Escherichia coli* K-12, a laboratory-adapted derivative of a strain isolated in 1922, which cannot colonise the human gut effectively; the basis of bacterial genetics and molecular biology ([[genetics/microbial-genetics]]).
- *Bacillus subtilis* 168, a Gram-positive soil bacterium, the model for endospore formation and for Gram-positive cell biology.
- *Saccharomyces cerevisiae*, budding yeast, the model eukaryotic cell.
- *Caulobacter crescentus* (asymmetric cell division), *Vibrio fischeri* (quorum sensing and symbiosis), *Pseudomonas aeruginosa* (biofilms), *Haloferax volcanii* and *Sulfolobus* (archaeal cell biology), and phages such as λ and T4.

Microbiology laboratories classify the organisms they handle by risk, and match practices, equipment and buildings to that risk. Most teaching and research strains, including *E. coli* K-12 and *B. subtilis* 168, are of the lowest risk and are handled with basic good microbiological practice — work surfaces disinfected, no mouth pipetting, cultures and waste sterilised before disposal. Agents that can cause serious human disease are handled only in progressively more contained facilities (the biosafety levels, BSL-1 to BSL-4), under national regulation, and with trained staff; the World Health Organization's *Laboratory Biosafety Manual* (4th edition, 2020) sets out a risk-based approach. Containment protects workers and the public, and it is part of the reason microbiology, unlike most of its early history, is now a safe science.

::: application Microbes in food
Fermentation is the oldest biotechnology: bread and beer depend on *S. cerevisiae*, yoghurt on *Streptococcus thermophilus* and *Lactobacillus delbrueckii* subsp. *bulgaricus*, cheese, sauerkraut, kimchi, soy sauce and vinegar on other lactic and acetic acid bacteria and moulds. The acid and alcohol these microbes produce preserve the food by inhibiting spoilage organisms — an applied enrichment culture. Food microbiology also counts microbes routinely, using the plate counts and MPN methods of this chapter, to check that pasteurisation and hygiene have worked.
:::

::: history
After Leeuwenhoek's letters (1673–1683), microbiology was dormant for 150 years. Christian Gottfried Ehrenberg described hundreds of "infusoria" in the 1830s, and Ferdinand Cohn classified bacteria by shape in 1872 and described endospores in 1876. Pasteur's work on fermentation (from 1857), on spontaneous generation (1859–1861) and on vaccines (chicken cholera, 1880; anthrax, 1881) and Koch's on anthrax (1876), pure culture (1881) and tuberculosis (1882) founded medical microbiology; Gram's stain dates from 1884 and Petri's dish from 1887. Winogradsky's chemolithotrophs (1887–1890) and Beijerinck's enrichment cultures and discovery of a filterable virus (1898) founded microbial ecology and virology. The twentieth century added bacterial genetics (1940s), the chemostat (1950), the discovery of the Archaea (1977) and, from the mid-1980s, the culture-independent study of microbes by their genes.
:::

::: summary
- Microbes are defined by size and method, not by ancestry: Bacteria, Archaea, microscopic fungi, protists and algae, and the acellular viruses.
- Leeuwenhoek first saw bacteria (1676–1683); Pasteur's swan-necked flasks (1859–1861) refuted spontaneous generation, and heat-resistant endospores explained the exceptions.
- Pure culture on solid media (Koch, the Hesses, Petri) made it possible to show that particular microbes cause particular fermentations and diseases. Koch's postulates are a useful but not universal test of causation.
- Enrichment cultures (Winogradsky, Beijerinck) select organisms with a given capability; "the environment selects".
- Total counts (chamber, epifluorescence, flow cytometry) count all cells; viable counts (plates, MPN) count those that can grow. A plate count gives $N = C/(vd)$ with relative error about $1/\sqrt{C}$; the fraction of negative wells gives $\hat\lambda = -\ln(n_0/n)$.
- Direct counts exceed plate counts by factors of 100 or more (the great plate count anomaly); rRNA sequencing, FISH and metagenomics study the uncultured majority.
- Identification combines morphology, staining and physiology with 16S rRNA and genome sequences; work with microbes is matched to their risk by containment and regulation.
:::

## Exercises

::: exercise A plate count {level=1 check="2.3e8"}
0.1 mL of a $10^{-5}$ dilution of a culture gives 230 colonies. What is the concentration of the culture in CFU per mL?
::: solution
$N = 230/(0.1\times10^{-5}) = 2.3\times10^{8}$ CFU per mL.
:::
:::

::: exercise Which dilution to count? {level=1}
Plates spread with 0.1 mL of the $10^{-4}$, $10^{-5}$ and $10^{-6}$ dilutions of a culture have "too many to count", 412 and 38 colonies respectively. Which plate gives the more reliable estimate, and what is the estimate? Is the 412 consistent with the 38?
::: solution
The 412 plate is above the usual upper limit of about 300, where colonies merge and compete, so the 38 plate is preferred: $N = 38/(0.1\times10^{-6}) = 3.8\times10^8$ CFU per mL, with a relative Poisson error of about $1/\sqrt{38} = 16\,\%$. The $10^{-5}$ plate would be expected to carry ten times as many, about 380 (95 % range roughly 340–420 from Poisson error alone), so 412 is consistent. Many laboratories would report a weighted combination of both plates.
:::
:::

::: exercise The swan-necked flask {level=1}
State the hypothesis that Pasteur's swan-necked flasks were designed to test, the alternative hypothesis they ruled out, and the role of tipping the flask so that broth touched the bend in the neck.
::: solution
Hypothesis: microbes in boiled broth come from particles (dust carrying microbes) in the air, not from spontaneous generation. The alternative it rules out is Needham's: that air, or a "vital force" in it, is needed for life to arise and was excluded or destroyed in sealed flasks — in Pasteur's flasks air entered freely, yet nothing grew. Tipping is a positive control: it shows that the broth could still support growth and that the particles trapped in the neck contained living microbes, so sterility was not due to the broth having been made unable to support life.
:::
:::

::: exercise Counting with wells {level=2 check="3.3e5"}
Forty-eight wells each receive 0.05 mL of a $10^{-4}$ dilution of a lake water sample. Nine wells remain negative. Estimate the concentration of culturable cells per mL in the lake water (two significant figures).
::: solution
$\hat\lambda = -\ln(9/48) = -\ln 0.1875 = 1.674$ cells per well. Each well received $0.05\times10^{-4} = 5\times10^{-6}$ mL of lake water, so $\hat c = 1.674/(5\times10^{-6}) = 3.3\times10^{5}$ cells per mL.
:::
:::

::: exercise A chamber count {level=2 check="6e7"}
A haemocytometer square has an area of 0.0025 mm² and a depth of 0.1 mm. A yeast suspension diluted 1 : 100 gives an average of 1.5 cells per square. What is the concentration of the undiluted suspension in cells per mL?
::: solution
Volume per square: $0.0025\times0.1 = 2.5\times10^{-4}$ mm³ $= 2.5\times10^{-7}$ mL. Diluted concentration $1.5/(2.5\times10^{-7}) = 6\times10^{6}$ per mL; undiluted $6\times10^{8}$ per mL.
:::
:::

::: exercise Koch's postulates and a carrier {level=2}
A bacterium is isolated from 95 % of patients with a disease but also from 30 % of healthy people. In a suitable animal model the pure culture causes the disease in 60 % of animals, and it is recovered from all of them. (a) Which postulates are satisfied? (b) Is it reasonable to conclude that the bacterium causes the disease? (c) What further evidence would strengthen the case?
::: solution
(a) The second (isolation in pure culture), the third (at least partly: disease in a susceptible host) and the fourth (re-isolation). The first, in its strict form, fails because the organism is also found in healthy people. (b) Yes, provisionally: asymptomatic carriage is common for many pathogens, and the experimental infection is strong evidence; disease in only 60 % of animals suggests that host factors or dose matter. (c) A consistent association between bacterial load and disease, a gene (such as one encoding a toxin) whose inactivation abolishes disease in the model and whose restoration restores it (molecular Koch's postulates), and differences between the strains carried by healthy people and patients.
:::
:::

::: exercise Clonal wells {level=2 check="0.049"}
Wells are inoculated at a mean of $\lambda = 0.1$ cells per well. What fraction of positive wells received two or more cells? Give three decimal places.
::: solution
$P(0) = e^{-0.1} = 0.9048$, $P(1) = 0.1e^{-0.1} = 0.0905$, so $P(\ge 2) = 1 - 0.9048 - 0.0905 = 0.00468$. The fraction of positives that are mixed is $0.00468/0.0952 = 0.049$, about 5 %.
:::
:::

::: exercise The plate count anomaly in sea water {level=2}
Surface sea water contains $8\times10^5$ cells per mL by epifluorescence counting, of which FISH shows that 25 % belong to the SAR11 clade. Plating 0.1 mL of undiluted sea water on marine agar gives 64 colonies, none of them SAR11. (a) What percentage of cells formed colonies? (b) Suggest three reasons why SAR11 cells do not form colonies. (c) How might you test whether the non-culturable cells are alive?
::: solution
(a) $64/0.1 = 640$ CFU per mL, and $640/8\times10^5 = 0.08\,\%$. (b) SAR11 is adapted to extremely low nutrient concentrations and is inhibited or outgrown on rich media; it has specific nutritional requirements (for example for reduced sulfur compounds and glycine or its precursors, which are present in sea water but missing from many media); and it grows slowly, dividing about once a day or less, so it would form no visible colony in the time other bacteria take to cover the plate. (c) Use stains for membrane integrity (live/dead stains), measure uptake of radiolabelled substrates by single cells (microautoradiography combined with FISH), or detect rRNA content or active protein synthesis with labelled amino-acid analogues — all show activity without growth on a plate. Dilution-to-extinction culture in filtered natural sea water would test whether they can be grown at all.
:::
:::

::: exercise A precision budget for dilution series {level=3}
A culture is plated after six tenfold dilutions, each made by pipetting 1.00 mL into 9.00 mL, and 0.100 mL of the last dilution is spread. Suppose each pipetted volume has an independent relative error (standard deviation) of 2 %, and the count is 150 colonies. (a) Estimate the relative standard error contributed by the dilution series and by the final spread volume, treating relative errors as adding in quadrature and ignoring error in the 9.00 mL volumes. (b) Compare it with the Poisson error of the count. (c) What does this suggest about how to improve precision?
::: solution
(a) Each dilution factor is $V_1/(V_1 + 9.00)$; a 2 % error in $V_1 = 1.00$ mL changes the factor by about $2\,\% \times 9/10 = 1.8\,\%$ (because the transferred volume also appears in the denominator). Six independent steps give $1.8\,\%\times\sqrt6 = 4.4\,\%$. The spread volume adds 2 %, so the volumetric total is $\sqrt{4.4^2 + 2^2} = 4.8\,\%$. (b) The Poisson error is $1/\sqrt{150} = 8.2\,\%$, so the total is about $\sqrt{8.2^2 + 4.8^2} = 9.5\,\%$; the count dominates. (c) Precision is improved mainly by counting more colonies — plating replicates or larger volumes at the same dilution — rather than by more careful pipetting. Systematic errors (clumping, incomplete mixing, colonies too small to see) are not reduced by replication and must be controlled separately.
:::
:::

::: exercise Interpreting enrichment data {level=3}
Soil samples from two fields are used to inoculate a nitrogen-free medium with mannitol as carbon source, incubated in air. After 5 days, field A gives turbid cultures and a pellicle of large oval cells, and field B gives no growth; after 3 weeks field B also gives turbid cultures. (a) What kind of organism has been enriched? (b) Does the result show that nitrogen fixers are absent from field B or less abundant? (c) Design an MPN experiment to compare their abundance.
::: solution
(a) Aerobic free-living nitrogen fixers that use mannitol — the large oval cells and pellicle are typical of *Azotobacter*, Beijerinck's organism. (b) Neither directly: growth after three weeks shows they are present in B; slower appearance suggests fewer cells (a smaller inoculum takes longer to reach turbidity) or a different, slower-growing population. An enrichment is qualitative. (c) Make tenfold serial dilutions of each soil suspension and inoculate, say, five tubes of nitrogen-free mannitol medium at each of several dilutions; score positive tubes after a fixed time and confirm nitrogen fixation (for example by acetylene reduction) in positives. The pattern of positives across dilutions gives the MPN of nitrogen fixers per gram of soil, by the logic of [[#prop-mpn]] extended to several dilutions, with confidence limits that allow the fields to be compared.
:::
:::
