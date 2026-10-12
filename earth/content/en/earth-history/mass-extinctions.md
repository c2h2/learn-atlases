At Meishan in southern China a road cutting shows $25\ \mathrm{cm}$ of rock that contains the largest extinction in the history of life. Below the boundary bed are the last trilobites — small, limpet-shaped, the final survivors of a group that had lasted $270$ million years — with the last rugose corals, the last fusulinid foraminifera and most of the brachiopod families. In the boundary bed itself is a clay layer with a mercury anomaly, and above it a sterile limestone with microbial laminae and a handful of disaster taxa: the brachiopod *Lingula*, the conodont *Clarkina*, a few disaster bivalves. The rocks above take ten million years to look diverse again.

The end-Permian extinction removed perhaps $83\%$ of marine genera, $96\%$ of marine species and, on land, most of the large animals. It is one of five that stand out of the record, and the only one that came close to ending the experiment. This chapter is about how extinction is measured, what the five had in common, what killed each of them, and what the answer implies about the present.

## Measuring extinction

::: definition Rates, background, and what counts as a mass extinction {#def-extinction-rate}
The extinction rate is usually expressed per taxon per unit time. If a group of $N_1$ taxa at time $t_1$ is reduced to $N_2$ at $t_2$ with no origination,
$$
E = \frac{\ln(N_1/N_2)}{t_2 - t_1}
$$
extinctions per taxon per unit time. The **background rate** is the rate that prevails between mass extinctions; Raup's empirical rule is that the probability of a marine genus going extinct in any million years is about $0.1$, which is the same as a mean genus longevity of $10\ \mathrm{Myr}$. A **mass extinction** is conventionally an interval in which more than about $60\%$ of genera are lost in a time short enough that origination cannot compensate — geologically, less than a couple of million years.
:::

::: theorem The law of extinction: survivorship is exponential {#thm-red-queen}
If the probability that a taxon goes extinct is constant per unit time and independent of how long the taxon has already existed — Van Valen's Red Queen hypothesis — then the number of taxa surviving from a cohort is
$$
N(t) = N_0 e^{-t/T},
$$
where $T$ is the mean longevity, and a plot of $\ln N$ against time is a straight line. Equivalently, taxa do not "age": a family that has existed for $100\ \mathrm{Myr}$ is no more likely to survive the next million years than one that appeared yesterday.
:::

::: proof
Let $q$ be the per-taxon probability of extinction per unit time. Over a small interval $\mathrm{d}t$, $\mathrm{d}N = -qN\,\mathrm{d}t$, which integrates to the exponential. The mean longevity is
$$
\langle t\rangle = \frac{1}{N_0}\int_0^\infty t\,qN_0e^{-qt}\,\mathrm{d}t = \frac{1}{q} = T .
$$
Van Valen tested the hypothesis on the fossil families of marine genera and found the survivorship curves linear on a log-linear plot, as the exponential requires, rather than concave (which would mean taxa become more fragile with age) or convex (that they become tougher). ∎

The result is depressing and important. It means that the normal state of a taxon is a constant risk of death, that the background is not a baseline of stability but a steady turnover driven by whatever the biota is doing to itself, and that a mass extinction is a **multiplication of the hazard**, not the breaking of a rule. It also means that the "age" of a group tells you nothing about its fate: the trilobites were not old and tired in the Permian, they were unlucky.
:::

::: example How high is high? {#ex-background}
The canonical background rate is one extinction per million species per million years. There are perhaps $8.7\times10^{6}$ eukaryotic species. Since 1500 the IUCN has recorded about $400$ extinctions, and about $16{,}000$ species are currently classed as threatened. Find the expected number of extinctions in the last century at background, the observed multiple, and the multiple implied if half of the threatened species were to become extinct within a century.
::: solution
At background the expected number is
$$
8.7\times10^{6}\ \text{species}\times10^{-6}\ \mathrm{yr^{-1}}\times100\ \mathrm{yr} = 870\ \text{extinctions per century}.
$$
The $400$ extinctions recorded by the IUCN since 1500 are fewer than that, but the recorded count is a floor: it lists only species whose extinction has been demonstrated, and the background rate is calibrated on marine genera and applied here to all eukaryotes.

The comparison the literature makes is a hazard multiple. If half the $16{,}000$ threatened species were lost in a century, that is $8\times10^{3}$ extinctions against a background expectation of $870$, a factor of $9$; if the threatened categories are a small sample of the species actually at risk, as most analyses assume, the multiple is $100$–$1000$. The honest statement is that the current rate is at least an order of magnitude above background and plausibly two, that the recorded count is a floor and not an estimate, and that the comparison with the Big Five is not that we have killed more species than the end-Permian did — we have not — but that we are imposing the same hazard over centuries rather than tens of thousands of years.
:::
:::

## The five

| Event | Age | Marine genera lost | Land vertebrates | Proposed cause |
|---|---|---|---|---|
| End-Ordovician (Hirnantian) | 445 Ma | 57–60% | — | Gondwanan glaciation, sea-level fall, then anoxia on transgression |
| Late Devonian (Kellwasser, Hangenberg) | 372–359 Ma | ~50% | ~large | Nutrient loading, anoxia, repeated; the greening of the land |
| End-Permian | 252 Ma | ~83% | ~70% | Siberian Traps: CO2, SO2, halocarbons, warming, acidification, anoxia |
| End-Triassic | 201.6 Ma | ~50% | ~80% | Central Atlantic magmatic province: CO2, acidification, warming |
| End-Cretaceous | 66.043 Ma | ~60% | ~70% | Chicxulub impact: darkness, cooling, acid rain, collapse of production |

::: example The carbon dioxide of the end-Permian {#ex-perm-carbon}
Across the Permian–Triassic boundary the $\delta^{13}\mathrm{C}$ of marine carbonate falls by about $3\%$ within less than $100\ \mathrm{kyr}$ in the sections of the United Arab Emirates, and by up to $8\%$ over the whole excursion. Take the ocean's dissolved inorganic carbon as $3.8\times10^{18}\ \mathrm{mol}$ at $\delta^{13}\mathrm{C} = 0\%$, and the added carbon as a mixture of thermogenic methane and $\mathrm{CO_2}$ from the intrusion of the Siberian Traps into evaporite and coal-bearing sedimentary rocks, with $\delta^{13}\mathrm{C} = -20\%$. Find the mass of carbon that must have been added to produce the $3\%$ shift.
::: solution
Mixing gives, for a small addition,
$$
\Delta\delta = \frac{C_a(\delta_a - \delta_o)}{C_o} \Longrightarrow C_a = \frac{C_o\,\Delta\delta}{\delta_o - \delta_a} = \frac{3.8\times10^{18}\times3}{20} = 5.7\times10^{17}\ \mathrm{mol},
$$
$$
M = 5.7\times10^{17}\times12\times10^{-15}\ \mathrm{Gt} = 6800\ \mathrm{Gt\ C}.
$$
Independent estimates of the carbon released by contact metamorphism of the $1.5\times10^{6}\ \mathrm{km^2}$ over which the Siberian Traps lavas intrude sedimentary rocks — coal, oil shale, carbonate, evaporite — give $9{,}000$–$12{,}000\ \mathrm{Gt\ C}$, together with some $10^4\ \mathrm{Gt}$ of $\mathrm{SO_2}$ and an unknown but large quantity of hydrochloric acid and organochlorines. The isotope budget and the geological budget agree to within a factor of two, which is as close as the Palaeozoic gets.

The consequences follow arithmetically. Nine thousand gigatonnes of carbon as $\mathrm{CO_2}$ is a factor of $15$ the entire fossil-fuel reserve, and the modelled warming from it, with the feedbacks, is $8$–$10\ ^\circ\mathrm{C}$ — which is what the oxygen isotopes of conodont apatite record, with tropical sea surfaces reaching $35$–$40\ ^\circ\mathrm{C}$.
:::
:::

::: svg
caption: The kill web of the end-Permian extinction. A single cause — the eruption of $1$–$2\times10^{6}\ \mathrm{km^3}$ of flood basalt over less than two million years, and the metamorphism of the sedimentary rocks it intruded — branches into at least six killing mechanisms, each with its own geochemical signature and each with its own selectivity. The reason the end-Permian was the worst is not that the volcanism was the largest but that the mechanisms arrived together and persisted: a hot, anoxic, acidified, partly sulphidic ocean with a damaged ozone layer leaves nowhere to hide.
<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The end-Permian kill web">
  <style>
    .box { fill: var(--sheet); stroke: var(--ink-2); stroke-width: 1.3; }
    .box2 { fill: var(--accent-wash); stroke: var(--ink-2); stroke-width: 1.3; }
    .bad { fill: var(--bad); opacity: 0.16; stroke: var(--bad); stroke-width: 1.2; }
    .lab { fill: var(--ink); font-size: 12px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 10.5px; }
    .link { stroke: var(--ink-2); stroke-width: 1.4; fill: none; }
  </style>
  <rect class="box" x="20" y="170" width="150" height="60"/>
  <text class="lab" x="30" y="192">Siberian Traps</text>
  <text class="sub" x="30" y="208">1–2 × 10⁶ km³ basalt</text>
  <text class="sub" x="30" y="222">+ contact metamorphism</text>
  <path class="link" d="M170,180 Q230,150 280,120"/>
  <path class="link" d="M170,190 Q230,180 280,175"/>
  <path class="link" d="M170,205 Q230,215 280,230"/>
  <path class="link" d="M170,220 Q230,260 280,290"/>
  <rect class="box2" x="280" y="96" width="170" height="42"/>
  <text class="lab" x="290" y="114">CO2: warming 8–10 °C</text>
  <text class="sub" x="290" y="130">conodont d18O; 35–40 °C SST</text>
  <rect class="box2" x="280" y="156" width="170" height="42"/>
  <text class="lab" x="290" y="174">CO2: ocean acidification</text>
  <text class="sub" x="290" y="190">d7Li, boron, CCD deepening</text>
  <rect class="box2" x="280" y="216" width="170" height="42"/>
  <text class="lab" x="290" y="234">warming: anoxia, H2S</text>
  <text class="sub" x="290" y="250">Mo, U, Re; biomarkers?</text>
  <rect class="box2" x="280" y="276" width="170" height="42"/>
  <text class="lab" x="290" y="294">SO2, HCl, organochlorines</text>
  <text class="sub" x="290" y="310">acid rain; ozone depletion</text>
  <path class="link" d="M450,117 Q500,120 540,140"/>
  <path class="link" d="M450,177 Q500,170 540,165"/>
  <path class="link" d="M450,237 Q500,210 540,190"/>
  <path class="link" d="M450,297 Q500,250 540,215"/>
  <rect class="bad" x="540" y="130" width="200" height="100"/>
  <text class="lab" x="552" y="152">96% of marine species</text>
  <text class="sub" x="552" y="170">83% of genera, 57% of families</text>
  <text class="sub" x="552" y="186">selectivity: high surface area</text>
  <text class="sub" x="552" y="202">to volume, calcifiers, high</text>
  <text class="sub" x="552" y="218">metabolic rate, low buffering</text>
  <text class="sub" x="20" y="360">each arrow is a hypothesis with its own proxy, and the strength of the case is that</text>
  <text class="sub" x="20" y="376">the same source explains all of them at once, in the same stratigraphic order</text>
</svg>
:::

::: example An asteroid, weighed from its iridium {#ex-iridium}
The Cretaceous–Palaeogene boundary clay is found at more than a hundred sites and carries a global iridium anomaly. Take the total mass of excess iridium in the layer as $4\times10^{8}\ \mathrm{kg}$, the iridium content of a carbonaceous chondrite as $0.5\ \mu\mathrm{g\,g^{-1}}$, and the density of the impactor as $3000\ \mathrm{kg\,m^{-3}}$. Find the mass and diameter of the impactor, and explain why the iridium argument requires that the layer be globally synchronous.
::: solution
If the impactor was chondritic,
$$
M = \frac{4\times10^{8}}{5\times10^{-7}} = 8\times10^{14}\ \mathrm{kg}, \qquad V = \frac{M}{\rho} = 2.7\times10^{11}\ \mathrm{m^3},
$$
$$
r = \left(\frac{3V}{4\pi}\right)^{1/3} = 4.0\ \mathrm{km}, \qquad D \approx 8\ \mathrm{km}.
$$
That is the size required to make the $180\ \mathrm{km}$ Chicxulub crater, and it is the size of the object that the crater's scaling laws independently demand. The two lines of evidence — the geochemistry of a thin clay and the geometry of a buried structure — meet at the same number, which is why the impact hypothesis was accepted in a decade rather than a century.

The synchronicity matters because iridium is also delivered by ordinary sea-floor sediments and by micrometeorites at a background rate, and by volcanism in small amounts. What makes the anomaly an impact signature is not its size at one locality but that the same $1$–$10\ \mathrm{cm}$ layer, with the same iridium, the same shocked quartz, the same nickel-rich spinel and the same microspherules, occurs at the same stratigraphic level in marine and continental sections on every continent. Nothing that migrates through sediment does that.
:::
:::

::: widget plot
f: exp(-x/t)
x: 0, 200
y: 0, 1.05
sliders: t=50:10:200
labels: fraction of a cohort surviving
caption: Van Valen's law of extinction: the fraction of a cohort of families surviving after $x$ million years, for a mean longevity set by the slider. The curves are exponentials, and the point of the plot is that they are straight on a log-linear axis — the hazard is constant, so an old family is not a fragile one. Set the slider to $50\ \mathrm{Myr}$ and read the survival of a cohort at $100\ \mathrm{Myr}$: $13.5\%$. A mass extinction is a vertical drop on this plot, and the recovery is the arrival of a new cohort; the interesting question after every event is whether the slope of the survivorship curve changes, and after the end-Permian it does — the Mesozoic fauna has shorter family longevities and higher turnover than the Palaeozoic fauna it replaced.
:::

## Selectivity: who dies, and why

::: proposition Extinction selectivity is the best evidence for the kill mechanism {#prop-selectivity}
Different mechanisms kill different physiologies. Anoxia selects for large body size and high metabolic rate, because oxygen demand sets the critical threshold. Acidification selects for calcifiers, and among them for those that build aragonite and high-magnesium calcite, which dissolve more readily, and for those with thin shells and a high surface area to volume. Warming selects for organisms with a high ratio of metabolic demand to oxygen supply, and for those already living near their thermal maximum. Ozone depletion selects for surface-dwelling organisms exposed to ultraviolet. Because the selectivity is measured from thousands of occurrences and the mechanism is inferred from it, the method is more robust than the search for a single anomalous signal in the rock.
:::

::: example Reading the end-Permian selectivity {#ex-selectivity}
Payne and colleagues scored 19 genera-level traits across the Permian–Triassic and found that extinction risk correlated most strongly with two: the presence of aragonite or high-magnesium calcite in the skeleton, and a high surface area to volume ratio. Brachiopods with calcitic shells survived better than those with phosphatic or aragonitic ones; sponges with siliceous spares did well; the calcareous algae and the reef builders did not. Explain the two correlations in terms of a single mechanism, and state the alternative that the pattern does not exclude.
::: solution
Both point to **hypercapnia and acidification**: an animal with a high surface area to volume ratio and a thin, permeable shell is worse at maintaining an internal acid–base balance when the surrounding water is loaded with $\mathrm{CO_2}$, and a skeleton of aragonite or high-magnesium calcite dissolves at a lower saturation state than low-magnesium calcite. The pattern is what a $\mathrm{CO_2}$-driven kill looks like, and it is independent of the isotope and boron evidence for the same mechanism.

What the pattern does not exclude is that the same traits also predict vulnerability to anoxia and to warming, because both scale with the ratio of oxygen demand to supply. The three mechanisms are not separable by selectivity alone, and in the end-Permian they arrived together. This is the general problem of extinction causation: the selectivity identifies the physiology that failed, and several mechanisms fail the same physiology.
:::
:::

## Recovery, and what follows

Recovery is not the return of what was there. After the end-Permian the earliest Triassic seas are dominated by a handful of geographically widespread, generalist "disaster taxa", by microbialite reefs in place of the metazoan reefs, and by the **Lilliput effect** — the dwarfing of the survivors, with brachiopod and ammonite shells at a fraction of their Permian size, which is a response to warm, oxygen-poor water and to a food supply running through a microbial loop. The **selachian interval** — a rise in the relative abundance of sharks and rays — records a collapse of the bony fishes and the ecological release of the predators above them. Diversity takes $5$–$10\ \mathrm{Myr}$ to return, and the ecosystem architecture — the tiering, the predation intensity, the bioturbation, the skeletonised plankton — takes $50\ \mathrm{Myr}$, and comes back different: the Modern Evolutionary Fauna rises out of the extinction, and the Mesozoic Marine Revolution of the Jurassic and Cretaceous is the escalation that follows.

The recurrence of the big extinction causes is a serious pattern rather than a conspiracy theory: of the eleven intervals that meet the mass-extinction threshold, eight coincide in age, within the dating error, with a large igneous province. The correlation is not proof — the ages of flood basalts have error bars of a million years and the extinctions are spread over a few million — but it is the reason that the end-Permian, end-Triassic and the Deccan-associated late-Maastrichtian interval are argued about in terms of carbon emissions, and that the end-Cretaceous, with its impact, is the exception that proves the rule about how fast a kill can be.

::: warning "The fossils below the boundary are rare, therefore the extinction was gradual"
Two errors are made constantly in the literature. The first is Signor–Lipps: a gradual-looking decline is expected from an instantaneous event in an incompletely sampled section, and the range-through of a rare taxon into the boundary clay is weak evidence either way. The second is the reverse: a sharp boundary in one section says nothing about the global tempo, because the boundary may be a hiatus, a burrowed surface, or a facies change. The tempo of an extinction can be measured only by high-precision geochronology on the section itself — the $252.03 \pm 0.04\ \mathrm{Ma}$ dates on the Meishan ash beds, which put the main pulse inside $60$–$200\ \mathrm{kyr}$ — or by an independent global marker. Everything else is a reading of the sampling.
:::

::: quiz
The strongest evidence that the end-Cretaceous extinction was caused by an impact rather than by the Deccan volcanism is
- [ ] the iridium anomaly at the boundary
- [x] the coincidence, at one stratigraphic level worldwide, of iridium, shocked quartz, microspherules and the 180 km Chicxulub crater, with the boundary dated to 66.043 Ma and the crater dated to the same age
- [ ] the sudden disappearance of the ammonites
- [ ] the absence of any Cretaceous fossils above the clay
::: solution
Iridium alone is suggestive; the combination of a globally synchronous marker layer, an impact structure of the right size and the right age, and a high-precision date that puts the crater and the boundary together within the error, is what closed the argument. The Deccan eruptions are also dated to within a few hundred thousand years of the boundary, and the current position is that the impact was the proximate cause and the Deccan volcanism a contributing stress — a conclusion that comes from the tempo, since the impact kill is decades to millennia and the volcanic one tens of thousands of years.
:::
:::

::: history
Georges Cuvier's comparisons of the Paris basin faunas established extinction as a fact between 1796 and 1812, and his account of "revolutions of the globe" made the abruptness of the record a matter of theory. The idea that there were exactly five great extinctions was fixed by the 1982 paper of David Raup and Jack Sepkoski in the Proceedings of the National Academy of Sciences, in which they measured the Phanerozoic generic diversity in ten-million-year bins and reported five minima; the paper provoked a decade of argument about whether the bins, the rock record or the sampling produced the pattern, and led directly to the modern discipline of quantitative palaeobiodiversity. Luis Alvarez, Walter Alvarez, Frank Asaro and colleagues reported the iridium anomaly in 1980, and the argument against them — that the anomaly was a hiatus, or volcanic, or diagenetic — was answered locality by locality until the crater was identified from geophysics in 1990. Douglas Erwin's *The Great Paleozoic Crisis* (1993) and Michael Benton's *When Life Nearly Died* (2003) are the two sides of the end-Permian argument, the first arguing for a catastrophe and the second for a protracted, multi-causal decline. Paul Wignall's documentation of the "dead zones" and the microbialites, Rothman's model of the sulphur cycle, and the precise dates of Sam Bowring's group at MIT and of Seth Burgess's, which turned the end-Permian from a debate about duration into a debate about mechanism, are the measurements on which the present account rests.
:::

## Where this leads

The causes are developed in the chapters on the events themselves — [[earth-history/palaeozoic]], [[earth-history/mesozoic]] and [[earth-history/cenozoic]] — the carbon and sulfur cycle mechanics in [[biogeochemistry/carbon-deep-time]], the ocean chemistry in [[oceanography/ocean-chemistry]], the volcanism of the large igneous provinces in [[physical-geology/volcanoes]] and [[physical-geology/igneous-rocks]], the impact physics in [[planetary-science/impacts]], and the present extinction in [[biogeochemistry/principles]].

::: summary Key takeaways
- Extinction is measured as a per-taxon hazard; the background is about 10% of genera per million years, and a mass extinction is a multiplication of that hazard over a geologically short interval.
- Van Valen's law: the hazard is constant through a taxon's life, so survivorship is exponential and age confers no immunity.
- The Big Five differ in magnitude, in selectivity and in cause; four are associated with large igneous provinces and one with an impact.
- The end-Permian is the worst because several killing mechanisms — warming, acidification, anoxia, sulphidic water, ozone damage — arrived together and persisted.
- Selectivity is the strongest evidence for the mechanism, and it points to carbon dioxide: the taxa with thin shells, aragonite skeletons and high surface area to volume died first.
- The tempo of an extinction can be measured only by geochronology on the section, not by the apparent sharpness of a boundary.
- Recovery is not restoration: the end-Permian handed the sea to the Modern Evolutionary Fauna, and the ecosystems that came back were more tiered, more mobile and more escalated.
- The present hazard multiple is at least ten and plausibly a few hundred times background, imposed over centuries rather than tens of thousands of years.
:::

## Exercises

::: exercise A rate of extinction {level=1 check="0.1"}
A genus has a mean longevity of $10\ \mathrm{Myr}$. Find the background extinction rate in extinctions per genus per Myr.
::: solution
$E = 1/10 = 0.1$ per genus per Myr. Equivalently, $10\%$ of genera go extinct each million years, which is why the Phanerozoic generic diversity curve is a balance between origination at about the same rate and this hazard.
:::
:::

::: exercise Survivorship {level=1 check="0.14"}
With a mean family longevity of $50\ \mathrm{Myr}$, what fraction of a cohort of families survives $100\ \mathrm{Myr}$, and what fraction after $450\ \mathrm{Myr}$? (Enter the $100\ \mathrm{Myr}$ value.)
::: solution
$e^{-100/50} = e^{-2} = 0.135$, about $14\%$; after $450\ \mathrm{Myr}$, $e^{-9} = 1.2\times10^{-4}$. The point is the steepness: an exponential with a $50\ \mathrm{Myr}$ time constant leaves almost nothing after $450\ \mathrm{Myr}$, which is why the Ordovician families that survive are the exceptions that need explaining.
:::
:::

::: exercise The Big Five {level=1 check="96"}
Which mass extinction removed the largest fraction of marine species, and roughly what was that fraction?
::: solution
The end-Permian, at about $96\%$ of marine species and $83\%$ of genera. The end-Cretaceous removed about $76\%$ of species, and the end-Ordovician, Late Devonian and end-Triassic events are each in the range $70$–$85\%$ depending on the group and the counting method.
:::
:::

::: exercise Carbon isotope mass balance {level=2 check="11400"}
Using the method of [[#ex-perm-carbon]], find the mass of carbon (in Gt) needed to produce a $5\%$ excursion with added carbon at $\delta^{13}\mathrm{C} = -20\%$.
::: solution
$C_a = 3.8\times10^{18}\times5/20 = 9.5\times10^{17}\ \mathrm{mol}$, and $9.5\times10^{17}\times12\times10^{-15} = 11{,}400\ \mathrm{Gt\ C}$. The linearity of the relation is the useful part: the mass of carbon scales directly with the size of the excursion, so a factor of two in the isotope shift is a factor of two in the emissions.
:::
:::

::: exercise Impact energy {level=2 check="38"}
An $8\ \mathrm{km}$-diameter body of density $3000\ \mathrm{kg\,m^{-3}}$ strikes at $20\ \mathrm{km\,s^{-1}}$. Find the energy in megatons of TNT ($1\ \mathrm{Mt} = 4.2\times10^{15}\ \mathrm{J}$) and give the answer in units of $10^{6}\ \mathrm{Mt}$.
::: solution
$$
M = \frac{4}{3}\pi(4000)^3\times3000 = 8.0\times10^{14}\ \mathrm{kg}, \qquad E = \tfrac{1}{2}Mv^2 = 1.6\times10^{23}\ \mathrm{J}
$$
$$
E = \frac{1.6\times10^{23}}{4.2\times10^{15}} = 3.8\times10^{7}\ \mathrm{Mt},
$$
that is $38$ million megatons, or $7.6\times10^{5}$ times the largest weapon ever tested. The number is meaningless without a comparison: the entire world's nuclear arsenal is some thousands of times smaller than this single impact, and the crust at the point of impact behaved as a fluid for minutes.
:::
:::

::: exercise Selectivity {level=2}
Name two skeletal mineralgies that made a calcifying organism more vulnerable at the end-Permian, and give the mechanism.
::: solution
Aragonite and high-magnesium calcite. Both are metastable relative to low-magnesium calcite and dissolve at a higher saturation state, so an ocean loaded with carbon dioxide and lowered in carbonate ion concentration undersaturates them first; the same argument explains the near-total loss of aragonitic sponges and calcimicrobes and the survival of calcitic brachiopods and the recalcitrant microbialites.
:::
:::

::: exercise Deriving the Red Queen {level=3}
Show that a constant hazard $q$ implies an exponential survivorship and a mean longevity $1/q$, and then test the hypothesis on data: a cohort of 400 families has 240 survivors after $50\ \mathrm{Myr}$ and 145 after $100\ \mathrm{Myr}$. Is the survivorship exponential, and what is the implied longevity?
::: solution
Constant hazard gives $\mathrm{d}N/\mathrm{d}t = -qN$, hence $N = N_0e^{-qt}$, and $\langle t\rangle = \int_0^\infty t\,qN_0e^{-qt}\mathrm{d}t/N_0 = 1/q$.
For the data, the two intervals give
$$
q_1 = -\ln(240/400)/50 = 0.0102\ \mathrm{Myr^{-1}}, \qquad q_2 = -\ln(145/240)/50 = 0.0107\ \mathrm{Myr^{-1}}.
$$
The two hazards agree within $5\%$, so the survivorship is exponential and the implied mean longevity is $1/0.0105 = 95\ \mathrm{Myr}$. Had the second hazard been larger, the taxa would be ageing; had it been smaller, they would be hardening. Van Valen's result is that for most taxa and most intervals the two are equal, which is the sense in which the game is run to stay still.
:::
:::

::: exercise Tempo from the stratigraphy {level=3}
A boundary section has an ash bed $20\ \mathrm{cm}$ below the extinction horizon dated at $252.03 \pm 0.04\ \mathrm{Ma}$ and one $30\ \mathrm{cm}$ above dated at $252.01 \pm 0.05\ \mathrm{Ma}$. The beds between are deep-water limestone with a bioturbation depth of $5\ \mathrm{cm}$ and no unconformity. Estimate the maximum duration of the extinction interval and state which assumption dominates.
::: solution
The two dates are indistinguishable: their difference is $0.02\ \mathrm{Myr}$ with an uncertainty of $0.06\ \mathrm{Myr}$, so the $50\ \mathrm{cm}$ of section between them was deposited in less than about $100\ \mathrm{kyr}$ at the $2\sigma$ level, and the extinction within it in less than that.

The dominating assumption is that the section is continuous. A $50\ \mathrm{cm}$ interval of bioturbated limestone could contain cryptic hiatuses, and the argument that it does not rests on the burrowing depth: if the burrows pass through the surfaces that would mark a hiatus, the sediment was not exposed long enough for the burrowers to be excluded. The second assumption is that the ash beds are stratigraphically tight — that the zircons are not inherited and that the crystals grew at the eruption, which is why the dates are CA-ID-TIMS on single grains and why the reproducibility between laboratories is reported.
:::
:::

::: exercise The present as an extinction {level=3}
Assume $8.7\times10^{6}$ eukaryotic species, a background hazard of $10^{-6}\ \mathrm{yr^{-1}}$ per species, and a current hazard multiple of $300$. Find the number of extinctions expected in the next century, the fraction of species that would be lost over a millennium at that rate, and explain why the comparison with the end-Permian is still not straightforward.
::: solution
The hazard is $3\times10^{-4}\ \mathrm{yr^{-1}}$ per species, so a century gives
$$
8.7\times10^{6}\times\left(1 - e^{-3\times10^{-4}\times100}\right) = 8.7\times10^{6}\times0.0296 = 2.6\times10^{5}\ \text{extinctions}.
$$
Over a millennium the fraction lost is $1 - e^{-0.3} = 26\%$.

Three reasons the comparison with the end-Permian is not straightforward. The end-Permian figure is for **marine** species, where the fossil record is good; the terrestrial and freshwater record of the event is much less well known, and it is on land that the present crisis is worst. The end-Permian loss is measured in genera and species of a fauna whose total diversity is estimated from fossils, with a completeness of a few per cent. And the timescales differ: the end-Permian pulse was $60$–$200\ \mathrm{kyr}$, so its rate of loss per thousand years is roughly comparable to a $26\%$ millennium, but the *committed* loss from a habitat that has already been destroyed arrives later, over centuries, which is why the honest statement is that the present hazard is of the order of the Big Five's and that the realised loss so far is far below it.
:::
:::
