In 1909 Charles Walcott, the most powerful palaeontologist in America, went back to the Burgess Shale for a third field season and came down the mountain with a mule-load of slabs on which were preserved, in extraordinary detail, the Cambrian animals that he named *Hallucigenia*, *Anomalocaris* and *Opabinia*. He had 65,000 specimens by 1925. He interpreted them all as arthropods and worms, fitting them into the phyla that already existed, and he was wrong about nearly every one of them: *Anomalocaris* was a predator with a pineapple-shaped mouth and jointed grasping appendages, not a shrimp's tail; *Opabinia* had five eyes and a trunk; *Hallucigenia* was reconstructed upside down for seventy years. When Harry Whittington and his students re-worked the collection in the 1970s they found that most of the animals belonged to no living phylum, and that the early Cambrian experiment in body plans was far stranger than the modern fauna that survived it.

The Burgess Shale is the perfect introduction to palaeontology because it makes two points at once. The first is that the fossil record is a record of what got preserved, which is a small and unrepresentative sample of what lived. The second is that the interpretation of even the best-preserved fossils is a theory, revisable, and one that carries the assumptions of its decade. This chapter is about how fossils form, how badly they sample the past, and what they can nevertheless be made to tell us — including, with careful statistics, the timing of extinctions that happened too fast to be recorded.

## What has to happen for an organism to be preserved

