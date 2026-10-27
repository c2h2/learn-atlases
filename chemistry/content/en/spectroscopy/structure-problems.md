A colleague hands you a vial of a colourless solid that melts at $38\ ^\circ\mathrm{C}$ and smells faintly of hawthorn. The label has gone; the notebook says only "$\mathrm{C_9H_{10}O_2}$?". Within an hour you can have a high-resolution mass spectrum, an infrared spectrum and proton and carbon-13 NMR spectra, and between them these four measurements will almost always identify the compound beyond reasonable doubt. Not one of them can do it alone. The mass spectrum gives a formula but says little about connectivity; the infrared spectrum names functional groups but not where they sit; the NMR spectra map the carbon–hydrogen skeleton but cannot weigh the molecule or see a nitrile's nitrogen. Structure determination is the craft of making every datum agree with one structure — and of proving that no other structure agrees as well. This lesson turns the separate skills of [[spectroscopy/mass-spectrometry]], [[spectroscopy/vibrational-spectroscopy]] and [[spectroscopy/nmr-structure]] into one procedure, and then practises it on unknowns of increasing difficulty, the vial above among them.

All the spectral data quoted below are typical values for the real compounds, taken from the Spectral Database for Organic Compounds (SDBS, AIST, Japan) and the correlation tables of Pretsch, Bühlmann and Badertscher; NMR data are for $\mathrm{CDCl_3}$ solutions unless stated, with δ in ppm from tetramethylsilane and $J$ in Hz. Isotopic masses are from the 2020 Atomic Mass Evaluation (AME2020), isotopic abundances from IUPAC, and every number has been recomputed.

## The molecular formula comes first {#sec-formula}

A structure problem without a formula is a problem with too many answers. The formula fixes the number of atoms you must place and, through a single arithmetic step, the number of rings and multiple bonds the answer must contain. There are three routes to it, and good practice uses at least two.

**Combustion analysis** gives the mass percentages of C, H and N (oxygen by difference), hence the *empirical* formula — the smallest whole-number ratio. It cannot tell $\mathrm{C_3H_6O}$ (acetone, $M = 58$) from $\mathrm{C_6H_{12}O_2}$ (butyl acetate, $M = 116$): both are $62.04\,\%$ C and $10.41\,\%$ H. The molar mass, from the mass spectrum, supplies the multiplier.

**Low-resolution mass spectrometry** gives the nominal mass of the molecular ion $\mathrm{M^{+\bullet}}$ (in electron ionisation) or of a pseudo-molecular ion such as $[\mathrm{M+H}]^+$ or $[\mathrm{M+Na}]^+$ (in electrospray), and its isotope pattern counts carbons and reveals chlorine, bromine and sulfur. **High-resolution mass spectrometry** (HRMS) measures $m/z$ to a few parts per million, which is enough to choose between formulas of the same nominal mass, because no two isotopes have exactly integer masses: $^1\mathrm{H} = 1.007\,825\ \mathrm{u}$, $^{14}\mathrm{N} = 14.003\,074\ \mathrm{u}$, $^{16}\mathrm{O} = 15.994\,915\ \mathrm{u}$, with $^{12}\mathrm{C} = 12$ exactly by definition.

