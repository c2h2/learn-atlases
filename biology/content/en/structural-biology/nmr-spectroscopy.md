A crystal structure shows a protein frozen in a lattice. But proteins work in solution, and they move: side chains rotate, loops flex, domains hinge, and some proteins never settle into a single structure at all. Nuclear magnetic resonance (NMR) spectroscopy studies proteins and nucleic acids in solution, at near-physiological temperature, and it measures not only where atoms are but how they move, on timescales from picoseconds to hours. Its signals come from atomic nuclei, so every residue of a protein reports individually. The price is sensitivity and size: NMR needs concentrated samples, isotope labelling, and becomes increasingly difficult for molecules larger than a few tens of kilodaltons.

This chapter explains how NMR yields structures and dynamics of biological macromolecules, and then turns to the optical spectroscopies — absorbance, circular dichroism and fluorescence — that are the everyday tools for measuring concentration, secondary structure, folding and distances. The physical principles of magnetic resonance, chemical shift and spin–spin coupling, and of electronic absorption and emission, are covered in Chemistry Atlas ([NMR: principles](/learn/chemistry/lesson.php?c=spectroscopy&l=nmr-principles), [NMR for structure determination](/learn/chemistry/lesson.php?c=spectroscopy&l=nmr-structure), [Electronic spectroscopy](/learn/chemistry/lesson.php?c=spectroscopy&l=electronic-spectroscopy) and [Molecular absorption and fluorescence spectrometry](/learn/chemistry/lesson.php?c=analytical-chemistry&l=molecular-spectrometry)). Here we recall only what we need and concentrate on proteins.

## Nuclear spins in a magnetic field

Nuclei with spin $I = \tfrac12$ — ¹H, ¹³C, ¹⁵N, ³¹P, ¹⁹F — behave like tiny bar magnets. In a magnetic field $B_0$ their two spin states differ in energy, and transitions between them are driven by radio-frequency radiation at the **Larmor frequency**

