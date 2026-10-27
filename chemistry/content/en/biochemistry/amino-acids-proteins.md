A human cell makes some twenty thousand different proteins, and every one of them is a single unbranched chain built from the same twenty building blocks. Haemoglobin carries oxygen, trypsin cuts other proteins, collagen holds skin together, insulin carries a message between organs, and an antibody recognises one virus among millions — yet chemically all of them are polyamides of α-amino acids, joined head to tail by the same amide bond. What makes them different is the *order* of the twenty side chains along the chain, and the astonishing fact, established by Christian Anfinsen in the 1950s and 1960s, that this order alone decides the three-dimensional shape into which the chain folds. This chapter builds up proteins from the bottom: the amino acids and their acid–base chemistry, the peptide bond and the geometric constraints it imposes, the regular secondary structures that follow from those constraints, the tertiary and quaternary architecture held together by the noncovalent forces of [[biochemistry/water-noncovalent]], and finally the thermodynamics of folding itself. The stereochemistry of [[organic-1/stereochemistry]] and the acid–base equilibria of [[general-chemistry-2/acids-bases]] are the tools we need.

## The twenty amino acids {#sec-amino-acids}

An **α-amino acid** has an amino group and a carboxylic acid group on the same carbon, the α carbon, which also carries a hydrogen atom and a side chain $\mathrm{R}$:
$$
\mathrm{H_3N^+{-}C_\alpha H(R){-}COO^-}.
$$
The formula is written as a **zwitterion** on purpose. The carboxylic acid ($\mathrm{p}K_\mathrm{a} \approx 2$) is far more acidic than the ammonium group ($\mathrm{p}K_\mathrm{a} \approx 9$–$10$), so at any pH between them the proton sits on nitrogen. In water near pH 7 the uncharged tautomer $\mathrm{H_2N{-}CHR{-}COOH}$ is outnumbered by the zwitterion by a factor of roughly $10^{5}$ or more. That is why amino acids are high-melting crystalline solids that dissolve in water and hardly at all in hydrocarbons: they are internal salts.

### Stereochemistry

Except in glycine, whose side chain is a second hydrogen, the α carbon is a stereocentre, and the amino acids of proteins are all of one configuration, called **L** in the Fischer convention (drawn with the carboxyl at the top and the side chain at the bottom, the amino group points to the left). In the Cahn–Ingold–Prelog system of [[organic-1/stereochemistry]], L-amino acids are (*S*) — with one exception. In cysteine the side chain $\mathrm{CH_2SH}$ outranks $\mathrm{COO^-}$ because sulfur has a higher atomic number than oxygen, so L-cysteine is (*R*). The letters L and *S* describe the same spatial arrangement; only the ranking rule changes. Threonine and isoleucine have a second stereocentre in the side chain: the natural forms are (2*S*,3*R*)-threonine and (2*S*,3*S*)-isoleucine. Proteins made of D-amino acids are possible (they have been made by chemical synthesis and fold into mirror-image structures), but ribosomes do not make them; D-amino acids occur in nature in bacterial cell walls and some peptide antibiotics, made by other enzymes.

### Side chains

