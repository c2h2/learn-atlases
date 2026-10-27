Every cell carries a set of instructions written in a four-letter chemical alphabet, and every cell reads those instructions thousands of times a second. The instructions are deoxyribonucleic acid (DNA); the working copies are ribonucleic acid (RNA); the products are proteins. That flow of information — replication of DNA, transcription into RNA, translation into protein — is often drawn as a diagram of boxes and arrows, but every arrow is a chemical reaction: a nucleophile attacking a phosphorus atom, an amine attacking an ester. This chapter treats nucleic acids as chemistry. We start with the monomers and the bond that links them, explain why the double helix forms and how much energy holds it together, show how heat separates its strands and how a cell copies them, and end with the reactions that turn a sequence of bases into a sequence of amino acids. The noncovalent forces used throughout are those of [[biochemistry/water-noncovalent]]; the free-energy bookkeeping of polymerisation anticipates [[biochemistry/bioenergetics]].

## Nucleotides: the monomers

A nucleic acid is a polymer of **nucleotides**, and each nucleotide has three parts that are worth taking apart separately, because each one has a job.

The **bases** are flat, aromatic nitrogen heterocycles of two families ([[organic-2/heterocycles]]). The **purines**, adenine (A) and guanine (G), are fused bicyclic systems (a pyrimidine ring fused to an imidazole). The **pyrimidines** are single six-membered rings: cytosine (C), thymine (T, in DNA only) and uracil (U, in RNA only). Thymine is simply 5-methyluracil. Each base can donate and accept hydrogen bonds along one edge, and that edge carries the information.

The **sugar** is a five-carbon furanose: β-D-ribose in RNA and β-D-2-deoxyribose in DNA, which lacks the hydroxyl group at C2. Sugar atoms are numbered with primes (1′ to 5′) so that they are not confused with the atoms of the base.

The **phosphate** joins the sugars. At pH 7 each phosphodiester carries one negative charge (its $\mathrm{p}K_\mathrm{a}$ is about 1), so a nucleic acid is a polyanion with one charge per nucleotide — the single most important fact about its physical chemistry.

