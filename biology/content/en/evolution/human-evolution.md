Humans are one species among the great apes, and our evolution is studied with exactly the same tools as that of any other lineage: fossils dated by radiometric methods, comparative anatomy, phylogenetics, and population genetics applied to genomes. What makes it special is the density of evidence. Hominin fossils are among the most intensively searched-for of all, the human genome is the best characterised of any species, and since 2010 we have had genome sequences of extinct relatives — Neanderthals and Denisovans — recovered from bones tens of thousands of years old. The result is a picture that is detailed in outline and still being revised in its particulars.

This chapter separates the two. We state what is well established — our place among the apes, the timing of the split from chimpanzees, the order in which bipedalism, stone tools and large brains appeared, the African origin of *Homo sapiens* and its later dispersal, and interbreeding with archaic humans — and we flag the points that are actively debated. We apply the population genetics of the earlier chapters to human genomes: molecular clocks with ancestral polymorphism, effective population size from diversity, the dating of admixture, and selection on lactase persistence. Human material here is comparative and evolutionary; human biology and medicine belong to [Medicine Atlas](/learn/medicine/).

## Our place among the apes

Linnaeus placed humans among the primates in 1758; Thomas Henry Huxley (*Evidence as to Man's Place in Nature*, 1863) and Darwin (*The Descent of Man*, 1871) argued from anatomy that our closest relatives were the African apes, and Darwin predicted that the human lineage had originated in Africa. Molecules confirmed this and refined it. Humans, chimpanzees (*Pan troglodytes*) and bonobos (*Pan paniscus*) form a clade, with gorillas their sister group and orangutans outside (the UPGMA tree of [[evolution/phylogenetics#ex-upgma]]). Chimpanzees and bonobos are equally closely related to us.

::: definition Hominins {#def-hominin}
**Hominins** (tribe Hominini) are the species on the human side of the split from the lineage leading to chimpanzees and bonobos: *Homo sapiens* and all extinct species more closely related to us than to *Pan*. The broader **hominids** (family Hominidae) are the great apes including humans. A species is assigned to the hominins mainly on derived features shared with later hominins: adaptations to habitual **bipedalism** (upright walking on two legs) and reduced, non-honing canine teeth.
:::

The genomes of humans and chimpanzees differ at about 1.2 % of aligned single-nucleotide sites (Chimpanzee Sequencing and Analysis Consortium, 2005); including insertions and deletions, the difference in sequence is a few per cent. Most differences are neutral, and the tree of genes is not the same at every locus: in about 30 % of the genome, humans are closer to gorillas than to chimpanzees, or chimpanzees closer to gorillas, because of incomplete lineage sorting ([[evolution/phylogenetics#ex-ils]]). Humans have 46 chromosomes, the other great apes 48, because two ancestral chromosomes fused to form human chromosome 2 ([[evolution/evidence-for-evolution]]).

Molecular dates for the split must allow for the fact that the gene copies sampled from two species started to diverge *before* the species did, in their common ancestral population. Coalescent theory gives the size of that offset.

::: proposition Coalescence time of two gene copies {#prop-coalescence}
In a Wright–Fisher population of constant effective size $N_e$ (diploid, so $2N_e$ gene copies), two gene copies sampled at random had their most recent common ancestor $T_2$ generations ago, where $T_2$ is approximately exponentially distributed with mean

$$
\E[T_2] = 2N_e\ \text{generations}.
$$ {#eq-coalescence}

Two species that split $t$ generations ago from an ancestral population of effective size $N_\mathrm{anc}$ therefore have an average gene divergence time of about $t + 2N_\mathrm{anc}$ generations.
:::

::: proof
Going back one generation, each of the two copies picks its parent copy at random from the $2N_e$ copies of the previous generation, so they pick the same one (coalesce) with probability $1/2N_e$, as in the proof of [[evolution/mutation-drift-gene-flow#prop-hdecay]]. Generations are independent, so the number of generations until coalescence is geometric with success probability $1/2N_e$, whose mean is $2N_e$; for large $N_e$ the geometric distribution is close to an exponential one. After a species split, the two lineages cannot coalesce until they are traced back into the ancestral population, which adds the $t$ generations since the split.
:::

::: example When did the human and chimpanzee lineages split? {#ex-split}
Take the genome-wide divergence between a human and a chimpanzee sequence to be $d = 0.0123$ per site, the human mutation rate to be $\mu = 1.2\times10^{-8}$ per site per generation (pedigree estimates, [[evolution/mutation-drift-gene-flow]]), and a generation time of 25 years in both lineages. (a) When did the average pair of sequences last share an ancestor? (b) The two species split later than that, because the ancestral population was polymorphic. If the ancestral effective population size was about 50,000, by how much, on average? (c) Compare with the fossil record.
::: solution
(a) Each lineage accumulates $\mu$ substitutions per site per generation ([[evolution/mutation-drift-gene-flow#prop-neutralrate]]), so $d = 2\mu T$ and

$$
T = \frac{0.0123}{2\times1.2\times10^{-8}} = 5.1\times10^5\ \text{generations} \approx 12.8\ \text{Myr}.
$$

(b) By [[#prop-coalescence]], two gene copies in the ancestral population take on average $2N_e$ generations to coalesce (the coalescent is developed in [[population-genetics]]). With $N_e = 50{,}000$ that is $10^5$ generations, or 2.5 Myr, so the species split is estimated at about $12.8 - 2.5 \approx 10$ Myr.

(c) The oldest proposed hominins, around 7–6 Ma, are younger than this, and many estimates from genomes place the split between about 6 and 10 Myr ago. The discrepancy is a live question: plausible explanations include longer generation times in ape ancestors, a mutation rate per year that has slowed in the great-ape lineage, and uncertainty in the identification of the earliest hominin fossils. The calculation shows how sensitive molecular dates are to assumed rates — a 20 % change in $\mu$ or in generation time moves the date by 2 Myr.
:::
:::

## The hominin fossil record

The fossil record of hominins has grown from a handful of specimens in 1950 to many thousands, mostly from eastern and southern Africa. The broad sequence is well established; the number of species, their exact relationships, and which (if any) were direct ancestors of later ones are debated.

| Group | Representative species | Age (Ma, approximate) | Key features |
|---|---|---|---|
| Earliest possible hominins | *Sahelanthropus tchadensis* (Chad), *Orrorin tugenensis* (Kenya), *Ardipithecus kadabba* | 7–5.5 | ape-sized brains; reduced canines; some evidence of bipedalism (debated) |
| *Ardipithecus* | *Ar. ramidus* ("Ardi", Ethiopia) | 4.4 | bipedal on the ground but with a grasping big toe; woodland habitat |
| Australopiths | *Australopithecus anamensis*, *A. afarensis* ("Lucy"), *A. africanus* | 4.2–2.0 | habitual bipeds; brains about 400–500 cm³; long arms |
| Robust australopiths | *Paranthropus boisei*, *P. robustus* | 2.7–1.2 | massive jaws and molars, sagittal crests |
| Early *Homo* | *H. habilis*, *H. rudolfensis* | 2.8–1.5 | larger brains (about 500–800 cm³); stone tools |
| *Homo erectus* (sensu lato) | including *H. ergaster* | 1.9–0.1 | modern body proportions; brains 600–1200 cm³; first to leave Africa |
| Middle Pleistocene *Homo* | *H. heidelbergensis*, *H. naledi*, *H. floresiensis*, *H. luzonensis* | 0.8–0.05 | diverse forms, some small-brained and late |
| Neanderthals | *H. neanderthalensis* | about 0.4–0.04 | large brains (about 1400–1500 cm³); cold-adapted bodies; Europe and western Asia |
| Modern humans | *H. sapiens* | from about 0.3 | globular braincase, chin, reduced brow ridges |

Some landmarks:

- **Lucy** (specimen AL 288-1, *A. afarensis*), about 40 % of a skeleton, was found at Hadar, Ethiopia, by Donald Johanson and Tom Gray in 1974 and is about 3.2 million years old. Her pelvis and knee show bipedalism; her brain was ape-sized. Footprints of bipeds walking on volcanic ash at **Laetoli**, Tanzania, found by Mary Leakey's team in 1978 and dated to about 3.66 Ma, show that hominins walked upright long before brains enlarged.
- The **Taung child**, a juvenile *A. africanus* skull from South Africa described by Raymond Dart in 1925, was the first australopith and the first evidence for Darwin's prediction of an African origin; it was widely dismissed for two decades.
- ***Homo habilis*** was named by Louis Leakey, Phillip Tobias and John Napier in 1964 from Olduvai Gorge, Tanzania. A jaw from Ledi-Geraru, Ethiopia (LD 350-1, about 2.8 Ma; Brian Villmoare and colleagues, 2015), is the oldest fossil attributed to *Homo*.
- ***Homo erectus*** was first found in Java by Eugène Dubois in 1891. The almost complete skeleton of the Nariokotome or "Turkana boy" (KNM-WT 15000, about 1.5 Ma, Kenya, found in 1984) shows a tall, long-legged body like ours. Fossils from Dmanisi, Georgia, about 1.8 Ma, show that hominins had left Africa by then.
- **Late, small-brained species.** *Homo floresiensis*, about a metre tall with a brain of about 400 cm³, lived on the Indonesian island of Flores until about 60,000–50,000 years ago (described in 2004, with dates revised in 2016). *Homo naledi*, from the Rising Star cave system in South Africa (described in 2015), combines a small brain with some modern features and is dated to about 335,000–236,000 years ago. These finds showed that several hominin species coexisted until relatively recently, and that brain size did not increase steadily in all lineages.

::: warning "Humans evolved from chimpanzees" and "the march of progress"
Neither humans nor chimpanzees are ancestral to the other; both descend from a common ancestor that was neither, and chimpanzees have been evolving for exactly as long as we have. Nor is human evolution a single line of ever more human-like species, as the familiar image of a file of figures marching towards an upright human suggests. It is a bushy tree: at several times — around 2 million years ago in eastern Africa, and around 100,000–50,000 years ago across the Old World — several hominin species lived at the same time, and most lineages ended without descendants.
:::

::: widget regression
points: -7, 360; -4.4, 330; -3.2, 450; -2.5, 450; -1.8, 610; -1.5, 850; -0.8, 1000; -0.3, 1200; -0.1, 1450; 0, 1350
degree: 2
residuals: false
x: -8, 0.5
y: 0, 1600
caption: Approximate mean endocranial volume (cm³, vertical axis) of hominins against time (millions of years before present, horizontal), with a fitted quadratic curve. Points are rough representative values for (left to right) *Sahelanthropus*, *Ardipithecus*, *A. afarensis*, *A. africanus*/*Paranthropus*, *H. habilis*, early *H. erectus*, later *H. erectus*, Middle Pleistocene *Homo*, Neanderthals and recent *H. sapiens*; real samples vary widely within each. Notice that volume barely changed for the first 4–5 million years of hominin evolution, while bipedalism was established, and then rose steeply over the last 2 million. Drag points or change the degree to see how sensitive a fitted trend is to a few values — and remember that a single curve through species from different branches is a summary, not a lineage.
:::

::: example How fast did hominin brains grow? {#ex-brain}
Mean brain volume rose from about 450 cm³ in *A. afarensis* around 3.2 Ma to about 1350 cm³ in recent humans. What is the average rate in darwins ([[evolution/macroevolution#def-rates]])? Is this fast, by evolutionary standards?
::: solution
$r_\mathrm{d} = \ln(1350/450)/3.2 = \ln 3/3.2 = 1.099/3.2 = 0.34$ darwins. That is roughly ten times the rate of the horse-tooth example of [[evolution/macroevolution#ex-darwins]] and fast for a sustained trend in the fossil record, but far slower than rates measured in contemporary populations over a few generations. In haldanes it corresponds to a tiny change per generation: with a generation time of about 25 years, 3.2 Myr is about 128,000 generations, and a tripling of volume is a change of about 0.0009 % per generation. Brain enlargement did not require exceptionally strong selection, only persistent selection in one direction.
:::
:::

### Tools, fire and behaviour

The oldest known stone tools, from Lomekwi 3 in Kenya, are about 3.3 million years old (Sonia Harmand and colleagues, 2015), older than the earliest *Homo* fossils, so they were probably made by australopiths or *Kenyanthropus*. Simple flaked tools of the **Oldowan** tradition appear around 2.6 million years ago or slightly earlier. **Acheulean** hand axes — symmetrical, bifacially worked tools — appear around 1.76 Ma in Kenya and were made for over a million years by *H. erectus* and its successors. Evidence of controlled fire becomes widespread only in the last 400,000 years, though earlier traces exist. Symbolic behaviour — ochre engraved with patterns and shell beads in southern and northern Africa from more than 70,000 years ago, and cave paintings in Europe and Indonesia from more than 40,000 years ago — appears gradually, not in a single "revolution".

## The origin and spread of *Homo sapiens*

Two models of modern human origins were debated in the 1980s and 1990s. The **multiregional** model held that *H. erectus* populations in Africa, Europe and Asia evolved into modern humans in place, linked by gene flow; the **recent African origin** ("Out of Africa") model held that modern humans evolved in Africa and replaced archaic populations elsewhere. Genetic and fossil evidence strongly supports an African origin, with the qualification — revealed by ancient genomes — that the replacement was not complete.

The evidence:

- **Fossils.** The oldest fossils with modern features come from Africa: Jebel Irhoud, Morocco, about 315,000 years old (Jean-Jacques Hublin and colleagues, 2017), with a modern face but a more archaic braincase; Omo Kibish, Ethiopia, at least about 233,000 years old; Herto, Ethiopia, about 160,000 years old. Modern humans are present in Australia by about 50,000 years ago (possibly earlier) and in the Americas by at least 15,000–16,000 years ago, with evidence of earlier presence debated.
- **Genetic diversity.** Present-day African populations hold more genetic diversity than populations elsewhere, and diversity falls with distance from Africa along plausible migration routes, consistent with a series of founder events as small groups left and expanded (Sohini Ramachandran and colleagues, 2005).
- **Mitochondrial and Y-chromosome trees.** Rebecca Cann, Mark Stoneking and Allan Wilson (1987) built a tree of mitochondrial DNA from people around the world and found that its root lay in Africa and its most recent common ancestor ("mitochondrial Eve") lived roughly 200,000 years ago. The Y-chromosome tree also roots in Africa.

::: warning "Mitochondrial Eve was the only woman alive" and "human groups are separate races"
The mitochondrial common ancestor was one woman in a population of thousands; every other woman of her time is an ancestor of living people through other parts of the genome, but their mitochondrial lineages happened to die out (by drift, [[evolution/mutation-drift-gene-flow]]). Different genes have common ancestors at different times and places. Human genetic variation, likewise, is mostly *within* populations: Richard Lewontin (1972) found about 85 % of the variation in blood-group and protein loci within populations, and genome data confirm the pattern. Variation is distributed in gradual geographic clines and shaped by migration and admixture, and does not partition into a small number of discrete biological races.
:::

### Interbreeding with archaic humans

The first ancient-DNA sequences from a Neanderthal, a short stretch of mitochondrial DNA from the Feldhofer type specimen found in 1856, were published by Svante Pääbo's group in 1997; they lay outside the range of modern human mtDNA, suggesting little mixing. The draft Neanderthal genome (Richard Green and colleagues, 2010) changed the picture: present-day people outside Africa carry a small proportion of Neanderthal ancestry, about 1–2 % on average, from interbreeding after modern humans left Africa. In the same year a finger bone from Denisova Cave in the Altai Mountains of Siberia yielded the genome of a previously unknown group, the **Denisovans** (Johannes Krause, David Reich and colleagues, 2010), whose ancestry makes up a few per cent of the genomes of people in Papua New Guinea and Australia today, and smaller amounts in other parts of Asia. A bone from the same cave belonged to a girl whose mother was a Neanderthal and whose father was a Denisovan (Viviane Slon and colleagues, 2018). Pääbo received the 2022 Nobel Prize in Physiology or Medicine for this work.

::: definition Admixture proportion {#def-admixture}
If a population was formed by mixing two source populations, a fraction $f$ from source 1 and $1 - f$ from source 2, and nothing has changed since, then at any neutral locus its allele frequency is $p_\mathrm{adm} = fp_1 + (1 - f)p_2$, so

$$
f = \frac{p_\mathrm{adm} - p_2}{p_1 - p_2}.
$$ {#eq-admixture}

In practice $f$ is estimated from many loci at once, with statistics (such as Nick Patterson and David Reich's $f$- and $D$-statistics) that are robust to drift since the mixture.
:::

::: example Dating Neanderthal admixture from segment lengths {#ex-segments}
Each generation after an admixture event, recombination breaks up the chromosome segments inherited from the archaic source. After $t$ generations, an introgressed segment has expected length of about $1/t$ Morgans (100/$t$ centimorgans). In human genomes, 1 cM corresponds to roughly 1 million base pairs on average. If the admixture happened about 55,000 years ago with a generation time of 29 years, how long should Neanderthal segments typically be? Neanderthal-derived segments in present-day genomes are commonly tens of kilobases long. Is that consistent?
::: solution
$t = 55{,}000/29 \approx 1900$ generations, so the expected length is $100/1900 \approx 0.053$ cM, about 53 kb at 1 cM per Mb. Segments of tens of kilobases fit an admixture some 2000 generations ago. Run the reasoning in reverse and you date the admixture from the observed lengths: Sriram Sankararaman and colleagues (2012), using the decay of linkage disequilibrium, estimated that Neanderthal admixture into the ancestors of Europeans occurred about 47,000–65,000 years ago, consistent with fossil and archaeological evidence for when modern humans spread into Eurasia. More recent work with ancient genomes of early Europeans has narrowed this, and points to most of the interbreeding having occurred over several thousand years.
:::
:::

::: widget plot
f: 100/x; 100/(x*m)
x: 200, 5000
y: 0, 0.5
sliders: m=1:0.5:2:0.1
labels: \text{mean segment length (cM)}; \text{if later admixture is }1/m\text{ as old}
caption: Expected length in centimorgans of chromosome segments inherited from an admixture event $t$ generations ago (horizontal axis), $100/t$, and the same for an event $1/m$ times as old. With roughly 1 cM per million base pairs in humans, 0.05 cM on the first curve corresponds to about 50 kb, at about 2000 generations — the age of Neanderthal admixture. Notice that very old admixture leaves short segments that are hard to detect, and that segment length changes most steeply for recent events, which is why recent admixture can be dated precisely.
:::

Admixture brought some advantageous alleles. Tibetans carry a haplotype of the gene *EPAS1*, involved in the response to low oxygen, that was introduced from Denisovans and rose to high frequency in the high-altitude population (Emilia Huerta-Sánchez and colleagues, 2014). Other archaic segments have been depleted by selection, especially on the X chromosome and in genes expressed in testes, suggesting that some Neanderthal alleles were mildly deleterious in hybrids.

### Population genetics of a young species

Humans are numerous — about eight billion people — but genetically not very diverse. Two copies of the human genome differ at about 1 site in 1000. Under neutrality the expected diversity is $\pi = 4N_e\mu$, which gives an estimate of the long-term effective population size.

::: example The effective size of humanity {#ex-ne}
Take human nucleotide diversity to be $\pi = 0.001$ and $\mu = 1.2\times10^{-8}$ per site per generation. Estimate the long-term effective population size, and explain why it is so much smaller than the census size.
::: solution
$N_e = \pi/(4\mu) = 0.001/(4\times1.2\times10^{-8}) = 20{,}800$. Older textbooks quote about 10,000, using a higher mutation rate estimated from human–chimpanzee divergence; the order of magnitude is the point. $N_e$ is a long-term harmonic-mean-like average ([[evolution/mutation-drift-gene-flow]]), dominated by the small populations of our ancestors over hundreds of thousands of years, including the founder bottlenecks of the dispersal from Africa; the explosive growth of the last 10,000 years has had little time to affect it. Several chimpanzee populations, with far smaller census sizes today, are more genetically diverse than the whole human species.
:::
:::

### Recent selection

Human populations have continued to evolve since dispersing from Africa, in response to diet, climate, altitude and disease. The best-documented example is **lactase persistence**, the continued production of the enzyme lactase into adulthood, which allows adults to digest the milk sugar lactose. In most mammals, and most humans, lactase production declines after weaning. In populations with a long history of dairying, alleles in an enhancer upstream of the lactase gene *LCT* keep it on: one allele (−13910*T) is common in northern Europe (Nabil Sabri Enattah and colleagues, 2002), and different alleles at nearby positions arose independently in pastoralist populations of East Africa and the Middle East (Sarah Tishkoff and colleagues, 2007) — convergent evolution at the molecular level, and an example of **gene–culture coevolution**. The haplotypes carrying them are long and little broken by recombination, the signature of a recent, rapid rise driven by strong selection, with estimated selection coefficients of several per cent.

::: example How quickly can a dominant allele spread? {#ex-lactase}
Lactase persistence is dominant. Iterate [[evolution/natural-selection#eq-diploid]] with fitnesses $1 + s$, $1 + s$, $1$ to find how many generations a persistence allele needs to rise from 0.001 to 0.5, for $s = 0.02$, $0.05$ and $0.1$, and convert to years with a generation time of 28 years.
::: solution
Iterating numerically gives 400 generations for $s = 0.02$ (about 11,000 years), 163 for $s = 0.05$ (about 4,600 years) and 84 for $s = 0.1$ (about 2,400 years). Dairying began in south-west Asia and Europe roughly 9,000–8,000 years ago, so the rise to the high frequencies seen in parts of Europe today requires selection of at least a few per cent per generation — among the strongest known in the human genome. Ancient DNA has since shown that the allele remained rare in Europe for several thousand years after dairying began and rose mainly in the last 4,000–3,000 years, implying stronger selection, perhaps during famines or epidemics, than steady-state estimates suggest.
:::
:::

::: quiz
Which of the following statements about human evolution are well supported by current evidence?
- [x] Habitual bipedalism evolved millions of years before the large increase in brain size.
- [x] People outside Africa today carry a small fraction of Neanderthal ancestry.
- [ ] *Homo sapiens* evolved independently from *H. erectus* in several continents.
- [x] Several hominin species coexisted at times in the last two million years.
- [ ] Humans and chimpanzees differ in about 10 % of their single-nucleotide sites.
::: solution
Bipedalism is documented by *A. afarensis* and the Laetoli footprints (around 3.7–3.2 Ma) with ape-sized brains; brains enlarged mainly after 2 Ma. Neanderthal ancestry of about 1–2 % in people outside Africa comes from interbreeding after the dispersal. Fossils and genomes point to a primarily African origin of *H. sapiens* (with some archaic admixture), not multiregional parallel evolution. *Paranthropus*, early *Homo* and *H. erectus* overlapped in eastern Africa, and *H. sapiens*, Neanderthals, Denisovans and *H. floresiensis* in the last 100,000 years. The human–chimpanzee single-nucleotide difference is about 1.2 %, not 10 %.
:::
:::

::: application Ancient DNA and ethics
Ancient DNA has transformed archaeology, revealing large prehistoric migrations (for example, the spread of ancestry from the Pontic–Caspian steppe into Europe around 5,000 years ago) and the relationships of past populations to present ones. Because it concerns real people and their descendants, the field has adopted principles for working with human remains: consultation with communities, especially Indigenous communities whose ancestors are studied, respect for remains, and care in how results are communicated, since genetic ancestry is easily misused to make claims about identity, ethnicity or rights that the science does not support. Population-genetic results describe the movement and mixture of populations; they say nothing about the worth of any group.
:::

::: history
Neanderthal fossils were found in the Feldhofer Cave in Germany's Neander Valley in 1856, three years before the *Origin*. Huxley's *Man's Place in Nature* appeared in 1863 and Darwin's *Descent of Man* in 1871. Dubois found *Homo erectus* in Java in 1891, Dart described the Taung child in 1925, the Leakeys found *Paranthropus boisei* at Olduvai in 1959 and named *Homo habilis* in 1964, and Johanson and Gray found Lucy in 1974. Vincent Sarich and Allan Wilson (1967) used immunological distances to argue for a human–ape split only about 5 million years ago, much later than palaeontologists then thought. Cann, Stoneking and Wilson's mitochondrial tree appeared in 1987, Pääbo's first Neanderthal mtDNA in 1997, the chimpanzee genome in 2005, and the Neanderthal and Denisovan genomes in 2010. *Sahelanthropus* was described in 2002, *Ardipithecus ramidus* in full in 2009, *H. floresiensis* in 2004, *H. naledi* in 2015, and the Jebel Irhoud dates in 2017.
:::

::: summary
- Humans are great apes; chimpanzees and bonobos are our closest relatives, gorillas next. Human and chimpanzee genomes differ at about 1.2 % of single-nucleotide sites, and the lineages split perhaps 6–10 Ma (molecular dates depend on mutation rate, generation time and ancestral polymorphism).
- Hominins are defined by bipedalism and reduced canines; the record runs from *Sahelanthropus* (about 7 Ma) through *Ardipithecus*, australopiths and *Paranthropus* to *Homo* (from about 2.8 Ma).
- Bipedalism came first; stone tools by 3.3 Ma; brain enlargement mainly after 2 Ma (about 0.3 darwins on average). The hominin tree is bushy, with several coexisting species.
- *Homo erectus* left Africa by 1.8 Ma. *H. sapiens* arose in Africa by about 300,000 years ago and dispersed widely after about 60,000 years ago; genetic diversity is highest in Africa.
- Non-Africans carry about 1–2 % Neanderthal ancestry; Denisovan ancestry is a few per cent in Oceania; admixture is dated from segment lengths ($\approx 100/t$ cM) to about 50,000–60,000 years ago, and some archaic alleles (*EPAS1*) were adaptive.
- Human $N_e \approx 10^4$ (from $\pi = 4N_e\mu$); most variation lies within populations and does not form discrete races.
- Recent selection, such as lactase persistence, shows convergent molecular evolution and gene–culture coevolution with selection coefficients of several per cent.
:::

## Exercises

::: exercise Admixture proportion {level=1 check="0.04"}
An allele has frequency 0.30 in source population 1 and 0.10 in source population 2. In an admixed population it has frequency 0.108. Using [[#eq-admixture]], what fraction of the admixed population's ancestry comes from source 1?
::: solution
$f = (0.108 - 0.10)/(0.30 - 0.10) = 0.008/0.20 = 0.04$.
:::
:::

::: exercise Effective size from diversity {level=1 check="12500"}
If $\pi = 0.0006$ and $\mu = 1.2\times10^{-8}$ per site per generation, what is $N_e$?
::: solution
$N_e = \pi/(4\mu) = 0.0006/(4.8\times10^{-8}) = 12{,}500$.
:::
:::

::: exercise Generations since admixture {level=1 check="2000"}
Introgressed segments average 0.05 cM. Using the approximation length $\approx 100/t$ cM, how many generations ago did admixture happen?
::: solution
$t = 100/0.05 = 2000$ generations (about 58,000 years at 29 years per generation).
:::
:::

::: exercise Sequence divergence to time {level=2 check="6.25"}
Two sequences differ at 0.5 % of sites. With $\mu = 1.0\times10^{-8}$ per site per generation and a generation time of 25 years, how many million years ago did they share a common ancestor, ignoring ancestral polymorphism?
::: solution
$T = d/(2\mu) = 0.005/(2\times10^{-8}) = 2.5\times10^5$ generations, $\times25 = 6.25$ Myr.
:::
:::

::: exercise A rate in darwins {level=2 check="0.231"}
Mean endocranial volume increases from 600 cm³ to 1200 cm³ over 3 Myr. What is the rate in darwins (three significant figures)?
::: solution
$\ln 2/3 = 0.693/3 = 0.231$ darwins.
:::
:::

::: exercise Coalescence and species splits {level=2}
(a) Why is the average divergence time of genes between two species older than the time at which the species split? (b) For which species pair would you expect the difference to be larger: two species descended from an ancestral population with $N_e = 10^4$, or one with $N_e = 10^5$, if generation times are equal? (c) Why might this matter for dating the human–chimpanzee split?
::: solution
(a) At the moment of the split, gene copies sampled from the two daughter populations already differ, because the ancestral population was polymorphic; tracing them back, they coalesce in the ancestral population, on average $2N_e$ generations before the split.
(b) The larger ancestral population: the extra time is $2N_e$ generations, ten times larger for $N_e = 10^5$.
(c) The human–chimpanzee ancestor appears to have had a large effective size (tens of thousands or more), so a substantial part of the genetic divergence — about 2–3 Myr in [[#ex-split]] — predates the split. Ignoring it makes the split look too old; incomplete lineage sorting across the human–chimpanzee–gorilla trio is direct evidence of this ancestral polymorphism.
:::
:::

::: exercise Interpreting a cline in diversity {level=2}
In a sample of populations, heterozygosity decreases roughly linearly with geographic distance from eastern Africa along land routes. (a) What model of population history explains this? (b) Why does each founder event reduce heterozygosity? (c) What pattern would the multiregional model have predicted instead?
::: solution
(a) A serial founder model: modern humans expanded out of Africa in a series of steps, each new population founded by a subset of the previous one.
(b) A small founding group carries only part of the variation of its source; drift during the bottleneck reduces heterozygosity by about $1/2N_e$ per generation of small size ([[evolution/mutation-drift-gene-flow#eq-hdecay]]). Repeated founder events compound the loss.
(c) Under multiregional evolution with long-standing regional populations connected by gene flow, diversity would not be expected to fall systematically with distance from Africa; regions with long histories (for example East Asia, with *H. erectus* since over 1 Ma) might even have high diversity.
:::
:::

::: exercise Lactase selection from data {level=3}
Suppose an allele for lactase persistence rose from frequency 0.05 to 0.70 in a population over the last 4,000 years (generation time 28 years). (a) How many generations is that? (b) Treating the allele as dominant, estimate roughly the selection coefficient needed, using the fact (from iterating the diploid recursion) that a dominant allele with $s = 0.05$ takes about 163 generations from 0.001 to 0.5 — and reasoning about how much less time 0.05 to 0.70 needs. (c) What other processes besides selection could raise an allele's frequency in a population, and how can they be distinguished?
::: solution
(a) $4000/28 \approx 143$ generations.
(b) Starting at 0.05 instead of 0.001 saves the early phase: for a dominant allele with $s = 0.05$, the time from 0.001 to 0.05 is roughly $\ln(50)/s \approx 80$ generations (when rare, $\Delta p \approx sp$), leaving about 80 generations from 0.05 to 0.5. Going on to 0.70 takes longer than one might guess, because a dominant allele slows as it becomes common: iteration gives about 46 more generations, so 0.05 to 0.70 takes about 126 generations at $s = 0.05$. That is a little less than 143, so a slightly smaller $s$ suffices; iterating [[evolution/natural-selection#eq-diploid]] for several values gives 156 generations at $s = 0.040$ and 139 at $s = 0.045$, so $s \approx 0.044$. (Rough estimates of this kind are what ancient-DNA studies refine.)
(c) Drift (in small populations) and migration (admixture with a population in which the allele was already common) can also raise frequencies. They affect the whole genome, whereas selection affects one region: if the allele's rise is much greater than that of typical neutral alleles with similar starting frequencies, and its haplotype is unusually long and unbroken, selection is implicated. Ancient DNA lets one follow the frequency through time and check whether admixture explains it.
:::
:::

::: exercise Evaluating a claim {level=3}
A popular article states: "Scientists have found the gene that made us human — *FOXP2*, the language gene." Using what you know about human evolution, genetics and the evidence from ancient genomes, write a short critique.
::: solution
*FOXP2* encodes a transcription factor; rare mutations in it impair speech and language in the affected people, and the human protein differs from the chimpanzee protein at two amino-acid positions, which earlier studies suggested were targets of recent selection. But (1) no single gene "made us human": the differences between humans and chimpanzees involve millions of sequence changes, many of them in regulatory DNA, affecting many traits; (2) the two human-specific *FOXP2* substitutions are shared with Neanderthals and Denisovans (Johannes Krause and colleagues, 2007), so they predate modern humans and cannot by themselves explain anything unique to *H. sapiens*; later analyses also failed to confirm the original signal of a recent selective sweep; (3) *FOXP2* is expressed in many tissues and acts in neural circuits for motor learning in other species, including songbirds and mice — it is involved in language, not a gene "for" it. Language depends on many genes, developmental processes and cultural learning.
:::
:::