::: definition Degrees of unsaturation (double-bond equivalents) {#def-dbe}
For a molecular formula $\mathrm{C}_c\mathrm{H}_h\mathrm{N}_n\mathrm{O}_o\mathrm{X}_x$ (X = F, Cl, Br, I; divalent O and S in any number), the **degrees of unsaturation**, or **double-bond equivalents** (DBE), are
$$
\mathrm{DBE} = c - \frac{h + x}{2} + \frac{n}{2} + 1 .
$$ {#eq-dbe}
DBE is the number of rings plus $\pi$ bonds in any structure with that formula: a $\mathrm{C{=}C}$ or $\mathrm{C{=}O}$ counts one, a $\mathrm{C{\equiv}C}$ or $\mathrm{C{\equiv}N}$ two, a benzene ring four (one ring and three $\pi$ bonds). It is the same quantity as the degree of unsaturation of [[organic-1/organic-structures]], written per element.
:::

::: proposition DBE counts rings and π bonds {#prop-dbe}
For a neutral, closed-shell molecule in which C is tetravalent, N trivalent, O and S divalent, and H and halogens monovalent, equation [[#eq-dbe]] always returns a non-negative integer equal to the number of rings plus the number of $\pi$ bonds. More generally, with $n_i$ atoms of valence $v_i$,
$$
\mathrm{DBE} = 1 + \frac{1}{2}\sum_i n_i\,(v_i - 2) .
$$ {#eq-dbe-general}
:::

::: proof Counting edges of the molecular graph {#proof-dbe}
Treat the molecule as a connected graph: atoms are vertices, and a bond of order $k$ is $k$ edges. Each atom contributes as many edge-ends as its valence, so the number of edges is $E = \tfrac12\sum_i n_i v_i$. A connected graph on $V = \sum_i n_i$ vertices needs exactly $V - 1$ edges to be a tree (one $\sigma$-bonded acyclic skeleton); every edge beyond those closes either a ring or an extra bond between already-joined atoms, which is a $\pi$ bond. Hence
$$
\mathrm{DBE} = E - (V - 1) = \frac{1}{2}\sum_i n_i v_i - \sum_i n_i + 1 = 1 + \frac{1}{2}\sum_i n_i(v_i - 2),
$$
which is equation [[#eq-dbe-general]]. Inserting $v = 4$ for C, $3$ for N, $2$ for O and S and $1$ for H and X gives $1 + \tfrac12(2c + n - h - x) = c - \tfrac{h+x}{2} + \tfrac{n}{2} + 1$, equation [[#eq-dbe]]. Divalent atoms have $v - 2 = 0$ and drop out, which is why oxygen never changes the count. A half-integer result means the formula cannot belong to a neutral closed-shell molecule: it is a radical, an ion (an even-electron cation such as $\mathrm{C_7H_7^+}$ gives $4.5$), or a mistake.
:::

The valence assumptions matter. Sulfur in a sulfone or phosphorus in a phosphine oxide has more bonds than its "normal" valence, and equation [[#eq-dbe]] — which counts the $\mathrm{S{=}O}$ or $\mathrm{P{=}O}$ link as a single bond — then undercounts the $\pi$ bonds you would draw. This is bookkeeping, not chemistry: the count is still internally consistent, provided you use the same valences when you draw the structure.

::: proposition The nitrogen rule {#prop-nitrogen}
For a molecule containing only C, H, N, O, S, Si, P and the halogens, the nominal mass (computed with the most abundant isotope of each element) is **odd if and only if the molecule contains an odd number of nitrogen atoms**. The molecular ion $\mathrm{M^{+\bullet}}$ in an EI spectrum has the same parity; an even-electron fragment ion of a nitrogen-free molecule has *odd* $m/z$, and an odd-electron fragment ion (from a rearrangement) has *even* $m/z$.
:::

::: proof Parity of mass and valence {#proof-nitrogen}
List the elements with their nominal masses and valences: H $(1, 1)$, C $(12, 4)$, N $(14, 3)$, O $(16, 2)$, F $(19, 1)$, Si $(28, 4)$, P $(31, 3)$, S $(32, 2)$, Cl $(35, 1)$, Br $(79, 1)$, I $(127, 1)$. In every case except nitrogen, mass and valence have the same parity. The total valence $\sum_i n_i v_i = 2E$ is even, so the number of atoms of odd valence is even. The number of atoms of odd *mass* is that number minus the nitrogens (odd valence, even mass), so the nominal mass is odd exactly when $n$ is odd. Removing an electron does not change the mass number, so $\mathrm{M^{+\bullet}}$ follows the same rule; an even-electron fragment differs from a closed-shell molecule by one hydrogen atom (or one unpaired-electron's worth of bonding), which flips the parity.
:::

The nitrogen rule is the fastest test in structure determination. An EI molecular ion at $m/z\ 135$ demands one (or three) nitrogens; a base peak at $m/z\ 93$ from a nitrogen-free compound would be impossible as an even-electron ion and so must be a radical cation from a rearrangement, or the compound contains nitrogen after all.

### Isotope patterns: counting carbons and halogens

Carbon is $1.07\,\%$ $^{13}\mathrm{C}$ (IUPAC), so a molecule with $c$ carbons shows an $\mathrm{M+1}$ peak of about $1.08\,\%$ of $\mathrm{M}$ per carbon (the ratio of the abundances, $0.0107/0.9893$), plus small contributions from $^2\mathrm{H}$, $^{15}\mathrm{N}$ ($0.37\,\%$ per N) and $^{17}\mathrm{O}$. For nine carbons the $\mathrm{M+1}$ peak is about $9.7\,\%$ of $\mathrm{M}$ from carbon alone and $9.9\,\%$ with hydrogen and oxygen added — a measurement good to perhaps $\pm1$ carbon on a strong molecular ion, and useless on a weak one. Chlorine ($^{35}\mathrm{Cl} : {}^{37}\mathrm{Cl} = 75.76 : 24.24$) and bromine ($^{79}\mathrm{Br} : {}^{81}\mathrm{Br} = 50.69 : 49.31$) are far more conspicuous: one chlorine gives $\mathrm{M} : \mathrm{M+2} = 100 : 32$, one bromine nearly $1 : 1$, and $k$ equivalent halogen atoms give the binomial expansion $(a + b)^k$ of the two abundances. Sulfur's $^{34}\mathrm{S}$ ($4.25\,\%$) gives a modest $\mathrm{M+2}$ of about $4.4\,\%$ per sulfur.

::: widget distribution
dist: binomial
params: n=2, p=0.2424
caption: The number of $^{37}\mathrm{Cl}$ atoms in a molecule with $n$ chlorines is binomially distributed with $p = 0.2424$, so the bars are the relative heights of the $\mathrm{M}$, $\mathrm{M+2}$, $\mathrm{M+4}, \ldots$ peaks (bar $k$ is $\mathrm{M}+2k$). With $n = 2$ the pattern is $100 : 64 : 10$ relative to $\mathrm{M}$; with $n = 3$ it is $100 : 96 : 31 : 3$. Set $p = 0.4931$ to see bromine: one Br gives two bars of almost equal height, two Br the $1 : 2 : 1$ triplet that announces a dibromide from across the room.
:::

::: example Choosing a formula from an accurate mass {#ex-hrms}
The EI spectrum of the hawthorn-scented solid shows $\mathrm{M^{+\bullet}}$ at $m/z\ 150.0677$, with an $\mathrm{M+1}$ peak of $10\,\%$ and no significant $\mathrm{M+2}$. Candidate formulas of nominal mass 150 are $\mathrm{C_9H_{10}O_2}$, $\mathrm{C_8H_{10}N_2O}$, $\mathrm{C_{10}H_{14}O}$, $\mathrm{C_8H_6O_3}$ and $\mathrm{C_9H_{14}N_2}$. Which fits, and how many rings plus $\pi$ bonds must the structure have?
::: solution
The ion is a radical cation, so its mass is the neutral monoisotopic mass minus one electron ($0.000\,549\ \mathrm{u}$). For $\mathrm{C_9H_{10}O_2}$:
$$
9(12.000\,000) + 10(1.007\,825) + 2(15.994\,915) - 0.000\,549 = 150.0675 .
$$
The others, computed the same way, are $150.0788$ ($\mathrm{C_8H_{10}N_2O}$), $150.1039$ ($\mathrm{C_{10}H_{14}O}$), $150.0311$ ($\mathrm{C_8H_6O_3}$) and $150.1151$ ($\mathrm{C_9H_{14}N_2}$). The errors relative to the observed $150.0677$ are $+1.1$, $-74$, $-241$, $+244$ and $-316$ ppm; a modern instrument is good to about $\pm 3$ ppm, so only $\mathrm{C_9H_{10}O_2}$ survives. The isotope data agree: an $\mathrm{M+1}$ of $10\,\%$ is what nine carbons give ($9.9\,\%$ predicted), and the absence of $\mathrm{M+2}$ rules out Cl, Br and S. The nominal mass is even, consistent with zero (or two) nitrogens by [[#prop-nitrogen]] — the HRMS has already decided for zero. Finally
$$
\mathrm{DBE} = 9 - \frac{10}{2} + 1 = 5 ,
$$
the signature of a benzene ring (four) plus one more ring or $\pi$ bond — very often a carbonyl. Note that neglecting the electron mass would shift every candidate by $3.7$ ppm at this mass: small, but larger than the error budget of a good instrument.
:::
:::

::: warning The molecular ion may be missing {#warn-missing-m}
The highest-mass peak in an EI spectrum is not necessarily $\mathrm{M^{+\bullet}}$. Tertiary alcohols, many ethers and acetals, and highly branched alkanes fragment so fast that the molecular ion is weak or absent, and an alcohol's highest visible peak is often $\mathrm{M} - 18$ (loss of water). Three checks protect you: the putative $\mathrm{M}$ must obey the nitrogen rule; the losses from it to the next peaks must be chemically sensible (losses of 15, 18, 28, 29, 31 are common; losses of 4 to 13 or 21 to 25 are essentially impossible); and if in doubt, a soft ionisation method — electrospray or chemical ionisation, giving $[\mathrm{M+H}]^+$ or $[\mathrm{M+Na}]^+$ at $\mathrm{M} + 1$ or $\mathrm{M} + 23$ — will show the intact molecule. Mistaking a fragment for the molecular ion poisons every later step, because the formula and DBE are then wrong.
:::

## What each spectrum contributes

Each technique answers a different question, and the art is to ask each only the questions it answers well.

| technique | answers reliably | weak or silent on |
|---|---|---|
| MS / HRMS | molecular formula; Cl, Br, S; characteristic losses and fragment ions | connectivity of isomers; stereochemistry |
| IR | presence or absence of $\mathrm{O{-}H}$, $\mathrm{N{-}H}$, $\mathrm{C{=}O}$, $\mathrm{C{\equiv}N}$, $\mathrm{C{\equiv}C}$; type of carbonyl | carbon skeleton; anything below about $1500\ \mathrm{cm^{-1}}$ without a reference spectrum |
| $^{13}\mathrm{C}$ NMR (with DEPT) | number of inequivalent carbons; $\mathrm{C}$, $\mathrm{CH}$, $\mathrm{CH_2}$, $\mathrm{CH_3}$; carbonyl and aromatic carbons | relative numbers of carbons (peak heights are not quantitative) |
| $^1\mathrm{H}$ NMR | number of proton environments; their ratio (integration); neighbours ($n+1$ multiplicity, $J$); chemical environment (δ) | quaternary carbons and heteroatoms (seen only indirectly) |
| 2D NMR (COSY, HSQC, HMBC) | which protons couple; which carbon carries which proton; two- and three-bond C–H links | — (the tool for when 1D spectra are not enough) |

A few landmark values should be in your head, because they decide most problems at first sight (typical ranges from Pretsch et al.):

- **IR.** Broad $3200$–$3550\ \mathrm{cm^{-1}}$: hydrogen-bonded O–H; very broad $2500$–$3300$ with a carbonyl: carboxylic acid; one or two sharper bands $3300$–$3500$: N–H; $2250$: nitrile; $1735$–$1750$: saturated ester; $1705$–$1725$: saturated ketone or acid; $1680$–$1690$: aryl ketone; $1650$–$1690$: amide (amide I) with a band near $1550$ (amide II) for secondary amides; $1600$ and $1500$: aromatic ring.
- **$^{13}\mathrm{C}$.** $195$–$215$: ketone and aldehyde $\mathrm{C{=}O}$; $165$–$180$: acid, ester and amide $\mathrm{C{=}O}$; $110$–$160$: aromatic and alkene carbons; $50$–$90$: carbon attached to O (and about $40$–$60$ for N); $0$–$45$: other $sp^3$ carbons.
- **$^1\mathrm{H}$.** $9.5$–$10$: aldehyde; $10$–$13$: carboxylic acid; $6.5$–$8.2$: aromatic; $4.5$–$6.5$: alkene; $3.3$–$4.5$: $\mathrm{CH}$ on O (OCH$_3$ near $3.7$–$3.9$); $2.0$–$2.7$: $\mathrm{CH}$ α to C=O or on an aromatic ring; $0.8$–$1.8$: alkyl.

DEPT-135 deserves a sentence of its own because it turns the carbon count into a hydrogen count: $\mathrm{CH}$ and $\mathrm{CH_3}$ signals point up, $\mathrm{CH_2}$ signals point down, and quaternary carbons (including most carbonyls) vanish; DEPT-90 shows only $\mathrm{CH}$. Adding the hydrogens of all the DEPT-assigned carbons and comparing with the formula immediately reveals hydrogens on heteroatoms — OH, NH, SH — which no carbon spectrum can see.

## A procedure for structure determination

Experienced spectroscopists do not follow a fixed recipe, but they do follow an order, because each step narrows the space the next one must search.

::: algorithm Determining a structure from combined spectra {#alg-structure}
1. **Formula.** Establish the molecular formula from HRMS, or from the nominal $\mathrm{M}$ plus combustion analysis; check the nitrogen rule and the isotope pattern (C count, Cl, Br, S).
2. **DBE.** Compute rings plus $\pi$ bonds with equation [[#eq-dbe]]. DBE $\ge 4$ suggests a benzene ring; DBE $= 1$ allows one ring *or* one double bond.
3. **Functional groups.** Read the IR for O–H, N–H, C=O (and its type), C≡N, C≡C; note what is *absent* as carefully as what is present.
4. **Carbon count and types.** Count the $^{13}\mathrm{C}$ signals; fewer than the formula's carbons means symmetry. Use DEPT (or HSQC) to classify each carbon as C, CH, CH$_2$ or CH$_3$; sum the carbon-bound hydrogens and compare with the formula.
5. **Proton fragments.** Convert the $^1\mathrm{H}$ integrals to whole numbers of protons that add up to the formula's $h$; from shifts and multiplicities, write down fragments (CH$_3$CH$_2$–O, CH$_3$C=O, *para*-disubstituted ring …). Couplings with equal $J$ belong to neighbouring groups.
6. **Assemble.** Join the fragments, using the remaining atoms and DBE, into every structure consistent with them — list *all* candidates, not only the first that occurs to you.
7. **Discriminate.** For each candidate, predict shifts, multiplicities, IR bands and key fragment ions; eliminate candidates that contradict any datum. Use 2D NMR (HMBC especially) when 1D data cannot decide.
8. **Verify.** Check the survivor against every observation — every peak, every integral, every absence. An unexplained signal is either an impurity you can name or a sign that the structure is wrong.
:::

Two habits distinguish a sound solution from a lucky guess. First, *enumerate before you choose*: step 6 asks for every structure the fragments allow, because the commonest error is to stop at the first plausible isomer. Second, *let absences speak*: no O–H stretch excludes alcohols and acids at a stroke; no signal above δ 3.0 in the proton spectrum excludes $\mathrm{OCH}$ groups; no $^{13}\mathrm{C}$ signal above $160$ excludes carbonyls other than in very unusual cases.

## Worked unknowns

The four unknowns below grow in difficulty: a simple ester; an alcohol with an exchangeable proton; an aromatic compound with a near-identical isomer; and a nitrogen compound with a rearrangement in its mass spectrum.

::: example Unknown A: a fruity liquid, C₅H₁₀O₂ {#ex-ester}
A colourless liquid with a fruity odour gives $58.80\,\%$ C and $9.87\,\%$ H on combustion analysis; its EI mass spectrum shows a weak $\mathrm{M^{+\bullet}}$ at $m/z\ 102$ and strong peaks at $m/z\ 57$ and $29$. IR: $1738$ (strong), $1190\ \mathrm{cm^{-1}}$ (strong), nothing above $3000\ \mathrm{cm^{-1}}$ except C–H. NMR data:

| $^1\mathrm{H}$ δ | mult. ($J$/Hz) | integral | $^{13}\mathrm{C}$ δ | DEPT |
|---|---|---|---|---|
| 4.12 | q (7.1) | 2 | 174.5 | C |
| 2.31 | q (7.6) | 2 | 60.3 | CH$_2$ |
| 1.25 | t (7.1) | 3 | 27.6 | CH$_2$ |
| 1.13 | t (7.6) | 3 | 14.2 | CH$_3$ |
| | | | 9.1 | CH$_3$ |

Identify the compound.
::: solution
*Formula.* Oxygen by difference is $100 - 58.80 - 9.87 = 31.33\,\%$. Dividing by atomic masses: $\mathrm{C}\ 58.80/12.011 = 4.896$, $\mathrm{H}\ 9.87/1.008 = 9.79$, $\mathrm{O}\ 31.33/15.999 = 1.958$; in the ratio $2.50 : 5.00 : 1$, i.e. empirical formula $\mathrm{C_5H_{10}O_2}$ ($M = 102.13$). The molecular ion at 102 shows the empirical and molecular formulas coincide. Even mass, no nitrogen.

*DBE* $= 5 - 10/2 + 1 = 1$: one ring or one $\pi$ bond.

*IR.* A strong band at $1738\ \mathrm{cm^{-1}}$ with a strong C–O stretch near $1190$ and no O–H is a saturated ester, which uses up the single DBE and both oxygens.

*$^{13}\mathrm{C}$.* Five signals for five carbons: no symmetry. $174.5$ (C) is the ester carbonyl, $60.3$ ($\mathrm{CH_2}$) a carbon on oxygen, and three alkyl carbons remain.

*$^1\mathrm{H}$.* Integrals $2:2:3:3$ sum to 10, matching the formula. Two quartet–triplet pairs mean two ethyl groups; matching coupling constants pair them up: the $4.12$ quartet ($J = 7.1$) goes with the $1.25$ triplet ($J = 7.1$), and the $2.31$ quartet ($J = 7.6$) with the $1.13$ triplet ($J = 7.6$). The first ethyl group is on oxygen ($\mathrm{OCH_2}$ at δ 4.12, carbon at 60.3); the second is on the carbonyl ($\mathrm{CH_2C{=}O}$ at δ 2.31).

*Assemble.* $\mathrm{CH_3CH_2{-}C(=O){-}O{-}CH_2CH_3}$: **ethyl propanoate**. The isomeric esters of $\mathrm{C_5H_{10}O_2}$ are all excluded by the proton spectrum: methyl butanoate would show an $\mathrm{OCH_3}$ singlet at δ 3.67; propyl acetate an acetyl singlet at δ 2.05; isopropyl acetate a septet near δ 5.0 and a 6H doublet. Pentanoic acid, the same formula, would show a broad IR band from $2500$ to $3300$ and a proton near δ 11.

*Verify with MS.* α-Cleavage at the carbonyl gives the propanoyl (acylium) ion $\mathrm{CH_3CH_2C{\equiv}O^+}$ at $m/z\ 57$ and the ethyl cation at $m/z\ 29$: both are seen. Every datum is accounted for.
:::
:::

The proton spectrum of unknown A is drawn below from its shifts and couplings, assuming first-order behaviour (the $n + 1$ rule with binomial intensities) and a linewidth of $2\ \mathrm{Hz}$. The spectrometer frequency is on the slider.

::: widget plot
f: sum(0.25*binom(3,k)/(1+0.25*((x-4.12)*b-(k-1.5)*7.1)^2),k,0,3) + sum(0.25*binom(3,k)/(1+0.25*((x-2.31)*b-(k-1.5)*7.6)^2),k,0,3) + sum(0.75*binom(2,k)/(1+0.25*((x-1.25)*b-(k-1)*7.1)^2),k,0,2) + sum(0.75*binom(2,k)/(1+0.25*((x-1.13)*b-(k-1)*7.6)^2),k,0,2)
x: 0.8, 4.4
y: 0, 2.4
sliders: b=300:60:300:20
labels: \text{simulated } ^1\text{H spectrum}
caption: Simulated first-order $^1\mathrm{H}$ spectrum of ethyl propanoate (unknown A) against δ in ppm; the slider `b` is the spectrometer frequency in MHz. Note that δ increases to the *right* here, the opposite of a printed NMR spectrum. Couplings are fixed in hertz while shifts are fixed in ppm, so the multiplets shrink in ppm as the field rises. At $300\ \mathrm{MHz}$ the two triplets at δ 1.25 and 1.13 are cleanly separated; at $60\ \mathrm{MHz}$ they are only $7\ \mathrm{Hz}$ apart — about one coupling constant — and merge into a five-line jumble that a careless reader might call a quintet. (At such a small $\Delta\nu/J$ the real spectrum is also second-order, so even this simulation is too simple there.) The peak areas stay in the ratio $2 : 2 : 3 : 3$ at every field.
:::

::: example Unknown B: an aromatic alcohol, C₈H₁₀O {#ex-alcohol}
A colourless liquid has $\mathrm{M^{+\bullet}}$ at $m/z\ 122$ (HRMS $122.0726$, fitting $\mathrm{C_8H_{10}O}$) and EI peaks at $m/z\ 107$ (base peak), $79$ and $77$. IR: broad, strong $3360$; $3030$; $1600$, $1495$, $1450$; $1075$; strong $760$ and $700\ \mathrm{cm^{-1}}$. NMR:

| $^1\mathrm{H}$ δ | mult. ($J$/Hz) | integral | $^{13}\mathrm{C}$ δ | DEPT |
|---|---|---|---|---|
| 7.38–7.25 | m | 5 | 145.8 | C |
| 4.89 | q (6.5) | 1 | 128.5 | CH |
| 1.90 | br s | 1 | 127.5 | CH |
| 1.49 | d (6.5) | 3 | 125.4 | CH |
| | | | 70.4 | CH |
| | | | 25.2 | CH$_3$ |

On shaking the sample with a drop of $\mathrm{D_2O}$, the signal at δ 1.90 disappears. Identify the compound.
::: solution
*DBE* $= 8 - 10/2 + 1 = 4$: a benzene ring is the obvious candidate, confirmed by the IR ($3030$ aromatic C–H, $1600$ and $1495$ ring stretches), the five aromatic $^{13}\mathrm{C}$ … in fact four aromatic signals (145.8, 128.5, 127.5, 125.4) and the five-proton multiplet near δ 7.3.

*Ring substitution.* Five aromatic protons mean a **monosubstituted** benzene; the four aromatic carbon signals fit it exactly (*ipso* C, 2 *ortho*, 2 *meta*, 1 *para* — equivalent pairs by symmetry). The strong out-of-plane bends at $760$ and $700\ \mathrm{cm^{-1}}$ are the classic monosubstituted-benzene pair.

*The OH.* The broad IR band at $3360\ \mathrm{cm^{-1}}$ is a hydrogen-bonded O–H, and the broad one-proton singlet that vanishes with $\mathrm{D_2O}$ (exchange $\mathrm{ROH + D_2O \rightleftharpoons ROD + HOD}$) is that proton: its shift depends on concentration and temperature and carries no structural information beyond "OH". The DEPT count confirms it: carbon-bound hydrogens are $3\times\mathrm{CH}$ (aromatic, $2+2+1 = 5$ H) $+ 1$ (δ 70.4) $+ 3$ (CH$_3$) $= 9$, one short of the formula's ten.

*The side chain.* What remains is $\mathrm{C_2H_4}$ plus the OH: a $\mathrm{CH}$ at δC 70.4 (on oxygen) whose proton (δ 4.89) is a quartet, coupled with $J = 6.5$ to a methyl doublet (δ 1.49, $J = 6.5$). That is $\mathrm{CH_3{-}CH(OH){-}}$, and it must be attached to the ring (the CH at δ 4.89 is shifted downfield by both the oxygen and the ring).

*Assemble.* $\mathrm{C_6H_5{-}CH(OH){-}CH_3}$: **1-phenylethan-1-ol** (1-phenylethanol). Its isomers fail: 2-phenylethanol, $\mathrm{C_6H_5CH_2CH_2OH}$, would give two two-proton triplets (δ 3.85 and 2.86) and two $\mathrm{CH_2}$ carbons; benzyl methyl ether would show no OH and an $\mathrm{OCH_3}$ singlet; the methylbenzyl alcohols would show a 4H aromatic pattern and an $\mathrm{ArCH_3}$ singlet near δ 2.3.

*MS.* The base peak at $m/z\ 107$ is $\mathrm{M} - 15$: α-cleavage next to the oxygen expels the methyl radical and leaves the resonance-stabilised oxonium ion $\mathrm{C_6H_5CH{=}OH^+}$ — an even-electron ion of odd mass, as [[#prop-nitrogen]] requires; $m/z\ 79$ and $77$ follow from it by loss of CO and from the phenyl cation. Note that the molecule is chiral: the spectra cannot tell the enantiomers apart, and a sample of either, or the racemate, gives identical data in an achiral solvent.
:::
:::

::: quiz Which ester?
A compound $\mathrm{C_4H_8O_2}$ has IR $1742\ \mathrm{cm^{-1}}$ and a $^1\mathrm{H}$ spectrum of three singlet-free signals? No — of exactly three signals: δ 4.12 (q, 2H), 2.05 (s, 3H), 1.26 (t, 3H). Which compound is it?
- [ ] Methyl propanoate, $\mathrm{CH_3CH_2CO_2CH_3}$
- [x] Ethyl acetate, $\mathrm{CH_3CO_2CH_2CH_3}$
- [ ] Butanoic acid, $\mathrm{CH_3CH_2CH_2CO_2H}$
- [ ] Propyl formate, $\mathrm{HCO_2CH_2CH_2CH_3}$
::: solution
The quartet at δ 4.12 is a $\mathrm{CH_2}$ on oxygen next to a $\mathrm{CH_3}$ (the triplet at 1.26), so the ethyl group is the *alkoxy* part; the singlet at δ 2.05 is a methyl on the carbonyl. That is ethyl acetate. Methyl propanoate has the reverse arrangement — an $\mathrm{OCH_3}$ singlet at δ 3.67 and a $\mathrm{CH_2}$ quartet at δ 2.33 next to the carbonyl. Butanoic acid would show a broad O–H band and a proton near δ 11; propyl formate a formyl singlet at δ 8.1. Both esters have the same fragments (ethyl, methyl, ester); only the chemical shifts say which group is on which side of the ester oxygen.
:::
:::

::: example Unknown C: the hawthorn-scented solid, C₉H₁₀O₂ {#ex-anisyl}
The solid of [[#ex-hrms]] ($\mathrm{C_9H_{10}O_2}$, DBE 5) gives EI peaks at $m/z\ 150$ ($\mathrm{M^{+\bullet}}$, $40\,\%$), $135$ (base peak), $107$, $92$ and $77$. IR: $1676$ (strong), $1600$, $1510$, $1258$ (strong), $1170$, $1030$, $835\ \mathrm{cm^{-1}}$; no O–H. NMR:

| $^1\mathrm{H}$ δ | mult. ($J$/Hz) | integral | $^{13}\mathrm{C}$ δ | DEPT |
|---|---|---|---|---|
| 7.94 | d (8.9) | 2 | 196.8 | C |
| 6.93 | d (8.9) | 2 | 163.5 | C |
| 3.87 | s | 3 | 130.6 | CH |
| 2.55 | s | 3 | 130.3 | C |
| | | | 113.7 | CH |
| | | | 55.5 | CH$_3$ |
| | | | 26.3 | CH$_3$ |

Distinguish between the two candidates 1-(4-methoxyphenyl)ethan-1-one and methyl 4-methylbenzoate, which share the formula and the gross features.
::: solution
*Common ground.* DBE 5 is a benzene ring plus one C=O. Two two-proton doublets with the same $J = 8.9\ \mathrm{Hz}$ (an *ortho* coupling) form the AA′XX′ pattern of a **para-disubstituted** benzene, which also explains why nine carbons give only seven signals: the ring has a mirror plane through C1 and C4, so C2/C6 and C3/C5 are pairwise equivalent (four aromatic signals, two of them CH). The two 3H singlets are two isolated methyl groups. Both candidates, $\mathrm{CH_3O{-}C_6H_4{-}C(=O)CH_3}$ and $\mathrm{CH_3{-}C_6H_4{-}CO_2CH_3}$, have every one of these features. This is the situation step 7 of [[#alg-structure]] exists for.

*Discriminate.* Predict each datum for both:

| datum | observed | 1-(4-methoxyphenyl)ethanone | methyl 4-methylbenzoate |
|---|---|---|---|
| C=O stretch | $1676$ | aryl ketone, about $1675$–$1685$ | aryl ester, about $1715$–$1725$ |
| $^{13}\mathrm{C}$ C=O | $196.8$ | ketone, about $197$ | ester, about $167$ |
| $\mathrm{CH_3}$ on C | δH $2.55$, δC $26.3$ | acetyl, δH about $2.55$ | aryl methyl, δH about $2.40$, δC about $21.6$ |
| upfield ArH | δ $6.93$ | *ortho* to OMe, about $6.9$ | *ortho* to CH$_3$, about $7.2$ |
| EI base peak | $135$ | $\mathrm{M} - \mathrm{CH_3}$ ($\mathrm{CH_3OC_6H_4CO^+}$) | $\mathrm{M} - \mathrm{OCH_3} = 119$ |

Every row votes for the ketone. The $^{13}\mathrm{C}$ carbonyl alone is decisive — ketones lie $25$–$30$ ppm downfield of esters — and the aromatic carbon at δ 163.5 is an aromatic C–O (an ester's *ipso* carbons lie near 127–144). The IR band at $1258\ \mathrm{cm^{-1}}$ is the aryl–O stretch of an aryl methyl ether, and the conjugation of the ketone with an electron-rich ring lowers its C=O frequency below that of acetophenone ($1686\ \mathrm{cm^{-1}}$).

*Answer.* **1-(4-Methoxyphenyl)ethan-1-one** (4′-methoxyacetophenone), m.p. $38\ ^\circ\mathrm{C}$, which indeed smells of hawthorn. In the MS, α-cleavage gives the 4-methoxybenzoyl ion at $m/z\ 135$ (base peak), which loses CO to give $m/z\ 107$ ($\mathrm{CH_3OC_6H_4^+}$); the band at $835\ \mathrm{cm^{-1}}$ is the out-of-plane C–H bend typical of *para* substitution.
:::
:::

::: example Unknown D: a crystalline amide, odd molecular mass {#ex-amide}
A white crystalline solid shows $\mathrm{M^{+\bullet}}$ at $m/z\ 135$ ($35\,\%$; HRMS $135.0679$) and a base peak at $m/z\ 93$, with smaller peaks at $66$ and $43$. IR (KBr disc): $3295$ (sharp, medium), $1665$ (strong), $1600$, $1555$ (strong), $1500$, $755$, $695\ \mathrm{cm^{-1}}$. NMR:

| $^1\mathrm{H}$ δ | mult. ($J$/Hz) | integral | $^{13}\mathrm{C}$ δ | DEPT |
|---|---|---|---|---|
| 7.6 (variable) | br s | 1 | 168.5 | C |
| 7.49 | d (7.9) | 2 | 138.0 | C |
| 7.31 | t (7.9) | 2 | 129.0 | CH |
| 7.10 | t (7.4) | 1 | 124.3 | CH |
| 2.17 | s | 3 | 120.0 | CH |
| | | | 24.5 | CH$_3$ |

Identify the compound and explain the base peak.
::: solution
*Formula.* The odd molecular mass demands an odd number of nitrogens ([[#prop-nitrogen]]). The exact mass $135.0679$ fits $\mathrm{C_8H_9NO}$ (calculated $135.0679$ for the radical cation, $0.0$ ppm); the alternatives $\mathrm{C_9H_{13}N}$ ($135.1043$) and $\mathrm{C_7H_5NO_2}$? — no, the latter has mass $135.0315$ — are hundreds of ppm away. DBE $= 8 - 9/2 + 1/2 + 1 = 5$: ring plus one $\pi$ bond.

*Functional groups.* A single sharp N–H stretch ($3295$), an amide I band at $1665$ and a strong amide II band at $1555$ mean a **secondary amide**, $\mathrm{{-}C(=O){-}NH{-}}$. A primary amide would show two N–H stretches (symmetric and antisymmetric $\mathrm{NH_2}$), and a tertiary amide none.

*Ring.* Five aromatic protons in a $2:2:1$ pattern (doublet, triplet, triplet) and four aromatic carbon signals: a monosubstituted benzene. The broad 1H signal near δ 7.6, overlapping the aromatic region, is the NH; its shift moves with concentration and it exchanges with $\mathrm{D_2O}$ — a classic trap for anyone integrating the aromatic region as six protons.

*Assemble.* Remaining: a methyl singlet at δ 2.17 with δC 24.5 — an acetyl group, $\mathrm{CH_3C{=}O}$. Two arrangements of $\mathrm{C_6H_5}$, $\mathrm{NH}$, $\mathrm{C{=}O}$ and $\mathrm{CH_3}$ are secondary amides: $\mathrm{C_6H_5{-}NH{-}C(=O)CH_3}$ (*N*-phenylacetamide, acetanilide) and $\mathrm{C_6H_5{-}C(=O){-}NH{-}CH_3}$ (*N*-methylbenzamide). The second would put the methyl on nitrogen: δ about 3.0, a *doublet* ($J \approx 5\ \mathrm{Hz}$, coupled to NH), δC about 27. The observed singlet at δ 2.17 is an acetyl methyl: the compound is **N-phenylacetamide** (acetanilide). The aromatic carbon at δ 120.0 (*ortho* to N) and the *ipso* carbon at 138.0 fit an anilide nitrogen on the ring; in *N*-methylbenzamide the *ipso* carbon would be near 134.5 and the ring protons *ortho* to C=O near δ 7.75.

*Base peak.* $135 \to 93$ is a loss of $42$: ketene, $\mathrm{CH_2{=}C{=}O}$, by a rearrangement in which a hydrogen moves from the acetyl group to nitrogen. The product is the aniline radical cation, $\mathrm{C_6H_5NH_2^{+\bullet}}$ — an odd-electron ion, and with one nitrogen it has *odd* mass, exactly as the nitrogen rule demands for an odd-electron ion containing one N. The $m/z\ 43$ is $\mathrm{CH_3CO^+}$, and $66$ is loss of HCN from $m/z\ 93$.
:::
:::

## Traps, impurities and consistency checks

Most wrong structures are not caused by misreading a spectrum but by over-reading it: assigning meaning to a peak that is an artefact, or failing to notice that a signal hides two. A short checklist of the commonest traps follows.

**Exchangeable protons.** OH, NH and SH protons give signals whose shift depends on concentration, temperature, solvent and water content; they are often broad, may show no coupling to their neighbours (fast exchange averages the coupling away), and may be invisible altogether. In $\mathrm{CDCl_3}$ an alcohol OH can lie anywhere from δ 1 to 5, an amide NH from 5.5 to 8.5, a carboxylic acid OH from 10 to 13. The test is a $\mathrm{D_2O}$ shake; in DMSO-$d_6$, where exchange is slow, OH protons become sharp and do show couplings ($\mathrm{CH{-}OH}$ doublets for secondary alcohols), which can distinguish primary, secondary and tertiary alcohols.

**Solvent and common impurities.** Deuterated solvents are never 100 % deuterated, and samples are rarely 100 % pure. In $\mathrm{CDCl_3}$, residual $\mathrm{CHCl_3}$ gives a singlet at δ 7.26 (and the solvent carbon a $1:1:1$ triplet at δC 77.16); dissolved water gives a singlet near δ 1.56; acetone from washed glassware shows at 2.17, dichloromethane at 5.30, ethyl acetate at 4.12 (q), 2.05 (s) and 1.26 (t), and grease at 0.86 and 1.26. These values (and those for other solvents) are tabulated by Gottlieb, Kotlyar and Nudelman (1997) and by Fulmer and co-workers (2010); keep the table beside the spectrometer. Notice that ethyl acetate, the most common recrystallisation and chromatography solvent, mimics exactly the $\mathrm{OCH_2CH_3}$ group of an ethyl ester — a reason to check integrals against the formula rather than trust a pattern.

**Symmetry reduces signal counts.** Equivalent nuclei give one signal, so a compound often shows fewer signals than it has carbons or protons: *para*-disubstituted rings (two aromatic CH signals), *tert*-butyl groups (one 9H singlet, two carbons), isopropyl groups (one 6H doublet). Conversely, diastereotopic protons — the two $\mathrm{CH_2}$ hydrogens next to a stereocentre — are *not* equivalent and can give two signals and an extra coupling. Count signals, then ask what symmetry explains the count.

**Overlapping signals.** Two different groups with nearly equal shifts give one apparent multiplet whose integral is the sum — two methyls at δ 1.25 and 1.27 can look like one 6H doublet. Integrals that do not divide into the formula, or multiplicities that violate the $n+1$ rule, are the warnings. Higher field, a change of solvent (benzene-$d_6$ shifts many signals by $0.1$–$0.5$ ppm), or 2D spectra separate them.

**Quaternary carbons and heteroatoms are invisible in $^1\mathrm{H}$.** A carbonyl, a nitrile, a quaternary carbon or an ether oxygen interrupts the coupling network: protons on either side do not couple to each other (beyond weak long-range couplings), so the proton spectrum breaks into isolated **spin systems**. Joining those spin systems across the "silent" atoms is the job of the formula, the IR and — decisively — the HMBC spectrum, which shows two- and three-bond C–H correlations.

::: warning A plausible structure is not a proven one {#warn-proof}
"It fits" is not enough; a structure is established only when it explains every datum *and* every plausible alternative has been excluded by at least one datum it contradicts. The commonest failures are: stopping at the first isomer that comes to mind (unknown C has an ester isomer that fits most of the data); ignoring a small peak because it is inconvenient (it may be the OH, or a sign of a mixture); trusting $^{13}\mathrm{C}$ peak heights as if they were integrals (quaternary carbons relax slowly and lack nuclear Overhauser enhancement, so they are weak); and taking literature-like shift values as exact (predicted shifts are good to perhaps $\pm 0.2$ ppm for $^1\mathrm{H}$ and $\pm 3$–$5$ ppm for $^{13}\mathrm{C}$). When a decision rests on one small difference, get a second, independent datum: an HMBC cross-peak, a reference spectrum of an authentic sample, a melting point.
:::

The structure of unknown A can be summarised as a graph of fragments joined through the two "silent" atoms, the carbonyl carbon and the ester oxygen. The two proton spin systems (each an ethyl group) do not couple to each other; what joins them is chemistry — the formula, the IR ester band and, if needed, HMBC correlations from both $\mathrm{CH_2}$ groups to the carbonyl carbon at δC 174.5.

::: widget graph
nodes: CH3a@0,0; CH2b@1,0; CO@2,0; O@3,0; CH2c@4,0; CH3d@5,0
edges: CH3a-CH2b:7.6; CH2b-CO; CO-O; O-CH2c; CH2c-CH3d:7.1
algorithm: none
caption: Connectivity of ethyl propanoate (unknown A). Edges labelled with a weight are the vicinal couplings seen in the $^1\mathrm{H}$ spectrum ($J$ in Hz): they define two separate spin systems, $\mathrm{CH_3}$(a)–$\mathrm{CH_2}$(b) and $\mathrm{CH_2}$(c)–$\mathrm{CH_3}$(d). The unlabelled edges pass through the carbonyl carbon and the ester oxygen, which carry no protons and so break the coupling network. Which ethyl group sits on which side of the ester is decided by chemical shift ($\mathrm{OCH_2}$ at δ 4.12, $\mathrm{CH_2C{=}O}$ at δ 2.31), and could be confirmed by HMBC — both $\mathrm{CH_2}$ protons correlate with the carbonyl carbon, but only the δ 4.12 protons are three bonds from it through oxygen.
:::

A final round of **consistency checks** takes two minutes and catches most errors:

- The atoms of the proposed structure add up to the formula, and its rings plus $\pi$ bonds equal the DBE.
- The integrals, converted to protons, sum to the formula's hydrogens; the DEPT hydrogens plus exchangeable protons do too.
- The number of $^{13}\mathrm{C}$ signals equals the number of symmetry-inequivalent carbons of the structure.
- Every coupling appears twice, with the same $J$, in the two groups it connects.
- Every strong IR band above $1500\ \mathrm{cm^{-1}}$ is assigned, and no band expected for the structure is missing.
- The major fragment ions arise by sensible cleavages, and their parities obey the nitrogen rule.

## Where this leads

Real structure problems are larger: natural products with thirty carbons, reaction products whose stereochemistry matters, impurities at the $0.1\,\%$ level. The same procedure scales up, but the tools change. Two-dimensional NMR — COSY to trace spin systems, HSQC to attach every proton to its carbon, HMBC to bridge quaternary carbons and heteroatoms, NOESY to measure through-space distances and hence relative configuration — becomes the backbone, as [[spectroscopy/nmr-structure]] describes. Tandem mass spectrometry and LC–MS identify components of mixtures without isolation ([[spectroscopy/mass-spectrometry]]). Computer-assisted structure elucidation programs enumerate every structure consistent with a formula and 2D correlations and rank them by predicted spectra, and quantum-chemical prediction of NMR shifts can decide between diastereomers. When crystals are available, X-ray diffraction gives the structure directly, including absolute configuration. The stereochemical vocabulary for those problems is in [[organic-1/stereochemistry]], and the reactions whose products you will be identifying fill [[organic-2/carbonyl-addition]] and the chapters after it.

::: history
Before spectroscopy, a structure was proved by degradation to known compounds and by independent synthesis — a single natural product could occupy a laboratory for decades. The change came quickly after the Second World War. Commercial infrared spectrometers spread through industrial laboratories in the 1940s; in 1951 James Arnold, S. S. Dharmatti and Martin Packard at Stanford resolved the three proton signals of ethanol, showing that NMR could distinguish chemical environments; and in the 1950s Fred McLafferty and Klaus Biemann worked out how organic ions fragment, making mass spectra interpretable. The combined method was codified for students by Robert Silverstein and G. Clayton Bassler in *Spectrometric Identification of Organic Compounds* (first edition 1963), still in print. From 1965 the DENDRAL project at Stanford — Joshua Lederberg, Edward Feigenbaum, Bruce Buchanan and Carl Djerassi — built one of the first expert systems, to propose structures from mass spectra, the ancestor of today's computer-assisted structure elucidation. Two-dimensional NMR, proposed by Jean Jeener in 1971 and developed by Richard Ernst (Nobel Prize in Chemistry 1991), made the connectivity of large molecules routine; and the practical tables of NMR impurities by Gottlieb, Kotlyar and Nudelman (1997) became one of the most cited papers in organic chemistry.
:::

::: summary
- Start with the formula: HRMS (to a few ppm, remembering the electron mass for radical cations), or nominal $\mathrm{M}$ plus combustion analysis; isotope patterns count carbons ($\approx 1.1\,\%$ $\mathrm{M+1}$ per C) and reveal Cl ($100 : 32$), Br ($\approx 1 : 1$) and S.
- $\mathrm{DBE} = c - (h+x)/2 + n/2 + 1$ counts rings plus $\pi$ bonds (it is edges minus a spanning tree of the molecular graph); DBE $\ge 4$ suggests a benzene ring.
- The nitrogen rule: odd nominal mass $\Leftrightarrow$ odd number of N; even-electron fragments of N-free molecules have odd $m/z$.
- Ask each technique what it answers well: IR for functional groups (and their absence), $^{13}\mathrm{C}$/DEPT for carbon count and types, $^1\mathrm{H}$ for proton ratios, neighbours and environments, MS for formula and characteristic losses, HMBC to join spin systems across silent atoms.
- Follow the procedure — formula, DBE, groups, carbons, proton fragments, assemble *all* candidates, discriminate, verify — and enumerate isomers before choosing.
- Watch the traps: exchangeable OH/NH (use $\mathrm{D_2O}$), solvent and impurity peaks ($\mathrm{CHCl_3}$ 7.26, $\mathrm{H_2O}$ 1.56 in $\mathrm{CDCl_3}$), symmetry-reduced signal counts, overlapping multiplets, and non-quantitative $^{13}\mathrm{C}$ intensities.
- A structure is proved only when it explains every datum and each alternative is contradicted by at least one.
:::

## Exercises

::: exercise Degrees of unsaturation {level=1 check="5"}
Calculate the double-bond equivalents of $\mathrm{C_{10}H_{12}O_2}$ and suggest what they imply. (Enter the DBE.)
::: solution
$\mathrm{DBE} = 10 - 12/2 + 1 = 5$. Five rings plus $\pi$ bonds: very probably a benzene ring (four) and one C=O or C=C. Eugenol-type phenols, ethyl phenylacetate, 4-methoxyphenylacetone and propyl benzoate? — no, propyl benzoate is $\mathrm{C_{10}H_{12}O_2}$ as well — all fit; the formula alone leaves dozens of candidates, which is why spectra are needed.
:::
:::

::: exercise Counting carbon signals {level=1 check="3"}
1,3,5-Trimethylbenzene (mesitylene) shows $^1\mathrm{H}$ signals at δ 6.78 (s, 3H) and 2.26 (s, 9H). How many signals does its proton-decoupled $^{13}\mathrm{C}$ spectrum show? (Enter the number of signals.)
::: solution
The molecule has threefold symmetry (point group $D_{3h}$): all three methyl carbons are equivalent, all three methyl-bearing ring carbons are equivalent, and all three CH ring carbons are equivalent. Nine carbons therefore give **three** signals (observed near δC 137.7 (C), 127.0 (CH) and 21.2 ($\mathrm{CH_3}$)). The proton spectrum is correspondingly simple: two singlets in the ratio $3 : 9 = 1 : 3$, with no resolved coupling because the aromatic protons are mutually *meta* and equivalent.
:::
:::

::: exercise The nitrogen rule {level=1 check="11"}
An amine containing only C, H and one N has an EI molecular ion at $m/z\ 121$ and eight carbons. How many hydrogens does it contain? (Enter the number of H atoms.)
::: solution
The mass of $\mathrm{C_8N}$ is $8 \times 12 + 14 = 110$, leaving $121 - 110 = 11$ for hydrogen: $\mathrm{C_8H_{11}N}$. The odd mass agrees with one nitrogen. Check with the DBE: $8 - 11/2 + 1/2 + 1 = 4$, an integer — as it must be for a neutral closed-shell molecule — and suggestive of a benzene ring, as in 2-phenylethanamine, *N*,*N*-dimethylaniline or the ethylanilines. Had the arithmetic given a half-integer DBE, the hydrogen count would be wrong.
:::
:::

::: exercise A formula from an accurate mass {level=2 check="2"}
A compound gives $\mathrm{M^{+\bullet}}$ at $m/z\ 136.0519$. The candidates are $\mathrm{C_8H_8O_2}$, $\mathrm{C_9H_{12}O}$ and $\mathrm{C_5H_4N_4O}$. Which is correct? (Enter the number of oxygen atoms in the correct formula.)
::: solution
Radical-cation masses (neutral monoisotopic mass minus $0.000\,549$): $\mathrm{C_8H_8O_2}$, $96 + 8.062\,600 + 31.989\,829 - 0.000\,549 = 136.0519$; $\mathrm{C_9H_{12}O}$, $136.0883$; $\mathrm{C_5H_4N_4O}$, $136.0380$. The errors are $0.1$, $-267$ and $+103$ ppm, so the formula is $\mathrm{C_8H_8O_2}$, with **2** oxygens (DBE 5; methyl benzoate and 4-methoxybenzaldehyde are among its isomers). The nitrogen-rich candidate also fails the nitrogen rule test in a subtler way: four nitrogens give an even mass, so the rule alone could not exclude it — only the accurate mass can.
:::
:::

::: exercise A bromine–chlorine isotope pattern {level=2 check="129"}
1-Bromo-4-chlorobenzene has one Br and one Cl. Using $^{35}\mathrm{Cl} : {}^{37}\mathrm{Cl} = 75.76 : 24.24$ and $^{79}\mathrm{Br} : {}^{81}\mathrm{Br} = 50.69 : 49.31$, predict the heights of the $\mathrm{M+2}$ and $\mathrm{M+4}$ peaks relative to $\mathrm{M}$ (ignore $^{13}\mathrm{C}$). (Enter the $\mathrm{M+2}$ height as a percentage of $\mathrm{M}$.)
::: solution
The isotopologue probabilities multiply: $\mathrm{M}$ ($^{79}\mathrm{Br}{}^{35}\mathrm{Cl}$) $= 0.5069 \times 0.7576 = 0.3840$; $\mathrm{M+2}$ ($^{81}\mathrm{Br}{}^{35}\mathrm{Cl}$ or $^{79}\mathrm{Br}{}^{37}\mathrm{Cl}$) $= 0.4931 \times 0.7576 + 0.5069 \times 0.2424 = 0.3736 + 0.1229 = 0.4964$; $\mathrm{M+4}$ ($^{81}\mathrm{Br}{}^{37}\mathrm{Cl}$) $= 0.4931 \times 0.2424 = 0.1195$. Relative to $\mathrm{M}$: $100 : 129 : 31$. The $\mathrm{M+2}$ peak is *taller* than $\mathrm{M}$ — a pattern that identifies BrCl at a glance and that neither two Cl ($100 : 64 : 10$) nor two Br ($100 : 195 : 95$) can mimic.
:::
:::

::: exercise A small ester {level=2 check="57"}
A liquid $\mathrm{C_4H_8O_2}$ shows IR $1740\ \mathrm{cm^{-1}}$ and $^1\mathrm{H}$ NMR δ 3.67 (s, 3H), 2.33 (q, $J = 7.6$, 2H), 1.14 (t, $J = 7.6$, 3H); $^{13}\mathrm{C}$ δ 174.9, 51.6, 27.5, 9.2. Identify it, and give the $m/z$ of the acylium ion formed by α-cleavage that loses the methoxy radical. (Enter the $m/z$.)
::: solution
DBE $= 4 - 4 + 1 = 1$, used by the ester C=O ($1740\ \mathrm{cm^{-1}}$, δC 174.9). The 3H singlet at δ 3.67 with δC 51.6 is an $\mathrm{OCH_3}$ — a methyl ester; the ethyl group (quartet δ 2.33, triplet 1.14, same $J$) is on the carbonyl, its $\mathrm{CH_2}$ at δ 2.33 typical of $\mathrm{CH_2C{=}O}$. The compound is **methyl propanoate**, $\mathrm{CH_3CH_2CO_2CH_3}$; its isomer ethyl acetate (the quiz) has the OCH$_2$ quartet at δ 4.12 and an acetyl singlet at 2.05 instead. Loss of $\mathrm{CH_3O^\bullet}$ (31) from $\mathrm{M^{+\bullet}}$ (88) gives $\mathrm{CH_3CH_2C{\equiv}O^+}$ at $m/z$ **57**, an even-electron ion with odd mass as the nitrogen rule requires.
:::
:::

::: exercise Two aryl ketones {level=3 check="7"}
A compound $\mathrm{C_9H_{10}O}$ has IR $1683\ \mathrm{cm^{-1}}$; $^1\mathrm{H}$ δ 7.86 (d, $J = 8.2$, 2H), 7.25 (d, $J = 8.2$, 2H), 2.57 (s, 3H), 2.41 (s, 3H); MS $m/z$ 134, 119 (base), 91. (a) Identify it and explain why it is not propiophenone, $\mathrm{C_6H_5COCH_2CH_3}$. (b) How many signals does its $^{13}\mathrm{C}$ spectrum show? (Enter the number of $^{13}\mathrm{C}$ signals.)
::: hint
DBE first; then ask what two doublets of 2H each with the same $J$ mean for the ring.
:::
::: solution
(a) DBE $= 9 - 5 + 1 = 5$: a benzene ring plus C=O; the IR band at $1683\ \mathrm{cm^{-1}}$ is a conjugated (aryl) ketone. Two 2H doublets with one *ortho* $J$ mean a *para*-disubstituted ring. The two methyl singlets are an acetyl group (δ 2.57, on C=O) and an aryl methyl (δ 2.41, on the ring). The compound is **1-(4-methylphenyl)ethan-1-one** (4′-methylacetophenone). Propiophenone would show a monosubstituted ring (5H: 7.97 (2H), 7.55 (1H), 7.45 (2H)) and an ethyl group, a quartet at δ 2.99 and a triplet at 1.23 — no singlets at all. The MS agrees: $134 - 15 = 119$ is the 4-methylbenzoyl ion (α-cleavage losing $\mathrm{CH_3^\bullet}$), which loses CO to give the $\mathrm{C_7H_7^+}$ ion at $m/z\ 91$; propiophenone instead loses the ethyl radical to give the benzoyl ion at $m/z\ 105$.
(b) The *para* ring has a mirror plane through C1 and C4, so its six carbons give four signals (C1, C2/6, C3/5, C4); add C=O, the acetyl $\mathrm{CH_3}$ and the aryl $\mathrm{CH_3}$: **7** signals (observed near δC 197.8, 143.9, 134.8, 129.3, 128.5, 26.5, 21.6).
:::
:::

::: exercise A ketone with a septet {level=3 check="43"}
A volatile liquid $\mathrm{C_5H_{10}O}$ has IR $1715\ \mathrm{cm^{-1}}$ (no O–H, no aldehyde C–H near $2720$); $^1\mathrm{H}$ δ 2.58 (septet, $J = 7.0$, 1H), 2.13 (s, 3H), 1.10 (d, $J = 7.0$, 6H); $^{13}\mathrm{C}$ δ 212.5, 41.6, 27.5, 18.2. (a) Identify the compound, excluding pentan-2-one and pentan-3-one explicitly. (b) Its EI base peak comes from α-cleavage that leaves the smaller acylium ion. Give its $m/z$. (Enter the $m/z$.)
::: solution
(a) DBE $= 5 - 5 + 1 = 1$, used by a saturated ketone ($1715\ \mathrm{cm^{-1}}$, δC 212.5); no aldehyde C–H stretch near $2720\ \mathrm{cm^{-1}}$ and no proton near δ 9.7 exclude pentanal. Four carbon signals for five carbons means two carbons are equivalent: the 6H doublet is two equivalent methyls on a CH (the septet: $6 + 1 = 7$ lines), i.e. an isopropyl group, and the 3H singlet at δ 2.13 is a methyl ketone. The structure is $\mathrm{CH_3C(=O)CH(CH_3)_2}$, **3-methylbutan-2-one**. Pentan-3-one, $(\mathrm{CH_3CH_2})_2\mathrm{CO}$, would show only a quartet and a triplet ($2:3$) and three carbon signals; pentan-2-one would show a 3H singlet, a 2H triplet, a 2H sextet and a 3H triplet, and five carbon signals.
(b) α-Cleavage on either side of the carbonyl gives $(\mathrm{CH_3})_2\mathrm{CHC{\equiv}O^+}$ ($m/z\ 71$) or $\mathrm{CH_3C{\equiv}O^+}$; the base peak is the acetyl ion at $m/z$ **43** ($12 + 3 + 12 + 16$), with the isopropyl cation (also 43) contributing. Pentan-3-one, by contrast, has its base peak at $m/z\ 57$ ($\mathrm{C_2H_5CO^+}$).
:::
:::

::: exercise DBE for other elements {level=3 check="12"}
Starting from equation [[#eq-dbe-general]], derive the DBE expression for a formula $\mathrm{C}_c\mathrm{H}_h\mathrm{Si}_s\mathrm{P}_p\mathrm{O}_o$ with tetravalent Si and trivalent P, and apply it to triphenylphosphine, $\mathrm{C_{18}H_{15}P}$. Check your answer by counting rings and $\pi$ bonds in the structure. (Enter the DBE of triphenylphosphine.)
::: solution
With $v - 2 = 2$ for C and Si, $1$ for P, $0$ for O and $-1$ for H: $\mathrm{DBE} = 1 + \tfrac12(2c + 2s + p - h) = c + s - \tfrac{h}{2} + \tfrac{p}{2} + 1$. Silicon behaves exactly like carbon and trivalent phosphorus exactly like nitrogen. For $\mathrm{C_{18}H_{15}P}$: $\mathrm{DBE} = 18 - 7.5 + 0.5 + 1 = $ **12**. The structure, $\mathrm{P(C_6H_5)_3}$, has three benzene rings, each one ring plus three $\pi$ bonds: $3 \times 4 = 12$. For triphenylphosphine oxide, $\mathrm{C_{18}H_{15}OP}$, the formula still gives 12, because the P=O bond is counted with P "trivalent" and O divalent as a single bond plus nothing — the same bookkeeping caveat that applies to sulfones, discussed after [[#proof-dbe]].
:::
:::

::: exercise Spotting the impurity {level=2}
A sample of 1-phenylethanol in $\mathrm{CDCl_3}$ shows, in addition to the signals of [[#ex-alcohol]], small signals at δ 7.26 (s), 5.30 (s), 2.05 (s), 4.12 (q) and 1.26 (t), and the OH signal has moved to δ 2.3. Account for every extra signal and for the movement of the OH.
::: solution
δ 7.26 is residual $\mathrm{CHCl_3}$ in the solvent (always present, partly hidden under the aromatic multiplet of this compound); δ 5.30 is dichloromethane; δ 2.05 (s), 4.12 (q) and 1.26 (t), in the ratio $3 : 2 : 3$, are ethyl acetate, presumably left from chromatography — the three signals must integrate in that ratio to one another, which is how you tell a solvent from part of your compound. The OH shift depends on concentration, temperature and water content: hydrogen bonding moves it downfield in more concentrated or drier samples, so a shift from δ 1.90 to 2.3 means nothing structurally. The tables of Gottlieb et al. (1997) and Fulmer et al. (2010) list all of these; the cure for the solvents is longer drying under vacuum, not reinterpretation.
:::
:::