::: definition Taphonomy and modes of preservation {#def-taphonomy}
**Taphonomy** is the study of everything that happens to an organism between death and discovery: transport, decay, scavenging, burial, compaction, chemical alteration and the eventual discovery itself. The modes of preservation are:
- **Permineralisation** — pore spaces filled by precipitated silica, calcite or pyrite; the anatomy is retained in three dimensions (petrified wood, the Rhynie chert).
- **Replacement** — the original material dissolved and substituted, often with exquisite fidelity (chert replacement of shells, pyrite of graptolites).
- **Carbonification (distillation)** — volatile elements driven off, leaving a carbon film; the usual fate of leaves, jellyfish and soft-bodied organisms.
- **Mould and cast** — the shell dissolved leaving a cavity, then filled.
- **Unaltered original material** — in amber, tar, ice, salt, and desiccated cave deposits.
- **Trace fossils (ichnofossils)** — burrows, tracks, borings, feces, eggshell, regurgitated pellets: evidence of behaviour, and made by the organism rather than of it.
A **Lagerstätte** is a locality with exceptional preservation, usually combining soft tissues with hard parts, and always implying an environment where normal decay was interrupted.
:::

::: proposition Soft parts are preserved by early mineralisation, not by luck {#prop-soft-parts}
Soft tissue decays in days to weeks. For it to be preserved, minerals must precipitate within and around it before bacterial decay destroys it, and this requires conditions that suppress the bacteria and supply the ions: rapid burial by fine sediment, anoxia, sulphate depletion, and a source of silica, calcium phosphate or iron sulphide. The consequence is that the distribution of Lagerstätten in the rock record is not random in time — they cluster in the early Cambrian, the Silurian, the Permian and the Jurassic, and in black-shale facies — and that the history of soft-bodied life is recorded mainly in the intervals and facies where those conditions happened to coincide.
:::

::: svg
caption: The main modes of preservation, all drawn at the same scale from a bivalve. Permineralisation fills the pores and keeps the shell's microstructure; replacement substitutes a new mineral molecule by molecule; a mould and cast lose the shell entirely and keep the shape; carbonisation leaves a film thin enough to show the venation of a leaf; and a trace fossil records the animal's behaviour rather than its body. The relative abundance of the modes in the rock record is a measure of the chemistry of the sediment, not of the abundance of the animals.
<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Modes of fossil preservation">
  <style>
    .rock { fill: var(--warm-wash); stroke: var(--rule-2); stroke-width: 1; }
    .shell { fill: var(--sheet); stroke: var(--ink-2); stroke-width: 1.6; }
    .fill { fill: var(--series-2); opacity: 0.55; stroke: var(--ink-2); stroke-width: 1; }
    .film { fill: none; stroke: var(--ink); stroke-width: 1.6; }
    .lab { fill: var(--ink); font-size: 12px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 10.5px; }
  </style>
  <g>
    <rect class="rock" x="10" y="30" width="140" height="140"/>
    <path class="shell" d="M40,120 q30,-55 60,0 z"/>
    <path class="fill" d="M46,116 q24,-44 48,0 z"/>
    <text class="lab" x="14" y="24">permineralised</text>
    <text class="sub" x="14" y="186">pores filled with silica</text>
  </g>
  <g transform="translate(152,0)">
    <rect class="rock" x="10" y="30" width="140" height="140"/>
    <path class="fill" d="M40,120 q30,-55 60,0 z"/>
    <text class="lab" x="14" y="24">replaced</text>
    <text class="sub" x="14" y="186">original aragonite lost</text>
  </g>
  <g transform="translate(304,0)">
    <rect class="rock" x="10" y="30" width="140" height="140"/>
    <path class="rock" d="M40,120 q30,-55 60,0 z" style="fill: var(--bg); stroke: var(--ink-2); stroke-dasharray: 4 3"/>
    <path class="fill" d="M44,118 q26,-46 52,0 z" style="opacity: 0.35"/>
    <text class="lab" x="14" y="24">mould and cast</text>
    <text class="sub" x="14" y="186">shape only</text>
  </g>
  <g transform="translate(456,0)">
    <rect class="rock" x="10" y="30" width="140" height="140"/>
    <path class="film" d="M40,120 q30,-55 60,0 z"/>
    <path class="film" d="M52,112 q18,-30 36,0 M60,116 q8,-20 16,0"/>
    <text class="lab" x="14" y="24">carbon film</text>
    <text class="sub" x="14" y="186">leaf venation survives</text>
  </g>
  <g transform="translate(608,0)">
    <rect class="rock" x="10" y="30" width="140" height="140"/>
    <path class="film" d="M30,140 q14,-26 26,-8 q12,18 26,-6 q12,-22 26,-4" stroke-width="3"/>
    <circle cx="46" cy="70" r="4" style="fill: var(--ink)"/>
    <circle cx="72" cy="62" r="4" style="fill: var(--ink)"/>
    <text class="lab" x="14" y="24">trace fossil</text>
    <text class="sub" x="14" y="186">burrows and footprints</text>
  </g>
</svg>
:::

::: example How incomplete is the record? {#ex-incomplete}
Sepkoski and other analysts of the marine fossil record estimate that something like $5\times10^{9}$ species have existed during the Phanerozoic, and about $250{,}000$ fossil species have been described. Raup estimated that perhaps half of all genera with a reasonable chance of preservation have been found. Find the fraction of species preserved, and the fraction of *individuals* fossilised if a long-lived marine invertebrate species produces $10^{8}$ individuals per generation over $10^{6}$ generations and is known from $10^{4}$ specimens in museums worldwide.
::: solution
Species: $2.5\times10^{5}/5\times10^{9} = 5\times10^{-5}$, one species in twenty thousand described. Individuals: the species produced $10^{14}$ individuals and $10^{4}$ are in collections, so $10^{-10}$ — one in ten billion — and the true fossil record in the field is perhaps a thousand times larger than the museum part of it, giving one in a hundred million.

These numbers are not a counsel of despair; they are the reason the subject uses ratios and distributions rather than presences and absences. A single individual is worth little as evidence that a group existed, and nothing at all as evidence that it did not. The information is in the *shape* of the sample: the distribution of ranges, the ratio of genera to species, the number of specimens per genus, and how those change with time — and all of them must be corrected for how much rock of that age survives and how hard it has been collected.
:::
:::

::: theorem The Signor–Lipps effect: extinctions always look gradual {#thm-signor-lipps}
If fossil occurrences of a species are spread uniformly and randomly through its true range, and $n$ occurrences are known, then the expected gap between the youngest known fossil and the true last occurrence is
$$
\langle g\rangle = \frac{R}{n+1},
$$
where $R$ is the duration of the range. No finite sample can show an instantaneous extinction, and the apparent gradualness of a mass extinction is partly an artefact of sampling.
:::

::: proof
Order the $n$ occurrences along the range and consider the $n+1$ gaps into which they divide it, including the gap from the youngest occurrence to the true end. By symmetry, and because the occurrences are drawn uniformly, the expected size of each gap is the same, $R/(n+1)$. The youngest occurrence is therefore expected to fall short of the true extinction by that amount. ∎

The corollary is what made the theorem important. Signor and Lipps used it in 1984 to argue that the gradual-looking decline of the Cretaceous marine fauna in the classic sections could be entirely consistent with an instantaneous end, and that the search for the *last* occurrence of a species can never prove that it died out gradually. The modern version of the argument is a confidence interval on the last occurrence range, and it is why the debate about the end-Cretaceous was settled not by finding more fossils but by finding the iridium layer: an independent, globally synchronous marker that pins the timing without relying on ranges at all.
:::

::: example How much does sampling effort change a diversity curve? {#ex-rarefaction}
A community has five species with relative abundances $0.50$, $0.20$, $0.15$, $0.10$ and $0.05$. The expected number of species in a sample of $N$ individuals is $S(N) = \sum_i [1-(1-p_i)^N]$. Compute $S$ for $N = 5$ and $N = 20$.
::: solution
For $N=5$:
$$
S = 0.969 + 0.672 + 0.556 + 0.410 + 0.226 = 2.83 .
$$
For $N=20$:
$$
S = 1.000 + 0.988 + 0.961 + 0.878 + 0.642 = 4.47 .
$$
Two communities with identical true diversity, one sampled with five specimens and the other with twenty, will differ in observed richness by $1.6$ species out of five — a third of the total. This is why every comparative diversity study in the palaeontological literature since the 1970s is **rarefaction**-corrected: the samples are either subsampled to a common number of individuals, or fitted with a curve and extrapolated, or modelled with an explicit sampling term. The same correction, applied to the whole Phanerozoic, changed the answer to one of the subject's central questions: much of the apparent exponential rise in marine diversity is a rise in the amount of rock preserved and collected, and once the rock area is accounted for, the increase is real but far slower than the raw curve suggests.
:::
:::

::: widget plot
f: exp(-x/s)
x: 0, 500
y: 0, 1.1
sliders: s=100:20:500
labels: observed / true diversity
caption: The "pull of the recent". If a constant fraction of fossils is destroyed per unit time by metamorphism, erosion and non-deposition, then the expected number of occurrences from age $x$ declines as $e^{-x/\tau}$, and a diversity curve drawn from fossil counts rises exponentially towards the present even if the true diversity was flat. The slider is the preservation time constant $\tau$ in Myr; at $\tau = 100\ \mathrm{Myr}$ a Jurassic fauna is represented by $1.5\%$ of the number of occurrences available for the Palaeogene. The observed Phanerozoic curve lies between the flat and the strongly pulled cases, and separating the two — how much real diversification, how much rock — is the problem that generated the entire field of quantitative palaeobiodiversity.
:::

::: example How many species are missing from a list? {#ex-chao1}
A quantitative sample from a single quarry horizon yields $312$ specimens assigned to $20$ species. Eight of the species are represented by a single specimen and two by exactly two. Estimate the true species richness of the horizon, using the first-order Chao estimator
$$
S_\text{Chao1} = S_\text{obs} + \frac{f_1^2}{2 f_2},
$$
where $f_1$ and $f_2$ are the numbers of single- and double-individual species.
::: solution
$$
S_\text{Chao1} = 20 + \frac{8^2}{2\times2} = 20 + 16 = 36 .
$$
The horizon holds about $36$ species, of which $16$ have not been found — and the estimator is doing something quite reasonable: a fauna with many rare species (many singletons relative to doubletons) is one where the sample has barely touched the rare tail, and the ratio $f_1^2/f_2$ is large when singletons are mostly not the survivors of a well-sampled population. The estimator assumes the rare species are equally abundant; if they are not, it is a lower bound, which is the usual way it is quoted.

The practical lesson for the field is that the number of species in a list is a function of the number of specimens collected, and that two quarries with the same fauna and different collection intensity will report different diversities. Any comparative study that has not dealt with this is measuring the geologists.
:::
:::

::: example A confidence interval on an extinction {#ex-lo-ci}
The last occurrence of an ammonite genus is recorded at one level in a continuous section, and the genus is known from $n = 6$ fossil horizons within a measured range of $4.0\ \mathrm{Myr}$. Using the Signor–Lipps framework, find the expected gap to the true extinction and a $95\%$ upper bound, and say what the result means for a claim that the genus died out in a $100\ \mathrm{kyr}$ event.
::: solution
The expected gap is $R/(n+1) = 4.0/7 = 0.57\ \mathrm{Myr}$. Under the uniform model the gap $g/R$ has an exponential-like tail, and a commonly used $95\%$ bound is three times the mean, $1.7\ \mathrm{Myr}$.

So the true extinction lies somewhere between the youngest fossil and $1.7\ \mathrm{Myr}$ later, and a claim that the genus survived a $100\ \mathrm{kyr}$ catastrophe, or failed to, cannot be tested with six horizons: the resolution of the data is an order of magnitude coarser than the event. This is the arithmetic behind the otherwise puzzling statement that the end-Cretaceous extinctions are "instantaneous within the resolution of the section" — the resolution is tens of thousands of years in the best sections and hundreds in most, and the claim is about the resolution, not about the event.
:::
:::

## Traces, molecules, and the limits of the body fossil

::: definition Trace fossils and the Cambrian substrate revolution {#def-traces}
An **ichnofossil** is named as an ichnotaxon, a separate nomenclatural system from the body fossil, because a burrow has no owner: *Skolithos* is a vertical tube, *Cruziana* is an arthropod's feeding trail, *Palaeophycus* is a lined horizontal burrow, *Glossifungites* is a firmground boring. The **Cambrian substrate revolution** is one of the best-documented events in the history of life: before about $540\ \mathrm{Ma}$ the sea floor was a matground, a sticky microbial mat that animals grazed on but rarely burrowed into, and the sediments are finely laminated and unfossiliferous in trace terms. With the Cambrian came burrowing, and with burrowing came **bioturbation** — the sediment turned to a homogeneous, oxygenated, water-bearing substrate — which destroyed the matground ecosystem, changed the chemistry of the sediment–water interface, and made infauna possible for the first time. The event is dated by trace fossils, not by bodies, and it is a case of behaviour changing the environment rather than the other way round.
:::

Three further lines of evidence extend the record past the point where body fossils fail. **Chemical fossils (biomarkers)** are molecular fossils — steranes and hopanes from eukaryote and cyanobacterial membranes, and 2-methylhopanoids once claimed for cyanobacteria — preserved in ancient shales, and they push the eukaryote record back to $1.6\ \mathrm{Ga}$ and beyond, though every claim older than about $1.8\ \mathrm{Ga}$ has been contested on grounds of later contamination. **Isotopic fossils** are the carbon isotope signature of fixation: organic carbon with $\delta^{13}\mathrm{C}$ near $-25\%$ in rocks of $3.8\ \mathrm{Ga}$ (Isua) and $3.7\ \mathrm{Ga}$ (Nuvvuagittuq) is suggestive of biological carbon fixation, but is not proof, because several abiotic processes fractionate carbon the same way. **Molecular clocks** date the divergence of lineages from the accumulation of genetic differences, calibrated by the fossil record; they routinely put the origin of a phylum tens or hundreds of millions of years before its first fossil, and the disagreement between the two clocks is one of the productive arguments of the subject — for the animals, molecular dates of $700$–$800\ \mathrm{Ma}$ against a fossil record beginning at $550\ \mathrm{Ma}$.

::: warning "Absence of evidence is not evidence of absence" — but it is evidence
The slogan is half right. With $n$ specimens of a species known from a formation, and a preservation and sampling process you have characterised, the probability that the species was present and undetected can be estimated, and then absence becomes quantitative evidence of a certain size. What absence cannot do is prove an instantaneous event, because of Signor–Lipps, or exclude a lineage that lived in a facies that is not preserved. The discipline's real error is not over-interpreting absence but the reverse: assuming that a gap in the record is a gap in nature. Every "first appearance" in the literature is a minimum age for an origin, and every "last appearance" is a maximum age for an extinction.
:::

::: quiz
A Cambrian formation yields no body fossils but abundant *Skolithos* and *Cruziana*. What can be concluded?
- [ ] The formation is barren and should be mapped as unfossiliferous
- [x] Animals were present, likely burrowing and moulting, and the environment was unfavorable to shell preservation but favorable to tracing
- [ ] The traces must have been made by worms, so the beds are Ordovician
- [ ] The traces prove the beds are Cambrian
::: solution
Trace fossils are evidence of behaviour and of a substrate, not of an owner or an age: *Skolithos* is made by many different animals in many ages. What the association does say is that the sediment was soft and marine, that infaunal animals lived in it, and that the body fossils were either not preserved (carbonate dissolved, no hard parts) or not collected. Ichnology also gives the only direct evidence of the Cambrian substrate revolution, which is why the base of the Cambrian was at one point defined by a trace fossil, *Treptichnus pedum*, rather than by a body fossil.
:::
:::

::: history
Fossils were argued over for two thousand years: Xenophanes thought them evidence that the sea had once covered the land, Aristotle treated them as games of nature, and the *lusus naturae* view survived into the seventeenth century until Robert Hooke's microscopic comparison of wood and petrified wood and Martin Lister's and Edward Lhwyd's work made the biological interpretation unavoidable. Georges Cuvier and Alexandre Brongniart established extinction and the use of fossils in stratigraphy in the Paris basin between 1796 and 1812. Mary Anning, from a poor family in Lyme Regis, found the first correctly interpreted ichthyosaur in 1811 and a plesiosaur in 1823, sold finds to fund her work, was excluded from the Geological Society, and supplied the evidence on which William Buckland's and then Cuvier's recognition of extinct reptiles rested. Gideon Mantell, Roderick Murchison and Adam Sedgwick built the Palaeozoic on fossils in the same decades. Charles Walcott's Burgess Shale monographs (1911–1931) are the monument of descriptive palaeontology and, in their interpretations, its cautionary tale. Adolf Seilacher's work on trace fossils from the 1950s created ichnology as a process-based discipline, and Martin Glaessner's 1984 book on the Ediacaran fauna established the Precambrian as a chapter of the history of life rather than a blank. Stephen Jay Gould's *Wonderful Life* (1989) brought the Burgess debate to a wide audience and, in its emphasis on contingency, started an argument about whether evolution is repeatable that has not ended.
:::

## Where this leads

The methods of dating fossils and rocks are in [[earth-history/geological-time]]; the Cambrian and the Ediacaran in [[earth-history/palaeozoic]]; the mass extinctions and their metrics in [[earth-history/mass-extinctions]]; the use of fossils and of fossil chemistry as climate proxies in [[palaeoclimate/proxies]]; and the isotope systematics behind biomarkers and carbon isotope chemostratigraphy in [[geochemistry/stable-isotopes]].

::: summary Key takeaways
- A fossil is an organism filtered by decay, burial, chemistry, rock age, outcrop and collection. Each filter is a bias that can be measured and partly corrected.
- Soft tissues survive by early mineralisation under anoxia, not by luck; Lagerstätten are clustered in time and facies, and the history of soft-bodied life is known mainly from those windows.
- Trace fossils are a separate record with a separate nomenclature, and they record behaviour: the Cambrian substrate revolution is dated by burrows, not by shells.
- The record preserves about one species in twenty thousand and one individual in a hundred million, so presence and absence are weak evidence and distributions are strong.
- The Signor–Lipps effect guarantees that extinctions look gradual; only an independent time-marker can distinguish a sudden from a slow end.
- Observed diversity must be corrected for sampling — rarefaction within a fauna, rock area and collection effort across the Phanerozoic — or the curve measures geology, not life.
- Biomarkers, carbon isotopes and molecular clocks extend the record past body fossils, and every claim they make is only as good as the contamination control behind it.
:::

## Exercises

::: exercise Modes of preservation {level=1}
A leaf shows venation as a thin black film on grey shale. What mode of preservation is this, and what does it imply about the burial environment?
::: solution
Carbonisation (distillation): the volatile elements were driven off and a carbon film remained, which requires rapid burial in fine sediment with limited oxygen and low thermal alteration. The same beds that preserve leaves this way often preserve insects and fish otoliths, and are usually lake or lagoon deposits.
:::
:::

::: exercise Signor–Lipps {level=1 check="0.12"}
A species' true range is $5\ \mathrm{Myr}$ and $40$ fossil occurrences are known, spread evenly. Find the expected gap between the youngest fossil and the true extinction.
::: solution
$\langle g\rangle = R/(n+1) = 5/41 = 0.12\ \mathrm{Myr}$. With only $4$ occurrences the expected gap is $1\ \mathrm{Myr}$, which is longer than most stage boundaries — the reason a "gradual decline over $2\ \mathrm{Myr}$" in a poorly sampled group is close to uninterpretable.
:::
:::

::: exercise Ichnology {level=1}
Why can an ichnotaxon not be assigned to a biological genus, and what is the advantage of that?
::: solution
A burrow is produced by the animal's behaviour, and very different animals make the same burrow in the same substrate — *Skolithos* is made by annelids, phoronids, crustaceans and others. The nomenclature is therefore separate. The advantage is that the same ichnotaxon can be recognised in any age and any continent, so ichnology correlates environments and sea level (the *Skolithos*, *Cruziana* and *Nereites* ichnofacies are depth zones) over intervals where the body fossils are absent or provincial.
:::
:::

::: exercise Rarefaction {level=2 check="3.75"}
Using the community of [[#ex-rarefaction]], find the expected number of species in a sample of $N = 10$ individuals.
::: solution
$$
S = (1-0.5^{10}) + (1-0.8^{10}) + (1-0.85^{10}) + (1-0.9^{10}) + (1-0.95^{10})
$$
$$
= 0.999 + 0.893 + 0.803 + 0.651 + 0.401 = 3.75 .
$$
Doubling the sample from five to ten individuals adds $0.9$ species, and the next doubling only $0.7$; the curve is still rising at $N = 20$, which is the definition of an undersampled assemblage and the reason a "species count" from a quarry is not comparable with one from a museum monograph.
:::
:::

::: exercise Rock area and diversity {level=2 check="1.5"}
Marine genus diversity is plotted against the area of marine sedimentary rock surviving from each stage, and the two correlate with $r^2 = 0.72$ over the Phanerozoic. If the raw diversity curve rises by a factor of $6$ from the Cambrian to the present and the rock area rises by a factor of $4$, estimate the residual real increase, and state two reasons the correlation is not proof of sampling bias.
::: solution
If diversity were purely a sampling artefact the increase would be $4$; the residual is $6/4 = 1.5$, so about half of the increase in some sense remains. Two reasons the correlation is not proof: rock area is itself a **consequence** of sea level, and high sea level both floods continents (more shallow-marine rock, more area) and creates the ecological space (shelf area, provinciality) that increases diversity — so rock area is a proxy for the real driver as well as for preservation. And the correlation is with the *surviving* rock, which is a function of both original deposition and later destruction, only the second of which is a bias.
:::
:::

::: exercise Molecular clocks {level=2 check="180"}
A molecular clock dates the divergence of two animal phyla at $720\ \mathrm{Ma}$, with a $95\%$ range of $650$–$800\ \mathrm{Ma}$; their oldest fossils are $540\ \mathrm{Ma}$ and $525\ \mathrm{Ma}$. Find the size of the "ghost range" implied, and give two reasons it might be real and two reasons the clock might be too old.
::: solution
The ghost range is $720 - 540 = 180\ \mathrm{Myr}$, and $110$–$260\ \mathrm{Myr}$ across the clock's own uncertainty. Real possibilities: the lineages were small, deep-water or soft-bodied and left no fossils; or their skeletons evolved late, so the crown group is old and the mineralised record is not. Clock problems: a calibration fossil that is older than the divergence it calibrates pushes the whole tree too far back; an assumed constant rate where the true rate slowed (as in slowly evolving marine invertebrates) over-estimates deep divergences; and a saturated or poorly modelled sequence alignment does the same. The honest statement is that the two clocks constrain each other, and that the origin of the phyla lies somewhere between $540$ and $800\ \mathrm{Ma}$.
:::
:::

::: exercise Deriving the Signor–Lipps gap {level=3}
Derive $\langle g\rangle = R/(n+1)$ formally, and then extend it: if occurrences are not uniform in time but are collected more heavily from the youngest beds of a range (a common bias, because those beds are the best exposed), does the observed extinction look earlier or later than the Signor–Lipps prediction, and by how much in the linear-bias case?
::: solution
Let the $n$ occurrences be order statistics $U_{(1)} < \dots < U_{(n)}$ from a uniform distribution on $[0, R]$. The expected maximum is $\langle U_{(n)}\rangle = nR/(n+1)$, so the gap is $R - nR/(n+1) = R/(n+1)$.

Now let the sampling density be proportional to $u$ (linear bias towards the top of the range), so the density is $f(u) = 2u/R^2$ and the cumulative $F(u) = u^2/R^2$. The expected maximum of $n$ draws satisfies $F(\langle U_{(n)}\rangle) \approx n/(n+1)$, so $\langle U_{(n)}\rangle = R\sqrt{n/(n+1)}$. For $n = 40$ this is $0.988R$, a gap of $0.012R$ against the uniform prediction of $0.024R$: the bias makes the extinction look **later** — more abrupt — by a factor of two in the gap. The opposite bias, sampling the top of the range less than the base, makes an instantaneous extinction look gradual. Both biases are real in the field, and both are estimable if the collection localities are recorded against stratigraphic level, which is why modern databases record the section as well as the fossil.
:::
:::

::: exercise A Lagerstätte in context {level=3}
A Konservat-Lagerstätte preserves soft-bodied organisms in black shale. The formation is $200\ \mathrm{m}$ thick, the basin's subsidence rate was $20\ \mathrm{m\,Myr^{-1}}$, and the fauna is known from 3000 specimens in 40 quarry horizons spread evenly through the unit. Estimate the time spanned by the whole fauna, the span of a single quarry horizon if each represents $10\ \mathrm{cm}$ of section, and explain why the "fauna" may not be a community.
::: solution
The formation spans $200/20 = 10\ \mathrm{Myr}$. A $10\ \mathrm{cm}$ horizon at $20\ \mathrm{m\,Myr^{-1}}$ represents $10^{-4}/20\times10^{6} = 5\ \mathrm{kyr}$ — and if the bedding is really a couple of millimetres a year, a $10\ \mathrm{cm}$ couplet-set may be a few centuries.

The "fauna" is therefore a sample of a community averaged over ten million years, drawn from forty time slices each of centuries, and mixed from whatever the currents brought in. It cannot be used to argue that the species lived together, competed, or coexisted at one moment, and it cannot be used to measure a diversity at a time. The same caution applies in reverse to the "community" in a shell bed that represents a single storm. The correct unit is the **assemblage** (same place, same time) versus the **biocoenosis** (the living community) versus the **thanatocoenosis** (the dead as found), and most of the interesting arguments in palaeoecology are about which of the three is being described.
:::
:::

::: exercise Recognising the earliest life {level=3}
Microscopic filaments in $3.46\ \mathrm{Ga}$ chert are interpreted as fossil bacteria, and carbon in $3.8\ \mathrm{Ga}$ graphite has $\delta^{13}\mathrm{C} = -19\%$. Set out the criteria by which each claim is judged, and the strongest abiotic alternative to each.
::: solution
For the filaments: that the structures are endogenous (not introduced by later fluids), that they are chemically distinct from the matrix (indigenous carbon, Raman-documented), that their morphology is not produced by known abiotic mineral growth, that they are deformed consistently with the host rock rather than cutting the deformation, and that they are found in several independent slices and localities. The strongest abiotic alternative is that filamentous mineral crystals — clays, iron oxides, fibrous silica — were later carbonised, and that the "cells" are the boundaries of crystal bundles.

For the carbon isotope: that the graphite is primary (in the same generation as the earliest minerals, not a later vein), that the host metasediment was a surface or near-surface rock, that $\delta^{13}\mathrm{C}$ is significantly lighter than mantle carbon ($-5\pm3\%$), and that the spread of values is biological rather than a single alteration product. The abiotic alternatives are Fischer–Tropsch-type synthesis of hydrocarbons at high temperature, which fractionates carbon by up to $25\%$, and kinetic isotope effects in serpentinisation-related reactions. The consensus position is that the combination of criteria — isotopically light, structurally cellular, geologically surface-derived, and repeated — is convincing by about $3.5\ \mathrm{Ga}$, suggestive but not conclusive at $3.8\ \mathrm{Ga}$, and unproven older.
:::
:::
