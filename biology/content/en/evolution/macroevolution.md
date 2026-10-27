The processes of the earlier chapters — selection, drift, mutation, gene flow, speciation — act within populations over generations. The history of life is written over hundreds of millions of years: the appearance of animals in the Cambrian, the colonisation of land, the rise and fall of dinosaurs, the radiation of flowering plants and mammals. **Macroevolution** is evolution above the species level: the origin of major groups and novel structures, the rates and patterns of change across geological time, and the dynamics of diversity itself — why some clades have thousands of species and their sister clades a handful, and why diversity has repeatedly collapsed in mass extinctions and recovered.

A central question is whether macroevolution is simply microevolution accumulated over long periods, or whether processes appear at larger scales that cannot be seen within populations. The answer of most evolutionary biologists is that the same processes operate, but that new phenomena emerge at the level of clades — differential speciation and extinction, the effects of rare catastrophes, the long-term consequences of developmental architecture. This chapter introduces the geological time scale and the shape of the fossil record, measures rates of evolution, models diversification as a birth–death process, treats adaptive radiations and mass extinctions, and asks how evolutionary novelties arise. It uses the tree-thinking of [[evolution/phylogenetics]] throughout.

## The geological time scale

The time scale was built in the nineteenth century from the order of fossils in rocks ([[evolution/evidence-for-evolution]]); radiometric dating later gave it absolute ages. The boundaries are defined internationally by the International Commission on Stratigraphy (ICS), each at a reference point in a particular rock section (a "golden spike"), and their ages are revised as dating improves.

| Era | Period | Begins (Ma) | Events |
|---|---|---|---|
| Neoproterozoic | Ediacaran | ≈ 635 | Ediacaran biota, the first large multicellular organisms (from about 575 Ma) |
| Palaeozoic | Cambrian | 538.8 | rapid appearance of most animal phyla with skeletons ("Cambrian explosion") |
| | Ordovician | 486.9 | great Ordovician biodiversification; first land plants (spores); end-Ordovician extinction |
| | Silurian | 443.1 | jawed fishes diversify; vascular plants |
| | Devonian | 419.6 | "age of fishes"; first forests; first tetrapods; Late Devonian extinctions |
| | Carboniferous | 358.9 | coal forests; first amniotes; giant insects |
| | Permian | 298.9 | synapsids and reptiles diversify; ends in the largest mass extinction |
| Mesozoic | Triassic | 251.9 | first dinosaurs, mammals and pterosaurs; end-Triassic extinction |
| | Jurassic | 201.4 | dinosaurs dominant; first birds |
| | Cretaceous | ≈ 143 | flowering plants radiate; ends with the end-Cretaceous extinction |
| Cenozoic | Palaeogene | 66.0 | radiation of mammals and birds |
| | Neogene | 23.0 | grasslands spread; hominins appear |
| | Quaternary | 2.58 | glacial cycles; *Homo sapiens* |

Ages are rounded from the ICS *International Chronostratigraphic Chart*, version 2023/09 (Cohen and colleagues, 2013, updated). Several boundaries have been revised in recent versions as new radiometric dates have accumulated: earlier charts, including the GSA Geologic Time Scale v. 5.0 (2018), gave 541 Ma for the base of the Cambrian, 485.4 Ma for the Ordovician and about 145 Ma for the Cretaceous. Boundaries defined by fossils are dated by interpolation between dated ash beds, and the base of the Cretaceous, which lacks a formally agreed golden spike, is the most uncertain; check the current chart for up-to-date values.

Earth formed about 4.54 billion years ago; the oldest widely accepted evidence of life (microfossils and stromatolites, and isotopic signatures of biological carbon fixation) is around 3.5 billion years old, and some claims are older but debated. For most of its history life was microbial. Eukaryotes are clearly present in the fossil record by about 1.6 billion years ago; complex multicellular animals appear only in the last 10–15 % of the history of life.