::: definition Nucleoside, nucleotide and the phosphodiester backbone {#def-nucleotide}
A **nucleoside** is a base joined to C1′ of a ribose or 2′-deoxyribose by a **β-N-glycosidic bond** (to N9 of a purine or N1 of a pyrimidine): adenosine, guanosine, cytidine, uridine, and deoxythymidine. A **nucleotide** is a phosphate ester of a nucleoside, usually at the 5′-hydroxyl: adenosine 5′-monophosphate (AMP), deoxyguanosine 5′-triphosphate (dGTP), and so on. In a nucleic acid the nucleotides are linked by **3′,5′-phosphodiester bonds**: the phosphate esterified to the 5′-OH of one sugar is also esterified to the 3′-OH of the previous one. The chain therefore has a direction: one end carries a free 5′-phosphate, the other a free 3′-OH, and sequences are always written from the **5′ end to the 3′ end** (5′-ACGT-3′, often just ACGT).
:::

The base pairs of the double helix are made from the hydrogen-bonding edges, so the protonation states of the bases matter. Their ring nitrogens are weak bases and their N–H groups weak acids: typical values (Saenger, *Principles of Nucleic Acid Structure*) are $\mathrm{p}K_\mathrm{a} \approx 3.5$ for protonation at N1 of adenine, $4.2$ at N3 of cytosine, and $9.2$–$9.7$ for loss of the N1–H of guanine and the N3–H of thymine and uracil. All are far from 7, so at physiological pH the bases are neutral and exist overwhelmingly in their **amino and keto (lactam) tautomers**; the rare imino and enol tautomers pair with the wrong partner, and their occasional appearance is one source of spontaneous mutation.

### Why DNA uses deoxyribose and thymine

The missing 2′-hydroxyl is the chemical reason DNA is the archive and RNA the working copy. In RNA the 2′-OH sits next to the phosphodiester. Under basic conditions (or with a metal ion or a ribonuclease to help) the 2′-alkoxide attacks the neighbouring phosphorus in an intramolecular, in-line $\mathrm{S_N2}$-like displacement: the 5′-oxygen of the next nucleotide leaves, the chain is cut, and a **2′,3′-cyclic phosphate** is formed, which hydrolyses further to a mixture of 2′- and 3′-phosphates. An intramolecular nucleophile five atoms away is an enormous rate advantage (the effective-molarity argument of [[kinetics/homogeneous-catalysis]]), so RNA is hydrolysed in dilute alkali within hours while DNA survives. DNA's phosphodiester, lacking that neighbour, has an estimated uncatalysed hydrolysis half-life at neutral pH and room temperature of the order of $10^{7}$ years or more — an ideal property for a molecule that must last a lifetime.

Thymine instead of uracil is about repair. Cytosine slowly loses its amino group by hydrolysis (deamination) and becomes uracil. If DNA normally contained uracil, a repair enzyme could not tell a deaminated C from a genuine U; because DNA uses T, any U found in DNA is damage, and uracil-DNA glycosylase removes it.

::: example Measuring DNA by its absorbance {#ex-a260}
The bases absorb strongly near $260\ \mathrm{nm}$ (a $\pi \rightarrow \pi^*$ band, [[spectroscopy/electronic-spectroscopy]]). The laboratory rule is that a solution of double-stranded DNA with absorbance $A_{260} = 1.00$ in a $1\ \mathrm{cm}$ cell contains about $50\ \mu\mathrm{g\,cm^{-3}}$. (a) A sample diluted 20-fold reads $A_{260} = 0.412$. What is the concentration of the undiluted sample? (b) Taking the mean molar mass of a base pair (sodium salt) as $650\ \mathrm{g\,mol^{-1}}$, what molar absorption coefficient per base pair does the rule imply? (c) On heating, the absorbance of the diluted sample rises to $0.56$. What has happened?
::: solution
(a) By the Beer–Lambert law absorbance is proportional to concentration, so the diluted sample contains $0.412 \times 50 = 20.6\ \mu\mathrm{g\,cm^{-3}}$ and the original $20 \times 20.6 = 412\ \mu\mathrm{g\,cm^{-3}}$, or $0.41\ \mathrm{mg\,cm^{-3}}$.

(b) $50\ \mu\mathrm{g\,cm^{-3}} = 50\ \mathrm{mg\,dm^{-3}}$, which is $0.050/650 = 7.69\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ of base pairs. With $A = \varepsilon c l$,
$$
\varepsilon = \frac{1.00}{(7.69\times10^{-5}\ \mathrm{mol\,dm^{-3}})(1\ \mathrm{cm})} = 1.30\times10^{4}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}\ \text{per base pair},
$$
about $6500$ per nucleotide. That is well below the $\varepsilon_{260}$ of the free nucleotides (about $15\,400$ for dAMP, $7400$ for dCMP), because the stacked bases in the helix absorb less — the **hypochromic effect**.

(c) The ratio $0.56/0.412 = 1.36$: the absorbance has risen by about a third because the strands have separated and the bases unstacked (the **hyperchromic effect**). This rise is the standard way to follow DNA melting, the subject of the third section. It also explains why the conversion factors differ for single strands — about $33\ \mu\mathrm{g\,cm^{-3}}$ per absorbance unit for single-stranded DNA and $40$ for RNA.
:::
:::

## The double helix

In 1953 James Watson and Francis Crick fitted the chemistry above to Rosalind Franklin's X-ray photographs and to a set of compositional regularities found by Erwin Chargaff. The regularities came first.

::: proposition Chargaff's rules {#prop-chargaff}
In the double-stranded DNA of any organism, measured as mole fractions of bases,
$$
x_\mathrm{A} = x_\mathrm{T}, \qquad x_\mathrm{G} = x_\mathrm{C}, \qquad\text{hence}\qquad x_\mathrm{A} + x_\mathrm{G} = x_\mathrm{T} + x_\mathrm{C} = \tfrac12 .
$$
The ratio $(x_\mathrm{G} + x_\mathrm{C})$, the **GC content**, varies between species (from about 25 % to over 70 % in bacteria) but is constant within one. These are **empirical rules** about double-stranded DNA: they do not hold for single-stranded genomes (bacteriophage φX174 has $x_\mathrm{A} \neq x_\mathrm{T}$), for RNA, or for one strand of a duplex taken alone.
:::

::: proof Why the rules follow from base pairing
In the Watson–Crick model every adenine in one strand faces a thymine in the other and every guanine faces a cytosine, so the two strands are **complementary**. Count the duplex: if one strand contains $n_\mathrm{A}$, $n_\mathrm{T}$, $n_\mathrm{G}$, $n_\mathrm{C}$ of each base, the partner contains $n_\mathrm{T}$, $n_\mathrm{A}$, $n_\mathrm{C}$, $n_\mathrm{G}$ respectively. Summing, the duplex contains $n_\mathrm{A} + n_\mathrm{T}$ adenines and the same number of thymines, and $n_\mathrm{G} + n_\mathrm{C}$ guanines and the same number of cytosines, whatever the sequence. Each base pair contains exactly one purine and one pyrimidine, so purines are half of all bases. Nothing constrains $n_\mathrm{A}$ relative to $n_\mathrm{G}$, which is why the GC content is free to vary. Chargaff's measurements (1950) were the observation; complementarity is the explanation, and its failure in single-stranded genomes is a test of it.
:::

The pairs themselves are fixed by geometry. A **Watson–Crick A·T pair** has two hydrogen bonds (N6–H of adenine to O4 of thymine, and N3–H of thymine to N1 of adenine); a **G·C pair** has three (O6…H–N4, N1–H…N3, and N2–H…O2). Both pairs have almost the same overall shape and the same $1.08\ \mathrm{nm}$ distance between the C1′ atoms of the two sugars, so any sequence fits the same regular backbone — the property that lets a helix carry arbitrary information. The hydrogen bonds are those defined in [[biochemistry/water-noncovalent#def-hbond]].

The structure has the following features in its common form, **B-DNA** (values from Berg et al., 9th ed., for DNA in solution):

- two **antiparallel** strands — one running 5′→3′ up the axis, the other 5′→3′ down it — wound into a **right-handed** helix about $2.0\ \mathrm{nm}$ in diameter;
- sugar–phosphate backbones on the outside, in contact with water and counter-ions; base pairs stacked inside, nearly perpendicular to the axis;
- a rise of $0.34\ \mathrm{nm}$ per base pair and about $10.5$ base pairs per turn, so a pitch of about $3.6\ \mathrm{nm}$;
- because the glycosidic bonds of a pair are not diametrically opposite, a wide **major groove** and a narrow **minor groove**; proteins read sequence mostly by hydrogen bonds to base edges exposed in the major groove.

Dehydrated DNA, and double-stranded RNA and RNA–DNA hybrids (whose 2′-OH forbids the B-form sugar pucker), adopt the wider, more compact **A form**, with about 11 base pairs per turn and a rise of $0.26\ \mathrm{nm}$. Sequences of alternating purines and pyrimidines can form **Z-DNA**, a left-handed helix of about 12 base pairs per turn.

### What holds the helix together

It is tempting to say "hydrogen bonds". That is only part of the story, and the smaller part. The bases of separated strands are also hydrogen-bonded — to water — so forming a base pair *exchanges* hydrogen bonds rather than creating them, and the net free-energy gain per pair is small. Three other contributions decide stability:

1. **Base stacking.** Flat aromatic bases piled $0.34\ \mathrm{nm}$ apart gain van der Waals (dispersion) and dipole–dipole attraction and bury their faces away from water, which is the hydrophobic effect of [[biochemistry/water-noncovalent#def-hydrophobic]]. Stacking depends on *neighbouring* pairs, which is why the most accurate description of duplex stability is the **nearest-neighbour model** (SantaLucia, 1998): each of the ten distinct stacks of two adjacent base pairs contributes its own $\Delta G^\circ$, between about $-2$ and $-9\ \mathrm{kJ\,mol^{-1}}$ at $37\ \mathrm{^\circ C}$ in $1\ \mathrm{mol\,dm^{-3}}$ NaCl, with stacks containing G·C pairs the most favourable.
2. **Electrostatic repulsion** between the phosphates of the two strands opposes the duplex. It is screened by counter-ions: by the argument of [[biochemistry/water-noncovalent#prop-coulomb]], cations in solution (and $\mathrm{Mg^{2+}}$ or polyamines in cells) cluster round the backbone and reduce the repulsion, so duplex stability rises with salt concentration.
3. **Conformational entropy.** Two flexible single strands lose a great deal of freedom on forming one rigid duplex; this makes $\Delta S^\circ$ of duplex formation large and negative and is why short duplexes fall apart at modest temperatures.

::: warning G·C pairs are not more stable "because of the third hydrogen bond" {#warn-hbond}
The common explanation that G·C-rich DNA melts at a higher temperature simply because a G·C pair has three hydrogen bonds and A·T two is incomplete. Hydrogen bonds to water are broken when the pair forms, so the net contribution of each hydrogen bond is small. The larger difference is in **stacking**: stacks involving G·C pairs are substantially more favourable than those involving only A·T, and the nearest-neighbour parameters, which include both effects, are what predict melting temperatures quantitatively. Equally, it is wrong to read Chargaff's rules as "A = G": the rules pair each purine with a specific pyrimidine.
:::

::: example Composition from one measurement {#ex-composition}
The DNA of a bacterium is found to contain $21.0\ \%$ thymine (by moles of base). (a) Give the percentages of the other bases if the DNA is double-stranded. (b) Repeat for a virus whose single-stranded DNA has $21.0\ \%$ thymine.
::: solution
(a) By [[#prop-chargaff]], $x_\mathrm{A} = x_\mathrm{T} = 21.0\ \%$. The remaining $100 - 42.0 = 58.0\ \%$ is G + C in equal amounts: $x_\mathrm{G} = x_\mathrm{C} = 29.0\ \%$. The GC content is $58.0\ \%$.

(b) Nothing can be said. A single strand is not paired with a complement, so its composition is unconstrained; the other three percentages must be measured. This is exactly how Robert Sinsheimer recognised in 1959 that φX174 DNA is single-stranded: its base ratios broke Chargaff's rules.
:::
:::

### Length and topology

Base pairs are small, but genomes are long. The *E. coli* chromosome has $4.64\times10^{6}$ base pairs, so in the B form it is $4.64\times10^{6} \times 0.34\ \mathrm{nm} = 1.58\ \mathrm{mm}$ long — about 800 times the length of the cell that contains it. A human diploid cell holds about $6.2\times10^{9}$ base pairs, roughly $2\ \mathrm{m}$ of DNA in a nucleus a few micrometres across. Packing is achieved by wrapping and coiling: in eukaryotes, 147 base pairs wind about 1.7 times round each **nucleosome**, a disc of eight histone proteins whose many lysine and arginine side chains neutralise the phosphates.

In a closed circular DNA, or a long loop whose ends are held by proteins, the two strands cannot be untwisted without being cut. The number of times one strand winds round the other becomes a topological invariant.

::: definition Linking number and supercoiling {#def-linking}
For a covalently closed double-stranded DNA, the **linking number** $Lk$ is the number of times one strand crosses the other when the molecule is laid flat; it is an integer and cannot change without breaking a strand. It is the sum of the **twist** $Tw$ (turns of the helix about its own axis) and the **writhe** $Wr$ (coiling of the axis itself in space):
$$
Lk = Tw + Wr .
$$
A relaxed molecule of $N$ base pairs with $h$ base pairs per turn has $Lk_0 = N/h$. The **superhelical density** is $\sigma = (Lk - Lk_0)/Lk_0$; DNA isolated from most cells is **negatively supercoiled**, with $\sigma \approx -0.06$. **Topoisomerases** change $Lk$: type I enzymes in steps of 1 by cutting one strand, type II in steps of 2 by passing a duplex through a transient double-strand break (the second with ATP hydrolysis).
:::

Negative supercoiling stores free energy that makes it easier to separate the strands locally — the first step of both replication and transcription.

::: example Supercoiling of a plasmid {#ex-supercoil}
A circular plasmid of $5250$ base pairs is isolated with $\sigma = -0.060$. Taking $10.5$ base pairs per turn, find $Lk_0$, $Lk$ and the change $\Delta Lk$. If all of the deficit were absorbed by unwinding the helix rather than by writhe, how many base pairs could be left unpaired?
::: solution
$Lk_0 = 5250/10.5 = 500.0$. Then $\Delta Lk = \sigma\,Lk_0 = -0.060 \times 500 = -30$, so $Lk = 470$. A deficit of 30 turns, if taken entirely as reduced twist, corresponds to unwinding $30 \times 10.5 = 315$ base pairs — about $6\ \%$ of the plasmid. In reality most of the deficit appears as writhe (the interwound "twisted rubber band" shape seen in electron micrographs), but the stored strain is what lets an RNA polymerase or a replication origin open a bubble with little extra free energy.
:::
:::

## Melting and annealing

Heat a solution of double-stranded DNA and, over a narrow temperature range, the absorbance at $260\ \mathrm{nm}$ rises by about a third ([[#ex-a260]]): the strands have separated. Cool it slowly and they find their partners again (**annealing**). The midpoint of the transition is the **melting temperature** $T_\mathrm{m}$. For long natural DNA, $T_\mathrm{m}$ depends on GC content and salt; Marmur and Doty (1962) found the empirical relation $T_\mathrm{m} = 69.3 + 0.41\,(\%\mathrm{GC})\ \mathrm{^\circ C}$ in standard saline citrate ($0.15\ \mathrm{mol\,dm^{-3}}$ NaCl, $0.015\ \mathrm{mol\,dm^{-3}}$ sodium citrate). For a short duplex — the primers and probes of molecular biology — a simple two-state model makes the transition quantitative and shows why concentration matters.

::: proposition Two-state melting of a short duplex {#prop-melting}
Let two complementary, non-self-complementary strands A and B, each at total concentration $c$ (so total strand concentration $C_\mathrm{T} = 2c$), form a duplex in a single all-or-none step $\mathrm{A + B \rightleftharpoons AB}$ with standard enthalpy and entropy $\Delta H^\circ$ and $\Delta S^\circ$ (both negative, independent of temperature). If $\theta$ is the fraction of strands in duplex, then
$$
\frac{\theta}{(1-\theta)^2} = K c, \qquad K = \exp\!\left(-\frac{\Delta H^\circ - T\Delta S^\circ}{RT}\right),
$$ {#eq-theta}
and the melting temperature, where $\theta = \tfrac12$, is
$$
T_\mathrm{m} = \frac{\Delta H^\circ}{\Delta S^\circ + R\ln(C_\mathrm{T}/4)} .
$$ {#eq-tm}
Concentrations are in $\mathrm{mol\,dm^{-3}}$ relative to the standard $1\ \mathrm{mol\,dm^{-3}}$. The conditions are those of the model: no partially paired intermediates, ideal dilute solution, and $\Delta C_p \approx 0$ over the transition.
:::

::: proof Mass action for a bimolecular equilibrium
At fraction $\theta$, $[\mathrm{AB}] = \theta c$ and $[\mathrm{A}] = [\mathrm{B}] = (1-\theta)c$, so
$$
K = \frac{[\mathrm{AB}]}{[\mathrm{A}][\mathrm{B}]} = \frac{\theta c}{(1-\theta)^2c^2} = \frac{\theta}{(1-\theta)^2 c},
$$
which rearranges to [[#eq-theta]], and $K = \exp(-\Delta G^\circ/RT)$ with $\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ$ ([[thermodynamics/reaction-equilibrium]]). At $\theta = \tfrac12$ the left-hand side equals $0.5/0.25 = 2$, so $K(T_\mathrm{m}) = 2/c = 4/C_\mathrm{T}$. Taking logarithms,
$$
-\frac{\Delta H^\circ}{RT_\mathrm{m}} + \frac{\Delta S^\circ}{R} = \ln\frac{4}{C_\mathrm{T}} \quad\Longrightarrow\quad \Delta H^\circ = T_\mathrm{m}\left(\Delta S^\circ + R\ln\frac{C_\mathrm{T}}{4}\right),
$$
which is [[#eq-tm]]. Explicitly solving the quadratic $Kc\,\theta^2 - (2Kc + 1)\theta + Kc = 0$ for the root between 0 and 1 gives $\theta = 2Kc/\bigl(2Kc + 1 + \sqrt{4Kc + 1}\bigr)$, the form plotted in the figure. Because the reaction is bimolecular, $K$ multiplies a concentration: raising $C_\mathrm{T}$ shifts the equilibrium towards duplex and raises $T_\mathrm{m}$. For a unimolecular transition (a hairpin, or effectively a long genomic duplex whose strands cannot diffuse apart) $T_\mathrm{m} = \Delta H^\circ/\Delta S^\circ$, independent of concentration.
:::

::: example The melting temperature of a primer duplex {#ex-tm}
A 12-base-pair duplex in $1\ \mathrm{mol\,dm^{-3}}$ NaCl has $\Delta H^\circ = -380\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S^\circ = -1070\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for $\mathrm{A + B \rightarrow AB}$, values of the size given by nearest-neighbour tables. (a) Find $T_\mathrm{m}$ at $C_\mathrm{T} = 2.0\ \mu\mathrm{mol\,dm^{-3}}$. (b) Find $T_\mathrm{m}$ at $C_\mathrm{T} = 200\ \mu\mathrm{mol\,dm^{-3}}$. (c) Find $\Delta G^\circ$ and $K$ at $37\ \mathrm{^\circ C}$.
::: solution
(a) $R\ln(C_\mathrm{T}/4) = 8.314 \times \ln(5.0\times10^{-7}) = 8.314 \times (-14.509) = -120.6\ \mathrm{J\,K^{-1}\,mol^{-1}}$, so
$$
T_\mathrm{m} = \frac{-380\,000\ \mathrm{J\,mol^{-1}}}{(-1070 - 120.6)\ \mathrm{J\,K^{-1}\,mol^{-1}}} = 319.2\ \mathrm{K} = 46.0\ \mathrm{^\circ C}.
$$
(b) A hundredfold increase in concentration adds $R\ln 100 = 38.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$ to the denominator's logarithmic term: $8.314 \ln(5.0\times10^{-5}) = -82.3$, so $T_\mathrm{m} = 380\,000/1152.3 = 329.8\ \mathrm{K} = 56.6\ \mathrm{^\circ C}$. Ten degrees from concentration alone: this is why oligonucleotide melting temperatures are always quoted with the strand concentration.

(c) $\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ = -380.0 - (310.15)(-1.070) = -48.1\ \mathrm{kJ\,mol^{-1}}$, so $K = \exp(48\,140/(8.314 \times 310.15)) = 1.3\times10^{8}$. A duplex with a binding constant of $10^{8}$ is still almost half dissociated at $46\ \mathrm{^\circ C}$ when the strands are micromolar: what matters is $Kc$, not $K$.
:::
:::

The figure plots [[#eq-theta]] for both concentrations. The transition is sharp because $\Delta H^\circ$ is large: a few degrees take the duplex from mostly formed to mostly melted, which is what makes melting a useful diagnostic and the polymerase chain reaction (PCR) workable.

::: widget plot
f: 2*(exp(-(h*1000-(x+273.15)*s)/(8.314*(x+273.15)))*10^c/2)/(2*(exp(-(h*1000-(x+273.15)*s)/(8.314*(x+273.15)))*10^c/2)+1+sqrt(4*(exp(-(h*1000-(x+273.15)*s)/(8.314*(x+273.15)))*10^c/2)+1)); 2*(exp(-(h*1000-(x+273.15)*s)/(8.314*(x+273.15)))*10^(c+2)/2)/(2*(exp(-(h*1000-(x+273.15)*s)/(8.314*(x+273.15)))*10^(c+2)/2)+1+sqrt(4*(exp(-(h*1000-(x+273.15)*s)/(8.314*(x+273.15)))*10^(c+2)/2)+1))
x: 0, 100
y: 0, 1.05
sliders: h=-380:-600:-150:10; s=-1070:-1700:-400:10; c=-5.7:-8:-3:0.1
labels: \theta\ (C_\mathrm{T}); \theta\ (100\,C_\mathrm{T})
hlines: 0.5
caption: Fraction of strands in duplex, $\theta$, against temperature $x$ (in °C) for the two-state model of [[#prop-melting]], with $\Delta H^\circ = h$ (in $\mathrm{kJ\,mol^{-1}}$), $\Delta S^\circ = s$ (in $\mathrm{J\,K^{-1}\,mol^{-1}}$) and total strand concentration $C_\mathrm{T} = 10^{c}\ \mathrm{mol\,dm^{-3}}$; the second curve is for a hundredfold higher concentration. The defaults are those of [[#ex-tm]]: the curves cross $\theta = \tfrac12$ at $46.0$ and $56.6\ \mathrm{^\circ C}$. Making $\Delta H^\circ$ more negative at fixed $T_\mathrm{m}$ sharpens the transition; making $\Delta S^\circ$ less negative (a more favourable duplex) moves it to higher temperature.
:::

::: quiz
Which changes raise the melting temperature of a 20-base-pair DNA duplex? (Select all that apply.)
- [x] Increasing the NaCl concentration of the buffer
- [x] Replacing several A·T pairs by G·C pairs
- [ ] Lowering the concentration of the two strands tenfold
- [ ] Adding formamide or urea to the solution
::: solution
Salt screens the repulsion between the two polyanionic backbones, stabilising the duplex. G·C-containing stacks have more favourable nearest-neighbour free energies. For a bimolecular duplex, lowering $C_\mathrm{T}$ makes $R\ln(C_\mathrm{T}/4)$ more negative and so *lowers* $T_\mathrm{m}$ by [[#eq-tm]]. Formamide and urea are denaturants: they hydrogen-bond to the bases and weaken stacking, lowering $T_\mathrm{m}$ (a standard way to run hybridisations at lower temperature).
:::
:::

## Replication: copying the sequence

Complementarity immediately suggests how DNA is copied, as Watson and Crick remarked in 1953: separate the strands and let each template the synthesis of a new partner. Matthew Meselson and Franklin Stahl confirmed in 1958, by growing bacteria on $^{15}\mathrm{N}$ and then $^{14}\mathrm{N}$ and separating the DNA by density, that replication is **semiconservative**: each daughter duplex contains one old and one new strand.

### The polymerase reaction

The chemistry of every DNA and RNA polymerase is the same. The incoming nucleotide is a **5′-triphosphate** (dATP, dGTP, dCTP, dTTP for DNA); the growing chain ends in a free **3′-OH** paired to the template. The 3′-oxygen attacks the **α-phosphorus** of the triphosphate, the bond to the β-phosphate breaks, and inorganic **pyrophosphate** ($\mathrm{PP_i}$) leaves:
$$
(\mathrm{dNMP})_n + \mathrm{dNTP} \rightarrow (\mathrm{dNMP})_{n+1} + \mathrm{PP_i} .
$$
The mechanism, revealed by crystal structures of polymerases caught in the act, uses **two metal ions**, usually $\mathrm{Mg^{2+}}$, bound by conserved aspartate carboxylates. Metal ion A coordinates the 3′-oxygen and lowers the $\mathrm{p}K_\mathrm{a}$ of its hydroxyl so that it can attack as an alkoxide-like nucleophile; metal ion B coordinates the β- and γ-phosphates, neutralising the negative charge that builds up on the leaving pyrophosphate; both bridge the α-phosphate and stabilise the pentacoordinate transition state. The attack is in-line, and experiments with chiral phosphorothioates show inversion of configuration at phosphorus — the signature of a single $\mathrm{S_N2}$-type displacement at P.

Two consequences follow from the chemistry. First, chains grow only in the **5′→3′ direction**, because the energy for each new bond is carried by the incoming nucleotide's triphosphate, not by the chain. Second, a polymerase cannot start a chain: it needs a 3′-OH to extend, which in cells is provided by a short RNA **primer** made by primase.

::: example Pulling polymerisation forward with pyrophosphatase {#ex-pyrophosphate}
Cells contain inorganic pyrophosphatase, which hydrolyses $\mathrm{PP_i + H_2O \rightarrow 2\,P_i}$ with $\Delta G^{\circ\prime} = -19.2\ \mathrm{kJ\,mol^{-1}}$ (Nelson & Cox, 8th ed.). By what factor does coupling this hydrolysis to nucleotide addition multiply the overall equilibrium constant at $37\ \mathrm{^\circ C}$?
::: solution
When two reactions are coupled, their standard Gibbs energies add and their equilibrium constants multiply ([[biochemistry/bioenergetics#prop-coupling]]). The extra factor is
$$
\exp\!\left(\frac{19\,200\ \mathrm{J\,mol^{-1}}}{(8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(310.15\ \mathrm{K})}\right) = e^{7.446} = 1.7\times10^{3}.
$$
Nucleotide addition on its own is only modestly favourable, because a phosphoanhydride bond is exchanged for a phosphodiester bond of similar free energy, and it would be reversed by accumulating $\mathrm{PP_i}$ (polymerases do catalyse pyrophosphorolysis in vitro). Destroying the pyrophosphate makes each step effectively irreversible, at the cost of two phosphoanhydride bonds per nucleotide. The same device drives RNA synthesis and the activation of amino acids for translation.
:::
:::

### Leading and lagging strands

Because the two template strands are antiparallel and every polymerase works 5′→3′, the two new strands at a replication fork are made differently. The **leading strand** is synthesised continuously in the direction the fork moves. The **lagging strand** is made in short pieces in the opposite direction — **Okazaki fragments**, about 1000–2000 nucleotides in bacteria and 100–200 in eukaryotes — each started by its own RNA primer. The primers are later removed and replaced by DNA, and **DNA ligase** seals each remaining nick, forming the last phosphodiester bond with energy from ATP (in eukaryotes and many viruses) or NAD⁺ (in bacteria), via an adenylylated enzyme and an AMP–DNA intermediate. Ahead of the fork, a **helicase** separates the strands using ATP, single-strand binding proteins keep them apart, and topoisomerases relieve the positive supercoils that the advancing fork would otherwise pile up ([[#def-linking]]).

::: example How long does it take to copy a bacterial chromosome? {#ex-replication-time}
The *E. coli* chromosome ($4.64\times10^{6}$ base pairs, circular) is replicated from a single origin by two forks moving in opposite directions, each at about $1000$ nucleotides per second at $37\ \mathrm{^\circ C}$. Estimate the replication time. How can *E. coli* divide every 20 minutes in rich medium?
::: solution
Each fork copies half the chromosome: $t = (4.64\times10^{6}/2)/(1000\ \mathrm{s^{-1}}) = 2320\ \mathrm{s} \approx 39\ \mathrm{min}$, in line with the measured 40 minutes. Faster division is possible because new rounds of replication start at the origin before the previous round has finished, so a fast-growing cell contains chromosomes with several sets of forks at once. A human chromosome, by contrast, is replicated from tens of thousands of origins in total, with forks moving at only a few tens of nucleotides per second.
:::
:::

### Fidelity

A polymerase choosing among four nucleotides makes a wrong choice roughly once in $10^{4}$–$10^{5}$ additions. Base pairing alone would do worse: the free-energy difference between a correct and an incorrect pair in solution accounts for an error rate nearer $10^{-2}$. The rest comes from **geometric selection** — the active site closes around the nascent pair and checks its shape, so only Watson–Crick pairs fit — and from **kinetic proofreading** steps. Many replicative polymerases also have a **3′→5′ exonuclease** that removes a mispaired nucleotide from the end of the chain before extension (improving fidelity about 100-fold), and **mismatch repair** after replication corrects most of the remainder (another 100- to 1000-fold). The overall error rate in *E. coli* is about $10^{-10}$ per base pair per replication. For a human cell copying $6.2\times10^{9}$ base pairs, that is about $0.6$ new errors per division — small, but not zero, and the raw material of both evolution and cancer.

## Transcription: from DNA to RNA

**Transcription** copies one strand of a gene into RNA. RNA polymerase uses ribonucleoside 5′-triphosphates (ATP, GTP, CTP, UTP) and the same two-metal-ion chemistry as DNA polymerase, but it needs no primer: it opens a bubble of about 14 base pairs at a **promoter** sequence and starts a chain de novo. It reads the **template strand** 3′→5′ and so synthesises RNA 5′→3′; the RNA therefore has the same sequence as the other DNA strand, the **coding strand**, with U in place of T. Bacteria have a single RNA polymerase whose σ factor recognises promoters; eukaryotes have three nuclear RNA polymerases, of which RNA polymerase II makes messenger RNA. RNA polymerases have only limited proofreading (they can backtrack and cleave a misincorporated nucleotide), and their error rate, around $10^{-5}$, is tolerable because RNA molecules are short-lived copies.

::: warning Template strand and coding strand {#warn-strands}
The RNA transcript is **complementary to the template strand** and **identical in sequence (with U for T) to the coding strand**. Two errors are common: writing the transcript as the complement of the coding strand, and forgetting that complementary sequences are antiparallel, so that the complement of 5′-ATGC-3′ must be written 5′-GCAT-3′, not 5′-TACG-3′. Always write both ends explicitly until the habit is automatic.
:::

In eukaryotes the primary transcript is processed before it leaves the nucleus. A 7-methylguanosine **cap** is attached to the 5′ end through an unusual 5′–5′ triphosphate linkage; a **poly(A) tail** of about 200 adenylates is added to the 3′ end; and **introns** are removed by **splicing**. Splicing is pure phosphoryl-transfer chemistry. In the first step the 2′-OH of a specific adenosine in the intron (the branch point) attacks the phosphate at the 5′ splice site, releasing the upstream exon with a free 3′-OH and forming a looped **lariat**. In the second step that 3′-OH attacks the phosphate at the 3′ splice site, joining the two exons and releasing the lariat. Both steps are **transesterifications**: the number of phosphodiester bonds is unchanged, so the chemistry itself needs no energy input (the spliceosome uses ATP for its conformational rearrangements). In some self-splicing introns the RNA alone catalyses these reactions — the discovery of **ribozymes**, catalytic RNAs.

## Translation: from RNA to protein

### The genetic code

Four bases must specify twenty amino acids. Pairs of bases give only $4^2 = 16$ combinations, too few; triplets give $4^3 = 64$, enough with room to spare.

::: definition The genetic code {#def-code}
The **genetic code** is the correspondence between the 64 **codons** — consecutive triplets of bases in messenger RNA — and the amino acids. It has these properties:
- **triplet and non-overlapping**: an mRNA is read in consecutive codons from a fixed start, 5′→3′, without gaps or punctuation, so it has three possible **reading frames** and the start codon chooses one;
- **degenerate**: 61 **sense codons** encode the 20 amino acids, so most amino acids have several synonymous codons, which usually differ in the third base;
- **start and stop signals**: AUG codes for methionine and also serves as the usual **start codon**; UAA, UAG and UGA are **stop codons**, read by release factors rather than tRNAs;
- **nearly universal**: the same assignments hold in bacteria, archaea and eukaryotes, with a few exceptions (in vertebrate mitochondria, for example, UGA codes for tryptophan).
:::

Codons are read by **transfer RNAs** (tRNAs), adaptor molecules about 76 nucleotides long folded into an L shape, which carry an amino acid at their 3′ end and an **anticodon** at the other end that pairs antiparallel with the codon. Crick's **wobble hypothesis** (1966) explains why fewer than 61 tRNAs suffice: the first base of the anticodon (pairing with the third base of the codon) can form non-standard pairs, G with U, and inosine (I) with U, C or A.

### Charging the tRNA

The link between the code and the chemistry is made by the **aminoacyl-tRNA synthetases**, one for each amino acid. Each activates its amino acid in two steps:
$$
\begin{aligned}
\text{amino acid} + \mathrm{ATP} &\rightarrow \text{aminoacyl-AMP} + \mathrm{PP_i},\\
\text{aminoacyl-AMP} + \mathrm{tRNA} &\rightarrow \text{aminoacyl-tRNA} + \mathrm{AMP}.
\end{aligned}
$$
In the first step the carboxylate attacks the α-phosphorus of ATP, forming a mixed carboxylic–phosphoric anhydride, an activated acyl derivative ([[organic-2/carboxylic-derivatives]]). In the second the 2′- or 3′-hydroxyl of the terminal adenosine of the tRNA attacks this acyl group, giving an **ester**. Pyrophosphate hydrolysis again makes the process irreversible, so charging one tRNA costs two phosphoanhydride bonds. Accuracy is enforced by double sieving: the active site rejects amino acids larger than the correct one, and a separate **editing site** hydrolyses any smaller, mischarged amino acid (isoleucyl-tRNA synthetase hydrolyses valyl-$\mathrm{tRNA^{Ile}}$, for example). The error rate is about one in $10^{4}$.

### The ribosome and the peptide bond

The **ribosome** (70S in bacteria, 80S in eukaryotes) is a ribonucleoprotein machine of two subunits. The small subunit binds the mRNA and checks codon–anticodon pairing; the large subunit forms the peptide bond. It has three tRNA sites: A (aminoacyl), P (peptidyl) and E (exit). In each elongation cycle:

1. an aminoacyl-tRNA, delivered as a complex with the GTP-binding elongation factor EF-Tu (EF1A in eukaryotes), enters the A site; correct codon–anticodon pairing triggers GTP hydrolysis and release of the factor;
2. **peptidyl transfer**: the free α-amino group of the A-site aminoacyl-tRNA attacks the carbonyl carbon of the ester linking the growing peptide to the P-site tRNA; a tetrahedral intermediate collapses, the 3′-oxygen of the P-site tRNA leaves, and the peptide, now one residue longer, is attached to the A-site tRNA;
3. **translocation**, driven by GTP hydrolysis on elongation factor EF-G (EF2), moves the tRNAs to the P and E sites and the mRNA by one codon.

Step 2 is an aminolysis of an ester — thermodynamically downhill, since an amide is more stable than an ester — and it is catalysed not by protein but by the **ribosomal RNA**: the atomic structures of the large subunit (2000) showed no protein side chain within reach of the active site. The rate enhancement, about $10^{7}$, comes largely from positioning the two substrates and organising water, an entropic effect. The peptide bond formed is the planar amide of [[biochemistry/amino-acids-proteins#def-peptide]]. Bacterial ribosomes add about 15–20 amino acids per second; a stop codon in the A site binds a release factor that triggers hydrolysis of the peptidyl–tRNA ester, releasing the finished chain.

::: example Decoding a message {#ex-decode}
An mRNA has the sequence 5′-GCCAUGGCUUGGAAAUAGCU-3′. (a) Find the peptide encoded, starting at the first AUG. (b) Write the coding and template strands of the DNA for the region from AUG to the stop codon. (c) Count the phosphoanhydride bonds consumed to make this peptide, counting two for charging each tRNA and two GTPs for each elongation cycle, and ignoring initiation and termination.
::: solution
(a) Reading from the first AUG in triplets: AUG GCU UGG AAA UAG. With the standard code these are Met, Ala, Trp, Lys and stop, so the peptide is **Met-Ala-Trp-Lys**. (The bases GCC before the start and CU after the stop are untranslated.)

(b) The coding strand has the mRNA sequence with T for U: 5′-ATGGCTTGGAAATAG-3′. The template strand is its antiparallel complement, written 5′→3′ by reversing and complementing: 5′-CTATTTCCAAGCCAT-3′.

(c) Four tRNAs are charged ($4 \times 2 = 8$ bonds) and three peptide bonds are made, each needing one GTP for EF-Tu and one for EF-G ($3 \times 2 = 6$): $14$ in all, before initiation and termination. In general a protein of $n$ residues costs about $2n + 2(n-1) = 4n - 2$ — about four phosphoanhydride bonds per peptide bond, and over $120\ \mathrm{kJ\,mol^{-1}}$ of free energy (at $-30.5\ \mathrm{kJ\,mol^{-1}}$ each) to make a bond whose hydrolysis free energy is only of the order of $-10\ \mathrm{kJ\,mol^{-1}}$. The excess buys speed and accuracy, not thermodynamic feasibility.
:::
:::

The accuracy of translation, about one error in $10^{4}$ codons, sets a limit on protein length: the probability that every residue of an $L$-residue protein is correct is $(1-\varepsilon)^{L} \approx e^{-\varepsilon L}$. The figure shows why a cell can afford proteins of a few hundred residues but needs high fidelity to make the largest ones.

::: widget plot
f: (1-10^(-q))^x; (1-10^(-q-1))^x
x: 0, 3000
y: 0, 1
sliders: q=4:2:6:0.1
labels: \varepsilon = 10^{-q}; \varepsilon = 10^{-(q+1)}
hlines: 0.5
caption: Fraction of protein molecules of length $x$ residues containing no translation error, $(1-\varepsilon)^{x}$, for an error rate per codon $\varepsilon = 10^{-q}$ (slider) and for a tenfold more accurate process. At $\varepsilon = 10^{-4}$, $95\ \%$ of 500-residue chains are error-free but only $74\ \%$ of 3000-residue chains; at $10^{-3}$, fewer than two thirds of 500-residue chains would be correct. The same arithmetic applied to replication, with $\varepsilon \approx 10^{-10}$ over $10^{6}$–$10^{10}$ base pairs, explains the elaborate proofreading of DNA polymerases.
:::

## Where this leads

The chemistry of nucleotides reaches far beyond information. ATP, NAD⁺, FAD and coenzyme A are nucleotides, and the phosphoryl-transfer reactions of this chapter are the reactions of energy metabolism in [[biochemistry/bioenergetics]] and [[biochemistry/glycolysis-citric-acid]]. The peptide bonds that ribosomes make fold into the structures of [[biochemistry/amino-acids-proteins]], and the RNA catalysis of splicing and peptidyl transfer is a reminder that the enzymes of [[biochemistry/enzymes]] need not be proteins. The duplex-melting thermodynamics of [[#prop-melting]] is the basis of PCR, DNA sequencing and hybridisation probes, and the binding of drugs to DNA and to bacterial ribosomes — many antibiotics act on the peptidyl-transferase centre or the decoding site — is taken up in [[medicinal-chemistry/drug-targets]] and [[medicinal-chemistry/biologics]], where nucleic acids themselves become medicines.

::: history
Friedrich Miescher isolated a phosphorus-rich substance he called "nuclein" from the nuclei of white blood cells in 1869. Albrecht Kossel identified its bases between the 1880s and the early 1900s (Nobel Prize in Physiology or Medicine, 1910), and Phoebus Levene identified ribose (1909) and deoxyribose (1929) and showed how nucleotides are built. In 1944 Oswald Avery, Colin MacLeod and Maclyn McCarty showed that the substance transforming pneumococci was DNA; Alfred Hershey and Martha Chase's experiment with labelled bacteriophage (1952) pointed the same way. Erwin Chargaff published his base ratios in 1950. Rosalind Franklin and Raymond Gosling's diffraction photograph of B-DNA ("photograph 51", 1952) and Chargaff's rules underpinned the double helix of James Watson and Francis Crick (1953); Watson, Crick and Maurice Wilkins received the 1962 Nobel Prize in Physiology or Medicine, Franklin having died in 1958. Arthur Kornberg isolated DNA polymerase I in 1956, Meselson and Stahl demonstrated semiconservative replication in 1958, and Reiji and Tsuneko Okazaki described the discontinuous synthesis of the lagging strand in 1968. Marshall Nirenberg and Heinrich Matthaei read the first codon in 1961, and the code was complete by 1966. Thomas Cech (1982) and Sidney Altman (1983) discovered catalytic RNA (Nobel Prize in Chemistry, 1989), and the atomic structures of ribosomal subunits published in 2000 by the groups of Venkatraman Ramakrishnan, Thomas Steitz and Ada Yonath, which showed the ribosome to be a ribozyme, earned the 2009 Nobel Prize in Chemistry.
:::

::: summary
- Nucleotides are base + sugar + phosphate; nucleic acids are 3′,5′-phosphodiester polymers with a 5′→3′ direction and one negative charge per residue. The missing 2′-OH makes DNA far more resistant to hydrolysis than RNA.
- Double-stranded DNA obeys Chargaff's rules ($x_\mathrm{A} = x_\mathrm{T}$, $x_\mathrm{G} = x_\mathrm{C}$) because its antiparallel strands are complementary; B-DNA is a right-handed helix with $0.34\ \mathrm{nm}$ rise and about 10.5 base pairs per turn.
- Duplex stability comes mainly from base stacking (the nearest-neighbour model), opposed by phosphate repulsion (screened by salt) and conformational entropy; hydrogen bonds supply specificity more than stability.
- Closed DNA has a fixed linking number $Lk = Tw + Wr$; cellular DNA is negatively supercoiled ($\sigma \approx -0.06$), and topoisomerases change $Lk$.
- For a bimolecular duplex, $T_\mathrm{m} = \Delta H^\circ/[\Delta S^\circ + R\ln(C_\mathrm{T}/4)]$: melting temperature rises with strand concentration, salt and GC content.
- All polymerases add a nucleoside 5′-triphosphate to a 3′-OH by in-line attack on the α-phosphate with two metal ions, releasing pyrophosphate; chains therefore grow 5′→3′, and pyrophosphate hydrolysis makes each step irreversible.
- Replication is semiconservative, continuous on the leading and discontinuous (Okazaki fragments) on the lagging strand; selection, proofreading and mismatch repair give about $10^{-10}$ errors per base pair.
- The triplet, degenerate, nearly universal genetic code is read by tRNAs charged by aminoacyl-tRNA synthetases; the ribosomal RNA catalyses peptide-bond formation by aminolysis of an ester, at a cost of about four phosphoanhydride bonds per residue.
:::

## Exercises

::: exercise Chargaff's rules {level=1 check="20"}
A sample of double-stranded DNA contains $30.0\ \%$ guanine (mole percent of bases). What percentage of its bases are adenine? (Enter the percentage.)
::: solution
By Chargaff's rules $x_\mathrm{C} = x_\mathrm{G} = 30.0\ \%$, so G + C $= 60.0\ \%$ and A + T $= 40.0\ \%$, shared equally: $x_\mathrm{A} = x_\mathrm{T} = 20.0\ \%$. The GC content of this DNA is $60\ \%$.
:::
:::

::: exercise DNA concentration from absorbance {level=1 check="32.5"}
A solution of double-stranded DNA in a $1.00\ \mathrm{cm}$ cell has $A_{260} = 0.650$. Using the conversion $A_{260} = 1.00 \leftrightarrow 50\ \mu\mathrm{g\,cm^{-3}}$, find its concentration. (Enter the concentration in $\mu\mathrm{g\,cm^{-3}}$.)
::: solution
$c = 0.650 \times 50\ \mu\mathrm{g\,cm^{-3}} = 32.5\ \mu\mathrm{g\,cm^{-3}}$. With $650\ \mathrm{g\,mol^{-1}}$ per base pair this is $5.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ of base pairs. The conversion holds only for double-stranded DNA; if the sample were partly melted the absorbance would be higher and the estimate too large.
:::
:::

::: exercise Complements and transcripts {level=1}
(a) Write the complementary strand of 5′-GATTACA-3′, 5′ end first. (b) If 5′-GATTACA-3′ is the template strand of a short gene, what is the sequence of the RNA transcript? (c) If instead it is the coding strand, what is the transcript?
::: solution
(a) Complement each base (G→C, A→T, T→A, C→G) to get 3′-CTAATGT-5′, then reverse to write it 5′→3′: **5′-TGTAATC-3′**. (b) The transcript is complementary to the template, with U for T: **5′-UGUAAUC-3′**. (c) The transcript has the same sequence as the coding strand, with U for T: **5′-GAUUACA-3′**. Writing both ends of every sequence avoids the classic error of producing the complement in the wrong orientation.
:::
:::

::: exercise Melting temperature of a probe {level=2 check="33.3"}
Two complementary (non-self-complementary) oligonucleotides form a duplex with $\Delta H^\circ = -290\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S^\circ = -820\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Use the two-state model to find the melting temperature when the total strand concentration is $1.0\ \mu\mathrm{mol\,dm^{-3}}$. (Enter $T_\mathrm{m}$ in °C to one decimal place.)
::: solution
By [[#eq-tm]], $R\ln(C_\mathrm{T}/4) = 8.314 \ln(2.5\times10^{-7}) = 8.314 \times (-15.202) = -126.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Then
$$
T_\mathrm{m} = \frac{-290\,000}{-820 - 126.4}\ \mathrm{K} = \frac{290\,000}{946.4}\ \mathrm{K} = 306.4\ \mathrm{K} = 33.3\ \mathrm{^\circ C}.
$$
Without the concentration term the "melting temperature" $\Delta H^\circ/\Delta S^\circ = 353.7\ \mathrm{K}$ would be some $47\ \mathrm{K}$ too high: for a bimolecular duplex the dilution entropy is a large part of the story.
:::
:::

::: exercise Replication of a bacterial chromosome {level=2 check="49.0"}
A bacterium has a single circular chromosome of $5.0\times10^{6}$ base pairs, replicated bidirectionally from one origin with each fork moving at $850$ nucleotides per second. How long does one round of replication take? (Enter the time in minutes to three significant figures.)
::: solution
Each of the two forks copies $2.5\times10^{6}$ base pairs: $t = 2.5\times10^{6}/850\ \mathrm{s} = 2941\ \mathrm{s} = 49.0\ \mathrm{min}$. If the cell divides faster than this, it must start new rounds at the origin before the old ones finish (multifork replication).
:::
:::

::: exercise Superhelical density {level=2 check="-0.05"}
A closed circular DNA of $4200$ base pairs has linking number $Lk = 380$. Taking $10.5$ base pairs per turn for relaxed B-DNA, calculate the superhelical density $\sigma$. Is the molecule positively or negatively supercoiled, and how many topoisomerase I reactions would relax it? (Enter $\sigma$.)
::: solution
$Lk_0 = 4200/10.5 = 400$, so $\sigma = (380 - 400)/400 = -0.050$. The molecule is **negatively** supercoiled (underwound), as cellular DNA usually is. Type I topoisomerase changes $Lk$ in steps of one, so 20 strand-passage events would relax it (type II, in steps of two, would need 10).
:::
:::

::: exercise GC content from a melting temperature {level=2 check="50.5"}
Genomic DNA from a bacterium melts at $90.0\ \mathrm{^\circ C}$ in standard saline citrate. Use the Marmur–Doty relation to estimate its GC content, and say why this relation, unlike [[#eq-tm]], contains no strand concentration. (Enter the GC content in percent to one decimal place.)
::: solution
$\%\mathrm{GC} = (90.0 - 69.3)/0.41 = 50.5\ \%$ — close to that of *E. coli* (about $50.8\ \%$). The relation contains no concentration because a long genomic duplex melts in many independent regions while the strands remain held together elsewhere: each local melting is effectively unimolecular, with $T_\mathrm{m} = \Delta H^\circ/\Delta S^\circ$ per region. It is an empirical fit for one buffer and must not be applied in other salt concentrations without correction.
:::
:::

::: exercise Self-complementary duplexes {level=3 check="37.1"}
A **self-complementary** strand (such as 5′-CGCGAATTCGCG-3′) forms a duplex with a copy of itself, $2\,\mathrm{A} \rightleftharpoons \mathrm{A_2}$. (a) With total strand concentration $C_\mathrm{T}$ and fraction $\theta$ of strands in duplex, show that $T_\mathrm{m} = \Delta H^\circ/(\Delta S^\circ + R\ln C_\mathrm{T})$. (b) For $\Delta H^\circ = -290\ \mathrm{kJ\,mol^{-1}}$, $\Delta S^\circ = -820\ \mathrm{J\,K^{-1}\,mol^{-1}}$ and $C_\mathrm{T} = 1.0\ \mu\mathrm{mol\,dm^{-3}}$, find $T_\mathrm{m}$ and compare with the non-self-complementary result of the earlier exercise. (Enter $T_\mathrm{m}$ in °C to one decimal place.)
::: hint
A duplex contains two strands, so $[\mathrm{A_2}] = \theta C_\mathrm{T}/2$ and $[\mathrm{A}] = (1-\theta)C_\mathrm{T}$. Write $K$ and set $\theta = \tfrac12$.
:::
::: solution
(a) $K = [\mathrm{A_2}]/[\mathrm{A}]^2 = (\theta C_\mathrm{T}/2)/[(1-\theta)^2 C_\mathrm{T}^2] = \theta/[2(1-\theta)^2 C_\mathrm{T}]$. At $\theta = \tfrac12$ this is $0.5/(2 \times 0.25\,C_\mathrm{T}) = 1/C_\mathrm{T}$. Then $-\Delta H^\circ/RT_\mathrm{m} + \Delta S^\circ/R = -\ln C_\mathrm{T}$, so $\Delta H^\circ = T_\mathrm{m}(\Delta S^\circ + R\ln C_\mathrm{T})$, the required result.

(b) $R\ln(1.0\times10^{-6}) = -114.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$; $T_\mathrm{m} = 290\,000/934.9\ \mathrm{K} = 310.2\ \mathrm{K} = 37.1\ \mathrm{^\circ C}$. That is $3.8\ \mathrm{K}$ higher than the $33.3\ \mathrm{^\circ C}$ for two different strands at the same total concentration: in the self-complementary case every strand is a potential partner, so the effective concentration term is four times larger ($C_\mathrm{T}$ instead of $C_\mathrm{T}/4$). In practice self-complementary sequences also carry a small symmetry correction to $\Delta S^\circ$ in nearest-neighbour tables, for the same counting reason.
:::
:::

::: exercise The cost and accuracy of a protein {level=3 check="0.951"}
A cell makes a protein of $500$ residues. (a) Using about four phosphoanhydride bonds per residue ($4n - 2$, as in [[#ex-decode]]) and $\Delta G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$ per bond, estimate the standard free energy spent per mole of protein. (b) If each codon is misread independently with probability $1.0\times10^{-4}$, what fraction of the molecules contain no error? (c) Translation could be made more accurate by more proofreading. Explain, in terms of the cost per residue, why cells do not push the error rate down to that of DNA replication. (Enter the error-free fraction for part (b) to three significant figures.)
::: hint
For (b) each residue is correct with probability $1 - \varepsilon$, independently, so all $500$ are correct with probability $(1-\varepsilon)^{500}$.
:::
::: solution
(a) $4 \times 500 - 2 = 1998$ phosphoanhydride bonds; $1998 \times 30.5\ \mathrm{kJ\,mol^{-1}} = 6.09\times10^{4}\ \mathrm{kJ\,mol^{-1}} \approx 61\ \mathrm{MJ}$ per mole of protein (more under cellular conditions, where ATP hydrolysis is more exergonic than its standard value).

(b) $(1 - 1.0\times10^{-4})^{500} = e^{500\ln(0.9999)} = 0.951$: about $95\ \%$ of molecules are perfect, and most of the rest contain a single conservative substitution that is often harmless.

(c) Each proofreading step that rejects incorrect aminoacyl-tRNAs also rejects some correct ones and consumes GTP, so higher accuracy costs both energy and speed. A protein is a disposable product: an occasional faulty molecule is degraded and replaced, so an error rate of $10^{-4}$ is a good compromise. DNA is the master copy, and an error there is inherited by every descendant, which justifies the much greater investment in proofreading and repair that brings its error rate to $10^{-10}$.
:::
:::
