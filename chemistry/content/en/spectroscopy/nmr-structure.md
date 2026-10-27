A colourless liquid with the molecular formula $\mathrm{C_4H_8O_2}$ smells of pear drops. Four structures that fit the formula are esters — ethyl acetate, methyl propanoate, propyl formate and isopropyl formate — and a dozen more are acids, hydroxy ketones or cyclic ethers. A proton NMR spectrum, recorded in five minutes on a few milligrams, settles the question: three signals, of relative areas $2:3:3$, a four-line signal at $\delta\,4.12$, a sharp single line at $2.04$ and a three-line signal at $1.26$. By the end of this lesson you will read that sentence as a structure: $\mathrm{CH_3C(O)OCH_2CH_3}$. Nuclear magnetic resonance is the single most powerful tool of structure determination in chemistry because every signal carries four independent pieces of information — how many kinds of nucleus there are, what electronic environment each sits in, how many of each there are, and which other nuclei each is coupled to — and because two-dimensional experiments turn the last of these into an explicit map of the bonds.

[[spectroscopy/nmr-principles]] explained where the chemical shift and the spin–spin coupling come from: shielding of the nucleus by circulating electrons, and the transmission of nuclear spin orientation through bonding electrons. This lesson takes those two quantities as given and teaches you to *use* them: to turn a $^{1}\mathrm{H}$ spectrum, a $^{13}\mathrm{C}$ spectrum with its DEPT edits, and a set of COSY, HSQC and HMBC correlations into a constitution, and coupling constants and NOEs into stereochemistry. The vocabulary of structure — constitution, functional groups, degrees of unsaturation — is that of [[organic-1/organic-structures]]; the stereochemical vocabulary is that of [[organic-1/stereochemistry]].

## Four pieces of information in a proton spectrum

A routine $^{1}\mathrm{H}$ spectrum is a plot of absorption intensity against chemical shift $\delta$ in parts per million (ppm) from tetramethylsilane (TMS, $\delta = 0$), with high $\delta$ ("downfield", deshielded) on the *left*. Before any of it is read, the molecular formula, if known, is converted into the number of rings plus $\pi$ bonds.

