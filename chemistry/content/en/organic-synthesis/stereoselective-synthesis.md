The two enantiomers of carvone have the same melting point, the same NMR spectrum and the same reactivity towards achiral reagents, yet (*R*)-carvone smells of spearmint and (*S*)-carvone of caraway. Our noses, like enzymes and receptors, are chiral, and they tell enantiomers apart. The same is true of drugs: the two enantiomers of a chiral medicine often have different potencies, metabolism and side effects, and since the 1990s regulators have expected each enantiomer of a new chiral drug to be characterised, which in practice means that most are developed as single enantiomers. Levodopa (L-DOPA, for Parkinson's disease), the β-blockers and the "statins" are examples. Making one stereoisomer selectively — **stereoselective synthesis** — is therefore one of the central tasks of modern organic chemistry.

The reactions of the previous chapters create stereocentres: additions to C=O, enolate alkylations, aldol reactions, Diels–Alder reactions and $[3,3]$ shifts. This chapter asks how to control *which* stereoisomer forms. We begin with the measures of selectivity and the energy differences they correspond to. Then we look at **diastereoselective** reactions controlled by stereocentres already in the substrate (the Felkin–Anh and chelation models, cyclic stereocontrol, the Zimmerman–Traxler aldol), and at the four ways of introducing chirality: the **chiral pool**, **chiral auxiliaries**, **chiral reagents** and **asymmetric catalysis**. We end with **kinetic resolution**, the selective consumption of one enantiomer of a racemate. Stereochemical vocabulary (*R*/*S*, enantiomers, diastereomers) is from [[organic-1/stereochemistry]].

## Measuring and explaining selectivity {#sec-measures}

::: definition Enantiomeric and diastereomeric excess {#def-ee}
For a mixture of enantiomers with mole fractions $x_R$ and $x_S$, the **enantiomeric excess** is
$$
\mathrm{ee} = \frac{\lvert x_R - x_S\rvert}{x_R + x_S},
$$
usually quoted as a percentage; the **enantiomeric ratio** (er) is $x_R : x_S$. A racemate has $\mathrm{ee} = 0$, a single enantiomer $\mathrm{ee} = 100\,\%$, and $\mathrm{er} = (1 + \mathrm{ee}) : (1 - \mathrm{ee})$. The **diastereomeric excess** (de) and **diastereomeric ratio** (dr) are defined in the same way for a pair of diastereomers. A reaction is **stereoselective** if it forms one stereoisomer in preference to others; it is **stereospecific** if stereoisomeric starting materials give stereoisomerically different products by mechanistic necessity (as in $\mathrm{S_N2}$ inversion or suprafacial Diels–Alder addition).
:::

Enantiomeric excess is measured by chiral-phase chromatography (HPLC or GC), by NMR in the presence of a chiral solvating or derivatising agent (which converts enantiomers into distinguishable diastereomers), or — less reliably — from optical rotation compared with that of the pure enantiomer.

::: proposition Enantiomeric excess from the difference in activation energies {#prop-ee}
If two enantiomeric (or diastereomeric) products form irreversibly from a common starting point through transition states whose Gibbs energies differ by $\Delta\Delta G^\ddagger$, then under kinetic control
$$
\mathrm{er} = \exp\!\left(\frac{\Delta\Delta G^\ddagger}{RT}\right), \qquad \mathrm{ee} = \tanh\!\left(\frac{\Delta\Delta G^\ddagger}{2RT}\right).
$$ {#eq-ee}
:::

::: proof
The ratio of rates, and hence of products, is $e^{\Delta\Delta G^\ddagger/RT}$ by transition-state theory ([[organic-synthesis/carbon-carbon-bonds#prop-control]]); call it $r$. Then $\mathrm{ee} = (r - 1)/(r + 1)$. Writing $r = e^{2u}$ with $u = \Delta\Delta G^\ddagger/2RT$, $\mathrm{ee} = (e^{2u} - 1)/(e^{2u} + 1) = (e^{u} - e^{-u})/(e^{u} + e^{-u}) = \tanh u$. $\blacksquare$
:::

::: widget plot
f: 100*tanh(1000*x/(2*8.314*T))
x: 0, 20
y: 0, 100
sliders: T=298:150:400:1
labels: \mathrm{ee}\ (\%)
hlines: 90; 99
caption: Enantiomeric excess against $\Delta\Delta G^\ddagger$ (in $\mathrm{kJ\,mol^{-1}}$) at temperature $T$ (K), from [[#eq-ee]]. At $298\ \mathrm{K}$, $90\,\%$ ee needs $7.3\ \mathrm{kJ\,mol^{-1}}$ and $99\,\%$ ee needs $13.1\ \mathrm{kJ\,mol^{-1}}$ (the horizontal lines); at $195\ \mathrm{K}$ ($-78\ ^\circ\mathrm{C}$) the same energies give higher ee. The curve flattens near 100 %: the last few per cent of ee cost as much energy as the first ninety. A chiral catalyst has to discriminate between two transition states by roughly the energy of a single weak hydrogen bond or a few gauche interactions — which is why rational design is hard and why small changes of ligand or solvent can matter so much.
:::

::: example What energy does an ee correspond to? {#ex-ee-energy}
An asymmetric reduction gives the (*R*)-alcohol in a 95:5 ratio at $-78\ ^\circ\mathrm{C}$. (a) What is the ee? (b) What is $\Delta\Delta G^\ddagger$? (c) If $\Delta\Delta G^\ddagger$ were the same at $25\ ^\circ\mathrm{C}$, what ratio would be obtained?
::: solution
(a) $\mathrm{ee} = (95 - 5)/(95 + 5) = 90\,\%$. (b) $\Delta\Delta G^\ddagger = RT\ln(95/5) = 8.314 \times 195.15 \times \ln 19\ \mathrm{J\,mol^{-1}} = 8.314 \times 195.15 \times 2.944 = 4.78\ \mathrm{kJ\,mol^{-1}}$. (c) At $298.15\ \mathrm{K}$, $\mathrm{er} = \exp(4778/(8.314 \times 298.15)) = \exp(1.927) = 6.9$, i.e. about 87:13 ($75\,\%$ ee). Cooling is a cheap way to raise selectivity, at the cost of rate. (In reality $\Delta\Delta G^\ddagger$ changes with temperature, because $\Delta\Delta H^\ddagger$ and $\Delta\Delta S^\ddagger$ contribute differently; occasionally selectivity even inverts at an "isoinversion temperature".)
:::
:::

## Substrate control: diastereoselective reactions {#sec-substrate}

When a molecule already contains a stereocentre, its two faces near a reacting group are diastereotopic, and reagents attack them at different rates.

### Addition to carbonyl groups next to a stereocentre

A carbonyl group adjacent to a stereocentre bearing a large (L), a medium (M) and a small (S) substituent is attacked preferentially from one face. Donald Cram proposed a rule in 1952; the model now used is that of Marc Chérest and Hugh Felkin (1968), refined by Nguyen Trong Anh and Odile Eisenstein (1977).

::: algorithm The Felkin–Anh model {#alg-felkin}
1. **Orient the stereocentre** so that its largest group L (or the group whose C–X σ* orbital is lowest — an electronegative substituent such as OR or Cl, the "polar Felkin–Anh" case) is **perpendicular** to the plane of the carbonyl group.
2. **Let the nucleophile approach anti to L**, along the Bürgi–Dunitz trajectory — at about $107^\circ$ to the C=O bond, i.e. tilted away from the oxygen and over the α-carbon. The σ* orbital of the C–L bond, anti to the forming bond, lowers the energy of the transition state.
3. **Of the two conformations with L perpendicular, choose the one in which the nucleophile passes the small group S** (the other group, M, then sits gauche to the carbonyl oxygen).
4. **Read off the product** by adding the nucleophile on that face. If the substituent can chelate a metal together with the carbonyl oxygen (α- or β-alkoxy groups with $\mathrm{Mg^{2+}}$, $\mathrm{Zn^{2+}}$, $\mathrm{Ti^{4+}}$), switch to the **chelation model** (Cram's cyclic model): the chelate ring locks the conformation, and the nucleophile attacks from the face opposite the larger remaining substituent, often giving the opposite diastereomer.
:::

::: example Felkin–Anh and chelation control {#ex-felkin}
Predict the major product of (a) (*S*)-2-phenylpropanal with methylmagnesium bromide, and (b) a 2-(benzyloxy) ketone, $\mathrm{BnO{-}CH(CH_3){-}CO{-}CH_3}$, with a Grignard reagent in the presence of a chelating metal compared with a bulky silyl-protected analogue $\mathrm{TBSO{-}CH(CH_3){-}CO{-}CH_3}$.
::: solution
(a) L = phenyl, M = methyl, S = H. Place Ph perpendicular to the C=O plane; methyl adds anti to Ph, passing the hydrogen, with the methyl group of the stereocentre gauche to the oxygen. Building this geometry and assigning CIP priorities (at the new centre OH > the CH(Ph)CH₃ carbon > CH₃ > H; at the old centre CH(OH)CH₃ > Ph > CH₃ > H) gives **(2*S*,3*S*)-3-phenylbutan-2-ol** as the major (Felkin) product, with modest selectivity, typically 2–3:1 for Grignard additions. Bulkier nucleophiles and lower temperatures increase it.

(b) With the benzyl ether, magnesium can bind both the carbonyl oxygen and the ether oxygen in a five-membered chelate; the methyl group on the stereocentre then shields one face, and the nucleophile attacks from the other: **chelation control**, often with ratios above 10:1. With the bulky TBS ether, chelation is prevented (silyl ethers are poor Lewis bases, and the silyl group is large), and the polar Felkin–Anh model applies, with the C–O bond perpendicular to the carbonyl plane and anti to the nucleophile. The two protecting groups therefore lead to **opposite** diastereomers — a protecting group used as a stereocontrol element ([[organic-synthesis/protecting-groups#warn-pg]]).
:::
:::

### Cyclic stereocontrol

Rings make faces easy to distinguish. Hydride addition to 4-*tert*-butylcyclohexan-1-one (the *tert*-butyl group locks the chair conformation) can occur from the **axial** face, giving the equatorial alcohol (*trans*), or from the **equatorial** face, giving the axial alcohol (*cis*). Small hydride reagents such as $\mathrm{LiAlH_4}$ and $\mathrm{NaBH_4}$ prefer axial attack (about 9:1 *trans*), because equatorial approach suffers torsional strain with the adjacent axial C–H bonds as the new bond forms. Bulky reagents such as L-Selectride ($\mathrm{LiBH(}s\mathrm{Bu)_3}$) cannot pass the axial hydrogens on C3 and C5 and attack equatorially, giving mainly the *cis* (axial) alcohol, usually above 90:10. Reagent size thus selects between two diastereomers of the same molecule. Similar reasoning — attack from the convex face of a folded bicyclic molecule — controls much of the stereochemistry of polycyclic natural product synthesis.

### The aldol reaction: the Zimmerman–Traxler model

When an enolate with a substituent on its α-carbon adds to an aldehyde, two new stereocentres form, giving *syn* and *anti* diastereomers (relative to the main chain drawn as a zigzag). Howard Zimmerman and Marjorie Traxler (1957) proposed that metal enolates react through a **six-membered chair-like transition state** in which the metal binds both the enolate oxygen and the aldehyde oxygen.

::: proposition Enolate geometry and aldol relative configuration (Zimmerman–Traxler) {#prop-zt}
For aldol reactions of metal enolates proceeding through a closed, chair-like six-membered transition state with the aldehyde substituent equatorial, a (*Z*)-enolate gives the *syn* aldol and an (*E*)-enolate gives the *anti* aldol. The correlation is strongest for boron enolates, whose short B–O bonds give a compact transition state, and weaker for lithium enolates; it fails for reactions through open transition states (Lewis-acid-mediated Mukaiyama aldols).
:::

::: proof Justification
In the chair, the enolate C=C and the aldehyde C=O form the bonds C1–O (to metal), C2=C3 and C3–C4 (forming); the aldehyde's substituent R prefers the pseudo-equatorial position to avoid 1,3-diaxial interactions with the metal's ligands. The enolate's α-substituent (on C2) is fixed by the enolate geometry: in a (*Z*)-enolate it is *cis* to the O–metal bond and so occupies a position that, after bond formation, places it on the same side of the zigzag chain as the new OH: *syn*. In an (*E*)-enolate it is *trans* to O–metal, ends up on the opposite side, and the product is *anti*. Since the geometry of the enolate is transmitted through a rigid chair, the relative configuration of the product follows by mechanism, not by thermodynamics. $\blacksquare$
:::

Enolate geometry can itself be controlled: ketones with dibutylboron triflate and a hindered amine give (*Z*)-boron enolates, while dicyclohexylboron chloride with triethylamine gives (*E*)-enolates; lithium amide bases give mainly (*E*)-ester enolates in THF and (*Z*) in the presence of HMPA or DMPU (Robert Ireland's model). Combining enolate control with chiral auxiliaries or catalysts controls the absolute configuration as well.

## Introducing chirality: four strategies {#sec-strategies}

Substrate control converts existing chirality into new stereocentres; it cannot create chirality from achiral starting materials. For that we need a source of chirality: the chiral pool, an auxiliary, a reagent or a catalyst.

### The chiral pool

Nature supplies many inexpensive enantiopure compounds: amino acids, sugars, hydroxy acids (lactic, malic, tartaric acid), terpenes (menthol, carvone, camphor, pinene) and alkaloids. A synthesis that starts from one of these "borrows" its stereocentres. The classical route to the anti-influenza drug oseltamivir starts from (−)-shikimic acid; many syntheses of polyketides start from (*S*)-lactate or (*R*)-3-hydroxybutyrate esters. The limitation is that the target's stereocentres must map onto those of an available natural compound, and often only one enantiomer is cheap.

### Chiral auxiliaries

A **chiral auxiliary** is an enantiopure group attached temporarily to the substrate to control the stereochemistry of a reaction, then removed and ideally recovered. The products before removal are diastereomers, so even if selectivity is imperfect they can be separated by ordinary chromatography or crystallisation — a decisive practical advantage. The best-known are David Evans's **oxazolidinones** (1981–82), made from amino alcohols derived from valine or phenylalanine. An *N*-acyl oxazolidinone is deprotonated (LDA or NaHMDS) to a (*Z*)-enolate chelated to the metal; the substituent at C4 of the oxazolidinone (isopropyl or benzyl) blocks one face, and an alkyl halide approaches from the other. With dibutylboron triflate, the same auxiliaries give the "Evans *syn*" aldol with very high selectivity. The auxiliary is removed by hydrolysis (lithium hydroperoxide, which attacks the exocyclic carbonyl selectively), reduction (to the alcohol) or conversion to a Weinreb amide.

::: example An Evans alkylation {#ex-evans}
Outline the synthesis of (*R*)-2-methyl-3-phenylpropanoic acid using an Evans auxiliary, and state where each stereochemical decision is made.
::: solution
(1) **Acylation**: (*S*)-4-benzyloxazolidin-2-one is deprotonated at N (butyllithium) and acylated with propanoyl chloride: the N-propanoyl oxazolidinone. (2) **Enolisation**: NaHMDS at $-78\ ^\circ\mathrm{C}$ gives the (*Z*)-enolate, chelated through Na between the enolate oxygen and the oxazolidinone carbonyl oxygen, which fixes the orientation of the auxiliary. (3) **Alkylation**: benzyl bromide approaches the enolate face away from the C4 benzyl group; the enolate carbon attacks the benzylic carbon ($\mathrm{S_N2}$), displacing bromide. Diastereoselectivity is typically above 95:5 — the stereochemical decision is made here, by the auxiliary's C4 stereocentre. The minor diastereomer can be removed by chromatography, giving material of essentially 100 % de. (4) **Cleavage**: LiOH/$\mathrm{H_2O_2}$ in aqueous THF — the hydroperoxide anion attacks the exocyclic acyl carbonyl (more electrophilic and less hindered than the carbamate), expelling the oxazolidinone nitrogen anion, and the peracid is reduced to the acid on work-up — gives (*R*)-2-methyl-3-phenylpropanoic acid and recovers the auxiliary. The cost of the method is two extra steps (attach and remove) and a stoichiometric chiral compound; its virtue is reliability, and the separation of diastereomers.
:::
:::

### Chiral reagents and asymmetric catalysis

A **chiral reagent** carries its chirality in the reagent itself — for example Herbert C. Brown's diisopinocampheylboranes, made from (+)- or (−)-α-pinene, for asymmetric hydroboration and allylation. **Asymmetric catalysis** uses a substoichiometric amount of a chiral catalyst, so each catalyst molecule creates many molecules of chiral product: the most economical way to make single enantiomers. The landmark methods include:

- **Asymmetric hydrogenation.** William Knowles's rhodium complex of the chiral bisphosphine DIPAMP was used by Monsanto from the 1970s to make L-DOPA by hydrogenating an enamide precursor in about 95 % ee. Ryoji Noyori's ruthenium–BINAP catalysts (1980s) hydrogenate functionalised alkenes and ketones; β-keto esters give β-hydroxy esters in over 99 % ee (methyl 3-oxobutanoate with an (*R*)-BINAP–Ru catalyst gives methyl (*R*)-3-hydroxybutanoate). Mechanisms and ligands are discussed in [[organometallics-catalysis/hydrogenation-hydroformylation]].
- **Sharpless asymmetric epoxidation** (Tsutomu Katsuki and K. Barry Sharpless, 1980). Allylic alcohols are epoxidised by *tert*-butyl hydroperoxide with titanium(IV) isopropoxide and an enantiopure diethyl tartrate (DET). The allylic alcohol binds to titanium, and the tartrate directs oxygen delivery to one face. A mnemonic: draw the allylic alcohol with the $\mathrm{CH_2OH}$ at the bottom right of a vertical alkene; L-(+)-DET delivers oxygen from the bottom face, D-(−)-DET from the top. With molecular sieves the reaction is catalytic in titanium and tartrate (5–10 mol %).
- **Sharpless asymmetric dihydroxylation** (1988 onwards): catalytic $\mathrm{OsO_4}$ with cinchona-alkaloid-derived ligands (sold as AD-mix-α and AD-mix-β, with potassium ferricyanide as co-oxidant), applicable to almost all alkene substitution patterns.
- **Corey–Bakshi–Shibata (CBS) reduction** (1987): ketones are reduced by borane with a catalytic oxazaborolidine derived from proline; the catalyst's nitrogen binds borane and its boron binds the ketone oxygen on the side of the smaller substituent, delivering hydride intramolecularly through a six-membered transition state.
- **Organocatalysis.** Small chiral organic molecules catalyse enantioselective reactions without metals. (*S*)-Proline catalyses intramolecular aldol reactions (the Hajos–Parrish–Eder–Sauer–Wiechert reaction, 1971, which gives the Wieland–Miescher ketone of [[organic-synthesis/retrosynthesis#ex-wieland-miescher]] enantioselectively) and, as Benjamin List, Richard Lerner and Carlos Barbas showed in 2000, intermolecular aldols, through an enamine intermediate; David MacMillan's imidazolidinones (2000) catalyse Diels–Alder reactions through iminium ions that lower the LUMO of enals.
- **Biocatalysis.** Engineered enzymes — ketoreductases, transaminases, lipases — give very high ee under mild aqueous conditions. In the manufacture of the antidiabetic drug sitagliptin, an engineered transaminase (Merck and Codexis, 2010) replaced a rhodium-catalysed asymmetric hydrogenation.

::: example A Sharpless epoxidation {#ex-sharpless}
Geraniol, (*E*)-3,7-dimethylocta-2,6-dien-1-ol, is treated with $\mathrm{Ti(O}i\mathrm{Pr)_4}$, L-(+)-diethyl tartrate and *tert*-butyl hydroperoxide with 4 Å molecular sieves at $-20\ ^\circ\mathrm{C}$. Which alkene reacts, which product forms, and why is the reaction catalytic?
::: solution
**Chemoselectivity.** Only the allylic 2,3-double bond reacts: the alcohol binds to titanium (displacing isopropoxide), and the peroxide bound to the same titanium delivers its oxygen intramolecularly to the nearest alkene, as in the vanadium-catalysed reaction of [[organic-synthesis/redox-in-synthesis]]. The remote 6,7-alkene is untouched.

**Enantioselectivity.** The titanium–tartrate complex is a dimer in which the tartrate ester groups block one face of the bound allylic alcohol. With L-(+)-DET the product is **(2*S*,3*S*)-2,3-epoxygeraniol**, typically above 90 % ee.

**Catalysis.** Water hydrolyses the titanium–tartrate complex and stops turnover; molecular sieves remove it, allowing 5–10 mol % of titanium and tartrate to turn over many times (Gao, Sharpless and co-workers, 1987). Concentrated organic hydroperoxides are hazardous oxidisers; *tert*-butyl hydroperoxide is used as a commercial solution, and the reaction requires a risk assessment and supervision.
:::
:::

## Kinetic resolution {#sec-resolution}

If a chiral catalyst or reagent reacts with one enantiomer of a racemate faster than with the other, the unreacted starting material becomes enriched in the slower-reacting enantiomer.

::: proposition Kinetic resolution (Kagan) {#prop-kr}
Let the two enantiomers of a racemic substrate react by first-order (or pseudo-first-order) processes with rate constants $k_\mathrm{fast}$ and $k_\mathrm{slow}$, and define the **selectivity factor** $s = k_\mathrm{fast}/k_\mathrm{slow}$. At conversion $c$ (fraction of all substrate consumed), the enantiomeric excess of the remaining substrate, $\mathrm{ee_{SM}}$, satisfies
$$
s = \frac{\ln\!\big[(1 - c)(1 - \mathrm{ee_{SM}})\big]}{\ln\!\big[(1 - c)(1 + \mathrm{ee_{SM}})\big]}.
$$ {#eq-kagan}
The maximum yield of resolved starting material is $50\,\%$, and is approached only as $s \to \infty$.
:::

::: proof
Start with equal amounts, normalised to $\tfrac12$ each. After time $t$ the fractions remaining are $u_\mathrm{f} = e^{-k_\mathrm{fast}t}$ and $u_\mathrm{s} = e^{-k_\mathrm{slow}t}$, so $u_\mathrm{f} = u_\mathrm{s}^{\,s}$. The amount of substrate left is $1 - c = \tfrac12(u_\mathrm{f} + u_\mathrm{s})$ and its excess is $\mathrm{ee_{SM}} = (u_\mathrm{s} - u_\mathrm{f})/(u_\mathrm{s} + u_\mathrm{f})$. Then $(1 - c)(1 + \mathrm{ee_{SM}}) = \tfrac12(u_\mathrm{s} + u_\mathrm{f}) \times 2u_\mathrm{s}/(u_\mathrm{s} + u_\mathrm{f}) = u_\mathrm{s}$ and similarly $(1 - c)(1 - \mathrm{ee_{SM}}) = u_\mathrm{f}$. Taking logarithms, $\ln u_\mathrm{f} = s\ln u_\mathrm{s}$ is [[#eq-kagan]]. Since the slow enantiomer is at most half of the substrate, at most $50\,\%$ of the starting material can be recovered enantiopure, and only in the limit where none of the slow enantiomer has reacted. $\blacksquare$
:::

::: widget parametric
fx: 100*(1 - (t + t^s)/2)
fy: 100*(t - t^s)/(t + t^s)
t: 0.0001, 1
x: 0, 100
y: 0, 100
sliders: s=20:1.5:200:0.5
trace: false
equal: false
caption: Kinetic resolution: enantiomeric excess of the remaining starting material (vertical, %) against conversion (horizontal, %) for selectivity factor $s$ ([[#eq-kagan]]), traced by the fraction $t$ of the slow enantiomer remaining. With $s = 20$, $99\,\%$ ee is reached at $62\,\%$ conversion, leaving at most $38\,\%$ of the material; with $s = 200$ it is reached just past $50\,\%$. With $s = 5$ you must consume most of the material to reach high ee. Because the ee of the *starting material* rises steeply near the end, even modest selectivity factors can deliver enantiopure recovered material — at the cost of yield. Dynamic kinetic resolution, in which the starting material racemises rapidly under the reaction conditions, removes the $50\,\%$ ceiling.
:::

::: example How far to run a kinetic resolution {#ex-kr}
A lipase acylates the (*R*)-enantiomer of a racemic secondary alcohol with $s = 20$. (a) What is the ee of the remaining (*S*)-alcohol at $50\,\%$ conversion? (b) At what conversion does it reach $99\,\%$ ee, and what is then the maximum yield of (*S*)-alcohol?
::: solution
Use the parametrisation of the proof: $u_\mathrm{f} = u_\mathrm{s}^{20}$, $1 - c = \tfrac12(u_\mathrm{s} + u_\mathrm{f})$, $\mathrm{ee} = (u_\mathrm{s} - u_\mathrm{f})/(u_\mathrm{s} + u_\mathrm{f})$, solved numerically.

(a) $c = 0.50$ requires $u_\mathrm{s} + u_\mathrm{s}^{20} = 1.00$; the solution is $u_\mathrm{s} = 0.894$, $u_\mathrm{f} = 0.106$, so $\mathrm{ee_{SM}} = 0.788/1.000 = 79\,\%$.

(b) $\mathrm{ee} = 0.99$ requires $u_\mathrm{f}/u_\mathrm{s} = u_\mathrm{s}^{19} = 0.01/1.99 = 0.00503$, so $u_\mathrm{s} = 0.00503^{1/19} = 0.757$, $u_\mathrm{f} = 0.0038$, and $1 - c = \tfrac12(0.757 + 0.0038) = 0.380$. Conversion must reach $62\,\%$; at most $38\,\%$ of the racemate is recovered as (*S*)-alcohol of $99\,\%$ ee (76 % of the (*S*)-enantiomer originally present). The ester formed is enriched in the (*R*)-enantiomer, but because it is formed throughout the reaction its ee is lower. Check with [[#eq-kagan]]: $\ln(0.380 \times 0.01)/\ln(0.380 \times 1.99) = \ln 0.0038/\ln 0.756 = -5.57/-0.279 = 20$.
:::
:::

::: quiz
Which statements about stereoselective synthesis are correct?
- [x] A product of 90 % ee at 298 K corresponds to a difference of about 7.3 kJ mol⁻¹ between the competing transition states.
- [x] Products made with a chiral auxiliary are diastereomers before the auxiliary is removed, so they can be separated by ordinary chromatography.
- [ ] In a kinetic resolution, the resolved starting material can be recovered in up to 100 % yield if $s$ is large enough.
- [ ] A (*Z*)-boron enolate gives mainly the *anti* aldol through a Zimmerman–Traxler chair.
::: solution
$\Delta\Delta G^\ddagger = RT\ln 19 = 7.3\ \mathrm{kJ\,mol^{-1}}$ for a 95:5 ratio (90 % ee). Auxiliary-bound products are diastereomers, hence separable. Kinetic resolution can deliver at most 50 % of the racemate as one enantiomer (unless the substrate racemises: dynamic kinetic resolution). (*Z*)-Enolates give *syn* aldols ([[#prop-zt]]).
:::
:::

::: warning Optical rotation is not a measure of purity {#warn-rotation}
It is tempting to determine ee by comparing a measured specific rotation with the literature value for the pure enantiomer. This is unreliable: rotations are small and sensitive to concentration, solvent, temperature and wavelength; small amounts of a strongly rotating impurity can dominate; the relationship between rotation and ee is not always linear (the Horeau effect); and literature values for the "pure" enantiomer have often turned out to refer to material that was not pure. Determine ee by a separation method (chiral HPLC or GC) or by NMR with a chiral derivatising agent, and calibrate with the racemate so that both enantiomers are seen. Similarly, do not confuse *relative* configuration (which diastereomer) with *absolute* configuration (which enantiomer): a diastereoselective reaction on a racemic substrate gives a racemic product.
:::

::: history
Louis Pasteur separated the enantiomeric crystals of sodium ammonium tartrate by hand in 1848 and discovered the selective consumption of one enantiomer by a microorganism in 1857 — the first kinetic resolution. Emil Fischer's work on sugars in the 1890s introduced asymmetric induction from an existing stereocentre, and Donald Cram's rule (1952), Hugh Felkin's model (1968) and Anh and Eisenstein's orbital refinement (1977) made it predictable. Howard Zimmerman and Marjorie Traxler's chair model for the aldol appeared in 1957. David Evans introduced oxazolidinone auxiliaries in 1981. Catalytic asymmetric hydrogenation was pioneered by William Knowles (Monsanto's L-DOPA process, 1970s) and Ryoji Noyori (Ru–BINAP, 1980s), and Tsutomu Katsuki and Barry Sharpless reported the asymmetric epoxidation in 1980; Knowles, Noyori and Sharpless shared the 2001 Nobel Prize in Chemistry. Zoltan Hajos and David Parrish, and independently Ulrich Eder, Gerhard Sauer and Rudolf Wiechert, reported proline-catalysed asymmetric aldol cyclisations in 1971; organocatalysis became a general method after the work of Benjamin List and David MacMillan in 2000, recognised by the 2021 Nobel Prize.
:::

## Where this leads

The stereocontrol methods of this chapter are the backbone of [[organic-synthesis/total-synthesis]], where the order in which stereocentres are set, and by which method, often defines the strategy. The organometallic mechanisms behind asymmetric hydrogenation are in [[organometallics-catalysis/hydrogenation-hydroformylation]], and the role of single enantiomers in drug action and development in [[medicinal-chemistry/drug-binding]] and [[medicinal-chemistry/drug-development]]. Enzymes, nature's asymmetric catalysts, are discussed in [[biochemistry/enzymes]].

::: summary
- $\mathrm{ee} = \lvert x_R - x_S\rvert/(x_R + x_S)$; under kinetic control $\mathrm{er} = e^{\Delta\Delta G^\ddagger/RT}$ and $\mathrm{ee} = \tanh(\Delta\Delta G^\ddagger/2RT)$: 90 % ee needs 7.3 and 99 % ee 13.1 kJ mol⁻¹ at 298 K.
- Felkin–Anh: L perpendicular to C=O, nucleophile anti to L along the Bürgi–Dunitz trajectory, passing S; chelating α-alkoxy groups reverse the selectivity (chelation control).
- Cyclohexanones: small hydrides attack axially (equatorial OH), bulky hydrides equatorially (axial OH).
- Zimmerman–Traxler: (*Z*)-enolates → *syn* aldols, (*E*)-enolates → *anti*, through a chair transition state (best for boron).
- Sources of chirality: chiral pool, auxiliaries (Evans oxazolidinones; separable diastereomers), chiral reagents, and asymmetric catalysis (Noyori hydrogenation, Sharpless epoxidation and dihydroxylation, CBS reduction, organocatalysis, enzymes).
- Kinetic resolution: $s = \ln[(1-c)(1-\mathrm{ee})]/\ln[(1-c)(1+\mathrm{ee})]$; at most 50 % yield of one enantiomer unless the substrate racemises (dynamic kinetic resolution).
:::

## Exercises

::: exercise From ratio to ee {level=1 check="94"}
An asymmetric reaction gives the two enantiomers in a 97:3 ratio. What is the ee? (Enter it in per cent.)
::: solution
$(97 - 3)/(97 + 3) = 0.94 = 94\,\%$ ([[#def-ee]]).
:::
:::

::: exercise Energy for 90 % ee {level=1 check="7.3"}
What difference in activation Gibbs energy is needed for $90\,\%$ ee at $298.15\ \mathrm{K}$? (Enter it in $\mathrm{kJ\,mol^{-1}}$ to two significant figures.)
::: solution
90 % ee means er = 95:5 = 19. $\Delta\Delta G^\ddagger = RT\ln 19 = 8.314 \times 298.15 \times 2.944 = 7.3\ \mathrm{kJ\,mol^{-1}}$ ([[#eq-ee]]).
:::
:::

::: exercise Axial or equatorial? {level=1}
Predict the major diastereomer from reduction of 4-*tert*-butylcyclohexan-1-one with (a) $\mathrm{NaBH_4}$ and (b) L-Selectride, and explain.
::: solution
(a) Axial attack by the small borohydride (equatorial approach suffers torsional strain with the neighbouring axial C–H bonds) gives the equatorial alcohol: ***trans*-4-*tert*-butylcyclohexan-1-ol**. (b) The bulky trialkylborohydride is blocked from the axial face by the axial hydrogens on C3 and C5 and attacks equatorially, giving the axial alcohol: ***cis*-4-*tert*-butylcyclohexan-1-ol**.
:::
:::

::: exercise Cooling for selectivity {level=2 check="99.6"}
A catalyst discriminates between two transition states by $\Delta\Delta G^\ddagger = 10.0\ \mathrm{kJ\,mol^{-1}}$, independent of temperature. What ee is obtained at $195.15\ \mathrm{K}$? (Enter the ee in per cent, to three significant figures.)
::: solution
$\mathrm{ee} = \tanh(10\,000/(2 \times 8.314 \times 195.15)) = \tanh(3.082) = 0.996$, i.e. $99.6\,\%$. At $298.15\ \mathrm{K}$ the same catalyst would give $\tanh(2.017) = 96.5\,\%$.
:::
:::

::: exercise Felkin or chelation? {level=2}
An α-methoxy aldehyde is to be treated with a Grignard reagent. Explain how the choice of (a) adding $\mathrm{MgBr_2}$ or using $\mathrm{TiCl_4}$ as an additive, versus (b) replacing the methoxy group by a TBDPS ether, can give opposite diastereomers.
::: solution
(a) With a chelating metal, the aldehyde oxygen and the methoxy oxygen bind the metal in a five-membered ring; the conformation is locked with the C–OMe bond roughly eclipsing the C=O, and the nucleophile attacks from the face opposite the α-substituent (chelation control). (b) The TBDPS ether is too bulky and too weakly basic to chelate, so the polar Felkin–Anh model applies: the C–O bond is placed perpendicular to the carbonyl, anti to the nucleophile, and the nucleophile passes the small group (H). These two transition states deliver the nucleophile to opposite faces of the aldehyde, so the products are diastereomers of each other — the *syn* and *anti* 1,2-diol derivatives.
:::
:::

::: exercise A kinetic resolution at half conversion {level=2 check="67"}
A racemic substrate undergoes kinetic resolution with $s = 10$. What is the ee of the remaining starting material at $50\,\%$ conversion? (Enter the ee in per cent, to two significant figures.)
::: solution
Solve $u + u^{10} = 1$ (from $1 - c = \tfrac12(u_\mathrm{s} + u_\mathrm{f}) = 0.5$ with $u_\mathrm{f} = u_\mathrm{s}^{10}$): $u_\mathrm{s} = 0.835$, $u_\mathrm{f} = 0.165$. $\mathrm{ee} = (0.835 - 0.165)/1.000 = 0.67 = 67\,\%$. Check: $\ln(0.5 \times 0.33)/\ln(0.5 \times 1.67) = -1.80/-0.180 = 10$ ([[#eq-kagan]]).
:::
:::

::: exercise Deriving the tanh law {level=3}
Starting from transition-state theory, derive [[#eq-ee]]. Then show that for small $\Delta\Delta G^\ddagger$ the ee is approximately proportional to $\Delta\Delta G^\ddagger/T$, and estimate the ee for $\Delta\Delta G^\ddagger = 1.0\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$.
::: hint
$\tanh u \approx u$ for small $u$.
:::
::: solution
For two competing irreversible pathways from the same reactant (a prochiral substrate bound to a chiral catalyst, say), $k_i = (k_\mathrm{B}T/h)\exp(-\Delta G^\ddagger_i/RT)$ with the same prefactor, so the product ratio is $r = k_1/k_2 = \exp(\Delta\Delta G^\ddagger/RT)$ at all times (both products form from the same pool). Then $\mathrm{ee} = (r - 1)/(r + 1) = \tanh(\Delta\Delta G^\ddagger/2RT)$ as in the proof of [[#prop-ee]]. For small $u = \Delta\Delta G^\ddagger/2RT$, $\tanh u = u - u^3/3 + \ldots \approx u$, so $\mathrm{ee} \approx \Delta\Delta G^\ddagger/2RT$, proportional to $\Delta\Delta G^\ddagger/T$. For $1.0\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$: $u = 1000/(2 \times 8.314 \times 298) = 0.202$, $\mathrm{ee} \approx 20\,\%$ (exactly $\tanh 0.202 = 19.9\,\%$). The assumption that both products come from a common, rapidly equilibrating set of reactant states is the Curtin–Hammett condition; if the catalyst–substrate complexes did not interconvert, the ratio would also depend on their populations.
:::
:::

::: exercise How much conversion for 99 % ee? {level=3 check="62"}
Using [[#eq-kagan]], find the conversion at which a kinetic resolution with $s = 20$ gives starting material of $99\,\%$ ee, and the corresponding maximum yield. (Enter the conversion in per cent, to two significant figures.)
::: hint
Work with $u_\mathrm{s}$, the fraction of the slow enantiomer remaining: $\mathrm{ee} = (u_\mathrm{s} - u_\mathrm{s}^{s})/(u_\mathrm{s} + u_\mathrm{s}^{s})$.
:::
::: solution
$\mathrm{ee} = 0.99$ gives $u_\mathrm{s}^{s-1} = (1 - 0.99)/(1 + 0.99) = 0.005025$, so $u_\mathrm{s} = 0.005025^{1/19} = 0.757$ and $u_\mathrm{f} = 0.757^{20} = 0.0038$. Then $1 - c = \tfrac12(0.757 + 0.0038) = 0.380$, so $c = 0.62$, i.e. $62\,\%$ conversion, and at most $38\,\%$ of the racemate is recovered as the enantioenriched starting material ([[#ex-kr]]). With $s = 50$ the same ee would need only $55\,\%$ conversion.
:::
:::

::: exercise Planning an enantiopure alcohol {level=3}
Propose three different ways to obtain (*R*)-1-phenylethan-1-ol from achiral or racemic starting materials, and compare their maximum yields and practical requirements.
::: solution
(1) **Asymmetric reduction of acetophenone**: CBS reduction (borane with a catalytic proline-derived oxazaborolidine), Noyori asymmetric transfer hydrogenation (a Ru–TsDPEN catalyst with formic acid/triethylamine or propan-2-ol), or a ketoreductase enzyme with a cofactor-recycling system. Maximum yield 100 %; ee typically above 95 %; requires a chiral catalyst but no separation of enantiomers. (2) **Kinetic resolution of racemic 1-phenylethanol** with a lipase (for example *Candida antarctica* lipase B and vinyl acetate), which acylates the (*R*)-alcohol faster: the (*R*)-acetate is separated and hydrolysed. Maximum yield 50 % ([[#prop-kr]]); simple, mild and cheap. (3) **Dynamic kinetic resolution**: combine the lipase with a ruthenium catalyst that racemises the alcohol through reversible oxidation to acetophenone (Jan-Erling Bäckvall's method), so that all the material can funnel through the fast-reacting (*R*)-enantiomer to the (*R*)-acetate: maximum yield 100 %. A fourth, classical, option is **resolution by crystallisation** of diastereomeric derivatives (for example the half-esters with phthalic acid as salts of a chiral amine), limited to 50 % unless the unwanted enantiomer is racemised and recycled. Choice depends on scale, cost of catalyst, and whether the 50 % ceiling is acceptable.
:::
:::