::: definition The fossil record as data {#def-record}
The **fossil record** is a sample of past life, biased by **preservation** (organisms with hard parts, living in depositional environments, are far more likely to fossilise), by the **rock record** (more recent and more extensive rocks yield more fossils) and by **sampling effort**. The first appearance of a taxon in the record is therefore later than its true origin, and its last appearance earlier than its true extinction (the **Signor–Lipps effect**, 1982). Diversity through time is estimated by counting taxa (species, genera, families) ranging through each interval, with corrections for uneven sampling.
:::

Fossil durations are usually counted at the level of genera or families, which are more reliably recognised than species. John Sepkoski's compendia of the first and last appearances of marine animal families and genera (1982, 2002) underlie most classic analyses of diversity through time.

## Rates of evolution

How fast does evolution happen? For a measurement such as tooth length, J. B. S. Haldane (1949) proposed a unit, the **darwin**: a change by a factor of $e$ per million years.

::: definition Darwins and haldanes {#def-rates}
If a trait changes from mean $x_1$ to mean $x_2$ in $\Delta t$ million years, its rate in **darwins** is

$$
r_\mathrm{d} = \frac{\ln x_2 - \ln x_1}{\Delta t}.
$$ {#eq-darwin}

The rate in **haldanes** (Philip Gingerich, 1993) is the change measured in pooled standard deviations of the trait per generation:

$$
r_\mathrm{h} = \frac{(\bar z_2 - \bar z_1)/s_p}{g},
$$

where $\bar z$ is the mean (often of the natural logarithm of the trait), $s_p$ the pooled within-population standard deviation and $g$ the number of generations elapsed.
:::

::: example How fast did horse teeth evolve? {#ex-darwins}
Over about 30 million years of the evolution of horses, a molar dimension increased from 10 mm to 25 mm (illustrative round numbers of the right order). Calculate the rate in darwins. A population of guppies (*Poecilia reticulata*) transplanted to a stream without predators changes a trait by a factor of 1.1 in 10 years. Compare the rates.
::: solution
Horses: $r_\mathrm{d} = \ln(25/10)/30 = 0.916/30 = 0.031$ darwins, or 31 millidarwins.

Guppies: $\ln 1.1/10^{-5}\ \text{Myr} = 0.0953/10^{-5} = 9530$ darwins, about 300,000 times faster.

This contrast is typical. In David Reznick's transplant experiments in Trinidad, guppies evolved changes in life history at rates of thousands to tens of thousands of darwins (Reznick and colleagues, 1997), whereas fossil lineages show rates of a fraction of a darwin. Gingerich (1983) showed that measured rates fall roughly in inverse proportion to the length of the interval over which they are measured. The reason is not that evolution slows down over long intervals but that it fluctuates: change over a long interval is the *net* result of many changes in different directions, so dividing it by the interval underestimates the speed of the individual steps. Microevolution is fast enough, by orders of magnitude, to account for any change seen in the fossil record.
:::
:::

### Punctuated equilibrium

In 1972 Niles Eldredge and Stephen Jay Gould argued that the fossil record of many species shows long periods of little morphological change (**stasis**) interrupted by geologically abrupt shifts associated with the origin of new species — **punctuated equilibrium** — rather than the steady transformation of **phyletic gradualism**. They interpreted this using Mayr's model of peripatric speciation: change happens in small, isolated populations, too briefly and locally to be preserved, and the new species then spreads and persists unchanged.

The idea provoked a long debate. Detailed studies of well-preserved lineages have found examples of both patterns — gradual change in some lineages of planktonic foraminifera, and stasis punctuated by rapid change in bryozoans (Alan Cheetham's studies of *Metrarabdotos*, 1986) — and many intermediate cases. A "geologically abrupt" change taking 50,000 years can involve thousands of generations of ordinary selection. The lasting contributions of the debate were the recognition that **stasis** is common and needs explanation (stabilising selection, habitat tracking as environments shift, and the averaging of fluctuating selection are the main candidates), and attention to processes acting at the level of species.

## Diversification: speciation minus extinction

The number of species in a clade changes by speciation (lineages splitting) and extinction (lineages ending). The simplest model treats each lineage as having a constant probability per unit time of each event.

::: proposition The birth–death model of diversification {#prop-birthdeath}
If every lineage independently splits at rate $\lambda$ (speciation) and goes extinct at rate $\mu$ (extinction), per lineage per million years, the expected number of lineages at time $t$ starting from $N_0$ is

$$
\E[N(t)] = N_0\,e^{(\lambda - \mu)t},
$$ {#eq-bd}

growing exponentially at the **net diversification rate** $r = \lambda - \mu$. Conversely, a clade of $N$ living species descended from a single lineage $t$ million years ago (the **stem age**) has an estimated net diversification rate $\hat r = \ln N/t$; if $t$ is the **crown age**, the age of the split between the two lineages that gave rise to all living members, $\hat r = (\ln N - \ln 2)/t$ (Susana Magallón and Michael Sanderson, 2001, ignoring a correction for extinction).
:::

::: proof
Let $n(t) = \E[N(t)]$. In a short interval $\delta t$, each lineage splits with probability $\lambda\,\delta t$ (adding one) and dies with probability $\mu\,\delta t$ (removing one), so $n(t + \delta t) = n(t) + (\lambda - \mu)n(t)\,\delta t$, giving $dn/dt = (\lambda - \mu)n$ with solution $n(t) = N_0e^{(\lambda - \mu)t}$. Setting $n = N$ and solving for $r$ gives the estimators; from the crown age, two lineages start, so $N = 2e^{rt}$.
:::

::: example Fast and slow radiations {#ex-diversification}
(a) The cichlid fishes of an East African lake comprise about 500 endemic species whose crown age is estimated at about 2 million years. (b) Flowering plants comprise roughly 300,000 described species, with a crown age of roughly 140 million years. Estimate the net diversification rate of each, and the doubling time of the number of lineages.
::: solution
(a) $\hat r = (\ln 500 - \ln 2)/2 = (6.215 - 0.693)/2 = 2.76$ per lineage per Myr; doubling time $\ln 2/\hat r = 0.25$ Myr.

(b) $\hat r = (\ln 300{,}000 - \ln 2)/140 = (12.61 - 0.69)/140 = 0.085$ per lineage per Myr; doubling time 8.2 Myr.

The lake cichlids have diversified more than thirty times faster than flowering plants on average, though both are celebrated as radiations. Both numbers are rough: crown ages are uncertain (the flowering-plant crown age is debated, with molecular dates often older than the first unambiguous fossils, around 130–135 Ma), species counts are approximate, and the formula assumes a constant rate without extinction. Including extinction raises the speciation rate needed to produce the same number of species.
:::
:::

::: widget plot
f: 2*exp((l - m)*x); 2*exp(l*x)
x: 0, 20
y: 0, 500
sliders: l=0.3:0:1:0.01; m=0.1:0:1:0.01
labels: \text{expected lineages, } \lambda-\mu; \text{no extinction}
caption: The expected number of lineages in a clade, [[#eq-bd]], against time in Myr after a split into two lineages, for speciation rate $\lambda$ ($l$) and extinction rate $\mu$ ($m$) per lineage per Myr; the second curve shows the same speciation rate with no extinction. Notice that only the difference $\lambda - \mu$ matters for the expected count — a clade with high speciation and high extinction can look the same as one with low rates of both. Set $m$ above $l$ and the clade is expected to decline; in reality it would usually die out, since the model is stochastic and small clades are easily lost.
:::

Clades differ enormously in species richness. Beetles have about 400,000 described species; their sister group, the twisted-wing parasites (Strepsiptera), around 600. Because sister groups are by definition the same age, such contrasts point to differences in diversification rate. A trait associated with higher diversification in many independent comparisons is called a **key innovation**: nectar spurs in flowering plants (Scott Hodges and Michael Arnold, 1995, in columbines, *Aquilegia*), herbivory in insects (Charles Mitter and colleagues, 1988), and the pharyngeal jaws of cichlids are proposed examples. Testing them requires replication across clades, because any single pair of sister groups differs in many traits.

**Species selection** (Steven Stanley, 1975) refers to differential speciation or extinction among lineages caused by heritable traits *at the species level* — such as geographic range size, which is a property of a species, not of an individual. Among Late Cretaceous molluscs, David Jablonski showed that species with planktonic larvae (wide dispersal, large ranges) survived longer as species than those with direct development, although the latter speciated more often.

### Extinction and the Red Queen

Most species that have ever lived are extinct; the average marine invertebrate species persists for a few million years in the fossil record (estimates range from about 1 to 10 Myr, depending on group). In 1973 Leigh Van Valen plotted the fraction of genera or families in a group surviving for at least a given time and found the curves to be roughly straight on a logarithmic scale: the probability of extinction per unit time was roughly constant, independent of how long a taxon had already existed. This is the result of a constant per-lineage extinction rate $\mu$, for which the proportion surviving to age $t$ is $e^{-\mu t}$. His interpretation, the **Red Queen hypothesis**, is in [[evolution/coevolution]].

::: quiz
Two sister clades of beetles are the same age; one has 2000 species and the other 20. Which conclusion is justified without further data?
- [ ] The larger clade has a lower extinction rate.
- [ ] The larger clade has a higher speciation rate.
- [x] The larger clade has had a higher net diversification rate ($\lambda - \mu$), or has been luckier, or both.
- [ ] The larger clade must possess a key innovation.
::: solution
Because sister clades are the same age, the difference in size implies a difference in net diversification, $\lambda - \mu$, under [[#eq-bd]] — but the counts alone cannot separate higher speciation from lower extinction, since only their difference sets the expected size. Diversification is also stochastic: even with identical rates, sister clades can differ by a large factor by chance, especially when small. A key innovation is one possible cause, which requires replicated comparisons to test.
:::
:::

## Adaptive radiation

::: definition Adaptive radiation {#def-radiation}
An **adaptive radiation** is the rapid diversification of a lineage into many species occupying a wide variety of ecological niches, accompanied by the evolution of phenotypic differences that adapt them to those niches (Dolph Schluter, 2000). Its criteria are common ancestry, a correlation between phenotype and environment, adaptive value of the traits (shown by performance or fitness), and rapid speciation.
:::

Radiations tend to follow **ecological opportunity**: colonisation of a new area with few competitors (islands, lakes), the evolution of a key innovation, or the extinction of competitors. Classic examples:

- **Darwin's finches**: about 18 species from a single ancestral population that reached the Galápagos within the last few million years (molecular estimates of the age of the radiation range from about one to three million years), with beaks adapted to seeds, insects, cactus flowers, buds and even blood. Arkhat Abzhanov and colleagues (2004, 2006) showed that differences in beak depth and length are associated with the expression of the signalling genes *Bmp4* and calmodulin in the developing beak.
- **Anolis lizards** of the Greater Antilles: on each of the four large islands — Cuba, Hispaniola, Jamaica, Puerto Rico — anoles have independently evolved the same set of "ecomorphs" (trunk–ground, twig, crown–giant and others), each with similar limb proportions and toepads suited to its perch, as shown by the phylogeny (Jonathan Losos and colleagues, 1998). Radiation was repeatable.
- **East African cichlids**: hundreds of species in each of Lakes Victoria, Malawi and Tanganyika, with diets from algae scraping to scale-eating, and colours used in mate choice ([[evolution/sexual-selection]]).
- **Mammals after the dinosaurs**: mammals existed for more than 150 million years before the end-Cretaceous extinction, mostly small; in the first ten million years of the Palaeogene, the major groups of placental mammals diversified rapidly into the ecological roles vacated by non-avian dinosaurs.

## Mass extinctions

Against the steady background of extinction, the record shows a few intervals of catastrophic loss. David Raup and John Sepkoski (1982), analysing marine families, identified five events standing out above the background — the "Big Five".

| Event | Age (Ma) | Estimated loss of marine species | Leading explanation |
|---|---|---|---|
| End-Ordovician | ≈ 444 | about 85 % | glaciation and sea-level fall, changes in ocean chemistry |
| Late Devonian | ≈ 372 (Kellwasser) and ≈ 359 (Hangenberg) | about 75 % | several pulses; ocean anoxia |
| End-Permian | 251.9 | about 80–90 % | Siberian Traps volcanism: warming, ocean acidification and anoxia |
| End-Triassic | 201.4 | about 75 % | Central Atlantic Magmatic Province volcanism |
| End-Cretaceous | 66.0 | about 75 % | asteroid impact (Chicxulub), with Deccan Traps volcanism |

(Species losses are estimates extrapolated from genera and vary between studies; see Jablonski, 1994, and later reviews.)

The **end-Permian** extinction is the largest. Seth Burgess, Samuel Bowring and Shu-zhong Shen (2014) dated it with U–Pb on zircons from ash beds in south China to 251.94 Ma and showed that the main pulse lasted less than about 60,000 years. It eliminated the trilobites (already reduced), the tabulate and rugose corals, and most groups of brachiopods and crinoids, and reorganised marine ecosystems: Palaeozoic faunas dominated by brachiopods and stalked echinoderms gave way to Mesozoic and Cenozoic faunas dominated by molluscs.

The **end-Cretaceous** extinction is the best understood. Luis Alvarez, Walter Alvarez, Frank Asaro and Helen Michel (1980) found a layer enriched in iridium — an element rare in Earth's crust but common in meteorites — at the boundary at Gubbio in Italy and elsewhere, and proposed an asteroid impact. Shocked quartz, spherules and tsunami deposits followed, and in 1991 Alan Hildebrand and colleagues identified the buried Chicxulub crater, about 180 km across, on the Yucatán peninsula, of the right age. The extinction removed the non-avian dinosaurs, pterosaurs, ammonites and many groups of plankton; birds, mammals, crocodiles, turtles and many plants survived.

Mass extinctions matter for evolution in two ways. They are not just more of the background: survival during them is often unrelated to the traits that predicted survival in normal times (Jablonski, 1986, found that the large geographic ranges of genera, rather than of species, predicted survival through the end-Cretaceous event). And by removing dominant groups they open ecological opportunity for others, as for mammals in the Palaeogene. History is contingent on rare events.

::: example How many species must die to lose half the genera? {#ex-rarefaction}
Suppose an extinction kills each species independently with probability $q$. (a) What is the probability that a genus with $k$ species loses all of them? (b) For $q = 0.9$, compare genera of 1, 2, 5 and 10 species. (c) Explain why extinction estimated at the genus or family level underestimates species loss.
::: solution
(a) The genus disappears only if all $k$ species die: probability $q^k$.

(b) With $q = 0.9$: $k = 1$: 0.90; $k = 2$: 0.81; $k = 5$: 0.59; $k = 10$: 0.35. A 90 % loss of species kills only a third of ten-species genera.

(c) Higher taxa survive if any one of their species does, so the proportion of genera (and still more of families) lost is smaller than that of species. Working backwards from the observed loss of higher taxa, using the distribution of species per genus, David Raup (1979) estimated by this "reverse rarefaction" that the end-Permian event may have killed up to about 96 % of marine species — an upper bound; later estimates with better data are closer to 80–90 %.
:::
:::

::: widget plot
f: x^k; x
x: 0, 1
y: 0, 1
sliders: k=5:1:20:1
labels: \text{genus loss } q^k; \text{species loss } q
caption: The probability that a genus of $k$ species goes extinct, $q^k$, against the probability $q$ that each species dies, assuming independence; the diagonal is the species loss itself. Notice how far below the diagonal the curve lies for genera with several species: even at $q = 0.8$, a five-species genus survives two times in three. Real extinctions are not independent across species of a genus (related species share traits and ranges), which brings genus loss closer to species loss.
:::

::: warning "Mass extinctions are just bad luck" and "extinction shows that species failed"
Extinction is the eventual fate of almost all lineages; a species going extinct in normal times is not a sign of inferiority any more than its earlier success was a sign of superiority, since both depend on environments that change. But neither are extinctions purely random: in background times, narrowly distributed, large-bodied and specialised species are at greater risk, and during mass extinctions some traits (wide geographic distribution of a clade, tolerance of low oxygen, small body size) improved survival. The present-day loss of species, driven by human activity, is fast enough that some biologists speak of a sixth mass extinction in progress; whether it will reach the scale of the Big Five depends on what happens next ([[conservation-biology]]).
:::

## The origin of novelties

How do new structures — feathers, flowers, eyes, limbs — arise? Three answers recur.

**Modification and co-option.** New structures are usually modified old ones, often with a change of function (exaptation; [[evolution/natural-selection]]). Feathers evolved in dinosaurs as filaments, probably for insulation or display, long before they were used in flight. The bones of the mammalian middle ear were jaw bones. The lens crystallins of vertebrate eyes are co-opted metabolic enzymes and stress proteins.

**Gradual improvement through intermediates.** Darwin answered the objection that a complex eye could not have evolved by pointing to the range of eyes in living animals, from light-sensitive spots to cups, pinhole eyes and lensed eyes, each useful. Dan-Eric Nilsson and Susanne Pelger (1994) modelled the transformation of a flat patch of light-sensitive cells into a camera eye with a graded-index lens, through a sequence of small changes each improving spatial resolution.

::: example How long does an eye take? {#ex-eye}
Nilsson and Pelger found that the transformation from a flat patch to a focused camera eye required a total change equivalent to 1829 successive steps of 1 % each. Assuming each trait has heritability $h^2 = 0.5$, a coefficient of variation of 1 %, and weak selection that changes each generation's mean by 0.005 %, how many generations does the whole transformation take?
::: solution
The total change is a factor $1.01^{1829} = 8.0\times10^7$. At a change of 0.005 % per generation, i.e. a factor 1.00005, the number of generations is

$$
g = \frac{\ln(8.0\times10^7)}{\ln 1.00005} = \frac{18.20}{5.0\times10^{-5}} = 3.64\times10^5,
$$

about 364,000 generations — a few hundred thousand years for an animal with a generation time of a year, a geological instant. (The per-generation change of 0.005 % follows from the breeder's equation [[evolution/natural-selection#eq-breeder]] with an intentionally weak selection differential of 0.01 % of the mean.) The model is deliberately pessimistic; it shows that the time needed is not a serious obstacle, not how eyes actually evolved in any lineage.
:::
:::

**Changes in development.** Evolutionary developmental biology ("evo-devo") showed in the 1980s–1990s that animals as different as flies and mice use a shared "toolkit" of developmental regulatory genes: the *Hox* genes, which specify identity along the head-to-tail axis and are arranged in clusters in the same order as the body regions they pattern; *Pax6*, needed for eye development in both — mouse *Pax6* induced extra eyes when expressed in the legs and antennae of *Drosophila* (Georg Halder, Patrick Callaerts and Walter Gehring, 1995); and *tinman*/*Nkx2.5* for hearts. This **deep homology** means that much morphological evolution has come not from new genes but from changes in when and where old ones are expressed, often through changes in **cis-regulatory** sequences (enhancers) that affect only one tissue and so avoid harmful pleiotropy. In threespine sticklebacks (*Gasterosteus aculeatus*), the repeated loss of the pelvic spines in freshwater populations is caused by deletions of a pelvic enhancer of the gene *Pitx1*, leaving the gene's other functions intact (Yingguang Frank Chan and colleagues, 2010).

**Gene and genome duplication.** Susumu Ohno (*Evolution by Gene Duplication*, 1970) argued that duplicated genes are freed from constraint, so that one copy can acquire a new function. Two rounds of whole-genome duplication early in vertebrate evolution are now supported by genome comparisons, and a third occurred in the ancestor of teleost fishes; the four *Hox* clusters of mammals, against one in insects, are their footprint. Globins, opsins and many other gene families diversified by duplication.

::: application Macroevolution and the present
The patterns of the past bear on the present biodiversity crisis. The fossil record shows that recovery of diversity after mass extinctions takes millions of years, and that the survivors are not a random sample. Measured extinction rates of the past few centuries for well-studied groups (birds, mammals, amphibians) are tens to hundreds of times the background rate estimated from fossils (Gerardo Ceballos and colleagues, 2015, with the caveats of comparing very different kinds of data). Phylogenies help set priorities: losing an evolutionarily distinct species with no close relatives, such as the tuatara (*Sphenodon punctatus*), the last of an order that diverged from other reptiles over 200 million years ago, removes more evolutionary history than losing one of many close relatives ([[conservation-biology]]).
:::

::: history
Cuvier established extinction (1796) and catastrophic faunal turnovers; Darwin explained the record's gaps by its incompleteness (1859). George Gaylord Simpson's *Tempo and Mode in Evolution* (1944) brought palaeontology into the Modern Synthesis and introduced adaptive zones and quantum evolution. Haldane defined the darwin in 1949. Eldredge and Gould proposed punctuated equilibrium in 1972; Van Valen published the Red Queen in 1973; Raup and Sepkoski identified the Big Five mass extinctions in 1982, and the Alvarez team proposed the end-Cretaceous impact in 1980, confirmed by the discovery of the Chicxulub crater in 1991. Edward Lewis's work on the *Drosophila* bithorax complex (1978) and the discovery of the homeobox (William McGinnis, Michael Levine, Walter Gehring and colleagues; Matthew Scott and Amy Weiner, 1984) founded evo-devo. The Burgess Shale fauna, found by Charles Walcott in 1909 and reinterpreted from the 1970s by Harry Whittington, Simon Conway Morris and Derek Briggs, and the Chengjiang biota of China (from 1984) document the Cambrian explosion.
:::

::: summary
- Macroevolution concerns patterns above the species level: the origin of major groups and novelties, rates over geological time, and diversification and extinction of clades.
- The ICS time scale (v2023/09): Cambrian 538.8 Ma, Permian–Triassic 251.9 Ma, Cretaceous–Palaeogene 66.0 Ma, Quaternary 2.58 Ma; boundary ages are revised as dating improves.
- Rates are measured in darwins ($\ln(x_2/x_1)/\Delta t$ per Myr) or haldanes (SD per generation); apparent rates fall with the measurement interval, and microevolution is fast enough for any change in the record. Stasis is common (punctuated equilibrium).
- Birth–death model: $\E[N] = N_0e^{(\lambda-\mu)t}$; net diversification from crown age $\hat r = (\ln N - \ln 2)/t$. Key innovations and species selection explain differences between clades.
- Adaptive radiations follow ecological opportunity (Darwin's finches, Caribbean anoles, cichlids, Palaeogene mammals) and can be repeatable.
- Five mass extinctions stand out; the end-Permian (251.9 Ma, linked to Siberian Traps volcanism) was the largest, the end-Cretaceous (66.0 Ma) followed the Chicxulub impact. Genera survive better than species ($q^k$).
- Novelties arise by co-option, gradual improvement through functional intermediates (an eye in about $4\times10^5$ generations), regulatory changes in a shared developmental toolkit, and gene and genome duplication.
:::

## Exercises

::: exercise A rate in darwins {level=1 check="0.0231"}
Body length in a lineage increases from 20 cm to 40 cm over 30 million years. What is the rate in darwins (three significant figures)?
::: solution
$r_\mathrm{d} = \ln 2/30 = 0.6931/30 = 0.0231$ darwins.
:::
:::

::: exercise Net diversification from a crown age {level=1 check="0.693"}
A clade of 64 living species has a crown age of 5 Myr. Estimate its net diversification rate per lineage per Myr (three significant figures).
::: solution
$\hat r = (\ln 64 - \ln 2)/5 = \ln 32/5 = 3.466/5 = 0.693$ per lineage per Myr: the number of lineages doubles every $\ln 2/0.693 = 1$ Myr, five doublings from 2 to 64.
:::
:::

::: exercise Genus survival {level=1 check="0.0625"}
If each species dies independently with probability 0.5, what is the probability that a genus of 4 species goes extinct?
::: solution
$0.5^4 = 0.0625$.
:::
:::

::: exercise Expected clade size {level=2 check="148"}
A clade starts as one lineage with $\lambda = 0.6$ and $\mu = 0.1$ per lineage per Myr. What is the expected number of lineages after 10 Myr, to the nearest whole number?
::: solution
$\E[N] = e^{0.5\times10} = e^5 = 148.4$, about 148.
:::
:::

::: exercise Survivorship {level=2 check="0.082"}
If genera in a group go extinct at a constant rate of 0.25 per Myr, what fraction survive 10 Myr (three decimal places)?
::: solution
$e^{-0.25\times10} = e^{-2.5} = 0.082$.
:::
:::

::: exercise Interpreting a survivorship curve {level=2}
Van Valen plotted, for many groups, the logarithm of the number of genera surviving at least $t$ million years against $t$, and found straight lines. (a) What does a straight line imply about the probability of extinction of a genus? (b) What would a curve that becomes flatter with $t$ mean? (c) Why was this result surprising, and how did he interpret it?
::: solution
(a) $\ln(\text{survivors}) = \ln N_0 - \mu t$: the per-genus extinction rate $\mu$ is constant, independent of the genus's age.
(b) Older genera would have a lower extinction rate: lineages would become more resistant to extinction as they age (or the group would contain a mixture of high- and low-risk genera, the high-risk ones dying first).
(c) One might expect lineages to get better at surviving as they adapt, or to become senescent. A constant rate suggests that adaptation never accumulates as a lasting advantage, because the environment — especially the other species evolving with it — keeps deteriorating from each lineage's point of view: the Red Queen hypothesis.
:::
:::

::: exercise Radiations compared {level=2}
On each of four Caribbean islands, anole lizards have evolved similar ecomorphs. Phylogenetic analysis shows that the ecomorphs on each island are more closely related to other ecomorphs on the same island than to the same ecomorph on other islands. (a) What does this imply about how the ecomorphs arose? (b) What alternative phylogeny would have implied a single origin of each ecomorph? (c) What does the result suggest about the predictability of evolution?
::: solution
(a) Each ecomorph evolved independently on each island, from ancestors on that island: convergent evolution, repeated four times.
(b) If each ecomorph formed a clade across islands (all twig anoles together, all trunk–ground anoles together), each would have originated once and dispersed between islands.
(c) Given similar ecological opportunity and similar ancestors, natural selection produced similar outcomes repeatedly, suggesting that adaptive radiation can be deterministic at the level of ecological types, even if the details (and which species fill which role) are contingent.
:::
:::

::: exercise Testing a key innovation {level=3}
A researcher proposes that nectar spurs are a key innovation in flowering plants. (a) Why is comparing one spurred genus with its unspurred sister genus insufficient? (b) Describe a better test. (c) What alternative explanations should be considered if spurred clades are consistently richer?
::: solution
(a) Any single pair of sister groups differs in many traits and histories; the richer clade might be richer by chance (diversification is stochastic) or because of some other trait.
(b) Find many independent origins of spurs (from a phylogeny), and for each compare the spurred clade with its unspurred sister group (which has the same age). If spurred clades are richer in significantly more comparisons than expected by chance (a sign test or a model-based comparison of diversification rates), the association is supported — as Hodges and Arnold found for *Aquilegia* and others found across angiosperms.
(c) The spur might be correlated with something else (e.g. specialised animal pollination generally, or particular habitats or geographic settings); richer clades may be easier to subdivide by taxonomists; or the causality may run the other way (spurs evolve more often in clades that are diversifying for other reasons). Mechanistic links (spur length changes leading to pollinator shifts and reproductive isolation) strengthen the case.
:::
:::

::: exercise A lens from enzymes {level=3}
Many vertebrate lens crystallins are identical or nearly identical to metabolic enzymes or heat-shock proteins, and in some species the same gene product serves both as enzyme in other tissues and as crystallin in the lens ("gene sharing", Joram Piatigorsky). (a) Explain why this supports co-option as a route to novelty. (b) What would be expected to happen, over time, if the gene were duplicated? (c) Explain why cis-regulatory change is often invoked for such novelties.
::: solution
(a) A protein already present, stable and soluble at high concentration was recruited into a new role (refracting light) by being expressed at high levels in the lens; no new protein had to evolve from scratch. The novelty arose by a change in where a gene is expressed, followed by refinement.
(b) A duplicate could specialise: one copy optimised for the lens (stability, refractive properties) and the other for its enzymatic role, resolving the conflict between the two functions ("escape from adaptive conflict" or subfunctionalisation). This has happened: duck δ-crystallins are encoded by duplicated argininosuccinate lyase genes, of which one has largely lost enzymatic activity.
(c) Expressing a gene in a new tissue requires changes in its regulatory sequences (enhancers), which can be tissue-specific and leave the protein and its other functions untouched, avoiding the harmful side effects (pleiotropy) that a change in the protein would have everywhere it is used.
:::
:::