::: definition Degree of unsaturation {#def-dbe}
For a compound $\mathrm{C}_c\mathrm{H}_h\mathrm{N}_n\mathrm{O}_o\mathrm{X}_x$ (X = halogen), the **degree of unsaturation** (double-bond equivalents, DBE) is
$$
\mathrm{DBE} = \frac{2c + 2 + n - h - x}{2},
$$ {#eq-dbe}
the number of rings plus $\pi$ bonds. Oxygen and sulfur do not enter. A benzene ring counts four (one ring, three $\pi$ bonds), a $\mathrm{C{=}O}$ or $\mathrm{C{=}C}$ one, a $\mathrm{C{\equiv}N}$ two.
:::

For $\mathrm{C_4H_8O_2}$, $\mathrm{DBE} = (8 + 2 - 8)/2 = 1$: one ring or one double bond. A $\mathrm{DBE}$ of 4 or more in a small molecule should make you look for an aromatic ring in the region $\delta\,6.5$–$8.5$.

The spectrum itself is then read in four passes: the **number of signals** (how many sets of chemically equivalent protons), their **chemical shifts** (what each set is attached to), their **integrals** (how many protons are in each set) and their **multiplicities** (how many protons sit on neighbouring atoms). The first pass needs a precise idea of equivalence.

::: definition Homotopic, enantiotopic and diastereotopic nuclei {#def-equivalence}
Two nuclei in a molecule are compared by replacing each in turn by a test group Z and comparing the two products.

- If the products are identical (the nuclei are interchanged by a rotation $C_n$ of the molecule or by fast rotation about a single bond), the nuclei are **homotopic**: they are chemically equivalent in every environment and give one signal. The three protons of a methyl group are homotopic.
- If the products are enantiomers (the nuclei are interchanged only by a mirror plane or another improper operation), the nuclei are **enantiotopic**: they are equivalent in an achiral solvent and give one signal, but may differ in a chiral one. The two $\mathrm{CH_2}$ protons of ethanol are enantiotopic.
- If the products are diastereomers, the nuclei are **diastereotopic**: they are chemically *non*-equivalent, have in general different chemical shifts, and couple to each other. The two $\mathrm{CH_2}$ protons next to a stereocentre, as in $\mathrm{CH_3CH_2CH(OH)CH_3}$ (butan-2-ol), are diastereotopic, however fast the bond rotates.

Nuclei that are chemically equivalent and also couple identically to every other nucleus are **magnetically equivalent**; only magnetically equivalent groups give the simple first-order patterns below.
:::

### Chemical shift regions

Chemical shift reports the local electron density and the anisotropic fields of nearby $\pi$ systems. Electronegative neighbours withdraw electron density and deshield; $\pi$ bonds deshield protons that lie in the plane of the ring or the double bond (the ring-current effect that puts benzene at $\delta\,7.27$) and shield those above it. The ranges in the table are typical values for solutions in $\mathrm{CDCl_3}$, as compiled by Pretsch, Bühlmann and Badertscher (*Structure Determination of Organic Compounds*) and by Silverstein and co-workers.

| proton environment | typical $\delta_\mathrm{H}$ / ppm |
|---|---|
| alkyl $\mathrm{C{-}CH_3}$, $\mathrm{C{-}CH_2{-}C}$ | 0.8–1.8 |
| $\mathrm{CH}$ next to $\mathrm{C{=}O}$, $\mathrm{C{=}C}$ or an aromatic ring | 2.0–2.7 |
| alkyne $\mathrm{{\equiv}C{-}H}$ | 1.8–3.1 |
| $\mathrm{CH}$ on carbon bearing N, halogen or O | 2.2–4.5 |
| alkene $\mathrm{{=}C{-}H}$ | 4.5–6.5 |
| aromatic $\mathrm{Ar{-}H}$ | 6.5–8.5 |
| aldehyde $\mathrm{{-}CHO}$ | 9.4–10.1 |
| carboxylic acid $\mathrm{{-}COOH}$ | 10–13 (broad) |
| $\mathrm{O{-}H}$, $\mathrm{N{-}H}$ of alcohols, phenols, amines, amides | 0.5–9, variable |

The last row is the exception to every rule: protons on heteroatoms take part in hydrogen bonding and chemical exchange, so their shifts depend on concentration, temperature and solvent, and their signals are often broad.

For methylene groups between two substituents there is a useful empirical additivity scheme.

::: proposition Shoolery's rule (empirical) {#prop-shoolery}
The chemical shift of a methylene group $\mathrm{X{-}CH_2{-}Y}$ is estimated as
$$
\delta(\mathrm{XCH_2Y}) \approx 0.23 + \sigma_\mathrm{X} + \sigma_\mathrm{Y},
$$ {#eq-shoolery}
where $0.23$ is the shift of methane and the substituent constants are, in ppm: $\mathrm{{-}CH_3}$ 0.47, $\mathrm{{-}C{=}C}$ 1.32, $\mathrm{{-}COOR}$ 1.55, $\mathrm{{-}NR_2}$ 1.57, $\mathrm{{-}C(O)R}$ 1.70, $\mathrm{{-}C{\equiv}N}$ 1.70, $\mathrm{{-}I}$ 1.82, $\mathrm{{-}Ph}$ 1.85, $\mathrm{{-}Br}$ 2.33, $\mathrm{{-}OR}$ 2.36, $\mathrm{{-}Cl}$ 2.53, $\mathrm{{-}OH}$ 2.56, $\mathrm{{-}OC(O)R}$ 3.13 (the set tabulated by Silverstein et al.). The rule is empirical; it is usually good to about $\pm 0.2$ ppm when X and Y are both functional groups, and less reliable when one of them is an alkyl group or when the two interact.
:::

The rule works because shielding contributions of separate substituents are, to first order, independent perturbations of the local electron density; it fails where they are not — two carbonyl groups conjugated through the $\mathrm{CH_2}$, or a ring that holds the substituents in a fixed geometry. Extended versions exist for methine protons, for alkenes (the Pascual–Meier–Simon increments) and for benzene rings; all are interpolations of measured data, not laws.

::: example Estimating methylene shifts {#ex-shoolery}
Estimate $\delta_\mathrm{H}$ for the $\mathrm{CH_2}$ groups of (a) benzyl chloride $\mathrm{PhCH_2Cl}$, (b) dichloromethane $\mathrm{CH_2Cl_2}$ and (c) butan-2-one $\mathrm{CH_3C(O)CH_2CH_3}$, and compare with the measured values $4.57$, $5.30$ and $2.44$ ppm.
::: solution
Apply equation [[#eq-shoolery]] with the tabulated constants.

(a) $\delta = 0.23 + 1.85\ (\mathrm{Ph}) + 2.53\ (\mathrm{Cl}) = 4.61$ ppm, against $4.57$ measured.

(b) $\delta = 0.23 + 2 \times 2.53 = 5.29$ ppm, against $5.30$.

(c) $\delta = 0.23 + 1.70\ (\mathrm{C(O)R}) + 0.47\ (\mathrm{CH_3}) = 2.40$ ppm, against $2.44$.

All three agree to $0.05$ ppm, which is better than the rule usually does. The same arithmetic for the $\mathrm{OCH_2}$ of ethyl acetate, $0.23 + 3.13 + 0.47 = 3.83$ ppm, falls $0.3$ ppm short of the measured $4.12$: when one substituent is a plain alkyl group the rule loses accuracy, which is why the statement carries its caveat.
:::
:::

### Integration

The area of a $^{1}\mathrm{H}$ signal is proportional to the number of protons that produce it, provided the spectrum is recorded with a relaxation delay long enough for every proton to return to equilibrium between scans (typically five times the longest $T_1$). The spectrometer prints the integral as a number or a step height in arbitrary units; only ratios mean anything.

To convert integrals into proton counts, divide each by the smallest, look for the simplest set of whole numbers in that ratio, and scale the total to the hydrogen count of the molecular formula. Integrals are reliable to a few per cent: a ratio of $2.96 : 2.02$ is $3 : 2$, not $3 : 2.02$. In a mixture, integrals measure *molar* ratios after dividing each by its number of protons, which is the basis of quantitative NMR (qNMR) with an internal standard.

::: example Ethyl acetate from its proton spectrum {#ex-ethyl-acetate}
A compound $\mathrm{C_4H_8O_2}$ shows $^{1}\mathrm{H}$ signals at $\delta\,4.12$ (quartet, $J = 7.1$ Hz, integral 20.4), $2.04$ (singlet, integral 30.9) and $1.26$ (triplet, $J = 7.1$ Hz, integral 30.6). Deduce the structure.
::: solution
**Unsaturation.** $\mathrm{DBE} = 1$: one $\mathrm{C{=}O}$ or $\mathrm{C{=}C}$, or one ring.

**Integrals.** The total is $81.9$ units for $8$ H, so the signals contain $20.4 \times 8/81.9 = 1.99$, $3.02$ and $2.99$ protons: $\mathrm{CH_2}$, $\mathrm{CH_3}$, $\mathrm{CH_3}$.

**Multiplicities.** The quartet ($2$ H) has three neighbouring protons; the triplet ($3$ H) has two, and the two signals share $J = 7.1$ Hz, so they couple to each other: an ethyl group $\mathrm{CH_3CH_2{-}}$. The singlet methyl has no protons on the adjacent atom.

**Shifts.** A $\mathrm{CH_2}$ at $4.12$ is on a carbon bearing oxygen, and the value lies above the $3.4$–$3.6$ of an ether or alcohol, as expected for an ester oxygen $\mathrm{{-}OC(O)R}$. A methyl singlet at $2.04$ sits next to a carbonyl group.

**Assembly.** $\mathrm{CH_3CH_2O{-}}$ and $\mathrm{CH_3C(O){-}}$ use $\mathrm{C_4H_8O_2}$ completely, and the single DBE is the $\mathrm{C{=}O}$: the compound is ethyl acetate, $\mathrm{CH_3C(O)OCH_2CH_3}$. Its isomer methyl propanoate, $\mathrm{CH_3CH_2C(O)OCH_3}$, also has an ethyl group and a methyl singlet, but the shifts swap roles: the methyl singlet is the one on oxygen ($\delta\,3.67$) and the quartet is next to the carbonyl ($\delta\,2.32$). The *shifts*, not the multiplicities, distinguish the two.
:::
:::

## Multiplicity and coupling constants

Spin–spin coupling splits the signal of a nucleus according to the spin states of its neighbours. For a spectrum in which the shift difference between coupled groups, in hertz, is large compared with their coupling constant (in practice $\Delta\nu/J \gtrsim 10$), the patterns are **first order** and follow a counting rule.

::: proposition The n + 1 rule {#prop-multiplicity}
In a first-order spectrum, a proton (or a set of equivalent protons) coupled with the same coupling constant $J$ to $n$ equivalent spin-$\tfrac12$ nuclei gives $n + 1$ lines separated by $J$, with intensities in the ratio of the binomial coefficients $\binom{n}{k}$, $k = 0, \ldots, n$ (Pascal's triangle: $1{:}1$, $1{:}2{:}1$, $1{:}3{:}3{:}1$, …). If it is coupled to several groups of $n_1, n_2, \ldots$ nuclei with different constants $J_1, J_2, \ldots$, the multiplet has up to $(n_1 + 1)(n_2 + 1)\cdots$ lines. More generally, coupling to $n$ equivalent nuclei of spin $I$ gives $2nI + 1$ lines. Couplings between magnetically equivalent nuclei do not appear in the spectrum.
:::

::: proof Counting spin states {#proof-multiplicity}
In the first-order limit the energy of the observed transition is shifted by $J \sum_i m_i$, where $m_i = \pm\tfrac12$ is the magnetic quantum number of neighbour $i$; the neighbours' own spin states are not changed by the transition. For $n$ equivalent neighbours the sum $\sum_i m_i$ takes the values $\tfrac{n}{2} - k$, $k = 0, 1, \ldots, n$ — that is, $n + 1$ values one unit apart — and the number of configurations giving each value is the number of ways of choosing which $k$ of the $n$ spins point down, $\binom{n}{k}$. At room temperature the $\alpha$ and $\beta$ states are equally populated to within about $10^{-5}$, so every configuration is equally likely and the line intensities are proportional to $\binom{n}{k}$. For two groups the shifts $J_1 \sum m_i + J_2 \sum m_j$ combine independently, giving the product of the two line counts (fewer if some combinations coincide — when $J_1 = J_2$ the pattern collapses to $n_1 + n_2 + 1$ lines). For spin $I$, each nucleus contributes $2I + 1$ values of $m$, and $n$ of them give $\sum m_i$ from $-nI$ to $+nI$: $2nI + 1$ lines. That couplings within a magnetically equivalent group are invisible follows from the total spin of the group being conserved by the observed transitions, a result proved in [[spectroscopy/nmr-principles]].
:::

The deuterium version of the rule is visible in every spectrum run in deuterochloroform: the $^{13}\mathrm{C}$ signal of $\mathrm{CDCl_3}$ at $\delta\,77.16$ is a $1{:}1{:}1$ triplet, because one $^{2}\mathrm{H}$ nucleus ($I = 1$) gives $2 \times 1 \times 1 + 1 = 3$ lines.

::: widget plot
f: w^2/((x-(a+b)/2)^2+w^2) + w^2/((x-(a-b)/2)^2+w^2) + w^2/((x+(a-b)/2)^2+w^2) + w^2/((x+(a+b)/2)^2+w^2)
x: -20, 20
y: 0, 2.2
sliders: a=10:0:16:0.1; b=4:0:16:0.1; w=0.6:0.2:3:0.1
labels: \text{doublet of doublets}
caption: A proton coupled to two non-equivalent neighbours, drawn as four Lorentzian lines of half-width `w` (Hz) at offsets $\pm(J_a + J_b)/2$ and $\pm(J_a - J_b)/2$ from the centre, with $J_a$ (`a`) and $J_b$ (`b`) on the sliders. With $J_a = 10$, $J_b = 4$ Hz you see a doublet of doublets: four lines of equal height. Move `b` towards `a` and the two inner lines merge until, at $J_a = J_b$, the pattern becomes a $1{:}2{:}1$ triplet — the $(n_1+1)(n_2+1)$ lines of the rule collapse to $n_1 + n_2 + 1$. Increase `w` and small couplings disappear into the line width: a "broad singlet" often hides a coupling of $1$–$2$ Hz.
:::

::: example The propyl group of 1-bromopropane {#ex-propyl}
1-Bromopropane, $\mathrm{BrCH_2CH_2CH_3}$, shows signals at $\delta\,3.40$ (2 H), $1.89$ (2 H) and $1.03$ (3 H). Predict the multiplicity of each, and explain why the central signal is usually described as a sextet.
::: solution
The $\mathrm{BrCH_2}$ protons ($3.40$, deshielded by bromine) have two neighbours on C2: a triplet. The $\mathrm{CH_3}$ ($1.03$) has two neighbours: a triplet. The central $\mathrm{CH_2}$ has two neighbours on C1 and three on C3. By the general rule it could show $(2+1)(3+1) = 12$ lines. But both vicinal couplings are close to $7$ Hz (in a freely rotating chain $^{3}J$ averages to $6$–$8$ Hz whatever the substituents), so the lines coincide as though the five neighbours were equivalent, giving $5 + 1 = 6$ lines with intensities $1{:}5{:}10{:}10{:}5{:}1$ — an apparent sextet. Only at high field and with resolution enhancement does slight inequality of the two $J$ values broaden or split the inner lines.
:::
:::

### Typical coupling constants

The size of $J$ is itself structural information, because it depends on the number of bonds between the coupled nuclei and on geometry. Coupling over two bonds is **geminal** ($^{2}J$), over three bonds **vicinal** ($^{3}J$), and over four or more **long-range**. Typical magnitudes for $^{1}\mathrm{H}$–$^{1}\mathrm{H}$ coupling (Pretsch et al.):

| coupling | typical $J$ / Hz |
|---|---|
| geminal, $\mathrm{sp^3}$ $\mathrm{CH_2}$ (diastereotopic) | 12–15 (negative sign) |
| geminal, terminal alkene $\mathrm{{=}CH_2}$ | 0–3 |
| vicinal, freely rotating $\mathrm{H{-}C{-}C{-}H}$ | 6–8 |
| vicinal, cyclohexane axial–axial | 8–13 |
| vicinal, cyclohexane axial–equatorial or equatorial–equatorial | 2–5 |
| alkene *trans* $\mathrm{H{-}C{=}C{-}H}$ | 12–18 |
| alkene *cis* $\mathrm{H{-}C{=}C{-}H}$ | 6–12 |
| aldehyde $\mathrm{H{-}C{-}CHO}$ | 1–3 |
| aromatic *ortho* / *meta* / *para* | 7–9 / 1–3 / 0–1 |
| allylic $\mathrm{H{-}C{=}C{-}C{-}H}$ ($^{4}J$) | 0–3 |
| "W" arrangement in rigid rings ($^{4}J$) | 1–3 |

Two of these rows alone settle many stereochemical questions: an alkene coupling of $16$ Hz is *E*, one of $10$ Hz is *Z*; and in a cyclohexane chair a coupling of $10$ Hz requires two axial protons. The second fact has a quantitative theory.

::: proposition The Karplus relation (empirical form) {#prop-karplus}
The vicinal coupling between protons on adjacent $\mathrm{sp^3}$ carbons depends on the dihedral angle $\phi$ of the $\mathrm{H{-}C{-}C{-}H}$ unit approximately as
$$
{}^{3}J(\phi) = A\cos^{2}\phi + B\cos\phi + C ,
$$ {#eq-karplus}
largest near $\phi = 180^\circ$ (antiperiplanar), somewhat smaller near $0^\circ$ (synperiplanar), and close to zero near $90^\circ$. Karplus's original valence-bond calculation (1959) gave, in hertz, ${}^{3}J = 8.5\cos^{2}\phi - 0.28$ for $0^\circ \le \phi \le 90^\circ$ and ${}^{3}J = 9.5\cos^{2}\phi - 0.28$ for $90^\circ \le \phi \le 180^\circ$, which is the parametrisation used in this lesson. Real couplings also depend on substituent electronegativity, bond angles and bond lengths; generalised parametrisations such as that of Haasnoot, de Leeuw and Altona (1980) add electronegativity terms and should be used for quantitative work.
:::

The physics behind the shape is overlap: the coupling is transmitted through the $\mathrm{C{-}H}$ bonding electrons, and the interaction between the two $\mathrm{C{-}H}$ bonds across the $\mathrm{C{-}C}$ bond is largest when they are coplanar ($0^\circ$ or $180^\circ$) and vanishes when they are orthogonal. Because $\cos^{2}\phi$ is symmetric, a single coupling constant corresponds to up to four dihedral angles; the relation is a check on a proposed geometry, not an inversion formula.

::: widget plot
f: if(x <= 90, 8.5*cos(x*pi/180)^2 - 0.28, 9.5*cos(x*pi/180)^2 - 0.28)
x: 0, 180
y: -1, 10
hlines: 0
vlines: 60; 180
labels: {}^{3}J(\phi)\ /\ \mathrm{Hz}
caption: The Karplus curve in its 1959 parametrisation, with the dihedral angle $\phi$ in degrees on the horizontal axis. Gauche protons ($\phi \approx 60^\circ$) couple weakly, about $2$ Hz on this curve; antiperiplanar protons ($\phi = 180^\circ$) strongly, about $9$ Hz. Hover to read any angle: a measured $J$ of $3$ Hz is compatible with $\phi \approx 52^\circ$ *or* $\approx 126^\circ$, which is why a coupling constant can confirm a conformation but rarely determine one alone. The curve is a smooth average; measured gauche couplings next to oxygen substituents are typically $1$–$2$ Hz higher.
:::

::: example Assigning the anomers of glucose {#ex-anomers}
In $\mathrm{D_2O}$, an equilibrated solution of D-glucose shows two anomeric (H1) doublets: $\delta\,5.22$ ($J = 3.7$ Hz, integral 36) and $\delta\,4.64$ ($J = 7.9$ Hz, integral 64). In the $^{4}C_1$ chair H2 is axial in both anomers. Assign the signals and give the equilibrium composition.
::: solution
In the β anomer the $\mathrm{C1{-}OH}$ is equatorial, so H1 is axial and antiperiplanar to the axial H2: $\phi \approx 180^\circ$, for which equation [[#eq-karplus]] predicts $9.5 - 0.28 = 9.2$ Hz. In the α anomer H1 is equatorial, gauche to H2: $\phi \approx 60^\circ$, predicted $8.5 \times 0.25 - 0.28 = 1.9$ Hz. The doublet with the large coupling ($7.9$ Hz) is therefore β-H1 at $\delta\,4.64$, and the small one ($3.7$ Hz) is α-H1 at $\delta\,5.22$. The 1959 curve is off by $1$–$2$ Hz in both cases — the ring oxygen and the hydroxy groups lower the antiperiplanar coupling and raise the gauche one — but the assignment rests on the *large versus small* contrast, which is robust. Each signal is one proton, so the integrals give the molar ratio directly: $36 : 64$, that is $36\,\%$ α and $64\,\%$ β, the mutarotation equilibrium of glucose in water.
:::
:::

::: warning Second-order spectra and "doublets" that are not {#warn-second-order}
The $n + 1$ rule holds only when $\Delta\nu \gg J$. Because $\Delta\nu$ in hertz grows with the field while $J$ does not, a spectrum can be first order at $400$ MHz and second order at $60$ MHz: the $0.30$ ppm separation of two signals is $18$ Hz at $60$ MHz but $120$ Hz at $400$ MHz, against a $J$ of $7$ Hz. As $\Delta\nu/J$ falls, the inner lines of two coupled multiplets grow at the expense of the outer ones (the **roof effect**, which conveniently points towards the coupling partner), extra lines appear, and the apparent spacings stop equalling $J$. A *para*-disubstituted benzene with two different substituents shows two apparent doublets of $2$ H each, but the spin system is $\mathrm{AA'BB'}$ — chemically but not magnetically equivalent pairs — and the line spacing is not exactly $^{3}J_{ortho}$. Read such patterns as fingerprints of the substitution pattern, not as first-order multiplets to be measured.
:::

### Exchangeable and diastereotopic protons

Protons on oxygen and nitrogen exchange with one another, catalysed by traces of acid or base. When exchange is fast on the NMR timescale (rates much greater than $J$ in hertz), each such proton feels an average of its neighbours' spin states and appears as a singlet that does not split its neighbours either: the $\mathrm{OH}$ of ordinary ethanol is a singlet and the $\mathrm{CH_2}$ a simple quartet. In very pure, dry ethanol, or in $\mathrm{DMSO{-}d_6}$, which slows exchange by hydrogen-bonding the OH, the $\mathrm{OH}$ appears as a triplet and the $\mathrm{CH_2}$ as a doublet of quartets.

The diagnostic test is the **$\mathrm{D_2O}$ shake**: add a drop of $\mathrm{D_2O}$ to the sample, shake, and record again. Exchangeable $\mathrm{OH}$, $\mathrm{NH}$ and $\mathrm{COOH}$ protons are replaced by deuterium, which does not appear in a $^{1}\mathrm{H}$ spectrum, so their signals vanish and a new $\mathrm{HOD}$ signal (near $\delta\,4.8$ in $\mathrm{D_2O}$, near $4.7$ as a separate phase in $\mathrm{CDCl_3}$) appears. Amide NH protons exchange slowly and may survive minutes or hours, a property exploited to measure solvent accessibility in proteins.

Diastereotopic protons ([[#def-equivalence]]) are the opposite trap: protons that "look the same" in a condensed formula but are not. The $\mathrm{CH_2}$ of $\mathrm{PhCH(CH_3)CH_2OH}$ gives two separate signals, each a doublet of doublets (geminal coupling to each other, vicinal coupling to the methine), because no symmetry operation of the molecule exchanges them. The two methyls of an isopropyl group attached to a stereocentre are likewise diastereotopic and frequently give two doublets.

::: quiz Diastereotopic or not?
In which compound are the two protons of the $\mathrm{CH_2}$ group diastereotopic?
- [ ] $\mathrm{CH_3CH_2OH}$ (ethanol)
- [ ] $\mathrm{ClCH_2CH_2Cl}$ (1,2-dichloroethane)
- [x] $\mathrm{CH_3CH_2CHClCH_3}$ (2-chlorobutane)
- [ ] $\mathrm{(CH_3CH_2)_2O}$ (diethyl ether)
::: solution
Only 2-chlorobutane has a stereocentre (C2) next to the $\mathrm{CH_2}$: replacing either $\mathrm{CH_2}$ proton by Z creates a second stereocentre, and the two products are diastereomers. In ethanol and diethyl ether the methylene protons are enantiotopic (exchanged by a mirror plane) and equivalent in an achiral solvent; in 1,2-dichloroethane all four protons are interconverted by rotation and symmetry. A useful shortcut: a $\mathrm{CH_2}$ group in a chiral molecule is always diastereotopic.
:::
:::

## Carbon-13 spectra and DEPT

Carbon-13 has spin $\tfrac12$ but only $1.07\,\%$ natural abundance and a magnetogyric ratio a quarter of that of the proton, so a $^{13}\mathrm{C}$ spectrum is about $6000$ times less sensitive than a $^{1}\mathrm{H}$ spectrum of the same sample and needs many more scans. The low abundance has one blessing: the chance that two $^{13}\mathrm{C}$ nuclei are neighbours is about $(0.0107)^{2} \approx 10^{-4}$, so carbon–carbon couplings are invisible in routine spectra.

Carbon–proton couplings are large ($^{1}J_\mathrm{CH} \approx 125$ Hz for $\mathrm{sp^3}$, $160$ Hz for $\mathrm{sp^2}$, $250$ Hz for $\mathrm{sp}$ carbon) and would turn every signal into an overlapping multiplet. Routine spectra are therefore recorded with **broadband proton decoupling**: the protons are irradiated continuously over their whole shift range, their spin states are scrambled faster than $J$, and each chemically distinct carbon appears as a single line. Decoupling also enhances the signals of protonated carbons through the nuclear Overhauser effect (by up to a factor $1 + \gamma_\mathrm{H}/2\gamma_\mathrm{C} \approx 3$), while quaternary carbons, with no attached protons and long relaxation times, stay weak. Consequently **routine $^{13}\mathrm{C}$ integrals are not proportional to the number of carbons** and are not used for counting.

What *is* counted is the number of lines, which equals the number of symmetry-distinct carbons. The shift range is about $220$ ppm, twenty times that of the proton, so accidental overlap is rare.

| carbon environment | typical $\delta_\mathrm{C}$ / ppm |
|---|---|
| alkyl $\mathrm{CH_3}$, $\mathrm{CH_2}$, $\mathrm{CH}$, quaternary | 0–50 |
| $\mathrm{C{-}N}$, $\mathrm{C{-}O}$ (amines, alcohols, ethers, esters) | 40–90 |
| alkyne $\mathrm{C{\equiv}C}$ | 65–90 |
| alkene and aromatic $\mathrm{C{=}C}$ | 100–160 |
| nitrile $\mathrm{C{\equiv}N}$ | 115–125 |
| carboxylic acids, esters, amides | 160–185 |
| aldehydes, ketones | 190–220 |

To find out how many protons each carbon carries, one runs the **DEPT** experiment (distortionless enhancement by polarisation transfer). Magnetisation is transferred from the protons to the carbons through $^{1}J_\mathrm{CH}$, which raises sensitivity by about $\gamma_\mathrm{H}/\gamma_\mathrm{C} \approx 4$, and the last proton pulse of the sequence, of flip angle $\theta$, sets the sign and size of each signal according to the number of attached protons.

::: proposition DEPT editing {#prop-dept}
In a DEPT experiment with final proton pulse angle $\theta$, the signal of a carbon carrying $n$ protons is proportional to
$$
S_{\mathrm{CH}_n}(\theta) \propto n\,\sin\theta\,\cos^{n-1}\theta :
\qquad
S_\mathrm{CH} \propto \sin\theta,\quad
S_\mathrm{CH_2} \propto \sin 2\theta,\quad
S_\mathrm{CH_3} \propto 3\sin\theta\cos^{2}\theta ,
$$ {#eq-dept}
and quaternary carbons ($n = 0$) give no signal. Hence DEPT-45 shows all protonated carbons positive; **DEPT-90** shows only CH carbons; **DEPT-135** shows CH and $\mathrm{CH_3}$ positive and $\mathrm{CH_2}$ *negative*. Comparing the broadband spectrum with DEPT-90 and DEPT-135 classifies every carbon as C, CH, $\mathrm{CH_2}$ or $\mathrm{CH_3}$.
:::

::: proof Sketch of the derivation {collapsed}
After the polarisation-transfer part of the sequence (Doddrell, Pegg and Bendall, 1982), the carbon magnetisation of a $\mathrm{CH}_n$ group exists as a heteronuclear multiple-quantum coherence that involves the carbon and all $n$ attached protons. The final proton pulse $\theta$ acts on each proton independently. Signal observable on carbon after the subsequent evolution requires that exactly one of the $n$ protons be converted to the antiphase state that refocuses into carbon magnetisation, an amplitude $\sin\theta$, while the other $n - 1$ protons remain in their original state, amplitude $\cos\theta$ each. There are $n$ choices of which proton is the active one, so the signal is $n\sin\theta\cos^{n-1}\theta$. Inserting $n = 1, 2, 3$ gives the three functions in equation [[#eq-dept]]. At $\theta = 90^\circ$, $\cos\theta = 0$ removes every term with $n > 1$, leaving only CH; at $\theta = 135^\circ$, $\cos\theta < 0$ and the odd power $\cos^{1}\theta$ in the $\mathrm{CH_2}$ term makes it negative while the even power $\cos^{2}\theta$ keeps $\mathrm{CH_3}$ positive. For $n = 0$ there is no proton through which to transfer polarisation and no signal at all.
:::

::: widget plot
f: sin(x); sin(2*x); 3*sin(x)*cos(x)^2
x: 0, pi
y: -1.2, 1.4
piticks: true
hlines: 0
vlines: pi/4; pi/2; 3*pi/4
labels: \mathrm{CH}; \mathrm{CH_2}; \mathrm{CH_3}
caption: Relative DEPT signal of CH, $\mathrm{CH_2}$ and $\mathrm{CH_3}$ carbons against the final proton pulse angle $\theta$ (equation [[#eq-dept]]). The vertical lines mark the three standard experiments: at $\theta = \pi/4$ (DEPT-45) all three are positive; at $\pi/2$ (DEPT-90) only CH survives; at $3\pi/4$ (DEPT-135) $\mathrm{CH_2}$ is fully negative while CH and $\mathrm{CH_3}$ remain positive. Quaternary carbons, with $n = 0$, are zero for every angle.
:::

::: example Seven isomers of C₄H₁₀O {#ex-c4h10o}
$\mathrm{C_4H_{10}O}$ has seven constitutional isomers: four alcohols and three ethers. An unknown isomer shows only **two** lines in its $^{13}\mathrm{C}$ spectrum. Which isomers fit, and how do DEPT-135 and the $^{1}\mathrm{H}$ spectrum decide between them?
::: solution
$\mathrm{DBE} = (8 + 2 - 10)/2 = 0$: no rings or double bonds. Count the symmetry-distinct carbons of each isomer:

- butan-1-ol $\mathrm{CH_3CH_2CH_2CH_2OH}$: 4; butan-2-ol $\mathrm{CH_3CH_2CH(OH)CH_3}$: 4;
- 2-methylpropan-1-ol $\mathrm{(CH_3)_2CHCH_2OH}$: 3 (the two methyls are equivalent);
- 2-methylpropan-2-ol $\mathrm{(CH_3)_3COH}$: **2**;
- 1-methoxypropane $\mathrm{CH_3OCH_2CH_2CH_3}$: 4; 2-methoxypropane $\mathrm{CH_3OCH(CH_3)_2}$: 3;
- ethoxyethane (diethyl ether) $\mathrm{(CH_3CH_2)_2O}$: **2**.

Two candidates remain. Their $^{13}\mathrm{C}$ shifts are similar in kind — one carbon on oxygen near $\delta\,66$–$69$, one methyl carbon near $15$–$31$ — but DEPT separates them at once. In DEPT-135, diethyl ether shows the $\mathrm{OCH_2}$ ($\delta\,65.9$) *negative* and the $\mathrm{CH_3}$ ($15.4$) positive; 2-methylpropan-2-ol shows only its methyl signal ($31.2$), positive, because the quaternary $\mathrm{C{-}OH}$ ($69.1$) vanishes. The $^{1}\mathrm{H}$ spectra agree: diethyl ether gives a quartet ($\delta\,3.48$, 4 H) and a triplet ($1.21$, 6 H), while 2-methylpropan-2-ol gives a $9$ H singlet ($1.28$) and a $1$ H singlet for OH whose position depends on concentration and which disappears on a $\mathrm{D_2O}$ shake. (Shifts: SDBS spectra in $\mathrm{CDCl_3}$.)
:::
:::

::: quiz Reading DEPT-135
In a DEPT-135 spectrum, a signal at $\delta_\mathrm{C}\,42$ points downwards. What is it?
- [ ] A quaternary carbon
- [ ] A CH carbon
- [x] A $\mathrm{CH_2}$ carbon
- [ ] A $\mathrm{CH_3}$ carbon
::: solution
Only $\mathrm{CH_2}$ carbons are negative at $\theta = 135^\circ$, because $\sin 2\theta = -1$ there. CH and $\mathrm{CH_3}$ point up; quaternary carbons are absent from every DEPT spectrum and must be found by comparison with the broadband-decoupled spectrum.
:::
:::

## Two-dimensional correlation experiments

A one-dimensional spectrum lists fragments; it does not say how they are joined. Two-dimensional experiments make the connections explicit. In each, a pulse sequence lets magnetisation evolve first at one set of frequencies (during a variable delay $t_1$) and then be detected at another (during $t_2$); Fourier transformation in both time variables gives a map with a **cross peak** at $(\delta_1, \delta_2)$ whenever magnetisation was transferred between a nucleus at $\delta_1$ and one at $\delta_2$. The mechanism of transfer defines what the cross peak means.

::: definition The four standard correlation experiments {#def-2d}
- **COSY** (correlation spectroscopy, $^{1}\mathrm{H}$–$^{1}\mathrm{H}$): a cross peak joins two protons that are scalar-coupled, normally through two or three bonds ($^{2}J$, $^{3}J$); weak four-bond peaks appear for W and allylic couplings. The spectrum is symmetric about its diagonal, which carries the ordinary 1D spectrum.
- **HSQC** (heteronuclear single-quantum coherence, $^{1}\mathrm{H}$–$^{13}\mathrm{C}$): a cross peak joins each proton to the carbon it is *directly bonded to*, through $^{1}J_\mathrm{CH} \approx 125$–$170$ Hz. Quaternary carbons give no peak; diastereotopic $\mathrm{CH_2}$ protons give two peaks at one carbon shift. Edited HSQC gives $\mathrm{CH_2}$ peaks the opposite sign to CH and $\mathrm{CH_3}$, as DEPT-135 does.
- **HMBC** (heteronuclear multiple-bond correlation, $^{1}\mathrm{H}$–$^{13}\mathrm{C}$): a cross peak joins a proton to carbons **two or three bonds away** ($^{2}J_\mathrm{CH}$, $^{3}J_\mathrm{CH}$, typically $2$–$10$ Hz; the delay is usually optimised for about $8$ Hz), with one-bond correlations suppressed. HMBC sees quaternary carbons and correlates across heteroatoms and carbonyl groups, which no H–H experiment can do.
- **NOESY** (nuclear Overhauser effect spectroscopy, $^{1}\mathrm{H}$–$^{1}\mathrm{H}$): a cross peak joins two protons that are **close in space**, typically within about $5\ \mathrm{\AA}$, whether or not they are bonded near each other. For a rigid molecule the cross-peak intensity varies as $r^{-6}$ with the internuclear distance $r$ (in the initial-rate regime), so NOESY measures conformation and relative configuration.
:::

The $r^{-6}$ law makes NOE a sensitive ruler: a proton pair $3.5\ \mathrm{\AA}$ apart gives a cross peak $(3.5/2.5)^{6} = 7.5$ times weaker than a pair at $2.5\ \mathrm{\AA}$. Calibrating against a pair of known separation (a geminal $\mathrm{CH_2}$ at $1.78\ \mathrm{\AA}$, or *ortho* aromatic protons at $2.5\ \mathrm{\AA}$) converts intensities into distances: $r = r_\mathrm{ref}\,(I_\mathrm{ref}/I)^{1/6}$. Because of the sixth root, even a factor-of-two error in intensity changes the distance by only $12\,\%$ — the reason NOE distances, collected by the thousand, determine protein structures.

::: warning HMBC: two bonds or three, and missing peaks {#warn-hmbc}
An HMBC cross peak says "two *or* three bonds", and the experiment cannot tell which. Worse, $^{3}J_\mathrm{CH}$ follows its own Karplus-like dependence and can be near zero for a dihedral angle near $90^\circ$, and $^{2}J_\mathrm{CH}$ is often small, so an *absent* HMBC peak proves nothing. In aromatic rings $^{3}J_\mathrm{CH}$ (about $7$–$8$ Hz) is larger than $^{2}J_\mathrm{CH}$ ($1$–$2$ Hz), so the strongest HMBC peaks of an aromatic proton are to the carbons *meta* to it. Build structures from correlations that are present, check each bond with at least two independent correlations, and never from absences.
:::

Correlations are assembled systematically.

::: algorithm Assembling a structure from 1D and 2D NMR {#alg-assemble}
1. From the molecular formula (high-resolution mass spectrum, [[spectroscopy/mass-spectrometry]]) compute the DBE (equation [[#eq-dbe]]).
2. From the $^{13}\mathrm{C}$ and DEPT spectra list every carbon as C, CH, $\mathrm{CH_2}$ or $\mathrm{CH_3}$ with its shift; check that the attached protons plus the exchangeable protons (those absent from HSQC or lost on a $\mathrm{D_2O}$ shake) add up to the formula's H count.
3. Use HSQC to attach every proton signal to its carbon, so that each $^{1}\mathrm{H}$ integral and multiplicity belongs to a numbered carbon.
4. Use COSY (and the multiplicities) to join protonated carbons into **spin systems**: chains of $\mathrm{CH}_n$ groups linked by H–H coupling. Each spin system ends at a quaternary carbon or a heteroatom.
5. Use HMBC to bridge the spin systems across quaternary carbons, carbonyl groups and heteroatoms, starting from the most informative protons (methyl singlets give strong, unambiguous HMBC peaks).
6. Account for the remaining atoms and DBE with functional groups consistent with the shifts and the infrared spectrum ([[spectroscopy/vibrational-spectroscopy]]).
7. Check the proposal against **every** observation — every shift, multiplicity, $J$ value and correlation — and against the other candidate structures; then use $J$ values and NOESY to fix the stereochemistry.
:::

::: widget graph
nodes: H8@0,7; C8@0,5; C7@2,5; C1@4,5; C2/6@5,6.5; H2/6@5,8.5; C3/5@7,6.5; H3/5@7,8.5; C4@8,5; C9@10,5; H9@10,7
edges: H8>C8:1; H2/6>C2/6:1; H3/5>C3/5:1; H9>C9:1; H8>C7:2; H8>C1:3; H2/6>C7:3; H2/6>C4:3; H3/5>C1:3; H9>C4:3
caption: Correlation map for 1-(4-methoxyphenyl)ethan-1-one ([[#ex-methoxyacetophenone]]). Each arrow runs from a proton to a carbon and is labelled with the number of bonds between them: $1$ = HSQC (direct attachment), $2$ or $3$ = HMBC. Carbons are numbered C1 (ring carbon bearing the acetyl group), C2/6 and C3/5 (the two pairs of ring CH), C4 (ring carbon bearing oxygen), C7 (carbonyl), C8 (acetyl methyl) and C9 (methoxy carbon). The two methyl singlets each reach across a "silent" atom — H8 across the carbonyl to C1, H9 across oxygen to C4 — and the ring protons tie the two ends together through C7 and C4.
:::

::: example A para-disubstituted aromatic ketone {#ex-methoxyacetophenone}
A compound $\mathrm{C_9H_{10}O_2}$ shows a strong infrared band at $1676\ \mathrm{cm^{-1}}$ and the following NMR data in $\mathrm{CDCl_3}$:
$^{1}\mathrm{H}$: $\delta\,7.94$ (2 H, apparent d, $J \approx 9$ Hz), $6.93$ (2 H, apparent d, $J \approx 9$ Hz), $3.87$ (3 H, s), $2.55$ (3 H, s).
$^{13}\mathrm{C}$: $\delta\,196.8$ (C), $163.5$ (C), $130.6$ (CH), $130.3$ (C), $113.7$ (CH), $55.5$ ($\mathrm{CH_3}$), $26.3$ ($\mathrm{CH_3}$), multiplicities from DEPT.
HMBC: $2.55 \to 196.8, 130.3$; $3.87 \to 163.5$; $7.94 \to 196.8, 163.5$; $6.93 \to 130.3$.
Deduce the structure.
::: solution
**DBE** $= (18 + 2 - 10)/2 = 5$. Four aromatic protons ($\delta_\mathrm{H}\,6.9$–$8.0$) and four aromatic carbon lines ($\delta_\mathrm{C}\,113$–$164$) suggest a benzene ring (DBE 4); the fifth is the carbonyl at $196.8$ — a conjugated ketone (aryl ketones lie near $196$–$198$, and an IR band at $1676\ \mathrm{cm^{-1}}$, lower than the $1715$ of a saturated ketone, confirms conjugation).

**Symmetry.** Nine carbons give only seven lines, and two aromatic signals of $2$ H each: two pairs of equivalent ring CH carbons ($130.6$, $113.7$) plus two ring quaternary carbons ($163.5$, $130.3$). A ring with two equivalent pairs of CH is *para*-disubstituted; the two "doublets" are the $\mathrm{AA'BB'}$ pattern of [[#warn-second-order]].

**Fragments.** A methyl singlet at $\delta_\mathrm{H}\,3.87$ on a carbon at $55.5$ is a methoxy group $\mathrm{OCH_3}$. A methyl singlet at $2.55$ on a carbon at $26.3$ is an acetyl methyl $\mathrm{CH_3C(O){-}}$. The ring carbon at $163.5$ is very deshielded: it carries the oxygen.

**Connections (HMBC).** H8 ($2.55$) correlates with the carbonyl (two bonds) and with the ring quaternary C1 at $130.3$ (three bonds): the acetyl group is on C1. H9 ($3.87$) correlates with C4 ($163.5$) across the oxygen: the methoxy group is on C4. The ring protons at $7.94$ see the carbonyl and C4 — three bonds each — so they are H2/6, *ortho* to the acetyl group and deshielded by it; the protons at $6.93$, *ortho* to the electron-donating methoxy group and shielded by it, are H3/5 and see C1 three bonds away.

**Structure:** $\mathrm{4{-}CH_3OC_6H_4C(O)CH_3}$, 1-(4-methoxyphenyl)ethan-1-one (4-methoxyacetophenone). Every datum is accounted for; the isomer methyl 4-methylbenzoate, $\mathrm{4{-}CH_3C_6H_4COOCH_3}$, has the same formula and symmetry but its carbonyl would be near $167$ (ester), its aryl methyl near $\delta_\mathrm{H}\,2.4$/$\delta_\mathrm{C}\,21.6$, and its $\mathrm{OCH_3}$ would correlate in HMBC with the carbonyl, not with a ring carbon. (Shifts: SDBS.)
:::
:::

## Practical points

A few practical facts decide whether a spectrum can be trusted. Samples for $^{1}\mathrm{H}$ NMR are typically $2$–$10$ mg in $0.6\ \mathrm{cm^3}$ of a deuterated solvent, whose deuterium signal the spectrometer uses to lock the field; the residual protonated solvent gives a reference signal ($\mathrm{CHCl_3}$ at $\delta_\mathrm{H}\,7.26$ in $\mathrm{CDCl_3}$; $\mathrm{DMSO{-}d_5}$ at $2.50$; $\mathrm{HOD}$ at about $4.8$ in $\mathrm{D_2O}$), and water absorbed by the solvent gives a variable peak ($1.56$ in $\mathrm{CDCl_3}$, $3.33$ in $\mathrm{DMSO{-}d_6}$). Solid impurities broaden lines and must be filtered off.

::: remark Safety in the NMR laboratory
Deuterochloroform carries the hazards of chloroform: it is harmful if swallowed or inhaled, irritates the skin and eyes, and is classified as a suspected carcinogen and reproductive toxicant (GHS health-hazard and exclamation-mark pictograms). Prepare samples in a fume cupboard with gloves and eye protection, keep the bottle closed, and dispose of solutions as halogenated waste. The superconducting magnet is a hazard of its own: its stray field can stop pacemakers and other implants, erase magnetic cards and pull ferromagnetic tools and gas cylinders violently into the magnet, so only non-magnetic objects go inside the marked boundary, and cryogen (liquid helium and nitrogen) handling is left to trained staff. As with all practical work, sample preparation needs supervision and a risk assessment.
:::

## Where this leads

The tools of this lesson are combined with infrared spectra and mass spectra in [[spectroscopy/structure-problems]], where the algorithm above is run on complete unknowns; the molecular formula they need comes from the high-resolution masses of [[spectroscopy/mass-spectrometry]], and the functional groups from [[spectroscopy/vibrational-spectroscopy]]. The same correlation logic, extended to three and four dimensions with $^{13}\mathrm{C}$- and $^{15}\mathrm{N}$-labelled samples, determines the structures of proteins in solution; and the coupling-constant and NOE arguments used here for the anomers of glucose are the everyday stereochemical tools of [[organic-synthesis]]. Electron spins, with their much larger magnetic moments, show hyperfine patterns that obey the same counting rule ([[#prop-multiplicity]]) in [[spectroscopy/epr]].

::: history
The first chemically resolved proton spectrum was that of ethanol, published by James Arnold, S. S. Dharmatti and Martin Packard in 1951: three lines in the ratio $3{:}2{:}1$, showing that one element in one molecule gives separate signals for separate environments. James Shoolery, at Varian Associates, published his additivity rule for methylene shifts in 1959, the same year in which Martin Karplus derived the dependence of vicinal coupling on dihedral angle from valence-bond theory. Jean Jeener proposed the idea of a two-dimensional experiment in 1971, and Walter Aue, Enrico Bartholdi and Richard Ernst analysed and demonstrated it (COSY) in 1976; Jeener, Meier, Bachmann and Ernst introduced NOESY in 1979. DEPT was introduced by David Doddrell, David Pegg and Michael Bendall in 1982, and HMBC by Ad Bax and Michael Summers in 1986. Ernst received the Nobel Prize in Chemistry in 1991 for Fourier-transform and two-dimensional NMR, and Kurt Wüthrich shared the 2002 prize for using NOE-based NMR to determine the structures of biological macromolecules in solution.
:::

::: summary
- Start from the molecular formula: $\mathrm{DBE} = (2c + 2 + n - h - x)/2$ counts rings plus $\pi$ bonds.
- A $^{1}\mathrm{H}$ spectrum gives four things: the number of signals (sets of equivalent protons — beware diastereotopic $\mathrm{CH_2}$ groups), their shifts (environment; Shoolery's empirical additivity for $\mathrm{XCH_2Y}$), integrals (proton ratios, scaled to the formula) and multiplicities.
- First-order multiplets follow the $n + 1$ rule with binomial intensities, $(n_1+1)(n_2+1)$ lines for unequal couplings, and $2nI + 1$ lines for spin $I$; they require $\Delta\nu/J \gtrsim 10$, otherwise roofing and $\mathrm{AA'BB'}$ patterns appear.
- Coupling constants encode geometry: alkene *trans* $12$–$18$ vs *cis* $6$–$12$ Hz; aromatic *ortho* $7$–$9$, *meta* $1$–$3$ Hz; vicinal $\mathrm{sp^3}$ couplings follow the Karplus relation, large for antiperiplanar and small for gauche protons.
- Exchangeable OH/NH/COOH protons have variable shifts and vanish on a $\mathrm{D_2O}$ shake.
- Broadband-decoupled $^{13}\mathrm{C}$ spectra count symmetry-distinct carbons (not by integration); DEPT-90 shows CH only, DEPT-135 shows CH and $\mathrm{CH_3}$ up and $\mathrm{CH_2}$ down, and quaternary carbons are absent from DEPT.
- COSY joins coupled protons into spin systems, HSQC attaches protons to their carbons, HMBC bridges two or three bonds across quaternary carbons and heteroatoms, and NOESY ($\propto r^{-6}$) gives through-space distances and stereochemistry.
:::

## Exercises

::: exercise Degree of unsaturation {level=1 check="5"}
Calculate the degree of unsaturation of $\mathrm{C_8H_8O}$, and say what structural feature it suggests. (Enter the DBE.)
::: solution
$\mathrm{DBE} = (2 \times 8 + 2 - 8)/2 = 5$. Four of these are most likely a benzene ring and the fifth a $\mathrm{C{=}O}$ or $\mathrm{C{=}C}$ — acetophenone $\mathrm{PhC(O)CH_3}$, phenylacetaldehyde $\mathrm{PhCH_2CHO}$ and 4-methylbenzaldehyde are examples. The NMR spectrum decides among them.
:::
:::

::: exercise From integrals to protons {level=1 check="6"}
A compound $\mathrm{C_5H_{10}O}$ shows two $^{1}\mathrm{H}$ signals with integrals $41.2$ and $61.5$. How many protons does the larger signal represent? (Enter the number of protons.)
::: solution
The total $41.2 + 61.5 = 102.7$ units corresponds to $10$ H, so the larger signal contains $61.5 \times 10/102.7 = 5.99 \approx 6$ protons and the smaller $4$. A $4\,\mathrm{H}$ quartet and a $6\,\mathrm{H}$ triplet would be pentan-3-one, $\mathrm{(CH_3CH_2)_2CO}$: two equivalent ethyl groups on a carbonyl.
:::
:::

::: exercise Counting carbon signals {level=1 check="3"}
How many lines does the broadband-decoupled $^{13}\mathrm{C}$ spectrum of 1,4-dimethylbenzene ($p$-xylene) show? (Enter the number of lines.)
::: solution
The molecule has $D_{2h}$ symmetry. The two methyl carbons are equivalent (one line), the two ring carbons bearing methyl groups are equivalent (one line), and the four ring CH carbons are equivalent (one line): $3$ lines. The 1,2-isomer would show 4 and the 1,3-isomer 5, so a carbon count alone distinguishes the three xylenes.
:::
:::

::: exercise A Shoolery estimate {level=2 check="4.64"}
Use Shoolery's rule to estimate the chemical shift of the $\mathrm{CH_2}$ protons of benzyl alcohol, $\mathrm{PhCH_2OH}$. (Enter $\delta$ in ppm.)
::: solution
$\delta \approx 0.23 + \sigma_\mathrm{Ph} + \sigma_\mathrm{OH} = 0.23 + 1.85 + 2.56 = 4.64$ ppm. The measured value in $\mathrm{CDCl_3}$ is about $4.67$ ppm. Converting the alcohol to its acetate replaces $\sigma_\mathrm{OH}$ by $\sigma_{\mathrm{OC(O)R}} = 3.13$ and predicts $5.21$ ppm (measured about $5.10$): acylation of an alcohol moves the $\mathrm{CH{-}O}$ signal downfield by about $0.5$ ppm, a standard diagnostic.
:::
:::

::: exercise The most lines a multiplet can have {level=2 check="12"}
The central $\mathrm{CH_2}$ of 1-bromopropane couples to the two protons of $\mathrm{BrCH_2}$ and the three of $\mathrm{CH_3}$. If the two vicinal coupling constants were different and both resolved, how many lines would the multiplet show? (Enter the number of lines.)
::: solution
Coupling to two equivalent protons splits the signal into a triplet; each line is then split by three equivalent protons into a quartet: $(2+1)(3+1) = 12$ lines, a triplet of quartets (or quartet of triplets). Because the two couplings are actually almost equal (about $7$ Hz), many of the twelve lines coincide and the observed pattern is an apparent sextet, as in [[#ex-propyl]].
:::
:::

::: exercise A dihedral angle from J {level=2 check="159"}
A vicinal coupling of $8.0$ Hz is measured between two protons on adjacent $\mathrm{sp^3}$ carbons in a ring. Using the 1959 Karplus parametrisation for $90^\circ \le \phi \le 180^\circ$, estimate the dihedral angle. (Enter $\phi$ in degrees.)
::: hint
Solve $9.5\cos^{2}\phi - 0.28 = 8.0$ and take the root with $\cos\phi < 0$.
:::
::: solution
$\cos^{2}\phi = (8.0 + 0.28)/9.5 = 0.8716$, so $\cos\phi = -0.9336$ and $\phi = 159^\circ$. On the $0$–$90^\circ$ branch, $8.5\cos^{2}\phi - 0.28 = 8.0$ would need $\cos^{2}\phi = 0.974$, $\phi = 9^\circ$ — an eclipsed arrangement that a six-membered ring cannot adopt — so the antiperiplanar-like solution is the physical one. Given the $1$–$2$ Hz uncertainty of the simple curve, the honest conclusion is "roughly antiperiplanar, $\phi$ in the range $150$–$180^\circ$", i.e. two axial protons in a chair.
:::
:::

::: exercise A distance from a NOE {level=3 check="3.15"}
In a NOESY spectrum of a rigid molecule, the cross peak between two *ortho* aromatic protons ($r = 2.50\ \mathrm{\AA}$) has an intensity four times that of the cross peak between an aromatic proton and a nearby methyl group. Estimate the aromatic-proton–methyl distance, assuming the $r^{-6}$ law holds for both pairs. (Enter $r$ in $\mathrm{\AA}$.)
::: solution
With $I \propto r^{-6}$, $r = r_\mathrm{ref}(I_\mathrm{ref}/I)^{1/6} = 2.50 \times 4^{1/6}\ \mathrm{\AA} = 2.50 \times 1.260 = 3.15\ \mathrm{\AA}$. The sixth root makes the estimate robust: if the intensity ratio were really $3$ or $5$, the distance would be $2.98$ or $3.27\ \mathrm{\AA}$. Two caveats limit the accuracy in practice. A methyl group is three protons rotating rapidly, so "the distance" is an $r^{-6}$-weighted average over them, and the reference and unknown pairs must share the same correlation time, which holds within a rigid molecule but not between a rigid core and a flexible side chain.
:::
:::

::: exercise The best angle for a methyl carbon {level=3 check="35.3"}
Starting from equation [[#eq-dept]], find the pulse angle $\theta$ (between $0^\circ$ and $90^\circ$) that maximises the DEPT signal of a $\mathrm{CH_3}$ carbon, and compare the maximum with the CH and $\mathrm{CH_2}$ maxima. (Enter $\theta$ in degrees.)
::: hint
Differentiate $3\sin\theta\cos^{2}\theta$ with respect to $\theta$ and set the derivative to zero.
:::
::: solution
$\dfrac{\mathrm{d}}{\mathrm{d}\theta}\left(3\sin\theta\cos^{2}\theta\right) = 3\cos^{3}\theta - 6\sin^{2}\theta\cos\theta = 3\cos\theta\left(\cos^{2}\theta - 2\sin^{2}\theta\right)$. Apart from $\cos\theta = 0$ (a minimum, zero signal), the derivative vanishes when $\tan^{2}\theta = \tfrac12$, i.e. $\tan\theta = 1/\sqrt2$ and $\theta = 35.3^\circ$. The maximum value is $3 \times (1/\sqrt3)(2/3) = 2/\sqrt3 = 1.155$, compared with $1$ for CH (at $90^\circ$) and $1$ for $\mathrm{CH_2}$ (at $45^\circ$). In general the maximum of $n\sin\theta\cos^{n-1}\theta$ lies at $\sin\theta = 1/\sqrt n$, so the more protons a carbon carries, the smaller the optimum angle. DEPT-135 is a compromise that sacrifices about $8\,\%$ of the $\mathrm{CH_3}$ maximum ($1.061/1.155$) for the sign information.
:::
:::

::: exercise Ethyl acetate or methyl propanoate? {level=3}
An ester $\mathrm{C_4H_8O_2}$ gives $^{1}\mathrm{H}$ signals at $\delta\,3.67$ (3 H, s), $2.32$ (2 H, q, $J = 7.6$ Hz) and $1.14$ (3 H, t, $J = 7.6$ Hz), and $^{13}\mathrm{C}$ signals at about $\delta\,174.8$ (C), $51.5$ ($\mathrm{CH_3}$), $27.5$ ($\mathrm{CH_2}$) and $9.2$ ($\mathrm{CH_3}$). Identify it, and state which HMBC correlation would prove the assignment independently of chemical-shift arguments.
::: solution
The ethyl group (quartet and triplet sharing $7.6$ Hz) and a methyl singlet appear, as for ethyl acetate ([[#ex-ethyl-acetate]]), but the shifts are reversed. The singlet at $3.67$ on a carbon at $51.5$ is an $\mathrm{OCH_3}$; the quartet at $2.32$ on a carbon at $27.5$ is a $\mathrm{CH_2}$ next to a carbonyl, not on oxygen (which would put it near $\delta_\mathrm{H}\,4.1$, $\delta_\mathrm{C}\,60$). The compound is methyl propanoate, $\mathrm{CH_3CH_2C(O)OCH_3}$. HMBC proves the connectivity directly: the $\mathrm{OCH_3}$ protons ($3.67$) correlate with the carbonyl carbon ($174.8$) three bonds away ($\mathrm{H{-}C{-}O{-}C}$), and so do both the $\mathrm{CH_2}$ (two bonds) and $\mathrm{CH_3}$ (three bonds) protons of the ethyl group; in ethyl acetate the singlet methyl correlates with the carbonyl over two bonds and the $\mathrm{OCH_2}$ over three, but the ethyl $\mathrm{CH_3}$ (four bonds away) does not. The correlation of the ethyl *methyl* protons with the carbonyl is therefore the decisive one.
:::
:::