$$
\nu_0 = \frac{\gamma B_0}{2\pi},
$$ {#eq-larmor}

where $\gamma$ is the gyromagnetic ratio of the nucleus: $\gamma/2\pi = 42.58$ MHz T⁻¹ for ¹H, 10.71 MHz T⁻¹ for ¹³C and −4.32 MHz T⁻¹ for ¹⁵N. Spectrometers are named by their proton frequency: a "600 MHz" magnet has $B_0 = 14.1$ T, and the strongest commercial instruments, at 1.2 GHz (28.2 T), entered service in 2020.

::: example Why NMR is insensitive {#ex-boltzmann}
At 600 MHz and 25 °C, what is the fractional excess of protons in the lower spin state? What are the ¹³C and ¹⁵N frequencies in the same magnet?
::: solution
For a two-level system the fractional population difference is $\Delta N/N \approx \Delta E/(2k_\mathrm BT) = h\nu_0/(2k_\mathrm BT) = (6.626\times10^{-34}\times6.00\times10^8)/(2\times1.381\times10^{-23}\times298) = 4.8\times10^{-5}$. Only about five protons in every hundred thousand contribute net signal, which is why NMR needs samples of 0.1–1 mmol L⁻¹ — a millilitre of a 25 kDa protein at 0.5 mmol L⁻¹ is 12.5 mg. In the same field, ¹³C resonates at $14.1\times10.71 = 151$ MHz and ¹⁵N at $14.1\times4.32 = 61$ MHz, so those nuclei are even less sensitive (the signal scales roughly as $\gamma^3$ when the same nucleus is excited and detected), which is why protein NMR experiments start and end on protons.
:::
:::

The precise resonance frequency of each nucleus depends on its electronic environment, which shields it slightly from $B_0$. This **chemical shift** $\delta$, measured in parts per million (ppm) relative to a reference compound, is what makes NMR chemically informative: amide protons of a folded protein resonate between about 6 and 11 ppm, α-protons around 3.5–6 ppm, methyl protons around 0–1.5 ppm.

### Isotope labelling and multidimensional spectra

A one-dimensional proton spectrum of a protein with 1,000 protons is an unresolvable forest of overlapping peaks. Two developments made protein NMR possible. First, **multidimensional** experiments (introduced by Jean Jeener's proposal of 1971 and Richard Ernst's two-dimensional Fourier transform NMR, Nobel Prize in Chemistry 1991) spread the peaks into two, three or four frequency dimensions, each correlating nuclei that are connected through bonds or through space. Second, proteins expressed in *E. coli* grown on ¹⁵N-ammonium chloride and ¹³C-glucose as sole nitrogen and carbon sources are uniformly labelled with these spin-½ isotopes (natural ¹⁴N and ¹²C are not useful), so that heteronuclear experiments can follow the backbone.

::: definition The HSQC spectrum {#def-hsqc}
The **¹H–¹⁵N heteronuclear single-quantum coherence** (HSQC) spectrum of a ¹⁵N-labelled protein is a two-dimensional map with the proton chemical shift on one axis and the ¹⁵N shift on the other, showing one peak for each N–H group: one for the backbone amide of every residue except proline (which has no amide proton), plus peaks from side-chain NH groups of Asn, Gln, Trp and Arg. Each peak is a reporter on its residue.
:::

The HSQC is the protein's fingerprint. A folded protein gives well-dispersed peaks spread across the proton dimension (about 6–10.5 ppm); an unfolded or disordered protein gives peaks crowded between about 7.8 and 8.6 ppm, because without a defined structure every amide sees a similar, averaged environment. When a ligand or partner protein binds, the peaks of residues at the interface shift, **chemical-shift perturbation** mapping the binding site residue by residue, and their movement with increasing ligand concentration gives the dissociation constant.

To use the peaks, each must first be **assigned** to its residue. **Triple-resonance** experiments (M. Ikura, L. E. Kay and A. Bax, 1990) correlate each amide with the Cα and Cβ of its own residue and of the preceding one, so that the residues can be "walked" along the chain like the pieces of a domino chain; Cα and Cβ shifts also identify the residue type. The chemical shifts themselves report secondary structure: Cα shifts are higher than random-coil values in helices and lower in strands, the basis of the **chemical shift index** (D. S. Wishart, B. D. Sykes and F. M. Richards, 1992) and of programs that predict φ and ψ from shifts.

## Structural restraints

NMR does not produce an image. It produces a set of geometric **restraints** — upper bounds on distances, ranges for torsion angles, orientations of bonds — from which structures consistent with them are calculated.

### Distances from the nuclear Overhauser effect

::: proposition The NOE distance dependence {#prop-noe}
In the **nuclear Overhauser effect** (NOE), magnetisation is transferred between two protons through their dipolar coupling, without any chemical bond between them. For a rigid pair in a molecule tumbling slowly (the regime of proteins), the initial rate of transfer, and so the cross-peak intensity in a short-mixing-time NOESY spectrum, is proportional to

$$
I_\mathrm{NOE} \propto \frac{f(\tau_\mathrm c)}{r^6},
$$ {#eq-noe}

where $r$ is the distance between the protons and $f(\tau_\mathrm c)$ depends on the rotational correlation time. Distances are calibrated against a pair of known separation: $r = r_\mathrm{ref}(I_\mathrm{ref}/I)^{1/6}$. NOEs are detectable up to about 5–6 Å. Assumptions: an isolated spin pair (no spin diffusion through third protons), negligible internal motion, and the same correlation time for both pairs.
:::

Because of the sixth power, an NOE says sharply that two protons are close, but a factor of two error in intensity changes the distance by only 12 %. In practice NOEs are converted into loose upper bounds (2.5, 3.5 or 5 Å for strong, medium and weak peaks), and the strength of the method lies in their number: a well-determined structure of a 100-residue protein may use 15–20 restraints per residue, many of them between residues far apart in sequence that define the fold. Characteristic patterns identify secondary structure before any calculation: strong NOEs between amide protons of consecutive residues, $d_\mathrm{NN}(i, i+1)$, and medium NOEs from Hα($i$) to HN($i+3$) mark helices; strong Hα($i$)–HN($i+1$) NOEs and cross-strand Hα–Hα NOEs mark sheets.

::: example Calibrating an NOE {#ex-noe}
In a NOESY spectrum, the cross peak between the two protons of a Tyr ring separated by a fixed 2.5 Å has intensity 100 (arbitrary units). A cross peak between a methyl group and an amide proton has intensity 5. Estimate the distance, and the distance range if the intensity is uncertain by a factor of two either way.
::: solution
$r = 2.5\times(100/5)^{1/6} = 2.5\times20^{1/6} = 2.5\times1.648 = 4.1$ Å. If the true intensity were 10 or 2.5, the distance would be $2.5\times10^{1/6} = 3.7$ Å or $2.5\times40^{1/6} = 4.6$ Å. A factor of four uncertainty in intensity gives only about ±0.45 Å in distance, which is why NOEs are robust even though intensities are hard to measure precisely. (Methyl groups need a correction for their three protons, and spin diffusion can make long distances look shorter; generous upper bounds absorb both.)
:::
:::

::: widget plot
f: (2.5/x)^6
x: 1.8, 6
y: 0, 1.2
labels: I/I_\mathrm{ref}
vlines: 4.1
caption: Relative NOE intensity against inter-proton distance (Å), normalised to a reference pair at 2.5 Å, from [[#eq-noe]]. The steep $r^{-6}$ fall-off means intensity drops to 2 % by 4.6 Å and below 0.5 % at 6 Å, the practical limit of detection. Hover to see how little the distance changes for a large change in intensity around the vertical line at 4.1 Å, the distance of [[#ex-noe]].
:::

### Torsion angles from coupling constants

Scalar ("J") coupling between nuclei three bonds apart depends on the dihedral angle between them. Martin Karplus derived the relationship from theory in 1959, and it has been parametrised empirically for proteins.

::: proposition The Karplus relation {#prop-karplus}
The three-bond coupling between the amide proton and the α-proton of a residue is approximately

$$
{}^3J_{\mathrm{HN}\alpha} = A\cos^2\theta + B\cos\theta + C, \qquad \theta = \varphi - 60°,
$$ {#eq-karplus}

with, for example, $A = 6.51$ Hz, $B = -1.76$ Hz, $C = 1.60$ Hz (G. W. Vuister and A. Bax, 1993, fitted to proteins of known structure). The parameters are empirical, and because the relation is quadratic in $\cos\theta$ a single value of $J$ corresponds to up to four values of φ.
:::

::: example Helix or strand from a coupling constant {#ex-karplus}
Calculate ${}^3J_{\mathrm{HN}\alpha}$ for an α-helical residue (φ = −60°) and a β-strand residue (φ = −120°).
::: solution
Helix: $\theta = -120°$, $\cos\theta = -0.5$, so $J = 6.51\times0.25 + (-1.76)(-0.5) + 1.60 = 1.63 + 0.88 + 1.60 = 4.1$ Hz. Strand: $\theta = -180°$, $\cos\theta = -1$, so $J = 6.51 + 1.76 + 1.60 = 9.9$ Hz. The rule of thumb follows: couplings below about 5 Hz indicate helix, above about 8 Hz extended strand. Intermediate values usually mean averaging between conformations, for instance in a flexible loop.
:::
:::

::: widget plot
f: 6.51*cos((x - 60)*pi/180)^2 - 1.76*cos((x - 60)*pi/180) + 1.6
x: -180, 180
y: 0, 11
labels: {}^3J_{\mathrm{HN}\alpha}\ (\mathrm{Hz})
vlines: -60; -120
caption: The Karplus curve [[#eq-karplus]]: the HN–Hα coupling constant (Hz) against the backbone angle φ (degrees). The vertical lines mark the helical (−60°) and β (−120°) values of [[#ex-karplus]]. Notice that the curve is not one-to-one: a coupling of 6 Hz is consistent with several values of φ, including positive ones, so couplings are combined with chemical shifts and NOEs rather than used alone.
:::

### Orientations and long-range information

NOEs and couplings are local: they constrain distances below 6 Å and individual torsions. Long-range accuracy improved greatly with **residual dipolar couplings** (RDCs). In ordinary solution the dipolar coupling between two nuclei averages to zero because the molecule tumbles isotropically; if the molecule is weakly aligned — by dissolving it in a dilute liquid crystal of phospholipid bicelles or filamentous phage, so that about one molecule in a thousand is aligned — a small residual coupling remains whose size depends on the orientation of each bond vector relative to the magnetic field (N. Tjandra and A. Bax, 1997). RDCs define the relative orientation of distant parts of a molecule, such as the domains of a multidomain protein or the helices of an RNA. **Paramagnetic relaxation enhancement**, from a spin label or metal attached at one site, gives distances up to 20–25 Å.

### Calculating and judging an NMR structure

Structures are calculated by **simulated annealing**: starting from random or extended chains, a computer program heats the model, lets it move under a potential combining the experimental restraints with standard covalent geometry and simple non-bonded repulsion, and cools it slowly. The calculation is repeated many times, and the 10–20 lowest-energy structures that satisfy the restraints are deposited as an **ensemble**.

::: warning The spread of an NMR ensemble is not a measure of motion
The root-mean-square deviation among the members of an NMR ensemble measures **precision**: how tightly the restraints define the structure. A region that is poorly defined may be flexible — or it may simply have few restraints because its peaks overlapped or were not assigned. Conversely, a well-defined ensemble may still be inaccurate if the restraints are wrong. Information about motion comes from relaxation measurements, described next, not from the spread of the ensemble.
:::

## The size problem

Larger molecules tumble more slowly in solution, and slow tumbling makes the NMR signals decay faster (transverse relaxation) and so broadens the lines, until the peaks of a large protein are too wide and too weak to see.

::: proposition Rotational correlation time {#prop-tauc}
A rigid sphere of hydrodynamic radius $r$ in a solvent of viscosity $\eta$ at temperature $T$ has a rotational correlation time (Stokes–Einstein–Debye)

$$
\tau_\mathrm c = \frac{4\pi\eta r^3}{3k_\mathrm BT}.
$$ {#eq-tauc}

For globular proteins in water at 25 °C an empirical rule of thumb is $\tau_\mathrm c$ (ns) ≈ $M$/2.4, with $M$ in kDa. Line widths increase roughly in proportion to $\tau_\mathrm c$. Assumptions: a rigid, spherical molecule, no aggregation; elongated or flexible molecules deviate.
:::

::: example How slowly does a protein tumble? {#ex-tauc}
Estimate $\tau_\mathrm c$ for a 25 kDa globular protein in water at 25 °C ($\eta = 0.89$ mPa s), taking a protein volume of 1.21 Å³ Da⁻¹ and adding a 3 Å hydration shell to the radius.
::: solution
$V = 1.21\times25\,000 = 3.03\times10^4$ Å³, so the dry radius is $(3V/4\pi)^{1/3} = 19.3$ Å, and with hydration $r \approx 22.3$ Å $= 2.23\times10^{-9}$ m. Then $\tau_\mathrm c = 4\pi(0.89\times10^{-3})(2.23\times10^{-9})^3/(3\times1.381\times10^{-23}\times298) = 1.0\times10^{-8}$ s, about 10 ns, in agreement with the rule of thumb (25/2.4 = 10.4 ns). A 100 kDa protein would tumble in roughly 35–40 ns, with correspondingly broad lines.
:::
:::

Several advances have pushed the size limit. **Deuteration** replaces most protons by deuterons, removing many relaxation pathways. **TROSY** (transverse-relaxation-optimised spectroscopy; K. Pervushin, R. Riek, G. Wider and K. Wüthrich, 1997) selects the one component of each amide signal in which two relaxation mechanisms cancel, giving sharp lines at high field. **Methyl-TROSY**, with ¹³CH₃ labels on Ile, Leu, Val and other methyl groups in an otherwise deuterated protein, gives usable spectra even of assemblies near 1 MDa, such as the 20S proteasome (R. Sprangers and L. E. Kay, 2007). For such systems NMR does not attempt a full structure but probes dynamics, allostery and binding at chosen sites.

## Dynamics

NMR's distinctive strength is the measurement of motion over many timescales.

- **Picoseconds to nanoseconds**: the relaxation rates of ¹⁵N nuclei ($R_1$, $R_2$ and the heteronuclear ¹H–¹⁵N NOE) report on fast internal motions of each N–H bond. In the model-free analysis of G. Lipari and A. Szabo (1982), they give an **order parameter** $S^2$ for each bond, from 1 (rigid) to 0 (completely unrestricted); backbone amides in secondary structure typically have $S^2 \approx 0.8$–0.9, flexible termini and loops much less.
- **Microseconds to milliseconds**: conformational exchange broadens peaks. **Relaxation-dispersion** experiments (CPMG and $R_{1\rho}$) measure how the broadening depends on applied radio-frequency pulses and so extract the rates of exchange, the populations of the exchanging states and their chemical shifts — even when the minor state has a population of only 1 %. Such "invisible" excited states have been detected for enzymes during catalysis (D. Kern and colleagues, cyclophilin A, 2002; dihydrofolate reductase, P. E. Wright and colleagues) and for folding intermediates (L. E. Kay and colleagues).
- **Seconds to hours**: **hydrogen–deuterium exchange**. When a protein is transferred into D₂O, amide protons exchange with solvent deuterons and their HSQC peaks disappear; exchange of protons that are hydrogen-bonded or buried requires local or global unfolding, and their **protection factors** report on the stability of each part of the structure. HDX is also measured by mass spectrometry.

::: intuition One spectrum, many clocks
An NMR peak is like a light that flickers. If the protein switches between two conformations much faster than the difference between their frequencies, the peak sits at the average position; if much slower, two separate peaks appear with intensities equal to the populations; in between, the peak broadens, sometimes to invisibility. By choosing which kind of experiment to run, NMR spectroscopists can tune themselves to processes ranging from bond vibrations to the unfolding of a protein over days.
:::

### Solid-state NMR

Molecules too large or insoluble for solution NMR — amyloid fibrils, membrane proteins in lipid bilayers, cell walls — can be studied in the solid state by **magic-angle spinning** (MAS), in which the sample is rotated at tens of kilohertz at 54.7° to the field to average away the orientation dependence that would otherwise broaden the lines. Solid-state NMR gave the first atomic models of amyloid fibrils, such as that of the prion protein HET-s of the fungus *Podospora anserina* (C. Wasmer, B. H. Meier and colleagues, 2008) and of amyloid-β (R. Tycko and colleagues), now complemented by cryo-EM ([[structural-biology/cryo-em]]).

## Optical spectroscopy

NMR is powerful but slow and demanding. Three optical methods, each needing micrograms of protein and minutes of instrument time, are used daily in every structural biology laboratory.

### Absorbance and concentration

Proteins absorb in the near ultraviolet at 280 nm because of the aromatic side chains of tryptophan and tyrosine and, weakly, disulfide bonds (cystines). From the Beer–Lambert law $A = \varepsilon c\ell$ (path length $\ell$), the concentration can be found if the molar absorption coefficient $\varepsilon$ is known, and it can be estimated from the composition:

$$
\varepsilon_{280} \approx 5500\,n_\mathrm{Trp} + 1490\,n_\mathrm{Tyr} + 125\,n_\mathrm{cystine}\quad (\mathrm{L\,mol^{-1}\,cm^{-1}})
$$ {#eq-epsilon}

(C. N. Pace and colleagues, 1995, from the average behaviour of the chromophores in folded proteins; an empirical estimate good to a few per cent for most proteins that contain Trp).

::: example Measuring a protein concentration {#ex-a280}
A 30 kDa protein with 2 Trp, 4 Tyr and one disulfide has $A_{280} = 0.50$ in a 1 cm cuvette. What are its molar and mass concentrations?
::: solution
From [[#eq-epsilon]], $\varepsilon = 2\times5500 + 4\times1490 + 125 = 17\,085$ L mol⁻¹ cm⁻¹. Then $c = A/(\varepsilon\ell) = 0.50/17\,085 = 2.93\times10^{-5}$ mol L⁻¹, or 29 μmol L⁻¹; times 30,000 g mol⁻¹ gives 0.88 g L⁻¹ (0.88 mg mL⁻¹). A protein with no Trp would have a much smaller and less reliable $\varepsilon$, and nucleic-acid contamination (absorbing strongly at 260 nm) would inflate the value.
:::
:::

### Circular dichroism

Chiral molecules absorb left- and right-circularly polarised light slightly differently. **Circular dichroism** (CD) spectroscopy measures this difference, usually reported as the **mean residue ellipticity** $[\theta]$ in deg cm² dmol⁻¹, normalised per residue. In the far ultraviolet (190–250 nm) the absorbing group is the peptide bond, and its CD depends on the backbone conformation, because the regular arrangement of peptides in a helix or sheet couples their transitions.

- **α-Helix**: two negative bands at 222 and 208 nm and a strong positive band near 192 nm.
- **β-Sheet**: a single negative band near 215–218 nm and a positive band near 195–200 nm, weaker and more variable than helix.
- **Disordered**: a strong negative band near 198 nm and little signal above 210 nm.

The spectrum of a protein is roughly a weighted sum of these basis spectra, and deconvolution programs estimate its secondary-structure content, typically to within 5–10 % for helix and less reliably for sheet. CD is widely used to check that a purified or mutant protein is folded, and to follow unfolding: the signal at 222 nm, recorded while temperature or denaturant is increased, gives the curves analysed in [[structural-biology/protein-folding]]. In the near ultraviolet (250–320 nm), CD from aromatic side chains in asymmetric environments is a fingerprint of tertiary structure that disappears in a molten globule.

::: example Helix content from CD {#ex-cd}
A 20-residue peptide designed to be helical has $[\theta]_{222} = -14\,000$ deg cm² dmol⁻¹ at 25 °C, and $-28\,000$ when 30 % trifluoroethanol is added. Take $[\theta]_{222} = -32\,000$ for a fully helical peptide of this length and 0 for a fully disordered one (illustrative calibration values; the true helical value depends on chain length and temperature). Estimate the fraction helix in each condition.
::: solution
Assuming a linear two-state combination, fraction helix $= [\theta]/[\theta]_\mathrm{helix}$: $14\,000/32\,000 = 0.44$ in buffer and $28\,000/32\,000 = 0.88$ in TFE. Trifluoroethanol strengthens intrapeptide hydrogen bonds and stabilises helices, which is why it is used to test the helical propensity of a sequence — but it can also induce helix in segments that are not helical in the native protein, so TFE-induced helicity is a statement about propensity, not structure.
:::
:::

### Fluorescence

The indole ring of tryptophan fluoresces with an emission maximum near 350 nm in water, shifting to 325–335 nm when the residue is buried in a non-polar environment. Changes in its intensity and wavelength therefore report folding and binding, and are the commonest signal in stopped-flow kinetics. Extrinsic dyes attached at engineered cysteines or by genetic tags extend fluorescence to any site and any colour. Fluorescence **anisotropy** — the degree to which polarised excitation gives polarised emission — reports how fast the fluorophore rotates and is used to measure binding of a small labelled ligand to a large protein.

The most structural of the fluorescence methods measures distances.

::: proposition Förster resonance energy transfer {#prop-fret}
An excited donor fluorophore can transfer its energy non-radiatively to a nearby acceptor through dipole–dipole coupling. The efficiency of transfer at donor–acceptor distance $r$ is

$$
E = \frac{1}{1 + (r/R_0)^6},
$$ {#eq-fret}

where the **Förster radius** $R_0$, the distance of 50 % transfer, is typically 2–8 nm and depends on the overlap of donor emission and acceptor absorption spectra, the donor's quantum yield, the refractive index and an orientation factor $\kappa^2$ (usually taken as 2/3, appropriate for freely rotating dyes). (T. Förster, 1948.)
:::

L. Stryer and R. P. Haugland showed in 1967, with donor and acceptor at the two ends of oligoprolines of different lengths, that FRET behaves as a "spectroscopic ruler" over 1–6 nm. In **single-molecule FRET** (smFRET; T. Ha, S. Weiss and colleagues, 1996), the efficiency is measured for one molecule at a time, so that the distribution of distances in a heterogeneous population, and transitions between conformations in real time, become visible — information that ensemble measurements average away.

::: example A distance from FRET {#ex-fret}
A donor–acceptor pair with $R_0 = 5.0$ nm is attached to two sites in a protein. The measured efficiency is 0.75 in the absence of ligand and 0.25 when ligand is bound. What are the distances, and what does this suggest?
::: solution
Rearranging [[#eq-fret]], $r = R_0(1/E - 1)^{1/6}$. For $E = 0.75$, $r = 5.0\times(1/3)^{1/6} = 5.0\times0.833 = 4.2$ nm; for $E = 0.25$, $r = 5.0\times3^{1/6} = 6.0$ nm. Binding increases the separation by about 1.8 nm, consistent with a domain opening. Because the efficiency changes most steeply near $R_0$, FRET is most sensitive for distances between about $0.5R_0$ and $1.5R_0$; dye linkers (about 1 nm long) and the uncertainty in $\kappa^2$ limit absolute accuracy to a few ångströms at best, but changes in distance are measured more reliably.
:::
:::

::: widget plot
f: 1/(1 + (x/R)^6)
x: 0, 12
y: 0, 1
sliders: R=5:2:8:0.1
labels: E
vlines: 4.2; 6.0
caption: FRET efficiency against donor–acceptor distance (nm) from [[#eq-fret]], for a Förster radius $R_0$ set by the slider. The vertical lines mark the two distances of [[#ex-fret]] with $R_0 = 5$ nm. The curve is steepest at $r = R_0$ and nearly flat below $0.5R_0$ and above $2R_0$, so choose a dye pair whose $R_0$ lies in the middle of the distances you expect.
:::

::: quiz
You want to show that a 15 kDa protein binds a peptide and identify which residues form the binding site. Which single experiment is most informative?
- [ ] Far-UV CD spectra with and without peptide
- [ ] Absorbance at 280 nm of the mixture
- [x] A series of ¹H–¹⁵N HSQC spectra of ¹⁵N-labelled protein with increasing amounts of unlabelled peptide
- [ ] Fluorescence anisotropy of the protein's tryptophan
::: solution
In an HSQC titration every residue reports separately, so the peaks that shift on adding peptide locate the binding surface on the sequence (and on the structure, if known), and the dependence of the shifts on peptide concentration gives $K_\mathrm d$. CD would detect binding only if secondary structure changed; absorbance does not detect binding; tryptophan fluorescence or anisotropy can detect binding and measure affinity but does not say where.
:::
:::

::: application Fragment screening by NMR
In "SAR by NMR" (S. B. Shuker, P. J. Hajduk, R. P. Meadows and S. W. Fesik, 1996), libraries of small molecules are screened for binding to a ¹⁵N-labelled target protein by HSQC chemical-shift perturbation; weak binders at two neighbouring sites are then chemically linked into a single tight binder, because the binding free energies of the two halves roughly add. This approach and related ligand-detected NMR methods have been widely used in drug discovery; venetoclax, a BCL-2 inhibitor approved in 2016, traces its origins to NMR-based fragment work on the related protein BCL-xL at Abbott.
:::

::: history
Felix Bloch and Edward Purcell independently detected nuclear magnetic resonance in condensed matter in 1946 (Nobel Prize in Physics 1952). The chemical shift was discovered in 1950, and Richard Ernst's Fourier-transform (1966) and two-dimensional (1976) methods transformed sensitivity and resolution. Kurt Wüthrich's group developed the sequential assignment strategy and, in 1985, published the first NMR structure of a protein, a proteinase inhibitor from bull seminal plasma (M. P. Williamson, T. F. Havel and K. Wüthrich); Wüthrich shared the Nobel Prize in Chemistry in 2002. Isotope labelling and the triple-resonance experiments of Ad Bax, Lewis Kay and colleagues (1990) extended NMR to larger proteins, and TROSY (1997) and methyl-TROSY to large complexes. In optical spectroscopy, Theodor Förster's theory of energy transfer (1948) became Stryer's spectroscopic ruler (1967), and single-molecule fluorescence (from the 1990s) opened direct views of individual molecular machines.
:::

## Where this leads

NMR gives atomic detail for small proteins and dynamics for large ones; [[structural-biology/cryo-em]] gives structures of large, heterogeneous assemblies. Integrating restraints from NMR, FRET, cross-linking mass spectrometry and low-resolution EM into a single model is increasingly common, and the dynamics measured here are the subject of [[structural-biology/dynamics-and-design]].

::: summary
- NMR measures nuclei in a magnetic field at the Larmor frequency $\gamma B_0/2\pi$; the small Boltzmann excess (about $5\times10^{-5}$ at 600 MHz) means high concentrations are needed.
- ¹⁵N/¹³C labelling and multidimensional spectra resolve individual residues: the HSQC is a fingerprint of folding and binding; triple-resonance experiments assign it; chemical shifts report secondary structure.
- Structures come from restraints: NOE distances ($I \propto r^{-6}$, up to 5–6 Å), Karplus couplings for torsion angles, RDCs for long-range orientation. Ensemble spread measures precision, not motion.
- Slow tumbling of large molecules ($\tau_\mathrm c \propto r^3$) broadens lines; deuteration and (methyl-)TROSY push the limit towards 1 MDa for selected probes.
- Relaxation measures motions from picoseconds ($S^2$) to milliseconds (relaxation dispersion), and H/D exchange the slow opening of structure.
- Optical methods: $A_{280}$ for concentration, far-UV CD for secondary structure and folding, Trp fluorescence for folding and binding, FRET ($E = 1/(1 + (r/R_0)^6)$) for distances and, in single molecules, for dynamics.
:::

## Exercises

::: exercise A proton frequency {level=1 check="950"}
What is the proton Larmor frequency, to the nearest 10 MHz, in a 22.3 T magnet?
::: solution
$42.58\times22.3 = 949.5$ MHz, i.e. a "950 MHz" spectrometer.
:::
:::

::: exercise A FRET distance {level=1 check="6.0"}
With $R_0 = 6.0$ nm, what is the donor–acceptor distance (nm) when $E = 0.5$?
::: solution
By definition $E = 0.5$ at $r = R_0 = 6.0$ nm.
:::
:::

::: exercise Concentration from absorbance {level=1 check="19"}
A protein with 1 Trp, 6 Tyr and no disulfides has $A_{280} = 0.27$ (1 cm path). What is its concentration in μmol L⁻¹ (two significant figures)?
::: solution
$\varepsilon = 5500 + 6\times1490 = 14\,440$ L mol⁻¹ cm⁻¹, so $c = 0.27/14\,440 = 1.87\times10^{-5}$ mol L⁻¹, about 19 μmol L⁻¹.
:::
:::

::: exercise A coupling constant {level=2 check="6.35"}
Use [[#eq-karplus]] to calculate ${}^3J_{\mathrm{HN}\alpha}$ (Hz, three significant figures) for a residue with φ = +60°. Which residue is most likely to adopt this angle?
::: solution
$\theta = 0°$, $\cos\theta = 1$: $J = 6.51 - 1.76 + 1.60 = 6.35$ Hz. Positive φ is the left-handed region, usually occupied by glycine. The value is intermediate, so on its own it would be ambiguous — a reminder that the Karplus relation is many-to-one.
:::
:::

::: exercise NOE patterns {level=2}
In the NOESY spectrum of a 60-residue protein, residues 10–22 show strong HN($i$)–HN($i+1$) NOEs and Hα($i$)–HN($i+3$) NOEs; residues 30–36 and 44–50 show strong Hα($i$)–HN($i+1$) NOEs, ${}^3J_{\mathrm{HN}\alpha}$ values near 9 Hz, and NOEs between Hα of residue 32 and Hα of residue 48, and between Hα of 34 and Hα of 46. Describe the secondary structure and the topology of the sheet.
::: solution
Residues 10–22 form an α-helix (sequential HN–HN and $i, i+3$ NOEs). Residues 30–36 and 44–50 are β-strands (strong sequential Hα–HN NOEs and large couplings). The cross-strand Hα–Hα NOEs pair 32 with 48 and 34 with 46: as one index increases by 2 the other decreases by 2, so the strands are antiparallel, and since $32 + 48 = 34 + 46 = 80$ they are in register around a turn near residues 37–43 — a β-hairpin (with a fairly long connection) packed presumably against the helix.
:::
:::

::: exercise Tumbling and size {level=2}
Using the rule of thumb $\tau_\mathrm c \approx M/2.4$ ns ($M$ in kDa), estimate $\tau_\mathrm c$ for a 15 kDa monomer and for the same protein if it forms a dimer at NMR concentrations. How could you use relaxation measurements to tell whether a protein is dimerising?
::: solution
Monomer: about 6.3 ns; dimer: about 12.5 ns. The overall tumbling time can be estimated from the ratio of ¹⁵N relaxation rates $R_2/R_1$ of residues in rigid secondary structure; if it is about twice that expected for the monomer, or increases with concentration, the protein is dimerising (or aggregating). Concentration-dependent line broadening in the HSQC, and comparison with analytical ultracentrifugation or SEC–MALS, would confirm it.
:::
:::

::: exercise Interpreting a CD melt {level=2}
The CD signal at 222 nm of a protein is −18,000 deg cm² dmol⁻¹ at 20 °C and −3,000 at 90 °C, changing sigmoidally with a midpoint at 58 °C. After cooling back to 20 °C the signal is −17,500. A second protein gives a similar melt but returns only to −6,000 on cooling, and the solution is cloudy. (a) What does each result say? (b) Why can only the first be analysed with the thermodynamic two-state model of [[structural-biology/protein-folding]]?
::: solution
(a) The first protein unfolds cooperatively with $T_\mathrm m \approx 58$ °C and refolds almost completely on cooling (97 % recovery): the transition is reversible. The second unfolds similarly but aggregates on heating, so most molecules do not return to the native state; the cloudiness is light scattering from aggregates. (b) Thermodynamic analysis assumes equilibrium between N and U at every temperature. An irreversible process (aggregation) means the curve reflects kinetics as well as stability, its apparent midpoint depends on heating rate and concentration, and the van 't Hoff or Gibbs–Helmholtz analysis is invalid.
:::
:::

::: exercise Reading an HSQC titration {level=3}
A ¹⁵N-labelled 12 kDa domain is titrated with an unlabelled peptide. For residues 40–55, peaks move progressively along straight lines as peptide is added, reaching their end points at about a twofold excess of peptide; for residues 70–74, peaks broaden and disappear at a 0.5 molar ratio and reappear at new positions at saturation. Other peaks do not move. (a) What exchange regime does each behaviour indicate? (b) What does the difference tell you? (c) How would you estimate $K_\mathrm d$ from the first group?
::: solution
(a) Progressive shifts mean fast exchange: the peptide binds and dissociates faster than the difference in resonance frequency between free and bound states (in s⁻¹), so each peak sits at the population-weighted average. Broadening and reappearance mean intermediate exchange: the exchange rate is comparable with the frequency difference. (b) Both groups are affected by binding, so both are in or near the binding site (or in a region that changes conformation). Residues 70–74 have a larger chemical shift difference between free and bound states, so at the same exchange rate they fall into intermediate exchange — they probably experience the largest structural change or the most direct contact. (c) Fit the shift changes $\Delta\delta$ of the fast-exchange residues against total peptide concentration to the single-site binding equation (the quadratic form that accounts for depletion of free peptide), with $K_\mathrm d$ and the maximal shift as parameters. Reaching saturation at a twofold excess with protein at, say, 0.2 mmol L⁻¹ implies $K_\mathrm d$ well below 0.2 mmol L⁻¹, perhaps tens of μmol L⁻¹.
:::
:::

::: exercise Designing a FRET experiment {level=3}
A transporter is thought to alternate between an outward-open state, in which two labelled residues are about 3 nm apart, and an inward-open state, in which they are about 5 nm apart. Two dye pairs are available, with $R_0 = 2.5$ nm and $R_0 = 4.0$ nm. (a) Calculate $E$ for both states with each pair. (b) Which pair would you use, and why? (c) In smFRET, individual molecules show $E$ jumping between two values every few hundred milliseconds. What does this tell you that an ensemble measurement could not?
::: solution
(a) For $R_0 = 2.5$ nm: at 3 nm, $E = 1/(1 + 1.2^6) = 1/(1 + 2.99) = 0.25$; at 5 nm, $E = 1/(1 + 64) = 0.015$. For $R_0 = 4.0$ nm: at 3 nm, $E = 1/(1 + 0.75^6) = 1/(1 + 0.178) = 0.85$; at 5 nm, $E = 1/(1 + 1.25^6) = 1/(1 + 3.81) = 0.21$. (b) The 4.0 nm pair: both states fall in the sensitive range around $R_0$ and the difference in $E$ (0.64) is far larger than with the 2.5 nm pair (0.24, with the inward-open state almost undetectable). (c) That individual molecules really switch between two discrete conformations (rather than all molecules adopting an intermediate average), the rates of switching in each direction (from dwell-time distributions) and the populations, and whether ligands change the rates or the populations — kinetics and heterogeneity that an ensemble average hides.
:::
:::