The side chains are conveniently grouped by how they interact with water. The table gives the three-letter and one-letter codes and, for the ionisable groups, typical $\mathrm{p}K_\mathrm{a}$ values of the free amino acids at $25\ \mathrm{^\circ C}$ (values as tabulated in Nelson and Cox, *Lehninger Principles of Biochemistry*, and the CRC Handbook; compilations differ by up to about 0.2 units, and in a folded protein a group's $\mathrm{p}K_\mathrm{a}$ can shift by several units depending on its surroundings).

| class | amino acids (code) | ionisable side chain, $\mathrm{p}K_\mathrm{a}$ |
|---|---|---|
| nonpolar, aliphatic | glycine (Gly, G), alanine (Ala, A), valine (Val, V), leucine (Leu, L), isoleucine (Ile, I), methionine (Met, M), proline (Pro, P) | — |
| aromatic | phenylalanine (Phe, F), tyrosine (Tyr, Y), tryptophan (Trp, W) | Tyr phenol $10.07$ |
| polar, uncharged | serine (Ser, S), threonine (Thr, T), cysteine (Cys, C), asparagine (Asn, N), glutamine (Gln, Q) | Cys thiol $8.18$ |
| acidic | aspartate (Asp, D), glutamate (Glu, E) | $3.86$, $4.25$ |
| basic | lysine (Lys, K), arginine (Arg, R), histidine (His, H) | $10.53$, $12.48$, $6.00$ |

The α-carboxyl groups have $\mathrm{p}K_\mathrm{a}$ values near $1.8$–$2.4$ and the α-ammonium groups near $8.9$–$10.6$; for glycine they are $2.34$ and $9.60$.

A few side chains deserve comment because they recur throughout biochemistry. **Glycine** is so small that it allows the chain conformations no other residue can adopt, and it is common in tight turns. **Proline** is a secondary amine: its side chain loops back to bond to the backbone nitrogen, locking the angle about the $\mathrm{N{-}C_\alpha}$ bond and leaving no $\mathrm{N{-}H}$ to donate a hydrogen bond. **Cysteine** thiols can be oxidised in pairs to a **disulfide**, $\mathrm{{-}CH_2{-}S{-}S{-}CH_2{-}}$, the only common covalent cross-link between chains. **Histidine**, with an imidazole $\mathrm{p}K_\mathrm{a}$ near 6, is the only side chain that is substantially protonated *and* substantially unprotonated near physiological pH, which is why it appears in so many enzyme active sites as a proton shuttle ([[biochemistry/enzymes]]). The aromatic residues absorb ultraviolet light near $280\ \mathrm{nm}$ (tryptophan most strongly, molar absorption coefficient about $5600\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$), the basis of the routine measurement of protein concentration by absorbance ([[spectroscopy/electronic-spectroscopy]]).

The hydrophobicity of a side chain — measured, for example, by the free energy of transferring the amino acid from water to an organic solvent — is the single most useful number for predicting where it will be in a folded protein: buried in the core if nonpolar, on the surface if charged or polar. The origin of that free energy is the hydrophobic effect of [[biochemistry/water-noncovalent#def-hydrophobic]], dominated near room temperature by the entropy of water ordered around nonpolar surfaces.

## Acid–base behaviour and the isoelectric point

Because amino acids carry at least two ionisable groups, their charge depends on pH. Glycine fully protonated, $\mathrm{H_3N^+CH_2COOH}$, has charge $+1$; the zwitterion has net charge $0$; the anion $\mathrm{H_2NCH_2COO^-}$ has charge $-1$. A titration with sodium hydroxide shows two buffer regions centred at the two $\mathrm{p}K_\mathrm{a}$ values, exactly as for any diprotic acid ([[general-chemistry-2/buffers-titrations]]), and the fraction of each group protonated at any pH is given by the Henderson–Hasselbalch equation of [[biochemistry/water-noncovalent#prop-hh]]: a group with $\mathrm{p}K_\mathrm{a}$ value $\mathrm{p}K$ is protonated to the fraction
$$
\theta_\mathrm{H} = \frac{1}{1 + 10^{\,\mathrm{pH} - \mathrm{p}K}}.
$$ {#eq-frac-prot}
For an acidic group (carboxyl, thiol, phenol) the protonated form is neutral and the charge is $-(1-\theta_\mathrm{H})$; for a basic group (ammonium, imidazolium, guanidinium) the protonated form is positive and the charge is $+\theta_\mathrm{H}$. Adding these contributions gives the net charge at any pH.

::: definition Isoelectric point {#def-pi}
The **isoelectric point** $\mathrm{pI}$ of an amino acid, peptide or protein is the pH at which its average net charge is zero. At the isoelectric point the molecule does not move in an electric field, and a protein is usually least soluble, because molecules carrying no net charge repel each other least.
:::

For a molecule with only two ionisable groups, or with groups whose $\mathrm{p}K_\mathrm{a}$ values are well separated, the isoelectric point has a simple closed form.

::: proposition The isoelectric point as a mean of two pKa values {#prop-pi-mean}
Suppose a molecule exists in a sequence of protonation states with charges $+1$, $0$ and $-1$ linked by the acid dissociation constants $K_1$ and $K_2$, and that all other ionisable groups are fully protonated or fully deprotonated at the pH of interest (their $\mathrm{p}K_\mathrm{a}$ values lie at least about two units away). Then
$$
\mathrm{pI} = \tfrac12\left(\mathrm{p}K_1 + \mathrm{p}K_2\right),
$$
where $\mathrm{p}K_1$ and $\mathrm{p}K_2$ are the $\mathrm{p}K_\mathrm{a}$ values of the two equilibria that flank the neutral species. The result assumes ideal (dilute) solutions, so that concentrations stand in for activities.
:::

::: proof
Call the three species $\mathrm{C}$ (charge $+1$), $\mathrm{Z}$ (neutral) and $\mathrm{A}$ (charge $-1$). The two equilibria give $[\mathrm{Z}] = K_1[\mathrm{C}]/[\mathrm{H^+}]$ and $[\mathrm{A}] = K_2[\mathrm{Z}]/[\mathrm{H^+}]$. The net charge is zero when $[\mathrm{C}] = [\mathrm{A}]$, because the neutral species contributes nothing and the species two charge units away are negligible by assumption. Substituting,
$$
\frac{[\mathrm{H^+}][\mathrm{Z}]}{K_1} = \frac{K_2[\mathrm{Z}]}{[\mathrm{H^+}]} \quad\Rightarrow\quad [\mathrm{H^+}]^2 = K_1K_2,
$$
and taking $-\log_{10}$ of both sides gives $\mathrm{pH} = \tfrac12(\mathrm{p}K_1 + \mathrm{p}K_2)$. If a third group had a $\mathrm{p}K_\mathrm{a}$ close to the isoelectric pH, its partial charge would have to be included and the pI would have to be found numerically, for example with the net-charge function plotted below.
:::

For glycine the result gives $\mathrm{pI} = \tfrac12(2.34 + 9.60) = 5.97$. For amino acids with ionisable side chains the only care needed is to identify *which* two $\mathrm{p}K_\mathrm{a}$ values flank the neutral form.

::: example The isoelectric point of histidine {#ex-pi}
Histidine has $\mathrm{p}K_\mathrm{a}$ values $1.82$ (α-carboxyl), $6.00$ (imidazolium) and $9.17$ (α-ammonium). Find its isoelectric point, and its net charge and the fraction of imidazole protonated at pH $7.40$.
::: solution
**Order the protonation states.** At very low pH all three groups are protonated: $\mathrm{COOH}$ (0), $\mathrm{ImH^+}$ ($+1$), $\mathrm{NH_3^+}$ ($+1$), net $+2$. Groups lose protons in order of increasing $\mathrm{p}K_\mathrm{a}$: the carboxyl first (net $+1$), then the imidazolium (net $0$), then the ammonium (net $-1$). The neutral species exists between $\mathrm{p}K_\mathrm{a} = 6.00$ and $9.17$, so by [[#prop-pi-mean]]
$$
\mathrm{pI} = \tfrac12(6.00 + 9.17) = 7.59.
$$
The carboxyl $\mathrm{p}K_\mathrm{a}$, $1.82$, is nearly six units away and plays no part — averaging all three values ($5.66$) would be wrong.

**Charge at pH 7.40.** By [[#eq-frac-prot]] the imidazole is protonated to the fraction $1/(1 + 10^{7.40 - 6.00}) = 1/(1 + 25.1) = 0.038$, the α-ammonium to $1/(1 + 10^{7.40 - 9.17}) = 0.983$, and the carboxyl is fully ionised ($-1.000$). The net charge is
$$
-1.000 + 0.983 + 0.038 = +0.022.
$$
Free histidine at blood pH is therefore almost exactly neutral, and only about 4 % of its imidazole rings carry a proton. Inside a protein the imidazole $\mathrm{p}K_\mathrm{a}$ can be raised (next to a carboxylate) or lowered (in a hydrophobic pocket) by one to two units, which is how enzymes tune histidine to be a general acid or a general base exactly where they need it.
:::
:::

The figure plots the net charge of histidine against pH. Move the side-chain $\mathrm{p}K_\mathrm{a}$ to see how the environment of a residue changes the curve: the steps sit at the three $\mathrm{p}K_\mathrm{a}$ values, and the zero crossing is the isoelectric point.

::: widget plot
f: -1/(1+10^(1.82-x)) + 1/(1+10^(x-p)) + 1/(1+10^(x-9.17))
x: 0, 14
y: -1.2, 2.2
sliders: p=6:3:9:0.1
hlines: 0
labels: \text{net charge}
caption: Net charge of histidine against pH ($x$), the sum of the Henderson–Hasselbalch contributions of the α-carboxyl ($\mathrm{p}K_\mathrm{a}$ 1.82), the imidazolium side chain ($\mathrm{p}K_\mathrm{a}$ set by the slider $p$, 6.00 for the free amino acid) and the α-ammonium group ($\mathrm{p}K_\mathrm{a}$ 9.17). The curve crosses zero at the isoelectric point, $\mathrm{pI} = (p + 9.17)/2 = 7.59$ for $p = 6.00$. Raising $p$ towards 9 makes the plateau at charge 0 vanish and the pI approach 9.
:::

The same addition of contributions applies to a whole protein: its net charge is the sum over every ionisable residue plus the two chain termini. Proteins rich in Asp and Glu (pepsin, which works in the stomach) have isoelectric points below 3; proteins rich in Lys and Arg (histones, which bind the phosphate backbone of DNA) have isoelectric points above 10. **Isoelectric focusing** separates proteins in a pH gradient by exactly this property, and electrophoresis at a fixed pH separates them by charge and size.

::: warning The pI is not the average of all the pKa values {#warn-pi}
For an amino acid with three ionisable groups it is tempting to average all three $\mathrm{p}K_\mathrm{a}$ values, or to average the two side-chain-adjacent ones without checking. The isoelectric point is the mean of the two $\mathrm{p}K_\mathrm{a}$ values on either side of the *neutral* species, which you find only by listing the charge states in order. For aspartate (2.09, 3.86, 9.82) the neutral species lies between the α-carboxyl and the side-chain carboxyl, so $\mathrm{pI} \approx 2.98$; for lysine (2.18, 8.95, 10.53) it lies between the α-ammonium and the side-chain ammonium, so $\mathrm{pI} = 9.74$. A second error is to read a protein's pI off its amino-acid composition with free-amino-acid $\mathrm{p}K_\mathrm{a}$ values and treat the result as exact: buried and paired groups have shifted $\mathrm{p}K_\mathrm{a}$ values, so such estimates are good only to about half a pH unit.
:::

::: quiz
A tripeptide Lys-Lys-Gly is placed in an electrophoresis gel buffered at pH 7.0. Which way does it move?
- [x] Towards the cathode (the negative electrode), because its net charge is about $+2$
- [ ] Towards the anode, because the C-terminal carboxylate is negative
- [ ] It does not move, because pH 7 is neutral
- [ ] Towards the anode, because lysine is an acidic amino acid
::: solution
At pH 7 the C-terminal carboxylate is $-1$, the N-terminal ammonium is almost fully $+1$, and both lysine side chains ($\mathrm{p}K_\mathrm{a} \approx 10.5$) are $+1$: the net charge is close to $+2$. A positively charged species migrates towards the negative electrode, the cathode. "Neutral pH" says nothing about the charge of a solute; only its isoelectric point compared with the buffer pH does.
:::
:::

## The peptide bond {#sec-peptide}

Amino acids join by condensation of the carboxyl group of one with the amino group of the next, releasing water and forming an amide — in this context a **peptide bond**. A chain of a few residues is a peptide, a longer one a polypeptide, and a protein is one or more polypeptides, usually of 50 to 2000 residues, folded into a defined structure. The chain has direction: by convention sequences are written from the free α-amino group, the **N terminus**, to the free α-carboxyl, the **C terminus**, which is also the direction in which ribosomes make them ([[biochemistry/nucleic-acids]]). In water the hydrolysis of a peptide bond is thermodynamically favourable but extremely slow (half-lives of the order of centuries at neutral pH and room temperature), which is why proteins are kinetically stable and why cells need proteases to break them down.

The chemistry of the bond is the chemistry of amides from [[organic-2/carboxylic-derivatives]]: the nitrogen lone pair is delocalised into the carbonyl group. Two resonance structures, $\mathrm{{-}C(=O){-}NH{-}}$ and $\mathrm{{-}C(O^-){=}N^+H{-}}$, contribute, and the consequences are structural.

::: definition The peptide bond and the backbone torsion angles {#def-peptide}
The **peptide bond** $\mathrm{C{-}N}$ between residues $i$ and $i+1$ has partial double-bond character: it is $0.132\ \mathrm{nm}$ long, between a $\mathrm{C{-}N}$ single bond ($0.149\ \mathrm{nm}$) and a $\mathrm{C{=}N}$ double bond ($0.127\ \mathrm{nm}$). As a result the six atoms $\mathrm{C}_{\alpha,i}$, $\mathrm{C}$, $\mathrm{O}$, $\mathrm{N}$, $\mathrm{H}$ and $\mathrm{C}_{\alpha,i+1}$ lie in one plane, the **peptide plane**, and rotation about the $\mathrm{C{-}N}$ bond is hindered (barrier of order $80\ \mathrm{kJ\,mol^{-1}}$). Almost all peptide bonds are **trans** (the two $\mathrm{C}_\alpha$ atoms on opposite sides of the $\mathrm{C{-}N}$ bond); cis bonds occur mainly before proline.

The conformation of the backbone is therefore fixed by two **torsion angles** per residue: $\varphi$ (phi), the rotation about the $\mathrm{N{-}C_\alpha}$ bond, and $\psi$ (psi), the rotation about the $\mathrm{C_\alpha{-}C}$ bond. A plot of allowed $(\varphi, \psi)$ combinations is a **Ramachandran plot**.
:::

The peptide plane turns a polymer with three rotatable backbone bonds per residue into one with two, and steric clashes between backbone atoms and the first carbon of the side chain forbid most of the remaining $(\varphi,\psi)$ space. G. N. Ramachandran and his colleagues worked out the allowed regions from hard-sphere contact distances in 1963. Three regions dominate: the **right-handed helical** region near $(\varphi,\psi) = (-57^\circ, -47^\circ)$, the **extended β** region near $(-120^\circ, +130^\circ)$, and a small **left-handed helical** region near $(+60^\circ, +45^\circ)$ that is reached mainly by glycine, which has no side chain to clash with the backbone. Proline is restricted to $\varphi \approx -65^\circ$ by its ring. The polarity of the peptide group matters as much as its shape: every residue except proline contributes one $\mathrm{N{-}H}$ hydrogen-bond donor and one $\mathrm{C{=}O}$ acceptor, and satisfying these backbone hydrogen bonds when the chain is buried away from water is what the regular secondary structures do.

The trans preference is easy to understand: in the cis form the side chains of neighbouring residues collide. Before proline the two forms are much closer in energy, because the proline ring clashes with the preceding residue in either arrangement; a few per cent of X–Pro bonds are cis in protein structures, and the slow cis–trans isomerisation of these bonds is one of the rate-limiting steps in folding, catalysed in cells by peptidyl-prolyl isomerases.

### Primary structure and how it is read

The **primary structure** of a protein is its amino-acid sequence, together with the positions of any disulfide bonds. Frederick Sanger completed the first sequence, that of insulin, in 1955, by labelling N-terminal residues with 1-fluoro-2,4-dinitrobenzene, cutting the chains into overlapping fragments and fitting the fragments together. Pehr Edman's degradation (1950) removes and identifies one N-terminal residue at a time with phenyl isothiocyanate, and dominated sequencing for decades. Today most protein sequences are read from the genes that encode them, and proteins are identified and checked by mass spectrometry of fragments produced by specific proteases. The specificity of those proteases is part of the everyday chemistry of the field.

::: example Predicting a tryptic digest {#ex-trypsin}
Trypsin hydrolyses peptide bonds on the C-terminal side of lysine and arginine, except when the next residue is proline; chymotrypsin cuts after the large hydrophobic residues phenylalanine, tyrosine and tryptophan. Give the fragments of the peptide Ala-Lys-Gly-Arg-Pro-Leu-Lys-Phe-Asp (A-K-G-R-P-L-K-F-D) produced by each enzyme, and explain why trypsin prefers lysine and arginine.
::: solution
**Trypsin.** The candidate sites are after Lys-2, Arg-4 and Lys-7. The bond after Arg-4 is followed by Pro-5 and is not cut. The fragments are A-K, G-R-P-L-K and F-D.

**Chymotrypsin.** The only large aromatic residue is Phe-8, so the products are A-K-G-R-P-L-K-F and D.

**Why the specificity.** Trypsin's binding pocket, the S1 site, has an aspartate carboxylate at its bottom (Asp 189 in the chymotrypsin numbering) that forms a salt bridge with the long, positively charged side chain of Lys or Arg; chymotrypsin's pocket is lined with nonpolar residues and accommodates a flat aromatic ring. The specificity is noncovalent recognition of the kind described in [[biochemistry/water-noncovalent]], and the cleavage chemistry, shared by both enzymes, is the serine-protease mechanism of [[biochemistry/enzymes]]. Overlapping fragments from two enzymes with different specificities fix the order of the pieces — Sanger's strategy, still used in checking sequences by mass spectrometry.
:::
:::

## Secondary structure

**Secondary structure** is the local, regular folding of the backbone held together by hydrogen bonds between backbone $\mathrm{N{-}H}$ and $\mathrm{C{=}O}$ groups. Two patterns are so favourable that they account for most of the residues in most proteins, and both were predicted before they were seen, by Linus Pauling, Robert Corey and Herman Branson in 1951, from the planar peptide group and the geometry of a good hydrogen bond.

In the **α helix** the backbone winds into a right-handed spiral with $3.6$ residues per turn. Each residue advances the helix by $0.15\ \mathrm{nm}$ along its axis, so one turn (the pitch) is $3.6 \times 0.15 = 0.54\ \mathrm{nm}$. The $\mathrm{C{=}O}$ of residue $i$ accepts a hydrogen bond from the $\mathrm{N{-}H}$ of residue $i+4$, so every backbone polar group in the middle of the helix is satisfied, and all the hydrogen bonds point the same way along the axis: the helix has a macroscopic dipole, slightly positive at the N terminus. The side chains point outwards and backwards towards the N terminus, like the branches of a fir tree. Because $3.6$ is not an integer, residues $i$, $i+3$, $i+4$ and $i+7$ lie on the same face, and a helix whose hydrophobic residues follow that spacing is **amphipathic**: nonpolar on one face, polar on the other, ideal for lying on the surface of a protein or a membrane. Proline breaks helices (it has no $\mathrm{N{-}H}$ and its ring clashes with the preceding turn), and glycine weakens them (its flexibility costs entropy to freeze).

In the **β sheet** the chain is almost fully extended, with $0.35\ \mathrm{nm}$ per residue, and hydrogen bonds form *between* neighbouring strands rather than within one. Strands run either in the same direction (**parallel** sheets) or in alternating directions (**antiparallel** sheets, which have the more linear hydrogen bonds). The side chains point alternately above and below the sheet, so a strand with alternating polar and nonpolar residues gives a sheet with one hydrophobic face. Sheets are usually twisted, and the strands are connected by loops and by **β turns**, four-residue reversals in which the $\mathrm{C{=}O}$ of residue $i$ hydrogen-bonds to the $\mathrm{N{-}H}$ of residue $i+3$; glycine and proline are common in turns.

::: example How much chain spans a membrane? {#ex-helix}
The hydrocarbon core of a biological membrane is about $3.0\ \mathrm{nm}$ thick. How many residues are needed to cross it as an α helix, and how many as an extended β strand? Why are most single transmembrane segments helical?
::: solution
An α helix rises $0.15\ \mathrm{nm}$ per residue, so crossing $3.0\ \mathrm{nm}$ needs $3.0/0.15 = 20$ residues. An extended strand rises about $0.35\ \mathrm{nm}$ per residue and needs only $3.0/0.35 \approx 9$. Yet single membrane-spanning segments are almost always helices of about 20 hydrophobic residues. The reason is hydrogen bonding: inside the membrane there is no water to satisfy the backbone $\mathrm{N{-}H}$ and $\mathrm{C{=}O}$ groups, and a helix satisfies all of its own internally, whereas an isolated strand leaves every one of them unpaired, a cost of many tens of $\mathrm{kJ\,mol^{-1}}$ in a low-dielectric medium (the Coulomb argument of [[biochemistry/water-noncovalent#prop-coulomb]]). Strands can cross membranes only when many of them pair into a closed **β barrel**, as in the porins of bacterial outer membranes, so that every strand has neighbours on both sides. A stretch of about 20 consecutive hydrophobic residues in a sequence is therefore a strong prediction of a transmembrane helix — one of the oldest tricks of sequence analysis ([[biochemistry/carbohydrates-lipids]]).
:::
:::

Fibrous proteins show what repeated secondary structure can do on its own. **α-Keratin** of hair and wool is a coiled coil: two amphipathic helices wrap around each other, their hydrophobic stripes (a repeat of seven residues, two turns of a helix) in contact, and the pairs are cross-linked by disulfides — more of them in hard keratins such as horn. **Collagen**, the most abundant protein in mammals, is a different helix altogether: three left-handed chains, each with the repeat Gly-X-Y in which X and Y are often proline and 4-hydroxyproline, coil around one another into a right-handed triple helix. Every third residue must be glycine because only its hydrogen fits at the crowded centre of the triple helix. The hydroxylation of proline needs the enzyme prolyl hydroxylase, which requires ascorbate (vitamin C) to keep its iron in the $\mathrm{Fe^{2+}}$ state; without it the triple helix is less stable at body temperature, which is the molecular basis of the connective-tissue weakness of scurvy.

## Tertiary and quaternary structure

**Tertiary structure** is the complete three-dimensional arrangement of one polypeptide chain: how the helices, strands and loops pack against one another. The first protein whose tertiary structure was determined, sperm-whale myoglobin (John Kendrew and colleagues, 1958 at low resolution and 1960 at $0.2\ \mathrm{nm}$), showed the pattern that every later structure has confirmed. Its 153 residues form eight helices, about three quarters of the chain, packed into a compact globule that holds the haem group in a pocket. The interior is almost entirely nonpolar residues — leucine, valine, phenylalanine, methionine — packed as tightly as atoms in a crystal of small organic molecules; the charged residues are almost all on the surface, in contact with water; and the few polar groups in the interior are hydrogen-bonded to each other.

That pattern is the thermodynamic signature of the forces of [[biochemistry/water-noncovalent]]. The **hydrophobic effect** drives nonpolar side chains out of water and into a core; **van der Waals contacts** reward tight packing in that core; **hydrogen bonds** within the protein replace those that the backbone and polar side chains would otherwise make with water; and **salt bridges** between oppositely charged side chains contribute modestly, more on the surface than inside. Extracellular proteins are often further stabilised by **disulfide bonds**, which are formed in the oxidising environment of the endoplasmic reticulum; the reducing cytosol keeps most intracellular cysteines as free thiols.

Large proteins are usually built from **domains**, compact units of roughly 50 to 250 residues that fold independently and often recur in many proteins, and their folds fall into a limited number of recurring architectures: all-α bundles, all-β sandwiches and barrels, and α/β folds such as the eight-stranded TIM barrel that more than ten per cent of enzymes adopt.

**Quaternary structure** is the arrangement of several folded chains, called **subunits**, in a multisubunit protein. Haemoglobin is a tetramer of two α and two β chains, $\alpha_2\beta_2$, each similar in fold to myoglobin; the contacts between its subunits change when oxygen binds, and those changes are the basis of cooperative binding and allosteric regulation ([[biochemistry/protein-function#prop-mwc]]). Quaternary structures range from dimers to the 60-subunit shells of viruses, and they are held together by the same noncovalent forces that hold a single chain together.

The size of a protein is often given as a molar mass in daltons (or kilodaltons): $1\ \mathrm{Da} = 1\ \mathrm{g\,mol^{-1}}$ per molecule. An average residue in a protein has a mass of about $110\ \mathrm{Da}$, so a 300-residue chain has a molar mass near $33\ \mathrm{kDa}$; a useful rule for estimating sizes from sequences or gels.

## Protein folding {#sec-folding}

In the late 1950s Christian Anfinsen, working at the US National Institutes of Health, took the enzyme ribonuclease A (124 residues, four disulfide bonds) and unfolded it completely in $8\ \mathrm{mol\,dm^{-3}}$ urea with β-mercaptoethanol, which reduces the disulfides to thiols. The enzyme lost all activity. When he removed the urea and the reducing agent by dialysis and let air slowly re-oxidise the thiols, the chain refolded and recovered nearly all of its activity — the correct four disulfides out of 105 possible pairings re-formed spontaneously. If instead the thiols were re-oxidised while the urea was still present, so that the chain could not fold first, the result was "scrambled" ribonuclease with about one per cent of the activity, roughly what random pairing would give.

The conclusion, which Anfinsen called the **thermodynamic hypothesis**, is that the native structure of a small protein is the state of lowest Gibbs energy under physiological conditions, and that the information needed to reach it is entirely contained in the sequence. Folding is then a chemical equilibrium between the native state $\mathrm{N}$ and the unfolded state $\mathrm{U}$, and it can be analysed with the thermodynamics of [[thermodynamics/reaction-equilibrium]].

::: proposition Two-state folding thermodynamics {#prop-folding}
For a protein that unfolds in a single cooperative step, $\mathrm{N} \rightleftharpoons \mathrm{U}$, with no significantly populated intermediates, the equilibrium constant $K = [\mathrm{U}]/[\mathrm{N}]$ and the Gibbs energy of unfolding are related by $\Delta G_\mathrm{unf} = -RT\ln K$, and the fraction of molecules unfolded is
$$
f_\mathrm{U} = \frac{K}{1 + K} = \frac{1}{1 + e^{\Delta G_\mathrm{unf}/RT}}.
$$ {#eq-fu}
If the heat capacity change of unfolding $\Delta C_p$ is independent of temperature, then
$$
\Delta G_\mathrm{unf}(T) = \Delta H_\mathrm{m}\left(1 - \frac{T}{T_\mathrm{m}}\right) + \Delta C_p\left[T - T_\mathrm{m} - T\ln\frac{T}{T_\mathrm{m}}\right],
$$ {#eq-stability}
where $T_\mathrm{m}$ is the **melting temperature** (at which $\Delta G_\mathrm{unf} = 0$ and half the molecules are unfolded) and $\Delta H_\mathrm{m}$ is the enthalpy of unfolding at $T_\mathrm{m}$.
:::

::: proof
The first two relations are the general results for any equilibrium, $\Delta_\mathrm{r}G^\circ = -RT\ln K$ (with the standard state of $1\ \mathrm{mol\,dm^{-3}}$ for each form, which cancels because both sides of $\mathrm{N} \rightleftharpoons \mathrm{U}$ contain one molecule), together with $f_\mathrm{U} = [\mathrm{U}]/([\mathrm{N}] + [\mathrm{U}]) = K/(1+K)$; dividing numerator and denominator by $K$ and writing $1/K = e^{\Delta G/RT}$ gives the second form. For the temperature dependence, integrate $(\partial \Delta H/\partial T)_p = \Delta C_p$ and $(\partial \Delta S/\partial T)_p = \Delta C_p/T$ from $T_\mathrm{m}$ with constant $\Delta C_p$:
$$
\Delta H(T) = \Delta H_\mathrm{m} + \Delta C_p(T - T_\mathrm{m}), \qquad \Delta S(T) = \Delta S_\mathrm{m} + \Delta C_p\ln\frac{T}{T_\mathrm{m}}.
$$
At $T_\mathrm{m}$ the Gibbs energy vanishes, so $\Delta S_\mathrm{m} = \Delta H_\mathrm{m}/T_\mathrm{m}$. Then
$$
\Delta G(T) = \Delta H - T\Delta S = \Delta H_\mathrm{m} + \Delta C_p(T - T_\mathrm{m}) - \frac{T\Delta H_\mathrm{m}}{T_\mathrm{m}} - T\Delta C_p\ln\frac{T}{T_\mathrm{m}},
$$
which rearranges to [[#eq-stability]]. The two-state assumption is tested experimentally by checking that the enthalpy obtained from the shape of the transition (the van 't Hoff enthalpy) agrees with the heat measured directly by calorimetry.
:::

The heat capacity change $\Delta C_p$ is large and positive for unfolding — typically $50$–$60\ \mathrm{J\,K^{-1}\,mol^{-1}}$ per residue — because unfolding exposes buried nonpolar groups to water, and water ordered around nonpolar surfaces has a high heat capacity. That one fact has a remarkable consequence: [[#eq-stability]] is a curved function with a maximum, and it crosses zero twice. Proteins unfold not only on heating but also on cooling, a phenomenon called **cold denaturation**, which is usually hidden below the freezing point of water.

::: example The stability of a small globular protein {#ex-stability}
A small protein unfolds reversibly with $T_\mathrm{m} = 333.15\ \mathrm{K}$ ($60\ \mathrm{^\circ C}$), $\Delta H_\mathrm{m} = 400\ \mathrm{kJ\,mol^{-1}}$ and $\Delta C_p = 6.0\ \mathrm{kJ\,K^{-1}\,mol^{-1}}$. Calculate $\Delta G_\mathrm{unf}$ and the fraction unfolded at $25\ \mathrm{^\circ C}$ and at $37\ \mathrm{^\circ C}$, and find the temperature of maximum stability.
::: solution
**At 298.15 K.** The first term of [[#eq-stability]] is $400 \times (1 - 298.15/333.15) = 400 \times 0.10506 = 42.02\ \mathrm{kJ\,mol^{-1}}$. The second is $6.0 \times [298.15 - 333.15 - 298.15\ln(298.15/333.15)]$; the logarithm is $-0.11100$, so the bracket is $-35.00 + 33.094 = -1.906\ \mathrm{K}$ and the term is $-11.44\ \mathrm{kJ\,mol^{-1}}$. Hence
$$
\Delta G_\mathrm{unf}(298\ \mathrm{K}) = 42.02 - 11.44 = 30.6\ \mathrm{kJ\,mol^{-1}}.
$$
Then $K = e^{-30\,580/(8.314 \times 298.15)} = e^{-12.34} = 4.4\times10^{-6}$: about four molecules in a million are unfolded at any instant.

**At 310.15 K.** The same steps give $27.62 - 4.88 = 22.7\ \mathrm{kJ\,mol^{-1}}$ and $K = e^{-8.82} = 1.5\times10^{-4}$: still only 0.015 % unfolded, but thirty times more than at $25\ \mathrm{^\circ C}$.

**Maximum stability.** Differentiating [[#eq-stability]], $d\Delta G/dT = -\Delta H_\mathrm{m}/T_\mathrm{m} - \Delta C_p\ln(T/T_\mathrm{m})$, which is $-\Delta S(T)$ and vanishes when $\ln(T/T_\mathrm{m}) = -\Delta H_\mathrm{m}/(T_\mathrm{m}\Delta C_p) = -400/(333.15 \times 6.0) = -0.2001$. So $T_\mathrm{max} = 333.15\,e^{-0.2001} = 272.7\ \mathrm{K}$, where $\Delta G_\mathrm{unf} = 37.5\ \mathrm{kJ\,mol^{-1}}$. Solving $\Delta G_\mathrm{unf} = 0$ numerically on the low side gives a cold-denaturation temperature of about $216\ \mathrm{K}$, far below freezing.

**Interpretation.** A net stability of $20$–$60\ \mathrm{kJ\,mol^{-1}}$ is typical — comparable to the free energy of a few hydrogen bonds, although hundreds of interactions are made and broken on folding. Proteins are only *marginally* stable: $\Delta G_\mathrm{unf}$ is a small difference between a large favourable enthalpy of folding (contacts) and a large unfavourable entropy of folding (chain ordering), offset in turn by the hydrophobic effect. A single mutation in the core can cost $5$–$20\ \mathrm{kJ\,mol^{-1}}$, enough to unfold a protein at body temperature.
:::
:::

The two figures plot [[#eq-stability]] and [[#eq-fu]] for adjustable parameters. In the first, the stability curve is a downward parabola-like arch whose two zeros are the heat and cold denaturation temperatures; increasing $\Delta C_p$ narrows the arch. In the second, the fraction folded falls from 1 to 0 over a range of a few kelvin around $T_\mathrm{m}$: the larger $\Delta H_\mathrm{m}$, the sharper the transition — the cooperativity of folding.

::: widget plot
f: H*(1-x/m) + C*(x-m-x*ln(x/m))
x: 200, 360
y: -40, 60
sliders: H=400:100:800:10; m=333:300:360:1; C=6:0:15:0.5
hlines: 0
labels: \Delta G_\mathrm{unf}
caption: The protein stability curve: $\Delta G_\mathrm{unf}$ (in $\mathrm{kJ\,mol^{-1}}$) against temperature $x$ (in K) from [[#eq-stability]], with $\Delta H_\mathrm{m} = H$ (in $\mathrm{kJ\,mol^{-1}}$), $T_\mathrm{m} = m$ (in K) and $\Delta C_p = C$ (in $\mathrm{kJ\,K^{-1}\,mol^{-1}}$). With the defaults (the protein of [[#ex-stability]]) the curve peaks at $37.5\ \mathrm{kJ\,mol^{-1}}$ near $273\ \mathrm{K}$ and crosses zero at $333\ \mathrm{K}$ (heat denaturation) and about $216\ \mathrm{K}$ (cold denaturation). Setting $C = 0$ turns the curve into a straight line with no cold denaturation.
:::

::: widget plot
f: 1/(1+exp(-(H*(1-x/m) + C*(x-m-x*ln(x/m)))*1000/(8.314*x)))
x: 290, 380
y: 0, 1.05
sliders: H=400:100:800:10; m=333:300:360:1; C=6:0:15:0.5
hlines: 0.5
labels: f_\mathrm{N}
caption: Fraction of molecules folded, $f_\mathrm{N} = 1 - f_\mathrm{U} = 1/(1 + e^{-\Delta G_\mathrm{unf}/RT})$, against temperature $x$ (in K) for a two-state protein, with the same sliders as the stability curve. The midpoint lies at $T_\mathrm{m}$; a larger $\Delta H_\mathrm{m}$ makes the melting transition steeper, which is why small changes in temperature, pH or denaturant concentration can unfold a protein abruptly. Thermal melting curves of this shape, measured by circular dichroism or fluorescence, are the standard experiment for measuring stability.
:::

### How a chain finds its fold

If folding is an equilibrium, how fast is it reached? In 1969 Cyrus Levinthal pointed out that a random search cannot be the answer.

::: example Levinthal's estimate {#ex-levinthal}
Suppose each residue of a 100-residue chain can adopt three backbone conformations and the chain samples one conformation every $10^{-13}\ \mathrm{s}$ (a vibrational period). How long would an unbiased search of all conformations take? Compare it with the observed folding times of small proteins, milliseconds to seconds.
::: solution
The number of conformations is $3^{100} = 5.2\times10^{47}$. At $10^{13}$ per second the search takes $5.2\times10^{34}\ \mathrm{s}$, or, dividing by $3.156\times10^{7}\ \mathrm{s}$ per year, $1.6\times10^{27}$ years — about $10^{17}$ times the age of the universe ($1.4\times10^{10}$ years). Real proteins fold in about $10^{-3}$ to $1\ \mathrm{s}$. The conclusion is not that folding is mysterious but that it is not a random search: the chain does not have to visit every conformation, because partial structures that are native-like are also lower in free energy and are kept, while non-native ones are discarded. The search is biased downhill at every stage.
:::
:::

The modern picture is the **energy landscape**, or folding funnel: a plot of free energy against the conformations of the chain is not a golf course with one hole but a rugged funnel, wide at the top (the many unfolded conformations, high in entropy and energy) and narrowing towards the native state at the bottom. Local structure such as helices and turns forms in microseconds; the hydrophobic collapse of the chain into a compact globule follows; and the final, precise packing of side chains completes the fold. Kinetic traps — misfolded intermediates, cis–trans proline isomerisation, wrongly paired disulfides — slow the descent, and cells provide catalysts and helpers: protein disulfide isomerase reshuffles disulfides, peptidyl-prolyl isomerases speed proline isomerisation, and **molecular chaperones** such as Hsp70 and the barrel-shaped GroEL–GroES complex bind exposed hydrophobic surfaces of unfolded chains, preventing aggregation and giving them repeated chances to fold. Chaperones do not carry folding information; Anfinsen's principle still holds, and they only keep the chain out of trouble.

When folding fails, the result can be disease. In **amyloid** diseases, proteins or fragments that are normally soluble aggregate into fibrils built from β strands stacked perpendicular to the fibre axis, a structure open in principle to almost any sequence. Deposits of the amyloid-β peptide are a hallmark of Alzheimer's disease, and in the **prion** diseases a misfolded form of the prion protein converts normal copies into its own shape, so that misfolding propagates. These are described here only for their chemistry; the medicine belongs in [[medicinal-chemistry/drug-targets]] and Medicine Atlas.

Since 2020, deep-learning methods such as AlphaFold, trained on the structures in the Protein Data Bank, have predicted the folds of most single-domain proteins from their sequences with an accuracy close to that of experiment — a computational vindication of the thermodynamic hypothesis, though not yet an explanation of the folding pathway.

## Where this leads

The chemistry of the side chains returns in every later chapter: histidine, serine and aspartate in the catalytic triad of [[biochemistry/enzymes]]; the haem pocket of myoglobin and the subunit interfaces of haemoglobin in [[biochemistry/protein-function]], where quaternary structure becomes the mechanism of cooperativity ([[biochemistry/protein-function#prop-hill]]); the transmembrane helices and barrels of transporters in [[biochemistry/carbohydrates-lipids]]; and the amino-acid breakdown of [[biochemistry/lipid-nitrogen-metabolism]]. The genetic code that fixes primary structure is in [[biochemistry/nucleic-acids#def-code]]. Protein binding and stability are the starting point of drug design in [[medicinal-chemistry/drug-binding]] and of protein therapeutics in [[medicinal-chemistry/biologics]], and the statistical mechanics behind the two-state model is in [[statistical-thermodynamics/partition-function]].

::: history
Glycine was the first amino acid to be isolated, by Henri Braconnot in 1820 from gelatin hydrolysed with acid; the last of the twenty common amino acids to be identified, threonine, was found by William Cumming Rose in 1935. The word *protein* was introduced by Gerardus Mulder in 1838 at the suggestion of Jöns Jacob Berzelius. In 1902 Emil Fischer and Franz Hofmeister independently proposed that proteins are chains of amino acids joined by amide bonds, and Fischer made peptides of up to eighteen residues to prove it. Linus Pauling, Robert Corey and Herman Branson predicted the α helix and the β sheets in 1951. Frederick Sanger finished the sequence of insulin in 1955, showing that a protein has one definite sequence, and received the 1958 Nobel Prize in Chemistry. John Kendrew's myoglobin (1958) and Max Perutz's haemoglobin (1959–1960) were the first protein structures, and the two shared the 1962 Nobel Prize in Chemistry. G. N. Ramachandran, C. Ramakrishnan and V. Sasisekharan published their analysis of allowed backbone conformations in 1963. Christian Anfinsen's ribonuclease experiments, begun in the late 1950s, led to the thermodynamic hypothesis and a share of the 1972 Nobel Prize in Chemistry with Stanford Moore and William Stein. Cyrus Levinthal posed his paradox in 1969. In 2024 the Nobel Prize in Chemistry was awarded to David Baker for computational protein design and to Demis Hassabis and John Jumper for protein-structure prediction with AlphaFold.
:::

::: summary
- Proteins are unbranched polyamides of twenty L-α-amino acids (all *S* except L-cysteine, which is *R*), classified by side chain as nonpolar, aromatic, polar, acidic or basic.
- Amino acids are zwitterions; each ionisable group follows Henderson–Hasselbalch, and the isoelectric point is the mean of the two $\mathrm{p}K_\mathrm{a}$ values flanking the neutral species (glycine $5.97$, histidine $7.59$, lysine $9.74$).
- The peptide bond is planar and trans because of amide resonance; the backbone conformation is set by the torsion angles $\varphi$ and $\psi$, restricted by sterics to the regions of the Ramachandran plot.
- The α helix ($3.6$ residues per turn, $0.15\ \mathrm{nm}$ per residue, $i \rightarrow i+4$ hydrogen bonds) and the β sheet ($0.35\ \mathrm{nm}$ per residue, hydrogen bonds between strands) satisfy backbone hydrogen bonds; about 20 helical residues span a membrane.
- Tertiary structure buries nonpolar side chains in a tightly packed core and leaves charged groups on the surface; quaternary structure assembles subunits such as the $\alpha_2\beta_2$ tetramer of haemoglobin.
- Anfinsen's experiments showed that sequence determines structure; folding is a marginally favourable equilibrium, with $\Delta G_\mathrm{unf}$ typically $20$–$60\ \mathrm{kJ\,mol^{-1}}$, described for two-state proteins by $\Delta G_\mathrm{unf}(T) = \Delta H_\mathrm{m}(1 - T/T_\mathrm{m}) + \Delta C_p[T - T_\mathrm{m} - T\ln(T/T_\mathrm{m})]$.
- The positive $\Delta C_p$ of unfolding (exposure of nonpolar surface) gives a maximum of stability and cold denaturation; folding is a biased search down a funnel-shaped landscape, assisted in cells by chaperones.
:::

## Exercises

::: exercise The isoelectric point of glycine {level=1 check="5.97"}
Glycine has $\mathrm{p}K_\mathrm{a}$ values $2.34$ and $9.60$. Calculate its isoelectric point and state which species predominates at pH 1, pH 6 and pH 12. (Enter the pI to two decimal places.)
::: solution
By [[#prop-pi-mean]], $\mathrm{pI} = \tfrac12(2.34 + 9.60) = 5.97$. At pH 1, below both $\mathrm{p}K_\mathrm{a}$ values, the cation $\mathrm{H_3N^+CH_2COOH}$ predominates; at pH 6, between them, the zwitterion $\mathrm{H_3N^+CH_2COO^-}$; at pH 12, above both, the anion $\mathrm{H_2NCH_2COO^-}$.
:::
:::

::: exercise Configurations of natural amino acids {level=1}
Using the Cahn–Ingold–Prelog rules, assign *R* or *S* to the α carbon of L-serine ($\mathrm{R} = \mathrm{CH_2OH}$) and of L-cysteine ($\mathrm{R} = \mathrm{CH_2SH}$), given that in L-alanine it is *S*. Explain why the two answers differ although both are L.
::: solution
In L-alanine the priorities are $\mathrm{NH_3^+} > \mathrm{COO^-} > \mathrm{CH_3} > \mathrm{H}$, and the arrangement is *S*. In serine, the side-chain carbon carries $(\mathrm{O},\mathrm{H},\mathrm{H})$, while the carboxyl carbon carries $(\mathrm{O},\mathrm{O},\mathrm{O})$ (counting the duplicated oxygen of $\mathrm{C{=}O}$), so $\mathrm{COO^-}$ still outranks $\mathrm{CH_2OH}$ and the order of priorities is the same as in alanine: L-serine is *S*. In cysteine the side-chain carbon carries $(\mathrm{S},\mathrm{H},\mathrm{H})$; sulfur outranks oxygen at the first point of difference, so $\mathrm{CH_2SH} > \mathrm{COO^-}$. The second and third priorities swap while the spatial arrangement is unchanged, so L-cysteine is *R*. The L/D label describes geometry relative to glyceraldehyde; *R*/*S* depends on atomic numbers, so the two systems can disagree.
:::
:::

::: exercise The length of a helix {level=1 check="5.4"}
A segment of 36 consecutive residues forms a single α helix. How long is the helix along its axis, and how many turns does it make? (Enter the length in nm.)
::: solution
Each residue rises $0.15\ \mathrm{nm}$, so the length is $36 \times 0.15 = 5.4\ \mathrm{nm}$. With $3.6$ residues per turn the segment makes $36/3.6 = 10$ turns (pitch $0.54\ \mathrm{nm}$, and $10 \times 0.54 = 5.4\ \mathrm{nm}$, consistently). As an extended β strand the same 36 residues would stretch to about $36 \times 0.35 = 12.6\ \mathrm{nm}$.
:::
:::

::: exercise The isoelectric point of glutamate {level=2 check="3.22"}
Glutamic acid has $\mathrm{p}K_\mathrm{a}$ values $2.19$ (α-carboxyl), $4.25$ (side-chain carboxyl) and $9.67$ (α-ammonium). Find its isoelectric point, and give its net charge at pH 7.0 to two decimal places. (Enter the pI to two decimal places.)
::: solution
The charge states in order of rising pH are $+1$ (all protonated), $0$ (α-carboxyl lost), $-1$ (side chain lost) and $-2$ (ammonium lost). The neutral species lies between $2.19$ and $4.25$, so $\mathrm{pI} = \tfrac12(2.19 + 4.25) = 3.22$. At pH 7.0 both carboxyls are essentially fully ionised ($-1.00$ each, to within 0.001), and the ammonium is protonated to the fraction $1/(1 + 10^{7.0 - 9.67}) = 0.998$; the net charge is $-2.00 + 0.998 = -1.00$.
:::
:::

::: exercise Histidine near its pKa {level=2 check="0.240"}
A histidine side chain in a protein has $\mathrm{p}K_\mathrm{a} = 6.00$. What fraction of the imidazole groups are protonated at pH $6.50$? By how much would the $\mathrm{p}K_\mathrm{a}$ have to rise for the protonated fraction at pH 6.50 to be 0.90? (Enter the fraction protonated at pH 6.50.)
::: solution
By [[#eq-frac-prot]], $\theta_\mathrm{H} = 1/(1 + 10^{0.50}) = 1/(1 + 3.162) = 0.240$. For $\theta_\mathrm{H} = 0.90$ we need $10^{\,\mathrm{pH} - \mathrm{p}K} = 1/0.90 - 1 = 0.111$, so $\mathrm{pH} - \mathrm{p}K = -0.954$ and $\mathrm{p}K = 7.45$: a rise of $1.45$ units. Such shifts are produced in proteins by a neighbouring negative charge, which stabilises the protonated imidazolium; a shift of $1.45$ units corresponds to $RT\ln 10 \times 1.45 = 5.708 \times 1.45 = 8.3\ \mathrm{kJ\,mol^{-1}}$ of stabilisation at $298\ \mathrm{K}$.
:::
:::

::: exercise Near the melting temperature {level=2 check="1.82"}
A protein has $T_\mathrm{m} = 330\ \mathrm{K}$ and $\Delta H_\mathrm{m} = 350\ \mathrm{kJ\,mol^{-1}}$. Neglecting $\Delta C_p$ (a fair approximation close to $T_\mathrm{m}$), calculate $\Delta G_\mathrm{unf}$ at $320\ \mathrm{K}$ and the percentage of molecules unfolded at that temperature. (Enter the percentage unfolded to three significant figures.)
::: solution
With $\Delta C_p = 0$, [[#eq-stability]] reduces to $\Delta G_\mathrm{unf} = \Delta H_\mathrm{m}(1 - T/T_\mathrm{m}) = 350 \times (1 - 320/330) = 350 \times 0.030303 = 10.61\ \mathrm{kJ\,mol^{-1}}$. Then $\Delta G/RT = 10\,606/(8.314 \times 320) = 3.987$ and, by [[#eq-fu]], $f_\mathrm{U} = 1/(1 + e^{3.987}) = 1/(1 + 53.9) = 0.0182$, that is $1.82\ \%$. Only $10\ \mathrm{K}$ below its melting temperature the protein is still 98 % folded: the transition is sharp because $\Delta H_\mathrm{m}$ is large.
:::
:::

::: exercise Mapping a peptide with two proteases {level=2}
A nonapeptide gives, with trypsin, the fragments Gly-Phe-Arg, Leu-Trp-Lys and Ser-Ala-Met; with chymotrypsin, Gly-Phe, Arg-Leu-Trp and Lys-Ser-Ala-Met. Deduce the sequence and explain how you used each enzyme's specificity.
::: hint
Trypsin cuts after Lys or Arg; a fragment that does *not* end in Lys or Arg must be the C-terminal one. Then use the chymotryptic fragments to order the tryptic ones.
:::
::: solution
Trypsin cuts after Lys and Arg, so Ser-Ala-Met, which ends in neither, is the C-terminal tryptic fragment; Gly-Phe-Arg and Leu-Trp-Lys are internal or N-terminal. Chymotrypsin cuts after Phe and Trp: Gly-Phe is a fragment ending in Phe, so Gly is at the N terminus and Phe is followed by Arg; the fragment Arg-Leu-Trp shows that Arg is followed by Leu-Trp; and Lys-Ser-Ala-Met shows that Lys is followed by Ser. The sequence is
$$
\text{Gly-Phe-Arg-Leu-Trp-Lys-Ser-Ala-Met}.
$$
Check: trypsin cuts after Arg-3 and Lys-6, giving the three tryptic fragments; chymotrypsin cuts after Phe-2 and Trp-5, giving the three chymotryptic fragments. Each set of overlaps bridges the cuts of the other — the logic of Sanger's insulin work.
:::
:::

::: exercise Scrambled ribonuclease {level=3 check="105"}
Ribonuclease A has eight cysteine residues that form four disulfide bonds. (a) Show that the number of distinct ways of pairing $2n$ cysteines into $n$ disulfides is $(2n-1)(2n-3)\cdots 3 \cdot 1$, and evaluate it for $n = 4$. (b) Anfinsen's scrambled ribonuclease, formed by oxidising the reduced enzyme in $8\ \mathrm{mol\,dm^{-3}}$ urea, had about 1 % of the native activity. Explain this figure, and explain why removing the urea first gives nearly full activity. (Enter the number of pairings for $n = 4$.)
::: hint
Pick the lowest-numbered unpaired cysteine; how many partners can it have? Then repeat with the cysteines that remain.
:::
::: solution
(a) Take the first cysteine: it can pair with any of the other $2n - 1$. Of the $2n - 2$ that remain, the first can pair with any of $2n - 3$, and so on, until the last two must pair with each other. Every complete pairing is produced exactly once by this procedure, so the number is $(2n-1)(2n-3)\cdots 1 = (2n)!/(2^n n!)$. For $n = 4$: $7 \times 5 \times 3 \times 1 = 105$ (check: $8!/(2^4\,4!) = 40\,320/384 = 105$).

(b) In urea the chain cannot fold, so the thiols meet essentially at random and the disulfides form in proportions close to statistical: only one pairing in 105, about $0.95\ \%$, is native, matching the observed 1 % activity. Without urea the chain folds first under the noncovalent forces that define the native state, bringing the correct pairs of cysteines together before they are oxidised. That the native pairing is reached spontaneously, and that scrambled molecules convert to native ones when traces of a thiol are added to allow disulfide exchange, is the evidence that the native state is the thermodynamically most stable one and that the sequence contains all the information needed to reach it.
:::
:::

::: exercise Cold denaturation {level=3 check="254"}
A protein has $T_\mathrm{m} = 323.15\ \mathrm{K}$, $\Delta H_\mathrm{m} = 300\ \mathrm{kJ\,mol^{-1}}$ and $\Delta C_p = 8.0\ \mathrm{kJ\,K^{-1}\,mol^{-1}}$, independent of temperature. (a) Show from [[#eq-stability]] that the temperature of maximum stability is $T_\mathrm{max} = T_\mathrm{m}\exp(-\Delta H_\mathrm{m}/T_\mathrm{m}\Delta C_p)$, and evaluate it. (b) Find $\Delta G_\mathrm{unf}$ at $298.15\ \mathrm{K}$. (c) Find the cold-denaturation temperature, the lower solution of $\Delta G_\mathrm{unf} = 0$, and comment on whether it could be observed. (Enter the cold-denaturation temperature in K to the nearest kelvin.)
::: hint
For (c), evaluate $\Delta G_\mathrm{unf}$ at a few trial temperatures below $T_\mathrm{max}$ and use bisection or Newton's method (both are treated in [Maths Atlas](/learn/maths/)).
:::
::: solution
(a) Differentiate: $d\Delta G/dT = -\Delta H_\mathrm{m}/T_\mathrm{m} + \Delta C_p[1 - \ln(T/T_\mathrm{m}) - 1] = -\Delta H_\mathrm{m}/T_\mathrm{m} - \Delta C_p\ln(T/T_\mathrm{m})$. Setting this to zero gives $\ln(T/T_\mathrm{m}) = -\Delta H_\mathrm{m}/(T_\mathrm{m}\Delta C_p)$, which is the stated formula; it is the temperature where $\Delta S_\mathrm{unf} = 0$. Numerically the exponent is $-300/(323.15 \times 8.0) = -0.1160$ and $T_\mathrm{max} = 323.15\,e^{-0.1160} = 287.7\ \mathrm{K}$.

(b) At $298.15\ \mathrm{K}$: $300 \times (1 - 298.15/323.15) = 23.21\ \mathrm{kJ\,mol^{-1}}$; $\ln(298.15/323.15) = -0.08052$, so the bracket is $-25.00 + 24.007 = -0.993\ \mathrm{K}$ and the $\Delta C_p$ term is $-7.94\ \mathrm{kJ\,mol^{-1}}$. Thus $\Delta G_\mathrm{unf} = 15.3\ \mathrm{kJ\,mol^{-1}}$.

(c) Trial values: at $250\ \mathrm{K}$, $\Delta G_\mathrm{unf} = 67.9 - 71.9 = -4.0\ \mathrm{kJ\,mol^{-1}}$ (unfolded); at $260\ \mathrm{K}$, $58.6 - 52.9 = +5.7\ \mathrm{kJ\,mol^{-1}}$ (folded). Bisection between them converges to $T = 253.7\ \mathrm{K}$, about $-19\ \mathrm{^\circ C}$. This is below the freezing point of water, so in ordinary buffer the solution would freeze first; cold denaturation of such a protein can be seen only in supercooled solutions, under pressure, or after destabilising the protein with a moderate concentration of denaturant, which raises the lower zero towards accessible temperatures. The large $\Delta C_p$, here a sign of extensive buried nonpolar surface, makes the arch narrow and the cold transition easier to reach.
:::
:::
