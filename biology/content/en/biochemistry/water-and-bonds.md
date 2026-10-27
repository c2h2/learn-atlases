Every cell is mostly water. A bacterium such as *Escherichia coli* is about 70 % water by mass, a human body about 60 %, a jellyfish more than 95 %, and even a dry seed retains a few per cent bound to its proteins and sugars. Water is not a passive filling. It is the solvent in which almost every biochemical reaction occurs, a reactant in hydrolysis and photosynthesis, a product of respiration, and — through the hydrogen bonds it forms and the ones it refuses to form — the force that folds proteins, assembles membranes and holds enzymes to their substrates. Its acid–base chemistry, summarised in a single number, pH, decides the charge on every ionisable group in the cell.

This chapter looks at water and weak interactions as a biologist must: inside real compartments, at real temperatures, in organisms that live in deserts, the deep sea and frozen ponds. The physical chemistry — the geometry of the hydrogen bond, Coulomb's law in a dielectric, the thermodynamics of the hydrophobic effect and the derivation of the Henderson–Hasselbalch equation — is treated in detail in [Chemistry Atlas: water and noncovalent interactions](/learn/chemistry/lesson.php?c=biochemistry&l=water-noncovalent). Here we state the results we need and ask what they mean for living things: why compartments keep different pH values and how we measure them, how cells buffer the acid they make, how organisms balance water and solutes against a hostile environment, and why the weakness of weak bonds is exactly what biology needs.

## Water as the medium of life

A water molecule is bent (H–O–H angle about 104.5°) and strongly polar: the oxygen carries a partial negative charge, each hydrogen a partial positive one. Each molecule can donate two hydrogen bonds and accept two, so liquid water is a constantly rearranging network in which each molecule has on average a little under four hydrogen-bonded neighbours, and individual bonds break and reform on a picosecond time scale.

::: definition The hydrogen bond {#def-hbond}
A **hydrogen bond** is an attraction between a hydrogen atom covalently bound to an electronegative **donor** atom (O–H, N–H) and a lone pair on a nearby electronegative **acceptor** atom (O, N), with a donor–acceptor distance of about 0.27–0.31 nm and the three atoms nearly collinear. Its strength is roughly 10–30 kJ mol⁻¹ in the gas phase, but in water a hydrogen bond between two solutes mostly replaces bonds each made to water, so the *net* contribution to the stability of a complex is typically only a few kJ mol⁻¹.
:::

Several properties of water that matter to organisms follow from this network.

- **High heat capacity** (4.18 J g⁻¹ K⁻¹) buffers organisms and lakes against rapid changes in temperature.
- **High latent heat of vaporisation** (about 2.4 kJ g⁻¹ at body temperature) makes evaporation an efficient way to shed heat — the basis of sweating, panting and transpiration.
- **Density maximum at 4 °C** and the lower density of ice mean that lakes freeze from the top down and the water below stays liquid, so aquatic life can overwinter.
- **High dielectric constant** (about 78 at 25 °C) weakens the attraction between opposite charges roughly eighty-fold compared with a vacuum, which is why salts dissolve and why charged groups on the surface of a protein interact only weakly with one another.
- **Cohesion and surface tension** let water be pulled up the xylem of a tall tree as a continuous column under tension (see [[plant-biology/water-transport]]).

::: example How much water does it take to stay cool? {#ex-sweat}
A person walking briskly produces about 400 W of metabolic heat, of which (say) 100 W must be lost by evaporation of sweat on a hot day. How many grams of water must evaporate per hour? Take the latent heat of vaporisation of water at skin temperature as 2.42 kJ g⁻¹.
::: solution
Evaporating one gram removes 2420 J, so 100 W (100 J s⁻¹) requires $100/2420 = 0.0413\ \mathrm{g\,s^{-1}}$, or $0.0413\times3600 = 149\ \mathrm{g}$ per hour — about a glass of water. Sweat that drips off rather than evaporating removes almost no heat, which is why humid air, where evaporation is slow, makes heat so hard to bear. Desert mammals such as camels reduce this cost by letting their body temperature rise by several degrees during the day and storing the heat until the cool night, rather than evaporating water to stay at a fixed temperature (K. Schmidt-Nielsen, *Desert Animals*, 1964).
:::
:::

## Weak interactions and why biology needs them

Covalent bonds hold the atoms of a molecule together; weak, **noncovalent** interactions hold molecules to each other. Four kinds matter, and each has its own range and its own sensitivity to water.

| interaction | typical net strength in water | range and character |
|---|---|---|
| hydrogen bond | 2–6 kJ mol⁻¹ | short, directional |
| ionic interaction (salt bridge) | 1–6 kJ mol⁻¹ at the surface, more if buried | long-range, screened by water and salt |
| van der Waals contacts | 0.4–4 kJ mol⁻¹ per atom pair | very short, non-directional, additive over a surface |
| hydrophobic effect | about 0.1 kJ mol⁻¹ per Å² of buried non-polar surface | entropic, driven by water |

(Order-of-magnitude values; see the chemistry lesson for how each is estimated.) Thermal energy at 37 °C is $RT = 2.58\ \mathrm{kJ\,mol^{-1}}$, comparable with a single weak interaction. That is the point. A single weak bond is constantly made and broken by thermal motion, so molecules can meet, bind, react and part on biological time scales. Strong, specific binding is achieved by adding many weak interactions over a complementary surface — the shape of an enzyme's active site, the face of an antibody, the base pairs of a DNA duplex — so that specificity and reversibility come together.

::: definition The hydrophobic effect {#def-hydrophobic}
The **hydrophobic effect** is the tendency of non-polar molecules and surfaces in water to aggregate. It arises chiefly not from an attraction between the non-polar groups but from water: water molecules next to a non-polar surface cannot form their full complement of hydrogen bonds in all orientations and become more ordered, and burying the surface releases them, increasing the entropy of the solvent. At room temperature it is mainly entropic; its strength grows with buried non-polar area.
:::

The hydrophobic effect drives the folding of proteins (non-polar side chains in the core, [[biochemistry/amino-acids-proteins]]), the self-assembly of phospholipids into bilayers ([[cell-biology/membranes]]), the stacking of bases in nucleic acids, and much protein–protein binding.

### Binding strength and specificity

How strongly two molecules stick is measured by a dissociation constant, and its link to free energy is the exchange rate between weak interactions and biological specificity.

::: proposition Binding free energy and the dissociation constant {#prop-kd}
For the equilibrium $\mathrm{PL} \rightleftharpoons \mathrm{P} + \mathrm{L}$ with dissociation constant $K_\mathrm{d} = [\mathrm{P}][\mathrm{L}]/[\mathrm{PL}]$, the standard free energy of binding (relative to a 1 mol L⁻¹ standard state) is

$$
\Delta G^\circ_\mathrm{bind} = RT\ln K_\mathrm{d}.
$$ {#eq-kd}

At 37 °C, $RT\ln 10 = 5.94\ \mathrm{kJ\,mol^{-1}}$, so every additional 5.9 kJ mol⁻¹ of binding free energy lowers $K_\mathrm{d}$ tenfold. Two ligands whose binding energies differ by $\Delta\Delta G$ are discriminated by a factor $e^{\Delta\Delta G/RT}$ at equal concentrations, if both reach equilibrium with the binding site.
:::

::: example From binding energy to specificity {#ex-specificity}
(a) A transcription factor binds its DNA site with $K_\mathrm{d} = 1\ \mathrm{\mu mol\,L^{-1}}$; streptavidin binds biotin with $K_\mathrm{d} \approx 10^{-14}\ \mathrm{mol\,L^{-1}}$. Calculate $\Delta G^\circ_\mathrm{bind}$ at 37 °C. (b) Isoleucyl-tRNA synthetase must distinguish isoleucine from valine, which lacks one methylene group. If the extra CH₂ contributes about 5 kJ mol⁻¹ of hydrophobic binding energy, how well can binding alone discriminate?
::: solution
(a) $\Delta G^\circ = 2.579\ln(10^{-6}) = -35.6\ \mathrm{kJ\,mol^{-1}}$ for the transcription factor and $2.579\ln(10^{-14}) = -83\ \mathrm{kJ\,mol^{-1}}$ for biotin — roughly the sum of a dozen or more weak interactions, still less than a single C–C covalent bond (about 350 kJ mol⁻¹).

(b) $e^{5/2.579} = 6.95$: valine would be chosen about once for every seven isoleucines at equal concentration. Linus Pauling made this argument in 1957 and concluded that protein synthesis could not be as accurate as it is. The answer, worked out by Alan Fersht and others in the 1970s, is **editing**: the enzyme has a second, hydrolytic site that removes mis-activated valine, bringing the error down to the order of one in several thousand. Weak interactions alone set a limit on specificity; biology exceeds it by spending energy on proofreading, a theme taken up in [[molecular-biology/translation]].
:::
:::

## pH inside living things

Water ionises slightly, $\mathrm{H_2O} \rightleftharpoons \mathrm{H^+} + \mathrm{OH^-}$, with ion product $K_\mathrm{w} = [\mathrm{H^+}][\mathrm{OH^-}] = 1.0\times10^{-14}$ at 25 °C. The **pH** is $-\log_{10}$ of the hydrogen-ion activity (in practice, concentration in mol L⁻¹). Because the side chains of proteins, the phosphates of nucleotides and the carboxyl groups of metabolites all gain or lose protons in the range pH 4–10, pH controls their charge, and through charge their shape, binding and catalysis.

::: proposition The Henderson–Hasselbalch equation {#prop-hh}
For a weak acid HA with acid dissociation constant $K_\mathrm{a}$ and $\mathrm{p}K_\mathrm{a} = -\log_{10}K_\mathrm{a}$,

$$
\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]},
\qquad
f_\mathrm{HA} = \frac{[\mathrm{HA}]}{[\mathrm{HA}]+[\mathrm{A^-}]} = \frac{1}{1 + 10^{\,\mathrm{pH}-\mathrm{p}K_\mathrm{a}}}.
$$ {#eq-hh}

It follows from taking logarithms of $K_\mathrm{a} = [\mathrm{H^+}][\mathrm{A^-}]/[\mathrm{HA}]$; the derivation and its assumptions (dilute solution, activities replaced by concentrations) are in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=water-noncovalent). A group is half protonated at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$, about 91 % protonated one unit below and 9 % one unit above.
:::

The figure below shows [[#eq-hh]] together with the buffering power of the same acid–base pair.

::: widget plot
f: 1/(1 + 10^(x - p)); 4*10^(x - p)/(1 + 10^(x - p))^2
x: 2, 12
y: 0, 1.05
sliders: p=6:3:10:0.1
labels: \text{fraction protonated } f_\mathrm{HA}; \text{buffer capacity }\beta/\beta_{\max}
vlines: 4.7; 7.2; 8
caption: The fraction of a weak acid in its protonated form (first curve) and its buffer capacity relative to the maximum (second curve) against pH, for the $\mathrm{p}K_\mathrm{a}$ set by the slider $p$. The vertical lines mark the lysosome (4.7), the cytosol (7.2) and the mitochondrial matrix (8.0). Start at $p = 6$ (a histidine side chain): it is almost fully protonated in the lysosome, mostly deprotonated in the cytosol, and buffers best between them. Notice that buffering falls to a third of its maximum one pH unit away from the $\mathrm{p}K_\mathrm{a}$.
:::

### Compartments keep different pH values

A eukaryotic cell is not one solution but many. Each compartment has a characteristic pH, maintained by pumps and leaks in its membrane, and the differences are used.

| compartment | typical pH |
|---|---|
| cytosol, nucleus, ER | 7.2 |
| mitochondrial matrix | about 8.0 |
| Golgi (*cis* to *trans*) | 6.7 → 6.0 |
| early endosome | 6.3 |
| late endosome | 5.5 |
| lysosome | 4.7 |
| plant vacuole | about 5.5 (much lower in some fruits) |
| chloroplast stroma (in light) | about 8 |

(Animal values from J. R. Casey, S. Grinstein and J. Orlowski, *Nature Reviews Molecular Cell Biology* 11, 50, 2010; plant values approximate.) V-type proton ATPases acidify the endomembrane system ([[cell-biology/organelles]]); the respiratory chain pumps protons out of the matrix, making it alkaline ([[biochemistry/oxidative-phosphorylation]]); in the light, photosynthetic electron transport pumps protons from the chloroplast stroma into the thylakoid lumen. The low pH of the lysosome activates its acid hydrolases and keeps them safely inactive if they leak into the cytosol; the falling pH along the endocytic pathway makes receptors release their cargo; and the pH difference across the inner mitochondrial and thylakoid membranes is part of the energy store that makes ATP.

::: example How many free protons does a compartment hold? {#ex-protons}
(a) How many free hydrogen ions are there in an *E. coli* cell of volume 1 fL ($10^{-15}$ L) at pH 7.5? (b) Compare a mammalian cell of volume 2 pL at pH 7.2.
::: solution
Number $= 10^{-\mathrm{pH}}\times V \times N_\mathrm{A}$.

(a) $10^{-7.5}\times10^{-15}\times6.022\times10^{23} = 19$ free protons.

(b) $10^{-7.2}\times2\times10^{-12}\times6.022\times10^{23} = 7.6\times10^4$.

A bacterium has only a couple of dozen free H⁺ ions at any instant, yet it makes and consumes protons in metabolism at millions per second. The concentration can only stay steady because nearly all protons are held by buffers — the phosphates, carboxylates and histidines of the cytosol — which exchange them on microsecond time scales. "pH" in a tiny compartment is a time average of a fluctuating handful of ions, kept meaningful by buffering.
:::
:::

::: warning "Neutral means pH 7"
Neutrality means $[\mathrm{H^+}] = [\mathrm{OH^-}]$, that is $\mathrm{pH} = \tfrac12\mathrm{p}K_\mathrm{w}$, and $K_\mathrm{w}$ depends strongly on temperature: $\mathrm{p}K_\mathrm{w}$ is 14.94 at 0 °C, 14.00 at 25 °C and 13.6 at 37 °C. Neutral water is therefore pH 7.47 at 0 °C and pH 6.8 at body temperature. Mammalian cytosol at pH 7.2 is about 0.4 units alkaline of neutrality, not "almost neutral". The temperature dependence matters greatly for animals whose body temperature varies ([[#ex-alphastat]]).
:::

### Measuring pH inside cells

How do we know the numbers in the table? Several methods, each with its own assumptions, agree within about 0.1–0.2 units.

- **Distribution of a weak acid or base.** If only the uncharged form of a weak acid or base crosses the membrane, it accumulates on one side to an extent set by the pH difference ([[#prop-trapping]]). In 1959 W. J. Waddell and T. C. Butler measured the distribution of the weak acid DMO (5,5-dimethyloxazolidine-2,4-dione) between dog muscle and plasma and calculated intracellular pH from it.
- **Microelectrodes.** pH-sensitive glass or liquid-membrane microelectrodes inserted into large cells (snail neurons, frog muscle, squid axons) gave the first direct readings, in the 1950s–70s.
- **³¹P nuclear magnetic resonance.** The resonance frequency (chemical shift) of inorganic phosphate depends on its protonation state, which reflects pH. Because NMR is non-invasive, it measures intracellular pH in a living muscle or a whole organism — for example during exercise, showing the acidification as lactate and protons accumulate.
- **Fluorescent indicators.** Dyes such as BCECF, whose fluorescence changes with protonation (p$K_\mathrm{a}$ near 7), and genetically encoded sensors such as pHluorin, a pH-sensitive variant of green fluorescent protein (G. Miesenböck and colleagues, 1998), report pH in single cells and individual compartments. Ratiometric measurement, comparing fluorescence at two wavelengths, removes the effect of how much dye is present.

::: proposition Trapping of a weak base by a pH difference {#prop-trapping}
Suppose a weak base B (conjugate acid BH⁺, $\mathrm{p}K_\mathrm{a}$) is distributed between two compartments of pH $\mathrm{pH}_1$ and $\mathrm{pH}_2$, and only the neutral form B crosses the membrane. At equilibrium [B] is equal on both sides, and the ratio of total concentrations is

$$
\frac{[\mathrm{B}]_{\mathrm{tot},1}}{[\mathrm{B}]_{\mathrm{tot},2}} = \frac{1 + 10^{\,\mathrm{p}K_\mathrm{a}-\mathrm{pH}_1}}{1 + 10^{\,\mathrm{p}K_\mathrm{a}-\mathrm{pH}_2}}.
$$ {#eq-trapping}

For a weak acid the exponents are $\mathrm{pH}-\mathrm{p}K_\mathrm{a}$ instead. Assumptions: the charged form is impermeant, there is no binding or metabolism of the compound, and the membrane potential (which would act on the charged form) can be neglected.
:::

::: proof
In each compartment, by [[#eq-hh]], $[\mathrm{BH^+}] = [\mathrm{B}]\,10^{\,\mathrm{p}K_\mathrm{a}-\mathrm{pH}}$, so $[\mathrm{B}]_\mathrm{tot} = [\mathrm{B}](1 + 10^{\,\mathrm{p}K_\mathrm{a}-\mathrm{pH}})$. With $[\mathrm{B}]$ equal on both sides, the ratio of totals is the ratio of the bracketed factors.
:::

::: example Weak bases accumulate in lysosomes {#ex-trapping}
A membrane-permeant amine with $\mathrm{p}K_\mathrm{a} = 9.0$ is added to cells. Estimate its accumulation in lysosomes (pH 4.7) relative to the cytosol (pH 7.2).
::: solution
By [[#eq-trapping]], the ratio is $(1 + 10^{4.3})/(1 + 10^{1.8}) = 19\,954/64.1 = 311$. The amine is concentrated about 300-fold in lysosomes. This **ion trapping** is why weak bases such as ammonium chloride and chloroquine raise lysosomal pH when added at high concentration (they soak up the protons the V-ATPase pumps in), why acidotropic fluorescent dyes label acidic compartments, and why some weakly basic drugs build up in tissues rich in lysosomes. The same principle, run in reverse, let Waddell and Butler infer pH from the distribution of a weak acid.
:::
:::

::: quiz
A weak acid with $\mathrm{p}K_\mathrm{a} = 4.5$, permeant only in its neutral form, is added to the medium around isolated mitochondria (matrix pH 8.0, medium pH 7.2). Where does it accumulate?
- [x] In the matrix, the more alkaline compartment.
- [ ] Outside, in the more acidic medium.
- [ ] Equally on both sides, because the neutral form equilibrates.
- [ ] Nowhere, because only the neutral form is permeant.
::: solution
For a weak acid the charged form is A⁻, which is favoured at high pH. The neutral HA equilibrates, and each compartment holds $[\mathrm{HA}](1 + 10^{\,\mathrm{pH}-\mathrm{p}K_\mathrm{a}})$; the ratio is $(1+10^{3.5})/(1+10^{2.7}) \approx 6.3$ in favour of the matrix. Weak acids accumulate in alkaline compartments, weak bases in acidic ones — which is how matrix pH, and the pH gradient part of the proton-motive force, have been measured.
:::
:::

## Buffering the acid of metabolism

Metabolism makes acid. Every glucose converted to two lactate releases two protons; respiration makes CO₂, which hydrates to carbonic acid; ATP hydrolysis at cellular pH releases a fraction of a proton per ATP. A working muscle can generate tens of millimoles of protons per litre of cell water within a minute. Without buffers its pH would plunge by units; in fact it falls by a few tenths.

::: definition Buffer capacity {#def-buffer}
The **buffer capacity** of a solution is $\beta = dB/d\,\mathrm{pH}$, the amount of strong base (mol L⁻¹) needed to raise its pH by one unit (equivalently, of strong acid to lower it). For a weak acid–base pair of total concentration $C$,

$$
\beta = 2.303\,C\,\frac{K_\mathrm{a}[\mathrm{H^+}]}{(K_\mathrm{a} + [\mathrm{H^+}])^2},
$$ {#eq-beta}

which is greatest, $\beta_{\max} = 2.303\,C/4 = 0.576\,C$, at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$. Physiologists measure the buffer capacity of a tissue in mmol L⁻¹ per pH unit (sometimes called slykes, after Donald Van Slyke).
:::

[[#eq-beta]] has two morals. A buffer is useful only within about one unit of its $\mathrm{p}K_\mathrm{a}$, and its capacity is proportional to its concentration. Which groups in the cell have $\mathrm{p}K_\mathrm{a}$ values near 7?

- **Inorganic phosphate** ($\mathrm{H_2PO_4^-}/\mathrm{HPO_4^{2-}}$, $\mathrm{p}K_\mathrm{a} \approx 6.9$ at physiological ionic strength) and the phosphate groups of organic metabolites.
- **Histidine side chains** of proteins ($\mathrm{p}K_\mathrm{a}$ about 6–7 depending on environment). Haemoglobin, with dozens of histidines per tetramer and a concentration of about 5 mmol L⁻¹ of tetramer in red cells, is the main non-bicarbonate buffer of blood.
- **Imidazole dipeptides** such as carnosine (β-alanyl-histidine, $\mathrm{p}K_\mathrm{a}$ near 6.8) and its methylated relatives anserine and balenine, which reach tens of millimoles per kilogram in vertebrate skeletal muscle and are especially abundant in animals that make bursts of anaerobic effort or dive for long periods — sprinting fish such as tuna, and diving whales (H. Abe, *Biochemistry (Moscow)* 65, 757, 2000).
- **Bicarbonate**, with an apparent $\mathrm{p}K$ of 6.1, far from 7.4, yet the most important extracellular buffer because it is an *open* system: CO₂ is removed by the lungs (or gills), so the acid form is held constant. Its detailed treatment, with the calculation of the pH of arterial blood, is in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=water-noncovalent) and its clinical interpretation in [Medicine Atlas: renal](/learn/medicine/course.php?c=renal).

::: example A phosphate-buffered compartment takes up acid {#ex-buffer}
A compartment contains 20 mmol L⁻¹ total inorganic phosphate ($\mathrm{p}K_\mathrm{a} = 6.86$) at pH 7.20 and no other buffer. (a) What are the concentrations of $\mathrm{HPO_4^{2-}}$ and $\mathrm{H_2PO_4^-}$? (b) What is the pH after 5 mmol L⁻¹ of strong acid is added? (c) What would the pH be with no buffer at all?
::: solution
(a) $[\mathrm{HPO_4^{2-}}]/[\mathrm{H_2PO_4^-}] = 10^{7.20-6.86} = 2.19$, so $[\mathrm{HPO_4^{2-}}] = 20\times2.19/3.19 = 13.7$ and $[\mathrm{H_2PO_4^-}] = 6.3$ mmol L⁻¹.

(b) The acid converts 5 mmol L⁻¹ of $\mathrm{HPO_4^{2-}}$ to $\mathrm{H_2PO_4^-}$: the ratio becomes $8.7/11.3$, and $\mathrm{pH} = 6.86 + \log_{10}(8.73/11.27) = 6.86 - 0.11 = 6.75$.

(c) Unbuffered, 5 mmol L⁻¹ of H⁺ gives $\mathrm{pH} = -\log_{10}(0.005) = 2.3$.

The buffer turned a catastrophic drop of nearly five units into one of less than half a unit. Real cytosol has a buffer capacity of several tens of mmol L⁻¹ per pH unit from all its groups together, and in the longer term exports acid across the plasma membrane by Na⁺/H⁺ exchangers and bicarbonate transporters ([[cell-biology/membrane-transport]]).
:::
:::

::: application Intracellular pH as a signal
Cells not only defend pH but use it. Sea-urchin eggs alkalinise their cytosol by a few tenths of a unit within minutes of fertilisation, by Na⁺/H⁺ exchange, and this rise helps switch on protein synthesis and DNA replication (D. Epel and colleagues, 1970s). In yeast, the cytosolic pH falls when glucose runs out and rises when it is added, and the change regulates growth through pH-sensitive proteins. Plant guard cells, root hairs and pollen tubes all show pH changes linked to growth and signalling. pH-sensitive proteins usually owe that sensitivity to histidines or clusters of acidic residues whose $\mathrm{p}K_\mathrm{a}$ has been tuned near the physiological range.
:::

### Temperature, pH and the ectotherm's solution

For an animal whose body temperature changes, a fixed pH would mean a changing state of ionisation of its proteins, because both $\mathrm{p}K_\mathrm{w}$ and the $\mathrm{p}K_\mathrm{a}$ of histidine fall as temperature rises (by about 0.02 units per °C). In the 1960s–70s Hermann Rahn and Robert Reeves found that the blood and cell pH of turtles, frogs and fish fall as temperature rises, by roughly 0.015–0.02 units per °C, so that the pH stays a constant distance above neutrality. Reeves's **alpha-stat** hypothesis (1972) proposed that what is regulated is not pH itself but the fractional dissociation (α) of protein histidine imidazole groups, which keeps the net charge — and hence the structure and function — of proteins constant as temperature varies. The same question arises in hibernating mammals and in human patients cooled for surgery, where there is a long-running clinical debate about which strategy to use (see [Medicine Atlas](/learn/medicine/)).

::: example The alpha-stat pattern in a turtle {#ex-alphastat}
Representative arterial blood pH values for a freshwater turtle acclimated to different temperatures are 7.80 at 10 °C, 7.63 at 20 °C and 7.46 at 30 °C (illustrative values of the kind reported by Howell, Rahn and colleagues, 1970). Using $\mathrm{p}K_\mathrm{w} = 14.535$, 14.167 and 13.833 at these temperatures, compare the pH with neutrality.
::: solution
Neutral pH is $\tfrac12\mathrm{p}K_\mathrm{w}$: 7.27, 7.08 and 6.92. The differences $\mathrm{pH} - \mathrm{pN}$ are 0.53, 0.55 and 0.54 — essentially constant. The blood pH falls with slope $(7.46 - 7.80)/20 = -0.017$ per °C, almost exactly the slope of neutrality, $-0.0176$ per °C. The turtle keeps its blood a constant 0.54 units alkaline of neutral; a fixed pH of 7.4 at all temperatures would have meant alkalosis in the warm and acidosis in the cold relative to its proteins.
:::
:::

## Water balance: osmosis and compatible solutes

Water moves across membranes passively, toward the side with more dissolved particles. An organism must therefore control the total concentration of solutes in its cells — its **osmolarity** — relative to its surroundings, or it will swell or shrink.

::: proposition The van 't Hoff relation for osmotic pressure {#prop-vanthoff}
For a dilute solution containing a total concentration $c$ of osmotically active particles (osmoles per litre), separated from pure water by a membrane permeable only to water, the pressure needed to stop water flowing in is

$$
\Pi = cRT,
$$ {#eq-vanthoff}

with $R = 0.08314\ \mathrm{L\,bar\,mol^{-1}\,K^{-1}}$. For a salt each dissociated ion counts, so 0.15 mol L⁻¹ NaCl gives $c \approx 0.30$ osmol L⁻¹ if ideal. Assumptions: an ideal dilute solution (real solutions deviate, which is why biologists measure osmolality directly, by freezing-point depression), and a perfectly semipermeable membrane. Across a real membrane the effective pressure is reduced for solutes that also cross, by a reflection coefficient between 0 and 1.
:::

At 37 °C, 1 osmol L⁻¹ corresponds to $0.08314\times310.15 = 25.8$ bar. Mammalian body fluids at about 0.29–0.30 osmol L⁻¹ therefore have an osmotic pressure of about 7.7 bar relative to pure water — many times atmospheric pressure. Animal cells, with no wall, must stay isosmotic with their surroundings; plant, fungal and bacterial cells let water enter until their wall pushes back, generating **turgor**.

::: example Turgor in a plant cell {#ex-turgor}
A plant cell with an internal osmolarity of 0.50 osmol L⁻¹ sits in soil water of 0.05 osmol L⁻¹ at 20 °C. What turgor pressure does it develop at equilibrium, if the wall is rigid and solutes do not cross?
::: solution
At equilibrium the wall pressure balances the osmotic difference: $\Delta\Pi = (0.50 - 0.05)\times0.08314\times293.15 = 11.0$ bar, or 1.1 MPa — about eleven atmospheres, more than in a car tyre. Turgor of this size holds herbaceous plants upright and drives cell expansion during growth; water potential, which combines osmotic and pressure terms, is developed in [[plant-biology/water-transport]].
:::
:::

### Compatible and counteracting solutes

Organisms that live in salty, dry or cold environments raise their internal osmolarity — but not with salt, which at high concentration disrupts protein structure and function. Instead they accumulate **compatible solutes** (osmolytes): small organic molecules that can reach high concentration without perturbing proteins. The same handful of chemical classes has been recruited again and again across bacteria, archaea, plants and animals (P. H. Yancey and colleagues, *Science* 217, 1214, 1982).

::: definition Compatible and counteracting osmolytes {#def-osmolyte}
A **compatible osmolyte** is a solute that cells accumulate to balance external osmolarity and that has little effect on macromolecular function even at hundreds of millimoles per litre: polyols (glycerol, sorbitol, mannitol), sugars (sucrose, trehalose), free amino acids and derivatives (proline, taurine, glycine betaine, ectoine) and methylamines (trimethylamine N-oxide, TMAO). A **counteracting** pair consists of a solute that destabilises proteins (urea) and one that stabilises them (TMAO), accumulated together so that their effects on protein stability cancel.
:::

The striking examples:

- **Sharks, rays and the coelacanth** keep their body fluids slightly above the osmolarity of sea water (about 1000 mOsm L⁻¹) largely with urea, at several hundred millimoles per litre, together with methylamines, mainly TMAO, at roughly half the urea concentration in their tissues. Urea alone would destabilise their proteins; TMAO counteracts it (Yancey and G. N. Somero, *Biochemical Journal* 183, 317, 1979).
- **Deep-sea fishes** accumulate TMAO in proportion to the depth at which they live, apparently to counteract the effect of hydrostatic pressure on protein folding and binding. Because TMAO also raises osmolality, the trend predicts that bony fishes would become isosmotic with sea water at about 8,000–8,500 m, which matches the deepest depths at which fishes have been observed (Yancey and colleagues, *PNAS* 111, 4461, 2014) — a biochemical hypothesis for a biogeographical limit.
- **Halophilic archaea** such as *Halobacterium salinarum* take the opposite route ("salt-in"): they accumulate several mol L⁻¹ of KCl in the cytoplasm and have evolved proteins rich in acidic residues that require high salt to fold.
- **Plants** under drought or salinity accumulate proline and glycine betaine; **desiccation-tolerant** organisms — many seeds, resurrection plants, brine-shrimp cysts — replace water with sugars such as sucrose and trehalose, which form a glassy state that preserves membranes and proteins. Tardigrades, by contrast, rely largely on intrinsically disordered proteins rather than trehalose.
- **Freeze-tolerant** wood frogs (*Rana sylvatica*, now *Lithobates sylvaticus*) flood their tissues with glucose from liver glycogen as ice forms outside their cells, limiting cell shrinkage, while polar fishes make **antifreeze proteins** that bind to ice crystals and stop them growing.

::: intuition Why compatible solutes are compatible
Proteins are stabilised by solutes that are *excluded* from their surface: such a solute prefers water to protein, so it favours the most compact state, with least surface exposed — the folded state. Urea, which binds the peptide backbone, has the opposite preference and favours the unfolded state. TMAO, glycine betaine and trehalose are strongly excluded. So the compatibility of an osmolyte is not inertness but a balance of weak interactions with water and with the protein surface, the same interactions this chapter began with.
:::

::: history
The ion product of water was measured by Friedrich Kohlrausch and Adolf Heydweiller from the conductivity of ultrapure water in 1894. Søren Sørensen, working on enzymes at the Carlsberg Laboratory in Copenhagen, introduced the pH scale in 1909 because enzyme activity depended so strongly on hydrogen-ion concentration; Lawrence Henderson (1908) and Karl Hasselbalch (1916) gave the buffer equation its modern form, Henderson in work on the acid–base balance of blood. Jacobus van 't Hoff derived the osmotic-pressure law in 1887 from Wilhelm Pfeffer's measurements with artificial membranes. Walter Kauzmann's 1959 review identified the hydrophobic effect as the main force in protein folding. Waddell and Butler measured intracellular pH by weak-acid distribution in 1959, and Rahn and Reeves developed the comparative physiology of temperature and pH in the 1960s–70s. The theory of compatible and counteracting solutes was set out by Yancey, Somero and colleagues in 1979–82.
:::

## Where this leads

The weak interactions of this chapter fold the chains of [[biochemistry/amino-acids-proteins]], assemble the lipids of [[biochemistry/carbohydrates-lipids]] and hold substrates to the enzymes of [[biochemistry/enzymes]]. Proton gradients between compartments return in [[biochemistry/oxidative-phosphorylation]] as an energy store, and the acid produced by working muscle returns in [[biochemistry/glycolysis-tca]].

::: summary
- Water's hydrogen-bond network gives it a high heat capacity, latent heat and dielectric constant; organisms use evaporation to shed heat (about 150 g of sweat per hour for 100 W).
- Weak interactions (hydrogen bonds, ionic interactions, van der Waals contacts, the hydrophobic effect) are each comparable with $RT$; specificity comes from many acting together, $\Delta G^\circ_\mathrm{bind} = RT\ln K_\mathrm{d}$, 5.9 kJ mol⁻¹ per tenfold at 37 °C, and beyond that from energy-consuming proofreading.
- Compartments keep different pH values (lysosome 4.7, cytosol 7.2, matrix 8.0), measured by weak-acid distribution, ³¹P NMR and fluorescent sensors; weak bases are trapped in acidic compartments by a factor $(1+10^{\mathrm{p}K_\mathrm{a}-\mathrm{pH}_1})/(1+10^{\mathrm{p}K_\mathrm{a}-\mathrm{pH}_2})$.
- Buffers work within about one unit of their $\mathrm{p}K_\mathrm{a}$, with capacity $\beta_{\max} = 0.576\,C$; in cells the main buffers are phosphates, protein histidines and imidazole dipeptides, and outside cells the open bicarbonate system.
- Neutral pH depends on temperature (6.8 at 37 °C); ectotherms let blood pH track neutrality (alpha-stat).
- Osmotic pressure $\Pi = cRT$ (25.8 bar per osmol L⁻¹ at 37 °C); organisms balance it with compatible osmolytes, counteracting urea with TMAO, or (halophiles) with salt-adapted proteins.
:::

## Exercises

::: exercise Protons in a lysosome {level=1 check="786"}
How many free hydrogen ions are there, on average, in a spherical lysosome of diameter 0.50 µm at pH 4.7? Give the nearest whole number.
::: solution
Radius $0.25\ \mathrm{\mu m} = 2.5\times10^{-7}\ \mathrm{m}$, so $V = \tfrac43\pi r^3 = 6.54\times10^{-20}\ \mathrm{m^3} = 6.54\times10^{-17}\ \mathrm{L}$. Number $= 10^{-4.7}\times6.54\times10^{-17}\times6.022\times10^{23} = 786$.
:::
:::

::: exercise Histidine near neutrality {level=1 check="0.240"}
A histidine side chain has $\mathrm{p}K_\mathrm{a} = 6.0$. What fraction of it is protonated at pH 6.5? Give three significant figures.
::: solution
By [[#eq-hh]], $f = 1/(1+10^{6.5-6.0}) = 1/(1+3.162) = 0.240$.
:::
:::

::: exercise Osmotic pressure of saline {level=1 check="7.74"}
Treating 0.15 mol L⁻¹ NaCl as fully dissociated and ideal, calculate its osmotic pressure in bar at 37 °C (three significant figures).
::: solution
$c = 0.30$ osmol L⁻¹, so $\Pi = 0.30\times0.08314\times310.15 = 7.74$ bar.
:::
:::

::: exercise Sweating during hard exercise {level=2 check="446"}
During hard exercise a cyclist must lose 300 W by evaporation. Using a latent heat of 2.42 kJ g⁻¹, how many grams of sweat must evaporate per hour (three significant figures)?
::: solution
$300/2420 = 0.124\ \mathrm{g\,s^{-1}}$, times 3600 s gives 446 g per hour. Since much sweat drips rather than evaporates, actual sweat rates are higher, often over a litre per hour.
:::
:::

::: exercise A weak base in a plant vacuole {level=2 check="76.2"}
A weak base with $\mathrm{p}K_\mathrm{a} = 8.0$ is permeant only in its neutral form. By what factor is it concentrated in a vacuole at pH 5.5 relative to a cytosol at pH 7.5 (three significant figures)?
::: solution
By [[#eq-trapping]], $(1 + 10^{2.5})/(1 + 10^{0.5}) = 317.2/4.162 = 76.2$.
:::
:::

::: exercise Buffer after acid {level=2 check="6.75"}
Repeat part (b) of [[#ex-buffer]] and give the final pH to two decimal places. Then calculate how much acid (mmol L⁻¹) would lower the pH of the same buffer to 6.86.
::: solution
The final pH is 6.75, as in the example. At pH 6.86 the two forms are equal, 10 mmol L⁻¹ each; starting from 13.73 mmol L⁻¹ of $\mathrm{HPO_4^{2-}}$, that needs $13.73 - 10 = 3.7$ mmol L⁻¹ of acid.
:::
:::

::: exercise One more hydrogen bond {level=2 check="6.95"}
A drug designer adds a group that makes one extra hydrogen bond with the target, worth a net 5.0 kJ mol⁻¹. By what factor does the dissociation constant fall at 37 °C (three significant figures)? Why might the measured improvement be smaller?
::: solution
$K_\mathrm{d}$ falls by $e^{5.0/2.579} = 6.95$. The improvement is often smaller because the new group must first be stripped of the hydrogen bonds it makes to water, because it may restrict the flexibility of the molecule (an entropic cost), and because slight misalignment weakens the bond — the net value of a hydrogen bond in water is what is left after all these exchanges.
:::
:::

::: exercise A deep-sea osmolality limit {level=3 check="8.13"}
Suppose (illustratively) that the osmolality of a teleost fish's tissues rises with the depth $z$ (in km) at which it lives as $350 + 80z$ mOsm kg⁻¹, mainly through TMAO, and that sea water is 1000 mOsm kg⁻¹. (a) At what depth does the fish become isosmotic with sea water (three significant figures)? (b) Explain why this might set a depth limit for bony fishes, while sharks, which are already isosmotic at the surface, are almost absent below about 3,000 m.
::: solution
(a) $350 + 80z = 1000$ gives $z = 650/80 = 8.13$ km.
(b) Bony fishes keep their body fluids at a third of sea-water osmolality and drink sea water, excreting salt at the gills. If they need ever more TMAO to stabilise their proteins against pressure, their osmolality rises; beyond the isosmotic depth they would gain water osmotically and need a new way to deal with it, or would have to accept unstabilised proteins. The prediction of a limit near 8.1–8.4 km matches the deepest observations of fishes. Sharks start near isosmotic with urea and TMAO, so they have little room to add more TMAO without becoming hyperosmotic; their scarcity in the deep sea has been explained partly this way, though energetic and other factors (such as their oily, energy-expensive livers) are also proposed. This is a hypothesis with support, not a settled explanation.
:::
:::

::: exercise Interpreting a ³¹P NMR experiment {level=3}
³¹P NMR spectra of a human forearm muscle are recorded at rest and at the end of a minute of intense exercise. At rest the inorganic phosphate (Pi) peak indicates pH 7.05 and the phosphocreatine (PCr) peak is large; after exercise the Pi peak is much larger, PCr has fallen by about 60 %, and the Pi peak indicates pH 6.55. (a) Explain how a chemical shift can report pH. (b) Using [[#eq-hh]] with $\mathrm{p}K_\mathrm{a} = 6.75$, calculate the fraction of Pi in the $\mathrm{HPO_4^{2-}}$ form at each pH. (c) The muscle's buffer capacity is about 25 mmol L⁻¹ per pH unit at short times (illustrative). How many mmol L⁻¹ of protons must have been added, net, to produce the pH change? (d) Give two biochemical sources of these protons and one reason the drop is smaller than you might expect.
::: solution
(a) The two forms $\mathrm{H_2PO_4^-}$ and $\mathrm{HPO_4^{2-}}$ have slightly different resonance frequencies, but they interconvert much faster than the NMR time scale, so a single peak appears at a position that is the population-weighted average. Its position therefore follows the ratio of the two forms, which by [[#eq-hh]] reports pH (after calibration in solutions of known pH).
(b) $f_{\mathrm{HPO_4}} = 1/(1+10^{6.75-\mathrm{pH}})$: at pH 7.05, $1/(1+10^{-0.30}) = 0.67$; at pH 6.55, $1/(1+10^{0.20}) = 0.39$.
(c) $\Delta\mathrm{pH} = 0.50$, so about $25\times0.50 = 12.5$ mmol L⁻¹ of protons.
(d) Sources: glycolysis to lactate (one proton per lactate, [[biochemistry/glycolysis-tca]]) and net ATP hydrolysis. The drop is limited partly because the breakdown of phosphocreatine to creatine *consumes* protons (the creatine kinase reaction $\mathrm{PCr} + \mathrm{ADP} + \mathrm{H^+} \to \mathrm{Cr} + \mathrm{ATP}$), and partly because lactate and protons are exported from the cell during the exercise.
:::
:::
